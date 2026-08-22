import { loadDeck, getCurrentSession, setCurrentSession } from '../state.js';
import { shuffleArray } from '../../utils/helpers.js';
import { recordSessionEnd, checkAchievements } from '../gamification.js';
import { renderGamiHeader, renderLearnWidgets } from '../../ui/gami.js';
import { showToast, confettiBurst, toastAchievements, toastCosmetics } from '../../ui/toast.js';
import { checkNewCosmetics } from '../cosmetics.js';
import {
  getThemeBadges, awardThemeBadge, showCombo, celebrateSessionEnd, promptText, answerText,
  enterFocus, clearBlitzTimer, markMcAnswer, recordAnswerEffects, dailyRecapHtml, escHtml, timers
} from './shared.js';

// ── THEMEN-QUIZ ──────────────────────────────────────────────────
// Prüfung über ALLE Wörter eines Pfad-Themas (z. B. „Essen" über alle
// „Essen 1..n"-Lektionen). Eine Runde Multiple Choice ohne Wiederholungs-
// schleife; ab 90 % gibt es das Themen-Abzeichen auf dem Lernpfad.
const QUIZ_PASS_RATE = 0.9;
const baseThemeOf = t => (t || '').replace(/ \d+$/, '');

export async function startThemeQuiz(deckId, theme) {
  clearBlitzTimer();
  const deck = await loadDeck(deckId);
  if (!deck?.cards?.length || !deck.lessonSizes || !deck.lessonTitles) return false;

  // Alle Karten der Lektionen dieses (Basis-)Themas einsammeln.
  const cards = [];
  let start = 0;
  deck.lessonSizes.forEach((size, i) => {
    if (baseThemeOf(deck.lessonTitles[i]) === theme) cards.push(...deck.cards.slice(start, start + size));
    start += size;
  });
  if (!cards.length) return false;

  const shuffled = shuffleArray([...cards]);
  const session = {
    deck,
    deckId,
    cards: shuffled,
    mode: 'themequiz',
    quizTheme: theme,
    currentIndex: 0,
    correctAnswers: 0,
    totalCards: shuffled.length,
    currentPrompt: null,
    combo: 0,
    boosted: false,
    queue: [],
    reviewQueue: [],
    reviewRound: 1,
  };
  setCurrentSession(session);
  enterFocus('themequiz');
  const icon = document.getElementById('sessionModeIcon');
  if (icon) icon.className = 'fas fa-award';
  document.getElementById('session-title').textContent = `🏅 Themen-Quiz — ${theme}`;
  showThemeQuiz();
  return true;
}

function showThemeQuiz() {
  const session = getCurrentSession();
  if (!session || session.mode !== 'themequiz') return;
  if (session.currentIndex >= session.totalCards) { endThemeQuiz(); return; }

  const card = session.cards[session.currentIndex];
  // Ablenker aus dem ganzen Deck, damit auch kleine Themen 4 Optionen haben.
  const pool = session.deck.cards.filter(c => c.back !== card.back && c.front !== card.front);
  const options = shuffleArray([card, ...shuffleArray(pool).slice(0, 3)]);
  session.currentPrompt = { card, options };
  setCurrentSession(session);

  document.getElementById('learnArea').innerHTML = `
    <div class="mc-card quiz-card">
      <div class="quiz-head">
        <span class="quiz-progress"><i class="fas fa-award"></i> Frage ${session.currentIndex + 1}/${session.totalCards}</span>
        <span class="quiz-score">${session.correctAnswers} richtig</span>
      </div>
      <p class="mc-question">${escHtml(promptText(session, card))}</p>
      <div class="mc-options">
        ${options.map((o, i) => `
          <button type="button" class="mc-option" data-idx="${i}">
            <span class="mc-key">${String.fromCharCode(65 + i)}</span>
            <span class="mc-text">${escHtml(answerText(session, o))}</span>
          </button>`).join('')}
      </div>
    </div>
  `;
  document.querySelectorAll('.quiz-card .mc-option').forEach(btn =>
    btn.addEventListener('click', () => checkThemeQuizAnswer(Number(btn.dataset.idx))));

  const t = document.getElementById('progress-text');
  if (t) t.textContent = `${session.currentIndex}/${session.totalCards} Fragen`;
  const b = document.getElementById('progress-bar');
  if (b) b.style.width = `${Math.round((session.currentIndex / session.totalCards) * 100)}%`;
}

