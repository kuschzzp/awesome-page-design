#!/usr/bin/env node

const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const rootDir = path.resolve(__dirname, "..");
const skillDir = path.join(rootDir, "skills", "awesome-page-design");
const stylesDir = path.join(skillDir, "assets", "styles");
const layoutsDir = path.join(skillDir, "assets", "layouts");
const outputDir = path.join(skillDir, "assets", "previews");
const chromePath =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const viewportWidth = Number(process.env.PREVIEW_WIDTH || 1440);
const viewportHeight = Number(process.env.PREVIEW_HEIGHT || 1200);
const chromeWait = Number(process.env.PREVIEW_WAIT || 5000);

const styleCatalog = {
  "version-a-classic": {
    version: "A",
    name: "Classic News",
    zhName: "经典新闻",
    bestFor: "editorial sites, authority content, calm product pages",
    zhBestFor: "新闻、内容站、权威信息页",
  },
  "version-b-grid": {
    version: "B",
    name: "Card Grid",
    zhName: "卡片网格",
    bestFor: "dashboards, catalogs, overview pages",
    zhBestFor: "仪表盘、目录页、概览页",
  },
  "version-c-feed": {
    version: "C",
    name: "Feed Layout",
    zhName: "信息流布局",
    bestFor: "feeds, communities, updates, article streams",
    zhBestFor: "信息流、社区、动态、文章流",
  },
  "version-d-bento": {
    version: "D",
    name: "Bento Grid",
    zhName: "Bento 网格",
    bestFor: "product showcases, Apple-like overview pages",
    zhBestFor: "产品展示、Apple 风概览页",
  },
  "version-e-glass": {
    version: "E",
    name: "Glassmorphism",
    zhName: "毛玻璃",
    bestFor: "immersive dark landing pages, AI products",
    zhBestFor: "沉浸式暗色落地页、AI 产品",
  },
  "version-f-brutalism": {
    version: "F",
    name: "Neo-Brutalism",
    zhName: "新粗野主义",
    bestFor: "bold campaigns, indie products, playful utilities",
    zhBestFor: "强品牌活动、独立产品、趣味工具",
  },
  "version-g-aurora": {
    version: "G",
    name: "Aurora Gradient",
    zhName: "极光渐变",
    bestFor: "futuristic products, AI tools, premium dark experiences",
    zhBestFor: "未来感产品、AI 工具、高级暗色体验",
  },
  "version-h-y2k": {
    version: "H",
    name: "Retro Y2K",
    zhName: "复古 Y2K",
    bestFor: "music, fashion, youth culture, playful campaigns",
    zhBestFor: "音乐、潮流、青年文化、活动页",
  },
  "version-i-swiss": {
    version: "I",
    name: "Swiss Editorial",
    zhName: "瑞士编辑风",
    bestFor: "portfolios, cultural sites, design studios, serious content",
    zhBestFor: "作品集、文化机构、严肃内容",
  },
  "version-j-terminal": {
    version: "J",
    name: "Terminal Hacker",
    zhName: "黑客终端",
    bestFor: "developer tools, CLI products, security, open source",
    zhBestFor: "开发者工具、CLI、安全、开源",
  },
  "version-k-clay": {
    version: "K",
    name: "Claymorphism",
    zhName: "软泥拟态",
    bestFor: "friendly SaaS, education, wellness, approachable tools",
    zhBestFor: "教育、健康、友好型 SaaS",
  },
  "version-l-cutealism": {
    version: "L",
    name: "Cute-alism",
    zhName: "可爱主义",
    bestFor: "playful brands, creator tools, youth products",
    zhBestFor: "玩法品牌、创作者工具、年轻产品",
  },
  "version-m-stark": {
    version: "M",
    name: "Resonant Stark",
    zhName: "共鸣极简",
    bestFor: "premium dark portfolios, art, high-end product teasers",
    zhBestFor: "高级暗色作品集、艺术、精品预告页",
  },
  "version-n-skeuomorph": {
    version: "N",
    name: "Light Skeuomorphism",
    zhName: "轻拟物",
    bestFor: "Apple-like tools, device apps, tactile product UI",
    zhBestFor: "Apple 风工具、设备应用、触感 UI",
  },
  "version-o-scribble": {
    version: "O",
    name: "Human Scribble",
    zhName: "手写涂鸦",
    bestFor: "workshops, education, human-centered notes, maker pages",
    zhBestFor: "工作坊、教育、Maker、手写笔记",
  },
  "version-p-material-you": {
    version: "P",
    name: "Material You",
    zhName: "Material You",
    bestFor: "Android-like apps, friendly product UI, general-purpose tools",
    zhBestFor: "Android 风应用、通用工具、生活方式产品",
  },
  "version-q-fluent-cloud": {
    version: "Q",
    name: "Fluent Cloud",
    zhName: "Fluent 云应用",
    bestFor: "Microsoft-like productivity tools, cloud apps",
    zhBestFor: "生产力工具、云控制台、桌面应用",
  },
  "version-r-carbon-enterprise": {
    version: "R",
    name: "Carbon Enterprise",
    zhName: "Carbon 企业",
    bestFor: "serious enterprise software, analytics, dense operations UI",
    zhBestFor: "企业软件、数据平台、工业系统",
  },
  "version-s-polaris-commerce": {
    version: "S",
    name: "Polaris Commerce",
    zhName: "Polaris 商务",
    bestFor: "merchant tools, ecommerce admin, business workflows",
    zhBestFor: "电商后台、商家工具、运营系统",
  },
  "version-t-atlassian-workbench": {
    version: "T",
    name: "Atlassian Workbench",
    zhName: "Atlassian 工作台",
    bestFor: "collaboration tools, planning apps, team dashboards",
    zhBestFor: "协作工具、项目管理、团队看板",
  },
  "version-u-gov-service": {
    version: "U",
    name: "Gov Service",
    zhName: "政府服务",
    bestFor: "public service, legal, forms, accessibility-first sites",
    zhBestFor: "政务、公共服务、法律、表单",
  },
  "version-v-spectrum-creative": {
    version: "V",
    name: "Spectrum Creative",
    zhName: "Spectrum 创意",
    bestFor: "creative software, media tools, asset managers",
    zhBestFor: "创作软件、素材管理、媒体工具",
  },
  "version-w-lightning-crm": {
    version: "W",
    name: "Lightning CRM",
    zhName: "Lightning CRM",
    bestFor: "CRM, sales tools, customer operations",
    zhBestFor: "CRM、销售、客服、客户运营",
  },
  "version-x-primer-dev": {
    version: "X",
    name: "Primer Dev",
    zhName: "Primer 开发者",
    bestFor: "developer platforms, docs, repo browsers, issue trackers",
    zhBestFor: "开发者平台、文档、仓库、Issue",
  },
  "version-y-ant-pro": {
    version: "Y",
    name: "Ant Pro",
    zhName: "Ant Pro",
    bestFor: "enterprise admin, data tables, management consoles",
    zhBestFor: "企业中台、管理后台、数据表格",
  },
};

const layoutCatalog = [
  {
    id: "L01",
    slug: "l01-dense-admin-dashboard",
    name: "Dense Admin Dashboard",
    zhName: "密集管理后台",
    bestFor: "operations dashboards, KPI monitoring, data-heavy internal tools",
    zhBestFor: "运营仪表盘、KPI 监控、数据密集型后台",
    pattern: "dashboard",
  },
  {
    id: "L02",
    slug: "l02-saas-landing-page",
    name: "SaaS Landing Page",
    zhName: "SaaS 落地页",
    bestFor: "product marketing, conversion pages, feature-led websites",
    zhBestFor: "产品官网、转化落地页、功能导向网站",
    pattern: "landing",
  },
  {
    id: "L03",
    slug: "l03-ai-copilot-workspace",
    name: "AI Copilot Workspace",
    zhName: "AI Copilot 工作台",
    bestFor: "AI assistants, writing tools, review workflows, command centers",
    zhBestFor: "AI 助手、写作工具、审核流程、任务工作台",
    pattern: "copilot",
  },
  {
    id: "L04",
    slug: "l04-developer-docs-portal",
    name: "Developer Docs Portal",
    zhName: "开发者文档门户",
    bestFor: "API docs, SDK guides, developer platforms, technical content",
    zhBestFor: "API 文档、SDK 指南、开发者平台、技术内容",
    pattern: "docs",
  },
  {
    id: "L05",
    slug: "l05-editorial-news-homepage",
    name: "Editorial News Homepage",
    zhName: "编辑部新闻首页",
    bestFor: "newsrooms, magazines, research publishing, content hubs",
    zhBestFor: "新闻站、杂志、研究发布、内容中心",
    pattern: "news",
  },
  {
    id: "L06",
    slug: "l06-ecommerce-admin-console",
    name: "Ecommerce Admin Console",
    zhName: "电商管理控制台",
    bestFor: "merchant tools, order management, inventory and fulfillment UI",
    zhBestFor: "商家工具、订单管理、库存和履约界面",
    pattern: "commerce",
  },
  {
    id: "L07",
    slug: "l07-crm-sales-workspace",
    name: "CRM Sales Workspace",
    zhName: "CRM 销售工作台",
    bestFor: "sales pipelines, account views, task queues, customer timelines",
    zhBestFor: "销售漏斗、客户详情、任务队列、客户时间线",
    pattern: "crm",
  },
  {
    id: "L08",
    slug: "l08-analytics-command-center",
    name: "Analytics Command Center",
    zhName: "分析指挥中心",
    bestFor: "metrics exploration, BI dashboards, anomaly and trend analysis",
    zhBestFor: "指标探索、BI 仪表盘、异常和趋势分析",
    pattern: "analytics",
  },
  {
    id: "L09",
    slug: "l09-portfolio-case-study",
    name: "Portfolio Case Study",
    zhName: "作品集案例页",
    bestFor: "designer portfolios, agency case studies, product storytelling",
    zhBestFor: "设计师作品集、机构案例、产品叙事页",
    pattern: "portfolio",
  },
  {
    id: "L10",
    slug: "l10-settings-console",
    name: "Settings Console",
    zhName: "设置控制台",
    bestFor: "admin settings, team permissions, billing and security pages",
    zhBestFor: "后台设置、团队权限、账单和安全页面",
    pattern: "settings",
  },
  {
    id: "L11",
    slug: "l11-onboarding-wizard",
    name: "Onboarding Wizard",
    zhName: "引导流程",
    bestFor: "setup flows, product activation, guided data collection",
    zhBestFor: "初始化设置、产品激活、分步信息收集",
    pattern: "wizard",
  },
  {
    id: "L12",
    slug: "l12-marketplace-catalog",
    name: "Marketplace Catalog",
    zhName: "市场目录",
    bestFor: "plugin stores, app catalogs, template libraries, resource discovery",
    zhBestFor: "插件市场、应用目录、模板库、资源发现",
    pattern: "marketplace",
  },
  {
    id: "L13",
    slug: "l13-admin-overview-command-center",
    name: "Admin Overview Command Center",
    zhName: "后台总览指挥台",
    bestFor: "executive admin homepages, SaaS consoles, cross-team status overview",
    zhBestFor: "后台首页、SaaS 控制台、跨团队状态总览",
    pattern: "admin-overview",
  },
  {
    id: "L14",
    slug: "l14-master-detail-admin-table",
    name: "Master Detail Admin Table",
    zhName: "主从详情管理表格",
    bestFor: "resource management, user lists, approval queues, database-like admin UI",
    zhBestFor: "资源管理、用户列表、审批队列、数据库式后台",
    pattern: "master-detail",
  },
  {
    id: "L15",
    slug: "l15-operations-timeline-console",
    name: "Operations Timeline Console",
    zhName: "运营时间线控制台",
    bestFor: "incident operations, deployment tracking, fulfillment and support workflows",
    zhBestFor: "事件运营、发布追踪、履约和客服流程",
    pattern: "ops-timeline",
  },
  {
    id: "L16",
    slug: "l16-personal-portfolio-home",
    name: "Personal Portfolio Home",
    zhName: "个人作品集首页",
    bestFor: "designers, engineers, consultants, personal brand websites",
    zhBestFor: "设计师、工程师、顾问、个人品牌网站",
    pattern: "personal-portfolio",
  },
  {
    id: "L17",
    slug: "l17-personal-writing-home",
    name: "Personal Writing Home",
    zhName: "个人写作主页",
    bestFor: "blogs, newsletters, independent researchers, creator homepages",
    zhBestFor: "博客、Newsletter、独立研究者、创作者主页",
    pattern: "personal-writing",
  },
  {
    id: "L18",
    slug: "l18-corporate-homepage",
    name: "Corporate Homepage",
    zhName: "企业官网首页",
    bestFor: "B2B companies, professional services, corporate presence sites",
    zhBestFor: "B2B 企业、专业服务、企业形象官网",
    pattern: "corporate-home",
  },
  {
    id: "L19",
    slug: "l19-corporate-services-site",
    name: "Corporate Services Site",
    zhName: "企业服务官网",
    bestFor: "agencies, consultancies, solution providers, service-led companies",
    zhBestFor: "机构、咨询公司、解决方案服务商、服务型企业",
    pattern: "corporate-services",
  },
  {
    id: "L20",
    slug: "l20-enterprise-product-overview",
    name: "Enterprise Product Overview",
    zhName: "企业产品介绍页",
    bestFor: "platform websites, enterprise product suites, trust-heavy product pages",
    zhBestFor: "平台官网、企业产品矩阵、高信任产品介绍页",
    pattern: "enterprise-product",
  },
];

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

