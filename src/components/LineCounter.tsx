import { useEffect, useRef, useState } from "react";

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
  const [bump, setBump] = useState(0);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setBump((n) => n + 1);
  }, [value]);

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
          aria-label={`Remove one ${label.toLowerCase()}`}
          className="studio-control grid h-12 place-items-center bg-paper text-2xl leading-none font-bold"
        >
          <span aria-hidden="true">&minus;</span>
        </button>
        <input
          id={id}
          type="number"
          min={0}
          inputMode="numeric"
          value={value}
          onChange={(e) => {
            const next = Math.max(0, Math.floor(Number(e.target.value) || 0));
            onChange(next);
          }}
          aria-label={`${label} quantity`}
          className="outline-ink font-display h-12 w-full bg-paper text-center text-2xl font-extrabold tabular-nums"
          style={{
            animation: bump ? "pop-count 180ms cubic-bezier(0.22,1,0.36,1)" : undefined,
          }}
          key={bump}
        />
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          aria-label={`Add one ${label.toLowerCase()}`}
          className="studio-control grid h-12 place-items-center bg-paper text-2xl leading-none font-bold"
        >
          <span aria-hidden="true">+</span>
        </button>
      </div>
    </div>
  );
}
