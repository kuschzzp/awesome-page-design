# Card Grid 设计系统文档

> 基于 AI Pulse 版本B：卡片网格布局（亮色）的完整设计系统分析

---

## 重要使用原则

本文件提供的是视觉风格提示，不是固定页面布局方案。示例 HTML 的页面结构仅用于统一展示和截图，不应在真实项目中照搬。后续开发时，应根据用户需求、业务流程、内容优先级和设备场景重新设计页面布局；可复用的是配色、字体、圆角、边框、阴影、质感、状态和动效等视觉语言。

---

## 1. 飙格定义与核心精神

**风格名称**：Card Grid（卡片聚合网格）

**核心精神**：以数据仪表盘的网格密度为框架，用卡片作为最小信息单元，通过尺寸差异（large / normal）和色彩编码构建信息层级。追求「信息密度 × 视觉节奏 × 分类辨识」——像一个精心编排的数据聚合面板，每张卡片既是独立的信息入口，也是整体网格的一个节奏单元。

**设计哲学关键词**：
- **网格驱动**：所有内容均以 Grid 布局排列，拒绝线性叙事
- **色彩编码**：五色语义系统（紫/绿/蓝/橙/红）让分类一目了然
- **卡片即原子**：每条信息封装在独立卡片内，可自由排列组合
- **数据即装饰**：统计数值（stat-card）既是信息也是视觉锚点

**情感基调**：高效、清晰、活力——像一个你打开就立刻知道"发生了什么"的信息聚合器。

---

## 2. 色彩体系

### 2.1 调色板

| 角色 | CSS 变量 | 色值 | HSL | 用途 |
|------|----------|------|-----|------|
| 页面背景 | `--bg` | `#f5f6fa` | hsl(230, 14%, 97%) | 主背景，偏蓝灰白 |
| 二级背景 | `--bg-2` | `#ffffff` | hsl(0, 0%, 100%) | 卡片/统计背景 |
| 三级背景 | `--bg-3` | `#f0f1f6` | hsl(230, 15%, 93%) | 搜索框背景、图片占位 |
| 主文字 | `--text-1` | `#1a1a2e` | hsl(240, 25%, 14%) | 标题、核心内容 |
| 二级文字 | `--text-2` | `#64648a` | hsl(250, 15%, 41%) | 描述、正文 |
| 三级文字 | `--text-3` | `#a0a0b8` | hsl(250, 12%, 68%) | 时间、元信息 |
| 主强调色 | `--accent` | `#7c3aed` | hsl(270, 70%, 54%) | 渐变起点、按钮、Logo |
| 辅强调色 | `--accent2` | `#8b5cf6` | hsl(270, 67%, 59%) | 标签文字、Logo渐变终点 |
| 强调背景 | `--accent-bg` | `rgba(124,58,237,0.06)` | — | 活跃分类、统计紫色 |
| 强调边框 | `--accent-border` | `rgba(124,58,237,0.18)` | — | 活跃按钮边框 |
| 绿色 | `--green` | `#059669` | hsl(160, 84%, 39%) | 突发标签、活跃模型统计 |
| 绿色背景 | `--green-bg` | `rgba(5,150,105,0.06)` | — | 突发标签背景 |
| 红色 | `--red` | `#dc2626` | hsl(0, 72%, 51%) | 热门标签、热门讨论统计 |
| 红色背景 | `--red-bg` | `rgba(220,38,38,0.06)` | — | 热门标签背景 |
| 蓝色 | `--blue` | `#2563eb` | hsl(217, 91%, 60%) | 研究标签、论文统计 |
| 蓝色背景 | `--blue-bg` | `rgba(37,99,235,0.06)` | — | 研究标签背景 |
| 橙色 | `--orange` | `#d97706` | hsl(38, 92%, 50%) | 政策标签 |
| 橙色背景 | `--orange-bg` | `rgba(217,119,6,0.06)` | — | 政策标签背景 |
| 边框 | `--border` | `rgba(0,0,0,0.06)` | — | 通用分割线 |
| 渐变 | 内联 | `linear-gradient(135deg, var(--accent), var(--accent2))` | — | Logo背景 |

### 2.2 色彩使用规则

