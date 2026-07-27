// Grammatik-Kapitel Russisch — werden im Lernkurs vor der jeweiligen
// Lektion (beforeLesson) eingeschoben und sind in der Übersicht nachlesbar.
export const grammar = [
  {
    id: 'intro', title: 'Das kyrillische Alphabet', icon: 'fa-compass', beforeLesson: 1,
    pages: [
      { heading: 'Keine Angst vor Kyrillisch', html: `
        <p>Russisch schreibt man <b>kyrillisch</b> — 33 Buchstaben, von denen du viele schon kennst. Drei Gruppen:</p>
        <ul>
          <li><b>Wie im Deutschen</b>: А, Е, К, М, О, Т — <i>кот</i> (Kater) kannst du sofort lesen: „kot".</li>
          <li><b>Falsche Freunde</b> (sehen bekannt aus, klingen anders): В = „w", Н = „n", Р = „r", С = „s", У = „u", Х = „ch".</li>
          <li><b>Neue Zeichen</b>: die lernst du unten.</li>
        </ul>
        <table class="gr-table">
          <tr><th>Buchstabe</th><th>Klang</th><th>Beispiel</th></tr>
          <tr><td>Б б</td><td>b</td><td><i>банк</i> — Bank</td></tr>
          <tr><td>Г г</td><td>g</td><td><i>год</i> — Jahr</td></tr>
          <tr><td>Д д</td><td>d</td><td><i>дом</i> — Haus</td></tr>
          <tr><td>Ж ж</td><td>stimmhaftes „sch" (Journal)</td><td><i>жена</i> — Ehefrau</td></tr>
          <tr><td>З з</td><td>stimmhaftes „s"</td><td><i>зима</i> — Winter</td></tr>
          <tr><td>И и / Й й</td><td>i / kurzes j</td><td><i>мир</i> — Welt/Frieden</td></tr>
          <tr><td>Л л</td><td>l</td><td><i>лампа</i> — Lampe</td></tr>
          <tr><td>П п</td><td>p</td><td><i>папа</i> — Papa</td></tr>
          <tr><td>Ф ф</td><td>f</td><td><i>фото</i> — Foto</td></tr>
          <tr><td>Ц ц</td><td>z (wie „Zar")</td><td><i>центр</i> — Zentrum</td></tr>
          <tr><td>Ч ч</td><td>tsch</td><td><i>чай</i> — Tee</td></tr>
          <tr><td>Ш ш / Щ щ</td><td>sch / weiches „schtsch"</td><td><i>школа</i> — Schule</td></tr>
          <tr><td>Ы ы</td><td>dumpfes „i"</td><td><i>сын</i> — Sohn</td></tr>
          <tr><td>Э э</td><td>offenes „e"</td><td><i>это</i> — das (ist)</td></tr>
          <tr><td>Ю ю / Я я</td><td>ju / ja</td><td><i>я</i> — ich</td></tr>
          <tr><td>Ь ь / Ъ ъ</td><td>Weichheits-/Härtezeichen (stumm)</td><td><i>день</i> — Tag</td></tr>
        </table>
        <div class="grammar-tip">💡 In der App steht unter jedem Wort die <b>Umschrift</b> (Transliteration) — beim Tippen darfst du sie statt der kyrillischen Schrift benutzen.</div>` },
      { heading: 'Betonung & O-Reduktion', html: `
        <p>Zwei Ausspracheregeln machen dein Russisch sofort natürlicher:</p>
        <ul>
          <li>Jedes Wort hat <b>eine stark betonte Silbe</b> — sie ist nicht markiert und muss mitgelernt werden (die Hör-Knöpfe helfen).</li>
          <li><b>Unbetontes о klingt wie „a"</b>: <i>молоко</i> (Milch) spricht man „malakó", <i>хорошо</i> (gut) „charaschó".</li>
        </ul>` },
    ],
  },
  {
    id: 'nouns', title: 'Substantive: drei Genera, keine Artikel', icon: 'fa-cube', beforeLesson: 2,
    pages: [
      { heading: 'Das Geschlecht steht am Wortende', html: `
        <p>Gute Nachricht: Russisch hat <b>keine Artikel</b> — <i>дом</i> heißt „Haus", „ein Haus" und „das Haus". Das Geschlecht erkennst du fast immer an der Endung:</p>
        <table class="gr-table">
          <tr><th>Genus</th><th>Endung</th><th>Beispiele</th></tr>
          <tr><td>männlich</td><td>Konsonant, -й</td><td><i>дом</i> (Haus), <i>чай</i> (Tee)</td></tr>
          <tr><td>weiblich</td><td>-а, -я</td><td><i>мама</i>, <i>неделя</i> (Woche)</td></tr>
          <tr><td>sächlich</td><td>-о, -е</td><td><i>окно</i> (Fenster), <i>море</i> (Meer)</td></tr>
        </table>
        <p><b>Plural</b>: meist Endung <b>-ы</b> oder <b>-и</b>: <i>дом → дома́/домы̆-Ausnahmen gibt es</i>, <i>книга → книги</i> (Bücher), <i>стол → столы</i> (Tische).</p>` },
    ],
  },
  {
    id: 'verbs', title: 'Verben im Präsens — und das fehlende „sein"', icon: 'fa-bolt', beforeLesson: 4,
    pages: [
      { heading: 'Zwei Konjugationsmuster', html: `
        <table class="gr-table">
          <tr><th>Person</th><th>читать (lesen), I</th><th>говорить (sprechen), II</th></tr>
          <tr><td>я (ich)</td><td>чита<b>ю</b></td><td>говор<b>ю</b></td></tr>
          <tr><td>ты (du)</td><td>чита<b>ешь</b></td><td>говор<b>ишь</b></td></tr>
          <tr><td>он/она (er/sie)</td><td>чита<b>ет</b></td><td>говор<b>ит</b></td></tr>
          <tr><td>мы (wir)</td><td>чита<b>ем</b></td><td>говор<b>им</b></td></tr>
          <tr><td>вы (ihr/Sie)</td><td>чита<b>ете</b></td><td>говор<b>ите</b></td></tr>
          <tr><td>они (sie)</td><td>чита<b>ют</b></td><td>говор<b>ят</b></td></tr>
        </table>
        <p>Muster I (-е-Reihe) und Muster II (-и-Reihe) decken fast alle Verben ab.</p>` },
      { heading: '„Sein" fällt im Präsens weg', html: `
        <p>Die größte Überraschung: Das Verb „sein" (<i>быть</i>) wird im Präsens <b>weggelassen</b>:</p>
        <ul>
          <li><i>Я студент.</i> — wörtlich „Ich Student" = Ich bin Student.</li>
          <li><i>Это дом.</i> — Das (ist ein) Haus.</li>
          <li><i>Она дома.</i> — Sie (ist) zu Hause.</li>
        </ul>
        <p>„Haben" umschreibt man mit <b>у меня есть</b> („bei mir ist"): <i>У меня есть кот.</i> — Ich habe einen Kater.</p>
        <div class="grammar-tip">💡 <b>вы</b> ist wie das französische <i>vous</i> zugleich „ihr" und die Höflichkeitsform „Sie".</div>` },
    ],
  },
  {
    id: 'cases', title: 'Die sechs Fälle', icon: 'fa-layer-group', beforeLesson: 7,
    pages: [
      { heading: 'Endungen statt Präpositionen', html: `
        <p>Russisch dekliniert wie Latein — <b>sechs Fälle</b>, erkennbar an den Endungen (Beispiel: <i>книга</i> — das Buch):</p>
        <table class="gr-table">
          <tr><th>Fall</th><th>Frage</th><th>книга</th><th>Beispiel</th></tr>
          <tr><td>Nominativ</td><td>wer/was?</td><td>книг<b>а</b></td><td>Subjekt</td></tr>
          <tr><td>Genitiv</td><td>wessen?</td><td>книг<b>и</b></td><td>Besitz, Verneinung</td></tr>
          <tr><td>Dativ</td><td>wem?</td><td>книг<b>е</b></td><td>Empfänger</td></tr>
          <tr><td>Akkusativ</td><td>wen/was?</td><td>книг<b>у</b></td><td>Objekt</td></tr>
          <tr><td>Instrumental</td><td>womit?</td><td>книг<b>ой</b></td><td>Mittel/Werkzeug</td></tr>
          <tr><td>Präpositiv</td><td>worüber/wo?</td><td>о книг<b>е</b></td><td>nur mit Präposition</td></tr>
        </table>
        <div class="grammar-tip">💡 Für den Anfang reichen Nominativ und Akkusativ — die übrigen Fälle erkennst du erst einmal passiv. Sie kommen mit der Zeit von ganz allein.</div>` },
    ],
  },
  {
    id: 'questions', title: 'Fragen & Verneinung', icon: 'fa-circle-question', beforeLesson: 11,
    pages: [
      { heading: 'Fragen ohne Umbau', html: `
        <p>Ja/Nein-Fragen brauchen <b>keine Umstellung</b> — nur die Stimme steigt: <i>Ты говоришь по-русски?</i> — Sprichst du Russisch?</p>
        <table class="gr-table">
          <tr><th>Fragewort</th><th>Umschrift</th><th>Deutsch</th></tr>
          <tr><td>что</td><td>schto</td><td>was</td></tr>
          <tr><td>кто</td><td>kto</td><td>wer</td></tr>
          <tr><td>где</td><td>gde</td><td>wo</td></tr>
          <tr><td>когда</td><td>kogda</td><td>wann</td></tr>
          <tr><td>почему</td><td>potschemu</td><td>warum</td></tr>
          <tr><td>как</td><td>kak</td><td>wie</td></tr>
          <tr><td>сколько</td><td>skolko</td><td>wie viel</td></tr>
        </table>
        <p><b>Verneinung</b>: <b>не</b> direkt vor dem verneinten Wort: <i>Я <b>не</b> понимаю.</i> — Ich verstehe nicht. „Nein" = <b>нет</b>.</p>` },
    ],
  },
  {
    id: 'past', title: 'Vergangenheit & Aspekte', icon: 'fa-clock-rotate-left', beforeLesson: 16,
    pages: [
      { heading: 'Vergangenheit auf -л', html: `
        <p>Die Vergangenheit ist herrlich einfach: Stamm + <b>-л</b>. Sie richtet sich nicht nach der Person, sondern nach dem <b>Geschlecht des Subjekts</b>:</p>
        <table class="gr-table">
          <tr><th>Subjekt</th><th>Endung</th><th>читать → …</th><th>Deutsch</th></tr>
          <tr><td>er</td><td>-л</td><td>чита<b>л</b></td><td>er las</td></tr>
          <tr><td>sie (w.)</td><td>-ла</td><td>чита<b>ла</b></td><td>sie las</td></tr>
          <tr><td>es</td><td>-ло</td><td>чита<b>ло</b></td><td>es las</td></tr>
          <tr><td>Plural</td><td>-ли</td><td>чита<b>ли</b></td><td>sie lasen</td></tr>
        </table>
        <p><i>Я читал</i> (Mann) / <i>Я читала</i> (Frau) — Ich las/habe gelesen.</p>` },
      { heading: 'Der Aspekt: die russische Spezialität', html: `
        <p>Fast jedes Verb gibt es <b>doppelt</b>: unvollendet (Vorgang) und vollendet (Ergebnis):</p>
        <ul>
          <li><i>читать</i> (unvollendet) — lesen, am Lesen sein: <i>Я читал книгу.</i> — Ich las (in) dem Buch.</li>
          <li><i>про-читать</i> (vollendet) — fertig lesen: <i>Я прочитал книгу.</i> — Ich habe das Buch (ganz) gelesen.</li>
        </ul>
        <div class="grammar-tip">💡 Merke fürs Erste nur das Prinzip: <b>Vorgang oder Ergebnis?</b> Die Paare lernst du nach und nach mit den Vokabeln. Zukunft: <i>буду</i> + Infinitiv (<i>Я буду читать</i> — ich werde lesen).</div>` },
    ],
  },
];
