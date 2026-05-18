# Claymorphism（软泥膨体风）设计系统文档

---

## 重要使用原则

本文件提供的是视觉风格提示，不是固定页面布局方案。示例 HTML 的页面结构仅用于统一展示和截图，不应在真实项目中照搬。后续开发时，应根据用户需求、业务流程、内容优先级和设备场景重新设计页面布局；可复用的是配色、字体、圆角、边框、阴影、质感、状态和动效等视觉语言。

---

## 1. 风格定义与核心精神

Claymorphism（软泥风/膨体风）是 Neumorphism（新拟态）的进阶变体，核心理念是**让界面元素看起来像柔软的黏土或橡皮泥**——圆润、膨胀、有弹性、可触摸。它继承了 Neumorphism 的内外凹凸阴影技法，但在此基础上加入了：

- **更大的圆角**（16px–24px），使元素看起来像被捏圆的泥块
- **更柔和的背景色**（淡紫 #f0e6ff），而非 Neumorphism 的灰色
- **内外双层阴影**的组合使用，让元素"鼓出来"而非"陷进去"
- **充气感（puffiness）**——元素仿佛有内压，略微膨胀
- **色彩点缀**——虽然以白/淡色为主，但允许少量强调色（紫/粉/绿/橙/蓝）

**关键词**：柔软、圆润、膨体、可触摸、柔和、童趣、舒适

**情感定位**：介于专业工具界面与儿童玩具之间——既有信息密度，又传递温暖、亲切的感受。适合需要降低用户焦虑、传递友好感的场景。

---

## 2. 色彩体系

### 2.1 调色板

| 类别 | 变量名 | 色值 | HSL | 用途 |
|------|--------|------|-----|------|
| 背景 | `--bg` | `#f0e6ff` | HSL(267, 100%, 93%) | 页面整体背景，淡紫灰白 |
| 卡片 | `--card` | `#ffffff` | HSL(0, 0%, 100%) | 所有卡片、导航、容器背景 |
| 主文字 | `--text` | `#3d2c5e` | HSL(267, 36%, 27%) | 标题、重要正文 |
| 辅文字 | `--text2` | `#6b5a8e` | HSL(267, 22%, 43%) | 描述、次要正文 |
| 三级文字 | `--text3` | `#9b8cc0` | HSL(267, 27%, 65%) | 时间戳、元信息、注释 |
| 强调1 | `--accent` | `#7c5cfc` | HSL(257, 96%, 67%) | 主强调色，紫色系 |
| 强调2 | `--accent2` | `#f472b6` | HSL(330, 85%, 66%) | 次强调色，粉色系 |
| 功能-绿 | `--green` | `#34d399` | HSL(160, 72%, 57%) | "新鲜"标签、正面信息 |
| 功能-橙 | `--orange` | `#fbbf24` | HSL(43, 93%, 56%) | "政策"标签、警示信息 |
| 功能-蓝 | `--blue` | `#60a5fa` | HSL(217, 91%, 70%) | "应用"标签、中性信息 |

### 2.2 色彩使用规则

| 规则 | 说明 |
|------|------|
| 背景与卡片分离 | 背景用淡紫（#f0e6ff），卡片用纯白（#ffffff），形成"白色泥块浮在紫色泥板"的视觉 |
| 文字三级灰阶 | 三级文字色在同一色相（紫267°）上递增亮度，确保层级清晰且色调统一 |
| 强调色双色系 | 主强调紫（#7c5cfc）用于导航、标签气泡、交互焦点；次强调粉（#f472b6）用于热门标记、品牌色 |
| 功能色低饱和覆盖 | 功能色（绿/橙/蓝）仅在标签背景中以极低饱和度（8%–12% opacity）出现，不破坏整体紫色基调 |
| 禁止纯黑 | 全局无纯黑色值，阴影使用 rgba(60,44,94,...) 暖紫黑，保证"泥质感" |

### 2.3 色彩推导公式

