#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const rootDir = path.resolve(__dirname, "..");
const skillDir = path.join(rootDir, "skills", "awesome-page-design");
const stylesDir = path.join(skillDir, "assets", "styles");
const skillReferenceStylesDir = path.join(skillDir, "references", "styles");

const styleMeta = [
  { version: "A", slug: "classic", name: "Classic News", mode: "Light", bestFor: "editorial sites, authority content, calm product pages", language: "light blue-gray canvas, indigo accent, Inter, fine borders, soft shadows", personality: "calm, credible, editorial" },
  { version: "B", slug: "grid", name: "Card Grid", mode: "Light", bestFor: "dashboards, catalogs, overview pages", language: "neutral canvas, violet accent, searchable card grid, statistics rhythm", personality: "efficient, scannable, data-aware" },
  { version: "C", slug: "feed", name: "Feed Layout", mode: "Light", bestFor: "feeds, communities, updates, article streams", language: "centered feed, cyan accent, expandable cards, soft dividers", personality: "conversational, current, readable" },
  { version: "D", slug: "bento", name: "Bento Grid", mode: "Light", bestFor: "product showcases, Apple-like overview pages", language: "Apple gray, blue accent, large radius, bento surfaces", personality: "polished, spacious, product-led" },
  { version: "E", slug: "glass", name: "Glassmorphism", mode: "Dark", bestFor: "immersive dark landing pages, AI products, visual experiments", language: "deep purple gradient, translucent glass, cyan highlights, blur and glow", personality: "immersive, futuristic, luminous" },
  { version: "F", slug: "brutalism", name: "Neo-Brutalism", mode: "Light", bestFor: "bold campaigns, indie products, playful utilities", language: "warm yellow, black hard borders, hard shadows, high-saturation labels", personality: "loud, direct, rebellious" },
  { version: "G", slug: "aurora", name: "Aurora Gradient", mode: "Dark", bestFor: "futuristic products, AI tools, premium dark experiences", language: "dark canvas, aurora color fields, soft glow, drifting gradient energy", personality: "premium, energetic, advanced" },
  { version: "H", slug: "y2k", name: "Retro Y2K", mode: "Light", bestFor: "music, fashion, youth culture, playful campaigns", language: "candy gradients, neon details, retro display type, sparkle motion", personality: "nostalgic, playful, high-energy" },
  { version: "I", slug: "swiss", name: "Swiss Editorial", mode: "Light", bestFor: "portfolios, cultural sites, design studios, serious content", language: "pure white, red accent, Helvetica, strict grid, no shadow", personality: "precise, restrained, typographic" },
  { version: "J", slug: "terminal", name: "Terminal Hacker", mode: "Dark", bestFor: "developer tools, CLI products, security, open source", language: "black canvas, terminal green, monospace type, CRT scanlines", personality: "technical, terse, command-line native" },
  { version: "K", slug: "clay", name: "Claymorphism", mode: "Light", bestFor: "friendly SaaS, education, wellness, approachable tools", language: "lavender background, rounded Nunito type, soft inner and outer shadows", personality: "friendly, tactile, approachable" },
  { version: "L", slug: "cutealism", name: "Cute-alism", mode: "Light", bestFor: "playful brands, creator tools, youth products", language: "neon yellow, pink hard shadow, sticker-like decoration, soft-hard contrast", personality: "cute, expressive, intentionally loud" },
  { version: "M", slug: "stark", name: "Resonant Stark", mode: "Dark", bestFor: "premium dark portfolios, art, high-end product teasers", language: "near-black canvas, thin type, subtle glow, extreme whitespace, delicate lines", personality: "quiet, premium, meditative" },
  { version: "N", slug: "skeuomorph", name: "Light Skeuomorphism", mode: "Light", bestFor: "Apple-like tools, device apps, tactile product UI", language: "Apple gray, embossed surfaces, inset controls, layered physical depth", personality: "tactile, precise, device-native" },
  { version: "O", slug: "scribble", name: "Human Scribble", mode: "Light", bestFor: "workshops, education, human-centered notes, maker pages", language: "warm paper, hand-drawn fonts, dashed borders, marker highlights", personality: "human, informal, workshop-like" },
  { version: "P", slug: "material-you", name: "Material You", mode: "Light", bestFor: "Android-like apps, friendly product UI, general-purpose tools", language: "Material 3 purple, dynamic color feeling, rounded surfaces, large actions", personality: "friendly, rounded, mobile-first" },
  { version: "Q", slug: "fluent-cloud", name: "Fluent Cloud", mode: "Light", bestFor: "Microsoft-like productivity tools, cloud apps", language: "Segoe UI, neutral surfaces, blue action color, light depth and command bars", personality: "productive, familiar, application-like" },
  { version: "R", slug: "carbon-enterprise", name: "Carbon Enterprise", mode: "Light", bestFor: "serious enterprise software, analytics, governance, audit, monitoring, and dense operations UI", language: "dark enterprise side nav, tabbed command area, five-metric strip, dense data table, diagnostic queue, control summary", personality: "serious, systematic, dense" },
  { version: "S", slug: "polaris-commerce", name: "Polaris Commerce", mode: "Light", bestFor: "merchant tools, ecommerce admin, order management, fulfillment, inventory, and business workflows", language: "merchant side nav, saved views, filter toolbar, bulk action bar, order resource rows, fulfillment preview", personality: "merchant-friendly, practical, trustworthy" },
  { version: "T", slug: "atlassian-workbench", name: "Atlassian Workbench", mode: "Light", bestFor: "collaboration tools, planning apps, issue tracking, sprint planning, and team dashboards", language: "Jira-like project nav, sprint board columns, lozenge issue cards, issue detail panel, release and activity summaries", personality: "collaborative, clear, work-focused" },
  { version: "U", slug: "gov-service", name: "Gov Service", mode: "Light", bestFor: "public service, legal, compliance, forms, and accessibility-first transaction sites", language: "GOV.UK-style black header, beta and warning bars, direct service hero, task list, summary list, related service links", personality: "official, accessible, direct" },
  { version: "V", slug: "spectrum-creative", name: "Spectrum Creative", mode: "Light", bestFor: "creative software, media tools, campaign review, visual production, and asset managers", language: "dark creative tool rail, layer stack, artboard canvas, review pins, properties inspector, media asset grid", personality: "creative, tool-like, media-aware" },
  { version: "W", slug: "lightning-crm", name: "Lightning CRM", mode: "Light", bestFor: "CRM, sales tools, customer success, contract receipts, approval workflows, and customer operations", language: "China CRM-like blue side rail, customer 360, sales path, account profile, opportunities, follow-up timeline, receipt and approval panels", personality: "business-ready, compact, operational" },
  { version: "X", slug: "primer-dev", name: "Primer Dev", mode: "Light", bestFor: "developer platforms, docs, repo browsers, package hubs, issue trackers, release pages", language: "GitHub-style repo header, repo tabs, CI status cards, branch toolbar, file list, README panel, release card, issue labels, activity strip", personality: "developer-native, structured, repository-like" },
  { version: "Y", slug: "ant-pro", name: "Ant Pro", mode: "Light", bestFor: "enterprise admin, B-end SaaS, approval centers, data tables, operations workbenches, management consoles", language: "Ant Design Pro shell, breadcrumb header, query form, KPI cards, alert, ProTable, drawer details, steps, timeline, quick actions", personality: "stable, enterprise, table-ready" },
];

