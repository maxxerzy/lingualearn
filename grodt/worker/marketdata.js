// Endpunkt-Handler für Marktdaten: rufen Yahoo ab (oder Fixtures im
// Testmodus) und normalisieren auf kompakte, stabile App-Formate.

import { yahooFetch, yahooFetchText } from './yahoo.js';
import { TTL, CLIENT_MAX_AGE, cachedJson, canonicalUrl, jsonError } from './cache.js';
import * as fixtures from './fixtures.js';

const INTRADAY_INTERVALS = new Set(['1m', '2m', '5m', '15m', '30m', '60m', '90m', '1h']);
const VALID_INTERVALS = new Set([...INTRADAY_INTERVALS, '1d', '5d', '1wk', '1mo', '3mo']);
const VALID_RANGES = new Set(['1d', '5d', '1mo', '3mo', '6mo', 'ytd', '1y', '2y', '5y', '10y', 'max']);

const useFixtures = (env) => env.USE_FIXTURES === '1' || env.USE_FIXTURES === 'true';

// ---------------------------------------------------------------- Chart ----

export async function handleChart(request, env, ctx, origin) {
  const p = new URL(request.url).searchParams;
  const symbol = (p.get('symbol') || '').trim();
  const interval = p.get('interval') || '1d';
  const range = p.get('range') || '1y';
  if (!symbol) return jsonError('Parameter symbol fehlt', 400);
  if (!VALID_INTERVALS.has(interval)) return jsonError('Ungültiges interval', 400);
  if (!VALID_RANGES.has(range)) return jsonError('Ungültige range', 400);

  const ttl = INTRADAY_INTERVALS.has(interval) ? TTL.CHART_INTRADAY : TTL.CHART_DAILY;
  const key = canonicalUrl(origin, '/api/chart', { symbol, interval, range });

  return cachedJson(ctx, key, ttl, CLIENT_MAX_AGE.CHART, async () => {
    if (useFixtures(env)) return fixtures.chart(symbol, interval, range);
    const json = await yahooFetch(env, `/v8/finance/chart/${encodeURIComponent(symbol)}`, {
      interval,
      range,
      events: 'div,split',
      includePrePost: 'false',
    });
    return normalizeChart(json, symbol);
  });
}

function normalizeChart(json, symbol) {
  const result = json?.chart?.result?.[0];
  if (!result) throw new Error(`Keine Chartdaten für ${symbol}`);
  const meta = result.meta || {};
  const ts = result.timestamp || [];
  const q = result.indicators?.quote?.[0] || {};
  const candles = [];
  for (let i = 0; i < ts.length; i++) {
    const o = q.open?.[i], h = q.high?.[i], l = q.low?.[i], c = q.close?.[i];
    if (o == null || h == null || l == null || c == null) continue;
    candles.push({ t: ts[i], o, h, l, c, v: q.volume?.[i] ?? 0 });
  }
  return {
    symbol: meta.symbol || symbol,
    currency: meta.currency || 'USD',
    exchange: meta.fullExchangeName || meta.exchangeName || '',
    timezone: meta.exchangeTimezoneName || 'UTC',
    price: meta.regularMarketPrice ?? null,
    previousClose: meta.chartPreviousClose ?? meta.previousClose ?? null,
    candles,
  };
}

// --------------------------------------------------------------- Quotes ----

export async function handleQuotes(request, env, ctx, origin) {
  const p = new URL(request.url).searchParams;
  const symbols = (p.get('symbols') || '')
    .split(',').map((s) => s.trim()).filter(Boolean).slice(0, 50);
  if (!symbols.length) return jsonError('Parameter symbols fehlt', 400);
  symbols.sort();

  const key = canonicalUrl(origin, '/api/quotes', { symbols: symbols.join(',') });
  return cachedJson(ctx, key, TTL.QUOTES, CLIENT_MAX_AGE.QUOTES, () => getQuotesData(env, symbols));
}

/** Batch-Quotes als Daten-Objekt — auch vom Alarm-Cron genutzt. */
export async function getQuotesData(env, symbols) {
  if (useFixtures(env)) return fixtures.quotes(symbols);
  try {
    const json = await yahooFetch(env, '/v7/finance/quote', { symbols: symbols.join(',') }, { needsCrumb: true });
    const list = json?.quoteResponse?.result || [];
    if (!list.length) throw new Error('v7/quote leer');
    const quotes = {};
    for (const r of list) quotes[r.symbol] = normalizeQuote(r);
    return { quotes };
  } catch {
    // Fallback ohne Crumb: v8-Chart-Meta je Symbol parallel.
    return quotesViaChartMeta(env, symbols);
  }
}

