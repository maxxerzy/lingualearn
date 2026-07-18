import { chromium, devices } from '/opt/node22/lib/node_modules/playwright/index.mjs';

// Kompakte Funktions-Regression: Kernfeatures quer durch die App (iPhone 14).
const BASE = 'http://127.0.0.1:4173';
const SHOT = '/tmp';
let failures = 0;
const check = (n, c, d = '') => { console.log(`${c ? '✅' : '❌'} ${n}${d ? ' — ' + d : ''}`); if (!c) failures++; };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const ctx = await browser.newContext({ ...devices['iPhone 14'] });
const page = await ctx.newPage();
const errs = []; page.on('pageerror', e => errs.push(e.message));
page.on('dialog', d => d.accept());
const click = sel => page.evaluate(s => document.querySelector(s)?.click(), sel);

await page.goto(BASE + '/index.html', { waitUntil: 'networkidle' });
await page.click('#tabRegister');
await page.fill('#loginUsername', 'smoke1'); await page.fill('#loginPassword', 'test1234');
await page.click('#loginBtn');
await page.waitForSelector('#app:not([hidden])');
await page.selectOption('#deckSelect', 'basic-da'); await page.waitForTimeout(300);

// ── Fällig-Schalter: an → Ring bleibt; aus → sofort weg ──
await click('#dueToggleBtn'); await page.waitForTimeout(150);
const on = await page.evaluate(() => ({ a: document.getElementById('dueToggleBtn').classList.contains('active'), c: document.getElementById('dueOnly').checked }));
await click('#dueToggleBtn'); await page.waitForTimeout(150);
const off = await page.evaluate(() => ({ a: document.getElementById('dueToggleBtn').classList.contains('active'), c: document.getElementById('dueOnly').checked, sh: getComputedStyle(document.getElementById('dueToggleBtn')).boxShadow }));
check('Fällig-Schalter an/aus (Ring sofort weg)', on.a && on.c && !off.a && !off.c && off.sh === 'none', JSON.stringify({ on, off }));

// ── WOTD-Overlay ──
await click('#wotdBtn'); await page.waitForTimeout(300);
const wotd = await page.evaluate(() => !document.getElementById('wotdModal').hidden && !!document.querySelector('#wotdModal .wotd__word'));
await click('#wotdModal .modal__close'); await page.waitForTimeout(150);
check('Wort des Tages öffnet/schließt', wotd && await page.evaluate(() => document.getElementById('wotdModal').hidden));

// ── Thematische Kurszeile ──
await click('.mode-btn[data-mode="course"]'); await page.waitForTimeout(600);
const line = (await page.textContent('#courseProgressText')).trim();
check('Kurszeile „Lektion 1 · Redewendungen 1 · 0/754 Wörter"', /^Lektion 1 · Redewendungen 1 · 0\/754 Wörter$/.test(line), line);

// ── Lernpfad: Tipp auf aktuelle Lektion startet Kurs ──
await click('#coursemapBtn'); await page.waitForTimeout(500);
await page.evaluate(() => document.querySelector('[data-start-lesson]')?.click());
await page.waitForTimeout(700);
const started = await page.evaluate(() => ({
  learn: document.getElementById('view-learn').classList.contains('active'),
  focus: document.getElementById('view-learn').classList.contains('session-active'),
  title: document.getElementById('session-title').textContent,
}));
check('Pfad → Lektion startet im Fokus', started.learn && started.focus && /Lektion 1/.test(started.title), JSON.stringify(started));
await click('#sessionBackBtn'); await page.waitForTimeout(250);

// ── Tippen: tolerant richtig / Aufdecken falsch ──
await click('.mode-btn[data-mode="typing"]'); await click('#startBtn'); await page.waitForTimeout(500);
const back1 = await page.evaluate(async () => {
  const front = document.querySelector('.typing-card .fc-word').textContent.trim();
  const { cards } = await import('/js/data/decks/da.js');
  return cards.find(c => c.front === front).back;
});
await page.fill('#typingInput', back1.toUpperCase() + '.');
await click('#typingCheck'); await page.waitForTimeout(250);
check('Tippen: tolerante Prüfung → richtig', await page.evaluate(() => !!document.querySelector('#mc-fb .correct')));
await click('#mcNext'); await page.waitForTimeout(250);
await click('#typingReveal'); await page.waitForTimeout(250);
check('Tippen: Aufdecken zählt als falsch', await page.evaluate(() => !!document.querySelector('#mc-fb .incorrect')));
await click('#sessionBackBtn'); await page.waitForTimeout(250);

