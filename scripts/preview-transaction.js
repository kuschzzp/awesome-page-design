const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const crypto = require("node:crypto");

const ownedPaths = ["assets/styles", "assets/previews", "references/styles", "references/style-index.md"];

function inspect(file) {
  try {
    const stat = fs.lstatSync(file);
    if (stat.isSymbolicLink() || (!stat.isFile() && !stat.isDirectory())) {
      throw new Error(`Unsupported preview artifact: ${file}`);
    }
    return stat.isDirectory()
      ? { directory: true, mode: stat.mode & 0o7777 }
      : { data: fs.readFileSync(file), mode: stat.mode & 0o7777 };
  } catch (error) {
    if (error.code === "ENOENT") return undefined;
    throw error;
  }
}

function snapshot(root, paths) {
  const files = new Map();
  const directories = new Map();
  function visit(relative) {
    const state = inspect(path.join(root, relative));
    if (!state) return;
    if (state.directory) {
      directories.set(relative, state);
      for (const name of fs.readdirSync(path.join(root, relative)).sort()) {
        visit(path.join(relative, name));
      }
    } else {
      files.set(relative, state);
    }
  }
  paths.forEach(visit);
  return { files, directories };
}

function equal(left, right) {
  return left === undefined || right === undefined
    ? left === right
    : !left.directory && !right.directory && left.mode === right.mode && left.data.equals(right.data);
}

function assertUnchanged(root, relative, expected) {
  // Reject symlinks in parents as well as at the file itself.
  let parent = path.dirname(relative);
  while (parent !== ".") {
    const state = inspect(path.join(root, parent));
    if (state && !state.directory) throw new Error(`Preview destination is not a directory: ${parent}`);
    parent = path.dirname(parent);
  }
  if (!equal(inspect(path.join(root, relative)), expected)) {
    throw new Error(`Preview artifact changed during generation: ${relative}`);
  }
}

function ensureParents(directory, createdDirectories) {
  if (fs.existsSync(directory)) return;
  ensureParents(path.dirname(directory), createdDirectories);
  fs.mkdirSync(directory);
  createdDirectories.push(directory);
}

function atomicWrite(file, state, createdDirectories) {
  ensureParents(path.dirname(file), createdDirectories);
  const temporary = path.join(path.dirname(file), `.${path.basename(file)}.${crypto.randomBytes(12).toString("hex")}.tmp`);
  try {
    fs.writeFileSync(temporary, state.data, { flag: "wx", mode: state.mode });
    fs.chmodSync(temporary, state.mode);
    fs.renameSync(temporary, file);
  } finally {
    fs.rmSync(temporary, { force: true });
  }
}

function publish(sourceDir, original, staged) {
  const before = original.files;
  const after = staged.files;
  const changes = [...new Set([...before.keys(), ...after.keys()])]
    .sort()
    .filter((relative) => {
      const previous = before.get(relative);
      const next = after.get(relative);
      return !previous || !next || !previous.data.equals(next.data);
    });
  changes.forEach((relative) => assertUnchanged(sourceDir, relative, before.get(relative)));
  const applied = [];
  const createdDirectories = [];
  const removedDirectories = [];
  try {
    for (const relative of changes) {
      const previous = before.get(relative);
      const next = after.get(relative);
      assertUnchanged(sourceDir, relative, previous);
      const file = path.join(sourceDir, relative);
      if (next) {
        atomicWrite(file, { ...next, mode: previous?.mode ?? next.mode }, createdDirectories);
      } else {
        fs.unlinkSync(file);
      }
      applied.push(relative);
    }
    // Preserve recursive removal semantics without removing files created by
    // another process during generation: rmdir only removes empty directories.
    const removed = [...original.directories.keys()]
      .filter((relative) => !staged.directories.has(relative))
      .sort((left, right) => right.split(path.sep).length - left.split(path.sep).length);
    for (const relative of removed) {
      fs.rmdirSync(path.join(sourceDir, relative));
      removedDirectories.push(relative);
    }
  } catch (error) {
    const rollbackErrors = [];
    for (const relative of removedDirectories.reverse()) {
      try {
        const directory = path.join(sourceDir, relative);
        fs.mkdirSync(directory, { mode: original.directories.get(relative).mode });
        fs.chmodSync(directory, original.directories.get(relative).mode);
      } catch (rollbackError) {
        rollbackErrors.push(rollbackError);
      }
    }
    for (const relative of applied.reverse()) {
      try {
        const file = path.join(sourceDir, relative);
        const previous = before.get(relative);
        if (previous) atomicWrite(file, previous, createdDirectories);
        else fs.rmSync(file, { force: true });
      } catch (rollbackError) {
        rollbackErrors.push(rollbackError);
      }
    }
    for (const directory of createdDirectories.reverse()) {
      try { fs.rmdirSync(directory); } catch (cleanupError) {
        if (!["ENOTEMPTY", "ENOENT"].includes(cleanupError.code)) rollbackErrors.push(cleanupError);
      }
    }
    if (rollbackErrors.length) throw new AggregateError([error, ...rollbackErrors], "Preview publication and rollback failed");
    throw error;
  }
}

function checkRelativePaths(paths) {
  for (const relative of paths) {
    if (typeof relative !== "string" || !relative || path.isAbsolute(relative) || relative.split(/[\\/]/).some((part) => part === ".." || part === ".")) {
      throw new Error(`Transaction paths must stay inside their source directory: ${relative}`);
    }
  }
}

async function withPreviewTransaction(sourceDir, generate, options = {}) {
  const root = path.resolve(sourceDir);
  const paths = options.ownedPaths || ownedPaths;
  const copyPaths = options.copyPaths;
  checkRelativePaths(paths);
  if (copyPaths) checkRelativePaths(copyPaths);
  const before = snapshot(root, paths);
  const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "awesome-page-design-transaction-"));
  const stageDir = path.join(temporaryRoot, "skill");
  try {
    if (copyPaths) {
      fs.mkdirSync(stageDir);
      for (const relative of copyPaths) {
        const source = path.join(root, relative);
        if (fs.existsSync(source)) {
          fs.mkdirSync(path.dirname(path.join(stageDir, relative)), { recursive: true });
          fs.cpSync(source, path.join(stageDir, relative), { recursive: true, verbatimSymlinks: true });
        }
      }
    } else {
      fs.cpSync(root, stageDir, { recursive: true, verbatimSymlinks: true });
    }
    const result = await generate(stageDir);
    publish(root, before, snapshot(stageDir, paths));
    return result;
  } finally {
    fs.rmSync(temporaryRoot, { recursive: true, force: true });
  }
}

module.exports = { withPreviewTransaction, previewArtifactPaths: ownedPaths };
