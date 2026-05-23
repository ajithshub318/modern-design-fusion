"""Generate INDEX.md from the modern-web-guidance guide list."""
import json
import sys
from pathlib import Path
from collections import defaultdict

src = Path(sys.argv[1])
out = Path(sys.argv[2])

# Strip BOM and parse
text = src.read_text(encoding="utf-8-sig").strip()
guides = json.loads(text)

by_cat = defaultdict(list)
for g in guides:
    by_cat[g["category"]].append(g)

CATEGORY_ORDER = [
    "user-experience", "css", "css-layout", "html", "forms",
    "performance", "accessibility", "built-in-ai", "passkeys",
    "privacy", "security", "webmcp",
]

lines = [
    "# Guide Index",
    "",
    f"All **{len(guides)} guides** bundled in this plugin. Each row maps a guide ID to its description so Claude can pick the right one for a task via Grep.",
    "",
    "## How Claude uses this index",
    "",
    "1. Read this `INDEX.md` to find guide IDs matching the task (Grep on keywords in descriptions).",
    "2. Read the specific guide file at `guides/<category>/<id>.md`.",
    "3. No external CLI needed — fully local.",
    "",
    "---",
    "",
]

for cat in CATEGORY_ORDER:
    if cat not in by_cat:
        continue
    items = sorted(by_cat[cat], key=lambda g: g["id"])
    lines.append(f"## {cat} ({len(items)} guides)")
    lines.append("")
    lines.append("| ID | Description |")
    lines.append("|---|---|")
    for g in items:
        gid = g["id"]
        desc = g["description"].replace("|", "\\|").replace("\n", " ")
        lines.append(f"| [`{gid}`](./guides/{cat}/{gid}.md) | {desc} |")
    lines.append("")

# Catch any uncategorized
for cat in by_cat:
    if cat not in CATEGORY_ORDER:
        items = sorted(by_cat[cat], key=lambda g: g["id"])
        lines.append(f"## {cat} ({len(items)} guides)")
        lines.append("")
        lines.append("| ID | Description |")
        lines.append("|---|---|")
        for g in items:
            gid = g["id"]
            desc = g["description"].replace("|", "\\|").replace("\n", " ")
            lines.append(f"| [`{gid}`](./guides/{cat}/{gid}.md) | {desc} |")
        lines.append("")

out.write_text("\n".join(lines), encoding="utf-8")
print(f"Wrote {out} with {len(guides)} guides across {len(by_cat)} categories.")
