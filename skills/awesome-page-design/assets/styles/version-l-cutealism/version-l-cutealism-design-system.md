# Cute-alism 设计系统手册

> 来源：`version-l-cutealism.html` — AI Pulse 卡哇伊粗野碰撞版本

---

## 重要使用原则

本文件提供的是视觉风格提示，不是固定页面布局方案。示例 HTML 的页面结构仅用于统一展示和截图，不应在真实项目中照搬。后续开发时，应根据用户需求、业务流程、内容优先级和设备场景重新设计页面布局；可复用的是配色、字体、圆角、边框、阴影、质感、状态和动效等视觉语言。

---

## 一、风格定义

**Cute-alism（可爱主义）** 是 2026 年 VistaPrint/99designs 报告中的头号趋势。核心理念：

- **矛盾碰撞**：卡哇伊(kawaii)甜美 + 粗野主义(brutalist)硬朗，两种极端美学强行嫁接
- **贴纸美学**：emoji作为装饰元素散落页面，像贴纸覆盖的剪贴簿
- **荧光笔标记**：关键词用荧光黄底标记，模拟手写笔记标注重点
- **硬阴影+粗边框**：brutalist的3px纯黑边框+硬阴影系统，但配色是粉色系
- **圆角药丸**：所有交互元素50px圆角药丸形状，与方形brutalist形成反差

---

## 二、色彩体系

### 2.1 调色板

| 角色 | CSS 变量 | 值 | 用途 |
|---|---|---|---|
| 页面背景 | `--yellow` | `#FFE66D` | 荧光黄底色，核心灵魂色 |
| 主粉色 | `--pink` | `#FF69B4` | 导航、标签底色 |
| 深粉色 | `--hot-pink` | `#FF1493` | 硬阴影色、热门标签 |
| 浅粉 | `--bubblegum` | `#FFB6C1` | 次级粉色 |
| 薄荷绿 | `--mint` | `#98FB98` | 标签底色、热度条 |
| 天蓝 | `--sky` | `#87CEEB` | 标签底色 |
| 淡紫 | `--lavender` | `#lavender` | 趋势面板底色 |
| 橙色 | `--orange` | `#FFA500` | 伦理标签 |
| 红色 | `--red` | `#FF4444` | 热度徽章 |
| 纯黑 | `--black` | `#1A1A1A` | 边框、硬阴影、文字 |
| 纯白 | `--white` | `#FFF` | 卡片底色、标签底色 |

### 2.2 阴影色体系

| 角色 | 值 | 用途 |
|---|---|---|---|
| 默认硬阴影 | `4px 4px 0 var(--black)` | 所有卡片、标签 |
| 粉色硬阴影 | `4px 4px 0 var(--hot-pink)` | hero区域 |
| 黄色硬阴影 | `4px 4px 0 #E6D200` | 暂未使用但预留 |
| hover硬阴影 | `7px 7px 0 var(--hot-pink)` | 卡片hover |

### 2.3 色彩使用规则

1. **荧光黄是灵魂**：`#FFE66D` 是页面底色，绝对不能换成白色或灰色
2. **硬阴影可以是彩色**：brutalism通常阴影是纯黑，但Cute-alism允许阴影用粉色
3. **分类颜色映射**：LLM=粉色、Vision=薄荷绿、Robot=天蓝、Ethics=橙色、Startup=淡紫、Chip=深粉色、Regulation=黄色
4. **标签底色规则**：颜色直接填色+白字或黑字+纯黑边框，像贴纸

---

## 三、排版体系

| 元素 | 字体 | 字号 | 字重 | 用途 |
|---|---|---|---|---|
| 标题/系统文字 | Space Mono (monospace) | 11-48px | 400/700 | 所有标签、导航、meta、按钮 |
| 正文/描述 | Nunito (rounded sans) | 13-18px | 400/600/700/800 | 所有描述文字、卡片正文 |
| Hero标题 | Space Mono | 48px | 700 | 主标题，monospace粗体 |
| 卡片标题 | Nunito | 16-22px | 800 | 极粗圆润 |
| Meta信息 | Space Mono | 11px | — | 时间、热度等 |

**双字体碰撞体系**：Space Mono（等宽、硬朗）代表brutalist面，Nunito（圆润、软胖）代表kawaii面。两种字体在同一页面中交替出现，形成视觉矛盾。

---

## 四、边框/圆角/阴影体系

### 4.1 边框

| 类型 | 值 |
|---|---|---|
| 全局主边框 | `3px solid var(--black)` |
| 导航边框 | 同上 |
| 卡片边框 | 同上 |
| 标签边框 | `2px solid var(--black)` |
| 热度徽章 | `1px solid var(--black)` |
| Logo白色内边框 | `2px solid var(--white)` |
| footer粉色边框 | `3px solid var(--pink)` |

