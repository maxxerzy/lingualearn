import { loadDeck, getCurrentSession, setCurrentSession, getUserStats, setUserStats } from './state.js';
import { updateProgress } from './progress.js';
import { updateStats } from './stats.js';
import { shuffleArray } from '../utils/helpers.js';
import { isCognate } from '../utils/cognate.js';
import { recordCardAnswer, getDueFronts } from './cardProgress.js';
import { recordGameAnswer, recordSessionEnd, checkAchievements, consumeXpBoost, consumeCelebrations, noteCombo, getGame, XP } from './gamification.js';
import { renderGamiHeader, renderLearnWidgets } from '../ui/gami.js';
import { showToast, toastAchievements, toastCosmetics, confettiBurst } from '../ui/toast.js';
import { checkNewCosmetics } from './cosmetics.js';
import { pendingQuestClaims } from './quests.js';
import { saveErrors, clearErrors } from './errorLog.js';
import { playCorrect, playWrong } from '../utils/feedback.js';
import { createUserStore } from './userStore.js';

// Vergoldete (nach Abschluss wiederholte) Lektionen pro Deck.
const goldStore = createUserStore('lingualearn_gold_');
export function reinitGold() { goldStore.reinit(); }
export function getGoldLessons(deckId) { return goldStore.get()[deckId] || []; }
function markGoldLesson(deckId, lessonIdx) {
  const map = goldStore.get();
  const arr = new Set(map[deckId] || []);
  arr.add(lessonIdx);
  map[deckId] = [...arr];
  goldStore.save(map);
}
import { nextLessonCards, lessonNumber, advanceCourse, getCourseState, getSentencesDone, markSentencesDone } from './course.js';

// Erfolge prüfen + einblenden, danach dadurch freigeschaltete Cosmetics.
function announceUnlocks() {
  toastAchievements(checkAchievements());
  toastCosmetics(checkNewCosmetics());
}

// Combo-Anzeige (aufeinanderfolgende richtige Antworten).
function showCombo(combo, bonus) {
  let el = document.getElementById('comboFloat');
  if (!el) { el = document.createElement('div'); el.id = 'comboFloat'; el.className = 'combo-float'; document.body.appendChild(el); }
  if (combo >= 3) {
    el.innerHTML = `<i class="fas fa-fire"></i> Combo ×${combo}${bonus ? ` <span>+${bonus}</span>` : ''}`;
    el.classList.remove('combo-float--show');
    void el.offsetWidth;   // Reflow → Animation neu starten
    el.classList.add('combo-float--show');
  } else {
    el.classList.remove('combo-float--show');
  }
}

// Zusatz-Belohnungen am Sessionende: Diamanten-Pille, XP-Boost-Hinweis,
// Streak-Freeze- und Quest-Meldungen.
function rewardExtras(gemsEarned, boosted) {
  return `${gemsEarned ? `<span class="reward-pill reward-pill--gems"><i class="fas fa-gem"></i> +${gemsEarned}</span>` : ''}${boosted ? '<span class="reward-pill reward-pill--boost"><i class="fas fa-bolt"></i> 2× XP</span>' : ''}`;
}
function celebrateSessionEnd() {
  announceCelebrations();
  const g = getGame();
  if (g.streakFrozeToday) {
    showToast('<i class="fas fa-snowflake toast__icon"></i><div class="toast__body"><b>Streak-Freeze eingesetzt</b><span>Deine Serie ist geschützt geblieben.</span></div>');
  }
  const pend = pendingQuestClaims();
  if (pend.length) {
    showToast(`<i class="fas fa-bullseye toast__icon"></i><div class="toast__body"><b>${pend.length} Quest${pend.length > 1 ? 's' : ''} erledigt!</b><span>In der Arena abholen (+Diamanten).</span></div>`);
  }
}

const LANG_CODES = { da: 'da-DK', el: 'el-GR', fr: 'fr-FR', es: 'es-ES', la: 'la', ru: 'ru-RU', ja: 'ja-JP' };
const LANG_NAMES  = { da: 'Dänisch', el: 'Griechisch', fr: 'Französisch', es: 'Spanisch', la: 'Latein', ru: 'Russisch', ja: 'Japanisch' };

function getLangCode(lang) {
  return LANG_CODES[lang] || lang;
}

function getLangName(lang) {
  return LANG_NAMES[lang] || lang;
}

function speakWord(text, lang) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = getLangCode(lang);
  utt.rate = 0.85;
  window.speechSynthesis.speak(utt);
}

export function getSelectedMode() {
  const btn = document.querySelector('.mode-btn.active');
  return btn ? btn.dataset.mode : 'flashcard';
}

// Fokus-Modus: blendet (mobil) die Konfiguration aus und zeigt nur den
// Lernbereich mit Zurück-/Modus-Leiste. Die Lernkarte gibt's im Kurs.
function enterFocus(mode) {
  document.getElementById('view-learn')?.classList.add('session-active');
  const mapBtn = document.getElementById('sessionMapBtn');
  if (mapBtn) mapBtn.hidden = mode !== 'course';
  const menu = document.getElementById('sessionModeMenu');
  if (menu) menu.hidden = true;
  // Modus-Knopf zeigt das Icon des aktuellen Modus (+ Pfeil aus dem CSS).
  const icon = document.getElementById('sessionModeIcon');
  const srcIcon = document.querySelector(`.mode-btn[data-mode="${mode}"] i`);
  if (icon && srcIcon) icon.className = srcIcon.className;
}

// Session verlassen → zurück zur Konfiguration.
export function exitSession() {
  setCurrentSession(null);
  document.getElementById('view-learn')?.classList.remove('session-active');
  const menu = document.getElementById('sessionModeMenu');
  if (menu) menu.hidden = true;
  const title = document.getElementById('session-title');
  if (title) title.textContent = 'Bereit zum Lernen';
  const area = document.getElementById('learnArea');
  if (area) area.innerHTML = '<p>Wähle ein Deck und einen Modus, dann starte die Session.</p>';
  const t = document.getElementById('progress-text');
  if (t) t.textContent = '0/0 Karten';
  const b = document.getElementById('progress-bar');
  if (b) b.style.width = '0%';
  renderLearnWidgets();
}

// Kognat-Hinweis: verwandte Wörter merkt man sich leichter.
function cognateChip(card) {
  if (!isCognate(card.front, card.back, card.roman)) return '';
  return `<div class="cognate-chip" title="Dieses Wort ist mit dem deutschen „${escHtml(card.front)}" verwandt — leichter zu merken!">
    <i class="fas fa-link"></i> verwandt mit „${escHtml(card.front)}"
  </div>`;
}

export async function startSession() {
  const deckId = document.getElementById('deckSelect').value;
  const startBtn = document.getElementById('startBtn');
  if (startBtn) startBtn.disabled = true;

  const deck = await loadDeck(deckId);

  if (startBtn) startBtn.disabled = false;

  if (!deck?.cards?.length) {
    alert('Bitte wähle ein gültiges Deck aus.');
    return;
  }

  // Fällig-Modus: nur Karten lernen, deren Wiederholungsdatum erreicht ist.
  let sessionCards = deck.cards;
  const dueOnly = document.getElementById('dueOnly')?.checked;
  if (dueOnly) {
    const dueFronts = new Set(getDueFronts(deckId));
    sessionCards = deck.cards.filter(c => dueFronts.has(c.front));
    if (sessionCards.length === 0) {
      alert('Keine fälligen Karten in diesem Deck — starte eine normale Session, um neue Karten zu lernen.');
      return;
    }
  }

  const mode = getSelectedMode();

  // Satzbau braucht Karten mit Beispielsatz (3–12 Wörter, mit Übersetzung).
  if (mode === 'build') {
    sessionCards = sessionCards.filter(c => {
      if (!c.example || !c.exampleDE) return false;
      const n = c.example.trim().split(/\s+/).length;
      return n >= 3 && n <= 12;
    });
    if (sessionCards.length === 0) {
      alert('Für dieses Deck gibt es keine passenden Sätze für den Satzbau-Modus.');
      return;
    }
  }

  // Story: 5 aufeinanderfolgende Sätze (Deck ist thematisch sortiert →
  // die Szenen gehören zusammen); braucht genug Sätze für die Antwortoptionen.
  let storyPool = null;
  if (mode === 'story') {
    storyPool = sessionCards.filter(c => c.example && c.exampleDE);
    if (storyPool.length < 8) {
      alert('Für Story-Lektionen braucht das Deck mehr Beispielsätze.');
      return;
    }
    const startAt = Math.floor(Math.random() * (storyPool.length - 5 + 1));
    sessionCards = storyPool.slice(startAt, startAt + 5);
  }

  enterFocus(mode);

  if (mode === 'course') {
    startCourseLesson(deck, deckId);
    return;
  }

  // Story behält die Erzähl-Reihenfolge, alle anderen Modi mischen.
  const shuffled = mode === 'story' ? [...sessionCards] : shuffleArray([...sessionCards]);

  const session = {
    deck,
    deckId,
    cards: shuffled,
    mode,
    storyPool,
    currentIndex: 0,
    correctAnswers: 0,
    totalCards: shuffled.length,
    currentPrompt: null,
    combo: 0,
    boosted: consumeXpBoost(),   // XP-Boost aus dem Shop einlösen
    // flashcard
    queue: [...shuffled],
    reviewQueue: [],
    reviewRound: 1
  };

  setCurrentSession(session);
  document.getElementById('session-title').textContent = `${deck.name}`;
  updateProgress();

  if (mode === 'flashcard') {
    showFlashcard();
  } else if (mode === 'multiplechoice') {
    showMultipleChoice();
  } else if (mode === 'listen') {
    showListenDuel();
  } else if (mode === 'typing') {
    showTyping();
  } else if (mode === 'build') {
    showSentenceBuild();
  } else if (mode === 'speak') {
    showSpeaking();
  } else if (mode === 'story') {
    showStory();
  } else {
    showNextCard();
  }
}

