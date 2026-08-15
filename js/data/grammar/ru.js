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
  {
    id: 'adjectives', title: 'Adjektive & Angleichung', icon: 'fa-palette', beforeLesson: 21,
    pages: [
      { heading: 'Drei Endungen im Nominativ', html: `
        <p class="grammar-example">нов<b>ый</b> дом <span>neues Haus (m.)</span><br>
           нов<b>ая</b> книга <span>neues Buch (f.)</span><br>
           нов<b>ое</b> окно <span>neues Fenster (n.)</span><br>
           нов<b>ые</b> дома <span>neue Häuser (Pl.)</span></p>
        <p>Das Adjektiv übernimmt Geschlecht, Zahl <b>und</b> Fall seines Substantivs — es beugt also in jedem der sechs Fälle mit.</p>
        <div class="grammar-tip">💡 Die Kurzform (<i>дом нов</i>) begegnet dir vor allem in festen Wendungen wie <i>я рад</i> (ich bin froh) oder <i>это возможно</i>. Als Lernender brauchst du zuerst nur die Langform.</div>` },
    ],
  },
  {
    id: 'plural', title: 'Mehrzahl & die Zahlen-Regel', icon: 'fa-clone', beforeLesson: 27,
    pages: [
      { heading: 'Plural bilden', html: `
        <table class="grammar-table">
          <tr><th>Geschlecht</th><th>Singular</th><th>Plural</th></tr>
          <tr><td>männlich</td><td>дом</td><td>дом<b>а</b> · стол<b>ы</b></td></tr>
          <tr><td>weiblich</td><td>книга</td><td>книг<b>и</b></td></tr>
          <tr><td>sächlich</td><td>окно</td><td>окн<b>а</b></td></tr>
        </table>
        <p>Nach к, г, х, ж, ч, ш, щ steht immer <b>и</b>, nie ы — die berühmte Rechtschreibregel.</p>` },
      { heading: 'Nach Zahlen wechselt der Fall', html: `
        <p>Das ist die auffälligste Eigenheit des Russischen:</p>
        <table class="grammar-table">
          <tr><th>Zahl endet auf</th><th>Fall</th><th>Beispiel</th></tr>
          <tr><td>1 (außer 11)</td><td>Nominativ Sg.</td><td>один дом, двадцать один дом</td></tr>
          <tr><td>2, 3, 4</td><td>Genitiv Singular</td><td>два дом<b>а</b>, три книг<b>и</b></td></tr>
          <tr><td>5–20, 0, viele</td><td>Genitiv Plural</td><td>пять дом<b>ов</b>, много книг</td></tr>
        </table>
        <div class="grammar-tip">💡 Deshalb heißt es <i>два часа</i> (zwei Uhr), aber <i>пять часов</i> (fünf Uhr) — dieselbe Regel, jeden Tag im Einsatz.</div>` },
    ],
  },
  {
    id: 'aspect', title: 'Der Verbaspekt', icon: 'fa-hourglass-half', beforeLesson: 34,
    pages: [
      { heading: 'Jedes Verb kommt im Doppelpack', html: `
        <p>Russisch hat kaum Zeiten, dafür zu fast jedem Verb <b>zwei Partner</b>: unvollendet (Verlauf, Gewohnheit) und vollendet (Ergebnis, einmalig).</p>
        <table class="grammar-table">
          <tr><th>unvollendet</th><th>vollendet</th><th>Bedeutung</th></tr>
          <tr><td>читать</td><td>прочитать</td><td>lesen / zu Ende lesen</td></tr>
          <tr><td>писать</td><td>написать</td><td>schreiben / fertig schreiben</td></tr>
          <tr><td>делать</td><td>сделать</td><td>tun / erledigen</td></tr>
          <tr><td>говорить</td><td>сказать</td><td>sprechen / sagen</td></tr>
        </table>
        <p class="grammar-example">Я <b>читал</b> книгу. <span>Ich las (war dabei).</span><br>
           Я <b>прочитал</b> книгу. <span>Ich habe sie fertig gelesen.</span></p>` },
      { heading: 'Was das für die Zeiten bedeutet', html: `
        <p>Der Aspekt entscheidet, welche Zeiten ein Verb überhaupt bilden kann:</p>
        <table class="grammar-table">
          <tr><th></th><th>unvollendet</th><th>vollendet</th></tr>
          <tr><td>Vergangenheit</td><td>читал</td><td>прочитал</td></tr>
          <tr><td>Gegenwart</td><td>читаю</td><td>— gibt es nicht</td></tr>
          <tr><td>Zukunft</td><td>буду читать</td><td>прочитаю</td></tr>
        </table>
        <div class="grammar-tip">💡 Ein vollendetes Verb hat <b>keine</b> Gegenwart — was abgeschlossen ist, kann nicht gerade laufen. Deshalb ist <i>прочитаю</i> automatisch Zukunft.</div>` },
    ],
  },
  {
    id: 'motion', title: 'Bewegungsverben', icon: 'fa-person-walking', beforeLesson: 41,
    pages: [
      { heading: 'Einmal hin oder immer wieder?', html: `
        <p>Russisch trennt bei Bewegung zwei Arten — eine gerichtete Fahrt und eine allgemeine Gewohnheit:</p>
        <table class="grammar-table">
          <tr><th>gerichtet</th><th>allgemein</th><th>Bedeutung</th></tr>
          <tr><td>идти</td><td>ходить</td><td>zu Fuß gehen</td></tr>
          <tr><td>ехать</td><td>ездить</td><td>fahren</td></tr>
          <tr><td>лететь</td><td>летать</td><td>fliegen</td></tr>
          <tr><td>нести</td><td>носить</td><td>tragen</td></tr>
        </table>
        <p class="grammar-example">Я <b>иду</b> в школу. <span>Ich bin gerade auf dem Weg zur Schule.</span><br>
           Я <b>хожу</b> в школу. <span>Ich gehe zur Schule (regelmäßig).</span><br>
           Я <b>еду</b> в Москву. <span>Ich fahre gerade nach Moskau.</span></p>
        <div class="grammar-tip">💡 Zu Fuß oder mit Fahrzeug ist im Russischen ein Bedeutungsunterschied: <i>идти</i> geht nur zu Fuß, <i>ехать</i> nur mit einem Verkehrsmittel. Ein „ich gehe nach Moskau" wäre komisch.</div>` },
    ],
  },
  {
    id: 'numbers', title: 'Zahlen, Uhrzeit & Datum', icon: 'fa-clock', beforeLesson: 45,
    pages: [
      { heading: 'Wie spät ist es?', html: `
        <p class="grammar-example">Который час? / Сколько времени? <span>Wie spät ist es?</span><br>
           <b>Час.</b> <span>Ein Uhr — ohne Zahlwort.</span><br>
           <b>Два часа.</b> <span>Zwei Uhr — Genitiv Singular.</span><br>
           <b>Пять часов.</b> <span>Fünf Uhr — Genitiv Plural.</span></p>
        <p>Die Zahlen-Regel aus dem Plural-Kapitel gilt also auch hier — und bei Minuten, Rubeln, Jahren genauso.</p>` },
      { heading: 'Datum & Wochentage', html: `
        <p class="grammar-example">Какое сегодня число? <span>Welches Datum ist heute?</span><br>
           Сегодня <b>пятое</b> мая. <span>Heute ist der fünfte Mai — Ordnungszahl im Nominativ, Monat im Genitiv.</span><br>
           <b>в</b> понедельник <span>am Montag</span> · <b>в</b> мае <span>im Mai</span></p>` },
    ],
  },
  {
    id: 'prepositions', title: 'Präpositionen und ihre Fälle', icon: 'fa-map-signs', beforeLesson: 52,
    pages: [
      { heading: 'Wo? Wohin? Woher?', html: `
        <table class="grammar-table">
          <tr><th>Frage</th><th>Präposition</th><th>Fall</th><th>Beispiel</th></tr>
          <tr><td>wo?</td><td>в / на</td><td>Präpositiv</td><td>в шко́л<b>е</b> — in der Schule</td></tr>
          <tr><td>wohin?</td><td>в / на</td><td>Akkusativ</td><td>в шко́л<b>у</b> — in die Schule</td></tr>
          <tr><td>woher?</td><td>из / с</td><td>Genitiv</td><td>из шко́л<b>ы</b> — aus der Schule</td></tr>
        </table>
        <p>Dieselbe Präposition, drei Fälle, drei Bedeutungen — wie im Deutschen bei „in dem" gegen „in das".</p>
        <p>Weitere feste Verbindungen: <b>у</b> + Genitiv (bei), <b>с</b> + Instrumental (mit), <b>к</b> + Dativ (zu), <b>о</b> + Präpositiv (über).</p>
        <div class="grammar-tip">💡 <b>в</b> oder <b>на</b>? Geschlossene Räume und Länder nehmen <i>в</i>, offene Flächen und Veranstaltungen <i>на</i>: <i>в театре</i>, aber <i>на почте</i>, <i>на концерте</i>. Das lernt man Wort für Wort.</div>` },
    ],
  },
  {
    id: 'tenses', title: 'Vergangenheit & Zukunft', icon: 'fa-clock-rotate-left', beforeLesson: 58,
    pages: [
      { heading: 'Die Vergangenheit richtet sich nach dem Geschlecht', html: `
        <p>Statt Personalendungen trägt die Vergangenheit das Geschlecht des Subjekts — sie war ursprünglich ein Partizip:</p>
        <p class="grammar-example">Он читал. <span>Er las.</span><br>
           Она читал<b>а</b>. <span>Sie las.</span><br>
           Оно читал<b>о</b>. <span>Es las.</span><br>
           Они читал<b>и</b>. <span>Sie lasen.</span></p>
        <p>Gebildet wird sie schlicht mit <b>-л</b> am Infinitivstamm.</p>` },
      { heading: 'Zwei Zukunftsformen', html: `
        <p class="grammar-example">Я <b>буду читать</b>. <span>unvollendet — ich werde (eine Weile) lesen.</span><br>
           Я <b>прочитаю</b>. <span>vollendet — ich werde es (fertig) lesen.</span></p>
        <p><i>быть</i> im Futur: <b>буду, будешь, будет, будем, будете, будут</b>. Im Präsens fehlt es dagegen ganz: <i>Я студент</i> — ich bin Student, ohne Verb.</p>` },
    ],
  },
  {
    id: 'possessive', title: 'Besitz: у меня есть & свой', icon: 'fa-hand-holding', beforeLesson: 67,
    pages: [
      { heading: 'Russisch hat kein „haben"', html: `
        <p>Besitz wird umgedreht — wörtlich: „bei mir ist":</p>
        <p class="grammar-example"><b>У меня есть</b> книга. <span>Ich habe ein Buch.</span><br>
           <b>У нас есть</b> время. <span>Wir haben Zeit.</span><br>
           <b>У меня нет</b> книг<b>и</b>. <span>Ich habe kein Buch — Verneinung mit нет + Genitiv.</span></p>
        <p>Possessive: <b>мой, твой, наш, ваш</b> werden gebeugt; <b>его, её, их</b> bleiben unverändert.</p>` },
      { heading: 'свой — das eigene', html: `
        <p>Wie das dänische <i>sin</i> zeigt <b>свой</b> immer auf das Subjekt des eigenen Satzes zurück:</p>
        <p class="grammar-example">Он читает <b>свою</b> книгу. <span>Er liest sein eigenes Buch.</span><br>
           Он читает <b>его</b> книгу. <span>Er liest das Buch eines anderen.</span></p>` },
    ],
  },
  {
    id: 'comparison', title: 'Steigern & vergleichen', icon: 'fa-ranking-star', beforeLesson: 74,
    pages: [
      { heading: '-ее und более', html: `
        <p class="grammar-example">быстрый → быстр<b>ее</b> <span>schnell → schneller</span><br>
           красивый → <b>более</b> красивый <span>schön → schöner</span></p>
        <p>Verglichen wird mit dem <b>Genitiv</b> oder mit <b>чем</b>:</p>
        <p class="grammar-example">Он выше <b>меня</b>. = Он выше, <b>чем</b> я. <span>Er ist größer als ich.</span></p>
        <p>Superlativ mit <b>самый</b>: <i><b>самый</b> красивый город</i> — die schönste Stadt.</p>
        <p>Unregelmäßig und häufig: <i>хороший → лучше</i> (gut → besser), <i>плохой → хуже</i> (schlecht → schlechter), <i>большой → больше</i>, <i>маленький → меньше</i>.</p>` },
    ],
  },
  {
    id: 'imperative', title: 'Imperativ & Bitten', icon: 'fa-bullhorn', beforeLesson: 80,
    pages: [
      { heading: 'Aus der du-Form gebildet', html: `
        <p>Endung <i>-ешь</i> abtrennen, dann <b>-й</b>, <b>-и</b> oder <b>-ь</b> anhängen:</p>
        <p class="grammar-example">читаешь → чита<b>й</b>! <span>Lies!</span><br>
           говоришь → говор<b>и</b>! <span>Sprich!</span><br>
           Höflich mit -те: чита<b>йте</b>, говор<b>ите</b></p>
        <p>Höflicher wird es mit <b>пожалуйста</b> oder einer Frage:</p>
        <p class="grammar-example">Скажите, пожалуйста … <span>Sagen Sie bitte …</span><br>
           Вы не могли бы помочь? <span>Könnten Sie helfen?</span></p>
        <div class="grammar-tip">💡 Der Aspekt wirkt auch hier: <i>Читайте!</i> (unvollendet) lädt ein, <i>Прочитайте!</i> (vollendet) verlangt ein Ergebnis.</div>` },
    ],
  },
  {
    id: 'cases-all', title: 'Die sechs Fälle im Überblick', icon: 'fa-table', beforeLesson: 88,
    pages: [
      { heading: 'Wozu jeder Fall da ist', html: `
        <table class="grammar-table">
          <tr><th>Fall</th><th>Frage</th><th>typisch</th></tr>
          <tr><td>Nominativ</td><td>кто? что?</td><td>Subjekt</td></tr>
          <tr><td>Genitiv</td><td>кого? чего?</td><td>Besitz, Verneinung, nach Zahlen</td></tr>
          <tr><td>Dativ</td><td>кому? чему?</td><td>Empfänger, nach к</td></tr>
          <tr><td>Akkusativ</td><td>кого? что?</td><td>Objekt, Richtung</td></tr>
          <tr><td>Instrumental</td><td>кем? чем?</td><td>Mittel, nach с</td></tr>
          <tr><td>Präpositiv</td><td>о ком? о чём?</td><td>Ort, Thema — nur nach Präposition</td></tr>
        </table>` },
      { heading: 'Die Endungen der Substantive', html: `
        <table class="grammar-table">
          <tr><th>Fall</th><th>m. (стол)</th><th>f. (книга)</th><th>n. (окно)</th></tr>
          <tr><td>Nom.</td><td>стол</td><td>книга</td><td>окно</td></tr>
          <tr><td>Gen.</td><td>стол<b>а</b></td><td>книг<b>и</b></td><td>окн<b>а</b></td></tr>
          <tr><td>Dat.</td><td>стол<b>у</b></td><td>книг<b>е</b></td><td>окн<b>у</b></td></tr>
          <tr><td>Akk.</td><td>стол</td><td>книг<b>у</b></td><td>окно</td></tr>
          <tr><td>Instr.</td><td>стол<b>ом</b></td><td>книг<b>ой</b></td><td>окн<b>ом</b></td></tr>
          <tr><td>Präp.</td><td>о стол<b>е</b></td><td>о книг<b>е</b></td><td>об окн<b>е</b></td></tr>
        </table>
        <div class="grammar-tip">💡 Bei männlichen Wörtern entscheidet die Belebtheit über den Akkusativ: Dinge bleiben wie im Nominativ (<i>вижу стол</i>), Lebewesen nehmen den Genitiv (<i>вижу брат<b>а</b></i>).</div>` },
    ],
  },
  {
    id: 'subclause', title: 'Nebensätze: что, чтобы, который', icon: 'fa-code-branch', beforeLesson: 99,
    pages: [
      { heading: 'Die drei wichtigsten Anschlüsse', html: `
        <ul>
          <li><b>что</b> — dass (Tatsache): <i>Я знаю, <b>что</b> он дома.</i></li>
          <li><b>чтобы</b> — damit, dass (Wunsch, Absicht) — danach steht die Vergangenheitsform: <i>Я хочу, <b>чтобы</b> ты пришёл.</i></li>
          <li><b>который</b> — der/die/das: wird wie ein Adjektiv gebeugt.</li>
        </ul>
        <p class="grammar-example">Человек, <b>который</b> говорит … <span>Der Mann, der spricht …</span><br>
           Книга, <b>которую</b> я читаю … <span>Das Buch, das ich lese — Akkusativ, weil Objekt.</span></p>
        <p>Wie im Deutschen holt sich <i>который</i> Geschlecht und Zahl vom Bezugswort, den Fall aber aus dem eigenen Satz.</p>
        <div class="grammar-tip">💡 Vor jedem Nebensatz steht im Russischen ein Komma — ausnahmslos. Das ist strenger als im Deutschen und im Zweifel die sichere Wahl.</div>` },
    ],
  },
  {
    id: 'particles', title: 'Kleine Wörter: же, ведь, ли, бы', icon: 'fa-comment', beforeLesson: 108,
    pages: [
      { heading: 'Der Ton macht die Sprache', html: `
        <table class="grammar-table">
          <tr><th>Wort</th><th>Wirkung</th><th>Beispiel</th></tr>
          <tr><td><b>же</b></td><td>Betonung, leichte Ungeduld</td><td>Что <b>же</b> ты делаешь? — Was machst du denn da?</td></tr>
          <tr><td><b>ведь</b></td><td>„das weißt du doch"</td><td>Ты <b>ведь</b> знаешь. — Du weißt es doch.</td></tr>
          <tr><td><b>ли</b></td><td>ob (indirekte Frage)</td><td>Я не знаю, придёт <b>ли</b> он.</td></tr>
          <tr><td><b>бы</b></td><td>würde, wäre</td><td>Я <b>бы</b> хотел … — Ich würde gern …</td></tr>
          <tr><td><b>-то</b></td><td>irgend-</td><td>кто<b>-то</b> — irgendjemand</td></tr>
        </table>
        <p><b>бы</b> mit der Vergangenheitsform bildet den ganzen Konjunktiv des Russischen — mehr braucht die Sprache nicht:</p>
        <p class="grammar-example">Если <b>бы</b> у меня <b>было</b> время, я <b>бы</b> пришёл.<br><span>Wenn ich Zeit hätte, würde ich kommen.</span></p>` },
    ],
  },
];
