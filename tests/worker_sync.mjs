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
      delete: async k => { store.delete(k); },
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

// ── Optimistisches Sperren: veraltete Revision wird abgewiesen ──
{
  const env2 = makeEnv();
  const p1 = await call(env2, '/api/sync/push', {
    user: 'maxim', token: TOKEN_A, baseRev: 0, snapshot: snap({ 'lingualearn_game_': { xp: 10 } }),
  });
  const b1 = await p1.json();
  check('Push liefert eine Revision', p1.status === 200 && b1.rev === 1, JSON.stringify(b1));

  // Gerät B hat noch rev 0 gesehen → Push muss abgelehnt werden.
  const stale = await call(env2, '/api/sync/push', {
    user: 'maxim', token: TOKEN_A, baseRev: 0, snapshot: snap({ 'lingualearn_game_': { xp: 5 } }),
  });
  const sb = await stale.json();
  check('Veralteter Push wird mit 409 + aktuellem Stand abgelehnt',
    stale.status === 409 && sb.rev === 1 && sb.snapshot?.data?.['lingualearn_game_']?.xp === 10,
    `${stale.status} ${JSON.stringify(sb.rev)}`);

  // Mit der frischen Revision klappt es.
  const retry = await call(env2, '/api/sync/push', {
    user: 'maxim', token: TOKEN_A, baseRev: 1, snapshot: snap({ 'lingualearn_game_': { xp: 12 } }),
  });
  check('Nach erneutem Zusammenführen geht der Push durch',
    retry.status === 200 && (await retry.json()).rev === 2);

  // Ohne baseRev (Client ohne Sperr-Unterstützung) bleibt alles nutzbar.
  const legacy = await call(env2, '/api/sync/push', {
    user: 'maxim', token: TOKEN_A, snapshot: snap({ 'lingualearn_game_': { xp: 13 } }),
  });
  check('Push ohne Revisionsangabe bleibt möglich', legacy.status === 200);
}

// ── Konto löschen ──
{
  const env3 = makeEnv();
  await call(env3, '/api/sync/push', { user: 'maxim', token: TOKEN_A, snapshot: snap({ x: 1 }) });
  const wrong = await call(env3, '/api/sync/delete', { user: 'maxim', token: TOKEN_B });
  check('Löschen mit fremdem Schlüssel wird abgelehnt', wrong.status === 403);

  const del = await call(env3, '/api/sync/delete', { user: 'maxim', token: TOKEN_A });
  check('Konto löschen entfernt Stand und Zugang',
    del.status === 200 && env3._store.size === 0, `size=${env3._store.size}`);

  // Danach ist der Name wieder frei (neuer Zugang wird angelegt).
  const after = await call(env3, '/api/sync/pull', { user: 'maxim', token: TOKEN_B });
  check('Nach dem Löschen ist der Kontoname wieder frei',
    after.status === 200 && (await after.json()).snapshot === null);
}

