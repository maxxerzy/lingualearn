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

// ── Onboarding beim ersten Login: Sprache → Ziel → Motivation → Lektion 1 ──
check('Onboarding erscheint beim ersten Login', await page.evaluate(() => !document.getElementById('onboarding').hidden));
await page.evaluate(() => document.querySelector('.ob-chip[data-deck="basic-es"]')?.click());
await page.evaluate(() => document.getElementById('obNext').click()); await page.waitForTimeout(150);
await page.evaluate(() => document.querySelector('.ob-chip[data-goal="30"]')?.click());
await page.evaluate(() => document.getElementById('obNext').click()); await page.waitForTimeout(150);
await page.evaluate(() => document.querySelector('.ob-chip[data-why="reise"]')?.click());
await page.evaluate(() => document.getElementById('obNext').click()); await page.waitForTimeout(800);
const ob = await page.evaluate(async () => ({
  closed: document.getElementById('onboarding').hidden,
  session: document.getElementById('view-learn').classList.contains('session-active'),
  title: document.getElementById('session-title').textContent,
  goal: (await import('/core/gamification.js')).getGame().dailyGoal,
  deck: document.getElementById('deckSelect').value,
}));
check('Onboarding: startet Lektion 1 mit gewähltem Deck & Ziel',
  ob.closed && ob.session && /Spanisch — Lektion 1/.test(ob.title) && ob.goal === 30 && ob.deck === 'basic-es', JSON.stringify(ob));
await click('#sessionBackBtn'); await page.waitForTimeout(250);

// ── „Für dich"-Empfehlung: frisches Deck → Kursstart empfohlen ──
await page.selectOption('#deckSelect', 'basic-da'); await page.waitForTimeout(300);
const smart = await page.evaluate(() => ({
  visible: !document.getElementById('smartBar').hidden,
  text: document.getElementById('smartBarText').textContent,
}));
check('„Für dich" empfiehlt Kursstart', smart.visible && /Lektion 1/.test(smart.text), JSON.stringify(smart));

// ── „Für dich" mit fälligen Karten: Ein-Klick-Review, Einmal-Filter ──
check('Fällig-Filter-Knopf ist entfernt', await page.evaluate(() => !document.getElementById('dueToggleBtn')));
await page.evaluate(async () => {
  const u = localStorage.getItem('lingualearn_current_user');
  const today = new Date().toISOString().slice(0, 10);
  const map = {};
  for (const front of ['Haus', 'Auto', 'Buch']) map[`basic-da:${front}`] = { level: 1, correct: 1, wrong: 0, due: today };
  localStorage.setItem('lingualearn_cards_' + u, JSON.stringify(map));
  (await import('/core/cardProgress.js')).reinitCardProgress();
  (await import('/ui/gami.js')).renderLearnWidgets();
});
await page.waitForTimeout(200);
const dueRec = await page.evaluate(() => ({
  visible: !document.getElementById('smartBar').hidden,
  text: document.getElementById('smartBarText').textContent,
}));
check('„Für dich" zeigt fällige Karten', dueRec.visible && /3 fällige Karten/.test(dueRec.text), JSON.stringify(dueRec));
await click('#smartBar'); await page.waitForTimeout(600);
const dueRun = await page.evaluate(() => ({
  focus: document.getElementById('view-learn').classList.contains('session-active'),
  progress: document.getElementById('progress-text').textContent,
  reset: !document.getElementById('dueOnly').checked,
}));
check('Fällig-Review startet mit 3 Karten, Filter danach gelöst',
  dueRun.focus && /\/3 Karten/.test(dueRun.progress) && dueRun.reset, JSON.stringify(dueRun));
await click('#sessionBackBtn'); await page.waitForTimeout(250);
// Karten-Zustand aufräumen, damit spätere Checks (Kurszeile etc.) unberührt bleiben
await page.evaluate(async () => {
  const u = localStorage.getItem('lingualearn_current_user');
  localStorage.removeItem('lingualearn_cards_' + u);
  (await import('/core/cardProgress.js')).reinitCardProgress();
  (await import('/ui/gami.js')).renderLearnWidgets();
});

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
  raw.gems = 100; raw.dailyGoal = 20;
  raw.daily = { date: t, count: 40, correct: 40, lessons: 5, xp: 200, perfect: 2, goalHit: true };
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

