// Deutsche Formatierung für Zahlen, Währungen, Prozente und Zeiten.

const nf2 = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const nf0 = new Intl.NumberFormat('de-DE');
const currencyCache = new Map();

export function fmtCurrency(value, currency = 'EUR') {
  if (value == null || Number.isNaN(value)) return '–';
  let nf = currencyCache.get(currency);
  if (!nf) {
    try {
      nf = new Intl.NumberFormat('de-DE', { style: 'currency', currency });
    } catch {
      nf = { format: (v) => `${nf2.format(v)} ${currency}` };
    }
    currencyCache.set(currency, nf);
  }
  return nf.format(value);
}

export function fmtNumber(value, decimals = 2) {
  if (value == null || Number.isNaN(value)) return '–';
  return decimals === 0 ? nf0.format(Math.round(value)) : nf2.format(value);
}

export function fmtPct(value, { signed = true } = {}) {
  if (value == null || Number.isNaN(value)) return '–';
  const sign = signed && value > 0 ? '+' : '';
  return `${sign}${nf2.format(value)} %`;
}

/** Kompakt: 1,25 Bio. / 340 Mrd. / 25 Mio. */
export function fmtCompact(value) {
  if (value == null || Number.isNaN(value)) return '–';
  const abs = Math.abs(value);
  if (abs >= 1e12) return `${nf2.format(value / 1e12)} Bio.`;
  if (abs >= 1e9) return `${nf2.format(value / 1e9)} Mrd.`;
  if (abs >= 1e6) return `${nf2.format(value / 1e6)} Mio.`;
  if (abs >= 1e3) return nf0.format(Math.round(value));
  return nf2.format(value);
}

export function fmtDate(tsMsOrS) {
  if (!tsMsOrS) return '–';
  const ms = tsMsOrS < 1e12 ? tsMsOrS * 1000 : tsMsOrS;
  return new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(ms));
}

export function fmtTime(tsMsOrS) {
  if (!tsMsOrS) return '–';
  const ms = tsMsOrS < 1e12 ? tsMsOrS * 1000 : tsMsOrS;
  return new Intl.DateTimeFormat('de-DE', { hour: '2-digit', minute: '2-digit' }).format(new Date(ms));
}

/** Relative Zeit: „vor 5 Min.", „vor 3 Std.", sonst Datum. */
export function relTime(tsMs) {
  if (!tsMs) return '';
  const diff = Date.now() - tsMs;
  const min = Math.floor(diff / 60000);
  if (min < 1) return 'gerade eben';
  if (min < 60) return `vor ${min} Min.`;
  const h = Math.floor(min / 60);
  if (h < 24) return `vor ${h} Std.`;
  const d = Math.floor(h / 24);
  if (d < 7) return `vor ${d} Tg.`;
  return fmtDate(tsMs);
}

/** Vorzeichen-Klasse für Färbung. */
export function trendClass(value) {
  if (value == null || Number.isNaN(value) || Math.abs(value) < 0.005) return 'flat';
  return value > 0 ? 'up' : 'down';
}
