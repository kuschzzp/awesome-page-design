#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { updateManifestEntry } = require("./preview-manifest");
const { withPreviewTransaction, previewArtifactPaths } = require("./preview-transaction");
const { writeCatalogReadmes, writeCatalogReferences } = require("./sync-catalog-docs");
const { allStyles, removedStyleSlugs } = require("./preview-catalog");
const { resolvePreviewStyles } = require("./preview-selection");
const { getScenario } = require("./preview-scenarios");
const { getStylePlaybook, getGeometryProfile, getImplementationProfile } = require("./preview-style-profiles");
const { buildStylePrompt } = require("./preview-prompts");
const { renderGallery } = require("./preview-gallery");
const { createPageRenderer } = require("./preview-page-renderer");
const { createScreenshotEngine } = require("./preview-screenshots");
const { readPreviewConfig } = require("./preview-config");

const config = readPreviewConfig();
const {
  generateScreenshots, screenshotsBlockedBySandbox, isCodexSeatbeltSandbox,
  viewportWidth, viewportHeight, mobileViewportWidth, mobileViewportHeight,
  generateMobileScreenshots, chromeWait, screenshotEngine, allowSystemChrome,
  auditViewportWidths,
} = config;
const { screenshot, screenshotWithChromeCli, waitForProcessExit, stopProcess, screenshotWithRetry } = createScreenshotEngine(config);
const { renderStyleHtml } = createPageRenderer({
  allStyles, getScenario, getStylePlaybook, getGeometryProfile, getImplementationProfile, buildStylePrompt,
});

const rootDir = path.resolve(__dirname, "..");
const sourceSkillDir = path.join(rootDir, "skills", "awesome-page-design");
let skillDir, stylesDir, outputDir, manifestFile, referencesDir, styleRefsDir;
let publishedSkillDir = sourceSkillDir;

function setOutputPaths(directory) {
  skillDir = directory;
  stylesDir = path.join(skillDir, "assets", "styles");
  outputDir = path.join(skillDir, "assets", "previews");
  manifestFile = path.join(outputDir, "asset-manifest.json");
  referencesDir = path.join(skillDir, "references");
  styleRefsDir = path.join(referencesDir, "styles");
}

function displayArtifactPath(file) {
  return path.relative(rootDir, path.join(publishedSkillDir, path.relative(skillDir, file)));
}

setOutputPaths(sourceSkillDir);

function cleanRemovedStyles() {
  fs.mkdirSync(stylesDir, { recursive: true });
  fs.mkdirSync(styleRefsDir, { recursive: true });

  removedStyleSlugs.forEach((slug) => {
    fs.rmSync(path.join(stylesDir, slug), { recursive: true, force: true });
    fs.rmSync(path.join(styleRefsDir, `${slug}.md`), { force: true });
    fs.rmSync(path.join(styleRefsDir, `${slug}-design-system.md`), { force: true });
  });
}

function writeStyleFiles(stylesToWrite = allStyles) {
  cleanRemovedStyles();

  stylesToWrite.forEach((style) => {
    const dir = path.join(stylesDir, style.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, `${style.slug}.html`), renderStyleHtml(style));
    if (style.id === "01") fs.copyFileSync(path.join(__dirname, "preview-pages", "style01-icons.LICENSE"), path.join(dir, "style01-icons.LICENSE"));
  });
}

function writeIndex() {
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, "index.html"), renderGallery(config));
}

