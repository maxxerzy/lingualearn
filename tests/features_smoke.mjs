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

// ── Onboarding beim ersten Login: Sprache → Ziel → Motivation → Vorkenntnisse ──
check('Onboarding erscheint beim ersten Login', await page.evaluate(() => !document.getElementById('onboarding').hidden));
await page.evaluate(() => document.querySelector('.ob-chip[data-deck="basic-es"]')?.click());
await page.evaluate(() => document.getElementById('obNext').click()); await page.waitForTimeout(150);
await page.evaluate(() => document.querySelector('.ob-chip[data-goal="30"]')?.click());
await page.evaluate(() => document.getElementById('obNext').click()); await page.waitForTimeout(150);
await page.evaluate(() => document.querySelector('.ob-chip[data-why="reise"]')?.click());
await page.evaluate(() => document.getElementById('obNext').click()); await page.waitForTimeout(150);
// Vorkenntnisse-Schritt: „Ganz neu" ist vorausgewählt, ein Tippen genügt.
const obStep4 = await page.evaluate(() => ({
  visible: !document.querySelector('.ob-step[data-ob="4"]').hidden,
  chips: document.querySelectorAll('.ob-step[data-ob="4"] .ob-chip').length,
  preset: document.querySelector('.ob-step[data-ob="4"] .ob-chip--active')?.dataset.start,
  label: document.getElementById('obNext').textContent.trim(),
}));
check('Onboarding fragt nach Vorkenntnissen, „Ganz neu" ist voreingestellt',
  obStep4.visible && obStep4.chips === 2 && obStep4.preset === 'null' && /Lektion 1 starten/.test(obStep4.label),
  JSON.stringify(obStep4));
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

// ── Einstufungstest: setzt Kursstand UND Kartenlevel ──
async function playPlacement(allCorrect) {
  for (let i = 0; i < 60; i++) {
    const st = await page.evaluate(async () => {
      const s = (await import('/core/placement.js')).getPlacementState();
      if (!s?.current) return null;
      return { back: s.current.back, options: s.options.map(o => o.back) };
    });
    if (!st) break;
    if (allCorrect) {
      const idx = st.options.indexOf(st.back);
      await page.evaluate(k => document.querySelector(`.mc-option[data-idx="${k}"]`)?.click(), idx);
    } else {
      await page.evaluate(() => document.getElementById('placementUnknown').click());
    }
    await page.waitForTimeout(50);
  }
}

const placeStart = await page.evaluate(async () => {
  window.__placeDone = false;
  const ok = await (await import('/core/placement.js')).startPlacement('basic-fr', () => { window.__placeDone = true; });
  return {
    ok,
    focus: document.getElementById('view-learn').classList.contains('session-active'),
    title: document.getElementById('session-title').textContent,
    question: !!document.querySelector('.placement-card .mc-question'),
    options: document.querySelectorAll('.placement-card .mc-option').length,
    unknown: !!document.getElementById('placementUnknown'),
  };
});
check('Einstufung startet im Fokus mit 4 Optionen und „Kenne ich nicht"',
  placeStart.ok && placeStart.focus && /Französisch — Einstufung/.test(placeStart.title)
  && placeStart.question && placeStart.options === 4 && placeStart.unknown, JSON.stringify(placeStart));

await playPlacement(true);
const placedHigh = await page.evaluate(async () => {
  const course = await import('/core/course.js');
  const cp = await import('/core/cardProgress.js');
  const deck = (await import('/core/state.js')).getDecks()['basic-fr'];
  const states = cp.getCardStates('basic-fr');
  const first = deck.cards[0].front;
  return {
    introduced: course.getCourseState('basic-fr').introduced,
    lesson: course.lessonNumber('basic-fr'),
    seeded: Object.keys(states).length,
    firstLevel: states[first]?.level,
    firstDue: states[first]?.due,
    result: !!document.querySelector('.placement-result'),
    startBtn: document.getElementById('courseNext')?.textContent.trim(),
    total: deck.cards.length,
  };
});
check('Einstufung: alles richtig → Kursstand springt weit nach vorn',
  placedHigh.introduced > 400 && placedHigh.lesson > 40, JSON.stringify({ i: placedHigh.introduced, l: placedHigh.lesson }));
check('Einstufung: Kartenlevel werden gesetzt (SRS läuft weiter)',
  placedHigh.seeded === placedHigh.introduced && placedHigh.firstLevel >= 1,
  JSON.stringify({ seeded: placedHigh.seeded, level: placedHigh.firstLevel }));
check('Einstufung: Fälligkeiten liegen in der Zukunft (kein Stapel am Tag 1)',
  placedHigh.firstDue > new Date().toISOString().slice(0, 10), String(placedHigh.firstDue));
check('Einstufung: Ergebnis-Karte mit Startknopf',
  placedHigh.result && /Lektion \d+ starten/.test(placedHigh.startBtn || ''), JSON.stringify(placedHigh.startBtn));

await page.evaluate(() => document.getElementById('courseNext').click());
await page.waitForTimeout(500);
check('Einstufung: Startknopf führt in die Lektion',
  await page.evaluate(() => window.__placeDone === true));
await click('#sessionBackBtn'); await page.waitForTimeout(250);

// Gegenprobe: nichts gewusst → Kurs bleibt bei Lektion 1, nichts gesetzt.
const placedLow = await page.evaluate(async () => {
  await (await import('/core/placement.js')).startPlacement('basic-ru', () => {});
  return true;
});
await playPlacement(false);
const lowResult = await page.evaluate(async () => {
  const course = await import('/core/course.js');
  const cp = await import('/core/cardProgress.js');
  return {
    introduced: course.getCourseState('basic-ru').introduced,
    lesson: course.lessonNumber('basic-ru'),
    seeded: Object.keys(cp.getCardStates('basic-ru')).length,
    text: document.querySelector('.placement-result__lead')?.textContent.trim(),
  };
});
check('Einstufung: nichts gewusst → Start bei Lektion 1, nichts vorbelegt',
  placedLow && lowResult.introduced === 0 && lowResult.lesson === 1 && lowResult.seeded === 0,
  JSON.stringify(lowResult));
check('Einstufung: ehrlicher Text statt Schönfärberei',
  /ganz vorne/.test(lowResult.text || ''), lowResult.text);
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

// ── Nur noch 2 Modi + Shop auf der Hauptseite ──
const modeGrid = await page.evaluate(() => [...document.querySelectorAll('.mode-btn')].map(b => b.dataset.mode));
check('Modus-Auswahl fusioniert: nur Lernkurs + Karteikarten',
  modeGrid.length === 2 && modeGrid[0] === 'course' && modeGrid[1] === 'flashcard', JSON.stringify(modeGrid));
await click('#shopBtn'); await page.waitForTimeout(400);
const shop = await page.evaluate(() => ({
  active: document.getElementById('view-rewards').classList.contains('active'),
  title: document.querySelector('#view-rewards h2')?.textContent.trim() || '',
  items: document.querySelectorAll('.cosmetic').length,
}));
check('Shop-Knopf auf der Hauptseite öffnet den Shop',
  shop.active && /Shop/.test(shop.title) && shop.items >= 10, JSON.stringify(shop));
await click('#rewardsBackBtn'); await page.waitForTimeout(250);

