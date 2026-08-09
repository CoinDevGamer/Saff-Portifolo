import { memo, useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, SyntheticEvent } from "react";
import type { VoiceDemo, VoiceDemoSubtitle } from "@/data/voiceDemos";
import { getMediaDuration } from "@/data/mediaDurations";
import { Waveform } from "./Waveform";
import { DownloadIcon, PauseIcon, PlayIcon, VolumeIcon } from "./icons";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function rangeProgress(value: number, max: number): CSSProperties {
  const percent = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
  return { "--range-progress": `${percent}%` } as CSSProperties;
}

/** Play / pause crossfade — the icons swap, the button never rotates. */
function TransportIcon({ playing, size }: { playing: boolean; size: string }) {
  const base: CSSProperties = {
    position: "absolute",
    transition:
      "opacity var(--motion-fast) var(--ease-signal), transform var(--motion-fast) var(--ease-signal)",
  };
  return (
    <span className="relative grid place-items-center" style={{ width: size, height: size }}>
      <PlayIcon
        className="h-full w-full"
        style={{
          ...base,
          opacity: playing ? 0 : 1,
          transform: playing ? "scale(0.7)" : "scale(1)",
        }}
      />
      <PauseIcon
        className="h-full w-full"
        style={{
          ...base,
          opacity: playing ? 1 : 0,
          transform: playing ? "scale(1)" : "scale(0.7)",
        }}
      />
    </span>
  );
}

function SubtitlePanel({
  subtitle,
  current,
  background,
  className = "",
}: {
  subtitle?: VoiceDemoSubtitle;
  current: number;
  background: string;
  className?: string;
}) {
  const cueLength = subtitle ? Math.max(0.01, subtitle.end - subtitle.start) : 1;
  const cueProgress = subtitle
    ? Math.min(100, Math.max(0, ((current - subtitle.start) / cueLength) * 100))
    : 0;
  const words = (subtitle?.text ?? "Play audio").split(/\s+/);

  return (
    <div
      className={`caption-panel outline-ink relative overflow-hidden px-4 py-4 text-center ${className}`}
      aria-live="polite"
      style={{ background }}
    >
      <span className="caption-wipe" aria-hidden="true" />
      <span className="label-strip mb-2 flex items-center justify-center gap-2 text-ink/60">
        <span className="caption-live-dot" aria-hidden="true" />
        {subtitle ? "Now speaking" : "Ready"}
      </span>
      <span className="font-display relative z-10 block text-lg leading-snug font-bold sm:text-xl">
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="caption-word inline-block"
            style={
              {
                "--word-delay": `${Math.min(index * 55, 440)}ms`,
                "--word-tilt": `${index % 2 === 0 ? -1.5 : 1.5}deg`,
              } as CSSProperties
            }
          >
            {word}
            {index < words.length - 1 ? "\u00a0" : ""}
          </span>
        ))}
      </span>
      <span className="absolute right-0 bottom-0 left-0 h-1.5 bg-white" aria-hidden="true">
        <span
          className="block h-full bg-bubblegum"
          style={{ width: `${cueProgress}%`, transition: "width 70ms linear" }}
        />
      </span>
    </div>
  );
}

type Props = {
  demo: VoiceDemo;
  variant: "console" | "track";
  trackNumber?: number;
  /** Track variant: is this the selected / expanded track. */
  active?: boolean;
  onActivate?: (id: string) => void;
  accent?: string;
  seed?: number;
  playButtonId?: string;
};

