const { allStyles } = require("./preview-catalog");

function splitStyleSelectors(value) {
  return String(value || "")
    .split(/[,\s]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function getPreviewStyleSelectors(argv = process.argv.slice(2), env = process.env) {
  const selectors = [];
  if (env.PREVIEW_STYLE) selectors.push(...splitStyleSelectors(env.PREVIEW_STYLE));
  if (env.PREVIEW_STYLES) selectors.push(...splitStyleSelectors(env.PREVIEW_STYLES));

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--style" || arg === "--styles") {
      selectors.push(...splitStyleSelectors(argv[index + 1]));
      index += 1;
    } else if (arg.startsWith("--style=")) {
      selectors.push(...splitStyleSelectors(arg.slice("--style=".length)));
    } else if (arg.startsWith("--styles=")) {
      selectors.push(...splitStyleSelectors(arg.slice("--styles=".length)));
    }
  }

  return selectors;
}

function resolvePreviewStyles(argv = process.argv.slice(2), env = process.env) {
  const selectors = getPreviewStyleSelectors(argv, env);
  if (selectors.length === 0) return allStyles;

  const normalizedSelectors = selectors.map((selector) => selector.toLowerCase());
  const selected = [];
  const unknown = [];

  normalizedSelectors.forEach((selector) => {
    const paddedId = selector.padStart(2, "0");
    const match = allStyles.find((style) => {
      const label = (style.label || `Style ${style.id}`).toLowerCase();
      return (
        style.id.toLowerCase() === selector ||
        style.id.toLowerCase() === paddedId ||
        style.slug.toLowerCase() === selector ||
        style.name.toLowerCase() === selector ||
        style.zhName.toLowerCase() === selector ||
        label === selector ||
        label === `style ${paddedId}`
      );
    });

    if (!match) {
      unknown.push(selector);
      return;
    }

    if (!selected.some((style) => style.id === match.id)) selected.push(match);
  });

  if (unknown.length > 0) {
    const valid = allStyles.map((style) => style.id).join(", ");
    throw new Error(`Unknown preview style selector(s): ${unknown.join(", ")}. Valid style ids: ${valid}`);
  }

  return selected;
}

module.exports = { getPreviewStyleSelectors, resolvePreviewStyles };
