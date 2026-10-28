function init() {
  const root = document.querySelector('.s11');
  const D = window.PageDesignDemo;
  const $ = selector => root.querySelector(selector);
  D.bindDialogs(root);
  const journeys = {
    YT2026111801: { recipient: '林女士', item: '一把来自景德镇的手作杯', origin: '景德镇', destination: '杭州', current: 3, estimate: '今天 18:00 前', dates: ['11.17 / 14:25', '11.17 / 19:40', '11.18 / 06:10', '11.18 / 09:32'] },
    YT2026111802: { recipient: '周先生', item: '一套留给周末的书', origin: '景德镇', destination: '杭州', current: 2, estimate: '明天 12:00 前', dates: ['11.18 / 08:10', '11.18 / 10:35', '11.18 / 13:05', '等待到站'] },
  };
  const stops = ['商家交寄', '景德镇集散点', '杭州转运站', '拱墅区派送点'];
  const descriptions = ['包裹已完成称重与包装检查，揽收信息已确认。', '包裹已装入发往杭州的干线车辆，封签记录完整。', '包裹正在完成目的地分拣，下一站为拱墅区派送点。', '包裹已交给派送员陈师傅，正在按线路送达。'];
  let selected = 'YT2026111801';
  function paint() {
    const data = journeys[selected];
    $('[data-number]').textContent = selected;
    $('[data-item]').textContent = data.item;
    $('[data-recipient]').textContent = `${data.recipient} · 收件手机尾号 2806`;
    $('[data-estimate]').textContent = data.estimate;
    $('[data-status]').textContent = data.current === 3 ? '正在派送' : '运输途中';
    root.querySelectorAll('[data-node]').forEach(button => {
      const index = Number(button.dataset.node);
      button.classList.toggle('current', index === data.current);
      button.classList.toggle('done', index < data.current);
      if (index === data.current) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
      const time = button.querySelector('time');
      if (time) time.textContent = data.dates[index];
    });
    const location = data.current === 3 ? { x: 650, y: 98, truck: 'translate(555 74)' } : { x: 468, y: 184, truck: 'translate(375 160)' };
    $('[data-current-pin]').setAttribute('cx', location.x);
    $('[data-current-pin]').setAttribute('cy', location.y);
    $('[data-route-truck]').setAttribute('transform', location.truck);
    $('[data-route-note]').textContent = data.current === 3 ? '包裹已到达最后一站。请留意派送电话。' : '包裹已到达杭州转运站，正在等待下一程发车。';
  }
  root.querySelectorAll('[data-query-example]').forEach(button => button.addEventListener('click', () => {
    $('#s11-number').value = button.dataset.queryExample;
    $('#s11-query').requestSubmit();
  }));
  D.wireForm($('#s11-query'), values => {
    const number = String(values.get('number')).trim().toUpperCase();
    if (!Object.hasOwn(journeys, number)) {
      $('#s11-query-error').textContent = '暂未找到这张演示运单，请使用下方的示例单号。';
      $('#s11-number').setAttribute('aria-invalid', 'true');
      $('#s11-number').focus();
      return;
    }
    selected = number;
    $('#s11-number').value = number;
    $('#s11-query-error').textContent = '';
    $('#s11-number').removeAttribute('aria-invalid');
    paint();
    $('[data-query-result]').textContent = `已更新 ${number} 的运输进度。`;
  });
  root.querySelectorAll('[data-node]').forEach(button => button.addEventListener('click', () => {
    const index = Number(button.dataset.node);
    const data = journeys[selected];
    $('#s11-stop-name').textContent = stops[index];
    $('#s11-stop-time').textContent = data.dates[index];
    $('#s11-stop-copy').textContent = index > data.current ? '包裹尚未到达此节点，抵达后会在这里更新扫描记录。' : descriptions[index];
    $('#s11-stop-state').textContent = index > data.current ? '待抵达' : index === data.current ? '当前节点' : '已完成';
    D.openDialog($('#s11-stop-dialog'), button);
  }));
  paint();
}

