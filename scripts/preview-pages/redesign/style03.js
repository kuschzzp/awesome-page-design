const stars = [
  {name:'织女星',en:'VEGA',x:43,y:24,mag:'0.03',direction:'西北方 · 天琴座',description:'夏季大三角中最明亮的一颗。先找到这束蓝白色的光，再顺着它寻找银河。',alt:[62,51,38,24,12]},
  {name:'天津四',en:'DENEB',x:62,y:37,mag:'1.25',direction:'北偏西 · 天鹅座',description:'天鹅尾部的白色恒星。它与织女星、牛郎星一起，标出一片宽阔的夏夜天空。',alt:[71,65,57,46,32]},
  {name:'牛郎星',en:'ALTAIR',x:49,y:65,mag:'0.77',direction:'西方 · 天鹰座',description:'两侧各有一颗较暗的伴星，像一根短短的扁担。试着用肉眼找到这组三星。',alt:[45,40,30,20,8]},
  {name:'北极星',en:'POLARIS',x:79,y:22,mag:'1.98',direction:'正北方 · 小熊座',description:'它在北方天空中保持着近乎固定的位置。让视线适应黑暗之后，寻找这颗安静的路标。',alt:[31,31,31,31,31]},
  {name:'仙女座星系',en:'M31',x:76,y:63,mag:'3.44',direction:'东北方 · 仙女座',description:'远离城市灯光时，它像一抹很淡的云。双筒望远镜更容易辨认这片遥远的微光。',alt:[28,39,51,62,70]},
];
function init() {
  const root=document.querySelector('.s03'),D=window.PageDesignDemo;
  if(!root||!D)return;D.bindDialogs(root);
  const objects=JSON.parse(root.querySelector('[data-stars]').textContent),saved=new Set();let current=0;
  const range=root.querySelector('[data-time]'),readout=root.querySelector('[data-readout]');
  const update=()=>{
    const obj=objects[current],hour=Number(range.value),alt=obj.alt[hour];
    root.querySelector('[data-object-name]').textContent=obj.name;
    root.querySelector('[data-object-en]').textContent=obj.en;
    root.querySelector('[data-object-description]').textContent=obj.description;
    root.querySelector('[data-direction]').textContent=obj.direction;
    root.querySelector('[data-altitude]').textContent=alt+'°';
    root.querySelector('[data-magnitude]').textContent=obj.mag;
    const button=root.querySelector('[data-save]');button.textContent=saved.has(current)?'已在观测清单中':'加入今晚清单';button.setAttribute('aria-pressed',String(saved.has(current)));
    const sky=root.querySelector('.s03-sky'),ratio=sky.clientWidth/sky.clientHeight,angle=(hour-2)*5*Math.PI/180;
    root.querySelectorAll('[data-star]').forEach(b=>{const object=objects[Number(b.dataset.star)],selected=Number(b.dataset.star)===current,x=object.x-50,y=object.y-50;b.classList.toggle('is-selected',selected);b.setAttribute('aria-pressed',String(selected));b.style.left=(50+x*Math.cos(angle)-y/ratio*Math.sin(angle))+'%';b.style.top=(50+x*ratio*Math.sin(angle)+y*Math.cos(angle))+'%';});
    const time=(20+hour)%24;root.querySelector('[data-clock]').textContent=String(time).padStart(2,'0')+':00';
    root.querySelector('[data-sky-svg]').style.transform='rotate('+((hour-2)*5)+'deg)';
    root.querySelector('[data-sky-label]').textContent='模拟星空 · '+String(time).padStart(2,'0')+':00';
    range.setAttribute('aria-valuetext',String(time).padStart(2,'0')+'点');
  };
  root.querySelectorAll('[data-star]').forEach(b=>b.addEventListener('click',()=>{current=Number(b.dataset.star);update();}));
  range.addEventListener('input',update);
  window.addEventListener('resize',update);
  window.addEventListener('pagehide',()=>window.removeEventListener('resize',update),{once:true});
  const renderList=()=>{root.querySelector('[data-count]').textContent=String(saved.size).padStart(2,'0');readout.innerHTML=saved.size?[...saved].map(i=>'<li><span><b>'+D.escapeHtml(objects[i].name)+'</b><small>'+D.escapeHtml(objects[i].direction)+'</small></span><button type="button" data-remove="'+i+'" aria-label="从清单移除'+D.escapeHtml(objects[i].name)+'">移除</button></li>').join(''):'<li class="s03-empty">先点选星图上的一束光，<br>为今晚留下一份小小的计划。</li>';};
  root.querySelector('[data-save]').addEventListener('click',()=>{if(saved.has(current)){saved.delete(current);D.toast(root,'已从今晚清单移除');}else{saved.add(current);D.toast(root,'已加入今晚清单');}renderList();update();});
  readout.addEventListener('click',e=>{const b=e.target.closest('[data-remove]');if(!b)return;saved.delete(Number(b.dataset.remove));renderList();update();root.querySelector('[data-save]').focus();});
  root.querySelector('[data-download]').addEventListener('click',()=>{if(!saved.size){D.toast(root,'先选择想看的天体，再导出清单。');return;}D.download('夜航观测清单.txt','夜航天象台 · 今晚观测清单\n时间：'+root.querySelector('[data-clock]').textContent+'\n'+[...saved].map(i=>objects[i].name+' / '+objects[i].direction).join('\n')+'\n\n模拟星图，仅作交互演示；请按实际位置、天气及星历安排观测。');D.toast(root,'观测清单已下载');});
  renderList();update();
}
function render(){
  const points=Array.from({length:95},(_,i)=>{const x=(i*137.508)%800,y=(i*i*19.3+31)%560;return '<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+(i%7===0?1.7:.8)+'" fill="white" opacity="'+(0.18+(i%5)*.12)+'"/>';}).join('');
  return `<div class="demo-root s03"><header class="s03-header"><a href="#s03-observatory" class="s03-brand"><span class="s03-mark" aria-hidden="true">✧</span>夜航天象台<small>NIGHT VOYAGER</small></a><span class="s03-header-note">留一点时间，给头顶的宇宙。</span><a class="s03-outline" href="#s03-list">今晚清单 <span data-count>00</span></a></header>
  <section id="s03-observatory" class="s03-main"><div class="s03-heading"><div><p class="s03-eyebrow">OBSERVE THE QUIET ABOVE</p><h1>今晚，向星空出发。</h1><p class="s03-intro">不必急着记住名字。先找到那一束让你停下来的光。</p></div><div class="s03-place"><span class="s03-live"></span>北纬 31° · 秋夜模拟<br><small>2026.10.24 / 晴空示意</small></div></div>
  <div class="s03-workspace"><section class="s03-chart" aria-label="可交互星空示意图"><div class="s03-chart-top"><span>01 / SKY ATLAS</span><span data-sky-label>模拟星空 · 22:00</span></div><div class="s03-sky"><div class="s03-aurora"></div><svg data-sky-svg class="s03-stars" viewBox="0 0 800 560" preserveAspectRatio="none" aria-hidden="true"><defs><radialGradient id="s03-nebula"><stop stop-color="#98d6f1" stop-opacity=".21"/><stop offset="1" stop-color="#8c80ff" stop-opacity="0"/></radialGradient></defs><ellipse cx="400" cy="280" rx="330" ry="210" fill="url(#s03-nebula)"/><g fill="none" stroke="#89a7d6" stroke-opacity=".13"><ellipse cx="400" cy="280" rx="280" ry="210"/><ellipse cx="400" cy="280" rx="180" ry="210"/><ellipse cx="400" cy="280" rx="75" ry="210"/><path d="M120 280H680M155 190H645M155 370H645"/></g>${points}<path d="M344 134 L496 207 L392 364 Z" fill="#9bb5ec" fill-opacity=".025" stroke="#98c1f0" stroke-opacity=".45" stroke-dasharray="5 7"/><path d="M590 325L608 353L632 368L663 347" stroke="#a2badb" stroke-opacity=".45" fill="none"/></svg><span class="s03-compass s03-north">N / 北</span><span class="s03-compass s03-east">E / 东</span><span class="s03-compass s03-west">W / 西</span>${stars.map((s,i)=>`<button type="button" class="s03-star ${i===0?'is-selected':''}" data-star="${i}" style="left:${s.x}%;top:${s.y}%" aria-pressed="${i===0}"><span class="s03-star-dot"></span><span>${s.name}</span></button>`).join('')}<div class="s03-chart-caption"><span class="s03-line"></span>夏季大三角<span class="s03-dim">点击天体，读懂一束光</span></div></div><div class="s03-timeline"><div><span>观测时刻</span><strong data-clock>22:00</strong></div><label class="s03-range-label"><span class="s03-sr">调整模拟观测时间</span><input data-time type="range" min="0" max="4" value="2" step="1"><span class="s03-ticks"><span>20:00</span><span>22:00</span><span>00:00</span></span></label></div></section>
  <aside class="s03-object"><div class="s03-object-top"><span>正在仰望</span><span class="s03-object-symbol" aria-hidden="true">✦</span></div><p class="s03-object-code" data-object-en>VEGA</p><h2 data-object-name>织女星</h2><p data-object-description class="s03-description"></p><dl class="s03-data"><div><dt>所在方向</dt><dd data-direction></dd></div><div><dt>模拟高度</dt><dd data-altitude></dd></div><div><dt>视星等</dt><dd data-magnitude></dd></div></dl><button class="s03-primary" type="button" data-save aria-pressed="false">加入今晚清单</button><p class="s03-helper">清单仅在当前页面保存</p><section id="s03-list" class="s03-list"><h3>今晚想看 <span>OBSERVATION LIST</span></h3><ul data-readout></ul><button class="s03-download" type="button" data-download>导出观测清单 <span aria-hidden="true">↗</span></button></section></aside></div>
  <footer class="s03-footer"><p>让眼睛适应黑暗 20 分钟，星空会慢慢变得更丰富。</p><p>模拟星图，仅作交互演示。实际天象请以所在地星历为准。</p></footer></section><script type="application/json" data-stars>${JSON.stringify(stars)}</script><script>(${init.toString()})();</script></div>`;
}
module.exports={render};
