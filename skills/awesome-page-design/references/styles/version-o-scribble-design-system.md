# Human Scribble 设计系统文档

> 基于 `version-o-scribble.html` 的完整设计系统分析

---

## 重要使用原则

本文件提供的是视觉风格提示，不是固定页面布局方案。示例 HTML 的页面结构仅用于统一展示和截图，不应在真实项目中照搬。后续开发时，应根据用户需求、业务流程、内容优先级和设备场景重新设计页面布局；可复用的是配色、字体、圆角、边框、阴影、质感、状态和动效等视觉语言。

---

## 1. 风格定义与核心精神

**Human Scribble** 是一种模拟手写笔记本质感的设计风格，将数字界面的冰冷感转化为温暖、有人味儿的视觉体验。其核心精神可概括为：

- **手写温度**：用 Caveat/Permanent Marker 等手写字体替代严肃的 UI 字体，让每一段文字都像是亲手写下的笔记
- **荧光笔标注**：用半透明色块模拟荧光笔划重点的动作，而非传统的高亮组件
- **涂鸦装饰**：小角度旋转、虚线边框、手绘下划线、emoji 角落涂鸦——一切都在模拟在笔记本上乱涂乱画的随性
- **方格纸底纹**：背景用细密方格纹模拟笔记本纸张，营造"写在本子上"的沉浸感
- **颜色像彩色铅笔**：5 种涂鸦色（红/蓝/绿/橙/紫）模拟彩色铅笔在纸上的随性标记

风格关键词：**随性、温暖、笔记感、手写、涂鸦、荧光笔、方格纸**

---

## 2. 色彩体系

### 2.1 调色板

| 角色 | 变量名 | 色值 | HSL | 用途 |
|------|--------|------|-----|------|
| 页面背景 | `--bg` | `#FFF8F0` | HSL(30,100%,96%) | body 主背景，暖白带米黄调 |
| 纸张色 | `--paper` | `#FFFDF7` | HSL(40,100%,99%) | 卡片/hero/区块背景，极浅暖白 |
| 奶油色 | `--cream` | `#F5ECD7` | HSL(40,50%,89%) | featured card / subscribe 背景 |
| 铅笔深灰 | `--pencil` | `#2B2B2B` | HSL(0,0%,17%) | 主文字色，模拟铅笔石墨 |
| 铅笔浅灰 | `--pencil-light` | `#666` | HSL(0,0%,40%) | 辅助文字/描述文字 |
| 墨水深蓝 | `--ink` | `#1A3A5C` | HSL(210,55%,23%) | 标题/logo/重要标记，模拟钢笔墨水 |
| 墨水浅蓝 | `--ink-light` | `#4A7A9C` | HSL(200,38%,45%) | 辅助性墨水色 |
| 涂鸦红 | `--scribble-red` | `#E74C3C` | HSL(6,74%,47%) | 红色铅笔标记/热门/重要 |
| 涂鸦蓝 | `--scribble-blue` | `#3498DB` | HSL(204,70%,53%) | 蓝色铅笔标记/芯片/交互 |
| 涂鸦绿 | `--scribble-green` | `#27AE60` | HSL(145,63%,41%) | 绿色铅笔标记/创业/速递 |
| 涂鸦橙 | `--scribble-orange` | `#F39C12` | HSL(37,90%,51%) | 橙色铅笔标记/伦理/编号 |
| 涂鸦紫 | `--scribble-purple` | `#8E44AD` | HSL(280,53%,42%) | 紫色铅笔标记/LLM |
| 荧光黄 | `--highlight-yellow` | `rgba(255,220,0,0.25)` | — | 荧光笔划重点 |
| 荧光绿 | `--highlight-green` | `rgba(0,220,100,0.15)` | — | 绿荧光笔标注 |
| 荧光粉 | `--highlight-pink` | `rgba(255,100,150,0.15)` | — | 粉荧光笔标注 |

### 2.2 色彩使用规则

| 规则 | 说明 |
|------|------|
| 背景层级 | `--bg` → `--paper` → `--cream`，三级由浅到深，模拟纸张到牛皮纸的过渡 |
| 文字层级 | `--pencil` → `--pencil-light` → `--ink`，铅笔灰用于正文，墨水蓝用于标题 |
| 涂鸦色仅做标记 | 5 种涂鸦色绝不用于大面积填充，仅用于边框、标签、下划线等标记性元素 |
| 荧光笔透明度 | 荧光效果统一用 rgba，黄色 0.25、绿色/粉色 0.15，模拟真实荧光笔半透明感 |
| 涂鸦色背景搭配 | 每种涂鸦色对应极浅背景（opacity 0.08），如 `rgba(231,76,60,0.08)` |

### 2.3 色彩推导公式

