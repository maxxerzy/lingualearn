import { chromium, devices } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { courseStepFn } from './course_driver.mjs';

// Geräte-Matrix-Audit: Overlaps, No-Scroll, Modus-Karten, Zurück-Knöpfe,
// Funktions-Smoke aller 9 Modi. Aufruf: node compat_audit.mjs <geräteschlüssel>
const BASE = 'http://127.0.0.1:4173';
const SHOT = '/tmp';

const DEVICES = {
  se:       { ...devices['iPhone SE'] },
  iph14:    { ...devices['iPhone 14'] },
  iph14pm:  { ...devices['iPhone 14 Pro Max'] },
  ipadmini: { ...devices['iPad Mini'] },
  ipad11:   { ...devices['iPad Pro 11'] },
  ipad11l:  { ...devices['iPad Pro 11 landscape'] },
  // iPad Pro 13" quer (Safari: ~1366×950 CSS-px nutzbar) — Desktop-Layout
  ipad13l:  { viewport: { width: 1366, height: 950 }, hasTouch: true },
  mac13:    { viewport: { width: 1280, height: 800 } },
  mac16:    { viewport: { width: 1440, height: 900 } },
  // Große Mac-Fenster: skaliertes MacBook-Vollbild und QHD/27".
  mac21:    { viewport: { width: 2048, height: 1120 } },
  mac27:    { viewport: { width: 2560, height: 1400 } },
};

const key = process.argv[2];
if (!DEVICES[key]) { console.error('Unbekanntes Gerät:', key, '— erlaubt:', Object.keys(DEVICES).join(',')); process.exit(2); }
const dev = DEVICES[key];
const vw = dev.viewport.width;
const isNarrow = vw <= 1200;                 // Fokus-Modus-Bereich
const V_TOL_CONFIG = key === 'se' ? 26 : 2;  // SE ist das kleinste Gerät
const V_TOL_SESSION = key === 'se' ? 30 : 4;

let failures = 0;
const check = (n, c, d = '') => { console.log(`${c ? '✅' : '❌'} [${key}] ${n}${d ? ' — ' + d : ''}`); if (!c) failures++; };

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const ctx = await browser.newContext(dev);
const page = await ctx.newPage();
const errs = []; page.on('pageerror', e => errs.push(e.message));
page.on('dialog', d => d.accept());

const click = sel => page.evaluate(s => document.querySelector(s)?.click(), sel);
const overflowV = () => page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
const overflowH = () => page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
const rectsOverlap = (a, b) => Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) *
                               Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)) > 6;

await page.goto(BASE + '/index.html', { waitUntil: 'networkidle' });
await page.click('#tabRegister');
await page.fill('#loginUsername', 'cmp' + key);
await page.fill('#loginPassword', 'test1234');
await page.click('#loginBtn');
await page.waitForSelector('#app:not([hidden])', { timeout: 6000 });
// Erst-Login-Onboarding überspringen (eigener Test in features_smoke)
await page.evaluate(() => document.getElementById('obSkip')?.click());
await page.waitForTimeout(200);
await page.selectOption('#deckSelect', 'basic-da');
await page.waitForTimeout(400);

// ── 1) Konfig-Screen: kein Scrollen, kein Overflow (alle Breiten) ──
{
  const v = await overflowV();
  check(`Konfig ohne vertikales Scrollen (≤${V_TOL_CONFIG}px)`, v <= V_TOL_CONFIG, `${v}px`);
}
const h = await overflowH();
check('Konfig ohne horizontalen Overflow', h <= 1, `${h}px`);

// ── 2) Header: Name im Chip, keine Überlappungen, alles im Viewport ──
const header = await page.evaluate(() => {
  const ids = ['userChipBtn', 'gemChip', 'levelChip', 'streakChip'];
  const rects = {};
  for (const id of ids) { const e = document.getElementById(id); rects[id] = e ? e.getBoundingClientRect().toJSON() : null; }
  // Logo mitprüfen — der Profil-Chip darf es nie überlappen.
  rects.logo = document.querySelector('.logo')?.getBoundingClientRect().toJSON() || null;
  return { rects, name: document.getElementById('userNameChip')?.textContent || '', vw: window.innerWidth };
});
check('Profil-Chip zeigt Kontonamen nach dem Rang', header.name === 'cmp' + key, header.name);
{
  const ids = Object.keys(header.rects);
  let overlap = null;
  for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) {
    const a = header.rects[ids[i]], b = header.rects[ids[j]];
    if (a && b && rectsOverlap(a, b)) overlap = `${ids[i]}×${ids[j]}`;
  }
  check('Header: keine überlappenden Elemente', !overlap, overlap || '');
  const out = ids.find(id => header.rects[id] && (header.rects[id].right > header.vw + 1 || header.rects[id].left < -1));
  check('Header: alles im Viewport', !out, out || '');
}

