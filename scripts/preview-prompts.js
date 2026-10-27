const { getScenario } = require("./preview-scenarios");
const { getStylePlaybook, getGeometryProfile, getImplementationProfile, getAdaptationProfile } = require("./preview-style-profiles");

const promptKinds = [
  {
    key: "full",
    promptEn: "Full Prompt",
    promptZh: "完整提示词",
    labelEn: "General",
    labelZh: "通用页面",
    descriptionEn: "Use when the page type is unclear or you want the complete style rule set.",
    descriptionZh: "页面类型还不确定，或需要完整风格规则。",
    copyEn: "Copy General",
    copyZh: "复制通用",
  },
  {
    key: "landing",
    promptEn: "Landing Page",
    promptZh: "落地页",
    labelEn: "Landing",
    labelZh: "落地页",
    descriptionEn: "For public pages, product stories, conversion, proof, and media direction.",
    descriptionZh: "适合官网、产品页、活动页，强调首屏、转化、证明内容和媒体。",
    copyEn: "Copy Landing",
    copyZh: "复制落地页",
  },
  {
    key: "dashboard",
    promptEn: "Dashboard",
    promptZh: "仪表盘",
    labelEn: "Dashboard",
    labelZh: "数据看板",
    descriptionEn: "For metrics, charts, filters, lists, monitoring, and detail panels.",
    descriptionZh: "适合指标、图表、筛选、列表、状态监控和详情面板。",
    copyEn: "Copy Dashboard",
    copyZh: "复制看板",
  },
  {
    key: "admin",
    promptEn: "Admin Panel",
    promptZh: "管理后台",
    labelEn: "Admin",
    labelZh: "管理后台",
    descriptionEn: "For tables, forms, bulk actions, permissions, settings, and recovery flows.",
    descriptionZh: "适合表格、表单、批量操作、权限、设置和异常恢复。",
    copyEn: "Copy Admin",
    copyZh: "复制后台",
  },
  {
    key: "mobile",
    promptEn: "Mobile",
    promptZh: "移动端",
    labelEn: "Mobile",
    labelZh: "移动端",
    descriptionEn: "For mobile-first screens, touch targets, small-screen order, and responsive checks.",
    descriptionZh: "适合移动端优先、触控目标、小屏内容顺序和响应式检查。",
    copyEn: "Copy Mobile",
    copyZh: "复制移动端",
  },
];

function buildScenarioFocus(style, lang, kind) {
  const adaptation = getAdaptationProfile(style);
  const prefix = lang === "zh" ? "场景重点" : "Scenario focus";
  const lines = {
    full: lang === "zh"
      ? [
          `页面适配：落地页可用 ${adaptation.landing}`,
          `仪表盘适配：${adaptation.dashboard}`,
          `后台适配：${adaptation.admin}`,
          `表单/数据适配：${adaptation.forms}`,
          `移动端适配：${adaptation.mobile}`,
          `不适合：${adaptation.unsuitable}`,
        ]
      : [
          `Landing adaptation: ${adaptation.landing}`,
          `Dashboard adaptation: ${adaptation.dashboard}`,
          `Admin adaptation: ${adaptation.admin}`,
          `Forms/data adaptation: ${adaptation.forms}`,
          `Mobile adaptation: ${adaptation.mobile}`,
          `Avoid for: ${adaptation.unsuitable}`,
        ],
    landing: lang === "zh"
      ? [
          `落地页重点：${adaptation.landing}`,
          `首屏必须明确品牌/产品、核心承诺、主转化动作、证明内容和媒体方向。`,
          `不要把完整页面做成通用 hero + 三张功能卡；根据产品叙事安排证据、流程、客户证明或产品视觉。`,
        ]
      : [
          `Landing page focus: ${adaptation.landing}`,
          `First viewport must establish the product, literal offer, primary conversion action, proof, and media direction.`,
          `Avoid the generic hero plus three feature cards; arrange proof, workflow, testimonials, or product visuals around the real offer.`,
        ],
    dashboard: lang === "zh"
      ? [
          `仪表盘重点：${adaptation.dashboard}`,
          `优先呈现筛选、指标、列表/表格、详情面板、状态和下一步操作。`,
          `不要把运营页面改成营销首屏；核心对象、当前状态和主操作必须在首屏可见。`,
        ]
      : [
          `Dashboard focus: ${adaptation.dashboard}`,
          `Prioritize filters, metrics, lists/tables, detail panels, state, and next actions.`,
          `Do not turn an operational screen into a marketing hero; keep the primary object, current state, and main action visible.`,
        ],
    admin: lang === "zh"
      ? [
          `管理后台重点：${adaptation.admin}`,
          `强调导航、表格/表单、批量操作、权限、错误、空状态、保存和撤销反馈。`,
          `控制装饰强度，让重复操作、扫描、比较和修复路径更清楚。`,
        ]
      : [
          `Admin panel focus: ${adaptation.admin}`,
          `Emphasize navigation, tables/forms, bulk actions, permissions, errors, empty states, save feedback, and undo paths.`,
          `Restrain decoration so repeated action, scanning, comparison, and recovery paths stay clear.`,
        ],
    mobile: lang === "zh"
      ? [
          `移动端重点：${adaptation.mobile}`,
          `先定义标题、当前状态、主操作、筛选、主体内容、辅助证据和二级操作的顺序。`,
          `触控目标、底部操作、折叠面板、表格替代方案和安全区域必须明确；不要硬挤桌面网格。`,
        ]
      : [
          `Mobile focus: ${adaptation.mobile}`,
          `Define the order for title, current status, primary action, filters, main content, supporting proof, and secondary actions.`,
          `Specify touch targets, bottom actions, collapsible panels, table fallbacks, and safe areas; do not squeeze desktop grids.`,
        ],
  };
  return [`${prefix}:`, ...lines[kind] || lines.full];
}

