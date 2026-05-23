# Modern Design Fusion

A Claude Code skill that **orchestrates** two best-in-class upstream skills so
your agent gets technically modern code AND visually distinctive design in
one pass — instead of having to remember to invoke both.

## What it fuses

| Upstream | Fixes |
|---|---|
| [`modern-web-guidance`](https://github.com/GoogleChrome/modern-web-guidance) (Google Chrome) | AI defaulting to outdated web APIs (60-line custom modal vs `<dialog>`) |
| `frontend-design` (Anthropic, built into Claude Code) | AI defaulting to generic aesthetics (Inter font, purple gradients, evenly-spaced cards) |

This plugin adds a **routing table** that decides which upstream(s) to invoke
based on the user's intent, plus **opinionated defaults** for typography,
color, motion, and browser support.

## Install

```
/plugin marketplace add ajithshub318/modern-design-fusion
/plugin install modern-design-fusion@ajithshub318
/reload-plugins
```

**Prerequisites** (install these first if you haven't):

```
/plugin marketplace add GoogleChrome/modern-web-guidance
/plugin install modern-web-guidance@googlechrome

# frontend-design ships built-in with Claude Code; no install needed
```

## How it works

When you ask Claude to do anything frontend-related, the skill triggers and:

1. **Routes** your request: build/create/design tasks → invoke BOTH; pure API
   questions → only `modern-web-guidance`; pure aesthetic critiques → only
   `frontend-design`.
2. **Retrieves** the relevant modern-web-guidance guide(s) via its `npx` CLI.
3. **Commits** to one bold aesthetic axis (refuses to blend three).
4. **Reconciles** any conflict between performance and aesthetic
   (e.g. heavy animation breaking INP → use `scheduler.yield()`).
5. **Self-checks** before reporting done.

## House style defaults

Out of the box, the skill nudges Claude toward:

- Distinctive type pairings (never Inter / Roboto / Arial)
- `oklch()` colors with a dominant hue + sharp accent
- CSS-only motion (`@starting-style`, scroll-driven animations)
- Container queries, subgrid, `:has()` over predictable 3-col layouts
- Performance budget: LCP < 2.5s, INP < 200ms, CLS < 0.1
- No polyfills > 20 lines

Override any of these in your project's `CLAUDE.md`.

## License

Apache 2.0. See [LICENSE](./LICENSE) and [NOTICE](./NOTICE).

This plugin does not redistribute the upstream skills' content — it depends on
them being installed and routes between them.