// ── 2b) Desktop (≥1201): Konfig-Spalte und Lernbereich strikt getrennt,
// im Leerlauf mittiger Empty-State statt verwaister „Bereit zum
// Lernen"-Kopfzeile im Gedränge neben „Lernsession".
if (!isNarrow) {
  const desk = await page.evaluate(() => {
    const r = s => document.querySelector(s)?.getBoundingClientRect().toJSON() || null;
    const cfg = r('.config-panel'), panel = r('.learn-panel');
    const empty = document.querySelector('.learn-empty');
    const emptyRect = empty ? empty.getBoundingClientRect().toJSON() : null;
    const title = document.getElementById('session-title');
    return {
      cfg, panel, emptyRect,
      gap: cfg && panel ? Math.round(panel.left - cfg.right) : -999,
      titleHidden: !title || title.offsetParent === null,
      emptyVisible: !!empty && emptyRect.height > 40,
      emptyCentered: emptyRect && cfg
        ? Math.abs((emptyRect.top + emptyRect.height / 2) - window.innerHeight / 2) < window.innerHeight * 0.2
        : false,
    };
  });
  check('Desktop: Lernbereich überlappt die Konfig-Spalte nicht (≥8px Abstand)',
    desk.gap >= 8, `${desk.gap}px`);
  // DER Mac-Bug: die Icon-Knöpfe neben „Lernsession" ragten aus dem
  // Panel heraus bis über die Überschrift des Lernbereichs.
  const iconsInside = await page.evaluate(() => {
    const panel = document.querySelector('.config-panel').getBoundingClientRect();
    return [...document.querySelectorAll('.config-icon-btn')].map(b => {
      const r = b.getBoundingClientRect();
      return { id: b.id, out: Math.round(r.right - panel.right) };
    }).filter(x => x.out > 1);
  });
  check('Desktop: alle Konfig-Icons bleiben im Panel',
    iconsInside.length === 0, JSON.stringify(iconsInside));
  check('Desktop: Leerlauf zeigt mittigen Empty-State, Kopfzeile ruht',
    desk.emptyVisible && desk.titleHidden && desk.emptyCentered,
    JSON.stringify({ empty: desk.emptyVisible, titleHidden: desk.titleHidden, centered: desk.emptyCentered }));
  const smart = await page.evaluate(() => {
    const t = document.querySelector('.smart-bar__text');
    if (!t || t.closest('[hidden]')) return { skipped: true };
    return { skipped: false, clipped: t.scrollWidth > t.clientWidth + 1 };
  });
  check('Desktop: „Für dich"-Text nicht mitten im Wort abgeschnitten',
    smart.skipped || !smart.clipped, JSON.stringify(smart));
}

// Handy-Layout (≤768): Profil auf der Logo-Zeile (rechtsbündig), Chips in Zeile 2
if (vw <= 768) {
  const rows = await page.evaluate(() => {
    const r = id => document.getElementById(id)?.getBoundingClientRect() ||
                    document.querySelector(id)?.getBoundingClientRect();
    const logo = document.querySelector('.logo').getBoundingClientRect();
    const chip = document.getElementById('userChipBtn').getBoundingClientRect();
    const chips = document.querySelector('.gami-chips').getBoundingClientRect();
    const streak = document.getElementById('streakChip').getBoundingClientRect();
    return {
      sameRow: Math.abs((logo.top + logo.height / 2) - (chip.top + chip.height / 2)) < logo.height,
      chipRight: chip.right >= window.innerWidth - 40,
      chipsBelow: chips.top >= chip.bottom - 4,
      streakRight: streak.right >= window.innerWidth - 40,
    };
  });
  check('Handy: Profil rechtsbündig auf Logo-Zeile', rows.sameRow && rows.chipRight, JSON.stringify(rows));
  check('Handy: Chips-Zeile darunter, Streak ganz rechts', rows.chipsBelow && rows.streakRight, JSON.stringify(rows));
  const lvl = await page.evaluate(() => document.querySelector('.gami-level-label').textContent.trim());
  check('Level-Chip heißt „Lvl."', lvl.startsWith('Lvl.'), lvl);
}

