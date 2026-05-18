# Light Skeuomorphism 设计系统手册

> 来源：`version-n-skeuomorph.html` — AI Pulse 轻拟物主义版本

---

## 重要使用原则

本文件提供的是视觉风格提示，不是固定页面布局方案。示例 HTML 的页面结构仅用于统一展示和截图，不应在真实项目中照搬。后续开发时，应根据用户需求、业务流程、内容优先级和设备场景重新设计页面布局；可复用的是配色、字体、圆角、边框、阴影、质感、状态和动效等视觉语言。

---

## 一、风格定义

**Light Skeuomorphism（轻拟物主义）** 是 2026 年 VistaPrint 趋势报告中的第5号趋势。核心理念：

- **触感回归**：数字元素轻微模仿现实物体的3D质感——浮雕按钮、内凹轨道、凸起图标
- **Apple精神**：继承早期Apple UI的精简版，但更轻盈、更现代、更明亮
- **浮雕/内凹双系统**：emboss（凸起）用于按钮/图标，inset（内凹）用于轨道/输入框
- **渐变图标**：分类图标用135°双色渐变，模拟App Store图标质感
- **拒绝厚重**：不像2013年旧skeuomorphism那样模拟皮革/木头纹理，只保留微妙阴影暗示深度

---

## 二、色彩体系

### 2.1 调色板

| 角色 | CSS 变量 | 值 | 用途 |
|---|---|---|---|---|
| 页面背景 | `--bg` | `#F5F5F7` | Apple标志性浅灰背景 |
| 卡片/表面 | `--surface` | `#FFFFFF` | 纯白卡片 |
| 高亮表面 | `--surface-elevated` | `#FFFFFF` | 与surface同值，hover态不同 |
| 主文字 | `--text-primary` | `#1D1D1F` | Apple标志性深文字色 |
| 辅文字 | `--text-secondary` | `#6E6E73` | Apple灰 |
| 弱化文字 | `--text-tertiary` | `#86868B` | Apple浅灰 |
| 主强调 | `--accent` | `#0071E3` | Apple蓝 |
| hover态 | `--accent-hover` | `#0077ED` | 略亮蓝 |
| 绿 | `--green` | `#34C759` | Apple绿 |
| 橙 | `--orange` | `#FF9500` | Apple橙 |
| 红 | `--red` | `#FF3B30` | Apple红 |
| 紫 | `--purple` | `#AF52DE` | Apple紫 |
| 粉 | `--pink` | `#FF2D55` | Apple粉 |
| 青 | `--teal` | `#5AC8FA` | Apple青 |

### 2.2 阴影色体系（轻拟物核心）

| 名称 | CSS 变量 | 值 | 用途 |
|---|---|---|---|---|
| 小阴影 | `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)` | 标签、小元素 |
| 中阴影 | `--shadow-md` | `0 4px 8px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.06)` | 卡片默认 |
| 大阴影 | `--shadow-lg` | `0 8px 16px rgba(0,0,0,0.06), 0 4px 8px rgba(0,0,0,0.04)` | hero、订阅 |
| 超大阴影 | `--shadow-xl` | `0 12px 28px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.05)` | hero hover |
| 浮起阴影 | `--shadow-raised` | `0 2px 8px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.8)` | 按钮、图标框 |
| 内凹阴影 | `--shadow-inset` | `inset 0 2px 4px rgba(0,0,0,0.06), inset 0 -1px 0 rgba(255,255,255,0.5)` | 输入框、轨道 |
| 浮雕阴影 | `--shadow-emboss` | `0 1px 0 rgba(255,255,255,0.9), 0 -1px 0 rgba(0,0,0,0.05), 0 2px 6px rgba(0,0,0,0.08)` | 导航按钮、pill |

### 2.3 色彩使用规则

