import { memo, useCallback, useEffect, useRef, useState } from "react";
import type { VoiceDemo } from "@/data/voiceDemos";
import { Waveform } from "./Waveform";
import { DownloadIcon, PauseIcon, PlayIcon, VolumeIcon } from "./icons";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [failed, setFailed] = useState(false);

  // Another track took over: stop this one.
  useEffect(() => {
    if (variant === "track" && !active && playing) {
      audioRef.current?.pause();
    }
  }, [active, playing, variant]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || failed) return;
    if (audio.paused) {
      onActivate?.(demo.id);
      void audio.play().catch(() => setFailed(true));
    } else {
      audio.pause();
    }
  }, [demo.id, failed, onActivate]);

  const seek = useCallback((value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setCurrent(value);
  }, []);

  const audioEl = (
    <audio
      ref={audioRef}
      src={demo.audioFile}
      preload="metadata"
      onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
      onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
      onPlay={() => setPlaying(true)}
      onPause={() => setPlaying(false)}
      onEnded={() => {
        setPlaying(false);
        setCurrent(0);
      }}
      onError={() => setFailed(true)}
      onVolumeChange={(e) => setVolume(e.currentTarget.volume)}
    />
  );

  const playLabel = `${playing ? "Pause" : "Play"} ${demo.title}`;

  /* ------------------------------ CONSOLE ------------------------------ */
  if (variant === "console") {
    return (
      <div
        className="outline-ink relative bg-white p-4 sm:p-6"
        style={{
          boxShadow: playing ? "9px 9px 0 var(--ink)" : "5px 5px 0 var(--ink)",
          transition: "box-shadow 220ms var(--ease-studio)",
        }}
      >
        {audioEl}
        <div className="flex flex-wrap items-start justify-between gap-3 border-b-2 border-ink pb-3">
          <div className="min-w-0">
            <p className="label-strip text-ink/60">Featured showreel</p>
            <h2 className="font-display truncate text-2xl leading-tight font-extrabold sm:text-3xl">
              {demo.title}
            </h2>
            <p className="label-strip mt-1">
              {demo.category}
              {demo.isSample ? " · Sample" : ""}
            </p>
          </div>
          <div className="outline-ink flex shrink-0 items-center gap-2 px-2.5 py-1.5" style={{ background: playing ? "var(--bubblegum)" : "var(--paper)" }}>
            <span
              className="outline-ink block h-3 w-3 rounded-full"
              style={{
                background: playing ? "#d94f5c" : "transparent",
                transition: "background-color 180ms var(--ease-studio)",
              }}
            />
            <span className="label-strip">{playing ? "On air" : "Off air"}</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
          <button
            type="button"
            id={playButtonId}
            onClick={toggle}
            aria-label={playLabel}
            aria-pressed={playing}
            disabled={failed}
            className="studio-control grid h-16 w-16 shrink-0 place-items-center text-ink disabled:opacity-50 sm:h-20 sm:w-20"
            style={{ background: "var(--butter)" }}
          >
            {playing ? <PauseIcon className="h-8 w-8" /> : <PlayIcon className="h-8 w-8" />}
          </button>

          <div
            className="outline-ink h-16 overflow-hidden px-2 py-2 sm:h-20"
            style={{ background: "var(--sky)" }}
          >
            <Waveform playing={playing} bars={56} seed={seed} />
          </div>
        </div>

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
                if (audioRef.current) audioRef.current.volume = v;
              }}
              aria-label="Volume"
              className="studio-range h-11 w-28"
            />
          </div>
          <div className="flex items-center gap-3">
            {failed ? (
              <span className="label-strip text-ink/70">Showreel unavailable right now</span>
            ) : null}
            {demo.downloadable ? (
              <a
                href={demo.audioFile}
                download
                className="studio-control label-strip inline-flex min-h-11 items-center gap-2 bg-mint px-3 py-2"
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
      className="outline-ink"
      style={{
        background: active ? accent : "var(--white)",
        transform: active ? "translateY(-3px)" : "translateY(0)",
        boxShadow: active ? "5px 5px 0 var(--ink)" : "0 0 0 var(--ink)",
        transition:
          "background-color 220ms var(--ease-studio), transform 220ms var(--ease-studio), box-shadow 220ms var(--ease-studio)",
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
          className="studio-control grid h-11 w-11 shrink-0 place-items-center bg-paper text-ink disabled:opacity-50"
        >
          {playing ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
        </button>

        <button
          type="button"
          onClick={() => onActivate?.(demo.id)}
          className="min-w-0 text-left"
          aria-expanded={active}
        >
          <span className="label-strip flex items-center gap-2 text-ink/70">
            <span className="tabular-nums">
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
          {active && playing ? (
            <span
              className="outline-ink label-strip hidden bg-white px-2 py-1 sm:inline-block"
              style={{ animation: "studio-enter 280ms var(--ease-studio) both" }}
            >
              Now playing
            </span>
          ) : null}
          <span className="label-strip tabular-nums">{formatTime(duration)}</span>
        </div>
      </div>

      <div
        className="grid overflow-hidden px-3 sm:px-4"
        style={{
          gridTemplateRows: active ? "1fr" : "0fr",
          transition: "grid-template-rows 280ms var(--ease-studio)",
        }}
      >
        <div className="min-h-0">
          <div className="border-t-2 border-ink py-3">
            <div className="outline-ink h-14 bg-white px-2 py-2">
              <Waveform playing={playing} bars={40} seed={seed} />
            </div>
            <div className="mt-2 flex items-center gap-3">
              <span className="label-strip tabular-nums">{formatTime(current)}</span>
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.01}
                value={Math.min(current, duration || 0)}
                onChange={(e) => seek(Number(e.target.value))}
                aria-label={`Seek within ${demo.title}`}
                tabIndex={active ? 0 : -1}
                className="studio-range h-11 flex-1"
              />
              <span className="label-strip tabular-nums">{formatTime(duration)}</span>
              {demo.downloadable ? (
                <a
                  href={demo.audioFile}
                  download
                  tabIndex={active ? 0 : -1}
                  aria-label={`Download ${demo.title}`}
                  className="studio-control grid h-11 w-11 place-items-center bg-white"
                >
                  <DownloadIcon className="h-4 w-4" />
                </a>
              ) : null}
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