```
背景色推导：HSL(h, 100%, 93%) → h 取主强调色色相 ±10°
主文字色推导：将背景色 HSL 的 L 降至 27%、S 降至 36%
辅文字色推导：将背景色 HSL 的 L 降至 43%、S 降至 22%
三级文字推导：将背景色 HSL 的 L 降至 65%、S 降至 27%

阴影色推导：
  暗影：rgba(H(主文字色相), S(主文字色饱和度), L(主文字色亮度), 0.06–0.15)
  亮影：rgba(255,255,255, 0.5–0.9)

标签背景推导：rgba(强调色R, 强调色G, 强调色B, 0.08–0.15)
```

---

## 3. 排版体系

### 3.1 字体栈

| 层级 | 字体 | 回退 |
|------|------|------|
| 主字体 | Nunito | -apple-system, sans-serif |

Nunito 是一款圆润的无衬线字体，其字母形态本身带有"膨胀感"（字宽偏宽、笔画末端圆润），与 Claymorphism 的视觉精神高度一致。

### 3.2 字号阶梯

| 用途 | 字号 | 行高 | 字间距 |
|------|------|------|--------|
| Hero 主标题 | 26px | 1.25 | -0.02em |
| 区段标题 | 20px | — | — |
| 导航标题 | 18px | — | — |
| 订阅标题 | 18px | — | — |
| 正文描述 | 15px | 1.7 | — |
| 卡片标题 | 15px | 1.35 | — |
| 侧边标题 | 15px | 1.35 | — |
| 正文辅助 | 14px | — | — |
| 筛选按钮 | 13px | — | — |
| 卡片摘录 | 13px | 1.55 | — |
| 元信息 | 12px | — | — |
| 标签文字 | 12px | — | — |
| 小标签 | 11px | — | — |
| Logo 文字 | 13px | — | — |

### 3.3 字重阶梯

| 字重值 | 用途 |
|--------|------|
| 800 | 主标题、Logo、品牌名、区段标题气泡数字、排名数字、订阅标题 |
| 700 | 标签、分类、卡片标题、导航 active、筛选 active、pill 元信息、热门标题 |
| 600 | 导航链接、筛选按钮、卡片 footer、元信息、趋势统计、footer 文字 |
| 500 | body 全局默认字重 |

### 3.4 行高体系

| 场景 | 行高 |
|------|------|
| 紧凑标题 | 1.25 |
| 卡片标题/侧边标题 | 1.35 |
| 正文描述 | 1.7 |
| 摘录 | 1.55 |
| body 全局 | 1.6 |

---

## 4. 边框/圆角/阴影体系

### 4.1 圆角阶梯

| 变量/值 | 尺寸 | 用途 |
|---------|------|------|
| `--radius` | 24px | Hero 主卡片、订阅区、大型容器 |
| `--radius-sm` | 16px | 新闻卡片、侧边卡片、趋势条目 |
| 20px | — | 导航底部圆角 |
| 14px | — | Logo 方块、订阅按钮/输入框、排名方块 |
| 12px | — | 标签 pill、筛选按钮 |
| 10px | — | 元信息 pill、趋势统计 pill、小分类标签 |
| 8px | — | 侧边分类标签 |

**设计原则**：所有元素均为圆角，无直角。最小圆角 8px，最大 24px。圆角越大，元素越"膨胀"。

### 4.2 阴影体系（核心特征）

Claymorphism 的灵魂在于**双层阴影系统**——内凹阴影 + 外凸阴影的组合。

