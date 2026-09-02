import { getCurrentSession, setCurrentSession } from '../state.js';
import { shuffleArray } from '../../utils/helpers.js';
import { addBonusXp } from '../gamification.js';
import { pendingChapter, markChapterRead } from '../grammar.js';
import { renderGamiHeader } from '../../ui/gami.js';
import { showToast } from '../../ui/toast.js';
import { playCorrect, playWrong } from '../../utils/feedback.js';
import { lessonNumber } from '../course.js';
import { enterFocus, escHtml, courseBadge } from './shared.js';
import { startCourseLesson } from './course/lesson.js';

// ── GRAMMATIK IM LERNKURS ────────────────────────────────────────
// Vor bestimmten Lektionen wird ein Grammatik-Kapitel eingeschoben
// (Konjugation, Satzbau, wie die Sprache funktioniert). Mehrseitiger
// Reader; die letzte Seite führt direkt in die Lektion. Der Text
// scrollt INNERHALB der Karte — der Bildschirm selbst scrollt nie.
export async function maybeStartGrammar(deck, deckId) {
  const chapter = await pendingChapter(deckId, deck.language, lessonNumber(deckId));
  if (!chapter) return false;

  const session = {
    deck,
    deckId,
    mode: 'course',
    phase: 'grammar',
    chapter,
    pageIdx: 0,
    cards: [],
    queue: [],
    drillsRight: 0,
    currentPrompt: null,
    currentIndex: 0,
    // Seiten + Übungen ergeben zusammen die Schritte des Kapitels.
    totalCards: chapter.pages.length + (chapter.drills?.length || 0),
    correctAnswers: 0,
    combo: 0,
    boosted: false,
  };
  setCurrentSession(session);
  enterFocus('course');
  document.getElementById('session-title').textContent =
    `${deck.name} — Lektion ${lessonNumber(deckId)}`;
  renderGrammarPage();
  return true;
}

function renderGrammarPage() {
  const session = getCurrentSession();
  if (!session || session.phase !== 'grammar') return;
  const ch = session.chapter;
  const page = ch.pages[session.pageIdx];
  const last = session.pageIdx >= ch.pages.length - 1;

  document.getElementById('learnArea').innerHTML = `
    <div class="grammar-card">
      ${courseBadge(`<i class="fas ${ch.icon || 'fa-book-open'}"></i> Grammatik · ${escHtml(ch.title)}`)}
      <h3 class="grammar-head">${escHtml(page.heading)}</h3>
      <div class="grammar-body">${page.html}</div>
      <div class="actions grammar-actions">
        ${session.pageIdx > 0 ? '<button type="button" class="btn" id="gramPrev"><i class="fas fa-arrow-left"></i> Zurück</button>' : ''}
        <button type="button" class="btn btn-primary" id="gramNext">
          ${last ? 'Zur Lektion <i class="fas fa-arrow-right"></i>' : 'Weiter <i class="fas fa-arrow-right"></i>'}
        </button>
      </div>
    </div>
  `;

  const steps = session.totalCards || ch.pages.length;
  const t = document.getElementById('progress-text');
  if (t) t.textContent = `Seite ${session.pageIdx + 1}/${ch.pages.length}`;
  const b = document.getElementById('progress-bar');
  if (b) b.style.width = `${Math.round(((session.pageIdx + 1) / steps) * 100)}%`;

  document.getElementById('gramPrev')?.addEventListener('click', () => {
    session.pageIdx--;
    setCurrentSession(session);
    renderGrammarPage();
  });
  document.getElementById('gramNext').addEventListener('click', () => {
    if (!last) {
      session.pageIdx++;
      setCurrentSession(session);
      renderGrammarPage();
      return;
    }
    // Gelesen ist nicht gekonnt: Bringt das Kapitel Übungen mit, wird
    // erst abgefragt — und erst danach als gelesen abgehakt.
    if (ch.drills?.length) {
      session.phase = 'drill';
      session.queue = [...ch.drills];
      setCurrentSession(session);
      renderGrammarDrill();
      return;
    }
    finishChapter(session);
  });
}

