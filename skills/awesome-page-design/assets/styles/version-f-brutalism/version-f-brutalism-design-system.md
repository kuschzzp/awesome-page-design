# Neo-Brutalism 设计系统手册

> 来源：`version-f-brutalism.html` — AI Pulse 粗野主义版本

---

## 重要使用原则

本文件提供的是视觉风格提示，不是固定页面布局方案。示例 HTML 的页面结构仅用于统一展示和截图，不应在真实项目中照搬。后续开发时，应根据用户需求、业务流程、内容优先级和设备场景重新设计页面布局；可复用的是配色、字体、圆角、边框、阴影、质感、状态和动效等视觉语言。

---

## 一、风格定义

**Neo-Brutalism（新粗野主义）** 是 2023-2026 年在 Awwwards / Figma / Webflow 社区爆火的设计风格。核心理念：

- **反精致**：拒绝渐变、模糊、透明等"高端"效果，用最原始的视觉元素说话
- **物理感**：硬阴影代替柔和投影，粗边框代替微透明分割，一切像实体剪纸
- **高对比**：饱和亮色 + 纯黑边框 + 暖黄底色，页面像海报而非界面
- **零圆角按钮**：交互元素一律方形，容器可适度圆角，形成"盒子"质感
- **Emoji 辅助**：用 emoji 代替图标库，拒绝精致 SVG，保持原始趣味

---

## 二、色彩体系

### 2.1 调色板

| 角色 | CSS 变量 | 值 | 用途 |
|---|---|---|---|
| 页面背景 | `--bg` | `#fef3c7` | 暖黄奶油色，非纯白，视觉温暖 |
| 卡片背景 | `--card` | `#ffffff` | 纯白，与暖底形成强对比 |
| 主文字 | `--text` | `#000000` | 纯黑，无妥协 |
| 辅助文字 | `--text2` | `#44403c` | 暖灰（Stone-700） |
| 弱化文字 | `--text3` | `#78716c` | 浅暖灰（Stone-500） |
| 主强调色 | `--accent` | `#f43f5e` | Rose-500，用于热门标签、按钮悬停 |
| 副强调色 | `--accent2` | `#7c3aed` | Violet-600，用于活跃态、订阅区 |
| 绿 | `--green` | `#22c55e` | Green-500，新鲜标签 |
| 蓝 | `--blue` | `#3b82f6` | Blue-500，应用标签 |
| 橙 | `--orange` | `#f97316` | Orange-500，政策标签 |
| 边框 | `--border` | `#000000` | 纯黑，全局唯一边框色 |

### 2.2 色彩使用规则

1. **边框只有纯黑**：所有边框统一 `#000000`，无论背景是什么颜色。彩色背景（标签/按钮）的边框也是纯黑
2. **标签颜色 = 分类颜色**：每个分类对应一个饱和色，标签背景直接填色 + 白字 + 黑边框
3. **暖黄底色是灵魂**：`#fef3c7` 是 Amber-100，它让整个页面有"纸质海报"感。**绝对不要换成纯白**
4. **纯黑文字**：主文字 `#000000` 不妥协，辅助文字用暖灰系（Stone 系列），不用冷灰

### 2.3 调色板推导公式

如果要换主题色，遵循这个公式：

| 角色 | 推导规则 |
|---|---|
| 页面背景 | Tailwind 柔和色 ×100（如 Amber-100, Pink-100, Lime-100） |
| 强调色 | Tailwind 饱和色 ×500（如 Rose-500, Violet-500, Cyan-500） |
| 分类色 | Tailwind ×500，每个分类不同色系 |
| 边框 | 永远 `#000000` |
| 文字 | 永远 `#000000` + Stone 灰系 |

---

## 三、排版体系

### 3.1 字体

