# Aurora Gradient 设计系统手册

> 来源：`version-g-aurora.html` — AI Pulse 流光极光版本

---

## 重要使用原则

本文件提供的是视觉风格提示，不是固定页面布局方案。示例 HTML 的页面结构仅用于统一展示和截图，不应在真实项目中照搬。后续开发时，应根据用户需求、业务流程、内容优先级和设备场景重新设计页面布局；可复用的是配色、字体、圆角、边框、阴影、质感、状态和动效等视觉语言。

---

## 一、风格定义

**Aurora Gradient（流光极光风格）** 以极光色彩为灵感，融合了深度暗色背景与流动彩色光晕。核心理念：

- **极光色彩**：四色极光（绿/紫/粉/蓝）缓慢漂移，像天空中的北极光
- **发光深度**：box-shadow 光晕代替硬阴影，元素像被极光照射的暗夜物体
- **流动感**：极光blob 20s缓速漂移动画，stripe shimmer流动，页面永不静止
- **暗夜底色**：深黑蓝 `#0f0f1a` 是极光存在的必要条件
- **强字重**：800weight标题+700weight常规，在暗色背景上需要粗壮字体才能站稳

---

## 二、色彩体系

### 2.1 调色板

| 角色 | CSS 变量 | 值 | 用途 |
|---|---|---|---|
| 页面背景 | `--bg` | `#0f0f1a` | 极深黑蓝，极光基座 |
| 卡片背景 | `--card` | `rgba(20,20,40,0.6)` | 60%深色半透明 |
| 卡片hover | `--card-hover` | `rgba(30,30,60,0.7)` | hover态稍亮 |
| 主文字 | `--text` | `#e8e8f0` | 极浅蓝白（非纯白） |
| 辅文字 | `--text2` | `#a0a0b8` | 灰蓝 |
| 弱化文字 | `--text3` | `#606080` | 深灰蓝 |
| 极光绿 | `--aurora1` | `#00ffaa` | 突发标签、左侧竖线 |
| 极光紫 | `--aurora2` | `#7b68ee` | 侧边标签、分类色 |
| 极光粉 | `--aurora3` | `#ff6ec7` | hot标签 |
| 极光蓝 | `--aurora4` | `#00d4ff` | 主强调色、导航高亮 |
| 边框 | `--border` | `rgba(255,255,255,0.06)` | 极微透明 |
| 光晕1 | `--glow` | `0 0 40px rgba(0,212,255,0.15)` | 青色光晕 |
| 光晕2 | `--glow2` | `0 0 60px rgba(123,104,238,0.12)` | 紫色光晕 |

### 2.2 极光blob体系

四个固定定位的圆形blob，filter:blur(120px)：
- Blob1：60vw×60vh, rgba(0,255,170,0.12), top:-10%, left:-10%
- Blob2：50vw×50vh, rgba(123,104,238,0.15), top:20%, right:-15%
- Blob3：40vw×40vh, rgba(255,110,199,0.1), bottom:10%, left:10%
- Blob4：35vw×35vh, rgba(0,212,255,0.08), bottom:-10%, right:20%

### 2.3 色彩使用规则

1. **极光四色严格分工**：绿=突发/新鲜、紫=分类/侧边、粉=热门、蓝=全局强调
2. **标签色系**：hot→粉(10%底+2%边)、new→绿(10%底+2%边)、policy→蓝(10%底+2%边)、app→紫(10%底+2%边)
3. **文字偏蓝白**：`#e8e8f0` 而非纯白，在极光背景上纯白太刺眼
4. **边框极微**：6%透明度，极光风格不靠边框区分元素，靠光晕

---

## 三、排版体系

| 元素 | 字体 | 字号 | 字重 | 行高 | 字间距 |
|---|---|---|---|---|---|
| 全局 | Outfit, -apple-system, sans-serif | — | — | 1.6 | — |
| 导航标题 | Outfit | 18px | 700 | — | -0.03em |
| Hero标题 | Outfit | 30px | 800 | 1.2 | -0.04em |
| Hero描述 | Outfit | 15px | — | 1.7 | — |
| 侧边标题 | Outfit | 15px | 600 | 1.4 | -0.01em |
| 新闻标题 | Outfit | 15px | 600 | 1.4 | -0.01em |
| 新闻摘要 | Outfit | 13px | — | 1.6 | — |
| 趋势标题 | Outfit | 14px | 500 | — | — |
| section标题 | Outfit | 22px | 700 | — | -0.03em |

