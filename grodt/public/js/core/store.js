// Mini-Store: benannte Slices mit subscribe/update. Die vier synchronisierten
// Slices (watchlists, alerts, portfolio, settings) werden in localStorage
// persistiert und tragen Sync-Metadaten (rev je Collection, dirty-Flag).

const LS_PREFIX = 'grodt_';
export const SYNCED_SLICES = ['watchlists', 'alerts', 'portfolio', 'settings'];

const EMPTY = {
  watchlists: () => ({ items: [], tombstones: [] }),
  alerts: () => ({ items: [], tombstones: [] }),
  portfolio: () => ({ items: [], tombstones: [] }),
  settings: () => ({ values: {} }),
};

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(LS_PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  try {
    localStorage.setItem(LS_PREFIX + key, JSON.stringify(value));
  } catch (err) {
    console.warn('localStorage-Schreibfehler:', err);
  }
}

const state = {
  watchlists: load('watchlists', EMPTY.watchlists()),
  alerts: load('alerts', EMPTY.alerts()),
  portfolio: load('portfolio', EMPTY.portfolio()),
  settings: load('settings', EMPTY.settings()),
  // Ephemer:
  quotes: {},
  ui: { route: null, live: false },
};

// Sync-Metadaten: { code, revs: {slice: n}, dirty: {slice: bool} }
let syncMeta = load('syncMeta', { code: null, revs: {}, dirty: {} });

const listeners = new Map(); // slice → Set<cb>

export function getState() {
  return state;
}

export function subscribe(slice, cb) {
  if (!listeners.has(slice)) listeners.set(slice, new Set());
  listeners.get(slice).add(cb);
  return () => listeners.get(slice)?.delete(cb);
}

function notify(slice) {
  for (const cb of listeners.get(slice) || []) {
    try {
      cb(state[slice]);
    } catch (err) {
      console.error(`Listener-Fehler (${slice}):`, err);
    }
  }
  for (const cb of listeners.get('*') || []) cb(slice, state[slice]);
}

/**
 * Slice aktualisieren. updater bekommt den aktuellen Wert und liefert den
 * neuen. remote=true kennzeichnet vom Server übernommene Stände (kein
 * dirty-Flag, keine erneute Sync-Push-Runde).
 */
export function update(slice, updater, { remote = false } = {}) {
  const next = updater(state[slice]);
  if (next === undefined) throw new Error(`update(${slice}): updater muss neuen Wert liefern`);
  state[slice] = next;
  if (SYNCED_SLICES.includes(slice)) {
    save(slice, next);
    if (!remote) {
      syncMeta.dirty[slice] = true;
      save('syncMeta', syncMeta);
    }
  }
  notify(slice);
}

// --- Sync-Metadaten ---

export function getSyncMeta() {
  return syncMeta;
}

export function setSyncMeta(patch) {
  syncMeta = { ...syncMeta, ...patch };
  save('syncMeta', syncMeta);
}

export function setCollectionRev(slice, rev) {
  syncMeta.revs = { ...syncMeta.revs, [slice]: rev };
  save('syncMeta', syncMeta);
}

export function clearDirty(slice) {
  syncMeta.dirty = { ...syncMeta.dirty, [slice]: false };
  save('syncMeta', syncMeta);
}

// --- Settings-Komfort (LWW je Schlüssel, mergefähig) ---

export function getSetting(key, fallback = null) {
  return state.settings.values?.[key]?.v ?? fallback;
}

export function setSetting(key, value) {
  update('settings', (s) => ({
    values: { ...(s.values || {}), [key]: { v: value, updatedAt: Date.now() } },
  }));
}

/** Nicht synchronisierte lokale Präferenz (z. B. Snapshots, letzte Suche). */
export function localGet(key, fallback = null) {
  return load(key, fallback);
}

export function localSet(key, value) {
  save(key, value);
}
