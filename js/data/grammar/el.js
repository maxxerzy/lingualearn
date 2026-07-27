// Grammatik-Kapitel Griechisch — werden im Lernkurs vor der jeweiligen
// Lektion (beforeLesson) eingeschoben und sind in der Übersicht nachlesbar.
export const grammar = [
  {
    id: 'intro', title: 'Das griechische Alphabet', icon: 'fa-compass', beforeLesson: 1,
    pages: [
      { heading: '24 Buchstaben — viele alte Bekannte', html: `
        <p>Neugriechisch benutzt das älteste Alphabet Europas. Aus Mathe und Physik kennst du schon viele Zeichen (π, Σ, Ω …). Die wichtigsten Buchstaben:</p>
        <table class="gr-table">
          <tr><th>Buchstabe</th><th>Name</th><th>Klang</th></tr>
          <tr><td>Α α</td><td>Alpha</td><td>a</td></tr>
          <tr><td>Β β</td><td>Wita</td><td><b>w</b> (nicht b!)</td></tr>
          <tr><td>Γ γ</td><td>Gamma</td><td>weiches g/j</td></tr>
          <tr><td>Δ δ</td><td>Delta</td><td>engl. weiches th („this")</td></tr>
          <tr><td>Ε ε / Η η / Ι ι / Υ υ</td><td>—</td><td>e / i / i / i</td></tr>
          <tr><td>Θ θ</td><td>Thita</td><td>engl. hartes th („think")</td></tr>
          <tr><td>Κ κ / Λ λ / Μ μ / Ν ν</td><td>—</td><td>k / l / m / n</td></tr>
          <tr><td>Ξ ξ</td><td>Xi</td><td>x</td></tr>
          <tr><td>Π π / Ρ ρ / Τ τ</td><td>—</td><td>p / r / t</td></tr>
          <tr><td>Σ σ/ς</td><td>Sigma</td><td>s (ς nur am Wortende)</td></tr>
          <tr><td>Φ φ / Χ χ / Ψ ψ</td><td>—</td><td>f / ch / ps</td></tr>
          <tr><td>Ω ω</td><td>Omega</td><td>o</td></tr>
        </table>
        <div class="grammar-tip">💡 In der App steht unter jedem Wort die <b>Umschrift</b> — beim Tippen darfst du sie statt der griechischen Schrift benutzen.</div>` },
      { heading: 'Akzent & Buchstaben-Kombis', html: `
        <ul>
          <li>Jedes mehrsilbige Wort trägt einen <b>Akzent</b> (τόνος) auf der betonten Silbe: <i>καλημέρα</i> — kali<b>mé</b>ra. Du siehst also immer, wo betont wird!</li>
          <li>Wichtige Kombinationen: <b>ου</b> = „u" (<i>σούπα</i> — Suppe), <b>αι</b> = „ä", <b>ει/οι</b> = „i", <b>μπ</b> = „b", <b>ντ</b> = „d", <b>γκ</b> = „g".</li>
          <li>Das griechische Fragezeichen ist ein <b>Semikolon</b>: <i>Τι κάνεις<b>;</b></i> — Wie geht's?</li>
        </ul>` },
    ],
  },
  {
    id: 'nouns', title: 'Artikel & Substantive', icon: 'fa-cube', beforeLesson: 2,
    pages: [
      { heading: 'Drei Geschlechter mit Artikel', html: `
        <p>Wie im Deutschen gibt es <b>drei Geschlechter</b> — und der Artikel wird überall mitbenutzt (sogar vor Namen: <i>ο Γιώργος</i> — „der Jorgos"):</p>
        <table class="gr-table">
          <tr><th>Genus</th><th>Artikel Sg.</th><th>typische Endung</th><th>Beispiel</th></tr>
          <tr><td>männlich</td><td><b>ο</b></td><td>-ος, -ας, -ης</td><td><i>ο δρόμος</i> — die Straße</td></tr>
          <tr><td>weiblich</td><td><b>η</b></td><td>-α, -η</td><td><i>η μέρα</i> — der Tag</td></tr>
          <tr><td>sächlich</td><td><b>το</b></td><td>-ο, -ι, -μα</td><td><i>το σπίτι</i> — das Haus</td></tr>
        </table>
        <p>Plural-Artikel: <b>οι</b> (m./w.), <b>τα</b> (n.): <i>οι δρόμοι, τα σπίτια</i>. Unbestimmt: <b>ένας/μία/ένα</b> — ein/eine.</p>` },
    ],
  },
  {
    id: 'verbs', title: 'Verben: Endungen statt Pronomen', icon: 'fa-bolt', beforeLesson: 4,
    pages: [
      { heading: 'Präsens auf -ω', html: `
        <p>Wie im Spanischen steckt die Person in der <b>Endung</b> — Pronomen lässt man meist weg:</p>
        <table class="gr-table">
          <tr><th>Person</th><th>κάνω (machen)</th><th>Umschrift</th></tr>
          <tr><td>ich</td><td>κάν<b>ω</b></td><td>káno</td></tr>
          <tr><td>du</td><td>κάν<b>εις</b></td><td>kánis</td></tr>
          <tr><td>er/sie/es</td><td>κάν<b>ει</b></td><td>káni</td></tr>
          <tr><td>wir</td><td>κάν<b>ουμε</b></td><td>kánume</td></tr>
          <tr><td>ihr/Sie</td><td>κάν<b>ετε</b></td><td>kánete</td></tr>
          <tr><td>sie</td><td>κάν<b>ουν</b></td><td>kánun</td></tr>
        </table>
        <p><i>Τι κάνεις;</i> — wörtlich „Was machst du?" = Wie geht es dir?</p>` },
      { heading: 'είμαι (sein) und έχω (haben)', html: `
        <table class="gr-table">
          <tr><th>Person</th><th>είμαι (sein)</th><th>έχω (haben)</th></tr>
          <tr><td>ich</td><td>είμαι</td><td>έχω</td></tr>
          <tr><td>du</td><td>είσαι</td><td>έχεις</td></tr>
          <tr><td>er/sie/es</td><td>είναι</td><td>έχει</td></tr>
          <tr><td>wir</td><td>είμαστε</td><td>έχουμε</td></tr>
          <tr><td>ihr/Sie</td><td>είστε</td><td>έχετε</td></tr>
          <tr><td>sie</td><td>είναι</td><td>έχουν</td></tr>
        </table>
        <p><i>Είμαι από τη Γερμανία.</i> — Ich bin aus Deutschland. · <i>Έχω μία ερώτηση.</i> — Ich habe eine Frage.</p>
        <div class="grammar-tip">💡 <i>είναι</i> heißt gleichzeitig „er/sie/es ist" UND „sie sind" — der Zusammenhang entscheidet.</div>` },
    ],
  },
  {
    id: 'cases', title: 'Die Fälle des Griechischen', icon: 'fa-layer-group', beforeLesson: 7,
    pages: [
      { heading: 'Vier Fälle — meist reicht der Artikel', html: `
        <p>Neugriechisch hat vier Fälle (Nominativ, Genitiv, Akkusativ, Vokativ) — dekliniert wird vor allem der <b>Artikel</b>:</p>
        <table class="gr-table">
          <tr><th>Fall</th><th>m.</th><th>w.</th><th>n.</th><th>Gebrauch</th></tr>
          <tr><td>Nominativ</td><td>ο</td><td>η</td><td>το</td><td>Subjekt</td></tr>
          <tr><td>Genitiv</td><td>του</td><td>της</td><td>του</td><td>Besitz: <i>το σπίτι <b>της</b> Μαρίας</i></td></tr>
          <tr><td>Akkusativ</td><td>τον</td><td>την</td><td>το</td><td>Objekt + nach Präpositionen</td></tr>
        </table>
        <p>Beispiel: <i>Βλέπω <b>τον</b> δρόμο.</i> — Ich sehe die Straße (Akkusativ).</p>
        <div class="grammar-tip">💡 Nach σε (in/nach), από (von/aus), με (mit), για (für) steht immer der <b>Akkusativ</b> — einfacher als im Deutschen!</div>` },
    ],
  },
  {
    id: 'questions', title: 'Fragen & Verneinung', icon: 'fa-circle-question', beforeLesson: 11,
    pages: [
      { heading: 'Fragen mit dem Strichpunkt', html: `
        <p>Ja/Nein-Fragen entstehen <b>nur durch die Satzmelodie</b> — geschrieben mit dem griechischen Fragezeichen „;":</p>
        <ul>
          <li><i>Μιλάς γερμανικά<b>;</b></i> — Sprichst du Deutsch?</li>
        </ul>
        <table class="gr-table">
          <tr><th>Fragewort</th><th>Umschrift</th><th>Deutsch</th></tr>
          <tr><td>τι</td><td>ti</td><td>was</td></tr>
          <tr><td>πού</td><td>pu</td><td>wo</td></tr>
          <tr><td>ποιος</td><td>pjos</td><td>wer</td></tr>
          <tr><td>πότε</td><td>póte</td><td>wann</td></tr>
          <tr><td>γιατί</td><td>jatí</td><td>warum</td></tr>
          <tr><td>πώς</td><td>pos</td><td>wie</td></tr>
          <tr><td>πόσο</td><td>póso</td><td>wie viel</td></tr>
        </table>
        <p><b>Verneinung</b>: <b>δεν</b> vor dem Verb: <i><b>Δεν</b> καταλαβαίνω.</i> — Ich verstehe nicht. „Nein" = <b>όχι</b>, „ja" = <b>ναι</b> (Achtung: klingt wie „nee", heißt aber JA!).</p>` },
    ],
  },
  {
    id: 'past', title: 'Vergangenheit & Zukunft', icon: 'fa-clock-rotate-left', beforeLesson: 16,
    pages: [
      { heading: 'Aorist: die Erzählvergangenheit', html: `
        <p>Die wichtigste Vergangenheitsform ist der <b>Aorist</b> („ich machte / habe gemacht"). Kennzeichen: Endung <b>-α</b> und Betonung rutscht nach vorn, oft mit <b>έ-</b> davor:</p>
        <table class="gr-table">
          <tr><th>Präsens</th><th>Aorist</th><th>Deutsch</th></tr>
          <tr><td>κάνω</td><td><b>έκανα</b></td><td>ich machte</td></tr>
          <tr><td>έχω</td><td><b>είχα</b></td><td>ich hatte</td></tr>
          <tr><td>είμαι</td><td><b>ήμουν</b></td><td>ich war</td></tr>
          <tr><td>θέλω (wollen)</td><td><b>ήθελα</b></td><td>ich wollte</td></tr>
        </table>
        <p>Die Personalendungen bleiben vertraut: <i>έκανα, έκανες, έκανε, κάναμε, κάνατε, έκαναν</i>.</p>` },
      { heading: 'Zukunft mit θα', html: `
        <p>Zukunft ist ein Kinderspiel: einfach <b>θα</b> (tha) vor das Verb:</p>
        <ul>
          <li><i><b>Θα</b> πάω στην Ελλάδα.</i> — Ich werde nach Griechenland fahren.</li>
          <li><i><b>Θα</b> δούμε.</i> — Wir werden sehen.</li>
        </ul>
        <div class="grammar-tip">💡 Drei kleine Wörter für riesige Wirkung: <b>θα</b> (Zukunft), <b>να</b> (dass/zu), <b>δεν</b> (nicht). Wer sie hört, versteht die Satzstruktur sofort.</div>` },
    ],
  },
];