function findStyleHtmlFiles() {
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
        .map((file) => path.join(styleDir, file));
    })
    .sort((a, b) => a.localeCompare(b, "en"));
}

function renderMetric(label, value, delta = "+4.8%") {
  return `<div class="metric"><span>${label}</span><strong>${value}</strong><em>${delta}</em></div>`;
}

function renderTable(rows) {
  return `<table>
    <thead><tr><th>Story</th><th>Owner</th><th>Status</th><th>Impact</th></tr></thead>
    <tbody>${rows
      .map((row) => `<tr><td>${row[0]}</td><td>${row[1]}</td><td><span class="pill">${row[2]}</span></td><td>${row[3]}</td></tr>`)
      .join("")}</tbody>
  </table>`;
}

function renderLayoutBodyV2(layout) {
  const newsRows = [
    ["Morning Brief", "Maya Chen", "Published", "842K"],
    ["Energy Talks", "Eli Brooks", "Review", "118K"],
    ["Policy Tracker", "Noah Park", "Draft", "76K"],
    ["Subscriber Note", "Ava Lin", "Queued", "42K"],
    ["Market Wrap", "Iris Cole", "Scheduled", "91K"],
  ];

  switch (layout.pattern) {
    case "dashboard":
      return `<aside class="dash-rail"><b>ID</b><span>01</span><span>Desk</span><span>Pulse</span><span>Risk</span><span>Ops</span></aside>
      <main class="dash-board">
        <header class="dash-status"><p><strong>${layout.id}</strong> ${layout.name}</p><p>Live newsroom operations console</p><button>Export</button></header>
        <section class="dash-kpis">${renderMetric("Stories live", "128", "+18")}${renderMetric("Review queue", "34", "-7")}${renderMetric("SLA health", "98%", "stable")}${renderMetric("Paid lift", "7.4%", "+1.2%")}${renderMetric("Alerts", "9", "open")}</section>
        <section class="dash-main"><div class="panel dash-table"><h2>Priority workstream</h2>${renderTable(newsRows)}</div><aside class="panel alert-feed"><h2>Alert feed</h2><p>Energy story velocity exceeded threshold.</p><p>Subscriber edition needs legal review.</p><p>Politics desk has three stale drafts.</p><p>Homepage slot opens in 22 minutes.</p></aside></section>
      </main>`;
    case "landing":
      return `<main class="saas-page">
        <nav class="saas-nav"><b>DailySignal</b><span>Product</span><span>Workflows</span><span>Pricing</span><button>Start trial</button></nav>
        <section class="saas-hero"><div><p class="eyebrow">${layout.id}</p><h1>Run the morning news business from one clear signal layer.</h1><p>DailySignal brings editorial decisions, reader intent, and subscriber revenue into one launch-ready workspace.</p><div class="hero-actions"><button>Book demo</button><button class="secondary">View sample</button></div><div class="hero-stats"><span><strong>42%</strong> faster homepage decisions</span><span><strong>18k</strong> live reader signals</span><span><strong>99.9%</strong> edition uptime</span></div></div><aside class="product-shot"><div class="shot-top"><b>Editorial pulse</b><span>Live</span></div><div class="shot-grid"><i>Review</i><i>Revenue</i><i>Audience</i><i>Risk</i></div><div class="shot-chart"><i></i><i></i><i></i><i></i></div></aside></section>
        <section class="logo-strip"><span>Newsroom</span><span>Analytics</span><span>Revenue</span><span>Editorial AI</span></section>
      </main>`;
    case "copilot":
      return `<main class="ai-workspace">
        <aside class="thread-list"><b>AI Desk</b><p class="active">Morning policy briefing</p><p>Market explainer</p><p>Subscriber Q&A</p><p>Source check</p></aside>
        <section class="writing-canvas"><p class="eyebrow">${layout.id}</p><h1>Morning policy briefing</h1><div class="doc-block large"></div><div class="doc-block"></div><div class="doc-block short"></div><div class="source-tray"><span>Reuters</span><span>Federal register</span><span>Internal notes</span></div></section>
        <aside class="copilot-panel"><h2>Copilot</h2><div class="chat user">Tighten the lead and flag unsupported claims.</div><div class="chat ai">Lead revised. One market statistic needs a source.</div><button>Apply revision</button></aside>
      </main>`;
    case "docs":
      return `<header class="docs-top"><b>Awesome Page Design</b><input value="Search docs"><button>GitHub</button></header>
      <main class="docs-shell"><aside class="docs-tree"><b>Guides</b><a>Quickstart</a><a>Install with npx</a><a class="active">Layout frameworks</a><a>Style systems</a><a>Preview server</a></aside>
      <article class="docs-content"><p class="eyebrow">${layout.id}</p><h1>Compose a daily news interface</h1><p>Choose one visual style, choose one layout framework, then adapt the structure to the product's real states and content density.</p><pre><code>Use awesome-page-design layout framework: ${layout.id} - ${layout.name}</code></pre><h2>Implementation checklist</h2><ol><li>Map navigation and primary task zones.</li><li>Define empty, loading, and error states.</li><li>Keep sample copy out of production UI.</li></ol></article>
      <aside class="docs-anchor"><b>On this page</b><a>Overview</a><a>Prompt</a><a>Checklist</a><a>States</a></aside></main>`;
    case "news":
      return `<main class="newspaper">
        <header class="paper-head"><span>Tuesday, May 19</span><b>The Daily Index</b><span>Global Edition</span></header>
        <section class="paper-grid"><article class="paper-lead"><p class="eyebrow">${layout.id}</p><h1>Markets climb as energy talks restart before the closing bell.</h1><p>Editors are tracking investor reaction, policy risk, and reader sentiment through the morning cycle.</p><div class="byline">By Maya Chen and Noah Park · 8 min read</div></article><article class="paper-photo"><span>FIELD REPORT</span></article><aside class="paper-briefs"><h2>Latest</h2><p><b>Climate</b> desk publishes resilience tracker.</p><p><b>Technology</b> stocks recover after guidance update.</p><p><b>Opinion</b> team prepares subscriber forum.</p><p><b>Markets</b> futures open higher in Asia.</p></aside></section>
        <section class="paper-columns"><article><span>01</span><h2>Analysis</h2><p>Regional desks compare price movement against the policy calendar.</p></article><article><span>02</span><h2>Economy</h2><p>Central bank watchers expect a narrow signal window.</p></article><article><span>03</span><h2>Culture</h2><p>Readers are shifting to shorter morning briefings.</p></article><article><span>04</span><h2>World</h2><p>Trade negotiators extend talks into the evening.</p></article></section>
      </main>`;
    case "commerce":
      return `<main class="commerce-console">
        <header class="commerce-top"><div><p class="eyebrow">${layout.id}</p><h1>Daily edition store operations</h1></div><button>Create bundle</button></header>
        <aside class="commerce-filters"><b>Filters</b><label><input type="checkbox" checked> Delayed fulfillment</label><label><input type="checkbox"> Low inventory</label><label><input type="checkbox" checked> Subscriber bundles</label><label><input type="checkbox"> Gift orders</label></aside>
        <section class="order-board"><article><b>Morning Brief Pack</b><span>42 orders</span><em>Inventory ready</em></article><article><b>Market Desk Bundle</b><span>18 orders</span><em>Needs review</em></article><article><b>Policy Watch Annual</b><span>73 orders</span><em>Billing check</em></article><article><b>Student Edition</b><span>29 orders</span><em>Shipping today</em></article></section>
        <aside class="order-drawer"><h2>Order drawer</h2><p>Priority subscriber bundle is waiting on final stock confirmation.</p>${renderMetric("Items", "42", "ready")}${renderMetric("Fulfillment", "86%", "+9")}</aside>
      </main>`;
    case "crm":
      return `<main class="crm-board">
        <header class="crm-top"><div><p class="eyebrow">${layout.id}</p><h1>Subscriber pipeline</h1></div><button>Add account</button></header>
        <section class="crm-metrics">${renderMetric("Pipeline", "$482K", "+18%")}${renderMetric("Accounts", "128", "+9")}${renderMetric("Close rate", "34%", "+4%")}</section>
        <section class="kanban"><div><b>Prospect <em>2</em></b><article><strong>Daily Brief Pro</strong><span>$18K · New York</span><small>Trial starts Friday</small></article><article><strong>Campus Bundle</strong><span>$9K · Education</span><small>Needs champion</small></article></div><div><b>Qualified <em>2</em></b><article><strong>Policy Watch Group</strong><span>$42K · Public affairs</span><small>Usage report sent</small></article><article><strong>Market Desk Team</strong><span>$31K · Finance</span><small>Legal review</small></article></div><div><b>Negotiation <em>2</em></b><article class="hot"><strong>Regional Newsroom</strong><span>$86K · Media group</span><small>82% probability</small></article><article><strong>Finance Research</strong><span>$54K · Analyst team</span><small>Pricing call tomorrow</small></article></div><div><b>Closed <em>1</em></b><article><strong>Executive Edition</strong><span>$120K · Enterprise</span><small>Renewal secured</small></article></div></section>
        <aside class="account-panel"><h2>Regional Newsroom</h2><p>Needs shared editorial analytics, AI brief review, and account-level usage reporting.</p><div class="account-score"><strong>82%</strong><span>deal confidence</span></div><div class="timeline"><p>Demo completed</p><p>Security questionnaire sent</p><p>Pricing call tomorrow</p></div></aside>
      </main>`;
    case "analytics":
      return `<main class="analytics-wall">
        <header class="analytics-top"><div><p class="eyebrow">${layout.id}</p><h1>Reader intelligence command center</h1></div><div class="filter-chips"><span>Today</span><span>Subscribers</span><span>Politics</span><span>Mobile</span></div></header>
        <section class="signal-grid"><div class="signal-hero"><h2>Engaged minutes</h2><strong>3.8M</strong><div class="wave"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="chart-caption"><span>06:00</span><span>Noon</span><span>18:00</span></div></div><div class="signal-stack">${renderMetric("Churn risk", "4.1%", "-0.6%")}${renderMetric("Story velocity", "18/hr", "+3")}${renderMetric("Paywall lift", "11%", "+2.1%")}<article class="segment-card"><h2>Top segment</h2><strong>Policy subscribers</strong><p>High retention, rising comments, strong mobile readership.</p></article></div><aside class="anomaly-list"><h2>Anomalies</h2><p><b>Mobile</b> homepage visits spiked.</p><p><b>Markets</b> story retention dipped.</p><p><b>Comments</b> crossed moderation threshold.</p><p><b>Revenue</b> trial conversions rose in the morning cohort.</p></aside></section>
      </main>`;
    case "portfolio":
      return `<main class="case-study">
        <section class="case-intro"><p class="eyebrow">${layout.id}</p><h1>Designing the daily intelligence desk.</h1><p>A product design case study about turning scattered newsroom signals into a focused decision surface.</p><div class="case-meta"><span>Role: Product design</span><span>Timeline: 8 weeks</span><span>Scope: Research to system</span></div></section>
        <section class="case-artifact"><div class="device-frame"><i><span>Decision queue</span></i><i><span>Evidence stream</span></i><i><span>Publishing controls</span></i></div><aside><b>Outcome</b><strong>34%</strong><span>faster editorial review</span><hr><b>Signal quality</b><strong>2.1x</strong><span>more sourced decisions</span></aside></section>
        <section class="case-story"><article><h2>Challenge</h2><p>Editors needed a product that could hold dense signals without becoming a generic admin dashboard.</p></article><article><h2>Design move</h2><p>We separated decision zones from evidence zones and gave each state a clear reading path.</p></article></section>
      </main>`;
    case "settings":
      return `<main class="settings-console">
        <aside class="settings-menu"><b>Workspace</b><a>Profile</a><a>Members</a><a class="active">Permissions</a><a>Billing</a><a>Security</a><a>Audit log</a></aside>
        <section class="settings-content"><p class="eyebrow">${layout.id}</p><h1>Newsroom permissions</h1><div class="form-grid"><article class="panel form-panel"><h2>Default roles</h2><label>Workspace name<input value="Daily Index Editorial"></label><label>Default role<input value="Editor"></label><label><input type="checkbox" checked> Require review before publishing</label></article><article class="panel matrix-panel"><h2>Permission matrix</h2><table><tbody><tr><td>Publish</td><td>Editor</td><td>Admin</td></tr><tr><td>Billing</td><td>-</td><td>Admin</td></tr><tr><td>Sources</td><td>Editor</td><td>Admin</td></tr></tbody></table></article></div><section class="panel danger"><h2>Danger zone</h2><p>Rotate API keys and revoke inactive integrations.</p></section></section>
      </main>`;
    case "wizard":
      return `<main class="onboarding-flow">
        <header class="stepper"><span class="done">1 Publication</span><span class="active">2 Sources</span><span>3 Team</span><span>4 Launch</span></header>
        <section class="wizard-card"><p class="eyebrow">${layout.id}</p><h1>Connect sources for the morning brief.</h1><p>Select the feeds, editorial notes, and market data that should appear in the daily briefing workspace.</p><div class="source-options"><label><input type="checkbox" checked> Editorial notes <span>6 feeds</span></label><label><input type="checkbox" checked> Market data <span>4 feeds</span></label><label><input type="checkbox"> Reader comments <span>2 feeds</span></label></div><label>Primary publication<input value="Morning Market Brief"></label><label>Audience segment<input value="Paid subscribers"></label><div class="actions-row"><button class="secondary">Back</button><button>Continue</button></div></section>
        <aside class="preview-card"><h2>Launch preview</h2><div class="mini-screen"><i></i><i></i><i></i></div>${renderMetric("Sources", "12", "linked")}<p class="preview-note">Your daily brief will launch with trusted source cards, audience filters, and review gates.</p></aside>
      </main>`;
    case "marketplace":
      return `<main class="marketplace-page">
        <header class="market-search"><p class="eyebrow">${layout.id}</p><h1>Browse layouts, styles, and components for daily news products.</h1><input value="Search layouts, visual styles, modals, dashboards"></header>
        <aside class="market-filter"><b>Categories</b><span class="active">Editorial</span><span>Admin</span><span>AI</span><span>Commerce</span><span>Analytics</span><b>Popular</b><span>Dashboard</span><span>Landing page</span></aside>
        <section class="market-grid">${["News dashboard", "Briefing wizard", "Docs portal", "CRM workspace", "Analytics wall", "Landing page", "Settings console", "Marketplace catalog"].map((item, index) => `<article><span class="thumb thumb-${index + 1}"></span><b>${item}</b><p>Ready-to-adapt pattern for news workflows.</p><small>${index % 2 === 0 ? "Layout" : "Component"} · ${12 + index} examples</small></article>`).join("")}</section>
      </main>`;
    case "admin-overview":
      return `<main class="admin-overview-shell">
        <aside class="admin-overview-menu"><b>Command</b><a class="active">Overview</a><a>Teams</a><a>Workflows</a><a>Revenue</a><a>System health</a></aside>
        <section class="admin-overview-main"><header><p class="eyebrow">${layout.id}</p><h1>Operational command center</h1><button>Run review</button></header><section class="admin-overview-hero"><div><h2>Today needs attention</h2><p>Three teams have crossed review thresholds. Subscriber operations remain stable.</p></div><strong>86</strong></section><section class="admin-overview-grid">${renderMetric("Active teams", "14", "+2")}${renderMetric("Pending approvals", "27", "-8")}${renderMetric("Revenue pulse", "$182K", "+12%")}${renderMetric("Health score", "94", "good")}</section><section class="admin-overview-panels"><article><h2>Workload map</h2><div class="heatmap">${Array.from({ length: 24 }, (_, i) => `<i class="level-${(i % 4) + 1}"></i>`).join("")}</div></article><article><h2>Leadership notes</h2><p>Prioritize policy desk handoff and subscription trial cleanup before the afternoon planning block.</p></article></section></section>
      </main>`;
    case "master-detail":
      return `<main class="master-detail-shell">
        <header class="master-detail-top"><div><p class="eyebrow">${layout.id}</p><h1>Resource management</h1></div><div><button class="secondary">Import</button><button>Create record</button></div></header>
        <aside class="master-filters"><b>Views</b><a class="active">All records</a><a>Needs review</a><a>Recently changed</a><a>Archived</a><b>Filters</b><span>Status: Active</span><span>Owner: Editorial Ops</span></aside>
        <section class="master-table"><div class="table-toolbar"><input value="Search records"><button>Filter</button></div>${renderTable([["Homepage package", "Maya", "Active", "High"], ["Newsletter segment", "Eli", "Review", "Medium"], ["Trial cohort", "Noah", "Draft", "High"], ["Archive policy", "Ava", "Active", "Low"], ["Push campaign", "Iris", "Queued", "Medium"], ["Audio brief", "Kai", "Active", "High"], ["Opinion forum", "Lena", "Review", "Medium"], ["Source library", "Owen", "Active", "Low"]])}</section>
        <aside class="detail-inspector"><h2>Homepage package</h2><p>Primary resource for the daily news homepage, connected to audience segments and revenue reporting.</p>${renderMetric("Linked items", "18", "synced")}${renderMetric("Risk", "Medium", "review")}<div class="inspector-list"><b>Recent activity</b><p>Maya updated the audience rule.</p><p>Noah attached revenue report.</p><p>Ava approved source changes.</p></div></aside>
      </main>`;
    case "ops-timeline":
      return `<main class="ops-timeline-shell">
        <header class="ops-timeline-top"><p class="eyebrow">${layout.id}</p><h1>Operations timeline</h1><button>Escalate</button></header>
        <section class="ops-summary">${renderMetric("Open incidents", "6", "-2")}${renderMetric("Deployments", "11", "+4")}${renderMetric("Support load", "74%", "steady")}</section>
        <section class="ops-board"><aside class="ops-lanes"><b>Queues</b><span class="active">Live incidents</span><span>Scheduled changes</span><span>Customer impact</span><span>Resolved</span></aside><div class="timeline-stream"><article><time>08:20</time><h2>Homepage alert acknowledged</h2><p>Editor traffic spike routed to standby review team.</p><small>Owner: Maya · Severity: medium</small></article><article><time>09:05</time><h2>Subscriber sync delayed</h2><p>Retry window opened, data integrity checks passed.</p><small>Owner: Eli · Watch window: 15 min</small></article><article><time>10:40</time><h2>Policy desk handoff</h2><p>New approval owner assigned for the afternoon edition.</p><small>Owner: Noah · Next checkpoint: 11:20</small></article><article><time>11:10</time><h2>Audio edition queued</h2><p>Publishing pipeline ready after transcript validation.</p><small>Owner: Iris · Status: green</small></article></div><aside class="ops-detail"><h2>Current runbook</h2><p>Follow escalation tier two if queue delay exceeds 20 minutes.</p><ul><li>Confirm impact radius</li><li>Assign single owner</li><li>Publish status note</li></ul><button>Open runbook</button></aside></section>
      </main>`;
    case "personal-portfolio":
      return `<main class="personal-portfolio-page">
        <nav class="personal-nav"><b>Alex Morgan</b><span>Work</span><span>Writing</span><span>Contact</span></nav>
        <section class="personal-hero"><p class="eyebrow">${layout.id}</p><h1>Designing focused products for data-heavy teams.</h1><p>I help teams turn complex workflows into clear interfaces, from admin consoles to editorial intelligence tools.</p></section>
        <section class="selected-work"><article class="featured-work"><span></span><h2>Editorial command center</h2><p>Product strategy, interface design, design system.</p></article><article><span></span><h2>Revenue analytics</h2></article><article><span></span><h2>Workflow redesign</h2></article></section>
      </main>`;
    case "personal-writing":
      return `<main class="writing-home">
        <aside class="writing-profile"><b>Notes by Alex</b><p>Essays on interfaces, software teams, and the practice of making complex tools understandable.</p><button>Subscribe</button><div><strong>18K</strong><span>readers</span></div></aside>
        <section class="writing-feed"><p class="eyebrow">${layout.id}</p><h1>Recent writing</h1><article class="featured-essay"><time>May 19</time><h2>Designing for repeated operational decisions</h2><p>Why admin interfaces need rhythm, density, and calm hierarchy.</p></article><article><time>May 12</time><h2>When dashboards become products</h2><p>A practical lens for separating signal from decoration.</p></article><article><time>May 04</time><h2>The case for slower settings pages</h2><p>Critical controls deserve friction, review, and better copy.</p></article><article><time>Apr 28</time><h2>What good tables reveal</h2><p>Sorting, scanning, and acting are different design jobs.</p></article></section>
        <aside class="writing-index"><b>Topics</b><span>Product design</span><span>Frontend systems</span><span>Research notes</span><span>Career</span><b>Now reading</b><p>Operational UI notes for teams building internal tools.</p></aside>
      </main>`;
    case "corporate-home":
      return `<main class="corporate-homepage">
        <nav class="corp-nav"><b>Northstar Systems</b><span>Solutions</span><span>Industries</span><span>Company</span><button>Contact sales</button></nav>
        <section class="corp-hero"><p class="eyebrow">${layout.id}</p><h1>Reliable operating systems for modern service teams.</h1><p>Northstar helps enterprise teams coordinate daily work, customer commitments, and measurable outcomes from one trusted platform.</p><div><button>Talk to sales</button><button class="secondary">View solutions</button></div></section>
        <section class="corp-proof"><strong>1,200+</strong><span>teams supported</span><strong>99.95%</strong><span>platform uptime</span><strong>42%</strong><span>faster response cycles</span></section>
        <section class="corp-sections"><article><h2>Operations</h2><p>Coordinate high-volume work with clarity.</p></article><article><h2>Customer success</h2><p>Protect commitments and account health.</p></article><article><h2>Leadership</h2><p>See the state of the business quickly.</p></article></section>
      </main>`;
    case "corporate-services":
      return `<main class="services-site">
        <header class="services-hero"><p class="eyebrow">${layout.id}</p><h1>Strategy, design, and delivery for teams changing how work gets done.</h1><p>We partner with product and operations leaders to redesign complex services, internal tools, and customer-facing digital systems.</p><div class="services-proof"><span>Product strategy</span><span>Service design</span><span>Implementation support</span></div></header>
        <section class="services-layout"><aside class="services-sticky"><b>Services</b><a class="active">Product strategy</a><a>Service design</a><a>Design systems</a><a>Implementation support</a><div class="quote">"They turned a messy operation into a system teams could actually run."</div></aside><div class="services-cards"><article><span>01</span><h2>Diagnose the workflow</h2><p>Map decision points, handoffs, and friction.</p></article><article><span>02</span><h2>Design the operating model</h2><p>Turn complexity into usable service patterns.</p></article><article><span>03</span><h2>Ship the system</h2><p>Support teams through implementation and adoption.</p></article></div></section>
      </main>`;
    case "enterprise-product":
      return `<main class="enterprise-product-page">
        <nav class="enterprise-nav"><b>Atlas Platform</b><span>Platform</span><span>Security</span><span>Customers</span><span>Docs</span><button>Request demo</button></nav>
        <section class="enterprise-hero"><div><p class="eyebrow">${layout.id}</p><h1>One platform for enterprise workflow intelligence.</h1><p>Connect data, decisions, and teams with a product suite built for governance, scale, and day-to-day operational confidence.</p><div class="enterprise-proof"><span>SOC 2 ready</span><span>Global teams</span><span>Audit-first</span></div></div><aside class="enterprise-stack"><div><b>Control plane</b><span>Policies, roles, audit</span></div><div><b>Workflow engine</b><span>Routing and escalation</span></div><div><b>Insight layer</b><span>Metrics and reporting</span></div></aside></section>
        <section class="enterprise-modules"><article><h2>Control plane</h2><p>Permissions, policy, audit, and compliance.</p></article><article><h2>Workflow engine</h2><p>Rules, approvals, routing, and escalation.</p></article><article><h2>Insight layer</h2><p>Metrics, reporting, and executive visibility.</p></article></section>
      </main>`;
    default:
      return `<main class="workspace"><h1>${layout.name}</h1><p>${layout.bestFor}</p></main>`;
  }
}

