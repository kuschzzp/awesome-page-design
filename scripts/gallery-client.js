// Embedded as a function in the standalone gallery; keep this dependency-free.
function initializeGallery() {
  const data = JSON.parse(document.getElementById("gallery-data").textContent);
  const { styles, prompts, kinds } = data;
  const byId = new Map(styles.map((style) => [style.id, style]));
  const $ = (id) => document.getElementById(id);
  const all = (selector) => Array.from(document.querySelectorAll(selector));
  const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const words = data.copy;
  const state = { lang: "zh", view: "desktop", active: null, kind: "full" };
  try { if (localStorage.getItem("apd-language") === "en") state.lang = "en"; } catch {}
  const t = (key) => words[state.lang][key] || key;
  const name = (style) => state.lang === "zh" ? style.zhName : style.name;
  const bestFor = (style) => state.lang === "zh" ? style.zhBestFor : style.bestFor;
  const field = (style, key) => state.lang === "zh" ? style[`zh${key[0].toUpperCase()}${key.slice(1)}`] : style[key];
  const imageSource = (style) => `../styles/${style.slug}/${style.slug}${state.view === "mobile" ? "-mobile" : ""}.png`;
  let lastFocus = null;
  let toastTimer;

  function announce(message) {
    const host = $("detail-dialog").open ? $("detail-dialog") : document.body;
    if ($("toast").parentElement !== host) host.appendChild($("toast"));
    $("status").textContent = message;
    $("toast").textContent = message;
    $("toast").hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { $("toast").hidden = true; }, 4200);
  }

  function applyView() {
    all("[data-preview-view]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.previewView === state.view)));
    if (!state.active) return;
    const style = byId.get(state.active);
    const image = $("detail-image");
    image.src = imageSource(style);
    image.alt = `${name(style)} · ${t(state.view)}`;
    image.width = data.viewports[state.view].width;
    image.height = data.viewports[state.view].height;
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
    lastFocus = trigger || document.querySelector(`[data-open-style="${id}"]`);
    state.active = id;
    state.kind = "full";
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

  function setLanguage(lang) {
    state.lang = lang;
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.title = lang === "zh" ? "风格库 · Awesome Page Design" : "Style library · Awesome Page Design";
    all("[data-i18n]").forEach((element) => { element.textContent = t(element.dataset.i18n); });
    all("[data-en][data-zh]").forEach((element) => { element.textContent = element.dataset[lang]; });
    all("[data-style-card]").forEach((card) => { card.querySelector("img").alt = `${name(byId.get(card.dataset.styleCard))} · ${t("desktop")}`; });
    all("[data-tag]").forEach((element) => { element.textContent = t(element.dataset.tag); });
    all("[data-lang]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.lang === lang)));
    $("result-count").textContent = `${styles.length} ${t("result")}`;
    if (state.active) renderDetail();
    applyView();
    try { localStorage.setItem("apd-language", lang); } catch {}
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.dataset.lang) setLanguage(button.dataset.lang);
    if (button.dataset.previewView) { state.view = button.dataset.previewView; applyView(); }
    if (button.dataset.openStyle) openDetail(button.dataset.openStyle, button);
    if (button.dataset.promptKind) { state.kind = button.dataset.promptKind; renderPrompt(); }
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
        const target = lastFocus && document.contains(lastFocus) && !lastFocus.closest("[hidden]") ? lastFocus : document.querySelector("[data-open-style]");
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