| 属性 | 值 | 说明 |
|---|---|---|
| 主字体 | `Space Grotesk` | 几何感无衬线，有轻微"科技+原始"双重气质 |
| 回退 | `monospace` | 故意用 monospace 而非 sans-serif，强化"打字机/代码"感 |
| 字重档位 | 400 / 500 / 600 / 700 | 不用 300 轻体，Brutalism 要粗 |

**字体选择原则**：Space Grotesk / Archivo / Clash Grotesk / Bricolage Grotesque 都适合。关键是几何感 + 粗体表现力好。避免 Inter（太精致）。

### 3.2 字号层级

| 元素 | 字号 | 字重 | 字间距 | 行高 |
|---|---|---|---|---|
| Hero 标题 | `28px` | 700 | `-0.03em` | `1.2` |
| 区块标题 | `22px` | 700 | `-0.03em` | — |
| 导航标题 | `20px` | 700 | `-0.03em` | — |
| 侧栏标题 | `15px` | 700 | — | `1.3` |
| 新闻卡片标题 | `15px` | 700 | — | `1.3` |
| Hero 描述 | `14px` | 400 | — | `1.6` |
| 导航链接 | `13px` | 600 | — | — |
| 热门条目 | `14px` | 600 | — | — |
| 订阅标题 | `18px` | 700 | — | — |
| 标签 | `10-12px` | 700 | — | — |
| 卡片摘要 | `12px` | 400 | — | `1.5` |
| Footer | `12px` | 600 | — | — |

**字间距规则**：所有标题都用 `-0.03em`，比一般设计更紧。这是 Brutalism 的特征——标题紧凑有力。

---

## 四、边框体系

这是 Neo-Brutalism **最核心**的视觉特征。

### 4.1 边框宽度分级

| 级别 | 宽度 | 用途 | 视觉层级 |
|---|---|---|---|
| 重级 | `4px` | Hero 主卡、导航底部、订阅区、Footer 顶部 | 最高视觉焦点 |
| 中级 | `3px` | 侧栏卡片、新闻卡片、热门条目 | 内容容器 |
| 轻级 | `2px` | 标签、导航链接、筛选按钮、排名框、计数徽章 | 交互元素/小型标识 |

**递进规则**：视觉重要性越高 → 边框越粗。4px（焦点）→ 3px（容器）→ 2px（交互）。

### 4.2 圆角规则

| 元素类型 | `border-radius` | 说明 |
|---|---|---|
| 大容器 | `12px` | Hero 卡、订阅区，适度圆角保持"盒子"感 |
| 交互按钮/链接 | `0` | **零圆角**，纯方形，Brutalism 核心规则 |
| 标签/徽章 | `0` | 零圆角 |
| 排名框 | `0` | 零圆角 |

**原则**：容器可以圆角，交互元素必须方形。圆角仅用于"盒子"，不用于"按钮"。

---

## 五、阴影体系

硬阴影（Hard Shadow）是 Neo-Brutalism 的第二核心特征。

### 5.1 阴影分级

| 级别 | CSS 变量 | 值 | 用途 |
|---|---|---|---|
| 基础 | `--shadow` | `4px 4px 0px #000000` | 侧栏卡、新闻卡、热门条目 |
| 重级 | `--shadow2` | `6px 6px 0px #000000` | Hero 主卡、订阅区 |
| 标签级 | — | `2px 2px 0px #000000` | 标签、Logo、排名框 |
| 按钮级 | — | `2px 2px 0px #000000` | 订阅按钮 |
| 悬停扩展 | — | `6px 6px 0px` / `8px 8px 0px` | 新闻卡悬停 / Hero 悬停 |

### 5.2 阴影使用规则

1. **永远纯黑 + 无模糊**：`0px` 模糊值，硬边阴影。绝对不用 `rgba` 透明度或 `blur`
2. **右下偏移**：所有阴影都是 `Xpx Xpx`（X=Y），正方形偏移，不斜角
3. **悬停 = 阴影扩大**：悬停时阴影从 4→6 或 6→8，同时 `translate(-2px,-2px)` 让元素"浮起"，物理感极强
4. **边框粗的元素 → 阴影大**：4px 边框配 6px 阴影，3px 边框配 4px 阴影，2px 边框配 2px 阴影