| 变量名 | 阴影值 | 用途 | 类型 |
|--------|--------|------|------|
| `--inner-shadow` | `inset -4px -4px 8px rgba(0,0,0,0.06), inset 4px 4px 8px rgba(255,255,255,0.8)` | 标签、pill、筛选按钮、小分类 | 轻内凹 |
| `--inner-shadow2` | `inset -6px -6px 12px rgba(0,0,0,0.08), inset 6px 6px 12px rgba(255,255,255,0.9)` | Logo 方块、Hero 标签 | 重内凹 |
| `--outer-shadow` | `6px 6px 12px rgba(60,44,94,0.12), -6px -6px 12px rgba(255,255,255,0.6)` | 新闻卡片、趋势条目、侧边卡片 | 标准外凸 |
| `--outer-shadow2` | `8px 8px 16px rgba(60,44,94,0.15), -8px -8px 16px rgba(255,255,255,0.7)` | Hero 主卡片、导航 | 加强外凸 |

**阴影推导公式**：

```
内凹阴影 = inset -Xpx -Xpx Ypx rgba(0,0,0,A), inset Xpx Xpx Ypx rgba(255,255,255,B)
  轻级：X=4, Y=8, A=0.06, B=0.8
  重级：X=6, Y=12, A=0.08, B=0.9

外凸阴影 = Xpx Xpx Ypx rgba(60,44,94,C), -Xpx -Xpx Ypx rgba(255,255,255,D)
  标准级：X=6, Y=12, C=0.12, D=0.6
  加强级：X=8, Y=16, C=0.15, D=0.7
```

**关键原则**：
- 暗影方向：右下（正偏移），模拟光源在左上方
- 亮影方向：左上（负偏移），模拟反射光
- 暗影颜色使用暖紫黑 `rgba(60,44,94,...)`，而非纯黑，保持色调统一
- 亮影使用白色高透明度，模拟光滑泥面的光泽反射
- 内凹与外凸可叠加使用（如订阅区同时有内凹和外凸阴影）

### 4.3 特殊阴影组合

| 元素 | 阴影组合 |
|------|----------|
| 订阅区（accent 背景） | `inset -4px -4px 8px rgba(0,0,0,0.2), inset 4px 4px 8px rgba(255,255,255,0.2), 8px 8px 16px rgba(60,44,94,0.2)` |
| 筛选按钮 active | `inset -3px -3px 6px rgba(124,92,252,0.1), inset 3px 3px 6px rgba(255,255,255,0.7)` |
| Logo 方块 | `inset -2px -2px 4px rgba(0,0,0,0.15), inset 2px 2px 4px rgba(255,255,255,0.3)` |

---

## 5. 装饰元素/交互细节

### 5.1 装饰元素

| 元素 | 样式 | 位置 |
|------|------|------|
| 气泡光晕（bubble-glow） | 100×100px，径向渐变 `radial-gradient(circle, rgba(124,92,252,0.15), transparent 70%)`，border-radius:50% | Hero 主卡片右上角 (-20px, -20px) |
| 区段标题气泡（bubble） | 28×28px，accent 背景，border-radius:10px，内凹阴影 | 区段标题左侧 |
| 跳动圆点（dot） | 6×6px，accent2 背景，border-radius:50%，动画 bounce | Hero 标签内部 |
| Logo 方块 | 36×36px，accent 背景，border-radius:14px，内凹阴影 | 导航左侧 |
| 元信息 pill | 小型圆角容器，accent 低透明度背景 | Hero 元信息行 |

### 5.2 交互细节

| 交互 | 效果 | 过渡时间 |
|------|------|----------|
| Hero 主卡片 hover | translateY(-4px) 上浮 | 0.3s |
| 侧边卡片 hover | translateY(-2px) 上浮 | 0.3s |
| 新闻卡片 hover | translateY(-3px) 上浮 | 0.3s |
| 趋势条目 hover | translateX(6px) 右移 | 0.3s |
| 导航链接 hover | color 变为 accent | 0.2s |
| 筛选按钮 hover | color 变为 accent | 0.2s |
| 筛选按钮 active | 背景变为 accent 低透明度，阴影变为 accent 色 | 0.2s |
| 文字选中 | 背景 accent，文字白色 | — |

---

## 6. 示例布局/间距观察（非固定方案）


