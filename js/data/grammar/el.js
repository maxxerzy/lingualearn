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
  {
    id: 'adjectives', title: 'Adjektive & Angleichung', icon: 'fa-palette', beforeLesson: 21,
    pages: [
      { heading: 'Das Adjektiv folgt dem Substantiv in allem', html: `
        <p>Geschlecht, Zahl und Fall müssen übereinstimmen. Die Grundendungen <b>-ος, -η, -ο</b> decken die meisten Adjektive ab:</p>
        <p class="grammar-example">ο καλ<b>ός</b> άντρας <span>der gute Mann</span><br>
           η καλ<b>ή</b> γυναίκα <span>die gute Frau</span><br>
           το καλ<b>ό</b> παιδί <span>das gute Kind</span><br>
           οι καλ<b>οί</b> άντρες <span>die guten Männer</span></p>
        <p>Das Adjektiv steht <b>vor</b> dem Substantiv — und der Artikel davor wird mitgebeugt.</p>
        <div class="grammar-tip">💡 Steht das Adjektiv allein hinter dem Verb, fällt der Artikel weg: <i>Ο άντρας είναι καλός.</i> — Der Mann ist gut.</div>` },
    ],
  },
  {
    id: 'possessive', title: 'Besitz ausdrücken', icon: 'fa-hand-holding', beforeLesson: 28,
    pages: [
      { heading: 'Das Besitzwort steht hinten', html: `
        <p>Anders als im Deutschen hängt der Besitz hinter dem Substantiv — und ist unbetont:</p>
        <table class="grammar-table">
          <tr><th>deutsch</th><th>griechisch</th><th>Beispiel</th></tr>
          <tr><td>mein</td><td>μου</td><td>το σπίτι <b>μου</b> — mein Haus</td></tr>
          <tr><td>dein</td><td>σου</td><td>ο φίλος <b>σου</b> — dein Freund</td></tr>
          <tr><td>sein/ihr</td><td>του / της</td><td>η μητέρα <b>του</b> — seine Mutter</td></tr>
          <tr><td>unser</td><td>μας</td><td>τα παιδιά <b>μας</b> — unsere Kinder</td></tr>
          <tr><td>euer/ihr</td><td>σας / τους</td><td>το αυτοκίνητό <b>τους</b> — ihr Auto</td></tr>
        </table>
        <div class="grammar-tip">💡 Trägt das Substantiv die Betonung auf der drittletzten Silbe, bekommt es einen zweiten Akzent: <i>το αυτοκίνητ<b>ό</b> μου</i>. Das ist keine Schlamperei, sondern Regel.</div>` },
    ],
  },
  {
    id: 'plural', title: 'Mehrzahl & Betonung', icon: 'fa-clone', beforeLesson: 34,
    pages: [
      { heading: 'Die Endung verrät das Geschlecht', html: `
        <table class="grammar-table">
          <tr><th>Geschlecht</th><th>Singular</th><th>Plural</th></tr>
          <tr><td>männlich</td><td>ο φίλ<b>ος</b></td><td>οι φίλ<b>οι</b></td></tr>
          <tr><td>männlich</td><td>ο άντρ<b>ας</b></td><td>οι άντρ<b>ες</b></td></tr>
          <tr><td>weiblich</td><td>η γυναίκ<b>α</b></td><td>οι γυναίκ<b>ες</b></td></tr>
          <tr><td>sächlich</td><td>το παιδ<b>ί</b></td><td>τα παιδ<b>ιά</b></td></tr>
          <tr><td>sächlich</td><td>το βουν<b>ό</b></td><td>τα βουν<b>ά</b></td></tr>
        </table>
        <p>Der Artikel wechselt mit: <b>ο/η/το</b> im Singular, <b>οι/οι/τα</b> im Plural.</p>
        <div class="grammar-tip">💡 Der Akzent wandert manchmal: <i>ο άνθρωπος → οι άνθρωποι</i>, aber <i>το πρόσωπο → τα πρόσωπα</i>. Beim Hören ist das der auffälligste Unterschied.</div>` },
    ],
  },
  {
    id: 'future', title: 'Zukunft mit θα', icon: 'fa-forward', beforeLesson: 41,
    pages: [
      { heading: 'Ein Wörtchen genügt', html: `
        <p>Griechisch bildet die Zukunft mit <b>θα</b> vor dem Verb — keine Hilfsverben, keine Umschreibung:</p>
        <p class="grammar-example">γράφω <span>ich schreibe</span><br>
           <b>θα</b> γράφω <span>ich werde (regelmäßig) schreiben</span><br>
           <b>θα</b> γράψω <span>ich werde (einmal) schreiben</span></p>
        <p>Der Unterschied liegt im <b>Aspekt</b>: Die Form auf <i>-ω</i> beschreibt einen Verlauf, die auf <i>-ψω/-σω</i> eine abgeschlossene Handlung. Diese zweite Form brauchst du auch später beim Aorist.</p>` },
    ],
  },
  {
    id: 'numbers', title: 'Zahlen, Uhrzeit & Datum', icon: 'fa-clock', beforeLesson: 47,
    pages: [
      { heading: 'Nur drei Zahlen werden gebeugt', html: `
        <p><b>ένας/μία/ένα</b> (1), <b>τρεις/τρία</b> (3) und <b>τέσσερις/τέσσερα</b> (4) richten sich nach dem Substantiv — alle übrigen bleiben unverändert.</p>
        <p class="grammar-example">ένας φίλος · μία φίλη · ένα παιδί<br>τρεις μέρες · τρία παιδιά</p>` },
      { heading: 'Wie spät ist es?', html: `
        <p class="grammar-example">Τι ώρα είναι; <span>Wie spät ist es?</span><br>
           Είναι τρεις. <span>Es ist drei.</span><br>
           τρεις <b>και</b> τέταρτο <span>Viertel nach drei</span><br>
           τρεις <b>και</b> μισή <span>halb vier (wörtlich: drei und halb)</span><br>
           τέσσερις <b>παρά</b> τέταρτο <span>Viertel vor vier</span></p>
        <div class="grammar-tip">💡 Achtung: <i>τρεις και μισή</i> heißt 3:30 — anders als im Deutschen zählt Griechisch von der vollen Stunde <b>vorwärts</b>.</div>` },
    ],
  },
  {
    id: 'subjunctive', title: 'να — der Ersatz für den Infinitiv', icon: 'fa-wand-sparkles', beforeLesson: 54,
    pages: [
      { heading: 'Griechisch hat keinen Infinitiv', html: `
        <p>Wo das Deutsche „ich will <b>gehen</b>" sagt, baut Griechisch einen kleinen Nebensatz mit <b>να</b> — und beugt das zweite Verb mit:</p>
        <p class="grammar-example">Θέλω <b>να</b> πάω. <span>Ich will gehen. (wörtlich: ich will, dass ich gehe)</span><br>
           Θέλει <b>να</b> πάει. <span>Er will gehen.</span><br>
           Μπορείς <b>να</b> με βοηθήσεις; <span>Kannst du mir helfen?</span></p>
        <p>Beide Verben stehen in derselben Person. Das ist die wichtigste Konstruktion des Neugriechischen — sie steckt in fast jedem Satz mit zwei Verben.</p>
        <div class="grammar-tip">💡 <b>να</b> drückt auch Wünsche und Aufforderungen aus: <i>Να προσέχεις!</i> — Pass auf!</div>` },
    ],
  },
  {
    id: 'pronouns', title: 'Pronomen & ihre Stellung', icon: 'fa-hand-point-right', beforeLesson: 61,
    pages: [
      { heading: 'Kurze Formen stehen VOR dem Verb', html: `
        <table class="grammar-table">
          <tr><th>Person</th><th>mich/mir</th><th>Beispiel</th></tr>
          <tr><td>1. Sg.</td><td>με / μου</td><td><b>Με</b> βλέπεις. — Du siehst mich.</td></tr>
          <tr><td>2. Sg.</td><td>σε / σου</td><td><b>Σου</b> λέω. — Ich sage dir.</td></tr>
          <tr><td>3. Sg.</td><td>τον/την/το · του/της</td><td><b>Τον</b> ξέρω. — Ich kenne ihn.</td></tr>
        </table>
        <p>Treffen zwei aufeinander, steht das <b>Dativ</b>-Pronomen zuerst: <i><b>Σου το</b> δίνω.</i> — Ich gebe es dir.</p>
        <div class="grammar-tip">💡 Nur beim Imperativ rutschen sie <b>hinter</b> das Verb: <i>Δώσε <b>μου το</b>!</i> — Gib es mir!</div>` },
    ],
  },
  {
    id: 'imperative', title: 'Imperativ & höfliche Bitten', icon: 'fa-bullhorn', beforeLesson: 69,
    pages: [
      { heading: 'Befehlen, bitten, vorschlagen', html: `
        <p class="grammar-example">Γράψε! <span>Schreib!</span> — Γράψτε! <span>Schreibt! / Schreiben Sie!</span><br>
           Έλα! <span>Komm!</span> — Ελάτε! <span>Kommt!</span></p>
        <p>Höflicher wird es mit <b>να</b> oder einer Frage:</p>
        <p class="grammar-example">Να καθίσεις. <span>Setz dich doch.</span><br>
           Μπορείτε να με βοηθήσετε; <span>Können Sie mir helfen?</span></p>
        <p>Verneint wird der Befehl <b>nie</b> mit dem Imperativ, sondern mit <b>μην</b> + Verb: <i>Μην πας!</i> — Geh nicht!</p>` },
    ],
  },
  {
    id: 'comparison', title: 'Steigern & vergleichen', icon: 'fa-ranking-star', beforeLesson: 77,
    pages: [
      { heading: 'πιο — das Allzweckwort', html: `
        <p>Der bequemste Weg: <b>πιο</b> vor das Adjektiv, fertig.</p>
        <p class="grammar-example">μεγάλος → <b>πιο</b> μεγάλος <span>größer</span><br>
           ο <b>πιο</b> μεγάλος <span>der größte</span></p>
        <p>Daneben gibt es die Endung <b>-τερος</b>: <i>μεγαλύ<b>τερος</b></i>. Beide sind richtig; <i>πιο</i> hört man häufiger.</p>
        <p>Verglichen wird mit <b>από</b>: <i>Είναι πιο ψηλός <b>από</b> μένα.</i> — Er ist größer als ich.</p>
        <p>Unregelmäßig: <i>καλός → καλύτερος</i> (gut → besser), <i>κακός → χειρότερος</i> (schlecht → schlechter).</p>` },
    ],
  },
  {
    id: 'aorist', title: 'Aorist & Imperfekt: der Aspekt', icon: 'fa-clock-rotate-left', beforeLesson: 85,
    pages: [
      { heading: 'Zwei Vergangenheiten, zwei Blickwinkel', html: `
        <p>Griechisch fragt nicht „wann", sondern „wie" — punktuell oder andauernd:</p>
        <table class="grammar-table">
          <tr><th>Form</th><th>Blick</th><th>Beispiel</th></tr>
          <tr><td><b>Aorist</b></td><td>einmalig, abgeschlossen</td><td>έγρα<b>ψα</b> — ich schrieb (fertig)</td></tr>
          <tr><td><b>Imperfekt</b></td><td>andauernd, gewohnheitsmäßig</td><td>έγρα<b>φα</b> — ich schrieb (gerade, immer)</td></tr>
        </table>
        <p class="grammar-example">Χθες <b>διάβασα</b> ένα βιβλίο. <span>Gestern las ich ein Buch (zu Ende).</span><br>
           Κάθε μέρα <b>διάβαζα</b>. <span>Jeden Tag las ich.</span></p>` },
      { heading: 'Woran du sie erkennst', html: `
        <p>Beide Vergangenheiten ziehen die Betonung auf die drittletzte Silbe und setzen bei kurzen Verben ein <b>έ-</b> davor (das Augment):</p>
        <p class="grammar-example">γράφω → <b>έ</b>γραψα / <b>έ</b>γραφα<br>
           πηγαίνω → πήγα <span>ich ging</span><br>
           είμαι → ήμουν <span>ich war</span></p>
        <div class="grammar-tip">💡 Der Aorist-Stamm ist derselbe, den du schon beim Futur mit <i>θα</i> gelernt hast: <i>θα γράψω</i> → <i>έγραψα</i>. Einmal gelernt, zweimal genutzt.</div>` },
    ],
  },
  {
    id: 'passive', title: 'Mediopassiv', icon: 'fa-arrows-turn-right', beforeLesson: 94,
    pages: [
      { heading: 'Eine Endung für Passiv und Rückbezug', html: `
        <p>Statt eines Hilfsverbs trägt das Verb selbst die Endung <b>-μαι</b>:</p>
        <p class="grammar-example">πλένω <span>ich wasche</span> → πλέν<b>ομαι</b> <span>ich wasche mich</span><br>
           χάνω <span>ich verliere</span> → χάν<b>ομαι</b> <span>ich verliere mich, gehe verloren</span></p>
        <p>Manche Verben gibt es <b>nur</b> in dieser Form, ohne passive Bedeutung — genau wie die lateinischen Deponentien: <i>έρχομαι</i> (ich komme), <i>κάθομαι</i> (ich sitze), <i>σκέφτομαι</i> (ich denke), <i>θυμάμαι</i> (ich erinnere mich).</p>
        <div class="grammar-tip">💡 Diese Verben lernst du am besten gleich als Ganzes — ein <i>*έρχω</i> gibt es nicht.</div>` },
    ],
  },
  {
    id: 'subclause', title: 'Nebensätze & Bindewörter', icon: 'fa-code-branch', beforeLesson: 105,
    pages: [
      { heading: 'Die wichtigsten Verbindungen', html: `
        <ul>
          <li><b>ότι / πως</b> — dass: <i>Ξέρω ότι έρχεσαι.</i></li>
          <li><b>γιατί</b> — weil (und zugleich das Fragewort „warum")</li>
          <li><b>αν</b> — wenn, falls: <i>Αν έρθεις, θα χαρώ.</i></li>
          <li><b>όταν</b> — wenn, als (Zeitpunkt)</li>
          <li><b>ενώ</b> — während, obwohl</li>
          <li><b>που</b> — der/die/das (Relativpronomen, unveränderlich!)</li>
        </ul>
        <p><b>που</b> ist der bequemste Teil der Sprache: ein einziges Wort für alle Relativsätze, egal welches Geschlecht, welche Zahl, welcher Fall.</p>
        <p class="grammar-example">Ο άντρας <b>που</b> είδα … <span>Der Mann, den ich sah …</span><br>
           Η πόλη <b>που</b> μένω … <span>Die Stadt, in der ich wohne …</span></p>` },
    ],
  },
];
