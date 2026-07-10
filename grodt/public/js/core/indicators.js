// Technische Indikatoren — pure Funktionen über Candle-Arrays
// [{t, o, h, l, c, v}] mit chart-fertigem Output [{time, value}].
// Warmup-Punkte werden weggelassen (lightweight-charts mag kein NaN).

export function sma(candles, period) {
  const out = [];
  let sum = 0;
  for (let i = 0; i < candles.length; i++) {
    sum += candles[i].c;
    if (i >= period) sum -= candles[i - period].c;
    if (i >= period - 1) out.push({ time: candles[i].t, value: sum / period });
  }
  return out;
}

export function ema(candles, period) {
  if (candles.length < period) return [];
  const k = 2 / (period + 1);
  let seed = 0;
  for (let i = 0; i < period; i++) seed += candles[i].c;
  let value = seed / period;
  const out = [{ time: candles[period - 1].t, value }];
  for (let i = period; i < candles.length; i++) {
    value = candles[i].c * k + value * (1 - k);
    out.push({ time: candles[i].t, value });
  }
  return out;
}

export function bollinger(candles, period = 20, mult = 2) {
  const upper = [], middle = [], lower = [];
  let sum = 0, sumSq = 0;
  for (let i = 0; i < candles.length; i++) {
    const c = candles[i].c;
    sum += c;
    sumSq += c * c;
    if (i >= period) {
      const old = candles[i - period].c;
      sum -= old;
      sumSq -= old * old;
    }
    if (i >= period - 1) {
      const mean = sum / period;
      const variance = Math.max(0, sumSq / period - mean * mean);
      const sd = Math.sqrt(variance);
      middle.push({ time: candles[i].t, value: mean });
      upper.push({ time: candles[i].t, value: mean + mult * sd });
      lower.push({ time: candles[i].t, value: mean - mult * sd });
    }
  }
  return { upper, middle, lower };
}

export function rsi(candles, period = 14) {
  if (candles.length <= period) return [];
  let gain = 0, loss = 0;
  for (let i = 1; i <= period; i++) {
    const diff = candles[i].c - candles[i - 1].c;
    if (diff >= 0) gain += diff;
    else loss -= diff;
  }
  let avgGain = gain / period;
  let avgLoss = loss / period;
  const out = [rsiPoint(candles[period].t, avgGain, avgLoss)];
  for (let i = period + 1; i < candles.length; i++) {
    const diff = candles[i].c - candles[i - 1].c;
    // Wilder-Glättung
    avgGain = (avgGain * (period - 1) + Math.max(diff, 0)) / period;
    avgLoss = (avgLoss * (period - 1) + Math.max(-diff, 0)) / period;
    out.push(rsiPoint(candles[i].t, avgGain, avgLoss));
  }
  return out;
}

function rsiPoint(time, avgGain, avgLoss) {
  const value = avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss);
  return { time, value };
}

export function macd(candles, fast = 12, slow = 26, signalPeriod = 9) {
  const emaFast = ema(candles, fast);
  const emaSlow = ema(candles, slow);
  if (!emaSlow.length) return { macd: [], signal: [], histogram: [] };

  // EMAs zeitlich ausrichten (emaFast beginnt früher).
  const offset = emaFast.length - emaSlow.length;
  const macdLine = emaSlow.map((point, i) => ({
    time: point.time,
    value: emaFast[i + offset].value - point.value,
  }));

  // Signallinie: EMA über die MACD-Linie.
  const signal = [];
  if (macdLine.length >= signalPeriod) {
    const k = 2 / (signalPeriod + 1);
    let seed = 0;
    for (let i = 0; i < signalPeriod; i++) seed += macdLine[i].value;
    let value = seed / signalPeriod;
    signal.push({ time: macdLine[signalPeriod - 1].time, value });
    for (let i = signalPeriod; i < macdLine.length; i++) {
      value = macdLine[i].value * k + value * (1 - k);
      signal.push({ time: macdLine[i].time, value });
    }
  }

  const sigOffset = macdLine.length - signal.length;
  const histogram = signal.map((point, i) => ({
    time: point.time,
    value: macdLine[i + sigOffset].value - point.value,
    color: macdLine[i + sigOffset].value - point.value >= 0 ? '#30a46c' : '#e5484d',
  }));

  return { macd: macdLine, signal, histogram };
}

/** Volumen-Balken, grün/rot nach Kerzenrichtung. */
export function volumeBars(candles) {
  return candles.map((k) => ({
    time: k.t,
    value: k.v ?? 0,
    color: k.c >= k.o ? 'rgba(48, 164, 108, 0.5)' : 'rgba(229, 72, 77, 0.5)',
  }));
}

/** Normiert Schlusskurse auf %-Performance ab erstem Punkt (Vergleichsmodus). */
export function normalizePct(candles) {
  if (!candles.length) return [];
  const base = candles[0].c;
  if (!base) return [];
  return candles.map((k) => ({ time: k.t, value: ((k.c - base) / base) * 100 }));
}
