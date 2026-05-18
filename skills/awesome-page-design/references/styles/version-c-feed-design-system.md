# Feed Layout 设计系统文档

> 基于 AI Pulse 版本C：信息流布局（亮色）的完整设计系统分析

---

## 重要使用原则

本文件提供的是视觉风格提示，不是固定页面布局方案。示例 HTML 的页面结构仅用于统一展示和截图，不应在真实项目中照搬。后续开发时，应根据用户需求、业务流程、内容优先级和设备场景重新设计页面布局；可复用的是配色、字体、圆角、边框、阴影、质感、状态和动效等视觉语言。

---

## 1. 风格定义与核心精神

**风格名称**：Feed Layout（社交信息流）

**核心精神**：以时间线为叙事主线，用单列信息流模拟社交媒体的「刷」体验。追求「沉浸阅读 × 时间叙事 × 社交互动」——像一条你可以不断往下滚动的故事线，每条资讯既是独立的片段，也是时间线上的一个节点。窄容器（720px）强制聚焦，拒绝多列分心的诱惑。

**设计哲学关键词**：
- **时间驱动**：日期分隔线 + 时间标注，信息天然按时间排列
- **单列聚焦**：720px 最大宽度，保证阅读沉浸感
- **渐进展开**：默认折叠，点击展开详情——交互即阅读
- **社交化互动**：阅读量/点赞/分享的操作栏，让内容消费有"参与感"

**情感基调**：沉浸、亲密、参与——像一个你在深夜滑动阅读的精选信息流。

---

## 2. 色彩体系

### 2.1 调色板

| 角色 | CSS 变量 | 色值 | HSL | 用途 |
|------|----------|------|-----|------|
| 页面背景 | `--bg` | `#f5f6fa` | hsl(230, 14%, 97%) | 主背景，偏蓝灰白 |
| 二级背景 | `--bg-2` | `#ffffff` | hsl(0, 0%, 100%) | Feed卡片背景 |
| 三级背景 | `--bg-3` | `#ebeef4` | hsl(230, 16%, 89%) | 展开标签背景、来源图标 |
| 主文字 | `--text-1` | `#1a1a2e` | hsl(240, 25%, 14%) | 标题 |
| 二级文字 | `--text-2` | `#64648a` | hsl(250, 15%, 41%) | 正文、描述 |
| 三级文字 | `--text-3` | `#a0a0b8` | hsl(250, 12%, 68%) | 时间、元信息、展开标签 |
| 主强调色 | `--accent` | `#0891b2` | hsl(195, 95%, 37%) | Logo渐变起点、脉搏圆点 |
| 辅强调色 | `--accent2` | `#06b6d4` | hsl(190, 97%, 45%) | 突发标签文字、hover反馈 |
| 强调背景 | `--accent-bg` | `rgba(8,145,178,0.06)` | — | 突发标签背景、Header pill |
| 强调边框 | `--accent-border` | `rgba(8,145,178,0.18)` | — | 突发卡片边框 |
| 紫色 | `--purple` | `#7c3aed` | hsl(270, 70%, 54%) | 大模型标签、Logo渐变终点 |
| 紫色背景 | `--purple-bg` | `rgba(124,58,237,0.06)` | — | 大模型标签背景 |
| 绿色 | `--green` | `#059669` | hsl(160, 84%, 39%) | 应用标签 |
| 绿色背景 | `--green-bg` | `rgba(5,150,105,0.06)` | — | 应用标签背景 |
| 橙色(内联) | — | `#d97706` | hsl(38, 92%, 50%) | 政策标签 |
| 橙色背景(内联) | — | `rgba(217,119,6,0.06)` | — | 政策标签背景 |
| 蓝色(内联) | — | `#2563eb` | hsl(217, 91%, 60%) | 研究标签 |
| 蓝色背景(内联) | — | `rgba(37,99,235,0.06)` | — | 研究标签背景 |
| 边框 | `--border` | `rgba(0,0,0,0.06)` | — | 通用分割线 |
| Logo渐变 | 内联 | `linear-gradient(135deg, accent→purple)` | — | Cyan→Purple对角渐变 |

