#!/usr/bin/env node

const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

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
    radius: "18px",
    shadow: "0 20px 60px rgba(15, 23, 42, .08)",
    className: "tech-minimal",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&auto=format&fit=crop",
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
    radius: "22px",
    shadow: "0 24px 90px rgba(125, 211, 252, .14)",
    className: "dark-theme",
    image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=900&auto=format&fit=crop",
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
    radius: "10px",
    shadow: "0 18px 45px rgba(15, 23, 42, .07)",
    className: "structured-lines",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop",
    notes: ["Let borders organize information before shadows do.", "Use diagrams, rails, and labeled groups.", "Keep the tone factual and composed."],
  },
  {
    id: "12",
    slug: "style-12-material-design",
    name: "Material Design",
    zhName: "材料设计风格",
    brief: "Clear elevation, large color cards, generous radius, and orderly arrangement inspired by Material 3.",
    zhBrief: "层次分明、大色块卡片、大圆角、有秩序的排布，参考 Material 3 的设计语言。",
    bestFor: "consumer tools, Android-like apps, product dashboards",
    zhBestFor: "消费者工具、Android 风应用、产品仪表盘",
    bg: "#f7f2fa",
    surface: "#ffffff",
    text: "#1d1b20",
    muted: "#625b71",
    primary: "#6750a4",
    accent: "#eaddff",
    border: "#e7e0ec",
    radius: "28px",
    shadow: "0 18px 50px rgba(103, 80, 164, .16)",
    className: "material-design",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=900&auto=format&fit=crop",
    notes: ["Use large touch-friendly controls.", "Separate hierarchy with tonal surfaces.", "Keep motion and states calm and systematic."],
  },
  {
    id: "13",
    slug: "style-13-bento-layout",
    name: "Bento Layout",
    zhName: "便当盒布局",
    brief: "iOS-widget-like card zones, modular composition, and clearly chunked information.",
    zhBrief: "类似 iOS 小组件卡片分区、模块化排布、信息清晰分块。",
    bestFor: "creator profiles, product overviews, feature collections",
    zhBestFor: "创作者主页、产品总览、功能集合页",
    bg: "#f4f4f5",
    surface: "#ffffff",
    text: "#18181b",
    muted: "#71717a",
    primary: "#18181b",
    accent: "#f97316",
    border: "#e4e4e7",
    radius: "26px",
    shadow: "0 18px 55px rgba(24, 24, 27, .10)",
    className: "bento-layout",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=900&auto=format&fit=crop",
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
    radius: "28px",
    shadow: "0 28px 90px rgba(15, 23, 42, .45)",
    className: "liquid-glass",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&auto=format&fit=crop",
    notes: ["Layer translucent panels over vivid but softened media.", "Use blur, tint, and borders to keep text readable.", "Avoid low-contrast glass over busy images."],
  },
  {
    id: "16",
    slug: "style-16-retro-computing",
    name: "Retro Computing",
    zhName: "复古主义",
    brief: "Pixel mood, old operating-system texture, 80s elements, early Windows/Mac cues, and bitmap type.",
    zhBrief: "像素风、复古 UI、老式操作系统质感、80 年代元素、早期 Windows/Mac 界面和像素字体。",
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
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=900&auto=format&fit=crop",
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
    bg: "#fff15c",
    surface: "#fffbea",
    text: "#111111",
    muted: "#3f3f46",
    primary: "#111111",
    accent: "#00e5a8",
    border: "#111111",
    radius: "0",
    shadow: "10px 10px 0 #111111",
    className: "neo-brutalism",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=900&auto=format&fit=crop",
    notes: ["Make the hierarchy loud and unmistakable.", "Use strong geometry and intentionally hard shadows.", "Preserve usability under the visual tension."],
  },
  {
    id: "18",
    slug: "style-18-linear-futurism",
    name: "Linear Futurism",
    zhName: "Linear 风格",
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
    radius: "18px",
    shadow: "0 0 0 1px rgba(139, 92, 246, .22), 0 24px 80px rgba(139, 92, 246, .18)",
    className: "linear-futurism",
    image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=900&auto=format&fit=crop",
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
    radius: "24px",
    shadow: "0 24px 70px rgba(219, 39, 119, .20)",
    className: "gradient-pop",
    image: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=900&auto=format&fit=crop",
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
    radius: "32px",
    shadow: "0 18px 55px rgba(255, 107, 107, .18)",
    className: "soft-pop",
    image: "https://images.unsplash.com/photo-1519340333755-c892ab5a6a3e?w=900&auto=format&fit=crop",
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
    radius: "18px",
    shadow: "0 24px 90px rgba(214, 255, 0, .16)",
    className: "acid-design",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&auto=format&fit=crop",
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
    radius: "18px",
    shadow: "0 18px 48px rgba(26, 26, 46, .10)",
    className: "card-grid",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop",
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
    className: "neo-brutalism",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=900&auto=format&fit=crop",
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
    radius: "24px",
    shadow: "0 28px 90px rgba(34, 211, 238, .18)",
    className: "aurora-gradient",
    image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=900&auto=format&fit=crop",
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
    radius: "22px",
    shadow: "0 22px 70px rgba(255, 45, 178, .24)",
    className: "retro-y2k",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop",
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
    radius: "8px",
    shadow: "0 0 36px rgba(0, 255, 136, .16)",
    className: "terminal-hacker",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=900&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1519340333755-c892ab5a6a3e?w=900&auto=format&fit=crop",
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
    radius: "16px",
    shadow: "0 28px 100px rgba(200, 184, 255, .12)",
    className: "resonant-stark",
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=900&auto=format&fit=crop",
    notes: ["Use quiet space as the main visual move.", "Keep glow delicate and premium.", "Let content breathe instead of filling every gap."],
  },
];

