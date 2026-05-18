# Web Style Templates — 25 种网站视觉风格提示

> 一个面向后续网站开发的多风格视觉提示库，沉淀颜色、字体、边框、圆角、阴影、动效、组件气质等风格信息，帮助项目在早期快速确定差异化视觉方向，避免做出千篇一律的网页。

---

## 项目概览

本项目不是一个真实的 AI 新闻产品，也不是完整业务系统。**AI Pulse** 只是统一的示例内容，用来让 25 种风格在相同信息结构下进行横向对比。

真正的目标是建立一套可复用的 **网站视觉风格提示库**。后续开发新网站时，可以先从这里选择一个合适的视觉方向，再参考对应 HTML 页面和设计系统文档，把颜色、字体、边框、圆角、阴影、动效、组件气质和状态规则迁移到实际项目中。

**重要原则**：本项目不提供固定页面布局方案。HTML 中的版式只是为了让同一套示例内容能够被预览和截图；真实项目的页面结构、信息架构、模块顺序、栅格方式和响应式策略，都应根据用户需求、业务流程和内容优先级重新设计。

每种风格均包含：

- **完整的 HTML 页面** — 可直接在浏览器中打开预览，用统一示例内容展示真实页面效果
- **详尽的设计系统文档** — 14 章节结构，涵盖色彩、排版、阴影、质感、组件气质、对比、变体、适用场景等

设计灵感来源于 Awwwards、99designs/VistaPrint 2026 趋势报告、UX 设计社区等。

---

## 项目目标

- **沉淀可复用视觉语言**：每个版本都不只是一个页面，而是一组可迁移的风格线索。
- **提高开发起步速度**：在新项目开始时，先选定视觉风格，再按业务需求重新设计页面结构。
- **保持网站差异化**：通过不同色彩、字体、边框、圆角、阴影、装饰和交互方式，避免所有项目都长得像同一套默认 UI。
- **统一设计与开发参考**：HTML 用于看效果，设计系统文档用于查规范，二者一一对应。
- **支持后续框架迁移**：可将选定风格迁移到 React、Next.js、Vue 或其他前端框架中。

---

## Codex Skill / skills CLI 安装

本项目已封装为 `awesome-page-design` Skill，方便在后续开发网站、后台、仪表盘、落地页或组件时作为视觉风格提示库使用。

提交到 GitHub 后，可以像安装其他 Skill 一样使用 `skills` CLI 安装：

```bash
npx skills add https://github.com/kuschzzp/awesome-page-design -g --skill awesome-page-design -a codex
```

仓库采用通用 Skill 仓库结构：

```text
skills/
└── awesome-page-design/
    ├── SKILL.md
    ├── references/
    └── assets/
```

`skills/awesome-page-design/SKILL.md` 是 Skill 的核心入口，完整 HTML、设计系统文档和 PNG 预览放在 `skills/awesome-page-design/assets/` 中。`.codex-plugin/plugin.json` 声明了 Codex 插件元数据和 `skills` 目录位置。

---

## 版本总览

