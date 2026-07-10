// Alarm-Auswertung — wird von Frontend (In-App-Prüfung) UND Worker-Cron
// gemeinsam genutzt. Darf deshalb nur plattformneutrales JS enthalten.

export const ALERT_TYPES = {
  price_above: 'Kurs über',
  price_below: 'Kurs unter',
  stop_loss: 'Stop-Loss',
  pct_move: 'Tagesbewegung ±%',
};

function fmt(value, currency) {
  try {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: currency || 'EUR' }).format(value);
  } catch {
    return `${value} ${currency || ''}`.trim();
  }
}

/**
 * Prüft einen Alarm gegen ein Quote-Objekt ({price, changePct, currency…}).
 * Liefert null (nicht ausgelöst) oder { title, body } für die Benachrichtigung.
 */
export function evaluateAlert(alert, quote) {
  if (!alert || alert.active === false || !quote || quote.price == null) return null;
  const price = quote.price;
  const value = Number(alert.value);
  if (!Number.isFinite(value)) return null;

  switch (alert.type) {
    case 'price_above':
      if (price >= value) {
        return {
          title: `${alert.symbol}: Kursalarm`,
          body: `${alert.symbol} hat ${fmt(value, quote.currency)} überschritten (aktuell ${fmt(price, quote.currency)}).`,
        };
      }
      return null;
    case 'price_below':
      if (price <= value) {
        return {
          title: `${alert.symbol}: Kursalarm`,
          body: `${alert.symbol} hat ${fmt(value, quote.currency)} unterschritten (aktuell ${fmt(price, quote.currency)}).`,
        };
      }
      return null;
    case 'stop_loss':
      if (price <= value) {
        return {
          title: `${alert.symbol}: Stop-Loss erreicht`,
          body: `${alert.symbol} hat ${fmt(value, quote.currency)} unterschritten (Stop-Loss, aktuell ${fmt(price, quote.currency)}).`,
        };
      }
      return null;
    case 'pct_move': {
      if (quote.changePct == null) return null;
      if (Math.abs(quote.changePct) >= Math.abs(value)) {
        const dir = quote.changePct >= 0 ? '+' : '';
        return {
          title: `${alert.symbol}: Starke Bewegung`,
          body: `${alert.symbol} bewegt sich heute ${dir}${quote.changePct.toFixed(2)} % (Schwelle ±${Math.abs(value)} %).`,
        };
      }
      return null;
    }
    default:
      return null;
  }
}
