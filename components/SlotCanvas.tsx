"use client";

import { useEffect, useRef } from "react";
import { canvasTheme, onThemeChange, rgba } from "@/lib/canvasTheme";

/**
 * Salon case visual: a live slot grid. Cells breathe in and out of
 * "booked" state while a now-line sweeps across the day.
 * Encodes the domain (slot booking), replacing screenshots entirely.
 */
export default function SlotCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let cells: { phase: number; booked: boolean }[] = [];
    let cols = 0;
    let rows = 0;
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

      cols = Math.max(10, Math.floor(w / 74));
      rows = Math.max(5, Math.floor(h / 74));
      cells = Array.from({ length: cols * rows }, () => ({
        phase: Math.random() * Math.PI * 2,
        booked: Math.random() < 0.38,
      }));
    }

    function draw(t: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      const cw = w / cols;
      const ch = h / rows;
      const pad = Math.min(6, cw * 0.14);
      const nowX = ((t / 9000) % 1) * (w + cw) - cw;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const cell = cells[c * rows + r];
          const x = c * cw + pad;
          const y = r * ch + pad;
          const bw = cw - pad * 2;
          const bh = ch - pad * 2;
          const past = c * cw < nowX;

          const pulse = 0.5 + 0.5 * Math.sin(t * 0.0009 + cell.phase);
          const filled = cell.booked && (past ? pulse > 0.15 : pulse > 0.45);

          ctx.beginPath();
          if (typeof ctx.roundRect === "function") ctx.roundRect(x, y, bw, bh, 4);
          else ctx.rect(x, y, bw, bh);
          if (filled) {
            ctx.fillStyle = past
              ? rgba(theme.accentInk, 0.75)
              : rgba(theme.accentInk, 0.4);
            ctx.fill();
          }
          ctx.strokeStyle = past
            ? rgba(theme.ink, 0.22)
            : rgba(theme.ink, 0.11);
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      ctx.fillStyle = rgba(theme.accentInk, 0.9);
      ctx.fillRect(nowX, 0, 2.5, h);
    }

    function drawStatic() {
      if (!ctx) return;
      // freeze at a pleasant mid-state
      for (const cell of cells) cell.phase = cell.phase % 2 > 1 ? 0 : cell.phase;
      draw(4200);
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    function frame(t: number) {
      draw(t);
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
