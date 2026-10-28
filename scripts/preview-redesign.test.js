const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const { runtimeScript } = require('./preview-pages/redesign/runtime');
function setup(values) {
  const errors = new Map();
  const fields = values.map((value, index) => {
    const listeners = {}, attrs = new Map([['aria-describedby', `error-${index}`]]);
    errors.set(`error-${index}`, { textContent: '' });
    return { value, required: true, validity: {valid: true}, dataset: {error:'请填写有效内容'}, listeners,
      addEventListener: (event, fn) => listeners[event] = fn,
      getAttribute: name => attrs.get(name), setAttribute: (name,value) => attrs.set(name,value),
      removeAttribute: name => attrs.delete(name), focus() { this.focused = true; } };
  });
  const listeners = {}, form = {querySelectorAll: () => fields, addEventListener: (event, fn) => listeners[event] = fn};
  const window = {}, context = {window, document: {getElementById: id => errors.get(id)}, FormData: class {constructor(form) { this.form = form; }}};
  vm.runInNewContext(runtimeScript, context);
  let submitted = 0;
  window.PageDesignDemo.wireForm(form, () => submitted++);
  return {fields, errors, form, submit: () => listeners.submit({preventDefault(){}}), submitted: () => submitted};
}
test('redesigned forms replace browser bubbles and focus the first invalid field', () => {
  const f = setup(['', '']); f.submit();
  assert.equal(f.form.noValidate, true);
  assert.equal(f.submitted(), 0);
  assert.equal(f.fields[0].focused, true);
  assert.equal(f.fields[1].focused, undefined);
  assert.equal(f.fields[0].getAttribute('aria-invalid'), 'true');
  assert.equal(f.errors.get('error-0').textContent, '请填写有效内容');
});
test('whitespace and typed constraints are rejected while editing preserves useful errors', () => {
  const f = setup(['   ', 'bad']); f.fields[1].validity.valid = false; f.submit();
  assert.equal(f.submitted(), 0);
  f.fields[0].listeners.input();
  assert.equal(f.fields[0].getAttribute('aria-invalid'), 'true');
  f.fields[1].listeners.input();
  assert.equal(f.fields[1].getAttribute('aria-invalid'), 'true');
});
test('valid correction clears the associated message and allows form submission', () => {
  const f = setup(['']); f.submit(); f.fields[0].value = '观众'; f.fields[0].listeners.input();
  assert.equal(f.errors.get('error-0').textContent, '');
  assert.equal(f.fields[0].getAttribute('aria-invalid'), undefined);
  f.submit(); assert.equal(f.submitted(), 1);
});
