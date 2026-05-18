# Classic News 设计系统文档

> 基于 AI Pulse 版本A：经典新闻布局（亮色）的完整设计系统分析

---

## 重要使用原则

本文件提供的是视觉风格提示，不是固定页面布局方案。示例 HTML 的页面结构仅用于统一展示和截图，不应在真实项目中照搬。后续开发时，应根据用户需求、业务流程、内容优先级和设备场景重新设计页面布局；可复用的是配色、字体、圆角、边框、阴影、质感、状态和动效等视觉语言。

---

## 1. 风格定义与核心精神

**风格名称**：Classic News（经典新闻门户）

**核心精神**：以传统新闻门户的编辑式 hierarchy 为骨架，注入现代 SaaS 产品的精致质感。追求「权威感 × 可读性 × 信息密度」的平衡——像一份精心编排的数字报纸，而非冷冰冰的仪表盘。视觉传达的优先级永远是内容本身，装饰永远退居幕后。

**设计哲学关键词**：
- **克制精致**：阴影极浅、边框极细、色彩介入极其克制
- **编辑式层级**：Hero → Grid → Trending，三段式信息架构模拟报纸头版
- **信任感优先**：中性色调、严谨排版、极低装饰度，传递新闻源的权威性
- **渐进式引导**：hover 时才显现交互反馈，默认状态安静不扰

**情感基调**：冷静、专业、可信——像一个你在早晨咖啡时信赖打开的新闻站点。

---

## 2. 色彩体系

### 2.1 调色板

| 角色 | CSS 变量 | 色值 | HSL | 用途 |
|------|----------|------|-----|------|
| 页面背景 | `--bg` | `#f8f9fc` | hsl(230, 20%, 97%) | 主背景，偏蓝灰白 |
| 二级背景 | `--bg-2` | `#ffffff` | hsl(0, 0%, 100%) | 卡片/容器背景 |
| Hover 背景 | `--bg-hover` | `#f1f3f8` | hsl(230, 18%, 95%) | 交互状态背景 |
| 主文字 | `--text-1` | `#1a1a2e` | hsl(240, 25%, 14%) | 标题、核心内容 |
| 二级文字 | `--text-2` | `#5a5a78` | hsl(240, 15%, 40%) | 描述、正文 |
| 三级文字 | `--text-3` | `#9a9ab0` | hsl(240, 10%, 67%) | 时间、元信息 |
| 主强调色 | `--accent` | `#4f46e5` | hsl(245, 75%, 57%) | Logo渐变起点、活跃链接 |
| 辅强调色 | `--accent2` | `#6366f1` | hsl(245, 75%, 62%) | 标签文字、活跃导航 |
| 强调背景 | `--accent-bg` | `rgba(79,70,229,0.08)` | — | 标签/图标背景 |
| 强调边框 | `--accent-border` | `rgba(79,70,229,0.20)` | — | 标签/活跃按钮边框 |
| 渐变 | `--gradient` | `linear-gradient(135deg, #4f46e5, #7c3aed)` | — | Logo、品牌元素 |
| 边框 | `--border` | `rgba(0,0,0,0.06)` | — | 通用分割线 |
| 红色(Hot) | 内联 | `#dc2626` | hsl(0, 72%, 51%) | 热门标签文字 |
| 红色背景 | 内联 | `rgba(220,38,38,0.08)` | — | 热门标签背景 |
| 绿色(New) | 内联 | `#059669` | hsl(160, 84%, 39%) | 新鲜标签文字 |
| 绿色背景 | 内联 | `rgba(5,150,105,0.08)` | — | 新鲜标签背景 |

### 2.2 色彩使用规则

- **主色 Indigo 占比 < 8%**：仅用于 Logo 渐变、活跃导航下划线、标签文字与边框，绝不用于大面积背景
- **灰阶文字三级递减**：`--text-1` → `--text-2` → `--text-3`，明度从 14% → 40% → 67%，形成严格的阅读层级
- **背景色微偏蓝**：`--bg` 为 `#f8f9fc` 而非纯 `#f5f5f5`，1-2% 的蓝调注入使页面不会感到"灰黄"
- **强调色透明度推导**：背景用 8% opacity，边框用 20% opacity，遵循 `背景 ≈ 边框 × 0.4` 的比例关系
- **语义色独立于主色**：Hot 红、New 绿为独立语义色，不从 Indigo 推导，保证信息辨识度

