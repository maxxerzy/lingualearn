// Utility function to shuffle an array
export function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Zieht bis zu `count` zufällige Elemente ohne komplettes Array-Clonen/Mischen.
export function pickRandom(array, count, predicate) {
  if (!Array.isArray(array) || count <= 0 || array.length === 0) return [];
  if (array.length >= count * 4) {
    const out = [];
    const seen = new Set();
    const maxTries = count * 6;
    for (let t = 0; t < maxTries && out.length < count; t++) {
      const idx = Math.floor(Math.random() * array.length);
      if (seen.has(idx)) continue;
      seen.add(idx);
      const item = array[idx];
      if (!predicate || predicate(item)) out.push(item);
    }
    if (out.length === count) return out;
  }
  const pool = predicate ? array.filter(predicate) : array.slice();
  const n = pool.length;
  const k = Math.min(count, n);
  for (let i = 0; i < k; i++) {
    const j = i + Math.floor(Math.random() * (n - i));
    const tmp = pool[i];
    pool[i] = pool[j];
    pool[j] = tmp;
  }
  return pool.slice(0, k);
}

export function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function todayStr(offsetDays = 0) {
  if (!offsetDays) return new Date().toISOString().slice(0, 10);
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

export function yesterdayStr() {
  return todayStr(-1);
}
