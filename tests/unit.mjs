// Reine Node-Tests der Kernlogik — kein Browser, keine Geräte-Matrix.
// Läuft in unter einer Sekunde und deckt genau die drei Stellen ab, an
// denen Denkfehler teuer sind: SRS-Karten, Sync-Zusammenführung und
// Satzlogik. Aufruf: node tests/unit.mjs
//
// Die App-Module lesen den localStorage nur INNERHALB von Funktionen,
// nie beim Import — ein kleiner Ersatz reicht deshalb aus, um sie
// unverändert in Node zu laden.

const mem = new Map();
globalThis.localStorage = {
  getItem: k => (mem.has(k) ? mem.get(k) : null),
  setItem: (k, v) => mem.set(k, String(v)),
  removeItem: k => mem.delete(k),
  clear: () => mem.clear(),
};
mem.set('lingualearn_current_user', 'unit');

let failures = 0;
let count = 0;
const check = (name, cond, detail = '') => {
  count++;
  console.log(`${cond ? '✅' : '❌'} ${name}${detail ? ' — ' + detail : ''}`);
  if (!cond) failures++;
};
const eq = (name, actual, expected) =>
  check(name, JSON.stringify(actual) === JSON.stringify(expected),
    JSON.stringify(actual) === JSON.stringify(expected) ? '' : `${JSON.stringify(actual)} ≠ ${JSON.stringify(expected)}`);

const t0 = Date.now();
const cp = await import('../core/cardProgress.js');
const sync = await import('../core/sync.js');
const sen = await import('../utils/sentence.js');
const weak = await import('../core/weakness.js');
const pron = await import('../utils/pronounce.js');

const day = off => {
  const d = new Date();
  d.setDate(d.getDate() + off);
  return d.toISOString().slice(0, 10);
};
const reset = () => {
  for (const k of [...mem.keys()]) if (k.startsWith('lingualearn_cards_')) mem.delete(k);
  cp.reinitCardProgress();
};

// ── 1) SRS: Stufen, Intervalle, Historie ─────────────────────────
console.log('\n── Karten-Fortschritt (core/cardProgress.js) ──');
reset();
{
  eq('richtig → Stufe 1, morgen fällig',
    (({ level, due }) => ({ level, due }))(cp.recordCardAnswer('d', 'Haus', true)),
    { level: 1, due: day(1) });
  eq('„easy" springt zwei Stufen',
    cp.recordCardAnswer('d', 'Haus', 'easy').level, 3);
  eq('„hard" geht eine Stufe zurück',
    cp.recordCardAnswer('d', 'Haus', 'hard').level, 2);
  eq('falsch geht zwei Stufen zurück',
    cp.recordCardAnswer('d', 'Haus', false).level, 0);
  eq('Stufe 0 ist der Boden',
    cp.recordCardAnswer('d', 'Haus', 'again').level, 0);
  eq('Fälligkeit auf Stufe 0 ist heute',
    cp.getCardState('d', 'Haus').due, day(0));

  reset();
  let st;
  for (let i = 0; i < 12; i++) st = cp.recordCardAnswer('d', 'Auto', 'easy');
  eq('Stufe 8 ist die Decke', st.level, 8);
  eq('längstes Intervall sind 120 Tage', st.due, day(120));
  eq('„gemeistert" ab Stufe 5', cp.MAX_LEVEL, 5);
  eq('Stufenname bei 5', cp.levelName(5), 'Gemeistert');
  eq('Stufenname bei 0', cp.levelName(0), 'Neu');

  reset();
  const first = cp.recordCardAnswer('d', 'Buch', true).hist;
  for (let i = 0; i < 6; i++) cp.recordCardAnswer('d', 'Buch', false);
  const buch = cp.getCardState('d', 'Buch');
  eq('erste Antwort landet in der Historie', first, '1');
  eq('Historie hält nur die letzten fünf', buch.hist, '00000');
  eq('Zähler laufen weiter', [buch.correct, buch.wrong], [1, 6]);
  // 1 richtig von 7, dazu fünf jüngste Antworten (alle falsch) doppelt gewichtet.
  eq('Trefferquote gewichtet die jüngsten Antworten',
    Math.round(cp.cardAccuracy(buch) * 100), 8);
  eq('unbekannte Karte hat keine Quote', cp.cardAccuracy(null), null);

  reset();
  cp.recordCardAnswer('d', 'A', 'easy'); cp.recordCardAnswer('d', 'A', 'easy'); cp.recordCardAnswer('d', 'A', 'easy');
  cp.recordCardAnswer('d', 'B', true);
  cp.recordCardAnswer('e', 'C', true);
  eq('Deck-Fortschritt zählt nur das eigene Deck',
    cp.getDeckProgress('d', 10), { total: 10, seen: 2, mastered: 1, due: 0, fresh: 8 });
  eq('gemeisterte Karten über alle Decks', cp.countMasteredAll(), 1);
  eq('fällige Karten (noch keine)', cp.getDueFronts('d'), []);
  cp.recordCardAnswer('d', 'B', false);              // Stufe 0 → heute fällig
  eq('nach einem Fehler sofort wieder fällig', cp.getDueFronts('d'), ['B']);
  cp.resetDeckProgress('d');
  eq('Deck zurücksetzen lässt andere Decks stehen',
    [Object.keys(cp.getCardStates('d')).length, Object.keys(cp.getCardStates('e')).length], [0, 1]);
}

