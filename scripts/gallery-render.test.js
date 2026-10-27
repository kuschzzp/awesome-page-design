const test = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");
const { renderGallery } = require("./preview-gallery");
const { allStyles } = require("./preview-catalog");
const { buildStylePrompt, promptKinds } = require("./preview-prompts");
const { unpackPrompt } = require("./gallery-model");

const readData = (html) => JSON.parse(html.match(/<script id="gallery-data" type="application\/json">([\s\S]*?)<\/script>/)[1]);

test("the offline gallery carries every prompt losslessly with complete viewport metadata", () => {
  const html = renderGallery();
  const data = readData(html);
  assert.equal(data.styles.length, allStyles.length);
  for (const style of allStyles) {
    for (const lang of ["en", "zh"]) for (const kind of promptKinds) {
      assert.equal(unpackPrompt(data.prompts[style.id][lang], kind.key), buildStylePrompt(style, lang, kind.key));
    }
    assert.ok(html.includes(`data-style-card="${style.id}"`));
  }
  assert.deepEqual(data.viewports.mobile, { width: 390, height: 844 });
  assert.ok(!/<script\b[^>]*\bsrc=/.test(html), "standalone file must not need a script server");
  assert.ok(!/fetch\s*\(/.test(html), "prompt export must work without file-origin fetch");
  for (const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) new vm.Script(match[1]);
});

test("catalog text cannot terminate the gallery data script", (t) => {
  const original = allStyles[0].name;
  t.after(() => { allStyles[0].name = original; });
  const unsafe = '</script><img src="x" onerror="unexpected()">';
  allStyles[0].name = unsafe;
  const html = renderGallery();
  assert.equal(readData(html).styles[0].name, unsafe);
  assert.ok(!html.includes(unsafe));
});
