import { getCurrentUser } from './auth.js';

// Meldet der Oberfläche, wenn Schreibzugriffe scheitern (voller Speicher,
// privater Modus). Ohne diese Rückmeldung bliebe Datenverlust unbemerkt.
let writeFailed = false;
function notifyStorage(ok) {
  try {
    document.dispatchEvent(new CustomEvent('lingua:storage', { detail: { ok } }));
  } catch { /* kein DOM (Tests) */ }
}
export function storageHealthy() { return !writeFailed; }

// Fabrik für einen pro-Nutzer-getrennten localStorage-Speicher.
// Kapselt das früher 4× kopierte Muster: nutzerbezogener Schlüssel,
// Cache mit Invalidierung bei Nutzerwechsel, defensives Lesen/Schreiben.
//
//   const store = createUserStore('lingualearn_cards_');
//   store.get()            → aktueller Wert (Default, wenn nichts/kein Login)
//   store.save(value)      → schreibt und cached
//   store.mutate(fn)       → lädt, ruft fn(value), schreibt zurück
//   store.reinit()         → Cache leeren (nach Login/Logout)
//
// options.defaults: Startwert bei leerem Speicher (Default {}).
// options.merge(raw): optionale Normalisierung geladener Rohdaten
//   (z. B. verschachtelte Defaults ergänzen).
export function createUserStore(keyPrefix, options = {}) {
  const makeDefaults = typeof options.defaults === 'function'
    ? options.defaults
    : () => (options.defaults !== undefined ? structuredClone(options.defaults) : {});
  const merge = options.merge || (raw => raw);

  let cache = null;
  let cacheKey = null;

  function storageKey() {
    const user = getCurrentUser();
    return user ? keyPrefix + user : null;
  }

  function get() {
    const key = storageKey();
    if (!key) return makeDefaults();
    if (cache && cacheKey === key) return cache;
    let raw;
    try {
      raw = JSON.parse(localStorage.getItem(key) || 'null');
    } catch {
      raw = null;
    }
    cache = raw === null ? makeDefaults() : merge(raw);
    cacheKey = key;
    return cache;
  }

  function save(value) {
    const key = storageKey();
    if (!key) return;
    cache = value;
    cacheKey = key;
    try {
      localStorage.setItem(key, JSON.stringify(value));
      if (writeFailed) { writeFailed = false; notifyStorage(true); }
    } catch {
      // Speicher voll o. Ä.: NICHT verschlucken — sonst lernt man weiter,
      // während nichts mehr gespeichert wird.
      if (!writeFailed) { writeFailed = true; notifyStorage(false); }
    }
  }

  function mutate(fn) {
    const value = get();
    const result = fn(value);
    save(result === undefined ? value : result);
    return cache;
  }

  function reinit() { cache = null; cacheKey = null; }

  return { get, save, mutate, reinit };
}
