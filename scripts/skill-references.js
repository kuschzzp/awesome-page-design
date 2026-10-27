const fs = require("node:fs");
const path = require("node:path");

function markdownFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? markdownFiles(file) : entry.name.endsWith(".md") ? [file] : [];
  });
}

// Validate the installed skill's local links and actual reading graph rather
// than requiring every document to repeat the same headings or keywords.
function inspectSkillReferences(directory) {
  const root = path.resolve(directory);
  const entry = path.join(root, "SKILL.md");
  const files = [entry, ...markdownFiles(path.join(root, "references"))];
  const graph = new Map();
  const errors = [];
  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    const links = [];
    for (const match of content.matchAll(/!?\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)) {
      const target = match[1].replace(/^<|>$/g, "").split("#")[0];
      if (!target || /^[a-z][a-z\d+.-]*:/i.test(target)) continue;
      const resolved = path.resolve(path.dirname(file), decodeURIComponent(target));
      const relative = path.relative(root, resolved);
      if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
        errors.push(`${path.relative(root, file)} links outside the installed skill: ${target}`);
      } else if (!fs.existsSync(resolved)) {
        errors.push(`${path.relative(root, file)} has a broken local link: ${target}`);
      } else if (resolved.endsWith(".md")) {
        links.push(resolved);
      }
    }
    graph.set(file, links);
  }
  const reachable = new Set();
  const pending = [entry];
  while (pending.length) {
    const file = pending.pop();
    if (reachable.has(file)) continue;
    reachable.add(file);
    pending.push(...graph.get(file) || []);
  }
  for (const file of files) {
    if (!reachable.has(file)) errors.push(`${path.relative(root, file)} is not reachable from SKILL.md`);
  }
  return { errors, files, reachable };
}

module.exports = { inspectSkillReferences };
