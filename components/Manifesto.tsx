"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

/**
 * Scroll-scrubbed manifesto: each word inks in as the line crosses the
 * viewport, driven by one scroll motion value and per-word transforms.
 * No re-renders per frame, reduced motion renders fully revealed.
 */

const WORDS: { text: string; accent?: boolean }[] = [
  { text: "I" }, { text: "build" }, { text: "AI" }, { text: "products" },
  { text: "the" }, { text: "whole" }, { text: "way" }, { text: "down." },
  { text: "The" }, { text: "model," }, { text: "the" }, { text: "data," },
  { text: "the" }, { text: "FastAPI" }, { text: "service" }, { text: "behind" },
  { text: "them," }, { text: "and" }, { text: "the" }, { text: "interface" },
  { text: "on" }, { text: "top." },
  { text: "Not" }, { text: "demos," }, { text: "not" }, { text: "notebooks." },
  { text: "Working" }, { text: "systems" }, { text: "that" }, { text: "survive" },
  { text: "real" }, { text: "users," }, { text: "from" }, { text: "prototype" },
  { text: "to" }, { text: "production,", accent: true },
  { text: "with" }, { text: "my" }, { text: "name", accent: true },
  { text: "on" }, { text: "every" }, { text: "layer." },
];

function Word({
  word,
  i,
  total,
  progress,
  reduce,
}: {
  word: { text: string; accent?: boolean };
  i: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const start = i / total;
  const end = Math.min(1, start + 1.6 / total);
  const opacity = useTransform(progress, [start, end], [0.12, 1]);

  return (
    <motion.span
      style={reduce ? undefined : { opacity }}
      className={word.accent ? "text-accent-ink" : undefined}
    >
      {word.text}{" "}
    </motion.span>
  );
}

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  });

  return (
    <section aria-label="Manifesto" className="px-6 py-32 md:px-10 md:py-52">
      <div ref={ref} className="mx-auto max-w-[1200px]">
        <p className="font-display text-[clamp(1.9rem,4.6vw,4.4rem)] leading-[1.18] font-semibold tracking-tight text-ink">
          {WORDS.map((w, i) => (
            <Word
              key={`${w.text}-${i}`}
              word={w}
              i={i}
              total={WORDS.length}
              progress={scrollYProgress}
              reduce={!!reduce}
            />
          ))}
        </p>
      </div>
    </section>
  );
}