**Outfit 字体选择理由**：比Inter更圆润、更现代感，字重800时粗壮有力，在暗色背景上视觉稳定。

---

## 四、边框/圆角/阴影体系

### 4.1 边框

| 类型 | 值 |
|---|---|---|
| 全局 | `1px solid rgba(255,255,255,0.06)` |
| 标签 | 各极光色12%透明度 + 各色20%透明度边框 |
| 过滤按钮 | 同上 |

### 4.2 圆角

| 元素 | 值 |
|---|---|
| 主卡片 | 24px (--radius) |
| 侧边/新闻卡 | 16px (--radius-sm) |
| 导航logo | 10px |
| 标签 | 20px |
| 排名框 | 10px |
| 输入框 | 14px |
| 订阅按钮 | 14px |

### 4.3 阴影（光晕体系）

| 类型 | 值 | 用途 |
|---|---|---|---|
| 青色光晕 | `0 0 40px rgba(0,212,255,0.15)` | hero主卡、订阅栏 |
| 紫色光晕 | `0 0 60px rgba(123,104,238,0.12)` | hero主卡、订阅栏叠加 |
| hover光晕 | `0 0 60px rgba(0,255,170,0.2) + 0 0 80px rgba(0,212,255,0.15)` | hero主卡hover |
| 侧边hover | `0 0 40px rgba(0,212,255,0.15)` | 侧边卡hover |
| 新闻hover | 同glow | 新闻卡hover |
| 趋势hover | `0 0 30px rgba(0,212,255,0.08)` | 趋势项hover |

**关键原则**：极光风格零硬阴影，所有深度来自glow光晕。

---

## 五、装饰元素/交互细节

| 元素 | 实现 | 效果 |
|---|---|---|---|
| 极光stripe | `linear-gradient(90deg, aurora1→aurora4→aurora2→aurora3)` 3px高 + shimmer动画 | hero顶部流动彩条 |
| shimmer | `background-size:200% + animation 3s linear infinite` | 彩条持续流动 |
| 极光blob漂移 | `drift 20s ease-in-out infinite` | 4个blob缓慢漂移 |
| 脉搏点 | `pulse2 1.5s infinite` → scale 1→0.8→1 + opacity | 突发标签绿点 |
| 发光点 | `box-shadow: 0 0 12px var(--aurora4)` | section标题8px发光点 |
| 侧边竖线 | `::before` 3px宽×100%高 | 不同侧边卡不同极光色竖线 |
| hover位移 | translateY(-3px) / translateX(8px) | 卡片上浮 / 趋势右移 |
| 订阅stripe | 同shimmer动画 4s | 订阅栏顶部彩条 |

---

## 六、示例布局/间距观察（非固定方案）


> 以下布局内容仅用于解释示例 HTML 如何展示该风格，不是后续项目必须采用的页面结构。真实项目应重新做信息架构和布局设计。

| 区域 | 布局 | 间距 |
|---|---|---|---|
| 导航 | flex, sticky, 56px高 | 32px padding |
| Hero | grid 1.3fr 1fr | 24px gap |
| 新闻网格 | grid 3列 | 24px gap |
| 趋势列表 | flex column | 14px gap |
| 订阅栏 | flex row | 32px padding |
| 最大宽度 | 1200px | margin auto |
| 全局padding | 40px 32px | — |

---

## 七、响应式策略

| 断点 | 变化 |
|---|---|---|
| ≤1024px | Hero单列、新闻2列 |
| ≤768px | 导航padding 16px、新闻单列、订阅栏纵向、footer纵向 |

---

## 八、组件速查表

| 组件 | 背景 | 边框 | 圆角 | padding | hover |
|---|---|---|---|---|---|---|
| 导航 | rgba(15,15,26,0.5)+blur(30px) | border(6%白) | — | 0 32px | — |
| Hero主卡 | card(60%)+blur(20px) | border | 24px | 40px | 上移3px+glow增强 |
| 侧边卡 | card(60%)+blur(16px) | border | 16px | 24px | 上移2px+glow |
| 新闻卡 | card(60%)+blur(16px) | border | 16px | 24px | 上移3px+glow |
| 过滤按钮 | card | border | 20px | 6px 16px | active→accent蓝 |
| 趋势项 | card+blur(12px) | border | 16px | 16px 24px | 右移8px+glow |
| 排名框 | rgba(0,212,255,0.08)+border | — | 10px | — | — |
| 订阅栏 | card+blur(20px) | border | 24px | 32px | — |
| 订阅输入 | rgba(15,15,26,0.5)+border | — | 14px | 10px 18px | border→accent |
| 订阅按钮 | gradient(aurora1→aurora4) | none | 14px | 10px 24px | glow上移 |

