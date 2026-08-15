// Grammatik-Kapitel Französisch — werden im Lernkurs vor der jeweiligen
// Lektion (beforeLesson) eingeschoben und sind in der Übersicht nachlesbar.
export const grammar = [
  {
    id: 'intro', title: 'So funktioniert Französisch', icon: 'fa-compass', beforeLesson: 1,
    drills: [
      {"q": "Wie spricht man das Endungs-s in „amis“?", "options": ["gar nicht", "wie s", "wie z", "wie sch"], "answer": 0, "why": "Endkonsonanten bleiben im Französischen meist stumm."},
      {"q": "Was ist eine Liaison?", "options": ["Bindung zum nächsten Wort", "eine Betonung", "ein Akzent", "eine Verneinung"], "answer": 0, "why": "les_amis wird als „lesami“ gesprochen."},
      {"q": "Wie viele Geschlechter hat das Französische?", "options": ["zwei", "drei", "eins", "vier"], "answer": 0, "why": "Männlich und weiblich — ein Neutrum gibt es nicht."},
      {"q": "Wo liegt die Betonung im französischen Wort?", "options": ["auf der letzten Silbe", "auf der ersten", "auf der zweiten", "wechselnd"], "answer": 0, "why": "Immer am Ende der Wortgruppe."},
    ],
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
    drills: [
      {"q": "____ livre (ein Buch)", "options": ["un", "une", "des", "le"], "answer": 0, "why": "livre ist männlich."},
      {"q": "____ maison (ein Haus)", "options": ["une", "un", "des", "la"], "answer": 0, "why": "maison ist weiblich."},
      {"q": "Wie lautet der Plural von „le livre“?", "options": ["les livres", "les livre", "des livre", "la livres"], "answer": 0, "why": "Artikel und Substantiv bekommen beide den Plural."},
      {"q": "Was passiert mit „le“ vor einem Vokal?", "options": ["es wird l’", "es bleibt", "es wird la", "es fällt weg"], "answer": 0, "why": "l’ami, l’heure — die Elision."},
    ],
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
    drills: [
      {"q": "je parl____ (ich spreche)", "options": ["e", "es", "ons", "ent"], "answer": 0, "why": "Die Endung der 1. Person Singular bei -er-Verben."},
      {"q": "nous parl____ (wir sprechen)", "options": ["ons", "ez", "ent", "es"], "answer": 0, "why": "-ons steht für „wir“."},
      {"q": "j’____ (ich habe)", "options": ["ai", "es", "suis", "as"], "answer": 0, "why": "avoir: j’ai, tu as, il a."},
      {"q": "je ____ (ich bin)", "options": ["suis", "es", "ai", "sont"], "answer": 0, "why": "être: je suis, tu es, il est."},
    ],
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
    drills: [
      {"q": "Wie lautet die Grundordnung im französischen Satz?", "options": ["Subjekt – Verb – Objekt", "Verb – Subjekt – Objekt", "Objekt – Verb – Subjekt", "Subjekt – Objekt – Verb"], "answer": 0, "why": "Je mange une pomme."},
      {"q": "Wo steht das Adverb meistens?", "options": ["nach dem Verb", "vor dem Verb", "am Satzanfang", "am Satzende"], "answer": 0, "why": "Je parle bien français."},
      {"q": "Braucht Französisch immer ein Subjekt?", "options": ["ja", "nein", "nur in Fragen", "nur in der Vergangenheit"], "answer": 0, "why": "Anders als im Spanischen steht das Pronomen immer da."},
      {"q": "Il ____ beau aujourd’hui.", "options": ["fait", "est", "a", "va"], "answer": 0, "why": "Wetter wird mit faire gebildet."},
    ],
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
    drills: [
      {"q": "Welche Frageform ist am förmlichsten?", "options": ["die Inversion", "est-ce que", "die Betonung", "alle gleich"], "answer": 0, "why": "Parlez-vous français ? klingt gehobener als Est-ce que vous parlez … ?"},
      {"q": "____ tu viens ? (Kommst du?)", "options": ["Est-ce que", "Qui", "Quoi", "Où"], "answer": 0, "why": "est-ce que macht aus jeder Aussage eine Frage."},
      {"q": "____ habites-tu ? (Wo wohnst du?)", "options": ["Où", "Qui", "Quand", "Comment"], "answer": 0, "why": "où fragt nach dem Ort."},
      {"q": "Je ne parle ____ anglais.", "options": ["pas", "rien", "jamais", "plus"], "answer": 0, "why": "ne … pas umschließt das gebeugte Verb."},
    ],
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
    drills: [
      {"q": "J’____ mangé. (Ich habe gegessen.)", "options": ["ai", "suis", "est", "as"], "answer": 0, "why": "Die meisten Verben bilden das Perfekt mit avoir."},
      {"q": "Elle est allé____ à Paris.", "options": ["e", "", "s", "es"], "answer": 0, "why": "Mit être richtet sich das Partizip nach dem Subjekt."},
      {"q": "Welches Verb nimmt être?", "options": ["aller", "manger", "parler", "faire"], "answer": 0, "why": "Bewegungs- und Zustandsverben sowie alle reflexiven."},
      {"q": "Wie lautet das Partizip von „faire“?", "options": ["fait", "faisé", "fais", "faire"], "answer": 0, "why": "Unregelmäßig: fait."},
    ],
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
  {
    id: 'adjectives', title: 'Adjektive: Angleichung & Stellung', icon: 'fa-palette', beforeLesson: 22,
    drills: [
      {"q": "un livre ____ (ein interessantes Buch)", "options": ["intéressant", "intéressante", "intéressants", "intéressantes"], "answer": 0, "why": "Männlich Singular bleibt in der Grundform."},
      {"q": "une histoire ____", "options": ["intéressante", "intéressant", "intéressants", "intéressante s"], "answer": 0, "why": "Weiblich hängt -e an."},
      {"q": "Welches Adjektiv steht VOR dem Substantiv?", "options": ["beau", "intéressant", "rouge", "français"], "answer": 0, "why": "BAGS: Beauty, Age, Goodness, Size."},
      {"q": "„un ancien professeur“ heißt ____", "options": ["ein ehemaliger Lehrer", "ein alter Lehrer", "ein antiker Lehrer", "ein früher Lehrer"], "answer": 0, "why": "Vorangestellt ändert ancien die Bedeutung."},
    ],
    pages: [
      { heading: 'Meistens hinter dem Substantiv', html: `
        <p>Anders als im Deutschen steht das Adjektiv in der Regel <b>nach</b> dem Substantiv — und richtet sich in Geschlecht und Zahl danach:</p>
        <p class="grammar-example">un livre <b>intéressant</b> · une histoire <b>intéressante</b><br>
           des livres <b>intéressants</b> · des histoires <b>intéressantes</b></p>
        <p>Weiblich: <b>-e</b> anhängen. Plural: <b>-s</b>. Beides zusammen: <b>-es</b>. Endet es schon auf <i>-e</i>, ändert sich nichts.</p>` },
      { heading: 'Die Ausnahmen stehen vorn', html: `
        <p>Eine kleine, aber sehr häufige Gruppe steht <b>vor</b> dem Substantiv — Merkwort <b>BAGS</b>: Beauty, Age, Goodness, Size.</p>
        <p class="grammar-example">un <b>beau</b> jardin · un <b>jeune</b> homme · un <b>bon</b> vin · une <b>grande</b> maison<br>
           auch: petit, gros, nouveau, vieux, joli, mauvais</p>
        <div class="grammar-tip">💡 Manche wechseln mit der Stellung die Bedeutung: <i>un <b>ancien</b> professeur</i> = ein ehemaliger Lehrer, <i>un vase <b>ancien</b></i> = eine antike Vase.</div>` },
    ],
  },
  {
    id: 'partitive', title: 'Der Teilungsartikel', icon: 'fa-utensils', beforeLesson: 29,
    drills: [
      {"q": "Je mange ____ pain.", "options": ["du", "de la", "des", "le"], "answer": 0, "why": "pain ist männlich: du."},
      {"q": "Je bois ____ bière.", "options": ["de la", "du", "des", "la"], "answer": 0, "why": "bière ist weiblich: de la."},
      {"q": "Je ne mange pas ____ pain.", "options": ["de", "du", "de la", "des"], "answer": 0, "why": "Nach der Verneinung schrumpft der Teilungsartikel auf de."},
      {"q": "beaucoup ____ pain", "options": ["de", "du", "de la", "des"], "answer": 0, "why": "Nach jeder Mengenangabe steht nur de."},
    ],
    pages: [
      { heading: 'du, de la, des — „etwas von"', html: `
        <p>Wo das Deutsche gar keinen Artikel setzt, verlangt Französisch einen. „Ich esse Brot" wird zu „ich esse <i>vom</i> Brot":</p>
        <p class="grammar-example">Je mange <b>du</b> pain. <span>männlich</span><br>
           Je bois <b>de la</b> bière. <span>weiblich</span><br>
           Je mange <b>de l'</b>ail. <span>vor Vokal</span><br>
           J'achète <b>des</b> pommes. <span>Plural</span></p>` },
      { heading: 'Nach Verneinung und Mengen: nur de', html: `
        <p>Zwei Regeln, die fast jeder Lernende zuerst falsch macht:</p>
        <p class="grammar-example">Je ne mange pas <b>de</b> pain. <span>nicht „du pain"</span><br>
           beaucoup <b>de</b> pain · un peu <b>de</b> lait · un kilo <b>de</b> pommes</p>
        <div class="grammar-tip">💡 Nach <i>ne … pas</i> und nach jeder Mengenangabe schrumpft der Teilungsartikel auf ein nacktes <b>de</b>. Ausnahme: nach <i>être</i> bleibt er — <i>Ce n'est pas du vin.</i></div>` },
    ],
  },
  {
    id: 'possessive', title: 'Besitz & Demonstrativa', icon: 'fa-hand-holding', beforeLesson: 36,
    drills: [
      {"q": "____ livre (mein Buch)", "options": ["mon", "ma", "mes", "moi"], "answer": 0, "why": "livre ist männlich: mon."},
      {"q": "____ amie (meine Freundin)", "options": ["mon", "ma", "mes", "une"], "answer": 0, "why": "Vor Vokal wird ma zu mon."},
      {"q": "„son livre“ kann heißen ____", "options": ["sein oder ihr Buch", "nur sein Buch", "nur ihr Buch", "ihr Buch (Plural)"], "answer": 0, "why": "Es zählt das Ding, nicht der Besitzer."},
      {"q": "____ homme (dieser Mann)", "options": ["cet", "ce", "cette", "ces"], "answer": 0, "why": "Vor Vokal steht cet."},
    ],
    pages: [
      { heading: 'Es zählt das Ding, nicht der Besitzer', html: `
        <table class="grammar-table">
          <tr><th></th><th>m.</th><th>f.</th><th>Plural</th></tr>
          <tr><td>mein</td><td>mon</td><td>ma</td><td>mes</td></tr>
          <tr><td>dein</td><td>ton</td><td>ta</td><td>tes</td></tr>
          <tr><td>sein/ihr</td><td>son</td><td>sa</td><td>ses</td></tr>
          <tr><td>unser</td><td>notre</td><td>notre</td><td>nos</td></tr>
          <tr><td>euer</td><td>votre</td><td>votre</td><td>vos</td></tr>
          <tr><td>ihr (Pl.)</td><td>leur</td><td>leur</td><td>leurs</td></tr>
        </table>
        <p><b>son livre</b> heißt „sein Buch" <i>und</i> „ihr Buch" — das Französische unterscheidet hier nicht. Nur das Buch zählt.</p>
        <p>Vor Vokal wird <i>ma/ta/sa</i> zu <i>mon/ton/son</i>: <b>mon</b> amie.</p>
        <p>Hinweisend: <b>ce</b> livre, <b>cet</b> homme (vor Vokal), <b>cette</b> maison, <b>ces</b> enfants.</p>` },
    ],
  },
  {
    id: 'future', title: 'Zukunft: proche & simple', icon: 'fa-forward', beforeLesson: 42,
    drills: [
      {"q": "Je ____ partir. (Ich werde gleich losfahren.)", "options": ["vais", "irai", "suis", "ai"], "answer": 0, "why": "Futur proche: aller + Infinitiv."},
      {"q": "je parler____ (ich werde sprechen)", "options": ["ai", "as", "ons", "ez"], "answer": 0, "why": "Futur simple: Infinitiv + Endung."},
      {"q": "Wie lautet der Futur-Stamm von „être“?", "options": ["ser-", "êtr-", "étai-", "soi-"], "answer": 0, "why": "je serai, tu seras …"},
      {"q": "Woher kommen die Futur-Endungen?", "options": ["von avoir im Präsens", "von être", "von aller", "sie sind eigen"], "answer": 0, "why": "ai, as, a, ons, ez, ont."},
    ],
    pages: [
      { heading: 'Zwei Zukunftsformen, klar getrennt', html: `
        <p><b>Futur proche</b> — <i>aller</i> + Infinitiv, für alles Nahe und Geplante:</p>
        <p class="grammar-example">Je <b>vais</b> partir. <span>Ich werde (gleich) losfahren.</span></p>
        <p><b>Futur simple</b> — Infinitiv + Endung, für Fernes, Versprechen, Vorhersagen:</p>
        <table class="grammar-table">
          <tr><td>je parler<b>ai</b></td><td>nous parler<b>ons</b></td></tr>
          <tr><td>tu parler<b>as</b></td><td>vous parler<b>ez</b></td></tr>
          <tr><td>il parler<b>a</b></td><td>ils parler<b>ont</b></td></tr>
        </table>
        <p>Unregelmäßige Stämme, die man kennen muss: <i>être → ser-</i>, <i>avoir → aur-</i>, <i>aller → ir-</i>, <i>faire → fer-</i>, <i>venir → viendr-</i>, <i>pouvoir → pourr-</i>.</p>
        <div class="grammar-tip">💡 Die Endungen sind die Präsensformen von <i>avoir</i> — ai, as, a, ons, ez, ont. Einmal gesehen, nie vergessen.</div>` },
    ],
  },
  {
    id: 'numbers', title: 'Zahlen, Uhrzeit & Datum', icon: 'fa-clock', beforeLesson: 46,
    drills: [
      {"q": "Was heißt 70 auf Französisch?", "options": ["soixante-dix", "septante", "quatre-vingts", "soixante"], "answer": 0, "why": "60 + 10."},
      {"q": "Was heißt 80?", "options": ["quatre-vingts", "octante", "soixante-vingt", "huitante"], "answer": 0, "why": "4 × 20."},
      {"q": "„trois heures et demie“ ist ____", "options": ["3:30", "2:30", "3:15", "4:30"], "answer": 0, "why": "et demie = und halb."},
      {"q": "Welcher Tag nimmt die Ordnungszahl?", "options": ["der Erste", "der Zweite", "alle", "keiner"], "answer": 0, "why": "le premier mai, aber le deux mai."},
    ],
    pages: [
      { heading: 'Ab 70 wird gerechnet', html: `
        <p>Französisch zählt oberhalb von sechzig in Zwanzigerschritten — das ist gewöhnungsbedürftig, aber logisch:</p>
        <table class="grammar-table">
          <tr><td>70</td><td>soixante-dix</td><td>60 + 10</td></tr>
          <tr><td>71</td><td>soixante et onze</td><td>60 + 11</td></tr>
          <tr><td>80</td><td>quatre-vingts</td><td>4 × 20</td></tr>
          <tr><td>90</td><td>quatre-vingt-dix</td><td>4 × 20 + 10</td></tr>
          <tr><td>99</td><td>quatre-vingt-dix-neuf</td><td>4 × 20 + 19</td></tr>
        </table>` },
      { heading: 'Uhrzeit & Datum', html: `
        <p class="grammar-example">Il est trois heures. <span>Es ist drei Uhr.</span><br>
           trois heures <b>et quart</b> <span>Viertel nach drei</span><br>
           trois heures <b>et demie</b> <span>halb vier</span><br>
           quatre heures <b>moins le quart</b> <span>Viertel vor vier</span></p>
        <p>Beim Datum steht die Grundzahl, nur der Erste macht eine Ausnahme: <i>le <b>premier</b> mai</i>, aber <i>le <b>deux</b> mai</i>.</p>` },
    ],
  },
  {
    id: 'pronouns', title: 'Objektpronomen, y und en', icon: 'fa-hand-point-right', beforeLesson: 52,
    drills: [
      {"q": "Je ____ vois. (Ich sehe ihn.)", "options": ["le", "lui", "y", "en"], "answer": 0, "why": "Direktes Objekt: le."},
      {"q": "Je ____ parle. (Ich spreche mit ihm.)", "options": ["lui", "le", "y", "en"], "answer": 0, "why": "Indirektes Objekt: lui."},
      {"q": "J’____ vais. (Ich gehe dorthin.)", "options": ["y", "en", "le", "lui"], "answer": 0, "why": "y ersetzt einen Ort."},
      {"q": "J’____ veux deux. (Ich will zwei davon.)", "options": ["en", "y", "les", "leur"], "answer": 0, "why": "en ersetzt eine Menge oder de + Sache."},
    ],
    pages: [
      { heading: 'Sie stehen vor dem Verb', html: `
        <p class="grammar-example">Je <b>le</b> vois. <span>Ich sehe ihn.</span><br>
           Je <b>lui</b> parle. <span>Ich spreche mit ihm.</span><br>
           Je ne <b>les</b> connais pas. <span>Ich kenne sie nicht.</span></p>
        <p>Direktes Objekt: <b>me, te, le/la, nous, vous, les</b>. Indirektes: <b>me, te, lui, nous, vous, leur</b>.</p>` },
      { heading: 'y und en — zwei kleine Wörter, viel Arbeit', html: `
        <ul>
          <li><b>y</b> ersetzt einen Ort oder <i>à</i> + Sache: <i>J'<b>y</b> vais.</i> — Ich gehe dorthin.</li>
          <li><b>en</b> ersetzt <i>de</i> + Sache oder eine Menge: <i>J'<b>en</b> veux deux.</i> — Ich will zwei davon.</li>
        </ul>
        <p>Treffen mehrere zusammen, gilt diese Reihenfolge: <b>me/te/nous/vous → le/la/les → lui/leur → y → en</b>.</p>
        <p class="grammar-example">Il <b>me le</b> donne. <span>Er gibt es mir.</span><br>
           Il y <b>en</b> a trois. <span>Es gibt drei davon.</span></p>` },
    ],
  },
  {
    id: 'imparfait', title: 'Imparfait oder Passé composé?', icon: 'fa-clock-rotate-left', beforeLesson: 59,
    drills: [
      {"q": "Quand j’étais petit, je ____ au foot.", "options": ["jouais", "ai joué", "jouerai", "joue"], "answer": 0, "why": "Gewohnheit in der Vergangenheit → Imparfait."},
      {"q": "Hier, j’____ au foot.", "options": ["ai joué", "jouais", "joue", "jouerai"], "answer": 0, "why": "Ein einzelnes Ereignis → Passé composé."},
      {"q": "Je dormais quand le téléphone ____.", "options": ["a sonné", "sonnait", "sonne", "sonnera"], "answer": 0, "why": "Hintergrund im Imparfait, Einschnitt im Passé composé."},
      {"q": "Welches Verb hat einen unregelmäßigen Imparfait-Stamm?", "options": ["être", "parler", "finir", "vendre"], "answer": 0, "why": "être → ét- ist die einzige Ausnahme."},
    ],
    pages: [
      { heading: 'Die Frage lautet nicht wann, sondern wie', html: `
        <table class="grammar-table">
          <tr><th>Zeit</th><th>Blick</th><th>Beispiel</th></tr>
          <tr><td><b>Passé composé</b></td><td>Ereignis, abgeschlossen</td><td>J'<b>ai mangé</b>. — Ich habe gegessen.</td></tr>
          <tr><td><b>Imparfait</b></td><td>Zustand, Gewohnheit, Kulisse</td><td>Je <b>mangeais</b>. — Ich aß gerade / immer.</td></tr>
        </table>
        <p class="grammar-example">Quand j'<b>étais</b> petit, je <b>jouais</b> au foot. <span>Kulisse und Gewohnheit</span><br>
           Hier, j'<b>ai joué</b> au foot. <span>ein einzelnes Ereignis</span><br>
           Je <b>dormais</b> quand le téléphone <b>a sonné</b>. <span>Hintergrund + Einschnitt</span></p>` },
      { heading: 'Die Formen', html: `
        <p><b>Imparfait</b>: Stamm der <i>nous</i>-Form + <i>-ais, -ais, -ait, -ions, -iez, -aient</i>. Einzige Ausnahme: <i>être → ét-</i>.</p>
        <p><b>Passé composé</b>: <i>avoir</i> + Partizip — außer bei Bewegungs- und Zustandsverben (aller, venir, partir, arriver, rester, naître, mourir …) und allen reflexiven Verben, die <b>être</b> nehmen.</p>
        <p class="grammar-example">Elle <b>est</b> allé<b>e</b> à Paris. <span>mit être richtet sich das Partizip nach dem Subjekt</span></p>` },
    ],
  },
  {
    id: 'reflexive', title: 'Reflexive Verben', icon: 'fa-rotate', beforeLesson: 67,
    drills: [
      {"q": "je ____ lève (ich stehe auf)", "options": ["me", "te", "se", "nous"], "answer": 0, "why": "1. Person: me."},
      {"q": "Welches Hilfsverb nehmen reflexive Verben im Passé composé?", "options": ["être", "avoir", "aller", "faire"], "answer": 0, "why": "Je me suis levé."},
      {"q": "„se passer“ heißt ____", "options": ["geschehen", "vorbeigehen", "sich beeilen", "sich erinnern"], "answer": 0, "why": "Reflexiv ändert passer seine Bedeutung."},
      {"q": "Welches Verb ist NICHT reflexiv gebräuchlich?", "options": ["manger", "se réveiller", "s’habiller", "se dépêcher"], "answer": 0, "why": "manger steht normalerweise ohne Reflexivpronomen."},
    ],
    pages: [
      { heading: 'Der Alltag steckt voll davon', html: `
        <p class="grammar-example">je <b>me</b> lève · tu <b>te</b> laves · il <b>se</b> couche<br>
           nous <b>nous</b> levons · vous <b>vous</b> levez · ils <b>se</b> lèvent</p>
        <p>Fast der ganze Tagesablauf ist reflexiv: <i>se réveiller</i> (aufwachen), <i>s'habiller</i> (sich anziehen), <i>se dépêcher</i> (sich beeilen), <i>s'amuser</i> (sich amüsieren), <i>se souvenir</i> (sich erinnern).</p>
        <p>Im Passé composé nehmen sie <b>immer être</b>: <i>Je me suis levé.</i></p>
        <div class="grammar-tip">💡 Manche Verben ändern reflexiv ihre Bedeutung: <i>passer</i> (vorbeigehen) → <i>se passer</i> (geschehen); <i>rendre</i> (zurückgeben) → <i>se rendre compte</i> (bemerken).</div>` },
    ],
  },
  {
    id: 'comparison', title: 'Steigern & vergleichen', icon: 'fa-ranking-star', beforeLesson: 74,
    drills: [
      {"q": "Il est ____ grand que moi.", "options": ["plus", "meilleur", "mieux", "très"], "answer": 0, "why": "plus … que für den Vergleich."},
      {"q": "Tu es ____ fort que moi. (genauso stark)", "options": ["aussi", "plus", "moins", "très"], "answer": 0, "why": "aussi … que für Gleichheit."},
      {"q": "bon → ____ (besser)", "options": ["meilleur", "mieux", "plus bon", "bien"], "answer": 0, "why": "meilleur steigert das Adjektiv."},
      {"q": "Il parle ____ que moi. (Er spricht besser.)", "options": ["mieux", "meilleur", "plus bon", "bien"], "answer": 0, "why": "mieux steigert das Adverb — die häufigste Verwechslung."},
    ],
    pages: [
      { heading: 'plus, moins, aussi', html: `
        <p class="grammar-example">Il est <b>plus</b> grand <b>que</b> moi. <span>größer als ich</span><br>
           Elle est <b>moins</b> rapide <b>que</b> lui. <span>weniger schnell als er</span><br>
           Tu es <b>aussi</b> fort <b>que</b> moi. <span>genauso stark wie ich</span></p>
        <p>Superlativ mit Artikel: <i>le plus grand</i>, <i>la plus belle</i>, <i>les plus intéressants</i>.</p>
        <p>Unregelmäßig, aber alltäglich: <i>bon → <b>meilleur</b> → le meilleur</i> und <i>bien → <b>mieux</b> → le mieux</i>.</p>
        <div class="grammar-tip">💡 <b>meilleur</b> steigert ein Adjektiv (ein besserer Wein), <b>mieux</b> ein Adverb (er spricht besser). Diese Verwechslung ist die häufigste überhaupt.</div>` },
    ],
  },
  {
    id: 'subjunctive', title: 'Der Subjonctif', icon: 'fa-wand-sparkles', beforeLesson: 82,
    drills: [
      {"q": "Je veux que tu ____.", "options": ["viennes", "viens", "viendras", "venir"], "answer": 0, "why": "Wille löst den Subjonctif aus."},
      {"q": "Il faut que je ____.", "options": ["parte", "pars", "partirai", "partir"], "answer": 0, "why": "Notwendigkeit löst ihn ebenfalls aus."},
      {"q": "Welches Bindewort verlangt den Subjonctif?", "options": ["bien que", "parce que", "puisque", "quand"], "answer": 0, "why": "bien que, avant que, pour que, jusqu’à ce que."},
      {"q": "Nach welchem Verb steht KEIN Subjonctif?", "options": ["savoir", "vouloir", "douter", "craindre"], "answer": 0, "why": "Verben des Wissens und Sagens nehmen den Indikativ."},
    ],
    pages: [
      { heading: 'Nach Gefühl, Wille und Zweifel', html: `
        <p>Der Subjonctif steht nicht für sich, sondern wird von bestimmten Ausdrücken <b>ausgelöst</b>:</p>
        <ul>
          <li>Wille: <i>Je veux que tu <b>viennes</b>.</i></li>
          <li>Gefühl: <i>Je suis content que tu <b>sois</b> là.</i></li>
          <li>Notwendigkeit: <i>Il faut que je <b>parte</b>.</i></li>
          <li>Zweifel: <i>Je ne pense pas qu'il <b>ait</b> raison.</i></li>
          <li>Bindewörter: <i>bien que</i>, <i>avant que</i>, <i>pour que</i>, <i>jusqu'à ce que</i></li>
        </ul>
        <p>Gebildet aus dem Stamm der <i>ils</i>-Form + <i>-e, -es, -e, -ions, -iez, -ent</i>. Unregelmäßig: <i>être (sois)</i>, <i>avoir (aie)</i>, <i>aller (aille)</i>, <i>faire (fasse)</i>, <i>pouvoir (puisse)</i>, <i>savoir (sache)</i>.</p>
        <div class="grammar-tip">💡 Merksatz: Steht ein <i>que</i> nach einem Verb des Wollens, Fühlens oder Zweifelns, folgt fast sicher der Subjonctif. Nach Verben des Wissens und Sagens dagegen nicht.</div>` },
    ],
  },
  {
    id: 'conditional', title: 'Conditionnel & Bedingungssätze', icon: 'fa-code-branch', beforeLesson: 91,
    drills: [
      {"q": "Je ____ un café. (Ich hätte gern einen Kaffee.)", "options": ["voudrais", "veux", "voudrai", "voulais"], "answer": 0, "why": "Conditionnel für die höfliche Bitte."},
      {"q": "Si j’avais le temps, je ____.", "options": ["viendrais", "viendrai", "viens", "serais venu"], "answer": 0, "why": "si + Imparfait → Conditionnel."},
      {"q": "Si j’ai le temps, je ____.", "options": ["viendrai", "viendrais", "venais", "serais venu"], "answer": 0, "why": "si + Präsens → Futur."},
      {"q": "Was steht NIE nach si?", "options": ["Futur oder Conditionnel", "Imparfait", "Präsens", "Plus-que-parfait"], "answer": 0, "why": "„si je serais“ ist ein hörbarer Fehler."},
    ],
    pages: [
      { heading: 'Höflichkeit und Möglichkeit', html: `
        <p>Futur-Stamm + Imparfait-Endungen — mehr ist es nicht:</p>
        <p class="grammar-example">Je <b>voudrais</b> un café. <span>Ich hätte gern einen Kaffee.</span><br>
           Tu <b>pourrais</b> m'aider ? <span>Könntest du mir helfen?</span></p>` },
      { heading: 'Die drei si-Sätze', html: `
        <table class="grammar-table">
          <tr><th>Bedingung</th><th>Folge</th><th>Beispiel</th></tr>
          <tr><td>si + Präsens</td><td>Futur</td><td>Si j'ai le temps, je viendr<b>ai</b>.</td></tr>
          <tr><td>si + Imparfait</td><td>Conditionnel</td><td>Si j'avais le temps, je viendr<b>ais</b>.</td></tr>
          <tr><td>si + Plus-que-parfait</td><td>Cond. passé</td><td>Si j'avais eu le temps, je serais venu.</td></tr>
        </table>
        <div class="grammar-tip">💡 Eiserne Regel: Nach <b>si</b> steht <b>nie</b> ein Futur und nie ein Conditionnel. Kein „si je serais" — das ist im Französischen ein hörbarer Fehler.</div>` },
    ],
  },
  {
    id: 'relative', title: 'Relativpronomen', icon: 'fa-link', beforeLesson: 101,
    drills: [
      {"q": "L’homme ____ parle …", "options": ["qui", "que", "dont", "où"], "answer": 0, "why": "Folgt direkt ein Verb, steht qui."},
      {"q": "Le livre ____ je lis …", "options": ["que", "qui", "dont", "où"], "answer": 0, "why": "Folgt ein Subjekt, steht que."},
      {"q": "Le film ____ je parle …", "options": ["dont", "que", "qui", "où"], "answer": 0, "why": "dont ersetzt de + Sache."},
      {"q": "La ville ____ j’habite …", "options": ["où", "que", "qui", "dont"], "answer": 0, "why": "où steht für Ort und Zeit."},
    ],
    pages: [
      { heading: 'qui, que, dont, où', html: `
        <table class="grammar-table">
          <tr><th>Wort</th><th>Rolle</th><th>Beispiel</th></tr>
          <tr><td><b>qui</b></td><td>Subjekt</td><td>L'homme <b>qui</b> parle — der Mann, der spricht</td></tr>
          <tr><td><b>que</b></td><td>Objekt</td><td>Le livre <b>que</b> je lis — das Buch, das ich lese</td></tr>
          <tr><td><b>dont</b></td><td>ersetzt <i>de</i></td><td>Le film <b>dont</b> je parle — der Film, von dem ich spreche</td></tr>
          <tr><td><b>où</b></td><td>Ort und Zeit</td><td>La ville <b>où</b> j'habite · le jour <b>où</b> …</td></tr>
        </table>
        <div class="grammar-tip">💡 Faustregel: Folgt direkt ein Verb, steht <b>qui</b>. Folgt ein Subjekt, steht <b>que</b>. Damit sind neun von zehn Fällen entschieden.</div>` },
    ],
  },
  {
    id: 'negation', title: 'Verneinen über ne … pas hinaus', icon: 'fa-ban', beforeLesson: 108,
    drills: [
      {"q": "Je n’ai ____ faim. (Ich habe keinen Hunger mehr.)", "options": ["plus", "pas", "jamais", "rien"], "answer": 0, "why": "ne … plus = nicht mehr."},
      {"q": "Il ne boit ____ de l’eau. (Er trinkt nur Wasser.)", "options": ["que", "pas", "rien", "jamais"], "answer": 0, "why": "ne … que ist keine echte Verneinung, sondern „nur“."},
      {"q": "Je ne vois ____. (Ich sehe niemanden.)", "options": ["personne", "rien", "jamais", "plus"], "answer": 0, "why": "personne = niemand, rien = nichts."},
      {"q": "Was passiert im gesprochenen Französisch mit „ne“?", "options": ["es fällt meist weg", "es wird betont", "es wandert ans Ende", "es wird verdoppelt"], "answer": 0, "why": "J’sais pas — beim Schreiben gehört es aber dazu."},
    ],
    pages: [
      { heading: 'Die Klammer und ihre Varianten', html: `
        <p>Die Verneinung umschließt das gebeugte Verb:</p>
        <table class="grammar-table">
          <tr><td>ne … pas</td><td>nicht</td></tr>
          <tr><td>ne … jamais</td><td>nie</td></tr>
          <tr><td>ne … plus</td><td>nicht mehr</td></tr>
          <tr><td>ne … rien</td><td>nichts</td></tr>
          <tr><td>ne … personne</td><td>niemand</td></tr>
          <tr><td>ne … que</td><td>nur (keine echte Verneinung!)</td></tr>
        </table>
        <p class="grammar-example">Je <b>n'</b>ai <b>plus</b> faim. <span>Ich habe keinen Hunger mehr.</span><br>
           Il <b>ne</b> boit <b>que</b> de l'eau. <span>Er trinkt nur Wasser.</span></p>
        <div class="grammar-tip">💡 Gesprochen fällt das <i>ne</i> fast immer weg: <i>J'sais pas.</i> Beim Schreiben gehört es aber dazu.</div>` },
    ],
  },
];
