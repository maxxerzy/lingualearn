// Grammatik-Kapitel Japanisch — werden im Lernkurs vor der jeweiligen
// Lektion (beforeLesson) eingeschoben und sind in der Übersicht nachlesbar.
export const grammar = [
  {
    id: 'intro', title: 'So funktioniert Japanisch', icon: 'fa-compass', beforeLesson: 1,
    pages: [
      { heading: 'Drei Schriften, eine einfache Aussprache', html: `
        <p>Japanisch mischt drei Schriftsysteme:</p>
        <ul>
          <li><b>Hiragana</b> (ひらがな) — runde Silbenzeichen für japanische Wörter und Grammatik,</li>
          <li><b>Katakana</b> (カタカナ) — eckige Silbenzeichen für Fremdwörter (<i>コーヒー</i> = Kaffee),</li>
          <li><b>Kanji</b> (漢字) — chinesische Zeichen für Wortstämme (<i>水</i> = Wasser).</li>
        </ul>
        <p>In der App steht immer die <b>Umschrift (Romaji)</b> dabei — du kannst also sofort loslegen und die Schrift später vertiefen. Beim Tippen zählt die Umschrift.</p>
        <p>Die <b>Aussprache ist leicht</b>: nur fünf Vokale (a, i, u, e, o) wie im Deutschen, jede Silbe gleich lang und gleich betont. <i>arigatou</i> = a-ri-ga-to-o.</p>
        <div class="grammar-tip">💡 Nur zwei Stolpersteine: <b>r</b> klingt zwischen „r" und „l", und <b>u</b> ist oft fast stumm (<i>desu</i> → „dess").</div>` },
      { heading: 'Was alles NICHT existiert', html: `
        <p>Vieles, was im Deutschen Mühe macht, gibt es im Japanischen schlicht nicht:</p>
        <ul>
          <li><b>keine Artikel</b> (kein der/die/das),</li>
          <li><b>kein grammatisches Geschlecht</b>,</li>
          <li><b>kein Plural</b> (<i>hon</i> = Buch oder Bücher),</li>
          <li><b>keine Personalendungen</b> — <i>tabemasu</i> heißt „ich/du/er/wir/ihr/sie esse(n)",</li>
          <li>Subjekt und Pronomen werden weggelassen, wenn klar: <i>Tabemasu.</i> = „(Ich) esse."</li>
        </ul>
        <p>Die Herausforderung liegt woanders: in der <b>Wortstellung</b> und den <b>Partikeln</b> — dazu gleich mehr.</p>` },
    ],
  },
  {
    id: 'syntax', title: 'Satzbau & Partikeln', icon: 'fa-arrows-left-right', beforeLesson: 2,
    pages: [
      { heading: 'Das Verb steht IMMER am Ende', html: `
        <p>Japanisch ist eine <b>SOV-Sprache</b>: Subjekt – Objekt – <b>Verb</b>. Das Verb bildet immer den Schluss:</p>
        <ul>
          <li><i>Watashi wa mizu o nomimasu.</i> — wörtlich „Ich [Thema] Wasser [Objekt] trinke." = Ich trinke Wasser.</li>
          <li><i>Pan o tabemasu.</i> — „(Ich) esse Brot."</li>
        </ul>
        <p>Die Rollen im Satz markieren kleine Wörter — die <b>Partikeln</b>. Sie stehen <b>nach</b> dem Wort, auf das sie sich beziehen:</p>
        <table class="gr-table">
          <tr><th>Partikel</th><th>markiert</th><th>Beispiel</th></tr>
          <tr><td><b>wa</b> (は)</td><td>das Thema</td><td><i>Watashi <b>wa</b> …</i> — was mich betrifft …</td></tr>
          <tr><td><b>o</b> (を)</td><td>das Objekt</td><td><i>mizu <b>o</b> nomimasu</i> — Wasser trinken</td></tr>
          <tr><td><b>ga</b> (が)</td><td>das Subjekt</td><td><i>neko <b>ga</b> imasu</i> — da ist eine Katze</td></tr>
          <tr><td><b>ni</b> (に)</td><td>Ziel/Zeit/Ort</td><td><i>Tokyo <b>ni</b> ikimasu</i> — nach Tokio fahren</td></tr>
          <tr><td><b>de</b> (で)</td><td>Ort der Handlung/Mittel</td><td><i>densha <b>de</b></i> — mit dem Zug</td></tr>
          <tr><td><b>no</b> (の)</td><td>Besitz („von")</td><td><i>watashi <b>no</b> hon</i> — mein Buch</td></tr>
        </table>
        <div class="grammar-tip">💡 Denke an Partikeln als <b>nachgestellte Wegweiser</b>: Erst kommt das Wort, dann das Schild, das seine Rolle erklärt.</div>` },
    ],
  },
  {
    id: 'verbs', title: 'Verben: die masu-Form', icon: 'fa-bolt', beforeLesson: 4,
    pages: [
      { heading: 'Vier Endungen für alles', html: `
        <p>Die höfliche <b>masu-Form</b> ist deine Standardform. Sie ändert sich nie nach der Person — nur nach Zeit und Verneinung:</p>
        <table class="gr-table">
          <tr><th>Form</th><th>Endung</th><th>taberu (essen)</th><th>Deutsch</th></tr>
          <tr><td>Gegenwart</td><td><b>-masu</b></td><td>tabe<b>masu</b></td><td>esse/isst/essen</td></tr>
          <tr><td>Verneinung</td><td><b>-masen</b></td><td>tabe<b>masen</b></td><td>esse nicht</td></tr>
          <tr><td>Vergangenheit</td><td><b>-mashita</b></td><td>tabe<b>mashita</b></td><td>aß / habe gegessen</td></tr>
          <tr><td>vern. Vergangenheit</td><td><b>-masen deshita</b></td><td>tabe<b>masen deshita</b></td><td>aß nicht</td></tr>
        </table>
        <p>Diese vier Endungen funktionieren bei <b>jedem</b> Verb: <i>nomimasu</i> (trinken), <i>ikimasu</i> (gehen), <i>mimasu</i> (sehen), <i>kaimasu</i> (kaufen) …</p>` },
      { heading: 'desu — der höfliche Punkt am Satzende', html: `
        <p><b>desu</b> (です) entspricht „ist/bin/sind" und schließt Nominalsätze höflich ab:</p>
        <ul>
          <li><i>Watashi wa gakusei <b>desu</b>.</i> — Ich bin Student.</li>
          <li><i>Kore wa hon <b>desu</b>.</i> — Das ist ein Buch.</li>
          <li>Verneinung: <i>… <b>ja arimasen</b></i> — <i>Gakusei ja arimasen.</i> — (Ich) bin kein Student.</li>
          <li>Vergangenheit: <i>… <b>deshita</b></i> — <i>Gakusei deshita.</i> — (Ich) war Student.</li>
        </ul>
        <p>„Es gibt / da ist": <b>arimasu</b> für Dinge, <b>imasu</b> für Lebewesen: <i>Neko ga imasu.</i> — Da ist eine Katze.</p>` },
    ],
  },
  {
    id: 'adjectives', title: 'Adjektive: i und na', icon: 'fa-palette', beforeLesson: 7,
    pages: [
      { heading: 'Zwei Familien', html: `
        <p>Japanische Adjektive gibt es in zwei Sorten:</p>
        <table class="gr-table">
          <tr><th>Typ</th><th>Beispiel</th><th>vor Substantiv</th><th>Verneinung</th></tr>
          <tr><td><b>i-Adjektive</b></td><td><i>taka<b>i</b></i> (teuer/hoch)</td><td><i>takai hon</i></td><td><i>taka<b>kunai</b></i> (nicht teuer)</td></tr>
          <tr><td><b>na-Adjektive</b></td><td><i>shizuka</i> (ruhig)</td><td><i>shizuka <b>na</b> machi</i></td><td><i>shizuka <b>ja arimasen</b></i></td></tr>
        </table>
        <p>Besonderheit: i-Adjektive tragen sogar die Zeit selbst — <i>takakatta</i> = „war teuer" (Vergangenheit im Adjektiv!).</p>
        <div class="grammar-tip">💡 <i>ii</i> (gut) ist unregelmäßig: Verneinung <i>yokunai</i>, Vergangenheit <i>yokatta</i> — <i>Yokatta!</i> heißt als Ausruf „Zum Glück!/Wie schön!"</div>` },
    ],
  },
  {
    id: 'questions', title: 'Fragen & Antworten', icon: 'fa-circle-question', beforeLesson: 11,
    pages: [
      { heading: 'Das kleine Wort ka', html: `
        <p>Jede Frage entsteht durch das Anhängen von <b>ka</b> (か) am Satzende — keine Umstellung, kein Fragezeichen nötig:</p>
        <ul>
          <li><i>Gakusei desu.</i> — (Ich) bin Student. → <i>Gakusei desu <b>ka</b>.</i> — Bist du Student?</li>
          <li><i>Sushi o tabemasu <b>ka</b>.</i> — Isst du Sushi?</li>
        </ul>
        <table class="gr-table">
          <tr><th>Fragewort</th><th>Deutsch</th><th>Beispiel</th></tr>
          <tr><td>nani / nan</td><td>was</td><td><i>Kore wa nan desu ka.</i> — Was ist das?</td></tr>
          <tr><td>doko</td><td>wo</td><td><i>Toire wa doko desu ka.</i> — Wo ist die Toilette?</td></tr>
          <tr><td>dare</td><td>wer</td><td><i>Dare desu ka.</i> — Wer ist das?</td></tr>
          <tr><td>itsu</td><td>wann</td><td><i>Itsu ikimasu ka.</i> — Wann fährst du?</td></tr>
          <tr><td>naze / doushite</td><td>warum</td><td><i>Doushite desu ka.</i> — Warum?</td></tr>
          <tr><td>ikura</td><td>wie viel (Preis)</td><td><i>Ikura desu ka.</i> — Wie viel kostet das?</td></tr>
        </table>
        <p>„Ja" = <b>hai</b>, „nein" = <b>iie</b>.</p>` },
    ],
  },
  {
    id: 'polite', title: 'Höflichkeit & gute Sitten', icon: 'fa-hands', beforeLesson: 16,
    pages: [
      { heading: 'Sprache mit eingebautem Respekt', html: `
        <p>Japanisch kennt <b>Höflichkeitsstufen</b>. Mit der masu/desu-Form, die du hier lernst, bist du überall richtig — sie ist die neutrale Höflichkeitsform für Fremde, Kollegen und Geschäfte.</p>
        <ul>
          <li>An Namen hängt man <b>-san</b> (Herr/Frau): <i>Tanaka-san</i>. Nie an den eigenen Namen!</li>
          <li><i>watashi</i> (ich) und besonders <i>anata</i> (du) lässt man weg, wann immer es geht — man spricht Menschen mit Namen + san an.</li>
          <li>Nützliche Höflichkeitsfloskeln: <i>sumimasen</i> (Entschuldigung/danke), <i>onegaishimasu</i> (bitte, formell), <i>itadakimasu</i> (vor dem Essen).</li>
        </ul>
        <div class="grammar-tip">💡 Unter Freunden fällt später das <i>masu/desu</i> weg (<i>taberu</i> statt <i>tabemasu</i>) — verstehe die Kurzformen passiv, benutze aktiv die höfliche Form. Damit machst du nie etwas falsch.</div>` },
    ],
  },
];
