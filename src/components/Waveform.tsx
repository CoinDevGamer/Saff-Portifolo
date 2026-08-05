type WaveformProps = {
  playing: boolean;
  bars?: number;
  className?: string;
  barClassName?: string;
  seed?: number;
};

/** Deterministic pseudo-random in [0,1) so server and client render alike. */
function rand(i: number, seed: number) {
  const x = Math.sin((i + 1) * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function Waveform({
  playing,
  bars = 48,
  className = "",
  barClassName = "bg-ink",
  seed = 1,
}: WaveformProps) {
  return (
    <div className={`flex h-full w-full items-end gap-[2px] ${className}`} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => {
        const base = Number((0.22 + rand(i, seed) * 0.78).toFixed(3));
        const duration = 420 + Math.round(rand(i, seed + 5) * 340);
        return (
          <span
            key={i}
            className={`min-w-[2px] flex-1 rounded-[1px] ${barClassName}`}
            style={{
              height: "100%",
              transformOrigin: "bottom",
              transform: `scaleY(${playing ? 1 : Number((base * 0.6).toFixed(3))})`,
              transition: playing ? undefined : "transform 220ms cubic-bezier(0.22,1,0.36,1)",
              animation: playing
                ? `bar-bounce ${duration}ms ${duration / 3}ms ease-in-out infinite alternate`
                : undefined,
              opacity: playing ? 1 : 0.55,
            }}
          />
        );
      })}
    </div>
  );
}
