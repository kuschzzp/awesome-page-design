function init() {
  const root = document.querySelector('.s13');
  const D = window.PageDesignDemo;
  const $ = selector => root.querySelector(selector);
  D.bindDialogs(root);
  const meals = [
    { title: '照烧鸡腿饭', price: 26, subtitle: '去骨鸡腿 · 微甜照烧汁 · 五常米饭', color: '#a6552d' },
    { title: '香煎三文鱼饭', price: 36, subtitle: '香煎鱼排 · 柠檬海盐 · 五常米饭', color: '#e28e70' },
    { title: '菌菇豆腐饭', price: 23, subtitle: '烤豆腐 · 三种鲜菇 · 五常米饭', color: '#c19b5d' },
  ];
  const sides = { egg: { name: '溏心蛋', price: 4 }, greens: { name: '烤时蔬', price: 5 }, soup: { name: '南瓜浓汤', price: 6 } };
  let meal = 0;
  let selected = new Set(['egg']);
  let pickup = '12:20';
  let number = 16;
  function total() { return meals[meal].price + [...selected].reduce((sum, id) => sum + sides[id].price, 0); }
  function paint() {
    const dish = meals[meal];
    $('[data-main-name]').textContent = dish.title;
    $('[data-main-subtitle]').textContent = dish.subtitle;
    $('[data-main-price]').textContent = dish.price;
    $('[data-protein]').style.setProperty('--protein-color', dish.color);
    $('[data-dish-art]').setAttribute('aria-label', `${dish.title}与蔬菜组成的便当插画`);
    root.querySelectorAll('[data-meal]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.meal) === meal)));
    root.querySelectorAll('[data-side]').forEach(input => { input.checked = selected.has(input.dataset.side); });
    $('[data-order-main]').textContent = dish.title;
    $('[data-order-sides]').textContent = selected.size ? [...selected].map(id => sides[id].name).join(' / ') : '只要主食，也很好';
    $('[data-order-time]').textContent = `${pickup} 取餐`;
    $('[data-total]').textContent = total();
    $('[data-price-live]').textContent = `当前搭配 ${dish.title}，${selected.size} 份加餐，共 ${total()} 元。`;
  }
  root.querySelectorAll('[data-meal]').forEach(button => button.addEventListener('click', () => { meal = Number(button.dataset.meal); paint(); }));
  root.querySelectorAll('[data-side]').forEach(input => input.addEventListener('change', () => {
    if (input.checked) selected.add(input.dataset.side); else selected.delete(input.dataset.side);
    paint();
  }));
  root.querySelectorAll('[data-pickup]').forEach(button => button.addEventListener('click', () => {
    pickup = button.dataset.pickup;
    root.querySelectorAll('[data-pickup]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    paint();
  }));
  D.wireForm($('#s13-order-form'), values => {
    number += 1;
    $('#s13-ticket-number').textContent = `WH-${String(number).padStart(3, '0')}`;
    $('#s13-ticket-name').textContent = `${String(values.get('name')).trim()}，你的午餐搭配好了。`;
    $('#s13-ticket-meal').textContent = meals[meal].title;
    $('#s13-ticket-sides').textContent = selected.size ? [...selected].map(id => sides[id].name).join('、') : '不加配菜';
    $('#s13-ticket-time').textContent = `${pickup} · 南门自取窗口`;
    $('#s13-ticket-total').textContent = `¥ ${total()}`;
    D.openDialog($('#s13-ticket-dialog'), $('#s13-order-submit'));
  });
  paint();
}

function plate() {
  return `<svg data-dish-art viewBox="0 0 500 340" role="img" aria-label="鸡腿、米饭与蔬菜组成的原创便当插画"><defs><filter id="s13-shadow"><feDropShadow dx="0" dy="9" stdDeviation="8" flood-opacity=".1"/></filter></defs><g transform="translate(250 172) rotate(-10)" filter="url(#s13-shadow)"><rect x="-211" y="-129" width="422" height="258" rx="65" fill="#ded4c1"/><rect x="-204" y="-124" width="408" height="246" rx="60" fill="#fbf4df"/><path d="M-3-115V115" stroke="#e8dec8" stroke-width="8"/><path d="M8 5H194" stroke="#e8dec8" stroke-width="8"/><g fill="#fffdf3">${Array.from({length:46},(_,i)=>`<ellipse cx="${-178+(i%7)*24+(Math.floor(i/7)%2)*7}" cy="${-94+Math.floor(i/7)*30}" rx="16" ry="8" transform="rotate(${(i%3)*22-20} ${-178+(i%7)*24} ${-94+Math.floor(i/7)*30})"/>`).join('')}</g><g data-protein style="--protein-color:#a6552d"><path d="M-166-52Q-173-103-119-101L-58-87Q-20-72-36-27L-61 47Q-78 80-123 49L-165 3Z" fill="var(--protein-color)"/><g fill="none" stroke="#f4c379" stroke-width="6" opacity=".75"><path d="M-146-67-75-45M-150-38-69-16M-148-8-81 12M-134 22-94 36"/></g><g fill="#f9dfa2"><ellipse cx="-119" cy="-61" rx="2" ry="4"/><ellipse cx="-81" cy="-35" rx="2" ry="4"/><ellipse cx="-118" cy="1" rx="2" ry="4"/><ellipse cx="-96" cy="18" rx="2" ry="4"/></g></g><g fill="#78954b"><circle cx="63" cy="-56" r="30"/><circle cx="99" cy="-80" r="24"/><circle cx="126" cy="-52" r="32"/><circle cx="159" cy="-83" r="23"/></g><g fill="#9bb566"><circle cx="51" cy="-70" r="15"/><circle cx="106" cy="-58" r="18"/><circle cx="151" cy="-61" r="16"/></g><path d="M61 31Q108 13 143 50L113 103Q70 107 45 74Z" fill="#fffdf3"/><ellipse cx="97" cy="65" rx="23" ry="26" fill="#edb44d"/><g fill="#d56b44"><circle cx="165" cy="43" r="16"/><circle cx="163" cy="81" r="15"/></g><path d="M162 30 169 35 176 28" fill="none" stroke="#6b8646" stroke-width="3"/></g></svg>`;
}
function render() {
  return `<div class="demo-root s13"><header class="s13-header"><a href="#s13-menu" class="s13-brand"><span aria-hidden="true">◒</span> 午后厨房<small>认真吃饭，好好过午后。</small></a><span class="s13-open"><i></i> 今天也开火了</span></header><section class="s13-intro"><div><p>工作日午餐 · 当日现做</p><h1>把喜欢的，<br>装进一个便当。</h1></div><div class="s13-intro-note"><span>11:30—13:30</span><p>南门小窗口，自取不排队。<br>饭点很短，这一餐值得认真。</p></div></section>
  <section class="s13-bento" id="s13-menu" aria-label="搭配你的午餐"><section class="s13-main-tile"><div class="s13-tile-top"><span>01 / 选一道主食</span><span class="s13-fresh">每日限量制作</span></div><div class="s13-dish-copy"><h2 data-main-name>照烧鸡腿饭</h2><p data-main-subtitle>去骨鸡腿 · 微甜照烧汁 · 五常米饭</p><strong>¥<b data-main-price>26</b><small>/ 份</small></strong></div><div class="s13-plate">${plate()}</div><div class="s13-meals" role="group" aria-label="主食选择">${['照烧鸡腿','香煎三文鱼','菌菇豆腐'].map((name,index)=>`<button type="button" data-meal="${index}" aria-pressed="${index===0}">${name}</button>`).join('')}</div><div class="s13-main-footer"><span>一份主食 + 米饭 + 当日基础蔬菜</span><span>不吃辣，也很有味。</span></div></section>
  <section class="s13-side-tile s13-egg"><div class="s13-tile-top"><span>02 / 再加一点</span><span>+ ¥4</span></div><svg viewBox="0 0 210 145" role="img" aria-label="两半溏心蛋插画"><g transform="rotate(-18 105 70)"><ellipse cx="76" cy="73" rx="46" ry="56" fill="#f7f1d8"/><ellipse cx="76" cy="80" rx="24" ry="28" fill="#e5a738"/><ellipse cx="139" cy="69" rx="42" ry="54" fill="#fff8e5"/><ellipse cx="139" cy="78" rx="23" ry="28" fill="#eab441"/></g></svg><label><span><strong>溏心蛋</strong><small>多一点柔软</small></span><input type="checkbox" data-side="egg" aria-label="加一份溏心蛋，4元" checked></label></section>
  <section class="s13-side-tile s13-veg"><div class="s13-tile-top"><span>当季蔬菜</span><span>+ ¥5</span></div><svg viewBox="0 0 210 145" role="img" aria-label="烤南瓜与绿叶蔬菜插画"><path d="M40 106Q77 17 151 32L178 100Z" fill="#d6a545"/><path d="M53 103Q85 36 145 43L165 99Z" fill="#e9c668"/><path d="M91 115Q51 78 75 55Q123 73 121 119M120 113Q116 39 149 36Q171 91 135 116" fill="#6f8a48"/><path d="M99 111 78 66M128 108 146 47" fill="none" stroke="#a8b782" stroke-width="2"/></svg><label><span><strong>烤时蔬</strong><small>今天是南瓜和青菜</small></span><input type="checkbox" data-side="greens" aria-label="加一份烤时蔬，5元"></label></section>
  <section class="s13-soup-tile"><div class="s13-soup-art"><svg viewBox="0 0 150 110" role="img" aria-label="南瓜浓汤插画"><ellipse cx="75" cy="89" rx="57" ry="8" fill="#b3b99d" opacity=".4"/><path d="M19 39H132L115 87Q75 104 35 87Z" fill="#f2ecda"/><ellipse cx="75" cy="39" rx="57" ry="22" fill="#fff9e9"/><ellipse cx="75" cy="40" rx="49" ry="15" fill="#deb253"/><path d="M54 38Q77 27 96 39Q86 52 68 43" stroke="#f8e5a6" stroke-width="3" fill="none"/><path d="M60 13Q48 6 58-3M84 14Q98 5 88-5" fill="none" stroke="#c3c5ae" stroke-width="2"/></svg></div><label><span><strong>南瓜浓汤</strong><small>一碗热乎乎的收尾 · + ¥6</small></span><input type="checkbox" data-side="soup" aria-label="加一份南瓜浓汤，6元"></label></section>
  <section class="s13-time-tile"><div class="s13-tile-top"><span>03 / 什么时候来？</span><span aria-hidden="true">◷</span></div><h2>留好你的午餐时间。</h2><div class="s13-time-options" role="group" aria-label="取餐时段">${['12:00','12:20','12:40'].map(time=>`<button type="button" data-pickup="${time}" aria-pressed="${time==='12:20'}">${time}</button>`).join('')}<button type="button" disabled>13:00 · 已满</button></div><p>我们会在选定时段前准备好，<br>到店出示取餐号即可。</p></section>
  <section class="s13-order-tile"><div class="s13-tile-top"><span>YOUR LUNCH BOX</span><span aria-hidden="true">↗</span></div><h2>这一盒，刚刚好。</h2><p class="s13-order-main" data-order-main>照烧鸡腿饭</p><p class="s13-order-sides" data-order-sides>溏心蛋</p><span class="s13-order-time" data-order-time>12:20 取餐</span><form id="s13-order-form" novalidate><label for="s13-name">怎么称呼你？</label><input id="s13-name" name="name" placeholder="你的称呼" required maxlength="16" autocomplete="nickname" aria-describedby="s13-name-error" data-error="留一个称呼，取餐时更好找到你。"><span class="demo-field-error" id="s13-name-error"></span><div class="s13-order-bottom"><strong><small>合计</small>¥<b data-total>30</b></strong><button type="submit" id="s13-order-submit">生成取餐单 <span aria-hidden="true">→</span></button></div></form></section></section>
  <footer class="s13-footer"><p>好好吃饭，是一天里很重要的小事。</p><span>本地搭配演示 · 不付款、不产生真实订单 · 如有过敏问题请在实际订餐时咨询商家。</span></footer><span class="s13-sr" data-price-live role="status"></span>
  <dialog id="s13-ticket-dialog" aria-labelledby="s13-ticket-title"><div class="s13-dialog-head"><span>午后厨房 / PICKUP</span><button type="button" class="demo-close" data-demo-close aria-label="关闭取餐单"><svg viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></svg></button></div><h2 id="s13-ticket-title">午餐有着落了。</h2><p id="s13-ticket-name"></p><div class="s13-ticket"><span>演示取餐号</span><strong id="s13-ticket-number">WH-017</strong><p id="s13-ticket-meal"></p><p id="s13-ticket-sides"></p><div><span id="s13-ticket-time"></span><b id="s13-ticket-total"></b></div></div><p class="s13-ticket-note">此凭单用于演示，不能在真实门店取餐。</p><button type="button" class="s13-ticket-close" data-demo-close>收好，继续搭配</button></dialog><script>(${init.toString()})();</script></div>`;
}
module.exports = { render };
