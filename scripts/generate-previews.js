#!/usr/bin/env node

const { spawn } = require("node:child_process");
const crypto = require("node:crypto");
const fs = require("node:fs");
const net = require("node:net");
const os = require("node:os");
const path = require("node:path");
const { assertPngHasVisibleContent } = require("./png-quality");

const rootDir = path.resolve(__dirname, "..");
const skillDir = path.join(rootDir, "skills", "awesome-page-design");
const stylesDir = path.join(skillDir, "assets", "styles");
const outputDir = path.join(skillDir, "assets", "previews");
const referencesDir = path.join(skillDir, "references");
const styleRefsDir = path.join(referencesDir, "styles");
const chromePath =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const viewportWidth = Number(process.env.PREVIEW_WIDTH || 1440);
const viewportHeight = Number(process.env.PREVIEW_HEIGHT || 1200);
const mobileViewportWidth = Number(process.env.PREVIEW_MOBILE_WIDTH || 390);
const mobileViewportHeight = Number(process.env.PREVIEW_MOBILE_HEIGHT || 844);
const generateMobileScreenshots = process.env.PREVIEW_MOBILE !== "0";
const chromeWait = Number(process.env.PREVIEW_WAIT || 5000);

const styles = [
  {
    id: "09",
    slug: "style-09-tech-minimal",
    name: "Tech Minimal",
    zhName: "科技极简风",
    brief: "Large whitespace, few colors, one visual focus, modern sans-serif type, and a quiet interface.",
    zhBrief: "大面积空白、少色、单一视觉焦点、现代非衬线字体、界面极简。",
    bestFor: "AI tools, developer products, focused SaaS landing pages",
    zhBestFor: "AI 工具、开发者产品、聚焦型 SaaS 落地页",
    bg: "#f8fafc",
    surface: "#ffffff",
    text: "#0f172a",
    muted: "#64748b",
    primary: "#111827",
    accent: "#2563eb",
    border: "#e2e8f0",
    radius: "8px",
    shadow: "0 20px 60px rgba(15, 23, 42, .08)",
    className: "tech-minimal",
    image: "",
    notes: ["Use one strong hero object or product surface.", "Keep secondary UI quiet and highly aligned.", "Prefer black, white, slate, and one measured blue accent."],
  },
  {
    id: "10",
    slug: "style-10-dark-theme",
    name: "Dark Theme",
    zhName: "深色主题",
    brief: "Dark background, high contrast, and one bright monochrome accent for primary actions and the main visual.",
    zhBrief: "暗背景、高对比度，并用单色亮色强化主按钮和主视觉。",
    bestFor: "AI media tools, creative generators, premium launch pages",
    zhBestFor: "AI 媒体工具、生成式创作产品、高级发布页",
    bg: "#050505",
    surface: "#111113",
    text: "#f8fafc",
    muted: "#a1a1aa",
    primary: "#ffffff",
    accent: "#7dd3fc",
    border: "#27272a",
    radius: "8px",
    shadow: "0 24px 90px rgba(125, 211, 252, .14)",
    className: "dark-theme",
    image: "",
    notes: ["Reserve the bright accent for conversion and focus.", "Use deep blacks with subtle panel separation.", "Keep imagery cinematic but readable."],
  },
  {
    id: "11",
    slug: "style-11-structured-lines",
    name: "Structured Lines",
    zhName: "结构线",
    brief: "Fine line frames, structured rhythm, professional seriousness, and clear information hierarchy.",
    zhBrief: "细线框、结构化、专业严肃、信息层级清晰。",
    bestFor: "AI platforms, workflow products, B2B product sites",
    zhBestFor: "AI 平台、工作流产品、B2B 产品站",
    bg: "#fbfcfe",
    surface: "#ffffff",
    text: "#111827",
    muted: "#6b7280",
    primary: "#1d4ed8",
    accent: "#22c55e",
    border: "#d7dde8",
    radius: "4px",
    shadow: "0 18px 45px rgba(15, 23, 42, .07)",
    className: "structured-lines",
    image: "",
    notes: ["Let borders organize information before shadows do.", "Use diagrams, rails, and labeled groups.", "Keep the tone factual and composed."],
  },
  {
    id: "12",
    slug: "style-12-layered-material",
    name: "Layered Material",
    zhName: "层级材质",
    brief: "Clear elevation, large tonal cards, generous radius, and orderly touch-friendly surfaces.",
    zhBrief: "层次分明、大色块卡片、大圆角、有秩序且适合触控的表面。",
    bestFor: "consumer tools, utility apps, product dashboards",
    zhBestFor: "消费者工具、实用型应用、产品仪表盘",
    bg: "#f7f2fa",
    surface: "#ffffff",
    text: "#1d1b20",
    muted: "#625b71",
    primary: "#6750a4",
    accent: "#eaddff",
    border: "#e7e0ec",
    radius: "22px",
    shadow: "0 18px 50px rgba(103, 80, 164, .16)",
    className: "layered-material",
    image: "",
    notes: ["Use large touch-friendly controls.", "Separate hierarchy with tonal surfaces.", "Keep motion and states calm and systematic."],
  },
  {
    id: "13",
    slug: "style-13-bento-layout",
    name: "Bento Layout",
    zhName: "便当盒布局",
    brief: "Widget-like card zones, modular composition, and clearly chunked information.",
    zhBrief: "小组件式卡片分区、模块化排布、信息清晰分块。",
    bestFor: "creator profiles, product overviews, feature collections",
    zhBestFor: "创作者主页、产品总览、功能集合页",
    bg: "#f4f4f5",
    surface: "#ffffff",
    text: "#18181b",
    muted: "#71717a",
    primary: "#18181b",
    accent: "#f97316",
    border: "#e4e4e7",
    radius: "18px",
    shadow: "0 18px 55px rgba(24, 24, 27, .10)",
    className: "bento-layout",
    image: "",
    notes: ["Use varied card sizes with one consistent grid.", "Each block should have a clear job.", "Avoid turning every block into identical cards."],
  },
  {
    id: "14",
    slug: "style-14-neumorphism",
    name: "Neumorphism",
    zhName: "新拟态",
    brief: "Soft light, inset depth, rounded controls, and gentle shadows with tactile surfaces.",
    zhBrief: "柔光、内凹层次感圆角、柔和阴影和触感表面。",
    bestFor: "audio tools, calm utilities, wellness and focus products",
    zhBestFor: "音频工具、安静工具、健康与专注类产品",
    bg: "#e9eef5",
    surface: "#e9eef5",
    text: "#172033",
    muted: "#667085",
    primary: "#243b6b",
    accent: "#6aa6ff",
    border: "#f8fbff",
    radius: "30px",
    shadow: "14px 14px 34px rgba(148, 163, 184, .42), -14px -14px 34px rgba(255,255,255,.86)",
    className: "neumorphism",
    image: "",
    notes: ["Keep contrast high enough despite the soft surface.", "Use inset states for pressed controls.", "Limit the style to focused, calm interfaces."],
  },
  {
    id: "15",
    slug: "style-15-liquid-glass",
    name: "Liquid Glass",
    zhName: "液态玻璃",
    brief: "Frosted glass, transparent layering, blurred materials, and a futuristic technology mood.",
    zhBrief: "毛玻璃、透明层次、磨砂质感、科技感和未来感。",
    bestFor: "immersive AI, spatial dashboards, premium futuristic tools",
    zhBestFor: "沉浸式 AI、空间化仪表盘、高级未来感工具",
    bg: "#07111f",
    surface: "rgba(255,255,255,.13)",
    text: "#f8fbff",
    muted: "#b9c5d6",
    primary: "#dff7ff",
    accent: "#8b5cf6",
    border: "rgba(255,255,255,.26)",
    radius: "24px",
    shadow: "0 28px 90px rgba(15, 23, 42, .45)",
    className: "liquid-glass",
    image: "",
    notes: ["Layer translucent panels over vivid but softened media.", "Use blur, tint, and borders to keep text readable.", "Avoid low-contrast glass over busy images."],
  },
  {
    id: "16",
    slug: "style-16-retro-computing",
    name: "Retro Computing",
    zhName: "复古主义",
    brief: "Pixel mood, old operating-system texture, 80s computing cues, chunky windows, and bitmap type.",
    zhBrief: "像素风、复古 UI、老式操作系统质感、80 年代计算机线索、块状窗口和像素字体。",
    bestFor: "music sites, game-adjacent products, cultural campaigns",
    zhBestFor: "音乐网站、游戏相关产品、文化活动页",
    bg: "#f8df7a",
    surface: "#fff8c9",
    text: "#1f1300",
    muted: "#6f4b1d",
    primary: "#0057ff",
    accent: "#ff3bcb",
    border: "#1f1300",
    radius: "2px",
    shadow: "8px 8px 0 #1f1300",
    className: "retro-computing",
    image: "",
    notes: ["Use hard windows, pixel dividers, and playful system chrome.", "Keep nostalgia intentional, not broken.", "Use bright accents with crisp black lines."],
  },
  {
    id: "17",
    slug: "style-17-neo-brutalism",
    name: "Neo-Brutalism",
    zhName: "新粗野主义",
    brief: "Thick lines, strong color clashes, unpolished giant type, and controlled chaos.",
    zhBrief: "粗线条、强烈撞色、无修饰巨型字体，混乱但有张力。",
    bestFor: "developer launches, bold campaigns, playful product sites",
    zhBestFor: "开发者发布页、强品牌活动、趣味产品站",
    bg: "#00e5ff",
    surface: "#fff15c",
    text: "#111111",
    muted: "#24111f",
    primary: "#111111",
    accent: "#ff2bd6",
    border: "#111111",
    radius: "0",
    shadow: "10px 10px 0 #ff2bd6",
    className: "neo-brutalism",
    image: "",
    notes: ["Make the hierarchy loud and unmistakable.", "Use strong geometry and intentionally hard shadows.", "Preserve usability under the visual tension."],
  },
  {
    id: "18",
    slug: "style-18-precision-futurism",
    name: "Precision Futurism",
    zhName: "精密未来风",
    brief: "Dark background, glowing borders, futuristic technology polish, and sci-fi UI precision.",
    zhBrief: "深色背景、发光边框、未来科技感和科幻 UI 精度。",
    bestFor: "issue trackers, AI operations tools, technical SaaS",
    zhBestFor: "Issue 工具、AI 运营工具、技术型 SaaS",
    bg: "#08090d",
    surface: "#101117",
    text: "#f4f4f5",
    muted: "#a1a1aa",
    primary: "#f4f4f5",
    accent: "#8b5cf6",
    border: "#27272f",
    radius: "6px",
    shadow: "0 0 0 1px rgba(139, 92, 246, .22), 0 24px 80px rgba(139, 92, 246, .18)",
    className: "precision-futurism",
    image: "",
    notes: ["Keep the surface quiet and precise.", "Use glow as a state signal, not decoration everywhere.", "Favor clean lists, compact cards, and command-like actions."],
  },
  {
    id: "19",
    slug: "style-19-gradient-pop",
    name: "Gradient Pop",
    zhName: "渐变风",
    brief: "Bright gradients, tech or trend energy, and an immediately eye-catching first viewport.",
    zhBrief: "亮色渐变、科技或潮流气质，首屏视觉抓眼。",
    bestFor: "AI builders, launch pages, creator tools",
    zhBestFor: "AI 构建工具、发布页、创作者工具",
    bg: "#fff7ed",
    surface: "#ffffff",
    text: "#24111f",
    muted: "#7c3aed",
    primary: "#db2777",
    accent: "#06b6d4",
    border: "#f3d4ff",
    radius: "14px",
    shadow: "0 24px 70px rgba(219, 39, 119, .20)",
    className: "gradient-pop",
    image: "",
    notes: ["Use a gradient hero with calmer supporting surfaces.", "Let color communicate energy and momentum.", "Prevent gradients from overpowering text."],
  },
  {
    id: "20",
    slug: "style-20-soft-pop",
    name: "Soft Pop",
    zhName: "柔和流行",
    brief: "Friendly playful color, doodle or cartoon illustration, rounded expressive type, and elastic shapes.",
    zhBrief: "亲和力和玩乐色彩、手绘涂鸦/卡通插画、圆润夸张字体和带弹性的造型。",
    bestFor: "consumer apps, writing tools, education, creative productivity",
    zhBestFor: "消费者应用、写作工具、教育、创意生产力",
    bg: "#fff8f1",
    surface: "#ffffff",
    text: "#2b1d16",
    muted: "#8f5f4a",
    primary: "#ff6b6b",
    accent: "#ffd166",
    border: "#f5d7c6",
    radius: "28px",
    shadow: "0 18px 55px rgba(255, 107, 107, .18)",
    className: "soft-pop",
    image: "",
    notes: ["Round the typography and interaction shapes.", "Pair friendly copy with lively but readable components.", "Use illustration sparingly as a human signal."],
  },
  {
    id: "21",
    slug: "style-21-acid-design",
    name: "Acid Design",
    zhName: "酸性设计",
    brief: "Metal sheen, liquid chrome type, distorted composition, laser light, dark sci-fi, and psychedelic tension.",
    zhBrief: "金属光泽、液态金属字体、铬材质、扭曲排版、镭射光、暗黑科幻和致幻感。",
    bestFor: "experimental portfolios, music/fashion drops, immersive campaigns",
    zhBestFor: "实验作品集、音乐/时尚发布、沉浸式活动页",
    bg: "#050108",
    surface: "#130818",
    text: "#f8f0ff",
    muted: "#c4b5fd",
    primary: "#e5e7eb",
    accent: "#d6ff00",
    border: "#7c3aed",
    radius: "8px",
    shadow: "0 24px 90px rgba(214, 255, 0, .16)",
    className: "acid-design",
    image: "",
    notes: ["Use distortion and chrome as brand moments, not body text.", "Keep enough stable UI for orientation.", "Let neon accents cut through a dark surreal base."],
  },
];

const coreStyles = [
  {
    id: "01",
    slug: "style-01-card-grid",
    name: "Card Grid",
    zhName: "卡片网格",
    brief: "Light neutral canvas, violet accent, card grid rhythm, statistics, search, and scannable overview surfaces.",
    zhBrief: "浅色中性画布、紫色强调、卡片网格节奏、统计数据、搜索和易扫描的总览界面。",
    bestFor: "dashboards, catalogs, overview pages",
    zhBestFor: "仪表盘、目录页、概览页",
    bg: "#f5f6fa",
    surface: "#ffffff",
    text: "#1a1a2e",
    muted: "#64648a",
    primary: "#7c3aed",
    accent: "#8b5cf6",
    border: "#e5e7ef",
    radius: "10px",
    shadow: "0 18px 48px rgba(26, 26, 46, .10)",
    className: "card-grid",
    image: "",
    notes: ["Keep cards scannable and varied by job.", "Use search and stats as first-class visual anchors.", "Avoid collapsing the style into a generic admin shell."],
  },
  {
    id: "02",
    slug: "style-02-block-brutalism",
    name: "Block Brutalism",
    zhName: "块状粗野主义",
    brief: "Warm yellow canvas, hard black borders, blocky controls, saturated labels, and strong campaign energy.",
    zhBrief: "暖黄画布、硬黑边框、块状控件、高饱和标签和强活动感。",
    bestFor: "bold campaigns, indie products, playful utilities",
    zhBestFor: "强品牌活动、独立产品、趣味工具",
    bg: "#fff04d",
    surface: "#fffbea",
    text: "#111111",
    muted: "#3f3f46",
    primary: "#111111",
    accent: "#ff3d00",
    border: "#111111",
    radius: "0",
    shadow: "10px 10px 0 #111111",
    className: "block-brutalism",
    image: "",
    notes: ["Use loud hierarchy and hard geometry.", "Let tension come from shape and contrast, not randomness.", "Keep forms and actions obvious."],
  },
  {
    id: "03",
    slug: "style-03-aurora-gradient",
    name: "Aurora Gradient",
    zhName: "极光渐变",
    brief: "Dark canvas, aurora color fields, soft glow, drifting gradient energy, and premium AI atmosphere.",
    zhBrief: "暗色画布、极光色场、柔光、漂移渐变能量和高级 AI 氛围。",
    bestFor: "futuristic products, AI tools, premium dark experiences",
    zhBestFor: "未来感产品、AI 工具、高级暗色体验",
    bg: "#060a1f",
    surface: "rgba(255,255,255,.08)",
    text: "#f8fbff",
    muted: "#b8c2d8",
    primary: "#f8fbff",
    accent: "#22d3ee",
    border: "rgba(255,255,255,.18)",
    radius: "14px",
    shadow: "0 28px 90px rgba(34, 211, 238, .18)",
    className: "aurora-gradient",
    image: "",
    notes: ["Use glow as atmosphere around important content.", "Keep text panels calm and readable.", "Avoid turning every surface into a rainbow gradient."],
  },
  {
    id: "04",
    slug: "style-04-retro-y2k",
    name: "Retro Y2K",
    zhName: "复古 Y2K",
    brief: "Candy gradients, neon details, retro display type, sparkle energy, and early-2000s digital optimism.",
    zhBrief: "糖果渐变、霓虹细节、复古标题字、星光能量和千禧年数字乐观感。",
    bestFor: "music, fashion, youth culture, playful campaigns",
    zhBestFor: "音乐、潮流、青年文化、活动页",
    bg: "#fff0fb",
    surface: "#ffffff",
    text: "#26113d",
    muted: "#7c3aed",
    primary: "#ff2db2",
    accent: "#00d9ff",
    border: "#ffb6ef",
    radius: "16px",
    shadow: "0 22px 70px rgba(255, 45, 178, .24)",
    className: "retro-y2k",
    image: "",
    notes: ["Use playful shine and neon in controlled zones.", "Pair expressive display type with readable body copy.", "Keep nostalgia bright, not cluttered."],
  },
  {
    id: "05",
    slug: "style-05-swiss-editorial",
    name: "Swiss Editorial",
    zhName: "瑞士编辑风",
    brief: "Tight editorial grid, red-black typographic hierarchy, rule lines, minimal gutters, and disciplined content rhythm.",
    zhBrief: "紧凑编辑网格、红黑字体层级、细分割线、极小页边距和克制内容节奏。",
    bestFor: "portfolios, cultural sites, design studios, serious content",
    zhBestFor: "作品集、文化机构、设计工作室、严肃内容",
    bg: "#f7f5ef",
    surface: "#fffdf8",
    text: "#111111",
    muted: "#525252",
    primary: "#e11d2e",
    accent: "#111111",
    border: "#111111",
    radius: "0",
    shadow: "none",
    className: "swiss-editorial",
    image: "",
    notes: ["Let typography and rules create the visual system.", "Use red sparingly for hierarchy and urgency.", "Avoid soft SaaS cards."],
  },
  {
    id: "06",
    slug: "style-06-terminal-hacker",
    name: "Terminal Hacker",
    zhName: "黑客终端",
    brief: "Black canvas, terminal green, monospace, CRT scanlines, command-line details, and developer credibility.",
    zhBrief: "黑色画布、终端绿、等宽字体、CRT 扫描线、命令行细节和开发者可信感。",
    bestFor: "developer tools, CLI products, security, open source",
    zhBestFor: "开发者工具、CLI、安全、开源",
    bg: "#020403",
    surface: "#07130d",
    text: "#d1fae5",
    muted: "#7ddf9e",
    primary: "#00ff88",
    accent: "#33ffcc",
    border: "#14532d",
    radius: "2px",
    shadow: "0 0 36px rgba(0, 255, 136, .16)",
    className: "terminal-hacker",
    image: "",
    notes: ["Use monospace rhythm and command metaphors.", "Keep scanline or terminal texture subtle.", "Make focus and error states unmistakable."],
  },
  {
    id: "07",
    slug: "style-07-cutealism",
    name: "Cute-alism",
    zhName: "可爱主义",
    brief: "Neon yellow, pink hard shadows, sticker-like objects, rounded bold shapes, and soft-hard contrast.",
    zhBrief: "荧光黄、粉色硬阴影、贴纸感对象、圆润粗形和软硬碰撞。",
    bestFor: "playful brands, creator tools, youth products",
    zhBestFor: "玩法品牌、创作者工具、年轻产品",
    bg: "#f7ff45",
    surface: "#fffef2",
    text: "#18181b",
    muted: "#5b21b6",
    primary: "#ff4db8",
    accent: "#6dff8f",
    border: "#18181b",
    radius: "26px",
    shadow: "8px 8px 0 #ff4db8",
    className: "cutealism",
    image: "",
    notes: ["Use sticker energy without losing hierarchy.", "Keep controls chunky and friendly.", "Balance playful color with readable content."],
  },
  {
    id: "08",
    slug: "style-08-resonant-stark",
    name: "Resonant Stark",
    zhName: "共鸣极简",
    brief: "Near-black canvas, thin type, subtle glow, extreme whitespace, delicate lines, and premium restraint.",
    zhBrief: "近黑画布、细字重、微光、大留白、精细线条和高级克制感。",
    bestFor: "premium dark portfolios, art, high-end product teasers",
    zhBestFor: "高级暗色作品集、艺术、精品预告页",
    bg: "#0a0a0b",
    surface: "#141416",
    text: "#fafafa",
    muted: "#8a8a8e",
    primary: "#c8b8ff",
    accent: "#ffb8c8",
    border: "rgba(255,255,255,.08)",
    radius: "6px",
    shadow: "0 28px 100px rgba(200, 184, 255, .12)",
    className: "resonant-stark",
    image: "",
    notes: ["Use quiet space as the main visual move.", "Keep glow delicate and premium.", "Let content breathe instead of filling every gap."],
  },
];

const allStyles = [...coreStyles, ...styles];

