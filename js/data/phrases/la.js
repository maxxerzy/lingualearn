// Konversations-Bausteine Latein — klassische Wendungen, die im Lernkurs
// gehört, verstanden und nachgesprochen werden. Latein wird zwar nicht
// mehr gesprochen, doch genau diese Sätze stehen in jedem Lehrbuch und
// machen die Formen (Vokativ, Personalendungen) sofort greifbar.
export const phrases = [
  { de: 'Sei gegrüßt!', target: 'Salve!', hint: 'An eine Person; an mehrere: „Salvete!"', reply: 'Salve et tu!', replyDe: 'Auch du sei gegrüßt!' },
  { de: 'Guten Tag, Marcus!', target: 'Salve, Marce!', hint: 'Bei der Anrede steht der Vokativ: Marcus → Marce.', reply: 'Salve, amice!', replyDe: 'Sei gegrüßt, Freund!' },
  { de: 'Wie geht es dir?', target: 'Quid agis?', hint: 'Wörtlich „was tust du?" — die klassische Nachfrage.', reply: 'Bene valeo, gratias.', replyDe: 'Mir geht es gut, danke.' },
  { de: 'Mir geht es gut.', target: 'Bene valeo.', hint: '„valere" = sich wohl befinden; Endung -o = ich.', reply: 'Gaudeo!', replyDe: 'Das freut mich!' },
  { de: 'Wie heißt du?', target: 'Quod est nomen tibi?', hint: 'Wörtlich „welches ist der Name für dich?".', reply: 'Nomen mihi est Iulia.', replyDe: 'Mein Name ist Julia.' },
  { de: 'Ich heiße Julia.', target: 'Nomen mihi est Iulia.', hint: 'Dativ „mihi" — der Name gehört mir.', reply: 'Gaudeo te videre.', replyDe: 'Ich freue mich, dich zu sehen.' },
  { de: 'Danke!', target: 'Gratias tibi ago!', hint: 'Wörtlich „ich sage dir Dank".', reply: 'Libenter!', replyDe: 'Gerne!' },
  { de: 'Bitte!', target: 'Quaeso!', hint: 'Höfliche Bitte, mitten im Satz eingeschoben.', reply: 'Certe.', replyDe: 'Gewiss.' },
  { de: 'Ich verstehe nicht.', target: 'Non intellego.', hint: '„non" vor dem Verb verneint.', reply: 'Iterum dicam.', replyDe: 'Ich sage es noch einmal.' },
  { de: 'Sprich bitte langsamer.', target: 'Loquere lentius, quaeso.', hint: '„lentius" ist der Komparativ: langsamer.', reply: 'Ita faciam.', replyDe: 'So werde ich es machen.' },
  { de: 'Was ist das?', target: 'Quid est hoc?', hint: 'Die Grundfrage — „quid" fragt nach der Sache.', reply: 'Hic liber est.', replyDe: 'Das ist ein Buch.' },
  { de: 'Wo bist du?', target: 'Ubi es?', hint: '„ubi" fragt nach dem Ort, „es" heißt „du bist".', reply: 'In horto sum.', replyDe: 'Ich bin im Garten.' },
  { de: 'Ich weiß es nicht.', target: 'Nescio.', hint: 'Ein einziges Wort — „ne-scio" = nicht wissen.', reply: 'Nihil obstat.', replyDe: 'Kein Problem.' },
  { de: 'Leb wohl!', target: 'Vale!', hint: 'Der klassische Abschied; an mehrere: „Valete!"', reply: 'Vale et tu!', replyDe: 'Leb auch du wohl!' },
  {"de": "Woher kommst du?", "target": "Unde venis?", "hint": "„unde\" fragt nach dem Woher, „quo\" nach dem Wohin.", "reply": "E Germania venio.", "replyDe": "Ich komme aus Germanien."},
  {"de": "Wie spät ist es?", "target": "Quota hora est?", "hint": "Die Römer zählten die Stunden ab Sonnenaufgang.", "reply": "Tertia hora est.", "replyDe": "Es ist die dritte Stunde."},
  {"de": "Wo ist das Forum?", "target": "Ubi est forum?", "hint": "Mit „ubi est …?\" fragst du nach jedem Ort.", "reply": "Recta via, deinde dextra.", "replyDe": "Geradeaus, dann rechts."},
  {"de": "Kannst du mir helfen?", "target": "Potesne me adiuvare?", "hint": "Das angehängte „-ne\" macht die Frage.", "reply": "Libenter te adiuvo.", "replyDe": "Ich helfe dir gern."},
  {"de": "Das gefällt mir.", "target": "Hoc mihi placet.", "hint": "„placere\" + Dativ — exakt wie „mir gefällt\".", "reply": "Mihi quoque placet.", "replyDe": "Mir gefällt es auch."},
  {"de": "Die Sonne scheint.", "target": "Sol lucet.", "hint": "Zwei Wörter, vollständiger Satz — Latein braucht kein „es\".", "reply": "Dies pulcher est!", "replyDe": "Ein schöner Tag!"},
  {"de": "Ich habe Hunger.", "target": "Esurio.", "hint": "Ein einziges Verb sagt alles: „ich hungere\".", "reply": "Veni, cenemus!", "replyDe": "Komm, lass uns essen!"},
  {"de": "Bis morgen!", "target": "In crastinum!", "hint": "Aus „cras\" (morgen) — wörtlich „auf das Morgige!\".", "reply": "Bene vale!", "replyDe": "Leb wohl!"},
  {"de": "Sprich langsamer, bitte.", "target": "Lentius loquere, quaeso.", "hint": "„loquere\" ist Imperativ des Deponens „loqui\".", "reply": "Ita, lentius loquar.", "replyDe": "Gut, ich spreche langsamer."},
  {"de": "Was machst du heute?", "target": "Quid hodie agis?", "hint": "„agere\" ist das Allzweck-Verb für Tun und Treiben.", "reply": "In foro ambulo.", "replyDe": "Ich spaziere über das Forum."},
];