// ── 2) Sync: zusammenführen statt überschreiben ──────────────────
console.log('\n── Geräte-Abgleich (core/sync.js) ──');
{
  const snap = (updatedAt, data) => ({ version: 1, updatedAt, data });
  const local = snap(2000, {
    'lingualearn_game_': {
      xp: 500, gems: 10, dailyGoal: 30,
      achievements: { erste: '2026-01-05' },
      langsPlayed: ['da', 'fr'],
      inventory: { streakFreeze: 1 },
      activity: { '2026-01-01': 20, '2026-01-02': 5 },
      streak: { current: 3, longest: 9, lastDate: '2026-01-02' },
      daily: { date: '2026-01-02', count: 12 },
    },
    'lingualearn_cards_': {
      'd:Haus': { level: 4, correct: 6, wrong: 1 },
      'd:Auto': { level: 1, correct: 1, wrong: 0 },
      'd:Nur-lokal': { level: 2, correct: 2, wrong: 0 },
    },
    'lingualearn_course_': { d: { introduced: 40, sentencesDone: ['Haus'] } },
    'lingualearn_gold_': { d: [0, 1] },
    'lingualearn_stats_': { totalCorrect: 100, totalAnswered: 200, activeDays: 5, lastSessionDate: '2026-01-02' },
  });
  const remote = snap(1000, {
    'lingualearn_game_': {
      xp: 900, gems: 4, dailyGoal: 20,
      achievements: { erste: '2026-01-01', zweite: '2026-01-03' },
      langsPlayed: ['da', 'la'],
      inventory: { streakFreeze: 3, boost: 2 },
      activity: { '2026-01-01': 8, '2026-01-03': 40 },
      streak: { current: 7, longest: 4, lastDate: '2026-01-01' },
      daily: { date: '2026-01-01', count: 99 },
    },
    'lingualearn_cards_': {
      'd:Haus': { level: 2, correct: 30, wrong: 0 },
      'd:Auto': { level: 5, correct: 5, wrong: 2 },
      'd:Nur-fern': { level: 3, correct: 3, wrong: 0 },
    },
    'lingualearn_course_': { d: { introduced: 24, sentencesDone: ['Auto'] } },
    'lingualearn_gold_': { d: [1, 2] },
    'lingualearn_stats_': { totalCorrect: 40, totalAnswered: 60, activeDays: 9, lastSessionDate: '2026-01-01' },
  });
  const m = sync.mergeSnapshots(local, remote).data;
  const g = m['lingualearn_game_'];

  eq('XP: der höhere Stand gewinnt', g.xp, 900);
  eq('Diamanten: der höhere Stand gewinnt', g.gems, 10);
  eq('Erfolge werden vereinigt, frühestes Datum bleibt',
    g.achievements, { erste: '2026-01-01', zweite: '2026-01-03' });
  eq('gespielte Sprachen werden vereinigt', [...g.langsPlayed].sort(), ['da', 'fr', 'la']);
  eq('Vorrat je Ware das Maximum', g.inventory, { streakFreeze: 3, boost: 2 });
  eq('Aktivität je Tag das Maximum',
    g.activity, { '2026-01-01': 20, '2026-01-03': 40, '2026-01-02': 5 });
  eq('Serie: Rekord bleibt, jüngstes Lerndatum gewinnt',
    g.streak, { current: 3, longest: 9, lastDate: '2026-01-02' });
  eq('Tageszähler des jüngeren Tages', g.daily, { date: '2026-01-02', count: 12 });
  eq('Tagesziel vom jüngeren Gerät', g.dailyGoal, 30);

  const cards = m['lingualearn_cards_'];
  eq('Karte: höhere Stufe gewinnt', cards['d:Haus'].level, 4);
  eq('Karte: höhere Stufe schlägt mehr Wiederholungen', cards['d:Haus'].correct, 6);
  eq('Karte: fernes Deck kann auch gewinnen', cards['d:Auto'].level, 5);
  check('Karten beider Geräte bleiben erhalten',
    !!cards['d:Nur-lokal'] && !!cards['d:Nur-fern'], Object.keys(cards).join(','));

  eq('Kursstand: der weitere gewinnt', m['lingualearn_course_'].d.introduced, 40);
  eq('geübte Sätze werden vereinigt',
    [...m['lingualearn_course_'].d.sentencesDone].sort(), ['Auto', 'Haus']);
  eq('Gold-Lektionen werden vereinigt', [...m['lingualearn_gold_'].d].sort(), [0, 1, 2]);

  const st = m['lingualearn_stats_'];
  eq('Statistik: je Feld das Maximum',
    [st.totalCorrect, st.totalAnswered, st.activeDays], [100, 200, 9]);
  eq('Erfolgsrate wird neu gerechnet', st.successRate, 50);

  eq('leerer Gegenstand → der andere Stand bleibt',
    sync.mergeSnapshots(null, remote), remote);
  eq('leerer eigener Stand → der ferne bleibt',
    sync.mergeSnapshots({ data: null }, remote), remote);
  eq('Zeitstempel: der jüngere zählt',
    sync.mergeSnapshots(local, remote).updatedAt, 2000);

  // Zusammenführen darf nie Fortschritt verlieren, egal in welcher Reihenfolge.
  const swapped = sync.mergeSnapshots(remote, local).data;
  eq('Reihenfolge ändert nichts an XP und Kartenstufen',
    [swapped['lingualearn_game_'].xp, swapped['lingualearn_cards_']['d:Haus'].level], [900, 4]);
}

