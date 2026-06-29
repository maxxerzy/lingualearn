import { getUserStats } from './state.js';

export function updateStats() {
  const s = getUserStats();
  const rate     = s.successRate    ?? 0;
  const learned  = s.learnedWords   ?? 0;
  const days     = s.activeDays     ?? 0;
  const sessions = s.totalSessions  ?? 0;
  const correct  = s.totalCorrect   ?? 0;
  const answered = s.totalAnswered  ?? 0;
  const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : 0;

  setEl('stat-success-rate',   `${rate}%`);
  setEl('stat-learned-words',  learned);
  setEl('stat-active-days',    days);
  setEl('stat-total-sessions', sessions);
  setEl('stat-total-correct',  correct);
  setEl('stat-total-answered', answered);
  setEl('stat-accuracy',       `${accuracy}%`);

  const bar = document.getElementById('stat-accuracy-bar');
  if (bar) bar.style.width = `${accuracy}%`;
}

function setEl(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}
