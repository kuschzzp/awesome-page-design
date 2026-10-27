const fs = require("node:fs");
const path = require("node:path");
const { promptKinds, buildStylePrompt } = require("./preview-prompts");
const { allStyles } = require("./preview-catalog");
const { getStylePlaybook } = require("./preview-style-profiles");
const { getGalleryStyles, filterGalleryStyles, packPromptVariants, unpackPrompt } = require("./gallery-model");
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
    <a class="preview-link" href="${image}.html" target="_blank" rel="noopener noreferrer" aria-label="打开 ${escapeHtml(style.zhName)} 演示 / Open ${escapeHtml(style.name)} demo">
      <img data-preview-image data-style="${style.id}" src="${image}.png" alt="${escapeHtml(style.zhName)} · 桌面" width="${viewports.desktop.width}" height="${viewports.desktop.height}" loading="lazy">
      <span class="style-number">STYLE ${style.id}</span>
    </a>
    <div class="card-body">
      <div class="card-title"><h3 data-en="${escapeHtml(style.name)}" data-zh="${escapeHtml(style.zhName)}">${escapeHtml(style.zhName)}</h3><div class="swatches" aria-label="风格配色 / Style palette">${Object.entries(style.palette).map(([role, color]) => `<span style="--swatch:${escapeHtml(color)}" title="${role} ${escapeHtml(color)}"></span>`).join("")}</div></div>
      <div class="card-meta">${tags.map((tag, index) => `<span class="tag" data-tag="${index === 0 && tag === "editorial" ? "family_editorial" : tag}">${initialTags[tag]}</span>`).join("")}</div>
      <p class="card-description" data-en="${escapeHtml(style.bestFor)}" data-zh="${escapeHtml(style.zhBestFor)}">${escapeHtml(style.zhBestFor)}</p>
      <div class="card-actions"><button type="button" class="text-button primary" data-open-style="${style.id}" data-i18n="select">查看与选用</button><button type="button" class="text-button" data-compare-style="${style.id}" aria-pressed="false" aria-label="加入对比 ${escapeHtml(style.zhName)}">加入对比</button></div>
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
  const uses = { all: "全部风格", landing: "产品落地页", dashboard: "数据看板", admin: "管理后台", portfolio: "作品展示", editorial: "内容与品牌" };
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta name="description" content="探索、筛选并比较 ${styles.length} 种网页设计风格，复制适合你产品的提示词。">
<title>风格库 · Awesome Page Design</title>
<style>${galleryCss}</style>
</head>
<body id="top">
<div class="shell">
  <header class="masthead"><a class="wordmark" href="#top">Awesome Page Design <span data-i18n="library">风格库</span></a>${languageControls()}</header>
  <main>
    <section class="hero" aria-labelledby="page-title"><div><h1 id="page-title" data-i18n="title">让界面有自己的风格。</h1><p data-i18n="intro">从真实页面中找方向，比较差异，再把选择交给你的 Agent。</p></div><div class="how" aria-hidden="true"><span><b>01</b><span data-i18n="step1">缩小范围</span></span><span><b>02</b><span data-i18n="step2">比较风格</span></span><span><b>03</b><span data-i18n="step3">选用并开始</span></span></div></section>
    <section class="filter-panel" aria-label="筛选风格 / Filter styles">
      <div class="filter-top"><div class="search"><input id="search" type="search" aria-label="搜索风格" placeholder="搜索风格、场景或关键词…" autocomplete="off"></div><div class="filter-options"><span class="small-label" data-i18n="appearance">画面</span><div class="segmented" role="group" aria-label="画面明暗 / Appearance">${["all", "light", "dark", "mixed"].map((key) => `<button type="button" data-appearance="${key}" aria-pressed="${key === "all"}" data-i18n="${key}">${key === "all" ? "不限" : initialTags[key]}</button>`).join("")}</div></div></div>
      <div class="use-cases" role="group" aria-label="产品场景 / Product type">${Object.entries(uses).map(([key, label]) => `<button type="button" data-use-case="${key}" data-i18n="${key}" aria-pressed="${key === "all"}">${label}</button>`).join("")}<button type="button" class="text-button" id="reset-filters" data-reset data-i18n="reset" hidden>重置筛选</button></div>
    </section>
    <div class="results-bar"><div><h2 id="result-count">${styles.length} 种风格</h2></div><p data-i18n="curated">每一种都有自己的布局、材质与组件语言。</p><div class="viewport"><span class="small-label" data-i18n="snapshot">预览</span>${viewportControls()}</div></div>
    <p class="sr-only" id="filter-status" role="status" aria-live="polite"></p>
    <section class="grid" id="style-grid" aria-label="风格目录 / Style catalog">${styles.map((style) => renderCard(style, viewports)).join("\n")}</section>
    <section class="empty" id="empty" hidden><h3 data-i18n="empty">换个条件，发现新的方向。</h3><p data-i18n="emptyHelp">试试更短的关键词，或放宽场景和明暗条件。</p><button type="button" class="button" data-reset data-i18n="reset">重置筛选</button></section>
    <section class="guide" id="how-to-use"><div><h2 data-i18n="guideTitle">选的是方向，不是固定模板。</h2><p data-i18n="guideBody">喜欢一个方向后，复制对应页面类型的提示词交给 Agent。保留它的视觉语言，让布局服务于你的真实产品。</p></div><div><h2 data-i18n="secondTitle">先缩小范围，再做选择。</h2><p data-i18n="secondBody">用场景和关键词找到候选；加入两到三种风格并排看；最后打开演示，体验具体控件与反馈。</p></div></section>
  </main>
  <footer class="footer" data-i18n="footer">Awesome Page Design · 让设计选择更明确</footer>