### 2.2 色彩使用规则

- **Cyan 而非 Purple/Indigo**：主强调色从版本A的 Indigo 和版本B的 Purple 转向 Cyan (`#0891b2`)，传递「流动/清新/实时」而非「权威/深沉」
- **双色渐变策略**：Logo 使用 Cyan→Purple 渐变，将品牌色和分类色桥接在一起
- **五色语义体系继承版本B**：紫(大模型)、绿(应用)、蓝(研究)、橙(政策)、Cyan(突发)——但突发色从版本B的绿改为本版本的 Cyan，与主强调色对齐
- **三级背景递进**：`#f5f6fa` → `#ffffff` → `#ebeef4`，比版本B的 `#f0f1f6` 更深更蓝（89% vs 93% 明度），用于交互区域的背景更明显
- **突发卡片特殊处理**：`border-color: var(--accent-border)` + `background: linear-gradient(135deg, var(--accent-bg), var(--bg-2))`——边框+渐变双重强调，比普通卡片更醒目

### 2.3 色彩推导公式

```
主强调: Cyan #0891b2 (hsl195,95%,37%) — 从"信息流动"而非"权威品牌"出发
accent-bg = rgba(accent, 0.06) — 与版本B一致，6%统一规则
accent-border = rgba(accent, 0.18) — 边框 ≈ 背景 × 3倍opacity
语义色配对: color + rgba(color, 0.06) — 全局6%规则
突发卡片: border(accent-border) + gradient(accent-bg→bg-2) — 渐变叠加+边框亮化
bg梯度: #f5f6fa(L97%) → #ffffff(L100%) → #ebeef4(L89%) — 三级背景，交互区域明显更深
```

---

## 3. 排版体系

### 3.1 字体栈

```css
font-family: 'Inter', system-ui, sans-serif;
```

- **主字体**：Inter（Google Fonts CDN，wght@300;400;500;600;700）
- **回退栈**：system-ui → sans-serif（与版本B一致）
- **未引入 800 字重**：Feed 风格不需要极端粗体，统计数值元素被移除

### 3.2 字号阶梯

| 用途 | 字号 | CSS 来源 | 字重 | 行高 | letter-spacing |
|------|------|----------|------|------|----------------|
| Feed 标题 | 17px | `.feed-title` | 600 | 1.4 | -0.02em |
| Feed 正文 | 14px | `.feed-body` | 400 | 1.65 | 0 |
| Summary 文字 | 13px | `.summary-text` | 400 | 1.5 | 0 |
| Summary 标题 | 13px | `.summary-title` | 600 | — | 0 |
| 标签 | 11px | `.feed-tag` | 700 | — | 0.03em |
| 标签背景 | 11px | `.feed-expand-tag` | 400 | — | 0 |
| 元信息 | 12px | `.feed-time`, `.feed-source`, `.feed-action` | 400-500 | — | 0 |
| 日期分隔 | 12px | `.day-marker-label` | 600 | — | 0.04em |
| 展开内容 | 14px | `.feed-expand-content` | 400 | 1.7 | 0 |
| 加载更多 | 14px | `.load-more` | 500 | — | 0 |
| Logo文字 | 17px | `.logo-text` | 600 | — | -0.02em |
| Header pill | 12px | `.header-pill` | 500 | — | 0 |
| Header 按钮 | 13px | `.header-btn` | 500 | — | 0 |
| 来源图标文字 | 9px | `.feed-source-icon` | — | — | 0 |

### 3.3 排版规则