// Kapitel abschließen: merken, XP geben, weiter zur Lektion (oder zum
// nächsten fälligen Kapitel).
function finishChapter(session) {
  const ch = session.chapter;
  markChapterRead(session.deckId, ch.id);
  const bonus = 10 + (session.drillsRight || 0) * 2;
  addBonusXp(bonus);
  renderGamiHeader();
  const done = ch.drills?.length
    ? `${session.drillsRight}/${ch.drills.length} Übungen auf Anhieb richtig`
    : 'jetzt anwenden!';
  showToast(`<i class="fas fa-book-open toast__icon"></i><div class="toast__body"><b>Kapitel geschafft: ${escHtml(ch.title)}</b><span>+${bonus} XP — ${done}</span></div>`);
  const { deck, deckId } = session;
  maybeStartGrammar(deck, deckId).then(started => {
    if (!started) startCourseLesson(deck, deckId);
  });
}

// Phase „Formen": Die Regel des Kapitels sofort anwenden. Falsch
// Beantwortetes kommt hinten wieder in die Reihe — das Kapitel ist
// erst durch, wenn jede Aufgabe einmal gesessen hat.
function renderGrammarDrill() {
  const session = getCurrentSession();
  if (!session || session.phase !== 'drill') return;
  const ch = session.chapter;
  const drill = session.queue[0];
  const total = ch.drills.length;
  const options = drill.options.map((text, i) => ({ text, correct: i === drill.answer }));
  const order = shuffleArray(options.map((_, i) => i));

  document.getElementById('learnArea').innerHTML = `
    <div class="mc-card drill-card">
      ${courseBadge(`<i class="fas fa-pen-ruler"></i> Formen üben — noch ${session.queue.length}`)}
      <p class="drill-topic">${escHtml(ch.title)}</p>
      <div class="drill-question">${escHtml(drill.q).replace(/____/g, '<span class="drill-gap">____</span>')}</div>
      <p class="prompt">Was gehört hier hin?</p>
      <div class="mc-options" role="group" aria-label="Antwortmöglichkeiten">
        ${order.map((oi, i) => `
          <button type="button" class="mc-option" data-oi="${oi}" aria-keyshortcuts="${i + 1} ${'abcd'[i]}">
            <span class="mc-key" aria-hidden="true">${'ABCD'[i]}</span>
            <span class="mc-text">${escHtml(options[oi].text)}</span>
          </button>`).join('')}
      </div>
      <div id="mc-fb"></div>
    </div>
  `;

  session.currentPrompt = { drill, correctOi: drill.answer };
  setCurrentSession(session);

  const done = total - session.queue.length;
  const t = document.getElementById('progress-text');
  if (t) t.textContent = `Übung ${done + 1}/${total}`;
  const b = document.getElementById('progress-bar');
  if (b) b.style.width = `${Math.round(((ch.pages.length + done + 1) / session.totalCards) * 100)}%`;

  document.querySelectorAll('.mc-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const oi = Number(btn.dataset.oi);
      const isCorrect = oi === drill.answer;
      document.querySelectorAll('.mc-option').forEach(b2 => {
        b2.disabled = true;
        const i = Number(b2.dataset.oi);
        if (i === drill.answer) b2.classList.add('mc-correct');
        else if (i === oi) b2.classList.add('mc-wrong');
      });
      if (isCorrect) playCorrect(); else playWrong();
      session.currentPrompt = null;
      if (isCorrect) {
        if (!drill.__missed) session.drillsRight = (session.drillsRight || 0) + 1;
        session.queue.shift();
      } else {
        drill.__missed = true;              // zählt nicht mehr als „auf Anhieb"
        session.queue.push(session.queue.shift());
      }
      setCurrentSession(session);

      document.getElementById('mc-fb').innerHTML = `
        ${isCorrect
          ? '<div class="correct" style="margin-top:14px"><p>✅ Richtig!</p></div>'
          : `<div class="incorrect" style="margin-top:14px"><p>❌ Richtig wäre: <b>${escHtml(drill.options[drill.answer])}</b></p></div>`}
        ${drill.why ? `<p class="drill-why"><i class="fas fa-lightbulb"></i> ${escHtml(drill.why)}</p>` : ''}
        <div class="actions" style="margin-top:12px">
          <button type="button" class="btn btn-primary" id="gramNext">Weiter</button>
        </div>
      `;
      document.getElementById('gramNext').addEventListener('click', () => {
        const st = getCurrentSession();
        if (!st) return;
        if (st.queue.length === 0) finishChapter(st);
        else renderGrammarDrill();
      });
    });
  });
}
