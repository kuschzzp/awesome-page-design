const fs = require('node:fs');
const path = require('node:path');
const { dateRuntimeScript, dateCss } = require('./preview-pages/redesign/date-controls');
const controlsCss = fs.readFileSync(path.join(__dirname, 'preview-pages', 'controls.css'), 'utf8');
const escape = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const attribute = (source, name) => source.match(new RegExp(`(?:^|\\s)${name}="([^"]*)"`))?.[1];

// Translate the generator's small, static option declarations into themed controls.
// No native Select (including a hidden one) is emitted in the resulting page.
function renderChoiceControls(html, styleId) {
  let index = 0;
  html = html.replace(/<select\b([^>]*)>([\s\S]*?)<\/select>/g, (source, attrs, body, offset) => {
    const id = attribute(attrs, 'id') || `choice-${styleId}-${++index}`;
    const options = [...body.matchAll(/<option\b([^>]*)>([\s\S]*?)<\/option>/g)].map(match => ({
      value: attribute(match[1], 'value') ?? match[2], label: match[2], selected: /\bselected\b/.test(match[1]), disabled: /\bdisabled\b/.test(match[1]),
    }));
    const selected = Math.max(0, options.findIndex(item => item.selected));
    const previous = html.slice(0, offset), enclosing = previous.slice(previous.lastIndexOf('<label'));
    const label = (enclosing.includes('</label>') ? previous.match(new RegExp(`<label[^>]*for="${id}"[^>]*>([^<]*)<\\/label>[^]*$`))?.[1] : enclosing.replace(/<[^>]*>/g, '').trim()) || options[selected].label;
    const preserved = attrs.replace(/\s(?:id|value|class)="[^"]*"/g, '').replace(/\s(?:required|disabled)\b/g, '');
    const disabled = /\bdisabled\b/.test(attrs);
    return `<span class="pd-choice" data-choice><input type="hidden" id="${id}"${preserved} value="${escape(options[selected].value)}"${disabled?' disabled':''}><button type="button" id="${id}-trigger" class="pd-choice-trigger" role="combobox" aria-label="${escape(label)}" aria-haspopup="listbox" aria-expanded="false" aria-controls="${id}-list"${disabled?' disabled':''}><span data-choice-label>${options[selected].label}</span><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg></button><span id="${id}-list" class="pd-choice-list pd-theme-${styleId}" role="listbox" aria-label="${escape(label)}" popover="manual" hidden>${options.map((item,i)=>`<span id="${id}-option-${i}" class="pd-choice-option" role="option" aria-selected="${i===selected}" data-value="${escape(item.value)}"${item.disabled?' aria-disabled="true"':''}>${/name="paper"/.test(attrs)?`<i class="pd-swatch pd-swatch-${i}" aria-hidden="true"></i>`:''}<span>${item.label}</span><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3 8 3 3 7-7"/></svg></span>`).join('')}</span></span>`;
  });
  // Labels must point to the visible, focusable trigger rather than the form value.
  html = html.replace(/<label\b([^>]*?)for="([^"]+)"/g, (source, attrs, id) => html.includes(`id="${id}-trigger"`) ? `<label${attrs}for="${id}-trigger"` : source);
  html = html.replace(/<input\b[^>]*type="number"[^>]*>/g, source => {
    const label = attribute(source, 'name') === 'quantity' ? '印制数量' : attribute(source, 'name') === 'page' ? '阅读页码' : '数量';
    return `<span class="pd-stepper">${source}<button type="button" data-step="-1" aria-label="减少${label}">−</button><button type="button" data-step="1" aria-label="增加${label}">＋</button></span>`;
  });
  html = html.replace(/<input\b[^>]*type="date"[^>]*>/g, source => source.replace('type="date"', 'type="text" data-calendar-field readonly'));
  return html;
}
function initializeControls() {
  function bind() {
    const controllers = [];
    document.querySelectorAll('[data-choice]').forEach(box => {
      const input = box.querySelector('input'), trigger = box.querySelector('.pd-choice-trigger'), list = box.querySelector('[role=listbox]'), options = [...list.querySelectorAll('[role=option]')];
      const initialValue = input.value;
      let active = 0, opened = false, search = '', searchTimer;
      const enabled = i => options[i]?.getAttribute('aria-disabled') !== 'true';
      const selectedIndex = () => Math.max(0, options.findIndex(option => option.dataset.value === input.value));
      function highlight(i) { active = i; options.forEach((option,n) => option.classList.toggle('pd-active', n === i)); trigger.setAttribute('aria-activedescendant', options[i].id); options[i].scrollIntoView({block:'nearest'}); }
      function position() {
        const r = trigger.getBoundingClientRect(), below = innerHeight-r.bottom-12, above = r.top-12;
        const height = Math.min(300, Math.max(90, Math.max(below, above))), up = below < 180 && above > below;
        const width = Math.min(Math.max(r.width, 200), innerWidth-24);
        Object.assign(list.style,{position:'fixed',margin:'0',left:`${Math.max(12,Math.min(r.left,innerWidth-width-12))}px`,width:`${width}px`,maxHeight:`${height}px`,top:up?'auto':`${r.bottom+6}px`,bottom:up?`${innerHeight-r.top+6}px`:'auto'});
      }
      function close() { if (!opened) return; opened = false; if (list.hidePopover && list.matches(':popover-open')) list.hidePopover(); list.hidden = true; trigger.setAttribute('aria-expanded','false'); trigger.removeAttribute('aria-activedescendant'); search='';clearTimeout(searchTimer); }
      function open(index=selectedIndex()) { if(trigger.disabled)return;controllers.forEach(c=>c.close());opened=true;list.hidden=false;position();if(list.showPopover)list.showPopover();trigger.setAttribute('aria-expanded','true');highlight(index); }
      function sync() { const i=selectedIndex(); box.querySelector('[data-choice-label]').textContent=options[i].querySelector('span').textContent; options.forEach((option,n)=>option.setAttribute('aria-selected',String(n===i))); }
      function choose(i) { if(!enabled(i))return;input.value=options[i].dataset.value;sync();close();trigger.focus();input.dispatchEvent(new Event('input',{bubbles:true}));input.dispatchEvent(new Event('change',{bubbles:true})); }
      trigger.addEventListener('click',()=>opened?close():open());
      trigger.addEventListener('keydown',event=>{
        const key=event.key;
        if(['ArrowDown','ArrowUp','Home','End'].includes(key)) { event.preventDefault(); if(!opened){open(key==='Home'?0:key==='End'?options.length-1:selectedIndex());return;} let n=key==='Home'?0:key==='End'?options.length-1:active+(key==='ArrowDown'?1:-1); n=Math.max(0,Math.min(options.length-1,n));while(!enabled(n)&&n>=0&&n<options.length)n+=key==='ArrowUp'||key==='End'?-1:1;if(options[n]&&enabled(n))highlight(n); }
        else if(key==='Escape'&&opened){event.preventDefault();event.stopPropagation();close();}
        else if((key==='Enter'||key===' ')&&opened){event.preventDefault();choose(active);}
        else if(key==='Tab')close();
        else if(key.length===1&&!event.ctrlKey&&!event.metaKey&&key!==' '){event.preventDefault();search+=key.toLocaleLowerCase();clearTimeout(searchTimer);searchTimer=setTimeout(()=>search='',600);const n=options.findIndex((o,i)=>enabled(i)&&o.textContent.trim().toLocaleLowerCase().startsWith(search));if(n>=0){if(!opened)open(n);else highlight(n);}}
      });
      list.addEventListener('pointerdown',event=>event.preventDefault());
      list.addEventListener('click',event=>{const option=event.target.closest('[role=option]');if(option){event.preventDefault();choose(options.indexOf(option));}});
      document.addEventListener('pointerdown',event=>{if(!box.contains(event.target))close();});
      document.addEventListener('focusin',event=>{if(!box.contains(event.target))close();});
      box.closest('dialog')?.addEventListener('close',close);
      box.closest('dialog')?.addEventListener('cancel',event=>{if(opened){event.preventDefault();close();}});
      input.form?.addEventListener('reset',()=>setTimeout(()=>{input.value=initialValue;close();sync();},0));
      controllers.push({close,position,isOpen:()=>opened});sync();
    });
    addEventListener('resize',()=>controllers.forEach(c=>c.isOpen()&&c.position()));
    document.addEventListener('scroll',()=>controllers.forEach(c=>c.isOpen()&&c.position()),true);
    document.querySelectorAll('.pd-stepper').forEach(box=>{
      const input=box.querySelector('input'),buttons=[...box.querySelectorAll('button')];
      function sync(){buttons[0].disabled=input.disabled||input.min!==''&&Number(input.value)<=Number(input.min);buttons[1].disabled=input.disabled||input.max!==''&&Number(input.value)>=Number(input.max);}
      buttons.forEach(button=>button.addEventListener('click',()=>{try{Number(button.dataset.step)>0?input.stepUp():input.stepDown();}catch{return;}input.dispatchEvent(new Event('input',{bubbles:true}));input.dispatchEvent(new Event('change',{bubbles:true}));sync();}));
      input.addEventListener('input',sync);input.form?.addEventListener('reset',()=>setTimeout(sync,0));
      new MutationObserver(sync).observe(input,{attributes:true,attributeFilter:['min','max','disabled']});
      input.closest('dialog')?.addEventListener('toggle',sync);sync();
    });
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',bind,{once:true}):bind();
}
function decorateControls(html, styleId) {
  html=renderChoiceControls(html,styleId);
  return html.replace('</style>',`${controlsCss}\n${dateCss}\n</style>`).replace('</body>',`<script>(${initializeControls.toString()})();${dateRuntimeScript}</script>\n</body>`);
}
module.exports={decorateControls,renderChoiceControls};
