// Bottom-Sheet-Modal (Desktop: zentriert). openModal liefert close().

export function openModal(renderContent) {
  const root = document.getElementById('modalRoot');
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  backdrop.appendChild(modal);
  root.appendChild(backdrop);

  const close = () => {
    backdrop.remove();
    document.removeEventListener('keydown', onKey);
  };
  const onKey = (e) => {
    if (e.key === 'Escape') close();
  };
  document.addEventListener('keydown', onKey);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) close();
  });

  renderContent(modal, close);
  return close;
}

/** Einfache Bestätigung; liefert Promise<boolean>. */
export function confirmModal(title, text, confirmLabel = 'Löschen') {
  return new Promise((resolve) => {
    openModal((modal, close) => {
      modal.innerHTML = `
        <h3></h3>
        <p class="dim" style="margin-top:0"></p>
        <div style="display:flex; gap:10px; justify-content:flex-end">
          <button class="btn ghost" data-cancel>Abbrechen</button>
          <button class="btn danger" data-ok></button>
        </div>`;
      modal.querySelector('h3').textContent = title;
      modal.querySelector('p').textContent = text;
      modal.querySelector('[data-ok]').textContent = confirmLabel;
      modal.querySelector('[data-cancel]').onclick = () => { close(); resolve(false); };
      modal.querySelector('[data-ok]').onclick = () => { close(); resolve(true); };
    });
  });
}
