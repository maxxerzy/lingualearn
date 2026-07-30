// LinguaLearn — Worker: liefert die statische App aus und stellt zusätzlich
// die Sync-API bereit, über die ein Konto seinen Lernstand geräteübergreifend
// abgleicht (Handy ↔ iPad ↔ Mac).
//
// WICHTIG: Alles außer /api/… geht unverändert an die statischen Assets.
// Fehlt der KV-Speicher (Binding SYNC), bleibt die App voll funktionsfähig —
// die Sync-Endpunkte antworten dann mit 503 und der Client lernt weiter
// lokal. Dadurch kann der Worker gefahrlos vor dem KV-Setup live gehen.

const MAX_BODY = 2_000_000;        // 2 MB Snapshot-Limit (reicht weit)
const json = (obj, status = 200) => new Response(JSON.stringify(obj), {
  status,
  headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
});

// Token wird nie im Klartext gespeichert — nur sein SHA-256-Abdruck.
async function digest(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(String(text)));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

// Zeitkonstanter Vergleich (verhindert Rückschlüsse über die Antwortzeit).
function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function validUser(u) {
  return typeof u === 'string' && u.length >= 2 && u.length <= 64;
}
function validToken(t) {
  return typeof t === 'string' && t.length >= 16 && t.length <= 256 && /^[a-f0-9]+$/i.test(t);
}

// Prüft den Zugang. Beim ERSTEN Zugriff eines Kontos wird der Token
// hinterlegt (Trust-on-first-use); danach muss er übereinstimmen.
async function authorize(env, user, token, { create }) {
  const key = `auth:${user}`;
  const stored = await env.SYNC.get(key);
  const fingerprint = await digest(`${user}:${token}`);
  if (!stored) {
    if (!create) return { ok: false, status: 404 };
    await env.SYNC.put(key, fingerprint);
    return { ok: true, fresh: true };
  }
  if (!safeEqual(stored, fingerprint)) return { ok: false, status: 403 };
  return { ok: true };
}

async function readBody(request) {
  const len = Number(request.headers.get('content-length') || 0);
  if (len > MAX_BODY) return null;
  try {
    const body = await request.json();
    return body && typeof body === 'object' ? body : null;
  } catch {
    return null;
  }
}

export async function handleApi(request, env, url) {
  if (request.method !== 'POST') return json({ ok: false, error: 'method' }, 405);
  if (!env || !env.SYNC) {
    return json({ ok: false, error: 'sync-not-configured' }, 503);
  }

  const body = await readBody(request);
  if (!body) return json({ ok: false, error: 'bad-request' }, 400);
  const { user, token } = body;
  if (!validUser(user) || !validToken(token)) return json({ ok: false, error: 'bad-credentials' }, 400);

  const path = url.pathname.replace(/\/+$/, '');

  if (path === '/api/sync/pull') {
    const auth = await authorize(env, user, token, { create: false });
    // Noch nichts gespeichert → kein Fehler, nur „nichts da".
    if (!auth.ok && auth.status === 404) return json({ ok: true, snapshot: null });
    if (!auth.ok) return json({ ok: false, error: 'forbidden' }, 403);
    const raw = await env.SYNC.get(`snap:${user}`);
    return json({ ok: true, snapshot: raw ? JSON.parse(raw) : null });
  }

  if (path === '/api/sync/push') {
    const { snapshot } = body;
    if (!snapshot || typeof snapshot !== 'object' || typeof snapshot.data !== 'object') {
      return json({ ok: false, error: 'bad-snapshot' }, 400);
    }
    const auth = await authorize(env, user, token, { create: true });
    if (!auth.ok) return json({ ok: false, error: 'forbidden' }, 403);
    const payload = JSON.stringify({
      version: 1,
      updatedAt: Date.now(),
      device: typeof snapshot.device === 'string' ? snapshot.device.slice(0, 40) : '',
      data: snapshot.data,
    });
    if (payload.length > MAX_BODY) return json({ ok: false, error: 'too-large' }, 413);
    await env.SYNC.put(`snap:${user}`, payload);
    return json({ ok: true, updatedAt: JSON.parse(payload).updatedAt });
  }

  return json({ ok: false, error: 'not-found' }, 404);
}

export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      if (url.pathname.startsWith('/api/')) {
        return await handleApi(request, env, url);
      }
    } catch (err) {
      // Ein Fehler in der API darf die App niemals unerreichbar machen.
      try {
        const url = new URL(request.url);
        if (url.pathname.startsWith('/api/')) return json({ ok: false, error: 'server' }, 500);
      } catch { /* fällt unten auf die Assets zurück */ }
    }
    return env.ASSETS.fetch(request);
  },
};
