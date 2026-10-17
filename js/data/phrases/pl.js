// Konversations-Bausteine Polnisch — kurze Alltagswendungen, die im
// Lernkurs gehört, verstanden und nachgesprochen werden.
export const phrases = [
  { de: 'Hallo! / Guten Tag!', target: 'Dzień dobry!', hint: 'Der Standardgruß von morgens bis zum Abend — formell wie alltäglich.', reply: 'Dzień dobry! W czym mogę pomóc?', replyDe: 'Guten Tag! Wie kann ich helfen?' },
  { de: 'Hallo! / Tschüss! (unter Freunden)', target: 'Cześć!', hint: 'Gilt sowohl zur Begrüßung als auch zum Abschied unter Freunden.', reply: 'Cześć! Co tam słychać?', replyDe: 'Hallo! Wie geht es dir?' },
  { de: 'Guten Abend!', target: 'Dobry wieczór!', hint: 'Wird verwendet, sobald es dunkel wird oder ab ca. 18 Uhr.', reply: 'Dobry wieczór! Zapraszamy.', replyDe: 'Guten Abend! Willkommen.' },
  { de: 'Wie geht es dir?', target: 'Jak się masz?', hint: 'Die klassische, herzliche Frage nach dem Befinden unter Bekannten.', reply: 'Dziękuję, wszystko w porządku!', replyDe: 'Danke, alles in Ordnung!' },
  { de: 'Ich heiße …', target: 'Nazywam się …', hint: 'Für Vor- und Nachname; nur Vorname: „Mam na imię …".', reply: 'Bardzo mi miło cię poznać.', replyDe: 'Sehr angenehm, dich kennenzulernen.' },
  { de: 'Wie heißt du?', target: 'Jak masz na imię?', hint: 'Die direkte Frage nach dem Vornamen unter Gleichaltrigen.', reply: 'Mam na imię Piotr.', replyDe: 'Ich heiße Piotr.' },
  { de: 'Danke schön!', target: 'Dziękuję bardzo!', hint: '„Bardzo" verstärkt das Danke zu „sehr / vielen Dank".', reply: 'Proszę bardzo!', replyDe: 'Bitte sehr / Gerne geschehen!' },
  { de: 'Bitte sehr / Gern geschehen', target: 'Nie ma za co!', hint: 'Wörtlich „da gibt es nichts wofür" — wie „keine Ursache".', reply: 'Jesteś bardzo miły.', replyDe: 'Du bist sehr nett.' },
  { de: 'Entschuldigung! / Verzeihung!', target: 'Przepraszam!', hint: 'Dient sowohl als Entschuldigung als auch zum Ansprechen von Fremden.', reply: 'Nic się nie stało.', replyDe: 'Macht überhaupt nichts.' },
  { de: 'Sprechen Sie Englisch?', target: 'Czy mówi Pan po angielsku?', hint: 'Höfliche Frage an einen Mann (mit „Pani" für Frauen).', reply: 'Tak, mówię trochę po angielsku.', replyDe: 'Ja, ich spreche ein wenig Englisch.' },
  { de: 'Ich verstehe nicht.', target: 'Nie rozumiem.', hint: 'Klar und höflich — hilft in jedem Gespräch weiter.', reply: 'Powtórzę wolniej.', replyDe: 'Ich wiederhole es langsamer.' },
  { de: 'Können Sie das bitte wiederholen?', target: 'Czy może Pan to powtórzyć?', hint: 'Höfliche Bitte um Wiederholung (an eine Dame: „Pani").', reply: 'Oczywiście, żaden problem.', replyDe: 'Natürlich, gar kein Problem.' },
  { de: 'Was kostet das?', target: 'Ile to kosztuje?', hint: 'Wörtlich „wie viel kostet das?" — der wichtigste Satz beim Einkaufen.', reply: 'To kosztuje dwadzieścia złotych.', replyDe: 'Das kostet zwanzig Złoty.' },
  { de: 'Einen Kaffee bitte.', target: 'Poproszę kawę.', hint: '„Poproszę" + Akkusativ ist die typische polnische Bestellformel.', reply: 'Z mlekiem czy bez?', replyDe: 'Mit Milch oder ohne?' },
  { de: 'Wo ist die Toilette?', target: 'Gdzie jest toaleta?', hint: 'Unverzichtbare Wegweiser-Frage im Restaurant oder Café.', reply: 'Toaleta jest po prawej stronie.', replyDe: 'Die Toilette ist auf der rechten Seite.' },
  { de: 'Auf Wiedersehen!', target: 'Do widzenia!', hint: 'Die klassische, formelle Verabschiedung bis zum nächsten Wiedersehen.', reply: 'Do widzenia i miłego dnia!', replyDe: 'Auf Wiedersehen und einen schönen Tag!' },
  { de: 'Bis bald!', target: 'Do zobaczenia!', hint: 'Wörtlich „bis zum Sehen" — gebräuchlich und freundlich.', reply: 'Do zobaczenia wkrótce!', replyDe: 'Bis bald / Bis gleich!' },
  { de: 'Woher kommst du?', target: 'Skąd jesteś?', hint: '„Skąd" leitet immer Fragen nach der Herkunft ein.', reply: 'Jestem z Niemiec.', replyDe: 'Ich komme aus Deutschland.' },
  { de: 'Die Rechnung, bitte.', target: 'Poproszę o rachunek.', hint: 'Höflich im Restaurant, wenn man bezahlen möchte.', reply: 'Oczywiście, płatność kartą czy gotówką?', replyDe: 'Natürlich, Kartenzahlung oder bar?' },
  { de: 'Guten Appetit!', target: 'Smacznego!', hint: 'Wird vor jeder Mahlzeit herzlich gewünscht.', reply: 'Dziękuję, nawzajem!', replyDe: 'Danke, gleichfalls!' },
  { de: 'Wo ist der Bahnhof?', target: 'Gdzie jest dworzec?', hint: '„Dworzec kolejowy" = Bahnhof, „dworzec autobusowy" = Busbahnhof.', reply: 'Prosto i potem w lewo.', replyDe: 'Geradeaus und dann nach links.' },
  { de: 'Wie spät ist es?', target: 'Która jest godzina?', hint: 'Wörtlich „welche Stunde ist es?" — Standardfrage nach der Uhrzeit.', reply: 'Jest piętnasta trzydzieści.', replyDe: 'Es ist fünfzehn Uhr dreißig.' },
  { de: 'Können Sie mir helfen?', target: 'Czy może mi Pan pomóc?', hint: 'Höfliche Bitte um Unterstützung an Passanten.', reply: 'Tak, chętnie pomogę.', replyDe: 'Ja, gerne helfe ich.' },
  { de: 'Das gefällt mir sehr.', target: 'Bardzo mi się to podoba.', hint: '„Podobać się" verlangt Dativ der Person (mi).', reply: 'Cieszę się, że ci się podoba!', replyDe: 'Freut mich, dass es dir gefällt!' },
  { de: 'Langsamer, bitte.', target: 'Wolniej, proszę.', hint: 'Der Retter in Not, wenn der Gesprächspartner zu schnell spricht.', reply: 'Przepraszam, już mówię spokojniej.', replyDe: 'Entschuldigung, ich spreche schon ruhiger.' }
];