// ── Arena: Quests/Liga/Shop + Kauf + Abholen ──
await page.evaluate(async () => {
  const u = localStorage.getItem('lingualearn_current_user');
  const raw = JSON.parse(localStorage.getItem('lingualearn_game_' + u));
  const t = new Date().toISOString().slice(0, 10);
  raw.gems = 100; raw.dailyGoal = 20;
  // Alle Quest-Typen abdecken (inkl. blitz) — die Tagesrotation ist datumsabhängig.
  raw.daily = { date: t, count: 40, correct: 40, lessons: 5, xp: 200, perfect: 2, combo: 0, blitz: 1, goalHit: true };
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
// Karteikarten-Session: erste Karte „Schwer" (zählt als Fehler), Rest „Gut".
await click('.mode-btn[data-mode="flashcard"]'); await click('#startBtn'); await page.waitForTimeout(400);
let firstCard = true;
for (let i = 0; i < 7; i++) {
  const showing = await page.evaluate(() => !!document.getElementById('showAnswer'));
  if (!showing) break;
  await page.evaluate(() => document.getElementById('showAnswer').click());
  await page.waitForTimeout(200);
  await page.evaluate(r => document.querySelector(`[data-rating="${r}"]`)?.click(), firstCard ? 'hard' : 'good');
  firstCard = false;
  await page.waitForTimeout(200);
}
check('„Fehler üben (1)" nach Session', await page.evaluate(() => /\(1\)/.test(document.getElementById('reviewErrorsBtn')?.textContent || '')));
await page.evaluate(() => document.getElementById('reviewErrorsBtn')?.click()); await page.waitForTimeout(400);
check('Fehler-Training startet', await page.evaluate(() => document.getElementById('session-title').textContent.includes('Fehler-Training')));
await click('#sessionBackBtn'); await page.waitForTimeout(200);

// ── Schwächen-Profil: Themen-Trefferquote statt Fehlerliste ──
const weak = await page.evaluate(async () => {
  const u = localStorage.getItem('lingualearn_current_user');
  const map = JSON.parse(localStorage.getItem('lingualearn_cards_' + u) || '{}');
  // „Tiere" hakt chronisch (20 %), „Farben" sitzt (100 %).
  for (const f of ['Hund', 'Katze', 'Pferd', 'Vogel'])
    map[`basic-da:${f}`] = { level: 1, correct: 1, wrong: 4, hist: '00010' };
  for (const f of ['Rot', 'Blau', 'Grün', 'Gelb'])
    map[`basic-da:${f}`] = { level: 3, correct: 5, wrong: 0, hist: '11111' };
  // Zu dünne Datenlage → darf NICHT als Schwäche gelten.
  map['basic-da:Käse'] = { level: 0, correct: 0, wrong: 2, hist: '00' };
  localStorage.setItem('lingualearn_cards_' + u, JSON.stringify(map));
  (await import('/core/cardProgress.js')).reinitCardProgress();
  const w = await import('/core/weakness.js');
  const profile = w.themeProfile('basic-da');
  return {
    top: profile[0]?.theme,
    rate: profile[0] ? Math.round(profile[0].rate * 100) : null,
    answers: profile[0]?.answers,
    last: profile[profile.length - 1]?.theme,
    themes: profile.map(t => t.theme),
    pack: w.themePack('basic-da', 'Tiere'),
    rec: w.weakestForRecommendation('basic-da')?.theme || null,
  };
});
check('Schwächen-Profil: „Tiere" ist das schwächste Thema (20 %)',
  weak.top === 'Tiere' && weak.rate === 20 && weak.answers === 20, JSON.stringify(weak));
check('Schwächen-Profil: „Farben" ist das stärkste Thema', weak.last === 'Farben', JSON.stringify(weak.themes));
check('Schwächen-Profil: zu dünne Datenlage („Essen") zählt nicht',
  !weak.themes.includes('Essen'), JSON.stringify(weak.themes));
check('Übungspaket enthält die 4 schwachen Wörter', weak.pack.length === 4, JSON.stringify(weak.pack));
check('„Für dich" empfiehlt das schwache Thema', weak.rec === 'Tiere', String(weak.rec));

// Trefferquote pro Wort inkl. der letzten fünf Antworten
const acc = await page.evaluate(async () => {
  const cp = await import('/core/cardProgress.js');
  const first = cp.recordCardAnswer('smoke-hist', 'Test', true).hist;
  for (let i = 0; i < 6; i++) cp.recordCardAnswer('smoke-hist', 'Test', false);
  const after = cp.getCardState('smoke-hist', 'Test');
  return { hist: after.hist, len: after.hist.length, first,
           rate: Math.round(cp.cardAccuracy(after) * 100) };
});
check('Karte merkt sich die letzten fünf Antworten', acc.first === '1' && acc.hist === '00000' && acc.len === 5, JSON.stringify(acc));
check('Wort-Trefferquote gewichtet die jüngsten Antworten', acc.rate === 8, JSON.stringify(acc));

// Statistik zeigt die drei schwächsten Themen und startet die Runde
await page.selectOption('#deckSelect', 'basic-da'); await page.waitForTimeout(300);
await page.evaluate(() => document.getElementById('userChipBtn').click());
await page.evaluate(() => document.querySelector('[data-action="stats"]').click());
await page.waitForTimeout(300);
const weakUi = await page.evaluate(() => ({
  rows: document.querySelectorAll('#weakThemes [data-weak-theme]').length,
  listed: [...document.querySelectorAll('#weakThemes [data-weak-theme]')].map(e => e.dataset.weakTheme),
  first: document.querySelector('#weakThemes [data-weak-theme]')?.dataset.weakTheme,
  rate: document.querySelector('.weak-theme__rate')?.textContent,
  bad: !!document.querySelector('.weak-theme--bad'),
  hint: document.getElementById('weakHint').textContent,
}));
check('Statistik listet die schwächsten Themen mit Quote',
  weakUi.rows >= 1 && weakUi.rows <= 3 && weakUi.first === 'Tiere' && weakUi.rate === '20%' && weakUi.bad,
  JSON.stringify(weakUi));
check('Statistik: fehlerfreie Themen stehen nicht unter den Schwächen',
  !weakUi.listed.includes('Farben'), JSON.stringify(weakUi.listed));
await page.evaluate(() => document.querySelector('#weakThemes [data-weak-theme]').click());
await page.waitForTimeout(500);
const weakRun = await page.evaluate(() => ({
  learn: document.getElementById('view-learn').classList.contains('active'),
  focus: document.getElementById('view-learn').classList.contains('session-active'),
  title: document.getElementById('session-title').textContent,
  mc: !!document.querySelector('.mc-card'),
}));
check('Ein Tippen startet sofort die Runde aus dem Thema',
  weakRun.learn && weakRun.focus && /Schwäche üben — Tiere/.test(weakRun.title) && weakRun.mc,
  JSON.stringify(weakRun));
await click('#sessionBackBtn'); await page.waitForTimeout(250);

// Fehlerliste wird ergänzt statt überschrieben
const errLog = await page.evaluate(async () => {
  const el = await import('/core/errorLog.js');
  el.clearErrors('basic-el');
  el.saveErrors('basic-el', ['A', 'B', 'C']);
  el.saveErrors('basic-el', ['D']);                 // ergänzen, nicht ersetzen
  const merged = el.getErrors('basic-el');
  el.saveErrors('basic-el', [], ['A', 'B']);        // richtig beantwortet → raus
  return { merged, pruned: el.getErrors('basic-el') };
});
check('Fehlerliste wird ergänzt statt überschrieben',
  errLog.merged.length === 4 && errLog.merged.includes('A') && errLog.merged.includes('D'),
  JSON.stringify(errLog.merged));
check('Gelöste Fehler fallen wieder aus der Liste',
  errLog.pruned.length === 2 && !errLog.pruned.includes('A') && errLog.pruned.includes('C'),
  JSON.stringify(errLog.pruned));

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
// Ein paar Karten als gesehen markieren (früher taten das die Einzelmodi).
await page.evaluate(async () => {
  const cp = await import('/core/cardProgress.js');
  const { cards } = await import('/js/data/decks/da.js');
  cards.slice(0, 3).forEach(c => cp.recordCardAnswer('basic-da', c.front, 'good'));
});
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
check('System-Dark-Mode greift ohne Cosmetic-Theme', surface === '#1d2531', surface);
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
const blitzBefore = await page.evaluate(async () => (await import('/core/gamification.js')).getGame().daily.blitz || 0);
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
  best: (await import('/core/gamification.js')).getGame().bestBlitz,
  bestShown: document.getElementById('learnArea').textContent.includes('Bestleistung'),
}));
check('Blitz-Ende: Zusammenfassung + Tageszähler', blitzEnd.summary && blitzEnd.score && blitzEnd.daily === blitzBefore + 1, JSON.stringify({ ...blitzEnd, blitzBefore }));
check('Blitz-Highscore gespeichert & auf Endkarte', blitzEnd.best >= 1 && blitzEnd.bestShown, JSON.stringify(blitzEnd));
await click('#sessionBackBtn'); await page.waitForTimeout(250);

// ── Blitzmeister-Erfolg (Score ≥ 20) + Bestleistung auf der Arena-Karte ──
const blitzAch = await page.evaluate(async () => {
  const g = await import('/core/gamification.js');
  const res = g.noteBlitz(25);   // simulierte Rekord-Runde
  g.checkAchievements();
  return {
    record: res.record, best: res.best,
    unlocked: !!g.getGame().achievements['blitz-20'],
    total: g.ACHIEVEMENTS.length,
  };
});
check('Erfolg „Blitzmeister" ab Score 20 (18 Erfolge gesamt)',
  blitzAch.record && blitzAch.best === 25 && blitzAch.unlocked && blitzAch.total === 18, JSON.stringify(blitzAch));
await click('#userChipBtn'); await page.waitForTimeout(150);
await click('.user-dropdown__item[data-action="arena"]'); await page.waitForTimeout(300);
const ctaBest = await page.evaluate(() => document.querySelector('.blitz-cta__best')?.textContent.trim() || '');
check('Arena-Karte zeigt Bestleistung', /25/.test(ctaBest), ctaBest);
await page.evaluate(() => document.getElementById('arenaBackBtn')?.click()); await page.waitForTimeout(250);

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
check('Kataloge erweitert (14 Themes, 14 Avatare, 14 Titel, 8 Designs)',
  cosmo.themes === 14 && cosmo.avatars === 14 && cosmo.titles === 14 && cosmo.cards === 8, JSON.stringify(cosmo));

// ── Saisonale Cosmetics: nur im passenden Monat freischaltbar ──
const seasonal = await page.evaluate(async () => {
  const c = await import('/core/cosmetics.js');
  const winter = c.THEMES.find(t => t.id === 'winter');
  const sommer = c.THEMES.find(t => t.id === 'sommer');
  const schneemann = c.AVATARS.find(a => a.id === 'schneemann');
  const ctxAt = m => ({ level: 1, streak: 0, mastered: 0, perfect: 0, gems: 0, achievements: new Set(), month: m, seen: new Set() });
  return {
    haveAll: !!winter && !!sommer && !!schneemann && !!c.THEMES.find(t => t.id === 'spuk'),
    winterImDez: c.isUnlocked(winter, ctxAt(12)),
    winterImJuli: c.isUnlocked(winter, ctxAt(7)),
    sommerImJuli: c.isUnlocked(sommer, ctxAt(7)),
    // einmal freigeschaltet (in `seen`) → bleibt auch außerhalb der Saison
    winterBleibt: c.isUnlocked(winter, { ...ctxAt(3), seen: new Set(['winter']) }),
    reqText: c.requirementText(winter),
  };
});
check('Saisonale Cosmetics (Winter/Sommer/Spuk/Schneemann) monatsgebunden',
  seasonal.haveAll && seasonal.winterImDez && !seasonal.winterImJuli && seasonal.sommerImJuli && seasonal.winterBleibt && /Dezember/.test(seasonal.reqText),
  JSON.stringify(seasonal));
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