- **标题字号温和**：17px 是三种风格中最小的标题字号（A为28px，B为24px/15px），配合720px窄容器，17px既醒目又不压迫
- **正文行高最松**：1.65（feed-body）和 1.7（展开内容），比版本A/B的1.5-1.6更宽松，适合沉浸阅读
- **日期标记 letter-spacing 最宽**：0.04em，唯一超过 0.05em 的正值（仅标签0.03em），强化"日期分隔"的仪式感
- **来源图标字号极小**：9px，用于字母缩写（O/A/G/EU/M），是最小的字号使用
- **标题不分级**：所有 Feed 标题统一 17px/600，没有大标题和小标题之分——时间线是平等叙事

---

## 4. 边框/圆角/阴影体系

### 4.1 边框

| 用途 | 边框定义 | 色值 |
|------|----------|------|
| 通用分割 | `1px solid var(--border)` | rgba(0,0,0,0.06) |
| 突发卡片边框 | `1px solid var(--accent-border)` | rgba(8,145,178,0.18) |
| 展开内容分割 | `1px solid var(--border)` | rgba(0,0,0,0.06) |
| Header 底边 | `1px solid var(--border)` | rgba(0,0,0,0.06) |
| Summary 分割 | `1px solid var(--border)` | rgba(0,0,0,0.06) |
| Hover 升级 | `1px solid rgba(0,0,0,0.1)` | rgba(0,0,0,0.10) |

**特色**：突发卡片 (`border-color: var(--accent-border)`) 是唯一用语义色边框的场景，其余均为通用 border。

### 4.2 圆角体系

| 场景 | 圆角 | 对应组件 |
|------|------|----------|
| Feed 卡片 | 12px | `.feed-item`, `.summary-card`, `.load-more` |
| Header pill | 6px | `.header-pill` |
| 标签 | 4px | `.feed-tag`, `.feed-expand-tag` |
| 来源图标 | 5px | `.feed-source-icon` |
| Summary 图标 | 5px | `.summary-icon` |
| 按钮 | 8px | `.header-btn` |
| 圆点 | 50% | `.summary-bullet`, `.header-pill-dot` |

**推导公式**：
```
圆角阶梯: 4px → 5px → 6px → 8px → 12px → 50%
没有 14-16px 的大圆角——单列Feed不需要"大卡片"的圆角仪式感
所有圆角 < 12px——更内敛, 更"列表化"
```

### 4.3 阴影阶梯

| 级别 | CSS 变量 | 定义 | 用途 |
|------|----------|------|------|
| 微阴影 | `--shadow` | `0 1px 3px rgba(0,0,0,0.04)` | 默认卡片（单层，与版本B一致） |
| 中阴影 | `--shadow-md` | `0 4px 14px rgba(0,0,0,0.06)` | hover 状态 |
| 大阴影 | 未定义 | — | 本版本不使用 |

**特点**：
- 仅两级阴影，比版本A（三级）和版本B（三级但lg未用）更简约
- `--shadow-lg` 未定义，Feed 风格不需要强烈的浮起感
- 阴影定义与版本B完全一致（单层shadow，14px blur的shadow-md）

---

## 5. 装饰元素/交互细节

### 5.1 装饰元素

| 元素 | 实现方式 | 说明 |
|------|----------|------|
| Logo 渐变 | `linear-gradient(135deg, accent→purple)` | Cyan→Purple，桥接品牌色与分类色 |
| 脉搏圆点 | 6px圆点 + `glow` 动画 (2s) | 带扩散光晕的呼吸灯，比版本A/B的脉搏更丰富 |
| Header pill | accent-bg + accent-border + pill-dot | 实时状态的药丸容器 |
| 日期分隔线 | `.day-marker` — label + 水平线 | 时间叙事的章节标记 |
| 突发卡片渐变 | `linear-gradient(135deg, accent-bg, bg-2)` | 角渐变而非垂直渐变（与版本B的180deg不同） |
| Summary 圆点 | 6px accent色圆点 | 要闻速览的bullet点 |
| Summary 图标容器 | 20px方块, accent-bg, 5px圆角 | 闪电SVG图标容器 |
| 来源图标 | 18px方块, bg-3背景, 5px圆角 | 首字母缩写容器 |
| 展开标签 | bg-3背景, 4px圆角, text-3色 | 折叠详情的标签药丸 |