> 以下布局内容仅用于解释示例 HTML 如何展示该风格，不是后续项目必须采用的页面结构。真实项目应重新做信息架构和布局设计。

### 6.1 容器与间距

| 属性 | 值 | 说明 |
|------|------|------|
| 最大宽度 | 1100px | 主内容区域 |
| 主区域 padding | 40px 32px（桌面）/ 28px 16px（移动） | 上下留白较大 |
| 导航高度 | 56px | 固定高度 |
| 导航 padding | 0 32px（桌面）/ 0 16px（移动） | — |
| 区段间距 | 40px margin-bottom | 区段之间统一间距 |
| Grid gap | 20px（新闻网格）/ 24px（Hero）/ 14px（趋势列表） | — |
| 卡片内 padding | 24px（新闻卡片）/ 36px（Hero 主卡片）/ 22px（侧边卡片） | — |
| footer padding | 32px | — |

### 6.2 Grid 系统

| 区域 | 列定义 | 说明 |
|------|--------|------|
| Hero | `1.3fr 1fr` | 主卡片占 1.3 倍宽度 |
| 新闻网格 | `repeat(3, 1fr)` | 三列等宽 |
| 趋势列表 | 单列 flex column | 纵向排列 |

---

## 7. 响应式策略

### 7.1 断点定义

| 断点 | 宽度 | 变化 |
|------|------|------|
| 桌面 | >1024px | 默认布局 |
| 平板 | ≤1024px | Hero 变单列，新闻变 2 列 |
| 移动 | ≤768px | 新闻变单列，导航收紧，订阅变纵向，footer 变纵向 |

### 7.2 详细变化清单

**≤1024px**：
- `.hero-inner` → `grid-template-columns: 1fr`（Hero 单列）
- `.news-grid` → `grid-template-columns: repeat(2, 1fr)`（新闻 2 列）

**≤768px**：
- `.nav` → `padding: 0 16px`
- `.nav-links` → `gap: 12px`
- `.main` → `padding: 28px 16px`
- `.news-grid` → `grid-template-columns: 1fr`
- `.subscribe` → `flex-direction: column; gap: 20px; align-items: flex-start`
- `.subscribe .sub-form` → `width: 100%`
- `.subscribe .sub-input` → `flex: 1; width: auto`
- `.footer` → `flex-direction: column; gap: 16px`

---

## 8. 组件速查表

| 组件 | 关键属性 |
|------|----------|
| **导航** | sticky, bg:white, h:56px, radius:0 0 20px 20px, outer-shadow, flex |
| **Logo方块** | 36×36px, bg:accent, radius:14px, inner-shadow(重), font:800 13px white |
| **导航标题** | 18px font-weight:800, span 用 accent2 色 |
| **导航链接** | 14px font-weight:600, color:text2, hover→accent, active→accent+700 |
| **Hero主卡片** | bg:white, radius:24px, padding:36px, outer-shadow2, hover translateY(-4px) |
| **气泡光晕** | 100×100px, radial-gradient accent 0.15→transparent, radius:50% |
| **标签（hero-tag）** | inline-flex, padding:6px 14px, bg:accent2 0.15, radius:12px, inner-shadow |
| **跳动圆点** | 6×6px, bg:accent2, radius:50%, animation bounce 1.5s |
| **Hero标题** | 26px font-weight:800, letter-spacing:-0.02em, line-height:1.25 |
| **Hero描述** | 15px, color:text2, line-height:1.7 |
| **元信息pill** | padding:4px 10px, bg:accent 0.08, radius:10px, inner-shadow |
| **侧边卡片** | bg:white, radius:16px, padding:22px, outer-shadow, hover translateY(-2px) |
| **区段标题气泡** | 28×28px, bg:accent, radius:10px, inner-shadow(重) |
| **筛选按钮** | padding:6px 14px, bg:white, radius:12px, inner-shadow, font:600 13px |
| **筛选active** | bg:accent 0.1, accent色内凹阴影, color:accent |
| **新闻卡片** | bg:white, radius:16px, padding:24px, outer-shadow, hover translateY(-3px) |
| **卡片标签** | inline-block, padding:4px 10px, radius:8px, inner-shadow(轻) |
| **趋势条目** | bg:white, radius:16px, padding:16px 20px, outer-shadow, hover translateX(6px) |
| **排名方块** | 36×36px, bg:accent 0.1, radius:14px, inner-shadow, font:800 14px accent |
| **订阅区** | bg:accent, radius:24px, padding:28px 32px, 三层阴影(内凹+外凸) |
| **订阅输入** | padding:10px 16px, bg:white 0.2, radius:14px, accent色内凹阴影 |
| **订阅按钮** | padding:10px 22px, bg:white, color:accent, radius:14px, inner-shadow |
| **Footer** | max-width:1100px, padding:32px, color:text3 |

