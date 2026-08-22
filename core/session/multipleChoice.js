import { getCurrentSession, setCurrentSession, getUserStats, setUserStats } from '../state.js';
import { updateProgress } from '../progress.js';
import { updateStats } from '../stats.js';
import {
  speakWord, isReverse, promptText, answerText, promptLabel, answerLabel,
  promptAudioBtn, wirePromptAudio, buildMCOptions, mcOptionsMarkup, markMcAnswer,
  recordAnswerEffects, endSession, escHtml
} from './shared.js';

// ── MULTIPLE CHOICE MODE ─────────────────────────────────────────

export function showMultipleChoice() {
  const session = getCurrentSession();
  if (!session || session.currentIndex >= session.cards.length) {
    endSession();
    return;
  }

  const card = session.cards[session.currentIndex];
  const lang = session.deck.language;
  const options = buildMCOptions(card, session.cards);

  const learnArea = document.getElementById('learnArea');
  learnArea.innerHTML = `
    <div class="mc-card">
      <p class="fc-label">${promptLabel(session)}</p>
      <div class="fc-word mc-question">${escHtml(promptText(session, card))} ${promptAudioBtn(session)}</div>
      <p class="prompt">${answerLabel(session)} — welche Übersetzung stimmt?</p>
      ${mcOptionsMarkup(options, { withAudio: !isReverse(session.deck), textOf: o => answerText(session, o) })}
    </div>
  `;

  session.currentIndex++;
  session.currentPrompt = { card, options };
  setCurrentSession(session);
  updateProgress();
  wirePromptAudio(session, card);
  if (isReverse(session.deck)) speakWord(card.back, lang);

  learnArea.querySelectorAll('.mc-audio').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      speakWord(btn.dataset.text, lang);
    });
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        speakWord(btn.dataset.text, lang);
      }
    });
  });

  learnArea.querySelectorAll('.mc-option').forEach(btn => {
    btn.addEventListener('click', () => checkMCAnswer(Number(btn.dataset.idx)));
  });
}

function checkMCAnswer(selectedIdx) {
  const session = getCurrentSession();
  const userStats = getUserStats();
  const { card, options } = session.currentPrompt;
  const lang = session.deck.language;

  const { isCorrect } = markMcAnswer(options, selectedIdx, card);

  if (isCorrect) {
    session.correctAnswers++;
    userStats.learnedWords = (userStats.learnedWords || 0) + 1;
    userStats.totalCorrect = (userStats.totalCorrect || 0) + 1;
    speakWord(card.back, lang);
  }
  userStats.totalAnswered = (userStats.totalAnswered || 0) + 1;
  userStats.successRate = Math.round((session.correctAnswers / session.currentIndex) * 100);
  setUserStats(userStats);
  updateStats();
  session.currentPrompt = null;
  setCurrentSession(session);

  recordAnswerEffects(session, card, isCorrect, isCorrect);

  const fb = document.getElementById('mc-fb');
  fb.innerHTML = isCorrect
    ? `<div class="correct" style="margin-top:14px"><p>✅ Richtig!</p></div>`
    : `<div class="incorrect" style="margin-top:14px">
         <p>❌ Falsch — richtig: <b>${escHtml(answerText(session, card))}</b></p>
       </div>`;

  fb.innerHTML += `
    <div class="actions" style="margin-top:14px">
      <button type="button" class="btn btn-primary" id="mcNext">Weiter</button>
    </div>
  `;

  document.getElementById('mcNext').addEventListener('click', showMultipleChoice);
}