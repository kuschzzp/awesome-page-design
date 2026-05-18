# Glassmorphism 设计系统手册

> 来源：`version-e-glass.html` — AI Pulse 毛玻璃通透版本

---

## 重要使用原则

本文件提供的是视觉风格提示，不是固定页面布局方案。示例 HTML 的页面结构仅用于统一展示和截图，不应在真实项目中照搬。后续开发时，应根据用户需求、业务流程、内容优先级和设备场景重新设计页面布局；可复用的是配色、字体、圆角、边框、阴影、质感、状态和动效等视觉语言。

---

## 一、风格定义

**Glassmorphism（毛玻璃风格）** 是 2020-2026 年在 UI 设计社区持续流行的风格。核心理念：

- **通透感**：半透明玻璃面板叠加在丰富渐变背景之上，让背景色彩透过卡片渗出
- **模糊层次**：backdrop-filter 创造景深，元素像悬浮在不同高度的玻璃片上
- **柔和发光**：径向渐变光晕模拟光源，而非硬阴影制造物理感
- **无边框视觉**：极细半透明边框（rgba(255,255,255,0.18)）取代实线
- **暗色基底**：深色渐变背景是毛玻璃效果的前提，亮色背景下玻璃感消失

---

## 二、色彩体系

### 2.1 调色板

| 角色 | CSS 变量 | 值 | 用途 |
|---|---|---|---|
| 渐变起点 | `--grad1` | `#667eea` | 导航logo渐变、body渐变成分 |
| 渐变中点 | `--grad2` | `#764ba2` | 背景渐变紫色成分 |
| 渐变粉 | `--grad3` | `#f093fb` | body底部光晕 |
| 渐变蓝 | `--grad4` | `#4facfe` | 辅助渐变 |
| 玻璃层1 | `--glass` | `rgba(255,255,255,0.15)` | 主卡片背景 |
| 玻璃层2 | `--glass2` | `rgba(255,255,255,0.25)` | hover态背景 |
| 玻璃层3 | `--glass3` | `rgba(255,255,255,0.08)` | 导航栏背景 |
| 边框 | `--border` | `rgba(255,255,255,0.18)` | 全局半透明边框 |
| 主文字 | `--text` | `#ffffff` | 纯白文字 |
| 辅文字 | `--text2` | `rgba(255,255,255,0.75)` | 75%白度文字 |
| 弱化文字 | `--text3` | `rgba(255,255,255,0.5)` | 50%白度文字 |
| 主强调 | `--accent` | `#00d4ff` | 青色强调，导航高亮、标签 |
| 副强调 | `--accent2` | `#7c5cfc` | 紫色强调，按钮渐变 |

### 2.2 背景渐变体系

body 背景为四段渐变：
```css
background: linear-gradient(135deg, #0c0e1a 0%, #1a1c3a 30%, #2d1b69 60%, #0c0e1a 100%);
```

两个固定光晕叠加：
- 左上光晕：`rgba(102,126,234,0.3)` 径向渐变，50vw×50vw
- 右下光晕：`rgba(240,147,251,0.2)` 径向渐变，60vw×60vh

### 2.3 色彩使用规则

1. **玻璃层三档**：默认15%白 → hover25%白 → 导航08%白，形成景深梯度
2. **文字三档透明度**：100% → 75% → 50%，用白色透明度取代灰色
3. **强调色仅两个**：青色 `#00d4ff` + 紫色 `#7c5cfc`，不引入更多强调色
4. **标签色系**：hot=红 `#ff6b6b`, new=绿 `#4ade80`, policy=橙 `#fb923c`, app=紫 `#a78bfa`，全部使用低透明度背景(15%) + 同色系文字

---

## 三、排版体系

| 元素 | 字体 | 字号 | 字重 | 行高 | 字间距 |
|---|---|---|---|---|---|
| 全局 | Inter, -apple-system, sans-serif | — | — | 1.6 | — |
| 导航标题 | Inter | 16px | 600 | — | -0.02em |
| Hero标题 | Inter | 26px | 700 | 1.3 | -0.03em |
| Hero描述 | Inter | 14px | — | 1.7 | — |
| 侧边标题 | Inter | 14px | 600 | 1.4 | -0.01em |
| 侧边标签 | Inter | 10px | 600 | — | — |
| 新闻标题 | Inter | 14px | 600 | 1.35 | -0.01em |
| 新闻摘要 | Inter | 12px | — | 1.6 | — |
| 趋势标题 | Inter | 13px | 500 | — | — |
| 元信息 | Inter | 11-12px | — | — | — |

---

## 四、边框/圆角/阴影体系

### 4.1 边框

