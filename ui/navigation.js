export function initNavigation() {
  const desktopBtns = document.querySelectorAll('.nav-btn[data-view]');
  const mobileBtns  = document.querySelectorAll('.mobile-nav-btn[data-view]');
  const views       = document.querySelectorAll('.view');

  function activateView(viewId) {
    views.forEach(v => v.classList.remove('active'));
    const target = document.getElementById(`view-${viewId}`);
    if (target) target.classList.add('active');

    desktopBtns.forEach(b => b.classList.toggle('active', b.dataset.view === viewId));
    mobileBtns.forEach(b => b.classList.toggle('active', b.dataset.view === viewId));
  }

  desktopBtns.forEach(btn => btn.addEventListener('click', () => activateView(btn.dataset.view)));
  mobileBtns.forEach(btn  => btn.addEventListener('click', () => activateView(btn.dataset.view)));
}
