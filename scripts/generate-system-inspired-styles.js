#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const rootDir = path.resolve(__dirname, "..");
const stylesDir = path.join(rootDir, "skills", "awesome-page-design", "assets", "styles");

const stories = [
  {
    tag: "突发",
    title: "多模态智能体开始接管复杂办公流程",
    text: "最新一代 AI 工作流能够跨文档、表格、邮件和代码仓库执行连续任务，企业开始重新设计内部协作方式。",
    meta: "3 分钟前 · 12.4k 阅读",
  },
  {
    tag: "模型",
    title: "开源小模型在端侧推理场景快速普及",
    text: "手机、车机和工控设备开始部署轻量模型，离线能力、隐私保护和响应速度成为新的竞争焦点。",
    meta: "1 小时前 · 8.1k 阅读",
  },
  {
    tag: "应用",
    title: "AI 设计工具进入产品团队日常交付链路",
    text: "从需求拆解到原型生成，再到前端样式建议，AI 正在成为设计和开发之间的协同层。",
    meta: "2 小时前 · 7.6k 阅读",
  },
  {
    tag: "治理",
    title: "企业 AI 安全评估从合规走向持续监控",
    text: "模型评测、提示词审计、数据权限和输出追踪被纳入平台能力，安全团队开始建立长期治理机制。",
    meta: "4 小时前 · 5.9k 阅读",
  },
  {
    tag: "研究",
    title: "推理模型训练范式转向可验证中间步骤",
    text: "研究团队通过结构化轨迹、工具调用和自动验证提升模型可靠性，复杂任务成功率明显提高。",
    meta: "6 小时前 · 4.8k 阅读",
  },
  {
    tag: "商业",
    title: "AI 原生 SaaS 开始按结果而非席位收费",
    text: "从客服、销售到法务审核，越来越多产品将计费方式从用户数转向任务完成量和业务结果。",
    meta: "8 小时前 · 4.2k 阅读",
  },
];

