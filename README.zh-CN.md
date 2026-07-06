<div align="center">

# Awesome Page Design

**为 Agent 构建的网站与 Web App 准备的 26 种视觉风格提示库。**

让编码 Agent 在开始写 UI 前，先拥有更明确、更有辨识度的视觉方向。

[English](./README.md) · [Roadmap](./ROADMAP.md) · [Skill 入口](./skills/awesome-page-design/SKILL.md) · [预览页](./skills/awesome-page-design/assets/previews/index.html) · [风格索引](./skills/awesome-page-design/references/style-index.md)

[![Agent Skill](https://img.shields.io/badge/Agent%20Skill-awesome--page--design-4F46E5)](./skills/awesome-page-design/SKILL.md)
[![Styles](https://img.shields.io/badge/styles-26-111827)](./skills/awesome-page-design/assets/styles)
[![License: MIT](https://img.shields.io/badge/license-MIT-10B981)](./LICENSE)

</div>

---

## 这是什么？

Awesome Page Design 是一个面向 Agent 编码工具和前端开发者的 UI 设计 Skill。

它为 Agent 提供 26 套可复用、带布局意识的网站视觉方向，并统一整理成连续的 Style 01-26 目录。视觉风格包含布局原型、信息架构、构图策略、网格行为、响应式结构、颜色、字体、间距、边框、圆角、阴影、材质效果、图片方向、组件气质、按钮系统、反馈模式、交互状态和视觉密度。目标很简单：让新网站和 Web App 不再长得像同一套默认 UI。

这不是固定页面模板库。仓库里的 HTML 是更丰富、可点击的预览示例，用来帮助用户比较视觉方向、复制按任务类型区分的提示词，并让 Agent 把选定风格应用到真实产品里。Agent 应该复用视觉语言，并根据产品内容和工作流重新设计页面结构。

当前 Skill 专注于布局规划、视觉风格选择、已有项目功能集成、已有页面局部精修、UI 原语约束、UI 质量审查、实现验收、实现打磨和可复用设计规范。

## 安装

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

### 更新已安装的 Skill

更新全局安装的最新版：

```bash
npx skills update awesome-page-design -g -y
```

如果是项目级安装，使用：

```bash
npx skills update awesome-page-design -p -y
```

更新所有全局安装的 Skills：

```bash
npx skills update -g -y
```

### 移除已安装的 Skill

移除全局安装的 Skill：

```bash
npx skills remove awesome-page-design -g -y
```

移除项目级安装的 Skill：

```bash
npx skills remove awesome-page-design -y
```

只从某一个 Agent 中移除：

```bash
npx skills remove awesome-page-design -g -a codex -y
```

## 快速开始

安装后，可以这样让 Agent 使用：

```text
Use $awesome-page-design to choose a distinctive visual style for this dashboard.
Apply one of the awesome-page-design styles to this landing page without copying the sample layout.
Use awesome-page-design to make this admin panel feel professional but less generic.
用 awesome-page-design 给这个官网选一个更优雅、更有辨识度的视觉方向。
用 awesome-page-design 优化这个表格工具栏，但保留当前页面风格。
用 awesome-page-design 在已有内部系统里新增功能，并匹配已有下拉框、按钮、分页表格、统计卡和弹窗。
用 awesome-page-design 把这个弹窗打磨得更高级，不要重做整页。
用 awesome-page-design 把 alert、confirm、浏览器原生下拉框替换成项目里的设计组件。
用 awesome-page-design 做一个新项目页面，并补好 favicon、标题和 metadata。
```

Skill 会引导 Agent：

1. 阅读使用原则。
2. 先判断任务粒度：新页面、整页重设计、已有项目功能、局部页面修改、组件精修、实现验收或设计系统输出。
3. 把你的需求总结成一个简短的选择摘要或局部修改摘要。
4. 识别页面任务、主要内容对象、操作模型、布局原型、响应式折叠方式；如果是已有页面，还会识别目标区域。
5. 对于已有项目或老项目，先检查相邻页面、共享组件、UI 框架封装、token、下拉框、按钮、分页表格、统计表格/统计卡、弹窗、抽屉、表单、筛选、分页、图标和反馈状态。
6. 对真实 UI 代码应用 UI 原语契约：成品界面默认不能使用浏览器 `alert`、`confirm`、`prompt` 或无样式原生 `<select>`，除非这是项目已有的明确样式约定。
7. 对于新网站和新 App，补齐产品外壳资源：`favicon.ico`、页面标题、description metadata，以及有需要时的 app/touch icon；同时移除框架默认品牌。
8. 对于整页视觉方向，在尚未选择风格时打开或提供预览页。
9. 对于已有页面的局部修改，先保留当前页面风格，并检查目标区域和相邻区域。
10. 对于整页任务，请你从预览页复制一个匹配任务类型的风格提示词：完整、落地页、仪表盘、管理后台或移动端。
11. 只有当你明确让 Agent 代选时，才由 Agent 给出少量候选方案。
12. 阅读对应风格文档或局部修改工作流。
13. 当选择了整页风格时，设置布局变化度、动效强度和视觉密度。
14. 把选定或现有风格翻译成具体布局结构、CSS 变量、主题 token、组件细节、按钮规则、反馈规则、间距规则、响应式规则、状态规则或组件类。
15. 应用反模板化检查、UI 原语检查、新项目 favicon 检查和相近风格防混淆规则。
16. 当涉及真实 UI 代码时，检查语义控件、可访问标签、焦点状态、响应式文本、稳定媒体尺寸、动效降级、有用的空/错/加载状态、浏览器默认控件反模式，以及新项目 favicon/标题/metadata 完整性。
17. 只有当任务需要整页设计时，才根据真实产品重新设计页面结构，而不是复制示例 HTML。

### 必选预览确认门槛

对于完整页面和 App 屏幕，这个 Skill 不应该在你描述完需求后直接暗自决定最终风格。它应该先引导你打开预览页，对比 26 种视觉风格；等你选好并复制对应提示词后，再继续实现。

如果你希望 Agent 代选，需要明确说出来。此时 Agent 应该提出 2-3 个风格候选，简单说明布局和视觉差异，并在最终实现前等待确认，除非你明确说可以直接继续。

对于已有页面的局部修改，这个 Skill 不应该强行要求重新选择风格。它应该先识别当前页面系统，保留相邻 token 和组件，只修目标区域；只有当局部问题来自整页结构时，才升级为整页重设计。

对于已有项目或老项目中的功能开发，这个 Skill 应该先检查真实前端代码：相邻页面、共享布局、组件封装、token、下拉框、按钮、分页表格、统计表格/统计卡、弹窗、抽屉、表单、筛选、分页、图标和反馈状态。新增 UI 默认复用这些模式。

当涉及真实 UI 代码时，这个 Skill 还应该应用 `ui-primitive-contract.md`：把 `alert`、`confirm`、`prompt` 和无样式原生 `<select>` 替换成项目已有的 toast、行内提示、banner、弹窗、抽屉、撤销、Select、Dropdown、Combobox、菜单或分页组件。

对于新网站和新 App，这个 Skill 还应该生成或放置 `favicon.ico` 到项目期望的资源位置，把它接入 HTML/head 或框架 metadata，设置真实页面标题和 description，并移除默认框架 favicon/title 品牌。

## 预览风格

在仓库根目录启动本地预览服务：

```bash
npm run preview:serve
```

然后打开命令输出的 URL：

```text
http://127.0.0.1:<port>/assets/previews/
```

预览页包含 26 个视觉风格，支持桌面/移动端截图切换、中英文切换、可复制的完整/落地页/仪表盘/管理后台/移动端提示词、组件行为示例，以及每个 HTML 示例的直接入口。

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
open skills/awesome-page-design/assets/styles/style-01-card-grid/style-01-card-grid.html
open skills/awesome-page-design/assets/styles/style-09-tech-minimal/style-09-tech-minimal.html
open skills/awesome-page-design/assets/styles/style-18-precision-futurism/style-18-precision-futurism.html
```

在已安装的 Skill 里，同样的文件位于 `assets/`：

```bash
open assets/previews/index.html
open assets/styles/style-01-card-grid/style-01-card-grid.html
open assets/styles/style-09-tech-minimal/style-09-tech-minimal.html
```

这些示例都是静态单文件 HTML。截图前建议等待几秒，让页面渲染稳定。

运行预览生成器后，每个风格都会包含桌面截图和移动端截图，预览总览页可以在两种截图模式之间切换。
生成器使用 Chrome headless 并显式设置桌面和移动端视口参数，让截图匹配真实响应式布局。

## 包含什么？

```text
skills/awesome-page-design/
├── SKILL.md                         # Skill 入口
├── agents/
│   └── openai.yaml                  # Agent 元数据
├── references/
│   ├── workflow.md                  # 必选预览、选择和实现工作流
│   ├── usage-principles.md          # 正确使用方式
│   ├── layout-guidance.md           # 布局原型与响应式结构规则
│   ├── existing-project-integration.md # 已有/老项目组件盘点工作流
│   ├── local-ui-patch.md            # 已有页面局部修改工作流
│   ├── ui-primitive-contract.md     # 浏览器弹窗、原生下拉框、浮层和反馈原语硬约束
│   ├── design-dials.md              # 布局变化度、动效强度和视觉密度控制
│   ├── quality-checklist.md         # UI 质量审查清单
│   ├── anti-generic-ui.md           # 避免默认模板感的规则
│   ├── interface-compliance.md      # 实现级 UI 验收检查
│   ├── component-implementation.md  # 组件状态矩阵与实现规则
│   ├── motion-guidance.md           # 语义动效与动效降级规则
│   ├── icon-guidance.md             # 图标系统与使用规则
│   ├── design-system-output.md      # 可复用项目设计规范格式
│   ├── variant-guidance.md          # 相邻气质与子风格变体指南
│   ├── style-index.md               # 所有风格的短索引
│   └── styles/                      # 完整风格说明
└── assets/
    ├── previews/
    │   └── index.html               # 预览索引
    └── styles/                      # 视觉风格 HTML 和 PNG 预览资源
```

## 风格目录

| 风格 | 名称 | 布局模式 | 适合场景 | 视觉语言 |
|:---:|---|---|---|---|
| 01 | 卡片网格 | 浅蓝后台控制台 | 后台管理、企业控制台、权限系统 | 真实后台外壳、白色侧栏、顶栏、指标卡、筛选、密集表格和组件 |
| 02 | 块状粗野主义 | 街头海报发布 | 强品牌活动、独立产品、趣味工具 | 暖黄、硬黑边框、块状控件、高饱和标签 |
| 03 | 极光渐变 | 极光评估实验室 | 未来感产品、AI 工具、高级暗色体验 | 暗色画布、极光色场、柔光、漂移渐变能量 |
| 04 | 复古 Y2K | 千禧亮面舞台 | 音乐、潮流、青年文化、活动页 | 糖果渐变、霓虹细节、复古标题字、星光能量 |
| 05 | 瑞士编辑风 | 编辑索引网格 | 作品集、文化机构、严肃内容 | 紧凑编辑网格、红黑层级、细分割线、克制节奏 |
| 06 | 黑客终端 | 终端控制台 | 开发者工具、CLI、安全、开源 | 黑色画布、终端绿、等宽字体、扫描线 |
| 07 | 可爱主义 | 贴纸商店面板 | 玩法品牌、创作者工具、年轻产品 | 荧光黄、粉色硬阴影、贴纸感、软硬碰撞 |
| 08 | 共鸣极简 | 克制对象聚焦 | 高级暗色作品集、艺术、精品预告页 | 近黑、细字重、微光、大留白 |
| 09 | 科技极简风 | 聚焦简报编辑器 | AI 工具、开发者产品、聚焦型 SaaS 落地页 | 大留白、少色、单一视觉焦点、现代非衬线界面 |
| 10 | 深色主题 | 暗色渲染审阅 | AI 媒体工具、生成式创作产品、高级发布页 | 暗背景、高对比度、单一亮色强调 |
| 11 | 结构线 | 线框流程地图 | AI 平台、工作流产品、B2B 产品站 | 细线框、专业结构、清晰信息层级 |
| 12 | 层级材质 | 层级日程表面 | 消费者工具、实用型应用、产品仪表盘 | 层级、色块卡片、大圆角、有秩序的表面 |
| 13 | 便当盒布局 | 不等格便当叙事 | 创作者主页、产品总览、功能集合页 | 小组件式模块卡片、信息清晰分块 |
| 14 | 新拟态 | 柔软触感控制台 | 音频工具、安静工具、健康与专注类产品 | 柔光、内凹层次、圆角触感控件 |
| 15 | 液态玻璃 | 玻璃信号地图 | 沉浸式 AI、空间化仪表盘、高级未来感工具 | 毛玻璃、透明层次、模糊和未来感表面 |
| 16 | 复古主义 | 复古桌面工作区 | 音乐网站、游戏相关产品、文化活动页 | 像素感、老式系统窗口、80 年代/早期桌面元素 |
| 17 | 新粗野主义 | 粗野证明发布 | 开发者发布页、强品牌活动、趣味产品站 | 粗线条、撞色、巨型字体、有控制的张力 |
| 18 | 精密未来风 | 精密图谱控制台 | Issue 工具、AI 运营工具、技术型 SaaS | 深色精密感、发光边框、科幻产品质感 |
| 19 | 渐变风 | 渐变构建流程 | AI 构建工具、发布页、创作者工具 | 亮色渐变、科技潮流感、强首屏视觉 |
| 20 | 柔和流行 | 柔和学习面板 | 消费者应用、写作工具、教育、创意生产力 | 亲和玩乐色彩、涂鸦/卡通感、弹性圆润造型 |
| 21 | 酸性设计 | 酸性信号海报 | 实验作品集、音乐/时尚发布、沉浸式活动页 | 铬/金属光泽、镭射光、扭曲暗黑科幻感 |
| 22 | 装饰艺术 | 鎏金海报门厅 | 高级酒店、文化场馆、精品活动 | 对称海报构图、宝石暗色、金色框线、阶梯几何 |
| 23 | 侘寂 | 安静材质画廊 | 陶艺、健康生活、慢电商、手作作品集 | 大地色克制、自然纹理、手作不完美、安静留白 |
| 24 | 水墨 | 水墨卷轴编辑 | 茶文化、博物馆、文学、文化电商 | 宣纸白底、墨色层级、朱红印章、卷轴节奏 |
| 25 | 蓝图 | 技术蓝图图纸 | 基础设施 SaaS、建筑工具、规划系统、API | 深蓝网格、青色线稿、工程标注、图纸精度 |
| 26 | 工业控制 | 工业状态控制台 | 工厂监控、物流控制、能源运营、硬件设备队列 | 耐用暗色面板、安全色、密集状态行、机器标签 |

## 开发

重新生成 HTML 预览、截图、预览索引和风格说明文件：

```bash
npm run previews
```

截图生成器每个页面会等待 5 秒，让预览页面有时间完成渲染。默认会生成桌面和移动端截图。如果只是快速本地迭代，可以跳过移动端截图：

```bash
PREVIEW_MOBILE=0 npm run previews
```

如果只改了一个风格，可以只重新生成这个风格，并复用其它风格已有截图：

```bash
PREVIEW_STYLE=01 npm run previews
npm run previews -- --style 01
```

也可以一次选择多个风格：

```bash
PREVIEW_STYLES=01,18 npm run previews
npm run previews -- --styles 01,18
```

验证生成资源、提示词 payload、文档、移动端截图、UI 原语反模式和常见实现反模式：

```bash
npm run validate
```

也可以使用较短的别名：

```bash
npm run check
```

启动预览服务：

```bash
npm run preview:serve
```

打包验证：

```bash
npm pack --dry-run
```