// ── FLASHCARD MODE ───────────────────────────────────────────────

function showFlashcard() {
  const session = getCurrentSession();
  if (!session || session.queue.length === 0) {
    endSession();
    return;
  }

  const card = session.queue[0];
  const learnArea = document.getElementById('learnArea');

  learnArea.innerHTML = `
    <div class="flashcard-front">
      <p class="fc-label">Deutsch</p>
      <div class="fc-word">${escHtml(card.front)}</div>
      <div class="actions">
        <button type="button" class="btn btn-primary" id="showAnswer">
          <i class="fas fa-eye"></i> Antwort zeigen
        </button>
      </div>
      <div class="fc-queue-info">
        ${session.reviewRound > 1
          ? `<span class="review-badge"><i class="fas fa-redo"></i> Wiederholung ${session.reviewRound}</span>`
          : ''}
      </div>
    </div>
  `;

  document.getElementById('showAnswer').addEventListener('click', () => showFlashcardBack(card));
  updateProgress();
}

function showFlashcardBack(card) {
  const session = getCurrentSession();
  const lang = session.deck.language;
  const learnArea = document.getElementById('learnArea');

  // Pronunciation of the target word: IPA (+ romanization for non-Latin scripts).
  const ipaParts = [];
  if (card.ipa)   ipaParts.push(`<span class="fc-ipa-tip__ipa">/${escHtml(card.ipa)}/</span>`);
  if (card.roman) ipaParts.push(`<span class="fc-ipa-tip__roman">${escHtml(card.roman)}</span>`);
  const ipaMarkup = ipaParts.join('');
  const pron = ipaParts.length > 0;

  learnArea.innerHTML = `
    <div class="flashcard-back">
      <p class="fc-label">Deutsch</p>
      <div class="fc-word fc-word-source">${escHtml(card.front)}</div>
      <div class="fc-arrow"><i class="fas fa-arrow-down"></i></div>
      <p class="fc-label">${getLangName(lang)}</p>
      <div class="fc-word fc-word-target">
        ${escHtml(card.back)}
        <button type="button" class="audio-btn" id="audioBtn" title="Aussprache anhören">
          <i class="fas fa-volume-up"></i>
        </button>
      </div>
      ${cognateChip(card)}
      ${card.example ? `
        <div class="fc-example-block">
          <p class="fc-example${pron ? ' has-ipa' : ''}"${pron ? ' tabindex="0"' : ''}>
            <strong>${escHtml(card.example)}</strong>
            ${pron ? `<span class="fc-ipa-tip" role="tooltip">
              <span class="fc-ipa-tip__word">${escHtml(card.back)}</span>${ipaMarkup}
            </span>` : ''}
          </p>
          ${card.exampleDE ? `<p class="fc-example-de">${escHtml(card.exampleDE)}</p>` : ''}
        </div>
      ` : ''}
      <div class="fc-rating">
        <p class="fc-rating-label">Wie gut wusstest du das?</p>
        <div class="actions">
          <button type="button" class="btn btn-easy" data-rating="easy">
            <i class="fas fa-star"></i> Einfach
          </button>
          <button type="button" class="btn btn-good" data-rating="good">Gut</button>
          <button type="button" class="btn btn-hard" data-rating="hard">Schwer</button>
          <button type="button" class="btn btn-again" data-rating="again">
            <i class="fas fa-redo"></i> Nochmal
          </button>
        </div>
      </div>
    </div>
  `;

  // Auto-play pronunciation
  speakWord(card.back, lang);

  document.getElementById('audioBtn').addEventListener('click', () => speakWord(card.back, lang));

  // Touch devices have no hover — let a tap toggle the pronunciation tooltip.
  const exampleEl = learnArea.querySelector('.fc-example.has-ipa');
  if (exampleEl) {
    exampleEl.addEventListener('click', () => exampleEl.classList.toggle('show-ipa'));
  }

  document.querySelectorAll('[data-rating]').forEach(btn => {
    btn.addEventListener('click', () => rateFlashcard(card, btn.dataset.rating));
  });
}

function rateFlashcard(card, rating) {
  const session = getCurrentSession();
  const userStats = getUserStats();

  session.queue.shift();
  session.currentIndex++;

  // „Nochmal" legt die Karte in die Wiederholungsrunde dieser Session.
  if (rating === 'again') {
    session.reviewQueue.push(card);
  }

  const isCorrect = rating !== 'again' && rating !== 'hard';
  if (isCorrect) {
    session.correctAnswers++;
    userStats.learnedWords = (userStats.learnedWords || 0) + 1;
    userStats.totalCorrect = (userStats.totalCorrect || 0) + 1;
  }
  userStats.totalAnswered = (userStats.totalAnswered || 0) + 1;
  userStats.successRate = Math.round((session.correctAnswers / session.currentIndex) * 100);
  setUserStats(userStats);
  updateStats();

  recordAnswerEffects(session, card, isCorrect, rating);

  if (session.queue.length === 0) {
    if (session.reviewQueue.length > 0) {
      session.queue = shuffleArray([...session.reviewQueue]);
      session.reviewQueue = [];
      session.reviewRound++;
      session.currentIndex = 0;
      session.correctAnswers = 0;
    } else {
      setCurrentSession(session);
      endSession();
      return;
    }
  }

  setCurrentSession(session);
  updateProgress();
  showFlashcard();
}

// ── MULTIPLE CHOICE MODE ─────────────────────────────────────────

