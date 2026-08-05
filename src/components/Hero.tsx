import { featuredDemo } from "@/data/voiceDemos";
import { VoiceDemoPlayer } from "./VoiceDemoPlayer";

export function Hero() {
  return (
    <section id="top" className="border-b-2 border-ink" style={{ background: "var(--paper)" }}>
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-6 xl:col-span-5">
          <p
            className="enter label-strip outline-ink inline-block px-2 py-1"
            style={{ background: "var(--mint)", animationDelay: "70ms" }}
          >
            Studio 01 · Voice actor
          </p>

          <h1
            className="enter font-display mt-5 leading-[0.95] font-extrabold tracking-[-0.01em]"
            style={{ fontSize: "clamp(4.5rem, 10vw, 9rem)", animationDelay: "140ms" }}
          >
            <span className="inline-block" style={{ transform: "translateY(0.06em)" }}>
              S
            </span>
            <span
              className="relative inline-block px-1"
              style={{ transform: "translateY(-0.05em) rotate(-3deg)", marginInline: "0.02em" }}
            >
              <span
                className="outline-ink absolute inset-x-0 bottom-[0.02em] -z-10 h-[0.3em]"
                style={{ background: "var(--bubblegum)" }}
                aria-hidden="true"
              />
              a
            </span>
            <span className="inline-block" style={{ transform: "translateY(0.04em)" }}>
              f
            </span>
            <span className="inline-block" style={{ transform: "translateY(-0.02em)" }}>
              f
            </span>
            <span style={{ color: "var(--periwinkle)", WebkitTextStroke: "2px var(--ink)" }}>.</span>
          </h1>

          <svg
            viewBox="0 0 420 28"
            className="enter mt-2 h-6 w-full max-w-[420px]"
            aria-hidden="true"
            style={{ animationDelay: "180ms" }}
          >
            <path
              d="M0 14 Q 12 0 24 14 T 48 14 T 72 14 T 96 14 T 120 14 T 144 14 T 168 14 T 192 14 T 216 14 T 240 14 T 264 14 T 288 14 T 312 14 T 336 14 T 360 14 T 384 14 T 408 14 T 420 14"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="2"
            />
          </svg>

          <p
            className="enter mt-5 max-w-[46ch] text-lg leading-snug sm:text-xl"
            style={{ animationDelay: "210ms" }}
          >
            Voice actor for characters, animation, games, narration and creative projects.
          </p>

          <p
            className="enter hand mt-3 text-2xl text-ink/80"
            style={{ animationDelay: "260ms" }}
          >
            have a listen ♫
          </p>

          <div className="enter mt-7 flex flex-wrap gap-4" style={{ animationDelay: "300ms" }}>
            <button
              type="button"
              onClick={() => {
                const btn = document.getElementById("featured-play");
                btn?.scrollIntoView({ block: "center", behavior: "smooth" });
                btn?.click();
              }}
              className="studio-control label-strip inline-flex min-h-12 items-center gap-2 px-5"
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
          className="enter lg:col-span-6 lg:col-start-7 xl:col-span-7"
          style={{ animationDelay: "370ms" }}
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
