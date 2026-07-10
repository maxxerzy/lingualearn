// Optionaler Finnhub-WebSocket für Realtime-US-Trades. Aktiviert sich,
// sobald in den Einstellungen ein API-Key hinterlegt ist. Deutsche Symbole
// (.DE/.F …) werden nicht abonniert — Finnhub-Gratis streamt nur US.

import { getSetting, update, subscribe } from './store.js';

let ws = null;
let wantedSymbols = new Set();
let backoffMs = 2000;
let statusCb = null;

const isUsSymbol = (s) => !s.includes('.') && !s.startsWith('^');

export function onFinnhubStatus(cb) {
  statusCb = cb;
}

function setStatus(connected) {
  if (statusCb) statusCb(connected);
}

export function setStreamSymbols(symbols) {
  const next = new Set(symbols.filter(isUsSymbol));
  if (ws && ws.readyState === WebSocket.OPEN) {
    for (const s of wantedSymbols) {
      if (!next.has(s)) ws.send(JSON.stringify({ type: 'unsubscribe', symbol: s }));
    }
    for (const s of next) {
      if (!wantedSymbols.has(s)) ws.send(JSON.stringify({ type: 'subscribe', symbol: s }));
    }
  }
  wantedSymbols = next;
}

function connect() {
  const key = getSetting('finnhubKey');
  if (!key || ws) return;

  ws = new WebSocket(`wss://ws.finnhub.io?token=${encodeURIComponent(key)}`);

  ws.onopen = () => {
    backoffMs = 2000;
    setStatus(true);
    for (const s of wantedSymbols) ws.send(JSON.stringify({ type: 'subscribe', symbol: s }));
  };

  ws.onmessage = (event) => {
    let msg;
    try {
      msg = JSON.parse(event.data);
    } catch {
      return;
    }
    if (msg.type !== 'trade' || !msg.data?.length) return;
    // Letzten Trade je Symbol übernehmen (Preis + Zeit, Rest vom Poll).
    const latest = {};
    for (const trade of msg.data) latest[trade.s] = trade;
    update('quotes', (quotes) => {
      const next = { ...quotes };
      for (const [symbol, trade] of Object.entries(latest)) {
        const prev = next[symbol] || { symbol, currency: 'USD' };
        const previousClose = prev.previousClose;
        const change = previousClose != null ? trade.p - previousClose : prev.change;
        next[symbol] = {
          ...prev,
          price: trade.p,
          time: Math.floor(trade.t / 1000),
          change,
          changePct: previousClose ? ((trade.p - previousClose) / previousClose) * 100 : prev.changePct,
          streamed: true,
        };
      }
      return next;
    });
  };

  ws.onclose = () => {
    ws = null;
    setStatus(false);
    if (getSetting('finnhubKey') && !document.hidden) {
      setTimeout(connect, backoffMs);
      backoffMs = Math.min(backoffMs * 2, 60000);
    }
  };

  ws.onerror = () => ws?.close();
}

function disconnect() {
  if (ws) {
    const socket = ws;
    ws = null;
    socket.close();
  }
  setStatus(false);
}

export function startFinnhub() {
  connect();
  subscribe('settings', () => {
    if (getSetting('finnhubKey')) {
      if (!ws) connect();
    } else {
      disconnect();
    }
  });
  // iOS killt Hintergrund-Sockets: bei pagehide sauber trennen, bei Rückkehr neu.
  window.addEventListener('pagehide', disconnect);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && getSetting('finnhubKey') && !ws) connect();
  });
}