### 5.2 交互细节

| 交互 | 触发 | 效果 | 过渡时间 |
|------|------|------|----------|
| Feed 卡片 Hover | `.feed-item:hover` | shadow→shadow-md | 0.25s |
| 卡片点击展开 | `onclick="toggleExpand(this)"` | `.expanded` class → display:block | 无过渡（硬切换） |
| 互动按钮 Hover | `.feed-action:hover` | text-3→accent2 | 0.2s |
| Header按钮 Hover | `.header-btn:hover` | text-2→text-1, border→10% | 0.2s |
| 加载更多 Hover | `.load-more:hover` | shadow→shadow-md, text-2→text-1 | 0.2s |
| 文本选中 | `::selection` | accent背景 + 白色 | — |

**特色交互**：
- **点击展开/折叠**：Feed 卡片可展开详情内容，这是三种风格中唯一的交互式内容展示
- **社交互动栏**：每条资讯底部有阅读量/点赞/分享操作，模拟社交产品的参与感
- **展开无过渡动画**：`.feed-expand` 使用 `display: none ↔ block` 硬切换，没有 height 过渡动画——可以改进

---

## 6. 示例布局/间距观察（非固定方案）


> 以下布局内容仅用于解释示例 HTML 如何展示该风格，不是后续项目必须采用的页面结构。真实项目应重新做信息架构和布局设计。

### 6.1 布局骨架

```
[Sticky Header (inner: max-width 720px)]
  ├── Logo (Logo-mark 28px + Logo-text)
  └ Header-right (pill + btn)

[Feed (max-width: 720px, padding: 24px)]
  ├── Day Marker (label + 水平线)
  ├── Summary Card (padding: 24px)
  │   ├── Summary Header (icon + title)
  │   └ Summary Items × 5 (bullet + text)
  ├── Feed Item × N (padding: 24px)
  │   ├── Feed Header (tag + time)
  │   ├── Feed Title (17px)
  │   ├── Feed Body (14px)
  │   ├── Feed Footer
  │   │   ├── Source (icon + name)
  │   │   └ Actions (views + likes + share)
  │   └ Feed Expand (默认隐藏)
  │       ├── Expand Content
  │       └ Expand Tags
  ├── Day Marker ("昨日")
  ├── Feed Item (昨日内容)
  └ Load More (padding: 14px)
```

### 6.2 间距数值表

| 场景 | 数值 | 说明 |
|------|------|------|
| Feed 最大宽度 | 720px | 三种风格中最窄，强制聚焦 |
| Feed 内边距 | 24px | 中等内边距 |
| Header 内边距 | 16px 24px | 更紧凑 |
| 卡片内边距 | 24px | Feed item 和 Summary card |
| 卡片间距 | 16px | `margin-bottom: 16px` |
| 卡片内间距 | 8-12px | Header gap, Source gap |
| Summary 项间距 | 10px 0 | 纵向padding |
| Day Marker 间距 | 32px 0 20px | 大间距分隔 |
| Header 高度 | ~56px (16px padding × 2 + 内容) | 未显式定义 |
| Footer | 无独立footer | — |

### 6.3 间距推导

```
基础间距单位 = 8px
Feed的窄容器(720px)使间距自然收紧
卡片间距用margin-bottom而非gap——因为是单列线性排列
Day Marker用32px上间距——比卡片间距(16px)翻倍，强化时间断点感
所有卡片内边距统一24px——没有版本A/B的差异化(48/36/28/20)
```

### 6.4 独特的窄容器哲学

```
720px 是阅读的最佳宽度参考线
≈ 桌面宽度的 50-60%
≈ 一本标准杂志的开本宽度
保证每行约 60-70 个中文字符(17px标题 + -0.02em)
拒绝"利用全部屏幕宽度"的诱惑，选择"留白即聚焦"
```