1. **Apple色系严格遵循**：所有强调色使用Apple系统色（蓝/绿/红/橙/紫/粉/青），不可自定义
2. **文字色三档**：`#1D1D1F` → `#6E6E73` → `#86868B`，Apple文字色体系
3. **背景`#F5F5F7`不可换**：这是Apple标志性背景灰，不是纯白也不是灰色
4. **渐变图标配色**：每个分类图标用专属135°双色渐变

---

## 三、排版体系

| 元素 | 字体 | 字号 | 字重 | 字间距 |
|---|---|---|---|---|
| 全局 | -apple-system, SF Pro Display, Helvetica Neue | — | — | — |
| hero标题 | 同上 | 36px | 700 | -1px |
| hero副标题 | 同上 | 16px | 400 | — |
| section标题 | 同上 | 20px | 600 | -0.4px |
| 卡片标题 | 同上 | 15px | 600 | -0.2px |
| 卡片描述 | 同上 | 13px | 400 | — |
| 分类标签 | 同上 | 11px | 600 | 0.5px |
| 每日速递标题 | 同上 | 13px | 600 | -0.1px |
| 订阅标题 | 同上 | 22px | 700 | -0.5px |
| footer | 同上 | 12-13px | 500 | — |

**系统字体选择**：Light Skeuomorphism 必须使用系统字体栈，模拟原生iOS/macOS界面，不引入第三方字体。

---

## 四、边框/圆角/阴影体系

### 4.1 边框

轻拟物风格**几乎不用边框**。元素之间的区分完全依赖阴影层级差异，而非边框线。

### 4.2 圆角（Apple标准）

| 元素 | CSS变量 | 值 |
|---|---|---|---|
| 主卡片 | `--radius-xl` | 20px |
| hero/订阅 | `--radius-xl` | 20px |
| 侧边卡片 | `--radius-lg` | 16px |
| 中等卡片 | `--radius-md` | 12px |
| 小元素 | `--radius-sm` | 8px |
| 导航按钮 | 20px | 药丸形 |
| 分类标签 | 4px | 极小圆角 |
| 热度徽章 | 12px | 小药丸 |
| 订阅输入 | 24px | 大药丸 |
| 订阅按钮 | 24px | 大药丸 |

### 4.3 阴影（7级体系）

这是Light Skeuomorphism的核心——7级阴影系统区分所有视觉层级：

| 层级 | 阴影 | 用途 | 效果 |
|---|---|---|---|---|---|
| 1-浮起 | `--shadow-raised` | 按钮、图标框、pill | 微微凸起感 |
| 2-浮雕 | `--shadow-emboss` | 导航按钮 | 顶部亮线+底部暗线 |
| 3-小 | `--shadow-sm` | 标签底 | 轻微脱离底面 |
| 4-中 | `--shadow-md` | 卡片默认 | 清晰脱离底面 |
| 5-大 | `--shadow-lg` | hero、订阅 | 明显脱离底面 |
| 6-超大 | `--shadow-xl` | hero hover | 大幅脱离底面 |
| 7-内凹 | `--shadow-inset` | 输入框、轨道 | 向底面内凹 |

---

## 五、装饰元素/交互细节

| 元素 | 实现 | 效果 |
|---|---|---|---|
| 导航按钮浮雕 | shadow-emboss | 模拟物理按钮凸起感 |
| 分类图标浮起 | shadow-raised + 渐变背景 | 模拟3D图标凸起 |
| 输入框内凹 | shadow-inset | 模拟物理凹槽 |
| 热度轨道内凹 | shadow-inset + border | 模拟凹槽中的进度条 |
| 热度条凸起 | 渐变fill + inset亮线 | 模拟凸起的进度指示器 |
| hero光晕 | radial-gradient(rgba(0,113,227,0.12)) | 右上蓝色光晕 |
| 订阅顶部彩条 | `linear-gradient(90deg, #667eea, #764ba2, #f5576c)` 4px | 渐变顶线装饰 |
| 卡片hover | translateY(-2px) + shadow-lg→xl | 卡片微微浮起 |
| 导航按钮hover | bg→accent + color→white | 模拟按钮按下变色 |

