"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Curtain preloader: wordmark plus a 0 to 100 counter, then the whole
 * sheet lifts away. Skipped entirely under prefers-reduced-motion and
 * never rendered on the server, so there is no SSR flash.
 */
export default function Preloader() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [done, setDone] = useState(false);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (reduce) return;
    setMounted(true);
    document.body.style.overflow = "hidden";

    const start = performance.now();
    const dur = 950;
    let raf = 0;

    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(step);
      } else {
        window.setTimeout(() => {
          setDone(true);
          document.body.style.overflow = "";
        }, 150);
      }
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {mounted && !done && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[90] flex flex-col justify-between bg-bg px-6 py-8 md:px-10"
        >
          <p className="font-display text-xl font-semibold tracking-tight text-ink">
            Shakeel<span className="text-accent-ink">.</span>
          </p>
          <div className="flex items-end justify-between">
            <p className="font-mono text-[13px] text-faint">
              GenAI and LLM Engineer
            </p>
            <p className="font-display text-7xl font-semibold tracking-tight text-ink md:text-8xl">
              {n}
              <span className="text-accent-ink">%</span>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