// ── 3) Satzlogik ─────────────────────────────────────────────────
console.log('\n── Satzlogik (utils/sentence.js) ──');
{
  eq('Dänisch trennt an Leerzeichen',
    sen.splitSentence('Jeg har et hus', 'da'), ['Jeg', 'har', 'et', 'hus']);
  eq('Chinesisch trennt zeichenweise',
    sen.splitSentence('我有一本书', 'zh'), ['我', '有', '一', '本', '书']);
  eq('Zusammensetzen kehrt das Trennen um',
    sen.joinSentence(sen.splitSentence('我有一本书', 'zh'), 'zh'), '我有一本书');
  eq('Zusammensetzen mit Leerzeichen',
    sen.joinSentence(['Jeg', 'har'], 'da'), 'Jeg har');
  check('Japanisch gilt als Sprache ohne Leerzeichen',
    sen.isSpaceless('ja') && sen.isSpaceless('zh') && !sen.isSpaceless('da'));

  eq('Lücke trifft das exakte Wort',
    sen.findGapSentence('Jeg har et hus.', 'hus', 'da'), 'Jeg har et ____.');
  eq('Lücke trifft auch die gebeugte Form',
    sen.findGapSentence('Huset er stort.', 'hus', 'da'), '____ er stort.');
  eq('Satzzeichen bleiben an der Lücke stehen',
    sen.findGapSentence('Hvor er huset?', 'hus', 'da'), 'Hvor er ____?');
  eq('kein passendes Wort → keine Lücke',
    sen.findGapSentence('Jeg spiser.', 'flyvemaskine', 'da'), null);
  eq('Chinesisch: Zielzeichen wird ausgeblendet',
    sen.findGapSentence('我有一本书', '书', 'zh'), '我有一本____');
  eq('Chinesisch: fehlendes Zeichen → keine Lücke',
    sen.findGapSentence('我有一本书', '猫', 'zh'), null);

  const known = ['hus', 'stort'];
  const knownSet = new Set(known);
  const deck = ['hus', 'stort', 'bilen', 'lille'];
  check('Satz aus bekannten Wörtern (Funktionswörter zählen nicht)',
    sen.sentenceIsKnown('Huset er stort.', knownSet, known, deck, 'da'));
  check('Satz mit ungelerntem Deck-Wort ist noch gesperrt',
    !sen.sentenceIsKnown('Bilen er stor.', knownSet, known, deck, 'da'));
  check('gebeugte Form eines bekannten Wortes gilt als bekannt',
    sen.sentenceIsKnown('Det er stor.', knownSet, known, deck, 'da'));
  check('Chinesisch: ungelerntes Deck-Zeichen sperrt den Satz',
    !sen.sentenceIsKnown('我有猫', new Set(['我']), ['我'], ['我', '猫'], 'zh'));
  check('Chinesisch: nur bekannte Deck-Zeichen → frei',
    sen.sentenceIsKnown('我有书', new Set(['我', '书']), ['我', '书'], ['我', '书'], 'zh'));

  eq('Wortabgleich: exakt', sen.backMatchScore('hus', 'hus'), 100);
  eq('Wortabgleich: solider Teilstring (beide ≥4 Zeichen)',
    sen.backMatchScore('huset', 'huse'), 80);
  eq('Wortabgleich: gemeinsames Präfix ab 5 Zeichen',
    sen.backMatchScore('arbejdet', 'arbejder'), 60);
  // Absicht: Kurzes matcht NICHT per Teilstring — sonst würde jedes
  // Funktionswort („er", „et") auf ein Deck-Wort passen.
  eq('Wortabgleich: kurzer Stamm bleibt ohne Treffer',
    sen.backMatchScore('huset', 'hus'), 0);
  eq('Wortabgleich: kurze Wörter matchen nicht als Teilstring',
    sen.backMatchScore('er', 'e'), 0);
}