---

## 六、示例布局/间距观察（非固定方案）


> 以下布局内容仅用于解释示例 HTML 如何展示该风格，不是后续项目必须采用的页面结构。真实项目应重新做信息架构和布局设计。

| 区域 | 布局 | 间距 |
|---|---|---|---|
| 导航 | flex | padding 16px 0 |
| Hero | single column | padding 48px 40px |
| 新闻网格 | grid 3列 | gap 16px |
| Featured | grid 1fr 2fr | gap 24px |
| 每日速递 | grid 4列 | gap 12px |
| 趋势面板 | single column | padding 24px |
| 订阅box | text-align center | padding 36px |
| footer | flex row | padding 24px 0 |
| 最大宽度 | 1080px | padding 0 32px |

---

## 七、响应式策略

| 断点 | 变化 |
|---|---|---|
| ≤768px | 新闻单列、Featured单列、速递2列、hero标题28px、导航链接隐藏、订阅纵向 |

---

## 八、组件速查表

| 组件 | 背景 | 阴影 | 圆角 | padding | hover |
|---|---|---|---|---|---|---|
| 导航按钮 | white | emboss | 20px | 8px 16px | accent底+白字 |
| Hero | surface | xl | 20px | 48px 40px | — |
| 卡片图标 | gradient(各分类) | raised | 8px | — | — |
| 卡片 | surface | md | 16px | 20px | lg+上移2px |
| Featured | surface | xl | 20px | 32px | shadow-xl↑ |
| Featured视觉 | gradient | inset | 16px | 24px | — |
| 热度徽章 | 各色8%底 | emboss | 12px | 3px 10px | — |
| 每日速递 | surface | md | 12px | 16px | lg+上移1px |
| 热度面板 | surface | lg | 16px | 24px | — |
| 热度条 | 各色gradient | — | 14px | — | — |
| 订阅box | surface | xl | 20px | 36px | — |
| 订阅输入 | bg(0.03) | inset | 24px | 12px 20px | focus→2px accent ring |
| 订阅按钮 | accent | md+inset亮线 | 24px | 12px 28px | hover→accent-hover+上移1px |

---

## 九、CSS变量/代码片段

```css
:root {
  --bg: #F5F5F7;
  --surface: #FFFFFF;
  --surface-elevated: #FFFFFF;
  --text-primary: #1D1D1F;
  --text-secondary: #6E6E73;
  --text-tertiary: #86868B;
  --accent: #0071E3;
  --accent-hover: #0077ED;
  --green: #34C759;
  --orange: #FF9500;
  --red: #FF3B30;
  --purple: #AF52DE;
  --pink: #FF2D55;
  --teal: #5AC8FA;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06);
  --shadow-md: 0 4px 8px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.06);
  --shadow-lg: 0 8px 16px rgba(0,0,0,0.06), 0 4px 8px rgba(0,0,0,0.04);
  --shadow-xl: 0 12px 28px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.05);
  --shadow-raised: 0 2px 8px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.8);
  --shadow-inset: inset 0 2px 4px rgba(0,0,0,0.06), inset 0 -1px 0 rgba(255,255,255,0.5);
  --shadow-emboss: 0 1px 0 rgba(255,255,255,0.9), 0 -1px 0 rgba(0,0,0,0.05), 0 2px 6px rgba(0,0,0,0.08);
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
}
```

---

## 十、适用/不适用场景

### 适用

- 科技产品官网/仪表板（Apple感=信任感）
- SaaS B2B产品（专业+触感）
- iOS/macOS原生应用界面
- 电商产品展示页
- 健康医疗/教育产品（亲和力+专业度）

### 不适用

