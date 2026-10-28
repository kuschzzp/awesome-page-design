// Page templates and shared CSS; generation and browser operations stay separate.
const fs = require("node:fs");
const { decorateControls } = require("./preview-controls");
const path = require("node:path");
const { renderStyle01Inventory } = require("./preview-pages/style01-inventory");
const { renderStyle02Market } = require("./preview-pages/style02-market");
const { getRedesignedPage, baseCss, runtimeScript } = require("./preview-pages/redesign");

const sharedCss = fs.readFileSync(path.join(__dirname, "preview-pages", "shared.css"), "utf8");
const inventoryCss = fs.readFileSync(path.join(__dirname, "preview-pages", "style01-inventory.css"), "utf8");
// Share the existing toolbar source without importing unrelated legacy page styles.
const toolbarStart = sharedCss.indexOf(".preview-context-shell {");
const toolbarEnd = sharedCss.indexOf("/* Keep the print ledger", toolbarStart);
const toolbarMobile = sharedCss.slice(sharedCss.lastIndexOf("@media (max-width: 640px)"))
  .split("\n").filter(line => line.includes(".preview-context")).join("\n");
const toolbarCss = sharedCss.slice(toolbarStart, toolbarEnd) + "\n@media (max-width: 640px) {\n" + toolbarMobile + "\n}\n";
const marketCss = fs.readFileSync(path.join(__dirname, "preview-pages", "style02-market.css"), "utf8");
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function createPageRenderer({
  getScenario,
  getStylePlaybook,
  getGeometryProfile,
  buildStylePrompt,
}) {
function renderMiniNav(style, scenario) {
  return `<nav class="top-nav" aria-label="Example navigation">
      <a class="brand-lockup" href="#top"><span>${escapeHtml(style.id)}</span><b>${escapeHtml(scenario.brand)}</b></a>
      <div class="nav-links">${scenario.nav.map((item) => `<a href="#style-note-title" data-open-modal>${escapeHtml(item)}</a>`).join("")}</div>
      <button type="button" class="ghost-action" data-open-modal>Style notes</button>
    </nav>`;
}

function renderLayoutContent(style) {
  if (style.id === "01") return renderStyle01Inventory();
  if (style.id === "02") return renderStyle02Market();
  throw new Error(`No page implementation for style ${style.id}`);
}

function renderDistinctStyleHtml(style) {
  const label = style.label || `Style ${style.id}`;
  const scenario = getScenario(style);
  const playbook = getStylePlaybook(style);
  const geometry = getGeometryProfile(style);
  const notes = style.notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("");
  const prompt = buildStylePrompt(style, "en");

  return `<!DOCTYPE html>
<html lang="${["01", "02"].includes(style.id) ? "zh-CN" : "en"}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${label} - ${style.name}</title>
<link rel="icon" href="../../previews/favicon.ico" type="image/x-icon">
<link rel="icon" href="../../previews/favicon.svg" type="image/svg+xml" sizes="any">
<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  min-width: 0;
}
html,
body {
  max-width: 100%;
  overflow-x: hidden;
}
:root {
  --bg: ${style.bg};
  --surface: ${style.surface};
  --text: ${style.text};
  --muted: ${style.muted};
  --primary: ${style.primary};
  --accent: ${style.accent};
  --border: ${style.border};
  --radius: ${style.radius};
  --panel-radius: ${geometry.panel};
  --control-radius: ${geometry.control};
  --chip-radius: ${geometry.chip};
  --media-radius: ${geometry.media};
  --shadow: ${style.shadow};
}
${sharedCss}${style.id === "01" ? inventoryCss : style.id === "02" ? marketCss : ""}</style>
</head>
<body class="${style.className}">
  <header class="preview-context-shell">
    <nav class="preview-context" aria-label="风格预览导航">
      <div class="preview-context-identity" role="group" aria-label="风格 ${escapeHtml(style.id)}：${escapeHtml(style.zhName)}" title="${escapeHtml(style.zhName)}"><span class="preview-context-number">${escapeHtml(style.id)}</span><strong class="preview-context-name" lang="zh-CN">${escapeHtml(style.zhName)}</strong></div>
      <div class="preview-context-actions">
        <a class="preview-context-back" href="../../previews/index.html" lang="zh-CN"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 5-7 7 7 7M5 12h14"/></svg><span>风格库</span></a>
        <a class="preview-context-use" href="../../previews/index.html?style=${encodeURIComponent(style.id)}#style-${encodeURIComponent(style.id)}" lang="zh-CN"><span class="preview-context-use-label">选用此风格<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg></span></a>
      </div>
    </nav>
  </header>
  <main id="top" class="page">
    ${renderMiniNav(style, scenario)}
    ${renderLayoutContent(style, scenario, playbook)}
  </main>

  <aside class="modal" hidden data-modal role="dialog" aria-modal="false" aria-labelledby="style-note-title">
    <h3 id="style-note-title">${escapeHtml(label)}: ${escapeHtml(style.name)}</h3>
    <ul>${notes}</ul>
    <button type="button" class="secondary-action" data-close-modal>Close</button>
  </aside>
  <div class="toast" hidden data-toast role="status" aria-live="polite">
    <b>Saved</b>
    <span data-toast-message>Action confirmed</span>
  </div>
  <div class="sr-status" aria-live="polite" data-status></div>

  <script>
  const prompt = ${JSON.stringify(prompt)};
  const modal = document.querySelector('[data-modal]');
  const status = document.querySelector('[data-status]');
  const toast = document.querySelector('[data-toast]');
  let toastTimer;
  function showToast(message) {
    if (!toast) return;
    const messageNode = toast.querySelector('[data-toast-message]');
    if (messageNode) messageNode.textContent = message;
    toast.hidden = false;
    status.textContent = message;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.hidden = true;
    }, 2200);
  }
  async function copyText(value) {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(value);
        return true;
      } catch {}
    }
    const helper = document.createElement('textarea');
    helper.value = value;
    helper.setAttribute('readonly', '');
    helper.style.position = 'fixed';
    helper.style.inset = '0 auto auto 0';
    helper.style.width = '1px';
    helper.style.height = '1px';
    helper.style.opacity = '0';
    document.body.appendChild(helper);
    helper.focus();
    helper.select();
    let copied = false;
    try {
      copied = document.execCommand('copy');
    } catch {}
    helper.remove();
    return copied;
  }
  document.querySelectorAll('[data-open-modal]').forEach((node) => node.addEventListener('click', (event) => {
    event.preventDefault();
    modal.hidden = false;
    document.querySelector('[data-close-modal]').focus();
  }));
  document.querySelector('[data-close-modal]').addEventListener('click', () => modal.hidden = true);
  document.querySelectorAll('[data-copy]').forEach((button) => {
    const original = button.textContent;
    button.addEventListener('click', async () => {
      if (await copyText(prompt)) {
        button.textContent = 'Copied detailed prompt';
        status.textContent = 'Detailed style prompt copied';
        showToast('Detailed style prompt copied');
        setTimeout(() => button.textContent = original, 1500);
      } else {
        button.textContent = 'Copy unavailable';
        status.textContent = 'Copy unavailable in this browser context';
        showToast('Copy unavailable in this browser context');
        setTimeout(() => button.textContent = original, 1800);
      }
    });
  });
  </script>
</body>
</html>
`;
}

function renderRedesignedHtml(style, page) {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Style ${escapeHtml(style.id)} - ${escapeHtml(style.name)}</title>
<link rel="icon" href="../../previews/favicon.ico" type="image/x-icon">
<link rel="icon" href="../../previews/favicon.svg" type="image/svg+xml" sizes="any">
<style>
*, *::before, *::after { box-sizing: border-box; min-width: 0; }
html, body { max-width: 100%; }
body { margin: 0; background: ${style.bg}; color: ${style.text}; color-scheme: ${style.selection?.appearance === "dark" ? "dark" : "light"}; }
${toolbarCss}
${baseCss}
${page.css}
.demo-announcement { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
</style>
</head>
<body class="${escapeHtml(style.className)} demo-redesign demo-style-${escapeHtml(style.id)}">
  <header class="preview-context-shell">
    <nav class="preview-context" aria-label="风格预览导航">
      <div class="preview-context-identity" role="group" aria-label="风格 ${escapeHtml(style.id)}：${escapeHtml(style.zhName)}" title="${escapeHtml(style.zhName)}"><span class="preview-context-number">${escapeHtml(style.id)}</span><strong class="preview-context-name" lang="zh-CN">${escapeHtml(style.zhName)}</strong></div>
      <div class="preview-context-actions">
        <a class="preview-context-back" href="../../previews/index.html" lang="zh-CN"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 5-7 7 7 7M5 12h14"/></svg><span>风格库</span></a>
        <a class="preview-context-use" href="../../previews/index.html?style=${encodeURIComponent(style.id)}#style-${encodeURIComponent(style.id)}" lang="zh-CN"><span class="preview-context-use-label">选用此风格<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg></span></a>
      </div>
    </nav>
  </header>
  <script>${runtimeScript}</script>
  <main id="top" class="page">${page.render()}</main>
  <div class="demo-announcement" aria-live="polite"></div>
</body>
</html>`;
}

function renderStyleHtml(style) {
  const page = getRedesignedPage(style.id);
  let html = page ? renderRedesignedHtml(style, page) : renderDistinctStyleHtml(style);
  if (style.id === "01") html = html.replace('</head>', '<!-- Lucide icons: ISC; Feather-derived icons: MIT. Notices: ./style01-icons.LICENSE -->\n</head>');
  return decorateControls(html, style.id);
}

  return { renderStyleHtml };
}

module.exports = { createPageRenderer };
