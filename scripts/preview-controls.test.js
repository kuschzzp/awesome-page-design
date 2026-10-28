const test = require('node:test');
const assert = require('node:assert/strict');
const {renderChoiceControls} = require('./preview-controls');
test('custom choices preserve form names, values and selected options without native menus',()=>{
 const html=renderChoiceControls('<label>纸张<select name="paper"><option value="natural">自然白</option><option value="recycled" selected>再生纸</option></select></label>','09');
 assert.doesNotMatch(html,/<select\b/);
 assert.match(html,/type="hidden"[^>]*name="paper"[^>]*value="recycled"/);
 assert.match(html,/aria-label="纸张"/);
 assert.match(html,/data-choice-label>再生纸/);
 assert.match(html,/role="option" aria-selected="true" data-value="recycled"/);
 assert.match(html,/pd-swatch/);
});
test('visible labels target the combobox and option values are safely encoded',()=>{
 const html=renderChoiceControls('<label for="visit">到店时段</label><select id="visit" name="visit"><option>周六 10:00</option><option disabled>周日 14:00</option></select>','23');
 assert.match(html,/<label for="visit-trigger"/);
 assert.match(html,/id="visit-trigger"[^>]*aria-controls="visit-list"/);
 assert.match(html,/aria-label="到店时段"/);
 assert.match(html,/data-value="周六 10:00"/);
 assert.match(html,/aria-disabled="true"/);
});
test('multiple controls receive unique IDs and numeric fields retain validation constraints',()=>{
 const html=renderChoiceControls('<select name="size"><option>A4</option></select><select name="ink"><option>炭黑</option></select><input name="quantity" type="number" min="50" max="1000" step="50" required value="100">','09');
 const ids=[...html.matchAll(/\bid="([^"]*)"/g)].map(m=>m[1]);
 assert.equal(new Set(ids).size,ids.length);
 assert.match(html,/data-step="-1"/);assert.match(html,/data-step="1"/);
 assert.match(html,/type="number" min="50" max="1000" step="50" required value="100"/);
});
test('calendar fields retain form integration and constraints without a native date popup',()=>{
 const html=renderChoiceControls('<label for="reading">阅读日期</label><input id="reading" name="date" type="date" required min="2026-10-29" aria-describedby="date-error">','12');
 assert.doesNotMatch(html,/type="date"/);
 assert.match(html,/type="text" data-calendar-field readonly/);
 assert.match(html,/id="reading" name="date"/);
 assert.match(html,/required min="2026-10-29" aria-describedby="date-error"/);
});
test('wrapping labels continue to name the numeric input rather than a step button',()=>{
 const html=renderChoiceControls('<label>印制数量<input name="quantity" type="number" min="50" value="100"></label>','09');
 const labelable=[...html.matchAll(/<(input|button)\b/g)].map(m=>m[1]);
 assert.equal(labelable[0],'input');
});
test('stepper bounds refresh after programmatic book changes and dialog reopening',()=>{
 const vm=require('node:vm');const {decorateControls}=require('./preview-controls');
 const listeners={},dialogEvents={},buttons=[{dataset:{step:'-1'},addEventListener(){}},{dataset:{step:'1'},addEventListener(){}}];
 const input={value:'288',min:'1',max:'288',disabled:false,addEventListener:(event,fn)=>listeners[event]=fn,closest:()=>({addEventListener:(event,fn)=>dialogEvents[event]=fn})};
 const box={querySelector:()=>input,querySelectorAll:()=>buttons};let changed;
 const script=decorateControls('<style></style><body></body>','12').match(/<script>([\s\S]*?)<\/script>/)[1];
 vm.runInNewContext(script,{document:{readyState:'complete',querySelectorAll:selector=>selector==='.pd-stepper'?[box]:[],addEventListener(){}},addEventListener(){},MutationObserver:class{constructor(fn){changed=fn;}observe(){}},window:{}});
 assert.equal(buttons[1].disabled,true);
 input.max='400';input.value='126';changed();assert.equal(buttons[1].disabled,false);
 input.value='400';dialogEvents.toggle();assert.equal(buttons[1].disabled,true);
 input.value='1';listeners.input();assert.equal(buttons[0].disabled,true);
});