---

## 9. CSS变量/代码片段

### 9.1 完整 CSS 变量定义

```css
:root {
  --bg: #f0e6ff;
  --card: #ffffff;
  --text: #3d2c5e;
  --text2: #6b5a8e;
  --text3: #9b8cc0;
  --accent: #7c5cfc;
  --accent2: #f472b6;
  --green: #34d399;
  --orange: #fbbf24;
  --blue: #60a5fa;
  --radius: 24px;
  --radius-sm: 16px;
  --inner-shadow: inset -4px -4px 8px rgba(0,0,0,0.06), inset 4px 4px 8px rgba(255,255,255,0.8);
  --inner-shadow2: inset -6px -6px 12px rgba(0,0,0,0.08), inset 6px 6px 12px rgba(255,255,255,0.9);
  --outer-shadow: 6px 6px 12px rgba(60,44,94,0.12), -6px -6px 12px rgba(255,255,255,0.6);
  --outer-shadow2: 8px 8px 16px rgba(60,44,94,0.15), -8px -8px 16px rgba(255,255,255,0.7);
}
```

### 9.2 核心组件代码片段

**Clay 卡片（外凸型）**：
```css
.clay-card {
  background: var(--card);
  border-radius: var(--radius-sm);
  padding: 24px;
  box-shadow: var(--outer-shadow);
  transition: transform 0.3s;
}
.clay-card:hover { transform: translateY(-3px); }
```

**Clay 按钮（内凹型）**：
```css
.clay-btn {
  padding: 6px 14px;
  background: var(--card);
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text2);
  box-shadow: var(--inner-shadow);
  transition: all 0.2s;
}
.clay-btn.active {
  background: rgba(124,92,252,0.1);
  color: var(--accent);
  box-shadow: inset -3px -3px 6px rgba(124,92,252,0.1), inset 3px 3px 6px rgba(255,255,255,0.7);
}
```

**Clay 标签（pill 型）**：
```css
.clay-pill {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 700;
  box-shadow: inset -1px -1px 2px rgba(0,0,0,0.05), inset 1px 1px 2px rgba(255,255,255,0.5);
}
```

**Clay 强调容器（accent 背景，内外阴影叠加）**：
```css
.clay-accent-box {
  background: var(--accent);
  border-radius: var(--radius);
  padding: 28px 32px;
  color: white;
  box-shadow: inset -4px -4px 8px rgba(0,0,0,0.2), inset 4px 4px 8px rgba(255,255,255,0.2),
    8px 8px 16px rgba(60,44,94,0.2);
}
```

**跳动动画**：
```css
@keyframes bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.3); }
}
```

---

## 10. 适用/不适用场景

### 适用场景

| 场景 | 原因 |
|------|------|
| 儿童教育应用 | 圆润膨胀感天然亲和儿童审美 |
| 健康/心理咨询平台 | 柔软质感降低用户焦虑感 |
| 创意工具/设计平台 | 泥质感暗示"可塑可捏"的创造力 |
| 社交/社区产品 | 亲切感促进互动 |
| 生活方式类内容平台 | 温暖视觉传递舒适感 |
| D2C 消费品牌官网 | 柔软质感增强品牌亲和力 |
| 个人博客/作品集 | 独特视觉风格，个性表达 |