### 2.3 色彩推导公式

```
强调背景 = accent + opacity(8%)  → rgba(accent, 0.08)
强调边框 = accent + opacity(20%) → rgba(accent, 0.20)
Hover 背景 = bg 向蓝灰偏移 -2% 明度
文字层级: text-1(L14%) → text-2(L40%) → text-3(L67%)，每级约 +26% 明度
语义标签: 文字色 + opacity(8%) = 标签背景色
```

---

## 3. 排版体系

### 3.1 字体栈

```css
font-family: 'Inter', -apple-system, sans-serif;
```

- **主字体**：Inter（Google Fonts CDN 引入，wght@300;400;500;600;700）
- **回退栈**：-apple-system → sans-serif
- **选择理由**：Inter 的高 x-height 与微窄字宽使它在小尺寸下依然清晰，适合信息密集型页面

### 3.2 字号阶梯

| 用途 | 字号 | CSS 来源 | 字重 | 行高 | letter-spacing |
|------|------|----------|------|------|----------------|
| Hero 主标题 | 28px | `.hero-title` | 700 | 1.3 | -0.03em |
| Hero 副描述 | 15px | `.hero-desc` | 400 | 1.7 | 0 |
| 区域标题 | 20px | `.section-title` | 600 | — | -0.02em |
| 侧边标题 | 16px | `.hero-side-title`, `.news-card-title` | 600 | 1.4 | -0.01em |
| 正文/摘要 | 14px | `.news-card-excerpt` | 400 | 1.6 | 0 |
| 导航链接 | 14px | `.nav-links a` | 500 | — | 0 |
| 导航标题 | 18px | `.nav-title` | 600 | — | -0.02em |
| 趋势标题 | 14px | `.trending-title` | 500 | — | 0 |
| 元信息 | 13px | `.hero-meta`, `.nav-date`, `.footer` | 400-500 | — | 0 |
| 标签文字 | 11-12px | `.hero-tag`, `.news-card-tag`, `.hero-side-tag` | 600-700 | — | 0 |
| 趋势排名 | 18px | `.trending-rank` | 700 | — | 0 |

### 3.3 排版规则

- **标题 letter-spacing 负值递增**：28px → -0.03em，20px → -0.02em，16px → -0.01em，14px → 0。字号越大，负 letter-spacing 越深，形成视觉收紧
- **行高与字号正相关**：标题 1.3-1.4，正文 1.6-1.7，元信息 1.6（body 默认）
- **字重五档使用**：700（Hero/排名）、600（标题/导航）、500（链接/正文）、400（描述/元信息）、300（未使用，留作长文排版）

---

## 4. 边框/圆角/阴影体系

### 4.1 边框

| 用途 | 边框定义 | 色值 | 粗细 |
|------|----------|------|------|
| 通用分割 | `1px solid var(--border)` | rgba(0,0,0,0.06) | 1px |
| 强调分割 | `1px solid var(--accent-border)` | rgba(79,70,229,0.20) | 1px |
| 导航底边 | `1px solid var(--border)` | rgba(0,0,0,0.06) | 1px |
| Footer 顶边 | `1px solid var(--border)` | rgba(0,0,0,0.06) | 1px |

**规则**：所有边框均为 1px，无 2px 或更粗边框。opacity 极低（6%），形成「存在但不可见」的分割感。

### 4.2 圆角阶梯

| 场景 | 圆角 | 对应组件 |
|------|------|----------|
| 大容器 | 16px | Hero 主卡片 |
| 标准卡片 | 12px | 新闻卡片、侧边卡片 |
| 按钮/小容器 | 8px | 滤镜按钮、导航Logo、返回顶部 |
| 药丸标签 | 20px | Hero 标签（`border-radius: 20px`） |
| 小徽章 | 4px | 新闻分类标签、来源图标 |
| 导航活跃指示 | 1px | `::after` 下划线 |
| 小圆点 | 50% | Hero 脉搏圆点 |

**推导公式**：
```
圆角阶梯: 4px → 8px → 12px → 16px → 20px → 50%
每级递增 4px，药丸形用 20px（≈半高），圆形用 50%
```

### 4.3 阴影阶梯

