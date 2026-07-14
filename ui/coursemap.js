import { getDecks } from '../core/state.js';
import { getCourseState, lessonNumber, LESSON_SIZE } from '../core/course.js';

// Lern-Landkarte: visueller Lektionspfad des gewählten Decks
// (erledigt / aktuell / gesperrt). Read-only, zeigt nur den Fortschritt.

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function renderCourseMap(deckId) {
  const body = document.getElementById('coursemapBody');
  const titleEl = document.getElementById('coursemapTitle');
  if (!body) return;

  const deck = getDecks()[deckId];
  if (!deck) { body.innerHTML = '<p>Kein Deck gewählt.</p>'; return; }

  const total = deck.cards?.length ?? deck.count ?? 0;
  const totalLessons = Math.max(1, Math.ceil(total / LESSON_SIZE));
  const introduced = getCourseState(deckId).introduced;
  const done = Math.floor(introduced / LESSON_SIZE);   // vollständig abgeschlossene Lektionen
  const current = lessonNumber(deckId);                 // 1-basiert

  if (titleEl) titleEl.textContent = `${deck.name} — ${done}/${totalLessons} Lektionen`;

  const nodes = [];
  for (let n = 1; n <= totalLessons; n++) {
    let cls, icon;
    if (n <= done) { cls = 'done'; icon = 'fa-check'; }
    else if (n === current) { cls = 'current'; icon = 'fa-play'; }
    else { cls = 'locked'; icon = 'fa-lock'; }
    const from = (n - 1) * LESSON_SIZE + 1;
    const to = Math.min(n * LESSON_SIZE, total);
    nodes.push(`
      <li class="map-node map-node--${cls}">
        <span class="map-node__dot"><i class="fas ${icon}"></i></span>
        <span class="map-node__label">
          <b>Lektion ${n}</b>
          <span class="map-node__range">Wörter ${from}–${to}</span>
        </span>
      </li>`);
  }
  body.innerHTML = `<ol class="map-path">${nodes.join('')}</ol>`;

  // Zur aktuellen Lektion scrollen.
  const cur = body.querySelector('.map-node--current');
  if (cur) cur.scrollIntoView({ block: 'center' });
}

export function openCourseMap() {
  const modal = document.getElementById('coursemapModal');
  if (!modal) return;
  const deckId = document.getElementById('deckSelect')?.value;
  renderCourseMap(deckId);
  modal.hidden = false;
}

export function closeCourseMap() {
  const modal = document.getElementById('coursemapModal');
  if (modal) modal.hidden = true;
}

// Trigger, Schließen-Button, Backdrop-Klick und Esc einmalig verdrahten.
export function initCourseMap() {
  const trigger = document.getElementById('coursemapBtn');
  if (trigger) trigger.addEventListener('click', openCourseMap);

  const modal = document.getElementById('coursemapModal');
  if (!modal) return;
  modal.querySelector('.modal__close')?.addEventListener('click', closeCourseMap);
  modal.querySelector('.modal__backdrop')?.addEventListener('click', closeCourseMap);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hidden) closeCourseMap();
  });
}