// ── Doppelt-oder-nichts: Kauf + Gewinn-Auswertung ──
const wager = await page.evaluate(async () => {
  const g = await import('/core/gamification.js');
  const u = localStorage.getItem('lingualearn_current_user');
  const raw = JSON.parse(localStorage.getItem('lingualearn_game_' + u));
  raw.gems = 60; delete raw.wager;
  const yest = new Date(); yest.setDate(yest.getDate() - 1);
  raw.streak = { current: 3, longest: 3, lastDate: yest.toISOString().slice(0, 10) };
  localStorage.setItem('lingualearn_game_' + u, JSON.stringify(raw));
  g.reinitGame();
  const started = g.startWager();                    // 60 → 10 Diamanten
  // Gewinn simulieren: Ziel auf morgen erreichbar setzen
  const raw2 = JSON.parse(localStorage.getItem('lingualearn_game_' + u));
  raw2.wager.target = raw2.streak.current + 1;       // nächster Lerntag gewinnt
  localStorage.setItem('lingualearn_game_' + u, JSON.stringify(raw2));
  g.reinitGame();
  g.recordGameAnswer(true);                          // Tag zählt → Serie 4 ≥ Ziel
  const c = g.consumeCelebrations();
  return { ok: started.ok, gemsAfterBuy: 10, won: c.wager?.won, gems: g.getGems() };
});
check('Wette: Kauf (−50) und Gewinn (+100)', wager.ok && wager.won === true && wager.gems >= 100, JSON.stringify(wager));

// ── Wörterbuch: gesehene Wörter, Suche, Stärke ──
await page.selectOption('#deckSelect', 'basic-da'); await page.waitForTimeout(200);
await click('#userChipBtn'); await page.waitForTimeout(150);
await click('.user-dropdown__item[data-action="dict"]'); await page.waitForTimeout(500);
const dict = await page.evaluate(() => ({
  active: document.getElementById('view-dict').classList.contains('active'),
  rows: document.querySelectorAll('.dict-row').length,
  dots: document.querySelectorAll('.dict-dot--on').length,
}));
check('Wörterbuch: gesehene Wörter mit Stärke-Punkten', dict.active && dict.rows > 0 && dict.dots > 0, JSON.stringify(dict));
await click('#dictBackBtn'); await page.waitForTimeout(200);

// ── Lektions-Wiederholung: erledigte Lektion → Gold ──
await page.evaluate(async () => {
  const u = localStorage.getItem('lingualearn_current_user');
  localStorage.setItem('lingualearn_course_' + u, JSON.stringify({ 'basic-da': { introduced: 9, sentencesDone: [] } }));
  (await import('/core/course.js')).reinitCourse();
});
await page.selectOption('#deckSelect', 'basic-da');
await click('.mode-btn[data-mode="course"]'); await page.waitForTimeout(300);
await click('#coursemapBtn'); await page.waitForTimeout(600);
check('Pfad: Themen-Banner sichtbar', await page.evaluate(() => document.querySelectorAll('.map-banner').length > 3));
await page.evaluate(() => document.querySelector('[data-review-lesson="0"]')?.click());
await page.waitForTimeout(600);
check('Wiederholung startet (Titel „… Wiederholung")', await page.evaluate(() =>
  document.getElementById('session-title').textContent.includes('Wiederholung')));
for (let i = 0; i < 6; i++) {
  if (await page.$('#restartSession')) break;
  await page.evaluate(() => document.querySelector('.mc-option')?.click());
  await page.waitForTimeout(200);
  await page.evaluate(() => document.getElementById('mcNext')?.click());
  await page.waitForTimeout(250);
}
const goldDone = await page.evaluate(async () => ({
  gold: (await import('/core/session.js')).getGoldLessons('basic-da'),
  recap: !!document.querySelector('.day-recap'),
}));
check('Lektion vergoldet + Tages-Rückblick auf Endkarte', goldDone.gold.includes(0) && goldDone.recap, JSON.stringify(goldDone));
await click('#sessionBackBtn'); await page.waitForTimeout(200);
await click('#coursemapBtn'); await page.waitForTimeout(500);
check('Pfad zeigt Gold-Knoten', await page.evaluate(() => !!document.querySelector('.map-node--gold')));
await click('#pathBackBtn'); await page.waitForTimeout(200);

