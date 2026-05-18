# Terminal Hacker 设计系统手册

> 来源：`version-j-terminal.html` — AI Pulse 终端黑客风格

---

## 重要使用原则

本文件提供的是视觉风格提示，不是固定页面布局方案。示例 HTML 的页面结构仅用于统一展示和截图，不应在真实项目中照搬。后续开发时，应根据用户需求、业务流程、内容优先级和设备场景重新设计页面布局；可复用的是配色、字体、圆角、边框、阴影、质感、状态和动效等视觉语言。

---

## 一、风格定义

**Terminal Hacker（终端黑客风）** 是从黑客文化 / Unix 终端 / 早期 BBS 论坛演化而来的设计风格，在开发者社区、个人博客、开源项目文档中极为流行。核心理念：

- **纯黑底色**：`#0a0a0a` 近纯黑，不是灰黑，不是深蓝黑，是 CRT 屏幕关闭时的黑
- **绿色主文字**：`#00ff41` 是经典终端绿，来自早期 CRT 显示器的磷光绿色。这是整个风格的 DNA
- **等宽字体唯一**：全站只有一个字体族 `monospace`，无衬线/衬线混排，纯终端美学
- **命令行前缀**：用 `$` `>` `//` `⚠` 等 ASCII 符号做装饰前缀，模拟终端命令行
- **极薄边框**：所有边框 1px（而非 Brutalism 的 2-4px 或 Y2K 的 2px），像终端窗口的分割线
- **绿色发光**：悬停时 `box-shadow: 0 0 6px rgba(0,255,65,0.4)`，像 CRT 屏幕上的荧光闪烁
- **CRT 横纹**：body 背景有 `repeating-linear-gradient` 横纹，模拟老式显示器扫描线
- **闪烁光标**：导航右侧有 8×14px 绿色方块光标，step-end 1s 闪烁，像真实终端

---

## 二、色彩体系

### 2.1 调色板

| 角色 | CSS 变量 | 值 | 用途 |
|---|---|---|---|
| 页面背景 | `--bg` | `#0a0a0a` | 近纯黑，CRT 黑 |
| 二级背景 | `--bg2` | `#111111` | 导航栏、订阅区 |
| 卡片背景 | `--card` | `#141414` | 所有内容容器，比背景稍亮 |
| 主文字 | `--text` | `#00ff41` | 经典终端绿，标题、标签 |
| 辅助文字 | `--text2` | `#00cc33` | Green-600，描述文字 |
| 弱化文字 | `--text3` | `#006622` | Green-800，元信息、注释 |
| 青色 | `--cyan` | `#00e5ff` | 导航激活、区块标题、排名 |
| 红色 | `--red` | `#ff0040` | 突发标签、HOT 标签 |
| 橙色 | `--orange` | `#ff8c00` | 研究分类、POL 标签 |
| 紫色 | `--purple` | `#b388ff` | 行业分类 |
| 主边框 | `--border` | `#00ff41` | 与主文字同色，终端绿边框 |
| 二级边框 | `--border2` | `#003311` | 3% 亮度绿，默认状态的边框 |

### 2.2 色彩使用规则

1. **三级绿色文字是灵魂**：`#00ff41`（亮绿）→ `#00cc33`（中绿）→ `#006622`（暗绿），三级亮度递减对应三种文字层级。这不是"灰色层级"，而是"绿色亮度层级"
2. **边框两级**：活跃态用 `--border`（终端绿），默认态用 `--border2`（3% 绿）。悬停时边框从暗绿→亮绿
3. **cyan 是唯一非绿色功能性色**：只用于导航激活、区块标题前缀、排名数字。不用于标签填充
4. **标签不填充**：Terminal 风格的标签是纯文字色（`color`），不加背景填充。HOT 是红色文字，NEW 是绿色文字，APP 是 cyan 文字，POL 是橙色文字。与 Brutalism/Y2K 的"填充标签"截然不同
5. **红底标签例外**：只有"突发 ALERT"标签是红底+白字填充，这是唯一打破"标签不填充"规则的元素，因为它的优先级最高

