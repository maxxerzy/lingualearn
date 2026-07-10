// Konfliktauflösung beim Sync: vereinigt lokalen und entfernten Stand einer
// Collection. Item-Collections (watchlists, alerts, portfolio) mergen per
// id + updatedAt (Last-Write-Wins je Item) und Tombstones für Löschungen;
// settings merged Last-Write-Wins je Schlüssel.

const TOMBSTONE_MAX_AGE_MS = 30 * 24 * 3600 * 1000;

export function mergeCollection(name, local, remote) {
  if (name === 'settings') return mergeSettings(local, remote);
  return mergeItems(local, remote);
}

function mergeItems(local, remote) {
  const l = normalizeDoc(local);
  const r = normalizeDoc(remote);

  // Tombstones vereinigen (neueste deletedAt je id) und alte prunen.
  const tomb = new Map();
  for (const t of [...l.tombstones, ...r.tombstones]) {
    if (!t?.id) continue;
    const existing = tomb.get(t.id);
    if (!existing || t.deletedAt > existing.deletedAt) tomb.set(t.id, t);
  }
  const cutoff = Date.now() - TOMBSTONE_MAX_AGE_MS;

  // Items vereinigen: neueres updatedAt gewinnt; Tombstone schlägt Item,
  // wenn die Löschung neuer als die letzte Item-Änderung ist.
  const items = new Map();
  for (const item of [...l.items, ...r.items]) {
    if (!item?.id) continue;
    const existing = items.get(item.id);
    if (!existing || (item.updatedAt || 0) > (existing.updatedAt || 0)) items.set(item.id, item);
  }
  for (const [id, t] of tomb) {
    const item = items.get(id);
    if (item && (t.deletedAt || 0) >= (item.updatedAt || 0)) items.delete(id);
  }

  return {
    items: [...items.values()].sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || (a.createdAt || 0) - (b.createdAt || 0)),
    tombstones: [...tomb.values()].filter((t) => (t.deletedAt || 0) > cutoff),
  };
}

function mergeSettings(local, remote) {
  const lv = local?.values || {};
  const rv = remote?.values || {};
  const values = { ...rv };
  for (const [key, entry] of Object.entries(lv)) {
    if (!values[key] || (entry.updatedAt || 0) > (values[key].updatedAt || 0)) values[key] = entry;
  }
  return { values };
}

function normalizeDoc(doc) {
  return {
    items: Array.isArray(doc?.items) ? doc.items : [],
    tombstones: Array.isArray(doc?.tombstones) ? doc.tombstones : [],
  };
}

/** Hilfsfunktion für Views: Item löschen = entfernen + Tombstone anlegen. */
export function removeItem(doc, id) {
  const now = Date.now();
  return {
    items: (doc.items || []).filter((i) => i.id !== id),
    tombstones: [...(doc.tombstones || []), { id, deletedAt: now }],
  };
}

/** Item einfügen oder ersetzen (setzt updatedAt). */
export function upsertItem(doc, item) {
  const now = Date.now();
  const items = [...(doc.items || [])];
  const idx = items.findIndex((i) => i.id === item.id);
  const stamped = { ...item, updatedAt: now };
  if (idx >= 0) items[idx] = stamped;
  else items.push({ createdAt: now, ...stamped });
  return { items, tombstones: doc.tombstones || [] };
}