### 4.2 圆角（矛盾体系）

| 元素 | 圆角 | 说明 |
|---|---|---|---|
| 卡片 | 16px | 大圆角，kawaii面 |
| 导航标签 | 20px | 药丸形 |
| hero关键词标签 | 8px | 小圆角，brutalist面 |
| Logo | 12px | 中圆角 |
| 热度标签 | 50px | 完全药丸形 |
| 过滤标签 | 50px | 完全药丸形 |
| 订阅输入 | 50px | 完全药丸形 |
| 订阅按钮 | 50px | 完全药丸形 |
| footer链接 | 50px | 完全药丸形 |

**圆角矛盾原则**：功能性导航/输入=50px药丸（kawaii），内容卡片=16px适中，边框/硬阴影=brutalist面（0px或小圆角）。

### 4.3 阴影

| 类型 | 值 |
|---|---|---|
| 卡片默认 | `4px 4px 0 var(--black)` |
| 卡片hover | `7px 7px 0 var(--hot-pink)` |
| hero | `4px 4px 0 var(--hot-pink)` |
| 标签 | `3px 3px 0 var(--black)` |
| 导航标签 | `3px 3px 0 var(--black)` |
| 订阅box | `6px 6px 0 var(--hot-pink)` |
| footer | 无额外阴影 |

---

## 五、装饰元素/交互细节

| 元素 | 实现 | 效果 |
|---|---|---|---|
| 背景贴纸 | 8个fixed定位emoji装饰（🌸✿💖★🧸🌈♡🦋） | 30%透明度，float动画6s |
| hero右上圆 | 150×150px pink圆形+3px黑边框 | 模拟贴纸 |
| hero右上emoji | 🤖✨ 60px字号 | 叠在粉色圆上 |
| Logo花符号 | `::after` → ✿ | logo右上角小花 |
| 关键词星标 | `::after` → ★ | highlight标签右上星 |
| 卡片emoji | 右上角28px emoji | 每卡片一个主题emoji |
| 卡片贴纸 | 右下角24px emoji | rotate 15deg的贴纸 |
| Featured星标 | `::before` → 🔥 40px | featured卡上方火焰 |
| 每日速递信 | `::before` → 💌 40px | 每日速递上方信封 |
| 订阅橙心 | `::before` → 🧡 36px | 订阅box上方心 |
| footer花串 | `::before` → 🌸🌸🌸 | footer上方花串 |
| 点击星星 | JS click事件随机emoji（✨🌸💖★✿♡） | 页面任意点击产生0.8s动画星星 |
| hover位移 | translate(-2px,-2px)或(-3px,-3px) | 卡片/标签hover上浮 |

---

## 六、示例布局/间距观察（非固定方案）


> 以下布局内容仅用于解释示例 HTML 如何展示该风格，不是后续项目必须采用的页面结构。真实项目应重新做信息架构和布局设计。

| 区域 | 布局 | 间距 |
|---|---|---|---|
| 导航 | flex, sticky | padding 16px 24px |
| Hero | single column | padding 40px, margin-bottom 20px |
| 新闻网格 | grid auto-fill, minmax(280px, 1fr) | gap 16px |
| Featured卡 | grid-column span 2 | padding 30px |
| 每日速递 | flex column | gap 10px |
| 侧边双栏 | grid 2fr 1fr | gap 16px |
| 订阅box | single column, text-align center | padding 30px |
| footer | text-align center | padding 30px |
| 最大宽度 | 1200px | padding 20px |

---

## 七、响应式策略

| 断点 | 变化 |
|---|---|---|
| ≤768px | Hero标题28px、Featured单列、侧边单列、导航纵向 |

---

## 八、组件速查表

| 组件 | 背景 | 边框 | 圆角 | 阴影 | hover |
|---|---|---|---|---|---|---|
| 导航 | pink | 3px黑 | — | 4px黑 | 标签hover→mint底 |
| 导航标签 | white | 2px黑 | 20px | 3px黑 | 5px黑+上浮 |
| Hero | white | 3px黑 | — | 4px粉 | — |
| 卡片 | white | 3px黑 | 16px | 4px黑 | 7px粉+上浮 |
| Featured | pink | 4px黑 | 20px | 6px黑 | — |
| 每日速递 | mint | 4px黑 | 20px | 6px黑 | 条目→4px黑+上浮 |
| 趋势面板 | lavender | 3px黑 | 16px | 4px黑 | — |
| 快速入口 | pink | 3px黑 | 16px | 4px黑 | 条目→3px黑+上浮+黄底 |
| 订阅box | white | 4px黑 | 20px | 6px粉 | 输入→5px粉focus |
| footer | black | 3px粉 | 16px | — | 链接→pink底+scale |

---

## 九、CSS变量/代码片段

