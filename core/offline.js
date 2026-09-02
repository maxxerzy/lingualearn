import { deckMeta } from '../js/data/decks/meta.js';

// Offline-Sicherung je Deck.
//
// Die App-Hülle (Code, Grammatik, Wendungen) liegt komplett im Precache
// des Service Workers. Die Deck-Dateien selbst sind bewusst NICHT dabei:
// zusammen rund 900 KB, von denen man meist eine einzige braucht. Ein
// Deck landet daher erst im Cache, wenn man es zum ersten Mal öffnet —
// wer im Flugzeug eine Sprache startet, die er auf diesem Gerät noch nie
// geöffnet hat, stünde ohne Karten da.
//
// Dieses Modul legt die Entscheidung in die Hand des Nutzers: Ein
// Schalter je Deck („Für offline sichern") holt die Datei vorab in
// denselben Cache, aus dem der Service Worker ausliefert. Zusätzlich
// sichert sich das aktive Deck nach der ersten abgeschlossenen Lektion
// von selbst.

// Datei-URL eines Decks — exakt die, die `core/state.js` beim
// dynamischen Import anfragt, sonst greift der Cache-Treffer nicht.
export function deckAssetUrl(language) {
  return new URL(`js/data/decks/${language}.js`, document.baseURI).href;
}

// Sprachen mit Strichfolge-Daten (js/data/strokes/) — dieselbe Datei-URL,
// die `ui/strokeOrder.js` beim dynamischen Import anfragt.
const STROKE_LANGS = ['zh', 'ja'];
export function strokeAssetUrl(language) {
  return new URL(`js/data/strokes/${language}.js`, document.baseURI).href;
}

export function offlineDecks() {
  return deckMeta.map(m => ({ ...m, url: deckAssetUrl(m.language) }));
}

export function deckBytes(deckId) {
  return deckMeta.find(m => m.id === deckId)?.bytes || 0;
}

export function formatBytes(n) {
  if (!n) return '—';
  const mb = n / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(1).replace('.', ',')} MB`;
  return `${Math.round(n / 1024)} KB`;
}

// ── Zugriff auf den Cache des Service Workers ────────────────────
// Der Name (`lingualearn-vNN`) steht im Service Worker und ändert sich
// mit jedem Release — statt ihn hier zu spiegeln, fragen wir ihn ab.
// Klappt das nicht (kein Service Worker, privater Modus), fällt die
// Funktion auf den zuletzt angelegten Cache zurück; gibt es auch den
// nicht, bleibt alles deaktiviert statt kaputt.
let cacheNamePromise = null;

function askServiceWorker() {
  return new Promise(resolve => {
    if (!navigator.serviceWorker?.controller && !navigator.serviceWorker?.ready) { resolve(null); return; }
    const timer = setTimeout(() => resolve(null), 2500);
    navigator.serviceWorker.ready.then(reg => {
      const sw = reg.active || navigator.serviceWorker.controller;
      if (!sw) { clearTimeout(timer); resolve(null); return; }
      const ch = new MessageChannel();
      ch.port1.onmessage = e => { clearTimeout(timer); resolve(e.data?.cacheName || null); };
      sw.postMessage({ type: 'CACHE_NAME' }, [ch.port2]);
    }).catch(() => { clearTimeout(timer); resolve(null); });
  });
}

async function newestAppCache() {
  const keys = await caches.keys();
  const mine = keys.filter(k => k.startsWith('lingualearn-'));
  return mine.length ? mine[mine.length - 1] : null;
}

export async function appCache() {
  if (!('caches' in window)) return null;
  if (!cacheNamePromise) {
    cacheNamePromise = (async () => (await askServiceWorker()) || (await newestAppCache()))();
  }
  const name = await cacheNamePromise;
  if (!name) return null;
  try { return await caches.open(name); } catch { return null; }
}

// Nach einem Update (neue CACHE_VERSION) zeigt der gemerkte Name auf
// einen gelöschten Cache — dann neu erfragen.
export function forgetCacheName() { cacheNamePromise = null; }

export function offlineSupported() {
  return typeof window !== 'undefined' && 'caches' in window;
}

// ── Zustand & Aktionen ───────────────────────────────────────────

export async function isDeckSaved(deckId) {
  const cache = await appCache();
  if (!cache) return false;
  const meta = deckMeta.find(m => m.id === deckId);
  if (!meta) return true;               // importierte Decks liegen im localStorage
  return !!(await cache.match(deckAssetUrl(meta.language)));
}

// Alle gesicherten Deck-IDs — eine Cache-Abfrage je Deck, aber parallel.
export async function savedDeckIds() {
  const cache = await appCache();
  if (!cache) return [];
  const hits = await Promise.all(deckMeta.map(async m =>
    (await cache.match(deckAssetUrl(m.language))) ? m.id : null));
  return hits.filter(Boolean);
}

export async function saveDeckOffline(deckId) {
  const cache = await appCache();
  const meta = deckMeta.find(m => m.id === deckId);
  if (!cache || !meta) return false;
  const url = deckAssetUrl(meta.language);
  const alreadySaved = await cache.match(url);
  try {
    if (!alreadySaved) await cache.add(url);
    // Strichfolge gehört zur Sprache, nicht zum Deck — mitsichern, wenn
    // vorhanden, aber ein Fehlschlag hier soll das Deck selbst nicht kosten.
    if (STROKE_LANGS.includes(meta.language)) {
      await cache.add(strokeAssetUrl(meta.language)).catch(() => {});
    }
    return true;
  } catch {
    return false;                        // offline oder Speicher voll
  }
}

export async function removeDeckOffline(deckId) {
  const cache = await appCache();
  const meta = deckMeta.find(m => m.id === deckId);
  if (!cache || !meta) return false;
  if (STROKE_LANGS.includes(meta.language)) {
    await cache.delete(strokeAssetUrl(meta.language)).catch(() => {});
  }
  return cache.delete(deckAssetUrl(meta.language));
}

// Nach der ersten abgeschlossenen Lektion sichert sich das aktive Deck
// selbst — wer eine Sprache wirklich lernt, soll sie auch ohne Netz
// weiterlernen können, ohne vorher an einen Schalter gedacht zu haben.
// Läuft im Hintergrund und darf ruhig fehlschlagen.
export function autoSaveDeck(deckId) {
  if (!offlineSupported()) return;
  saveDeckOffline(deckId).catch(() => {});
}
