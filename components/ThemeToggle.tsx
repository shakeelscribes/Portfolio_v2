"use client";

import BlindPullToggle from "@/components/ui/blind-pull-toggle";
import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

function byClock() {
  const h = new Date().getHours();
  return h >= 7 && h < 19 ? "light" : "dark";
}

/**
 * Theme switch. State lives entirely in html[data-theme] plus localStorage, so
 * the page (including the canvases that listen for `themechange`) stays the
 * single source of truth. Until the user makes an explicit choice, the theme
 * follows the clock: light between 7:00 and 19:00, dark otherwise, re-checked
 * every minute.
 *
 * The knob is driven by the native checkbox's :checked state, so the control
 * animates in CSS with no JS in the render path.
 */
export default function ThemeToggle() {
  const reduce = useReducedMotion();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const el = document.documentElement;
    const sync = () => {
      const dark = el.dataset.theme === "dark";
      setIsDark(dark);
      // The inline bootstrap script runs before the viewport meta is parsed, so
      // the address-bar colour is reconciled here on first paint.
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", dark ? "#0b0b0c" : "#f4f4f2");
    };
    sync();
    window.addEventListener("themechange", sync);
    return () => window.removeEventListener("themechange", sync);
  }, []);

  function setTheme(next: string, persist: boolean) {
    const el = document.documentElement;
    const apply = () => {
      el.dataset.theme = next;
      window.dispatchEvent(new Event("themechange"));
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", next === "dark" ? "#0b0b0c" : "#f4f4f2");
    };
    if (persist) {
      try {
        localStorage.setItem("theme", next);
      } catch {}
    }
    // Compositor-level cross-fade where supported; instant swap otherwise.
    // No per-element CSS transitions: they repaint the whole page per frame.
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => void;
    };
    if (!reduce && typeof doc.startViewTransition === "function") {
      doc.startViewTransition(apply);
    } else {
      apply();
    }
  }

  useEffect(() => {
    const id = window.setInterval(() => {
      let claimed = false;
      try {
        claimed = !!localStorage.getItem("theme");
      } catch {
        claimed = true;
      }
      if (claimed) return;
      const next = byClock();
      if (document.documentElement.dataset.theme !== next) {
        document.documentElement.dataset.theme = next;
        window.dispatchEvent(new Event("themechange"));
      }
    }, 60000);
    return () => window.clearInterval(id);
  }, []);

  // The checkbox drives the CSS slide, so the only thing React has to do is
  // flip `checked`; the page cross-fade is handled inside setTheme.
  function toggle(next: boolean) {
    setIsDark(next);
    setTheme(next ? "dark" : "light", true);
  }

  // Toolbar host: circular so it reads as a peer to the neighbouring pill and
  // download button, and no pull cord, which would dangle below the row's
  // optical centreline. The slat blind carries the interaction on its own.
  return (
    <BlindPullToggle
      dark={isDark}
      onToggle={toggle}
      size={32}
      circle
      cord={false}
      className="shrink-0"
    />
  );
}