```css
:root {
  --pink: #FF69B4;
  --hot-pink: #FF1493;
  --bubblegum: #FFB6C1;
  --yellow: #FFE66D;
  --mint: #98FB98;
  --sky: #87CEEB;
  --lavender: #E6E6FA;
  --orange: #FFA500;
  --red: #FF4444;
  --black: #1A1A1A;
  --white: #FFF;
  --border: 3px solid var(--black);
  --shadow: 4px 4px 0 var(--black);
  --shadow-pink: 4px 4px 0 var(--hot-pink);
  --shadow-yellow: 4px 4px 0 #E6D200;
}
```

---

## 十、适用/不适用场景

### 适用

- Z世代/Alpha世代品牌（独立咖啡、潮牌、美妆）
- 创意机构/设计工作室
- 教育产品（少儿编程、学习平台）
- 社交媒体/社区平台
- 快消品品牌官网

### 不适用

- 金融/法律/政务（过于俏皮不严肃）
- 医疗/殡葬（粉色+贴纸不合适）
- B2B企业级SaaS（客户不会信任贴纸界面）
- 高信息密度仪表板（emoji装饰降低信息效率）
- 需无障碍高对比度的场景

---

## 十一、与其他风格对比

| 维度 | Cute-alism | Neo-Brutalism | Claymorphism | Retro Y2K |
|---|---|---|---|---|
| 底色 | 荧光黄 | 暖黄奶油 | 紫薰衣草 | 糖果色渐变 |
| 阴影 | 粉色硬阴影 | 纯黑硬阴影 | 内外双柔和阴影 | 闪烁发光 |
| 圆角 | 矛盾体系(8-50px) | 统一方形(0-4px) | 统一大圆角(24px) | 中等圆角 |
| 字体 | 等宽+圆润双撞 | 系统字体 | Nunito圆润 | Y2K花体 |
| 装饰 | emoji贴纸散落 | emoji辅助 | 光晕泡泡 | 星光闪烁 |
| 交互 | 点击出星星 | hover上浮 | hover上浮 | 鼠标跟随 |
| 情感 | 甜蜜混沌 | 粗犷直爽 | 软萌温暖 | 怀旧前卫 |

---

## 十二、变体建议

| 变体 | 修改 | 效果 |
|---|---|---|---|---|
| 暗色版 | 黄底→深紫底，白卡→暗卡，阴影→粉色霓虹 | 适合夜间模式/电竞 |
| 极简版 | 去掉背景emoji和点击星星，减少标签色 | 适合功能性产品 |
| 学院版 | 加入粉笔/黑板元素，emoji→公式符号 | 适合教育科技 |
| 韩系版 | 柔和粉+蓝配色，去掉硬阴影改柔和 | 适合韩妆/K-pop品牌 |

---

## 十三、动效/微交互

| 动效 | 触发 | 实现 | 持续时间 |
|---|---|---|---|---|
| 背景emoji浮 | 常态 | float动画 translateY(-15px) rotate(10deg) | 6s infinite |
| 卡片hover | hover | translate(-3px,-3px) + shadow 7px粉 | 0.2s |
| 标签hover | hover | translate(-2px,-2px) + shadow 5px | 0.2s |
| 速递条目hover | hover | translate(-2px,-2px) + shadow 4px | 0.2s |
| 快速入口hover | hover | translate(-2px,-2px) + shadow 3px + 黄底 | 0.2s |
| footer链接hover | hover | scale(1.05) + hot-pink底 | 0.2s |
| 点击星星 | click | 随机emoji fadeIn→scale(0.5)+上移→fadeOut | 0.8s |
| 鼠标光标 | 常态 | CSS cursor: url(🌸 svg) | 常态 |

---

## 十四、实施指南/注意事项

1. **荧光黄底色不可换**：`#FFE66D` 是Cute-alism最核心的视觉锚点，换色就失去了这个风格的辨识度
2. **双字体体系必须保持**：Space Mono(硬) + Nunito(软) 是矛盾碰撞的文字体现，不要统一为单字体
3. **硬阴影允许彩色**：这是Cute-alism对brutalism的突破——阴影不限于纯黑，可以粉色
4. **圆角矛盾必须保留**：50px药丸(输入/标签) vs 8px(标题标记) vs 16px(卡片) 的矛盾是核心
5. **emoji装饰不过度**：背景8个30%透明度、卡片1-2个，不要每个角落都贴emoji
6. **点击星星交互**：JS实现随机emoji弹出效果是用户惊喜点，不能去掉
7. **自定义光标**：CSS `cursor: url(🌸)` 在部分浏览器不支持，需提供fallback `cursor: auto`
8. **暗色变体需重新计算阴影**：暗色底+粉色霓虹阴影需用 `0 0 Npx rgba(255,20,147,0.6)` 代替硬阴影