// ── 3) Modus-Karten: 2 Stück (Lernkurs + Karteikarten), Icon sichtbar ──
const modes = await page.evaluate(() => [...document.querySelectorAll('.mode-btn')].map(b => {
  const i = b.querySelector('i');
  const ir = i ? i.getBoundingClientRect() : { width: 0 };
  const st = i ? getComputedStyle(i) : { display: 'none' };
  return {
    mode: b.dataset.mode,
    iconVisible: st.display !== 'none' && ir.width > 2,
    clippedW: b.scrollWidth > b.clientWidth + 1,
    clippedH: b.scrollHeight > b.clientHeight + 1,
  };
}));
check('2 Modus-Karten (Lernkurs + Karteikarten)', modes.length === 2
  && modes[0].mode === 'course' && modes[1].mode === 'flashcard', JSON.stringify(modes.map(m => m.mode)));
check('Jede Karte mit sichtbarem Icon', modes.every(m => m.iconVisible), JSON.stringify(modes.filter(m => !m.iconVisible).map(m => m.mode)));
check('Kein Label abgeschnitten', modes.every(m => !m.clippedW && !m.clippedH), JSON.stringify(modes.filter(m => m.clippedW || m.clippedH).map(m => m.mode)));

// ── 4) Lernpfad-Knopf nur im Lernkurs (Kurs ist jetzt Standard) ──
const mapShown0 = await page.evaluate(() => getComputedStyle(document.getElementById('coursemapBtn')).display !== 'none');
check('Lernpfad-Knopf im Lernkurs (Standard) sichtbar', mapShown0);
await click('.mode-btn[data-mode="flashcard"]'); await page.waitForTimeout(200);
const mapHidden = await page.evaluate(() => getComputedStyle(document.getElementById('coursemapBtn')).display === 'none');
check('Lernpfad-Knopf im Karteikarten-Modus ausgeblendet', mapHidden);
await click('.mode-btn[data-mode="course"]'); await page.waitForTimeout(200);
const mapShown = await page.evaluate(() => getComputedStyle(document.getElementById('coursemapBtn')).display !== 'none');
check('Lernpfad-Knopf im Lernkurs sichtbar', mapShown);
// Shop-Knopf ist immer auf der Hauptseite erreichbar
check('Shop-Knopf auf der Hauptseite', await page.evaluate(() =>
  getComputedStyle(document.getElementById('shopBtn')).display !== 'none'));