const allStyles = [...coreStyles, ...styles];

const removedStyleSlugs = [
  "version-a-classic",
  "version-b-grid",
  "version-c-feed",
  "version-d-bento",
  "version-e-glass",
  "version-f-brutalism",
  "version-g-aurora",
  "version-h-y2k",
  "version-i-swiss",
  "version-j-terminal",
  "version-k-clay",
  "version-l-cutealism",
  "version-m-stark",
  "version-n-skeuomorph",
  "version-o-scribble",
  "version-p-material-you",
  "version-q-fluent-cloud",
  "version-r-carbon-enterprise",
  "version-s-polaris-commerce",
  "version-t-atlassian-workbench",
  "version-u-gov-service",
  "version-v-spectrum-creative",
  "version-w-lightning-crm",
  "version-x-primer-dev",
  "version-y-ant-pro",
  "style-01-tech-minimal",
  "style-02-dark-theme",
  "style-03-structured-lines",
  "style-04-material-design",
  "style-05-bento-layout",
  "style-06-neumorphism",
  "style-07-liquid-glass",
  "style-08-retro-computing",
  "style-09-neo-brutalism",
  "style-10-linear-futurism",
  "style-11-gradient-pop",
  "style-12-soft-pop",
  "style-13-acid-design",
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

function ensureCleanDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

function renderStyleHtml(style) {
  const label = style.label || `Style ${style.id}`;
  const notes = style.notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("");
  const related = styles
    .filter((item) => item.id !== style.id)
    .slice(0, 3)
    .map((item) => `<a href="../${item.slug}/${item.slug}.html">${item.id}. ${escapeHtml(item.name)}</a>`)
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${label} - ${style.name}</title>
<style>
* { box-sizing: border-box; }
:root {
  --bg: ${style.bg};
  --surface: ${style.surface};
  --text: ${style.text};
  --muted: ${style.muted};
  --primary: ${style.primary};
  --accent: ${style.accent};
  --border: ${style.border};
  --radius: ${style.radius};
  --shadow: ${style.shadow};
}
body {
  min-height: 100vh;
  margin: 0;
  color: var(--text);
  background: var(--bg);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
body.dark-theme,
body.linear-futurism,
body.liquid-glass,
body.acid-design {
  background:
    radial-gradient(circle at 20% 0%, color-mix(in srgb, var(--accent), transparent 72%), transparent 32%),
    radial-gradient(circle at 80% 12%, color-mix(in srgb, var(--primary), transparent 86%), transparent 26%),
    var(--bg);
}
body.gradient-pop {
  background:
    radial-gradient(circle at 18% 12%, #ff7adf 0, transparent 32%),
    radial-gradient(circle at 82% 10%, #67e8f9 0, transparent 28%),
    linear-gradient(135deg, #fff7ed, #fdf2f8 48%, #ecfeff);
}
body.retro-computing {
  font-family: "Courier New", ui-monospace, monospace;
  background-image:
    linear-gradient(rgba(31,19,0,.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(31,19,0,.08) 1px, transparent 1px);
  background-size: 20px 20px;
}
body.neo-brutalism h1,
body.retro-computing h1,
body.acid-design h1 {
  text-transform: uppercase;
}
body.acid-design h1 {
  text-shadow: 2px 0 #00e5ff, -2px 0 #ff00f5, 0 0 32px rgba(214,255,0,.24);
}
button, input { font: inherit; }
a { color: inherit; }
.page {
  width: min(1180px, calc(100% - 40px));
  margin: 0 auto;
  padding: 24px 0 56px;
}
.nav {
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 12px 0;
}
.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 800;
}
.mark {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  color: var(--bg);
  background: var(--primary);
  border: 1px solid var(--border);
  border-radius: calc(var(--radius) * .55);
  box-shadow: ${style.className === "neumorphism" ? "inset 5px 5px 12px rgba(148,163,184,.35), inset -5px -5px 12px rgba(255,255,255,.9)" : "none"};
}
.links {
  display: flex;
  align-items: center;
  gap: 18px;
  color: var(--muted);
  font-size: 14px;
}
.links a {
  text-decoration: none;
}
.actions {
  display: flex;
  align-items: center;
  gap: 10px;
}
button, .button {
  min-height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 16px;
  color: var(--bg);
  background: var(--primary);
  border: 1px solid var(--primary);
  border-radius: calc(var(--radius) * .6);
  font-weight: 800;
  text-decoration: none;
  cursor: pointer;
  transition: transform .18s ease, box-shadow .18s ease, opacity .18s ease;
}
button.secondary, .button.secondary {
  color: var(--text);
  background: var(--surface);
  border-color: var(--border);
}
button:hover, .button:hover { transform: translateY(-2px); }
body.neo-brutalism button,
body.retro-computing button {
  box-shadow: 4px 4px 0 var(--border);
}
.hero {
  min-height: 620px;
  display: grid;
  grid-template-columns: minmax(0, 1.02fr) minmax(360px, .98fr);
  gap: 30px;
  align-items: center;
  padding: 48px 0;
}
.eyebrow {
  margin: 0 0 14px;
  color: var(--accent);
  font-size: 13px;
  font-weight: 900;
  letter-spacing: .08em;
  text-transform: uppercase;
}
h1 {
  margin: 0;
  font-size: clamp(52px, 7vw, 112px);
  line-height: .9;
  letter-spacing: 0;
}
.lede {
  max-width: 660px;
  margin: 22px 0 0;
  color: var(--muted);
  font-size: 19px;
  line-height: 1.65;
}
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}
.proof {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 30px;
}
.proof span {
  display: block;
  padding: 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: calc(var(--radius) * .55);
  color: var(--muted);
  box-shadow: ${style.className === "neumorphism" ? "var(--shadow)" : "none"};
}
.proof strong {
  display: block;
  margin-bottom: 4px;
  color: var(--text);
  font-size: 22px;
}
.showcase {
  position: relative;
  overflow: hidden;
  padding: 18px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}
body.liquid-glass .showcase,
body.liquid-glass .panel,
body.liquid-glass .feature,
body.liquid-glass .workspace {
  backdrop-filter: blur(22px) saturate(1.4);
}
.media {
  width: 100%;
  height: 280px;
  display: block;
  border: 1px solid var(--border);
  border-radius: calc(var(--radius) * .68);
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--accent), white 10%), color-mix(in srgb, var(--primary), transparent 35%)),
    var(--image);
  background-size: cover;
  background-position: center;
  filter: ${style.className === "acid-design" ? "saturate(1.4) contrast(1.1)" : "none"};
}
.floating-card {
  position: absolute;
  right: 32px;
  bottom: 32px;
  width: min(280px, 58%);
  padding: 16px;
  background: color-mix(in srgb, var(--surface), transparent 6%);
  border: 1px solid var(--border);
  border-radius: calc(var(--radius) * .65);
  box-shadow: var(--shadow);
}
.floating-card b,
.floating-card span {
  display: block;
}
.floating-card span {
  margin-top: 8px;
  color: var(--muted);
  line-height: 1.5;
}
.status-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-top: 14px;
}
.status-row i {
  height: 68px;
  border: 1px solid var(--border);
  border-radius: calc(var(--radius) * .5);
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--accent), transparent 22%), transparent),
    color-mix(in srgb, var(--surface), var(--bg) 18%);
}
.section-head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 22px;
  margin: 36px 0 16px;
}
.section-head h2 {
  max-width: 760px;
  margin: 0;
  font-size: 34px;
  line-height: 1.08;
}
.section-head p {
  max-width: 360px;
  margin: 0;
  color: var(--muted);
  line-height: 1.55;
}
.features {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}
.feature, .panel, .workspace {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: ${style.className === "neumorphism" ? "var(--shadow)" : "none"};
}
.feature {
  min-height: 210px;
  padding: 20px;
}
.feature b {
  display: inline-grid;
  place-items: center;
  width: 42px;
  height: 42px;
  margin-bottom: 28px;
  color: var(--bg);
  background: var(--primary);
  border-radius: calc(var(--radius) * .45);
}
.feature h3 {
  margin: 0 0 10px;
  font-size: 21px;
}
.feature p,
.panel p,
.workspace p {
  margin: 0;
  color: var(--muted);
  line-height: 1.55;
}
.workspace {
  margin-top: 16px;
  padding: 18px;
}
.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}
.tabs button {
  min-height: 36px;
  color: var(--muted);
  background: transparent;
  border-color: var(--border);
}
.tabs button.active {
  color: var(--bg);
  background: var(--primary);
  border-color: var(--primary);
}
.demo-grid {
  display: grid;
  grid-template-columns: 1.2fr .8fr;
  gap: 16px;
}
.panel {
  padding: 18px;
}
.panel h3 {
  margin: 0 0 12px;
  font-size: 20px;
}
.chart {
  height: 190px;
  display: flex;
  align-items: end;
  gap: 10px;
  padding: 14px;
  background: color-mix(in srgb, var(--bg), var(--surface) 28%);
  border: 1px solid var(--border);
  border-radius: calc(var(--radius) * .65);
}
.chart i {
  flex: 1;
  min-width: 16px;
  border-radius: 999px 999px 0 0;
  background: linear-gradient(180deg, var(--accent), var(--primary));
}
.list {
  display: grid;
  gap: 10px;
}
.list button {
  width: 100%;
  justify-content: space-between;
  color: var(--text);
  background: color-mix(in srgb, var(--surface), var(--bg) 18%);
  border-color: var(--border);
}
.list button span {
  color: var(--muted);
  font-weight: 600;
}
.modal {
  position: fixed;
  inset: auto 24px 24px auto;
  z-index: 10;
  width: min(360px, calc(100vw - 48px));
  padding: 18px;
  color: var(--text);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}
