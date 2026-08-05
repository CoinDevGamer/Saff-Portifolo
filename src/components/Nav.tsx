import { useEffect, useState } from "react";

const links = [
  { href: "#demos", label: "Demos" },
  { href: "#about", label: "About" },
  { href: "#pricing", label: "Pricing" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#demos");

  useEffect(() => {
    const ids = ["demos", "about", "pricing", "quote"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper">
      <nav
        aria-label="Main"
        className="mx-auto grid max-w-[1280px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-2.5 sm:px-6"
      >
        <a href="#top" className="enter flex min-w-0 items-baseline gap-2" style={{ animationDelay: "0ms" }}>
          <span className="font-display text-2xl leading-none font-extrabold tracking-tight">
            saff
          </span>
          <span
            className="outline-ink px-1.5 py-0.5 text-xs leading-none"
            style={{ background: "var(--bubblegum)" }}
            aria-hidden="true"
          >
            ♫₊⊹
          </span>
          <span className="sr-only">Saff, voice actor. Home</span>
          <span className="ml-2 hidden items-center gap-1.5 sm:flex">
            <span
              className="outline-ink block h-2.5 w-2.5 rounded-full"
              style={{ background: "#d94f5c" }}
              aria-hidden="true"
            />
            <span className="label-strip text-ink/70">Live</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href ? "true" : undefined}
              className="label-strip relative inline-flex min-h-11 items-center px-3"
            >
              {link.label}
              <span
                className="absolute right-2 bottom-1.5 left-2 h-[6px]"
                style={{
                  background: active === link.href ? "var(--periwinkle)" : "transparent",
                  border: active === link.href ? "2px solid var(--ink)" : "2px solid transparent",
                  transition: "background-color 160ms var(--ease-studio)",
                }}
              />
            </a>
          ))}
          <a
            href="#quote"
            className="studio-control label-strip ml-2 inline-flex min-h-11 items-center px-4"
            style={{ background: "var(--butter)" }}
          >
            Build a quote
          </a>
        </div>

        <button
          type="button"
          className="studio-control label-strip min-h-11 bg-white px-3 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open ? (
        <div id="mobile-menu" className="border-t-2 border-ink bg-white md:hidden">
          <ul className="mx-auto max-w-[1280px] px-4 py-2">
            {[...links, { href: "#quote", label: "Build a quote" }].map((link) => (
              <li key={link.href} className="border-b-2 border-ink/10 last:border-0">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="label-strip flex min-h-12 items-center"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
