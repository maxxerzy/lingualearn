import { createUserStore } from './userStore.js';

// Merkt sich pro Deck die zuletzt falsch beantworteten Wörter — Futter für
// die „Für dich"-Empfehlung und das Fehler-Training nach App-Neustart.
const store = createUserStore('lingualearn_errors_');

export function reinitErrorLog() { store.reinit(); }

export function saveErrors(deckId, fronts) {
  if (!deckId || !fronts?.length) return;
  const map = store.get();
  map[deckId] = { date: new Date().toISOString().slice(0, 10), fronts: [...new Set(fronts)].slice(0, 30) };
  store.save(map);
}

export function getErrors(deckId) {
  return store.get()[deckId]?.fronts || [];
}

export function clearErrors(deckId) {
  const map = store.get();
  if (map[deckId]) { delete map[deckId]; store.save(map); }
}
