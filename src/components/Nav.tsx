import { useCallback, useEffect, useRef, useState } from "react";

const links = [
  { href: "#demos", label: "Demos" },
  { href: "#about", label: "About" },
  { href: "#terms", label: "Terms" },
  { href: "#pricing", label: "Pricing" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [active, setActive] = useState("#demos");
  const audioContextRef = useRef<AudioContext | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [marker, setMarker] = useState<{ x: number; w: number } | null>(null);

  const playTone = useCallback(
    (frequency: number, duration: number, volume: number, delay = 0) => {
      if (!soundEnabled) return;
      const AudioContextClass = window.AudioContext;
      const context = audioContextRef.current ?? new AudioContextClass();
      audioContextRef.current = context;
      if (context.state === "suspended") void context.resume();

      const start = context.currentTime + delay;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, start);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(volume, start + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(start);
      oscillator.stop(start + duration + 0.01);
    },
    [soundEnabled],
  );

  useEffect(() => {
    const interactiveSelector = "a, button, [role='button']";
    const onHover = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      if (!audioContextRef.current || audioContextRef.current.state !== "running") return;
      const target = (event.target as Element | null)?.closest(interactiveSelector);
      if (!target || target.contains(event.relatedTarget as Node | null)) return;
      playTone(620, 0.045, 0.018);
    };
    const onClick = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest(interactiveSelector);
      if (!target) return;
      playTone(310, 0.065, 0.028);
      playTone(465, 0.08, 0.022, 0.035);
    };

    document.addEventListener("pointerover", onHover, true);
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("pointerover", onHover, true);
      document.removeEventListener("click", onClick, true);
    };
  }, [playTone]);

  useEffect(
    () => () => {
      void audioContextRef.current?.close();
    },
    [],
  );

  const measure = useCallback(() => {
    const list = listRef.current;
    const el = itemRefs.current[active];
    if (!list || !el) return;
    const a = el.getBoundingClientRect();
    const b = list.getBoundingClientRect();
    setMarker({ x: a.left - b.left + 8, w: a.width - 16 });
  }, [active]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    // fonts landing can change label widths
    const t = window.setTimeout(measure, 400);
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
    };
  }, [measure]);

  useEffect(() => {
    const ids = ["demos", "about", "terms", "pricing", "quote"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id === "quote" ? "pricing" : entry.target.id;
            setActive(`#${id}`);
          }
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
    <header
      className="seq-nav sticky top-0 z-50 border-b-2 border-ink bg-paper"
      style={{ "--d": "40ms" } as React.CSSProperties}
    >
      <nav
        aria-label="Main"
        className="mx-auto grid max-w-[1280px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-2.5 sm:px-6"
      >
        <a href="#top" className="flex min-w-0 items-baseline gap-2">
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
              className="seq-live outline-ink block h-2.5 w-2.5 rounded-full"
              style={{ background: "#d94f5c", "--d": "300ms" } as React.CSSProperties}
              aria-hidden="true"
            />
            <span className="label-strip text-ink/70">Live</span>
          </span>
        </a>

        <div ref={listRef} className="relative hidden items-center gap-1 md:flex">
          {/* one shared signal indicator that slides and resizes */}
          <span
            aria-hidden="true"
            className="nav-indicator pointer-events-none absolute bottom-1.5 left-0 h-[6px] border-2 border-ink"
            style={{
              background: "var(--periwinkle)",
              width: marker ? `${marker.w}px` : 0,
              transform: `translateX(${marker?.x ?? 0}px)`,
              opacity: marker ? 1 : 0,
            }}
          />
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              ref={(el) => {
                itemRefs.current[link.href] = el;
              }}
              aria-current={active === link.href ? "true" : undefined}
              className="nav-link label-strip relative inline-flex min-h-11 items-center px-3"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => setSoundEnabled((enabled) => !enabled)}
            aria-pressed={soundEnabled}
            className="sfx-toggle label-strip ml-1 inline-flex min-h-11 items-center gap-1.5 px-2"
            title="Toggle interface sounds"
          >
            <span className="sfx-lamp" data-on={soundEnabled ? "true" : "false"} />
            SFX {soundEnabled ? "On" : "Off"}
          </button>
          <a
            href="#quote"
            className="studio-control control-chip label-strip ml-2 inline-flex min-h-11 items-center px-4"
            style={{ background: "var(--butter)" }}
          >
            Build a quote
          </a>
        </div>

        <button
          type="button"
          className="studio-control control-chip label-strip min-h-11 bg-white px-3 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open ? (
        <div id="mobile-menu" className="mobile-menu border-t-2 border-ink bg-white md:hidden">
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
            <li className="border-b-2 border-ink/10 last:border-0">
              <button
                type="button"
                onClick={() => setSoundEnabled((enabled) => !enabled)}
                aria-pressed={soundEnabled}
                className="label-strip flex min-h-12 w-full items-center justify-between"
              >
                Interface sounds
                <span>{soundEnabled ? "On" : "Off"}</span>
              </button>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
