// Kognat-Erkennung: markiert Wörter, die dem deutschen Wort ähneln
// („Haus" → dän. „hus", engl. „house") — verwandte Wörter merkt man sich
// leichter. Rein datengetrieben, kein zusätzliches Wörterbuch nötig.

function norm(s) {
  return String(s)
    .toLowerCase()
    .replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ß/g, 'ss')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')  // Akzente entfernen (é, ō …)
    .replace(/[^a-z]/g, '');
}

const VOWELS = /[aeiouy]/g;
const skeleton = s => s.replace(VOWELS, '');

function bigrams(s) {
  const set = new Set();
  for (let i = 0; i < s.length - 1; i++) set.add(s.slice(i, i + 2));
  return set;
}

function dice(a, b) {
  const A = bigrams(a), B = bigrams(b);
  if (!A.size || !B.size) return 0;
  let common = 0;
  for (const g of A) if (B.has(g)) common++;
  return (2 * common) / (A.size + B.size);
}

function commonPrefix(a, b) {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  return i;
}

// Ist das Zielwort ein erkennbarer Kognat des deutschen `front`?
// Bei nicht-lateinischer Schrift wird gegen die Umschrift `roman` verglichen.
export function isCognate(front, back, roman) {
  const f = norm(front);
  const cand = norm(roman || back);
  if (f.length < 3 || cand.length < 3) return false;
  if (f === cand) return true;
  // Gleiches Konsonantengerüst (Haus→hs, hus→hs)
  const fs = skeleton(f), cs = skeleton(cand);
  if (fs.length >= 2 && fs === cs) return true;
  if (dice(f, cand) >= 0.5) return true;
  if (commonPrefix(f, cand) >= 4) return true;
  return false;
}