function showMultipleChoice() {
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
      <p class="fc-label">Deutsch</p>
      <div class="fc-word mc-question">${escHtml(card.front)}</div>
      <p class="prompt">${getLangName(lang)} — welche Übersetzung stimmt?</p>
      ${mcOptionsMarkup(options, { withAudio: true })}
    </div>
  `;

  session.currentIndex++;
  session.currentPrompt = { card, options };
  setCurrentSession(session);
  updateProgress();

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

function buildMCOptions(card, cards) {
  const wrongs = shuffleArray(cards.filter(c => c.back !== card.back)).slice(0, 3);
  return shuffleArray([card, ...wrongs]);
}

// Gemeinsames Markup der Antwort-Optionen (A–D) + Feedback-Container.
// withAudio blendet je Option einen Aussprache-Knopf ein (nur MC-Modus).
function mcOptionsMarkup(options, { withAudio = false } = {}) {
  return `
      <div class="mc-options">
        ${options.map((opt, i) => `
          <button type="button" class="btn mc-option" data-idx="${i}">
            <span class="mc-key">${'ABCD'[i]}</span>
            <span class="mc-text">${escHtml(opt.back)}${withAudio ? `
              <span class="audio-btn mc-audio" role="button" tabindex="0" data-text="${escHtml(opt.back)}" title="Aussprache">
                <i class="fas fa-volume-up"></i>
              </span>` : ''}</span>
          </button>
        `).join('')}
      </div>
      <div id="mc-fb"></div>`;
}

// Deaktiviert die Optionen und markiert richtig/falsch. Gibt Auswertung zurück.
function markMcAnswer(options, chosenIdx, card) {
  const correctIdx = options.findIndex(o => o.back === card.back);
  const isCorrect = options[chosenIdx].back === card.back;
  document.querySelectorAll('.mc-option').forEach((b, i) => {
    b.disabled = true;
    if (i === correctIdx) b.classList.add('mc-correct');
    else if (i === chosenIdx && !isCorrect) b.classList.add('mc-wrong');
  });
  return { isCorrect, correctIdx };
}

// Gemeinsamer Abschluss jeder Antwort: SRS-Level, XP, Header/Widgets, Erfolge.
// ratingOrBool geht an das SRS (Flashcard: 'easy'|'good'|'hard'|'again';
// die MC/Vergleich/Kurs-Pfade übergeben einfach isCorrect).
function recordAnswerEffects(session, card, isCorrect, ratingOrBool) {
  recordCardAnswer(session.deckId, card.front, ratingOrBool);
  // Combo: Serie richtiger Antworten gibt Bonus-XP (bis +10).
  session.combo = isCorrect ? (session.combo || 0) + 1 : 0;
  if (isCorrect) noteCombo(session.combo);
  const comboBonus = isCorrect && session.combo >= 2 ? Math.min(session.combo - 1, 5) * 2 : 0;
  const { gained } = recordGameAnswer(isCorrect, { bonus: comboBonus, boost: !!session.boosted });
  session.xpFromAnswers = (session.xpFromAnswers || 0) + gained;
  // Falsche Antworten fürs anschließende Fehler-Training merken.
  if (!isCorrect) {
    session.wrongCards = session.wrongCards || [];
    if (!session.wrongCards.some(c => c.front === card.front)) session.wrongCards.push(card);
  }
  renderGamiHeader();
  renderLearnWidgets();
  announceUnlocks();
  announceCelebrations();
  showCombo(session.combo, comboBonus);
  if (isCorrect) playCorrect(); else playWrong();
}

// Level-Up- und Streak-Truhen-Feiern (Toast + Konfetti).
function announceCelebrations() {
  const c = consumeCelebrations();
  if (c.levelUp) {
    confettiBurst();
    showToast(`<i class="fas fa-trophy toast__icon"></i><div class="toast__body"><b>Level ${c.levelUp} erreicht! 🎉</b><span>+${c.gemBonus} Diamanten als Bonus</span></div>`);
  }
  if (c.chest) {
    confettiBurst();
    showToast(`<i class="fas fa-box-open toast__icon"></i><div class="toast__body"><b>${c.chest.days}-Tage-Truhe geöffnet! 🎁</b><span>+${c.chest.gems} Diamanten für deine Serie</span></div>`);
  }
  if (c.wager) {
    if (c.wager.won) { confettiBurst(); showToast('<i class="fas fa-dice toast__icon"></i><div class="toast__body"><b>Wette gewonnen! 🎲</b><span>Doppelt oder nichts: +100 Diamanten</span></div>'); }
    else showToast('<i class="fas fa-dice toast__icon"></i><div class="toast__body"><b>Wette verloren</b><span>Die Serie ist gerissen — versuch es neu!</span></div>', { variant: 'warn' });
  }
}

// Tages-Rückblick: kleine Bilanz des heutigen Lernens für die Endkarte.
function dailyRecapHtml() {
  const g = getGame();
  const d = g.daily.date === new Date().toISOString().slice(0, 10) ? g.daily : {};
  return `
    <div class="day-recap">
      <span class="day-recap__title"><i class="fas fa-sun"></i> Heute</span>
      <span class="day-recap__stat"><b>${d.xp || 0}</b> XP</span>
      <span class="day-recap__stat"><b>${d.correct || 0}</b> richtig</span>
      <span class="day-recap__stat"><b>×${d.combo || 0}</b> Combo</span>
      <span class="day-recap__stat"><b>${g.streak.current}</b> 🔥</span>
    </div>`;
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
         <p>❌ Falsch — richtig: <b>${escHtml(card.back)}</b></p>
       </div>`;

  fb.innerHTML += `
    <div class="actions" style="margin-top:14px">
      <button type="button" class="btn btn-primary" id="mcNext">Weiter</button>
    </div>
  `;

  document.getElementById('mcNext').addEventListener('click', showMultipleChoice);
}

