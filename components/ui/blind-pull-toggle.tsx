"use client";

/**
 * Blind-pull theme toggle: a slatted blind that collapses and reassembles on
 * pull, swapping the sun for the moon as it does. Every slat renders the full
 * control face and is clipped to its band, so the icon appears sliced and
 * rebuilt. The animation is pure transform (scaleY), so it composites on the
 * GPU and never triggers layout.
 *
 * Adapted from the original demo component for this site:
 *  - imports `motion/react` rather than `framer-motion`. Same library, already
 *    a dependency; installing framer-motion alongside `motion` would ship two
 *    copies of the same ~30KB runtime.
 *  - controlled (`dark` + `onToggle`) instead of self-contained state, so the
 *    control can never disagree with html[data-theme] - the single source of
 *    truth that the page, the canvases and the clock all read from. This also
 *    removes the original's MutationObserver, which watched for a `.dark`
 *    class that this codebase does not use.
 *  - fixed `size` prop instead of the ResizeObserver, since the control lives
 *    in one fixed-height slot (the nav) rather than a fluid container.
 *  - colours taken from the site tokens instead of the demo's warm greys, so
 *    the face, icon and cord belong to the same palette as the page.
 *  - honours prefers-reduced-motion: the blind snaps, it does not animate.
 */

import { useCallback, useRef, useState } from "react";
import { motion, useAnimate, useReducedMotion, stagger } from "motion/react";
import { Moon, Sun } from "@phosphor-icons/react";

const SLATS = 6;

export type BlindPullToggleProps = {
  /** Current theme, read from html[data-theme]. */
  dark: boolean;
  onToggle: (nextDark: boolean) => void;
  /** Diameter of the control face in px. Clamped to 28-64. */
  size?: number;
  /**
   * Draw the pull cord and its dot below the face. On by default, but it needs
   * vertical clearance: inside a horizontal toolbar the tail hangs below the
   * optical centreline and reads as a stray dangling object, so compact hosts
   * (the nav) turn it off and keep the slat blind alone.
   */
  cord?: boolean;
  /** Round face. Matches circular peers in a toolbar; the squircle reads better standalone. */
  circle?: boolean;
  className?: string;
  "aria-label"?: string;
};

export default function BlindPullToggle({
  dark,
  onToggle,
  size = 40,
  cord = true,
  circle = false,
  className,
  "aria-label": ariaLabel = "Dark mode",
}: BlindPullToggleProps) {
  const [animating, setAnimating] = useState(false);
  const [scope, animate] = useAnimate();
  const reduce = useReducedMotion();
  const sizeRef = useRef(size);
  sizeRef.current = size;

  const px = Math.round(Math.min(64, Math.max(28, size)));

  // Tunables, all derived from the face size as in the original.
  const iconSize = Math.round(px * 0.45);
  const radius = Math.round(px * 0.275);
  const faceRadius = circle ? "50%" : radius;
  const clipRadius = circle ? "50%" : Math.max(0, radius - 1);
  const cordRestH = Math.round(px * 0.26);
  const dotSize = Math.max(7, Math.round(px * 0.138));

  // Site palette: the face is the raised surface, the icon is ink, the cord
  // and dot carry the lime accent (olive on light, where lime lacks contrast).
  const face = dark
    ? "linear-gradient(145deg, #232327, #131315)"
    : "linear-gradient(145deg, #ffffff, #eceae4)";
  const border = dark ? "1.5px solid var(--color-line)" : "1.5px solid var(--color-line)";
  const shadow = dark
    ? "0 6px 26px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)"
    : "0 4px 18px rgba(22,22,15,0.12), inset 0 1px 0 rgba(255,255,255,0.9)";
  const iconColor = dark ? "#f2f2ef" : "#151513";
  const cordColor = dark
    ? "linear-gradient(to bottom, rgba(204,245,68,0.65), rgba(204,245,68,0.06))"
    : "linear-gradient(to bottom, rgba(92,109,0,0.55), rgba(92,109,0,0.06))";
  const dotBg = dark ? "#ccf544" : "#5c6d00";
  const dotShadow = dark
    ? "0 2px 8px rgba(0,0,0,0.5)"
    : "0 2px 6px rgba(22,22,15,0.16)";

  const handleToggle = useCallback(async () => {
    if (animating) return;
    setAnimating(true);
    const next = !dark;

    if (reduce) {
      onToggle(next);
      setAnimating(false);
      return;
    }

    const s = sizeRef.current;
    if (cord) {
      const pullH = Math.round(s * 0.65);
      const restH = Math.round(s * 0.26);
      await animate(
        ".cord-line",
        { height: pullH },
        { duration: 0.1, ease: [0.4, 0, 1, 1] },
      );
      animate(
        ".cord-line",
        { height: restH },
        { type: "spring", stiffness: 300, damping: 18 },
      );
    }
    await animate(
      ".slat",
      { scaleY: 0 },
      { delay: stagger(0.04), duration: 0.1, ease: "easeIn" },
    );
    // The theme flips at the moment the blind is closed, so the icon the
    // visitor sees reassembling is already the one for the new theme.
    onToggle(next);
    await animate(
      ".slat",
      { scaleY: 1 },
      { delay: stagger(0.04), duration: 0.13, ease: "easeOut" },
    );

    setAnimating(false);
  }, [animating, animate, cord, dark, onToggle, reduce]);

  return (
    <div
      ref={scope}
      className={`flex select-none flex-col items-center ${className ?? ""}`}
    >
      <motion.button
        type="button"
        onClick={handleToggle}
        disabled={animating}
        aria-label={ariaLabel}
        aria-pressed={dark}
        whileHover={reduce ? undefined : { scale: 1.06 }}
        whileTap={reduce ? undefined : { scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        style={{
          width: px,
          height: px,
          borderRadius: faceRadius,
          border,
          boxShadow: shadow,
          cursor: animating ? "default" : "pointer",
          position: "relative",
          background: "transparent",
          padding: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: clipRadius,
            overflow: "hidden",
          }}
        >
          {Array.from({ length: SLATS }).map((_, i) => {
            const topPx = Math.round((i / SLATS) * px);
            const nextTopPx =
              i === SLATS - 1 ? px : Math.round(((i + 1) / SLATS) * px);
            const heightPx = nextTopPx - topPx;

            return (
              <div
                key={i}
                className="slat"
                style={{
                  position: "absolute",
                  top: topPx,
                  left: 0,
                  width: "100%",
                  // 1px of overlap: adjacent clip edges otherwise antialias
                  // into a visible seam across the face.
                  height: i === SLATS - 1 ? heightPx : heightPx + 1,
                  overflow: "hidden",
                  transformOrigin: "50% 50%",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -topPx,
                    left: 0,
                    width: px,
                    height: px,
                    background: face,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: iconColor,
                  }}
                >
                  {dark ? (
                    <Moon size={iconSize} weight="regular" />
                  ) : (
                    <Sun size={iconSize} weight="regular" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </motion.button>

      {/* The cord is a second click target for pointer users only; keyboard
          and screen-reader users go through the button above. */}
      {cord && (
        <div
          aria-hidden="true"
          className="flex cursor-pointer flex-col items-center"
          onClick={handleToggle}
        >
          <div
            className="cord-line"
            style={{
              width: 2,
              height: cordRestH,
              background: cordColor,
              borderRadius: 1,
            }}
          />
          <div
            style={{
              width: dotSize,
              height: dotSize,
              borderRadius: "50%",
              background: dotBg,
              boxShadow: dotShadow,
            }}
          />
        </div>
      )}
    </div>
  );
}