| 级别 | CSS 变量 | 定义 | 用途 |
|------|----------|------|------|
| 微阴影 | `--shadow` | `0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)` | 默认卡片、趋势条目 |
| 中阴影 | `--shadow-md` | `0 4px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)` | Hero 主卡片、hover 状态 |
| 大阴影 | `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.08)` | Hero hover、返回顶部 |

**特点**：
- 双层阴影结构（近层 + 远层），模拟自然光下的柔和投影
- 最大 opacity 仅 8%，阴影永远比文字弱
- 阴影升级仅在 hover 时触发，默认状态保持安静

---

## 5. 装饰元素/交互细节

### 5.1 装饰元素

| 元素 | 实现方式 | 说明 |
|------|----------|------|
| Logo 渐变 | `background: var(--gradient)` (135deg, Indigo→Purple) | 方形Logo内的双色渐变 |
| Hero 背景渐变 | `::before` 伪元素, 180px 高度渐变 | 从 accent-bg 到紫灰渐变，仅在顶部区域 |
| 脉搏圆点 | 6px 圆点 + `pulse` 动画 (2s infinite) | 突发新闻标签前的呼吸灯 |
| 活跃导航下划线 | `::after` 伪元素, 2px 高 | 底部2px Indigo色横线 |
| 区域标题图标 | 24px 方块 + accent-bg + accent-border | 闪电/趋势SVG图标容器 |
| 来源图标 | 16px 方块, bg色, 4px 圆角 | 占位符式的来源标识 |

### 5.2 交互细节

| 交互 | 触发 | 效果 | 过渡时间 |
|------|------|------|----------|
| 卡片 Hover | `.hero-main:hover`, `.news-card:hover` | shadow-md→shadow-lg + translateY(-2px) | 0.2-0.3s |
| 侧边卡片 Hover | `.hero-side-card:hover` | shadow→shadow-md + translateY(-1px) | 0.2s |
| 趋势条目 Hover | `.trending-item:hover` | shadow→shadow-md | 0.2s |
| 滤镜按钮 Hover | `.filter-btn:hover` | text-2→text-1, border→accent-border | 0.2s |
| 滤镜按钮 Active | `.filter-btn.active` | accent-bg背景 + accent2文字 + accent-border | 0.2s |
| 导航链接 Hover | `.nav-links a:hover` | text-2→text-1 | 0.2s |
| Footer链接 Hover | `.footer-links a:hover` | text-3→text-1 | 0.2s |
| 返回顶部显隐 | `scrollY > 300` | opacity 0→1 | 0.3s |
| 返回顶部 Hover | `.scroll-top:hover` | shadow-md→shadow-lg | 0.2s |
| 文本选中 | `::selection` | accent背景 + 白色文字 | — |

---

## 6. 示例布局/间距观察（非固定方案）


> 以下布局内容仅用于解释示例 HTML 如何展示该风格，不是后续项目必须采用的页面结构。真实项目应重新做信息架构和布局设计。

### 6.1 布局骨架

```
[Fixed Nav 64px]
  ├── Brand (Logo 32px + Title)
  ├── Links (gap: 32px)
  └ Date Pill

[Main 64px offset, max-width: 1280px, padding: 40px]
  ├── Hero Section (mb: 48px)
  │   ├── Grid: 2列 (1fr 1fr, gap: 24px)
  │   │   ├── Hero Main (padding: 48px)
  │   │   └ Hero Sidebar (flex-column, gap: 16px)
  │   │       ├── Side Card (padding: 24px)
  │   │       ├── Side Card
  │   │       └ Side Card
  ├── News Section (mb: 48px)
  │   ├── Section Header (mb: 24px)
  │   └ Grid: 3列 (repeat(3, 1fr), gap: 24px)
  │       ├── News Card (padding: 28px) × 6
  ├── Trending Section (mb: 48px)
  │   ├── Section Header (mb: 24px)
  │   └ List: flex-column (gap: 10px)
  │       ├── Trending Item (padding: 14px 20px) × 5

[Footer (padding: 32px 40px)]
```

### 6.2 间距数值表

| 场景 | 数值 | 说明 |
|------|------|------|
| 页面内边距 | 40px | `padding: 40px`（桌面） |
| 区域间距 | 48px | section 之间 `margin-bottom` |
| 卡片内边距 | 48px / 28px / 24px | Hero大 / 新闻卡 / 侧边卡 |
| Grid gap | 24px | 所有 grid 的列间距 |
| Flex gap | 32px / 16px / 10px | 导航 / meta / trending列表 |
| 组件内间距 | 8-16px | 标签padding、meta gap等 |
| 导航高度 | 64px | 固定导航栏高度 |
| 最大宽度 | 1280px | 主内容区 |

