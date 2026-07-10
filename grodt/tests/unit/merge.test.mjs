import test from 'node:test';
import assert from 'node:assert/strict';
import { mergeCollection, removeItem, upsertItem } from '../../public/js/core/merge.js';

test('merge: Union per id, neueres updatedAt gewinnt', () => {
  const local = { items: [{ id: 'a', name: 'Alt', updatedAt: 100 }], tombstones: [] };
  const remote = { items: [{ id: 'a', name: 'Neu', updatedAt: 200 }, { id: 'b', name: 'Nur remote', updatedAt: 150 }], tombstones: [] };
  const merged = mergeCollection('watchlists', local, remote);
  assert.equal(merged.items.length, 2);
  assert.equal(merged.items.find((i) => i.id === 'a').name, 'Neu');
});

test('merge: Tombstone schlägt älteres Item, nicht neueres', () => {
  const local = { items: [], tombstones: [{ id: 'x', deletedAt: 500 }] };
  const remoteOld = { items: [{ id: 'x', updatedAt: 400 }], tombstones: [] };
  const remoteNew = { items: [{ id: 'x', updatedAt: 600 }], tombstones: [] };
  assert.equal(mergeCollection('alerts', local, remoteOld).items.length, 0);
  assert.equal(mergeCollection('alerts', local, remoteNew).items.length, 1);
});

test('merge: Portfolio ist Mengen-Union (append-only)', () => {
  const local = { items: [{ id: 't1', kind: 'buy', updatedAt: 1 }], tombstones: [] };
  const remote = { items: [{ id: 't2', kind: 'sell', updatedAt: 2 }], tombstones: [] };
  const merged = mergeCollection('portfolio', local, remote);
  assert.equal(merged.items.length, 2);
});

test('merge: Settings Last-Write-Wins je Schlüssel', () => {
  const local = { values: { theme: { v: 'dark', updatedAt: 200 }, key: { v: 'l', updatedAt: 100 } } };
  const remote = { values: { theme: { v: 'light', updatedAt: 100 }, key: { v: 'r', updatedAt: 300 } } };
  const merged = mergeCollection('settings', local, remote);
  assert.equal(merged.values.theme.v, 'dark');
  assert.equal(merged.values.key.v, 'r');
});

test('merge: alte Tombstones werden gepruned', () => {
  const old = Date.now() - 40 * 24 * 3600 * 1000;
  const merged = mergeCollection('alerts',
    { items: [], tombstones: [{ id: 'old', deletedAt: old }] },
    { items: [], tombstones: [{ id: 'fresh', deletedAt: Date.now() }] });
  assert.deepEqual(merged.tombstones.map((t) => t.id), ['fresh']);
});

test('removeItem/upsertItem: Roundtrip', () => {
  let doc = { items: [], tombstones: [] };
  doc = upsertItem(doc, { id: 'a', name: 'Test' });
  assert.equal(doc.items.length, 1);
  assert.ok(doc.items[0].updatedAt > 0);
  doc = removeItem(doc, 'a');
  assert.equal(doc.items.length, 0);
  assert.equal(doc.tombstones[0].id, 'a');
});