| 目标 | 公式 | 示例 |
|------|------|------|
| 涂鸦色极浅背景 | `涂鸦色 rgba(R,G,B, 0.08)` | 红 → `rgba(231,76,60,0.08)` |
| 涂鸦色半透明填充 | `涂鸦色 rgba(R,G,B, 0.6)` | 紫 → `rgba(142,68,173,0.6)` (进度条) |
| 荧光笔效果 | `荧光色 rgba(R,G,B, 0.15~0.25)` | 黄 → `rgba(255,220,0,0.25)` |
| 方格纸纹线 | `rgba(0,0,0, 0.02)` | 极浅灰线模拟方格 |
| 边框装饰 | `涂鸦色 opacity: 0.15~0.3` | 虚线边框用涂鸦色低透明度 |

---

## 3. 排版体系

### 3.1 字体栈

| 角色 | 字体 | 类型 | 回退 | 字重范围 |
|------|------|------|------|----------|
| 手写笔记 | `Caveat` | 手写体 | `cursive` | 400/500/600/700 |
| 马克笔标题 | `Permanent Marker` | 马克笔体 | `cursive` | 400 (仅展示) |
| UI 正文 | `Inter` | 无衬线 | `sans-serif` | 400/500/600/700 |

**字体分工规则：**
- **Permanent Marker**：仅用于 Logo、大标题、Section 标题——模拟用马克笔写的大字
- **Caveat**：用于标签、注释、手写备注、分类、meta 信息——模拟铅笔小字笔记
- **Inter**：用于正文段落、描述文字——保证可读性的"印刷体"

### 3.2 字号层级

| 层级 | 字号 | 字体 | 字重 | 用途 |
|------|------|------|------|------|
| XXL | 38px | Permanent Marker | 400 | Hero 主标题 |
| XL | 26px | Permanent Marker | 400 | Logo |
| LG | 24px | Permanent Marker | 400 | 订阅标题 |
| MD+ | 22px | Permanent Marker | 400 | Section 标题 / Featured card 标题 |
| MD | 20px | Permanent Marker | 400 | 趋势区块标题 |
| SM+ | 18px | Caveat | 600-700 | 导航链接 / 输入框文字 / 时间标签 |
| SM | 16px | Caveat / Inter | 600 | 标签 / 荧光笔注释 / 荧光笔备注 / 副标题(Inter) |
| XS+ | 15px | Inter | 600 | 卡片标题 |
| XS | 14px | Caveat / Inter | 500-700 | 分类标记(Caveat) / 描述文字(Inter) / 卡片meta(Caveat) |
| XXS | 13px | Inter | 400 | 卡片正文段落 |
| Micro | 28px | Caveat | 400 | 涂鸦编号（装饰性） |

### 3.3 字重使用规则

| 字重 | 用途 |
|------|------|
| 400 | Permanent Marker 默认（唯一字重）、正文段落 |
| 500 | Inter 描述文字 |
| 600 | Caveat 导航/标签/注释、Inter 卡片标题 |
| 700 | Caveat 分类标记/手写重点、Caveat 热门标记 |

### 3.4 行高体系

| 场景 | 行高 | 说明 |
|------|------|------|
| Body 全局 | 1.6 | 默认行高，模拟手写行间距 |
| Hero 标题 | 1.2 | 标题紧凑行高 |
| Featured 标题 | 1.3 | 略宽于普通标题 |
| 卡片标题 | 1.4 | 中等行高 |
| 卡片正文 | 1.5 | 舒适阅读行高 |

### 3.5 字间距

- 无特殊 letter-spacing 设置，依赖字体天然间距
- Caveat 手写体自带不规则间距感，无需额外调整

---

## 4. 边框 / 圆角 / 阴影体系

### 4.1 边框

| 类型 | 规格 | 用途 | 特征 |
|------|------|------|------|
| 虚线装饰边框 | `2px dashed` | hero / featured card / subscribe / trend section | 模拟手画虚线框 |
| 实线边框 | `2px solid` | 输入框 / 按钮 / 涂鸦线条定义 | 模拟铅笔实线 |
| 薄实线 | `1.5px solid` | 普通卡片边框 | 细铅笔线 |
| 左侧色条 | `3px solid` | digest-item 左边框 | 模拟笔记本侧边标记 |
| 边框透明度 | `opacity: 0.15~0.5` | 所有装饰边框 | 低透明度模拟铅笔痕迹淡印 |
| 方格纸底纹 | `rgba(0,0,0,0.02)` 29px 网格 | body::before | 极浅方格线 |

**边框颜色映射：**

| 区块 | 边框颜色 | 透明度 |
|------|----------|--------|
| Hero | `--pencil` | 0.15 |
| 普通卡片 (默认) | `--pencil` | 0.2 |
| 普通卡片 (hover) | `--scribble-blue` | 0.5 |
| Featured card | `--scribble-red` | 0.3 |
| Daily digest | `--pencil` | 0.15 |
| Trend section | `--scribble-blue` | 0.15 |
| Subscribe | `--scribble-red` | 0.2 |

### 4.2 圆角