### 2.3 绿色亮度推导公式

Terminal 风格的文字层级不用灰度区分，用**同一色相的亮度**区分：

| 层级 | 亮度 | 推导 |
|---|---|---|
| 主文字 | `100%` | 纯色 `#00ff41` |
| 辅助文字 | `80%` | 同色相降亮度 `#00cc33` |
| 弱化文字 | `40%` | 同色相降亮度 `#006622` |

如果要换主题色（比如用 cyan 代替 green），公式不变——三个层级是 `#00e5ff` / `#00b8d4` / `#005c6e`。

### 2.4 调色板变体推导

| 变体 | 主色 | 三级文字 | 辅助色 | 底色 |
|---|---|---|---|---|
| 经典终端 | `#00ff41` | `#00cc33` / `#006622` | cyan / red / orange / purple | `#0a0a0a` |
| Amber 终端 | `#ffb000` | `#cc8800` / `#664400` | cyan / red | `#0a0a0a` |
| Cyan 终端 | `#00e5ff` | `#00b8d4` / `#005c6e` | green / red | `#0a0a0a` |
| White 终端 | `#e0e0e0` | `#b0b0b0` / `#606060` | cyan / red / orange | `#0a0a0a` |

---

## 三、排版体系

### 3.1 字体

| 属性 | 值 | 说明 |
|---|---|---|
| 唯一字体 | `JetBrains Mono` | 开源等宽字体，专为开发者设计，可读性远优于 Courier |
| 回退 | `monospace` | 系统默认等宽 |
| 字重档位 | 400 / 500 / 600 / 700 | 600 是主力 |

**字体选择原则**：JetBrains Mono / Fira Code / Source Code Pro / IBM Plex Mono / Monaspace Neon 都适合。关键是"开发者字体"而非"设计字体"。避免 Courier New（太老）、避免 Comic Sans（完全不搭）。

**核心原则**：全站只用等宽字体。这是 Terminal 风格最根本的规则——不混排 sans-serif 或 serif。一切看起来都像终端输出。

### 3.2 字号层级

| 元素 | 字号 | 字重 | 字间距 | 行高 |
|---|---|---|---|---|
| Hero 标题 | `22px` | 700 | `-0.02em` | `1.3` |
| 区块标题 | `12px` | 700 | — | — |
| 导航品牌 | `12px` | 700 | — | — |
| 侧栏标题 | `13px` | 600 | — | `1.3` |
| 新闻卡片标题 | `13px` | 600 | — | `1.3` |
| Hero 描述 | `13px` | 400 | — | `1.6` |
| 热门条目 | `12px` | 500 | — | — |
| 订阅标题 | `13px` | 700 | — | — |
| 标签 | `9-10px` | 700 | — | — |
| 卡片摘要 | `11px` | 400 | — | `1.5` |
| 元信息 | `9-10px` | 600 | — | — |
| Footer | `10px` | 400 | — | — |

**字号比一般网站小**：Terminal 风格的字号普遍比正常设计小 2-4px，因为等宽字体在同等字号下视觉面积更大，且终端界面本身就用小字号。12px 的区块标题在 sans-serif 设计中太小，但在等宽字体中恰到好处。

---

## 四、边框体系

### 4.1 边框宽度

Terminal 风格的边框极薄——全部 **1px**，不分层级。

| 状态 | 边框 | 值 | 说明 |
|---|---|---|---|
| 默认 | `--border2` | `1px solid #003311` | 3% 绿色，近乎隐形的分割线 |
| 悬停/活跃 | `--border` | `1px solid #00ff41` | 终端绿，悬停时边框"亮起" |
| 特殊 | 红底标签 | `1px` 无特殊值 | ALERT 标签用 red 背景 |

