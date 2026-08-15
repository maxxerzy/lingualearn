import { getCurrentUser } from '../core/auth.js';
import { setDailyGoal } from '../core/gamification.js';
import { deckMeta } from '../js/data/decks/meta.js';
import { renderLearnWidgets } from './gami.js';

// Drei-Schritte-Onboarding beim allerersten Login:
// Sprache wählen → Tagesziel → Motivation → direkt in Lektion 1.
const FLAGS = { da: '🇩🇰', el: '🇬🇷', la: '🏛️', fr: '🇫🇷', es: '🇪🇸', ru: '🇷🇺', ja: '🇯🇵', zh: '🇨🇳' };

function key() {
  const u = getCurrentUser();
  return u ? 'lingualearn_onboard_' + u : null;
}
function done() { try { const k = key(); return k ? !!localStorage.getItem(k) : true; } catch { return true; } }
function markDone() { try { const k = key(); if (k) localStorage.setItem(k, '1'); } catch { /* egal */ } }

let step = 1;
let picked = { deck: null, goal: 20, why: null };
let onFinish = null;

function show(n) {
  step = n;
  document.querySelectorAll('.ob-step').forEach(el => (el.hidden = el.dataset.ob !== String(n)));
  const next = document.getElementById('obNext');
  if (next) next.innerHTML = n === 3 ? '<i class="fas fa-graduation-cap"></i> Lektion 1 starten' : 'Weiter';
}

function close() {
  const m = document.getElementById('onboarding');
  if (m) m.hidden = true;
  markDone();
}

export function maybeShowOnboarding(startCourse) {
  if (done()) return false;
  onFinish = startCourse;
  const grid = document.getElementById('obLangs');
  if (grid && !grid.childElementCount) {
    grid.innerHTML = deckMeta.map((d, i) => `
      <button type="button" class="ob-chip ${i === 0 ? 'ob-chip--active' : ''}" data-deck="${d.id}">
        ${FLAGS[d.language] || '🌍'}<br><b>${d.name}</b>
      </button>`).join('');
  }
  picked = { deck: deckMeta[0].id, goal: 20, why: null };
  show(1);
  const m = document.getElementById('onboarding');
  if (m) m.hidden = false;
  return true;
}

export function initOnboarding() {
  const m = document.getElementById('onboarding');
  if (!m) return;
  m.addEventListener('click', e => {
    const chip = e.target.closest('.ob-chip');
    if (!chip) return;
    chip.parentElement.querySelectorAll('.ob-chip').forEach(c => c.classList.remove('ob-chip--active'));
    chip.classList.add('ob-chip--active');
    if (chip.dataset.deck) picked.deck = chip.dataset.deck;
    if (chip.dataset.goal) picked.goal = Number(chip.dataset.goal);
    if (chip.dataset.why) picked.why = chip.dataset.why;
  });
  document.getElementById('obSkip')?.addEventListener('click', close);
  document.getElementById('obNext')?.addEventListener('click', () => {
    if (step < 3) { show(step + 1); return; }
    // Abschluss: Deck + Ziel setzen, Kurs-Modus, Lektion 1 starten.
    const sel = document.getElementById('deckSelect');
    if (sel && picked.deck) { sel.value = picked.deck; sel.dispatchEvent(new Event('change')); }
    setDailyGoal(picked.goal);
    const goalInput = document.getElementById('dailyGoalInput');
    if (goalInput) goalInput.value = picked.goal;
    try { const u = getCurrentUser(); if (u && picked.why) localStorage.setItem('lingualearn_why_' + u, picked.why); } catch { /* egal */ }
    document.querySelectorAll('.mode-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.mode === 'course'));
    renderLearnWidgets();
    close();
    onFinish?.();
  });
}
