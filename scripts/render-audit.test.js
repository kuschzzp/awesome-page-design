const test = require("node:test");
const assert = require("node:assert/strict");
const { formatRenderAuditErrors, renderAuditExpression } = require("./render-audit");

function cleanAudit() {
  return {
    viewport: { width: 390, height: 844 },
    documentWidth: 390,
    horizontalOverflow: false,
    offscreenControls: [],
    zeroSizeControls: [],
  };
}

test("renderAuditExpression returns a self-contained browser expression", () => {
  const expression = renderAuditExpression();
  assert.match(expression, /^\(\(\) => \{/);
  assert.match(expression, /document\.querySelectorAll/);
  assert.match(expression, /horizontalOverflow/);
});

test("formatRenderAuditErrors returns no errors for a clean render", () => {
  assert.deepEqual(formatRenderAuditErrors(cleanAudit(), "mobile"), []);
});

test("formatRenderAuditErrors reports overflow, offscreen, and zero-size controls", () => {
  const audit = cleanAudit();
  audit.documentWidth = 428;
  audit.horizontalOverflow = true;
  audit.offscreenControls.push({
    selector: "button.primary",
    text: "Continue",
    rect: { left: 380, top: 20, right: 450, bottom: 64, width: 70, height: 44 },
  });
  audit.zeroSizeControls.push({
    selector: "a#details",
    text: "Details",
    rect: { left: 12, top: 90, right: 12, bottom: 90, width: 0, height: 0 },
  });

  const errors = formatRenderAuditErrors(audit, "mobile");
  assert.match(errors.join("\n"), /horizontal overflow/i);
  assert.match(errors.join("\n"), /offscreen interactive control.*Continue/i);
  assert.match(errors.join("\n"), /zero-size interactive control.*Details/i);
});

test("formatRenderAuditErrors rejects malformed browser results", () => {
  assert.match(formatRenderAuditErrors(null, "desktop").join("\n"), /invalid render audit result/i);
});
