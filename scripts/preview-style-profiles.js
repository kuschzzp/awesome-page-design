// Effective profiles are stored once in catalog/styles.json.
const { getStyleData, fallbacks } = require("./preview-catalog");

function getStylePlaybook(style) {
  return getStyleData(style)?.playbook || fallbacks.playbook;
}

function getGeometryProfile(style) {
  return getStyleData(style)?.geometry || getStyleData({ id: fallbacks.profileStyleId }).geometry;
}

function getImplementationProfile(style) {
  return getStyleData(style)?.implementation || getStyleData({ id: fallbacks.profileStyleId }).implementation;
}

function getAdaptationProfile(style) {
  return getStyleData(style)?.adaptation || getStyleData({ id: fallbacks.profileStyleId }).adaptation;
}

module.exports = { getStylePlaybook, getGeometryProfile, getImplementationProfile, getAdaptationProfile };