// ── 5) Zurück-Knöpfe aller Ansichten ──
async function menuView(action, backId) {
  await click('#userChipBtn'); await page.waitForTimeout(150);
  await click(`.user-dropdown__item[data-action="${action}"]`); await page.waitForTimeout(250);
  const opened = await page.evaluate(a => document.getElementById('view-' + a)?.classList.contains('active'), action);
  await click('#' + backId); await page.waitForTimeout(250);
  const back = await page.evaluate(() => document.getElementById('view-learn').classList.contains('active'));
  check(`Zurück-Knopf „${action}" funktioniert`, opened && back, JSON.stringify({ opened, back }));
}
await menuView('stats', 'statsBackBtn');
// ── 5a) Statistik: Schwächen-Themen (Zeilen dürfen nirgends klemmen) ──
await click('#userChipBtn'); await page.waitForTimeout(150);
await click('.user-dropdown__item[data-action="stats"]'); await page.waitForTimeout(250);
const weakUi = await page.evaluate(async () => {
  const u = localStorage.getItem('lingualearn_current_user');
  const deckId = document.getElementById('deckSelect').value;
  const map = JSON.parse(localStorage.getItem('lingualearn_cards_' + u) || '{}');
  for (const f of ['Hund', 'Katze', 'Pferd', 'Vogel'])
    map[`${deckId}:${f}`] = { level: 1, correct: 1, wrong: 4, hist: '00010' };
  for (const f of ['Rot', 'Blau', 'Grün', 'Gelb'])
    map[`${deckId}:${f}`] = { level: 2, correct: 3, wrong: 2, hist: '10110' };
  localStorage.setItem('lingualearn_cards_' + u, JSON.stringify(map));
  (await import('/core/cardProgress.js')).reinitCardProgress();
  (await import('/ui/gami.js')).renderStatsExtras();
  const rows = [...document.querySelectorAll('#weakThemes .weak-theme')];
  const clipped = rows.filter(r => r.scrollWidth > r.clientWidth + 1).length;
  const outside = rows.filter(r => {
    const b = r.getBoundingClientRect();
    return b.left < -1 || b.right > window.innerWidth + 1;
  }).length;
  // Titel darf weder Quote noch „Üben" überlappen.
  const overlap = rows.filter(r => {
    const main = r.querySelector('.weak-theme__main').getBoundingClientRect();
    const rate = r.querySelector('.weak-theme__rate').getBoundingClientRect();
    const go = r.querySelector('.weak-theme__go').getBoundingClientRect();
    return main.right > rate.left + 1 || rate.right > go.left + 1;
  }).length;
  return { rows: rows.length, clipped, outside, overlap,
           hOverflow: document.documentElement.scrollWidth - window.innerWidth };
});
check('Statistik: Schwächen-Themen ohne Überlauf/Überlappung',
  weakUi.rows === 2 && !weakUi.clipped && !weakUi.outside && !weakUi.overlap && weakUi.hOverflow <= 0,
  JSON.stringify(weakUi));
await click('#statsBackBtn'); await page.waitForTimeout(200);

await menuView('arena', 'arenaBackBtn');
await menuView('rewards', 'rewardsBackBtn');
// ── 5b) Einstellungen: Offline-Schalter je Sprache ──
await click('#userChipBtn'); await page.waitForTimeout(150);
await click('.user-dropdown__item[data-action="settings"]'); await page.waitForTimeout(400);
const offlineUi = await page.evaluate(() => {
  const rows = [...document.querySelectorAll('#offlineList .offline-row')];
  const list = document.getElementById('offlineList');
  return {
    rows: rows.length,
    clipped: rows.filter(r => r.scrollWidth > r.clientWidth + 1).length,
    outside: rows.filter(r => {
      const b = r.getBoundingClientRect();
      return b.left < -1 || b.right > window.innerWidth + 1;
    }).length,
    // Die Liste scrollt innerhalb ihrer Box — nie die Seite.
    ownScroll: list.scrollHeight > list.clientHeight + 1
      ? getComputedStyle(list).overflowY === 'auto' : true,
    hOverflow: document.documentElement.scrollWidth - window.innerWidth,
  };
});
check('Einstellungen: Offline-Schalter ohne Überlauf, Liste scrollt selbst',
  offlineUi.rows === 8 && !offlineUi.clipped && !offlineUi.outside
  && offlineUi.ownScroll && offlineUi.hOverflow <= 1, JSON.stringify(offlineUi));
await click('#settingsBackBtn'); await page.waitForTimeout(200);

await menuView('settings', 'settingsBackBtn');
await menuView('dict', 'dictBackBtn');
// Lernpfad (Kurs-Modus ist aktiv)
await click('#coursemapBtn'); await page.waitForTimeout(400);
const pathOpen = await page.evaluate(() => document.getElementById('view-path').classList.contains('active'));
await click('#pathBackBtn'); await page.waitForTimeout(250);
const pathBack = await page.evaluate(() => document.getElementById('view-learn').classList.contains('active'));
check('Zurück-Knopf „Lernpfad" funktioniert', pathOpen && pathBack, JSON.stringify({ pathOpen, pathBack }));

