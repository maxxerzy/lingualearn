import { createUserStore } from './userStore.js';

// Merkt sich pro Deck die zuletzt falsch beantworteten Wörter — Futter für
// die „Für dich"-Empfehlung und das Fehler-Training nach App-Neustart.
const store = createUserStore('lingualearn_errors_');

export function reinitErrorLog() { store.reinit(); }

// Neue Fehler kommen VOR die bereits gemerkten, statt sie zu ersetzen —
// sonst löscht eine Session mit einem einzigen Fehler alles, was davor
// nicht saß. Was chronisch hakt, wertet das Schwächen-Profil aus
// (`core/weakness.js`); diese Liste bleibt der Kurzzeit-Merker.
const MAX_ERRORS = 30;

export function saveErrors(deckId, fronts = [], solved = []) {
  if (!deckId) return;
  const map = store.get();
  const prev = map[deckId]?.fronts || [];
  if (!fronts.length && !prev.length) return;

  // Gemerkte Fehler, die in dieser Session saßen, fallen raus — es sei
  // denn, sie gingen dabei erneut daneben (dann stehen sie in `fronts`).
  const done = new Set(solved);
  const merged = [...new Set([...fronts, ...prev.filter(f => !done.has(f))])].slice(0, MAX_ERRORS);
  if (!merged.length) { delete map[deckId]; store.save(map); return; }
  map[deckId] = { date: new Date().toISOString().slice(0, 10), fronts: merged };
  store.save(map);
}

export function getErrors(deckId) {
  return store.get()[deckId]?.fronts || [];
}

export function clearErrors(deckId) {
  const map = store.get();
  if (map[deckId]) { delete map[deckId]; store.save(map); }
}
