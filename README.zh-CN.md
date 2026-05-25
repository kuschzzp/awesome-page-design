<div align="center">

# Awesome Page Design

**为 Agent 构建的网站与 Web App 准备的 25 种视觉风格提示库和 20 套页面布局框架。**

让 Codex、Claude Code、OpenCode、Cursor、Windsurf 等编码 Agent 在开始写 UI 前，先拥有更明确、更有辨识度的视觉与结构方向。

[English](./README.md) · [Roadmap](./ROADMAP.md) · [Skill 入口](./skills/awesome-page-design/SKILL.md) · [预览页](./skills/awesome-page-design/assets/previews/index.html) · [风格索引](./skills/awesome-page-design/references/style-index.md) · [布局索引](./skills/awesome-page-design/references/layout-index.md)

[![Agent Skill](https://img.shields.io/badge/Agent%20Skill-awesome--page--design-4F46E5)](./skills/awesome-page-design/SKILL.md)
[![Styles](https://img.shields.io/badge/styles-25-111827)](./skills/awesome-page-design/assets/styles)
[![Layouts](https://img.shields.io/badge/layouts-20-3157D5)](./skills/awesome-page-design/assets/layouts)
[![License: MIT](https://img.shields.io/badge/license-MIT-10B981)](./LICENSE)

</div>

---

## 这是什么？

Awesome Page Design 是一个面向 Agent 编码工具和前端开发者的 UI 设计 Skill。

它为 Agent 提供 25 套可复用的网站视觉方向和 20 套页面布局框架。视觉风格包含颜色、字体、边框、圆角、阴影、纹理、动效、组件气质和状态规则；布局框架包含信息层级、导航模型、页面密度、响应式行为和必备状态。目标很简单：让新网站和 Web App 不再长得像同一套默认 UI。

这不是固定页面模板库。仓库里的 HTML 使用 **AI Pulse** 品牌下的 **AI Daily Brief** 统一示例内容，只是为了让所有风格能在同一信息结构下对比。真实项目里，Agent 应该复用视觉语言，并根据产品重新设计页面结构。

## 安装

本项目以 Agent Skill 形式分发，可通过 `skills` CLI 安装。

> 命令是复数 `npx skills`。很多人会口头说 “npx skill”，但实际 CLI 命令应写成 `npx skills ...`。

### Codex

```bash
npx skills add https://github.com/kuschzzp/awesome-page-design -g --skill awesome-page-design -a codex
```

### Claude Code

```bash
npx skills add https://github.com/kuschzzp/awesome-page-design -g --skill awesome-page-design -a claude-code
```

### OpenCode

```bash
npx skills add https://github.com/kuschzzp/awesome-page-design -g --skill awesome-page-design -a opencode
```

### 多客户端同时安装

```bash
npx skills add https://github.com/kuschzzp/awesome-page-design -g --skill awesome-page-design -a codex -a claude-code -a opencode
```

### 从本地仓库安装

```bash
npx skills add ./ -g --skill awesome-page-design -a codex
```

## 快速开始

安装后，可以这样让 Agent 使用：

```text
Use $awesome-page-design to choose a distinctive visual style for this dashboard.
Apply one of the awesome-page-design styles to this landing page without copying the sample layout.
Combine an awesome-page-design visual style with a layout framework for this analytics page.
用 awesome-page-design 给这个管理后台选一个不普通但仍然专业的视觉方向。
```

Skill 会引导 Agent：

1. 阅读使用原则。
2. 把你的需求总结成一个简短的选择摘要。
3. 在尚未选择风格/布局时，打开或提供预览页。
4. 请你从预览页复制一个风格提示词；完整页面还需要复制一个布局提示词。
5. 只有当你明确让 Agent 代选时，才由 Agent 给出少量候选方案。
6. 阅读对应风格和布局文档。
7. 把选定风格翻译成 CSS 变量、主题 token 或组件类。
8. 对相近的系统风格或后台布局应用防混淆规则。
9. 根据真实产品重新设计布局，而不是复制示例 HTML。

### 必选预览确认门槛

对于完整页面和 App 屏幕，这个 Skill 不应该在你描述完需求后直接暗自决定最终风格。它应该先引导你打开预览页，对比 25 种视觉风格和 20 套布局框架；等你选好并复制对应提示词后，再继续实现。

如果你希望 Agent 代选，需要明确说出来。此时 Agent 应该提出 2-3 个风格候选和 1-2 个布局候选，简单说明差异，并在最终实现前等待确认。

## 预览风格和布局

在仓库根目录启动本地预览服务：

```bash
npm run preview:serve
```

然后打开命令输出的 URL：

```text
http://127.0.0.1:<port>/assets/previews/
```

预览页包含 25 个视觉风格和 20 个布局框架，支持中英文切换、可复制的风格/布局提示词，以及每个 HTML 示例的直接入口。

安装到客户端后，可能没有 package scripts。进入已安装的 `awesome-page-design` Skill 目录，启动 Skill 自带的静态服务：

```bash
node scripts/serve-preview.js
```

然后打开：

```text
http://127.0.0.1:<port>/assets/previews/
```

也保留从仓库根目录直接打开本地 HTML 的兜底方式：

```bash
open skills/awesome-page-design/assets/previews/index.html
open skills/awesome-page-design/assets/styles/version-j-terminal/version-j-terminal.html
open skills/awesome-page-design/assets/layouts/l08-analytics-command-center/l08-analytics-command-center.html
```

在已安装的 Skill 里，同样的文件位于 `assets/`：

```bash
open assets/previews/index.html
open assets/styles/version-j-terminal/version-j-terminal.html
open assets/layouts/l08-analytics-command-center/l08-analytics-command-center.html
```

这些示例都是静态单文件 HTML。部分风格会从 Google Fonts 加载字体，离线时会回退到系统字体。

## 包含什么？

```text
skills/awesome-page-design/
├── SKILL.md                         # Skill 入口
├── agents/
│   └── openai.yaml                  # Agent 元数据
├── references/
│   ├── usage-principles.md          # 正确使用方式
│   ├── style-index.md               # 所有风格的短索引
│   ├── layout-index.md              # 页面布局框架短索引
│   ├── styles/                      # 完整设计系统文档
│   └── layouts/                     # 完整布局框架文档
└── assets/
    ├── previews/
    │   └── index.html               # 预览索引
    ├── styles/                      # 视觉风格 HTML 和 PNG 预览资源
    └── layouts/                     # 布局框架 HTML 和 PNG 预览资源
```

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

| 产品类型 | 推荐风格 |
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

## 避免相似风格混淆

部分风格故意位于成熟产品设计系统家族，但它们不应该只是同一套蓝色 SaaS 外壳：

- Q - Fluent Cloud：用于命令栏、分栏、搜索、活动面板等生产力应用界面。
- R - Carbon Enterprise：用于方正、高密度、诊断型企业数据网格。
- S - Polaris Commerce：用于商家资源列表、批量操作、履约状态和订单抽屉。
- T - Atlassian Workbench：用于计划看板、工作项、Lozenge 标签和团队协作流。
- W - Lightning CRM：用于客户记录页、销售阶段、相关列表和活动时间线。
- X - Primer Dev：用于仓库、文件树、代码块、Issue、标签和开发者工作流。
- Y - Ant Pro：用于查询表单、表格工具栏、抽屉、中台管理和中性后台状态。

## 页面布局框架

布局框架描述页面结构和工作流。它可以单独使用，也可以和任意视觉风格组合。

| ID | 布局框架 | 适合场景 |
|---|---|---|
| L01 | Dense Admin Dashboard | 内部工具、运营后台、指标和管理系统 |
| L02 | SaaS Landing Page | 产品营销、创业公司、转化页 |
| L03 | AI Copilot Workspace | AI 应用、Agent 工具、助手驱动工作流 |
| L04 | Developer Docs Portal | API 文档、SDK 文档、技术指南 |
| L05 | Editorial News Homepage | 媒体、内容站、研究摘要 |
| L06 | Ecommerce Admin Console | 商家工具、订单、库存、履约 |
| L07 | CRM Sales Workspace | 销售、客服、客户运营 |
| L08 | Analytics Command Center | BI、监控、金融、产品分析 |
| L09 | Portfolio Case Study | 工作室、个人作品集、案例展示 |
| L10 | Settings Console | 安全、集成、权限、账号配置 |
| L11 | Onboarding Wizard | 设置流程、导入、账号激活 |
| L12 | Marketplace Catalog | 应用商店、模板、资源、产品目录 |
| L13 | Admin Overview Command Center | 后台首页、SaaS 控制台、管理层运营总览 |
| L14 | Master Detail Admin Table | 资源管理、用户列表、审批队列、数据库式后台 |
| L15 | Operations Timeline Console | 事件运营、发布追踪、客服和履约流程 |
| L16 | Personal Portfolio Home | 设计师、工程师、顾问、个人品牌网站 |
| L17 | Personal Writing Home | 博客、Newsletter、独立研究者、创作者主页 |
| L18 | Corporate Homepage | B2B 企业、专业服务、企业形象官网 |
| L19 | Corporate Services Site | 机构、咨询公司、解决方案服务商 |
| L20 | Enterprise Product Overview | 平台官网、企业产品矩阵、高信任产品介绍页 |

每个布局框架都有独立的静态 HTML 预览和 PNG 截图，位于 `skills/awesome-page-design/assets/layouts/`。这些预览刻意拉开结构差异：后台、文档、电商、CRM、分析大屏、案例页、设置、引导流程和市场目录不应该都长成同一种卡片网格。

这些布局预览是高保真的结构参考，不是线框图。它们包含真实的层级、信息密度、状态区域、上下文侧栏和产品化示例内容，方便 Agent 在应用到真实项目之前理解不同页面框架的差异。

相近布局也有明确分工：L01 偏筛选、KPI、优先级表格和行动队列；L08 偏分析维度、图表、异常和下钻；L13 偏管理层总览、跨团队状态和决策提示；L06 偏电商履约；L14 偏表格优先的资源管理；L15 偏事件时间线、SLA 和 runbook。

组合提示词示例：

```text
Use awesome-page-design visual style: Version R - Carbon Enterprise.
Use layout framework: L01 - Dense Admin Dashboard.
Apply both, but design the actual layout around the product requirements.
```

## Agent 使用规则

这个 Skill 有一条不可违反的规则：

> 复用视觉语言，不复制示例布局。

可复用：

- 色彩 token 和语义色
- 字体、字重、字号层级和信息密度
- 边框、圆角、阴影、光晕和表面处理
- 按钮、标签、卡片、输入框、表格、导航、空状态的组件气质
- hover、focus、selected、disabled、loading、alert 状态
- 动效节奏和纹理规则
- 布局层级、导航模型、信息密度、响应式行为和必备状态

不要当作需求复用：

- 精确页面布局
- 信息架构
- 模块顺序
- 栅格策略
- 示例内容结构
- 精确导航标签和示例菜单项

## 生成预览图

项目提供截图脚本，会调用本机 Chrome 无头模式，为每个视觉风格和布局框架 HTML 生成 PNG，并刷新 `skills/awesome-page-design/assets/previews/index.html`。

```bash
npm run previews
```

自定义视口：

```bash
PREVIEW_WIDTH=1600 PREVIEW_HEIGHT=1400 npm run previews
```

自定义 Chrome 路径：

```bash
CHROME_PATH="/path/to/Google Chrome" npm run previews
```

## 开发命令

```bash
# 生成系统参考风格文件
npm run styles:systems

# 生成 PNG 预览
npm run previews

# 以本地 URL 方式预览风格和布局库
npm run preview:serve
```

## 参考

- [Vercel Labs skills CLI](https://github.com/vercel-labs/skills)
- [Anthropic Skills repository](https://github.com/anthropics/skills)

## License

[MIT](./LICENSE)