.modal[hidden] { display: none; }
.related {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
}
.related a {
  padding: 10px 12px;
  color: var(--muted);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: calc(var(--radius) * .5);
  text-decoration: none;
}
@media (max-width: 900px) {
  .page { width: min(100% - 28px, 720px); }
  .nav, .links, .actions { align-items: flex-start; }
  .nav { display: grid; }
  .links { flex-wrap: wrap; }
  .hero, .demo-grid { grid-template-columns: 1fr; }
  .hero { min-height: auto; padding: 28px 0; }
  .proof, .features { grid-template-columns: 1fr; }
  .section-head { display: block; }
  .section-head p { margin-top: 12px; }
  h1 { font-size: clamp(42px, 15vw, 76px); }
}
</style>
</head>
<body class="${style.className}">
  <main class="page">
    <nav class="nav" aria-label="Example navigation">
      <div class="brand"><span class="mark">${style.id}</span><span>Signal Studio</span></div>
      <div class="links">
        <a href="#features">Features</a>
        <a href="#workspace">Workspace</a>
        <a href="#features">Style notes</a>
      </div>
      <div class="actions">
        <button class="secondary" type="button" data-open-modal>Preview notes</button>
        <a class="button" href="#workspace">Explore demo</a>
      </div>
    </nav>

    <section class="hero">
      <div>
        <p class="eyebrow">${escapeHtml(label)} · ${escapeHtml(style.zhName)}</p>
        <h1>${escapeHtml(style.name)}</h1>
        <p class="lede">${escapeHtml(style.brief)}</p>
        <div class="hero-actions">
          <button type="button" data-copy>Copy style prompt</button>
          <button class="secondary" type="button" data-open-modal>View design notes</button>
        </div>
        <div class="proof">
          <span><strong>Color</strong>${escapeHtml(style.primary)} / ${escapeHtml(style.accent)}</span>
          <span><strong>Radius</strong>${escapeHtml(style.radius)} surfaces</span>
          <span><strong>Best for</strong>${escapeHtml(style.bestFor)}</span>
        </div>
      </div>
      <aside class="showcase" aria-label="Visual style sample">
        <div class="media" role="img" aria-label="${escapeHtml(style.name)} visual reference" style="--image: url('${style.image}')"></div>
        <div class="floating-card">
          <b>Live launch board</b>
          <span>Clickable preview surface showing how navigation, cards, data, and actions inherit this style.</span>
        </div>
        <div class="status-row"><i></i><i></i><i></i></div>
      </aside>
    </section>

    <section id="features">
      <div class="section-head">
        <h2>Reusable visual decisions for real product pages.</h2>
        <p>${escapeHtml(style.zhBrief)} Use the style language, then redesign the actual page around the user's content.</p>
      </div>
      <div class="features">
        <article class="feature"><b>01</b><h3>Surface System</h3><p>Background, cards, borders, shadows, and focus states are tuned to the selected visual language.</p></article>
        <article class="feature"><b>02</b><h3>Component Tone</h3><p>Buttons, tabs, stats, panels, and list rows show how the style behaves in interactive UI.</p></article>
        <article class="feature"><b>03</b><h3>Content Density</h3><p>The example includes real sections, metrics, image media, and supporting context instead of a thin hero only.</p></article>
      </div>
    </section>

    <section id="workspace" class="workspace">
      <div class="tabs" aria-label="Demo tabs">
        <button type="button" class="active" data-tab="launch">Launch</button>
        <button type="button" data-tab="metrics">Metrics</button>
        <button type="button" data-tab="assets">Assets</button>
      </div>
      <div class="demo-grid">
        <article class="panel">
          <h3 data-demo-title>Launch workflow</h3>
          <p data-demo-copy>Plan a first viewport, select the visual hierarchy, validate the core call to action, and then translate the chosen style into tokens.</p>
          <div class="chart" aria-hidden="true">
            ${[42, 68, 54, 86, 72, 92, 63].map((height) => `<i style="height:${height}%"></i>`).join("")}
          </div>
        </article>
        <aside class="panel">
          <h3>Action queue</h3>
          <div class="list">
            <button type="button" data-open-modal><b>Audit contrast</b><span>Ready</span></button>
            <button type="button" data-open-modal><b>Review mobile crop</b><span>2 notes</span></button>
            <button type="button" data-open-modal><b>Export prompt</b><span>Click</span></button>
          </div>
        </aside>
      </div>
      <div class="related">${related}</div>
    </section>

  </main>

  <aside class="modal" hidden data-modal>
    <h3>${escapeHtml(label)}: ${escapeHtml(style.name)}</h3>
    <ul>${notes}</ul>
    <button type="button" data-close-modal>Close</button>
  </aside>

  <script>
  const prompt = "Use awesome-page-design style: ${label} - ${style.name} (${style.zhName}). Apply its visual language: ${style.brief} Do not copy the sample layout; adapt color, typography, surfaces, components, and interaction states to the real product.";
  const modal = document.querySelector('[data-modal]');
  const demo = {
    launch: ['Launch workflow', 'Plan a first viewport, select the visual hierarchy, validate the core call to action, and then translate the chosen style into tokens.'],
    metrics: ['Metric review', 'Compare conversion, readability, image loading, state coverage, and mobile density before final implementation.'],
    assets: ['Asset direction', 'Use real product imagery, brand photography, or carefully matched abstract media when visuals help the page communicate faster.']
  };
  document.querySelectorAll('[data-open-modal]').forEach((node) => node.addEventListener('click', () => modal.hidden = false));
  document.querySelector('[data-close-modal]').addEventListener('click', () => modal.hidden = true);
  document.querySelector('[data-copy]').addEventListener('click', async (event) => {
    try {
      await navigator.clipboard.writeText(prompt);
      event.currentTarget.textContent = 'Copied';
      setTimeout(() => event.currentTarget.textContent = 'Copy style prompt', 1300);
    } catch {
      window.prompt('Copy this style prompt:', prompt);
    }
  });
  document.querySelectorAll('[data-tab]').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-tab]').forEach((node) => node.classList.toggle('active', node === button));
      document.querySelector('[data-demo-title]').textContent = demo[button.dataset.tab][0];
      document.querySelector('[data-demo-copy]').textContent = demo[button.dataset.tab][1];
    });
  });
  </script>
