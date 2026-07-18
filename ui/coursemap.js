import { getDecks, loadDeck } from '../core/state.js';
import { getCourseState, lessonNumber, LESSON_SIZE } from '../core/course.js';
import { startLessonReview, getGoldLessons } from '../core/session.js';

// Farbpalette für die Themen-Banner entlang des Pfads.
const BANNER_COLORS = ['#4361ee', '#12a5b8', '#e8820c', '#8a5cf6', '#2e9e5b', '#e05260'];

// Lernpfad: vollwertige Ansicht mit dem Lektionsweg des gewählten Decks
// (erledigt / aktuell / gesperrt). Die aktuelle Lektion lässt sich direkt
// vom Pfad aus starten — à la Duolingo.

let navigate = null;      // activateView aus der Navigation
let startCourse = null;   // startet die Session (setzt vorher Kurs-Modus)

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function renderPath(deckId) {
  const body = document.getElementById('pathBody');
  const titleEl = document.getElementById('pathTitle');
  const startBtn = document.getElementById('pathStartBtn');
  if (!body) return;

  const deck = getDecks()[deckId];
  if (!deck) { body.innerHTML = '<p>Kein Deck gewählt.</p>'; return; }

  const total = deck.cards?.length ?? deck.count ?? 0;
  // Thematischer Plan, falls geladen; sonst feste 8er-Lektionen.
  const sizes = deck.lessonSizes || Array.from(
    { length: Math.max(1, Math.ceil(total / LESSON_SIZE)) },
    (_, i) => Math.min(LESSON_SIZE, total - i * LESSON_SIZE));
  const totalLessons = sizes.length;
  const current = lessonNumber(deckId);                 // 1-basiert
  const done = Math.min(current - 1, totalLessons);
  const finished = getCourseState(deckId).introduced >= total && total > 0;

  if (titleEl) titleEl.textContent = `${deck.name} — ${done}/${totalLessons} Lektionen`;

  const gold = new Set(getGoldLessons(deckId));
  const baseTheme = t => (t || '').replace(/ \d+$/, '');
  const nodes = [];
  let start = 0;
  let lastTheme = null;
  let themeIdx = -1;
  let zig = 0;
  for (let n = 1; n <= totalLessons; n++) {
    const size = sizes[n - 1];
    const title = deck.lessonTitles?.[n - 1];
    const theme = baseTheme(title);

    // Themen-Banner bei jedem Themenwechsel (farbig rotierend).
    if (theme && theme !== lastTheme) {
      lastTheme = theme;
      themeIdx++;
      zig = 0;
      const color = BANNER_COLORS[themeIdx % BANNER_COLORS.length];
      nodes.push(`<li class="map-banner" style="--bn:${color}"><i class="fas fa-bookmark"></i> ${esc(theme)}</li>`);
    }

    let cls, icon;
    const isDone = finished || n <= done;
    if (isDone) { cls = gold.has(n - 1) ? 'done map-node--gold' : 'done'; icon = gold.has(n - 1) ? 'fa-medal' : 'fa-check'; }
    else if (n === current) { cls = 'current'; icon = 'fa-play'; }
    else { cls = 'locked'; icon = 'fa-lock'; }
    const from = start + 1;
    const to = start + size;
    start += size;
    const isGo = cls === 'current';
    // Sanfter Zickzack innerhalb eines Themas.
    const sway = ['', 'map-node--right', '', 'map-node--left'][zig % 4];
    zig++;
    nodes.push(`
      <li class="map-node map-node--${cls} ${sway}"
          ${isGo ? 'data-start-lesson role="button" tabindex="0"' : ''}
          ${isDone ? `data-review-lesson="${n - 1}" role="button" tabindex="0"` : ''}>
        <span class="map-node__dot"><i class="fas ${icon}"></i></span>
        <span class="map-node__label">
          <b>Lektion ${n}${title ? ' · ' + esc(title) : ''}</b>
          <span class="map-node__range">Wörter ${from}–${to}${isGo ? ' · antippen zum Starten' : isDone ? (gold.has(n - 1) ? ' · vergoldet ✨' : ' · antippen zum Wiederholen') : ''}</span>
        </span>
      </li>`);
  }
  body.innerHTML = `<ol class="map-path">${nodes.join('')}</ol>`;

  if (startBtn) {
    if (finished) {
      startBtn.hidden = false;
      startBtn.disabled = true;
      startBtn.innerHTML = '<i class="fas fa-check"></i> Kurs abgeschlossen';
    } else {
      const t = deck.lessonTitles?.[current - 1];
      startBtn.hidden = false;
      startBtn.disabled = false;
      startBtn.innerHTML = `<i class="fas fa-graduation-cap"></i> Lektion ${current}${t ? ' · ' + esc(t) : ''} starten`;
    }
  }

  // Zur aktuellen Lektion scrollen.
  const cur = body.querySelector('.map-node--current');
  if (cur) cur.scrollIntoView({ block: 'center' });
}

// Pfad-Ansicht öffnen (aus Konfiguration oder laufender Session).
export function showPath() {
  const deckId = document.getElementById('deckSelect')?.value;
  if (navigate) navigate('path');
  renderPath(deckId);                   // sofort zeigen (evtl. noch ohne Titel)
  loadDeck(deckId).then(() => {
    if (document.getElementById('view-path')?.classList.contains('active')) renderPath(deckId);
  }).catch(() => {});
}

// Aktuelle Lektion direkt vom Pfad aus starten: Kurs-Modus aktivieren,
// zurück zur Lern-Ansicht, Session starten.
function startFromPath() {
  document.querySelectorAll('.mode-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.mode === 'course'));
  if (navigate) navigate('learn');
  if (startCourse) startCourse();
}

export function initPath(activateView, startSessionFn) {
  navigate = activateView;
  startCourse = startSessionFn;
  document.getElementById('pathBackBtn')?.addEventListener('click', () => navigate?.('learn'));
  document.getElementById('pathStartBtn')?.addEventListener('click', startFromPath);
  document.getElementById('pathBody')?.addEventListener('click', e => {
    if (e.target.closest('[data-start-lesson]')) { startFromPath(); return; }
    const rev = e.target.closest('[data-review-lesson]');
    if (rev) {
      const deckId = document.getElementById('deckSelect')?.value;
      navigate?.('learn');
      startLessonReview(deckId, Number(rev.dataset.reviewLesson));
    }
  });
}
