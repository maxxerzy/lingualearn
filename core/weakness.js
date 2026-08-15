import { getCardStates, cardAccuracy } from './cardProgress.js';
import { themeOf } from '../js/data/themes.js';

// Schwächen-Profil: statt einer Liste der letzten 30 Fehler (die jede neue
// Session überschrieben hat) wird hier aus dem dauerhaften Karten-Zustand
// abgeleitet, WAS chronisch nicht sitzt — pro Thema eine Trefferquote.
//
// Datenquelle ist ausschließlich `core/cardProgress.js`: dort steht pro
// Karte richtig/falsch über die gesamte Lernzeit plus die letzten fünf
// Antworten. Es wird also nichts zusätzlich gespeichert und nichts
// zusätzlich synchronisiert — das Profil ist eine reine Auswertung.

// Ein Thema braucht genug Belege, bevor es als Schwäche gilt — sonst
// wäre ein einzelner Fehltipp gleich ein „chronisches Problem".
export const MIN_THEME_ANSWERS = 8;
export const MIN_THEME_WORDS = 3;

// Unterhalb dieser Trefferquote gilt ein Thema als echte Schwäche
// (und darf die „Für dich"-Leiste belegen).
export const WEAK_RATE = 0.8;

// Themen-Profil eines Decks, schwächstes Thema zuerst.
// Rückgabe je Thema: { theme, rate, answers, words, fronts }
// `fronts` ist bereits nach Trefferquote sortiert (schlechteste zuerst),
// dient also direkt als Übungspaket.
export function themeProfile(deckId) {
  const states = getCardStates(deckId);
  const groups = new Map();

  for (const [front, st] of Object.entries(states)) {
    const theme = themeOf(front);
    if (!theme) continue;
    const rate = cardAccuracy(st);
    if (rate === null) continue;
    const g = groups.get(theme) || { theme, answers: 0, weighted: 0, cards: [] };
    const answers = (st.correct || 0) + (st.wrong || 0);
    // Themen-Quote = Mittel der Wort-Quoten, gewichtet nach Anzahl der
    // Antworten. Ein Wort, das zwanzigmal dran war, zählt also mehr als
    // eines mit zwei Versuchen.
    g.answers += answers;
    g.weighted += rate * answers;
    g.cards.push({ front, rate, wrong: st.wrong || 0 });
    groups.set(theme, g);
  }

  const out = [];
  for (const g of groups.values()) {
    if (g.answers < MIN_THEME_ANSWERS || g.cards.length < MIN_THEME_WORDS) continue;
    g.cards.sort((a, b) => a.rate - b.rate || b.wrong - a.wrong);
    out.push({
      theme: g.theme,
      rate: g.weighted / g.answers,
      answers: g.answers,
      words: g.cards.length,
      fronts: g.cards.map(c => c.front),
    });
  }
  // Schwächstes zuerst; bei Gleichstand entscheidet die Menge der Belege.
  out.sort((a, b) => a.rate - b.rate || b.answers - a.answers);
  return out;
}

// Ab dieser Quote ist ein Thema so gut wie fehlerfrei und gehört nicht
// mehr unter „deine schwächsten Themen" — sonst stünde dort 100 %.
export const SHOW_RATE = 0.95;

// Die schwächsten Themen (Standard: drei) für die Statistik-Ansicht.
export function weakThemes(deckId, limit = 3, maxRate = SHOW_RATE) {
  return themeProfile(deckId).filter(t => t.rate < maxRate).slice(0, limit);
}

// Übungspaket zu einem Thema: die schwächsten Wörter zuerst.
export function themePack(deckId, theme, limit = 12) {
  const entry = themeProfile(deckId).find(t => t.theme === theme);
  return entry ? entry.fronts.slice(0, limit) : [];
}

// Kandidat für die „Für dich"-Leiste: nur ein Thema, das wirklich hakt und
// genug Wörter für eine sinnvolle Runde hat.
export function weakestForRecommendation(deckId, minWords = 4) {
  const t = themeProfile(deckId)[0];
  if (!t || t.rate >= WEAK_RATE || t.words < minWords) return null;
  return t;
}

export function ratePercent(rate) {
  return Math.round(rate * 100);
}
