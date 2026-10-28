function init() {
  const root = document.querySelector('.s12');
  const D = window.PageDesignDemo;
  const $ = selector => root.querySelector(selector);
  D.bindDialogs(root);
  const books = [
    { title: '把日子慢慢读', author: '林间 著 · 演示书目', pages: 288, current: 126, color: '#b997c3', subtitle: '在日常的缝隙里，留一点时间给自己。', chapters: ['一间有窗的房间', '散步时想到的事', '慢下来的午后', '写给未来的便笺'], schedule: null },
    { title: '树影里的来信', author: '许知禾 著 · 演示书目', pages: 216, current: 42, color: '#91a996', subtitle: '一棵树，一封信，和四季的回声。', chapters: ['从一片叶子开始', '风经过的地方', '夏日里的长信', '叶落以前'], schedule: null },
    { title: '周末去看海', author: '余白 著 · 演示书目', pages: 192, current: 18, color: '#8eabc5', subtitle: '离开熟悉的街道，去听远一点的声音。', chapters: ['出发之前', '沿着海岸线', '住在风里', '回程的灯'], schedule: null },
  ];
  let active = 0;
  let slot = '21:00';
  function paint() {
    const book = books[active];
    const percent = Math.round(book.current / book.pages * 100);
    $('[data-book-title]').textContent = book.title;
    $('[data-cover-title]').textContent = book.title;
    $('[data-author]').textContent = book.author;
    $('[data-book-subtitle]').textContent = book.subtitle;
    $('[data-page-current]').textContent = book.current;
    $('[data-page-total]').textContent = book.pages;
    $('[data-percent]').textContent = `${percent}%`;
    $('[data-progress]').style.width = `${percent}%`;
    $('[data-progress-track]').setAttribute('aria-valuenow', percent);
    $('[data-progress-track]').setAttribute('aria-valuetext', `已读 ${book.current} 页，共 ${book.pages} 页`);
    $('[data-cover]').style.setProperty('--book-color', book.color);
    $('#s12-page').max = book.pages;
    $('#s12-page').value = book.current;
    $('#s12-page').dataset.error = `请输入 1 至 ${book.pages} 之间的整数页码。`;
    $('#s12-page-error').textContent = '';
    $('#s12-page').removeAttribute('aria-invalid');
    root.querySelectorAll('[data-book]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.book) === active)));
    $('#s12-chapters').innerHTML = book.chapters.map((title, index) => {
      const start = Math.floor(book.pages / 4 * index) + 1;
      const end = index === 3 ? book.pages : Math.floor(book.pages / 4 * (index + 1));
      const current = book.current >= start && book.current <= end;
      return `<li><span class="s12-chapter-index">0${index + 1}</span><span>${D.escapeHtml(title)}<small>${start}—${end} 页</small></span><b>${current ? '读到这里' : book.current > end ? '已读' : '未读'}</b></li>`;
    }).join('');
    $('#s12-schedule-empty').hidden = Boolean(book.schedule);
    $('#s12-schedule-saved').hidden = !book.schedule;
    $('#s12-cancel-open').hidden = !book.schedule;
    if (book.schedule) {
      $('[data-scheduled-date]').textContent = `${book.schedule.date} / ${book.schedule.time}`;
      $('[data-scheduled-book]').textContent = `《${book.title}》 · 留给自己 30 分钟`;
    }
  }
  root.querySelectorAll('[data-book]').forEach(button => button.addEventListener('click', () => {
    active = Number(button.dataset.book);
    paint();
    $('[data-announcement]').textContent = `当前阅读：${books[active].title}，已读 ${books[active].current} 页。`;
  }));
  D.wireForm($('#s12-progress-form'), values => {
    books[active].current = Number(values.get('page'));
    paint();
    D.closeDialog($('#s12-progress-dialog'));
    D.toast(root, `已记到第 ${books[active].current} 页。下一次，从这里继续。`);
  });
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  $('#s12-date').min = today;
  $('#s12-date').value = today;
  root.querySelectorAll('[data-slot]').forEach(button => button.addEventListener('click', () => {
    slot = button.dataset.slot;
    root.querySelectorAll('[data-slot]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  }));
  D.wireForm($('#s12-schedule-form'), values => {
    books[active].schedule = { date: String(values.get('date')), time: slot };
    paint();
    D.closeDialog($('#s12-schedule-dialog'));
    D.toast(root, '阅读时段已安排，记录保留在当前页面。');
  });
  $('#s12-confirm-cancel').addEventListener('click', () => {
    books[active].schedule = null;
    paint();
    D.closeDialog($('#s12-cancel-dialog'));
    D.toast(root, '已取消这个阅读时段，随时可以重新安排。');
  });
  window.addEventListener('pagehide', () => { const toast = root.querySelector('.demo-toast'); if (toast) clearTimeout(toast._hideTimer); }, { once: true });
  paint();
}

const close = '<button type="button" class="demo-close" data-demo-close aria-label="关闭弹窗"><svg viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></svg></button>';
function render() {
  return `<div class="demo-root s12"><header class="s12-header"><a href="#s12-reading" class="s12-brand"><svg viewBox="0 0 30 30" width="28" height="28" aria-hidden="true"><path d="M3 6C8 4 11 5 15 8C19 5 23 4 27 6V24C23 22 19 23 15 26C11 23 7 22 3 24Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M15 8V26" stroke="currentColor"/></svg>书间<span>给阅读留一个位置</span></a><a class="s12-header-link" href="#s12-bookshelf">我的书架 <span aria-hidden="true">↗</span></a></header>
  <div class="s12-main"><section class="s12-greeting"><p>你好，今天也读一点。</p><h1>翻开书，也打开<br>一小段自己的时间。</h1><span class="s12-greeting-note">不必赶进度。<br>每一页，都是一次抵达。</span></section>
  <div class="s12-layout"><section class="s12-reading" id="s12-reading" aria-labelledby="s12-current-title"><div class="s12-reading-head"><h2 id="s12-current-title">正在读</h2><span>READING / 01</span></div><div class="s12-book-layout"><div class="s12-cover-stage"><div class="s12-book-back"></div><div class="s12-cover" data-cover><span class="s12-cover-series">日常的形状 / 文学随笔</span><strong data-cover-title>把日子慢慢读</strong><svg viewBox="0 0 180 160" role="img" aria-label="窗边阅读的抽象书封插画"><rect x="32" y="15" width="116" height="112" rx="55" fill="#eadfea"/><path d="M90 15V127M32 75H148" stroke="#ad8ab5" stroke-width="2"/><path d="M40 136Q90 110 140 136" fill="none" stroke="#6d4778" stroke-width="3"/><circle cx="117" cy="45" r="16" fill="#f9ecd6"/><path d="M52 130V90Q78 94 78 110V137M128 130V100Q102 101 102 120V137" fill="#70826c"/></svg><span>LIN JIAN · ESSAYS</span></div></div><div class="s12-book-info"><span class="s12-small-label">在读书目</span><h3 data-book-title>把日子慢慢读</h3><p data-author>林间 著 · 演示书目</p><p class="s12-book-line" data-book-subtitle>在日常的缝隙里，留一点时间给自己。</p><div class="s12-progress-copy"><strong><b data-page-current>126</b><small> / <span data-page-total>288</span> 页</small></strong><span data-percent>44%</span></div><div class="s12-progress-track" data-progress-track role="progressbar" aria-label="阅读进度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="44"><span data-progress></span></div><button type="button" class="s12-primary" data-demo-open="#s12-progress-dialog">记下读到的页码 <span aria-hidden="true">＋</span></button><p class="s12-book-whisper">一页也算，今天已经开始了。</p></div></div><div class="s12-chapter-head"><h3>章节足迹</h3><span>跟着故事，慢慢走</span></div><ol id="s12-chapters"></ol></section>
  <aside class="s12-side"><section class="s12-plan"><span class="s12-plan-leaf" aria-hidden="true">✳</span><p class="s12-small-label">下一次，和书见面</p><h2>给自己半小时</h2><div id="s12-schedule-empty"><p>选一个安静的时间，<br>把手机放远一点。</p><div class="s12-empty-time"><span aria-hidden="true">◷</span> 尚未安排阅读时段</div></div><div id="s12-schedule-saved" hidden><p data-scheduled-date></p><p data-scheduled-book></p><span class="s12-plan-saved">已加入本页阅读计划</span></div><button type="button" class="s12-tonal" data-demo-open="#s12-schedule-dialog">安排阅读时间 <span aria-hidden="true">↗</span></button><button type="button" class="s12-cancel" id="s12-cancel-open" data-demo-open="#s12-cancel-dialog" hidden>取消这个时段</button></section><section class="s12-margin-note"><span>页边留白</span><p>书不会催你。<br>你也不必催自己。</p><svg viewBox="0 0 160 55" aria-hidden="true"><path d="M10 40Q40 2 62 30T110 20T150 30" fill="none" stroke="#b6a1be" stroke-width="2"/></svg></section></aside></div>
  <section class="s12-bookshelf" id="s12-bookshelf"><div class="s12-shelf-heading"><h2>手边的小书架</h2><span>换一本，换一种心情 / 3 本</span></div><div class="s12-shelf-books">${[['把日子慢慢读','文学随笔','#b997c3'],['树影里的来信','自然书写','#91a996'],['周末去看海','旅行散文','#8eabc5']].map((book,index)=>`<button type="button" data-book="${index}" aria-pressed="${index===0}"><span class="s12-mini-book" style="--mini-color:${book[2]}"><i aria-hidden="true"></i></span><span><strong>${book[0]}</strong><small>${book[1]}</small></span><b aria-hidden="true">↗</b></button>`).join('')}</div></section><p class="s12-local">演示书目与阅读记录仅用于本页体验，刷新页面后还原；不会创建系统日历提醒。</p><span class="s12-sr" data-announcement role="status"></span></div>
  <dialog id="s12-progress-dialog" aria-labelledby="s12-progress-title"><div class="s12-dialog-head"><span>留下阅读的足迹</span>${close}</div><h2 id="s12-progress-title">今天读到第几页？</h2><form id="s12-progress-form" novalidate><label for="s12-page">当前页码</label><input id="s12-page" name="page" type="number" min="1" max="288" step="1" value="126" required aria-describedby="s12-page-error"><span class="demo-field-error" id="s12-page-error"></span><button type="submit" class="s12-primary">保存阅读进度</button></form></dialog>
  <dialog id="s12-schedule-dialog" aria-labelledby="s12-schedule-title"><div class="s12-dialog-head"><span>为自己留一点空白</span>${close}</div><h2 id="s12-schedule-title">安排下一次阅读</h2><form id="s12-schedule-form" novalidate><label for="s12-date">阅读日期</label><input id="s12-date" name="date" type="date" required aria-describedby="s12-date-error" data-error="请选择今天或之后的日期。"><span class="demo-field-error" id="s12-date-error"></span><span class="s12-form-label">开始时间 · 每次 30 分钟</span><div class="s12-slots">${['07:30','12:30','21:00'].map(time=>`<button type="button" data-slot="${time}" aria-pressed="${time==='21:00'}">${time}</button>`).join('')}</div><button type="submit" class="s12-primary">留好这个时间</button></form></dialog>
  <dialog id="s12-cancel-dialog" aria-labelledby="s12-cancel-title"><div class="s12-dialog-head"><span>阅读计划</span>${close}</div><h2 id="s12-cancel-title">取消这次阅读时段？</h2><p>只移除当前书目的预约，已记录的阅读页码会保留。</p><div class="s12-confirm-actions"><button type="button" class="s12-tonal" data-demo-close>保留时段</button><button type="button" class="s12-primary" id="s12-confirm-cancel">确认取消</button></div></dialog><script>(${init.toString()})();</script></div>`;
}
module.exports = { render };