**与 Brutalism/Y2K 的核心区别**：Brutalism 用 4/3/2 三级边框制造"物理感"，Y2K 用统一 2px 制造"窗口感"，Terminal 用 1px 制造"线框感"——像终端窗口的薄分割线。

### 4.2 圆角规则

| 元素类型 | `border-radius` | 说明 |
|---|---|---|
| 全局默认 | `2px`（`--radius`） | 极微圆角，几乎方形 |

**原则**：Terminal 风格只用 `0` 或 `2px`。2px 是"像素级圆角"——在终端世界，圆角是多余的装饰，2px 是最小的妥协。

---

## 五、阴影体系（绿色发光）

Terminal 风格不用传统投影，用**绿色发光（Phosphor Glow）**，模拟 CRT 磷光屏幕的荧光效果。

### 5.1 发光定义

| 级别 | CSS 变量 | 值 | 用途 |
|---|---|---|---|
| 基础发光 | `--glow` | `0 0 6px rgba(0,255,65,0.4)` | 新闻卡悬停 |

### 5.2 发光使用规则

1. **单层结构**：Terminal 发光比 Y2K 简单——只有一层 `0 0 6px rgba(X,0.4)`，不做内外双层。像 CRT 屏幕的微弱荧光
2. **默认无阴影**：未悬停时 `box-shadow: none`。发光只在悬停态出现
3. **边框+发光联动**：悬停时边框从 `--border2`→`--border`（暗绿→亮绿）同时加发光，双重"亮起"效果
4. **发光只用绿色**：不像 Y2K 分 cyan/magenta，Terminal 发光只用主文字色（绿色）。唯一例外：订阅区用绿色发光（因为它是全站唯一带发光的默认态元素）

### 5.3 悬停交互公式

```css
.terminal-card {
  background: var(--card);
  border: 1px solid var(--border2);  /* 暗绿，几乎隐形 */
  border-radius: 2px;
  padding: 16px;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.terminal-card:hover {
  border-color: var(--border);  /* 亮绿，边框"亮起" */
  box-shadow: 0 0 6px rgba(0,255,65,0.4);  /* 绿色荧光 */
}
```

---

## 六、装饰元素与动画

### 6.1 CRT 横纹背景

```css
body {
  background-image:
    repeating-linear-gradient(
      0deg,
      rgba(0,255,65,0.03) 0px,
      rgba(0,255,65,0.03) 1px,
      transparent 1px,
      transparent 2px
    );
}
```

**参数规则**：
- 颜色：主文字色（绿色）的 3% 透明度
- 纹理：`1px 实线 + 1px 间隔 = 2px 周期`
- 方向：只做水平（`0deg`），不做垂直，模拟 CRT 横纹扫描线
- 这是**最关键的背景纹理**——没有它，黑底+绿字只是"暗色主题"，有了它才是"终端风格"

### 6.2 闪烁光标

```css
.cursor {
  width: 8px; height: 14px;
  background: var(--text);  /* 终端绿 */
  animation: cursor-blink 1s step-end infinite;
}
@keyframes cursor-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
```

**参数规则**：
- 尺寸：`8px × 14px`，模拟字符光标（一个字符宽度的一半 + 一个字符高度）
- 动画：`step-end` 而非 `ease`，无过渡——像真实终端光标的硬切换
- 周期：1s，比 Brutalism/Y2K 的 1.5-2s 更快
- 位置：导航栏右侧，替代传统导航的"日期/状态"区域

### 6.3 命令行前缀

Terminal 风格的标志性装饰——用 ASCII 符号做内容前缀：

| 位置 | 前缀 | CSS 实现 | 说明 |
|---|---|---|---|
| Hero 主卡 | `$ cat /news/headline.txt` | `::before` content | 像在终端读文件 |
| 侧栏卡片 | `>` | `::before` content | 像命令行续行提示符 |
| 区块标题 | `// LATEST` | `::before` content `// ` | 像代码注释 |
| 订阅标题 | `[ SUBSCRIBE ]` | `::before/::after` | 像命令行参数方括号 |
| 导航品牌 | `❯ ai-pulse` | HTML 结构 | 像命令行提示符 |

