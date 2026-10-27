const { allStyles } = require("./preview-catalog");
const copy = require("./gallery-copy");

function getGalleryStyles() {
  return allStyles.map((style) => {
    const { id, slug, name, zhName, brief, zhBrief, bestFor, zhBestFor } = style;
    const keys = [style.selection.family === "editorial" ? "family_editorial" : style.selection.family,
      style.selection.appearance, style.selection.density, ...style.selection.useCases];
    return {
      id, slug, name, zhName, brief, zhBrief, bestFor, zhBestFor,
      searchText: Object.values(copy).flatMap((words) => keys.map((key) => words[key] || "")).join(" "),
      selection: { ...style.selection, useCases: [...style.selection.useCases] },
      palette: { bg: style.bg, surface: style.surface, primary: style.primary, accent: style.accent, text: style.text },
    };
  });
}

// No module dependencies: the offline gallery embeds the same filtering logic.
function filterGalleryStyles(styles, options = {}) {
  const { query = "", useCase = "all", appearance = "all" } = options || {};
  const words = String(query ?? "").trim().toLowerCase().split(/\s+/).filter(Boolean);
  const selectedUseCase = String(useCase || "all").toLowerCase();
  const selectedAppearance = String(appearance || "all").toLowerCase();
  return (Array.isArray(styles) ? styles : []).filter((style) => {
    if (!style || typeof style !== "object") return false;
    const selection = style.selection || {};
    const useCases = Array.isArray(selection.useCases) ? selection.useCases : [];
    if (selectedUseCase !== "all" && !useCases.includes(selectedUseCase)) return false;
    if (selectedAppearance !== "all" && selection.appearance !== selectedAppearance) return false;
    const searchable = [style.id, style.name, style.zhName, style.brief, style.zhBrief,
      style.bestFor, style.zhBestFor, style.searchText, selection.family, selection.appearance, selection.density, ...useCases]
      .filter((value) => value !== undefined && value !== null).join(" ").toLowerCase();
    return words.every((word) => searchable.includes(word));
  });
}

// Discover shared text rather than naming prompt sentences or relying on a
// fixed set of page kinds. Prefix and suffix never overlap, including when a
// variant is empty or identical to another variant.
function packPromptVariants(variants) {
  if (!variants || typeof variants !== "object" || Array.isArray(variants)) {
    throw new TypeError("Prompt variants must be a non-empty object of strings");
  }
  const entries = Object.entries(variants);
  if (!entries.length || entries.some(([, value]) => typeof value !== "string")) {
    throw new TypeError("Prompt variants must be a non-empty object of strings");
  }
  const texts = entries.map(([, value]) => value);
  const first = texts[0];
  const shortest = Math.min(...texts.map((text) => text.length));
  let prefixLength = 0;
  while (prefixLength < shortest && texts.every((text) => text[prefixLength] === first[prefixLength])) prefixLength += 1;
  let suffixLength = 0;
  while (suffixLength < shortest - prefixLength && texts.every((text) => text[text.length - suffixLength - 1] === first[first.length - suffixLength - 1])) suffixLength += 1;
  return {
    prefix: first.slice(0, prefixLength),
    suffix: suffixLength ? first.slice(-suffixLength) : "",
    variants: Object.fromEntries(entries.map(([kind, text]) => [kind, text.slice(prefixLength, text.length - suffixLength)])),
  };
}

// Self-contained so the gallery can embed this exact decoder in its offline
// browser script and share the server's lossless format.
function unpackPrompt(packed, kind) {
  if (!packed || typeof packed.prefix !== "string" || typeof packed.suffix !== "string" ||
      !packed.variants || !Object.hasOwn(packed.variants, kind) || typeof packed.variants[kind] !== "string") {
    throw new TypeError(`Invalid packed prompt or unknown kind: ${kind}`);
  }
  return packed.prefix + packed.variants[kind] + packed.suffix;
}

module.exports = { getGalleryStyles, filterGalleryStyles, packPromptVariants, unpackPrompt };