function render() {
  return `<div class="demo-root s11">
  <header class="s11-header"><a class="s11-brand" href="#s11-main"><span aria-hidden="true">↗</span> 沿途 <small>包裹追踪</small></a><span class="s11-edition">EVERY PARCEL, A JOURNEY.</span><a href="#s11-history">查看运输记录 <span aria-hidden="true">↓</span></a></header>
  <div id="s11-main">
    <section class="s11-intro"><div><p class="s11-kicker">从寄出，到你手中 / 01</p><h1>好东西，<br>正在来的路上。</h1><p>沿着每一个节点，找到包裹此刻的位置。</p></div><form id="s11-query" novalidate><label for="s11-number">输入运单号码</label><div class="s11-query-row"><input id="s11-number" name="number" required maxlength="24" value="YT2026111801" aria-describedby="s11-query-error" data-error="请先填写运单号码。" autocomplete="off" spellcheck="false"><button type="submit">追踪包裹 <span aria-hidden="true">↗</span></button></div><span class="demo-field-error" id="s11-query-error"></span><div class="s11-examples"><span>试试演示运单</span><button type="button" data-query-example="YT2026111801">手作杯 01</button><button type="button" data-query-example="YT2026111802">周末书单 02</button></div><p data-query-result class="s11-sr" role="status"></p></form></section>
    <section class="s11-shipment" aria-label="当前包裹"><div><span class="s11-kicker">运单 / <b data-number>YT2026111801</b></span><h2 data-item>一把来自景德镇的手作杯</h2><p data-recipient>林女士 · 收件手机尾号 2806</p></div><div class="s11-arrival"><span class="s11-state" data-status>正在派送</span><span>预计送达</span><strong data-estimate>今天 18:00 前</strong></div></section>
    <div class="s11-workspace"><section class="s11-map-panel" aria-labelledby="s11-map-title"><div class="s11-section-label"><h2 id="s11-map-title">01 / 运输线路</h2><span>景德镇 → 杭州</span></div><div class="s11-map"><svg viewBox="0 0 740 380" role="img" aria-label="景德镇至杭州的运输示意线路，点击下方节点查看详情"><defs><pattern id="s11-grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#e2e5df" stroke-width="1"/></pattern></defs><rect width="740" height="380" fill="url(#s11-grid)"/><path d="M-15 310C100 260 125 325 230 260S410 240 460 150 620 150 760 65" fill="none" stroke="#e2e9ec" stroke-width="38"/><path d="M-15 310C100 260 125 325 230 260S410 240 460 150 620 150 760 65" fill="none" stroke="#f5f8f8" stroke-width="28"/><g fill="none" stroke="#b4bcb3" stroke-width="1"><path d="M80 0V130L150 200V380M300 0V100L360 160V380M530 0V380M0 60H740M0 330H740"/></g><path d="M94 266H240V184H468V98H650" fill="none" stroke="#2f674e" stroke-width="4"/><g fill="#f9faf6" stroke="#2f674e" stroke-width="3"><circle cx="94" cy="266" r="9"/><circle cx="240" cy="184" r="9"/><circle cx="468" cy="184" r="9"/><circle cx="650" cy="98" r="11"/></g><circle data-current-pin cx="650" cy="98" r="23" fill="none" stroke="#2f674e" stroke-dasharray="3 5"/><g font-family="sans-serif" fill="#5d6a61" font-size="13"><text x="75" y="310">景德镇</text><text x="335" y="140">新安江</text><text x="594" y="53">杭州 · 拱墅</text></g><g data-route-truck transform="translate(555 74)"><rect x="0" y="0" width="31" height="22" rx="2" fill="#2f674e"/><path d="M31 7H40L46 14V22H31" fill="#2f674e"/><circle cx="9" cy="24" r="5" fill="#202c25"/><circle cx="37" cy="24" r="5" fill="#202c25"/></g></svg><span class="s11-map-coordinate">29°17′N / 117°12′E</span><span class="s11-map-scale">示意线路 · 非实时定位 ━ 50 km</span></div><div class="s11-map-stops"><button type="button" data-node="0"><b>01</b> 交寄</button><button type="button" data-node="1"><b>02</b> 集散</button><button type="button" data-node="2"><b>03</b> 转运</button><button type="button" data-node="3"><b>04</b> 派送</button></div><p class="s11-map-note" data-route-note>包裹已到达最后一站。请留意派送电话。</p></section>
    <section class="s11-history" id="s11-history" aria-labelledby="s11-history-title"><div class="s11-section-label"><h2 id="s11-history-title">02 / 运输记录</h2><span>点击查看节点详情</span></div><ol>${['商家交寄','景德镇集散点','杭州转运站','拱墅区派送点'].map((title,index)=>`<li><button type="button" data-node="${index}"><span class="s11-node-number">0${index+1}</span><span><strong>${title}</strong><time>11.18 / 09:32</time></span><span aria-hidden="true">↗</span></button></li>`).join('')}</ol><div class="s11-address"><span>目的地</span><p>杭州市 · 拱墅区</p><small>收件地址已做隐私处理</small></div></section></div>
    <footer class="s11-footer"><span>把每一步，交代清楚。</span><span>本页仅查询两张演示运单，不连接物流服务。</span></footer>
  </div><dialog id="s11-stop-dialog" aria-labelledby="s11-stop-name" aria-describedby="s11-stop-copy"><div class="s11-dialog-head"><span id="s11-stop-state">当前节点</span><button type="button" class="demo-close" data-demo-close aria-label="关闭节点详情"><svg viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></svg></button></div><h2 id="s11-stop-name">运输节点</h2><p id="s11-stop-time"></p><p id="s11-stop-copy"></p><button type="button" class="s11-dialog-button" data-demo-close>返回运输线路</button></dialog><script>(${init.toString()})();</script></div>`;
}
module.exports = { render };