| 版本 | 风格名称 | 一句话描述 | 亮/暗 | 文件 |
|:---:|---|---|---|---|
| **A** | Classic News | 经典新闻门户，Inter字体+Indigo紫蓝 | 亮 | `styles/version-a-classic/` |
| **B** | Card Grid | 数据仪表板式卡片网格，搜索框+统计卡片 | 亮 | `styles/version-b-grid/` |
| **C** | Feed Layout | 信息流/社交媒体风格，单列可展开卡片 | 亮 | `styles/version-c-feed/` |
| **D** | Bento Grid | Apple风格Bento盒式布局，大圆角+统计数字 | 亮 | `styles/version-d-bento/` |
| **E** | Glassmorphism | 毛玻璃通透风格，深紫背景+半透明卡片 | 暗 | `styles/version-e-glass/` |
| **F** | Neo-Brutalism | 新粗野主义，暖黄底+粗黑边框+硬阴影 | 亮 | `styles/version-f-brutalism/` |
| **G** | Aurora Gradient | 流光极光风格，4色极光blob漂移+光晕发光 | 暗 | `styles/version-g-aurora/` |
| **H** | Retro Y2K | 千禧年复古风格，糖果渐变+星光闪烁+花体字 | 亮 | `styles/version-h-y2k/` |
| **I** | Swiss Editorial | 瑞士国际主义排版风格，网格+红色强调+Helvetica | 亮 | `styles/version-i-swiss/` |
| **J** | Terminal Hacker | 黑客终端风格，纯黑底+绿色发光+等宽字体 | 暗 | `styles/version-j-terminal/` |
| **K** | Claymorphism | 软泥膨体风格，紫薰衣草底+内外柔和阴影+圆润字体 | 亮 | `styles/version-k-clay/` |
| **L** | Cute-alism | 卡哇伊+粗野碰撞，荧光黄底+粉色硬阴影+emoji贴纸 | 亮 | `styles/version-l-cutealism/` |
| **M** | Resonant Stark | 共鸣简约风格，深黑底+超细字体+微光晕+大量留白 | 暗 | `styles/version-m-stark/` |
| **N** | Light Skeuomorphism | 轻拟物主义，Apple灰底+7级emboss/inset阴影+渐变图标 | 亮 | `styles/version-n-skeuomorph/` |
| **O** | Human Scribble | 手写涂鸦风格，米色底+虚线边框+荧光笔标注+手写字体 | 亮 | `styles/version-o-scribble/` |
| **P** | Material You | Material 3 式动态色彩、圆润 Surface、大号行动按钮 | 亮 | `styles/version-p-material-you/` |
| **Q** | Fluent Cloud | Fluent 2 式中性色、Segoe 字体、命令栏和轻量景深 | 亮 | `styles/version-q-fluent-cloud/` |
| **R** | Carbon Enterprise | IBM Carbon 式灰阶层级、蓝色操作色、方正网格 | 亮 | `styles/version-r-carbon-enterprise/` |
| **S** | Polaris Commerce | Shopify Polaris 式商家后台、资源列表、温和绿色 | 亮 | `styles/version-s-polaris-commerce/` |
| **T** | Atlassian Workbench | Atlassian 式协作工作区、蓝色主操作、Lozenge 标签 | 亮 | `styles/version-t-atlassian-workbench/` |
| **U** | Gov Service | GOV.UK 式高对比政府服务、黑线框、蓝链接、黄焦点 | 亮 | `styles/version-u-gov-service/` |
| **V** | Spectrum Creative | Adobe Spectrum 式创作面板、靛蓝强调、媒体网格 | 亮 | `styles/version-v-spectrum-creative/` |
| **W** | Lightning CRM | Salesforce Lightning 式 CRM 控制台、浅灰应用壳、业务卡 | 亮 | `styles/version-w-lightning-crm/` |
| **X** | Primer Dev | GitHub Primer 式开发者界面、仓库卡片、代码气质 | 亮 | `styles/version-x-primer-dev/` |
| **Y** | Ant Pro | Ant Design 式企业中台、蓝色主色、细边框表格 | 亮 | `styles/version-y-ant-pro/` |

---

## 风格分类

### 亮色系（10种）

