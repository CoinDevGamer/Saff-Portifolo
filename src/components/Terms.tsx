import { Section } from "./Section";

const terms = [
  {
    title: "NSFW and adult content",
    text: "I do not provide voice-over services for sexually explicit, pornographic or fetish-related material.",
  },
  {
    title: "Hate speech and discriminatory content",
    text: "I will not voice content that promotes racism, sexism, homophobia, transphobia or any other form of discrimination or hate.",
  },
  {
    title: "Extremely violent or graphic material",
    text: "Projects that depict or glorify excessive violence, torture or abuse will not be accepted. This condition may vary depending on the context and type of game.",
  },
  {
    title: "Politically sensitive or extremist content",
    text: "I reserve the right to decline political content that promotes divisive or extremist agendas.",
  },
];

export function Terms() {
  return (
    <Section id="terms" background="var(--bubblegum)">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="sig sig-left lg:col-span-4">
          <p className="label-strip">Working together</p>
          <h2 className="font-display mt-2 text-4xl leading-[0.95] font-extrabold sm:text-5xl">
            Terms and conditions
          </h2>
          <p className="mt-4 max-w-[38ch] text-lg leading-relaxed">
            To maintain the integrity of my brand and personal values, I reserve the right to
            decline voice-over projects containing the following material.
          </p>
        </div>

        <ol className="sig sig-right grid gap-3 lg:col-span-8">
          {terms.map((term, index) => (
            <li
              key={term.title}
              className="terms-card motion-card outline-ink shadow-offset grid gap-2 bg-white p-4 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-4 sm:p-5"
              style={{ "--card-delay": `${index * 70}ms` } as React.CSSProperties}
            >
              <span className="label-strip grid h-9 w-9 place-items-center bg-ink text-paper">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-xl font-extrabold">{term.title}</h3>
                <p className="mt-1 leading-relaxed text-ink/80">{term.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
