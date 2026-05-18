# Retro Y2K 设计系统手册

> 来源：`version-h-y2k.html` — AI Pulse 千禧年复古版本

---

## 重要使用原则

本文件提供的是视觉风格提示，不是固定页面布局方案。示例 HTML 的页面结构仅用于统一展示和截图，不应在真实项目中照搬。后续开发时，应根据用户需求、业务流程、内容优先级和设备场景重新设计页面布局；可复用的是配色、字体、圆角、边框、阴影、质感、状态和动效等视觉语言。

---

## 一、风格定义

**Retro Y2K（千禧年复古）** 是 2023-2026 年在 Awwwards / Dribbble / Figma 社区爆火的设计风格，灵感来自 1990年代末-2000年代初的互联网美学。核心理念：

- **科技怀旧**：致敬早期互联网的"数字前沿"感——网格线、扫描线、霓虹发光、等宽字体
- **霓虹三色**：Cyan（青）+ Magenta（品红）+ Lime（荧光绿）构成 Y2K 核心色盘，这三个颜色是千禧年 UI 的"DNA"
- **方角边框**：所有容器和交互元素近乎零圆角（0-4px），像早期 Windows 窗口
- **等宽字体**：标签、元信息、按钮一律 monospace，正文用几何感字体，形成"代码+内容"双重节奏
- **发光悬停**：悬停时 `box-shadow: 0 0 8px X, 0 0 20px rgba(X,0.3)` 霓虹发光，像 CRT 屏幕上的按钮
- **扫描线动画**：导航底部和 Hero 顶部有渐变色扫描线，模拟 CRT 显示器扫描信号

---

## 二、色彩体系

### 2.1 调色板

| 角色 | CSS 变量 | 值 | 用途 |
|---|---|---|---|
| 页面背景 | `--bg` | `#e0e7ff` | Indigo-100，极浅靛蓝，科技感底色 |
| 辅助背景 | `--bg2` | `#c7d2fe` | Indigo-200，订阅区背景 |
| 卡片背景 | `--card` | `#ffffff` | 纯白，所有内容容器 |
| 主文字 | `--text` | `#312e81` | Indigo-900，深靛蓝黑 |
| 辅助文字 | `--text2` | `#4338ca` | Indigo-700 |
| 弱化文字 | `--text3` | `#6366f1` | Indigo-500，标签和元信息 |
| 霓虹青 | `--cyan` | `#06b6d4` | Cyan-500，悬停发光、筛选激活、排名框 |
| 霓虹品红 | `--magenta` | `#ec4899` | Pink-500，突发标签、导航激活、侧栏悬停发光 |
| 霓虹绿 | `--lime` | `#84cc16` | Lime-500，LIVE 指示灯、新鲜标签、订阅按钮、区块标记 |
| 霓虹橙 | `--orange` | `#fb923c` | Orange-400，政策标签 |
| 边框 | `--border` | `#312e81` | 与主文字同色，深靛蓝 |

### 2.2 色彩使用规则

1. **Y2K 三色是灵魂**：cyan / magenta / lime 构成视觉标识。任何 Y2K 页面必须至少使用这三色中的一个作为功能性强调色
2. **边框与文字同色**：所有边框 `#312e81`（Indigo-900），与主文字一致，而非独立灰线
3. **标签用霓虹色填充**：分类标签直接用 cyan / magenta / lime / orange 填充 + 黑/白字 + 深靛蓝边框
4. **深靛蓝底色**：`#e0e7ff` 是 Indigo-100，不是暖黄也不是纯白。它让 cyan/magenta/lime 的发光效果更突出
5. **标签文字一律黑色或白色**：cyan 和 lime 底色配黑字（这些色够亮），magenta 底色配白字（品红较暗）

### 2.3 调色板推导公式

如果要换主题方向，遵循这个公式：

| 角色 | 推导规则 |
|---|---|
| 页面背景 | 取 Y2K 主色系的 Tailwind ×100（如 Cyan-100 `#ecfeff`，Pink-100 `#fce7f3`） |
| 边框/主文字 | 取同一色系的 ×900（如 Cyan-900 `#164e63`，Pink-900 `#831843`） |
| 霓虹三色 | 固定 cyan-500 / pink-500 / lime-500，这是 Y2K 的"基因"，不替换 |
| 卡片 | 永远 `#ffffff` |
| 辅助文字 | 取 ×700 和 ×500 |

