function init() {
  const root = document.querySelector('.s14');
  const D = window.PageDesignDemo;
  const $ = selector => root.querySelector(selector);
  const presets = [
    { title: '雨后书房', subtitle: '柔和和弦 / 适合阅读', frequencies: [130.81, 196, 261.63], noise: .12, cutoff: 680, color: '#8faaa2' },
    { title: '远山微风', subtitle: '低频呼吸 / 适合放松', frequencies: [110, 164.81, 220], noise: .2, cutoff: 420, color: '#a5ab91' },
    { title: '深夜留白', subtitle: '轻盈泛音 / 适合专注', frequencies: [146.83, 220, 293.66], noise: .04, cutoff: 1100, color: '#9ca0b8' },
  ];
  let preset = 0;
  let context;
  let master;
  let playing = false;
  let disposed = false;
  let sources = [];
  let connections = [];
  let focusMinutes = 25;
  let remaining = focusMinutes * 60;
  let deadline = 0;
  let timer = null;
  let starting = false;
  const playIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 11 7-11 7Z" fill="currentColor" stroke="none"/></svg>';
  const pauseIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6V18M16 6V18" stroke="currentColor" stroke-width="3.5"/></svg>';
  function paintAudio() {
    root.classList.toggle('s14-playing', playing);
    $('[data-track-title]').textContent = presets[preset].title;
    $('[data-track-subtitle]').textContent = presets[preset].subtitle;
    $('[data-disc-label]').textContent = presets[preset].title;
    $('[data-disc]').style.setProperty('--disc-accent', presets[preset].color);
    $('#s14-play').innerHTML = playing ? pauseIcon : playIcon;
    $('#s14-play').setAttribute('aria-label', playing ? '暂停声音' : '播放声音');
    $('#s14-play').setAttribute('aria-pressed', String(playing));
    $('[data-audio-status]').textContent = playing ? '正在播放 · 本地合成音轨' : '轻按播放，让声音陪你一会儿';
    root.querySelectorAll('[data-preset]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.preset) === preset)));
  }
  function stopSources() {
    for (const source of sources) { try { source.stop(); } catch {} source.disconnect(); }
    for (const connection of connections) connection.disconnect();
    sources = [];
    connections = [];
  }
  function synthesize() {
    stopSources();
    const track = presets[preset];
    const filter = context.createBiquadFilter();
    filter.type = 'lowpass'; filter.frequency.value = track.cutoff; filter.Q.value = .6; filter.connect(master);
    connections.push(filter);
    track.frequencies.forEach((frequency, index) => {
      const tone = context.createOscillator();
      const gain = context.createGain();
      tone.type = 'sine'; tone.frequency.value = frequency; tone.detune.value = index === 1 ? 3 : 0;
      gain.gain.value = .18 / (index + 1);
      tone.connect(gain); gain.connect(filter); tone.start();
      sources.push(tone); connections.push(gain);
    });
    const length = context.sampleRate * 3;
    const buffer = context.createBuffer(1, length, context.sampleRate);
    const channel = buffer.getChannelData(0);
    let previous = 0;
    for (let i = 0; i < length; i += 1) { previous = (previous + (Math.random() * 2 - 1) * .02) / 1.02; channel[i] = previous * 3; }
    const noise = context.createBufferSource(); noise.buffer = buffer; noise.loop = true;
    const gain = context.createGain(); gain.gain.value = track.noise;
    noise.connect(gain); gain.connect(filter); noise.start();
    sources.push(noise); connections.push(gain);
    master.gain.cancelScheduledValues(context.currentTime);
    master.gain.setValueAtTime(0, context.currentTime);
    master.gain.linearRampToValueAtTime(Number($('#s14-volume').value) / 100 * .65, context.currentTime + .6);
  }
  async function play() {
    if (starting || disposed) return;
    starting = true;
    $('#s14-play').disabled = true;
    try {
      const Audio = window.AudioContext || window.webkitAudioContext;
      if (!Audio) throw new Error('unsupported');
      if (!context) { context = new Audio(); master = context.createGain(); master.connect(context.destination); }
      await context.resume();
      if (disposed) return;
      synthesize(); playing = true; paintAudio();
    } catch {
      stopSources(); playing = false; paintAudio();
      $('[data-audio-status]').textContent = '浏览器暂时无法播放。请检查声音权限后再试。';
    } finally { starting = false; $('#s14-play').disabled = false; }
  }
  function pause() { stopSources(); playing = false; paintAudio(); }
  $('#s14-play').addEventListener('click', () => { if (playing) pause(); else play(); });
  root.querySelectorAll('[data-preset]').forEach(button => button.addEventListener('click', () => {
    preset = Number(button.dataset.preset);
    if (playing) synthesize();
    paintAudio();
  }));
  $('#s14-volume').addEventListener('input', () => {
    const value = Number($('#s14-volume').value);
    $('#s14-volume-value').textContent = `${value}%`;
    if (context && master) master.gain.setTargetAtTime(value / 100 * .65, context.currentTime, .08);
  });
  function paintTimer() {
    $('#s14-timer-value').textContent = `${String(Math.floor(remaining / 60)).padStart(2, '0')}:${String(remaining % 60).padStart(2, '0')}`;
    $('[data-timer-ring]').style.strokeDashoffset = String(339.3 * (1 - remaining / (focusMinutes * 60)));
    $('#s14-focus-toggle').textContent = timer ? '暂停计时' : remaining === 0 ? '再开始一次' : remaining < focusMinutes * 60 ? '继续专注' : '开始专注';
    $('#s14-focus-toggle').setAttribute('aria-pressed', String(Boolean(timer)));
    $('#s14-focus-reset').disabled = !timer && remaining === focusMinutes * 60;
    $('[data-timer-status]').textContent = timer ? '正在专注，先不着急做别的。' : remaining === 0 ? '这一段专注完成了，伸个懒腰吧。' : remaining < focusMinutes * 60 ? '已暂停，你可以随时继续。' : '选一段时间，只做眼前的一件事。';
  }
  function endTimer() {
    clearInterval(timer); timer = null; remaining = 0;
    pause(); paintTimer();
    $('[data-finish-live]').textContent = '专注时间结束，声音已停止。休息一下吧。';
  }
  function tick() {
    remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    if (!remaining) endTimer(); else paintTimer();
  }
  function pauseTimer() {
    remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    clearInterval(timer); timer = null;
    if (!remaining) { endTimer(); return; }
    paintTimer();
  }
  $('#s14-focus-toggle').addEventListener('click', () => {
    if (timer) { pauseTimer(); return; }
    if (remaining === 0) remaining = focusMinutes * 60;
    $('[data-finish-live]').textContent = '';
    deadline = Date.now() + remaining * 1000;
    timer = setInterval(tick, 1000);
    paintTimer();
  });
  $('#s14-focus-reset').addEventListener('click', () => {
    clearInterval(timer); timer = null; remaining = focusMinutes * 60;
    $('[data-finish-live]').textContent = '';
    paintTimer();
  });
  root.querySelectorAll('[data-minutes]').forEach(button => button.addEventListener('click', () => {
    clearInterval(timer); timer = null;
    focusMinutes = Number(button.dataset.minutes); remaining = focusMinutes * 60;
    root.querySelectorAll('[data-minutes]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    $('[data-finish-live]').textContent = '';
    paintTimer();
  }));
  window.addEventListener('pagehide', () => {
    disposed = true; clearInterval(timer); timer = null; stopSources();
    if (context && context.state !== 'closed') context.close().catch(() => {});
  }, { once: true });
  paintAudio(); paintTimer();
}

function render() {
  return `<div class="demo-root s14"><header class="s14-header"><a href="#s14-player" class="s14-brand"><svg viewBox="0 0 30 28" width="29" height="28" aria-hidden="true"><path d="M5 10V18M11 5V23M17 9V19M23 12V16" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>慢拍<span>把自己，调到舒服的频率。</span></a><span class="s14-header-note">A LITTLE SPACE FOR YOURSELF.</span></header>
  <section class="s14-intro"><p>现在，不必快。</p><h1>留一段时间，<br>听见安静的自己。</h1><span>没有下一首的催促，也不需要完成什么。<br>让声音停在此刻，陪你慢慢来。</span></section>
  <section class="s14-console" aria-label="声音与专注控制台"><section class="s14-player" id="s14-player" aria-labelledby="s14-track-heading"><div class="s14-panel-label"><span>慢拍声场 / SOUND ROOM</span><span class="s14-signal" aria-hidden="true"><i></i><i></i><i></i></span></div><div class="s14-disc-well"><div class="s14-disc" data-disc><div class="s14-disc-grooves"></div><div class="s14-disc-center"><span>MAN PAI</span><strong data-disc-label>雨后书房</strong><i></i></div></div><span class="s14-arm" aria-hidden="true"></span></div><div class="s14-track-copy"><h2 id="s14-track-heading" data-track-title>雨后书房</h2><p data-track-subtitle>柔和和弦 / 适合阅读</p></div><div class="s14-play-row"><span class="s14-wave" aria-hidden="true">∿</span><button type="button" id="s14-play" class="s14-round-button" aria-label="播放声音" aria-pressed="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 11 7-11 7Z" fill="currentColor" stroke="none"/></svg></button><span class="s14-wave" aria-hidden="true">∿</span></div><p class="s14-audio-status" data-audio-status role="status">轻按播放，让声音陪你一会儿</p><div class="s14-volume-head"><label for="s14-volume">声音大小</label><output id="s14-volume-value" for="s14-volume">35%</output></div><div class="s14-volume-row"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 9H8L13 5V19L8 15H4Z" fill="none" stroke="currentColor" stroke-width="1.5"/></svg><input id="s14-volume" type="range" min="0" max="100" value="35" step="1" aria-label="播放音量"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M3 9H7L12 5V19L7 15H3ZM16 8Q21 12 16 16M19 4Q27 12 19 20" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></div></section>
  <aside class="s14-side"><section class="s14-scenes" aria-labelledby="s14-scene-title"><div class="s14-panel-label"><h2 id="s14-scene-title">为此刻选一个声音</h2><span>03 SCENES</span></div>${[['雨后书房','阅读 · 柔和和弦','01'],['远山微风','放松 · 低频呼吸','02'],['深夜留白','专注 · 轻盈泛音','03']].map((track,index)=>`<button type="button" class="s14-scene" data-preset="${index}" aria-pressed="${index===0}"><span class="s14-scene-icon s14-scene-${index}" aria-hidden="true">${['∿','⌁','·'][index]}</span><span><strong>${track[0]}</strong><small>${track[1]}</small></span><b>${track[2]}</b></button>`).join('')}</section><section class="s14-focus" aria-labelledby="s14-focus-title"><div class="s14-panel-label"><h2 id="s14-focus-title">给自己一小段专注</h2><span>FOCUS</span></div><div class="s14-timer"><svg viewBox="0 0 124 124" aria-hidden="true"><circle cx="62" cy="62" r="54" class="s14-ring-track"/><circle cx="62" cy="62" r="54" class="s14-ring" data-timer-ring/></svg><div><span id="s14-timer-value">25:00</span><small>剩余时间</small></div></div><div class="s14-durations" role="group" aria-label="专注时长">${[1,15,25,45].map(minutes=>`<button type="button" data-minutes="${minutes}" aria-pressed="${minutes===25}">${minutes===1?'1 分体验':minutes+' 分钟'}</button>`).join('')}</div><div class="s14-timer-actions"><button type="button" id="s14-focus-toggle" aria-pressed="false">开始专注</button><button type="button" id="s14-focus-reset" aria-label="重置专注计时" disabled><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M5 8A8 8 0 1 1 4 15M5 3V9H11" fill="none" stroke="currentColor" stroke-width="1.7"/></svg></button></div><p data-timer-status>选一段时间，只做眼前的一件事。</p><span class="s14-sr" data-finish-live role="status"></span></section></aside></section>
  <footer class="s14-footer"><p>在很响的世界里，给自己留一点轻。</p><span>声音由浏览器本地合成，点击后才会播放。专注结束或离开页面，声音与计时会停止。</span></footer><script>(${init.toString()})();</script></div>`;
}
module.exports = { render };