// ── Satzbau: Karte 1 Text, Karte 2 nach Gehör ──
await click('.mode-btn[data-mode="build"]'); await click('#startBtn'); await page.waitForTimeout(500);
const n1 = await page.evaluate(() => document.querySelectorAll('.build-pool .build-tile').length);
for (let k = 0; k < n1; k++) await page.evaluate(kk => document.querySelector(`.build-pool .build-tile[data-i="${kk}"]`)?.click(), k);
await click('#buildCheck'); await page.waitForTimeout(200);
const b1ok = await page.evaluate(() => !!document.querySelector('#mc-fb .correct'));
await click('#mcNext'); await page.waitForTimeout(300);
const byEar = await page.evaluate(() => !!document.getElementById('buildPlay') && !document.querySelector('.build-src'));
check('Satzbau: Karte 1 richtig, Karte 2 = Hör-Variante', b1ok && byEar, JSON.stringify({ b1ok, byEar }));
await click('#sessionBackBtn'); await page.waitForTimeout(250);

// ── Story: richtige Bedeutung unter 4 Optionen ──
await click('.mode-btn[data-mode="story"]'); await click('#startBtn'); await page.waitForTimeout(500);
const story = await page.evaluate(async () => {
  const sent = document.querySelector('.story-sent')?.textContent.trim().replace(/\s+/g, ' ') || '';
  const { cards } = await import('/js/data/decks/da.js');
  const card = cards.find(c => c.example && sent.startsWith(c.example.slice(0, 20)));
  const opts = [...document.querySelectorAll('.mc-option .mc-text')].map(e => e.textContent.trim());
  return { n: opts.length, hit: card ? opts.includes(card.exampleDE) : false };
});
check('Story: 4 Optionen inkl. richtiger Bedeutung', story.n === 4 && story.hit, JSON.stringify(story));
await click('#sessionBackBtn'); await page.waitForTimeout(250);

// ── Arena: Quests/Liga/Shop + Kauf + Abholen ──
await page.evaluate(async () => {
  const u = localStorage.getItem('lingualearn_current_user');
  const raw = JSON.parse(localStorage.getItem('lingualearn_game_' + u));
  const t = new Date().toISOString().slice(0, 10);
  raw.gems = 100; raw.daily = { date: t, count: 40, correct: 40, lessons: 5, xp: 200, perfect: 2, goalHit: true };
  localStorage.setItem('lingualearn_game_' + u, JSON.stringify(raw));
  (await import('/core/gamification.js')).reinitGame();
});
await click('#userChipBtn'); await page.waitForTimeout(150);
await click('.user-dropdown__item[data-action="arena"]'); await page.waitForTimeout(300);
check('Arena: 3 Quests erfüllt → Abholen-Buttons', await page.evaluate(() => document.querySelectorAll('#arenaBody [data-claim]').length) === 3);
const gemsA = await page.evaluate(() => Number(document.getElementById('gemCount').textContent));
await page.evaluate(() => document.querySelector('#arenaBody [data-claim]')?.click()); await page.waitForTimeout(250);
const gemsB = await page.evaluate(() => Number(document.getElementById('gemCount').textContent));
check('Quest abholen erhöht Diamanten', gemsB > gemsA, `${gemsA}→${gemsB}`);
await click('.arena-tab[data-tab="league"]'); await page.waitForTimeout(200);
check('Liga: 10 Zeilen inkl. „Du"', await page.evaluate(() => document.querySelectorAll('.lg-row').length === 10 && !!document.querySelector('.lg-row--you')));
await click('.arena-tab[data-tab="shop"]'); await page.waitForTimeout(200);
await page.evaluate(() => document.querySelector('[data-buy="streakFreeze"]')?.click()); await page.waitForTimeout(250);
check('Shop-Kauf zieht Diamanten ab', await page.evaluate(async () => (await import('/core/gamification.js')).getInventory().streakFreeze === 1));
await click('#arenaBackBtn'); await page.waitForTimeout(200);
check('Arena-Zurück funktioniert', await page.evaluate(() => document.getElementById('view-learn').classList.contains('active')));

// ── Tagesziel übererfüllt: (N/M) + Häkchen ──
await page.reload({ waitUntil: 'networkidle' }); await page.waitForTimeout(500);
const goal = await page.evaluate(() => ({
  t: document.getElementById('dailyGoalText').textContent.trim(),
  c: !document.getElementById('dailyGoalCheck').hidden,
}));
check('Tagesziel übererfüllt: Klammern + Häkchen', /^\(\d+\/20\)$/.test(goal.t) && goal.c, JSON.stringify(goal));

