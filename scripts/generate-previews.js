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
const bundledNodeModules = path.join(os.homedir(), ".cache", "codex-runtimes", "codex-primary-runtime", "dependencies", "node", "node_modules");
const requestedChromePath = process.env.CHROME_PATH || "";
const chromePath = requestedChromePath || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const allowSystemChrome = process.env.PREVIEW_USE_SYSTEM_CHROME === "1" || Boolean(requestedChromePath);
const screenshotEngine = process.env.PREVIEW_SCREENSHOT_ENGINE || "auto";
const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === "seatbelt";
const allowSandboxBrowser = process.env.PREVIEW_ALLOW_SANDBOX_BROWSER === "1";
const requestedScreenshots =
  process.env.PREVIEW_SCREENSHOTS === undefined
    ? !isCodexSeatbeltSandbox
    : process.env.PREVIEW_SCREENSHOTS !== "0";
const screenshotsBlockedBySandbox = isCodexSeatbeltSandbox && requestedScreenshots && !allowSandboxBrowser;
const generateScreenshots = requestedScreenshots && !screenshotsBlockedBySandbox;
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
    bestFor: "print studios, editorial tools, focused utility pages",
    zhBestFor: "印刷工作室、编辑工具、聚焦型实用页面",
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
    bestFor: "micro-cinemas, creative studios, premium launch pages",
    zhBestFor: "微型影院、创意工作室、高级发布页",
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
    bestFor: "museum maps, workflow products, structured B2B sites",
    zhBestFor: "博物馆地图、工作流产品、结构化 B2B 网站",
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
    bestFor: "interior sample boards, consumer tools, product dashboards",
    zhBestFor: "室内样板板、消费者工具、产品仪表盘",
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
    bestFor: "restaurant menus, creator profiles, modular product overviews",
    zhBestFor: "餐厅菜单、创作者主页、模块化产品总览",
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
    bestFor: "home devices, audio tools, calm utilities, wellness and focus products",
    zhBestFor: "家居设备、音频工具、安静工具、健康与专注类产品",
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
    bestFor: "botanical maps, spatial dashboards, premium futuristic tools",
    zhBestFor: "植物园地图、空间化仪表盘、高级未来感工具",
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
    bestFor: "festival pages, launch walls, creator campaign tools",
    zhBestFor: "节日活动页、发布墙、创作者活动工具",
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
    bestFor: "community classes, education, writing tools, creative productivity",
    zhBestFor: "社区课堂、教育、写作工具、创意生产力",
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
  {
    id: "22",
    slug: "style-22-art-deco",
    name: "Art Deco",
    zhName: "装饰艺术",
    brief: "Symmetric poster composition, dark jewel tones, gilded rules, stepped geometry, and polished hospitality drama.",
    zhBrief: "对称海报构图、暗色宝石调、金色线框、阶梯几何和精致的高级场景感。",
    bestFor: "luxury hospitality, cultural venues, premium events, editorial brand launches",
    zhBestFor: "高级酒店、文化场馆、精品活动、编辑型品牌发布",
    bg: "#0e1020",
    surface: "#171526",
    text: "#fff4d6",
    muted: "#d8c58e",
    primary: "#d4af37",
    accent: "#2dd4bf",
    border: "#d4af37",
    radius: "2px",
    shadow: "0 26px 80px rgba(212, 175, 55, .18)",
    className: "art-deco",
    image: "",
    notes: ["Build the page around symmetry, axial alignment, and staged reveal.", "Use gold rules as structure, not random trim.", "Keep copy refined and short so the ornament has room to breathe."],
  },
  {
    id: "23",
    slug: "style-23-wabi-sabi",
    name: "Wabi-Sabi",
    zhName: "侘寂",
    brief: "Earthy restraint, natural texture, handmade imperfection, quiet whitespace, and slow material confidence.",
    zhBrief: "低饱和大地色、自然纹理、手作不完美、安静留白和缓慢的材质信任感。",
    bestFor: "ceramics, wellness, slow commerce, craft portfolios, mindful editorial pages",
    zhBestFor: "陶艺、健康生活、慢电商、手作作品集、安静编辑页",
    bg: "#f4efe6",
    surface: "#fffaf0",
    text: "#302a22",
    muted: "#766b5e",
    primary: "#5f6f52",
    accent: "#b26b4b",
    border: "#d8cdbc",
    radius: "6px",
    shadow: "0 16px 48px rgba(77, 61, 43, .10)",
    className: "wabi-sabi",
    image: "",
    notes: ["Let asymmetry feel found and intentional, not careless.", "Use texture and edge softness instead of bright decoration.", "Leave enough silence around product objects, quotes, and primary actions."],
  },
  {
    id: "24",
    slug: "style-24-ink-wash",
    name: "Ink Wash",
    zhName: "水墨",
    brief: "Paper-white canvas, black ink hierarchy, red seal accents, scroll rhythm, and poetic editorial restraint.",
    zhBrief: "宣纸白底、墨色层级、朱红印章强调、卷轴节奏和诗性编辑克制。",
    bestFor: "tea culture, museums, literature, cultural ecommerce, heritage product stories",
    zhBestFor: "茶文化、博物馆、文学、文化电商、传统产品叙事",
    bg: "#f8f5ef",
    surface: "#fffdf7",
    text: "#1f1f1c",
    muted: "#68645c",
    primary: "#111111",
    accent: "#c43a32",
    border: "#d8d0c4",
    radius: "2px",
    shadow: "0 18px 45px rgba(31, 31, 28, .08)",
    className: "ink-wash",
    image: "",
    notes: ["Treat black, gray, and blank paper as the main palette.", "Use red only as a seal, warning, or decisive action accent.", "Do not turn the page into a generic Asian decorative collage."],
  },
  {
    id: "25",
    slug: "style-25-blueprint",
    name: "Blueprint",
    zhName: "蓝图",
    brief: "Deep blue technical grid, cyan linework, annotated structure, measured components, and plan-sheet precision.",
    zhBrief: "深蓝技术网格、青色线稿、标注结构、测量式组件和工程图纸精度。",
    bestFor: "architecture tools, renovation planning, systems maps, technical plans",
    zhBestFor: "建筑工具、改造规划、系统地图、技术图纸",
    bg: "#061a33",
    surface: "rgba(7, 28, 52, .88)",
    text: "#e8f7ff",
    muted: "#8bb8d8",
    primary: "#9edbff",
    accent: "#34d3ff",
    border: "#2d6796",
    radius: "4px",
    shadow: "0 0 0 1px rgba(158, 219, 255, .24), 0 24px 70px rgba(0, 38, 76, .45)",
    className: "blueprint",
    image: "",
    notes: ["Use grid, scale, labels, and dimension lines as real information structure.", "Keep linework thin and exact instead of glowing like a sci-fi console.", "Make annotations explain relationships, ownership, and next actions."],
  },
  {
    id: "26",
    slug: "style-26-industrial-control",
    name: "Industrial Control",
    zhName: "工业控制",
    brief: "Rugged dark panels, safety accents, dense status rows, machine labels, and maintainable control-room clarity.",
    zhBrief: "耐用暗色面板、安全色强调、密集状态行、机器标签和可维护的控制室清晰度。",
    bestFor: "print rooms, factory monitoring, logistics control, hardware fleets, incident rooms",
    zhBestFor: "印刷工作室、工厂监控、物流控制、硬件设备队列、事故指挥室",
    bg: "#11130f",
    surface: "#1d211c",
    text: "#f2f2ea",
    muted: "#a7ac9e",
    primary: "#d6ff3f",
    accent: "#ffb000",
    border: "#3d4438",
    radius: "2px",
    shadow: "0 18px 60px rgba(0, 0, 0, .35)",
    className: "industrial-control",
    image: "",
    notes: ["Prioritize durable controls, visible warnings, and operator scan speed.", "Use color as safety semantics, not decorative variety.", "Keep layouts serviceable: labels, owners, thresholds, and recovery actions must be obvious."],
  },
];

