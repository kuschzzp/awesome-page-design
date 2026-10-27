const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { withPreviewTransaction } = require("./preview-transaction");

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "preview-transaction-test-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  return root;
}

function write(root, relative, value) {
  const file = path.join(root, relative);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, value);
  return file;
}

test("generation failure preserves originals and cleans staging", async (t) => {
  const root = fixture(t);
  const file = write(root, "assets/styles/a.html", "original");
  let stage;
  await assert.rejects(withPreviewTransaction(root, (directory) => {
    stage = directory;
    write(stage, "assets/styles/a.html", "changed");
    throw new Error("generation failed");
  }), /generation failed/);
  assert.equal(fs.readFileSync(file, "utf8"), "original");
  assert.equal(fs.existsSync(path.dirname(stage)), false);
});

test("publishes additions and deletions only within owned paths and preserves mode", async (t) => {
  const root = fixture(t);
  const existing = write(root, "assets/styles/a.html", "old");
  const removed = write(root, "assets/styles/b.html", "delete");
  const ignored = write(root, "SKILL.md", "keep");
  fs.chmodSync(existing, 0o640);
  let stage;
  const result = await withPreviewTransaction(root, (directory) => {
    stage = directory;
    write(stage, "assets/styles/a.html", "new");
    fs.chmodSync(path.join(stage, "assets/styles/a.html"), 0o600);
    fs.unlinkSync(path.join(stage, "assets/styles/b.html"));
    write(stage, "assets/previews/new.json", "{}");
    write(stage, "references/style-index.md", "index");
    write(stage, "SKILL.md", "ignored change");
    return 42;
  });
  assert.equal(result, 42);
  assert.equal(fs.readFileSync(existing, "utf8"), "new");
  assert.equal(fs.statSync(existing).mode & 0o777, 0o640);
  assert.equal(fs.existsSync(removed), false);
  assert.equal(fs.readFileSync(path.join(root, "assets/previews/new.json"), "utf8"), "{}");
  assert.equal(fs.readFileSync(path.join(root, "references/style-index.md"), "utf8"), "index");
  assert.equal(fs.readFileSync(ignored, "utf8"), "keep");
  assert.equal(fs.existsSync(path.dirname(stage)), false);
});

test("publication failure rolls back modifications, deletions and additions", async (t) => {
  const root = fixture(t);
  const removed = write(root, "assets/styles/a.html", "restore deletion");
  const changed = write(root, "assets/styles/b.html", "restore content");
  const failure = write(root, "assets/styles/d.html", "original");
  let stage;
  const originalRename = fs.renameSync;
  let failed = false;
  try {
    fs.renameSync = (from, to) => {
      if (!failed && to === failure) {
        failed = true;
        throw new Error("publication failed");
      }
      return originalRename(from, to);
    };
    await assert.rejects(withPreviewTransaction(root, (directory) => {
      stage = directory;
      fs.unlinkSync(path.join(stage, "assets/styles/a.html"));
      write(stage, "assets/styles/b.html", "changed");
      write(stage, "assets/styles/c.html", "added");
      write(stage, "assets/styles/d.html", "fail");
    }), /publication failed/);
  } finally {
    fs.renameSync = originalRename;
  }
  assert.equal(fs.readFileSync(removed, "utf8"), "restore deletion");
  assert.equal(fs.readFileSync(changed, "utf8"), "restore content");
  assert.equal(fs.readFileSync(failure, "utf8"), "original");
  assert.deepEqual(fs.readdirSync(path.dirname(changed)).sort(), ["a.html", "b.html", "d.html"]);
  assert.equal(fs.existsSync(path.dirname(stage)), false);
});

test("concurrent external edits are preserved and prevent all publication", async (t) => {
  const root = fixture(t);
  const file = write(root, "assets/styles/b.html", "old");
  await assert.rejects(withPreviewTransaction(root, (stage) => {
    write(stage, "assets/styles/a.html", "new");
    write(stage, "assets/styles/b.html", "generated");
    fs.writeFileSync(file, "external edit");
  }), /changed during generation/);
  assert.equal(fs.readFileSync(file, "utf8"), "external edit");
  assert.equal(fs.existsSync(path.join(root, "assets/styles/a.html")), false);
});

test("unchanged files retain inode and timestamp and staging is removed", async (t) => {
  const root = fixture(t);
  const file = write(root, "assets/styles/a.html", "same");
  const before = fs.statSync(file);
  let stage;
  await withPreviewTransaction(root, (directory) => {
    stage = directory;
    fs.chmodSync(path.join(stage, "assets/styles/a.html"), 0o600);
  });
  const after = fs.statSync(file);
  assert.equal(after.ino, before.ino);
  assert.equal(after.mtimeMs, before.mtimeMs);
  assert.equal(fs.existsSync(path.dirname(stage)), false);
});

test("removed style directories disappear instead of remaining as empty catalog entries", async (t) => {
  const root = fixture(t);
  write(root, "assets/styles/obsolete/nested/example.html", "remove");
  await withPreviewTransaction(root, (stage) => {
    fs.rmSync(path.join(stage, "assets/styles/obsolete"), { recursive: true });
  });
  assert.equal(fs.existsSync(path.join(root, "assets/styles/obsolete")), false);
});

test("directory publication failures restore removed directories and their contents", async (t) => {
  const root = fixture(t);
  const original = write(root, "assets/styles/obsolete/nested/example.html", "restore");
  const parent = path.dirname(original);
  fs.chmodSync(parent, 0o750);
  const originalRmdir = fs.rmdirSync;
  let failed = false;
  try {
    fs.rmdirSync = (directory, ...args) => {
      if (!failed && directory === path.join(root, "assets/styles/obsolete")) {
        failed = true;
        throw new Error("directory publication failed");
      }
      return originalRmdir(directory, ...args);
    };
    await assert.rejects(withPreviewTransaction(root, (stage) => {
      fs.rmSync(path.join(stage, "assets/styles/obsolete"), { recursive: true });
    }), /directory publication failed/);
  } finally {
    fs.rmdirSync = originalRmdir;
  }
  assert.equal(fs.readFileSync(original, "utf8"), "restore");
  assert.equal(fs.statSync(parent).mode & 0o777, 0o750);
});

test("repository transactions copy only declared inputs and publish only declared outputs", async (t) => {
  const root = fixture(t);
  write(root, "README.md", "old readme");
  write(root, "skills/example/assets/previews/index.html", "old gallery");
  write(root, "private/key", "not a generation input");
  await withPreviewTransaction(root, (stage) => {
    assert.equal(fs.existsSync(path.join(stage, "private")), false);
    write(stage, "README.md", "new readme");
    write(stage, "skills/example/assets/previews/index.html", "new gallery");
    write(stage, "unowned.txt", "do not publish");
  }, { ownedPaths: ["README.md", "skills/example/assets/previews"], copyPaths: ["README.md", "skills/example"] });
  assert.equal(fs.readFileSync(path.join(root, "README.md"), "utf8"), "new readme");
  assert.equal(fs.readFileSync(path.join(root, "skills/example/assets/previews/index.html"), "utf8"), "new gallery");
  assert.equal(fs.existsSync(path.join(root, "unowned.txt")), false);
});

test("transaction inputs and outputs cannot escape the source directory", async (t) => {
  const root = fixture(t);
  await assert.rejects(withPreviewTransaction(root, () => {}, { ownedPaths: ["../outside"] }), /inside/);
  await assert.rejects(withPreviewTransaction(root, () => {}, { copyPaths: ["/outside"] }), /inside/);
});