function VoiceDemoPlayerBase({
  demo,
  variant,
  trackNumber,
  active = false,
  onActivate,
  accent = "var(--butter)",
  seed = 1,
  playButtonId,
}: Props) {
  const mediaRef = useRef<HTMLMediaElement | null>(null);
  const isVideo = /\.mp4(?:$|[?#])/i.test(demo.audioFile);
  const fallbackDuration = getMediaDuration(demo.audioFile);
  const mediaSource = `${import.meta.env.BASE_URL}${demo.audioFile.replace(/^\/+/, "")}`;
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(fallbackDuration);
  const [volume, setVolume] = useState(0.8);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [captionsEnabled, setCaptionsEnabled] = useState(true);
  const [failed, setFailed] = useState(false);
  const [pulse, setPulse] = useState(0);

  // Another track took over: stop this one.
  useEffect(() => {
    if (variant === "track" && !active && playing) {
      mediaRef.current?.pause();
    }
  }, [active, playing, variant]);

  useEffect(() => {
    if (!Number.isFinite(duration) || duration <= 0) setDuration(fallbackDuration);
  }, [duration, fallbackDuration]);

  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    const updatePlayhead = () => {
      if (mediaRef.current) setCurrent(mediaRef.current.currentTime);
      frame = requestAnimationFrame(updatePlayhead);
    };
    frame = requestAnimationFrame(updatePlayhead);
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  const toggle = useCallback(() => {
    const media = mediaRef.current;
    if (!media || failed) return;
    if (media.paused) {
      if (media.ended || (media.duration > 0 && media.currentTime >= media.duration)) {
        media.currentTime = 0;
        setCurrent(0);
      }
      onActivate?.(demo.id);
      void media.play().catch(() => setFailed(true));
    } else {
      media.pause();
    }
  }, [demo.id, failed, onActivate]);

  const seek = useCallback((value: number) => {
    const media = mediaRef.current;
    if (!media) return;
    media.currentTime = value;
    setCurrent(value);
  }, []);

  const changePlaybackRate = useCallback((rate: number) => {
    setPlaybackRate(rate);
    if (mediaRef.current) mediaRef.current.playbackRate = rate;
  }, []);

  const syncDuration = useCallback((media: HTMLMediaElement) => {
    if (Number.isFinite(media.duration) && media.duration > 0) setDuration(media.duration);
  }, []);

  const mediaEvents = {
    src: mediaSource,
    preload: "metadata" as const,
    onLoadedMetadata: (e: SyntheticEvent<HTMLMediaElement>) => syncDuration(e.currentTarget),
    onDurationChange: (e: SyntheticEvent<HTMLMediaElement>) => syncDuration(e.currentTarget),
    onCanPlay: (e: SyntheticEvent<HTMLMediaElement>) => syncDuration(e.currentTarget),
    onTimeUpdate: (e: SyntheticEvent<HTMLMediaElement>) => setCurrent(e.currentTarget.currentTime),
    onPlay: () => {
      setPlaying(true);
      setPulse((n) => n + 1);
    },
    onPause: () => setPlaying(false),
    onEnded: () => {
      setPlaying(false);
      setCurrent(duration || fallbackDuration);
    },
    onError: () => setFailed(true),
    onVolumeChange: (e: SyntheticEvent<HTMLMediaElement>) => setVolume(e.currentTarget.volume),
  };

  const audioEl = !isVideo ? (
    <audio
      ref={(node) => {
        mediaRef.current = node;
      }}
      {...mediaEvents}
    />
  ) : null;

  const videoEl = isVideo ? (
    <video
      ref={(node) => {
        mediaRef.current = node;
      }}
      {...mediaEvents}
      playsInline
      className="aspect-video h-auto w-full bg-ink object-contain"
      aria-label={`${demo.title} video`}
    />
  ) : null;

  const playLabel = `${playing ? "Pause" : "Play"} ${demo.title}`;
  const subtitles = demo.subtitles ?? [];
  const activeSubtitle = subtitles.find(
    (subtitle) => current >= subtitle.start && current < subtitle.end,
  );
  const visibleSubtitle = playing || current > 0 ? activeSubtitle : undefined;
  const cardColor = active ? accent : "var(--white)";

  /* ------------------------------ CONSOLE ------------------------------ */
  if (variant === "console") {
    return (
      <div
        className="outline-ink relative bg-white p-4 sm:p-6"
        style={{
          boxShadow: playing ? "9px 11px 0 var(--ink)" : "5px 5px 0 var(--ink)",
          transform: playing ? "translateY(-2px)" : "translateY(0)",
          transition:
            "box-shadow var(--motion-ui) var(--ease-signal), transform var(--motion-ui) var(--ease-signal)",
        }}
      >
        {audioEl}
        <div className="flex flex-wrap items-start justify-between gap-3 border-b-2 border-ink pb-3">
          <div
            className="min-w-0"
            style={{
              transform: playing ? "translateY(-1px)" : "none",
              opacity: playing ? 1 : 0.92,
              transition:
                "opacity var(--motion-ui) var(--ease-signal), transform var(--motion-ui) var(--ease-signal)",
            }}
          >
            <p className="label-strip text-ink/60">Featured showreel</p>
            <h2 className="font-display truncate text-2xl leading-tight font-extrabold sm:text-3xl">
              {demo.title}
            </h2>
            <p className="label-strip mt-1">
              {demo.category}
              {demo.isSample ? " · Sample" : ""}
            </p>
          </div>
          <div
            className="outline-ink flex shrink-0 items-center gap-2 px-2.5 py-1.5"
            style={{
              background: playing ? "var(--bubblegum)" : "var(--paper)",
              boxShadow: playing ? "3px 3px 0 var(--ink)" : "0 0 0 var(--ink)",
              transition:
                "background-color var(--motion-ui) var(--ease-switch), box-shadow var(--motion-ui) var(--ease-signal)",
            }}
          >
            <span
              key={`lamp-${pulse}-${playing}`}
              className="outline-ink block h-3 w-3 rounded-full"
              style={{
                background: playing ? "#d94f5c" : "transparent",
                animation: playing ? "signal-on 380ms var(--ease-switch) both" : undefined,
                transition: "background-color var(--motion-fast) var(--ease-switch)",
              }}
            />
            <span className="label-strip">{playing ? "On air" : "Off air"}</span>
          </div>
        </div>

        <div className="relative mt-4 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
          <button
            type="button"
            id={playButtonId}
            onClick={toggle}
            aria-label={playLabel}
            aria-pressed={playing}
            disabled={failed}
            className="studio-control control-transport grid h-16 w-16 shrink-0 place-items-center text-ink disabled:opacity-50 sm:h-20 sm:w-20"
            style={{ background: "var(--butter)" }}
          >
            <TransportIcon playing={playing} size="2rem" />
          </button>

          {/* one signal travelling from the transport to the waveform */}
          {playing ? (
            <span
              key={`sig-${pulse}`}
              aria-hidden="true"
              className="signal-line pointer-events-none absolute top-1/2 left-16 z-10 h-[2px] w-4 sm:left-20"
              style={{ background: "var(--ink)" }}
            />
          ) : null}

          <div
            className="outline-ink h-16 overflow-hidden px-2 py-2 sm:h-20"
            style={{ background: "var(--sky)" }}
          >
            <Waveform playing={playing} bars={56} seed={seed} expressive />
          </div>
        </div>

        {captionsEnabled ? (
          <SubtitlePanel
            key={`${demo.id}-${visibleSubtitle?.start ?? "ready"}`}
            subtitle={visibleSubtitle}
            current={current}
            background="var(--white)"
            className="mt-4 text-ink"
          />
        ) : null}

        <div className="mt-4 flex items-center gap-3">
          <span className="label-strip tabular-nums">{formatTime(current)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.01}
            value={Math.min(current, duration || 0)}
            onChange={(e) => seek(Number(e.target.value))}
            aria-label={`Seek within ${demo.title}`}
            className="studio-range h-11 flex-1"
            style={rangeProgress(current, duration)}
          />
          <span className="label-strip tabular-nums">{formatTime(duration)}</span>
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t-2 border-ink pt-3">
          <div className="flex items-center gap-2">
            <VolumeIcon className="h-5 w-5" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => {
                const v = Number(e.target.value);
                setVolume(v);
                if (mediaRef.current) mediaRef.current.volume = v;
              }}
              aria-label="Volume"
              className="studio-range h-11 w-28"
              style={rangeProgress(volume, 1)}
            />
            <div className="flex items-center gap-1" aria-label="Playback speed">
              {[0.5, 1, 2].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => changePlaybackRate(rate)}
                  aria-pressed={playbackRate === rate}
                  className="control-chip label-strip h-9 min-w-10 border-2 border-ink px-2"
                  style={{
                    background: playbackRate === rate ? "var(--ink)" : "var(--white)",
                    color: playbackRate === rate ? "var(--paper)" : "var(--ink)",
                  }}
                >
                  {rate}x
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {failed ? (
              <span className="label-strip text-ink/70">Showreel unavailable right now</span>
            ) : null}
            <button
              type="button"
              onClick={() => setCaptionsEnabled((enabled) => !enabled)}
              disabled={subtitles.length === 0}
              aria-pressed={captionsEnabled}
              className="control-chip label-strip h-11 border-2 border-ink px-3 disabled:cursor-not-allowed disabled:opacity-45"
              style={{
                background: "var(--white)",
                color: "var(--ink)",
              }}
            >
              CC {subtitles.length > 0 ? "Subtitles" : "Unavailable"}
            </button>
            {demo.downloadable ? (
              <a
                href={mediaSource}
                download
                className="studio-control control-chip label-strip inline-flex min-h-11 items-center gap-2 bg-mint px-3 py-2"
              >
                <DownloadIcon className="h-4 w-4" />
                Download
              </a>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------- TRACK ------------------------------- */
  return (
    <li
      className="outline-ink sig sig-strip"
      style={{
        background: active ? accent : "var(--white)",
        transform: active ? "translateY(-3px)" : "translateY(0)",
        boxShadow: active ? "5px 5px 0 var(--ink)" : "0 0 0 var(--ink)",
        transition:
          "background-color var(--motion-ui) var(--ease-switch), transform var(--motion-ui) var(--ease-signal), box-shadow var(--motion-fast) var(--ease-signal)",
        transitionDelay: active ? "0ms, 0ms, 180ms" : "0ms",
      }}
    >
      {audioEl}
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 p-3 sm:gap-4 sm:p-4">
        <button
          type="button"
          onClick={toggle}
          aria-label={playLabel}
          aria-pressed={playing}
          disabled={failed}
          className="studio-control control-key grid h-11 w-11 shrink-0 place-items-center bg-paper text-ink disabled:opacity-50"
        >
          <TransportIcon playing={playing} size="1.25rem" />
        </button>

        <button
          type="button"
          onClick={() => onActivate?.(demo.id)}
          className="min-w-0 text-left"
          aria-expanded={active}
        >
          <span className="label-strip flex items-center gap-2 text-ink/70">
            {/* the track number slides into a dark registration box when selected */}
            <span
              className="tabular-nums inline-block border-2 px-1"
              style={{
                borderColor: active ? "var(--ink)" : "transparent",
                background: active ? "var(--ink)" : "transparent",
                color: active ? "var(--paper)" : "inherit",
                transition:
                  "background-color var(--motion-ui) var(--ease-switch), color var(--motion-ui) var(--ease-switch), border-color var(--motion-ui) var(--ease-switch)",
              }}
            >
              {String(trackNumber ?? 1).padStart(2, "0")}
            </span>
            <span aria-hidden="true">/</span>
            <span>{demo.category}</span>
            {demo.isSample ? (
              <span className="outline-ink bg-paper px-1.5 py-0.5 text-[0.6rem]">Sample</span>
            ) : null}
          </span>
          <span className="font-display block truncate text-lg leading-tight font-bold sm:text-xl">
            {demo.title}
          </span>
          {demo.description ? (
            <span className="mt-0.5 block truncate text-sm text-ink/75">{demo.description}</span>
          ) : null}
        </button>

        <div className="flex shrink-0 items-center gap-2">
          <span className="outline-ink label-strip hidden items-center gap-1.5 bg-white px-2 py-1 sm:inline-flex">
            <span
              className="block h-2.5 w-2.5 rounded-full border-2 border-ink"
              style={{ background: playing ? "#d94f5c" : "transparent" }}
            />
            {playing ? "On air" : "Off air"}
          </span>
          <span className="label-strip tabular-nums">{formatTime(duration)}</span>
        </div>
      </div>

      <div
        className="grid overflow-hidden px-3 sm:px-4"
        style={{
          gridTemplateRows: "1fr",
          transition: "grid-template-rows var(--motion-ui) var(--ease-signal)",
        }}
      >
        <div className="min-h-0">
          <div className="border-t-2 border-ink py-3">
            {isVideo ? (
              <div className="outline-ink mx-auto max-w-3xl overflow-hidden bg-ink">{videoEl}</div>
            ) : (
              <div
                className="outline-ink h-20 overflow-hidden px-2 py-2 sm:h-24"
                style={{ background: "var(--sky)" }}
              >
                <Waveform playing={playing} bars={56} seed={seed} expressive />
              </div>
            )}
            {captionsEnabled ? (
              <SubtitlePanel
                key={`${demo.id}-${visibleSubtitle?.start ?? "ready"}`}
                subtitle={visibleSubtitle}
                current={current}
                background={cardColor}
                className="mt-3 text-ink"
              />
            ) : null}
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <span className="label-strip tabular-nums">{formatTime(current)}</span>
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.01}
                value={Math.min(current, duration || 0)}
                onChange={(e) => seek(Number(e.target.value))}
                aria-label={`Seek within ${demo.title}`}
                className="studio-range h-11 min-w-36 flex-1"
                style={rangeProgress(current, duration)}
              />
              <span className="label-strip tabular-nums">{formatTime(duration)}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 border-t-2 border-ink py-3">
              <div className="flex items-center gap-2">
                <VolumeIcon className="h-5 w-5" />
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(e) => {
                    const nextVolume = Number(e.target.value);
                    setVolume(nextVolume);
                    if (mediaRef.current) mediaRef.current.volume = nextVolume;
                  }}
                  aria-label={`Volume for ${demo.title}`}
                  className="studio-range h-11 w-32"
                  style={rangeProgress(volume, 1)}
                />
              </div>
              <div className="flex items-center gap-1" aria-label="Playback speed">
                {[0.5, 1, 2].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => changePlaybackRate(rate)}
                    aria-pressed={playbackRate === rate}
                    className="control-chip label-strip h-9 min-w-10 border-2 border-ink px-2"
                    style={{
                      background: playbackRate === rate ? "var(--ink)" : "var(--white)",
                      color: playbackRate === rate ? "var(--paper)" : "var(--ink)",
                    }}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setCaptionsEnabled((enabled) => !enabled)}
                disabled={subtitles.length === 0}
                aria-pressed={captionsEnabled}
                className="control-chip label-strip h-11 border-2 border-ink px-3 disabled:cursor-not-allowed disabled:opacity-45"
                style={{
                  background: cardColor,
                  color: "var(--ink)",
                }}
              >
                CC {subtitles.length > 0 ? "Subtitles" : "Unavailable"}
              </button>
              <div className="ml-auto flex items-center gap-3">
                <span className="label-strip sm:hidden">{playing ? "On air" : "Off air"}</span>
                {demo.downloadable ? (
                  <a
                    href={mediaSource}
                    download
                    aria-label={`Download ${demo.title}`}
                    className="studio-control control-chip label-strip inline-flex h-11 items-center gap-2 bg-white px-4"
                  >
                    <DownloadIcon className="h-4 w-4" />
                    Download
                  </a>
                ) : null}
              </div>
            </div>
            {failed ? (
              <p className="label-strip mt-2">This recording is unavailable right now</p>
            ) : null}
          </div>
        </div>
      </div>
    </li>
  );
}

export const VoiceDemoPlayer = memo(VoiceDemoPlayerBase);
