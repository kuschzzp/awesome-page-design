# Awesome Page Design

> 25 种可复用的网站与 Web App 视觉风格提示库。用于帮助 Codex、Claude Code、OpenCode 等 Agent 在设计页面时快速选择差异化视觉方向，而不是继续生成千篇一律的默认 UI。

[![Agent Skill](https://img.shields.io/badge/Agent%20Skill-awesome--page--design-4F46E5)](./skills/awesome-page-design/SKILL.md)
[![Styles](https://img.shields.io/badge/styles-25-111827)](./styles)
[![License: MIT](https://img.shields.io/badge/license-MIT-10B981)](./LICENSE)

## 这是什么

`awesome-page-design` 是一个面向 Agent 和前端开发的 **视觉风格 Skill**。它沉淀了 25 套网站视觉语言，每套都包含：

- 可直接打开的单文件 HTML 预览
- 完整设计系统说明
- 可迁移的颜色、字体、圆角、边框、阴影、动效和组件气质
- 适合 Codex / Claude Code / OpenCode 等支持 Agent Skills 的客户端读取的 `SKILL.md`

它不是页面模板库，也不是一个真实的 AI 新闻产品。仓库里的 **AI Pulse** 只是统一示例内容，用来让 25 种风格在同一信息结构下横向对比。

## 什么时候用

- 你要做网站、后台、仪表盘、SaaS、落地页、作品集或组件库
- 你希望页面有明确风格，而不是默认 Tailwind / Ant / Bootstrap 气质
- 你想让 Agent 先选视觉方向，再根据真实业务重新设计布局
- 你需要把某种风格迁移到 React、Next.js、Vue 或静态 HTML 中

## 核心原则

**只复用视觉语言，不照搬示例布局。**

示例 HTML 的作用是预览风格。真实项目的页面结构、信息架构、模块顺序、栅格方式和响应式策略，都应该根据你的产品、内容优先级和用户工作流重新设计。

可复用的是：

- 色彩系统
- 字体和排版密度
- 圆角、边框、阴影、光晕
- 表面质感和装饰规则
- 按钮、卡片、输入框、导航、表格等组件气质
- hover、focus、selected、disabled、loading 等状态

不应该直接复用的是：

- 示例页面布局
- AI Pulse 的内容结构
- 模块顺序
- 导航模型
- 固定栅格方案

## 快速开始

本项目使用开放的 Agent Skills 目录结构：

```text
skills/
└── awesome-page-design/
    ├── SKILL.md
    ├── agents/
    ├── references/
    └── assets/
```

安装后，在支持 Skill 的 Agent 中这样使用：

```text
Use $awesome-page-design to choose a distinctive visual style for this dashboard.
Apply one of the awesome-page-design styles to this landing page without copying the sample layout.
用 awesome-page-design 给这个管理后台选一个不普通但仍然专业的视觉方向。
```

## 使用 npx skills 安装

> 注意：命令名是 `skills`，不是 `skill`。很多人会口头说 “npx skill”，实际 CLI 命令应写成 `npx skills ...`。

### 查看仓库里有哪些 Skill

```bash
npx skills add https://github.com/kuschzzp/awesome-page-design --list
```

### 安装到 Codex

```bash
npx skills add https://github.com/kuschzzp/awesome-page-design -g --skill awesome-page-design -a codex
```

### 安装到 Claude Code

```bash
npx skills add https://github.com/kuschzzp/awesome-page-design -g --skill awesome-page-design -a claude-code
```

### 安装到 OpenCode

```bash
npx skills add https://github.com/kuschzzp/awesome-page-design -g --skill awesome-page-design -a opencode
```

### 同时安装到多个客户端

```bash
npx skills add https://github.com/kuschzzp/awesome-page-design -g --skill awesome-page-design -a codex -a claude-code -a opencode
```

### 安装到当前项目，而不是全局

去掉 `-g` 即可：

```bash
npx skills add https://github.com/kuschzzp/awesome-page-design --skill awesome-page-design -a codex
```

### 从本地仓库安装

适合你正在开发或调试这个仓库时使用：

```bash
npx skills add ./ -g --skill awesome-page-design -a codex
```

### 常用管理命令

```bash
# 查看已安装 Skill
npx skills list -g

# 更新 Skill
npx skills update awesome-page-design -g

# 删除 Skill
npx skills remove awesome-page-design -g
```

## 客户端兼容性

`awesome-page-design` 遵循 `SKILL.md` + `references/` + `assets/` 的通用 Skill 结构，不依赖 Codex 私有能力，因此可以通过 `npx skills` 安装到多个支持 Agent Skills 的客户端。

已提供或适合的目标：

| 客户端 | `--agent` 参数 | 说明 |
|---|---|---|
| Codex | `codex` | 推荐，仓库内含 Codex 插件元数据 |
| Claude Code | `claude-code` | 可通过 `npx skills` 安装为本地 Skill |
| OpenCode | `opencode` | 可通过 `npx skills` 安装 |
| Cursor | `cursor` | 可通过 `npx skills` 作为通用 Agent Skill 安装 |
| Windsurf | `windsurf` | 可通过 `npx skills` 作为通用 Agent Skill 安装 |
| 其他 Agent | 视客户端而定 | 只要能读取 `SKILL.md` 和资源目录，就可以迁移使用 |

Claude 网页版 / Claude.ai、API 或其他非本地 CLI 场景，是否能直接加载取决于对应平台的 Skill 导入方式。这个仓库当前提供的是源码型 Skill 结构，不额外打包 `.skill` 文件。

参考：

- [Vercel Labs skills CLI](https://github.com/vercel-labs/skills)
- [Anthropic Skills repository](https://github.com/anthropics/skills)

## 风格目录

| 版本 | 风格 | 适合场景 | 视觉语言 |
|:---:|---|---|---|
| A | Classic News | 新闻、内容站、权威信息页 | 浅灰蓝底、Indigo 强调、Inter、细边框、柔和阴影 |
| B | Card Grid | 仪表盘、目录页、概览页 | 卡片网格、搜索、统计卡、轻量数据感 |
| C | Feed Layout | 信息流、社区、动态、文章流 | 单列 Feed、Cyan 强调、可展开卡片、软分割 |
| D | Bento Grid | 产品展示、Apple 风概览页 | Apple 灰、蓝色强调、大圆角、Bento 表面 |
| E | Glassmorphism | 沉浸式暗色落地页、AI 产品 | 深紫渐变、半透明玻璃、Cyan 高光、blur |
| F | Neo-Brutalism | 强品牌活动、独立产品、趣味工具 | 暖黄底、粗黑边框、硬阴影、高饱和标签 |
| G | Aurora Gradient | 未来感产品、AI 工具、高级暗色体验 | 暗色画布、极光渐变、柔光、漂移动效 |
| H | Retro Y2K | 音乐、潮流、青年文化、活动页 | 糖果渐变、霓虹、复古标题字、星光 |
| I | Swiss Editorial | 作品集、文化机构、严肃内容 | 白底、红色强调、Helvetica、严格网格、无阴影 |
| J | Terminal Hacker | 开发者工具、CLI、安全、开源 | 黑底、终端绿、等宽字体、扫描线 |
| K | Claymorphism | 教育、健康、友好型 SaaS | 薰衣草底、Nunito、软内外阴影 |
| L | Cute-alism | 玩法品牌、创作者工具、年轻产品 | 荧光黄、粉色硬阴影、贴纸感、软硬碰撞 |
| M | Resonant Stark | 高级暗色作品集、艺术、精品预告页 | 近黑底、细字重、微光、大留白 |
| N | Light Skeuomorphism | Apple 风工具、设备应用、触感 UI | Apple 灰、浮雕表面、内凹控件 |
| O | Human Scribble | 工作坊、教育、Maker、手写笔记 | 暖纸色、手绘字体、虚线边框、荧光笔 |
| P | Material You | Android 风应用、通用工具、生活方式产品 | Material 3 紫、动态色感、圆润 Surface |
| Q | Fluent Cloud | 生产力工具、云控制台、桌面应用 | Segoe UI、中性色、蓝色操作、轻景深 |
| R | Carbon Enterprise | 企业软件、数据平台、工业系统 | IBM 灰阶、蓝色操作、方正边界、高密度 |
| S | Polaris Commerce | 电商后台、商家工具、运营系统 | 温和中性色、绿色操作、资源列表清晰 |
| T | Atlassian Workbench | 协作工具、项目管理、团队看板 | 协作蓝、Lozenge 标签、工作台表面 |
| U | Gov Service | 政务、公共服务、法律、表单 | 高对比、黑色分割、蓝链接、黄色焦点 |
| V | Spectrum Creative | 创作软件、素材管理、媒体工具 | Adobe 风中性 UI、靛蓝强调、媒体网格 |
| W | Lightning CRM | CRM、销售、客服、客户运营 | 浅灰应用壳、Salesforce 蓝、紧凑业务卡 |
| X | Primer Dev | 开发者平台、文档、仓库、Issue | GitHub 风边框、蓝链接、等宽标签 |
| Y | Ant Pro | 企业中台、管理后台、数据表格 | Ant 蓝、细边框、白卡片、稳定状态 |

## 按产品类型选择

| 你的产品是... | 推荐风格 |
|---|---|
| 科技 SaaS 仪表盘 | D, P, Q, Y |
| 企业后台 / 数据平台 | R, W, Y, Q |
| 新闻媒体 / 内容站 | A, I |
| 开发者工具 / API 平台 | J, X |
| 电商运营 / 商家后台 | S, Y |
| 政务 / 公共服务 / 严肃表单 | U |
| 暗色 AI / 数据产品 | E, G, M |
| 创意工作室 / 作品集 | F, O, V |
| 年轻潮流品牌 | H, L |
| 友好圆润产品 | K, N, P |

## 如何把风格用到真实项目

1. 从上面的风格目录或匹配表选 1-3 个候选方向。
2. 打开对应 HTML 或 PNG，确认整体气质。
3. 阅读对应设计系统文档，提取视觉 token。
4. 在真实项目里先建立 CSS 变量或主题 token。
5. 把 token 映射到按钮、卡片、输入框、导航、表格等真实组件。
6. 根据业务重新设计页面结构，不复制 AI Pulse 示例布局。
7. 检查可访问性，尤其是对比度、focus 状态和动效强度。

## 本地预览

直接打开任意 HTML：

```bash
open styles/version-j-terminal/version-j-terminal.html
```

打开预览索引：

```bash
open previews/index.html
```

所有页面都是单文件静态 HTML，CSS 内联。部分字体通过 Google Fonts CDN 加载，离线时会回退到系统字体。

## 生成 PNG 预览

项目提供截图脚本，会调用本机 Chrome 无头模式，为 `styles/` 下每个 HTML 生成 PNG，并刷新 `previews/index.html`。

```bash
npm run previews
```

默认视口：

```text
1440x1200
```

自定义视口：

```bash
PREVIEW_WIDTH=1600 PREVIEW_HEIGHT=1400 npm run previews
```

自定义 Chrome 路径：

```bash
CHROME_PATH="/path/to/Google Chrome" npm run previews
```

## 项目结构

```text
awesome-page-design/
├── .codex-plugin/
│   └── plugin.json
├── skills/
│   └── awesome-page-design/
│       ├── SKILL.md
│       ├── agents/
│       │   └── openai.yaml
│       ├── references/
│       │   ├── style-index.md
│       │   ├── usage-principles.md
│       │   └── styles/
│       └── assets/
│           ├── previews/
│           └── styles/
├── styles/
│   ├── version-a-classic/
│   ├── version-b-grid/
│   └── ...
├── previews/
│   └── index.html
├── scripts/
│   ├── generate-previews.js
│   └── generate-system-inspired-styles.js
├── package.json
└── README.md
```

## 设计系统文档包含什么

每套风格的设计系统文档通常包含 14 个部分：

| # | 内容 |
|---:|---|
| 1 | 风格定义与核心精神 |
| 2 | 色彩体系 |
| 3 | 排版体系 |
| 4 | 边框、圆角、阴影、光晕 |
| 5 | 装饰元素与交互细节 |
| 6 | 视觉节奏与间距提示 |
| 7 | 响应式策略 |
| 8 | 组件速查表 |
| 9 | CSS 变量与代码片段 |
| 10 | 适用与不适用场景 |
| 11 | 与其他风格对比 |
| 12 | 变体建议 |
| 13 | 动效与微交互 |
| 14 | 实施指南与注意事项 |

## 维护说明

- 每个风格目录保持 HTML、设计系统 Markdown、PNG 预览一一对应。
- 更新 `styles/` 后，同步资源到 `skills/awesome-page-design/assets/styles/`。
- 更新风格列表后，同步 `skills/awesome-page-design/references/style-index.md`。
- 不要把示例布局描述成固定模板。
- `SKILL.md` 应保持短小，详细资料放在 `references/` 和 `assets/`。

## 开发命令

```bash
# 生成系统参考风格
npm run styles:systems

# 生成所有 PNG 预览
npm run previews
```

## License

[MIT](./LICENSE)
