import { chromium, devices } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { readFileSync, readdirSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { courseStepFn } from './course_driver.mjs';

// Offline-Garantie: Ein Deck vorab sichern, das Netz abschalten, die
// App neu laden und eine vollständige Lektion aus dem Cache spielen.
// Zusätzlich statisch prüfen, dass die Precache-Liste des Service
// Workers wirklich jede App-Datei enthält — eine vergessene Datei
// bricht den Offline-Start, ohne dass es online auffällt.
// Eigener Server auf eigenem Port: „Netz aus" heißt hier wirklich aus —
// er wird für die Offline-Phase beendet. Über den gemeinsamen Testserver
// ginge das nicht, und ein Playwright-`setOffline` erreicht die Fetches
// des Service Workers nicht zuverlässig.
const PORT = 4199;
const BASE = `http://127.0.0.1:${PORT}`;
let server = spawn('python3', ['-m', 'http.server', String(PORT)], { stdio: 'ignore' });
const stopServer = () => new Promise(res => {
  if (!server) { res(); return; }
  server.on('exit', () => { server = null; res(); });
  server.kill('SIGKILL');
});
process.on('exit', () => server?.kill('SIGKILL'));
await new Promise(r => setTimeout(r, 1200));
let failures = 0;
const check = (n, c, d = '') => { console.log(`${c ? '✅' : '❌'} ${n}${d ? ' — ' + d : ''}`); if (!c) failures++; };

// ── 1) Statisch: deckt PRECACHE alle App-Dateien ab? ──────────────
{
  const sw = readFileSync('sw.js', 'utf8');
  const list = sw.slice(sw.indexOf('const PRECACHE = ['), sw.indexOf('];', sw.indexOf('const PRECACHE = [')));
  const cached = new Set([...list.matchAll(/'\.\/([^']+)'/g)].map(m => m[1]));

  const dirs = ['core', 'ui', 'utils', 'js', 'styles'];
  const files = [];
  const walk = d => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = `${d}/${e.name}`;
      if (e.isDirectory()) walk(p);
      else if (/\.(js|css)$/.test(e.name)) files.push(p);
    }
  };
  dirs.forEach(walk);

  // Die Deck-Dateien liegen absichtlich draußen (zusammen ~900 KB) —
  // sie kommen über den Schalter „Für offline sichern" dazu.
  const expected = files.filter(f => !f.startsWith('js/data/decks/') || f.endsWith('meta.js'));
  const missing = expected.filter(f => !cached.has(f));
  check('PRECACHE enthält jede App-Datei (außer den Deck-Listen)',
    missing.length === 0, missing.join(', '));
  const decksIn = [...cached].filter(f => f.startsWith('js/data/decks/') && !f.endsWith('meta.js'));
  check('Deck-Listen bleiben bewusst außerhalb des Precache', decksIn.length === 0, decksIn.join(', '));

  // Größenangaben im Deck-Verzeichnis müssen zu den echten Dateien passen.
  const meta = readFileSync('js/data/decks/meta.js', 'utf8');
  const drift = [...meta.matchAll(/language: '(\w+)', count: \d+, bytes: (\d+)/g)]
    .map(([, lang, bytes]) => ({ lang, bytes: Number(bytes),
                                 real: readFileSync(`js/data/decks/${lang}.js`).length }))
    .filter(x => x.bytes !== x.real);
  check('Größenangaben der Decks stimmen mit den Dateien überein',
    drift.length === 0, drift.map(d => `${d.lang}: ${d.bytes}≠${d.real}`).join(', '));
}

// ── 2) Im Browser: sichern, Netz aus, Lektion aus dem Cache ───────
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const ctx = await browser.newContext({ ...devices['iPhone 14'] });
const page = await ctx.newPage();
const errs = []; page.on('pageerror', e => errs.push(e.message));
page.on('dialog', d => d.accept());

await page.goto(BASE + '/index.html', { waitUntil: 'networkidle' });
await page.click('#tabRegister');
await page.fill('#loginUsername', 'offline1'); await page.fill('#loginPassword', 'test1234');
await page.click('#loginBtn');
await page.waitForSelector('#app:not([hidden])');
await page.evaluate(() => document.getElementById('obSkip')?.click());
await page.waitForTimeout(300);

// Service Worker muss die Seite steuern, sonst gibt es offline nichts.
const swReady = await page.evaluate(async () => {
  const reg = await navigator.serviceWorker.ready;
  for (let i = 0; i < 60 && !navigator.serviceWorker.controller; i++)
    await new Promise(r => setTimeout(r, 100));
  return { active: !!reg.active, controlling: !!navigator.serviceWorker.controller };
});
check('Service Worker aktiv und steuert die Seite', swReady.active && swReady.controlling, JSON.stringify(swReady));

// Griechisch ist auf diesem Gerät nie geöffnet worden.
const before = await page.evaluate(async () => {
  const o = await import('/core/offline.js');
  return { el: await o.isDeckSaved('basic-el'), ru: await o.isDeckSaved('basic-ru') };
});
check('Nie geöffnetes Deck ist zunächst NICHT gesichert', !before.el && !before.ru, JSON.stringify(before));

// Über den Schalter in den Einstellungen sichern (nicht über die API) —
// so wird der Weg geprüft, den auch ein Nutzer geht.
await page.evaluate(() => document.getElementById('userChipBtn').click());
await page.evaluate(() => document.querySelector('[data-action="settings"]').click());
await page.waitForTimeout(500);
const rows = await page.evaluate(() => ({
  count: document.querySelectorAll('#offlineList [data-offline-deck]').length,
  hasSize: /KB|MB/.test(document.getElementById('offlineList').textContent),
  total: document.getElementById('offlineTotal').textContent,
}));
check('Einstellungen listen alle 8 Sprachen mit Größenangabe',
  rows.count === 8 && rows.hasSize, JSON.stringify(rows));
