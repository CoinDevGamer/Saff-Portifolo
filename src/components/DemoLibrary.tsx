import { useMemo, useState } from "react";
import { categories, voiceDemos } from "@/data/voiceDemos";
import { Section } from "./Section";
import { VoiceDemoPlayer } from "./VoiceDemoPlayer";

const accents = ["var(--butter)", "var(--mint)", "var(--sky)", "var(--bubblegum)", "var(--periwinkle)"];

export function DemoLibrary() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [activeId, setActiveId] = useState<string | null>(null);

  const demos = useMemo(
    () => voiceDemos.filter((d) => filter === "All" || d.category === filter),
    [filter],
  );

  return (
    <Section id="demos" background="var(--periwinkle)">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
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

        <div className="lg:col-span-7">
          <div
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
            role="group"
            aria-label="Filter demos by category"
          >
            {categories.map((cat) => {
              const selected = filter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  aria-pressed={selected}
                  className="label-strip min-h-11 shrink-0 border-2 border-ink px-3 whitespace-nowrap"
                  style={{
                    background: selected ? "var(--ink)" : "var(--white)",
                    color: selected ? "var(--paper)" : "var(--ink)",
                    transition: "background-color 160ms var(--ease-studio)",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <ul className="mt-8 grid gap-3">
        {demos.map((demo, i) => (
          <VoiceDemoPlayer
            key={demo.id}
            demo={demo}
            variant="track"
            trackNumber={voiceDemos.indexOf(demo) + 1}
            active={activeId === demo.id}
            onActivate={setActiveId}
            accent={accents[i % accents.length]}
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
    </Section>
  );
}