---

## 三、排版体系

### 3.1 字体

| 属性 | 值 | 说明 |
|---|---|---|
| 主字体 | `Chakra Petch` | 泰国设计师做的几何感字体，有"科技+东南亚"混合气质，非常 Y2K |
| 标签/元信息字体 | `monospace` | 系统等宽字体，用于所有标签、按钮、元信息、Footer |
| 字重档位 | 400 / 500 / 600 / 700 | 600 和 700 是主力 |

**字体选择原则**：Chakra Petch / Orbitron / Exo 2 / Rajdhani / Share Tech Mono 都适合 Y2K。关键是几何感 + 轻微"未来主义"。避免 Inter/Roboto（太现代），避免衬线字体（太传统）。

### 3.2 双字体节奏

Y2K 的标志性排版是**两种字体共存**：

- **正文标题/描述** → 用主字体（Chakra Petch），560/700 字重
- **标签/按钮/元信息/时间/计数** → 用 monospace，600/700 字重

这种"内容字体 + 数据字体"的双节奏是 Y2K 网页的 DNA，来自早期互联网"内容是内容、数据是数据"的分离思维。

### 3.3 字号层级

| 元素 | 字号 | 字重 | 字间距 | 字体 | 行高 |
|---|---|---|---|---|---|
| Hero 标题 | `26px` | 700 | `0.02em` | 主字体 | `1.25` |
| 区块标题 | `18px` | 700 | `0.05em` | monospace | — |
| 导航标题 | `16px` | 700 | `0.05em` | 主字体 | — |
| 侧栏标题 | `14px` | 700 | — | 主字体 | `1.35` |
| 新闻卡片标题 | `14px` | 700 | — | 主字体 | `1.3` |
| Hero 描述 | `14px` | 400 | — | 主字体 | `1.6` |
| 导航链接 | `12px` | 600 | — | monospace | — |
| 热门条目 | `13px` | 600 | — | 主字体 | — |
| 订阅标题 | `14px` | 700 | — | monospace | — |
| 标签 | `9-11px` | 700 | — | monospace | — |
| 卡片摘要 | `12px` | 400 | — | 主字体 | `1.5` |
| 元信息 | `10-12px` | 600 | — | monospace | — |
| Footer | `12px` | 600 | — | monospace | — |

**字间距规则**：
- 区块标题 `0.05em`（像命令行标题 `LATEST_NEWS`）
- Hero 标题 `0.02em`（稍微宽松，不是密排）
- 其他正文 0

---

## 四、边框与圆角体系

### 4.1 边框宽度

所有边框统一 `2px`，不分层级。这是 Y2K 的特征——早期 Windows 窗口式的等宽边框。

**与 Neo-Brutalism 的区别**：Brutalism 有 4/3/2 三级边框，Y2K 是均匀的 2px。

### 4.2 圆角规则

| 元素类型 | `border-radius` | 说明 |
|---|---|---|
| 大容器 | `4px`（`--radius2`） | Hero 卡、侧栏卡、新闻卡、热门条目、订阅区 |
| 交互元素 | `4px` | 导航链接、标签、筛选按钮、Logo、排名框 |
| 全局默认 | `0`（`--radius`） | 未使用，声明为0以强调"方角是默认" |

**原则**：Y2K 只用 `0` 或 `4px`。绝不使用 `8px` / `12px` / `16px` / `20px`。4px 是"极微圆角"，几乎方形但不是纯方形——像早期 Windows XP 窗口按钮。

---

## 五、阴影体系（霓虹发光）

Y2K 不用传统阴影（柔和投影），用**霓虹发光（Neon Glow）**代替。

### 5.1 发光分级

| 级别 | CSS 变量 | 值 | 用途 |
|---|---|---|---|
| 青色发光 | `--glow-cyan` | `0 0 8px #06b6d4, 0 0 20px rgba(6,182,212,0.3)` | Hero 主卡悬停、新闻卡悬停、筛选按钮激活 |
| 品红发光 | `--glow-magenta` | `0 0 8px #ec4899, 0 0 20px rgba(236,72,153,0.3)` | 侧栏卡悬停、热门条目悬停 |