- 创意/艺术类网站（太规范太Apple，缺乏个性）
- 游戏/电竞（不够酷不够暗）
- 街头潮流品牌（过于"正规"）
- 极繁主义需求（轻拟物天然极简）
- 需强烈品牌个性的场景（Apple感覆盖品牌感）

---

## 十一、与其他风格对比

| 维度 | Light Skeuomorphism | Resonant Stark | Bento Grid | Claymorphism |
|---|---|---|---|---|
| 背景 | Apple灰#F5F5F7 | 深黑#0A0A0B | Apple灰#F5F5F7 | 紫薰衣草#f0e6ff |
| 深度来源 | 7级阴影emboss/inset | 微光晕orb | shadow+scale | 内外双柔和阴影 |
| 触感 | 微浮雕/微内凹 | 无触感 | 微浮起 | 软泥膨体 |
| 字体 | 系统字体栈 | Inter+JetBrains Mono | Inter | Nunito |
| 强调色 | Apple蓝#0071E3 | 青/粉/绿微色 | Apple蓝 | 紫+粉 |
| 圆角 | Apple标准8→20 | 极小(4→12) | Apple大(20) | 大圆角24 |
| 边框 | 几乎无 | 6%白透明 | 4%黑透明 | 无 |
| 整体气质 | iOS原生感 | 纯净冥想感 | 仪表板感 | 软萌卡通感 |

---

## 十二、变体建议

| 变体 | 修改 | 效果 |
|---|---|---|---|---|
| 暗色版 | 背景→#1C1C1E(Apple暗灰)，文字反转 | 适合夜间/iOS暗色模式 |
| 增重版 | 阴影加重20%，增加纹理底 | 适合奢侈品牌 |
| Material版 | 阴影改Material标准，增加波纹效果 | 适合Android风格产品 |
| 极简版 | 只保留raised和inset两档，去掉4级中间阴影 | 适合极简工具 |

---

## 十三、动效/微交互

| 动效 | 触发 | 实现 | 持续时间 |
|---|---|---|---|---|
| 卡片浮起 | hover | translateY(-2px) + shadow lg→xl | 0.3s ease |
| 每日速递浮起 | hover | translateY(-1px) + shadow md→lg | 0.3s ease |
| 导航按钮按下 | hover | bg→accent + color→white + shadow emboss→md | 0.3s ease |
| 订阅按钮浮起 | hover | translateY(-1px) + accent→accent-hover + shadow md→lg | 0.3s ease |
| 输入框聚焦 | focus | shadow inset→inset+2px accent ring | 0.3s ease |
| 热度条动画 | 页面加载 | width transition | 1s ease |
| 订阅彩条 | 常态 | gradient静态装饰 | — |

---

## 十四、实施指南/注意事项

1. **7级阴影必须完整**：sm/md/lg/xl/raised/inset/emboss 七档是轻拟物的核心系统，缺少任何一档都会导致层级混乱
2. **emboss的关键是亮线+暗线**：`inset 0 1px 0 rgba(255,255,255,0.9)` 顶部亮线模拟光照，`0 -1px 0 rgba(0,0,0,0.05)` 底部暗线模拟阴影，两者同时存在才有浮雕感
3. **inset的关键是双向**：`inset 0 2px 4px rgba(0,0,0,0.06)` 内凹阴影 + `inset 0 -1px 0 rgba(255,255,255,0.5)` 底部亮线回弹，双向才有"凹槽感"
4. **进度条必须双向阴影**：track用inset（凹槽），fill用渐变+亮线inset（凸起条在凹槽中），模拟物理进度条
5. **不要引入边框**：轻拟物靠阴影分层，加边框会破坏3D触感，回到扁平风格
6. **Apple色系不可替换**：蓝#0071E3等是iOS系统色，用户对这些颜色有"原生感"记忆，换成自定义色会失去Apple气质
7. **系统字体栈优先**：`-apple-system, BlinkMacSystemFont, 'SF Pro Display'` 等，让文字看起来像iOS原生