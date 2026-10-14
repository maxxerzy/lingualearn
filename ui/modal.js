// Gemeinsames Öffnen/Schließen für Overlays, die per [hidden] getoggelt
// werden (Modals, das Session-Modus-Popover, …) — materialisiert die
// Glas-Fläche statt hart umzuschalten (siehe styles/gami-course.css:
// .modal--visible, styles/layout.css: .session-mode-menu--visible). Die
// Timeout-Dauer MUSS zur längsten dortigen Transition passen, sonst blitzt
// die Fläche vor dem Ausblenden kurz in den Ruhezustand zurück.
let prevFocus = null;

function showOverlay(el, visibleClass) {
  if (!el) return;
  if (el.classList.contains('modal')) prevFocus = document.activeElement;
  el.hidden = false;
  // Reflow erzwingen: sonst fasst der Browser das Aufheben von [hidden] und
  // das Setzen der Klasse in einem Frame zusammen — kein sichtbarer Übergang.
  void el.offsetWidth;
  el.classList.add(visibleClass);
  if (el.classList.contains('modal')) {
    const focusable = el.querySelector('.modal__close, button:not([disabled]), [tabindex]:not([tabindex="-1"])');
    if (focusable) focusable.focus();
  }
}

function hideOverlay(el, visibleClass, closeMs) {
  if (!el || el.hidden) return;
  el.classList.remove(visibleClass);
  const restoreFocus = () => {
    el.hidden = true;
    if (el.classList.contains('modal') && prevFocus && typeof prevFocus.focus === 'function') {
      try { prevFocus.focus(); } catch { /* ignore */ }
      prevFocus = null;
    }
  };
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) { restoreFocus(); return; }
  setTimeout(restoreFocus, closeMs);
}

export function openModal(modal) { showOverlay(modal, 'modal--visible'); }
export function closeModal(modal) { hideOverlay(modal, 'modal--visible', 240); }

export function openMenu(menu) { showOverlay(menu, 'session-mode-menu--visible'); }
export function closeMenu(menu) { hideOverlay(menu, 'session-mode-menu--visible', 160); }

// Focus-Trap: Tab-Navigation bleibt bei geöffnetem Dialog innerhalb der Modalbox.
document.addEventListener('keydown', e => {
  if (e.key !== 'Tab') return;
  const modal = document.querySelector('.modal:not([hidden])');
  if (!modal) return;
  const focusables = [...modal.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')];
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
});

