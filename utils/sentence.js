// Satzlogik der Kurs-Phasen (Lücke, Satzbau, Freischalten, Satz-Hören).
//
// Bewusst frei von DOM und Zustand: Diese Funktionen entscheiden, wo in
// einem Beispielsatz die Lücke sitzt und ob ein Satz schon aus bekannten
// Wörtern besteht. Genau dort sind Denkfehler teuer und im Browser-Test
// nur mühsam zu finden — `tests/unit.mjs` prüft sie deshalb direkt.

// Chinesisch und Japanisch schreiben OHNE Leerzeichen. Alle Satz-Übungen
// trennten früher an Leerzeichen und behandelten deshalb einen ganzen
// Satz als ein einziges Wort — die Lücke verschluckte den kompletten
// Satz. Für diese Sprachen wird zeichenweise gearbeitet.
export function isSpaceless(lang) { return lang === 'zh' || lang === 'ja'; }

export function splitSentence(text, lang) {
  return isSpaceless(lang)
    ? [...String(text || '').trim()]
    : String(text || '').trim().split(/\s+/);
}

export function joinSentence(parts, lang) {
  return parts.join(isSpaceless(lang) ? '' : ' ');
}

// Arabisch läuft von rechts nach links — Kachel-Reihen (Schreiben,
// Satzbau) müssen dann rechts beginnen.
export function isRtl(lang) { return lang === 'ar'; }