const scenarios = {
  "01": {
    brand: "OpsGrid",
    nav: ["Routes", "Inventory", "Alerts"],
    eyebrow: "Inventory command center",
    headline: "Spot late handoffs before the morning standup.",
    lede: "A dense overview for regional teams tracking stock, routes, exceptions, and owner follow-up in one scannable workspace.",
    primaryAction: "Review exceptions",
    secondaryAction: "Open route map",
    mediaLabel: "Operational dashboard mockup",
    scene: "dashboard",
    metrics: [
      ["42", "open handoffs"],
      ["8.7h", "avg recovery"],
      ["96%", "route coverage"],
    ],
    features: [
      ["Exception lanes", "Separate inventory, delivery, and approval issues so operators know where to act first."],
      ["Owner clarity", "Every card carries owner, priority, due window, and the next required action."],
      ["Dense scanning", "Stats, search, filters, and compact cards work together without becoming a flat grid."],
    ],
    tabs: {
      launch: ["Morning triage", "Filter unresolved handoffs, confirm owner coverage, and move risky items into the action lane."],
      metrics: ["Recovery trend", "Compare late routes, stock gaps, aging exceptions, and daily recovery time before planning the next dispatch."],
      assets: ["Evidence stack", "Attach product photos, route notes, and approval logs only where they speed up decisions."],
    },
    queue: [
      ["Backroom count drift", "High"],
      ["West route delayed", "2 stops"],
      ["Cold storage check", "Ready"],
    ],
  },
  "02": {
    brand: "BlockParty",
    nav: ["Drops", "Tickets", "Rules"],
    eyebrow: "Street launch builder",
    headline: "Make the launch impossible to ignore.",
    lede: "A loud campaign workspace for bold releases, urgent signups, waitlists, and punchy product announcements.",
    primaryAction: "Publish drop",
    secondaryAction: "Edit rules",
    mediaLabel: "Campaign poster mockup",
    scene: "poster",
    metrics: [
      ["14K", "waitlist"],
      ["03", "live drops"],
      ["91%", "claim rate"],
    ],
    features: [
      ["Hard hierarchy", "Black borders, block labels, and oversized type make the core action unmistakable."],
      ["Campaign pressure", "Timers, scarcity notes, and status slabs create energy without hiding the rules."],
      ["Readable chaos", "The grid feels loud, but actions and requirements stay obvious."],
    ],
    tabs: {
      launch: ["Drop control", "Lock the headline, ticket rules, and urgency modules before the campaign goes live."],
      metrics: ["Claim pressure", "Track waitlist growth, claim rate, failed attempts, and referral lift during the launch window."],
      assets: ["Poster kit", "Reuse stickers, stamps, product blocks, and oversized labels across the campaign."],
    },
    queue: [
      ["Prize rules approved", "Done"],
      ["Hero slab contrast", "Check"],
      ["Referral badge", "Live"],
    ],
  },
  "03": {
    brand: "AuroraLab",
    nav: ["Runs", "Models", "Review"],
    eyebrow: "Research evaluation suite",
    headline: "Turn messy experiment output into calm decisions.",
    lede: "A premium dark workspace for comparing prompts, judging model runs, and separating promising signals from noisy experiments.",
    primaryAction: "Compare runs",
    secondaryAction: "Open review",
    mediaLabel: "Experiment comparison surface",
    scene: "aurora",
    metrics: [
      ["128", "runs scored"],
      ["17", "flagged deltas"],
      ["4.9", "median rank"],
    ],
    features: [
      ["Soft signal", "Aurora glow frames the product surface without washing out the data."],
      ["Readable panels", "Translucent cards stay calm enough for long-form review and scoring."],
      ["Decision trail", "Run history, notes, and reviewer states remain visible in the same mood."],
    ],
    tabs: {
      launch: ["Run comparison", "Group outputs by task, surface score deltas, and keep reviewer notes close to the evidence."],
      metrics: ["Signal health", "Track confidence, disagreement, regression risk, and time to final decision."],
      assets: ["Evaluation assets", "Keep screenshots, transcripts, and prompt variants organized without making the page feel busy."],
    },
    queue: [
      ["Regression in task 42", "Review"],
      ["Prompt batch C", "Scored"],
      ["Judge notes", "3 new"],
    ],
  },
  "04": {
    brand: "PulseRoom",
    nav: ["Lineup", "Drops", "Gallery"],
    eyebrow: "Culture drop page",
    headline: "Stage the drop, preview tracks, and collect reminders.",
    lede: "A playable release deck for cover crops, countdowns, track snippets, reminder signups, and launch-day status.",
    primaryAction: "Join the list",
    secondaryAction: "See lineup",
    mediaLabel: "Neon release board",
    scene: "sparkle",
    metrics: [
      ["7PM", "release time"],
      ["24", "tracks queued"],
      ["5K", "early saves"],
    ],
    features: [
      ["Glossy emphasis", "Shine, neon outlines, and bubbly forms carry the mood while keeping copy legible."],
      ["Hype modules", "Track cards, countdowns, artist notes, and badges feel like part of one event."],
      ["Controlled sparkle", "Decorative energy stays around the primary objects instead of covering the interface."],
    ],
    tabs: {
      launch: ["Release staging", "Pin the main drop, support it with track snippets, and keep signup controls easy to find."],
      metrics: ["Fan signal", "Watch saves, shares, preview plays, and reminder signups as the launch approaches."],
      assets: ["Promo pieces", "Use cover crops, stickers, badges, and snippets as content, not random decoration."],
    },
    queue: [
      ["Cover crop", "Ready"],
      ["Countdown tile", "Live"],
      ["Track preview", "Queued"],
    ],
  },
  "05": {
    brand: "Field Archive",
    nav: ["Essays", "Objects", "Index"],
    eyebrow: "Editorial archive",
    headline: "A strict grid for serious cultural material.",
    lede: "An editorial surface for essays, exhibitions, catalog entries, and long-form pages that need discipline over decoration.",
    primaryAction: "Read feature",
    secondaryAction: "Browse index",
    mediaLabel: "Editorial grid sample",
    scene: "editorial",
    metrics: [
      ["12", "new entries"],
      ["04", "curated paths"],
      ["38", "source notes"],
    ],
    features: [
      ["Typographic control", "Rules, scale, and alignment create drama without shadows or soft cards."],
      ["Content hierarchy", "Titles, captions, metadata, and references each have a crisp place."],
      ["Editorial pacing", "Whitespace and columns carry the rhythm instead of decorative panels."],
    ],
    tabs: {
      launch: ["Issue layout", "Set lead article, secondary entries, pull quotes, and metadata before publishing."],
      metrics: ["Reading depth", "Compare saves, scroll depth, source opens, and return visits across editorial paths."],
      assets: ["Archive media", "Use object crops, captions, and document fragments only when they support the narrative."],
    },
    queue: [
      ["Caption audit", "8 notes"],
      ["Index order", "Locked"],
      ["Lead essay", "Final"],
    ],
  },
  "06": {
    brand: "NullTrace",
    nav: ["Scan", "Keys", "Logs"],
    eyebrow: "Security command line",
    headline: "Trace exposed secrets before they ship.",
    lede: "A terminal-inspired tool for scanning repos, replaying incidents, and making developer security feel native.",
    primaryAction: "Run scan",
    secondaryAction: "View logs",
    mediaLabel: "Terminal scan output",
    scene: "terminal",
    metrics: [
      ["0", "critical leaks"],
      ["31", "repos watched"],
      ["12s", "scan time"],
    ],
    features: [
      ["Command rhythm", "Monospace surfaces, prompts, and log rows make the product feel credible to developers."],
      ["Sharp states", "Warnings, failures, and successful checks are unmistakable in a dark console."],
      ["Useful texture", "Scanlines and glow stay subtle so long logs remain readable."],
    ],
    tabs: {
      launch: ["Scan run", "Start a scan, group findings by severity, and keep remediation commands one click away."],
      metrics: ["Risk trend", "Track leak count, time to revoke, watched repos, and ignored warnings."],
      assets: ["Evidence log", "Keep commit hashes, owners, file paths, and remediation notes in compact rows."],
    },
    queue: [
      ["Token revoked", "Pass"],
      ["Stale key owner", "Find"],
      ["Webhook secret", "Mask"],
    ],
  },
  "07": {
    brand: "StickerForge",
    nav: ["Packs", "Orders", "Studio"],
    eyebrow: "Creator sticker shop",
    headline: "Build sticker packs, price variants, and prep print proof.",
    lede: "A shop board for sticker sheets, avatar packs, variant pricing, order status, and creator product previews.",
    primaryAction: "Build pack",
    secondaryAction: "Preview shop",
    mediaLabel: "Sticker product board",
    scene: "stickers",
    metrics: [
      ["64", "stickers"],
      ["18", "orders"],
      ["4.8", "pack score"],
    ],
    features: [
      ["Sticker energy", "Chunky shapes and hard shadows give the interface charm without hiding controls."],
      ["Friendly commerce", "Pack previews, order states, and price chips stay playful and clear."],
      ["Soft-hard balance", "Rounded forms meet crisp outlines so the page feels lively but not childish."],
    ],
    tabs: {
      launch: ["Pack builder", "Arrange sticker sheets, choose variants, and preview the product card before launch."],
      metrics: ["Shop pulse", "Watch favorites, carts, fulfilled orders, and repeat purchases."],
      assets: ["Creator kit", "Use thumbnails, labels, and sticker cutouts as real product evidence."],
    },
    queue: [
      ["Holiday pack", "Draft"],
      ["Print proof", "Ready"],
      ["Shop banner", "Live"],
    ],
  },
  "08": {
    brand: "Quiet Index",
    nav: ["Works", "Notes", "Contact"],
    eyebrow: "Private portfolio",
    headline: "Let a single piece hold the room.",
    lede: "A restrained dark portfolio for high-end work, art objects, limited releases, and quiet product teasers.",
    primaryAction: "View selected work",
    secondaryAction: "Read notes",
    mediaLabel: "Minimal portfolio object",
    scene: "stark",
    metrics: [
      ["06", "selected works"],
      ["02", "open studies"],
      ["11", "private notes"],
    ],
    features: [
      ["Restraint first", "Large space, thin rules, and delicate glow make the content feel considered."],
      ["Object focus", "A single visual anchor replaces busy feature grids."],
      ["Premium silence", "Microcopy and motion stay quiet so the page feels intentional."],
    ],
    tabs: {
      launch: ["Work curation", "Choose the lead piece, set captions, and keep secondary context quiet."],
      metrics: ["Interest signal", "Track requests, saves, reading time, and follow-up notes without making the page feel commercial."],
      assets: ["Object study", "Use one strong crop or abstracted object surface as the main visual evidence."],
    },
    queue: [
      ["Study 04 caption", "Draft"],
      ["Private link", "Ready"],
      ["Inquiry note", "New"],
    ],
  },
  "09": {
    brand: "NexaBrief",
    nav: ["Briefs", "Tasks", "Reports"],
    eyebrow: "Focused product workspace",
    headline: "Draft one brief from decisions, risks, and launch notes.",
    lede: "A quiet editor for turning owner notes, product risks, open questions, and weekly launch changes into one readable brief.",
    primaryAction: "Draft brief",
    secondaryAction: "Review tasks",
    mediaLabel: "Minimal writing workspace",
    scene: "minimal",
    metrics: [
      ["9", "open briefs"],
      ["24m", "time saved"],
      ["3", "decisions due"],
    ],
    features: [
      ["Single focus", "One core object anchors the page so secondary panels stay quiet."],
      ["Measured color", "A restrained accent marks important actions without turning the UI into a gradient page."],
      ["Calm density", "Whitespace improves decision speed while keeping useful details within reach."],
    ],
    tabs: {
      launch: ["Brief drafting", "Collect decisions, owner notes, and launch changes into one focused writing surface."],
      metrics: ["Review quality", "Compare open questions, aging tasks, approvals, and weekly completion rate."],
      assets: ["Research links", "Keep screenshots and notes nearby only when they support the brief."],
    },
    queue: [
      ["Launch note", "Due"],
      ["Risk summary", "Draft"],
      ["Owner review", "Ready"],
    ],
  },
  "10": {
    brand: "FrameForge",
    nav: ["Scenes", "Renders", "Library"],
    eyebrow: "Creative render studio",
    headline: "Review every frame before the render bill climbs.",
    lede: "A dark creative console for media generation, scene review, render queues, and premium launch visuals.",
    primaryAction: "Inspect renders",
    secondaryAction: "Open library",
    mediaLabel: "Dark render queue",
    scene: "cinema",
    metrics: [
      ["18", "renders queued"],
      ["04", "failed frames"],
      ["72%", "budget used"],
    ],
    features: [
      ["Cinematic contrast", "Deep panels and one bright accent keep attention on the active visual."],
      ["Queue clarity", "Render states, failures, and review tasks stay readable in a dark workspace."],
      ["Premium restraint", "The accent is reserved for action and focus, not sprinkled across every object."],
    ],
    tabs: {
      launch: ["Render review", "Inspect scenes, compare failed frames, and approve the next batch."],
      metrics: ["Queue health", "Watch render cost, failed frames, approval rate, and average wait time."],
      assets: ["Shot library", "Use thumbnails, masks, and frame notes as real production objects."],
    },
    queue: [
      ["Scene 18 mask", "Fail"],
      ["Poster render", "Ready"],
      ["Motion pass", "Queued"],
    ],
  },
  "11": {
    brand: "FlowLedger",
    nav: ["Flows", "Approvals", "SLA"],
    eyebrow: "Workflow control plane",
    headline: "Trace the approval path before it stalls.",
    lede: "A process surface for owners, dependencies, evidence, SLA risk, and the next accountable approval action.",
    primaryAction: "Review flow",
    secondaryAction: "Export log",
    mediaLabel: "Structured workflow map",
    scene: "lines",
    metrics: [
      ["27", "active flows"],
      ["5", "blocked steps"],
      ["99%", "audit coverage"],
    ],
    features: [
      ["Line discipline", "Frames, rails, and separators organize complexity before shadows do."],
      ["Operational proof", "Every module explains owner, status, dependency, and next action."],
      ["Serious rhythm", "The page feels professional through alignment and hierarchy, not decoration."],
    ],
    tabs: {
      launch: ["Approval path", "Trace owners, dependencies, and evidence from intake to final decision."],
      metrics: ["SLA health", "Compare blocked steps, average handoff time, overdue approvals, and audit coverage."],
      assets: ["Evidence bundle", "Attach comments, forms, and change logs to the exact workflow step."],
    },
    queue: [
      ["Legal approval", "Blocked"],
      ["Finance review", "Today"],
      ["Audit export", "Ready"],
    ],
  },
  "12": {
    brand: "LayerPad",
    nav: ["Today", "Routines", "Insights"],
    eyebrow: "Personal utility dashboard",
    headline: "Plan today from routines, focus blocks, and errands.",
    lede: "A touch-friendly utility surface for daily tasks, routine streaks, skipped items, focus windows, and household notes.",
    primaryAction: "Plan today",
    secondaryAction: "View routine",
    mediaLabel: "Layered utility cards",
    scene: "material",
    metrics: [
      ["6", "tasks left"],
      ["82%", "week rhythm"],
      ["3", "focus blocks"],
    ],
    features: [
      ["Tonal hierarchy", "Large surfaces, soft elevation, and clear color roles separate tasks without clutter."],
      ["Touch comfort", "Controls and cards feel generous enough for quick daily interaction."],
      ["Orderly states", "Done, pending, warning, and disabled items share one consistent material language."],
    ],
    tabs: {
      launch: ["Daily plan", "Review remaining tasks, choose focus blocks, and move routine items into today."],
      metrics: ["Routine health", "Track completion, skipped tasks, recurring blockers, and weekly rhythm."],
      assets: ["Personal notes", "Use small illustrations, icons, and list objects only when they support quick recognition."],
    },
    queue: [
      ["Morning reset", "Done"],
      ["Focus timer", "Next"],
      ["Grocery note", "Later"],
    ],
  },
  "13": {
    brand: "Patchwork",
    nav: ["Overview", "Modules", "Profile"],
    eyebrow: "Modular profile hub",
    headline: "Compose the profile from proof, media, timeline, and quote.",
    lede: "A modular profile hub where every tile has a job: hero proof, live metric, timeline, quote, media, or next action.",
    primaryAction: "Arrange blocks",
    secondaryAction: "Open profile",
    mediaLabel: "Modular card composition",
    scene: "bento",
    metrics: [
      ["11", "modules"],
      ["4", "large cards"],
      ["31", "proof points"],
    ],
    features: [
      ["Uneven modules", "Cards vary by purpose and size instead of forming a dull equal grid."],
      ["Chunked meaning", "Each block does one job: proof, media, stat, quote, action, or timeline."],
      ["Composed rhythm", "The layout feels assembled, but gutters and radius keep it coherent."],
    ],
    tabs: {
      launch: ["Block planning", "Choose which modules deserve large real estate and which should stay compact."],
      metrics: ["Story balance", "Compare attention, clicks, saves, and skipped cards across the module set."],
      assets: ["Card content", "Use screenshots, quotes, mini charts, and profile details as real card jobs."],
    },
    queue: [
      ["Hero module", "Large"],
      ["Quote card", "Small"],
      ["Timeline", "Wide"],
    ],
  },
  "14": {
    brand: "TempoRoom",
    nav: ["Mixer", "Focus", "Presets"],
    eyebrow: "Calm audio control",
    headline: "Tune rain, noise, timer, and bell in one soft console.",
    lede: "A tactile audio control panel for focus sessions, layer intensity, saved presets, session timer, and calm feedback.",
    primaryAction: "Start session",
    secondaryAction: "Tune mix",
    mediaLabel: "Soft control panel",
    scene: "soft-depth",
    metrics: [
      ["42m", "session"],
      ["5", "sound layers"],
      ["68", "calm score"],
    ],
    features: [
      ["Tactile depth", "Soft shadows and inset states make controls feel physical without lowering contrast."],
      ["Focused scope", "The style works best when the page has few high-touch controls."],
      ["Accessible calm", "Labels, values, and focus states remain strong despite the soft material."],
    ],
    tabs: {
      launch: ["Session setup", "Tune sound layers, duration, intensity, and focus mode in one calm panel."],
      metrics: ["Session rhythm", "Track completion, interruptions, favorite presets, and average focus time."],
      assets: ["Preset library", "Use waveform-like objects and tactile controls as the main visual assets."],
    },
    queue: [
      ["Rain layer", "62%"],
      ["Noise floor", "Low"],
      ["Focus bell", "On"],
    ],
  },
  "15": {
    brand: "GlassAtlas",
    nav: ["Map", "Signals", "Rooms"],
    eyebrow: "Spatial intelligence board",
    headline: "Float complex signals in a readable glass layer.",
    lede: "A futuristic dashboard for immersive products, monitoring rooms, spatial tools, and high-value control surfaces.",
    primaryAction: "Open signal map",
    secondaryAction: "View rooms",
    mediaLabel: "Glass signal map",
    scene: "glass",
    metrics: [
      ["18", "live signals"],
      ["92%", "clarity"],
      ["4", "rooms linked"],
    ],
    features: [
      ["Readable glass", "Blur, tint, and borders support text instead of turning it into fog."],
      ["Layered context", "Panels stack around a central signal map while preserving orientation."],
      ["Premium depth", "Material effects feel expensive because they are controlled and purposeful."],
    ],
    tabs: {
      launch: ["Signal room", "Layer live metrics, room status, and map objects without losing readability."],
      metrics: ["Signal clarity", "Track alert age, room load, confidence, and operator response time."],
      assets: ["Map objects", "Use translucent panels, pins, and diagrams as functional content."],
    },
    queue: [
      ["North room", "Stable"],
      ["Signal 08", "Drift"],
      ["Operator note", "New"],
    ],
  },
  "16": {
    brand: "PixelDesk",
    nav: ["Files", "Player", "Board"],
    eyebrow: "Retro media workstation",
    headline: "Run the release from a chunky desktop board.",
    lede: "A pixel-flavored campaign page for music, game-adjacent products, zines, and nostalgic creative tools.",
    primaryAction: "Open player",
    secondaryAction: "View files",
    mediaLabel: "Retro window stack",
    scene: "retro",
    metrics: [
      ["8bit", "visual mode"],
      ["12", "files"],
      ["03", "tracks"],
    ],
    features: [
      ["Old system texture", "Chunky windows, hard pixels, and bitmap rhythm create nostalgia with intent."],
      ["Functional chrome", "Window bars, tabs, and file rows are real UI, not only decoration."],
      ["Bright precision", "Crisp lines keep the playful palette from becoming messy."],
    ],
    tabs: {
      launch: ["Release board", "Arrange files, player controls, notes, and launch tasks like a retro workstation."],
      metrics: ["Playback signal", "Track plays, saves, file opens, and newsletter joins."],
      assets: ["Desktop objects", "Use windows, folder chips, mini players, and pixel dividers as core content."],
    },
    queue: [
      ["Track 03", "Loop"],
      ["Poster file", "Open"],
      ["Guest note", "Saved"],
    ],
  },
  "17": {
    brand: "RawLaunch",
    nav: ["Builds", "Proof", "Ship"],
    eyebrow: "Developer release page",
    headline: "Ship a louder tool without sanding off the edges.",
    lede: "A high-collision launch surface for developer products, bold utilities, and campaigns that need directness.",
    primaryAction: "Ship build",
    secondaryAction: "Read proof",
    mediaLabel: "Bold product proof board",
    scene: "brutal",
    metrics: [
      ["1.2K", "stars"],
      ["48", "issues closed"],
      ["99ms", "cold start"],
    ],
    features: [
      ["Controlled collision", "Thick lines, loud blocks, and giant type create force while keeping actions obvious."],
      ["Proof over polish", "Benchmarks, changelog, and install commands carry the story."],
      ["Hard feedback", "Errors, warnings, and selected states are unapologetically visible."],
    ],
    tabs: {
      launch: ["Build proof", "Show install command, changelog, benchmark, and open issues as the launch story."],
      metrics: ["Release pressure", "Track installs, stars, issue closures, and build failures."],
      assets: ["Proof objects", "Use code blocks, stamps, badges, and large labels as functional pieces."],
    },
    queue: [
      ["Benchmark card", "Live"],
      ["Install copy", "Ready"],
      ["Issue cleanup", "4 left"],
    ],
  },
  "18": {
    brand: "VectorOps",
    nav: ["Runs", "Incidents", "Graph"],
    eyebrow: "Precision operations console",
    headline: "Trace every run through a dark precision graph.",
    lede: "A technical operations surface for agent runs, infrastructure events, incident review, and workflow monitoring.",
    primaryAction: "Inspect graph",
    secondaryAction: "Replay run",
    mediaLabel: "Precision run graph",
    scene: "precision",
    metrics: [
      ["312", "runs today"],
      ["7", "incidents"],
      ["99.2%", "pass rate"],
    ],
    features: [
      ["Precise glow", "Light is used as a state signal around active paths and critical objects."],
      ["Compact surfaces", "Lists, traces, command actions, and run cards stay tight and deliberate."],
      ["Technical polish", "The page feels futuristic through alignment, graph structure, and controlled contrast."],
    ],
    tabs: {
      launch: ["Run graph", "Trace active paths, compare retries, and inspect failing spans without leaving the console."],
      metrics: ["Reliability pulse", "Track pass rate, retry count, incident age, and mean recovery time."],
      assets: ["Trace evidence", "Use graph nodes, span rows, logs, and timeline fragments as the visual system."],
    },
    queue: [
      ["Retry storm", "Watch"],
      ["Span 7B", "Fail"],
      ["Replay batch", "Ready"],
    ],
  },
  "19": {
    brand: "BloomBuilder",
    nav: ["Create", "Launch", "Measure"],
    eyebrow: "Builder launch page",
    headline: "Build, preview, and publish one bright project flow.",
    lede: "A colorful builder surface for template choice, live canvas preview, launch checklist, activation tests, and publish status.",
    primaryAction: "Start building",
    secondaryAction: "See examples",
    mediaLabel: "Gradient product canvas",
    scene: "gradient",
    metrics: [
      ["2.4K", "projects"],
      ["38%", "activation lift"],
      ["11", "templates"],
    ],
    features: [
      ["Gradient momentum", "Color creates launch energy while supporting cards stay calmer."],
      ["Clear conversion", "The main action remains stronger than the decorative color field."],
      ["Product objects", "Examples, templates, and mini flows replace empty abstract blobs."],
    ],
    tabs: {
      launch: ["Builder flow", "Show creation, preview, and publishing as a short path with one obvious action."],
      metrics: ["Activation lift", "Compare starts, published projects, drop-offs, and template usage."],
      assets: ["Template gallery", "Use small product previews and color chips as useful visual content."],
    },
    queue: [
      ["Template card", "Hot"],
      ["Signup copy", "Test"],
      ["Hero flow", "Live"],
    ],
  },
  "20": {
    brand: "MellowNotes",
    nav: ["Lessons", "Notes", "Practice"],
    eyebrow: "Friendly learning workspace",
    headline: "Practice one lesson, save one note, return tomorrow.",
    lede: "A warm learning board for today's lesson, friendly retry states, saved notes, progress path, and short practice sessions.",
    primaryAction: "Start lesson",
    secondaryAction: "Open notes",
    mediaLabel: "Soft learning board",
    scene: "doodle",
    metrics: [
      ["18m", "today"],
      ["5", "notes saved"],
      ["86%", "streak health"],
    ],
    features: [
      ["Friendly softness", "Rounded forms and warm color make the product approachable without becoming childish."],
      ["Encouraging states", "Progress, empty, success, and retry messages feel human and specific."],
      ["Gentle structure", "Doodles and shapes support the workflow instead of replacing it."],
    ],
    tabs: {
      launch: ["Practice session", "Set one small lesson goal, keep notes nearby, and celebrate useful progress."],
      metrics: ["Learning rhythm", "Track time, saved notes, streak health, and retry points."],
      assets: ["Learning objects", "Use doodles, cards, notes, and progress objects as meaningful cues."],
    },
    queue: [
      ["Warm-up prompt", "Ready"],
      ["Saved note", "New"],
      ["Retry card", "Kind"],
    ],
  },
  "21": {
    brand: "ChromeRift",
    nav: ["Signals", "Drops", "Archive"],
    eyebrow: "Experimental release page",
    headline: "Make the page feel like a warped signal.",
    lede: "A high-intensity visual surface for experimental portfolios, music drops, fashion-adjacent campaigns, and immersive launches.",
    primaryAction: "Enter drop",
    secondaryAction: "View archive",
    mediaLabel: "Acid chrome composition",
    scene: "acid",
    metrics: [
      ["00:48", "drop window"],
      ["9", "signal cuts"],
      ["3", "archive shards"],
    ],
    features: [
      ["Controlled distortion", "Chrome, laser color, and warped type create impact while body text stays readable."],
      ["Stable anchors", "Navigation, actions, and status chips keep the experience usable inside the chaos."],
      ["Rare intensity", "The style is strongest when used for brands that can carry risk and attitude."],
    ],
    tabs: {
      launch: ["Signal staging", "Place the drop, timer, archive shards, and primary entry point in a distorted composition."],
      metrics: ["Drop heat", "Track entry clicks, shard opens, timer returns, and archive saves."],
      assets: ["Rift objects", "Use chrome slabs, laser rules, and cut-up media as content anchors."],
    },
    queue: [
      ["Timer shard", "Live"],
      ["Chrome title", "Tune"],
      ["Archive cut", "Hidden"],
    ],
  },
};

function getScenario(style) {
  return scenarios[style.id] || {
    brand: "Design Studio",
    nav: ["Overview", "Workflow", "States"],
    eyebrow: `${style.name} example`,
    headline: style.name,
    lede: style.brief,
    primaryAction: "Copy prompt",
    secondaryAction: "View notes",
    mediaLabel: `${style.name} visual sample`,
    scene: "dashboard",
    metrics: [
      ["01", "style"],
      ["03", "states"],
      ["21", "catalog"],
    ],
    features: [
      ["Surface system", "Background, cards, borders, and focus states follow the selected visual language."],
      ["Component tone", "Buttons, tabs, stats, and list rows show how the style behaves in UI."],
      ["Content density", "The example includes real sections, metrics, and supporting context."],
    ],
    tabs: {
      launch: ["Launch workflow", "Plan hierarchy, validate the action, and translate the style into tokens."],
      metrics: ["Quality review", "Compare readability, state coverage, mobile density, and visual distinction."],
      assets: ["Media direction", "Use real product imagery or carefully matched visual objects when media helps."],
    },
    queue: [
      ["Audit contrast", "Ready"],
      ["Review mobile", "2 notes"],
      ["Export prompt", "Click"],
    ],
  };
}