**符号选择规则**：
- `$` — 普通用户命令行提示符（最常用）
- `>` — 续行/输出提示符
- `//` — 注释标记
- `[ ]` — 命令行参数/选项
- `⚠` — 警告符号（用于 ALERT 标签）
- `❯` — Fish shell 风格提示符（现代终端感）

### 6.4 标签命名规则

Terminal 标签用英文缩写而非中文全称，像终端命令的短参数：

| Brutalism 标签 | Y2K 标签 | Terminal 标签 | 说明 |
|---|---|---|---|
| 热门 | HOT | HOT | 像命令行 flag |
| 新鲜 | NEW | NEW | 像版本标记 |
| 政策 | POLICY | POL | 像缩写参数 |
| 应用 | APP | APP | 像命令名 |
| 突发 | 🔥 突发 | ⚠ ALERT | 像系统警告 |

---

## 七、示例布局观察（非固定方案）


> 以下布局内容仅用于解释示例 HTML 如何展示该风格，不是后续项目必须采用的页面结构。真实项目应重新做信息架构和布局设计。

### 7.1 全局容器

| 属性 | 值 | 说明 |
|---|---|---|
| 最大宽度 | `1000px` | 比 Brutalism/Y2K 的 1100px 略窄，终端窗口较窄 |
| 内边距 | `24px` | 比 Brutalism/Y2K 的 32px 更紧凑 |
| 区块间距 | `24px` | 终端界面间距更紧凑 |

### 7.2 导航栏

| 属性 | 值 | 说明 |
|---|---|---|
| 定位 | `sticky`，top 0 | |
| 高度 | `40px` | 比 Brutalism 的 60px 和 Y2K 的 52px 更低 |
| 背景 | `#111111`（二级背景） | 不是纯白，不是毛玻璃，是终端窗口背景 |
| 底边框 | `1px solid #003311` | 暗绿薄线 |
| 布局 | flex，space-between，三段：品牌/链接/光标 |

### 7.3 Hero 区域

| 属性 | 值 |
|---|---|
| 布局 | grid，`1.3fr 1fr` |
| 间距 | `16px` |

### 7.4 新闻网格

| 属性 | 值 |
|---|---|
| 布局 | grid，`repeat(3, 1fr)` |
| 间距 | `12px` |

---

## 八、间距体系

### 8.1 外边距节奏

| 值 | 用途 |
|---|---|
| `24px` | 主区域内边距、区块间距 |
| `16px` | Hero 列间距、侧栏卡间距、热门条目 gap、导航链接间距 |
| `14px` | 热门条目内边距 |
| `12px` | Hero meta gap、热门条目内部 gap、筛选按钮间距 |
| `8px` | 订阅表单 gap、Footer 链接间距 |

### 8.2 内边距分级

| 级别 | 值 | 用途 |
|---|---|---|
| 大 | `24px` | Hero 主卡、订阅区 |
| 中 | `16px` | 侧栏卡、新闻卡 |
| 行 | `10px 14px` | 热门条目 |

**比 Brutalism/Y2K 更紧凑**：Terminal 风格的整体间距比其他风格减少约 20%，因为终端界面是信息密集型——更多的内容、更少的留白。

---

## 九、响应式断点

| 断点 | 变化 |
|---|---|
| `≤ 1024px` | Hero 双列→单列；网格 3→2 列 |
| `≤ 768px` | 导航内边距 24→12；主区域 24→12；Hero 标题 22→18；网格 2→1；订阅竖排；Footer 竖排 |

---

## 十、组件清单与设计规则速查

