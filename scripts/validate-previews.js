#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { describePngQuality, hasVisibleContent, readPngQuality } = require("./png-quality");

const rootDir = path.resolve(__dirname, "..");
const skillDir = path.join(rootDir, "skills", "awesome-page-design");
const stylesDir = path.join(skillDir, "assets", "styles");
const previewIndex = path.join(skillDir, "assets", "previews", "index.html");
const referencesDir = path.join(skillDir, "references");
const styleRefsDir = path.join(referencesDir, "styles");
const skillFile = path.join(skillDir, "SKILL.md");
const uiPrimitiveContractFile = path.join(referencesDir, "ui-primitive-contract.md");
const readmeFile = path.join(rootDir, "README.md");
const readmeZhFile = path.join(rootDir, "README.zh-CN.md");
const agentsOpenaiFile = path.join(skillDir, "agents", "openai.yaml");

const expectedStyleCount = 26;
const expectedDesktopWidth = 1440;
const expectedDesktopHeight = 1200;
const expectedMobileWidth = 390;
const expectedMobileHeight = 844;
const promptKinds = ["full", "landing", "dashboard", "admin", "mobile"];
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

function decodeHtml(value) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function getStyleDirs() {
  if (!fs.existsSync(stylesDir)) return [];
  return fs
    .readdirSync(stylesDir)
    .filter((name) => /^style-\d{2}-/.test(name))
    .sort();
}