const storySet = {
  heroTitle: "AI Daily Brief: Foundation Models Move From Demos To Daily Operations",
  heroText: "Today's AI news is focused on practical deployment: multimodal agents are entering office workflows, smaller open models are moving to devices, and enterprises are tightening governance around production systems.",
  heroTag: "Daily Brief",
  source: "AI Pulse Desk",
  timeNow: "12 min ago",
  reads: "18.6k reads",
  nav: ["Home", "Models", "Applications", "Research", "Policy"],
  categories: ["All", "Models", "Applications", "Research", "Policy"],
  stories: [
    {
      tag: "Models",
      title: "Multimodal agents begin handling complex office workflows",
      text: "New AI workflow systems can move across documents, spreadsheets, email, and code repositories while preserving task context.",
      meta: "28 min ago · 12.4k reads",
      source: "AI Pulse",
    },
    {
      tag: "Models",
      title: "Open small models accelerate on-device inference",
      text: "Phones, vehicles, and industrial devices are adopting compact models for privacy, offline reliability, and faster response times.",
      meta: "1 hr ago · 8.1k reads",
      source: "Edge AI Review",
    },
    {
      tag: "Applications",
      title: "AI design tools become part of product delivery",
      text: "Teams are using AI to move from requirements to prototypes, visual systems, and frontend implementation notes in one shared loop.",
      meta: "2 hrs ago · 7.6k reads",
      source: "Product Systems",
    },
    {
      tag: "Policy",
      title: "Enterprise AI safety shifts from compliance to monitoring",
      text: "Model evaluation, prompt review, permission control, and output tracing are becoming long-running platform capabilities.",
      meta: "4 hrs ago · 5.9k reads",
      source: "Governance Weekly",
    },
    {
      tag: "Research",
      title: "Reasoning models move toward verifiable intermediate steps",
      text: "Research groups are improving reliability with structured traces, tool calls, and automatic verification for complex tasks.",
      meta: "6 hrs ago · 4.8k reads",
      source: "Lab Notes",
    },
    {
      tag: "Business",
      title: "AI-native SaaS pricing shifts from seats to outcomes",
      text: "Products for support, sales, and legal review are moving toward pricing based on completed tasks and measurable results.",
      meta: "8 hrs ago · 4.2k reads",
      source: "SaaS Ledger",
    },
  ],
  trending: [
    "Why multimodal agents are becoming the new enterprise interface",
    "Open models versus hosted APIs: teams rethink deployment strategy",
    "Governance teams standardize monitoring for production AI systems",
    "On-device inference gains traction in privacy-sensitive workflows",
    "Outcome-based pricing changes the AI SaaS sales motion",
  ],
};

