// Strichfolge als Modal: eine animierte Referenz zum Anschauen, keine
// interaktive Nachzeichnung. Zeigt jedes Kanji/Hanzi eines Wortes einzeln
// mit seinen echten, lizenzierten Strichen (siehe js/data/strokes/) in
// Original-Reihenfolge — angetrieben durch stroke-dasharray/-dashoffset,
// damit jeder Strich sichtbar „gezeichnet" wird.

function esc(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function hasStrokeLang(lang) { return lang === 'zh' || lang === 'ja'; }

const moduleCache = {};
function loadStrokeModule(lang) {
  if (!moduleCache[lang]) {
    moduleCache[lang] = import(`../js/data/strokes/${lang}.js`).catch(() => null);
  }
  return moduleCache[lang];
}

// Ob mindestens ein Zeichen des Wortes eine Strichfolge hat — steuert, ob
// der Knopf überhaupt angezeigt wird. Läuft schon vorab (Modul meist eh
// im Cache), damit kein Knopf ins Leere führt.
export async function wordHasStrokes(lang, word) {
  if (!hasStrokeLang(lang)) return false;
  const mod = await loadStrokeModule(lang);
  if (!mod) return false;
  return [...word].some(ch => mod.strokes[ch]);
}

export async function openStrokeOrder(lang, word) {
  if (!hasStrokeLang(lang)) return;
  const modal = document.getElementById('strokeModal');
  const body = document.getElementById('strokeModalBody');
  if (!modal || !body) return;
  body.innerHTML = '<p class="stroke-status"><i class="fas fa-spinner fa-spin"></i> Lädt …</p>';
  modal.hidden = false;

  const mod = await loadStrokeModule(lang);
  if (!mod) {
    body.innerHTML = '<p class="stroke-status">Strichfolge ist offline nicht verfügbar — dieses Deck muss dafür einmal online geöffnet werden.</p>';
    return;
  }
  const chars = [...word].filter(ch => mod.strokes[ch]);
  if (!chars.length) {
    body.innerHTML = '<p class="stroke-status">Für dieses Wort liegt keine Strichfolge vor.</p>';
    return;
  }
  renderChars(body, lang, mod.viewBox, chars, mod.strokes);
}

function renderChars(body, lang, viewBox, chars, strokesMap) {
  body.innerHTML = `
    <div class="stroke-chars">
      ${chars.map(ch => `
        <div class="stroke-char">
          <svg class="stroke-svg stroke-svg--${lang}" viewBox="${viewBox}">
            ${strokesMap[ch].map(d => `<path d="${esc(d)}" class="stroke-path"></path>`).join('')}
          </svg>
          <div class="stroke-char-label">${esc(ch)}</div>
        </div>
      `).join('')}
    </div>
    <div class="stroke-controls">
      <button type="button" class="btn btn-primary" id="strokeReplay"><i class="fas fa-play"></i> Abspielen</button>
      <span class="stroke-progress" id="strokeProgress"></span>
    </div>
  `;

  const allPaths = [...body.querySelectorAll('.stroke-path')];
  allPaths.forEach(p => {
    const len = p.getTotalLength();
    p.style.strokeDasharray = String(len);
    p.style.strokeDashoffset = String(len);
  });

  const progressEl = body.querySelector('#strokeProgress');
  const total = allPaths.length;
  let timer = null;
  let playing = false;

  const setProgress = n => { progressEl.textContent = `Strich ${n}/${total}`; };

  function reset() {
    clearTimeout(timer);
    playing = false;
    allPaths.forEach(p => { p.style.transition = 'none'; p.style.strokeDashoffset = p.style.strokeDasharray; });
    setProgress(0);
  }

  function play() {
    if (playing) return;
    reset();
    playing = true;
    let i = 0;
    const step = () => {
      if (i >= allPaths.length) { playing = false; return; }
      const p = allPaths[i];
      // Erzwingt einen Reflow, damit der Übergang von der zurückgesetzten
      // Dashoffset-Länge aus wirklich neu startet statt zu überspringen.
      void p.getBoundingClientRect();
      p.style.transition = 'stroke-dashoffset 0.45s ease';
      p.style.strokeDashoffset = '0';
      i++;
      setProgress(i);
      timer = setTimeout(step, 480);
    };
    step();
  }

  reset();
  body.querySelector('#strokeReplay').addEventListener('click', play);
  play();
}

export function initStrokeOrderModal() {
  const modal = document.getElementById('strokeModal');
  if (!modal) return;
  const close = () => { modal.hidden = true; };
  modal.querySelector('.modal__close')?.addEventListener('click', close);
  modal.querySelector('.modal__backdrop')?.addEventListener('click', close);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hidden) close();
  });
}