check('Gesamtangabe zeigt „noch nichts gesichert"', /Noch keine/.test(rows.total), rows.total);

await page.evaluate(() => document.querySelector('[data-offline-deck="basic-el"]').click());
await page.waitForTimeout(1200);
const after = await page.evaluate(async () => ({
  saved: await (await import('/core/offline.js')).isDeckSaved('basic-el'),
  state: document.querySelector('[data-offline-deck="basic-el"]')?.closest('.offline-row')?.textContent.includes('gesichert'),
  total: document.getElementById('offlineTotal').textContent,
}));
check('Schalter sichert das Deck und meldet es zurück',
  after.saved && after.state && /1 von 8/.test(after.total), JSON.stringify(after));

await page.evaluate(() => document.getElementById('settingsBackBtn').click());
await page.waitForTimeout(200);

// ── Netz aus: der Server wird beendet ────────────────────────────
await stopServer();
await ctx.setOffline(true);
const netGone = await page.evaluate(() =>
  fetch('/js/data/decks/ru.js', { cache: 'no-store' }).then(r => r.ok ? 'geladen' : 'fehler').catch(() => 'fehler'));
check('Netz ist wirklich abgeschaltet', netGone === 'fehler', netGone);

await page.reload({ waitUntil: 'domcontentloaded' });
await page.waitForSelector('#app:not([hidden])', { timeout: 8000 });
await page.waitForTimeout(500);
check('App startet offline aus dem Cache',
  await page.evaluate(() => !!document.getElementById('deckSelect')?.options.length));

// Ungesichertes Deck lässt sich offline erwartungsgemäß NICHT laden —
// sonst würde der Test auch ohne echte Sicherung grün werden.
const ruOffline = await page.evaluate(async () => {
  try { await (await import('/core/state.js')).loadDeck('basic-ru'); return 'geladen'; }
  catch { return 'fehlt'; }
});
check('Ungesichertes Deck ist offline nicht verfügbar (Gegenprobe)', ruOffline === 'fehlt', ruOffline);

await page.selectOption('#deckSelect', 'basic-el');
await page.waitForTimeout(600);
const cards = await page.evaluate(async () =>
  (await (await import('/core/state.js')).loadDeck('basic-el'))?.cards?.length || 0);
check('Gesichertes Deck lädt offline vollständig', cards === 753, String(cards));

await page.evaluate(() => document.querySelector('.mode-btn[data-mode="course"]')?.click());
await page.waitForTimeout(200);
await page.evaluate(() => document.getElementById('startBtn').click());
await page.waitForTimeout(900);

const seen = new Set();
let state = null;
for (let i = 0; i < 220 && state !== 'done' && state !== 'gone'; i++) {
  const phase = await page.evaluate(async () => {
    if (document.getElementById('gramNext')) return 'grammar';
    return (await import('/core/state.js')).getCurrentSession()?.phase || 'end';
  });
  seen.add(phase);
  state = await page.evaluate(courseStepFn);
  await page.waitForTimeout(120);
}
const PHASES = ['grammar', 'drill', 'teach', 'listen', 'words', 'match', 'speak', 'write', 'talk', 'dialog', 'hearing'];
const missingPhases = PHASES.filter(p => !seen.has(p));
check('Vollständige Lektion offline durchgespielt',
  state === 'done' && missingPhases.length === 0,
  `state=${state} fehlend=${missingPhases.join(',') || '—'}`);

// Nach der Lektion sichert sich das aktive Deck von selbst.
const auto = await page.evaluate(async () =>
  (await import('/core/offline.js')).isDeckSaved('basic-el'));
check('Aktives Deck bleibt nach der Lektion gesichert', auto);

// Zurück im Netz: das automatische Sichern greift auch für ein Deck,
// das nur durchgespielt und nie angehakt wurde.
server = spawn('python3', ['-m', 'http.server', String(PORT)], { stdio: 'ignore' });
await new Promise(r => setTimeout(r, 1200));
await ctx.setOffline(false);
await page.evaluate(() => document.getElementById('sessionBackBtn')?.click());
await page.waitForTimeout(200);
await page.selectOption('#deckSelect', 'basic-ru');
await page.waitForTimeout(600);
// Der Ladeversuch von eben ist offline gescheitert — er darf das Deck
// nicht dauerhaft blockieren, sobald das Netz zurück ist.
const retryRu = await page.evaluate(async () =>
  (await (await import('/core/state.js')).loadDeck('basic-ru'))?.cards?.length || 0);
check('Offline gescheitertes Deck lädt später neu (kein blockiertes Versprechen)',
  retryRu === 728, String(retryRu));

const autoRu = await page.evaluate(async () => {
  const s = await import('/core/session.js');
  const st = await import('/core/state.js');
  await st.loadDeck('basic-ru');
  await s.startErrorReviewByFronts('basic-ru', ['Haus']);
  document.getElementById('sessionBackBtn')?.click();
  await new Promise(r => setTimeout(r, 400));
  return (await import('/core/offline.js')).isDeckSaved('basic-ru');
});
check('Gelerntes Deck sichert sich nach der Session automatisch', autoRu);

check('keine JS-Fehler', errs.length === 0, errs.slice(0, 3).join('; '));
await ctx.close();
await browser.close();
await stopServer();
console.log(`\n${failures === 0 ? '🎉 OFFLINE-GARANTIE OK' : `❌ ${failures} Fehler`}`);
process.exit(failures === 0 ? 0 : 1);
