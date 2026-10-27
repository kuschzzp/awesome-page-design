// Embedded as a function in the standalone gallery; keep this dependency-free.
function initializeGallery() {
  const data = JSON.parse(document.getElementById("gallery-data").textContent);
  const { styles, prompts, kinds } = data;
  const byId = new Map(styles.map((style) => [style.id, style]));
  const $ = (id) => document.getElementById(id);
  const all = (selector) => Array.from(document.querySelectorAll(selector));
  const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const words = data.copy;
  // "editorial" names both a use case and a visual family; both mean editing-led design.
  const state = { lang: "zh", query: "", useCase: "all", appearance: "all", view: "desktop", selected: new Set(), active: null, kind: "full" };
  try { if (localStorage.getItem("apd-language") === "en") state.lang = "en"; } catch {}
  const t = (key) => words[state.lang][key] || key;
  const name = (style) => state.lang === "zh" ? style.zhName : style.name;
  const bestFor = (style) => state.lang === "zh" ? style.zhBestFor : style.bestFor;
  const field = (style, key) => state.lang === "zh" ? style[`zh${key[0].toUpperCase()}${key.slice(1)}`] : style[key];
  const imageSource = (style) => `../styles/${style.slug}/${style.slug}${state.view === "mobile" ? "-mobile" : ""}.png`;
  let lastFocus = null;
  let toastTimer;

  function announce(message) {
    const host = $("detail-dialog").open ? $("detail-dialog") : $("compare-dialog").open ? $("compare-dialog") : document.body;
    if ($("toast").parentElement !== host) host.appendChild($("toast"));
    $("status").textContent = message;
    $("toast").textContent = message;
    $("toast").hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { $("toast").hidden = true; }, 4200);
  }

  function applyView() {
    all("[data-preview-view]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.previewView === state.view)));
    all("[data-preview-image]").forEach((image) => {
      const style = byId.get(image.dataset.style);
      image.src = imageSource(style);
      image.alt = `${name(style)} · ${t(state.view)}`;
      image.width = data.viewports[state.view].width;
      image.height = data.viewports[state.view].height;
      image.classList.toggle("mobile", state.view === "mobile");
      image.closest(".preview-link, .detail-preview")?.classList.toggle("mobile", state.view === "mobile");
    });
  }

  function applyFilters() {
    const matching = new Set(filterGalleryStyles(styles, state).map((style) => style.id));
    all("[data-style-card]").forEach((card) => { card.hidden = !matching.has(card.dataset.styleCard); });
    $("result-count").textContent = `${matching.size} ${t("result")}`;
    $("empty").hidden = matching.size !== 0;
    $("filter-status").textContent = `${matching.size} ${t("result")}`;
    all("[data-use-case]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.useCase === state.useCase)));
    all("[data-appearance]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.appearance === state.appearance)));
    $("reset-filters").hidden = !state.query && state.useCase === "all" && state.appearance === "all";
  }

  function renderSelection() {
    all("[data-compare-style]").forEach((button) => {
      const selected = state.selected.has(button.dataset.compareStyle);
      button.setAttribute("aria-pressed", String(selected));
      button.textContent = t(selected ? "compared" : "compare");
      button.setAttribute("aria-label", `${t(selected ? "remove" : "compare")} ${name(byId.get(button.dataset.compareStyle))}`);
      button.closest(".card")?.classList.toggle("selected", selected);
    });
    $("selection-tray").hidden = state.selected.size === 0;
    $("selected-items").innerHTML = Array.from(state.selected, (id) => `<button type="button" data-remove="${id}" aria-label="${esc(t("remove") + " " + name(byId.get(id)))}">${esc(name(byId.get(id)))} · ${esc(t("remove"))}</button>`).join("");
    $("selection-count").textContent = `${state.selected.size}/3 ${t("selected")}`;
    $("compare-open").disabled = state.selected.size < 2;
  }

  function currentPrompt() {
    return unpackPrompt(prompts[state.active][state.lang], state.kind);
  }

  function renderPrompt() {
    all("[data-prompt-kind]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.promptKind === state.kind));
      const kind = kinds.find((item) => item.key === button.dataset.promptKind);
      button.textContent = state.lang === "zh" ? kind.labelZh : kind.labelEn;
    });
    const kind = kinds.find((item) => item.key === state.kind);
    $("kind-help").textContent = state.lang === "zh" ? kind.descriptionZh : kind.descriptionEn;
    $("prompt-output").textContent = currentPrompt();
  }

  function renderDetail() {
    if (!state.active) return;
    const style = byId.get(state.active);
    $("detail-name").textContent = `${style.id} / ${name(style)}`;
    $("detail-subtitle").textContent = state.lang === "zh" ? style.name : style.zhName;
    $("detail-description").textContent = field(style, "brief");
    $("detail-facts").innerHTML = [["fit", bestFor(style)], ["structure", state.lang === "zh" ? style.layout.zhStructure : style.layout.structure], ["typography", state.lang === "zh" ? style.layout.zhTypography : style.layout.typography]]
      .map(([key, value]) => `<dt>${esc(t(key))}</dt><dd>${esc(value)}</dd>`).join("");
    $("detail-palette").innerHTML = Object.entries(style.palette).map(([role, color]) => `<span style="--swatch:${esc(color)}" title="${esc(role + " " + color)}" aria-label="${esc(role + " " + color)}"></span>`).join("");
    $("detail-image").dataset.style = style.id;
    $("detail-live").href = `../styles/${style.slug}/${style.slug}.html`;
    renderPrompt();
    applyView();
  }

  function openDetail(id, trigger) {
    if (!byId.has(id)) return;
    lastFocus = trigger || $("search");
    if ($("compare-dialog").open) $("compare-dialog").close();
    state.active = id;
    state.kind = ["landing", "dashboard", "admin"].includes(state.useCase) ? state.useCase : "full";
    renderDetail();
    $("prompt-disclosure").open = false;
    if (!$("detail-dialog").open) $("detail-dialog").showModal();
    document.body.style.overflow = "hidden";
    try {
      const url = new URL(location.href);
      url.searchParams.set("style", id);
      url.hash = `style-${id}`;
      history.replaceState(null, "", url);
    } catch {}
  }

  function renderComparison() {
    const selected = Array.from(state.selected, (id) => byId.get(id));
    $("compare-grid").style.setProperty("--columns", selected.length);
    $("compare-grid").innerHTML = selected.map((style) => `<article class="compare-card">
      <img data-preview-image data-style="${style.id}" src="${imageSource(style)}" alt="${esc(name(style))}" width="${data.viewports[state.view].width}" height="${data.viewports[state.view].height}">
      <h3>${style.id} / ${esc(name(style))}</h3>
      <div class="swatches">${Object.values(style.palette).map((color) => `<span style="--swatch:${esc(color)}"></span>`).join("")}</div>
      <dl><dt>${esc(t("family"))}</dt><dd>${esc(t(style.selection.family === "editorial" ? "family_editorial" : style.selection.family))}</dd><dt>${esc(t("density"))}</dt><dd>${esc(t(style.selection.density))}</dd><dt>${esc(t("fit"))}</dt><dd>${esc(bestFor(style))}</dd><dt>${esc(t("structure"))}</dt><dd>${esc(state.lang === "zh" ? style.layout.zhName : style.layout.name)}</dd></dl>
      <button type="button" class="button" data-use-style="${style.id}">${esc(t("select"))}</button></article>`).join("");
    applyView();
  }

  function setLanguage(lang) {
    state.lang = lang;
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.title = lang === "zh" ? "风格库 · Awesome Page Design" : "Style library · Awesome Page Design";
    all("[data-i18n]").forEach((element) => { element.textContent = t(element.dataset.i18n); });
    all("[data-en][data-zh]").forEach((element) => { element.textContent = element.dataset[lang]; });
    all("[data-tag]").forEach((element) => { element.textContent = t(element.dataset.tag); });
    all("[data-lang]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.lang === lang)));
    $("search").placeholder = t("search");
    $("search").setAttribute("aria-label", t("searchLabel"));
    $("selected-items").setAttribute("aria-label", t("shortlist"));
    renderSelection();
    applyFilters();
    if (state.active) renderDetail();
    if ($("compare-dialog").open) renderComparison();
    applyView();
    try { localStorage.setItem("apd-language", lang); } catch {}
  }

  $("search").addEventListener("input", (event) => { state.query = event.target.value; applyFilters(); });
  document.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.dataset.lang) setLanguage(button.dataset.lang);
    if (button.dataset.previewView) { state.view = button.dataset.previewView; applyView(); }
    if (button.dataset.useCase) { state.useCase = button.dataset.useCase; applyFilters(); }
    if (button.dataset.appearance) { state.appearance = button.dataset.appearance; applyFilters(); }
    if (button.dataset.openStyle) openDetail(button.dataset.openStyle, button);
    if (button.dataset.useStyle) openDetail(button.dataset.useStyle, $("compare-open"));
    if (button.dataset.promptKind) { state.kind = button.dataset.promptKind; renderPrompt(); }
    if (button.dataset.compareStyle) {
      const id = button.dataset.compareStyle;
      if (state.selected.has(id)) state.selected.delete(id);
      else if (state.selected.size < 3) state.selected.add(id);
      else { announce(t("max")); return; }
      renderSelection();
    }
    if (button.dataset.remove) {
      state.selected.delete(button.dataset.remove);
      renderSelection();
      (state.selected.size ? $("compare-open") : $("search")).focus();
    }
  });

  all("[data-reset]").forEach((button) => button.addEventListener("click", () => {
    state.query = ""; state.useCase = "all"; state.appearance = "all"; $("search").value = ""; applyFilters(); $("search").focus();
  }));
  $("clear-selection").addEventListener("click", () => { state.selected.clear(); renderSelection(); $("search").focus(); });
  $("compare-open").addEventListener("click", () => {
    lastFocus = $("compare-open"); renderComparison(); $("compare-dialog").showModal(); document.body.style.overflow = "hidden";
  });
  all("[data-close-dialog]").forEach((button) => button.addEventListener("click", () => button.closest("dialog").close()));
  all("dialog").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
    dialog.addEventListener("close", () => {
      if (dialog.id === "detail-dialog") {
        state.active = null;
        try { const url = new URL(location.href); url.searchParams.delete("style"); url.hash = ""; history.replaceState(null, "", url); } catch {}
      }
      if (!all("dialog").some((item) => item.open)) {
        document.body.style.overflow = "";
        const target = lastFocus && document.contains(lastFocus) && !lastFocus.closest("[hidden]") ? lastFocus : $("search");
        target?.focus();
      }
    });
  });
  $("copy-prompt").addEventListener("click", async () => {
    const prompt = currentPrompt();
    let copied = false;
    try { await navigator.clipboard.writeText(prompt); copied = true; } catch {}
    if (!copied) {
      const helper = document.createElement("textarea");
      helper.value = prompt; helper.setAttribute("readonly", ""); helper.style.position = "fixed"; helper.style.opacity = "0";
      $("detail-dialog").appendChild(helper);
      helper.select();
      try { copied = document.execCommand("copy"); } catch {}
      helper.remove(); $("copy-prompt").focus();
    }
    if (!copied) { $("prompt-disclosure").open = true; $("prompt-output").focus(); }
    announce(t(copied ? "copied" : "copyFailed"));
  });
  setLanguage(state.lang);
  const initialStyle = new URLSearchParams(location.search).get("style");
  if (initialStyle) openDetail(initialStyle.padStart(2, "0"));
}

module.exports = { initializeGallery };
