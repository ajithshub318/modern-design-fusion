#!/usr/bin/env node
// modern-design-fusion CLI
// Commands: search "<query>", retrieve "<id>[,id2,...]", list
// Zero runtime deps. Searches over bundled guides-meta.json + bundled markdowns.

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PKG_ROOT = resolve(__dirname, "..");
const GUIDES_ROOT = join(PKG_ROOT, "skills", "modern-design-fusion");
const META_PATH = join(__dirname, "guides-meta.json");

function loadMeta() {
  return JSON.parse(readFileSync(META_PATH, "utf8"));
}

// --- Keyword scoring search (no deps, decent for 137 small docs) ---
function tokenize(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function scoreGuide(guide, queryTokens, rawQuery) {
  const idTokens = tokenize(guide.id.replace(/-/g, " "));
  const catTokens = tokenize(guide.category.replace(/-/g, " "));
  const descTokens = tokenize(guide.description);
  const descLower = guide.description.toLowerCase();

  let score = 0;
  for (const qt of queryTokens) {
    if (idTokens.includes(qt)) score += 5;
    if (catTokens.includes(qt)) score += 1;
    let descHits = 0;
    for (const dt of descTokens) if (dt === qt) descHits++;
    score += descHits * 3;
    // partial / substring match in description
    if (descLower.includes(qt) && !descTokens.includes(qt)) score += 1;
  }
  // exact phrase bonus
  if (rawQuery.length > 3 && descLower.includes(rawQuery.toLowerCase())) {
    score += 8;
  }
  return score;
}

function search(query, limit = 5) {
  const meta = loadMeta();
  const queryTokens = tokenize(query);
  const scored = meta
    .map((g) => ({ guide: g, score: scoreGuide(g, queryTokens, query) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  // normalize: divide by top score so similarity is 0..1
  const maxScore = scored.length ? scored[0].score : 1;
  return scored.map(({ guide, score }) => ({
    id: guide.id,
    description: guide.description,
    category: guide.category,
    tokenCount: guide.tokenCount,
    similarity: Math.round((score / maxScore) * 10000) / 10000,
  }));
}

function retrieve(idsArg) {
  const ids = idsArg
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const meta = loadMeta();
  const byId = new Map(meta.map((g) => [g.id, g]));
  const parts = [];
  for (const id of ids) {
    const g = byId.get(id);
    if (!g) {
      parts.push(`--- ERROR: unknown guide id "${id}" ---`);
      continue;
    }
    const fp = join(GUIDES_ROOT, g.relPath);
    if (!existsSync(fp)) {
      parts.push(`--- ERROR: missing file ${g.relPath} ---`);
      continue;
    }
    parts.push(`--- Guide for ${id} ---`);
    parts.push(readFileSync(fp, "utf8").trimEnd());
  }
  return parts.join("\n");
}

function list() {
  const meta = loadMeta();
  return JSON.stringify(
    meta.map((g) => ({
      id: g.id,
      category: g.category,
      description: g.description,
    })),
    null,
    2,
  );
}

function help() {
  return `modern-design-fusion CLI

Usage:
  npx -y modern-design-fusion@latest search "<query>"
  npx -y modern-design-fusion@latest retrieve "<id>[,id2,...]"
  npx -y modern-design-fusion@latest list

Commands:
  search <query>    Search bundled guides by keywords. Returns top 5 as JSON.
  retrieve <id>     Print the full markdown content of one or more guide IDs.
  list              Print all 137 guides as JSON.

Examples:
  npx -y modern-design-fusion@latest search "modal dialog with blur"
  npx -y modern-design-fusion@latest retrieve "light-dismiss-a-dialog"
  npx -y modern-design-fusion@latest retrieve "light-dismiss-a-dialog,translator"
  npx -y modern-design-fusion@latest list

Notes:
  - 100% local. No network calls. Works offline after first install.
  - Bundles 137 guides from GoogleChrome/modern-web-guidance (Apache 2.0).
  - Includes aesthetic philosophy from Anthropic's frontend-design (Apache 2.0).
`;
}

// --- argv parsing ---
const [, , cmd, ...rest] = process.argv;
const arg = rest.filter((a) => !a.startsWith("--")).join(" ");

try {
  switch (cmd) {
    case "search": {
      if (!arg) {
        console.error("No search query provided.");
        console.error(help());
        process.exit(1);
      }
      const results = search(arg);
      if (!results.length) {
        console.log("[]");
        console.error(
          `No matches for "${arg}". Try \`list\` to browse all 137 guides.`,
        );
        process.exit(0);
      }
      console.log(JSON.stringify(results, null, 2));
      break;
    }
    case "retrieve": {
      if (!arg) {
        console.error("No guide id provided.");
        console.error(help());
        process.exit(1);
      }
      console.log(retrieve(arg));
      break;
    }
    case "list": {
      console.log(list());
      break;
    }
    case "help":
    case "--help":
    case "-h":
    case undefined:
      console.log(help());
      break;
    default:
      console.error(`Unknown command: ${cmd}\n`);
      console.error(help());
      process.exit(1);
  }
} catch (err) {
  console.error("Error:", err.message);
  process.exit(1);
}
