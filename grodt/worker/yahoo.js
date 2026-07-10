// Zentraler Yahoo-Finance-Zugriff: Browser-User-Agent, Cookie+Crumb-Handling
// für die Endpunkte, die es brauchen (quoteSummary, v7/quote, Screener),
// ein Retry gegen query2 bei 429/5xx.

const BROWSER_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

const AUTH_MAX_AGE_MS = 8 * 3600 * 1000;

async function metaGet(env, key) {
  const row = await env.DB.prepare('SELECT value, updated_at FROM meta WHERE key = ?').bind(key).first();
  return row ? { value: JSON.parse(row.value), updatedAt: row.updated_at } : null;
}

async function metaPut(env, key, value) {
  await env.DB.prepare(
    'INSERT INTO meta (key, value, updated_at) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at'
  ).bind(key, JSON.stringify(value), Date.now()).run();
}

/** Holt (und cached in D1) Yahoo-Session-Cookie + Crumb. */
export async function getYahooAuth(env, force = false) {
  if (!force) {
    const cached = await metaGet(env, 'yahoo_auth');
    if (cached && Date.now() - cached.updatedAt < AUTH_MAX_AGE_MS) return cached.value;
  }

  // Schritt 1: fc.yahoo.com setzt die A3/A1-Cookies (Antwort selbst ist 404 — egal).
  const cookieRes = await fetch('https://fc.yahoo.com/', {
    headers: { 'User-Agent': BROWSER_UA },
    redirect: 'manual',
  });
  const setCookie = cookieRes.headers.get('set-cookie') || '';
  const cookie = setCookie.split(',').map((c) => c.split(';')[0].trim()).filter(Boolean).join('; ');
  if (!cookie) throw new Error('Yahoo-Cookie konnte nicht bezogen werden');

  // Schritt 2: Crumb zum Cookie abholen.
  const crumbRes = await fetch('https://query1.finance.yahoo.com/v1/test/getcrumb', {
    headers: { 'User-Agent': BROWSER_UA, Cookie: cookie },
  });
  const crumb = (await crumbRes.text()).trim();
  if (!crumbRes.ok || !crumb || crumb.includes('<')) throw new Error('Yahoo-Crumb konnte nicht bezogen werden');

  const auth = { cookie, crumb };
  await metaPut(env, 'yahoo_auth', auth);
  return auth;
}

/**
 * Yahoo-Fetch mit optionalem Crumb. path beginnt mit '/', z. B.
 * '/v8/finance/chart/SAP.DE'. params als Objekt.
 */
export async function yahooFetch(env, path, params = {}, { needsCrumb = false } = {}) {
  let auth = null;
  if (needsCrumb) auth = await getYahooAuth(env);

  const attempt = async (host, currentAuth) => {
    const url = new URL(`https://${host}${path}`);
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, String(v));
    }
    if (currentAuth) url.searchParams.set('crumb', currentAuth.crumb);
    const headers = { 'User-Agent': BROWSER_UA, Accept: 'application/json' };
    if (currentAuth) headers.Cookie = currentAuth.cookie;
    return fetch(url.toString(), { headers });
  };

  let res = await attempt('query1.finance.yahoo.com', auth);

  // Ungültiger Crumb → Auth genau einmal erneuern.
  if (needsCrumb && (res.status === 401 || res.status === 403)) {
    auth = await getYahooAuth(env, true);
    res = await attempt('query1.finance.yahoo.com', auth);
  }

  // Überlastung/Serverfehler → ein Versuch gegen query2.
  if (res.status === 429 || res.status >= 500) {
    res = await attempt('query2.finance.yahoo.com', auth);
  }

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Yahoo ${path} antwortete ${res.status}: ${body.slice(0, 200)}`);
  }
  return res.json();
}

/** Roh-Text-Fetch (RSS-Feeds). */
export async function yahooFetchText(url) {
  const res = await fetch(url, { headers: { 'User-Agent': BROWSER_UA } });
  if (!res.ok) throw new Error(`Yahoo-Feed ${url} antwortete ${res.status}`);
  return res.text();
}