// ── 4) Aussprache-Vergleich ──────────────────────────────────────
console.log('\n── Aussprache (utils/pronounce.js) ──');
{
  const cmp = (t, h, lang = 'da') => pron.comparePronunciation(t, h, lang);

  eq('exakt gesprochen → getroffen',
    (r => [r.ok, Math.round(r.score * 100)])(cmp('hus', 'hus')), [true, 100]);
  eq('Groß/Klein und Satzzeichen sind egal', cmp('hus', 'Hus.').ok, true);
  eq('Akzente und Sonderzeichen werden vereinheitlicht',
    cmp('æble', 'aeble').ok, true);

  const zuViel = cmp('hus', 'huset');
  eq('Zielwort steckt im Gehörten → gilt als getroffen', zuViel.ok, true);

  const zuWenig = cmp('huset', 'hus');
  eq('fehlende Endung wird als Abweichung markiert',
    zuWenig.target.map(p => (p.ok ? p.text : '[' + p.text + ']')).join(''), 'hus[e][t]');
  eq('Hinweis nennt die abweichende Stelle', pron.mismatchHint(zuWenig), 'Achte auf „et“.');
  eq('Buchstaben-Vergleich bei einem einzelnen Wort', zuWenig.charLevel, true);

  const satz = cmp('god morgen', 'gut morgen');
  eq('mehrere Wörter werden wortweise verglichen', satz.charLevel, false);
  eq('nur das falsche Wort ist markiert',
    satz.target.map(p => p.ok), [false, true]);
  eq('Hinweis nennt das falsche Wort', pron.mismatchHint(satz), 'Achte auf „god“.');

  eq('nichts verstanden → nicht getroffen, nichts markiert grün',
    (r => [r.ok, r.score, r.heard.length])(cmp('hus', '')), [false, 0, 0]);
  eq('völlig daneben → deutlicher Hinweis statt Detailkritik',
    pron.mismatchHint(cmp('bil', 'zug')), 'Das war noch etwas anderes — hör es dir nochmal an.');

  const zh = cmp('我有书', '我有猫', 'zh');
  eq('Chinesisch wird zeichenweise verglichen', zh.charLevel, true);
  eq('Chinesisch: nur das falsche Zeichen ist markiert',
    zh.target.map(p => p.ok), [true, true, false]);
  eq('Chinesisch: Hinweis ohne Leerzeichen', pron.mismatchHint(zh), 'Achte auf „书“.');

  eq('Ausrichtung findet die längste gemeinsame Folge',
    pron.matchPairs(['a', 'b', 'c'], ['a', 'x', 'c']), [[0, 0], [2, 2]]);
  eq('Schwelle liegt bei 80 %', pron.PASS_SCORE, 0.8);
}

