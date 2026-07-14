import { loadDeck, getCurrentSession, setCurrentSession, getUserStats, setUserStats } from './state.js';
import { updateProgress } from './progress.js';
import { updateStats } from './stats.js';
import { shuffleArray } from '../utils/helpers.js';
import { isCognate } from '../utils/cognate.js';
import { recordCardAnswer, getDueFronts } from './cardProgress.js';
import { recordGameAnswer, recordSessionEnd, checkAchievements, XP } from './gamification.js';
import { renderGamiHeader, renderLearnWidgets } from '../ui/gami.js';
import { toastAchievements, toastCosmetics } from '../ui/toast.js';
import { checkNewCosmetics } from './cosmetics.js';
import { nextLessonCards, lessonNumber, advanceCourse, getCourseState, getSentencesDone, markSentencesDone } from './course.js';

// Erfolge prüfen + einblenden, danach dadurch freigeschaltete Cosmetics.
function announceUnlocks() {
  toastAchievements(checkAchievements());
  toastCosmetics(checkNewCosmetics());
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

  if (mode === 'course') {
    startCourseLesson(deck, deckId);
    return;
  }

  const shuffled = shuffleArray([...sessionCards]);

  const session = {
    deck,
    deckId,
    cards: shuffled,
    mode,
    currentIndex: 0,
    correctAnswers: 0,
    totalCards: shuffled.length,
    currentPrompt: null,
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
  recordGameAnswer(isCorrect);
  session.xpFromAnswers = (session.xpFromAnswers || 0) + (isCorrect ? XP.correct : XP.wrong);
  renderGamiHeader();
  renderLearnWidgets();
  announceUnlocks();
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

  const { xpEarned, perfect, game } = recordSessionEnd({
    language: session?.deck?.language,
    correct,
    total,
  });
  // Gesamte Session-XP: Antworten + Abschluss-Bonus (+ Perfekt-Bonus).
  const xpTotal = (session?.xpFromAnswers || 0) + xpEarned;
  renderGamiHeader();
  renderLearnWidgets();
  const freshAchievements = checkAchievements();

  document.getElementById('learnArea').innerHTML = `
    <h3 style="font-size:1.6rem;margin-bottom:12px">🎉 Session beendet!</h3>
    <p style="color:var(--gray);margin-bottom:6px">${correct} von ${total} Karten richtig</p>
    <p style="font-size:1.4rem;font-weight:700;color:var(--primary);margin-bottom:14px">${rate}%</p>
    <div class="session-rewards">
      <span class="reward-pill reward-pill--xp"><i class="fas fa-bolt"></i> +${xpTotal} XP</span>
      ${perfect ? '<span class="reward-pill reward-pill--perfect"><i class="fas fa-star"></i> Perfekte Session!</span>' : ''}
      <span class="reward-pill reward-pill--streak"><i class="fas fa-fire"></i> Serie: ${game.streak.current} ${game.streak.current === 1 ? 'Tag' : 'Tage'}</span>
    </div>
    <div class="actions" style="margin-top:20px">
      <button type="button" class="btn btn-primary" id="restartSession">
        <i class="fas fa-redo"></i> Noch einmal
      </button>
    </div>
  `;

  toastAchievements(freshAchievements);
  toastCosmetics(checkNewCosmetics());
  document.getElementById('restartSession').addEventListener('click', startSession);
  setCurrentSession(null);

  // Fortschrittsbalken auf den Endstand bringen.
  const textEl = document.getElementById('progress-text');
  const barEl  = document.getElementById('progress-bar');
  if (textEl) textEl.textContent = `${total}/${total} Karten`;
  if (barEl)  barEl.style.width = '100%';
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

  const { xpEarned, perfect, game } = recordSessionEnd({
    language: session.deck.language,
    correct: session.correctAnswers,
    total: session.gradedAnswers,
  });
  const xpTotal = (session.xpFromAnswers || 0) + xpEarned;
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
      ${perfect ? '<span class="reward-pill reward-pill--perfect"><i class="fas fa-star"></i> Fehlerfrei!</span>' : ''}
      <span class="reward-pill reward-pill--streak"><i class="fas fa-fire"></i> Serie: ${game.streak.current} ${game.streak.current === 1 ? 'Tag' : 'Tage'}</span>
    </div>
    <div class="actions" style="margin-top:20px">
      <button type="button" class="btn btn-primary" id="restartSession">
        <i class="fas fa-graduation-cap"></i> Lektion ${nextLesson} starten
      </button>
    </div>
  `;

  toastAchievements(freshAchievements);
  toastCosmetics(checkNewCosmetics());
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