// Arabischer Vergleichsschlüssel: Vokalzeichen (Ḥarakāt, Šadda, Sukūn,
// Tanwīn), Tatwīl und Richtungsmarken fallen weg. Die Hamza-Sitze
// (أ إ آ ؤ ئ) zerfallen per NFD in Grundbuchstabe + Hamza-Zeichen und
// landen so ebenfalls auf ا/و/ي. Nötig, weil Deck-Wort („كِتَاب") und
// Satz („الْكِتَابُ") unterschiedlich vokalisiert sind und die
// Spracherkennung gar keine Vokalzeichen liefert.
const AR_MARKS = /[ؐ-ًؚ-ٰٟۖ-ۭـ‎‏]/g;
export function arabicBase(s) {
  return String(s || '').normalize('NFD').replace(AR_MARKS, '')
    .replace(/ٱ/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه');
}

function matchKey(s, lang) {
  const t = String(s || '').toLowerCase();
  return isRtl(lang) ? arabicBase(t) : t;
}

// Buchstaben-Kacheln: ein Grundzeichen bleibt mit seinen kombinierenden
// Zeichen zusammen — sonst läge ein arabisches „ِ" allein auf einer Kachel.
export function splitGraphemes(word) {
  return String(word || '').match(/\P{M}\p{M}*/gu) || [];
}

const PUNCT = '.,!?;:„“"»«()¿¡،؛؟';
const PUNCT_RE = new RegExp(`[${PUNCT}]`, 'g');

// Wortabgleich mit Toleranz für Beugung: exakt / solider Teilstring /
// gemeinsames Präfix ≥5. Kurze Funktionswörter matchen dadurch nicht.
// Arabisch (Schlüssel aus arabicBase): Viele Wurzelwörter haben nur drei
// Buchstaben („بيت") und stecken mit Artikel/Endung im Satzwort
// („البيت", „بيتي") — dort reicht ein Teilstring ab drei Buchstaben,
// aber nur in Richtung „Satzwort enthält Deck-Wort".
export function backMatchScore(word, back, lang) {
  if (word === back) return 100;
  if (isRtl(lang)) {
    if (back.length >= 3 && word.includes(back)) return 80;
    if (word.length >= 4 && back.includes(word)) return 80;
  } else {
    const short = Math.min(word.length, back.length);
    if (short >= 4 && (word.includes(back) || back.includes(word))) return 80;
  }
  let p = 0;
  while (p < word.length && p < back.length && word[p] === back[p]) p++;
  if (p >= 5) return 60;
  return 0;
}

// Ist der Beispielsatz vollständig aus bekannten Wörtern gebildet?
// Tokens, die zu keinem Deck-Wort passen, gelten als Funktionswörter.
export function sentenceIsKnown(example, knownBackSet, knownBackList, deckBackList, lang) {
  // Ohne Leerzeichen: prüfen, ob im Satz ein Deck-Wort steckt, das noch
  // nicht gelernt ist. Zeichen, die zu keinem Deck-Wort gehören, sind
  // Funktionswörter (的, は …) und stören nicht.
  if (isSpaceless(lang)) {
    return !deckBackList.some(b => b && example.includes(b) && !knownBackSet.has(b));
  }
  const key = s => matchKey(s, lang);
  const tokens = example.split(new RegExp(`[\\s${PUNCT}'’-]+`)).map(key).filter(Boolean);
  // Arabisch: Vokalisierung von Satz und Deck-Wort weicht ab → alles auf
  // denselben Schlüssel bringen, sonst wäre nichts „exakt bekannt".
  const knownKeys = isRtl(lang) ? new Set([...knownBackSet].map(key)) : knownBackSet;
  const knownList = isRtl(lang) ? knownBackList.map(key) : knownBackList;
  const deckList = isRtl(lang) ? deckBackList.map(key) : deckBackList;
  for (const t of tokens) {
    if (knownKeys.has(t)) continue;                    // exakt bekannt
    if (knownList.some(b => backMatchScore(t, b, lang) >= 60)) continue; // bekannt (gebeugt)
    if (deckList.some(b => backMatchScore(t, b, lang) >= 60)) return false; // Deck-Wort, aber noch nicht gelernt
    // sonst: Funktionswort → ignorieren
  }
  return true;
}

// Sucht im Beispielsatz das Wort, das zum Zielwort gehört (auch gebeugte
// Formen wie hus→huset oder mit Artikel verklebt wie l'école).
export function findGapSentence(example, back, lang) {
  // Ohne Leerzeichen (zh/ja): das Zielwort direkt im Satz ausblenden.
  if (isSpaceless(lang)) {
    const at = example.indexOf(back);
    return at < 0 ? null : example.slice(0, at) + '____' + example.slice(at + back.length);
  }
  const norm = s => matchKey(s, lang);
  const target = norm(back);
  const tokens = example.split(/(\s+)/);
  let bestIdx = -1;
  let bestScore = 0;

  tokens.forEach((tok, idx) => {
    if (/^\s+$/.test(tok) || !tok) return;
    const word = norm(tok.replace(PUNCT_RE, ''));
    if (!word) return;
    let score = 0;
    // Arabisch: Präpositionen wie „في" stecken in vielen Wörtern („فيل")
    // — als Teil des Ziels zählen erst Wörter ab drei Buchstaben.
    const partOfTarget = target.includes(word) && (!isRtl(lang) || word.length >= 3);
    // Enthält das Satzwort das ganze Ziel, ist das stärker als ein Satzwort,
    // das nur ein Stück des Ziels ist („أَطْفَأَ" ⊂ „إِطْفَائِيّ") — sonst
    // gewänne bei Gleichstand einfach das erste Wort im Satz.
    if (word === target) score = 100;
    else if (word.includes(target)) score = 85;
    else if (partOfTarget) score = 80;
    else {
      let p = 0;
      while (p < word.length && p < target.length && word[p] === target[p]) p++;
      if (p >= Math.min(4, target.length)) score = p;
    }
    if (score > bestScore) { bestScore = score; bestIdx = idx; }
  });

  if (bestIdx === -1) return null;
  const blanked = tokens.map((t, i) => {
    if (i !== bestIdx) return t;
    // Satzzeichen am ausgeblendeten Wort erhalten
    return t.replace(new RegExp(`[^${PUNCT}]+`), '____');
  }).join('');
  return blanked;
}
