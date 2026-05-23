# Modern Design Fusion

A **self-contained** Claude Code skill that gives your agent both modern
web platform APIs AND distinctive aesthetic direction — in one install, with
zero external dependencies.

## What it fuses (bundled inside this plugin)

| Bundled from | What it adds |
|---|---|
| [`modern-web-guidance`](https://github.com/GoogleChrome/modern-web-guidance) (Google Chrome) | 137 guides on modern web APIs — `<dialog>`, View Transitions, container queries, INP optimization, autofill, passkeys, on-device AI APIs, etc. |
| `frontend-design` skill (Anthropic) | Aesthetic philosophy that refuses generic AI defaults — no Inter, no purple gradients, no 3-col card grids |

**Both knowledge bases are bundled directly.** No external CLI invocation,
no other plugins required, no network access at runtime.

## Install (Claude Code plugin)

```
/plugin marketplace add ajithshub318/modern-design-fusion
/plugin install modern-design-fusion@ajithshub318
/reload-plugins
```

That's it. No prerequisites. No companion plugins.

## How it works

When you ask Claude to do anything frontend-related, the skill triggers and
reads bundled sibling files locally:

1. **Routes** your request via the table in `SKILL.md` (build/create → load
   everything; pure API question → guides only; pure aesthetic critique →
   philosophy only).
2. **Greps `INDEX.md`** for guide IDs matching the task keywords.
3. **Reads** the specific guide markdown files at `guides/<category>/<id>.md`.
4. **Reads** `design-philosophy.md` for aesthetic direction (when relevant).
5. **Reconciles** any tension between performance and aesthetic.
6. **Self-checks** against a verification checklist before reporting done.

No `npx`, no API calls, no embedding model required at runtime.

## Why bundled instead of dependent?

| Dimension | Orchestrator-only (depends on Google's plugin) | Self-contained (this design) |
|---|---|---|
| Install complexity | Requires 2 other plugins | One install |
| Token cost per task | ~12,000 (npx CLI overhead) | ~8,000 (local Read) |
| Startup delay | ~3s per `npx` call | None |
| Network required | Yes (for first `npx`) | No, fully offline |
| Updates from upstream | Automatic | Manual (re-run sync script) |

## Optional: terminal CLI (advanced)

The repo also ships a zero-dep Node CLI for terminal use. Not published to
npm — run it directly from a local clone:

```bash
git clone https://github.com/ajithshub318/modern-design-fusion.git
cd modern-design-fusion

node cli/index.mjs search "modal dialog with blur"
node cli/index.mjs retrieve "light-dismiss-a-dialog"
node cli/index.mjs list
```

Most people won't need this — the Claude Code plugin reads the same guides
directly. The CLI exists for grep-from-terminal use cases outside Claude Code.

## What's inside

```
modern-design-fusion/
├── .claude-plugin/
│   ├── plugin.json
│   └── marketplace.json
├── skills/modern-design-fusion/
│   ├── SKILL.md                 ← orchestrator (routing + house rules)
│   ├── INDEX.md                 ← 137-guide table of contents
│   ├── design-philosophy.md     ← bundled aesthetic doc
│   └── guides/                  ← 137 web-platform API guides
│       ├── user-experience/
│       ├── performance/
│       ├── forms/
│       ├── accessibility/
│       ├── built-in-ai/
│       └── ...
├── cli/                         ← optional terminal CLI (not on npm)
│   ├── index.mjs                ← search / retrieve / list
│   └── guides-meta.json         ← precomputed search index
├── scripts/
│   ├── generate-index.py        ← regenerates INDEX.md from upstream
│   └── build-meta.py            ← regenerates cli/guides-meta.json
├── package.json
├── README.md
├── LICENSE                      ← Apache 2.0
└── NOTICE                       ← attribution to Google + Anthropic
```

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

Apache 2.0. See [`LICENSE`](./LICENSE) and [`NOTICE`](./NOTICE) for full
attribution to Google (modern-web-guidance) and Anthropic (frontend-design).
