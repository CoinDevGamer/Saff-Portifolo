import { useState } from "react";
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
  const [discordCopied, setDiscordCopied] = useState(false);

  const copyDiscord = async () => {
    try {
      await navigator.clipboard.writeText("saffvcer");
    } catch {
      const input = document.createElement("textarea");
      input.value = "saffvcer";
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setDiscordCopied(true);
    window.setTimeout(() => setDiscordCopied(false), 1800);
  };

  return (
    <Section id="about" background="var(--paper)">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="sig sig-left lg:col-span-7">
          <p className="label-strip">Liner notes</p>
          <h2 className="font-display mt-2 text-4xl leading-[0.95] font-extrabold sm:text-5xl">
            A little about me
          </h2>
          <div className="motion-card outline-ink shadow-offset mt-6 bg-white p-6 sm:p-8">
            <div className="space-y-4 text-lg leading-relaxed sm:text-xl">
              <p className="font-display text-2xl font-bold">Hello, everyone!</p>
              <p>
                I&rsquo;m Saff, a semi-professional voice actor working in the industry since 2021.
                I&rsquo;m currently building my portfolio and looking to collaborate with game
                developers, animators and modders in the video game market.
              </p>
              <p>
                I&rsquo;m an experienced and passionate voice actor who would love to lend my voice
                to your project. I believe voice acting should elevate a project, and I would love
                to bring your characters to life.
              </p>
              <p>
                I have a wide vocal range and can voice both high-pitched and low-pitched
                characters. Please feel free to DM me for more details, or visit my YouTube channel
                or Casting Call Club profile for more information. Thank you!
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.youtube.com/channel/UC6dTdLwmJ93AfGJSr1b6Arw"
                  target="_blank"
                  rel="noreferrer"
                  className="studio-control control-chip label-strip inline-flex min-h-11 items-center bg-bubblegum px-4 py-2"
                >
                  Visit YouTube
                </a>
                <button
                  type="button"
                  onClick={copyDiscord}
                  className="studio-control control-chip label-strip inline-flex min-h-11 items-center gap-2 bg-mint px-4 py-2"
                  aria-label="Copy Discord username saffvcer"
                >
                  <span>Discord: saffvcer</span>
                  <span key={discordCopied ? "copied" : "copy"} className="copy-status">
                    {discordCopied ? "Copied!" : "Copy"}
                  </span>
                </button>
              </div>
            </div>
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
        </div>

        <div className="sig sig-right lg:col-span-5 lg:pt-16">
          <p className="label-strip">Credits</p>
          <h3 className="font-display mt-2 text-3xl font-extrabold">Available for</h3>
          <ul className="mt-5 grid gap-2">
            {availableFor.map((item, i) => (
              <li
                key={item}
                className="motion-row outline-ink grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 px-3 py-2.5"
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
                <span className="label-strip tabular-nums">{String(i + 1).padStart(2, "0")}</span>
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
