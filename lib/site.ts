/**
 * Canonical site origin, used for metadata, Open Graph, sitemap and robots.
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL  - explicit override, set this for a custom domain
 *   2. VERCEL_PROJECT_PRODUCTION_URL - supplied by Vercel, the production domain
 *   3. VERCEL_URL            - supplied by Vercel, the per-deployment domain
 *   4. a hardcoded fallback, so a fresh clone builds with zero configuration
 *
 * Vercel's own variables are not NEXT_PUBLIC_, so they are read at build time on
 * the server only and never inlined into the client bundle. That is correct
 * here: every consumer of SITE_URL (metadata, sitemap, robots, JSON-LD) is a
 * server module.
 *
 * The empty-string case matters. A dashboard variable left blank arrives as
 * "", not undefined, so a `??` fallback would not catch it and `new URL("")`
 * throws at module scope, which fails the build before any page renders. Every
 * candidate is therefore validated, and unusable input is skipped rather than
 * trusted.
 */

const FALLBACK = "https://mohamedshakeel.vercel.app";

function normalise(candidate: string | undefined): string | null {
  const raw = candidate?.trim();
  if (!raw) return null;

  // VERCEL_URL has no scheme; metadataBase requires an absolute URL.
  const absolute = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

  try {
    const url = new URL(absolute);
    // origin drops any path, query or hash that crept into the variable.
    return `${url.origin}${url.pathname.replace(/\/+$/, "")}`;
  } catch {
    return null;
  }
}

export const SITE_URL =
  normalise(process.env.NEXT_PUBLIC_SITE_URL) ??
  normalise(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
  normalise(process.env.VERCEL_URL) ??
  FALLBACK;