### 6.3 间距推导

```
基础间距单位 = 8px
间距阶梯: 8 → 10 → 12 → 16 → 20 → 24 → 28 → 32 → 40 → 48 → 64
遵循 8px grid，特殊值(10px)仅在列表间距出现
```

---

## 7. 响应式策略

### 7.1 断点定义

| 断点 | 宽度 | 变化 |
|------|------|------|
| 桌面 | > 1024px | 默认布局 |
| 平板 | ≤ 1024px | Hero 单列, 新闻2列 |
| 手机 | ≤ 768px | 全部单列, 导航精简 |

### 7.2 具体适配规则

**≤ 1024px**：
- `.hero-inner` → `grid-template-columns: 1fr`（侧边卡片变为纵向排列）
- `.news-grid` → `grid-template-columns: repeat(2, 1fr)`（3列变2列）

**≤ 768px**：
- `.nav` → `padding: 0 20px`, `.nav-links` → `gap: 16px`
- `.nav-date` → `display: none`（隐藏日期药丸）
- `.main` → `padding: 24px 20px`
- `.hero-main` → `padding: 28px`, `.hero-title` → `font-size: 22px`
- `.news-grid` → `grid-template-columns: 1fr`
- `.footer` → `flex-direction: column; gap: 16px`

### 7.3 响应式哲学

- **内容优先裁剪**：先裁剪装饰元素（日期药丸），再调整布局
- **渐进退列**：3列 → 2列 → 1列，每个断点减少一列
- **字号适配仅限Hero标题**：28px → 22px，其余字号不变
- **间距缩减而非归零**：40px → 20px，保持呼吸感

---

## 8. 组件速查表

| 组件 | 类名 | 核心属性 | 状态变化 |
|------|------|----------|----------|
| 导航栏 | `.nav` | fixed, 64px高, backdrop-blur(20px) | — |
| Logo | `.nav-logo` | 32px, gradient背景, 8px圆角 | — |
| 导航链接 | `.nav-links a` | 14px/500, text-2色 | hover→text-1, active→accent2+下划线 |
| 日期药丸 | `.nav-date` | 13px, bg色背景, 6px圆角 | — |
| Hero主卡 | `.hero-main` | 48px内边, 16px圆角, shadow-md | hover→shadow-lg+translateY(-2px) |
| Hero标签 | `.hero-tag` | 药丸形(20px圆角), accent-bg | — |
| 脉搏圆点 | `.hero-tag-dot` | 6px圆, accent色, pulse动画 | — |
| Hero标题 | `.hero-title` | 28px/700/1.3/-0.03em | — |
| Hero描述 | `.hero-desc` | 15px/1.7, text-2色 | — |
| Hero元信息 | `.hero-meta` | 13px, text-3色, flex+16px gap | — |
| 侧边卡片 | `.hero-side-card` | 24px内边, 12px圆角, shadow | hover→shadow-md+translateY(-1px) |
| 区域标题 | `.section-title` | 20px/600/-0.02em | — |
| 区域图标容器 | `.section-title-icon` | 24px方块, accent-bg/border, 6px圆角 | — |
| 滤镜按钮 | `.filter-btn` | 6px 14px内边, 8px圆角, text-2 | hover→text-1/accent-border, active→accent-bg/accent2 |
| 新闻卡片 | `.news-card` | 28px内边, 12px圆角, shadow | hover→shadow-md+translateY(-2px) |
| 新闻标签 | `.news-card-tag` | 3px 10px, 4px圆角, 11px/600 | .hot→红, .new→绿 |
| 趋势条目 | `.trending-item` | 14px 20px内边, 10px圆角, shadow | hover→shadow-md |
| 趋势排名 | `.trending-rank` | 18px/700, accent2色, 32px宽 | — |
| Footer | `.footer` | 1px border-top, 32px 40px内边 | — |
| 返回顶部 | `.scroll-top` | 40px方块, 10px圆角, shadow-md | scrollY>300→visible, hover→shadow-lg |

---

## 9. CSS变量/代码片段

### 9.1 完整 CSS 变量定义

