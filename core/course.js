import { createUserStore } from './userStore.js';

// Lernkurs-Speicherstand: merkt sich pro Account und Deck, wie viele
// Wörter (in Deck-Reihenfolge) bereits eingeführt wurden. Dadurch setzt
// der Kurs nach jedem Neustart genau dort fort, wo man aufgehört hat.
export const LESSON_SIZE = 8;

const store = createUserStore('lingualearn_course_');
const load = () => store.get();

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
  return Math.floor(getCourseState(deckId).introduced / LESSON_SIZE) + 1;
}

// Die Karten der nächsten Lektion (Deck-Reihenfolge, max. LESSON_SIZE).
export function nextLessonCards(deckId, cards) {
  const { introduced } = getCourseState(deckId);
  return cards.slice(introduced, introduced + LESSON_SIZE);
}

export function advanceCourse(deckId, n) {
  const map = load();
  const st = map[deckId] || { introduced: 0 };
  st.introduced += n;
  map[deckId] = st;
  store.save(map);
  return st;
}