</body>
</html>
`;
}

function renderStyleDoc(style) {
  const label = style.label || `Style ${style.id}`;
  const notes = style.notes.map((note) => `- ${note}`).join("\n");
  return `# ${label} - ${style.name} (${style.zhName})

## Summary

${style.brief}

Chinese summary: ${style.zhBrief}

## Best For

${style.bestFor}

## Visual Language

- Background: \`${style.bg}\`
- Surface: \`${style.surface}\`
- Text: \`${style.text}\`
- Muted text: \`${style.muted}\`
- Primary: \`${style.primary}\`
- Accent: \`${style.accent}\`
- Border: \`${style.border}\`
- Radius: \`${style.radius}\`
- Shadow: \`${style.shadow}\`

## Usage Notes

${notes}

## Implementation Guidance

- Start from tokens for background, surface, text, muted text, primary, accent, border, radius, shadow, and focus.
- Apply the style to the user's actual page structure. Do not copy the bundled sample HTML layout.
- Keep hover, focus, selected, disabled, loading, empty, warning, and success states visually consistent.
- When the page needs images, prefer real product imagery, brand photography, or carefully matched neutral media.
- Check desktop and mobile screenshots after external images and fonts have had time to load.
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

function screenshot(htmlFile) {
  const outputPath = htmlFile.replace(/\.html$/, ".png");
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
      `--virtual-time-budget=${chromeWait}`,
      `--window-size=${viewportWidth},${viewportHeight}`,
      `--screenshot=${outputPath}`,
      toFileUrl(htmlFile),
    ],
    {
      stdio: ["ignore", "pipe", "pipe"],
      timeout: Math.max(45000, chromeWait + 20000),
      killSignal: "SIGKILL",
    }
  );
  return outputPath;
}

function renderPreviewCard(style) {
  const label = style.label || `Style ${style.id}`;
  const promptEn = `Use awesome-page-design style: ${label} - ${style.name}. Apply its visual language, but do not copy the sample layout.`;
  const promptZh = `使用 awesome-page-design 风格：${label} - ${style.name}（${style.zhName}）。请应用它的视觉语言，但不要复制示例布局。`;

  return `    <article class="card">
      <a class="preview" href="../styles/${style.slug}/${style.slug}.html" aria-label="Open ${escapeHtml(label)} ${escapeHtml(style.name)} HTML preview">
        <img src="../styles/${style.slug}/${style.slug}.png" alt="${escapeHtml(label)} - ${escapeHtml(style.name)} preview" loading="lazy">
      </a>
      <div class="card-body">
        <div class="card-kicker">${escapeHtml(label)}</div>
        <h2><span data-en="${escapeHtml(style.name)}" data-zh="${escapeHtml(style.zhName)}">${escapeHtml(style.name)}</span></h2>
        <p data-en="${escapeHtml(style.brief)}" data-zh="${escapeHtml(style.zhBrief)}">${escapeHtml(style.brief)}</p>
        <div class="actions">
          <button type="button" data-copy-en="${escapeHtml(promptEn)}" data-copy-zh="${escapeHtml(promptZh)}" data-i18n="copy">Copy style prompt</button>
          <a href="../styles/${style.slug}/${style.slug}.html" data-i18n="openHtml">Open HTML</a>
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
* { box-sizing: border-box; }
body {
  margin: 0;
  padding: 32px;
  background: #f6f7fb;
  color: #172033;
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
  font-size: 30px;
  line-height: 1.15;
  letter-spacing: 0;
}
.meta {
  margin: 8px 0 0;
  color: #667085;
  font-size: 14px;
}
.hint {
  max-width: 760px;
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
  background: #111827;
  color: #ffffff;
}
.count {
  max-width: 1440px;
  margin: 0 auto 20px;
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
  aspect-ratio: 1440 / 1200;
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
  font-weight: 800;
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
  min-height: 84px;
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
  .grid { grid-template-columns: 1fr; gap: 16px; }
}
</style>
</head>
<body>
  <header class="header">
    <div>
      <h1>Awesome Page Design Previews</h1>
      <p class="meta">${allStyles.length} visual style previews, viewport ${viewportWidth}x${viewportHeight}</p>
      <p class="hint">Compare visual styles. Copy a style prompt, send it to your AI agent, and it can apply the chosen colors, typography, surfaces, layout mood, and component tone without copying the sample page.</p>
    </div>
    <div class="lang-toggle" aria-label="Language">
      <button type="button" class="active" data-lang="en">EN</button>
      <button type="button" data-lang="zh">中文</button>
    </div>
  </header>
  <p class="count" data-i18n="sectionCount">${allStyles.length} continuous visual styles, numbered Style 01 through Style ${allStyles.length}.</p>
  <main class="grid">
