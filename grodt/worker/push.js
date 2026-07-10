// Push-Subscription-Verwaltung + Versand an alle Geräte eines Sync-Codes.

import { jsonResponse, jsonError } from './cache.js';
import { sendWebPush } from './webpush.js';

export function handlePushKey(env) {
  if (!env.VAPID_PUBLIC_KEY) return jsonError('Push ist nicht konfiguriert (VAPID-Keys fehlen)', 503);
  return jsonResponse(
    { publicKey: env.VAPID_PUBLIC_KEY },
    { 'Cache-Control': 'public, max-age=86400' }
  );
}

export async function handlePushSubscribe(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonError('Ungültiger JSON-Body', 400);
  }
  const { code, subscription } = body || {};
  if (!code || !subscription?.endpoint || !subscription?.keys?.p256dh || !subscription?.keys?.auth) {
    return jsonError('code und vollständige subscription erforderlich', 400);
  }
  const user = await env.DB.prepare('SELECT code FROM users WHERE code = ?').bind(code).first();
  if (!user) return jsonError('Sync-Code unbekannt', 404);

  await env.DB.prepare(
    'INSERT INTO push_subs (endpoint, code, sub, created_at) VALUES (?, ?, ?, ?) ON CONFLICT(endpoint) DO UPDATE SET code = excluded.code, sub = excluded.sub'
  ).bind(subscription.endpoint, code, JSON.stringify(subscription), Date.now()).run();
  return jsonResponse({ ok: true }, { 'Cache-Control': 'no-store' }, 201);
}

export async function handlePushUnsubscribe(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonError('Ungültiger JSON-Body', 400);
  }
  const endpoint = body?.endpoint;
  if (!endpoint) return jsonError('endpoint erforderlich', 400);
  await env.DB.prepare('DELETE FROM push_subs WHERE endpoint = ?').bind(endpoint).run();
  return jsonResponse({ ok: true }, { 'Cache-Control': 'no-store' });
}

/** Testmitteilung an alle Geräte eines Codes (Verifikation am iPhone). */
export async function handlePushTest(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonError('Ungültiger JSON-Body', 400);
  }
  const code = body?.code;
  if (!code) return jsonError('code erforderlich', 400);
  const sent = await pushToCode(env, code, {
    title: 'GRODT Testmitteilung',
    body: 'Push funktioniert — Alarme erreichen dieses Gerät. 🎉',
    url: '/#/watchlist',
  });
  if (sent === 0) return jsonError('Keine Push-Subscription für diesen Code registriert', 404);
  return jsonResponse({ ok: true, sent }, { 'Cache-Control': 'no-store' });
}

/** Sendet payload an alle Subscriptions eines Codes; räumt tote Endpunkte weg. */
export async function pushToCode(env, code, payload) {
  const rows = await env.DB.prepare('SELECT endpoint, sub FROM push_subs WHERE code = ?')
    .bind(code).all();
  const subs = rows.results || [];
  let sent = 0;
  for (const row of subs) {
    try {
      const status = await sendWebPush(env, JSON.parse(row.sub), payload);
      if (status === 404 || status === 410) {
        await env.DB.prepare('DELETE FROM push_subs WHERE endpoint = ?').bind(row.endpoint).run();
      } else if (status < 300) {
        sent++;
      }
    } catch (err) {
      console.error('Push-Versand fehlgeschlagen:', err.message);
    }
  }
  return sent;
}
