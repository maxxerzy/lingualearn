// Grammatik-Kapitel Dänisch — werden im Lernkurs vor der jeweiligen
// Lektion (beforeLesson) eingeschoben und sind in der Übersicht nachlesbar.
export const grammar = [
  {
    id: 'intro', title: 'So funktioniert Dänisch', icon: 'fa-compass', beforeLesson: 1,
    pages: [
      { heading: 'Eine germanische Schwestersprache', html: `
        <p>Dänisch ist wie Deutsch eine <b>germanische Sprache</b> — sehr viele Wörter sind mit deutschen oder englischen verwandt: <i>hus</i> = Haus, <i>mand</i> = Mann, <i>drikke</i> = trinken. Diese Verwandtschaft ist dein größter Vorteil: Oft kannst du Wörter erraten.</p>
        <p>Die gute Nachricht vorweg: Die dänische <b>Grammatik ist einfacher als die deutsche</b>. Es gibt nur zwei grammatische Geschlechter, keine Fälle wie im Deutschen (kein „dem/den/des") und Verben ändern sich <b>nicht</b> nach der Person.</p>
        <div class="grammar-tip">💡 Schwierig ist am Dänischen vor allem die <b>Aussprache</b> — geschrieben und gesprochen weichen stark voneinander ab. Nutze deshalb in der App immer die Hör-Knöpfe!</div>` },
      { heading: 'Aussprache & Sonderbuchstaben', html: `
        <p>Dänisch hat drei zusätzliche Buchstaben, die am Ende des Alphabets stehen:</p>
        <table class="gr-table">
          <tr><th>Buchstabe</th><th>Aussprache</th><th>Beispiel</th></tr>
          <tr><td>æ / Æ</td><td>wie deutsches „ä"</td><td><i>æble</i> (Apfel)</td></tr>
          <tr><td>ø / Ø</td><td>wie deutsches „ö"</td><td><i>øl</i> (Bier)</td></tr>
          <tr><td>å / Å</td><td>offenes „o"</td><td><i>år</i> (Jahr)</td></tr>
        </table>
        <p>Weitere Ausspracheregeln:</p>
        <ul>
          <li><b>d nach Vokal</b> wird „weich" — fast wie ein englisches th oder ein l: <i>mad</i> (Essen) klingt etwa wie „mäl".</li>
          <li><b>g am Wortende</b> ist oft stumm oder sehr weich: <i>dag</i> (Tag) ≈ „dä".</li>
          <li>Der <b>Stoßton (stød)</b> ist ein kurzes Stocken in der Stimme — er unterscheidet manchmal Wörter, kommt aber mit dem Hören von allein.</li>
        </ul>` },
    ],
  },
  {
    id: 'nouns', title: 'Substantive & Artikel', icon: 'fa-cube', beforeLesson: 2,
    pages: [
      { heading: 'Zwei Geschlechter: en und et', html: `
        <p>Dänisch kennt nur <b>zwei</b> grammatische Geschlechter: <b>Utrum</b> (en-Wörter, ca. 75 %) und <b>Neutrum</b> (et-Wörter, ca. 25 %). Der unbestimmte Artikel („ein/eine") steht wie im Deutschen davor:</p>
        <table class="gr-table">
          <tr><th></th><th>Dänisch</th><th>Deutsch</th></tr>
          <tr><td>en-Wort</td><td><i>en mand</i></td><td>ein Mann</td></tr>
          <tr><td>et-Wort</td><td><i>et hus</i></td><td>ein Haus</td></tr>
        </table>
        <div class="grammar-tip">💡 Lerne jedes Substantiv gleich <b>mit seinem Artikel</b> („en mand", nicht nur „mand") — genau wie man im Deutschen „der/die/das" mitlernt.</div>` },
      { heading: 'Der bestimmte Artikel hängt hinten dran', html: `
        <p>Die Besonderheit des Dänischen: Der bestimmte Artikel („der/die/das") wird als <b>Endung an das Wort gehängt</b>:</p>
        <table class="gr-table">
          <tr><th>unbestimmt</th><th>bestimmt</th><th>Bedeutung</th></tr>
          <tr><td><i>en mand</i></td><td><i>mand<b>en</b></i></td><td>der Mann</td></tr>
          <tr><td><i>et hus</i></td><td><i>hus<b>et</b></i></td><td>das Haus</td></tr>
          <tr><td><i>en bog</i></td><td><i>bog<b>en</b></i></td><td>das Buch</td></tr>
        </table>
        <p>Der <b>Plural</b> endet meist auf <b>-er</b> oder <b>-e</b>: <i>biler</i> (Autos), <i>huse</i> (Häuser). Bestimmter Plural: Endung <b>-ne</b>: <i>bilerne</i> (die Autos).</p>` },
    ],
  },
  {
    id: 'verbs', title: 'Verben: eine Form für alle', icon: 'fa-bolt', beforeLesson: 4,
    pages: [
      { heading: 'Die beste Nachricht des Dänischen', html: `
        <p>Dänische Verben werden <b>nicht nach der Person konjugiert</b>. Im Präsens gibt es genau <b>eine Form für alle</b> — sie endet fast immer auf <b>-r</b>:</p>
        <table class="gr-table">
          <tr><th>Person</th><th>bo (wohnen)</th><th>Deutsch</th></tr>
          <tr><td>jeg (ich)</td><td>bo<b>r</b></td><td>ich wohn<b>e</b></td></tr>
          <tr><td>du (du)</td><td>bo<b>r</b></td><td>du wohn<b>st</b></td></tr>
          <tr><td>han/hun (er/sie)</td><td>bo<b>r</b></td><td>er/sie wohn<b>t</b></td></tr>
          <tr><td>vi (wir)</td><td>bo<b>r</b></td><td>wir wohn<b>en</b></td></tr>
          <tr><td>I (ihr)</td><td>bo<b>r</b></td><td>ihr wohn<b>t</b></td></tr>
          <tr><td>de (sie)</td><td>bo<b>r</b></td><td>sie wohn<b>en</b></td></tr>
        </table>
        <p>Wo das Deutsche sechs Formen braucht, reicht im Dänischen eine einzige. Die Grundform (Infinitiv) steht mit <b>at</b>: <i>at bo</i> = wohnen.</p>` },
      { heading: 'Die wichtigsten Verben: være und have', html: `
        <p>Wie im Deutschen sind „sein" und „haben" unregelmäßig — aber auch hier gilt: <b>eine Form für alle Personen</b>:</p>
        <table class="gr-table">
          <tr><th>Verb</th><th>Präsens</th><th>Beispiel</th></tr>
          <tr><td>at være (sein)</td><td><b>er</b></td><td><i>Jeg er træt.</i> — Ich bin müde.</td></tr>
          <tr><td>at have (haben)</td><td><b>har</b></td><td><i>Vi har en hund.</i> — Wir haben einen Hund.</td></tr>
          <tr><td>at ville (wollen)</td><td><b>vil</b></td><td><i>Hun vil sove.</i> — Sie will schlafen.</td></tr>
          <tr><td>at kunne (können)</td><td><b>kan</b></td><td><i>Jeg kan se dig.</i> — Ich kann dich sehen.</td></tr>
          <tr><td>at skulle (sollen/werden)</td><td><b>skal</b></td><td><i>Vi skal spise.</i> — Wir werden essen.</td></tr>
        </table>
        <div class="grammar-tip">💡 Merksatz: <i>jeg er, jeg har, jeg kan, jeg vil, jeg skal</i> — mit diesen fünf Formen baust du schon sehr viele Sätze.</div>` },
    ],
  },
  {
    id: 'syntax', title: 'Satzbau & Wortstellung', icon: 'fa-arrows-left-right', beforeLesson: 7,
    pages: [
      { heading: 'Das Verb steht an zweiter Stelle', html: `
        <p>Wie das Deutsche ist Dänisch eine <b>V2-Sprache</b>: Im Aussagesatz steht das konjugierte Verb an <b>zweiter Position</b>.</p>
        <ul>
          <li><i>Jeg <b>drikker</b> kaffe.</i> — Ich trinke Kaffee. (Subjekt–Verb–Objekt)</li>
          <li><i>I dag <b>drikker</b> jeg kaffe.</i> — Heute trinke ich Kaffee. (Nach einer Zeitangabe rücken Verb und Subjekt zusammen — genau wie im Deutschen!)</li>
        </ul>
        <p>Der Grundsatz lautet also: <b>Subjekt – Verb – Objekt</b>, und wenn etwas anderes am Satzanfang steht, kommt das Verb trotzdem an Position 2 — das kennst du aus dem Deutschen.</p>
        <div class="grammar-tip">💡 Anders als im Deutschen wandert das Verb im Nebensatz <b>nicht</b> ans Ende: <i>… at jeg drikker kaffe</i> („… dass ich Kaffee trinke", wörtlich: „dass ich trinke Kaffee").</div>` },
    ],
  },
  {
    id: 'questions', title: 'Fragen & Verneinung', icon: 'fa-circle-question', beforeLesson: 11,
    pages: [
      { heading: 'Fragen stellen', html: `
        <p>Ja/Nein-Fragen bildest du durch <b>Umstellung</b> (Verb zuerst) — wie im Deutschen:</p>
        <ul>
          <li><i>Du er træt.</i> → <i><b>Er</b> du træt?</i> — Bist du müde?</li>
          <li><i>Hun har en bil.</i> → <i><b>Har</b> hun en bil?</i> — Hat sie ein Auto?</li>
        </ul>
        <p>Die wichtigsten Fragewörter:</p>
        <table class="gr-table">
          <tr><th>Dänisch</th><th>Deutsch</th><th>Beispiel</th></tr>
          <tr><td>hvad</td><td>was</td><td><i>Hvad hedder du?</i> — Wie (wörtl.: was) heißt du?</td></tr>
          <tr><td>hvor</td><td>wo</td><td><i>Hvor bor du?</i> — Wo wohnst du?</td></tr>
          <tr><td>hvem</td><td>wer</td><td><i>Hvem er det?</i> — Wer ist das?</td></tr>
          <tr><td>hvornår</td><td>wann</td><td><i>Hvornår spiser vi?</i> — Wann essen wir?</td></tr>
          <tr><td>hvorfor</td><td>warum</td><td><i>Hvorfor ikke?</i> — Warum nicht?</td></tr>
          <tr><td>hvordan</td><td>wie</td><td><i>Hvordan går det?</i> — Wie geht's?</td></tr>
        </table>
        <p><b>Verneinung:</b> Das Wort <b>ikke</b> (nicht) steht direkt nach dem Verb: <i>Jeg drikker <b>ikke</b> kaffe.</i> — Ich trinke keinen Kaffee.</p>` },
    ],
  },
  {
    id: 'past', title: 'Über Vergangenes sprechen', icon: 'fa-clock-rotate-left', beforeLesson: 16,
    pages: [
      { heading: 'Präteritum: -ede und -te', html: `
        <p>Regelmäßige Verben bilden die Vergangenheit mit <b>-ede</b> oder <b>-te</b> — wieder <b>eine Form für alle Personen</b>:</p>
        <table class="gr-table">
          <tr><th>Infinitiv</th><th>Präsens</th><th>Präteritum</th><th>Deutsch</th></tr>
          <tr><td>at bo</td><td>bor</td><td>bo<b>ede</b></td><td>wohnte</td></tr>
          <tr><td>at spise</td><td>spiser</td><td>spis<b>te</b></td><td>aß</td></tr>
          <tr><td>at være</td><td>er</td><td><b>var</b></td><td>war</td></tr>
          <tr><td>at have</td><td>har</td><td><b>havde</b></td><td>hatte</td></tr>
        </table>` },
      { heading: 'Perfekt mit har', html: `
        <p>Das Perfekt („ich habe gegessen") baust du mit <b>har</b> + Partizip — sehr ähnlich zum Deutschen:</p>
        <ul>
          <li><i>Jeg <b>har spist</b>.</i> — Ich habe gegessen.</li>
          <li><i>Vi <b>har boet</b> i København.</i> — Wir haben in Kopenhagen gewohnt.</li>
          <li>Bewegungsverben nehmen <b>er</b>: <i>Hun <b>er gået</b>.</i> — Sie ist gegangen.</li>
        </ul>
        <div class="grammar-tip">💡 Zukunft geht am einfachsten mit <b>skal</b> oder dem Präsens + Zeitangabe: <i>Vi spiser i morgen.</i> — Wir essen morgen.</div>` },
    ],
  },
];