### 不适用场景

| 场景 | 原因 |
|------|------|
| 金融/银行核心界面 | 柔软感缺乏权威性和信任感 |
| 仪表盘/数据分析 | 内凹阴影在小尺寸元素上可读性差 |
| 医疗诊断系统 | 需要精确清晰而非"膨胀模糊" |
| 法律/合规平台 | 玩具感与严肃性冲突 |
| 高密度信息列表 | 大圆角浪费空间，阴影叠加降低对比度 |
| 深色主题 | Claymorphism 阴影依赖浅色背景，深色下效果极差 |
| 无障碍严格要求 | 内凹阴影的低对比度可能不符合 WCAG AA |

---

## 11. 与其他风格对比

| 对比维度 | Claymorphism | Neumorphism | Glassmorphism | Light Skeuomorphism | Neo-Brutalism |
|----------|--------------|-------------|---------------|---------------------|---------------|
| **圆角** | 16–24px（极大） | 8–12px（中等） | 16–20px（较大） | 8–16px（中等） | 0–8px（极小或无） |
| **阴影** | 内凹+外凸双层 | 单层凹凸 | 模糊扩散阴影 | 轻微投影 | 硬偏移实色阴影 |
| **边框** | 无 | 无 | 1px 半透明 | 1px 浅灰 | 2–3px 粗黑 |
| **背景** | 淡色单色 | 灰色单色 | 模糊透明 | 白色/浅灰 | 纯色/白色 |
| **色彩丰富度** | 低（强调色点缀） | 极低（几乎单色） | 中（渐变背景） | 中（功能色系统） | 高（大胆撞色） |
| **触感隐喻** | 柔软泥块 | 凸起/凹陷表面 | 毛玻璃 | 纸张/卡片 | 粗糙印刷品 |
| **可访问性** | 差（低对比度） | 极差 | 中（依赖背景） | 好 | 好（高对比） |
| **与 Retro Y2K** | Y2K更金属闪亮，Clay更柔软圆润 | — | — | — | — |
| **与 Bento Grid** | Bento侧重布局，Clay侧重质感 | — | — | — | — |
| **与 Swiss Editorial** | Swiss极简理性，Clay感性膨胀 | — | — | — | — |
| **与 Aurora Gradient** | Aurora是渐变氛围，Clay是触感材质 | — | — | — | — |
| **与 Human Scribble** | Scribble是手绘混乱，Clay是工业圆润 | — | — | — | — |
| **与 Terminal Hacker** | Hacker冷硬代码，Clay温暖泥块 | — | — | — | — |
| **与 Classic News** | News传统报纸，Clay现代触感 | — | — | — | — |
| **与 Feed Layout** | Feed注重信息流，Clay注重单卡质感 | — | — | — | — |

---

## 12. 变体建议

| 变体名 | 描述 | 关键变化 |
|--------|------|----------|
| **Dark Clay** | 深色版 Claymorphism | 背景改为 #2d1b4e（深紫），卡片改为 #3d2c5e，阴影亮侧改为 rgba(255,255,255,0.15)，暗侧改为 rgba(0,0,0,0.3)，文字白色系 |
| **Warm Clay** | 暖色调变体 | 背景改为 #fff5e6（淡橙），accent 改为 #e07c4f（陶土橙），accent2 改为 #f0a060（蜜糖色），整体传达"陶器/烤泥"质感 |
| **Ocean Clay** | 海洋冷色变体 | 背景改为 #e6f4ff（淡蓝），accent 改为 #4fc3f7（海蓝），accent2 改为 #80cbc4（薄荷绿），阴影暗侧改为 rgba(30,60,90,...) |
| **Micro Clay** | 小尺寸精简版 | 圆角降至 12px/8px，阴影偏移降至 3px/4px，减少 padding，适合移动端紧凑布局 |
| **Flat Clay** | 去阴影扁平版 | 仅保留大圆角和淡色背景，去掉所有内外阴影，降低视觉噪音，提升可读性 |
| **Glossy Clay** | 高光强化版 | 在外凸阴影基础上增加 `filter: brightness(1.02)` 和更亮的亮侧阴影（0.95透明度），模拟光滑釉面泥块 |