| 数值 | 用途 | 设计意图 |
|------|------|----------|
| 20px | 标签 pill (`tag`) | 模拟手画圆角 pill，随意圆润 |
| 4px | Hero / 按钮主体 | 极小圆角，近乎方形但微微柔和 |
| 2px | 卡片 / 输入框 / 大部分装饰 | 几乎无圆角，模拟笔记本边角 |
| 1px | 手写下划线 (`sketch-underline`) | 极微圆角，模拟荧光笔笔触 |
| 0px | digest-item (无圆角) | 纯矩形，模拟笔记本条目 |

**圆角设计哲学：** 整体极小圆角（2px为主），拒绝现代 UI 的圆润感，保持笔记本纸张的方正质感。仅标签用 20px pill 圆角形成对比。

### 4.3 阴影

| 场景 | 阴影 | 说明 |
|------|------|------|
| 全局 | **无 box-shadow** | Human Scribble 不使用任何 CSS 阴影 |
| 替代方案 | 边框 + 透明度 + 背景色变化 | 用铅笔线边框和背景色层级代替阴影的层次感 |
| hover 层次 | 背景从 `--paper` → `--cream` | 用背景色变深模拟"浮起"效果 |

**设计哲学：** 笔记本纸上没有阴影，只有铅笔痕迹和荧光笔色彩。阴影被完全排除。

---

## 5. 装饰元素 / 交互细节

### 5.1 装饰元素清单

| 元素 | 实现方式 | 旋转角度 | 用途 |
|------|----------|----------|------|
| Logo 下划线 | `::after` 红色 bar | -1deg | Logo 底部手绘红线 |
| 手写笔记标注 | `.hand-note` 文字 | +3deg | Hero 右上角手写批注 |
| 荧光笔下划线 | `.underline-sketch` 黄色 bar | -1deg | 标题下方荧光笔划线 |
| 星号涂鸦 | `.doodle-star` 文字 ★ | +15deg | 标题右上角小星标记 |
| 涂鸦编号 | `.doodle-number` 大号数字 | -8deg | 卡片右上角序号 |
| 角落涂鸦 | `.corner-doodle` emoji | +12deg | Featured card 右下角 emoji |
| Section 手绘线 | `.scribble-line` 绿色 bar | -2deg | Section 标题下方手绘线 |
| "important!" 标签 | `::after` 文字 | -4deg | Featured card 左上角标注 |
| 荧光笔备注 | `.sketch-note` 文字 | +5deg | Subscribe 右上角批注 |
| 方格纸底纹 | `body::before` 网格 | 0deg | 全局背景纹理 |

**旋转角度分布：**

| 角度 | 使用场景 | 设计意图 |
|------|----------|----------|
| -1deg | Logo 下划线、荧光笔下划线 | 极微倾斜，模拟手写时自然歪斜 |
| -2deg | Section 手绘线、按钮 hover、标签 hover | 微倾斜，手写标记感 |
| -4deg | "important!" 标签 | 略明显倾斜，强调随性 |
| -8deg | 涂鸦编号 | 明显倾斜，模拟随手写的数字 |
| +3deg | 手写笔记标注 | 反向微倾斜 |
| +5deg | Subscribe 备注 | 反向微倾斜 |
| +12deg | 角落 emoji | 较大角度，涂鸦感 |
| +15deg | 星号标记 | 最大角度，随手画的星 |

### 5.2 荧光笔效果

| 类别 | CSS | 色值 | 用途 |
|------|-----|------|------|
| 黄荧光 | `background` + `padding: 2px 4px` + `border-radius: 2px` | `rgba(255,220,0,0.25)` | 文字高亮（.highlight / .sketch-underline） |
| 绿荧光 | 同上 | `rgba(0,220,100,0.15)` | 可扩展使用 |
| 粉荧光 | 同上 | `rgba(255,100,150,0.15)` | 可扩展使用 |

**荧光笔公式：** `background: rgba(荧光色, 0.15~0.25); padding: 2px 4px; border-radius: 1~2px;`

### 5.3 分类颜色映射

| 分类 | 涂鸦色 | 浅背景 | 下划线色 | 边框色(digest) |
|------|--------|--------|----------|----------------|
| LLM (大模型) | `--scribble-purple` | rgba(142,68,173,0.08) | purple opacity:0.4 | — |
| 视觉AI | `--scribble-red` | rgba(231,76,60,0.08) | red opacity:0.4 | — |
| 芯片 | `--scribble-blue` | rgba(52,152,219,0.08) | blue opacity:0.4 | — |
| 伦理 | `--scribble-orange` | rgba(243,156,18,0.08) | orange opacity:0.4 | — |
| 创业 | `--scribble-green` | rgba(39,174,96,0.08) | green opacity:0.4 | — |
| 机器人 | `--ink` | — | ink opacity:0.4 | — |

### 5.4 交互状态