async function main({ captureScreenshot, takeScreenshots }) {
  const previewStyles = resolvePreviewStyles();
  const isFilteredRun = previewStyles.length !== allStyles.length;

  if (process.env.PREVIEW_INDEX_ONLY === "1") {
    writeIndex();
    return;
  }

  writeStyleFiles(previewStyles);
  writeCatalogReferences(skillDir, previewStyles);

  if (!takeScreenshots) {
    writeIndex();
    if (screenshotsBlockedBySandbox) {
      console.log("Screenshots skipped inside CODEX_SANDBOX=seatbelt to avoid browser crash reports; set PREVIEW_ALLOW_SANDBOX_BROWSER=1 only if launching a browser from the sandbox is known safe.");
    } else if (isCodexSeatbeltSandbox && process.env.PREVIEW_SCREENSHOTS === undefined) {
      console.log("Screenshots skipped inside CODEX_SANDBOX=seatbelt to avoid browser crash reports; run outside the sandbox or set PREVIEW_ALLOW_SANDBOX_BROWSER=1 only when safe.");
    } else {
      console.log("Screenshots disabled with PREVIEW_SCREENSHOTS=0; HTML, docs, and preview index were refreshed.");
    }
    return;
  }

  if (isFilteredRun) {
    const selected = previewStyles.map((style) => style.id).join(", ");
    console.log(`Generating ${previewStyles.length}/${allStyles.length} selected style preview(s) [${selected}] with ${chromeWait}ms wait...`);
    console.log("Reusing existing screenshots for unselected styles; preview index is still refreshed.");
  } else {
    console.log(`Generating ${previewStyles.length} style previews with ${chromeWait}ms wait...`);
  }
  if (screenshotEngine === "chrome" || allowSystemChrome) {
    console.log("Screenshot engine: explicit Chrome fallback is enabled by environment opt-in.");
  } else {
    console.log("Screenshot engine: Playwright Chromium; system Google Chrome fallback is disabled.");
  }
  if (auditViewportWidths.length > 0) {
    console.log(`Additional non-persisted render audits: ${auditViewportWidths.join(", ")}px.`);
  }
  for (const style of previewStyles) {
    const htmlFile = path.join(stylesDir, style.slug, `${style.slug}.html`);
    process.stdout.write(`- ${displayArtifactPath(htmlFile)} -> `);
    const imageFile = await captureScreenshot(htmlFile);
    process.stdout.write(`${displayArtifactPath(imageFile)}\n`);
    if (generateMobileScreenshots) {
      process.stdout.write(`  mobile -> `);
      const mobileImageFile = await captureScreenshot(htmlFile, {
        suffix: "-mobile",
        width: mobileViewportWidth,
        height: mobileViewportHeight,
      });
      process.stdout.write(`${displayArtifactPath(mobileImageFile)}\n`);
      updateManifestEntry({
        manifestFile,
        manifestRoot: outputDir,
        slug: style.slug,
        htmlFile,
        desktopFile: imageFile,
        mobileFile: mobileImageFile,
        desktopSize: { width: viewportWidth, height: viewportHeight },
        mobileSize: { width: mobileViewportWidth, height: mobileViewportHeight },
      });
    }
    for (const auditWidth of auditViewportWidths) {
      process.stdout.write(`  audit ${auditWidth}x${mobileViewportHeight} -> `);
      await captureScreenshot(htmlFile, {
        auditOnly: true,
        width: auditWidth,
        height: mobileViewportHeight,
      });
      process.stdout.write("passed\n");
    }
  }

  writeIndex();
}

async function generatePreviews({
  skillDirectory = sourceSkillDir,
  repositoryDirectory = skillDirectory === sourceSkillDir ? rootDir : undefined,
  captureScreenshot = screenshotWithRetry,
  takeScreenshots = generateScreenshots,
} = {}) {
  const relativeSkill = repositoryDirectory ? path.relative(repositoryDirectory, skillDirectory) : "";
  if (repositoryDirectory && (!relativeSkill || relativeSkill.split(path.sep).includes("..") || path.isAbsolute(relativeSkill))) {
    throw new Error("The skill directory must be inside its repository directory");
  }
  const syncReadmes = repositoryDirectory && process.env.PREVIEW_INDEX_ONLY !== "1";
  const readmes = syncReadmes ? ["README.md", "README.zh-CN.md"] : [];
  const transactionOptions = repositoryDirectory ? {
    ownedPaths: [...previewArtifactPaths.map((relative) => path.join(relativeSkill, relative)), ...readmes],
    copyPaths: [relativeSkill, ...readmes],
  } : undefined;
  publishedSkillDir = skillDirectory;
  try {
    await withPreviewTransaction(repositoryDirectory || skillDirectory, async (stagedRoot) => {
      setOutputPaths(path.join(stagedRoot, relativeSkill));
      await main({ captureScreenshot, takeScreenshots });
      if (syncReadmes) writeCatalogReadmes(stagedRoot);
    }, transactionOptions);
    console.log(`Done. Open ${path.relative(rootDir, path.join(skillDirectory, "assets", "previews", "index.html"))}`);
  } finally {
    setOutputPaths(sourceSkillDir);
    publishedSkillDir = sourceSkillDir;
  }
}

if (require.main === module) {
  generatePreviews().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}

module.exports = { generatePreviews, screenshot, screenshotWithChromeCli, waitForProcessExit, stopProcess };
