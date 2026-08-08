import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { categories, voiceDemos } from "@/data/voiceDemos";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Section } from "./Section";
import { VoiceDemoPlayer } from "./VoiceDemoPlayer";

const accents = ["var(--butter)", "var(--mint)", "var(--sky)", "var(--bubblegum)", "var(--periwinkle)"];

type Category = (typeof categories)[number];

export function DemoLibrary() {
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState<Category>("All");
  const [shown, setShown] = useState<Category>("All");
  const [phase, setPhase] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const listRef = useRef<HTMLDivElement | null>(null);
  const chipRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [marker, setMarker] = useState<{ x: number; w: number } | null>(null);

  const measure = useCallback(() => {
    const list = listRef.current;
    const el = chipRefs.current[filter];
    if (!list || !el) return;
    const a = el.getBoundingClientRect();
    const b = list.getBoundingClientRect();
    setMarker({ x: a.left - b.left + list.scrollLeft, w: a.width });
  }, [filter]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    const t = window.setTimeout(measure, 400);
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
    };
  }, [measure]);

  // Results leave in one direction and the new set enters from the other.
  const select = (cat: Category) => {
    if (cat === filter) return;
    const dir = categories.indexOf(cat) > categories.indexOf(filter) ? "left" : "right";
    setFilter(cat);
    if (reduced) {
      setShown(cat);
      setPhase(null);
      return;
    }
    setPhase(`out-${dir}`);
    window.setTimeout(() => {
      setShown(cat);
      setPhase(dir === "left" ? "in-right" : "in-left");
    }, 100);
  };

  const demos = useMemo(
    () => voiceDemos.filter((d) => shown === "All" || d.category === shown),
    [shown],
  );

  return (
    <Section id="demos" background="var(--periwinkle)">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="sig sig-left lg:col-span-5">
          <p className="label-strip">Channel list</p>
          <h2 className="font-display mt-2 text-4xl leading-[0.95] font-extrabold sm:text-5xl">
            Pick a voice.
            <br />
            Press play.
          </h2>
          <p className="mt-3 max-w-[38ch] text-lg">
            Character work, animation, games, narration and more.
          </p>
          <p className="hand mt-2 text-2xl text-ink/80">samples for now ♪</p>
        </div>

        <div className="sig sig-right lg:col-span-7">
          <div
            ref={listRef}
            className="relative -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
            role="group"
            aria-label="Filter demos by category"
          >
            {/* one shared marker slides between the filters */}
            <span
              aria-hidden="true"
              className="nav-indicator pointer-events-none absolute top-0 left-0 h-11 border-2 border-ink"
              style={{
                background: "var(--ink)",
                width: marker ? `${marker.w}px` : 0,
                transform: `translateX(${marker?.x ?? 0}px)`,
                opacity: marker ? 1 : 0,
              }}
            />
            {categories.map((cat) => {
              const selected = filter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  ref={(el) => {
                    chipRefs.current[cat] = el;
                  }}
                  onClick={() => select(cat)}
                  aria-pressed={selected}
                  className="label-strip relative z-10 min-h-11 shrink-0 border-2 border-ink px-3 whitespace-nowrap"
                  style={{
                    background: selected ? "transparent" : "var(--white)",
                    color: selected ? "var(--paper)" : "var(--ink)",
                    transition: "color var(--motion-fast) var(--ease-switch)",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className="results mt-8"
        data-phase={phase ?? undefined}
        onAnimationEnd={() => {
          if (phase?.startsWith("in-")) setPhase(null);
        }}
      >
        <ul className="grid gap-3">
          {demos.map((demo, i) => (
            <VoiceDemoPlayer
              key={demo.id}
              demo={demo}
              variant="track"
              trackNumber={voiceDemos.indexOf(demo) + 1}
              active={activeId === demo.id}
              onActivate={setActiveId}
              accent={accents[i % accents.length]!}
              seed={i + 2}
            />
          ))}
          {demos.length === 0 ? (
            <li className="outline-ink bg-white p-6">
              <p className="font-display text-xl font-bold">Nothing in this channel yet</p>
              <p className="mt-1 text-ink/75">Try another category, or listen to the showreel.</p>
            </li>
          ) : null}
        </ul>
      </div>
    </Section>
  );
}
