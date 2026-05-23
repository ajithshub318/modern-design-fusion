---
name: modern-design-fusion
description: |
  Self-contained orchestrator for production-grade frontend work. Bundles two
  best-in-class knowledge bases directly: (1) 137 modern web platform guides
  from Google Chrome's modern-web-guidance, (2) Anthropic's frontend-design
  aesthetic philosophy. No external CLI, no dependencies on other plugins.

  MANDATORY: When this skill triggers, follow the routing table below to
  decide which local resources to read BEFORE writing any frontend code.

  Trigger for:
  - "build / create / design / implement" any UI, page, component, modal, dialog, form, dashboard, landing page
  - "make this look better / less generic / more distinctive"
  - "the API I'm using is outdated / use the modern way"
  - "fix the layout / animation / styling / responsiveness"
  - Any HTML/CSS/client-side JS task with both *aesthetic* and *technical* dimensions

  Skip for: backend, CI/CD, infra, scripts, ESLint, git, generic programming.
---

# Modern Design Fusion

Self-contained skill that combines technical correctness AND aesthetic
distinction. Everything is bundled — no external CLI calls, no dependencies on
other plugins being installed.

## 📂 What's bundled in this skill

Sibling files Claude reads directly via the Read tool:

| File | Purpose | Loaded when |
|---|---|---|
| `INDEX.md` | Map of all 137 guide IDs → descriptions | Step 1 of every task |
| `guides/<category>/<id>.md` | Specific implementation guides | Step 2, only the relevant ones |
| `design-philosophy.md` | Aesthetic direction & anti-patterns (from Anthropic's frontend-design) | Whenever visual polish matters |

**No `npx`, no network, no external skill dependencies.** Pure local Read operations.

---

## 🚦 Routing table

Read the user's request, classify it into one of these intents, then load the
indicated resources **before** writing code.

| Intent signal in user message | Load |
|---|---|
| "build / create / design / implement / make me a [UI thing]" | `INDEX.md` + relevant guides + `design-philosophy.md` |
| "this looks generic / make it bolder / improve the design" | `design-philosophy.md` only |
| "use the right / modern / native API for X" | `INDEX.md` + relevant guide(s) only |
| "fix this dialog / form / animation / scroll" | `INDEX.md` + relevant guide; load `design-philosophy.md` only if visual polish requested |
| "review this UI for both correctness and design" | All three |
| "scaffold a full app / page / feature" | All three |

**Default when ambiguous:** load all three. The token cost is small; the quality lift is large.

---

## 📋 Execution protocol (when full pipeline fires)

### Step 1 — Load the guide index
Read `INDEX.md` (sibling file). It lists all 137 guides with descriptions,
grouped by category (user-experience, performance, forms, accessibility, etc.)

### Step 2 — Pick relevant guides
For each distinct UI feature the task touches (modal, scroll animation, form
validation, image loading, etc.), find the matching guide ID in `INDEX.md` by
keyword-matching the descriptions.

**Tip**: use Grep on `INDEX.md` for fast keyword scans:
- "dialog" → finds `light-dismiss-a-dialog`, `declarative-dialog-popover-control`, etc.
- "container query" → finds `size-aware-styling`, `content-based-styling`, etc.
- "scroll" → finds `scrollytelling`, `scroll-driven animations`, etc.

### Step 3 — Read the picked guides
For each chosen guide, Read `guides/<category>/<id>.md`. Each guide includes:
- Modern API usage with code examples
- Browser support status (Baseline Widely / Newly Available / Limited)
- Fallback recipes for non-Baseline features
- Constraints and accessibility notes

### Step 4 — Load aesthetic direction
Read `design-philosophy.md` and commit to ONE bold aesthetic axis:
- brutalist, editorial, organic, retro-futurist, refined-minimal, etc.
- Pick distinctive typography (no Inter, Roboto, Arial, system fonts)
- Commit to a dominant color with sharp accents (no timid 5-color palettes)
- Plan ONE high-impact moment (page-load orchestration, hero animation)

### Step 5 — Reconcile conflicts
Resolve any tension between technical guides and aesthetic direction:
- Bold animation breaking INP → use `scheduler.yield()` pattern from perf guide
- Custom font hurting LCP → `font-display: optional` + stable fallback metric
- View Transition conflicts with brutalist hard-cut aesthetic → drop the
  transition; aesthetic wins for *signature* elements, performance wins for
  *common* paths

### Step 6 — Write code
- ✅ Modern APIs from Step 3's retrieved guides (with their fallback recipes)
- ✅ Aesthetic direction committed to in Step 4
- ❌ NO legacy patterns (JS modal libs, useState focus traps, etc.)
- ❌ NO generic AI defaults (Inter on slate-900, three-column cards, etc.)

### Step 7 — Self-check before finishing
1. Did I read at least one guide per distinct UI feature?
2. Did I commit to ONE clear aesthetic, not a blend?
3. Could a stranger identify this design vs. a generic AI dashboard at 1m?
4. Did I provide fallbacks for non-Baseline features?

If any answer is "no", iterate before claiming done.

---

## 🎨 House style defaults (customize per project)

Default opinions when the user gives no specific brand direction. Override
them in your project's `CLAUDE.md` if you have a brand system.

- **Typography**: Pair a distinctive display font with a refined body font.
  Lean toward variable fonts (Fraunces, Instrument Serif, Söhne, Geist Mono,
  Author). Never default to Inter or Roboto.
- **Color**: Use `oklch()` for perceptual uniformity. Prefer a single dominant
  hue with one sharp accent over balanced 5-color palettes.
- **Motion**: Prefer CSS-only (`@starting-style`, `transition-behavior`,
  scroll-driven animations) over JS animation libraries. Motion (for React)
  only when CSS can't express it.
- **Layout**: Container queries by default. Subgrid for alignment. `:has()`
  for relational styling. Asymmetry and grid-breaking over predictable 3-col.
- **Backgrounds**: Add atmosphere — gradient meshes, noise textures, grain
  overlays, layered transparencies. Never default to solid slate.
- **Accessibility**: `prefers-reduced-motion` respected. Focus rings visible.
  `:user-invalid` (not `:invalid`) for form errors. Semantic HTML by default.
- **Performance budget**: LCP < 2.5s, INP < 200ms, CLS < 0.1. Use Fetch
  Priority on LCP image. `content-visibility: auto` below the fold.
- **Browser support**: Assume Baseline Widely available is safe without
  fallbacks. For Newly Available features, provide the upstream guide's
  recommended lightweight fallback — never a polyfill > 20 lines.

---

## 🚫 Anti-patterns to refuse

Stop and ask before writing code that includes any of these:
- A custom JS modal when `<dialog>` would work
- `useState` + `useEffect` for what CSS `:has()` can express
- Heavy animation library when `@starting-style` + `transition-behavior` suffice
- Inter / Roboto / Arial / system-ui as a "safe default"
- Purple-to-blue gradient on slate-900 background
- A polyfill > 20 lines for a non-Baseline feature
- Custom focus trap when `<dialog>.showModal()` provides it natively

---

## 🧪 Verification checklist

Before reporting "done":

- [ ] At least one guide was Read per distinct UI feature
- [ ] Aesthetic direction is one identifiable axis, not a blend
- [ ] Modern APIs used: `<dialog>`, Popover, container queries, `:has()`, oklch, View Transitions, etc.
- [ ] No generic AI defaults (font, color, layout)
- [ ] Fallbacks documented for non-Baseline features
- [ ] Accessibility primitives present (focus, ARIA, reduced motion)

---

## Attribution

Bundled content under Apache 2.0:
- `guides/` and `INDEX.md` — derived from [modern-web-guidance](https://github.com/GoogleChrome/modern-web-guidance) © Google
- `design-philosophy.md` — adapted from `frontend-design` skill © Anthropic

See `NOTICE` in the repository root for full attribution.