function renderLayoutHtml(layout) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${layout.id} - ${layout.name}</title>
<style>
* { box-sizing: border-box; }
body {
  min-height: 100vh;
  margin: 0;
  color: #182230;
  background: #eef2f7;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
button, input { font: inherit; }
button {
  min-height: 36px;
  padding: 0 14px;
  color: #fff;
  background: #3157d5;
  border: 1px solid #3157d5;
  border-radius: 6px;
  font-weight: 700;
}
.secondary, .actions-row button:first-child {
  color: #3157d5;
  background: #fff;
}
.eyebrow {
  margin: 0 0 8px;
  color: #3157d5;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: .08em;
  text-transform: uppercase;
}
h1, h2, p { letter-spacing: 0; }
h1 { margin: 0; font-size: 34px; line-height: 1.08; }
h2 { margin: 0 0 14px; font-size: 16px; }
p { color: #52606d; line-height: 1.55; }
a, .sidebar span, .rail span, .steps span {
  display: block;
  color: #52606d;
  text-decoration: none;
}
.sidebar, .rail, .docs-nav, .settings-nav, .steps {
  padding: 24px;
  background: #fff;
  border-right: 1px solid #d9e2ec;
}
.sidebar b, .rail b, .docs-nav b, .settings-nav b, .steps b {
  display: block;
  margin-bottom: 24px;
  font-size: 18px;
}
.sidebar a, .docs-nav a, .settings-nav a, .rail span, .steps span {
  margin: 10px 0;
  padding: 9px 10px;
  border-radius: 6px;
}
.active, .sidebar a:first-of-type, .docs-nav a:first-of-type {
  color: #1d3fb8;
  background: #edf2ff;
}
.workspace, .settings-main, .analytics-shell, .crm-shell {
  padding: 28px;
}
.topbar, .nav, .masthead {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 22px;
}
.metrics, .feature-row, .filters, .pipeline, .case-grid, .catalog {
  display: grid;
  gap: 14px;
}
.metrics { grid-template-columns: repeat(4, minmax(0, 1fr)); margin-bottom: 18px; }
.metric, .panel, .feature-row div, .pipeline div, .case-grid div, .catalog article, .lead, .stack, .wizard-panel, .summary {
  background: #fff;
  border: 1px solid #d9e2ec;
  border-radius: 8px;
  box-shadow: 0 10px 28px rgba(15, 23, 42, .07);
}
.metric { padding: 16px; }
.metric span, .metric em {
  display: block;
  color: #667085;
  font-size: 12px;
  font-style: normal;
}
.metric strong {
  display: block;
  margin: 8px 0 4px;
  font-size: 28px;
}
.split, .commerce-grid, .lead-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(320px, .65fr);
  gap: 18px;
}
.panel { padding: 18px; overflow: hidden; }
table { width: 100%; border-collapse: collapse; font-size: 13px; }
th, td { padding: 12px 10px; border-bottom: 1px solid #e6eaf0; text-align: left; }
th { color: #667085; font-size: 12px; }
.pill { display: inline-flex; padding: 4px 8px; border-radius: 999px; color: #1d3fb8; background: #edf2ff; font-size: 12px; font-weight: 700; }
.bars { display: flex; align-items: end; gap: 12px; height: 260px; padding-top: 20px; }
.bars i { flex: 1; min-width: 24px; border-radius: 8px 8px 0 0; background: linear-gradient(180deg, #6c8cff, #3157d5); }
.bars i:nth-child(1) { height: 42%; } .bars i:nth-child(2) { height: 68%; } .bars i:nth-child(3) { height: 54%; } .bars i:nth-child(4) { height: 82%; } .bars i:nth-child(5) { height: 62%; } .bars i:nth-child(6) { height: 90%; } .bars i:nth-child(7) { height: 74%; } .bars i:nth-child(8) { height: 58%; }
.layout-dashboard, .layout-commerce { display: grid; grid-template-columns: 240px 1fr; }
.layout-landing { background: #f7f2ea; }
.landing-wrap { max-width: 1180px; margin: 0 auto; padding: 28px; }
.nav { padding: 14px 0; }
.nav span { color: #52606d; }
.hero { max-width: 780px; padding: 80px 0 54px; }
.hero h1 { font-size: 60px; }
.hero p { max-width: 620px; font-size: 18px; }
.feature-row { grid-template-columns: repeat(3, 1fr); }
.feature-row div { padding: 22px; }
.layout-copilot { display: grid; grid-template-columns: 92px 1fr; background: #ecfdf5; }
.copilot-grid { display: grid; grid-template-columns: minmax(0, 1fr) 360px; grid-template-rows: 1fr auto; gap: 18px; padding: 24px; }
.editor { min-height: 520px; }
.assistant { background: #102a43; color: #fff; }
.assistant p, .assistant h2 { color: #fff; }
.bubble { margin: 14px 0; padding: 14px; border-radius: 8px; background: rgba(255,255,255,.12); }
.bubble.alt { background: #fff; color: #182230; }
.queue { grid-column: 1 / -1; }
.doc-lines i { display: block; height: 14px; margin: 16px 0; border-radius: 99px; background: #d9e2ec; }
.doc-lines i:nth-child(2n) { width: 76%; }
.layout-docs { display: grid; grid-template-columns: 260px minmax(0, 1fr) 220px; background: #fff; }
.docs-article { padding: 46px 54px; }
pre { padding: 18px; overflow: auto; color: #e6edf7; background: #111827; border-radius: 8px; }
.toc { padding: 34px 20px; border-left: 1px solid #d9e2ec; }
.toc a { margin: 12px 0; color: #52606d; }
.news-shell { max-width: 1180px; margin: 0 auto; padding: 30px 24px; }
.masthead { padding-bottom: 18px; border-bottom: 4px solid #182230; }
.masthead b { font-family: Georgia, serif; font-size: 42px; }
.lead { padding: 30px; }
.lead h1 { font-family: Georgia, serif; font-size: 52px; }
.stack { padding: 24px; }
.story-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 18px; }
.story-grid article { height: 170px; background: #fff; border: 1px solid #d9e2ec; border-radius: 8px; }
.toolbar { display: flex; gap: 10px; margin-bottom: 16px; }
input { width: 100%; min-height: 38px; padding: 0 12px; border: 1px solid #cbd5e1; border-radius: 6px; }
.detail { background: #f8fafc; }
.crm-shell, .analytics-shell, .case-shell, .market-shell { max-width: 1220px; margin: 0 auto; }
.pipeline { grid-template-columns: repeat(4, 1fr); margin-bottom: 18px; }
.pipeline div { min-height: 220px; padding: 16px; }
.timeline p { padding-left: 14px; border-left: 3px solid #3157d5; }
.filters { grid-template-columns: repeat(4, max-content); margin-bottom: 16px; }
.filters button { color: #3157d5; background: #fff; border-color: #d9e2ec; }
.wide { min-height: 350px; }
.case-shell { padding: 36px 24px; }
.case-hero { max-width: 880px; padding: 70px 0; }
.case-hero h1 { font-size: 64px; }
.case-grid { grid-template-columns: repeat(3, 1fr); margin-bottom: 28px; }
.case-grid div, .narrative { padding: 22px; }
.narrative { max-width: 760px; background: #fff; border: 1px solid #d9e2ec; border-radius: 8px; }
.layout-settings { display: grid; grid-template-columns: 260px 1fr; }
.settings-main header { margin-bottom: 22px; }
label { display: block; margin: 14px 0; color: #344054; font-weight: 700; }
label input { margin-top: 8px; }
label input[type="checkbox"] { width: auto; min-height: auto; margin-right: 8px; }
.danger { margin-top: 16px; border-color: #fecaca; }
.wizard-shell { display: grid; grid-template-columns: 240px minmax(0, 1fr) 300px; gap: 18px; min-height: 100vh; padding: 24px; }
.steps, .wizard-panel, .summary { padding: 24px; }
.actions-row { display: flex; justify-content: space-between; gap: 12px; margin-top: 26px; }
.market-shell { padding: 30px 24px; }
.market-hero { padding: 44px; background: #fff; border: 1px solid #d9e2ec; border-radius: 8px; }
.market-hero h1 { max-width: 820px; margin-bottom: 22px; font-size: 52px; }
.catalog { grid-template-columns: repeat(3, 1fr); margin-top: 18px; }
.catalog article { min-height: 190px; padding: 18px; }
.catalog span { display: block; height: 82px; margin-bottom: 16px; border-radius: 6px; background: linear-gradient(135deg, #dbe7ff, #f8fafc); }
.layout-v2 {
  display: block;
  overflow-x: hidden;
}
.layout-v2.layout-dashboard,
.layout-v2.layout-landing,
.layout-v2.layout-copilot,
.layout-v2.layout-docs,
.layout-v2.layout-news,
.layout-v2.layout-commerce,
.layout-v2.layout-crm,
.layout-v2.layout-analytics,
.layout-v2.layout-portfolio,
.layout-v2.layout-settings,
.layout-v2.layout-wizard,
.layout-v2.layout-marketplace,
.layout-v2.layout-admin-overview,
.layout-v2.layout-master-detail,
.layout-v2.layout-ops-timeline,
.layout-v2.layout-personal-portfolio,
.layout-v2.layout-personal-writing,
.layout-v2.layout-corporate-home,
.layout-v2.layout-corporate-services,
.layout-v2.layout-enterprise-product {
  display: block;
}
.layout-v2 .dash-rail {
  position: fixed;
  inset: 0 auto 0 0;
  width: 76px;
  padding: 20px 12px;
  color: #dbeafe;
  background: #0f172a;
}
.layout-v2 .dash-rail b,
.layout-v2 .dash-rail span {
  display: block;
  margin-bottom: 18px;
  text-align: center;
}
.layout-v2 .dash-board {
  min-height: 100vh;
  margin-left: 76px;
  padding: 18px;
  background: #e2e8f0;
}
.layout-v2 .dash-status {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 12px;
  align-items: center;
  padding: 12px 16px;
  color: #fff;
  background: #1e293b;
  border-radius: 8px;
}
.layout-v2 .dash-status p { margin: 0; color: #e2e8f0; }
.layout-v2 .dash-kpis {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin: 12px 0;
}
.layout-v2 .dash-main {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 12px;
}
.layout-v2 .dash-table table { font-size: 12px; }
.layout-v2 .alert-feed p {
  margin: 10px 0;
  padding: 12px;
  color: #334155;
  background: #f8fafc;
  border-left: 4px solid #ef4444;
}
.layout-v2.layout-landing {
  background: linear-gradient(135deg, #fff7ed, #eff6ff);
}
.layout-v2 .saas-page {
  max-width: 1220px;
  margin: 0 auto;
  padding: 28px;
}
.layout-v2 .saas-nav,
.layout-v2 .saas-hero,
.layout-v2 .logo-strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.layout-v2 .saas-nav span { color: #64748b; }
.layout-v2 .saas-hero { min-height: 720px; }
.layout-v2 .saas-hero h1 { max-width: 680px; font-size: 66px; }
.layout-v2 .product-shot {
  width: 420px;
  min-height: 500px;
  padding: 18px;
  background: #111827;
  border: 10px solid #fff;
  border-radius: 28px;
  box-shadow: 0 36px 80px rgba(15,23,42,.22);
}
.layout-v2 .shot-top { height: 110px; border-radius: 18px; background: #3157d5; }
.layout-v2 .shot-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; margin: 14px 0; }
.layout-v2 .shot-grid i { height: 92px; border-radius: 14px; background: #f8fafc; }
.layout-v2 .shot-chart { display: flex; align-items: end; gap: 12px; height: 160px; }
.layout-v2 .shot-chart i { flex: 1; border-radius: 12px 12px 0 0; background: #60a5fa; }
.layout-v2 .shot-chart i:nth-child(1) { height: 45%; } .layout-v2 .shot-chart i:nth-child(2) { height: 75%; } .layout-v2 .shot-chart i:nth-child(3) { height: 58%; } .layout-v2 .shot-chart i:nth-child(4) { height: 88%; }
.layout-v2 .logo-strip {
  padding: 18px 0;
  border-top: 1px solid rgba(15,23,42,.12);
  border-bottom: 1px solid rgba(15,23,42,.12);
  color: #64748b;
  font-weight: 800;
}
.layout-v2 .ai-workspace {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr) 360px;
  min-height: 100vh;
  background: #f0fdf4;
}
.layout-v2 .thread-list,
.layout-v2 .writing-canvas,
.layout-v2 .copilot-panel {
  padding: 24px;
}
.layout-v2 .thread-list {
  background: #052e16;
  color: #dcfce7;
}
.layout-v2 .thread-list p {
  padding: 12px;
  color: #bbf7d0;
  border-radius: 8px;
}
.layout-v2 .thread-list .active { background: rgba(255,255,255,.14); }
.layout-v2 .writing-canvas {
  margin: 24px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 22px 60px rgba(22,101,52,.16);
}
.layout-v2 .doc-block {
  height: 72px;
  margin: 18px 0;
  border-radius: 12px;
  background: #e2e8f0;
}
.layout-v2 .doc-block.large { height: 180px; }
.layout-v2 .doc-block.short { width: 62%; }
.layout-v2 .source-tray span {
  display: inline-flex;
  margin-right: 8px;
  padding: 8px 10px;
  border-radius: 999px;
  background: #dcfce7;
}
.layout-v2 .copilot-panel {
  color: #fff;
  background: #111827;
}
.layout-v2 .copilot-panel h2 { color: #fff; }
.layout-v2 .chat {
  margin: 14px 0;
  padding: 14px;
  border-radius: 14px;
  color: #e5e7eb;
  background: #1f2937;
}
.layout-v2 .chat.ai {
  color: #111827;
  background: #bbf7d0;
}
.layout-v2 .docs-top {
  display: grid;
  grid-template-columns: 240px 1fr auto;
  gap: 16px;
  align-items: center;
  padding: 14px 22px;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
}
.layout-v2 .docs-shell {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr) 220px;
  min-height: calc(100vh - 66px);
  background: #fff;
}
.layout-v2 .docs-tree,
.layout-v2 .docs-anchor {
  padding: 28px 20px;
  background: #f8fafc;
}
.layout-v2 .docs-tree a,
.layout-v2 .docs-anchor a {
  display: block;
  margin: 8px 0;
  padding: 9px;
  color: #475569;
}
.layout-v2 .docs-content {
  max-width: 820px;
  padding: 48px 56px;
}
.layout-v2 .docs-content h1 { font-size: 48px; }
.layout-v2 .newspaper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 22px;
  background: #fffdf7;
}
.layout-v2 .paper-head {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: end;
  gap: 20px;
  padding-bottom: 18px;
  border-bottom: 5px double #111827;
}
.layout-v2 .paper-head b {
  font-family: Georgia, serif;
  font-size: 58px;
}
.layout-v2 .paper-head span:last-child { text-align: right; }
.layout-v2 .paper-grid {
  display: grid;
  grid-template-columns: 1.15fr .85fr 320px;
  gap: 18px;
  margin-top: 22px;
}
.layout-v2 .paper-lead h1 {
  font-family: Georgia, serif;
  font-size: 56px;
}
.layout-v2 .paper-photo {
  min-height: 420px;
  background: linear-gradient(135deg, #94a3b8, #f8fafc);
  border: 1px solid #111827;
}
.layout-v2 .paper-briefs,
.layout-v2 .paper-columns article {
  padding: 18px;
  border: 1px solid #111827;
}
.layout-v2 .paper-columns {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-top: 18px;
}
.layout-v2 .commerce-console {
  display: grid;
  grid-template-columns: 230px minmax(0, 1fr) 330px;
  grid-template-rows: auto 1fr;
  gap: 16px;
  min-height: 100vh;
  padding: 20px;
  background: #fefce8;
}
.layout-v2 .commerce-top {
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.layout-v2 .commerce-filters,
.layout-v2 .order-drawer,
.layout-v2 .order-board article {
  padding: 18px;
  background: #fff;
  border: 1px solid #fde68a;
  border-radius: 8px;
}
.layout-v2 .commerce-filters label {
  display: block;
  margin: 18px 0;
}
.layout-v2 .order-board {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  align-content: start;
}
.layout-v2 .order-board article {
  min-height: 210px;
  display: grid;
  align-content: space-between;
}
.layout-v2 .order-board b,
.layout-v2 .order-board span,
.layout-v2 .order-board em {
  display: block;
}
.layout-v2 .order-board span { font-size: 34px; font-weight: 900; }
.layout-v2 .crm-board {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  grid-template-rows: auto auto 1fr;
  gap: 16px;
  min-height: 100vh;
  padding: 20px;
  background: #eff6ff;
}
.layout-v2 .crm-top {
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.layout-v2 .kanban {
  display: grid;
  grid-template-columns: repeat(4, minmax(220px, 1fr));
  gap: 14px;
  overflow-x: auto;
}
.layout-v2 .kanban > div,
.layout-v2 .account-panel {
  padding: 14px;
  background: #fff;
  border: 1px solid #bfdbfe;
  border-radius: 8px;
}
.layout-v2 .kanban article {
  margin: 12px 0;
  padding: 14px;
  min-height: 84px;
  background: #f8fafc;
  border: 1px solid #dbeafe;
  border-radius: 8px;
}
.layout-v2 .kanban .hot { border-left: 5px solid #2563eb; }
.layout-v2 .account-panel .timeline p {
  padding-left: 14px;
  border-left: 3px solid #2563eb;
}
.layout-v2.layout-analytics {
  color: #dbeafe;
  background: #020617;
}
.layout-v2 .analytics-wall {
  min-height: 100vh;
  padding: 24px;
}
.layout-v2 .analytics-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.layout-v2 .analytics-top h1,
.layout-v2 .analytics-wall h2 { color: #fff; }
.layout-v2 .filter-chips span {
  display: inline-flex;
  margin-left: 8px;
  padding: 8px 10px;
  color: #bfdbfe;
  background: rgba(37,99,235,.22);
  border: 1px solid rgba(147,197,253,.28);
  border-radius: 999px;
}
.layout-v2 .signal-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 260px 320px;
  gap: 16px;
}
.layout-v2 .signal-hero,
.layout-v2 .signal-stack .metric,
.layout-v2 .anomaly-list {
  padding: 20px;
  background: rgba(15,23,42,.92);
  border: 1px solid rgba(147,197,253,.22);
  border-radius: 8px;
}
.layout-v2 .signal-hero strong {
  display: block;
  font-size: 92px;
  line-height: 1;
}
.layout-v2 .wave {
  display: flex;
  align-items: end;
  gap: 14px;
  height: 420px;
  margin-top: 22px;
}
.layout-v2 .wave i {
  flex: 1;
  border-radius: 20px 20px 0 0;
  background: linear-gradient(180deg, #38bdf8, #1d4ed8);
}
.layout-v2 .wave i:nth-child(1) { height: 32%; } .layout-v2 .wave i:nth-child(2) { height: 58%; } .layout-v2 .wave i:nth-child(3) { height: 76%; } .layout-v2 .wave i:nth-child(4) { height: 44%; } .layout-v2 .wave i:nth-child(5) { height: 92%; } .layout-v2 .wave i:nth-child(6) { height: 68%; } .layout-v2 .wave i:nth-child(7) { height: 84%; } .layout-v2 .wave i:nth-child(8) { height: 52%; }
.layout-v2 .anomaly-list p { color: #bfdbfe; }
.layout-v2 .case-study {
  max-width: 1180px;
  margin: 0 auto;
  padding: 36px 24px;
}
.layout-v2 .case-intro {
  max-width: 860px;
  padding: 70px 0;
}
.layout-v2 .case-intro h1 { font-size: 72px; }
.layout-v2 .case-artifact {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 280px;
  gap: 22px;
  margin-bottom: 26px;
}
.layout-v2 .device-frame,
.layout-v2 .case-artifact aside,
.layout-v2 .case-story article {
  padding: 24px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  box-shadow: 0 22px 60px rgba(15,23,42,.1);
}
.layout-v2 .device-frame { min-height: 420px; }
.layout-v2 .device-frame i {
  display: block;
  height: 92px;
  margin: 18px 0;
  border-radius: 16px;
  background: linear-gradient(135deg, #e0e7ff, #f8fafc);
}
.layout-v2 .case-artifact strong { display: block; font-size: 78px; }
.layout-v2 .case-story {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}
.layout-v2 .settings-console {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  min-height: 100vh;
  background: #f8fafc;
}
.layout-v2 .settings-menu {
  padding: 28px;
  background: #fff;
  border-right: 1px solid #e2e8f0;
}
.layout-v2 .settings-menu a {
  display: block;
  margin: 8px 0;
  padding: 10px;
  color: #475569;
  border-radius: 8px;
}
.layout-v2 .settings-content {
  max-width: 980px;
  padding: 40px;
}
.layout-v2 .form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  margin-top: 20px;
}
.layout-v2 .form-panel,
.layout-v2 .matrix-panel {
  min-height: 300px;
}
.layout-v2 .danger {
  margin-top: 18px;
  border-color: #fecaca;
}
.layout-v2 .onboarding-flow {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  grid-template-rows: auto 1fr;
  gap: 22px;
  min-height: 100vh;
  padding: 28px;
  background: linear-gradient(135deg, #f0f9ff, #fdf2f8);
}
.layout-v2 .stepper {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.layout-v2 .stepper span {
  padding: 12px;
  background: #fff;
  border: 1px solid #dbeafe;
  border-radius: 999px;
  text-align: center;
}
.layout-v2 .stepper .active { color: #fff; background: #3157d5; }
.layout-v2 .stepper .done { color: #166534; background: #dcfce7; }
.layout-v2 .wizard-card,
.layout-v2 .preview-card {
  align-self: start;
  padding: 36px;
  background: #fff;
  border: 1px solid #dbeafe;
  border-radius: 24px;
  box-shadow: 0 28px 70px rgba(30,64,175,.12);
}
.layout-v2 .wizard-card h1 { font-size: 54px; }
.layout-v2 .mini-screen {
  height: 260px;
  margin: 18px 0;
  padding: 16px;
  border-radius: 20px;
  background: #111827;
}
.layout-v2 .mini-screen i {
  display: block;
  height: 52px;
  margin: 14px 0;
  border-radius: 12px;
  background: #dbeafe;
}
.layout-v2 .marketplace-page {
  display: grid;
  grid-template-columns: 230px minmax(0, 1fr);
  gap: 18px;
  padding: 28px;
  background: #f8fafc;
}
.layout-v2 .market-search {
  grid-column: 1 / -1;
  padding: 38px;
  background: #111827;
  border-radius: 18px;
}
.layout-v2 .market-search h1 {
  max-width: 920px;
  color: #fff;
  font-size: 52px;
}
.layout-v2 .market-filter,
.layout-v2 .market-grid article {
  padding: 18px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}
.layout-v2 .market-filter span {
  display: block;
  margin: 10px 0;
  padding: 8px;
  color: #475569;
}
.layout-v2 .market-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}
.layout-v2 .market-grid article {
  min-height: 210px;
}
.layout-v2 .market-grid article span {
  display: block;
  height: 92px;
  margin-bottom: 14px;
  border-radius: 8px;
  background: linear-gradient(135deg, #bfdbfe, #f8fafc);
}
.layout-v2 .admin-overview-shell {
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr);
  min-height: 100vh;
  background: #eef2ff;
}
.layout-v2 .admin-overview-menu,
.layout-v2 .admin-overview-main article,
.layout-v2 .admin-overview-hero {
  background: #fff;
  border: 1px solid #dbe4ff;
  border-radius: 8px;
}
.layout-v2 .admin-overview-menu {
  padding: 26px;
  border-radius: 0;
}
.layout-v2 .admin-overview-menu a {
  display: block;
  margin: 8px 0;
  padding: 10px;
  color: #475569;
  border-radius: 6px;
}
.layout-v2 .admin-overview-main {
  padding: 28px;
}
.layout-v2 .admin-overview-main header,
.layout-v2 .master-detail-top,
.layout-v2 .ops-timeline-top,
.layout-v2 .personal-nav,
.layout-v2 .corp-nav,
.layout-v2 .enterprise-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}
.layout-v2 .admin-overview-hero {
  display: grid;
  grid-template-columns: 1fr 180px;
  gap: 20px;
  align-items: center;
  margin: 20px 0;
  padding: 24px;
  background: #1e1b4b;
  color: #fff;
}
.layout-v2 .admin-overview-hero p { color: #c7d2fe; }
.layout-v2 .admin-overview-hero strong { font-size: 86px; }
.layout-v2 .admin-overview-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 16px;
}
.layout-v2 .admin-overview-panels {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(320px, .8fr);
  gap: 16px;
}
.layout-v2 .admin-overview-main article {
  padding: 20px;
}
.layout-v2 .heatmap {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 8px;
}
.layout-v2 .heatmap i {
  height: 46px;
  border-radius: 6px;
  background: #e0e7ff;
}
.layout-v2 .heatmap .level-2 { background: #bfdbfe; }
.layout-v2 .heatmap .level-3 { background: #818cf8; }
.layout-v2 .heatmap .level-4 { background: #4338ca; }
.layout-v2 .master-detail-shell {
  display: grid;
  grid-template-columns: 230px minmax(0, 1fr) 320px;
  grid-template-rows: auto 1fr;
  gap: 16px;
  min-height: 100vh;
  padding: 20px;
  background: #f8fafc;
}
.layout-v2 .master-detail-top { grid-column: 1 / -1; }
.layout-v2 .master-filters,
.layout-v2 .master-table,
.layout-v2 .detail-inspector {
  padding: 18px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}
.layout-v2 .master-filters a,
.layout-v2 .master-filters span {
  display: block;
  margin: 10px 0;
  padding: 9px;
  color: #475569;
  border-radius: 6px;
}
.layout-v2 .table-toolbar {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  margin-bottom: 14px;
}
.layout-v2 .ops-timeline-shell {
  min-height: 100vh;
  padding: 24px;
  background: #f1f5f9;
}
.layout-v2 .ops-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin: 18px 0;
}
.layout-v2 .ops-board {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr) 320px;
  gap: 16px;
}
.layout-v2 .ops-lanes,
.layout-v2 .timeline-stream article,
.layout-v2 .ops-detail {
  padding: 18px;
  background: #fff;
  border: 1px solid #d9e2ec;
  border-radius: 8px;
}
.layout-v2 .ops-lanes span {
  display: block;
  margin: 10px 0;
  padding: 9px;
  color: #475569;
  border-radius: 6px;
}
.layout-v2 .timeline-stream {
  display: grid;
  gap: 14px;
}
.layout-v2 .timeline-stream article {
  border-left: 6px solid #3157d5;
}
.layout-v2 .timeline-stream time {
  color: #3157d5;
  font-weight: 800;
}
.layout-v2 .personal-portfolio-page {
  max-width: 1180px;
  margin: 0 auto;
  padding: 28px;
  background: #fff;
}
.layout-v2 .personal-hero {
  max-width: 940px;
  padding: 90px 0 56px;
}
.layout-v2 .personal-hero h1 {
  font-size: 72px;
}
.layout-v2 .selected-work {
  display: grid;
  grid-template-columns: 1.4fr .8fr .8fr;
  gap: 18px;
}
.layout-v2 .selected-work article {
  min-height: 280px;
  padding: 22px;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
}
.layout-v2 .selected-work article span {
  display: block;
  height: 150px;
  margin-bottom: 18px;
  border-radius: 12px;
  background: linear-gradient(135deg, #111827, #94a3b8);
}
.layout-v2 .writing-home {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr) 240px;
  min-height: 100vh;
  background: #fffaf0;
}
.layout-v2 .writing-profile,
.layout-v2 .writing-feed,
.layout-v2 .writing-index {
  padding: 34px;
}
.layout-v2 .writing-profile,
.layout-v2 .writing-index {
  background: #fff;
  border-right: 1px solid #eadfcb;
}
.layout-v2 .writing-index {
  border-right: 0;
  border-left: 1px solid #eadfcb;
}
.layout-v2 .writing-feed article {
  padding: 24px 0;
  border-bottom: 1px solid #eadfcb;
}
.layout-v2 .writing-feed h1 {
  font-family: Georgia, serif;
  font-size: 62px;
}
.layout-v2 .writing-index span {
  display: block;
  margin: 10px 0;
}
.layout-v2 .corporate-homepage {
  padding: 28px;
  background: #f8fafc;
}
.layout-v2 .corp-hero {
  max-width: 1040px;
  padding: 86px 0 56px;
}
.layout-v2 .corp-hero h1,
.layout-v2 .services-hero h1,
.layout-v2 .enterprise-hero h1 {
  font-size: 64px;
}
.layout-v2 .corp-proof {
  display: grid;
  grid-template-columns: repeat(3, auto 1fr);
  gap: 12px;
  align-items: center;
  padding: 22px;
  color: #fff;
  background: #0f172a;
  border-radius: 8px;
}
.layout-v2 .corp-proof strong {
  font-size: 38px;
}
.layout-v2 .corp-sections,
.layout-v2 .enterprise-modules {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 18px;
}
.layout-v2 .corp-sections article,
.layout-v2 .enterprise-modules article {
  padding: 24px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}
.layout-v2 .services-site {
  padding: 30px;
  background: #f4f1ea;
}
.layout-v2 .services-hero {
  max-width: 980px;
  padding: 70px 0 42px;
}
.layout-v2 .services-layout {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 24px;
}
.layout-v2 .services-sticky,
.layout-v2 .services-cards article {
  padding: 22px;
  background: #fff;
  border: 1px solid #d8cbb6;
  border-radius: 8px;
}
.layout-v2 .services-sticky a {
  display: block;
  margin: 10px 0;
  padding: 10px;
  color: #4b5563;
}
.layout-v2 .services-cards {
  display: grid;
  gap: 16px;
}
.layout-v2 .services-cards span {
  color: #3157d5;
  font-weight: 900;
}
.layout-v2 .enterprise-product-page {
  padding: 28px;
  color: #e5e7eb;
  background: #020617;
}
.layout-v2 .enterprise-nav {
  color: #fff;
}
.layout-v2 .enterprise-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 420px;
  gap: 30px;
  align-items: center;
  min-height: 620px;
}
.layout-v2 .enterprise-hero h1,
.layout-v2 .enterprise-hero p,
.layout-v2 .enterprise-modules h2,
.layout-v2 .enterprise-modules p {
  color: inherit;
}
.layout-v2 .enterprise-stack {
  display: grid;
  gap: 18px;
}
.layout-v2 .enterprise-stack div {
  min-height: 150px;
  border: 1px solid rgba(147,197,253,.3);
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(49,87,213,.9), rgba(14,165,233,.24));
}
.layout-v2 .enterprise-modules article {
  background: rgba(15,23,42,.86);
  border-color: rgba(147,197,253,.24);
}
.layout-v2 {
  --ink: #111827;
  --muted: #52606d;
  --line: rgba(15, 23, 42, .12);
  --panel: rgba(255, 255, 255, .88);
  --brand: #3157d5;
  --brand-2: #0ea5e9;
  --shadow-sm: 0 10px 28px rgba(15, 23, 42, .08);
  --shadow-lg: 0 30px 90px rgba(15, 23, 42, .16);
}
.layout-v2 h1 {
  letter-spacing: 0;
  text-wrap: balance;
}
.layout-v2 p {
  max-width: 72ch;
}
.layout-v2 button {
  box-shadow: 0 10px 24px rgba(49,87,213,.24);
}
.layout-v2 .metric,
.layout-v2 .panel,
.layout-v2 .master-filters,
.layout-v2 .master-table,
.layout-v2 .detail-inspector,
.layout-v2 .ops-lanes,
.layout-v2 .timeline-stream article,
.layout-v2 .ops-detail,
.layout-v2 .corp-sections article,
.layout-v2 .enterprise-modules article {
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow-sm);
}
.layout-v2 .dash-board {
  background:
    linear-gradient(90deg, rgba(15,23,42,.06) 1px, transparent 1px),
    linear-gradient(180deg, #e8eef7, #dfe7f2);
  background-size: 32px 32px, auto;
}
.layout-v2 .dash-status {
  min-height: 62px;
  background: linear-gradient(135deg, #111827, #263956);
  box-shadow: var(--shadow-lg);
}
.layout-v2 .dash-kpis .metric {
  border: 0;
  border-top: 4px solid #3157d5;
}
.layout-v2 .dash-main .panel {
  border: 0;
}
.layout-v2 .dash-table h2,
.layout-v2 .alert-feed h2 {
  font-size: 18px;
}
.layout-v2 .alert-feed {
  background: linear-gradient(180deg, #fff, #f8fafc);
}
.layout-v2 .saas-page {
  position: relative;
}
.layout-v2.layout-landing {
  background:
    linear-gradient(135deg, #fff7ed 0%, #eef5ff 48%, #f8fafc 100%);
}
.layout-v2 .saas-hero {
  gap: 42px;
}
.layout-v2 .saas-hero h1 {
  font-size: 72px;
  line-height: .96;
}
.layout-v2 .saas-hero p {
  color: #344054;
  font-size: 18px;
}
.layout-v2 .product-shot {
  position: relative;
  overflow: hidden;
  transform: rotate(-2deg);
}
.layout-v2 .product-shot::before {
  content: "Live product view";
  display: block;
  margin-bottom: 14px;
  color: #bfdbfe;
  font-weight: 800;
}
.layout-v2 .shot-grid i,
.layout-v2 .shot-top,
.layout-v2 .shot-chart i {
  box-shadow: inset 0 1px 0 rgba(255,255,255,.3);
}
.layout-v2 .ai-workspace {
  background:
    linear-gradient(90deg, #052e16 0 260px, #e8fff3 260px calc(100% - 360px), #111827 calc(100% - 360px));
}
.layout-v2 .writing-canvas {
  min-height: calc(100vh - 48px);
  border: 1px solid rgba(22,101,52,.12);
}
.layout-v2 .doc-block {
  background: linear-gradient(90deg, #e2e8f0, #f8fafc);
}
.layout-v2 .doc-block.large::after {
  content: "";
  display: block;
  width: 64%;
  height: 18px;
  margin: 28px 0 0 24px;
  border-radius: 999px;
  background: #cbd5e1;
}
.layout-v2 .copilot-panel {
  box-shadow: inset 1px 0 0 rgba(255,255,255,.08);
}
.layout-v2 .docs-top {
  position: sticky;
  top: 0;
  z-index: 1;
  box-shadow: 0 1px 0 #e2e8f0;
}
.layout-v2 .docs-shell {
  background: linear-gradient(90deg, #f8fafc 0 260px, #fff 260px calc(100% - 220px), #f8fafc calc(100% - 220px));
}
.layout-v2 .docs-content h1 {
  max-width: 760px;
  font-size: 54px;
}
.layout-v2 .docs-content pre {
  border: 1px solid rgba(255,255,255,.12);
  box-shadow: var(--shadow-sm);
}
.layout-v2 .newspaper {
  min-height: 100vh;
  box-shadow: 0 0 0 1px rgba(17,24,39,.08);
}
.layout-v2 .paper-photo {
  position: relative;
  background:
    linear-gradient(135deg, rgba(17,24,39,.72), rgba(148,163,184,.12)),
    repeating-linear-gradient(45deg, #d9e2ec 0 12px, #f8fafc 12px 24px);
}
.layout-v2 .paper-photo::after {
  content: "FIELD REPORT";
  position: absolute;
  left: 22px;
  bottom: 20px;
  color: #fff;
  font-weight: 900;
  letter-spacing: .08em;
}
.layout-v2 .paper-columns article {
  background: #fffdf7;
}
.layout-v2 .commerce-console {
  background:
    linear-gradient(90deg, #fff8dc 0 250px, #fffcef 250px calc(100% - 345px), #fff  calc(100% - 345px));
}
.layout-v2 .order-board article {
  position: relative;
  overflow: hidden;
}
.layout-v2 .order-board article::after {
  content: "";
  position: absolute;
  right: 18px;
  top: 18px;
  width: 58px;
  height: 58px;
  border-radius: 14px;
  background: linear-gradient(135deg, #fde68a, #fff7ed);
}
.layout-v2 .order-board span {
  line-height: 1;
}
.layout-v2 .crm-board {
  background:
    linear-gradient(180deg, #eff6ff, #f8fafc);
}
.layout-v2 .kanban > div {
  background: linear-gradient(180deg, #fff, #f8fafc);
}
.layout-v2 .kanban article {
  box-shadow: 0 8px 18px rgba(37,99,235,.08);
}
.layout-v2 .account-panel {
  background: #0f172a;
  color: #e5e7eb;
}
.layout-v2 .account-panel h2,
.layout-v2 .account-panel p {
  color: inherit;
}
.layout-v2 .analytics-wall {
  background:
    linear-gradient(90deg, rgba(56,189,248,.06) 1px, transparent 1px),
    linear-gradient(180deg, #020617, #0f172a);
  background-size: 42px 42px, auto;
}
.layout-v2 .signal-hero strong {
  color: #e0f2fe;
}
.layout-v2 .signal-stack {
  display: grid;
  gap: 14px;
}
.layout-v2 .case-study {
  background: linear-gradient(180deg, #fff, #f8fafc);
}
.layout-v2 .case-intro h1 {
  line-height: .95;
}
.layout-v2 .device-frame {
  background:
    linear-gradient(135deg, rgba(17,24,39,.95), rgba(71,85,105,.86));
}
.layout-v2 .device-frame i {
  background: linear-gradient(135deg, #dbeafe, #fff);
}
.layout-v2 .settings-console {
  background: linear-gradient(90deg, #fff 0 280px, #f6f8fb 280px);
}
.layout-v2 .settings-menu {
  box-shadow: 1px 0 0 #e2e8f0;
}
.layout-v2 .matrix-panel table {
  background: #fff;
}
.layout-v2 .onboarding-flow {
  background:
    linear-gradient(135deg, #f0f9ff, #fdf2f8 60%, #fff7ed);
}
.layout-v2 .wizard-card {
  min-height: 560px;
}
.layout-v2 .preview-card {
  background: linear-gradient(180deg, #fff, #f8fafc);
}
.layout-v2 .marketplace-page {
  background: #f8fafc;
}
.layout-v2 .market-search {
  background:
    linear-gradient(135deg, rgba(17,24,39,.94), rgba(30,41,59,.92)),
    linear-gradient(90deg, #3157d5, #0ea5e9);
}
.layout-v2 .market-grid article {
  transition: transform .2s ease;
}
.layout-v2 .market-grid article span {
  background:
    linear-gradient(135deg, rgba(49,87,213,.2), rgba(14,165,233,.08)),
    linear-gradient(90deg, #fff, #f8fafc);
}
.layout-v2 .admin-overview-shell {
  background:
    linear-gradient(90deg, #fff 0 250px, transparent 250px),
    linear-gradient(135deg, #eef2ff, #f8fafc);
}
.layout-v2 .admin-overview-menu {
  box-shadow: 1px 0 0 #dbe4ff;
}
.layout-v2 .admin-overview-main header h1,
.layout-v2 .master-detail-top h1,
.layout-v2 .ops-timeline-top h1 {
  font-size: 38px;
}
.layout-v2 .admin-overview-hero {
  background:
    linear-gradient(135deg, #1e1b4b, #312e81);
}
.layout-v2 .master-detail-shell {
  background:
    linear-gradient(90deg, #f8fafc 0 250px, #eef2f7 250px calc(100% - 340px), #f8fafc calc(100% - 340px));
}
.layout-v2 .master-table table tr:hover td {
  background: #f8fafc;
}
.layout-v2 .detail-inspector {
  background: linear-gradient(180deg, #fff, #f8fafc);
}
.layout-v2 .ops-timeline-shell {
  background:
    linear-gradient(90deg, rgba(49,87,213,.06) 1px, transparent 1px),
    #eef2f7;
  background-size: 36px 36px;
}
.layout-v2 .timeline-stream article {
  background: linear-gradient(90deg, #fff, #f8fafc);
}
.layout-v2 .personal-portfolio-page {
  min-height: 100vh;
  box-shadow: 0 0 0 1px #e2e8f0;
}
.layout-v2 .personal-nav {
  min-height: 52px;
}
.layout-v2 .selected-work article {
  background: #fff;
  box-shadow: var(--shadow-sm);
}
.layout-v2 .featured-work {
  transform: translateY(-12px);
}
.layout-v2 .writing-home {
  background:
    linear-gradient(90deg, #fff 0 280px, #fff8eb 280px calc(100% - 240px), #fff calc(100% - 240px));
}
.layout-v2 .writing-profile {
  position: sticky;
  top: 0;
  height: 100vh;
}
.layout-v2 .writing-feed {
  max-width: 900px;
}
.layout-v2 .corporate-homepage {
  min-height: 100vh;
  background:
    linear-gradient(180deg, #f8fafc 0 62%, #e8eef7 62%);
}
.layout-v2 .corp-nav {
  min-height: 56px;
}
.layout-v2 .corp-proof {
  box-shadow: var(--shadow-lg);
}
.layout-v2 .services-site {
  min-height: 100vh;
  background:
    linear-gradient(180deg, #f4f1ea 0 76%, #e8eef7 76%);
}
.layout-v2 .services-cards article {
  display: grid;
  grid-template-columns: 56px 1fr;
  column-gap: 18px;
}
.layout-v2 .services-cards article p {
  grid-column: 2;
}
.layout-v2 .enterprise-product-page {
  min-height: 100vh;
}
.layout-v2 .enterprise-nav span {
  color: #cbd5e1;
}
.layout-v2 .enterprise-stack div {
  box-shadow: 0 22px 70px rgba(14,165,233,.18);
}
.layout-v2 .enterprise-stack div:nth-child(2) {
  transform: translateX(-34px);
}
.layout-v2 .hero-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  max-width: 720px;
  margin-top: 30px;
}
.layout-v2 .hero-stats span {
  padding: 14px;
  background: rgba(255,255,255,.72);
  border: 1px solid rgba(15,23,42,.1);
  border-radius: 14px;
  box-shadow: var(--shadow-sm);
}
.layout-v2 .hero-stats strong {
  display: block;
  color: #111827;
  font-size: 24px;
}
.layout-v2 .shot-top,
.layout-v2 .shot-grid i {
  display: flex;
  align-items: end;
  justify-content: space-between;
  padding: 16px;
  color: #fff;
  font-style: normal;
  font-weight: 800;
}
.layout-v2 .shot-top span {
  padding: 5px 8px;
  color: #bfdbfe;
  background: rgba(255,255,255,.12);
  border-radius: 999px;
  font-size: 12px;
}
.layout-v2 .shot-grid i {
  align-items: center;
  color: #1e293b;
  background: linear-gradient(135deg, #fff, #dbeafe);
}
.layout-v2 .paper-photo::after {
  content: "";
}
.layout-v2 .paper-photo span {
  position: absolute;
  left: 22px;
  bottom: 20px;
  color: #fff;
  font-weight: 900;
  letter-spacing: .08em;
}
.layout-v2 .byline {
  margin-top: 28px;
  padding-top: 16px;
  border-top: 1px solid #111827;
  color: #475569;
  font-size: 14px;
  font-weight: 700;
}
.layout-v2 .paper-briefs p {
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(17,24,39,.18);
}
.layout-v2 .paper-columns article {
  min-height: 140px;
}
.layout-v2 .paper-columns article span {
  display: block;
  margin-bottom: 18px;
  color: #3157d5;
  font-size: 12px;
  font-weight: 900;
}
.layout-v2 .crm-metrics {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}
.layout-v2 .kanban > div > b {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.layout-v2 .kanban > div > b em {
  width: 26px;
  height: 26px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #2563eb;
  background: #dbeafe;
  border-radius: 999px;
  font-size: 12px;
  font-style: normal;
}
.layout-v2 .kanban article strong,
.layout-v2 .kanban article span,
.layout-v2 .kanban article small {
  display: block;
}
.layout-v2 .kanban article span {
  margin: 8px 0;
  color: #475569;
  font-size: 13px;
}
.layout-v2 .kanban article small {
  color: #3157d5;
  font-weight: 800;
}
.layout-v2 .account-score {
  margin: 22px 0;
  padding: 18px;
  background: rgba(96,165,250,.14);
  border: 1px solid rgba(147,197,253,.28);
  border-radius: 16px;
}
.layout-v2 .account-score strong {
  display: block;
  color: #bfdbfe;
  font-size: 58px;
  line-height: 1;
}
.layout-v2 .account-score span {
  color: #cbd5e1;
}
.layout-v2 .chart-caption {
  display: flex;
  justify-content: space-between;
  margin-top: 14px;
  color: #94a3b8;
  font-size: 12px;
  font-weight: 700;
}
.layout-v2 .segment-card {
  padding: 18px;
  color: #dbeafe;
  background: linear-gradient(135deg, rgba(49,87,213,.28), rgba(14,165,233,.12));
  border: 1px solid rgba(147,197,253,.24);
  border-radius: 8px;
}
.layout-v2 .segment-card strong {
  display: block;
  margin-bottom: 10px;
  color: #fff;
}
.layout-v2 .case-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 26px;
}
.layout-v2 .case-meta span {
  padding: 10px 12px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 999px;
  color: #475569;
  font-size: 13px;
  font-weight: 700;
}
.layout-v2 .device-frame i {
  position: relative;
  overflow: hidden;
}
.layout-v2 .device-frame i span {
  position: absolute;
  left: 20px;
  bottom: 16px;
  color: #1e293b;
  font-style: normal;
  font-weight: 900;
}
.layout-v2 .case-artifact aside hr {
  margin: 22px 0;
  border: 0;
  border-top: 1px solid #e2e8f0;
}
.layout-v2 .source-options {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin: 26px 0;
}
.layout-v2 .source-options label {
  margin: 0;
  padding: 16px;
  background: #f8fafc;
  border: 1px solid #dbeafe;
  border-radius: 16px;
}
.layout-v2 .source-options span {
  display: block;
  margin-top: 10px;
  color: #64748b;
  font-size: 12px;
}
.layout-v2 .preview-note {
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px solid #dbeafe;
}
.layout-v2 .market-filter b:not(:first-child) {
  display: block;
  margin-top: 26px;
}
.layout-v2 .market-grid article small {
  display: inline-flex;
  margin-top: 16px;
  padding: 6px 8px;
  color: #3157d5;
  background: #eef2ff;
  border-radius: 999px;
  font-weight: 800;
}
.layout-v2 .market-grid article .thumb-2,
.layout-v2 .market-grid article .thumb-6 {
  background: linear-gradient(135deg, #fde68a, #f8fafc);
}
.layout-v2 .market-grid article .thumb-3,
.layout-v2 .market-grid article .thumb-7 {
  background: linear-gradient(135deg, #bbf7d0, #f8fafc);
}
.layout-v2 .market-grid article .thumb-4,
.layout-v2 .market-grid article .thumb-8 {
  background: linear-gradient(135deg, #fecdd3, #f8fafc);
}
.layout-v2 .inspector-list {
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid #e2e8f0;
}
.layout-v2 .inspector-list p {
  margin: 10px 0;
  padding: 10px;
  background: #f8fafc;
  border-radius: 10px;
}
.layout-v2 .timeline-stream small {
  display: inline-flex;
  margin-top: 8px;
  padding: 6px 8px;
  color: #3157d5;
  background: #eef2ff;
  border-radius: 999px;
  font-weight: 800;
}
.layout-v2 .ops-detail ul {
  margin: 18px 0;
  padding-left: 18px;
  color: #475569;
  line-height: 1.8;
}
.layout-v2 .writing-profile div {
  margin-top: 32px;
  padding-top: 22px;
  border-top: 1px solid #eadfcb;
}
.layout-v2 .writing-profile strong {
  display: block;
  font-size: 42px;
}
.layout-v2 .writing-feed .featured-essay {
  margin: 20px 0 8px;
  padding: 28px;
  background: #fff;
  border: 1px solid #eadfcb;
  border-radius: 18px;
  box-shadow: var(--shadow-sm);
}
.layout-v2 .services-proof {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 28px;
}
.layout-v2 .services-proof span {
  padding: 10px 12px;
  background: #fff;
  border: 1px solid #d8cbb6;
  border-radius: 999px;
  font-weight: 800;
}
.layout-v2 .quote {
  margin-top: 40px;
  padding: 18px;
  color: #111827;
  background: #f4f1ea;
  border-radius: 12px;
  line-height: 1.55;
}
.layout-v2 .enterprise-stack b,
.layout-v2 .enterprise-stack span {
  display: block;
  color: #fff;
}
.layout-v2 .enterprise-stack div {
  padding: 24px;
}
.layout-v2 .enterprise-stack span {
  margin-top: 10px;
  color: #bfdbfe;
}
.layout-v2 .enterprise-proof {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 28px;
}
.layout-v2 .enterprise-proof span {
  padding: 10px 12px;
  color: #bfdbfe;
  background: rgba(147,197,253,.12);
  border: 1px solid rgba(147,197,253,.22);
  border-radius: 999px;
  font-weight: 800;
}
@media (max-width: 860px) {
  .layout-dashboard, .layout-commerce, .layout-copilot, .layout-docs, .layout-settings, .wizard-shell { display: block; }
  .sidebar, .rail, .docs-nav, .settings-nav, .steps { border-right: 0; border-bottom: 1px solid #d9e2ec; }
  .metrics, .feature-row, .split, .commerce-grid, .lead-grid, .pipeline, .case-grid, .catalog { grid-template-columns: 1fr; }
  .hero h1, .lead h1, .case-hero h1, .market-hero h1 { font-size: 38px; }
  .layout-v2 .dash-board { margin-left: 0; }
  .layout-v2 .dash-rail { position: static; width: auto; }
  .layout-v2 .dash-kpis,
  .layout-v2 .dash-main,
  .layout-v2 .saas-hero,
  .layout-v2 .ai-workspace,
  .layout-v2 .docs-shell,
  .layout-v2 .paper-grid,
  .layout-v2 .paper-columns,
  .layout-v2 .commerce-console,
  .layout-v2 .crm-board,
  .layout-v2 .signal-grid,
  .layout-v2 .case-artifact,
  .layout-v2 .case-story,
  .layout-v2 .settings-console,
  .layout-v2 .form-grid,
  .layout-v2 .onboarding-flow,
  .layout-v2 .marketplace-page,
  .layout-v2 .market-grid,
  .layout-v2 .admin-overview-shell,
  .layout-v2 .admin-overview-grid,
  .layout-v2 .admin-overview-panels,
  .layout-v2 .master-detail-shell,
  .layout-v2 .ops-summary,
  .layout-v2 .ops-board,
  .layout-v2 .selected-work,
  .layout-v2 .writing-home,
  .layout-v2 .corp-proof,
  .layout-v2 .corp-sections,
  .layout-v2 .services-layout,
  .layout-v2 .enterprise-hero,
  .layout-v2 .enterprise-modules {
    display: block;
  }
}
</style>
</head>
<body class="layout-v2 layout-${layout.pattern}">
${renderLayoutBodyV2(layout)}
</body>
</html>
`;
}

function ensureLayoutHtmlFiles() {
  fs.mkdirSync(layoutsDir, { recursive: true });

  return layoutCatalog.map((layout) => {
    const layoutDir = path.join(layoutsDir, layout.slug);
    const htmlFile = path.join(layoutDir, `${layout.slug}.html`);
    fs.mkdirSync(layoutDir, { recursive: true });
    fs.writeFileSync(htmlFile, renderLayoutHtml(layout));
    return htmlFile;
  });
}

function findLayoutHtmlFiles() {
  return layoutCatalog
    .map((layout) => path.join(layoutsDir, layout.slug, `${layout.slug}.html`))
    .filter((htmlFile) => fs.existsSync(htmlFile));
}

function screenshot(htmlFile) {
  const inputPath = htmlFile;
  const outputPath = inputPath.replace(/\.html$/, ".png");

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

  return outputPath;
}

function buildStyleCards(imageFiles) {
  return imageFiles
    .map((imageFile) => {
      const slug = path.basename(imageFile, ".png");
      const style = styleCatalog[slug] || {
        version: slug.replace(/^version-/, "").slice(0, 1).toUpperCase(),
        name: slug,
        zhName: slug,
        bestFor: "web UI work",
        zhBestFor: "Web UI work",
      };
      const imageHref = path.relative(outputDir, imageFile).split(path.sep).join("/");
      const htmlHref = imageHref.replace(/\.png$/, ".html");
      const prompt = `Use awesome-page-design style: Version ${style.version} - ${style.name}. Apply its visual language, but do not copy the sample layout.`;
      const zhPrompt = `使用 awesome-page-design 风格：Version ${style.version} - ${style.name}（${style.zhName}）。请应用它的视觉语言，但不要复制示例布局。`;
      return `      <article class="card">
        <a class="preview" href="${escapeHtml(htmlHref)}" aria-label="Open Version ${escapeHtml(style.version)} ${escapeHtml(style.name)} HTML preview">
          <img src="${escapeHtml(imageHref)}" alt="Version ${escapeHtml(style.version)} - ${escapeHtml(style.name)} preview" loading="lazy">
        </a>
        <div class="card-body">
          <div class="card-kicker"><span data-i18n="version">Version</span> ${escapeHtml(style.version)}</div>
          <h2><span data-en="${escapeHtml(style.name)}" data-zh="${escapeHtml(style.zhName)}">${escapeHtml(style.name)}</span></h2>
          <p data-en="${escapeHtml(style.bestFor)}" data-zh="${escapeHtml(style.zhBestFor)}">${escapeHtml(style.bestFor)}</p>
          <div class="actions">
            <button type="button" data-copy-en="${escapeHtml(prompt)}" data-copy-zh="${escapeHtml(zhPrompt)}" data-i18n="copy">Copy style prompt</button>
            <a href="${escapeHtml(htmlHref)}" data-i18n="openHtml">Open HTML</a>
          </div>
        </div>
      </article>`;
    })
    .join("\n");
}

function buildLayoutCards(imageFiles) {
  return imageFiles
    .map((imageFile) => {
      const slug = path.basename(imageFile, ".png");
      const layout = layoutCatalog.find((item) => item.slug === slug) || {
        id: slug.toUpperCase(),
        name: slug,
        zhName: slug,
        bestFor: "web UI structure",
        zhBestFor: "Web UI 结构",
      };
      const imageHref = path.relative(outputDir, imageFile).split(path.sep).join("/");
      const htmlHref = imageHref.replace(/\.png$/, ".html");
      const prompt = `Use awesome-page-design layout framework: ${layout.id} - ${layout.name}. Apply its structure, navigation model, density, hierarchy, and required states, but adapt the content and visual style to the product requirements.`;
      const zhPrompt = `使用 awesome-page-design 布局框架：${layout.id} - ${layout.name}（${layout.zhName}）。请应用它的结构、导航模型、信息密度、层级和必备状态，但根据真实产品需求调整内容和视觉风格。`;
      return `      <article class="card">
        <a class="preview" href="${escapeHtml(htmlHref)}" aria-label="Open ${escapeHtml(layout.id)} ${escapeHtml(layout.name)} HTML preview">
          <img src="${escapeHtml(imageHref)}" alt="${escapeHtml(layout.id)} - ${escapeHtml(layout.name)} preview" loading="lazy">
        </a>
        <div class="card-body">
          <div class="card-kicker"><span data-i18n="layout">Layout</span> ${escapeHtml(layout.id)}</div>
          <h2><span data-en="${escapeHtml(layout.name)}" data-zh="${escapeHtml(layout.zhName)}">${escapeHtml(layout.name)}</span></h2>
          <p data-en="${escapeHtml(layout.bestFor)}" data-zh="${escapeHtml(layout.zhBestFor)}">${escapeHtml(layout.bestFor)}</p>
          <div class="actions">
            <button type="button" data-copy-kind="layout" data-copy-en="${escapeHtml(prompt)}" data-copy-zh="${escapeHtml(zhPrompt)}" data-i18n="copyLayout">Copy layout prompt</button>
            <a href="${escapeHtml(htmlHref)}" data-i18n="openHtml">Open HTML</a>
          </div>
        </div>
      </article>`;
    })
    .join("\n");
}

function writeIndex(styleImages, layoutImages) {
  const styleCards = buildStyleCards(styleImages);
  const layoutCards = buildLayoutCards(layoutImages);
  const totalCount = styleImages.length + layoutImages.length;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Awesome Page Design Previews</title>
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
  align-items: flex-start;
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
.hint {
  max-width: 720px;
  margin: 10px 0 0;
  color: #475467;
  font-size: 14px;
  line-height: 1.6;
}
.lang-toggle {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 3px;
  background: #ffffff;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(15,23,42,0.06);
}
.lang-toggle button {
  min-width: 48px;
  height: 30px;
  padding: 0 10px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #667085;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}
.lang-toggle button.active {
  background: #4f46e5;
  color: #ffffff;
}
.controls {
  max-width: 1440px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}
.tabs {
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  background: #ffffff;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(15,23,42,0.06);
}
.tabs button {
  min-height: 34px;
  padding: 0 12px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #667085;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}
.tabs button.active {
  background: #1f2937;
  color: #ffffff;
}
.count {
  color: #667085;
  font-size: 13px;
}
.grid {
  max-width: 1440px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}
.grid[hidden] {
  display: none;
}
.card {
  overflow: hidden;
  color: inherit;
  background: #ffffff;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(15,23,42,0.08);
}
.preview {
  display: block;
  color: inherit;
  text-decoration: none;
}
.preview img {
  display: block;
  width: 100%;
  aspect-ratio: ${viewportWidth} / ${viewportHeight};
  object-fit: cover;
  object-position: top;
  background: #e5e7eb;
}
.card-body {
  padding: 14px;
  border-top: 1px solid rgba(0,0,0,0.06);
}
.card-kicker {
  color: #4f46e5;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.card h2 {
  margin: 4px 0 6px;
  font-size: 16px;
  line-height: 1.3;
  letter-spacing: 0;
}
.card p {
  min-height: 42px;
  margin: 0;
  color: #667085;
  font-size: 14px;
  line-height: 1.5;
}
.actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
}
.actions button,
.actions a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  padding: 0 10px;
  border-radius: 6px;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
}
.actions button {
  color: #ffffff;
  background: #4f46e5;
  border: 1px solid #4f46e5;
  cursor: pointer;
}
.actions button.copied {
  background: #059669;
  border-color: #059669;
}
.actions a {
  color: #344054;
  background: #ffffff;
  border: 1px solid rgba(0,0,0,0.12);
}
@media (max-width: 640px) {
  body { padding: 16px; }
  .header { display: block; }
  .lang-toggle { margin-top: 14px; }
  .controls { display: block; }
  .count { margin-top: 10px; }
  .grid { grid-template-columns: 1fr; gap: 16px; }
}
</style>
</head>
<body>
  <header class="header">
    <div>
      <h1>Web Style Templates Previews</h1>
      <p class="meta">${totalCount} previews, viewport ${viewportWidth}x${viewportHeight}</p>
      <p class="hint">Compare visual styles and layout frameworks. Copy a prompt, send it to your AI agent, and it can apply the chosen direction without copying the sample content.</p>
    </div>
    <div class="lang-toggle" aria-label="Language">
      <button type="button" class="active" data-lang="en">EN</button>
      <button type="button" data-lang="zh">中文</button>
    </div>
  </header>
  <section class="controls" aria-label="Preview category">
    <div class="tabs">
      <button type="button" class="active" data-tab="styles" data-i18n="tabStyles">Visual Styles</button>
      <button type="button" data-tab="layouts" data-i18n="tabLayouts">Layout Frameworks</button>
    </div>
    <div class="count" data-i18n="sectionCount">${styleImages.length} visual styles, ${layoutImages.length} layout frameworks</div>
  </section>
  <main class="grid" data-panel="styles">
${styleCards}
  </main>
  <main class="grid" data-panel="layouts" hidden>
${layoutCards}
  </main>
  <script>
  const copy = {
    en: {
      title: 'Awesome Page Design Previews',
      meta: '${totalCount} previews, viewport ${viewportWidth}x${viewportHeight}',
      hint: 'Compare visual styles and layout frameworks. Copy a prompt, send it to your AI agent, and it can apply the chosen direction without copying the sample content.',
      tabStyles: 'Visual Styles',
      tabLayouts: 'Layout Frameworks',
      sectionCount: '${styleImages.length} visual styles, ${layoutImages.length} layout frameworks',
      version: 'Version',
      layout: 'Layout',
      copy: 'Copy style prompt',
      copyLayout: 'Copy layout prompt',
      copied: 'Copied',
      openHtml: 'Open HTML',
      promptFallback: 'Copy this style prompt:'
    },
    zh: {
      title: 'Awesome Page Design 预览',
      meta: '${totalCount} 个预览，视口 ${viewportWidth}x${viewportHeight}',
      hint: '直观看图比较视觉风格和布局框架。点击复制提示词，发送给你的 AI，它会应用选定方向但不复制示例内容。',
      tabStyles: '视觉风格',
      tabLayouts: '布局框架',
      sectionCount: '${styleImages.length} 个视觉风格，${layoutImages.length} 个布局框架',
      version: '版本',
      layout: '布局',
      copy: '复制风格提示词',
      copyLayout: '复制布局提示词',
      copied: '已复制',
      openHtml: '打开 HTML',
      promptFallback: '复制这个提示词：'
    }
  };
  let activeLang = 'en';

  function applyLanguage(lang) {
    activeLang = lang;
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.querySelector('h1').textContent = copy[lang].title;
    document.querySelector('.meta').textContent = copy[lang].meta;
    document.querySelector('.hint').innerHTML = copy[lang].hint;
    document.querySelectorAll('[data-i18n]').forEach((node) => {
      node.textContent = copy[lang][node.dataset.i18n];
    });
    document.querySelectorAll('[data-en][data-zh]').forEach((node) => {
      node.textContent = node.dataset[lang];
    });
    document.querySelectorAll('.lang-toggle button').forEach((button) => {
      button.classList.toggle('active', button.dataset.lang === lang);
    });
  }

  function applyTab(tab) {
    document.querySelectorAll('[data-panel]').forEach((panel) => {
      panel.hidden = panel.dataset.panel !== tab;
    });
    document.querySelectorAll('[data-tab]').forEach((button) => {
      button.classList.toggle('active', button.dataset.tab === tab);
    });
  }

  document.querySelectorAll('.lang-toggle button').forEach((button) => {
    button.addEventListener('click', () => applyLanguage(button.dataset.lang));
  });

  document.querySelectorAll('[data-tab]').forEach((button) => {
    button.addEventListener('click', () => applyTab(button.dataset.tab));
  });

  document.querySelectorAll('[data-copy-en]').forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.getAttribute(activeLang === 'zh' ? 'data-copy-zh' : 'data-copy-en');
      const copyKey = button.dataset.copyKind === 'layout' ? 'copyLayout' : 'copy';
      try {
        await navigator.clipboard.writeText(value);
        button.textContent = copy[activeLang].copied;
        button.classList.add('copied');
        setTimeout(() => {
          button.textContent = copy[activeLang][copyKey];
          button.classList.remove('copied');
        }, 1600);
      } catch {
        window.prompt(copy[activeLang].promptFallback, value);
      }
    });
  });
  </script>
</body>
</html>
`;

  fs.writeFileSync(path.join(outputDir, "index.html"), html);
}

function main() {
  if (!fs.existsSync(chromePath)) {
    throw new Error(`Chrome was not found: ${chromePath}\nSet CHROME_PATH=/path/to/chrome to use another browser path.`);
  }

  fs.mkdirSync(outputDir, { recursive: true });
  ensureLayoutHtmlFiles();

  const styleHtmlFiles = findStyleHtmlFiles();
  const layoutHtmlFiles = findLayoutHtmlFiles();
  if (styleHtmlFiles.length === 0) {
    throw new Error("No version-*.html files were found under skills/awesome-page-design/assets/styles/.");
  }
  if (layoutHtmlFiles.length === 0) {
    throw new Error("No layout HTML files were generated under skills/awesome-page-design/assets/layouts/.");
  }

  console.log(`Generating ${styleHtmlFiles.length} style previews and ${layoutHtmlFiles.length} layout previews...`);
  const styleImages = [];
  const layoutImages = [];

  for (const htmlFile of styleHtmlFiles) {
    process.stdout.write(`- ${path.relative(rootDir, htmlFile)} -> `);
    const imageFile = screenshot(htmlFile);
    styleImages.push(imageFile);
    process.stdout.write(`${path.relative(rootDir, imageFile)}\n`);
  }

  for (const htmlFile of layoutHtmlFiles) {
    process.stdout.write(`- ${path.relative(rootDir, htmlFile)} -> `);
    const imageFile = screenshot(htmlFile);
    layoutImages.push(imageFile);
    process.stdout.write(`${path.relative(rootDir, imageFile)}\n`);
  }

  writeIndex(styleImages, layoutImages);
  console.log(`Done. Open ${path.relative(rootDir, path.join(outputDir, "index.html"))}`);
}

main();
