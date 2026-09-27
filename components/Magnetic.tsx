"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

/**
 * Magnetic hover pull. Motion values live outside the React render cycle,
 * so pointer movement never re-renders the tree. Disabled for coarse pointers.
 */
export default function Magnetic({ children, className, strength = 0.25 }: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 16, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 180, damping: 16, mass: 0.2 });
  const ref = useRef<HTMLSpanElement>(null);
  const fine = useRef<boolean>(false);

  function onPointerMove(e: React.PointerEvent) {
    if (!ref.current) return;
    if (fine.current === false) {
      fine.current = window.matchMedia("(pointer: fine)").matches;
      if (!fine.current) return;
    }
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function onPointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className ?? ""}`}
    >
      {children}
    </motion.span>
  );
}