---

## 13. 动效/微交互

| 动效 | 详情 |
|------|------|
| **bounce 跳动** | 圆点标记动画：scale(1) → scale(1.3) → scale(1)，周期 1.5s，无限循环 |
| **Hover 上浮** | 所有卡片 hover 时 translateY 上浮（2–4px），模拟"泥块被手指轻推抬起" |
| **Hover 右移** | 趋势条目 hover 时 translateX(6px)，模拟"滑动推开" |
| **筛选切换** | active 状态切换时阴影从标准内凹变为 accent 色内凹，背景从白色变为 accent 低透明度 |
| **文字选中** | ::selection 背景变为 accent，文字变白色 |
| **平滑滚动** | html { scroll-behavior: smooth } |

**建议增加的动效**（未在原文件中实现）：
- 卡片按下（active）时 translateY(0) 回落 + 阴影减弱，模拟"泥块被按压"
- 页面加载时卡片 stagger 入场动画（逐一从 opacity:0 + translateY(20px) 渐入）
- 长按卡片时 scale(0.98) 轻微缩小 + 内凹阴影增强，强化"按压泥块"触感
- 标签切换时使用 bounce 微弹效果而非线性过渡

---

## 14. 实施指南/注意事项

### 实施步骤

1. **先定义 CSS 变量**：将所有色彩、圆角、阴影定义为 `:root` 变量，确保全局一致性
2. **选择字体**：加载 Nunito（Google Fonts），设置 body 默认 font-family 和 font-weight:500
3. **构建阴影层级**：从 inner-shadow（轻）→ inner-shadow2（重）→ outer-shadow（标准）→ outer-shadow2（加强），按元素重要性选用
4. **圆角分级**：大容器 24px，标准卡片 16px，小型元素 12px，微型标签 8–10px
5. **色彩应用**：背景与卡片分离，文字三级灰阶，强调色仅在标签和交互焦点出现
6. **响应式适配**：从桌面三列 → 平板两列 → 移动单列，阴影和圆角不变

### 关键注意事项

| 注意事项 | 说明 |
|----------|------|
| **对比度问题** | Claymorphism 最大的风险是低对比度。text3 (#9b8cc0) 在白色卡片上对比度约 2.8:1，不满足 WCAG AA（需 4.5:1）。建议将 text3 暗化至 #7a6ba0 或在重要信息位置使用 text2 |
| **阴影性能** | 双层阴影（4个 shadow 值）在每个元素上产生 GPU 合成负担。避免在列表型组件（>20项）上使用 outer-shadow2 |
| **深色模式困难** | Claymorphism 的核心技法依赖浅色背景上的白/暗阴影对比。深色模式下亮侧阴影几乎不可见，需完全重写阴影系统 |
| **触摸设备** | hover 上浮效果在触摸设备上不可用，需用 :active 状态替代（按下时阴影减弱+元素回落） |
| **打印问题** | box-shadow 在打印时通常被浏览器忽略，Claymorphism 打印后变为扁平白色方块，需提供 print 样式表添加边框 |
| **字体加载** | Nunito 未加载前会回退到 -apple-system，字宽差异导致布局抖动。建议使用 font-display: swap 或 preload |
| **避免过度堆叠** | 同一区域不要叠加 3 层以上 Clay 卡片（每层都有双层阴影），否则视觉噪音过大 |
| **iOS Safari** | inset shadow 在 iOS Safari 上偶尔渲染异常（锯齿），建议在高圆角元素上增加 1px 透明 border 作为修止 |