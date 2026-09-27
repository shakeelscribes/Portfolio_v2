"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { MARQUEE_ITEMS } from "@/lib/data";

/**
 * The page's single marquee, cut across the page at an angle. Skews with
 * scroll velocity, so the strip leans while you scroll and settles when
 * you stop. Every third word runs as an outline for rhythm. Static under
 * prefers-reduced-motion via globals.css.
 */
export default function Marquee() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 60, stiffness: 250, mass: 0.6 });
  const skewX = useTransform(smooth, [-3000, 0, 3000], [-6, 0, 6], { clamp: true });

  const strip = (hidden: boolean) => (
    <div aria-hidden={hidden} className="flex shrink-0 items-center">
      {MARQUEE_ITEMS.map((item, i) => (
        <span key={item} className="flex items-center">
          <span
            className={`px-6 font-display text-4xl font-medium tracking-tight md:px-9 md:text-6xl ${
              i % 3 === 2 ? "" : "text-ink/55"
            }`}
            style={i % 3 === 2 ? { WebkitTextStroke: "1px var(--color-faint)" } : undefined}
          >
            {item}
          </span>
          <span className="font-display text-4xl text-line md:text-6xl" aria-hidden>
            /
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <section
      aria-label="Technologies I work with"
      className="relative overflow-hidden py-8 md:py-12"
    >
      <motion.div
        style={reduce ? undefined : { skewX }}
        className="-mx-4 -rotate-[1.5deg] border-y border-line bg-raised/60 py-6 md:py-8"
      >
        <div className="flex w-max animate-marquee">
          {strip(false)}
          {strip(true)}
        </div>
      </motion.div>
    </section>
  );
}