---

## 九、CSS变量/代码片段

```css
:root {
  --bg: #0f0f1a;
  --card: rgba(20,20,40,0.6);
  --card-hover: rgba(30,30,60,0.7);
  --text: #e8e8f0;
  --text2: #a0a0b8;
  --text3: #606080;
  --aurora1: #00ffaa;
  --aurora2: #7b68ee;
  --aurora3: #ff6ec7;
  --aurora4: #00d4ff;
  --border: rgba(255,255,255,0.06);
  --glow: 0 0 40px rgba(0,212,255,0.15);
  --glow2: 0 0 60px rgba(123,104,238,0.12);
  --radius: 24px;
  --radius-sm: 16px;
}
```

---

## 十、适用/不适用场景

### 适用

- AI/数据/科技产品暗色官网
- 游戏平台/电竞品牌
- 创意机构展示页
- 音乐/艺术/沉浸式体验网站
- SaaS 产品暗色仪表板

### 不适用

- 新闻/资讯密集型（发光背景降低阅读效率）
- 政务/金融（过于"梦幻"不够严肃）
- 印刷品（glow无法复现）
- 需要极高文字可读性的场景
- 无GPU设备（blur+动画性能问题）

---

## 十一、与其他风格对比

| 维度 | Aurora Gradient | Glassmorphism | Terminal Hacker | Retro Y2K |
|---|---|---|---|---|
| 背景 | 极深黑蓝+4极光blob | 深紫渐变+2光晕 | 纯黑 | 糖果色渐变 |
| 深度来源 | 光晕glow | blur滤镜 | 绿色发光 | 堆叠+闪烁 |
| 强调色 | 4色极光 | 青+紫 | 纯绿 | 霓虹多色 |
| 动感 | 极光漂移+stripe流 | 脉搏点 | 打字机效果 | 星光闪烁 |
| 字体 | Outfit(800) | Inter(700) | Monospace | Y2K字体 |
| 圆角 | 24px大圆角 | 24px | 0-4px | 8-16px |

---

## 十二、变体建议

| 变体 | 修改 | 效果 |
|---|---|---|---|
| 冷色版 | 极光改为蓝/青/白三色 | 适合企业科技 |
| 暖色版 | 极光改为橙/金/红 | 适合音乐/娱乐 |
| 极简版 | 减少blob至2个，去掉stripe | 适合工具型产品 |
| 霓虹版 | 增加边框发光线，网格背景 | 适合赛博朋克主题 |

---

## 十三、动效/微交互

| 动效 | 触发 | 实现 | 持续时间 |
|---|---|---|---|---|
| 极光漂移 | 常态 | 4个blob 20s drift | 20s infinite |
| stripe流动 | 常态 | shimmer animation | 3s infinite |
| 发光点 | 常态 | box-shadow glow | — |
| 脉搏 | 常态 | scale+opacity | 1.5s infinite |
| 卡片上浮 | hover | translateY(-3px) + glow增强 | 0.3s |
| 趋势右移 | hover | translateX(8px) + glow | 0.25s |
| 订阅stripe | 常态 | shimmer 4s | 4s infinite |
| 订阅按钮hover | hover | glow 30px + translateY(-2px) | 0.25s |

---

## 十四、实施指南/注意事项

1. **极光blob必须固定定位**：blob用fixed而非absolute，确保滚动时极光始终可见
2. **blur(120px)性能**：4个120px模糊blob消耗GPU，低端设备需减少blob数量或降低blur值
3. **极光四色不变**：绿/紫/粉/蓝四色是品牌DNA，不要引入第五色
4. **glow叠加规则**：主元素用glow+glow2双重光晕（青+紫），hover态增加绿色glow
5. **stripe shimmer背景尺寸**：必须设置 `background-size: 200% 100%`，否则动画不流动
6. **Outfit字体字重800**：暗色+极光背景上必须用800才能视觉站稳，700不够
7. **文字色偏蓝白**：`#e8e8f0` 不是纯白，纯白在极光上太刺眼