const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

test("one catalog edit propagates into every generated consumer without editing JavaScript", (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "catalog-propagation-test-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const repository = path.resolve(__dirname, "..");
  for (const name of ["scripts", "catalog"]) {
    fs.cpSync(path.join(repository, name), path.join(root, name), { recursive: true });
  }
  const file = path.join(root, "catalog/styles.json");
  const catalog = JSON.parse(fs.readFileSync(file, "utf8"));
  Object.assign(catalog.styles[0], { name: "Catalog mutation", zhName: "目录变更", brief: "Distinctive mutation description", zhBrief: "目录变更说明" });
  catalog.styles[0].playbook.name = "Changed layout";
  fs.writeFileSync(file, JSON.stringify(catalog));
  const script = `
    const { allStyles } = require('./scripts/preview-catalog');
    const { getScenario } = require('./scripts/preview-scenarios');
    const profiles = require('./scripts/preview-style-profiles');
    const { buildStylePrompt } = require('./scripts/preview-prompts');
    const { renderStyleDoc, renderStyleIndex } = require('./scripts/preview-documents');
    const { renderGallery } = require('./scripts/preview-gallery');
    const { renderReadmeTable } = require('./scripts/sync-catalog-docs');
    const { createPageRenderer } = require('./scripts/preview-page-renderer');
    const { renderStyleHtml } = createPageRenderer({ allStyles, getScenario, ...profiles, buildStylePrompt });
    const style = allStyles[0];
    process.stdout.write(JSON.stringify({
      html: renderStyleHtml(style), manual: renderStyleDoc(style), index: renderStyleIndex(),
      gallery: renderGallery(), prompt: buildStylePrompt(style), chinesePrompt: buildStylePrompt(style, 'zh'),
      englishReadme: renderReadmeTable('en'), chineseReadme: renderReadmeTable('zh'),
    }));
  `;
  const outputs = JSON.parse(execFileSync(process.execPath, ["-e", script], { cwd: root, encoding: "utf8", timeout: 10000, maxBuffer: 4 * 1024 * 1024 }));
  for (const name of ["html", "manual", "index", "gallery", "prompt", "englishReadme"]) {
    assert.ok(outputs[name].includes("Catalog mutation"), `${name} did not update`);
  }
  for (const name of ["chinesePrompt", "chineseReadme"]) assert.ok(outputs[name].includes("目录变更"), `${name} did not update`);
  for (const name of ["manual", "index", "prompt", "englishReadme"]) assert.ok(outputs[name].includes("Changed layout"), `${name} lost the profile update`);
});
