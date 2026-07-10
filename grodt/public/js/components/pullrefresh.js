// Pull-to-Refresh für Listen-Views (Touch): am oberen Rand nach unten
// ziehen löst onRefresh aus.

export function attachPullToRefresh(container, hintEl, onRefresh) {
  let startY = null;
  let pulled = false;

  const onTouchStart = (e) => {
    if (window.scrollY <= 0) startY = e.touches[0].clientY;
    else startY = null;
    pulled = false;
  };
  const onTouchMove = (e) => {
    if (startY == null) return;
    const dy = e.touches[0].clientY - startY;
    if (dy > 70 && !pulled) {
      pulled = true;
      hintEl?.classList.add('visible');
    }
  };
  const onTouchEnd = async () => {
    if (pulled) {
      try {
        await onRefresh();
      } finally {
        hintEl?.classList.remove('visible');
      }
    }
    startY = null;
    pulled = false;
  };

  container.addEventListener('touchstart', onTouchStart, { passive: true });
  container.addEventListener('touchmove', onTouchMove, { passive: true });
  container.addEventListener('touchend', onTouchEnd);
  return () => {
    container.removeEventListener('touchstart', onTouchStart);
    container.removeEventListener('touchmove', onTouchMove);
    container.removeEventListener('touchend', onTouchEnd);
  };
}
