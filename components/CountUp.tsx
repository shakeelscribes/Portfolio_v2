"use client";

import { useEffect, useRef } from "react";

type Props = {
  value: string;
  className?: string;
};

/**
 * Metric count-up. Parses "0.8017", "68,645", "1.5M", "6-step" and
 * animates only the numeric part, writing straight to the DOM node.
 * Runs once on first view; renders the final value under reduced motion.
 */
export default function CountUp({ value, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/^([^0-9]*)([0-9][0-9.,]*)(.*)$/);
    if (!match) {
      el.textContent = value;
      return;
    }
    const [, prefix, numStr, suffix] = match;
    const grouped = numStr.includes(",");
    const decimals = numStr.includes(".")
      ? (numStr.split(".")[1] ?? "").length
      : 0;
    const target = parseFloat(numStr.replace(/,/g, ""));

    function render(v: number) {
      const fixed = v.toFixed(decimals);
      el!.textContent =
        prefix + (grouped ? Number(fixed).toLocaleString("en-US", { minimumFractionDigits: decimals }) : fixed) + suffix;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      render(target);
      return;
    }

    el.textContent = prefix + (0).toFixed(decimals) + suffix;

    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const dur = 1300;
      const step = (t: number) => {
        const p = Math.min(1, (t - start) / dur);
        render(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    io.observe(el);

    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