| 组件 | 边框 | 圆角 | 默认阴影 | 悬停 | 特殊 |
|---|---|---|---|---|---|
| 导航栏 | 1px 底（暗绿） | — | — | — | 右侧闪烁光标 |
| 导航品牌 | — | — | — | — | `❯ ai-pulse` 提示符 |
| 导航链接 | — | — | — | text→green | active=cyan 色 |
| Hero 主卡 | 1px（暗绿） | 2px | — | 亮绿边框+绿色发光 | `::before` `$ cat /news/headline.txt` |
| ALERT 标签 | — | 2px | — | — | 红底+白字+`⚠` |
| 侧栏卡 | 1px（暗绿） | 2px | — | — | `::before` `>` 前缀 |
| 区块标题 | — | — | — | — | `::before` `//` 注释前缀+cyan色 |
| 筛选按钮 | 1px（暗绿） | 2px | — | 亮绿边框 | active=cyan边框+cyan色 |
| 新闻卡 | 1px（暗绿） | 2px | — | 亮绿边框+绿色发光 | — |
| 标签（HOT/NEW等） | — | — | — | — | 纯文字色，无背景填充 |
| 热门条目 | 1px（暗绿） | 2px | — | cyan 边框 | — |
| 排名 | — | — | — | — | cyan 色，纯文字 |
| 订阅区 | 1px（亮绿） | 2px | 绿色发光（默认态） | — | `[ SUBSCRIBE ]` 方括号标题 |
| 订阅按钮 | 1px（亮绿） | 2px | — | — | 绿底+黑字 |
| 订阅输入框 | 1px（暗绿） | 2px | — | cyan 边框 | 黑底+绿字 |
| Footer 顶 | 1px（暗绿） | — | — | — | `ai-pulse v2026.05 | uptime: 99.9%` |

---

## 十一、设计公式速查表

### 终端卡片

```css
.terminal-card {
  background: #141414;
  border: 1px solid #003311;  /* 暗绿 */
  border-radius: 2px;
  padding: 16px;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.terminal-card:hover {
  border-color: #00ff41;  /* 亮绿 */
  box-shadow: 0 0 6px rgba(0,255,65,0.4);  /* 磷光发光 */
}
```

### 终端标签

```css
.terminal-tag {
  font-size: 9px;
  font-weight: 700;
  padding: 1px 4px;
  /* 不加背景填充，只用文字色 */
}
.terminal-tag.hot  { color: #ff0040; }
.terminal-tag.new  { color: #00ff41; }
.terminal-tag.app  { color: #00e5ff; }
.terminal-tag.pol  { color: #ff8c00; }
```

### 终端按钮

```css
.terminal-btn {
  padding: 6px 14px;
  background: #00ff41;
  color: #0a0a0a;
  border: 1px solid #00ff41;
  border-radius: 2px;
  font-weight: 700;
  font-family: monospace;
  cursor: pointer;
}
```

### 终端输入框

```css
.terminal-input {
  padding: 6px 12px;
  background: #0a0a0a;
  border: 1px solid #003311;
  border-radius: 2px;
  font-size: 11px;
  font-family: monospace;
  color: #00ff41;
  outline: none;
}
.terminal-input:focus {
  border-color: #00e5ff;  /* focus 用 cyan 而非 green */
}
```

### CRT 横纹背景

```css
.crt-scanlines {
  background-image:
    repeating-linear-gradient(
      0deg,
      rgba(0,255,65,0.03) 0px,
      rgba(0,255,65,0.03) 1px,
      transparent 1px,
      transparent 2px
    );
}
```

### 闪烁光标

```css
.cursor-blink {
  width: 8px; height: 14px;
  background: #00ff41;
  animation: blink 1s step-end infinite;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
```

### 命令行前缀

```css
/* $ 前缀（命令） */
.prefix-cmd::before {
  content: '$ cat /news/headline.txt';
  font-size: 10px;
  color: #006622;  /* 暗绿注释色 */
  margin-bottom: 12px;
  display: block;
}

/* > 前缀（续行） */
.prefix-continue::before {
  content: '> ';
  color: #006622;
  font-size: 10px;
}

/* // 前缀（注释） */
.prefix-comment::before {
  content: '// ';
  color: #006622;
}

/* [ ] 前缀（参数） */
.prefix-param::before { content: '[ '; color: #00e5ff; }
.prefix-param::after  { content: ' ]'; color: #00e5ff; }
```

