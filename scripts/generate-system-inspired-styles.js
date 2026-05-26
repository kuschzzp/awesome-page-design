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
.fluent .page { max-width: none; padding: 14px; }
.fluent .topline { margin-bottom: 14px; border-radius: 10px; }
.fluent .hero { display: none; }
.fluent .nav, .fluent .card, .fluent .panel { backdrop-filter: blur(18px) saturate(1.4); }
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
.carbon .page { max-width: none; padding: 0; }
.carbon .hero { display: none; }
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
.polaris .page { max-width: none; padding: 14px; }
.polaris .hero { display: none; }
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
.atlassian .page { max-width: none; padding: 14px; }
.atlassian .hero { display: none; }
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
.gov .page { max-width: none; padding: 0 0 20px; }
.gov .hero { display: none; }
.gov .nav, .gov .hero, .gov .card, .gov .panel { border-radius: 0; box-shadow: none; border: 2px solid #0b0c0c; }
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
.spectrum .page { max-width: none; padding: 14px; }
.spectrum .hero { display: none; }
.spectrum .visual { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 22px; }
.spectrum .visual span { aspect-ratio: 1; border-radius: 14px; background: linear-gradient(135deg, #5258e4, #ff7eb6); }
.spectrum .button { border-radius: 16px; }
`,
  },
  {
    version: "W",
    slug: "lightning-crm",
    name: "Lightning CRM",
    summary: "中国 B 端 CRM 式蓝色侧栏、客户档案、销售阶段、商机列表和跟进记录",
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
    visualUse: "适合中国 CRM、销售管理、客户成功和售后服务等需要紧凑业务状态表达的产品",
    bodyClass: "lightning",
    cssExtra: `
.lightning .page { max-width: none; padding: 0; }
.lightning .topline { background: #1f63d8; color: white; border-radius: 0; margin: 0; border: 0; }
.lightning .hero { display: none; }
.lightning .card { border-top: 3px solid #0176d3; }
.lightning .button { border-radius: 4px; }
`,
  },
  {
    version: "X",
    slug: "primer-dev",
    name: "Primer Dev",
    summary: "GitHub Primer 式仓库页、分支工具条、文件列表、README 面板、issue 标签和 release 侧栏",
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
    visualUse: "适合开发者工具、API 平台、开源社区、代码托管、插件市场和工程协作产品",
    bodyClass: "primer",
    cssExtra: `
.primer .page { max-width: none; padding: 0; }
.primer .topline { background: #24292f; color: white; border-radius: 0; margin: 0; border: 0; }
.primer .hero { display: none; }
.primer .tag { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
.primer .card::before { content: ""; width: 10px; height: 10px; background: #8250df; border-radius: 50%; position: absolute; top: 22px; right: 22px; }
.primer .button { border-radius: 6px; }
`,
  },
  {
    version: "Y",
    slug: "ant-pro",
    name: "Ant Pro",
    summary: "Ant Design Pro 式企业中台壳、查询表单、KPI 卡、操作表格、抽屉和步骤状态",
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
    visualUse: "适合企业中台、B 端 SaaS、运营后台、审批中心和数据管理控制台",
    bodyClass: "ant",
    cssExtra: `
.ant .page { max-width: none; padding: 0; }
.ant .topline { display: none; }
.ant .hero { display: none; }
.ant .stats { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.ant .card { border-top: 1px solid #f0f0f0; }
.ant .button { border-radius: 6px; }
`,
  },
];

function renderStyleSpecificContent(style, storyCards) {
  switch (style.bodyClass) {
    case "material":
      return `<section class="material-shell">
      <aside class="material-rail"><span>⌂</span><span>◷</span><span>□</span><span>⋯</span></aside>
      <div class="material-feed">
        <div class="segment"><button class="active">For you</button><button>Briefs</button><button>Saved</button></div>
        <section class="tonal-grid">
          <article class="tonal-card large"><span class="tag">应用</span><h3>今日智能体工作区</h3><p>用大圆角色块承载任务、提醒和推荐操作，保留 Android 式亲和感。</p></article>
          <article class="tonal-card"><b>128</b><span>今日资讯</span></article>
          <article class="tonal-card"><b>47</b><span>活跃模型</span></article>
          <article class="tonal-card"><b>312</b><span>本周论文</span></article>
        </section>
      </div>
      <button class="fab">+</button>
    </section>`;
    case "fluent":
      return `<section class="fluent-app">
      <aside class="fluent-icons"><b>AI</b><span class="active">B</span><span>C</span><span>F</span><span>T</span><span>A</span></aside>
      <aside class="fluent-rail"><b>AI Pulse</b><span class="active">Brief workspace</span><span>Calendar</span><span>Shared files</span><span>Team review</span><span>Approval queue</span><div class="fluent-account"><strong>Maya Chen</strong><em>Editor online</em></div></aside>
      <main class="fluent-main"><div class="command-bar"><button>New brief</button><button>Share</button><button>Archive</button><button>Automate</button><input value="Search across briefs, sources, people"></div><div class="message-bar"><b>Review requested</b><span>Policy digest needs one source check before 14:00.</span><button>Open task</button></div>
      <section class="fluent-desk"><aside class="mail-list"><b>Focused inbox</b><p class="active">Model reliability review<span>3 mentions · high confidence</span></p><p>Policy digest refresh<span>Due 14:00</span></p><p>Revenue analytics note<span>New data</span></p><p>Research watchlist<span>12 sources</span></p><p>Deployment exceptions<span>2 blockers</span></p></aside>
      <article class="reading-pane"><div class="pane-head"><span class="tag">Review</span><span>Edited 8 min ago</span></div><h3>Production models move toward verified intermediate steps</h3><p>Fluent Cloud behaves like a productivity workspace: command bar, persistent app rail, message bar, reading canvas, presence, and activity surfaces with calm system color.</p><div class="people-row"><i>MC</i><i>NP</i><i>AL</i><span>Editing now</span></div><div class="fluent-proof"><article><b>18</b><span>checks passed</span></article><article><b>4</b><span>linked files</span></article><article><b>2</b><span>open comments</span></article></div><div class="inline-actions"><button>Approve</button><button class="button secondary">Comment</button><button class="button secondary">Assign</button></div></article>
      <aside class="activity-pane"><b>Activity</b><p><strong>Maya</strong> mentioned governance note</p><p><strong>Noah</strong> attached reliability chart</p><p><strong>Ava</strong> requested source check</p><p><strong>Iris</strong> resolved policy comment</p></aside></section>
      <section class="fluent-bottom"><article class="agenda-panel"><b>Today</b><p><span>09:30</span> Reliability sync with policy desk</p><p><span>11:00</span> Source verification checkpoint</p><p><span>14:00</span> Executive digest review</p><p><span>16:30</span> Publish approval window</p></article><article class="source-panel"><b>Shared sources</b><div><span>Reliability chart.xlsx</span><em>Updated 8 min ago</em></div><div><span>Governance memo.docx</span><em>3 comments</em></div><div><span>Evaluation run 42</span><em>Passed 18 checks</em></div><div><span>Policy tracker.loop</span><em>Owner assigned</em></div></article><article class="fluent-task"><b>Next best action</b><p>Resolve the unsourced market statistic, then route the digest to executive review.</p><button>Start source check</button></article></section></main>
    </section>`;
    case "carbon":
      return `<section class="carbon-console">
      <aside class="carbon-nav"><b>IBM AI Ops</b><span class="active">Dashboard</span><span>Monitoring</span><span>Incidents</span><span>Assets</span><span>Governance</span><span>Audit log</span></aside>
      <main class="carbon-main"><div class="carbon-tabs"><span class="active">Overview</span><span>Runs</span><span>Incidents</span><span>Governance</span><span>Audit log</span><button>Export CSV</button></div>
      <section class="carbon-summary"><article><span>Systems</span><b>42</b><em>5 critical</em></article><article><span>Policy checks</span><b>98.6%</b><em>stable</em></article><article><span>Avg latency</span><b>184ms</b><em>-12ms</em></article><article><span>Open actions</span><b>17</b><em>3 overdue</em></article><article><span>Audit events</span><b>8.4K</b><em>24 hours</em></article></section>
      <div class="carbon-grid">
        <section class="carbon-table"><header><h3>Model operations</h3><span>Live table · 7 selected columns</span></header><table><thead><tr><th>System</th><th>Status</th><th>Risk</th><th>SLA</th><th>Owner</th><th>Next action</th></tr></thead><tbody><tr><td>Claims review</td><td><span class="carbon-tag green">Running</span></td><td>Low</td><td>99.8%</td><td>Maya</td><td>Monitor</td></tr><tr><td>Prompt audit</td><td><span class="carbon-tag blue">Queued</span></td><td>Medium</td><td>96.1%</td><td>Noah</td><td>Assign reviewer</td></tr><tr><td>Data sync</td><td><span class="carbon-tag red">Blocked</span></td><td>High</td><td>88.4%</td><td>Ava</td><td>Escalate</td></tr><tr><td>Evaluation</td><td><span class="carbon-tag green">Running</span></td><td>Low</td><td>99.1%</td><td>Iris</td><td>Compare baseline</td></tr><tr><td>Policy sync</td><td><span class="carbon-tag green">Running</span></td><td>Low</td><td>98.6%</td><td>Kai</td><td>Publish note</td></tr><tr><td>Archive scan</td><td><span class="carbon-tag green">Running</span></td><td>Low</td><td>97.4%</td><td>Lena</td><td>Audit trail</td></tr><tr><td>Billing forecast</td><td><span class="carbon-tag blue">Review</span></td><td>Medium</td><td>94.2%</td><td>Owen</td><td>Validate inputs</td></tr></tbody></table></section>
        <aside class="carbon-side"><b>Diagnostic queue</b>${["Trace gap", "Policy drift", "Human review", "Dataset freshness", "Latency anomaly", "Access exception"].map((item, index) => `<p>${item}<span>${index < 2 ? "critical" : "open"}</span></p>`).join("")}</aside>
      </div>
      <section class="carbon-lower"><article><b>Incident timeline</b><p><span>08:20</span> Data sync exceeded evaluation threshold.</p><p><span>09:05</span> Owner assigned, rollback plan attached.</p><p><span>10:10</span> Governance approval requested.</p><p><span>11:30</span> Baseline comparison attached.</p></article><article><b>Capacity map</b><div class="carbon-heatmap">${Array.from({ length: 42 }, (_, i) => `<i class="level-${(i % 4) + 1}"></i>`).join("")}</div></article><article><b>Control summary</b><dl><dt>Region</dt><dd>US-East</dd><dt>Data class</dt><dd>Restricted</dd><dt>Review owner</dt><dd>Security operations</dd></dl></article></section></main>
    </section>`;
    case "polaris":
      return `<section class="polaris-admin">
      <aside class="polaris-nav"><b>Shop admin</b><span class="active">Orders</span><span>Products</span><span>Customers</span><span>Analytics</span><span>Marketing</span><span>Settings</span></aside>
      <main class="polaris-main"><header class="resource-header"><div><h3>Orders</h3><p>Merchant operations with saved views, filters, resource rows, and bulk fulfillment.</p></div><button>Fulfill selected</button></header>
      <section class="polaris-metrics"><article><b>$42.8K</b><span>Today's sales</span></article><article><b>168</b><span>Unfulfilled orders</span></article><article><b>24</b><span>Low inventory SKUs</span></article><article><b>7</b><span>Return reviews</span></article></section>
      <div class="polaris-tabs"><span class="active">All</span><span>Unfulfilled</span><span>Returns</span><span>Local delivery</span><span>High risk</span><button>Save view</button></div>
      <div class="polaris-filterbar"><input value="Search orders, customers, SKU"><button>Filter</button><button>Sort</button><button>Columns</button></div>
      <div class="bulk-bar"><label><input type="checkbox" checked> 3 selected</label><span>Capture payment</span><span>Create shipping labels</span><span>Add tags</span><span>More actions</span></div>
      <div class="polaris-work"><div class="resource-list">${["Morning Brief Pack", "Market Desk Bundle", "Policy Annual", "Campus Edition", "Executive Weekly", "Research Team Pack", "Audio Edition", "Governance Add-on"].map((item, index) => `<article><label><input type="checkbox" ${index < 3 ? "checked" : ""}></label><div><b>${item}</b><span>${42 - index * 4} orders · ${index + 1} channel${index ? "s" : ""}</span></div><em>${index === 1 || index === 5 ? "Needs review" : "Ready"}</em><strong>$${[420, 280, 960, 180, 620, 360, 140, 510][index]}</strong></article>`).join("")}</div><aside class="fulfillment-card"><b>Fulfillment preview</b><p>3 selected orders can be routed to warehouse A. Two include subscription inserts.</p><div><span>Pick</span><span>Pack</span><span>Ship</span></div><button>Create shipping labels</button><small>Inventory checked · labels ready</small></aside></div></main>
    </section>`;
    case "atlassian":
      const atlassianCards = [
        ["Discovery", "AI-104", "Map source review states", "Backlog"],
        ["Story", "AI-114", "Create digest approval queue", "Backlog"],
        ["Bug", "AI-124", "Fix citation confidence badge", "In progress"],
        ["Task", "AI-134", "Connect reviewer notifications", "In progress"],
        ["Spike", "AI-204", "Test policy workflow permissions", "Review"],
        ["Story", "AI-214", "Ship executive digest panel", "Review"],
        ["Task", "AI-304", "Document release checklist", "Done"],
        ["Story", "AI-314", "Publish analytics rollup", "Done"],
      ];
      return `<section class="atlassian-board">
      <aside class="atl-sidebar"><b>Jira</b><span class="active">Project board</span><span>Backlog</span><span>Timeline</span><span>Goals</span><span>Reports</span><span>Project settings</span></aside>
      <main class="atl-main"><header class="board-toolbar"><div><h3>Team delivery board</h3><p>AI editorial platform · Sprint 18</p></div><div><span class="lozenge blue">Sprint 18</span><span class="lozenge green">On track</span><span class="lozenge">Release train</span></div></header>
      <div class="atl-layout"><div class="board-columns">${["Backlog", "In progress", "Review", "Done"].map((col) => `<section><b>${col}<em>${atlassianCards.filter((item) => item[3] === col).length}</em></b>${atlassianCards.filter((item) => item[3] === col).map(([type, key, title]) => `<article><span class="lozenge">${type}</span><h4>${title}</h4><p>Editorial workflow · Sprint 18</p><div class="avatar-row"><i>M</i><i>N</i><small>${key}</small></div></article>`).join("")}</section>`).join("")}</div><aside class="issue-detail"><span class="lozenge blue">AI-204</span><h3>Ship review workflow for policy digest</h3><p>Owner, status, sprint field, comments, and linked work stay visible beside the board.</p><dl><dt>Status</dt><dd>In review</dd><dt>Assignee</dt><dd>Maya Chen</dd><dt>Priority</dt><dd>High</dd><dt>Due</dt><dd>Friday</dd></dl><button>Open issue</button></aside></div><section class="atl-lower"><article><b>Sprint health</b><strong>82%</strong><span>commitment confidence</span></article><article><b>Release timeline</b><p><span>Tue</span> Design review</p><p><span>Thu</span> QA checkpoint</p><p><span>Fri</span> Release train</p></article><article><b>Team activity</b><p>Maya moved AI-204 to review.</p><p>Noah linked approval checklist.</p><p>Ava resolved citation badge bug.</p></article></section></main>
    </section>`;
    case "gov":
      return `<section class="gov-service">
      <header class="gov-header"><b>GOV.UK</b><span>Report a model deployment risk</span></header><div class="gov-phase">BETA <span>This is a new service. Help us improve it.</span></div>
      <div class="gov-warning"><b>Important</b><span>Check eligibility before submitting this AI safety report.</span></div>
      <div class="gov-two-col"><article><span class="gov-caption">AI assurance service</span><h3>Report a model deployment risk</h3><p>Use this service to notify a public authority about a production AI system, upload evidence, and assign a responsible officer.</p><button class="button">Start now</button></article>
      <aside><b>Before you start</b><ul><li>Organisation registration number</li><li>Responsible officer contact</li><li>Evidence of model evaluation</li></ul><div class="gov-summary"><p><b>Service standard</b><span>Accessible forms, clear warnings, and readable task flow.</span></p></div></aside></div>
      <section class="gov-task-list"><h4>Complete these tasks</h4>${["Check eligibility", "Add organisation details", "Upload evaluation evidence", "Assign responsible officer", "Review and submit"].map((task, index) => `<p><a>${task}</a><span>${index < 2 ? "Completed" : index === 2 ? "In progress" : "Not started"}</span></p>`).join("")}</section>
      <section class="gov-form-preview"><div><h4>Risk report summary</h4><dl><dt>Organisation</dt><dd>Northstar Systems Ltd</dd><dt>Model type</dt><dd>Decision support system</dd><dt>Status</dt><dd>Evidence required</dd><dt>Case reference</dt><dd>AI-2042-77</dd></dl></div><aside><b>Related services</b><a>Appeal a decision</a><a>Update responsible officer</a><a>Download policy guidance</a></aside></section>
    </section>`;
    case "spectrum":
      return `<section class="spectrum-workbench">
      <aside class="tool-rail"><b>Ps</b><span class="active">V</span><span>T</span><span>C</span><span>L</span><span>E</span><span>M</span></aside>
      <main class="spectrum-main"><div class="spectrum-bar"><div><b>Campaign workspace</b><span>Cloud document · Brand system v4</span></div><button>Share for review</button><button>Export</button></div>
      <section class="creative-stage"><aside class="layers-panel"><b>Layers</b><p class="active"><span></span>Hero composite</p><p><span></span>Gradient mesh</p><p><span></span>Product mask</p><p><span></span>Type system</p><p><span></span>Review notes</p></aside>
      <article class="canvas-board"><div class="artboard"><i></i><h3>AI research digest</h3><p>Editorial campaign asset with controlled color, layer stack, export states, and review pins.</p><div class="pin one">1</div><div class="pin two">2</div></div><div class="timeline-strip">${["00", "04", "08", "12", "16", "20"].map((item) => `<span>${item}s</span>`).join("")}</div></article>
      <aside class="properties"><b>Properties</b><label>Opacity<input value="82%"></label><label>Blend<input value="Screen"></label><label>Color profile<input value="Display P3"></label><label>Export<input value="Web preview"></label><div class="color-row"><i></i><i></i><i></i><i></i></div></aside></section>
      <section class="asset-grid">${Array.from({ length: 8 }, (_, i) => `<article><span class="asset-thumb thumb-${(i % 4) + 1}"></span><b>${["Hero cover", "Motion frame", "Social crop", "Product mask", "Editorial card", "Color study", "Icon sheet", "Review proof"][i]}</b><small>${i % 2 ? "Video" : "Image"} · approved</small></article>`).join("")}</section></main>
    </section>`;
    case "lightning":
      return `<section class="cncrm-shell">
      <aside class="cncrm-menu"><b>China CRM Cloud</b><span class="active">Customer 360</span><span>Lead pool</span><span>Deal pipeline</span><span>Contracts & receipts</span><span>Approval center</span><span>Service desk</span><span>Business analytics</span></aside>
      <main class="cncrm-main"><header class="cncrm-head"><div><h3>Beijing Morning Group</h3><p>Strategic account · North China region · last touch 18 min ago · owner Lin Xiao</p></div><div><button class="button secondary">Transfer</button><button>New follow-up</button></div></header>
      <section class="cncrm-kpis"><div><b>¥864K</b><span>Forecast amount</span></div><div><b>82%</b><span>Win probability</span></div><div><b>12</b><span>Open tasks</span></div><div><b>4</b><span>Active contracts</span></div></section>
      <div class="path">${["First touch", "Need confirmed", "Quote sent", "Contract review", "Won & receipt"].map((item, i) => `<span class="${i === 2 ? "active" : i < 2 ? "done" : ""}">${item}</span>`).join("")}</div>
      <section class="cncrm-tabs"><span class="active">Account overview</span><span>Contacts</span><span>Deals</span><span>Contracts</span><span>Follow-up log</span><button>Add collaborator</button></section>
      <div class="record-grid"><section class="account-card"><b>Customer profile</b><dl><dt>Industry</dt><dd>Enterprise services</dd><dt>Scale</dt><dd>1,200 employees</dd><dt>Source</dt><dd>Marketing campaign</dd><dt>Tier</dt><dd>Strategic A account</dd></dl><div class="account-tags"><span>Budget clear</span><span>Executive sponsor</span><span>Legal active</span></div></section><section class="related-list"><b>Opportunity list</b>${["AI content platform", "Smart service expansion", "Compliance audit add-on", "Executive screen service"].map((item, idx) => `<p><strong>${item}</strong><em>${["Quoting", "Need review", "Legal review", "Pending plan"][idx]}</em><span>¥${[42, 18, 12, 9][idx]}0K</span></p>`).join("")}</section><aside class="activity-timeline"><b>Follow-up timeline</b><p>Call: annual purchase budget confirmed</p><p>Quote: three-year plan sent</p><p>Approval: legal reviewing data clause</p><p>Next visit: Thursday 14:00</p></aside></div>
      <section class="cncrm-bottom"><article><b>Receipt plan</b><p><span>Q2 deposit</span><strong>¥260K</strong></p><p><span>Q3 acceptance</span><strong>¥320K</strong></p><p><span>Q4 renewal</span><strong>¥284K</strong></p></article><article><b>Team collaboration</b><p>Pre-sales consultant updates POC report</p><p>Customer success prepares launch checklist</p><p>Sales manager reviews discount request</p></article><article><b>Risk alert</b><p>A competitor entered procurement comparison. Security credentials must be added within 48 hours.</p><button>Start approval</button></article></section></main>
    </section>`;
    case "primer":
      return `<section class="primer-repo">
      <header class="repo-head"><div><p class="repo-path">kuschzzp /</p><h3>awesome-page-design</h3><p>Public · Codex skill for distinctive UI style and layout systems</p></div><nav><span class="active">Code</span><span>Issues <b>12</b></span><span>Pull requests <b>4</b></span><span>Actions</span><span>Projects</span><span>Security</span><span>Insights</span></nav></header>
      <section class="repo-stats"><span><b>1.8k</b> Stars</span><span><b>124</b> Forks</span><span><b>25</b> Styles</span><span><b>20</b> Layouts</span><span><b>148</b> Packaged files</span><span><b>MIT</b> License</span></section>
      <section class="repo-board"><article><b>CI status</b><strong>45 previews rendered</strong><span class="checks-line"><i></i><i></i><i></i><i></i><i></i></span></article><article><b>Latest workflow</b><strong>previews.yml</strong><span>node checks · pack dry-run · screenshot diff</span></article><article><b>Open review</b><strong>style rebuild</strong><span><em class="label">design</em><em class="label purple">docs</em></span></article></section>
      <div class="repo-layout"><main class="repo-main"><div class="repo-toolbar"><button>main</button><button class="secondary">Go to file</button><button class="secondary">Add file</button><button class="secondary">Open with Codespaces</button><button>Code</button></div><section class="file-list"><header><b>Latest commit</b><span>design: rebuild developer preview and admin layout</span><em>18 minutes ago</em></header>${[
        ["folder", "skills/awesome-page-design", "skill source, references, generated assets"],
        ["folder", "skills/awesome-page-design/assets/styles", "25 visual systems with HTML and PNG previews"],
        ["folder", "skills/awesome-page-design/assets/layouts", "20 layout frameworks and screenshots"],
        ["folder", "scripts", "preview generation, localization, and screenshot tooling"],
        ["file", "SKILL.md", "selection gate and usage workflow"],
        ["file", "README.zh-CN.md", "installation and Chinese usage notes"],
        ["file", "package.json", "package metadata and scripts"]
      ].map(([type, name, note]) => `<p><span>${type === "folder" ? "▸" : "◇"}</span><b>${name}</b><em>${note}</em></p>`).join("")}</section><article class="readme-panel"><header><b>README.md</b><button class="secondary">Outline</button></header><h2>Awesome Page Design</h2><p>A decision library for choosing visual style systems and page layout frameworks before implementing final product UI.</p><div class="readme-grid"><section><b>Quick start</b><pre>npm run preview:serve
open /assets/previews/
choose style + layout</pre></section><section><b>Package checks</b><p><span class="label green">passed</span> node --check</p><p><span class="label green">passed</span> npm pack --dry-run</p><p><span class="label green">passed</span> screenshot render</p></section></div></article></main><aside class="repo-sidebar"><section><b>About</b><p>Distinctive web UI prompts, preview screenshots, and layout manuals for Codex.</p><div class="language-row"><i></i><span>JavaScript 62%</span><i></i><span>HTML 28%</span><i></i><span>Markdown 10%</span></div></section><section class="release-card"><b>Latest release</b><strong>v0.1.0</strong><p>Preview gate, system-inspired styles, and packaged assets.</p><button>Compare changes</button></section><section class="issue-panel"><b>Open issues</b><p><span class="label">design</span> Rebuild weak style pages</p><p><span class="label purple">docs</span> Expand selection examples</p><p><span class="label green">ready</span> Verify install package</p></section></aside></div><section class="repo-activity"><article><b>Pull requests</b><p><span class="label purple">review</span> Refine layout preview density</p><p><span class="label">design</span> Reduce generic SaaS shells</p></article><article><b>Actions</b><p><span class="dot green"></span> previews completed in 1m 18s</p><p><span class="dot"></span> package dry-run includes 148 files</p></article><article><b>Security</b><p>No vulnerable dependencies found in packaged skill assets.</p><button>View advisory policy</button></article></section>
    </section>`;
    case "ant":
      return `<section class="ant-shell">
      <aside class="ant-sider"><b>Ant Design Pro</b><span class="active">Workbench</span><span>Content admin</span><span>Approval flow</span><span>Reports</span><span>User center</span><span>System settings</span></aside>
      <main class="ant-main"><header class="ant-header"><div><small>Home / Content Ops / Task Board</small><h3>Enterprise content operations</h3><p>Query form, statistic cards, ProTable toolbar, tags, pagination, drawer details, steps, and approval timeline.</p></div><div><button class="button secondary">Export</button><button>Create task</button></div></header>
      <section class="ant-kpis"><article><b>18,642</b><span>Visits today</span><i></i></article><article><b>94.2%</b><span>Publish success</span><i></i></article><article><b>328</b><span>Pending review</span><i></i></article><article><b>¥864K</b><span>Conversion revenue</span><i></i></article></section>
      <form class="query-form"><label>Keyword<input value="AI safety"></label><label>Status<input value="Published"></label><label>Owner<input value="Operations"></label><label>Channel<input value="All channels"></label><button>Search</button><button class="button secondary">Reset</button></form>
      <div class="ant-alert"><b>Review reminder</b><span>Policy tracker has 2 unread comments. Finish validation before publishing.</span><button>View</button></div>
      <div class="ant-work"><div class="ant-table"><header><b>Content management ProTable</b><div><button class="button secondary">Bulk action</button><button class="button secondary">Columns</button><button>Create</button></div></header><table><thead><tr><th>Name</th><th>Owner</th><th>Status</th><th>Priority</th><th>Updated</th><th>Action</th></tr></thead><tbody><tr><td>Model audit feature</td><td>Maya</td><td><span class="ant-status success">Online</span></td><td>High</td><td>Today</td><td>View · Edit</td></tr><tr><td>Policy tracker</td><td>Noah</td><td><span class="ant-status processing">Reviewing</span></td><td>High</td><td>Yesterday</td><td>View · Remind</td></tr><tr><td>Research brief column</td><td>Iris</td><td><span class="ant-status default">Draft</span></td><td>Medium</td><td>May 18</td><td>View · Publish</td></tr><tr><td>Source library sync</td><td>Kai</td><td><span class="ant-status warning">Pending</span></td><td>Low</td><td>May 17</td><td>View · Assign</td></tr><tr><td>Channel campaign page</td><td>Lena</td><td><span class="ant-status success">Online</span></td><td>Medium</td><td>May 16</td><td>View · Copy</td></tr></tbody></table><footer><span>126 items</span><span>1 2 3 4 5 ... 13</span></footer></div><aside class="ant-drawer"><b>Task detail drawer</b><p>Selected task: Policy tracker</p><dl><dt>Owner</dt><dd>Noah</dd><dt>SLA</dt><dd>Today 18:00</dd><dt>Channel</dt><dd>Website / Email</dd></dl><ol><li class="done">Task created</li><li class="done">Content review</li><li class="active">Legal check</li><li>Publish online</li></ol></aside></div><section class="ant-lower"><article><b>Approval timeline</b><p><span>10:20</span> Operations submitted review</p><p><span>11:05</span> Legal added risk note</p><p><span>14:30</span> Waiting for owner confirmation</p></article><article><b>Channel performance</b><div class="mini-bars"><i></i><i></i><i></i><i></i><i></i><i></i></div></article><article><b>Quick actions</b><button class="button secondary">Bulk publish</button><button class="button secondary">Generate report</button><button>Create approval</button></article></section></main>
    </section>`;
    default:
      return `<section class="stats">
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
    </section>`;
  }
}

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
.material-shell, .fluent-window, .carbon-console, .polaris-admin, .atlassian-board, .gov-service, .spectrum-workbench, .lightning-record, .primer-repo, .ant-admin {
  margin-bottom: 18px;
}
.material-shell { position: relative; display: grid; grid-template-columns: 72px 1fr; gap: 16px; }
.material-rail { display: grid; gap: 10px; align-content: start; padding: 14px; background: var(--surface-2); border-radius: 32px; }
.material-rail span, .fab { display: grid; place-items: center; min-height: 48px; border-radius: 999px; background: var(--soft); color: var(--accent); font-weight: 800; }
.fab { position: absolute; right: 18px; bottom: 18px; width: 58px; border: 0; background: var(--accent); color: white; font-size: 28px; box-shadow: var(--shadow); }
.segment { display: inline-flex; padding: 4px; margin-bottom: 14px; background: var(--surface-2); border-radius: 999px; }
.segment button { border: 0; padding: 9px 16px; border-radius: 999px; background: transparent; font: inherit; }
.segment .active { background: var(--accent); color: white; }
.tonal-grid { display: grid; grid-template-columns: 2fr repeat(3, 1fr); gap: 14px; }
.tonal-card { min-height: 150px; padding: 22px; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); box-shadow: var(--shadow); }
.tonal-card.large { background: var(--soft); }
.tonal-card b { display: block; font-size: 38px; color: var(--accent); }
.command-bar { display: grid; grid-template-columns: auto auto auto auto minmax(260px, 1fr); gap: 8px; padding: 10px; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius-sm); box-shadow: var(--shadow); }
.command-bar button, .command-bar input { min-height: 36px; border: 1px solid var(--line); border-radius: var(--radius-sm); background: var(--surface-2); padding: 0 12px; font: inherit; }
.fluent-split { display: grid; grid-template-columns: 260px 1fr 220px; gap: 14px; margin-top: 14px; }
.mail-list, .reading-pane, .activity-pane { padding: 18px; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); box-shadow: var(--shadow); }
.mail-list p, .activity-pane p { margin: 10px 0 0; padding: 10px; border-radius: var(--radius-sm); color: var(--muted); }
.mail-list .active { background: var(--soft); color: var(--text); }
.inline-actions { display: flex; gap: 10px; margin-top: 20px; }
.fluent-bottom { display: grid; grid-template-columns: .85fr 1.15fr; gap: 14px; margin-top: 14px; }
.agenda-panel, .source-panel { padding: 18px; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); box-shadow: var(--shadow); }
.agenda-panel p { display: grid; grid-template-columns: 54px 1fr; gap: 12px; margin: 14px 0 0; color: var(--muted); }
.agenda-panel span { color: var(--accent); font-weight: 800; }
.source-panel div { display: flex; justify-content: space-between; gap: 14px; padding: 14px 0; border-top: 1px solid var(--line); }
.source-panel div:first-of-type { margin-top: 8px; }
.source-panel em { color: var(--muted); font-style: normal; font-size: 12px; }
.carbon-tabs { display: flex; background: #262626; color: #c6c6c6; }
.carbon-tabs span { padding: 14px 18px; border-right: 1px solid #393939; }
.carbon-tabs .active { background: var(--accent); color: white; }
.carbon-summary { display: grid; grid-template-columns: repeat(4, 1fr); border: 1px solid var(--line); border-top: 0; background: var(--surface); }
.carbon-summary article { min-height: 116px; padding: 18px; border-right: 1px solid var(--line); }
.carbon-summary article:last-child { border-right: 0; }
.carbon-summary span, .carbon-summary em { display: block; color: var(--muted); font-style: normal; font-size: 13px; }
.carbon-summary b { display: block; margin: 10px 0 4px; color: var(--accent); font-size: 34px; }
.carbon-grid { display: grid; grid-template-columns: 1fr 280px; gap: 0; background: var(--surface); border: 1px solid var(--line); }
.carbon-table, .carbon-side { padding: 22px; }
.carbon-side { background: var(--surface-2); border-left: 1px solid var(--line); }
.carbon-table table, .ant-table table { width: 100%; border-collapse: collapse; font-size: 14px; }
.carbon-table th, .carbon-table td, .ant-table th, .ant-table td { text-align: left; padding: 12px; border-bottom: 1px solid var(--line); }
.carbon-side p { display: flex; justify-content: space-between; border-top: 1px solid var(--line); padding-top: 12px; }
.carbon-lower { display: grid; grid-template-columns: .9fr 1.1fr; gap: 0; border: 1px solid var(--line); border-top: 0; background: var(--surface); }
.carbon-lower article { padding: 22px; border-right: 1px solid var(--line); }
.carbon-lower article:last-child { border-right: 0; }
.carbon-lower p { display: grid; grid-template-columns: 56px 1fr; gap: 12px; margin: 12px 0; color: var(--muted); }
.carbon-lower p span { color: var(--text); font-weight: 800; }
.carbon-heatmap { display: grid; grid-template-columns: repeat(14, 1fr); gap: 6px; margin-top: 14px; }
.carbon-heatmap i { height: 28px; background: #e0e0e0; }
.carbon-heatmap .level-2 { background: #a6c8ff; }
.carbon-heatmap .level-3 { background: #4589ff; }
.carbon-heatmap .level-4 { background: #0043ce; }
.resource-header, .bulk-bar, .resource-list article, .board-toolbar, .record-head, .repo-head, .ant-table header { display: flex; align-items: center; justify-content: space-between; gap: 14px; }
.polaris-admin, .atlassian-board, .lightning-record, .primer-repo, .ant-admin { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); box-shadow: var(--shadow); padding: 20px; }
.polaris-metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 18px 0; }
.polaris-metrics article { padding: 16px; background: var(--surface-2); border: 1px solid var(--line); border-radius: var(--radius-sm); }
.polaris-metrics b { display: block; color: var(--accent); font-size: 28px; }
.polaris-metrics span { color: var(--muted); font-size: 13px; }
.bulk-bar { justify-content: flex-start; flex-wrap: wrap; padding: 12px; margin: 14px 0; background: var(--surface-2); border-radius: var(--radius-sm); }
.polaris-work { display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: 14px; }
.resource-list { display: grid; gap: 10px; }
.resource-list article { padding: 16px; border: 1px solid var(--line); border-radius: var(--radius-sm); }
.resource-list em { color: var(--accent); font-style: normal; font-weight: 700; }
.fulfillment-card { padding: 18px; background: var(--surface-2); border: 1px solid var(--line); border-radius: var(--radius-sm); }
.fulfillment-card p { color: var(--muted); }
.fulfillment-card div { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin: 18px 0; }
.fulfillment-card span { display: grid; place-items: center; min-height: 58px; color: var(--accent); background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius-sm); font-weight: 800; }
.lozenge { display: inline-flex; align-items: center; min-height: 22px; padding: 2px 8px; border-radius: 4px; background: var(--soft); color: var(--accent); font-size: 12px; font-weight: 800; text-transform: uppercase; }
.lozenge.green { background: #dcfff1; color: #216e4e; }
.lozenge.blue { background: #e9f2ff; color: #0c66e4; }
.board-columns { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.board-columns section { padding: 12px; background: var(--surface-2); border-radius: var(--radius-sm); }
.board-columns article { margin-top: 12px; padding: 14px; background: var(--surface); border-radius: var(--radius-sm); box-shadow: var(--shadow); }
.board-columns h4 { margin: 10px 0 6px; font-size: 15px; }
.gov-warning { display: flex; gap: 14px; padding: 14px; margin-bottom: 18px; background: var(--soft); color: var(--text); border-left: 8px solid var(--text); }
.gov-two-col { display: grid; grid-template-columns: 1fr 320px; gap: 28px; border-top: 4px solid var(--text); padding-top: 22px; }
.gov-two-col article, .gov-two-col aside { padding: 0; border: 0; }
.spectrum-workbench { display: grid; grid-template-columns: 64px minmax(0, 1fr); gap: 14px; min-height: calc(100vh - 96px); padding: 14px; background: #202020; color: #f8f8f8; border-radius: var(--radius); }
.tool-rail, .properties { background: #1f1f1f; border-radius: var(--radius-sm); padding: 12px; }
.tool-rail { display: grid; gap: 10px; align-content: start; }
.tool-rail b, .tool-rail span { display: grid; place-items: center; height: 42px; background: #3b3b3b; border-radius: 8px; }
.tool-rail b { background: var(--accent); color: #fff; }
.tool-rail .active { outline: 2px solid #8ea0ff; background: #4a4a4a; }
.spectrum-main { display: grid; gap: 14px; min-width: 0; }
.spectrum-bar { display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 12px 14px; background: #2f2f2f; border: 1px solid #474747; border-radius: var(--radius-sm); }
.spectrum-bar div { margin-right: auto; }
.spectrum-bar b, .spectrum-bar span { display: block; }
.spectrum-bar span { color: #bdbdbd; font-size: 12px; }
.spectrum-bar button { min-height: 32px; padding: 0 12px; border: 1px solid #5a5a5a; border-radius: 8px; background: #3b3b3b; color: #fff; font: inherit; font-weight: 800; }
.creative-stage { display: grid; grid-template-columns: 220px minmax(0, 1fr) 260px; gap: 14px; min-height: 440px; }
.layers-panel { padding: 14px; background: #1f1f1f; border-radius: var(--radius-sm); }
.layers-panel p { display: grid; grid-template-columns: 12px 1fr; gap: 8px; align-items: center; margin: 8px 0; padding: 8px; color: #d8d8d8; border-radius: 8px; }
.layers-panel p span { width: 12px; height: 12px; border-radius: 3px; background: #7b83ff; }
.layers-panel .active { background: #34345f; color: #fff; }
.canvas-board { display: grid; grid-template-rows: minmax(0, 1fr) auto; gap: 12px; padding: 18px; background: #2f2f2f; border: 1px solid #474747; border-radius: var(--radius-sm); }
.artboard { position: relative; overflow: hidden; display: grid; align-content: end; min-height: 360px; padding: 34px; border-radius: 18px; background: radial-gradient(circle at 22% 20%, #ffe172, transparent 18%), radial-gradient(circle at 78% 26%, #65f4e6, transparent 22%), linear-gradient(135deg, #5258e4, #8b5cf6 46%, #ff7eb6); box-shadow: inset 0 0 0 1px rgba(255,255,255,.2); }
.artboard i { position: absolute; right: 38px; top: 34px; width: 150px; height: 150px; border-radius: 34px; background: rgba(255,255,255,.24); backdrop-filter: blur(12px); transform: rotate(9deg); }
.artboard h3 { max-width: 520px; margin: 0; color: #fff; font-size: 44px; }
.artboard p { max-width: 560px; margin: 10px 0 0; color: rgba(255,255,255,.84); }
.pin { position: absolute; display: grid; place-items: center; width: 28px; height: 28px; border-radius: 999px; background: #fff; color: #5258e4; font-weight: 900; box-shadow: 0 8px 18px rgba(0,0,0,.22); }
.pin.one { left: 28%; top: 24%; }
.pin.two { right: 26%; bottom: 30%; }
.timeline-strip { display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; }
.timeline-strip span { padding: 8px; color: #d8d8d8; text-align: center; background: #1f1f1f; border-radius: 6px; font-size: 12px; }
.asset-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.asset-grid article { padding: 10px; background: #f8f8f8; color: #292929; border-radius: var(--radius-sm); }
.asset-thumb { display: block; aspect-ratio: 1.25; border-radius: 12px; margin-bottom: 10px; background: linear-gradient(135deg, #5258e4, #ff7eb6); }
.thumb-2 { background: linear-gradient(135deg, #00a7e1, #98f5e1); }
.thumb-3 { background: linear-gradient(135deg, #111827, #d8d8d8); }
.thumb-4 { background: radial-gradient(circle at 30% 28%, #ffe172, transparent 24%), linear-gradient(135deg, #3b82f6, #06b6d4); }
.properties label { display: grid; gap: 6px; margin-top: 12px; color: #d8d8d8; }
.properties input { min-height: 34px; border: 1px solid #4b4b4b; background: #303030; color: white; border-radius: 8px; padding: 0 10px; }
.color-row { display: flex; gap: 8px; margin-top: 18px; }
.color-row i { width: 32px; height: 32px; border-radius: 999px; background: #5258e4; }
.color-row i:nth-child(2) { background: #ff7eb6; }
.color-row i:nth-child(3) { background: #65f4e6; }
.color-row i:nth-child(4) { background: #ffe172; }
.object-icon { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 6px; background: var(--accent); color: white; font-weight: 800; }
.record-head > div { display: flex; align-items: center; gap: 12px; }
.path { display: grid; grid-template-columns: repeat(5, 1fr); margin: 16px 0; overflow: hidden; border-radius: 999px; }
.path span { padding: 10px; background: var(--surface-2); text-align: center; color: var(--muted); }
.path .active { background: var(--accent); color: white; }
.path .done { background: #d7ebff; color: #1554a2; }
.record-grid { display: grid; grid-template-columns: 1fr 280px; gap: 14px; }
.related-list, .activity-timeline { padding: 16px; border: 1px solid var(--line); border-radius: var(--radius-sm); }
.related-list p { display: grid; grid-template-columns: minmax(0, 1fr) auto auto; gap: 10px; justify-content: space-between; border-top: 1px solid var(--line); padding-top: 10px; }
.related-list p em { color: var(--accent); font-style: normal; font-weight: 800; }
.activity-timeline p { padding-left: 14px; border-left: 3px solid var(--accent); }
.repo-head { align-items: end; border-bottom: 1px solid var(--line); padding-bottom: 12px; }
.repo-head nav { display: flex; flex-wrap: wrap; gap: 8px; }
.repo-head span { padding: 8px 10px; border-radius: 6px; }
.repo-head .active { background: var(--soft); color: var(--accent); }
.repo-layout { display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: 16px; padding-top: 14px; }
.file-tree, .code-panel, .issue-panel { border: 1px solid var(--line); border-radius: var(--radius-sm); background: var(--surface); padding: 14px; }
.code-toolbar { display: flex; justify-content: space-between; padding-bottom: 10px; border-bottom: 1px solid var(--line); }
.code-panel pre { overflow: auto; margin: 12px 0 0; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; line-height: 1.7; }
.label { display: inline-flex; padding: 2px 7px; margin-right: 6px; border-radius: 999px; background: #ddf4ff; color: #0969da; font-weight: 700; }
.label.purple { background: #fbefff; color: #8250df; }
.repo-main { min-width: 0; }
.repo-path { margin: 0 0 2px; color: var(--muted); font-size: 13px; }
.repo-stats { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
.repo-stats span { padding: 7px 10px; border: 1px solid var(--line); border-radius: 999px; background: var(--surface); color: var(--muted); font-size: 13px; }
.repo-stats b { color: var(--text); }
.repo-board { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-top: 14px; }
.repo-board article { padding: 16px; border: 1px solid var(--line); border-radius: var(--radius-sm); background: linear-gradient(180deg, #ffffff, #f6f8fa); }
.repo-board b, .repo-board strong, .repo-board span { display: block; }
.repo-board strong { margin: 6px 0; font-size: 18px; }
.checks-line { display: grid !important; grid-template-columns: repeat(5, 1fr); gap: 5px; margin-top: 10px; }
.checks-line i { height: 8px; border-radius: 999px; background: #1a7f37; }
.checks-line i:nth-child(4) { background: #0969da; }
.checks-line i:nth-child(5) { background: #8250df; }
.repo-toolbar { display: flex; gap: 8px; justify-content: flex-end; margin-bottom: 10px; }
.repo-toolbar button,
.readme-panel button,
.repo-sidebar button,
.repo-activity button {
  min-height: 34px;
  padding: 0 12px;
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  background: #1f883d;
  color: #fff;
  font: inherit;
  font-weight: 800;
}
.repo-toolbar .secondary,
.readme-panel .secondary { background: var(--surface); color: var(--text); }
.file-list, .readme-panel, .repo-sidebar section, .activity-strip article {
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  background: var(--surface);
}
.file-list { overflow: hidden; }
.file-list header,
.file-list p,
.readme-panel header {
  display: grid;
  grid-template-columns: 26px minmax(0, 1fr) 1.1fr;
  gap: 10px;
  align-items: center;
  margin: 0;
  padding: 11px 14px;
  border-bottom: 1px solid var(--line);
}
.file-list header { grid-template-columns: 130px minmax(0, 1fr) 120px; background: var(--surface-2); }
.file-list p:last-child { border-bottom: 0; }
.file-list p span { color: var(--muted); }
.file-list p em,
.file-list header em { color: var(--muted); font-size: 13px; font-style: normal; }
.readme-panel { margin-top: 14px; padding-bottom: 18px; overflow: hidden; }
.readme-panel header { grid-template-columns: 1fr auto; background: var(--surface-2); }
.readme-panel h2,
.readme-panel p,
.readme-panel pre,
.readme-grid { margin-left: 18px; margin-right: 18px; }
.readme-panel pre {
  overflow: auto;
  padding: 14px;
  border-radius: var(--radius-sm);
  background: #0d1117;
  color: #e6edf3;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  line-height: 1.6;
}
.readme-grid { display: grid; grid-template-columns: 1.15fr .85fr; gap: 14px; }
.readme-grid section { padding: 14px; border: 1px solid var(--line); border-radius: var(--radius-sm); background: #fff; }
.readme-grid p { margin: 10px 0 0; }
.repo-sidebar { display: grid; gap: 14px; align-content: start; }
.repo-sidebar section { padding: 16px; }
.language-row { display: grid; grid-template-columns: 10px 1fr; gap: 8px 10px; margin-top: 14px; color: var(--muted); font-size: 13px; }
.language-row i { width: 10px; height: 10px; margin-top: 4px; border-radius: 999px; background: var(--accent); }
.language-row i:nth-of-type(2) { background: var(--accent-2); }
.language-row i:nth-of-type(3) { background: var(--success); }
.release-card strong { display: block; margin: 10px 0; color: var(--accent); font-size: 24px; }
.activity-strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 14px; }
.activity-strip article { padding: 14px; }
.activity-strip span { display: block; margin-top: 4px; color: var(--muted); }
.repo-activity { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-top: 14px; }
.repo-activity article { padding: 16px; border: 1px solid var(--line); border-radius: var(--radius-sm); background: var(--surface); }
.repo-activity p { margin: 10px 0 0; color: var(--muted); }
.dot { display: inline-block; width: 10px; height: 10px; margin-right: 8px; border-radius: 999px; background: #0969da; }
.dot.green { background: #1a7f37; }
.query-form { display: grid; grid-template-columns: repeat(4, 1fr) auto auto; gap: 12px; padding: 18px; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); box-shadow: var(--shadow); }
.query-form label { display: grid; gap: 6px; color: var(--muted); font-size: 13px; }
.query-form input { min-height: 36px; border: 1px solid var(--line); border-radius: var(--radius-sm); padding: 0 10px; font: inherit; }
.ant-table { margin-top: 14px; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); box-shadow: var(--shadow); overflow: hidden; }
.ant-table header { padding: 16px 18px; border-bottom: 1px solid var(--line); }
.fluent-app { display: grid; grid-template-columns: 64px 220px minmax(0, 1fr); gap: 12px; min-height: calc(100vh - 92px); }
.cncrm-shell, .ant-shell { display: grid; grid-template-columns: 230px minmax(0, 1fr); gap: 14px; min-height: calc(100vh - 100px); }
.fluent-icons { display: grid; align-content: start; justify-items: center; gap: 10px; padding: 12px 8px; background: rgba(255,255,255,.74); border: 1px solid var(--line); border-radius: var(--radius); box-shadow: var(--shadow); backdrop-filter: blur(18px); }
.fluent-icons b, .fluent-icons span { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 10px; font-weight: 900; }
.fluent-icons b { background: var(--accent); color: white; }
.fluent-icons span { color: var(--muted); }
.fluent-icons .active { background: var(--soft); color: var(--accent); }
.fluent-rail, .cncrm-menu, .ant-sider { padding: 18px; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); box-shadow: var(--shadow); }
.fluent-rail b, .cncrm-menu b, .ant-sider b { display: block; margin-bottom: 18px; font-size: 18px; }
.fluent-rail span, .cncrm-menu span, .ant-sider span { display: block; margin: 8px 0; padding: 10px 12px; border-radius: var(--radius-sm); color: var(--muted); }
.fluent-rail .active, .cncrm-menu .active, .ant-sider .active { color: var(--accent); background: var(--soft); font-weight: 800; }
.fluent-main, .cncrm-main, .ant-main { min-width: 0; }
.fluent-account { margin-top: 28px; padding: 14px; border-radius: var(--radius-sm); background: var(--surface-2); }
.fluent-account strong, .fluent-account em { display: block; }
.fluent-account em { margin-top: 4px; color: var(--muted); font-size: 12px; font-style: normal; }
.message-bar { display: flex; align-items: center; gap: 12px; margin-top: 10px; padding: 10px 12px; border: 1px solid #f3d19e; border-radius: var(--radius-sm); background: #fff4ce; color: #3b3a39; }
.message-bar span { color: #605e5c; }
.message-bar button { margin-left: auto; min-height: 30px; padding: 0 10px; border: 1px solid #d1d1d1; border-radius: var(--radius-sm); background: white; font: inherit; font-weight: 800; }
.fluent-desk { display: grid; grid-template-columns: 280px minmax(0, 1fr) 260px; gap: 14px; margin-top: 14px; }
.people-row { display: flex; align-items: center; gap: 8px; margin-top: 20px; }
.people-row i, .avatar-row i { display: inline-grid; place-items: center; width: 28px; height: 28px; border-radius: 999px; background: var(--accent); color: #fff; font-size: 11px; font-style: normal; font-weight: 800; }
.mail-list p span { display: block; margin-top: 4px; color: var(--muted); font-size: 12px; }
.pane-head { display: flex; justify-content: space-between; align-items: center; gap: 12px; color: var(--muted); font-size: 12px; }
.fluent-proof { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 20px; }
.fluent-proof article { padding: 14px; border: 1px solid var(--line); border-radius: var(--radius-sm); background: var(--surface-2); }
.fluent-proof b { display: block; color: var(--accent); font-size: 26px; }
.fluent-proof span { color: var(--muted); font-size: 12px; }
.fluent-bottom { grid-template-columns: .8fr 1.1fr .8fr; }
.fluent-task { padding: 18px; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); box-shadow: var(--shadow); }
.fluent-bottom .agenda-panel, .fluent-bottom .source-panel, .fluent-bottom .fluent-task { min-height: 380px; }
.fluent-task p { margin: 16px 0; color: var(--muted); }
.fluent-task button { min-height: 36px; padding: 0 12px; border: 0; border-radius: var(--radius-sm); background: var(--accent); color: white; font: inherit; font-weight: 800; }
.carbon-console { min-height: calc(100vh - 62px); padding: 0 14px 14px; }
.carbon-table table { font-size: 13px; }
.polaris-tabs { display: flex; flex-wrap: wrap; gap: 8px; margin: 14px 0; }
.polaris-tabs span { padding: 8px 12px; background: var(--surface-2); border: 1px solid var(--line); border-radius: var(--radius-sm); color: var(--muted); font-weight: 700; }
.polaris-tabs .active { color: var(--accent); background: var(--soft); }
.atlassian-board { min-height: calc(100vh - 120px); }
.board-columns { grid-template-columns: repeat(4, 1fr); }
.avatar-row { display: flex; align-items: center; gap: 6px; margin-top: 12px; }
.avatar-row small { margin-left: auto; color: var(--muted); font-weight: 800; }
.gov-service { max-width: 1120px; margin: 26px auto 0; padding: 0 24px; }
.gov-phase { padding: 12px 0; border-bottom: 1px solid #b1b4b6; font-weight: 800; }
.gov-phase span { margin-left: 10px; font-weight: 400; }
.gov-caption { display: block; margin-bottom: 10px; color: #505a5f; font-size: 18px; }
.gov-two-col h3 { max-width: 720px; font-size: clamp(42px, 5vw, 72px); line-height: .98; }
.gov-summary { margin-top: 24px; padding-top: 16px; border-top: 4px solid #1d70b8; }
.gov-summary p { color: #0b0c0c; }
.gov-summary span { display: block; margin-top: 6px; }
.gov-task-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 34px; padding-top: 22px; border-top: 1px solid #b1b4b6; }
.gov-task-grid article { padding: 18px 0; border-top: 6px solid #1d70b8; }
.gov-task-grid p { color: #0b0c0c; }
.gov-task-grid a, .gov-form-preview a { display: block; margin-top: 12px; color: #1d70b8; font-weight: 800; text-decoration: underline; }
.gov-form-preview { display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: 28px; margin-top: 24px; padding: 22px; background: #f3f2f1; border-left: 8px solid #b1b4b6; }
.gov-form-preview h4 { margin: 0 0 16px; font-size: 24px; }
.gov-form-preview dl { display: grid; grid-template-columns: 180px 1fr; gap: 0; margin: 0; border-top: 1px solid #b1b4b6; }
.gov-form-preview dt, .gov-form-preview dd { margin: 0; padding: 12px 0; border-bottom: 1px solid #b1b4b6; }
.gov-form-preview dt { font-weight: 800; }
.carbon-console { display: grid; grid-template-columns: 220px minmax(0, 1fr); gap: 0; padding: 0; background: #f4f4f4; border: 1px solid var(--line); }
.carbon-nav { padding: 16px; background: #262626; color: #f4f4f4; }
.carbon-nav b { display: block; margin-bottom: 18px; font-size: 18px; }
.carbon-nav span { display: block; margin: 2px 0; padding: 12px; border-left: 3px solid transparent; color: #c6c6c6; }
.carbon-nav .active { border-left-color: var(--accent); background: #393939; color: #fff; }
.carbon-main { min-width: 0; }
.carbon-tabs button { margin-left: auto; padding: 0 16px; border: 0; background: var(--accent); color: white; font: inherit; font-weight: 800; }
.carbon-summary { grid-template-columns: repeat(5, minmax(0, 1fr)); }
.carbon-table header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.carbon-table header span { color: var(--muted); font-size: 12px; }
.carbon-tag { display: inline-flex; min-height: 22px; align-items: center; padding: 0 8px; background: #e0e0e0; color: #262626; font-size: 12px; font-weight: 800; }
.carbon-tag.green { background: #a7f0ba; color: #044317; }
.carbon-tag.blue { background: #d0e2ff; color: #0043ce; }
.carbon-tag.red { background: #ffd7d9; color: #a2191f; }
.carbon-lower { grid-template-columns: .95fr 1.05fr .8fr; }
.carbon-lower dl { display: grid; grid-template-columns: 110px 1fr; margin-top: 12px; border-top: 1px solid var(--line); }
.carbon-lower dt, .carbon-lower dd { margin: 0; padding: 10px 0; border-bottom: 1px solid var(--line); }
.carbon-lower dt { color: var(--muted); }
.polaris-admin { display: grid; grid-template-columns: 220px minmax(0, 1fr); gap: 0; padding: 0; overflow: hidden; background: #f7f3ec; }
.polaris-nav { padding: 18px; border-right: 1px solid var(--line); background: #fff; }
.polaris-nav b { display: block; margin-bottom: 18px; }
.polaris-nav span { display: block; margin: 5px 0; padding: 10px 12px; border-radius: 8px; color: var(--muted); font-weight: 700; }
.polaris-nav .active { background: var(--soft); color: var(--accent); }
.polaris-main { min-width: 0; padding: 20px; }
.polaris-filterbar { display: grid; grid-template-columns: minmax(0, 1fr) auto auto auto; gap: 8px; margin: 14px 0; }
.polaris-filterbar input, .polaris-filterbar button { min-height: 38px; border: 1px solid var(--line); border-radius: var(--radius-sm); background: #fff; padding: 0 12px; font: inherit; }
.polaris-tabs button { margin-left: auto; border: 1px solid var(--line); border-radius: var(--radius-sm); background: #fff; padding: 0 12px; font: inherit; font-weight: 800; }
.resource-list article { display: grid; grid-template-columns: auto minmax(0, 1fr) auto auto; gap: 12px; align-items: center; background: #fff; }
.resource-list article div { display: grid; gap: 4px; }
.resource-list article div span { color: var(--muted); font-size: 13px; }
.resource-list strong { font-size: 13px; }
.polaris-admin button { min-height: 34px; padding: 0 12px; border: 1px solid var(--line); border-radius: var(--radius-sm); background: #fff; font: inherit; font-weight: 800; }
.polaris-admin .resource-header button, .fulfillment-card button { background: var(--accent); color: white; border-color: var(--accent); }
.fulfillment-card small { display: block; color: var(--muted); }
.atlassian-board { display: grid; grid-template-columns: 220px minmax(0, 1fr); gap: 0; padding: 0; overflow: hidden; background: #f7f8f9; }
.atl-sidebar { padding: 18px; border-right: 1px solid var(--line); background: #fff; }
.atl-sidebar b { display: block; margin-bottom: 18px; color: var(--accent); font-size: 20px; }
.atl-sidebar span { display: block; margin: 5px 0; padding: 10px 12px; border-radius: 6px; color: var(--muted); font-weight: 700; }
.atl-sidebar .active { background: var(--soft); color: var(--accent); }
.atl-main { min-width: 0; padding: 18px; }
.board-toolbar p { margin: 4px 0 0; color: var(--muted); }
.atl-layout { display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: 14px; margin-top: 14px; }
.atl-layout .board-columns { grid-template-columns: repeat(4, 1fr); }
.board-columns section > b { display: flex; justify-content: space-between; }
.board-columns section > b em { color: var(--muted); font-style: normal; }
.issue-detail { padding: 18px; background: #fff; border: 1px solid var(--line); border-radius: var(--radius-sm); box-shadow: var(--shadow); }
.issue-detail h3 { margin: 12px 0; font-size: 24px; }
.issue-detail p { color: var(--muted); }
.issue-detail dl { display: grid; grid-template-columns: 90px 1fr; gap: 0; margin: 18px 0; border-top: 1px solid var(--line); }
.issue-detail dt, .issue-detail dd { margin: 0; padding: 10px 0; border-bottom: 1px solid var(--line); }
.issue-detail dt { color: var(--muted); }
.issue-detail button { min-height: 36px; padding: 0 12px; border: 0; border-radius: 4px; background: var(--accent); color: white; font: inherit; font-weight: 800; }
.atl-lower { display: grid; grid-template-columns: .8fr 1fr 1.2fr; gap: 14px; margin-top: 14px; }
.atl-lower article { min-height: 190px; padding: 18px; background: #fff; border: 1px solid var(--line); border-radius: var(--radius-sm); box-shadow: var(--shadow); }
.atl-lower strong { display: block; margin: 16px 0 6px; color: var(--accent); font-size: 44px; }
.atl-lower span { color: var(--muted); }
.atl-lower p { display: flex; gap: 12px; margin: 12px 0; color: var(--muted); }
.atl-lower p span { min-width: 36px; color: var(--accent); font-weight: 800; }
.gov-service { max-width: none; margin: 0; padding: 0 30px 34px; background: #fff; }
.gov-header { display: flex; align-items: center; gap: 18px; margin: 0 -30px; padding: 14px 30px; background: #0b0c0c; color: #fff; }
.gov-header b { font-size: 28px; }
.gov-task-list { margin-top: 30px; max-width: 920px; }
.gov-task-list h4 { margin: 0 0 12px; font-size: 28px; }
.gov-task-list p { display: grid; grid-template-columns: minmax(0, 1fr) 150px; gap: 16px; margin: 0; padding: 14px 0; border-top: 1px solid #b1b4b6; }
.gov-task-list p:last-child { border-bottom: 1px solid #b1b4b6; }
.gov-task-list a { color: #1d70b8; font-weight: 800; text-decoration: underline; }
.gov-task-list span { justify-self: end; padding: 2px 8px; background: #f3f2f1; font-weight: 800; }
.asset-canvas { min-width: 0; }
.asset-canvas header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.asset-grid { grid-template-columns: repeat(4, 1fr); }
.asset-grid small { display: block; margin-top: 6px; color: #6d6d6d; }
.cncrm-shell { grid-template-columns: 220px minmax(0, 1fr); min-height: calc(100vh - 64px); padding: 14px; background: #eef4ff; }
.cncrm-menu { border-radius: 0; background: #163f8f; color: #fff; border: 0; }
.cncrm-menu span { color: rgba(255,255,255,.72); }
.cncrm-menu .active { color: #163f8f; background: #fff; }
.cncrm-head, .ant-header { display: flex; justify-content: space-between; align-items: center; padding: 18px; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); box-shadow: var(--shadow); }
.cncrm-head > div:last-child, .ant-header > div:last-child { display: flex; gap: 10px; }
.cncrm-shell button, .ant-shell button {
  min-height: 36px;
  padding: 0 14px;
  border: 0;
  border-radius: var(--radius-sm);
  background: var(--accent);
  color: #fff;
  font: inherit;
  font-weight: 800;
  box-shadow: 0 8px 18px rgba(1,118,211,.18);
}
.ant-shell .button.secondary,
.ant-shell button.secondary,
.cncrm-shell .button.secondary,
.cncrm-shell button.secondary {
  color: var(--accent);
  background: var(--soft);
  box-shadow: none;
}
.cncrm-kpis, .ant-kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 14px 0; }
.cncrm-kpis div, .ant-kpis article { padding: 18px; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); box-shadow: var(--shadow); }
.cncrm-kpis b, .ant-kpis b { display: block; color: var(--accent); font-size: 28px; }
.cncrm-kpis span, .ant-kpis span { color: var(--muted); font-size: 13px; }
.cncrm-tabs { display: flex; gap: 8px; align-items: center; margin: 14px 0; padding: 10px; background: #fff; border: 1px solid var(--line); border-radius: var(--radius); box-shadow: var(--shadow); }
.cncrm-tabs span { padding: 8px 12px; border-radius: var(--radius-sm); color: var(--muted); font-weight: 800; }
.cncrm-tabs .active { color: var(--accent); background: var(--soft); }
.cncrm-tabs button { margin-left: auto; }
.cncrm-shell .record-grid { grid-template-columns: .8fr 1.3fr .9fr; }
.account-card { padding: 16px; border: 1px solid var(--line); border-radius: var(--radius-sm); background: #fff; }
.account-card dl { display: grid; grid-template-columns: 76px 1fr; margin: 12px 0; border-top: 1px solid var(--line); }
.account-card dt, .account-card dd { margin: 0; padding: 9px 0; border-bottom: 1px solid var(--line); }
.account-card dt { color: var(--muted); }
.account-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.account-tags span { padding: 4px 8px; border-radius: 999px; background: var(--soft); color: var(--accent); font-size: 12px; font-weight: 800; }
.cncrm-bottom { display: grid; grid-template-columns: 1fr 1.1fr .9fr; gap: 14px; margin-top: 14px; }
.cncrm-bottom article { padding: 16px; border: 1px solid var(--line); border-radius: var(--radius); background: #fff; box-shadow: var(--shadow); }
.cncrm-bottom p { display: flex; justify-content: space-between; gap: 12px; margin: 10px 0; color: var(--muted); }
.cncrm-bottom strong { color: var(--accent); }
.primer-repo { min-height: calc(100vh - 56px); padding: 18px; background: #fff; }
.primer .repo-head { align-items: center; }
.primer .repo-head p { margin: 4px 0 0; color: var(--muted); }
.label.green { background: #dafbe1; color: #1a7f37; }
.ant-shell { grid-template-columns: 228px minmax(0, 1fr); min-height: 100vh; background: #f5f7fb; }
.ant-sider { border-radius: 0; border: 0; border-right: 1px solid var(--line); box-shadow: none; }
.ant-main { padding: 18px; }
.ant-header small { display: block; margin-bottom: 4px; color: var(--muted); }
.ant-kpis article { position: relative; overflow: hidden; }
.ant-kpis i { position: absolute; right: 16px; bottom: 14px; width: 72px; height: 28px; border-radius: 999px; background: linear-gradient(90deg, rgba(22,119,255,.08), rgba(22,119,255,.32)); }
.ant-alert { display: flex; align-items: center; gap: 12px; margin-top: 14px; padding: 12px 16px; background: #fffbe6; border: 1px solid #ffe58f; border-radius: var(--radius); }
.ant-alert span { color: var(--muted); }
.ant-alert button { margin-left: auto; min-height: 30px; box-shadow: none; }
.ant-work { display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: 14px; margin-top: 14px; }
.ant-drawer { padding: 18px; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); box-shadow: var(--shadow); }
.ant-drawer dl { display: grid; grid-template-columns: 72px 1fr; margin: 14px 0; border-top: 1px solid var(--line); }
.ant-drawer dt, .ant-drawer dd { margin: 0; padding: 8px 0; border-bottom: 1px solid var(--line); }
.ant-drawer dt { color: var(--muted); }
.ant-drawer ol { margin: 18px 0 0; padding: 0; list-style: none; }
.ant-drawer li { margin: 10px 0; padding: 10px; border-radius: var(--radius-sm); background: var(--surface-2); }
.ant-drawer .done { color: var(--success); background: #f6ffed; }
.ant-drawer .active { color: var(--accent); background: var(--soft); }
.ant-status { display: inline-flex; align-items: center; min-height: 24px; padding: 0 8px; border-radius: 999px; font-size: 12px; font-weight: 800; }
.ant-status.success { color: #389e0d; background: #f6ffed; }
.ant-status.processing { color: #0958d9; background: #e6f4ff; }
.ant-status.default { color: rgba(0,0,0,.65); background: #f5f5f5; }
.ant-status.warning { color: #d48806; background: #fff7e6; }
.ant-table footer { display: flex; justify-content: space-between; align-items: center; padding: 12px 18px; color: var(--muted); border-top: 1px solid var(--line); }
.ant-lower { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; margin-top: 14px; }
.ant-lower article { padding: 16px; background: #fff; border: 1px solid var(--line); border-radius: var(--radius); box-shadow: var(--shadow); }
.ant-lower p { display: grid; grid-template-columns: 58px 1fr; gap: 10px; margin: 10px 0; color: var(--muted); }
.ant-lower p span { color: var(--accent); font-weight: 800; }
.mini-bars { display: grid; grid-template-columns: repeat(6, 1fr); align-items: end; gap: 8px; min-height: 96px; margin-top: 16px; }
.mini-bars i { border-radius: 6px 6px 0 0; background: linear-gradient(180deg, #69b1ff, #1677ff); }
.mini-bars i:nth-child(1) { height: 38px; }
.mini-bars i:nth-child(2) { height: 72px; }
.mini-bars i:nth-child(3) { height: 54px; }
.mini-bars i:nth-child(4) { height: 92px; }
.mini-bars i:nth-child(5) { height: 66px; }
.mini-bars i:nth-child(6) { height: 44px; }
.ant-lower article:last-child { display: grid; gap: 10px; align-content: start; }
${style.cssExtra}
@media (max-width: 900px) {
  .topline { align-items: flex-start; flex-direction: column; padding: 16px; }
  .nav { flex-wrap: wrap; }
  .hero { padding: 28px; }
  .stats, .content, .news { grid-template-columns: 1fr; }
  .material-shell, .tonal-grid, .fluent-split, .fluent-app, .fluent-desk, .fluent-bottom, .carbon-summary, .carbon-grid, .carbon-lower, .polaris-metrics, .polaris-work, .board-columns, .gov-two-col, .gov-task-grid, .gov-form-preview, .spectrum-workbench, .record-grid, .repo-layout, .query-form, .cncrm-shell, .cncrm-kpis, .ant-shell, .ant-kpis, .ant-work, .asset-grid { grid-template-columns: 1fr; }
  .command-bar { grid-template-columns: 1fr 1fr; }
  .fab { position: static; width: 100%; margin-top: 12px; }
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

    ${renderStyleSpecificContent(style, storyCards)}

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
