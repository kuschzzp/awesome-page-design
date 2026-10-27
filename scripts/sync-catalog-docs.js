const fs = require("node:fs");
const path = require("node:path");
const { allStyles, removedStyleSlugs } = require("./preview-catalog");
const { getStylePlaybook } = require("./preview-style-profiles");
const { renderStyleDoc, renderStyleIndex } = require("./preview-documents");
const { withPreviewTransaction } = require("./preview-transaction");

const readmeFiles = { en: "README.md", zh: "README.zh-CN.md" };
const startMarker = "<!-- style-catalog:start -->";
const endMarker = "<!-- style-catalog:end -->";
const cell = (text) => String(text).replace(/\|/g, "\\|").replace(/[\r\n]+/g, " ");

function renderReadmeTable(lang) {
  if (!readmeFiles[lang]) throw new Error(`Unsupported README language: ${lang}`);
  const zh = lang === "zh";
  const header = zh
    ? "| 风格 | 名称 | 布局模式 | 适合场景 | 视觉语言 |"
    : "| Style | Name | Layout Pattern | Best For | Visual Language |";
  const rows = allStyles.map((style) => {
    const playbook = getStylePlaybook(style);
    const values = [style.id, zh ? style.zhName : style.name, zh ? playbook.zhName : playbook.name,
      zh ? style.zhBestFor : style.bestFor, zh ? style.zhBrief : style.brief];
    return `| ${values.map(cell).join(" | ")} |`;
  });
  return [header, "|:---:|---|---|---|---|", ...rows].join("\n");
}

function updateReadme(content, lang) {
  if (content.split(startMarker).length !== 2 || content.split(endMarker).length !== 2) {
    throw new Error(`${readmeFiles[lang] || lang} must contain exactly one catalog marker pair`);
  }
  const start = content.indexOf(startMarker) + startMarker.length;
  const end = content.indexOf(endMarker);
  if (end < start) throw new Error("Catalog markers are out of order");
  return `${content.slice(0, start)}\n${renderReadmeTable(lang)}\n${content.slice(end)}`;
}

function writeCatalogReadmes(directory) {
  for (const [lang, name] of Object.entries(readmeFiles)) {
    const file = path.join(directory, name);
    fs.writeFileSync(file, updateReadme(fs.readFileSync(file, "utf8"), lang));
  }
}

async function syncCatalogReadmes(directory = path.resolve(__dirname, "..")) {
  const files = Object.values(readmeFiles);
  await withPreviewTransaction(directory, writeCatalogReadmes, { ownedPaths: files, copyPaths: files });
}

function writeCatalogReferences(skillDirectory, styles = allStyles) {
  const references = path.join(skillDirectory, "references");
  const manuals = path.join(references, "styles");
  fs.mkdirSync(manuals, { recursive: true });
  for (const slug of removedStyleSlugs) {
    fs.rmSync(path.join(manuals, `${slug}.md`), { force: true });
    fs.rmSync(path.join(manuals, `${slug}-design-system.md`), { force: true });
  }
  for (const style of styles) fs.writeFileSync(path.join(manuals, `${style.slug}.md`), renderStyleDoc(style));
  fs.writeFileSync(path.join(references, "style-index.md"), renderStyleIndex());
}

async function syncCatalogDocs(directory = path.resolve(__dirname, "..")) {
  const skill = "skills/awesome-page-design";
  const outputs = [...Object.values(readmeFiles), `${skill}/references/styles`, `${skill}/references/style-index.md`];
  await withPreviewTransaction(directory, (stage) => {
    writeCatalogReferences(path.join(stage, skill));
    writeCatalogReadmes(stage);
  }, { ownedPaths: outputs, copyPaths: outputs });
}

if (require.main === module) {
  syncCatalogDocs().then(() => console.log("README tables, style manuals, and style index synchronized from catalog/styles.json; HTML and screenshots were not changed.")).catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}

module.exports = { renderReadmeTable, updateReadme, writeCatalogReadmes, syncCatalogReadmes, writeCatalogReferences, syncCatalogDocs };
