const test = require("node:test");
const assert = require("node:assert/strict");
const catalog = require("../catalog/styles.json");
const { validateCatalog } = require("./catalog-validation");
const { allStyles, getStyleData } = require("./preview-catalog");
const { getScenario } = require("./preview-scenarios");
const { getStylePlaybook, getGeometryProfile, getImplementationProfile, getAdaptationProfile } = require("./preview-style-profiles");

const copy = () => structuredClone(catalog);

test("effective catalog is valid and preserves the public base-only style shape", () => {
  assert.deepEqual(validateCatalog(catalog), []);
  assert.deepEqual(allStyles.map((style) => style.id), catalog.styles.map((style) => style.id));
  for (const style of allStyles) {
    assert.equal(Object.hasOwn(style, "scenario"), false);
    assert.equal(Object.hasOwn(style, "playbook"), false);
    assert.equal(getScenario(style), getStyleData(style).scenario);
    assert.equal(getStylePlaybook(style), getStyleData(style).playbook);
    assert.equal(getGeometryProfile(style), getStyleData(style).geometry);
    assert.equal(getImplementationProfile(style), getStyleData(style).implementation);
    assert.equal(getAdaptationProfile(style), getStyleData(style).adaptation);
  }
});

test("catalog can grow or contain a smaller complete collection without a fixed style count", () => {
  const smaller = copy();
  smaller.styles = smaller.styles.filter((style) => style.id === smaller.fallbacks.profileStyleId);
  assert.deepEqual(validateCatalog(smaller), []);
  const additional = structuredClone(smaller.styles[0]);
  additional.id = "27";
  additional.slug = "style-27-example";
  smaller.styles.push(additional);
  assert.deepEqual(validateCatalog(smaller), []);
});

test("missing base and bilingual profile fields produce precise diagnostics", () => {
  const value = copy();
  delete value.styles[0].bg;
  delete value.styles[0].zhBrief;
  value.styles[0].playbook.zhTypography = " ";
  delete value.styles[0].implementation.zhResponsive;
  const errors = validateCatalog(value).join("\n");
  assert.match(errors, /styles\[0\]\.bg/);
  assert.match(errors, /styles\[0\]\.zhBrief/);
  assert.match(errors, /playbook\.zhTypography/);
  assert.match(errors, /implementation\.zhResponsive/);
});

test("duplicate identifiers and slugs are rejected", () => {
  const value = copy();
  value.styles.push(structuredClone(value.styles[0]));
  const errors = validateCatalog(value).join("\n");
  assert.match(errors, /id duplicates/);
  assert.match(errors, /slug duplicates/);
});

test("path traversal, separator injection and mismatched slug identifiers are rejected", () => {
  for (const slug of ["../escape", "style-01-../escape", "style-01-a/b", "style-01-a\\b", "style-01-%2e%2e", "style-99-safe-name"]) {
    const value = copy();
    value.styles[0].slug = slug;
    assert.match(validateCatalog(value).join("\n"), /styles\[0\]\.slug/);
  }
});

test("scenario and profile shape errors cannot silently enter generated prompts", () => {
  const value = copy();
  delete value.styles[0].geometry;
  value.styles[0].adaptation.mobile = null;
  value.styles[0].scenario.nav = [];
  value.styles[0].scenario.metrics = [["missing description"]];
  delete value.styles[0].scenario.tabs.assets;
  value.styles[0].notes = [false];
  const errors = validateCatalog(value).join("\n");
  for (const field of ["geometry", "adaptation.mobile", "scenario.nav", "scenario.metrics", "scenario.tabs.assets", "notes"]) {
    assert.ok(errors.includes(field), field);
  }
});

test("removed styles and fallback references must be safe and consistent", () => {
  const value = copy();
  value.removedStyleSlugs = [value.styles[0].slug, "../escape", "../escape"];
  value.fallbacks.profileStyleId = "missing";
  delete value.fallbacks.playbook.zhStructure;
  const errors = validateCatalog(value).join("\n");
  assert.match(errors, /still an active style/);
  assert.match(errors, /unsafe or invalid/);
  assert.match(errors, /duplicates/);
  assert.match(errors, /profileStyleId/);
  assert.match(errors, /fallbacks.playbook.zhStructure/);
});

test("malformed top-level values and incomplete entries return diagnostics", () => {
  for (const value of [null, [], {}, { version: 2, styles: [null], removedStyleSlugs: false }]) {
    assert.ok(validateCatalog(value).length > 0);
  }
});

test("unknown style compatibility fallbacks preserve dynamic scenario and legacy playbook", () => {
  const unknown = { id: "missing", name: "New direction", brief: "New brief" };
  assert.equal(getScenario(unknown).headline, "New direction");
  assert.equal(getScenario(unknown).lede, "New brief");
  assert.equal(getScenario(unknown).eyebrow, "New direction example");
  assert.equal(getStylePlaybook(unknown).layout, "minimal-command");
  assert.notEqual(getStylePlaybook(unknown), getStylePlaybook({ id: "09" }));
  for (const getter of [getGeometryProfile, getImplementationProfile, getAdaptationProfile]) {
    assert.equal(getter(unknown), getter({ id: catalog.fallbacks.profileStyleId }));
  }
  assert.equal(getScenario({ id: 10 }), getScenario({ id: "10" }));
});

test("selection metadata requires a family, appearance, density and supported use cases", () => {
  for (const selection of [undefined, null, {}, { family: "unknown", appearance: "bright", density: "huge", useCases: ["commerce"] }]) {
    const value = copy();
    value.styles[0].selection = selection;
    assert.match(validateCatalog(value).join("\n"), /styles\[0\]\.selection/);
  }
  const value = copy();
  value.styles[0].selection.useCases = [];
  assert.match(validateCatalog(value).join("\n"), /selection.useCases/);
  value.styles[0].selection.useCases = ["dashboard", "dashboard"];
  assert.match(validateCatalog(value).join("\n"), /must not contain duplicates/);
});

test("all supported selection appearances and densities are valid without artificial case limits", () => {
  const value = copy();
  value.styles[0].selection = {
    family: "tactile", appearance: "mixed", density: "sparse",
    useCases: ["landing", "dashboard", "admin", "portfolio", "editorial"],
  };
  assert.deepEqual(validateCatalog(value), []);
});
