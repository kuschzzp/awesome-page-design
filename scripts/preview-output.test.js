const test = require("node:test");
const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const expected = require("./fixtures/preview-output-sha256.json");
const { allStyles } = require("./preview-catalog");
const { getScenario } = require("./preview-scenarios");
const { getStylePlaybook, getGeometryProfile, getImplementationProfile, getAdaptationProfile } = require("./preview-style-profiles");
const { promptKinds, buildStylePrompt } = require("./preview-prompts");
const { createPageRenderer } = require("./preview-page-renderer");
const { renderStyleDoc, renderStyleIndex } = require("./preview-documents");
const { renderGallery } = require("./preview-gallery");

const { renderStyleHtml } = createPageRenderer({
  allStyles, getScenario, getStylePlaybook, getGeometryProfile, getImplementationProfile, buildStylePrompt,
});
const sha256 = (content) => crypto.createHash("sha256").update(content).digest("hex");

// Captured from the original single-file generator before module extraction.
// Exported prompts retain their pre-refactor bytes. Preview presentation and
// concise manuals evolve deliberately and have structural/data assertions.
test("the catalog retains all original public style identifiers", () => {
  assert.deepEqual(allStyles.map((style) => style.id).sort(), Object.keys(expected.styles).sort());
  assert.equal(new Set(allStyles.map((style) => style.slug)).size, allStyles.length);
});

for (const style of allStyles) {
  test(`${style.slug} preserves prompts and its preview/manual retain the selection contract`, () => {
    const baseline = expected.styles[style.id];
    const html = renderStyleHtml(style);
    assert.ok(html.includes(`?style=${style.id}#style-${style.id}`), "sample must return to the chosen style");
    assert.ok(html.includes(`Style ${style.id}`) && html.includes(style.zhName), "sample must identify its visual direction");
    assert.ok(/<details\b[^>]*class="reference-disclosure"/.test(html), "technical examples must be progressively disclosed");
    const manual = renderStyleDoc(style);
    const playbook = getStylePlaybook(style);
    const values = [style.name, style.zhName, style.brief, style.zhBrief, style.bestFor,
      style.bg, style.surface, style.text, style.muted, style.primary, style.accent, style.border, style.radius, style.shadow,
      ...style.notes, playbook.name, playbook.zhName, playbook.structure, playbook.typography,
      playbook.components, playbook.buttons, playbook.media, playbook.states, playbook.avoid,
      ...Object.values(getGeometryProfile(style)), ...Object.values(getImplementationProfile(style)),
      ...Object.values(getAdaptationProfile(style))];
    for (const value of values) assert.ok(manual.includes(value), `manual lost design data: ${value}`);
    assert.ok(!manual.includes(buildStylePrompt(style)), "manual should link to prompt export rather than embed it");
    for (const lang of ["en", "zh"]) {
      for (const kind of promptKinds) {
        assert.equal(sha256(buildStylePrompt(style, lang, kind.key)), baseline.prompts[lang][kind.key], `${lang}/${kind.key} prompt changed`);
      }
    }
  });
}

test("gallery contains the catalog and the compact index links to every style manual", () => {
  const html = renderGallery();
  assert.ok(html.includes('id="gallery-data"'));
  assert.ok(html.includes('id="search"') && html.includes('id="compare-dialog"'));
  const index = renderStyleIndex();
  for (const style of allStyles) assert.ok(index.includes(`(styles/${style.slug}.md)`));
});
