// Grammatik-Kapitel Französisch — werden im Lernkurs vor der jeweiligen
// Lektion (beforeLesson) eingeschoben und sind in der Übersicht nachlesbar.
export const grammar = [
  {
    id: 'intro', title: 'So funktioniert Französisch', icon: 'fa-compass', beforeLesson: 1,
    pages: [
      { heading: 'Schreiben ≠ Sprechen', html: `
        <p>Französisch ist eine <b>romanische Sprache</b>. Ihre größte Eigenheit: Die Schrift bewahrt alte Formen, die man längst nicht mehr spricht — <b>viele Endungen sind stumm</b>. <i>parlent</i> (sie sprechen) klingt exakt wie <i>parle</i> (er spricht): „parl".</p>
        <ul>
          <li>Stumm am Wortende sind meist: <b>-e, -s, -t, -d, -x, -ent</b> (bei Verben).</li>
          <li><b>Liaison</b>: Vor Vokal wird ein stummer Konsonant plötzlich gesprochen und mit dem nächsten Wort verbunden: <i>vous_avez</i> → „wusawe".</li>
          <li>Betonung: immer sanft auf der <b>letzten</b> gesprochenen Silbe.</li>
        </ul>
        <div class="grammar-tip">💡 Höre dir in der App jedes Wort an — im Französischen ist das Ohr wichtiger als das Auge.</div>` },
      { heading: 'Nasale & Akzente', html: `
        <p>Vier <b>Nasalvokale</b> prägen den französischen Klang — Vokal + n/m wird „durch die Nase" gesprochen, das n/m selbst aber nicht:</p>
        <table class="gr-table">
          <tr><th>Schreibung</th><th>Klang</th><th>Beispiel</th></tr>
          <tr><td>an / en</td><td>nasales „a"</td><td><i>enfant</i> (Kind)</td></tr>
          <tr><td>on</td><td>nasales „o"</td><td><i>bonjour</i></td></tr>
          <tr><td>in / ain / ein</td><td>nasales „ä"</td><td><i>vin</i> (Wein)</td></tr>
          <tr><td>un</td><td>nasales „ö"</td><td><i>un</i> (ein)</td></tr>
        </table>
        <p>Die <b>Akzente</b> ändern nur den Klang des e: <b>é</b> = geschlossenes „e" (wie in „See"), <b>è / ê</b> = offenes „ä". Das <b>ç</b> wird „s" gesprochen (<i>français</i>), <b>u</b> ist immer „ü" (<i>tu</i> = „tü") und <b>ou</b> ist „u" (<i>vous</i> = „wu").</p>` },
    ],
  },
  {
    id: 'nouns', title: 'Artikel & Substantive', icon: 'fa-cube', beforeLesson: 2,
    pages: [
      { heading: 'le, la, les', html: `
        <p>Jedes Substantiv ist <b>männlich oder weiblich</b>. Der Artikel gehört immer dazu:</p>
        <table class="gr-table">
          <tr><th></th><th>männlich</th><th>weiblich</th><th>Plural</th></tr>
          <tr><td>bestimmt</td><td><b>le</b> livre</td><td><b>la</b> maison</td><td><b>les</b> livres</td></tr>
          <tr><td>unbestimmt</td><td><b>un</b> livre</td><td><b>une</b> maison</td><td><b>des</b> livres</td></tr>
        </table>
        <p>Vor Vokal wird le/la zu <b>l'</b>: <i>l'école</i> (die Schule), <i>l'ami</i> (der Freund).</p>
        <p>Der <b>Plural</b> bekommt ein <b>-s</b>, das man aber <b>nicht spricht</b> — hörbar ist der Plural nur am Artikel: <i>le livre</i> „lö liwr" vs. <i>les livres</i> „lä liwr".</p>
        <div class="grammar-tip">💡 Lerne jedes Wort mit Artikel: <i>une maison</i>, <i>un livre</i>. Das Geschlecht ist selten logisch (der Mond = <i>la lune</i>, die Sonne = <i>le soleil</i> — genau umgekehrt zum Deutschen!).</div>` },
    ],
  },
  {
    id: 'verbs', title: 'Verben: -er, être & avoir', icon: 'fa-bolt', beforeLesson: 4,
    pages: [
      { heading: 'Die große -er-Familie', html: `
        <p>Rund 90 % aller Verben enden auf <b>-er</b> und werden gleich konjugiert. Wichtig: Vier der sechs Formen <b>klingen identisch</b>:</p>
        <table class="gr-table">
          <tr><th>Person</th><th>parl<b>er</b> (sprechen)</th><th>gesprochen</th></tr>
          <tr><td>je (ich)</td><td>parl<b>e</b></td><td>„parl"</td></tr>
          <tr><td>tu (du)</td><td>parl<b>es</b></td><td>„parl"</td></tr>
          <tr><td>il/elle (er/sie)</td><td>parl<b>e</b></td><td>„parl"</td></tr>
          <tr><td>nous (wir)</td><td>parl<b>ons</b></td><td>„parlon(g)"</td></tr>
          <tr><td>vous (ihr/Sie)</td><td>parl<b>ez</b></td><td>„parle"</td></tr>
          <tr><td>ils/elles (sie)</td><td>parl<b>ent</b></td><td>„parl"</td></tr>
        </table>
        <p>Vor Vokal wird <i>je</i> zu <b>j'</b>: <i>j'aime</i> — ich liebe/mag.</p>` },
      { heading: 'être und avoir — das Fundament', html: `
        <table class="gr-table">
          <tr><th>Person</th><th>être (sein)</th><th>avoir (haben)</th></tr>
          <tr><td>je/j'</td><td>suis</td><td>ai</td></tr>
          <tr><td>tu</td><td>es</td><td>as</td></tr>
          <tr><td>il/elle</td><td>est</td><td>a</td></tr>
          <tr><td>nous</td><td>sommes</td><td>avons</td></tr>
          <tr><td>vous</td><td>êtes</td><td>avez</td></tr>
          <tr><td>ils/elles</td><td>sont</td><td>ont</td></tr>
        </table>
        <p><i>Je suis fatigué.</i> — Ich bin müde. · <i>Nous avons un chat.</i> — Wir haben eine Katze.</p>
        <div class="grammar-tip">💡 <b>vous</b> ist gleichzeitig „ihr" UND die Höflichkeitsform „Sie" — mit Fremden immer <i>vous</i> benutzen.</div>` },
    ],
  },
  {
    id: 'syntax', title: 'Satzbau', icon: 'fa-arrows-left-right', beforeLesson: 7,
    pages: [
      { heading: 'Feste Reihenfolge: Subjekt–Verb–Objekt', html: `
        <p>Weil man Fälle nicht mehr hört, hält Französisch die Wortstellung <b>streng</b> ein: <b>Subjekt – Verb – Objekt</b>, auch wenn etwas anderes vorn steht (kein V2 wie im Deutschen!):</p>
        <ul>
          <li><i>Je bois du café.</i> — Ich trinke Kaffee.</li>
          <li><i>Aujourd'hui, <b>je bois</b> du café.</i> — Heute trinke ich Kaffee. (wörtlich: „Heute, ich trinke Kaffee")</li>
        </ul>
        <p><b>Adjektive</b> stehen meist <b>nach</b> dem Substantiv (<i>une voiture <b>rouge</b></i> — ein rotes Auto). Nur wenige kurze, häufige stehen davor: <i>grand, petit, bon, beau, jeune, vieux</i> — <i>un <b>petit</b> café</i>.</p>` },
    ],
  },
  {
    id: 'questions', title: 'Fragen & Verneinung', icon: 'fa-circle-question', beforeLesson: 11,
    pages: [
      { heading: 'Drei Wege zu fragen', html: `
        <p>Vom Alltag zur Schriftsprache:</p>
        <ul>
          <li><b>Stimme heben</b>: <i>Tu parles français ?</i></li>
          <li><b>est-ce que</b> davor: <i><b>Est-ce que</b> tu parles français ?</i></li>
          <li><b>Inversion</b> (formell): <i>Parles-<b>tu</b> français ?</i></li>
        </ul>
        <table class="gr-table">
          <tr><th>Fragewort</th><th>Deutsch</th><th>Beispiel</th></tr>
          <tr><td>que / quoi</td><td>was</td><td><i>Qu'est-ce que c'est ?</i> — Was ist das?</td></tr>
          <tr><td>où</td><td>wo</td><td><i>Où habites-tu ?</i> — Wo wohnst du?</td></tr>
          <tr><td>qui</td><td>wer</td><td><i>Qui est-ce ?</i> — Wer ist das?</td></tr>
          <tr><td>quand</td><td>wann</td><td><i>Quand est-ce qu'on mange ?</i></td></tr>
          <tr><td>pourquoi</td><td>warum</td><td><i>Pourquoi pas ?</i> — Warum nicht?</td></tr>
          <tr><td>comment</td><td>wie</td><td><i>Comment ça va ?</i> — Wie geht's?</td></tr>
        </table>
        <p><b>Verneinung in der Zange</b>: <b>ne … pas</b> umschließt das Verb: <i>Je <b>ne</b> parle <b>pas</b> italien.</i> (gesprochen fällt <i>ne</i> oft weg: <i>je parle pas</i>).</p>` },
    ],
  },
  {
    id: 'past', title: 'Vergangenheit & Zukunft', icon: 'fa-clock-rotate-left', beforeLesson: 16,
    pages: [
      { heading: 'Passé composé: j’ai parlé', html: `
        <p>Die Alltagsvergangenheit bildet man mit <b>avoir</b> + Partizip (bei -er-Verben: Endung <b>-é</b>):</p>
        <ul>
          <li><i>J'<b>ai parlé</b> avec Marie.</i> — Ich habe mit Marie gesprochen.</li>
          <li><i>Nous <b>avons mangé</b>.</i> — Wir haben gegessen.</li>
        </ul>
        <p>Bewegungs- und reflexive Verben nehmen <b>être</b> — das Partizip passt sich dann dem Subjekt an: <i>Elle <b>est allée</b> à Paris.</i> — Sie ist nach Paris gegangen.</p>
        <table class="gr-table">
          <tr><th>Infinitiv</th><th>Partizip</th></tr>
          <tr><td>parler</td><td>parl<b>é</b></td></tr>
          <tr><td>finir</td><td>fin<b>i</b></td></tr>
          <tr><td>être / avoir</td><td><b>été</b> / <b>eu</b></td></tr>
          <tr><td>faire (machen)</td><td><b>fait</b></td></tr>
        </table>` },
      { heading: 'Nahe Zukunft: aller + Infinitiv', html: `
        <p>Wie im Spanischen reicht für die Zukunft meist „gehen + Infinitiv":</p>
        <ul>
          <li><i>Je <b>vais manger</b>.</i> — Ich werde (gleich) essen.</li>
          <li><i>On <b>va voyager</b> en France.</i> — Wir werden nach Frankreich reisen.</li>
        </ul>
        <p>Dazu <b>aller</b> (gehen): <i>je vais, tu vas, il va, nous allons, vous allez, ils vont</i>.</p>
        <div class="grammar-tip">💡 <b>on</b> („man") ersetzt im Alltag fast immer <i>nous</i>: <i>On y va !</i> — Los geht's!</div>` },
    ],
  },
];
