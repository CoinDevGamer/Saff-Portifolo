import { Section } from "./Section";

const availableFor = [
  "Character voices",
  "Animation",
  "Video games",
  "Narration",
  "Commercial work",
  "Independent projects",
];

export function About() {
  return (
    <Section id="about" background="var(--paper)">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <p className="label-strip">Liner notes</p>
          <h2 className="font-display mt-2 text-4xl leading-[0.95] font-extrabold sm:text-5xl">
            A little about me
          </h2>
          <div
            className="outline-ink mt-6 bg-white p-6 sm:p-8"
            style={{ boxShadow: "5px 5px 0 var(--ink)" }}
          >
            <p className="text-lg leading-relaxed sm:text-xl">
              Hi, I&rsquo;m Saff. I enjoy experimenting with different voices and helping
              characters and ideas feel more expressive. I&rsquo;m open to animation, games,
              narration and other creative voice work.
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t-2 border-ink pt-5 sm:grid-cols-3">
              <div>
                <dt className="label-strip text-ink/60">Voiced by</dt>
                <dd className="font-display text-lg font-bold">Saff</dd>
              </div>
              <div>
                <dt className="label-strip text-ink/60">Recorded at</dt>
                <dd className="font-display text-lg font-bold">Home studio</dd>
              </div>
              <div>
                <dt className="label-strip text-ink/60">Takes per line</dt>
                <dd className="font-display text-lg font-bold">Up to 3</dd>
              </div>
            </dl>
          </div>

          {/* microphone cable connecting the notes to the credit strip */}
          <svg
            viewBox="0 0 400 90"
            className="mt-1 h-20 w-full max-w-[460px]"
            aria-hidden="true"
            preserveAspectRatio="none"
          >
            <path
              d="M24 0 C 24 45, 120 30, 200 55 S 360 80, 392 44"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="392" cy="44" r="6" fill="var(--bubblegum)" stroke="var(--ink)" strokeWidth="3" />
          </svg>
        </div>

        <div className="lg:col-span-5 lg:pt-16">
          <p className="label-strip">Credits</p>
          <h3 className="font-display mt-2 text-3xl font-extrabold">Available for</h3>
          <ul className="mt-5 grid gap-2">
            {availableFor.map((item, i) => (
              <li
                key={item}
                className="outline-ink grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 px-3 py-2.5"
                style={{
                  background: [
                    "var(--butter)",
                    "var(--mint)",
                    "var(--sky)",
                    "var(--bubblegum)",
                    "var(--periwinkle)",
                    "var(--white)",
                  ][i],
                }}
              >
                <span className="label-strip tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-lg font-bold">{item}</span>
              </li>
            ))}
          </ul>
          <p className="hand mt-3 text-2xl text-ink/80">say hi about anything else ♫</p>
        </div>
      </div>
    </Section>
  );
}