---

## 十二、适用场景与不适用场景

### 适合

- 开发者工具 / CLI 工具官网（Terminal 风格天然契合开发者文化）
- 开源项目文档站 / GitHub README 附属页面
- 个人技术博客 / 程序员 Portfolio
- 数据监控仪表盘 / DevOps 面板（横纹+绿字+发光是监控屏的标配）
- API 文档站点（`$ curl` 前缀天然适合）
- 黑客马拉松 / 安全会议活动页

### 不适合

- 任何面向非技术用户的产品（普通人看到黑底绿字会觉得"黑客/病毒"）
- 电商 / 消费品牌（完全缺乏购买欲暗示）
- 需要大量长文阅读的内容站（等宽字体的阅读效率远低于 proportional 字体）
- 移动端优先的应用（Terminal 在小屏幕上字号过小）
- 需要"温暖/信任/安全"情绪的品牌站

---

## 十三、与 Neo-Brutalism / Retro Y2K 的对比

| 维度 | Neo-Brutalism | Retro Y2K | Terminal Hacker |
|---|---|---|---|
| 底色 | 暖黄 `#fef3c7` | 浅靛蓝 `#e0e7ff` | 近纯黑 `#0a0a0a` |
| 主文字 | 纯黑 `#000` | 深靛蓝 `#312e81` | 终端绿 `#00ff41` |
| 文字层级 | 黑→暖灰→浅暖灰 | 靛蓝→靛蓝7→靛蓝5 | 绿100→绿80→绿40（同色相亮度） |
| 强调色 | Rose+Violet | Cyan+Magenta+Lime | Cyan（唯一非绿色） |
| 阴影 | 硬阴影 `4px 4px 0 #000` | 霓虹发光双层 | 磷光发光单层 |
| 边框 | 4/3/2 三级 | 统一 2px | 统一 1px |
| 圆角 | 容器12px/交互0 | 统一 4px | 统一 2px |
| 字体 | Space Grotesk+monospace回退 | Chakra Petch+monospace双节奏 | JetBrains Mono 纯等宽 |
| 标签 | 色块填充+黑边框 | 霓虹色填充+深靛蓝边框 | 纯文字色，无填充 |
| 动画 | 脉冲点 | 扫描线+闪烁灯+发光 | CRT横纹+闪烁光标+边框亮起 |
| 装饰 | 条纹+emoji | 网格底纹+扫描线+ASCII | CRT横纹+命令行前缀+光标 |
| 情绪 | "反精致、物理感" | "科技怀旧、数字前沿" | "终端美学、开发者文化" |

---

## 十四、变体建议

| 变体 | 改什么 | 效果 |
|---|---|---|
| Amber 终端 | 主文字换 `#ffb000`（琥珀色），横纹换 amber 3% | 早期 IBM 终端风格，比绿色更暖 |
| Cyan 终端 | 主文字换 `#00e5ff`，横纹换 cyan 3% | 现代 VS Code 暗色主题风格 |
| White 终端 | 主文字换 `#e0e0e0`，标签色保留 cyan/red/orange | 更通用的暗色主题，降低"黑客感" |
| 更极端 | 所有标签加 `::before` 前缀（如 `::before: '[HOT]'`），加入 `::after` 行号，Footer 加 `uptime` 和 `mem: 128MB` | 纯终端 UI 模拟 |
| 轻量版 | 去掉 CRT 横纹，边框换 `rgba(255,255,255,0.08)`，标签加半透明填充 | 适合信息密集页面，降低"装饰噪音" |
| Terminal × Y2K 混合 | 黑底保留，主文字换 Y2K 三色（标题 cyan，描述 green，标签 magenta/lime），扫描线动画 | "暗底赛博朋克"——两种风格的暗色交集 |