"use client";

import { useEffect, useRef } from "react";
import { canvasTheme, onThemeChange, rgba, rgbStr } from "@/lib/canvasTheme";

/**
 * Hero flow field: short ink strokes drifting along a sine-cosine field,
 * repelled and brightened near the cursor. Trails come from a translucent
 * fade fill, so per-frame cost is one rect plus N short lines.
 * Static frame under reduced motion; fully paused offscreen or hidden tab.
 */
export default function FlowField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = false;
    let inView = true;
    let w = 0;
    let h = 0;
    let t = 0;
    const mouse = { x: -9999, y: -9999 };
    let theme = canvasTheme();

    type P = { x: number; y: number; accent: boolean };
    let parts: P[] = [];

    function seed() {
      const count = Math.max(60, Math.min(220, Math.round((w * h) / 9000)));
      parts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        accent: Math.random() < 0.18,
      }));
    }

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, w * dpr);
      canvas.height = Math.max(1, h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.fillStyle = rgbStr(theme.bg);
      ctx!.fillRect(0, 0, w, h);
      seed();
    }

    function field(x: number, y: number) {
      return (
        Math.sin(x * 0.0016 + t * 0.00014) +
        Math.cos(y * 0.0013 - t * 0.00011)
      ) * Math.PI;
    }

    function frame() {
      if (!ctx) return;
      t += 16;
      ctx.fillStyle = rgba(theme.bg, 0.14);
      ctx.fillRect(0, 0, w, h);
      ctx.lineWidth = 1;

      for (const p of parts) {
        const a = field(p.x, p.y);
        let speed = 1.3;
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy);
        let boost = 0;
        if (d < 150) {
          boost = 1 - d / 150;
          speed = 1.3 + boost * 1.6;
        }
        const nx = p.x + Math.cos(a) * speed;
        const ny = p.y + Math.sin(a) * speed;
        const alpha = (p.accent ? 0.24 : 0.16) + boost * 0.35;
        ctx.strokeStyle = p.accent
          ? rgba(theme.accentInk, alpha)
          : rgba(theme.ink, alpha * 0.7);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);
        ctx.stroke();
        p.x = nx;
        p.y = ny;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
      }
      if (running) raf = requestAnimationFrame(frame);
    }

    function drawStatic() {
      if (!ctx) return;
      ctx.fillStyle = rgbStr(theme.bg);
      ctx.fillRect(0, 0, w, h);
      for (const p of parts) {
        ctx.fillStyle = p.accent
          ? rgba(theme.accentInk, 0.35)
          : rgba(theme.ink, 0.18);
        ctx.fillRect(p.x, p.y, 1.5, 1.5);
      }
    }

    function start() {
      if (running || !inView || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }
    function onVis() {
      if (document.hidden) stop();
      else start();
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

    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      if (!inView) stop();
      else if (!reduce.matches) start();
    });
    io.observe(canvas);

    if (reduce.matches) {
      drawStatic();
    } else {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);
      document.addEventListener("visibilitychange", onVis);
      start();
    }

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      off();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden role="presentation" />;
}
