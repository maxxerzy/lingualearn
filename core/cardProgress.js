import { createUserStore } from './userStore.js';

// Leitner-style spaced repetition: each card has a level 0-8.
// Correct answers move it up, wrong answers move it down.
// Each level maps to a review interval; a card is "due" once its date passes.
//
// Ab Stufe 5 gilt eine Karte als „gemeistert" (MAX_LEVEL) — die Stufen
// darüber verlängern nur noch das Intervall, damit sicher Gelerntes nicht
// alle zwei Wochen wieder auf dem Stapel liegt. Erfolge, Wörterbuch-Punkte
// und Statistiken bleiben dadurch unverändert gültig.
const INTERVALS_DAYS = [0, 1, 2, 4, 8, 16, 30, 60, 120];
export const MAX_LEVEL = 5;
const MAX_STAGE = INTERVALS_DAYS.length - 1;

const store = createUserStore('lingualearn_cards_');
const load = () => store.get();

// Nach Login neu laden, damit der Zustand des richtigen Nutzers gilt.
export function reinitCardProgress() { store.reinit(); }

function dateStr(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

export function getCardState(deckId, front) {
  return load()[`${deckId}:${front}`] || null;
}

// Länge des Kurzzeit-Gedächtnisses pro Karte: die letzten fünf Antworten
// als Zeichenkette aus '1' (richtig) und '0' (falsch), die jüngste rechts.
// Damit lässt sich „sitzt gerade nicht" von „saß früher mal nicht" trennen —
// die Gesamt-Trefferquote (correct/wrong) verwässert das über Monate.
export const HIST_LEN = 5;

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
  st.hist = `${st.hist || ''}${delta > 0 ? '1' : '0'}`.slice(-HIST_LEN);
  st.level = Math.min(MAX_STAGE, Math.max(0, st.level + delta));
  st.due = dateStr(INTERVALS_DAYS[st.level]);
  map[k] = st;
  store.save(map);
  return st;
}

// Trefferquote einer Karte (0–1) oder null, wenn sie noch nie dran war.
// Die letzten Antworten zählen doppelt, damit ein aktuelles Loch schwerer
// wiegt als ein alter Fehler, den man längst ausgebügelt hat.
export function cardAccuracy(st) {
  if (!st) return null;
  const answers = (st.correct || 0) + (st.wrong || 0);
  if (!answers) return null;
  const hist = st.hist || '';
  const recentRight = [...hist].filter(c => c === '1').length;
  const total = answers + hist.length;
  return ((st.correct || 0) + recentRight) / total;
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

// Alle gespeicherten Karten-Zustände eines Decks (fürs Wörterbuch).
// Der Store ist flach: Schlüssel sind `deckId:front`.
export function getCardStates(deckId) {
  const out = {};
  const prefix = deckId + ':';
  for (const [k, v] of Object.entries(load())) {
    if (k.startsWith(prefix)) out[k.slice(prefix.length)] = v;
  }
  return out;
}

// Kompletten SRS-Fortschritt eines Decks löschen (Einstellungen → Reset).
export function resetDeckProgress(deckId) {
  const map = load();
  const prefix = deckId + ':';
  let changed = false;
  for (const k of Object.keys(map)) {
    if (k.startsWith(prefix)) { delete map[k]; changed = true; }
  }
  if (changed) store.save(map);
}

export function countMasteredAll() {
  let n = 0;
  for (const st of Object.values(load())) {
    if (st.level >= MAX_LEVEL) n++;
  }
  return n;
}
