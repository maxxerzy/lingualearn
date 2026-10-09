// Konversations-Bausteine Arabisch (Hocharabisch, Fuṣḥā) — kurze
// Alltagswendungen, die im Lernkurs gehört, verstanden und nachgesprochen
// werden. Ziel voll vokalisiert, damit man jede Silbe lesen kann; die
// Spracherkennung liefert unvokalisierten Text, der Abgleich gleicht das
// über `normalizeSpoken` (utils/pronounce.js) an.
export const phrases = [
  { de: 'Hallo!', target: 'مَرْحَبًا!', roman: 'marḥaban', hint: 'Passt immer, zu jeder Tageszeit und gegenüber jedem.', reply: 'أَهْلًا وَسَهْلًا!', replyDe: 'Herzlich willkommen!' },
  { de: 'Guten Morgen!', target: 'صَبَاحُ الْخَيْرِ!', roman: 'ṣabāḥ al-khayr', hint: 'Wörtlich „Morgen des Guten“ — die Antwort lautet „ṣabāḥ an-nūr“.', reply: 'صَبَاحُ النُّورِ!', replyDe: 'Guten Morgen! (wörtl. „Morgen des Lichts“)' },
  { de: 'Wie geht es dir?', target: 'كَيْفَ حَالُكَ؟', roman: 'kayfa ḥāluka', hint: 'Zu einer Frau „kayfa ḥāluki“ — die Endung zeigt, wen man anspricht.', reply: 'بِخَيْرٍ، الْحَمْدُ لِلَّهِ.', replyDe: 'Gut, Gott sei Dank.' },
  { de: 'Ich heiße …', target: 'اِسْمِي …', roman: 'ismī …', hint: 'Wörtlich „mein Name …“ — ein „ist“ braucht das Arabische hier nicht.', reply: 'تَشَرَّفْنَا.', replyDe: 'Sehr erfreut.' },
  { de: 'Wie heißt du?', target: 'مَا اسْمُكَ؟', roman: 'mā smuka', hint: '„mā“ fragt nach Dingen und Namen, „man“ nach Personen.', reply: 'اِسْمِي سَلْمَى.', replyDe: 'Ich heiße Salma.' },
  { de: 'Vielen Dank!', target: 'شُكْرًا جَزِيلًا!', roman: 'shukran jazīlan', hint: 'Wörtlich „reichlichen Dank“ — das „-an“ am Ende ist die Tanwīn-Endung.', reply: 'عَفْوًا.', replyDe: 'Gern geschehen.' },
  { de: 'Es tut mir leid.', target: 'أَنَا آسِفٌ.', roman: 'anā āsif', hint: 'Eine Frau sagt „anā āsifa“ — Adjektive richten sich nach dem Sprecher.', reply: 'لَا بَأْسَ.', replyDe: 'Kein Problem.' },
  { de: 'Sprichst du Englisch?', target: 'هَلْ تَتَكَلَّمُ الْإِنْجِلِيزِيَّةَ؟', roman: 'hal tatakallamu l-injilīziyya', hint: '„hal“ stellt eine Ja/Nein-Frage voran — wie ein gesprochenes Fragezeichen.', reply: 'قَلِيلًا.', replyDe: 'Ein bisschen.' },
  { de: 'Ich verstehe nicht.', target: 'لَا أَفْهَمُ.', roman: 'lā afham', hint: '„lā“ verneint das Präsens; „afham“ heißt „ich verstehe“.', reply: 'سَأَشْرَحُ لَكَ مَرَّةً أُخْرَى.', replyDe: 'Ich erkläre es dir noch einmal.' },
  { de: 'Kannst du langsamer sprechen?', target: 'هَلْ يُمْكِنُكَ أَنْ تَتَكَلَّمَ بِبُطْءٍ؟', roman: 'hal yumkinuka an tatakallama bi-buṭʾ', hint: '„yumkinuka“ heißt wörtlich „es ist dir möglich“.', reply: 'طَبْعًا!', replyDe: 'Natürlich!' },
  { de: 'Was kostet das?', target: 'بِكَمْ هَذَا؟', roman: 'bi-kam hādhā', hint: 'Wörtlich „für wie viel dies?“ — auf jedem Markt unverzichtbar.', reply: 'بِعَشَرَةِ دَرَاهِمَ.', replyDe: 'Zehn Dirham.' },
  { de: 'Einen Kaffee, bitte.', target: 'قَهْوَةً، مِنْ فَضْلِكَ.', roman: 'qahwa, min faḍlik', hint: '„min faḍlik“ — wörtlich „von deiner Güte“ — ist das höfliche „bitte“.', reply: 'حَالًا.', replyDe: 'Sofort.' },
  { de: 'Wo ist der Bahnhof?', target: 'أَيْنَ الْمَحَطَّةُ؟', roman: 'ayna l-maḥaṭṭa', hint: '„ayna“ + Ort genügt — ein „ist“ braucht es nicht.', reply: 'هِيَ عَلَى الْيَمِينِ.', replyDe: 'Er ist rechts.' },
  { de: 'Auf Wiedersehen!', target: 'مَعَ السَّلَامَةِ!', roman: 'maʿa s-salāma', hint: 'Wörtlich „mit der Unversehrtheit“ — der übliche Abschied.', reply: 'إِلَى اللِّقَاءِ!', replyDe: 'Bis zum Wiedersehen!' },
  { de: 'Woher kommst du?', target: 'مِنْ أَيْنَ أَنْتَ؟', roman: 'min ayna anta', hint: 'Zu einer Frau „anti“ — Arabisch unterscheidet „du“ nach Geschlecht.', reply: 'أَنَا مِنْ أَلْمَانِيَا.', replyDe: 'Ich bin aus Deutschland.' },
  { de: 'Die Rechnung, bitte.', target: 'الْحِسَابُ، مِنْ فَضْلِكَ.', roman: 'al-ḥisāb, min faḍlik', hint: '„ḥisāb“ stammt von der Wurzel ḥ-s-b „rechnen“.', reply: 'تَفَضَّلْ.', replyDe: 'Bitte sehr.' },
  { de: 'Hat dir das Essen geschmeckt?', target: 'هَلْ أَعْجَبَكَ الطَّعَامُ؟', roman: 'hal aʿjabaka ṭ-ṭaʿām', hint: 'Wie „gefallen“ im Deutschen: das Essen ist Subjekt, „-ka“ heißt „dir“.', reply: 'نَعَمْ، إِنَّهُ لَذِيذٌ جِدًّا!', replyDe: 'Ja, es ist sehr lecker!' },
  { de: 'Ich hätte gern einen Tee.', target: 'أُرِيدُ شَايًا، مِنْ فَضْلِكَ.', roman: 'urīdu shāyan, min faḍlik', hint: '„urīdu“ heißt „ich will“ — mit „min faḍlik“ wird es höflich.', reply: 'بِالسُّكَّرِ؟', replyDe: 'Mit Zucker?' },
  { de: 'Wie spät ist es?', target: 'كَمِ السَّاعَةُ؟', roman: 'kami s-sāʿa', hint: 'Wörtlich „wie viel die Stunde?“ — die Antwort nutzt Ordnungszahlen.', reply: 'السَّاعَةُ الثَّالِثَةُ.', replyDe: 'Es ist drei Uhr.' },
  { de: 'Kannst du mir helfen?', target: 'هَلْ يُمْكِنُكَ مُسَاعَدَتِي؟', roman: 'hal yumkinuka musāʿadatī', hint: 'Das „-ī“ am Ende heißt „mein“ — wörtlich „meine Hilfe“.', reply: 'بِكُلِّ سُرُورٍ!', replyDe: 'Sehr gern!' },
  { de: 'Wie ist das Wetter?', target: 'كَيْفَ الطَّقْسُ؟', roman: 'kayfa ṭ-ṭaqs', hint: 'Nominalsatz: Im Präsens lässt Arabisch das „ist“ einfach weg.', reply: 'الْجَوُّ حَارٌّ الْيَوْمَ.', replyDe: 'Heute ist es heiß.' },
  { de: 'Das gefällt mir.', target: 'هَذَا يُعْجِبُنِي.', roman: 'hādhā yuʿjibunī', hint: '„hādhā“ ist Subjekt, das angehängte „-nī“ heißt „mir“.', reply: 'وَأَنَا أَيْضًا!', replyDe: 'Mir auch!' },
  { de: 'Bis morgen!', target: 'إِلَى الْغَدِ!', roman: 'ilā l-ghad', hint: 'Nach dem Muster „ilā …“ (bis …): ilā l-liqāʾ, ilā l-ghad.', reply: 'تُصْبِحُ عَلَى خَيْرٍ!', replyDe: 'Gute Nacht!' },
  { de: 'Was bedeutet das?', target: 'مَاذَا يَعْنِي هَذَا؟', roman: 'mādhā yaʿnī hādhā', hint: '„mādhā“ fragt vor Verben, „mā“ vor Nomen.', reply: 'يَعْنِي «شُكْرًا».', replyDe: 'Es bedeutet „danke“.' },
];
