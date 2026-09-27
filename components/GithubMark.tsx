"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";

/** Official GitHub mark (octicon "mark-github", 16x16 space). */
const OCTO =
  "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z";

type Props = {
  /** circle = round badge (image right), square = tile badge (image left) */
  variant?: "circle" | "square";
  size?: number;
  className?: string;
  /** Tilt with scroll velocity, same physics as the marquee skew. */
  tilt?: boolean;
  /** Stagger the draw-on reveal. */
  delay?: number;
};

/**
 * Animated GitHub mark, reusable anywhere: draws itself on first view
 * (stroke pathLength, then fill), tilts gently with scroll velocity,
 * floats when idle. Colors ride currentColor, so it inverts with the
 * theme automatically.
 */
export default function GithubMark({
  variant = "circle",
  size = 40,
  className = "",
  tilt = true,
  delay = 0,
}: Props) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 120, damping: 26, mass: 0.7 });
  const rotate = useTransform(smooth, [-2400, 0, 2400], [-12, 0, 12], {
    clamp: true,
  });

  const spins = tilt && !reduce;

  return (
    <motion.svg
      viewBox="-0.5 -0.5 17 17"
      width={size}
      height={size}
      style={spins ? { rotate } : undefined}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {variant === "square" ? (
        <>
          <motion.rect
            x="0"
            y="0"
            width="16"
            height="16"
            rx="3.1"
            className="fill-current"
            style={{ transformBox: "fill-box" }}
            initial={reduce ? false : { scale: 0.2, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
          />
          <motion.path
            d={OCTO}
            transform="translate(3.04 3.04) scale(0.62)"
            fill="var(--color-bg)"
            stroke="var(--color-bg)"
            strokeWidth={0.5}
            strokeLinejoin="round"
            initial={reduce ? false : { pathLength: 0, fillOpacity: 0 }}
            whileInView={{ pathLength: 1, fillOpacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              pathLength: {
                duration: 1.1,
                ease: [0.65, 0, 0.35, 1],
                delay: delay + 0.35,
              },
              fillOpacity: { duration: 0.5, delay: delay + 1.2 },
            }}
          />
        </>
      ) : (
        <motion.path
          d={OCTO}
          className="fill-current"
          stroke="currentColor"
          strokeWidth={0.45}
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0, fillOpacity: 0 }}
          whileInView={{ pathLength: 1, fillOpacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            pathLength: {
              duration: 1.15,
              ease: [0.65, 0, 0.35, 1],
              delay,
            },
            fillOpacity: { duration: 0.55, delay: delay + 0.95 },
          }}
        />
      )}
    </motion.svg>
  );
}
