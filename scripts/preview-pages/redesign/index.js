const fs = require('node:fs');
const path = require('node:path');
const { runtimeScript } = require('./runtime');
const cache = new Map();
const baseCss = fs.readFileSync(path.join(__dirname, 'base.css'), 'utf8');
function getRedesignedPage(id) {
  if (Number(id) < 3 || Number(id) > 26) return null;
  if (!cache.has(id)) {
    const moduleFile = path.join(__dirname, `style${id}.js`);
    const cssFile = path.join(__dirname, `style${id}.css`);
    const page = require(moduleFile);
    if (typeof page.render !== 'function') throw new Error(`Style ${id} must export render()`);
    cache.set(id, { render: page.render, css: fs.readFileSync(cssFile, 'utf8') });
  }
  return cache.get(id);
}
module.exports = { getRedesignedPage, baseCss, runtimeScript };
