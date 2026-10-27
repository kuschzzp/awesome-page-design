const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { allStyles } = require("./preview-catalog");
const { renderReadmeTable, updateReadme, syncCatalogReadmes, syncCatalogDocs } = require("./sync-catalog-docs");

const source = "# Handwritten introduction\n<!-- style-catalog:start -->\nold table\n<!-- style-catalog:end -->\nKeep this ending.\n";

test("catalog updates preserve handwritten text and produce the requested language", () => {
  for (const lang of ["en", "zh"]) {
    const updated = updateReadme(source, lang);
    assert.ok(updated.startsWith("# Handwritten introduction\n"));
    assert.ok(updated.endsWith("Keep this ending.\n"));
    for (const style of allStyles) assert.ok(updated.includes(lang === "zh" ? style.zhName : style.name));
    assert.equal(updateReadme(updated, lang), updated, "sync must be idempotent");
  }
  assert.notEqual(renderReadmeTable("en"), renderReadmeTable("zh"));
});

test("invalid or ambiguous markers fail instead of replacing unrelated content", () => {
  assert.throws(() => updateReadme("no markers", "en"), /exactly one/);
  assert.throws(() => updateReadme(source + source, "en"), /exactly one/);
  assert.throws(() => updateReadme("<!-- style-catalog:end --><!-- style-catalog:start -->", "en"), /out of order/);
});

test("an invalid second README leaves both original documents intact", async (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "catalog-docs-test-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.writeFileSync(path.join(root, "README.md"), source);
  fs.writeFileSync(path.join(root, "README.zh-CN.md"), "missing markers");
  await assert.rejects(syncCatalogReadmes(root), /exactly one/);
  assert.equal(fs.readFileSync(path.join(root, "README.md"), "utf8"), source);
  assert.equal(fs.readFileSync(path.join(root, "README.zh-CN.md"), "utf8"), "missing markers");
});

test("documentation refresh leaves preview HTML, images and their manifest untouched", async (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "catalog-docs-test-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.writeFileSync(path.join(root, "README.md"), source);
  fs.writeFileSync(path.join(root, "README.zh-CN.md"), source);
  const assets = path.join(root, "skills/awesome-page-design/assets");
  fs.mkdirSync(assets, { recursive: true });
  const before = new Map();
  for (const name of ["example.html", "desktop.png", "mobile.png", "asset-manifest.json"]) {
    const file = path.join(assets, name);
    fs.writeFileSync(file, `original ${name}`);
    before.set(file, { content: fs.readFileSync(file), modified: fs.statSync(file).mtimeMs });
  }
  await syncCatalogDocs(root);
  for (const [file, original] of before) {
    assert.deepEqual(fs.readFileSync(file), original.content);
    assert.equal(fs.statSync(file).mtimeMs, original.modified);
  }
  const references = path.join(root, "skills/awesome-page-design/references");
  assert.equal(fs.readdirSync(path.join(references, "styles")).length, allStyles.length);
  assert.ok(fs.existsSync(path.join(references, "style-index.md")));
});
