// Gemeinsames Öffnen/Schließen für Overlays, die per [hidden] getoggelt
// werden (Modals, das Session-Modus-Popover, …) — materialisiert die
// Glas-Fläche statt hart umzuschalten (siehe styles/gami-course.css:
// .modal--visible, styles/layout.css: .session-mode-menu--visible). Die
// Timeout-Dauer MUSS zur längsten dortigen Transition passen, sonst blitzt
// die Fläche vor dem Ausblenden kurz in den Ruhezustand zurück.
function showOverlay(el, visibleClass) {
  if (!el) return;
  el.hidden = false;
  // Reflow erzwingen: sonst fasst der Browser das Aufheben von [hidden] und
  // das Setzen der Klasse in einem Frame zusammen — kein sichtbarer Übergang.
  void el.offsetWidth;
  el.classList.add(visibleClass);
}

function hideOverlay(el, visibleClass, closeMs) {
  if (!el || el.hidden) return;
  el.classList.remove(visibleClass);
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) { el.hidden = true; return; }
  setTimeout(() => { el.hidden = true; }, closeMs);
}

export function openModal(modal) { showOverlay(modal, 'modal--visible'); }
export function closeModal(modal) { hideOverlay(modal, 'modal--visible', 240); }

export function openMenu(menu) { showOverlay(menu, 'session-mode-menu--visible'); }
export function closeMenu(menu) { hideOverlay(menu, 'session-mode-menu--visible', 160); }
