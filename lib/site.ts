/**
 * Canonical site origin, used for metadata, Open Graph, sitemap and robots.
 *
 * Set NEXT_PUBLIC_SITE_URL in the deployment environment (Vercel: Project >
 * Settings > Environment Variables) to move the site to a custom domain. The
 * fallback is the free Vercel subdomain, so a fresh clone builds and deploys
 * with no configuration at all.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mohamedshakeel.vercel.app"
).replace(/\/+$/, "");
