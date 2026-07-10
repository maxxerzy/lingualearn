// GRODT-Worker: bedient /api/*, alles andere liefert das Assets-Binding.

import { jsonError, jsonResponse } from './cache.js';
import { checkRateLimit } from './ratelimit.js';
import {
  handleChart, handleQuotes, handleSearch, handleFundamentals, handleNews, handleMovers,
} from './marketdata.js';
import { handleSyncCreate, handleSyncGet, handleSyncPut } from './sync.js';
import {
  handlePushKey, handlePushSubscribe, handlePushUnsubscribe, handlePushTest,
} from './push.js';
import { runAlertCheck } from './alerts.js';

// Fallback-Symbollisten für /api/movers, wenn der Yahoo-Screener klemmt.
const MOVERS_FALLBACK = {
  DE: [
    'SAP.DE', 'SIE.DE', 'ALV.DE', 'DTE.DE', 'AIR.DE', 'MUV2.DE', 'RHM.DE', 'BMW.DE', 'BAS.DE', 'BAYN.DE',
    'IFX.DE', 'DBK.DE', 'ADS.DE', 'EOAN.DE', 'DHL.DE', 'MBG.DE', 'VOW3.DE', 'RWE.DE', 'HEI.DE', 'CBK.DE',
  ],
  US: [
    'AAPL', 'MSFT', 'NVDA', 'AMZN', 'GOOGL', 'META', 'TSLA', 'AVGO', 'BRK-B', 'JPM',
    'LLY', 'V', 'UNH', 'XOM', 'MA', 'COST', 'HD', 'PG', 'NFLX', 'AMD',
  ],
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (!url.pathname.startsWith('/api/')) {
      return env.ASSETS.fetch(request);
    }

    const limited = checkRateLimit(request);
    if (limited) return limited;

    try {
      return await route(request, env, ctx, url);
    } catch (err) {
      console.error(`Fehler in ${url.pathname}:`, err.stack || err.message);
      return jsonError(`Datenabruf fehlgeschlagen: ${err.message}`, 502);
    }
  },

  async scheduled(_event, env, ctx) {
    ctx.waitUntil(
      runAlertCheck(env).then((r) => console.log('Alarm-Lauf:', JSON.stringify(r)))
    );
  },
};

async function route(request, env, ctx, url) {
  const { pathname, origin } = url;
  const method = request.method;

  if (pathname === '/api/health') {
    return jsonResponse({ ok: true, time: Date.now() }, { 'Cache-Control': 'no-store' });
  }

  // --- Marktdaten (GET) ---
  if (method === 'GET') {
    switch (pathname) {
      case '/api/chart': return handleChart(request, env, ctx, origin);
      case '/api/quotes': return handleQuotes(request, env, ctx, origin);
      case '/api/search': return handleSearch(request, env, ctx, origin);
      case '/api/fundamentals': return handleFundamentals(request, env, ctx, origin);
      case '/api/news': return handleNews(request, env, ctx, origin);
      case '/api/movers': return handleMovers(request, env, ctx, origin, (r) => MOVERS_FALLBACK[r]);
      case '/api/push/key': return handlePushKey(env);
    }
  }

  // --- Sync ---
  if (pathname === '/api/sync' && method === 'POST') return handleSyncCreate(env);
  const syncMatch = pathname.match(/^\/api\/sync\/([^/]+)(?:\/([a-z]+))?$/);
  if (syncMatch) {
    const [, code, collection] = syncMatch;
    if (method === 'GET' && !collection) return handleSyncGet(request, env, code);
    if (method === 'PUT' && collection) return handleSyncPut(request, env, code, collection);
  }

  // --- Push ---
  if (method === 'POST') {
    switch (pathname) {
      case '/api/push/subscribe': return handlePushSubscribe(request, env);
      case '/api/push/unsubscribe': return handlePushUnsubscribe(request, env);
      case '/api/push/test': return handlePushTest(request, env);
    }
  }

  // Test-Hook für den Cron im Fixture-Modus (wrangler dev --test-scheduled
  // deckt das ebenfalls ab; dieser Weg funktioniert auch in Playwright).
  if (pathname === '/api/debug/run-alerts' && method === 'POST' && (env.USE_FIXTURES === '1' || env.USE_FIXTURES === 'true')) {
    return jsonResponse(await runAlertCheck(env), { 'Cache-Control': 'no-store' });
  }

  return jsonError('Unbekannter Endpunkt', 404);
}
