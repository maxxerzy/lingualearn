// core/storage.js
// Universelle, lokale Speicher-Abstraktion für LinguaLearn:
// 1. Synchroner L1-In-Memory-Cache (0 ms Latenz für alle bestehenden Aufrufer).
// 2. Persistente IndexedDB ('lingualearn_idb', Store 'keyval') für unbegrenzte Quota (> 1 GB).
// 3. Automatisches Mirroring / Fallback mit localStorage für Abwärtskompatibilität.
// 4. Speicheranalyse & Quota-Ermittlung via navigator.storage.estimate().

const DB_NAME = 'lingualearn_idb';
const DB_VERSION = 1;
const STORE_NAME = 'keyval';

// L1 In-Memory-Cache
const memCache = new Map();
const quotaExceededKeys = new Set();
let idbAvailable = typeof indexedDB !== 'undefined';
let dbInstance = null;
let initPromise = null;

function getLocalStorage() {
  try {
    return typeof globalThis.localStorage !== 'undefined' ? globalThis.localStorage : null;
  } catch {
    return null;
  }
}

// Öffnet IndexedDB defensiv
function openDB() {
  if (!idbAvailable) return Promise.resolve(null);
  if (dbInstance) return Promise.resolve(dbInstance);

  return new Promise(resolve => {
    try {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = e => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      req.onsuccess = e => {
        dbInstance = e.target.result;
        resolve(dbInstance);
      };
      req.onerror = () => {
        idbAvailable = false;
        resolve(null);
      };
    } catch {
      idbAvailable = false;
      resolve(null);
    }
  });
}

// Asynchroner Schreibzugriff auf IndexedDB im Hintergrund
function putToIDB(key, val) {
  if (!idbAvailable) return;
  openDB().then(db => {
    if (!db) return;
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put(val, key);
    } catch {
      /* ignore */
    }
  });
}

// Asynchrones Löschen aus IndexedDB im Hintergrund
function deleteFromIDB(key) {
  if (!idbAvailable) return;
  openDB().then(db => {
    if (!db) return;
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(key);
    } catch {
      /* ignore */
    }
  });
}

export const storage = {
  // Synchrones Lesen: priorisiert localStorage, fällt bei QuotaExceeded auf L1-Cache/IndexedDB zurück
  getItem(key) {
    const ls = getLocalStorage();
    if (ls) {
      try {
        const val = ls.getItem(key);
        if (val !== null) {
          memCache.set(key, val);
          return val;
        }
        // Falls im localStorage null: prüfen ob es ein Quota-Überlauf ist
        if (quotaExceededKeys.has(key)) {
          return memCache.get(key) || null;
        }
        return null;
      } catch {
        /* ignore */
      }
    }
    return memCache.has(key) ? memCache.get(key) : null;
  },

  // Synchrones Schreiben in L1-Cache + localStorage, asynchron in IndexedDB
  setItem(key, value) {
    const str = String(value);
    memCache.set(key, str);

    // In localStorage spiegeln (sofern Quota nicht überschritten)
    const ls = getLocalStorage();
    if (ls) {
      try {
        ls.setItem(key, str);
        quotaExceededKeys.delete(key);
      } catch {
        // Quota überschritten: kein Absturz, IndexedDB + L1-Cache sichern den Stand ab
        quotaExceededKeys.add(key);
      }
    }

    // Dauerhaft in IndexedDB sichern
    putToIDB(key, str);
  },

  // Löschen
  removeItem(key) {
    memCache.delete(key);
    quotaExceededKeys.delete(key);
    const ls = getLocalStorage();
    if (ls) {
      try { ls.removeItem(key); } catch { /* ignore */ }
    }
    deleteFromIDB(key);
  },

  // Alles leeren
  clear() {
    memCache.clear();
    quotaExceededKeys.clear();
    const ls = getLocalStorage();
    if (ls) {
      try { ls.clear(); } catch { /* ignore */ }
    }
    if (idbAvailable) {
      openDB().then(db => {
        if (!db) return;
        try {
          const tx = db.transaction(STORE_NAME, 'readwrite');
          tx.objectStore(STORE_NAME).clear();
        } catch { /* ignore */ }
      });
    }
  },

  // Asynchrone Initialisierung beim App-Start:
  // Migriert bestehende Daten aus localStorage in IndexedDB und lädt IndexedDB-Stände in den Cache
  async init() {
    if (initPromise) return initPromise;
    initPromise = (async () => {
      const ls = getLocalStorage();
      const db = await openDB();

      if (db) {
        // 1. Alle Einträge aus IndexedDB laden und in L1-Cache spiegeln
        await new Promise(resolve => {
          try {
            const tx = db.transaction(STORE_NAME, 'readonly');
            const store = tx.objectStore(STORE_NAME);
            const req = store.openCursor();
            req.onsuccess = e => {
              const cursor = e.target.result;
              if (cursor) {
                memCache.set(cursor.key, cursor.value);
                // Auch in localStorage spiegeln, falls noch Platz
                if (ls && !ls.getItem(cursor.key)) {
                  try { ls.setItem(cursor.key, cursor.value); } catch { /* ignore */ }
                }
                cursor.continue();
              } else {
                resolve();
              }
            };
            req.onerror = () => resolve();
          } catch {
            resolve();
          }
        });

        // 2. Bestehende localStorage-Keys (die noch nicht in IDB sind) nach IDB migrieren
        if (ls) {
          try {
            for (let i = 0; i < ls.length; i++) {
              const k = ls.key(i);
              if (k && (k.startsWith('lingualearn_') || k.startsWith('ll3_'))) {
                if (!memCache.has(k)) {
                  const val = ls.getItem(k);
                  if (val !== null) {
                    memCache.set(k, val);
                    putToIDB(k, val);
                  }
                }
              }
            }
          } catch { /* ignore */ }
        }
      }
      return true;
    })();
    return initPromise;
  },

  // Gibt Auskunft über Speicherart und Quota
  async estimate() {
    if (typeof navigator !== 'undefined' && navigator.storage?.estimate) {
      try {
        const est = await navigator.storage.estimate();
        const usage = est.usage || 0;
        const quota = est.quota || 0;
        return {
          backend: idbAvailable ? 'IndexedDB' : 'localStorage',
          usageBytes: usage,
          quotaBytes: quota,
          usageFormatted: (usage / 1024).toFixed(1) + ' KB',
          quotaFormatted: (quota / (1024 * 1024)).toFixed(0) + ' MB',
          percent: quota > 0 ? ((usage / quota) * 100).toFixed(2) + '%' : '0%',
        };
      } catch {
        /* fallback */
      }
    }

    // Fallback-Berechnung über memCache
    let bytes = 0;
    for (const [k, v] of memCache.entries()) bytes += (k.length + String(v).length) * 2;
    return {
      backend: idbAvailable ? 'IndexedDB' : 'localStorage',
      usageBytes: bytes,
      quotaBytes: 5 * 1024 * 1024,
      usageFormatted: (bytes / 1024).toFixed(1) + ' KB',
      quotaFormatted: '5 MB',
      percent: ((bytes / (5 * 1024 * 1024)) * 100).toFixed(2) + '%',
    };
  },
};
