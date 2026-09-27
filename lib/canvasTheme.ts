/**
 * Theme-aware canvas colors. Canvases can't use CSS vars directly, so they
 * read the current token values (re-reading whenever the theme flips) and
 * draw with those. Keeps the generative art in lockstep with the page.
 */
export type RGB = [number, number, number];

function readVar(name: string, fallback: RGB): RGB {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const m = v.match(/^#([0-9a-f]{6})$/i);
  if (m) {
    const h = m[1];
    return [
      parseInt(h.slice(0, 2), 16),
      parseInt(h.slice(2, 4), 16),
      parseInt(h.slice(4, 6), 16),
    ];
  }
  return fallback;
}

export function canvasTheme() {
  return {
    bg: readVar("--color-bg", [11, 11, 12]),
    ink: readVar("--color-ink", [242, 242, 239]),
    // Accent as ink: chartreuse in dark, deep olive in light.
    accentInk: readVar("--color-accent-ink", [204, 245, 68]),
  };
}

export function rgba(c: RGB, a: number) {
  return `rgba(${c[0]},${c[1]},${c[2]},${a})`;
}

export function rgbStr(c: RGB) {
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

export function onThemeChange(cb: () => void) {
  window.addEventListener("themechange", cb);
  return () => window.removeEventListener("themechange", cb);
}
