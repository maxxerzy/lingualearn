// Grammatik-Kapitel Arabisch (Hocharabisch / Fuṣḥā) — werden im Lernkurs
// vor der jeweiligen Lektion (beforeLesson) eingeschoben und sind in der
// Übersicht nachlesbar. Arabisches steht in <span lang="ar"> (als
// rechts-nach-links isolierter Abschnitt), die Umschrift kursiv dahinter.
export const grammar = [
  {
    id: 'intro', title: 'So funktioniert Arabisch', icon: 'fa-compass', beforeLesson: 1,
    drills: [
      {"q": "In welche Richtung schreibt man Arabisch?", "options": ["von links nach rechts", "von rechts nach links", "von oben nach unten", "beliebig"], "answer": 1, "why": "Arabisch läuft von rechts nach links – Bücher beginnen deshalb auf der aus deutscher Sicht „letzten“ Seite."},
      {"q": "Was haben كِتَاب (Buch) und مَكْتَبَة (Bibliothek) gemeinsam?", "options": ["die Endung", "nichts", "den Artikel", "die Wurzel k-t-b „schreiben“"], "answer": 3, "why": "Beide sind aus den drei Wurzelkonsonanten k-t-b gebaut – das Muster drumherum macht daraus Ding oder Ort."},
      {"q": "Welche Form des Arabischen lernst du in diesem Kurs?", "options": ["Hocharabisch (Fuṣḥā)", "ägyptischen Dialekt", "marokkanischen Dialekt", "Maltesisch"], "answer": 0, "why": "Hocharabisch wird in der ganzen arabischen Welt verstanden – in Nachrichten, Büchern und offiziellen Texten."},
      {"q": "Was zeigen die kleinen Zeichen über und unter den Buchstaben?", "options": ["die Betonung", "die kurzen Vokale", "Großbuchstaben", "die Satzmelodie"], "answer": 1, "why": "Kurze Vokale (a, i, u) sind keine eigenen Buchstaben, sondern Zeichen über oder unter dem Konsonanten."},
      {"q": "Aus wie vielen Konsonanten besteht eine typische arabische Wurzel?", "options": ["zwei", "vier", "drei", "fünf"], "answer": 2, "why": "Die allermeisten Wurzeln haben drei Konsonanten: k-t-b (schreiben), d-r-s (lernen)."},
    ],
    pages: [
      { heading: 'Hocharabisch, Dialekte und die Schrift', html: `
        <p>Arabisch ist in über 20 Ländern Amtssprache – von Marokko bis zum Irak. Dabei gibt es zwei Ebenen:</p>
        <ul>
          <li><b>Hocharabisch</b> (<span lang="ar">الْفُصْحَى</span> <i>al-fuṣḥā</i>): Nachrichten, Bücher, Reden, Schilder – überall gleich und überall verstanden. <b>Das lernst du hier.</b></li>
          <li><b>Dialekte</b> (<span lang="ar">الْعَامِّيَّة</span> <i>al-ʿāmmiyya</i>): die Alltagssprache, von Land zu Land sehr verschieden.</li>
        </ul>
        <p>Geschrieben wird <b>von rechts nach links</b>, in verbundener Schrift und ohne Großbuchstaben. Notiert werden vor allem Konsonanten und lange Vokale; die <b>kurzen Vokale</b> sind kleine Zeichen über oder unter dem Buchstaben (<i>ḥarakāt</i>). In Zeitungen fehlen sie meist – ohne sie sehen <span lang="ar">كَتَبَ</span> <i>kataba</i> (er schrieb) und <span lang="ar">كُتُب</span> <i>kutub</i> (Bücher) gleich aus. In diesem Kurs ist alles <b>vollständig vokalisiert</b>.</p>
        <div class="grammar-tip">💡 Neue Laute: <span lang="ar">ع</span> <i>ʿ</i> (gepresster Kehllaut), <span lang="ar">ح</span> <i>ḥ</i> (kräftiges Hauch-h), <span lang="ar">خ</span> <i>kh</i> (wie in „Bach“), <span lang="ar">ق</span> <i>q</i> (k tief im Rachen) und die „dunklen“ Laute <span lang="ar">ص</span> <i>ṣ</i>, <span lang="ar">ض</span> <i>ḍ</i>, <span lang="ar">ط</span> <i>ṭ</i>, <span lang="ar">ظ</span> <i>ẓ</i>.</div>` },
      { heading: 'Das Wurzelsystem: k-t-b', html: `
        <p>Fast jedes Wort ruht auf einer <b>Wurzel</b> aus drei Konsonanten, die eine Grundbedeutung trägt. Feste Vokal-Muster machen daraus Verben, Personen, Orte und Dinge:</p>
        <table class="gr-table">
          <tr><th>Wort</th><th>Muster</th><th>Bedeutung</th></tr>
          <tr><td><span lang="ar">كَتَبَ</span> <i>kataba</i></td><td>Verb</td><td>er schrieb</td></tr>
          <tr><td><span lang="ar">كِتَاب</span> <i>kitāb</i></td><td>Ding</td><td>Buch</td></tr>
          <tr><td><span lang="ar">كَاتِب</span> <i>kātib</i></td><td>Person (der Tuende)</td><td>Schriftsteller</td></tr>
          <tr><td><span lang="ar">مَكْتَب</span> <i>maktab</i></td><td>Ort (<i>ma-</i>)</td><td>Büro, Schreibtisch</td></tr>
          <tr><td><span lang="ar">مَكْتَبَة</span> <i>maktaba</i></td><td>Ort (<i>ma-</i>)</td><td>Bibliothek, Buchladen</td></tr>
          <tr><td><span lang="ar">مَكْتُوب</span> <i>maktūb</i></td><td>Partizip</td><td>geschrieben; Brief</td></tr>
        </table>
        <div class="grammar-tip">💡 Dasselbe Spiel mit d-r-s „lernen“: <span lang="ar">دَرَسَ</span> <i>darasa</i> (er lernte), <span lang="ar">مَدْرَسَة</span> <i>madrasa</i> (Schule = „Ort des Lernens“), <span lang="ar">مُدَرِّس</span> <i>mudarris</i> (Lehrer). Wer Wurzeln erkennt, kann viele Wörter erraten.</div>` },
    ],
  },
  {
    id: 'alphabet', title: 'Buchstaben & Vokalzeichen', icon: 'fa-font', beforeLesson: 2,
    drills: [
      {"q": "Welcher Buchstabe verbindet sich NICHT mit dem folgenden?", "options": ["ب", "س", "د", "م"], "answer": 2, "why": "د (d) gehört zu den sechs Nicht-Verbindern: Alif, Dāl, Dhāl, Rāʾ, Zāy, Wāw."},
      {"q": "Welches Zeichen bedeutet „kein Vokal“?", "options": ["Fatḥa", "Kasra", "Šadda", "Sukūn"], "answer": 3, "why": "Der kleine Kreis (Sukūn) zeigt, dass auf den Konsonanten kein Vokal folgt: كَلْب kalb."},
      {"q": "Wie liest man مُدَرِّس (Lehrer)?", "options": ["mudaris", "mudarris", "madrasa", "mudrisa"], "answer": 1, "why": "Die Šadda über dem r verdoppelt es: mu-dar-ris."},
      {"q": "Welcher Vokal gehört zu بِ (Strich unter dem Buchstaben)?", "options": ["i (Kasra)", "a (Fatḥa)", "u (Ḍamma)", "kein Vokal"], "answer": 0, "why": "Die Kasra steht unter dem Konsonanten und klingt wie kurzes i: bi."},
      {"q": "Wie spricht man مَدِينَة (Stadt) allein, ohne Endung?", "options": ["madīnat", "madīnu", "madīna", "madīnī"], "answer": 2, "why": "Tāʾ marbūṭa klingt am Wortende wie -a; das t hört man erst vor einer Endung: madīnatī – meine Stadt."},
      {"q": "Welcher lange Vokal steckt in كِتَاب?", "options": ["ī", "ā", "ū"], "answer": 1, "why": "Fatḥa + Alif ergibt langes ā: ki-tāb."},
    ],
    pages: [
      { heading: 'Verbundene Schrift: bis zu vier Formen', html: `
        <p>Das Alphabet hat <b>28 Buchstaben</b>, alle für Konsonanten; drei davon – <span lang="ar">ا</span>, <span lang="ar">و</span>, <span lang="ar">ي</span> – stehen zugleich für lange Vokale. Im Wort werden die Buchstaben verbunden, deshalb sieht jeder je nach Stellung etwas anders aus:</p>
        <table class="gr-table">
          <tr><th>Buchstabe</th><th>am Anfang</th><th>in der Mitte</th><th>am Ende</th></tr>
          <tr><td><span lang="ar">ب</span> <i>b</i></td><td><span lang="ar">بَيْت</span> <i>bayt</i></td><td><span lang="ar">كَبِير</span> <i>kabīr</i></td><td><span lang="ar">كَلْب</span> <i>kalb</i></td></tr>
          <tr><td><span lang="ar">ع</span> <i>ʿ</i></td><td><span lang="ar">عَيْن</span> <i>ʿayn</i></td><td><span lang="ar">بَعْد</span> <i>baʿd</i></td><td><span lang="ar">مَعَ</span> <i>maʿa</i></td></tr>
          <tr><td><span lang="ar">ه</span> <i>h</i></td><td><span lang="ar">هُنَا</span> <i>hunā</i></td><td><span lang="ar">شَهْر</span> <i>shahr</i></td><td><span lang="ar">وَجْه</span> <i>wajh</i></td></tr>
        </table>
        <p><b>Sechs Buchstaben verbinden sich nie mit dem folgenden:</b> <span lang="ar">ا</span> <i>ā</i>, <span lang="ar">د</span> <i>d</i>, <span lang="ar">ذ</span> <i>dh</i>, <span lang="ar">ر</span> <i>r</i>, <span lang="ar">ز</span> <i>z</i>, <span lang="ar">و</span> <i>w</i>. Nach ihnen setzt der nächste Buchstabe neu an – darum hat <span lang="ar">دَار</span> <i>dār</i> (Haus) Lücken zwischen allen Buchstaben.</p>` },
      { heading: 'Vokalzeichen, Sukūn & Šadda', html: `
        <table class="gr-table">
          <tr><th>Zeichen</th><th>Name</th><th>Wirkung</th></tr>
          <tr><td><span lang="ar">بَ</span></td><td>Fatḥa (Strich oben)</td><td>kurzes a: <i>ba</i></td></tr>
          <tr><td><span lang="ar">بِ</span></td><td>Kasra (Strich unten)</td><td>kurzes i: <i>bi</i></td></tr>
          <tr><td><span lang="ar">بُ</span></td><td>Ḍamma (kleines <span lang="ar">و</span> oben)</td><td>kurzes u: <i>bu</i></td></tr>
          <tr><td><span lang="ar">بْ</span></td><td>Sukūn (Kreis)</td><td>kein Vokal: <span lang="ar">كَلْب</span> <i>kalb</i></td></tr>
          <tr><td><span lang="ar">بّ</span></td><td>Šadda (kleines w)</td><td>Konsonant doppelt: <span lang="ar">مُدَرِّس</span> <i>mudarris</i></td></tr>
          <tr><td><span lang="ar">بَا</span> <span lang="ar">بِي</span> <span lang="ar">بُو</span></td><td>lange Vokale</td><td>Vokalzeichen + <span lang="ar">ا</span> / <span lang="ar">ي</span> / <span lang="ar">و</span>: <i>bā, bī, bū</i></td></tr>
        </table>
        <p><b>Tāʾ marbūṭa</b> <span lang="ar">ة</span> („gebundenes t“) steht nur am Wortende und markiert meist das Femininum. Allein klingt es wie <b>-a</b> (<span lang="ar">مَدِينَة</span> <i>madīna</i> – Stadt), vor einer Endung wird es zum hörbaren <b>t</b>: <span lang="ar">مَدِينَتِي</span> <i>madīnatī</i> – meine Stadt.</p>
        <div class="grammar-tip">💡 Die Hamza <span lang="ar">ء</span> ist ein Knacklaut wie in „be-achten“; meist sitzt sie auf einem Träger: <span lang="ar">أَخ</span> <i>akh</i> (Bruder), <span lang="ar">سُؤَال</span> <i>suʾāl</i> (Frage).</div>` },
    ],
  },
  {
    id: 'article', title: 'Der Artikel al- & Sonnenbuchstaben', icon: 'fa-sun', beforeLesson: 4,
    drills: [
      {"q": "Wie spricht man الشَّمْس (die Sonne)?", "options": ["al-shams", "ash-shams", "a-shams", "al-ash-shams"], "answer": 1, "why": "ش ist ein Sonnenbuchstabe: Das l gleicht sich an, das sh wird verdoppelt."},
      {"q": "Wie spricht man الْقَمَر (der Mond)?", "options": ["aq-qamar", "a-qamar", "al-qamar", "il-qamar"], "answer": 2, "why": "ق ist ein Mondbuchstabe: Das l bleibt hörbar und trägt ein Sukūn."},
      {"q": "Welcher Buchstabe ist ein Sonnenbuchstabe?", "options": ["ب (b)", "ك (k)", "م (m)", "ن (n)"], "answer": 3, "why": "n wird mit der Zungenspitze gebildet – an-nūr, das Licht."},
      {"q": "Wie schreibt man „das Licht“ (nūr) mit Artikel richtig?", "options": ["الْنُور", "النُّور", "النُور", "الْنُّور"], "answer": 1, "why": "Vor Sonnenbuchstaben trägt das Lām kein Sukūn; stattdessen bekommt das n eine Šadda: an-nūr."},
      {"q": "Wie sagt man „ein Buch“ im vollständigen Hocharabisch?", "options": ["كِتَابٌ", "الْكِتَابُ", "الْكِتَابٌ"], "answer": 0, "why": "Einen unbestimmten Artikel gibt es nicht – die Endung -un (Tanwīn) zeigt „ein“: kitābun. Artikel und -un schließen sich aus."},
    ],
    pages: [
      { heading: 'al- – ein Artikel für alles', html: `
        <p>Arabisch hat nur <b>einen</b> bestimmten Artikel: <span lang="ar">الْ</span> <i>al-</i>. Er gilt für männlich, weiblich, Singular und Plural und wird direkt ans Wort geschrieben:</p>
        <ul>
          <li><span lang="ar">بَيْت</span> <i>bayt</i> – (ein) Haus → <span lang="ar">الْبَيْت</span> <i>al-bayt</i> – das Haus</li>
          <li><span lang="ar">مَدِينَة</span> <i>madīna</i> – (eine) Stadt → <span lang="ar">الْمَدِينَة</span> <i>al-madīna</i> – die Stadt</li>
        </ul>
        <p>Einen <b>unbestimmten Artikel</b> gibt es nicht. Im vollständigen Hocharabisch zeigt die Endung <b>-un</b> (Tanwīn) „ein“: <span lang="ar">كِتَابٌ</span> <i>kitābun</i> – ein Buch, <span lang="ar">الْكِتَابُ</span> <i>al-kitābu</i> – das Buch. Am Satzende fallen solche Endungen weg – auf den Karteikarten stehen die Wörter deshalb ohne sie.</p>
        <div class="grammar-tip">💡 Das a von <i>al-</i> verschluckt man nach einem Vokal: <span lang="ar">فِي الْبَيْتِ</span> <i>fi l-bayti</i> – im Haus.</div>` },
      { heading: 'Sonnen- und Mondbuchstaben', html: `
        <p>Vor 14 <b>Sonnenbuchstaben</b> – alle mit der Zungenspitze gebildet – gleicht sich das <i>l</i> an: Es wird geschrieben, aber nicht gesprochen, und der folgende Buchstabe wird verdoppelt (Šadda). Vor den 14 <b>Mondbuchstaben</b> bleibt das <i>l</i> hörbar und trägt ein Sukūn.</p>
        <table class="gr-table">
          <tr><th>Sonnenbuchstaben</th><th>Mondbuchstaben</th></tr>
          <tr><td><span lang="ar">الشَّمْس</span> <i>ash-shams</i> – die Sonne</td><td><span lang="ar">الْقَمَر</span> <i>al-qamar</i> – der Mond</td></tr>
          <tr><td><span lang="ar">الرَّجُل</span> <i>ar-rajul</i> – der Mann</td><td><span lang="ar">الْبَاب</span> <i>al-bāb</i> – die Tür</td></tr>
          <tr><td><span lang="ar">النُّور</span> <i>an-nūr</i> – das Licht</td><td><span lang="ar">الْمَاء</span> <i>al-māʾ</i> – das Wasser</td></tr>
          <tr><td><span lang="ar">ت ث د ذ ر ز س ش ص ض ط ظ ل ن</span><br><i>t th d dh r z s sh ṣ ḍ ṭ ẓ l n</i></td><td><span lang="ar">أ ب ج ح خ ع غ ف ق ك م ه و ي</span><br><i>ʾ b j ḥ kh ʿ gh f q k m h w y</i></td></tr>
        </table>
        <div class="grammar-tip">💡 Die Namen kommen von den Musterwörtern Sonne und Mond. Stolperfalle: <i>j</i> ist ein Mondbuchstabe – <span lang="ar">الْجَامِعَة</span> <i>al-jāmiʿa</i> (die Universität).</div>` },
    ],
  },
  {
    id: 'gender', title: 'Männlich & weiblich', icon: 'fa-venus-mars', beforeLesson: 7,
    drills: [
      {"q": "Welches Wort ist weiblich?", "options": ["كِتَاب", "قَلَم", "بَيْت", "مَدِينَة"], "answer": 3, "why": "Die Endung ة zeigt fast immer das Femininum: madīna – Stadt."},
      {"q": "Wie heißt „Lehrerin“ (Lehrer = مُعَلِّم)?", "options": ["مُعَلِّمَة", "مُعَلِّمَانِ", "مُعَلِّمُونَ", "مُعَلِّمِي"], "answer": 0, "why": "Aus dem Mann wird mit ة die Frau: muʿallima. Die anderen Formen heißen „zwei Lehrer“, „Lehrer (Pl.)“, „mein Lehrer“."},
      {"q": "Wie sagt man „ein großes Auto“?", "options": ["سَيَّارَةٌ كَبِيرٌ", "كَبِيرَةٌ سَيَّارَةٌ", "سَيَّارَةٌ كَبِيرَةٌ", "السَّيَّارَةُ كَبِيرَةٌ"], "answer": 2, "why": "Das Adjektiv folgt dem Nomen und wird ebenfalls weiblich: kabīratun. Mit al- nur am Nomen wäre es ein Satz: „Das Auto ist groß.“"},
      {"q": "Wie sagt man „das große Haus“?", "options": ["الْبَيْتُ كَبِيرٌ", "الْبَيْتُ الْكَبِيرُ", "بَيْتٌ الْكَبِيرُ", "الْكَبِيرُ الْبَيْتُ"], "answer": 1, "why": "Bestimmtes Nomen → auch das Adjektiv bekommt al-: al-baytu l-kabīru."},
      {"q": "Welches Wort ist weiblich, obwohl es kein ة hat?", "options": ["شَمْس (Sonne)", "قَمَر (Mond)", "بَاب (Tür)", "قَلَم (Stift)"], "answer": 0, "why": "Sonne gehört zu den weiblichen Wörtern ohne Endung – wie umm (Mutter) oder yad (Hand)."},
      {"q": "Wie heißt „rot“ bei einem weiblichen Nomen?", "options": ["أَحْمَرَة", "حَمْرَاء", "أَحْمَر"], "answer": 1, "why": "Farben haben eine eigene weibliche Form: aḥmar → ḥamrāʾ."},
    ],
    pages: [
      { heading: 'Zwei Geschlechter – ة verrät das Weibliche', html: `
        <p>Arabisch kennt nur <b>männlich</b> und <b>weiblich</b>. Die meisten weiblichen Nomen enden auf <b>Tāʾ marbūṭa</b> <span lang="ar">ة</span> (<i>-a</i>) – so wird oft aus einem Mann eine Frau:</p>
        <table class="gr-table">
          <tr><th>männlich</th><th>weiblich</th></tr>
          <tr><td><span lang="ar">مُعَلِّم</span> <i>muʿallim</i> – Lehrer</td><td><span lang="ar">مُعَلِّمَة</span> <i>muʿallima</i> – Lehrerin</td></tr>
          <tr><td><span lang="ar">طَالِب</span> <i>ṭālib</i> – Student</td><td><span lang="ar">طَالِبَة</span> <i>ṭāliba</i> – Studentin</td></tr>
          <tr><td><span lang="ar">بَيْت</span> <i>bayt</i> – Haus</td><td><span lang="ar">سَيَّارَة</span> <i>sayyāra</i> – Auto</td></tr>
        </table>
        <p><b>Weiblich ohne</b> <span lang="ar">ة</span> sind weibliche Wesen (<span lang="ar">أُمّ</span> <i>umm</i> – Mutter, <span lang="ar">بِنْت</span> <i>bint</i> – Mädchen), die meisten Länder und Städte (<span lang="ar">مِصْر</span> <i>miṣr</i> – Ägypten), paarige Körperteile (<span lang="ar">يَد</span> <i>yad</i> – Hand, <span lang="ar">عَيْن</span> <i>ʿayn</i> – Auge) und einige Einzelwörter wie <span lang="ar">شَمْس</span> <i>shams</i> – Sonne.</p>` },
      { heading: 'Das Adjektiv folgt und passt sich an', html: `
        <p>Das Adjektiv steht <b>hinter</b> dem Nomen und übernimmt Geschlecht, Zahl, Fall – und auch die <b>Bestimmtheit</b>: Hat das Nomen <i>al-</i>, bekommt auch das Adjektiv <i>al-</i>.</p>
        <table class="gr-table">
          <tr><th></th><th>unbestimmt</th><th>bestimmt</th></tr>
          <tr><td>m.</td><td><span lang="ar">بَيْتٌ كَبِيرٌ</span> <i>baytun kabīrun</i><br>ein großes Haus</td><td><span lang="ar">الْبَيْتُ الْكَبِيرُ</span> <i>al-baytu l-kabīru</i><br>das große Haus</td></tr>
          <tr><td>w.</td><td><span lang="ar">سَيَّارَةٌ كَبِيرَةٌ</span> <i>sayyāratun kabīratun</i><br>ein großes Auto</td><td><span lang="ar">السَّيَّارَةُ الْكَبِيرَةُ</span> <i>as-sayyāratu l-kabīratu</i><br>das große Auto</td></tr>
        </table>
        <div class="grammar-tip">💡 Farben haben eine eigene weibliche Form: <span lang="ar">أَحْمَر</span> <i>aḥmar</i> → <span lang="ar">حَمْرَاء</span> <i>ḥamrāʾ</i> (rot), <span lang="ar">أَبْيَض</span> <i>abyaḍ</i> → <span lang="ar">بَيْضَاء</span> <i>bayḍāʾ</i> (weiß): <span lang="ar">سَيَّارَةٌ بَيْضَاءُ</span> <i>sayyāratun bayḍāʾu</i> – ein weißes Auto.</div>` },
    ],
  },
  {
    id: 'nominal', title: 'Der Nominalsatz – ohne ‚sein‘', icon: 'fa-equals', beforeLesson: 11,
    drills: [
      {"q": "Wie sagt man „Ich bin Lehrer.“?", "options": ["أَنْتَ مُعَلِّمٌ", "هُوَ مُعَلِّمٌ", "أَنَا مُعَلِّمٌ", "نَحْنُ مُعَلِّمٌ"], "answer": 2, "why": "anā = ich; ein „bin“ braucht der Nominalsatz nicht."},
      {"q": "Was bedeutet الْبَيْتُ كَبِيرٌ?", "options": ["das große Haus", "Das Haus ist groß.", "ein großes Haus", "Ist das Haus groß?"], "answer": 1, "why": "Bestimmtes Subjekt + unbestimmte Aussage = vollständiger Satz, auch ohne „ist“."},
      {"q": "Wie sagt man „du“ zu einer Frau?", "options": ["أَنْتَ", "هِيَ", "أَنْتُمْ", "أَنْتِ"], "answer": 3, "why": "anti (mit Kasra) für Frauen, anta (mit Fatḥa) für Männer."},
      {"q": "Was heißt نَحْنُ?", "options": ["wir", "ihr", "sie (Plural)", "ich"], "answer": 0, "why": "naḥnu = wir; ihr = antum, sie = hum."},
      {"q": "„Sie ist Ärztin.“ – welches Pronomen gehört an den Anfang?", "options": ["هُوَ", "هِيَ", "هُمْ", "أَنْتِ"], "answer": 1, "why": "hiya = sie (Singular, weiblich): هِيَ طَبِيبَةٌ hiya ṭabībatun."},
      {"q": "Welche Wortgruppe ist KEIN vollständiger Satz?", "options": ["أَنَا مَرِيضٌ", "هٰذَا كِتَابٌ", "الْبَيْتُ الْكَبِيرُ"], "answer": 2, "why": "Mit al- an beiden Wörtern entsteht nur „das große Haus“. Die anderen heißen „Ich bin krank.“ und „Das ist ein Buch.“"},
    ],
    pages: [
      { heading: 'Sätze ohne ‚sein‘', html: `
        <p>Im Präsens braucht Arabisch <b>kein Verb „sein“</b>. Subjekt und Aussage stehen einfach nebeneinander – ein <b>Nominalsatz</b>:</p>
        <ul>
          <li><span lang="ar">أَنَا طَالِبٌ</span> <i>anā ṭālibun</i> – Ich (bin) Student.</li>
          <li><span lang="ar">هٰذَا كِتَابٌ</span> <i>hādhā kitābun</i> – Das (ist) ein Buch.</li>
          <li><span lang="ar">الْبَيْتُ كَبِيرٌ</span> <i>al-baytu kabīrun</i> – Das Haus (ist) groß.</li>
          <li><span lang="ar">الْكِتَابُ عَلَى الطَّاوِلَةِ</span> <i>al-kitābu ʿalā ṭ-ṭāwilati</i> – Das Buch (ist) auf dem Tisch.</li>
        </ul>
        <p>Typisch: Das Subjekt ist <b>bestimmt</b>, die Aussage <b>unbestimmt</b>. Darum ist <span lang="ar">الْبَيْتُ كَبِيرٌ</span> ein Satz, <span lang="ar">الْبَيْتُ الْكَبِيرُ</span> <i>al-baytu l-kabīru</i> („das große Haus“) dagegen nicht.</p>
        <div class="grammar-tip">💡 Ist das Subjekt unbestimmt, rückt die Ortsangabe nach vorn: <span lang="ar">فِي الْبَيْتِ قِطَّةٌ</span> <i>fi l-bayti qiṭṭatun</i> – Im Haus ist eine Katze.</div>` },
      { heading: 'Die Personalpronomen', html: `
        <table class="gr-table">
          <tr><th>Person</th><th>Singular</th><th>Plural</th></tr>
          <tr><td>1.</td><td><span lang="ar">أَنَا</span> <i>anā</i> – ich</td><td><span lang="ar">نَحْنُ</span> <i>naḥnu</i> – wir</td></tr>
          <tr><td>2. m.</td><td><span lang="ar">أَنْتَ</span> <i>anta</i> – du</td><td><span lang="ar">أَنْتُمْ</span> <i>antum</i> – ihr</td></tr>
          <tr><td>2. w.</td><td><span lang="ar">أَنْتِ</span> <i>anti</i> – du</td><td><span lang="ar">أَنْتُنَّ</span> <i>antunna</i> – ihr</td></tr>
          <tr><td>3. m.</td><td><span lang="ar">هُوَ</span> <i>huwa</i> – er</td><td><span lang="ar">هُمْ</span> <i>hum</i> – sie</td></tr>
          <tr><td>3. w.</td><td><span lang="ar">هِيَ</span> <i>hiya</i> – sie</td><td><span lang="ar">هُنَّ</span> <i>hunna</i> – sie</td></tr>
        </table>
        <p>Schon beim „du“ wird unterschieden: <span lang="ar">أَنْتَ</span> <i>anta</i> zu einem Mann, <span lang="ar">أَنْتِ</span> <i>anti</i> zu einer Frau. Gemischte Gruppen stehen männlich. Für genau zwei gibt es Dualformen: <span lang="ar">أَنْتُمَا</span> <i>antumā</i> – ihr beide, <span lang="ar">هُمَا</span> <i>humā</i> – sie beide.</p>
        <div class="grammar-tip">💡 <span lang="ar">هُوَ</span> und <span lang="ar">هِيَ</span> stehen auch für Dinge: <span lang="ar">أَيْنَ السَّيَّارَةُ؟ هِيَ هُنَا.</span> <i>ayna s-sayyāratu? hiya hunā.</i> – Wo ist das Auto? Es ist hier.</div>` },
    ],
  },
  {
    id: 'possessive', title: 'Besitz: angehängte Pronomen', icon: 'fa-hand-holding', beforeLesson: 16,
    drills: [
      {"q": "Wie sagt man „mein Buch“?", "options": ["الْكِتَابِي", "كِتَابُكَ", "كِتَابِي", "كِتَابُنَا"], "answer": 2, "why": "Endung -ī = mein. Mit Endung nie zusätzlich al-."},
      {"q": "Wie heißt „ihr Auto“ (das Auto von ihr)?", "options": ["سَيَّارَتُهَا", "سَيَّارَةُهَا", "سَيَّارَتُهُ", "السَّيَّارَتُهَا"], "answer": 0, "why": "Vor der Endung wird ة zu ت: sayyāratuhā. -hu hieße „sein“."},
      {"q": "Wie sagt man „Ich habe ein Buch.“?", "options": ["أَنَا كِتَابٌ", "كِتَابِي", "عِنْدَهُ كِتَابٌ", "عِنْدِي كِتَابٌ"], "answer": 3, "why": "„Haben“ heißt wörtlich „bei mir ist“: ʿindī kitābun. ʿindahu = er hat."},
      {"q": "Was bedeutet بَيْتُنَا?", "options": ["euer Haus", "unser Haus", "ihr Haus", "sein Haus"], "answer": 1, "why": "-nā = unser – wie in naḥnu (wir)."},
      {"q": "Welche Endung heißt „dein“ zu einer Frau?", "options": ["-ka", "-hā", "-ki", "-kum"], "answer": 2, "why": "Wie bei anta/anti: -ka für Männer, -ki für Frauen."},
      {"q": "Wie heißt „in seinem Haus“?", "options": ["فِي بَيْتِهَا", "فِي بَيْتِهِ", "فِي الْبَيْتِهِ"], "answer": 1, "why": "Nach dem i der Genitivendung wird -hu zu -hi: fī baytihi. -hā hieße „ihr“."},
    ],
    pages: [
      { heading: 'Mein, dein, sein – als Endung', html: `
        <p>Besitz wird als <b>Endung</b> ans Nomen gehängt. Ein Nomen mit Endung ist automatisch bestimmt – es bekommt also <b>nie</b> zusätzlich <i>al-</i>.</p>
        <table class="gr-table">
          <tr><th>Endung</th><th>Bedeutung</th><th>Beispiel</th></tr>
          <tr><td><i>-ī</i></td><td>mein</td><td><span lang="ar">كِتَابِي</span> <i>kitābī</i></td></tr>
          <tr><td><i>-ka / -ki</i></td><td>dein (m./w.)</td><td><span lang="ar">كِتَابُكَ</span> <i>kitābuka</i> / <span lang="ar">كِتَابُكِ</span> <i>kitābuki</i></td></tr>
          <tr><td><i>-hu / -hā</i></td><td>sein / ihr</td><td><span lang="ar">كِتَابُهُ</span> <i>kitābuhu</i> / <span lang="ar">كِتَابُهَا</span> <i>kitābuhā</i></td></tr>
          <tr><td><i>-nā</i></td><td>unser</td><td><span lang="ar">كِتَابُنَا</span> <i>kitābunā</i></td></tr>
          <tr><td><i>-kum</i></td><td>euer</td><td><span lang="ar">كِتَابُكُمْ</span> <i>kitābukum</i></td></tr>
          <tr><td><i>-hum</i></td><td>ihr (Plural)</td><td><span lang="ar">كِتَابُهُمْ</span> <i>kitābuhum</i></td></tr>
        </table>
        <p>Ein Adjektiv dazu bekommt <i>al-</i>: <span lang="ar">كِتَابُهَا الْجَدِيدُ</span> <i>kitābuhā l-jadīdu</i> – ihr neues Buch.</p>` },
      { heading: 'ة wird zu t – und „haben“ mit ʿinda', html: `
        <p>Bei Wörtern auf <span lang="ar">ة</span> wird das „gebundene t“ vor der Endung hörbar und als <span lang="ar">ت</span> geschrieben:</p>
        <ul>
          <li><span lang="ar">سَيَّارَة</span> <i>sayyāra</i> → <span lang="ar">سَيَّارَتِي</span> <i>sayyāratī</i> – mein Auto</li>
          <li><span lang="ar">مَدِينَة</span> <i>madīna</i> → <span lang="ar">مَدِينَتُنَا</span> <i>madīnatunā</i> – unsere Stadt</li>
        </ul>
        <p>Dieselben Endungen hängen auch an Präpositionen. Ein Verb „haben“ gibt es nicht – man sagt „bei mir ist“: <span lang="ar">عِنْدِي سَيَّارَةٌ</span> <i>ʿindī sayyāratun</i> – Ich habe ein Auto. Ebenso: <span lang="ar">مَعِي</span> <i>maʿī</i> – mit mir, <span lang="ar">لَهُ</span> <i>lahu</i> – für ihn.</p>
        <div class="grammar-tip">💡 Nach <i>i</i> oder <i>ī</i> werden <i>-hu</i> und <i>-hum</i> zu <i>-hi</i> und <i>-him</i>: <span lang="ar">فِي بَيْتِهِ</span> <i>fī baytihi</i> – in seinem Haus.</div>` },
    ],
  },
  {
    id: 'plural', title: 'Dual & Plural', icon: 'fa-clone', beforeLesson: 22,
    drills: [
      {"q": "Wie sagt man „zwei Bücher“?", "options": ["كُتُبٌ", "كِتَابُونَ", "كِتَابَانِ", "كِتَابَاتٌ"], "answer": 2, "why": "Der Dual hängt -āni an: kitābāni."},
      {"q": "Was ist der Plural von بَيْت (Haus)?", "options": ["بُيُوت", "بَيْتَات", "بَيْتُونَ", "بَيْتَانِ"], "answer": 0, "why": "bayt hat einen gebrochenen Plural: buyūt. baytāni hieße „zwei Häuser“."},
      {"q": "Was ist der Plural von مُعَلِّمَة (Lehrerin)?", "options": ["مُعَلِّمُونَ", "مُعَلِّمَات", "مُعَلِّمَتَانِ"], "answer": 1, "why": "Weibliche Personen bekommen den gesunden Plural auf -āt: muʿallimāt."},
      {"q": "„Die Bücher sind neu.“ – welche Form ist richtig?", "options": ["الْكُتُبُ جَدِيدٌ", "الْكُتُبُ جَدِيدُونَ", "الْكُتُبُ الْجَدِيدَةُ", "الْكُتُبُ جَدِيدَةٌ"], "answer": 3, "why": "Sachplurale gelten als weiblicher Singular: jadīdatun. Mit al- wäre es nur „die neuen Bücher“."},
      {"q": "Wofür steht die Endung -āni?", "options": ["für den Plural", "für genau zwei (Dual)", "für das Femininum", "für die Verkleinerung"], "answer": 1, "why": "kitābāni = zwei Bücher, sayyāratāni = zwei Autos."},
      {"q": "Welcher Plural ist ein „gebrochener“ Plural?", "options": ["مُعَلِّمُونَ", "سَيَّارَات", "رِجَال"], "answer": 2, "why": "rijāl (Männer) entsteht durch Umbau von rajul; die beiden anderen hängen nur eine Endung an."},
    ],
    pages: [
      { heading: 'Einer, zwei, viele', html: `
        <p>Neben Singular und Plural hat Arabisch den <b>Dual</b> für genau zwei. Er endet auf <b>-āni</b> (aus <span lang="ar">ة</span> wird dabei <i>t</i>):</p>
        <ul>
          <li><span lang="ar">كِتَابَانِ</span> <i>kitābāni</i> – zwei Bücher</li>
          <li><span lang="ar">سَيَّارَتَانِ</span> <i>sayyāratāni</i> – zwei Autos</li>
        </ul>
        <p>Der <b>gesunde Plural</b> hängt nur eine Endung an – vor allem bei Personen und bei Wörtern auf <span lang="ar">ة</span>:</p>
        <table class="gr-table">
          <tr><th></th><th>Singular</th><th>Plural</th></tr>
          <tr><td>männlich: <b>-ūna</b></td><td><span lang="ar">مُعَلِّم</span> <i>muʿallim</i></td><td><span lang="ar">مُعَلِّمُونَ</span> <i>muʿallimūna</i> – Lehrer</td></tr>
          <tr><td>weiblich: <b>-āt</b></td><td><span lang="ar">مُعَلِّمَة</span> <i>muʿallima</i></td><td><span lang="ar">مُعَلِّمَات</span> <i>muʿallimāt</i> – Lehrerinnen</td></tr>
          <tr><td>weiblich: <b>-āt</b></td><td><span lang="ar">سَيَّارَة</span> <i>sayyāra</i></td><td><span lang="ar">سَيَّارَات</span> <i>sayyārāt</i> – Autos</td></tr>
        </table>` },
      { heading: 'Der gebrochene Plural', html: `
        <p>Sehr viele Nomen – gerade die häufigsten – bilden den Plural, indem das Wort <b>innen umgebaut</b> wird: Die Wurzel bleibt, das Vokalmuster wechselt.</p>
        <table class="gr-table">
          <tr><th>Singular</th><th>Plural</th></tr>
          <tr><td><span lang="ar">كِتَاب</span> <i>kitāb</i> – Buch</td><td><span lang="ar">كُتُب</span> <i>kutub</i></td></tr>
          <tr><td><span lang="ar">بَيْت</span> <i>bayt</i> – Haus</td><td><span lang="ar">بُيُوت</span> <i>buyūt</i></td></tr>
          <tr><td><span lang="ar">وَلَد</span> <i>walad</i> – Junge, Kind</td><td><span lang="ar">أَوْلَاد</span> <i>awlād</i></td></tr>
          <tr><td><span lang="ar">رَجُل</span> <i>rajul</i> – Mann</td><td><span lang="ar">رِجَال</span> <i>rijāl</i></td></tr>
          <tr><td><span lang="ar">مَدِينَة</span> <i>madīna</i> – Stadt</td><td><span lang="ar">مُدُن</span> <i>mudun</i></td></tr>
        </table>
        <p>Eine feste Regel gibt es nicht – lerne den Plural immer mit dem Wort.</p>
        <div class="grammar-tip">💡 Plurale von <b>Sachen und Tieren</b> gelten grammatisch als <b>weiblicher Singular</b>: <span lang="ar">الْكُتُبُ جَدِيدَةٌ</span> <i>al-kutubu jadīdatun</i> – Die Bücher sind neu. Bei Personen bleibt der Plural: <span lang="ar">الْمُعَلِّمُونَ مَشْغُولُونَ</span> <i>al-muʿallimūna mashghūlūna</i> – Die Lehrer sind beschäftigt.</div>` },
    ],
  },
  {
    id: 'idafa', title: 'Die Iḍāfa – ‚das Haus des Lehrers‘', icon: 'fa-link', beforeLesson: 29,
    drills: [
      {"q": "Wie sagt man „das Haus des Lehrers“?", "options": ["الْبَيْتُ الْمُعَلِّمِ", "بَيْتُ الْمُعَلِّمِ", "بَيْتٌ الْمُعَلِّمُ", "الْمُعَلِّمُ بَيْتٌ"], "answer": 1, "why": "Erstes Wort ohne al-, zweites mit al- im Genitiv: baytu l-muʿallimi."},
      {"q": "Was darf das erste Wort einer Iḍāfa NICHT tragen?", "options": ["den Artikel al-", "eine Fallendung", "ein ة", "mehr als zwei Silben"], "answer": 0, "why": "Das erste Glied wird schon durch das zweite bestimmt – al- und -un sind tabu."},
      {"q": "In welchem Fall steht das zweite Nomen?", "options": ["Nominativ (-u)", "Akkusativ (-a)", "Genitiv (-i)"], "answer": 2, "why": "Der „Besitzer“ steht immer im Genitiv: bābu l-bayti – die Tür des Hauses."},
      {"q": "Wie spricht man سَيَّارَةُ الْمُدِيرِ (das Auto des Direktors)?", "options": ["as-sayyāra al-mudīr", "sayyāratu l-mudīri", "sayyāra l-mudīri", "sayyāratun al-mudīri"], "answer": 1, "why": "Im ersten Glied wird das ة als t gesprochen und es gibt kein -un: sayyāratu l-mudīri."},
      {"q": "Was bedeutet فِنْجَانُ قَهْوَةٍ?", "options": ["Der Kaffee ist heiß.", "Kaffee und Tee", "eine Kaffeekanne", "eine Tasse Kaffee"], "answer": 3, "why": "Die Iḍāfa drückt auch Mengen aus: „eine Tasse (von) Kaffee“."},
    ],
    pages: [
      { heading: 'Zwei Nomen, ein „von“', html: `
        <p>Für „das Haus des Lehrers“ stellt Arabisch zwei Nomen direkt hintereinander – die <b>Iḍāfa</b> („Anfügung“): erst das Besessene, dann der Besitzer.</p>
        <ul>
          <li><span lang="ar">بَيْتُ الْمُعَلِّمِ</span> <i>baytu l-muʿallimi</i> – das Haus des Lehrers</li>
          <li><span lang="ar">بَابُ الْبَيْتِ</span> <i>bābu l-bayti</i> – die Tür des Hauses</li>
          <li><span lang="ar">كِتَابُ طَالِبٍ</span> <i>kitābu ṭālibin</i> – das Buch eines Studenten</li>
        </ul>
        <p>Drei Regeln:</p>
        <ul>
          <li>Das <b>erste</b> Wort bekommt <b>nie</b> <i>al-</i> und kein <i>-un</i>.</li>
          <li>Das <b>zweite</b> steht im <b>Genitiv</b> (<i>-i</i> bzw. <i>-in</i>).</li>
          <li>Ist das zweite bestimmt, ist die ganze Gruppe bestimmt.</li>
        </ul>` },
      { heading: 'Mengen, Ketten und ة', html: `
        <p>Die Iḍāfa drückt auch Mengen aus – praktisch in der Küche: <span lang="ar">فِنْجَانُ قَهْوَةٍ</span> <i>finjānu qahwatin</i> – eine Tasse Kaffee, <span lang="ar">كَأْسُ مَاءٍ</span> <i>kaʾsu māʾin</i> – ein Glas Wasser.</p>
        <p>Endet das erste Wort auf <span lang="ar">ة</span>, wird das <i>t</i> hörbar: <span lang="ar">سَيَّارَةُ الْمُدِيرِ</span> <i>sayyāratu l-mudīri</i> – das Auto des Direktors, <span lang="ar">جَامِعَةُ الْقَاهِرَةِ</span> <i>jāmiʿatu l-qāhirati</i> – die Universität Kairo. Auch Ketten sind möglich: <span lang="ar">مِفْتَاحُ بَابِ الْبَيْتِ</span> <i>miftāḥu bābi l-bayti</i> – der Schlüssel der Haustür.</p>
        <div class="grammar-tip">💡 Ein Adjektiv darf die Iḍāfa nicht trennen – es steht ganz am Ende, und die Fallendung zeigt, wozu es gehört: <span lang="ar">بَيْتُ الْمُعَلِّمِ الْكَبِيرُ</span> <i>baytu l-muʿallimi l-kabīru</i> – das große Haus des Lehrers.</div>` },
    ],
  },
  {
    id: 'past', title: 'Die Vergangenheit (Perfekt)', icon: 'fa-clock-rotate-left', beforeLesson: 36,
    drills: [
      {"q": "Wie heißt „ich schrieb“?", "options": ["كَتَبَ", "كَتَبْتُ", "كَتَبْنَا", "كَتَبَتْ"], "answer": 1, "why": "Die Endung -tu steht für „ich“: katabtu."},
      {"q": "Was bedeutet كَتَبَتْ?", "options": ["sie schrieb", "ich schrieb", "du schriebst", "sie schrieben"], "answer": 0, "why": "-at (mit Sukūn) markiert „sie“ im Singular: katabat."},
      {"q": "Wie heißt „wir gingen“ (ذَهَبَ = gehen)?", "options": ["ذَهَبُوا", "ذَهَبْتُمْ", "ذَهَبْنَا", "ذَهَبْتُ"], "answer": 2, "why": "-nā steht für „wir“ – wie bei naḥnu und der Besitzendung -nā."},
      {"q": "أَمْسِ ____ الْمُعَلِّمُونَ إِلَى الْمَدْرَسَةِ (Gestern gingen die Lehrer zur Schule.)", "options": ["ذَهَبُوا", "ذَهَبَتْ", "ذَهَبْنَا", "ذَهَبَ"], "answer": 3, "why": "Steht das Verb vor dem Subjekt, bleibt es im Singular: dhahaba l-muʿallimūna."},
      {"q": "Welche Endung steht für „sie (Plural) schrieben“?", "options": ["-ū (katabū)", "-at (katabat)", "-nā (katabnā)", "-tum (katabtum)"], "answer": 0, "why": "katabū – das Alif am Ende von كَتَبُوا wird nur geschrieben, nicht gesprochen."},
      {"q": "Wie heißt „ich war“ (كَانَ = er war)?", "options": ["كَانْتُ", "كُنْتُ", "كَانَتْ"], "answer": 1, "why": "Das lange ā wird vor -tu gekürzt: kāna → kuntu. kānat heißt „sie war“."},
    ],
    pages: [
      { heading: 'Das Perfekt: Endungen hinten', html: `
        <p>Verben stehen im Wörterbuch in der Form „er tat“: <span lang="ar">كَتَبَ</span> <i>kataba</i> – er schrieb (= schreiben). Für die anderen Personen tauscht man nur die <b>Endung</b>:</p>
        <table class="gr-table">
          <tr><th>Person</th><th>Form</th><th>Bedeutung</th></tr>
          <tr><td><span lang="ar">أَنَا</span></td><td><span lang="ar">كَتَبْتُ</span> <i>katabtu</i></td><td>ich schrieb</td></tr>
          <tr><td><span lang="ar">أَنْتَ</span> / <span lang="ar">أَنْتِ</span></td><td><span lang="ar">كَتَبْتَ</span> <i>katabta</i> / <span lang="ar">كَتَبْتِ</span> <i>katabti</i></td><td>du schriebst</td></tr>
          <tr><td><span lang="ar">هُوَ</span></td><td><span lang="ar">كَتَبَ</span> <i>kataba</i></td><td>er schrieb</td></tr>
          <tr><td><span lang="ar">هِيَ</span></td><td><span lang="ar">كَتَبَتْ</span> <i>katabat</i></td><td>sie schrieb</td></tr>
          <tr><td><span lang="ar">نَحْنُ</span></td><td><span lang="ar">كَتَبْنَا</span> <i>katabnā</i></td><td>wir schrieben</td></tr>
          <tr><td><span lang="ar">أَنْتُمْ</span></td><td><span lang="ar">كَتَبْتُمْ</span> <i>katabtum</i></td><td>ihr schriebt</td></tr>
          <tr><td><span lang="ar">هُمْ</span></td><td><span lang="ar">كَتَبُوا</span> <i>katabū</i></td><td>sie schrieben</td></tr>
        </table>
        <div class="grammar-tip">💡 Das Alif am Ende von <span lang="ar">كَتَبُوا</span> wird nur geschrieben, nicht gesprochen.</div>` },
      { heading: 'Verb zuerst – und kleine Abweichungen', html: `
        <p>Im erzählenden Satz steht das Verb meist <b>vorn</b>. Folgt ein Subjekt im Plural, bleibt das Verb im <b>Singular</b> – nur das Geschlecht passt sich an:</p>
        <ul>
          <li><span lang="ar">ذَهَبَ الطُّلَّابُ إِلَى الْمَدْرَسَةِ</span> <i>dhahaba ṭ-ṭullābu ilā l-madrasati</i> – Die Studenten gingen zur Schule.</li>
          <li><span lang="ar">ذَهَبَتِ الْبِنْتُ إِلَى السُّوقِ</span> <i>dhahabati l-bintu ilā s-sūqi</i> – Das Mädchen ging zum Markt.</li>
          <li>aber Subjekt zuerst: <span lang="ar">الطُّلَّابُ ذَهَبُوا</span> <i>aṭ-ṭullābu dhahabū</i> – Die Studenten gingen.</li>
        </ul>
        <p>Der Vokal im Stamm wechselt von Verb zu Verb (<span lang="ar">شَرِبَ</span> <i>shariba</i> – er trank), die Endungen bleiben gleich: <span lang="ar">شَرِبْتُ</span> <i>sharibtu</i>.</p>
        <div class="grammar-tip">💡 Verben mit langem ā in der Mitte kürzen es vor Endungen wie <i>-tu</i>: <span lang="ar">قَالَ</span> <i>qāla</i> → <span lang="ar">قُلْتُ</span> <i>qultu</i> (ich sagte), <span lang="ar">كَانَ</span> <i>kāna</i> → <span lang="ar">كُنْتُ</span> <i>kuntu</i> (ich war).</div>` },
    ],
  },
  {
    id: 'present', title: 'Die Gegenwart (Imperfekt)', icon: 'fa-hourglass-half', beforeLesson: 42,
    drills: [
      {"q": "Wie heißt „ich schreibe“?", "options": ["يَكْتُبُ", "نَكْتُبُ", "أَكْتُبُ", "كَتَبْتُ"], "answer": 2, "why": "Die Vorsilbe ʾa- steht für „ich“: aktubu."},
      {"q": "Was kann تَكْتُبُ bedeuten?", "options": ["ich schreibe", "wir schreiben", "er schrieb", "du schreibst (m.) oder sie schreibt"], "answer": 3, "why": "ta- steht für „du“ (m.) und für „sie“ (Singular) – der Zusammenhang entscheidet."},
      {"q": "نَحْنُ ____ الشَّايَ كُلَّ يَوْمٍ (Wir trinken jeden Tag Tee.)", "options": ["يَشْرَبُ", "نَشْرَبُ", "أَشْرَبُ", "تَشْرَبُونَ"], "answer": 1, "why": "na- steht für „wir“: nashrabu."},
      {"q": "Wie heißt „sie (Plural) schreiben“?", "options": ["يَكْتُبُونَ", "تَكْتُبُونَ", "كَتَبُوا", "نَكْتُبُ"], "answer": 0, "why": "ya- + Stamm + -ūna: yaktubūna. taktubūna hieße „ihr schreibt“, katabū „sie schrieben“."},
      {"q": "Welche Vorsilbe zeigt „wir“ an?", "options": ["ya-", "ta-", "ʾa-", "na-"], "answer": 3, "why": "na- wie in naḥnu (wir): naktubu."},
      {"q": "هِيَ ____ فِي الْمَطْبَخِ (Sie arbeitet in der Küche.)", "options": ["يَعْمَلُ", "تَعْمَلُ", "أَعْمَلُ", "تَعْمَلِينَ"], "answer": 1, "why": "Für „sie“ (Singular) steht ta-: taʿmalu. taʿmalīna hieße „du (w.) arbeitest“."},
    ],
    pages: [
      { heading: 'Das Imperfekt: Vorsilben vorn', html: `
        <p>Für Gegenwart und Gewohnheit nutzt Arabisch das <b>Imperfekt</b>: Vor den Stamm kommt eine <b>Vorsilbe</b>, manchmal zusätzlich eine Endung. Der Stamm von <span lang="ar">كَتَبَ</span> lautet <i>-ktub-</i>:</p>
        <table class="gr-table">
          <tr><th>Person</th><th>Form</th><th>Bedeutung</th></tr>
          <tr><td><span lang="ar">أَنَا</span></td><td><span lang="ar">أَكْتُبُ</span> <i>aktubu</i></td><td>ich schreibe</td></tr>
          <tr><td><span lang="ar">أَنْتَ</span></td><td><span lang="ar">تَكْتُبُ</span> <i>taktubu</i></td><td>du schreibst (m.)</td></tr>
          <tr><td><span lang="ar">أَنْتِ</span></td><td><span lang="ar">تَكْتُبِينَ</span> <i>taktubīna</i></td><td>du schreibst (w.)</td></tr>
          <tr><td><span lang="ar">هُوَ</span></td><td><span lang="ar">يَكْتُبُ</span> <i>yaktubu</i></td><td>er schreibt</td></tr>
          <tr><td><span lang="ar">هِيَ</span></td><td><span lang="ar">تَكْتُبُ</span> <i>taktubu</i></td><td>sie schreibt</td></tr>
          <tr><td><span lang="ar">نَحْنُ</span></td><td><span lang="ar">نَكْتُبُ</span> <i>naktubu</i></td><td>wir schreiben</td></tr>
          <tr><td><span lang="ar">أَنْتُمْ</span></td><td><span lang="ar">تَكْتُبُونَ</span> <i>taktubūna</i></td><td>ihr schreibt</td></tr>
          <tr><td><span lang="ar">هُمْ</span></td><td><span lang="ar">يَكْتُبُونَ</span> <i>yaktubūna</i></td><td>sie schreiben</td></tr>
        </table>
        <div class="grammar-tip">💡 Die vier Vorsilben <i>ʾa-, na-, ya-, ta-</i> merken sich Araber mit dem Kunstwort <span lang="ar">أَنَيْتُ</span> <i>anaytu</i>.</div>` },
      { heading: 'Der Stammvokal & die Bedeutung', html: `
        <p>Der Vokal im Stamm ist nicht vorhersagbar – lerne jedes Verb als <b>Paar</b> aus Perfekt und Imperfekt:</p>
        <table class="gr-table">
          <tr><th>Perfekt</th><th>Imperfekt</th><th>Bedeutung</th></tr>
          <tr><td><span lang="ar">كَتَبَ</span> <i>kataba</i></td><td><span lang="ar">يَكْتُبُ</span> <i>yaktubu</i></td><td>schreiben (u)</td></tr>
          <tr><td><span lang="ar">فَتَحَ</span> <i>fataḥa</i></td><td><span lang="ar">يَفْتَحُ</span> <i>yaftaḥu</i></td><td>öffnen (a)</td></tr>
          <tr><td><span lang="ar">جَلَسَ</span> <i>jalasa</i></td><td><span lang="ar">يَجْلِسُ</span> <i>yajlisu</i></td><td>sitzen (i)</td></tr>
          <tr><td><span lang="ar">شَرِبَ</span> <i>shariba</i></td><td><span lang="ar">يَشْرَبُ</span> <i>yashrabu</i></td><td>trinken (a)</td></tr>
        </table>
        <p>Das Imperfekt deckt „es regnet“, „es regnet gerade“ und „es regnet oft“ ab: <span lang="ar">يَنْزِلُ الْمَطَرُ الْيَوْمَ</span> <i>yanzilu l-maṭaru l-yawma</i> – Heute regnet es (wörtl. „fällt der Regen“).</p>
        <div class="grammar-tip">💡 <span lang="ar">تَكْتُبُ</span> heißt sowohl „du schreibst“ (m.) als auch „sie schreibt“ – der Zusammenhang entscheidet.</div>` },
    ],
  },
  {
    id: 'negation', title: 'Verneinung: lā, mā, lam, lan, laysa', icon: 'fa-ban', beforeLesson: 48,
    drills: [
      {"q": "Wie sagt man „Ich weiß nicht.“?", "options": ["لَمْ أَعْرِفُ", "لَا أَعْرِفُ", "لَنْ أَعْرِفُ", "لَيْسَ أَعْرِفُ"], "answer": 1, "why": "Die Gegenwart verneint man mit lā + Imperfekt: lā aʿrifu."},
      {"q": "Was bedeutet لَنْ أَذْهَبَ?", "options": ["Ich gehe nicht.", "Ich ging nicht.", "Ich werde nicht gehen.", "Geh nicht!"], "answer": 2, "why": "lan verneint die Zukunft; das Verb endet danach auf -a (Subjunktiv)."},
      {"q": "هُوَ ____ يَذْهَبْ إِلَى الْعَمَلِ أَمْسِ (Er ging gestern nicht zur Arbeit.)", "options": ["لَمْ", "لَا", "لَنْ", "لَيْسَ"], "answer": 0, "why": "Vergangenheit + Kurzform (yadhhab mit Sukūn) → lam."},
      {"q": "Wie sagt man „Ich bin kein Student.“?", "options": ["لَا أَنَا طَالِبٌ", "لَمْ أَنَا طَالِبٌ", "لَنْ طَالِبٌ", "لَسْتُ طَالِبًا"], "answer": 3, "why": "Den Nominalsatz verneint laysa – gebeugt (lastu) und mit Akkusativ: ṭāliban."},
      {"q": "Was wird aus يَكْتُبُونَ nach لَمْ?", "options": ["لَمْ يَكْتُبُونَ", "لَمْ يَكْتُبُوا", "لَمْ كَتَبُوا"], "answer": 1, "why": "In der Kurzform (Jussiv) fällt -na weg: lam yaktubū – sie haben nicht geschrieben."},
    ],
    pages: [
      { heading: 'Für jede Zeit ein eigenes „nicht“', html: `
        <p>Arabisch hat mehrere Wörter für „nicht“ – welches passt, hängt von Zeit und Satzart ab:</p>
        <table class="gr-table">
          <tr><th>Wort</th><th>wofür</th><th>Beispiel</th></tr>
          <tr><td><span lang="ar">لَا</span> <i>lā</i></td><td>Gegenwart</td><td><span lang="ar">لَا أَعْرِفُ</span> <i>lā aʿrifu</i> – Ich weiß nicht.</td></tr>
          <tr><td><span lang="ar">مَا</span> <i>mā</i></td><td>Vergangenheit + Perfekt</td><td><span lang="ar">مَا ذَهَبْتُ</span> <i>mā dhahabtu</i> – Ich ging nicht.</td></tr>
          <tr><td><span lang="ar">لَمْ</span> <i>lam</i></td><td>Vergangenheit + Kurzform</td><td><span lang="ar">لَمْ أَذْهَبْ</span> <i>lam adhhab</i> – Ich bin nicht gegangen.</td></tr>
          <tr><td><span lang="ar">لَنْ</span> <i>lan</i></td><td>Zukunft</td><td><span lang="ar">لَنْ أَذْهَبَ</span> <i>lan adhhaba</i> – Ich werde nicht gehen.</td></tr>
          <tr><td><span lang="ar">لَيْسَ</span> <i>laysa</i></td><td>„ist nicht“</td><td><span lang="ar">لَيْسَ الْبَيْتُ كَبِيرًا</span> <i>laysa l-baytu kabīran</i> – Das Haus ist nicht groß.</td></tr>
        </table>
        <div class="grammar-tip">💡 Eselsbrücke: <i>la<b>m</b></i> – m wie „da<b>m</b>als“, <i>la<b>n</b></i> – n wie „<b>n</b>ie wieder“. In Zeitungstexten ist <i>lam</i> die übliche Verneinung der Vergangenheit.</div>` },
      { heading: 'lam, lan & laysa genauer', html: `
        <p>Nach <b>lam</b> und <b>lan</b> steht das Imperfekt in leicht veränderter Form:</p>
        <table class="gr-table">
          <tr><th>normal</th><th>nach <i>lam</i> (Jussiv)</th><th>nach <i>lan</i> (Subjunktiv)</th></tr>
          <tr><td><span lang="ar">يَذْهَبُ</span> <i>yadhhabu</i></td><td><span lang="ar">لَمْ يَذْهَبْ</span> <i>lam yadhhab</i></td><td><span lang="ar">لَنْ يَذْهَبَ</span> <i>lan yadhhaba</i></td></tr>
          <tr><td><span lang="ar">يَكْتُبُونَ</span> <i>yaktubūna</i></td><td><span lang="ar">لَمْ يَكْتُبُوا</span> <i>lam yaktubū</i></td><td><span lang="ar">لَنْ يَكْتُبُوا</span> <i>lan yaktubū</i></td></tr>
        </table>
        <p><b>laysa</b> wird wie ein Perfekt gebeugt, die Aussage steht im Akkusativ (<i>-an</i>): <span lang="ar">لَسْتُ</span> <i>lastu</i> – ich bin nicht, <span lang="ar">لَسْتَ</span> <i>lasta</i> – du bist nicht, <span lang="ar">لَيْسَتْ</span> <i>laysat</i> – sie ist nicht, <span lang="ar">لَسْنَا</span> <i>lasnā</i> – wir sind nicht. <span lang="ar">لَسْتُ طَالِبًا</span> <i>lastu ṭāliban</i> – Ich bin kein Student.</p>` },
    ],
  },
  {
    id: 'questions', title: 'Fragen & Fragewörter', icon: 'fa-circle-question', beforeLesson: 54,
    drills: [
      {"q": "Wie fragt man „Wo wohnst du?“", "options": ["أَيْنَ تَسْكُنُ؟", "مَتَى تَسْكُنُ؟", "مَنْ تَسْكُنُ؟", "كَيْفَ تَسْكُنُ؟"], "answer": 0, "why": "ayna = wo."},
      {"q": "Was bedeutet مَتَى?", "options": ["wo", "wer", "wann", "wie"], "answer": 2, "why": "matā = wann: matā yaṣilu l-qiṭāru? – Wann kommt der Zug an?"},
      {"q": "Welches Wort fragt „was“ vor einem Verb?", "options": ["مَنْ", "مَاذَا", "مَا", "كَمْ"], "answer": 1, "why": "mādhā vor Verben (mādhā tashrabu?), mā vor Nomen und Pronomen (mā hādhā?)."},
      {"q": "Wie wird aus أَنْتَ مُعَلِّمٌ eine Ja/Nein-Frage?", "options": ["مَاذَا أَنْتَ مُعَلِّمٌ؟", "كَمْ أَنْتَ مُعَلِّمٌ؟", "أَنْتَ مُعَلِّمٌ هَلْ؟", "هَلْ أَنْتَ مُعَلِّمٌ؟"], "answer": 3, "why": "hal kommt an den Satzanfang, die Wortstellung bleibt gleich."},
      {"q": "كَمْ ____ عِنْدَكَ؟ (Wie viele Bücher hast du?)", "options": ["كُتُبٌ", "الْكُتُبُ", "كِتَابًا", "كِتَابٌ"], "answer": 2, "why": "Nach kam steht der Singular im Akkusativ: kam kitāban?"},
      {"q": "Was heißt كَيْفَ حَالُكَ؟", "options": ["Wie geht es dir?", "Wo bist du?", "Wer bist du?", "Wie alt bist du?"], "answer": 0, "why": "kayfa = wie, ḥāl = Zustand: „Wie ist dein Zustand?“"},
    ],
    pages: [
      { heading: 'Ja/Nein-Fragen mit hal', html: `
        <p>Eine Ja/Nein-Frage entsteht, indem man <span lang="ar">هَلْ</span> <i>hal</i> vor einen Aussagesatz setzt – die Wortstellung bleibt gleich:</p>
        <ul>
          <li><span lang="ar">أَنْتَ طَالِبٌ</span> <i>anta ṭālibun</i> – Du bist Student. → <span lang="ar">هَلْ أَنْتَ طَالِبٌ؟</span> <i>hal anta ṭālibun?</i> – Bist du Student?</li>
          <li><span lang="ar">هَلْ تَتَكَلَّمُ الْعَرَبِيَّةَ؟</span> <i>hal tatakallamu l-ʿarabiyyata?</i> – Sprichst du Arabisch?</li>
        </ul>
        <p>Antworten: <span lang="ar">نَعَمْ</span> <i>naʿam</i> – ja, <span lang="ar">لَا</span> <i>lā</i> – nein. Das arabische Fragezeichen ist gespiegelt: <span lang="ar">؟</span></p>
        <div class="grammar-tip">💡 Gehobener ist die Vorsilbe <span lang="ar">أَ</span> <i>a-</i>: <span lang="ar">أَهٰذَا بَيْتُكَ؟</span> <i>a-hādhā baytuka?</i> – Ist das dein Haus?</div>` },
      { heading: 'Die Fragewörter', html: `
        <table class="gr-table">
          <tr><th>Fragewort</th><th>Beispiel</th></tr>
          <tr><td><span lang="ar">مَا</span> <i>mā</i> – was (ohne Verb)</td><td><span lang="ar">مَا هٰذَا؟</span> <i>mā hādhā?</i> – Was ist das?</td></tr>
          <tr><td><span lang="ar">مَاذَا</span> <i>mādhā</i> – was (mit Verb)</td><td><span lang="ar">مَاذَا تَشْرَبُ؟</span> <i>mādhā tashrabu?</i> – Was trinkst du?</td></tr>
          <tr><td><span lang="ar">مَنْ</span> <i>man</i> – wer</td><td><span lang="ar">مَنْ هٰذَا؟</span> <i>man hādhā?</i> – Wer ist das?</td></tr>
          <tr><td><span lang="ar">أَيْنَ</span> <i>ayna</i> – wo</td><td><span lang="ar">أَيْنَ الْمَحَطَّةُ؟</span> <i>ayna l-maḥaṭṭatu?</i> – Wo ist der Bahnhof?</td></tr>
          <tr><td><span lang="ar">مَتَى</span> <i>matā</i> – wann</td><td><span lang="ar">مَتَى يَصِلُ الْقِطَارُ؟</span> <i>matā yaṣilu l-qiṭāru?</i> – Wann kommt der Zug an?</td></tr>
          <tr><td><span lang="ar">كَيْفَ</span> <i>kayfa</i> – wie</td><td><span lang="ar">كَيْفَ حَالُكَ؟</span> <i>kayfa ḥāluka?</i> – Wie geht es dir?</td></tr>
          <tr><td><span lang="ar">كَمْ</span> <i>kam</i> – wie viel(e)</td><td><span lang="ar">كَمْ تَذْكِرَةً؟</span> <i>kam tadhkiratan?</i> – Wie viele Fahrkarten?</td></tr>
          <tr><td><span lang="ar">لِمَاذَا</span> <i>limādhā</i> – warum</td><td><span lang="ar">لِمَاذَا تَدْرُسُ الْعَرَبِيَّةَ؟</span> <i>limādhā tadrusu l-ʿarabiyyata?</i> – Warum lernst du Arabisch?</td></tr>
        </table>
        <div class="grammar-tip">💡 Nach <span lang="ar">كَمْ</span> steht das Nomen im <b>Singular</b> und Akkusativ (<i>-an</i>). Den Preis erfragt man mit <span lang="ar">بِكَمْ هٰذَا؟</span> <i>bikam hādhā?</i> – Wie viel kostet das?</div>` },
    ],
  },
  {
    id: 'numbers', title: 'Zahlen & Zählen', icon: 'fa-hashtag', beforeLesson: 60,
    drills: [
      {"q": "Wie sagt man „drei Bücher“?", "options": ["ثَلَاثُ كُتُبٍ", "ثَلَاثَةُ كُتُبٍ", "ثَلَاثَةُ كِتَابٍ", "ثَلَاثَةُ كِتَابًا"], "answer": 1, "why": "kitāb ist männlich → Zahl mit ة (Polarität); danach Plural im Genitiv: thalāthatu kutubin."},
      {"q": "Wie sagt man „drei Autos“ (سَيَّارَة ist weiblich)?", "options": ["ثَلَاثَةُ سَيَّارَاتٍ", "ثَلَاثُ سَيَّارَةٍ", "ثَلَاثُ سَيَّارَاتٍ", "ثَلَاثَةُ سَيَّارَةً"], "answer": 2, "why": "Weibliches Nomen → Zahl ohne ة: thalāthu sayyārātin."},
      {"q": "Warum hat خَمْسَةُ رِجَالٍ (fünf Männer) ein ة?", "options": ["weil Zahlen immer auf ة enden", "weil der Plural weiblich ist", "weil fünf eine Ausnahme ist", "weil رَجُل männlich ist (Polarität)"], "answer": 3, "why": "Bei 3–10 nimmt die Zahl das Gegengeschlecht des Singulars an: rajul (m.) → khamsa mit ة."},
      {"q": "„zwanzig Studenten“ – welche Form folgt auf عِشْرُونَ?", "options": ["طُلَّابٍ", "طَالِبًا", "طَالِبٍ", "الطُّلَّابُ"], "answer": 1, "why": "Nach 11–99 steht der Singular im Akkusativ: ʿishrūna ṭāliban."},
      {"q": "Welche Zahl ist ٥?", "options": ["0", "6", "5", "7"], "answer": 2, "why": "٥ ist die Fünf – nicht mit der Null verwechseln, die als Punkt geschrieben wird: ٠."},
      {"q": "Welches Geschlecht nimmt eine Zahl von 3 bis 10 an?", "options": ["das Gegenteil des Nomens im Singular", "immer männlich", "dasselbe wie das Nomen", "immer weiblich"], "answer": 0, "why": "Das ist die Polarität: männliches Nomen → Zahl mit ة, weibliches Nomen → Zahl ohne ة."},
    ],
    pages: [
      { heading: 'Die Zahlen 1–10', html: `
        <table class="gr-table">
          <tr><th>Ziffer</th><th>Zahl</th><th>Ziffer</th><th>Zahl</th></tr>
          <tr><td><span lang="ar">١</span> 1</td><td><span lang="ar">وَاحِد</span> <i>wāḥid</i></td><td><span lang="ar">٦</span> 6</td><td><span lang="ar">سِتَّة</span> <i>sitta</i></td></tr>
          <tr><td><span lang="ar">٢</span> 2</td><td><span lang="ar">اِثْنَان</span> <i>ithnān</i></td><td><span lang="ar">٧</span> 7</td><td><span lang="ar">سَبْعَة</span> <i>sabʿa</i></td></tr>
          <tr><td><span lang="ar">٣</span> 3</td><td><span lang="ar">ثَلَاثَة</span> <i>thalātha</i></td><td><span lang="ar">٨</span> 8</td><td><span lang="ar">ثَمَانِيَة</span> <i>thamāniya</i></td></tr>
          <tr><td><span lang="ar">٤</span> 4</td><td><span lang="ar">أَرْبَعَة</span> <i>arbaʿa</i></td><td><span lang="ar">٩</span> 9</td><td><span lang="ar">تِسْعَة</span> <i>tisʿa</i></td></tr>
          <tr><td><span lang="ar">٥</span> 5</td><td><span lang="ar">خَمْسَة</span> <i>khamsa</i></td><td><span lang="ar">١٠</span> 10</td><td><span lang="ar">عَشَرَة</span> <i>ʿashara</i></td></tr>
        </table>
        <p>Die Null heißt <span lang="ar">صِفْر</span> <i>ṣifr</i> (<span lang="ar">٠</span>) – daher stammt unser Wort „Ziffer“. Mehrstellige Zahlen schreibt man auch im Arabischen <b>von links nach rechts</b>: <span lang="ar">٢٠٢٦</span> = 2026.</p>
        <div class="grammar-tip">💡 „Ein“ und „zwei“ sagen schon Singular und Dual: <span lang="ar">كِتَابٌ</span> – ein Buch, <span lang="ar">كِتَابَانِ</span> – zwei Bücher. <span lang="ar">وَاحِد</span> steht nur zur Betonung dahinter: <span lang="ar">كِتَابٌ وَاحِدٌ</span> <i>kitābun wāḥidun</i> – ein einziges Buch.</div>` },
      { heading: '3 bis 10: verkehrte Welt', html: `
        <p>Bei <b>3–10</b> gilt die <b>Polarität</b>: Die Zahl nimmt das <b>umgekehrte</b> Geschlecht des Nomens im Singular an – männliches Nomen → Zahl mit <span lang="ar">ة</span>, weibliches Nomen → Zahl ohne. Das Gezählte folgt im <b>Plural, Genitiv</b>:</p>
        <table class="gr-table">
          <tr><th>männliches Nomen</th><th>weibliches Nomen</th></tr>
          <tr><td><span lang="ar">ثَلَاثَةُ كُتُبٍ</span> <i>thalāthatu kutubin</i> – drei Bücher</td><td><span lang="ar">ثَلَاثُ سَيَّارَاتٍ</span> <i>thalāthu sayyārātin</i> – drei Autos</td></tr>
          <tr><td><span lang="ar">خَمْسَةُ رِجَالٍ</span> <i>khamsatu rijālin</i> – fünf Männer</td><td><span lang="ar">خَمْسُ بَنَاتٍ</span> <i>khamsu banātin</i> – fünf Mädchen</td></tr>
        </table>
        <p>Von <b>11 bis 99</b> steht das Nomen im <b>Singular, Akkusativ</b> (<i>-an</i>): <span lang="ar">أَحَدَ عَشَرَ كِتَابًا</span> <i>aḥada ʿashara kitāban</i> – elf Bücher, <span lang="ar">عِشْرُونَ طَالِبًا</span> <i>ʿishrūna ṭāliban</i> – zwanzig Studenten.</p>
        <div class="grammar-tip">💡 Entscheidend ist das Geschlecht des <b>Singulars</b>: <span lang="ar">كِتَاب</span> ist männlich, also <span lang="ar">ثَلَاثَةُ</span> mit <span lang="ar">ة</span>. Ab 100 folgt der Singular im Genitiv: <span lang="ar">مِئَةُ كِتَابٍ</span> <i>miʾatu kitābin</i> – hundert Bücher.</div>` },
    ],
  },
  {
    id: 'future', title: 'Zukunft mit sa-/sawfa & kāna', icon: 'fa-forward', beforeLesson: 68,
    drills: [
      {"q": "Wie heißt „ich werde schreiben“?", "options": ["كَتَبْتُ", "كُنْتُ أَكْتُبُ", "سَأَكْتُبُ", "لَنْ أَكْتُبَ"], "answer": 2, "why": "sa- + Imperfekt = Zukunft: sa-aktubu."},
      {"q": "Wie verneint man die Zukunft?", "options": ["mit لَنْ + Subjunktiv", "mit لَا + sa-", "mit لَمْ + Perfekt", "mit مَا + sawfa"], "answer": 0, "why": "lan aktuba – ich werde nicht schreiben. sa- fällt dabei weg."},
      {"q": "كَانَ الْجَوُّ ____ أَمْسِ (Das Wetter war gestern schön.)", "options": ["جَمِيلٌ", "جَمِيلًا", "الْجَمِيلُ", "جَمِيلَةٌ"], "answer": 1, "why": "Nach kāna steht die Aussage im Akkusativ: jamīlan."},
      {"q": "Wie heißt „ich war“?", "options": ["كَانَ", "كَانَتْ", "كُنَّا", "كُنْتُ"], "answer": 3, "why": "Vor der Endung -tu wird kān- zu kun-: kuntu."},
      {"q": "Was bedeutet كَانَ يَعْمَلُ?", "options": ["er arbeitete (gewöhnlich)", "er wird arbeiten", "er arbeitet nicht", "er hatte keine Arbeit"], "answer": 0, "why": "kāna + Imperfekt = Gewohnheit oder Verlauf in der Vergangenheit."},
      {"q": "سَوْفَ ____ غَدًا (Wir werden morgen verreisen.)", "options": ["سَافَرْنَا", "يُسَافِرُ", "نُسَافِرُ"], "answer": 2, "why": "Nach sawfa folgt das Imperfekt – für „wir“ mit der Vorsilbe nu-: nusāfiru."},
    ],
    pages: [
      { heading: 'Zukunft mit sa- und sawfa', html: `
        <p>Die Zukunft ist einfach: Vor das Imperfekt kommt <span lang="ar">سَ</span> <i>sa-</i> (angehängt) oder <span lang="ar">سَوْفَ</span> <i>sawfa</i> (eigenes Wort, etwas betonter oder ferner):</p>
        <table class="gr-table">
          <tr><th>Gegenwart</th><th>Zukunft</th></tr>
          <tr><td><span lang="ar">أَعْمَلُ</span> <i>aʿmalu</i> – ich arbeite</td><td><span lang="ar">سَأَعْمَلُ</span> <i>sa-aʿmalu</i> – ich werde arbeiten</td></tr>
          <tr><td><span lang="ar">يَكْتُبُ</span> <i>yaktubu</i> – er schreibt</td><td><span lang="ar">سَيَكْتُبُ</span> <i>sa-yaktubu</i> – er wird schreiben</td></tr>
          <tr><td><span lang="ar">نُسَافِرُ</span> <i>nusāfiru</i> – wir reisen</td><td><span lang="ar">سَوْفَ نُسَافِرُ</span> <i>sawfa nusāfiru</i> – wir werden reisen</td></tr>
        </table>
        <p><span lang="ar">سَأَعْمَلُ فِي شَرِكَةٍ كَبِيرَةٍ</span> <i>sa-aʿmalu fī sharikatin kabīratin</i> – Ich werde in einer großen Firma arbeiten.</p>
        <div class="grammar-tip">💡 Verneint wird die Zukunft nicht mit <i>sa-</i>, sondern mit <span lang="ar">لَنْ</span> <i>lan</i>: <span lang="ar">لَنْ أَعْمَلَ</span> <i>lan aʿmala</i> – Ich werde nicht arbeiten.</div>` },
      { heading: 'kāna – „war“', html: `
        <p>Im Präsens fehlt „sein“ – für die Vergangenheit braucht man aber <span lang="ar">كَانَ</span> <i>kāna</i> (er war). Die Aussage steht danach im <b>Akkusativ</b> (<i>-an</i>):</p>
        <ul>
          <li><span lang="ar">كَانَ الْجَوُّ جَمِيلًا</span> <i>kāna l-jawwu jamīlan</i> – Das Wetter war schön.</li>
          <li><span lang="ar">كُنْتُ مَرِيضًا</span> <i>kuntu marīḍan</i> – Ich war krank.</li>
        </ul>
        <p>Formen: <span lang="ar">كُنْتُ</span> <i>kuntu</i> (ich), <span lang="ar">كُنْتَ</span> <i>kunta</i> (du), <span lang="ar">كَانَ</span> <i>kāna</i> (er), <span lang="ar">كَانَتْ</span> <i>kānat</i> (sie), <span lang="ar">كُنَّا</span> <i>kunnā</i> (wir), <span lang="ar">كَانُوا</span> <i>kānū</i> (sie, Pl.). Zukunft: <span lang="ar">سَأَكُونُ فِي الْبَيْتِ</span> <i>sa-akūnu fi l-bayti</i> – Ich werde zu Hause sein.</p>
        <div class="grammar-tip">💡 <i>kāna</i> + Imperfekt beschreibt Gewohnheiten in der Vergangenheit: <span lang="ar">كَانَ يَعْمَلُ فِي مَصْنَعٍ</span> <i>kāna yaʿmalu fī maṣnaʿin</i> – Er arbeitete (früher) in einer Fabrik.</div>` },
    ],
  },
  {
    id: 'cases', title: 'Die drei Fälle (iʿrāb)', icon: 'fa-table-list', beforeLesson: 74,
    drills: [
      {"q": "Welcher Fall steht nach einer Präposition wie فِي?", "options": ["Nominativ", "Genitiv", "Akkusativ"], "answer": 1, "why": "Präpositionen verlangen den Genitiv: fi l-bayti."},
      {"q": "قَرَأَ الطَّالِبُ ____ أَمْسِ (Der Student las gestern das Buch.)", "options": ["الْكِتَابُ", "الْكِتَابِ", "الْكِتَابَ"], "answer": 2, "why": "Das Objekt steht im Akkusativ: al-kitāba."},
      {"q": "أَنَا فِي ____ الْآنَ (Ich bin jetzt im Haus.)", "options": ["الْبَيْتِ", "الْبَيْتُ", "الْبَيْتَ"], "answer": 0, "why": "Nach fī steht der Genitiv: fi l-bayti."},
      {"q": "Wie lautet „ein Buch“ im Akkusativ?", "options": ["كِتَابٌ", "كِتَابٍ", "الْكِتَابَ", "كِتَابًا"], "answer": 3, "why": "Unbestimmter Akkusativ: -an, geschrieben mit zusätzlichem Alif: kitāban."},
      {"q": "Welche Endung hat der männliche gesunde Plural im Akkusativ?", "options": ["-ūna", "-īna", "-āni", "-āti"], "answer": 1, "why": "Genitiv und Akkusativ: -īna (raʾaytu l-muʿallimīna); -ūna ist der Nominativ."},
      {"q": "Welches Wort ist in شَرِبَ الْوَلَدُ الْحَلِيبَ das Subjekt?", "options": ["الْحَلِيبَ", "شَرِبَ", "الْوَلَدُ"], "answer": 2, "why": "Die Endung -u zeigt den Nominativ: al-waladu (der Junge) trank die Milch (al-ḥalība, Akkusativ)."},
    ],
    pages: [
      { heading: 'Drei Fälle, drei Endungen', html: `
        <p>Hocharabisch hat drei Fälle. Man erkennt sie an der <b>Endung</b> (<i>iʿrāb</i>):</p>
        <table class="gr-table">
          <tr><th>Fall</th><th>bestimmt</th><th>unbestimmt</th><th>wann?</th></tr>
          <tr><td>Nominativ</td><td><span lang="ar">الْكِتَابُ</span> <i>-u</i></td><td><span lang="ar">كِتَابٌ</span> <i>-un</i></td><td>Subjekt, Nominalsatz</td></tr>
          <tr><td>Genitiv</td><td><span lang="ar">الْكِتَابِ</span> <i>-i</i></td><td><span lang="ar">كِتَابٍ</span> <i>-in</i></td><td>nach Präpositionen, 2. Glied der Iḍāfa</td></tr>
          <tr><td>Akkusativ</td><td><span lang="ar">الْكِتَابَ</span> <i>-a</i></td><td><span lang="ar">كِتَابًا</span> <i>-an</i></td><td>Objekt, nach <i>kāna</i> und <i>laysa</i>, nach 11–99</td></tr>
        </table>
        <p><span lang="ar">قَرَأَ الطَّالِبُ الْكِتَابَ فِي الْمَكْتَبَةِ</span> <i>qaraʾa ṭ-ṭālibu l-kitāba fi l-maktabati</i> – Der Student (<i>-u</i>) las das Buch (<i>-a</i>) in der Bibliothek (<i>-i</i>).</p>
        <div class="grammar-tip">💡 Das <i>-an</i> schreibt man mit zusätzlichem Alif (<span lang="ar">كِتَابًا</span>), außer nach <span lang="ar">ة</span>: <span lang="ar">مَدْرَسَةً</span> <i>madrasatan</i>. Am Satzende fallen die Endungen im Sprechen weg – erkennen solltest du sie trotzdem.</div>` },
      { heading: 'Dual, Plural & Diptota', html: `
        <p>Dual und gesunde Plurale haben nur <b>zwei</b> Formen – Genitiv und Akkusativ sind gleich:</p>
        <table class="gr-table">
          <tr><th></th><th>Nominativ</th><th>Genitiv / Akkusativ</th></tr>
          <tr><td>Dual</td><td><span lang="ar">طَالِبَانِ</span> <i>ṭālibāni</i></td><td><span lang="ar">طَالِبَيْنِ</span> <i>ṭālibayni</i></td></tr>
          <tr><td>Plural m.</td><td><span lang="ar">مُعَلِّمُونَ</span> <i>muʿallimūna</i></td><td><span lang="ar">مُعَلِّمِينَ</span> <i>muʿallimīna</i></td></tr>
          <tr><td>Plural w.</td><td><span lang="ar">مُعَلِّمَاتٌ</span> <i>muʿallimātun</i></td><td><span lang="ar">مُعَلِّمَاتٍ</span> <i>muʿallimātin</i></td></tr>
        </table>
        <p><span lang="ar">رَأَيْتُ الْمُعَلِّمِينَ</span> <i>raʾaytu l-muʿallimīna</i> – Ich sah die Lehrer.</p>
        <div class="grammar-tip">💡 Manche Wörter sind <b>Diptota</b>: Sie bekommen kein <i>-un</i>, und ihr unbestimmter Genitiv endet auf <i>-a</i>. Dazu gehören viele Namen, Farben und Plurale wie <span lang="ar">مَدَارِس</span> <i>madāris</i> (Schulen): <span lang="ar">فِي مَدَارِسَ كَثِيرَةٍ</span> <i>fī madārisa kathīratin</i> – in vielen Schulen.</div>` },
    ],
  },
  {
    id: 'forms', title: 'Verbstämme II–X: ein Muster, viele Bedeutungen', icon: 'fa-cubes', beforeLesson: 82,
    drills: [
      {"q": "Welche Form verdoppelt den mittleren Wurzelkonsonanten?", "options": ["Form III (fāʿala)", "Form II (faʿʿala)", "Form VII (infaʿala)", "Form X (istafʿala)"], "answer": 1, "why": "Form II verdoppelt den mittleren Konsonanten: ʿallama, darrasa."},
      {"q": "Was bedeutet عَلَّمَ (Form II von „wissen“)?", "options": ["lernen", "sich erkundigen", "lehren", "Wissenschaft"], "answer": 2, "why": "Form II bedeutet oft „bewirken“: wissen machen = lehren."},
      {"q": "Was bedeutet تَعَلَّمَ (Form V)?", "options": ["lernen", "lehren", "wissen", "Lehrer"], "answer": 0, "why": "Form V ist das Reflexiv zu Form II: sich lehren (lassen) = lernen."},
      {"q": "Welche Form drückt oft „um etwas bitten, etwas suchen“ aus?", "options": ["Form II", "Form VI", "Form IV", "Form X (istafʿala)"], "answer": 3, "why": "istaʿlama – „um Wissen bitten“ = sich erkundigen."},
      {"q": "Welche Form ist اِجْتَمَعَ (sich versammeln)?", "options": ["Form VII", "Form VIII", "Form X", "Form V"], "answer": 1, "why": "Muster iftaʿala: Nach dem ersten Wurzelkonsonanten wird ein t eingeschoben: ij-t-amaʿa."},
      {"q": "Was bedeutet تَكَاتَبَ (Form VI von k-t-b)?", "options": ["schreiben lassen", "diktieren", "einander schreiben", "abschreiben"], "answer": 2, "why": "Form VI drückt Gegenseitigkeit aus: einander schreiben, korrespondieren."},
    ],
    pages: [
      { heading: 'Das Muster trägt die Bedeutung', html: `
        <p>Aus einer Wurzel entstehen durch feste Muster bis zu zehn <b>Verbstämme</b> (Form I–X). Jeder verschiebt die Bedeutung auf typische Weise – gut zu sehen an der Wurzel ʿ-l-m „wissen“:</p>
        <table class="gr-table">
          <tr><th>Form</th><th>Muster</th><th>Idee</th><th>Beispiel</th></tr>
          <tr><td>I</td><td><i>faʿala</i></td><td>Grundbedeutung</td><td><span lang="ar">عَلِمَ</span> <i>ʿalima</i> – wissen</td></tr>
          <tr><td>II</td><td><i>faʿʿala</i></td><td>bewirken, verstärken</td><td><span lang="ar">عَلَّمَ</span> <i>ʿallama</i> – lehren</td></tr>
          <tr><td>III</td><td><i>fāʿala</i></td><td>mit/an jemandem tun</td><td><span lang="ar">سَاعَدَ</span> <i>sāʿada</i> – helfen</td></tr>
          <tr><td>IV</td><td><i>afʿala</i></td><td>veranlassen</td><td><span lang="ar">أَدْخَلَ</span> <i>adkhala</i> – hineinbringen (zu <span lang="ar">دَخَلَ</span> <i>dakhala</i> – eintreten)</td></tr>
          <tr><td>V</td><td><i>tafaʿʿala</i></td><td>reflexiv zu II</td><td><span lang="ar">تَعَلَّمَ</span> <i>taʿallama</i> – lernen</td></tr>
        </table>
        <div class="grammar-tip">💡 Die Muster stecken auch in Nomen: Von Form II kommt <span lang="ar">مُعَلِّم</span> <i>muʿallim</i> – Lehrer („der wissen macht“), von Form III <span lang="ar">مُسَاعِد</span> <i>musāʿid</i> – Assistent.</div>` },
      { heading: 'Formen VI bis X', html: `
        <table class="gr-table">
          <tr><th>Form</th><th>Muster</th><th>Idee</th><th>Beispiel</th></tr>
          <tr><td>VI</td><td><i>tafāʿala</i></td><td>gegenseitig</td><td><span lang="ar">تَكَاتَبَ</span> <i>takātaba</i> – einander schreiben</td></tr>
          <tr><td>VII</td><td><i>infaʿala</i></td><td>passiv, „von selbst“</td><td><span lang="ar">اِنْكَسَرَ</span> <i>inkasara</i> – zerbrechen (intr.)</td></tr>
          <tr><td>VIII</td><td><i>iftaʿala</i></td><td>für sich, miteinander</td><td><span lang="ar">اِجْتَمَعَ</span> <i>ijtamaʿa</i> – sich versammeln</td></tr>
          <tr><td>IX</td><td><i>ifʿalla</i></td><td>Farbe annehmen (selten)</td><td><span lang="ar">اِحْمَرَّ</span> <i>iḥmarra</i> – rot werden</td></tr>
          <tr><td>X</td><td><i>istafʿala</i></td><td>erbitten, für etwas halten</td><td><span lang="ar">اِسْتَعْلَمَ</span> <i>istaʿlama</i> – sich erkundigen</td></tr>
        </table>
        <p>Im Imperfekt bleibt das Muster erkennbar: <span lang="ar">يُعَلِّمُ</span> <i>yuʿallimu</i> (II), <span lang="ar">يَتَعَلَّمُ</span> <i>yataʿallamu</i> (V), <span lang="ar">يَسْتَعْمِلُ</span> <i>yastaʿmilu</i> (X, benutzen).</p>
        <div class="grammar-tip">💡 Viele Gefühlsverben stehen in Form VIII oder X: <span lang="ar">اِبْتَسَمَ</span> <i>ibtasama</i> – lächeln, <span lang="ar">اِسْتَمْتَعَ</span> <i>istamtaʿa</i> – genießen. Ein Ortsnomen aus Form X: <span lang="ar">مُسْتَشْفَى</span> <i>mustashfā</i> – Krankenhaus („wo man Heilung sucht“).</div>` },
    ],
  },
  {
    id: 'relative', title: 'Relativsätze: alladhī, allatī', icon: 'fa-arrows-turn-right', beforeLesson: 91,
    drills: [
      {"q": "الْبِنْتُ ____ تَدْرُسُ مَعِي لَطِيفَةٌ (Das Mädchen, das mit mir lernt, ist nett.)", "options": ["الَّذِي", "الَّتِي", "الَّذِينَ", "مَا"], "answer": 1, "why": "bint ist weiblich und Singular → allatī."},
      {"q": "الْمُعَلِّمُونَ ____ يَعْمَلُونَ هُنَا (die Lehrer, die hier arbeiten)", "options": ["الَّذِي", "الَّتِي", "اللَّذَانِ", "الَّذِينَ"], "answer": 3, "why": "Männliche Personen im Plural → alladhīna."},
      {"q": "Wann fällt das Relativpronomen weg?", "options": ["nach einem unbestimmten Nomen", "nach einem bestimmten Nomen", "im Plural", "nie"], "answer": 0, "why": "ʿindī ṣadīqun yaskunu hunā – „Ich habe einen Freund, der hier wohnt“ – ganz ohne alladhī."},
      {"q": "الْكُتُبُ ____ قَرَأْتُهَا مُفِيدَةٌ (Die Bücher, die ich gelesen habe, sind nützlich.)", "options": ["الَّذِينَ", "الَّتِي", "الَّذِي", "اللَّاتِي"], "answer": 1, "why": "Sachplural → weiblicher Singular → allatī; -hā weist auf die Bücher zurück."},
      {"q": "Was bedeutet الْبَيْتُ الَّذِي أَسْكُنُ فِيهِ?", "options": ["Ich wohne im Haus.", "das Haus, das mir gehört", "das Haus, in dem ich wohne", "Wo wohnst du?"], "answer": 2, "why": "fīhi („darin“) verweist auf das Haus zurück – wörtlich „das ich darin wohne“."},
      {"q": "Wie sagt man „ein Freund, der hier wohnt“?", "options": ["صَدِيقٌ يَسْكُنُ هُنَا", "صَدِيقٌ الَّذِي يَسْكُنُ هُنَا", "الصَّدِيقُ يَسْكُنُ هُنَا"], "answer": 0, "why": "Unbestimmtes Bezugswort → kein Relativpronomen. aṣ-ṣadīqu yaskunu hunā hieße „Der Freund wohnt hier.“"},
    ],
    pages: [
      { heading: 'alladhī & allatī', html: `
        <p>Nach einem <b>bestimmten</b> Nomen leitet ein Relativpronomen den Nebensatz ein. Es richtet sich nach Geschlecht und Zahl des Bezugsworts:</p>
        <table class="gr-table">
          <tr><th></th><th>Singular</th><th>Dual</th><th>Plural</th></tr>
          <tr><td>m.</td><td><span lang="ar">الَّذِي</span> <i>alladhī</i></td><td><span lang="ar">اللَّذَانِ</span> <i>alladhāni</i></td><td><span lang="ar">الَّذِينَ</span> <i>alladhīna</i></td></tr>
          <tr><td>w.</td><td><span lang="ar">الَّتِي</span> <i>allatī</i></td><td><span lang="ar">اللَّتَانِ</span> <i>allatāni</i></td><td><span lang="ar">اللَّاتِي</span> <i>allātī</i></td></tr>
        </table>
        <ul>
          <li><span lang="ar">الرَّجُلُ الَّذِي يَسْكُنُ هُنَا</span> <i>ar-rajulu lladhī yaskunu hunā</i> – der Mann, der hier wohnt</li>
          <li><span lang="ar">الْمَرْأَةُ الَّتِي تَعْمَلُ مَعِي</span> <i>al-marʾatu llatī taʿmalu maʿī</i> – die Frau, die mit mir arbeitet</li>
        </ul>
        <div class="grammar-tip">💡 Sachplurale gelten als weiblicher Singular – also <span lang="ar">الَّتِي</span>: <span lang="ar">الْكُتُبُ الَّتِي اشْتَرَيْتُهَا</span> <i>al-kutubu llatī shtaraytuhā</i> – die Bücher, die ich gekauft habe.</div>` },
      { heading: 'Rückverweis & unbestimmte Nomen', html: `
        <p>Ist das Bezugswort im Nebensatz <b>Objekt</b> oder steht es nach einer Präposition, greift ein angehängtes Pronomen es wieder auf:</p>
        <ul>
          <li><span lang="ar">الْكِتَابُ الَّذِي قَرَأْتُهُ</span> <i>al-kitābu lladhī qaraʾtuhu</i> – das Buch, das ich gelesen habe (wörtl. „das ich es las“)</li>
          <li><span lang="ar">الْبَيْتُ الَّذِي أَسْكُنُ فِيهِ</span> <i>al-baytu lladhī askunu fīhi</i> – das Haus, in dem ich wohne (wörtl. „das ich darin wohne“)</li>
        </ul>
        <p>Nach einem <b>unbestimmten</b> Nomen fällt das Relativpronomen ganz weg: <span lang="ar">عِنْدِي صَدِيقٌ يَسْكُنُ فِي الْقَاهِرَةِ</span> <i>ʿindī ṣadīqun yaskunu fi l-qāhirati</i> – Ich habe einen Freund, der in Kairo wohnt.</p>
        <div class="grammar-tip">💡 Ohne Bezugswort sagt man <span lang="ar">مَا</span> <i>mā</i> „was“ bzw. <span lang="ar">مَنْ</span> <i>man</i> „wer“: <span lang="ar">أَفْهَمُ مَا تَقُولُ</span> <i>afhamu mā taqūlu</i> – Ich verstehe, was du sagst.</div>` },
    ],
  },
  {
    id: 'comparison', title: 'Steigern: der Elativ', icon: 'fa-ranking-star', beforeLesson: 101,
    drills: [
      {"q": "Wie heißt „größer“?", "options": ["كَبِيرٌ", "كِبَارٌ", "أَكْبَرُ", "كُبْرَى"], "answer": 2, "why": "Elativ-Muster afʿal: k-b-r → akbar."},
      {"q": "أَخِي أَطْوَلُ ____ أُخْتِي (Mein Bruder ist größer als meine Schwester.)", "options": ["مِنْ", "مَعَ", "فِي", "عَلَى"], "answer": 0, "why": "„als“ heißt beim Vergleich min."},
      {"q": "Was ist der Elativ von صَغِير (klein)?", "options": ["صِغَارٌ", "أَصْغَرُ", "مُصَغَّرٌ"], "answer": 1, "why": "ṣ-gh-r im Muster afʿal: aṣghar – kleiner, der kleinste."},
      {"q": "Wie sagt man „die schönste Stadt“?", "options": ["مَدِينَةٌ جَمِيلَةٌ", "الْمَدِينَةُ أَجْمَلُ", "جَمِيلَةُ الْمَدِينَةِ", "أَجْمَلُ مَدِينَةٍ"], "answer": 3, "why": "Superlativ = Elativ + unbestimmtes Nomen im Genitiv: ajmalu madīnatin."},
      {"q": "„Sie ist älter als ich.“ – welche Form stimmt?", "options": ["هِيَ أَكْبَرُ مِنِّي", "هِيَ كَبِيرَةٌ مِنِّي", "هِيَ أَكْبَرَةٌ مِنِّي"], "answer": 0, "why": "Im Vergleich mit min bleibt der Elativ unverändert – auch bei Frauen."},
      {"q": "Was bedeutet أَكْثَرُ?", "options": ["weniger", "mehr", "viel", "am wenigsten"], "answer": 1, "why": "akthar ist der Elativ von kathīr (viel) – „mehr“ und zugleich Hilfswort für Umschreibungen."},
    ],
    pages: [
      { heading: 'Ein Muster für „größer“: afʿal', html: `
        <p>Komparativ und Superlativ bildet Arabisch mit <b>einem</b> Muster, dem <b>Elativ</b> <i>afʿal</i>: Die drei Wurzelkonsonanten kommen in die Form <i>a-1-2-a-3</i>, z. B. k-b-r → <i>akbar</i>.</p>
        <table class="gr-table">
          <tr><th>Adjektiv</th><th>Elativ</th></tr>
          <tr><td><span lang="ar">كَبِير</span> <i>kabīr</i> – groß, alt</td><td><span lang="ar">أَكْبَر</span> <i>akbar</i> – größer, älter</td></tr>
          <tr><td><span lang="ar">صَغِير</span> <i>ṣaghīr</i> – klein</td><td><span lang="ar">أَصْغَر</span> <i>aṣghar</i> – kleiner</td></tr>
          <tr><td><span lang="ar">جَمِيل</span> <i>jamīl</i> – schön</td><td><span lang="ar">أَجْمَل</span> <i>ajmal</i> – schöner</td></tr>
          <tr><td><span lang="ar">كَثِير</span> <i>kathīr</i> – viel</td><td><span lang="ar">أَكْثَر</span> <i>akthar</i> – mehr</td></tr>
          <tr><td><span lang="ar">قَلِيل</span> <i>qalīl</i> – wenig</td><td><span lang="ar">أَقَلّ</span> <i>aqall</i> – weniger</td></tr>
        </table>
        <p>„als“ heißt <span lang="ar">مِنْ</span> <i>min</i>: <span lang="ar">أَخِي أَكْبَرُ مِنِّي</span> <i>akhī akbaru minnī</i> – Mein Bruder ist älter als ich. Der Elativ bleibt dabei <b>unverändert</b>, auch bei Frauen: <span lang="ar">هِيَ أَكْبَرُ مِنِّي</span> <i>hiya akbaru minnī</i>.</p>` },
      { heading: 'Der Superlativ', html: `
        <p>Für „der/die/das …ste“ steht der Elativ <b>vor</b> einem Nomen im Genitiv – wie in einer Iḍāfa:</p>
        <ul>
          <li><span lang="ar">أَكْبَرُ مَدِينَةٍ</span> <i>akbaru madīnatin</i> – die größte Stadt</li>
          <li><span lang="ar">أَجْمَلُ يَوْمٍ</span> <i>ajmalu yawmin</i> – der schönste Tag</li>
          <li><span lang="ar">أَكْبَرُ الْمُدُنِ</span> <i>akbaru l-muduni</i> – die größte der Städte</li>
        </ul>
        <p>Adjektive, die nicht ins Muster passen (abgeleitete Stämme, Farben), umschreibt man mit <span lang="ar">أَكْثَرُ</span> <i>aktharu</i> „mehr“ + Nomen im Akkusativ: <span lang="ar">أَكْثَرُ ازْدِحَامًا</span> <i>aktharu zdiḥāman</i> – voller (zu <span lang="ar">مُزْدَحِم</span> <i>muzdaḥim</i> – überfüllt).</p>
        <div class="grammar-tip">💡 Im Alltag ständig zu hören: <span lang="ar">أَفْضَلُ</span> <i>afḍalu</i> – besser, der beste. Auch der Nahe Osten steckt voller Elativ: <span lang="ar">الشَّرْقُ الْأَوْسَطُ</span> <i>ash-sharqu l-awsaṭu</i>, wörtlich „der mittlere Osten“.</div>` },
    ],
  },
  {
    id: 'imperative', title: 'Imperativ & höfliche Bitten', icon: 'fa-bullhorn', beforeLesson: 110,
    drills: [
      {"q": "Wie lautet der Imperativ von تَكْتُبُ (du schreibst) an einen Mann?", "options": ["تَكْتُبْ", "اُكْتُبْ", "اُكْتُبِي", "كَتَبَ"], "answer": 1, "why": "ta- und -u fallen weg, davor kommt der Hilfsvokal u-: uktub!"},
      {"q": "Wie sagt man „Setz dich!“ zu einer Frau?", "options": ["اِجْلِسْ", "اِجْلِسُوا", "تَجْلِسِينَ", "اِجْلِسِي"], "answer": 3, "why": "Die weibliche Form endet auf -ī: ijlisī!"},
      {"q": "Wie heißt „Schreib nicht!“?", "options": ["لَا تَكْتُبْ", "لَا اُكْتُبْ", "لَمْ تَكْتُبْ", "لَنْ تَكْتُبَ"], "answer": 0, "why": "Verbot = lā + Kurzform mit Vorsilbe. lam taktub hieße „du hast nicht geschrieben“."},
      {"q": "Wie sagt man „bitte“ zu einer Frau?", "options": ["مِنْ فَضْلِكُمْ", "مِنْ فَضْلِكَ", "مِنْ فَضْلِكِ", "شُكْرًا"], "answer": 2, "why": "Wie bei anti: -ki für Frauen – min faḍliki."},
      {"q": "Was bedeutet قُلْ?", "options": ["iss!", "sag!", "nimm!", "geh!"], "answer": 1, "why": "qul! gehört zu qāla – yaqūlu (sagen)."},
      {"q": "Wie lautet der Imperativ an mehrere Personen zu تَفْتَحُونَ (ihr öffnet)?", "options": ["اِفْتَحُوا", "اِفْتَحْ", "اِفْتَحِي", "تَفْتَحُوا"], "answer": 0, "why": "Vorsilbe weg, -na weg, Hilfsvokal i- davor: iftaḥū!"},
    ],
    pages: [
      { heading: 'Der Imperativ aus dem Präsens', html: `
        <p>Der Imperativ entsteht aus der „du“-Form des Präsens: Vorsilbe <i>ta-</i> weg, Endung <i>-u</i> (bzw. <i>-na</i>) weg. Beginnt der Rest mit zwei Konsonanten, kommt ein Hilfsvokal davor – <i>u-</i>, wenn der Stamm <i>u</i> hat, sonst <i>i-</i>:</p>
        <table class="gr-table">
          <tr><th>du …</th><th>m.</th><th>w.</th><th>Plural</th></tr>
          <tr><td><span lang="ar">تَكْتُبُ</span> <i>taktubu</i></td><td><span lang="ar">اُكْتُبْ</span> <i>uktub</i></td><td><span lang="ar">اُكْتُبِي</span> <i>uktubī</i></td><td><span lang="ar">اُكْتُبُوا</span> <i>uktubū</i> – schreibt!</td></tr>
          <tr><td><span lang="ar">تَجْلِسُ</span> <i>tajlisu</i></td><td><span lang="ar">اِجْلِسْ</span> <i>ijlis</i></td><td><span lang="ar">اِجْلِسِي</span> <i>ijlisī</i></td><td><span lang="ar">اِجْلِسُوا</span> <i>ijlisū</i> – setzt euch!</td></tr>
          <tr><td><span lang="ar">تَفْتَحُ</span> <i>taftaḥu</i></td><td><span lang="ar">اِفْتَحْ</span> <i>iftaḥ</i></td><td><span lang="ar">اِفْتَحِي</span> <i>iftaḥī</i></td><td><span lang="ar">اِفْتَحُوا</span> <i>iftaḥū</i> – öffnet!</td></tr>
        </table>
        <p>Kurz und unregelmäßig: <span lang="ar">قُلْ</span> <i>qul</i> – sag!, <span lang="ar">خُذْ</span> <i>khudh</i> – nimm!, <span lang="ar">كُلْ</span> <i>kul</i> – iss! Form IV beginnt mit <i>a-</i>: <span lang="ar">أَرْسِلْ</span> <i>arsil</i> – schick!</p>` },
      { heading: 'Verbote & höfliche Bitten', html: `
        <p>Ein <b>Verbot</b> bildet man mit <span lang="ar">لَا</span> <i>lā</i> + Kurzform (Jussiv) – mit Vorsilbe, ohne Hilfsvokal:</p>
        <ul>
          <li><span lang="ar">لَا تَكْتُبْ</span> <i>lā taktub</i> – Schreib nicht!</li>
          <li><span lang="ar">لَا تَذْهَبِي</span> <i>lā tadhhabī</i> – Geh nicht! (zu einer Frau)</li>
          <li><span lang="ar">لَا تَتَأَخَّرُوا</span> <i>lā tataʾakhkharū</i> – Kommt nicht zu spät!</li>
        </ul>
        <p>Höflicher wird es mit <span lang="ar">مِنْ فَضْلِكَ</span> <i>min faḍlika</i> / <span lang="ar">مِنْ فَضْلِكِ</span> <i>min faḍliki</i> (bitte – zu Mann / Frau) oder <span lang="ar">لَوْ سَمَحْتَ</span> <i>law samaḥta</i> („wenn du erlaubst“): <span lang="ar">أَعْطِنِي الْمَاءَ مِنْ فَضْلِكَ</span> <i>aʿṭinī l-māʾa min faḍlika</i> – Gib mir bitte das Wasser.</p>
        <div class="grammar-tip">💡 Noch höflicher ist eine Frage: <span lang="ar">هَلْ يُمْكِنُكَ أَنْ تُسَاعِدَنِي؟</span> <i>hal yumkinuka an tusāʿidanī?</i> – Kannst du mir helfen?</div>` },
    ],
  },
];