// ── Freundesliga: echte Rangliste statt simulierter Gegner ──
{
  const env = makeEnv();
  const WEEK = '2026-W20';

  // Erster Push legt die Gruppe an UND registriert das Mitglied.
  const p1 = await call(env, '/api/league/push', {
    user: 'anna', token: TOKEN_A, code: 'freunde1', name: 'Anna', xp: 120, weekId: WEEK, division: 2,
  });
  const p1b = await p1.json();
  check('Erster Push legt die Gruppe an', p1.status === 200 && p1b.ok && p1b.members.anna?.xp === 120,
    JSON.stringify(p1b));

  // Zweites Konto tritt über denselben Code bei.
  const p2 = await call(env, '/api/league/push', {
    user: 'bela', token: TOKEN_B, code: 'FREUNDE1', name: 'Béla', xp: 340, weekId: WEEK, division: 1,
  });
  const p2b = await p2.json();
  check('Zweites Konto tritt über den Code bei (Groß/klein egal)',
    p2.status === 200 && p2b.ok && p2b.members.anna && p2b.members.bela?.xp === 340, JSON.stringify(p2b));

  // Beide Mitglieder sehen sich gegenseitig in der Rangliste.
  const pull = await call(env, '/api/league/pull', { user: 'anna', token: TOKEN_A, code: 'freunde1' });
  const pullBody = await pull.json();
  check('Zwei Konten sehen sich gegenseitig in der Rangliste',
    pull.status === 200 && pullBody.ok
    && pullBody.members.anna?.name === 'Anna' && pullBody.members.bela?.name === 'Béla',
    JSON.stringify(pullBody.members));

  // Ein fremder Token darf nicht unter Annas Namen pushen.
  const spoof = await call(env, '/api/league/push', {
    user: 'anna', token: TOKEN_B, code: 'freunde1', name: 'Falsch', xp: 99999, weekId: WEEK, division: 0,
  });
  check('Fremder Token kann Annas Stand nicht überschreiben', spoof.status === 403);
  const afterSpoof = await call(env, '/api/league/pull', { user: 'anna', token: TOKEN_A, code: 'freunde1' });
  check('Annas Stand blieb dabei unverändert',
    (await afterSpoof.json()).members.anna?.xp === 120);

  // Anna aktualisiert ihren eigenen Stand erneut — das bleibt erlaubt.
  const update = await call(env, '/api/league/push', {
    user: 'anna', token: TOKEN_A, code: 'freunde1', name: 'Anna', xp: 250, weekId: WEEK, division: 2,
  });
  check('Anna kann ihren eigenen Stand weiter aktualisieren',
    update.status === 200 && (await update.json()).members.anna?.xp === 250);

  // Ungültiger Code / Name / Woche werden abgewiesen.
  const badCode = await call(env, '/api/league/push', {
    user: 'anna', token: TOKEN_A, code: '!!', name: 'Anna', xp: 1, weekId: WEEK, division: 0,
  });
  check('Ungültiger Code wird abgewiesen', badCode.status === 400);
  const badWeek = await call(env, '/api/league/push', {
    user: 'anna', token: TOKEN_A, code: 'freunde1', name: 'Anna', xp: 1, weekId: 'letzte-woche', division: 0,
  });
  check('Ungültige Wochen-ID wird abgewiesen', badWeek.status === 400);

  // Gruppe verlassen entfernt die Zeile — der Code bleibt für andere gültig.
  const leave = await call(env, '/api/league/leave', { user: 'bela', token: TOKEN_B, code: 'freunde1' });
  check('Gruppe verlassen entfernt die eigene Zeile',
    leave.status === 200 && (await leave.json()).left === true);
  const afterLeave = await call(env, '/api/league/pull', { user: 'anna', token: TOKEN_A, code: 'freunde1' });
  const afterLeaveBody = await afterLeave.json();
  check('Nach dem Verlassen: der andere Name bleibt bestehen, Béla ist weg',
    !!afterLeaveBody.members.anna && !afterLeaveBody.members.bela, JSON.stringify(afterLeaveBody.members));

  // Béla kann demselben Code danach wieder beitreten.
  const rejoin = await call(env, '/api/league/push', {
    user: 'bela', token: TOKEN_B, code: 'freunde1', name: 'Béla', xp: 10, weekId: WEEK, division: 0,
  });
  check('Erneutes Beitreten mit demselben Code funktioniert', rejoin.status === 200);

  // Gruppengröße ist gedeckelt — bestehende Mitglieder dürfen aber weiter aktualisieren.
  const envFull = makeEnv();
  for (let i = 0; i < 20; i++) {
    await call(envFull, '/api/league/push', {
      user: `user${i}`, token: TOKEN_A, code: 'vollgrp', name: `U${i}`, xp: i, weekId: WEEK, division: 0,
    });
  }
  const full = await call(envFull, '/api/league/push', {
    user: 'user20', token: TOKEN_A, code: 'vollgrp', name: 'U20', xp: 1, weekId: WEEK, division: 0,
  });
  check('Die 21. Person kommt nicht mehr in eine volle Gruppe', full.status === 403);
  const stillUpdatable = await call(envFull, '/api/league/push', {
    user: 'user0', token: TOKEN_A, code: 'vollgrp', name: 'U0', xp: 999, weekId: WEEK, division: 0,
  });
  check('Bestehende Mitglieder können in der vollen Gruppe weiter aktualisieren',
    stillUpdatable.status === 200 && (await stillUpdatable.json()).members.user0?.xp === 999);

  // Fremde Gruppen sind über den Sync-Token nicht ohne Weiteres erreichbar —
  // derselbe Token gilt pro (Code, Konto) unabhängig, nicht global.
  const p3 = await call(env, '/api/league/push', {
    user: 'anna', token: TOKEN_A, code: 'anderecode', name: 'Anna', xp: 5, weekId: WEEK, division: 0,
  });
  check('Derselbe Konto-Token funktioniert unabhängig auch in einer zweiten Gruppe', p3.status === 200);
}

console.log(`\n${failures === 0 ? '🎉 WORKER-SYNC OK' : `❌ ${failures} Fehler`}`);
process.exit(failures === 0 ? 0 : 1);
