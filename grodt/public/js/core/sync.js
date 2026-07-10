// Sync-Engine: hält die vier Collections mit dem Worker/D1 abgeglichen.
// Push: debounced 2 s nach jeder lokalen Änderung. Pull: bei Start, Fokus,
// visibilitychange und alle 60 s. Konflikt (409) → lokal mergen → erneut.

import { apiSend, apiGet } from './api.js';
import {
  getState, update, subscribe, getSyncMeta, setSyncMeta, setCollectionRev, clearDirty, SYNCED_SLICES,
} from './store.js';
import { mergeCollection } from './merge.js';

const PUSH_DEBOUNCE_MS = 2000;
const PULL_INTERVAL_MS = 60000;

let pushTimer = null;
let pulling = false;
let started = false;
let statusCb = null;

export function onSyncStatus(cb) {
  statusCb = cb;
}

function reportStatus(status) {
  if (statusCb) statusCb(status); // 'idle' | 'syncing' | 'offline' | 'off'
}

export function hasSyncProfile() {
  return !!getSyncMeta().code;
}

/** Neues Sync-Profil am Server anlegen; lokaler Stand wird hochgeladen. */
export async function createProfile() {
  const { code } = await apiSend('/api/sync', 'POST');
  setSyncMeta({ code, revs: {}, dirty: Object.fromEntries(SYNCED_SLICES.map((s) => [s, true])) });
  await pushDirtyNow();
  return code;
}

/** Vorhandenen Code übernehmen: Serverstand holen und mit lokalem mergen. */
export async function joinProfile(code) {
  const data = await apiGet(`/api/sync/${encodeURIComponent(code)}`, {}, { ttl: 0, fresh: true });
  setSyncMeta({ code: normalizeInput(code), revs: {}, dirty: {} });
  const collections = data.collections || {};
  for (const slice of SYNCED_SLICES) {
    const remote = collections[slice];
    if (!remote) continue;
    const merged = mergeCollection(slice, getState()[slice], remote.data);
    update(slice, () => merged, { remote: true });
    setCollectionRev(slice, remote.rev);
    // Lokale Bestände sollen aufs Server-Profil — als dirty markieren.
    setSyncMeta({ dirty: { ...getSyncMeta().dirty, [slice]: true } });
  }
  await pushDirtyNow();
}

export function leaveProfile() {
  setSyncMeta({ code: null, revs: {}, dirty: {} });
  reportStatus('off');
}

function normalizeInput(code) {
  const cleaned = code.toUpperCase().replace(/[^0-9A-Z]/g, '');
  return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 8)}-${cleaned.slice(8, 12)}`;
}

// --- Push (lokale Änderungen hochladen) ---

function schedulePush() {
  if (!hasSyncProfile()) return;
  clearTimeout(pushTimer);
  pushTimer = setTimeout(() => pushDirtyNow().catch(() => {}), PUSH_DEBOUNCE_MS);
}

async function pushDirtyNow() {
  const meta = getSyncMeta();
  if (!meta.code) return;
  reportStatus('syncing');
  try {
    for (const slice of SYNCED_SLICES) {
      if (!meta.dirty?.[slice]) continue;
      await pushSlice(slice);
    }
    reportStatus('idle');
  } catch (err) {
    reportStatus(navigator.onLine ? 'idle' : 'offline');
    throw err;
  }
}

async function pushSlice(slice, attempt = 0) {
  const meta = getSyncMeta();
  const baseRev = meta.revs?.[slice] ?? 0;
  try {
    const res = await apiSend(`/api/sync/${encodeURIComponent(meta.code)}/${slice}`, 'PUT', {
      baseRev,
      data: getState()[slice],
    });
    setCollectionRev(slice, res.rev);
    clearDirty(slice);
  } catch (err) {
    if (err.status === 409 && err.data && attempt < 3) {
      // Konflikt: Serverstand einmergen, Revision übernehmen, erneut senden.
      const merged = mergeCollection(slice, getState()[slice], err.data.data);
      update(slice, () => merged, { remote: true });
      setCollectionRev(slice, err.data.rev);
      return pushSlice(slice, attempt + 1);
    }
    throw err;
  }
}

// --- Pull (Serverstand holen) ---

export async function pullNow() {
  const meta = getSyncMeta();
  if (!meta.code || pulling) return;
  pulling = true;
  reportStatus('syncing');
  try {
    const since = SYNCED_SLICES.map((s) => `${s}:${meta.revs?.[s] ?? 0}`).join(',');
    const data = await apiGet(`/api/sync/${encodeURIComponent(meta.code)}`, { since }, { ttl: 0, fresh: true });
    for (const [slice, remote] of Object.entries(data.collections || {})) {
      if (!SYNCED_SLICES.includes(slice)) continue;
      const merged = mergeCollection(slice, getState()[slice], remote.data);
      update(slice, () => merged, { remote: true });
      setCollectionRev(slice, remote.rev);
    }
    reportStatus('idle');
  } catch (err) {
    reportStatus(navigator.onLine ? 'idle' : 'offline');
    console.warn('Sync-Pull fehlgeschlagen:', err.message);
  } finally {
    pulling = false;
  }
}

// --- Lifecycle ---

export function startSync() {
  if (started) return;
  started = true;

  for (const slice of SYNCED_SLICES) {
    subscribe(slice, () => {
      if (getSyncMeta().dirty?.[slice]) schedulePush();
    });
  }

  window.addEventListener('focus', () => pullNow());
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) pullNow();
  });
  window.addEventListener('online', () => {
    pushDirtyNow().catch(() => {});
    pullNow();
  });
  setInterval(() => {
    if (!document.hidden) pullNow();
  }, PULL_INTERVAL_MS);

  if (hasSyncProfile()) {
    pullNow();
    pushDirtyNow().catch(() => {});
  } else {
    reportStatus('off');
  }
}
