const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { EventEmitter } = require("node:events");
const { execFileSync } = require("node:child_process");

// Exercise orchestration with simulated screenshots, without opening a browser.
process.env.PREVIEW_AUDIT_WIDTHS = "320";
process.env.PREVIEW_MOBILE = "1";
process.env.CHROME_PATH = path.join(os.tmpdir(), "missing-awesome-page-design-chrome");
const { generatePreviews, screenshot, screenshotWithChromeCli, waitForProcessExit, stopProcess } = require("./generate-previews");
const { readManifest, sha256File } = require("./preview-manifest");
const slug = "style-01-card-grid";

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "preview-generator-test-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const write = (relative, content) => {
    const file = path.join(root, relative);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content);
    return file;
  };
  const files = {
    html: write(`assets/styles/${slug}/${slug}.html`, "original HTML"),
    desktop: write(`assets/styles/${slug}/${slug}.png`, "original desktop"),
    mobile: write(`assets/styles/${slug}/${slug}-mobile.png`, "original mobile"),
    doc: write(`references/styles/${slug}.md`, "original manual"),
    index: write("references/style-index.md", "original style index"),
    gallery: write("assets/previews/index.html", "original gallery"),
    manifest: write("assets/previews/asset-manifest.json", JSON.stringify({
      version: 1,
      generated_at: "2026-01-01T00:00:00.000Z",
      styles: { untouched: { marker: "keep" } },
    })),
  };
  const before = Object.fromEntries(Object.entries(files).map(([key, file]) => [key, fs.readFileSync(file)]));
  return { root, files, before };
}

function configure(t, values = {}) {
  const settings = { PREVIEW_STYLE: "01", PREVIEW_STYLES: "", PREVIEW_INDEX_ONLY: "0", ...values };
  for (const [key, value] of Object.entries(settings)) {
    const previous = process.env[key];
    process.env[key] = value;
    t.after(() => {
      if (previous === undefined) delete process.env[key];
      else process.env[key] = previous;
    });
  }
}

function assertOriginals(fixture, except = []) {
  for (const [key, file] of Object.entries(fixture.files)) {
    if (!except.includes(key)) assert.deepEqual(fs.readFileSync(file), fixture.before[key], key);
  }
}

test("index-only updates the gallery without rewriting manuals, HTML, images or manifest", async (t) => {
  configure(t, { PREVIEW_INDEX_ONLY: "1" });
  const data = fixture(t);
  await generatePreviews({ skillDirectory: data.root, takeScreenshots: true,
    captureScreenshot: () => { throw new Error("index-only must not capture screenshots"); } });
  assertOriginals(data, ["gallery"]);
  assert.match(fs.readFileSync(data.files.gallery, "utf8"), /Style 26/);
});

test("a mobile screenshot failure preserves all original resources", async (t) => {
  configure(t);
  const data = fixture(t);
  let stagedRoot;
  await assert.rejects(generatePreviews({ skillDirectory: data.root, takeScreenshots: true,
    captureScreenshot: async (html, options = {}) => {
      stagedRoot = path.resolve(path.dirname(html), "../../..");
      assertOriginals(data);
      if (options.suffix) throw new Error("mobile screenshot failed");
      const output = html.replace(/\.html$/, ".png");
      fs.writeFileSync(output, "new desktop");
      return output;
    } }), /mobile screenshot failed/);
  assertOriginals(data);
  assert.equal(fs.existsSync(stagedRoot), false);
});

test("a late narrow-screen audit failure also discards the staged manifest", async (t) => {
  configure(t);
  const data = fixture(t);
  await assert.rejects(generatePreviews({ skillDirectory: data.root, takeScreenshots: true,
    captureScreenshot: async (html, options = {}) => {
      assertOriginals(data);
      if (options.auditOnly) throw new Error("320px audit failed");
      const output = html.replace(/\.html$/, `${options.suffix || ""}.png`);
      fs.writeFileSync(output, "new screenshot");
      return output;
    } }), /320px audit failed/);
  assertOriginals(data);
});

test("successful generation publishes the matching pair and relative manifest paths after auditing", async (t) => {
  configure(t);
  const data = fixture(t);
  const calls = [];
  let stagedRoot;
  await generatePreviews({ skillDirectory: data.root, takeScreenshots: true,
    captureScreenshot: async (html, options = {}) => {
      stagedRoot = path.resolve(path.dirname(html), "../../..");
      assertOriginals(data);
      calls.push(options);
      if (options.auditOnly) return null;
      const output = html.replace(/\.html$/, `${options.suffix || ""}.png`);
      fs.writeFileSync(output, options.suffix ? "new mobile" : "new desktop");
      return output;
    } });
  assert.equal(calls.length, 3);
  assert.equal(calls[2].auditOnly, true);
  assert.equal(calls[2].width, 320);
  const manifest = readManifest(data.files.manifest);
  assert.deepEqual(manifest.styles.untouched, { marker: "keep" });
  assert.equal(manifest.styles[slug].html.sha256, sha256File(data.files.html));
  assert.equal(manifest.styles[slug].desktop.sha256, sha256File(data.files.desktop));
  assert.equal(manifest.styles[slug].mobile.sha256, sha256File(data.files.mobile));
  assert.equal(manifest.styles[slug].html.path, `../styles/${slug}/${slug}.html`);
  assert.equal(fs.existsSync(stagedRoot), false);
});

