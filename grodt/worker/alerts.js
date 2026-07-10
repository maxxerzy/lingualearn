// Serverseitige Alarm-Prüfung (Cron */5): lädt aktive Alarme aller
// Sync-Codes, holt Quotes gebündelt, wertet mit dem geteilten alertEval aus
// und verschickt Push-Nachrichten.

import { evaluateAlert } from '../public/js/core/alertEval.js';
import { getQuotesData } from './marketdata.js';
import { pushToCode } from './push.js';

// Erneute Benachrichtigung desselben Dauer-Alarms frühestens nach 6 h.
const RENOTIFY_AFTER_MS = 6 * 3600 * 1000;

function partsIn(timeZone, date) {
  const fmt = new Intl.DateTimeFormat('de-DE', {
    timeZone, hour12: false, weekday: 'short', hour: '2-digit', minute: '2-digit',
  });
  const parts = Object.fromEntries(fmt.formatToParts(date).map((p) => [p.type, p.value]));
  return { weekday: parts.weekday, minutes: parseInt(parts.hour, 10) * 60 + parseInt(parts.minute, 10) };
}

export function isMarketOpen(date = new Date()) {
  const weekend = new Set(['Sa', 'So']);
  // XETRA: Mo–Fr 09:00–17:30 Europe/Berlin (+15 min Puffer).
  const de = partsIn('Europe/Berlin', date);
  const deOpen = !weekend.has(de.weekday) && de.minutes >= 9 * 60 && de.minutes <= 17 * 60 + 45;
  // US: Mo–Fr 09:30–16:00 America/New_York (+15 min Puffer).
  const us = partsIn('America/New_York', date);
  const usOpen = !weekend.has(us.weekday) && us.minutes >= 9 * 60 + 30 && us.minutes <= 16 * 60 + 15;
  return deOpen || usOpen;
}

export async function runAlertCheck(env) {
  const useFixtures = env.USE_FIXTURES === '1' || env.USE_FIXTURES === 'true';
  if (!useFixtures && !isMarketOpen()) return { skipped: 'geschlossen' };

  const rows = await env.DB.prepare(
    "SELECT code, rev, data FROM blobs WHERE collection = 'alerts' AND data != '{}'"
  ).all();

  const perCode = [];
  const symbols = new Set();
  for (const row of rows.results || []) {
    let parsed;
    try {
      parsed = JSON.parse(row.data);
    } catch {
      continue;
    }
    const active = (parsed.items || []).filter((a) => a.active !== false);
    if (!active.length) continue;
    perCode.push({ code: row.code, rev: row.rev, doc: parsed, active });
    for (const a of active) symbols.add(a.symbol);
  }
  if (!perCode.length) return { checked: 0, fired: 0 };

  const { quotes } = await getQuotesData(env, [...symbols].sort());
  const now = Date.now();
  let fired = 0;

  for (const entry of perCode) {
    let docChanged = false;
    for (const alert of entry.active) {
      const quote = quotes[alert.symbol];
      const hit = evaluateAlert(alert, quote);
      if (!hit) continue;

      const state = await env.DB.prepare(
        'SELECT last_notified_at FROM alert_state WHERE code = ? AND alert_id = ?'
      ).bind(entry.code, alert.id).first();
      if (state?.last_notified_at && now - state.last_notified_at < RENOTIFY_AFTER_MS) continue;

      await env.DB.prepare(
        'INSERT INTO alert_state (code, alert_id, triggered_at, last_notified_at) VALUES (?, ?, ?, ?) ON CONFLICT(code, alert_id) DO UPDATE SET triggered_at = excluded.triggered_at, last_notified_at = excluded.last_notified_at'
      ).bind(entry.code, alert.id, now, now).run();

      await pushToCode(env, entry.code, {
        title: hit.title,
        body: hit.body,
        url: `/#/s/${encodeURIComponent(alert.symbol)}`,
      });
      fired++;

      if (alert.oneShot !== false) {
        const item = entry.doc.items.find((i) => i.id === alert.id);
        if (item) {
          item.active = false;
          item.triggeredAt = now;
          item.updatedAt = now;
          docChanged = true;
        }
      }
    }

    if (docChanged) {
      // Rev-Bump, damit die Clients die Deaktivierung beim nächsten Pull sehen.
      await env.DB.prepare(
        'UPDATE blobs SET rev = rev + 1, data = ?, updated_at = ? WHERE code = ? AND collection = ? AND rev = ?'
      ).bind(JSON.stringify(entry.doc), now, entry.code, 'alerts', entry.rev).run();
    }
  }
  return { checked: perCode.length, fired };
}