### 5.2 发光使用规则

1. **双层结构**：内层 `0 0 8px` 紧贴元素（高亮核心），外层 `0 0 20px rgba(X,0.3)` 扩散（氛围光晕）
2. **按交互类型分配颜色**：主要内容区域用 cyan 发光，侧栏/热门用 magenta 发光，形成"主区青/副区粉"的分区逻辑
3. **默认无阴影**：未悬停时元素只有边框，无 `box-shadow`。发光只出现在悬停态
4. **悬停附加 translateY(-2px)**：新闻卡悬停时向上浮动 2px，配合发光效果

### 5.3 悬停交互公式

```css
.card {
  border: 2px solid var(--border);
  border-radius: 4px;
  transition: all 0.2s;
}
.card:hover {
  box-shadow: 0 0 8px var(--cyan), 0 0 20px rgba(6,182,212,0.3);
  /* 可选：transform: translateY(-2px); */
}
```

---

## 六、动画与装饰元素

### 6.1 扫描线动画（Scanline）

Y2K 的标志性动画，模拟 CRT 显示器扫描信号：

```css
.scanline-bar {
  height: 2-3px;
  background: linear-gradient(90deg, var(--cyan), var(--magenta), var(--lime), var(--cyan));
  animation: scanline 8s linear infinite;
  background-size: 200% 100%;
}
@keyframes scanline {
  0% { background-position: 0%; }
  100% { background-position: -200%; }
}
```

**使用位置**：
- 导航底部（`::after`）：2px 高，cyan→magenta→lime→cyan 四色循环
- Hero 主卡顶部（`.scan-bar`）：3px 高，cyan→magenta 双色
- 订阅区顶部（`::before`）：3px 高，lime→cyan 双色

**参数规则**：
- 扫描线宽度：2-3px，绝不超过 4px
- 动画时长：8s（导航），其他位置可选 4-10s
- 渐变颜色：必须是 Y2K 三色中的 2-3 个色，不要用其他颜色
- `background-size: 200%`：让渐变位移产生"流动"效果

### 6.2 LIVE 指示灯

```css
.live-dot {
  width: 8px; height: 8px;
  background: var(--lime);  /* 必须是 lime 色 */
  border-radius: 50%;
  animation: blink 1s infinite;
}
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
```

**规则**：
- 颜色必须是 `--lime`（荧光绿），这是"系统在线"信号色
- 大小 8px，不大不小
- 闪烁周期 1s，比 Brutalism 的 2s 更快（Y2K 更"电子感")

### 6.3 网格背景

```css
body {
  background-image:
    linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px);
  background-size: 24px 24px;
}
```

**参数规则**：
- 颜色：cyan 的 4% 透明度，极微网格线
- 尺寸：`24px × 24px`，像早期 GUI 的网格底板
- 网格线宽：1px

### 6.4 标签符号

Y2K 标签喜欢用 ASCII 符号而非 emoji：

| 标签类型 | 文字 | 说明 |
|---|---|---|
| 突发新闻 | `▶ 突发` | 用播放符号 ▶ |
| 区块标记 | 方框字母 `N` `T` | 像文件浏览器图标 |
| 订阅区 | `[ SUBSCRIBE ]` | 方括号包裹，像命令行参数 |
| 状态指示 | `LIVE` + 绿点 | 像服务器状态面板 |
| Footer 版本号 | `AI_PULSE v2026.05` | 像软件版本号 |

---

## 七、示例布局观察（非固定方案）


> 以下布局内容仅用于解释示例 HTML 如何展示该风格，不是后续项目必须采用的页面结构。真实项目应重新做信息架构和布局设计。

### 7.1 全局容器

| 属性 | 值 |
|---|---|
| 最大宽度 | `1100px` |
| 内边距 | `32px` |
| 区块间距 | `32px` |

### 7.2 导航栏

| 属性 | 值 |
|---|---|
| 定位 | `sticky`，top 0 |
| 高度 | `52px` |
| 底边框 | `2px solid var(--border)` |
| 背景 | `#ffffff`（纯白） |
| 布局 | flex，space-between，三段：品牌 / 链接 / LIVE状态 |
| 链接间距 | `4px`（紧密排列） |

