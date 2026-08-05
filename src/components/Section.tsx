import type { ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";

type Props = {
  id?: string;
  background?: string;
  className?: string;
  children: ReactNode;
};

/** Section wrapper: coloured band, bold divider, one-time scroll reveal. */
export function Section({ id, background = "var(--paper)", className = "", children }: Props) {
  const { ref, shown } = useReveal<HTMLElement>();

  return (
    <section
      id={id}
      ref={ref}
      className={`reveal ${shown ? "reveal-in" : ""} border-b-2 border-ink ${className}`}
      style={{ background }}
    >
      <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 sm:py-20">{children}</div>
    </section>
  );
}
