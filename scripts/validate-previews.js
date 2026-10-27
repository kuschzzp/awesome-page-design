#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { describePngQuality, hasVisibleContent, readPngQuality } = require("./png-quality");
const { validateManifest } = require("./preview-manifest");
const { allStyles } = require("./preview-catalog");
const { promptKinds: promptDefinitions, buildStylePrompt } = require("./preview-prompts");
const { renderStyleDoc, renderStyleIndex } = require("./preview-documents");
const { renderGallery } = require("./preview-gallery");
const { unpackPrompt } = require("./gallery-model");
const { updateReadme } = require("./sync-catalog-docs");
const { inspectSkillReferences } = require("./skill-references");

const rootDir = path.resolve(__dirname, "..");
const skillDir = path.join(rootDir, "skills", "awesome-page-design");
const stylesDir = path.join(skillDir, "assets", "styles");
const previewIndex = path.join(skillDir, "assets", "previews", "index.html");
const previewManifestFile = path.join(skillDir, "assets", "previews", "asset-manifest.json");
const referencesDir = path.join(skillDir, "references");
const styleRefsDir = path.join(referencesDir, "styles");
const skillFile = path.join(skillDir, "SKILL.md");
const readmeFile = path.join(rootDir, "README.md");
const readmeZhFile = path.join(rootDir, "README.zh-CN.md");
const pluginFile = path.join(rootDir, ".codex-plugin", "plugin.json");
const packageFile = path.join(rootDir, "package.json");
const validationWorkflowFile = path.join(rootDir, ".github", "workflows", "validate.yml");
const agentsOpenaiFile = path.join(skillDir, "agents", "openai.yaml");

