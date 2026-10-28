const test = require("node:test");
const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const expected = require("./fixtures/preview-output-sha256.json");
const { allStyles } = require("./preview-catalog");
const { getScenario } = require("./preview-scenarios");
const { getStylePlaybook, getGeometryProfile, getImplementationProfile } = require("./preview-style-profiles");
const { promptKinds, buildStylePrompt } = require("./preview-prompts");
const { createPageRenderer } = require("./preview-page-renderer");
const { renderStyleDoc, renderStyleIndex, getChineseStyleDoc } = require("./preview-documents");
const { renderGallery } = require("./preview-gallery");

const { renderStyleHtml } = createPageRenderer({
  allStyles, getScenario, getStylePlaybook, getGeometryProfile, getImplementationProfile, buildStylePrompt,
});
const sha256 = (content) => crypto.createHash("sha256").update(content).digest("hex");

// Prompt baselines track the accepted catalog design revisions.
// Preview presentation and concise manuals retain structural/data assertions.
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
    assert.ok(!/reference-disclosure|interaction-demo|style-lab|href="#details"/.test(html), "standalone component examples must not return");
    const manual = renderStyleDoc(style);
    const translated = getChineseStyleDoc(style);
    const playbook = { ...getStylePlaybook(style), ...translated.playbook };
    const implementation = { ...getImplementationProfile(style), ...translated.implementation };
    const values = [style.zhName, style.zhBrief, style.zhBestFor,
      style.bg, style.surface, style.text, style.muted, style.primary, style.accent, style.border, style.radius, style.shadow,
      ...translated.notes, translated.geometryDescription, playbook.zhName, playbook.zhStructure, playbook.zhTypography,
      playbook.zhComponents, playbook.zhButtons, playbook.zhMedia, playbook.zhStates, playbook.zhAvoid,
      ...Object.entries(getGeometryProfile(style)).filter(([key]) => key !== "description").map(([, value]) => value),
      ...Object.entries(implementation).filter(([key]) => key.startsWith("zh")).map(([, value]) => value),
      ...Object.values(translated.adaptation), ...translated.scenario.features.flat(), ...translated.scenario.queue.flat()];
    for (const value of values) assert.ok(manual.includes(value), `manual lost design data: ${value}`);
    assert.ok(!manual.includes(buildStylePrompt(style)), "manual should link to prompt export rather than embed it");
    assert.ok(!manual.includes(style.brief), "Chinese manual must not repeat English prose");
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
  assert.ok(html.includes('id="style-grid"') && html.includes('id="detail-dialog"'));
  const index = renderStyleIndex();
  for (const style of allStyles) assert.ok(index.includes(`(styles/${style.slug}.md)`));
});