| 版本 | 底色 | 强调色 | 深度手法 | 字体 |
|---|---|---|---|---|
| A | #f8f9fc 浅灰蓝 | #4f46e5 Indigo紫 | 微阴影+渐变头部 | Inter |
| B | #f5f6fa 浅灰 | #7c3aed Violet紫 | 微阴影 | Inter |
| C | #f5f6fa 浅灰 | #0891b2 Cyan青 | 微阴影+可展开 | Inter |
| D | #f5f5f7 Apple灰 | #0071E3 Apple蓝 | 大圆角+scale hover | Inter |
| F | #fef3c7 暖黄奶油 | #f43f5e Rose粉 | 粗黑边框+硬阴影 | 系统字体 |
| H | 糖果色渐变 | 霓虹多色 | 堆叠+闪烁 | Y2K花体 |
| I | #FFFFFF 纯白 | #FF0000 红 | 网格分割线 | Helvetica |
| K | #f0e6ff 紫薰衣草 | #7c5cfc 紫 | 内外双柔和阴影 | Nunito |
| L | #FFE66D 荧光黄 | #FF1493 深粉 | 粉色硬阴影+emoji | Space Mono+Nunito |
| N | #F5F5F7 Apple灰 | #0071E3 Apple蓝 | 7级emboss/inset阴影 | 系统字体 |
| O | #FFF8F0 米白 | #1A3A5C 墨蓝 | 虚线+荧光笔 | Caveat+Permanent Marker |

### 暗色系（4种）

| 版本 | 底色 | 强调色 | 深度手法 | 字体 |
|---|---|---|---|---|
| E | #0c0e1a→#2d1b69 深紫渐变 | #00d4ff 青+ #7c5cfc 紫 | backdrop-filter blur | Inter |
| G | #0f0f1a 极深黑蓝 | 4色极光(绿/紫/粉/蓝) | 光晕glow+漂移blob | Outfit |
| J | #000000 纯黑 | #00FF00 绿 | 发光文字+扫描线 | Monospace |
| M | #0A0A0B 极深黑 | #C8B8FF 淡紫+ #FFB8C8 暖粉 | 微光晕orb+1px边线 | Inter+JetBrains Mono |

### 公开设计系统参考系（10种）

| 版本 | 参考系统 | 主色 | 视觉提示 | 字体 |
|---|---|---|---|---|
| P | Material Design 3 | #6750a4 紫 | 圆润 Surface + 大按钮 | Roboto/系统字体 |
| Q | Microsoft Fluent 2 | #0f6cbd 蓝 | 轻量透明层级 + 原生应用感 | Segoe UI |
| R | IBM Carbon | #0f62fe 蓝 | 灰阶秩序 + 方正边界 + 高密度 | IBM Plex/Helvetica |
| S | Shopify Polaris | #008060 绿 | 温和商家后台气质 + 清晰状态 | 系统字体 |
| T | Atlassian Design System | #0c66e4 蓝 | 协作产品蓝 + Lozenge 标签 | 系统字体 |
| U | GOV.UK Design System | #1d70b8 蓝 | 高对比 + 黑色分割线 + 黄焦点 | Arial/Helvetica |
| V | Adobe Spectrum | #5258e4 靛蓝 | 创作软件质感 + 柔和控件 | Adobe Clean/系统字体 |
| W | Salesforce Lightning | #0176d3 蓝 | 浅灰应用壳 + 紧凑业务状态 | 系统字体 |
| X | GitHub Primer | #0969da 蓝 | 开发者气质 + 边框分区 + 等宽标签 | 系统字体+等宽标签 |
| Y | Ant Design | #1677ff 蓝 | 中性企业蓝 + 细边框 + 稳健状态 | 系统字体 |

---

## 每种风格核心特征速览

