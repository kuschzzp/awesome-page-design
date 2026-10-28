const fs = require("node:fs");
const path = require("node:path");
const { promptKinds, buildStylePrompt } = require("./preview-prompts");
const { allStyles } = require("./preview-catalog");
const { getStylePlaybook } = require("./preview-style-profiles");
const { getGalleryStyles, packPromptVariants, unpackPrompt } = require("./gallery-model");
const copy = require("./gallery-copy");
const { initializeGallery } = require("./gallery-client");

const galleryCss = fs.readFileSync(path.join(__dirname, "preview-pages/gallery.css"), "utf8");
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const initialTags = { ...copy.zh, editorial: copy.zh.family_editorial };

function viewportControls() {
  return `<div class="segmented" role="group" aria-label="预览尺寸 / Preview viewport"><button type="button" data-preview-view="desktop" aria-pressed="true" data-i18n="desktop">桌面</button><button type="button" data-preview-view="mobile" aria-pressed="false" data-i18n="mobile">移动</button></div>`;
}

function languageControls() {
  return `<div class="segmented" role="group" aria-label="语言 / Language"><button type="button" data-lang="zh" aria-pressed="true">中文</button><button type="button" data-lang="en" aria-pressed="false">EN</button></div>`;
}

function renderCard(style, viewports) {
  const image = `../styles/${style.slug}/${style.slug}`;
  const tags = [style.selection.family, style.selection.appearance, style.selection.density];
  return `<article class="card" id="style-${style.id}" data-style-card="${style.id}">
    <div class="preview-link">
      <img src="${image}.png" alt="${escapeHtml(style.zhName)} · 桌面" width="${viewports.desktop.width}" height="${viewports.desktop.height}" loading="lazy">
      <span class="style-number">STYLE ${style.id}</span>
    </div>
    <div class="card-body">
      <div class="card-title"><h3 id="card-name-${style.id}" data-en="${escapeHtml(style.name)}" data-zh="${escapeHtml(style.zhName)}">${escapeHtml(style.zhName)}</h3><div class="swatches" aria-label="风格配色 / Style palette">${Object.entries(style.palette).map(([role, color]) => `<span style="--swatch:${escapeHtml(color)}" title="${role} ${escapeHtml(color)}"></span>`).join("")}</div></div>
      <div class="card-meta">${tags.map((tag, index) => `<span class="tag" data-tag="${index === 0 && tag === "editorial" ? "family_editorial" : tag}">${initialTags[tag]}</span>`).join("")}</div>
      <p class="card-description" data-en="${escapeHtml(style.bestFor)}" data-zh="${escapeHtml(style.zhBestFor)}">${escapeHtml(style.zhBestFor)}</p>
      <button type="button" class="card-open" data-open-style="${style.id}" aria-labelledby="card-action-${style.id} card-name-${style.id}" aria-haspopup="dialog"><span id="card-action-${style.id}" data-i18n="select">查看风格</span><svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="M4 10h12m-5-5 5 5-5 5"/></svg></button>
    </div>
  </article>`;
}

