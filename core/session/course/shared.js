import { getUserStats, setCurrentSession, setUserStats } from '../../state.js';
import { updateProgress } from '../../progress.js';
import { updateStats } from '../../stats.js';
import { escHtml, recordAnswerEffects } from '../shared.js';

export function courseGrade(session, card, isCorrect) {
  session.gradedAnswers++;
  if (isCorrect) {
    session.queue.shift();
    session.currentIndex++;
    session.correctAnswers++;
    // Gemeisterten Lückensatz merken → wird nicht erneut abgefragt.
    if (session.phase === 'sentences') session.sentencesCompleted.push(card.front);
  } else {
    session.queue.push(session.queue.shift());
  }

  const userStats = getUserStats();
  if (isCorrect) {
    userStats.learnedWords = (userStats.learnedWords || 0) + 1;
    userStats.totalCorrect = (userStats.totalCorrect || 0) + 1;
  }
  userStats.totalAnswered = (userStats.totalAnswered || 0) + 1;
  setUserStats(userStats);
  updateStats();

  setCurrentSession(session);
  recordAnswerEffects(session, card, isCorrect, isCorrect);
  updateProgress();
}

// Phase 2: Wörter üben (Multiple Choice Deutsch → Zielsprache).
export function courseFeedbackHtml(isCorrect, card, extra = '', answer = card.back) {
  return `${isCorrect
    ? '<div class="correct" style="margin-top:14px"><p>✅ Richtig!</p></div>'
    : `<div class="incorrect" style="margin-top:14px"><p>❌ Falsch — richtig: <b>${escHtml(answer)}</b>. Kommt gleich nochmal.</p></div>`}${extra}`;
}