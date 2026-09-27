---
"@": path alias to components.json
---

## What this file is

`components.json` is the shadcn/ui manifest. shadcn does **not** ship components
as a dependency: the CLI *copies* component source into this repo, so it needs
to know three things, and this file is where it reads them from.

1. **Where to put components** -> `aliases.components` = `components/ui`
2. **Where to put utilities** -> `aliases.utils` = `lib/utils`
3. **Which CSS variables to drive them with** -> `tailwind.css`

## Why `components/ui` matters

shadcn components are *yours* after install. They are meant to live in one
predictable folder, separate from the feature components that consume them:

```
components/
  ui/            <- primitives copied from shadcn (button.tsx, toggle-switch.tsx)
  Nav.tsx        <- feature components you own
  ThemeToggle.tsx
```

Two concrete reasons, not just tidiness:

- **The CLI needs a stable target.** `npx shadcn add <name>` writes to
  `aliases.components`. If primitives are scattered across `components/`, the
  CLI either duplicates them or writes to the wrong place, and you end up with
  two divergent copies of the same button.
- **Upgrade path.** Because a shadcn component is source you own, you edit it
  in place. Isolating primitives in `ui/` means a fix to a switch never
  accidentally carries a feature's business logic with it, and diffs stay
  readable.

## Why `lib/utils.ts` matters

shadcn components are built on `cn()`, a `clsx` + `tailwind-merge` wrapper.
`tailwind-merge` resolves conflicting Tailwind utilities so that a caller's
`className` always beats a component's default
(`cn("px-2", "px-4")` -> `"px-4"`). Without it, every primitive that accepts a
`className` override silently loses to whichever padding it shipped with.

## Note on this repo

`init` was **not** run. It rewrites `app/globals.css` with its own theme
variable block, which would have clobbered the hand-built palette
(`--color-accent`, `data-theme` light/dark tokens). The manifest below points
shadcn at the existing setup instead, so `npx shadcn add <primitive>` works
without disturbing the design system.