const stylePlaybooks = {
  "01": {
    layout: "ops-board",
    name: "Operational Card Board",
    zhName: "运营卡片看板",
    structure: "Operational app shell with a compact toolbar, filter rail, dense metrics, uneven exception board, and right-side action inspector.",
    zhStructure: "运营型应用外壳，包含紧凑工具栏、筛选轨道、密集指标、不等权重异常看板和右侧操作检查面板。",
    typography: "Use compact sans-serif UI text, strong numerals, small uppercase labels, and short card titles.",
    zhTypography: "使用紧凑非衬线界面字体、强数字层级、小号大写标签和短卡片标题。",
    components: "Search, toolbar controls, stat tiles, filter chips, status badges, priority cards, inspector queues, and owner rows should feel like one dashboard system.",
    zhComponents: "搜索、工具栏控件、统计块、筛选标签、状态徽章、优先级卡片、检查队列和负责人行都应属于同一个仪表盘系统。",
    buttons: "Primary buttons are practical solid controls; secondary actions stay quiet as bordered controls.",
    zhButtons: "主按钮是务实的实色控件，次级操作保持低调边框样式。",
    media: "Use product screenshots, maps, tables, or workflow evidence instead of abstract hero art.",
    zhMedia: "使用产品截图、地图、表格或流程证据，不使用抽象主视觉。",
    states: "Show selected filters, warning chips, stale items, disabled actions, and focus rings clearly.",
    zhStates: "清楚呈现选中筛选、警告标签、过期项目、禁用操作和焦点环。",
    avoid: "Do not turn it into a generic marketing hero or three equal feature cards.",
    zhAvoid: "不要把它做成通用营销首屏或三个等权功能卡。",
  },
  "02": {
    layout: "street-poster",
    name: "Street Poster Launch",
    zhName: "街头海报发布",
    structure: "Poster-first composition with slab headline blocks, ticket strips, hard stamps, and intentionally loud hierarchy.",
    zhStructure: "海报优先的构图，包含块状标题、票券条、硬质印章和刻意强烈的层级。",
    typography: "Use huge block type, compressed labels, blunt numbers, and minimal body copy.",
    zhTypography: "使用巨大块状标题、压缩标签、直接数字和很少的正文。",
    components: "Tickets, stamps, countdowns, rule panels, and claim modules should look physical and direct.",
    zhComponents: "票券、印章、倒计时、规则面板和领取模块要有实体感和直接感。",
    buttons: "Buttons are black or saturated slabs with hard borders and offset shadows, never soft pills.",
    zhButtons: "按钮使用黑色或高饱和块面、硬边框和错位阴影，绝不做柔软胶囊。",
    media: "Use poster blocks, product labels, stickers, or campaign artifacts as the main image language.",
    zhMedia: "用海报块、产品标签、贴纸或活动物料作为主视觉语言。",
    states: "Use stamped states such as live, locked, claimed, expired, and warning with strong contrast.",
    zhStates: "用高对比印章状态表达 live、locked、claimed、expired 和 warning。",
    avoid: "Do not soften the style with generic rounded SaaS cards.",
    zhAvoid: "不要用通用圆角 SaaS 卡片软化这个风格。",
  },
  "03": {
    layout: "aurora-lab",
    name: "Aurora Evaluation Lab",
    zhName: "极光评估实验室",
    structure: "Dark research lab with side-by-side run comparisons, a glowing evidence canvas, and calm review notes.",
    zhStructure: "暗色研究实验室，包含并排运行对比、发光证据画布和克制评审笔记。",
    typography: "Use precise sans-serif headings, readable body copy, and small scientific metadata.",
    zhTypography: "使用精确非衬线标题、易读正文和小型科研元数据。",
    components: "Comparison columns, score chips, reviewer notes, trace cards, and run deltas should be translucent but readable.",
    zhComponents: "对比列、评分标签、评审笔记、追踪卡和运行差异要半透明但可读。",
    buttons: "Primary actions glow subtly; secondary controls are glassy outlines.",
    zhButtons: "主操作使用轻微发光，次级控件使用玻璃感描边。",
    media: "Use aurora fields behind product evidence, not as decoration over text.",
    zhMedia: "极光色场应作为产品证据背后的氛围，而不是盖在文本上的装饰。",
    states: "Show confidence, disagreement, regression, selected run, and review-needed states.",
    zhStates: "呈现置信度、分歧、回归、选中运行和待评审状态。",
    avoid: "Do not make every panel a rainbow gradient.",
    zhAvoid: "不要把每个面板都做成彩虹渐变。",
  },
  "04": {
    layout: "y2k-stage",
    name: "Glossy Y2K Stage",
    zhName: "千禧亮面舞台",
    structure: "A glossy stage with marquee bars, circular media, sticker controls, and a playful release lineup.",
    zhStructure: "亮面舞台式布局，包含跑马灯条、圆形媒体、贴纸控件和玩乐发布阵容。",
    typography: "Pair expressive display words with readable short captions and badge labels.",
    zhTypography: "把夸张展示字和可读短说明、徽章标签搭配使用。",
    components: "Lineup cards, track pills, shiny badges, countdown chips, and signup controls should feel collectible.",
    zhComponents: "阵容卡、曲目胶囊、亮面徽章、倒计时标签和注册控件要有收藏感。",
    buttons: "Buttons are glossy, thick, and high-energy with clear hover and pressed states.",
    zhButtons: "按钮要亮面、厚实、有能量，并有清晰 hover 与 pressed 状态。",
    media: "Use cover art crops, neon frames, sparkles, and real promo fragments.",
    zhMedia: "使用封面裁切、霓虹框、星光和真实宣传碎片。",
    states: "Show queued, live, saved, reminder-on, and preview-playing states.",
    zhStates: "呈现 queued、live、saved、reminder-on 和 preview-playing 状态。",
    avoid: "Do not let sparkle effects cover interface meaning.",
    zhAvoid: "不要让星光效果盖过界面含义。",
  },
  "05": {
    layout: "editorial-index",
    name: "Editorial Index Grid",
    zhName: "编辑索引网格",
    structure: "Strict editorial grid with article columns, rule lines, metadata gutters, and an index-led reading path.",
    zhStructure: "严格编辑网格，包含文章列、分割线、元数据边栏和索引式阅读路径。",
    typography: "Use scale, weight, alignment, and rules as the design; avoid decorative card language.",
    zhTypography: "用字号、字重、对齐和线条形成设计，避免装饰性卡片语言。",
    components: "Article teasers, pull quotes, source notes, index rows, and captions should feel print-disciplined.",
    zhComponents: "文章导语、引文、来源注释、索引行和图注应有印刷纪律。",
    buttons: "Actions are text links, underlined labels, or small editorial tags rather than glossy buttons.",
    zhButtons: "操作使用文字链接、下划线标签或小型编辑标签，而不是亮面按钮。",
    media: "Use object crops, archival fragments, and captioned images with strict placement.",
    zhMedia: "使用对象裁切、档案碎片和带图注图片，并严格放置。",
    states: "Show reading status, source-open, selected index row, and updated metadata states.",
    zhStates: "呈现阅读状态、来源打开、选中索引行和元数据更新状态。",
    avoid: "Do not add soft shadows, rounded SaaS cards, or vague marketing copy.",
    zhAvoid: "不要添加柔和阴影、圆角 SaaS 卡或模糊营销文案。",
  },
  "06": {
    layout: "terminal-console",
    name: "Terminal Console",
    zhName: "终端控制台",
    structure: "Command-line console with log panes, prompt rows, file paths, severity lanes, and a compact run summary.",
    zhStructure: "命令行控制台，包含日志面板、提示符行、文件路径、严重级别轨道和紧凑运行摘要。",
    typography: "Use monospace for the main interface and keep long log rows aligned.",
    zhTypography: "主界面使用等宽字体，并保持长日志行对齐。",
    components: "Prompt inputs, log rows, severity chips, file paths, command buttons, and inline remediation blocks are central.",
    zhComponents: "提示符输入、日志行、严重级别标签、文件路径、命令按钮和内联修复块是核心。",
    buttons: "Buttons should look like executable commands, with brackets, prompt marks, or terminal borders.",
    zhButtons: "按钮应像可执行命令，可使用括号、提示符标记或终端边框。",
    media: "Use logs, code snippets, repo paths, and scan traces instead of abstract graphics.",
    zhMedia: "使用日志、代码片段、仓库路径和扫描轨迹，不使用抽象图形。",
    states: "Show pass, fail, warning, masked, ignored, running, and copied command states.",
    zhStates: "呈现 pass、fail、warning、masked、ignored、running 和 copied command 状态。",
    avoid: "Do not use green glow so heavily that logs become hard to read.",
    zhAvoid: "不要把绿色发光用到影响日志阅读。",
  },
  "07": {
    layout: "sticker-shop",
    name: "Sticker Shop Board",
    zhName: "贴纸商店面板",
    structure: "Playful shop board with sticker cutouts, product tiles, price tags, and chunky commerce controls.",
    zhStructure: "玩乐商店面板，包含贴纸切片、商品块、价格标签和厚实电商控件。",
    typography: "Use friendly bold headings, short labels, and clear commerce microcopy.",
    zhTypography: "使用友好粗标题、短标签和清晰电商微文案。",
    components: "Pack previews, variant chips, cart rows, proof badges, and reorder handles should feel tactile.",
    zhComponents: "包预览、变体标签、购物车行、证明徽章和排序手柄要有触感。",
    buttons: "Buttons are chunky, outlined, playful, and clearly clickable.",
    zhButtons: "按钮要厚实、描边、有玩乐感并且显然可点击。",
    media: "Use sticker silhouettes, product thumbnails, cutout shapes, and playful labels.",
    zhMedia: "使用贴纸轮廓、商品缩略图、切片形状和玩乐标签。",
    states: "Show draft, proof-ready, sold-out, selected variant, and fulfilled states.",
    zhStates: "呈现 draft、proof-ready、sold-out、selected variant 和 fulfilled 状态。",
    avoid: "Do not let cuteness remove hierarchy or commerce clarity.",
    zhAvoid: "不要让可爱感削弱层级或交易清晰度。",
  },
  "08": {
    layout: "stark-portfolio",
    name: "Stark Object Focus",
    zhName: "克制对象聚焦",
    structure: "Sparse portfolio composition with one dominant object, quiet metadata, and thin navigation.",
    zhStructure: "稀疏作品集构图，包含一个主对象、安静元数据和细导航。",
    typography: "Use thin, restrained type with generous line spacing and few words.",
    zhTypography: "使用纤细克制字体、宽松行距和少量文字。",
    components: "Object viewer, private notes, small index links, and contact actions should stay calm.",
    zhComponents: "对象查看器、私密注释、小型索引链接和联系操作要保持安静。",
    buttons: "Actions are quiet text buttons or thin outlined controls, never loud filled blocks.",
    zhButtons: "操作是安静文字按钮或细描边控件，绝不用强烈实心块。",
    media: "Use one strong crop, material study, or object silhouette with enough empty space.",
    zhMedia: "使用一个强裁切、材质研究或对象轮廓，并保留足够空白。",
    states: "Show selected work, private link ready, inquiry received, and caption draft states.",
    zhStates: "呈现 selected work、private link ready、inquiry received 和 caption draft 状态。",
    avoid: "Do not fill the silence with equal cards or decorative noise.",
    zhAvoid: "不要用等权卡片或装饰噪点填满安静感。",
  },
  "09": {
    layout: "minimal-brief",
    name: "Focused Brief Editor",
    zhName: "聚焦简报编辑器",
    structure: "Quiet document workspace with a writing surface, side notes, decision chips, and subdued task context.",
    zhStructure: "安静文档工作区，包含写作面、侧边笔记、决策标签和克制任务上下文。",
    typography: "Use readable editor text, crisp UI labels, and restrained heading scale.",
    zhTypography: "使用易读编辑文本、清晰界面标签和克制标题层级。",
    components: "Editor panels, decision chips, review comments, tasks, and lightweight progress objects should be calm.",
    zhComponents: "编辑面板、决策标签、审阅评论、任务和轻量进度对象应保持平静。",
    buttons: "Buttons are simple and sharp; primary action is solid, secondary actions are text or light outlines.",
    zhButtons: "按钮简洁利落；主操作实色，次级操作用文字或轻描边。",
    media: "Use product screenshots or document excerpts only when they support the brief.",
    zhMedia: "只在支持简报时使用产品截图或文档摘录。",
    states: "Show draft, review-ready, blocked decision, synced, and disabled submit states.",
    zhStates: "呈现 draft、review-ready、blocked decision、synced 和 disabled submit 状态。",
    avoid: "Do not add decorative gradients to compensate for weak content hierarchy.",
    zhAvoid: "不要用装饰渐变弥补内容层级薄弱。",
  },
  "10": {
    layout: "dark-render",
    name: "Dark Render Review",
    zhName: "暗色渲染审阅",
    structure: "Cinematic production console with a large frame viewer, film strip, render queue, and cost alerts.",
    zhStructure: "电影感生产控制台，包含大画面查看器、胶片条、渲染队列和成本提醒。",
    typography: "Use high-contrast UI text with restrained labels and sharp numeric cost/status values.",
    zhTypography: "使用高对比界面文字、克制标签和清晰成本/状态数字。",
    components: "Frame viewer, timeline strip, render queue, failure badges, and review controls should feel premium.",
    zhComponents: "画面查看器、时间线条、渲染队列、失败徽章和审阅控件要有高级感。",
    buttons: "Primary action is bright and cinematic; destructive or failed states use clear contrast.",
    zhButtons: "主操作明亮且有电影感；危险或失败状态使用明确对比。",
    media: "Use frame crops, masks, thumbnails, and production notes as visual content.",
    zhMedia: "使用画面裁切、蒙版、缩略图和制作笔记作为视觉内容。",
    states: "Show queued, rendering, failed, approved, budget warning, and retry states.",
    zhStates: "呈现 queued、rendering、failed、approved、budget warning 和 retry 状态。",
    avoid: "Do not use generic dark cards without media review structure.",
    zhAvoid: "不要只用通用暗色卡片而没有媒体审阅结构。",
  },
  "11": {
    layout: "line-workflow",
    name: "Linework Process Map",
    zhName: "线框流程地图",
    structure: "Process map with lanes, numbered steps, dependency lines, evidence cells, and a sober audit panel.",
    zhStructure: "流程地图，包含泳道、编号步骤、依赖线、证据单元和严肃审计面板。",
    typography: "Use factual labels, compact body copy, and precise step numbering.",
    zhTypography: "使用事实型标签、紧凑正文和精确步骤编号。",
    components: "Lanes, connectors, approval cells, evidence rows, audit stamps, and SLA chips should rely on lines before shadows.",
    zhComponents: "泳道、连接线、审批单元、证据行、审计章和 SLA 标签应优先依赖线条而非阴影。",
    buttons: "Buttons are rectangular, disciplined, and aligned with the grid.",
    zhButtons: "按钮为矩形、克制，并与网格对齐。",
    media: "Use diagrams, tables, forms, and evidence previews instead of atmospheric art.",
    zhMedia: "使用图表、表格、表单和证据预览，不使用氛围插图。",
    states: "Show blocked, waiting, approved, overdue, selected step, and exported states.",
    zhStates: "呈现 blocked、waiting、approved、overdue、selected step 和 exported 状态。",
    avoid: "Do not replace information architecture with decorative cards.",
    zhAvoid: "不要用装饰卡片替代信息架构。",
  },
  "12": {
    layout: "material-day",
    name: "Layered Daily Surface",
    zhName: "层级日程表面",
    structure: "Touch-first utility layout with large tonal surfaces, a phone-like focus panel, and routine clusters.",
    zhStructure: "触控优先的实用工具布局，包含大色调表面、类手机焦点面板和例行任务簇。",
    typography: "Use friendly readable UI type, clear task labels, and generous tap-target spacing.",
    zhTypography: "使用友好可读界面字体、清晰任务标签和充足触控间距。",
    components: "Routine cards, toggles, progress rings, chips, bottom actions, and empty task states should share material depth.",
    zhComponents: "例行卡、开关、进度环、标签、底部操作和空任务状态应共享材质层级。",
    buttons: "Buttons are tonal or filled with large radius and obvious touch states.",
    zhButtons: "按钮使用色调或实色、大圆角和清楚触控状态。",
    media: "Use small functional icons or calm illustrations only where they speed recognition.",
    zhMedia: "只在加速识别时使用小功能图标或安静插画。",
    states: "Show done, skipped, next, disabled, overdue, and selected day states.",
    zhStates: "呈现 done、skipped、next、disabled、overdue 和 selected day 状态。",
    avoid: "Do not shrink controls into dense desktop SaaS widgets.",
    zhAvoid: "不要把控件缩成密集桌面 SaaS 小组件。",
  },
  "13": {
    layout: "bento-profile",
    name: "Uneven Bento Story",
    zhName: "不等格便当叙事",
    structure: "Asymmetric bento grid where each tile has a different job: proof, media, quote, stat, action, or timeline.",
    zhStructure: "不对称便当网格，每个块有不同职责：证明、媒体、引用、统计、操作或时间线。",
    typography: "Use modular headings, short tile labels, and strong local hierarchy inside each block.",
    zhTypography: "使用模块化标题、短块标签，并在每个块内建立局部层级。",
    components: "Large, wide, tall, and compact tiles should vary by content value while sharing radius and gutters.",
    zhComponents: "大、宽、高、紧凑卡块按内容价值变化，同时共享圆角和间距。",
    buttons: "Buttons can be embedded tile actions, compact pills, or full-width module controls.",
    zhButtons: "按钮可以是卡块内操作、紧凑胶囊或整块宽度控件。",
    media: "Use mini screenshots, quotes, diagrams, profile details, and chart fragments as tile content.",
    zhMedia: "使用小截图、引用、图表、资料详情和图表碎片作为卡块内容。",
    states: "Show pinned, updated, saved, expanded, compact, and reordered module states.",
    zhStates: "呈现 pinned、updated、saved、expanded、compact 和 reordered module 状态。",
    avoid: "Do not make all bento cards equal-sized placeholders.",
    zhAvoid: "不要把所有便当块做成等尺寸占位卡。",
  },
  "14": {
    layout: "neumo-console",
    name: "Soft Tactile Control",
    zhName: "柔软触感控制台",
    structure: "Calm control surface with large knobs, inset sliders, preset pads, and a centered session state.",
    zhStructure: "安静控制表面，包含大旋钮、内凹滑杆、预设垫和居中的会话状态。",
    typography: "Use calm medium-weight labels, clear values, and limited headings.",
    zhTypography: "使用平静中等字重标签、清晰数值和有限标题。",
    components: "Knobs, sliders, toggle wells, preset pads, and session chips should all feel tactile.",
    zhComponents: "旋钮、滑杆、开关槽、预设垫和会话标签都要有触感。",
    buttons: "Buttons are raised or inset with clear pressed states and strong enough contrast.",
    zhButtons: "按钮使用凸起或内凹状态，并有清晰 pressed 状态和足够对比度。",
    media: "Use waveform, sound layers, and tactile control objects instead of photos.",
    zhMedia: "使用波形、声音层和触感控件对象，不使用照片。",
    states: "Show pressed, active layer, muted, disabled, timer-running, and saved preset states.",
    zhStates: "呈现 pressed、active layer、muted、disabled、timer-running 和 saved preset 状态。",
    avoid: "Do not let soft shadows reduce accessibility or hide active states.",
    zhAvoid: "不要让柔和阴影降低可访问性或隐藏激活状态。",
  },
  "15": {
    layout: "glass-map",
    name: "Glass Signal Map",
    zhName: "玻璃信号地图",
    structure: "Immersive map with translucent panes, pinned signals, layered controls, and readable depth.",
    zhStructure: "沉浸式地图，包含透明面板、固定信号、层叠控件和可读深度。",
    typography: "Use clean futuristic UI type, short labels, and high-contrast text over glass.",
    zhTypography: "使用干净未来感界面字体、短标签和玻璃上高对比文字。",
    components: "Floating panes, map pins, room cards, translucent filters, and signal lists should use blur carefully.",
    zhComponents: "浮动面板、地图针、房间卡、透明筛选和信号列表应谨慎使用模糊。",
    buttons: "Buttons are frosted glass or bright signal controls with visible borders.",
    zhButtons: "按钮使用磨砂玻璃或明亮信号控件，并有可见边框。",
    media: "Use maps, spatial diagrams, pins, and glass layers as actual product content.",
    zhMedia: "使用地图、空间图、针点和玻璃层作为真实产品内容。",
    states: "Show stable, drift, alert, selected room, operator note, and loading signal states.",
    zhStates: "呈现 stable、drift、alert、selected room、operator note 和 loading signal 状态。",
    avoid: "Do not put low-contrast text over busy translucent backgrounds.",
    zhAvoid: "不要把低对比文字放在复杂透明背景上。",
  },
  "16": {
    layout: "retro-desktop",
    name: "Retro Desktop Workspace",
    zhName: "复古桌面工作区",
    structure: "Old desktop environment with overlapping windows, title bars, pixel panels, and file-like action rows.",
    zhStructure: "老式桌面环境，包含重叠窗口、标题栏、像素面板和文件式操作行。",
    typography: "Use monospace or bitmap-like rhythm, crisp labels, and short window titles.",
    zhTypography: "使用等宽或像素节奏、清晰标签和短窗口标题。",
    components: "Windows, title bars, folder rows, mini players, file chips, and pixel dividers should feel functional.",
    zhComponents: "窗口、标题栏、文件夹行、迷你播放器、文件标签和像素分割线要有功能感。",
    buttons: "Buttons are rectangular system controls with hard borders and pressed offsets.",
    zhButtons: "按钮是矩形系统控件，带硬边框和按下偏移。",
    media: "Use file windows, player bars, pixel diagrams, and desktop objects as the visual language.",
    zhMedia: "使用文件窗口、播放器条、像素图和桌面对象作为视觉语言。",
    states: "Show open, saved, playing, minimized, selected file, and modal states.",
    zhStates: "呈现 open、saved、playing、minimized、selected file 和 modal 状态。",
    avoid: "Do not make the page look broken; nostalgia still needs clear UI.",
    zhAvoid: "不要让页面看起来像坏掉；怀旧仍然需要清晰界面。",
  },
  "17": {
    layout: "brutal-release",
    name: "Brutal Proof Release",
    zhName: "粗野证明发布",
    structure: "Release page built from giant type, proof slabs, install commands, issue strips, and collision blocks.",
    zhStructure: "由巨大字体、证明块、安装命令、issue 条和碰撞块构成的发布页。",
    typography: "Use oversized blunt headings, compact proof labels, and high-contrast code or numbers.",
    zhTypography: "使用超大直接标题、紧凑证明标签和高对比代码/数字。",
    components: "Install commands, benchmarks, issue cards, badges, changelog strips, and alerts carry the story.",
    zhComponents: "安装命令、基准、issue 卡、徽章、更新条和警告承载叙事。",
    buttons: "Buttons are hard, loud, border-heavy, and visibly interactive.",
    zhButtons: "按钮硬朗、响亮、重边框，并且明显可交互。",
    media: "Use code blocks, stamps, benchmark charts, and launch proof instead of decorative art.",
    zhMedia: "使用代码块、印章、基准图和发布证明，不使用装饰图。",
    states: "Show copied, failing, benchmark live, issue closed, warning, and shipped states.",
    zhStates: "呈现 copied、failing、benchmark live、issue closed、warning 和 shipped 状态。",
    avoid: "Do not sand off the energy with soft shadows or polite muted cards.",
    zhAvoid: "不要用柔和阴影或礼貌灰卡磨平这个风格。",
  },
  "18": {
    layout: "precision-graph",
    name: "Precision Graph Console",
    zhName: "精密图谱控制台",
    structure: "Technical console with a node graph, compact trace rows, command actions, and glowing state markers.",
    zhStructure: "技术控制台，包含节点图、紧凑追踪行、命令操作和发光状态标记。",
    typography: "Use compact technical UI type, precise labels, and aligned numeric values.",
    zhTypography: "使用紧凑技术界面字体、精确标签和对齐数值。",
    components: "Graph nodes, trace rows, run cards, incident chips, command buttons, and timeline fragments should feel engineered.",
    zhComponents: "图节点、追踪行、运行卡、事件标签、命令按钮和时间线片段要有工程感。",
    buttons: "Buttons are compact dark controls with glow reserved for active or critical actions.",
    zhButtons: "按钮是紧凑暗色控件，发光只用于激活或关键操作。",
    media: "Use graphs, traces, logs, and span diagrams instead of generic sci-fi backgrounds.",
    zhMedia: "使用图谱、追踪、日志和 span 图，不用通用科幻背景。",
    states: "Show active path, fail, retry, replay ready, incident open, and selected node states.",
    zhStates: "呈现 active path、fail、retry、replay ready、incident open 和 selected node 状态。",
    avoid: "Do not cover precise information with excessive glow.",
    zhAvoid: "不要用过量发光遮住精确信息。",
  },
  "19": {
    layout: "gradient-builder",
    name: "Gradient Builder Flow",
    zhName: "渐变构建流程",
    structure: "Bright creation flow with a colorful canvas, stepper rail, template cards, and conversion-focused action area.",
    zhStructure: "明亮创建流程，包含彩色画布、步骤轨道、模板卡和转化导向操作区。",
    typography: "Use friendly modern headings, clear product labels, and energetic but readable body copy.",
    zhTypography: "使用友好现代标题、清晰产品标签和有能量但可读的正文。",
    components: "Creation steps, template previews, color chips, progress markers, and signup modules should feel active.",
    zhComponents: "创建步骤、模板预览、色片、进度标记和注册模块要有行动感。",
    buttons: "Buttons are high-color and confident, with calmer secondary actions.",
    zhButtons: "按钮高色彩且自信，次级操作保持安静。",
    media: "Use product canvas previews, template thumbnails, flow arrows, and color chips.",
    zhMedia: "使用产品画布预览、模板缩略图、流程箭头和色片。",
    states: "Show selected template, started, published, dropped-off, testing, and activation states.",
    zhStates: "呈现 selected template、started、published、dropped-off、testing 和 activation 状态。",
    avoid: "Do not let gradients overpower text or primary action clarity.",
    zhAvoid: "不要让渐变压过文本或主操作清晰度。",
  },
  "20": {
    layout: "soft-learning",
    name: "Soft Learning Board",
    zhName: "柔和学习面板",
    structure: "Warm learning board with note cards, progress path, friendly empty states, and gentle practice controls.",
    zhStructure: "温暖学习面板，包含笔记卡、进度路径、友好空状态和温和练习控件。",
    typography: "Use rounded, readable type with encouraging labels and human microcopy.",
    zhTypography: "使用圆润可读字体、鼓励性标签和有人味的微文案。",
    components: "Lesson cards, notes, retry prompts, progress tokens, doodle frames, and save states should feel kind.",
    zhComponents: "课程卡、笔记、重试提示、进度 token、涂鸦框和保存状态要友好。",
    buttons: "Buttons are rounded and warm with obvious focus and disabled states.",
    zhButtons: "按钮圆润温暖，并有明显焦点和禁用状态。",
    media: "Use small doodles, note objects, progress paths, and friendly illustrations as cues.",
    zhMedia: "使用小涂鸦、笔记对象、进度路径和友好插图作为线索。",
    states: "Show saved note, retry, kind error, empty lesson, streak, and completed states.",
    zhStates: "呈现 saved note、retry、kind error、empty lesson、streak 和 completed 状态。",
    avoid: "Do not make friendly design childish or vague.",
    zhAvoid: "不要把友好设计做成幼稚或模糊。",
  },
  "21": {
    layout: "acid-poster",
    name: "Acid Signal Poster",
    zhName: "酸性信号海报",
    structure: "Asymmetric experimental poster with chrome slabs, laser cuts, warped title treatment, and stable navigation anchors.",
    zhStructure: "不对称实验海报，包含铬面块、镭射切线、扭曲标题处理和稳定导航锚点。",
    typography: "Use distorted display moments only for headlines; keep body copy and controls readable.",
    zhTypography: "扭曲展示字只用于标题瞬间；正文和控件保持可读。",
    components: "Signal shards, timer chips, archive cuts, chrome buttons, and high-contrast anchor controls define the UI.",
    zhComponents: "信号碎片、计时标签、档案切片、铬面按钮和高对比锚点控件定义界面。",
    buttons: "Buttons can be metallic or laser-outlined but must remain obvious actions.",
    zhButtons: "按钮可以是金属或镭射描边，但必须显然是操作。",
    media: "Use chrome slabs, cut-up images, laser rules, and dark surreal fields as content anchors.",
    zhMedia: "使用铬面块、切片图像、镭射线和暗黑超现实场作为内容锚点。",
    states: "Show live drop, hidden shard, tuned title, entered, archived, and expired states.",
    zhStates: "呈现 live drop、hidden shard、tuned title、entered、archived 和 expired 状态。",
    avoid: "Do not apply distortion to small text, forms, or critical controls.",
    zhAvoid: "不要把扭曲效果用于小字、表单或关键控件。",
  },
};

function getStylePlaybook(style) {
  return stylePlaybooks[style.id] || stylePlaybooks["09"];
}

const geometryProfiles = {
  "01": { panel: "10px", control: "6px", chip: "4px", media: "8px", description: "structured small-radius cards with sharper controls" },
  "02": { panel: "0", control: "0", chip: "0", media: "0", description: "hard square geometry with no softened SaaS corners" },
  "03": { panel: "14px", control: "8px", chip: "6px", media: "12px", description: "restrained aurora panels with crisp controls" },
  "04": { panel: "16px", control: "10px", chip: "8px", media: "14px", description: "glossy Y2K shapes without default pill buttons" },
  "05": { panel: "0", control: "0", chip: "0", media: "0", description: "editorial hard edges and rule-line structure" },
  "06": { panel: "2px", control: "0", chip: "0", media: "2px", description: "terminal-like square controls and tiny window corners" },
  "07": { panel: "22px", control: "12px", chip: "10px", media: "18px", description: "playful sticker curves with hard-shadow contrast" },
  "08": { panel: "6px", control: "2px", chip: "0", media: "4px", description: "stark near-square panels and thin editorial controls" },
  "09": { panel: "8px", control: "4px", chip: "2px", media: "6px", description: "minimal small-radius surfaces with precise controls" },
  "10": { panel: "8px", control: "4px", chip: "2px", media: "6px", description: "cinematic dark surfaces with compact angular controls" },
  "11": { panel: "4px", control: "2px", chip: "0", media: "4px", description: "linework structure with almost-square components" },
  "12": { panel: "22px", control: "16px", chip: "12px", media: "18px", description: "material-friendly curves reserved for touch surfaces" },
  "13": { panel: "18px", control: "10px", chip: "8px", media: "16px", description: "modular bento curves without making every item identical" },
  "14": { panel: "30px", control: "22px", chip: "18px", media: "26px", description: "soft tactile curves for raised and inset controls" },
  "15": { panel: "24px", control: "14px", chip: "10px", media: "20px", description: "glass curves balanced by visible structure" },
  "16": { panel: "2px", control: "0", chip: "0", media: "2px", description: "retro system windows with hard pixel edges" },
  "17": { panel: "0", control: "0", chip: "0", media: "0", description: "brutalist square geometry and blunt controls" },
  "18": { panel: "6px", control: "4px", chip: "2px", media: "4px", description: "precision console geometry with low-radius panels" },
  "19": { panel: "14px", control: "8px", chip: "6px", media: "12px", description: "energetic gradient surfaces with controlled curves" },
  "20": { panel: "28px", control: "18px", chip: "14px", media: "24px", description: "soft friendly curves limited to the learning mood" },
  "21": { panel: "8px", control: "4px", chip: "2px", media: "6px", description: "acid-edged geometry with sharp anchor controls" },
};

function getGeometryProfile(style) {
  return geometryProfiles[style.id] || geometryProfiles["09"];
}

const implementationProfiles = {
  "01": {
    buttons: "Use compact solid primary buttons, quiet bordered secondary buttons, square-ish filter chips, and loading buttons that keep the same width.",
    zhButtons: "使用紧凑实色主按钮、低调描边次按钮、偏方形筛选 chip，以及保持宽度稳定的加载按钮。",
    feedback: "Use inline warnings near the affected row, small status toasts for saved actions, and visible stale/error chips inside the board.",
    zhFeedback: "在受影响行附近显示内联警告，保存操作使用小型状态 toast，并在看板内显示 stale/error chip。",
    spacing: "Use 24px page gutters, 16-20px panel padding, 10-12px row gaps, and dense 42-48px controls for operational scanning.",
    zhSpacing: "页面留白 24px，面板内边距 16-20px，行间距 10-12px，控件高度 42-48px，便于运营扫描。",
    responsive: "Desktop keeps filter rail, board, and inspector visible; tablet stacks inspector below the board; mobile turns filters into chips above the list and keeps the primary action after the page title.",
    zhResponsive: "桌面保留筛选栏、看板和检查面板；平板把检查面板下移；手机把筛选栏变成顶部 chip，并让主操作紧跟标题。",
  },
  "02": {
    buttons: "Use blunt rectangular buttons with thick borders, hard offset shadows, pressed translation, and no soft disabled treatment.",
    zhButtons: "使用钝感矩形按钮、粗边框、硬偏移阴影、按下位移，并避免柔和的禁用态。",
    feedback: "Use poster-like alert strips, stamped success labels, and obvious error blocks with hard borders.",
    zhFeedback: "使用海报式提示条、印章式成功标签，以及粗边框错误块。",
    spacing: "Use large 24-32px slabs, abrupt 12-16px gaps, and intentionally chunky control groups.",
    zhSpacing: "使用 24-32px 大块内边距、12-16px 明确间距，以及厚重的控件组。",
    responsive: "Desktop can be asymmetric; tablet collapses poster and proof wall; mobile becomes a single stack with full-width slab buttons and no horizontal overflow.",
    zhResponsive: "桌面可以不对称；平板折叠海报和证明墙；手机变成单列，按钮全宽且不能横向溢出。",
  },
  "03": {
    buttons: "Use luminous but restrained buttons, translucent secondary controls, and selected states that glow only at the edge.",
    zhButtons: "使用克制发光按钮、半透明次级控件，以及只在边缘发光的选中态。",
    feedback: "Use soft toast panels, score-change alerts, and low-noise validation hints over dark panels.",
    zhFeedback: "使用柔和 toast、分数变化提示，以及暗色面板上的低噪声校验提示。",
    spacing: "Use 22-28px glass panel padding, 14px component gaps, and generous breathing room around comparison cards.",
    zhSpacing: "玻璃面板内边距 22-28px，组件间距 14px，对比卡周围保持足够呼吸感。",
    responsive: "Desktop keeps evidence, comparison, and review notes side by side; mobile stacks them as review cards and keeps the score/primary action visible before media.",
    zhResponsive: "桌面并列证据、对比和审阅备注；手机堆叠成审阅卡，并把分数和主操作放在媒体之前。",
  },
  "04": {
    buttons: "Use glossy compact buttons, bright pill-like chips only for real states, and active feedback that feels like a music player control.",
    zhButtons: "使用有光泽的紧凑按钮，只在真实状态上使用亮色 chip，按下反馈像音乐播放器控件。",
    feedback: "Use energetic launch toasts, live/reminder badges, and inline signup confirmation.",
    zhFeedback: "使用有活力的发布 toast、live/reminder 徽章，以及内联报名确认。",
    spacing: "Use 18-24px stage padding, 8-12px pill gaps, and compact countdown blocks.",
    zhSpacing: "舞台内边距 18-24px，胶囊间距 8-12px，倒计时块保持紧凑。",
    responsive: "Desktop may use a stage and control panel; mobile moves lineup, countdown, and signup into a single sequenced flow.",
    zhResponsive: "桌面可使用舞台和控制面板；手机把 lineup、倒计时和报名变成单列流程。",
  },
  "05": {
    buttons: "Use text-link buttons, underlined actions, rule-line tabs, and almost no filled buttons unless the action is decisive.",
    zhButtons: "使用文字链接按钮、下划线操作、规则线 tab，除非动作非常关键，否则少用填充按钮。",
    feedback: "Use editorial callouts, margin notes, and rule-separated validation messages instead of colored bubbles.",
    zhFeedback: "使用编辑式 callout、边注和规则线分隔的校验消息，而不是彩色气泡。",
    spacing: "Use column gutters of 24-32px, strict baselines, thin dividers, and wide reading measures.",
    zhSpacing: "列间距 24-32px，严格基线、细分割线和宽阅读区域。",
    responsive: "Desktop uses columns; tablet narrows metadata into a top strip; mobile preserves reading order with actions under the headline.",
    zhResponsive: "桌面使用分栏；平板把元信息压成顶部条；手机保持阅读顺序，操作放在标题下。",
  },
  "06": {
    buttons: "Use command-style buttons, terminal labels, sharp focus rings, and disabled states that look locked rather than faded away.",
    zhButtons: "使用命令式按钮、终端标签、锐利焦点环，以及像 locked 而不是淡掉的禁用态。",
    feedback: "Use log-line alerts, command output toasts, and inline error rows with exact recovery commands.",
    zhFeedback: "使用日志行提示、命令输出 toast，以及带修复命令的内联错误行。",
    spacing: "Use 12-18px monospace panels, 8-10px log rows, and compact control groups.",
    zhSpacing: "终端面板内边距 12-18px，日志行间距 8-10px，控件组紧凑。",
    responsive: "Desktop keeps console and severity board split; mobile stacks logs first, then metrics, then secondary evidence.",
    zhResponsive: "桌面拆分控制台和严重度面板；手机先显示日志，再显示指标，再显示次级证据。",
  },
  "07": {
    buttons: "Use sticker-like buttons with firm shadows, playful active motion, and high-contrast disabled labels.",
    zhButtons: "使用贴纸感按钮、明确阴影、俏皮按下动效和高对比禁用标签。",
    feedback: "Use friendly shop toasts, cart confirmations, and inline proof states that feel tactile.",
    zhFeedback: "使用友好的商店 toast、购物车确认，以及有触感的内联 proof 状态。",
    spacing: "Use 18-24px playful padding, 12-16px sticker gaps, and irregular but aligned product zones.",
    zhSpacing: "使用 18-24px 俏皮内边距、12-16px 贴纸间距，以及不完全规整但对齐的商品区域。",
    responsive: "Desktop can show builder plus catalog; mobile puts builder first, then product cards, then cart summary.",
    zhResponsive: "桌面显示构建器加目录；手机先构建器，再商品卡，最后购物车摘要。",
  },
  "08": {
    buttons: "Use restrained text buttons or hard-edged outline controls; keep hover/focus precise and quiet.",
    zhButtons: "使用克制文字按钮或硬边描边控件；hover/focus 精确而安静。",
    feedback: "Use sparse status notes, subtle border changes, and no decorative alert noise.",
    zhFeedback: "使用稀疏状态说明、细微边框变化，避免装饰性提示噪声。",
    spacing: "Use large negative space, 28-40px object gutters, and sparse metadata rows.",
    zhSpacing: "使用大面积留白、28-40px 对象间距和稀疏元信息行。",
    responsive: "Desktop may hold an object stage beside notes; mobile places the object first, then proof rows and one clear action.",
    zhResponsive: "桌面可让对象舞台和说明并列；手机先对象，再证明行，最后一个明确操作。",
  },
  "09": {
    buttons: "Use minimal dark primary buttons, quiet secondary actions, clear focus rings, and no decorative button glow.",
    zhButtons: "使用极简深色主按钮、安静次按钮、清晰焦点环，不使用装饰性按钮发光。",
    feedback: "Use plain inline alerts, compact success toasts, and reserved empty states.",
    zhFeedback: "使用朴素内联提示、紧凑成功 toast 和克制空状态。",
    spacing: "Use 24-32px page rhythm, 16px component gaps, and narrow text measures around product proof.",
    zhSpacing: "页面节奏 24-32px，组件间距 16px，产品证明周围文本宽度克制。",
    responsive: "Desktop can be sparse; mobile preserves the single focus object and moves secondary controls below it.",
    zhResponsive: "桌面可稀疏；手机保留单一焦点对象，并把次级控件下移。",
  },
  "10": {
    buttons: "Use high-contrast dark buttons, cinematic hover states, and loading states that feel like render progress.",
    zhButtons: "使用高对比暗色按钮、电影感 hover，以及像渲染进度的加载态。",
    feedback: "Use dark toasts, cost warnings, render-complete confirmations, and visible retry actions.",
    zhFeedback: "使用暗色 toast、成本警告、渲染完成确认和可见重试操作。",
    spacing: "Use 20-28px panels, 14px media gaps, and clear separation between viewer and queue.",
    zhSpacing: "面板内边距 20-28px，媒体间距 14px，查看器和队列清楚分隔。",
    responsive: "Desktop keeps viewer and queue split; mobile shows viewer, primary render action, then queue and budget details.",
    zhResponsive: "桌面拆分查看器和队列；手机先查看器，再主渲染操作，之后队列和预算。",
  },
  "11": {
    buttons: "Use line-based buttons, compact action labels, and focus states that strengthen the rule system.",
    zhButtons: "使用线性按钮、紧凑动作标签，以及增强规则线系统的焦点态。",
    feedback: "Use rule-separated banners, inline audit notes, and visible state chips without soft shadows.",
    zhFeedback: "使用规则线分隔 banner、内联审计说明和可见状态 chip，不用柔阴影。",
    spacing: "Use 20-24px grid gutters, 1px dividers, 12px evidence rows, and strict alignment.",
    zhSpacing: "网格间距 20-24px，1px 分割线，证据行 12px，严格对齐。",
    responsive: "Desktop uses process lanes; mobile turns lanes into ordered cards with the current step and action visible.",
    zhResponsive: "桌面使用流程泳道；手机把泳道变成有序卡片，并显示当前步骤和操作。",
  },
  "12": {
    buttons: "Use touch-friendly filled and tonal buttons, clear selected states, and disabled states that preserve material depth.",
    zhButtons: "使用适合触控的实色和调性按钮、清楚选中态，以及保留材质深度的禁用态。",
    feedback: "Use calm snackbars, inline helper text, and clear routine-complete confirmations.",
    zhFeedback: "使用平静 snackbar、内联帮助文本和清晰日程完成确认。",
    spacing: "Use 24px touch panels, 12-16px list gaps, and comfortable 44-52px controls.",
    zhSpacing: "触控面板 24px，列表间距 12-16px，控件高度 44-52px。",
    responsive: "Desktop can show phone panel and cloud; mobile keeps the daily panel first and converts side content into stacked cards.",
    zhResponsive: "桌面可展示手机面板和信息云；手机先日程面板，侧内容变为堆叠卡片。",
  },
  "13": {
    buttons: "Use compact buttons embedded only where a tile has a job; selected tiles need obvious but not loud treatment.",
    zhButtons: "只在有明确任务的模块内嵌紧凑按钮；选中模块要明显但不吵。",
    feedback: "Use tile-local badges, progress chips, and empty tile states with next actions.",
    zhFeedback: "使用模块内徽章、进度 chip，以及带下一步的空模块状态。",
    spacing: "Use 16px grid gaps, varied tile padding, and stable aspect ratios for visual rhythm.",
    zhSpacing: "网格间距 16px，模块内边距可变化，使用稳定宽高比形成节奏。",
    responsive: "Desktop can use varied tile spans; mobile becomes one column while preserving tile order by importance.",
    zhResponsive: "桌面可使用不同跨度模块；手机变成单列，并按重要性保持模块顺序。",
  },
  "14": {
    buttons: "Use raised and inset tactile buttons, pressed states that sink inward, and loading states that keep the soft surface stable.",
    zhButtons: "使用凸起和内凹触感按钮，按下态向内沉，加载态保持柔和表面稳定。",
    feedback: "Use gentle inset alerts, saved-preset confirmations, and calm validation messages.",
    zhFeedback: "使用柔和内凹提示、预设保存确认和平静校验消息。",
    spacing: "Use 22-30px soft panels, 14-18px mixer gaps, and large tap targets.",
    zhSpacing: "柔和面板内边距 22-30px，混音器间距 14-18px，点击目标要大。",
    responsive: "Desktop can use multiple tactile columns; mobile stacks controls and keeps the active preset near the primary action.",
    zhResponsive: "桌面可使用多列触感控件；手机堆叠控件，并让当前预设靠近主操作。",
  },
  "15": {
    buttons: "Use glass buttons with visible borders, readable labels, and hover states based on tint rather than blur alone.",
    zhButtons: "使用带可见边框的玻璃按钮、可读标签，以及基于色调而不是只靠模糊的 hover。",
    feedback: "Use translucent toasts, map-layer alerts, and readable inline status cards over glass.",
    zhFeedback: "使用半透明 toast、地图层提示，以及玻璃上可读的内联状态卡。",
    spacing: "Use 20-28px glass panels, 14px translucent gaps, and stable backdrops under text.",
    zhSpacing: "玻璃面板 20-28px，透明层间距 14px，文本下方背景稳定。",
    responsive: "Desktop can split map and controls; mobile places controls above the map when the action matters more than ambience.",
    zhResponsive: "桌面可拆分地图和控件；手机在操作更重要时把控件放到地图前。",
  },
  "16": {
    buttons: "Use OS-window buttons, sharp pixel borders, hard active states, and disabled controls that look unavailable in-system.",
    zhButtons: "使用操作系统窗口按钮、锐利像素边框、硬按下态，以及系统内不可用的禁用控件。",
    feedback: "Use window-style alerts, file-status rows, and modal dialogs that feel like old desktop chrome.",
    zhFeedback: "使用窗口式提示、文件状态行，以及像旧桌面 chrome 的弹窗。",
    spacing: "Use 8-14px window chrome spacing, dense file rows, and clear title bars.",
    zhSpacing: "窗口 chrome 间距 8-14px，文件行紧凑，标题栏清楚。",
    responsive: "Desktop can overlap windows; mobile disables overlap and turns windows into stacked panels.",
    zhResponsive: "桌面可重叠窗口；手机取消重叠，窗口变成堆叠面板。",
  },
  "17": {
    buttons: "Use square high-impact buttons, thick borders, blunt hover shifts, and unmistakable disabled/error blocks.",
    zhButtons: "使用方形高冲击按钮、粗边框、直接的 hover 位移，以及非常明确的禁用/错误块。",
    feedback: "Use loud but structured alert slabs, command confirmations, and status rows with strong contrast.",
    zhFeedback: "使用响亮但有结构的提示块、命令确认，以及强对比状态行。",
    spacing: "Use 18-30px collision gaps, oversized slabs, and intentionally uneven but readable groups.",
    zhSpacing: "使用 18-30px 碰撞式间距、大块面板，以及不均衡但可读的分组。",
    responsive: "Desktop can collide panels; mobile removes rotation and turns slabs into a single readable sequence.",
    zhResponsive: "桌面可让面板碰撞；手机取消旋转，块面变成单一可读序列。",
  },
  "18": {
    buttons: "Use precise command buttons, thin glow only on active/focus states, and compact disabled states for technical control.",
    zhButtons: "使用精密命令按钮，只在 active/focus 使用细发光，并为技术控件提供紧凑禁用态。",
    feedback: "Use trace toasts, incident chips, warning rows, and replay confirmations tied to real system state.",
    zhFeedback: "使用 trace toast、incident chip、警告行，以及绑定真实系统状态的 replay 确认。",
    spacing: "Use 16-20px console panels, 8-12px trace rows, and dense tabular metrics.",
    zhSpacing: "控制台面板 16-20px，trace 行 8-12px，指标紧凑且表格数字对齐。",
    responsive: "Desktop keeps graph, trace panel, and queue; mobile shows trace summary, then graph, then queue.",
    zhResponsive: "桌面保留图、trace 面板和队列；手机先 trace 摘要，再图，再队列。",
  },
  "19": {
    buttons: "Use confident gradient or solid buttons, restrained secondary buttons, and progress/loading states that feel like a builder flow.",
    zhButtons: "使用自信的渐变或实色按钮、克制次按钮，以及像构建流程的进度/加载态。",
    feedback: "Use bright publish toasts, checklist warnings, and inline success cards near the stepper.",
    zhFeedback: "使用明亮发布 toast、清单警告，以及靠近 stepper 的内联成功卡。",
    spacing: "Use 20-28px builder panels, 12-16px template gaps, and clear separation between canvas and checklist.",
    zhSpacing: "构建器面板 20-28px，模板间距 12-16px，画布和清单分隔清楚。",
    responsive: "Desktop can show copy, canvas, and checklist; mobile orders them as headline, primary action, canvas, checklist.",
    zhResponsive: "桌面可显示文案、画布和清单；手机顺序为标题、主操作、画布、清单。",
  },
  "20": {
    buttons: "Use warm rounded buttons, gentle hover, kind disabled language, and retry buttons that feel helpful rather than punitive.",
    zhButtons: "使用温暖圆角按钮、温和 hover、有善意的禁用文案，以及不惩罚用户的重试按钮。",
    feedback: "Use encouraging success notes, kind error messages, saved-note toasts, and empty lessons with clear next steps.",
    zhFeedback: "使用鼓励型成功说明、友好错误文案、保存笔记 toast，以及带下一步的空课程状态。",
    spacing: "Use 20-28px friendly panels, 12-16px lesson gaps, and comfortable reading line height.",
    zhSpacing: "友好面板 20-28px，课程间距 12-16px，阅读行高舒适。",
    responsive: "Desktop can show path, practice, and notes; mobile shows practice first, then path, then progress notes.",
    zhResponsive: "桌面可显示路径、练习和笔记；手机先练习，再路径，再进度笔记。",
  },
  "21": {
    buttons: "Use sharp chrome or laser-outline buttons, stable labels, and active states that stay readable under visual distortion.",
    zhButtons: "使用锐利铬面或镭射描边按钮、稳定标签，以及在视觉扭曲下仍可读的 active 状态。",
    feedback: "Use high-contrast signal alerts, archive confirmations, and expired-state warnings without distorting body text.",
    zhFeedback: "使用高对比信号提示、归档确认和过期警告，但不要扭曲正文。",
    spacing: "Use 18-26px experimental slabs, 10-14px shard gaps, and stable anchor zones for controls.",
    zhSpacing: "实验块面 18-26px，碎片间距 10-14px，并为控件保留稳定锚点区域。",
    responsive: "Desktop may be asymmetric and surreal; mobile removes distortion from controls and stacks title, action, media, and shards.",
    zhResponsive: "桌面可不对称且超现实；手机移除控件扭曲，并堆叠标题、操作、媒体和碎片。",
  },
};

