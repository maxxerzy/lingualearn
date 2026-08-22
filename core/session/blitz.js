import { loadDeck, getCurrentSession, setCurrentSession } from '../state.js';
import { shuffleArray } from '../../utils/helpers.js';
import { recordSessionEnd, checkAchievements, noteBlitz } from '../gamification.js';
import { renderGamiHeader, renderLearnWidgets } from '../../ui/gami.js';
import { confettiBurst, toastAchievements, toastCosmetics } from '../../ui/toast.js';
import { checkNewCosmetics } from '../cosmetics.js';
import {
  showCombo, celebrateSessionEnd, promptText, answerText, enterFocus,
  clearBlitzTimer, recordAnswerEffects, dailyRecapHtml, escHtml, timers
} from './shared.js';

// ── BLITZRUNDE ───────────────────────────────────────────────────
// 60 Sekunden, so viele Multiple-Choice-Antworten wie möglich.
// Antworten zählen normal (XP, Combo, SRS); die erste Runde des Tages
// bringt zusätzlich Diamanten in Höhe des Scores (max. 15).
const BLITZ_SECONDS = 60;

export async function startBlitz() {
  clearBlitzTimer();
  const deckId = document.getElementById('deckSelect').value;
  const deck = await loadDeck(deckId);
  if (!deck?.cards?.length) { alert('Bitte wähle ein gültiges Deck aus.'); return; }

  const shuffled = shuffleArray([...deck.cards]);
  const session = {
    deck,
    deckId,
    cards: shuffled,
    mode: 'blitz',
    currentIndex: 0,
    correctAnswers: 0,
    totalCards: shuffled.length,
    currentPrompt: null,
    combo: 0,
    boosted: false,
    blitzEnd: Date.now() + BLITZ_SECONDS * 1000,
    blitzAnswered: 0,
    queue: [],
    reviewQueue: [],
    reviewRound: 1,
  };
  setCurrentSession(session);
  enterFocus('blitz');
  const icon = document.getElementById('sessionModeIcon');
  if (icon) icon.className = 'fas fa-bolt';
  document.getElementById('session-title').textContent = `⚡ Blitzrunde — ${deck.name}`;

  timers.blitz = setInterval(() => {
    const st = getCurrentSession();
    if (!st || st.mode !== 'blitz') { clearBlitzTimer(); return; }
    const left = Math.max(0, Math.ceil((st.blitzEnd - Date.now()) / 1000));
    const el = document.getElementById('blitzTimer');
    if (el) {
      el.textContent = `${left}s`;
      el.classList.toggle('blitz-timer--low', left <= 10);
    }
    if (left <= 0) endBlitz();
  }, 250);

  showBlitz();
}

function showBlitz() {
  const session = getCurrentSession();
  if (!session || session.mode !== 'blitz') return;
  if (Date.now() >= session.blitzEnd) { endBlitz(); return; }

  const card = session.cards[session.currentIndex % session.cards.length];
  session.currentIndex++;
  const pool = session.cards.filter(c => c.back !== card.back && c.front !== card.front);
  const options = shuffleArray([card, ...shuffleArray(pool).slice(0, 3)]);
  session.currentPrompt = { card, options };
  setCurrentSession(session);

  const left = Math.max(0, Math.ceil((session.blitzEnd - Date.now()) / 1000));
  document.getElementById('learnArea').innerHTML = `
    <div class="mc-card blitz-card">
      <div class="blitz-head">
        <span class="blitz-score"><i class="fas fa-bolt"></i> ${session.correctAnswers}</span>
        <span class="blitz-timer" id="blitzTimer">${left}s</span>
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
  document.querySelectorAll('.blitz-card .mc-option').forEach(btn =>
    btn.addEventListener('click', () => checkBlitzAnswer(Number(btn.dataset.idx))));

  const t = document.getElementById('progress-text');
  if (t) t.textContent = `${session.blitzAnswered} Antworten`;
  const b = document.getElementById('progress-bar');
  if (b) b.style.width = `${Math.round(((BLITZ_SECONDS * 1000 - (session.blitzEnd - Date.now())) / (BLITZ_SECONDS * 1000)) * 100)}%`;
}

function checkBlitzAnswer(idx) {
  const session = getCurrentSession();
  if (!session?.currentPrompt || session.mode !== 'blitz') return;
  const { card, options } = session.currentPrompt;
  const isCorrect = options[idx] === card;
  session.blitzAnswered++;
  if (isCorrect) session.correctAnswers++;
  session.currentPrompt = null;
  setCurrentSession(session);
  recordAnswerEffects(session, card, isCorrect, isCorrect);
  // Kein „Weiter"-Knopf — sofort die nächste Frage (Tempo!).
  if (Date.now() >= session.blitzEnd) { endBlitz(); return; }
  showBlitz();
}

function endBlitz() {
  clearBlitzTimer();
  const session = getCurrentSession();
  if (!session || session.mode !== 'blitz') return;

  const score = session.correctAnswers;
  const answered = session.blitzAnswered;
  const { gems, first, best, record } = noteBlitz(score);
  const { xpEarned, game } = recordSessionEnd({
    language: session.deck.language,
    correct: score,
    total: answered,
  });
  const xpTotal = (session.xpFromAnswers || 0) + xpEarned;
  showCombo(0);
  renderGamiHeader();
  renderLearnWidgets();
  toastAchievements(checkAchievements());
  toastCosmetics(checkNewCosmetics());
  celebrateSessionEnd();
  if (gems > 0 || (record && score > 0)) confettiBurst();

  document.getElementById('learnArea').innerHTML = `
    <h3 style="font-size:1.6rem;margin-bottom:12px">⚡ Blitzrunde vorbei!</h3>
    <p style="font-size:2.2rem;font-weight:800;color:var(--primary);margin-bottom:4px">${score}</p>
    <p style="color:var(--gray);margin-bottom:14px">richtige Antworten in ${BLITZ_SECONDS} Sekunden (${answered} beantwortet)</p>
    <div class="session-rewards">
      <span class="reward-pill reward-pill--xp"><i class="fas fa-bolt"></i> +${xpTotal} XP</span>
      ${gems > 0 ? `<span class="reward-pill reward-pill--gems"><i class="fas fa-gem"></i> +${gems} Tagesbonus</span>` : ''}
      ${record && score > 0 ? '<span class="reward-pill reward-pill--perfect"><i class="fas fa-trophy"></i> Neuer Rekord!</span>' : ''}
      <span class="reward-pill reward-pill--streak"><i class="fas fa-fire"></i> Serie: ${game.streak.current} ${game.streak.current === 1 ? 'Tag' : 'Tage'}</span>
    </div>
    <p style="color:var(--gray);font-size:.85rem;margin-top:8px"><i class="fas fa-trophy" style="color:var(--warning,#f4a261)"></i> Bestleistung: <b>${best}</b></p>
    ${!first ? '<p style="color:var(--gray);font-size:.82rem;margin-top:8px">Diamanten-Bonus gibt es für die erste Runde des Tages.</p>' : ''}
    ${dailyRecapHtml()}
    <div class="actions" style="margin-top:20px">
      <button type="button" class="btn btn-primary" id="restartBlitz">
        <i class="fas fa-bolt"></i> Noch eine Runde
      </button>
    </div>
  `;
  document.getElementById('restartBlitz').addEventListener('click', startBlitz);
  setCurrentSession(null);
}