test("HTML-only generation preserves screenshots and does not pretend to refresh their manifest", async (t) => {
  configure(t);
  const data = fixture(t);
  await generatePreviews({ skillDirectory: data.root, takeScreenshots: false,
    captureScreenshot: () => { throw new Error("HTML-only must not capture screenshots"); } });
  assertOriginals(data, ["html", "doc", "index", "gallery"]);
  assert.match(fs.readFileSync(data.files.html, "utf8"), /<!doctype html>/i);
});

test("desktop-only mode preserves the old mobile screenshot and manifest", (t) => {
  const data = fixture(t);
  const script = `
    const fs = require('node:fs');
    const { generatePreviews } = require(${JSON.stringify(require.resolve("./generate-previews"))});
    generatePreviews({
      skillDirectory: ${JSON.stringify(data.root)}, takeScreenshots: true,
      captureScreenshot: async (html, options = {}) => {
        if (options.suffix) throw new Error('unexpected mobile capture');
        if (options.auditOnly) return null;
        const output = html.replace(/\\.html$/, '.png');
        fs.writeFileSync(output, 'new desktop');
        return output;
      },
    }).catch((error) => { console.error(error); process.exitCode = 1; });
  `;
  execFileSync(process.execPath, ["-e", script], {
    env: { ...process.env, PREVIEW_STYLE: "01", PREVIEW_STYLES: "", PREVIEW_INDEX_ONLY: "0", PREVIEW_MOBILE: "0" },
    timeout: 10000,
  });
  assertOriginals(data, ["html", "desktop", "doc", "index", "gallery"]);
  assert.equal(fs.readFileSync(data.files.desktop, "utf8"), "new desktop");
});

test("Chrome preflight errors create no profile directories", async (t) => {
  const mock = t.mock.method(fs, "mkdtempSync", () => { throw new Error("unexpected temporary directory"); });
  await assert.rejects(screenshot("/unused.html"), /Chrome was not found/);
  await assert.rejects(screenshotWithChromeCli("/unused.html"), /Chrome was not found/);
  await assert.rejects(screenshotWithChromeCli("/unused.html", { auditOnly: true }), /cannot run/);
  assert.equal(mock.mock.callCount(), 0);
});

test("process-exit timeout removes listeners and failed spawns resolve without waiting", async () => {
  const child = Object.assign(new EventEmitter(), { exitCode: null, signalCode: null });
  assert.equal(await waitForProcessExit(child, 1), false);
  assert.equal(child.listenerCount("exit"), 0);
  assert.equal(child.listenerCount("error"), 0);
  const waiting = waitForProcessExit(child, 1000);
  child.emit("error", new Error("spawn failed"));
  assert.equal(await waiting, true);
  assert.equal(child.listenerCount("exit"), 0);
});

test("process cleanup waits for termination and leaves no exit listeners", async () => {
  const signals = [];
  const child = Object.assign(new EventEmitter(), {
    exitCode: null, signalCode: null,
    kill(signal) {
      signals.push(signal);
      queueMicrotask(() => { child.signalCode = signal; child.emit("exit"); });
    },
  });
  await stopProcess(child);
  assert.deepEqual(signals, ["SIGTERM"]);
  assert.equal(child.listenerCount("exit"), 0);
});

test("repository generation publishes README tables and skill resources together", async (t) => {
  configure(t);
  const data = fixture(t);
  const repository = fs.mkdtempSync(path.join(os.tmpdir(), "preview-repository-test-"));
  t.after(() => fs.rmSync(repository, { recursive: true, force: true }));
  const skillDirectory = path.join(repository, "skills", "example");
  fs.cpSync(data.root, skillDirectory, { recursive: true });
  const source = "Introduction\n<!-- style-catalog:start -->\nold table\n<!-- style-catalog:end -->\n";
  fs.writeFileSync(path.join(repository, "README.md"), source);
  fs.writeFileSync(path.join(repository, "README.zh-CN.md"), "invalid markers");
  await assert.rejects(generatePreviews({ skillDirectory, repositoryDirectory: repository, takeScreenshots: false }), /exactly one/);
  for (const [key, file] of Object.entries(data.files)) {
    assert.deepEqual(fs.readFileSync(path.join(skillDirectory, path.relative(data.root, file))), data.before[key]);
  }
  assert.equal(fs.readFileSync(path.join(repository, "README.md"), "utf8"), source);
  fs.writeFileSync(path.join(repository, "README.zh-CN.md"), source);
  await generatePreviews({ skillDirectory, repositoryDirectory: repository, takeScreenshots: false });
  assert.match(fs.readFileSync(path.join(repository, "README.md"), "utf8"), /Card Grid/);
  assert.match(fs.readFileSync(path.join(repository, "README.zh-CN.md"), "utf8"), /卡片网格/);
});

test("index-only repository generation does not require or change README markers", async (t) => {
  configure(t, { PREVIEW_INDEX_ONLY: "1" });
  const data = fixture(t);
  const repository = fs.mkdtempSync(path.join(os.tmpdir(), "preview-repository-test-"));
  t.after(() => fs.rmSync(repository, { recursive: true, force: true }));
  const skillDirectory = path.join(repository, "skills", "example");
  fs.cpSync(data.root, skillDirectory, { recursive: true });
  fs.writeFileSync(path.join(repository, "README.md"), "unchanged");
  await generatePreviews({ skillDirectory, repositoryDirectory: repository, takeScreenshots: false });
  assert.equal(fs.readFileSync(path.join(repository, "README.md"), "utf8"), "unchanged");
  assert.equal(fs.existsSync(path.join(repository, "README.zh-CN.md")), false);
});
