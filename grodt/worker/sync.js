// Geräte-Sync: vier JSON-Collections je Sync-Code mit Revisionszähler und
// Compare-and-Swap-Schreibzugriff (Konflikt → 409 mit Serverstand, der
// Client merged und versucht es erneut).

import { jsonResponse, jsonError } from './cache.js';

export const COLLECTIONS = ['watchlists', 'alerts', 'portfolio', 'settings'];

// Crockford-Base32 ohne verwechselbare Zeichen.
const CODE_ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

function generateCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  let code = '';
  for (let i = 0; i < 12; i++) {
    if (i > 0 && i % 4 === 0) code += '-';
    code += CODE_ALPHABET[bytes[i] % 32];
  }
  return code;
}

function normalizeCode(raw) {
  const cleaned = (raw || '').toUpperCase().replace(/[^0-9A-Z]/g, '');
  if (cleaned.length !== 12) return null;
  return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 8)}-${cleaned.slice(8, 12)}`;
}

export async function handleSyncCreate(env) {
  const code = generateCode();
  const now = Date.now();
  await env.DB.prepare('INSERT INTO users (code, created_at, last_seen) VALUES (?, ?, ?)')
    .bind(code, now, now).run();
  const stmt = env.DB.prepare(
    'INSERT INTO blobs (code, collection, rev, data, updated_at) VALUES (?, ?, 0, ?, ?)'
  );
  await env.DB.batch(COLLECTIONS.map((c) => stmt.bind(code, c, '{}', now)));
  return jsonResponse({ code }, { 'Cache-Control': 'no-store' }, 201);
}

export async function handleSyncGet(request, env, rawCode) {
  const code = normalizeCode(rawCode);
  if (!code) return jsonError('Ungültiger Sync-Code', 400);
  const user = await env.DB.prepare('SELECT code FROM users WHERE code = ?').bind(code).first();
  if (!user) return jsonError('Sync-Code unbekannt', 404);

  // since=watchlists:3,portfolio:7 → nur Collections mit neuerer Revision.
  const since = {};
  const sinceParam = new URL(request.url).searchParams.get('since') || '';
  for (const part of sinceParam.split(',')) {
    const [name, rev] = part.split(':');
    if (COLLECTIONS.includes(name)) since[name] = parseInt(rev, 10) || 0;
  }

  const rows = await env.DB.prepare('SELECT collection, rev, data FROM blobs WHERE code = ?')
    .bind(code).all();
  const collections = {};
  for (const row of rows.results || []) {
    if (since[row.collection] !== undefined && row.rev <= since[row.collection]) continue;
    collections[row.collection] = { rev: row.rev, data: JSON.parse(row.data) };
  }
  await env.DB.prepare('UPDATE users SET last_seen = ? WHERE code = ?').bind(Date.now(), code).run();
  return jsonResponse({ collections }, { 'Cache-Control': 'no-store' });
}

export async function handleSyncPut(request, env, rawCode, collection) {
  const code = normalizeCode(rawCode);
  if (!code) return jsonError('Ungültiger Sync-Code', 400);
  if (!COLLECTIONS.includes(collection)) return jsonError('Unbekannte Collection', 400);

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonError('Ungültiger JSON-Body', 400);
  }
  const { baseRev, data } = body || {};
  if (!Number.isInteger(baseRev) || data === undefined) {
    return jsonError('baseRev und data erforderlich', 400);
  }
  const payload = JSON.stringify(data);
  if (payload.length > 512 * 1024) return jsonError('Datensatz zu groß', 413);

  const now = Date.now();
  // CAS: nur schreiben, wenn die Revision noch stimmt.
  const result = await env.DB.prepare(
    'UPDATE blobs SET rev = rev + 1, data = ?, updated_at = ? WHERE code = ? AND collection = ? AND rev = ?'
  ).bind(payload, now, code, collection, baseRev).run();

  if (result.meta.changes === 0) {
    const current = await env.DB.prepare(
      'SELECT rev, data FROM blobs WHERE code = ? AND collection = ?'
    ).bind(code, collection).first();
    if (!current) return jsonError('Sync-Code unbekannt', 404);
    return jsonResponse(
      { conflict: true, rev: current.rev, data: JSON.parse(current.data) },
      { 'Cache-Control': 'no-store' },
      409
    );
  }
  return jsonResponse({ rev: baseRev + 1 }, { 'Cache-Control': 'no-store' });
}