function checkSkillDescription() {
  const skill = read(skillFile);
  const frontmatter = skill.match(/^---\n([\s\S]*?)\n---/);
  const description = frontmatter?.[1]?.match(/^description:\s*(.*)$/m)?.[1] || "";
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

function checkUiPrimitiveContract() {
  assert(fs.existsSync(uiPrimitiveContractFile), "ui primitive contract reference exists");
  const contract = read(uiPrimitiveContractFile);
  [
    "## Hard Bans For Product UI",
    "## Replacement Matrix",
    "## Anti-Pattern Scan",
    "alert",
    "confirm",
    "prompt",
    "<select>",
    "outline",
    "transition",
  ].forEach((needle) => assert(contract.includes(needle), `ui primitive contract includes ${needle}`));

  [
    skillFile,
    path.join(referencesDir, "workflow.md"),
    path.join(referencesDir, "usage-principles.md"),
    path.join(referencesDir, "existing-project-integration.md"),
    path.join(referencesDir, "local-ui-patch.md"),
    path.join(referencesDir, "component-implementation.md"),
    path.join(referencesDir, "interface-compliance.md"),
    readmeFile,
    readmeZhFile,
  ].forEach((file) => {
    assert(read(file).includes("ui-primitive-contract.md"), `${path.relative(rootDir, file)} references ui-primitive-contract.md`);
  });
}

function checkNewProjectReadinessGuidance() {
  [
    skillFile,
    path.join(referencesDir, "workflow.md"),
    path.join(referencesDir, "usage-principles.md"),
    path.join(referencesDir, "interface-compliance.md"),
    readmeFile,
    readmeZhFile,
  ].forEach((file) => {
    const content = read(file);
    assert(content.includes("favicon.ico"), `${path.relative(rootDir, file)} includes favicon.ico guidance`);
  });

  [
    skillFile,
    path.join(referencesDir, "workflow.md"),
    path.join(referencesDir, "interface-compliance.md"),
  ].forEach((file) => {
    const content = read(file);
    assert(/favicon\.svg[\s\S]{0,120}(supplement|not a replacement|does not replace|不能替代)/i.test(content) || /SVG[\s\S]{0,120}(supplement|not a replacement|does not replace|不能替代)/i.test(content), `${path.relative(rootDir, file)} says SVG favicon does not replace favicon.ico`);
  });
}

function checkPreviewIndex() {
  const html = read(previewIndex);
  const css = [...html.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((match) => match[1]).join("\n");
  const openLinks = [...html.matchAll(/<a href="\.\.\/styles\/[^"]+"[^>]*data-i18n="openHtml"/g)].map((match) => match[0]);
  const promptButtons = [...html.matchAll(/<button type="button" data-prompts="([^"]+)"[^>]*data-i18n="copyPrompt"/g)].map((match) => match[1]);
  const promptPickers = [...html.matchAll(/data-prompt-picker data-selected-kind="full"/g)];
  const promptChooserLabels = [...html.matchAll(/data-i18n="promptChooser"/g)];
  const promptOptionTitles = [...html.matchAll(/<span data-prompt-option-title>/g)];
  const promptOptionDescriptions = [...html.matchAll(/<span data-prompt-option-description>/g)];
  const nativePromptSelects = [...html.matchAll(/<select data-prompt-kind/g)];
  const previewImages = [...html.matchAll(/<img\b[\s\S]*?data-preview-image[\s\S]*?>/g)];
  const desktopSources = [...html.matchAll(/data-desktop-src="([^"]+\.png)"/g)].map((match) => match[1]);
  const mobileSources = [...html.matchAll(/data-mobile-src="([^"]+-mobile\.png)"/g)].map((match) => match[1]);
  const desktopDimensions = [...html.matchAll(/data-desktop-width="1440"\s+data-desktop-height="1200"/g)];
  const mobileDimensions = [...html.matchAll(/data-mobile-width="390"\s+data-mobile-height="844"/g)];
  const viewportButtons = [...html.matchAll(/data-preview-view="(desktop|mobile)"/g)].map((match) => match[1]);

  assert(openLinks.length === expectedStyleCount, `preview index has ${expectedStyleCount} Open HTML links`);
  assert(openLinks.every((link) => link.includes('target="_blank"') && link.includes('rel="noopener noreferrer"')), "Open HTML links open in new tabs safely");
  assert(previewImages.length === expectedStyleCount, `preview index has ${expectedStyleCount} switchable preview images`);
  assert(desktopSources.length === expectedStyleCount, `preview index has ${expectedStyleCount} desktop preview sources`);
  assert(desktopSources.every((source) => !source.includes("-mobile")), "preview index desktop sources use desktop screenshots");
  assert(mobileSources.length === expectedStyleCount, `preview index has ${expectedStyleCount} mobile preview sources`);
  assert(desktopDimensions.length === expectedStyleCount, `preview index stores ${expectedStyleCount} desktop screenshot dimensions`);
  assert(mobileDimensions.length === expectedStyleCount, `preview index stores ${expectedStyleCount} mobile screenshot dimensions`);
  assert(viewportButtons.includes("desktop") && viewportButtons.includes("mobile"), "preview index has desktop and mobile viewport toggles");
  assert(promptPickers.length === expectedStyleCount, `preview index has ${expectedStyleCount} custom prompt pickers`);
  assert(promptChooserLabels.length === expectedStyleCount, `preview index labels ${expectedStyleCount} prompt pickers with a user-facing question`);
  assert(promptOptionTitles.length === expectedStyleCount * promptKinds.length, "preview index prompt options include visible titles");
  assert(promptOptionDescriptions.length === expectedStyleCount * promptKinds.length, "preview index prompt options include visible descriptions");
  assert(!/transition\s*:\s*all\b/.test(css), "preview index CSS avoids transition: all");
  assert(!/outline\s*:\s*none\b/.test(css), "preview index CSS avoids bare outline: none");
  assert(html.includes("General") && html.includes("移动端"), "preview index uses user-facing prompt type labels");
  assert(html.includes("Copy Dashboard") && html.includes("复制看板"), "preview index uses task-specific copy button labels");
  assert(nativePromptSelects.length === 0, "preview index does not use native prompt select controls");
  assert(html.includes('role="listbox"'), "preview index custom prompt menu uses listbox role");
  assert(html.includes('aria-expanded="false"'), "preview index custom prompt trigger exposes expanded state");
  assert(promptButtons.length === expectedStyleCount, `preview index has ${expectedStyleCount} prompt copy buttons`);

  promptButtons.forEach((payload, index) => {
    try {
      const prompts = JSON.parse(decodeHtml(payload));
      const hasAllKinds = ["en", "zh"].every((lang) =>
        promptKinds.every((kind) => typeof prompts[lang]?.[kind] === "string" && prompts[lang][kind].length > 400)
      );
      assert(hasAllKinds, `prompt payload ${index + 1} includes all prompt kinds in EN and ZH`);
    } catch (error) {
      fail(`prompt payload ${index + 1} is valid JSON: ${error.message}`);
    }
  });
}

function checkStyleAssets() {
  const styleDirs = getStyleDirs();
  assert(styleDirs.length === expectedStyleCount, `found ${expectedStyleCount} style directories`);

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
      [
        "## Component Detail System",
        "## Page Adaptation Guide",
        "### Full Prompt",
        "### Landing Page",
        "### Dashboard",
        "### Admin Panel",
        "### Mobile",
        "Responsive behavior:",
      ].forEach((needle) => assert(doc.includes(needle), `${slug} manual includes ${needle}`));
    }
  });
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
  checkUiPrimitiveContract();
  checkNewProjectReadinessGuidance();
  checkPreviewIndex();
  checkStyleAssets();
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
