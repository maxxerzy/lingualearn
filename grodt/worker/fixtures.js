// Fixture-Modus (USE_FIXTURES=1): deterministische Beispieldaten für lokale
// Entwicklung und Tests — die Dev-Umgebung erreicht Yahoo nicht.

function seedFrom(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const KNOWN = {
  'SAP.DE': { name: 'SAP SE', currency: 'EUR', exchange: 'XETRA', base: 190, sector: 'Technologie' },
  'SIE.DE': { name: 'Siemens AG', currency: 'EUR', exchange: 'XETRA', base: 175, sector: 'Industrie' },
  'ALV.DE': { name: 'Allianz SE', currency: 'EUR', exchange: 'XETRA', base: 260, sector: 'Finanzen' },
  'BMW.DE': { name: 'BMW AG', currency: 'EUR', exchange: 'XETRA', base: 88, sector: 'Zyklischer Konsum' },
  AAPL: { name: 'Apple Inc.', currency: 'USD', exchange: 'NasdaqGS', base: 210, sector: 'Technologie' },
  MSFT: { name: 'Microsoft Corporation', currency: 'USD', exchange: 'NasdaqGS', base: 430, sector: 'Technologie' },
  NVDA: { name: 'NVIDIA Corporation', currency: 'USD', exchange: 'NasdaqGS', base: 125, sector: 'Technologie' },
  TSLA: { name: 'Tesla, Inc.', currency: 'USD', exchange: 'NasdaqGS', base: 250, sector: 'Zyklischer Konsum' },
  '^GDAXI': { name: 'DAX', currency: 'EUR', exchange: 'XETRA', base: 18500, sector: null },
  '^GSPC': { name: 'S&P 500', currency: 'USD', exchange: 'SNP', base: 5500, sector: null },
  '^IXIC': { name: 'NASDAQ Composite', currency: 'USD', exchange: 'Nasdaq', base: 18000, sector: null },
  '^DJI': { name: 'Dow Jones Industrial Average', currency: 'USD', exchange: 'DJI', base: 39500, sector: null },
};

function info(symbol) {
  return (
    KNOWN[symbol] || {
      name: `${symbol} Beispiel AG`,
      currency: symbol.endsWith('.DE') || symbol.endsWith('.F') || symbol.startsWith('^G') ? 'EUR' : 'USD',
      exchange: symbol.endsWith('.DE') ? 'XETRA' : symbol.endsWith('.F') ? 'Frankfurt' : 'NasdaqGS',
      base: 50 + (seedFrom(symbol) % 400),
      sector: 'Technologie',
    }
  );
}

const RANGE_SECONDS = {
  '1d': 86400, '5d': 5 * 86400, '1mo': 30 * 86400, '3mo': 91 * 86400, '6mo': 182 * 86400,
  ytd: 182 * 86400, '1y': 365 * 86400, '2y': 2 * 365 * 86400, '5y': 5 * 365 * 86400,
  '10y': 10 * 365 * 86400, max: 12 * 365 * 86400,
};
const INTERVAL_SECONDS = {
  '1m': 60, '2m': 120, '5m': 300, '15m': 900, '30m': 1800, '60m': 3600, '90m': 5400,
  '1h': 3600, '1d': 86400, '5d': 5 * 86400, '1wk': 7 * 86400, '1mo': 30 * 86400, '3mo': 91 * 86400,
};

export function chart(symbol, interval, range) {
  const inf = info(symbol);
  const rnd = mulberry32(seedFrom(symbol + interval + range));
  const step = INTERVAL_SECONDS[interval] || 86400;
  const span = RANGE_SECONDS[range] || RANGE_SECONDS['1y'];
  const count = Math.min(Math.max(Math.floor(span / step), 30), 1500);
  const end = Math.floor(Date.now() / 1000 / step) * step;

  const candles = [];
  let price = inf.base * (0.75 + rnd() * 0.2);
  for (let i = count - 1; i >= 0; i--) {
    const t = end - i * step;
    const drift = (rnd() - 0.48) * price * 0.02;
    const o = price;
    const c = Math.max(1, price + drift);
    const h = Math.max(o, c) * (1 + rnd() * 0.008);
    const l = Math.min(o, c) * (1 - rnd() * 0.008);
    const v = Math.floor(1e5 + rnd() * 5e6);
    candles.push({
      t,
      o: +o.toFixed(2), h: +h.toFixed(2), l: +l.toFixed(2), c: +c.toFixed(2), v,
    });
    price = c;
  }
  const last = candles[candles.length - 1];
  const prev = candles.length > 1 ? candles[candles.length - 2].c : last.o;
  return {
    symbol, currency: inf.currency, exchange: inf.exchange, timezone: 'Europe/Berlin',
    price: last.c, previousClose: prev, candles, fixture: true,
  };
}

export function quotes(symbols) {
  const out = {};
  const dayBucket = Math.floor(Date.now() / 60000);
  for (const s of symbols) {
    const inf = info(s);
    const rnd = mulberry32(seedFrom(s) ^ dayBucket);
    const prev = inf.base;
    const price = +(prev * (0.985 + rnd() * 0.03)).toFixed(2);
    out[s] = {
      symbol: s, name: inf.name, price,
      change: +(price - prev).toFixed(2),
      changePct: +(((price - prev) / prev) * 100).toFixed(2),
      previousClose: prev, currency: inf.currency, marketState: 'REGULAR',
      time: Math.floor(Date.now() / 1000),
      dayHigh: +(price * 1.01).toFixed(2), dayLow: +(price * 0.99).toFixed(2),
      volume: Math.floor(1e6 + rnd() * 2e7), exchange: inf.exchange,
    };
  }
  return { quotes: out, fixture: true };
}

export function search(q) {
  const ql = q.toLowerCase();
  const all = Object.entries(KNOWN)
    .filter(([sym]) => !sym.startsWith('^'))
    .map(([symbol, inf]) => ({
      symbol, name: inf.name,
      exchange: inf.exchange === 'XETRA' ? 'GER' : 'NMS',
      exchDisp: inf.exchange, type: 'EQUITY',
    }));
  const results = all.filter(
    (r) => r.symbol.toLowerCase().includes(ql) || r.name.toLowerCase().includes(ql)
  );
  // Mehrfach-Listing simulieren: SAP auch als US-ADR und Frankfurt.
  if ('sap'.includes(ql) || ql.includes('sap')) {
    results.push(
      { symbol: 'SAP', name: 'SAP SE', exchange: 'NYQ', exchDisp: 'NYSE', type: 'EQUITY' },
      { symbol: 'SAP.F', name: 'SAP SE', exchange: 'FRA', exchDisp: 'Frankfurt', type: 'EQUITY' }
    );
  }
  return { results, fixture: true };
}

export function fundamentals(symbol) {
  const inf = info(symbol);
  const rnd = mulberry32(seedFrom(symbol));
  const eps = +(inf.base / (12 + rnd() * 20)).toFixed(2);
  const quarters = ['4Q2024', '1Q2025', '2Q2025', '3Q2025'].map((qt, i) => ({
    quarter: qt,
    revenue: Math.floor(5e9 + rnd() * 3e9 + i * 2e8),
    earnings: Math.floor(1e9 + rnd() * 8e8 + i * 5e7),
  }));
  return {
    symbol, name: inf.name, currency: inf.currency, exchange: inf.exchange,
    marketCap: Math.floor(inf.base * 1e9), peTrailing: +(inf.base / eps).toFixed(1),
    peForward: +((inf.base / eps) * 0.9).toFixed(1), eps, epsForward: +(eps * 1.1).toFixed(2),
    dividendYield: 0.021, dividendRate: +(inf.base * 0.021).toFixed(2),
    exDividendDate: Math.floor(Date.now() / 1000) + 20 * 86400, payoutRatio: 0.35,
    beta: +(0.8 + rnd() * 0.8).toFixed(2),
    week52High: +(inf.base * 1.25).toFixed(2), week52Low: +(inf.base * 0.7).toFixed(2),
    avgVolume: 4200000, priceToBook: +(2 + rnd() * 5).toFixed(1), profitMargin: 0.18,
    revenueGrowth: 0.09, debtToEquity: 42.5, freeCashflow: 6.1e9,
    targetMeanPrice: +(inf.base * 1.12).toFixed(2), recommendationKey: 'buy',
    sector: inf.sector, industry: 'Software – Anwendungen', country: inf.currency === 'EUR' ? 'Deutschland' : 'USA',
    website: 'https://example.com', employees: 105000,
    summary: `${inf.name} ist ein Beispiel-Unternehmensprofil aus dem Fixture-Modus für lokale Tests.`,
    nextEarningsDate: Math.floor(Date.now() / 1000) + 32 * 86400,
    quarters,
    epsHistory: quarters.map((q, i) => ({
      quarter: `-${4 - i}q`, date: Math.floor(Date.now() / 1000) - (4 - i) * 91 * 86400,
      epsActual: +(eps * (0.9 + i * 0.05)).toFixed(2),
      epsEstimate: +(eps * (0.88 + i * 0.05)).toFixed(2),
      surprisePct: +(rnd() * 0.06).toFixed(3),
    })),
    recommendations: [
      { period: '0m', strongBuy: 8, buy: 14, hold: 6, sell: 1, strongSell: 0 },
      { period: '-1m', strongBuy: 7, buy: 15, hold: 6, sell: 1, strongSell: 0 },
    ],
    fixture: true,
  };
}

export function news(scope) {
  const now = Date.now();
  const items = Array.from({ length: 12 }, (_, i) => ({
    id: `fixture-${scope}-${i}`,
    title:
      scope === 'markt'
        ? `Marktbericht ${i + 1}: DAX und Wall Street im Fokus`
        : `${scope}: Beispielmeldung ${i + 1} zu Quartalszahlen und Ausblick`,
    publisher: ['Reuters', 'dpa-AFX', 'Bloomberg', 'Yahoo Finance'][i % 4],
    link: `https://example.com/news/${scope}/${i}`,
    time: now - i * 47 * 60 * 1000,
    thumbnail: null,
    relatedTickers: scope === 'markt' ? ['^GDAXI', '^GSPC'] : [scope],
  }));
  return { items, fixture: true };
}

export function movers(region) {
  const symbols =
    region === 'DE'
      ? ['SAP.DE', 'SIE.DE', 'ALV.DE', 'BMW.DE']
      : ['AAPL', 'MSFT', 'NVDA', 'TSLA'];
  const list = Object.values(quotes(symbols).quotes);
  list.sort((a, b) => b.changePct - a.changePct);
  return { region, gainers: list.slice(0, 2), losers: list.slice(-2).reverse(), fixture: true };
}
