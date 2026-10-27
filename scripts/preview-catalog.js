// Single source of visual directions and their effective design profiles.
const catalog = require("../catalog/styles.json");
const { validateCatalog } = require("./catalog-validation");

const errors = validateCatalog(catalog);
if (errors.length) throw new Error(`Invalid style catalog:\n${errors.join("\n")}`);

const styleDataById = new Map(catalog.styles.map((style) => [style.id, style]));
const allStyles = catalog.styles.map(({ scenario, playbook, geometry, implementation, adaptation, ...base }) => base);
const removedStyleSlugs = catalog.removedStyleSlugs;

function getStyleData(style) {
  return styleDataById.get(String(style.id));
}

module.exports = { allStyles, removedStyleSlugs, getStyleData, fallbacks: catalog.fallbacks };