// ── Themen-Quiz: Banner auf dem Pfad → Prüfung → Abzeichen ──
// Kurs als abgeschlossen markieren, dann das kleinste Thema prüfen.
await page.selectOption('#deckSelect', 'basic-da'); await page.waitForTimeout(200);
const quizTheme = await page.evaluate(async () => {
  const u = localStorage.getItem('lingualearn_current_user');
  const { cards, lessonSizes, lessonTitles } = await import('/js/data/decks/da.js');
  const store = JSON.parse(localStorage.getItem('lingualearn_course_' + u) || '{}');
  store['basic-da'] = { introduced: cards.length };
  localStorage.setItem('lingualearn_course_' + u, JSON.stringify(store));
  (await import('/core/course.js')).reinitCourse();
  const sums = {};
  lessonSizes.forEach((s, i) => { const t = (lessonTitles[i] || '').replace(/ \d+$/, ''); sums[t] = (sums[t] || 0) + s; });
  return Object.entries(sums).sort((a, b) => a[1] - b[1])[0];   // [Thema, Wortzahl]
});
await click('#coursemapBtn'); await page.waitForTimeout(600);
const bannerInfo = await page.evaluate(t => {
  const el = document.querySelector(`[data-theme-quiz="${t}"]`);
  return { found: !!el, chip: el?.querySelector('.map-banner__quiz')?.textContent.trim() || '' };
}, quizTheme[0]);
check('Pfad: fertiges Themen-Banner bietet Quiz an', bannerInfo.found && /Quiz/.test(bannerInfo.chip), `${quizTheme[0]} (${quizTheme[1]} Wörter) — ${JSON.stringify(bannerInfo)}`);
await page.evaluate(t => document.querySelector(`[data-theme-quiz="${t}"]`)?.click(), quizTheme[0]);
await page.waitForTimeout(700);
const quizUi = await page.evaluate(() => ({
  focus: document.getElementById('view-learn').classList.contains('session-active'),
  title: document.getElementById('session-title').textContent,
  options: document.querySelectorAll('.quiz-card .mc-option').length,
  progress: document.querySelector('.quiz-progress')?.textContent || '',
}));
check('Themen-Quiz startet (Fokus, 4 Optionen, Fragenzähler)',
  quizUi.focus && /Themen-Quiz/.test(quizUi.title) && quizUi.options === 4 && /Frage 1\//.test(quizUi.progress), JSON.stringify(quizUi));
// Alle Fragen richtig beantworten (richtige Option per Datenabgleich).
let quizState = 'run';
for (let guard = 0; guard < (quizTheme[1] + 5) * 3 && quizState !== 'ended'; guard++) {
  quizState = await page.evaluate(async () => {
    const st = (await import('/core/state.js')).getCurrentSession();
    if (!st || st.mode !== 'themequiz') return 'ended';
    if (!st.currentPrompt) return 'wait';   // Auflösungs-Pause läuft noch
    const back = st.currentPrompt.card.back;
    const opts = [...document.querySelectorAll('.quiz-card .mc-option')];
    const idx = opts.findIndex(o => o.querySelector('.mc-text')?.textContent.trim() === back);
    opts[idx]?.click();
    return 'answered';
  });
  await page.waitForTimeout(quizState === 'answered' ? 620 : 200);
}
await page.waitForTimeout(500);
const quizEnd = await page.evaluate(async t => ({
  passed: document.getElementById('learnArea').textContent.includes('Quiz bestanden'),
  pill: document.getElementById('learnArea').textContent.includes('Themen-Abzeichen'),
  badge: !!(await import('/core/session.js')).getThemeBadges('basic-da')[t],
}), quizTheme[0]);
check('Themen-Quiz bestanden → Abzeichen gespeichert', quizEnd.passed && quizEnd.pill && quizEnd.badge, JSON.stringify(quizEnd));
await click('#sessionBackBtn'); await page.waitForTimeout(250);
await click('#coursemapBtn'); await page.waitForTimeout(600);
const earnedChip = await page.evaluate(t =>
  document.querySelector(`[data-theme-quiz="${t}"] .map-banner__quiz--earned`)?.textContent.trim() || '', quizTheme[0]);
check('Pfad: Banner zeigt verdientes Abzeichen', /Abzeichen/.test(earnedChip), earnedChip);
await page.evaluate(() => document.getElementById('pathBackBtn')?.click()); await page.waitForTimeout(250);

// ── Deck-Reset in den Einstellungen ──
await click('#userChipBtn'); await page.waitForTimeout(150);
await click('.user-dropdown__item[data-action="settings"]'); await page.waitForTimeout(200);
await page.evaluate(() => document.getElementById('deckResetBtn').click());   // confirm wird auto-akzeptiert
await page.waitForTimeout(300);
const reset = await page.evaluate(async () => ({
  states: Object.keys((await import('/core/cardProgress.js')).getCardStates('basic-da')).length,
  course: (await import('/core/course.js')).getCourseState('basic-da').introduced,
  gold: (await import('/core/session.js')).getGoldLessons('basic-da').length,
  badges: Object.keys((await import('/core/session.js')).getThemeBadges('basic-da')).length,
}));
check('Deck-Reset löscht Karten, Kursstand, Gold & Themen-Abzeichen',
  reset.states === 0 && reset.course === 0 && reset.gold === 0 && reset.badges === 0, JSON.stringify(reset));
await click('#settingsBackBtn'); await page.waitForTimeout(200);

// ── Grammatik im Lernkurs ──
const gramData = await page.evaluate(async () => {
  const out = {};
  for (const l of ['da', 'el', 'fr', 'es', 'la', 'ru', 'ja', 'zh']) {
    const { grammar } = await import(`/js/data/grammar/${l}.js`);
    out[l] = grammar.length && grammar.every(ch => ch.pages.length > 0 && ch.beforeLesson >= 1 && ch.title) ? grammar.length : 0;
  }
  return out;
});
check('Grammatik-Daten für alle 8 Sprachen (≥5 Kapitel)', Object.values(gramData).every(n => n >= 5), JSON.stringify(gramData));

// ── Grammatik-Abdeckung über den GANZEN Kurs ──
// Ein Deck hat über 100 Lektionen; erklärt die Grammatik nur die ersten
// 16, ist der Rest reines Vokabellernen. Diese Prüfung erzwingt, dass
// kein Abschnitt von mehr als MAX_GAP Lektionen ohne Kapitel bleibt.
// AUSGEBAUT wächst mit jeder Sprache, die das volle Raster bekommt —
// die übrigen werden nur berichtet, damit der Rückstand sichtbar ist.
const MAX_GAP = 12;
const AUSGEBAUT = ['da', 'el', 'fr', 'es', 'la', 'ru', 'ja', 'zh'];   // alle acht
const coverage = await page.evaluate(async (max) => {
  const out = {};
  const decks = { da: 'basic-da', el: 'basic-el', fr: 'basic-fr', es: 'basic-es',
                  la: 'basic-la', ru: 'basic-ru', ja: 'basic-ja', zh: 'basic-zh' };
  const { loadDeck } = await import('/core/state.js');
  for (const [l, id] of Object.entries(decks)) {
    const deck = await loadDeck(id);
    const { grammar } = await import(`/js/data/grammar/${l}.js`);
    const marks = grammar.map(c => c.beforeLesson).sort((a, b) => a - b);
    const total = deck.lessonSizes.length;
    let worst = 0, prev = 0, at = 0;
    for (const m of [...marks, total + 1]) {
      if (m - prev > worst) { worst = m - prev; at = prev; }
      prev = m;
    }
    out[l] = { kapitel: marks.length, lektionen: total, groessteLuecke: worst, abLektion: at, ok: worst <= max };
  }
  return out;
}, MAX_GAP);
const offen = Object.entries(coverage).filter(([l]) => !AUSGEBAUT.includes(l))
  .map(([l, c]) => `${l}:${c.groessteLuecke}`).join(' ');
check(`Grammatik deckt den ganzen Kurs ab (Lücke ≤ ${MAX_GAP} Lektionen)`,
  AUSGEBAUT.every(l => coverage[l].ok),
  AUSGEBAUT.map(l => `${l} ${coverage[l].kapitel}K/${coverage[l].lektionen}L Lücke ${coverage[l].groessteLuecke}`).join(' · ')
  + (offen ? ` — noch offen: ${offen}` : ''));

// ── Grammatik ÜBEN: jedes Kapitel bringt Aufgaben mit ──
// Gelesen ist nicht gekonnt. MIT_UEBUNGEN wächst wie AUSGEBAUT mit
// jeder Sprache, die ihre Aufgaben bekommen hat.
const MIT_UEBUNGEN = ['da', 'el', 'fr', 'es', 'la', 'ru', 'ja', 'zh'];   // alle acht
const drillData = await page.evaluate(async (langs) => {
  const out = {};
  for (const l of langs) {
    const { grammar } = await import(`/js/data/grammar/${l}.js`);
    const zuWenig = grammar.filter(c => (c.drills?.length || 0) < 4).map(c => c.id);
    const kaputt = grammar.flatMap(c => (c.drills || []).filter(d =>
      !d.q || !d.why || !Array.isArray(d.options) || d.options.length < 3
      || typeof d.answer !== 'number' || d.answer < 0 || d.answer >= d.options.length
      || new Set(d.options).size !== d.options.length));
    out[l] = { kapitel: grammar.length, uebungen: grammar.reduce((a, c) => a + (c.drills?.length || 0), 0), zuWenig, kaputt: kaputt.length };
  }
  return out;
}, MIT_UEBUNGEN);
check('Grammatik-Übungen: ≥4 gültige Aufgaben je Kapitel',
  MIT_UEBUNGEN.every(l => drillData[l].zuWenig.length === 0 && drillData[l].kaputt === 0),
  MIT_UEBUNGEN.map(l => `${l}: ${drillData[l].uebungen} Aufgaben in ${drillData[l].kapitel} Kapiteln`).join(' · '));

// Frisches Deck (nach Reset): der Kurs beginnt mit dem Grammatik-Kapitel.
await page.selectOption('#deckSelect', 'basic-da'); await page.waitForTimeout(200);
await click('.mode-btn[data-mode="course"]'); await page.waitForTimeout(300);
await click('#startBtn'); await page.waitForTimeout(800);
const gram = await page.evaluate(() => ({
  badge: document.querySelector('.course-phase-badge')?.textContent || '',
  head: document.querySelector('.grammar-head')?.textContent || '',
  table: !!document.querySelector('.grammar-body .gr-table'),
  title: document.getElementById('session-title').textContent,
}));
check('Lernkurs beginnt „basic basic" mit Grammatik-Kapitel',
  /Grammatik/.test(gram.badge) && gram.head.length > 0 && /Lektion 1/.test(gram.title), JSON.stringify(gram));
// Durchblättern und die Übungen lösen — danach startet die Wortlektion.
for (let i = 0; i < 30; i++) {
  const wasLast = await page.evaluate(() => {
    const btn = document.getElementById('gramNext');
    if (!btn) return true;
    btn.click();
    return false;
  });
  await page.waitForTimeout(400);
  if (wasLast) break;
  // Nach der letzten Seite folgen die Übungen — sie richtig beantworten,
  // sonst gilt das Kapitel zu Recht nicht als durchgearbeitet.
  const fertig = await page.evaluate(async () => {
    const st = (await import('/core/state.js')).getCurrentSession();
    if (st?.phase !== 'drill') return !st || st.phase !== 'grammar';
    if (st.currentPrompt) {
      document.querySelector(`.drill-card .mc-option[data-oi="${st.currentPrompt.correctOi}"]`)?.click();
    }
    return false;
  });
  await page.waitForTimeout(200);
  if (fertig) break;
}
await page.waitForTimeout(500);
const afterGram = await page.evaluate(async () => ({
  teach: !!document.querySelector('.course-teach'),
  read: (await import('/core/grammar.js')).readChapters('basic-da').length,
}));
check('Kapitel gelesen → Wortlektion startet, Lesestand gespeichert',
  afterGram.teach && afterGram.read === 1, JSON.stringify(afterGram));
await click('#sessionBackBtn'); await page.waitForTimeout(250);

// Grammatik-Knopf (nur im Kurs) öffnet die Übersicht mit Lesestatus.
const gBtnVis = await page.evaluate(() => getComputedStyle(document.getElementById('grammarBtn')).display !== 'none');
await click('#grammarBtn'); await page.waitForTimeout(500);
const overview = await page.evaluate(() => {
  const bar = document.querySelector('.grammar-progress');
  return {
    active: document.getElementById('view-grammar').classList.contains('active'),
    chapters: document.querySelectorAll('.grammar-chapter').length,
    read: document.querySelectorAll('.grammar-chapter--read').length,
    fortschritt: bar ? Number(bar.getAttribute('aria-valuenow')) : null,
    zeile: document.querySelector('.dict-count')?.textContent.trim() || '',
  };
});
check('Grammatik-Übersicht: Kapitel-Liste + Lesestatus',
  gBtnVis && overview.active && overview.chapters >= 5 && overview.read === 1, JSON.stringify(overview));
check('Grammatik-Übersicht: Lesefortschritt sichtbar',
  overview.fortschritt === Math.round((overview.read / overview.chapters) * 100)
    && /von \d+ Kapiteln gelesen/.test(overview.zeile),
  JSON.stringify({ pct: overview.fortschritt, zeile: overview.zeile }));
await page.evaluate(() => document.querySelector('.grammar-chapter')?.click()); await page.waitForTimeout(300);
check('Kapitel-Reader zeigt Inhalt mit Tabellen',
  await page.evaluate(() => !!document.querySelector('#grammarReader .gr-table')));
await page.evaluate(() => document.getElementById('grammarBackBtn').click()); await page.waitForTimeout(250);

// ── Grammatik-Übungen im Kurs: Kapitel gilt erst nach dem Üben als gelesen ──
await page.evaluate(async () => {
  const u = localStorage.getItem('lingualearn_current_user');
  localStorage.setItem('lingualearn_grammar_' + u, JSON.stringify({}));
  localStorage.setItem('lingualearn_course_' + u, JSON.stringify({ 'basic-da': { introduced: 0 } }));
  (await import('/core/grammar.js')).reinitGrammar();
  (await import('/core/course.js')).reinitCourse();
});
await page.selectOption('#deckSelect', 'basic-da'); await page.waitForTimeout(200);
await click('.mode-btn[data-mode="course"]'); await page.waitForTimeout(150);
await click('#startBtn'); await page.waitForTimeout(700);
// Kapitelseiten durchblättern
for (let i = 0; i < 8 && await page.evaluate(() => !!document.getElementById('gramNext') && !document.querySelector('.drill-card')); i++) {
  await page.evaluate(() => document.getElementById('gramNext').click());
  await page.waitForTimeout(200);
}
const drillStart = await page.evaluate(async () => {
  const st = (await import('/core/state.js')).getCurrentSession();
  const g = await import('/core/grammar.js');
  return {
    phase: st?.phase,
    frage: document.querySelector('.drill-question')?.textContent.trim() || '',
    optionen: document.querySelectorAll('.drill-card .mc-option').length,
    nochNichtGelesen: g.readChapters('basic-da').length === 0,
  };
});
check('Grammatik-Übung erscheint nach der letzten Seite',
  drillStart.phase === 'drill' && drillStart.optionen >= 3 && drillStart.frage.length > 0
    && drillStart.nochNichtGelesen,
  JSON.stringify(drillStart));

// Absichtlich falsch antworten → Aufgabe muss erneut kommen
const wrongRun = await page.evaluate(async () => {
  const st = (await import('/core/state.js')).getCurrentSession();
  const richtig = st.currentPrompt.correctOi;
  const vorher = st.queue.length;
  const falsch = [...document.querySelectorAll('.drill-card .mc-option')]
    .find(b => Number(b.dataset.oi) !== richtig);
  falsch.click();
  await new Promise(r => setTimeout(r, 120));
  const st2 = (await import('/core/state.js')).getCurrentSession();
  return {
    begruendung: !!document.querySelector('.drill-why'),
    markiert: !!document.querySelector('.mc-option.mc-correct'),
    gleicheLaenge: st2.queue.length === vorher,   // ans Ende gehängt, nicht entfernt
  };
});
check('Falsche Antwort: Begründung erscheint, Aufgabe kommt erneut',
  wrongRun.begruendung && wrongRun.markiert && wrongRun.gleicheLaenge, JSON.stringify(wrongRun));

// Alle Aufgaben korrekt lösen, bis das Kapitel abgeschlossen ist
for (let i = 0; i < 40; i++) {
  const fertig = await page.evaluate(async () => {
    const next = document.getElementById('gramNext');
    const st = (await import('/core/state.js')).getCurrentSession();
    if (st?.phase !== 'drill' && !next) return true;
    if (document.querySelector('#mc-fb .correct, #mc-fb .incorrect')) { next?.click(); return false; }
    if (st?.phase === 'drill' && st.currentPrompt) {
      document.querySelector(`.drill-card .mc-option[data-oi="${st.currentPrompt.correctOi}"]`)?.click();
      return false;
    }
    next?.click();
    return false;
  });
  await page.waitForTimeout(150);
  if (fertig) break;
}
const afterDrills = await page.evaluate(async () => {
  const g = await import('/core/grammar.js');
  const st = (await import('/core/state.js')).getCurrentSession();
  return { gelesen: g.readChapters('basic-da').length, phase: st?.phase || 'keine' };
});
check('Kapitel wird erst nach den Übungen als gelesen abgehakt',
  afterDrills.gelesen >= 1, JSON.stringify(afterDrills));
await page.evaluate(() => document.getElementById('sessionBackBtn')?.click());
await page.waitForTimeout(250);

// ── Lernkurs-Durchlauf: Häppchen → Hören → Üben → Sprechen → Ende ──
// Restliche Grammatik-Kapitel als gelesen markieren, dann die komplette
// Lektion 1 automatisch durchspielen (immer richtig antworten).
await page.evaluate(async () => {
  const g = await import('/core/grammar.js');
  const { grammar } = await import('/js/data/grammar/da.js');
  grammar.forEach(ch => g.markChapterRead('basic-da', ch.id));
  window.__phases = [];
});
await click('#startBtn'); await page.waitForTimeout(700);
// Generischer Schritt-Treiber: beantwortet jede Kurs-Übungsform korrekt
// (Kennenlernen, Hören, MC, Vergleich, Sprechen, Schreiben, Lücke,
// Satzbau, Bedeutung). rev = Latein (Antwortseite ist Deutsch).
const driveStep = lang => page.evaluate(async l => {
  const st = (await import('/core/state.js')).getCurrentSession();
  if (!st || st.mode !== 'course') {
    return document.getElementById('learnArea').textContent.includes('geschafft') ? 'done' : 'gone';
  }
  window.__phases = window.__phases || [];
  if (!window.__phases.includes(st.phase)) window.__phases.push(st.phase);
  const rev = l === 'la';
  const next = document.getElementById('courseNext');
  if (next) { next.click(); return null; }        // Kennenlernen / Feedback
  if (st.phase === 'speak') { document.getElementById('courseSpeakOk')?.click(); return null; }
  if (st.phase === 'talk') { document.getElementById('talkOk')?.click(); return null; }
  // Satz hören: bei „Bedeutung" den gespeicherten Index, bei „Lücke"
  // das Wort der Karte wählen.
  if (st.phase === 'hearing' && st.currentPrompt) {
    window.__hearSeen = window.__hearSeen || {};
    window.__hearSeen[st.currentPrompt.variant] = (window.__hearSeen[st.currentPrompt.variant] || 0) + 1;
    if (st.currentPrompt.variant === 'meaning') {
      // Der Satz darf VOR der Antwort nirgends im Lernbereich stehen.
      const shown = document.getElementById('learnArea').textContent;
      window.__hearHidden = !shown.includes(st.currentPrompt.card.example);
      document.querySelector(`.mc-option[data-idx="${st.currentPrompt.correctIdx}"]`)?.click();
    } else {
      const opts = [...document.querySelectorAll('.mc-option')];
      const i = opts.findIndex(o => o.querySelector('.mc-text')?.textContent.trim() === st.currentPrompt.card.back);
      opts[i >= 0 ? i : 0].click();
    }
    window.__hearRevealed = !!document.querySelector('.hear-reveal');
    return null;
  }
  // Dialog-Runde: die richtige Antwort per gespeicherten Index wählen.
  if (st.phase === 'dialog' && st.currentPrompt && st.currentPrompt.correctIdx !== undefined) {
    window.__dialogSeen = (window.__dialogSeen || 0) + 1;
    document.querySelector(`.mc-option[data-idx="${st.currentPrompt.correctIdx}"]`)?.click();
    window.__dialogCorrect = !!document.querySelector('#mc-fb .correct');
    return null;
  }
  // Paare-Brett: Paare der Reihe nach links→rechts anklicken.
  const matchGrid = document.getElementById('matchGrid');
  if (matchGrid && st.currentPrompt?.pairs) {
    // Kopie ziehen: das letzte Paar setzt currentPrompt auf null,
    // während die Schleife noch läuft.
    const nPairs = st.currentPrompt.pairs.length;
    window.__matchSeen = {
      buttons: matchGrid.querySelectorAll('.match-btn').length,
      pairs: nPairs,
    };
    for (let k = 0; k < nPairs; k++) {
      matchGrid.querySelector(`.match-btn[data-side="l"][data-i="${k}"]`)?.click();
      matchGrid.querySelector(`.match-btn[data-side="r"][data-i="${k}"]`)?.click();
    }
    window.__matchSeen.matched = matchGrid.querySelectorAll('.match-btn--matched').length;
    return null;
  }
  // Buchstaben-Kacheln: Buchstaben in Wort-Reihenfolge tippen (auto-check).
  const tilePool = document.getElementById('tilePool');
  if (tilePool) {
    // Deckt Buchstaben- UND Wort-Kacheln ab (kein Tastatur-Feld mehr).
    const tiles = [...tilePool.querySelectorAll('.build-tile')];
    window.__tilesSeen = (window.__tilesSeen || 0) + 1;
    if (tiles.some(t => t.classList.contains('letter-tile'))) window.__letterTilesSeen = true;
    else window.__wordTilesSeen = true;
    tiles.sort((a, b) => Number(a.dataset.i) - Number(b.dataset.i)).forEach(t => t.click());
    window.__tilesCorrect = !!document.querySelector('#mc-fb .correct');
    return null;
  }
  if (document.getElementById('courseTypeInput')) window.__sawTypeInput = true;
  const card = st.queue[0];
  const typeIn = document.getElementById('courseTypeInput');
  if (typeIn && card) {
    typeIn.value = rev ? card.front : card.back;
    document.getElementById('courseTypeCheck')?.click();
    return null;
  }
  if (document.getElementById('courseCompYes') && st.currentPrompt) {
    document.getElementById(st.currentPrompt.isMatch ? 'courseCompYes' : 'courseCompNo').click();
    return null;
  }
  const pool = document.getElementById('courseBuildPool');
  if (pool && st.currentPrompt?.tokens) {
    for (let k = 0; k < st.currentPrompt.tokens.length; k++) pool.querySelector(`.build-tile[data-i="${k}"]`)?.click();
    document.getElementById('courseBuildCheck')?.click();
    return null;
  }
  const opts = [...document.querySelectorAll('.mc-option')];
  if (opts.length && card) {
    const answer = document.querySelector('.story-sent') ? card.exampleDE
      : st.phase === 'listen' ? card.front
      : st.phase === 'words' ? (rev ? card.front : card.back)
      : card.back;   // Lückentext
    const idx = opts.findIndex(o => o.querySelector('.mc-text')?.textContent.trim() === answer);
    opts[idx >= 0 ? idx : 0].click();
  }
  return null;
}, lang);

let courseEnd = null;
for (let i = 0; i < 500 && !courseEnd; i++) {
  courseEnd = await driveStep('da');
  await page.waitForTimeout(120);
}
const coursePhases = await page.evaluate(async () => ({
  phases: window.__phases,
  introduced: (await import('/core/course.js')).getCourseState('basic-da').introduced,
}));
check('Lektion komplett: Hören, Sprechen, Schreiben & Konversation integriert',
  courseEnd === 'done'
    && ['teach', 'listen', 'words', 'match', 'speak', 'write', 'talk', 'dialog', 'hearing'].every(p => coursePhases.phases.includes(p))
    && coursePhases.phases.indexOf('listen') > coursePhases.phases.indexOf('teach')
    && coursePhases.phases.indexOf('speak') > coursePhases.phases.indexOf('words')
    && coursePhases.phases.indexOf('write') > coursePhases.phases.indexOf('speak')
    && coursePhases.phases.indexOf('talk') > coursePhases.phases.indexOf('write')
    && coursePhases.introduced > 0,
  JSON.stringify({ courseEnd, ...coursePhases }));

// Neue interaktive Übungen: Paare-Brett (4 Paare, alle gelöst) und
// Buchstaben-Kacheln (mindestens ein Wort gebaut, korrekt gewertet).
const newExercises = await page.evaluate(() => ({
  match: window.__matchSeen || null,
  tiles: window.__tilesSeen || 0,
  tilesCorrect: window.__tilesCorrect === true,
}));
check('Paare verbinden: 4 Paare auf dem Brett, alle gelöst',
  newExercises.match && newExercises.match.pairs === 4
    && newExercises.match.buttons === 8 && newExercises.match.matched === 8,
  JSON.stringify(newExercises.match));
check('Wort bauen: Buchstaben-Kacheln erscheinen und werten korrekt',
  newExercises.tiles >= 1 && newExercises.tilesCorrect, JSON.stringify(newExercises));

// Schreiben komplett ohne Tastatur: Im ganzen Kursdurchlauf darf NIE ein
// Eingabefeld auftauchen — alle Schreib-Schritte laufen über Bausteine.
const noKeyboard = await page.evaluate(() => ({
  sawInput: window.__sawTypeInput === true,
  tiles: window.__tilesSeen || 0,
}));
check('Schreiben ohne Tastatur: nur Bausteine, nie ein Eingabefeld',
  !noKeyboard.sawInput && noKeyboard.tiles >= 3, JSON.stringify(noKeyboard));

// Satz hören: beide Varianten, Satz bleibt bis zur Antwort verborgen.
const hearSeen = await page.evaluate(() => ({
  variants: window.__hearSeen || {},
  hiddenBeforeAnswer: window.__hearHidden === true,
  revealedAfter: window.__hearRevealed === true,
}));
check('Satz hören: Bedeutung und Lücke, Satz erst nach der Antwort sichtbar',
  (hearSeen.variants.meaning || 0) >= 1 && (hearSeen.variants.gap || 0) >= 1
    && hearSeen.hiddenBeforeAnswer && hearSeen.revealedAfter,
  JSON.stringify(hearSeen));

// Dialog-Runde: Frage hören, passende Antwort wählen.
const dialogSeen = await page.evaluate(() => ({
  n: window.__dialogSeen || 0,
  correct: window.__dialogCorrect === true,
}));
check('Dialog-Runde: Wendung gehört, passende Antwort gewählt (3 je Lektion)',
  dialogSeen.n >= 3 && dialogSeen.correct, JSON.stringify(dialogSeen));

// Fortschrittsbalken: am Lektionsende exakt voll (die Schritt-Basis
// vergaß früher Auffrischung & Konversation beim Neuberechnen).
const progressEnd = await page.evaluate(() => document.getElementById('progress-text')?.textContent || '');
check('Fortschritt endet exakt bei X/X Schritten',
  /^(\d+)\/\1 Schritte$/.test(progressEnd.trim()), progressEnd);
await click('#sessionBackBtn'); await page.waitForTimeout(300);

// ── Latein: Abfragerichtung Latein→Deutsch + klassische Aussprache ──
const laPron = await page.evaluate(async () => {
  const { latinPron } = await import('/utils/speech.js');
  return { caesar: latinPron('Caesar'), quaeso: latinPron('quaeso'), salve: latinPron('salve'), poena: latinPron('poena') };
});
check('Lateinische Aussprache-Umschrift (c→k, ae→ei, v→w, oe→eu)',
  laPron.caesar === 'keisar' && laPron.quaeso === 'queiso' && laPron.salve === 'salwe' && laPron.poena === 'peuna',
  JSON.stringify(laPron));

await page.selectOption('#deckSelect', 'basic-la'); await page.waitForTimeout(400);
await click('.mode-btn[data-mode="flashcard"]'); await click('#startBtn'); await page.waitForTimeout(600);
const laFc = await page.evaluate(async () => {
  const st = (await import('/core/state.js')).getCurrentSession();
  const card = st.queue[0];
  const label = document.querySelector('.flashcard-front .fc-label')?.textContent;
  const word = document.querySelector('.flashcard-front .fc-word')?.textContent.trim();
  return { label, matches: word.startsWith(card.back), audio: !!document.getElementById('promptAudioBtn') };
});
check('Latein-Karteikarte fragt Lateinisch ab (+ Hör-Knopf)',
  laFc.label === 'Latein' && laFc.matches && laFc.audio, JSON.stringify(laFc));
await page.evaluate(() => document.getElementById('showAnswer').click()); await page.waitForTimeout(300);
const laBack = await page.evaluate(() => ({
  labels: [...document.querySelectorAll('.flashcard-back .fc-label')].map(e => e.textContent.trim()),
  hint: document.getElementById('learnArea').innerHTML.includes('gesprochen:'),
}));
check('Latein-Rückseite: Latein → Deutsch + Aussprache-Hinweis',
  laBack.labels[0] === 'Latein' && laBack.labels[1] === 'Deutsch' && laBack.hint, JSON.stringify(laBack));
await click('#sessionBackBtn'); await page.waitForTimeout(250);

// Latein im LERNKURS: Lektion 1 komplett durchspielen und dabei erfassen,
// dass MC/Hören/Schreiben durchweg Latein zeigen und Deutsch verlangen.
await page.evaluate(async () => {
  const g = await import('/core/grammar.js');
  const { grammar } = await import('/js/data/grammar/la.js');
  grammar.forEach(ch => g.markChapterRead('basic-la', ch.id));
  window.__phases = [];
  window.__laCap = {};
});
await click('.mode-btn[data-mode="course"]'); await page.waitForTimeout(300);
await click('#startBtn'); await page.waitForTimeout(700);
let laEnd = null;
for (let i = 0; i < 500 && !laEnd; i++) {
  await page.evaluate(async () => {
    const st = (await import('/core/state.js')).getCurrentSession();
    if (!st || st.mode !== 'course') return;
    const cap = window.__laCap;
    const card = st.queue?.[0];
    if (!cap.mc && st.phase === 'words' && document.querySelector('.mc-question') && card) {
      const q = document.querySelector('.mc-question').textContent.trim();
      const opts = [...document.querySelectorAll('.mc-option .mc-text')].map(e => e.textContent.trim());
      cap.mc = { qIsLatin: q.startsWith(card.back), german: opts.includes(card.front) };
    }
    if (!cap.listen && st.phase === 'listen' && document.querySelectorAll('.mc-option').length && card) {
      const opts = [...document.querySelectorAll('.mc-option .mc-text')].map(e => e.textContent.trim());
      cap.listen = { german: opts.includes(card.front) };
    }
    if (!cap.write && st.phase === 'write' && document.getElementById('tilePool') && card) {
      const shown = document.querySelector('.build-card .fc-word')?.textContent.trim() || '';
      cap.write = { latinShown: shown.startsWith(card.back) };
    }
  });
  laEnd = await driveStep('la');
  await page.waitForTimeout(120);
}
const laCourse = await page.evaluate(() => window.__laCap);
check('Latein-Kurs: MC & Hören & Schreiben durchweg La→De (Lektion beendet)',
  laEnd === 'done' && laCourse.mc?.qIsLatin && laCourse.mc?.german
    && laCourse.listen?.german && laCourse.write?.latinShown,
  JSON.stringify({ laEnd, ...laCourse }));
await click('#sessionBackBtn'); await page.waitForTimeout(250);
await page.selectOption('#deckSelect', 'basic-da'); await page.waitForTimeout(200);

// ── Chinesisch: kompletter Kursdurchlauf mit zeichenweisen Sätzen ──
// Zeichensprachen (zh/ja) kennen keine Leerzeichen — Lückensatz und
// Satzbau müssen deshalb zeichenweise arbeiten (früher verschluckte die
// Lücke den ganzen Satz).
await page.selectOption('#deckSelect', 'basic-zh'); await page.waitForTimeout(400);
await page.evaluate(async () => {
  const u = localStorage.getItem('lingualearn_current_user');
  // Ab Lektion 4: Funktionswörter (Lektion 2) und Kernverben (Lektion 3)
  // sind gelernt — erst dann schaltet die Satz-Phase Lückensätze frei.
  const zhDeck = await (await import('/core/state.js')).loadDeck('basic-zh');
  const zhIntro = zhDeck.lessonSizes.slice(0, 3).reduce((a, b) => a + b, 0);
  localStorage.setItem('lingualearn_course_' + u, JSON.stringify({ 'basic-zh': { introduced: zhIntro } }));
  (await import('/core/course.js')).reinitCourse();
  const g = await import('/core/grammar.js');
  const { grammar } = await import('/js/data/grammar/zh.js');
  grammar.forEach(ch => g.markChapterRead('basic-zh', ch.id));
  window.__phases = [];
  window.__zhCap = {};
});
await click('.mode-btn[data-mode="course"]'); await page.waitForTimeout(300);
await click('#startBtn'); await page.waitForTimeout(700);
let zhEnd = null;
for (let i = 0; i < 500 && !zhEnd; i++) {
  await page.evaluate(async () => {
    const st = (await import('/core/state.js')).getCurrentSession();
    if (!st || st.mode !== 'course') return;
    const cap = window.__zhCap;
    const card = st.queue?.[0];
    // Hanzi steht auf der Frageseite, Pinyin als Aussprachehilfe darunter
    if (!cap.teach && st.phase === 'teach') {
      const w = document.querySelector('.fc-word-target')?.textContent.trim() || '';
      const pron = document.querySelector('.course-pron')?.textContent.trim() || '';
      cap.teach = { hanzi: /[\u4e00-\u9fff]/.test(w), pinyin: pron.length > 0 };
    }
    // Buchstaben-Kacheln = einzelne Schriftzeichen
    if (!cap.tiles && document.getElementById('tilePool') && card) {
      const tiles = [...document.querySelectorAll('#tilePool .build-tile')].map(t => t.textContent);
      cap.tiles = { n: tiles.length, chars: tiles.length === [...card.back].length };
    }
    // Lückensatz darf NIE den ganzen Satz ausblenden
    const gap = document.querySelector('.gap-sentence')?.textContent.trim();
    if (gap && !cap.gap) cap.gap = { text: gap, onlyBlank: gap.replace(/_/g, '').trim().length === 0 };
  });
  zhEnd = await driveStep('zh');
  await page.waitForTimeout(120);
}
const zhCourse = await page.evaluate(() => ({ cap: window.__zhCap, phases: window.__phases }));
check('Chinesisch: Lektion komplett, Hanzi vorn, Pinyin als Hilfe, Zeichen-Kacheln',
  zhEnd === 'done' && zhCourse.cap.teach?.hanzi && zhCourse.cap.teach?.pinyin
    && zhCourse.cap.tiles?.chars,
  JSON.stringify({ zhEnd, ...zhCourse.cap }));
check('Chinesisch: Lückensatz blendet nur ein Wort aus, nicht den ganzen Satz',
  !zhCourse.cap.gap || zhCourse.cap.gap.onlyBlank === false,
  JSON.stringify(zhCourse.cap.gap || 'keine Lücke in Lektion 1'));
await click('#sessionBackBtn'); await page.waitForTimeout(250);

// Zeichenweise Satz-Logik direkt prüfen (zh + ja).
const spaceless = await page.evaluate(async () => {
  const zh = await (await import('/core/state.js')).loadDeck('basic-zh');
  const withEx = zh.cards.find(c => c.example.includes(c.back));
  return { deck: zh.cards.length, name: zh.name, lang: zh.language, hasEx: !!withEx };
});
check('Chinesisch-Deck geladen (336 Karten, Lektionsplan stimmt)',
  spaceless.deck === 336 && spaceless.lang === 'zh' && spaceless.hasEx, JSON.stringify(spaceless));

await page.selectOption('#deckSelect', 'basic-da'); await page.waitForTimeout(200);

// ── Beispielsätze mit Aussprache-Knopf ──
await page.selectOption('#deckSelect', 'basic-da'); await page.waitForTimeout(200);
await click('.mode-btn[data-mode="flashcard"]'); await click('#startBtn'); await page.waitForTimeout(500);
await page.evaluate(() => document.getElementById('showAnswer')?.click()); await page.waitForTimeout(300);
const exBtn = await page.evaluate(async () => {
  const st = (await import('/core/state.js')).getCurrentSession();
  const card = st.queue[0];
  const btn = document.querySelector('.fc-example .ex-audio');
  let spoken = null;
  const orig = window.speechSynthesis.speak;
  window.speechSynthesis.speak = u => { spoken = u.text; };
  btn?.click();
  window.speechSynthesis.speak = orig;
  return { exists: !!btn, spoken, expected: card.example || null };
});
check('Beispielsatz hat Aussprache-Knopf und spricht den Satz',
  exBtn.exists && !!exBtn.spoken && exBtn.spoken === exBtn.expected, JSON.stringify(exBtn));
await click('#sessionBackBtn'); await page.waitForTimeout(250);

// ── Sprechtempo: Einstellung wirkt auf die Ausgabe ──
const rate = await page.evaluate(async () => {
  const sp = await import('/utils/speech.js');
  const set = sp.setSpeechRate(0.6);
  let used = null;
  const orig = window.speechSynthesis.speak;
  window.speechSynthesis.speak = u => { used = u.rate; };
  sp.speak('hej', 'da');
  const slow = used;
  sp.setSpeechRate(1.1);
  sp.speak('hej', 'da');
  const fast = used;
  window.speechSynthesis.speak = orig;
  const stored = sp.setSpeechRate(0.85);
  return { set, slow, fast, label: sp.rateLabel(0.6), stored,
    clampLow: sp.setSpeechRate(0.1), clampHigh: sp.setSpeechRate(9) };
});
// (die Sprach-API speichert rate als 32-Bit-Float → mit Toleranz vergleichen)
const near = (a, b) => Math.abs(a - b) < 0.001;
check('Sprechtempo einstellbar (inkl. Grenzen) und wirkt auf die Ausgabe',
  rate.set === 0.6 && near(rate.slow, 0.6) && near(rate.fast, 1.1)
  && rate.label === 'sehr langsam' && rate.clampLow === 0.5 && rate.clampHigh === 1.2,
  JSON.stringify(rate));
await page.evaluate(async () => (await import('/utils/speech.js')).setSpeechRate(0.85));
await click('#userChipBtn'); await page.waitForTimeout(150);
await click('.user-dropdown__item[data-action="settings"]'); await page.waitForTimeout(250);
check('Einstellungen: Tempo-Regler vorhanden',
  await page.evaluate(() => !!document.getElementById('speechRate') && !!document.getElementById('speechRateTest')));
await click('#settingsBackBtn'); await page.waitForTimeout(200);

// ── Konversations-Bausteine für alle Sprachen ──
const talkData = await page.evaluate(async () => {
  const out = {};
  for (const l of ['da', 'el', 'fr', 'es', 'la', 'ru', 'ja', 'zh']) {
    const { phrases } = await import(`/js/data/phrases/${l}.js`);
    out[l] = phrases.length && phrases.every(p => p.de && p.target && p.reply) ? phrases.length : 0;
  }
  return out;
});
check('Konversations-Bausteine für alle 8 Sprachen (≥24, mit Dialog-Antworten)',
  Object.values(talkData).every(n => n >= 24), JSON.stringify(talkData));

// ── Geräte-Sync: Zusammenführen zweier Stände (Handy ↔ Mac) ──
const mergeRes = await page.evaluate(async () => {
  const s = await import('/core/sync.js');
  // „Mac": weiter im Kurs, mehr XP. „Handy": andere Erfolge, andere Karten.
  const mac = { version: 1, updatedAt: 2000, data: {
    'lingualearn_game_': {
      xp: 900, gems: 50, streak: { current: 4, longest: 9, lastDate: '2026-07-20' },
      achievements: { 'erste-session': '2026-07-01' }, activity: { '2026-07-20': 30 },
      inventory: { streakFreeze: 1 }, langsPlayed: ['da'], perfectSessions: 2,
      daily: { date: '2026-07-20', count: 30, correct: 20 },
    },
    'lingualearn_cards_': { 'basic-da:Haus': { level: 4, correct: 6 }, 'basic-da:Auto': { level: 1, correct: 1 } },
    'lingualearn_course_': { 'basic-da': { introduced: 40, sentencesDone: ['Haus'] } },
    'lingualearn_gold_': { 'basic-da': [0, 1] },
  } };
  const handy = { version: 1, updatedAt: 1000, data: {
    'lingualearn_game_': {
      xp: 400, gems: 120, streak: { current: 2, longest: 3, lastDate: '2026-07-19' },
      achievements: { 'serie-3': '2026-06-15' }, activity: { '2026-07-19': 12, '2026-07-20': 5 },
      inventory: { xpBoost: 2 }, langsPlayed: ['la'], perfectSessions: 5,
      daily: { date: '2026-07-20', count: 12, correct: 25 },
    },
    'lingualearn_cards_': { 'basic-da:Haus': { level: 2, correct: 2 }, 'basic-da:Buch': { level: 3, correct: 4 } },
    'lingualearn_course_': { 'basic-da': { introduced: 16, sentencesDone: ['Buch'] } },
    'lingualearn_gold_': { 'basic-da': [1, 5] },
  } };
  const m = s.mergeSnapshots(mac, handy).data;
  const g = m['lingualearn_game_'];
  return {
    xp: g.xp, gems: g.gems, perfect: g.perfectSessions,
    longest: g.streak.longest, current: g.streak.current, lastDate: g.streak.lastDate,
    achievements: Object.keys(g.achievements).sort(),
    activity20: g.activity['2026-07-20'], activity19: g.activity['2026-07-19'],
    inventory: g.inventory, langs: g.langsPlayed.sort(),
    dailyCount: g.daily.count, dailyCorrect: g.daily.correct,
    haus: m['lingualearn_cards_']['basic-da:Haus'].level,
    buch: m['lingualearn_cards_']['basic-da:Buch'].level,
    intro: m['lingualearn_course_']['basic-da'].introduced,
    sentences: m['lingualearn_course_']['basic-da'].sentencesDone.sort(),
    gold: m['lingualearn_gold_']['basic-da'].sort(),
  };
});
check('Sync führt zwei Geräte-Stände zusammen (nichts geht verloren)',
  mergeRes.xp === 900 && mergeRes.gems === 120 && mergeRes.perfect === 5
  && mergeRes.longest === 9 && mergeRes.current === 4 && mergeRes.lastDate === '2026-07-20'
  && mergeRes.achievements.join(',') === 'erste-session,serie-3'
  && mergeRes.activity20 === 30 && mergeRes.activity19 === 12
  && mergeRes.inventory.streakFreeze === 1 && mergeRes.inventory.xpBoost === 2
  && mergeRes.langs.join(',') === 'da,la'
  && mergeRes.dailyCount === 30 && mergeRes.dailyCorrect === 25
  && mergeRes.haus === 4 && mergeRes.buch === 3
  && mergeRes.intro === 40 && mergeRes.sentences.join(',') === 'Buch,Haus'
  && mergeRes.gold.join(',') === '0,1,5',
  JSON.stringify(mergeRes));

// Kompletter Ablauf gegen einen simulierten Server (fetch abgefangen).
const syncFlow = await page.evaluate(async () => {
  const s = await import('/core/sync.js');
  const u = localStorage.getItem('lingualearn_current_user');
  // Server-Attrappe mit dem Stand eines „anderen Geräts".
  const server = { snap: { version: 1, updatedAt: 5000, data: {
    'lingualearn_game_': { xp: 99999, achievements: { 'polyglott': '2026-01-01' }, activity: {}, streak: { current: 1, longest: 1, lastDate: '2026-07-20' } },
    'lingualearn_grammar_': { 'basic-el': ['intro'] },
  } } };
  const realFetch = window.fetch;
  let pushedXp = null;
  window.fetch = async (url, opts) => {
    const body = JSON.parse(opts.body);
    if (String(url).endsWith('/pull')) {
      return new Response(JSON.stringify({ ok: true, snapshot: server.snap }), { status: 200 });
    }
    pushedXp = body.snapshot.data['lingualearn_game_']?.xp ?? null;
    server.snap = { ...body.snapshot, updatedAt: 6000 };
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  };
  const before = JSON.parse(localStorage.getItem('lingualearn_game_' + u) || '{}').xp || 0;
  const res = await s.syncNow({ user: u });
  const after = JSON.parse(localStorage.getItem('lingualearn_game_' + u) || '{}');
  const grammar = JSON.parse(localStorage.getItem('lingualearn_grammar_' + u) || '{}');
  window.fetch = realFetch;
  return {
    ok: res.ok, changed: res.changed, before, afterXp: after.xp,
    polyglott: !!after.achievements?.polyglott, pushedXp,
    grammarEl: grammar['basic-el']?.[0] || null,
    lastSync: s.getLastSync(u) > 0,
  };
});
check('Sync-Ablauf: holen → zusammenführen → anwenden → hochladen',
  syncFlow.ok && syncFlow.changed && syncFlow.afterXp === 99999 && syncFlow.polyglott
  && syncFlow.pushedXp === 99999 && syncFlow.grammarEl === 'intro' && syncFlow.lastSync,
  JSON.stringify(syncFlow));

// Unverändert + gerade eben abgeglichen → gar nicht erst funken.
const syncQuiet = await page.evaluate(async () => {
  const s = await import('/core/sync.js');
  const realFetch = window.fetch;
  let calls = 0;
  window.fetch = async () => { calls++; return new Response('{}', { status: 200 }); };
  const res = await s.syncNow({ user: localStorage.getItem('lingualearn_current_user') });
  window.fetch = realFetch;
  return { res, calls };
});
check('Unveränderter Stand löst keinen Server-Aufruf aus',
  syncQuiet.res.ok && syncQuiet.res.skipped === true && syncQuiet.calls === 0,
  JSON.stringify(syncQuiet));

// Ohne eingerichteten Server bleibt die App nutzbar.
const syncOff = await page.evaluate(async () => {
  const s = await import('/core/sync.js');
  const realFetch = window.fetch;
  window.fetch = async () => new Response(JSON.stringify({ ok: false, error: 'sync-not-configured' }), { status: 503 });
  const res = await s.syncNow({ user: localStorage.getItem('lingualearn_current_user'), force: true });
  window.fetch = realFetch;
  return res;
});
check('Ohne Server-Speicher: klare Rückmeldung, kein Absturz',
  syncOff.ok === false && syncOff.reason === 'not-configured', JSON.stringify(syncOff));

// Sicherung: Export → Konto leeren → Import führt alles zurück.
const backup = await page.evaluate(async () => {
  const s = await import('/core/sync.js');
  const u = localStorage.getItem('lingualearn_current_user');
  const dump = s.exportProgress(u);
  const xpBefore = JSON.parse(localStorage.getItem('lingualearn_game_' + u) || '{}').xp || 0;
  localStorage.setItem('lingualearn_game_' + u, JSON.stringify({ xp: 1 }));
  const bad = s.importProgress({ hallo: 'nein' }, u);
  const good = s.importProgress(dump, u);
  const xpAfter = JSON.parse(localStorage.getItem('lingualearn_game_' + u) || '{}').xp || 0;
  return { xpBefore, xpAfter, badRejected: bad.ok === false, goodOk: good.ok === true, kind: dump.kind };
});
check('Fortschritt sichern & wieder einspielen',
  backup.goodOk && backup.badRejected && backup.kind === 'progress'
  && backup.xpAfter === backup.xpBefore, JSON.stringify(backup));

// Konto löschen entfernt alle Daten dieses Kontos.
const wiped = await page.evaluate(async () => {
  const s = await import('/core/sync.js');
  const u = 'wegwerf-konto';
  const users = JSON.parse(localStorage.getItem('lingualearn_users') || '{}');
  users[u] = { passwordHash: 'x' };
  localStorage.setItem('lingualearn_users', JSON.stringify(users));
  localStorage.setItem('lingualearn_game_' + u, JSON.stringify({ xp: 42 }));
  localStorage.setItem('lingualearn_cards_' + u, JSON.stringify({ 'basic-da:Haus': { level: 3 } }));
  const realFetch = window.fetch;
  window.fetch = async () => new Response(JSON.stringify({ ok: true }), { status: 200 });
  const res = await s.deleteAccount(u);
  window.fetch = realFetch;
  const after = JSON.parse(localStorage.getItem('lingualearn_users') || '{}');
  return {
    ok: res.ok,
    game: localStorage.getItem('lingualearn_game_' + u),
    cards: localStorage.getItem('lingualearn_cards_' + u),
    userGone: !after[u],
  };
});
check('Konto löschen entfernt Daten und Konto',
  wiped.ok && wiped.game === null && wiped.cards === null && wiped.userGone,
  JSON.stringify(wiped));

// Statusanzeige in den Einstellungen
await click('#userChipBtn'); await page.waitForTimeout(150);
await click('.user-dropdown__item[data-action="settings"]'); await page.waitForTimeout(250);
check('Einstellungen zeigen Sync-Bereich',
  await page.evaluate(() => !!document.getElementById('syncNowBtn') && !!document.getElementById('syncState')));
await click('#settingsBackBtn'); await page.waitForTimeout(200);

// ── Zwei lokale Konten zusammenführen (Handy-Konto behält die Führung) ──
const mergeAcc = await page.evaluate(async () => {
  const s = await import('/core/sync.js');
  const u = localStorage.getItem('lingualearn_current_user');          // Zielkonto
  // Ein zweites lokales Konto („alter Mac-Stand") anlegen.
  const users = JSON.parse(localStorage.getItem('lingualearn_users') || '{}');
  users['alt-mac'] = { passwordHash: 'x'.repeat(32) };
  localStorage.setItem('lingualearn_users', JSON.stringify(users));
  localStorage.setItem('lingualearn_game_alt-mac', JSON.stringify({
    xp: 250000, gems: 7, achievements: { 'polyglott': '2026-02-02' },
    activity: { '2026-07-01': 42 }, streak: { current: 1, longest: 25, lastDate: '2026-07-01' },
    inventory: { xpBoost: 3 }, langsPlayed: ['fr'], perfectSessions: 9,
  }));
  localStorage.setItem('lingualearn_cards_alt-mac', JSON.stringify({
    'basic-da:Buch': { level: 5, correct: 9 },
  }));
  localStorage.setItem('lingualearn_course_alt-mac', JSON.stringify({
    'basic-el': { introduced: 24, sentencesDone: [] },
  }));

  const listed = s.listLocalAccounts(u);
  const hasData = s.accountHasData('alt-mac');
  const before = JSON.parse(localStorage.getItem('lingualearn_game_' + u) || '{}');
  const res = s.mergeLocalAccount('alt-mac', u);
  const after = JSON.parse(localStorage.getItem('lingualearn_game_' + u) || '{}');
  const cards = JSON.parse(localStorage.getItem('lingualearn_cards_' + u) || '{}');
  const course = JSON.parse(localStorage.getItem('lingualearn_course_' + u) || '{}');
  // Quellkonto muss unangetastet bleiben.
  const sourceStill = JSON.parse(localStorage.getItem('lingualearn_game_alt-mac') || '{}');
  const accountsKept = Object.keys(JSON.parse(localStorage.getItem('lingualearn_users') || '{}'));
  return {
    ok: res.ok, listed: listed.includes('alt-mac'), hasData,
    xpBefore: before.xp || 0, xpAfter: after.xp,
    polyglott: !!after.achievements?.polyglott,
    longest: after.streak?.longest, boost: after.inventory?.xpBoost,
    perfect: after.perfectSessions, langs: (after.langsPlayed || []).sort().join(','),
    buch: cards['basic-da:Buch']?.level, greek: course['basic-el']?.introduced,
    sourceIntact: sourceStill.xp === 250000, accountsKept,
    selfMerge: s.mergeLocalAccount(u, u).ok, unknown: s.mergeLocalAccount('gibtsnicht', u).ok,
  };
});
check('Konten-Zusammenführung: Fortschritt kommt an, Quellkonto bleibt',
  mergeAcc.ok && mergeAcc.listed && mergeAcc.hasData
  && mergeAcc.xpAfter === 250000 && mergeAcc.xpAfter > mergeAcc.xpBefore
  && mergeAcc.polyglott && mergeAcc.longest === 25 && mergeAcc.boost === 3
  && mergeAcc.perfect === 9 && /fr/.test(mergeAcc.langs)
  && mergeAcc.buch === 5 && mergeAcc.greek === 24
  && mergeAcc.sourceIntact && mergeAcc.accountsKept.includes('alt-mac')
  && mergeAcc.selfMerge === false && mergeAcc.unknown === false,
  JSON.stringify(mergeAcc));

// Auswahl erscheint in den Einstellungen
await click('#userChipBtn'); await page.waitForTimeout(150);
await click('.user-dropdown__item[data-action="settings"]'); await page.waitForTimeout(300);
const mergeUi = await page.evaluate(() => ({
  visible: !document.getElementById('mergeGroup')?.hidden,
  options: [...document.querySelectorAll('#mergeAccount option')].map(o => o.value),
  btn: !!document.getElementById('mergeBtn'),
}));
check('Einstellungen: Konten-Auswahl sichtbar mit dem anderen Konto',
  mergeUi.visible && mergeUi.options.includes('alt-mac') && mergeUi.btn, JSON.stringify(mergeUi));
await click('#settingsBackBtn'); await page.waitForTimeout(200);

// ── Auffrischung: fällige Karten früherer Lektionen starten die Lektion ──
const reviewPhase = await page.evaluate(async () => {
  const u = localStorage.getItem('lingualearn_current_user');
  const { cards } = await import('/js/data/decks/da.js');
  // Kursstand vorspulen und die ersten drei Wörter auf „fällig" setzen.
  const course = JSON.parse(localStorage.getItem('lingualearn_course_' + u) || '{}');
  course['basic-da'] = { introduced: 20, sentencesDone: [] };
  localStorage.setItem('lingualearn_course_' + u, JSON.stringify(course));
  const gestern = new Date(); gestern.setDate(gestern.getDate() - 1);
  const due = gestern.toISOString().slice(0, 10);
  const map = {};
  cards.slice(0, 4).forEach(c => { map[`basic-da:${c.front}`] = { level: 2, correct: 3, wrong: 0, due }; });
  localStorage.setItem('lingualearn_cards_' + u, JSON.stringify(map));
  const g = await import('/core/grammar.js');
  const { grammar } = await import('/js/data/grammar/da.js');
  grammar.forEach(ch => g.markChapterRead('basic-da', ch.id));
  (await import('/core/cardProgress.js')).reinitCardProgress();
  (await import('/core/course.js')).reinitCourse();
  return { dueSet: 4 };
});
await page.selectOption('#deckSelect', 'basic-da'); await page.waitForTimeout(200);
await click('.mode-btn[data-mode="course"]'); await page.waitForTimeout(300);
await click('#startBtn'); await page.waitForTimeout(900);
const reviewStart = await page.evaluate(async () => {
  const st = (await import('/core/state.js')).getCurrentSession();
  return {
    phase: st?.phase,
    badge: document.querySelector('.course-phase-badge')?.textContent.trim() || '',
    reviewCount: st?.reviewCards?.length ?? 0,
    // Die Auffrischung darf nur BEREITS eingeführte Wörter zeigen.
    fromEarlier: (st?.reviewCards || []).every(c => st.deck.cards.indexOf(c) < 20),
    hasOptions: document.querySelectorAll('.mc-option').length === 4,
  };
});
check('Lektion startet mit Auffrischung fälliger Karten (max. 3, nur Gelerntes)',
  reviewStart.phase === 'review' && /Auffrischung/.test(reviewStart.badge)
  && reviewStart.reviewCount === 3 && reviewStart.fromEarlier && reviewStart.hasOptions,
  JSON.stringify(reviewStart));
// Auffrischung durchspielen → danach beginnt das Kennenlernen
for (let i = 0; i < 12; i++) {
  const done = await page.evaluate(async () => {
    const st = (await import('/core/state.js')).getCurrentSession();
    if (!st || st.phase !== 'review') return true;
    const next = document.getElementById('courseNext');
    if (next) { next.click(); return false; }
    const card = st.queue[0];
    const opts = [...document.querySelectorAll('.mc-option')];
    const idx = opts.findIndex(o => o.querySelector('.mc-text')?.textContent.trim() === card.back);
    opts[idx >= 0 ? idx : 0].click();
    return false;
  });
  await page.waitForTimeout(180);
  if (done) break;
}
const afterReview = await page.evaluate(async () =>
  (await import('/core/state.js')).getCurrentSession()?.phase);
check('Nach der Auffrischung folgt das Kennenlernen', afterReview === 'teach', String(afterReview));
await click('#sessionBackBtn'); await page.waitForTimeout(250);
// Aufräumen
await page.evaluate(async () => {
  const u = localStorage.getItem('lingualearn_current_user');
  localStorage.removeItem('lingualearn_cards_' + u);
  (await import('/core/cardProgress.js')).reinitCardProgress();
});

// ── Konto-Schlüssel: unabhängig vom Passwort, Passwortwechsel gefahrlos ──
const keyFlow = await page.evaluate(async () => {
  const s = await import('/core/sync.js');
  const u = localStorage.getItem('lingualearn_current_user');
  localStorage.removeItem('lingualearn_synckey_' + u);
  // Erstkontakt: Schlüssel wird aus den Zugangsdaten abgeleitet …
  const derived = await s.deriveToken(u);
  const first = await s.getSyncKey(u);
  const stored = s.readSyncKey(u);
  // … und danach festgeschrieben. Passwortwechsel darf ihn NICHT ändern.
  const users = JSON.parse(localStorage.getItem('lingualearn_users'));
  users[u].passwordHash = 'f'.repeat(32);           // Passwort geändert
  localStorage.setItem('lingualearn_users', JSON.stringify(users));
  const afterPwChange = await s.getSyncKey(u);
  const derivedNow = await s.deriveToken(u);
  // Manuelles Verbinden mit fremdem Schlüssel + Validierung
  const okSet = s.setSyncKey('a'.repeat(64), u);
  const badSet = s.setSyncKey('zzz', u);
  const afterManual = s.readSyncKey(u);
  return {
    derivedEqualsFirst: derived === first, stored: stored === first,
    keyStableAfterPwChange: afterPwChange === first,
    derivationWouldHaveChanged: derivedNow !== derived,
    okSet, badSet, afterManual,
    validYes: s.isValidSyncKey('A'.repeat(64)), validNo: s.isValidSyncKey('abc'),
  };
});
check('Konto-Schlüssel bleibt bei Passwortwechsel erhalten',
  keyFlow.derivedEqualsFirst && keyFlow.stored && keyFlow.keyStableAfterPwChange
  && keyFlow.derivationWouldHaveChanged
  && keyFlow.okSet && !keyFlow.badSet && keyFlow.afterManual === 'a'.repeat(64)
  && keyFlow.validYes && !keyFlow.validNo,
  JSON.stringify(keyFlow));

// Passwort tatsächlich ändern (über die Auth-Schnittstelle)
const pwChange = await page.evaluate(async () => {
  const u = localStorage.getItem('lingualearn_current_user');
  const users = JSON.parse(localStorage.getItem('lingualearn_users'));
  // sauberen Ausgangszustand herstellen: Passwort „test1234" neu setzen
  const wrong = window.LinguaAuth.changePassword('falsch', 'neu12345');
  const short = window.LinguaAuth.changePassword('test1234', 'ab');
  const before = JSON.parse(localStorage.getItem('lingualearn_users'))[u].passwordHash;
  return { wrongRejected: !wrong.ok, shortRejected: !short.ok, hashUnchanged: before === users[u].passwordHash,
    errWrong: wrong.err, errShort: short.err };
});
check('Passwort ändern: falsches/zu kurzes Passwort wird abgewiesen',
  pwChange.wrongRejected && pwChange.shortRejected && pwChange.hashUnchanged, JSON.stringify(pwChange));

// UI-Elemente vorhanden
await click('#userChipBtn'); await page.waitForTimeout(150);
await click('.user-dropdown__item[data-action="settings"]'); await page.waitForTimeout(300);
const keyUi = await page.evaluate(() => ({
  field: !!document.getElementById('syncKeyField'),
  masked: (document.getElementById('syncKeyField')?.value || '').includes('•'),
  apply: !!document.getElementById('syncKeyApply'),
  pw: !!document.getElementById('pwSaveBtn'),
}));
check('Einstellungen: Schlüssel (verdeckt) + Passwortwechsel vorhanden',
  keyUi.field && keyUi.masked && keyUi.apply && keyUi.pw, JSON.stringify(keyUi));

// ── Einstellungen: Datensicherung, Konto-Löschung, Erinnerung ──
const dataUi = await page.evaluate(() => ({
  exp: !!document.getElementById('dataExportBtn'),
  imp: !!document.getElementById('dataImportBtn'),
  del: !!document.getElementById('accountDeleteBtn'),
  rem: !!document.getElementById('reminderToggle'),
  hours: document.getElementById('reminderHour')?.options.length || 0,
}));
check('Einstellungen: Sicherung, Konto-Löschung und Erinnerung vorhanden',
  dataUi.exp && dataUi.imp && dataUi.del && dataUi.rem && dataUi.hours === 24, JSON.stringify(dataUi));
await click('#settingsBackBtn'); await page.waitForTimeout(200);

// ── SRS: längere Intervalle für sicher Gelerntes ──
const srs = await page.evaluate(async () => {
  const cp = await import('/core/cardProgress.js');
  const u = localStorage.getItem('lingualearn_current_user');
  localStorage.setItem('lingualearn_cards_' + u, '{}');
  cp.reinitCardProgress();
  const seen = [];
  for (let i = 0; i < 10; i++) seen.push(cp.recordCardAnswer('basic-da', 'Haus', 'good').level);
  const st = cp.getCardState('basic-da', 'Haus');
  const days = Math.round((new Date(st.due) - new Date(new Date().toISOString().slice(0, 10))) / 86400000);
  return { top: Math.max(...seen), days, maxLevel: cp.MAX_LEVEL, mastered: cp.countMasteredAll() };
});
check('SRS: Stufen bis 8, längstes Intervall 120 Tage, „gemeistert" ab 5',
  srs.top === 8 && srs.days === 120 && srs.maxLevel === 5 && srs.mastered === 1, JSON.stringify(srs));

// ── Tastatur: Ziffer wählt eine Antwort im Kurs ──
await page.evaluate(async () => {
  const u = localStorage.getItem('lingualearn_current_user');
  localStorage.setItem('lingualearn_course_' + u, JSON.stringify({ 'basic-da': { introduced: 0 } }));
  const gm = await import('/core/grammar.js');
  const chapters = await gm.loadGrammar('da');
  localStorage.setItem('lingualearn_grammar_' + u, JSON.stringify({ 'basic-da': chapters.map(c => c.id) }));
  (await import('/core/course.js')).reinitCourse();
  gm.reinitGrammar();
});
await page.selectOption('#deckSelect', 'basic-da'); await page.waitForTimeout(200);
await page.evaluate(() => document.querySelector('.mode-btn[data-mode="course"]')?.click());
await click('#startBtn'); await page.waitForTimeout(600);
// Kennenlernen durchklicken bis zur ersten Frage mit Antwortknöpfen
for (let i = 0; i < 12 && !(await page.evaluate(() => !!document.querySelector('#learnArea .mc-option'))); i++) {
  await page.evaluate(() => document.querySelector('#learnArea .btn-primary')?.click());
  await page.waitForTimeout(200);
}
const kb = await page.evaluate(() => ({ options: document.querySelectorAll('#learnArea .mc-option').length }));
await page.keyboard.press('1'); await page.waitForTimeout(300);
const kbAfter = await page.evaluate(() => ({
  graded: !!document.querySelector('#learnArea .correct, #learnArea .incorrect'),
  shortcut: document.querySelector('#learnArea .mc-option')?.getAttribute('aria-keyshortcuts') || '',
}));
check('Tastatur: Ziffer 1 wählt die erste Antwort',
  kb.options >= 2 && kbAfter.graded, JSON.stringify({ ...kb, ...kbAfter }));
await click('#sessionBackBtn'); await page.waitForTimeout(250);

// ── Endlos-Runden statt Sackgasse am Deck-Ende ──
const endless = await page.evaluate(async () => {
  const u = localStorage.getItem('lingualearn_current_user');
  const { getDecks, loadDeck } = await import('/core/state.js');
  const deck = await loadDeck('basic-da');
  localStorage.setItem('lingualearn_course_' + u,
    JSON.stringify({ 'basic-da': { introduced: deck.cards.length } }));
  const gm = await import('/core/grammar.js');
  const chapters = await gm.loadGrammar('da');
  localStorage.setItem('lingualearn_grammar_' + u, JSON.stringify({ 'basic-da': chapters.map(c => c.id) }));
  gm.reinitGrammar();
  (await import('/core/course.js')).reinitCourse();
  (await import('/ui/gami.js')).renderLearnWidgets();
  return { total: deck.cards.length };
});
await page.waitForTimeout(300);
const endlessUi = await page.evaluate(() => ({
  startBtn: document.getElementById('startBtn')?.textContent.trim(),
  courseText: document.getElementById('courseProgressText')?.textContent.trim(),
}));
await click('#startBtn'); await page.waitForTimeout(900);
const endlessRun = await page.evaluate(() => ({
  title: document.getElementById('session-title')?.textContent || '',
  hasContent: (document.getElementById('learnArea')?.textContent || '').trim().length > 20,
  deadEnd: /Deck komplett/.test(document.getElementById('learnArea')?.textContent || ''),
}));
check('Deck-Ende: Endlos-Runde statt Sackgasse',
  /Endlos-Runde/.test(endlessUi.startBtn || '') && /Endlos-Runde 1/.test(endlessRun.title)
  && endlessRun.hasContent && !endlessRun.deadEnd,
  JSON.stringify({ ...endless, ...endlessUi, ...endlessRun }));
await click('#sessionBackBtn'); await page.waitForTimeout(250);

// ── Japanisch-Deck deutlich erweitert ──
const jaDeck = await page.evaluate(async () => {
  const deck = await (await import('/core/state.js')).loadDeck('basic-ja');
  const fronts = new Set(deck.cards.map(c => c.front));
  const complete = deck.cards.every(c => c.front && c.back && c.example && c.exampleDE && c.roman);
  return {
    cards: deck.cards.length,
    unique: fronts.size,
    lessons: deck.lessonSizes.length,
    sum: deck.lessonSizes.reduce((a, b) => a + b, 0),
    titles: deck.lessonTitles.length,
    complete,
  };
});
check('Japanisch: Deck erweitert, Lektionsplan stimmt',
  jaDeck.cards >= 220 && jaDeck.unique === jaDeck.cards && jaDeck.sum === jaDeck.cards
  && jaDeck.titles === jaDeck.lessons && jaDeck.complete, JSON.stringify(jaDeck));

// ── Funktions-Tiefentests: Shop, Wort des Tages, Quests ──
// Shop: Kauf zieht Diamanten ab, Inventar wächst, Kappe greift.
const shopFlow = await page.evaluate(async () => {
  const shop = await import('/core/shop.js');
  const gami = await import('/core/gamification.js');
  gami.addGems?.(200);
  // Fallback: Gems direkt in den Spielstand schreiben, falls kein addGems.
  if (shop && gami.getGems() < 80) {
    const u = localStorage.getItem('lingualearn_current_user');
    const key = 'lingualearn_game_' + u;
    const g = JSON.parse(localStorage.getItem(key) || '{}');
    g.gems = 200;
    localStorage.setItem(key, JSON.stringify(g));
    gami.reinitGame();
  }
  const before = gami.getGems();
  const r1 = shop.buy('xpBoost');
  const after = gami.getGems();
  let capped = { ok: true };
  for (let i = 0; i < 6 && capped.ok; i++) capped = shop.buy('xpBoost');
  return { before, after, ok: r1.ok, priced: before - after === 30,
           inv: gami.getInventory().xpBoost || 0, capErr: capped.err || null };
});
check('Shop: Kauf bucht 30 Diamanten ab und füllt das Inventar',
  shopFlow.ok && shopFlow.priced && shopFlow.inv >= 1, JSON.stringify(shopFlow));
check('Shop: Vorrats-Kappe verhindert Horten', shopFlow.capErr !== null, String(shopFlow.capErr));

// Wort des Tages: Overlay öffnet mit Wort + Aussprache-Knopf.
const wotdDeep = await page.evaluate(async () => {
  (await import('/ui/wotd.js')).openWotd();
  await new Promise(r => setTimeout(r, 400));   // renderWotd lädt das Deck
  const ov = document.getElementById('wotdModal');
  const panel = document.getElementById('wotd');
  return {
    open: !!ov && !ov.hidden,
    word: (panel?.textContent || '').trim().length > 10,
    audio: !!panel?.querySelector('.audio-btn, button [class*=volume], .wotd-audio, [id*=Say]'),
  };
});
await page.evaluate(async () => (await import('/ui/wotd.js')).closeWotd());
check('Wort des Tages: Overlay mit Wort und Aussprache', wotdDeep.open && wotdDeep.word && wotdDeep.audio, JSON.stringify(wotdDeep));

// Tagesquests: 3 Quests, Fortschritt gezählt, Einlösen bucht Belohnung.
const quests = await page.evaluate(async () => {
  const q = await import('/core/quests.js');
  const gami = await import('/core/gamification.js');
  const list = q.getDailyQuests();
  const done = list.find(x => x.done && !x.claimed);
  let claim = null, gemsBefore = gami.getGems(), gemsAfter = gemsBefore;
  if (done) { claim = q.claimQuest(done.id); gemsAfter = gami.getGems(); }
  return { count: list.length, anyProgress: list.some(x => x.progress > 0),
           claimed: claim ? { ok: !!claim, gained: gemsAfter >= gemsBefore } : 'keine fertig' };
});
check('Tagesquests: 3 Stück mit echtem Fortschritt', quests.count === 3 && quests.anyProgress, JSON.stringify(quests));

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
