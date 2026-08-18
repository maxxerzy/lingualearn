// Aussprache-Vergleich: WAS genau lag daneben?
//
// Die Spracherkennung liefert nur einen Text zurück. Bisher wurde daraus
// ein „getroffen / nicht getroffen" — man erfuhr nie, an welcher Stelle
// es klemmte. Hier wird das Gehörte mit dem Ziel ausgerichtet, sodass
// die Oberfläche genau die abweichenden Stellen markieren kann.
//
// DOM-frei und ohne Zustand, damit `tests/unit.mjs` es ohne Browser prüft.

const TYPO_MAP = { 'æ': 'ae', 'ø': 'o', 'å': 'a', 'ß': 'ss', 'œ': 'oe', 'ð': 'd', 'þ': 'th' };

// Vergleichsform: Groß/Klein, Satzzeichen und Akzente sind für die
// Aussprache-Bewertung egal — die Erkennung setzt sie ohnehin beliebig.
export function normalizeSpoken(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[.,!?;:„“”"'’«»()¿¡]/g, '')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[æøåßœðþ]/g, ch => TYPO_MAP[ch] || ch)
    .replace(/\s+/g, ' ')
    .trim();
}

const SPACELESS = new Set(['zh', 'ja']);

// Ein einzelnes Wort wird BUCHSTABENWEISE verglichen — nur so lässt sich
// zeigen, dass „huset" statt „hus" gesagt wurde. Mehrere Wörter werden
// wortweise verglichen, sonst wäre die Markierung unlesbar.
export function tokenizeSpoken(text, lang) {
  const raw = String(text || '').trim();
  if (!raw) return [];
  if (SPACELESS.has(lang)) return [...raw];
  const words = raw.split(/\s+/);
  return words.length > 1 ? words : [...raw];
}

// Wurde buchstabenweise zerlegt? Dann werden die Bausteine ohne
// Leerzeichen wieder zusammengesetzt.
export function isCharLevel(target, lang) {
  return SPACELESS.has(lang) || String(target || '').trim().split(/\s+/).length <= 1;
}

// Längste gemeinsame Teilfolge → Paare zusammengehöriger Positionen.
// Klein genug für die naive DP-Tabelle (Wörter, nicht Texte).
export function matchPairs(a, b) {
  const n = a.length, m = b.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const pairs = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) { pairs.push([i, j]); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
    else j++;
  }
  return pairs;
}

// Vergleicht Ziel und Gehörtes.
//
// Rückgabe:
//   ok        — als getroffen zu werten
//   score     — 0..1, Anteil übereinstimmender Bausteine
//   target[]  — { text, ok } je Baustein des Ziels (ok=false → markieren)
//   heard[]   — dasselbe für das Gehörte
//   heardText — das Gehörte, wie es hereinkam
export const PASS_SCORE = 0.8;

export function comparePronunciation(target, heard, lang) {
  const tTokens = tokenizeSpoken(target, lang);
  const hTokens = tokenizeSpoken(heard, lang);
  const tNorm = tTokens.map(t => normalizeSpoken(t));
  const hNorm = hTokens.map(t => normalizeSpoken(t));

  const charLevel = isCharLevel(target, lang);

  if (!hTokens.length) {
    return {
      ok: false, score: 0, heardText: '', charLevel,
      target: tTokens.map(text => ({ text, ok: false })),
      heard: [],
    };
  }

  const pairs = matchPairs(tNorm, hNorm);
  const tHit = new Set(pairs.map(p => p[0]));
  const hHit = new Set(pairs.map(p => p[1]));
  const score = pairs.length / Math.max(tNorm.length, hNorm.length);

  // Zusätzlich zur Teilfolge gilt der Klassiker als Treffer: das Ziel
  // steckt vollständig im Gehörten (die Erkennung hängt gern Artikel
  // oder Satzzeichen an).
  // Zusammensetzen wie zerlegt — bei Buchstaben ohne Leerzeichen,
  // sonst würde „æble" (ein Zeichen → „ae") nie zu „aeble" passen.
  const sep = charLevel ? '' : ' ';
  const flatT = tNorm.join(sep);
  const flatH = hNorm.join(sep);
  const contained = flatT.length >= 2 && flatH.includes(flatT);

  return {
    ok: contained || score >= PASS_SCORE,
    score,
    charLevel,
    heardText: String(heard || '').trim(),
    target: tTokens.map((text, i) => ({ text, ok: contained || tHit.has(i) })),
    heard: hTokens.map((text, i) => ({ text, ok: contained || hHit.has(i) })),
  };
}

// Kurzer Hinweis auf die abweichende Stelle — „irgendwo war ein Fehler"
// hilft niemandem. Greift auch, wenn es insgesamt gereicht hat: knapp
// bestanden ist genau der Moment, in dem man wissen will, wo es hakte.
export function mismatchHint(result) {
  if (!result) return '';
  const missing = result.target.filter(p => !p.ok).map(p => p.text);
  if (!missing.length) return result.ok ? '' : 'Fast — sprich es etwas deutlicher.';
  const joined = missing.join(result.charLevel ? '' : ' ');
  return missing.length === result.target.length
    ? 'Das war noch etwas anderes — hör es dir nochmal an.'
    : `Achte auf „${joined}“.`;
}
