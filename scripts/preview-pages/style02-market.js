const stalls = [
  { name: '纸间散步', category: 'print', label: '插画出版', number: 'A—01', description: '把城市里的小事，印成可以带走的风景。独立小志、丝网版画与旅行手帖。', art: 'print', tag: '一张纸的远行' },
  { name: '慢物制造所', category: 'craft', label: '独立手作', number: 'B—06', description: '不太规整，也不急着一样。手捏陶器、织物与日常里刚刚好的小物。', art: 'craft', tag: '有一点不一样' },
  { name: '半拍唱片行', category: 'music', label: '现场音乐', number: 'C—03', description: '从一张旧唱片开始聊天。独立发行、黑胶试听，还有午后的街角演出。', art: 'music', tag: '让耳朵出门' },
];
const schedule = {
  saturday: [['11:00', '开门，先逛一圈', '全场 · 摊主们已经就位'], ['14:00', '把灵感印在纸上', '工作台 · 丝网印刷体验'], ['16:30', '街角留给一首歌', '小舞台 · 半拍乐队现场']],
  sunday: [['11:00', '周日也慢慢来', '全场 · 市集开放'], ['13:30', '捏一个不标准的杯子', '工作台 · 手捏陶土体验'], ['16:00', '最后一张唱片', '小舞台 · 黑胶分享与收场曲']],
};
function artwork() {
  return `<svg class="ym-artwork" viewBox="0 0 480 390" role="img" aria-label="原创几何拼贴：太阳、棋盘、印刷纸张和跃动的黑色曲线">
    <defs><pattern id="ym-check" width="32" height="32" patternUnits="userSpaceOnUse"><rect width="32" height="32" fill="#fffdf6"/><path d="M0 0h16v16H0zM16 16h16v16H16z" fill="#171713"/></pattern></defs>
    <rect x="24" y="34" width="330" height="304" fill="#171713" transform="rotate(-7 190 190)"/>
    <g transform="rotate(-7 190 190)"><rect x="14" y="24" width="330" height="304" fill="#fffdf6" stroke="#171713" stroke-width="2"/><rect x="32" y="42" width="294" height="43" fill="url(#ym-check)"/>
      <text x="38" y="160" font-size="64" font-weight="900" fill="#171713">灵感</text><text x="38" y="232" font-size="64" font-weight="900" fill="#171713">不打烊</text><path d="M38 258h260M38 269h180" stroke="#171713" stroke-width="2"/><text x="38" y="303" font-family="monospace" font-size="13" fill="#171713">GOOD IDEAS. GREAT COMPANY.</text></g>
    <g transform="translate(357 110) rotate(12)"><path d="M0-82 16-48 47-68 45-32 80-29 57 0 80 29 45 32 47 68 16 48 0 82-16 48-47 68-45 32-80 29-57 0-80-29-45-32-47-68-16-48Z" fill="#f04b2e" stroke="#171713" stroke-width="2"/><text x="0" y="-4" text-anchor="middle" font-size="18" font-weight="800" fill="#171713">好点子</text><text x="0" y="22" text-anchor="middle" font-size="18" font-weight="800" fill="#171713">集合！</text></g>
    <path d="M310 279c-25-70 65-86 73-35s-65 59-43 101c17 33 72 0 86-41" fill="none" stroke="#171713" stroke-width="22"/>
    <rect x="286" y="333" width="157" height="38" fill="#fff04d" stroke="#171713" stroke-width="2" transform="rotate(5 360 350)"/><text x="365" y="359" text-anchor="middle" font-family="monospace" font-size="18" font-weight="700" fill="#171713" transform="rotate(5 360 350)">VOL. 03 / 2026</text>
  </svg>`;
}
function initMarket() {
  const root = document.querySelector('.ym-market');
  const $ = selector => root.querySelector(selector);
  const ticketDialog = $('#ym-ticket-dialog'), detailDialog = $('#ym-stall-dialog');
  let ticket = null, ticketOpener = null, detailOpener = null;
  function setNicknameError(message) {
    const input = $('#ym-nickname');
    if (message) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
    $('#ym-nickname-error').textContent = message;
  }
  const days = { saturday: '11 月 14 日 · 周六', sunday: '11 月 15 日 · 周日' };
  function showTicket(opener) {
    ticketOpener = opener;
    setNicknameError('');
    $('[data-ym-ticket-form]').hidden = Boolean(ticket);
    $('[data-ym-ticket-result]').hidden = !ticket;
    $('#ym-ticket-title').textContent = ticket ? '周末，街上见。' : '给这个周末，留张票。';
    ticketDialog.showModal();
    (ticket ? $('[data-ym-ticket-close]') : $('#ym-nickname')).focus();
  }
  root.querySelectorAll('[data-ym-ticket]').forEach(button => button.addEventListener('click', () => showTicket(button)));
  root.querySelectorAll('[data-ym-ticket-close]').forEach(button => button.addEventListener('click', () => ticketDialog.close()));
  ticketDialog.addEventListener('close', () => ticketOpener?.focus());
  $('[data-ym-ticket-form]').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget, nickname = form.elements.nickname.value.trim();
    if (!nickname) {
      setNicknameError('请填写昵称，方便生成你的入场券。');
      form.elements.nickname.focus();
      return;
    }
    setNicknameError('');
    ticket = { nickname, day: form.elements.visitDay.value };
    $('[data-ym-ticket-name]').textContent = ticket.nickname;
    $('[data-ym-ticket-date]').textContent = days[ticket.day];
    $('[data-ym-ticket-form]').hidden = true; $('[data-ym-ticket-result]').hidden = false;
    $('#ym-ticket-title').textContent = '周末，街上见。';
    $('[data-ym-my-ticket]').textContent = '我的票券 ↗';
    $('[data-ym-ticket-close]').focus();
  });
  $('#ym-nickname').addEventListener('input', event => {
    if (event.target.value.trim()) setNicknameError('');
  });
  root.querySelectorAll('[data-ym-category]').forEach(button => button.addEventListener('click', () => {
    root.querySelectorAll('[data-ym-category]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    let count = 0;
    root.querySelectorAll('[data-ym-stall]').forEach(card => { card.hidden = button.dataset.ymCategory !== 'all' && card.dataset.ymCategory !== button.dataset.ymCategory; if (!card.hidden) count++; });
    $('[data-ym-filter-status]').textContent = `当前展示 ${count} 个摊位`;
  }));
  root.querySelectorAll('[data-ym-day]').forEach(button => button.addEventListener('click', () => {
    root.querySelectorAll('[data-ym-day]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    root.querySelectorAll('[data-ym-program]').forEach(panel => panel.hidden = panel.dataset.ymProgram !== button.dataset.ymDay);
  }));
  root.querySelectorAll('[data-ym-stall-open]').forEach(button => button.addEventListener('click', () => {
    const card = button.closest('[data-ym-stall]'); detailOpener = button;
    $('#ym-stall-title').textContent = card.querySelector('h3').textContent;
    $('[data-ym-stall-description]').textContent = card.querySelector('[data-ym-description]').textContent;
    $('[data-ym-stall-location]').textContent = `${card.dataset.ymNumber} · 两天都在，欢迎来聊聊`;
    detailDialog.showModal();
  }));
  $('[data-ym-stall-close]').addEventListener('click', () => detailDialog.close());
  detailDialog.addEventListener('close', () => detailOpener?.focus());
  [ticketDialog, detailDialog].forEach(dialog => dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  }));
}
function renderStyle02Market() {
  return `<div class="ym-market">
    <header class="ym-header"><a href="#top" class="ym-brand" aria-label="越界创意市集首页"><span class="ym-brand-mark" aria-hidden="true">↗</span><span>越界<span class="ym-brand-sub">创意市集 / OFF THE GRID</span></span></a><nav aria-label="市集导航"><a href="#ym-stalls">逛什么</a><a href="#ym-program">活动安排</a><button type="button" data-ym-ticket data-ym-my-ticket>我的票券 ↗</button></nav></header>
    <section class="ym-hero" aria-labelledby="ym-headline">
      <div class="ym-hero-copy"><div class="ym-eyebrow"><span class="ym-dot"></span> 把周末交给有趣的人 <span class="ym-edition">第三回</span></div><h1 id="ym-headline">把好点子<br>带到<span class="ym-underlined">街上。</span></h1><p class="ym-intro">翻一本没见过的小志，碰一件有脾气的手作。<br>再听完一首歌，认识几个同样有趣的人。</p><div class="ym-hero-actions"><button type="button" class="ym-button ym-button-black" data-ym-ticket>领取免费入场券 <span aria-hidden="true">↗</span></button><a class="ym-text-link" href="#ym-stalls">先逛逛摊位 <span aria-hidden="true">↓</span></a></div><div class="ym-hero-bottom"><span>独立创作 · 好奇心不限量</span><span class="ym-mono">COME AS YOU ARE.</span></div></div>
      <div class="ym-hero-right"><div class="ym-poster">${artwork()}</div><div class="ym-event-ticket"><div><span class="ym-caption">这个周末的坐标</span><strong>11.14—15<span>2026 / SAT—SUN</span></strong><p>江湾 · 旧印厂 <span>11:00—18:00</span></p></div><span class="ym-ticket-arrow" aria-hidden="true">↗</span></div></div>
    </section>
    <div class="ym-strip" aria-label="插画出版、独立手作、现场音乐与好点子"><span>插画出版</span><i aria-hidden="true">✳</i><span>独立手作</span><i aria-hidden="true">✳</i><span>现场音乐</span><i aria-hidden="true">✳</i><span>还有你的好点子</span><span class="ym-strip-end" aria-hidden="true">↗</span></div>
    <section class="ym-section" id="ym-stalls" aria-labelledby="ym-stalls-title"><div class="ym-section-head"><div><p class="ym-kicker">01 / MEET THE MAKERS</p><h2 id="ym-stalls-title">每一摊，都有点来头。</h2></div><p>小批量创作，大方地分享。</p></div><div class="ym-filters" role="group" aria-label="筛选摊位类别">${[['all','全部摊位'],['print','插画出版'],['craft','独立手作'],['music','现场音乐']].map(([key,label])=>`<button type="button" data-ym-category="${key}" aria-pressed="${key==='all'}">${label}</button>`).join('')}</div><p class="ym-sr-only" role="status" data-ym-filter-status>当前展示 3 个摊位</p><div class="ym-stalls">${stalls.map(stall=>`<article class="ym-stall" data-ym-stall data-ym-category="${stall.category}" data-ym-number="${stall.number}"><div class="ym-stall-art ym-stall-art-${stall.art}" aria-hidden="true"><span class="ym-stall-number">${stall.number}</span><span class="ym-art-object"></span><b>${stall.tag}</b></div><div class="ym-stall-meta"><span>${stall.label}</span><button type="button" data-ym-stall-open aria-label="了解${stall.name}">了解摊主 ↗</button></div><h3>${stall.name}</h3><p data-ym-description>${stall.description}</p></article>`).join('')}</div></section>
    <section class="ym-program-section" id="ym-program" aria-labelledby="ym-program-title"><div class="ym-program-intro"><p class="ym-kicker">02 / MAKE A DAY OF IT</p><h2 id="ym-program-title">别赶时间。<br>好玩的，慢慢来。</h2><p>逛累了就坐一会儿。<br>下午的工作台和小舞台，总有新鲜事。</p><span class="ym-program-flower" aria-hidden="true">✳</span></div><div class="ym-program-board"><div class="ym-day-switch" role="group" aria-label="选择活动日期"><button type="button" aria-pressed="true" data-ym-day="saturday">11.14 <span>周六</span></button><button type="button" aria-pressed="false" data-ym-day="sunday">11.15 <span>周日</span></button></div>${Object.entries(schedule).map(([day,rows])=>`<div data-ym-program="${day}"${day==='sunday'?' hidden':''}><ol class="ym-program-list">${rows.map(([time,title,location])=>`<li><time>${time}</time><div><h3>${title}</h3><p>${location}</p></div><span aria-hidden="true">↗</span></li>`).join('')}</ol></div>`).join('')}<p class="ym-program-note">工作坊现场报名，座位有限。市集入场免费。</p></div></section>
    <footer class="ym-footer"><div><strong>周末见，带上好奇心。</strong><p>越界创意市集 · 第三回</p></div><button type="button" class="ym-button ym-button-black" data-ym-ticket>给我留张票 <span aria-hidden="true">↗</span></button><small>原创虚构活动，仅作页面演示；票券保存在本次页面中，刷新后清空。</small></footer>
    <dialog class="ym-dialog" id="ym-ticket-dialog" aria-labelledby="ym-ticket-title"><button type="button" class="ym-dialog-close" data-ym-ticket-close aria-label="关闭领票窗口"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m6 6 12 12M18 6 6 18"/></svg></button><p class="ym-kicker">OFF THE GRID / FREE ENTRY</p><h2 id="ym-ticket-title">给这个周末，留张票。</h2><form data-ym-ticket-form novalidate><div class="ym-field"><label for="ym-nickname">怎么称呼你？</label><input id="ym-nickname" name="nickname" placeholder="写下你的昵称" maxlength="16" required autocomplete="off" aria-describedby="ym-nickname-error"><span class="ym-field-error" id="ym-nickname-error" role="alert" aria-atomic="true"></span></div><fieldset class="ym-visit-days"><legend>哪天来逛？</legend><label><input type="radio" name="visitDay" value="saturday" checked><span>11.14 <small>周六</small></span></label><label><input type="radio" name="visitDay" value="sunday"><span>11.15 <small>周日</small></span></label></fieldset><div class="ym-form-summary"><span>单人入场券</span><strong>¥ 0</strong></div><p class="ym-form-note">无需手机或邮箱。此为本地演示，不会提交个人信息。</p><button type="submit" class="ym-button ym-button-black">生成我的入场券 ↗</button></form><section data-ym-ticket-result hidden aria-label="你的演示入场券"><div class="ym-issued-ticket"><span class="ym-caption">越界创意市集 / VOL.03</span><h3><span data-ym-ticket-name></span>，欢迎越界。</h3><p data-ym-ticket-date></p><p>江湾 · 旧印厂 / 11:00—18:00</p><div class="ym-barcode" aria-hidden="true"></div><small>OFF—2026—001 / 演示票券，无实际入场效力</small></div><p class="ym-form-note">再次点击“我的票券”即可查看，刷新页面后清空。</p><button type="button" class="ym-button ym-button-black" data-ym-ticket-close>收好票，继续逛</button></section></dialog>
    <dialog class="ym-dialog ym-stall-dialog" id="ym-stall-dialog" aria-labelledby="ym-stall-title"><button type="button" class="ym-dialog-close" data-ym-stall-close aria-label="关闭摊位介绍"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m6 6 12 12M18 6 6 18"/></svg></button><p class="ym-kicker">MEET THE MAKER</p><h2 id="ym-stall-title"></h2><p class="ym-stall-description" data-ym-stall-description></p><p class="ym-stall-location" data-ym-stall-location></p></dialog>
    <script>(${initMarket.toString()})();</script>
  </div>`;
}
module.exports = { renderStyle02Market };