**注意**：导航链接间距只有 4px，这是 Y2K 的特征——链接像"按钮条"而非"导航菜单"。每个链接有独立的 1px 边框。

### 7.3 Hero 区域

| 属性 | 值 |
|---|---|
| 布局 | grid，`1.3fr 1fr` |
| 间距 | `20px` |

### 7.4 新闻网格

| 属性 | 值 |
|---|---|
| 布局 | grid，`repeat(3, 1fr)` |
| 间距 | `16px` |

---

## 八、间距体系

### 8.1 外边距节奏

| 值 | 用途 |
|---|---|
| `32px` | 主区域内边距、区块间距、Footer内边距 |
| `20px` | Hero 列间距、侧栏卡间距 |
| `16px` | 新闻网格间距、热门条目内部 gap |
| `14px` | 热门条目 gap |
| `12px` | Hero meta 间距 |
| `10px` | 品牌区 Logo-标题间距 |
| `8px` | 订阅输入框与按钮间距、LIVE指示灯间距 |
| `4px` | 导航链接间距、筛选按钮间距 |

### 8.2 内边距分级

| 级别 | 值 | 用途 |
|---|---|---|
| 大 | `32px` | Hero 主卡 |
| 中 | `20px` | 侧栏卡片、新闻卡片 |
| 行 | `12px 16px` | 热门条目 |

---

## 九、响应式断点

| 断点 | 变化 |
|---|---|
| `≤ 1024px` | Hero 双列→单列；新闻网格 3→2 列 |
| `≤ 768px` | 导航内边距 32→16；链接间距 4→4不变；LIVE状态隐藏；主区域 32→16；网格 2→1 列；订阅区竖排；Footer 竖排 |

---

## 十、组件清单与设计规则速查

| 组件 | 边框 | 圆角 | 默认阴影 | 悬停 | 特殊 |
|---|---|---|---|---|---|
| 导航栏 | 2px 底 | — | — | — | 底部扫描线动画 `::after` |
| Logo | 2px | 4px | — | — | cyan 填充 + 黑字 + monospace |
| 导航链接 | 1px | 4px | — | cyan 填充 | active=magenta 填充 + 白字 |
| LIVE 状态 | — | — | — | — | lime 圆点 + blink 动画 |
| Hero 主卡 | 2px | 4px | — | cyan 发光 | 顶部 scan-bar |
| 突发标签 | 1px | 4px | — | — | magenta 填充 + 白字 + `▶` 符号 |
| 侧栏卡 | 2px | 4px | — | magenta 发光 | 分类标签 cyan/lime/magenta 填充 |
| 区块标题标记 | 1px | 4px | — | — | lime 填充 + 黑字 + monospace 单字母 |
| 筛选按钮 | 1px | 4px | — | — | active=cyan 填充 + 黑字 |
| 新闻卡 | 2px | 4px | — | cyan 发光 + translateY(-2px) | — |
| 标签 | 1px | 4px | — | — | 分类色填充 + 边框 |
| 热门条目 | 2px | 4px | — | magenta 发光 | — |
| 排名框 | 1px | 4px | — | — | cyan 填充 + 黑字 + monospace |
| 订阅区 | 2px | 4px | — | — | lime→cyan 顶部扫描线、`[ SUBSCRIBE ]` 方括号标题 |
| 订阅按钮 | 2px | 4px | — | cyan 填充 | lime 填充 + 黑字 + monospace |
| 订阅输入框 | 2px | 4px | — | — | 白底 + monospace |
| Footer 顶 | 2px | — | — | — | 深靛蓝分割线 |

---

## 十一、设计公式速查表

### Y2K 卡片

```css
.y2k-card {
  background: #ffffff;
  border: 2px solid #312e81;
  border-radius: 4px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s;
}
.y2k-card:hover {
  box-shadow: 0 0 8px #06b6d4, 0 0 20px rgba(6,182,212,0.3);
  /* 可选：transform: translateY(-2px); */
}
```

### Y2K 标签

```css
.y2k-tag {
  display: inline-block;
  padding: 2px 6px;
  border: 1px solid #312e81;
  border-radius: 4px;
  font-size: 9-11px;
  font-weight: 700;
  font-family: monospace;
}
.y2k-tag.hot  { background: #ec4899; color: #fff; }
.y2k-tag.new  { background: #84cc16; color: #000; }
.y2k-tag.app  { background: #06b6d4; color: #000; }
.y2k-tag.pol  { background: #fb923c; color: #000; }
```