function buildStylePrompt(style, lang = "en", kind = "full") {
  const label = style.label || `Style ${style.id}`;
  const scenario = getScenario(style);
  const playbook = getStylePlaybook(style);
  const geometry = getGeometryProfile(style);
  const implementation = getImplementationProfile(style);
  const scenarioFocus = buildScenarioFocus(style, lang, kind);

  if (lang === "zh") {
    return [
      `使用 awesome-page-design ${label} - ${style.name}（${style.zhName}）作为页面设计方向。`,
      `提示词类型：${promptKinds.find((item) => item.key === kind)?.promptZh || "完整提示词"}。`,
      `适用页面：${style.zhBestFor}。`,
      `目标气质：${style.zhBrief}`,
      ...scenarioFocus,
      `布局原型：${playbook.zhName}。`,
      `布局结构：${playbook.zhStructure}`,
      `布局适配：先根据用户真实任务定义主要内容对象、顶层区域、主操作模型、信息密度和响应式折叠，再应用该风格；保留布局原型的结构身份，但不要复制示例页。`,
      `颜色 token：背景 ${style.bg}；表面 ${style.surface}；正文 ${style.text}；弱化文本 ${style.muted}；主色 ${style.primary}；强调色 ${style.accent}；边框 ${style.border}；圆角 ${style.radius}；阴影/材质 ${style.shadow}。`,
      `几何规则：面板圆角 ${geometry.panel}；控件圆角 ${geometry.control}；标签/状态圆角 ${geometry.chip}；媒体容器圆角 ${geometry.media}。避免把所有按钮和卡片做成同一种大圆角或胶囊形。`,
      `排版规则：${playbook.zhTypography}`,
      `组件规则：${playbook.zhComponents}`,
      `按钮规则：${playbook.zhButtons}`,
      `按钮细节：${implementation.zhButtons}`,
      `提示与反馈：${implementation.zhFeedback}`,
      `间距系统：${implementation.zhSpacing}`,
      `响应式策略：${implementation.zhResponsive}`,
      `图标与媒体：${playbook.zhMedia}`,
      `状态规则：${playbook.zhStates}`,
      `组件状态矩阵：为出现的按钮、链接、输入、筛选、卡片、列表、表格、弹窗、抽屉、空状态、错误状态、加载状态、禁用状态、选中状态、警告状态和成功状态定义可见且风格一致的表现。`,
      `动效规则：动效必须表达进入、离开、展开、加载、对象连续性、列表重排或进度变化；避免 transition: all，并提供 reduced-motion 降级。`,
      `实现验收：使用语义控件；图标按钮要有可访问名称；所有可交互元素要有 focus-visible；媒体要有稳定尺寸或 aspect-ratio；长文本要有换行、截断或 clamp；空/错/加载状态要说明下一步。`,
      `示例内容方向：可参考“${scenario.brand} / ${scenario.eyebrow}”这类具体工作流，但必须替换成用户真实产品、真实信息架构和真实文案。`,
      `设计 dials：根据用户产品设置布局变化度、动效强度和信息密度；不要默认套用示例页结构。`,
      `禁止事项：${playbook.zhAvoid} 不要复制示例 HTML、示例品牌、示例文案或示例布局；不要只换颜色；不要生成通用 AI 味的 hero + 三卡片页面。`,
      `交付前检查：桌面和移动端截图、文本不溢出、按钮/输入/卡片/表格/弹窗/空状态/错误/加载/禁用/焦点/选中/成功状态都符合该风格，并通过实现验收规则。`,
    ].join("\n");
  }

  return [
    `Use awesome-page-design ${label} - ${style.name} as the page design direction.`,
    `Prompt type: ${promptKinds.find((item) => item.key === kind)?.promptEn || "Full Prompt"}.`,
    `Best fit: ${style.bestFor}.`,
    `Visual mood: ${style.brief}`,
    ...scenarioFocus,
    `Layout archetype: ${playbook.name}.`,
    `Layout structure: ${playbook.structure}`,
    `Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.`,
    `Color tokens: background ${style.bg}; surface ${style.surface}; text ${style.text}; muted ${style.muted}; primary ${style.primary}; accent ${style.accent}; border ${style.border}; radius ${style.radius}; shadow/material ${style.shadow}.`,
    `Geometry: panel radius ${geometry.panel}; control radius ${geometry.control}; chip/state radius ${geometry.chip}; media radius ${geometry.media}. Avoid making every button and card the same large rounded rectangle or pill.`,
    `Typography: ${playbook.typography}`,
    `Components: ${playbook.components}`,
    `Buttons: ${playbook.buttons}`,
    `Button details: ${implementation.buttons}`,
    `Feedback and alerts: ${implementation.feedback}`,
    `Spacing system: ${implementation.spacing}`,
    `Responsive behavior: ${implementation.responsive}`,
    `Icons and media: ${playbook.media}`,
    `States: ${playbook.states}`,
    `Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.`,
    `Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.`,
    `Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.`,
    `Example content direction: you may use the specificity of "${scenario.brand} / ${scenario.eyebrow}" as inspiration, but replace it with the user's real product, real information architecture, and real copy.`,
    `Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.`,
    `Do not: ${playbook.avoid} Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.`,
    `Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.`,
  ].join("\n");
}

module.exports = { promptKinds, buildStylePrompt };
