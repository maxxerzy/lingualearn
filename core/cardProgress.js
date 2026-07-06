import { getCurrentUser } from './auth.js';

// Leitner-style spaced repetition: each card has a level 0-5.
// Correct answers move it up, wrong answers move it down.
// Each level maps to a review interval; a card is "due" once its date passes.
const KEY_PREFIX = 'lingualearn_cards_';
const INTERVALS_DAYS = [0, 1, 2, 4, 8, 16];
export const MAX_LEVEL = 5;

let cache = null;
let cacheKey = null;

function storageKey() {
  const user = getCurrentUser();
  return user ? KEY_PREFIX + user : null;
}

function load() {
  const key = storageKey();
  if (!key) return {};
  if (cache && cacheKey === key) return cache;
  try {
    cache = JSON.parse(localStorage.getItem(key) || '{}');
  } catch {
    cache = {};
  }
  cacheKey = key;
  return cache;
}

function persist() {
  const key = storageKey();
  if (!key || !cache) return;
  try { localStorage.setItem(key, JSON.stringify(cache)); } catch { /* voll — ignorieren */ }
}

// Nach Login neu laden, damit der Zustand des richtigen Nutzers gilt.
export function reinitCardProgress() { cache = null; cacheKey = null; }

function dateStr(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

export function getCardState(deckId, front) {
  return load()[`${deckId}:${front}`] || null;
}

// rating: 'easy' | 'good' | 'hard' | 'again' — oder boolean (MC/Vergleich)
export function recordCardAnswer(deckId, front, rating) {
  const map = load();
  const k = `${deckId}:${front}`;
  const st = map[k] || { level: 0, correct: 0, wrong: 0 };

  let delta;
  if (rating === 'easy') delta = 2;
  else if (rating === 'good' || rating === true) delta = 1;
  else if (rating === 'hard') delta = -1;
  else delta = -2; // 'again' oder false

  if (delta > 0) st.correct++; else st.wrong++;
  st.level = Math.min(MAX_LEVEL, Math.max(0, st.level + delta));
  st.due = dateStr(INTERVALS_DAYS[st.level]);
  map[k] = st;
  persist();
  return st;
}

export function levelName(level) {
  if (level >= MAX_LEVEL) return 'Gemeistert';
  if (level >= 3) return 'Wiederholen';
  if (level >= 1) return 'Lernen';
  return 'Neu';
}

// Fortschritts-Zusammenfassung eines Decks — braucht keine Kartenliste,
// nur die Gesamtzahl (aus den Metadaten) und den gespeicherten Zustand.
export function getDeckProgress(deckId, totalCount) {
  const map = load();
  const prefix = `${deckId}:`;
  const today = dateStr();
  let seen = 0, mastered = 0, due = 0;
  for (const [k, st] of Object.entries(map)) {
    if (!k.startsWith(prefix)) continue;
    seen++;
    if (st.level >= MAX_LEVEL) mastered++;
    if (!st.due || st.due <= today) due++;
  }
  return { total: totalCount, seen, mastered, due, fresh: Math.max(0, totalCount - seen) };
}

// Fronts aller fälligen Karten eines Decks (auch gemeisterte, deren
// Intervall abgelaufen ist — so bleiben sie langfristig im Umlauf).
export function getDueFronts(deckId) {
  const map = load();
  const prefix = `${deckId}:`;
  const today = dateStr();
  const fronts = [];
  for (const [k, st] of Object.entries(map)) {
    if (!k.startsWith(prefix)) continue;
    if (!st.due || st.due <= today) fronts.push(k.slice(prefix.length));
  }
  return fronts;
}

export function countMasteredAll() {
  let n = 0;
  for (const st of Object.values(load())) {
    if (st.level >= MAX_LEVEL) n++;
  }
  return n;
}
