import type { CSSProperties } from "react";
import { featuredDemo } from "@/data/voiceDemos";
import { VoiceDemoPlayer } from "./VoiceDemoPlayer";

/**
 * Opening sequence: nav settles (40ms) → LIVE switches on (300ms) →
 * "Saff." channels lock (380–520ms) → waveform draws (560ms) →
 * copy resolves (620–700ms) → console slides in (720ms). Under ~900ms total.
 */
const letters: Array<{ ch: string; ty: string; hover: string; from: string }> = [
  { ch: "S", ty: "0.06em", hover: "-3px", from: "22px" },
  { ch: "a", ty: "-0.05em", hover: "2px", from: "-18px" },
  { ch: "f", ty: "0.04em", hover: "-4px", from: "20px" },
  { ch: "f", ty: "-0.02em", hover: "1px", from: "-16px" },
];

export function Hero() {
  return (
    <section id="top" className="border-b-2 border-ink" style={{ background: "var(--paper)" }}>
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-6 xl:col-span-5">
          <p
            className="seq label-strip outline-ink inline-block px-2 py-1"
            style={{ background: "var(--mint)", "--d": "200ms" } as CSSProperties}
          >
            Studio 01 · Voice actor
          </p>

          <h1
            className="wordmark font-display mt-5 leading-[0.95] font-extrabold tracking-[-0.01em]"
            style={{ fontSize: "clamp(4.5rem, 10vw, 9rem)" }}
          >
            {letters.map((l, i) => {
              const style = {
                "--ty": l.ty,
                "--hover": l.hover,
                "--lock-from": l.from,
                "--d": `${380 + i * 45}ms`,
              } as CSSProperties;
              if (l.ch === "a") {
                return (
                  <span
                    key={i}
                    className="wm-letter seq-letter relative px-1"
                    style={{ ...style, marginInline: "0.02em" }}
                  >
                    <span
                      className="outline-ink absolute inset-x-0 bottom-[0.02em] -z-10 h-[0.3em]"
                      style={{ background: "var(--bubblegum)" }}
                      aria-hidden="true"
                    />
                    a
                  </span>
                );
              }
              return (
                <span key={i} className="wm-letter seq-letter" style={style}>
                  {l.ch}
                </span>
              );
            })}
            <span
              className="wm-letter seq-letter"
              style={
                {
                  color: "var(--periwinkle)",
                  WebkitTextStroke: "2px var(--ink)",
                  "--ty": "0em",
                  "--hover": "-2px",
                  "--lock-from": "14px",
                  "--d": "560ms",
                } as CSSProperties
              }
            >
              .
            </span>
          </h1>

          <svg
            viewBox="0 0 420 28"
            className="mt-2 h-6 w-full max-w-[420px]"
            aria-hidden="true"
          >
            <path
              className="wm-wave"
              d="M0 14 Q 12 0 24 14 T 48 14 T 72 14 T 96 14 T 120 14 T 144 14 T 168 14 T 192 14 T 216 14 T 240 14 T 264 14 T 288 14 T 312 14 T 336 14 T 360 14 T 384 14 T 408 14 T 420 14"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="2"
              style={
                {
                  strokeDasharray: 900,
                  animation: "wave-draw 420ms var(--ease-signal) 560ms both",
                  "--dash": 900,
                } as CSSProperties
              }
            />
          </svg>

          <p
            className="seq mt-5 max-w-[46ch] text-lg leading-snug sm:text-xl"
            style={{ "--d": "640ms" } as CSSProperties}
          >
            Voice actor for characters, animation, games, narration and creative projects.
          </p>

          <p className="seq hand mt-3 text-2xl text-ink/80" style={{ "--d": "700ms" } as CSSProperties}>
            have a listen ♫
          </p>

          <div className="seq mt-7 flex flex-wrap gap-4" style={{ "--d": "740ms" } as CSSProperties}>
            <button
              type="button"
              onClick={() => {
                const btn = document.getElementById("featured-play");
                const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
                btn?.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
                btn?.click();
              }}
              className="studio-control control-transport label-strip inline-flex min-h-12 items-center gap-2 px-5"
              style={{ background: "var(--butter)" }}
            >
              ▶ Play showreel
            </button>
            <a
              href="#quote"
              className="studio-control label-strip inline-flex min-h-12 items-center px-5"
              style={{ background: "var(--sky)" }}
            >
              Build a quote
            </a>
          </div>
        </div>

        <div
          className="seq-console lg:col-span-6 lg:col-start-7 xl:col-span-7"
          style={{ "--d": "720ms" } as CSSProperties}
        >
          {featuredDemo ? (
            <VoiceDemoPlayer
              demo={featuredDemo}
              variant="console"
              seed={3}
              playButtonId="featured-play"
            />
          ) : (
            <div
              className="outline-ink shadow-offset bg-white p-8"
              style={{ background: "var(--white)" }}
            >
              <p className="label-strip">Showreel</p>
              <p className="font-display mt-2 text-2xl font-extrabold">
                The showreel is not up yet
              </p>
              <p className="mt-2 text-ink/75">
                Saff is putting one together. In the meantime, the demo library below has plenty
                to listen to.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