const styles = [
  {
    version: "P",
    slug: "material-you",
    name: "Material You",
    summary: "动态色彩、圆润容器、层级 Surface 和大号行动按钮",
    mode: "亮",
    reference: "Material Design 3",
    source: "https://m3.material.io/",
    palette: {
      bg: "#fffbff",
      surface: "#ffffff",
      surface2: "#f3edf7",
      text: "#1d1b20",
      muted: "#625b71",
      accent: "#6750a4",
      accent2: "#7d5260",
      line: "#e7e0ec",
      soft: "#eaddff",
      success: "#386a20",
      warning: "#b3261e",
    },
    radius: "28px",
    smallRadius: "16px",
    shadow: "0 1px 2px rgba(29,27,32,0.08), 0 4px 10px rgba(29,27,32,0.08)",
    font: "'Roboto', 'Segoe UI', Arial, sans-serif",
    visualUse: "适合需要圆润、亲和、层级清晰的工具型或生活方式产品",
    bodyClass: "material",
    cssExtra: `
.material .hero { background: linear-gradient(135deg, #eaddff, #ffd8e4 48%, #d0bcff); border: 0; }
.material .hero::after { content: ""; position: absolute; right: 28px; top: 28px; width: 96px; height: 96px; border-radius: 50%; background: rgba(103,80,164,0.18); }
.material .nav, .material .card, .material .panel { border-radius: 28px; }
.material .button { border-radius: 999px; box-shadow: 0 3px 8px rgba(103,80,164,0.24); }
`,
  },
  {
    version: "Q",
    slug: "fluent-cloud",
    name: "Fluent Cloud",
    summary: "Windows 11 式中性色、Segoe 字体、命令栏和轻量景深",
    mode: "亮",
    reference: "Microsoft Fluent 2",
    source: "https://fluent2.microsoft.design/",
    palette: {
      bg: "#f5f5f5",
      surface: "rgba(255,255,255,0.82)",
      surface2: "#ffffff",
      text: "#242424",
      muted: "#616161",
      accent: "#0f6cbd",
      accent2: "#115ea3",
      line: "#d1d1d1",
      soft: "#ebf3fc",
      success: "#0e700e",
      warning: "#bc4b09",
    },
    radius: "12px",
    smallRadius: "6px",
    shadow: "0 8px 24px rgba(0,0,0,0.10)",
    font: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
    visualUse: "适合需要原生应用感、轻量透明层级和生产力气质的产品",
    bodyClass: "fluent",
    cssExtra: `
.fluent body, body.fluent { background: radial-gradient(circle at 15% 10%, #dcecff, transparent 32%), radial-gradient(circle at 90% 0%, #f6e7ff, transparent 28%), #f5f5f5; }
.fluent .nav, .fluent .card, .fluent .panel { backdrop-filter: blur(18px) saturate(1.4); }
.fluent .hero { background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(235,243,252,0.72)); }
.fluent .button { border-radius: 6px; }
`,
  },
  {
    version: "R",
    slug: "carbon-enterprise",
    name: "Carbon Enterprise",
    summary: "IBM Carbon 式灰阶层级、蓝色操作色、方正网格和数据密度",
    mode: "亮",
    reference: "IBM Carbon Design System",
    source: "https://carbondesignsystem.com/",
    palette: {
      bg: "#f4f4f4",
      surface: "#ffffff",
      surface2: "#e0e0e0",
      text: "#161616",
      muted: "#525252",
      accent: "#0f62fe",
      accent2: "#0043ce",
      line: "#c6c6c6",
      soft: "#edf5ff",
      success: "#24a148",
      warning: "#da1e28",
    },
    radius: "0",
    smallRadius: "0",
    shadow: "none",
    font: "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
    visualUse: "适合需要灰阶秩序、企业可信度和高信息密度的系统",
    bodyClass: "carbon",
    cssExtra: `
.carbon .topline { background: #161616; color: white; border-radius: 0; }
.carbon .nav, .carbon .card, .carbon .panel, .carbon .hero { border-radius: 0; box-shadow: none; }
.carbon .card, .carbon .panel { border-top: 2px solid #0f62fe; }
.carbon .button { border-radius: 0; }
`,
  },
  {
    version: "S",
    slug: "polaris-commerce",
    name: "Polaris Commerce",
    summary: "商家后台式资源列表、温和绿、清晰卡片和操作优先",
    mode: "亮",
    reference: "Shopify Polaris",
    source: "https://polaris.shopify.com/",
    palette: {
      bg: "#f6f6f7",
      surface: "#ffffff",
      surface2: "#f1f2f3",
      text: "#202223",
      muted: "#6d7175",
      accent: "#008060",
      accent2: "#005e46",
      line: "#d2d5d8",
      soft: "#e3f1df",
      success: "#007f5f",
      warning: "#b98900",
    },
    radius: "12px",
    smallRadius: "8px",
    shadow: "0 1px 0 rgba(0,0,0,0.05), 0 3px 10px rgba(0,0,0,0.06)",
    font: "-apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', sans-serif",
    visualUse: "适合电商后台、运营工具、商家服务等需要温和可信气质的产品",
    bodyClass: "polaris",
    cssExtra: `
.polaris .hero { background: linear-gradient(135deg, #ffffff, #e3f1df); }
.polaris .news { grid-template-columns: 1.2fr 1fr; }
.polaris .card { border-left: 4px solid #008060; }
.polaris .button { border-radius: 8px; }
`,
  },
  {
    version: "T",
    slug: "atlassian-workbench",
    name: "Atlassian Workbench",
    summary: "协作产品蓝、Lozenge 标签、任务流卡片和团队工作区",
    mode: "亮",
    reference: "Atlassian Design System",
    source: "https://atlassian.design/",
    palette: {
      bg: "#f7f8f9",
      surface: "#ffffff",
      surface2: "#f1f2f4",
      text: "#172b4d",
      muted: "#44546f",
      accent: "#0c66e4",
      accent2: "#0052cc",
      line: "#dfe1e6",
      soft: "#e9f2ff",
      success: "#216e4e",
      warning: "#ae2e24",
    },
    radius: "10px",
    smallRadius: "4px",
    shadow: "0 1px 1px rgba(9,30,66,0.12), 0 8px 16px rgba(9,30,66,0.12)",
    font: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    visualUse: "适合项目管理、协作工具、团队知识库等需要清晰状态标签的产品",
    bodyClass: "atlassian",
    cssExtra: `
.atlassian .hero { background: linear-gradient(135deg, #e9f2ff, #ffffff); }
.atlassian .tag { border-radius: 4px; text-transform: uppercase; font-size: 11px; letter-spacing: 0; }
.atlassian .card:hover { transform: translateY(-2px); box-shadow: 0 8px 16px rgba(9,30,66,0.16); }
.atlassian .button { border-radius: 4px; }
`,
  },
  {
    version: "U",
    slug: "gov-service",
    name: "Gov Service",
    summary: "政府服务式高对比、粗黑标题、蓝色链接和黄色焦点",
    mode: "亮",
    reference: "GOV.UK Design System",
    source: "https://design-system.service.gov.uk/",
    palette: {
      bg: "#ffffff",
      surface: "#ffffff",
      surface2: "#f4f8fb",
      text: "#0b0c0c",
      muted: "#484949",
      accent: "#1d70b8",
      accent2: "#0f385c",
      line: "#0b0c0c",
      soft: "#ffdd00",
      success: "#0f7a52",
      warning: "#ca3535",
    },
    radius: "0",
    smallRadius: "0",
    shadow: "none",
    font: "Arial, Helvetica, sans-serif",
    visualUse: "适合政务、公共服务、严肃信息查询等高可访问性场景",
    bodyClass: "gov",
    cssExtra: `
.gov .topline { background: #0b0c0c; color: #ffffff; border-radius: 0; border-bottom: 8px solid #1d70b8; }
.gov .nav, .gov .hero, .gov .card, .gov .panel { border-radius: 0; box-shadow: none; border: 2px solid #0b0c0c; }
.gov .hero { border-width: 0 0 4px 0; }
.gov .button { background: #00703c; border-radius: 0; box-shadow: 0 2px 0 #002d18; }
.gov .tag { background: #ffdd00; color: #0b0c0c; border-radius: 0; }
`,
  },
  {
    version: "V",
    slug: "spectrum-creative",
    name: "Spectrum Creative",
    summary: "Adobe Spectrum 式创作面板、靛蓝强调、柔和圆角和媒体网格",
    mode: "亮",
    reference: "Adobe Spectrum",
    source: "https://spectrum.adobe.com/",
    palette: {
      bg: "#f8f8f8",
      surface: "#ffffff",
      surface2: "#f1f1f1",
      text: "#292929",
      muted: "#6d6d6d",
      accent: "#5258e4",
      accent2: "#4046ca",
      line: "#d8d8d8",
      soft: "#eeeeff",
      success: "#12805c",
      warning: "#d7373f",
    },
    radius: "18px",
    smallRadius: "10px",
    shadow: "0 6px 20px rgba(0,0,0,0.08)",
    font: "'Adobe Clean', 'Segoe UI', Arial, sans-serif",
    visualUse: "适合设计工具、内容创作、素材平台等需要创作软件气质的产品",
    bodyClass: "spectrum",
    cssExtra: `
.spectrum .hero { background: linear-gradient(135deg, #ffffff, #eeeeff); }
.spectrum .visual { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 22px; }
.spectrum .visual span { aspect-ratio: 1; border-radius: 14px; background: linear-gradient(135deg, #5258e4, #ff7eb6); }
.spectrum .button { border-radius: 16px; }
`,
  },
  {
    version: "W",
    slug: "lightning-crm",
    name: "Lightning CRM",
    summary: "Salesforce Lightning 式浅灰应用壳、蓝色主操作、紧凑业务卡",
    mode: "亮",
    reference: "Salesforce Lightning Design System",
    source: "https://www.lightningdesignsystem.com/",
    palette: {
      bg: "#f3f2f2",
      surface: "#ffffff",
      surface2: "#fafaf9",
      text: "#080707",
      muted: "#706e6b",
      accent: "#0176d3",
      accent2: "#014486",
      line: "#dddbda",
      soft: "#eef4ff",
      success: "#2e844a",
      warning: "#ba0517",
    },
    radius: "6px",
    smallRadius: "4px",
    shadow: "0 2px 2px rgba(0,0,0,0.10)",
    font: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
    visualUse: "适合销售、客服、客户成功等需要紧凑业务状态表达的产品",
    bodyClass: "lightning",
    cssExtra: `
.lightning .topline { background: #0176d3; color: white; }
.lightning .hero { background: linear-gradient(135deg, #ffffff, #eef4ff); }
.lightning .card { border-top: 3px solid #0176d3; }
.lightning .button { border-radius: 4px; }
`,
  },
  {
    version: "X",
    slug: "primer-dev",
    name: "Primer Dev",
    summary: "GitHub Primer 式开发者界面、仓库卡片、边框分区和代码气质",
    mode: "亮",
    reference: "GitHub Primer",
    source: "https://primer.style/",
    palette: {
      bg: "#f6f8fa",
      surface: "#ffffff",
      surface2: "#f6f8fa",
      text: "#24292f",
      muted: "#57606a",
      accent: "#0969da",
      accent2: "#8250df",
      line: "#d0d7de",
      soft: "#ddf4ff",
      success: "#1a7f37",
      warning: "#cf222e",
    },
    radius: "8px",
    smallRadius: "6px",
    shadow: "0 8px 24px rgba(140,149,159,0.20)",
    font: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
    visualUse: "适合开发者工具、API 平台、开源社区等代码气质强的产品",
    bodyClass: "primer",
    cssExtra: `
.primer .topline { background: #24292f; color: white; }
.primer .tag { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
.primer .card::before { content: ""; width: 10px; height: 10px; background: #8250df; border-radius: 50%; position: absolute; top: 22px; right: 22px; }
.primer .button { border-radius: 6px; }
`,
  },
  {
    version: "Y",
    slug: "ant-pro",
    name: "Ant Pro",
    summary: "Ant Design 式企业中台、蓝色主色、细边框表格和信息卡片",
    mode: "亮",
    reference: "Ant Design",
    source: "https://ant.design/",
    palette: {
      bg: "#f5f5f5",
      surface: "#ffffff",
      surface2: "#fafafa",
      text: "rgba(0,0,0,0.88)",
      muted: "rgba(0,0,0,0.45)",
      accent: "#1677ff",
      accent2: "#0958d9",
      line: "#f0f0f0",
      soft: "#e6f4ff",
      success: "#52c41a",
      warning: "#ff4d4f",
    },
    radius: "8px",
    smallRadius: "6px",
    shadow: "0 6px 16px rgba(0,0,0,0.08)",
    font: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    visualUse: "适合企业中台、B 端 SaaS、数据看板等需要中性稳健气质的产品",
    bodyClass: "ant",
    cssExtra: `
.ant .hero { background: linear-gradient(135deg, #ffffff, #e6f4ff); }
.ant .stats { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.ant .card { border-top: 1px solid #f0f0f0; }
.ant .button { border-radius: 6px; }
`,
  },
];

