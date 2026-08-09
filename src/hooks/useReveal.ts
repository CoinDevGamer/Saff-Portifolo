import { useEffect, useRef, useState } from "react";

/** Reveals an element once its leading edge enters the viewport. */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || shown) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      // Large sections can be taller than several viewports, so requiring a
      // large visible percentage can make them impossible to reveal.
      { threshold: 0.01 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [shown]);

  return { ref, shown };
}
