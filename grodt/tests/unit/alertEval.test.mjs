import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateAlert } from '../../public/js/core/alertEval.js';

const quote = (price, changePct = 0) => ({ price, changePct, currency: 'EUR' });
const alert = (type, value, extra = {}) => ({ id: '1', symbol: 'SAP.DE', type, value, active: true, ...extra });

test('price_above löst bei Erreichen aus, nicht darunter', () => {
  assert.equal(evaluateAlert(alert('price_above', 200), quote(199.99)), null);
  const hit = evaluateAlert(alert('price_above', 200), quote(200));
  assert.ok(hit && hit.body.includes('überschritten'));
});

test('price_below & stop_loss lösen unterhalb aus', () => {
  assert.equal(evaluateAlert(alert('price_below', 180), quote(180.01)), null);
  assert.ok(evaluateAlert(alert('price_below', 180), quote(180)));
  const sl = evaluateAlert(alert('stop_loss', 180), quote(179));
  assert.ok(sl && sl.title.includes('Stop-Loss'));
});

test('pct_move prüft Betrag der Tagesbewegung', () => {
  assert.equal(evaluateAlert(alert('pct_move', 3), quote(100, 2.9)), null);
  assert.ok(evaluateAlert(alert('pct_move', 3), quote(100, -3.5)));
});

test('inaktive Alarme und fehlende Quotes lösen nie aus', () => {
  assert.equal(evaluateAlert(alert('price_above', 1, { active: false }), quote(100)), null);
  assert.equal(evaluateAlert(alert('price_above', 1), null), null);
  assert.equal(evaluateAlert(alert('price_above', 1), { price: null }), null);
  assert.equal(evaluateAlert(alert('price_above', 'kaputt'), quote(100)), null);
});