| 元素 | 默认状态 | Hover 状态 |
|------|----------|------------|
| 导航链接 | 蓝色下划线 opacity:0 | 下划线 opacity:1, height:3px, 文字变蓝 |
| 标签 | 静态 | `rotate(-2deg) scale(1.05)` |
| 普通卡片 | `--paper` 背景 | `--cream` 背景 + `rotate(-1deg) translateY(-4px)` + 边框变蓝 |
| Digest 条目 | 白色半透明背景 | 黄荧光背景 + `translateX(4px)` |
| 按钮 | `--scribble-blue` 背景 | `--ink` 背景 + `rotate(-2deg)` |
| Footer 链接 | `--ink` 色 | `--scribble-blue` 色 + `rotate(-2deg)` |
| 输入框 | 实线边框 | 虚线边框 + 蓝色边框色 |

---

## 6. 示例布局/间距观察（非固定方案）

> 以下布局内容仅用于解释示例 HTML 如何展示该风格，不是后续项目必须采用的页面结构。真实项目应重新做信息架构和布局设计。

### 6.1 容器与网格

| 参数 | 值 | 说明 |
|------|------|------|
| 最大宽度 | 900px | 模拟笔记本宽度，不过宽 |
| 容器 padding | 20px 32px | 上下 20px，左右 32px |
| 新闻网格 | `grid-template-columns: repeat(auto-fill, minmax(260px, 1fr))` | 自适应填充，最小 260px |
| Featured card | `grid-column: span 2` | 跨两列突出显示 |

### 6.2 间距层级

| 层级 | 值 | 用途 |
|------|------|------|
| XXL | 40px | Hero padding |
| XL | 32px | Subscribe padding |
| LG | 24px | Section/Digest/Trend padding、margin-bottom |
| MD | 20px | Card padding、Section margin-bottom |
| SM | 16px | Nav padding/margin、Nav gap(→4px响应式)、Digest margin-bottom |
| XS | 12px | Digest-item padding/gap、Trend-bar gap、Subscribe-form gap |
| XXS | 8px | Tag-row gap、Card margin-bottom(标题→描述)、Digest-list gap(→10px) |
| Micro | 6px | Nav-links gap |
| Nano | 4px | Tag padding(4px 14px)、Nav link padding(4px 12px) |

### 6.3 内边距规格

| 元素 | Padding | 说明 |
|------|---------|------|
| Hero | 40px | 大面积留白，模拟笔记本页面 |
| Card | 20px | 中等内边距 |
| Featured card | 24px | 略大于普通卡片 |
| Digest | 24px | 笔记条目内边距 |
| Tag | 4px 14px | 横向宽松 pill |
| Nav link | 4px 12px | 紧凑点击区域 |
| Input | 8px 16px | 手写输入框 |
| Button | 8px 20px | 略宽按钮 |

---

## 7. 响应式策略

### 7.1 断点

| 断点 | 值 | 说明 |
|------|------|------|
| 移动端 | ≤768px | 单断点策略 |

### 7.2 移动端适配规则

| 元素 | 桌面 | 移动端 | 变化 |
|------|------|--------|------|
| Hero headline | 38px | 28px | 缩小 10px |
| Featured card | span 2 | span 1 | 退回单列 |
| Nav links gap | 6px | 4px | 更紧凑 |
| Subscribe form | flex row | flex column | 纵向排列 |
| Grid columns | auto-fill minmax(260px) | 自动降为单列 | CSS Grid 自适应 |

### 7.3 响应式哲学

- **最小干预**：仅调整字号、网格跨度、排列方向，不改变风格本质
- **Grid 自适应优先**：利用 `auto-fill + minmax` 让网格自然降级，而非手写多断点
- **手写感不减**：移动端保留所有涂鸦装饰、旋转角度、手写字体

---

## 8. 组件速查表