---

## 7. 响应式策略

### 7.1 断点定义

| 断点 | 宽度 | 变化 |
|------|------|------|
| 桌面/平板 | > 768px | 默认布局（720px居中） |
| 手机 | ≤ 768px | 内边距缩减, 字号微调 |
| 小手机 | ≤ 480px | Footer布局调整 |

### 7.2 具体适配规则

**≤ 768px**：
- `.header-inner` → `padding: 12px 16px`
- `.feed` → `padding: 16px`
- `.feed-item` → `padding: 20px`
- `.feed-title` → `font-size: 15px`
- `.header-btn` → `display: none`（隐藏"每日简报"按钮）

**≤ 480px**：
- `.feed-actions` → `gap: 10px`
- `.feed-footer` → `flex-direction: column; align-items: flex-start; gap: 12px`

### 7.3 响应式哲学

- **最简响应式**：Feed 布局天然适合窄屏，720px 容器在大部分手机上几乎不需要改变
- **仅两处实质调整**：内边距缩减 + 标题字号微缩（17→15px）
- **隐藏而非缩小**：Header 按钮 直接隐藏，搜索框不存在（版本B的180px搜索框在此版本完全移除）
- **Footer 行为改变**：480px 时 footer 变为纵向排列，操作栏从横向变为纵向
- **Day Marker 不变**：时间分隔线在任何宽度下都有效

---

## 8. 组件速查表

| 组件 | 类名 | 核心属性 | 状态变化 |
|------|------|----------|----------|
| Header | `.header` | sticky, backdrop-blur(20px) saturate(1.5) | — |
| Header容器 | `.header-inner` | max-width:720px, 16px 24px内边 | — |
| Logo | `.logo-mark` | 28px, gradient(accent→purple), 8px圆角 | — |
| 实时药丸 | `.header-pill` | accent-bg/border, 6px圆角, 12px/500 | — |
| 脉搏圆点 | `.header-pill-dot` | 6px, accent色, glow动画(2s) | 带扩散光晕 |
| Header按钮 | `.header-btn` | bg-2/border, 8px圆角, 13px/500 | hover→text-1/10%border |
| 日期标记 | `.day-marker` | flex, 12px/600/0.04em, 水平线 | — |
| 要闻速览 | `.summary-card` | 24px内边, 12px圆角, shadow | — |
| Summary图标 | `.summary-icon` | 20px, accent-bg, 5px圆角 | — |
| Summary圆点 | `.summary-bullet` | 6px, accent色, 50%圆角 | — |
| Feed卡片 | `.feed-item` | 24px内边, 12px圆角, shadow | hover→shadow-md |
| 突发卡片 | `.feed-item.breaking` | accent-border边框 + 135°渐变背景 | hover→shadow-md |
| Feed标签 | `.feed-tag` | 2px 8px, 4px圆角, 11px/700/0.03em, 五色 | — |
| Feed标题 | `.feed-title` | 17px/600/-0.02em/1.4 | — |
| Feed正文 | `.feed-body` | 14px/1.65, text-2色 | — |
| 来源信息 | `.feed-source` | 12px, text-3色, icon+name | — |
| 来源图标 | `.feed-source-icon` | 18px, bg-3背景, 5px圆角, 9px字 | — |
| 互动栏 | `.feed-actions` | flex, gap:16px | — |
| 互动按钮 | `.feed-action` | 14px SVG + 12px文字, text-3 | hover→accent2 |
| 展开区 | `.feed-expand` | 默认none, border-top分割 | expanded→display:block |
| 展开内容 | `.feed-expand-content` | 14px/1.7, text-2色 | — |
| 展开标签 | `.feed-expand-tag` | bg-3背景, 4px圆角, text-3 | — |
| 加载更多 | `.load-more` | 14px内边, 12px圆角, shadow | hover→shadow-md/text-1 |

---

## 9. CSS变量/代码片段

