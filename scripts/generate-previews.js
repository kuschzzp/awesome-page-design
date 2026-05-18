#!/usr/bin/env node

const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const rootDir = path.resolve(__dirname, "..");
const stylesDir = path.join(rootDir, "styles");
const outputDir = path.join(rootDir, "previews");
const chromePath =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const viewportWidth = Number(process.env.PREVIEW_WIDTH || 1440);
const viewportHeight = Number(process.env.PREVIEW_HEIGHT || 1200);
const chromeWait = Number(process.env.PREVIEW_WAIT || 5000);

function toFileUrl(filePath) {
  return `file://${filePath.split(path.sep).map(encodeURIComponent).join("/")}`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function findHtmlFiles() {
  if (!fs.existsSync(stylesDir)) {
    return [];
  }

  return fs
    .readdirSync(stylesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^version-[a-z]+-/.test(entry.name))
    .flatMap((entry) => {
      const styleDir = path.join(stylesDir, entry.name);
      return fs
        .readdirSync(styleDir)
        .filter((file) => /^version-[a-z]+-.*\.html$/.test(file))
        .map((file) => path.join("styles", entry.name, file));
    })
    .sort((a, b) => a.localeCompare(b, "en"));
}

function screenshot(htmlFile) {
  const inputPath = path.join(rootDir, htmlFile);
  const outputPath = inputPath.replace(/\.html$/, ".png");
  const outputFile = path.relative(rootDir, outputPath);

  execFileSync(
    chromePath,
    [
      "--headless",
      "--disable-gpu",
      "--disable-extensions",
      "--disable-dev-shm-usage",
      "--hide-scrollbars",
      "--no-first-run",
      "--no-default-browser-check",
      `--timeout=${chromeWait}`,
      `--window-size=${viewportWidth},${viewportHeight}`,
      `--screenshot=${outputPath}`,
      toFileUrl(inputPath),
    ],
    {
      stdio: ["ignore", "pipe", "pipe"],
      timeout: Math.max(30000, chromeWait + 15000),
      killSignal: "SIGKILL",
    }
  );

  return outputFile;
}

function writeIndex(imageFiles) {
  const cards = imageFiles
    .map((imageFile) => {
      const title = path.basename(imageFile, ".png");
      const href = `../${imageFile.split(path.sep).join("/")}`;
      return `      <a class="card" href="${escapeHtml(href)}">
        <img src="${escapeHtml(href)}" alt="${escapeHtml(title)} preview" loading="lazy">
        <span>${escapeHtml(title)}</span>
      </a>`;
    })
    .join("\n");

  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Web Style Templates Previews</title>
<style>
* { box-sizing: border-box; }
body {
  margin: 0;
  padding: 32px;
  background: #f5f6fa;
  color: #1f2937;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
.header {
  max-width: 1440px;
  margin: 0 auto 24px;
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 16px;
}
h1 {
  margin: 0;
  font-size: 28px;
  line-height: 1.2;
  letter-spacing: 0;
}
.meta {
  margin: 8px 0 0;
  color: #667085;
  font-size: 14px;
}
.grid {
  max-width: 1440px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}
.card {
  display: block;
  overflow: hidden;
  color: inherit;
  text-decoration: none;
  background: #ffffff;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(15,23,42,0.08);
}
.card img {
  display: block;
  width: 100%;
  aspect-ratio: ${viewportWidth} / ${viewportHeight};
  object-fit: cover;
  object-position: top;
  background: #e5e7eb;
}
.card span {
  display: block;
  padding: 12px 14px;
  font-size: 14px;
  font-weight: 600;
}
@media (max-width: 640px) {
  body { padding: 16px; }
  .header { display: block; }
  .grid { grid-template-columns: 1fr; gap: 16px; }
}
</style>
</head>
<body>
  <header class="header">
    <div>
      <h1>Web Style Templates Previews</h1>
      <p class="meta">${imageFiles.length} 张预览图，视口 ${viewportWidth}x${viewportHeight}</p>
    </div>
  </header>
  <main class="grid">
${cards}
  </main>
</body>
</html>
`;

  fs.writeFileSync(path.join(outputDir, "index.html"), html);
}

function main() {
  if (!fs.existsSync(chromePath)) {
    throw new Error(`找不到 Chrome：${chromePath}\n可通过 CHROME_PATH=/path/to/chrome 指定浏览器路径。`);
  }

  fs.mkdirSync(outputDir, { recursive: true });

  const htmlFiles = findHtmlFiles();
  if (htmlFiles.length === 0) {
    throw new Error("没有在 styles/ 下找到 version-*.html 文件。");
  }

  console.log(`Generating ${htmlFiles.length} previews...`);
  const imageFiles = [];

  for (const htmlFile of htmlFiles) {
    process.stdout.write(`- ${htmlFile} -> `);
    const imageFile = screenshot(htmlFile);
    imageFiles.push(imageFile);
    process.stdout.write(`${imageFile}\n`);
  }

  writeIndex(imageFiles);
  console.log(`Done. Open ${path.relative(rootDir, path.join(outputDir, "index.html"))}`);
}

main();