function getImplementationProfile(style) {
  return implementationProfiles[style.id] || implementationProfiles["09"];
}

const promptKinds = [
  {
    key: "full",
    promptEn: "Full Prompt",
    promptZh: "完整提示词",
    labelEn: "General",
    labelZh: "通用页面",
    descriptionEn: "Use when the page type is unclear or you want the complete style rule set.",
    descriptionZh: "页面类型还不确定，或需要完整风格规则。",
    copyEn: "Copy General",
    copyZh: "复制通用",
  },
  {
    key: "landing",
    promptEn: "Landing Page",
    promptZh: "落地页",
    labelEn: "Landing",
    labelZh: "落地页",
    descriptionEn: "For public pages, product stories, conversion, proof, and media direction.",
    descriptionZh: "适合官网、产品页、活动页，强调首屏、转化、证明内容和媒体。",
    copyEn: "Copy Landing",
    copyZh: "复制落地页",
  },
  {
    key: "dashboard",
    promptEn: "Dashboard",
    promptZh: "仪表盘",
    labelEn: "Dashboard",
    labelZh: "数据看板",
    descriptionEn: "For metrics, charts, filters, lists, monitoring, and detail panels.",
    descriptionZh: "适合指标、图表、筛选、列表、状态监控和详情面板。",
    copyEn: "Copy Dashboard",
    copyZh: "复制看板",
  },
  {
    key: "admin",
    promptEn: "Admin Panel",
    promptZh: "管理后台",
    labelEn: "Admin",
    labelZh: "管理后台",
    descriptionEn: "For tables, forms, bulk actions, permissions, settings, and recovery flows.",
    descriptionZh: "适合表格、表单、批量操作、权限、设置和异常恢复。",
    copyEn: "Copy Admin",
    copyZh: "复制后台",
  },
  {
    key: "mobile",
    promptEn: "Mobile",
    promptZh: "移动端",
    labelEn: "Mobile",
    labelZh: "移动端",
    descriptionEn: "For mobile-first screens, touch targets, small-screen order, and responsive checks.",
    descriptionZh: "适合移动端优先、触控目标、小屏内容顺序和响应式检查。",
    copyEn: "Copy Mobile",
    copyZh: "复制移动端",
  },
];

const adaptationProfiles = {
  "01": {
    landing: "Use a proof-led product overview with metrics, workflow screenshots, and one calm conversion action; avoid a decorative hero-only page.",
    dashboard: "Use filter rail, metric row, exception cards, owner/status fields, and a right-side inspector for next actions.",
    admin: "Use compact tables, bulk actions, saved views, row-level warnings, and audit-friendly detail drawers.",
    forms: "Use visible labels, compact helper text, short grouped forms, and inline validation close to the affected row.",
    mobile: "Place title, current status, primary action, filter chips, list, then inspector details; avoid squeezing a desktop board.",
    unsuitable: "Weak for expressive fashion, immersive art, or pages that need emotional hero storytelling.",
  },
  "02": {
    landing: "Use a campaign poster, stamped proof, bold offer slab, and one loud call-to-action with hard-edged supporting tickets.",
    dashboard: "Use chunky status slabs and urgent queues only for high-energy launch or moderation dashboards.",
    admin: "Use blunt forms, strong section borders, and obvious destructive confirmation; keep density lower than a neutral admin shell.",
    forms: "Use large labels, hard field borders, poster-like errors, and full-width confirmation blocks.",
    mobile: "Stack slabs in a strong reading order; remove side collisions and keep buttons full-width with no horizontal overflow.",
    unsuitable: "Weak for quiet finance, medical, legal, or long-form reading products.",
  },
  "03": {
    landing: "Use a premium dark product narrative with comparison panels, evidence cards, soft media, and restrained glow.",
    dashboard: "Use model runs, confidence scores, review notes, and selected-state panels rather than generic dark cards.",
    admin: "Use review workflows, validation queues, and low-noise status panels; keep destructive states crisp.",
    forms: "Use translucent field groups over stable dark surfaces with clear focus and validation edges.",
    mobile: "Show score and primary action before media; stack comparison cards with readable text over every panel.",
    unsuitable: "Weak for dense clerical tools or pages that must feel plain and official.",
  },
  "04": {
    landing: "Use a glossy stage, lineup, countdown, signup module, and collectible media fragments.",
    dashboard: "Use launch signals, reminder counts, live badges, and compact activity strips for campaign operations.",
    admin: "Use bright but bounded controls for content scheduling, asset approval, and release checklists.",
    forms: "Use compact glossy fields, visible signup confirmation, and playful but readable validation.",
    mobile: "Sequence headline, media, countdown, signup, lineup, then proof; avoid tiny pills as primary controls.",
    unsuitable: "Weak for serious enterprise workflows or high-trust official services.",
  },
  "05": {
    landing: "Use editorial columns, rule lines, captions, proof excerpts, and understated text actions.",
    dashboard: "Use index tables, metadata columns, and structured evidence rather than cards.",
    admin: "Use form sections, audit rows, legal/procurement evidence blocks, and rule-line navigation.",
    forms: "Use persistent labels, narrow measures, divider-separated validation, and underlined actions.",
    mobile: "Preserve reading order: headline, metadata, action, article body, index; avoid hidden sidebars.",
    unsuitable: "Weak for playful commerce, heavy animation, or highly visual immersive demos.",
  },
  "06": {
    landing: "Use terminal output, command examples, severity proof, and a clear install or run action.",
    dashboard: "Use log streams, severity filters, health metrics, command results, and incident queues.",
    admin: "Use CLI-like settings, permission warnings, and exact recovery commands for technical operators.",
    forms: "Use command labels, sharp focus rings, monospace helper text, and exact error recovery.",
    mobile: "Show logs first, then metrics and recovery actions; keep command snippets wrap-safe.",
    unsuitable: "Weak for consumer lifestyle, soft wellness, or image-led brand storytelling.",
  },
  "07": {
    landing: "Use a playful product builder, sticker-like media, price/proof tags, and a friendly cart action.",
    dashboard: "Use creator shop metrics, order states, fulfillment cards, and tactile product previews.",
    admin: "Use readable commerce controls, variant forms, inventory warnings, and friendly confirmation states.",
    forms: "Use chunky labels, tactile inputs, high-contrast validation, and clear cart/save feedback.",
    mobile: "Put builder first, then product cards, cart summary, and proof; keep playful elements from crowding controls.",
    unsuitable: "Weak for sober B2B, dense analytics, or official documentation portals.",
  },
  "08": {
    landing: "Use one object, one message, sparse proof rows, and a restrained action with premium whitespace.",
    dashboard: "Use only for high-end monitoring or portfolio dashboards where a single object/state matters most.",
    admin: "Use sparse review panels, minimal metadata, and precise outline controls; avoid dense bulk workflows.",
    forms: "Use few fields, large whitespace, clear labels, and quiet validation with strong contrast.",
    mobile: "Place object first, then proof rows and one action; avoid long multi-column content.",
    unsuitable: "Weak for operational tools that need many visible controls at once.",
  },
  "09": {
    landing: "Use a focused product brief with one central proof object, concise copy, and quiet secondary links.",
    dashboard: "Use clean metrics, simple lists, small charts, and generous whitespace around the main decision.",
    admin: "Use orderly forms, tables, and settings pages with minimal decoration and strong alignment.",
    forms: "Use simple labels, compact helper text, precise focus rings, and calm error states.",
    mobile: "Keep one focus object, primary action, then details; move secondary controls below content.",
    unsuitable: "Weak for brands that need strong personality or dramatic visual storytelling.",
  },
  "10": {
    landing: "Use a cinematic viewer, render proof, budget/status warnings, and one bright primary action.",
    dashboard: "Use render queues, review states, media thumbnails, failure badges, and retry actions.",
    admin: "Use dark production controls, batch review tables, and visible cost/error states.",
    forms: "Use dark fields, high-contrast labels, stable loading buttons, and retry-focused errors.",
    mobile: "Show viewer, primary action, queue, then budget and errors; avoid hiding retry actions.",
    unsuitable: "Weak for text-heavy documentation or low-contrast casual reading.",
  },
  "11": {
    landing: "Use a structured process map, evidence panels, and precise conversion actions.",
    dashboard: "Use workflow lanes, tables, audit evidence, status chips, and rule-based grouping.",
    admin: "Use B2B forms, approval tables, permissions, and line-separated validation.",
    forms: "Use strict alignment, visible labels, compact errors, and clear section dividers.",
    mobile: "Turn lanes into ordered cards with current step and action visible before evidence.",
    unsuitable: "Weak for playful campaigns or pages that need emotional softness.",
  },
  "12": {
    landing: "Use layered product surfaces, touch-friendly proof cards, and calm utility storytelling.",
    dashboard: "Use large touch panels, routine cards, tonal status surfaces, and comfortable controls.",
    admin: "Use settings, forms, and utility dashboards where clarity and touch targets matter.",
    forms: "Use filled and tonal inputs, clear helper text, calm snackbars, and large touch targets.",
    mobile: "Put the daily or utility panel first; convert side content into stacked cards.",
    unsuitable: "Weak for hard-edged technical consoles or editorial layouts that need strict rules.",
  },
  "13": {
    landing: "Use uneven tiles where each block has a job: proof, media, quote, stat, timeline, and action.",
    dashboard: "Use modular status tiles, varied spans, local actions, and progress badges.",
    admin: "Use admin only when modules are independent; avoid forcing dense tables into bento tiles.",
    forms: "Use forms inside purposeful tiles with local validation and stable tile dimensions.",
    mobile: "Collapse to one column while preserving tile order by importance.",
    unsuitable: "Weak for long tables, legal documents, or workflows needing strict linear review.",
  },
  "14": {
    landing: "Use tactile controls, session state, presets, and soft proof for calm utility products.",
    dashboard: "Use knobs, sliders, preset pads, active layers, and session meters rather than card grids.",
    admin: "Use sparingly for small settings tools; keep contrast and state clarity higher than the soft surface.",
    forms: "Use inset fields, raised buttons, calm validation, and large tap targets.",
    mobile: "Stack controls, keep active preset near the primary action, and avoid dense tables.",
    unsuitable: "Weak for dense admin systems, long documents, or high-alert operational products.",
  },
  "15": {
    landing: "Use a glass map or spatial product story with readable translucent panels and stable media backdrops.",
    dashboard: "Use signal layers, selected rooms, map pins, translucent controls, and readable alerts.",
    admin: "Use for premium spatial tools, not conventional back-office CRUD unless the map/object is central.",
    forms: "Use glass fields only over stable surfaces; focus and errors need visible borders and text.",
    mobile: "Place controls above ambience when action matters; keep glass panels readable over every background.",
    unsuitable: "Weak for low-power devices, accessibility-critical dense forms, or plain official portals.",
  },
  "16": {
    landing: "Use retro windows, title bars, file lists, and a playful install/play action.",
    dashboard: "Use overlapping desktop windows for music, files, queues, and system-style status.",
    admin: "Use only for themed tools; make file states, dialogs, and buttons feel intentionally old-system.",
    forms: "Use title-bar groups, pixel borders, system alerts, and sharp validation states.",
    mobile: "Disable window overlap and turn windows into stacked panels with clear title bars.",
    unsuitable: "Weak for serious finance, healthcare, or modern premium SaaS.",
  },
  "17": {
    landing: "Use collision panels, giant type, command proof, and high-impact install or launch actions.",
    dashboard: "Use brutal status walls, issue queues, benchmark slabs, and unmistakable warnings.",
    admin: "Use for bold developer/internal tools; keep forms blocky, explicit, and lower density.",
    forms: "Use square controls, thick borders, direct labels, and loud but structured errors.",
    mobile: "Remove rotation/collision, stack slabs, and keep controls large and readable.",
    unsuitable: "Weak for quiet trust, long reading, or restrained enterprise procurement.",
  },
  "18": {
    landing: "Use a precise technical product story with graph, traces, incidents, and command action.",
    dashboard: "Use graph console, trace list, compact metrics, incident chips, and replay controls.",
    admin: "Use for technical SaaS operations, issue triage, observability, and workflow replay.",
    forms: "Use compact dark inputs, command buttons, exact validation, and visible focused edges.",
    mobile: "Show trace summary, graph, queue, and replay action in that order.",
    unsuitable: "Weak for soft consumer brands or pages needing warmth over precision.",
  },
  "19": {
    landing: "Use a bright builder narrative with live canvas, stepper, checklist, and publish action.",
    dashboard: "Use activation metrics, template states, progress cards, and publish readiness checks.",
    admin: "Use for creator/admin builders, content setup, template management, and launch checklists.",
    forms: "Use colorful but restrained inputs, progress validation, checklist warnings, and success cards.",
    mobile: "Order as headline, primary action, canvas, checklist, then supporting proof.",
    unsuitable: "Weak for restrained legal, formal docs, or very dense reporting dashboards.",
  },
  "20": {
    landing: "Use friendly learning story, progress path, saved notes, and encouraging primary action.",
    dashboard: "Use practice cards, lesson paths, note stacks, streaks, and kind retry states.",
    admin: "Use for education/community tools, not dense finance or strict enterprise approvals.",
    forms: "Use readable labels, kind errors, saved-note toasts, and comfortable line height.",
    mobile: "Show practice first, then path, then notes; keep touch targets generous.",
    unsuitable: "Weak for severe incidents, high-density analytics, or luxury minimal portfolios.",
  },
  "21": {
    landing: "Use experimental title, chrome media, laser cuts, stable nav anchors, and a readable entry action.",
    dashboard: "Use only for expressive live signal or archive surfaces with strong stable control zones.",
    admin: "Use sparingly; critical forms and tables must be distortion-free and high contrast.",
    forms: "Use sharp fields, clear labels, no text distortion, and high-contrast expired/error states.",
    mobile: "Remove distortion from controls and stack title, action, media, and shards.",
    unsuitable: "Weak for accessibility-critical admin, long copy, or conservative institutional products.",
  },
};

function getAdaptationProfile(style) {
  return adaptationProfiles[style.id] || adaptationProfiles["09"];
}

function buildScenarioFocus(style, lang, kind) {
  const adaptation = getAdaptationProfile(style);
  const prefix = lang === "zh" ? "场景重点" : "Scenario focus";
  const lines = {
    full: lang === "zh"
      ? [
          `页面适配：落地页可用 ${adaptation.landing}`,
          `仪表盘适配：${adaptation.dashboard}`,
          `后台适配：${adaptation.admin}`,
          `表单/数据适配：${adaptation.forms}`,
          `移动端适配：${adaptation.mobile}`,
          `不适合：${adaptation.unsuitable}`,
        ]
      : [
          `Landing adaptation: ${adaptation.landing}`,
          `Dashboard adaptation: ${adaptation.dashboard}`,
          `Admin adaptation: ${adaptation.admin}`,
          `Forms/data adaptation: ${adaptation.forms}`,
          `Mobile adaptation: ${adaptation.mobile}`,
          `Avoid for: ${adaptation.unsuitable}`,
        ],
    landing: lang === "zh"
      ? [
          `落地页重点：${adaptation.landing}`,
          `首屏必须明确品牌/产品、核心承诺、主转化动作、证明内容和媒体方向。`,
          `不要把完整页面做成通用 hero + 三张功能卡；根据产品叙事安排证据、流程、客户证明或产品视觉。`,
        ]
      : [
          `Landing page focus: ${adaptation.landing}`,
          `First viewport must establish the product, literal offer, primary conversion action, proof, and media direction.`,
          `Avoid the generic hero plus three feature cards; arrange proof, workflow, testimonials, or product visuals around the real offer.`,
        ],
    dashboard: lang === "zh"
      ? [
          `仪表盘重点：${adaptation.dashboard}`,
          `优先呈现筛选、指标、列表/表格、详情面板、状态和下一步操作。`,
          `不要把运营页面改成营销首屏；核心对象、当前状态和主操作必须在首屏可见。`,
        ]
      : [
          `Dashboard focus: ${adaptation.dashboard}`,
          `Prioritize filters, metrics, lists/tables, detail panels, state, and next actions.`,
          `Do not turn an operational screen into a marketing hero; keep the primary object, current state, and main action visible.`,
        ],
    admin: lang === "zh"
      ? [
          `管理后台重点：${adaptation.admin}`,
          `强调导航、表格/表单、批量操作、权限、错误、空状态、保存和撤销反馈。`,
          `控制装饰强度，让重复操作、扫描、比较和修复路径更清楚。`,
        ]
      : [
          `Admin panel focus: ${adaptation.admin}`,
          `Emphasize navigation, tables/forms, bulk actions, permissions, errors, empty states, save feedback, and undo paths.`,
          `Restrain decoration so repeated action, scanning, comparison, and recovery paths stay clear.`,
        ],
    mobile: lang === "zh"
      ? [
          `移动端重点：${adaptation.mobile}`,
          `先定义标题、当前状态、主操作、筛选、主体内容、辅助证据和二级操作的顺序。`,
          `触控目标、底部操作、折叠面板、表格替代方案和安全区域必须明确；不要硬挤桌面网格。`,
        ]
      : [
          `Mobile focus: ${adaptation.mobile}`,
          `Define the order for title, current status, primary action, filters, main content, supporting proof, and secondary actions.`,
          `Specify touch targets, bottom actions, collapsible panels, table fallbacks, and safe areas; do not squeeze desktop grids.`,
        ],
  };
  return [`${prefix}:`, ...lines[kind] || lines.full];
}

function buildStylePrompt(style, lang = "en", kind = "full") {
  const label = style.label || `Style ${style.id}`;
  const scenario = getScenario(style);
  const playbook = getStylePlaybook(style);
  const geometry = getGeometryProfile(style);
  const implementation = getImplementationProfile(style);
  const scenarioFocus = buildScenarioFocus(style, lang, kind);

  if (lang === "zh") {
    return [
      `使用 awesome-page-design ${label} - ${style.name}（${style.zhName}）作为页面设计方向。`,
      `提示词类型：${promptKinds.find((item) => item.key === kind)?.promptZh || "完整提示词"}。`,
      `适用页面：${style.zhBestFor}。`,
      `目标气质：${style.zhBrief}`,
      ...scenarioFocus,
      `布局原型：${playbook.zhName}。`,
      `布局结构：${playbook.zhStructure}`,
      `布局适配：先根据用户真实任务定义主要内容对象、顶层区域、主操作模型、信息密度和响应式折叠，再应用该风格；保留布局原型的结构身份，但不要复制示例页。`,
      `颜色 token：背景 ${style.bg}；表面 ${style.surface}；正文 ${style.text}；弱化文本 ${style.muted}；主色 ${style.primary}；强调色 ${style.accent}；边框 ${style.border}；圆角 ${style.radius}；阴影/材质 ${style.shadow}。`,
      `几何规则：面板圆角 ${geometry.panel}；控件圆角 ${geometry.control}；标签/状态圆角 ${geometry.chip}；媒体容器圆角 ${geometry.media}。避免把所有按钮和卡片做成同一种大圆角或胶囊形。`,
      `排版规则：${playbook.zhTypography}`,
      `组件规则：${playbook.zhComponents}`,
      `按钮规则：${playbook.zhButtons}`,
      `按钮细节：${implementation.zhButtons}`,
      `提示与反馈：${implementation.zhFeedback}`,
      `间距系统：${implementation.zhSpacing}`,
      `响应式策略：${implementation.zhResponsive}`,
      `图标与媒体：${playbook.zhMedia}`,
      `状态规则：${playbook.zhStates}`,
      `组件状态矩阵：为出现的按钮、链接、输入、筛选、卡片、列表、表格、弹窗、抽屉、空状态、错误状态、加载状态、禁用状态、选中状态、警告状态和成功状态定义可见且风格一致的表现。`,
      `动效规则：动效必须表达进入、离开、展开、加载、对象连续性、列表重排或进度变化；避免 transition: all，并提供 reduced-motion 降级。`,
      `实现验收：使用语义控件；图标按钮要有可访问名称；所有可交互元素要有 focus-visible；媒体要有稳定尺寸或 aspect-ratio；长文本要有换行、截断或 clamp；空/错/加载状态要说明下一步。`,
      `示例内容方向：可参考“${scenario.brand} / ${scenario.eyebrow}”这类具体工作流，但必须替换成用户真实产品、真实信息架构和真实文案。`,
      `设计 dials：根据用户产品设置布局变化度、动效强度和信息密度；不要默认套用示例页结构。`,
      `禁止事项：${playbook.zhAvoid} 不要复制示例 HTML、示例品牌、示例文案或示例布局；不要只换颜色；不要生成通用 AI 味的 hero + 三卡片页面。`,
      `交付前检查：桌面和移动端截图、文本不溢出、按钮/输入/卡片/表格/弹窗/空状态/错误/加载/禁用/焦点/选中/成功状态都符合该风格，并通过实现验收规则。`,
    ].join("\n");
  }

  return [
    `Use awesome-page-design ${label} - ${style.name} as the page design direction.`,
    `Prompt type: ${promptKinds.find((item) => item.key === kind)?.promptEn || "Full Prompt"}.`,
    `Best fit: ${style.bestFor}.`,
    `Visual mood: ${style.brief}`,
    ...scenarioFocus,
    `Layout archetype: ${playbook.name}.`,
    `Layout structure: ${playbook.structure}`,
    `Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.`,
    `Color tokens: background ${style.bg}; surface ${style.surface}; text ${style.text}; muted ${style.muted}; primary ${style.primary}; accent ${style.accent}; border ${style.border}; radius ${style.radius}; shadow/material ${style.shadow}.`,
    `Geometry: panel radius ${geometry.panel}; control radius ${geometry.control}; chip/state radius ${geometry.chip}; media radius ${geometry.media}. Avoid making every button and card the same large rounded rectangle or pill.`,
    `Typography: ${playbook.typography}`,
    `Components: ${playbook.components}`,
    `Buttons: ${playbook.buttons}`,
    `Button details: ${implementation.buttons}`,
    `Feedback and alerts: ${implementation.feedback}`,
    `Spacing system: ${implementation.spacing}`,
    `Responsive behavior: ${implementation.responsive}`,
    `Icons and media: ${playbook.media}`,
    `States: ${playbook.states}`,
    `Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.`,
    `Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.`,
    `Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.`,
    `Example content direction: you may use the specificity of "${scenario.brand} / ${scenario.eyebrow}" as inspiration, but replace it with the user's real product, real information architecture, and real copy.`,
    `Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.`,
    `Do not: ${playbook.avoid} Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.`,
    `Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.`,
  ].join("\n");
}

const removedStyleSlugs = [];

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

function ensureCleanDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