// ── 6) Beide Modi: starten, sichtbar, kein Overflow, zurück ──
// (Alle früheren Einzelmodi sind jetzt Phasen des Lernkurses.)
const MARKERS = {
  course: '.course-phase-badge, .course-teach, #courseNext, .course-word',
  flashcard: '#showAnswer, .fc-word',
};
for (const mode of Object.keys(MARKERS)) {
  await click(`.mode-btn[data-mode="${mode}"]`); await page.waitForTimeout(150);
  await click('#startBtn'); await page.waitForTimeout(700);
  const ok = await page.evaluate(sel => !!document.querySelector(sel), MARKERS[mode]);
  check(`Modus „${mode}" startet`, ok);
  if (isNarrow) {
    const v = await overflowV(); const hh = await overflowH();
    check(`Modus „${mode}" ohne Scrollen (≤${V_TOL_SESSION}px)`, v <= V_TOL_SESSION && hh <= 1, `v=${v} h=${hh}`);
    // Fokus-Topbar: Zurück/Titel/Modus überlappen nicht
    const bar = await page.evaluate(() => {
      const ids = ['sessionBackBtn', 'session-title', 'sessionModeBtn'];
      const r = ids.map(id => document.getElementById(id)?.getBoundingClientRect().toJSON()).filter(Boolean);
      return r;
    });
    let barOverlap = false;
    for (let i = 0; i < bar.length; i++) for (let j = i + 1; j < bar.length; j++) if (rectsOverlap(bar[i], bar[j])) barOverlap = true;
    check(`Modus „${mode}": Topbar ohne Überlappung`, !barOverlap);
    await click('#sessionBackBtn'); await page.waitForTimeout(250);
    const cfgBack = await page.evaluate(() => !document.getElementById('view-learn').classList.contains('session-active'));
    check(`Modus „${mode}": Zurück zur Konfiguration`, cfgBack);
  }
}

// Nach der Modus-Schleife ggf. noch laufende Session verlassen (Desktop).
await page.evaluate(() => {
  if (document.getElementById('view-learn')?.classList.contains('session-active')) {
    document.getElementById('sessionBackBtn')?.click();
  }
});
await page.waitForTimeout(250);

// ── 7) KOMPLETTER LERNKURS: jeder einzelne Schritt ohne Scrollen/Overlap ──
// Der Kurs enthält alle Übungsformen (Grammatik-Reader, Kennenlernen,
// Hören, MC, Vergleich, Sprechen, Schreiben, Lücke, Satzbau, Bedeutung).
// Jede dieser Ansichten wird auf JEDEM Gerät einzeln vermessen.
await page.evaluate(t => { window.__vtol = t; }, V_TOL_SESSION);
async function measureStep() {
  const v = await overflowV();
  const h = await overflowH();
  const geo = await page.evaluate(() => {
    const vis = el => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return r.width > 1 && r.height > 1 ? r.toJSON() : null;
    };
    const bar = ['sessionBackBtn', 'session-title', 'sessionModeBtn']
      .map(id => vis(document.getElementById(id))).filter(Boolean);
    // Ragt Inhalt aus dem sichtbaren Bereich (unten/rechts) heraus?
    // Dieselbe Toleranz wie beim Scroll-Check (Browser-UI auf kleinen Geräten).
    const tol = window.__vtol || 2;
    const area = document.getElementById('learnArea');
    const ar = area ? area.getBoundingClientRect() : null;
    const clipped = ar ? (ar.bottom > window.innerHeight + tol || ar.right > window.innerWidth + 2) : false;
    // Aktionsknöpfe müssen erreichbar (im Viewport) sein.
    const btns = [...document.querySelectorAll('#learnArea .btn, #learnArea .mc-option, #learnArea .build-tile')]
      .map(b => b.getBoundingClientRect());
    const offscreen = btns.some(r => r.height > 1 && (r.bottom > window.innerHeight + tol || r.top < -2));
    return { bar, clipped, offscreen };
  });
  let barOverlap = false;
  const b = geo.bar;
  for (let i = 0; i < b.length; i++) for (let j = i + 1; j < b.length; j++) if (rectsOverlap(b[i], b[j])) barOverlap = true;
  return { v, h, barOverlap, clipped: geo.clipped, offscreen: geo.offscreen };
}

// Einen Kursschritt korrekt beantworten (alle Übungsformen).
const courseStep = () => page.evaluate(courseStepFn);

