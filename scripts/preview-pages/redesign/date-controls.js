function initializeDateControls() {
  const iso = date => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const parse = value => /^\d{4}-\d{2}-\d{2}$/.test(value || '') ? new Date(`${value}T12:00:00`) : null;
  const addDays = (date, count) => { const next = new Date(date); next.setDate(next.getDate() + count); return next; };
  const today = () => { const date = new Date(); date.setHours(12, 0, 0, 0); return date; };
  let sequence = 0;
  function bind() {
    document.querySelectorAll('.demo-root input[data-calendar-field]').forEach(input => {
      if (input.dataset.demoCalendar) return;
      input.dataset.demoCalendar = 'true';
      const root = input.closest('.demo-root'), value = input.value;
      input.type = 'text'; input.value = value; input.readOnly = true; input.placeholder = '选择日期';
      input.setAttribute('aria-haspopup', 'dialog'); input.setAttribute('aria-expanded', 'false');
      const wrapper = document.createElement('span'); wrapper.className = 'demo-date';
      input.before(wrapper); wrapper.appendChild(input);
      const trigger = document.createElement('button'); trigger.type = 'button'; trigger.className = 'demo-date-trigger';
      trigger.setAttribute('aria-label', '打开日期选择'); trigger.setAttribute('aria-haspopup', 'dialog'); trigger.setAttribute('aria-expanded', 'false');
      trigger.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14v15H5zM8 3v4m8-4v4M5 10h14M8 13h2m4 0h2m-8 4h2"/></svg>';
      wrapper.appendChild(trigger);
      const popup = document.createElement('div'), id = `demo-calendar-${++sequence}`;
      popup.id = id; popup.className = `demo-calendar ${root.classList.contains('s07') ? 'demo-calendar-garden' : 'demo-calendar-reading'}`;
      popup.setAttribute('role', 'dialog'); popup.setAttribute('aria-label', '选择日期'); popup.setAttribute('popover', 'manual');
      popup.hidden = true;
      popup.innerHTML = `<div class="demo-calendar-head"><button type="button" data-calendar-prev aria-label="上一个月">‹</button><strong data-calendar-month aria-live="polite"></strong><button type="button" data-calendar-next aria-label="下一个月">›</button></div><div class="demo-calendar-week" aria-hidden="true">${['一','二','三','四','五','六','日'].map(day => `<span>${day}</span>`).join('')}</div><div class="demo-calendar-days" role="group" aria-label="本月日期"></div><div class="demo-calendar-footer"><button type="button" data-calendar-today>今天</button><span data-calendar-selection role="status"></span><button type="button" data-calendar-clear>清空</button></div>`;
      wrapper.appendChild(popup); input.setAttribute('aria-controls', id); trigger.setAttribute('aria-controls', id);
      const monthLabel = popup.querySelector('[data-calendar-month]'), grid = popup.querySelector('.demo-calendar-days');
      const previous = popup.querySelector('[data-calendar-prev]'), next = popup.querySelector('[data-calendar-next]');
      let active = false, focused = today(), month = new Date(focused.getFullYear(), focused.getMonth(), 1, 12);
      const valid = date => (!input.min || iso(date) >= input.min) && (!input.max || iso(date) <= input.max);
      function clamp(date) {
        if (input.min && iso(date) < input.min) return parse(input.min);
        if (input.max && iso(date) > input.max) return parse(input.max);
        return date;
      }
      function validate() {
        const date = parse(input.value);
        input.setCustomValidity(input.value && (!date || !valid(date)) ? '请选择允许范围内的日期。' : '');
      }
      function render(focusDay = false) {
        monthLabel.textContent = `${month.getFullYear()} 年 ${month.getMonth() + 1} 月`;
        const first = new Date(month.getFullYear(), month.getMonth(), 1, 12), offset = (first.getDay() + 6) % 7;
        const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
        previous.disabled = !!input.min && iso(new Date(month.getFullYear(), month.getMonth(), 0, 12)) < input.min;
        next.disabled = !!input.max && iso(new Date(month.getFullYear(), month.getMonth() + 1, 1, 12)) > input.max;
        grid.innerHTML = Array.from({length: offset}, () => '<span aria-hidden="true"></span>').join('') + Array.from({length: days}, (_, index) => {
          const date = new Date(month.getFullYear(), month.getMonth(), index + 1, 12), key = iso(date), selected = input.value === key;
          return `<button type="button" data-calendar-day="${key}" tabindex="${key === iso(focused) ? '0' : '-1'}" aria-label="${month.getFullYear()}年${month.getMonth() + 1}月${index + 1}日${selected ? '，已选中' : ''}" aria-pressed="${selected}"${key === iso(today()) ? ' aria-current="date"' : ''}${valid(date) ? '' : ' disabled'}>${index + 1}</button>`;
        }).join('');
        popup.querySelector('[data-calendar-today]').disabled = !valid(today());
        popup.querySelector('[data-calendar-selection]').textContent = input.value ? `已选 ${input.value.slice(5).replace('-', ' / ')}` : '尚未选择';
        if (focusDay) grid.querySelector(`[data-calendar-day="${iso(focused)}"]`)?.focus();
      }
      function position() {
        const rect = wrapper.getBoundingClientRect(), width = Math.min(304, window.innerWidth - 24);
        popup.style.width = `${width}px`;
        const height = popup.getBoundingClientRect().height, below = window.innerHeight - rect.bottom - 12;
        popup.style.left = `${Math.max(12, Math.min(rect.left, window.innerWidth - width - 12))}px`;
        popup.style.top = `${Math.max(12, below >= height || rect.top < height + 12 ? Math.min(rect.bottom + 7, window.innerHeight - height - 12) : rect.top - height - 7)}px`;
      }
      function close(restore = false) {
        if (!active) return;
        active = false;
        if (typeof popup.hidePopover === 'function' && popup.matches(':popover-open')) popup.hidePopover();
        popup.hidden = true; input.setAttribute('aria-expanded', 'false'); trigger.setAttribute('aria-expanded', 'false');
        if (restore) input.focus();
      }
      function open() {
        if (active) { close(true); return; }
        focused = clamp(parse(input.value) || today()); month = new Date(focused.getFullYear(), focused.getMonth(), 1, 12);
        active = true; render(); popup.hidden = false;
        if (typeof popup.showPopover === 'function') popup.showPopover();
        input.setAttribute('aria-expanded', 'true'); trigger.setAttribute('aria-expanded', 'true'); position();
        grid.querySelector(`[data-calendar-day="${iso(focused)}"]`)?.focus();
      }
      function choose(value) {
        input.value = value; validate();
        input.dispatchEvent(new Event('input', {bubbles: true})); input.dispatchEvent(new Event('change', {bubbles: true})); close(true);
      }
      function moveMonth(count) {
        month = new Date(month.getFullYear(), month.getMonth() + count, 1, 12);
        const end = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
        focused = clamp(new Date(month.getFullYear(), month.getMonth(), Math.min(focused.getDate(), end), 12));
        month = new Date(focused.getFullYear(), focused.getMonth(), 1, 12); render(true); position();
      }
      trigger.addEventListener('click', open); input.addEventListener('click', open);
      input.addEventListener('keydown', event => { if (['ArrowDown','Enter',' '].includes(event.key)) {event.preventDefault(); open();} });
      input.addEventListener('input', validate); input.addEventListener('change', validate);
      previous.addEventListener('click', () => moveMonth(-1)); next.addEventListener('click', () => moveMonth(1));
      popup.querySelector('[data-calendar-today]').addEventListener('click', () => choose(iso(today())));
      popup.querySelector('[data-calendar-clear]').addEventListener('click', () => choose(''));
      grid.addEventListener('click', event => {const button = event.target.closest('[data-calendar-day]'); if (button && !button.disabled) choose(button.dataset.calendarDay);});
      // Some fields live inside a wrapping label; calendar clicks must not activate that label again.
      popup.addEventListener('click', event => event.preventDefault());
      popup.addEventListener('keydown', event => {
        if (event.key === 'Escape') {event.preventDefault();event.stopPropagation();close(true);return;}
        if (event.key === 'Tab') {
          const controls = [...popup.querySelectorAll('button:not(:disabled)')].filter(button => button.tabIndex >= 0);
          if (event.shiftKey && document.activeElement === controls[0]) {event.preventDefault(); controls.at(-1)?.focus();}
          else if (!event.shiftKey && document.activeElement === controls.at(-1)) {event.preventDefault();controls[0]?.focus();}
          return;
        }
        if (!event.target.matches('[data-calendar-day]')) return;
        let change = ({ArrowLeft:-1,ArrowRight:1,ArrowUp:-7,ArrowDown:7})[event.key];
        if (event.key === 'Home') change = -((focused.getDay()+6)%7);
        if (event.key === 'End') change = 6-((focused.getDay()+6)%7);
        if (change !== undefined) {event.preventDefault();focused = clamp(addDays(focused,change));month = new Date(focused.getFullYear(),focused.getMonth(),1,12);render(true);position();}
        else if (event.key === 'PageUp' || event.key === 'PageDown') {event.preventDefault();moveMonth(event.key === 'PageUp' ? -1 : 1);}
      });
      document.addEventListener('pointerdown', event => { if (active && !wrapper.contains(event.target)) close(); });
      const dialog = input.closest('dialog');
      dialog?.addEventListener('close', () => close());
      dialog?.addEventListener('cancel', event => {if (active) {event.preventDefault(); close(true);}});
      input.form?.addEventListener('reset', () => setTimeout(validate,0));
      window.addEventListener('resize', () => {if (active) position();});
      document.addEventListener('scroll', event => {if (active && !popup.contains(event.target)) position();},true);
      validate();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind, {once:true}); else bind();
}

const dateCss = `
.demo-root .demo-date{position:relative;display:block;width:100%;min-width:0}
.demo-root .demo-date>input{width:100%;padding-right:42px;cursor:pointer;font-variant-numeric:tabular-nums}
.demo-root .demo-date-trigger{position:absolute;right:5px;top:50%;transform:translateY(-50%);display:grid;place-items:center;width:32px;height:32px;min-height:0;padding:6px;border:0;border-radius:7px;color:inherit;background:transparent;box-shadow:none}
.demo-root .demo-date-trigger svg{display:block;width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:1.5}
.demo-root .demo-date-trigger:hover{background:#647a4920}
.demo-calendar{--calendar-bg:#fffdf6;--calendar-ink:#4b5844;--calendar-muted:#7b896d;--calendar-line:#d8e1c9;--calendar-tint:#edf3e3;--calendar-accent:#597547;position:fixed;inset:auto;margin:0;width:304px;max-width:calc(100vw - 24px);max-height:calc(100dvh - 24px);overflow:auto;padding:15px;border:1.5px solid var(--calendar-line);border-radius:17px;background:var(--calendar-bg);color:var(--calendar-ink);box-shadow:0 12px 40px #293b2729;font:13px/1.5 "PingFang SC","Microsoft YaHei",sans-serif;z-index:1000}
.demo-calendar-reading{--calendar-bg:#fffaff;--calendar-ink:#5e456c;--calendar-muted:#927d9d;--calendar-line:#d9c9e3;--calendar-tint:#f0e8f5;--calendar-accent:#79528e;border-radius:18px;box-shadow:0 12px 36px #513c6026}
.demo-calendar[hidden]{display:none!important}
.demo-calendar *{box-sizing:border-box}
.demo-calendar button{font:inherit;cursor:pointer;box-shadow:none;min-width:0;min-height:0;line-height:1.5;letter-spacing:0}
.demo-calendar button:focus-visible{outline:2px solid var(--calendar-accent);outline-offset:2px}
.demo-calendar-head{display:grid;grid-template-columns:32px 1fr 32px;align-items:center;gap:8px;margin-bottom:13px}
.demo-calendar-head strong{text-align:center;font-size:14px;font-weight:650}
.demo-calendar-head button{border:1px solid var(--calendar-line);border-radius:8px;width:32px;height:32px;padding:0;background:var(--calendar-tint);color:var(--calendar-ink);font-size:23px}
.demo-calendar-week,.demo-calendar-days{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:4px}
.demo-calendar-week{color:var(--calendar-muted);font-size:10px;text-align:center;margin-bottom:6px}
.demo-calendar-days button{border:1px solid transparent;border-radius:8px;aspect-ratio:1;padding:0;background:transparent;color:var(--calendar-ink);font-size:12px;font-variant-numeric:tabular-nums}
.demo-calendar-days button:not(:disabled):hover{background:var(--calendar-tint);border-color:var(--calendar-line)}
.demo-calendar-days button[aria-current=date]{border-color:var(--calendar-accent)}
.demo-calendar-days button[aria-pressed=true]{background:var(--calendar-accent);color:var(--calendar-bg);font-weight:700}
.demo-calendar-days button[aria-pressed=true]:hover{background:var(--calendar-accent)}
.demo-calendar button:disabled{opacity:.3;cursor:not-allowed}
.demo-calendar-footer{display:flex;align-items:center;justify-content:space-between;gap:7px;border-top:1px dashed var(--calendar-line);margin-top:12px;padding-top:10px;font-size:10px;color:var(--calendar-muted)}
.demo-calendar-footer button{padding:5px 7px;border:0;border-radius:6px;background:transparent;color:var(--calendar-accent);font-size:11px}
.demo-calendar-footer button:hover{background:var(--calendar-tint)}
`;

module.exports = { dateRuntimeScript: `(${initializeDateControls.toString()})();`, dateCss };
