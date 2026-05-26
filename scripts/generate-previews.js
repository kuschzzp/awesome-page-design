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
      return `<main class="admin-shell">
        <aside class="admin-sidebar"><b>NorthOps</b><small>Enterprise console</small><a class="active">Overview</a><a>Orders</a><a>Content review</a><a>Growth cohorts</a><a>Billing</a><a>Risk alerts</a><a>Permissions</a><div class="admin-user"><strong>MC</strong><span>Maya Chen<br>Ops lead</span></div></aside>
        <section class="admin-main"><header class="admin-top"><div><p class="eyebrow">${layout.id}</p><h1>Operations control room</h1><span>Live business health across orders, content review, revenue, and system risk.</span></div><div class="admin-actions"><input value="Search order, user, SKU, owner"><button>Export report</button><button class="secondary">Create task</button></div></header>
        <section class="admin-alert"><b>3 exceptions need owner</b><span>Subscription legal note, inventory sync, and growth anomaly crossed SLA thresholds.</span><button>Assign now</button></section>
        <section class="dash-filters"><label>Date <input value="Today"></label><label>Team <input value="All operation teams"></label><label>Priority <input value="High and medium"></label><label>Region <input value="North / East"></label><button>Apply filters</button></section>
        <section class="dash-kpis">${renderMetric("GMV", "¥482K", "+18%")}${renderMetric("Pending review", "34", "-7")}${renderMetric("SLA health", "98%", "stable")}${renderMetric("Paid lift", "7.4%", "+1.2%")}${renderMetric("Alerts", "9", "open")}</section>
        <section class="dash-main"><article class="panel revenue-panel"><header><h2>Revenue pulse</h2><span>Last 12 hours</span></header><div class="admin-bars">${[44, 58, 36, 72, 64, 88, 53, 79, 62, 94, 76, 68].map((height) => `<i style="height:${height}%"></i>`).join("")}</div><div class="panel-foot"><span>Conversion +1.2%</span><span>Refund risk -4%</span></div></article><div class="panel dash-table"><h2>Priority work items</h2>${renderTable(newsRows)}</div><aside class="panel action-queue"><h2>Action queue</h2><p><b>Assign</b><span>Route high-priority review to legal owner</span></p><p><b>Recheck</b><span>Subscription note needs policy confirmation</span></p><p><b>Publish</b><span>Homepage slot releases in 22 minutes</span></p><p><b>Escalate</b><span>Growth anomaly crossed threshold</span></p><button>Open queue</button></aside></section>
        <section class="admin-bottom"><article class="panel heatmap-panel"><h2>Team workload</h2><div class="admin-heatmap">${Array.from({ length: 48 }, (_, index) => `<i class="level-${(index % 4) + 1}"></i>`).join("")}</div></article><article class="panel system-panel"><h2>System status</h2><p><b>Checkout</b><span>Healthy</span></p><p><b>Content API</b><span>Degraded</span></p><p><b>Search index</b><span>Syncing</span></p></article><article class="panel decision-panel"><h2>Decision brief</h2><p>Prioritize legal review and inventory sync before the afternoon growth review. Revenue remains above target.</p><button>Run daily review</button></article></section></section>
      </main>`;
    case "landing":
      return `<main class="saas-page">
        <nav class="saas-nav"><div class="saas-brand"><b>DailySignal</b><span>Editorial revenue OS</span></div><div class="saas-links"><span>Product</span><span>Workflows</span><span>Customers</span><span>Security</span><span>Pricing</span></div><div class="saas-nav-actions"><button class="secondary">View dashboard</button><button>Start trial</button></div></nav>
        <section class="saas-hero"><div class="saas-copy"><p class="eyebrow">${layout.id}</p><h1>Launch every edition with audience, revenue, and risk in one room.</h1><p>DailySignal turns the messy morning handoff into a live operating layer for editors, growth teams, and subscriber revenue leads.</p><div class="hero-actions"><button>Book demo</button><button class="secondary">Explore workflows</button></div><div class="hero-stats"><span><strong>42%</strong> faster homepage decisions</span><span><strong>18k</strong> live reader signals</span><span><strong>12 min</strong> saved per launch review</span></div></div><aside class="product-shot"><div class="shot-top"><div><b>Edition command</b><span>Today 08:42</span></div><em>Live</em></div><div class="shot-grid"><i><b>Lead slot</b><span>Ready</span></i><i><b>Paywall lift</b><span>+7.8%</span></i><i><b>Source risk</b><span>2 claims</span></i><i><b>Audience</b><span>18.2k</span></i></div><div class="shot-chart"><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="shot-table"><p><b>Legal review</b><span>Owner assigned</span></p><p><b>Push window</b><span>14 min remaining</span></p><p><b>Subscriber angle</b><span>Ready for send</span></p></div></aside></section>
        <section class="logo-strip"><span>Trusted by launch teams at</span><b>MorningDesk</b><b>NorthWire</b><b>SignalPost</b><b>DailyIndex</b></section>
        <section class="saas-feature-grid"><article><b>01</b><h2>Plan the edition</h2><p>Bring story priority, owners, embargoes, and launch blockers into one command view.</p></article><article><b>02</b><h2>Measure the signal</h2><p>Connect page decisions to reader intent, conversion lift, retention, and churn risk.</p></article><article><b>03</b><h2>Automate reviews</h2><p>Route legal, source, and homepage checks before the morning window closes.</p></article></section>
        <section class="saas-workflow"><div><span>Workflow preview</span><h2>From pitch to paid subscriber in five controlled handoffs.</h2></div><ol><li><b>Brief</b><span>Desk lead sets priorities</span></li><li><b>Verify</b><span>Claims and sources checked</span></li><li><b>Package</b><span>Audience angle selected</span></li><li><b>Launch</b><span>Homepage and push go live</span></li><li><b>Learn</b><span>Revenue impact reported</span></li></ol></section>
      </main>`;
    case "copilot":
      return `<main class="ai-workspace">
        <aside class="thread-list"><div class="workspace-mark"><b>Signal Copilot</b><span>Policy desk</span></div><button class="new-run">New run</button><p class="active">Policy briefing run<span>4 tools · 2 approvals</span></p><p>Market explainer<span>Drafting</span></p><p>Subscriber Q&A<span>Needs approval</span></p><p>Source check<span>Complete</span></p><div class="context-stack"><strong>Knowledge</strong><em>7 sources attached</em><em>3 workspace memories</em><em>2 human reviewers</em></div><div class="source-grid"><span>SEC</span><span>Federal</span><span>Calls</span><span>Notes</span></div></aside>
        <section class="writing-canvas"><header class="artifact-toolbar"><div><p class="eyebrow">${layout.id}</p><h1>Morning policy briefing</h1><span>Drafting surface with evidence, tool trace, and approval states visible at once.</span></div><div><button class="secondary">Compare</button><button>Approve draft</button></div></header><nav class="workspace-tabs"><b>Artifact</b><span>Sources</span><span>Diff</span><span>Approvals</span></nav><article class="artifact-card"><span class="doc-kicker">Lead paragraph</span><h2>Agencies tighten oversight as enterprise AI deployments move into daily operations.</h2><p>The briefing combines policy notices, earnings-call language, and internal source notes. Claims without source confidence are routed to the review rail before publishing.</p><div class="evidence-row"><span>Federal register</span><span>Reuters</span><span>Internal notes</span></div></article><section class="artifact-grid"><div class="claim-card risk"><b>Unsupported claim</b><p>Market adoption figure needs a primary source.</p><em>Blocked</em></div><div class="claim-card good"><b>Verified</b><p>Policy deadline matched against official guidance.</p><em>92%</em></div><div class="claim-card"><b>Human review</b><p>Editor should approve tone before subscriber send.</p><em>Queued</em></div></section><section class="draft-metadata"><div><b>Audience</b><span>Enterprise subscribers</span></div><div><b>Tone</b><span>Neutral, brief, sourced</span></div><div><b>Publish window</b><span>11:30 AM</span></div></section><section class="workspace-review"><article><b>Citation map</b><p><span>Primary source</span><strong>2 linked</strong></p><p><span>Internal memo</span><strong>1 linked</strong></p><p><span>Needs source</span><strong>1 open</strong></p></article><article><b>Approval path</b><ol><li>Desk editor review</li><li>Legal claim check</li><li>Subscriber send approval</li></ol></article></section><footer class="run-queue"><b>Run queue</b><span class="running">Fact-checking</span><span>Rewrite lead</span><span>Generate citations</span></footer></section>
        <aside class="copilot-panel"><header><h2>Copilot</h2><span>Model · tools · approvals</span></header><div class="chat user">Tighten the lead and flag unsupported claims.</div><div class="tool-call"><b>Tool call</b><span>search_sources.run</span><em>12 results · 3 primary</em></div><div class="tool-timeline"><p><b>1</b><span>Read source pack</span></p><p><b>2</b><span>Rewrite paragraph</span></p><p><b>3</b><span>Attach citations</span></p></div><div class="chat ai">Lead revised. One market statistic needs a source and the legal paragraph should stay unchanged.</div><div class="approval-card"><b>Approval needed</b><p>Apply rewrite to paragraph 1 and keep citations attached?</p><button>Apply revision</button><button class="secondary">Review diff</button></div></aside>
      </main>`;
    case "docs":
      return `<header class="docs-top"><div class="docs-product"><b>Awesome Page Design</b><span>Skill reference</span></div><label class="docs-search"><span>Search</span><input value="Find layouts, styles, prompts, screenshots"><em>Cmd K</em></label><div class="docs-actions"><button class="secondary">API</button><button>GitHub</button></div></header>
      <main class="docs-shell"><aside class="docs-tree"><div class="docs-tree-head"><b>Navigation</b><span>v2.4</span></div><a>Quickstart</a><a>Install with npx</a><a class="active">Layout frameworks</a><a>Style systems</a><a>Preview server</a><div class="doc-tags"><span>Popular</span><span>CLI</span><span>Gallery</span></div><b>Reference</b><a>Prompt contract</a><a>Screenshot assets</a><a>Quality checks</a><a>Packaging</a></aside>
      <article class="docs-content"><p class="eyebrow">${layout.id}</p><h1>Compose a daily news interface</h1><p>Choose one visual style, choose one layout framework, then adapt the structure to the product's real states and content density.</p><div class="docs-callout"><b>Preview gate</b><span>Open the local gallery first, compare visual direction, then copy the selected style and layout prompts before implementation.</span></div><section class="docs-card-grid"><article><b>01</b><h2>Select</h2><p>Pick style and structure from the preview gallery.</p></article><article><b>02</b><h2>Adapt</h2><p>Map the framework to real workflow states.</p></article><article><b>03</b><h2>Verify</h2><p>Regenerate screenshots and check the final package.</p></article></section><pre><code>Use awesome-page-design layout framework: ${layout.id} - ${layout.name}
Use visual style: Version R - Carbon Enterprise
Adapt both to the product workflow.</code></pre><h2>Implementation checklist</h2><ol><li>Map navigation and primary task zones.</li><li>Define empty, loading, and error states.</li><li>Keep sample copy out of production UI.</li></ol><table class="param-table"><thead><tr><th>Field</th><th>Meaning</th><th>Required</th></tr></thead><tbody><tr><td>layout</td><td>Structural framework to apply</td><td>Yes</td></tr><tr><td>style</td><td>Visual language and component tone</td><td>Yes</td></tr><tr><td>states</td><td>Loading, empty, error, permissions</td><td>Recommended</td></tr></tbody></table><nav class="docs-next"><a>Previous: Style systems</a><a>Next: Preview workflow</a></nav></article>
      <aside class="docs-anchor"><b>On this page</b><a class="active">Overview</a><a>Preview gate</a><a>Prompt</a><a>Checklist</a><a>Parameters</a><div class="floating-tags"><span>API</span><span>SDK</span><span>CLI</span><span>Examples</span><span>Assets</span><span>Checks</span></div></aside></main>`;
    case "news":
      return `<main class="newspaper">
        <header class="paper-head"><span>Tuesday, May 19</span><b>The Daily Index</b><span>Global Edition</span></header>
        <nav class="paper-nav"><span>World</span><span>Business</span><span>Technology</span><span>Culture</span><span>Climate</span><span>Opinion</span><span>Live</span></nav>
        <section class="paper-grid"><article class="paper-lead"><p class="eyebrow">${layout.id}</p><h1>Markets climb as energy talks restart before the closing bell.</h1><p>Editors are tracking investor reaction, policy risk, and reader sentiment through the morning cycle.</p><div class="byline">By Maya Chen and Noah Park · 8 min read</div></article><article class="paper-photo"><span>FIELD REPORT</span></article><aside class="paper-briefs"><h2>Latest</h2><p><b>Climate</b> resilience tracker updates after coastal vote.</p><p><b>Technology</b> chip stocks recover after guidance update.</p><p><b>Opinion</b> subscriber forum opens for policy questions.</p><p><b>Markets</b> futures open higher in Asia.</p><p><b>Live</b> central bank remarks in 18 minutes.</p></aside></section>
        <section class="paper-columns"><article><span>Analysis</span><h2>Regional desks compare price movement against the policy calendar.</h2><p>Three factors are shaping the afternoon close: energy talks, rate expectations, and a narrow currency window.</p></article><article><span>Economy</span><h2>Central bank watchers expect a narrower signal window.</h2><p>Investors are watching one paragraph in the policy statement for guidance.</p></article><article><span>Culture</span><h2>Readers shift to shorter morning briefings.</h2><p>Audio summaries and curated newsletters keep subscribers engaged.</p></article><article><span>World</span><h2>Trade negotiators extend talks into the evening.</h2><p>Officials say a limited framework could be published this week.</p></article></section>
        <section class="paper-bottom"><article><b>Most read</b><ol><li>Five charts explain the sudden rally</li><li>Inside the new climate resilience fund</li><li>How morning newsletters changed politics</li></ol></article><article><b>Editorial desk</b><p>Homepage lead, live coverage, and opinion balance are reviewed every 20 minutes.</p></article><article><b>Subscriber edition</b><p>Tomorrow's briefing includes a data notebook, audio recap, and market explainer.</p></article></section>
      </main>`;
    case "commerce":
      return `<main class="commerce-console">
        <header class="commerce-top"><div><p class="eyebrow">${layout.id}</p><h1>Orders and fulfillment</h1><span>Saved views, analytics, bulk actions, and order detail stay visible together.</span></div><div><button class="secondary">Import CSV</button><button>Create order</button></div></header>
        <aside class="commerce-filters"><b>Saved views</b><a class="active">Unfulfilled <span>42</span></a><a>Ready to ship <span>18</span></a><a>On hold <span>9</span></a><a>Returns <span>7</span></a><b>Filter</b><label><input type="checkbox" checked> Paid</label><label><input type="checkbox" checked> Subscriber bundles</label><label><input type="checkbox"> Low inventory</label><label><input type="checkbox"> International</label><b>Bulk action</b><button>Print labels</button><button class="secondary">Hold shipment</button></aside>
        <section class="order-workbench"><div class="order-analytics">${renderMetric("Total orders", "184", "+12%")}${renderMetric("Items ordered", "612", "+8%")}${renderMetric("Returns", "7", "-2")}${renderMetric("Time to fulfill", "5.4h", "-18m")}</div><div class="commerce-toolbar"><input value="Search orders, customer, email, SKU"><button>Filter</button><button class="secondary">Sort</button><button class="secondary">Columns</button></div><div class="fulfillment-lanes"><article><b>Paid</b><span>42</span><em>ready to pick</em></article><article><b>Packed</b><span>18</span><em>label needed</em></article><article><b>Shipped</b><span>73</span><em>in transit</em></article><article><b>Returns</b><span>7</span><em>needs review</em></article></div><table><thead><tr><th>Order</th><th>Customer</th><th>Channel</th><th>Inventory</th><th>Fulfillment</th><th>Total</th></tr></thead><tbody><tr><td>#1842 Brief Pack</td><td>Maya Chen</td><td>Online store</td><td>Ready</td><td><span class="pill">Pick</span></td><td>$420</td></tr><tr><td>#1841 Market Bundle</td><td>Noah Park</td><td>Subscription</td><td>Low stock</td><td><span class="pill hold">Hold</span></td><td>$280</td></tr><tr><td>#1839 Policy Annual</td><td>Ava Lin</td><td>B2B</td><td>Ready</td><td><span class="pill">Pack</span></td><td>$960</td></tr><tr><td>#1838 Campus Edition</td><td>Iris Cole</td><td>POS</td><td>Ready</td><td><span class="pill done">Ship</span></td><td>$180</td></tr><tr><td>#1837 Editorial Kit</td><td>Ryan Xu</td><td>Online store</td><td>Ready</td><td><span class="pill">Pick</span></td><td>$340</td></tr></tbody></table><section class="commerce-bottom"><article><h2>Inventory alerts</h2><p><b>Market Bundle</b><span>11 units left · reorder suggested</span></p><p><b>Editorial Kit</b><span>Supplier delay · ship date at risk</span></p></article><article><h2>Fulfillment timeline</h2><p><b>10:12</b><span>Labels purchased for 18 packed orders.</span></p><p><b>09:48</b><span>Subscription batch moved to pick queue.</span></p></article></section></section>
        <aside class="order-drawer"><h2>#1842 Brief Pack</h2><p>Priority subscriber bundle is waiting on final stock confirmation before label purchase.</p><div class="customer-card"><b>Maya Chen</b><span>VIP subscriber · New York</span></div>${renderMetric("Items", "42", "ready")}${renderMetric("Fulfillment", "86%", "+9")}<div class="drawer-steps"><span class="done">Paid</span><span class="active">Pick</span><span>Pack</span><span>Ship</span></div><div class="drawer-notes"><b>Staff notes</b><p>Gift wrap requested. Ship with Saturday delivery.</p><p>Inventory check assigned to Kai.</p></div></aside>
      </main>`;
    case "crm":
      return `<main class="crm-board">
        <aside class="crm-rail"><b>云销 CRM</b><a class="active">销售工作台</a><a>客户管理</a><a>商机跟进</a><a>拜访计划</a><a>销售简报</a><a>合同回款</a></aside>
        <section class="crm-main"><header class="crm-top"><div><p class="eyebrow">${layout.id}</p><h1>客户经营工作台</h1><span>线索、商机、跟进、回款和客户 360 统一在一屏处理。</span></div><div><button class="secondary">导入线索</button><button>新增客户</button></div></header>
        <section class="crm-metrics">${renderMetric("销售漏斗", "¥482万", "+18%")}${renderMetric("重点客户", "128", "+9")}${renderMetric("赢单率", "34%", "+4%")}${renderMetric("今日待办", "42", "需跟进")}</section>
        <section class="crm-content"><div class="crm-funnel"><h2>销售漏斗</h2><div class="funnel-bars"><span style="width:100%">线索 ¥620万</span><span style="width:82%">需求 ¥508万</span><span style="width:64%">报价 ¥396万</span><span style="width:46%">合同 ¥284万</span></div></div><div class="crm-task-list"><h2>今日工作圈</h2><p><b>09:30</b><span>跟进 Regional Newsroom 报价</span></p><p><b>11:00</b><span>回访教育行业线索池</span></p><p><b>14:00</b><span>审批 Finance Research 折扣</span></p></div></section>
        <section class="kanban"><div><b>线索 <em>2</em></b><article><strong>Daily Brief Pro</strong><span>¥18万 · 北京</span><small>周五试用</small></article><article><strong>Campus Bundle</strong><span>¥9万 · 教育</span><small>缺少决策人</small></article></div><div><b>需求确认 <em>2</em></b><article><strong>Policy Watch Group</strong><span>¥42万 · 公共事务</span><small>已发使用报告</small></article><article><strong>Market Desk Team</strong><span>¥31万 · 金融</span><small>法务审核</small></article></div><div><b>报价谈判 <em>2</em></b><article class="hot"><strong>Regional Newsroom</strong><span>¥86万 · 媒体集团</span><small>82% 赢单概率</small></article><article><strong>Finance Research</strong><span>¥54万 · 分析团队</span><small>明日价格会议</small></article></div><div><b>赢单 <em>1</em></b><article><strong>Executive Edition</strong><span>¥120万 · 企业</span><small>续约完成</small></article></div></section><section class="crm-bottom"><article><h2>回款计划</h2><p><b>本周应收</b><span>¥96万 · 6 笔</span></p><p><b>风险合同</b><span>2 个客户需经理协助</span></p></article><article><h2>销售排行</h2><p><b>王敏</b><span>¥128万 · 4 单</span></p><p><b>陈涛</b><span>¥92万 · 3 单</span></p></article><article><h2>客户健康</h2><p><b>高价值客户</b><span>18 家活跃，3 家沉默</span></p><p><b>续约提醒</b><span>7 天内到期 5 家</span></p></article></section></section>
        <aside class="account-panel"><h2>Regional Newsroom</h2><p>客户需要共享编辑分析、AI Brief 审核和账号级使用报告。</p><div class="account-score"><strong>82%</strong><span>赢单预测</span></div><div class="customer-360"><span>行业：媒体集团</span><span>阶段：报价谈判</span><span>联系人：Maya Chen</span><span>回款风险：低</span></div><div class="timeline"><p>完成产品演示</p><p>已发送安全问卷</p><p>明日 14:00 报价沟通</p></div></aside>
      </main>`;
    case "analytics":
      return `<main class="analytics-wall">
        <header class="analytics-top"><div><p class="eyebrow">${layout.id}</p><h1>Reader intelligence command center</h1><span>Multi-panel operations dashboard with variables, anomalies, logs, and drill-downs.</span></div><div class="filter-chips"><span>Today</span><span>Subscribers</span><span>Politics</span><span>Mobile</span><span>Compare 7d</span></div></header>
        <section class="analysis-tabs"><span class="active">Overview</span><span>Acquisition</span><span>Retention</span><span>Revenue</span><span>Content quality</span></section>
        <section class="analytics-kpis">${renderMetric("Engaged minutes", "3.8M", "+12%")}${renderMetric("Churn risk", "4.1%", "-0.6%")}${renderMetric("Paywall lift", "11%", "+2.1%")}${renderMetric("Story velocity", "18/hr", "+3")}</section>
        <section class="signal-grid"><div class="signal-hero"><h2>Engaged minutes by hour</h2><strong>3.8M</strong><div class="wave"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="chart-caption"><span>06:00</span><span>Noon</span><span>18:00</span></div></div><div class="signal-stack"><article class="segment-card"><h2>Top segment</h2><strong>Policy subscribers</strong><p>High retention, rising comments, strong mobile readership.</p></article><article class="heat-panel"><h2>Topic heatmap</h2><div>${Array.from({ length: 36 }, (_, i) => `<i class="level-${(i % 4) + 1}"></i>`).join("")}</div></article></div><aside class="anomaly-list"><h2>Drill-down</h2><p><b>Mobile</b> homepage visits spiked.</p><p><b>Markets</b> story retention dipped.</p><p><b>Comments</b> crossed moderation threshold.</p><p><b>Revenue</b> trial conversions rose in the morning cohort.</p></aside></section>
        <section class="analytics-bottom"><article><h2>Live event stream</h2><p><b>10:42</b><span>Homepage cohort crossed retention alert.</span></p><p><b>10:37</b><span>Paywall experiment generated 218 trials.</span></p><p><b>10:21</b><span>Comments moderation queue exceeded SLA.</span></p></article><article><h2>Correlation notes</h2><p>Subscriber traffic lifted after the markets explainer was pinned above the fold. Mobile readers are converting from short summaries.</p></article><article><h2>Team actions</h2><button>Open notebook</button><button class="secondary">Share dashboard</button></article></section>
      </main>`;
    case "portfolio":
      return `<main class="case-study">
        <nav class="case-nav"><b>Maya Chen</b><span>Work</span><span>Process</span><span>Outcomes</span><button>Next case</button></nav>
        <section class="case-intro"><aside class="case-meta"><span>Role: Lead product designer</span><span>Timeline: 8 weeks</span><span>Team: 1 PM · 4 engineers</span><span>Scope: Research to shipped system</span></aside><div><p class="eyebrow">${layout.id}</p><h1>Designing the daily intelligence desk.</h1><p>A product design case study about turning scattered newsroom signals into a focused decision surface for editors under deadline pressure.</p></div></section>
        <section class="case-artifact"><div class="device-frame"><header><b>Decision desk prototype</b><span>Figma · usability round 3</span></header><i><span>Decision queue</span><em>14 items · 3 blocked</em></i><i><span>Evidence stream</span><em>Sources, claims, legal notes</em></i><i><span>Publishing controls</span><em>Owner, status, release window</em></i></div><aside><b>Outcome</b><strong>34%</strong><span>faster editorial review</span><hr><b>Signal quality</b><strong>2.1x</strong><span>more sourced decisions</span><hr><b>Adoption</b><strong>87%</strong><span>weekly active editors</span></aside></section>
        <section class="case-story"><article><span>01</span><h2>Challenge</h2><p>Editors needed a product that could hold dense signals without becoming a generic admin dashboard.</p></article><article><span>02</span><h2>Research</h2><p>We mapped 16 decision moments, 9 handoffs, and the evidence editors needed before publishing.</p></article><article><span>03</span><h2>Design move</h2><p>We separated decision zones from evidence zones and gave each state a clear reading path.</p></article><article><span>04</span><h2>Result</h2><p>Review time dropped while senior editors gained a clearer escalation model.</p></article></section>
        <section class="case-process"><article><h2>Evidence from the work</h2><div class="artifact-strip"><span>Interview notes</span><span>Journey map</span><span>Prototype diff</span><span>Release metrics</span></div></article><article><h2>What shipped</h2><p>Decision queue, source confidence, review ownership, and a live publishing window replaced scattered chats and spreadsheets.</p></article></section>
      </main>`;
    case "settings":
      return `<main class="settings-console">
        <aside class="settings-menu"><b>Workspace</b><a>Profile</a><a>Members</a><a class="active">Permissions</a><a>Security</a><a>Integrations</a><a>Billing</a><a>Audit log</a></aside>
        <section class="settings-content"><header class="settings-header"><div><p class="eyebrow">${layout.id}</p><h1>Newsroom permissions</h1><span>Configure role defaults, publishing gates, connected systems, and recent access changes.</span></div><div><button class="secondary">Cancel</button><button>Save changes</button></div></header><section class="settings-alert"><b>Unsaved changes</b><span>Publishing review and source access changes will affect 48 members.</span><button>Review diff</button></section><section class="settings-summary">${renderMetric("Members", "48", "+3")}${renderMetric("Roles", "6", "stable")}${renderMetric("Integrations", "12", "synced")}${renderMetric("Audit events", "218", "7d")}</section><div class="form-grid"><article class="panel form-panel"><h2>Default roles</h2><label>Workspace name<input value="Daily Index Editorial"></label><label>Default role<input value="Editor"></label><label>Publishing gate<input value="Senior editor approval"></label><label><input type="checkbox" checked> Require review before publishing</label></article><article class="panel matrix-panel"><h2>Permission matrix</h2><table><tbody><tr><td>Publish</td><td>Editor</td><td>Admin</td></tr><tr><td>Billing</td><td>-</td><td>Admin</td></tr><tr><td>Sources</td><td>Editor</td><td>Admin</td></tr><tr><td>AI tools</td><td>Reviewer</td><td>Admin</td></tr></tbody></table></article><article class="panel integration-panel"><h2>Connected systems</h2><p><b>Slack</b><span>Connected · alerts on</span></p><p><b>SSO</b><span>Okta · enforced</span></p><p><b>CMS</b><span>Sync healthy</span></p></article><article class="panel audit-panel"><h2>Recent changes</h2><p><b>10:42</b><span>Maya changed default role.</span></p><p><b>09:18</b><span>Noah rotated API key.</span></p><p><b>Yesterday</b><span>Ava approved new source policy.</span></p></article></div><section class="panel danger"><h2>Danger zone</h2><p>Rotate API keys, revoke inactive integrations, or require all users to sign in again.</p><button class="secondary">Rotate keys</button></section></section>
      </main>`;
    case "wizard":
      return `<main class="onboarding-flow">
        <header class="wizard-top"><div><p class="eyebrow">${layout.id}</p><h1>Launch setup</h1><span>Connect trusted inputs, validate readiness, then invite the publishing team.</span></div><button class="secondary">Save and exit</button></header>
        <header class="stepper"><span class="done">1 Publication</span><span class="active">2 Connect sources</span><span>3 Invite team</span><span>4 Launch checklist</span></header>
        <section class="wizard-card"><p class="eyebrow">Step 2 of 4</p><h1>Connect sources for the morning brief.</h1><p>Select feeds, editorial notes, market data, and review rules. The wizard should feel guided, not like a generic form.</p><div class="source-options"><label><input type="checkbox" checked> Editorial notes <span>6 feeds · verified</span></label><label><input type="checkbox" checked> Market data <span>4 feeds · syncing</span></label><label><input type="checkbox"> Reader comments <span>2 feeds · optional</span></label><label><input type="checkbox" checked> Legal review notes <span>3 reviewers</span></label></div><div class="wizard-fields"><label>Primary publication<input value="Morning Market Brief"></label><label>Audience segment<input value="Paid subscribers"></label><label>Review rule<input value="Block unsupported claims"></label></div><div class="validation-list"><p><b>Ready</b><span>8 sources authenticated</span></p><p><b>Needs attention</b><span>Market feed sync finishes in 2 min</span></p><p><b>Optional</b><span>Reader comments can be enabled later</span></p></div><div class="actions-row"><button class="secondary">Back</button><button>Continue</button></div></section>
        <aside class="preview-card"><h2>Launch preview</h2><div class="mini-screen"><i></i><i></i><i></i></div>${renderMetric("Sources", "12", "linked")}<div class="preview-checks"><p><b>Brief template</b><span>Ready</span></p><p><b>Review gate</b><span>Enabled</span></p><p><b>Team invites</b><span>Next step</span></p></div><p class="preview-note">Your daily brief will launch with trusted source cards, audience filters, and review gates.</p></aside>
      </main>`;
    case "marketplace":
      return `<main class="marketplace-page">
        <header class="market-search"><div><p class="eyebrow">${layout.id}</p><h1>Find production-ready page systems for editorial, commerce, and operations teams.</h1><label><span>Search marketplace</span><input value="crm workspace, docs portal, analytics command center"></label><nav><span class="active">Recommended</span><span>Dashboards</span><span>Commerce</span><span>Docs</span><span>CRM</span></nav></div><aside><b>3,248</b><span>verified templates</span><b>148</b><span>new this month</span><b>92%</b><span>with screenshots</span></aside></header>
        <aside class="market-filter"><b>Browse</b><span class="active">All resources</span><span>Layouts</span><span>Components</span><span>Workflow kits</span><span>Design systems</span><b>Filters</b><label><input type="checkbox" checked> Has preview</label><label><input type="checkbox" checked> Responsive</label><label><input type="checkbox"> Enterprise ready</label><label><input type="checkbox"> Free</label><button class="secondary">Clear filters</button></aside>
        <section class="market-results"><div class="market-toolbar"><div><b>Recommended for news products</b><span>Showing 24 of 3,248 results · sorted by install quality</span></div><nav><button class="secondary">Compare</button><button class="secondary">Most installed</button><button>Save view</button></nav></div><section class="market-spotlight"><article><b>Editor's pick</b><h2>News command center</h2><p>Includes analytics, review queues, and incident-style escalation states.</p></article><article><b>New bundle</b><h2>CRM launch kit</h2><p>Pipeline board, account 360, and follow-up timeline.</p></article></section><div class="market-grid">${[
          ["News command center", "Layout", "4.9", "analytics", "Daily editorial decisions with KPI cards, queues, and issue drill-down."],
          ["Briefing onboarding kit", "Workflow", "4.8", "wizard", "A guided setup flow with source connection, validation, and launch states."],
          ["Developer docs shell", "Template", "4.9", "docs", "Docs navigation, command search, code examples, anchors, and release notes."],
          ["CRM opportunity room", "Workspace", "4.7", "crm", "Pipeline, account record, activity timeline, and next-step planning."],
          ["Commerce order desk", "Console", "4.8", "table", "Saved views, fulfillment lanes, order risk, and bulk actions."],
          ["Review drawer pack", "Component", "4.6", "drawer", "Inspector drawer, evidence checklist, comments, and approval controls."]
        ].map(([item, type, rating, kind, text], index) => `<article class="market-card"><div class="market-card-preview ${kind}"><i></i><i></i><i></i><i></i></div><div class="market-card-body"><small>${type} · ${rating} rating</small><b>${item}</b><p>${text}</p><div class="market-actions"><span>${18 + index * 7} installs today</span><button>${index % 2 === 0 ? "Install" : "Preview"}</button></div></div></article>`).join("")}</div></section>
        <aside class="market-featured"><b>Featured collection</b><h2>Launch a subscription newsroom</h2><p>Six resources that cover acquisition, editorial review, account health, and analytics reporting.</p><div class="collection-stack"><span>Landing page</span><span>Checkout module</span><span>Member dashboard</span><span>Retention report</span></div><button>Open collection</button></aside>
      </main>`;
    case "admin-overview":
      return `<main class="admin-overview-shell">
        <aside class="admin-overview-menu"><b>Command</b><a class="active">Overview</a><a>Teams</a><a>Workflows</a><a>Revenue</a><a>System health</a></aside>
        <section class="admin-overview-main"><header><p class="eyebrow">${layout.id}</p><h1>Operational command center</h1><button>Run review</button></header><section class="admin-overview-hero"><div><h2>Today needs attention</h2><p>Three teams have crossed review thresholds. Subscriber operations remain stable.</p></div><strong>86</strong></section><section class="executive-strip"><article><b>Decision needed</b><span>Policy handoff owner</span></article><article><b>Risk trend</b><span>2 teams rising</span></article><article><b>Leadership note</b><span>Review before 14:00</span></article></section><section class="admin-overview-grid">${renderMetric("Active teams", "14", "+2")}${renderMetric("Pending approvals", "27", "-8")}${renderMetric("Revenue pulse", "$182K", "+12%")}${renderMetric("Health score", "94", "good")}</section><section class="admin-overview-panels"><article><h2>Workload map</h2><div class="heatmap">${Array.from({ length: 24 }, (_, i) => `<i class="level-${(i % 4) + 1}"></i>`).join("")}</div></article><article><h2>Exception brief</h2><p>Prioritize policy desk handoff and subscription trial cleanup before the afternoon planning block.</p><ol><li>Assign one owner</li><li>Clear legal review</li><li>Confirm revenue impact</li></ol></article></section></section>
      </main>`;
    case "master-detail":
      return `<main class="review-console-shell">
        <header class="master-detail-top"><div><p class="eyebrow">${layout.id}</p><h1>Research evidence library</h1><span>A master-detail interface for browsing records, related artifacts, comments, and revision history without leaving the list.</span></div><div><button class="secondary">Import CSV</button><button class="secondary">Export view</button><button>Create record</button></div></header>
        <aside class="master-filters"><b>Views</b><a class="active">All studies <span>128</span></a><a>Needs synthesis <span>18</span></a><a>High-confidence <span>42</span></a><a>Archived <span>64</span></a><b>Fields</b><label><input type="checkbox" checked> Status</label><label><input type="checkbox" checked> Owner</label><label><input type="checkbox" checked> Confidence</label><label><input type="checkbox"> Segment</label><b>Filters</b><span>Q2 launch</span><span>Enterprise</span><span>Interview</span></aside>
        <section class="master-table"><div class="table-toolbar"><input value="Search studies, participants, tags"><button>Filter</button><button class="secondary">Group</button><button class="secondary">Columns</button><button class="secondary">Bulk edit</button></div><section class="record-summary">${renderMetric("Records", "128", "+12")}${renderMetric("Evidence links", "482", "synced")}${renderMetric("Open comments", "23", "-7")}</section><div class="selected-row">Selected · Enterprise onboarding study · Record detail open</div><table><thead><tr><th>Study</th><th>Owner</th><th>Status</th><th>Confidence</th><th>Related</th><th>Updated</th></tr></thead><tbody><tr class="selected"><td>Enterprise onboarding study</td><td>Maya</td><td><span class="pill">Synthesis</span></td><td>High</td><td>18 artifacts</td><td>Today</td></tr><tr><td>Pricing objections</td><td>Eli</td><td><span class="pill">Review</span></td><td>Medium</td><td>9 artifacts</td><td>Yesterday</td></tr><tr><td>Admin permission model</td><td>Noah</td><td><span class="pill">Active</span></td><td>High</td><td>14 artifacts</td><td>May 22</td></tr><tr><td>Mobile reader survey</td><td>Ava</td><td><span class="pill">Draft</span></td><td>Low</td><td>6 artifacts</td><td>May 19</td></tr><tr><td>Support handoff audit</td><td>Iris</td><td><span class="pill">Active</span></td><td>Medium</td><td>12 artifacts</td><td>May 18</td></tr></tbody></table><section class="linked-records"><article><b>Related artifacts</b><p>Interview clips, prototype notes, usability findings, launch metrics.</p></article><article><b>Saved automation</b><p>Notify owner when a record is stale for more than 14 days.</p></article></section></section>
        <aside class="detail-inspector"><header><h2>Enterprise onboarding study</h2><span>Record detail</span></header><p>Selected record shows editable fields, related records, comments, and revision history in a persistent side sheet.</p>${renderMetric("Artifacts", "18", "linked")}${renderMetric("Confidence", "High", "validated")}<div class="field-list"><label>Owner<input value="Maya Chen"></label><label>Status<input value="Synthesis"></label><label>Segment<input value="Enterprise admins"></label></div><div class="inspector-list"><b>Related records</b><p>5 interview clips</p><p>8 prototype findings</p><p>3 product requirements</p></div><div class="inspector-list comments"><b>Comments</b><p>Noah: Pull this into launch checklist.</p><p>Ava: Add one more finance admin quote.</p></div></aside>
      </main>`;
    case "ops-timeline":
      return `<main class="ops-timeline-shell">
        <header class="ops-timeline-top"><p class="eyebrow">${layout.id}</p><h1>Operations timeline</h1><button>Escalate</button></header>
        <section class="ops-summary">${renderMetric("Open incidents", "6", "-2")}${renderMetric("Deployments", "11", "+4")}${renderMetric("Support load", "74%", "steady")}${renderMetric("SLA clock", "18m", "left")}</section>
        <section class="ops-board"><aside class="ops-lanes"><b>Queues</b><span class="active">Live incidents</span><span>Scheduled changes</span><span>Customer impact</span><span>Resolved</span><div class="sla-meter"><i></i><small>Tier 2 escalation window</small></div></aside><div class="timeline-stream"><article class="critical"><time>08:20</time><h2>Homepage alert acknowledged</h2><p>Editor traffic spike routed to standby review team.</p><small>Owner: Maya · Severity: medium</small></article><article><time>09:05</time><h2>Subscriber sync delayed</h2><p>Retry window opened, data integrity checks passed.</p><small>Owner: Eli · Watch window: 15 min</small></article><article><time>10:40</time><h2>Policy desk handoff</h2><p>New approval owner assigned for the afternoon edition.</p><small>Owner: Noah · Next checkpoint: 11:20</small></article><article><time>11:10</time><h2>Audio edition queued</h2><p>Publishing pipeline ready after transcript validation.</p><small>Owner: Iris · Status: green</small></article></div><aside class="ops-detail"><h2>Current runbook</h2><p>Follow escalation tier two if queue delay exceeds 20 minutes.</p><ol class="runbook"><li class="done">Confirm impact radius</li><li class="active">Assign single owner</li><li>Publish status note</li><li>Close incident review</li></ol><button>Open runbook</button></aside></section>
      </main>`;
    case "personal-portfolio":
      return `<main class="personal-portfolio-page">
        <nav class="personal-nav"><b>Alex Morgan</b><span>Case studies</span><span>Systems</span><span>Writing</span><button>Contact</button></nav>
        <section class="personal-hero"><div><p class="eyebrow">${layout.id}</p><h1>Designing calm systems for teams doing complicated work.</h1><p>I work with product leaders to turn messy operations, dense data, and high-stakes workflows into interfaces people can trust every day.</p><div class="personal-proof"><span>12 shipped systems</span><span>8 years product design</span><span>3 enterprise launches</span><span>Available Q3</span></div></div><aside class="profile-card"><div class="portrait">AM</div><b>Currently designing</b><p>Review systems, command centers, and data products for teams with high-stakes decisions.</p><a>Download portfolio deck</a></aside></section>
        <section class="portfolio-marquee"><article><span>01</span><h2>Decision surfaces</h2><p>Interfaces that help teams compare evidence, assign owners, and act under pressure.</p></article><article><span>02</span><h2>Design systems</h2><p>Component libraries that stay useful inside real product workflows.</p></article><article><span>03</span><h2>Operational AI</h2><p>AI-assisted tools with review, source, and approval paths built in.</p></article></section>
        <section class="selected-work"><article class="featured-work"><span></span><small>Case study · 8 weeks</small><h2>Editorial command center</h2><p>Product strategy, interface design, design system.</p><strong>34% faster review</strong></article><article><span></span><small>Analytics</small><h2>Revenue intelligence</h2><p>BI workspace for a subscription team.</p><strong>2.1x signal quality</strong></article><article><span></span><small>Workflow</small><h2>Review redesign</h2><p>Internal review tools with clearer ownership.</p><strong>17 handoffs removed</strong></article></section><section class="portfolio-notes"><article><b>How I work</b><p>Research the actual operating rhythm, design the decision surface, then harden the system through production states.</p></article><article><b>Selected clients</b><p>Media groups, B2B platforms, internal tooling teams, and analytics organizations.</p></article><article><b>Writing</b><p>Essays on interface density, systems thinking, and designing software teams can live inside.</p></article></section>
      </main>`;
    case "personal-writing":
      return `<main class="writing-home">
        <aside class="writing-profile"><b>Notes by Alex</b><p>Essays on interfaces, software teams, and the practice of making complex tools understandable.</p><button>Subscribe</button><div><strong>18K</strong><span>readers</span></div><small>Published every other Tuesday</small><nav><span>Latest</span><span>Archive</span><span>About</span></nav></aside>
        <section class="writing-feed"><p class="eyebrow">${layout.id}</p><h1>Essays on interfaces that teams live inside.</h1><article class="featured-essay"><time>May 19</time><h2>Designing for repeated operational decisions</h2><p>Why admin interfaces need rhythm, density, and calm hierarchy when the same team returns to the same screen every morning.</p><span>12 min read · Product design</span></article><div class="essay-grid"><article><time>May 12</time><h2>When dashboards become products</h2><p>A practical lens for separating signal from decoration.</p><span>Analytics · 9 min</span></article><article><time>May 04</time><h2>The case for slower settings pages</h2><p>Critical controls deserve friction, review, and better copy.</p><span>Systems · 7 min</span></article></div><section class="newsletter-strip"><b>Field notes</b><p>One practical essay about operational UI, shipped products, and design judgment.</p><button>Join 18K readers</button></section><section class="essay-list"><article><time>Apr 28</time><h2>What good tables reveal</h2><p>Sorting, scanning, and acting are different design jobs.</p></article><article><time>Apr 17</time><h2>Interfaces with a memory</h2><p>How products can remember context without overwhelming the person using them.</p></article><article><time>Apr 02</time><h2>Where product specs get blurry</h2><p>Notes on the handoff between intent, design, and working software.</p></article></section></section>
        <aside class="writing-index"><b>Topics</b><span>Product design</span><span>Frontend systems</span><span>Research notes</span><span>Career</span><b>Popular essays</b><p>How to read an admin dashboard</p><p>Interfaces with a memory</p><p>Where product specs get blurry</p><b>Reading lists</b><p>Operational UI starter pack</p><p>Design systems in production</p></aside>
      </main>`;
    case "corporate-home":
      return `<main class="corporate-homepage">
        <nav class="corp-nav"><b>Northstar Systems</b><span>Solutions</span><span>Industries</span><span>Customers</span><span>Company</span><button>Contact sales</button></nav>
        <section class="corp-hero"><div><p class="eyebrow">${layout.id}</p><h1>Operating infrastructure for service organizations with real-world commitments.</h1><p>Northstar gives healthcare, finance, and public-sector teams one place to track work, protect customer promises, and report outcomes with confidence.</p><div class="corp-actions"><button>Talk to sales</button><button class="secondary">Explore industries</button></div><div class="corp-logos"><span>Beacon Health</span><span>Northbank</span><span>CivicWorks</span><span>HarborCare</span></div></div><aside class="corp-visual"><header><b>Enterprise operations map</b><span>Live portfolio</span></header><div class="corp-map"><article><small>Commitments</small><strong>94%</strong><span>on track</span></article><article><small>Escalations</small><strong>18</strong><span>owned today</span></article><article><small>Audit trail</small><strong>2.4M</strong><span>events</span></article></div><div class="corp-routes"><span class="active">Intake</span><span>Review</span><span>Resolve</span><span>Report</span></div><p>Shared visibility across daily service work, accountability, and executive reporting.</p></aside></section>
        <section class="corp-proof"><article><strong>1,200+</strong><span>operating teams supported</span></article><article><strong>99.95%</strong><span>measured platform uptime</span></article><article><strong>42%</strong><span>faster response cycles</span></article><article><strong>31</strong><span>regulated workflows launched</span></article></section>
        <section class="corp-sections"><article><span>For operations</span><h2>Run the daily service rhythm</h2><p>Prioritize intake, route ownership, and keep every commitment visible from queue to resolution.</p><a>View operations solution</a></article><article><span>For executives</span><h2>Report what is changing</h2><p>Turn delivery, risk, staffing, and customer health into board-ready operating evidence.</p><a>See leadership reporting</a></article><article><span>For customer teams</span><h2>Protect the relationship</h2><p>Connect account context, service history, and escalation paths before issues become churn risk.</p><a>Explore customer success</a></article></section>
        <section class="corp-stories"><article><b>Financial services</b><p>Reduced regional review cycle time by 38% while preserving audit evidence for every decision.</p><a>Read customer story</a></article><article><b>Healthcare operations</b><p>Unified case routing, escalation, and follow-up across 11 service lines.</p><a>View solution</a></article><article><b>Public services</b><p>Improved accountability reporting and citizen request visibility across departments.</p><a>Explore industry</a></article></section>
      </main>`;
    case "corporate-services":
      return `<main class="services-site">
        <header class="services-hero"><p class="eyebrow">${layout.id}</p><h1>Strategy, service design, and delivery support for complex operating teams.</h1><p>We help leaders redesign the work behind a product before teams commit to screens, roadmaps, and rollout plans.</p><div class="services-proof"><span>12 week core engagements</span><span>Artifacts buyers can inspect</span><span>Design through adoption</span></div></header>
        <section class="services-layout"><aside class="services-sticky"><b>Engagements</b><a class="active">Operating model redesign</a><a>Product strategy sprint</a><a>Service blueprinting</a><a>Design system recovery</a><a>Launch governance</a><div class="quote">"They gave us a service model, not just a prettier interface."</div><button>Book a fit call</button></aside><div class="services-work"><article class="service-lead"><span>Primary offer</span><h2>Map the service, prototype the future workflow, and prepare the organization to ship it.</h2><p>The engagement produces a blueprint, prototype, delivery backlog, governance model, and measurement plan so the buyer can see how the work will operate after launch.</p><div><strong>12 weeks<span>typical timeline</span></strong><strong>6 tracks<span>research to rollout</span></strong><strong>24+ artifacts<span>ready for teams</span></strong></div></article><section class="service-artifacts"><div><b>Evidence wall</b><p>Research themes, contradictions, quotes, and risk signals grouped by decision.</p></div><div><b>Blueprint</b><p>Frontstage journeys, backstage operations, ownership, systems, and failure points.</p></div><div><b>Prototype set</b><p>Key workflows with realistic states, permissions, service exceptions, and handoffs.</p></div></section><div class="services-cards"><article class="wide"><span>01</span><h2>Discover the service reality</h2><p>Interview teams, audit existing tools, map touchpoints, and expose hidden decision rules that shape daily work.</p><small>Artifacts: interview synthesis, journey map, service blueprint</small></article><article><span>02</span><h2>Shape the future system</h2><p>Define screens, roles, operational states, and success criteria before UI production begins.</p><small>Artifacts: prototype, workflow spec, KPI model</small></article><article><span>03</span><h2>Prepare delivery</h2><p>Translate design into backlog, governance, rollout plan, and adoption support.</p><small>Artifacts: delivery map, component inventory, launch checklist</small></article></div><section class="services-case-row"><article><b>Healthcare operations</b><p>Reduced case routing ambiguity across intake, triage, and follow-up.</p></article><article><b>Financial services</b><p>Built a controlled review flow for high-risk customer decisions.</p></article><article><b>Public programs</b><p>Reframed citizen-facing service journeys and internal handoffs.</p></article></section></div></section>
      </main>`;
    case "enterprise-product":
      return `<main class="enterprise-product-page">
        <nav class="enterprise-nav"><b>Atlas Platform</b><span>Platform</span><span>Solutions</span><span>Security</span><span>Customers</span><span>Docs</span><button>Request demo</button></nav>
        <section class="enterprise-hero"><div><p class="eyebrow">${layout.id}</p><h1>Govern every workflow, integration, and approval from one enterprise control plane.</h1><p>Atlas connects operational data, policy controls, and team execution so large organizations can ship workflow change without losing auditability.</p><div class="enterprise-proof"><span>SOC 2 Type II</span><span>99.99% SLA option</span><span>SAML and SCIM</span><span>Regional data controls</span></div><div class="enterprise-actions"><button>Request demo</button><button class="secondary">Open security brief</button></div></div><aside class="enterprise-stack"><header><b>Production environment</b><span>Live modules</span></header><div class="stack-row primary"><b>Control plane</b><span>Roles, policy, approvals, audit</span></div><div class="stack-row"><b>Workflow engine</b><span>Routing, queues, SLAs, escalation</span></div><div class="stack-row"><b>Insight layer</b><span>Metrics, anomalies, executive reports</span></div><section class="stack-grid"><span>Salesforce</span><span>Snowflake</span><span>Zendesk</span><span>Okta</span></section></aside></section>
        <section class="enterprise-modules"><article><span>01</span><h2>Control plane</h2><p>Centralize permissions, policy approvals, audit logs, and environment-level governance.</p></article><article><span>02</span><h2>Workflow engine</h2><p>Model routing rules, escalations, queue ownership, and exception handling for each team.</p></article><article><span>03</span><h2>Insight layer</h2><p>Translate operational activity into portfolio health, anomalies, forecasts, and board reporting.</p></article><article><span>04</span><h2>Integration fabric</h2><p>Connect CRM, support, identity, warehouse, and finance systems with monitored sync health.</p></article></section><section class="enterprise-proof-row"><article><b>Security and compliance</b><p>RBAC, audit events, SSO, SCIM, encryption, data residency options, and approval logs.</p></article><article><b>Implementation path</b><p>Migration planning, integration mapping, sandbox rollout, admin training, and readiness review.</p></article><article><b>Enterprise scale</b><p>Built for multiple business units, shared governance, delegated ownership, and executive visibility.</p></article></section><section class="enterprise-buyer-paths"><article><b>For buyers</b><p>See business impact, timeline, procurement path, and customer proof.</p></article><article><b>For technical teams</b><p>Review architecture, API coverage, integration health, and security documentation.</p></article><article><b>For admins</b><p>Understand roles, environments, policy controls, and operating reports.</p></article></section>
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
.layout-v2 .dash-filters {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr)) auto;
  gap: 10px;
  margin-top: 12px;
  padding: 12px;
  background: #cbd5e1;
  border: 1px solid #94a3b8;
  border-radius: 8px;
}
.layout-v2 .dash-filters label {
  display: grid;
  gap: 4px;
  color: #334155;
  font-size: 12px;
}
.layout-v2 .dash-filters input {
  min-height: 34px;
  border: 1px solid #94a3b8;
  border-radius: 6px;
  padding: 0 10px;
}
.layout-v2 .dash-main {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 12px;
}
.layout-v2 .dash-table table { font-size: 12px; }
.layout-v2 .action-queue p {
  margin: 10px 0;
  padding: 12px;
  color: #334155;
  background: #f8fafc;
  border-left: 4px solid #ef4444;
}
.layout-v2 .action-queue b,
.layout-v2 .action-queue span {
  display: block;
}
.layout-v2 .action-queue span {
  margin-top: 4px;
  color: #64748b;
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
.layout-v2 .order-workbench {
  padding: 18px;
  background: #fff;
  border: 1px solid #fde68a;
  border-radius: 8px;
}
.layout-v2 .commerce-filters label {
  display: block;
  margin: 18px 0;
}
.layout-v2 .order-workbench {
  display: grid;
  gap: 16px;
  align-content: start;
}
.layout-v2 .fulfillment-lanes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.layout-v2 .fulfillment-lanes article {
  min-height: 150px;
  padding: 16px;
  display: grid;
  align-content: space-between;
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: 8px;
}
.layout-v2 .fulfillment-lanes b,
.layout-v2 .fulfillment-lanes span,
.layout-v2 .fulfillment-lanes em {
  display: block;
}
.layout-v2 .fulfillment-lanes span { font-size: 34px; font-weight: 900; }
.layout-v2 .order-workbench table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.layout-v2 .order-workbench th,
.layout-v2 .order-workbench td {
  padding: 12px;
  text-align: left;
  border-top: 1px solid #fde68a;
}
.layout-v2 .drawer-steps {
  display: grid;
  gap: 8px;
  margin-top: 16px;
}
.layout-v2 .drawer-steps span {
  padding: 10px;
  border-radius: 6px;
  background: #fef3c7;
}
.layout-v2 .drawer-steps .done { color: #166534; }
.layout-v2 .drawer-steps .active { color: #fff; background: #ca8a04; }
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
.layout-v2 .analysis-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 18px;
}
.layout-v2 .analysis-tabs span {
  padding: 10px 12px;
  color: #bfdbfe;
  background: rgba(15,23,42,.92);
  border: 1px solid rgba(147,197,253,.22);
  border-radius: 999px;
}
.layout-v2 .analysis-tabs .active {
  color: #020617;
  background: #7dd3fc;
}
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
.layout-v2 .market-grid article > span {
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
.layout-v2 .executive-strip {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}
.layout-v2 .executive-strip article {
  padding: 16px;
  color: #312e81;
  background: #e0e7ff;
  border: 1px solid #c7d2fe;
  border-radius: 8px;
}
.layout-v2 .executive-strip b,
.layout-v2 .executive-strip span {
  display: block;
}
.layout-v2 .executive-strip span { margin-top: 6px; color: #475569; }
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
  grid-template-columns: 1fr auto auto auto;
  gap: 10px;
  margin-bottom: 14px;
}
.layout-v2 .selected-row {
  margin-bottom: 10px;
  padding: 10px 12px;
  color: #1d4ed8;
  background: #dbeafe;
  border: 1px solid #93c5fd;
  border-radius: 6px;
  font-weight: 700;
}
.layout-v2 .field-list {
  display: grid;
  gap: 10px;
  margin: 16px 0;
}
.layout-v2 .field-list label {
  display: grid;
  gap: 6px;
  color: #64748b;
  font-size: 12px;
}
.layout-v2 .field-list input {
  min-height: 34px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  padding: 0 10px;
}
.layout-v2 .ops-timeline-shell {
  min-height: 100vh;
  padding: 24px;
  background: #f1f5f9;
}
.layout-v2 .ops-summary {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
.layout-v2 .timeline-stream article.critical {
  border-left-color: #dc2626;
  background: #fff7ed;
}
.layout-v2 .timeline-stream time {
  color: #3157d5;
  font-weight: 800;
}
.layout-v2 .sla-meter {
  margin-top: 22px;
  padding-top: 14px;
  border-top: 1px solid #d9e2ec;
}
.layout-v2 .sla-meter i {
  display: block;
  height: 10px;
  width: 68%;
  margin-bottom: 8px;
  border-radius: 999px;
  background: linear-gradient(90deg, #22c55e, #f59e0b, #ef4444);
}
.layout-v2 .runbook {
  margin: 16px 0;
  padding: 0;
  list-style: none;
}
.layout-v2 .runbook li {
  margin: 8px 0;
  padding: 10px;
  border-radius: 6px;
  background: #f8fafc;
}
.layout-v2 .runbook .done { color: #166534; background: #dcfce7; }
.layout-v2 .runbook .active { color: #1d4ed8; background: #dbeafe; }
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
.layout-v2 .market-grid article > span {
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
    linear-gradient(90deg, #fff 0 44px, transparent 44px),
    linear-gradient(180deg, #f6f2ea 0 54%, #e9eef4 54%);
}
.layout-v2 .services-hero {
  max-width: 1180px;
  padding: 46px 0 28px;
}
.layout-v2 .services-hero h1 {
  max-width: 1060px;
  font-size: clamp(46px, 5.8vw, 78px);
  letter-spacing: 0;
}
.layout-v2 .services-hero p {
  max-width: 760px;
}
.layout-v2 .services-layout {
  grid-template-columns: 260px minmax(0, 1fr);
  align-items: start;
}
.layout-v2 .services-sticky {
  position: sticky;
  top: 18px;
  border-color: #cdbf9e;
  box-shadow: 0 1px 0 rgba(17,24,39,.06);
}
.layout-v2 .services-sticky .quote {
  border-left: 4px solid #111827;
}
.layout-v2 .services-work {
  display: grid;
  gap: 18px;
  min-width: 0;
}
.layout-v2 .service-lead {
  display: grid;
  gap: 16px;
  padding: 30px;
  border: 1px solid #cdbf9e;
  border-radius: 8px;
  background: #111827;
  color: #f8fafc;
}
.layout-v2 .service-lead h2 {
  max-width: 840px;
  color: inherit;
  font-size: clamp(32px, 3.4vw, 46px);
}
.layout-v2 .service-lead p {
  max-width: 760px;
  color: #d1d5db;
}
.layout-v2 .service-lead div {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}
.layout-v2 .service-lead strong {
  padding: 16px;
  border: 1px solid rgba(255,255,255,.18);
  border-radius: 8px;
  background: rgba(255,255,255,.08);
  color: #fff;
  font-size: 28px;
}
.layout-v2 .services-cards article {
  display: grid;
  grid-template-columns: 56px 1fr;
  column-gap: 18px;
  align-content: start;
  min-height: 210px;
  border-color: #cdbf9e;
}
.layout-v2 .services-cards article p {
  grid-column: 2;
}
.layout-v2 .services-cards small {
  grid-column: 2;
  display: block;
  margin-top: 16px;
  color: #6b7280;
  font-weight: 800;
}
.layout-v2 .services-case-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}
.layout-v2 .services-case-row article {
  min-height: 148px;
  padding: 18px;
  border: 1px solid #c7d2fe;
  border-radius: 8px;
  background: #fff;
}
.layout-v2 .services-case-row b {
  display: block;
  margin-bottom: 10px;
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
.layout-v2 .corporate-homepage {
  padding: 24px;
  color: #142033;
  background:
    linear-gradient(90deg, rgba(24,38,66,.05) 1px, transparent 1px),
    linear-gradient(180deg, #f7f2e8 0 58%, #e8eff8 58% 100%);
  background-size: 64px 64px, auto;
}
.layout-v2 .corp-nav,
.layout-v2 .enterprise-nav {
  display: flex;
  align-items: center;
  gap: 22px;
  padding: 14px 18px;
  border: 1px solid rgba(20,32,51,.12);
  border-radius: 12px;
  background: rgba(255,255,255,.82);
}
.layout-v2 .corp-nav b,
.layout-v2 .enterprise-nav b {
  margin-right: auto;
}
.layout-v2 .corp-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 470px;
  gap: 30px;
  max-width: none;
  align-items: stretch;
  padding: 48px 0 24px;
}
.layout-v2 .corp-hero h1 {
  max-width: 930px;
  font-size: 58px;
  line-height: 1.02;
}
.layout-v2 .corp-hero p {
  max-width: 730px;
  font-size: 18px;
}
.layout-v2 .corp-actions,
.layout-v2 .enterprise-actions {
  display: flex;
  gap: 10px;
  margin: 24px 0;
}
.layout-v2 .corp-logos,
.layout-v2 .enterprise-proof {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.layout-v2 .corp-logos span,
.layout-v2 .enterprise-proof span {
  padding: 8px 10px;
  border: 1px solid rgba(20,32,51,.13);
  border-radius: 999px;
  background: rgba(255,255,255,.78);
  color: #334155;
  font-size: 12px;
  font-weight: 800;
}
.layout-v2 .corp-visual {
  min-height: 430px;
  padding: 22px;
  color: #f8fafc;
  border-radius: 16px;
  background:
    linear-gradient(135deg, rgba(20,32,51,.96), rgba(42,83,117,.94)),
    #142033;
  box-shadow: 0 28px 70px rgba(20,32,51,.24);
}
.layout-v2 .corp-visual header,
.layout-v2 .enterprise-stack header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}
.layout-v2 .corp-map {
  display: grid;
  gap: 12px;
  margin: 26px 0;
}
.layout-v2 .corp-map article {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 4px 12px;
  padding: 16px;
  border: 1px solid rgba(255,255,255,.16);
  border-radius: 12px;
  background: rgba(255,255,255,.08);
}
.layout-v2 .corp-map strong {
  grid-row: span 2;
  align-self: center;
  color: #fff;
  font-size: 36px;
}
.layout-v2 .corp-map small,
.layout-v2 .corp-map span,
.layout-v2 .corp-visual p {
  color: #cbd5e1;
}
.layout-v2 .corp-routes {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  margin-bottom: 22px;
}
.layout-v2 .corp-routes span {
  padding: 10px;
  border-radius: 999px;
  background: rgba(255,255,255,.1);
  text-align: center;
  color: #dbeafe;
  font-size: 12px;
  font-weight: 900;
}
.layout-v2 .corp-routes .active {
  background: #fff;
  color: #142033;
}
.layout-v2 .corp-proof {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  padding: 0;
  color: #142033;
  background: transparent;
  box-shadow: none;
}
.layout-v2 .corp-proof article,
.layout-v2 .corp-sections article,
.layout-v2 .corp-stories article {
  padding: 22px;
  border: 1px solid rgba(20,32,51,.13);
  border-radius: 12px;
  background: rgba(255,255,255,.86);
}
.layout-v2 .corp-proof strong {
  display: block;
  color: #142033;
  font-size: 34px;
}
.layout-v2 .corp-proof span {
  color: #475569;
}
.layout-v2 .corp-sections {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 14px;
}
.layout-v2 .corp-sections article {
  min-height: 220px;
}
.layout-v2 .corp-sections article span,
.layout-v2 .corp-stories b {
  color: #34535f;
  font-size: 12px;
  font-weight: 950;
  text-transform: uppercase;
}
.layout-v2 .corp-stories {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 14px;
}
.layout-v2 .services-site {
  padding: 24px;
  color: #171717;
  background:
    linear-gradient(90deg, #171717 0 12px, transparent 12px),
    linear-gradient(180deg, #f6efe3 0 46%, #e7edf3 46% 100%);
}
.layout-v2 .services-hero {
  max-width: none;
  padding: 36px 0 24px 26px;
}
.layout-v2 .services-hero h1 {
  max-width: 1120px;
  font-size: 68px;
  line-height: 1;
  letter-spacing: 0;
}
.layout-v2 .services-hero p {
  max-width: 790px;
  font-size: 18px;
}
.layout-v2 .services-proof {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 22px;
}
.layout-v2 .services-proof span {
  padding: 9px 12px;
  border: 1px solid rgba(23,23,23,.18);
  border-radius: 999px;
  background: #fffaf0;
  font-weight: 900;
}
.layout-v2 .services-layout {
  display: grid;
  grid-template-columns: 278px minmax(0, 1fr);
  gap: 18px;
  align-items: start;
}
.layout-v2 .services-sticky {
  position: sticky;
  top: 18px;
  padding: 20px;
  border: 1px solid rgba(23,23,23,.18);
  border-radius: 10px;
  background: #fffaf0;
}
.layout-v2 .services-sticky a {
  display: block;
  margin: 8px 0;
  padding: 10px 12px;
  border-radius: 8px;
  color: #3f3f46;
  font-weight: 800;
}
.layout-v2 .services-sticky .active {
  background: #171717;
  color: #fff;
}
.layout-v2 .services-sticky .quote {
  margin: 18px 0;
  padding: 14px 0 14px 14px;
  border-left: 4px solid #171717;
  color: #52525b;
  font-weight: 800;
}
.layout-v2 .services-work {
  display: grid;
  gap: 14px;
}
.layout-v2 .service-lead {
  padding: 30px;
  border: 0;
  border-radius: 12px;
  background: #171717;
  color: #fff;
}
.layout-v2 .service-lead h2 {
  max-width: 920px;
  color: inherit;
  font-size: 42px;
  line-height: 1.08;
}
.layout-v2 .service-lead p {
  max-width: 820px;
  color: #d4d4d8;
}
.layout-v2 .service-lead div {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}
.layout-v2 .service-lead strong {
  display: block;
  padding: 14px;
  border: 1px solid rgba(255,255,255,.16);
  border-radius: 8px;
  background: rgba(255,255,255,.08);
  color: #fff;
  font-size: 28px;
}
.layout-v2 .service-lead strong span {
  display: block;
  margin-top: 4px;
  color: #d4d4d8;
  font-size: 12px;
}
.layout-v2 .service-artifacts,
.layout-v2 .services-case-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}
.layout-v2 .service-artifacts div,
.layout-v2 .services-case-row article,
.layout-v2 .services-cards article {
  padding: 20px;
  border: 1px solid rgba(23,23,23,.16);
  border-radius: 10px;
  background: #fff;
}
.layout-v2 .services-cards {
  display: grid;
  grid-template-columns: 1.15fr .85fr;
  gap: 12px;
}
.layout-v2 .services-cards .wide {
  grid-row: span 2;
}
.layout-v2 .services-cards article {
  display: block;
  min-height: 190px;
}
.layout-v2 .services-cards span {
  display: inline-block;
  margin-bottom: 18px;
  color: #3157d5;
  font-weight: 950;
}
.layout-v2 .services-cards small {
  display: block;
  margin-top: 14px;
  color: #52525b;
  font-weight: 800;
}
.layout-v2 .enterprise-product-page {
  min-height: 100vh;
  padding: 24px;
  color: #e5eefb;
  background:
    radial-gradient(circle at 72% 18%, rgba(20,184,166,.25), transparent 28%),
    linear-gradient(180deg, #07111f 0 64%, #0e1726 64% 100%);
}
.layout-v2 .enterprise-nav {
  border-color: rgba(148,163,184,.22);
  background: rgba(15,23,42,.76);
}
.layout-v2 .enterprise-nav b,
.layout-v2 .enterprise-nav span {
  color: #e5eefb;
}
.layout-v2 .enterprise-nav button {
  background: #5eead4;
  border-color: #5eead4;
  color: #06111f;
}
.layout-v2 .enterprise-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 500px;
  gap: 28px;
  align-items: center;
  min-height: 560px;
}
.layout-v2 .enterprise-hero h1 {
  max-width: 920px;
  color: #f8fafc;
  font-size: 60px;
  line-height: 1.02;
}
.layout-v2 .enterprise-hero p {
  max-width: 760px;
  color: #b7c6da;
  font-size: 18px;
}
.layout-v2 .enterprise-actions .secondary {
  color: #c7d2fe;
  background: rgba(255,255,255,.08);
  border-color: rgba(148,163,184,.28);
}
.layout-v2 .enterprise-proof span {
  color: #ccfbf1;
  background: rgba(94,234,212,.08);
  border-color: rgba(94,234,212,.22);
}
.layout-v2 .enterprise-stack {
  display: grid;
  gap: 12px;
  padding: 18px;
  border: 1px solid rgba(148,163,184,.22);
  border-radius: 18px;
  background: rgba(15,23,42,.78);
  box-shadow: 0 30px 90px rgba(0,0,0,.32);
}
.layout-v2 .enterprise-stack div {
  min-height: 0;
  padding: 16px;
  border: 1px solid rgba(148,163,184,.2);
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(15,23,42,.86), rgba(20,184,166,.12));
}
.layout-v2 .enterprise-stack div:nth-child(2) {
  transform: none;
}
.layout-v2 .enterprise-stack .primary {
  background: linear-gradient(135deg, rgba(94,234,212,.24), rgba(49,87,213,.2));
}
.layout-v2 .enterprise-stack b,
.layout-v2 .enterprise-stack span {
  display: block;
  color: #e5eefb;
}
.layout-v2 .enterprise-stack span {
  color: #93a4bb;
}
.layout-v2 .stack-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
}
.layout-v2 .stack-grid span {
  padding: 10px;
  border-radius: 8px;
  background: rgba(255,255,255,.07);
  text-align: center;
  color: #cbd5e1;
  font-size: 12px;
  font-weight: 900;
}
.layout-v2 .enterprise-modules {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}
.layout-v2 .enterprise-modules article,
.layout-v2 .enterprise-proof-row article,
.layout-v2 .enterprise-buyer-paths article {
  padding: 22px;
  border: 1px solid rgba(148,163,184,.2);
  border-radius: 12px;
  background: rgba(15,23,42,.72);
}
.layout-v2 .enterprise-modules h2,
.layout-v2 .enterprise-modules p,
.layout-v2 .enterprise-proof-row b,
.layout-v2 .enterprise-proof-row p,
.layout-v2 .enterprise-buyer-paths b,
.layout-v2 .enterprise-buyer-paths p {
  color: inherit;
}
.layout-v2 .enterprise-modules article span {
  color: #5eead4;
}
.layout-v2 .enterprise-proof-row,
.layout-v2 .enterprise-buyer-paths {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 12px;
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
.layout-v2 .admin-shell {
  display: grid;
  grid-template-columns: 248px minmax(0, 1fr);
  min-height: 100vh;
  background: #eef2f7;
}
.layout-v2 .admin-sidebar {
  padding: 22px 16px;
  background: #111827;
  color: #fff;
}
.layout-v2 .admin-sidebar b { display: block; font-size: 18px; }
.layout-v2 .admin-sidebar small { display: block; margin: 4px 0 22px; color: #94a3b8; }
.layout-v2 .admin-sidebar a {
  display: block;
  margin: 8px 0;
  padding: 11px 12px;
  color: #cbd5e1;
  border-radius: 8px;
}
.layout-v2 .admin-sidebar .active {
  color: #111827;
  background: #fff;
}
.layout-v2 .admin-user {
  display: grid;
  grid-template-columns: 38px 1fr;
  gap: 10px;
  align-items: center;
  margin-top: 28px;
  padding: 12px;
  color: #cbd5e1;
  background: rgba(255,255,255,.08);
  border-radius: 12px;
}
.layout-v2 .admin-user strong {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  color: #111827;
  background: #fff;
  border-radius: 999px;
}
.layout-v2 .admin-main { min-width: 0; padding: 18px; }
.layout-v2 .admin-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 18px;
  background: #fff;
  border: 1px solid #d9e2ec;
  border-radius: 10px;
  box-shadow: var(--shadow-sm);
}
.layout-v2 .admin-actions {
  display: grid;
  grid-template-columns: minmax(260px, 420px) auto auto;
  gap: 10px;
}
.layout-v2 .admin-alert {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 12px;
  padding: 13px 16px;
  color: #7f1d1d;
  background: #fff7ed;
  border: 1px solid #fed7aa;
  border-radius: 12px;
}
.layout-v2 .admin-alert span { color: #9a3412; }
.layout-v2 .admin-alert button { margin-left: auto; }
.layout-v2 .dash-filters {
  grid-template-columns: repeat(4, minmax(0, 1fr)) minmax(150px, auto);
}
.layout-v2 .dash-main {
  grid-template-columns: minmax(0, .95fr) minmax(420px, 1.05fr) 320px;
  align-items: stretch;
}
.layout-v2 .dash-main .panel {
  min-height: 338px;
}
.layout-v2 .revenue-panel header {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
.layout-v2 .admin-bars {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  align-items: end;
  gap: 8px;
  min-height: 150px;
  margin-top: 16px;
  padding: 14px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
}
.layout-v2 .admin-bars i {
  min-height: 20px;
  border-radius: 8px 8px 0 0;
  background: linear-gradient(180deg, #60a5fa, #3157d5);
}
.layout-v2 .panel-foot {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  color: #64748b;
  font-size: 13px;
}
.layout-v2 .action-queue button,
.layout-v2 .decision-panel button {
  width: 100%;
  margin-top: 12px;
}
.layout-v2 .admin-bottom {
  display: grid;
  grid-template-columns: 1.2fr .8fr 1fr;
  gap: 12px;
  margin-top: 12px;
}
.layout-v2 .admin-heatmap {
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  gap: 6px;
  margin-top: 12px;
}
.layout-v2 .admin-heatmap i {
  height: 18px;
  border-radius: 4px;
  background: #dbeafe;
}
.layout-v2 .admin-heatmap .level-2 { background: #93c5fd; }
.layout-v2 .admin-heatmap .level-3 { background: #3b82f6; }
.layout-v2 .admin-heatmap .level-4 { background: #1d4ed8; }
.layout-v2 .system-panel p {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin: 10px 0;
  padding-top: 10px;
  border-top: 1px solid #e2e8f0;
}
.layout-v2 .system-panel span { color: #3157d5; font-weight: 800; }
.layout-v2 .saas-feature-grid,
.layout-v2 .saas-pricing,
.layout-v2 .corp-stories {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 18px;
}
.layout-v2 .saas-feature-grid article,
.layout-v2 .saas-pricing article,
.layout-v2 .corp-stories article {
  padding: 22px;
  background: rgba(255,255,255,.82);
  border: 1px solid rgba(15,23,42,.1);
  border-radius: 18px;
  box-shadow: var(--shadow-sm);
}
.layout-v2 .saas-pricing .featured {
  color: #fff;
  background: #111827;
}
.layout-v2 .saas-pricing .featured p { color: #cbd5e1; }
.layout-v2 .saas-pricing b {
  display: block;
  margin: 8px 0;
  font-size: 38px;
}
.layout-v2 .docs-top input {
  height: 44px;
  border-radius: 999px;
  box-shadow: inset 0 0 0 1px #e2e8f0;
}
.layout-v2 .docs-tree a.active,
.layout-v2 .docs-tree a:hover,
.layout-v2 .docs-anchor a:hover {
  color: #3157d5;
  background: #eef2ff;
  border-radius: 8px;
}
.layout-v2 .commerce-toolbar {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  gap: 10px;
}
.layout-v2 .commerce-console {
  background:
    linear-gradient(90deg, #f7f3ea 0 250px, #f8faf7 250px calc(100% - 345px), #fff calc(100% - 345px));
}
.layout-v2 .crm-board {
  background:
    linear-gradient(90deg, rgba(37,99,235,.06) 1px, transparent 1px),
    linear-gradient(180deg, #f3f7ff, #eef4ff);
  background-size: 34px 34px, auto;
}
.layout-v2 .analytics-wall {
  color: #1f2937;
  background:
    linear-gradient(90deg, rgba(15,23,42,.04) 1px, transparent 1px),
    linear-gradient(180deg, #f8fafc, #eef2f7);
  background-size: 44px 44px, auto;
}
.layout-v2 .analytics-top h1,
.layout-v2 .analytics-wall h2 { color: #111827; }
.layout-v2 .analysis-tabs span,
.layout-v2 .filter-chips span,
.layout-v2 .signal-hero,
.layout-v2 .signal-stack .metric,
.layout-v2 .anomaly-list,
.layout-v2 .segment-card {
  color: #1f2937;
  background: #fff;
  border-color: #d9e2ec;
}
.layout-v2 .analysis-tabs .active {
  color: #fff;
  background: #3157d5;
}
.layout-v2 .signal-hero strong,
.layout-v2 .segment-card strong {
  color: #111827;
}
.layout-v2 .wave i {
  border-radius: 6px 6px 0 0;
  background: linear-gradient(180deg, #64748b, #3157d5);
}
.layout-v2 .case-story {
  grid-template-columns: repeat(4, 1fr);
}
.layout-v2 .settings-header,
.layout-v2 .settings-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}
.layout-v2 .settings-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.layout-v2 .onboarding-flow {
  background:
    radial-gradient(circle at 12% 10%, rgba(49,87,213,.12), transparent 32%),
    linear-gradient(135deg, #f8fafc, #fff7ed);
}
.layout-v2 .stepper span {
  border-radius: 12px;
}
.layout-v2 .marketplace-page {
  grid-template-columns: 230px minmax(0, 1fr) 300px;
  align-items: start;
  gap: 18px;
  background: #f3f6f8;
}
.layout-v2 .market-search {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 180px;
  gap: 28px;
  align-items: end;
  border-radius: 10px;
  background:
    linear-gradient(135deg, rgba(5,46,22,.94), rgba(15,23,42,.96)),
    linear-gradient(90deg, #10b981, #38bdf8);
}
.layout-v2 .market-search h1 {
  max-width: 1080px;
  margin-bottom: 22px;
  font-size: clamp(40px, 5vw, 68px);
  letter-spacing: 0;
}
.layout-v2 .market-search label {
  display: grid;
  max-width: 760px;
  gap: 8px;
  color: rgba(255,255,255,.74);
  font-weight: 800;
}
.layout-v2 .market-search input {
  width: 100%;
  min-height: 52px;
  border: 1px solid rgba(255,255,255,.26);
  border-radius: 8px;
  padding: 0 16px;
  background: rgba(255,255,255,.96);
  color: #0f172a;
  font: inherit;
}
.layout-v2 .market-search aside {
  display: grid;
  gap: 4px;
  padding: 18px;
  border: 1px solid rgba(255,255,255,.22);
  border-radius: 8px;
  background: rgba(255,255,255,.1);
  color: rgba(255,255,255,.75);
}
.layout-v2 .market-search aside b {
  color: #fff;
  font-size: 32px;
}
.layout-v2 .market-filter {
  position: sticky;
  top: 18px;
  border-color: #d8dee4;
  box-shadow: 0 1px 0 rgba(15,23,42,.04);
}
.layout-v2 .market-filter label {
  display: flex;
  gap: 8px;
  align-items: center;
  min-height: 34px;
  color: #334155;
  font-weight: 700;
}
.layout-v2 .market-results {
  min-width: 0;
}
.layout-v2 .market-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  margin-bottom: 14px;
  padding: 16px 18px;
  border: 1px solid #d8dee4;
  border-radius: 8px;
  background: #fff;
}
.layout-v2 .market-toolbar b,
.layout-v2 .market-toolbar span {
  display: block;
}
.layout-v2 .market-toolbar span {
  margin-top: 4px;
  color: #64748b;
  font-size: 13px;
}
.layout-v2 .market-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.layout-v2 .market-card {
  display: grid;
  grid-template-rows: 138px 1fr;
  min-height: 344px;
  overflow: hidden;
  padding: 0;
  border-color: #d8dee4;
  box-shadow: 0 1px 0 rgba(15,23,42,.04);
}
.layout-v2 .market-card-preview {
  display: grid;
  grid-template-columns: 1.2fr .8fr;
  gap: 8px;
  padding: 16px;
  background: #0f172a;
}
.layout-v2 .market-card-preview i {
  min-height: 28px;
  border-radius: 6px;
  background: rgba(255,255,255,.82);
}
.layout-v2 .market-card-preview i:first-child {
  grid-row: span 2;
  background: #86efac;
}
.layout-v2 .market-card-preview.docs { background: #111827; }
.layout-v2 .market-card-preview.docs i:first-child { background: #93c5fd; }
.layout-v2 .market-card-preview.crm { background: #1e3a8a; }
.layout-v2 .market-card-preview.crm i:first-child { background: #fde68a; }
.layout-v2 .market-card-preview.table { background: #0f766e; }
.layout-v2 .market-card-preview.table i:first-child { background: #ccfbf1; }
.layout-v2 .market-card-preview.drawer { background: #581c87; }
.layout-v2 .market-card-preview.drawer i:first-child { background: #f5d0fe; }
.layout-v2 .market-card-body {
  display: grid;
  align-content: start;
  gap: 10px;
  padding: 16px;
}
.layout-v2 .market-card-body small {
  display: inline-flex;
  width: fit-content;
  margin: 0;
  padding: 5px 8px;
  border-radius: 999px;
  background: #ecfdf5;
  color: #047857;
  font-weight: 800;
}
.layout-v2 .market-card-body p {
  min-height: 56px;
  margin: 0;
}
.layout-v2 .market-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid #e2e8f0;
}
.layout-v2 .market-actions span {
  color: #64748b;
  font-size: 12px;
  font-weight: 800;
}
.layout-v2 .market-featured {
  padding: 22px;
  border: 1px solid #d8dee4;
  border-radius: 8px;
  background: #fff;
}
.layout-v2 .market-featured h2 {
  margin: 18px 0 10px;
  font-size: 30px;
}
.layout-v2 .collection-stack {
  display: grid;
  gap: 8px;
  margin: 20px 0;
}
.layout-v2 .collection-stack span {
  padding: 12px;
  border: 1px solid #d8dee4;
  border-radius: 8px;
  background: #f8fafc;
  font-weight: 800;
}
.layout-v2 .review-console-shell {
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr) 360px;
  grid-template-rows: auto 1fr;
  gap: 16px;
  min-height: 100vh;
  padding: 18px;
  background:
    linear-gradient(90deg, rgba(15,23,42,.04) 1px, transparent 1px),
    linear-gradient(180deg, #f4f6f8, #eef2f7);
  background-size: 36px 36px, auto;
}
.layout-v2 .review-console-shell .master-detail-top {
  grid-column: 1 / -1;
}
.layout-v2 .master-detail-top span {
  color: #64748b;
}
.layout-v2 .review-console-shell .master-filters {
  border-left: 4px solid #111827;
}
.layout-v2 .master-filters a {
  display: flex;
  justify-content: space-between;
}
.layout-v2 .master-filters label {
  display: flex;
  gap: 8px;
  margin: 10px 0;
  color: #334155;
  font-weight: 800;
}
.layout-v2 .record-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.layout-v2 .record-summary .metric {
  box-shadow: none;
}
.layout-v2 .master-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}
.layout-v2 .master-table th,
.layout-v2 .master-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #dbe3ef;
}
.layout-v2 .master-table tr.selected {
  background: #eef4ff;
}
.layout-v2 .linked-records {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 16px;
}
.layout-v2 .linked-records article {
  padding: 16px;
  background: #f8fafc;
  border: 1px solid #dbe3ef;
  border-radius: 12px;
}
.layout-v2 .detail-inspector header {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 12px;
}
.layout-v2 .detail-inspector header span {
  padding: 6px 8px;
  color: #3157d5;
  background: #eef2ff;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 900;
}
.layout-v2 .inspector-list.comments {
  background: #f8fafc;
}
.layout-v2 .personal-proof {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
}
.layout-v2 .personal-proof span {
  padding: 10px 12px;
  background: #111827;
  color: #fff;
  border-radius: 999px;
  font-weight: 800;
}
.layout-v2 .personal-portfolio-page {
  max-width: none;
  min-height: 100vh;
  padding: 24px 34px 56px;
  background:
    linear-gradient(90deg, rgba(15,23,42,.035) 1px, transparent 1px),
    linear-gradient(180deg, #fff, #f7fafc);
  background-size: 48px 48px, auto;
}
.layout-v2 .personal-nav {
  padding-bottom: 18px;
  border-bottom: 1px solid #dbe3ef;
}
.layout-v2 .personal-hero h1 {
  max-width: 980px;
  line-height: .92;
}
.layout-v2 .portfolio-marquee {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 18px;
}
.layout-v2 .portfolio-marquee article {
  padding: 20px;
  color: #fff;
  background: linear-gradient(135deg, #111827, #24324a);
  border-radius: 18px;
}
.layout-v2 .portfolio-marquee span,
.layout-v2 .portfolio-marquee h2,
.layout-v2 .portfolio-marquee p {
  color: inherit;
}
.layout-v2 .selected-work article p {
  color: #475569;
}
.layout-v2 .selected-work article {
  background: rgba(255,255,255,.86);
  box-shadow: 0 18px 50px rgba(15,23,42,.08);
}
.layout-v2 .portfolio-notes {
  grid-template-columns: repeat(3, 1fr);
}
.layout-v2 .writing-home {
  background:
    linear-gradient(90deg, #fff 0 280px, #fbf5e8 280px calc(100% - 260px), #fff calc(100% - 260px));
}
.layout-v2 .writing-feed h1 {
  max-width: 900px;
  line-height: .96;
}
.layout-v2 .writing-profile nav {
  display: grid;
  gap: 8px;
  margin-top: 28px;
}
.layout-v2 .writing-profile nav span {
  padding: 10px;
  background: #f8fafc;
  border: 1px solid #eadfcb;
  border-radius: 999px;
  font-weight: 900;
}
.layout-v2 .writing-feed .featured-essay {
  padding: 28px;
  background: #fff;
  border: 1px solid #eadfcb;
  border-radius: 18px;
}
.layout-v2 .writing-feed .featured-essay h2 {
  font-size: 30px;
}
.layout-v2 .essay-list article {
  display: grid;
  grid-template-columns: 90px minmax(0, 1fr);
  gap: 18px;
}
.layout-v2 .essay-list time {
  grid-row: 1 / span 2;
}
.layout-v2 .essay-list h2,
.layout-v2 .essay-list p {
  grid-column: 2;
  margin: 0;
}
.layout-v2 .corp-stories {
  grid-template-columns: repeat(2, 1fr);
}
.layout-v2 .services-cards {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.layout-v2 .enterprise-modules {
  grid-template-columns: repeat(4, 1fr);
}
.layout-v2 .ai-workspace {
  grid-template-columns: 260px minmax(0, 1fr) 380px;
  align-items: start;
  background:
    linear-gradient(90deg, #111827 0 260px, #f5f7fb 260px calc(100% - 380px), #182033 calc(100% - 380px));
}
.layout-v2 .thread-list {
  background: #111827;
  color: #f8fafc;
}
.layout-v2 .thread-list p {
  display: grid;
  gap: 4px;
  color: #cbd5e1;
  background: rgba(255,255,255,.04);
}
.layout-v2 .thread-list p span,
.layout-v2 .context-stack em {
  color: #94a3b8;
  font-style: normal;
  font-size: 12px;
}
.layout-v2 .context-stack {
  display: grid;
  gap: 8px;
  margin-top: 28px;
  padding-top: 22px;
  border-top: 1px solid rgba(255,255,255,.12);
}
.layout-v2 .writing-canvas {
  display: grid;
  grid-template-rows: auto auto auto auto;
  align-content: start;
  gap: 18px;
  margin: 20px;
  padding: 24px;
  min-height: auto;
  background: #fff;
  border-color: rgba(49,87,213,.14);
  box-shadow: 0 26px 80px rgba(15,23,42,.12);
}
.layout-v2 .artifact-toolbar,
.layout-v2 .run-queue,
.layout-v2 .docs-next,
.layout-v2 .enterprise-stack header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}
.layout-v2 .artifact-card {
  padding: 28px;
  background: linear-gradient(135deg, #111827, #24324d);
  border-radius: 22px;
  color: #fff;
}
.layout-v2 .artifact-card h2,
.layout-v2 .artifact-card p {
  color: inherit;
}
.layout-v2 .doc-kicker {
  display: inline-flex;
  margin-bottom: 16px;
  color: #bfdbfe;
  font-size: 12px;
  font-weight: 900;
  text-transform: uppercase;
}
.layout-v2 .evidence-row,
.layout-v2 .artifact-grid {
  display: grid;
  gap: 12px;
}
.layout-v2 .evidence-row {
  grid-template-columns: repeat(3, 1fr);
  margin-top: 22px;
}
.layout-v2 .evidence-row span,
.layout-v2 .run-queue span {
  padding: 9px 10px;
  color: #1d4ed8;
  background: #dbeafe;
  border-radius: 999px;
  font-weight: 800;
  font-size: 12px;
}
.layout-v2 .artifact-grid {
  grid-template-columns: repeat(3, 1fr);
}
.layout-v2 .claim-card,
.layout-v2 .approval-card,
.layout-v2 .tool-call {
  padding: 16px;
  background: #f8fafc;
  border: 1px solid #d9e2ec;
  border-radius: 16px;
}
.layout-v2 .claim-card {
  min-height: 150px;
}
.layout-v2 .claim-card.good {
  background: #ecfdf5;
  border-color: #bbf7d0;
}
.layout-v2 .run-queue {
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
}
.layout-v2 .run-queue .running {
  color: #fff;
  background: #3157d5;
}
.layout-v2 .copilot-panel {
  color: #e5e7eb;
  background: #182033;
}
.layout-v2 .copilot-panel h2,
.layout-v2 .copilot-panel p {
  color: inherit;
}
.layout-v2 .tool-call {
  color: #dbeafe;
  background: rgba(96,165,250,.12);
  border-color: rgba(147,197,253,.28);
}
.layout-v2 .tool-call span,
.layout-v2 .tool-call em {
  display: block;
  margin-top: 6px;
  color: #93c5fd;
  font-style: normal;
}
.layout-v2 .approval-card {
  margin-top: 14px;
  color: #111827;
  background: #fff;
}
.layout-v2 .approval-card button {
  margin-right: 8px;
}
.layout-v2 .docs-top {
  grid-template-columns: 240px minmax(0, 1fr) auto;
}
.layout-v2 .docs-search {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  margin: 0;
  padding: 4px 6px 4px 14px;
  background: #f8fafc;
  border: 1px solid #d9e2ec;
  border-radius: 999px;
}
.layout-v2 .docs-search span {
  color: #64748b;
  font-size: 12px;
  font-weight: 900;
}
.layout-v2 .docs-search input {
  height: 38px;
  border: 0;
  box-shadow: none;
  background: transparent;
}
.layout-v2 .docs-callout {
  display: grid;
  gap: 6px;
  margin: 24px 0;
  padding: 18px;
  background: #eef2ff;
  border-left: 5px solid #3157d5;
  border-radius: 12px;
}
.layout-v2 .param-table {
  margin-top: 22px;
  background: #fff;
  border: 1px solid #e2e8f0;
}
.layout-v2 .docs-next {
  margin-top: 28px;
}
.layout-v2 .docs-next a {
  flex: 1;
  padding: 16px;
  color: #3157d5;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-weight: 800;
}
.layout-v2 .docs-anchor span {
  display: inline-flex;
  margin: 8px 6px 0 0;
  padding: 7px 9px;
  color: #3157d5;
  background: #eef2ff;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
}
.layout-v2.layout-landing {
  background:
    radial-gradient(circle at 72% 12%, rgba(56,189,248,.22), transparent 34%),
    linear-gradient(180deg, #f9fbff 0%, #eef5ff 44%, #f8fafc 100%);
}
.layout-v2 .saas-page {
  max-width: none;
  padding: 24px 42px 52px;
}
.layout-v2 .saas-nav {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr) auto;
  padding: 10px 0 18px;
  border-bottom: 1px solid rgba(15,23,42,.08);
}
.layout-v2 .saas-brand,
.layout-v2 .saas-nav-actions,
.layout-v2 .docs-product,
.layout-v2 .docs-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}
.layout-v2 .saas-brand span,
.layout-v2 .docs-product span {
  color: #64748b;
  font-size: 12px;
  font-weight: 800;
}
.layout-v2 .saas-links {
  display: flex;
  justify-content: center;
  gap: 32px;
  color: #475569;
  font-weight: 800;
}
.layout-v2 .saas-nav-actions button {
  height: 38px;
}
.layout-v2 .saas-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 520px;
  gap: 34px;
  min-height: 570px;
  align-items: center;
}
.layout-v2 .saas-copy h1 {
  max-width: 820px;
  font-size: 74px;
  line-height: .94;
  letter-spacing: 0;
}
.layout-v2 .saas-copy p {
  max-width: 720px;
  color: #344054;
  font-size: 19px;
  line-height: 1.55;
}
.layout-v2 .hero-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  max-width: 760px;
}
.layout-v2 .hero-stats span,
.layout-v2 .saas-feature-grid article,
.layout-v2 .saas-workflow {
  border: 1px solid rgba(15,23,42,.1);
  background: rgba(255,255,255,.74);
  box-shadow: 0 18px 50px rgba(15,23,42,.08);
}
.layout-v2 .hero-stats span {
  padding: 16px;
  border-radius: 14px;
}
.layout-v2 .hero-stats strong {
  display: block;
  font-size: 30px;
}
.layout-v2 .product-shot {
  width: auto;
  min-height: 548px;
  padding: 18px;
  border: 1px solid rgba(255,255,255,.72);
  border-radius: 30px;
  background: #0b1220;
  box-shadow: 0 42px 100px rgba(30,64,175,.25);
  transform: none;
}
.layout-v2 .product-shot::before {
  content: none;
}
.layout-v2 .shot-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: auto;
  padding: 18px;
  color: #fff;
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  border-radius: 20px;
}
.layout-v2 .shot-top b,
.layout-v2 .shot-top span {
  display: block;
}
.layout-v2 .shot-top span {
  margin-top: 4px;
  color: #dbeafe;
  font-size: 12px;
  font-weight: 800;
}
.layout-v2 .shot-top em {
  padding: 8px 10px;
  color: #dbeafe;
  background: rgba(255,255,255,.16);
  border-radius: 999px;
  font-style: normal;
  font-weight: 900;
}
.layout-v2 .shot-grid {
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.layout-v2 .shot-grid i {
  display: grid;
  align-content: center;
  height: 88px;
  padding: 12px;
  color: #dbeafe;
  background: #152033;
  border: 1px solid rgba(148,163,184,.2);
}
.layout-v2 .shot-grid b,
.layout-v2 .shot-grid span {
  display: block;
  font-style: normal;
}
.layout-v2 .shot-grid span {
  margin-top: 8px;
  color: #93c5fd;
  font-size: 12px;
}
.layout-v2 .shot-chart {
  height: 150px;
  padding: 14px;
  background: #111a2c;
  border-radius: 18px;
}
.layout-v2 .shot-chart i:nth-child(5) { height: 68%; }
.layout-v2 .shot-chart i:nth-child(6) { height: 92%; }
.layout-v2 .shot-table {
  display: grid;
  gap: 8px;
  margin-top: 14px;
}
.layout-v2 .shot-table p {
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 12px;
  color: #e5e7eb;
  background: #101827;
  border: 1px solid rgba(148,163,184,.16);
  border-radius: 14px;
}
.layout-v2 .shot-table span {
  color: #93c5fd;
}
.layout-v2 .logo-strip {
  justify-content: start;
  gap: 28px;
  padding: 18px 0;
}
.layout-v2 .logo-strip span {
  color: #64748b;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: .08em;
}
.layout-v2 .saas-feature-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}
.layout-v2 .saas-feature-grid article {
  padding: 22px;
  border-radius: 18px;
}
.layout-v2 .saas-feature-grid article b {
  color: #2563eb;
}
.layout-v2 .saas-feature-grid h2 {
  margin: 10px 0 8px;
  font-size: 24px;
}
.layout-v2 .saas-workflow {
  display: grid;
  grid-template-columns: 360px minmax(0, 1fr);
  gap: 24px;
  margin-top: 18px;
  padding: 24px;
  border-radius: 22px;
}
.layout-v2 .saas-workflow span {
  color: #64748b;
}
.layout-v2 .saas-workflow h2 {
  margin: 8px 0 0;
  font-size: 30px;
}
.layout-v2 .saas-workflow ol {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.layout-v2 .saas-workflow li {
  padding: 14px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
}
.layout-v2 .saas-workflow b,
.layout-v2 .saas-workflow li span {
  display: block;
}
.layout-v2 .ai-workspace {
  grid-template-columns: 280px minmax(0, 1fr) 390px;
  color: #172033;
  background:
    linear-gradient(90deg, #0b1020 0 280px, #f4f7fb 280px calc(100% - 390px), #101827 calc(100% - 390px));
}
.layout-v2 .thread-list,
.layout-v2 .copilot-panel {
  min-height: 100vh;
}
.layout-v2 .thread-list {
  padding: 22px;
  background:
    radial-gradient(circle at top left, rgba(59,130,246,.2), transparent 30%),
    #0b1020;
}
.layout-v2 .workspace-mark b,
.layout-v2 .workspace-mark span {
  display: block;
}
.layout-v2 .workspace-mark span {
  margin-top: 4px;
  color: #94a3b8;
  font-size: 12px;
  font-weight: 800;
}
.layout-v2 .new-run {
  width: 100%;
  margin: 18px 0 8px;
  background: #2563eb;
}
.layout-v2 .thread-list p {
  margin: 10px 0;
  border: 1px solid rgba(148,163,184,.12);
  border-radius: 14px;
}
.layout-v2 .thread-list .active {
  background: linear-gradient(135deg, rgba(37,99,235,.28), rgba(255,255,255,.06));
  border-color: rgba(96,165,250,.45);
}
.layout-v2 .source-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-top: 18px;
}
.layout-v2 .source-grid span {
  padding: 10px;
  color: #bfdbfe;
  background: rgba(96,165,250,.12);
  border: 1px solid rgba(96,165,250,.2);
  border-radius: 12px;
  font-size: 12px;
  font-weight: 900;
}
.layout-v2 .writing-canvas {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 18px;
  min-height: calc(100vh - 36px);
  padding: 24px;
  background:
    linear-gradient(180deg, rgba(255,255,255,.96), rgba(247,250,255,.96)),
    repeating-linear-gradient(90deg, rgba(15,23,42,.035) 0 1px, transparent 1px 32px);
  border: 1px solid rgba(100,116,139,.18);
  border-radius: 24px;
  box-shadow: 0 24px 80px rgba(15,23,42,.1);
}
.layout-v2 .artifact-toolbar {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 18px;
}
.layout-v2 .artifact-toolbar > div:first-child {
  min-width: 0;
}
.layout-v2 .artifact-toolbar > div:last-child {
  display: flex;
  flex: 0 0 auto;
  gap: 8px;
}
.layout-v2 .artifact-toolbar h1 {
  margin: 4px 0;
  font-size: 34px;
}
.layout-v2 .artifact-toolbar span {
  color: #64748b;
}
.layout-v2 .workspace-tabs {
  display: flex;
  gap: 8px;
  padding: 6px;
  background: #e9eef7;
  border-radius: 14px;
}
.layout-v2 .workspace-tabs b,
.layout-v2 .workspace-tabs span {
  padding: 9px 12px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 900;
}
.layout-v2 .workspace-tabs b {
  color: #1d4ed8;
  background: #fff;
}
.layout-v2 .artifact-card {
  padding: 26px;
  color: #f8fafc;
  background: linear-gradient(135deg, #172033, #253a5e);
  border-radius: 22px;
}
.layout-v2 .artifact-card h2 {
  font-size: 24px;
}
.layout-v2 .artifact-card p {
  color: #dbeafe;
}
.layout-v2 .evidence-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.layout-v2 .evidence-row span {
  padding: 10px 12px;
  color: #bfdbfe;
  background: rgba(255,255,255,.1);
  border: 1px solid rgba(219,234,254,.18);
  border-radius: 999px;
  font-size: 12px;
  font-weight: 900;
}
.layout-v2 .claim-card {
  position: relative;
  padding: 18px;
  background: #fff;
  border-radius: 16px;
}
.layout-v2 .claim-card em {
  display: inline-flex;
  margin-top: 14px;
  padding: 6px 8px;
  color: #475569;
  background: #f1f5f9;
  border-radius: 999px;
  font-style: normal;
  font-size: 12px;
  font-weight: 900;
}
.layout-v2 .claim-card.risk {
  border-color: #fecaca;
  background: #fff7f7;
}
.layout-v2 .claim-card.good {
  border-color: #86efac;
  background: #ecfdf5;
}
.layout-v2 .draft-metadata {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.layout-v2 .draft-metadata div {
  padding: 14px;
  background: #f8fafc;
  border: 1px solid #dbe3ef;
  border-radius: 14px;
}
.layout-v2 .draft-metadata b,
.layout-v2 .draft-metadata span {
  display: block;
}
.layout-v2 .draft-metadata span {
  margin-top: 6px;
  color: #64748b;
}
.layout-v2 .workspace-review {
  display: grid;
  grid-template-columns: 1.1fr .9fr;
  gap: 12px;
}
.layout-v2 .workspace-review article {
  padding: 16px;
  background: #fff;
  border: 1px solid #dbe3ef;
  border-radius: 16px;
}
.layout-v2 .workspace-review p {
  display: flex;
  justify-content: space-between;
  margin: 10px 0 0;
  padding: 10px;
  color: #475569;
  background: #f8fafc;
  border-radius: 10px;
}
.layout-v2 .workspace-review strong {
  color: #0f172a;
}
.layout-v2 .workspace-review ol {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding: 0;
  list-style: none;
}
.layout-v2 .workspace-review li {
  padding: 10px;
  color: #475569;
  background: #f8fafc;
  border-radius: 10px;
}
.layout-v2 .run-queue {
  margin-top: 0;
  padding-top: 16px;
}
.layout-v2 .copilot-panel {
  padding: 22px;
  color: #f8fafc;
  background:
    radial-gradient(circle at 80% 0%, rgba(37,99,235,.28), transparent 36%),
    #101827;
}
.layout-v2 .copilot-panel header {
  display: flex;
  align-items: start;
  justify-content: space-between;
  margin-bottom: 14px;
}
.layout-v2 .copilot-panel h2 {
  margin: 0;
}
.layout-v2 .copilot-panel header span {
  color: #94a3b8;
  font-size: 12px;
  font-weight: 800;
}
.layout-v2 .tool-timeline {
  display: grid;
  gap: 8px;
  margin: 14px 0;
}
.layout-v2 .tool-timeline p {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  padding: 10px;
  color: #cbd5e1;
  background: rgba(255,255,255,.05);
  border-radius: 12px;
}
.layout-v2 .tool-timeline b {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  color: #bfdbfe;
  background: rgba(96,165,250,.18);
  border-radius: 999px;
}
.layout-v2.layout-docs {
  background: #fff;
}
.layout-v2 .docs-top {
  grid-template-columns: 250px minmax(0, 1fr) auto;
  padding: 12px 20px;
  background: rgba(255,255,255,.92);
  backdrop-filter: blur(16px);
}
.layout-v2 .docs-product b {
  white-space: nowrap;
}
.layout-v2 .docs-search {
  grid-template-columns: auto minmax(0, 1fr) auto;
  height: 52px;
  padding: 0 10px 0 16px;
  background: #f8fafc;
  border-color: #cbd5e1;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.8), 0 12px 28px rgba(15,23,42,.06);
}
.layout-v2 .docs-search span,
.layout-v2 .docs-search em {
  color: #64748b;
  font-size: 12px;
  font-style: normal;
  font-weight: 900;
}
.layout-v2 .docs-search em {
  padding: 7px 9px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}
.layout-v2 .docs-shell {
  grid-template-columns: 280px minmax(0, 1fr) 260px;
  background: linear-gradient(90deg, #f8fafc 0 280px, #fff 280px calc(100% - 260px), #f8fafc calc(100% - 260px));
}
.layout-v2 .docs-tree,
.layout-v2 .docs-anchor {
  padding: 24px 20px;
}
.layout-v2 .docs-tree-head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}
.layout-v2 .docs-tree-head span {
  color: #64748b;
  font-size: 12px;
  font-weight: 900;
}
.layout-v2 .docs-tree a {
  margin: 4px 0;
  border-radius: 10px;
}
.layout-v2 .doc-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 14px 0 22px;
}
.layout-v2 .doc-tags span,
.layout-v2 .floating-tags span {
  padding: 7px 9px;
  color: #1d4ed8;
  background: #eef2ff;
  border: 1px solid #dbe4ff;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 900;
}
.layout-v2 .docs-content {
  max-width: 920px;
  padding: 46px 56px 70px;
}
.layout-v2 .docs-content h1 {
  max-width: 820px;
  font-size: 56px;
  line-height: 1;
}
.layout-v2 .docs-card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 24px 0;
}
.layout-v2 .docs-card-grid article {
  padding: 18px;
  background: #f8fafc;
  border: 1px solid #dbe3ef;
  border-radius: 16px;
}
.layout-v2 .docs-card-grid b {
  color: #2563eb;
}
.layout-v2 .docs-card-grid h2 {
  margin: 10px 0 6px;
  font-size: 18px;
}
.layout-v2 .floating-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 22px;
}
.layout-v2 .floating-tags span {
  margin: 0;
}
.layout-v2.layout-news {
  background: #edf2f7;
}
.layout-v2 .newspaper {
  max-width: none;
  min-height: 100vh;
  margin: 0;
  padding: 24px 44px 56px;
  color: #161b24;
  background: #fffdf6;
}
.layout-v2 .paper-head {
  gap: 18px;
  padding-bottom: 12px;
  border-bottom: 4px double #111827;
}
.layout-v2 .paper-head b {
  font-size: 64px;
  line-height: .9;
}
.layout-v2 .paper-nav {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0;
  border-bottom: 1px solid #111827;
}
.layout-v2 .paper-nav span {
  padding: 10px 12px;
  border-right: 1px solid rgba(17,24,39,.18);
  font-size: 13px;
  font-weight: 900;
  text-align: center;
}
.layout-v2 .paper-grid {
  grid-template-columns: 1.2fr .95fr 360px;
  gap: 18px;
  margin-top: 18px;
}
.layout-v2 .paper-lead {
  padding-right: 10px;
}
.layout-v2 .paper-lead h1 {
  font-size: 64px;
  line-height: .95;
}
.layout-v2 .paper-photo {
  min-height: 390px;
  background:
    linear-gradient(135deg, rgba(17,24,39,.78), rgba(37,99,235,.2)),
    repeating-linear-gradient(45deg, #c7d2fe 0 18px, #f8fafc 18px 36px);
}
.layout-v2 .paper-briefs {
  background: #fffaf0;
}
.layout-v2 .paper-briefs p {
  margin: 0;
  padding: 13px 0;
}
.layout-v2 .paper-columns {
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}
.layout-v2 .paper-columns article {
  min-height: 180px;
  background: #fffdf7;
}
.layout-v2 .paper-columns h2 {
  font-size: 20px;
  line-height: 1.2;
}
.layout-v2 .paper-bottom {
  display: grid;
  grid-template-columns: 1.2fr .9fr .9fr;
  gap: 14px;
  margin-top: 18px;
}
.layout-v2 .paper-bottom article {
  padding: 18px;
  background: #111827;
  color: #f8fafc;
}
.layout-v2 .paper-bottom b,
.layout-v2 .paper-bottom p,
.layout-v2 .paper-bottom li {
  color: inherit;
}
.layout-v2.layout-commerce {
  background: #f6f3ea;
}
.layout-v2 .commerce-console {
  grid-template-columns: 240px minmax(0, 1fr) 330px;
  grid-template-rows: auto 1fr;
  gap: 16px;
  padding: 18px 20px;
  background:
    linear-gradient(90deg, #f3eee2 0 260px, #f8faf7 260px calc(100% - 350px), #fff calc(100% - 350px));
}
.layout-v2 .commerce-top {
  padding: 8px 0 12px;
  border-bottom: 1px solid rgba(15,23,42,.08);
}
.layout-v2 .commerce-top span {
  display: block;
  margin-top: 4px;
  color: #64748b;
}
.layout-v2 .commerce-filters,
.layout-v2 .order-drawer,
.layout-v2 .order-workbench {
  border-color: #d7d0bd;
  border-radius: 12px;
  box-shadow: 0 18px 44px rgba(86,76,54,.08);
}
.layout-v2 .commerce-filters a {
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
  padding: 10px;
  color: #334155;
  background: #f8faf7;
  border-radius: 10px;
  font-weight: 800;
}
.layout-v2 .commerce-filters a.active {
  color: #166534;
  background: #e9f8ed;
}
.layout-v2 .order-analytics {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.layout-v2 .order-analytics .metric {
  border-color: #d7d0bd;
  box-shadow: none;
}
.layout-v2 .commerce-toolbar {
  grid-template-columns: minmax(0, 1fr) auto auto auto;
}
.layout-v2 .fulfillment-lanes {
  grid-template-columns: repeat(4, 1fr);
}
.layout-v2 .fulfillment-lanes article {
  min-height: 118px;
  background: #fff9e8;
  border-color: #e7d28b;
}
.layout-v2 .order-workbench table {
  font-size: 12px;
}
.layout-v2 .pill.hold {
  color: #92400e;
  background: #fef3c7;
}
.layout-v2 .pill.done {
  color: #166534;
  background: #dcfce7;
}
.layout-v2 .customer-card,
.layout-v2 .drawer-notes {
  margin: 14px 0;
  padding: 14px;
  background: #f8faf7;
  border: 1px solid #d7d0bd;
  border-radius: 12px;
}
.layout-v2 .commerce-bottom,
.layout-v2 .crm-bottom {
  display: grid;
  gap: 12px;
}
.layout-v2 .commerce-bottom {
  grid-template-columns: 1fr 1fr;
}
.layout-v2 .commerce-bottom article,
.layout-v2 .crm-bottom article {
  padding: 16px;
  background: #fff;
  border: 1px solid #d7d0bd;
  border-radius: 12px;
}
.layout-v2 .commerce-bottom p,
.layout-v2 .crm-bottom p {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin: 10px 0 0;
  padding: 10px;
  color: #475569;
  background: #f8faf7;
  border-radius: 10px;
}
.layout-v2 .customer-card b,
.layout-v2 .customer-card span {
  display: block;
}
.layout-v2 .customer-card span {
  margin-top: 4px;
  color: #64748b;
}
.layout-v2.layout-crm {
  background: #eaf2ff;
}
.layout-v2 .crm-board {
  grid-template-columns: 210px minmax(0, 1fr) 340px;
  grid-template-rows: 1fr;
  gap: 16px;
  padding: 18px;
  background:
    linear-gradient(90deg, rgba(37,99,235,.06) 1px, transparent 1px),
    linear-gradient(180deg, #edf5ff, #f7fbff);
  background-size: 34px 34px, auto;
}
.layout-v2 .crm-rail,
.layout-v2 .account-panel {
  min-height: calc(100vh - 36px);
}
.layout-v2 .crm-rail {
  padding: 18px;
  color: #eaf2ff;
  background: linear-gradient(180deg, #0b4fb3, #082b67);
  border-radius: 16px;
}
.layout-v2 .crm-rail b {
  display: block;
  margin-bottom: 18px;
  color: #fff;
}
.layout-v2 .crm-rail a {
  display: block;
  margin: 8px 0;
  padding: 10px 12px;
  color: #dbeafe;
  border-radius: 10px;
  font-weight: 800;
}
.layout-v2 .crm-rail a.active {
  color: #082b67;
  background: #fff;
}
.layout-v2 .crm-main {
  display: grid;
  gap: 14px;
  align-content: start;
}
.layout-v2 .crm-top {
  grid-column: auto;
  padding: 0;
}
.layout-v2 .crm-top span {
  color: #64748b;
}
.layout-v2 .crm-metrics {
  grid-column: auto;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}
.layout-v2 .crm-content {
  display: grid;
  grid-template-columns: 1.2fr .8fr;
  gap: 12px;
}
.layout-v2 .crm-funnel,
.layout-v2 .crm-task-list {
  padding: 16px;
  background: #fff;
  border: 1px solid #bfdbfe;
  border-radius: 14px;
}
.layout-v2 .funnel-bars {
  display: grid;
  gap: 8px;
}
.layout-v2 .funnel-bars span {
  display: block;
  padding: 9px 12px;
  color: #fff;
  background: linear-gradient(90deg, #2563eb, #60a5fa);
  border-radius: 999px;
  font-size: 12px;
  font-weight: 900;
}
.layout-v2 .crm-task-list p {
  display: grid;
  grid-template-columns: 58px minmax(0, 1fr);
  gap: 10px;
  margin: 8px 0;
  padding: 10px;
  background: #f3f7ff;
  border-radius: 10px;
}
.layout-v2 .kanban {
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  min-height: 0;
}
.layout-v2 .kanban > div {
  min-height: 360px;
  border-radius: 14px;
}
.layout-v2 .account-panel {
  border-radius: 16px;
}
.layout-v2 .customer-360 {
  display: grid;
  gap: 8px;
  margin: 14px 0;
}
.layout-v2 .customer-360 span {
  padding: 10px;
  color: #dbeafe;
  background: rgba(96,165,250,.12);
  border: 1px solid rgba(147,197,253,.18);
  border-radius: 10px;
  font-size: 12px;
  font-weight: 800;
}
.layout-v2 .crm-bottom {
  grid-template-columns: repeat(3, 1fr);
}
.layout-v2 .crm-bottom article {
  border-color: #bfdbfe;
}
.layout-v2 .crm-bottom p {
  background: #f3f7ff;
}
.layout-v2.layout-analytics {
  background: #08111f;
}
.layout-v2 .analytics-wall {
  min-height: 100vh;
  padding: 22px;
  color: #dbeafe;
  background:
    linear-gradient(90deg, rgba(56,189,248,.08) 1px, transparent 1px),
    linear-gradient(180deg, #08111f, #111827);
  background-size: 42px 42px, auto;
}
.layout-v2 .analytics-top span {
  color: #94a3b8;
}
.layout-v2 .analytics-top h1,
.layout-v2 .analytics-wall h2 {
  color: #f8fafc;
}
.layout-v2 .analysis-tabs span,
.layout-v2 .filter-chips span {
  color: #bfdbfe;
  background: rgba(15,23,42,.78);
  border-color: rgba(147,197,253,.24);
}
.layout-v2 .analysis-tabs .active {
  color: #06111f;
  background: #67e8f9;
}
.layout-v2 .analytics-kpis {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 14px;
}
.layout-v2 .analytics-kpis .metric,
.layout-v2 .signal-hero,
.layout-v2 .signal-stack .metric,
.layout-v2 .anomaly-list,
.layout-v2 .segment-card,
.layout-v2 .heat-panel,
.layout-v2 .analytics-bottom article {
  color: #dbeafe;
  background: rgba(15,23,42,.82);
  border: 1px solid rgba(147,197,253,.22);
  border-radius: 12px;
}
.layout-v2 .analytics-kpis .metric span,
.layout-v2 .analytics-kpis .metric small,
.layout-v2 .segment-card p,
.layout-v2 .anomaly-list p,
.layout-v2 .analytics-bottom p {
  color: #bfdbfe;
}
.layout-v2 .signal-grid {
  grid-template-columns: minmax(0, 1.2fr) 320px 340px;
}
.layout-v2 .signal-hero strong,
.layout-v2 .segment-card strong {
  color: #f8fafc;
}
.layout-v2 .wave {
  height: 280px;
}
.layout-v2 .wave i {
  border-radius: 8px 8px 0 0;
  background: linear-gradient(180deg, #67e8f9, #2563eb);
}
.layout-v2 .heat-panel {
  padding: 16px;
}
.layout-v2 .heat-panel div {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 6px;
}
.layout-v2 .heat-panel i {
  height: 24px;
  border-radius: 6px;
  background: #1e293b;
}
.layout-v2 .heat-panel .level-1 { background: #172554; }
.layout-v2 .heat-panel .level-2 { background: #1d4ed8; }
.layout-v2 .heat-panel .level-3 { background: #0891b2; }
.layout-v2 .heat-panel .level-4 { background: #67e8f9; }
.layout-v2 .analytics-bottom {
  display: grid;
  grid-template-columns: 1.15fr 1fr .75fr;
  gap: 14px;
  margin-top: 14px;
}
.layout-v2 .analytics-bottom article {
  padding: 16px;
}
.layout-v2 .analytics-bottom p {
  display: flex;
  gap: 10px;
  margin: 8px 0;
}
.layout-v2.layout-portfolio {
  background: #edf2f7;
}
.layout-v2 .case-study {
  max-width: none;
  padding: 24px 44px 56px;
  background:
    linear-gradient(90deg, rgba(15,23,42,.04) 1px, transparent 1px),
    linear-gradient(180deg, #fff, #f8fafc);
  background-size: 48px 48px, auto;
}
.layout-v2 .case-nav {
  display: grid;
  grid-template-columns: 1fr auto auto auto auto;
  gap: 18px;
  align-items: center;
  padding-bottom: 18px;
  border-bottom: 1px solid #dbe3ef;
}
.layout-v2 .case-intro {
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr);
  gap: 42px;
  max-width: none;
  padding: 56px 0 36px;
}
.layout-v2 .case-meta {
  align-self: start;
  display: grid;
  gap: 10px;
  position: sticky;
  top: 24px;
}
.layout-v2 .case-meta span {
  padding: 12px;
  color: #334155;
  background: #fff;
  border: 1px solid #dbe3ef;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 900;
}
.layout-v2 .case-intro h1 {
  max-width: 920px;
  font-size: 82px;
}
.layout-v2 .case-intro p {
  max-width: 760px;
  color: #475569;
  font-size: 19px;
}
.layout-v2 .case-artifact {
  grid-template-columns: minmax(0, 1fr) 320px;
}
.layout-v2 .device-frame {
  min-height: 460px;
  padding: 26px;
  color: #fff;
  background:
    radial-gradient(circle at 88% 10%, rgba(96,165,250,.32), transparent 28%),
    linear-gradient(135deg, #111827, #334155);
  border-radius: 24px;
}
.layout-v2 .device-frame header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
  color: #dbeafe;
}
.layout-v2 .device-frame i {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  height: 92px;
  padding: 0 20px;
  color: #0f172a;
  background: linear-gradient(135deg, #dbeafe, #fff);
}
.layout-v2 .device-frame i span,
.layout-v2 .device-frame i em {
  font-style: normal;
  font-weight: 900;
}
.layout-v2 .device-frame i em {
  color: #475569;
  font-size: 13px;
}
.layout-v2 .case-artifact aside {
  border-radius: 24px;
}
.layout-v2 .case-story {
  grid-template-columns: repeat(4, 1fr);
}
.layout-v2 .case-story article span {
  color: #3157d5;
  font-weight: 900;
}
.layout-v2 .case-process {
  display: grid;
  grid-template-columns: 1.15fr .85fr;
  gap: 18px;
  margin-top: 18px;
}
.layout-v2 .case-process article {
  padding: 24px;
  background: #fff;
  border: 1px solid #dbe3ef;
  border-radius: 18px;
  box-shadow: 0 18px 50px rgba(15,23,42,.07);
}
.layout-v2 .artifact-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.layout-v2 .artifact-strip span {
  min-height: 90px;
  padding: 14px;
  background: #f8fafc;
  border: 1px solid #dbe3ef;
  border-radius: 12px;
  font-weight: 900;
}
.layout-v2 .settings-console {
  grid-template-columns: 280px minmax(0, 1fr);
  background: linear-gradient(90deg, #fff 0 280px, #f5f7fb 280px);
}
.layout-v2 .settings-content {
  max-width: 1180px;
  padding: 36px 42px 60px;
}
.layout-v2 .settings-header span {
  display: block;
  margin-top: 6px;
  color: #64748b;
}
.layout-v2 .settings-header > div:last-child {
  display: flex;
  gap: 10px;
}
.layout-v2 .settings-alert {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 12px;
  align-items: center;
  margin: 18px 0;
  padding: 14px 16px;
  color: #7c2d12;
  background: #fff7ed;
  border: 1px solid #fed7aa;
  border-radius: 12px;
}
.layout-v2 .settings-summary {
  grid-template-columns: repeat(4, 1fr);
}
.layout-v2 .form-grid {
  grid-template-columns: 1fr 1fr;
}
.layout-v2 .integration-panel p,
.layout-v2 .audit-panel p {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin: 10px 0;
  padding: 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
}
.layout-v2 .danger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}
.layout-v2.layout-wizard {
  background:
    radial-gradient(circle at 8% 8%, rgba(49,87,213,.14), transparent 30%),
    linear-gradient(135deg, #f8fafc, #fff7ed);
}
.layout-v2 .onboarding-flow {
  grid-template-columns: minmax(0, 1fr) 340px;
  grid-template-rows: auto auto 1fr;
  padding: 26px 28px;
}
.layout-v2 .wizard-top {
  grid-column: 1 / -1;
  display: flex;
  align-items: start;
  justify-content: space-between;
}
.layout-v2 .wizard-top h1 {
  margin: 4px 0;
  font-size: 40px;
}
.layout-v2 .wizard-top span {
  color: #64748b;
}
.layout-v2 .wizard-card {
  min-height: auto;
}
.layout-v2 .source-options {
  grid-template-columns: repeat(2, 1fr);
}
.layout-v2 .source-options label {
  min-height: 92px;
}
.layout-v2 .wizard-fields {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 16px;
}
.layout-v2 .validation-list,
.layout-v2 .preview-checks {
  display: grid;
  gap: 8px;
  margin: 18px 0;
}
.layout-v2 .validation-list p,
.layout-v2 .preview-checks p {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin: 0;
  padding: 12px;
  background: #f8fafc;
  border: 1px solid #dbeafe;
  border-radius: 12px;
}
.layout-v2 .preview-card {
  position: sticky;
  top: 22px;
}
.layout-v2 .market-search nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
}
.layout-v2 .market-search nav span {
  padding: 8px 10px;
  color: rgba(255,255,255,.78);
  border: 1px solid rgba(255,255,255,.18);
  border-radius: 999px;
  font-weight: 900;
}
.layout-v2 .market-search nav .active {
  color: #052e16;
  background: #bbf7d0;
}
.layout-v2 .market-spotlight {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 14px;
}
.layout-v2 .market-spotlight article {
  padding: 18px;
  color: #fff;
  background: linear-gradient(135deg, #0f172a, #1e3a8a);
  border-radius: 10px;
}
.layout-v2 .market-spotlight b,
.layout-v2 .market-spotlight h2,
.layout-v2 .market-spotlight p {
  color: inherit;
}
.layout-v2 .market-filter button {
  width: 100%;
  margin-top: 12px;
}
.layout-v2 .personal-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 36px;
  max-width: none;
  align-items: center;
  padding: 70px 0 44px;
}
.layout-v2 .profile-card {
  padding: 24px;
  background: #111827;
  color: #fff;
  border-radius: 26px;
  box-shadow: var(--shadow-lg);
}
.layout-v2 .profile-card p {
  color: #cbd5e1;
}
.layout-v2 .profile-card a {
  color: #bfdbfe;
  font-weight: 900;
}
.layout-v2 .portrait {
  display: grid;
  place-items: center;
  width: 112px;
  height: 112px;
  margin-bottom: 22px;
  color: #111827;
  background: linear-gradient(135deg, #bfdbfe, #fff);
  border-radius: 30px;
  font-size: 34px;
  font-weight: 950;
}
.layout-v2 .selected-work small,
.layout-v2 .selected-work strong {
  display: block;
  margin-top: 12px;
  color: #3157d5;
  font-weight: 900;
}
.layout-v2 .portfolio-notes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  margin-top: 18px;
}
.layout-v2 .portfolio-notes article {
  padding: 22px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
}
.layout-v2 .essay-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}
.layout-v2 .essay-grid article {
  padding: 22px;
  background: #fff;
  border: 1px solid #eadfcb;
  border-radius: 18px;
}
.layout-v2 .newsletter-strip {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 18px;
  align-items: center;
  margin: 24px 0;
  padding: 22px;
  color: #fff;
  background: #111827;
  border-radius: 20px;
}
.layout-v2 .newsletter-strip p {
  color: #cbd5e1;
}
.layout-v2 .writing-profile small {
  display: block;
  margin-top: 24px;
  color: #8a6f43;
}
.layout-v2 .corp-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 420px;
  gap: 40px;
  max-width: none;
  align-items: center;
  padding: 74px 0 42px;
}
.layout-v2 .corp-visual {
  min-height: 420px;
  padding: 26px;
  color: #fff;
  background: linear-gradient(135deg, #0f172a, #3157d5);
  border-radius: 28px;
  box-shadow: var(--shadow-lg);
}
.layout-v2 .corp-chart {
  display: flex;
  align-items: end;
  gap: 14px;
  height: 250px;
  margin: 28px 0;
}
.layout-v2 .corp-chart i {
  flex: 1;
  border-radius: 12px 12px 0 0;
  background: linear-gradient(180deg, #bfdbfe, #60a5fa);
}
.layout-v2 .corp-chart i:nth-child(1) { height: 42%; }
.layout-v2 .corp-chart i:nth-child(2) { height: 64%; }
.layout-v2 .corp-chart i:nth-child(3) { height: 52%; }
.layout-v2 .corp-chart i:nth-child(4) { height: 82%; }
.layout-v2 .corp-chart i:nth-child(5) { height: 70%; }
.layout-v2 .corp-visual p {
  color: #cbd5e1;
}
.layout-v2 .corp-proof span {
  color: #475569;
}
.layout-v2 .corp-sections article span,
.layout-v2 .enterprise-modules article span {
  display: block;
  margin-bottom: 18px;
  color: #3157d5;
  font-size: 12px;
  font-weight: 950;
}
.layout-v2 .corp-stories {
  grid-template-columns: repeat(3, 1fr);
}
.layout-v2 .corp-stories a {
  margin-top: 14px;
  color: #3157d5;
  font-weight: 900;
}
.layout-v2 .enterprise-stack header {
  padding: 20px;
  color: #fff;
  background: rgba(15,23,42,.82);
  border: 1px solid rgba(147,197,253,.22);
  border-radius: 18px;
}
.layout-v2 .enterprise-stack header span {
  margin: 0;
}
.layout-v2 .enterprise-proof-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 18px;
}
.layout-v2 .enterprise-proof-row article {
  padding: 22px;
  color: #dbeafe;
  background: rgba(15,23,42,.72);
  border: 1px solid rgba(147,197,253,.22);
  border-radius: 18px;
}
.layout-v2 .enterprise-proof-row p {
  color: #bfdbfe;
}
@media (max-width: 860px) {
  .layout-dashboard, .layout-commerce, .layout-copilot, .layout-docs, .layout-settings, .wizard-shell { display: block; }
  .sidebar, .rail, .docs-nav, .settings-nav, .steps { border-right: 0; border-bottom: 1px solid #d9e2ec; }
  .metrics, .feature-row, .split, .commerce-grid, .lead-grid, .pipeline, .case-grid, .catalog { grid-template-columns: 1fr; }
  .hero h1, .lead h1, .case-hero h1, .market-hero h1 { font-size: 38px; }
  .layout-v2 .dash-board { margin-left: 0; }
  .layout-v2 .dash-rail { position: static; width: auto; }
  .layout-v2 .dash-filters,
  .layout-v2 .dash-kpis,
  .layout-v2 .dash-main,
  .layout-v2 .saas-hero,
  .layout-v2 .ai-workspace,
  .layout-v2 .docs-shell,
  .layout-v2 .paper-grid,
  .layout-v2 .paper-columns,
  .layout-v2 .commerce-console,
  .layout-v2 .fulfillment-lanes,
  .layout-v2 .crm-board,
  .layout-v2 .analysis-tabs,
  .layout-v2 .signal-grid,
  .layout-v2 .case-artifact,
  .layout-v2 .case-story,
  .layout-v2 .settings-console,
  .layout-v2 .form-grid,
  .layout-v2 .onboarding-flow,
  .layout-v2 .marketplace-page,
  .layout-v2 .market-grid,
  .layout-v2 .admin-overview-shell,
  .layout-v2 .executive-strip,
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
  .layout-v2 .enterprise-modules,
  .layout-v2 .admin-shell,
  .layout-v2 .admin-actions,
  .layout-v2 .saas-feature-grid,
  .layout-v2 .saas-pricing,
  .layout-v2 .artifact-grid,
  .layout-v2 .evidence-row,
  .layout-v2 .docs-next,
  .layout-v2 .commerce-toolbar,
  .layout-v2 .settings-summary,
  .layout-v2 .review-console-shell,
  .layout-v2 .personal-proof,
  .layout-v2 .personal-hero,
  .layout-v2 .portfolio-notes,
  .layout-v2 .essay-grid,
  .layout-v2 .newsletter-strip,
  .layout-v2 .corp-hero,
  .layout-v2 .corp-stories,
  .layout-v2 .enterprise-proof-row {
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
