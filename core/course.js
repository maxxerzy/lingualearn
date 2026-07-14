import { createUserStore } from './userStore.js';

// Lernkurs-Speicherstand: merkt sich pro Account und Deck, wie viele
// Wörter (in Deck-Reihenfolge) bereits eingeführt wurden. Dadurch setzt
// der Kurs nach jedem Neustart genau dort fort, wo man aufgehört hat.
export const LESSON_SIZE = 8;   // Maximalgröße; echte Lektionen sind thematisch (variabel).

const store = createUserStore('lingualearn_course_');
const load = () => store.get();

// Pro Deck: die thematischen Lektionsgrößen (aus der Deck-Datei). Wird beim
// Laden des Decks gesetzt. Ohne Plan fällt alles auf feste 8er-Lektionen zurück.
const lessonPlans = {};
export function setLessonPlan(deckId, sizes) {
  if (Array.isArray(sizes) && sizes.length) lessonPlans[deckId] = sizes;
}

// 0-basierter Index der aktuellen (nächsten zu lernenden) Lektion.
function currentLessonIndex(deckId) {
  const intro = getCourseState(deckId).introduced;
  const sizes = lessonPlans[deckId];
  if (!sizes) return Math.floor(intro / LESSON_SIZE);
  let acc = 0;
  for (let i = 0; i < sizes.length; i++) {
    if (intro < acc + sizes[i]) return i;
    acc += sizes[i];
  }
  return sizes.length;   // alles gelernt
}

// Nach Login neu laden, damit der Stand des richtigen Nutzers gilt.
export function reinitCourse() { store.reinit(); }

export function getCourseState(deckId) {
  const st = load()[deckId];
  return { introduced: st?.introduced || 0, sentencesDone: st?.sentencesDone || [] };
}

// Fronts der Karten, deren Lückensatz bereits geübt wurde.
export function getSentencesDone(deckId) {
  return load()[deckId]?.sentencesDone || [];
}

export function markSentencesDone(deckId, fronts) {
  if (!fronts || fronts.length === 0) return;
  const map = load();
  const st = map[deckId] || { introduced: 0 };
  const set = new Set(st.sentencesDone || []);
  fronts.forEach(f => set.add(f));
  st.sentencesDone = [...set];
  map[deckId] = st;
  store.save(map);
}

export function lessonNumber(deckId) {
  return currentLessonIndex(deckId) + 1;
}

// Die Karten der nächsten (thematischen) Lektion.
export function nextLessonCards(deckId, cards) {
  const { introduced } = getCourseState(deckId);
  const sizes = lessonPlans[deckId];
  if (!sizes) return cards.slice(introduced, introduced + LESSON_SIZE);
  const i = currentLessonIndex(deckId);
  if (i >= sizes.length) return [];
  let start = 0;
  for (let k = 0; k < i; k++) start += sizes[k];
  // Falls der Stand mitten in einem Block liegt: ab dort bis Blockende.
  return cards.slice(introduced, start + sizes[i]);
}

export function advanceCourse(deckId, n) {
  const map = load();
  const st = map[deckId] || { introduced: 0 };
  st.introduced += n;
  map[deckId] = st;
  store.save(map);
  return st;
}
