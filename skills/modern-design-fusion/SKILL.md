---
name: modern-design-fusion
description: |
  Orchestrator for production-grade frontend work. Fuses two upstream skills:
  (1) modern-web-guidance — correct, modern web platform APIs (Google Chrome)
  (2) frontend-design — bold, non-generic aesthetic direction (Anthropic)

  MANDATORY: When this skill triggers, follow the routing table below to decide
  which upstream skill(s) to invoke BEFORE writing any frontend code.

  Trigger for:
  - "build / create / design / implement" any UI, page, component, modal, dialog, form, dashboard, landing page
  - "make this look better / less generic / more distinctive"
  - "the API I'm using is outdated / use the modern way"
  - "fix the layout / animation / styling / responsiveness"
  - Any HTML/CSS/client-side JS task with both *aesthetic* and *technical* dimensions

  Skip for: backend, CI/CD, infra, scripts, ESLint, git, generic programming.

  REQUIRES: `modern-web-guidance` and `frontend-design` plugins installed.
---

# Modern Design Fusion

A meta-skill that combines two complementary upstream skills so the agent gets
both technical correctness AND aesthetic distinction in one pass.

## Why this exists

The two upstream skills fix opposite failure modes:

| Failure | Fixed by |
|---|---|
| AI-generated UI looks generic (Inter font, purple gradients, evenly-spaced cards) | `frontend-design` |
| AI-generated code uses outdated patterns (60-line custom modal vs `<dialog>`) | `modern-web-guidance` |

Without orchestration, the agent might invoke one and forget the other.
This skill enforces the pairing with a routing table.

---

## 🚦 Routing table

Read the user's request, classify it into one of these intents, then invoke the
indicated skill(s) **before** writing code.

| Intent signal in user message | Invoke |
|---|---|
| "build / create / design / implement / make me a [UI thing]" | **BOTH** |
| "this looks generic / make it bolder / improve the design / aesthetic critique" | `frontend-design` only |
| "use the right / modern / native API for X" | `modern-web-guidance` only |
| "fix this dialog / form / animation / scroll behavior" | `modern-web-guidance` first; `frontend-design` only if visual polish is also requested |
| "review this UI for both correctness and design" | **BOTH** |
| "scaffold a full app / page / feature" | **BOTH** |

**Default when ambiguous:** invoke BOTH. It's cheap insurance against generic-looking, technically-outdated output.

---

## 📋 Execution protocol (when BOTH fire)

Run in this order — don't skip steps:

### Step 1 — Modern Web Guidance: collect technical guides
For each distinct UI feature the task touches (modal, scroll animation, form
validation, image loading, etc.), run:

```sh
npx.cmd -y modern-web-guidance@latest search "<action-oriented query>" --skill-version 2026_05_16-c5e7870
```

Pick the top hit (similarity > 0.5), then:

```sh
npx.cmd -y modern-web-guidance@latest retrieve "<id>"
```

Repeat per feature. Bundle the retrieved guides into your working context.

> Windows users: use `npx.cmd`, not `npx`.

### Step 2 — Frontend Design: commit to aesthetic direction
Apply the `frontend-design` skill's directives:
- Pick ONE bold aesthetic axis (brutalist, editorial, organic, retro-futurist,
  refined-minimal, etc.) — do NOT blend three.
- Choose distinctive typography (no Inter, Roboto, Arial, system fonts).
- Commit to a dominant color with sharp accents (no timid 5-color palettes).
- Plan ONE high-impact moment (page-load orchestration, hero animation, signature interaction).

### Step 3 — Merge constraints
Reconcile any conflicts between technical and aesthetic outputs:
- If the bold animation breaks INP, pick the `scheduler.yield()` pattern from the perf guide.
- If the custom font hurts LCP, use `font-display: optional` + a stable fallback metric.
- If the View Transition collides with a brutalist hard-cut aesthetic, drop the transition — aesthetic wins for *signature* elements, performance wins for *common* paths.

### Step 4 — Write code
Implement using:
- ✅ Modern APIs from Step 1's retrieved guides (with their fallback recipes)
- ✅ Aesthetic direction committed to in Step 2
- ❌ NO legacy patterns (JS modal libs, useState focus traps, etc.)
- ❌ NO generic AI defaults (Inter on slate-900, three-column cards, etc.)

### Step 5 — Self-check before finishing
Ask yourself:
1. Did I retrieve at least one modern-web-guidance guide per distinct UI feature?
2. Did I commit to ONE clear aesthetic, not a blend?
3. Could a stranger identify this design vs. a generic AI dashboard at 1m distance?
4. Did I provide fallbacks for non-Baseline features?

If any answer is "no", iterate before claiming done.

---

## 🎨 House style defaults (customize per project)

These are the defaults this orchestrator injects when the user gives no
specific brand direction. Override them in your project's `CLAUDE.md` if you
have a brand system.

- **Typography**: Pair a distinctive display font with a refined body font.
  Lean toward variable fonts (e.g. Fraunces, Instrument Serif, Söhne, Geist
  Mono, Author). Never default to Inter or Roboto.
- **Color**: Use `oklch()` for perceptual uniformity. Prefer a single dominant
  hue with one sharp accent over balanced 5-color palettes.
- **Motion**: Prefer CSS-only (`@starting-style`, `transition-behavior`,
  scroll-driven animations) over JS animation libraries. Use Motion for React
  only when CSS can't express it.
- **Layout**: Container queries by default. Subgrid for alignment. `:has()`
  for relational styling. Asymmetry and grid-breaking elements over predictable
  3-column repetition.
- **Backgrounds**: Add atmosphere — gradient meshes, noise textures, subtle
  grain overlays, layered transparencies. Never default to solid slate.
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

- [ ] At least one `modern-web-guidance` retrieve was run per distinct UI feature
- [ ] Aesthetic direction is one identifiable axis, not a blend
- [ ] Modern APIs used: `<dialog>`, Popover, container queries, `:has()`, oklch, View Transitions, etc.
- [ ] No generic AI defaults (font, color, layout)
- [ ] Fallbacks documented for non-Baseline features
- [ ] Accessibility primitives present (focus, ARIA, reduced motion)

---

## Attribution

Built on:
- [modern-web-guidance](https://github.com/GoogleChrome/modern-web-guidance) — Apache 2.0 © Google Chrome team
- [frontend-design](https://github.com/anthropics/claude-code) skill — Apache 2.0 © Anthropic

This orchestrator does not redistribute their content; it depends on both being installed separately and routes between them.
