// Product scenarios come from the validated catalog; unknown styles retain
// the original name/brief-dependent compatibility fallback.
const { getStyleData } = require("./preview-catalog");

function getScenario(style) {
  return getStyleData(style)?.scenario || {
    brand: "Design Studio",
    nav: ["Overview", "Workflow", "States"],
    eyebrow: `${style.name} example`,
    headline: style.name,
    lede: style.brief,
    primaryAction: "Copy prompt",
    secondaryAction: "View notes",
    mediaLabel: `${style.name} visual sample`,
    scene: "dashboard",
    metrics: [
      ["01", "style"],
      ["03", "states"],
      ["26", "catalog"],
    ],
    features: [
      ["Surface system", "Background, cards, borders, and focus states follow the selected visual language."],
      ["Component tone", "Buttons, tabs, stats, and list rows show how the style behaves in UI."],
      ["Content density", "The example includes real sections, metrics, and supporting context."],
    ],
    tabs: {
      launch: ["Launch workflow", "Plan hierarchy, validate the action, and translate the style into tokens."],
      metrics: ["Quality review", "Compare readability, state coverage, mobile density, and visual distinction."],
      assets: ["Media direction", "Use real product imagery or carefully matched visual objects when media helps."],
    },
    queue: [
      ["Audit contrast", "Ready"],
      ["Review mobile", "2 notes"],
      ["Export prompt", "Click"],
    ],
  };
}

module.exports = { getScenario };