| 组件 | 类名 | 字体 | 字号 | 背景 | 边框 | 圆角 | 特殊 |
|------|------|------|------|------|------|------|------|
| Logo | `.logo` | Permanent Marker | 26px | — | — | — | `::after` 红线 -1deg |
| 导航链接 | `.nav-links a` | Caveat | 18px | — | — | — | hover 下划线 3px |
| Hero 区 | `.hero` | — | — | `--paper` | 2px dashed pencil (0.15) | 4px | 手写批注 +3deg |
| Hero 标题 | `.headline` | Permanent Marker | 38px | — | — | — | 荧光下划线 -1deg |
| 副标题 | `.subtitle` | Inter | 16px | — | — | — | 荧光高亮词 |
| 标签 | `.tag` | Caveat | 16px | 涂鸦色 0.08 | 2px solid 涂鸦色 | 20px | hover rotate -2deg |
| Section 标题 | `.section-header h2` | Permanent Marker | 22px | — | — | — | 手绘线 -2deg |
| 普通卡片 | `.card` | — | — | `--paper` | 1.5px solid pencil (0.2) | 2px | hover rotate -1deg |
| Featured 卡片 | `.featured-card` | Caveat | 22px(标题) | `--cream` | 2px dashed red (0.3) | — | "important!" 标签 -4deg |
| 卡片标题 | `.card h3` | Inter | 15px | — | — | — | 荧光笔关键词 |
| 卡片正文 | `.card p` | Inter | 13px | — | — | — | — |
| 卡片 Meta | `.card-meta` | Caveat | 14px | — | — | — | 热门标记红 |
| 涂鸦编号 | `.doodle-number` | Caveat | 28px | — | — | — | rotate -8deg |
| 分类标记 | `.category-scribble` | Caveat | 14px | — | — | — | `::after` 涂鸦色下划线 |
| Daily Digest | `.daily-digest` | — | — | `--paper` | 2px solid pencil (0.15) | 2px | — |
| Digest 条目 | `.digest-item` | — | — | rgba(255,255,255,0.5) | left 3px solid 涂鸦色 | 0 | hover 黄荧光 + translateX |
| Digest 时间 | `.di-time` | Caveat | 16px | — | — | — | 蓝色 |
| Trend 区块 | `.trend-section` | — | — | `--paper` | 1.5px dashed blue (0.15) | — | — |
| Trend 进度条 | `.ts-track` | — | — | rgba(0,0,0,0.04) | 1px solid rgba(0,0,0,0.08) | 2px | — |
| Trend 填充 | `.ts-fill` | — | — | 涂鸦色 (0.6) | — | 2px | — |
| Subscribe 区 | `.subscribe-section` | — | — | `--cream` | 2px dashed red (0.2) | — | 手写批注 +5deg |
| 输入框 | `input` | Caveat | 18px | `--paper` | 2px solid pencil | 2px | focus 变虚线蓝色 |
| 按钮 | `button` | Permanent Marker | 16px | `--scribble-blue` | 2px solid ink | 2px | hover rotate -2deg |
| Footer 链接 | `.f-links a` | Caveat | 16px | — | — | — | hover rotate -2deg |

---

## 9. CSS 变量 / 代码片段

### 9.1 完整 CSS 变量定义

```css
:root {
  --bg: #FFF8F0;
  --paper: #FFFDF7;
  --cream: #F5ECD7;
  --pencil: #2B2B2B;
  --pencil-light: #666;
  --ink: #1A3A5C;
  --ink-light: #4A7A9C;
  --highlight-yellow: rgba(255,220,0,0.25);
  --highlight-green: rgba(0,220,100,0.15);
  --highlight-pink: rgba(255,100,150,0.15);
  --scribble-red: #E74C3C;
  --scribble-blue: #3498DB;
  --scribble-green: #27AE60;
  --scribble-orange: #F39C12;
  --scribble-purple: #8E44AD;
  --doodle-line: 2px solid var(--pencil);
  --transition: 0.3s ease;
}
```

### 9.2 方格纸底纹代码

```css
body::before {
  content: '';
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background:
    repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(0,0,0,0.02) 28px, rgba(0,0,0,0.02) 29px),
    repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(0,0,0,0.02) 28px, rgba(0,0,0,0.02) 29px);
  pointer-events: none;
  z-index: 0;
}
```

### 9.3 荧光笔高亮代码

```css
.highlight {
  background: var(--highlight-yellow);
  padding: 2px 4px;
  border-radius: 2px;
}
```

### 9.4 涂鸦装饰边框代码（通用模式）

```css
/* 装饰性虚线边框 —— 用于各区块 ::before */
.element::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  border: 2px dashed var(--scribble-color);
  opacity: 0.15~0.3;
  pointer-events: none;
}
```

### 9.5 手绘下划线代码

```css
/* Logo 下划线 */
.logo::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: -4px; right: -4px;
  height: 3px;
  background: var(--scribble-red);
  border-radius: 2px;
  transform: rotate(-1deg);
}
```

### 9.6 卡片 hover 动效代码

```css
.card:hover {
  transform: rotate(-1deg) translateY(-4px);
  background: var(--cream);
}
.card:hover::before {
  border-color: var(--scribble-blue);
  opacity: 0.5;
}
```

### 9.7 标签组件代码

```css
.tag {
  font-family: 'Caveat', cursive;
  font-size: 16px;
  font-weight: 600;
  padding: 4px 14px;
  border: 2px solid;
  border-radius: 20px;
  cursor: pointer;
  transition: var(--transition);
}
.tag:hover {
  transform: rotate(-2deg) scale(1.05);
}
.tag.tag-red {
  border-color: var(--scribble-red);
  color: var(--scribble-red);
  background: rgba(231,76,60,0.08);
}
```

### 9.8 Digest 条目代码

```css
.digest-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: rgba(255,255,255,0.5);
  border-left: 3px solid;
  transition: var(--transition);
  cursor: pointer;
}
.digest-item:hover {
  background: var(--highlight-yellow);
  transform: translateX(4px);
}
```

---

## 10. 适用 / 不适用场景

### 10.1 适用场景

| 场景 | 说明 |
|------|------|
| 个人博客 / 日记型网站 | 手写质感天然契合个人表达 |
| 教育类产品 | 笔记本隐喻帮助学生代入学习场景 |
| 资讯聚合站 | "手抄新闻"的温暖感区别于冷冰冰的聚合器 |
| 创意工具 / 设计社区 | 涂鸦风格天然契合创意人群 |
| 内部工具 / 团队 wiki | "写在笔记本上"降低正式感，鼓励随意记录 |
| 读书笔记 / 知识管理 | 荧光笔标注直接映射真实读书笔记行为 |
| 儿童 / 学生产品 | 手写涂鸦天然亲切 |