function normalizeQuote(r) {
  return {
    symbol: r.symbol,
    name: r.longName || r.shortName || r.symbol,
    price: r.regularMarketPrice ?? null,
    change: r.regularMarketChange ?? null,
    changePct: r.regularMarketChangePercent ?? null,
    previousClose: r.regularMarketPreviousClose ?? null,
    currency: r.currency || 'USD',
    marketState: r.marketState || null,
    time: r.regularMarketTime ?? null,
    dayHigh: r.regularMarketDayHigh ?? null,
    dayLow: r.regularMarketDayLow ?? null,
    volume: r.regularMarketVolume ?? null,
    exchange: r.fullExchangeName || r.exchange || '',
  };
}

async function quotesViaChartMeta(env, symbols) {
  const settled = await Promise.allSettled(
    symbols.map((s) =>
      yahooFetch(env, `/v8/finance/chart/${encodeURIComponent(s)}`, { interval: '1d', range: '1d' })
    )
  );
  const quotes = {};
  settled.forEach((outcome, i) => {
    if (outcome.status !== 'fulfilled') return;
    const meta = outcome.value?.chart?.result?.[0]?.meta;
    if (!meta) return;
    const prev = meta.chartPreviousClose ?? meta.previousClose ?? null;
    const price = meta.regularMarketPrice ?? null;
    quotes[symbols[i]] = {
      symbol: meta.symbol || symbols[i],
      name: meta.longName || meta.shortName || symbols[i],
      price,
      change: price != null && prev != null ? price - prev : null,
      changePct: price != null && prev ? ((price - prev) / prev) * 100 : null,
      previousClose: prev,
      currency: meta.currency || 'USD',
      marketState: null,
      time: meta.regularMarketTime ?? null,
      dayHigh: meta.regularMarketDayHigh ?? null,
      dayLow: meta.regularMarketDayLow ?? null,
      volume: meta.regularMarketVolume ?? null,
      exchange: meta.fullExchangeName || meta.exchangeName || '',
    };
  });
  return { quotes };
}

// --------------------------------------------------------------- Search ----

export async function handleSearch(request, env, ctx, origin) {
  const p = new URL(request.url).searchParams;
  const q = (p.get('q') || '').trim();
  if (!q) return jsonError('Parameter q fehlt', 400);
  if (q.length > 60) return jsonError('Suchbegriff zu lang', 400);

  const key = canonicalUrl(origin, '/api/search', { q: q.toLowerCase() });
  return cachedJson(ctx, key, TTL.SEARCH, CLIENT_MAX_AGE.SEARCH, async () => {
    if (useFixtures(env)) return fixtures.search(q);
    const json = await yahooFetch(env, '/v1/finance/search', {
      q, quotesCount: 15, newsCount: 0, lang: 'de-DE', region: 'DE',
    });
    const results = (json?.quotes || [])
      .filter((r) => r.symbol && (r.quoteType === 'EQUITY' || r.quoteType === 'ETF' || r.quoteType === 'INDEX'))
      .map((r) => ({
        symbol: r.symbol,
        name: r.longname || r.shortname || r.symbol,
        exchange: r.exchange || '',
        exchDisp: r.exchDisp || r.exchange || '',
        type: r.quoteType,
      }));
    return { results };
  });
}

// --------------------------------------------------------- Fundamentals ----

const QS_MODULES = [
  'price', 'summaryDetail', 'defaultKeyStatistics', 'financialData', 'assetProfile',
  'earnings', 'earningsHistory', 'earningsTrend', 'recommendationTrend', 'calendarEvents',
].join(',');