- **五色语义编码体系**：紫(accent) = 品牌/大模型，绿 = 突发/应用，蓝 = 研究，橙 = 政策，红 = 热门/讨论。每种语义色都有独立的 `文字色 + 6%透明背景色` 配对
- **主色 Purple 占比约 5%**：仅用于 Logo、订阅按钮、活跃分类、统计紫色值
- **背景色比版本A更冷**：`#f5f6fa` 比 `#f8f9fc` 蓝调稍弱，但 `--bg-3` (`#f0f1f6`) 是更明显的灰蓝，用于搜索框等交互区域
- **统计值色彩映射**：四个统计卡分别用 purple / green / blue / red，与分类标签色彩一致，形成全局色彩语言
- **透明度统一为 6%**：所有语义色背景均为 `rgba(color, 0.06)`，比版本A的 8% 更浅更克制

### 2.3 色彩推导公式

```
语义色 = {color, color-bg}
color-bg = rgba(color, 0.06)  → 每种语义色的背景均为 6% opacity
accent-bg = rgba(accent, 0.06)
accent-border = rgba(accent, 0.18)  → 边框约为背景的 3倍 opacity
bg梯度: #f5f6fa(L97%) → #ffffff(L100%) → #f0f1f6(L93%)  → 三层背景递减
文字层级: text-1(L14%) → text-2(L41%) → text-3(L68%)  → 与版本A类似，但 text-2 更紫(L41% vs L40%)
```

---

## 3. 排版体系

### 3.1 字体栈

```css
font-family: 'Inter', system-ui, sans-serif;
```

- **主字体**：Inter（Google Fonts CDN，wght@300;400;500;600;700;800）
- **增加了 800 字重**：比版本A多了 wght800，用于统计数值和品牌Logo文字
- **回退栈**：system-ui → sans-serif（注意去掉了 -apple-system，用了更通用的 system-ui）

### 3.2 字号阶梯

| 用途 | 字号 | CSS 来源 | 字重 | 行高 | letter-spacing |
|------|------|----------|------|------|----------------|
| Featured 大标题 | 24px | `.feat-card.large .feat-title` | 700 | 1.35 | -0.02em |
| Featured 小标题 | 15px | `.feat-card:not(.large) .feat-title` | 700 | 1.35 | -0.02em |
| 统计数值 | 28px | `.stat-value` | 800 | — | -0.04em |
| 品牌名 | 16px | `.brand-name` | 700 | — | -0.03em |
| 搜索框 | 14px | `.search-box input` | 400 | — | 0 |
| Featured 描述(大) | 14px | `.feat-desc` | 400 | 1.6 | 0 |
| Featured 描述(小) | 13px | `.feat-card:not(.large) .feat-desc` | 400 | 1.6 | 0 |
| 卡片标题 | 14px | `.card-title` | 600 | 1.4 | -0.01em |
| 卡片摘要 | 13px | `.card-excerpt` | 400 | 1.5 | 0 |
| 分类按钮 | 13px | `.cat-btn` | 500 | — | 0 |
| 订阅按钮 | 13px | `.btn-subscribe` | 600 | — | 0 |
| 标签 | 11px | `.feat-label`, `.card-tag` | 700 | — | 0.05em |
| 元信息 | 12px | `.feat-meta`, `.card-time`, `.stat-label` | 500 | — | 0 |
| Footer | 12px | `.footer-bar` | 400 | — | 0 |
| Logo文字 | 11px | `.brand-icon` | 800 | — | 0 |
| 实时标签 | 12px | `.live-label` | 500 | — | 0 |

### 3.3 排版规则

- **统计数值极端负 letter-spacing**：28px + -0.04em，比标题还紧，使数字看起来紧凑有力
- **标签正 letter-spacing**：11px + 0.05em，唯一使用正值的情况，增强小字的可读性和"标签感"
- **行高更紧凑**：正文 1.5-1.6（版本A用1.6-1.7），信息密度更高
- **Featured 双字号系统**：大卡片24px标题 vs 小卡片15px标题，尺寸差异驱动层级而非字号递减
- **字重六档使用**：800（统计/Logo）、700（标题/标签）、600（卡片标题/按钮）、500（分类/元信息）、400（正文）、300（未使用）