### 5.3 悬停交互公式

```css
.element {
  box-shadow: 4px 4px 0px #000;
  transition: transform 0.15s, box-shadow 0.15s;
}
.element:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px #000;
}
```

- `translate` 值 = 原阴影偏移 - 新阴影偏移（方向相反），如原 4→新 6，则 translate -2
- 过渡时间 `0.15s`，比常规设计更快，Brutalism 要"干脆"

---

## 六、装饰元素

### 6.1 条纹装饰（Stripe）

```css
.stripe {
  background: repeating-linear-gradient(
    90deg,
    var(--accent2) 0px, var(--accent2) 20px,
    var(--card) 20px, var(--card) 40px
  );
}
```

- 用于 Hero 主卡顶部，宽度 8px
- 颜色用 `accent2` + `card` 交替，20px 周期
- 作用：打破纯白卡片的单调，增加"印刷品/条码"的原始感

### 6.2 Emoji 替代图标

- 标签用 emoji：`🔥 突发新闻`、`⚡ 新鲜`
- 不引入图标库（Lucide / Heroicons 等），emoji 的"粗糙感"契合 Brutalism
- 如果项目需要更正式感，可换回粗线条 SVG 图标（stroke-width ≥ 2.5）

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
| 高度 | `60px` |
| 底边框 | `4px solid #000` |
| 背景 | `#ffffff`（纯白，无模糊） |
| 布局 | flex，space-between |

**注意**：Neo-Brutalism 导航用 `sticky` 而非 `fixed`，不用 `backdrop-filter`。拒绝毛玻璃。

### 7.3 Hero 区域

| 属性 | 值 |
|---|---|
| 布局 | grid，`1.3fr 1fr` |
| 间距 | `24px` |

### 7.4 新闻网格

| 属性 | 值 |
|---|---|
| 布局 | grid，`repeat(3, 1fr)` |
| 间距 | `20px` |

### 7.5 热门列表

| 属性 | 值 |
|---|---|
| 间距 | `12px` |

---

## 八、间距体系

### 8.1 外边距节奏

| 值 | 用途 |
|---|---|
| `32px` | 区块间距、导航内边距、主区域内边距 |
| `24px` | Hero 列间距 |
| `20px` | Grid 间距、侧栏卡间距、热门条目内部 gap |
| `16px` | 导航链接间距、Hero meta 间距、热门条目 gap |
| `12px` | 热门列表间距 |
| `10px` | 品牌区 Logo-标题间距 |
| `8px` | 筛选按钮间距 |

### 8.2 内边距分级

| 级别 | 值 | 用途 |
|---|---|---|
| 大 | `32px` | Hero 主卡、订阅区 |
| 中 | `24px` | 新闻卡片 |
| 小 | `20px` | 侧栏卡片、热门条目 |
| 行 | `16px 20px` | 热门条目 |

---

## 九、响应式断点

| 断点 | 变化 |
|---|---|
| `≤ 1024px` | Hero 双列→单列；新闻网格 3→2 列 |
| `≤ 768px` | 导航内边距 32→16；链接间距 16→8；主区域 32→16；网格 2→1 列；订阅区竖排；Footer 竖排 |

---

## 十、组件清单与设计规则速查

