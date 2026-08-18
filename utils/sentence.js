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

// Wortabgleich mit Toleranz für Beugung: exakt / solider Teilstring /
// gemeinsames Präfix ≥5. Kurze Funktionswörter matchen dadurch nicht.
export function backMatchScore(word, back) {
  if (word === back) return 100;
  const short = Math.min(word.length, back.length);
  if (short >= 4 && (word.includes(back) || back.includes(word))) return 80;
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
  const tokens = example.toLowerCase().split(/[\s.,!?;:„“"»«()¿¡'’-]+/).filter(Boolean);
  for (const t of tokens) {
    if (knownBackSet.has(t)) continue;                    // exakt bekannt
    if (knownBackList.some(b => backMatchScore(t, b) >= 60)) continue; // bekannt (gebeugt)
    if (deckBackList.some(b => backMatchScore(t, b) >= 60)) return false; // Deck-Wort, aber noch nicht gelernt
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
  const norm = s => s.toLowerCase();
  const target = norm(back);
  const tokens = example.split(/(\s+)/);
  let bestIdx = -1;
  let bestScore = 0;

  tokens.forEach((tok, idx) => {
    if (/^\s+$/.test(tok) || !tok) return;
    const word = norm(tok.replace(/[.,!?;:„“"»«()¿¡]/g, ''));
    if (!word) return;
    let score = 0;
    if (word === target) score = 100;
    else if (word.includes(target) || target.includes(word)) score = 80;
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
    return t.replace(/[^.,!?;:„“"»«()¿¡]+/, '____');
  }).join('');
  return blanked;
}