// ── AUSSPRACHE-DUELL (Hörverständnis) ────────────────────────────
// Das Wort wird vorgelesen; aus 4 Schreibweisen die richtige wählen.
function showListenDuel() {
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
    <div class="mc-card listen-card">
      <p class="fc-label">Hörverständnis</p>
      <button type="button" class="listen-play" id="listenPlay" title="Nochmal abspielen">
        <i class="fas fa-volume-up"></i>
      </button>
      <p class="prompt">Welches Wort hast du gehört?</p>
      ${mcOptionsMarkup(options)}
    </div>
  `;

  session.currentIndex++;
  session.currentPrompt = { card, options };
  setCurrentSession(session);
  updateProgress();

  // Autoplay + Wiederholung auf Knopfdruck.
  speakWord(card.back, lang);
  document.getElementById('listenPlay').addEventListener('click', () => speakWord(card.back, lang));

  learnArea.querySelectorAll('.mc-option').forEach(btn => {
    btn.addEventListener('click', () => checkListenAnswer(Number(btn.dataset.idx)));
  });
}

function checkListenAnswer(selectedIdx) {
  const session = getCurrentSession();
  const userStats = getUserStats();
  const { card, options } = session.currentPrompt;
  const lang = session.deck.language;

  const { isCorrect } = markMcAnswer(options, selectedIdx, card);

  if (isCorrect) {
    session.correctAnswers++;
    userStats.learnedWords = (userStats.learnedWords || 0) + 1;
    userStats.totalCorrect = (userStats.totalCorrect || 0) + 1;
  }
  userStats.totalAnswered = (userStats.totalAnswered || 0) + 1;
  userStats.successRate = Math.round((session.correctAnswers / session.currentIndex) * 100);
  setUserStats(userStats);
  updateStats();
  session.currentPrompt = null;
  setCurrentSession(session);

  recordAnswerEffects(session, card, isCorrect, isCorrect);

  const fb = document.getElementById('mc-fb');
  fb.innerHTML = `
    ${isCorrect
      ? '<div class="correct" style="margin-top:14px"><p>✅ Richtig!</p></div>'
      : `<div class="incorrect" style="margin-top:14px"><p>❌ Falsch — richtig: <b>${escHtml(card.back)}</b></p></div>`}
    <p class="listen-reveal">${escHtml(card.back)} — <b>${escHtml(card.front)}</b></p>
    <div class="actions" style="margin-top:14px">
      <button type="button" class="btn btn-primary" id="mcNext">Weiter</button>
    </div>
  `;

  document.getElementById('mcNext').addEventListener('click', showListenDuel);
}

// ── TYPING MODE (freies Abrufen) ─────────────────────────────────
// Die Übersetzung selbst eintippen — tolerant gegenüber Groß-/Klein-
// schreibung, Satzzeichen und Sonderbuchstaben (æ→ae, ø→o …); für
// nicht-lateinische Schriften (ru/ja) zählt auch die Umschrift (roman).
const TYPO_MAP = { 'æ': 'ae', 'ø': 'o', 'å': 'a', 'ß': 'ss', 'œ': 'oe', 'ð': 'd', 'þ': 'th' };
function normAnswer(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[.,!?;:„“”"'’«»()¿¡]/g, '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[æøåßœðþ]/g, ch => TYPO_MAP[ch] || ch)
    .replace(/\s+/g, ' ')
    .trim();
}

function showTyping() {
  const session = getCurrentSession();
  if (!session || session.currentIndex >= session.cards.length) {
    endSession();
    return;
  }

  const card = session.cards[session.currentIndex];
  const lang = session.deck.language;
  const learnArea = document.getElementById('learnArea');

  learnArea.innerHTML = `
    <div class="mc-card typing-card">
      <p class="fc-label">Deutsch</p>
      <div class="fc-word">${escHtml(card.front)}</div>
      <p class="prompt">Schreibe die Übersetzung (${getLangName(lang)}):</p>
      <input type="text" id="typingInput" class="input typing-input" autocomplete="off"
        autocorrect="off" autocapitalize="none" spellcheck="false" enterkeyhint="done">
      <div class="actions">
        <button type="button" class="btn btn-primary" id="typingCheck">Prüfen</button>
        <button type="button" class="btn" id="typingReveal">Aufdecken</button>
      </div>
      <div id="mc-fb"></div>
    </div>
  `;

  session.currentIndex++;
  session.currentPrompt = { card };
  setCurrentSession(session);
  updateProgress();

  const input = document.getElementById('typingInput');
  input.focus();
  input.addEventListener('keydown', e => { if (e.key === 'Enter') checkTyping(false); });
  document.getElementById('typingCheck').addEventListener('click', () => checkTyping(false));
  document.getElementById('typingReveal').addEventListener('click', () => checkTyping(true));
}

function checkTyping(revealed) {
  const session = getCurrentSession();
  if (!session?.currentPrompt) return;
  const userStats = getUserStats();
  const { card } = session.currentPrompt;
  const lang = session.deck.language;

  const input = document.getElementById('typingInput');
  const guess = input?.value || '';
  if (!revealed && normAnswer(guess) === '') { input?.focus(); return; }

  const isCorrect = !revealed && (
    normAnswer(guess) === normAnswer(card.back) ||
    (card.roman && normAnswer(guess) === normAnswer(card.roman))
  );

  if (input) input.disabled = true;
  document.getElementById('typingCheck')?.setAttribute('disabled', '');
  document.getElementById('typingReveal')?.setAttribute('disabled', '');

  if (isCorrect) {
    session.correctAnswers++;
    userStats.learnedWords = (userStats.learnedWords || 0) + 1;
    userStats.totalCorrect = (userStats.totalCorrect || 0) + 1;
  }
  userStats.totalAnswered = (userStats.totalAnswered || 0) + 1;
  userStats.successRate = Math.round((session.correctAnswers / session.currentIndex) * 100);
  setUserStats(userStats);
  updateStats();
  session.currentPrompt = null;
  setCurrentSession(session);

  recordAnswerEffects(session, card, isCorrect, isCorrect);
  speakWord(card.back, lang);

  const pron = [];
  if (card.roman) pron.push(escHtml(card.roman));
  if (card.ipa) pron.push('/' + escHtml(card.ipa) + '/');
  const fb = document.getElementById('mc-fb');
  fb.innerHTML = `
    ${isCorrect
      ? '<div class="correct" style="margin-top:14px"><p>✅ Richtig!</p></div>'
      : `<div class="incorrect" style="margin-top:14px"><p>${revealed ? '👁 Lösung' : '❌ Falsch'} — richtig: <b>${escHtml(card.back)}</b></p></div>`}
    ${pron.length ? `<p class="listen-reveal">${pron.join(' · ')}</p>` : ''}
    <div class="actions" style="margin-top:14px">
      <button type="button" class="btn btn-primary" id="mcNext">Weiter</button>
    </div>
  `;
  document.getElementById('mcNext').addEventListener('click', showTyping);
}

// ── SENTENCE BUILD MODE (Satzbau) ────────────────────────────────
// Den Beispielsatz aus gemischten Wort-Kacheln zusammensetzen —
// die deutsche Übersetzung dient als Vorlage.
function showSentenceBuild() {
  const session = getCurrentSession();
  if (!session || session.currentIndex >= session.cards.length) {
    endSession();
    return;
  }

  const card = session.cards[session.currentIndex];
  const lang = session.deck.language;
  // Jede 2. Karte: Hör-Variante — der Satz wird vorgesprochen statt gezeigt.
  const byEar = session.currentIndex % 2 === 1;
  const tokens = card.example.trim().split(/\s+/);
  const order = shuffleArray(tokens.map((_, i) => i));
  const learnArea = document.getElementById('learnArea');

  learnArea.innerHTML = `
    <div class="mc-card build-card">
      <p class="fc-label">${byEar ? 'Hör-Satzbau' : 'Satzbau'}</p>
      ${byEar
        ? `<button type="button" class="listen-play" id="buildPlay" title="Satz anhören"><i class="fas fa-volume-up"></i></button>
           <p class="prompt">Höre den Satz und baue ihn nach:</p>`
        : `<p class="build-src">„${escHtml(card.exampleDE)}"</p>
           <p class="prompt">Setze den Satz zusammen:</p>`}
      <div class="build-answer" id="buildAnswer" aria-label="Deine Antwort"></div>
      <div class="build-pool" id="buildPool">
        ${order.map(i => `<button type="button" class="build-tile" data-i="${i}">${escHtml(tokens[i])}</button>`).join('')}
      </div>
      <div class="actions">
        <button type="button" class="btn btn-primary" id="buildCheck" disabled>Prüfen</button>
      </div>
      <div id="mc-fb"></div>
    </div>
  `;

  session.currentIndex++;
  session.currentPrompt = { card, tokens, placed: [] };
  setCurrentSession(session);
  updateProgress();

  if (byEar) {
    speakWord(card.example, lang);
    document.getElementById('buildPlay')?.addEventListener('click', () => speakWord(card.example, lang));
  }

  const pool = document.getElementById('buildPool');
  const answer = document.getElementById('buildAnswer');
  const checkBtn = document.getElementById('buildCheck');

  function sync() {
    const s = getCurrentSession();
    checkBtn.disabled = s.currentPrompt.placed.length !== tokens.length;
  }

  pool.addEventListener('click', e => {
    const tile = e.target.closest('.build-tile');
    if (!tile || tile.disabled) return;
    tile.disabled = true;
    tile.classList.add('build-tile--used');
    const s = getCurrentSession();
    s.currentPrompt.placed.push(Number(tile.dataset.i));
    setCurrentSession(s);
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'build-tile build-tile--placed';
    chip.dataset.i = tile.dataset.i;
    chip.textContent = tokens[Number(tile.dataset.i)];
    answer.appendChild(chip);
    sync();
  });

  answer.addEventListener('click', e => {
    const chip = e.target.closest('.build-tile--placed');
    if (!chip) return;
    const i = Number(chip.dataset.i);
    const s = getCurrentSession();
    s.currentPrompt.placed = s.currentPrompt.placed.filter(x => x !== i);
    setCurrentSession(s);
    chip.remove();
    const orig = pool.querySelector(`.build-tile[data-i="${i}"]`);
    if (orig) { orig.disabled = false; orig.classList.remove('build-tile--used'); }
    sync();
  });

  checkBtn.addEventListener('click', checkSentenceBuild);
}

function checkSentenceBuild() {
  const session = getCurrentSession();
  if (!session?.currentPrompt) return;
  const userStats = getUserStats();
  const { card, tokens, placed } = session.currentPrompt;
  const lang = session.deck.language;

  const built = placed.map(i => tokens[i]).join(' ');
  const isCorrect = built === tokens.join(' ');

  document.getElementById('buildCheck')?.setAttribute('disabled', '');
  document.querySelectorAll('.build-tile').forEach(t => (t.disabled = true));

  if (isCorrect) {
    session.correctAnswers++;
    userStats.learnedWords = (userStats.learnedWords || 0) + 1;
    userStats.totalCorrect = (userStats.totalCorrect || 0) + 1;
  }
  userStats.totalAnswered = (userStats.totalAnswered || 0) + 1;
  userStats.successRate = Math.round((session.correctAnswers / session.currentIndex) * 100);
  setUserStats(userStats);
  updateStats();
  session.currentPrompt = null;
  setCurrentSession(session);

  recordAnswerEffects(session, card, isCorrect, isCorrect);
  if (isCorrect) speakWord(card.example, lang);

  const fb = document.getElementById('mc-fb');
  fb.innerHTML = `
    ${isCorrect
      ? '<div class="correct" style="margin-top:14px"><p>✅ Richtig!</p></div>'
      : `<div class="incorrect" style="margin-top:14px"><p>❌ Nicht ganz — richtig wäre:</p><p style="margin-top:6px"><b>${escHtml(card.example)}</b></p></div>`}
    <p class="listen-reveal">„${escHtml(card.exampleDE)}"</p>
    <div class="actions" style="margin-top:14px">
      <button type="button" class="btn btn-primary" id="mcNext">Weiter</button>
    </div>
  `;
  document.getElementById('mcNext').addEventListener('click', showSentenceBuild);
}

// ── SPEAKING MODE (Aussprache üben) ──────────────────────────────
// Das Zielwort laut aussprechen. Wo verfügbar, hört die Web-Speech-
// Erkennung zu und vergleicht; sonst (z. B. iOS) Referenz-Audio +
// ehrliche Selbsteinschätzung.
function speechRecognitionCtor() {
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

function showSpeaking() {
  const session = getCurrentSession();
  if (!session || session.currentIndex >= session.cards.length) {
    endSession();
    return;
  }

  const card = session.cards[session.currentIndex];
  const lang = session.deck.language;
  const SR = speechRecognitionCtor();
  const pron = [];
  if (card.roman) pron.push(escHtml(card.roman));
  if (card.ipa) pron.push('/' + escHtml(card.ipa) + '/');
  const learnArea = document.getElementById('learnArea');

  learnArea.innerHTML = `
    <div class="mc-card speak-card">
      <p class="fc-label">Sprechen</p>
      <div class="fc-word fc-word-target">
        ${escHtml(card.back)}
        <button type="button" class="audio-btn" id="speakListen" title="Anhören"><i class="fas fa-volume-up"></i></button>
      </div>
      ${pron.length ? `<p class="course-pron">${pron.join(' · ')}</p>` : ''}
      <p class="prompt">Sprich das Wort laut aus${SR ? ' — ich höre zu' : ''}:</p>
      <div class="actions">
        ${SR ? '<button type="button" class="btn btn-primary" id="speakRec"><i class="fas fa-microphone"></i> Aufnehmen</button>' : ''}
        <button type="button" class="btn ${SR ? '' : 'btn-primary'}" id="speakDone">
          ${SR ? 'Ohne Mikro fortfahren' : 'Ich habe es gesprochen'}
        </button>
      </div>
      <div id="mc-fb"></div>
    </div>
  `;

  session.currentIndex++;
  session.currentPrompt = { card };
  setCurrentSession(session);
  updateProgress();

  speakWord(card.back, lang);
  document.getElementById('speakListen').addEventListener('click', () => speakWord(card.back, lang));
  document.getElementById('speakDone').addEventListener('click', () => showSelfAssess(card));
  document.getElementById('speakRec')?.addEventListener('click', () => runSpeechRecognition(card, lang));
}

// Fallback: der Nutzer bewertet ehrlich selbst, wie gut es geklappt hat.
function showSelfAssess(card) {
  const fb = document.getElementById('mc-fb');
  if (!fb) return;
  fb.innerHTML = `
    <p class="prompt" style="margin-top:14px">Wie gut hast du es getroffen?</p>
    <div class="actions">
      <button type="button" class="btn btn-good" id="speakHit"><i class="fas fa-check"></i> Getroffen</button>
      <button type="button" class="btn btn-again" id="speakMiss"><i class="fas fa-redo"></i> Nochmal üben</button>
    </div>
  `;
  document.getElementById('speakHit').addEventListener('click', () => finishSpeaking(card, true, null));
  document.getElementById('speakMiss').addEventListener('click', () => finishSpeaking(card, false, null));
}

function runSpeechRecognition(card, lang) {
  const SR = speechRecognitionCtor();
  if (!SR) { showSelfAssess(card); return; }
  const recBtn = document.getElementById('speakRec');
  if (recBtn) { recBtn.disabled = true; recBtn.innerHTML = '<i class="fas fa-microphone"></i> Ich höre…'; }
  let settled = false;
  const settle = fn => { if (!settled) { settled = true; fn(); } };
  try {
    const rec = new SR();
    rec.lang = getLangCode(lang);
    rec.interimResults = false;
    rec.maxAlternatives = 5;
    rec.onresult = ev => settle(() => {
      const alts = [...(ev.results[0] || [])].map(a => a.transcript);
      const hit = alts.some(t =>
        normAnswer(t) === normAnswer(card.back) ||
        (card.roman && normAnswer(t) === normAnswer(card.roman)));
      finishSpeaking(card, hit, alts[0] || '');
    });
    rec.onerror = () => settle(() => showSelfAssess(card));
    rec.onend = () => settle(() => showSelfAssess(card));
    rec.start();
    setTimeout(() => settle(() => { try { rec.abort(); } catch { /* egal */ } showSelfAssess(card); }), 8000);
  } catch {
    settle(() => showSelfAssess(card));
  }
}

function finishSpeaking(card, isCorrect, heard) {
  const session = getCurrentSession();
  if (!session?.currentPrompt) return;
  const userStats = getUserStats();

  if (isCorrect) {
    session.correctAnswers++;
    userStats.learnedWords = (userStats.learnedWords || 0) + 1;
    userStats.totalCorrect = (userStats.totalCorrect || 0) + 1;
  }
  userStats.totalAnswered = (userStats.totalAnswered || 0) + 1;
  userStats.successRate = Math.round((session.correctAnswers / session.currentIndex) * 100);
  setUserStats(userStats);
  updateStats();
  session.currentPrompt = null;
  setCurrentSession(session);

  recordAnswerEffects(session, card, isCorrect, isCorrect);

  const fb = document.getElementById('mc-fb');
  fb.innerHTML = `
    ${isCorrect
      ? '<div class="correct" style="margin-top:14px"><p>✅ Gut gesprochen!</p></div>'
      : '<div class="incorrect" style="margin-top:14px"><p>❌ Noch nicht ganz — hör es dir nochmal an.</p></div>'}
    ${heard ? `<p class="listen-reveal">Verstanden: „${escHtml(heard)}"</p>` : ''}
    <p class="listen-reveal">${escHtml(card.back)} — <b>${escHtml(card.front)}</b></p>
    <div class="actions" style="margin-top:14px">
      <button type="button" class="btn btn-primary" id="mcNext">Weiter</button>
    </div>
  `;
  document.getElementById('mcNext').addEventListener('click', showSpeaking);
}

// ── STORY MODE (Mini-Geschichte) ─────────────────────────────────
// 5 aufeinanderfolgende Sätze eines Themas als kleine Szene: Satz hören
// & lesen, dann die richtige deutsche Bedeutung wählen.
function showStory() {
  const session = getCurrentSession();
  if (!session || session.currentIndex >= session.cards.length) {
    endSession();
    return;
  }

  const card = session.cards[session.currentIndex];
  const lang = session.deck.language;
  const step = session.currentIndex + 1;

  // 3 Ablenker aus dem Satz-Pool + die richtige Bedeutung.
  const distractors = shuffleArray(
    (session.storyPool || session.cards).filter(c => c !== card && c.exampleDE !== card.exampleDE)
  ).slice(0, 3).map(c => c.exampleDE);
  const options = shuffleArray([
    { text: card.exampleDE, correct: true },
    ...distractors.map(t => ({ text: t, correct: false })),
  ]);

  const learnArea = document.getElementById('learnArea');
  learnArea.innerHTML = `
    <div class="mc-card story-card">
      <span class="course-phase-badge"><i class="fas fa-book-open"></i> Szene ${step}/${session.cards.length}</span>
      <p class="story-sent">
        ${escHtml(card.example)}
        <button type="button" class="audio-btn" id="storyAudio" title="Anhören"><i class="fas fa-volume-up"></i></button>
      </p>
      <p class="prompt">Was bedeutet dieser Satz?</p>
      <div class="mc-options">
        ${options.map((o, i) => `
          <button type="button" class="mc-option" data-idx="${i}">
            <span class="mc-key">${String.fromCharCode(65 + i)}</span>
            <span class="mc-text">${escHtml(o.text)}</span>
          </button>`).join('')}
      </div>
      <div id="mc-fb"></div>
    </div>
  `;

  session.currentIndex++;
  session.currentPrompt = { card, options };
  setCurrentSession(session);
  updateProgress();

  speakWord(card.example, lang);
  document.getElementById('storyAudio').addEventListener('click', () => speakWord(card.example, lang));
  learnArea.querySelectorAll('.mc-option').forEach(btn => {
    btn.addEventListener('click', () => checkStoryAnswer(Number(btn.dataset.idx)));
  });
}

function checkStoryAnswer(selectedIdx) {
  const session = getCurrentSession();
  if (!session?.currentPrompt) return;
  const userStats = getUserStats();
  const { card, options } = session.currentPrompt;

  const correctIdx = options.findIndex(o => o.correct);
  const isCorrect = selectedIdx === correctIdx;
  document.querySelectorAll('.mc-option').forEach((btn, i) => {
    btn.disabled = true;
    if (i === correctIdx) btn.classList.add('mc-correct');
    else if (i === selectedIdx) btn.classList.add('mc-wrong');
  });

  if (isCorrect) {
    session.correctAnswers++;
    userStats.learnedWords = (userStats.learnedWords || 0) + 1;
    userStats.totalCorrect = (userStats.totalCorrect || 0) + 1;
  }
  userStats.totalAnswered = (userStats.totalAnswered || 0) + 1;
  userStats.successRate = Math.round((session.correctAnswers / session.currentIndex) * 100);
  setUserStats(userStats);
  updateStats();
  session.currentPrompt = null;
  setCurrentSession(session);

  recordAnswerEffects(session, card, isCorrect, isCorrect);

  const fb = document.getElementById('mc-fb');
  fb.innerHTML = `
    ${isCorrect
      ? '<div class="correct" style="margin-top:14px"><p>✅ Richtig!</p></div>'
      : `<div class="incorrect" style="margin-top:14px"><p>❌ Falsch — richtig: <b>${escHtml(card.exampleDE)}</b></p></div>`}
    <div class="actions" style="margin-top:14px">
      <button type="button" class="btn btn-primary" id="mcNext">Weiter</button>
    </div>
  `;
  document.getElementById('mcNext').addEventListener('click', showStory);
}

// ── COMPARISON MODE ──────────────────────────────────────────────

export function showNextCard() {
  const session = getCurrentSession();
  if (!session || session.currentIndex >= session.cards.length) {
    endSession();
    return;
  }

  const card = session.cards[session.currentIndex];
  const prompt = createComparisonPrompt(card, session.cards);
  renderComparisonCard(card, prompt, session.deck.language);
  session.currentIndex++;
  session.currentPrompt = { ...prompt, card };
  setCurrentSession(session);
  updateProgress();
}

function createComparisonPrompt(card, cards) {
  if (cards.length <= 1) return { translation: card.back, isMatch: true };

  if (Math.random() < 0.5) return { translation: card.back, isMatch: true };

  const alts = cards.filter(c => c.back !== card.back);
  if (alts.length === 0) return { translation: card.back, isMatch: true };

  return { translation: alts[Math.floor(Math.random() * alts.length)].back, isMatch: false };
}

function renderComparisonCard(card, prompt, lang) {
  const learnArea = document.getElementById('learnArea');

  learnArea.innerHTML = `
    <div class="q">${escHtml(card.front)}</div>
    <p class="prompt">Stimmt diese Übersetzung?</p>
    <div class="comparison-card">
      <span class="word word-source">${escHtml(card.front)}</span>
      <i class="fas fa-arrow-right"></i>
      <span class="word word-target">
        ${escHtml(prompt.translation)}
        <button type="button" class="audio-btn" id="audioBtn" title="Aussprache anhören">
          <i class="fas fa-volume-up"></i>
        </button>
      </span>
    </div>
    <div class="actions">
      <button type="button" class="btn btn-primary" id="answerMatch">
        <i class="fas fa-check"></i> Passt
      </button>
      <button type="button" class="btn btn-secondary" id="answerMismatch">
        <i class="fas fa-times"></i> Passt nicht
      </button>
      <button type="button" class="btn" id="skipCard">Überspringen</button>
    </div>
    <div id="fb"></div>
  `;

  document.getElementById('audioBtn').addEventListener('click', () => speakWord(prompt.translation, lang));
  document.getElementById('answerMatch').addEventListener('click', () => checkComparisonAnswer(true));
  document.getElementById('answerMismatch').addEventListener('click', () => checkComparisonAnswer(false));
  document.getElementById('skipCard').addEventListener('click', showNextCard);
}

function checkComparisonAnswer(userSaysMatch) {
  const fb = document.getElementById('fb');
  const session = getCurrentSession();
  const userStats = getUserStats();
  const prompt = session?.currentPrompt;

  if (!prompt) return;

  document.querySelectorAll('#learnArea .actions button').forEach(b => { b.disabled = true; });

  const isCorrect = userSaysMatch === prompt.isMatch;

  if (isCorrect) {
    fb.innerHTML = `
      <div class="correct">
        <p>✅ Richtig!</p>
        <p>Zuordnung: <b>${escHtml(prompt.card.front)}</b> → <b>${escHtml(prompt.card.back)}</b></p>
      </div>
      <div class="actions" style="margin-top:14px">
        <button type="button" class="btn btn-primary" id="nextCard">Weiter</button>
      </div>
    `;
    session.correctAnswers++;
    userStats.learnedWords = (userStats.learnedWords || 0) + 1;
    userStats.totalCorrect = (userStats.totalCorrect || 0) + 1;
  } else {
    fb.innerHTML = `
      <div class="incorrect">
        <p>❌ Falsch!</p>
        <p>Korrekt: <b>${escHtml(prompt.card.front)}</b> → <b>${escHtml(prompt.card.back)}</b></p>
      </div>
      <div class="actions" style="margin-top:14px">
        <button type="button" class="btn btn-primary" id="nextCard">Weiter</button>
      </div>
    `;
  }

  userStats.totalAnswered = (userStats.totalAnswered || 0) + 1;
  userStats.successRate = Math.round((session.correctAnswers / session.currentIndex) * 100);
  setUserStats(userStats);
  updateStats();
  session.currentPrompt = null;
  setCurrentSession(session);

  recordAnswerEffects(session, prompt.card, isCorrect, isCorrect);

  document.getElementById('nextCard').addEventListener('click', showNextCard);
}

// ── END SESSION ──────────────────────────────────────────────────

function endSession() {
  const session = getCurrentSession();
  const userStats = getUserStats();

  // Count completed session and track active days
  userStats.totalSessions = (userStats.totalSessions || 0) + 1;
  const today = new Date().toISOString().slice(0, 10);
  if (userStats.lastSessionDate !== today) {
    userStats.activeDays = (userStats.activeDays || 0) + 1;
    userStats.lastSessionDate = today;
  }
  setUserStats(userStats);
  updateStats();

  const total = session?.totalCards || session?.cards?.length || 0;
  const correct = session?.correctAnswers || 0;
  const rate = total > 0 ? Math.round((correct / total) * 100) : 0;

  const { xpEarned, perfect, gemsEarned, game } = recordSessionEnd({
    language: session?.deck?.language,
    correct,
    total,
    boost: !!session?.boosted,
  });
  // Gesamte Session-XP: Antworten + Abschluss-Bonus (+ Perfekt-Bonus).
  const xpTotal = (session?.xpFromAnswers || 0) + xpEarned;
  showCombo(0);
  renderGamiHeader();
  renderLearnWidgets();
  const freshAchievements = checkAchievements();

  // Fehler für „Für dich"/Fehler-Training über Neustarts hinweg merken.
  if (session?.wrongCards?.length) saveErrors(session.deckId, session.wrongCards.map(c => c.front));
  // Wiederholung einer abgeschlossenen Lektion → Knoten vergolden.
  if (session?.reviewLesson) {
    markGoldLesson(session.reviewLesson.deckId, session.reviewLesson.index);
    showToast('<i class="fas fa-medal toast__icon"></i><div class="toast__body"><b>Lektion vergoldet! ✨</b><span>Wiederholung abgeschlossen</span></div>');
  }

  document.getElementById('learnArea').innerHTML = `
    <h3 style="font-size:1.6rem;margin-bottom:12px">🎉 Session beendet!</h3>
    <p style="color:var(--gray);margin-bottom:6px">${correct} von ${total} Karten richtig</p>
    <p style="font-size:1.4rem;font-weight:700;color:var(--primary);margin-bottom:14px">${rate}%</p>
    <div class="session-rewards">
      <span class="reward-pill reward-pill--xp"><i class="fas fa-bolt"></i> +${xpTotal} XP</span>
      ${rewardExtras(gemsEarned, session?.boosted)}
      ${perfect ? '<span class="reward-pill reward-pill--perfect"><i class="fas fa-star"></i> Perfekte Session!</span>' : ''}
      <span class="reward-pill reward-pill--streak"><i class="fas fa-fire"></i> Serie: ${game.streak.current} ${game.streak.current === 1 ? 'Tag' : 'Tage'}</span>
    </div>
    ${dailyRecapHtml()}
    <div class="actions" style="margin-top:20px">
      ${session?.wrongCards?.length ? `
        <button type="button" class="btn btn-error-review" id="reviewErrorsBtn">
          <i class="fas fa-rotate-left"></i> Fehler üben (${session.wrongCards.length})
        </button>` : ''}
      <button type="button" class="btn btn-primary" id="restartSession">
        <i class="fas fa-redo"></i> Noch einmal
      </button>
    </div>
  `;

  toastAchievements(freshAchievements);
  toastCosmetics(checkNewCosmetics());
  celebrateSessionEnd();
  document.getElementById('restartSession').addEventListener('click', startSession);
  const wrong = session?.wrongCards || [];
  document.getElementById('reviewErrorsBtn')?.addEventListener('click', () =>
    startErrorReview(session.deck, session.deckId, wrong));
  setCurrentSession(null);

  // Fortschrittsbalken auf den Endstand bringen.
  const textEl = document.getElementById('progress-text');
  const barEl  = document.getElementById('progress-bar');
  if (textEl) textEl.textContent = `${total}/${total} Karten`;
  if (barEl)  barEl.style.width = '100%';
}

// Fehler-Training: die falsch beantworteten Karten der letzten Session
// noch einmal als Karteikarten durchgehen.
export function startErrorReview(deck, deckId, cards) {
  if (!cards?.length) return;
  const shuffled = shuffleArray([...cards]);
  const session = {
    deck,
    deckId,
    cards: shuffled,
    mode: 'flashcard',
    currentIndex: 0,
    correctAnswers: 0,
    totalCards: shuffled.length,
    currentPrompt: null,
    combo: 0,
    boosted: false,
    queue: [...shuffled],
    reviewQueue: [],
    reviewRound: 1,
  };
  setCurrentSession(session);
  document.getElementById('session-title').textContent = `${deck.name} — Fehler-Training`;
  updateProgress();
  showFlashcard();
}

// ── LERNKURS-MODUS (Basic101) ────────────────────────────────────
// Drei Phasen pro Lektion: Kennenlernen → Wörter üben → Sätze üben.
// Der Fortschritt (welche Wörter schon eingeführt wurden) wird pro
// Account in core/course.js gespeichert.

function startCourseLesson(deck, deckId) {
  const lessonCards = nextLessonCards(deckId, deck.cards);

  if (lessonCards.length === 0) {
    document.getElementById('session-title').textContent = `${deck.name} — Kurs abgeschlossen`;
    document.getElementById('learnArea').innerHTML = `
      <h3 style="font-size:1.5rem;margin-bottom:12px">🎓 Deck komplett!</h3>
      <p style="color:var(--gray);max-width:420px">Du hast alle ${deck.cards.length} Wörter dieses Decks im Lernkurs
      kennengelernt. Nutze „Nur fällige Karten" oder die anderen Modi, um sie langfristig zu festigen.</p>
    `;
    return;
  }

  // Bereits gelernter Wortschatz (bisherige Lektionen + die 8 dieser Lektion).
  const introducedStart = getCourseState(deckId).introduced;
  const knownCards = deck.cards.slice(0, introducedStart + lessonCards.length);

  const session = {
    deck,
    deckId,
    mode: 'course',
    lesson: lessonNumber(deckId),
    lessonCards,
    knownCards,
    phase: 'teach',          // teach → words → sentences
    teachIndex: 0,
    queue: [],
    sentencesCompleted: [],
    currentPrompt: null,
    currentIndex: 0,                       // erledigte Schritte (für Fortschrittsbalken)
    totalCards: lessonCards.length * 2,    // Kennenlernen + Wörter (Sätze kommen dynamisch dazu)
    correctAnswers: 0,
    gradedAnswers: 0,
    combo: 0,
    boosted: consumeXpBoost(),             // XP-Boost aus dem Shop einlösen
  };

  setCurrentSession(session);
  document.getElementById('session-title').textContent = `${deck.name} — Lektion ${session.lesson}`;
  updateProgress();
  showCourseStep();
}

function showCourseStep() {
  const session = getCurrentSession();
  if (!session) return;

  if (session.phase === 'teach') {
    if (session.teachIndex >= session.lessonCards.length) {
      session.phase = 'words';
      session.queue = shuffleArray([...session.lessonCards]);
      setCurrentSession(session);
    } else {
      renderCourseTeach(session);
      return;
    }
  }

  if (session.phase === 'words') {
    if (session.queue.length === 0) {
      // Übergang zur Satz-Phase: nur Sätze aufnehmen, deren Wörter ALLE
      // schon gelernt sind (echtes Basic 101 — keine unbekannten Wörter).
      session.phase = 'sentences';
      session.queue = collectUnlockedSentences(session);
      session.totalCards = session.lessonCards.length * 2 + session.queue.length;
      setCurrentSession(session);
      updateProgress();
    } else {
      renderCourseWordMC(session);
      return;
    }
  }

  if (session.phase === 'sentences') {
    if (session.queue.length === 0) {
      endCourseLesson(session);
      return;
    }
    renderCourseGapFill(session);
  }
}

// Wortabgleich mit Toleranz für Beugung: exakt / solider Teilstring /
// gemeinsames Präfix ≥5. Kurze Funktionswörter matchen dadurch nicht.
function backMatchScore(word, back) {
  if (word === back) return 100;
  const short = Math.min(word.length, back.length);
  if (short >= 4 && (word.includes(back) || back.includes(word))) return 80;
  let p = 0;
  while (p < word.length && p < back.length && word[p] === back[p]) p++;
  if (p >= 5) return 60;
  return 0;
}

// Ist der Beispielsatz vollständig aus bekannten Wörtern gebildet?
// Tokens, die zu keinem Deck-Wort passen, gelten als Funktionswörter.
function sentenceIsKnown(example, knownBackSet, knownBackList, deckBackList) {
  const tokens = example.toLowerCase().split(/[\s.,!?;:„“"»«()¿¡'’-]+/).filter(Boolean);
  for (const t of tokens) {
    if (knownBackSet.has(t)) continue;                    // exakt bekannt
    if (knownBackList.some(b => backMatchScore(t, b) >= 60)) continue; // bekannt (gebeugt)
    if (deckBackList.some(b => backMatchScore(t, b) >= 60)) return false; // Deck-Wort, aber noch nicht gelernt
    // sonst: Funktionswort → ignorieren
  }
  return true;
}

// Sammelt bis zu 6 freischaltbare Lückensätze (neueste Wörter zuerst),
// die noch nicht geübt wurden.
function collectUnlockedSentences(session) {
  const { knownCards, deck } = session;
  const done = new Set(getSentencesDone(session.deckId));
  const knownBackList = knownCards.map(c => c.back.toLowerCase());
  const knownBackSet = new Set(knownBackList);
  const deckBackList = deck.cards.map(c => c.back.toLowerCase());

  const eligible = [];
  for (let i = knownCards.length - 1; i >= 0 && eligible.length < 6; i--) {
    const card = knownCards[i];
    if (done.has(card.front) || !card.example) continue;
    if (!findGapSentence(card.example, card.back)) continue;
    if (sentenceIsKnown(card.example, knownBackSet, knownBackList, deckBackList)) {
      eligible.push(card);
    }
  }
  return eligible;
}

function courseBadge(text) {
  return `<div class="course-phase-badge">${text}</div>`;
}

// Phase 1: Neues Wort vorstellen — ohne Abfrage, nur kennenlernen.
function renderCourseTeach(session) {
  const card = session.lessonCards[session.teachIndex];
  const lang = session.deck.language;
  const learnArea = document.getElementById('learnArea');

  const ipaParts = [];
  if (card.ipa)   ipaParts.push(`<span class="course-ipa">/${escHtml(card.ipa)}/</span>`);
  if (card.roman) ipaParts.push(`<span class="course-roman">${escHtml(card.roman)}</span>`);

  learnArea.innerHTML = `
    <div class="course-teach">
      ${courseBadge(`<i class="fas fa-lightbulb"></i> Neues Wort ${session.teachIndex + 1}/${session.lessonCards.length}`)}
      <p class="fc-label">Deutsch</p>
      <div class="fc-word fc-word-source">${escHtml(card.front)}</div>
      <div class="fc-arrow"><i class="fas fa-arrow-down"></i></div>
      <p class="fc-label">${getLangName(lang)}</p>
      <div class="fc-word fc-word-target">
        ${escHtml(card.back)}
        <button type="button" class="audio-btn" id="audioBtn" title="Aussprache anhören">
          <i class="fas fa-volume-up"></i>
        </button>
      </div>
      ${ipaParts.length ? `<div class="course-pron">${ipaParts.join(' · ')}</div>` : ''}
      ${cognateChip(card)}
      ${card.example ? `
        <div class="fc-example-block">
          <p class="fc-example"><strong>${escHtml(card.example)}</strong></p>
          ${card.exampleDE ? `<p class="fc-example-de">${escHtml(card.exampleDE)}</p>` : ''}
        </div>
      ` : ''}
      <div class="actions" style="margin-top:18px">
        <button type="button" class="btn btn-primary" id="courseNext">
          Weiter <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  `;

  speakWord(card.back, lang);
  document.getElementById('audioBtn').addEventListener('click', () => speakWord(card.back, lang));
  document.getElementById('courseNext').addEventListener('click', () => {
    session.teachIndex++;
    session.currentIndex++;
    setCurrentSession(session);
    updateProgress();
    showCourseStep();
  });
}

// Gemeinsame Auswertung für beide Übungsphasen.
// Richtig → Karte fertig (Schritt zählt), falsch → hinten wieder einreihen.
function courseGrade(session, card, isCorrect) {
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
function renderCourseWordMC(session) {
  const card = session.queue[0];
  const lang = session.deck.language;
  // Distraktoren nur aus bereits gelernten Wörtern.
  const options = buildMCOptions(card, session.knownCards);
  const learnArea = document.getElementById('learnArea');

  learnArea.innerHTML = `
    <div class="mc-card">
      ${courseBadge(`<i class="fas fa-dumbbell"></i> Wörter üben — noch ${session.queue.length}`)}
      <p class="fc-label">Deutsch</p>
      <div class="fc-word mc-question">${escHtml(card.front)}</div>
      <p class="prompt">${getLangName(lang)} — welche Übersetzung stimmt?</p>
      ${mcOptionsMarkup(options)}
    </div>
  `;

  learnArea.querySelectorAll('.mc-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const { isCorrect } = markMcAnswer(options, Number(btn.dataset.idx), card);
      if (isCorrect) speakWord(card.back, lang);

      courseGrade(session, card, isCorrect);

      document.getElementById('mc-fb').innerHTML = `
        ${courseFeedbackHtml(isCorrect, card)}
        <div class="actions" style="margin-top:14px">
          <button type="button" class="btn btn-primary" id="courseNext">Weiter</button>
        </div>
      `;
      document.getElementById('courseNext').addEventListener('click', showCourseStep);
    });
  });
}

// Feedback-Text für die Kurs-Übungen (richtig / falsch mit Lösung).
function courseFeedbackHtml(isCorrect, card, extra = '') {
  return `${isCorrect
    ? '<div class="correct" style="margin-top:14px"><p>✅ Richtig!</p></div>'
    : `<div class="incorrect" style="margin-top:14px"><p>❌ Falsch — richtig: <b>${escHtml(card.back)}</b>. Kommt gleich nochmal.</p></div>`}${extra}`;
}

// Sucht im Beispielsatz das Wort, das zum Zielwort gehört (auch gebeugte
// Formen wie hus→huset oder mit Artikel verklebt wie l'école).
function findGapSentence(example, back) {
  const norm = s => s.toLowerCase();
  const target = norm(back);
  const tokens = example.split(/(\s+)/);
  let bestIdx = -1;
  let bestScore = 0;

  tokens.forEach((tok, idx) => {
    if (/^\s+$/.test(tok) || !tok) return;
    const word = norm(tok.replace(/[.,!?;:„“"»«()¿¡]/g, ''));
    if (!word) return;
    let score = 0;
    if (word === target) score = 100;
    else if (word.includes(target) || target.includes(word)) score = 80;
    else {
      let p = 0;
      while (p < word.length && p < target.length && word[p] === target[p]) p++;
      if (p >= Math.min(4, target.length)) score = p;
    }
    if (score > bestScore) { bestScore = score; bestIdx = idx; }
  });

  if (bestIdx === -1) return null;
  const blanked = tokens.map((t, i) => {
    if (i !== bestIdx) return t;
    // Satzzeichen am ausgeblendeten Wort erhalten
    return t.replace(/[^.,!?;:„“"»«()¿¡]+/, '____');
  }).join('');
  return blanked;
}

// Phase 3: Sätze üben (Lückentext-Multiple-Choice).
function renderCourseGapFill(session) {
  const card = session.queue[0];
  const lang = session.deck.language;
  // Distraktoren nur aus bereits gelernten Wörtern.
  const options = buildMCOptions(card, session.knownCards);
  const learnArea = document.getElementById('learnArea');

  // Sätze in der Warteschlange sind garantiert lückenfähig (Vorauswahl).
  const gapped = findGapSentence(card.example, card.back);

  const question =
    `<p class="fc-label">${getLangName(lang)}</p>
       <div class="gap-sentence">${escHtml(gapped)}</div>
       <p class="prompt">Welches Wort gehört in die Lücke?</p>`;

  learnArea.innerHTML = `
    <div class="mc-card">
      ${courseBadge(`<i class="fas fa-comment-dots"></i> Sätze üben — noch ${session.queue.length}`)}
      ${question}
      ${mcOptionsMarkup(options)}
    </div>
  `;

  learnArea.querySelectorAll('.mc-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const { isCorrect } = markMcAnswer(options, Number(btn.dataset.idx), card);
      if (isCorrect) speakWord(card.example || card.back, lang);

      courseGrade(session, card, isCorrect);

      const extra = `
        <p class="fc-example" style="margin-top:10px"><strong>${escHtml(card.example || '')}</strong></p>
        ${card.exampleDE ? `<p class="fc-example-de">${escHtml(card.exampleDE)}</p>` : ''}`;
      document.getElementById('mc-fb').innerHTML = `
        ${courseFeedbackHtml(isCorrect, card, extra)}
        <div class="actions" style="margin-top:14px">
          <button type="button" class="btn btn-primary" id="courseNext">Weiter</button>
        </div>
      `;
      document.getElementById('courseNext').addEventListener('click', showCourseStep);
    });
  });
}

function endCourseLesson(session) {
  advanceCourse(session.deckId, session.lessonCards.length);
  markSentencesDone(session.deckId, session.sentencesCompleted);
  const sentencesLearned = session.sentencesCompleted.length;

  const userStats = getUserStats();
  userStats.totalSessions = (userStats.totalSessions || 0) + 1;
  const today = new Date().toISOString().slice(0, 10);
  if (userStats.lastSessionDate !== today) {
    userStats.activeDays = (userStats.activeDays || 0) + 1;
    userStats.lastSessionDate = today;
  }
  userStats.successRate = session.gradedAnswers > 0
    ? Math.round((session.correctAnswers * 2 / session.gradedAnswers) * 50)
    : 0;
  setUserStats(userStats);
  updateStats();

  const { xpEarned, perfect, gemsEarned, game } = recordSessionEnd({
    language: session.deck.language,
    correct: session.correctAnswers,
    total: session.gradedAnswers,
    boost: !!session.boosted,
  });
  const xpTotal = (session.xpFromAnswers || 0) + xpEarned;
  showCombo(0);
  renderGamiHeader();
  renderLearnWidgets();
  const freshAchievements = checkAchievements();

  const nextLesson = lessonNumber(session.deckId);

  const sentenceNote = sentencesLearned > 0
    ? `<p style="color:var(--gray);margin-bottom:14px">Und du hast <b>${sentencesLearned}</b> ${sentencesLearned === 1 ? 'Satz' : 'Sätze'} freigeschaltet und geübt — aus Wörtern, die du schon kennst.</p>`
    : `<p style="color:var(--gray);margin-bottom:14px">Ganze Sätze schaltest du frei, sobald du genug Wörter für sie gelernt hast.</p>`;

  document.getElementById('learnArea').innerHTML = `
    <h3 style="font-size:1.6rem;margin-bottom:12px">🎉 Lektion ${session.lesson} geschafft!</h3>
    <p style="color:var(--gray);margin-bottom:6px">${session.lessonCards.length} neue Wörter gelernt — sie fließen jetzt in dein Level-System ein.</p>
    ${sentenceNote}
    <div class="session-rewards">
      <span class="reward-pill reward-pill--xp"><i class="fas fa-bolt"></i> +${xpTotal} XP</span>
      ${rewardExtras(gemsEarned, session.boosted)}
      ${perfect ? '<span class="reward-pill reward-pill--perfect"><i class="fas fa-star"></i> Fehlerfrei!</span>' : ''}
      <span class="reward-pill reward-pill--streak"><i class="fas fa-fire"></i> Serie: ${game.streak.current} ${game.streak.current === 1 ? 'Tag' : 'Tage'}</span>
    </div>
    ${dailyRecapHtml()}
    <div class="actions" style="margin-top:20px">
      <button type="button" class="btn btn-primary" id="restartSession">
        <i class="fas fa-graduation-cap"></i> Lektion ${nextLesson} starten
      </button>
    </div>
  `;

  toastAchievements(freshAchievements);
  toastCosmetics(checkNewCosmetics());
  celebrateSessionEnd();
  document.getElementById('restartSession').addEventListener('click', startSession);
  setCurrentSession(null);

  const textEl = document.getElementById('progress-text');
  const barEl  = document.getElementById('progress-bar');
  if (textEl) textEl.textContent = `${session.totalCards}/${session.totalCards} Schritte`;
  if (barEl)  barEl.style.width = '100%';
}

// ── Helpers ──────────────────────────────────────────────────────

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}


// „Für dich": gespeicherte Fehler-Wörter als Karteikarten-Runde üben.
export async function startErrorReviewByFronts(deckId, fronts) {
  const deck = await loadDeck(deckId);
  const set = new Set(fronts);
  const cards = (deck?.cards || []).filter(c => set.has(c.front));
  if (!cards.length) return false;
  clearErrors(deckId);
  document.getElementById('view-learn')?.classList.add('session-active');
  startErrorReview(deck, deckId, cards);
  return true;
}

// Abgeschlossene Lektion vom Pfad aus wiederholen (Multiple Choice;
// bei sehr kleinen Lektionen Karteikarten). Abschluss vergoldet den Knoten.
export async function startLessonReview(deckId, lessonIdx) {
  const deck = await loadDeck(deckId);
  const sizes = deck?.lessonSizes;
  if (!deck || !sizes || lessonIdx < 0 || lessonIdx >= sizes.length) return false;
  let start = 0;
  for (let k = 0; k < lessonIdx; k++) start += sizes[k];
  const cards = deck.cards.slice(start, start + sizes[lessonIdx]);
  if (!cards.length) return false;

  const mode = cards.length >= 4 ? 'multiplechoice' : 'flashcard';
  const shuffled = shuffleArray([...cards]);
  const session = {
    deck,
    deckId,
    cards: shuffled,
    mode,
    currentIndex: 0,
    correctAnswers: 0,
    gradedAnswers: 0,
    totalCards: shuffled.length,
    currentPrompt: null,
    combo: 0,
    boosted: false,
    reviewLesson: { deckId, index: lessonIdx },
    queue: [...shuffled],
    reviewQueue: [],
    reviewRound: 1,
  };
  setCurrentSession(session);
  enterFocus(mode);
  const title = deck.lessonTitles?.[lessonIdx];
  document.getElementById('session-title').textContent =
    `Lektion ${lessonIdx + 1}${title ? ' · ' + title : ''} — Wiederholung`;
  updateProgress();
  if (mode === 'multiplechoice') showMultipleChoice(); else showFlashcard();
  return true;
}
