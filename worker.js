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
function validCode(c) {
  return typeof c === 'string' && /^[A-Za-z0-9]{4,10}$/.test(c);
}
function validName(n) {
  return typeof n === 'string' && n.trim().length >= 1 && n.length <= 40;
}
function validWeekId(w) {
  return typeof w === 'string' && /^\d{4}-W\d{1,2}$/.test(w);
}

// Prüft den Zugang unter einem beliebigen KV-Schlüssel. Beim ERSTEN
// Zugriff wird der Token hinterlegt (Trust-on-first-use); danach muss er
// übereinstimmen. Dieselbe Funktion sichert sowohl den Geräte-Abgleich
// (Schlüssel `auth:<user>`) als auch die Freundesliga (Schlüssel
// `league-auth:<code>:<user>`) — eine Identität pro Konto, unabhängig
// davon, wie viele Freundesgruppen es beitritt.
async function authorize(env, key, user, token, { create }) {
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
    const auth = await authorize(env, `auth:${user}`, user, token, { create: false });
    // Noch nichts gespeichert → kein Fehler, nur „nichts da".
    if (!auth.ok && auth.status === 404) return json({ ok: true, snapshot: null });
    if (!auth.ok) return json({ ok: false, error: 'forbidden' }, 403);
    const raw = await env.SYNC.get(`snap:${user}`);
    return json({ ok: true, snapshot: raw ? JSON.parse(raw) : null });
  }

  if (path === '/api/sync/push') {
    const { snapshot, baseRev } = body;
    if (!snapshot || typeof snapshot !== 'object' || typeof snapshot.data !== 'object') {
      return json({ ok: false, error: 'bad-snapshot' }, 400);
    }
    const auth = await authorize(env, `auth:${user}`, user, token, { create: true });
    if (!auth.ok) return json({ ok: false, error: 'forbidden' }, 403);

    // Optimistisches Sperren: Der Client schickt die Revision, auf der
    // sein Zusammenführen beruht. Hat inzwischen ein anderes Gerät
    // hochgeladen, wird der Push mit 409 + aktuellem Stand abgelehnt —
    // der Client führt neu zusammen und versucht es erneut. Ohne diese
    // Prüfung könnte der Stand eines Geräts den eines anderen
    // überschreiben, das im selben Moment gepusht hat.
    const rawNow = await env.SYNC.get(`snap:${user}`);
    const current = rawNow ? JSON.parse(rawNow) : null;
    const currentRev = Number(current?.rev) || 0;
    if (baseRev !== undefined && Number(baseRev) !== currentRev) {
      return json({ ok: false, error: 'conflict', rev: currentRev, snapshot: current }, 409);
    }

    const updatedAt = Date.now();
    const rev = currentRev + 1;
    const payload = JSON.stringify({
      version: 1,
      rev,
      updatedAt,
      device: typeof snapshot.device === 'string' ? snapshot.device.slice(0, 40) : '',
      data: snapshot.data,
    });
    if (payload.length > MAX_BODY) return json({ ok: false, error: 'too-large' }, 413);
    await env.SYNC.put(`snap:${user}`, payload);
    return json({ ok: true, updatedAt, rev });
  }

  // Konto löschen: entfernt Stand UND Zugangsabdruck. Danach ist der
  // Kontoname wieder frei (erneutes Anlegen legt einen neuen Abdruck an).
  if (path === '/api/sync/delete') {
    const auth = await authorize(env, `auth:${user}`, user, token, { create: false });
    if (!auth.ok && auth.status === 404) return json({ ok: true, deleted: false });
    if (!auth.ok) return json({ ok: false, error: 'forbidden' }, 403);
    if (typeof env.SYNC.delete === 'function') {
      await env.SYNC.delete(`snap:${user}`);
      await env.SYNC.delete(`auth:${user}`);
    }
    return json({ ok: true, deleted: true });
  }

  // ── Freundesliga: Wochen-XP mit echten Freunden teilen ──────────
  // Eine Gruppe ist ein selbstgewählter Code, kein eigenes Konto —
  // wer ihn kennt, kann beitreten. Pro (Code, Konto) gilt dieselbe
  // Trust-on-first-use-Identität wie beim Geräte-Abgleich, damit
  // niemand den Wochenstand eines anderen Mitglieds überschreiben kann.
  const LEAGUE_MAX_MEMBERS = 20;

  if (path === '/api/league/push') {
    const { code, name, xp, weekId, division } = body;
    if (!validCode(code)) return json({ ok: false, error: 'bad-code' }, 400);
    if (!validName(name)) return json({ ok: false, error: 'bad-name' }, 400);
    if (!validWeekId(weekId)) return json({ ok: false, error: 'bad-week' }, 400);
    const codeKey = code.toUpperCase();
    const auth = await authorize(env, `league-auth:${codeKey}:${user}`, user, token, { create: true });
    if (!auth.ok) return json({ ok: false, error: 'forbidden' }, 403);

    const raw = await env.SYNC.get(`league:${codeKey}`);
    const doc = raw ? JSON.parse(raw) : { members: {} };
    if (!doc.members[user] && Object.keys(doc.members).length >= LEAGUE_MAX_MEMBERS) {
      return json({ ok: false, error: 'group-full' }, 403);
    }
    doc.members[user] = {
      name: name.trim().slice(0, 24),
      xp: Math.max(0, Math.min(200_000, Math.round(Number(xp)) || 0)),
      weekId,
      division: Math.max(0, Math.min(20, Math.round(Number(division)) || 0)),
      updatedAt: Date.now(),
    };
    const payload = JSON.stringify(doc);
    if (payload.length > MAX_BODY) return json({ ok: false, error: 'too-large' }, 413);
    await env.SYNC.put(`league:${codeKey}`, payload);
    return json({ ok: true, members: doc.members });
  }

  if (path === '/api/league/pull') {
    const { code } = body;
    if (!validCode(code)) return json({ ok: false, error: 'bad-code' }, 400);
    const raw = await env.SYNC.get(`league:${code.toUpperCase()}`);
    const doc = raw ? JSON.parse(raw) : { members: {} };
    return json({ ok: true, members: doc.members });
  }

  if (path === '/api/league/leave') {
    const { code } = body;
    if (!validCode(code)) return json({ ok: false, error: 'bad-code' }, 400);
    const codeKey = code.toUpperCase();
    const auth = await authorize(env, `league-auth:${codeKey}:${user}`, user, token, { create: false });
    if (!auth.ok && auth.status === 404) return json({ ok: true, left: false });
    if (!auth.ok) return json({ ok: false, error: 'forbidden' }, 403);
    const raw = await env.SYNC.get(`league:${codeKey}`);
    const doc = raw ? JSON.parse(raw) : { members: {} };
    delete doc.members[user];
    await env.SYNC.put(`league:${codeKey}`, JSON.stringify(doc));
    if (typeof env.SYNC.delete === 'function') await env.SYNC.delete(`league-auth:${codeKey}:${user}`);
    return json({ ok: true, left: true });
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
