"use client";

import { useEffect, useRef } from "react";
import { canvasTheme, onThemeChange, rgba } from "@/lib/canvasTheme";

/**
 * CardioGuard case visual: a monitor-style ECG sweep.
 * Dim full trace underneath, bright write head looping on top.
 * Encodes the project domain (cardiology), not decoration for its own sake.
 */
export default function EcgCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = Math.min(2, window.devicePixelRatio || 1);
    let theme = canvasTheme();

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, w * dpr);
      canvas.height = Math.max(1, h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // One heartbeat cycle: small P bump, sharp QRS complex, T wave, flat rest.
    function ecg(x: number) {
      const p = x % 1;
      let v = 0;
      v += 0.06 * Math.exp(-Math.pow((p - 0.16) / 0.025, 2));
      v -= 0.12 * Math.exp(-Math.pow((p - 0.30) / 0.008, 2));
      v += 1.0 * Math.exp(-Math.pow((p - 0.33) / 0.009, 2));
      v -= 0.22 * Math.exp(-Math.pow((p - 0.36) / 0.010, 2));
      v += 0.18 * Math.exp(-Math.pow((p - 0.55) / 0.045, 2));
      return v;
    }

    // Monitor-style backdrop grid, so the trace reads as a device screen.
    function grid() {
      if (!ctx) return;
      ctx.strokeStyle = rgba(theme.ink, 0.05);
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 64; x < w; x += 64) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 64; y < h; y += 64) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();
    }

    function trace(from: number, to: number, stroke: string, width: number) {
      if (!ctx) return;
      ctx.beginPath();
      const steps = Math.max(2, Math.floor((to - from) * 4));
      for (let i = 0; i <= steps; i++) {
        const x = from + ((to - from) * i) / steps;
        const y = h * 0.62 - ecg(x / w) * h * 0.42;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = stroke;
      ctx.lineWidth = width;
      ctx.lineJoin = "round";
      ctx.stroke();
    }

    function drawStatic() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      grid();
      trace(0, w, rgba(theme.accentInk, 0.32), 1.5);
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    function frame(t: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      grid();
      trace(0, w, rgba(theme.accentInk, 0.30), 1.5);
      const span = w * 0.28;
      const head = ((t / 9000) % 1) * (w + span);
      const from = Math.max(0, head - span);
      if (head - from > 2) {
        trace(from, head, rgba(theme.accentInk, 0.95), 2.5);
      }
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
