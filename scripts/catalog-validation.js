const isRecord = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const isText = (value) => typeof value === "string" && value.trim().length > 0;
const safeSlug = /^style-\d{2,}-[a-z0-9]+(?:-[a-z0-9]+)*$/;

const baseFields = ["id", "slug", "name", "zhName", "brief", "zhBrief", "bestFor", "zhBestFor", "bg", "surface", "text", "muted", "primary", "accent", "border", "radius", "shadow", "className"];
const playbookFields = ["layout", "name", "zhName", "structure", "zhStructure", "typography", "zhTypography", "components", "zhComponents", "buttons", "zhButtons", "media", "zhMedia", "states", "zhStates", "avoid", "zhAvoid"];
const geometryFields = ["panel", "control", "chip", "media", "description"];
const implementationFields = ["buttons", "zhButtons", "feedback", "zhFeedback", "spacing", "zhSpacing", "responsive", "zhResponsive"];
const adaptationFields = ["landing", "dashboard", "admin", "forms", "mobile", "unsuitable"];
const scenarioFields = ["brand", "eyebrow", "headline", "lede", "primaryAction", "secondaryAction", "mediaLabel", "scene"];
const selectionValues = {
  family: ["minimal", "editorial", "expressive", "futuristic", "tactile"],
  appearance: ["light", "dark", "mixed"],
  density: ["sparse", "normal", "dense"],
  useCases: ["landing", "dashboard", "admin", "portfolio", "editorial"],
};

function validateCatalog(catalog) {
  const errors = [];
  function textFields(value, fields, label) {
    if (!isRecord(value)) {
      errors.push(`${label} must be an object`);
      return false;
    }
    for (const field of fields) {
      if (!isText(value[field])) errors.push(`${label}.${field} must be a non-empty string`);
    }
    return true;
  }
  function textList(value, label) {
    if (!Array.isArray(value) || !value.length || !value.every(isText)) {
      errors.push(`${label} must be a non-empty string array`);
    }
  }
  function pair(value, label) {
    if (!Array.isArray(value) || value.length !== 2 || !value.every(isText)) {
      errors.push(`${label} must contain exactly two non-empty strings`);
    }
  }
  function pairs(value, label) {
    if (!Array.isArray(value) || !value.length) {
      errors.push(`${label} must be a non-empty array of text pairs`);
    } else {
      value.forEach((entry, index) => pair(entry, `${label}[${index}]`));
    }
  }
  if (!isRecord(catalog)) return ["catalog must be an object"];
  if (catalog.version !== 1) errors.push("catalog.version must be 1");
  if (!Array.isArray(catalog.styles) || !catalog.styles.length) {
    errors.push("catalog.styles must be a non-empty array");
  }
  const ids = new Set();
  const slugs = new Set();
  for (const [index, style] of (Array.isArray(catalog.styles) ? catalog.styles : []).entries()) {
    const label = `styles[${index}]`;
    if (!textFields(style, baseFields, label)) continue;
    if (typeof style.id !== "string" || !/^\d{2,}$/.test(style.id) || !/[1-9]/.test(style.id)) {
      errors.push(`${label}.id must be a positive numeric identifier of at least two digits`);
    }
    if (ids.has(style.id)) errors.push(`${label}.id duplicates ${style.id}`);
    ids.add(style.id);
    if (typeof style.slug !== "string" || !safeSlug.test(style.slug)) {
      errors.push(`${label}.slug is unsafe or invalid`);
    } else if (!style.slug.startsWith(`style-${style.id}-`)) {
      errors.push(`${label}.slug must match its id`);
    }
    if (slugs.has(style.slug)) errors.push(`${label}.slug duplicates ${style.slug}`);
    slugs.add(style.slug);
    if (typeof style.className !== "string" || !/^[a-z][a-z0-9-]*$/.test(style.className)) {
      errors.push(`${label}.className must be a safe CSS class name`);
    }
    if (typeof style.image !== "string") errors.push(`${label}.image must be a string (empty is allowed)`);
    textList(style.notes, `${label}.notes`);
    if (!isRecord(style.selection)) {
      errors.push(`${label}.selection must be an object`);
    } else {
      for (const field of ["family", "appearance", "density"]) {
        if (!selectionValues[field].includes(style.selection[field])) {
          errors.push(`${label}.selection.${field} must be one of ${selectionValues[field].join(", ")}`);
        }
      }
      const useCases = style.selection.useCases;
      if (!Array.isArray(useCases) || !useCases.length || useCases.some((value) => !selectionValues.useCases.includes(value))) {
        errors.push(`${label}.selection.useCases must be a non-empty array of supported use cases`);
      } else if (new Set(useCases).size !== useCases.length) {
        errors.push(`${label}.selection.useCases must not contain duplicates`);
      }
    }
    textFields(style.playbook, playbookFields, `${label}.playbook`);
    textFields(style.geometry, geometryFields, `${label}.geometry`);
    textFields(style.implementation, implementationFields, `${label}.implementation`);
    textFields(style.adaptation, adaptationFields, `${label}.adaptation`);
    if (textFields(style.scenario, scenarioFields, `${label}.scenario`)) {
      textList(style.scenario.nav, `${label}.scenario.nav`);
      for (const field of ["metrics", "features", "queue"]) {
        pairs(style.scenario[field], `${label}.scenario.${field}`);
      }
      if (!isRecord(style.scenario.tabs)) errors.push(`${label}.scenario.tabs must be an object`);
      else for (const tab of ["launch", "metrics", "assets"]) pair(style.scenario.tabs[tab], `${label}.scenario.tabs.${tab}`);
    }
  }
  if (!Array.isArray(catalog.removedStyleSlugs)) {
    errors.push("catalog.removedStyleSlugs must be an array");
  } else {
    const removed = new Set();
    catalog.removedStyleSlugs.forEach((slug, index) => {
      if (typeof slug !== "string" || !safeSlug.test(slug)) errors.push(`removedStyleSlugs[${index}] is unsafe or invalid`);
      if (removed.has(slug)) errors.push(`removedStyleSlugs[${index}] duplicates ${slug}`);
      if (slugs.has(slug)) errors.push(`removedStyleSlugs[${index}] is still an active style`);
      removed.add(slug);
    });
  }
  if (!isRecord(catalog.fallbacks)) {
    errors.push("catalog.fallbacks must be an object");
  } else {
    if (!ids.has(catalog.fallbacks.profileStyleId)) errors.push("catalog.fallbacks.profileStyleId must reference an existing style");
    textFields(catalog.fallbacks.playbook, playbookFields, "catalog.fallbacks.playbook");
  }
  return errors;
}

module.exports = { validateCatalog };