await click('.mode-btn[data-mode="course"]'); await page.waitForTimeout(200);
await click('#startBtn'); await page.waitForTimeout(800);
const seen = new Set();
const bad = [];
let state = null;
for (let i = 0; i < 220 && state !== 'done' && state !== 'gone'; i++) {
  const m = await measureStep();
  const phaseNow = await page.evaluate(async () => {
    if (document.getElementById('gramNext')) return 'grammar';
    const st = (await import('/core/state.js')).getCurrentSession();
    return st?.phase || 'end';
  });
  seen.add(phaseNow);
  if (m.v > V_TOL_SESSION || m.h > 1 || m.barOverlap || m.clipped || m.offscreen) {
    bad.push(`${phaseNow}: v=${m.v} h=${m.h}${m.barOverlap ? ' overlap' : ''}${m.clipped ? ' clipped' : ''}${m.offscreen ? ' btn-offscreen' : ''}`);
  }
  state = await courseStep();
  await page.waitForTimeout(140);
}
const PHASES = ['grammar', 'drill', 'teach', 'listen', 'words', 'match', 'speak', 'write', 'talk', 'dialog', 'hearing'];
const missing = PHASES.filter(p => !seen.has(p));
check('Lernkurs komplett durchlaufen (alle Phasen erreicht)',
  state === 'done' && missing.length === 0, `state=${state} fehlend=${missing.join(',') || '—'}`);
check(`Jeder Kursschritt ohne Scrollen/Überlappung (≤${V_TOL_SESSION}px)`,
  bad.length === 0, bad.slice(0, 4).join(' | '));
await page.evaluate(() => document.getElementById('sessionBackBtn')?.click());
await page.waitForTimeout(300);

// ── 7b) Chinesisch: Schriftzeichen sind breiter/höher als lateinische
// Buchstaben — der Kurs muss auch damit ohne Scrollen auskommen.
await page.selectOption('#deckSelect', 'basic-zh');
await page.waitForTimeout(500);
await page.evaluate(async () => {
  const u = localStorage.getItem('lingualearn_current_user');
  const deck = await (await import('/core/state.js')).loadDeck('basic-zh');
  const intro = deck.lessonSizes.slice(0, 3).reduce((a, b) => a + b, 0);
  localStorage.setItem('lingualearn_course_' + u, JSON.stringify({ 'basic-zh': { introduced: intro } }));
  (await import('/core/course.js')).reinitCourse();
  const g = await import('/core/grammar.js');
  const { grammar } = await import('/js/data/grammar/zh.js');
  grammar.forEach(ch => g.markChapterRead('basic-zh', ch.id));
});
// Ohne Spracherkennung (iOS Safari) zeigt der Sprechen-Schritt den
// Vergleichs-Modus mit einer zusätzlichen Knopfzeile — die höchste
// Variante dieser Karte. Der chinesische Durchlauf misst genau die.
await page.evaluate(() => {
  delete window.SpeechRecognition;
  delete window.webkitSpeechRecognition;
});
await click('#startBtn'); await page.waitForTimeout(800);
{
  const badZh = [];
  let sawCompare = false;
  let st = null;
  for (let i = 0; i < 220 && st !== 'done' && st !== 'gone'; i++) {
    // Abspiel-Zeile aufklappen, damit die volle Höhe gemessen wird.
    sawCompare = await page.evaluate(() => {
      const row = document.getElementById('pronPlay');
      if (row) row.hidden = false;
      return document.querySelector('.speak-card')?.dataset.speakMode === 'compare';
    }) || sawCompare;
    const m = await measureStep();
    if (m.v > V_TOL_SESSION || m.h > 1 || m.barOverlap || m.clipped || m.offscreen) {
      const ph = await page.evaluate(async () =>
        (await import('/core/state.js')).getCurrentSession()?.phase || 'end');
      badZh.push(`${ph}: v=${m.v} h=${m.h}${m.clipped ? ' clipped' : ''}${m.offscreen ? ' btn-offscreen' : ''}`);
    }
    st = await courseStep();
    await page.waitForTimeout(140);
  }
  check('Chinesisch: jeder Kursschritt ohne Scrollen/Überlappung',
    st === 'done' && badZh.length === 0, `state=${st} ${badZh.slice(0, 3).join(' | ')}`);
  check('Aussprache ohne Erkennung: Vergleichs-Karte wurde mitgemessen', sawCompare);
}
await page.evaluate(() => document.getElementById('sessionBackBtn')?.click());
await page.waitForTimeout(250);
await page.selectOption('#deckSelect', 'basic-da');
await page.waitForTimeout(300);

