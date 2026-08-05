export function Footer() {
  return (
    <footer style={{ background: "var(--ink)" }} className="text-paper">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 px-4 py-10 sm:px-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div>
          <p className="font-display text-3xl leading-none font-extrabold">
            saff <span aria-hidden="true">♫₊⊹</span>
          </p>
          <p className="mt-2 max-w-[42ch] text-paper/80">
            Voice actor for characters, animation, games, narration and creative projects.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-4">
          <a href="#demos" className="label-strip min-h-11 self-center">
            Demos
          </a>
          <a href="#about" className="label-strip min-h-11 self-center">
            About
          </a>
          <a href="#quote" className="label-strip min-h-11 self-center">
            Build a quote
          </a>
        </nav>
      </div>
      <div className="border-t-2 border-paper/25">
        <p className="mx-auto max-w-[1280px] px-4 py-4 text-sm text-paper/70 sm:px-6">
          Recorded, edited and voiced by Saff.
        </p>
      </div>
    </footer>
  );
}