### 9.1 完整 CSS 变量定义

```css
:root {
  --bg: #f5f6fa;
  --bg-2: #ffffff;
  --bg-3: #ebeef4;
  --text-1: #1a1a2e;
  --text-2: #64648a;
  --text-3: #a0a0b8;
  --accent: #0891b2;
  --accent2: #06b6d4;
  --accent-bg: rgba(8,145,178,0.06);
  --accent-border: rgba(8,145,178,0.18);
  --purple: #7c3aed;
  --purple-bg: rgba(124,58,237,0.06);
  --green: #059669;
  --green-bg: rgba(5,150,105,0.06);
  --border: rgba(0,0,0,0.06);
  --shadow: 0 1px 3px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 14px rgba(0,0,0,0.06);
}
```

### 9.2 关键代码片段

**Header 毛玻璃**：
```css
.header {
  position: sticky; top: 0; z-index: 50;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(20px) saturate(1.5);
  border-bottom: 1px solid var(--border);
}
```

**突发卡片样式**：
```css
.feed-item.breaking {
  border-color: var(--accent-border);
  background: linear-gradient(135deg, var(--accent-bg), var(--bg-2));
}
```

**脉搏光晕动画**：
```css
@keyframes glow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(8,145,178,0.3); }
  50% { box-shadow: 0 0 0 4px rgba(8,145,178,0); }
}
```

**展开/折叠切换**：
```css
.feed-expand { display: none; }
.feed-item.expanded .feed-expand { display: block; }
```
```javascript
function toggleExpand(el) { el.classList.toggle('expanded'); }
```

**日期分隔线**：
```css
.day-marker {
  display: flex; align-items: center; gap: 12px;
  margin: 32px 0 20px;
}
.day-marker-line { flex: 1; height: 1px; background: var(--border); }
.day-marker-label {
  font-size: 12px; font-weight: 600;
  color: var(--text-3); letter-spacing: 0.04em;
}
```

**互动按钮 hover**：
```css
.feed-action {
  color: var(--text-3); font-size: 12px;
  transition: color 0.2s;
}
.feed-action:hover { color: var(--accent2); }
```

---

## 10. 适用/不适用场景

### 适用场景

- **社交信息流 / 新闻流**：时间线叙事，持续滚动浏览
- **Newsletter 网页版**：每日精选，按时间排列
- **个人博客 / Medium 式阅读**：窄容器聚焦阅读
- **企业内部公告流**：按时间排列的内部信息
- **产品更新日志**：版本更新的时间线展示
- **聊天/消息流**：类似微信/Twitter的信息展示模式

### 不适用场景

- **数据仪表盘**：720px 容器无法容纳多列数据对比
- **电商产品列表**：缺少图片展示和筛选/排序控件
- **多分类聚合门户**：窄容器牺牲了多维度并行浏览的效率
- **地图/可视化产品**：需要宽屏空间的信息展示
- **管理后台**：需要侧边栏+宽内容区的双栏布局

---

## 11. 与其他风格对比

| 维度 | Feed Layout | Classic News | Card Grid | Retro Y2K | Glassmorphism |
|------|------------|-------------|-----------|-----------|---------------|
| 容器宽度 | 720px居中 | 1280px全宽 | 1400px全宽 | 无限制 | 无限制 |
| 布局模式 | 单列线性 | Hero+3列+列表 | 多Grid组合 | 自由层叠 | 浮层叠加 |
| 信息导航 | 时间线驱动 | 编辑层级驱动 | 分类+网格驱动 | 视觉冲击驱动 | 美感驱动 |
| 主强调色 | Cyan(195°) | Indigo(245°) | Purple(270°) | 热粉/电蓝 | 透明渐变 |
| 互动性 | 展开/点赞/分享 | 点击跳转 | 点击跳转 | 点击/拖拽 | 点击/滑动 |
| 阅读沉浸 | 最强(窄+松行高) | 中 | 弱(网格密度) | 弱 | 中 |
| 内容层级 | 标题等权 | Hero>Side>Card | Large>Normal | 大标题>小 | 等权浮层 |
| 边界表达 | 卡片间16px间距 | Grid 24px间距 | Grid 16px间距 | 重叠/无边界 | 透明边界 |
| 时间表达 | 日期分隔线+时间戳 | 仅时间戳 | 仅时间戳 | 无 | 无 |
| 阴影 | 两级(无lg) | 三级 | 三级(lg未用) | 无/硬投影 | 扩散模糊 |