### 10.2 不适用场景

| 场景 | 说明 |
|------|------|
| 金融 / 银行界面 | 需要严谨专业感，手写风格传达"不正式" |
| 医疗 / 严肃数据仪表盘 | 精确数据展示需要清晰无干扰的排版 |
| 法律 / 合同类界面 | 需要权威感，涂鸦风格削弱可信度 |
| 大型企业管理后台 | 需要统一规范感，手写风格过于随意 |
| 电商结算流程 | 信任感关键环节不能有"随手写"的感觉 |
| 紧急通知 / 警告系统 | 需要即时清晰可读，手写字体降低辨识速度 |

---

## 11. 与其他风格对比

| 维度 | Human Scribble | Classic News | Card Grid | Feed Layout |
|------|----------------|-------------|-----------|-------------|
| **核心隐喻** | 笔记本 + 手写 | 报纸排版 | 卡片集合 | 社交信息流 |
| **字体** | Caveat + Permanent Marker | 传统衬线 | 系统 UI 字体 | 系统 UI 字体 |
| **背景** | 方格纸纹 | 白/浅灰 | 白/浅灰 | 白 |
| **圆角** | 极小 (2px) | 无 | 中等 (8-12px) | 中等 |
| **阴影** | 无 | 无 | 有 | 有 |
| **装饰** | 旋转/荧光笔/涂鸦 | 无 | 无 | 无 |
| **色彩** | 5色铅笔+荧光笔 | 品牌色 | 品牌色 | 品牌色 |
| **交互** | rotate + translateX | 传统 hover | scale + shadow | 传统 hover |

| 维度 | Human Scribble | Bento Grid | Glassmorphism | Aurora Gradient |
|------|----------------|-------------|---------------|-----------------|
| **核心隐喻** | 笔记本 | 日式便当盒 | 毛玻璃 | 极光/渐变流 |
| **字体** | 手写体 | 现代 UI | 现代 UI | 现代 UI |
| **层次感** | 边框+背景色 | 网格分割 | blur+透明 | 渐变叠加 |
| **装饰** | 手绘标记 | 无 | 光晕 | 流动渐变 |
| **温度** | 暖/手工 | 冷/秩序 | 冷/科技 | 冷/梦幻 |

| 维度 | Human Scribble | Neo-Brutalism | Retro Y2K | Terminal Hacker |
|------|----------------|---------------|-----------|-----------------|
| **核心隐喻** | 笔记本 | 粗犷宣言 | 2000年代 | 命令行终端 |
| **边框** | 虚线铅笔 | 3px粗黑实线 | 彩色粗边框 | 无/绿色字符 |
| **字体** | 手写体 | 粗衬线/无衬线 | 像素/科技 | Monospace |
| **色彩** | 暖色系 | 黑白+1亮色 | 霓虹+银 | 黑底绿字 |
| **态度** | 温暖随意 | 粗犷叛逆 | 复古潮流 | 冷酷极简 |

| 维度 | Human Scribble | Swiss Editorial | Claymorphism | Cute-alism |
|------|----------------|-----------------|--------------|------------|
| **核心隐喻** | 笔记本 | 瑞士设计 | 软黏土 | 卡可爱 |
| **排版** | 随性手写 | 精确网格 | 软圆 | 超圆+卡通 |
| **圆角** | 2px | 0px | 16-24px | 20-999px |
| **阴影** | 无 | 无 | 内外双阴影 | 软阴影 |
| **色彩** | 铅笔色系 | 极简黑白红 | 柔和色 | 粉嫩色系 |
| **态度** | 手写温暖 | 理性严谨 | 轻软萌 | 超可爱 |

| 维度 | Human Scribble | Resonant Stark | Light Skeuomorphism |
|------|----------------|----------------|---------------------|
| **核心隐喻** | 笔记本 | 精致极简 | 轻拟物 |
| **层次感** | 边框+背景 | 微妙对比 | 微阴影+纹理 |
| **装饰** | 手绘标记 | 极少 | 微拟物细节 |
| **字体** | 手写体 | 精选衬线 | 系统字体 |
| **温度** | 暖 | 冷→暖 | 中性 |
| **独特性** | 手写旋转 | 微妙高级 | 逼真细节 |

**核心差异总结：** Human Scribble 是唯一以"手写 + 笔记本"为隐喻的风格，其旋转角度、荧光笔效果、方格纸底纹、虚线边框在 14 种风格中独一无二。与 Claymorphism/Cute-alism 同属"温暖路线"但手段不同（手写 vs 软圆），与 Neo-Brutalism 同属"反精致"但情绪相反（温暖 vs 粗犷）。

---

## 12. 变体建议

### 12.1 色调变体