const expectedStyleCount = allStyles.length;
const expectedDesktopWidth = 1440;
const expectedDesktopHeight = 1200;
const expectedMobileWidth = 390;
const expectedMobileHeight = 844;
const promptKinds = promptDefinitions.map((kind) => kind.key);
const narrowDomainAnchors = [
  ["C", "R", "M"].join(""),
  ["E", "R", "P"].join(""),
];
const narrowDomainAnchorPattern = new RegExp(`\\b(?:${narrowDomainAnchors.join("|")})\\b`, "i");
const bannedPatterns = [
  /Reference:/i,
  /Unsplash/i,
  /Picsum/i,
  /linear\.app/i,
  /reference-sites/i,
  /People may casually say/i,
  /vercel-labs/i,
  /impeccable/i,
  /taste-skill/i,
  /better-icons/i,
  /awesome-design-md/i,
  /新旧风格/,
  /旧风格/,
  /新增风格/,
];
const uiPrimitiveBannedPatterns = [
  { label: "browser alert()", pattern: /\b(?:window\.)?alert\s*\(/ },
  { label: "browser confirm()", pattern: /\b(?:window\.)?confirm\s*\(/ },
  { label: "browser prompt()", pattern: /\b(?:window\.)?prompt\s*\(/ },
  { label: "native select", pattern: /<select\b/i },
];

let failures = 0;
let passes = 0;
const verbose = process.env.VALIDATE_VERBOSE === "1" || process.argv.includes("--verbose");

function fail(message) {
  failures += 1;
  console.error(`FAIL ${message}`);
}

function pass(message) {
  passes += 1;
  if (verbose) console.log(`PASS ${message}`);
}

function assert(condition, message) {
  if (condition) {
    pass(message);
  } else {
    fail(message);
  }
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function checkPngContent(file, label, expectedWidth, expectedHeight) {
  try {
    const stats = readPngQuality(file);
    assert(hasVisibleContent(stats), `${label} PNG has visible content (${describePngQuality(stats)})`);
    assert(
      stats.width === expectedWidth && stats.height === expectedHeight,
      `${label} PNG dimensions are ${expectedWidth}x${expectedHeight}`
    );
  } catch (error) {
    fail(`${label} PNG can be inspected: ${error.message}`);
  }
}

function getStyleDirs() {
  if (!fs.existsSync(stylesDir)) return [];
  return fs
    .readdirSync(stylesDir)
    .filter((name) => /^style-\d{2,}-/.test(name))
    .sort();
}

function checkSkillDescription() {
  const skill = read(skillFile);
  const frontmatter = skill.match(/^---\n([\s\S]*?)\n---/);
  const fields = frontmatter?.[1] || "";
  const descriptionField = fields.match(/^description:[ \t]*([^\n]*)/m)?.[1] || "";
  const description = /^[>|][-+]?\s*$/.test(descriptionField)
    ? (fields.match(/^description:[^\n]*\n((?:[ \t]+[^\n]*\n?)+)/m)?.[1] || "").trim().replace(/\s+/g, " ")
    : descriptionField;
  assert(description.length > 0, "SKILL.md has a description");
  assert(description.length <= 1024, `SKILL.md description length is ${description.length}/1024`);
}

function checkAgentsMetadata() {
  const yaml = read(agentsOpenaiFile);
  assert(yaml.includes('display_name: "Awesome Page Design"'), "agents/openai.yaml has display name");
  assert(yaml.includes("$awesome-page-design"), "agents/openai.yaml default prompt invokes the skill");
  assert(/short_description: "([^"]*UI[^"]*|[^"]*design[^"]*)"/i.test(yaml), "agents/openai.yaml short description mentions UI/design");
  assert(
    /default_prompt: ".*(existing|local|new|favicon|metadata|component|interface|UI)/i.test(yaml),
    "agents/openai.yaml default prompt reflects current UI workflow scope"
  );
}

function checkCoreDomainNeutrality() {
  const filesToCheck = [
    skillFile,
    path.join(referencesDir, "workflow.md"),
    path.join(referencesDir, "existing-project-integration.md"),
    path.join(referencesDir, "layout-guidance.md"),
    path.join(referencesDir, "design-dials.md"),
    path.join(referencesDir, "anti-generic-ui.md"),
    path.join(referencesDir, "style-index.md"),
    path.join(rootDir, "scripts", "generate-previews.js"),
    pluginFile,
    packageFile,
    readmeFile,
    readmeZhFile,
  ];

  filesToCheck.filter(fs.existsSync).forEach((file) => {
    const content = read(file);
    assert(!narrowDomainAnchorPattern.test(content), `${path.relative(rootDir, file)} avoids narrow domain anchors`);
  });
}

function checkReadmes() {
  const readme = read(readmeFile);
  const readmeZh = read(readmeZhFile);
  [
    "npx skills add",
    "npx skills update awesome-page-design -g -y",
    "npx skills remove awesome-page-design -g -y",
    "npm run previews",
    "npm run validate",
  ].forEach((needle) => assert(readme.includes(needle), `README.md includes ${needle}`));
  [
    "npx skills add",
    "npx skills update awesome-page-design -g -y",
    "npx skills remove awesome-page-design -g -y",
    "npm run previews",
    "npm run validate",
  ].forEach((needle) => assert(readmeZh.includes(needle), `README.zh-CN.md includes ${needle}`));
}

function checkMetadataAlignment() {
  let plugin;
  let packageJson;
  try {
    plugin = JSON.parse(read(pluginFile));
    pass(".codex-plugin/plugin.json contains valid JSON");
  } catch (error) {
    fail(`.codex-plugin/plugin.json contains valid JSON: ${error.message}`);
    return;
  }
  try {
    packageJson = JSON.parse(read(packageFile));
    pass("package.json contains valid JSON");
  } catch (error) {
    fail(`package.json contains valid JSON: ${error.message}`);
    return;
  }

  const pluginDescription = [
    plugin.description,
    plugin.interface?.shortDescription,
    plugin.interface?.longDescription,
    ...(plugin.interface?.defaultPrompt || []),
  ].join(" ");
  assert(/existing[- ]project|existing frontend/i.test(pluginDescription), "plugin metadata mentions existing-project compatibility");
  assert(/component|primitive/i.test(pluginDescription), "plugin metadata mentions component or primitive quality");
  assert(/quality|polish|accessib|responsive/i.test(pluginDescription), "plugin metadata mentions UI quality verification");

  assert(/existing[- ]project|existing frontend/i.test(packageJson.description || ""), "package description mentions existing-project work");
  assert(Array.isArray(packageJson.files) && packageJson.files.includes("catalog/"), "package files include the canonical catalog/");

  const agentMetadata = read(agentsOpenaiFile);
  assert(/responsive|accessib/i.test(agentMetadata), "agents/openai.yaml mentions responsive or accessibility checks");

  [
    ["README.md", read(readmeFile)],
    ["README.zh-CN.md", read(readmeZhFile)],
  ].forEach(([label, content]) => {
    ["asset-manifest.json", "npm test", "npm run check", "PREVIEW_AUDIT_WIDTHS"].forEach((needle) => {
      assert(content.includes(needle), `${label} includes ${needle}`);
    });
  });

  assert(fs.existsSync(validationWorkflowFile), ".github/workflows/validate.yml exists");
}

function checkSkillReferences() {
  const result = inspectSkillReferences(skillDir);
  if (result.errors.length) result.errors.forEach(fail);
  else pass(`all ${result.files.length} skill documents have valid links and are reachable from SKILL.md`);
}

function checkCatalogOutputs() {
  pass(`validated style catalog contains ${expectedStyleCount} entries`);
  assert(read(previewIndex) === renderGallery(), "preview gallery matches the canonical catalog");
  assert(read(path.join(referencesDir, "style-index.md")) === renderStyleIndex(), "style index matches the canonical catalog");
  for (const [file, lang] of [[readmeFile, "en"], [readmeZhFile, "zh"]]) {
    try {
      const content = read(file);
      assert(updateReadme(content, lang) === content, `${path.basename(file)} catalog table is current`);
    } catch (error) {
      fail(error.message);
    }
  }
}

function checkPreviewIndex() {
  const html = read(previewIndex);
  const css = [...html.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((match) => match[1]).join("\n");
  const cards = [...html.matchAll(/data-style-card="([^"]+)"/g)].map((match) => match[1]);
  assert(JSON.stringify(cards) === JSON.stringify(allStyles.map((style) => style.id)), "gallery contains every catalog style in order");
  for (const id of ["search", "empty", "selection-tray", "detail-dialog", "compare-dialog", "copy-prompt", "prompt-output"]) {
    assert(html.includes(`id="${id}"`), `gallery has the ${id} interaction surface`);
  }
  assert(html.includes('type="search"'), "gallery search uses a semantic search input");
  assert(html.includes('<dialog id="detail-dialog" aria-labelledby='), "style detail uses a labelled native dialog");
  assert(html.includes('<dialog id="compare-dialog" aria-labelledby='), "comparison uses a labelled native dialog");
  assert(html.includes('role="status"') && html.includes('aria-live="polite"'), "gallery exposes filter/copy feedback");
  assert(!/transition\s*:\s*all\b/.test(css), "gallery avoids transition: all");
  assert(!/outline\s*:\s*none\b/.test(css), "gallery preserves focus outlines");
  const links = [...html.matchAll(/<a class="preview-link"[^>]*>/g)].map((match) => match[0]);
  assert(links.length === expectedStyleCount, "every gallery card opens its live sample");
  assert(links.every((link) => link.includes('target="_blank"') && link.includes('rel="noopener noreferrer"')), "live samples open in new tabs safely");
  try {
    const data = JSON.parse(html.match(/<script id="gallery-data" type="application\/json">([\s\S]*?)<\/script>/)?.[1]);
    assert(data.styles.length === expectedStyleCount, "gallery metadata matches the catalog size");
    assert(data.viewports.desktop.width === expectedDesktopWidth && data.viewports.desktop.height === expectedDesktopHeight, "gallery desktop dimensions match assets");
    assert(data.viewports.mobile.width === expectedMobileWidth && data.viewports.mobile.height === expectedMobileHeight, "gallery mobile dimensions match assets");
    for (const style of allStyles) {
      const metadata = data.styles.find((entry) => entry.id === style.id);
      assert(metadata?.slug === style.slug && metadata.selection, `${style.slug} has filterable metadata`);
      for (const lang of ["en", "zh"]) for (const kind of promptKinds) {
        assert(unpackPrompt(data.prompts[style.id][lang], kind) === buildStylePrompt(style, lang, kind), `${style.slug} ${lang}/${kind} prompt is lossless and current`);
      }
    }
  } catch (error) {
    fail(`gallery data and prompt payload can be decoded: ${error.message}`);
  }
  for (const script of [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((match) => match[1])) {
    try { new Function(script); pass("gallery client script parses"); }
    catch (error) { fail(`gallery client script parses: ${error.message}`); }
  }
}

function checkStyleAssets() {
  const styleDirs = getStyleDirs();
  assert(JSON.stringify(styleDirs) === JSON.stringify(allStyles.map((style) => style.slug).sort()), "style directories match catalog IDs and slugs");

  styleDirs.forEach((dir) => {
    const slug = dir;
    const htmlFile = path.join(stylesDir, slug, `${slug}.html`);
    const pngFile = path.join(stylesDir, slug, `${slug}.png`);
    const mobilePngFile = path.join(stylesDir, slug, `${slug}-mobile.png`);
    const docFile = path.join(styleRefsDir, `${slug}.md`);

    assert(fs.existsSync(htmlFile), `${slug} HTML exists`);
    assert(fs.existsSync(pngFile), `${slug} desktop PNG exists`);
    assert(fs.existsSync(mobilePngFile), `${slug} mobile PNG exists`);
    assert(fs.existsSync(docFile), `${slug} style manual exists`);

    if (fs.existsSync(pngFile)) checkPngContent(pngFile, `${slug} desktop`, expectedDesktopWidth, expectedDesktopHeight);
    if (fs.existsSync(mobilePngFile)) checkPngContent(mobilePngFile, `${slug} mobile`, expectedMobileWidth, expectedMobileHeight);

    if (fs.existsSync(htmlFile)) {
      const html = read(htmlFile);
      [
        "class=\"interaction-demo\"",
        "data-loading-demo",
        "data-toast-trigger",
        "class=\"state-stack\"",
        "class=\"responsive-steps\"",
        "<input",
        "aria-live=\"polite\"",
      ].forEach((needle) => assert(html.includes(needle), `${slug} HTML includes ${needle}`));

      assert(html.includes('class="preview-context-shell"'), `${slug} has style-library navigation`);
      assert(html.includes(`?style=${allStyles.find((style) => style.slug === slug)?.id}#style-`), `${slug} links back to its selection detail`);
      assert(/<details\b[^>]*class="reference-disclosure"/.test(html), `${slug} progressively discloses technical examples`);

      const css = (html.match(/<style>([\s\S]*?)<\/style>/) || [])[1] || "";
      assert(!/transition\s*:\s*all\b/.test(css), `${slug} CSS avoids transition: all`);
      assert(!/outline\s*:\s*none\b/.test(css), `${slug} CSS avoids bare outline: none`);

      const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((match) => match[1]);
      scripts.forEach((script, index) => {
        try {
          new Function(script);
          pass(`${slug} inline script ${index + 1} parses`);
        } catch (error) {
          fail(`${slug} inline script ${index + 1} parses: ${error.message}`);
        }
      });
    }

    if (fs.existsSync(docFile)) {
      const doc = read(docFile);
      const style = allStyles.find((entry) => entry.slug === slug);
      assert(style && doc === renderStyleDoc(style), `${slug} manual matches the catalog and shared-reference format`);
    }
  });
}

function checkPreviewManifest() {
  const errors = validateManifest({
    manifestFile: previewManifestFile,
    manifestRoot: path.dirname(previewManifestFile),
    expectedStyles: allStyles.map((style) => style.slug),
    desktopSize: { width: expectedDesktopWidth, height: expectedDesktopHeight },
    mobileSize: { width: expectedMobileWidth, height: expectedMobileHeight },
  });

  if (errors.length === 0) {
    pass("preview asset manifest matches all HTML and screenshot artifacts");
  } else {
    errors.forEach((error) => fail(error));
  }
}

function checkBannedText() {
  const filesToCheck = [
    readmeFile,
    readmeZhFile,
    skillFile,
    path.join(referencesDir, "workflow.md"),
    path.join(referencesDir, "existing-project-integration.md"),
    path.join(referencesDir, "local-ui-patch.md"),
    path.join(referencesDir, "quality-checklist.md"),
    path.join(referencesDir, "component-implementation.md"),
    path.join(referencesDir, "usage-principles.md"),
    path.join(referencesDir, "style-index.md"),
    previewIndex,
  ];

  getStyleDirs().forEach((dir) => {
    filesToCheck.push(path.join(stylesDir, dir, `${dir}.html`));
    filesToCheck.push(path.join(styleRefsDir, `${dir}.md`));
  });

  filesToCheck.filter(fs.existsSync).forEach((file) => {
    const content = read(file);
    bannedPatterns.forEach((pattern) => {
      assert(!pattern.test(content), `${path.relative(rootDir, file)} does not contain ${pattern}`);
    });
  });
}

function lineMatches(content, pattern) {
  return content
    .split(/\r?\n/)
    .map((line, index) => ({ line, lineNumber: index + 1 }))
    .filter(({ line }) => pattern.test(line));
}

function checkUiPrimitiveImplementationPatterns() {
  const filesToCheck = [previewIndex, path.join(rootDir, "scripts", "generate-previews.js")];

  getStyleDirs().forEach((dir) => {
    filesToCheck.push(path.join(stylesDir, dir, `${dir}.html`));
  });

  filesToCheck.filter(fs.existsSync).forEach((file) => {
    const content = read(file);
    uiPrimitiveBannedPatterns.forEach(({ label, pattern }) => {
      const matches = lineMatches(content, pattern);
      if (matches.length > 0) {
        const locations = matches
          .slice(0, 5)
          .map(({ lineNumber }) => `${path.relative(rootDir, file)}:${lineNumber}`)
          .join(", ");
        fail(`${path.relative(rootDir, file)} avoids ${label} in generated UI (${locations})`);
      } else {
        pass(`${path.relative(rootDir, file)} avoids ${label} in generated UI`);
      }
    });
  });
}

function main() {
  checkSkillDescription();
  checkAgentsMetadata();
  checkCoreDomainNeutrality();
  checkReadmes();
  checkMetadataAlignment();
  checkSkillReferences();
  checkCatalogOutputs();
  checkPreviewIndex();
  checkStyleAssets();
  checkPreviewManifest();
  checkBannedText();
  checkUiPrimitiveImplementationPatterns();

  if (failures > 0) {
    console.error(`\n${failures} validation check(s) failed.`);
    process.exit(1);
  }
  console.log(`\nAll preview validation checks passed (${passes} checks).`);
  if (!verbose) console.log("Set VALIDATE_VERBOSE=1 or pass --verbose to print every PASS line.");
}

main();