---

## 4. 边框/圆角/阴影体系

### 4.1 边框

| 用途 | 边框定义 | 色值 |
|------|----------|------|
| 通用分割 | `1px solid var(--border)` | rgba(0,0,0,0.06) |
| 活跃分类 | `1px solid var(--accent-border)` | rgba(124,58,237,0.18) |
| 搜索框聚焦 | `1px solid var(--accent-border)` | rgba(124,58,237,0.18) |
| Hover 升级 | `1px solid rgba(0,0,0,0.1)` | rgba(0,0,0,0.10) |

**特点**：与版本A基本一致，但增加了 hover 时的边框升级（6%→10%）。

### 4.2 圆角体系

| 场景 | 圆角 | 对应组件 |
|------|------|----------|
| **全局圆角变量** | `var(--radius) = 14px` | 所有主要卡片 |
| Logo | 7px | `.brand-icon` |
| 搜索框 | 10px | `.search-box` |
| 按钮类 | 8px / 10px | 分类8px, 订阅10px |
| 标签 | 4px | `.feat-label` |
| 图片区 | 10px | `.card-img` |
| 小圆点 | 50% | `.live-dot` |

**创新点**：引入 `--radius` CSS 变量（14px），所有主要卡片圆角统一引用此变量，实现全局圆角一键调整。

**推导公式**：
```
--radius = 14px（全局基准）
小元素: 4px → 7px → 8px → 10px → 14px(var(--radius)) → 50%
```

### 4.3 阴影阶梯

| 级别 | CSS 变量 | 定义 | 用途 |
|------|----------|------|------|
| 微阴影 | `--shadow` | `0 1px 3px rgba(0,0,0,0.04)` | 默认卡片（注意：单层阴影） |
| 中阴影 | `--shadow-md` | `0 4px 14px rgba(0,0,0,0.06)` | hover 状态 |
| 大阴影 | `--shadow-lg` | `0 8px 28px rgba(0,0,0,0.08)` | 未使用（仅定义） |

**与版本A的区别**：
- `--shadow` 从双层变为单层（版本A有近层+远层两层），更简洁
- `--shadow-md` 的 blur 值略大（14px vs 12px）
- `--shadow-lg` 的 blur 值略大（28px vs 24px）
- 整体阴影策略更简约，但spread更大

---

## 5. 装饰元素/交互细节

### 5.1 装饰元素

| 元素 | 实现方式 | 说明 |
|------|----------|------|
| Logo 渐变 | `linear-gradient(135deg, accent→accent2)` | 紫→浅紫对角渐变 |
| 实时脉搏 | 8px圆点 + `blink` 动画 (1.5s) | 搜索栏旁的绿色呼吸灯 |
| 图片区渐变覆盖 | `.card-img::after` — 底部40px渐变 | 从透明到 bg-2 的底部淡入 |
| Featured 大卡片渐变背景 | `linear-gradient(180deg, bg-2→accent-bg)` | 从白到紫微渐变 |
| 标签色彩编码 | 五色配对 (text+bg) | 紫/绿/蓝/橙/红各有专属色 |
| 统计数值色彩 | 四色映射 | 与标签色彩对齐 |

### 5.2 交互细节

| 交互 | 触发 | 效果 | 过渡时间 |
|------|------|------|----------|
| 卡片 Hover | `.feat-card:hover`, `.card:hover` | shadow→shadow-md + translateY(-2px) | 0.25s |
| 统计卡 Hover | `.stat-card:hover` | shadow→shadow-md | 0.2s |
| 分类按钮 Hover | `.cat-btn:hover` | text-2→text-1, border 6%→10% | 0.15s |
| 分类按钮 Active | `.cat-btn.active` | accent-bg + accent-border + accent2文字 | 0.15s |
| 订阅按钮 Hover | `.btn-subscribe:hover` | accent→accent2 背景色 | 0.2s |
| 搜索框聚焦 | `.search-box:focus-within` | border→accent-border | 0.2s |
| 文本选中 | `::selection` | accent背景 + 白色 | — |