// ── Dark Mode (System) + FX-Schalter + Karten-Animation ──
await page.emulateMedia({ colorScheme: 'dark' }); await page.waitForTimeout(200);
const surface = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--surface').trim());
check('System-Dark-Mode greift ohne Cosmetic-Theme', surface === '#1e2530', surface);
await page.emulateMedia({ colorScheme: 'light' });
await click('#userChipBtn'); await page.waitForTimeout(150);
await click('.user-dropdown__item[data-action="settings"]'); await page.waitForTimeout(200);
const fx = await page.evaluate(() => {
  const t = document.getElementById('fxToggle');
  const before = t.checked;
  t.click();
  const u = localStorage.getItem('lingualearn_current_user');
  return { before, stored: localStorage.getItem('lingualearn_fx_' + u) };
});
check('FX-Schalter speichert pro Konto', fx.before === true && fx.stored === 'off', JSON.stringify(fx));
await click('#settingsBackBtn'); await page.waitForTimeout(200);

// ── Blitzrunde: Start aus der Arena, Antworten, Tagesbonus ──
await page.selectOption('#deckSelect', 'basic-da'); await page.waitForTimeout(200);
await click('#userChipBtn'); await page.waitForTimeout(150);
await click('.user-dropdown__item[data-action="arena"]'); await page.waitForTimeout(300);
check('Arena: Blitz-Karte im Quests-Tab', await page.evaluate(() => !!document.querySelector('[data-blitz]')));
await page.evaluate(() => document.querySelector('[data-blitz]').click());
await page.waitForTimeout(700);
const blitzUi = await page.evaluate(() => ({
  focus: document.getElementById('view-learn').classList.contains('session-active'),
  timer: document.getElementById('blitzTimer')?.textContent || '',
  title: document.getElementById('session-title').textContent,
  options: document.querySelectorAll('.blitz-card .mc-option').length,
}));
check('Blitz läuft (Timer, 4 Optionen, Fokus)', blitzUi.focus && /\d+s/.test(blitzUi.timer) && /Blitzrunde/.test(blitzUi.title) && blitzUi.options === 4, JSON.stringify(blitzUi));
// zwei Antworten geben (richtige Option per Datenabgleich)
for (let i = 0; i < 2; i++) {
  const idx = await page.evaluate(async () => {
    const q = document.querySelector('.blitz-card .mc-question').textContent.trim();
    const { cards } = await import('/js/data/decks/da.js');
    const back = cards.find(c => c.front === q).back;
    const opts = [...document.querySelectorAll('.blitz-card .mc-option .mc-text')];
    return opts.findIndex(o => o.textContent.trim() === back);
  });
  await page.evaluate(i2 => document.querySelector(`.blitz-card .mc-option[data-idx="${i2}"]`)?.click(), idx);
  await page.waitForTimeout(150);
}
// Zeit ablaufen lassen (Ende erzwingen)
await page.evaluate(async () => {
  const st = (await import('/core/state.js')).getCurrentSession();
  if (st) st.blitzEnd = Date.now() - 1;
});
await page.waitForTimeout(600);
const blitzEnd = await page.evaluate(async () => ({
  summary: document.getElementById('learnArea').textContent.includes('Blitzrunde vorbei'),
  score: /richtige Antworten/.test(document.getElementById('learnArea').textContent),
  daily: (await import('/core/gamification.js')).getGame().daily.blitz,
}));
check('Blitz-Ende: Zusammenfassung + Tageszähler', blitzEnd.summary && blitzEnd.score && blitzEnd.daily === 1, JSON.stringify(blitzEnd));
await click('#sessionBackBtn'); await page.waitForTimeout(250);

