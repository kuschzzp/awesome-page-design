// Page templates and shared CSS; generation and browser operations stay separate.
const fs = require("node:fs");
const path = require("node:path");

const sharedCss = fs.readFileSync(path.join(__dirname, "preview-pages", "shared.css"), "utf8");
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function createPageRenderer({
  allStyles,
  getScenario,
  getStylePlaybook,
  getGeometryProfile,
  getImplementationProfile,
  buildStylePrompt,
}) {
function renderMetrics(metrics) {
  return metrics
    .map(([value, label]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(label)}</span>`)
    .join("");
}

function renderFeatureCards(features) {
  return features
    .map(
      ([title, body], index) =>
        `<article class="feature"><b>${String(index + 1).padStart(2, "0")}</b><h3>${escapeHtml(title)}</h3><p>${escapeHtml(body)}</p></article>`
    )
    .join("");
}

function renderQueueRows(queue) {
  return queue
    .map(
      ([title, state]) =>
        `<button type="button" data-open-modal><b>${escapeHtml(title)}</b><span>${escapeHtml(state)}</span></button>`
    )
    .join("");
}

function renderBars(seed) {
  const bars = {
    "01": [74, 52, 88, 64, 93, 72, 58],
    "02": [92, 54, 78, 100, 61, 86, 69],
    "03": [48, 78, 64, 92, 84, 56, 72],
    "04": [56, 92, 76, 68, 98, 62, 88],
    "05": [82, 44, 70, 52, 88, 60, 76],
    "06": [36, 58, 44, 92, 50, 74, 66],
    "07": [66, 86, 58, 96, 72, 62, 84],
    "08": [42, 50, 38, 74, 46, 62, 54],
    "09": [52, 64, 48, 80, 58, 74, 60],
    "10": [72, 46, 88, 64, 52, 96, 78],
    "11": [58, 78, 62, 86, 70, 54, 90],
    "12": [64, 76, 58, 84, 68, 92, 74],
    "13": [82, 56, 96, 44, 74, 62, 88],
    "14": [40, 52, 64, 76, 58, 46, 70],
    "15": [62, 88, 54, 94, 72, 66, 84],
    "16": [70, 42, 82, 54, 92, 64, 76],
    "17": [96, 62, 84, 52, 100, 70, 88],
    "18": [76, 58, 94, 66, 82, 48, 90],
    "19": [68, 94, 72, 86, 58, 100, 80],
    "20": [54, 72, 48, 82, 60, 78, 66],
    "21": [90, 48, 100, 56, 82, 64, 94],
    "22": [78, 92, 64, 86, 58, 94, 72],
    "23": [44, 56, 38, 62, 48, 52, 40],
    "24": [72, 46, 64, 38, 82, 54, 68],
    "25": [82, 64, 94, 58, 76, 88, 70],
    "26": [96, 72, 84, 66, 92, 58, 78],
  };
  return (bars[seed] || bars["01"]).map((height) => `<i style="height:${height}%"></i>`).join("");
}

function renderScene(style, scenario) {
  return `<div class="media scene-${escapeHtml(scenario.scene)}" role="img" aria-label="${escapeHtml(scenario.mediaLabel)}">
          <span class="scene-orb orb-a"></span>
          <span class="scene-orb orb-b"></span>
          <span class="scene-line line-a"></span>
          <span class="scene-line line-b"></span>
          <span class="scene-chip chip-a">${escapeHtml(style.id)}</span>
          <span class="scene-chip chip-b">${escapeHtml(scenario.metrics[0][0])}</span>
          <span class="scene-card card-a"></span>
          <span class="scene-card card-b"></span>
          <span class="scene-card card-c"></span>
        </div>`;
}

function renderDetailItems(items) {
  return items
    .map((item) => `<span>${escapeHtml(item)}</span>`)
    .join("");
}

function renderMetricTiles(metrics) {
  return metrics
    .map(([value, label]) => `<div class="metric-tile"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></div>`)
    .join("");
}

function renderBentoStats(metrics) {
  return metrics
    .map(([value, label]) => `<span class="bento-stat"><strong>${escapeHtml(value)}</strong><em>${escapeHtml(label)}</em></span>`)
    .join("");
}

function renderQueueCards(queue) {
  return queue
    .map(([title, state]) => `<button type="button" class="queue-card" data-open-modal><b>${escapeHtml(title)}</b><span>${escapeHtml(state)}</span></button>`)
    .join("");
}

function renderFeatureBlocks(features) {
  return features
    .map(([title, body], index) => `<article class="feature-block"><span>${String(index + 1).padStart(2, "0")}</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(body)}</p></article>`)
    .join("");
}

function renderMiniNav(style, scenario) {
  return `<nav class="top-nav" aria-label="Example navigation">
      <a class="brand-lockup" href="#top"><span>${escapeHtml(style.id)}</span><b>${escapeHtml(scenario.brand)}</b></a>
      <div class="nav-links">${scenario.nav.map((item) => `<a href="#details">${escapeHtml(item)}</a>`).join("")}</div>
      <button type="button" class="ghost-action" data-open-modal>Style notes</button>
    </nav>`;
}

function renderStyleLab(style, scenario, playbook, related) {
  const detailItems = renderDetailItems([
    playbook.name,
    playbook.buttons,
    playbook.states,
  ]);

  return `<section class="style-lab">
      <div class="lab-summary">
        <p class="kicker">${escapeHtml(playbook.name)} · ${escapeHtml(playbook.zhName)}</p>
        <h2>${escapeHtml(playbook.name)} in practice.</h2>
        <p>${escapeHtml(playbook.structure)}</p>
        <div class="detail-pills">${detailItems}</div>
      </div>
      <div class="lab-workspace">
        <div class="tabs" role="tablist" aria-label="Demo tabs">
          <button type="button" class="active" role="tab" aria-selected="true" data-tab="launch">Launch</button>
          <button type="button" role="tab" aria-selected="false" data-tab="metrics">Metrics</button>
          <button type="button" role="tab" aria-selected="false" data-tab="assets">Assets</button>
        </div>
        <div class="workspace-grid">
          <article class="panel">
            <h3 data-demo-title>${escapeHtml(scenario.tabs.launch[0])}</h3>
            <p data-demo-copy>${escapeHtml(scenario.tabs.launch[1])}</p>
            <div class="chart" aria-hidden="true">${renderBars(style.id)}</div>
          </article>
          <aside class="panel">
            <h3>Action queue</h3>
            <div class="queue-list">${renderQueueCards(scenario.queue)}</div>
          </aside>
        </div>
        <div class="related">${related}</div>
      </div>
    </section>`;
}

function renderInteractionDemo(style, scenario, playbook) {
  const implementation = getImplementationProfile(style);
  const implementationItems = [
    ["Buttons", implementation.buttons],
    ["Feedback", implementation.feedback],
    ["Spacing", implementation.spacing],
    ["Responsive", implementation.responsive],
  ]
    .map(([title, body]) => `<li><b>${escapeHtml(title)}</b><span>${escapeHtml(body)}</span></li>`)
    .join("");

  return `<section class="interaction-demo" aria-labelledby="interaction-title-${style.id}">
      <div class="interaction-copy">
        <p class="kicker">Component behavior</p>
        <h2 id="interaction-title-${style.id}">Buttons, feedback, spacing, and responsive rules.</h2>
        <p>${escapeHtml(playbook.components)}</p>
        <ul class="implementation-list">${implementationItems}</ul>
      </div>
      <div class="state-board">
        <div class="state-board-head">
          <span>${escapeHtml(scenario.brand)}</span>
          <strong>${escapeHtml(scenario.metrics[0][0])}</strong>
        </div>
        <div class="button-row" aria-label="Button state examples">
          <button type="button" class="primary-action" data-toast-trigger>${escapeHtml(scenario.primaryAction)}</button>
          <button type="button" class="secondary-action loading-action" data-loading-demo>Save state</button>
          <button type="button" class="secondary-action" disabled>Disabled</button>
          <button type="button" class="toggle-chip" aria-pressed="false" data-toggle-demo>Filter off</button>
        </div>
        <div class="inline-alert warning" data-inline-alert role="status">
          <b>State warning</b>
          <span>${escapeHtml(scenario.queue[0][0])}: ${escapeHtml(scenario.queue[0][1])}. ${escapeHtml(implementation.feedback)}</span>
        </div>
        <label class="field-group" for="demo-input-${style.id}">
          <span>Visible label</span>
          <input id="demo-input-${style.id}" type="text" value="${escapeHtml(scenario.queue[1][0])}" aria-describedby="field-help-${style.id}" data-demo-input>
          <small id="field-help-${style.id}" data-field-help>Helper text stays visible after the field is filled.</small>
        </label>
        <div class="state-stack" aria-label="Common product states">
          <span class="state-pill success"><b>Success</b>Saved and ready for review.</span>
          <span class="state-pill loading"><b>Loading</b>Preserve the layout while data refreshes.</span>
          <span class="state-pill empty"><b>Empty</b>No matching results; clear filters or create one.</span>
          <span class="state-pill error"><b>Error</b>Retry with a clear recovery action.</span>
        </div>
        <div class="responsive-steps" aria-label="Responsive behavior">
          <span><b>Desktop</b>Show the full layout archetype with supporting panels.</span>
          <span><b>Tablet</b>Collapse secondary panels without losing state.</span>
          <span><b>Mobile</b>${escapeHtml(implementation.responsive)}</span>
        </div>
      </div>
    </section>`;
}

function renderLayoutContent(style, scenario, playbook) {
  const label = style.label || `Style ${style.id}`;
  const metrics = renderMetricTiles(scenario.metrics);
  const queue = renderQueueCards(scenario.queue);
  const features = renderFeatureBlocks(scenario.features);
  const bars = renderBars(style.id);

  switch (playbook.layout) {
    case "aurora-listening-room": {
      const sessionRail = scenario.queue.map(([title, state], index) => `<button type="button" class="${index === 1 ? "selected" : ""}" data-open-modal><span>${String(index + 1).padStart(2, "0")}</span><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></button>`).join("");
      const roomStats = scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("");
      const notes = scenario.features.map(([title, body]) => `<article><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("");
      const resonanceBands = [["19:30", "Blue hush", "Entry"], ["20:10", "Rain pulse", "Active"], ["21:00", "Low gold", "Reset"], ["21:45", "North fade", "Private"]]
        .map(([time, title, state], index) => `<span class="band-${index + 1}"><b>${escapeHtml(time)}</b>${escapeHtml(title)}<em>${escapeHtml(state)}</em></span>`).join("");
      const roomZones = [["A", "Dusk room", "32 seats"], ["B", "Rain chamber", "10 seats"], ["C", "North alcove", "Private"], ["D", "Quiet exit", "Hosted"]]
        .map(([id, title, state]) => `<span><b>${escapeHtml(id)}</b><strong>${escapeHtml(title)}</strong><em>${escapeHtml(state)}</em></span>`).join("");
      return `<section class="life-aurora" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <main class="aurora-room-field">
          <div class="light-ribbons" aria-hidden="true"><span></span><span></span><span></span></div>
          <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="aurora-session-stats">${roomStats}</div>
          <div class="resonance-board" aria-hidden="true">${resonanceBands}</div>
          <div class="room-map" aria-hidden="true"><i>A1</i><i>B2</i><i>C3</i><b>Sound field</b></div>
        </main>
        <aside class="aurora-booking">
          <h3>Tonight's rooms</h3>
          <div class="session-rail">${sessionRail}</div>
          <div class="room-zone-list">${roomZones}</div>
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
          <button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
        </aside>
        <div class="aurora-notes">${notes}</div>
      </section>`;
    }
    case "stark-photo-contact": {
      const frameLabels = ["Window rain", "Neon corner", "Market stair", "Late tram", "Studio door", "Selected print", "Archive wall", "Ticket booth", "Cafe glass", "Night queue", "Poster wall", "Exit glow"];
      const frames = frameLabels.map((label, index) => `<button type="button" class="${index === 5 ? "selected" : ""}" data-open-modal><i></i><span>${String(index + 1).padStart(2, "0")}</span><b>${escapeHtml(label)}</b><em>${index === 5 ? "Marked" : "Proof"}</em></button>`).join("");
      const printRows = scenario.queue.map(([title, state]) => `<span><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></span>`).join("");
      const noteRows = scenario.features.map(([title, body]) => `<article><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("");
      const exifRows = [["Lens", "50mm"], ["Paper", "Fiber Gloss"], ["Crop", "4:5"], ["Tone", "Selenium"]].map(([label, value]) => `<span><b>${escapeHtml(label)}</b>${escapeHtml(value)}</span>`).join("");
      const negativeStrip = ["12A", "12B", "12C", "13A", "13B", "14A"].map((item, index) => `<span class="${index === 2 ? "active" : ""}">${escapeHtml(item)}</span>`).join("");
      return `<section class="life-stark-contact" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <aside class="contact-title">
          <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="exif-grid">${exifRows}</div>
          <button type="button" class="text-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
        </aside>
        <main class="photo-review-desk">
          <div class="hero-print" aria-hidden="true"><span class="print-sky"></span><span class="print-stair"></span><span class="print-caption">Selected print / 06</span></div>
          <div class="negative-strip" aria-hidden="true">${negativeStrip}</div>
          <div class="contact-sheet">${frames}</div>
        </main>
        <aside class="print-ledger">
          <h3>Print ledger</h3>
          <div class="print-metrics">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div>
          <div class="print-rows">${printRows}</div>
          <button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
        </aside>
        <div class="darkroom-notes">${noteRows}</div>
      </section>`;
    }
    case "minimal-print-ledger": {
      const jobRows = [
        ["Paper", "Munken Pure 150gsm", scenario.metrics[0][0]],
        ["Ink pass", "Blue plus Fluoro Orange", scenario.metrics[1][0]],
        ["Pickup", "Shelf B / front desk", scenario.metrics[2][0]],
      ].map(([labelText, value, meta]) => `<span><b>${escapeHtml(labelText)}</b><strong>${escapeHtml(value)}</strong><em>${escapeHtml(meta)}</em></span>`).join("");
      const queueRows = scenario.queue.map(([title, state], index) => `<button type="button" data-open-modal><code>${String(index + 1).padStart(2, "0")}</code><span>${escapeHtml(title)}</span><em>${escapeHtml(state)}</em></button>`).join("");
      const proofStrip = [
        ["Plate A", "Blue pass"],
        ["Plate B", "Fluoro orange"],
        ["Dry rack", "18 min"],
        ["Pickup", "Shelf B"],
      ].map(([title, detail]) => `<span><b>${escapeHtml(title)}</b><em>${escapeHtml(detail)}</em></span>`).join("");
      const dryRack = Array.from({ length: 18 }, (_, index) => `<span class="${index % 5 === 0 ? "checked" : ""}">${String(index + 1).padStart(2, "0")}</span>`).join("");
      const inkMix = [["Blue", "68%"], ["Fluoro", "22%"], ["Binder", "10%"]].map(([label, value]) => `<span><b>${escapeHtml(label)}</b><i style="width:${escapeHtml(value)}"></i><em>${escapeHtml(value)}</em></span>`).join("");
      return `<section class="life-print-ledger" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <header class="ledger-header">
          <div><p class="kicker">${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1></div>
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
        </header>
        <main class="ledger-sheet">
          <div class="docket-number">RL-09</div>
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="job-ledger">${jobRows}</div>
          <div class="proof-strip">${proofStrip}</div>
          <div class="print-production-grid"><div class="dry-rack">${dryRack}</div><div class="ink-mix">${inkMix}</div></div>
        </main>
        <aside class="pickup-rail">
          <h3>Studio queue</h3>
          ${queueRows}
          <button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
        </aside>
      </section>`;
    }
    case "dark-cinema-review": {
      const programRows = scenario.queue.map(([title, state], index) => `<button type="button" data-open-modal><span>${String(index + 1).padStart(2, "0")}</span><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></button>`).join("");
      const seats = Array.from({ length: 24 }, (_, index) => {
        const row = String.fromCharCode(65 + Math.floor(index / 12));
        const seat = `${row}${(index % 12) + 1}`;
        return `<span class="${[5, 8, 13, 19].includes(index) ? "held" : ""}">${escapeHtml(seat)}</span>`;
      }).join("");
      const cueSheet = [["19:45", "Doors"], ["20:05", "Short reel"], ["20:18", "Feature"], ["21:52", "Q&A"]].map(([time, label]) => `<span><b>${escapeHtml(time)}</b>${escapeHtml(label)}</span>`).join("");
      const reelFrames = ["Opening", "Intermission", "Feature", "Credits"].map((label, index) => `<span class="reel-${index + 1}">${escapeHtml(label)}</span>`).join("");
      return `<section class="life-cinema" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <main class="cinema-screen">
          <div class="screen-frame" aria-hidden="true"><span class="screen-glow"></span><span class="screen-caption">Act II / 21:10</span><b>Velvet Screen</b><i>Subtitles checked</i><div class="reel-frames">${reelFrames}</div></div>
          <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="cinema-metrics">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div>
        </main>
        <aside class="cinema-program">
          <h3>Program board</h3>
          <div class="cue-sheet">${cueSheet}</div>
          <div class="program-rows">${programRows}</div>
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
          <button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
        </aside>
        <div class="seat-map" aria-label="Seat availability">${seats}</div>
      </section>`;
    }
    case "line-museum-plan": {
      const stops = scenario.queue.map(([title, state], index) => `<article class="stop-${index + 1}"><span>${String(index + 1).padStart(2, "0")}</span><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></article>`).join("");
      const planZones = ["West gallery", "Light court", "Archive wall", "Audio bench"].map((label, index) => `<span class="zone-${index + 1}">${escapeHtml(label)}</span>`).join("");
      const labelRows = scenario.features.map(([title], index) => `<span><b>Label ${index + 1}</b>${escapeHtml(title)}</span>`).join("");
      const wallLabels = [["A-01", "Entrance wall"], ["A-02", "Quiet bench"], ["B-01", "Audio alcove"], ["C-04", "Exit proof"]]
        .map(([code, label]) => `<span><b>${escapeHtml(code)}</b>${escapeHtml(label)}</span>`).join("");
      return `<section class="life-museum-plan" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <header class="museum-heading"><div><p class="kicker">${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1></div><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button></header>
        <main class="floor-plan">
          <div class="gallery-rooms" aria-hidden="true"><span class="room-a">Gallery A</span><span class="room-b">Gallery B</span><span class="room-c">Listening room</span><span class="room-d">Archive</span></div>
          <div class="plan-route" aria-hidden="true"><i></i><i></i><i></i></div>
          <div class="plan-zones" aria-hidden="true">${planZones}</div>
          ${stops}
          <div class="wall-label-strip">${wallLabels}</div>
        </main>
        <aside class="museum-guide">
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="museum-metrics">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div>
          <div class="label-list">${labelRows}</div>
          <button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
        </aside>
      </section>`;
    }
    case "layered-interior-samples": {
      const swatches = ["Oak veneer", "Linen weave", "Limewash", "Travertine", "Brass pull", "Wool loop"].map((item, index) => `<button type="button" class="sample-${index + 1}" data-open-modal>${escapeHtml(item)}</button>`).join("");
      const supplierRows = scenario.queue.map(([title, state]) => `<span><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></span>`).join("");
      const specRows = scenario.features.map(([title, body]) => `<article><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("");
      const roomPlacement = [["Wall", "Limewash"], ["Floor", "Oak"], ["Seat", "Linen"], ["Counter", "Travertine"]]
        .map(([zone, material]) => `<span><b>${escapeHtml(zone)}</b>${escapeHtml(material)}</span>`).join("");
      return `<section class="life-interior-samples" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <header class="sample-heading"><div><p class="kicker">${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1></div><div class="sample-actions"><button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button></div></header>
        <main class="material-board">
          <div class="stacked-samples" aria-hidden="true"><span>Oak veneer</span><span>Linen weave</span><span>Limewash paint</span><b>Board A</b></div>
          <div class="room-placement" aria-hidden="true"><div class="room-elevation"><i></i><i></i><i></i><b>Living wall</b></div><div class="placement-rows">${roomPlacement}</div></div>
          <div class="swatch-lanes">${swatches}</div>
        </main>
        <aside class="sample-approval">
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="sample-metrics">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div>
          <div class="supplier-rows">${supplierRows}</div>
        </aside>
        <div class="room-specs">${specRows}</div>
      </section>`;
    }
    case "bento-market-table": {
      const timeline = scenario.queue.map(([title, state]) => `<span><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></span>`).join("");
      const courseStack = [["01", "Tomato broth"], ["02", "Grilled peach"], ["03", "Market greens"], ["04", "Buckwheat tart"]]
        .map(([number, name]) => `<span><b>${escapeHtml(number)}</b>${escapeHtml(name)}</span>`).join("");
      const producerRows = [["Mira Farm", "Tomatoes"], ["South Mill", "Buckwheat"], ["Blue Shed", "Herbs"]]
        .map(([producer, item]) => `<span><b>${escapeHtml(producer)}</b>${escapeHtml(item)}</span>`).join("");
      const crateGrid = ["Basil", "Peach", "Tomato", "Bread", "Honey", "Cress"].map((item) => `<span>${escapeHtml(item)}</span>`).join("");
      return `<section class="life-bento-market" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <article class="market-tile menu-hero"><p class="kicker">${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1><p>${escapeHtml(scenario.lede)}</p><div class="course-stack">${courseStack}</div><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button></article>
        <article class="market-tile course-tile"><span>Lead course</span><b>Tomato broth, basil oil, grilled bread</b><div class="plate-sketch" aria-hidden="true"><i></i><i></i><i></i></div></article>
        <article class="market-tile producer-tile"><span>Market run</span><strong>${escapeHtml(scenario.metrics[2][0])}</strong><p>Crates arrive before prep.</p><div class="producer-rows">${producerRows}</div></article>
        <article class="market-tile table-tile"><strong>${escapeHtml(scenario.metrics[1][0])}</strong><span>${escapeHtml(scenario.metrics[1][1])}</span><button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button></article>
        <article class="market-tile quote-tile"><b>"Let the menu feel like the morning market."</b><span>Chef note</span></article>
        <article class="market-tile service-tile">${timeline}</article>
        <article class="market-tile ingredient-tile"><div class="crate-grid">${crateGrid}</div>${scenario.features.map(([title]) => `<span>${escapeHtml(title)}</span>`).join("")}</article>
      </section>`;
    }
    case "neumo-lamp-console": {
      const scenePads = scenario.queue.map(([title, state]) => `<button type="button" data-open-modal><b>${escapeHtml(title)}</b><span>${escapeHtml(state)}</span></button>`).join("");
      const routineStrip = [["20:15", "Reading"], ["20:45", "Rain low"], ["21:10", "Dim shelf"]].map(([time, label]) => `<span><b>${escapeHtml(time)}</b>${escapeHtml(label)}</span>`).join("");
      return `<section class="life-lamp-console" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <article class="lamp-copy">
          <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
          <button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
        </article>
        <main class="lamp-dial-panel">
          <div class="lamp-shelf" aria-hidden="true"><span class="shade"></span><span class="light-pool"></span><span class="book-stack"></span><span class="plant-dot"></span><b>Evening shelf</b></div>
          <div class="lamp-dial"><strong>${escapeHtml(scenario.metrics[0][0])}</strong><span>${escapeHtml(scenario.metrics[0][1])}</span></div>
          <div class="timer-well"><b>${escapeHtml(scenario.metrics[1][0])}</b><span>${escapeHtml(scenario.metrics[1][1])}</span></div>
          <div class="wave-well" aria-hidden="true"><b>Ambient track</b><span>Rain bed at 34%</span><div class="mini-wave">${renderBars(style.id)}</div></div>
        </main>
        <aside class="scene-pads"><h3>Scene pads</h3>${scenePads}<div class="routine-strip">${routineStrip}</div><div class="pad-count"><strong>${escapeHtml(scenario.metrics[2][0])}</strong>${escapeHtml(scenario.metrics[2][1])}</div></aside>
      </section>`;
    }
    case "glass-greenhouse": {
      const waterRows = scenario.queue.map(([title, state]) => `<button type="button" data-open-modal><b>${escapeHtml(title)}</b><span>${escapeHtml(state)}</span></button>`).join("");
      const zoneLabels = [
        ["Fern bank", "74% RH"],
        ["Orchid shelf", "22 C"],
        ["Mist line", "08:40"],
      ].map(([title, value], index) => `<span class="zone-${index + 1}"><b>${escapeHtml(title)}</b><em>${escapeHtml(value)}</em></span>`).join("");
      const plantBeds = [["Fern bed", "Stable"], ["Orchid shelf", "Mist due"], ["Moss table", "Low light"], ["Public path", "Open"]]
        .map(([title, state], index) => `<span class="bed-${index + 1}"><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></span>`).join("");
      const sensorChart = [["Humidity", "74%"], ["Leaf temp", "18C"], ["Water flow", "06 zones"]]
        .map(([label, value]) => `<span><b>${escapeHtml(label)}</b><i></i><em>${escapeHtml(value)}</em></span>`).join("");
      return `<section class="life-glasshouse" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <main class="greenhouse-map">
          <div class="canopy-lines" aria-hidden="true"><span></span><span></span><span></span></div>
          <div class="climate-pins" aria-hidden="true"><i></i><i></i><i></i></div>
          <div class="zone-labels" aria-hidden="true">${zoneLabels}</div>
          <div class="plant-bed-map" aria-hidden="true">${plantBeds}</div>
          <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
        </main>
        <aside class="climate-pane">
          <div class="climate-metrics">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div>
          <div class="sensor-chart">${sensorChart}</div>
          <div class="water-rows">${waterRows}</div>
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
          <button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
        </aside>
        <div class="plant-notes">${scenario.features.map(([title, body]) => `<article><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("")}</div>
      </section>`;
    }
    case "gradient-festival-wall": {
      const posters = scenario.features.map(([title, body], index) => `<article class="poster-${index + 1}"><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("");
      const schedule = scenario.queue.map(([title, state]) => `<button type="button" data-open-modal><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></button>`).join("");
      const miniPosters = [["Main stage", "7:30 PM"], ["Workshop", "Sat 11"], ["Afterparty", "Hall B"]].map(([title, time]) => `<span><b>${escapeHtml(title)}</b><em>${escapeHtml(time)}</em></span>`).join("");
      const stageMap = [["Stage A", "Live"], ["Food lane", "Mapped"], ["Print booth", "Ready"], ["Volunteer tent", "Needs lead"]]
        .map(([title, state], index) => `<span class="stage-${index + 1}"><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></span>`).join("");
      const volunteerCards = [["Gate", "4/6"], ["Cleanup", "2/5"], ["Merch", "Ready"]].map(([title, value]) => `<span><b>${escapeHtml(title)}</b>${escapeHtml(value)}</span>`).join("");
      return `<section class="life-festival-wall" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <header class="festival-heading"><div><p class="kicker">${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1></div><div class="festival-mini-posters" aria-hidden="true">${miniPosters}</div><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button></header>
        <main class="poster-wall"><article class="festival-lead"><b>${escapeHtml(scenario.brand)}</b><p>${escapeHtml(scenario.lede)}</p><div class="stage-map">${stageMap}</div></article>${posters}<article class="volunteer-board"><b>Volunteer board</b><div>${volunteerCards}</div></article></main>
        <aside class="festival-rail">
          <div class="festival-metrics">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div>
          <div class="stage-schedule">${schedule}</div>
          <button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
        </aside>
      </section>`;
    }
    case "soft-garden-class": {
      const steps = scenario.queue.map(([title, state], index) => `<button type="button" data-open-modal><span>${index + 1}</span><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></button>`).join("");
      const notes = scenario.features.map(([title, body]) => `<article><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("");
      const gardenBeds = [["Herbs", "Mint + basil"], ["Greens", "Lettuce row"], ["Flowers", "Pollinator mix"], ["Notes", "Water at dusk"]].map(([title, body]) => `<span><b>${escapeHtml(title)}</b><em>${escapeHtml(body)}</em></span>`).join("");
      const seedTray = ["Basil", "Kale", "Tomato", "Dill", "Pea", "Cosmos", "Mint", "Sage"].map((seed, index) => `<span class="${index < 3 ? "sprout" : ""}">${escapeHtml(seed)}</span>`).join("");
      const classPath = [["Gather", "09:00"], ["Plant", "09:20"], ["Water", "09:45"], ["Share", "10:10"]].map(([label, time]) => `<span><b>${escapeHtml(label)}</b>${escapeHtml(time)}</span>`).join("");
      return `<section class="life-garden-class" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <aside class="garden-plan"><div class="bed-grid">${gardenBeds}</div><div class="seed-tray">${seedTray}</div><div class="garden-metrics">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div></aside>
        <main class="garden-lesson"><p class="kicker">${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1><p>${escapeHtml(scenario.lede)}</p><div class="class-path">${classPath}</div><div class="lesson-steps">${steps}</div><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button></main>
        <aside class="seed-notes"><h3>Seed notes</h3>${notes}<button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button></aside>
      </section>`;
    }
    case "deco-theater-foyer": {
      const tableRows = scenario.queue.map(([title, state], index) => `<span><b>${String(index + 1).padStart(2, "0")}</b>${escapeHtml(title)}<em>${escapeHtml(state)}</em></span>`).join("");
      const seatingPlan = Array.from({ length: 16 }, (_, index) => `<span class="${[2, 5, 10].includes(index) ? "open" : ""}">${String(index + 1).padStart(2, "0")}</span>`).join("");
      const barMenu = [["Velvet tart", "$12"], ["Citrus coupe", "$15"], ["Coffee tonic", "$9"]].map(([item, price]) => `<span><b>${escapeHtml(item)}</b>${escapeHtml(price)}</span>`).join("");
      return `<section class="life-deco-theater" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <aside class="theater-wing"><h3>Program</h3>${scenario.features.map(([title]) => `<span>${escapeHtml(title)}</span>`).join("")}<div class="bar-menu">${barMenu}</div></aside>
        <main class="theater-marquee">
          <div class="marquee-mark">${escapeHtml(style.id)}</div>
          <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="deco-seating-plan" aria-hidden="true">${seatingPlan}</div>
          <div class="theater-metrics">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div>
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
        </main>
        <aside class="table-ledger"><h3>Tables</h3>${tableRows}<button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button></aside>
      </section>`;
    }
    case "wabi-repair-studio": {
      const repairRows = scenario.queue.map(([title, state]) => `<span><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></span>`).join("");
      const clayBodies = [["Porcelain", "hairline"], ["Stoneware", "rim chip"], ["Earthenware", "seal test"]].map(([body, state]) => `<span><b>${escapeHtml(body)}</b>${escapeHtml(state)}</span>`).join("");
      const worktable = [["Intake", "Tea bowl"], ["Seam", "Gold cure"], ["Care", "Soft cloth"], ["Pickup", "12 days"]].map(([label, value]) => `<span><b>${escapeHtml(label)}</b>${escapeHtml(value)}</span>`).join("");
      return `<section class="life-wabi-repair" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <article class="repair-copy"><p class="kicker">${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1><p>${escapeHtml(scenario.lede)}</p><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button></article>
        <main class="repair-table"><div class="ceramic-form" aria-hidden="true"><span></span><i></i><b>Gold seam</b></div><div class="clay-body-grid">${clayBodies}</div><div class="repair-metrics">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div></main>
        <aside class="repair-ledger"><h3>Process</h3><div class="repair-rows">${repairRows}</div><div class="worktable-notes">${worktable}</div>${scenario.features.map(([title, body]) => `<article><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("")}<button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button></aside>
      </section>`;
    }
    case "ink-tea-scroll": {
      const lotRows = scenario.queue.map(([title, state], index) => `<span><b>${String(index + 1).padStart(2, "0")}</b>${escapeHtml(title)}<em>${escapeHtml(state)}</em></span>`).join("");
      const tastingWheel = [["Aroma", "orchid"], ["Body", "silk"], ["Finish", "mineral"], ["Roast", "light"]].map(([label, value]) => `<span><b>${escapeHtml(label)}</b>${escapeHtml(value)}</span>`).join("");
      const ridgeLots = [["MV-01", "High ridge"], ["MV-04", "Selected"], ["MV-07", "Rain hold"]].map(([code, label]) => `<span><b>${escapeHtml(code)}</b>${escapeHtml(label)}</span>`).join("");
      return `<section class="life-ink-tea" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <main class="tea-scroll">
          <div class="red-seal">${escapeHtml(style.id)}</div>
          <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="ink-mountain" aria-hidden="true"><span></span><span></span><i></i></div>
          <div class="ridge-lots" aria-hidden="true">${ridgeLots}</div>
          <button type="button" class="primary-action seal-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
        </main>
        <aside class="tea-origin-ledger"><h3>Origin lots</h3><div class="tea-metrics">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div><div class="tasting-wheel">${tastingWheel}</div><div class="tea-lots">${lotRows}</div><button type="button" class="text-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button></aside>
        <div class="tasting-notes">${scenario.features.map(([title, body]) => `<article><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("")}</div>
      </section>`;
    }
    case "blueprint-renovation": {
      const callouts = scenario.queue.map(([title, state], index) => `<span class="callout-${index + 1}"><b>${String.fromCharCode(65 + index)}</b>${escapeHtml(title)}<em>${escapeHtml(state)}</em></span>`).join("");
      const fixtureLabels = [["fix-1", "Kitchen wall"], ["fix-2", "Reading nook"], ["fix-3", "Storage run"], ["fix-4", "Entry bench"]].map(([className, label]) => `<span class="${escapeHtml(className)}">${escapeHtml(label)}</span>`).join("");
      const materialRows = [["Oak rail", "12m"], ["Tile", "8 boxes"], ["Pendant", "3 drops"], ["Paint", "warm white"]].map(([item, qty]) => `<span><b>${escapeHtml(item)}</b>${escapeHtml(qty)}</span>`).join("");
      return `<section class="life-renovation-plan" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <header class="renovation-header"><div><p class="kicker">${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1></div><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button></header>
        <main class="loft-plan"><div class="room-outline" aria-hidden="true"><span></span><span></span><span></span></div><div class="lighting-run" aria-hidden="true"><i></i><i></i><i></i></div><div class="fixture-labels" aria-hidden="true">${fixtureLabels}</div>${callouts}<div class="dimension-tape">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div></main>
        <aside class="crew-notes"><p>${escapeHtml(scenario.lede)}</p><div class="material-schedule">${materialRows}</div>${scenario.features.map(([title, body]) => `<article><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("")}<button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button></aside>
      </section>`;
    }
    case "industrial-print-room": {
      const pressCards = [
        ["A", "Proof press", "Running", "84%", "84%", ["Plate 04 aligned", "Ink key stable", "Pull test ready"]],
        ["B", "Letterpress", scenario.queue[0][1], "Hold", "38%", ["Roller height check", "Safety guard open", "Operator note added"]],
        ["C", "Ink station", scenario.queue[1][1], "Mix", "68%", ["Cyan batch 12", "Viscosity logged", "Swatch card pending"]],
        ["D", "Dry rack", scenario.metrics[2][0], "Load", "91%", ["Top rack full", "Lower rack curing", "Pickup lane clear"]],
      ].map(([id, title, state, load, fill, tasks], index) => `<button type="button" class="press-${index + 1}" style="--load:${escapeHtml(fill)}" data-open-modal><span class="press-card-top"><span>PR-${escapeHtml(id)}</span><em>${escapeHtml(state)}</em></span><b>${escapeHtml(title)}</b><div class="press-gauge"><i></i><strong>${escapeHtml(load)}</strong></div><ul class="press-tasks">${tasks.map((task) => `<li>${escapeHtml(task)}</li>`).join("")}</ul></button>`).join("");
      const serviceRows = scenario.features.map(([title, body]) => `<article><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("");
      const inkRows = [["Cyan", "Mixing", "68%"], ["Black", "Ready", "91%"], ["Warm red", "Hold", "24%"]].map(([ink, state, load]) => `<span><b>${escapeHtml(ink)}</b><em>${escapeHtml(state)}</em><i>${escapeHtml(load)}</i></span>`).join("");
      const rackCells = Array.from({ length: 20 }, (_, index) => `<span class="${index < 14 ? "loaded" : ""}"></span>`).join("");
      return `<section class="life-print-room" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <header class="press-header"><div><p class="kicker">${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1></div><div class="press-metrics">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div></header>
        <main class="press-matrix">${pressCards}<div class="dry-rack-meter">${rackCells}</div><div class="ink-batch-table">${inkRows}</div></main>
        <aside class="ink-service"><h3>Service evidence</h3><div class="alarm-strip">${scenario.queue.map(([title, state]) => `<span><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></span>`).join("")}</div>${serviceRows}<button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button><button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button></aside>
      </section>`;
    }
    case "admin-console": {
      const sidebarGroups = [
        ["Console", ["Dashboard", "Task Log", "Usage Log"]],
        ["Operations", ["Customers", "Procurement", "Products", "Workflows", "Approvals"]],
        ["System", ["Reports", "Monitoring", "Access Control", "Settings"]],
      ];
      const kpis = [
        ["$482K", "Pipeline value", "+8.6%"],
        ["1,284", "Customer records", "+42"],
        ["312", "Open tasks", "24 due soon"],
        ["87", "Completed orders", "9 today"],
      ];
      const shortcuts = [
        ["Create customer", "Primary entry"],
        ["Create deal", "Sales pipeline"],
        ["Review approval", "3 pending"],
      ];
      const taskRows = [
        ["Today 09:12", "Today 09:48", "36 min", "Web", "Approval", "TASK-8421", "Pending", "68%"],
        ["Today 08:40", "Today 08:56", "16 min", "API", "Export", "TASK-8378", "Complete", "100%"],
        ["Yesterday 18:21", "Yesterday 18:33", "12 min", "Web", "Customer", "TASK-8269", "Needs review", "42%"],
        ["Yesterday 15:03", "Yesterday 15:19", "16 min", "Mobile", "Access", "TASK-8155", "Complete", "100%"],
      ];
      const rankings = [
        ["Avery Stone", "$482,910"],
        ["Morgan Lee", "$318,440"],
        ["Jordan Patel", "$246,800"],
        ["Riley Chen", "$190,250"],
        ["Taylor Brooks", "$132,600"],
      ];
      const approvals = [
        ["Discount exception", "Pending"],
        ["Customer profile change", "Copied"],
        ["Renewal date update", "Mentioned"],
      ];
      const menuMarkup = sidebarGroups.map(([group, items]) => `<div class="admin-menu-group"><span>${escapeHtml(group)}</span>${items.map((item, index) => `<button type="button" class="${item === "Dashboard" ? "active" : ""}" data-open-modal><i aria-hidden="true">${String(index + 1).padStart(2, "0")}</i>${escapeHtml(item)}</button>`).join("")}</div>`).join("");
      const kpiMarkup = kpis.map(([value, title, delta]) => `<article class="admin-kpi"><span>${escapeHtml(title)}</span><strong>${escapeHtml(value)}</strong><em>${escapeHtml(delta)}</em></article>`).join("");
      const shortcutMarkup = shortcuts.map(([title, detail], index) => `<button type="button" class="shortcut-card shortcut-${index + 1}" data-open-modal><i aria-hidden="true"></i><b>${escapeHtml(title)}</b><span>${escapeHtml(detail)}</span></button>`).join("");
      const tableMarkup = taskRows.map(([submit, end, cost, platform, type, taskId, status, progress]) => `<tr><td>${escapeHtml(submit)}</td><td>${escapeHtml(end)}</td><td>${escapeHtml(cost)}</td><td>${escapeHtml(platform)}</td><td>${escapeHtml(type)}</td><td><a href="#details">${escapeHtml(taskId)}</a></td><td><span class="status-chip ${status === "Needs review" ? "warn" : status === "Pending" ? "pending" : "done"}">${escapeHtml(status)}</span></td><td><span class="progress-line" style="--progress:${escapeHtml(progress)}"><i></i>${escapeHtml(progress)}</span></td><td><button type="button" class="row-action" aria-label="Open task ${escapeHtml(taskId)}" data-open-modal>Details</button></td></tr>`).join("");
      const rankingMarkup = rankings.map(([name, amount], index) => `<li><span>${index + 1}</span><b>${escapeHtml(name)}</b><em>${escapeHtml(amount)}</em></li>`).join("");
      const approvalMarkup = approvals.map(([title, state]) => `<button type="button" data-open-modal><b>${escapeHtml(title)}</b><span>${escapeHtml(state)}</span></button>`).join("");

      return `<section class="admin-console" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <aside class="admin-sidebar">
          <a class="admin-brand" href="#top"><span>AF</span><b>${escapeHtml(scenario.brand)} Console</b></a>
          <nav class="admin-menu" aria-label="Admin modules">${menuMarkup}</nav>
          <div class="admin-side-card">
            <b>Execution status</b>
            <span>dev <em>0/5</em></span>
            <span>k8s-prod <em>Offline</em></span>
            <span>prdci <em>0/3</em></span>
          </div>
        </aside>
        <div class="admin-shell">
          <header class="admin-topbar">
            <button type="button" class="admin-icon" aria-label="Toggle sidebar" data-open-modal><span aria-hidden="true">&#9776;</span></button>
            <div class="admin-breadcrumb"><span>Home</span><b>Data Center</b></div>
            <label class="admin-search"><span>Search</span><input type="search" value="" placeholder="Search records" aria-label="Search admin records"></label>
            <div class="admin-top-actions">
              <button type="button" class="admin-icon" aria-label="Notifications" data-open-modal><span aria-hidden="true">!</span></button>
              <button type="button" class="admin-icon" aria-label="Display settings" data-open-modal><span aria-hidden="true">[]</span></button>
              <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.secondaryAction)}</button>
              <span class="admin-avatar" aria-label="Current user">K</span>
            </div>
          </header>
          <main class="admin-workspace">
            <div class="admin-tabs" role="tablist" aria-label="Workspace tabs">
              <button type="button" class="active" role="tab" aria-selected="true">Home</button>
              <button type="button" role="tab" aria-selected="false">Task Log</button>
              <button type="button" role="tab" aria-selected="false">Approvals</button>
            </div>
            <div class="admin-title-row">
              <div>
                <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
                <h1>Data Center</h1>
              </div>
              <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
            </div>
            <section class="admin-kpi-row" aria-label="Key metrics">${kpiMarkup}</section>
            <section class="shortcut-panel" aria-label="Quick entries">
              <h2>Quick Entries</h2>
              <div class="shortcut-row">${shortcutMarkup}</div>
            </section>
            <section class="task-panel">
              <header class="panel-heading">
                <div><h2>Task Records</h2><p>Filter operational logs by time, task ID, type, and status.</p></div>
                <button type="button" class="secondary-action" data-open-modal>Compact list</button>
              </header>
              <div class="table-toolbar">
                <span class="date-range">Last 24 hours <b>~</b> Current workspace</span>
                <label class="toolbar-search"><span>Task ID</span><input type="search" placeholder="Task ID" aria-label="Filter by task ID"></label>
                <div class="toolbar-buttons">
                  <button type="button" data-open-modal>Search</button>
                  <button type="button" data-open-modal>Reset</button>
                  <button type="button" data-open-modal>Columns</button>
                </div>
              </div>
              <div class="admin-table-wrap">
                <table class="admin-table">
                  <thead><tr><th>Submitted</th><th>Finished</th><th>Duration</th><th>Platform</th><th>Type</th><th>Task ID</th><th>Status</th><th>Progress</th><th>Details</th></tr></thead>
                  <tbody>${tableMarkup}</tbody>
                </table>
              </div>
            </section>
            <section class="admin-dashboard-grid">
              <article class="chart-panel">
                <div class="panel-heading"><div><h2>Revenue Trend</h2><p>Fictional sales totals by period</p></div><div class="segmented"><button type="button">This year</button><button type="button">3 years</button><button type="button" class="active">5 years</button></div></div>
                <div class="admin-chart" aria-label="Sales chart">${bars}</div>
              </article>
              <aside class="ranking-panel">
                <h2>Sales Ranking</h2>
                <ol>${rankingMarkup}</ol>
              </aside>
              <article class="mini-panel">
                <h2>Approvals</h2>
                <div class="approval-tabs"><span class="active">To do</span><span>Started</span><span>Copied</span><span>@ me</span></div>
                <div class="approval-list">${approvalMarkup}</div>
              </article>
              <article class="calendar-panel">
                <div class="panel-heading"><div><h2>My Schedule</h2><p>Sample week</p></div><button type="button" data-open-modal>Today</button></div>
                <div class="calendar-strip"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span><b>14</b><b>15</b><b>16</b><b>17</b><b>18</b><b>19</b><b>20</b></div>
              </article>
            </section>
          </main>
        </div>
      </section>`;
    }
    case "deco-foyer": {
      const availability = scenario.queue.map(([title, state], index) => `<span><b>${String(index + 1).padStart(2, "0")}</b><em>${escapeHtml(state)}</em>${escapeHtml(title)}</span>`).join("");
      const metricLabels = scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("");
      const proofLabels = scenario.features.map(([title], index) => `<span><b>${String.fromCharCode(65 + index)}</b>${escapeHtml(title)}</span>`).join("");
      return `<section class="deco-foyer" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <aside class="deco-wing deco-left">
          <span class="deco-rule"></span>
          <h3>Salon Proof</h3>
          <div class="deco-proof-list">${proofLabels}</div>
          <button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
        </aside>
        <article class="deco-centerpiece">
          <div class="deco-monogram">${escapeHtml(style.id)}</div>
          <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="deco-metrics">${metricLabels}</div>
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
        </article>
        <aside class="deco-wing deco-right">
          <span class="deco-rule"></span>
          <h3>Availability</h3>
          <div class="deco-availability">${availability}</div>
        </aside>
        <div class="deco-floorplan" aria-hidden="true">
          <span></span><span></span><span></span><span></span>
          <b>FLOOR PLAN</b>
        </div>
      </section>`;
    }
    case "material-gallery": {
      const objectRows = scenario.queue.map(([title, state]) => `<span><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></span>`).join("");
      const materialMetrics = scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("");
      return `<section class="material-gallery" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <article class="material-intro">
          <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <button type="button" class="text-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
        </article>
        <div class="material-object-study">
          <div class="clay-object" aria-hidden="true"><span></span><span></span><span></span></div>
          <div class="material-caption">${materialMetrics}</div>
        </div>
        <aside class="material-notes">
          <h3>Material Notes</h3>
          <div class="quiet-features">${features}</div>
          <div class="object-ledger">${objectRows}</div>
          <button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
        </aside>
      </section>`;
    }
    case "swiss-archive": {
      const issueMetrics = scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("");
      const navCodes = scenario.nav.map((item, index) => `<span><b>${String(index + 1).padStart(2, "0")}</b>${escapeHtml(item)}</span>`).join("");
      const objectCrops = scenario.features.map(([title, body], index) => `<article class="swiss-object crop-${index + 1}"><span>${escapeHtml(`A-${String(index + 12)}`)}</span><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("");
      const sourceRows = scenario.queue.map(([title, state], index) => `<span><b>${escapeHtml(`SR-${String(index + 1).padStart(2, "0")}`)}</b>${escapeHtml(title)}<em>${escapeHtml(state)}</em></span>`).join("");
      return `<section class="swiss-archive" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <header class="swiss-masthead">
          <span>Issue ${escapeHtml(style.id)}</span>
          <strong>${escapeHtml(scenario.brand)}</strong>
          <nav>${navCodes}</nav>
          <button type="button" class="text-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
        </header>
        <div class="swiss-grid">
          <article class="swiss-lead">
            <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
            <h1>${escapeHtml(scenario.headline)}</h1>
            <p>${escapeHtml(scenario.lede)}</p>
            <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
          </article>
          <aside class="swiss-number" aria-label="Issue number">${escapeHtml(style.id)}</aside>
          <div class="swiss-metrics">${issueMetrics}</div>
          <div class="swiss-object-board">${objectCrops}</div>
          <aside class="swiss-source-table">
            <h3>Source Index</h3>
            ${sourceRows}
          </aside>
        </div>
      </section>`;
    }
    case "ink-landscape": {
      const lotRows = scenario.queue.map(([title, state], index) => `<span><b>${String(index + 1).padStart(2, "0")}</b>${escapeHtml(title)}<em>${escapeHtml(state)}</em></span>`).join("");
      const sourceRows = scenario.features.map(([title, body]) => `<article><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("");
      const provenanceRows = scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("");
      return `<section class="ink-landscape" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <article class="scroll-paper">
          <div class="seal-stack">
            <b>${escapeHtml(style.id)}</b>
            <span>${escapeHtml(scenario.eyebrow)}</span>
          </div>
          <div class="ink-copy">
            <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
            <h1>${escapeHtml(scenario.headline)}</h1>
            <p>${escapeHtml(scenario.lede)}</p>
            <button type="button" class="primary-action seal-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
          </div>
          <div class="ink-landscape-field" aria-hidden="true">
            <span class="mist mist-a"></span>
            <span class="mist mist-b"></span>
            <span class="mountain mountain-a"></span>
            <span class="mountain mountain-b"></span>
            <span class="river-line"></span>
          </div>
        </article>
        <aside class="tea-ledger">
          <h3>Tea Ledger</h3>
          <div class="tea-lots">${lotRows}</div>
          <div class="source-notes">${sourceRows}</div>
          <button type="button" class="text-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
        </aside>
        <div class="provenance-strip">${provenanceRows}</div>
      </section>`;
    }
    case "ink-scroll": {
      const lotRows = scenario.queue.map(([title, state], index) => `<span><b>${String(index + 1).padStart(2, "0")}</b>${escapeHtml(title)}<em>${escapeHtml(state)}</em></span>`).join("");
      const sourceRows = scenario.features.map(([title, body]) => `<article><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("");
      return `<section class="ink-scroll" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <aside class="ink-rail">
          <b>${escapeHtml(style.id)}</b>
          ${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}
        </aside>
        <article class="scroll-story">
          <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <button type="button" class="primary-action seal-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
          <div class="ink-wash-field" aria-hidden="true"><span></span><span></span><span></span></div>
        </article>
        <aside class="scroll-index">
          <h3>Tea Lots</h3>
          <div class="tea-lots">${lotRows}</div>
          <div class="source-notes">${sourceRows}</div>
          <button type="button" class="text-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
        </aside>
      </section>`;
    }
    case "blueprint-sheet": {
      const planNodes = scenario.metrics.map(([value, text], index) => `<span class="bp-node bp-${index + 1}"><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("");
      const callouts = scenario.queue.map(([title, state], index) => `<span><b>${String.fromCharCode(65 + index)}-${index + 1}</b>${escapeHtml(title)}<em>${escapeHtml(state)}</em></span>`).join("");
      return `<section class="blueprint-sheet" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <header class="sheet-header">
          <div>
            <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
            <h1>${escapeHtml(scenario.headline)}</h1>
          </div>
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
        </header>
        <div class="plan-sheet">
          <div class="coordinate-ruler"><span>X-12</span><span>Y-08</span><span>Z-04</span></div>
          <div class="plan-graph">${planNodes}<i class="bp-edge bp-e1"></i><i class="bp-edge bp-e2"></i><i class="bp-edge bp-e3"></i></div>
          <div class="dimension-lines" aria-hidden="true"><span></span><span></span><span></span></div>
        </div>
        <aside class="sheet-callouts">
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="callout-list">${callouts}</div>
          <div class="sheet-features">${features}</div>
          <button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
        </aside>
      </section>`;
    }
    case "cute-desk": {
      const taskCards = scenario.queue.map(([title, state], index) => `<article class="cute-task-card tone-${index + 1}"><span>0${index + 1}</span><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em><p>${["Practice sketch shape language and save one favorite frame.", "Mark the reading note complete and attach a short reflection.", "Unlock the reward shelf after two focused blocks."][index]}</p></article>`).join("");
      const rewardTokens = scenario.metrics.map(([value, text], index) => `<span class="reward-token token-${index + 1}"><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("");
      const notes = scenario.features.map(([title, body], index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("");
      return `<section class="cute-desk" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <header class="cute-desk-hero">
          <div>
            <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
            <h1>${escapeHtml(scenario.headline)}</h1>
            <p>${escapeHtml(scenario.lede)}</p>
            <div class="cute-actions"><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button><button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button></div>
          </div>
          <aside class="reward-shelf" aria-label="Reward shelf">${rewardTokens}</aside>
        </header>
        <div class="cute-workbench">
          <section class="cute-task-board">
            <div class="cute-lane"><h3>Today</h3>${taskCards}</div>
            <div class="cute-lane soft-lane"><h3>Later</h3>${scenario.nav.map((item, index) => `<button type="button" data-open-modal><span>${String.fromCharCode(65 + index)}</span>${escapeHtml(item)}<em>${["Open", "2 saved", "Pinned"][index]}</em></button>`).join("")}</div>
          </section>
          <aside class="cute-side-panel">
            <h3>Friendly notes</h3>
            <div class="cute-note-stack">${notes}</div>
          </aside>
        </div>
      </section>`;
    }
    case "stark-dossier": {
      const exhibitRows = scenario.queue.map(([title, state], index) => `<button type="button" data-open-modal><span>${String(index + 1).padStart(2, "0")}</span><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></button>`).join("");
      const sourceRows = scenario.features.map(([title, body], index) => `<span><b>SR-${String(index + 12).padStart(2, "0")}</b><strong>${escapeHtml(title)}</strong><em>${escapeHtml(body)}</em></span>`).join("");
      return `<section class="stark-dossier" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <header class="dossier-masthead">
          <b>${escapeHtml(scenario.brand)}</b>
          <nav>${scenario.nav.map((item) => `<a href="#details">${escapeHtml(item)}</a>`).join("")}</nav>
          <button type="button" class="text-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
        </header>
        <div class="dossier-grid">
          <aside class="dossier-index">
            <p class="kicker">${escapeHtml(label)}</p>
            ${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}
          </aside>
          <article class="dossier-object">
            <div class="dossier-frame" aria-hidden="true"><span></span><span></span><span></span></div>
            <div class="dossier-caption"><b>Selected file</b><span>Matte object crop / private access</span></div>
          </article>
          <section class="dossier-proof-wall">
            <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
            <h1>${escapeHtml(scenario.headline)}</h1>
            <p>${escapeHtml(scenario.lede)}</p>
            <div class="exhibit-list">${exhibitRows}</div>
            <div class="source-ledger">${sourceRows}</div>
            <button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
          </section>
        </div>
      </section>`;
    }
    case "minimal-command": {
      const runRows = scenario.queue.map(([title, state], index) => `<button type="button" data-open-modal><code>run-${String(index + 41).padStart(3, "0")}</code><span>${escapeHtml(title)}</span><em>${escapeHtml(state)}</em></button>`).join("");
      const evidenceRows = scenario.features.map(([title, body]) => `<article><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("");
      return `<section class="minimal-command" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <header class="command-topbar">
          <div>
            <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
            <h1>${escapeHtml(scenario.headline)}</h1>
          </div>
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
        </header>
        <div class="command-grid">
          <main class="command-main">
            <div class="command-input"><span>&gt;</span><p>Summarize latest review notes and list unresolved actions</p><button type="button" data-copy>Run</button></div>
            <article class="command-result"><b>Generated result</b><p>${escapeHtml(scenario.lede)}</p><pre><code>status: review_due
accepted: 7
blocked: 2
next: save_run</code></pre></article>
            <section class="run-history"><h3>Run history</h3>${runRows}</section>
          </main>
          <aside class="command-panels">
            <div class="command-metrics">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div>
            <div class="command-evidence">${evidenceRows}</div>
            <button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
          </aside>
        </div>
      </section>`;
    }
    case "layered-catalog": {
      const swatches = ["Paper grain", "Soft film", "Ink layer", "Edge seal", "Fiber core", "Matte coat"].map((item, index) => `<span class="material-swatch swatch-${index + 1}">${escapeHtml(item)}</span>`).join("");
      const specRows = scenario.features.map(([title, body], index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("");
      const inventoryRows = scenario.queue.map(([title, state]) => `<button type="button" data-open-modal><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></button>`).join("");
      return `<section class="layered-catalog" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <header class="catalog-header">
          <div><p class="kicker">${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1></div>
          <div class="catalog-actions"><button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button></div>
        </header>
        <section class="material-object-panel">
          <div class="sample-stack" aria-hidden="true"><span></span><span></span><span></span><strong>LK-12</strong></div>
          <div class="swatch-grid">${swatches}</div>
        </section>
        <section class="layer-detail-panel">
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="spec-sheet">${specRows}</div>
        </section>
        <aside class="inventory-rail">
          <h3>Inventory rail</h3>
          <div class="inventory-metrics">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div>
          <div class="inventory-list">${inventoryRows}</div>
        </aside>
      </section>`;
    }
    case "neumo-wallet": {
      const goalRows = scenario.queue.map(([title, state], index) => `<button type="button" data-open-modal><b>${escapeHtml(title)}</b><span>${escapeHtml(state)}</span><i style="--fill:${[62, 78, 44][index]}%"></i></button>`).join("");
      const limitRows = scenario.features.map(([title, body]) => `<article><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("");
      return `<section class="neumo-wallet" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <article class="wallet-panel">
          <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="vault-balance"><strong>${escapeHtml(scenario.metrics[0][0])}</strong><span>${escapeHtml(scenario.metrics[0][1])}</span></div>
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
        </article>
        <section class="transfer-console">
          <div class="transfer-card-stack" aria-hidden="true"><span></span><span></span><span></span></div>
          <div class="transfer-pad"><span>From Vault</span><strong>$420</strong><em>Pending confirmation</em></div>
          <div class="goal-wells">${goalRows}</div>
        </section>
        <aside class="savings-rail">
          <h3>Limit controls</h3>
          <div class="soft-metrics">${scenario.metrics.slice(1).map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div>
          <div class="limit-list">${limitRows}</div>
          <button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
        </aside>
      </section>`;
    }
    case "precision-map": {
      const spanRows = scenario.queue.map(([title, state], index) => `<button type="button" data-open-modal><code>span-${String(index + 7).padStart(2, "0")}</code><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></button>`).join("");
      const evidence = scenario.features.map(([title, body]) => `<article><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("");
      return `<section class="precision-map" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <header class="precision-topline">
          <div><p class="kicker">${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1></div>
          <div class="precision-metrics">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div>
        </header>
        <div class="precision-main-grid">
          <aside class="span-lanes"><h3>Span lanes</h3>${spanRows}<button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button></aside>
          <main class="topology-canvas">
            <div class="topology-command"><code>trace replay --incident latest</code><button type="button" data-copy>${escapeHtml(scenario.primaryAction)}</button></div>
            <span class="topo-node topo-a">API</span><span class="topo-node topo-b">Worker</span><span class="topo-node topo-c">Queue</span><span class="topo-node topo-d">DB</span>
            <i class="topo-edge edge-a"></i><i class="topo-edge edge-b"></i><i class="topo-edge edge-c"></i><i class="topo-edge edge-d"></i>
            <div class="latency-strip"><span>p50 48ms</span><span>p95 ${escapeHtml(scenario.metrics[2][0])}</span><span>retry 2.8%</span></div>
          </main>
          <aside class="incident-panel"><p>${escapeHtml(scenario.lede)}</p><div class="incident-evidence">${evidence}</div></aside>
        </div>
      </section>`;
    }
    case "gradient-launch": {
      const timeline = scenario.queue.map(([title, state], index) => `<button type="button" data-open-modal><span>0${index + 1}</span><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></button>`).join("");
      const assetTiles = scenario.features.map(([title, body], index) => `<article class="asset-tile asset-${index + 1}"><span>${escapeHtml(title)}</span><p>${escapeHtml(body)}</p></article>`).join("");
      return `<section class="gradient-launch" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <header class="launch-hero">
          <div><p class="kicker">${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1><p>${escapeHtml(scenario.lede)}</p></div>
          <div class="launch-counters">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div>
        </header>
        <div class="gradient-stage-grid">
          <aside class="launch-rhythm"><h3>Launch rhythm</h3>${timeline}</aside>
          <main class="asset-mosaic">
            <article class="asset-stage"><b>${escapeHtml(scenario.brand)}</b><span>Creative preview</span><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button></article>
            ${assetTiles}
          </main>
          <aside class="publish-rail">
            <h3>Publish gate</h3>
            <div class="audience-card"><strong>Audience A</strong><span>Lift +18%</span><i></i></div>
            <div class="audience-card"><strong>Audience B</strong><span>Lift +11%</span><i></i></div>
            <button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
          </aside>
        </div>
      </section>`;
    }
    case "industrial-room": {
      const lineCards = [
        ["LN-01", "Mixer", "Running", "93%"],
        ["LN-02", "Press", "Hold", "41%"],
        ["LN-03", "Coolant", "Warning", "68%"],
        ["LN-04", "Packing", "Recovered", "88%"],
      ].map(([line, title, state, load], index) => `<button type="button" class="line-card line-${index + 1}" data-open-modal><span>${escapeHtml(line)}</span><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em><i>${escapeHtml(load)}</i></button>`).join("");
      const alarmRows = [
        ["LN-02", scenario.queue[0][0], scenario.queue[0][1], "A. Morgan", "critical"],
        ["LN-03", scenario.queue[1][0], scenario.queue[1][1], "Shift Crew", "warning"],
        ["LN-08", scenario.queue[2][0], scenario.queue[2][1], "Safety", "open"],
        ["LN-04", "Packing arm", "Recovered", "Automation", "open"],
        ["LN-07", "Lockout gate", "Locked", "Service", "critical"],
      ];
      const alarmRowsHtml = alarmRows.map(([line, machine, state, owner, tone]) => `<tr><td>${escapeHtml(line)}</td><td>${escapeHtml(machine)}</td><td><span class="${escapeHtml(tone)}">${escapeHtml(state)}</span></td><td>${escapeHtml(owner)}</td><td><button type="button" data-open-modal>Ack</button></td></tr>`).join("");
      const evidence = scenario.features.map(([title, body]) => `<article><b>${escapeHtml(title)}</b><p>${escapeHtml(body)}</p></article>`).join("");
      return `<section class="industrial-room" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <header class="shift-header">
          <div><p class="kicker">${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1><p>${escapeHtml(scenario.lede)}</p></div>
          <div class="shift-actions"><button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button></div>
        </header>
        <div class="plant-grid">
          <aside class="line-matrix"><h3>Line matrix</h3>${lineCards}</aside>
          <section class="alarm-room-table">
            <div class="alarm-room-head">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div>
            <table><thead><tr><th>Line</th><th>Machine</th><th>State</th><th>Owner</th><th>Action</th></tr></thead><tbody>${alarmRowsHtml}</tbody></table>
          </section>
          <aside class="lockout-panel"><h3>Service evidence</h3>${evidence}<div class="lockout-log"><b>Lockout log</b><span>Gate 7 locked</span><span>Inspection due 14:30</span></div></aside>
        </div>
      </section>`;
    }
    case "industrial-deck": {
      const alarmRecords = [
        ["LN-2", scenario.queue[0][0], scenario.queue[0][1], "M. Carter", "critical", "Ack"],
        ["LN-3", scenario.queue[1][0], scenario.queue[1][1], "Ops Crew", "warning", "Open"],
        ["LN-4", scenario.queue[2][0], scenario.queue[2][1], "Service", "open", "Open"],
        ["LN-5", "Mixer valve", "Inspect", "Field Tech", "warning", "Route"],
        ["LN-7", "Packing arm", "Recovered", "Automation", "open", "Log"],
        ["LN-8", "Lockout gate", "Locked", "Safety", "critical", "Ack"],
      ];
      const alarmRows = alarmRecords.map(([line, title, state, owner, tone, action]) => `<tr><td>${escapeHtml(line)}</td><td>${escapeHtml(title)}</td><td><span class="${escapeHtml(tone)}">${escapeHtml(state)}</span></td><td>${escapeHtml(owner)}</td><td><button type="button" data-open-modal>${escapeHtml(action)}</button></td></tr>`).join("");
      const gaugeRows = scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("");
      return `<section class="industrial-deck" aria-label="${escapeHtml(scenario.mediaLabel)}">
        <header class="control-header">
          <div>
            <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
            <h1>${escapeHtml(scenario.headline)}</h1>
          </div>
          <div class="control-actions">
            <button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
            <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
          </div>
        </header>
        <aside class="status-filters">
          ${["All Lines", "Critical", "Warning", "Service", "Recovered"].map((item, index) => `<button type="button" class="${index === 1 ? "active" : ""}" data-open-modal>${item}</button>`).join("")}
        </aside>
        <section class="alarm-board">
          <div class="alarm-banner"><b>Active Alarm Queue</b><span>${escapeHtml(scenario.lede)}</span></div>
          <div class="alarm-table-wrap">
            <table class="alarm-table">
              <thead><tr><th>Line</th><th>Machine</th><th>State</th><th>Owner</th><th>Action</th></tr></thead>
              <tbody>${alarmRows}</tbody>
            </table>
          </div>
        </section>
        <aside class="machine-inspector">
          <h3>Line Inspector</h3>
          <div class="gauge-strip">${gaugeRows}</div>
          <div class="service-evidence">${features}</div>
        </aside>
      </section>`;
    }
    case "ops-board":
      const railItems = style.id === "01"
        ? ["Users", "Roles", "Approvals", "Audit log", "Settings"]
        : ["Exceptions", "Owner", "Priority", "Status", "Due window"];
      return `<section class="ops-board">
        <aside class="filter-rail">
          <b>${escapeHtml(label)}</b>
          ${railItems.map((item, index) => `<span class="${index === 0 ? "rail-active" : ""}">${escapeHtml(item)}</span>`).join("")}
        </aside>
        <div class="board-main">
          <header class="board-toolbar">
            <div>
              <p class="kicker">${escapeHtml(scenario.brand)}</p>
              <h1>${escapeHtml(scenario.eyebrow)}</h1>
              <p>${escapeHtml(scenario.lede)}</p>
            </div>
            <div class="toolbar-actions">
              <button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
              <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
            </div>
          </header>
          <div class="metric-row">${metrics}</div>
          <div class="ticket-grid">
            <div class="ticket-list">
              <article class="ticket-card priority"><b>${escapeHtml(scenario.queue[0][0])}</b><p>${escapeHtml(scenario.features[0][1])}</p><span>${escapeHtml(scenario.queue[0][1])}</span></article>
              <article class="ticket-card"><b>${escapeHtml(scenario.queue[1][0])}</b><p>${escapeHtml(scenario.features[1][1])}</p><span>${escapeHtml(scenario.queue[1][1])}</span></article>
              <article class="ticket-card"><b>${escapeHtml(scenario.queue[2][0])}</b><p>${escapeHtml(scenario.features[2][1])}</p><span>${escapeHtml(scenario.queue[2][1])}</span></article>
            </div>
            <aside class="board-inspector">
              <h3>Action queue</h3>
              <div class="queue-list">${queue}</div>
              <div class="chart">${bars}</div>
            </aside>
          </div>
        </div>
      </section>`;
    case "street-poster":
      return `<section class="street-poster">
        <div class="poster-copy">
          <p class="kicker">${escapeHtml(label)} · ${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="poster-actions"><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button><button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button></div>
        </div>
        <aside class="poster-stack">
          <div class="stamp big">${escapeHtml(scenario.metrics[0][0])}</div>
          <div class="ticket-strip">${scenario.queue.map(([title, state]) => `<span><b>${escapeHtml(state)}</b>${escapeHtml(title)}</span>`).join("")}</div>
          <div class="rule-panel">${features}</div>
        </aside>
      </section>`;
    case "aurora-lab":
      return `<section class="aurora-lab">
        <div class="lab-copy">
          <p class="kicker">${escapeHtml(label)} · ${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="signal-stats">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div>
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
        </div>
        <div class="run-compare">
          ${scenario.metrics.map(([value], index) => `<article class="${index === 1 ? "selected" : ""}"><div class="run-head"><span>Run ${["A", "B", "C"][index]}</span><b>${escapeHtml(value)}</b></div><p>${escapeHtml(scenario.features[index][0])}</p><div class="score-row" style="--score:${[72, 88, 64][index]}%"><span>${["Confidence", "Readable", "Decision"][index]}</span><i></i><em>${["Stable", "Selected", "Needs note"][index]}</em></div></article>`).join("")}
        </div>
        <aside class="evidence-canvas">${renderScene(style, scenario)}<div class="review-note"><b>Reviewer notes</b>${scenario.queue.map(([title, state]) => `<span><em>${escapeHtml(state)}</em>${escapeHtml(title)}</span>`).join("")}</div></aside>
      </section>`;
    case "y2k-stage":
      return `<section class="y2k-stage">
        <div class="marquee">${scenario.nav.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
        <div class="drop-console">
          <article class="release-player">
            <div class="disc">${escapeHtml(style.id)}</div>
            <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
            <h1>${escapeHtml(scenario.headline)}</h1>
            <p>${escapeHtml(scenario.lede)}</p>
            <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
          </article>
          <aside class="drop-panel">
            <h3>Drop control</h3>
            <div class="countdown-grid">${metrics}</div>
            <div class="drop-list">${scenario.queue.map(([title, state], index) => `<button type="button" data-open-modal><span>0${index + 1}</span><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></button>`).join("")}</div>
            <button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button>
          </aside>
          <div class="track-strip">
            ${scenario.queue.map(([title, state], index) => `<article><b>Track ${index + 1}</b><span>${escapeHtml(title)}</span><em>${escapeHtml(state)}</em></article>`).join("")}
          </div>
        </div>
      </section>`;
    case "editorial-index":
      return `<section class="editorial-index">
        <aside class="editorial-meta">
          <b>${escapeHtml(label)}</b>
          ${scenario.metrics.map(([value, text]) => `<span>${escapeHtml(value)} / ${escapeHtml(text)}</span>`).join("")}
          <button type="button" class="text-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
        </aside>
        <article class="editorial-lead">
          <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
        </article>
        <div class="index-column">${features}</div>
      </section>`;
    case "terminal-console":
      return `<section class="terminal-console">
        <div class="terminal-window">
          <div class="terminal-bar"><span>scan.sh</span><button type="button" data-copy>${escapeHtml(scenario.primaryAction)}</button></div>
          <p class="prompt-line">$ ${escapeHtml(scenario.headline)}</p>
          <div class="log-lines">
            ${scenario.queue.map(([title, state]) => `<button type="button" data-open-modal><code>${escapeHtml(state.toLowerCase())}</code><span>${escapeHtml(title)}</span></button>`).join("")}
          </div>
        </div>
        <aside class="severity-board">
          <p class="kicker">${escapeHtml(label)} · ${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.brand)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="metric-row">${metrics}</div>
        </aside>
      </section>`;
    case "sticker-shop":
      return `<section class="sticker-shop">
        <aside class="pack-builder">
          <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="sticker-preview-grid" aria-hidden="true">
            <span></span><span></span><span></span><span></span><span></span><span></span>
          </div>
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
        </aside>
        <div class="shop-catalog">
          ${scenario.queue.map(([title, state], index) => `<article class="product-card sticker-${index + 1}"><div class="sticker-thumb"><span></span><span></span><span></span></div><b>${escapeHtml(title)}</b><p>${["12 die-cut stickers", "Matte print sheet", "Homepage hero art"][index]}</p><div><strong>${["$18", "$26", "$14"][index]}</strong><em>${escapeHtml(state)}</em></div></article>`).join("")}
          <aside class="cart-summary"><h3>Shop window</h3><div class="metric-row">${metrics}</div><button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button></aside>
        </div>
      </section>`;
    case "stark-portfolio":
      return `<section class="stark-portfolio">
        <aside class="stark-meta">
          <p class="kicker">${escapeHtml(label)}</p>
          ${scenario.nav.map((item) => `<a href="#details">${escapeHtml(item)}</a>`).join("")}
        </aside>
        <div class="object-stage">${renderScene(style, scenario)}<div class="object-strip">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div></div>
        <article class="stark-copy">
          <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="stark-proof">${scenario.queue.map(([title, state]) => `<span><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></span>`).join("")}</div>
          <button type="button" class="text-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
          <div class="stark-details"><span><b>Material</b>Matte object study</span><span><b>Access</b>Invite-only preview</span><span><b>Signal</b>Inquiry received</span></div>
        </article>
      </section>`;
    case "minimal-brief":
      return `<section class="minimal-brief">
        <aside class="brief-sidebar">
          <b>${escapeHtml(scenario.brand)}</b>
          ${scenario.nav.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
          <div class="metric-row">${metrics}</div>
        </aside>
        <article class="document-surface brief-editor">
          <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="editor-toolbar"><span>Owner note</span><span>Risk</span><span>Decision</span><button type="button" data-copy>${escapeHtml(scenario.primaryAction)}</button></div>
          <div class="brief-body">
            <section><b>Decision</b><p>Ship the onboarding copy update after legal confirms the pricing note.</p></section>
            <section><b>Risk</b><p>Two launch notes still need owner review before Friday summary.</p></section>
            <section><b>Next action</b><p>Convert the approved research bullets into the final weekly brief.</p></section>
          </div>
        </article>
        <aside class="comment-stack decision-stack">
          <h3>Review queue</h3>
          ${queue}
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
        </aside>
      </section>`;
    case "dark-render":
      return `<section class="dark-render">
        <div class="frame-viewer">
          <p class="kicker">${escapeHtml(label)} · ${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <div class="frame-art">${renderScene(style, scenario)}</div>
          <div class="film-strip">${scenario.metrics.map(([value, text]) => `<span><b>${escapeHtml(value)}</b>${escapeHtml(text)}</span>`).join("")}</div>
          <div class="shot-strip">${scenario.queue.map(([title, state], index) => `<span><b>0${index + 1}</b>${escapeHtml(title)}<em>${escapeHtml(state)}</em></span>`).join("")}</div>
        </div>
        <aside class="render-queue">
          <p>${escapeHtml(scenario.lede)}</p>
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
          <div class="render-budget"><strong>${escapeHtml(scenario.metrics[2][0])}</strong><span>${escapeHtml(scenario.metrics[2][1])}</span><i></i></div>
          <div class="queue-list">${queue}</div>
          <div class="render-checks"><b>Review checks</b><span>Mask edge<strong>Needs fix</strong></span><span>Poster crop<strong>Approved</strong></span><span>Cost guard<strong>Active</strong></span></div>
        </aside>
      </section>`;
    case "line-workflow":
      return `<section class="line-workflow">
        <header class="workflow-head">
          <p class="kicker">${escapeHtml(label)} · ${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
        </header>
        <div class="process-map">
          ${scenario.queue.map(([title, state], index) => `<article><span>0${index + 1}</span><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em><p>${["Legal owner confirms language and evidence.", "Finance checks discount impact and due date.", "Audit package exports with immutable record."][index]}</p></article>`).join("")}
        </div>
        <aside class="evidence-panel"><h3>Audit evidence</h3><p>${escapeHtml(scenario.lede)}</p><div class="metric-row">${metrics}</div><div class="evidence-list">${scenario.features.map(([title], index) => `<span><b>${String(index + 1).padStart(2, "0")}</b>${escapeHtml(title)}</span>`).join("")}</div></aside>
      </section>`;
    case "material-day":
      return `<section class="material-day">
        <div class="phone-panel daily-panel">
          <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <div class="day-chip"><b>Today</b><span>3 focus windows</span></div>
          <div class="routine-list">${queue}</div>
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
        </div>
        <aside class="routine-cloud daily-cloud">
          <article class="focus-card"><h3>Focus block</h3><p>90 minutes reserved for writing, reset, and one household errand.</p><div class="chart">${bars}</div></article>
          ${features}
          <div class="metric-row">${metrics}</div>
        </aside>
      </section>`;
    case "bento-profile":
      return `<section class="bento-profile">
        <article class="bento-tile hero-tile"><p class="kicker">${escapeHtml(label)} · ${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1><p>${escapeHtml(scenario.lede)}</p><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button></article>
        <article class="bento-tile media-tile"><div class="mini-shot"><span></span><span></span><span></span></div><b>Product tour</b><p>Three proof objects stay visible.</p></article>
        <article class="bento-tile stat-tile"><b>Module signal</b>${renderBentoStats(scenario.metrics)}</article>
        <article class="bento-tile quote-tile"><b>"The module order finally tells the story."</b><span>Customer note</span></article>
        <article class="bento-tile timeline-tile">${scenario.queue.map(([title, state], index) => `<span><b>${String(index + 1).padStart(2, "0")}</b>${escapeHtml(title)}<em>${escapeHtml(state)}</em></span>`).join("")}</article>
        <article class="bento-tile wide">${features}</article>
      </section>`;
    case "neumo-console":
      return `<section class="neumo-console neumo-redesign">
        <article class="control-copy session-card">
          <p class="kicker">${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="session-dashboard"><div class="session-readout"><strong>${escapeHtml(scenario.metrics[0][0])}</strong><span>${escapeHtml(scenario.metrics[0][1])}</span></div><div class="session-meta"><span>Mode<b>Deep focus</b></span><span>Preset<b>Rain room</b></span><span>State<b>Ready</b></span></div></div>
          <div class="session-actions"><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button><button type="button" class="secondary-action" data-open-modal>Save preset</button></div>
          <div class="session-timeline"><span><b>00</b>Room tone</span><span><b>18</b>Noise bed</span><span><b>42</b>Saved loop</span></div>
        </article>
        <div class="mixer-board">
          <div class="mix-header"><h3>Layer mixer</h3><span>Live mix</span></div>
          <div class="knob-grid">${scenario.metrics.map(([value, text]) => `<div class="knob"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(text)}</span></div>`).join("")}</div>
          <div class="wave-card"><div class="waveform" aria-hidden="true">${renderBars(style.id)}</div><div class="wave-labels"><span>Rain bed</span><span>Noise floor</span><span>Bell tail</span></div></div>
          <div class="slider-stack">${scenario.queue.map(([title, state]) => `<button type="button" data-open-modal><b>${escapeHtml(title)}</b><span>${escapeHtml(state)}</span></button>`).join("")}</div>
        </div>
        <aside class="preset-panel"><h3>Preset pads</h3><div class="preset-grid"><button type="button" data-open-modal>Rain room<span>Active</span></button><button type="button" data-open-modal>Library hush<span>Saved</span></button><button type="button" data-open-modal>Night train<span>Muted</span></button></div><div class="calm-meter"><b>${escapeHtml(scenario.metrics[2][0])}</b><span>${escapeHtml(scenario.metrics[2][1])}</span><i></i></div></aside>
      </section>`;
    case "glass-map":
      return `<section class="glass-map">
        <div class="map-field">${renderScene(style, scenario)}<div class="map-pins"><span></span><span></span><span></span></div><div class="glass-map-card"><b>Signal layers</b><span>North room stable</span><span>Signal 08 drifting</span><span>Operator note open</span></div></div>
        <aside class="glass-panel">
          <p class="kicker">${escapeHtml(label)} · ${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="glass-metrics">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div>
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
          <div class="queue-list">${queue}</div>
        </aside>
      </section>`;
    case "retro-desktop":
      return `<section class="retro-desktop">
        <div class="window lead-window"><div class="title-bar">${escapeHtml(scenario.brand)}.exe</div><h1>${escapeHtml(scenario.headline)}</h1><p>${escapeHtml(scenario.lede)}</p><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button></div>
        <div class="window player-window"><div class="title-bar">PLAYER</div><div class="chart">${bars}</div></div>
        <div class="window files-window"><div class="title-bar">FILES</div>${queue}</div>
      </section>`;
    case "brutal-release":
      return `<section class="brutal-release">
        <div class="brutal-copy"><p class="kicker">${escapeHtml(label)} · ${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1><p>${escapeHtml(scenario.lede)}</p></div>
        <aside class="proof-wall">
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
          <div class="command-line">npx install ${escapeHtml(scenario.brand.toLowerCase())}</div>
          <div class="metric-row">${metrics}</div>
          <div class="queue-list">${queue}</div>
        </aside>
      </section>`;
    case "precision-graph":
      return `<section class="precision-graph">
        <aside class="trace-panel">
          <p class="kicker">${escapeHtml(label)} · ${escapeHtml(scenario.eyebrow)}</p>
          <h1>${escapeHtml(scenario.headline)}</h1>
          <p>${escapeHtml(scenario.lede)}</p>
          <div class="trace-metrics">${scenario.metrics.map(([value, text]) => `<span><strong>${escapeHtml(value)}</strong>${escapeHtml(text)}</span>`).join("")}</div>
          <button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button>
        </aside>
        <div class="node-graph">
          <span class="node n1">${escapeHtml(scenario.metrics[0][0])}</span><span class="node n2">${escapeHtml(scenario.metrics[1][0])}</span><span class="node n3">${escapeHtml(scenario.metrics[2][0])}</span>
          <i class="edge e1"></i><i class="edge e2"></i><i class="edge e3"></i>
          <div class="span-table"><b>Active spans</b>${scenario.queue.map(([title, state], index) => `<span><em>0${index + 1}</em>${escapeHtml(title)}<strong>${escapeHtml(state)}</strong></span>`).join("")}</div>
        </div>
        <aside class="trace-list"><h3>Trace queue</h3>${queue}<div class="trace-command">replay --batch latest</div><div class="trace-watch"><b>Watch window</b><span><em>p95 latency</em><strong>184ms</strong></span><span><em>retry rate</em><strong>2.8%</strong></span><span><em>owner</em><strong>Infra</strong></span></div></aside>
      </section>`;
    case "gradient-builder":
      return `<section class="gradient-builder">
        <div class="builder-copy"><p class="kicker">${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1><p>${escapeHtml(scenario.lede)}</p><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button></div>
        <div class="builder-canvas"><div class="stepper"><span>01</span><span>02</span><span>03</span></div><div class="live-canvas"><b>Live canvas</b><p>Template, copy, and signup state update together.</p><div class="canvas-layers"><span></span><span></span><span></span></div></div><div class="builder-checks">${features}</div></div>
        <aside class="template-stack"><h3>Launch checklist</h3>${queue}<div class="metric-row">${metrics}</div><button type="button" class="secondary-action" data-open-modal>${escapeHtml(scenario.secondaryAction)}</button></aside>
      </section>`;
    case "soft-learning":
      return `<section class="soft-learning">
        <aside class="lesson-path">${scenario.queue.map(([title, state], index) => `<button type="button" data-open-modal><span>${index + 1}</span><b>${escapeHtml(title)}</b><em>${escapeHtml(state)}</em></button>`).join("")}</aside>
        <article class="lesson-card practice-card"><p class="kicker">${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1><p>${escapeHtml(scenario.lede)}</p><div class="prompt-card"><b>Today's prompt</b><p>Write three lines, save one note, and mark the retry kindly.</p></div><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button></article>
        <aside class="note-stack learning-notes"><h3>Progress</h3><div class="progress-path">${scenario.metrics.map(([value, text]) => `<span><b>${escapeHtml(value)}</b>${escapeHtml(text)}</span>`).join("")}</div>${queue}</aside>
      </section>`;
    case "acid-poster":
      return `<section class="acid-poster">
        <div class="acid-title"><p class="kicker">${escapeHtml(label)} · ${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1><p>${escapeHtml(scenario.lede)}</p><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button></div>
        <div class="chrome-slab">${renderScene(style, scenario)}</div>
        <aside class="shard-list">${queue}<div class="metric-row">${metrics}</div></aside>
      </section>`;
    default:
      return `<section class="minimal-brief">
        <article class="document-surface"><p class="kicker">${escapeHtml(scenario.eyebrow)}</p><h1>${escapeHtml(scenario.headline)}</h1><p>${escapeHtml(scenario.lede)}</p><button type="button" class="primary-action" data-copy>${escapeHtml(scenario.primaryAction)}</button></article>
        <aside class="comment-stack">${queue}</aside>
      </section>`;
  }
}

function renderDistinctStyleHtml(style) {
  const label = style.label || `Style ${style.id}`;
  const scenario = getScenario(style);
  const playbook = getStylePlaybook(style);
  const geometry = getGeometryProfile(style);
  const notes = style.notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("");
  const related = allStyles
    .filter((item) => item.id !== style.id)
    .slice(0, 3)
    .map((item) => `<a href="../${item.slug}/${item.slug}.html">${item.id}. ${escapeHtml(item.name)}</a>`)
    .join("");
  const demo = JSON.stringify(scenario.tabs);
  const prompt = buildStylePrompt(style, "en");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${label} - ${style.name}</title>
<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  min-width: 0;
}
html,
body {
  max-width: 100%;
  overflow-x: hidden;
}
:root {
  --bg: ${style.bg};
  --surface: ${style.surface};
  --text: ${style.text};
  --muted: ${style.muted};
  --primary: ${style.primary};
  --accent: ${style.accent};
  --border: ${style.border};
  --radius: ${style.radius};
  --panel-radius: ${geometry.panel};
  --control-radius: ${geometry.control};
  --chip-radius: ${geometry.chip};
  --media-radius: ${geometry.media};
  --shadow: ${style.shadow};
}
${sharedCss}</style>
</head>
<body class="${style.className}">
  <header class="preview-context-shell">
    <nav class="preview-context" aria-label="Style preview navigation">
      <a class="preview-context-back" href="../../previews/index.html"><span aria-hidden="true">←</span> <span lang="zh-CN">返回风格库</span></a>
      <div class="preview-context-identity"><span class="preview-context-number">${escapeHtml(label)}</span><strong>${escapeHtml(style.name)}</strong><span lang="zh-CN">${escapeHtml(style.zhName)}</span></div>
      <a class="preview-context-use" href="../../previews/index.html?style=${encodeURIComponent(style.id)}#style-${encodeURIComponent(style.id)}" lang="zh-CN">选用此风格 <span aria-hidden="true">→</span></a>
    </nav>
  </header>
  <main id="top" class="page">
    ${renderMiniNav(style, scenario)}
    ${renderLayoutContent(style, scenario, playbook)}
    <details id="details" class="reference-disclosure">
      <summary><span lang="zh-CN">交互与组件示例</span> <span class="reference-disclosure-hint">Interaction &amp; component examples</span></summary>
      <section class="reference-stack" aria-label="Reusable interaction and implementation notes">
        ${renderInteractionDemo(style, scenario, playbook)}
        ${renderStyleLab(style, scenario, playbook, related)}
      </section>
    </details>
  </main>

  <aside class="modal" hidden data-modal role="dialog" aria-modal="false" aria-labelledby="style-note-title">
    <h3 id="style-note-title">${escapeHtml(label)}: ${escapeHtml(style.name)}</h3>
    <ul>${notes}</ul>
    <button type="button" class="secondary-action" data-close-modal>Close</button>
  </aside>
  <div class="toast" hidden data-toast role="status" aria-live="polite">
    <b>Saved</b>
    <span data-toast-message>Action confirmed</span>
  </div>
  <div class="sr-status" aria-live="polite" data-status></div>

  <script>
  const prompt = ${JSON.stringify(prompt)};
  const modal = document.querySelector('[data-modal]');
  const status = document.querySelector('[data-status]');
  const toast = document.querySelector('[data-toast]');
  const demo = ${demo};
  const referenceDetails = document.getElementById('details');
  document.querySelectorAll('a[href="#details"]').forEach((link) => {
    link.addEventListener('click', () => { referenceDetails.open = true; });
  });
  function revealReferenceFromHash() {
    if (location.hash === '#details') referenceDetails.open = true;
  }
  revealReferenceFromHash();
  window.addEventListener('hashchange', revealReferenceFromHash);
  let toastTimer;
  function showToast(message) {
    if (!toast) return;
    const messageNode = toast.querySelector('[data-toast-message]');
    if (messageNode) messageNode.textContent = message;
    toast.hidden = false;
    status.textContent = message;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.hidden = true;
    }, 2200);
  }
  async function copyText(value) {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(value);
        return true;
      } catch {}
    }
    const helper = document.createElement('textarea');
    helper.value = value;
    helper.setAttribute('readonly', '');
    helper.style.position = 'fixed';
    helper.style.inset = '0 auto auto 0';
    helper.style.width = '1px';
    helper.style.height = '1px';
    helper.style.opacity = '0';
    document.body.appendChild(helper);
    helper.focus();
    helper.select();
    let copied = false;
    try {
      copied = document.execCommand('copy');
    } catch {}
    helper.remove();
    return copied;
  }
  document.querySelectorAll('[data-open-modal]').forEach((node) => node.addEventListener('click', () => {
    modal.hidden = false;
    document.querySelector('[data-close-modal]').focus();
  }));
  document.querySelector('[data-close-modal]').addEventListener('click', () => modal.hidden = true);
  document.querySelectorAll('[data-copy]').forEach((button) => {
    const original = button.textContent;
    button.addEventListener('click', async () => {
      if (await copyText(prompt)) {
        button.textContent = 'Copied detailed prompt';
        status.textContent = 'Detailed style prompt copied';
        showToast('Detailed style prompt copied');
        setTimeout(() => button.textContent = original, 1500);
      } else {
        button.textContent = 'Copy unavailable';
        status.textContent = 'Copy unavailable in this browser context';
        showToast('Copy unavailable in this browser context');
        setTimeout(() => button.textContent = original, 1800);
      }
    });
  });
  document.querySelectorAll('[data-toast-trigger]').forEach((button) => {
    button.addEventListener('click', () => showToast('Primary action confirmed'));
  });
  document.querySelectorAll('[data-loading-demo]').forEach((button) => {
    const original = button.textContent;
    button.addEventListener('click', () => {
      if (button.getAttribute('aria-busy') === 'true') return;
      button.setAttribute('aria-busy', 'true');
      button.disabled = true;
      status.textContent = 'Saving state';
      setTimeout(() => {
        button.setAttribute('aria-busy', 'false');
        button.disabled = false;
        button.textContent = original;
        showToast('State saved without layout shift');
      }, 1200);
    });
  });
  document.querySelectorAll('[data-toggle-demo]').forEach((button) => {
    button.addEventListener('click', () => {
      const pressed = button.getAttribute('aria-pressed') === 'true';
      button.setAttribute('aria-pressed', String(!pressed));
      button.textContent = pressed ? 'Filter off' : 'Filter on';
      showToast(pressed ? 'Filter removed' : 'Filter applied');
    });
  });
  document.querySelectorAll('[data-demo-input]').forEach((input) => {
    input.addEventListener('input', () => {
      const helper = input.closest('.field-group')?.querySelector('[data-field-help]');
      if (!helper) return;
      if (input.value.trim().length < 3) {
        input.setAttribute('aria-invalid', 'true');
        helper.textContent = 'Add at least three characters so the field has a recoverable validation state.';
        status.textContent = 'Field validation warning';
      } else {
        input.removeAttribute('aria-invalid');
        helper.textContent = 'Filled state is valid and helper text remains visible.';
        status.textContent = 'Field validation cleared';
      }
    });
  });
  document.querySelectorAll('[data-tab]').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-tab]').forEach((node) => {
        const active = node === button;
        node.classList.toggle('active', active);
        node.setAttribute('aria-selected', String(active));
      });
      document.querySelector('[data-demo-title]').textContent = demo[button.dataset.tab][0];
      document.querySelector('[data-demo-copy]').textContent = demo[button.dataset.tab][1];
      status.textContent = demo[button.dataset.tab][0] + ' tab selected';
    });
  });
  </script>
</body>
</html>
`;
}

function renderStyleHtml(style) {
  return renderDistinctStyleHtml(style);
}

  return { renderStyleHtml };
}

module.exports = { createPageRenderer };
