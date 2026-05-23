"""Build cli/guides-meta.json from the upstream guide list + actual files."""
import json
import sys
from pathlib import Path

src_list = Path(sys.argv[1])  # the mwg list.json
guides_dir = Path(sys.argv[2])  # skills/modern-design-fusion/guides
out = Path(sys.argv[3])  # cli/guides-meta.json

text = src_list.read_text(encoding="utf-8-sig").strip()
upstream = json.loads(text)

results = []
for g in upstream:
    gid = g["id"]
    cat = g["category"]
    desc = g["description"]
    guide_path = guides_dir / cat / f"{gid}.md"
    if not guide_path.exists():
        print(f"WARN missing: {guide_path}", file=sys.stderr)
        continue
    content = guide_path.read_text(encoding="utf-8")
    # rough token estimate: words * 1.3
    token_count = int(len(content.split()) * 1.3)
    results.append({
        "id": gid,
        "category": cat,
        "description": desc,
        "tokenCount": token_count,
        "relPath": f"guides/{cat}/{gid}.md",
    })

out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(json.dumps(results, indent=2), encoding="utf-8")
print(f"Wrote {out} with {len(results)} guides.")