**特色**：
- **分类按钮过渡更快**（0.15s vs 其他0.2-0.25s），暗示"快速切换"的操作直觉
- **搜索框 `:focus-within`**：不依赖 input 本身的事件，而是在容器级别响应
- **统计卡无位移**：hover 仅升级阴影，不 translateY，避免数值区"晃动"干扰阅读

---

## 6. 示例布局/间距观察（非固定方案）


> 以下布局内容仅用于解释示例 HTML 如何展示该风格，不是后续项目必须采用的页面结构。真实项目应重新做信息架构和布局设计。

### 6.1 布局骨架

```
[Sticky Top Bar 56px]
  ├── Brand (Logo 28px + Name)
  ├── Search Box (320px宽)
  └ Actions (Live-dot + Subscribe-btn)

[Container max-width: 1400px, padding: 32px]
  ├── Category Bar (flex, gap: 6px, mb: 32px)
  │   ├── Cat-btn × 8
  ├── Featured Grid (mb: 40px)
  │   ├── Grid: 3列 (2fr 1fr 1fr), 2行, gap: 16px
  │   │   ├── Large Card (grid-row: span 2, padding: 36px)
  │   │   ├── Normal Card (padding: 28px)
  │   │   ├── Normal Card
  │   │   ├── Normal Card
  │   │   └ Normal Card
  ├── Stats Row (mb: 40px)
  │   ├── Grid: 4列 (repeat(4, 1fr), gap: 16px)
  │       ├── Stat Card (padding: 20px) × 4
  ├── Card Grid (mb: 40px)
  │   ├── Grid: 4列 (repeat(4, 1fr), gap: 16px)
  │       ├── Card (padding: 24px) × 8

[Footer-bar (padding: 24px 32px)]
```

### 6.2 间距数值表

| 场景 | 数值 | 说明 |
|------|------|------|
| 页面内边距 | 32px | 比版本A少8px |
| 区域间距 | 40px | 比版本A少8px |
| Grid gap | 16px | 比版本A少8px（更紧凑） |
| 大卡片内边距 | 36px | Large Featured |
| 标准卡片内边距 | 28px / 24px / 20px | Featured / Card / Stat |
| 导航高度 | 56px | 比版本A少8px |
| 最大宽度 | 1400px | 比版本A多120px |

### 6.3 间距推导

```
基础间距单位 = 8px (与版本A一致)
整体间距比版本A缩减约 25%: 40→32, 24→16, 48→40, 64→56
Gap 从 24px 降至 16px → 网格更密集, 信息密度更高
最大宽度从 1280→1400 → 补偿更密的网格需要更多横向空间
```

---

## 7. 响应式策略

### 7.1 断点定义

| 断点 | 宽度 | 变化 |
|------|------|------|
| 桌面 | > 1200px | 默认布局 |
| 平板 | ≤ 1200px | Featured 2列, 卡片3列, 统计2列 |
| 大手机 | ≤ 768px | Featured 1列, 卡片2列, 搜索框缩小 |
| 小手机 | ≤ 480px | 卡片1列 |

### 7.2 具体适配规则

**≤ 1200px**：
- `.featured-grid` → `grid-template-columns: 1fr 1fr`（3列变2列）
- `.feat-card.large` → `grid-row: span 1`（大卡片不再跨行）
- `.card-grid` → `grid-template-columns: repeat(3, 1fr)`
- `.stats-row` → `grid-template-columns: repeat(2, 1fr)`（4列变2列）

**≤ 768px**：
- `.top-bar` → `padding: 0 16px`
- `.search-box` → `width: 180px`
- `.container` → `padding: 16px`
- `.featured-grid` → `grid-template-columns: 1fr`
- `.card-grid` → `grid-template-columns: repeat(2, 1fr)`

**≤ 480px**：
- `.card-grid` → `grid-template-columns: 1fr`

### 7.3 响应式哲学

- **三断点体系**：比版本A多一个480px断点，更精细的手机适配
- **Featured Grid 特殊处理**：大卡片 span 2 行在 1200px 时取消，从2列变1列时完全线性化
- **搜索框弹性**：320px → 180px，只缩小不隐藏
- **统计行2列兜底**：4→2 而非 4→1，保证统计信息始终可见

---

## 8. 组件速查表

