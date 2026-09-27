"use client";

import { useEffect, useRef } from "react";

const CHARS = "!<>-_\\/[]{}=+*^?#________";

type Props = {
  phrases: string[];
  className?: string;
  holdMs?: number;
};

/**
 * Terminal-style text scramble. Writes straight to the DOM node via rAF,
 * never through React state, so there are zero per-frame re-renders.
 * Collapses to the first phrase under prefers-reduced-motion.
 */
export default function Scramble({ phrases, className, holdMs = 2600 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = phrases[0];
      return;
    }

    let raf = 0;
    let timer = 0;
    let idx = 0;

    function scrambleTo(target: string) {
      const from = el!.textContent ?? "";
      const len = Math.max(from.length, target.length);
      const start = performance.now();
      const dur = 650;

      cancelAnimationFrame(raf);
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        let out = "";
        for (let i = 0; i < len; i++) {
          const threshold = i / len;
          if (p >= threshold + 0.1) out += target[i] ?? "";
          else if (p > threshold)
            out += CHARS[(Math.random() * CHARS.length) | 0];
          else out += from[i] ?? "";
        }
        el!.textContent = out;
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }

    function cycle() {
      idx = (idx + 1) % phrases.length;
      scrambleTo(phrases[idx]);
      timer = window.setTimeout(cycle, holdMs);
    }

    el.textContent = phrases[0];
    timer = window.setTimeout(cycle, holdMs);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [phrases, holdMs]);

  return (
    <span ref={ref} className={className} aria-label={phrases.join(", ")}>
      {phrases[0]}
    </span>
  );
}