export async function handleFundamentals(request, env, ctx, origin) {
  const p = new URL(request.url).searchParams;
  const symbol = (p.get('symbol') || '').trim();
  if (!symbol) return jsonError('Parameter symbol fehlt', 400);

  const key = canonicalUrl(origin, '/api/fundamentals', { symbol });
  return cachedJson(ctx, key, TTL.FUNDAMENTALS, CLIENT_MAX_AGE.FUNDAMENTALS, async () => {
    if (useFixtures(env)) return fixtures.fundamentals(symbol);
    try {
      const json = await yahooFetch(
        env,
        `/v10/finance/quoteSummary/${encodeURIComponent(symbol)}`,
        { modules: QS_MODULES },
        { needsCrumb: true }
      );
      const data = normalizeFundamentals(json, symbol);
      // Stale-Kopie für Yahoo-Ausfälle aufheben.
      ctx.waitUntil(
        env.DB.prepare(
          'INSERT INTO meta (key, value, updated_at) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at'
        ).bind(`fund:${symbol}`, JSON.stringify(data), Date.now()).run()
      );
      return data;
    } catch (err) {
      const stale = await env.DB.prepare('SELECT value, updated_at FROM meta WHERE key = ?')
        .bind(`fund:${symbol}`).first();
      if (stale) return { ...JSON.parse(stale.value), stale: true, staleAt: stale.updated_at };
      throw err;
    }
  });
}

const raw = (v) => (v && typeof v === 'object' ? v.raw ?? null : v ?? null);

function normalizeFundamentals(json, symbol) {
  const r = json?.quoteSummary?.result?.[0];
  if (!r) throw new Error(`Keine Fundamentaldaten für ${symbol}`);
  const price = r.price || {};
  const sd = r.summaryDetail || {};
  const ks = r.defaultKeyStatistics || {};
  const fd = r.financialData || {};
  const profile = r.assetProfile || {};
  const earnings = r.earnings || {};

  const quarters = (earnings.financialsChart?.quarterly || []).map((q) => ({
    quarter: q.date,
    revenue: raw(q.revenue),
    earnings: raw(q.earnings),
  }));
  const epsHistory = (r.earningsHistory?.history || []).map((h) => ({
    quarter: h.period,
    date: raw(h.quarter),
    epsActual: raw(h.epsActual),
    epsEstimate: raw(h.epsEstimate),
    surprisePct: raw(h.surprisePercent),
  }));
  const recommendations = (r.recommendationTrend?.trend || []).map((t) => ({
    period: t.period,
    strongBuy: t.strongBuy, buy: t.buy, hold: t.hold, sell: t.sell, strongSell: t.strongSell,
  }));

  return {
    symbol,
    name: price.longName || price.shortName || symbol,
    currency: raw(price.currency) || price.currency || 'USD',
    exchange: price.exchangeName || '',
    marketCap: raw(price.marketCap) ?? raw(sd.marketCap),
    peTrailing: raw(sd.trailingPE),
    peForward: raw(ks.forwardPE) ?? raw(sd.forwardPE),
    eps: raw(ks.trailingEps),
    epsForward: raw(ks.forwardEps),
    dividendYield: raw(sd.dividendYield),
    dividendRate: raw(sd.dividendRate),
    exDividendDate: raw(sd.exDividendDate),
    payoutRatio: raw(sd.payoutRatio),
    beta: raw(sd.beta) ?? raw(ks.beta),
    week52High: raw(sd.fiftyTwoWeekHigh),
    week52Low: raw(sd.fiftyTwoWeekLow),
    avgVolume: raw(sd.averageVolume),
    priceToBook: raw(ks.priceToBook),
    profitMargin: raw(ks.profitMargins) ?? raw(fd.profitMargins),
    revenueGrowth: raw(fd.revenueGrowth),
    debtToEquity: raw(fd.debtToEquity),
    freeCashflow: raw(fd.freeCashflow),
    targetMeanPrice: raw(fd.targetMeanPrice),
    recommendationKey: fd.recommendationKey || null,
    sector: profile.sector || null,
    industry: profile.industry || null,
    country: profile.country || null,
    website: profile.website || null,
    employees: profile.fullTimeEmployees ?? null,
    summary: profile.longBusinessSummary || null,
    nextEarningsDate: raw(r.calendarEvents?.earnings?.earningsDate?.[0]),
    quarters,
    epsHistory,
    recommendations,
  };
}

// ----------------------------------------------------------------- News ----

export async function handleNews(request, env, ctx, origin) {
  const p = new URL(request.url).searchParams;
  const symbol = (p.get('symbol') || '').trim();
  const scope = (p.get('scope') || '').trim();
  if (!symbol && scope !== 'markt') return jsonError('symbol oder scope=markt erforderlich', 400);

  const key = canonicalUrl(origin, '/api/news', { symbol, scope });
  return cachedJson(ctx, key, TTL.NEWS, CLIENT_MAX_AGE.NEWS, async () => {
    if (useFixtures(env)) return fixtures.news(symbol || 'markt');
    const items = symbol ? await newsForSymbol(env, symbol) : await marketNews(env);
    items.sort((a, b) => b.time - a.time);
    // Nach URL/UUID deduplizieren.
    const seen = new Set();
    const deduped = items.filter((n) => {
      const id = n.id || n.link;
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });
    return { items: deduped.slice(0, 40) };
  });
}

