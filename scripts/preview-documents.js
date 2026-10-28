const { allStyles } = require("./preview-catalog");
const { getScenario } = require("./preview-scenarios");
const { getStylePlaybook, getGeometryProfile, getImplementationProfile } = require("./preview-style-profiles");
// 中文说明单独维护，避免语言迁移改动现有双语预览及其提示词。
const chineseStyleDocs = require("../catalog/style-docs.zh.json");

function getChineseStyleDoc(style) {
  const doc = chineseStyleDocs[style.id];
  if (!doc) throw new Error(`风格 ${style.id} 缺少中文说明数据`);
  return doc;
}

function renderStyleDoc(style) {
  const translated = getChineseStyleDoc(style);
  const scenario = getScenario(style);
  const example = translated.scenario;
  const playbook = { ...getStylePlaybook(style), ...translated.playbook };
  const geometry = getGeometryProfile(style);
  const implementation = { ...getImplementationProfile(style), ...translated.implementation };
  const adaptation = translated.adaptation;
  const notes = translated.notes.map((note) => `- ${note}`).join("\n");
  const features = example.features.map(([title, body]) => `- ${title}：${body}`).join("\n");
  const queue = example.queue.map(([title, state]) => `- ${title}：${state}`).join("\n");
  return `# 风格 ${style.id}：${style.zhName}

## 概述

${style.zhBrief}

## 适用场景

${style.zhBestFor}

## 示例场景

- 示例产品：${scenario.brand}
- 页面任务：${example.eyebrow}
- 标题：${example.headline}
- 主要操作：${example.primaryAction}
- 次要操作：${example.secondaryAction}

## 场景组件

${features}

## 示例状态

${queue}

## 布局模式

- 模式：${playbook.zhName}
- 结构：${playbook.zhStructure}
- 适配原则：应用视觉语言前，先定义用户真实的主要内容对象、顶层区域、主要操作、信息密度和响应式收拢方式。
- 排版：${playbook.zhTypography}
- 组件：${playbook.zhComponents}
- 按钮：${playbook.zhButtons}
- 图标与媒体：${playbook.zhMedia}
- 状态：${playbook.zhStates}
- 避免：${playbook.zhAvoid}

## 视觉语言

- 背景：\`${style.bg}\`
- 表面：\`${style.surface}\`
- 正文：\`${style.text}\`
- 弱化文字：\`${style.muted}\`
- 主色：\`${style.primary}\`
- 强调色：\`${style.accent}\`
- 边框：\`${style.border}\`
- 圆角：\`${style.radius}\`
- 面板圆角：\`${geometry.panel}\`
- 控件圆角：\`${geometry.control}\`
- Chip 圆角：\`${geometry.chip}\`
- 媒体圆角：\`${geometry.media}\`
- 几何规则：${translated.geometryDescription}；避免把所有按钮和 Card 都做成相同的大圆角矩形。
- 阴影：\`${style.shadow}\`

## 组件细节

- 按钮系统：${implementation.zhButtons}
- 提示与反馈：${implementation.zhFeedback}
- 间距系统：${implementation.zhSpacing}
- 响应式策略：${implementation.zhResponsive}

## 页面适配指南

- 落地页：${adaptation.landing}
- 数据看板：${adaptation.dashboard}
- 管理后台：${adaptation.admin}
- 表单、Table 与数据：${adaptation.forms}
- 移动端：${adaptation.mobile}
- 不适合：${adaptation.unsuitable}

## 使用要点

${notes}

## 后续步骤

通过[工作流程](../workflow.md)应用这一方向，按需参考[设计参数](../design-dials.md)和[实现检查](../interface-compliance.md)。本文维护该风格的特定规则；共享流程和无障碍要求由这些引用文档统一维护。

从[风格预览](../../assets/previews/index.html)复制对应任务的提示词，当前预览继续提供中英文两个版本。将示例的视觉语言适配到真实产品，不要照搬示例品牌或页面结构。
`;
}

function renderStyleIndex() {
  const rows = allStyles.map((style) => {
    const playbook = getStylePlaybook(style);
    return `| ${style.id} | [${style.zhName}](styles/${style.slug}.md) | ${style.zhBestFor} | ${playbook.zhName} | ${style.zhBrief} |`;
  }).join("\n");
  return `# 风格索引

本索引汇总全部 ${allStyles.length} 种视觉风格，编号从 01 连续排列至 ${allStyles.length}。把风格作为视觉方向，围绕用户产品设计实际页面结构。先依据[布局指南](layout-guidance.md)确定布局原型，不要把某种风格当成固定页面模板。

| 编号 | 风格 | 适用场景 | 布局模式 | 视觉语言 |
|---|---|---|---|---|
${rows}

## 风格区分原则

- 不要把 03 极光渐变、08 共鸣极简、10 深色主题、15 液态玻璃、18 精密未来风和 21 酸性设计都做成相同的通用深色 SaaS 页面。它们分别强调氛围、克制、对比、材质、精度和实验强度。
- 不要把 09 科技极简风、11 结构线和 12 层级材质合并成同一种中性白色 UI。它们分别依靠留白、线条结构，以及层次与色调表面的逻辑建立区别。
- 不要混淆 02 块状粗野主义和 17 新粗野主义。02 是暖色块状活动风格；17 以更强的视觉碰撞、巨型字体和受控混乱表达个性。
- 不要混淆 04 复古 Y2K 和 16 复古主义。04 使用糖果色、霓虹和 Y2K 质感；16 使用像素和老式操作系统纹理。
- 不要把 13 便当盒布局变成固定模板。它是一种模块化视觉构图方式，不规定信息架构。
- 不要把 22 装饰艺术、24 水墨和 05 瑞士编辑风合并成同一种编辑页面。它们分别依靠金色对称、卷轴与纸面节奏、严格的现代主义排版建立区别。
- 不要把 23 侘寂和 20 柔和流行合并成同一种暖色圆角 UI。23 强调安静、克制的材质；20 强调亲和、玩乐的学习与产品氛围。
- 不要把 25 蓝图、18 精密未来风和 26 工业控制合并成同一种技术看板。25 是精确的规划图纸，18 是深色精密图谱控制台，26 是耐用、强调安全的操作界面。
- 只有品牌能够承载鲜明个性时，才使用 02、04、07、16、17、19、20 和 21。
`;
}

module.exports = { renderStyleDoc, renderStyleIndex, getChineseStyleDoc };
