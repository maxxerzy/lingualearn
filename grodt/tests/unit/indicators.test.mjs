import test from 'node:test';
import assert from 'node:assert/strict';
import { sma, ema, bollinger, rsi, macd, normalizePct } from '../../public/js/core/indicators.js';

const mk = (closes) => closes.map((c, i) => ({ t: 1000 + i * 86400, o: c, h: c + 1, l: c - 1, c, v: 100 }));

test('sma: gleitender Durchschnitt korrekt und ohne Warmup-Punkte', () => {
  const out = sma(mk([1, 2, 3, 4, 5]), 3);
  assert.equal(out.length, 3);
  assert.deepEqual(out.map((p) => p.value), [2, 3, 4]);
  assert.equal(out[0].time, 1000 + 2 * 86400);
});

test('ema: startet mit SMA-Seed und folgt dem Kurs', () => {
  const out = ema(mk([1, 2, 3, 4, 5, 6]), 3);
  assert.equal(out.length, 4);
  assert.equal(out[0].value, 2); // SMA(1,2,3)
  assert.ok(out[3].value > out[0].value);
  // k = 0.5: 2 → 3 → 4 → 5
  assert.deepEqual(out.map((p) => p.value), [2, 3, 4, 5]);
});

test('bollinger: Bänder symmetrisch um die Mitte', () => {
  const { upper, middle, lower } = bollinger(mk([2, 2, 2, 2, 2]), 3, 2);
  assert.equal(middle.length, 3);
  for (let i = 0; i < middle.length; i++) {
    assert.equal(middle[i].value, 2);
    assert.equal(upper[i].value, 2); // Stddev 0 bei konstantem Kurs
    assert.equal(lower[i].value, 2);
  }
  const bands = bollinger(mk([1, 5, 1, 5, 1, 5, 1, 5]), 4, 2);
  assert.ok(bands.upper[0].value > bands.middle[0].value);
  assert.ok(bands.lower[0].value < bands.middle[0].value);
});

test('rsi: 100 bei reinen Gewinnen, ~0 bei reinen Verlusten, Wertebereich', () => {
  const up = rsi(mk([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]), 14);
  assert.ok(up.length >= 1);
  assert.equal(up[0].value, 100);
  const down = rsi(mk(Array.from({ length: 16 }, (_, i) => 100 - i)), 14);
  assert.ok(down[0].value < 1);
  for (const p of [...up, ...down]) {
    assert.ok(p.value >= 0 && p.value <= 100);
  }
});

test('macd: Linien zeitlich ausgerichtet, Histogramm = MACD − Signal', () => {
  const closes = Array.from({ length: 60 }, (_, i) => 100 + Math.sin(i / 5) * 10 + i * 0.3);
  const { macd: line, signal, histogram } = macd(mk(closes));
  assert.ok(line.length > 0 && signal.length > 0);
  assert.equal(histogram.length, signal.length);
  const offset = line.length - signal.length;
  for (let i = 0; i < signal.length; i++) {
    assert.equal(line[i + offset].time, signal[i].time);
    assert.ok(Math.abs(histogram[i].value - (line[i + offset].value - signal[i].value)) < 1e-9);
  }
});

test('normalizePct: startet bei 0 %, Ende korrekt', () => {
  const out = normalizePct(mk([100, 110, 120]));
  assert.equal(out[0].value, 0);
  assert.equal(out[2].value, 20);
});
