import { useEffect, useRef, useState } from "react";

type WaveformProps = {
  playing: boolean;
  bars?: number;
  className?: string;
  barClassName?: string;
  seed?: number;
  /** Featured player uses a wider dynamic range than compact tracks. */
  expressive?: boolean;
};

/**
 * A deterministic travelling signal, not a random loader.
 * Adjacent bars sample the same two slow sine waves, so the shape reads as
 * one piece of audio moving across the strip. Animation is transform-only and
 * is paused whenever the audio is paused or the strip is off-screen.
 */
function pattern(i: number, seed: number) {
  const a = 0.5 + 0.5 * Math.sin(i * 0.46 + seed * 1.3);
  const b = 0.5 + 0.5 * Math.sin(i * 0.17 + seed * 2.1);
  const mix = 0.62 * a + 0.38 * b;
  return Number((0.26 + 0.74 * mix).toFixed(3));
}

export function Waveform({
  playing,
  bars = 48,
  className = "",
  barClassName = "bg-ink",
  seed = 1,
  expressive = false,
}: WaveformProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(true);
  const [unfurled, setUnfurled] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => setVisible(entries.some((e) => e.isIntersecting)),
      { threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Unfurl horizontally first, then let the bars respond vertically.
  useEffect(() => {
    if (!playing) {
      setUnfurled(false);
      return;
    }
    const id = requestAnimationFrame(() => setUnfurled(true));
    return () => cancelAnimationFrame(id);
  }, [playing]);

  const active = playing && unfurled;

  return (
    <div
      ref={ref}
      className={`wf flex h-full w-full items-center gap-[2px] ${className}`}
      data-playing={active ? "true" : "false"}
      data-paused={active && !visible ? "true" : "false"}
      data-unfurl={playing && !unfurled ? "false" : "true"}
      aria-hidden="true"
    >
      {Array.from({ length: bars }).map((_, i) => {
        const amp = pattern(i, seed);
        const hi = expressive ? amp : Number((0.34 + amp * 0.5).toFixed(3));
        const lo = Number((hi * (expressive ? 0.22 : 0.42)).toFixed(3));
        const rest = Number((hi * 0.34 + 0.06).toFixed(3));
        const duration = 460 + ((i * 37 + seed * 53) % 220);
        const delay = -((i * 42) % 640);
        return (
          <span
            key={i}
            className={`wf-bar min-w-[2px] flex-1 rounded-[1px] ${barClassName}`}
            style={
              {
                height: "100%",
                "--hi": hi,
                "--lo": lo,
                "--rest": rest,
                "--dur": `${duration}ms`,
                "--delay": `${delay}ms`,
                opacity: active ? 1 : 0.6,
                transition: "opacity var(--motion-ui) var(--ease-signal)",
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
