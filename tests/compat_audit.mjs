import { chromium, devices } from '/opt/node22/lib/node_modules/playwright/index.mjs';

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
  mac13:    { viewport: { width: 1280, height: 800 } },
  mac16:    { viewport: { width: 1440, height: 900 } },
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
await page.selectOption('#deckSelect', 'basic-da');
await page.waitForTimeout(400);

// ── 1) Konfig-Screen: kein Scrollen, kein Overflow ──
if (isNarrow) {
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

// ── 3) Modus-Karten: 9 Stück, Icon sichtbar, Label nicht abgeschnitten ──
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
check('9 Modus-Karten', modes.length === 9, String(modes.length));
check('Jede Karte mit sichtbarem Icon', modes.every(m => m.iconVisible), JSON.stringify(modes.filter(m => !m.iconVisible).map(m => m.mode)));
check('Kein Label abgeschnitten', modes.every(m => !m.clippedW && !m.clippedH), JSON.stringify(modes.filter(m => m.clippedW || m.clippedH).map(m => m.mode)));

// ── 4) Lernpfad-Knopf nur im Lernkurs ──
const mapHidden = await page.evaluate(() => getComputedStyle(document.getElementById('coursemapBtn')).display === 'none');
check('Lernpfad-Knopf im Karteikarten-Modus ausgeblendet', mapHidden);
await click('.mode-btn[data-mode="course"]'); await page.waitForTimeout(200);
const mapShown = await page.evaluate(() => getComputedStyle(document.getElementById('coursemapBtn')).display !== 'none');
check('Lernpfad-Knopf im Lernkurs sichtbar', mapShown);

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
await menuView('arena', 'arenaBackBtn');
await menuView('rewards', 'rewardsBackBtn');
await menuView('settings', 'settingsBackBtn');
// Lernpfad (Kurs-Modus ist aktiv)
await click('#coursemapBtn'); await page.waitForTimeout(400);
const pathOpen = await page.evaluate(() => document.getElementById('view-path').classList.contains('active'));
await click('#pathBackBtn'); await page.waitForTimeout(250);
const pathBack = await page.evaluate(() => document.getElementById('view-learn').classList.contains('active'));
check('Zurück-Knopf „Lernpfad" funktioniert', pathOpen && pathBack, JSON.stringify({ pathOpen, pathBack }));

// ── 6) Alle 9 Modi: starten, sichtbar, kein Overflow, zurück ──
const MARKERS = {
  course: '.course-phase-badge, .course-teach, #courseNext, .course-word',
  flashcard: '#showAnswer, .fc-word',
  multiplechoice: '.mc-option',
  comparison: '.comparison-card, .word',
  listen: '#listenPlay',
  typing: '#typingInput',
  build: '#buildPool',
  speak: '.speak-card',
  story: '.story-sent',
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

check('keine JS-Fehler', errs.length === 0, errs.slice(0, 2).join('; '));
await page.screenshot({ path: `${SHOT}/compat_${key}.png` });
await ctx.close();
await browser.close();
console.log(`\nDEVICE ${key}: ${failures === 0 ? 'PASS' : failures + ' FEHLER'}`);
process.exit(failures === 0 ? 0 : 1);
