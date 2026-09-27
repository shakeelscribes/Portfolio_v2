"use client";

import { useEffect, useRef } from "react";
import { canvasTheme, onThemeChange, rgba } from "@/lib/canvasTheme";

/**
 * Anna University case visual: load waves radiating out of a waiting room.
 * Expanding rings that fade with distance, one accent ring leading the pack.
 */
export default function RingsCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let theme = canvasTheme();

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, w * dpr);
      canvas.height = Math.max(1, h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const RINGS = 6;
    const GAP = 0.16;

    function drawStatic() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      const cx = w * 0.5;
      const cy = h * 0.55;
      const maxR = Math.hypot(w, h) * 0.75;
      for (let i = 0; i < RINGS; i++) {
        const r = maxR * ((i + 1) / RINGS);
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = rgba(theme.ink, 0.3 - i * 0.03);
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    function frame(t: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      const cx = w * 0.5;
      const cy = h * 0.55;
      const maxR = Math.hypot(w, h) * 0.75;
      const cycle = (t / 5200) % 1;

      for (let i = 0; i < RINGS; i++) {
        const p = (cycle + i * GAP) % 1;
        const r = p * maxR;
        const alpha = (1 - p) * 0.5;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle =
          i === 0
            ? rgba(theme.accentInk, alpha + 0.5)
            : rgba(theme.ink, alpha * 0.85);
        ctx.lineWidth = i === 0 ? 1.8 : 1.25;
        ctx.stroke();
      }

      // Origin point of every wave: the waiting room.
      ctx.beginPath();
      ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = rgba(theme.accentInk, 0.9);
      ctx.fill();
      raf = requestAnimationFrame(frame);
    }

    resize();
    const off = onThemeChange(() => {
      theme = canvasTheme();
      if (reduce.matches) drawStatic();
    });
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce.matches) drawStatic();
    });
    ro.observe(canvas);

    if (reduce.matches) {
      drawStatic();
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      off();
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden role="presentation" />;
}
