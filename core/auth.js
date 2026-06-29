const USERS_KEY = 'lingualearn_users';
const CURRENT_USER_KEY = 'lingualearn_current_user';

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode('lingualearn_v1:' + password);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
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
  return localStorage.getItem(CURRENT_USER_KEY) || null;
}

export function isLoggedIn() {
  return !!getCurrentUser();
}

export async function login(username, password) {
  const u = username.trim();
  if (u.length < 2) return { success: false, error: 'Benutzername zu kurz (mind. 2 Zeichen).' };
  if (password.length < 4) return { success: false, error: 'Passwort zu kurz (mind. 4 Zeichen).' };

  const users = getUsers();
  if (!users[u]) return { success: false, error: 'Kein Konto mit diesem Benutzernamen gefunden.' };

  const hash = await hashPassword(password);
  if (users[u].passwordHash !== hash) return { success: false, error: 'Falsches Passwort.' };

  localStorage.setItem(CURRENT_USER_KEY, u);
  return { success: true };
}

export async function register(username, password) {
  const u = username.trim();
  if (u.length < 2) return { success: false, error: 'Benutzername zu kurz (mind. 2 Zeichen).' };
  if (password.length < 4) return { success: false, error: 'Passwort zu kurz (mind. 4 Zeichen).' };

  const users = getUsers();
  if (users[u]) return { success: false, error: 'Benutzername bereits vergeben. Bitte einloggen.' };

  const hash = await hashPassword(password);
  users[u] = { passwordHash: hash };
  saveUsers(users);

  localStorage.setItem(CURRENT_USER_KEY, u);
  return { success: true };
}

export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
}
