import { getCurrentSession } from './state.js';

export function updateProgress() {
  const session = getCurrentSession();
  const textEl = document.getElementById('progress-text');
  const barEl  = document.getElementById('progress-bar');

  if (!session) {
    textEl.textContent = '0/0 Karten';
    barEl.style.width = '0%';
    return;
  }

  const done  = session.currentIndex;
  const total = session.totalCards || session.cards.length;
  const pct   = total > 0 ? Math.min(100, Math.round((done / total) * 100)) : 0;

  textEl.textContent = `${done}/${total} Karten`;
  barEl.style.width  = `${pct}%`;
}