| 组件 | 类名 | 核心属性 | 状态变化 |
|------|------|----------|----------|
| 顶部栏 | `.top-bar` | sticky, 56px, backdrop-blur(24px) saturate(1.5) | — |
| Logo | `.brand-icon` | 28px, gradient, 7px圆角, 800字重 | — |
| 搜索框 | `.search-box` | 320px宽, bg-3背景, 10px圆角 | :focus-within→accent-border |
| 订阅按钮 | `.btn-subscribe` | accent背景, 10px圆角, 600字重 | hover→accent2 |
| 实时脉搏 | `.live-dot` | 8px圆, green色, blink动画 | — |
| 实时标签 | `.live-label` | 12px/500, text-3色 | — |
| 分类按钮 | `.cat-btn` | 7px 16px, 8px圆角, text-2 | hover→text-1/10%border, active→accent体系 |
| Featured大卡 | `.feat-card.large` | span2行, 36px内边, 180°渐变背景 | hover→shadow-md+translateY(-2px) |
| Featured小卡 | `.feat-card` | 28px内边, var(--radius)圆角 | hover→shadow-md+translateY(-2px) |
| Featured标签 | `.feat-label` | 药丸式, 11px/700/0.05em, 五色编码 | — |
| Featured标题 | `.feat-title` | 700字重, -0.02em, 大24px/小15px | — |
| Featured描述 | `.feat-desc` | text-2色, 大14px/小13px, 2行截断 | — |
| 统计卡 | `.stat-card` | 20px内边, var(--radius)圆角 | hover→shadow-md |
| 统计标签 | `.stat-label` | 12px/500, text-3色 | — |
| 统计数值 | `.stat-value` | 28px/800/-0.04em, 四色 | — |
| 统计变化 | `.stat-change` | 12px/600, green色 | — |
| 内容卡片 | `.card` | 24px内边, var(--radius)圆角 | hover→shadow-md+translateY(-2px) |
| 卡片图片 | `.card-img` | 120px高, 10px圆角, ::after渐变 | — |
| 卡片标签 | `.card-tag` | 11px/700, 四色分类 | — |
| 卡片标题 | `.card-title` | 14px/600/-0.01em | — |
| 卡片摘要 | `.card-excerpt` | 13px, text-2色, 2行截断 | — |
| Footer | `.footer-bar` | 1px border-top, 24px 32px内边 | — |

---

## 9. CSS变量/代码片段

### 9.1 完整 CSS 变量定义

```css
:root {
  --bg: #f5f6fa;
  --bg-2: #ffffff;
  --bg-3: #f0f1f6;
  --text-1: #1a1a2e;
  --text-2: #64648a;
  --text-3: #a0a0b8;
  --accent: #7c3aed;
  --accent2: #8b5cf6;
  --accent-bg: rgba(124,58,237,0.06);
  --accent-border: rgba(124,58,237,0.18);
  --green: #059669;
  --green-bg: rgba(5,150,105,0.06);
  --red: #dc2626;
  --red-bg: rgba(220,38,38,0.06);
  --blue: #2563eb;
  --blue-bg: rgba(37,99,235,0.06);
  --orange: #d97706;
  --orange-bg: rgba(217,119,6,0.06);
  --border: rgba(0,0,0,0.06);
  --shadow: 0 1px 3px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 14px rgba(0,0,0,0.06);
  --shadow-lg: 0 8px 28px rgba(0,0,0,0.08);
  --radius: 14px;
}
```

### 9.2 关键代码片段

**搜索框交互**：
```css
.search-box {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 16px;
  background: var(--bg-3);
  border: 1px solid var(--border);
  border-radius: 10px;
  width: 320px;
  transition: border-color 0.2s;
}
.search-box:focus-within { border-color: var(--accent-border); }
```

**Featured 大卡片渐变背景**：
```css
.feat-card.large {
  grid-row: span 2;
  padding: 36px;
  display: flex; flex-direction: column; justify-content: flex-end;
  background: linear-gradient(180deg, var(--bg-2) 0%, var(--accent-bg) 100%);
}
```

**图片区底部渐变**：
```css
.card-img::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 40px;
  background: linear-gradient(transparent, var(--bg-2));
}
```

**Live-dot 呼吸动画**：
```css
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
```

