function init() {
  const root = document.querySelector('.s20'), D = window.PageDesignDemo, $ = s => root.querySelector(s);
  let audio = null, timer = null, running = false, beat = 0, lastBeat = 0, taps = [], lesson = 'quarter', rounds = 0, playbackVersion = 0, starting = false, lastTappedBeat = -1;
  const beatInterval = () => 60000 / Number($('#s20-speed').value) * (lesson === 'eighth' ? .5 : 1);
  function clickSound(accent) {
    if (!audio || $('#s20-mute').checked) return;
    const oscillator = audio.createOscillator(), gain = audio.createGain(); oscillator.type = 'sine'; oscillator.frequency.value = accent ? 1050 : 700;
    gain.gain.setValueAtTime(.0001, audio.currentTime); gain.gain.exponentialRampToValueAtTime(.16, audio.currentTime + .003); gain.gain.exponentialRampToValueAtTime(.0001, audio.currentTime + .07);
    oscillator.connect(gain).connect(audio.destination); oscillator.start(); oscillator.stop(audio.currentTime + .08);
  }
  function tick() {
    lastBeat = performance.now(); const current = beat % 4;
    root.querySelectorAll('[data-s20-beat]').forEach((dot, i) => { dot.classList.toggle('is-beat', i === current); dot.setAttribute('aria-current', String(i === current)); });
    $('[data-beat-count]').textContent = String(current + 1).padStart(2, '0'); clickSound(current === 0); beat++;
  }
  function stop(message) {
    playbackVersion++; starting = false; running = false; clearInterval(timer); timer = null; audio?.suspend();
    $('[data-start]').textContent = '开始一轮练习'; $('[data-start]').setAttribute('aria-pressed','false'); $('[data-tap]').disabled = true;
    if (message) $('[data-feedback]').textContent = message;
  }
  function startTimer() { clearInterval(timer); tick(); timer = setInterval(tick, beatInterval()); }
  $('[data-start]').addEventListener('click', async () => {
    if (running || starting) { stop('先停一停，准备好再开始。'); return; }
    const version = ++playbackVersion; starting = true;
    try { audio ||= new (window.AudioContext || window.webkitAudioContext)(); await audio.resume(); } catch { D.toast(root,'声音暂不可用，仍可跟随圆点完成练习。'); }
    if (version !== playbackVersion) return;
    starting = false; running = true; beat = 0; taps = []; lastTappedBeat = -1; $('[data-tap-count]').textContent = '0 / 8'; $('[data-feedback]').textContent = '跟着圆点轻点，共 8 次。不用追求完美。'; $('[data-start]').textContent = '结束本轮练习'; $('[data-start]').setAttribute('aria-pressed','true'); $('[data-tap]').disabled = false; startTimer();
  });
  $('[data-tap]').addEventListener('click', () => {
    if (!running) return;
    const period = beatInterval(); let delta = (performance.now() - lastBeat) % period; if (delta > period / 2) delta -= period;
    const nearestBeat = beat - 1 + (performance.now() - lastBeat > period / 2 ? 1 : 0);
    if (nearestBeat === lastTappedBeat) return;
    lastTappedBeat = nearestBeat;
    taps.push(delta); $('[data-tap-count]').textContent = `${taps.length} / 8`;
    $('[data-feedback]').textContent = Math.abs(delta) < 85 ? '刚刚好！就保持这个感觉。' : delta < 0 ? '稍微早了一点，下次等圆点亮起。' : '稍微慢了一点，先听听下一拍。';
    if (taps.length === 8) {
      const average = Math.round(taps.reduce((sum,value) => sum + Math.abs(value),0) / taps.length), score = Math.max(0,100 - Math.round(average / 3)); rounds++;
      stop(`完成啦！本轮平均偏差 ${average}ms，节奏稳定度 ${score}%。`);
      $('[data-round-count]').textContent = String(rounds);
      const record = document.createElement('li');
      const label = document.createElement('span'); label.textContent = `${lesson === 'quarter' ? '四拍入门' : '八分节奏'} · ${$('#s20-speed').value} BPM`;
      const result = document.createElement('strong'); result.textContent = `${score}%`; record.append(label,result); $('[data-records]').prepend(record); $('[data-empty-records]').hidden = true;
    }
  });
  $('#s20-speed').addEventListener('input', () => { $('[data-speed-label]').textContent = $('#s20-speed').value; if (running) startTimer(); });
  root.querySelectorAll('[data-lesson]').forEach(button => button.addEventListener('click', () => {
    lesson = button.dataset.lesson; stop('新的节奏已选好，点击开始试一试。');
    root.querySelectorAll('[data-lesson]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    $('[data-lesson-title]').textContent = lesson === 'quarter' ? '先找到，自己的四拍。' : '把一拍，轻轻分成两半。';
    $('[data-lesson-note]').textContent = lesson === 'quarter' ? '每个圆点是一拍。听到声音，轻轻点一下。' : '每拍分成两个等长的声音，保持均匀就好。';
    $('[data-pattern]').textContent = lesson === 'quarter' ? '咚　哒　哒　哒' : '哒哒　哒哒　哒哒　哒哒';
  }));
  window.addEventListener('pagehide', () => { playbackVersion++; running = false; clearInterval(timer); audio?.close(); });
}
function render() {
  return `<div class="demo-root s20"><div class="beat20-wrap"><header class="beat20-header"><a href="#top" class="beat20-brand"><span aria-hidden="true">♩</span>慢拍子<small>找到你自己的节奏</small></a><nav aria-label="练习导航"><a href="#s20-practice">今日练习</a><a href="#s20-record">练习记录</a><span class="beat20-user">小周的练习室 <i aria-hidden="true">◡</i></span></nav></header><section class="beat20-intro"><div><p class="beat20-eyebrow"><span>HELLO, GOOD RHYTHM</span> 每天几分钟，就很好。</p><h1>先不用很厉害，<br>跟着<span>感觉</span>慢慢来。</h1><p>给忙碌的大脑放个小假。听一听，点一点，<br>把散落的注意力找回来。</p><div class="beat20-small-note"><span aria-hidden="true">✳</span> 不需要乐器，也不需要音乐基础。</div></div><div class="beat20-doodle" aria-hidden="true"><svg viewBox="0 0 420 280"><path d="M112 71c-14-37 29-63 55-30 4-53 67-53 73-10 37-28 72 15 42 44 60-3 70 58 23 72 44 34 8 81-34 61 3 49-59 63-80 24-30 48-84 15-65-28-55 21-78-37-37-65-47-17-38-67 23-68Z" fill="#f8be7d"/><ellipse cx="178" cy="121" rx="7" ry="11" fill="#493c31"/><ellipse cx="230" cy="121" rx="7" ry="11" fill="#493c31"/><path d="M180 155q26 23 51-3" fill="none" stroke="#493c31" stroke-width="5" stroke-linecap="round"/><path d="m111 209-41 36m202-36 41 36" stroke="#493c31" stroke-width="6" stroke-linecap="round"/><path d="m320 72 12-31 22 10-6 18m-22-5c-21-9-32 15-14 20 11 4 16-1 14-20m24 2c-18-6-22 13-9 17 10 3 13-4 9-17M54 83l14-13m-9 37 18-4m246 104 13 16m-4-30 22 2" fill="none" stroke="#b27758" stroke-width="4" stroke-linecap="round"/></svg><span class="beat20-doodle-label">今天的你，也在拍子上。</span></div></section><section class="beat20-workspace" id="s20-practice"><aside class="beat20-lessons"><p class="beat20-kicker">你的节奏小路</p><button type="button" data-lesson="quarter" aria-pressed="true"><span class="beat20-lesson-icon">01</span><span><strong>四拍入门</strong><small>先和节拍交个朋友</small></span><i aria-hidden="true">↗</i></button><button type="button" data-lesson="eighth" aria-pressed="false"><span class="beat20-lesson-icon">02</span><span><strong>八分节奏</strong><small>给一拍加一点变化</small></span><i aria-hidden="true">↗</i></button><div class="beat20-tip"><span aria-hidden="true">✦</span><h3>试试这样开始</h3><p>把肩膀放松，双脚落地。<br>第一次只听，也算练习。</p><div class="beat20-tip-line" aria-hidden="true"></div></div></aside><div class="beat20-practice"><div class="beat20-practice-head"><span>今天的小练习</span><span>约 2 分钟 <i aria-hidden="true">◷</i></span></div><h2 data-lesson-title>先找到，自己的四拍。</h2><p data-lesson-note>每个圆点是一拍。听到声音，轻轻点一下。</p><div class="beat20-beats" aria-label="节拍位置">${[1,2,3,4].map((n,i)=>`<span data-s20-beat aria-current="${i===0}"><b>${n}</b><i></i></span>`).join('')}</div><p class="beat20-pattern" data-pattern>咚　哒　哒　哒</p><div class="beat20-speed"><label for="s20-speed">轻松一点 <span><strong data-speed-label>80</strong> BPM</span> 再快一点</label><input id="s20-speed" type="range" min="50" max="140" step="5" value="80" aria-label="节拍速度"></div><div class="beat20-practice-actions"><button type="button" class="beat20-start" data-start aria-pressed="false">开始一轮练习</button><button type="button" class="beat20-tap" data-tap disabled>跟拍，点这里 <span aria-hidden="true">↓</span></button></div><div class="beat20-feedback" role="status" aria-live="polite"><span data-feedback>准备好了，就从第一拍开始。</span><b data-tap-count>0 / 8</b></div><label class="beat20-mute"><input id="s20-mute" type="checkbox"> 静音练习，只跟随圆点</label><span class="beat20-hidden-count" data-beat-count aria-hidden="true">01</span></div></section><section class="beat20-records" id="s20-record"><div><p class="beat20-kicker">LITTLE STEPS COUNT</p><h2>每一点进步，都算数。</h2><p>没有连续打卡的压力。今天愿意开始，已经很好。</p></div><div class="beat20-record-list"><div class="beat20-record-head"><span>本次练习记录</span><strong><span data-round-count>0</span> 轮完成</strong></div><p data-empty-records class="beat20-record-empty">这里还很安静。完成第一轮，留下你的节奏。</p><ul data-records></ul></div></section><footer class="beat20-footer"><span>慢拍子 / SLOW BEATS</span><p class="demo-local-note">声音由浏览器合成，仅在点击开始后播放。练习反馈为本地演示，刷新后清空。</p></footer></div><script>(${init.toString()})();</script></div>`;
}
module.exports = { render };