const coreStyles = [
  {
    id: "01",
    slug: "style-01-card-grid",
    name: "Card Grid",
    zhName: "卡片网格",
    brief: "Real admin shell with white sidebar, white top bar, gray-blue workspace, KPI cards, quick entries, filters, dense tables, and utility panels.",
    zhBrief: "真实后台外壳、白色侧栏、白色顶栏、灰蓝工作区、指标卡、快捷入口、筛选栏、密集表格和工具面板。",
    bestFor: "admin panels, CRM/ERP consoles, permission systems, operations dashboards",
    zhBestFor: "后台管理、CRM/ERP 控制台、权限系统、运营仪表盘",
    bg: "#eef6ff",
    surface: "#ffffff",
    text: "#0f172a",
    muted: "#64748b",
    primary: "#1677ff",
    accent: "#0ea5e9",
    border: "#d7e7fb",
    radius: "8px",
    shadow: "0 18px 46px rgba(22, 119, 255, .10)",
    className: "card-grid",
    image: "",
    notes: ["Start with the admin application frame: sidebar, top bar, breadcrumb or tabs, workspace, and table-first modules.", "Use search, filters, KPI cards, quick entries, ranking lists, calendars, approvals, and dense tables as real management anchors.", "Avoid hero sections, decorative card walls, oversized marketing typography, and abstract product art."],
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
    brief: "Dark canvas, aurora color fields, soft glow, drifting gradient energy, and premium immersive atmosphere.",
    zhBrief: "暗色画布、极光色场、柔光、漂移渐变能量和高级沉浸氛围。",
    bestFor: "immersive art venues, futuristic products, premium dark experiences",
    zhBestFor: "沉浸式艺术场馆、未来感产品、高级暗色体验",
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
    brief: "Soft playful surfaces, friendly object shapes, pastel accents, compact controls, and warm task-board clarity.",
    zhBrief: "柔和玩乐表面、友好对象形状、粉彩点缀、紧凑控件和温暖任务板层级。",
    bestFor: "playful productivity, education tools, creator utilities",
    zhBestFor: "玩乐生产力、教育工具、创作者实用工具",
    bg: "#fff7fb",
    surface: "#fffdf8",
    text: "#18181b",
    muted: "#64748b",
    primary: "#ef5da8",
    accent: "#8ee6c8",
    border: "#31283a",
    radius: "22px",
    shadow: "6px 6px 0 #ffd1e8",
    className: "cutealism",
    image: "",
    notes: ["Use cute objects as workflow anchors, not decoration.", "Keep controls chunky but calm enough for daily use.", "Balance pastel warmth with readable operational detail."],
  },
  {
    id: "08",
    slug: "style-08-resonant-stark",
    name: "Resonant Stark",
    zhName: "共鸣极简",
    brief: "Near-black canvas, thin type, subtle glow, extreme whitespace, delicate lines, and premium restraint.",
    zhBrief: "近黑画布、细字重、微光、大留白、精细线条和高级克制感。",
    bestFor: "photography archives, premium dark portfolios, art, high-end product teasers",
    zhBestFor: "摄影档案、高级暗色作品集、艺术、精品预告页",
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

function splitStyleSelectors(value) {
  return String(value || "")
    .split(/[,\s]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function getPreviewStyleSelectors(argv = process.argv.slice(2), env = process.env) {
  const selectors = [];
  if (env.PREVIEW_STYLE) selectors.push(...splitStyleSelectors(env.PREVIEW_STYLE));
  if (env.PREVIEW_STYLES) selectors.push(...splitStyleSelectors(env.PREVIEW_STYLES));

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--style" || arg === "--styles") {
      selectors.push(...splitStyleSelectors(argv[index + 1]));
      index += 1;
    } else if (arg.startsWith("--style=")) {
      selectors.push(...splitStyleSelectors(arg.slice("--style=".length)));
    } else if (arg.startsWith("--styles=")) {
      selectors.push(...splitStyleSelectors(arg.slice("--styles=".length)));
    }
  }

  return selectors;
}

function resolvePreviewStyles() {
  const selectors = getPreviewStyleSelectors();
  if (selectors.length === 0) return allStyles;

  const normalizedSelectors = selectors.map((selector) => selector.toLowerCase());
  const selected = [];
  const unknown = [];

  normalizedSelectors.forEach((selector) => {
    const paddedId = selector.padStart(2, "0");
    const match = allStyles.find((style) => {
      const label = (style.label || `Style ${style.id}`).toLowerCase();
      return (
        style.id.toLowerCase() === selector ||
        style.id.toLowerCase() === paddedId ||
        style.slug.toLowerCase() === selector ||
        style.name.toLowerCase() === selector ||
        style.zhName.toLowerCase() === selector ||
        label === selector ||
        label === `style ${paddedId}`
      );
    });

    if (!match) {
      unknown.push(selector);
      return;
    }

    if (!selected.some((style) => style.id === match.id)) selected.push(match);
  });

  if (unknown.length > 0) {
    const valid = allStyles.map((style) => style.id).join(", ");
    throw new Error(`Unknown preview style selector(s): ${unknown.join(", ")}. Valid style ids: ${valid}`);
  }

  return selected;
}

const scenarios = {
  "01": {
    brand: "AdminFlow",
    nav: ["Home", "Customers", "Reports"],
    eyebrow: "CRM management dashboard",
    headline: "Run the daily admin workspace from one dense console.",
    lede: "A practical enterprise admin page with persistent navigation, searchable records, KPI cards, quick entries, tables, rankings, approvals, and calendar widgets.",
    primaryAction: "New customer",
    secondaryAction: "More actions",
    mediaLabel: "Enterprise admin console mockup",
    scene: "dashboard",
    metrics: [
      ["$482K", "pipeline value"],
      ["1,284", "customer records"],
      ["312", "open tasks"],
    ],
    features: [
      ["Application shell first", "Sidebar modules, top search, page tabs, and workspace panels establish a real system before any decorative styling."],
      ["Operational density", "KPI cards, quick actions, filters, tables, charts, rankings, approvals, and schedules share one scan-friendly grid."],
      ["Admin-specific states", "Selected menu items, disabled tools, empty states, warning rows, approval tabs, and row actions stay visible."],
    ],
    tabs: {
      launch: ["Task review", "Filter task records, inspect owner/status columns, and keep empty or warning states inside the table frame."],
      metrics: ["Data center", "Compare annual sales, customer count, opportunities, signed orders, ranking lists, and approval tabs."],
      assets: ["System modules", "Use customer, purchase, product, workflow, reports, monitoring, permissions, and settings sections as real navigation."],
    },
    queue: [
      ["Sales contract approval", "Pending"],
      ["Inactive customer follow-up", "Warning"],
      ["Monthly audit export", "Ready"],
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
    brand: "Neue Archive",
    nav: ["Issue", "Grid", "Sources"],
    eyebrow: "Swiss issue system",
    headline: "Index the issue with type, rules, and evidence.",
    lede: "A publication-grade surface for dense cultural catalogs, source tables, object crops, and editorial proof that must feel objective.",
    primaryAction: "Open issue",
    secondaryAction: "View sources",
    mediaLabel: "Swiss archive index board",
    scene: "editorial",
    metrics: [
      ["05", "issue number"],
      ["12", "source rows"],
      ["38", "caption notes"],
    ],
    features: [
      ["Baseline grid", "Every headline, caption, and data row locks to a visible publishing rhythm."],
      ["Object proof", "Image crops, labels, and accession marks sit in the same rule system as the copy."],
      ["Index table", "Readers can scan issue entries without losing the editorial hierarchy."],
    ],
    tabs: {
      launch: ["Issue layout", "Set the masthead, lead article, object board, and source ledger before publishing."],
      metrics: ["Reading depth", "Compare saves, scroll depth, source opens, and return visits across editorial paths."],
      assets: ["Archive media", "Use object crops, captions, and document fragments only when they support the evidence."],
    },
    queue: [
      ["Caption audit", "8 notes"],
      ["Index order", "Locked"],
      ["Object board", "Ready"],
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
    brand: "MochiDesk",
    nav: ["Today", "Rewards", "Notes"],
    eyebrow: "Playful task studio",
    headline: "Turn small lessons, chores, and creator tasks into a calm daily board.",
    lede: "A cute but useful workspace for classroom check-ins, tiny milestones, reward tokens, gentle reminders, and finished work.",
    primaryAction: "Plan today",
    secondaryAction: "Open reward shelf",
    mediaLabel: "Cute task planning board",
    scene: "doodle",
    metrics: [
      ["18", "tasks sorted"],
      ["92%", "habit rhythm"],
      ["06", "reward tokens"],
    ],
    features: [
      ["Cute workflow", "Soft objects mark real states such as next, blocked, finished, and reward-ready."],
      ["Daily clarity", "The board keeps today, later, and reward notes visible without becoming a dense admin table."],
      ["Friendly feedback", "Pastel panels and chunky controls make progress feel encouraging while labels stay clear."],
    ],
    tabs: {
      launch: ["Daily planning", "Arrange lessons, errands, and creator tasks into one friendly board."],
      metrics: ["Habit rhythm", "Track completed tasks, reward tokens, review streaks, and skipped items."],
      assets: ["Reward shelf", "Use icons, badges, notes, and soft objects as functional progress cues."],
    },
    queue: [
      ["Sketch practice", "Next"],
      ["Reading note", "Done"],
      ["Reward shelf", "Ready"],
    ],
  },
  "08": {
    brand: "Aperture Index",
    nav: ["Index", "Exhibits", "Inquiry"],
    eyebrow: "Private studio dossier",
    headline: "Catalog the work like evidence, not decoration.",
    lede: "A stark archive page for selected projects, object notes, provenance rows, and private inquiry states.",
    primaryAction: "Open exhibit file",
    secondaryAction: "Request access",
    mediaLabel: "Stark project dossier",
    scene: "stark",
    metrics: [
      ["06", "exhibits filed"],
      ["02", "active inquiries"],
      ["18", "source notes"],
    ],
    features: [
      ["Dossier rhythm", "The layout uses accession rows, captions, and proof cells instead of generic cards."],
      ["Premium silence", "Black space, fine rules, and sparse labels make each record feel deliberate."],
      ["Object evidence", "Metadata and inquiry states sit close to the selected work so the page has a real purpose."],
    ],
    tabs: {
      launch: ["Exhibit file", "Select the lead work, add provenance, and keep inquiry controls quiet."],
      metrics: ["Interest signal", "Track requests, saves, note depth, and access status without making the page commercial."],
      assets: ["Evidence rows", "Use object crops, captions, and source fragments as the primary visual system."],
    },
    queue: [
      ["Exhibit 04", "Filed"],
      ["Private link", "Ready"],
      ["Curator note", "New"],
    ],
  },
  "09": {
    brand: "NexaCMD",
    nav: ["Command", "Runs", "Docs"],
    eyebrow: "Minimal AI command workspace",
    headline: "Ask once, inspect the result, and keep the command history clean.",
    lede: "A stripped-down interface for prompt runs, generated summaries, review notes, and compact command results.",
    primaryAction: "Run command",
    secondaryAction: "Save run",
    mediaLabel: "Minimal command workspace",
    scene: "minimal",
    metrics: [
      ["128", "runs indexed"],
      ["24ms", "query parse"],
      ["03", "reviews due"],
    ],
    features: [
      ["Command focus", "The input, result, and run history share one restrained surface rather than separate SaaS cards."],
      ["Useful silence", "Whitespace is reserved around the active command while logs and review notes stay visible."],
      ["Fast scanning", "Rows, chips, and compact code blocks make the page feel like a tool, not a brochure."],
    ],
    tabs: {
      launch: ["Command run", "Submit a prompt, inspect the response, and save the exact run context."],
      metrics: ["Review quality", "Compare accepted answers, review lag, parse time, and unresolved notes."],
      assets: ["Run evidence", "Keep code blocks, diffs, prompt fragments, and reviewer notes in one quiet workspace."],
    },
    queue: [
      ["Prompt audit", "Open"],
      ["Diff summary", "Ready"],
      ["Reviewer note", "Due"],
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
    brand: "LayerKit",
    nav: ["Materials", "Orders", "Specs"],
    eyebrow: "Material sample catalog",
    headline: "Inspect samples, finishes, and stock layers in one tactile board.",
    lede: "A layered catalog for product teams comparing finishes, package materials, approval notes, and inventory states.",
    primaryAction: "Approve sample",
    secondaryAction: "Compare layers",
    mediaLabel: "Layered material catalog",
    scene: "material",
    metrics: [
      ["12", "samples"],
      ["84%", "stock ready"],
      ["03", "finish tests"],
    ],
    features: [
      ["Layered proof", "Stacked cards show surface, finish, cost, and approval notes instead of generic task widgets."],
      ["Material hierarchy", "Soft elevation and tonal panels make physical sample states easy to compare."],
      ["Touch-ready review", "Large controls, sample swatches, and approval states feel practical for catalog work."],
    ],
    tabs: {
      launch: ["Sample review", "Compare finishes, stock state, sample owner, and approval notes in one tactile board."],
      metrics: ["Material readiness", "Track stock readiness, finish tests, reserved samples, and approval blockers."],
      assets: ["Layer objects", "Use swatches, stacked sheets, material chips, and spec rows as functional content."],
    },
    queue: [
      ["Recycled board", "Ready"],
      ["Soft-touch film", "Test"],
      ["Ink sample", "Hold"],
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
    brand: "PocketVault",
    nav: ["Vault", "Cards", "Goals"],
    eyebrow: "Soft finance cockpit",
    headline: "Move money through raised cards, inset goals, and tactile limits.",
    lede: "A neumorphic finance panel for savings goals, card limits, transfer controls, and low-stress account feedback.",
    primaryAction: "Move funds",
    secondaryAction: "Review limits",
    mediaLabel: "Soft finance control panel",
    scene: "soft-depth",
    metrics: [
      ["$8.4K", "vault balance"],
      ["62%", "goal funded"],
      ["04", "cards active"],
    ],
    features: [
      ["Tactile finance", "Raised cards, inset meters, and pressed controls make money movement feel deliberate."],
      ["Focused scope", "The style works best with a small number of high-trust financial controls."],
      ["Accessible calm", "Values, labels, and active states stay crisp despite the soft shadow language."],
    ],
    tabs: {
      launch: ["Vault setup", "Review card limits, savings goals, transfer amount, and confirmation state in one soft panel."],
      metrics: ["Money rhythm", "Track funded goals, card activity, spending limits, and pending transfers."],
      assets: ["Control objects", "Use raised cards, inset dials, goal wells, and tactile transfer controls as core content."],
    },
    queue: [
      ["Emergency fund", "62%"],
      ["Travel card", "Limit"],
      ["Round-up rule", "On"],
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
    nav: ["Map", "Spans", "Replay"],
    eyebrow: "Precision incident map",
    headline: "Pin every failing span on one technical operations map.",
    lede: "A full-width command console for incident tracing, service topology, span replay, and latency evidence.",
    primaryAction: "Replay incident",
    secondaryAction: "Export trace",
    mediaLabel: "Precision incident topology map",
    scene: "precision",
    metrics: [
      ["312", "spans traced"],
      ["07", "open incidents"],
      ["184ms", "p95 latency"],
    ],
    features: [
      ["Map-first layout", "The topology field takes the main space while side data stays attached to active nodes."],
      ["Compact evidence", "Trace rows, span IDs, retry state, and command actions stay dense and deliberate."],
      ["Controlled glow", "Light is reserved for selected paths, errors, and replay-ready states."],
    ],
    tabs: {
      launch: ["Incident map", "Trace active paths, compare retries, and inspect failing spans without leaving the console."],
      metrics: ["Reliability pulse", "Track latency, retry count, incident age, and mean recovery time."],
      assets: ["Trace evidence", "Use graph nodes, span rows, logs, and timeline fragments as the visual system."],
    },
    queue: [
      ["Retry storm", "Watch"],
      ["Span 7B", "Fail"],
      ["Replay batch", "Ready"],
    ],
  },
  "19": {
    brand: "BloomLaunch",
    nav: ["Brief", "Assets", "Publish"],
    eyebrow: "Gradient campaign studio",
    headline: "Stage a launch wall from creative assets, checkpoints, and conversion signals.",
    lede: "A vivid campaign workspace for launch timelines, template tiles, audience tests, creative approvals, and publish status.",
    primaryAction: "Publish campaign",
    secondaryAction: "Review assets",
    mediaLabel: "Gradient campaign launch wall",
    scene: "gradient",
    metrics: [
      ["2.4K", "waitlist"],
      ["38%", "activation lift"],
      ["11", "asset tiles"],
    ],
    features: [
      ["Campaign wall", "The layout turns gradient energy into a timeline, asset board, and publish rail."],
      ["Clear conversion", "The primary action remains stronger than the color field and creative tiles."],
      ["Filled canvas", "Templates, audience tests, and launch checks replace empty abstract blobs."],
    ],
    tabs: {
      launch: ["Launch wall", "Show creative selection, audience test, approval, and publishing as one bright path."],
      metrics: ["Activation lift", "Compare waitlist joins, launch clicks, drop-offs, and template usage."],
      assets: ["Asset gallery", "Use campaign previews, color chips, test cards, and timeline markers as useful content."],
    },
    queue: [
      ["Hero asset", "Approved"],
      ["Audience test", "Running"],
      ["Publish gate", "Ready"],
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
  "22": {
    brand: "Opal House",
    nav: ["Rooms", "Salon", "Reserve"],
    eyebrow: "Private event atelier",
    headline: "Stage an evening with geometry, gold, and quiet ceremony.",
    lede: "A refined booking surface for private dinners, cultural programs, premium hospitality, and limited guest experiences.",
    primaryAction: "Reserve salon",
    secondaryAction: "View floor plan",
    mediaLabel: "Gilded event poster composition",
    scene: "deco",
    metrics: [
      ["24", "guest seats"],
      ["03", "salon rooms"],
      ["8PM", "next opening"],
    ],
    features: [
      ["Axial drama", "A centered composition, stepped rules, and controlled symmetry make the offer feel staged and premium."],
      ["Gilded proof", "Availability, room capacity, and service notes become polished labels rather than generic cards."],
      ["Ceremonial action", "The main reservation path feels decisive without becoming loud or salesy."],
    ],
    tabs: {
      launch: ["Salon release", "Set room availability, guest count, seating notes, and the primary reservation action."],
      metrics: ["Evening signal", "Track waitlist depth, room utilization, service timing, and guest response."],
      assets: ["Venue objects", "Use floor-plan lines, menu cards, monograms, and room photos as structured evidence."],
    },
    queue: [
      ["Gold room hold", "Open"],
      ["Menu proof", "Signed"],
      ["Guest note", "Private"],
    ],
  },
  "23": {
    brand: "Kanso Atelier",
    nav: ["Objects", "Journal", "Visit"],
    eyebrow: "Ceramic collection journal",
    headline: "Let the object stay imperfect and still feel resolved.",
    lede: "A quiet catalog for handmade objects, retreat programs, slow commerce, and craft stories where material detail matters more than volume.",
    primaryAction: "View collection",
    secondaryAction: "Read journal",
    mediaLabel: "Natural clay object study",
    scene: "wabi",
    metrics: [
      ["18", "pieces fired"],
      ["04", "kiln notes"],
      ["2d", "drying time"],
    ],
    features: [
      ["Material pause", "Whitespace and texture let product objects carry the emotional weight."],
      ["Human irregularity", "Edges, captions, and image crops feel handmade without damaging alignment."],
      ["Slow conversion", "Actions appear after context, proof, and care instructions rather than shouting from the top."],
    ],
    tabs: {
      launch: ["Collection release", "Arrange objects by material, finish, care note, and availability while preserving quiet space."],
      metrics: ["Studio rhythm", "Track kiln batches, reserved pieces, repair notes, and visitor interest."],
      assets: ["Material notes", "Use clay textures, process photos, quotes, and care cards as meaningful content."],
    },
    queue: [
      ["Ash bowl", "Reserved"],
      ["Care note", "Draft"],
      ["Kiln batch", "Cooling"],
    ],
  },
  "24": {
    brand: "Ink River",
    nav: ["Scrolls", "Tea", "Index"],
    eyebrow: "Cultural tea archive",
    headline: "A scroll-like page for origin, ritual, and product proof.",
    lede: "An editorial commerce surface for cultural products, museum programs, tea collections, and literary releases that need restraint and atmosphere.",
    primaryAction: "Open scroll",
    secondaryAction: "Browse teas",
    mediaLabel: "Ink wash editorial scroll",
    scene: "ink",
    metrics: [
      ["07", "origin notes"],
      ["38", "tea lots"],
      ["01", "red seal"],
    ],
    features: [
      ["Ink hierarchy", "Black ink, gray wash, and blank paper create depth without relying on heavy cards."],
      ["Seal emphasis", "Red accents mark important actions, selected states, or provenance proof."],
      ["Scroll pacing", "Content unfolds through captions, source notes, and disciplined vertical rhythm."],
    ],
    tabs: {
      launch: ["Scroll edit", "Set origin story, product lots, tasting notes, and the primary reading or buying path."],
      metrics: ["Archive signal", "Compare source opens, saved lots, tasting note completion, and return visits."],
      assets: ["Ink objects", "Use seals, brush marks, paper fragments, and product photos as restrained evidence."],
    },
    queue: [
      ["Mountain lot", "Selected"],
      ["Seal proof", "Ready"],
      ["Source note", "New"],
    ],
  },
  "25": {
    brand: "Atlas Works",
    nav: ["Plans", "Systems", "Checks"],
    eyebrow: "Infrastructure planning sheet",
    headline: "Map dependencies before the build leaves the drawing board.",
    lede: "A technical planning surface for system maps, architecture reviews, infrastructure rollout, and API dependency work.",
    primaryAction: "Inspect plan",
    secondaryAction: "Export sheet",
    mediaLabel: "Blueprint dependency graph",
    scene: "blueprint",
    metrics: [
      ["42", "nodes drawn"],
      ["11", "open spans"],
      ["99%", "coverage"],
    ],
    features: [
      ["Measured structure", "Grids, labels, and dimension markers explain relationships instead of decorating empty space."],
      ["Annotated flow", "Owners, dependencies, and checkpoints stay attached to the exact part of the plan they describe."],
      ["Plan-sheet clarity", "The UI feels technical and precise while keeping actions and warnings readable."],
    ],
    tabs: {
      launch: ["Plan review", "Trace systems, dependencies, approval gates, and unresolved spans on one technical sheet."],
      metrics: ["Build readiness", "Track coverage, unresolved nodes, owner gaps, and blocked approvals."],
      assets: ["Drawing set", "Use diagrams, plan sheets, callouts, and measurement labels as functional UI objects."],
    },
    queue: [
      ["West span", "Blocked"],
      ["API joint", "Measured"],
      ["Export set", "Ready"],
    ],
  },
  "26": {
    brand: "ForgeOps",
    nav: ["Lines", "Alarms", "Lockout"],
    eyebrow: "Industrial control room",
    headline: "Run the shift from alarms, line health, and service evidence.",
    lede: "A rugged full-width room for factory lines, hardware fleets, field service queues, lockout notes, and incident handoff.",
    primaryAction: "Acknowledge alarm",
    secondaryAction: "Open lockout log",
    mediaLabel: "Industrial control room board",
    scene: "industrial",
    metrics: [
      ["17", "active alarms"],
      ["04", "line holds"],
      ["93%", "uptime"],
    ],
    features: [
      ["Control-room density", "Status rows, thresholds, owners, and recovery actions stay visible for fast scanning."],
      ["Safety color", "Amber, red, green, and neutral states mean something specific and never act as decoration."],
      ["Rugged controls", "Buttons, panels, and forms feel serviceable under pressure rather than delicate."],
    ],
    tabs: {
      launch: ["Shift triage", "Group line status, active alarms, owners, thresholds, and recovery actions by urgency."],
      metrics: ["Plant pulse", "Compare uptime, alarm age, service backlog, and line hold duration."],
      assets: ["Service evidence", "Use machine labels, gauge rows, inspection notes, lockout logs, and service evidence."],
    },
    queue: [
      ["Press line 2", "Hold"],
      ["Coolant pump", "Warn"],
      ["Service log", "Open"],
    ],
  },
};

function makeScenarioTabs(launch, metrics, assets) {
  return {
    launch: [launch, "Arrange the main object, decision path, and supporting details before polishing the style."],
    metrics: [metrics, "Track the few signals that matter to this specific page instead of filling space with generic KPIs."],
    assets: [assets, "Use visual objects that belong to the scene so the sample feels lived-in and useful."],
  };
}

const redesignedScenarios = {
  "03": {
    brand: "Northlight Rooms",
    nav: ["Sessions", "Rooms", "Tickets"],
    eyebrow: "Immersive listening salon",
    headline: "Book a quiet room where color, sound, and time move together.",
    lede: "A late-night art venue page for sound baths, light installations, private listening rooms, and small cultural gatherings.",
    primaryAction: "Reserve a session",
    secondaryAction: "View room map",
    mediaLabel: "Aurora listening room schedule",
    scene: "aurora",
    metrics: [["09:30", "next session"], ["42", "seats left"], ["3", "rooms tuned"]],
    features: [
      ["Light as schedule", "The aurora field marks session phases, entry time, and room intensity instead of acting as decoration."],
      ["Human pace", "Capacity, quiet rules, and host notes stay close to the booking action."],
      ["Spatial proof", "Room map, sound cues, and visitor notes make the page feel like a real venue."],
    ],
    tabs: makeScenarioTabs("Session booking", "Room signal", "Sound and light objects"),
    queue: [["Dusk Room", "Open"], ["Rain Chamber", "Few seats"], ["North Alcove", "Private"]],
  },
  "08": {
    brand: "Silver Contact",
    nav: ["Contact Sheet", "Prints", "Darkroom"],
    eyebrow: "Monochrome photo archive",
    headline: "Review a print run through contact sheets, crop marks, and quiet provenance.",
    lede: "A stark photography studio page for exhibition proofs, silver gelatin prints, darkroom notes, and collector inquiries.",
    primaryAction: "Request proof",
    secondaryAction: "Open darkroom notes",
    mediaLabel: "Black and white contact sheet",
    scene: "stark",
    metrics: [["24", "frames"], ["06", "selected"], ["2", "artist proofs"]],
    features: [
      ["Contact first", "The proof sheet becomes the main interface, with frame numbers and selected marks doing real work."],
      ["Private inquiry", "Collector action stays precise and quiet rather than commercial."],
      ["Print evidence", "Paper type, crop choice, and darkroom notes sit beside the selected frame."],
    ],
    tabs: makeScenarioTabs("Proof selection", "Inquiry signal", "Print and darkroom evidence"),
    queue: [["Frame 12", "Selected"], ["Fiber paper", "Ready"], ["Toning note", "Draft"]],
  },
  "09": {
    brand: "Riso Ledger",
    nav: ["Jobs", "Ink", "Pickup"],
    eyebrow: "Print studio job sheet",
    headline: "Track a small edition from paper stock to pickup shelf.",
    lede: "A minimal production page for risograph editions, poster runs, ink mixes, proof approvals, and studio pickup windows.",
    primaryAction: "Approve proof",
    secondaryAction: "Print docket",
    mediaLabel: "Minimal print production ledger",
    scene: "minimal",
    metrics: [["120", "sheets"], ["2", "ink passes"], ["4PM", "pickup"]],
    features: [
      ["Ledger focus", "A single production sheet anchors the page instead of a generic SaaS hero."],
      ["Studio precision", "Paper, ink, drying time, and pickup status read like a real workshop record."],
      ["Quiet hierarchy", "Whitespace is used to separate job stages, not to make the page feel empty."],
    ],
    tabs: makeScenarioTabs("Proof approval", "Production signal", "Paper and ink details"),
    queue: [["Blue pass", "Drying"], ["Proof crop", "Approved"], ["Pickup shelf", "4PM"]],
  },
  "10": {
    brand: "Velvet Screen",
    nav: ["Program", "Cuts", "Seats"],
    eyebrow: "Micro-cinema program",
    headline: "Stage tonight's screening with reels, seats, and projection notes.",
    lede: "A dark cultural venue page for independent film nights, director cuts, reserved rows, and projection booth readiness.",
    primaryAction: "Hold two seats",
    secondaryAction: "View program",
    mediaLabel: "Dark cinema screening board",
    scene: "cinema",
    metrics: [["7:45", "doors"], ["18", "seats open"], ["4K", "projector ready"]],
    features: [
      ["Frame led layout", "The main viewer behaves like a screening window, with reel notes and seat status attached."],
      ["Night atmosphere", "Dark panels and a single bright action support the cinema mood without hiding details."],
      ["Operational culture", "Program order, cue sheet, and booth status make the page useful, not only pretty."],
    ],
    tabs: makeScenarioTabs("Screening setup", "Seat signal", "Film and booth assets"),
    queue: [["Short reel", "Queued"], ["Row C", "Held"], ["Booth note", "Ready"]],
  },
  "11": {
    brand: "Gallery Route",
    nav: ["Plan", "Works", "Guides"],
    eyebrow: "Exhibition route map",
    headline: "Map a gallery walk from entrance wall to final listening bench.",
    lede: "A structured museum page for exhibition routes, artwork labels, accessibility stops, docent timing, and visitor flow.",
    primaryAction: "Start route",
    secondaryAction: "Export wall labels",
    mediaLabel: "Structured museum floor plan",
    scene: "lines",
    metrics: [["07", "stops"], ["48m", "walk time"], ["3", "quiet seats"]],
    features: [
      ["Linework navigation", "Routes, wall numbers, and object labels are drawn as a plan rather than as loose cards."],
      ["Public clarity", "The page keeps entrance, accessible path, rest points, and labels legible."],
      ["Curatorial rhythm", "Each stop has a purpose: look, listen, rest, or read."],
    ],
    tabs: makeScenarioTabs("Route planning", "Visitor flow", "Labels and floor plan"),
    queue: [["North Wall", "Stop 02"], ["Sound Bench", "Quiet"], ["Exit Label", "Needs proof"]],
  },
  "12": {
    brand: "Room & Grain",
    nav: ["Boards", "Fabrics", "Orders"],
    eyebrow: "Interior material board",
    headline: "Compare wood, textile, stone, and paint before the room is built.",
    lede: "A tactile interior design page for sample boards, finish palettes, supplier notes, room mood, and approval decisions.",
    primaryAction: "Approve board",
    secondaryAction: "Compare samples",
    mediaLabel: "Layered interior material samples",
    scene: "material",
    metrics: [["14", "samples"], ["5", "finishes"], ["82%", "stock ready"]],
    features: [
      ["Sample stack", "Physical layers, swatches, and supplier labels replace abstract product cards."],
      ["Room logic", "Each material is tied to a real placement such as wall, floor, counter, or textile."],
      ["Approval trail", "Availability, finish note, and owner decision remain visible together."],
    ],
    tabs: makeScenarioTabs("Board approval", "Stock signal", "Material samples"),
    queue: [["Oak veneer", "Chosen"], ["Linen weave", "Hold"], ["Warm limewash", "Sample due"]],
  },
  "13": {
    brand: "Supper Blocks",
    nav: ["Menu", "Market", "Seats"],
    eyebrow: "Seasonal tasting menu",
    headline: "Build a dinner story from market crates, chef notes, and table timing.",
    lede: "A bento-style restaurant page for seasonal courses, local producers, table counts, chef quotes, and service rhythm.",
    primaryAction: "Book table",
    secondaryAction: "See market list",
    mediaLabel: "Irregular tasting menu bento",
    scene: "bento",
    metrics: [["06", "courses"], ["32", "covers"], ["11AM", "market run"]],
    features: [
      ["Food blocks", "Large and small tiles follow actual service meaning: hero course, producer note, quote, timing, and booking."],
      ["Market texture", "Ingredient blocks carry the visual energy instead of decorative shapes."],
      ["Uneven but useful", "The grid changes size by content value, not randomly."],
    ],
    tabs: makeScenarioTabs("Service story", "Booking signal", "Menu and market objects"),
    queue: [["Tomato course", "Lead"], ["Bread pickup", "11AM"], ["Window table", "Open"]],
  },
  "14": {
    brand: "Luma Shelf",
    nav: ["Lamp", "Scenes", "Timers"],
    eyebrow: "Tactile home light console",
    headline: "Tune the evening shelf with soft light, music, and one calm timer.",
    lede: "A neumorphic control page for a home mood lamp, bedside audio, reading timer, and gentle scene presets.",
    primaryAction: "Start evening scene",
    secondaryAction: "Save preset",
    mediaLabel: "Soft tactile lamp controls",
    scene: "soft-depth",
    metrics: [["38%", "warm glow"], ["22m", "reading timer"], ["4", "scene pads"]],
    features: [
      ["Physical controls", "Raised pads, inset wells, and a central dial make the page feel like a real object."],
      ["Home scale", "The interface focuses on a shelf, a lamp, and an evening routine rather than a dense dashboard."],
      ["Soft states", "Pressed, saved, dimmed, and timer states stay readable despite the gentle surface."],
    ],
    tabs: makeScenarioTabs("Scene control", "Timer signal", "Lamp and audio controls"),
    queue: [["Reading glow", "Active"], ["Rain track", "Low"], ["Sunrise timer", "Saved"]],
  },
  "15": {
    brand: "Glasshouse Nine",
    nav: ["Canopy", "Water", "Visit"],
    eyebrow: "Botanical glasshouse map",
    headline: "Float humidity, watering, and visitor paths over a living conservatory.",
    lede: "A liquid glass page for plant houses, climate rooms, watering routes, glass roofs, and public garden visits.",
    primaryAction: "Open canopy map",
    secondaryAction: "Schedule watering",
    mediaLabel: "Translucent botanical glasshouse map",
    scene: "glass",
    metrics: [["74%", "humidity"], ["18C", "fern room"], ["06", "water zones"]],
    features: [
      ["Living map", "Glass layers sit over beds, paths, and climate zones instead of a generic sci-fi background."],
      ["Readable translucency", "Tint and borders protect text while still feeling like glass."],
      ["Garden operations", "Visitor route, water schedule, and climate status are visible at once."],
    ],
    tabs: makeScenarioTabs("Canopy map", "Climate signal", "Plants and glass layers"),
    queue: [["Fern room", "Stable"], ["Orchid mist", "Due"], ["West path", "Open"]],
  },
  "19": {
    brand: "Block Party Press",
    nav: ["Lineup", "Posters", "Stage"],
    eyebrow: "Community festival wall",
    headline: "Turn a street festival into posters, stages, and volunteer moments.",
    lede: "A vivid page for neighborhood music nights, poster approvals, food stalls, stage timing, and volunteer check-ins.",
    primaryAction: "Publish poster",
    secondaryAction: "Review lineup",
    mediaLabel: "Gradient community festival wall",
    scene: "gradient",
    metrics: [["18", "artists"], ["42", "volunteers"], ["3", "poster sizes"]],
    features: [
      ["Poster energy", "Gradient color becomes a print wall, lineup ribbon, and stage schedule."],
      ["Full canvas", "The page is packed with usable festival objects so no side feels empty."],
      ["Public action", "Publish, lineup, and volunteer states remain clearer than the color field."],
    ],
    tabs: makeScenarioTabs("Poster release", "Festival signal", "Lineup and print assets"),
    queue: [["Main poster", "Approved"], ["Food lane", "Mapped"], ["Volunteer tent", "Needs lead"]],
  },
  "20": {
    brand: "Seedling Club",
    nav: ["Garden", "Classes", "Notes"],
    eyebrow: "Neighborhood garden lessons",
    headline: "Plan a weekend workshop around soil, seedlings, and shared notes.",
    lede: "A soft pop page for community gardens, family classes, seed swaps, lesson cards, and cheerful practice prompts.",
    primaryAction: "Join class",
    secondaryAction: "Open seed notes",
    mediaLabel: "Soft garden workshop board",
    scene: "doodle",
    metrics: [["12", "gardeners"], ["4", "seed trays"], ["28m", "lesson time"]],
    features: [
      ["Gentle learning", "Workshop steps, garden objects, and notes create structure without feeling like school software."],
      ["Warm utility", "The design stays friendly while still showing time, capacity, and next action."],
      ["Shared notes", "Seed care, class progress, and retry prompts belong to the same garden board."],
    ],
    tabs: makeScenarioTabs("Workshop plan", "Class signal", "Seeds and notes"),
    queue: [["Soil demo", "Ready"], ["Tomato tray", "Watered"], ["Compost note", "Saved"]],
  },
  "22": {
    brand: "Marble Fox Theatre",
    nav: ["Shows", "Tables", "Bar"],
    eyebrow: "Jazz theatre foyer",
    headline: "Reserve a velvet table for a brass set and midnight dessert.",
    lede: "An Art Deco venue page for jazz nights, supper club tables, program cards, bar service, and gold-framed availability.",
    primaryAction: "Reserve table",
    secondaryAction: "View seating plan",
    mediaLabel: "Gilded jazz theatre foyer",
    scene: "deco",
    metrics: [["08", "tables left"], ["9PM", "first set"], ["02", "bar menus"]],
    features: [
      ["Axial drama", "Symmetry, stepped frames, and gold rules feel like a theatre foyer, not a luxury wallpaper."],
      ["Reservation proof", "Tables, set times, bar notes, and program states become polished labels."],
      ["Ceremony with use", "The primary action is staged but still immediate."],
    ],
    tabs: makeScenarioTabs("Table release", "Evening signal", "Program and seating assets"),
    queue: [["Table 7", "Open"], ["Dessert card", "Signed"], ["First set", "9PM"]],
  },
  "23": {
    brand: "Mend Clay",
    nav: ["Repairs", "Pieces", "Visit"],
    eyebrow: "Ceramic repair studio",
    headline: "Give a cracked bowl a slower second life with gold, clay, and care.",
    lede: "A wabi-sabi studio page for ceramic repairs, object intake, care notes, process journals, and small workshop visits.",
    primaryAction: "Book repair",
    secondaryAction: "Read care note",
    mediaLabel: "Quiet ceramic repair table",
    scene: "wabi",
    metrics: [["05", "repairs drying"], ["12d", "cure time"], ["3", "clay bodies"]],
    features: [
      ["Repair table", "Objects, cracks, slips, and care notes create the layout language."],
      ["Useful imperfection", "Irregular shapes are tied to real ceramic states such as drying, sealed, and reserved."],
      ["Slow conversion", "The action follows trust, material notes, and process evidence."],
    ],
    tabs: makeScenarioTabs("Repair intake", "Studio rhythm", "Clay and care objects"),
    queue: [["Tea bowl", "Drying"], ["Gold seam", "Curing"], ["Care card", "Ready"]],
  },
  "24": {
    brand: "Mist Valley Tea",
    nav: ["Origins", "Lots", "Tasting"],
    eyebrow: "Tea mountain origin scroll",
    headline: "Trace one tea lot from foggy ridge to tasting table.",
    lede: "An ink-wash editorial commerce page for tea origin notes, tasting records, mountain lots, seals, and restrained product proof.",
    primaryAction: "Open tasting scroll",
    secondaryAction: "Browse lots",
    mediaLabel: "Ink tea origin scroll",
    scene: "ink",
    metrics: [["04", "ridge lots"], ["19C", "morning mist"], ["01", "red seal"]],
    features: [
      ["Scroll pacing", "Story, lot ledger, and tasting note unfold vertically like a quiet product record."],
      ["Seal semantics", "Red is reserved for chosen lot, provenance proof, and decisive action."],
      ["Cultural restraint", "Ink, blank paper, and source notes carry information instead of decoration."],
    ],
    tabs: makeScenarioTabs("Tasting scroll", "Origin signal", "Tea lots and seals"),
    queue: [["Lot MV-04", "Selected"], ["Roast note", "Saved"], ["Source seal", "Ready"]],
  },
  "25": {
    brand: "Loft Plan Works",
    nav: ["Plan", "Materials", "Crew"],
    eyebrow: "Small studio renovation sheet",
    headline: "Measure a live-work loft before the first wall is moved.",
    lede: "A blueprint page for apartment renovation, built-in furniture, lighting runs, contractor notes, and measured room decisions.",
    primaryAction: "Approve plan",
    secondaryAction: "Export drawing",
    mediaLabel: "Blueprint loft renovation plan",
    scene: "blueprint",
    metrics: [["38m2", "studio area"], ["07", "fixtures"], ["3", "open notes"]],
    features: [
      ["Measured living", "Dimensions, furniture blocks, and lighting runs are part of the UI, not background texture."],
      ["Build clarity", "Crew notes, room callouts, and unresolved spans stay attached to the plan."],
      ["Plan-sheet precision", "The layout feels technical while remaining about a real home."],
    ],
    tabs: makeScenarioTabs("Plan approval", "Build readiness", "Room and material drawings"),
    queue: [["Kitchen wall", "Measure"], ["Bookshelf bay", "Approved"], ["Pendant run", "Revise"]],
  },
  "26": {
    brand: "Press Room 12",
    nav: ["Presses", "Ink", "Safety"],
    eyebrow: "Printmaking studio control",
    headline: "Run a letterpress shift through ink, plates, rollers, and cleanup.",
    lede: "An industrial control page for a working print studio with press status, ink batches, drying racks, safety lockouts, and service evidence.",
    primaryAction: "Acknowledge hold",
    secondaryAction: "Open cleanup log",
    mediaLabel: "Industrial printmaking room board",
    scene: "industrial",
    metrics: [["04", "presses active"], ["2", "holds"], ["91%", "dry rack load"]],
    features: [
      ["Shop-floor density", "Line cards, alarms, ink batches, and service notes stay visible for fast scanning."],
      ["Safety color", "Amber, red, green, and neutral states map to real press-room meaning."],
      ["Rugged craft", "The page feels industrial without becoming a factory clone."],
    ],
    tabs: makeScenarioTabs("Shift triage", "Press signal", "Ink and service evidence"),
    queue: [["Press B", "Hold"], ["Cyan batch", "Mixing"], ["Cleanup sink", "Open"]],
  },
};

function getScenario(style) {
  return redesignedScenarios[style.id] || scenarios[style.id] || {
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
      ["26", "catalog"],
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
    layout: "admin-console",
    name: "Blue Admin Console",
    zhName: "浅蓝后台控制台",
    structure: "Full admin application shell: white sidebar, white top bar, breadcrumb/tab strip, gray-blue workspace, KPI row, quick entries, chart cards, ranking panel, approval/calendar widgets, and a dense data table.",
    zhStructure: "完整后台应用外壳：白色侧栏、白色顶栏、面包屑/标签、灰蓝工作区、指标卡行、快捷入口、图表卡、排行面板、审批/日程组件和密集数据表。",
    typography: "Use compact sans-serif UI text, practical section titles, tabular numerals, muted labels, and table-first hierarchy instead of hero-scale headings.",
    zhTypography: "使用紧凑非衬线界面字体、实用分区标题、表格数字、弱化标签和表格优先层级，不使用首屏大标题。",
    components: "Persistent sidebar navigation, top search, icon buttons, account menu, active tabs, KPI cards, shortcut tiles, filter toolbar, date range controls, status chips, data tables, charts, approval tabs, ranking lists, and calendar strips should feel like one admin system.",
    zhComponents: "固定侧边导航、顶部搜索、图标按钮、账户菜单、激活标签、指标卡、快捷入口、筛选工具条、日期范围控件、状态标签、数据表、图表、审批标签、排行列表和日程条应属于同一个后台系统。",
    buttons: "Primary buttons are practical solid controls; secondary actions stay quiet as bordered controls.",
    zhButtons: "主按钮是务实的实色控件，次级操作保持低调边框样式。",
    media: "Use real interface evidence: table rows, chart grids, ranked lists, empty states, approval panes, calendars, and product screenshots instead of abstract hero art.",
    zhMedia: "使用真实界面证据：表格行、图表网格、排行列表、空状态、审批面板、日历和产品截图，不使用抽象主视觉。",
    states: "Show selected sidebar item, active tab, search/filter state, pending approvals, warning rows, empty tables, disabled tools, loading rows, and focus rings clearly.",
    zhStates: "清楚呈现侧栏选中项、激活标签、搜索/筛选状态、待审批、警告行、空表格、禁用工具、加载行和焦点环。",
    avoid: "Do not use marketing hero sections, oversized display copy, decorative card walls, abstract dashboards, or isolated cards without navigation context.",
    zhAvoid: "不要使用营销首屏、超大展示文案、装饰性卡片墙、抽象仪表盘，或缺少导航上下文的孤立卡片。",
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
    layout: "swiss-archive",
    name: "Swiss Archive Board",
    zhName: "瑞士档案索引板",
    structure: "Objective issue board with masthead rules, accession numbers, object crops, dense source rows, and a visible modular grid.",
    zhStructure: "客观期刊索引板，包含刊头规则线、藏品编号、对象裁切、密集来源行和可见模块网格。",
    typography: "Use grotesk type, tabular numerals, uppercase labels, strict alignment, and oversized issue numbers.",
    zhTypography: "使用 grotesk 字体、等宽数字、大写标签、严格对齐和超大期号。",
    components: "Mastheads, object boards, accession rows, source ledgers, issue metrics, and compact text actions define the page.",
    zhComponents: "刊头、对象板、藏品行、来源账本、期号指标和紧凑文字操作定义页面。",
    buttons: "Buttons are hard-edged text or rule-line controls that align to the grid.",
    zhButtons: "按钮使用硬边文字或规则线控件，并对齐网格。",
    media: "Use cropped catalog objects, source fragments, accession labels, and table-like evidence blocks.",
    zhMedia: "使用目录对象裁切、来源片段、藏品标签和表格式证据块。",
    states: "Show selected issue, locked index, source-open, caption-needed, saved object, and empty source states.",
    zhStates: "呈现 selected issue、locked index、source-open、caption-needed、saved object 和 empty source 状态。",
    avoid: "Do not let the page collapse into a generic editorial article with sidebars.",
    zhAvoid: "不要让页面退化成带边栏的通用编辑文章页。",
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
    layout: "cute-desk",
    name: "Cute Daily Desk",
    zhName: "可爱日程桌面",
    structure: "Playful task desk with today lanes, reward shelf, sticky notes, soft objects, and compact progress controls.",
    zhStructure: "玩乐任务桌面，包含今日泳道、奖励架、便签、柔和对象和紧凑进度控件。",
    typography: "Use friendly bold headings, short task labels, and calm readable status text.",
    zhTypography: "使用友好粗标题、短任务标签和安静可读的状态文字。",
    components: "Task tiles, reward tokens, progress meters, note pads, and friendly state chips should be tactile but useful.",
    zhComponents: "任务块、奖励 token、进度条、便签和友好状态 chip 要有触感且有用。",
    buttons: "Buttons are chunky, softly outlined, playful, and clearly clickable without neon glare.",
    zhButtons: "按钮厚实、柔和描边、有玩乐感，并且显然可点击但不刺眼。",
    media: "Use soft object shapes, note cards, badges, and task-board cues as workflow anchors.",
    zhMedia: "使用柔和对象形状、便签、徽章和任务板线索作为流程锚点。",
    states: "Show next, done, ready, skipped, reward-ready, and gentle blocked states.",
    zhStates: "呈现 next、done、ready、skipped、reward-ready 和温和 blocked 状态。",
    avoid: "Do not let cuteness remove workflow clarity or make the palette painfully bright.",
    zhAvoid: "不要让可爱感削弱流程清晰度，也不要让配色刺眼。",
  },
  "08": {
    layout: "stark-dossier",
    name: "Stark Evidence Dossier",
    zhName: "克制证据档案",
    structure: "Black dossier page with accession numbers, exhibit rows, object crop, inquiry rail, and source ledger.",
    zhStructure: "黑色档案页，包含藏品编号、展品行、对象裁切、询问轨和来源账本。",
    typography: "Use thin restrained type, tabular numerals, fine rules, and a few decisive headings.",
    zhTypography: "使用纤细克制字体、等宽数字、细规则线和少数明确标题。",
    components: "Exhibit ledgers, provenance rows, inquiry controls, object frames, and private note cells should stay calm.",
    zhComponents: "展品账本、来源行、询问控件、对象框和私密注释单元应保持安静。",
    buttons: "Actions are quiet text buttons or thin outlined controls, never loud filled blocks.",
    zhButtons: "操作是安静文字按钮或细描边控件，绝不用强烈实心块。",
    media: "Use one object crop plus structured evidence rows rather than a generic hero-and-copy split.",
    zhMedia: "使用一个对象裁切加结构化证据行，而不是通用英雄区加文案分栏。",
    states: "Show filed, private link ready, inquiry received, source-open, and note draft states.",
    zhStates: "呈现 filed、private link ready、inquiry received、source-open 和 note draft 状态。",
    avoid: "Do not fill the silence with equal SaaS cards or decorative noise.",
    zhAvoid: "不要用等权 SaaS 卡片或装饰噪点填满安静感。",
  },
  "09": {
    layout: "minimal-command",
    name: "Minimal Command Workspace",
    zhName: "极简命令工作区",
    structure: "Command-first workspace with a large prompt bar, result pane, run history, review notes, and compact evidence rows.",
    zhStructure: "命令优先工作区，包含大提示栏、结果面、运行历史、审阅笔记和紧凑证据行。",
    typography: "Use readable UI type with monospace fragments, crisp labels, and restrained heading scale.",
    zhTypography: "使用易读界面字体、等宽片段、清晰标签和克制标题层级。",
    components: "Prompt bar, generated result, run rows, code fragments, review chips, and save states should feel like a real tool.",
    zhComponents: "提示栏、生成结果、运行行、代码片段、审阅 chip 和保存状态应像真实工具。",
    buttons: "Buttons are simple and sharp; primary action is solid, secondary actions are text or light outlines.",
    zhButtons: "按钮简洁利落；主操作实色，次级操作用文字或轻描边。",
    media: "Use code snippets, output excerpts, diffs, or command history instead of decorative screenshots.",
    zhMedia: "使用代码片段、输出摘录、diff 或命令历史，不使用装饰截图。",
    states: "Show running, accepted, review due, saved, blocked, and disabled submit states.",
    zhStates: "呈现 running、accepted、review due、saved、blocked 和 disabled submit 状态。",
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
    layout: "layered-catalog",
    name: "Layered Material Catalog",
    zhName: "层叠材质目录",
    structure: "Tactile product catalog with stacked samples, finish swatches, approval notes, inventory rail, and spec sheets.",
    zhStructure: "触感产品目录，包含叠放样品、表面色片、审批注释、库存轨和规格表。",
    typography: "Use readable UI type, clear material labels, and generous tap-target spacing for review controls.",
    zhTypography: "使用易读界面字体、清晰材质标签，并给审阅控件保留充足触控间距。",
    components: "Sample stacks, swatches, spec rows, approval chips, inventory meters, and compare controls should share material depth.",
    zhComponents: "样品叠层、色片、规格行、审批 chip、库存仪表和对比控件应共享材质层级。",
    buttons: "Buttons are tonal or filled with large radius and obvious pressed or selected states.",
    zhButtons: "按钮使用色调或实色、大圆角和清楚按下/选中状态。",
    media: "Use sample cards, material swatches, stacked sheets, and spec labels as the visual language.",
    zhMedia: "使用样品卡、材质色片、层叠纸张和规格标签作为视觉语言。",
    states: "Show ready, test, hold, approved, low-stock, selected sample, and disabled states.",
    zhStates: "呈现 ready、test、hold、approved、low-stock、selected sample 和 disabled 状态。",
    avoid: "Do not turn layered material into a generic daily task dashboard.",
    zhAvoid: "不要把层级材质风做成通用日程仪表盘。",
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
    layout: "neumo-wallet",
    name: "Soft Finance Cockpit",
    zhName: "柔软金融控制台",
    structure: "Calm finance cockpit with raised cards, inset goal wells, transfer controls, limit pads, and a clear confirmation state.",
    zhStructure: "安静金融控制台，包含凸起卡片、内凹目标槽、转账控件、额度按钮和清晰确认状态。",
    typography: "Use calm medium-weight labels, clear values, tabular numerals, and limited headings.",
    zhTypography: "使用平静中等字重标签、清晰数值、等宽数字和有限标题。",
    components: "Balance cards, goal wells, transfer pads, limit sliders, and confirmation chips should all feel tactile.",
    zhComponents: "余额卡、目标槽、转账垫、额度滑杆和确认 chip 都要有触感。",
    buttons: "Buttons are raised or inset with clear pressed states and strong enough contrast.",
    zhButtons: "按钮使用凸起或内凹状态，并有清晰 pressed 状态和足够对比度。",
    media: "Use card stacks, goal meters, tactile dials, and account controls instead of photos.",
    zhMedia: "使用卡片叠层、目标仪表、触感旋钮和账户控件，不使用照片。",
    states: "Show pressed, funded, limit reached, disabled, transfer pending, and confirmed states.",
    zhStates: "呈现 pressed、funded、limit reached、disabled、transfer pending 和 confirmed 状态。",
    avoid: "Do not let soft shadows reduce accessibility or hide financial risk states.",
    zhAvoid: "不要让柔和阴影降低可访问性或隐藏金融风险状态。",
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
    layout: "precision-map",
    name: "Precision Incident Map",
    zhName: "精密事故地图",
    structure: "Full-width technical map with topology canvas, span lanes, replay command bar, incident ticker, and attached evidence panels.",
    zhStructure: "全宽技术地图，包含拓扑画布、span 泳道、回放命令栏、事故滚动条和附着证据面板。",
    typography: "Use compact technical UI type, precise labels, and aligned numeric values.",
    zhTypography: "使用紧凑技术界面字体、精确标签和对齐数值。",
    components: "Topology nodes, span lanes, incident chips, command buttons, latency strips, and replay fragments should feel engineered.",
    zhComponents: "拓扑节点、span 泳道、事件标签、命令按钮、延迟条和回放片段要有工程感。",
    buttons: "Buttons are compact dark controls with glow reserved for active or critical actions.",
    zhButtons: "按钮是紧凑暗色控件，发光只用于激活或关键操作。",
    media: "Use topology maps, traces, logs, span diagrams, and evidence overlays instead of generic sci-fi backgrounds.",
    zhMedia: "使用拓扑地图、追踪、日志、span 图和证据覆盖层，不用通用科幻背景。",
    states: "Show active path, fail, retry, replay ready, incident open, and selected node states.",
    zhStates: "呈现 active path、fail、retry、replay ready、incident open 和 selected node 状态。",
    avoid: "Do not cover precise information with excessive glow.",
    zhAvoid: "不要用过量发光遮住精确信息。",
  },
  "19": {
    layout: "gradient-launch",
    name: "Gradient Launch Wall",
    zhName: "渐变发布墙",
    structure: "Bright campaign room with launch timeline, asset mosaic, audience tests, conversion counters, and a publish rail.",
    zhStructure: "明亮活动室，包含发布时间线、素材马赛克、受众测试、转化计数和发布轨。",
    typography: "Use friendly modern headings, clear product labels, and energetic but readable body copy.",
    zhTypography: "使用友好现代标题、清晰产品标签和有能量但可读的正文。",
    components: "Timeline markers, asset tiles, color chips, audience cards, publish gates, and conversion counters should feel active.",
    zhComponents: "时间线标记、素材块、色片、受众卡、发布闸口和转化计数要有行动感。",
    buttons: "Buttons are high-color and confident, with calmer secondary actions.",
    zhButtons: "按钮高色彩且自信，次级操作保持安静。",
    media: "Use campaign previews, template thumbnails, audience test cards, timeline blocks, and color chips.",
    zhMedia: "使用活动预览、模板缩略图、受众测试卡、时间线块和色片。",
    states: "Show approved, running, ready, published, dropped-off, testing, and activation states.",
    zhStates: "呈现 approved、running、ready、published、dropped-off、testing 和 activation 状态。",
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
  "22": {
    layout: "deco-foyer",
    name: "Gilded Poster Foyer",
    zhName: "鎏金海报门厅",
    structure: "Symmetric poster-stage composition with stepped frames, monogram-like labels, venue proof, and a ceremonial action rail.",
    zhStructure: "对称海报舞台构图，包含阶梯框线、类字标标签、场地证明和仪式化操作轨。",
    typography: "Use elegant display headings, short uppercase-style labels, refined numerals, and restrained body copy.",
    zhTypography: "使用优雅展示标题、短标签、精致数字和克制正文。",
    components: "Reservation modules, room cards, proof labels, ticket strips, floor-plan markers, and menu notes should feel polished and physical.",
    zhComponents: "预订模块、房间卡、证明标签、票券条、平面图标记和菜单说明要有精致实体感。",
    buttons: "Buttons are framed, centered, and ceremonial; primary actions may use gold fill, secondary actions use fine outline rules.",
    zhButtons: "按钮要有框线、居中且有仪式感；主操作可用金色填充，次操作使用细描边规则。",
    media: "Use venue photography, floor-plan lines, monograms, menu cards, and symmetrical poster objects.",
    zhMedia: "使用场地照片、平面图线条、字标、菜单卡和对称海报对象。",
    states: "Show available, held, private, waitlist, signed, and invitation-only states with polished labels.",
    zhStates: "用精致标签呈现 available、held、private、waitlist、signed 和 invitation-only 状态。",
    avoid: "Do not scatter gold trim everywhere or turn the page into a generic luxury wallpaper.",
    zhAvoid: "不要到处撒金色装饰，也不要把页面做成通用奢华壁纸。",
  },
  "23": {
    layout: "material-gallery",
    name: "Quiet Material Gallery",
    zhName: "安静材质画廊",
    structure: "Asymmetric object gallery with generous paper-like space, small captions, material notes, and a slow reveal path.",
    zhStructure: "不对称对象画廊，包含纸感留白、小图注、材质说明和缓慢展开路径。",
    typography: "Use warm serif or humanist sans headings, calm body text, small captions, and no loud display gimmicks.",
    zhTypography: "使用温暖衬线或人文非衬线标题、平静正文、小图注，不用吵闹展示字。",
    components: "Object cards, care notes, process logs, journal entries, and availability labels should feel handmade but aligned.",
    zhComponents: "对象卡、养护说明、过程记录、日志条目和库存标签要有手作感但保持对齐。",
    buttons: "Buttons are quiet, grounded, and low-contrast until focus or selected state makes them precise.",
    zhButtons: "按钮安静、踏实、低对比，直到焦点或选中态再变得明确。",
    media: "Use material closeups, process photos, object silhouettes, fibers, clay, linen, wood, or stone textures.",
    zhMedia: "使用材质特写、过程照片、对象轮廓、纤维、陶土、亚麻、木或石材纹理。",
    states: "Show reserved, drying, repaired, sold, available, and care-needed states with small honest labels.",
    zhStates: "用小而真实的标签呈现 reserved、drying、repaired、sold、available 和 care-needed 状态。",
    avoid: "Do not polish away all irregularity or fill the silence with generic cards.",
    zhAvoid: "不要把不规则感全部磨掉，也不要用通用卡片填满安静空间。",
  },
  "24": {
    layout: "ink-landscape",
    name: "Ink Landscape Scroll",
    zhName: "水墨山水卷轴",
    structure: "Asymmetric scroll page with a large ink landscape field, seal stack, tea ledger, provenance strip, and cultural product proof.",
    zhStructure: "不对称卷轴页，包含大幅水墨山水场、印章组、茶品账本、出处条和文化产品证明。",
    typography: "Use expressive calligraphic moments only for headings or seals; keep body text readable with disciplined line length.",
    zhTypography: "书写感只用于标题或印章瞬间；正文保持可读和克制行长。",
    components: "Source notes, tea lots, exhibit rows, provenance seals, index entries, and captioned media should feel archival.",
    zhComponents: "来源说明、茶批次、展品行、出处印章、索引条和带图注媒体要有档案感。",
    buttons: "Primary actions can read like a seal or brush label; secondary actions should be text or rule-line controls.",
    zhButtons: "主操作可像印章或笔墨标签；次操作应使用文字或规则线控件。",
    media: "Use paper texture, ink wash fields, seal marks, object photos, scroll fragments, and captioned cultural proof.",
    zhMedia: "使用纸纹、墨色晕染、印章、对象照片、卷轴片段和带说明的文化证明。",
    states: "Show selected lot, sealed proof, source-open, tasting note saved, warning, and archived states.",
    zhStates: "呈现 selected lot、sealed proof、source-open、tasting note saved、warning 和 archived 状态。",
    avoid: "Do not use decorative cultural symbols without information value or readable structure.",
    zhAvoid: "不要使用没有信息价值或可读结构的装饰性文化符号。",
  },
  "25": {
    layout: "blueprint-sheet",
    name: "Technical Blueprint Sheet",
    zhName: "技术蓝图图纸",
    structure: "Engineering sheet with grid coordinates, graph nodes, dimension callouts, annotation panels, and export-ready plan sections.",
    zhStructure: "工程图纸布局，包含网格坐标、图节点、尺寸标注、注释面板和可导出的计划区域。",
    typography: "Use compact technical labels, tabular numerals, mono annotations, and clear sheet titles.",
    zhTypography: "使用紧凑技术标签、等宽数字、等宽标注和清楚图纸标题。",
    components: "Nodes, connectors, callouts, coordinate chips, export panels, and dependency rows should look measured and exact.",
    zhComponents: "节点、连接线、标注、坐标 chip、导出面板和依赖行要有测量感和精度。",
    buttons: "Buttons are technical annotations or compact command controls with thin borders and clear focus.",
    zhButtons: "按钮是技术标注或紧凑命令控件，使用细边框和明确焦点。",
    media: "Use system diagrams, plan sheets, dependency maps, measurement labels, and architectural references.",
    zhMedia: "使用系统图、平面图纸、依赖地图、测量标注和建筑式参考对象。",
    states: "Show measured, blocked, exported, selected node, unresolved span, owner assigned, and review-ready states.",
    zhStates: "呈现 measured、blocked、exported、selected node、unresolved span、owner assigned 和 review-ready 状态。",
    avoid: "Do not use generic sci-fi glow when the page needs blueprint precision.",
    zhAvoid: "当页面需要蓝图精度时，不要使用通用科幻发光。",
  },
  "26": {
    layout: "industrial-room",
    name: "Industrial Control Room",
    zhName: "工业控制室",
    structure: "Full-width control room with shift header, line matrix, alarm table, lockout log, service evidence, and machine inspector.",
    zhStructure: "全宽控制室，包含班次头部、产线矩阵、告警表、锁定日志、维修证据和机器检查器。",
    typography: "Use rugged sans-serif UI type, tabular numerals, machine labels, and short uppercase-like state names.",
    zhTypography: "使用耐用非衬线界面字体、等宽数字、机器标签和短状态名。",
    components: "Line cards, alarm rows, lockout notes, service cards, machine tags, gauges, ownership chips, and acknowledgement buttons define the system.",
    zhComponents: "产线卡、告警行、锁定说明、维修卡、机器标签、仪表、负责人 chip 和确认按钮定义系统。",
    buttons: "Buttons are durable rectangular controls; destructive and acknowledgement states must be impossible to miss.",
    zhButtons: "按钮是耐用矩形控件；危险和确认状态必须非常醒目。",
    media: "Use machine labels, gauges, inspection photos, service logs, line diagrams, and threshold charts.",
    zhMedia: "使用机器标签、仪表、巡检照片、维修日志、产线图和阈值图。",
    states: "Show hold, warning, acknowledged, locked out, service open, recovered, disabled, and critical states.",
    zhStates: "呈现 hold、warning、acknowledged、locked out、service open、recovered、disabled 和 critical 状态。",
    avoid: "Do not soften safety-critical UI into glossy consumer dashboards.",
    zhAvoid: "不要把安全关键界面软化成亮面消费者仪表盘。",
  },
};

const redesignedStylePlaybooks = {
  "03": {
    layout: "aurora-listening-room",
    name: "Aurora Listening Room",
    zhName: "极光听觉房间",
    structure: "Immersive venue layout with a luminous room field, session rail, capacity notes, and sound-light booking controls.",
    zhStructure: "沉浸式场馆布局，包含发光房间场、场次轨、容量说明和声光预约控件。",
    typography: "Use calm dark UI type, generous line height, small venue metadata, and restrained luminous headings.",
    zhTypography: "使用安静暗色界面字体、舒展行高、小型场馆元数据和克制发光标题。",
    components: "Room fields, session chips, ticket states, host notes, map legends, and quiet booking controls should feel like a real cultural venue.",
    zhComponents: "房间场、场次标签、票务状态、主持说明、地图图例和安静预约控件要像真实文化场馆。",
    buttons: "Primary actions may glow softly; secondary actions stay translucent with clear borders.",
    zhButtons: "主操作可轻微发光，次操作保持透明描边且清晰。",
    media: "Use aurora light, room maps, sound rings, seat notes, and session bands as useful objects.",
    zhMedia: "使用极光、房间地图、声波环、座位说明和场次条作为有用对象。",
    states: "Show open, few seats, private, selected room, check-in soon, and sold-out states.",
    zhStates: "呈现 open、few seats、private、selected room、check-in soon 和 sold-out 状态。",
    avoid: "Do not make the page a generic AI glow dashboard.",
    zhAvoid: "不要把页面做成通用 AI 发光仪表盘。",
  },
  "08": {
    layout: "stark-photo-contact",
    name: "Stark Photo Contact Sheet",
    zhName: "克制摄影联系印样",
    structure: "Monochrome archive layout with a contact sheet, selected frame, print ledger, darkroom notes, and sparse inquiry action.",
    zhStructure: "黑白档案布局，包含联系印样、选中画面、印制账本、暗房笔记和稀疏询问操作。",
    typography: "Use thin type, frame numbers, narrow captions, and table-like print metadata.",
    zhTypography: "使用细字重、画面编号、窄图注和表格式印制元数据。",
    components: "Contact frames, crop marks, print rows, inquiry cells, and darkroom notes should stay quiet and exact.",
    zhComponents: "联系印样框、裁切标记、印制行、询问单元和暗房笔记应保持安静精准。",
    buttons: "Use quiet text or outline actions with precise focus states.",
    zhButtons: "使用安静文字或描边操作，并提供精准焦点态。",
    media: "Use frame grids, proof marks, print paper labels, and darkroom process notes.",
    zhMedia: "使用画面网格、校样标记、相纸标签和暗房过程说明。",
    states: "Show selected, proof ready, draft note, private inquiry, and edition closed states.",
    zhStates: "呈现 selected、proof ready、draft note、private inquiry 和 edition closed 状态。",
    avoid: "Do not fill the silence with equal dark cards.",
    zhAvoid: "不要用等权暗色卡片填满安静感。",
  },
  "09": {
    layout: "minimal-print-ledger",
    name: "Minimal Print Ledger",
    zhName: "极简印刷账页",
    structure: "Sparse production sheet with print job header, paper and ink ledger, proof panel, pickup rail, and clean decision controls.",
    zhStructure: "稀疏生产单布局，包含印刷任务头、纸张与油墨账页、校样面板、取件轨和干净决策控件。",
    typography: "Use small labels, tabular quantities, quiet headings, and precise production notes.",
    zhTypography: "使用小标签、表格数字、安静标题和精确生产说明。",
    components: "Job rows, ink passes, proof approval, drying status, and pickup windows should feel like studio paperwork.",
    zhComponents: "任务行、油墨版次、校样审批、干燥状态和取件窗口要像工作室单据。",
    buttons: "Buttons are minimal rectangles or text actions with high alignment.",
    zhButtons: "按钮为极简矩形或文字操作，保持高度对齐。",
    media: "Use paper stocks, ink passes, proof crops, and docket rows instead of code snippets.",
    zhMedia: "使用纸张、油墨版次、校样裁切和任务单行，不使用代码片段。",
    states: "Show drying, approved, pickup due, low stock, selected proof, and printed states.",
    zhStates: "呈现 drying、approved、pickup due、low stock、selected proof 和 printed 状态。",
    avoid: "Do not turn minimalism into a blank page with no production evidence.",
    zhAvoid: "不要把极简做成缺少生产证据的空白页。",
  },
  "10": {
    layout: "dark-cinema-review",
    name: "Dark Cinema Review",
    zhName: "暗色影院审阅",
    structure: "Cinematic venue board with a screening frame, program strip, seat ledger, booth status, and night-mode actions.",
    zhStructure: "影院感场馆面板，包含放映画面、节目条、座位账页、放映室状态和夜间操作。",
    typography: "Use high-contrast dark UI text, restrained labels, and cinematic but readable titles.",
    zhTypography: "使用高对比暗色界面文字、克制标签和电影感但可读的标题。",
    components: "Screen frames, film strips, seat holds, booth notes, and program cards should feel operational.",
    zhComponents: "银幕框、胶片条、座位保留、放映室说明和节目卡要有真实运营感。",
    buttons: "Primary action is bright and focused; secondary actions use dark outlines.",
    zhButtons: "主操作明亮聚焦，次操作使用暗色描边。",
    media: "Use reels, frame crops, reserved rows, cue sheets, and booth readiness notes.",
    zhMedia: "使用胶片、画面裁切、保留排、提示单和放映室准备说明。",
    states: "Show queued, held, ready, late doors, sold out, and booth warning states.",
    zhStates: "呈现 queued、held、ready、late doors、sold out 和 booth warning 状态。",
    avoid: "Do not use dark cards without a media or venue structure.",
    zhAvoid: "不要使用缺少媒体或场馆结构的通用暗色卡片。",
  },
  "11": {
    layout: "line-museum-plan",
    name: "Line Museum Plan",
    zhName: "线框博物馆路线",
    structure: "Floor-plan layout with route lines, numbered exhibition stops, labels, guide notes, and accessibility callouts.",
    zhStructure: "平面图布局，包含路线线条、编号展点、标签、导览说明和无障碍标注。",
    typography: "Use factual captions, exact numbering, map labels, and compact guide copy.",
    zhTypography: "使用事实型图注、精确编号、地图标签和紧凑导览文案。",
    components: "Route nodes, wall labels, stop cards, rest points, and export controls should rely on lines before shadows.",
    zhComponents: "路线节点、墙面标签、展点卡、休息点和导出控件应优先依赖线条而非阴影。",
    buttons: "Use disciplined rectangular controls aligned to the plan grid.",
    zhButtons: "使用克制矩形控件，并对齐平面图网格。",
    media: "Use gallery maps, object labels, accessibility routes, and docent timing notes.",
    zhMedia: "使用展厅地图、作品标签、无障碍路线和导览时间说明。",
    states: "Show current stop, quiet seat, label proof, route open, blocked path, and exported states.",
    zhStates: "呈现 current stop、quiet seat、label proof、route open、blocked path 和 exported 状态。",
    avoid: "Do not replace the plan with decorative cards.",
    zhAvoid: "不要用装饰卡片替代平面图。",
  },
  "12": {
    layout: "layered-interior-samples",
    name: "Layered Interior Samples",
    zhName: "层叠室内样板",
    structure: "Material-board layout with stacked samples, swatch lanes, room placement notes, supplier rows, and approval rail.",
    zhStructure: "材料板布局，包含叠放样品、色片轨、空间位置说明、供应商行和审批轨。",
    typography: "Use friendly material labels, room placement captions, and clear stock values.",
    zhTypography: "使用友好材质标签、空间位置图注和清晰库存数值。",
    components: "Swatches, sample stacks, supplier chips, placement notes, and approval states should share tactile depth.",
    zhComponents: "色片、样品叠层、供应商标签、位置说明和审批状态要共享触感层级。",
    buttons: "Use touch-friendly tonal buttons with visible selected states.",
    zhButtons: "使用适合触控的调性按钮，并有可见选中态。",
    media: "Use wood, textile, stone, paint, room plans, and supplier labels as content.",
    zhMedia: "使用木、织物、石材、涂料、房间图和供应商标签作为内容。",
    states: "Show chosen, hold, sample due, low stock, approved, and compare states.",
    zhStates: "呈现 chosen、hold、sample due、low stock、approved 和 compare 状态。",
    avoid: "Do not make layered material look like a generic task dashboard.",
    zhAvoid: "不要把层级材质做成通用任务仪表盘。",
  },
  "13": {
    layout: "bento-market-table",
    name: "Bento Market Table",
    zhName: "便当市集餐桌",
    structure: "Irregular food-service bento with hero course, producer notes, market run, table status, chef quote, and booking block.",
    zhStructure: "不等格餐饮便当布局，包含主菜、生产者说明、采购行程、桌位状态、主厨引用和预订块。",
    typography: "Use compact tile labels, warm menu headings, and clear local hierarchy in each block.",
    zhTypography: "使用紧凑块标签、温暖菜单标题，并在每个块内建立清晰局部层级。",
    components: "Course tiles, market crates, table chips, chef notes, and service timing blocks should vary by content value.",
    zhComponents: "菜品块、市集箱、桌位标签、主厨笔记和服务时间块应按内容价值变化。",
    buttons: "Use embedded tile actions and one confident reservation control.",
    zhButtons: "使用块内操作和一个明确预订控件。",
    media: "Use ingredient blocks, menu notes, market labels, and service timing as the visual language.",
    zhMedia: "使用食材块、菜单说明、市集标签和服务时间作为视觉语言。",
    states: "Show lead course, open table, market pickup, sold out, prepping, and saved states.",
    zhStates: "呈现 lead course、open table、market pickup、sold out、prepping 和 saved 状态。",
    avoid: "Do not make every bento tile the same size.",
    zhAvoid: "不要把每个便当块做成同尺寸。",
  },
  "14": {
    layout: "neumo-lamp-console",
    name: "Neumo Lamp Console",
    zhName: "新拟态灯光控制",
    structure: "Tactile home console with raised lamp dial, inset timer, scene pads, audio strip, and saved evening routines.",
    zhStructure: "触感家庭控制台，包含凸起灯光旋钮、内凹计时器、场景按钮、音频条和已保存夜间流程。",
    typography: "Use calm labels, large readable values, and limited headings for relaxed operation.",
    zhTypography: "使用平静标签、大号可读数值和有限标题，适合放松操作。",
    components: "Dials, pads, inset meters, scene rows, and timer controls should feel physical and focused.",
    zhComponents: "旋钮、按钮垫、内凹仪表、场景行和计时控件要有实体触感且聚焦。",
    buttons: "Use raised and pressed states with enough contrast for tactile controls.",
    zhButtons: "使用凸起和按下态，并确保触感控件有足够对比。",
    media: "Use lamp glow, shelf surfaces, audio waves, and timer wells instead of finance widgets.",
    zhMedia: "使用灯光、置物架、音频波形和计时槽，不使用金融组件。",
    states: "Show active, saved, dimmed, timer running, muted, and pressed states.",
    zhStates: "呈现 active、saved、dimmed、timer running、muted 和 pressed 状态。",
    avoid: "Do not let soft shadows hide state or reduce readability.",
    zhAvoid: "不要让柔阴影隐藏状态或降低可读性。",
  },
  "15": {
    layout: "glass-greenhouse",
    name: "Glasshouse Climate Map",
    zhName: "玻璃温室气候图",
    structure: "Translucent conservatory map with climate panes, water zones, canopy paths, plant notes, and visitor route controls.",
    zhStructure: "透明温室地图，包含气候面板、水区、冠层路径、植物说明和参观路线控件。",
    typography: "Use clean futuristic labels with high contrast over every glass layer.",
    zhTypography: "使用干净未来感标签，并保证每层玻璃上的高对比。",
    components: "Glass panels, climate pins, watering rows, plant cards, and route overlays should stay readable.",
    zhComponents: "玻璃面板、气候针点、浇水行、植物卡和路线覆盖层都要保持可读。",
    buttons: "Use bordered glass controls and bright active states that do not rely on blur alone.",
    zhButtons: "使用带边框玻璃控件和不只依赖模糊的明亮激活态。",
    media: "Use plant beds, canopy maps, mist zones, roof lines, and watering schedules.",
    zhMedia: "使用植物床、冠层地图、雾化区域、屋顶线和浇水计划。",
    states: "Show stable, due, open path, climate drift, selected zone, and mist running states.",
    zhStates: "呈现 stable、due、open path、climate drift、selected zone 和 mist running 状态。",
    avoid: "Do not put low-contrast text over busy translucent scenery.",
    zhAvoid: "不要把低对比文字放在复杂透明场景上。",
  },
  "19": {
    layout: "gradient-festival-wall",
    name: "Gradient Festival Wall",
    zhName: "渐变街区节日墙",
    structure: "Bright public-event board with poster wall, lineup ribbon, volunteer rail, stage map, and print-ready actions.",
    zhStructure: "明亮公共活动面板，包含海报墙、阵容带、志愿者轨、舞台地图和可印刷操作。",
    typography: "Use energetic headings, clear public labels, and readable schedule copy.",
    zhTypography: "使用有能量标题、清晰公共标签和可读日程文案。",
    components: "Poster tiles, artist slots, food-lane blocks, volunteer states, and publish gates should fill the canvas.",
    zhComponents: "海报块、艺人位、餐饮巷块、志愿者状态和发布闸口要填满画面。",
    buttons: "Use confident color for the public action and calmer secondary controls.",
    zhButtons: "公共操作使用自信色彩，次操作保持安静。",
    media: "Use posters, lineup cards, stage strips, volunteer tags, and print sizes.",
    zhMedia: "使用海报、阵容卡、舞台条、志愿者标签和印刷尺寸。",
    states: "Show approved, mapped, needs lead, live, printed, and delayed states.",
    zhStates: "呈现 approved、mapped、needs lead、live、printed 和 delayed 状态。",
    avoid: "Do not let gradients overpower schedule readability.",
    zhAvoid: "不要让渐变压过日程可读性。",
  },
  "20": {
    layout: "soft-garden-class",
    name: "Soft Garden Class",
    zhName: "柔和花园课堂",
    structure: "Friendly workshop board with garden plan, lesson card, seed notes, progress path, and cheerful class controls.",
    zhStructure: "友好工作坊面板，包含花园计划、课程卡、种子笔记、进度路径和明快课堂控件。",
    typography: "Use rounded readable type with useful, human, non-childish microcopy.",
    zhTypography: "使用圆润可读字体和有用、有人的、不幼稚的微文案。",
    components: "Seed trays, class steps, note cards, progress tokens, and retry prompts should feel warm and practical.",
    zhComponents: "种子盘、课堂步骤、笔记卡、进度 token 和重试提示要温暖且实用。",
    buttons: "Use warm rounded buttons with clear focus, saved, and disabled states.",
    zhButtons: "使用温暖圆角按钮，并有清晰焦点、保存和禁用态。",
    media: "Use garden beds, seed trays, lesson notes, and soft doodle cues.",
    zhMedia: "使用花坛、种子盘、课程笔记和柔和涂鸦线索。",
    states: "Show ready, watered, saved, class full, retry, and completed states.",
    zhStates: "呈现 ready、watered、saved、class full、retry 和 completed 状态。",
    avoid: "Do not make friendly design vague or babyish.",
    zhAvoid: "不要把友好设计做得模糊或幼稚。",
  },
  "22": {
    layout: "deco-theater-foyer",
    name: "Deco Theatre Foyer",
    zhName: "装饰艺术剧场门厅",
    structure: "Symmetric jazz-theatre booking page with marquee axis, table availability, program cards, bar notes, and gilded seating plan.",
    zhStructure: "对称爵士剧场预订页，包含跑马灯轴线、桌位状态、节目卡、酒吧说明和鎏金座位图。",
    typography: "Use elegant display headings, refined numerals, and short polished venue labels.",
    zhTypography: "使用优雅展示标题、精致数字和短而 polished 的场馆标签。",
    components: "Marquee frames, table rows, set-time labels, program strips, and ceremonial booking controls should align to the center axis.",
    zhComponents: "门厅框、桌位行、演出时间标签、节目条和仪式感预订控件应对齐中心轴。",
    buttons: "Use framed gold primary buttons and fine outline secondary actions.",
    zhButtons: "使用金色框线主按钮和细描边次操作。",
    media: "Use seating plans, stage labels, program cards, velvet textures, and bar menu notes.",
    zhMedia: "使用座位图、舞台标签、节目卡、天鹅绒质感和酒吧菜单说明。",
    states: "Show open, signed, first set, held, waitlist, and invitation states.",
    zhStates: "呈现 open、signed、first set、held、waitlist 和 invitation 状态。",
    avoid: "Do not scatter gold trim without information value.",
    zhAvoid: "不要撒没有信息价值的金色装饰。",
  },
  "23": {
    layout: "wabi-repair-studio",
    name: "Wabi Repair Studio",
    zhName: "侘寂修补工作室",
    structure: "Quiet ceramic repair table with object stage, process notes, drying ledger, care card, and grounded booking action.",
    zhStructure: "安静陶瓷修补台，包含对象台、过程说明、干燥账页、养护卡和踏实预约操作。",
    typography: "Use warm body text, small honest labels, and enough whitespace around each object.",
    zhTypography: "使用温暖正文、小而真实的标签，并给每个对象留足空白。",
    components: "Crack diagrams, clay bodies, cure timing, repair status, and care notes should feel handmade but aligned.",
    zhComponents: "裂纹图、陶土、固化时间、修补状态和养护说明要有手作感但保持对齐。",
    buttons: "Use quiet grounded buttons that become precise on focus or selected state.",
    zhButtons: "使用安静踏实的按钮，并在焦点或选中态变得明确。",
    media: "Use ceramic forms, repair seams, worktable marks, clay labels, and care cards.",
    zhMedia: "使用陶瓷形态、修补线、工作台痕迹、陶土标签和养护卡。",
    states: "Show drying, curing, ready, reserved, care needed, and repaired states.",
    zhStates: "呈现 drying、curing、ready、reserved、care needed 和 repaired 状态。",
    avoid: "Do not polish away the material irregularity.",
    zhAvoid: "不要把材质不规则感全部磨掉。",
  },
  "24": {
    layout: "ink-tea-scroll",
    name: "Ink Tea Scroll",
    zhName: "水墨茶山卷轴",
    structure: "Scroll-like tea origin page with ink landscape, lot ledger, tasting notes, provenance seal, and quiet commerce path.",
    zhStructure: "卷轴式茶源页，包含水墨山场、批次账页、品饮记录、出处印章和安静购买路径。",
    typography: "Use brush-like moments only for headings or seals; keep body copy disciplined and readable.",
    zhTypography: "书写感只用于标题或印章，正文保持克制可读。",
    components: "Origin notes, tea lots, tasting rows, seal states, and source strips should feel archival.",
    zhComponents: "产地说明、茶批次、品饮行、印章状态和来源条要有档案感。",
    buttons: "Primary actions can read like a seal; secondary actions should be text or rule-line controls.",
    zhButtons: "主操作可像印章，次操作应使用文字或规则线控件。",
    media: "Use paper, mist, ink fields, tea lot rows, red seals, and tasting notes.",
    zhMedia: "使用纸、雾、墨场、茶批次行、朱印和品饮记录。",
    states: "Show selected lot, saved note, source seal, archived, warning, and tasting open states.",
    zhStates: "呈现 selected lot、saved note、source seal、archived、warning 和 tasting open 状态。",
    avoid: "Do not use decorative cultural symbols without structure.",
    zhAvoid: "不要使用没有结构价值的文化装饰符号。",
  },
  "25": {
    layout: "blueprint-renovation",
    name: "Blueprint Renovation Sheet",
    zhName: "蓝图改造图纸",
    structure: "Home renovation plan sheet with room dimensions, furniture blocks, lighting runs, material callouts, and crew notes.",
    zhStructure: "家居改造图纸，包含房间尺寸、家具块、灯线、材料标注和施工说明。",
    typography: "Use compact technical labels, tabular dimensions, and clear sheet titles.",
    zhTypography: "使用紧凑技术标签、表格尺寸和清楚图纸标题。",
    components: "Dimension lines, room nodes, fixture labels, unresolved spans, export controls, and material notes should be measured.",
    zhComponents: "尺寸线、房间节点、灯具标签、未决跨度、导出控件和材料说明要有测量感。",
    buttons: "Use technical annotation controls with thin borders and clear focus.",
    zhButtons: "使用技术标注式控件，细边框且焦点清晰。",
    media: "Use room plans, section marks, furniture outlines, lighting routes, and material callouts.",
    zhMedia: "使用房间平面、剖面标记、家具轮廓、灯线路径和材料标注。",
    states: "Show measured, approved, revise, open note, blocked span, and exported states.",
    zhStates: "呈现 measured、approved、revise、open note、blocked span 和 exported 状态。",
    avoid: "Do not turn blueprint precision into generic sci-fi glow.",
    zhAvoid: "不要把蓝图精度做成通用科幻发光。",
  },
  "26": {
    layout: "industrial-print-room",
    name: "Industrial Print Room",
    zhName: "工业印刷工作室",
    structure: "Rugged print-studio control room with press matrix, ink batch table, drying rack, safety hold, cleanup log, and service evidence.",
    zhStructure: "耐用印刷工作室控制室，包含印刷机矩阵、油墨批次表、晾干架、安全暂停、清洁日志和维修证据。",
    typography: "Use rugged UI type, tabular machine values, short state names, and strong row scanning.",
    zhTypography: "使用耐用界面字体、表格式机器数值、短状态名和强行扫描。",
    components: "Press cards, ink rows, lockout notes, rack meters, service tags, and acknowledgement buttons should feel shop-floor ready.",
    zhComponents: "印刷机卡、油墨行、锁定说明、晾干架仪表、维修标签和确认按钮要适合车间使用。",
    buttons: "Use durable rectangular controls; warning and acknowledgement states must be unmistakable.",
    zhButtons: "使用耐用矩形控件；警告和确认态必须明确。",
    media: "Use press labels, ink batches, roller checks, drying racks, service logs, and safety notes.",
    zhMedia: "使用印刷机标签、油墨批次、滚筒检查、晾干架、维修日志和安全说明。",
    states: "Show hold, mixing, open, locked out, recovered, warning, and acknowledged states.",
    zhStates: "呈现 hold、mixing、open、locked out、recovered、warning 和 acknowledged 状态。",
    avoid: "Do not soften safety-critical craft operations into glossy consumer UI.",
    zhAvoid: "不要把安全关键的手作运营软化成亮面消费 UI。",
  },
};

function getStylePlaybook(style) {
  return redesignedStylePlaybooks[style.id] || stylePlaybooks[style.id] || stylePlaybooks["09"];
}

const geometryProfiles = {
  "01": { panel: "8px", control: "6px", chip: "4px", media: "8px", description: "real admin shell geometry with compact panels, dense rows, and precise controls" },
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
  "22": { panel: "2px", control: "2px", chip: "0", media: "0", description: "stepped Art Deco geometry with crisp framed surfaces" },
  "23": { panel: "6px", control: "3px", chip: "2px", media: "8px", description: "quiet handmade geometry with small irregular-feeling corners" },
  "24": { panel: "0", control: "0", chip: "0", media: "2px", description: "paper-and-rule geometry with seals and scroll-like edges" },
  "25": { panel: "4px", control: "2px", chip: "0", media: "4px", description: "technical plan-sheet geometry with measured low-radius panels" },
  "26": { panel: "2px", control: "0", chip: "0", media: "2px", description: "rugged industrial geometry with hard serviceable controls" },
};

function getGeometryProfile(style) {
  return geometryProfiles[style.id] || geometryProfiles["09"];
}

const implementationProfiles = {
  "01": {
    buttons: "Use compact blue primary buttons, quiet bordered secondary buttons, square icon tools, tab buttons, and stable loading buttons inside the top bar or table toolbar.",
    zhButtons: "使用紧凑蓝色主按钮、低调描边次按钮、方形图标工具、标签按钮，以及在顶栏或表格工具条内保持宽度稳定的加载按钮。",
    feedback: "Use selected sidebar states, active tabs, row-local warnings, small status toasts, empty table states, pending chips, and disabled tools in the same admin language.",
    zhFeedback: "用同一套后台语言呈现侧栏选中、激活标签、行内警告、小型状态 toast、空表格、待处理标签和禁用工具。",
    spacing: "Use a 220-260px sidebar, 56-72px top bar, 16-20px workspace gutters, 14-18px panel padding, 8-12px row gaps, and 40-44px controls for repeated scanning.",
    zhSpacing: "侧栏 220-260px，顶栏 56-72px，工作区留白 16-20px，面板内边距 14-18px，行间距 8-12px，控件 40-44px，适合反复扫描。",
    responsive: "Desktop keeps sidebar, top bar, KPI row, chart/ranking panels, and table visible; tablet collapses right panels below; mobile turns sidebar into a horizontal module strip and makes tables horizontally scrollable.",
    zhResponsive: "桌面保留侧栏、顶栏、指标行、图表/排行面板和表格；平板把右侧面板下移；手机把侧栏变成横向模块条，并让表格可横向滚动。",
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
  "22": {
    buttons: "Use framed gold primary buttons, fine outline secondary buttons, centered labels, and pressed states that feel like a mechanical latch.",
    zhButtons: "使用金色框线主按钮、细描边次按钮、居中标签，以及像机械扣件一样明确的按下态。",
    feedback: "Use polished labels, reserved alert strips, invitation confirmations, and availability states aligned to the poster axis.",
    zhFeedback: "使用精致标签、克制提示条、邀请确认和沿海报轴线对齐的可用状态。",
    spacing: "Use 24-34px ceremonial panels, tight 8-12px label gaps, and generous space around the headline and reservation action.",
    zhSpacing: "仪式化面板内边距 24-34px，标签间距 8-12px，标题和预订操作周围保留充足空间。",
    responsive: "Desktop can use symmetry and side proof panels; mobile keeps the monogram, headline, primary action, availability, then room details in one centered stack.",
    zhResponsive: "桌面可使用对称和侧边证明面板；手机按字标、标题、主操作、可用性、房间详情的顺序居中堆叠。",
  },
  "23": {
    buttons: "Use quiet text or low-fill buttons with visible focus, modest hover, and selected states that feel gently pressed into paper.",
    zhButtons: "使用安静文字或低填充按钮，保留可见焦点、克制 hover，并让选中态像轻轻压入纸面。",
    feedback: "Use small inline notes, care labels, reserved marks, and calm confirmations near the affected object.",
    zhFeedback: "在对象附近使用小型内联说明、养护标签、预留标记和平静确认。",
    spacing: "Use 28-44px quiet gutters, uneven but intentional object spacing, and 14-18px readable caption gaps.",
    zhSpacing: "安静留白 28-44px，对象间距可不完全均匀但要有意图，图注间距 14-18px。",
    responsive: "Desktop may place one object stage beside notes; mobile shows object, material caption, availability, then action without crowding.",
    zhResponsive: "桌面可让对象舞台和说明并列；手机按对象、材质图注、可用状态、操作顺序呈现，避免拥挤。",
  },
  "24": {
    buttons: "Use seal-like primary actions, underlined text actions, and square focus states that preserve the paper rhythm.",
    zhButtons: "使用印章式主操作、下划线文字操作，以及保持纸面节奏的方形焦点态。",
    feedback: "Use red seal confirmations, margin notes, rule-separated warnings, and source-open indicators.",
    zhFeedback: "使用朱红印章确认、边注、规则线分隔警告和来源打开指示。",
    spacing: "Use wide paper margins, strict vertical rhythm, thin rule lines, and generous caption spacing.",
    zhSpacing: "使用宽纸面边距、严格纵向节奏、细规则线和充足图注间距。",
    responsive: "Desktop can keep metadata, lead story, and index columns; mobile preserves scroll order with seal action after the title and source notes after the content.",
    zhResponsive: "桌面可保留元信息、主叙事和索引列；手机保持卷轴阅读顺序，标题后放印章操作，内容后放来源说明。",
  },
  "25": {
    buttons: "Use compact command buttons, coordinate chips, thin measured borders, and active states that look selected on a drawing sheet.",
    zhButtons: "使用紧凑命令按钮、坐标 chip、细测量边框，以及像图纸中选中对象的 active 状态。",
    feedback: "Use callout notes, dimension-line warnings, export confirmations, and blocked-span labels tied to exact nodes.",
    zhFeedback: "使用标注说明、尺寸线警告、导出确认和绑定到具体节点的阻塞跨度标签。",
    spacing: "Use 16-24px sheet panels, 8-12px annotation gaps, thin grid lines, and dense but aligned metric rows.",
    zhSpacing: "图纸面板 16-24px，标注间距 8-12px，细网格线，指标密集但对齐。",
    responsive: "Desktop keeps the sheet, annotations, and trace list visible; mobile shows plan summary, primary action, graph, then unresolved spans.",
    zhResponsive: "桌面保留图纸、标注和追踪列表；手机先显示计划摘要和主操作，再显示图和未解决跨度。",
  },
  "26": {
    buttons: "Use hard rectangular controls, explicit acknowledgement buttons, safety-color destructive states, and disabled states that look locked out.",
    zhButtons: "使用硬朗矩形控件、明确确认按钮、安全色危险态，以及像 lockout 的禁用态。",
    feedback: "Use alarm banners, row-local warnings, service-log confirmations, and recovery actions attached to the affected machine.",
    zhFeedback: "使用告警 banner、行内警告、维修日志确认，以及绑定到受影响机器的恢复操作。",
    spacing: "Use 16-22px rugged panels, 8-10px dense status rows, 44-52px control heights, and compact filter rails.",
    zhSpacing: "耐用面板 16-22px，密集状态行 8-10px，控件高度 44-52px，筛选栏紧凑。",
    responsive: "Desktop keeps filters, alarms, metrics, and inspector visible; mobile shows alarm summary, acknowledge action, filters, then service detail.",
    zhResponsive: "桌面保留筛选、告警、指标和检查面板；手机先显示告警摘要和确认操作，再显示筛选和维修详情。",
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
    landing: "Use only when the public page needs to show an actual admin product screenshot; the screenshot should still include sidebar, top bar, tables, filters, and widgets.",
    dashboard: "Use a real app shell with white sidebar, top search, page tabs, KPI row, quick entries, chart cards, ranking lists, approval panes, and calendar widgets.",
    admin: "Use compact tables, toolbar filters, date ranges, bulk actions, column settings, row-level status, empty states, permission controls, and detail drawers.",
    forms: "Use visible labels, compact helper text, grouped sections, inline validation, table-adjacent editing, permission warnings, and save/cancel toolbars.",
    mobile: "Turn sidebar navigation into a horizontal module strip, keep the page title and primary action near the top, stack widgets, and make dense tables scroll horizontally.",
    unsuitable: "Weak for expressive fashion, immersive art, or pages that need emotional hero storytelling instead of management clarity.",
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
  "22": {
    landing: "Use a symmetrical event or venue poster with gilded proof, availability, refined offer copy, and one ceremonial booking action.",
    dashboard: "Use sparingly for concierge, venue, or premium booking dashboards where room status and appointments are the main objects.",
    admin: "Use for curated hospitality/event operations only; keep tables simplified and avoid ornamental bulk-action clutter.",
    forms: "Use short reservation forms, visible labels, elegant validation, and framed confirmation states.",
    mobile: "Order as monogram, offer, primary booking action, availability, room proof, then secondary story.",
    unsuitable: "Weak for dense operational tools, casual consumer apps, and utilitarian admin pages.",
  },
  "23": {
    landing: "Use one material object, generous space, process notes, human copy, and a slow primary action after proof.",
    dashboard: "Use for studio inventory, wellness progress, or small collections where low density and material context matter.",
    admin: "Use only for calm curation or catalog management; avoid high-volume tables and urgent batch operations.",
    forms: "Use few fields, grounded labels, quiet helper text, and validation that stays close to the field.",
    mobile: "Show object, caption, status, care/process note, then action; preserve whitespace instead of squeezing more modules in.",
    unsuitable: "Weak for urgent alerts, high-density analytics, loud campaigns, or glossy tech launches.",
  },
  "24": {
    landing: "Use a scroll-like editorial sequence with origin, source notes, product proof, and seal-like primary action.",
    dashboard: "Use only for cultural archives, catalog review, or editorial systems where index rows and provenance matter.",
    admin: "Use for museum, publishing, or cultural ecommerce back offices with careful metadata, not generic CRUD shells.",
    forms: "Use persistent labels, margin notes, rule-line validation, and a red seal only for decisive states.",
    mobile: "Preserve reading order as scroll sections: title, seal action, story, proof, index, source notes.",
    unsuitable: "Weak for modern SaaS metrics, playful apps, or pages that need heavy chart density.",
  },
  "25": {
    landing: "Use a technical plan sheet with dependency graph, annotations, export action, and engineering proof.",
    dashboard: "Use grid, nodes, callouts, trace rows, unresolved spans, and plan readiness metrics.",
    admin: "Use for infrastructure, API, architecture, and planning tools where diagrams and review gates are central.",
    forms: "Use compact labels, coordinate-like grouping, exact validation, and export/review confirmations.",
    mobile: "Show summary and action first, then graph, unresolved spans, annotations, and export details.",
    unsuitable: "Weak for soft lifestyle, emotional storytelling, and image-led luxury pages.",
  },
  "26": {
    landing: "Use a rugged operations story only when the public page is about equipment, reliability, service, or safety proof.",
    dashboard: "Use alarms, filters, threshold metrics, service queues, ownership chips, and row-local recovery actions.",
    admin: "Use for operations consoles, hardware fleets, logistics control, safety checks, and service management.",
    forms: "Use clear labels, hard field borders, machine IDs, explicit validation, and locked/destructive confirmations.",
    mobile: "Show alarm summary, acknowledge action, active filters, alarm list, and service detail in that order.",
    unsuitable: "Weak for luxury editorial, calm wellness, playful education, or long-form reading.",
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
    "22": [78, 92, 64, 86, 58, 94, 72],
    "23": [44, 56, 38, 62, 48, 52, 40],
    "24": [72, 46, 64, 38, 82, 54, 68],
    "25": [82, 64, 94, 58, 76, 88, 70],
    "26": [96, 72, 84, 66, 92, 58, 78],
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
    case "aurora-listening-room": {
      const sessionRail = scenario.queue.map(([title, state], index) => `<button type="button" class="${index === 1 ? "selected" : ""}" data-open-modal><span>${String(index + 1).padStart(2, "0")}</span><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></button>`).join("");
      const roomStats = scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("");
      const notes = scenario.features.map(([title, body]) => `<article><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("");
      const resonanceBands = [["19:30", "Blue hush", "Entry"], ["20:10", "Rain pulse", "Active"], ["21:00", "Low gold", "Reset"], ["21:45", "North fade", "Private"]]
        .map(([time, title, state], index) => `<span class="band-${index + 1}"><b>${escapeHtml(time)}</b>${escapeHtml(title)}<em>${escapeHtml(state)}</em></span>`).join("");
      const roomZones = [["A", "Dusk room", "32 seats"], ["B", "Rain chamber", "10 seats"], ["C", "North alcove", "Private"], ["D", "Quiet exit", "Hosted"]]
        .map(([id, title, state]) => `<span><b>${escapeHtml(id)}</b><strong>${escapeHtml(title)}</strong><em>${escapeHtml(state)}</em></span>`).join("");
      return `<section class="life-aurora" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <main class="aurora-room-field">
          <div class="light-ribbons" aria-hidden="true"><span></span><span></span><span></span></div>
          <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="aurora-session-stats">${roomStats}</div>
          <div class="resonance-board" aria-hidden="true">${resonanceBands}</div>
          <div class="room-map" aria-hidden="true"><i>A1</i><i>B2</i><i>C3</i><b>Sound field</b></div>
        </main>
        <aside class="aurora-booking">
          <h3>Tonight's rooms</h3>
          <div class="session-rail">${sessionRail}</div>
          <div class="room-zone-list">${roomZones}</div>
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
          <button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
        </aside>
        <div class="aurora-notes">${notes}</div>
      </section>`;
    }
    case "stark-photo-contact": {
      const frameLabels = ["Window rain", "Neon corner", "Market stair", "Late tram", "Studio door", "Selected print", "Archive wall", "Ticket booth", "Cafe glass", "Night queue", "Poster wall", "Exit glow"];
      const frames = frameLabels.map((label, index) => `<button type="button" class="${index === 5 ? "selected" : ""}" data-open-modal><i></i><span>${String(index + 1).padStart(2, "0")}</span><b>${escapeHtml(label)}</b><em>${index === 5 ? "Marked" : "Proof"}</em></button>`).join("");
      const printRows = scenario.queue.map(([title, state]) => `<span><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></span>`).join("");
      const noteRows = scenario.features.map(([title, body]) => `<article><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("");
      const exifRows = [["Lens", "50mm"], ["Paper", "Fiber Gloss"], ["Crop", "4:5"], ["Tone", "Selenium"]].map(([label, value]) => `<span><b>${escapeHtml(label)}</b>${escapeHtml(value)}</span>`).join("");
      const negativeStrip = ["12A", "12B", "12C", "13A", "13B", "14A"].map((item, index) => `<span class="${index === 2 ? "active" : ""}">${escapeHtml(item)}</span>`).join("");
      return `<section class="life-stark-contact" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <aside class="contact-title">
          <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="exif-grid">${exifRows}</div>
          <button type="button" class="text-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
        </aside>
        <main class="photo-review-desk">
          <div class="hero-print" aria-hidden="true"><span class="print-sky"></span><span class="print-stair"></span><span class="print-caption">Selected print / 06</span></div>
          <div class="negative-strip" aria-hidden="true">${negativeStrip}</div>
          <div class="contact-sheet">${frames}</div>
        </main>
        <aside class="print-ledger">
          <h3>Print ledger</h3>
          <div class="print-metrics">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div>
          <div class="print-rows">${printRows}</div>
          <button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
        </aside>
        <div class="darkroom-notes">${noteRows}</div>
      </section>`;
    }
    case "minimal-print-ledger": {
      const jobRows = [
        ["Paper", "Munken Pure 150gsm", scenario.metrics[0][0]],
        ["Ink pass", "Blue plus Fluoro Orange", scenario.metrics[1][0]],
        ["Pickup", "Shelf B / front desk", scenario.metrics[2][0]],
      ].map(([labelText, value, meta]) => `<span><b>${escapeHtml(labelText)}</b><strong>${escapeHtml(value)}</strong><em>${escapeHtml(meta)}</em></span>`).join("");
      const queueRows = scenario.queue.map(([title, state], index) => `<button type="button" data-open-modal><code>${String(index + 1).padStart(2, "0")}</code><span>${escapeHtml(title)}</span><em>${escapeHtml(state)}</em></button>`).join("");
      const proofStrip = [
        ["Plate A", "Blue pass"],
        ["Plate B", "Fluoro orange"],
        ["Dry rack", "18 min"],
        ["Pickup", "Shelf B"],
      ].map(([title, detail]) => `<span><b>${escapeHtml(title)}</b><em>${escapeHtml(detail)}</em></span>`).join("");
      const dryRack = Array.from({ length: 18 }, (_, index) => `<span class="${index % 5 === 0 ? "checked" : ""}">${String(index + 1).padStart(2, "0")}</span>`).join("");
      const inkMix = [["Blue", "68%"], ["Fluoro", "22%"], ["Binder", "10%"]].map(([label, value]) => `<span><b>${escapeHtml(label)}</b><i style="width:${escapeHtml(value)}"></i><em>${escapeHtml(value)}</em></span>`).join("");
      return `<section class="life-print-ledger" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <header class="ledger-header">
          <div><p class="kicker">${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1></div>
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
        </header>
        <main class="ledger-sheet">
          <div class="docket-number">RL-09</div>
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="job-ledger">${jobRows}</div>
          <div class="proof-strip">${proofStrip}</div>
          <div class="print-production-grid"><div class="dry-rack">${dryRack}</div><div class="ink-mix">${inkMix}</div></div>
        </main>
        <aside class="pickup-rail">
          <h3>Studio queue</h3>
          ${queueRows}
          <button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
        </aside>
      </section>`;
    }
    case "dark-cinema-review": {
      const programRows = scenario.queue.map(([title, state], index) => `<button type="button" data-open-modal><span>${String(index + 1).padStart(2, "0")}</span><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></button>`).join("");
      const seats = Array.from({ length: 24 }, (_, index) => {
        const row = String.fromCharCode(65 + Math.floor(index / 12));
        const seat = `${row}${(index % 12) + 1}`;
        return `<span class="${[5, 8, 13, 19].includes(index) ? "held" : ""}">${escapeHtml(seat)}</span>`;
      }).join("");
      const cueSheet = [["19:45", "Doors"], ["20:05", "Short reel"], ["20:18", "Feature"], ["21:52", "Q&A"]].map(([time, label]) => `<span><b>${escapeHtml(time)}</b>${escapeHtml(label)}</span>`).join("");
      const reelFrames = ["Opening", "Intermission", "Feature", "Credits"].map((label, index) => `<span class="reel-${index + 1}">${escapeHtml(label)}</span>`).join("");
      return `<section class="life-cinema" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <main class="cinema-screen">
          <div class="screen-frame" aria-hidden="true"><span class="screen-glow"></span><span class="screen-caption">Act II / 21:10</span><b>Velvet Screen</b><i>Subtitles checked</i><div class="reel-frames">${reelFrames}</div></div>
          <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="cinema-metrics">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div>
        </main>
        <aside class="cinema-program">
          <h3>Program board</h3>
          <div class="cue-sheet">${cueSheet}</div>
          <div class="program-rows">${programRows}</div>
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
          <button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
        </aside>
        <div class="seat-map" aria-label="Seat availability">${seats}</div>
      </section>`;
    }
    case "line-museum-plan": {
      const stops = scenario.queue.map(([title, state], index) => `<article class="stop-${index + 1}"><span>${String(index + 1).padStart(2, "0")}</span><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></article>`).join("");
      const planZones = ["West gallery", "Light court", "Archive wall", "Audio bench"].map((label, index) => `<span class="zone-${index + 1}">${escapeHtml(label)}</span>`).join("");
      const labelRows = scenario.features.map(([title], index) => `<span><b>Label ${index + 1}</b>${escapeHtml(title)}</span>`).join("");
      const wallLabels = [["A-01", "Entrance wall"], ["A-02", "Quiet bench"], ["B-01", "Audio alcove"], ["C-04", "Exit proof"]]
        .map(([code, label]) => `<span><b>${escapeHtml(code)}</b>${escapeHtml(label)}</span>`).join("");
      return `<section class="life-museum-plan" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <header class="museum-heading"><div><p class="kicker">${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1></div><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button></header>
        <main class="floor-plan">
          <div class="gallery-rooms" aria-hidden="true"><span class="room-a">Gallery A</span><span class="room-b">Gallery B</span><span class="room-c">Listening room</span><span class="room-d">Archive</span></div>
          <div class="plan-route" aria-hidden="true"><i></i><i></i><i></i></div>
          <div class="plan-zones" aria-hidden="true">${planZones}</div>
          ${stops}
          <div class="wall-label-strip">${wallLabels}</div>
        </main>
        <aside class="museum-guide">
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="museum-metrics">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div>
          <div class="label-list">${labelRows}</div>
          <button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
        </aside>
      </section>`;
    }
    case "layered-interior-samples": {
      const swatches = ["Oak veneer", "Linen weave", "Limewash", "Travertine", "Brass pull", "Wool loop"].map((item, index) => `<button type="button" class="sample-${index + 1}" data-open-modal>${escapeHtml(item)}</button>`).join("");
      const supplierRows = scenario.queue.map(([title, state]) => `<span><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></span>`).join("");
      const specRows = scenario.features.map(([title, body]) => `<article><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("");
      const roomPlacement = [["Wall", "Limewash"], ["Floor", "Oak"], ["Seat", "Linen"], ["Counter", "Travertine"]]
        .map(([zone, material]) => `<span><b>${escapeHtml(zone)}</b>${escapeHtml(material)}</span>`).join("");
      return `<section class="life-interior-samples" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <header class="sample-heading"><div><p class="kicker">${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1></div><div class="sample-actions"><button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button></div></header>
        <main class="material-board">
          <div class="stacked-samples" aria-hidden="true"><span>Oak veneer</span><span>Linen weave</span><span>Limewash paint</span><b>Board A</b></div>
          <div class="room-placement" aria-hidden="true"><div class="room-elevation"><i></i><i></i><i></i><b>Living wall</b></div><div class="placement-rows">${roomPlacement}</div></div>
          <div class="swatch-lanes">${swatches}</div>
        </main>
        <aside class="sample-approval">
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="sample-metrics">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div>
          <div class="supplier-rows">${supplierRows}</div>
        </aside>
        <div class="room-specs">${specRows}</div>
      </section>`;
    }
    case "bento-market-table": {
      const timeline = scenario.queue.map(([title, state]) => `<span><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></span>`).join("");
      const courseStack = [["01", "Tomato broth"], ["02", "Grilled peach"], ["03", "Market greens"], ["04", "Buckwheat tart"]]
        .map(([number, name]) => `<span><b>${escapeHtml(number)}</b>${escapeHtml(name)}</span>`).join("");
      const producerRows = [["Mira Farm", "Tomatoes"], ["South Mill", "Buckwheat"], ["Blue Shed", "Herbs"]]
        .map(([producer, item]) => `<span><b>${escapeHtml(producer)}</b>${escapeHtml(item)}</span>`).join("");
      const crateGrid = ["Basil", "Peach", "Tomato", "Bread", "Honey", "Cress"].map((item) => `<span>${escapeHtml(item)}</span>`).join("");
      return `<section class="life-bento-market" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <article class="market-tile menu-hero"><p class="kicker">${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1><p>${escapeHtml(scenario.lede)}</p><div class="course-stack">${courseStack}</div><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button></article>
        <article class="market-tile course-tile"><span>Lead course</span><b>Tomato broth, basil oil, grilled bread</b><div class="plate-sketch" aria-hidden="true"><i></i><i></i><i></i></div></article>
        <article class="market-tile producer-tile"><span>Market run</span><strong>${escapeHtml(scenario.metrics[2][0])}</strong><p>Crates arrive before prep.</p><div class="producer-rows">${producerRows}</div></article>
        <article class="market-tile table-tile"><strong>${escapeHtml(scenario.metrics[1][0])}</strong><span>${escapeHtml(scenario.metrics[1][1])}</span><button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button></article>
        <article class="market-tile quote-tile"><b>"Let the menu feel like the morning market."</b><span>Chef note</span></article>
        <article class="market-tile service-tile">${timeline}</article>
        <article class="market-tile ingredient-tile"><div class="crate-grid">${crateGrid}</div>${scenario.features.map(([title]) => `<span>${escapeHtml(title)}</span>`).join("")}</article>
      </section>`;
    }
    case "neumo-lamp-console": {
      const scenePads = scenario.queue.map(([title, state]) => `<button type="button" data-open-modal><b>${escapeHtml(title)}</b><span>${escapeHtml(state)}</span></button>`).join("");
      const routineStrip = [["20:15", "Reading"], ["20:45", "Rain low"], ["21:10", "Dim shelf"]].map(([time, label]) => `<span><b>${escapeHtml(time)}</b>${escapeHtml(label)}</span>`).join("");
      return `<section class="life-lamp-console" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <article class="lamp-copy">
          <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
          <button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
        </article>
        <main class="lamp-dial-panel">
          <div class="lamp-shelf" aria-hidden="true"><span class="shade"></span><span class="light-pool"></span><span class="book-stack"></span><span class="plant-dot"></span><b>Evening shelf</b></div>
          <div class="lamp-dial"><strong>${escapeHtml(scenario.metrics[0][0])}</strong><span>${escapeHtml(scenario.metrics[0][1])}</span></div>
          <div class="timer-well"><b>${escapeHtml(scenario.metrics[1][0])}</b><span>${escapeHtml(scenario.metrics[1][1])}</span></div>
          <div class="wave-well" aria-hidden="true"><b>Ambient track</b><span>Rain bed at 34%</span><div class="mini-wave">${renderBars(style.id)}</div></div>
        </main>
        <aside class="scene-pads"><h3>Scene pads</h3>${scenePads}<div class="routine-strip">${routineStrip}</div><div class="pad-count"><strong>${escapeHtml(scenario.metrics[2][0])}</strong>${escapeHtml(scenario.metrics[2][1])}</div></aside>
      </section>`;
    }
    case "glass-greenhouse": {
      const waterRows = scenario.queue.map(([title, state]) => `<button type="button" data-open-modal><b>${escapeHtml(title)}</b><span>${escapeHtml(state)}</span></button>`).join("");
      const zoneLabels = [
        ["Fern bank", "74% RH"],
        ["Orchid shelf", "22 C"],
        ["Mist line", "08:40"],
      ].map(([title, value], index) => `<span class="zone-${index + 1}"><b>${escapeHtml(title)}</b><em>${escapeHtml(value)}</em></span>`).join("");
      const plantBeds = [["Fern bed", "Stable"], ["Orchid shelf", "Mist due"], ["Moss table", "Low light"], ["Public path", "Open"]]
        .map(([title, state], index) => `<span class="bed-${index + 1}"><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></span>`).join("");
      const sensorChart = [["Humidity", "74%"], ["Leaf temp", "18C"], ["Water flow", "06 zones"]]
        .map(([label, value]) => `<span><b>${escapeHtml(label)}</b><i></i><em>${escapeHtml(value)}</em></span>`).join("");
      return `<section class="life-glasshouse" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <main class="greenhouse-map">
          <div class="canopy-lines" aria-hidden="true"><span></span><span></span><span></span></div>
          <div class="climate-pins" aria-hidden="true"><i></i><i></i><i></i></div>
          <div class="zone-labels" aria-hidden="true">${zoneLabels}</div>
          <div class="plant-bed-map" aria-hidden="true">${plantBeds}</div>
          <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
        </main>
        <aside class="climate-pane">
          <div class="climate-metrics">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div>
          <div class="sensor-chart">${sensorChart}</div>
          <div class="water-rows">${waterRows}</div>
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
          <button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
        </aside>
        <div class="plant-notes">${scenario.features.map(([title, body]) => `<article><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("")}</div>
      </section>`;
    }
    case "gradient-festival-wall": {
      const posters = scenario.features.map(([title, body], index) => `<article class="poster-${index + 1}"><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("");
      const schedule = scenario.queue.map(([title, state]) => `<button type="button" data-open-modal><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></button>`).join("");
      const miniPosters = [["Main stage", "7:30 PM"], ["Workshop", "Sat 11"], ["Afterparty", "Hall B"]].map(([title, time]) => `<span><b>${escapeHtml(title)}</b><em>${escapeHtml(time)}</em></span>`).join("");
      const stageMap = [["Stage A", "Live"], ["Food lane", "Mapped"], ["Print booth", "Ready"], ["Volunteer tent", "Needs lead"]]
        .map(([title, state], index) => `<span class="stage-${index + 1}"><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></span>`).join("");
      const volunteerCards = [["Gate", "4/6"], ["Cleanup", "2/5"], ["Merch", "Ready"]].map(([title, value]) => `<span><b>${escapeHtml(title)}</b>${escapeHtml(value)}</span>`).join("");
      return `<section class="life-festival-wall" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <header class="festival-heading"><div><p class="kicker">${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1></div><div class="festival-mini-posters" aria-hidden="true">${miniPosters}</div><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button></header>
        <main class="poster-wall"><article class="festival-lead"><b>${escapeHtml(scenario.brand)}</b><p>${escapeHtml(scenario.lede)}</p><div class="stage-map">${stageMap}</div></article>${posters}<article class="volunteer-board"><b>Volunteer board</b><div>${volunteerCards}</div></article></main>
        <aside class="festival-rail">
          <div class="festival-metrics">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div>
          <div class="stage-schedule">${schedule}</div>
          <button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
        </aside>
      </section>`;
    }
    case "soft-garden-class": {
      const steps = scenario.queue.map(([title, state], index) => `<button type="button" data-open-modal><span>${index + 1}</span><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></button>`).join("");
      const notes = scenario.features.map(([title, body]) => `<article><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("");
      const gardenBeds = [["Herbs", "Mint + basil"], ["Greens", "Lettuce row"], ["Flowers", "Pollinator mix"], ["Notes", "Water at dusk"]].map(([title, body]) => `<span><b>${escapeHtml(title)}</b><em>${escapeHtml(body)}</em></span>`).join("");
      const seedTray = ["Basil", "Kale", "Tomato", "Dill", "Pea", "Cosmos", "Mint", "Sage"].map((seed, index) => `<span class="${index < 3 ? "sprout" : ""}">${escapeHtml(seed)}</span>`).join("");
      const classPath = [["Gather", "09:00"], ["Plant", "09:20"], ["Water", "09:45"], ["Share", "10:10"]].map(([label, time]) => `<span><b>${escapeHtml(label)}</b>${escapeHtml(time)}</span>`).join("");
      return `<section class="life-garden-class" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <aside class="garden-plan"><div class="bed-grid">${gardenBeds}</div><div class="seed-tray">${seedTray}</div><div class="garden-metrics">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div></aside>
        <main class="garden-lesson"><p class="kicker">${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1><p>${escapeHtml(scenario.lede)}</p><div class="class-path">${classPath}</div><div class="lesson-steps">${steps}</div><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button></main>
        <aside class="seed-notes"><h3>Seed notes</h3>${notes}<button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button></aside>
      </section>`;
    }
    case "deco-theater-foyer": {
      const tableRows = scenario.queue.map(([title, state], index) => `<span><b>${String(index + 1).padStart(2, "0")}</b>${escapeHtml(title)}<em>${escapeHtml(state)}</em></span>`).join("");
      const seatingPlan = Array.from({ length: 16 }, (_, index) => `<span class="${[2, 5, 10].includes(index) ? "open" : ""}">${String(index + 1).padStart(2, "0")}</span>`).join("");
      const barMenu = [["Velvet tart", "$12"], ["Citrus coupe", "$15"], ["Coffee tonic", "$9"]].map(([item, price]) => `<span><b>${escapeHtml(item)}</b>${escapeHtml(price)}</span>`).join("");
      return `<section class="life-deco-theater" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <aside class="theater-wing"><h3>Program</h3>${scenario.features.map(([title]) => `<span>${escapeHtml(title)}</span>`).join("")}<div class="bar-menu">${barMenu}</div></aside>
        <main class="theater-marquee">
          <div class="marquee-mark">${escapeHtml(style.id)}</div>
          <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="deco-seating-plan" aria-hidden="true">${seatingPlan}</div>
          <div class="theater-metrics">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div>
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
        </main>
        <aside class="table-ledger"><h3>Tables</h3>${tableRows}<button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button></aside>
      </section>`;
    }
    case "wabi-repair-studio": {
      const repairRows = scenario.queue.map(([title, state]) => `<span><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></span>`).join("");
      const clayBodies = [["Porcelain", "hairline"], ["Stoneware", "rim chip"], ["Earthenware", "seal test"]].map(([body, state]) => `<span><b>${escapeHtml(body)}</b>${escapeHtml(state)}</span>`).join("");
      const worktable = [["Intake", "Tea bowl"], ["Seam", "Gold cure"], ["Care", "Soft cloth"], ["Pickup", "12 days"]].map(([label, value]) => `<span><b>${escapeHtml(label)}</b>${escapeHtml(value)}</span>`).join("");
      return `<section class="life-wabi-repair" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <article class="repair-copy"><p class="kicker">${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1><p>${escapeHtml(scenario.lede)}</p><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button></article>
        <main class="repair-table"><div class="ceramic-form" aria-hidden="true"><span></span><i></i><b>Gold seam</b></div><div class="clay-body-grid">${clayBodies}</div><div class="repair-metrics">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div></main>
        <aside class="repair-ledger"><h3>Process</h3><div class="repair-rows">${repairRows}</div><div class="worktable-notes">${worktable}</div>${scenario.features.map(([title, body]) => `<article><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("")}<button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button></aside>
      </section>`;
    }
    case "ink-tea-scroll": {
      const lotRows = scenario.queue.map(([title, state], index) => `<span><b>${String(index + 1).padStart(2, "0")}</b>${escapeHtml(title)}<em>${escapeHtml(state)}</em></span>`).join("");
      const tastingWheel = [["Aroma", "orchid"], ["Body", "silk"], ["Finish", "mineral"], ["Roast", "light"]].map(([label, value]) => `<span><b>${escapeHtml(label)}</b>${escapeHtml(value)}</span>`).join("");
      const ridgeLots = [["MV-01", "High ridge"], ["MV-04", "Selected"], ["MV-07", "Rain hold"]].map(([code, label]) => `<span><b>${escapeHtml(code)}</b>${escapeHtml(label)}</span>`).join("");
      return `<section class="life-ink-tea" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <main class="tea-scroll">
          <div class="red-seal">${escapeHtml(style.id)}</div>
          <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="ink-mountain" aria-hidden="true"><span></span><span></span><i></i></div>
          <div class="ridge-lots" aria-hidden="true">${ridgeLots}</div>
          <button type="button" class="primary-action seal-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
        </main>
        <aside class="tea-origin-ledger"><h3>Origin lots</h3><div class="tea-metrics">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div><div class="tasting-wheel">${tastingWheel}</div><div class="tea-lots">${lotRows}</div><button type="button" class="text-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button></aside>
        <div class="tasting-notes">${scenario.features.map(([title, body]) => `<article><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("")}</div>
      </section>`;
    }
    case "blueprint-renovation": {
      const callouts = scenario.queue.map(([title, state], index) => `<span class="callout-${index + 1}"><b>${String.fromCharCode(65 + index)}</b>${escapeHtml(title)}<em>${escapeHtml(state)}</em></span>`).join("");
      const fixtureLabels = [["fix-1", "Kitchen wall"], ["fix-2", "Reading nook"], ["fix-3", "Storage run"], ["fix-4", "Entry bench"]].map(([className, label]) => `<span class="${escapeHtml(className)}">${escapeHtml(label)}</span>`).join("");
      const materialRows = [["Oak rail", "12m"], ["Tile", "8 boxes"], ["Pendant", "3 drops"], ["Paint", "warm white"]].map(([item, qty]) => `<span><b>${escapeHtml(item)}</b>${escapeHtml(qty)}</span>`).join("");
      return `<section class="life-renovation-plan" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <header class="renovation-header"><div><p class="kicker">${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1></div><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button></header>
        <main class="loft-plan"><div class="room-outline" aria-hidden="true"><span></span><span></span><span></span></div><div class="lighting-run" aria-hidden="true"><i></i><i></i><i></i></div><div class="fixture-labels" aria-hidden="true">${fixtureLabels}</div>${callouts}<div class="dimension-tape">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div></main>
        <aside class="crew-notes"><p>${escapeHtml(scenario.lede)}</p><div class="material-schedule">${materialRows}</div>${scenario.features.map(([title, body]) => `<article><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("")}<button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button></aside>
      </section>`;
    }
    case "industrial-print-room": {
      const pressCards = [
        ["A", "Proof press", "Running", "84%", "84%", ["Plate 04 aligned", "Ink key stable", "Pull test ready"]],
        ["B", "Letterpress", scenario.queue[0][1], "Hold", "38%", ["Roller height check", "Safety guard open", "Operator note added"]],
        ["C", "Ink station", scenario.queue[1][1], "Mix", "68%", ["Cyan batch 12", "Viscosity logged", "Swatch card pending"]],
        ["D", "Dry rack", scenario.metrics[2][0], "Load", "91%", ["Top rack full", "Lower rack curing", "Pickup lane clear"]],
      ].map(([id, title, state, load, fill, tasks], index) => `<button type="button" class="press-${index + 1}" style="--load:${escapeHtml(fill)}" data-open-modal><span class="press-card-top"><span>PR-${escapeHtml(id)}</span><em>${escapeHtml(state)}</em></span><b>${escapeHtml(title)}</b><div class="press-gauge"><i></i><strong>${escapeHtml(load)}</strong></div><ul class="press-tasks">${tasks.map((task) => `<li>${escapeHtml(task)}</li>`).join("")}</ul></button>`).join("");
      const serviceRows = scenario.features.map(([title, body]) => `<article><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("");
      const inkRows = [["Cyan", "Mixing", "68%"], ["Black", "Ready", "91%"], ["Warm red", "Hold", "24%"]].map(([ink, state, load]) => `<span><b>${escapeHtml(ink)}</b><em>${escapeHtml(state)}</em><i>${escapeHtml(load)}</i></span>`).join("");
      const rackCells = Array.from({ length: 20 }, (_, index) => `<span class="${index < 14 ? "loaded" : ""}"></span>`).join("");
      return `<section class="life-print-room" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <header class="press-header"><div><p class="kicker">${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1></div><div class="press-metrics">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div></header>
        <main class="press-matrix">${pressCards}<div class="dry-rack-meter">${rackCells}</div><div class="ink-batch-table">${inkRows}</div></main>
        <aside class="ink-service"><h3>Service evidence</h3><div class="alarm-strip">${scenario.queue.map(([title, state]) => `<span><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></span>`).join("")}</div>${serviceRows}<button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button><button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button></aside>
      </section>`;
    }
    case "admin-console": {
      const sidebarGroups = [
        ["Console", ["Dashboard", "Task Log", "Usage Log"]],
        ["Operations", ["Customers", "Procurement", "Products", "Workflows", "Approvals"]],
        ["System", ["Reports", "Monitoring", "Access Control", "Settings"]],
      ];
      const kpis = [
        ["$482K", "Pipeline value", "+8.6%"],
        ["1,284", "Customer records", "+42"],
        ["312", "Open tasks", "24 due soon"],
        ["87", "Completed orders", "9 today"],
      ];
      const shortcuts = [
        ["Create customer", "Primary entry"],
        ["Create deal", "Sales pipeline"],
        ["Review approval", "3 pending"],
      ];
      const taskRows = [
        ["Today 09:12", "Today 09:48", "36 min", "Web", "Approval", "TASK-8421", "Pending", "68%"],
        ["Today 08:40", "Today 08:56", "16 min", "API", "Export", "TASK-8378", "Complete", "100%"],
        ["Yesterday 18:21", "Yesterday 18:33", "12 min", "Web", "Customer", "TASK-8269", "Needs review", "42%"],
        ["Yesterday 15:03", "Yesterday 15:19", "16 min", "Mobile", "Access", "TASK-8155", "Complete", "100%"],
      ];
      const rankings = [
        ["Avery Stone", "$482,910"],
        ["Morgan Lee", "$318,440"],
        ["Jordan Patel", "$246,800"],
        ["Riley Chen", "$190,250"],
        ["Taylor Brooks", "$132,600"],
      ];
      const approvals = [
        ["Discount exception", "Pending"],
        ["Customer profile change", "Copied"],
        ["Renewal date update", "Mentioned"],
      ];
      const menuMarkup = sidebarGroups.map(([group, items]) => `<div class="admin-menu-group"><span>${escapeHtml(group)}</span>${items.map((item, index) => `<button type="button" class="${item === "Dashboard" ? "active" : ""}" data-open-modal><i aria-hidden="true">${String(index + 1).padStart(2, "0")}</i>${escapeHtml(item)}</button>`).join("")}</div>`).join("");
      const kpiMarkup = kpis.map(([value, title, delta]) => `<article class="admin-kpi"><span>${escapeHtml(title)}</span><strong>${escapeHtml(value)}</strong><em>${escapeHtml(delta)}</em></article>`).join("");
      const shortcutMarkup = shortcuts.map(([title, detail], index) => `<button type="button" class="shortcut-card shortcut-${index + 1}" data-open-modal><i aria-hidden="true"></i><b>${escapeHtml(title)}</b><span>${escapeHtml(detail)}</span></button>`).join("");
      const tableMarkup = taskRows.map(([submit, end, cost, platform, type, taskId, status, progress]) => `<tr><td>${escapeHtml(submit)}</td><td>${escapeHtml(end)}</td><td>${escapeHtml(cost)}</td><td>${escapeHtml(platform)}</td><td>${escapeHtml(type)}</td><td><a href="#details">${escapeHtml(taskId)}</a></td><td><span class="status-chip ${status === "Needs review" ? "warn" : status === "Pending" ? "pending" : "done"}">${escapeHtml(status)}</span></td><td><span class="progress-line" style="--progress:${escapeHtml(progress)}"><i></i>${escapeHtml(progress)}</span></td><td><button type="button" class="row-action" aria-label="Open task ${escapeHtml(taskId)}" data-open-modal>Details</button></td></tr>`).join("");
      const rankingMarkup = rankings.map(([name, amount], index) => `<li><span>${index + 1}</span><b>${escapeHtml(name)}</b><em>${escapeHtml(amount)}</em></li>`).join("");
      const approvalMarkup = approvals.map(([title, state]) => `<button type="button" data-open-modal><b>${escapeHtml(title)}</b><span>${escapeHtml(state)}</span></button>`).join("");

      return `<section class="admin-console" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <aside class="admin-sidebar">
          <a class="admin-brand" href="#top"><span>AF</span><b>${escapeHtml(scenario.brand)} Console</b></a>
          <nav class="admin-menu" aria-label="Admin modules">${menuMarkup}</nav>
          <div class="admin-side-card">
            <b>Execution status</b>
            <span>dev <em>0/5</em></span>
            <span>k8s-prod <em>Offline</em></span>
            <span>prdci <em>0/3</em></span>
          </div>
        </aside>
        <div class="admin-shell">
          <header class="admin-topbar">
            <button type="button" class="admin-icon" aria-label="Toggle sidebar" data-open-modal><span aria-hidden="true">&#9776;</span></button>
            <div class="admin-breadcrumb"><span>Home</span><b>Data Center</b></div>
            <label class="admin-search"><span>Search</span><input type="search" value="" placeholder="Search records" aria-label="Search admin records"></label>
            <div class="admin-top-actions">
              <button type="button" class="admin-icon" aria-label="Notifications" data-open-modal><span aria-hidden="true">!</span></button>
              <button type="button" class="admin-icon" aria-label="Display settings" data-open-modal><span aria-hidden="true">[]</span></button>
              <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.secondaryAction)}</button>
              <span class="admin-avatar" aria-label="Current user">K</span>
            </div>
          </header>
          <main class="admin-workspace">
            <div class="admin-tabs" role="tablist" aria-label="Workspace tabs">
              <button type="button" class="active" role="tab" aria-selected="true">Home</button>
              <button type="button" role="tab" aria-selected="false">Task Log</button>
              <button type="button" role="tab" aria-selected="false">Approvals</button>
            </div>
            <div class="admin-title-row">
              <div>
                <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
                <h1>Data Center</h1>
              </div>
              <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
            </div>
            <section class="admin-kpi-row" aria-label="Key metrics">${kpiMarkup}</section>
            <section class="shortcut-panel" aria-label="Quick entries">
              <h2>Quick Entries</h2>
              <div class="shortcut-row">${shortcutMarkup}</div>
            </section>
            <section class="task-panel">
              <header class="panel-heading">
                <div><h2>Task Records</h2><p>Filter operational logs by time, task ID, type, and status.</p></div>
                <button type="button" class="secondary-action" data-open-modal>Compact list</button>
              </header>
              <div class="table-toolbar">
                <span class="date-range">Last 24 hours <b>~</b> Current workspace</span>
                <label class="toolbar-search"><span>Task ID</span><input type="search" placeholder="Task ID" aria-label="Filter by task ID"></label>
                <div class="toolbar-buttons">
                  <button type="button" data-open-modal>Search</button>
                  <button type="button" data-open-modal>Reset</button>
                  <button type="button" data-open-modal>Columns</button>
                </div>
              </div>
              <div class="admin-table-wrap">
                <table class="admin-table">
                  <thead><tr><th>Submitted</th><th>Finished</th><th>Duration</th><th>Platform</th><th>Type</th><th>Task ID</th><th>Status</th><th>Progress</th><th>Details</th></tr></thead>
                  <tbody>${tableMarkup}</tbody>
                </table>
              </div>
            </section>
            <section class="admin-dashboard-grid">
              <article class="chart-panel">
                <div class="panel-heading"><div><h2>Revenue Trend</h2><p>Fictional sales totals by period</p></div><div class="segmented"><button type="button">This year</button><button type="button">3 years</button><button type="button" class="active">5 years</button></div></div>
                <div class="admin-chart" aria-label="Sales chart">${bars}</div>
              </article>
              <aside class="ranking-panel">
                <h2>Sales Ranking</h2>
                <ol>${rankingMarkup}</ol>
              </aside>
              <article class="mini-panel">
                <h2>Approvals</h2>
                <div class="approval-tabs"><span class="active">To do</span><span>Started</span><span>Copied</span><span>@ me</span></div>
                <div class="approval-list">${approvalMarkup}</div>
              </article>
              <article class="calendar-panel">
                <div class="panel-heading"><div><h2>My Schedule</h2><p>Sample week</p></div><button type="button" data-open-modal>Today</button></div>
                <div class="calendar-strip"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span><b>14</b><b>15</b><b>16</b><b>17</b><b>18</b><b>19</b><b>20</b></div>
              </article>
            </section>
          </main>
        </div>
      </section>`;
    }
    case "deco-foyer": {
      const availability = scenario.queue.map(([title, state], index) => `<span><b>${String(index + 1).padStart(2, "0")}</b><em>${escapeHtml(state)}</em>${escapeHtml(title)}</span>`).join("");
      const metricLabels = scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("");
      const proofLabels = scenario.features.map(([title], index) => `<span><b>${String.fromCharCode(65 + index)}</b>${escapeHtml(title)}</span>`).join("");
      return `<section class="deco-foyer" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <aside class="deco-wing deco-left">
          <span class="deco-rule"></span>
          <h3>Salon Proof</h3>
          <div class="deco-proof-list">${proofLabels}</div>
          <button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
        </aside>
        <article class="deco-centerpiece">
          <div class="deco-monogram">${escapeHtml(style.id)}</div>
          <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="deco-metrics">${metricLabels}</div>
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
        </article>
        <aside class="deco-wing deco-right">
          <span class="deco-rule"></span>
          <h3>Availability</h3>
          <div class="deco-availability">${availability}</div>
        </aside>
        <div class="deco-floorplan" aria-hidden="true">
          <span></span><span></span><span></span><span></span>
          <b>FLOOR PLAN</b>
        </div>
      </section>`;
    }
    case "material-gallery": {
      const objectRows = scenario.queue.map(([title, state]) => `<span><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></span>`).join("");
      const materialMetrics = scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("");
      return `<section class="material-gallery" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <article class="material-intro">
          <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <button type="button" class="text-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
        </article>
        <div class="material-object-study">
          <div class="clay-object" aria-hidden="true"><span></span><span></span><span></span></div>
          <div class="material-caption">${materialMetrics}</div>
        </div>
        <aside class="material-notes">
          <h3>Material Notes</h3>
          <div class="quiet-features">${features}</div>
          <div class="object-ledger">${objectRows}</div>
          <button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
        </aside>
      </section>`;
    }
    case "swiss-archive": {
      const issueMetrics = scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("");
      const navCodes = scenario.nav.map((item, index) => `<span><b>${String(index + 1).padStart(2, "0")}</b>${escapeHtml(item)}</span>`).join("");
      const objectCrops = scenario.features.map(([title, body], index) => `<article class="swiss-object crop-${index + 1}"><span>${escapeHtml(`A-${String(index + 12)}`)}</span><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("");
      const sourceRows = scenario.queue.map(([title, state], index) => `<span><b>${escapeHtml(`SR-${String(index + 1).padStart(2, "0")}`)}</b>${escapeHtml(title)}<em>${escapeHtml(state)}</em></span>`).join("");
      return `<section class="swiss-archive" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <header class="swiss-masthead">
          <span>Issue ${escapeHtml(style.id)}</span>
          <strong>${escapeHtml(scenario.brand)}</strong>
          <nav>${navCodes}</nav>
          <button type="button" class="text-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
        </header>
        <div class="swiss-grid">
          <article class="swiss-lead">
            <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
            <h1>${escapeHtml(scenario.headline)}</h1>
            <p>${escapeHtml(scenario.lede)}</p>
            <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
          </article>
          <aside class="swiss-number" aria-label="Issue number">${escapeHtml(style.id)}</aside>
          <div class="swiss-metrics">${issueMetrics}</div>
          <div class="swiss-object-board">${objectCrops}</div>
          <aside class="swiss-source-table">
            <h3>Source Index</h3>
            ${sourceRows}
          </aside>
        </div>
      </section>`;
    }
    case "ink-landscape": {
      const lotRows = scenario.queue.map(([title, state], index) => `<span><b>${String(index + 1).padStart(2, "0")}</b>${escapeHtml(title)}<em>${escapeHtml(state)}</em></span>`).join("");
      const sourceRows = scenario.features.map(([title, body]) => `<article><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("");
      const provenanceRows = scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("");
      return `<section class="ink-landscape" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <article class="scroll-paper">
          <div class="seal-stack">
            <b>${escapeHtml(style.id)}</b>
            <span>${escapeHtml(scenario.eyebrow)}</span>
          </div>
          <div class="ink-copy">
            <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
            <h1>${escapeHtml(scenario.headline)}</h1>
            <p>${escapeHtml(scenario.lede)}</p>
            <button type="button" class="primary-action seal-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
          </div>
          <div class="ink-landscape-field" aria-hidden="true">
            <span class="mist mist-a"></span>
            <span class="mist mist-b"></span>
            <span class="mountain mountain-a"></span>
            <span class="mountain mountain-b"></span>
            <span class="river-line"></span>
          </div>
        </article>
        <aside class="tea-ledger">
          <h3>Tea Ledger</h3>
          <div class="tea-lots">${lotRows}</div>
          <div class="source-notes">${sourceRows}</div>
          <button type="button" class="text-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
        </aside>
        <div class="provenance-strip">${provenanceRows}</div>
      </section>`;
    }
    case "ink-scroll": {
      const lotRows = scenario.queue.map(([title, state], index) => `<span><b>${String(index + 1).padStart(2, "0")}</b>${escapeHtml(title)}<em>${escapeHtml(state)}</em></span>`).join("");
      const sourceRows = scenario.features.map(([title, body]) => `<article><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("");
      return `<section class="ink-scroll" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <aside class="ink-rail">
          <b>${escapeHtml(style.id)}</b>
          ${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}
        </aside>
        <article class="scroll-story">
          <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <button type="button" class="primary-action seal-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
          <div class="ink-wash-field" aria-hidden="true"><span></span><span></span><span></span></div>
        </article>
        <aside class="scroll-index">
          <h3>Tea Lots</h3>
          <div class="tea-lots">${lotRows}</div>
          <div class="source-notes">${sourceRows}</div>
          <button type="button" class="text-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
        </aside>
      </section>`;
    }
    case "blueprint-sheet": {
      const planNodes = scenario.metrics.map(([value, text], index) => `<span class="bp-node bp-${index + 1}"><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("");
      const callouts = scenario.queue.map(([title, state], index) => `<span><b>${String.fromCharCode(65 + index)}-${index + 1}</b>${escapeHtml(title)}<em>${escapeHtml(state)}</em></span>`).join("");
      return `<section class="blueprint-sheet" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <header class="sheet-header">
          <div>
            <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
            <h1>${escapeHtml(scenario.headline)}</h1>
          </div>
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
        </header>
        <div class="plan-sheet">
          <div class="coordinate-ruler"><span>X-12</span><span>Y-08</span><span>Z-04</span></div>
          <div class="plan-graph">${planNodes}<i class="bp-edge bp-e1"></i><i class="bp-edge bp-e2"></i><i class="bp-edge bp-e3"></i></div>
          <div class="dimension-lines" aria-hidden="true"><span></span><span></span><span></span></div>
        </div>
        <aside class="sheet-callouts">
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="callout-list">${callouts}</div>
          <div class="sheet-features">${features}</div>
          <button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
        </aside>
      </section>`;
    }
    case "cute-desk": {
      const taskCards = scenario.queue.map(([title, state], index) => `<article class="cute-task-card tone-${index + 1}"><span>0${index + 1}</span><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em><p>${["Practice sketch shape language and save one favorite frame.", "Mark the reading note complete and attach a short reflection.", "Unlock the reward shelf after two focused blocks."][index]}</p></article>`).join("");
      const rewardTokens = scenario.metrics.map(([value, text], index) => `<span class="reward-token token-${index + 1}"><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("");
      const notes = scenario.features.map(([title, body], index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("");
      return `<section class="cute-desk" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <header class="cute-desk-hero">
          <div>
            <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
            <h1>${escapeHtml(scenario.headline)}</h1>
            <p>${escapeHtml(scenario.lede)}</p>
            <div class="cute-actions"><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button><button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button></div>
          </div>
          <aside class="reward-shelf" aria-label="Reward shelf">${rewardTokens}</aside>
        </header>
        <div class="cute-workbench">
          <section class="cute-task-board">
            <div class="cute-lane"><h3>Today</h3>${taskCards}</div>
            <div class="cute-lane soft-lane"><h3>Later</h3>${scenario.nav.map((item, index) => `<button type="button" data-open-modal><span>${String.fromCharCode(65 + index)}</span>${escapeHtml(item)}<em>${["Open", "2 saved", "Pinned"][index]}</em></button>`).join("")}</div>
          </section>
          <aside class="cute-side-panel">
            <h3>Friendly notes</h3>
            <div class="cute-note-stack">${notes}</div>
          </aside>
        </div>
      </section>`;
    }
    case "stark-dossier": {
      const exhibitRows = scenario.queue.map(([title, state], index) => `<button type="button" data-open-modal><span>${String(index + 1).padStart(2, "0")}</span><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></button>`).join("");
      const sourceRows = scenario.features.map(([title, body], index) => `<span><b>SR-${String(index + 12).padStart(2, "0")}</b><strong>${escapeHtml(title)}</strong><em>${escapeHtml(body)}</em></span>`).join("");
      return `<section class="stark-dossier" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <header class="dossier-masthead">
          <b>${escapeHtml(scenario.brand)}</b>
          <nav>${scenario.nav.map((item) => `<a href="#details">${escapeHtml(item)}</a>`).join("")}</nav>
          <button type="button" class="text-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
        </header>
        <div class="dossier-grid">
          <aside class="dossier-index">
            <p class="kicker">${escapeHtml(label)}</p>
            ${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}
          </aside>
          <article class="dossier-object">
            <div class="dossier-frame" aria-hidden="true"><span></span><span></span><span></span></div>
            <div class="dossier-caption"><b>Selected file</b><span>Matte object crop / private access</span></div>
          </article>
          <section class="dossier-proof-wall">
            <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
            <h1>${escapeHtml(scenario.headline)}</h1>
            <p>${escapeHtml(scenario.lede)}</p>
            <div class="exhibit-list">${exhibitRows}</div>
            <div class="source-ledger">${sourceRows}</div>
            <button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
          </section>
        </div>
      </section>`;
    }
    case "minimal-command": {
      const runRows = scenario.queue.map(([title, state], index) => `<button type="button" data-open-modal><code>run-${String(index + 41).padStart(3, "0")}</code><span>${escapeHtml(title)}</span><em>${escapeHtml(state)}</em></button>`).join("");
      const evidenceRows = scenario.features.map(([title, body]) => `<article><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("");
      return `<section class="minimal-command" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <header class="command-topbar">
          <div>
            <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
            <h1>${escapeHtml(scenario.headline)}</h1>
          </div>
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
        </header>
        <div class="command-grid">
          <main class="command-main">
            <div class="command-input"><span>&gt;</span><p>Summarize latest review notes and list unresolved actions</p><button type="button" data-copy>Run</button></div>
            <article class="command-result"><b>Generated result</b><p>${escapeHtml(scenario.lede)}</p><pre><code>status: review_due
accepted: 7
blocked: 2
next: save_run</code></pre></article>
            <section class="run-history"><h3>Run history</h3>${runRows}</section>
          </main>
          <aside class="command-panels">
            <div class="command-metrics">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div>
            <div class="command-evidence">${evidenceRows}</div>
            <button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
          </aside>
        </div>
      </section>`;
    }
    case "layered-catalog": {
      const swatches = ["Paper grain", "Soft film", "Ink layer", "Edge seal", "Fiber core", "Matte coat"].map((item, index) => `<span class="material-swatch swatch-${index + 1}">${escapeHtml(item)}</span>`).join("");
      const specRows = scenario.features.map(([title, body], index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("");
      const inventoryRows = scenario.queue.map(([title, state]) => `<button type="button" data-open-modal><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></button>`).join("");
      return `<section class="layered-catalog" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <header class="catalog-header">
          <div><p class="kicker">${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1></div>
          <div class="catalog-actions"><button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button></div>
        </header>
        <section class="material-object-panel">
          <div class="sample-stack" aria-hidden="true"><span></span><span></span><span></span><strong>LK-12</strong></div>
          <div class="swatch-grid">${swatches}</div>
        </section>
        <section class="layer-detail-panel">
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="spec-sheet">${specRows}</div>
        </section>
        <aside class="inventory-rail">
          <h3>Inventory rail</h3>
          <div class="inventory-metrics">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div>
          <div class="inventory-list">${inventoryRows}</div>
        </aside>
      </section>`;
    }
    case "neumo-wallet": {
      const goalRows = scenario.queue.map(([title, state], index) => `<button type="button" data-open-modal><b>${escapeHtml(title)}</b><span>${escapeHtml(state)}</span><i style="--fill:${[62, 78, 44][index]}%"></i></button>`).join("");
      const limitRows = scenario.features.map(([title, body]) => `<article><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("");
      return `<section class="neumo-wallet" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <article class="wallet-panel">
          <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="vault-balance"><strong>${escapeHtml(scenario.metrics[0][0])}</strong><span>${escapeHtml(scenario.metrics[0][1])}</span></div>
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
        </article>
        <section class="transfer-console">
          <div class="transfer-card-stack" aria-hidden="true"><span></span><span></span><span></span></div>
          <div class="transfer-pad"><span>From Vault</span><strong>$420</strong><em>Pending confirmation</em></div>
          <div class="goal-wells">${goalRows}</div>
        </section>
        <aside class="savings-rail">
          <h3>Limit controls</h3>
          <div class="soft-metrics">${scenario.metrics.slice(1).map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div>
          <div class="limit-list">${limitRows}</div>
          <button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
        </aside>
      </section>`;
    }
    case "precision-map": {
      const spanRows = scenario.queue.map(([title, state], index) => `<button type="button" data-open-modal><code>span-${String(index + 7).padStart(2, "0")}</code><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></button>`).join("");
      const evidence = scenario.features.map(([title, body]) => `<article><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("");
      return `<section class="precision-map" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <header class="precision-topline">
          <div><p class="kicker">${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1></div>
          <div class="precision-metrics">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div>
        </header>
        <div class="precision-main-grid">
          <aside class="span-lanes"><h3>Span lanes</h3>${spanRows}<button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button></aside>
          <main class="topology-canvas">
            <div class="topology-command"><code>trace replay --incident latest</code><button type="button" data-copy>${escapeHtml(scenario.primaryAction)}</button></div>
            <span class="topo-node topo-a">API</span><span class="topo-node topo-b">Worker</span><span class="topo-node topo-c">Queue</span><span class="topo-node topo-d">DB</span>
            <i class="topo-edge edge-a"></i><i class="topo-edge edge-b"></i><i class="topo-edge edge-c"></i><i class="topo-edge edge-d"></i>
            <div class="latency-strip"><span>p50 48ms</span><span>p95 ${escapeHtml(scenario.metrics[2][0])}</span><span>retry 2.8%</span></div>
          </main>
          <aside class="incident-panel"><p>${escapeHtml(scenario.lede)}</p><div class="incident-evidence">${evidence}</div></aside>
        </div>
      </section>`;
    }
    case "gradient-launch": {
      const timeline = scenario.queue.map(([title, state], index) => `<button type="button" data-open-modal><span>0${index + 1}</span><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></button>`).join("");
      const assetTiles = scenario.features.map(([title, body], index) => `<article class="asset-tile asset-${index + 1}"><span>${escapeHtml(title)}</span><p>${escapeHtml(body)}</p></article>`).join("");
      return `<section class="gradient-launch" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <header class="launch-hero">
          <div><p class="kicker">${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1><p>${escapeHtml(scenario.lede)}</p></div>
          <div class="launch-counters">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div>
        </header>
        <div class="gradient-stage-grid">
          <aside class="launch-rhythm"><h3>Launch rhythm</h3>${timeline}</aside>
          <main class="asset-mosaic">
            <article class="asset-stage"><b>${escapeHtml(scenario.brand)}</b><span>Creative preview</span><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button></article>
            ${assetTiles}
          </main>
          <aside class="publish-rail">
            <h3>Publish gate</h3>
            <div class="audience-card"><strong>Audience A</strong><span>Lift +18%</span><i></i></div>
            <div class="audience-card"><strong>Audience B</strong><span>Lift +11%</span><i></i></div>
            <button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
          </aside>
        </div>
      </section>`;
    }
    case "industrial-room": {
      const lineCards = [
        ["LN-01", "Mixer", "Running", "93%"],
        ["LN-02", "Press", "Hold", "41%"],
        ["LN-03", "Coolant", "Warning", "68%"],
        ["LN-04", "Packing", "Recovered", "88%"],
      ].map(([line, title, state, load], index) => `<button type="button" class="line-card line-${index + 1}" data-open-modal><span>${escapeHtml(line)}</span><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em><i>${escapeHtml(load)}</i></button>`).join("");
      const alarmRows = [
        ["LN-02", scenario.queue[0][0], scenario.queue[0][1], "A. Morgan", "critical"],
        ["LN-03", scenario.queue[1][0], scenario.queue[1][1], "Shift Crew", "warning"],
        ["LN-08", scenario.queue[2][0], scenario.queue[2][1], "Safety", "open"],
        ["LN-04", "Packing arm", "Recovered", "Automation", "open"],
        ["LN-07", "Lockout gate", "Locked", "Service", "critical"],
      ];
      const alarmRowsHtml = alarmRows.map(([line, machine, state, owner, tone]) => `<tr><td>${escapeHtml(line)}</td><td>${escapeHtml(machine)}</td><td><span class="${escapeHtml(tone)}">${escapeHtml(state)}</span></td><td>${escapeHtml(owner)}</td><td><button type="button" data-open-modal>Ack</button></td></tr>`).join("");
      const evidence = scenario.features.map(([title, body]) => `<article><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("");
      return `<section class="industrial-room" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <header class="shift-header">
          <div><p class="kicker">${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1><p>${escapeHtml(scenario.lede)}</p></div>
          <div class="shift-actions"><button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button></div>
        </header>
        <div class="plant-grid">
          <aside class="line-matrix"><h3>Line matrix</h3>${lineCards}</aside>
          <section class="alarm-room-table">
            <div class="alarm-room-head">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div>
            <table><thead><tr><th>Line</th><th>Machine</th><th>State</th><th>Owner</th><th>Action</th></tr></thead><tbody>${alarmRowsHtml}</tbody></table>
          </section>
          <aside class="lockout-panel"><h3>Service evidence</h3>${evidence}<div class="lockout-log"><b>Lockout log</b><span>Gate 7 locked</span><span>Inspection due 14:30</span></div></aside>
        </div>
      </section>`;
    }
    case "industrial-deck": {
      const alarmRecords = [
        ["LN-2", scenario.queue[0][0], scenario.queue[0][1], "M. Carter", "critical", "Ack"],
        ["LN-3", scenario.queue[1][0], scenario.queue[1][1], "Ops Crew", "warning", "Open"],
        ["LN-4", scenario.queue[2][0], scenario.queue[2][1], "Service", "open", "Open"],
        ["LN-5", "Mixer valve", "Inspect", "Field Tech", "warning", "Route"],
        ["LN-7", "Packing arm", "Recovered", "Automation", "open", "Log"],
        ["LN-8", "Lockout gate", "Locked", "Safety", "critical", "Ack"],
      ];
      const alarmRows = alarmRecords.map(([line, title, state, owner, tone, action]) => `<tr><td>${escapeHtml(line)}</td><td>${escapeHtml(title)}</td><td><span class="${escapeHtml(tone)}">${escapeHtml(state)}</span></td><td>${escapeHtml(owner)}</td><td><button type="button" data-open-modal>${escapeHtml(action)}</button></td></tr>`).join("");
      const gaugeRows = scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("");
      return `<section class="industrial-deck" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <header class="control-header">
          <div>
            <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
            <h1>${escapeHtml(scenario.headline)}</h1>
          </div>
          <div class="control-actions">
            <button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
            <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
          </div>
        </header>
        <aside class="status-filters">
          ${["All Lines", "Critical", "Warning", "Service", "Recovered"].map((item, index) => `<button type="button" class="${index === 1 ? "active" : ""}" data-open-modal>${item}</button>`).join("")}
        </aside>
        <section class="alarm-board">
          <div class="alarm-banner"><b>Active Alarm Queue</b><span>${escapeHtml(scenario.lede)}</span></div>
          <div class="alarm-table-wrap">
            <table class="alarm-table">
              <thead><tr><th>Line</th><th>Machine</th><th>State</th><th>Owner</th><th>Action</th></tr></thead>
              <tbody>${alarmRows}</tbody>
            </table>
          </div>
        </section>
        <aside class="machine-inspector">
          <h3>Line Inspector</h3>
          <div class="gauge-strip">${gaugeRows}</div>
          <div class="service-evidence">${features}</div>
        </aside>
      </section>`;
    }
    case "ops-board":
      const railItems = style.id === "01"
        ? ["Users", "Roles", "Approvals", "Audit log", "Settings"]
        : ["Exceptions", "Owner", "Priority", "Status", "Due window"];
      return `<section class="ops-board">
        <aside class="filter-rail">
          <b>${escapeHtml(label)}</b>
          ${railItems.map((item, index) => `<span class="${index === 0 ? "rail-active" : ""}">${escapeHtml(item)}</span>`).join("")}
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
body.aurora-gradient,
body.art-deco,
body.blueprint,
body.industrial-control {
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
body.card-grid {
  background: #f3f6fb;
}
body.card-grid .page {
  width: 100%;
  max-width: none;
  padding: 0 0 56px;
}
body.card-grid .top-nav {
  display: none;
}
body.card-grid .interaction-demo,
body.card-grid .style-lab {
  width: min(100% - 48px, 1268px);
  margin-right: auto;
  margin-left: auto;
}
body.card-grid .primary-action,
body.card-grid .tabs button.active,
body.card-grid .toggle-chip[aria-pressed="true"],
body.card-grid .segmented .active {
  background: var(--primary);
  border-color: var(--primary);
  color: #ffffff;
}
body.card-grid .interaction-copy,
body.card-grid .state-board,
body.card-grid .lab-summary,
body.card-grid .lab-workspace,
body.card-grid .panel,
body.card-grid .implementation-list li,
body.card-grid .state-pill {
  border-color: #d7e3f2;
  background: #ffffff;
}
.life-aurora,
.life-stark-contact,
.life-print-ledger,
.life-cinema,
.life-museum-plan,
.life-interior-samples,
.life-bento-market,
.life-lamp-console,
.life-glasshouse,
.life-festival-wall,
.life-garden-class,
.life-deco-theater,
.life-wabi-repair,
.life-ink-tea,
.life-renovation-plan,
.life-print-room {
  width: 100%;
  min-height: 680px;
}
.life-aurora h1,
.life-stark-contact h1,
.life-print-ledger h1,
.life-cinema h1,
.life-museum-plan h1,
.life-interior-samples h1,
.life-bento-market h1,
.life-lamp-console h1,
.life-glasshouse h1,
.life-festival-wall h1,
.life-garden-class h1,
.life-deco-theater h1,
.life-wabi-repair h1,
.life-ink-tea h1,
.life-renovation-plan h1,
.life-print-room h1 {
  margin: 0;
  letter-spacing: 0;
  overflow-wrap: anywhere;
}
.life-aurora {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) 320px;
  gap: 18px;
  color: #f8fbff;
}
.aurora-room-field {
  position: relative;
  min-height: 500px;
  padding: 34px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.18);
  border-radius: 22px;
  background: linear-gradient(145deg, rgba(6,10,31,.96), rgba(12,22,52,.88));
}
.light-ribbons span {
  position: absolute;
  inset: auto auto 14% -8%;
  width: 68%;
  height: 34%;
  border-radius: 999px;
  filter: blur(28px);
  background: linear-gradient(90deg, #22d3ee, #a78bfa, #f0abfc);
  opacity: .55;
  transform: rotate(-12deg);
}
.light-ribbons span:nth-child(2) {
  inset: 8% -18% auto auto;
  background: linear-gradient(90deg, #10b981, #67e8f9);
  transform: rotate(18deg);
}
.light-ribbons span:nth-child(3) {
  inset: auto 8% 24% auto;
  width: 36%;
  height: 22%;
  background: #fef08a;
  opacity: .28;
}
.aurora-room-field > *:not(.light-ribbons) {
  position: relative;
  z-index: 1;
}
.aurora-room-field h1 {
  max-width: 720px;
  margin-top: 14px;
  font-size: clamp(38px, 6vw, 78px);
  line-height: .95;
}
.aurora-room-field p {
  max-width: 640px;
  color: #dbeafe;
}
.aurora-session-stats,
.cinema-metrics,
.sample-metrics,
.climate-metrics,
.festival-metrics,
.garden-metrics,
.theater-metrics,
.repair-metrics,
.tea-metrics,
.press-metrics {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.aurora-session-stats span,
.cinema-metrics span,
.sample-metrics span,
.climate-metrics span,
.festival-metrics span,
.garden-metrics span,
.theater-metrics span,
.repair-metrics span,
.tea-metrics span,
.press-metrics span {
  display: grid;
  gap: 2px;
  min-width: 96px;
  padding: 12px;
  border: 1px solid color-mix(in srgb, var(--border), transparent 18%);
  border-radius: var(--chip-radius);
  background: color-mix(in srgb, var(--surface), transparent 26%);
}
.aurora-session-stats strong,
.cinema-metrics strong,
.sample-metrics strong,
.climate-metrics strong,
.festival-metrics strong,
.garden-metrics strong,
.theater-metrics strong,
.repair-metrics strong,
.tea-metrics strong,
.press-metrics strong {
  font-size: 24px;
}
.room-map {
  position: absolute;
  right: 34px;
  bottom: 34px;
  width: 280px;
  height: 150px;
  border: 1px solid rgba(255,255,255,.2);
  border-radius: 18px;
  background: radial-gradient(circle at 30% 35%, rgba(34,211,238,.5), transparent 24%), radial-gradient(circle at 72% 58%, rgba(167,139,250,.45), transparent 26%), rgba(255,255,255,.05);
}
.room-map i {
  position: absolute;
  min-width: 42px;
  height: 26px;
  display: grid;
  place-items: center;
  padding: 0 8px;
  color: #e0f2fe;
  font-size: 11px;
  font-style: normal;
  font-weight: 800;
  border: 1px solid rgba(255,255,255,.72);
  border-radius: 999px;
  background: rgba(15,23,42,.48);
}
.room-map i:nth-child(1) { left: 34px; top: 42px; }
.room-map i:nth-child(2) { right: 46px; top: 68px; }
.room-map i:nth-child(3) { left: 122px; bottom: 30px; }
.room-map b {
  position: absolute;
  left: 18px;
  bottom: 14px;
}
.resonance-board {
  position: absolute;
  left: 34px;
  right: 340px;
  bottom: 34px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  z-index: 1;
}
.resonance-board span {
  min-height: 72px;
  display: grid;
  align-content: space-between;
  padding: 10px;
  color: #f8fbff;
  border: 1px solid rgba(255,255,255,.18);
  border-radius: 12px;
  background: rgba(15,23,42,.46);
  backdrop-filter: blur(12px);
}
.resonance-board b,
.resonance-board em,
.room-zone-list b,
.room-zone-list strong,
.room-zone-list em {
  display: block;
}
.resonance-board em,
.room-zone-list em {
  color: #bae6fd;
  font-style: normal;
  font-size: 11px;
}
.room-zone-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.room-zone-list span {
  display: grid;
  gap: 3px;
  padding: 10px;
  border: 1px solid rgba(255,255,255,.18);
  border-radius: 12px;
  background: rgba(255,255,255,.08);
}
.aurora-booking,
.print-ledger,
.pickup-rail,
.cinema-program,
.museum-guide,
.sample-approval,
.scene-pads,
.climate-pane,
.festival-rail,
.seed-notes,
.table-ledger,
.repair-ledger,
.tea-origin-ledger,
.crew-notes,
.ink-service {
  display: grid;
  align-content: start;
  gap: 14px;
  padding: 22px;
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  background: var(--surface);
  box-shadow: var(--shadow);
}
.session-rail,
.program-rows,
.lesson-steps,
.water-rows,
.stage-schedule {
  display: grid;
  gap: 10px;
}
.session-rail button,
.program-rows button,
.lesson-steps button,
.water-rows button,
.stage-schedule button,
.pickup-rail button:not(.secondary-action),
.scene-pads button,
.press-matrix button {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 10px;
  align-items: center;
  min-height: 52px;
  padding: 12px;
  color: inherit;
  border: 1px solid var(--border);
  border-radius: var(--control-radius);
  background: color-mix(in srgb, var(--surface), var(--bg) 18%);
  text-align: left;
}
.session-rail .selected {
  border-color: #67e8f9;
  box-shadow: 0 0 0 1px rgba(103,232,249,.45);
}
.aurora-notes,
.darkroom-notes,
.room-specs,
.plant-notes,
.tasting-notes {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}
.aurora-notes article,
.darkroom-notes article,
.room-specs article,
.plant-notes article,
.tasting-notes article,
.crew-notes article,
.repair-ledger article,
.ink-service article {
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  background: color-mix(in srgb, var(--surface), var(--bg) 8%);
}
.life-stark-contact {
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr) 300px;
  gap: 22px;
  color: #fafafa;
}
.contact-title {
  display: grid;
  align-content: space-between;
  min-height: 560px;
  padding: 22px 0;
  border-top: 1px solid rgba(255,255,255,.18);
  border-bottom: 1px solid rgba(255,255,255,.18);
}
.contact-title h1 {
  font-size: clamp(30px, 3.2vw, 46px);
  line-height: 1.02;
}
.exif-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.exif-grid span {
  display: grid;
  gap: 4px;
  padding: 10px;
  border: 1px solid rgba(255,255,255,.16);
  background: #111;
}
.exif-grid b {
  color: #a3a3a3;
  font-size: 11px;
}
.photo-review-desk {
  display: grid;
  grid-template-rows: minmax(300px, .9fr) auto minmax(190px, .55fr);
  gap: 12px;
  min-height: 560px;
}
.hero-print {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.18);
  background:
    linear-gradient(120deg, transparent 0 48%, rgba(255,255,255,.08) 49% 51%, transparent 52%),
    radial-gradient(circle at 24% 24%, rgba(255,255,255,.22), transparent 18%),
    linear-gradient(145deg, #070707, #2b2b2f 58%, #111);
}
.hero-print .print-sky {
  position: absolute;
  left: 8%;
  right: 8%;
  top: 10%;
  height: 28%;
  border: 1px solid rgba(255,255,255,.16);
  background: repeating-linear-gradient(90deg, rgba(255,255,255,.18) 0 1px, transparent 1px 18px);
}
.hero-print .print-stair {
  position: absolute;
  left: 12%;
  right: 20%;
  bottom: 18%;
  height: 38%;
  background: repeating-linear-gradient(0deg, rgba(255,255,255,.18) 0 2px, transparent 2px 22px);
  transform: skewX(-18deg);
}
.hero-print .print-caption {
  position: absolute;
  left: 18px;
  bottom: 16px;
  padding: 8px 10px;
  color: #050505;
  font-weight: 800;
  background: #fafafa;
}
.negative-strip {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 6px;
  padding: 8px;
  border: 1px solid rgba(255,255,255,.16);
  background: #050505;
}
.negative-strip span {
  min-height: 46px;
  display: grid;
  place-items: center;
  color: #d4d4d8;
  border: 1px solid rgba(255,255,255,.16);
  background: #18181b;
}
.negative-strip .active {
  color: #050505;
  background: #fafafa;
}
.contact-sheet {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  padding: 18px;
  border: 1px solid rgba(255,255,255,.14);
  background: #050505;
}
.contact-sheet button {
  position: relative;
  aspect-ratio: 1.18;
  overflow: hidden;
  color: #f5f5f5;
  border: 1px solid rgba(255,255,255,.18);
  background: linear-gradient(145deg, #111, #2a2a2a);
  text-align: left;
}
.contact-sheet button:nth-child(3n) { background: linear-gradient(145deg, #0f0f10, #3a3a3a); }
.contact-sheet button.selected {
  outline: 2px solid #fafafa;
  outline-offset: -6px;
}
.contact-sheet button i {
  position: absolute;
  inset: 10px 10px 42px;
  border: 1px solid rgba(255,255,255,.16);
  background:
    linear-gradient(120deg, rgba(255,255,255,.08), transparent 52%),
    repeating-linear-gradient(90deg, rgba(255,255,255,.1) 0 1px, transparent 1px 16px),
    linear-gradient(145deg, #171717, #3f3f46);
}
.contact-sheet button:nth-child(2n) i {
  background:
    radial-gradient(circle at 28% 32%, rgba(250,250,250,.32), transparent 18%),
    linear-gradient(145deg, #09090b, #27272a);
}
.contact-sheet button b {
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 22px;
  z-index: 1;
  font-size: 11px;
  line-height: 1.1;
}
.contact-sheet button em {
  position: absolute;
  right: 8px;
  top: 8px;
  z-index: 1;
  padding: 3px 6px;
  color: #111;
  font-size: 9px;
  font-style: normal;
  font-weight: 800;
  border-radius: 999px;
  background: #fafafa;
}
.contact-sheet span {
  position: absolute;
  left: 8px;
  bottom: 8px;
  z-index: 1;
  color: #f5f5f5;
  font-size: 12px;
}
.print-metrics,
.print-rows,
.job-ledger,
.supplier-rows,
.repair-rows,
.tea-lots,
.alarm-strip {
  display: grid;
  gap: 10px;
}
.print-metrics span,
.print-rows span,
.job-ledger span,
.supplier-rows span,
.repair-rows span,
.tea-lots span,
.alarm-strip span,
.table-ledger span,
.label-list span {
  display: grid;
  gap: 4px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
}
.life-print-ledger {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 18px;
  color: #0f172a;
}
.ledger-header,
.museum-heading,
.sample-heading,
.renovation-header,
.press-header {
  grid-column: 1 / -1;
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 18px;
}
.ledger-header h1,
.museum-heading h1,
.sample-heading h1,
.renovation-header h1,
.press-header h1 {
  font-size: clamp(30px, 4.4vw, 58px);
  line-height: 1;
}
.ledger-sheet {
  min-height: 520px;
  padding: 26px;
  border: 1px solid #dbe3ee;
  border-radius: 8px;
  background: linear-gradient(#fff, #fff) padding-box, repeating-linear-gradient(0deg, transparent 0 37px, #edf2f7 38px 39px);
  box-shadow: none;
}
.docket-number {
  width: fit-content;
  margin-bottom: 22px;
  padding: 8px 10px;
  color: #fff;
  background: #111827;
}
.proof-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-top: 28px;
}
.proof-strip span {
  aspect-ratio: 1.5;
  display: grid;
  align-content: end;
  gap: 4px;
  padding: 10px;
  border: 1px solid #111827;
  background: repeating-linear-gradient(45deg, #dbeafe 0 8px, #fff 8px 16px);
}
.proof-strip span:nth-child(2) { background: repeating-linear-gradient(45deg, #ffedd5 0 8px, #fff 8px 16px); }
.proof-strip span:nth-child(3) { background: repeating-linear-gradient(45deg, #dcfce7 0 8px, #fff 8px 16px); }
.proof-strip span:nth-child(4) { background: repeating-linear-gradient(45deg, #f3e8ff 0 8px, #fff 8px 16px); }
.proof-strip b,
.proof-strip em {
  display: block;
  width: fit-content;
  padding: 3px 6px;
  color: #111827;
  background: rgba(255,255,255,.88);
}
.proof-strip em {
  font-size: 11px;
  font-style: normal;
}
.print-production-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(220px, .8fr);
  gap: 12px;
  margin-top: 18px;
}
.dry-rack {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 6px;
  padding: 10px;
  border: 1px solid #111827;
  background: #f8fafc;
}
.dry-rack span {
  min-height: 34px;
  display: grid;
  place-items: center;
  color: #334155;
  font-size: 11px;
  border: 1px solid #cbd5e1;
  background: #fff;
}
.dry-rack .checked {
  color: #111827;
  background: #bfdbfe;
}
.ink-mix {
  display: grid;
  gap: 8px;
  padding: 10px;
  border: 1px solid #111827;
  background: #fff;
}
.ink-mix span {
  display: grid;
  grid-template-columns: 70px minmax(0, 1fr) auto;
  gap: 8px;
  align-items: center;
}
.ink-mix i {
  height: 8px;
  background: #2563eb;
}
.ink-mix span:nth-child(2) i { background: #fb923c; }
.ink-mix span:nth-child(3) i { background: #94a3b8; }
.life-cinema {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) 330px;
  gap: 18px;
  color: #f8fafc;
}
.cinema-screen {
  min-height: 560px;
  padding: 28px;
  border: 1px solid #27272a;
  border-radius: 10px;
  background: radial-gradient(circle at 50% 14%, rgba(125,211,252,.2), transparent 32%), #050505;
}
.screen-frame {
  position: relative;
  height: 260px;
  margin-bottom: 24px;
  border: 1px solid #3f3f46;
  border-radius: 8px;
  background: linear-gradient(120deg, #0f172a, #171717 50%, #334155);
}
.screen-frame .screen-glow {
  position: absolute;
  inset: 18px;
  border: 1px solid rgba(255,255,255,.1);
}
.screen-frame .screen-caption {
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 18px;
  inset: auto 18px 18px;
  height: auto;
  display: block;
  padding: 12px 14px;
  color: #e0f2fe;
  font-size: 13px;
  font-weight: 800;
  background: rgba(255,255,255,.06);
}
.screen-frame b {
  position: absolute;
  left: 26px;
  top: 24px;
  padding: 8px 10px;
  color: #0f172a;
  background: #f8fafc;
}
.screen-frame i {
  position: absolute;
  right: 26px;
  top: 24px;
  padding: 8px 10px;
  color: #cbd5e1;
  font-style: normal;
  border: 1px solid rgba(255,255,255,.18);
  background: rgba(15,23,42,.72);
}
.reel-frames {
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 72px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}
.reel-frames span {
  min-height: 42px;
  display: grid;
  place-items: center;
  color: #cbd5e1;
  font-size: 11px;
  border: 1px solid rgba(255,255,255,.16);
  background: rgba(0,0,0,.28);
}
.cue-sheet {
  display: grid;
  gap: 8px;
  padding: 12px;
  border: 1px solid #27272a;
  background: #09090b;
}
.cue-sheet span {
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr);
  gap: 10px;
  color: #e4e4e7;
  border-bottom: 1px solid rgba(255,255,255,.08);
}
.seat-map {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 8px;
  padding: 14px;
  border: 1px solid #27272a;
  border-radius: 8px;
  background: #0b0b0c;
}
.seat-map span {
  min-height: 28px;
  display: grid;
  place-items: center;
  color: #e5e7eb;
  font-size: 11px;
  font-weight: 800;
  border-radius: 2px;
  background: #3f3f46;
}
.seat-map .held {
  color: #082f49;
  background: #7dd3fc;
}
.life-museum-plan {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 18px;
}
.floor-plan {
  position: relative;
  min-height: 520px;
  border: 1px solid var(--border);
  background: linear-gradient(90deg, transparent 49%, rgba(29,78,216,.12) 50%, transparent 51%), linear-gradient(0deg, transparent 49%, rgba(29,78,216,.12) 50%, transparent 51%), #fff;
  background-size: 80px 80px;
}
.gallery-rooms span {
  position: absolute;
  display: grid;
  place-items: center;
  color: #475569;
  font-weight: 800;
  border: 1px solid #cbd5e1;
  background: rgba(248,250,252,.86);
}
.gallery-rooms .room-a { left: 6%; top: 10%; width: 28%; height: 32%; }
.gallery-rooms .room-b { right: 8%; top: 10%; width: 34%; height: 26%; }
.gallery-rooms .room-c { left: 38%; top: 42%; width: 24%; height: 28%; }
.gallery-rooms .room-d { right: 8%; bottom: 10%; width: 24%; height: 22%; }
.floor-plan article {
  position: absolute;
  z-index: 2;
  width: 170px;
  padding: 12px;
  border: 1px solid #111827;
  background: #fff;
}
.floor-plan article span,
.floor-plan article b,
.floor-plan article em {
  display: block;
}
.floor-plan .stop-1 { left: 8%; top: 16%; }
.floor-plan .stop-2 { left: 42%; top: 42%; }
.floor-plan .stop-3 { right: 8%; bottom: 14%; }
.plan-route i {
  position: absolute;
  z-index: 1;
  height: 2px;
  background: #1d4ed8;
  transform-origin: left center;
}
.plan-route i:nth-child(1) { left: 22%; top: 31%; width: 280px; transform: rotate(22deg); }
.plan-route i:nth-child(2) { left: 49%; top: 52%; width: 260px; transform: rotate(16deg); }
.plan-route i:nth-child(3) { left: 12%; bottom: 16%; width: 72%; }
.plan-zones span {
  position: absolute;
  z-index: 0;
  min-width: 120px;
  padding: 8px 10px;
  color: #1e3a8a;
  font-size: 12px;
  font-weight: 800;
  border: 1px dashed #93c5fd;
  background: rgba(219,234,254,.68);
}
.plan-zones .zone-1 { left: 8%; bottom: 24%; }
.plan-zones .zone-2 { right: 12%; top: 14%; }
.plan-zones .zone-3 { left: 36%; top: 18%; }
.plan-zones .zone-4 { right: 18%; bottom: 34%; }
.wall-label-strip {
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 12px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}
.wall-label-strip span {
  display: grid;
  gap: 3px;
  padding: 8px;
  color: #111827;
  border: 1px solid #111827;
  background: #fff;
}
.life-interior-samples {
  display: grid;
  grid-template-columns: minmax(0, .95fr) 320px;
  gap: 18px;
}
.material-board {
  display: grid;
  grid-template-columns: 260px minmax(260px, .9fr) minmax(0, 1fr);
  gap: 18px;
  min-height: 430px;
  padding: 22px;
  border-radius: 24px;
  background: #fff;
  box-shadow: var(--shadow);
}
.stacked-samples {
  position: relative;
  min-height: 320px;
}
.stacked-samples span {
  position: absolute;
  width: 78%;
  height: 68%;
  display: grid;
  align-content: end;
  padding: 16px;
  color: #3f2f1f;
  font-size: 12px;
  font-weight: 800;
  border-radius: 18px;
  box-shadow: 0 18px 36px rgba(29,27,32,.12);
}
.stacked-samples span:nth-child(1) { left: 0; top: 38px; background: #c9a46a; }
.stacked-samples span:nth-child(2) { left: 34px; top: 16px; background: #e6d7c3; }
.stacked-samples span:nth-child(3) { left: 72px; top: 0; background: #f7efe3; border: 1px solid #d8cdbc; }
.stacked-samples b {
  position: absolute;
  left: 86px;
  top: 44px;
}
.room-placement {
  display: grid;
  grid-template-rows: minmax(180px, 1fr) auto;
  gap: 12px;
}
.room-elevation {
  position: relative;
  border: 1px solid #d8cdbc;
  border-radius: 18px;
  background:
    linear-gradient(90deg, transparent 48%, rgba(120,113,108,.16) 49% 51%, transparent 52%),
    linear-gradient(#fbf7ef, #eee5d8);
}
.room-elevation i {
  position: absolute;
  border: 1px solid #8b735b;
  background: rgba(255,255,255,.52);
}
.room-elevation i:nth-child(1) { left: 14%; bottom: 16%; width: 28%; height: 28%; }
.room-elevation i:nth-child(2) { right: 16%; bottom: 16%; width: 22%; height: 46%; }
.room-elevation i:nth-child(3) { left: 28%; top: 18%; width: 44%; height: 12%; }
.room-elevation b {
  position: absolute;
  left: 16px;
  top: 14px;
}
.placement-rows {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.placement-rows span {
  display: grid;
  gap: 2px;
  padding: 10px;
  border: 1px solid #d8cdbc;
  border-radius: 12px;
  background: #fffaf3;
}
.swatch-lanes {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}
.swatch-lanes button {
  min-height: 96px;
  padding: 14px;
  border: 1px solid #e7e0ec;
  border-radius: 18px;
  background: #f7f2fa;
  text-align: left;
}
.swatch-lanes .sample-1 { background: #b8824f; color: #fff; }
.swatch-lanes .sample-2 { background: #e8dfd3; }
.swatch-lanes .sample-3 { background: #f5eddd; }
.swatch-lanes .sample-4 { background: #d8c7b3; }
.swatch-lanes .sample-5 { background: #b69153; color: #fff; }
.swatch-lanes .sample-6 { background: #f0ece8; }
.life-bento-market {
  display: grid;
  grid-template-columns: 1.2fr .8fr .75fr;
  grid-auto-rows: minmax(150px, auto);
  gap: 14px;
}
.market-tile {
  display: grid;
  align-content: space-between;
  gap: 10px;
  padding: 20px;
  border: 1px solid var(--border);
  border-radius: 18px;
  background: #fff;
  box-shadow: var(--shadow);
}
.menu-hero {
  grid-row: span 2;
  background: #18181b;
  color: #fff;
}
.menu-hero h1 {
  font-size: clamp(34px, 5vw, 64px);
  line-height: .96;
}
.course-stack,
.producer-rows,
.crate-grid,
.stage-map,
.volunteer-board div,
.class-path,
.seed-tray {
  display: grid;
  gap: 8px;
}
.course-stack {
  grid-template-columns: 1fr 1fr;
}
.course-stack span,
.producer-rows span,
.class-path span {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 8px;
  padding: 9px;
  border-radius: 10px;
  background: rgba(255,255,255,.1);
}
.course-tile { background: #fff7ed; }
.producer-tile { background: #ecfccb; }
.table-tile { background: #ffedd5; }
.quote-tile { grid-column: span 2; background: #f4f4f5; }
.plate-sketch {
  position: relative;
  min-height: 96px;
  border-radius: 999px;
  background: #fff;
}
.plate-sketch i {
  position: absolute;
  border-radius: 999px;
  background: #fb923c;
}
.plate-sketch i:nth-child(1) { left: 20%; top: 26%; width: 34%; height: 18%; }
.plate-sketch i:nth-child(2) { right: 18%; bottom: 22%; width: 24%; height: 24%; background: #84cc16; }
.plate-sketch i:nth-child(3) { left: 38%; bottom: 24%; width: 18%; height: 18%; background: #ef4444; }
.service-tile,
.ingredient-tile {
  display: grid;
  gap: 8px;
}
.service-tile span,
.ingredient-tile span {
  padding: 10px;
  border-radius: 10px;
  background: rgba(24,24,27,.06);
}
.crate-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.crate-grid span {
  min-height: 52px;
  display: grid;
  place-items: center;
  color: #14532d;
  border: 1px dashed rgba(20,83,45,.36);
  background: #dcfce7;
}
.life-lamp-console {
  display: grid;
  grid-template-columns: minmax(0, .9fr) minmax(320px, 1fr) 260px;
  gap: 18px;
  color: #172033;
}
.lamp-copy,
.lamp-dial-panel,
.scene-pads {
  padding: 26px;
  border-radius: 30px;
  background: #e9eef5;
  box-shadow: var(--shadow);
}
.lamp-copy {
  display: grid;
  align-content: center;
  gap: 14px;
}
.lamp-copy h1 {
  font-size: clamp(32px, 4.5vw, 58px);
  line-height: 1;
}
.lamp-dial-panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}
.lamp-shelf {
  grid-column: 1 / -1;
  position: relative;
  min-height: 220px;
  border-radius: 34px;
  background: #e9eef5;
  box-shadow: inset 10px 10px 24px rgba(148,163,184,.34), inset -10px -10px 24px rgba(255,255,255,.84);
}
.lamp-shelf .shade {
  position: absolute;
  left: 18%;
  top: 18%;
  width: 124px;
  height: 92px;
  border-radius: 60px 60px 20px 20px;
  background: #f8fbff;
  box-shadow: 0 28px 58px rgba(239,93,168,.22);
}
.lamp-shelf .light-pool {
  position: absolute;
  left: 12%;
  right: 16%;
  bottom: 24%;
  height: 48px;
  border-radius: 999px;
  background: rgba(239,93,168,.18);
}
.lamp-shelf .book-stack {
  position: absolute;
  right: 18%;
  bottom: 23%;
  width: 120px;
  height: 44px;
  border-radius: 14px;
  background: repeating-linear-gradient(0deg, #cbd5e1 0 10px, #f8fafc 10px 20px);
}
.lamp-shelf .plant-dot {
  position: absolute;
  right: 20%;
  top: 18%;
  width: 58px;
  height: 58px;
  border-radius: 999px 999px 999px 12px;
  background: #8ee6c8;
  transform: rotate(-18deg);
}
.lamp-shelf b {
  position: absolute;
  left: 26px;
  bottom: 24px;
}
.lamp-dial {
  grid-column: 1 / -1;
  aspect-ratio: 1.9;
  display: grid;
  place-items: center;
  border-radius: 999px;
  background: #e9eef5;
  box-shadow: inset 14px 14px 28px rgba(148,163,184,.45), inset -14px -14px 28px rgba(255,255,255,.9);
}
.lamp-dial strong {
  font-size: clamp(48px, 8vw, 88px);
}
.timer-well,
.wave-well,
.pad-count {
  padding: 18px;
  border-radius: 24px;
  background: #e9eef5;
  box-shadow: inset 8px 8px 20px rgba(148,163,184,.38), inset -8px -8px 20px rgba(255,255,255,.86);
}
.timer-well b,
.timer-well span,
.wave-well b,
.wave-well span,
.pad-count strong {
  display: block;
}
.wave-well {
  display: grid;
  align-content: space-between;
  gap: 10px;
}
.wave-well b {
  color: #172033;
}
.wave-well span {
  color: #64748b;
  font-size: 13px;
}
.mini-wave {
  height: 42px;
  display: flex;
  align-items: end;
  gap: 6px;
}
.mini-wave i {
  flex: 1;
  min-width: 5px;
  border-radius: 999px 999px 6px 6px;
  background: linear-gradient(180deg, #31487d, #8ee6c8);
  box-shadow: 0 0 18px rgba(142,230,200,.26);
}
.routine-strip {
  display: grid;
  gap: 8px;
}
.routine-strip span {
  display: grid;
  grid-template-columns: 58px minmax(0, 1fr);
  gap: 8px;
  padding: 10px;
  border-radius: 16px;
  background: #e9eef5;
  box-shadow: inset 5px 5px 12px rgba(148,163,184,.28), inset -5px -5px 12px rgba(255,255,255,.82);
}
.life-glasshouse {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 18px;
  color: #f8fbff;
}
.greenhouse-map {
  position: relative;
  min-height: 540px;
  padding: 30px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.24);
  border-radius: 28px;
  background: radial-gradient(circle at 20% 20%, rgba(52,211,153,.38), transparent 26%), radial-gradient(circle at 78% 34%, rgba(139,92,246,.3), transparent 28%), linear-gradient(145deg, #07111f, #12372f);
}
.greenhouse-map h1 {
  max-width: 680px;
  font-size: clamp(38px, 5.8vw, 72px);
  line-height: 1.03;
}
.canopy-lines span {
  position: absolute;
  left: 8%;
  width: 84%;
  height: 1px;
  background: rgba(255,255,255,.28);
  transform: rotate(-12deg);
}
.canopy-lines span:nth-child(1) { top: 28%; }
.canopy-lines span:nth-child(2) { top: 48%; transform: rotate(8deg); }
.canopy-lines span:nth-child(3) { top: 68%; }
.climate-pins i {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid #dff7ff;
  border-radius: 50%;
  background: rgba(255,255,255,.18);
}
.climate-pins i:nth-child(1) { left: 22%; bottom: 24%; }
.climate-pins i:nth-child(2) { right: 26%; top: 34%; }
.climate-pins i:nth-child(3) { right: 18%; bottom: 18%; }
.zone-labels span {
  position: absolute;
  display: grid;
  gap: 2px;
  min-width: 132px;
  padding: 10px 12px;
  color: #ecfeff;
  border: 1px solid rgba(255,255,255,.3);
  border-radius: 14px;
  background: rgba(15,23,42,.52);
  backdrop-filter: blur(10px);
}
.zone-labels b,
.zone-labels em {
  display: block;
}
.zone-labels em {
  color: #bbf7d0;
  font-style: normal;
}
.zone-labels .zone-1 { left: 15%; bottom: 30%; }
.zone-labels .zone-2 { right: 18%; top: 24%; }
.zone-labels .zone-3 { right: 12%; bottom: 22%; }
.plant-bed-map span {
  position: absolute;
  display: grid;
  gap: 2px;
  padding: 12px;
  color: #dff7ff;
  border: 1px solid rgba(255,255,255,.28);
  border-radius: 22px;
  background: rgba(255,255,255,.1);
}
.plant-bed-map b,
.plant-bed-map em {
  display: block;
}
.plant-bed-map em {
  color: #bbf7d0;
  font-style: normal;
}
.plant-bed-map .bed-1 { left: 10%; bottom: 12%; width: 24%; height: 88px; }
.plant-bed-map .bed-2 { right: 28%; bottom: 10%; width: 22%; height: 112px; }
.plant-bed-map .bed-3 { left: 42%; top: 34%; width: 20%; height: 82px; }
.plant-bed-map .bed-4 { right: 8%; top: 52%; width: 18%; height: 74px; }
.climate-pane {
  background: rgba(255,255,255,.14);
  backdrop-filter: blur(18px);
}
.sensor-chart {
  display: grid;
  gap: 10px;
}
.sensor-chart span {
  display: grid;
  grid-template-columns: 84px minmax(0, 1fr) auto;
  gap: 8px;
  align-items: center;
}
.sensor-chart i {
  height: 8px;
  border-radius: 999px;
  background: linear-gradient(90deg, #34d399, #67e8f9);
}
.life-festival-wall {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 18px;
  color: #24111f;
}
.festival-heading {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(220px, .42fr) auto;
  gap: 18px;
  align-items: end;
  padding: 26px;
  border-radius: 18px;
  background: linear-gradient(135deg, #ff7adf, #67e8f9 52%, #fef08a);
}
.festival-heading h1 {
  font-size: clamp(36px, 6vw, 74px);
  line-height: .94;
}
.festival-mini-posters {
  display: grid;
  gap: 8px;
}
.festival-mini-posters span {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 8px;
  padding: 10px;
  border: 1px solid rgba(36,17,31,.18);
  border-radius: 10px;
  background: rgba(255,255,255,.42);
}
.festival-mini-posters b,
.festival-mini-posters em {
  display: block;
  min-width: 0;
}
.festival-mini-posters em {
  font-style: normal;
  font-weight: 800;
}
.poster-wall {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.poster-wall article,
.festival-lead {
  min-height: 180px;
  padding: 20px;
  border-radius: 14px;
  background: #fff;
  box-shadow: var(--shadow);
}
.festival-lead {
  grid-row: span 2;
  background: #24111f;
  color: #fff;
}
.stage-map {
  grid-template-columns: 1fr 1fr;
}
.stage-map span {
  min-height: 64px;
  display: grid;
  align-content: space-between;
  padding: 10px;
  color: #24111f;
  border-radius: 10px;
  background: #fef08a;
}
.stage-map em {
  font-style: normal;
}
.volunteer-board {
  grid-column: span 2;
  min-height: 0 !important;
  padding: 20px;
  border-radius: 14px;
  background: #ecfeff;
  box-shadow: var(--shadow);
}
.volunteer-board div {
  grid-template-columns: repeat(3, 1fr);
  margin-top: 12px;
}
.volunteer-board span {
  display: grid;
  gap: 4px;
  padding: 12px;
  border-radius: 10px;
  background: rgba(36,17,31,.08);
}
.poster-1 { background: #fef3c7 !important; }
.poster-2 { background: #ecfeff !important; }
.poster-3 { background: #fce7f3 !important; }
.life-garden-class {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr) 300px;
  gap: 18px;
  color: #2b1d16;
}
.garden-plan,
.garden-lesson,
.seed-notes {
  padding: 24px;
  border: 1px solid var(--border);
  border-radius: 28px;
  background: #fff;
  box-shadow: var(--shadow);
}
.bed-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 18px;
}
.bed-grid span {
  min-height: 110px;
  display: grid;
  align-content: space-between;
  padding: 14px;
  color: #4a2d16;
  border: 2px dashed #8f5f4a;
  border-radius: 22px;
  background: #fef3c7;
}
.bed-grid b,
.bed-grid em {
  display: block;
}
.bed-grid em {
  font-size: 12px;
  font-style: normal;
}
.bed-grid span:nth-child(2) { background: #dcfce7; }
.bed-grid span:nth-child(3) { background: #ffe4e6; }
.bed-grid span:nth-child(4) { background: #e0f2fe; }
.seed-tray {
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 18px;
}
.seed-tray span {
  min-height: 44px;
  display: grid;
  place-items: center;
  color: #4a2d16;
  border: 1px solid #e7b78f;
  border-radius: 999px;
  background: #fff7ed;
}
.seed-tray .sprout {
  background: #dcfce7;
}
.class-path {
  grid-template-columns: repeat(4, 1fr);
  margin: 18px 0;
}
.class-path span {
  display: grid;
  grid-template-columns: 1fr;
  color: #4a2d16;
  border: 1px solid #f4c2d7;
  background: #fff7fb;
}
.garden-lesson h1 {
  font-size: clamp(34px, 5vw, 66px);
  line-height: 1;
}
.life-deco-theater {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr) 260px;
  gap: 18px;
  color: #fff4d6;
}
.theater-wing,
.theater-marquee,
.table-ledger {
  border: 1px solid #d4af37;
  background: #171526;
}
.theater-wing,
.table-ledger {
  display: grid;
  gap: 12px;
  align-content: start;
  padding: 22px;
}
.theater-marquee {
  position: relative;
  display: grid;
  justify-items: center;
  align-content: center;
  min-height: 560px;
  padding: 34px;
  text-align: center;
}
.theater-marquee::before,
.theater-marquee::after {
  content: "";
  position: absolute;
  inset: 22px;
  border: 1px solid rgba(212,175,55,.6);
  pointer-events: none;
}
.theater-marquee::after {
  inset: 42px;
}
.marquee-mark {
  width: 82px;
  height: 82px;
  display: grid;
  place-items: center;
  margin-bottom: 22px;
  color: #0e1020;
  background: #d4af37;
}
.theater-marquee h1 {
  max-width: 760px;
  font-size: clamp(36px, 5.4vw, 72px);
  line-height: .95;
}
.deco-seating-plan {
  width: min(520px, 100%);
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 8px;
  margin: 18px 0;
  padding: 14px;
  border-top: 1px solid rgba(212,175,55,.6);
  border-bottom: 1px solid rgba(212,175,55,.6);
}
.deco-seating-plan span {
  min-height: 32px;
  display: grid;
  place-items: center;
  color: #d4af37;
  border: 1px solid rgba(212,175,55,.46);
}
.deco-seating-plan .open {
  color: #0e1020;
  background: #d4af37;
}
.bar-menu {
  display: grid;
  gap: 8px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(212,175,55,.4);
}
.bar-menu span {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 8px;
}
.life-wabi-repair {
  display: grid;
  grid-template-columns: minmax(260px, .75fr) minmax(0, 1fr) 320px;
  gap: 22px;
  color: #302a22;
}
.repair-copy,
.repair-table,
.repair-ledger {
  background: #fffaf0;
  border: 1px solid #d8cdbc;
}
.repair-copy {
  display: grid;
  align-content: center;
  gap: 14px;
  padding: 24px;
}
.repair-copy h1 {
  font-size: clamp(32px, 4.8vw, 60px);
  line-height: 1.02;
}
.repair-table {
  display: grid;
  align-content: center;
  gap: 18px;
  min-height: 540px;
  padding: 26px;
}
.ceramic-form {
  position: relative;
  width: min(100%, 420px);
  aspect-ratio: 1.15;
  margin: 0 auto;
  border-radius: 44% 56% 52% 48%;
  background: #d8cdbc;
}
.ceramic-form span {
  position: absolute;
  inset: 18%;
  border-radius: inherit;
  background: #fffaf0;
}
.ceramic-form i {
  position: absolute;
  left: 48%;
  top: 12%;
  width: 3px;
  height: 70%;
  background: #b26b4b;
  transform: rotate(18deg);
}
.ceramic-form b {
  position: absolute;
  left: 22px;
  bottom: 18px;
  padding: 6px 8px;
  color: #fffaf0;
  background: #5f6f52;
}
.clay-body-grid,
.worktable-notes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.clay-body-grid span,
.worktable-notes span {
  display: grid;
  gap: 4px;
  padding: 10px;
  border: 1px solid #d8cdbc;
  background: rgba(255,255,255,.34);
}
.worktable-notes {
  grid-template-columns: repeat(2, 1fr);
}
.life-ink-tea {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 18px;
  color: #1f1f1c;
}
.tea-scroll {
  position: relative;
  min-height: 560px;
  padding: 34px;
  border: 1px solid #d8d0c4;
  background: #fffdf7;
}
.red-seal {
  position: absolute;
  right: 32px;
  top: 32px;
  width: 64px;
  height: 64px;
  display: grid;
  place-items: center;
  color: #fffdf7;
  background: #c43a32;
}
.tea-scroll h1 {
  max-width: 640px;
  font-size: clamp(36px, 5.4vw, 72px);
  line-height: .98;
}
.ink-mountain {
  position: absolute;
  left: 32px;
  right: 32px;
  bottom: 34px;
  height: 180px;
  overflow: hidden;
}
.ink-mountain span {
  position: absolute;
  bottom: -42px;
  width: 45%;
  height: 140px;
  border-radius: 52% 48% 0 0;
  background: rgba(31,31,28,.16);
}
.ink-mountain span:nth-child(1) { left: 5%; }
.ink-mountain span:nth-child(2) { right: 12%; height: 170px; background: rgba(31,31,28,.24); }
.ink-mountain i {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 28px;
  height: 2px;
  background: rgba(31,31,28,.36);
}
.ridge-lots {
  position: absolute;
  left: 34px;
  right: 34px;
  bottom: 224px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.ridge-lots span,
.tasting-wheel span {
  display: grid;
  gap: 3px;
  padding: 10px;
  border: 1px solid #d8d0c4;
  background: rgba(255,253,247,.72);
}
.tasting-wheel {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}
.life-renovation-plan {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 18px;
  color: #e8f7ff;
}
.loft-plan {
  position: relative;
  min-height: 540px;
  border: 1px solid #2d6796;
  background:
    linear-gradient(rgba(158,219,255,.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(158,219,255,.08) 1px, transparent 1px),
    #061a33;
  background-size: 28px 28px;
}
.room-outline {
  position: absolute;
  inset: 58px 70px;
  z-index: 1;
  border: 2px solid #9edbff;
}
.room-outline span {
  position: absolute;
  border: 1px solid #34d3ff;
}
.room-outline span:nth-child(1) { left: 0; top: 42%; width: 100%; }
.room-outline span:nth-child(2) { left: 48%; top: 0; height: 100%; }
.room-outline span:nth-child(3) { right: 14%; top: 0; height: 42%; }
.lighting-run i {
  position: absolute;
  z-index: 2;
  height: 2px;
  background: #f7e987;
  box-shadow: 0 0 12px rgba(247,233,135,.45);
  transform-origin: left center;
}
.lighting-run i:nth-child(1) { left: 18%; top: 28%; width: 48%; transform: rotate(12deg); }
.lighting-run i:nth-child(2) { left: 50%; top: 50%; width: 28%; transform: rotate(-24deg); }
.lighting-run i:nth-child(3) { left: 26%; bottom: 22%; width: 42%; transform: rotate(4deg); }
.loft-plan > span {
  position: absolute;
  z-index: 3;
  display: grid;
  gap: 4px;
  min-width: 138px;
  padding: 10px;
  border: 1px solid #9edbff;
  background: rgba(7,28,52,.9);
}
.loft-plan .callout-1 { left: 8%; top: 18%; }
.loft-plan .callout-2 { right: 10%; top: 34%; }
.loft-plan .callout-3 { left: 38%; bottom: 14%; }
.fixture-labels span {
  position: absolute;
  z-index: 2;
  padding: 7px 9px;
  color: #dff7ff;
  font-size: 12px;
  font-weight: 800;
  border: 1px solid rgba(158,219,255,.65);
  background: rgba(6,26,51,.8);
}
.fixture-labels .fix-1 { left: 18%; top: 39%; }
.fixture-labels .fix-2 { right: 23%; top: 20%; }
.fixture-labels .fix-3 { left: 52%; bottom: 28%; }
.fixture-labels .fix-4 { left: 18%; bottom: 28%; }
.dimension-tape {
  position: absolute;
  z-index: 2;
  left: 24px;
  right: 24px;
  bottom: 22px;
  display: flex;
  gap: 10px;
}
.material-schedule {
  display: grid;
  gap: 8px;
  padding: 12px;
  border: 1px solid #2d6796;
  background: rgba(6,26,51,.72);
}
.material-schedule span {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(158,219,255,.18);
}
.life-print-room {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 18px;
  color: #f2f2ea;
}
.press-header {
  padding: 20px;
  border: 1px solid #3d4438;
  background: #1d211c;
}
.press-matrix {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}
.press-matrix button {
  min-height: 210px;
  display: grid;
  align-content: start;
  gap: 14px;
  padding: 16px;
  border-color: #3d4438;
  background: #1d211c;
  text-align: left;
}
.press-matrix .press-2 {
  border-color: #ffb000;
}
.press-matrix .press-2 em {
  color: #ffb000;
}
.press-card-top {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: #f2f2ea;
}
.press-card-top em {
  font-style: italic;
}
.press-gauge {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
}
.press-gauge i {
  height: 10px;
  width: var(--load);
  min-width: 24px;
  max-width: 100%;
  display: block;
  border-radius: 999px;
  background: #d6ff3f;
  box-shadow: 0 0 18px rgba(214,255,63,.26);
}
.press-gauge strong {
  font-size: 13px;
}
.press-tasks {
  display: grid;
  gap: 7px;
  margin: 0;
  padding: 0;
  list-style: none;
  color: rgba(242,242,234,.72);
  font-size: 13px;
}
.press-tasks li {
  padding-left: 14px;
  position: relative;
}
.press-tasks li::before {
  content: "";
  position: absolute;
  left: 0;
  top: .65em;
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #ffb000;
}
.dry-rack-meter {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 6px;
  padding: 12px;
  border: 1px solid #3d4438;
  background: #171a16;
}
.dry-rack-meter span {
  min-height: 24px;
  border: 1px solid #3d4438;
  background: #222820;
}
.dry-rack-meter .loaded {
  background: #d6ff3f;
}
.ink-batch-table {
  display: grid;
  gap: 8px;
  padding: 12px;
  border: 1px solid #3d4438;
  background: #1d211c;
}
.ink-batch-table span {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  gap: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid #3d4438;
}
.ink-batch-table i,
.ink-batch-table em {
  font-style: normal;
}
.ink-service {
  border-color: #3d4438;
  background: #1d211c;
}
.alarm-strip span {
  border-bottom-color: #3d4438;
}
.admin-console {
  min-height: 1100px;
  display: grid;
  grid-template-columns: 248px minmax(0, 1fr);
  color: #1f2937;
  background: #f3f6fb;
}
.admin-sidebar {
  min-height: 1100px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 18px 0 20px;
  color: #334155;
  background: #ffffff;
  border-right: 1px solid #e5ebf3;
  box-shadow: 4px 0 18px rgba(15, 23, 42, .035);
}
.admin-brand {
  min-height: 48px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 18px;
  color: #111827;
  text-decoration: none;
  font-weight: 900;
}
.admin-brand span {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  color: #ffffff;
  background: linear-gradient(135deg, #1677ff, #6ee7ff);
  border-radius: 7px;
  font-size: 13px;
}
.admin-menu {
  display: grid;
  gap: 14px;
}
.admin-menu-group {
  display: grid;
  gap: 4px;
}
.admin-menu-group > span {
  padding: 0 22px;
  color: #94a3b8;
  font-size: 12px;
  line-height: 28px;
}
.admin-menu button {
  width: 100%;
  min-height: 42px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 18px;
  color: #475569;
  background: transparent;
  border: 0;
  border-left: 4px solid transparent;
  font-weight: 800;
  text-align: left;
  cursor: pointer;
}
.admin-menu button i {
  width: 26px;
  color: #94a3b8;
  font-style: normal;
  font-size: 12px;
}
.admin-menu button.active {
  color: var(--primary);
  background: #edf6ff;
  border-left-color: var(--primary);
}
.admin-menu button.active i {
  color: var(--primary);
}
.admin-side-card {
  display: grid;
  gap: 10px;
  margin: auto 12px 0;
  padding: 14px;
  color: #334155;
  background: #f8fafc;
  border: 1px solid #e5ebf3;
  border-radius: 8px;
}
.admin-side-card span {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: #64748b;
  font-size: 13px;
}
.admin-side-card em {
  color: #111827;
  font-style: normal;
}
.admin-shell {
  min-width: 0;
  background: #f3f6fb;
}
.admin-topbar {
  min-height: 64px;
  display: grid;
  grid-template-columns: auto minmax(160px, auto) minmax(240px, 520px) minmax(0, 1fr);
  align-items: center;
  gap: 18px;
  padding: 0 22px;
  background: #ffffff;
  border-bottom: 1px solid #e5ebf3;
  box-shadow: 0 2px 10px rgba(15, 23, 42, .04);
}
.admin-icon {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  color: #475569;
  background: #f8fafc;
  border: 1px solid #e5ebf3;
  border-radius: 6px;
  font-weight: 900;
  cursor: pointer;
}
.admin-breadcrumb {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #94a3b8;
  font-size: 14px;
}
.admin-breadcrumb b {
  color: #111827;
}
.admin-search {
  min-height: 38px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  color: #94a3b8;
  background: #f8fafc;
  border: 1px solid #e5ebf3;
  border-radius: 6px;
}
.admin-search span,
.toolbar-search span {
  color: #94a3b8;
  font-size: 13px;
  font-weight: 800;
}
.admin-search input,
.toolbar-search input {
  width: 100%;
  min-height: 34px;
  color: #111827;
  background: transparent;
  border: 0;
  outline: 0;
}
.admin-top-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
}
.admin-avatar {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  color: #ffffff;
  background: #8b5cf6;
  border-radius: 999px;
  font-weight: 900;
}
.admin-workspace {
  display: grid;
  gap: 14px;
  padding: 14px 18px 28px;
}
.admin-tabs {
  display: flex;
  align-items: center;
  gap: 4px;
  min-height: 42px;
  background: #ffffff;
  border-bottom: 1px solid #e5ebf3;
}
.admin-tabs button {
  min-height: 42px;
  padding: 0 20px;
  color: #64748b;
  background: transparent;
  border: 0;
  border-bottom: 3px solid transparent;
  font-weight: 900;
  cursor: pointer;
}
.admin-tabs button.active {
  color: var(--primary);
  border-bottom-color: var(--primary);
}
.admin-title-row,
.panel-heading {
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}
.admin-title-row h1 {
  font-size: 22px;
  line-height: 1.2;
}
.admin-title-row .kicker {
  margin-bottom: 4px;
  color: #64748b;
  font-size: 12px;
}
.admin-kpi-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}
.admin-kpi,
.shortcut-panel,
.task-panel,
.chart-panel,
.ranking-panel,
.mini-panel,
.calendar-panel {
  background: #ffffff;
  border: 1px solid #e5ebf3;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(15, 23, 42, .035);
}
.admin-kpi {
  min-height: 92px;
  display: grid;
  align-content: center;
  gap: 8px;
  padding: 16px;
}
.admin-kpi span {
  color: #64748b;
  font-size: 14px;
  font-weight: 800;
}
.admin-kpi strong {
  color: #111827;
  font-size: 24px;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
.admin-kpi em {
  color: var(--primary);
  font-style: normal;
  font-size: 12px;
  font-weight: 900;
}
.shortcut-panel {
  display: grid;
  gap: 12px;
  padding: 14px 16px;
}
.shortcut-panel h2,
.task-panel h2,
.chart-panel h2,
.ranking-panel h2,
.mini-panel h2,
.calendar-panel h2 {
  margin: 0;
  color: #1f2937;
  font-size: 18px;
  line-height: 1.2;
}
.shortcut-row {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
}
.shortcut-card {
  width: 108px;
  min-height: 88px;
  display: grid;
  justify-items: center;
  gap: 6px;
  padding: 10px;
  color: #475569;
  background: #ffffff;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
}
.shortcut-card i {
  width: 46px;
  height: 46px;
  display: block;
  background: var(--primary);
  border-radius: 10px;
}
.shortcut-2 i { background: #ff6b6b; }
.shortcut-3 i { background: #22c55e; }
.shortcut-card b {
  color: #111827;
  font-size: 13px;
}
.shortcut-card span {
  color: #94a3b8;
  font-size: 12px;
}
.task-panel {
  display: grid;
  gap: 14px;
  padding: 14px 16px 16px;
}
.panel-heading p {
  margin-top: 4px;
  color: #64748b;
  font-size: 13px;
}
.table-toolbar {
  display: grid;
  grid-template-columns: minmax(260px, 1.3fr) minmax(220px, .8fr) auto;
  gap: 10px;
  align-items: center;
  padding: 10px;
  background: #f8fafc;
  border: 1px solid #e5ebf3;
  border-radius: 8px;
}
.date-range,
.toolbar-search {
  min-height: 38px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 12px;
  color: #334155;
  background: #ffffff;
  border: 1px solid #e5ebf3;
  border-radius: 6px;
  font-variant-numeric: tabular-nums;
}
.date-range b {
  color: #94a3b8;
}
.toolbar-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
.toolbar-buttons button,
.segmented button,
.calendar-panel button,
.row-action {
  min-height: 36px;
  padding: 0 12px;
  color: #475569;
  background: #ffffff;
  border: 1px solid #e5ebf3;
  border-radius: 6px;
  font-weight: 800;
  cursor: pointer;
}
.admin-table-wrap {
  overflow-x: auto;
  border: 1px solid #e5ebf3;
  border-radius: 8px;
}
.admin-table {
  width: 100%;
  min-width: 920px;
  border-collapse: collapse;
  color: #334155;
  background: #ffffff;
  font-size: 13px;
}
.admin-table th,
.admin-table td {
  height: 46px;
  padding: 0 14px;
  border-bottom: 1px solid #eef2f7;
  text-align: left;
  white-space: nowrap;
}
.admin-table th {
  color: #64748b;
  background: #f6f8fc;
  font-weight: 900;
}
.admin-table a {
  color: var(--primary);
  font-weight: 900;
  text-decoration: none;
}
.status-chip {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 0 8px;
  color: #166534;
  background: #dcfce7;
  border-radius: 4px;
  font-weight: 900;
}
.status-chip.pending {
  color: #1d4ed8;
  background: #dbeafe;
}
.status-chip.warn {
  color: #b45309;
  background: #fef3c7;
}
.progress-line {
  min-width: 92px;
  display: inline-grid;
  grid-template-columns: minmax(48px, 1fr) auto;
  align-items: center;
  gap: 8px;
  color: #64748b;
  font-variant-numeric: tabular-nums;
}
.progress-line i {
  height: 6px;
  display: block;
  background: linear-gradient(90deg, var(--primary) var(--progress), #e5ebf3 0);
  border-radius: 999px;
}
.admin-dashboard-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(280px, .65fr);
  gap: 14px;
}
.chart-panel,
.ranking-panel,
.mini-panel,
.calendar-panel {
  padding: 14px 16px;
}
.segmented {
  display: flex;
  align-items: center;
  gap: 0;
}
.segmented button {
  border-radius: 0;
}
.segmented button:first-child {
  border-radius: 6px 0 0 6px;
}
.segmented button:last-child {
  border-radius: 0 6px 6px 0;
}
.admin-chart {
  height: 250px;
  margin-top: 16px;
  display: flex;
  align-items: end;
  gap: 12px;
  padding: 18px 18px 28px;
  background:
    repeating-linear-gradient(0deg, transparent 0 34px, #e5ebf3 35px 36px),
    linear-gradient(180deg, #ffffff, #fbfdff);
  border: 1px solid #e5ebf3;
  border-radius: 8px;
}
.admin-chart i {
  flex: 1;
  min-width: 8px;
  border-radius: 3px 3px 0 0;
  background: linear-gradient(180deg, #60a5fa, var(--primary));
}
.ranking-panel ol {
  display: grid;
  gap: 10px;
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
}
.ranking-panel li {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  color: #64748b;
}
.ranking-panel li span {
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  color: #ffffff;
  background: #111827;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 900;
}
.ranking-panel li:nth-child(n+4) span {
  background: #94a3b8;
}
.ranking-panel li b {
  color: #475569;
}
.ranking-panel li em {
  color: #64748b;
  font-style: normal;
  font-variant-numeric: tabular-nums;
}
.approval-tabs {
  display: flex;
  gap: 18px;
  margin-top: 12px;
  border-bottom: 1px solid #e5ebf3;
}
.approval-tabs span {
  padding-bottom: 10px;
  color: #64748b;
  font-weight: 900;
}
.approval-tabs .active {
  color: var(--primary);
  border-bottom: 3px solid var(--primary);
}
.approval-list {
  display: grid;
  gap: 8px;
  margin-top: 14px;
}
.approval-list button {
  min-height: 42px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 12px;
  color: #475569;
  background: #f8fafc;
  border: 1px solid #e5ebf3;
  border-radius: 6px;
  cursor: pointer;
}
.approval-list span {
  color: var(--primary);
  font-weight: 900;
}
.calendar-strip {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 8px;
  margin-top: 14px;
  padding: 12px;
  color: #64748b;
  background: #f8fafc;
  border-radius: 8px;
  text-align: center;
}
.calendar-strip span,
.calendar-strip b {
  min-height: 34px;
  display: grid;
  place-items: center;
}
.calendar-strip b:first-of-type {
  color: #ffffff;
  background: var(--primary);
  border-radius: 6px;
}
.deco-foyer {
  min-height: 860px;
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr) 260px;
  grid-template-rows: minmax(0, 1fr) 190px;
  gap: 18px;
  align-items: stretch;
}
.deco-wing,
.deco-centerpiece,
.deco-floorplan {
  position: relative;
  overflow: hidden;
  color: var(--text);
  background: linear-gradient(135deg, rgba(212,175,55,.12), transparent 32%), var(--surface);
  border: 1px solid var(--primary);
  border-radius: var(--panel-radius);
  box-shadow: inset 0 0 0 1px rgba(212,175,55,.26), var(--shadow);
}
.deco-wing {
  display: grid;
  align-content: start;
  gap: 18px;
  padding: 22px;
}
.deco-wing::before,
.deco-centerpiece::before,
.deco-floorplan::before {
  content: "";
  position: absolute;
  inset: 14px;
  pointer-events: none;
  border: 1px solid rgba(212,175,55,.44);
}
.deco-rule {
  width: 70px;
  height: 70px;
  display: block;
  margin: 0 auto;
  border: 1px solid var(--primary);
  transform: rotate(45deg);
  background: rgba(212,175,55,.10);
}
.deco-proof-list,
.deco-availability {
  display: grid;
  gap: 12px;
}
.deco-proof-list span,
.deco-availability span {
  display: grid;
  gap: 6px;
  padding: 12px;
  border-top: 1px solid rgba(212,175,55,.34);
  color: var(--muted);
}
.deco-proof-list b,
.deco-availability b,
.deco-availability em {
  color: var(--primary);
  font-style: normal;
}
.deco-centerpiece {
  display: grid;
  place-items: center;
  align-content: center;
  gap: 18px;
  padding: 42px 48px;
  text-align: center;
}
.deco-monogram {
  width: 92px;
  height: 92px;
  display: grid;
  place-items: center;
  color: #0e1020;
  background: linear-gradient(135deg, #f9e79f, #d4af37 52%, #8c6f20);
  clip-path: polygon(50% 0, 100% 28%, 100% 72%, 50% 100%, 0 72%, 0 28%);
  font-size: 28px;
  font-weight: 950;
}
.deco-centerpiece h1 {
  max-width: 740px;
  font-size: clamp(44px, 5vw, 72px);
  line-height: .98;
}
.deco-centerpiece p:not(.kicker) {
  max-width: 680px;
}
.deco-metrics {
  width: min(100%, 620px);
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}
.deco-metrics span {
  min-height: 92px;
  display: grid;
  place-items: center;
  gap: 6px;
  padding: 12px;
  border: 1px solid rgba(212,175,55,.46);
  color: var(--muted);
}
.deco-metrics strong {
  color: var(--primary);
  font-size: 26px;
}
.deco-floorplan {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  padding: 22px;
}
.deco-floorplan span {
  min-height: 110px;
  border: 1px solid rgba(212,175,55,.42);
  background:
    linear-gradient(90deg, rgba(212,175,55,.16) 1px, transparent 1px),
    linear-gradient(0deg, rgba(212,175,55,.10) 1px, transparent 1px);
  background-size: 28px 28px;
}
.deco-floorplan b {
  position: absolute;
  left: 50%;
  bottom: 18px;
  padding: 6px 14px;
  color: #0e1020;
  background: var(--primary);
  transform: translateX(-50%);
}
.material-gallery {
  min-height: 820px;
  display: grid;
  grid-template-columns: .82fr 1.15fr .9fr;
  gap: 24px;
  align-items: stretch;
}
.material-intro,
.material-object-study,
.material-notes {
  background: color-mix(in srgb, var(--surface), var(--bg) 10%);
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  box-shadow: var(--shadow);
}
.material-intro {
  display: grid;
  align-content: end;
  gap: 18px;
  padding: 28px;
}
.material-intro h1 {
  font-size: clamp(36px, 4.4vw, 56px);
  line-height: 1.02;
  overflow-wrap: normal;
  word-break: normal;
}
.material-object-study {
  display: grid;
  align-content: center;
  gap: 20px;
  padding: 30px;
}
.clay-object {
  position: relative;
  min-height: 500px;
  border-radius: 48% 52% 44% 56%;
  background:
    radial-gradient(circle at 42% 34%, rgba(255,250,240,.52), transparent 18%),
    radial-gradient(circle at 58% 58%, rgba(95,111,82,.20), transparent 30%),
    linear-gradient(145deg, #d7b797, #8f6c54 62%, #5f6f52);
  box-shadow: inset 18px 20px 48px rgba(48,42,34,.18), 0 24px 60px rgba(77,61,43,.16);
}
.clay-object span {
  position: absolute;
  border: 1px solid rgba(255,250,240,.34);
  border-radius: 50%;
}
.clay-object span:nth-child(1) { inset: 16% 20%; transform: rotate(-8deg); }
.clay-object span:nth-child(2) { left: 20%; top: 42%; width: 58%; height: 20%; }
.clay-object span:nth-child(3) { left: 34%; top: 18%; width: 34%; height: 62%; }
.material-caption {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}
.material-caption span {
  display: grid;
  gap: 6px;
  padding: 12px;
  border-top: 1px solid var(--border);
  color: var(--muted);
}
.material-caption strong {
  color: var(--text);
  font-size: 22px;
}
.material-notes {
  display: grid;
  align-content: start;
  gap: 16px;
  padding: 24px;
}
.quiet-features {
  display: grid;
  gap: 12px;
}
.quiet-features .feature-block {
  padding: 14px 0;
  background: transparent;
  border-width: 1px 0 0;
  box-shadow: none;
}
.object-ledger {
  display: grid;
  gap: 10px;
}
.object-ledger span {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
  color: var(--muted);
}
.object-ledger em {
  color: var(--primary);
  font-style: normal;
  font-weight: 900;
}
.swiss-archive {
  min-height: 940px;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  color: var(--text);
  background: var(--surface);
  border: 2px solid var(--text);
  box-shadow: none;
}
.swiss-masthead {
  min-height: 82px;
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr) auto auto;
  align-items: stretch;
  border-bottom: 2px solid var(--text);
}
.swiss-masthead > span,
.swiss-masthead > strong,
.swiss-masthead nav,
.swiss-masthead .text-action {
  display: flex;
  align-items: center;
  padding: 14px 18px;
  border-right: 1px solid var(--border);
}
.swiss-masthead > span {
  font-size: 12px;
  font-weight: 900;
  text-transform: uppercase;
}
.swiss-masthead > strong {
  font-size: clamp(22px, 3vw, 42px);
  line-height: .95;
  text-transform: uppercase;
}
.swiss-masthead nav {
  gap: 18px;
}
.swiss-masthead nav span {
  display: grid;
  gap: 4px;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
}
.swiss-masthead nav b {
  color: var(--primary);
}
.swiss-masthead .text-action {
  justify-content: center;
  border-right: 0;
  border-bottom: 0;
  white-space: nowrap;
}
.swiss-grid {
  min-height: 840px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 180px minmax(260px, .82fr);
  grid-template-rows: 180px minmax(280px, 1fr) auto;
}
.swiss-lead {
  grid-row: 1 / span 3;
  display: grid;
  align-content: start;
  gap: 22px;
  padding: 32px;
  border-right: 2px solid var(--text);
}
.swiss-lead h1 {
  max-width: 780px;
  font-size: clamp(54px, 7vw, 104px);
  line-height: .88;
  text-transform: uppercase;
  overflow-wrap: normal;
  word-break: normal;
}
.swiss-lead p {
  max-width: 620px;
}
.swiss-lead .primary-action {
  justify-self: start;
  margin-top: 12px;
  color: var(--surface);
  background: var(--text);
  border-color: var(--text);
}
.swiss-number {
  display: grid;
  place-items: center;
  color: var(--primary);
  border-right: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  font-size: clamp(86px, 11vw, 150px);
  font-weight: 950;
  line-height: .8;
}
.swiss-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-bottom: 1px solid var(--border);
}
.swiss-metrics span {
  display: grid;
  align-content: center;
  gap: 8px;
  padding: 18px;
  border-right: 1px solid var(--border);
  color: var(--muted);
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
}
.swiss-metrics span:last-child {
  border-right: 0;
}
.swiss-metrics strong {
  color: var(--text);
  font-size: 30px;
  line-height: 1;
}
.swiss-object-board {
  grid-column: 2 / 4;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-bottom: 1px solid var(--border);
}
.swiss-object {
  position: relative;
  min-height: 310px;
  display: grid;
  align-content: end;
  gap: 10px;
  padding: 18px;
  overflow: hidden;
  border-right: 1px solid var(--border);
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--primary), transparent 84%), transparent 46%),
    repeating-linear-gradient(0deg, transparent 0 22px, color-mix(in srgb, var(--border), transparent 58%) 22px 23px);
}
.swiss-object:last-child {
  border-right: 0;
}
.swiss-object::before {
  content: "";
  position: absolute;
  inset: 20px 18px auto;
  height: 42%;
  border: 2px solid var(--text);
  background:
    linear-gradient(90deg, var(--text) 0 18%, transparent 18% 26%, var(--primary) 26% 44%, transparent 44%),
    color-mix(in srgb, var(--surface), var(--bg) 12%);
}
.swiss-object.crop-2::before {
  inset: 42px 22px auto;
  height: 36%;
  background:
    linear-gradient(135deg, var(--text) 0 28%, transparent 28% 56%, var(--primary) 56%),
    color-mix(in srgb, var(--surface), var(--bg) 12%);
}
.swiss-object.crop-3::before {
  inset: 26px 34px auto 16px;
  height: 48%;
  background:
    repeating-linear-gradient(90deg, var(--text) 0 8px, transparent 8px 18px),
    color-mix(in srgb, var(--surface), var(--bg) 12%);
}
.swiss-object span,
.swiss-object b,
.swiss-object p {
  position: relative;
}
.swiss-object span {
  color: var(--primary);
  font-size: 12px;
  font-weight: 900;
  text-transform: uppercase;
}
.swiss-object b {
  text-transform: uppercase;
}
.swiss-object p {
  max-width: 28ch;
  margin: 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.35;
}
.swiss-source-table {
  grid-column: 2 / 4;
  display: grid;
  align-content: start;
  padding: 18px;
}
.swiss-source-table h3 {
  margin-bottom: 10px;
  font-size: 14px;
  text-transform: uppercase;
}
.swiss-source-table span {
  min-height: 42px;
  display: grid;
  grid-template-columns: 80px minmax(0, 1fr) auto;
  align-items: center;
  gap: 14px;
  border-top: 1px solid var(--border);
  font-size: 14px;
}
.swiss-source-table b,
.swiss-source-table em {
  color: var(--primary);
  font-style: normal;
  font-weight: 900;
  text-transform: uppercase;
}
.ink-scroll {
  min-height: 820px;
  display: grid;
  grid-template-columns: 130px minmax(0, 1fr) 340px;
  gap: 28px;
  align-items: stretch;
  border-top: 2px solid var(--text);
  border-bottom: 2px solid var(--text);
  padding: 22px 0;
}
.ink-rail,
.scroll-story,
.scroll-index {
  background: color-mix(in srgb, var(--surface), var(--bg) 6%);
}
.ink-rail {
  display: grid;
  align-content: start;
  gap: 18px;
  padding: 0 16px;
  border-right: 1px solid var(--border);
}
.ink-rail > b {
  width: 62px;
  height: 62px;
  display: grid;
  place-items: center;
  color: #fffdf7;
  background: var(--accent);
  font-size: 18px;
}
.ink-rail span {
  display: grid;
  gap: 6px;
  color: var(--muted);
  writing-mode: vertical-rl;
}
.ink-rail strong {
  color: var(--text);
}
.scroll-story {
  position: relative;
  display: grid;
  align-content: start;
  gap: 20px;
  padding: 22px 32px;
}
.scroll-story h1 {
  max-width: 820px;
  font-size: clamp(46px, 6vw, 86px);
  line-height: .98;
}
.seal-action {
  justify-self: start;
  width: 84px;
  height: 84px;
  padding: 8px;
  border-radius: 0;
  line-height: 1.1;
}
.ink-wash-field {
  min-height: 260px;
  position: relative;
  overflow: hidden;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  background:
    radial-gradient(ellipse at 24% 42%, rgba(31,31,28,.16), transparent 24%),
    radial-gradient(ellipse at 72% 54%, rgba(31,31,28,.10), transparent 32%);
}
.ink-wash-field span {
  position: absolute;
  height: 1px;
  background: rgba(31,31,28,.44);
}
.ink-wash-field span:nth-child(1) { left: 8%; right: 18%; top: 34%; }
.ink-wash-field span:nth-child(2) { left: 18%; right: 8%; top: 54%; }
.ink-wash-field span:nth-child(3) { left: 30%; right: 24%; top: 72%; }
.scroll-index {
  display: grid;
  align-content: start;
  gap: 16px;
  padding: 0 18px;
  border-left: 1px solid var(--border);
}
.tea-lots,
.source-notes {
  display: grid;
  gap: 10px;
}
.tea-lots span {
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr) auto;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid var(--border);
}
.tea-lots b,
.tea-lots em {
  color: var(--accent);
  font-style: normal;
}
.source-notes article {
  padding: 12px 0;
  border-top: 1px solid var(--border);
}
.source-notes p {
  font-size: 14px;
}
.ink-landscape {
  min-height: 940px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 330px;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: 20px;
}
.scroll-paper,
.tea-ledger,
.provenance-strip {
  background: color-mix(in srgb, var(--surface), var(--bg) 8%);
  border: 1px solid var(--border);
  box-shadow: none;
}
.scroll-paper {
  grid-row: 1 / span 2;
  position: relative;
  min-height: 900px;
  padding: 34px;
  overflow: hidden;
  background:
    radial-gradient(circle at 24% 18%, rgba(31,31,28,.08), transparent 22%),
    radial-gradient(circle at 78% 72%, rgba(196,30,58,.08), transparent 18%),
    color-mix(in srgb, var(--surface), var(--bg) 6%);
}
.scroll-paper::before {
  content: "";
  position: absolute;
  inset: 18px;
  border: 1px solid color-mix(in srgb, var(--border), transparent 16%);
  pointer-events: none;
}
.seal-stack {
  position: absolute;
  top: 34px;
  right: 34px;
  z-index: 2;
  display: grid;
  gap: 10px;
  justify-items: end;
}
.seal-stack b {
  width: 74px;
  height: 74px;
  display: grid;
  place-items: center;
  color: #fffdf7;
  background: var(--accent);
  border: 2px solid var(--accent);
  font-size: 24px;
  line-height: 1;
}
.seal-stack span {
  max-height: 180px;
  color: var(--accent);
  font-size: 12px;
  font-weight: 900;
  line-height: 1.2;
  text-transform: uppercase;
  writing-mode: vertical-rl;
}
.ink-copy {
  position: relative;
  z-index: 1;
  max-width: 790px;
  display: grid;
  gap: 18px;
}
.ink-copy h1 {
  max-width: 800px;
  font-size: clamp(50px, 6.4vw, 96px);
  line-height: .98;
}
.ink-copy p:not(.kicker) {
  max-width: 610px;
}
.ink-copy .seal-action {
  margin-top: 6px;
}
.ink-landscape-field {
  position: relative;
  z-index: 1;
  min-height: 500px;
  margin-top: 58px;
  overflow: hidden;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  background:
    radial-gradient(ellipse at 28% 62%, rgba(31,31,28,.16), transparent 24%),
    radial-gradient(ellipse at 68% 44%, rgba(31,31,28,.10), transparent 28%),
    linear-gradient(180deg, transparent, rgba(46,139,87,.08));
}
.ink-landscape-field span {
  position: absolute;
  display: block;
}
.ink-landscape-field .mist {
  border-radius: 999px;
  background: rgba(31,31,28,.10);
  filter: blur(18px);
}
.mist-a {
  width: 38%;
  height: 22%;
  left: 12%;
  top: 22%;
}
.mist-b {
  width: 46%;
  height: 26%;
  right: 8%;
  top: 46%;
}
.ink-landscape-field .mountain {
  height: 170px;
  border-top: 2px solid rgba(31,31,28,.48);
  border-radius: 52% 48% 0 0;
  transform: skewX(-12deg) rotate(-2deg);
}
.mountain-a {
  width: 420px;
  left: 8%;
  bottom: 118px;
}
.mountain-b {
  width: 520px;
  right: 8%;
  bottom: 70px;
  opacity: .72;
}
.river-line {
  left: 10%;
  right: 8%;
  bottom: 68px;
  height: 1px;
  background: rgba(31,31,28,.44);
}
.tea-ledger {
  display: grid;
  align-content: start;
  gap: 16px;
  padding: 20px;
  border-left: 2px solid var(--text);
}
.tea-ledger h3 {
  font-size: 18px;
  text-transform: uppercase;
}
.provenance-strip {
  grid-column: 2;
  display: grid;
  gap: 12px;
  padding: 20px;
  border-left: 2px solid var(--text);
}
.provenance-strip span {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border);
  color: var(--muted);
  font-size: 13px;
  text-transform: uppercase;
}
.provenance-strip strong {
  color: var(--text);
  font-size: 22px;
  line-height: 1;
}
.blueprint-sheet {
  min-height: 860px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  grid-template-rows: auto minmax(0, 1fr);
  gap: 18px;
}
.sheet-header,
.plan-sheet,
.sheet-callouts {
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  background: color-mix(in srgb, var(--surface), var(--bg) 8%);
  box-shadow: var(--shadow);
}
.sheet-header {
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: end;
  padding: 18px 20px;
}
.sheet-header h1 {
  font-size: clamp(34px, 4vw, 54px);
  line-height: 1.04;
}
.plan-sheet {
  position: relative;
  overflow: hidden;
  min-height: 680px;
  padding: 18px;
  background:
    linear-gradient(rgba(158,219,255,.10) 1px, transparent 1px),
    linear-gradient(90deg, rgba(158,219,255,.10) 1px, transparent 1px),
    color-mix(in srgb, var(--surface), var(--bg) 8%);
  background-size: 32px 32px;
}
.coordinate-ruler {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  color: var(--muted);
  font-size: 12px;
  text-transform: uppercase;
}
.plan-graph {
  position: absolute;
  inset: 70px 44px 64px;
}
.bp-node {
  position: absolute;
  width: 128px;
  min-height: 76px;
  display: grid;
  align-content: center;
  gap: 4px;
  padding: 10px;
  color: var(--text);
  background: color-mix(in srgb, var(--surface), var(--bg) 18%);
  border: 1px solid var(--accent);
  border-radius: 2px;
  box-shadow: 0 0 0 1px rgba(158,219,255,.24);
}
.bp-node strong {
  color: var(--primary);
  font-size: 22px;
}
.bp-1 { left: 8%; top: 8%; }
.bp-2 { right: 10%; top: 32%; }
.bp-3 { left: 42%; bottom: 8%; }
.bp-edge {
  position: absolute;
  height: 1px;
  background: repeating-linear-gradient(90deg, var(--accent) 0 10px, transparent 10px 15px);
  transform-origin: left center;
}
.bp-e1 { left: 20%; top: 21%; width: 48%; transform: rotate(18deg); }
.bp-e2 { right: 22%; top: 45%; width: 34%; transform: rotate(126deg); }
.bp-e3 { left: 24%; bottom: 24%; width: 42%; transform: rotate(-22deg); }
.dimension-lines {
  position: absolute;
  left: 30px;
  right: 30px;
  bottom: 22px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.dimension-lines span {
  height: 24px;
  border-top: 1px solid var(--accent);
  border-left: 1px solid var(--accent);
  border-right: 1px solid var(--accent);
}
.sheet-callouts {
  display: grid;
  align-content: start;
  gap: 16px;
  padding: 18px;
}
.callout-list {
  display: grid;
  gap: 10px;
}
.callout-list span {
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr) auto;
  gap: 10px;
  padding: 10px;
  border: 1px solid var(--border);
  color: var(--muted);
}
.callout-list b,
.callout-list em {
  color: var(--accent);
  font-style: normal;
}
.sheet-features {
  display: grid;
  gap: 10px;
}
.sheet-features .feature-block {
  padding: 12px;
  background: transparent;
}
.industrial-deck {
  min-height: 860px;
  display: grid;
  grid-template-columns: 190px minmax(0, 1fr) 330px;
  grid-template-rows: auto minmax(0, 1fr);
  gap: 14px;
}
.control-header,
.status-filters,
.alarm-board,
.machine-inspector {
  background: color-mix(in srgb, var(--surface), #000 10%);
  border: 1px solid #4b5545;
  border-radius: var(--panel-radius);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.04), var(--shadow);
}
.control-header {
  grid-column: 1 / -1;
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 18px;
  padding: 18px 20px;
}
.control-header h1 {
  font-size: clamp(34px, 4vw, 54px);
  line-height: 1.02;
}
.control-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
}
.status-filters {
  display: grid;
  align-content: start;
  gap: 8px;
  padding: 14px;
}
.status-filters button {
  min-height: 44px;
  padding: 0 12px;
  color: var(--muted);
  background: #171a15;
  border: 1px solid #4b5545;
  border-radius: 0;
  text-align: left;
  font-weight: 900;
}
.status-filters button.active {
  color: #11130f;
  background: var(--accent);
  border-color: var(--accent);
}
.alarm-board {
  overflow: hidden;
  display: grid;
  align-content: start;
}
.alarm-table-wrap {
  overflow-x: auto;
}
.alarm-banner {
  display: grid;
  gap: 6px;
  padding: 16px;
  color: #11130f;
  background: var(--accent);
}
.alarm-banner span {
  min-width: 0;
  color: #11130f;
  font-size: 14px;
  line-height: 1.42;
  overflow-wrap: anywhere;
}
.alarm-table {
  width: 100%;
  min-width: 720px;
  border-collapse: collapse;
  font-size: 13px;
}
.alarm-table th,
.alarm-table td {
  height: 54px;
  padding: 0 14px;
  border-bottom: 1px solid #3d4438;
  text-align: left;
  white-space: nowrap;
}
.alarm-table th {
  color: var(--muted);
  background: #171a15;
  text-transform: uppercase;
}
.alarm-table span,
.alarm-table button {
  display: inline-flex;
  min-height: 28px;
  align-items: center;
  padding: 0 10px;
  border: 1px solid #4b5545;
  border-radius: 0;
  font-weight: 900;
}
.alarm-table .critical {
  color: #11130f;
  background: #ff5b45;
  border-color: #ff5b45;
}
.alarm-table .warning {
  color: #11130f;
  background: var(--accent);
  border-color: var(--accent);
}
.alarm-table .open {
  color: #11130f;
  background: var(--primary);
  border-color: var(--primary);
}
.alarm-table button {
  color: var(--text);
  background: #11130f;
}
.machine-inspector {
  display: grid;
  align-content: start;
  gap: 16px;
  padding: 16px;
}
.gauge-strip {
  display: grid;
  gap: 10px;
}
.gauge-strip span {
  display: grid;
  gap: 8px;
  padding: 14px;
  border: 1px solid #4b5545;
  background: #171a15;
}
.gauge-strip strong {
  color: var(--primary);
  font-size: 30px;
}
.service-evidence {
  display: grid;
  gap: 10px;
}
.service-evidence .feature-block {
  background: #171a15;
  border-color: #4b5545;
}
body.art-deco {
  background:
    linear-gradient(90deg, rgba(212,175,55,.16) 1px, transparent 1px),
    linear-gradient(0deg, rgba(212,175,55,.10) 1px, transparent 1px),
    radial-gradient(circle at 50% 0%, rgba(45,212,191,.16), transparent 36%),
    #0e1020;
  background-size: 54px 54px, 54px 54px, auto, auto;
}
body.art-deco h1,
body.art-deco h2,
body.wabi-sabi h1,
body.wabi-sabi h2,
body.ink-wash h1,
body.ink-wash h2 {
  font-family: Georgia, "Times New Roman", serif;
}
body.wabi-sabi {
  background:
    linear-gradient(90deg, rgba(95,111,82,.05) 1px, transparent 1px),
    linear-gradient(0deg, rgba(178,107,75,.04) 1px, transparent 1px),
    #f4efe6;
  background-size: 38px 38px;
}
body.ink-wash {
  background:
    linear-gradient(115deg, rgba(31,31,28,.04), transparent 34%),
    linear-gradient(90deg, rgba(196,58,50,.05) 1px, transparent 1px),
    #f8f5ef;
  background-size: auto, 96px 96px, auto;
}
body.blueprint {
  font-family: ui-monospace, "SFMono-Regular", Consolas, monospace;
  background:
    linear-gradient(rgba(158,219,255,.10) 1px, transparent 1px),
    linear-gradient(90deg, rgba(158,219,255,.10) 1px, transparent 1px),
    linear-gradient(rgba(158,219,255,.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(158,219,255,.04) 1px, transparent 1px),
    #061a33;
  background-size: 96px 96px, 96px 96px, 24px 24px, 24px 24px, auto;
}
body.industrial-control {
  background:
    linear-gradient(90deg, rgba(214,255,63,.06) 1px, transparent 1px),
    linear-gradient(0deg, rgba(255,176,0,.04) 1px, transparent 1px),
    #11130f;
  background-size: 40px 40px;
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
.reference-stack {
  display: grid;
  gap: 32px;
  margin-top: 88px;
  padding-top: 30px;
  border-top: 1px solid color-mix(in srgb, var(--border), transparent 30%);
}
.reference-stack .interaction-demo,
.reference-stack .style-lab {
  margin-top: 0;
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
.cute-desk,
.stark-dossier,
.minimal-command,
.layered-catalog,
.neumo-wallet,
.precision-map,
.gradient-launch,
.industrial-room {
  display: grid;
  gap: 18px;
}
.cute-desk-hero,
.cute-workbench,
.dossier-grid,
.command-grid,
.precision-main-grid,
.gradient-stage-grid,
.plant-grid {
  display: grid;
  gap: 18px;
}
.cute-desk-hero {
  grid-template-columns: minmax(0, 1fr) 420px;
  align-items: stretch;
  padding: 22px;
  background:
    linear-gradient(135deg, rgba(255,209,232,.72), transparent 34%),
    linear-gradient(155deg, rgba(142,230,200,.46), transparent 62%),
    var(--surface);
  border: 2px solid var(--border);
  border-radius: var(--panel-radius);
  box-shadow: var(--shadow);
}
.cute-desk-hero h1,
.launch-hero h1,
.shift-header h1 {
  max-width: 920px;
  font-size: 42px;
  line-height: 1.06;
}
.cute-actions,
.catalog-actions,
.shift-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
}
.reward-shelf {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  align-content: stretch;
}
.reward-token {
  min-height: 150px;
  display: grid;
  align-content: center;
  gap: 6px;
  padding: 18px;
  color: var(--text);
  background: color-mix(in srgb, var(--surface), var(--accent) 22%);
  border: 2px solid var(--border);
  border-radius: 28px 18px 28px 18px;
}
.reward-token strong {
  font-size: 30px;
  line-height: 1;
}
.cute-workbench {
  grid-template-columns: minmax(0, 1fr) 360px;
}
.cute-task-board {
  display: grid;
  grid-template-columns: 1.1fr .72fr;
  gap: 16px;
}
.cute-lane,
.cute-side-panel {
  display: grid;
  align-content: start;
  gap: 12px;
  padding: 18px;
  background: var(--surface);
  border: 2px solid var(--border);
  border-radius: var(--panel-radius);
  box-shadow: 4px 4px 0 #ffd1e8;
}
.cute-task-card,
.soft-lane button,
.cute-note-stack article {
  display: grid;
  gap: 8px;
  padding: 14px;
  color: var(--text);
  background: color-mix(in srgb, var(--surface), var(--bg) 20%);
  border: 2px solid var(--border);
  border-radius: 18px;
}
.cute-task-card {
  grid-template-columns: 44px minmax(0, 1fr) auto;
  align-items: start;
}
.cute-task-card p {
  grid-column: 2 / -1;
}
.cute-task-card span,
.soft-lane span,
.cute-note-stack span {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  color: var(--text);
  background: var(--accent);
  border: 2px solid var(--border);
  border-radius: 50%;
  font-weight: 950;
}
.cute-task-card em,
.soft-lane em {
  justify-self: end;
  padding: 6px 10px;
  color: var(--text);
  background: #fff0f7;
  border: 1px solid var(--border);
  border-radius: 999px;
  font-style: normal;
  font-weight: 900;
}
.soft-lane button {
  grid-template-columns: 36px minmax(0, 1fr) auto;
  align-items: center;
}
.cute-note-stack {
  display: grid;
  gap: 12px;
}
.cute-note-stack article {
  grid-template-columns: 40px minmax(0, 1fr);
}
.cute-note-stack p {
  grid-column: 2;
  font-size: 13px;
}
.dossier-masthead,
.shift-header,
.catalog-header,
.precision-topline,
.launch-hero,
.command-topbar {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 18px;
}
.dossier-masthead {
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}
.dossier-masthead nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 18px;
  color: var(--muted);
}
.dossier-grid {
  grid-template-columns: 180px minmax(0, 1.05fr) minmax(420px, .95fr);
  align-items: stretch;
}
.dossier-index,
.dossier-object,
.dossier-proof-wall {
  min-height: 620px;
  padding: 18px;
  background: color-mix(in srgb, var(--surface), var(--bg) 18%);
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
}
.dossier-index {
  align-content: start;
  display: grid;
  gap: 12px;
}
.dossier-index span,
.source-ledger span {
  display: grid;
  gap: 6px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
}
.dossier-index strong {
  color: var(--text);
  font-size: 28px;
}
.dossier-object {
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: 14px;
}
.dossier-frame {
  position: relative;
  overflow: hidden;
  min-height: 500px;
  border: 1px solid var(--border);
  border-radius: var(--media-radius);
  background:
    radial-gradient(circle at 50% 46%, rgba(200,184,255,.30), transparent 22%),
    linear-gradient(135deg, rgba(255,255,255,.08), transparent 42%),
    #050507;
}
.dossier-frame span {
  position: absolute;
  border: 1px solid rgba(255,255,255,.18);
  background: rgba(255,255,255,.05);
}
.dossier-frame span:nth-child(1) { inset: 20% 28%; }
.dossier-frame span:nth-child(2) { left: 12%; right: 58%; top: 12%; bottom: 62%; }
.dossier-frame span:nth-child(3) { right: 14%; bottom: 14%; width: 26%; height: 20%; }
.dossier-caption,
.exhibit-list button,
.source-ledger span {
  color: var(--muted);
}
.dossier-proof-wall {
  display: grid;
  align-content: start;
  gap: 16px;
}
.dossier-proof-wall h1 {
  font-size: 44px;
  line-height: 1.04;
}
.exhibit-list,
.source-ledger {
  display: grid;
  gap: 8px;
}
.exhibit-list button {
  display: grid;
  grid-template-columns: 38px minmax(0, 1fr) auto;
  gap: 12px;
  align-items: center;
  padding: 12px;
  background: rgba(255,255,255,.035);
  border: 1px solid var(--border);
  border-radius: var(--control-radius);
}
.exhibit-list em,
.source-ledger b {
  color: var(--primary);
  font-style: normal;
}
.source-ledger em {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-style: normal;
}
.command-grid {
  grid-template-columns: minmax(0, 1fr) 360px;
}
.command-topbar {
  padding: 18px 20px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
}
.command-topbar h1 {
  font-size: 40px;
  line-height: 1.07;
}
.command-main,
.command-panels {
  display: grid;
  align-content: start;
  gap: 14px;
  min-height: 620px;
  padding: 18px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  box-shadow: var(--shadow);
}
.command-input {
  display: grid;
  grid-template-columns: 32px minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  padding: 14px;
  background: color-mix(in srgb, var(--surface), var(--bg) 10%);
  border: 1px solid var(--border);
  border-radius: var(--control-radius);
}
.command-input span,
.command-result code,
.run-history code {
  font-family: "Courier New", ui-monospace, monospace;
}
.command-input button,
.run-history button {
  color: var(--text);
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--control-radius);
}
.command-result {
  display: grid;
  gap: 12px;
  padding: 18px;
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  background: color-mix(in srgb, var(--surface), var(--primary) 4%);
}
.command-result pre {
  overflow: auto;
  margin: 0;
  padding: 14px;
  color: var(--text);
  background: #f8fafc;
  border: 1px solid var(--border);
  border-radius: var(--control-radius);
}
.run-history,
.command-evidence,
.command-metrics {
  display: grid;
  gap: 10px;
}
.run-history button {
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  padding: 12px;
}
.run-history em {
  font-style: normal;
  color: var(--primary);
  font-weight: 900;
}
.command-metrics {
  grid-template-columns: 1fr;
}
.command-metrics span,
.command-evidence article {
  padding: 14px;
  border: 1px solid var(--border);
  border-radius: var(--control-radius);
  background: color-mix(in srgb, var(--surface), var(--bg) 8%);
}
.command-metrics strong {
  display: block;
  font-size: 26px;
}
.layered-catalog {
  grid-template-columns: minmax(320px, .82fr) minmax(0, 1fr) 310px;
  align-items: stretch;
}
.catalog-header {
  grid-column: 1 / -1;
}
.catalog-header h1 {
  font-size: 40px;
  line-height: 1.06;
}
.material-object-panel,
.layer-detail-panel,
.inventory-rail {
  min-height: 600px;
  padding: 20px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  box-shadow: var(--shadow);
}
.material-object-panel {
  display: grid;
  gap: 18px;
  grid-template-rows: minmax(280px, 1fr) auto;
}
.sample-stack {
  position: relative;
  min-height: 340px;
  border-radius: 28px;
}
.sample-stack span,
.sample-stack strong {
  position: absolute;
  display: grid;
  place-items: center;
  border: 1px solid var(--border);
  border-radius: 28px;
  box-shadow: 0 22px 42px rgba(30,41,59,.12);
}
.sample-stack span:nth-child(1) { inset: 10% 16% 26% 8%; background: #fff2ce; transform: rotate(-7deg); }
.sample-stack span:nth-child(2) { inset: 18% 10% 16% 18%; background: #dff7ee; transform: rotate(4deg); }
.sample-stack span:nth-child(3) { inset: 28% 22% 8% 10%; background: #e7ecff; transform: rotate(-1deg); }
.sample-stack strong {
  right: 20px;
  bottom: 24px;
  width: 92px;
  height: 92px;
  color: #ffffff;
  background: var(--primary);
  font-size: 22px;
}
.swatch-grid,
.spec-sheet,
.inventory-list,
.inventory-metrics {
  display: grid;
  gap: 10px;
}
.swatch-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.material-swatch {
  min-height: 72px;
  padding: 12px;
  background: color-mix(in srgb, var(--surface), var(--accent) 14%);
  border: 1px solid var(--border);
  border-radius: var(--control-radius);
  font-weight: 900;
}
.layer-detail-panel {
  display: grid;
  align-content: start;
  gap: 16px;
}
.spec-sheet article {
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr);
  gap: 8px 12px;
  padding: 14px;
  border: 1px solid var(--border);
  border-radius: var(--control-radius);
  background: color-mix(in srgb, var(--surface), var(--bg) 9%);
}
.spec-sheet article p {
  grid-column: 2;
}
.inventory-metrics span,
.inventory-list button {
  display: grid;
  gap: 6px;
  padding: 14px;
  color: var(--text);
  background: color-mix(in srgb, var(--surface), var(--accent) 8%);
  border: 1px solid var(--border);
  border-radius: var(--control-radius);
}
.inventory-metrics strong {
  font-size: 28px;
}
.inventory-list em {
  color: var(--primary);
  font-style: normal;
  font-weight: 900;
}
.neumo-wallet {
  grid-template-columns: 340px minmax(0, 1fr) 320px;
  gap: 22px;
}
.wallet-panel,
.transfer-console,
.savings-rail {
  min-height: 620px;
  padding: 24px;
  background: var(--surface);
  border: 1px solid rgba(148,163,184,.28);
  border-radius: 28px;
  box-shadow: 18px 18px 42px rgba(148, 163, 184, .45), -18px -18px 42px rgba(255,255,255,.92);
}
.wallet-panel {
  display: grid;
  align-content: start;
  gap: 18px;
}
.wallet-panel h1 {
  font-size: 36px;
  line-height: 1.06;
}
.vault-balance {
  display: grid;
  place-items: center;
  width: 190px;
  height: 190px;
  margin: 10px auto;
  text-align: center;
  border-radius: 50%;
  box-shadow: inset 12px 12px 24px rgba(148,163,184,.34), inset -12px -12px 24px rgba(255,255,255,.88);
}
.vault-balance strong {
  font-size: 42px;
}
.transfer-console {
  display: grid;
  grid-template-columns: minmax(220px, .88fr) minmax(0, 1fr);
  gap: 18px;
}
.transfer-card-stack {
  position: relative;
  min-height: 310px;
}
.transfer-card-stack span {
  position: absolute;
  left: 6%;
  right: 6%;
  min-height: 180px;
  border-radius: 28px;
  border: 1px solid rgba(148,163,184,.30);
  box-shadow: 14px 14px 28px rgba(148,163,184,.32), -12px -12px 24px rgba(255,255,255,.72);
}
.transfer-card-stack span:nth-child(1) { top: 24px; background: #eef3fb; transform: rotate(-5deg); }
.transfer-card-stack span:nth-child(2) { top: 70px; background: #f9edf5; transform: rotate(3deg); }
.transfer-card-stack span:nth-child(3) { top: 118px; background: linear-gradient(135deg, var(--primary), var(--accent)); }
.transfer-pad {
  display: grid;
  align-content: center;
  gap: 10px;
  min-height: 230px;
  padding: 22px;
  border-radius: 24px;
  box-shadow: inset 10px 10px 22px rgba(148,163,184,.34), inset -10px -10px 22px rgba(255,255,255,.86);
}
.transfer-pad strong {
  font-size: 44px;
}
.transfer-pad em {
  color: var(--muted);
  font-style: normal;
}
.goal-wells {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}
.goal-wells button,
.limit-list article,
.soft-metrics span {
  display: grid;
  gap: 8px;
  padding: 14px;
  color: var(--text);
  background: var(--surface);
  border: 1px solid rgba(148,163,184,.28);
  border-radius: 20px;
  box-shadow: 8px 8px 18px rgba(148,163,184,.24), -8px -8px 18px rgba(255,255,255,.76);
}
.goal-wells i {
  height: 8px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--primary) var(--fill), rgba(148,163,184,.22) var(--fill));
}
.savings-rail,
.limit-list,
.soft-metrics {
  display: grid;
  align-content: start;
  gap: 12px;
}
.soft-metrics strong {
  font-size: 28px;
}
.precision-map {
  color: var(--text);
}
.precision-topline {
  padding: 18px;
  background: color-mix(in srgb, var(--surface), var(--bg) 18%);
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
}
.precision-topline h1 {
  font-size: 40px;
  line-height: 1.06;
}
.precision-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(110px, 1fr));
  gap: 10px;
}
.precision-metrics span {
  padding: 12px;
  background: rgba(255,255,255,.04);
  border: 1px solid var(--border);
  border-radius: var(--control-radius);
}
.precision-metrics strong {
  display: block;
  color: var(--accent);
  font-size: 24px;
}
.precision-main-grid {
  grid-template-columns: 260px minmax(0, 1fr) 320px;
}
.span-lanes,
.topology-canvas,
.incident-panel {
  min-height: 650px;
  padding: 18px;
  background: color-mix(in srgb, var(--surface), var(--bg) 14%);
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  box-shadow: var(--shadow);
}
.span-lanes,
.incident-panel,
.incident-evidence {
  display: grid;
  align-content: start;
  gap: 12px;
}
.span-lanes button {
  display: grid;
  grid-template-columns: 70px minmax(0, 1fr);
  gap: 6px 10px;
  padding: 12px;
  color: var(--text);
  background: rgba(255,255,255,.04);
  border: 1px solid var(--border);
  border-radius: var(--control-radius);
}
.span-lanes em {
  grid-column: 2;
  color: var(--accent);
  font-style: normal;
  font-weight: 900;
}
.topology-canvas {
  position: relative;
  overflow: hidden;
  background:
    linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px),
    color-mix(in srgb, var(--surface), var(--bg) 12%);
  background-size: 34px 34px;
}
.topology-command {
  position: absolute;
  left: 18px;
  right: 18px;
  top: 18px;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 10px;
  padding: 12px;
  background: rgba(0,0,0,.28);
  border: 1px solid var(--border);
  border-radius: var(--control-radius);
}
.topology-command button {
  color: #071018;
  background: var(--accent);
  border: 1px solid var(--accent);
  border-radius: var(--control-radius);
}
.topo-node {
  position: absolute;
  width: 104px;
  height: 104px;
  display: grid;
  place-items: center;
  border: 1px solid var(--accent);
  border-radius: 50%;
  background: #09111d;
  box-shadow: 0 0 34px color-mix(in srgb, var(--accent), transparent 48%);
  font-weight: 950;
}
.topo-a { left: 14%; top: 24%; }
.topo-b { left: 46%; top: 18%; }
.topo-c { right: 15%; top: 40%; }
.topo-d { left: 36%; bottom: 20%; }
.topo-edge {
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg, var(--accent), transparent);
  transform-origin: left center;
}
.edge-a { left: 22%; top: 32%; width: 330px; transform: rotate(-8deg); }
.edge-b { left: 54%; top: 30%; width: 260px; transform: rotate(28deg); }
.edge-c { right: 22%; top: 54%; width: 330px; transform: rotate(148deg); }
.edge-d { left: 28%; bottom: 31%; width: 300px; transform: rotate(-22deg); }
.latency-strip {
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 18px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}
.latency-strip span,
.incident-evidence article {
  padding: 12px;
  background: rgba(255,255,255,.04);
  border: 1px solid var(--border);
  border-radius: var(--control-radius);
}
.gradient-launch {
  color: #171322;
}
.launch-hero {
  padding: 22px;
  background:
    radial-gradient(circle at 12% 10%, rgba(255,255,255,.80), transparent 22%),
    linear-gradient(135deg, var(--primary), var(--accent));
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  box-shadow: var(--shadow);
}
.launch-counters {
  display: grid;
  grid-template-columns: repeat(3, minmax(120px, 1fr));
  gap: 10px;
}
.launch-counters span {
  display: grid;
  gap: 4px;
  min-height: 104px;
  padding: 14px;
  background: rgba(255,255,255,.76);
  border: 1px solid var(--border);
  border-radius: 18px;
}
.launch-counters strong {
  font-size: 28px;
}
.gradient-stage-grid {
  grid-template-columns: 260px minmax(0, 1fr) 300px;
}
.launch-rhythm,
.asset-mosaic,
.publish-rail {
  min-height: 610px;
  padding: 18px;
  background: rgba(255,255,255,.82);
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  box-shadow: var(--shadow);
}
.launch-rhythm,
.publish-rail {
  display: grid;
  align-content: start;
  gap: 12px;
}
.launch-rhythm button {
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr);
  gap: 6px 10px;
  padding: 12px;
  color: #171322;
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: var(--control-radius);
}
.launch-rhythm em {
  grid-column: 2;
  color: var(--primary);
  font-style: normal;
  font-weight: 900;
}
.asset-mosaic {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-auto-rows: minmax(150px, auto);
  gap: 14px;
  background:
    radial-gradient(circle at 18% 18%, rgba(255,255,255,.72), transparent 22%),
    linear-gradient(135deg, color-mix(in srgb, var(--primary), white 12%), color-mix(in srgb, var(--accent), white 8%));
}
.asset-stage {
  grid-column: span 2;
  grid-row: span 2;
  display: grid;
  align-content: end;
  gap: 12px;
  padding: 20px;
  color: #ffffff;
  background:
    linear-gradient(135deg, rgba(0,0,0,.18), rgba(0,0,0,.36)),
    radial-gradient(circle at 20% 20%, var(--accent), transparent 34%),
    var(--primary);
  border: 1px solid var(--border);
  border-radius: 24px;
}
.asset-stage b {
  font-size: 42px;
  line-height: 1;
}
.asset-tile,
.audience-card {
  display: grid;
  align-content: start;
  gap: 10px;
  padding: 14px;
  background: rgba(255,255,255,.76);
  border: 1px solid var(--border);
  border-radius: 18px;
}
.asset-tile span {
  font-weight: 950;
}
.audience-card i {
  height: 8px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--primary) 64%, rgba(0,0,0,.10) 64%);
}
.industrial-room {
  color: var(--text);
}
.shift-header {
  padding: 18px;
  background: color-mix(in srgb, var(--surface), #000 10%);
  border: 1px solid #4b5545;
  border-radius: var(--panel-radius);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.04), var(--shadow);
}
.plant-grid {
  grid-template-columns: 280px minmax(0, 1fr) 330px;
}
.line-matrix,
.alarm-room-table,
.lockout-panel {
  min-height: 640px;
  padding: 18px;
  background: color-mix(in srgb, var(--surface), #000 12%);
  border: 1px solid #4b5545;
  border-radius: var(--panel-radius);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.04), var(--shadow);
}
.line-matrix,
.lockout-panel {
  display: grid;
  align-content: start;
  gap: 12px;
}
.line-card {
  display: grid;
  grid-template-columns: 58px minmax(0, 1fr) auto;
  gap: 8px;
  align-items: center;
  min-height: 92px;
  padding: 12px;
  color: var(--text);
  background: rgba(255,255,255,.04);
  border: 1px solid #4b5545;
  border-radius: var(--control-radius);
}
.line-card em {
  color: var(--accent);
  font-style: normal;
  font-weight: 950;
}
.line-card i {
  grid-column: 2 / -1;
  height: 8px;
  color: transparent;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--primary) 62%, rgba(255,255,255,.12) 62%);
}
.alarm-room-head {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 14px;
}
.alarm-room-head span {
  padding: 12px;
  background: rgba(255,255,255,.04);
  border: 1px solid #4b5545;
  border-radius: var(--control-radius);
}
.alarm-room-head strong {
  display: block;
  color: var(--primary);
  font-size: 28px;
}
.alarm-room-table table {
  width: 100%;
  border-collapse: collapse;
}
.alarm-room-table th,
.alarm-room-table td {
  padding: 14px 10px;
  border-bottom: 1px solid #4b5545;
  text-align: left;
}
.alarm-room-table th {
  color: var(--muted);
  font-size: 12px;
  text-transform: uppercase;
}
.alarm-room-table button {
  color: #11130f;
  background: var(--primary);
  border: 1px solid var(--primary);
  border-radius: var(--control-radius);
}
.alarm-room-table .critical,
.alarm-room-table .warning,
.alarm-room-table .open {
  display: inline-flex;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 950;
}
.alarm-room-table .critical {
  color: #11130f;
  background: #ef4444;
}
.alarm-room-table .warning {
  color: #11130f;
  background: var(--accent);
}
.alarm-room-table .open {
  color: #11130f;
  background: var(--primary);
}
.lockout-panel article,
.lockout-log {
  display: grid;
  gap: 8px;
  padding: 12px;
  background: rgba(255,255,255,.04);
  border: 1px solid #4b5545;
  border-radius: var(--control-radius);
}
.lockout-log span {
  color: var(--muted);
}
body.block-brutalism .primary-action,
body.neo-brutalism .primary-action,
body.retro-computing .primary-action {
  border-width: 2px;
  border-radius: 0;
  box-shadow: 6px 6px 0 var(--border);
}
body.cutealism .primary-action {
  border-width: 2px;
  border-radius: 16px;
  box-shadow: 4px 4px 0 #ffd1e8;
}
body.cutealism .secondary-action {
  border-radius: 16px;
  box-shadow: 3px 3px 0 #d8f8ec;
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
body.art-deco .top-nav,
body.art-deco .poster-copy,
body.art-deco .poster-stack,
body.art-deco .deco-wing,
body.art-deco .deco-centerpiece,
body.art-deco .deco-floorplan,
body.art-deco .interaction-copy,
body.art-deco .state-board,
body.art-deco .lab-summary,
body.art-deco .lab-workspace {
  border-color: var(--primary);
  box-shadow: inset 0 0 0 1px rgba(212,175,55,.32), var(--shadow);
}
body.art-deco .poster-copy,
body.art-deco .poster-stack,
body.art-deco .deco-wing,
body.art-deco .deco-centerpiece,
body.art-deco .deco-floorplan {
  position: relative;
  background:
    linear-gradient(135deg, rgba(212,175,55,.12), transparent 28%),
    var(--surface);
}
body.art-deco .poster-copy::before,
body.art-deco .poster-stack::before,
body.art-deco .deco-wing::before,
body.art-deco .deco-centerpiece::before,
body.art-deco .deco-floorplan::before {
  content: "";
  position: absolute;
  inset: 14px;
  pointer-events: none;
  border: 1px solid rgba(212,175,55,.46);
}
body.art-deco .stamp.big {
  color: #0e1020;
  background: linear-gradient(135deg, #f9e79f, #d4af37 42%, #8c6f20);
}
body.art-deco .primary-action,
body.art-deco .tabs button.active,
body.art-deco .toggle-chip[aria-pressed="true"] {
  color: #0e1020;
  background: linear-gradient(135deg, #f9e79f, #d4af37);
  border-color: var(--primary);
}
body.wabi-sabi .object-stage .media {
  background:
    linear-gradient(145deg, rgba(95,111,82,.18), transparent 42%),
    linear-gradient(28deg, rgba(178,107,75,.14), transparent 48%),
    #e5d8c4;
}
body.wabi-sabi .material-intro,
body.wabi-sabi .material-object-study,
body.wabi-sabi .material-notes {
  box-shadow: 0 16px 42px rgba(77,61,43,.08);
}
body.wabi-sabi .material-object-study {
  background:
    linear-gradient(145deg, rgba(95,111,82,.10), transparent 40%),
    color-mix(in srgb, var(--surface), var(--bg) 8%);
}
body.wabi-sabi .object-stage .media::before {
  border-style: dashed;
  transform: rotate(-1deg);
}
body.wabi-sabi .object-stage .media::after,
body.wabi-sabi .material-caption span,
body.wabi-sabi .object-ledger span,
body.wabi-sabi .metric-tile,
body.wabi-sabi .state-pill,
body.wabi-sabi .implementation-list li {
  background: color-mix(in srgb, var(--surface), var(--bg) 18%);
}
body.wabi-sabi .primary-action {
  color: #fffaf0;
  background: var(--primary);
}
body.wabi-sabi .secondary-action,
body.wabi-sabi .queue-card,
body.wabi-sabi .text-action {
  box-shadow: none;
}
body.ink-wash .editorial-index,
body.ink-wash .ink-landscape {
  border-color: var(--text);
}
body.ink-wash .editorial-meta b,
body.ink-wash .ink-rail > b,
body.ink-wash .seal-stack b,
body.ink-wash .primary-action,
body.ink-wash .tabs button.active,
body.ink-wash .toggle-chip[aria-pressed="true"] {
  color: #fffdf7;
  background: var(--accent);
  border-color: var(--accent);
}
body.ink-wash .editorial-meta b {
  width: 58px;
  height: 58px;
  display: grid;
  place-items: center;
  text-align: center;
  line-height: 1.05;
}
body.ink-wash .scroll-story,
body.ink-wash .scroll-index,
body.ink-wash .ink-rail,
body.ink-wash .scroll-paper,
body.ink-wash .tea-ledger,
body.ink-wash .provenance-strip {
  box-shadow: none;
}
body.ink-wash .seal-action {
  color: #fffdf7;
  background: var(--accent);
  border-color: var(--accent);
}
body.ink-wash .feature-block,
body.ink-wash .metric-tile,
body.ink-wash .queue-card,
body.ink-wash .panel,
body.ink-wash .lab-summary,
body.ink-wash .lab-workspace,
body.ink-wash .interaction-copy,
body.ink-wash .state-board {
  box-shadow: none;
}
body.blueprint .node-graph,
body.blueprint .plan-sheet,
body.blueprint .chart,
body.blueprint .media {
  background:
    linear-gradient(rgba(158,219,255,.10) 1px, transparent 1px),
    linear-gradient(90deg, rgba(158,219,255,.10) 1px, transparent 1px),
    color-mix(in srgb, var(--surface), var(--bg) 10%);
  background-size: 32px 32px;
}
body.blueprint .node {
  border-radius: 2px;
  box-shadow: 0 0 0 1px rgba(158,219,255,.36), 0 0 28px rgba(52,211,255,.18);
}
body.blueprint .trace-panel h1 {
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: 46px;
  line-height: 1.04;
  overflow-wrap: normal;
  word-break: normal;
}
body.blueprint .sheet-header h1 {
  font-family: ui-sans-serif, system-ui, sans-serif;
  overflow-wrap: normal;
  word-break: normal;
}
body.blueprint .edge,
body.blueprint .bp-edge,
body.blueprint .process-map article::after {
  background: repeating-linear-gradient(90deg, var(--accent) 0 9px, transparent 9px 14px);
}
body.blueprint .primary-action,
body.blueprint .tabs button.active,
body.blueprint .toggle-chip[aria-pressed="true"] {
  color: #061a33;
  background: var(--primary);
  border-color: var(--primary);
}
body.industrial-control .filter-rail,
body.industrial-control .board-main,
body.industrial-control .board-inspector,
body.industrial-control .ticket-card,
body.industrial-control .control-header,
body.industrial-control .status-filters,
body.industrial-control .alarm-board,
body.industrial-control .machine-inspector,
body.industrial-control .interaction-copy,
body.industrial-control .state-board,
body.industrial-control .lab-summary,
body.industrial-control .lab-workspace {
  border-color: #4b5545;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.04), var(--shadow);
}
body.industrial-control .rail-active,
body.industrial-control .status-filters button.active,
body.industrial-control .primary-action,
body.industrial-control .tabs button.active,
body.industrial-control .toggle-chip[aria-pressed="true"] {
  color: #11130f;
  background: var(--primary);
  border-color: var(--primary);
}
body.industrial-control .ticket-card span,
body.industrial-control .inline-alert,
body.industrial-control .state-pill.warning {
  color: #11130f;
  background: var(--accent);
  border-color: var(--accent);
}
body.industrial-control .inline-alert b,
body.industrial-control .inline-alert span {
  color: #11130f;
}
body.industrial-control .queue-card,
body.industrial-control .metric-tile,
body.industrial-control .feature-block {
  background: color-mix(in srgb, var(--surface), #000 12%);
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
  body.card-grid .page {
    max-width: none;
    padding: 0 0 48px;
  }
  body.card-grid .interaction-demo,
  body.card-grid .style-lab {
    width: min(100% - 28px, 760px);
  }
  .life-aurora,
  .life-stark-contact,
  .life-print-ledger,
  .life-cinema,
  .life-museum-plan,
  .life-interior-samples,
  .life-lamp-console,
  .life-glasshouse,
  .life-festival-wall,
  .life-garden-class,
  .life-deco-theater,
  .life-wabi-repair,
  .life-ink-tea,
  .life-renovation-plan,
  .life-print-room {
    min-height: auto;
    grid-template-columns: 1fr;
  }
  .aurora-notes,
  .darkroom-notes,
  .room-specs,
  .plant-notes,
  .tasting-notes,
  .poster-wall,
  .press-matrix {
    grid-template-columns: 1fr;
  }
  .life-bento-market {
    min-height: auto;
    grid-template-columns: 1fr 1fr;
  }
  .menu-hero,
  .quote-tile {
    grid-column: 1 / -1;
  }
  .material-board,
  .lamp-dial-panel {
    grid-template-columns: 1fr;
  }
  .room-map {
    position: relative;
    right: auto;
    bottom: auto;
    width: 100%;
    margin-top: 22px;
  }
  .contact-title,
  .repair-table,
  .theater-marquee,
  .tea-scroll,
  .loft-plan,
  .greenhouse-map,
  .cinema-screen,
  .floor-plan {
    min-height: 420px;
  }
  .festival-heading,
  .ledger-header,
  .museum-heading,
  .sample-heading,
  .renovation-header,
  .press-header {
    align-items: flex-start;
    grid-template-columns: 1fr;
    flex-direction: column;
  }
  .admin-console {
    min-height: auto;
    grid-template-columns: 1fr;
  }
  .admin-sidebar {
    min-height: auto;
    padding: 12px 14px;
    overflow-x: auto;
  }
  .admin-brand {
    padding: 0;
  }
  .admin-menu {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding-bottom: 2px;
  }
  .admin-menu-group {
    min-width: max-content;
    display: flex;
    gap: 8px;
  }
  .admin-menu-group > span {
    display: none;
  }
  .admin-menu button {
    width: auto;
    min-width: 116px;
    border-left-width: 0;
    border-radius: 6px;
  }
  .admin-side-card {
    display: none;
  }
  .admin-topbar {
    grid-template-columns: auto minmax(0, 1fr);
    gap: 10px;
    padding: 12px 14px;
  }
  .admin-search,
  .admin-top-actions {
    grid-column: 1 / -1;
  }
  .admin-top-actions {
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .admin-workspace {
    padding: 14px;
  }
  .admin-kpi-row,
  .admin-dashboard-grid,
  .table-toolbar {
    grid-template-columns: 1fr;
  }
  .admin-title-row,
  .panel-heading {
    align-items: flex-start;
    flex-direction: column;
  }
  .shortcut-row,
  .toolbar-buttons,
  .segmented {
    width: 100%;
    overflow-x: auto;
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
  .shortcut-card {
    flex: 0 0 108px;
  }
  .admin-chart {
    height: 190px;
  }
  .top-nav,
  .board-toolbar,
  .workflow-head,
  .sheet-header,
  .control-header,
  .cute-desk-hero,
  .dossier-masthead,
  .command-topbar,
  .catalog-header,
  .precision-topline,
  .launch-hero,
  .shift-header {
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
  .editorial-lead h1,
  .swiss-lead h1,
  .ink-copy h1 {
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
  .deco-foyer,
  .deco-floorplan,
  .material-gallery,
  .material-caption,
  .swiss-archive,
  .swiss-masthead,
  .swiss-grid,
  .swiss-object-board,
  .ink-landscape,
  .ink-scroll,
  .blueprint-sheet,
  .industrial-deck,
  .cute-desk,
  .cute-desk-hero,
  .cute-workbench,
  .cute-task-board,
  .reward-shelf,
  .stark-dossier,
  .dossier-grid,
  .minimal-command,
  .command-grid,
  .layered-catalog,
  .neumo-wallet,
  .transfer-console,
  .goal-wells,
  .precision-map,
  .precision-main-grid,
  .precision-metrics,
  .gradient-launch,
  .gradient-stage-grid,
  .launch-counters,
  .asset-mosaic,
  .industrial-room,
  .plant-grid,
  .alarm-room-head,
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
  .deco-foyer,
  .deco-floorplan,
  .material-gallery,
  .material-caption,
  .swiss-archive,
  .swiss-grid,
  .swiss-object-board,
  .swiss-source-table,
  .ink-landscape,
  .scroll-paper,
  .tea-ledger,
  .provenance-strip,
  .ink-scroll,
  .blueprint-sheet,
  .industrial-deck,
  .cute-desk,
  .cute-desk-hero,
  .cute-workbench,
  .cute-task-board,
  .cute-lane,
  .cute-side-panel,
  .stark-dossier,
  .dossier-grid,
  .dossier-index,
  .dossier-object,
  .dossier-proof-wall,
  .minimal-command,
  .command-grid,
  .command-main,
  .command-panels,
  .layered-catalog,
  .material-object-panel,
  .layer-detail-panel,
  .inventory-rail,
  .neumo-wallet,
  .wallet-panel,
  .transfer-console,
  .savings-rail,
  .precision-map,
  .precision-main-grid,
  .span-lanes,
  .topology-canvas,
  .incident-panel,
  .gradient-launch,
  .gradient-stage-grid,
  .launch-rhythm,
  .asset-mosaic,
  .publish-rail,
  .industrial-room,
  .plant-grid,
  .line-matrix,
  .alarm-room-table,
  .lockout-panel,
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
  .control-actions,
  .cute-actions,
  .catalog-actions,
  .shift-actions,
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
  .control-actions > *,
  .cute-actions > *,
  .catalog-actions > *,
  .shift-actions > *,
  .related a,
  .tabs button {
    flex: 1 1 min(100%, 160px);
  }
  .filter-rail,
  .brief-sidebar,
  .comment-stack,
  .phone-panel,
  .deco-foyer,
  .material-gallery,
  .swiss-archive,
  .swiss-grid,
  .swiss-object,
  .ink-landscape,
  .scroll-paper,
  .ink-scroll,
  .blueprint-sheet,
  .industrial-deck,
  .cute-desk-hero,
  .cute-lane,
  .cute-side-panel,
  .dossier-index,
  .dossier-object,
  .dossier-proof-wall,
  .command-main,
  .command-panels,
  .material-object-panel,
  .layer-detail-panel,
  .inventory-rail,
  .wallet-panel,
  .transfer-console,
  .savings-rail,
  .span-lanes,
  .topology-canvas,
  .incident-panel,
  .launch-rhythm,
  .asset-mosaic,
  .publish-rail,
  .line-matrix,
  .alarm-room-table,
  .lockout-panel,
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
  .deco-metrics,
  .deco-floorplan,
  .material-caption,
  .mixer-board,
  .countdown-grid,
  .reward-shelf,
  .cute-task-board,
  .swatch-grid,
  .goal-wells,
  .precision-metrics,
  .launch-counters,
  .asset-mosaic,
  .alarm-room-head,
  .progress-path,
  .state-stack {
    grid-template-columns: 1fr;
  }
  .toolbar-actions {
    justify-content: flex-start;
  }
  .deco-centerpiece {
    padding: 34px 22px;
  }
  .deco-floorplan {
    min-height: auto;
  }
  .material-intro,
  .material-object-study,
  .material-notes {
    min-height: auto;
  }
  .clay-object {
    min-height: 340px;
  }
  .ink-scroll {
    border-top-width: 1px;
    border-bottom-width: 1px;
    padding: 16px 0;
  }
  .ink-rail {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    border-right: 0;
    border-bottom: 1px solid var(--border);
    padding: 0 0 14px;
  }
  .ink-rail span {
    writing-mode: horizontal-tb;
  }
  .scroll-index {
    border-left: 0;
    padding: 0;
  }
  .swiss-masthead {
    grid-template-columns: 1fr;
  }
  .swiss-masthead > span,
  .swiss-masthead > strong,
  .swiss-masthead nav,
  .swiss-masthead .text-action {
    border-right: 0;
    border-bottom: 1px solid var(--border);
  }
  .swiss-lead,
  .swiss-number,
  .swiss-metrics,
  .swiss-object-board,
  .swiss-source-table {
    grid-column: auto;
    grid-row: auto;
  }
  .swiss-grid {
    grid-template-rows: auto;
  }
  .swiss-lead {
    border-right: 0;
    border-bottom: 2px solid var(--text);
    padding: 22px;
  }
  .swiss-number {
    min-height: 96px;
    justify-items: start;
    padding: 16px 22px;
    border-right: 0;
    font-size: 72px;
  }
  .swiss-metrics,
  .swiss-object-board {
    grid-template-columns: 1fr;
  }
  .swiss-object {
    min-height: 230px;
    border-right: 0;
    border-bottom: 1px solid var(--border);
  }
  .swiss-source-table span {
    grid-template-columns: 1fr;
    align-items: start;
    gap: 4px;
    padding: 10px 0;
  }
  .scroll-paper {
    grid-row: auto;
    min-height: auto;
    padding: 22px;
  }
  .seal-stack {
    position: static;
    grid-template-columns: auto minmax(0, 1fr);
    justify-items: start;
    align-items: start;
    margin-bottom: 18px;
  }
  .seal-stack span {
    max-height: none;
    writing-mode: horizontal-tb;
  }
  .ink-landscape-field {
    min-height: 300px;
    margin-top: 28px;
  }
  .tea-ledger,
  .provenance-strip {
    grid-column: auto;
    border-left-width: 1px;
  }
  .plan-sheet {
    min-height: 520px;
  }
  .plan-graph {
    position: relative;
    inset: auto;
    min-height: 420px;
  }
  .sheet-callouts {
    min-height: auto;
  }
  .alarm-table-wrap {
    overflow-x: auto;
  }
  .status-filters {
    grid-template-columns: repeat(2, minmax(0, 1fr));
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
  body.card-grid .page {
    padding: 0 0 44px;
  }
  body.card-grid .interaction-demo,
  body.card-grid .style-lab {
    width: min(100% - 24px, 460px);
  }
  .life-bento-market {
    grid-template-columns: 1fr;
  }
  .contact-sheet {
    grid-template-columns: repeat(3, 1fr);
  }
  .contact-title h1 {
    font-size: clamp(28px, 8vw, 38px);
  }
  .seat-map {
    grid-template-columns: repeat(8, 1fr);
  }
  .swatch-lanes {
    grid-template-columns: 1fr;
  }
  .aurora-room-field,
  .ledger-sheet,
  .cinema-screen,
  .greenhouse-map,
  .festival-heading,
  .garden-lesson,
  .theater-marquee,
  .tea-scroll {
    padding: 20px;
  }
  .floor-plan article,
  .loft-plan > span {
    position: static;
    margin: 12px;
  }
  .plan-route,
  .room-outline,
  .plan-zones,
  .fixture-labels,
  .dimension-tape {
    display: none;
  }
  .red-seal {
    position: static;
    margin: 0 0 14px auto;
  }
  .greenhouse-map h1 {
    line-height: 1.08;
  }
  .admin-workspace {
    padding: 12px;
  }
  .admin-tabs {
    overflow-x: auto;
  }
  .admin-kpi {
    min-height: 82px;
  }
  .admin-table th,
  .admin-table td {
    height: 42px;
    padding: 0 10px;
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
  .editorial-lead h1,
  .swiss-lead h1,
  .ink-copy h1 {
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
    <section class="reference-stack" aria-label="Reusable interaction and implementation notes">
      ${renderInteractionDemo(style, scenario, playbook)}
      ${renderStyleLab(style, scenario, playbook, related)}
    </section>
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

function writeStyleFiles(stylesToWrite = allStyles) {
  cleanRemovedStyles();

  stylesToWrite.forEach((style) => {
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

async function waitForDevtoolsPort(userDataDir, timeoutMs) {
  const startedAt = Date.now();
  const portFile = path.join(userDataDir, "DevToolsActivePort");
  let lastError;

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const [portLine] = fs.readFileSync(portFile, "utf8").trim().split(/\r?\n/);
      const port = Number(portLine);
      if (Number.isInteger(port) && port > 0) return port;
    } catch (error) {
      lastError = error;
    }
    await sleep(100);
  }

  throw new Error(`Chrome DevTools port file did not become ready: ${lastError?.message || "timeout"}`);
}

async function waitForChromeJson(port, timeoutMs) {
  const startedAt = Date.now();
  let lastError;

  while (Date.now() - startedAt < timeoutMs) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 1000);
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json`, { signal: controller.signal });
      if (response.ok) {
        const tabs = await response.json();
        if (Array.isArray(tabs) && tabs.length > 0) return tabs;
      }
    } catch (error) {
      lastError = error;
    } finally {
      clearTimeout(timer);
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

let cachedPlaywright;

function loadPlaywright() {
  if (cachedPlaywright !== undefined) return cachedPlaywright;

  const candidates = [
    process.env.PLAYWRIGHT_MODULE,
    "playwright",
    path.join(bundledNodeModules, "playwright"),
  ].filter(Boolean);

  for (const candidate of candidates) {
    try {
      cachedPlaywright = require(candidate);
      return cachedPlaywright;
    } catch {
      // Try the next candidate. The bundled Codex runtime is optional outside Codex.
    }
  }

  cachedPlaywright = null;
  return cachedPlaywright;
}

function collectExecutableFiles(rootDirToSearch, matches) {
  if (!rootDirToSearch || !fs.existsSync(rootDirToSearch)) return [];

  const found = [];
  const stack = [rootDirToSearch];
  while (stack.length > 0) {
    const current = stack.pop();
    let entries;
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      continue;
    }

    for (const entry of entries) {
      const absolute = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(absolute);
      } else if (entry.isFile() && matches(absolute)) {
        found.push(absolute);
      }
    }
  }
  return found;
}

function browserExecutablePriority(executablePath) {
  if (executablePath.includes("Google Chrome for Testing.app")) return 0;
  if (executablePath.includes("Chromium.app")) return 1;
  if (path.basename(executablePath) === "chrome-headless-shell") return 2;
  return 3;
}

function findChromiumExecutable(playwright) {
  const explicit = process.env.PLAYWRIGHT_CHROMIUM_PATH;
  if (explicit && fs.existsSync(explicit)) return explicit;

  const candidates = [];
  try {
    const defaultExecutable = playwright.chromium.executablePath?.();
    if (defaultExecutable) candidates.push(defaultExecutable);
  } catch {
    // Fall through to cache scanning.
  }

  candidates.push(
    ...collectExecutableFiles(path.join(os.homedir(), "Library", "Caches", "ms-playwright"), (candidate) =>
      candidate.endsWith("Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing") ||
      candidate.endsWith("Chromium.app/Contents/MacOS/Chromium") ||
      path.basename(candidate) === "chrome-headless-shell"
    ),
    ...collectExecutableFiles(path.join(os.homedir(), ".cache", "puppeteer", "chrome"), (candidate) =>
      candidate.endsWith("Chromium.app/Contents/MacOS/Chromium") ||
      path.basename(candidate) === "chrome"
    )
  );

  return candidates
    .filter((candidate, index, list) => candidate && fs.existsSync(candidate) && list.indexOf(candidate) === index)
    .sort((a, b) => browserExecutablePriority(a) - browserExecutablePriority(b) || b.localeCompare(a))[0];
}

async function screenshotWithPlaywright(htmlFile, options = {}) {
  const playwright = loadPlaywright();
  if (!playwright) {
    throw new Error(
      "Playwright was not found. Install playwright, set PLAYWRIGHT_MODULE, set PREVIEW_SCREENSHOTS=0, or explicitly opt into Chrome with CHROME_PATH."
    );
  }

  const outputPath = htmlFile.replace(/\.html$/, `${options.suffix || ""}.png`);
  const width = options.width || viewportWidth;
  const height = options.height || viewportHeight;
  const targetUrl = toFileUrl(htmlFile);
  let browser;
  const chromiumExecutable = findChromiumExecutable(playwright);
  const launchOptions = {
    headless: true,
    args: [
      "--disable-gpu",
      "--disable-extensions",
      "--hide-scrollbars",
      "--no-first-run",
      "--no-default-browser-check",
    ],
  };

  if (!chromiumExecutable) {
    throw new Error(
      "No Playwright Chromium executable was found. Set PLAYWRIGHT_CHROMIUM_PATH, set PREVIEW_SCREENSHOTS=0, or explicitly opt into Chrome with CHROME_PATH."
    );
  }
  launchOptions.executablePath = chromiumExecutable;

  try {
    browser = await playwright.chromium.launch(launchOptions);
    const page = await browser.newPage({
      viewport: { width, height },
      deviceScaleFactor: 1,
      isMobile: width <= 600,
    });
    await page.goto(targetUrl, { waitUntil: "load" });
    await page.waitForLoadState("networkidle", { timeout: Math.max(15000, chromeWait + 5000) }).catch(() => {});
    await page.waitForTimeout(chromeWait);
    await page.screenshot({
      path: outputPath,
      fullPage: false,
      animations: "disabled",
    });
    await page.close();
  } finally {
    await browser?.close().catch(() => {});
  }

  assertPngHasVisibleContent(outputPath, `Playwright screenshot for ${path.basename(htmlFile)}`);
  return outputPath;
}

async function screenshot(htmlFile, options = {}) {
  const outputPath = htmlFile.replace(/\.html$/, `${options.suffix || ""}.png`);
  const width = options.width || viewportWidth;
  const height = options.height || viewportHeight;
  const targetUrl = toFileUrl(htmlFile);
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "awesome-page-design-chrome-"));
  let chrome;
  let client;

  if (!allowSystemChrome) {
    throw new Error("System Google Chrome screenshot fallback is disabled. Set CHROME_PATH or PREVIEW_USE_SYSTEM_CHROME=1 to opt in.");
  }

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
        "--remote-debugging-port=0",
        `--user-data-dir=${userDataDir}`,
        `--window-size=${Math.max(width, 800)},${Math.max(height, 600)}`,
        "about:blank",
      ],
      { stdio: "ignore" }
    );

    const devtoolsPort = await waitForDevtoolsPort(userDataDir, Math.max(15000, chromeWait + 5000));
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

async function screenshotWithChromeCli(htmlFile, options = {}) {
  const outputPath = htmlFile.replace(/\.html$/, `${options.suffix || ""}.png`);
  const width = options.width || viewportWidth;
  const height = options.height || viewportHeight;
  const targetUrl = toFileUrl(htmlFile);
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "awesome-page-design-chrome-"));
  let chrome;
  let stderr = "";

  if (!allowSystemChrome) {
    throw new Error("System Google Chrome CLI fallback is disabled. Set CHROME_PATH or PREVIEW_USE_SYSTEM_CHROME=1 to opt in.");
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
        `--user-data-dir=${userDataDir}`,
        `--window-size=${Math.max(width, 800)},${Math.max(height, 600)}`,
        `--virtual-time-budget=${chromeWait}`,
        `--screenshot=${outputPath}`,
        targetUrl,
      ],
      { stdio: ["ignore", "ignore", "pipe"] }
    );

    chrome.stderr?.on("data", (chunk) => {
      stderr += chunk.toString("utf8");
    });

    const exited = await waitForProcessExit(chrome, Math.max(20000, chromeWait + 12000));
    if (!exited && chrome.exitCode === null && chrome.signalCode === null) {
      chrome.kill("SIGKILL");
      await waitForProcessExit(chrome, 1500);
    }
    if (!exited || chrome.exitCode !== 0) {
      throw new Error(`Chrome CLI screenshot failed: ${stderr.trim() || `exit ${chrome.exitCode ?? chrome.signalCode ?? "unknown"}`}`);
    }
  } finally {
    await removeDirectoryWithRetry(userDataDir);
  }

  assertPngHasVisibleContent(outputPath, `Chrome CLI screenshot for ${path.basename(htmlFile)}`);
  return outputPath;
}

async function screenshotWithRetry(htmlFile, options = {}, attempts = 2) {
  let lastError;
  if (screenshotEngine !== "chrome") {
    for (let attempt = 1; attempt <= attempts; attempt += 1) {
      try {
        return await screenshotWithPlaywright(htmlFile, options);
      } catch (error) {
        lastError = error;
        if (attempt === attempts) break;
        process.stdout.write(`retry ${attempt}/${attempts - 1}... `);
        await sleep(400 * attempt);
      }
    }

    if (!allowSystemChrome || screenshotEngine === "playwright") {
      throw new Error(
        `${lastError?.message || "Playwright screenshot failed"}. System Google Chrome fallback is disabled by default to avoid macOS crash reports.`
      );
    }
  }

  process.stdout.write("fallback chrome... ");
  try {
    return await screenshot(htmlFile, options);
  } catch (cdpError) {
    process.stdout.write("fallback cli... ");
    try {
      return await screenshotWithChromeCli(htmlFile, options);
    } catch (fallbackError) {
      fallbackError.message = `${fallbackError.message}; CDP error: ${cdpError?.message || lastError?.message || "unknown"}`;
      throw fallbackError;
    }
  }
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

This index summarizes all ${allStyles.length} available visual styles, numbered continuously from Style 01 to Style ${allStyles.length}. Use these styles as visual direction and design the actual page structure around the user's product. Choose the user's layout archetype from \`layout-guidance.md\` before treating any style as a fixed page shape.

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
- Do not collapse Style 22 Art Deco, Style 24 Ink Wash, and Style 05 Swiss Editorial into one editorial page. They differ by gilded symmetry, scroll/paper rhythm, and strict modernist rules.
- Do not collapse Style 23 Wabi-Sabi and Style 20 Soft Pop into one warm rounded UI. Style 23 is quiet material restraint; Style 20 is friendly playful learning/product energy.
- Do not collapse Style 25 Blueprint, Style 18 Precision Futurism, and Style 26 Industrial Control into one technical dashboard. Style 25 is a measured plan sheet, Style 18 is a dark precision graph console, and Style 26 is rugged safety-critical operations.
- Use Style 02, Style 04, Style 07, Style 16, Style 17, Style 19, Style 20, and Style 21 only when the brand can carry a strong personality.
`
  );
}

function findStyleHtmlFiles(stylesToScreenshot = allStyles) {
  return stylesToScreenshot.map((style) => path.join(stylesDir, style.slug, `${style.slug}.html`));
}

async function main() {
  const previewStyles = resolvePreviewStyles();
  const isFilteredRun = previewStyles.length !== allStyles.length;

  writeStyleFiles(previewStyles);
  writeStyleIndex();
  fs.mkdirSync(outputDir, { recursive: true });

  if (process.env.PREVIEW_INDEX_ONLY === "1") {
    writeIndex();
    console.log(`Done. Open ${path.relative(rootDir, path.join(outputDir, "index.html"))}`);
    return;
  }

  if (!generateScreenshots) {
    writeIndex();
    if (screenshotsBlockedBySandbox) {
      console.log("Screenshots skipped inside CODEX_SANDBOX=seatbelt to avoid browser crash reports; set PREVIEW_ALLOW_SANDBOX_BROWSER=1 only if launching a browser from the sandbox is known safe.");
    } else if (isCodexSeatbeltSandbox && process.env.PREVIEW_SCREENSHOTS === undefined) {
      console.log("Screenshots skipped inside CODEX_SANDBOX=seatbelt to avoid browser crash reports; run outside the sandbox or set PREVIEW_ALLOW_SANDBOX_BROWSER=1 only when safe.");
    } else {
      console.log("Screenshots disabled with PREVIEW_SCREENSHOTS=0; HTML, docs, and preview index were refreshed.");
    }
    console.log(`Done. Open ${path.relative(rootDir, path.join(outputDir, "index.html"))}`);
    return;
  }

  const htmlFiles = findStyleHtmlFiles(previewStyles);
  if (isFilteredRun) {
    const selected = previewStyles.map((style) => style.id).join(", ");
    console.log(`Generating ${htmlFiles.length}/${allStyles.length} selected style preview(s) [${selected}] with ${chromeWait}ms wait...`);
    console.log("Reusing existing screenshots for unselected styles; preview index is still refreshed.");
  } else {
    console.log(`Generating ${htmlFiles.length} style previews with ${chromeWait}ms wait...`);
  }
  if (screenshotEngine === "chrome" || allowSystemChrome) {
    console.log("Screenshot engine: explicit Chrome fallback is enabled by environment opt-in.");
  } else {
    console.log("Screenshot engine: Playwright Chromium; system Google Chrome fallback is disabled.");
  }
  for (const htmlFile of htmlFiles) {
    process.stdout.write(`- ${path.relative(rootDir, htmlFile)} -> `);
    const imageFile = await screenshotWithRetry(htmlFile);
    process.stdout.write(`${path.relative(rootDir, imageFile)}\n`);
    if (generateMobileScreenshots) {
      process.stdout.write(`  mobile -> `);
      const mobileImageFile = await screenshotWithRetry(htmlFile, {
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
