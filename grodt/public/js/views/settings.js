// „Mehr": Sync-Profil, Push-Mitteilungen, Finnhub-Key, Darstellung, Infos.

import { getSetting, setSetting, getSyncMeta } from '../core/store.js';
import { createProfile, joinProfile, leaveProfile, hasSyncProfile, pullNow } from '../core/sync.js';
import { enablePush, disablePush, isPushEnabled, sendTestPush, pushAvailability } from '../core/push.js';
import { openModal, confirmModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';
import { escapeHtml } from './search.js';

export function mount(el) {
  render(el);
}

export function unmount() {}

async function render(el) {
  const meta = getSyncMeta();
  const pushOn = await isPushEnabled();
  const pushAvail = pushAvailability();

  el.innerHTML = `
    <div class="section-title">Geräte-Sync</div>
    <div class="card" id="syncCard">
      ${meta.code ? `
        <p style="margin:0 0 10px">Sync aktiv. Dein Code (auf dem anderen Gerät eingeben):</p>
        <div style="display:flex; gap:8px; align-items:center">
          <code class="mono" id="syncCode" style="font-size:17px; letter-spacing:1px">••••-••••-••••</code>
          <button class="btn small" id="revealCode">Anzeigen</button>
          <button class="btn small" id="copyCode">Kopieren</button>
        </div>
        <div class="chip-row" style="margin-top:12px">
          <button class="btn small" id="syncNow">Jetzt synchronisieren</button>
          <button class="btn small danger" id="syncLeave">Sync trennen</button>
        </div>` : `
        <p style="margin:0 0 10px">Watchlists, Alarme und Depot zwischen iPhone und Mac synchron halten — ohne Konto, über einen geheimen Sync-Code.</p>
        <div class="chip-row">
          <button class="btn primary" id="syncCreate">Neues Sync-Profil erstellen</button>
          <button class="btn" id="syncJoin">Code eingeben</button>
        </div>`}
    </div>

    <div class="section-title">Push-Mitteilungen (Kursalarme)</div>
    <div class="card">
      ${!pushAvail.ok ? `<p class="dim" style="margin:0 0 10px">${escapeHtml(pushAvail.reason)}</p>` : ''}
      <div class="chip-row">
        ${pushOn
          ? `<button class="btn" id="pushTest">Testmitteilung senden</button>
             <button class="btn danger" id="pushOff">Mitteilungen deaktivieren</button>`
          : `<button class="btn primary" id="pushOn" ${!pushAvail.ok ? 'disabled' : ''}>Mitteilungen aktivieren</button>`}
      </div>
      <p class="dim" style="font-size:12px; margin:10px 0 0">Alarme werden alle 5 Minuten (zu Handelszeiten) serverseitig geprüft — Mitteilungen kommen auch bei geschlossener App an. Voraussetzung: aktives Sync-Profil.</p>
    </div>

    <div class="section-title">Realtime-Kurse (optional)</div>
    <div class="card">
      <div class="field">
        <label>Finnhub API-Key — US-Kurse in Echtzeit per Stream (gratis auf finnhub.io)</label>
        <input id="finnhubKey" type="password" value="${escapeHtml(getSetting('finnhubKey', '') || '')}" placeholder="Key einfügen" autocomplete="off">
      </div>
      <button class="btn small" id="saveFinnhub">Speichern</button>
      <p class="dim" style="font-size:12px; margin:10px 0 0">Ohne Key werden alle Kurse über Yahoo geladen (US quasi live, XETRA ~15 Min. verzögert). Der Key synct auf deine Geräte mit.</p>
    </div>

    <div class="section-title">Darstellung</div>
    <div class="card">
      <div class="chip-row" id="themeChips">
        <button class="chip" data-theme="auto">Automatisch</button>
        <button class="chip" data-theme="dark">Dunkel</button>
        <button class="chip" data-theme="light">Hell</button>
      </div>
      <div style="display:flex; align-items:center; gap:8px; margin-top:14px">
        <input id="preferXetra" type="checkbox" style="width:auto" ${getSetting('preferXetra', true) ? 'checked' : ''}>
        <label for="preferXetra" style="margin:0; font-size:14px">Bei Mehrfach-Listings XETRA (.DE) bevorzugen</label>
      </div>
    </div>

    <div class="section-title">Info</div>
    <div class="card dim" style="font-size:12.5px; line-height:1.55">
      <strong>GRODT</strong> — Get Rich Or Die Trying. Kursdaten via Yahoo Finance (US quasi live, XETRA/Frankfurt ca. 15 Min. verzögert), optional Finnhub-Stream. Alle Angaben ohne Gewähr, <strong>keine Anlageberatung</strong>. Depot ist reines Paper-Trading — es werden keine echten Orders ausgeführt.
    </div>
  `;

  bindSync(el);
  bindPush(el);
  bindMisc(el);
}

function bindSync(el) {
  const meta = getSyncMeta();
  el.querySelector('#syncCreate')?.addEventListener('click', async (e) => {
    e.target.disabled = true;
    try {
      const code = await createProfile();
      openModal((modal, close) => {
        modal.innerHTML = `
          <h3>Sync-Profil erstellt ✓</h3>
          <p>Dein Sync-Code — <strong>gut aufbewahren</strong> (er ist der einzige Zugang zu deinen Daten):</p>
          <code class="mono" style="font-size:20px; letter-spacing:2px; display:block; text-align:center; padding:14px; background:var(--bg-elev2); border-radius:10px">${code}</code>
          <div style="display:flex; gap:10px; justify-content:flex-end; margin-top:14px">
            <button class="btn" data-copy>Kopieren</button>
            <button class="btn primary" data-done>Fertig</button>
          </div>`;
        modal.querySelector('[data-copy]').onclick = () => {
          navigator.clipboard?.writeText(code);
          showToast('Code kopiert.', 'success');
        };
        modal.querySelector('[data-done]').onclick = () => { close(); render(el); };
      });
    } catch (err) {
      showToast(`Sync-Profil fehlgeschlagen: ${err.message}`, 'error');
      e.target.disabled = false;
    }
  });

  el.querySelector('#syncJoin')?.addEventListener('click', () => {
    openModal((modal, close) => {
      modal.innerHTML = `
        <h3>Sync-Code eingeben</h3>
        <div class="field">
          <input id="joinCode" placeholder="XXXX-XXXX-XXXX" autocapitalize="characters" autocomplete="off" class="mono" style="text-align:center; font-size:17px; letter-spacing:2px">
        </div>
        <div style="display:flex; gap:10px; justify-content:flex-end">
          <button class="btn ghost" data-cancel>Abbrechen</button>
          <button class="btn primary" data-ok>Verbinden</button>
        </div>`;
      modal.querySelector('[data-cancel]').onclick = close;
      modal.querySelector('[data-ok]').onclick = async (e) => {
        const code = modal.querySelector('#joinCode').value.trim();
        if (code.replace(/[^0-9a-zA-Z]/g, '').length !== 12) {
          showToast('Der Code hat 12 Zeichen (XXXX-XXXX-XXXX).', 'error');
          return;
        }
        e.target.disabled = true;
        try {
          await joinProfile(code);
          showToast('Sync verbunden — Daten werden zusammengeführt.', 'success');
          close();
          render(el);
        } catch (err) {
          showToast(err.status === 404 ? 'Code unbekannt — Tippfehler?' : `Fehler: ${err.message}`, 'error');
          e.target.disabled = false;
        }
      };
      setTimeout(() => modal.querySelector('#joinCode').focus(), 50);
    });
  });

  el.querySelector('#revealCode')?.addEventListener('click', (e) => {
    const codeEl = el.querySelector('#syncCode');
    const hidden = codeEl.textContent.startsWith('•');
    codeEl.textContent = hidden ? meta.code : '••••-••••-••••';
    e.target.textContent = hidden ? 'Verbergen' : 'Anzeigen';
  });
  el.querySelector('#copyCode')?.addEventListener('click', () => {
    navigator.clipboard?.writeText(meta.code);
    showToast('Code kopiert.', 'success');
  });
  el.querySelector('#syncNow')?.addEventListener('click', async () => {
    await pullNow();
    showToast('Synchronisiert.', 'success');
  });
  el.querySelector('#syncLeave')?.addEventListener('click', async () => {
    if (await confirmModal('Sync trennen?', 'Dieses Gerät synchronisiert dann nicht mehr. Die Daten bleiben lokal und auf dem Server erhalten.', 'Trennen')) {
      leaveProfile();
      render(el);
    }
  });
}

function bindPush(el) {
  el.querySelector('#pushOn')?.addEventListener('click', async (e) => {
    e.target.disabled = true;
    try {
      if (!hasSyncProfile()) throw new Error('Bitte zuerst oben ein Sync-Profil erstellen.');
      await enablePush();
      showToast('Push aktiviert ✓', 'success');
      render(el);
    } catch (err) {
      showToast(err.message, 'error');
      e.target.disabled = false;
    }
  });
  el.querySelector('#pushOff')?.addEventListener('click', async () => {
    await disablePush();
    showToast('Push deaktiviert.');
    render(el);
  });
  el.querySelector('#pushTest')?.addEventListener('click', async (e) => {
    e.target.disabled = true;
    try {
      await sendTestPush();
      showToast('Testmitteilung unterwegs — kommt in wenigen Sekunden an.', 'success');
    } catch (err) {
      showToast(`Test fehlgeschlagen: ${err.message}`, 'error');
    }
    e.target.disabled = false;
  });
}

function bindMisc(el) {
  el.querySelector('#saveFinnhub')?.addEventListener('click', () => {
    setSetting('finnhubKey', el.querySelector('#finnhubKey').value.trim() || null);
    showToast('Gespeichert.', 'success');
  });

  const current = getSetting('theme', 'auto');
  el.querySelectorAll('[data-theme]').forEach((chip) => {
    chip.classList.toggle('active', chip.dataset.theme === current);
    chip.addEventListener('click', () => {
      setSetting('theme', chip.dataset.theme);
      applyTheme(chip.dataset.theme);
      el.querySelectorAll('[data-theme]').forEach((c) => c.classList.toggle('active', c === chip));
    });
  });

  el.querySelector('#preferXetra')?.addEventListener('change', (e) => {
    setSetting('preferXetra', e.target.checked);
  });
}

export function applyTheme(mode = getSetting('theme', 'auto')) {
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const light = mode === 'light' || (mode === 'auto' && prefersLight);
  document.documentElement.dataset.theme = light ? 'light' : 'dark';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', light ? '#f4f6fb' : '#101418');
}