function renderMetrics(metrics) {
  return metrics
    .map(([value, label]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(label)}</span>`)
    .join("");
}

function renderFeatureCards(features) {
  return features
    .map(
      ([title, body], index) =>
        `<article class="feature"><b>${String(index + 1).padStart(2, "0")}</b><h3>${escapeHtml(title)}</h3><p>${escapeHtml(body)}</p></article>`
    )
    .join("");
}

function renderQueueRows(queue) {
  return queue
    .map(
      ([title, state]) =>
        `<button type="button" data-open-modal><b>${escapeHtml(title)}</b><span>${escapeHtml(state)}</span></button>`
    )
    .join("");
}

function renderBars(seed) {
  const bars = {
    "01": [74, 52, 88, 64, 93, 72, 58],
    "02": [92, 54, 78, 100, 61, 86, 69],
    "03": [48, 78, 64, 92, 84, 56, 72],
    "04": [56, 92, 76, 68, 98, 62, 88],
    "05": [82, 44, 70, 52, 88, 60, 76],
    "06": [36, 58, 44, 92, 50, 74, 66],
    "07": [66, 86, 58, 96, 72, 62, 84],
    "08": [42, 50, 38, 74, 46, 62, 54],
    "09": [52, 64, 48, 80, 58, 74, 60],
    "10": [72, 46, 88, 64, 52, 96, 78],
    "11": [58, 78, 62, 86, 70, 54, 90],
    "12": [64, 76, 58, 84, 68, 92, 74],
    "13": [82, 56, 96, 44, 74, 62, 88],
    "14": [40, 52, 64, 76, 58, 46, 70],
    "15": [62, 88, 54, 94, 72, 66, 84],
    "16": [70, 42, 82, 54, 92, 64, 76],
    "17": [96, 62, 84, 52, 100, 70, 88],
    "18": [76, 58, 94, 66, 82, 48, 90],
    "19": [68, 94, 72, 86, 58, 100, 80],
    "20": [54, 72, 48, 82, 60, 78, 66],
    "21": [90, 48, 100, 56, 82, 64, 94],
  };
  return (bars[seed] || bars["01"]).map((height) => `<i style="height:${height}%"></i>`).join("");
}

function renderScene(style, scenario) {
  return `<div class="media scene-${escapeHtml(scenario.scene)}" role="img" aria-label="${escapeHtml(scenario.mediaLabel)}">
          <span class="scene-orb orb-a"></span>
          <span class="scene-orb orb-b"></span>
          <span class="scene-line line-a"></span>
          <span class="scene-line line-b"></span>
          <span class="scene-chip chip-a">${escapeHtml(style.id)}</span>
          <span class="scene-chip chip-b">${escapeHtml(scenario.metrics[0][0])}</span>
          <span class="scene-card card-a"></span>
          <span class="scene-card card-b"></span>
          <span class="scene-card card-c"></span>
        </div>`;
}

function renderDetailItems(items) {
  return items
    .map((item) => `<span>${escapeHtml(item)}</span>`)
    .join("");
}

function renderMetricTiles(metrics) {
  return metrics
    .map(([value, label]) => `<div class="metric-tile"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></div>`)
    .join("");
}

function renderBentoStats(metrics) {
  return metrics
    .map(([value, label]) => `<span class="bento-stat"><strong>${escapeHtml(value)}</strong><em>${escapeHtml(label)}</em></span>`)
    .join("");
}

function renderQueueCards(queue) {
  return queue
    .map(([title, state]) => `<button type="button" class="queue-card" data-open-modal><b>${escapeHtml(title)}</b><span>${escapeHtml(state)}</span></button>`)
    .join("");
}

function renderFeatureBlocks(features) {
  return features
    .map(([title, body], index) => `<article class="feature-block"><span>${String(index + 1).padStart(2, "0")}</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(body)}</p></article>`)
    .join("");
}

function renderMiniNav(style, scenario) {
  return `<nav class="top-nav" aria-label="Example navigation">
      <a class="brand-lockup" href="#top"><span>${escapeHtml(style.id)}</span><b>${escapeHtml(scenario.brand)}</b></a>
      <div class="nav-links">${scenario.nav.map((item) => `<a href="#details">${escapeHtml(item)}</a>`).join("")}</div>
      <button type="button" class="ghost-action" data-open-modal>Style notes</button>
    </nav>`;
}

function renderStyleLab(style, scenario, playbook, related) {
  const detailItems = renderDetailItems([
    playbook.name,
    playbook.buttons,
    playbook.states,
  ]);

  return `<section id="details" class="style-lab">
      <div class="lab-summary">
        <p class="kicker">${escapeHtml(playbook.name)} · ${escapeHtml(playbook.zhName)}</p>
        <h2>${escapeHtml(playbook.name)} in practice.</h2>
        <p>${escapeHtml(playbook.structure)}</p>
        <div class="detail-pills">${detailItems}</div>
      </div>
      <div class="lab-workspace">
        <div class="tabs" role="tablist" aria-label="Demo tabs">
          <button type="button" class="active" role="tab" aria-selected="true" data-tab="launch">Launch</button>
          <button type="button" role="tab" aria-selected="false" data-tab="metrics">Metrics</button>
          <button type="button" role="tab" aria-selected="false" data-tab="assets">Assets</button>
        </div>
        <div class="workspace-grid">
          <article class="panel">
            <h3 data-demo-title>${escapeHtml(scenario.tabs.launch[0])}</h3>
            <p data-demo-copy>${escapeHtml(scenario.tabs.launch[1])}</p>
            <div class="chart" aria-hidden="true">${renderBars(style.id)}</div>
          </article>
          <aside class="panel">
            <h3>Action queue</h3>
            <div class="queue-list">${renderQueueCards(scenario.queue)}</div>
          </aside>
        </div>
        <div class="related">${related}</div>
      </div>
    </section>`;
}

function renderInteractionDemo(style, scenario, playbook) {
  const implementation = getImplementationProfile(style);
  const implementationItems = [
    ["Buttons", implementation.buttons],
    ["Feedback", implementation.feedback],
    ["Spacing", implementation.spacing],
    ["Responsive", implementation.responsive],
  ]
    .map(([title, body]) => `<li><b>${escapeHtml(title)}</b><span>${escapeHtml(body)}</span></li>`)
    .join("");

  return `<section class="interaction-demo" aria-labelledby="interaction-title-${style.id}">
      <div class="interaction-copy">
        <p class="kicker">Component behavior</p>
        <h2 id="interaction-title-${style.id}">Buttons, feedback, spacing, and responsive rules.</h2>
        <p>${escapeHtml(playbook.components)}</p>
        <ul class="implementation-list">${implementationItems}</ul>
      </div>
      <div class="state-board">
        <div class="state-board-head">
          <span>${escapeHtml(scenario.brand)}</span>
          <strong>${escapeHtml(scenario.metrics[0][0])}</strong>
        </div>
        <div class="button-row" aria-label="Button state examples">
          <button type="button" class="primary-action" data-toast-trigger>${escapeHtml(scenario.primaryAction)}</button>
          <button type="button" class="secondary-action loading-action" data-loading-demo>Save state</button>
          <button type="button" class="secondary-action" disabled>Disabled</button>
          <button type="button" class="toggle-chip" aria-pressed="false" data-toggle-demo>Filter off</button>
        </div>
        <div class="inline-alert warning" data-inline-alert role="status">
          <b>State warning</b>
          <span>${escapeHtml(scenario.queue[0][0])}: ${escapeHtml(scenario.queue[0][1])}. ${escapeHtml(implementation.feedback)}</span>
        </div>
        <label class="field-group" for="demo-input-${style.id}">
          <span>Visible label</span>
          <input id="demo-input-${style.id}" type="text" value="${escapeHtml(scenario.queue[1][0])}" aria-describedby="field-help-${style.id}" data-demo-input>
          <small id="field-help-${style.id}" data-field-help>Helper text stays visible after the field is filled.</small>
        </label>
        <div class="state-stack" aria-label="Common product states">
          <span class="state-pill success"><b>Success</b>Saved and ready for review.</span>
          <span class="state-pill loading"><b>Loading</b>Preserve the layout while data refreshes.</span>
          <span class="state-pill empty"><b>Empty</b>No matching results; clear filters or create one.</span>
          <span class="state-pill error"><b>Error</b>Retry with a clear recovery action.</span>
        </div>
        <div class="responsive-steps" aria-label="Responsive behavior">
          <span><b>Desktop</b>Show the full layout archetype with supporting panels.</span>
          <span><b>Tablet</b>Collapse secondary panels without losing state.</span>
          <span><b>Mobile</b>${escapeHtml(implementation.responsive)}</span>
        </div>
      </div>
    </section>`;
}

function renderLayoutContent(style, scenario, playbook) {
  const label = style.label || `Style ${style.id}`;
  const metrics = renderMetricTiles(scenario.metrics);
  const queue = renderQueueCards(scenario.queue);
  const features = renderFeatureBlocks(scenario.features);
  const bars = renderBars(style.id);

  switch (playbook.layout) {
    case "ops-board":
      return `<section class="ops-board">
        <aside class="filter-rail">
          <b>${escapeHtml(label)}</b>
          <span class="rail-active">Exceptions</span>
          <span>Owner</span>
          <span>Priority</span>
          <span>Status</span>
          <span>Due window</span>
        </aside>
        <div class="board-main">
          <header class="board-toolbar">
            <div>
              <p class="kicker">${escapeHtml(scenario.brand)}</p>
              <h1>${escapeHtml(scenario.eyebrow)}</h1>
              <p>${escapeHtml(scenario.lede)}</p>
            </div>
            <div class="toolbar-actions">
              <button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
              <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
            </div>
          </header>
          <div class="metric-row">${metrics}</div>
          <div class="ticket-grid">
            <div class="ticket-list">
              <article class="ticket-card priority"><b>${escapeHtml(scenario.queue[0][0])}</b><p>${escapeHtml(scenario.features[0][1])}</p><span>${escapeHtml(scenario.queue[0][1])}</span></article>
              <article class="ticket-card"><b>${escapeHtml(scenario.queue[1][0])}</b><p>${escapeHtml(scenario.features[1][1])}</p><span>${escapeHtml(scenario.queue[1][1])}</span></article>
              <article class="ticket-card"><b>${escapeHtml(scenario.queue[2][0])}</b><p>${escapeHtml(scenario.features[2][1])}</p><span>${escapeHtml(scenario.queue[2][1])}</span></article>
            </div>
            <aside class="board-inspector">
              <h3>Action queue</h3>
              <div class="queue-list">${queue}</div>
              <div class="chart">${bars}</div>
            </aside>
          </div>
        </div>
      </section>`;
    case "street-poster":
      return `<section class="street-poster">
        <div class="poster-copy">
          <p class="kicker">${escapeHtml(label)} · ${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="poster-actions"><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button><button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button></div>
        </div>
        <aside class="poster-stack">
          <div class="stamp big">${escapeHtml(scenario.metrics[0][0])}</div>
          <div class="ticket-strip">${scenario.queue.map(([title, state]) => `<span><b>${escapeHtml(state)}</b>${escapeHtml(title)}</span>`).join("")}</div>
          <div class="rule-panel">${features}</div>
        </aside>
      </section>`;
    case "aurora-lab":
      return `<section class="aurora-lab">
        <div class="lab-copy">
          <p class="kicker">${escapeHtml(label)} · ${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="signal-stats">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div>
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
        </div>
        <div class="run-compare">
          ${scenario.metrics.map(([value], index) => `<article class="${index === 1 ? "selected" : ""}"><div class="run-head"><span>Run ${["A", "B", "C"][index]}</span><b>${escapeHtml(value)}</b></div><p>${escapeHtml(scenario.features[index][0])}</p><div class="score-row" style="--score:${[72, 88, 64][index]}%"><span>${["Confidence", "Readable", "Decision"][index]}</span><i></i><em>${["Stable", "Selected", "Needs note"][index]}</em></div></article>`).join("")}
        </div>
        <aside class="evidence-canvas">${renderScene(style, scenario)}<div class="review-note"><b>Reviewer notes</b>${scenario.queue.map(([title, state]) => `<span><em>${escapeHtml(state)}</em>${escapeHtml(title)}</span>`).join("")}</div></aside>
      </section>`;
    case "y2k-stage":
      return `<section class="y2k-stage">
        <div class="marquee">${scenario.nav.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
        <div class="drop-console">
          <article class="release-player">
            <div class="disc">${escapeHtml(style.id)}</div>
            <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
            <h1>${escapeHtml(scenario.headline)}</h1>
            <p>${escapeHtml(scenario.lede)}</p>
            <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
          </article>
          <aside class="drop-panel">
            <h3>Drop control</h3>
            <div class="countdown-grid">${metrics}</div>
            <div class="drop-list">${scenario.queue.map(([title, state], index) => `<button type="button" data-open-modal><span>0${index + 1}</span><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></button>`).join("")}</div>
            <button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
          </aside>
          <div class="track-strip">
            ${scenario.queue.map(([title, state], index) => `<article><b>Track ${index + 1}</b><span>${escapeHtml(title)}</span><em>${escapeHtml(state)}</em></article>`).join("")}
          </div>
        </div>
      </section>`;
    case "editorial-index":
      return `<section class="editorial-index">
        <aside class="editorial-meta">
          <b>${escapeHtml(label)}</b>
          ${scenario.metrics.map(([value, text]) => `<span>${escapeHtml(value)} / ${escapeHtml(text)}</span>`).join("")}
          <button type="button" class="text-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
        </aside>
        <article class="editorial-lead">
          <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
        </article>
        <div class="index-column">${features}</div>
      </section>`;
    case "terminal-console":
      return `<section class="terminal-console">
        <div class="terminal-window">
          <div class="terminal-bar"><span>scan.sh</span><button type="button" data-copy>${escapeHtml(scenario.primaryAction)}</button></div>
          <p class="prompt-line">$ ${escapeHtml(scenario.headline)}</p>
          <div class="log-lines">
            ${scenario.queue.map(([title, state]) => `<button type="button" data-open-modal><code>${escapeHtml(state.toLowerCase())}</code><span>${escapeHtml(title)}</span></button>`).join("")}
          </div>
        </div>
        <aside class="severity-board">
          <p class="kicker">${escapeHtml(label)} · ${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.brand)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="metric-row">${metrics}</div>
        </aside>
      </section>`;
    case "sticker-shop":
      return `<section class="sticker-shop">
        <aside class="pack-builder">
          <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="sticker-preview-grid" aria-hidden="true">
            <span></span><span></span><span></span><span></span><span></span><span></span>
          </div>
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
        </aside>
        <div class="shop-catalog">
          ${scenario.queue.map(([title, state], index) => `<article class="product-card sticker-${index + 1}"><div class="sticker-thumb"><span></span><span></span><span></span></div><b>${escapeHtml(title)}</b><p>${["12 die-cut stickers", "Matte print sheet", "Homepage hero art"][index]}</p><div><strong>${["$18", "$26", "$14"][index]}</strong><em>${escapeHtml(state)}</em></div></article>`).join("")}
          <aside class="cart-summary"><h3>Shop window</h3><div class="metric-row">${metrics}</div><button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button></aside>
        </div>
      </section>`;
    case "stark-portfolio":
      return `<section class="stark-portfolio">
        <aside class="stark-meta">
          <p class="kicker">${escapeHtml(label)}</p>
          ${scenario.nav.map((item) => `<a href="#details">${escapeHtml(item)}</a>`).join("")}
        </aside>
        <div class="object-stage">${renderScene(style, scenario)}<div class="object-strip">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div></div>
        <article class="stark-copy">
          <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="stark-proof">${scenario.queue.map(([title, state]) => `<span><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></span>`).join("")}</div>
          <button type="button" class="text-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
          <div class="stark-details"><span><b>Material</b>Matte object study</span><span><b>Access</b>Invite-only preview</span><span><b>Signal</b>Inquiry received</span></div>
        </article>
      </section>`;
    case "minimal-brief":
      return `<section class="minimal-brief">
        <aside class="brief-sidebar">
          <b>${escapeHtml(scenario.brand)}</b>
          ${scenario.nav.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
          <div class="metric-row">${metrics}</div>
        </aside>
        <article class="document-surface brief-editor">
          <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="editor-toolbar"><span>Owner note</span><span>Risk</span><span>Decision</span><button type="button" data-copy>${escapeHtml(scenario.primaryAction)}</button></div>
          <div class="brief-body">
            <section><b>Decision</b><p>Ship the onboarding copy update after legal confirms the pricing note.</p></section>
            <section><b>Risk</b><p>Two launch notes still need owner review before Friday summary.</p></section>
            <section><b>Next action</b><p>Convert the approved research bullets into the final weekly brief.</p></section>
          </div>
        </article>
        <aside class="comment-stack decision-stack">
          <h3>Review queue</h3>
          ${queue}
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
        </aside>
      </section>`;
    case "dark-render":
      return `<section class="dark-render">
        <div class="frame-viewer">
          <p class="kicker">${escapeHtml(label)} · ${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <div class="frame-art">${renderScene(style, scenario)}</div>
          <div class="film-strip">${scenario.metrics.map(([value, text]) => `<span><b>${escapeHtml(value)}</b>${escapeHtml(text)}</span>`).join("")}</div>
          <div class="shot-strip">${scenario.queue.map(([title, state], index) => `<span><b>0${index + 1}</b>${escapeHtml(title)}<em>${escapeHtml(state)}</em></span>`).join("")}</div>
        </div>
        <aside class="render-queue">
          <p>${escapeHtml(scenario.lede)}</p>
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
          <div class="render-budget"><strong>${escapeHtml(scenario.metrics[2][0])}</strong><span>${escapeHtml(scenario.metrics[2][1])}</span><i></i></div>
          <div class="queue-list">${queue}</div>
          <div class="render-checks"><b>Review checks</b><span>Mask edge<strong>Needs fix</strong></span><span>Poster crop<strong>Approved</strong></span><span>Cost guard<strong>Active</strong></span></div>
        </aside>
      </section>`;
    case "line-workflow":
      return `<section class="line-workflow">
        <header class="workflow-head">
          <p class="kicker">${escapeHtml(label)} · ${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
        </header>
        <div class="process-map">
          ${scenario.queue.map(([title, state], index) => `<article><span>0${index + 1}</span><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em><p>${["Legal owner confirms language and evidence.", "Finance checks discount impact and due date.", "Audit package exports with immutable record."][index]}</p></article>`).join("")}
        </div>
        <aside class="evidence-panel"><h3>Audit evidence</h3><p>${escapeHtml(scenario.lede)}</p><div class="metric-row">${metrics}</div><div class="evidence-list">${scenario.features.map(([title], index) => `<span><b>${String(index + 1).padStart(2, "0")}</b>${escapeHtml(title)}</span>`).join("")}</div></aside>
      </section>`;
    case "material-day":
      return `<section class="material-day">
        <div class="phone-panel daily-panel">
          <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <div class="day-chip"><b>Today</b><span>3 focus windows</span></div>
          <div class="routine-list">${queue}</div>
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
        </div>
        <aside class="routine-cloud daily-cloud">
          <article class="focus-card"><h3>Focus block</h3><p>90 minutes reserved for writing, reset, and one household errand.</p><div class="chart">${bars}</div></article>
          ${features}
          <div class="metric-row">${metrics}</div>
        </aside>
      </section>`;
    case "bento-profile":
      return `<section class="bento-profile">
        <article class="bento-tile hero-tile"><p class="kicker">${escapeHtml(label)} · ${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1><p>${escapeHtml(scenario.lede)}</p><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button></article>
        <article class="bento-tile media-tile"><div class="mini-shot"><span></span><span></span><span></span></div><b>Product tour</b><p>Three proof objects stay visible.</p></article>
        <article class="bento-tile stat-tile"><b>Module signal</b>${renderBentoStats(scenario.metrics)}</article>
        <article class="bento-tile quote-tile"><b>"The module order finally tells the story."</b><span>Customer note</span></article>
        <article class="bento-tile timeline-tile">${scenario.queue.map(([title, state], index) => `<span><b>${String(index + 1).padStart(2, "0")}</b>${escapeHtml(title)}<em>${escapeHtml(state)}</em></span>`).join("")}</article>
        <article class="bento-tile wide">${features}</article>
      </section>`;
    case "neumo-console":
      return `<section class="neumo-console neumo-redesign">
        <article class="control-copy session-card">
          <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="session-dashboard"><div class="session-readout"><strong>${escapeHtml(scenario.metrics[0][0])}</strong><span>${escapeHtml(scenario.metrics[0][1])}</span></div><div class="session-meta"><span>Mode<b>Deep focus</b></span><span>Preset<b>Rain room</b></span><span>State<b>Ready</b></span></div></div>
          <div class="session-actions"><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button><button type="button" class="secondary-action" data-open-modal>Save preset</button></div>
          <div class="session-timeline"><span><b>00</b>Room tone</span><span><b>18</b>Noise bed</span><span><b>42</b>Saved loop</span></div>
        </article>
        <div class="mixer-board">
          <div class="mix-header"><h3>Layer mixer</h3><span>Live mix</span></div>
          <div class="knob-grid">${scenario.metrics.map(([value, text]) => `<div class="knob"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(text)}</span></div>`).join("")}</div>
          <div class="wave-card"><div class="waveform" aria-hidden="true">${renderBars(style.id)}</div><div class="wave-labels"><span>Rain bed</span><span>Noise floor</span><span>Bell tail</span></div></div>
          <div class="slider-stack">${scenario.queue.map(([title, state]) => `<button type="button" data-open-modal><b>${escapeHtml(title)}</b><span>${escapeHtml(state)}</span></button>`).join("")}</div>
        </div>
        <aside class="preset-panel"><h3>Preset pads</h3><div class="preset-grid"><button type="button" data-open-modal>Rain room<span>Active</span></button><button type="button" data-open-modal>Library hush<span>Saved</span></button><button type="button" data-open-modal>Night train<span>Muted</span></button></div><div class="calm-meter"><b>${escapeHtml(scenario.metrics[2][0])}</b><span>${escapeHtml(scenario.metrics[2][1])}</span><i></i></div></aside>
      </section>`;
    case "glass-map":
      return `<section class="glass-map">
        <div class="map-field">${renderScene(style, scenario)}<div class="map-pins"><span></span><span></span><span></span></div><div class="glass-map-card"><b>Signal layers</b><span>North room stable</span><span>Signal 08 drifting</span><span>Operator note open</span></div></div>
        <aside class="glass-panel">
          <p class="kicker">${escapeHtml(label)} · ${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="glass-metrics">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div>
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
          <div class="queue-list">${queue}</div>
        </aside>
      </section>`;
    case "retro-desktop":
      return `<section class="retro-desktop">
        <div class="window lead-window"><div class="title-bar">${escapeHtml(scenario.brand)}.exe</div><h1>${escapeHtml(scenario.headline)}</h1><p>${escapeHtml(scenario.lede)}</p><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button></div>
        <div class="window player-window"><div class="title-bar">PLAYER</div><div class="chart">${bars}</div></div>
        <div class="window files-window"><div class="title-bar">FILES</div>${queue}</div>
      </section>`;
    case "brutal-release":
      return `<section class="brutal-release">
        <div class="brutal-copy"><p class="kicker">${escapeHtml(label)} · ${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1><p>${escapeHtml(scenario.lede)}</p></div>
        <aside class="proof-wall">
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
          <div class="command-line">npx install ${escapeHtml(scenario.brand.toLowerCase())}</div>
          <div class="metric-row">${metrics}</div>
          <div class="queue-list">${queue}</div>
        </aside>
      </section>`;
    case "precision-graph":
      return `<section class="precision-graph">
        <aside class="trace-panel">
          <p class="kicker">${escapeHtml(label)} · ${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="trace-metrics">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div>
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
        </aside>
        <div class="node-graph">
          <span class="node n1">${escapeHtml(scenario.metrics[0][0])}</span><span class="node n2">${escapeHtml(scenario.metrics[1][0])}</span><span class="node n3">${escapeHtml(scenario.metrics[2][0])}</span>
          <i class="edge e1"></i><i class="edge e2"></i><i class="edge e3"></i>
          <div class="span-table"><b>Active spans</b>${scenario.queue.map(([title, state], index) => `<span><em>0${index + 1}</em>${escapeHtml(title)}<strong>${escapeHtml(state)}</strong></span>`).join("")}</div>
        </div>
        <aside class="trace-list"><h3>Trace queue</h3>${queue}<div class="trace-command">replay --batch latest</div><div class="trace-watch"><b>Watch window</b><span><em>p95 latency</em><strong>184ms</strong></span><span><em>retry rate</em><strong>2.8%</strong></span><span><em>owner</em><strong>Infra</strong></span></div></aside>
      </section>`;
    case "gradient-builder":
      return `<section class="gradient-builder">
        <div class="builder-copy"><p class="kicker">${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1><p>${escapeHtml(scenario.lede)}</p><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button></div>
        <div class="builder-canvas"><div class="stepper"><span>01</span><span>02</span><span>03</span></div><div class="live-canvas"><b>Live canvas</b><p>Template, copy, and signup state update together.</p><div class="canvas-layers"><span></span><span></span><span></span></div></div><div class="builder-checks">${features}</div></div>
        <aside class="template-stack"><h3>Launch checklist</h3>${queue}<div class="metric-row">${metrics}</div><button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button></aside>
      </section>`;
    case "soft-learning":
      return `<section class="soft-learning">
        <aside class="lesson-path">${scenario.queue.map(([title, state], index) => `<button type="button" data-open-modal><span>${index + 1}</span><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></button>`).join("")}</aside>
        <article class="lesson-card practice-card"><p class="kicker">${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1><p>${escapeHtml(scenario.lede)}</p><div class="prompt-card"><b>Today's prompt</b><p>Write three lines, save one note, and mark the retry kindly.</p></div><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button></article>
        <aside class="note-stack learning-notes"><h3>Progress</h3><div class="progress-path">${scenario.metrics.map(([value, text]) => `<span><b>${escapeHtml(value)}</b>${escapeHtml(text)}</span>`).join("")}</div>${queue}</aside>
      </section>`;
    case "acid-poster":
      return `<section class="acid-poster">
        <div class="acid-title"><p class="kicker">${escapeHtml(label)} · ${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1><p>${escapeHtml(scenario.lede)}</p><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button></div>
        <div class="chrome-slab">${renderScene(style, scenario)}</div>
        <aside class="shard-list">${queue}<div class="metric-row">${metrics}</div></aside>
      </section>`;
    default:
      return `<section class="minimal-brief">
        <article class="document-surface"><p class="kicker">${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1><p>${escapeHtml(scenario.lede)}</p><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button></article>
        <aside class="comment-stack">${queue}</aside>
      </section>`;
  }
}

function renderDistinctStyleHtml(style) {
  const label = style.label || `Style ${style.id}`;
  const scenario = getScenario(style);
  const playbook = getStylePlaybook(style);
  const geometry = getGeometryProfile(style);
  const notes = style.notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("");
  const related = allStyles
    .filter((item) => item.id !== style.id)
    .slice(0, 3)
    .map((item) => `<a href="../${item.slug}/${item.slug}.html">${item.id}. ${escapeHtml(item.name)}</a>`)
    .join("");
  const demo = JSON.stringify(scenario.tabs);
  const prompt = buildStylePrompt(style, "en");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${label} - ${style.name}</title>
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
body {
  min-height: 100vh;
  margin: 0;
  color: var(--text);
  background: var(--bg);
  font-family: ui-sans-serif, system-ui, sans-serif;
  color-scheme: light;
}
img,
svg,
canvas,
video {
  max-width: 100%;
  height: auto;
}
body.terminal-hacker,
body.retro-computing {
  font-family: "Courier New", ui-monospace, monospace;
}
body.dark-theme,
body.precision-futurism,
body.liquid-glass,
body.acid-design,
body.aurora-gradient {
  color-scheme: dark;
  background:
    radial-gradient(circle at 18% 8%, color-mix(in srgb, var(--accent), transparent 68%), transparent 31%),
    radial-gradient(circle at 84% 12%, color-mix(in srgb, var(--primary), transparent 78%), transparent 25%),
    var(--bg);
}
body.gradient-pop {
  background:
    radial-gradient(circle at 18% 10%, #ff7adf 0, transparent 30%),
    radial-gradient(circle at 82% 8%, #67e8f9 0, transparent 28%),
    linear-gradient(135deg, #fff7ed, #fdf2f8 48%, #ecfeff);
}
body.retro-computing {
  background-image:
    linear-gradient(rgba(31, 19, 0, .12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(31, 19, 0, .12) 1px, transparent 1px);
  background-size: 18px 18px;
}
button,
input,
textarea,
select {
  font: inherit;
  max-width: 100%;
}
a {
  color: inherit;
  overflow-wrap: anywhere;
}
button:focus-visible,
a:focus-visible,
input:focus-visible,
[tabindex]:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--accent), white 18%);
  outline-offset: 3px;
}
button:active,
.primary-action:active,
.secondary-action:active,
.queue-card:active {
  transform: translateY(0);
}
button:disabled,
[aria-disabled="true"] {
  opacity: .52;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
.sr-status {
  position: fixed;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
.page {
  width: min(100%, 1268px);
  margin: 0 auto;
  padding: 24px calc(24px + env(safe-area-inset-right)) 64px calc(24px + env(safe-area-inset-left));
}
.top-nav {
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 24px;
}
.brand-lockup,
.nav-links {
  display: flex;
  align-items: center;
  gap: 12px;
}
.brand-lockup {
  font-weight: 900;
  text-decoration: none;
}
.brand-lockup span {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  color: var(--bg);
  background: var(--primary);
  border: 1px solid var(--border);
  border-radius: var(--control-radius);
}
.nav-links a,
.ghost-action,
.text-action {
  color: var(--muted);
  background: transparent;
  border: 0;
  text-decoration: none;
  cursor: pointer;
}
.nav-links {
  color: var(--muted);
  font-size: 14px;
}
.primary-action,
.secondary-action,
.ghost-action,
.text-action,
.queue-card,
.tabs button {
  max-width: 100%;
  min-height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 16px;
  border: 1px solid var(--border);
  border-radius: var(--control-radius);
  color: var(--text);
  background: var(--surface);
  font-weight: 800;
  line-height: 1.2;
  text-align: center;
  white-space: normal;
  overflow-wrap: anywhere;
  text-decoration: none;
  cursor: pointer;
  transition: transform .18s ease, box-shadow .18s ease, background .18s ease;
}
.primary-action {
  color: var(--bg);
  background: var(--primary);
  border-color: var(--primary);
}
.secondary-action {
  background: color-mix(in srgb, var(--surface), var(--bg) 14%);
}
.primary-action:hover,
.secondary-action:hover,
.ghost-action:hover,
.text-action:hover,
.queue-card:hover {
  transform: translateY(-2px);
}
.kicker {
  margin: 0 0 12px;
  color: var(--accent);
  font-size: 13px;
  font-weight: 900;
  letter-spacing: 0;
  text-transform: uppercase;
}
h1,
h2,
h3,
p,
code {
  overflow-wrap: anywhere;
}
h1 {
  margin: 0;
  font-size: clamp(38px, 5vw, 60px);
  line-height: 1.02;
  letter-spacing: 0;
}
h2 {
  margin: 0;
  font-size: clamp(28px, 3vw, 34px);
  line-height: 1.1;
  letter-spacing: 0;
}
h3 {
  margin: 0 0 10px;
  font-size: 20px;
  line-height: 1.2;
}
p {
  margin: 0;
  color: var(--muted);
  font-size: 16px;
  line-height: 1.58;
}
.metric-row,
.metric-tile,
.detail-pills,
.queue-list,
.feature-block {
  min-width: 0;
}
.metric-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}
.metric-tile {
  padding: 14px;
  background: color-mix(in srgb, var(--surface), var(--bg) 12%);
  border: 1px solid var(--border);
  border-radius: var(--chip-radius);
}
.metric-tile strong {
  display: block;
  color: var(--text);
  font-size: 24px;
}
.metric-tile span {
  color: var(--muted);
  font-size: 13px;
}
.queue-list {
  display: grid;
  gap: 10px;
}
.queue-card {
  width: 100%;
  justify-content: space-between;
  min-height: 48px;
  color: var(--text);
  gap: 12px;
  text-align: left;
}
.queue-card b {
  min-width: 0;
}
.queue-card span {
  flex-shrink: 0;
  min-width: 0;
  text-align: right;
  color: var(--muted);
  font-size: 13px;
}
.chart {
  min-width: 0;
  height: 160px;
  display: flex;
  align-items: end;
  gap: 8px;
  padding: 14px;
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  background: color-mix(in srgb, var(--surface), var(--bg) 18%);
  overflow: hidden;
}
.chart i {
  flex: 1;
  min-width: 6px;
  border-radius: 999px 999px 0 0;
  background: linear-gradient(180deg, var(--accent), var(--primary));
}
.media {
  position: relative;
  overflow: hidden;
  min-width: 0;
  min-height: 320px;
  border: 1px solid var(--border);
  border-radius: var(--media-radius);
  background:
    radial-gradient(circle at 22% 18%, color-mix(in srgb, var(--accent), white 12%) 0 16%, transparent 34%),
    radial-gradient(circle at 76% 24%, color-mix(in srgb, var(--primary), transparent 18%) 0 12%, transparent 30%),
    linear-gradient(135deg, color-mix(in srgb, var(--surface), var(--bg) 18%), color-mix(in srgb, var(--accent), var(--bg) 74%));
}
.media::before,
.media::after,
.scene-orb,
.scene-line,
.scene-chip,
.scene-card {
  content: "";
  position: absolute;
  display: block;
}
.media::before {
  inset: 24px;
  border: 1px solid color-mix(in srgb, var(--border), transparent 18%);
  border-radius: var(--panel-radius);
}
.media::after {
  left: 34px;
  right: 34px;
  bottom: 34px;
  height: 56px;
  border: 1px solid color-mix(in srgb, var(--border), transparent 18%);
  border-radius: var(--control-radius);
  background: color-mix(in srgb, var(--surface), transparent 16%);
}
.scene-orb {
  width: 128px;
  height: 128px;
  border-radius: 999px;
  background: radial-gradient(circle, color-mix(in srgb, var(--accent), white 18%), transparent 68%);
}
.orb-a { left: 38px; top: 42px; }
.orb-b { right: 44px; bottom: 64px; transform: scale(.72); opacity: .72; }
.scene-line { height: 1px; background: color-mix(in srgb, var(--border), var(--accent) 36%); }
.line-a { left: 48px; right: 48px; top: 94px; }
.line-b { left: 70px; right: 90px; top: 156px; }
.scene-chip {
  z-index: 1;
  max-width: calc(100% - 24px);
  min-width: 48px;
  padding: 8px 10px;
  color: var(--bg);
  background: var(--primary);
  border: 1px solid var(--border);
  border-radius: var(--chip-radius);
  font-size: 13px;
  font-weight: 900;
  text-align: center;
}
.chip-a { left: 42px; bottom: 44px; }
.chip-b { right: 42px; top: 42px; color: var(--text); background: var(--surface); }
.scene-card {
  width: 112px;
  height: 78px;
  border: 1px solid var(--border);
  border-radius: var(--control-radius);
  background: color-mix(in srgb, var(--surface), transparent 8%);
}
.card-a { left: 104px; top: 126px; }
.card-b { right: 96px; top: 118px; transform: rotate(4deg); }
.card-c { left: 50%; bottom: 48px; transform: translateX(-50%); width: 150px; }
.ops-board {
  display: grid;
  grid-template-columns: minmax(160px, 180px) minmax(0, 1fr);
  gap: 18px;
}
.filter-rail,
.board-main,
.board-inspector,
.ticket-card,
.lab-copy,
.run-compare article,
.evidence-canvas,
.poster-stack,
.shop-hero,
.sticker-card,
.document-surface,
.brief-sidebar,
.comment-stack,
.frame-viewer,
.render-queue,
.evidence-panel,
.phone-panel,
.routine-cloud,
.bento-tile,
.control-copy,
.mixer-board,
.preset-panel,
.glass-panel,
.window,
.proof-wall,
.trace-panel,
.trace-list,
.builder-copy,
.builder-canvas,
.template-stack,
.lesson-card,
.note-stack,
.shard-list {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  box-shadow: var(--shadow);
}
.filter-rail {
  min-height: 680px;
  display: grid;
  align-content: start;
  gap: 10px;
  padding: 16px;
}
.filter-rail b {
  margin-bottom: 8px;
  color: var(--text);
}
.filter-rail span {
  display: block;
  min-width: 0;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: var(--control-radius);
  color: var(--muted);
  background: color-mix(in srgb, var(--surface), var(--bg) 12%);
}
.filter-rail .rail-active {
  color: var(--bg);
  background: var(--primary);
  border-color: var(--primary);
}
.board-main {
  padding: 20px;
}
.board-toolbar {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 16px;
  align-items: start;
  margin-bottom: 14px;
}
.board-toolbar h1 {
  font-size: 34px;
  line-height: 1.06;
}
.board-toolbar p:not(.kicker) {
  max-width: 720px;
  font-size: 15px;
}
.toolbar-actions {
  min-width: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
}
.ticket-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(min(100%, 280px), .85fr);
  gap: 14px;
  margin-top: 16px;
}
.ticket-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}
.ticket-card {
  min-height: 150px;
  padding: 18px;
  box-shadow: none;
}
.ticket-card.priority {
  grid-row: span 2;
  min-height: 314px;
}
.ticket-card p {
  margin-top: 12px;
  font-size: 14px;
}
.ticket-card span {
  display: inline-flex;
  margin-top: 16px;
  padding: 6px 10px;
  border-radius: var(--chip-radius);
  color: var(--bg);
  background: var(--primary);
}
.board-inspector {
  display: grid;
  gap: 14px;
  align-content: start;
  padding: 18px;
  box-shadow: none;
}
.board-inspector .chart {
  height: 190px;
}
.street-poster,
.brutal-release,
.acid-poster {
  min-height: 720px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(min(100%, 320px), 420px);
  gap: 24px;
  align-items: stretch;
}
.street-poster h1,
.brutal-release h1,
.acid-poster h1 {
  text-transform: uppercase;
  font-size: 78px;
}
.poster-copy,
.brutal-copy,
.acid-title {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 28px;
  border: 2px solid var(--border);
  background: color-mix(in srgb, var(--surface), var(--bg) 10%);
}
.poster-copy {
  border-radius: 0;
  box-shadow: 12px 12px 0 var(--border);
}
.poster-stack {
  display: grid;
  gap: 16px;
  padding: 18px;
  border-radius: 0;
  box-shadow: 10px 10px 0 var(--border);
}
.stamp.big {
  display: grid;
  place-items: center;
  min-height: 170px;
  color: var(--bg);
  background: var(--primary);
  border: 2px solid var(--border);
  font-size: 64px;
  font-weight: 950;
}
.ticket-strip {
  display: grid;
  gap: 10px;
}
.ticket-strip span {
  display: flex;
  justify-content: space-between;
  padding: 14px;
  background: var(--accent);
  border: 2px solid var(--border);
}
.rule-panel {
  display: grid;
  gap: 10px;
}
.feature-block {
  padding: 16px;
  background: color-mix(in srgb, var(--surface), var(--bg) 12%);
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
}
.feature-block p {
  font-size: 15px;
}
.feature-block span {
  display: inline-block;
  margin-bottom: 12px;
  color: var(--accent);
  font-weight: 900;
}
.aurora-lab,
.dark-render,
.glass-map,
.precision-graph {
  display: grid;
  grid-template-columns: .8fr 1.2fr;
  gap: 18px;
  align-items: stretch;
}
.aurora-lab {
  grid-template-columns: .8fr 1fr .95fr;
}
.lab-copy,
.trace-panel,
.glass-panel,
.render-queue {
  padding: 22px;
}
.run-compare {
  display: grid;
  gap: 12px;
}
.signal-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin: 18px 0;
}
.signal-stats span,
.glass-metrics span,
.trace-metrics span {
  min-width: 0;
  padding: 10px;
  border: 1px solid var(--border);
  border-radius: var(--chip-radius);
  background: color-mix(in srgb, var(--surface), transparent 18%);
}
.signal-stats strong,
.glass-metrics strong,
.trace-metrics strong {
  display: block;
  color: var(--text);
  font-size: 22px;
}
.run-compare article {
  display: grid;
  align-content: start;
  gap: 14px;
  padding: 18px;
  box-shadow: none;
  background: color-mix(in srgb, var(--surface), transparent 8%);
}
.run-head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}
.run-head b {
  color: var(--accent);
  font-size: 22px;
}
.score-row {
  display: grid;
  grid-template-columns: 82px minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  color: var(--muted);
  font-size: 13px;
}
.score-row i {
  position: relative;
  overflow: hidden;
  height: 7px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--surface), var(--bg) 20%);
}
.score-row i::after {
  content: "";
  position: absolute;
  inset: 0 auto 0 0;
  width: var(--score);
  border-radius: inherit;
  background: linear-gradient(90deg, var(--accent), var(--primary));
}
.run-compare .selected {
  border-color: var(--accent);
  box-shadow: 0 0 0 1px var(--accent), var(--shadow);
}
.evidence-canvas {
  position: relative;
  overflow: hidden;
  padding: 16px;
}
.evidence-canvas .media {
  min-height: 390px;
}
.review-note {
  display: grid;
  gap: 8px;
  margin-top: 14px;
  padding: 14px;
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  background: color-mix(in srgb, var(--surface), transparent 10%);
}
.review-note span {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: var(--muted);
}
.review-note em {
  order: 2;
  color: var(--accent);
  font-style: normal;
  font-weight: 900;
}
.y2k-stage {
  position: relative;
  overflow: hidden;
  min-height: 720px;
  padding: 26px;
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  background:
    radial-gradient(circle at 20% 20%, color-mix(in srgb, var(--primary), white 8%), transparent 26%),
    radial-gradient(circle at 80% 28%, color-mix(in srgb, var(--accent), white 4%), transparent 24%),
    var(--surface);
  box-shadow: var(--shadow);
}
.marquee,
.lineup-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.marquee span,
.lineup-row button {
  padding: 12px 16px;
  border: 1px solid var(--border);
  border-radius: var(--chip-radius);
  background: color-mix(in srgb, var(--surface), white 18%);
  font-weight: 900;
}
.stage-center {
  min-height: 500px;
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 34px;
  align-items: center;
}
.disc {
  width: 300px;
  height: 300px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: var(--bg);
  background: conic-gradient(from 20deg, var(--primary), var(--accent), #fff, var(--primary));
  border: 2px solid var(--border);
  font-size: 72px;
  font-weight: 950;
  box-shadow: var(--shadow);
}
.editorial-index {
  display: grid;
  grid-template-columns: 180px 1fr 340px;
  gap: 24px;
  min-height: 680px;
  border-top: 2px solid var(--border);
  border-bottom: 2px solid var(--border);
  padding: 18px 0;
}
.editorial-meta,
.index-column {
  display: grid;
  align-content: start;
  gap: 14px;
}
.editorial-meta {
  border-right: 1px solid var(--border);
  padding-right: 18px;
}
.editorial-lead h1 {
  font-size: 84px;
  line-height: .92;
}
.editorial-lead p {
  max-width: 740px;
  margin-top: 22px;
}
.editorial-index .feature-block {
  border-radius: 0;
  background: transparent;
  border-width: 1px 0 0;
}
.text-action {
  justify-content: flex-start;
  padding: 0;
  border: 0;
  border-bottom: 1px solid currentColor;
  border-radius: 0;
}
.terminal-console {
  display: grid;
  grid-template-columns: 1.2fr .8fr;
  gap: 18px;
}
.terminal-window,
.severity-board {
  min-height: 680px;
  padding: 0;
  border: 1px solid var(--border);
  background: var(--surface);
  box-shadow: var(--shadow);
}
.terminal-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  border-bottom: 1px solid var(--border);
}
.terminal-bar button,
.terminal-console .primary-action {
  color: var(--primary);
  background: transparent;
  border-color: var(--primary);
  border-radius: 0;
}
.prompt-line,
.log-lines {
  padding: 18px;
}
.log-lines {
  display: grid;
  gap: 10px;
}
.log-lines button {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  padding: 12px;
  color: var(--text);
  background: rgba(0, 255, 136, .04);
  border: 1px solid var(--border);
}
.log-lines code {
  min-width: 92px;
  color: var(--primary);
  text-align: left;
}
.log-lines span {
  text-align: left;
}
.severity-board {
  padding: 22px;
}
.sticker-shop {
  display: grid;
  grid-template-columns: .85fr 1.15fr;
  gap: 18px;
  align-items: stretch;
}
.shop-hero,
.sticker-shelf {
  min-height: 680px;
}
.shop-hero {
  padding: 24px;
}
.sticker-shelf {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}
.sticker-card {
  min-height: 210px;
  display: grid;
  place-items: center;
  padding: 22px;
  border-width: 2px;
  box-shadow: 8px 8px 0 var(--accent);
  transform: rotate(-2deg);
}
.sticker-card.wide {
  grid-column: 1 / -1;
  transform: rotate(1deg);
}
.stark-portfolio {
  min-height: 640px;
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr) minmax(420px, .72fr);
  gap: 28px;
  align-items: center;
}
.stark-meta {
  display: grid;
  gap: 18px;
  color: var(--muted);
}
.object-stage .media {
  min-height: 500px;
  background:
    radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--primary), transparent 38%), transparent 28%),
    var(--surface);
}
.object-stage {
  display: grid;
  gap: 14px;
}
.object-strip,
.stark-proof {
  display: grid;
  gap: 10px;
}
.object-strip {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.object-strip span,
.stark-proof span {
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: var(--chip-radius);
  background: color-mix(in srgb, var(--surface), transparent 10%);
}
.object-strip strong {
  display: block;
  color: var(--text);
  font-size: 22px;
}
.stark-proof span {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}
.stark-proof em {
  color: var(--primary);
  font-style: normal;
  font-weight: 900;
}
.stark-details {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  margin-top: 6px;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.stark-details span {
  display: grid;
  gap: 6px;
  min-width: 0;
  padding: 14px 10px;
  color: var(--muted);
  background: color-mix(in srgb, var(--surface), transparent 16%);
}
.stark-details b {
  color: var(--primary);
  font-size: 11px;
  text-transform: uppercase;
}
.stark-copy {
  display: grid;
  gap: 18px;
}
.stark-copy h1 {
  font-size: 52px;
  line-height: 1.03;
}
.stark-copy p {
  max-width: 420px;
}
.minimal-brief {
  display: grid;
  grid-template-columns: 210px minmax(0, 1fr) 300px;
  gap: 16px;
  align-items: stretch;
}
.brief-sidebar,
.document-surface,
.comment-stack {
  min-height: 520px;
  padding: 20px;
}
.brief-sidebar {
  display: grid;
  align-content: start;
  gap: 12px;
}
.brief-sidebar > span {
  padding: 10px 0;
  border-bottom: 1px solid var(--border);
  color: var(--muted);
}
.document-surface h1 {
  max-width: 820px;
  margin-bottom: 10px;
  font-size: 42px;
  line-height: 1.08;
}
.comment-stack {
  display: grid;
  align-content: start;
  gap: 10px;
}
.dark-render {
  grid-template-columns: 1.15fr 360px;
}
.frame-viewer,
.render-queue {
  min-height: 690px;
}
.frame-viewer {
  padding: 20px;
}
.frame-art .media {
  min-height: 420px;
  margin: 18px 0;
  background:
    linear-gradient(120deg, #050505, color-mix(in srgb, var(--accent), #050505 78%)),
    var(--bg);
}
.film-strip {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}
.film-strip span {
  min-height: 84px;
  padding: 14px;
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--surface), var(--bg) 20%);
}
.film-strip b {
  display: block;
  font-size: 26px;
}
.shot-strip {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-top: 12px;
}
.shot-strip span {
  display: grid;
  gap: 6px;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: var(--chip-radius);
  background: color-mix(in srgb, var(--surface), var(--bg) 14%);
}
.shot-strip b,
.shot-strip em {
  color: var(--accent);
  font-style: normal;
}
.render-budget {
  display: grid;
  gap: 8px;
  margin: 16px 0;
  padding: 14px;
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  background: color-mix(in srgb, var(--surface), var(--bg) 16%);
}
.render-budget strong {
  font-size: 34px;
}
.render-budget i {
  overflow: hidden;
  height: 8px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--accent) 72%, color-mix(in srgb, var(--surface), var(--bg) 28%) 72%);
}
.render-checks {
  display: grid;
  gap: 10px;
  margin-top: 18px;
  padding: 14px;
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  background: color-mix(in srgb, var(--surface), var(--bg) 18%);
}
.render-checks span {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 10px;
  color: var(--muted);
}
.render-checks strong {
  color: var(--accent);
}
.line-workflow {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
}
.workflow-head {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--border);
}
.lane-map {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  min-height: 500px;
  border: 1px solid var(--border);
}
.lane-map article {
  position: relative;
  padding: 22px;
  border-right: 1px solid var(--border);
}
.lane-map article:last-child {
  border-right: 0;
}
.lane-map span {
  display: block;
  margin-bottom: 90px;
  color: var(--accent);
  font-weight: 900;
}
.lane-map em {
  display: inline-block;
  margin-top: 16px;
  font-style: normal;
  color: var(--muted);
}
.evidence-panel {
  padding: 18px;
}
.material-day {
  display: grid;
  grid-template-columns: 360px minmax(0, 1fr);
  gap: 22px;
  align-items: stretch;
}
.phone-panel {
  min-height: 560px;
  padding: 22px;
  border-radius: var(--panel-radius);
}
.routine-list {
  display: grid;
  gap: 12px;
  margin: 24px 0;
}
.routine-cloud {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  padding: 18px;
}
.routine-cloud .feature-block:first-child {
  grid-column: 1 / -1;
}
.bento-profile {
  display: grid;
  grid-template-columns: 1.2fr .8fr .8fr;
  grid-auto-rows: minmax(170px, auto);
  gap: 16px;
}
.bento-tile {
  padding: 20px;
  overflow: hidden;
}
.hero-tile {
  grid-column: span 2;
  grid-row: span 2;
}
.hero-tile h1 {
  font-size: 64px;
}
.bento-tile.tall {
  grid-row: span 2;
}
.bento-tile.wide {
  grid-column: span 2;
}
.stat-tile {
  display: grid;
  align-content: center;
}
.neumo-console {
  display: grid;
  grid-template-columns: 360px minmax(0, 1fr) 280px;
  gap: 20px;
}
.control-copy,
.mixer-board {
  min-height: 620px;
  padding: 24px;
  box-shadow: 18px 18px 42px rgba(148, 163, 184, .45), -18px -18px 42px rgba(255,255,255,.9);
}
.mixer-board {
  display: grid;
  align-content: start;
  grid-template-columns: 1fr;
  gap: 16px;
}
.mix-header,
.session-actions,
.wave-labels {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.mix-header span,
.wave-labels span {
  color: var(--muted);
  font-size: 13px;
  font-weight: 800;
}
.knob-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}
.knob {
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  text-align: center;
  border-radius: 50%;
  box-shadow: inset 10px 10px 22px rgba(148,163,184,.38), inset -10px -10px 22px rgba(255,255,255,.88);
}
.knob strong {
  font-size: 28px;
}
.session-dashboard {
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr);
  gap: 16px;
  align-items: center;
}
.session-meta {
  display: grid;
  gap: 10px;
}
.session-meta span {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 999px;
  box-shadow: inset 6px 6px 14px rgba(148,163,184,.26), inset -6px -6px 14px rgba(255,255,255,.82);
  color: var(--muted);
  white-space: nowrap;
  overflow-wrap: normal;
}
.session-meta b {
  color: var(--text);
  overflow-wrap: normal;
}
.session-timeline {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-top: 18px;
}
.session-timeline span {
  display: grid;
  gap: 6px;
  min-width: 0;
  padding: 12px;
  border-radius: var(--chip-radius);
  color: var(--muted);
  box-shadow: inset 6px 6px 14px rgba(148,163,184,.24), inset -6px -6px 14px rgba(255,255,255,.82);
}
.session-timeline b {
  color: var(--primary);
  font-size: 13px;
}
.slider-stack {
  grid-column: 1 / -1;
  display: grid;
  gap: 12px;
}
.slider-stack button {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  justify-content: stretch;
  align-items: center;
  gap: 14px;
  text-align: left;
  padding: 16px;
  border: 0;
  border-radius: var(--control-radius);
  color: var(--text);
  background: var(--surface);
  box-shadow: inset 8px 8px 18px rgba(148,163,184,.34), inset -8px -8px 18px rgba(255,255,255,.82);
}
.slider-stack button span {
  justify-self: end;
  min-width: 58px;
  padding: 5px 10px;
  border-radius: var(--chip-radius);
  text-align: center;
  color: var(--primary);
  background: color-mix(in srgb, var(--accent), transparent 84%);
}
.wave-card {
  display: grid;
  gap: 12px;
  padding: 16px;
  border-radius: var(--panel-radius);
  box-shadow: inset 8px 8px 18px rgba(148,163,184,.32), inset -8px -8px 18px rgba(255,255,255,.84);
}
.preset-panel {
  min-height: 620px;
  display: grid;
  align-content: start;
  gap: 16px;
  padding: 22px;
  box-shadow: 18px 18px 42px rgba(148, 163, 184, .45), -18px -18px 42px rgba(255,255,255,.9);
}
.preset-grid {
  display: grid;
  gap: 12px;
}
.preset-grid button {
  display: grid;
  gap: 6px;
  padding: 16px;
  color: var(--text);
  background: var(--surface);
  border: 0;
  border-radius: var(--control-radius);
  box-shadow: 8px 8px 18px rgba(148,163,184,.32), -8px -8px 18px rgba(255,255,255,.86);
  text-align: left;
  font-weight: 900;
}
.preset-grid span {
  color: var(--muted);
  font-size: 13px;
}
.calm-meter {
  display: grid;
  gap: 8px;
  margin-top: 8px;
  padding: 18px;
  border-radius: var(--panel-radius);
  box-shadow: inset 8px 8px 18px rgba(148,163,184,.32), inset -8px -8px 18px rgba(255,255,255,.84);
}
.calm-meter b {
  font-size: 42px;
}
.calm-meter i {
  height: 10px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--primary) 68%, color-mix(in srgb, var(--surface), var(--bg) 20%) 68%);
}
.glass-map {
  grid-template-columns: minmax(0, 1fr) 420px;
}
.map-field {
  position: relative;
  min-height: 620px;
}
.map-field .media {
  min-height: 620px;
  backdrop-filter: blur(18px);
}
.map-pins span {
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 32px var(--accent);
}
.map-pins span:nth-child(1) { left: 28%; top: 34%; }
.map-pins span:nth-child(2) { left: 58%; top: 52%; }
.map-pins span:nth-child(3) { left: 70%; top: 24%; }
.glass-map-card {
  position: absolute;
  left: 30px;
  bottom: 30px;
  display: grid;
  gap: 8px;
  width: 260px;
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  background: color-mix(in srgb, var(--surface), transparent 4%);
  backdrop-filter: blur(18px);
}
.glass-map-card span {
  color: var(--muted);
  font-size: 13px;
}
.glass-panel {
  padding: 20px;
  backdrop-filter: blur(22px) saturate(1.4);
  background: color-mix(in srgb, var(--surface), transparent 16%);
}
.glass-panel h1 {
  font-size: 48px;
  line-height: 1.04;
}
.glass-panel p {
  font-size: 15px;
}
.glass-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin: 16px 0;
}
.retro-desktop {
  position: relative;
  min-height: 720px;
  border: 2px solid var(--border);
  background: color-mix(in srgb, var(--surface), var(--bg) 18%);
  overflow: hidden;
}
.window {
  position: absolute;
  border-radius: 2px;
  border-width: 2px;
  box-shadow: 8px 8px 0 var(--border);
}
.title-bar {
  padding: 8px 10px;
  color: var(--bg);
  background: var(--primary);
  border-bottom: 2px solid var(--border);
  font-weight: 900;
}
.lead-window {
  left: 38px;
  top: 38px;
  width: 58%;
  padding-bottom: 22px;
}
.lead-window h1,
.lead-window p,
.lead-window button {
  margin: 18px;
}
.player-window {
  right: 42px;
  top: 86px;
  width: 36%;
}
.files-window {
  right: 84px;
  bottom: 48px;
  width: 42%;
}
.files-window .queue-card {
  border-radius: 0;
  border-width: 0 0 1px;
}
.brutal-release {
  grid-template-columns: 1.05fr .95fr;
}
.brutal-copy {
  border-radius: 0;
  box-shadow: 12px 12px 0 var(--border);
}
.proof-wall {
  padding: 18px;
  border-radius: 0;
  box-shadow: 12px 12px 0 var(--border);
}
body.neo-brutalism .brutal-release {
  grid-template-columns: .72fr 1.28fr;
  gap: 30px;
  background:
    linear-gradient(90deg, rgba(17,17,17,.12) 1px, transparent 1px),
    linear-gradient(0deg, rgba(17,17,17,.12) 1px, transparent 1px);
  background-size: 34px 34px;
}
body.neo-brutalism .brutal-copy {
  min-height: 720px;
  background: var(--surface);
  border: 4px solid var(--border);
  box-shadow: 16px 16px 0 var(--accent);
  transform: rotate(-1deg);
}
body.neo-brutalism .brutal-copy h1 {
  font-size: 66px;
  line-height: .92;
}
body.neo-brutalism .proof-wall {
  display: grid;
  align-content: stretch;
  gap: 16px;
  background: #ffffff;
  border: 4px solid var(--border);
  box-shadow: -14px 14px 0 var(--primary);
  transform: rotate(1deg);
}
body.neo-brutalism .proof-wall .metric-row {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
body.neo-brutalism .proof-wall .metric-tile {
  border: 3px solid var(--border);
  background: var(--bg);
}
body.neo-brutalism .proof-wall .queue-card {
  min-height: 58px;
  border-width: 3px;
  background: var(--surface);
  box-shadow: 6px 6px 0 var(--accent);
}
body.neo-brutalism .command-line {
  color: #ffffff;
  background: var(--primary);
  border-width: 3px;
}
.command-line {
  margin: 18px 0;
  padding: 18px;
  color: var(--text);
  background: var(--accent);
  border: 2px solid var(--border);
  font-family: "Courier New", ui-monospace, monospace;
  font-weight: 900;
}
.precision-graph {
  grid-template-columns: 340px 1fr 300px;
}
.trace-panel,
.trace-list {
  display: grid;
  align-content: start;
  gap: 16px;
  padding: 20px;
}
.trace-metrics {
  display: grid;
  gap: 10px;
}
.node-graph {
  position: relative;
  min-height: 690px;
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  background:
    linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px),
    color-mix(in srgb, var(--surface), var(--bg) 14%);
  background-size: 34px 34px;
  box-shadow: var(--shadow);
}
.node {
  position: absolute;
  width: 96px;
  height: 96px;
  display: grid;
  place-items: center;
  border: 1px solid var(--accent);
  border-radius: 50%;
  background: var(--surface);
  box-shadow: 0 0 32px color-mix(in srgb, var(--accent), transparent 48%);
  font-weight: 900;
}
.n1 { left: 16%; top: 18%; }
.n2 { right: 18%; top: 38%; }
.n3 { left: 42%; bottom: 16%; }
.edge {
  position: absolute;
  height: 1px;
  background: var(--accent);
  transform-origin: left center;
}
.e1 { left: 25%; top: 27%; width: 340px; transform: rotate(18deg); }
.e2 { right: 24%; top: 48%; width: 260px; transform: rotate(132deg); }
.e3 { left: 28%; bottom: 28%; width: 310px; transform: rotate(-26deg); }
.span-table {
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 24px;
  display: grid;
  gap: 8px;
  padding: 14px;
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  background: color-mix(in srgb, var(--surface), var(--bg) 12%);
}
.span-table span {
  display: grid;
  grid-template-columns: 38px minmax(0, 1fr) auto;
  gap: 10px;
  align-items: center;
  color: var(--muted);
}
.span-table em {
  color: var(--accent);
  font-style: normal;
  font-weight: 900;
}
.span-table strong {
  color: var(--text);
}
.trace-command {
  padding: 14px;
  border: 1px solid var(--border);
  border-radius: var(--control-radius);
  color: var(--accent);
  background: color-mix(in srgb, var(--surface), var(--bg) 12%);
  font-family: "Courier New", ui-monospace, monospace;
  font-weight: 900;
}
.trace-watch {
  display: grid;
  gap: 10px;
  padding: 14px;
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  background: color-mix(in srgb, var(--surface), var(--bg) 18%);
}
.trace-watch span {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 10px;
  color: var(--muted);
}
.trace-watch em {
  overflow-wrap: anywhere;
  font-style: normal;
}
.trace-watch strong {
  color: var(--text);
}
.gradient-builder {
  display: grid;
  grid-template-columns: .85fr 1fr 320px;
  gap: 18px;
}
.builder-copy,
.builder-canvas,
.template-stack {
  min-height: 690px;
  padding: 20px;
}
.builder-canvas {
  background:
    radial-gradient(circle at 22% 22%, var(--primary), transparent 28%),
    radial-gradient(circle at 78% 18%, var(--accent), transparent 26%),
    var(--surface);
}
.stepper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
}
.stepper span {
  width: 58px;
  height: 58px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: var(--bg);
  background: var(--primary);
  font-weight: 900;
}
.soft-learning {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 18px;
}
.lesson-card {
  min-height: 600px;
  padding: 28px;
}
.lesson-card h1 {
  max-width: 760px;
}
.progress-path {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}
.progress-path span {
  min-height: 120px;
  padding: 18px;
  border: 1px dashed var(--border);
  border-radius: var(--panel-radius);
  background: color-mix(in srgb, var(--surface), var(--accent) 7%);
}
.progress-path b {
  display: block;
  font-size: 30px;
}
.note-stack {
  padding: 20px;
}
.acid-poster {
  grid-template-columns: 1fr 360px;
  grid-template-rows: 1fr auto;
}
.acid-title {
  grid-row: span 2;
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--surface), var(--accent) 16%), var(--bg));
  border-color: var(--accent);
  box-shadow: 0 0 0 1px var(--accent), var(--shadow);
}
.acid-title h1 {
  color: var(--text);
  text-shadow: 2px 0 #00e5ff, -2px 0 #ff00f5, 0 0 34px rgba(214,255,0,.24);
}
.chrome-slab {
  overflow: hidden;
  border: 1px solid var(--accent);
  border-radius: var(--media-radius);
  background: conic-gradient(from 120deg at 50% 50%, #d6ff00, #7c3aed, #050108, #00e5ff, #d6ff00);
}
.chrome-slab .media {
  min-height: 420px;
  opacity: .72;
  mix-blend-mode: screen;
}
.shard-list {
  padding: 18px;
  border-color: var(--accent);
}
.drop-console {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 18px;
  margin-top: 18px;
}
.release-player,
.drop-panel,
.track-strip article {
  background: color-mix(in srgb, var(--surface), white 12%);
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  box-shadow: var(--shadow);
}
.release-player {
  min-height: 520px;
  display: grid;
  align-content: center;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 30px;
  padding: 28px;
}
.release-player .disc {
  width: 220px;
  height: 220px;
  font-size: 56px;
}
.release-player h1 {
  max-width: 640px;
  font-size: 48px;
  line-height: 1.04;
}
.release-player .primary-action {
  justify-self: start;
  margin-top: 18px;
}
.drop-panel {
  min-height: 520px;
  display: grid;
  align-content: start;
  gap: 14px;
  padding: 20px;
}
.countdown-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}
.countdown-grid .metric-tile {
  min-height: 92px;
  text-align: center;
}
.drop-list {
  display: grid;
  gap: 10px;
}
.drop-list button,
.track-strip article {
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  padding: 12px;
  color: var(--text);
  background: color-mix(in srgb, var(--surface), var(--primary) 6%);
  border: 1px solid var(--border);
  border-radius: var(--control-radius);
}
.track-strip article {
  grid-template-columns: 72px minmax(0, 1fr) auto;
}
.drop-list span,
.track-strip b {
  color: var(--accent);
  font-weight: 950;
}
.track-strip b {
  white-space: nowrap;
}
.drop-list em,
.track-strip em {
  font-style: normal;
  color: var(--muted);
  font-size: 13px;
}
.track-strip {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}
.sticker-shop {
  grid-template-columns: 360px 1fr;
}
.pack-builder,
.shop-catalog,
.product-card,
.cart-summary {
  background: var(--surface);
  border: 2px solid var(--border);
  border-radius: var(--panel-radius);
  box-shadow: var(--shadow);
}
.pack-builder {
  min-height: 680px;
  display: grid;
  align-content: start;
  gap: 18px;
  padding: 24px;
}
.pack-builder h1 {
  font-size: 42px;
  line-height: 1.02;
}
.sticker-preview-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 14px;
  background: color-mix(in srgb, var(--accent), var(--surface) 64%);
  border: 2px solid var(--border);
  border-radius: var(--media-radius);
}
.sticker-preview-grid span,
.sticker-thumb span {
  min-height: 68px;
  border: 2px solid var(--border);
  border-radius: 42% 58% 44% 56%;
  background: linear-gradient(135deg, var(--primary), var(--accent));
}
.shop-catalog {
  min-height: 680px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-auto-rows: minmax(220px, auto);
  gap: 16px;
  padding: 18px;
  background: transparent;
  border: 0;
  box-shadow: none;
}
.product-card {
  display: grid;
  gap: 12px;
  padding: 18px;
  transform: rotate(-1deg);
}
.product-card:nth-child(2) {
  transform: rotate(1deg);
}
.product-card div:last-child {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
.product-card em {
  padding: 6px 10px;
  color: var(--muted);
  border: 1px solid var(--border);
  border-radius: var(--chip-radius);
  font-style: normal;
  font-weight: 900;
}
.sticker-thumb {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.cart-summary {
  grid-column: 1 / -1;
  display: grid;
  gap: 16px;
  align-content: start;
  padding: 20px;
}
.brief-editor h1,
.line-workflow .workflow-head h1,
.daily-panel h1,
.session-card h1,
.builder-copy h1,
.practice-card h1 {
  font-size: 38px;
  line-height: 1.08;
}
.brief-editor {
  display: grid;
  gap: 14px;
}
.editor-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  padding: 10px;
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  background: color-mix(in srgb, var(--surface), var(--bg) 9%);
}
.editor-toolbar span,
.editor-toolbar button {
  padding: 8px 10px;
  border: 1px solid var(--border);
  border-radius: var(--control-radius);
  color: var(--muted);
  background: var(--surface);
  font-weight: 800;
}
.editor-toolbar button {
  margin-left: auto;
  color: var(--bg);
  background: var(--primary);
}
.brief-body {
  display: grid;
  gap: 12px;
}
.brief-body section {
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  background: color-mix(in srgb, var(--surface), var(--bg) 8%);
}
.brief-body b {
  display: block;
  margin-bottom: 8px;
}
.decision-stack .primary-action {
  margin-top: 6px;
}
.process-map {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0;
  min-height: 320px;
  border: 1px solid var(--border);
  background: var(--surface);
}
.process-map article {
  position: relative;
  display: grid;
  align-content: start;
  gap: 14px;
  padding: 22px;
  border-right: 1px solid var(--border);
}
.process-map article:last-child {
  border-right: 0;
}
.process-map article::after {
  content: "";
  position: absolute;
  left: 64px;
  right: -64px;
  top: 43px;
  height: 1px;
  background: var(--accent);
}
.process-map article:last-child::after {
  display: none;
}
.process-map span {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  color: var(--bg);
  background: var(--accent);
  border-radius: 50%;
  font-weight: 950;
}
.process-map em {
  justify-self: start;
  padding: 6px 10px;
  border: 1px solid var(--border);
  border-radius: var(--chip-radius);
  color: var(--primary);
  font-style: normal;
  font-weight: 900;
}
.evidence-list {
  display: grid;
  gap: 10px;
  margin-top: 14px;
}
.evidence-list span {
  display: flex;
  gap: 10px;
  padding: 10px;
  border: 1px solid var(--border);
  border-radius: var(--control-radius);
}
.daily-panel {
  display: grid;
  gap: 16px;
  align-content: start;
}
.day-chip {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 14px;
  color: var(--text);
  background: var(--accent);
  border-radius: var(--control-radius);
}
.daily-cloud {
  grid-template-columns: 1.1fr .9fr;
  align-content: start;
}
.focus-card {
  grid-column: 1 / -1;
  padding: 20px;
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  background: color-mix(in srgb, var(--accent), var(--surface) 62%);
}
.focus-card .chart {
  height: 120px;
  margin-top: 14px;
}
.daily-cloud .metric-row {
  grid-column: 1 / -1;
}
.bento-profile {
  grid-template-columns: 1.2fr .8fr .8fr .8fr;
  grid-auto-rows: 150px;
}
.hero-tile h1 {
  max-width: 620px;
  font-size: 38px;
  line-height: 1.05;
}
.media-tile {
  grid-row: span 2;
}
.stat-tile {
  grid-row: span 2;
  align-content: stretch;
  gap: 10px;
}
.stat-tile > b {
  align-self: start;
  color: var(--muted);
  font-size: 12px;
  text-transform: uppercase;
}
.bento-stat {
  display: grid;
  align-content: center;
  min-height: 72px;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: var(--chip-radius);
  background: color-mix(in srgb, var(--accent), transparent 90%);
}
.bento-stat strong {
  font-size: 22px;
  line-height: 1;
}
.bento-stat em {
  margin-top: 6px;
  font-style: normal;
  color: var(--muted);
}
.mini-shot {
  min-height: 150px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 12px;
}
.mini-shot span {
  border: 1px solid var(--border);
  border-radius: var(--control-radius);
  background: linear-gradient(160deg, var(--accent), var(--surface));
}
.quote-tile {
  display: grid;
  align-content: center;
  gap: 10px;
  color: var(--surface);
  background: var(--primary);
}
.timeline-tile {
  display: grid;
  gap: 10px;
}
.timeline-tile span {
  display: grid;
  grid-template-columns: 32px minmax(0, 1fr) auto;
  gap: 8px;
  align-items: center;
}
.timeline-tile em {
  color: var(--accent);
  font-style: normal;
  font-weight: 900;
}
.bento-tile.wide {
  grid-column: 3 / span 2;
  grid-row: span 2;
  display: grid;
  grid-template-rows: repeat(3, minmax(0, 1fr));
  gap: 8px;
  padding: 16px;
}
.bento-tile.wide .feature-block {
  min-height: 0;
  overflow: hidden;
  padding: 10px 12px;
}
.bento-tile.wide .feature-block span {
  margin-bottom: 3px;
  font-size: 12px;
}
.bento-tile.wide .feature-block h3 {
  margin-bottom: 3px;
  font-size: 16px;
  line-height: 1.15;
}
.bento-tile.wide .feature-block p {
  display: -webkit-box;
  overflow: hidden;
  font-size: 12.5px;
  line-height: 1.32;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.session-card {
  align-content: start;
  display: grid;
  gap: 18px;
}
.session-readout {
  display: grid;
  place-items: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  box-shadow: inset 10px 10px 22px rgba(148,163,184,.38), inset -10px -10px 22px rgba(255,255,255,.88);
}
.session-readout strong {
  font-size: 38px;
}
.waveform {
  grid-column: 1 / -1;
  height: 120px;
  display: flex;
  align-items: end;
  gap: 10px;
  padding: 20px;
  border-radius: 999px;
  box-shadow: inset 8px 8px 18px rgba(148,163,184,.32), inset -8px -8px 18px rgba(255,255,255,.84);
}
.waveform i {
  flex: 1;
  border-radius: 999px 999px 0 0;
  background: linear-gradient(180deg, var(--accent), var(--primary));
}
.gradient-builder {
  grid-template-columns: 400px minmax(0, 1fr) 280px;
}
.builder-copy,
.builder-canvas,
.template-stack {
  align-content: start;
  min-height: 560px;
}
.live-canvas {
  min-height: 230px;
  display: grid;
  gap: 12px;
  padding: 18px;
  background: rgba(255,255,255,.82);
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
}
.canvas-layers {
  display: grid;
  grid-template-columns: 1.3fr .8fr;
  gap: 12px;
}
.canvas-layers span {
  min-height: 92px;
  border-radius: var(--media-radius);
  background: linear-gradient(135deg, var(--primary), var(--accent));
}
.canvas-layers span:first-child {
  grid-row: span 2;
}
.builder-checks {
  display: grid;
  gap: 10px;
  margin-top: 14px;
}
.builder-checks .feature-block {
  padding: 14px;
  background: rgba(255,255,255,.76);
}
.template-stack {
  display: grid;
  gap: 12px;
}
.soft-learning {
  grid-template-columns: 240px minmax(0, 1fr) 300px;
}
.lesson-path,
.learning-notes {
  min-height: 520px;
  display: grid;
  align-content: start;
  gap: 12px;
  padding: 18px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  box-shadow: var(--shadow);
}
.lesson-path button {
  display: grid;
  grid-template-columns: 36px minmax(0, 1fr);
  gap: 8px 10px;
  align-items: center;
  padding: 12px;
  color: var(--text);
  background: color-mix(in srgb, var(--surface), var(--accent) 8%);
  border: 1px solid var(--border);
  border-radius: var(--control-radius);
}
.lesson-path span {
  grid-row: span 2;
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  color: var(--bg);
  background: var(--primary);
  border-radius: 50%;
  font-weight: 950;
}
.lesson-path em {
  color: var(--muted);
  font-style: normal;
  font-size: 13px;
}
.practice-card {
  min-height: 520px;
  display: grid;
  align-content: start;
  gap: 16px;
}
.practice-card h1 {
  max-width: 680px;
}
.prompt-card {
  padding: 18px;
  border: 1px dashed var(--border);
  border-radius: var(--panel-radius);
  background: color-mix(in srgb, var(--accent), var(--surface) 76%);
}
.learning-notes .progress-path {
  display: grid;
  grid-template-columns: 1fr;
}
.learning-notes .progress-path span {
  min-height: 78px;
  border-radius: var(--panel-radius);
}
body.block-brutalism .primary-action,
body.neo-brutalism .primary-action,
body.retro-computing .primary-action,
body.cutealism .primary-action {
  border-width: 2px;
  border-radius: 0;
  box-shadow: 6px 6px 0 var(--border);
}
body.swiss-editorial .primary-action,
body.swiss-editorial .ghost-action {
  min-height: auto;
  padding: 0;
  border: 0;
  border-radius: 0;
  color: var(--primary);
  background: transparent;
  border-bottom: 1px solid currentColor;
}
body.terminal-hacker .primary-action,
body.terminal-hacker .queue-card {
  border-radius: 0;
}
body.liquid-glass .primary-action,
body.liquid-glass .queue-card,
body.liquid-glass .metric-tile {
  backdrop-filter: blur(18px) saturate(1.35);
  background: color-mix(in srgb, var(--surface), transparent 14%);
}
.interaction-demo {
  display: grid;
  grid-template-columns: .84fr 1.16fr;
  gap: 18px;
  margin-top: 28px;
  align-items: stretch;
}
.interaction-copy,
.state-board {
  padding: 20px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  box-shadow: var(--shadow);
}
.interaction-copy h2 {
  font-size: 30px;
  line-height: 1.12;
}
.implementation-list {
  display: grid;
  gap: 10px;
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
}
.implementation-list li {
  display: grid;
  gap: 4px;
  padding: 12px;
  color: var(--muted);
  background: color-mix(in srgb, var(--surface), var(--bg) 12%);
  border: 1px solid var(--border);
  border-radius: var(--chip-radius);
  font-size: 13px;
  line-height: 1.45;
}
.implementation-list b {
  color: var(--text);
}
.state-board {
  display: grid;
  gap: 14px;
  align-content: start;
}
.state-board-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}
.state-board-head span {
  min-width: 0;
  color: var(--muted);
  font-weight: 800;
}
.state-board-head strong {
  font-size: 28px;
  font-variant-numeric: tabular-nums;
}
.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.toggle-chip {
  min-height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 14px;
  color: var(--text);
  background: color-mix(in srgb, var(--surface), var(--bg) 12%);
  border: 1px solid var(--border);
  border-radius: var(--chip-radius);
  font-weight: 800;
  cursor: pointer;
  transition: transform .18s ease, background .18s ease, border-color .18s ease, color .18s ease;
}
.toggle-chip:hover {
  transform: translateY(-2px);
}
.toggle-chip[aria-pressed="true"] {
  color: var(--bg);
  background: var(--accent);
  border-color: var(--accent);
}
.loading-action[aria-busy="true"] {
  position: relative;
  color: transparent;
  pointer-events: none;
}
.loading-action[aria-busy="true"]::after {
  content: "Saving";
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: var(--text);
}
.inline-alert {
  display: grid;
  gap: 6px;
  padding: 14px;
  color: var(--text);
  background: color-mix(in srgb, var(--surface), var(--accent) 10%);
  border: 1px solid color-mix(in srgb, var(--border), var(--accent) 28%);
  border-radius: var(--control-radius);
}
.inline-alert span {
  color: var(--muted);
  font-size: 14px;
  line-height: 1.48;
}
.field-group {
  display: grid;
  gap: 7px;
}
.field-group span {
  color: var(--text);
  font-size: 13px;
  font-weight: 900;
}
.field-group input {
  width: 100%;
  min-height: 44px;
  padding: 0 12px;
  color: var(--text);
  background: color-mix(in srgb, var(--surface), var(--bg) 10%);
  border: 1px solid var(--border);
  border-radius: var(--control-radius);
}
.field-group input[aria-invalid="true"] {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent), transparent 74%);
}
.field-group small {
  color: var(--muted);
  line-height: 1.45;
}
.state-stack {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}
.state-pill {
  min-width: 0;
  display: grid;
  gap: 4px;
  padding: 12px;
  color: var(--muted);
  background: color-mix(in srgb, var(--surface), var(--bg) 12%);
  border: 1px solid var(--border);
  border-radius: var(--chip-radius);
  font-size: 13px;
  line-height: 1.42;
}
.state-pill b {
  color: var(--text);
}
.state-pill.success {
  border-color: color-mix(in srgb, #16a34a, var(--border) 52%);
}
.state-pill.loading {
  border-color: color-mix(in srgb, var(--accent), var(--border) 48%);
}
.state-pill.empty {
  opacity: .86;
}
.state-pill.error {
  border-color: color-mix(in srgb, #dc2626, var(--border) 46%);
}
.responsive-steps {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}
.responsive-steps span {
  min-width: 0;
  padding: 12px;
  color: var(--muted);
  background: color-mix(in srgb, var(--surface), var(--bg) 14%);
  border: 1px solid var(--border);
  border-radius: var(--chip-radius);
  font-size: 13px;
  line-height: 1.45;
}
.responsive-steps b {
  display: block;
  margin-bottom: 4px;
  color: var(--text);
}
.toast {
  position: fixed;
  left: 50%;
  bottom: 24px;
  z-index: 30;
  width: min(360px, calc(100vw - 48px));
  display: grid;
  gap: 4px;
  padding: 14px 16px;
  color: var(--text);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--control-radius);
  box-shadow: var(--shadow);
  transform: translateX(-50%);
}
.toast[hidden] {
  display: none;
}
.toast span {
  color: var(--muted);
  font-size: 14px;
}
.style-lab {
  display: grid;
  grid-template-columns: .9fr 1.1fr;
  gap: 18px;
  margin-top: 28px;
  align-items: start;
}
.lab-summary,
.lab-workspace,
.panel {
  padding: 20px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  box-shadow: var(--shadow);
}
.detail-pills {
  display: grid;
  gap: 8px;
  margin-top: 16px;
}
.detail-pills span {
  max-width: 100%;
  padding: 8px 10px;
  color: var(--muted);
  border: 1px solid var(--border);
  border-radius: var(--chip-radius);
  font-size: 13px;
  line-height: 1.45;
}
.lab-summary h2 {
  font-size: 30px;
  line-height: 1.12;
}
.lab-summary p,
.panel p {
  font-size: 15px;
}
.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}
.tabs button {
  min-height: 36px;
  color: var(--muted);
  background: transparent;
}
.tabs button.active {
  color: var(--bg);
  background: var(--primary);
  border-color: var(--primary);
}
.workspace-grid {
  display: grid;
  grid-template-columns: 1.15fr .85fr;
  gap: 14px;
}
.related {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 14px;
}
.related a {
  padding: 10px 12px;
  color: var(--muted);
  border: 1px solid var(--border);
  border-radius: var(--chip-radius);
  text-decoration: none;
}
.modal {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 20;
  width: min(380px, calc(100vw - 48px));
  padding: 18px;
  color: var(--text);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  box-shadow: var(--shadow);
}
.modal[hidden] { display: none; }
.modal ul {
  padding-left: 20px;
  color: var(--muted);
  line-height: 1.5;
}
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: .001ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: .001ms !important;
  }
}
@media (max-width: 980px) {
  .page {
    width: 100%;
    max-width: 760px;
    padding: 16px calc(14px + env(safe-area-inset-right)) 48px calc(14px + env(safe-area-inset-left));
  }
  .top-nav,
  .board-toolbar,
  .workflow-head {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    align-items: start;
    width: 100%;
    gap: 14px;
  }
  .brand-lockup,
  .nav-links {
    flex-wrap: wrap;
  }
  h1,
  .street-poster h1,
  .brutal-release h1,
  .acid-poster h1,
  .editorial-lead h1 {
    font-size: clamp(30px, 8vw, 42px);
    line-height: 1.06;
  }
  h2 { font-size: clamp(24px, 6vw, 28px); }
  .ops-board,
  .board-toolbar,
  .ticket-grid,
  .ticket-list,
  .drop-console,
  .release-player,
  .track-strip,
  .street-poster,
  .aurora-lab,
  .stage-center,
  .editorial-index,
  .terminal-console,
  .sticker-shop,
  .shop-catalog,
  .stark-portfolio,
  .minimal-brief,
  .dark-render,
  .line-workflow,
  .process-map,
  .material-day,
  .daily-cloud,
  .bento-profile,
  .timeline-tile span,
  .neumo-console,
  .glass-map,
  .retro-desktop,
  .brutal-release,
  .precision-graph,
  .gradient-builder,
  .canvas-layers,
  .soft-learning,
  .acid-poster,
  .interaction-demo,
  .style-lab,
  .workspace-grid,
  .responsive-steps {
    display: grid;
    grid-template-columns: 1fr;
  }
  .ops-board,
  .board-main,
  .board-inspector,
  .ticket-grid,
  .ticket-list,
  .drop-console,
  .release-player,
  .track-strip,
  .street-poster,
  .aurora-lab,
  .stage-center,
  .editorial-index,
  .terminal-console,
  .sticker-shop,
  .shop-catalog,
  .stark-portfolio,
  .minimal-brief,
  .dark-render,
  .line-workflow,
  .process-map,
  .material-day,
  .daily-cloud,
  .bento-profile,
  .neumo-console,
  .glass-map,
  .retro-desktop,
  .brutal-release,
  .precision-graph,
  .gradient-builder,
  .canvas-layers,
  .soft-learning,
  .acid-poster,
  .interaction-demo,
  .style-lab,
  .workspace-grid,
  .responsive-steps,
  .metric-row,
  .queue-list,
  .state-stack {
    min-width: 0;
    max-width: 100%;
  }
  .button-row,
  .toolbar-actions,
  .poster-actions,
  .session-actions,
  .related,
  .detail-pills {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .button-row > *,
  .toolbar-actions > *,
  .poster-actions > *,
  .session-actions > *,
  .related a,
  .tabs button {
    flex: 1 1 min(100%, 160px);
  }
  .filter-rail,
  .brief-sidebar,
  .comment-stack,
  .phone-panel,
  .shop-hero,
  .sticker-shelf,
  .frame-viewer,
  .render-queue,
  .map-field .media,
  .node-graph,
  .lesson-card {
    min-height: auto;
  }
  .metric-row,
  .lane-map,
  .routine-cloud,
  .mixer-board,
  .countdown-grid,
  .progress-path,
  .state-stack {
    grid-template-columns: 1fr;
  }
  .toolbar-actions {
    justify-content: flex-start;
  }
  .filter-rail {
    grid-template-columns: 1fr;
  }
  .filter-rail span,
  .filter-rail .rail-active {
    width: 100%;
  }
  .queue-card {
    align-items: flex-start;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .queue-card b,
  .queue-card span {
    flex: 1 1 100%;
    text-align: left;
  }
  .score-row {
    grid-template-columns: 1fr;
  }
  .score-row i {
    width: 100%;
  }
  .review-note span,
  .run-head,
  .ticket-strip span {
    display: grid;
    grid-template-columns: 1fr;
  }
  .chart {
    height: 140px;
    gap: 6px;
    padding: 10px;
  }
  .media {
    min-height: 220px;
  }
  .media::before {
    inset: 14px;
  }
  .media::after {
    left: 18px;
    right: 18px;
    bottom: 18px;
  }
  .chip-a { left: 16px; bottom: 22px; }
  .chip-b { right: 16px; top: 22px; }
  .card-a { left: 44px; top: 104px; }
  .card-b { right: 34px; top: 108px; }
  .card-c { width: min(150px, calc(100% - 48px)); }
  .ticket-card.priority {
    grid-row: auto;
    min-height: 150px;
  }
  .release-player,
  .drop-panel,
  .track-strip article,
  .pack-builder,
  .shop-catalog,
  .product-card,
  .cart-summary,
  .process-map,
  .practice-card,
  .lesson-path,
  .learning-notes {
    min-height: auto;
  }
  .track-strip,
  .cart-summary,
  .focus-card,
  .daily-cloud .metric-row,
  .hero-tile,
  .bento-tile.wide,
  .media-tile,
  .waveform {
    grid-column: auto;
    grid-row: auto;
  }
  .process-map article {
    border-right: 0;
    border-bottom: 1px solid var(--border);
  }
  .process-map article::after {
    display: none;
  }
  .shop-catalog {
    padding: 0;
  }
  .retro-desktop {
    min-height: auto;
    gap: 14px;
    padding: 14px;
  }
  .window {
    position: static;
    width: auto;
  }
  .lead-window,
  .player-window,
  .files-window {
    width: auto;
  }
  .modal {
    left: 14px;
    right: 14px;
    bottom: 14px;
    width: auto;
  }
}
@media (max-width: 480px) {
  .page {
    padding: 14px calc(14px + env(safe-area-inset-right)) 44px calc(14px + env(safe-area-inset-left));
  }
  .top-nav {
    margin-bottom: 16px;
  }
  .brand-lockup span {
    width: 34px;
    height: 34px;
  }
  h1,
  .street-poster h1,
  .brutal-release h1,
  .acid-poster h1,
  .editorial-lead h1 {
    font-size: clamp(28px, 9vw, 36px);
  }
  p {
    font-size: 15px;
    line-height: 1.52;
  }
  .primary-action,
  .secondary-action,
  .ghost-action,
  .text-action,
  .queue-card,
  .tabs button {
    width: 100%;
    min-height: 44px;
    padding: 10px 12px;
  }
  .metric-row,
  .signal-stats,
  .glass-metrics,
  .trace-metrics {
    grid-template-columns: 1fr;
  }
  .session-dashboard {
    grid-template-columns: 1fr;
    justify-items: stretch;
  }
  .session-readout {
    justify-self: center;
  }
  .session-meta span {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    align-items: center;
  }
  .session-meta b {
    text-align: right;
  }
  .board-main,
  .board-inspector,
  .ticket-card,
  .lab-copy,
  .trace-panel,
  .glass-panel,
  .render-queue,
  .lab-summary,
  .lab-workspace,
  .panel,
  .feature-block,
  .filter-rail {
    padding: 14px;
  }
  .chart {
    height: 128px;
  }
  .stamp.big {
    min-height: 120px;
    font-size: clamp(36px, 14vw, 52px);
  }
}
</style>
</head>
<body class="${style.className}">
  <main id="top" class="page">
    ${renderMiniNav(style, scenario)}
    ${renderLayoutContent(style, scenario, playbook)}
    ${renderInteractionDemo(style, scenario, playbook)}
    ${renderStyleLab(style, scenario, playbook, related)}
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
  const demo = ${demo};
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
  document.querySelectorAll('[data-open-modal]').forEach((node) => node.addEventListener('click', () => {
    modal.hidden = false;
    document.querySelector('[data-close-modal]').focus();
  }));
  document.querySelector('[data-close-modal]').addEventListener('click', () => modal.hidden = true);
  document.querySelectorAll('[data-copy]').forEach((button) => {
    const original = button.textContent;
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(prompt);
        button.textContent = 'Copied detailed prompt';
        status.textContent = 'Detailed style prompt copied';
        showToast('Detailed style prompt copied');
        setTimeout(() => button.textContent = original, 1500);
      } catch {
        window.prompt('Copy this detailed style prompt:', prompt);
      }
    });
  });
  document.querySelectorAll('[data-toast-trigger]').forEach((button) => {
    button.addEventListener('click', () => showToast('Primary action confirmed'));
  });
  document.querySelectorAll('[data-loading-demo]').forEach((button) => {
    const original = button.textContent;
    button.addEventListener('click', () => {
      if (button.getAttribute('aria-busy') === 'true') return;
      button.setAttribute('aria-busy', 'true');
      button.disabled = true;
      status.textContent = 'Saving state';
      setTimeout(() => {
        button.setAttribute('aria-busy', 'false');
        button.disabled = false;
        button.textContent = original;
        showToast('State saved without layout shift');
      }, 1200);
    });
  });
  document.querySelectorAll('[data-toggle-demo]').forEach((button) => {
    button.addEventListener('click', () => {
      const pressed = button.getAttribute('aria-pressed') === 'true';
      button.setAttribute('aria-pressed', String(!pressed));
      button.textContent = pressed ? 'Filter off' : 'Filter on';
      showToast(pressed ? 'Filter removed' : 'Filter applied');
    });
  });
  document.querySelectorAll('[data-demo-input]').forEach((input) => {
    input.addEventListener('input', () => {
      const helper = input.closest('.field-group')?.querySelector('[data-field-help]');
      if (!helper) return;
      if (input.value.trim().length < 3) {
        input.setAttribute('aria-invalid', 'true');
        helper.textContent = 'Add at least three characters so the field has a recoverable validation state.';
        status.textContent = 'Field validation warning';
      } else {
        input.removeAttribute('aria-invalid');
        helper.textContent = 'Filled state is valid and helper text remains visible.';
        status.textContent = 'Field validation cleared';
      }
    });
  });
  document.querySelectorAll('[data-tab]').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-tab]').forEach((node) => {
        const active = node === button;
        node.classList.toggle('active', active);
        node.setAttribute('aria-selected', String(active));
      });
      document.querySelector('[data-demo-title]').textContent = demo[button.dataset.tab][0];
      document.querySelector('[data-demo-copy]').textContent = demo[button.dataset.tab][1];
      status.textContent = demo[button.dataset.tab][0] + ' tab selected';
    });
  });
  </script>
</body>
</html>
`;
}

function renderStyleHtml(style) {
  return renderDistinctStyleHtml(style);
}

function renderStyleDoc(style) {
  const label = style.label || `Style ${style.id}`;
  const scenario = getScenario(style);
  const playbook = getStylePlaybook(style);
  const geometry = getGeometryProfile(style);
  const implementation = getImplementationProfile(style);
  const adaptation = getAdaptationProfile(style);
  const notes = style.notes.map((note) => `- ${note}`).join("\n");
  const features = scenario.features.map(([title, body]) => `- ${title}: ${body}`).join("\n");
  const queue = scenario.queue.map(([title, state]) => `- ${title}: ${state}`).join("\n");
  const promptSections = promptKinds
    .map((item) => `### ${item.promptEn}\n\n\`\`\`text\n${buildStylePrompt(style, "en", item.key)}\n\`\`\``)
    .join("\n\n");
  return `# ${label} - ${style.name} (${style.zhName})

## Summary

${style.brief}

Chinese summary: ${style.zhBrief}

## Best For

${style.bestFor}

## Example Scenario

- Product sample: ${scenario.brand}
- Page job: ${scenario.eyebrow}
- Headline: ${scenario.headline}
- Primary action: ${scenario.primaryAction}
- Secondary action: ${scenario.secondaryAction}

## Scenario Components

${features}

## Example States

${queue}

## Layout Pattern

- Pattern: ${playbook.name} (${playbook.zhName})
- Archetype: ${playbook.name}
- Structure: ${playbook.structure}
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: ${playbook.typography}
- Components: ${playbook.components}
- Buttons: ${playbook.buttons}
- Icons and media: ${playbook.media}
- States: ${playbook.states}
- Avoid: ${playbook.avoid}

## Visual Language

- Background: \`${style.bg}\`
- Surface: \`${style.surface}\`
- Text: \`${style.text}\`
- Muted text: \`${style.muted}\`
- Primary: \`${style.primary}\`
- Accent: \`${style.accent}\`
- Border: \`${style.border}\`
- Radius: \`${style.radius}\`
- Panel radius: \`${geometry.panel}\`
- Control radius: \`${geometry.control}\`
- Chip radius: \`${geometry.chip}\`
- Media radius: \`${geometry.media}\`
- Geometry rule: ${geometry.description}; avoid making every button and card the same large rounded rectangle.
- Shadow: \`${style.shadow}\`

## Component Detail System

- Button system: ${implementation.buttons}
- Feedback and alerts: ${implementation.feedback}
- Spacing system: ${implementation.spacing}
- Responsive behavior: ${implementation.responsive}

Chinese implementation notes:

- 按钮细节：${implementation.zhButtons}
- 提示与反馈：${implementation.zhFeedback}
- 间距系统：${implementation.zhSpacing}
- 响应式策略：${implementation.zhResponsive}

## Page Adaptation Guide

- Landing page: ${adaptation.landing}
- Dashboard: ${adaptation.dashboard}
- Admin panel: ${adaptation.admin}
- Forms, tables, and data: ${adaptation.forms}
- Mobile: ${adaptation.mobile}
- Not a good fit for: ${adaptation.unsuitable}

## Usage Notes

${notes}

## Copy Style Prompts

${promptSections}

## Design Dials

- Layout variance: choose low, medium, or high based on product risk and brand confidence.
- Motion intensity: choose none, subtle, or expressive based on workflow sensitivity.
- Visual density: choose sparse, normal, or dense based on how much the first viewport must support.

## Implementation Guidance

- Start from tokens for background, surface, text, muted text, primary, accent, border, radius, shadow, and focus.
- Apply the style to the user's actual page structure. Do not copy the bundled sample HTML layout.
- Keep hover, focus, selected, disabled, loading, empty, warning, and success states visually consistent.
- Define primary, secondary, disabled, loading, pressed, selected, warning, success, and destructive button treatments when those actions appear.
- Provide at least one visible feedback pattern for the page: toast, snackbar, banner, inline alert, validation message, or row-local status.
- Define spacing tokens for page gutters, section gaps, panel padding, control height, row gaps, and dense/touch-friendly variants.
- Document desktop, tablet, and mobile collapse behavior for the main content object, filters, sidebars, inspectors, tables, media, and primary action.
- Use semantic controls, visible focus states, accessible labels, stable media dimensions, reduced-motion behavior, and intentional long-text handling.
- Define a component state matrix for the components that appear on the page before final polish.
- Make empty, error, loading, warning, success, disabled, and selected states explain what happened and what the user can do next.
- When the page needs images, prefer real product imagery, brand photography, or carefully matched neutral media.
- Keep icon family, stroke, size, and alignment consistent when icons are used.
- Check desktop and mobile screenshots before finishing.

## Do Not

- Do not reuse the sample product name, sample copy, or sample layout as production content.
- Do not reduce the style to a palette swap.
- Do not use decorative effects to hide weak hierarchy, vague copy, missing states, or poor responsive structure.
`;
}

function cleanRemovedStyles() {
  fs.mkdirSync(stylesDir, { recursive: true });
  fs.mkdirSync(styleRefsDir, { recursive: true });

  removedStyleSlugs.forEach((slug) => {
    fs.rmSync(path.join(stylesDir, slug), { recursive: true, force: true });
    fs.rmSync(path.join(styleRefsDir, `${slug}.md`), { force: true });
    fs.rmSync(path.join(styleRefsDir, `${slug}-design-system.md`), { force: true });
  });
}

function writeStyleFiles() {
  cleanRemovedStyles();

  allStyles.forEach((style) => {
    const dir = path.join(stylesDir, style.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, `${style.slug}.html`), renderStyleHtml(style));
    fs.writeFileSync(path.join(styleRefsDir, `${style.slug}.md`), renderStyleDoc(style));
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function waitForProcessExit(child, timeoutMs) {
  if (!child || child.exitCode !== null || child.signalCode !== null) return Promise.resolve(true);

  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(false), timeoutMs);
    child.once("exit", () => {
      clearTimeout(timer);
      resolve(true);
    });
  });
}

async function removeDirectoryWithRetry(dir) {
  for (let attempt = 0; attempt < 6; attempt += 1) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
      return;
    } catch (error) {
      if (attempt === 5) throw error;
      await sleep(120 * (attempt + 1));
    }
  }
}

async function waitForChromeJson(port, timeoutMs) {
  const startedAt = Date.now();
  let lastError;

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json`);
      if (response.ok) {
        const tabs = await response.json();
        if (Array.isArray(tabs) && tabs.length > 0) return tabs;
      }
    } catch (error) {
      lastError = error;
    }
    await sleep(100);
  }

  throw new Error(`Chrome DevTools did not become ready on port ${port}: ${lastError?.message || "timeout"}`);
}

function encodeWebSocketFrame(text) {
  const payload = Buffer.from(text);
  const headerLength = payload.length < 126 ? 2 : payload.length < 65536 ? 4 : 10;
  const frame = Buffer.alloc(headerLength + 4 + payload.length);
  let offset = 2;

  frame[0] = 0x81;
  if (payload.length < 126) {
    frame[1] = 0x80 | payload.length;
  } else if (payload.length < 65536) {
    frame[1] = 0x80 | 126;
    frame.writeUInt16BE(payload.length, 2);
    offset = 4;
  } else {
    frame[1] = 0x80 | 127;
    frame.writeBigUInt64BE(BigInt(payload.length), 2);
    offset = 10;
  }

  const mask = crypto.randomBytes(4);
  mask.copy(frame, offset);
  for (let index = 0; index < payload.length; index += 1) {
    frame[offset + 4 + index] = payload[index] ^ mask[index % 4];
  }
  return frame;
}

function readWebSocketFrame(buffer) {
  if (buffer.length < 2) return null;

  const opcode = buffer[0] & 0x0f;
  const masked = (buffer[1] & 0x80) !== 0;
  let length = buffer[1] & 0x7f;
  let offset = 2;

  if (length === 126) {
    if (buffer.length < 4) return null;
    length = buffer.readUInt16BE(2);
    offset = 4;
  } else if (length === 127) {
    if (buffer.length < 10) return null;
    length = Number(buffer.readBigUInt64BE(2));
    offset = 10;
  }

  const maskOffset = masked ? offset : -1;
  if (masked) offset += 4;
  if (buffer.length < offset + length) return null;

  const payload = Buffer.from(buffer.subarray(offset, offset + length));
  if (masked) {
    const mask = buffer.subarray(maskOffset, maskOffset + 4);
    for (let index = 0; index < payload.length; index += 1) {
      payload[index] ^= mask[index % 4];
    }
  }

  return { opcode, payload, consumed: offset + length };
}

function createNativeSocket(webSocketUrl, onMessage) {
  const ws = new WebSocket(webSocketUrl);
  const opened = new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve, { once: true });
    ws.addEventListener("error", reject, { once: true });
  });
  ws.addEventListener("message", (event) => onMessage(event.data));

  return {
    opened,
    sendText(text) {
      ws.send(text);
    },
    close() {
      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) ws.close();
    },
  };
}

function createNodeSocket(webSocketUrl, onMessage) {
  const url = new URL(webSocketUrl);
  const key = crypto.randomBytes(16).toString("base64");
  const socket = net.createConnection({
    host: url.hostname,
    port: Number(url.port || 80),
  });

  let buffer = Buffer.alloc(0);
  let handshakeComplete = false;
  let rejectOpen;
  const opened = new Promise((resolve, reject) => {
    rejectOpen = reject;
    socket.once("connect", () => {
      socket.write(
        `GET ${url.pathname}${url.search} HTTP/1.1\r\n` +
          `Host: ${url.host}\r\n` +
          "Upgrade: websocket\r\n" +
          "Connection: Upgrade\r\n" +
          `Sec-WebSocket-Key: ${key}\r\n` +
          "Sec-WebSocket-Version: 13\r\n\r\n"
      );
    });
    socket.on("data", (chunk) => {
      buffer = Buffer.concat([buffer, chunk]);
      if (!handshakeComplete) {
        const headerEnd = buffer.indexOf("\r\n\r\n");
        if (headerEnd === -1) return;

        const header = buffer.subarray(0, headerEnd).toString("utf8");
        if (!header.startsWith("HTTP/1.1 101")) {
          reject(new Error(`Chrome WebSocket handshake failed: ${header.split("\r\n")[0]}`));
          socket.destroy();
          return;
        }

        handshakeComplete = true;
        buffer = buffer.subarray(headerEnd + 4);
        resolve();
      }

      let frame = readWebSocketFrame(buffer);
      while (frame) {
        buffer = buffer.subarray(frame.consumed);
        if (frame.opcode === 1) onMessage(frame.payload.toString("utf8"));
        if (frame.opcode === 8) socket.end();
        frame = readWebSocketFrame(buffer);
      }
    });
    socket.once("error", reject);
  });

  socket.once("error", (error) => {
    if (!handshakeComplete) rejectOpen?.(error);
  });

  return {
    opened,
    sendText(text) {
      socket.write(encodeWebSocketFrame(text));
    },
    close() {
      socket.end();
      socket.destroy();
    },
  };
}

function createCdpClient(webSocketUrl) {
  let nextId = 1;
  const pending = new Map();

  function handleMessage(raw) {
    const data = JSON.parse(raw);
    if (!data.id || !pending.has(data.id)) return;

    const { method, resolve, reject } = pending.get(data.id);
    pending.delete(data.id);
    if (data.error) {
      reject(new Error(`${method} failed: ${data.error.message || JSON.stringify(data.error)}`));
    } else {
      resolve(data.result || {});
    }
  }

  const socket =
    typeof WebSocket === "function"
      ? createNativeSocket(webSocketUrl, handleMessage)
      : createNodeSocket(webSocketUrl, handleMessage);

  function send(method, params = {}) {
    const id = nextId++;
    return new Promise((resolve, reject) => {
      pending.set(id, { method, resolve, reject });
      socket.sendText(JSON.stringify({ id, method, params }));
    });
  }

  return {
    opened: socket.opened,
    send,
    close() {
      socket.close();
    },
  };
}

async function waitForDocumentReady(send, timeoutMs) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    const result = await send("Runtime.evaluate", {
      expression: "document.readyState",
      returnByValue: true,
    });
    if (result.result?.value === "complete") return;
    await sleep(100);
  }
}

async function screenshot(htmlFile, options = {}) {
  const outputPath = htmlFile.replace(/\.html$/, `${options.suffix || ""}.png`);
  const width = options.width || viewportWidth;
  const height = options.height || viewportHeight;
  const targetUrl = toFileUrl(htmlFile);
  const devtoolsPort = 9300 + Math.floor(Math.random() * 600);
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "awesome-page-design-chrome-"));
  let chrome;
  let client;

  if (!fs.existsSync(chromePath)) {
    throw new Error(`Chrome was not found: ${chromePath}`);
  }

  try {
    chrome = spawn(
      chromePath,
      [
      "--headless=new",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-extensions",
      "--disable-dev-shm-usage",
      "--hide-scrollbars",
      "--no-first-run",
      "--no-default-browser-check",
      "--run-all-compositor-stages-before-draw",
      "--disable-background-timer-throttling",
      "--disable-backgrounding-occluded-windows",
        `--remote-debugging-port=${devtoolsPort}`,
        `--user-data-dir=${userDataDir}`,
        `--window-size=${Math.max(width, 800)},${Math.max(height, 600)}`,
        "about:blank",
      ],
      { stdio: "ignore" }
    );

    const tabs = await waitForChromeJson(devtoolsPort, Math.max(15000, chromeWait + 5000));
    const tab = tabs.find((item) => item.type === "page") || tabs[0];
    client = createCdpClient(tab.webSocketDebuggerUrl);
    await client.opened;
    await client.send("Page.enable");
    await client.send("Runtime.enable");
    await client.send("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width <= 600,
      screenWidth: width,
      screenHeight: height,
    });
    await client.send("Page.navigate", { url: targetUrl });
    await waitForDocumentReady(client.send, Math.max(15000, chromeWait + 5000));
    await sleep(chromeWait);

    const image = await client.send("Page.captureScreenshot", {
      format: "png",
      fromSurface: true,
      captureBeyondViewport: false,
    });
    fs.writeFileSync(outputPath, Buffer.from(image.data, "base64"));
  } finally {
    client?.close();
    if (chrome && chrome.exitCode === null && chrome.signalCode === null) chrome.kill("SIGTERM");
    const exited = await waitForProcessExit(chrome, 1500);
    if (!exited && chrome && chrome.exitCode === null && chrome.signalCode === null) {
      chrome.kill("SIGKILL");
      await waitForProcessExit(chrome, 1500);
    }
    await removeDirectoryWithRetry(userDataDir);
  }

  assertPngHasVisibleContent(outputPath, `Chrome screenshot for ${path.basename(htmlFile)}`);
  return outputPath;
}

function renderPreviewCard(style) {
  const label = style.label || `Style ${style.id}`;
  const promptPayload = {
    en: Object.fromEntries(promptKinds.map((item) => [item.key, buildStylePrompt(style, "en", item.key)])),
    zh: Object.fromEntries(promptKinds.map((item) => [item.key, buildStylePrompt(style, "zh", item.key)])),
  };
  const promptOptions = promptKinds
    .map(
      (item, index) =>
        `<button type="button" role="option" class="prompt-option${index === 0 ? " active" : ""}" data-prompt-option="${item.key}" data-en="${escapeHtml(item.labelEn)}" data-zh="${escapeHtml(item.labelZh)}" data-en-description="${escapeHtml(item.descriptionEn)}" data-zh-description="${escapeHtml(item.descriptionZh)}" data-en-copy="${escapeHtml(item.copyEn)}" data-zh-copy="${escapeHtml(item.copyZh)}" aria-selected="${index === 0 ? "true" : "false"}"><span data-prompt-option-title>${escapeHtml(item.labelEn)}</span><span data-prompt-option-description>${escapeHtml(item.descriptionEn)}</span></button>`
    )
    .join("");
  const defaultPromptKind = promptKinds[0];

  return `    <article class="card">
      <a class="preview" href="../styles/${style.slug}/${style.slug}.html" aria-label="Open ${escapeHtml(label)} ${escapeHtml(style.name)} HTML preview">
        <img
          src="../styles/${style.slug}/${style.slug}.png"
          data-preview-image
          data-desktop-src="../styles/${style.slug}/${style.slug}.png"
          data-mobile-src="../styles/${style.slug}/${style.slug}-mobile.png"
          data-desktop-alt="${escapeHtml(label)} - ${escapeHtml(style.name)} desktop preview"
          data-mobile-alt="${escapeHtml(label)} - ${escapeHtml(style.name)} mobile preview"
          data-desktop-width="${viewportWidth}"
          data-desktop-height="${viewportHeight}"
          data-mobile-width="${mobileViewportWidth}"
          data-mobile-height="${mobileViewportHeight}"
          alt="${escapeHtml(label)} - ${escapeHtml(style.name)} desktop preview"
          width="${viewportWidth}"
          height="${viewportHeight}"
          loading="lazy">
      </a>
      <div class="card-body">
        <div class="card-topline">
          <div class="card-kicker">${escapeHtml(label)}</div>
          <div class="swatches" aria-label="${escapeHtml(label)} color palette">
            <span style="--swatch:${escapeHtml(style.bg)}" title="Background"></span>
            <span style="--swatch:${escapeHtml(style.surface)}" title="Surface"></span>
            <span style="--swatch:${escapeHtml(style.primary)}" title="Primary"></span>
            <span style="--swatch:${escapeHtml(style.accent)}" title="Accent"></span>
          </div>
        </div>
        <h2><span data-en="${escapeHtml(style.name)}" data-zh="${escapeHtml(style.zhName)}">${escapeHtml(style.name)}</span></h2>
        <p data-en="${escapeHtml(style.brief)}" data-zh="${escapeHtml(style.zhBrief)}">${escapeHtml(style.brief)}</p>
        <div class="card-fit"><span data-i18n="bestFor">Best for</span><b data-en="${escapeHtml(style.bestFor)}" data-zh="${escapeHtml(style.zhBestFor)}">${escapeHtml(style.bestFor)}</b></div>
        <div class="actions">
          <div class="prompt-picker" data-prompt-picker data-selected-kind="full">
            <div class="prompt-caption" data-i18n="promptChooser">Page type</div>
            <button type="button" class="prompt-trigger" data-prompt-trigger aria-haspopup="listbox" aria-expanded="false">
              <span data-prompt-label>${escapeHtml(defaultPromptKind.labelEn)}</span>
              <span class="prompt-chev" aria-hidden="true"></span>
            </button>
            <div class="prompt-menu" data-prompt-menu role="listbox" aria-label="Page type" hidden>
              ${promptOptions}
            </div>
          </div>
          <button type="button" data-prompts="${escapeHtml(JSON.stringify(promptPayload))}" data-i18n="copyPrompt">${escapeHtml(defaultPromptKind.copyEn)}</button>
          <a href="../styles/${style.slug}/${style.slug}.html" target="_blank" rel="noopener noreferrer" data-i18n="openHtml">Open HTML</a>
        </div>
      </div>
    </article>`;
}

function writeIndex() {
  fs.mkdirSync(outputDir, { recursive: true });
  const cards = allStyles.map(renderPreviewCard).join("\n");
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Awesome Page Design Previews</title>
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
body {
  margin: 0;
  padding: 38px 32px 64px;
  background: #f6f7fb;
  color: #172033;
  font-family: ui-sans-serif, system-ui, sans-serif;
}
.hero,
.catalog-bar,
.grid {
  width: 100%;
  max-width: 1600px;
  min-width: 0;
}
.hero {
  margin: 0 auto 26px;
  display: grid;
  gap: 20px;
  padding: 0 0 24px;
  border-bottom: 1px solid rgba(17,24,39,0.10);
}
.hero-main {
  display: grid;
  grid-template-columns: minmax(0, 820px) minmax(260px, auto);
  align-items: start;
  justify-content: space-between;
  gap: 44px;
}
.hero-copy {
  max-width: 820px;
  min-width: 0;
}
.eyebrow {
  margin: 0 0 10px;
  color: #2563eb;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: .08em;
  text-transform: uppercase;
}
h1 {
  margin: 0;
  font-size: 40px;
  line-height: 1.1;
  letter-spacing: 0;
}
.meta {
  margin: 10px 0 0;
  color: #667085;
  font-size: 15px;
}
.hint {
  margin: 12px 0 0;
  color: #475467;
  font-size: 15px;
  line-height: 1.6;
  overflow-wrap: anywhere;
}
.hero-meta {
  margin: 16px 0 0;
  color: #667085;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.45;
}
.hero-actions {
  flex: 0 0 auto;
  display: flex;
  justify-content: flex-end;
  padding-top: 2px;
}
.control-stack {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 6px;
  padding: 5px;
  background: #ffffff;
  border: 1px solid rgba(17,24,39,0.10);
  border-radius: 11px;
  box-shadow: 0 12px 30px rgba(15,23,42,0.08);
}
.lang-toggle,
.viewport-toggle {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 0;
  background: transparent;
  border: 0;
  border-radius: 7px;
  box-shadow: none;
}
.lang-toggle button,
.viewport-toggle button {
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
.viewport-toggle button {
  min-width: 82px;
}
button:focus-visible,
a:focus-visible {
  outline: 3px solid #4f46e5;
  outline-offset: 3px;
}
.lang-toggle button.active,
.viewport-toggle button.active {
  background: #111827;
  color: #ffffff;
}
.catalog-bar {
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.count,
.toolbar-note {
  margin: 0;
  color: #667085;
  font-size: 13px;
  overflow-wrap: anywhere;
}
.count {
  color: #344054;
  font-weight: 700;
}
.grid {
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 400px), 1fr));
  gap: 24px;
  align-items: start;
}
.card {
  min-width: 0;
  overflow: hidden;
  color: inherit;
  background: #ffffff;
  border: 1px solid rgba(17,24,39,0.11);
  border-radius: 8px;
  box-shadow: 0 14px 34px rgba(15,23,42,0.06);
}
.preview {
  display: block;
  max-width: 100%;
  padding: 8px;
  color: inherit;
  text-decoration: none;
  background:
    linear-gradient(180deg, #f8fafc, #edf1f7);
  border-bottom: 1px solid rgba(17,24,39,0.08);
}
.preview img {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
  border: 1px solid rgba(17,24,39,0.12);
  border-radius: 5px;
  background: #e5e7eb;
  box-shadow: 0 10px 22px rgba(15,23,42,0.10);
}
.card-body {
  min-width: 0;
  display: grid;
  gap: 12px;
  padding: 16px;
}
.card-topline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.card-kicker {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 0 8px;
  color: #ffffff;
  background: #111827;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.swatches {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.swatches span {
  width: 18px;
  height: 18px;
  border: 1px solid rgba(17,24,39,0.16);
  border-radius: 999px;
  background: var(--swatch);
}
.card h2 {
  margin: 0;
  font-size: 19px;
  line-height: 1.25;
  letter-spacing: 0;
}
.card p {
  min-height: 58px;
  margin: 0;
  color: #667085;
  font-size: 14px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}
.card-fit {
  display: grid;
  gap: 4px;
  padding: 10px 0 0;
  border-top: 1px solid rgba(17,24,39,0.08);
}
.card-fit span {
  color: #98a2b3;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .06em;
  text-transform: uppercase;
}
.card-fit b {
  color: #344054;
  font-size: 13px;
  line-height: 1.35;
  overflow-wrap: anywhere;
}
.actions {
  display: grid;
  grid-template-columns: minmax(0, 170px) minmax(142px, 1fr) auto;
  align-items: end;
  gap: 8px;
  margin-top: 2px;
  padding: 10px;
  background: #f8fafc;
  border: 1px solid rgba(17,24,39,0.08);
  border-radius: 7px;
}
.prompt-picker {
  position: relative;
  min-width: 0;
  display: grid;
  gap: 5px;
}
.prompt-caption {
  color: #667085;
  font-size: 12px;
  font-weight: 750;
  letter-spacing: 0;
  line-height: 1.2;
}
.prompt-trigger {
  width: 100%;
  min-height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 0 12px;
  color: #1d2939;
  background: #ffffff;
  border: 1px solid rgba(17,24,39,0.14);
  border-radius: 6px;
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  text-align: left;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.92);
  transition: border-color 160ms ease, box-shadow 160ms ease, background 160ms ease;
}
.prompt-trigger:hover {
  border-color: rgba(37,99,235,0.38);
  background: #ffffff;
  box-shadow: 0 8px 18px rgba(15,23,42,0.08);
}
.prompt-trigger:focus-visible {
  outline: 0;
  border-color: #2563eb;
  box-shadow:
    0 0 0 3px rgba(37,99,235,0.14),
    inset 0 1px 0 rgba(255,255,255,0.95);
}
.prompt-chev {
  flex: 0 0 auto;
  width: 8px;
  height: 8px;
  border-right: 2px solid #667085;
  border-bottom: 2px solid #667085;
  transform: translateY(-2px) rotate(45deg);
  transition: border-color 160ms ease, transform 160ms ease;
}
.prompt-picker.open .prompt-chev {
  border-color: #2563eb;
  transform: translateY(2px) rotate(225deg);
}
.prompt-menu {
  position: absolute;
  left: 0;
  bottom: calc(100% + 8px);
  z-index: 60;
  width: min(340px, calc(100vw - 48px));
  padding: 6px;
  display: grid;
  gap: 4px;
  background: #ffffff;
  border: 1px solid rgba(17,24,39,0.12);
  border-radius: 8px;
  box-shadow:
    0 18px 44px rgba(15,23,42,0.18),
    inset 0 1px 0 rgba(255,255,255,0.9);
}
.prompt-menu[hidden] {
  display: none;
}
.prompt-option {
  min-height: 54px;
  width: 100%;
  display: grid;
  align-content: center;
  gap: 3px;
  padding: 9px 10px;
  color: #344054;
  background: transparent;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  font: inherit;
  text-align: left;
  transition: background 140ms ease, color 140ms ease, box-shadow 140ms ease;
}
.prompt-option [data-prompt-option-title] {
  color: inherit;
  font-size: 13px;
  font-weight: 760;
  line-height: 1.2;
}
.prompt-option [data-prompt-option-description] {
  color: #667085;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.35;
}
.prompt-option:hover,
.prompt-option:focus-visible {
  color: #1d4ed8;
  background: #f2f6ff;
  outline: 0;
}
.prompt-option:hover [data-prompt-option-description],
.prompt-option:focus-visible [data-prompt-option-description] {
  color: #475467;
}
.prompt-option.active {
  color: #111827;
  background: #eef4ff;
  box-shadow: inset 3px 0 0 #2563eb;
}
.prompt-option.active [data-prompt-option-description] {
  color: #475467;
}
.card.picker-open {
  position: relative;
  z-index: 20;
}
.actions > button,
.actions a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 38px;
  padding: 0 12px;
  border-radius: 6px;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
}
.actions > button {
  color: #ffffff;
  background: #1f2937;
  border: 1px solid #1f2937;
  cursor: pointer;
}
.actions > button:hover {
  background: #111827;
  border-color: #111827;
}
.actions > button.copied {
  background: #059669;
  border-color: #059669;
}
.actions a {
  color: #344054;
  background: #ffffff;
  border: 1px solid rgba(0,0,0,0.12);
}
.actions a:hover {
  border-color: rgba(17,24,39,0.28);
}
.sr-status {
  position: fixed;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: .001ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: .001ms !important;
  }
}
@media (max-width: 980px) {
  body { padding: 20px; }
  .hero-main {
    display: grid;
    grid-template-columns: 1fr;
    gap: 18px;
  }
  .control-stack {
    justify-content: flex-start;
  }
  .catalog-bar {
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
  }
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr));
    gap: 20px;
  }
}
@media (max-width: 640px) {
  body { padding: 14px; }
  .hero { padding-bottom: 18px; }
  h1 { font-size: 27px; }
  .meta,
  .hint { font-size: 14px; }
  .hero-meta { font-size: 12px; }
  .control-stack {
    width: 100%;
    justify-content: stretch;
  }
  .lang-toggle,
  .viewport-toggle {
    flex: 1 1 auto;
  }
  .lang-toggle button,
  .viewport-toggle button {
    flex: 1 1 0;
    min-width: 0;
  }
  .catalog-bar { display: block; }
  .toolbar-note { margin-top: 6px; }
  .grid { grid-template-columns: minmax(0, 1fr); gap: 18px; }
  .preview { padding: 8px; }
  .card-body { padding: 14px; }
  .actions {
    align-items: stretch;
  }
  .prompt-menu {
    width: min(340px, calc(100vw - 36px));
  }
  .actions {
    grid-template-columns: minmax(0, 1fr);
  }
  .actions > button,
  .actions a {
    justify-self: stretch;
  }
}
</style>
</head>
<body>
  <header class="hero">
    <div class="hero-main">
      <div class="hero-copy">
        <p class="eyebrow" data-i18n="eyebrow">Style Library</p>
        <h1>Design Preview Library</h1>
        <p class="meta">${allStyles.length} visual style previews, desktop and mobile ready</p>
        <p class="hint">Browse full-page style samples, open any preview, or copy a detailed prompt that carries layout, color, typography, component, motion, and implementation rules.</p>
        <p class="hero-meta" data-i18n="heroMeta">${allStyles.length} styles · Desktop ${viewportWidth}x${viewportHeight} · Mobile ${mobileViewportWidth}x${mobileViewportHeight} · EN/ZH prompts</p>
      </div>
      <div class="hero-actions" aria-label="Preview controls">
        <div class="control-stack">
          <div class="lang-toggle" aria-label="Language">
            <button type="button" class="active" data-lang="en">EN</button>
            <button type="button" data-lang="zh">中文</button>
          </div>
          <div class="viewport-toggle" aria-label="Preview image viewport">
            <button type="button" class="active" data-preview-view="desktop" data-i18n="viewDesktop" aria-pressed="true">Desktop</button>
            <button type="button" data-preview-view="mobile" data-i18n="viewMobile" aria-pressed="false">Mobile</button>
          </div>
        </div>
      </div>
    </div>
  </header>
  <section class="catalog-bar" aria-label="Catalog summary">
    <p class="count" data-i18n="sectionCount">${allStyles.length} continuous visual styles, numbered Style 01 through Style ${allStyles.length}.</p>
    <p class="toolbar-note" data-i18n="toolbarNote">Each card shows the complete screenshot, core mood, best-fit use case, palette, and actions.</p>
  </section>
  <main class="grid">
${cards}
  </main>
  <div class="sr-status" aria-live="polite" data-status></div>
  <script>
  const copy = {
    en: {
      eyebrow: 'Style Library',
      title: 'Design Preview Library',
      meta: '${allStyles.length} visual style previews, desktop and mobile ready',
      hint: 'Browse full-page style samples, open any preview, or copy a detailed prompt that carries layout, color, typography, component, motion, and implementation rules.',
      heroMeta: '${allStyles.length} styles · Desktop ${viewportWidth}x${viewportHeight} · Mobile ${mobileViewportWidth}x${mobileViewportHeight} · EN/ZH prompts',
      sectionCount: '${allStyles.length} continuous visual styles, numbered Style 01 through Style ${allStyles.length}.',
      toolbarNote: 'Each card shows the complete screenshot, core mood, best-fit use case, palette, and actions.',
      statStyles: 'Styles',
      statWidth: 'Preview width',
      statHeight: 'Preview height',
      statDesktop: 'Desktop',
      statMobile: 'Mobile',
      viewDesktop: 'Desktop',
      viewMobile: 'Mobile',
      bestFor: 'Best for',
      style: 'Style',
      promptChooser: 'Page type',
      copyPrompt: 'Copy selected prompt',
      copied: 'Copied',
      openHtml: 'Open HTML',
      promptFallback: 'Copy this style prompt:'
    },
    zh: {
      eyebrow: '风格库',
      title: '页面设计预览库',
      meta: '${allStyles.length} 个视觉风格预览，已包含桌面端和移动端资源',
      hint: '浏览完整页面样张，打开任意预览，或复制包含布局、颜色、字体、组件、动效和实现规则的详细提示词。',
      heroMeta: '${allStyles.length} 个风格 · 桌面端 ${viewportWidth}x${viewportHeight} · 移动端 ${mobileViewportWidth}x${mobileViewportHeight} · 中英文提示词',
      sectionCount: '${allStyles.length} 个连续编号的视觉风格，范围为 Style 01 到 Style ${allStyles.length}。',
      toolbarNote: '每张卡片展示完整截图、核心气质、适用场景、色彩和操作入口。',
      statStyles: '风格',
      statWidth: '预览宽度',
      statHeight: '预览高度',
      statDesktop: '桌面端',
      statMobile: '移动端',
      viewDesktop: '桌面端',
      viewMobile: '移动端',
      bestFor: '适合',
      style: '风格',
      promptChooser: '页面类型',
      copyPrompt: '复制所选提示词',
      copied: '已复制',
      openHtml: '打开 HTML',
      promptFallback: '复制这个风格提示词：'
    }
  };
  let activeLang = 'en';
  let activePreviewView = 'desktop';
  const status = document.querySelector('[data-status]');
  function applyPreviewView(view) {
    activePreviewView = view;
    const isMobile = view === 'mobile';
    document.querySelectorAll('[data-preview-image]').forEach((image) => {
      image.src = isMobile ? image.dataset.mobileSrc : image.dataset.desktopSrc;
      image.alt = isMobile ? image.dataset.mobileAlt : image.dataset.desktopAlt;
      image.width = Number(isMobile ? image.dataset.mobileWidth : image.dataset.desktopWidth);
      image.height = Number(isMobile ? image.dataset.mobileHeight : image.dataset.desktopHeight);
    });
    document.querySelectorAll('[data-preview-view]').forEach((button) => {
      const active = button.dataset.previewView === view;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    status.textContent = isMobile ? copy[activeLang].viewMobile : copy[activeLang].viewDesktop;
  }
  function closePromptPicker(picker, focusTrigger = false) {
    const trigger = picker.querySelector('[data-prompt-trigger]');
    const menu = picker.querySelector('[data-prompt-menu]');
    picker.classList.remove('open');
    picker.closest('.card')?.classList.remove('picker-open');
    trigger?.setAttribute('aria-expanded', 'false');
    if (menu) menu.hidden = true;
    if (focusTrigger) trigger?.focus();
  }
  function closeAllPromptPickers(except = null) {
    document.querySelectorAll('[data-prompt-picker]').forEach((picker) => {
      if (picker !== except) closePromptPicker(picker);
    });
  }
  function openPromptPicker(picker) {
    const trigger = picker.querySelector('[data-prompt-trigger]');
    const menu = picker.querySelector('[data-prompt-menu]');
    if (!menu) return;
    closeAllPromptPickers(picker);
    picker.classList.add('open');
    picker.closest('.card')?.classList.add('picker-open');
    trigger?.setAttribute('aria-expanded', 'true');
    menu.hidden = false;
    const selected = picker.querySelector('.prompt-option.active') || picker.querySelector('[data-prompt-option]');
    window.requestAnimationFrame(() => selected?.focus());
  }
  function movePromptFocus(option, direction) {
    const options = Array.from(option.closest('[data-prompt-menu]').querySelectorAll('[data-prompt-option]'));
    const index = options.indexOf(option);
    const next = options[(index + direction + options.length) % options.length];
    next?.focus();
  }
  function getPromptCopyText(picker) {
    const selectedKind = picker?.dataset.selectedKind || 'full';
    const selectedOption = picker?.querySelector('[data-prompt-option="' + selectedKind + '"]') || picker?.querySelector('[data-prompt-option]');
    return selectedOption?.dataset[activeLang + 'Copy'] || copy[activeLang].copyPrompt;
  }
  function updatePromptCopyButton(button) {
    const picker = button.closest('.actions')?.querySelector('[data-prompt-picker]');
    button.textContent = getPromptCopyText(picker);
  }
  function updatePromptCopyButtons() {
    document.querySelectorAll('[data-prompts]').forEach((button) => {
      if (!button.classList.contains('copied')) updatePromptCopyButton(button);
    });
  }
  function updatePromptPickerLabels() {
    document.querySelectorAll('[data-prompt-picker]').forEach((picker) => {
      const selectedKind = picker.dataset.selectedKind || 'full';
      const selectedOption = picker.querySelector('[data-prompt-option="' + selectedKind + '"]') || picker.querySelector('[data-prompt-option]');
      const label = picker.querySelector('[data-prompt-label]');
      if (label && selectedOption) label.textContent = selectedOption.dataset[activeLang];
      picker.querySelectorAll('[data-prompt-option]').forEach((option) => {
        const active = option.dataset.promptOption === selectedKind;
        const title = option.querySelector('[data-prompt-option-title]');
        const description = option.querySelector('[data-prompt-option-description]');
        if (title) title.textContent = option.dataset[activeLang];
        if (description) description.textContent = option.dataset[activeLang + 'Description'];
        option.classList.toggle('active', active);
        option.setAttribute('aria-selected', String(active));
      });
    });
  }
  function selectPromptOption(option) {
    const picker = option.closest('[data-prompt-picker]');
    const copyButton = picker.closest('.actions').querySelector('[data-prompts]');
    picker.dataset.selectedKind = option.dataset.promptOption;
    updatePromptPickerLabels();
    updatePromptCopyButton(copyButton);
    copyButton.classList.remove('copied');
    closePromptPicker(picker, true);
  }
  function applyLanguage(lang) {
    activeLang = lang;
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.querySelector('h1').textContent = copy[lang].title;
    document.querySelector('.meta').textContent = copy[lang].meta;
    document.querySelector('.hint').textContent = copy[lang].hint;
    document.querySelectorAll('[data-i18n]').forEach((node) => {
      node.textContent = copy[lang][node.dataset.i18n];
    });
    document.querySelectorAll('[data-en][data-zh]').forEach((node) => {
      node.textContent = node.dataset[lang];
    });
    updatePromptPickerLabels();
    updatePromptCopyButtons();
    document.querySelectorAll('.lang-toggle button').forEach((button) => {
      button.classList.toggle('active', button.dataset.lang === lang);
    });
  }
  document.querySelectorAll('.lang-toggle button').forEach((button) => {
    button.addEventListener('click', () => applyLanguage(button.dataset.lang));
  });
  document.querySelectorAll('[data-preview-view]').forEach((button) => {
    button.addEventListener('click', () => applyPreviewView(button.dataset.previewView));
  });
  document.querySelectorAll('[data-prompt-picker]').forEach((picker) => {
    const trigger = picker.querySelector('[data-prompt-trigger]');
    trigger.addEventListener('click', () => {
      if (picker.classList.contains('open')) {
        closePromptPicker(picker);
      } else {
        openPromptPicker(picker);
      }
    });
    trigger.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openPromptPicker(picker);
      }
      if (event.key === 'Escape') {
        closePromptPicker(picker, true);
      }
    });
    picker.querySelectorAll('[data-prompt-option]').forEach((option) => {
      option.addEventListener('click', () => selectPromptOption(option));
      option.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          movePromptFocus(option, 1);
        }
        if (event.key === 'ArrowUp') {
          event.preventDefault();
          movePromptFocus(option, -1);
        }
        if (event.key === 'Home') {
          event.preventDefault();
          option.closest('[data-prompt-menu]').querySelector('[data-prompt-option]')?.focus();
        }
        if (event.key === 'End') {
          event.preventDefault();
          const options = option.closest('[data-prompt-menu]').querySelectorAll('[data-prompt-option]');
          options[options.length - 1]?.focus();
        }
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          selectPromptOption(option);
        }
        if (event.key === 'Escape') {
          event.preventDefault();
          closePromptPicker(picker, true);
        }
      });
    });
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('[data-prompt-picker]')) closeAllPromptPickers();
  });
  document.querySelectorAll('[data-prompts]').forEach((button) => {
    button.addEventListener('click', async () => {
      const prompts = JSON.parse(button.getAttribute('data-prompts'));
      const picker = button.closest('.actions').querySelector('[data-prompt-picker]');
      const kind = picker?.dataset.selectedKind || 'full';
      const value = prompts[activeLang][kind] || prompts[activeLang].full;
      try {
        await navigator.clipboard.writeText(value);
        button.textContent = copy[activeLang].copied;
        button.classList.add('copied');
        status.textContent = copy[activeLang].copied;
        setTimeout(() => {
          button.classList.remove('copied');
          updatePromptCopyButton(button);
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

function writeStyleIndex() {
  const rows = allStyles
    .map((style) => {
      const playbook = getStylePlaybook(style);
      return `| ${style.label || `Style ${style.id}`} | ${style.name} | ${style.zhName} | ${style.bestFor} | ${playbook.name} | ${style.brief} |`;
    })
    .join("\n");
  const quick = allStyles
    .map((style) => {
      const playbook = getStylePlaybook(style);
      return `- ${style.label || `Style ${style.id}`} - ${style.name}: ${playbook.name}; ${style.brief}`;
    })
    .join("\n");

  fs.mkdirSync(referencesDir, { recursive: true });
  fs.writeFileSync(
    path.join(referencesDir, "style-index.md"),
    `# Style Index

This index summarizes all 21 available visual styles, numbered continuously from Style 01 to Style 21. Use these styles as visual direction and design the actual page structure around the user's product. Choose the user's layout archetype from \`layout-guidance.md\` before treating any style as a fixed page shape.

| Style | Name | 中文名 | Best For | Layout Pattern | Visual Language |
|---|---|---|---|---|---|
${rows}

## Quick Matching

${quick}

## Similarity Guardrails

- Do not collapse Style 03 Aurora Gradient, Style 08 Resonant Stark, Style 10 Dark Theme, Style 15 Liquid Glass, Style 18 Precision Futurism, and Style 21 Acid Design into the same generic dark SaaS page. They differ by atmosphere, restraint, contrast, material, precision, and experimental intensity.
- Do not collapse Style 09 Tech Minimal, Style 11 Structured Lines, and Style 12 Layered Material into one neutral white UI. They differ by whitespace, line structure, and elevation/tonal surface logic.
- Do not collapse Style 02 Block Brutalism and Style 17 Neo-Brutalism. Style 02 is the original warm block campaign style; Style 17 is higher-collision, giant-type controlled chaos.
- Do not collapse Style 04 Retro Y2K and Style 16 Retro Computing. Style 04 is candy/neon Y2K; Style 16 is pixel and old-operating-system texture.
- Do not turn Style 13 Bento Layout into a fixed template. Treat it as a modular visual composition style, not a required information architecture.
- Use Style 02, Style 04, Style 07, Style 16, Style 17, Style 19, Style 20, and Style 21 only when the brand can carry a strong personality.
`
  );
}

function findStyleHtmlFiles() {
  return allStyles.map((style) => path.join(stylesDir, style.slug, `${style.slug}.html`));
}

async function main() {
  writeStyleFiles();
  writeStyleIndex();
  fs.mkdirSync(outputDir, { recursive: true });

  if (process.env.PREVIEW_INDEX_ONLY === "1") {
    writeIndex();
    console.log(`Done. Open ${path.relative(rootDir, path.join(outputDir, "index.html"))}`);
    return;
  }

  const htmlFiles = findStyleHtmlFiles();
  console.log(`Generating ${htmlFiles.length} style previews with ${chromeWait}ms wait...`);
  for (const htmlFile of htmlFiles) {
    process.stdout.write(`- ${path.relative(rootDir, htmlFile)} -> `);
    const imageFile = await screenshot(htmlFile);
    process.stdout.write(`${path.relative(rootDir, imageFile)}\n`);
    if (generateMobileScreenshots) {
      process.stdout.write(`  mobile -> `);
      const mobileImageFile = await screenshot(htmlFile, {
        suffix: "-mobile",
        width: mobileViewportWidth,
        height: mobileViewportHeight,
      });
      process.stdout.write(`${path.relative(rootDir, mobileImageFile)}\n`);
    }
  }

  writeIndex();
  console.log(`Done. Open ${path.relative(rootDir, path.join(outputDir, "index.html"))}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