```css
:root {
  --bg: #f8f9fc;
  --bg-2: #ffffff;
  --bg-card: #ffffff;
  --bg-hover: #f1f3f8;
  --text-1: #1a1a2e;
  --text-2: #5a5a78;
  --text-3: #9a9ab0;
  --accent: #4f46e5;
  --accent2: #6366f1;
  --accent-bg: rgba(79,70,229,0.08);
  --accent-border: rgba(79,70,229,0.2);
  --gradient: linear-gradient(135deg, #4f46e5, #7c3aed);
  --border: rgba(0,0,0,0.06);
  --shadow: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.08);
}
```

### 9.2 关键代码片段

**导航栏毛玻璃效果**：
```css
.nav {
  background: rgba(255,255,255,0.88);
  backdrop-filter: blur(20px) saturate(1.8);
  border-bottom: 1px solid var(--border);
}
```

**脉搏动画**：
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
```

**Hero 渐变覆盖层**：
```css
.hero-main::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 180px;
  background: linear-gradient(135deg, var(--accent-bg), rgba(124,58,237,0.06));
  pointer-events: none;
}
```

**通用 Hover 升级模式**：
```css
.component {
  box-shadow: var(--shadow);
  transition: box-shadow 0.2-0.3s, transform 0.2s;
}
.component:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-1px 或 -2px);
}
```

---

## 10. 适用/不适用场景

### 适用场景

- **新闻门户 / 媒体站点**：信息密集型内容消费，需要编辑式层级引导
- **企业博客 / 行业资讯**：需要传递权威感和可信度
- **文档中心 / 知识库首页**：需要清晰的分类导航和内容入口
- **SaaS 产品仪表盘（内容型）**：以阅读为主、操作为辅的场景
- **技术周刊 / Newsletter 网页版**：定期更新的内容聚合页

### 不适用场景

- **社交/社区类产品**：缺乏互动元素（评论、点赞等视觉反馈不足）
- **电商/交易类产品**：缺少商品展示的视觉冲击力和转化引导
- **创意/艺术展示**：装饰克制度过高，无法承载强视觉表达
- **数据密集型仪表盘**：缺少图表、实时数据可视化组件
- **移动优先产品**：布局以宽屏为基准，移动端体验退化为简单单列

---

## 11. 与其他风格对比

| 维度 | Classic News | Neo-Brutalism | Swiss Editorial | Glassmorphism | Light Skeuomorphism |
|------|-------------|---------------|-----------------|---------------|---------------------|
| 边框 | 1px/6%透明 | 2-4px纯黑实线 | 极细或无边框 | 无边框/毛玻璃 | 1px灰色+内阴影 |
| 阴影 | 多层极浅双层 | 无或粗硬投影 | 无阴影 | 模糊扩散阴影 | 柔和内+外阴影 |
| 圆角 | 4-16px递增 | 0-2px极小 | 0-4px极小 | 12-24px大圆角 | 8-12px中等 |
| 色彩 | Indigo单色系 | 高饱和纯色 | 红/黑白极简 | 透明渐变 | 中性灰+蓝色 |
| 字体 | Inter现代无衬线 | 粗体手写/漫画 | Helvetica严谨 | 轻量无衬线 | SF Pro系统字体 |
| 背景 | 偏蓝灰白 | 纯白/奶黄 | 纯白 | 半透明叠加 | 纯白+极浅灰 |
| 交互反馈 | 微位移+阴影升级 | 无过渡/硬切换 | 极简hover | 光泽位移 | 按压内阴影 |
| 信息层级 | 编辑三段式 | 网格+色块 | 黄金比例分割 | 卡片浮层 | 列表+分组 |
| 情感基调 | 冷静可信 | 戏谑反叛 | 严谨理性 | 梦幻轻盈 | 熟悉亲切 |

**与 Swiss Editorial 最接近**：两者都追求克制精致和编辑式层级，但 Classic News 更 SaaS 化（圆角更大、阴影更柔），Swiss Editorial 更印刷化（0圆角、无阴影、更极端的字号对比）。

**与 Glassmorphism 最远**：Classic News 的背景是实色而非半透明叠加，阴影是硬边而非模糊扩散，圆角适中而非极端圆润。

---

## 12. 变体建议

### 12.1 暗色变体（Dark Mode）

```css
:root {
  --bg: #0f0f1a;
  --bg-2: #1a1a2e;
  --bg-hover: #252540;
  --text-1: #e8e8f0;
  --text-2: #a0a0b8;
  --text-3: #6a6a80;
  --accent-bg: rgba(99,102,241,0.12);
  --accent-border: rgba(99,102,241,0.25);
  --border: rgba(255,255,255,0.06);
  --shadow: 0 1px 3px rgba(0,0,0,0.2);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.3);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.4);
}
```

**关键调整**：背景明度翻转，文字层级明度反转（14%→88%），阴影opacity提升至20-40%，accent透明度加倍（8%→12%, 20%→25%），border从黑色透明变为白色透明。

### 12.2 编辑加强变体（Editorial Enhanced）

- Hero 区域增加全宽图片背景 + 白色文字叠加
- 区域标题改为左粗线（4px accent色左边框）替代图标方块
- 趋势排名改为数字用 accent 色、条目增加微型进度条
- Footer 增加「编辑精选」横向滚动卡片带

### 12.3 极简变体（Minimalist）

- 移除所有阴影，仅用 border 分割
- Hero 区域取消 `::before` 渐变覆盖
- 标签从药丸形改为纯文字+左色点
- 圆角统一降至 8px
- 间距缩减 25%（40px→32px, 24px→16px）

---

## 13. 动效/微交互

### 13.1 已有动效

| 动效 | 类型 | 参数 | 说明 |
|------|------|------|------|
| 脉搏呼吸 | opacity 循环 | 2s, infinite, 1↔0.4 | 突发新闻标签前的圆点呼吸灯 |
| 卡片 Hover 位移 | translateY | -1px 或 -2px | hover时微微上浮，营造「拾起」感 |
| 阴影升级 | box-shadow | shadow→shadow-md→shadow-lg | hover时阴影层级递增 |
| 颜色过渡 | color | 0.2s | 链接/按钮颜色平滑切换 |
| 返回顶部显隐 | opacity | 0↔1, 0.3s | 滚动超过300px时显现 |
| 平滑滚动 | scroll-behavior | smooth | 页面全局平滑滚动 |

### 13.2 推荐补充动效

- **Hero 卡片进入**：首次加载时 fadeIn + translateY(20px→0)，0.6s ease-out
- **新闻卡片 stagger 进入**：6张卡片依次延迟 80ms 进入
- **滤镜切换**：active 状态切换增加 150ms scale(0.95→1) 微弹
- **趋势条目 hover**：增加左侧 accent 色 2px 进度条滑入
- **返回顶部点击**：点击后按钮短暂 scale(0.9) 再恢复

---

## 14. 实施指南/注意事项

### 14.1 实施顺序

1. **定义 CSS 变量**：先在 `:root` 中定义所有变量，确保全局一致
2. **搭建布局骨架**：先实现 Nav + Main + Footer 的固定结构
3. **逐区填充组件**：Hero → News Grid → Trending，按视觉优先级实现
4. **添加交互状态**：所有 hover/active 状态最后统一添加
5. **响应式适配**：从桌面版本出发，逐断点向下适配

### 14.2 关键注意事项

- **backdrop-filter 兼容性**：需 `-webkit-backdrop-filter` 备选，Safari 需特殊处理
- **Inter 字体加载**：Google Fonts CDN 需考虑离线场景，应预设 system-ui 回退
- **阴影性能**：多层阴影在大量卡片场景下可能影响渲染性能，低端设备可降级为单层
- **Grid 嵌套**：Hero Grid 内嵌 Flex 列，注意避免 `min-height: 0` 问题
- **sticky 导航**：`position: fixed` 与 `margin-top: 64px` 需同步，否则内容会被导航遮挡
- **脉搏动画**：`infinite` 动画需注意 `will-change: opacity` 优化，避免持续触发重绘
- **滚动监听**：`scrollY > 300` 判断应使用 `requestAnimationFrame` 或 `passive` 监听优化
- **圆角一致性**：同一层级组件圆角必须一致（新闻卡片统一12px），混用会造成视觉碎片化
- **语义色独立管理**：Hot 红 / New 绿不应混入 accent 变量体系，它们是信息语义而非品牌语义

### 14.3 可扩展方向

- 增加 `--radius` 变量统一管理圆角（版本B已采用此模式）
- 增加字体加载状态管理（`font-display: swap`）
- 将滤镜按钮组件化，支持动态分类注入
- 为新闻卡片增加图片区（当前仅有文字）
- 趋势条目增加迷你图表或热度条可视化