function checkThemeQuizAnswer(idx) {
  const session = getCurrentSession();
  if (!session?.currentPrompt || session.mode !== 'themequiz') return;
  const { card, options } = session.currentPrompt;
  const { isCorrect } = markMcAnswer(options, idx, card);
  session.currentIndex++;
  if (isCorrect) session.correctAnswers++;
  session.currentPrompt = null;
  setCurrentSession(session);
  recordAnswerEffects(session, card, isCorrect, isCorrect);
  // Kurz die Auflösung zeigen, dann automatisch weiter (Prüfungs-Tempo);
  // bei Fehlern etwas länger, damit die richtige Antwort hängen bleibt.
  timers.quiz = setTimeout(() => {
    timers.quiz = null;
    showThemeQuiz();
  }, isCorrect ? 450 : 1300);
}

function endThemeQuiz() {
  clearBlitzTimer();
  const session = getCurrentSession();
  if (!session || session.mode !== 'themequiz') return;

  const total = session.totalCards;
  const correct = session.correctAnswers;
  const rate = total ? correct / total : 0;
  const passed = rate >= QUIZ_PASS_RATE;
  const alreadyBadged = !!getThemeBadges(session.deckId)[session.quizTheme];
  if (passed) awardThemeBadge(session.deckId, session.quizTheme);

  const { xpEarned, game } = recordSessionEnd({
    language: session.deck.language,
    correct,
    total,
  });
  const xpTotal = (session.xpFromAnswers || 0) + xpEarned;
  showCombo(0);
  renderGamiHeader();
  renderLearnWidgets();
  toastAchievements(checkAchievements());
  toastCosmetics(checkNewCosmetics());
  celebrateSessionEnd();
  if (passed) {
    confettiBurst();
    if (!alreadyBadged) showToast(`<i class="fas fa-award toast__icon"></i><div class="toast__body"><b>Themen-Abzeichen verdient! 🏅</b><span>„${escHtml(session.quizTheme)}" gemeistert</span></div>`);
  }

  document.getElementById('learnArea').innerHTML = `
    <h3 style="font-size:1.6rem;margin-bottom:12px">${passed ? '🏅 Quiz bestanden!' : '📝 Quiz beendet'}</h3>
    <p style="font-size:2.2rem;font-weight:800;color:var(--primary);margin-bottom:4px">${Math.round(rate * 100)}%</p>
    <p style="color:var(--gray);margin-bottom:14px">${correct} von ${total} Fragen zum Thema „${escHtml(session.quizTheme)}" richtig</p>
    <div class="session-rewards">
      <span class="reward-pill reward-pill--xp"><i class="fas fa-bolt"></i> +${xpTotal} XP</span>
      ${passed ? '<span class="reward-pill reward-pill--perfect"><i class="fas fa-award"></i> Themen-Abzeichen</span>' : ''}
      <span class="reward-pill reward-pill--streak"><i class="fas fa-fire"></i> Serie: ${game.streak.current} ${game.streak.current === 1 ? 'Tag' : 'Tage'}</span>
    </div>
    ${passed ? '' : `<p style="color:var(--gray);font-size:.85rem;margin-top:8px">Für das Abzeichen brauchst du mindestens ${Math.round(QUIZ_PASS_RATE * 100)} % — versuch es gleich nochmal!</p>`}
    ${dailyRecapHtml()}
    <div class="actions" style="margin-top:20px">
      <button type="button" class="btn btn-primary" id="restartQuiz">
        <i class="fas fa-award"></i> ${passed ? 'Noch einmal' : 'Nochmal versuchen'}
      </button>
    </div>
  `;
  const { deckId, quizTheme } = session;
  document.getElementById('restartQuiz').addEventListener('click', () => startThemeQuiz(deckId, quizTheme));
  setCurrentSession(null);

  const textEl = document.getElementById('progress-text');
  const barEl  = document.getElementById('progress-bar');
  if (textEl) textEl.textContent = `${total}/${total} Fragen`;
  if (barEl)  barEl.style.width = '100%';
}