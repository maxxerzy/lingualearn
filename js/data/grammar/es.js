// Grammatik-Kapitel Spanisch — werden im Lernkurs vor der jeweiligen
// Lektion (beforeLesson) eingeschoben und sind in der Übersicht nachlesbar.
export const grammar = [
  {
    id: 'intro', title: 'So funktioniert Spanisch', icon: 'fa-compass', beforeLesson: 1,
    pages: [
      { heading: 'Eine romanische Sprache', html: `
        <p>Spanisch gehört zu den <b>romanischen Sprachen</b> (aus dem Latein entstanden) und wird von über 500 Millionen Menschen gesprochen. Für Deutsche ist es eine der zugänglichsten Sprachen: Man spricht fast alles <b>so, wie man es schreibt</b>.</p>
        <p>Die zwei großen Unterschiede zum Deutschen, an die du dich gewöhnen wirst:</p>
        <ul>
          <li>Verben werden <b>stark konjugiert</b> — dafür lässt man die Personalpronomen meist weg (<i>hablo</i> allein heißt schon „ich spreche").</li>
          <li>Adjektive stehen meist <b>nach</b> dem Substantiv und passen sich ihm an: <i>la casa blanca</i> — das weiße Haus.</li>
        </ul>` },
      { heading: 'Aussprache: fast alles wie geschrieben', html: `
        <p>Diese wenigen Regeln decken fast alles ab:</p>
        <table class="gr-table">
          <tr><th>Schreibung</th><th>Aussprache</th><th>Beispiel</th></tr>
          <tr><td>ñ</td><td>„nj"</td><td><i>mañana</i> → manjana</td></tr>
          <tr><td>ll / y</td><td>„j"</td><td><i>llamar</i> → jamar</td></tr>
          <tr><td>j (+ g vor e/i)</td><td>raues „ch" wie in Bach</td><td><i>jardín</i>, <i>gente</i></td></tr>
          <tr><td>z (+ c vor e/i)</td><td>gelispeltes „th" (Spanien)</td><td><i>zapato</i>, <i>cielo</i></td></tr>
          <tr><td>h</td><td>immer stumm</td><td><i>hola</i> → ola</td></tr>
          <tr><td>qu</td><td>„k"</td><td><i>queso</i> → keso</td></tr>
          <tr><td>v</td><td>wie „b"</td><td><i>vino</i> → bino</td></tr>
        </table>
        <p><b>Betonung:</b> Wörter auf Vokal, -n oder -s betont man auf der <b>vorletzten</b> Silbe, alle anderen auf der letzten. Ausnahmen tragen einen <b>Akzent</b>: <i>café</i>, <i>música</i> — der Strich zeigt dir also immer die betonte Silbe.</p>` },
    ],
  },
  {
    id: 'nouns', title: 'Substantive, Artikel & Adjektive', icon: 'fa-cube', beforeLesson: 2,
    pages: [
      { heading: 'Männlich oder weiblich', html: `
        <p>Jedes Substantiv ist <b>männlich oder weiblich</b> — ein sächliches „das" gibt es nicht. Meist verrät die Endung das Geschlecht:</p>
        <table class="gr-table">
          <tr><th></th><th>männlich</th><th>weiblich</th></tr>
          <tr><td>typische Endung</td><td><b>-o</b>: <i>el libro</i></td><td><b>-a</b>: <i>la casa</i></td></tr>
          <tr><td>bestimmter Artikel</td><td><b>el</b> / Plural <b>los</b></td><td><b>la</b> / Plural <b>las</b></td></tr>
          <tr><td>unbestimmter Artikel</td><td><b>un</b> libro</td><td><b>una</b> casa</td></tr>
        </table>
        <p><b>Plural</b>: einfach <b>-s</b> anhängen (nach Konsonant <b>-es</b>): <i>libro → libros</i>, <i>ciudad → ciudades</i>.</p>` },
      { heading: 'Adjektive passen sich an', html: `
        <p>Adjektive richten sich in <b>Geschlecht und Zahl</b> nach ihrem Substantiv und stehen meist dahinter:</p>
        <ul>
          <li><i>el gato <b>negro</b></i> — die schwarze Katze (m.)</li>
          <li><i>la casa <b>negra</b></i> — das schwarze Haus (w.)</li>
          <li><i>los gatos <b>negros</b></i>, <i>las casas <b>negras</b></i> — Plural</li>
        </ul>
        <div class="grammar-tip">💡 Adjektive auf <b>-e</b> (wie <i>grande</i>, <i>verde</i>) haben nur eine Form für männlich und weiblich.</div>` },
    ],
  },
  {
    id: 'verbs', title: 'Verben: -ar, -er, -ir', icon: 'fa-bolt', beforeLesson: 4,
    pages: [
      { heading: 'Die drei Konjugationen im Präsens', html: `
        <p>Alle spanischen Verben enden auf <b>-ar, -er oder -ir</b>. Man streicht die Endung und hängt die Personalendung an. Weil jede Person ihre eigene Endung hat, kann das Pronomen wegfallen:</p>
        <table class="gr-table">
          <tr><th>Person</th><th>habl<b>ar</b> (sprechen)</th><th>com<b>er</b> (essen)</th><th>viv<b>ir</b> (leben)</th></tr>
          <tr><td>yo (ich)</td><td>habl<b>o</b></td><td>com<b>o</b></td><td>viv<b>o</b></td></tr>
          <tr><td>tú (du)</td><td>habl<b>as</b></td><td>com<b>es</b></td><td>viv<b>es</b></td></tr>
          <tr><td>él/ella (er/sie)</td><td>habl<b>a</b></td><td>com<b>e</b></td><td>viv<b>e</b></td></tr>
          <tr><td>nosotros (wir)</td><td>habl<b>amos</b></td><td>com<b>emos</b></td><td>viv<b>imos</b></td></tr>
          <tr><td>vosotros (ihr)</td><td>habl<b>áis</b></td><td>com<b>éis</b></td><td>viv<b>ís</b></td></tr>
          <tr><td>ellos/ellas (sie)</td><td>habl<b>an</b></td><td>com<b>en</b></td><td>viv<b>en</b></td></tr>
        </table>
        <div class="grammar-tip">💡 <i>Hablo español</i> = „Ich spreche Spanisch" — das <i>yo</i> ist überflüssig, die Endung <b>-o</b> sagt schon „ich". Pronomen benutzt man nur zur Betonung.</div>` },
      { heading: 'Die drei unentbehrlichen Verben', html: `
        <table class="gr-table">
          <tr><th>Person</th><th>ser (sein)</th><th>estar (sein)</th><th>tener (haben)</th></tr>
          <tr><td>yo</td><td>soy</td><td>estoy</td><td>tengo</td></tr>
          <tr><td>tú</td><td>eres</td><td>estás</td><td>tienes</td></tr>
          <tr><td>él/ella</td><td>es</td><td>está</td><td>tiene</td></tr>
          <tr><td>nosotros</td><td>somos</td><td>estamos</td><td>tenemos</td></tr>
          <tr><td>vosotros</td><td>sois</td><td>estáis</td><td>tenéis</td></tr>
          <tr><td>ellos/ellas</td><td>son</td><td>están</td><td>tienen</td></tr>
        </table>
        <p>Ja, Spanisch hat <b>zwei Verben für „sein"</b> — das nächste Grammatik-Kapitel erklärt den Unterschied genau.</p>` },
    ],
  },
  {
    id: 'serestar', title: 'ser oder estar?', icon: 'fa-scale-balanced', beforeLesson: 7,
    pages: [
      { heading: 'Wesen oder Zustand', html: `
        <p>Die goldene Regel: <b>ser</b> für <b>dauerhafte Eigenschaften</b> (was etwas <i>ist</i>), <b>estar</b> für <b>Zustände und Orte</b> (wie/wo etwas gerade <i>ist</i>).</p>
        <table class="gr-table">
          <tr><th>ser (Wesen)</th><th>estar (Zustand/Ort)</th></tr>
          <tr><td><i>Soy alemán.</i> — Ich bin Deutscher.</td><td><i>Estoy cansado.</i> — Ich bin (gerade) müde.</td></tr>
          <tr><td><i>Es profesora.</i> — Sie ist Lehrerin.</td><td><i>Está en casa.</i> — Sie ist zu Hause.</td></tr>
          <tr><td><i>El café es amargo.</i> — Kaffee ist (generell) bitter.</td><td><i>El café está frío.</i> — Der Kaffee ist (jetzt) kalt.</td></tr>
        </table>
        <p>Dazu kommt <b>hay</b> = „es gibt": <i>Hay un banco aquí.</i> — Es gibt hier eine Bank.</p>
        <div class="grammar-tip">💡 Eselsbrücke: <b>ser</b> = <b>S</b>ubstanz (dauerhaft), <b>estar</b> = <b>St</b>atus & <b>St</b>andort.</div>` },
    ],
  },
  {
    id: 'questions', title: 'Fragen & Verneinung', icon: 'fa-circle-question', beforeLesson: 11,
    pages: [
      { heading: '¿Auf den Kopf gestellt?', html: `
        <p>Fragen erkennst du an den <b>umgedrehten Zeichen</b> ¿ und ¡ am Satzanfang. Die Wortstellung ändert sich kaum — oft reicht die Satzmelodie: <i>¿Hablas español?</i> — Sprichst du Spanisch?</p>
        <table class="gr-table">
          <tr><th>Fragewort</th><th>Deutsch</th><th>Beispiel</th></tr>
          <tr><td>qué</td><td>was</td><td><i>¿Qué es esto?</i> — Was ist das?</td></tr>
          <tr><td>dónde</td><td>wo</td><td><i>¿Dónde vives?</i> — Wo wohnst du?</td></tr>
          <tr><td>quién</td><td>wer</td><td><i>¿Quién es?</i> — Wer ist das?</td></tr>
          <tr><td>cuándo</td><td>wann</td><td><i>¿Cuándo comemos?</i> — Wann essen wir?</td></tr>
          <tr><td>por qué</td><td>warum</td><td><i>¿Por qué no?</i> — Warum nicht?</td></tr>
          <tr><td>cómo</td><td>wie</td><td><i>¿Cómo estás?</i> — Wie geht's dir?</td></tr>
          <tr><td>cuánto</td><td>wie viel</td><td><i>¿Cuánto cuesta?</i> — Wie viel kostet das?</td></tr>
        </table>
        <p><b>Verneinung</b>: einfach <b>no</b> vor das Verb: <i><b>No</b> hablo francés.</i> — Ich spreche kein Französisch. Doppelte Verneinung ist korrekt: <i>No veo <b>nada</b>.</i> — Ich sehe nichts.</p>` },
    ],
  },
  {
    id: 'past', title: 'Vergangenheit & Zukunft', icon: 'fa-clock-rotate-left', beforeLesson: 16,
    pages: [
      { heading: 'Das Perfekt: he hablado', html: `
        <p>Für „ich habe gesprochen" nutzt du <b>haber</b> + Partizip. Das Partizip endet auf <b>-ado</b> (-ar) bzw. <b>-ido</b> (-er/-ir):</p>
        <table class="gr-table">
          <tr><th>Person</th><th>haber</th><th>+ Partizip</th></tr>
          <tr><td>yo</td><td>he</td><td rowspan="6">habl<b>ado</b> (gesprochen)<br>com<b>ido</b> (gegessen)<br>viv<b>ido</b> (gelebt)</td></tr>
          <tr><td>tú</td><td>has</td></tr>
          <tr><td>él/ella</td><td>ha</td></tr>
          <tr><td>nosotros</td><td>hemos</td></tr>
          <tr><td>vosotros</td><td>habéis</td></tr>
          <tr><td>ellos</td><td>han</td></tr>
        </table>
        <p><i>He comido mucho.</i> — Ich habe viel gegessen.</p>` },
      { heading: 'Einfache Zukunft: ir a', html: `
        <p>Die gesprochene Zukunft bildet man fast immer mit <b>ir a</b> + Infinitiv („gehen zu" = „werden"):</p>
        <ul>
          <li><i>Voy a comer.</i> — Ich werde essen. / Ich esse gleich.</li>
          <li><i>Vamos a viajar a España.</i> — Wir werden nach Spanien reisen.</li>
        </ul>
        <p>Dafür brauchst du nur <b>ir</b> (gehen): <i>voy, vas, va, vamos, vais, van</i>.</p>
        <div class="grammar-tip">💡 Für erzählte Vergangenheit („ich sprach") gibt es das Indefinido (<i>hablé, comí, viví</i>) — das lohnt sich, sobald du Geschichten erzählen willst.</div>` },
    ],
  },
];
