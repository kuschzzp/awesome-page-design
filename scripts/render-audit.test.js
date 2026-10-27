const test = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");
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

test("closed details hide their contents from layout audit while summaries remain audited", () => {
  const makeNode = (tagName, rect, parentElement = null) => ({
    nodeType: 1, tagName, parentElement, children: [], classList: [], textContent: tagName,
    getBoundingClientRect: () => rect, hasAttribute: () => false, getAttribute: () => null,
    contains(element) { return this === element || this.children.some((child) => child.contains(element)); },
  });
  const visible = { left: 0, top: 0, right: 200, bottom: 44, width: 200, height: 44 };
  const zero = { left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0 };
  const details = makeNode("DETAILS", visible);
  details.open = false;
  const summary = makeNode("SUMMARY", visible, details);
  const button = makeNode("BUTTON", zero, details);
  details.children = [summary, button];
  const document = { documentElement: { scrollWidth: 390 }, body: { scrollWidth: 390 }, querySelectorAll: () => [summary, button] };
  const window = { innerWidth: 390, innerHeight: 844, getComputedStyle: () => ({ display: "block", visibility: "visible", opacity: "1" }) };
  const context = { window, document };
  assert.equal(vm.runInNewContext(renderAuditExpression(), context).zeroSizeControls.length, 0);
  details.open = true;
  const opened = vm.runInNewContext(renderAuditExpression(), context);
  assert.equal(opened.zeroSizeControls.length, 1);
  assert.equal(opened.zeroSizeControls[0].selector, "button");
  summary.getBoundingClientRect = () => zero;
  details.open = false;
  const closed = vm.runInNewContext(renderAuditExpression(), context);
  assert.equal(closed.zeroSizeControls.length, 1, "the visible summary must not be skipped");
  assert.equal(closed.zeroSizeControls[0].selector, "summary");
});