**三种风格的递进关系**：

1. **Classic News → Card Grid → Feed Layout** 是从"编辑视角"到"数据视角"到"读者视角"的递进
2. Classic News 用编辑层级（Hero→Grid→Trending）告诉读者"什么重要"
3. Card Grid 用网格和色彩编码让读者"自己选择看什么"
4. Feed Layout 用时间线和窄容器让读者"安静地往下读"

**与 Retro Y2K 最远**：Feed Layout 追求沉浸安静，Y2K 追求视觉冲击和戏谑表达。两者在容器哲学上完全对立——720px聚焦 vs 无限制层叠。

**与 Glassmorphism 的差异**：Feed 用实色背景+细边框定义卡片边界，Glass 用半透明叠加+模糊消融边界。Feed 的卡片是"独立段落"，Glass 的卡片是"浮在雾中的岛屿"。

---

## 12. 变体建议

### 12.1 暗色变体（Dark Mode）

```css
:root {
  --bg: #0f0f1a;
  --bg-2: #1a1a2e;
  --bg-3: #252540;
  --text-1: #eaeaf2;
  --text-2: #9a9ab8;
  --text-3: #5a5a72;
  --accent-bg: rgba(6,182,212,0.10);
  --accent-border: rgba(6,182,212,0.24);
  --purple-bg: rgba(124,58,237,0.10);
  --green-bg: rgba(5,150,105,0.10);
  --border: rgba(255,255,255,0.06);
  --shadow: 0 1px 3px rgba(0,0,0,0.2);
  --shadow-md: 0 4px 14px rgba(0,0,0,0.3);
}
```

**关键调整**：Cyan 在暗色底上需要更亮的 accent2 (`#06b6d4`) 作为主色调而非更暗的 accent。语义色背景从 6%→10%。突发卡片的渐变方向保持 135deg 但终点改为 `--bg-2` 暗色。

### 12.2 双栏变体（Split Feed）

- 左栏保持 720px 信息流
- 右栏 360px 用于：热门趋势列表 / 推荐阅读 / 实时讨论统计
- 总宽度 ≈ 1080px + 间距
- 右栏可折叠，移动端自动隐藏
- 适合需要"边读边看趋势"的场景

### 12.3 极简聊天变体（Chat-style）

- 卡片去除阴影和圆角，变为纯文字+细分割线
- 标签从药丸形改为行内 `[突发]` 文字标注
- 日期标记从水平线改为居中圆角气泡
- 互动栏简化为仅阅读量和时间
- 来源图标从方块改为纯文字
- 整体更像 Slack/Discord 的消息流

---

## 13. 动效/微交互

### 13.1 已有动效

| 动效 | 类型 | 参数 | 说明 |
|------|------|------|------|
| 脉搏光晕 | box-shadow 扩散 | 2s, infinite, 0→4px扩散 | Cyan色的扩散脉冲，比版本A的纯opacity更丰富 |
| 卡片 Hover | box-shadow升级 | shadow→shadow-md, 0.25s | 仅阴影，无 translateY |
| 互动按钮 Hover | color过渡 | text-3→accent2, 0.2s | 点赞/阅读/分享的颜色反馈 |
| Header按钮 Hover | color+border | text-2→text-1 + border升级, 0.2s | — |
| 加载更多 Hover | shadow+color | shadow→shadow-md + text-2→text-1, 0.2s | — |
| 展开/折叠 | display切换 | none↔block, 无过渡 | 硬切换，无动画 |
| 文本选中 | ::selection | accent+白 | — |