| 类型 | 值 | 用途 |
|---|---|---|---|
| 全局边框 | `1px solid rgba(255,255,255,0.18)` | 所有玻璃卡片、导航、趋势项 |
| 热门标签边框 | `1px solid rgba(255,59,48,0.3)` | hero突发标签 |
| 侧边标签竖线 | `3px height, var(--accent) background` | 侧边卡片左侧装饰 |
| 导航下边框 | `1px solid rgba(255,255,255,0.18)` | sticky导航分隔线 |

### 4.2 圆角

| 元素 | 圆角值 |
|---|---|---|
| 玻璃卡片 | 24px |
| 导航logo | 8px |
| Hero标签 | 20px |
| 侧边卡片 | 16px（较小） |
| 新闻标签 | 12px |
| 趋势排名框 | 8px |
| 订阅输入框 | 12px |
| 订阅按钮 | 12px |
| 订阅栏整体 | 24px |

### 4.3 阴影

| 类型 | 值 | 用途 |
|---|---|---|---|
| 卡片阴影 | `0 8px 32px rgba(0,0,0,0.12)` | 所有玻璃卡片 |
| hover阴影 | `0 12px 40px rgba(0,0,0,0.2)` | hover态增强 |

**无硬阴影、无内阴影**——毛玻璃风格的深度完全来自 backdrop-filter 模糊，不是阴影。

---

## 五、装饰元素/交互细节

| 元素 | 实现 | 效果 |
|---|---|---|---|
| Hero光晕 | `radial-gradient(circle, rgba(0,212,255,0.15), transparent 70%)` 200×200px | 右上角青色光晕 |
| 脉搏动画 | `animation: pulse 2s infinite` → opacity 1→0.3→1 | 突发标签红点 |
| hover位移 | `translateY(-4px)` | 卡片悬浮上升 |
| hover玻璃加深 | `background: var(--glass2)` (25%白) | 模拟玻璃变厚 |
| 趋势hover | `translateX(6px)` | 趋势项右移 |
| 标签竖线 | `.side-tag::before` → 3px宽×10px高青色条 | 侧边分类前缀标记 |

---

## 六、示例布局/间距观察（非固定方案）


> 以下布局内容仅用于解释示例 HTML 如何展示该风格，不是后续项目必须采用的页面结构。真实项目应重新做信息架构和布局设计。

### 6.1 核心布局

| 区域 | 布局方式 | 宽度/间距 |
|---|---|---|---|
| 导航 | flex, sticky, height=56px | padding 32px, gap=28px |
| Hero | grid 1.2fr 1fr | gap=20px |
| 新闻网格 | grid 3列 | gap=20px |
| 趋势列表 | flex column | gap=12px |
| 订阅栏 | flex row | padding 24px 32px |
| 最大宽度 | max-width 1100px | margin auto |

### 6.2 间距值

| 用途 | 值 |
|---|---|---|
| Hero到新闻 | 40px |
| 新闻到趋势 | 40px |
| 趋势到footer | 40px |
| 卡片padding | 32px（大）/ 24px（中） |
| 侧边卡片padding | 32px |
| 趋势项padding | 16px 20px |
| 趋势项间距 | 12px |

---

## 七、响应式策略

| 断点 | 变化 |
|---|---|---|
| ≤1024px | Hero变为单列；新闻变为2列 |
| ≤768px | 导航padding减至16px；主体padding减至16px；新闻单列；订阅栏变纵向；footer变纵向 |

---

## 八、组件速查表

| 组件 | 背景 | 边框 | 圆角 | padding | 特殊 |
|---|---|---|---|---|---|
| 导航 | glass3 (8%白)+blur(24px) | border (18%白) | — | 0 32px | sticky, height 56px |
| Hero主卡 | glass(15%白)+blur(16px) | border (18%白) | 24px | 32px | hover→glass2+上移4px |
| Hero侧边 | glass+blur(16px) | border | 16px | 32px | hover→glass2+上移4px |
| 突发标签 | rgba(255,59,48,0.15) | rgba(255,59,48,0.3) | 20px | 4px 12px | 红脉搏点 |
| 新闻卡片 | glass+blur(16px) | border | 16px | 24px | hover→上移4px |
| 过滤按钮 | glass | border | 20px | 5px 14px | active→accent蓝底 |
| 趋势项 | glass+blur(12px) | border | 16px | 16px 20px | hover→右移6px |
| 趋势排名 | rgba(0,212,255,0.1)+border | — | 8px | — | 28×28px |
| 订阅栏 | glass+blur(16px) | border | 24px | 24px 32px | 横向flex |
| 订阅输入 | glass | border | 12px | 8px 16px | 200px宽 |
| 订阅按钮 | gradient(accent→accent2) | none | 12px | 8px 20px | 渐变按钮 |