### Version A — Classic News
- 毛玻璃导航质感 (blur 20px)
- 主信息卡 + 次级信息卡的新闻门户层级感
- 紫蓝渐变logo (135deg #4f46e5 → #7c3aed)
- SVG图标系统（闪电/趋势图标）
- 滚动到顶部按钮 + 日期显示

### Version B — Card Grid
- 搜索框 + 实时更新脉搏点 + 统计行（4个数据卡片）
- Featured 卡片尺寸差异带来的信息密度变化
- emoji图标占位图片区域
- 文本截断 `-webkit-line-clamp: 2`

### Version C — Feed Layout
- 单列720px居中信息流（模仿Twitter/Medium）
- 日期分割线标记（今日/昨日）
- 可展开卡片 `toggleExpand(this)`
- 今日速览摘要卡片（圆点列表）
- 阅读/收藏/分享三个交互按钮

### Version D — Bento Grid
- Bento 盒式模块质感，大圆角、浅灰底、克制阴影
- 统计卡片、排名列表、新闻卡片的 Apple 式信息层级
- 暗色本周概览面板 + 蓝色订阅卡片
- Apple标志性 blur(40px) saturate(2) 导航

### Version E — Glassmorphism
- 深紫渐变背景 + 2个固定径向光晕
- 三档玻璃透明度：8%/15%/25%
- 青色侧边竖线标记 `::before 3px×10px`
- 突发标签红色脉搏点动画
- 趋势项hover右移6px

### Version F — Neo-Brutalism
- 暖黄奶油底 #fef3c7（灵魂色）
- 纯黑3px边框 + 4px硬阴影，零圆角按钮
- emoji代替图标库
- 标签颜色=分类颜色，直接填色+黑边框
- 每个分类有独立饱和色

### Version G — Aurora Gradient
- 4个120px模糊极光blob，20s漂移动画
- Hero顶部3px极光stripe + shimmer流动
- 4色极光严格分工：绿=突发、紫=分类、粉=热门、蓝=强调
- box-shadow光晕代替所有硬阴影
- section标题8px发光点

### Version H — Retro Y2K
- 糖果色渐变背景 + 星光闪烁动画
- Y2K花体字标题 + 系统字体正文
- 鼠标跟随星光效果（JS实现）
- 渐变按钮 + 霓虹标签
- 背景网格线装饰

### Version I — Swiss Editorial
- 纯白底 + 红色(#FF0000)强调
- Helvetica/系统字体，严格排版网格
- 红色2px分割线代替阴影
- 图片占位区+引号装饰
- 极简主义，零装饰

### Version J — Terminal Hacker
- 纯黑底 + 纯绿(#00FF00)发光文字
- 等宽字体 Monospace
- 绿色文字发光 `text-shadow: 0 0 10px #00FF00`
- 扫描线效果（repeating-linear-gradient）
- 仿终端命令行交互样式

### Version K — Claymorphism
- 紫薰衣草底 #f0e6ff
- 内外双柔和阴影系统：outer(6px/6px) + inner(inset -4px/-4px)
- Nunito圆润字体，800字重
- 分类图标内阴影模拟3D凸起
- 订阅区紫色背景+内凹输入框

### Version L — Cute-alism
- 荧光黄底 #FFE66D（2026趋势#1）
- 双字体碰撞：Space Mono(硬) + Nunito(软)
- 粉色硬阴影 `4px 4px 0 #FF1493`
- 50px药丸圆角(标签) vs 8px小圆角(标记) 矛盾体系
- 点击页面任意位置弹出随机emoji星星
- 背景8个30%透明emoji浮动装饰

### Version M — Resonant Stark
- 极深黑 #0A0A0B + 3个120px微光晕orb
- 超细字体 Inter weight 200/300
- 1px半透明分割线 + 极细字间距letter-spacing
- 进场动画 `fade-up 1s` 逐层延迟
- hover→2px紫色左边线逐行增长
- 青/暖粉/薄荷绿三色微色点缀

### Version N — Light Skeuomorphism
- Apple灰 #F5F5F7 + 系统字体栈（2026趋势#5）
- 7级阴影系统：sm/md/lg/xl/raised/inset/emboss
- 浮雕按钮 `emboss`：顶部亮线+底部暗线
- 内凹输入框 `inset`：凹槽感
- 渐变分类图标 135°双色渐变模拟App Store图标
- 进度条双向阴影：track内凹 + fill凸起

### Version O — Human Scribble
- 米白底 #FFF8F0 + 网格纸纹理（2026趋势#8）
- 3字体体系：Caveat(手写标注) + Permanent Marker(标题) + Inter(正文)
- 荧光笔标记：黄色 `rgba(255,220,0,0.25)` 高亮关键词
- 虚线边框代替实线 `2px dashed`
- 分类下划线 `::after` 各色2px实线
- 左边框3px分类色标记
- 手写note批注装饰

### Version P — Material You
- Material 3 式动态色彩感，紫色主色 + 柔和粉紫渐变
- 28px 大圆角 Surface container
- 大号 Hero 标题和药丸主按钮
- 适合移动优先、工具型、生活方式类产品

### Version Q — Fluent Cloud
- Segoe UI 字体栈 + Windows 应用式中性色
- 轻量透明面板和命令栏导航
- 蓝色主操作色 #0f6cbd
- 适合桌面应用、云控制台、生产力工具

### Version R — Carbon Enterprise
- IBM Carbon 式灰阶层级和方正边界
- 黑色顶部 Shell + 蓝色操作色 #0f62fe
- 零圆角、弱阴影、高信息密度
- 适合企业后台、数据平台、工业系统

### Version S — Polaris Commerce
- Shopify Polaris 式商家后台气质
- 温和绿色主色 #008060
- 资源列表、状态卡片和操作优先
- 适合电商后台、运营平台、商家工具

### Version T — Atlassian Workbench
- Atlassian 式协作产品气质
- 蓝色主操作 + Lozenge 标签
- 任务流卡片、项目上下文和右侧洞察面板
- 适合项目管理、协作文档、团队工具

### Version U — Gov Service
- GOV.UK 式高对比服务页面
- 黑色分割线、蓝色链接、黄色焦点色
- 零圆角、零阴影，强调清晰可访问
- 适合政务、公共服务、严肃信息查询

### Version V — Spectrum Creative
- Adobe Spectrum 式创作面板和媒体网格
- 靛蓝主色 + 柔和创意渐变
- 工具面板、素材卡和轻量层级
- 适合设计工具、内容创作、素材平台

### Version W — Lightning CRM
- Salesforce Lightning 式浅灰应用壳
- CRM 控制台、对象卡片和紧凑业务信息
- 蓝色主操作 #0176d3
- 适合销售、客服、客户成功、业务管理系统

### Version X — Primer Dev
- GitHub Primer 式开发者界面
- 仓库卡片、边框分区、等宽标签
- 黑色顶部栏 + 蓝色链接体系
- 适合开发者工具、API 平台、开源社区

### Version Y — Ant Pro
- Ant Design 式企业中台风格
- 蓝色主色 #1677ff + 细边框白卡片
- 统计卡、筛选栏、表格式信息呈现
- 适合管理后台、B 端 SaaS、数据看板

---

## 设计系统文档结构

每份设计系统文档均包含以下 14 个章节：

| # | 章节 | 内容 |
|---:|---|---|
| 1 | 风格定义与核心精神 | 风格来源、核心理念、3-5条设计原则 |
| 2 | 色彩体系 | 调色板表格(CSS变量+值+用途)、色彩使用规则、推导公式 |
| 3 | 排版体系 | 字体选择+字号+字重+行高+字间距，各层级表格 |
| 4 | 边框/圆角/阴影体系 | 边框规格表、圆角阶梯表、阴影/光晕规格表 |
| 5 | 装饰元素/交互细节 | hover效果、动画、伪元素装饰、特殊交互 |
| 6 | 视觉节奏/间距提示 | 间距倾向、密度建议、留白气质；不是固定页面布局 |
| 7 | 响应式策略 | 各断点变化表格 |
| 8 | 组件速查表 | 所有组件的背景/边框/圆角/padding/hover规格 |
| 9 | CSS变量/代码片段 | `:root`完整变量清单+关键组件CSS代码 |
| 10 | 适用/不适用场景 | 适用行业列表+不适用行业列表 |
| 11 | 与其他风格对比 | 多维对比表格(背景/深度/强调色/字体/圆角/气质) |
| 12 | 变体建议 | 4-5种变体方向(暗色版/极简版/行业版等) |
| 13 | 动效/微交互 | 所有动画/交互的触发条件+实现方式+持续时间 |
| 14 | 实施指南/注意事项 | 5-8条不可违反原则+兼容性警告+性能提示 |

---

## 文件索引

```
miniapps/
├── styles/
│   ├── version-a-classic/
│   │   ├── version-a-classic.html
│   │   ├── version-a-classic-design-system.md
│   │   └── version-a-classic.png
│   ├── version-b-grid/
│   │   ├── version-b-grid.html
│   │   ├── version-b-grid-design-system.md
│   │   └── version-b-grid.png
│   └── ...                                 # 其余风格同样一目录三文件
├── previews/
│   └── index.html                          # 所有 PNG 的总览索引页
├── scripts/
│   └── generate-previews.js                # 批量生成 PNG 和索引页
├── package.json
└── README.md
```

---

## 使用方式

### 作为视觉风格提示使用

1. **先按产品气质选风格**：例如 SaaS 仪表板可参考 D/N，创意工作室可参考 F/O，暗色科技产品可参考 E/G/M。
2. **打开 HTML 看整体气质**：确认颜色、字体、质感、密度、组件形态是否符合项目。
3. **阅读对应设计系统文档**：提取色彩变量、字体层级、圆角、阴影、边框、状态、动效规则。
4. **重新设计真实页面布局**：不要照搬 AI Pulse 的内容结构或示例版式，应根据用户需求、业务流程和内容优先级单独设计页面。
5. **保持风格一致性**：新增页面时优先复用该风格的视觉变量和组件气质，再根据业务做小范围变体。

### 预览页面

直接在浏览器中打开任意 `.html` 文件即可预览：

```bash
# macOS
open styles/version-f-brutalism/version-f-brutalism.html

# 或使用任意浏览器
chrome styles/version-f-brutalism/version-f-brutalism.html
```

所有页面均为单文件 HTML，CSS 内联，字体通过 Google Fonts CDN 加载，无需构建工具。

### 生成 PNG 预览图

项目提供了一个无依赖截图脚本，会调用本机 Chrome 无头模式，为 `styles/` 下每个风格目录里的 HTML 生成一张 PNG：

```bash
npm run previews
```

输出位置：

```text
styles/
├── version-a-classic/
│   ├── version-a-classic.html
│   ├── version-a-classic-design-system.md
│   └── version-a-classic.png
└── ...
previews/
└── index.html                 # 预览图索引页，引用各风格目录里的 PNG
```

默认截图视口为 `1440x1200`。如需调整尺寸：

```bash
PREVIEW_WIDTH=1600 PREVIEW_HEIGHT=1400 npm run previews
```

如果 Chrome 不在默认路径，可指定：

```bash
CHROME_PATH="/path/to/Google Chrome" npm run previews
```

### 阅读设计系统文档

```bash
# 在终端中阅读
cat styles/version-f-brutalism/version-f-brutalism-design-system.md

# 或在编辑器/Markdown阅读器中打开
```

### 按需求选风格

| 如果你的产品是... | 推荐版本 |
|---|---|
| 科技SaaS仪表板 | D (Bento) 或 N (Skeuomorph) |
| 新闻/媒体门户 | A (Classic) 或 I (Swiss) |
| 社交/社区平台 | C (Feed) 或 L (Cute-alism) |
| 游戏/电竞品牌 | J (Terminal) 或 G (Aurora) |
| 创意/设计工作室 | F (Brutalism) 或 O (Scribble) |
| AI/数据科技暗色 | E (Glass) 或 M (Stark) |
| 时尚/潮流品牌 | H (Y2K) 或 L (Cute-alism) |
| 教育/少儿产品 | K (Clay) 或 L (Cute-alism) |
| 奢侈/高端品牌 | E (Glass) 或 N (Skeuomorph) |
| 极简/冥想/健康 | M (Stark) 或 I (Swiss) |

---

## 设计趋势来源

| 趋势名称 | 来源 | 对应版本 |
|---|---|---|
| Cute-alism | VistaPrint/99designs 2026 趋势 #1 | L |
| Dial-Up Delight | VistaPrint/99designs 2026 趋势 #2 | H (Retro Y2K) |
| Resonant Stark | VistaPrint/99designs 2026 趋势 #3 | M |
| Frosted Touch | VistaPrint/99designs 2026 趋势 #4 | E (Glassmorphism) |
| Light Skeuomorphism | VistaPrint/99designs 2026 趋势 #5 | N |
| Snug Simple | VistaPrint/99designs 2026 趋势 #7 | K (Claymorphism 近似) |
| Human Scribble | VistaPrint/99designs 2026 趋势 #8 | O |
| Neo-Brutalism | Awwwards/Figma/Webflow 社区 2023-2026 | F |
| Swiss/International Style | 经典排版传统 (1920s-) | I |
| Terminal/Hacker Aesthetic | Cyberpunk/黑客文化 | J |
| Bento Grid | Apple 2023 产品页风格 | D |
| Aurora/Gradient | 极光/流光暗色设计趋势 | G |
| Material Design 3 | Google 官方设计系统 | P |
| Microsoft Fluent 2 | Microsoft 官方设计系统 | Q |
| IBM Carbon | IBM 官方设计系统 | R |
| Shopify Polaris | Shopify 官方设计系统 | S |
| Atlassian Design System | Atlassian 官方设计系统 | T |
| GOV.UK Design System | 英国政府服务设计系统 | U |
| Adobe Spectrum | Adobe 官方设计系统 | V |
| Salesforce Lightning | Salesforce 官方设计系统 | W |
| GitHub Primer | GitHub 官方设计系统 | X |
| Ant Design | Ant Group 开源设计系统 | Y |

---

## 关键设计决策记录

| 决策 | 原因 |
|---|---|
| 使用 AI Pulse 作为统一示例内容 | 抹平内容差异，纯粹对比视觉风格；AI Pulse 不是项目本体 |
| 单文件HTML，CSS内联 | 无构建依赖，一键预览 |
| 设计系统文档14章节统一结构 | 让每套视觉风格都能被系统性参考，但不绑定固定页面布局 |
| 文件名 `version-X-风格名` 格式 | HTML与MD文档1:1对应，便于查找 |
| Google Fonts CDN加载字体 | 避免本地字体文件，保持单文件架构 |
| 不引入图标库 | 部分风格用emoji（F/L），部分用SVG（A），保持风格纯粹性 |

---

## 技术说明

- **纯前端**：所有页面为静态HTML，无后端依赖
- **字体加载**：通过 `@import url()` 引入 Google Fonts，需联网
- **响应式**：所有页面包含至少2个断点的响应式适配
- **交互**：部分页面包含JS交互（C的可展开、L的点击emoji、A的滚动按钮、B/C的标签切换等）
- **无外部依赖**：不使用Tailwind/Bootstrap等框架，所有CSS手写
- **浏览器兼容**：backdrop-filter（E/G）需Safari/Chrome支持；CSS grid全部页面使用

---

## 后续可能的扩展方向

- **Version Z** — Vaporwave（蒸汽波：粉紫渐变+网格+罗马柱）
- **Version AA** — Cyberpunk（赛博朋克：霓虹线+故障效果+暗色）
- **Version AB** — Newspaper Classic（经典报纸：衬线字体+多栏+大标题）
- **Version AC** — Organic Nature（自然有机：绿色系+不规则形状+木纹）
- **Version AD** — Manga/Anime（漫画风格：日式排版+对话框+网点效果）
- **交互升级** — 为所有页面添加真实JS交互（标签过滤、搜索、展开等）
- **框架迁移** — 将选定风格迁移到 React/Next.js 组件化实现
