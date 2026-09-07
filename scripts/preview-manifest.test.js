const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const {
  readManifest,
  sha256File,
  updateManifestEntry,
  validateManifest,
} = require("./preview-manifest");

function createFixture(t, slug) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "awesome-page-design-manifest-"));
  const manifestRoot = path.join(root, "previews");
  const styleDir = path.join(root, "styles", slug);
  fs.mkdirSync(manifestRoot, { recursive: true });
  fs.mkdirSync(styleDir, { recursive: true });
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));

  const files = {
    htmlFile: path.join(styleDir, `${slug}.html`),
    desktopFile: path.join(styleDir, `${slug}.png`),
    mobileFile: path.join(styleDir, `${slug}-mobile.png`),
  };
  fs.writeFileSync(files.htmlFile, `<main>${slug}</main>`);
  fs.writeFileSync(files.desktopFile, `desktop:${slug}`);
  fs.writeFileSync(files.mobileFile, `mobile:${slug}`);

  return {
    ...files,
    manifestFile: path.join(manifestRoot, "asset-manifest.json"),
    manifestRoot,
    root,
    slug,
  };
}

function addEntry(fixture) {
  updateManifestEntry({
    ...fixture,
    desktopSize: { width: 1440, height: 1200 },
    mobileSize: { width: 390, height: 844 },
  });
}

test("sha256File is stable and changes with file content", (t) => {
  const fixture = createFixture(t, "style-01-card-grid");
  const first = sha256File(fixture.htmlFile);
  const second = sha256File(fixture.htmlFile);
  assert.equal(first, second);

  fs.appendFileSync(fixture.htmlFile, "changed");
  assert.notEqual(sha256File(fixture.htmlFile), first);
});

test("updateManifestEntry preserves existing style entries", (t) => {
  const first = createFixture(t, "style-01-card-grid");
  addEntry(first);

  const secondSlug = "style-02-block-brutalism";
  const secondDir = path.join(first.root, "styles", secondSlug);
  fs.mkdirSync(secondDir, { recursive: true });
  const second = {
    ...first,
    slug: secondSlug,
    htmlFile: path.join(secondDir, `${secondSlug}.html`),
    desktopFile: path.join(secondDir, `${secondSlug}.png`),
    mobileFile: path.join(secondDir, `${secondSlug}-mobile.png`),
  };
  fs.writeFileSync(second.htmlFile, `<main>${secondSlug}</main>`);
  fs.writeFileSync(second.desktopFile, `desktop:${secondSlug}`);
  fs.writeFileSync(second.mobileFile, `mobile:${secondSlug}`);
  addEntry(second);

  const manifest = readManifest(first.manifestFile);
  assert.deepEqual(Object.keys(manifest.styles), [first.slug, secondSlug]);
  assert.equal(manifest.styles[first.slug].html.path, `../styles/${first.slug}/${first.slug}.html`);
  assert.equal(manifest.styles[secondSlug].mobile.width, 390);
});

test("validateManifest detects a changed artifact hash", (t) => {
  const fixture = createFixture(t, "style-01-card-grid");
  addEntry(fixture);
  fs.appendFileSync(fixture.htmlFile, "tampered");

  const errors = validateManifest({
    manifestFile: fixture.manifestFile,
    manifestRoot: fixture.manifestRoot,
    expectedStyles: [fixture.slug],
  });
  assert.match(errors.join("\n"), /hash mismatch/i);
});

test("validateManifest detects missing style entries", (t) => {
  const fixture = createFixture(t, "style-01-card-grid");
  addEntry(fixture);

  const errors = validateManifest({
    manifestFile: fixture.manifestFile,
    manifestRoot: fixture.manifestRoot,
    expectedStyles: [fixture.slug, "style-02-block-brutalism"],
  });
  assert.match(errors.join("\n"), /missing style entry.*style-02-block-brutalism/i);
});
