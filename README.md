# Mohamed Shakeel — Portfolio

Personal site for Mohamed Shakeel, GenAI & LLM Engineer. Next.js App Router,
Tailwind CSS v4, TypeScript. No UI framework: the design system is a small set
of tokens in `app/globals.css`, and every visual is hand-built.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, React 19) |
| Styling | Tailwind CSS v4, CSS custom properties for theming |
| Animation | `motion` (Framer Motion) — the only runtime animation dependency |
| Icons | `@phosphor-icons/react` |
| Smooth scroll | `lenis` |
| Language | TypeScript, strict |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

Node 20+ required.

## Environment

Copy `.env.example` to `.env.local`. The only variable is optional:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, Open Graph, `sitemap.xml` and `robots.txt`. Falls back to the Vercel subdomain. |

Set it in the Vercel dashboard (Project > Settings > Environment Variables) when
moving to a custom domain; no code change is needed.

## Architecture notes

**Theming.** The single source of truth is `data-theme` on `<html>`, set to
`light` or `dark`. An inline script in `app/layout.tsx` resolves it before first
paint from `localStorage`, falling back to the clock (light 07:00–18:59). Every
token in `globals.css` re-resolves off that attribute, and components that
canvas-render listen for a `themechange` event, so there is no React state
holding the theme. The toggle in the nav is controlled by that same value and
cannot drift from it.

**No per-element theme transitions.** Swapping tokens repaints the whole page;
instead the toggle uses the View Transitions API for a compositor-level
cross-fade, with an instant swap as the fallback. This is why there is no
`.theme-anim` rule in the stylesheet.

**Reduced motion.** `prefers-reduced-motion` is respected by the theme
cross-fade and by the blind-pull toggle, which snaps instead of animating.

**Work section.** The cards are a CSS sticky stack; each card's copy is
anchored under its chrome strip rather than vertically centred, so a long
title can never slide up into the meta line on a short viewport. Title scale
steps on width alone (`min-[…]` variants, not named breakpoints, because
Tailwind v4 emits named breakpoints after arbitrary ones).

**Client confidentiality.** The salon booking project is a private client
build. It is presented by category, with no link out, so neither the brand nor
the repository slug is exposed in the markup.

## Structure

```
app/            routes, metadata, sitemap, robots, OG image
components/     feature components
  ui/           primitives (shadcn convention)
lib/            data, theme tokens, canvas theme reader, site URL
public/         fonts, resume, work imagery
```

`components/ui/` follows the shadcn convention: primitives copied into the repo
rather than installed from a package, so `npx shadcn add <name>` has a stable
target. `components.json` is configured by hand, because `shadcn init` would
overwrite the theme token block in `globals.css`.

## Contact

- Email: ahamedshakeel2005@gmail.com
- LinkedIn: linkedin.com/in/mohamed-shakeel-720b2a29b
- GitHub: github.com/shakeelscribes
