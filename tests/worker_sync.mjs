// Server-Logik der Geräte-Synchronisation (worker.js) isoliert prüfen.
// Läuft ohne Cloudflare: KV wird durch eine Map ersetzt.
import { handleApi } from '../worker.js';

let failures = 0;
const check = (n, c, d = '') => { console.log(`${c ? '✅' : '❌'} ${n}${d ? ' — ' + d : ''}`); if (!c) failures++; };

function makeEnv() {
  const store = new Map();
  return {
    SYNC: {
      get: async k => (store.has(k) ? store.get(k) : null),
      put: async (k, v) => { store.set(k, v); },
    },
    _store: store,
  };
}
const call = (env, path, payload, method = 'POST') =>
  handleApi(new Request(`https://x.dev${path}`, {
    method,
    headers: { 'content-type': 'application/json' },
    body: method === 'POST' ? JSON.stringify(payload) : undefined,
  }), env, new URL(`https://x.dev${path}`));

const TOKEN_A = 'a'.repeat(64);
const TOKEN_B = 'b'.repeat(64);
const snap = data => ({ data, device: 'test' });

// ── Ohne KV-Binding bleibt die App nutzbar, die API meldet das sauber ──
{
  const res = await call({}, '/api/sync/pull', { user: 'maxim', token: TOKEN_A });
  check('Ohne KV-Speicher: 503 statt Absturz', res.status === 503,
    JSON.stringify(await res.clone().json()));
}

// ── Erstes Gerät: nichts da, dann hochladen ──
const env = makeEnv();
{
  const res = await call(env, '/api/sync/pull', { user: 'maxim', token: TOKEN_A });
  const body = await res.json();
  check('Neues Konto: pull liefert leeren Stand', res.status === 200 && body.ok && body.snapshot === null);
}
{
  const res = await call(env, '/api/sync/push', {
    user: 'maxim', token: TOKEN_A, snapshot: snap({ 'lingualearn_game_': { xp: 500 } }),
  });
  check('Erstes Hochladen legt Konto an', res.status === 200 && (await res.json()).ok);
}

// ── Zweites Gerät mit denselben Zugangsdaten bekommt den Stand ──
{
  const res = await call(env, '/api/sync/pull', { user: 'maxim', token: TOKEN_A });
  const body = await res.json();
  check('Zweites Gerät erhält denselben Stand',
    body.snapshot?.data?.['lingualearn_game_']?.xp === 500, JSON.stringify(body.snapshot?.data));
}

// ── Fremder Token darf weder lesen noch schreiben ──
{
  const r1 = await call(env, '/api/sync/pull', { user: 'maxim', token: TOKEN_B });
  const r2 = await call(env, '/api/sync/push', { user: 'maxim', token: TOKEN_B, snapshot: snap({ x: 1 }) });
  check('Falsches Passwort: kein Zugriff (403)', r1.status === 403 && r2.status === 403,
    `pull=${r1.status} push=${r2.status}`);
}
{
  const res = await call(env, '/api/sync/pull', { user: 'maxim', token: TOKEN_A });
  check('Daten nach Fremdzugriff unverändert',
    (await res.json()).snapshot?.data?.['lingualearn_game_']?.xp === 500);
}

// ── Der Login-Schlüssel darf nicht im Klartext gespeichert sein ──
{
  const dump = [...env._store.values()].join('|');
  check('Token wird nur als Abdruck gespeichert', !dump.includes(TOKEN_A));
}

// ── Fehlerhafte Eingaben werden abgewiesen ──
{
  const r1 = await call(env, '/api/sync/pull', { user: 'x', token: TOKEN_A });          // Name zu kurz
  const r2 = await call(env, '/api/sync/pull', { user: 'maxim', token: 'kurz' });        // Token ungültig
  const r3 = await call(env, '/api/sync/push', { user: 'maxim', token: TOKEN_A });       // kein Snapshot
  const r4 = await call(env, '/api/sync/pull', {}, 'GET');                               // falsche Methode
  const r5 = await call(env, '/api/unbekannt', { user: 'maxim', token: TOKEN_A });       // unbekannter Pfad
  check('Ungültige Anfragen werden abgewiesen',
    r1.status === 400 && r2.status === 400 && r3.status === 400 && r4.status === 405 && r5.status === 404,
    [r1, r2, r3, r4, r5].map(r => r.status).join(','));
}

// ── Zweites Konto ist von maxim getrennt ──
{
  await call(env, '/api/sync/push', { user: 'anna', token: TOKEN_B, snapshot: snap({ 'lingualearn_game_': { xp: 7 } }) });
  const res = await call(env, '/api/sync/pull', { user: 'anna', token: TOKEN_B });
  const other = await call(env, '/api/sync/pull', { user: 'maxim', token: TOKEN_A });
  check('Konten sind sauber getrennt',
    (await res.json()).snapshot.data['lingualearn_game_'].xp === 7 &&
    (await other.json()).snapshot.data['lingualearn_game_'].xp === 500);
}

console.log(`\n${failures === 0 ? '🎉 WORKER-SYNC OK' : `❌ ${failures} Fehler`}`);
process.exit(failures === 0 ? 0 : 1);
