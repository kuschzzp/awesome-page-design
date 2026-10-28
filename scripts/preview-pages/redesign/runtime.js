function initializePageDesignDemo() {
  const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const openers = new WeakMap();
  function openDialog(dialog, opener) { if (!dialog || dialog.open) return; openers.set(dialog, opener || document.activeElement); dialog.showModal(); }
  function closeDialog(dialog) { if (dialog?.open) dialog.close(); }
  function bindDialogs(root) {
    root.querySelectorAll('[data-demo-open]').forEach(button => button.addEventListener('click', () => openDialog(root.querySelector(button.dataset.demoOpen), button)));
    root.querySelectorAll('[data-demo-close]').forEach(button => button.addEventListener('click', () => closeDialog(button.closest('dialog'))));
    root.querySelectorAll('dialog').forEach(dialog => {
      dialog.addEventListener('close', () => { const opener = openers.get(dialog); if (opener?.isConnected) opener.focus(); });
      dialog.addEventListener('click', event => { const rect = dialog.getBoundingClientRect(); if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) closeDialog(dialog); });
    });
  }
  function wireForm(form, onValid) {
    form.noValidate = true;
    const fields = [...form.querySelectorAll('input:not([type=radio]):not([type=checkbox]), textarea, select')];
    function errorNode(field) { return document.getElementById(field.getAttribute('aria-describedby')); }
    function setError(field, message) { const error = errorNode(field); if (error) error.textContent = message; if (message) field.setAttribute('aria-invalid','true'); else field.removeAttribute('aria-invalid'); }
    fields.forEach(field => field.addEventListener('input', () => { if (field.value.trim() && field.validity.valid) setError(field, ''); }));
    form.addEventListener('submit', event => {
      event.preventDefault(); let firstInvalid;
      fields.forEach(field => { const invalid = (field.required && !field.value.trim()) || !field.validity.valid; setError(field, invalid ? (field.dataset.error || '请填写有效内容后再继续。') : ''); if (invalid && !firstInvalid) firstInvalid = field; });
      if (firstInvalid) { firstInvalid.focus(); return; }
      onValid(new FormData(form), form);
    });
  }
  function download(filename, content, type = 'text/plain;charset=utf-8') {
    const url = URL.createObjectURL(new Blob([content], {type})); const anchor = document.createElement('a'); anchor.href = url; anchor.download = filename; anchor.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  async function copy(text) { try { await navigator.clipboard.writeText(text); return true; } catch { return false; } }
  function toast(root, message) {
    let node = root.querySelector('.demo-toast');
    if (!node) { node = document.createElement('div'); node.className = 'demo-toast'; node.setAttribute('role','status'); node.setAttribute('aria-live','polite'); root.appendChild(node); }
    node.textContent = message; node.hidden = false; clearTimeout(node._hideTimer); node._hideTimer = setTimeout(() => node.hidden = true, 2600);
  }
  const choiceLabel = input => input.closest("[data-choice]").querySelector("[data-choice-label]").textContent;
  window.PageDesignDemo = { choiceLabel, escapeHtml, openDialog, closeDialog, bindDialogs, wireForm, download, copy, toast };
}
module.exports = { runtimeScript: `(${initializePageDesignDemo.toString()})();` };