### 13.2 动效特色分析

- **唯一无 translateY 的风格**：Feed 卡片 hover 不位移，保持信息流的视觉稳定——滚动中的微位移会干扰阅读节奏
- **脉搏用 box-shadow 而非 opacity**：版本A用 `opacity: 1↔0.4`，版本C用 `box-shadow扩散`，后者更有"信号发射"的视觉隐喻
- **展开无过渡**：当前用 `display:none↔block` 硬切换，这是最需要改进的交互点

### 13.3 推荐补充动效

- **展开区过渡动画**：`max-height: 0 → auto` + `opacity: 0→1`, 0.3s ease-out（替代硬切换）
- **Feed 卡片进入**：fadeIn + translateY(12px→0), 0.4s ease-out
- **Summary 卡片闪烁标题**：标题文字微妙 accent2 色渐入
- **互动按钮微弹**：点击时 scale(0.9→1), 100ms，模拟"按下"反馈
- **加载更多旋转图标**：加载中 SVG 旋转动画
- **日期标记出现**：滚动到新日期区域时的 fadeIn 效果

---

## 14. 实施指南/注意事项

### 14.1 实施顺序

1. **定义 CSS 变量**：`:root` 变量，注意 Cyan 色系而非 Indigo/Purple
2. **搭建 Header**：sticky + 毛玻璃 + pill + 按钮
3. **创建 Feed 容器**：max-width: 720px, padding: 24px
4. **实现日期标记**：day-marker 组件
5. **实现 Summary Card**：要闻速览
6. **实现 Feed Item**：标准卡片 + 突发变体
7. **实现展开/折叠**：`.feed-expand` + JS toggleExpand
8. **实现互动栏**：SVG图标 + hover反馈
9. **实现加载更多**：按钮 + JS loadMore
10. **响应式适配**：768px + 480px 两个断点

### 14.2 关键注意事项

- **720px 最大宽度**：此值是整个风格的基石，不能随意扩大。如果需要双栏布局，应该新增侧栏而非扩大 Feed 容器
- **`backdrop-filter` 兼容性**：Header 使用 `blur(20px) saturate(1.5)`，Safari 需要 `-webkit-backdrop-filter`
- **展开动画缺失**：当前 `display:none↔block` 是硬切换，用户体验较差。建议改为 `max-height` + `overflow:hidden` + `transition` 的平滑展开
- **互动按钮 SVG 复用**：三种图标（眼睛/心/分享）的 SVG 代码直接内联，建议抽取为 CSS class 或 SVG symbol 复用
- **脉搏 `glow` 动画**：`box-shadow` 动画会触发重绘，建议添加 `will-change: box-shadow`
- **`margin-bottom` vs `gap`**：Feed 卡片使用 `margin-bottom: 16px` 而非 Flex/Grid gap，这是因为 Feed 是单列线性排列，且需要与 Day Marker 的间距不同
- **突发卡片渐变方向**：`135deg` 角渐变比版本B的 `180deg` 垂直渐变更有"闪烁"感，但面积更小，只在角落可见
- **来源图标字号**：9px 的首字母缩写在不同浏览器/OS下渲染差异大，建议改用 SVG 或固定字体的 icon
- **加载更多交互**：`setTimeout(1500)` 的模拟加载应改为真实 API 调用或至少添加加载动画

### 14.3 可扩展方向

- 无限滚动替代"加载更多"按钮
- 卡片增加书签/收藏功能
- 互动栏增加评论入口
- 搜索功能（版本B有，本版本缺失）
- 侧栏趋势/热门模块（双栏变体）
- 暗色模式切换按钮
- Feed 卡片的骨架屏加载态
- 卡片增加微型趋势线图标（阅读量变化）
- 增加键盘快捷键（J/K 上下跳转卡片，E 展开/折叠）