${cards}
  </main>
  <script>
  const copy = {
    en: {
      title: 'Awesome Page Design Previews',
      meta: '${allStyles.length} visual style previews, viewport ${viewportWidth}x${viewportHeight}',
      hint: 'Compare visual styles. Copy a style prompt, send it to your AI agent, and it can apply the chosen colors, typography, surfaces, layout mood, and component tone without copying the sample page.',
      sectionCount: '${allStyles.length} continuous visual styles, numbered Style 01 through Style ${allStyles.length}.',
      style: 'Style',
      copy: 'Copy style prompt',
      copied: 'Copied',
      openHtml: 'Open HTML',
      promptFallback: 'Copy this style prompt:'
    },
    zh: {
      title: 'Awesome Page Design 预览',
      meta: '${allStyles.length} 个视觉风格预览，视口 ${viewportWidth}x${viewportHeight}',
      hint: '对比视觉风格。点击复制风格提示词，发送给你的 AI，它会应用选定的颜色、字体、表面、布局气质和组件风格，但不复制示例页面。',
      sectionCount: '${allStyles.length} 个连续编号的视觉风格，范围为 Style 01 到 Style ${allStyles.length}。',
      style: '风格',
      copy: '复制风格提示词',
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
    document.querySelector('.hint').textContent = copy[lang].hint;
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
  document.querySelectorAll('.lang-toggle button').forEach((button) => {
    button.addEventListener('click', () => applyLanguage(button.dataset.lang));
  });
  document.querySelectorAll('[data-copy-en]').forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.getAttribute(activeLang === 'zh' ? 'data-copy-zh' : 'data-copy-en');
      try {
        await navigator.clipboard.writeText(value);
        button.textContent = copy[activeLang].copied;
        button.classList.add('copied');
        setTimeout(() => {
          button.textContent = copy[activeLang].copy;
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

function writeStyleIndex() {
  const rows = allStyles
    .map((style) => `| ${style.label || `Style ${style.id}`} | ${style.name} | ${style.zhName} | ${style.bestFor} | ${style.brief} |`)
    .join("\n");
  const quick = allStyles
    .map((style) => `- ${style.label || `Style ${style.id}`} - ${style.name}: ${style.brief}`)
    .join("\n");

  fs.mkdirSync(referencesDir, { recursive: true });
  fs.writeFileSync(
    path.join(referencesDir, "style-index.md"),
    `# Style Index

This index summarizes all 21 available visual styles, numbered continuously from Style 01 to Style 21. Use these styles as visual direction and design the actual page structure around the user's product.

| Style | Name | 中文名 | Best For | Visual Language |
|---|---|---|---|---|
${rows}

## Quick Matching

${quick}

## Similarity Guardrails

- Do not collapse Style 03 Aurora Gradient, Style 08 Resonant Stark, Style 10 Dark Theme, Style 15 Liquid Glass, Style 18 Linear Futurism, and Style 21 Acid Design into the same generic dark SaaS page. They differ by atmosphere, restraint, contrast, material, precision, and experimental intensity.
- Do not collapse Style 09 Tech Minimal, Style 11 Structured Lines, and Style 12 Material Design into one neutral white UI. They differ by whitespace, line structure, and elevation/tonal surface logic.
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

function main() {
  if (!fs.existsSync(chromePath)) {
    throw new Error(`Chrome was not found: ${chromePath}\nSet CHROME_PATH=/path/to/chrome to use another browser path.`);
  }

  writeStyleFiles();
  writeStyleIndex();
  fs.mkdirSync(outputDir, { recursive: true });

  const htmlFiles = findStyleHtmlFiles();
  console.log(`Generating ${htmlFiles.length} style previews with ${chromeWait}ms wait...`);
  htmlFiles.forEach((htmlFile) => {
    process.stdout.write(`- ${path.relative(rootDir, htmlFile)} -> `);
    const imageFile = screenshot(htmlFile);
    process.stdout.write(`${path.relative(rootDir, imageFile)}\n`);
  });

  writeIndex();
  console.log(`Done. Open ${path.relative(rootDir, path.join(outputDir, "index.html"))}`);
}

main();