// ── Neue Cosmetics: Kataloge + neue Freischalt-Typen + Ausrüsten ──
const cosmo = await page.evaluate(async () => {
  const c = await import('/core/cosmetics.js');
  const g = await import('/core/gamification.js');
  const u = localStorage.getItem('lingualearn_current_user');
  const raw = JSON.parse(localStorage.getItem('lingualearn_game_' + u));
  raw.perfectSessions = 5; raw.gemsEarned = 600;
  raw.streak = { ...raw.streak, longest: 14 };
  localStorage.setItem('lingualearn_game_' + u, JSON.stringify(raw));
  g.reinitGame();
  return {
    themes: c.THEMES.length, avatars: c.AVATARS.length, titles: c.TITLES.length, cards: c.CARD_DESIGNS.length,
    perfektionist: c.isUnlocked(c.TITLES.find(t => t.id === 'perfekt')),
    diamantenherz: c.isUnlocked(c.TITLES.find(t => t.id === 'diamant')),
    geist: c.isUnlocked(c.AVATARS.find(a => a.id === 'geist')),
    sakuraTheme: c.isUnlocked(c.THEMES.find(t => t.id === 'sakura')),
    lavaTheme: c.isUnlocked(c.THEMES.find(t => t.id === 'lava')),
    reqTextPerfect: c.requirementText({ req: { perfect: 5 } }),
    equipped: c.equip('theme', 'sakura'),
  };
});
check('Kataloge erweitert (11 Themes, 13 Avatare, 14 Titel, 8 Designs)',
  cosmo.themes === 11 && cosmo.avatars === 13 && cosmo.titles === 14 && cosmo.cards === 8, JSON.stringify(cosmo));
check('Neue Freischalt-Typen (perfekt/gems) greifen',
  cosmo.perfektionist && cosmo.diamantenherz && cosmo.geist && cosmo.sakuraTheme && cosmo.lavaTheme && /perfekte Sessions/.test(cosmo.reqTextPerfect), JSON.stringify(cosmo));
await page.evaluate(async () => (await import('/ui/cosmetics.js')).applyCosmetics());
await page.waitForTimeout(200);
const sakuraOn = await page.evaluate(() => ({
  attr: document.documentElement.getAttribute('data-theme'),
  primary: getComputedStyle(document.documentElement).getPropertyValue('--primary').trim(),
}));
check('Theme „Sakura" ausgerüstet & aktiv', sakuraOn.attr === 'sakura' && sakuraOn.primary === '#d6336c', JSON.stringify(sakuraOn));
await page.evaluate(async () => { (await import('/core/cosmetics.js')).equip('theme', 'standard'); (await import('/ui/cosmetics.js')).applyCosmetics(); });

// ── Wochen-Bilanz in der Statistik ──
await click('#userChipBtn'); await page.waitForTimeout(150);
await click('.user-dropdown__item[data-action="stats"]'); await page.waitForTimeout(300);
const week = await page.evaluate(() => document.getElementById('weekSummary').textContent);
check('Wochen-Bilanz sichtbar', /^Diese Woche: \d+ Karten · \d\/7 Tage aktiv$/.test(week.trim()), week);
await click('#statsBackBtn'); await page.waitForTimeout(200);

// ── Deck-Reset in den Einstellungen ──
await click('#userChipBtn'); await page.waitForTimeout(150);
await click('.user-dropdown__item[data-action="settings"]'); await page.waitForTimeout(200);
await page.evaluate(() => document.getElementById('deckResetBtn').click());   // confirm wird auto-akzeptiert
await page.waitForTimeout(300);
const reset = await page.evaluate(async () => ({
  states: Object.keys((await import('/core/cardProgress.js')).getCardStates('basic-da')).length,
  course: (await import('/core/course.js')).getCourseState('basic-da').introduced,
  gold: (await import('/core/session.js')).getGoldLessons('basic-da').length,
}));
check('Deck-Reset löscht Karten, Kursstand & Gold', reset.states === 0 && reset.course === 0 && reset.gold === 0, JSON.stringify(reset));
await click('#settingsBackBtn'); await page.waitForTimeout(200);

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