// ── 4) Schwächen-Profil (reine Auswertung) ───────────────────────
console.log('\n── Schwächen-Profil (core/weakness.js) ──');
{
  reset();
  const cards = mem.get('lingualearn_cards_unit');
  const map = cards ? JSON.parse(cards) : {};
  for (const f of ['Hund', 'Katze', 'Pferd', 'Vogel']) map[`d:${f}`] = { level: 1, correct: 1, wrong: 4, hist: '00010' };
  for (const f of ['Rot', 'Blau', 'Grün', 'Gelb']) map[`d:${f}`] = { level: 3, correct: 5, wrong: 0, hist: '11111' };
  map['d:Käse'] = { level: 0, correct: 0, wrong: 2, hist: '00' };   // zu dünne Datenlage
  mem.set('lingualearn_cards_unit', JSON.stringify(map));
  cp.reinitCardProgress();

  const profile = weak.themeProfile('d');
  eq('schwächstes Thema mit Quote',
    [profile[0].theme, Math.round(profile[0].rate * 100), profile[0].answers], ['Tiere', 20, 20]);
  eq('stärkstes Thema am Ende', profile[profile.length - 1].theme, 'Farben');
  eq('zu dünne Datenlage zählt nicht', profile.map(t => t.theme), ['Tiere', 'Farben']);
  eq('Übungspaket beginnt beim schwächsten Wort',
    weak.themePack('d', 'Tiere').length, 4);
  eq('fehlerfreie Themen stehen nicht in der Anzeige',
    weak.weakThemes('d', 3).map(t => t.theme), ['Tiere']);
  eq('Empfehlung nennt das schwache Thema',
    weak.weakestForRecommendation('d')?.theme, 'Tiere');
  eq('ohne Daten keine Empfehlung', weak.weakestForRecommendation('leer'), null);
}

const ms = Date.now() - t0;
console.log(`\n${count} Prüfungen in ${ms} ms`);
check('Laufzeit unter zwei Sekunden', ms < 2000, `${ms} ms`);
console.log(`\n${failures === 0 ? '🎉 UNIT-TESTS OK' : `❌ ${failures} Fehler`}`);
process.exit(failures === 0 ? 0 : 1);
