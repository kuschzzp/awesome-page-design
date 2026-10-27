const test = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");
const { allStyles } = require("./preview-catalog");
const { promptKinds, buildStylePrompt } = require("./preview-prompts");
const { getGalleryStyles, filterGalleryStyles, packPromptVariants, unpackPrompt } = require("./gallery-model");

test("gallery exposes filter metadata and palette without leaking mutable catalog references", () => {
  const styles = getGalleryStyles();
  assert.deepEqual(styles.map((style) => style.id), allStyles.map((style) => style.id));
  for (const [index, style] of styles.entries()) {
    assert.deepEqual(style.selection, allStyles[index].selection);
    assert.equal(style.palette.bg, allStyles[index].bg);
    assert.equal(style.palette.primary, allStyles[index].primary);
    assert.ok(style.name && style.zhName && style.brief && style.zhBrief && style.bestFor && style.zhBestFor);
    assert.equal(Object.hasOwn(style, "notes"), false);
  }
  styles[0].selection.useCases.push("changed");
  styles[0].selection.family = "changed";
  styles[0].palette.bg = "changed";
  assert.notDeepEqual(styles[0], getGalleryStyles()[0]);
  assert.equal(allStyles[0].selection.useCases.includes("changed"), false);
});

test("every style's bilingual page prompts survive JSON serialization and browser decoding verbatim", () => {
  const browserDecode = vm.runInNewContext(`(${unpackPrompt.toString()})`);
  let originalBytes = 0;
  let packedBytes = 0;
  for (const style of allStyles) {
    for (const lang of ["en", "zh"]) {
      const variants = Object.fromEntries(promptKinds.map(({ key }) => [key, buildStylePrompt(style, lang, key)]));
      const packed = JSON.parse(JSON.stringify(packPromptVariants(variants)));
      for (const [kind, expected] of Object.entries(variants)) {
        assert.equal(unpackPrompt(packed, kind), expected, `${style.id}/${lang}/${kind}`);
        assert.equal(browserDecode(packed, kind), expected, `browser ${style.id}/${lang}/${kind}`);
      }
      originalBytes += Buffer.byteLength(JSON.stringify(variants));
      packedBytes += Buffer.byteLength(JSON.stringify(packed));
    }
  }
  assert.ok(packedBytes < originalBytes * 0.6, `Expected meaningful reduction: ${packedBytes}/${originalBytes}`);
});

test("compression handles edits, Unicode, identical, single and empty prompts without fixed wording", () => {
  const cases = [
    { full: "prefix 中文😀 one\nsuffix", mobile: "prefix 中文😀 two\nsuffix" },
    { full: "changed start, same end", dashboard: "another start, same end" },
    { first: "same", second: "same" },
    { only: "single variant" },
    { short: "", long: "not empty" },
    { a: "abc", b: "ab" },
    { a: "a", b: "ba" },
    { a: "😀", b: "😁" },
    { a: "alpha", b: "other" },
  ];
  for (const variants of cases) {
    const packed = JSON.parse(JSON.stringify(packPromptVariants(variants)));
    for (const [kind, text] of Object.entries(variants)) assert.equal(unpackPrompt(packed, kind), text);
  }
});

test("invalid prompt data and unknown kinds fail explicitly rather than copying a wrong prompt", () => {
  for (const value of [undefined, null, [], {}, { full: null }, { full: 42 }]) {
    assert.throws(() => packPromptVariants(value), /non-empty object of strings/);
  }
  const packed = packPromptVariants({ full: "valid" });
  assert.throws(() => unpackPrompt(packed, "missing"), /unknown kind/);
  assert.throws(() => unpackPrompt(packed, "toString"), /unknown kind/);
  assert.throws(() => unpackPrompt({ ...packed, suffix: null }, "full"), /Invalid packed prompt/);
});

test("search and selection facets combine with AND and work in the browser without dependencies", () => {
  const styles = getGalleryStyles();
  const options = { query: "FUTURISTIC dense", useCase: "admin", appearance: "dark" };
  const filtered = filterGalleryStyles(styles, options);
  assert.ok(filtered.length > 0);
  for (const style of filtered) {
    assert.equal(style.selection.family, "futuristic");
    assert.equal(style.selection.density, "dense");
    assert.equal(style.selection.appearance, "dark");
    assert.ok(style.selection.useCases.includes("admin"));
  }
  const browserFilter = vm.runInNewContext(`(${filterGalleryStyles.toString()})`);
  assert.equal(JSON.stringify(browserFilter(styles, options)), JSON.stringify(filtered));
  assert.equal(filterGalleryStyles(styles, { query: "不存在的风格关键词" }).length, 0);
  assert.equal(filterGalleryStyles(styles, { useCase: "admin", appearance: "light", query: "Stark" }).length, 0);
  assert.equal(filterGalleryStyles(styles, { query: styles[0].zhName })[0].id, styles[0].id);
  assert.ok(filterGalleryStyles(styles, { query: "Photography" }).some((style) => style.id === "08"));
  assert.equal(filterGalleryStyles(styles, { query: "01" })[0].id, "01");
});

test("empty filter values preserve all styles and absent metadata never crashes search", () => {
  const styles = getGalleryStyles();
  for (const options of [undefined, null, {}, { query: " \n " }, { query: null, useCase: null, appearance: null }]) {
    assert.deepEqual(filterGalleryStyles(styles, options), styles);
  }
  assert.deepEqual(filterGalleryStyles(null), []);
  assert.deepEqual(filterGalleryStyles([]), []);
  assert.deepEqual(filterGalleryStyles([null, {}], { query: "missing" }), []);
  assert.deepEqual(filterGalleryStyles([{}], { useCase: "admin" }), []);
});

test("visible Chinese family and density labels can be searched", () => {
  const styles = getGalleryStyles();
  const futureIds = new Set(filterGalleryStyles(styles, { query: "未来科技" }).map((style) => style.id));
  for (const style of styles.filter((entry) => entry.selection.family === "futuristic")) assert.ok(futureIds.has(style.id));
  const denseIds = new Set(filterGalleryStyles(styles, { query: "高密度" }).map((style) => style.id));
  for (const style of styles.filter((entry) => entry.selection.density === "dense")) assert.ok(denseIds.has(style.id));
});