const commonReplacements = [
  [/AI Pulse - 版本[A-Z]：[^<"]+/g, (match) => `AI Pulse - Version ${match.match(/版本([A-Z])/u)?.[1] || ""}`],
  [/首页/g, "Home"],
  [/大模型/g, "Models"],
  [/应用/g, "Applications"],
  [/研究/g, "Research"],
  [/政策/g, "Policy"],
  [/全部/g, "All"],
  [/突发新闻|突发/g, "Breaking"],
  [/最新资讯|今日资讯|今日 AI 要闻速览|今日要闻|每日简报|每日精选 AI 资讯/g, "AI Daily Brief"],
  [/热门趋势|热门讨论|全网热议/g, "Trending"],
  [/热门/g, "Trending"],
  [/新鲜|新发布|新增/g, "New"],
  [/实时更新|实时/g, "Live"],
  [/订阅日报|订阅/g, "Subscribe"],
  [/搜索 AI 资讯/g, "Search AI news"],
  [/加载更多资讯/g, "Load more stories"],
  [/正在加载/g, "Loading"],
  [/分享/g, "Share"],
  [/收藏/g, "Save"],
  [/阅读/g, "reads"],
  [/讨论/g, "discussions"],
  [/分钟前/g, "min ago"],
  [/小时前/g, "hrs ago"],
  [/昨日/g, "Yesterday"],
  [/昨天/g, "Yesterday"],
  [/关于我们|关于/g, "About"],
  [/投稿/g, "Submit"],
  [/隐私政策|隐私/g, "Privacy"],
  [/行业动态/g, "Industry"],
  [/研究前沿/g, "Research"],
  [/医疗/g, "Healthcare"],
  [/合规/g, "Compliance"],
  [/创业/g, "Startups"],
  [/观点/g, "Opinion"],
  [/官方/g, "Official"],
  [/本周论文/g, "Papers This Week"],
  [/活跃模型/g, "Active Models"],
  [/较上周/g, "vs last week"],
  [/较昨日/g, "vs yesterday"],
  [/周一/g, "Mon"],
  [/周二/g, "Tue"],
  [/周三/g, "Wed"],
  [/周四/g, "Thu"],
  [/周五/g, "Fri"],
  [/周六/g, "Sat"],
  [/周日/g, "Sun"],
  [/月/g, "Month"],
  [/日/g, "Day"],
  [/第\$\{getWeekNumber\(now\)\}周/g, "Week ${getWeekNumber(now)}"],
  [/第/g, "Week "],
  [/周/g, " week"],
];

function storyForText(text) {
  if (/GPT-5|多模态推理|正式发布|今日发布/u.test(text)) {
    return text.length > 58 ? storySet.heroText : storySet.heroTitle;
  }
  if (/Gemini|DeepMind|原生多模态/u.test(text)) {
    return "Google DeepMind previews Gemini 2.0 with native multimodal interaction";
  }
  if (/Claude|Anthropic|宪法|推理深度/u.test(text)) {
    return "Anthropic expands reasoning depth and safety controls in Claude";
  }
  if (/Llama|Meta|开源/u.test(text)) {
    return "Open model releases intensify the debate over local and hosted AI";
  }
  if (/MLX|Apple|苹果|本地/u.test(text)) {
    return "Apple's MLX stack improves local inference on consumer devices";
  }
  if (/欧盟|法案|监管|透明度|安全要求/u.test(text)) {
    return "EU AI rules push high-risk systems toward stronger transparency";
  }
  if (/医疗|FDA|癌症|临床/u.test(text)) {
    return "Clinical AI tools move closer to everyday diagnostic workflows";
  }
  if (/量子|IBM|药物分子/u.test(text)) {
    return "Quantum-assisted AI research shows promise in molecular simulation";
  }
  if (/神经符号|MIT|逻辑/u.test(text)) {
    return "Neuro-symbolic research improves structured reasoning benchmarks";
  }
  if (/自动驾驶|L5/u.test(text)) {
    return "Autonomous driving approvals renew debate over safety validation";
  }
  if (/创业|融资|SaaS|商业/u.test(text)) {
    return "AI-native SaaS teams shift pricing from seats to delivered outcomes";
  }
  if (/中国|产业规模|落地/u.test(text)) {
    return "AI adoption broadens as enterprises move pilots into production";
  }
  if (/自监督|首席科学家/u.test(text)) {
    return "Researchers revisit self-supervised learning as a long-term path";
  }
  if (/Mistral|欧洲/u.test(text)) {
    return "European AI teams release stronger open models for regional adoption";
  }
  if (/团队|系统|模型|框架|能力|任务|基准/u.test(text)) {
    return storySet.stories[Math.abs(hash(text)) % storySet.stories.length].text;
  }
  return null;
}

function labelForText(text) {
  const trimmed = text.replace(/\s+/g, " ").trim();
  if (!trimmed) return trimmed;
  const direct = {
    "AI": "AI",
    "API": "API",
    "GPT-5": "GPT-5",
  };
  if (direct[trimmed]) return direct[trimmed];
  const story = storyForText(trimmed);
  if (story) return story;
  if (/^[\d\s.%+·kK:：/-]+$/.test(trimmed)) return trimmed.replace(/：/g, ":").replace(/·/g, "·");
  if (trimmed.length <= 12) {
    const labels = ["Daily Brief", "Models", "Applications", "Research", "Policy", "Trending", "New", "Live"];
    return labels[Math.abs(hash(trimmed)) % labels.length];
  }
  return storySet.stories[Math.abs(hash(trimmed)) % storySet.stories.length].title;
}

function hash(value) {
  let h = 0;
  for (const ch of value) h = (Math.imul(31, h) + ch.charCodeAt(0)) | 0;
  return h;
}

function localizeHtml(html, meta) {
  let output = html
    .replace(/<html lang="zh-CN">/g, '<html lang="en">')
    .replace(/<title>.*?<\/title>/s, `<title>AI Pulse - Version ${meta.version}: ${meta.name}</title>`);

  for (const [pattern, replacement] of commonReplacements) {
    output = output.replace(pattern, replacement);
  }

  output = output
    .replace(/PrivacyPolicy/g, "Privacy Policy")
    .replace(/\b1 hrs ago\b/g, "1 hr ago")
    .replace(/AI Daily Brief: Foundation Models Move From Demos To Daily Operations<span class="(cyan|red|accent)">AI Daily Brief: Foundation Models Move From Demos To Daily Operations<\/span>Trending/g, 'AI Daily Brief: <span class="$1">Daily Operations</span>')
    .replace(/AI Daily Brief: Foundation Models Move From Demos To Daily Operations<span class="sketch-underline">Models<\/span>/g, 'AI Daily Brief <span class="sketch-underline">Models</span>')
    .replace(/Daily Brief<span class="highlight">New<\/span>AI-native SaaS pricing shifts from seats to outcomes<span class="highlight">Policy<\/span>Models/g, 'Daily Brief <span class="highlight">New</span> Models, products, and policy updates <span class="highlight">Policy</span>')
    .replace(/(\d+)\s*min ago/g, "$1 min ago")
    .replace(/(\d+)\s*hrs ago/g, "$1 hrs ago")
    .replace(/(\d+(?:\.\d+)?k)\s*reads/g, "$1 reads")
    .replace(/(\d+(?:\.\d+)?k)\s*discussions/g, "$1 discussions")
    .replace(/关于 · 投稿 · API · 隐私/g, "About · Submit · API · Privacy");

  output = output.replace(/>([^<>]*[\u4e00-\u9fff][^<>]*)</gu, (_match, text) => {
    const localized = labelForText(text);
    return `>${localized}<`;
  });

  output = output.replace(/placeholder="([^"]*[\u4e00-\u9fff][^"]*)"/gu, (_match, text) => {
    return `placeholder="${labelForText(text)}"`;
  });

  return output;
}

function extractTokens(html) {
  const root = html.match(/:root\s*\{([\s\S]*?)\}/);
  if (!root) return [];
  return root[1]
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("--") && line.includes(":"))
    .map((line) => line.replace(/;$/, ""))
    .slice(0, 18);
}

function componentGuidance(meta) {
  const specific = {
    P: [
      ["Navigation", "Use rounded app navigation, tonal rails, segmented controls, and large touch-friendly actions."],
      ["Buttons", "Prefer pill buttons and floating primary actions with Material-like state layers."],
      ["Surfaces", "Use large rounded tonal cards instead of thin enterprise panels."],
      ["Inputs", "Use filled or outlined inputs with visible focus and generous vertical rhythm."],
      ["Tables", "Avoid table-first composition unless the product explicitly needs dense admin work."],
      ["Empty states", "Use tonal illustration blocks and clear next actions."],
    ],
    Q: [
      ["Navigation", "Use command bars, split panes, search boxes, and productivity-app grouping."],
      ["Buttons", "Keep controls compact with squared rounded corners and familiar desktop-app spacing."],
      ["Cards", "Use glassy or translucent panes only where they support hierarchy."],
      ["Tags", "Use subtle status text rather than saturated badges."],
      ["Inputs", "Make search and command input first-class surfaces."],
      ["Tables", "Pair lists with reading panes or activity panes."],
    ],
    R: [
      ["Navigation", "Use dark utility bars, tabs, and square enterprise navigation."],
      ["Buttons", "Use hard rectangular actions with clear hierarchy."],
      ["Cards", "Prefer flat panels, data grids, diagnostics, and dense rows over soft cards."],
      ["Tags", "Use restrained operational labels with strong contrast."],
      ["Inputs", "Keep filters compact and aligned to grid columns."],
      ["Tables", "Make tables, row states, and diagnostic side panels the core pattern."],
    ],
    S: [
      ["Navigation", "Use merchant saved views, resource-list navigation, and bulk action bars."],
      ["Buttons", "Use green primary actions for commerce operations and subdued secondary actions."],
      ["Cards", "Use order/resource rows more often than generic marketing cards."],
      ["Tags", "Use fulfillment, inventory, payment, and risk statuses."],
      ["Inputs", "Prioritize filters, saved views, and search within resource lists."],
      ["Tables", "Combine resource lists with order drawers and bulk operations."],
    ],
    T: [
      ["Navigation", "Use workbench navigation, boards, issue grouping, and project context."],
      ["Buttons", "Keep actions practical and compact."],
      ["Cards", "Use task cards inside columns, not generic content cards."],
      ["Tags", "Use lozenge tags for status, priority, sprint, and ownership."],
      ["Inputs", "Support quick filtering by owner, project, sprint, and state."],
      ["Tables", "Prefer boards and issue lists; tables should feel secondary."],
    ],
    U: [
      ["Navigation", "Use direct service navigation with plain links and strong focus states."],
      ["Buttons", "Use high-contrast rectangular start and submit actions."],
      ["Cards", "Avoid decorative cards; prefer forms, warnings, and task sections."],
      ["Tags", "Use official status text and warning panels rather than decorative badges."],
      ["Inputs", "Labels, help text, validation, and focus visibility are mandatory."],
      ["Tables", "Use plain, accessible tables with strong borders when data is required."],
    ],
    V: [
      ["Navigation", "Use tool rails, property panels, media grids, and creative workspace framing."],
      ["Buttons", "Keep actions compact and tool-like."],
      ["Cards", "Use asset tiles and preview canvases instead of business cards."],
      ["Tags", "Use metadata chips for file type, state, and export status."],
      ["Inputs", "Use property fields, sliders, and panel controls."],
      ["Tables", "Prefer asset grids; use tables only for metadata-heavy asset management."],
    ],
    W: [
      ["Navigation", "Use record headers, object icons, paths, related lists, and activity timelines."],
      ["Buttons", "Keep CRM actions compact and record-scoped."],
      ["Cards", "Use business record panels and related-list cards."],
      ["Tags", "Use stage, account, task, and case status labels."],
      ["Inputs", "Support inline fields and record-detail editing."],
      ["Tables", "Use related lists and compact record tables."],
    ],
    X: [
      ["Navigation", "Use repo tabs, file trees, issue navigation, and code-oriented sections."],
      ["Buttons", "Use restrained actions with developer-platform clarity."],
      ["Cards", "Use code panels, file lists, issue cards, and contribution surfaces."],
      ["Tags", "Use issue labels, language dots, and monospace metadata."],
      ["Inputs", "Search should support repos, files, issues, and commands."],
      ["Tables", "Use file lists, diffs, issue tables, and audit logs."],
    ],
    Y: [
      ["Navigation", "Use admin shells, query forms, table toolbars, drawers, and management sections."],
      ["Buttons", "Use blue primary actions, neutral secondary actions, and clear disabled states."],
      ["Cards", "Keep cards neutral; the table and form controls should carry the workflow."],
      ["Tags", "Use stable status tags with restrained color."],
      ["Inputs", "Use search, select, date, and owner filters in query forms."],
      ["Tables", "Make data tables, row actions, pagination, and drawers central."],
    ],
  };

  const rows = specific[meta.version] || [
    ["Navigation", "Match the preview's surface, border, and active-state treatment."],
    ["Buttons", "Use the accent color and radius rules from the style."],
    ["Cards", "Preserve the style's depth model: shadow, border, glass, glow, or flat grid."],
    ["Tags", "Use compact metadata styling with clear category contrast."],
    ["Inputs", "Keep focus states visible and aligned with the accent system."],
    ["Tables", "For dense products, prefer clear borders, row states, and restrained typography."],
    ["Empty states", "Reuse the style's icon tone, surface treatment, and text density."],
  ];

  return rows.map(([component, guidance]) => `| ${component} | ${guidance} |`).join("\n");
}

function designSystemMarkdown(meta, html) {
  const tokens = extractTokens(html);
  const tokenRows = tokens.length
    ? tokens.map((token) => {
        const [name, value] = token.split(/:\s*/);
        return `| \`${name}\` | \`${value || ""}\` |`;
      }).join("\n")
    : "| Token | Value |\n|---|---|";

  return `# Version ${meta.version} - ${meta.name} Design System

> This file documents a visual style prompt, not a fixed page layout. The sample HTML is only a preview carrier for comparing the 25 styles with a shared AI Daily Brief content set.

## 1. Style Definition And Core Mood

${meta.name} is a ${meta.mode.toLowerCase()} web UI direction for ${meta.bestFor}. Its visual personality is ${meta.personality}. Reuse its visual language while designing the actual product structure around user goals, content priority, and workflow requirements.

## 2. Color System

| Token | Value |
|---|---|
${tokenRows}

Use the background, surface, text, accent, border, and state tokens as the starting point for product theme variables. Keep semantic roles stable even when adapting the palette.

## 3. Typography System

- Choose the font stack used by the HTML preview as the primary reference.
- Keep headings compact and high-confidence.
- Keep body copy readable at normal dashboard and editorial densities.
- Use label text for metadata, tags, timestamps, and status indicators.

## 4. Borders, Radius, Shadows, And Glow

The style language is: ${meta.language}. Preserve the depth model that defines the style. If the style uses square borders, avoid soft cards. If it uses glow or glass, keep contrast and focus visibility intact.

## 5. Decorative Elements And Interaction Details

Decorative details should reinforce the style rather than become layout requirements. Hover, selected, focus, disabled, and loading states should use the same accent and surface treatment as the base components.

## 6. Visual Rhythm And Spacing Hints

Use the preview as a density reference only. Do not copy its information architecture, module order, grid strategy, or navigation model. Rebuild spacing around the actual user task.

## 7. Responsive Strategy

- Preserve the style's visual hierarchy across desktop and mobile.
- Collapse dense grids into single-column or two-column structures when needed.
- Keep touch targets accessible.
- Avoid text overlap and preserve readable line lengths.

## 8. Component Quick Reference

| Component | Guidance |
|---|---|
${componentGuidance(meta)}

## 9. CSS Variables And Code Snippets

Start by translating the extracted tokens into project-level theme variables:

\`\`\`css
:root {
${tokens.map((token) => `  ${token};`).join("\n")}
}
\`\`\`

Then map those variables onto real product components instead of copying the sample sections.

## 10. Suitable And Unsuitable Use Cases

Best suited for ${meta.bestFor}. Avoid using this style when the brand, audience, or product density conflicts with its personality: ${meta.personality}.

## 11. Comparison With Other Styles

Compared with the rest of the library, ${meta.name} is defined by ${meta.language}. It should feel different from generic neutral dashboards while still remaining usable in production.

## 12. Variant Suggestions

- A restrained variant with fewer decorative effects.
- A high-density variant for operational dashboards.
- A landing-page variant with stronger hero imagery.
- A dark or light companion theme when the product requires both modes.

## 13. Motion And Micro-Interactions

Use short, functional motion. Hover transitions should confirm interactivity. Loading and alert states should remain readable. Avoid decorative motion that competes with the primary content.

## 14. Implementation Guidelines

1. Reuse the visual language, not the sample layout.
2. Start with tokens for background, surface, text, muted text, accent, border, radius, shadow, and focus.
3. Apply tokens to real product components.
4. Preserve accessibility, contrast, and visible focus.
5. Keep the AI Daily Brief sample content out of production code unless the user explicitly asks for demo content.
`;
}

function findStyleDirs() {
  return fs.readdirSync(stylesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^version-[a-z]+-/.test(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, "en"));
}

function metaForDir(dir) {
  const version = dir.match(/^version-([a-z]+)-/)?.[1]?.toUpperCase();
  const meta = styleMeta.find((item) => item.version === version);
  if (!meta) throw new Error(`No metadata for ${dir}`);
  return meta;
}

function localizeStyles() {
  for (const dir of findStyleDirs()) {
    const meta = metaForDir(dir);
    const styleDir = path.join(stylesDir, dir);
    const htmlFile = path.join(styleDir, `${dir}.html`);
    const html = fs.readFileSync(htmlFile, "utf8");
    const localizedHtml = localizeHtml(html, meta);
    fs.writeFileSync(htmlFile, localizedHtml);
  }
}

function syncSkillAssets() {
  fs.mkdirSync(skillReferenceStylesDir, { recursive: true });
  for (const file of fs.readdirSync(skillReferenceStylesDir)) {
    if (file.endsWith(".md")) fs.rmSync(path.join(skillReferenceStylesDir, file));
  }

  for (const dir of findStyleDirs()) {
    const meta = metaForDir(dir);
    const htmlFile = path.join(stylesDir, dir, `${dir}.html`);
    const staleAssetMd = path.join(stylesDir, dir, `${dir}-design-system.md`);
    const targetMd = path.join(skillReferenceStylesDir, `${dir}-design-system.md`);
    const html = fs.readFileSync(htmlFile, "utf8");
    fs.writeFileSync(targetMd, designSystemMarkdown(meta, html));
    fs.rmSync(staleAssetMd, { force: true });
  }
}

function main() {
  const syncOnly = process.argv.includes("--sync-only");
  if (!syncOnly) localizeStyles();
  syncSkillAssets();
  console.log(syncOnly ? "Synced skill assets." : "Localized styles and synced skill assets.");
}

main();
