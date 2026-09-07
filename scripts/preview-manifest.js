const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const manifestVersion = 1;
const defaultDesktopSize = { width: 1440, height: 1200 };
const defaultMobileSize = { width: 390, height: 844 };

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function sha256File(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

function readManifest(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeManifestAtomic(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const temporaryFile = path.join(
    path.dirname(file),
    `.${path.basename(file)}.${process.pid}.${crypto.randomBytes(6).toString("hex")}.tmp`
  );

  try {
    fs.writeFileSync(temporaryFile, `${JSON.stringify(value, null, 2)}\n`);
    fs.renameSync(temporaryFile, file);
  } catch (error) {
    fs.rmSync(temporaryFile, { force: true });
    throw error;
  }
}

function relativeArtifactPath(manifestRoot, file) {
  return path.relative(manifestRoot, file).split(path.sep).join("/");
}

function artifactRecord(manifestRoot, file, size) {
  const record = {
    path: relativeArtifactPath(manifestRoot, file),
    sha256: sha256File(file),
  };
  if (size) {
    record.width = size.width;
    record.height = size.height;
  }
  return record;
}

function updateManifestEntry(options) {
  const {
    manifestFile,
    manifestRoot,
    slug,
    htmlFile,
    desktopFile,
    mobileFile,
    desktopSize = defaultDesktopSize,
    mobileSize = defaultMobileSize,
  } = options;

  let manifest = {
    version: manifestVersion,
    generated_at: new Date().toISOString(),
    styles: {},
  };

  if (fs.existsSync(manifestFile)) {
    manifest = readManifest(manifestFile);
    if (manifest.version !== manifestVersion || !isRecord(manifest.styles)) {
      throw new Error(`Cannot update invalid preview manifest: ${manifestFile}`);
    }
  }

  manifest.generated_at = new Date().toISOString();
  manifest.styles[slug] = {
    html: artifactRecord(manifestRoot, htmlFile),
    desktop: artifactRecord(manifestRoot, desktopFile, desktopSize),
    mobile: artifactRecord(manifestRoot, mobileFile, mobileSize),
  };
  manifest.styles = Object.fromEntries(
    Object.entries(manifest.styles).sort(([left], [right]) => left.localeCompare(right))
  );
  writeManifestAtomic(manifestFile, manifest);
  return manifest;
}

function validateArtifact({ errors, label, manifestRoot, record, expectedPath, expectedSize }) {
  if (!isRecord(record)) {
    errors.push(`${label} record is missing`);
    return;
  }

  if (record.path !== expectedPath) {
    errors.push(`${label} path must be ${expectedPath}`);
  }

  if (typeof record.path !== "string" || path.isAbsolute(record.path)) {
    errors.push(`${label} path must be a relative string`);
    return;
  }

  const artifactFile = path.resolve(manifestRoot, record.path);
  if (!fs.existsSync(artifactFile)) {
    errors.push(`${label} artifact does not exist: ${record.path}`);
  } else if (!/^[a-f0-9]{64}$/.test(record.sha256 || "")) {
    errors.push(`${label} sha256 must be a lowercase SHA-256 digest`);
  } else if (sha256File(artifactFile) !== record.sha256) {
    errors.push(`${label} hash mismatch: ${record.path}`);
  }

  if (expectedSize) {
    if (record.width !== expectedSize.width || record.height !== expectedSize.height) {
      errors.push(`${label} dimensions must be ${expectedSize.width}x${expectedSize.height}`);
    }
  }
}

function validateManifest(options) {
  const {
    manifestFile,
    manifestRoot,
    expectedStyles = [],
    desktopSize = defaultDesktopSize,
    mobileSize = defaultMobileSize,
  } = options;
  const errors = [];

  if (!fs.existsSync(manifestFile)) {
    return [`preview asset manifest does not exist: ${manifestFile}`];
  }

  let manifest;
  try {
    manifest = readManifest(manifestFile);
  } catch (error) {
    return [`preview asset manifest is not valid JSON: ${error.message}`];
  }

  if (!isRecord(manifest)) {
    return ["preview asset manifest must be an object"];
  }
  if (manifest.version !== manifestVersion) {
    errors.push(`preview asset manifest version must be ${manifestVersion}`);
  }
  if (typeof manifest.generated_at !== "string" || !Number.isFinite(Date.parse(manifest.generated_at))) {
    errors.push("preview asset manifest generated_at must be an ISO-8601 timestamp");
  }
  if (!isRecord(manifest.styles)) {
    errors.push("preview asset manifest styles must be an object");
    return errors;
  }

  const expectedStyleSet = new Set(expectedStyles);
  Object.keys(manifest.styles).forEach((slug) => {
    if (!expectedStyleSet.has(slug)) {
      errors.push(`preview asset manifest has unexpected style entry: ${slug}`);
    }
  });

  expectedStyles.forEach((slug) => {
    const entry = manifest.styles[slug];
    if (!isRecord(entry)) {
      errors.push(`preview asset manifest is missing style entry: ${slug}`);
      return;
    }

    const basePath = `../styles/${slug}`;
    validateArtifact({
      errors,
      label: `${slug} HTML`,
      manifestRoot,
      record: entry.html,
      expectedPath: `${basePath}/${slug}.html`,
    });
    validateArtifact({
      errors,
      label: `${slug} desktop`,
      manifestRoot,
      record: entry.desktop,
      expectedPath: `${basePath}/${slug}.png`,
      expectedSize: desktopSize,
    });
    validateArtifact({
      errors,
      label: `${slug} mobile`,
      manifestRoot,
      record: entry.mobile,
      expectedPath: `${basePath}/${slug}-mobile.png`,
      expectedSize: mobileSize,
    });
  });

  return errors;
}

module.exports = {
  readManifest,
  sha256File,
  updateManifestEntry,
  validateManifest,
  writeManifestAtomic,
};
