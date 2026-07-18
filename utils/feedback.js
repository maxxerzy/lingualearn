// Kurze Töne + Vibration bei Antworten. Abschaltbar in den Einstellungen;
// die Einstellung gilt pro Konto (localStorage).
import { getCurrentUser } from '../core/auth.js';

let audioCtx = null;

function fxKey() {
  const u = getCurrentUser();
  return u ? 'lingualearn_fx_' + u : null;
}
export function fxEnabled() {
  try { const k = fxKey(); return k ? localStorage.getItem(k) !== 'off' : false; } catch { return false; }
}
export function setFxEnabled(on) {
  try { const k = fxKey(); if (k) localStorage.setItem(k, on ? 'on' : 'off'); } catch { /* egal */ }
}

function beep(freq, when, dur, gainVal = 0.08) {
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = 'sine';
  o.frequency.value = freq;
  g.gain.setValueAtTime(gainVal, audioCtx.currentTime + when);
  g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + when + dur);
  o.connect(g).connect(audioCtx.destination);
  o.start(audioCtx.currentTime + when);
  o.stop(audioCtx.currentTime + when + dur + 0.02);
}

function withAudio(fn) {
  if (!fxEnabled()) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    fn();
  } catch { /* Audio nicht verfügbar */ }
}

export function playCorrect() {
  withAudio(() => { beep(660, 0, 0.09); beep(880, 0.09, 0.14); });
  try { if (fxEnabled()) navigator.vibrate?.(12); } catch { /* egal */ }
}
export function playWrong() {
  withAudio(() => { beep(220, 0, 0.16, 0.06); });
  try { if (fxEnabled()) navigator.vibrate?.([28, 40, 28]); } catch { /* egal */ }
}