| 变体 | 背景 | 涂鸦色调整 | 适用 |
|------|------|------------|------|
| 暖黄笔记本 | `--bg: #FFF8F0` → `#FFF3E0` (更暖) | 涂鸦色不变 | 教育/儿童 |
| 冷蓝笔记本 | `--bg: #F0F4F8` (冷灰蓝) | 涂鸦色改冷色调 | 代码笔记/开发者 |
| 黑板变体 | `--bg: #2C3E50` (深色) | 涂鸦色改粉笔白/黄 | 教学演示/夜间 |
| 牛皮纸变体 | `--bg: #D4C5A9` (牛皮纸色) | 涂鸦色加深 | 手工艺/复古 |

### 12.2 密度变体

| 变体 | 间距调整 | 说明 |
|------|----------|------|
| 紧凑版 | padding 减半、gap 减半 | 适合信息密度高的工具 |
| 宽松版 | padding 翻倍、增加留白 | 适合阅读型/日记型产品 |

### 12.3 字体变体

| 变体 | Caveat 替代 | Permanent Marker 替代 | 适用 |
|------|-------------|----------------------|------|
| 中文手写 | 需替换为中手写体(如站酷庆科黄油体) | 需替换为中文马克笔风格字体 | 中文产品 |
| 日文手写 | 替换为日文手写体 | 替换为日文毛笔体 | 日文产品 |
| 代码笔记 | Caveat 保留 | 替换为手写 monospace | 开发者笔记 |

### 12.4 装饰强度变体

| 变体 | 旋转角度 | 荧光笔 | 虚线边框 | 说明 |
|------|----------|--------|----------|------|
| 纯净版 | 0deg（无旋转） | 仅黄色 | 仅卡片边框 | 降低"乱涂"感，保留笔记本底纹 |
| 加涂版 | 角度翻倍 | 三色全用 | 所有区块 | 强化涂鸦感，适合创意社区 |

---

## 13. 动效 / 微交互

### 13.1 过渡基础

| 参数 | 值 | 说明 |
|------|------|------|
| 过渡时长 | 0.3s | 统一时长，不快不慢 |
| 过渡曲线 | ease | 自然减速，模拟手写动作的惯性 |

### 13.2 Hover 微交互清单

| 元素 | 动效 | 组合 | 感觉 |
|------|------|------|------|
| 导航链接 | 下划线出现 | opacity 0→1 + height 2→3px | 笔尖划过纸面 |
| 标签 | 倾斜放大 | `rotate(-2deg) scale(1.05)` | 随手贴上去的标签 |
| 普通卡片 | 倾斜浮起 | `rotate(-1deg) translateY(-4px)` + 背景变色 + 边框变色 | 翻起一张纸 |
| Digest 条目 | 右移高亮 | `translateX(4px)` + 黄荧光背景 | 手指指向这一行 |
| 按钮 | 倾斜变色 | `rotate(-2deg)` + 背景变深墨水色 | 按下去的笔触 |
| Footer 链接 | 倾斜变色 | `rotate(-2deg)` + 颜色变蓝 | 随手圈出 |
| 输入框 | 边框风格变 | solid → dashed + 颜色变蓝 | 从铅笔线变钢笔线 |

### 13.3 动效设计哲学

| 原则 | 说明 |
|------|------|
| **旋转即手写** | 所有 hover 都包含微小旋转，模拟手写时"写歪了"的自然感 |
| **移动即翻页** | translateY / translateX 模拟翻纸/指纸的物理动作 |
| **变色即换笔** | 背景从浅到深模拟换了支笔/换了荧光笔 |
| **实线变虚线** | 输入框 focus 从实线变虚线，模拟从铅笔切换到钢笔 |
| **无弹性动画** | 不用 bounce/elastic，手写动作没有弹跳 |
| **统一 0.3s** | 所有过渡统一时长，保持节奏一致性 |

### 13.4 建议扩展动效

| 动效 | 实现 | 触发 | 说明 |
|------|------|------|------|
| 荧光笔划过 | `@keyframes` width 0→100% + opacity 渐入 | 页面加载 | 模拟荧光笔从左到右划过 |
| 涂鸦编号抖动 | `@keyframes` rotate -8deg ↔ -4deg | 首次可见 | 数字随手晃动一下 |
| 方格纸淡入 | opacity 0→1, 0.5s | 页面加载 | 纸张纹理徐徐显现 |
| 卡片翻转 | `@keyframes` rotateY 0→8→0 | 点击 | 模拟翻纸看背面 |

---

## 14. 实施指南 / 注意事项

### 14.1 字体加载

```
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Permanent+Marker&display=swap');
```

| 注意事项 | 说明 |
|----------|------|
| Caveat 需 4 个字重 | 400/500/600/700 全部加载，不可省略 |
| Permanent Marker 仅 400 | 该字体只有 regular 字重，不可请求其他 |
| Inter 可按需加载 | 仅用 400/500/600，700 在本页面未使用可省略 |
| Fallback 设置 | `cursive` / `sans-serif` 必须声明，防字体加载失败 |
| 中文回退 | 中文内容需额外添加中文手写字体回退，否则 Caveat 无法渲染中文 |