// ── Truhe + Level-Up (Kern-APIs) ──
const cele = await page.evaluate(async () => {
  const u = localStorage.getItem('lingualearn_current_user');
  const raw = JSON.parse(localStorage.getItem('lingualearn_game_' + u));
  const yest = new Date(); yest.setDate(yest.getDate() - 1);
  raw.streak = { current: 6, longest: 6, lastDate: yest.toISOString().slice(0, 10) };
  raw.chests = { 3: 'x' }; raw.xp = 95; raw.gems = 0;
  localStorage.setItem('lingualearn_game_' + u, JSON.stringify(raw));
  const g = await import('/core/gamification.js'); g.reinitGame();
  g.recordGameAnswer(true);
  const c = g.consumeCelebrations();
  return { chest: c.chest?.days, chestGems: c.chest?.gems, level: c.levelUp, gems: g.getGems() };
});
check('7-Tage-Truhe (+30) & Level-Up (+10) zusammen', cele.chest === 7 && cele.chestGems === 30 && cele.level === 2 && cele.gems === 40, JSON.stringify(cele));

// ── Fehler-Training (kleines MC-Deck, 1 Fehler) ──
const deck = { name: 'SmokeDeck', language: 'fr', cards: [
  { front: 'Haus', back: 'maison' }, { front: 'Hund', back: 'chien' },
  { front: 'Katze', back: 'chat' }, { front: 'Buch', back: 'livre' }, { front: 'Wasser', back: 'eau' },
]};
const f = SHOT + '/smoke_deck.json';
(await import('node:fs')).writeFileSync(f, JSON.stringify(deck));
const F2B = Object.fromEntries(deck.cards.map(c => [c.front, c.back]));
await click('#userChipBtn'); await page.waitForTimeout(150);
await click('.user-dropdown__item[data-action="settings"]'); await page.waitForTimeout(200);
await page.setInputFiles('#importFile', f);
await click('#importBtn'); await page.waitForTimeout(400);
await click('#settingsBackBtn'); await page.waitForTimeout(200);
const dId = await page.$$eval('#deckSelect option', os => os.find(o => o.textContent.includes('SmokeDeck'))?.value);
await page.selectOption('#deckSelect', dId);
await click('.mode-btn[data-mode="multiplechoice"]'); await click('#startBtn'); await page.waitForTimeout(400);
let wrongDone = false;
for (let i = 0; i < 5; i++) {
  const front = await page.evaluate(() => document.querySelector('.mc-question')?.textContent.trim());
  if (!front) break;
  const idx = await page.evaluate(({ back, wrong }) => {
    const opts = [...document.querySelectorAll('.mc-option')];
    const t = wrong ? opts.find(o => !o.textContent.includes(back)) : opts.find(o => o.textContent.includes(back));
    return opts.indexOf(t);
  }, { back: F2B[front], wrong: !wrongDone });
  wrongDone = true;
  await page.evaluate(i2 => document.querySelector(`.mc-option[data-idx="${i2}"]`)?.click(), idx);
  await page.waitForTimeout(200);
  await page.evaluate(() => document.getElementById('mcNext')?.click());
  await page.waitForTimeout(250);
}
check('„Fehler üben (1)" nach Session', await page.evaluate(() => /\(1\)/.test(document.getElementById('reviewErrorsBtn')?.textContent || '')));
await page.evaluate(() => document.getElementById('reviewErrorsBtn')?.click()); await page.waitForTimeout(400);
check('Fehler-Training startet', await page.evaluate(() => document.getElementById('session-title').textContent.includes('Fehler-Training')));
await click('#sessionBackBtn'); await page.waitForTimeout(200);

// ── Update-Logout: Konto bleibt, Sitzung endet ──
await page.evaluate(() => localStorage.setItem('lingualearn_app_version', 'alt-0'));
await page.reload({ waitUntil: 'networkidle' }); await page.waitForTimeout(400);
const upd = await page.evaluate(() => ({
  out: localStorage.getItem('lingualearn_current_user') === null,
  kept: (localStorage.getItem('lingualearn_users') || '').includes('smoke1'),
  login: !document.getElementById('login-screen').hidden,
}));
check('Update-Logout: ausgeloggt, Konto bleibt', upd.out && upd.kept && upd.login, JSON.stringify(upd));

check('keine JS-Fehler', errs.length === 0, errs.slice(0, 3).join('; '));
await ctx.close();
await browser.close();
console.log(`\n${failures === 0 ? '🎉 ALLE SMOKE-CHECKS BESTANDEN' : `❌ ${failures} Fehler`}`);
process.exit(failures === 0 ? 0 : 1);