**文字截断**：
```css
.card-excerpt {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

---

## 10. 适用/不适用场景

### 适用场景

- **信息聚合器 / 新闻 Dashboard**：需要多维度快速浏览的场景
- **数据仪表盘首页**：统计+卡片的组合适合数据概览
- **产品展示页**：卡片网格天然适合展示多个产品/项目
- **多分类内容门户**：五色编码让分类切换和内容辨识非常高效
- **搜索驱动的信息平台**：搜索框前置暗示"主动检索"的使用模式

### 不适用场景

- **深度阅读产品**：信息密度过高，缺少阅读沉浸感
- **社交信息流**：没有时间线叙事结构，不适合连续滚动浏览
- **极简品牌官网**：五色编码和网格密度会破坏极简美学
- **移动优先产品**：4列网格在手机上必须退化为1-2列，失去了网格的核心优势
- **叙事型内容**：没有线性叙事引导，不适合需要"从头读到尾"的内容

---

## 11. 与其他风格对比

| 维度 | Card Grid | Classic News | Glassmorphism | Aurora Gradient | Swiss Editorial |
|------|-----------|-------------|---------------|-----------------|-----------------|
| 布局 | 多Grid组合 | Hero+Grid+List | 浮层+叠加 | 流体+渐变区域 | 黄金比例分割 |
| 信息密度 | 极高(4列+4统计) | 中(3列) | 低 | 中 | 高但极简 |
| 色彩编码 | 五色体系 | 单色+2语义色 | 透明+单accent | 渐变彩虹 | 红/黑白 |
| 圆角 | 14px统一(变量) | 4-16px分散 | 16-24px大 | 12-16px | 0-4px极小 |
| 阴影 | 单层4% | 双层4+2% | 模糊扩散 | 无或渐变光晕 | 无 |
| 导航 | 搜索+订阅 | 链接列表 | 轻浮层 | 渐变底栏 | 极简横线 |
| 卡片层级 | large(span2)+normal | hero+side+standard | 等高浮层 | 等高+渐变底色 | 无卡片概念 |
| 响应式 | 3断点(1200/768/480) | 2断点(1024/768) | 2断点 | 1断点 | 1断点 |
| 间距 | 16px核心gap | 24px核心gap | 24-32px | 32-48px | 24px |

**与 Classic News 的关键差异**：
1. 间距更紧（16px vs 24px gap），信息密度更高
2. 搜索前置而非链接导航——暗示"主动查找"而非"被动浏览"
3. 五色体系而非单色+2语义色——视觉更丰富但也更杂
4. 统计数据行是独有元素——数据即装饰
5. Featured Grid 用 `2fr 1fr 1fr` 不等宽而非 `1fr 1fr` 等宽

**与 Aurora Gradient 最远**：Card Grid 拒绝渐变背景和光晕效果，色彩以小面积色块形式出现在标签和统计值上，而非大面积渐变铺底。

---

## 12. 变体建议

### 12.1 暗色变体（Dark Mode）

```css
:root {
  --bg: #12121e;
  --bg-2: #1c1c30;
  --bg-3: #252540;
  --text-1: #eaeaf2;
  --text-2: #9a9ab8;
  --text-3: #5a5a72;
  --accent-bg: rgba(139,92,246,0.10);
  --accent-border: rgba(139,92,246,0.24);
  --green-bg: rgba(5,150,105,0.10);
  --red-bg: rgba(220,38,38,0.10);
  --blue-bg: rgba(37,99,235,0.10);
  --orange-bg: rgba(217,119,6,0.10);
  --border: rgba(255,255,255,0.06);
  --shadow: 0 1px 3px rgba(0,0,0,0.2);
  --shadow-md: 0 4px 14px rgba(0,0,0,0.3);
  --shadow-lg: 0 8px 28px rgba(0,0,0,0.4);
}
```

**关键调整**：语义色背景 opacity 从 6%→10%（暗色底需要更高对比），border 翻转为白色透明，阴影 opacity 大幅提升。

### 12.2 编辑精选变体（Editorial Pick）

- Featured Grid 改为 `1fr 2fr 1fr`（中间大两侧小），模拟杂志的三栏排版
- 统计行改为横向滚动条（单行滚动，不占纵向空间）
- 卡片图片区增加真实缩略图而非 emoji 占位
- 增加"编辑精选"星标覆盖层在 Featured 大卡片上

### 12.3 极简数据变体（Minimal Data）

- 移除所有阴影，卡片仅用 border 分割
- 五色编码退化为灰色+单 accent 色，标签改为纯文字
- 统计行从四列改为两列（只保留今日资讯+活跃模型）
- 卡片图片区移除，纯文字卡片
- 圆角从 14px 降至 8px

---

## 13. 动效/微交互

### 13.1 已有动效

| 动效 | 类型 | 参数 | 说明 |
|------|------|------|------|
| Live 呼吸灯 | opacity 循环 | 1.5s, infinite, 1↔0.3 | 绿色实时更新指示器 |
| 卡片 Hover 位移 | translateY | -2px | hover微上浮 |
| 统计卡 Hover | box-shadow升级 | shadow→shadow-md | 仅阴影，无位移 |
| 分类切换 | color+border | 0.15s | 最快过渡，暗示"即时切换" |
| 订阅按钮 | background色 | 0.2s | accent→accent2 |
| 搜索框聚焦 | border色 | 0.2s | border→accent-border |
| 文本选中 | ::selection | accent+白 | — |

### 13.2 推荐补充动效

- **Featured 大卡片进入**：fadeIn + scale(0.98→1), 0.5s ease-out
- **统计数值计数动画**：0→128/47/312/2.4k 的递增动画，1.2s ease-out
- **卡片 stagger 进入**：8张卡片依次延迟 60ms
- **搜索框聚焦扩展**：width 从 320px→360px 微扩展
- **Live-dot 增加光晕**：当前仅 opacity，可增加 `box-shadow: 0 0 0 4px rgba(5,150,105,0)` 的扩散脉冲
- **分类按钮微弹**：active 时 scale(0.95→1), 150ms

---

## 14. 实施指南/注意事项

### 14.1 实施顺序

1. **定义 CSS 变量**：`:root` 中定义所有变量，特别注意 `--radius` 的全局引用
2. **搭建 Top Bar**：sticky 导航 + 搜索框 + 订阅按钮
3. **实现 Featured Grid**：先做 `2fr 1fr 1fr` + `span 2` 的复杂网格
4. **统计行**：四列等宽，数值区用 800 字重
5. **Card Grid**：四列等宽卡片，含图片区
6. **交互状态**：hover/active/focus 统一添加
7. **三断点响应式**：1200 → 768 → 480 逐级适配

### 14.2 关键注意事项

- **Featured Grid span 跨行**：`.feat-card.large` 的 `grid-row: span 2` 在 ≤1200px 时必须取消（`grid-row: span 1`），否则2列布局时大卡片会过度占空间
- **搜索框 `:focus-within`**：需注意 Safari 兼容性，旧版本不支持此伪类
- **`-webkit-line-clamp`**：文字截断是非标准属性，需保留 `-webkit-box-orient: vertical` 配合使用，Firefox 68+ 已支持
- **`--radius` 变量引用**：所有主要卡片的圆角统一引用 `var(--radius)`，修改一处即全局生效。但 Logo/按钮/搜索框等小组件的圆角是硬编码值，不引用此变量
- **统计值 800 字重**：Inter 800 字重需要确保 Google Fonts 引入中包含 wght@800（当前已引入）
- **卡片图片 emoji 占位**：`card-img-icon` 使用 emoji 字符，跨平台渲染差异大，建议替换为 SVG 或真实图片
- **Five色系统扩展**：新增分类时需同步定义 `--新色` + `--新色-bg` 变量，保持色彩编码的一致性
- **Grid 列数响应**：Featured Grid 从3列变2列时，`2fr 1fr 1fr` 退化为 `1fr 1fr`，大卡片的视觉权重会降低

### 14.3 可扩展方向

- 卡片增加 hover 时图片区的微位移或亮度变化
- 统计行增加迷你趋势线（sparkline）
- Featured 大卡片增加自动轮播
- 搜索结果页的骨架屏设计
- 分类切换时卡片区的过渡动画（淡入淡出而非硬切换）
- 增加无限滚动替代"加载更多"按钮