const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { inspectSkillReferences } = require("./skill-references");

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "skill-links-test-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.mkdirSync(path.join(root, "references"));
  return root;
}

test("a reference can be reached indirectly without duplicating every link in the entry", (t) => {
  const root = fixture(t);
  fs.writeFileSync(path.join(root, "SKILL.md"), "[workflow](references/workflow.md)");
  fs.writeFileSync(path.join(root, "references/workflow.md"), "[component](component.md)\n[online](https://example.com)");
  fs.writeFileSync(path.join(root, "references/component.md"), "# Component\n[back](../SKILL.md)");
  const result = inspectSkillReferences(root);
  assert.deepEqual(result.errors, []);
  assert.equal(result.reachable.size, 3);
});

test("broken, orphaned, and outside-skill references fail validation", (t) => {
  const root = fixture(t);
  fs.writeFileSync(path.join(root, "SKILL.md"), "[missing](references/missing.md)\n[outside](../outside.md)");
  fs.writeFileSync(path.join(root, "references/orphan.md"), "# Orphan");
  const errors = inspectSkillReferences(root).errors.join("\n");
  assert.match(errors, /broken local link/);
  assert.match(errors, /not reachable/);
  assert.match(errors, /outside the installed skill/);
});