---

## 九、CSS变量/代码片段

```css
:root {
  --grad1: #667eea;
  --grad2: #764ba2;
  --grad3: #f093fb;
  --grad4: #4facfe;
  --glass: rgba(255,255,255,0.15);
  --glass2: rgba(255,255,255,0.25);
  --glass3: rgba(255,255,255,0.08);
  --border: rgba(255,255,255,0.18);
  --text: #ffffff;
  --text2: rgba(255,255,255,0.75);
  --text3: rgba(255,255,255,0.5);
  --accent: #00d4ff;
  --accent2: #7c5cfc;
  --shadow: 0 8px 32px rgba(0,0,0,0.12);
}

body {
  background: linear-gradient(135deg, #0c0e1a 0%, #1a1c3a 30%, #2d1b69 60%, #0c0e1a 100%);
}

.glass-card {
  background: var(--glass);
  backdrop-filter: blur(16px) saturate(1.5);
  border: 1px solid var(--border);
  border-radius: 24px;
  box-shadow: var(--shadow);
}
```

---

## 十、适用/不适用场景

### 适用

- 科技产品官网（暗色+通透=未来感）
- AI/数据平台仪表板
- 暗色系社交媒体
- 音乐/视频流媒体平台
- 品牌展示页（奢侈/高端）

### 不适用

- 新闻媒体（文字密度高，通透背景降低可读性）
- 大量表单的商务应用（毛玻璃降低输入清晰度）
- 印刷品设计（backdrop-filter无法在纸上实现）
- 需高对比度无障碍场景（白文字在半透明背景上对比度不足）
- 老年用户为主的界面

---

## 十一、与其他风格对比

| 维度 | Glassmorphism | Neo-Brutalism | Aurora Gradient | Swiss Editorial |
|---|---|---|---|---|
| 背景 | 暗色渐变+光晕 | 暖黄单色 | 暗色+极光blob | 白色纯净 |
| 卡片 | 半透明玻璃 | 纯白硬边框 | 半透明+光晕 | 白色细边框 |
| 深度来源 | blur滤镜 | 硬阴影 | 光晕+blur | 微阴影 |
| 边框 | 半透明 | 纯黑粗线 | 半透明 | 极细灰线 |
| 强调色 | 青+紫 | 粉红+紫 | 四色极光 | 红色 |
| 字体 | Inter | 系统字体 | Outfit | Helvetica |
| 触感 | 通透悬浮 | 纸质剪纸 | 流光 | 印刷品 |

---

## 十二、变体建议

| 变体 | 修改方向 | 效果 |
|---|---|---|---|
| 亮色版 | 背景改为亮渐变，玻璃改为暗色半透明 | 适合企业仪表板 |
| 极简版 | 减少光晕元素，增加留白 | 适合工具型界面 |
| 赛博版 | 增加霓虹发光元素和网格线 | 适合游戏/黑客主题 |
| 温暖版 | 渐变改为暖色（橙/金），强调色改为琥珀 | 适合生活方式品牌 |

---

## 十三、动效/微交互

| 动效 | 触发 | 实现 | 持续时间 |
|---|---|---|---|---|
| 卡片悬浮 | hover | translateY(-4px) + shadow增强 | 0.3s |
| 玻璃加深 | hover | background 15%→25%白 | 0.3s |
| 脉搏点 | 常态 | opacity 1→0.3→1 | 2s infinite |
| 趋势右移 | hover | translateX(6px) | 0.25s |
| 过滤切换 | click | class切换 active | 0.2s |
| 导航高亮 | hover | color→accent | 0.2s |

---

## 十四、实施指南/注意事项

1. **backdrop-filter 兼容性**：Safari 需 `-webkit-backdrop-filter`，Firefox 2024+ 才支持，旧版需 fallback 背景
2. **性能警告**：blur 滤镜消耗 GPU，大量玻璃卡片会导致滚动卡顿，建议限制同时可见的blur元素数量
3. **背景必须有内容**：纯色背景上的玻璃卡片失去意义，背景必须丰富（渐变/图片/光晕）
4. **对比度陷阱**：白文字在半透明背景上对比度不稳定，WCAG AA 可能不达标，需测试各背景区域
5. **glass变量三档必须**：8%/15%/25% 三档是核心景深系统，不要随意改为其他透明度
6. **hover 必须包含背景加深**：毛玻璃hover只做位移不做背景加深会显得"空洞"，必须同时修改glass透明度
7. **圆角24px是灵魂**：所有主卡片必须24px圆角，这是毛玻璃的"泡泡"感来源，不要改为小圆角