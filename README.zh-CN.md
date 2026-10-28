<div align="center">

# Awesome Page Design

**为 Agent 构建的网站与 Web App 准备的 26 种视觉风格提示库。**

让编码 Agent 在开始写 UI 前，先拥有更明确、更有辨识度的视觉方向。

[English](./README.md) · [Skill 入口](./skills/awesome-page-design/SKILL.md) · [预览页](./skills/awesome-page-design/assets/previews/index.html) · [风格索引](./skills/awesome-page-design/references/style-index.md)

[![Agent Skill](https://img.shields.io/badge/Agent%20Skill-awesome--page--design-4F46E5)](./skills/awesome-page-design/SKILL.md)
[![Styles](https://img.shields.io/badge/styles-26-111827)](./skills/awesome-page-design/assets/styles)
[![License: MIT](https://img.shields.io/badge/license-MIT-10B981)](./LICENSE)

</div>

---

## 这是什么？

Awesome Page Design 是一个面向 Agent 编码工具和前端开发者的 UI 设计 Skill。

Skill 的指令和参考文档使用中文编写，组件专名和 API 标识保留标准英文；README 与风格预览继续保留中英双语。

它为 Agent 提供 26 套可复用、带布局意识的网站视觉方向，并统一整理成连续的 Style 01-26 目录。风格覆盖布局原型、信息架构、响应式结构、视觉系统、组件气质、反馈、交互状态和密度；工作流同时保证新项目外壳完整，并让已有前端新增功能时不破坏既有组件语言。

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

安装后，直接告诉 Agent 要完成的任务：

```text
用 $awesome-page-design 做这个产品页，选择合适风格后直接实现。
用 $awesome-page-design 给现有后台加审批队列，复用已有组件和风格。
用 $awesome-page-design 只修这个移动端工具栏，保留周围页面。
用 $awesome-page-design 审查这个界面的视觉和实现质量。
```

1. **确定范围**：区分新页面、已有项目功能、局部修改、审查或设计规范；已有项目先检查真实代码。
2. **确定方向**：已选风格就继续，明确委托直接做就代选后继续，整页方向未定时才展示预览；局部修改沿用现有系统。
3. **实施**：只读本次任务涉及的流程和组件参考。[UI 原语契约](skills/awesome-page-design/references/ui-primitive-contract.md) 约束成品控件，简单选择可以使用经过完整设计的原生下拉框。新项目另按[外壳清单](skills/awesome-page-design/references/new-project-shell.md) 补齐 favicon.ico、标题和 metadata。
4. **验证**：检查修改的流程及受影响的桌面和移动布局，说明已测范围和未验证项。

[Skill 入口](skills/awesome-page-design/SKILL.md) 列出各类任务的最小阅读路径；[工作流](skills/awesome-page-design/references/workflow.md) 统一说明选择、实施和完成步骤。小修改无需读完所有参考文件，也无需重新选风格。

## 预览风格

在仓库根目录启动本地预览服务：

```bash
npm run preview:serve
```

然后打开命令输出的 URL：

```text
http://127.0.0.1:<port>/assets/previews/
```

预览页包含 26 个视觉风格，支持首页中英文切换，并在风格详情中查看桌面/移动截图。查看并复制完整/落地页/仪表盘/管理后台/移动端提示词，再打开交互示例。每个示例提供返回风格库入口，交互组件可直接在演示页面点击查看。总览页是可离线使用的独立 HTML 文件。

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

运行预览生成器后，每个风格都会包含桌面截图和移动端截图。首页卡片固定展示桌面截图，风格详情中可切换桌面和移动预览。
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
│   ├── new-project-shell.md          # 分框架的标题、metadata、favicon 和默认品牌清理清单
│   ├── patterns/                     # 下拉选择、浮层、反馈、数据表格与分页契约
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
    │   ├── index.html               # 预览索引
    │   └── asset-manifest.json      # HTML/PNG 哈希与预期截图尺寸
    └── styles/                      # 视觉风格 HTML 和 PNG 预览资源
```


## 风格目录

<!-- style-catalog:start -->
| 风格 | 名称 | 布局模式 | 适合场景 | 视觉语言 |
|:---:|---|---|---|---|
| 01 | 卡片网格 | 清爽青蓝后台 | 后台管理、企业控制台、权限系统、运营仪表盘 | 白色侧栏与顶栏、浅灰工作区、青蓝操作色、细边框 Table 面板、紧凑筛选、克制的状态标签和清晰的双列表单弹窗。 |
| 02 | 块状粗野主义 | 创意市集海报 | 创意市集、文化活动、独立出版、预约领票 | 暖白画布、亮黄主海报、黑色硬边与偏移阴影，辅以橙红点缀，呈现独立创意市集的街头气质。 |
| 03 | 极光渐变 | 夜航星空观测台 | 天文导览、沉浸学习、探索工具 | 深蓝夜空、克制青紫极光、微光天体标注与安静星图工作区。 |
| 04 | 复古 Y2K | 千禧亮面拍贴亭 | 照片编辑、趣味创作工具、个人纪念品 | 糖果粉 Y2K 拍贴亭，亮面控件围绕四格长条拍贴，搭配粉彩渐变与收藏感贴纸。 |
| 05 | 瑞士编辑风 | 街字视觉档案 | 视觉档案、文化收藏、图像编辑索引 | 米白编辑档案，红黑层级、编号索引、非对称图像排布与严格细线对齐。 |
| 06 | 黑客终端 | 本地链路巡检控制台 | 开发者诊断、命令控制台、技术报告 | 近黑终端、克制绿色等宽文字、可操作响应行、语义状态色与可停止的本地运行。 |
| 07 | 可爱主义 | 可爱日程桌面 | 玩乐生产力、教育工具、创作者实用工具 | 柔和玩乐表面、友好对象形状、粉彩点缀、紧凑控件和温暖任务板层级。 |
| 08 | 共鸣极简 | 克制摄影联系印样 | 摄影档案、高级暗色作品集、艺术、精品预告页 | 近黑画布、细字重、微光、大留白、精细线条和高级克制感。 |
| 09 | 科技极简风 | 极简印刷账页 | 印刷工作室、编辑工具、聚焦型实用页面 | 大面积空白、少色、单一视觉焦点、现代非衬线字体、界面极简。 |
| 10 | 深色主题 | 暗色影院审阅 | 微型影院、创意工作室、高级发布页 | 暗背景、高对比度，并用单色亮色强化主按钮和主视觉。 |
| 11 | 结构线 | 包裹运输线路账页 | 包裹追踪、配送进度、运输线路记录 | 细线框、结构化、专业严肃、信息层级清晰。 |
| 12 | 层级材质 | 层叠阅读小角落 | 阅读计划、个人书架、温和学习工具 | 层次分明、大色块卡片、大圆角、有秩序且适合触控的表面。 |
| 13 | 便当盒布局 | 午餐便当搭配台 | 午餐搭配、餐品点选、模块化商品配置 | 小组件式卡片分区、模块化排布、信息清晰分块。 |
| 14 | 新拟态 | 触感声音控制台 | 环境声音播放器、专注计时、平静音频工具 | 柔光、内凹层次感圆角、柔和阴影和触感表面。 |
| 15 | 液态玻璃 | 夜航城市漫游 | 植物园地图、空间化仪表盘、高级未来感工具 | 毛玻璃、透明层次、磨砂质感、科技感和未来感。 |
| 16 | 复古主义 | 像素桌面周刊 | 音乐网站、游戏相关产品、文化活动页 | 像素风、复古 UI、老式操作系统质感、80 年代计算机线索、块状窗口和像素字体。 |
| 17 | 新粗野主义 | 撞色海报制作器 | 开发者发布页、强品牌活动、趣味产品站 | 粗线条、强烈撞色、无修饰巨型字体，混乱但有张力。 |
| 18 | 精密未来风 | 动画渲染管线台 | Issue 工具、AI 运营工具、技术型 SaaS | 深色背景、发光边框、未来科技感和科幻 UI 精度。 |
| 19 | 渐变风 | 夜跑电台 | 节日活动页、发布墙、创作者活动工具 | 大标题与跑者轨道渐变形成首屏，下方以路线图为主对象，旁侧选择距离与配速，报名弹窗生成本地凭单。 |
| 20 | 柔和流行 | 慢拍子 | 社区课堂、教育、写作工具、创意生产力 | 轻涂鸦引导区下接课程小路、四拍练习谱和速度滑杆；跟拍反馈与练习记录围绕同一节奏任务展开。 |
| 21 | 酸性设计 | 失真档案 | 实验作品集、音乐/时尚发布、沉浸式活动页 | 铬面环状 SVG 与错位标题形成声音舞台，下接曲目切片和可排序试听清单；底部播放器保持稳定位置。 |
| 22 | 装饰艺术 | 海上电台 | 高级酒店、文化场馆、精品活动、编辑型品牌发布 | 对称金线请柬形成首屏，日期人数选择、舞台桌位平面图与套餐摘要组成订位主区，下方以三栏呈现晚宴菜单。 |
| 23 | 侘寂 | 旧木修复档案 | 陶艺、健康生活、慢电商、手作作品集、安静编辑页 | 低饱和大地色、自然纹理、手作不完美、安静留白和缓慢的材质信任感。 |
| 24 | 水墨 | 地方志长卷阅览 | 茶文化、博物馆、文学、文化电商、传统产品叙事 | 宣纸白底、墨色层级、朱红印章强调、卷轴节奏和诗性编辑克制。 |
| 25 | 蓝图 | 露营车内装图纸 | 建筑工具、改造规划、系统地图、技术图纸 | 深蓝技术网格、青色线稿、标注结构、测量式组件和工程图纸精度。 |
| 26 | 工业控制 | 冷库值班控制台 | 印刷工作室、工厂监控、物流控制、硬件设备队列、事故指挥室 | 耐用暗色面板、安全色强调、密集状态行、机器标签和可维护的控制室清晰度。 |
<!-- style-catalog:end -->

## 人工验证

在实际任务中手动检查风格选择页和 Skill 生成结果：语言切换、提示词复制和示例返回入口。分别检查桌面、390px 和 320px 布局，以及键盘焦点、错误恢复和局部修改影响到的相邻区域。

将任务说明、屏幕尺寸、复现步骤、预期与实际表现，以及截图或控制台错误交给 AI 分析。分析时应区分已观察到的事实和未验证的行为。仓库不再包含自动模型评测运行器或基准测试项目。

## 开发

预览生成器按职责拆分。`scripts/generate-previews.js` 负责文件写入、截图和事务发布；渲染模块返回字符串，不直接写入生成资源。

风格元数据和生效配置只在 `catalog/styles.json` 中维护，包括基础字段、示例场景、布局、几何、组件规则和场景适配。`fallbacks` 保留未知风格编号的兼容行为，`removedStyleSlugs` 记录主动移除的风格。加载器会拒绝缺失字段、不安全路径、重复编号及无效回退引用。 纯中文风格说明在 `catalog/style-docs.zh.json` 中维护，现有双语预览数据继续保留。

| `scripts/` 下的模块 | 职责 |
|---|---|
| `preview-catalog.js`、`catalog-validation.js` | 校验并读取唯一 JSON 数据源 |
| `preview-scenarios.js`、`preview-style-profiles.js` | 场景与配置查询的兼容适配 |
| `preview-prompts.js` | 提示词类型和中英文提示词生成 |
| `preview-page-renderer.js`、`preview-pages/shared.css` | HTML 模板和共享页面 CSS |
| `preview-documents.js`、`preview-gallery.js` | 风格说明、风格索引和预览画廊 |
| `gallery-model.js`、`gallery-client.js`、`gallery-copy.js`、`preview-pages/gallery.css` | 风格元数据、提示词无损压缩、交互、双语标签和总览页样式 |
| `preview-config.js`、`preview-selection.js` | 环境配置和风格选择参数 |
| `preview-screenshots.js`、`preview-transaction.js` | 浏览器运行、清理、暂存发布和回滚 |
| `sync-catalog-docs.js` | 生成 README 表格、精简风格说明和索引 |

`preview-output.test.js` 保留导出提示词的哈希基线，检查示例结构及说明的数据覆盖。画廊测试验证独立渲染、内嵌数据安全和全部 260 个提示词变体的无损还原。`catalog-integration.test.js` 验证修改一处 JSON 会传递到各个输出；仓库验证还会检查生成文档是否过期，以及 Skill 引用是否有效、能否从入口找到。

仅修改文档时，运行下面的命令，同步两份 README 表格、所有风格说明和索引，不改写 HTML、截图及截图清单：

```bash
npm run docs
```

风格说明通过链接复用共享流程和验收规则，完整的分任务提示词从画廊复制。视觉修改使用下面的预览生成器，发布前需要刷新截图；只生成 HTML 可能暴露已有生成器与资源之间的差异，不会将旧截图认定为最新。

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

生成器先在临时副本中更新 HTML、说明、截图和 `asset-manifest.json`，本次选定风格的截图与附加审计全部成功后，才发布发生变化的文件。生成失败时保留正式资源；发布时报错会回滚已发布的变更。发布前也会检查目标文件，避免覆盖生成期间的外部修改。临时副本会在成功或报错后清理。

只更新预览总览页，不改写风格 HTML、说明、截图或清单：

```bash
PREVIEW_INDEX_ONLY=1 npm run previews
```

`PREVIEW_SCREENSHOTS=0` 仍可只更新 HTML、说明和总览页；`PREVIEW_MOBILE=0` 仍可跳过移动截图。这两种模式不会更新截图清单，发布前应重新生成完整的桌面/移动截图组合。

验证器会比对路径、尺寸和 SHA-256 哈希，因此旧截图无法在 HTML 更新后悄悄通过。修改响应式布局时，可以额外执行不落盘的窄屏渲染审计：

```bash
PREVIEW_AUDIT_WIDTHS=320 npm run previews -- --styles 01,15,24
```

运行目录配置、预览清单和渲染审计格式的 Node 单元测试：

```bash
npm test
```

验证生成资源、清单、提示词 payload、文档、截图、元数据和 UI 原语反模式：

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