### Y2K 按钮

```css
.y2k-btn {
  padding: 6px 16px;
  background: #84cc16;
  color: #000;
  border: 2px solid #312e81;
  border-radius: 4px;
  font-weight: 700;
  font-family: monospace;
  cursor: pointer;
  transition: all 0.1s;
}
.y2k-btn:hover { background: #06b6d4; }
```

### Y2K 扫描线

```css
.y2k-scanline {
  height: 3px;
  background: linear-gradient(90deg, #06b6d4, #ec4899);
  /* 或四色：linear-gradient(90deg, #06b6d4, #ec4899, #84cc16, #06b6d4) */
  animation: scanline 8s linear infinite;
  background-size: 200% 100%;
}
@keyframes scanline {
  0% { background-position: 0%; }
  100% { background-position: -200%; }
}
```

### Y2K 网格背景

```css
.y2k-grid-bg {
  background-image:
    linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px);
  background-size: 24px 24px;
}
```

### Y2K LIVE 指示灯

```css
.y2k-live-dot {
  width: 8px; height: 8px;
  background: #84cc16;
  border-radius: 50%;
  animation: y2k-blink 1s infinite;
}
@keyframes y2k-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
```

---

## 十二、适用场景与不适用场景

### 适合

- 科技产品 / 独立开发者工具官网（Y2K 的"数字前沿感"契合技术产品）
- 游戏 / 电竞相关网站（Y2K 和游戏文化的重叠）
- 创意工作室的实验项目页
- 数据仪表盘 / 监控面板（网格背景 + monospace + 发光指示灯天然适合）
- 任何需要"赛博感"但不走纯暗色路线的场景（Y2K 是亮底的赛博朋克）

### 不适合

- 传统企业官网（Y2K 太"小众/亚文化"）
- 金融 / 医疗等严肃行业（霓虹发光降低信任感）
- 需要大量长文阅读的内容站（monospace 标签打断阅读节奏）
- 电商结算流程（与 Brutalism 相同的问题——降低安全感）

---

## 十三、与 Neo-Brutalism 的对比

| 维度 | Neo-Brutalism | Retro Y2K |
|---|---|---|
| 底色 | 暖黄 `#fef3c7` | 浅靛蓝 `#e0e7ff` |
| 强调色逻辑 | 单色系（accent + accent2） | 三色系（cyan + magenta + lime） |
| 阴影 | 硬阴影 `4px 4px 0 #000` | 霓虹发光 `0 0 8px X, 0 0 20px rgba(X,0.3)` |
| 边框分级 | 4/3/2 三级 | 统一 2px |
| 圆角 | 容器12px / 交互0 | 统一 4px |
| 字体 | Space Grotesk + monospace 回退 | Chakra Petch + monospace 双节奏 |
| 动画 | 极少（只有脉冲点） | 扫描线 + 闪烁灯 + 发光悬停 |
| 装饰 | 条纹 + emoji | 扫描线 + 网格底纹 + ASCII符号 |
| 情绪 | "反精致、物理感" | "科技怀旧、数字前沿" |

---

## 十四、变体建议

| 变体 | 改什么 | 效果 |
|---|---|---|
| 更赛博 | 底色换 `#0a0a1a`（近黑），文字换 `#00ff41`（绿字），发光保留 | 亮底→暗底，变成"Matrix"风格 |
| 更温和 | 底色换 `#f0f9ff`（蓝白），边框换 `#334155`（深灰而非靛蓝），圆角换 8px | 保留 Y2K 三色但降低攻击性 |
| 更极端 | 圆角全部→0，扫描线→4px，网格→16px，加入 CRT `scanlines` 伪元素 | 纯 90年代 UI 还原 |
| 轻量版 | 边框 2→1，扫描线隐藏，网格线透明度 0.02→0.01，发光内层去掉只保留外层 | 适合信息密集页面，降低"装饰噪音" |
| Y2K × Brutalism 混合 | 保留 Y2K 三色 + 网格底纹 + 扫描线，但换用 Brutalism 的硬阴影 + 4/3/2 边框分级 | 两种风格叠加，冲击力更强 |