### 14.2 方格纸底纹关键参数

| 参数 | 值 | 注意 |
|------|------|------|
| 格子间距 | 28px | 不宜过小（<20px）或过大（>40px），28px 模拟 7mm 方格笔记本 |
| 线条粗度 | 1px (28→29px) | 极细，仅 1px 宽度 |
| 线条色 | `rgba(0,0,0,0.02)` | 必须极浅，过深会干扰阅读 |
| 双方向 | 0deg + 90deg | 水平+垂直双方向，形成方格而非横线 |
| pointer-events: none | 必须 | 底纹不可阻挡交互 |
| z-index: 0 | 必须 | 底纹在所有内容之下 |
| position: fixed | 必须 | 底纹不随滚动移动 |

### 14.3 装饰边框实现模式

所有区块的装饰边框使用 `::before` 伪元素实现，**绝不可直接在元素上设 border**：

```css
.element::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  border: 2px dashed var(--color);
  opacity: 0.15;
  pointer-events: none;
}
```

**原因：** 伪元素方式允许 border 和元素内容的 padding 独立控制，且 hover 时可单独改变边框样式不影响内容。

### 14.4 旋转角度使用规范

| 规范 | 说明 |
|------|------|
| 角度范围 | -8deg ~ +15deg，绝不超过 15deg |
| 负角优先 | 大多数旋转用负角（-1 ~ -8deg），模拟"写歪向左" |
| 正角用于标注 | 手写批注/备注用正角（+3 ~ +5deg），与主体形成方向对比 |
| hover 旋转固定 | hover rotate 固定用 -2deg，不可随意更改 |
| 绝不 rotate 大角度 | 超过 15deg 破坏"微微歪斜"的随性感，变成刻意 |

### 14.5 荧光笔效果规范

| 规范 | 说明 |
|------|------|
| 仅用于关键词 | 荧光笔只划个别词/短语，绝不可整段使用 |
| padding 统一 | `2px 4px`（上下 2px，左右 4px） |
| border-radius 统一 | 1~2px，极微圆角 |
| 黄色为主色 | `--highlight-yellow` 是主要荧光笔色，绿/粉为辅助 |
| 透明度不可调高 | 黄色 0.25、绿/粉 0.15 是上限，过高会遮盖文字 |

### 14.6 不可违反的原则

| # | 原则 | 违反后果 |
|---|------|----------|
| 1 | **绝不使用 box-shadow** | 阴影破坏笔记本纸张的扁平感 |
| 2 | **绝不使用大圆角 (>8px) 于卡片/区块** | 大圆角变成现代 UI，失去纸张方正感 |
| 3 | **绝不使用渐变背景于区块** | 渐变变成 Glassmorphism/Aurora，失去纸张质感 |
| 4 | **涂鸦色绝不大面积填充** | 大面积涂鸦色变成 Neo-Brutalism，失去"铅笔标记"感 |
| 5 | **旋转角度绝不超 15deg** | 大角度变成"乱飞"，失去"微微歪斜"的自然感 |
| 6 | **手写字体绝不用于长段落正文** | Caveat 长段可读性差，正文必须用 Inter |
| 7 | **方格纸纹透明度绝不超 0.03** | 过深格子线干扰阅读 |

### 14.7 性能注意事项

| 项目 | 建议 |
|------|------|
| 方格纸纹 | 用 `repeating-linear-gradient` 而非 SVG/图片，GPU 渲染高效 |
| 字体加载 | 3 个字体跨域加载，建议加 `font-display: swap` 防 FOIT |
| 伪元素 | 每区块 1 个 `::before` 装饰边框，总计约 6 个，性能无负担 |
| hover transform | `rotate + translateY/translateX` 仅 2 属性，触发 GPU 合成层 |
| 网格布局 | `auto-fill + minmax` 比 JS 计算列数更高效 |

### 14.8 可访问性注意事项

| 项目 | 建议 |
|------|------|
| 颜色对比度 | `--pencil (#2B2B2B)` on `--bg (#FFF8F0)` 对比度约 13:1 ✓；`--pencil-light (#666)` on `--paper (#FFFDF7)` 约 5.2:1 ✓ |
| 荧光笔文字 | 荧光笔背景不影响文字对比度，文字色保持 `--pencil` |
| 手写字体可读性 | Caveat 用于短标签/注释可读性好，长文本切换 Inter |
| 旋转角度 | 微旋转(≤8deg)不影响阅读方向，但大旋转需 `aria` 标注 |
| 键盘导航 | 所有交互元素需确保 focus-visible 状态（当前未定义，需补充） |
| focus 样式 | 建议添加 `:focus-visible` 样式：蓝色虚线边框模拟钢笔圈出 |

---

*文档生成日期：2026-05-18*
*源文件：version-o-scribble.html*
*风格名称：Human Scribble*