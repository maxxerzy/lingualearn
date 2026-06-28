// Initialize navigation
export function initNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const views = document.querySelectorAll('.view');

  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      const viewId = button.getAttribute('data-view');

      // Update active button
      navButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Show selected view
      views.forEach(view => view.classList.remove('active'));
      const targetView = document.getElementById(`view-${viewId}`);
      if (targetView) {
        targetView.classList.add('active');
      }
    });
  });
}