async function newsForSymbol(env, symbol) {
  const [searchNews, rssNews] = await Promise.allSettled([
    yahooFetch(env, '/v1/finance/search', { q: symbol, quotesCount: 0, newsCount: 20 }),
    yahooFetchText(`https://feeds.finance.yahoo.com/rss/2.0/headline?s=${encodeURIComponent(symbol)}&region=US&lang=en-US`),
  ]);
  const items = [];
  if (searchNews.status === 'fulfilled') {
    for (const n of searchNews.value?.news || []) items.push(normalizeSearchNews(n));
  }
  if (rssNews.status === 'fulfilled') items.push(...parseRss(rssNews.value));
  return items;
}

async function marketNews(env) {
  const [topStories, indexNews] = await Promise.allSettled([
    yahooFetchText('https://feeds.finance.yahoo.com/rss/2.0/headline?s=^GSPC,^GDAXI&region=US&lang=en-US'),
    yahooFetch(env, '/v1/finance/search', { q: 'stock market', quotesCount: 0, newsCount: 20 }),
  ]);
  const items = [];
  if (topStories.status === 'fulfilled') items.push(...parseRss(topStories.value));
  if (indexNews.status === 'fulfilled') {
    for (const n of indexNews.value?.news || []) items.push(normalizeSearchNews(n));
  }
  return items;
}

function normalizeSearchNews(n) {
  return {
    id: n.uuid || n.link,
    title: n.title,
    publisher: n.publisher || '',
    link: n.link,
    time: n.providerPublishTime ? n.providerPublishTime * 1000 : Date.now(),
    thumbnail: n.thumbnail?.resolutions?.find((r) => r.tag === '140x140')?.url || null,
    relatedTickers: n.relatedTickers || [],
  };
}

function parseRss(xml) {
  const items = [];
  const blocks = xml.split('<item>').slice(1);
  for (const block of blocks) {
    const pick = (tag) => {
      const m = block.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
      return m ? decodeXml(m[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/, '$1').trim()) : '';
    };
    const title = pick('title');
    const link = pick('link');
    if (!title || !link) continue;
    const pubDate = pick('pubDate');
    items.push({
      id: pick('guid') || link,
      title,
      publisher: 'Yahoo Finance',
      link,
      time: pubDate ? Date.parse(pubDate) || Date.now() : Date.now(),
      thumbnail: null,
      relatedTickers: [],
    });
  }
  return items;
}

function decodeXml(s) {
  return s
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'");
}

// --------------------------------------------------------------- Movers ----

export async function handleMovers(request, env, ctx, origin, fallbackSymbols) {
  const p = new URL(request.url).searchParams;
  const region = p.get('region') === 'DE' ? 'DE' : 'US';

  const key = canonicalUrl(origin, '/api/movers', { region });
  return cachedJson(ctx, key, TTL.MOVERS, CLIENT_MAX_AGE.MOVERS, async () => {
    if (useFixtures(env)) return fixtures.movers(region);
    try {
      const json = await yahooFetch(env, '/v1/finance/screener/predefined/saved', {
        scrIds: 'day_gainers,day_losers', count: 25, region,
      }, { needsCrumb: true });
      const results = json?.finance?.result || [];
      const byId = {};
      for (const r of results) byId[r.id || r.canonicalName] = (r.quotes || []).map(normalizeQuote);
      const gainers = byId.day_gainers || byId.DAY_GAINERS || [];
      const losers = byId.day_losers || byId.DAY_LOSERS || [];
      if (!gainers.length && !losers.length) throw new Error('Screener leer');
      return { region, gainers, losers };
    } catch {
      // Fallback: Batch-Quotes einer statischen Liste, nach Tagesänderung sortiert.
      const symbols = fallbackSymbols(region);
      const data = await quotesViaChartMeta(env, symbols);
      const list = Object.values(data.quotes).filter((q) => q.changePct != null);
      list.sort((a, b) => b.changePct - a.changePct);
      return { region, gainers: list.slice(0, 10), losers: list.slice(-10).reverse(), fallback: true };
    }
  });
}
