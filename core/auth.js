const USERS_KEY = 'lingualearn_users';
const CURRENT_USER_KEY = 'lingualearn_current_user';

// Synchronous deterministic hash — no crypto.subtle dependency.
// Sufficient for local-only localStorage; not intended as a server password store.
function hashPassword(password) {
  const src = 'lingualearn_v1:' + password;
  let h1 = 0x9e3779b9 >>> 0;
  let h2 = 0x6c62272e >>> 0;
  for (let i = 0; i < src.length; i++) {
    const c = src.charCodeAt(i);
    h1 = (Math.imul(h1 ^ c, 2654435761) >>> 0);
    h2 = (Math.imul(h2 ^ c, 2246822519) >>> 0);
  }
  return [h1, h2, (h1 ^ h2) >>> 0, (h1 + h2) >>> 0]
    .map(n => n.toString(16).padStart(8, '0'))
    .join('');
}

function getUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch { /* storage full — ignore */ }
}

export function getCurrentUser() {
  try {
    return localStorage.getItem(CURRENT_USER_KEY) || null;
  } catch {
    return null;
  }
}

export function isLoggedIn() {
  return !!getCurrentUser();
}

export function login(username, password) {
  const u = username.trim();
  if (u.length < 2) return { success: false, error: 'Benutzername zu kurz (mind. 2 Zeichen).' };
  if (password.length < 4) return { success: false, error: 'Passwort zu kurz (mind. 4 Zeichen).' };

  const users = getUsers();
  if (!users[u]) return { success: false, error: 'Kein Konto gefunden. Bitte zuerst unter „Registrieren" ein Konto anlegen.' };

  const hash = hashPassword(password);
  if (users[u].passwordHash !== hash) return { success: false, error: 'Falsches Passwort.' };

  try { localStorage.setItem(CURRENT_USER_KEY, u); } catch { /* ignore */ }
  return { success: true };
}

export function register(username, password) {
  const u = username.trim();
  if (u.length < 2) return { success: false, error: 'Benutzername zu kurz (mind. 2 Zeichen).' };
  if (password.length < 4) return { success: false, error: 'Passwort zu kurz (mind. 4 Zeichen).' };

  const users = getUsers();
  const hash = hashPassword(password);

  if (users[u]) {
    if (users[u].passwordHash === hash) {
      try { localStorage.setItem(CURRENT_USER_KEY, u); } catch { /* ignore */ }
      return { success: true };
    }
    return { success: false, error: 'Dieses Konto existiert bereits. Bitte unter „Einloggen" anmelden.' };
  }

  users[u] = { passwordHash: hash };
  saveUsers(users);
  try { localStorage.setItem(CURRENT_USER_KEY, u); } catch { /* ignore */ }
  return { success: true };
}

export function logout() {
  try { localStorage.removeItem(CURRENT_USER_KEY); } catch { /* ignore */ }
}