</div>
<aside class="selection-tray" id="selection-tray" aria-label="对比清单 / Shortlist" hidden><div class="selection-items" id="selected-items"></div><div class="selection-actions"><span class="selection-count" id="selection-count"></span><button type="button" id="clear-selection" class="text-button" data-i18n="clear">清空</button><button type="button" class="button" id="compare-open" disabled data-i18n="compareAction">比较风格</button></div></aside>
<dialog id="detail-dialog" aria-labelledby="detail-name" aria-describedby="detail-description">
  <header class="dialog-head"><h2><span id="detail-name"></span><small id="detail-subtitle"></small></h2><div class="dialog-tools">${languageControls()}<button type="button" class="text-button" data-close-dialog data-i18n="close">关闭</button></div></header>
  <div class="detail-layout"><div class="detail-preview"><div class="dialog-viewport">${viewportControls()}</div><img id="detail-image" data-preview-image data-style="${styles[0].id}" src="../styles/${styles[0].slug}/${styles[0].slug}.png" alt="风格预览" width="${viewportWidth}" height="${viewportHeight}"></div><div class="detail-content"><p id="detail-description"></p><dl class="detail-facts" id="detail-facts"></dl><h3 data-i18n="palette">颜色角色</h3><div class="palette-detail" id="detail-palette"></div><h3 data-i18n="task">你要做什么页面？</h3><div class="prompt-kinds" role="group" aria-label="提示词页面类型 / Prompt page type">${promptKinds.map((kind) => `<button type="button" data-prompt-kind="${kind.key}" aria-pressed="${kind.key === "full"}">${kind.labelZh}</button>`).join("")}</div><p class="kind-help" id="kind-help"></p><div class="detail-actions"><button type="button" class="button accent" id="copy-prompt" data-i18n="copy">复制此风格提示词</button><a class="button quiet" id="detail-live" href="../styles/${styles[0].slug}/${styles[0].slug}.html" target="_blank" rel="noopener noreferrer" data-i18n="live">打开演示</a></div><details class="prompt-disclosure" id="prompt-disclosure"><summary data-i18n="prompt">查看完整提示词</summary><pre id="prompt-output" tabindex="0" aria-label="完整提示词 / Full prompt"></pre></details></div></div>
</dialog>
<dialog id="compare-dialog" aria-labelledby="compare-title"><header class="dialog-head"><h2 id="compare-title" data-i18n="compareTitle">并排看，差异更清楚。</h2><div class="dialog-tools">${viewportControls()}<button type="button" class="text-button" data-close-dialog data-i18n="close">关闭</button></div></header><div class="compare-scroll"><div class="compare-grid" id="compare-grid"></div></div><p class="compare-note" data-i18n="compareNote">横向对照布局、气质和密度。示例里的品牌与内容可以替换，风格语言可以复用。</p></dialog>
<div class="toast" id="toast" role="status" hidden></div><div id="status" class="sr-only" aria-live="polite"></div>
<noscript>启用 JavaScript 以使用筛选、对比和提示词复制；你仍可点击截图打开演示。</noscript>
<script id="gallery-data" type="application/json">${payload}</script>
<script>${filterGalleryStyles.toString()}\n${unpackPrompt.toString()}\n(${initializeGallery.toString()})();</script>
</body>
</html>
`;
}

module.exports = { renderGallery };