function htmlFor(style) {
  const p = style.palette;
  const storyCards = stories
    .slice(1)
    .map(
      (item) => `<article class="card">
        <span class="tag">${item.tag}</span>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
        <div class="meta">${item.meta}</div>
      </article>`
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AI Pulse - 版本${style.version}：${style.name}</title>
<style>
* { box-sizing: border-box; }
:root {
  --bg: ${p.bg};
  --surface: ${p.surface};
  --surface-2: ${p.surface2};
  --text: ${p.text};
  --muted: ${p.muted};
  --accent: ${p.accent};
  --accent-2: ${p.accent2};
  --line: ${p.line};
  --soft: ${p.soft};
  --success: ${p.success};
  --warning: ${p.warning};
  --radius: ${style.radius};
  --radius-sm: ${style.smallRadius};
  --shadow: ${style.shadow};
  --font: ${style.font};
}
html { scroll-behavior: smooth; }
body {
  margin: 0;
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font);
  line-height: 1.55;
}
a { color: inherit; text-decoration: none; }
.page { max-width: 1240px; margin: 0 auto; padding: 24px; }
.topline {
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
  min-height: 56px; padding: 0 20px; margin-bottom: 18px;
  background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius);
  box-shadow: var(--shadow);
}
.brand { display: flex; align-items: center; gap: 10px; font-weight: 750; }
.logo {
  width: 34px; height: 34px; display: grid; place-items: center;
  background: var(--accent); color: white; border-radius: var(--radius-sm); font-size: 13px;
}
.nav { display: flex; gap: 8px; align-items: center; color: var(--muted); font-size: 14px; }
.nav span { padding: 7px 10px; border-radius: var(--radius-sm); }
.nav .active { color: var(--accent); background: var(--soft); }
.hero {
  position: relative; overflow: hidden; padding: 42px; margin-bottom: 18px;
  background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius);
  box-shadow: var(--shadow);
}
.eyebrow { display: inline-flex; align-items: center; gap: 8px; color: var(--accent); font-size: 13px; font-weight: 700; margin-bottom: 16px; }
.eyebrow::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: var(--warning); }
h1 { max-width: 820px; margin: 0; font-size: clamp(34px, 5vw, 68px); line-height: 1.02; letter-spacing: 0; }
.lead { max-width: 700px; margin: 18px 0 0; color: var(--muted); font-size: 17px; }
.actions { display: flex; gap: 12px; margin-top: 26px; flex-wrap: wrap; }
.button {
  border: 0; background: var(--accent); color: white; padding: 11px 18px;
  font: inherit; font-weight: 700; cursor: pointer;
}
.button.secondary { background: var(--surface-2); color: var(--text); border: 1px solid var(--line); }
.visual { display: none; }
.stats {
  display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; margin-bottom: 18px;
}
.stat {
  background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius);
  padding: 18px; box-shadow: var(--shadow);
}
.stat b { display: block; font-size: 28px; line-height: 1; color: var(--accent); margin-bottom: 6px; }
.stat span { color: var(--muted); font-size: 13px; }
.content { display: grid; grid-template-columns: minmax(0, 1fr) 340px; gap: 18px; align-items: start; }
.news { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
.card, .panel {
  position: relative; background: var(--surface); border: 1px solid var(--line);
  border-radius: var(--radius); padding: 22px; box-shadow: var(--shadow);
}
.tag {
  display: inline-flex; align-items: center; padding: 4px 9px; margin-bottom: 12px;
  background: var(--soft); color: var(--accent); border-radius: 999px; font-size: 12px; font-weight: 750;
}
h3 { margin: 0 0 10px; font-size: 20px; line-height: 1.25; letter-spacing: 0; }
.card p, .panel p { margin: 0; color: var(--muted); font-size: 14px; }
.meta { margin-top: 16px; color: var(--muted); font-size: 12px; }
.panel h2 { margin: 0 0 18px; font-size: 18px; }
.trend { display: grid; grid-template-columns: 32px 1fr; gap: 12px; padding: 12px 0; border-top: 1px solid var(--line); }
.trend:first-of-type { border-top: 0; }
.rank { color: var(--accent); font-weight: 800; }
.trend strong { display: block; font-size: 14px; }
.trend span { color: var(--muted); font-size: 12px; }
.footer { color: var(--muted); font-size: 13px; padding: 24px 4px 6px; }
${style.cssExtra}
@media (max-width: 900px) {
  .topline { align-items: flex-start; flex-direction: column; padding: 16px; }
  .nav { flex-wrap: wrap; }
  .hero { padding: 28px; }
  .stats, .content, .news { grid-template-columns: 1fr; }
}
</style>
</head>
<body class="${style.bodyClass}">
  <main class="page">
    <header class="topline">
      <div class="brand"><div class="logo">AI</div><span>AI Pulse · ${style.name}</span></div>
      <nav class="nav"><span class="active">Today</span><span>Models</span><span>Research</span><span>Policy</span><span>Tools</span></nav>
    </header>

    <section class="hero">
      <div class="eyebrow">${style.reference} inspired template</div>
      <h1>${stories[0].title}</h1>
      <p class="lead">${stories[0].text}</p>
      <div class="actions">
        <button class="button">阅读头条</button>
        <button class="button secondary">查看设计系统</button>
      </div>
      <div class="visual"><span></span><span></span><span></span></div>
    </section>

    <section class="stats">
      <div class="stat"><b>128</b><span>今日资讯</span></div>
      <div class="stat"><b>47</b><span>活跃模型</span></div>
      <div class="stat"><b>312</b><span>本周论文</span></div>
      <div class="stat"><b>24k</b><span>热门讨论</span></div>
    </section>

    <section class="content">
      <div class="news">
${storyCards}
      </div>
      <aside class="panel">
        <h2>热门趋势</h2>
        <div class="trend"><div class="rank">01</div><div><strong>Agent 工作流平台进入采购清单</strong><span>24.5k 讨论</span></div></div>
        <div class="trend"><div class="rank">02</div><div><strong>端侧模型生态加速分化</strong><span>18.3k 讨论</span></div></div>
        <div class="trend"><div class="rank">03</div><div><strong>AI 治理工具成为基础设施</strong><span>15.1k 讨论</span></div></div>
        <div class="trend"><div class="rank">04</div><div><strong>设计系统开始接入生成式规范</strong><span>12.7k 讨论</span></div></div>
      </aside>
    </section>

    <footer class="footer">Version ${style.version} · ${style.name} · Web Style Templates</footer>
  </main>
</body>
</html>
`;
}

function mdFor(style) {
  const p = style.palette;
  return `# ${style.name} 设计系统文档

> 基于 \`${style.slug}\` 的网站视觉风格提示。参考来源：${style.reference}（${style.source}）。本文件用于学习和迁移设计语言，不复制任何品牌页面或商标资产。

---

## 重要使用原则

本文件提供的是视觉风格提示，不是固定页面布局方案。示例 HTML 的页面结构仅用于统一展示和截图，不应在真实项目中照搬。后续开发时，应根据用户需求、业务流程、内容优先级和设备场景重新设计页面布局；可复用的是配色、字体、圆角、边框、阴影、质感、状态和动效等视觉语言。

---

## 1. 风格定义与核心精神

**${style.name}** 的核心是：${style.summary}。

- 适合将成熟设计系统的视觉秩序迁移到自有产品中
- 强调可复用的颜色、字体、间距、组件和状态规则
- 保留参考系统的气质，但使用中性的 AI Pulse 示例内容
- 后续项目应替换品牌、图标和真实业务结构

## 2. 色彩体系

| 角色 | 变量 | 色值 | 用途 |
|---|---|---|---|
| 页面背景 | \`--bg\` | \`${p.bg}\` | 全局背景 |
| 主 Surface | \`--surface\` | \`${p.surface}\` | 卡片、面板、导航 |
| 次级 Surface | \`--surface-2\` | \`${p.surface2}\` | 弱背景、按钮、分区 |
| 主文字 | \`--text\` | \`${p.text}\` | 标题和正文 |
| 辅助文字 | \`--muted\` | \`${p.muted}\` | 摘要、时间、说明 |
| 主操作色 | \`--accent\` | \`${p.accent}\` | 按钮、链接、重点数字 |
| 深强调色 | \`--accent-2\` | \`${p.accent2}\` | hover、深色强调 |
| 分割线 | \`--line\` | \`${p.line}\` | 边框和分隔 |
| 弱强调背景 | \`--soft\` | \`${p.soft}\` | 标签、选中态、浅色区域 |

## 3. 排版体系

- 字体栈：\`${style.font}\`
- Hero 标题：34-68px，行高 1.02，强调第一屏识别度
- 卡片标题：20px / 1.25，用于列表扫描
- 正文：14-17px，保持工具型页面可读性
- 标签和 meta：12-13px，承担信息分类而非装饰

## 4. 边框 / 圆角 / 阴影体系

| 项目 | 值 | 用法 |
|---|---|---|
| 大圆角 | \`${style.radius}\` | Hero、卡片、面板 |
| 小圆角 | \`${style.smallRadius}\` | Logo、标签、按钮 |
| 阴影 | \`${style.shadow}\` | 主要容器深度 |
| 边框 | \`1px solid var(--line)\` | 所有可分组模块 |

## 5. 装饰元素 / 交互细节

- 主按钮使用 \`--accent\`，次按钮使用 \`--surface-2\`
- 标签使用 \`--soft\` + \`--accent\`，保证分类可扫读
- 卡片 hover 可按项目需要增加轻微上移、边框强调或背景变化
- 避免过度复刻参考系统的品牌符号，仅迁移颜色、字体、质感和状态原则

## 6. 视觉节奏 / 间距提示（非固定布局）

> 以下布局内容仅用于解释示例 HTML 如何展示该风格，不是后续项目必须采用的页面结构。真实项目应重新做信息架构和布局设计。

- 本文件不规定真实项目的页面布局
- 示例 HTML 的模块顺序、栏宽、网格和响应式仅用于预览截图
- 可参考的是该风格的密度倾向、留白气质和组件间距感
- 真实项目应根据用户任务、业务流程、内容优先级和设备场景重新设计布局
- 如果需要更紧凑，可降低卡片内边距；如果需要品牌展示，可增加留白和标题层级

## 7. 响应式策略

| 断点 | 行为 |
|---|---|
| >900px | 顶部导航、Hero、统计行、双列内容同时展示 |
| <=900px | 导航换行，统计卡和内容流改为单列 |
| <=640px | 可进一步压缩 padding、隐藏低优先级 meta |

## 8. 组件速查表

| 组件 | 结构 | 视觉规则 |
|---|---|---|
| Topline | Logo + 产品名 + 导航 | 使用 Surface、边框和系统圆角 |
| Hero | Eyebrow + H1 + Lead + Actions | 最大化风格识别 |
| Stat | 数字 + 标签 | 强调色数字，辅助色标签 |
| News Card | 标签 + 标题 + 摘要 + meta | 同一信息结构适配不同风格 |
| Panel | 标题 + 趋势列表 | 右侧辅助信息区 |

## 9. CSS 变量 / 代码片段

\`\`\`css
:root {
  --bg: ${p.bg};
  --surface: ${p.surface};
  --surface-2: ${p.surface2};
  --text: ${p.text};
  --muted: ${p.muted};
  --accent: ${p.accent};
  --accent-2: ${p.accent2};
  --line: ${p.line};
  --soft: ${p.soft};
  --radius: ${style.radius};
  --radius-sm: ${style.smallRadius};
}
\`\`\`

## 10. 适用 / 不适用场景

适用：
- ${style.visualUse}
- 需要快速建立成熟视觉秩序的中后台或内容产品
- 希望从公开设计系统中借鉴风格原则的项目

不适用：
- 必须高度艺术化、强品牌营销的首页
- 需要完全遵循某品牌官方规范的商业项目
- 没有能力维护一致组件和状态规则的小型一次性页面

## 11. 与其他风格对比

- 相比已有 A-O 风格，本风格更贴近成熟产品设计系统
- 重点不是视觉噱头，而是可落地的组件规则和页面秩序
- 可以作为真实项目的基础风格，再叠加行业品牌资产

## 12. 变体建议

- 暗色版：保留 accent，反转 surface 层级
- 行业版：替换标签色和统计色，布局仍按具体业务重新设计
- 高密度版：降低 padding 到 16px，卡片标题改 18px
- 营销版：放大 Hero，减少右侧面板信息密度

## 13. 动效 / 微交互

- 按钮 hover：背景切换到 \`--accent-2\`
- 卡片 hover：轻微阴影或边框加深
- 选中态：使用 \`--soft\` 作为背景
- 焦点态：使用 \`--accent\` 外描边，政府/医疗类项目需额外强化可访问性

## 14. 实施指南 / 注意事项

- 先抽取 CSS 变量，再开发组件
- 不要混入其他风格的圆角、阴影和标签风格
- 真实项目中应替换 AI Pulse 内容和导航结构
- 如果使用参考系统名称，只能作为内部说明，不应作为对外品牌宣称
- 优先保证文字对比度和键盘焦点可见
`;
}

function main() {
  fs.mkdirSync(stylesDir, { recursive: true });

  for (const style of styles) {
    const dirName = `version-${style.version.toLowerCase()}-${style.slug}`;
    const dir = path.join(stylesDir, dirName);
    fs.mkdirSync(dir, { recursive: true });

    const base = `version-${style.version.toLowerCase()}-${style.slug}`;
    fs.writeFileSync(path.join(dir, `${base}.html`), htmlFor(style));
    console.log(`created ${dirName}`);
  }

  execFileSync(process.execPath, [path.join(__dirname, "localize-english-content.js")], {
    stdio: "inherit",
  });
}

main();
