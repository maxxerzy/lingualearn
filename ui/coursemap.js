import { getDecks, loadDeck } from '../core/state.js';
import { getCourseState, lessonNumber, LESSON_SIZE } from '../core/course.js';

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

  const nodes = [];
  let start = 0;
  for (let n = 1; n <= totalLessons; n++) {
    const size = sizes[n - 1];
    let cls, icon;
    if (finished || n <= done) { cls = 'done'; icon = 'fa-check'; }
    else if (n === current) { cls = 'current'; icon = 'fa-play'; }
    else { cls = 'locked'; icon = 'fa-lock'; }
    const from = start + 1;
    const to = start + size;
    start += size;
    const title = deck.lessonTitles?.[n - 1];
    const isGo = cls === 'current';
    nodes.push(`
      <li class="map-node map-node--${cls}" ${isGo ? 'data-start-lesson role="button" tabindex="0"' : ''}>
        <span class="map-node__dot"><i class="fas ${icon}"></i></span>
        <span class="map-node__label">
          <b>Lektion ${n}${title ? ' · ' + esc(title) : ''}</b>
          <span class="map-node__range">Wörter ${from}–${to}${isGo ? ' · antippen zum Starten' : ''}</span>
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
    if (e.target.closest('[data-start-lesson]')) startFromPath();
  });
}
