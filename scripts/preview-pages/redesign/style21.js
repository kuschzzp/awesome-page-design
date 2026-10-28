const tracks = [
  { title: '夜光折线', subtitle: 'NEON FOLD', bpm: 112, base: 146.83, color: '紫外线 / 紫', shape: '01' },
  { title: '失重频率', subtitle: 'ZERO GRAVITY', bpm: 96, base: 110, color: '静电 / 绿', shape: '02' },
  { title: '液态回声', subtitle: 'LIQUID ECHO', bpm: 124, base: 164.81, color: '金属 / 银', shape: '03' },
  { title: '零点漂移', subtitle: 'MIDNIGHT DRIFT', bpm: 104, base: 130.81, color: '余辉 / 粉', shape: '04' },
];
function init(data) {
  const root = document.querySelector('.s21'), D = window.PageDesignDemo, $ = s => root.querySelector(s);
  let selected = 0, playing = false, audio = null, master = null, timer = null, frame = 0, progress = 0, queue = [0,2], playbackVersion = 0;
  const ratios = [1,1.5,2,1.25,1,1.875,1.5,2.25];
  function stopSound() {
    playbackVersion++; playing = false; clearInterval(timer); timer = null;
    if (audio) audio.suspend(); root.dataset.playing = 'false';
    root.querySelectorAll('[data-audio-play]').forEach(button => { button.textContent = '试听 / PLAY'; button.setAttribute('aria-pressed','false'); });
    $('[data-player-status]').textContent = '已暂停';
  }
  function soundTick() {
    if (!audio || !master) return;
    const track = data[selected], now = audio.currentTime;
    const tone = audio.createOscillator(), amp = audio.createGain(); tone.type = selected === 1 ? 'triangle' : 'sine'; tone.frequency.value = track.base * ratios[frame % ratios.length];
    amp.gain.setValueAtTime(.0001,now); amp.gain.exponentialRampToValueAtTime(.13,now + .012); amp.gain.exponentialRampToValueAtTime(.0001,now + .23); tone.connect(amp).connect(master); tone.start(now); tone.stop(now + .25);
    if (frame % 4 === 0) { const bass = audio.createOscillator(), env = audio.createGain(); bass.frequency.setValueAtTime(95,now); bass.frequency.exponentialRampToValueAtTime(40,now+.12); env.gain.setValueAtTime(.15,now); env.gain.exponentialRampToValueAtTime(.0001,now+.18); bass.connect(env).connect(master); bass.start(now); bass.stop(now+.2); }
    frame++; progress += 60 / track.bpm / 2;
    if (progress >= 48) { progress = 0; stopSound(); }
    updateProgress();
    root.querySelectorAll('[data-wave-bar]').forEach((bar,i) => bar.style.height = `${10 + ((i * 17 + frame * 13) % 31)}px`);
  }
  async function play() {
    if (playing) { stopSound(); return; }
    if (progress >= 48) { progress = 0; frame = 0; updateProgress(); }
    const version = ++playbackVersion; playing = true;
    try {
      if (!audio) { audio = new (window.AudioContext || window.webkitAudioContext)(); master = audio.createGain(); master.gain.value = Number($('[data-volume]').value) / 100; master.connect(audio.destination); }
      await audio.resume(); if (version !== playbackVersion) return; root.dataset.playing = 'true';
      root.querySelectorAll('[data-audio-play]').forEach(button => { button.textContent = '暂停 / PAUSE'; button.setAttribute('aria-pressed','true'); });
      $('[data-player-status]').textContent = '正在试听 · 本地合成'; soundTick(); if (playing) timer = setInterval(soundTick, 60000 / data[selected].bpm / 2);
    } catch { if (version === playbackVersion) { stopSound(); D.toast(root,'当前浏览器无法播放音频，请尝试另一个浏览器。'); } }
  }
  function updateProgress() {
    $('[data-progress]').value = progress; $('[data-time]').textContent = `00:${String(Math.floor(progress)).padStart(2,'0')} / 00:48`;
  }
  function selectTrack(index) {
    const wasPlaying = playing; stopSound(); selected = index; frame = 0; progress = 0; updateProgress();
    root.querySelectorAll('[data-track-select]').forEach(button => button.setAttribute('aria-pressed',String(Number(button.dataset.trackSelect) === selected)));
    $('[data-current-title]').textContent = data[selected].title; $('[data-current-code]').textContent = `${data[selected].subtitle} / ${data[selected].bpm} BPM`;
    $('[data-hero-track]').textContent = `${String(selected + 1).padStart(2,'0')} / ${data[selected].title}`;
    if (wasPlaying) play();
  }
  function renderQueue() {
    const list = $('[data-playlist]'); list.replaceChildren();
    queue.forEach((index,position) => {
      const li = document.createElement('li'), title = document.createElement('span'); title.textContent = `${String(position+1).padStart(2,'0')} / ${data[index].title}`; li.append(title);
      const actions = document.createElement('div');
      [['↑', '上移',-1], ['↓','下移',1], ['−','移除',0]].forEach(([label,action,delta]) => {
        const button = document.createElement('button'); button.type = 'button'; button.textContent = label; button.setAttribute('aria-label',`${action}${data[index].title}`);
        if ((delta === -1 && position === 0) || (delta === 1 && position === queue.length - 1)) button.disabled = true;
        button.addEventListener('click',() => { if (delta === 0) queue.splice(position,1); else [queue[position],queue[position+delta]]=[queue[position+delta],queue[position]]; renderQueue(); const next = list.querySelectorAll('button'); const fallback = root.querySelector('.acid21-playlist-head span'); fallback.setAttribute('tabindex','-1'); (next[Math.min(position * 3, next.length - 1)] || fallback).focus(); }); actions.append(button);
      }); li.append(actions); list.append(li);
    });
    $('[data-queue-count]').textContent = String(queue.length).padStart(2,'0'); $('[data-queue-empty]').hidden = queue.length > 0; $('[data-save-list]').disabled = queue.length === 0;
    root.querySelectorAll('[data-add-track]').forEach(button => { const has = queue.includes(Number(button.dataset.addTrack)); button.disabled = has; button.textContent = has ? '已加入' : '+ 加入清单'; });
  }
  root.querySelectorAll('[data-track-select]').forEach(button => button.addEventListener('click', () => selectTrack(Number(button.dataset.trackSelect))));
  root.querySelectorAll('[data-audio-play]').forEach(button => button.addEventListener('click', play));
  root.querySelectorAll('[data-add-track]').forEach(button => button.addEventListener('click', () => { const index = Number(button.dataset.addTrack); if (!queue.includes(index)) queue.push(index); renderQueue(); D.toast(root,'已加入试听清单'); }));
  $('[data-save-list]').addEventListener('click', () => { D.download('失真档案-试听清单.json', JSON.stringify({collection:'失真档案 / VOL.04',tracks:queue.map(i=>({title:data[i].title,bpm:data[i].bpm})),note:'本地合成试听演示'},null,2),'application/json'); D.toast(root,'试听清单已导出'); });
  $('[data-progress]').addEventListener('input', event => { progress = Number(event.target.value); updateProgress(); });
  $('[data-volume]').addEventListener('input', event => { if (master) master.gain.value = Number(event.target.value) / 100; });
  window.addEventListener('pagehide', () => { playbackVersion++; playing = false; clearInterval(timer); audio?.close(); });
  selectTrack(0); renderQueue();
}
function sculpture() { return `<svg viewBox="0 0 640 530" role="img" aria-label="原创液态金属环状雕塑与荧光切线"><defs><linearGradient id="s21-chrome" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f1f1f9"/><stop offset=".14" stop-color="#3b2f53"/><stop offset=".29" stop-color="#b7bbc8"/><stop offset=".39" stop-color="#fff"/><stop offset=".51" stop-color="#474351"/><stop offset=".64" stop-color="#d4d8df"/><stop offset=".77" stop-color="#272131"/><stop offset=".9" stop-color="#bdb8d7"/><stop offset="1" stop-color="#f7f5fd"/></linearGradient><radialGradient id="s21-halo"><stop stop-color="#6a21a7" stop-opacity=".65"/><stop offset="1" stop-color="#6a21a7" stop-opacity="0"/></radialGradient></defs><ellipse cx="330" cy="285" rx="285" ry="225" fill="url(#s21-halo)"/><g transform="rotate(-27 335 260)"><ellipse cx="335" cy="260" rx="154" ry="202" fill="none" stroke="#08050c" stroke-width="92"/><ellipse cx="335" cy="260" rx="154" ry="202" fill="none" stroke="url(#s21-chrome)" stroke-width="78"/><ellipse cx="335" cy="260" rx="112" ry="157" fill="none" stroke="#eee8ff" stroke-width="2" opacity=".5"/></g><ellipse cx="330" cy="275" rx="273" ry="61" fill="none" stroke="#d6ff00" stroke-width="2" transform="rotate(28 330 275)"/><path d="M63 135 566 420M89 390 571 97" fill="none" stroke="#be81f7" stroke-width="1" opacity=".45"/><g fill="#d6ff00"><path d="m521 76 5 13 14 1-11 9 3 14-12-7-12 7 3-14-11-9 15-1Z"/><circle cx="115" cy="397" r="5"/><circle cx="567" cy="312" r="3"/></g></svg>`; }
function render() {
  return `<div class="demo-root s21" data-playing="false"><header class="acid21-nav"><a href="#top" class="acid21-brand">失真档案<span>DISTORTED ARCHIVE®</span></a><nav aria-label="档案导航"><a href="#s21-tracks">本期声音</a><a href="#s21-playlist">我的清单 <b data-queue-count>02</b></a><span>VOL. 04 / 2026</span></nav></header><section class="acid21-hero"><div class="acid21-hero-rules" aria-hidden="true"></div><div class="acid21-issue"><span>INDEPENDENT ELECTRONIC</span><b>ISSUE — 004</b><small>声音不必总是规整的。</small></div><div class="acid21-sculpture">${sculpture()}</div><div class="acid21-title"><p>四个切片 / 一次偏离</p><h1>失真，<br><span>也有秩序。</span></h1><div class="acid21-title-bottom"><button type="button" class="acid21-play" data-audio-play aria-pressed="false">试听 / PLAY</button><span>把音量调低一点。<br>新的频率，正在靠近。</span></div></div><div class="acid21-hero-track"><span>NOW SELECTED</span><strong data-hero-track>01 / 夜光折线</strong><i aria-hidden="true">↘</i></div><span class="acid21-side-type" aria-hidden="true">NOT ALL SIGNALS ARE NOISE.</span></section><section class="acid21-catalog" id="s21-tracks"><div class="acid21-section-head"><div><p>SIGNAL CUTS / 本期声音</p><h2>从这里，偏离日常。</h2></div><span>04 TRACKS · SYNTH STUDIES</span></div><div class="acid21-track-list">${tracks.map((track,i)=>`<article class="acid21-track acid21-track-${i}"><button type="button" class="acid21-track-select" data-track-select="${i}" aria-pressed="${i===0}"><span class="acid21-track-index">0${i+1}</span><span class="acid21-track-name"><b>${track.title}</b><small>${track.subtitle}</small></span><span class="acid21-track-wave" aria-hidden="true">${Array.from({length:17},(_,n)=>`<i style="--height:${12+(n*13+i*7)%30}px"></i>`).join('')}</span><span class="acid21-track-bpm">${track.bpm}<small>BPM</small></span><span class="acid21-track-arrow" aria-hidden="true">↗</span></button><button type="button" class="acid21-add" data-add-track="${i}">+ 加入清单</button></article>`).join('')}</div></section><section class="acid21-playlist-section" id="s21-playlist"><div class="acid21-playlist-copy"><p>MAKE YOUR OWN FREQUENCY</p><h2>顺序，由你决定。</h2><span>把想留下的声音放在一起。<br>移动曲目，编排你自己的夜晚。</span><p class="demo-local-note">试听为原创浏览器合成音色，不是商业录音。<br>音频仅在主动播放后发声，页面关闭即停止。</p></div><div class="acid21-playlist"><div class="acid21-playlist-head"><span>PERSONAL SEQUENCE / 本地清单</span><button type="button" data-save-list>导出清单 ↗</button></div><p data-queue-empty hidden>清单还是空的。从上面的曲目加入一首吧。</p><ol data-playlist></ol><p class="demo-local-note">清单仅保存在当前页面，刷新后重置；可导出 JSON 留存。</p></div></section><footer class="acid21-footer"><span>失真档案 / KEEP THE STRANGE.</span><span>原创声音实验 · VOL.04</span></footer><aside class="acid21-player" aria-label="试听播放器"><div class="acid21-player-track"><span class="acid21-player-art" aria-hidden="true">◉</span><div><strong data-current-title>夜光折线</strong><small data-current-code>NEON FOLD / 112 BPM</small></div></div><button type="button" class="acid21-player-toggle" data-audio-play aria-pressed="false">试听 / PLAY</button><div class="acid21-player-progress"><label class="acid21-player-time" for="s21-progress"><span data-player-status>已暂停</span><span data-time>00:00 / 00:48</span></label><input id="s21-progress" data-progress type="range" min="0" max="48" step=".1" value="0" aria-label="试听进度"></div><div class="acid21-live-wave" aria-hidden="true">${Array.from({length:11},()=>'<i data-wave-bar></i>').join('')}</div><label class="acid21-volume">音量<input type="range" data-volume min="0" max="100" value="55" aria-label="试听音量"></label></aside><script>(${init.toString()})(${JSON.stringify(tracks)});</script></div>`;
}
module.exports = { render };
