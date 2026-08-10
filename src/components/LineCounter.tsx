import { useEffect, useRef, useState } from "react";
import { clampLineCount, maximumLinesPerType } from "@/data/pricing";

type Props = {
  id: string;
  label: string;
  hint: string;
  priceLabel: string;
  value: number;
  onChange: (value: number) => void;
  accent: string;
};

export function LineCounter({ id, label, hint, priceLabel, value, onChange, accent }: Props) {
  const [reel, setReel] = useState<{ dir: "up" | "down"; n: number } | null>(null);
  const prev = useRef(value);

  useEffect(() => {
    if (prev.current === value) return;
    const dir = value > prev.current ? "up" : "down";
    prev.current = value;
    setReel((r) => ({ dir, n: (r?.n ?? 0) + 1 }));
  }, [value]);

  const atZero = value === 0;
  const atMaximum = value >= maximumLinesPerType;

  return (
    <div className="outline-ink bg-white p-4" style={{ boxShadow: "5px 5px 0 var(--ink)" }}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <label htmlFor={id} className="font-display text-xl font-extrabold">
          {label}
        </label>
        <span className="outline-ink label-strip px-2 py-1" style={{ background: accent }}>
          {priceLabel}
        </span>
      </div>
      <p className="mt-1 text-sm text-ink/75">{hint}</p>

      <div className="mt-4 grid grid-cols-[3rem_minmax(0,1fr)_3rem] items-stretch gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          disabled={atZero}
          aria-label={`Remove one ${label.toLowerCase()}`}
          className="studio-control control-key grid h-12 place-items-center bg-paper text-2xl leading-none font-bold disabled:opacity-40"
        >
          <span aria-hidden="true">&minus;</span>
        </button>
        <div className="outline-ink relative h-12 overflow-hidden bg-paper">
          <input
            id={id}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={3}
            value={value}
            onChange={(e) => {
              const next = e.target.value;
              if (next === "") {
                onChange(0);
                return;
              }
              if (!/^\d+$/.test(next)) return;
              onChange(clampLineCount(Number(next)));
            }}
            onPaste={(e) => {
              e.preventDefault();
              const next = e.clipboardData.getData("text").trim();
              if (!/^\d+$/.test(next)) return;
              onChange(clampLineCount(Number(next)));
            }}
            aria-label={`${label} quantity`}
            aria-valuemin={0}
            aria-valuemax={maximumLinesPerType}
            aria-valuenow={value}
            className="reel font-display h-full w-full bg-transparent text-center text-2xl font-extrabold tabular-nums outline-none"
            data-dir={reel?.dir}
            key={reel?.n ?? 0}
          />
        </div>
        <button
          type="button"
          onClick={() => onChange(clampLineCount(value + 1))}
          disabled={atMaximum}
          aria-label={`Add one ${label.toLowerCase()}`}
          className="studio-control control-key grid h-12 place-items-center bg-paper text-2xl leading-none font-bold disabled:opacity-40"
        >
          <span aria-hidden="true">+</span>
        </button>
      </div>
    </div>
  );
}