// ── 7c) Einstufungstest: Frage-Karte und Ergebnis ohne Scrollen ──
{
  const started = await page.evaluate(async () =>
    (await import('/core/placement.js')).startPlacement('basic-da', () => {}));
  const badP = [];
  let steps = 0;
  for (let i = 0; i < 30; i++) {
    const has = await page.evaluate(() => !!document.querySelector('.placement-card'));
    if (!has) break;
    steps++;
    const m = await measureStep();
    if (m.v > V_TOL_SESSION || m.h > 1 || m.barOverlap || m.clipped || m.offscreen) {
      badP.push(`frage ${steps}: v=${m.v} h=${m.h}${m.clipped ? ' clipped' : ''}${m.offscreen ? ' btn-offscreen' : ''}`);
    }
    // Abwechselnd richtig und „kenne ich nicht" — so werden beide Zweige
    // der Suche und beide Kartenhöhen gemessen.
    if (i % 2 === 0) {
      await page.evaluate(async () => {
        const st = (await import('/core/placement.js')).getPlacementState();
        const idx = st.options.findIndex(o => o.back === st.current.back);
        document.querySelector(`.mc-option[data-idx="${idx}"]`)?.click();
      });
    } else {
      await page.evaluate(() => document.getElementById('placementUnknown')?.click());
    }
    await page.waitForTimeout(90);
  }
  const res = await measureStep();
  const resultOk = await page.evaluate(() =>
    !!document.querySelector('.placement-result') && !!document.getElementById('courseNext'));
  check('Einstufung: jede Frage ohne Scrollen/Überlappung',
    started && steps >= 4 && badP.length === 0, `${steps} Fragen ${badP.slice(0, 3).join(' | ')}`);
  check('Einstufung: Ergebnis-Karte passt und der Startknopf ist erreichbar',
    resultOk && res.v <= V_TOL_SESSION && res.h <= 1 && !res.offscreen,
    JSON.stringify({ resultOk, v: res.v, h: res.h, off: res.offscreen }));
  await page.evaluate(() => document.getElementById('sessionBackBtn')?.click());
  await page.waitForTimeout(250);
}

// ── 8) Dark Mode: gleiche Layout-Garantien, nichts überlappt ──
await page.emulateMedia({ colorScheme: 'dark' });
await page.waitForTimeout(300);
{
  const v = await overflowV(); const h = await overflowH();
  check(`Dark Mode: Konfiguration ohne Scrollen (≤${V_TOL_CONFIG}px)`, v <= V_TOL_CONFIG && h <= 1, `v=${v} h=${h}`);
  const hdr = await page.evaluate(() => {
    const r = id => document.getElementById(id)?.getBoundingClientRect().toJSON() || null;
    return { logo: document.querySelector('.logo')?.getBoundingClientRect().toJSON() || null, chip: r('userChipBtn') };
  });
  check('Dark Mode: Logo & Profil-Chip überlappen nicht',
    !(hdr.logo && hdr.chip && rectsOverlap(hdr.logo, hdr.chip)));
  // Kontrast: Textfarbe muss sich klar vom Hintergrund abheben.
  const contrast = await page.evaluate(() => {
    const lum = c => {
      const [r, g, b] = c.match(/\d+/g).slice(0, 3).map(n => {
        const s = Number(n) / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const el = document.querySelector('.config-head h2') || document.body;
    const cs = getComputedStyle(el);
    const panel = getComputedStyle(document.querySelector('.config-panel') || document.body);
    const l1 = lum(cs.color), l2 = lum(panel.backgroundColor.includes('rgba(0, 0, 0, 0)') ? getComputedStyle(document.body).backgroundColor : panel.backgroundColor);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    return Math.round(ratio * 10) / 10;
  });
  check('Dark Mode: Titel-Kontrast ≥ 3:1', contrast >= 3, `${contrast}:1`);
}
await page.emulateMedia({ colorScheme: 'light' });
await page.waitForTimeout(200);

check('keine JS-Fehler', errs.length === 0, errs.slice(0, 2).join('; '));
await page.screenshot({ path: `${SHOT}/compat_${key}.png` });
await ctx.close();
await browser.close();
console.log(`\nDEVICE ${key}: ${failures === 0 ? 'PASS' : failures + ' FEHLER'}`);
process.exit(failures === 0 ? 0 : 1);