| 组件 | 边框 | 圆角 | 阴影 | 悬停 | 特殊 |
|---|---|---|---|---|---|
| 导航栏 | 4px 底 | — | — | — | 纯白底，无模糊 |
| Logo | 3px | 0 | 2px 2px | — | 品牌色填充 |
| 导航链接 | 2px | 0 | — | 品牌色填充 | active=accent2 填充 |
| Hero 主卡 | 4px | 12px | 6px 6px | translate(-2) shadow 8px | 顶部条纹装饰 |
| 标签 | 2px | 0 | 2px 2px | — | 分类色填充+白字 |
| 侧栏卡 | 3px | 12px | 4px 4px | translate(-1) shadow 5px | — |
| 筛选按钮 | 2px | 0 | — | 灰底 | active=accent2 填充+2px shadow |
| 新闻卡 | 3px | 12px | 4px 4px | translate(-2) shadow 6px | — |
| 热门条目 | 3px | 12px | 4px 4px | translate(-2) shadow 6px | — |
| 排名框 | 2px | 0 | 2px 2px | — | accent2 填充 |
| 计数徽章 | 2px | 0 | — | — | 灰底 |
| Hero badge | 2px | 0 | — | — | 灰底 |
| 订阅区 | 4px | 12px | 6px 6px | — | accent2 填充+白字 |
| 订阅按钮 | 3px | 0 | 2px 2px | translate(-1) shadow 3px | accent 填充 |
| 订阅输入框 | 3px | 0 | — | — | 白底 |
| Footer 顶 | 4px | — | — | — | 纯黑分割线 |

---

## 十一、设计公式速查表

以下是可直接复用的 CSS 代码片段：

### 粗野主义卡片

```css
.brutal-card {
  background: var(--card);
  border: 3px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 4px 4px 0px var(--border);
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
}
.brutal-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px var(--border);
}
```

### 粗野主义标签

```css
.brutal-tag {
  display: inline-block;
  padding: 2px 8px;
  border: 2px solid #000;
  border-radius: 0;
  font-size: 10px;
  font-weight: 700;
  box-shadow: 2px 2px 0px #000;
}
.brutal-tag.hot { background: #f43f5e; color: white; }
.brutal-tag.new { background: #22c55e; color: white; }
```

### 粗野主义按钮

```css
.brutal-btn {
  padding: 8px 20px;
  background: var(--accent);
  color: white;
  border: 3px solid #000;
  border-radius: 0;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 2px 2px 0px #000;
  transition: transform 0.15s, box-shadow 0.15s;
}
.brutal-btn:hover {
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0px #000;
}
```

### 粗野主义输入框

```css
.brutal-input {
  padding: 8px 14px;
  background: white;
  border: 3px solid #000;
  border-radius: 0;
  font-weight: 500;
  outline: none;
}
```

### 条纹装饰

```css
.brutal-stripe {
  height: 8px;
  background: repeating-linear-gradient(
    90deg,
    #7c3aed 0px, #7c3aed 20px,
    #fff 20px, #fff 40px
  );
}
```

---

## 十二、适用场景与不适用场景

### 适合

- 创意工作室 / 设计机构官网
- 个人博客 / 独立开发者产品页
- 科技社区 / 开源项目展示
- 活动宣传页 / 海报式落地页
- 需要强视觉记忆点的品牌站

### 不适合

- 金融 / 医疗 / 法律等严肃行业（纯黑硬边框过于"攻击性")
- 大型企业官网（视觉风格太"小众")
- 需要大量数据表格的仪表盘（圆角 0 的按钮在密集场景不好用）
- 电商结算流程（用户需要"安全感"，Brutalism 的"反精致"会降低信任感）

---

## 十三、变体建议

如果需要微调风格方向：

| 变体 | 改什么 | 效果 |
|---|---|---|
| 更温和 | 底色换 `#fef3c7`→`#f0f9ff`（蓝白），边框换 `#000`→`#334155`（深灰） | 保留结构感但降低攻击性 |
| 更极端 | 所有圆角→0，阴影→`8px 8px`，底色→`#fef08a`（更黄） | 纯剪纸海报感 |
| 更精致 | 字体换 `Clash Grotesk`，标签加 `border-radius:4px`，阴影偏移 3px | 粗野骨架+细节柔化 |
| 轻量版 | 边框 4→2、3→1.5、2→1，阴影 4→2，底色保持暖黄 | 适合信息密集页面 |