function renderGallery({ viewportWidth = 1440, viewportHeight = 1200, mobileViewportWidth = 390, mobileViewportHeight = 844 } = {}) {
  const viewports = { desktop: { width: viewportWidth, height: viewportHeight }, mobile: { width: mobileViewportWidth, height: mobileViewportHeight } };
  const styles = getGalleryStyles().map((style) => {
    const { name, zhName, structure, zhStructure, typography, zhTypography } = getStylePlaybook(style);
    return { ...style, layout: { name, zhName, structure, zhStructure, typography, zhTypography } };
  });
  const prompts = Object.fromEntries(allStyles.map((style) => [style.id, Object.fromEntries(["en", "zh"].map((lang) => [lang, packPromptVariants(Object.fromEntries(promptKinds.map((kind) => [kind.key, buildStylePrompt(style, lang, kind.key)])))]))]));
  const payload = JSON.stringify({ styles, prompts, kinds: promptKinds, viewports, copy }).replace(/</g, "\\u003c");
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta name="description" content="浏览 ${styles.length} 种网页设计风格，复制适合你产品的提示词。">
<title>风格库 · Awesome Page Design</title>
<link rel="icon" href="./favicon.ico" sizes="16x16 32x32 48x48 64x64 128x128 256x256" type="image/x-icon">
<link rel="icon" href="./favicon.svg" type="image/svg+xml" sizes="any">
<style>${galleryCss}</style>
</head>
<body id="top">
<div class="shell">
  <header class="masthead"><a class="wordmark" href="#top">Awesome Page Design <span data-i18n="library">风格库</span></a>${languageControls()}</header>
  <main>
    <div class="results-bar"><div><h1 id="result-count">${styles.length} 种风格</h1></div><p data-i18n="curated">每一种都有自己的布局、材质与组件语言。</p></div>
    <section class="grid" id="style-grid" aria-label="风格目录 / Style catalog">${styles.map((style) => renderCard(style, viewports)).join("\n")}</section>
    <section class="guide" id="how-to-use"><div><h2 data-i18n="guideTitle">选的是方向，不是固定模板。</h2><p data-i18n="guideBody">喜欢一个方向后，复制对应页面类型的提示词交给 Agent。保留它的视觉语言，让布局服务于你的真实产品。</p></div><div><h2 data-i18n="secondTitle">打开示例，查看细节。</h2><p data-i18n="secondBody">打开演示体验布局和控件，再从详情中复制适合你任务的提示词。</p></div></section>
  </main>
  <footer class="footer" data-i18n="footer">Awesome Page Design · 让设计选择更明确</footer>
</div>
<dialog id="detail-dialog" aria-labelledby="detail-name" aria-describedby="detail-description">
  <header class="dialog-head"><h2><span id="detail-name"></span><small id="detail-subtitle"></small></h2><div class="dialog-tools"><button type="button" class="dialog-close" data-close-dialog><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false"><path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg><span data-i18n="close">关闭</span></button></div></header>
  <div class="detail-layout"><div class="detail-preview"><div class="dialog-viewport">${viewportControls()}</div><div class="preview-stage"><img id="detail-image" data-preview-image data-style="${styles[0].id}" src="../styles/${styles[0].slug}/${styles[0].slug}.png" alt="风格预览" width="${viewportWidth}" height="${viewportHeight}"></div></div><div class="detail-content"><p id="detail-description"></p><dl class="detail-facts" id="detail-facts"></dl><h3 data-i18n="palette">颜色角色</h3><div class="palette-detail" id="detail-palette"></div><h3 data-i18n="task">你要做什么页面？</h3><div class="prompt-kinds" role="group" aria-label="提示词页面类型 / Prompt page type">${promptKinds.map((kind) => `<button type="button" data-prompt-kind="${kind.key}" aria-pressed="${kind.key === "full"}">${kind.labelZh}</button>`).join("")}</div><p class="kind-help" id="kind-help"></p><div class="detail-actions"><button type="button" class="button accent" id="copy-prompt" data-i18n="copy">复制此风格提示词</button><a class="button quiet" id="detail-live" href="../styles/${styles[0].slug}/${styles[0].slug}.html" target="_blank" rel="noopener noreferrer" data-i18n="live">打开演示</a></div><details class="prompt-disclosure" id="prompt-disclosure"><summary data-i18n="prompt">查看完整提示词</summary><pre id="prompt-output" tabindex="0" aria-label="完整提示词 / Full prompt"></pre></details></div></div>
</dialog>
<div class="toast" id="toast" role="status" hidden></div><div id="status" class="sr-only" aria-live="polite"></div>
<noscript>启用 JavaScript 以查看风格详情和复制提示词；风格名称与适用场景仍可浏览。</noscript>
<script id="gallery-data" type="application/json">${payload}</script>
<script>${unpackPrompt.toString()}\n(${initializeGallery.toString()})();</script>
</body>
</html>
`;
}

module.exports = { renderGallery };
