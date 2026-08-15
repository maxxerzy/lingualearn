// Grammatik-Kapitel Latein — werden im Lernkurs vor der jeweiligen
// Lektion (beforeLesson) eingeschoben und sind in der Übersicht nachlesbar.
export const grammar = [
  {
    id: 'intro', title: 'So funktioniert Latein', icon: 'fa-compass', beforeLesson: 1,
    pages: [
      { heading: 'Eine Sprache der Endungen', html: `
        <p>Latein ist die Mutter der romanischen Sprachen und funktioniert grundlegend anders als Deutsch oder Englisch: <b>Die Endung eines Wortes sagt, welche Rolle es im Satz spielt.</b> Deshalb gibt es:</p>
        <ul>
          <li><b>keine Artikel</b> — <i>puella</i> heißt „Mädchen", „ein Mädchen" oder „das Mädchen", je nach Zusammenhang,</li>
          <li>eine <b>freie Wortstellung</b> — <i>Puella rosam amat</i> und <i>Rosam puella amat</i> bedeuten beide „Das Mädchen liebt die Rose",</li>
          <li>das <b>Verb meist am Satzende</b>.</li>
        </ul>
        <div class="grammar-tip">💡 Beim Übersetzen ins Deutsche gilt: <b>Erst das Verb am Ende suchen</b>, dann das Subjekt (Nominativ), dann den Rest zuordnen. Genau diese Richtung — Latein → Deutsch — übst du in der App.</div>` },
      { heading: 'Die klassische Aussprache', html: `
        <p>Wir verwenden die <b>klassische Aussprache</b> — so, wie Caesar und Cicero sprachen (und so liest die App dir vor):</p>
        <table class="gr-table">
          <tr><th>Schreibung</th><th>Aussprache</th><th>Beispiel</th></tr>
          <tr><td>c</td><td>immer „k"</td><td><i>Caesar</i> → „Kaisar", <i>Cicero</i> → „Kikero"</td></tr>
          <tr><td>ae</td><td>„ei" (wie dt. „Kaiser")</td><td><i>quaeso</i> → „kweiso"</td></tr>
          <tr><td>oe</td><td>„eu"/„oi"</td><td><i>poena</i> → „peuna"</td></tr>
          <tr><td>v</td><td>wie „w"</td><td><i>vinum</i> → „winum"</td></tr>
          <tr><td>y</td><td>wie „ü"</td><td><i>Syria</i> → „Süria"</td></tr>
          <tr><td>ti</td><td>immer „ti" (nie „zi")</td><td><i>natio</i> → „natio"</td></tr>
        </table>
        <p>Betonung: bei zwei Silben die erste, sonst die <b>vorletzte</b>, wenn sie lang ist — andernfalls die drittletzte.</p>` },
    ],
  },
  {
    id: 'cases', title: 'Die sechs Fälle', icon: 'fa-layer-group', beforeLesson: 2,
    pages: [
      { heading: 'Wer, wessen, wem, wen?', html: `
        <p>Latein hat <b>sechs Fälle</b> (Kasus) — vier kennst du aus dem Deutschen, zwei sind neu:</p>
        <table class="gr-table">
          <tr><th>Fall</th><th>Frage</th><th>Aufgabe im Satz</th></tr>
          <tr><td>Nominativ</td><td>wer/was?</td><td>Subjekt: <i>puella</i> — das Mädchen</td></tr>
          <tr><td>Genitiv</td><td>wessen?</td><td>Besitz: <i>puellae</i> — des Mädchens</td></tr>
          <tr><td>Dativ</td><td>wem?</td><td>Empfänger: <i>puellae</i> — dem Mädchen</td></tr>
          <tr><td>Akkusativ</td><td>wen/was?</td><td>Objekt: <i>puellam</i> — das Mädchen</td></tr>
          <tr><td>Ablativ</td><td>womit/wodurch/wo?</td><td>Umstand: <i>puellā</i> — mit/durch das Mädchen</td></tr>
          <tr><td>Vokativ</td><td>(Anrede)</td><td><i>puella!</i> — Mädchen! / <i>Marce!</i> — Marcus!</td></tr>
        </table>
        <div class="grammar-tip">💡 Der <b>Ablativ</b> ist der „Alleskönner" — er übersetzt sich je nach Zusammenhang mit „mit", „durch", „von", „in" oder als Zeitangabe. Der <b>Vokativ</b> ist die direkte Anrede.</div>` },
    ],
  },
  {
    id: 'declensions', title: 'Deklinationen: a, o & Konsonanten', icon: 'fa-table', beforeLesson: 4,
    pages: [
      { heading: 'a-Deklination (weiblich): rosa', html: `
        <table class="gr-table">
          <tr><th>Fall</th><th>Singular</th><th>Plural</th></tr>
          <tr><td>Nominativ</td><td>ros<b>a</b></td><td>ros<b>ae</b></td></tr>
          <tr><td>Genitiv</td><td>ros<b>ae</b></td><td>ros<b>arum</b></td></tr>
          <tr><td>Dativ</td><td>ros<b>ae</b></td><td>ros<b>is</b></td></tr>
          <tr><td>Akkusativ</td><td>ros<b>am</b></td><td>ros<b>as</b></td></tr>
          <tr><td>Ablativ</td><td>ros<b>ā</b></td><td>ros<b>is</b></td></tr>
        </table>
        <p>So gehen fast alle Wörter auf <b>-a</b>: <i>puella</i> (Mädchen), <i>terra</i> (Erde), <i>aqua</i> (Wasser), <i>via</i> (Weg).</p>` },
      { heading: 'o-Deklination (männlich & sächlich): dominus, templum', html: `
        <table class="gr-table">
          <tr><th>Fall</th><th>m.: Sg. / Pl.</th><th>n.: Sg. / Pl.</th></tr>
          <tr><td>Nominativ</td><td>domin<b>us</b> / domin<b>i</b></td><td>templ<b>um</b> / templ<b>a</b></td></tr>
          <tr><td>Genitiv</td><td>domin<b>i</b> / domin<b>orum</b></td><td>templ<b>i</b> / templ<b>orum</b></td></tr>
          <tr><td>Dativ</td><td>domin<b>o</b> / domin<b>is</b></td><td>templ<b>o</b> / templ<b>is</b></td></tr>
          <tr><td>Akkusativ</td><td>domin<b>um</b> / domin<b>os</b></td><td>templ<b>um</b> / templ<b>a</b></td></tr>
          <tr><td>Ablativ</td><td>domin<b>o</b> / domin<b>is</b></td><td>templ<b>o</b> / templ<b>is</b></td></tr>
        </table>
        <div class="grammar-tip">💡 Bei sächlichen Wörtern (Neutrum) sind Nominativ und Akkusativ <b>immer gleich</b>, im Plural enden sie auf <b>-a</b>.</div>` },
      { heading: 'Konsonantische Deklination: rex', html: `
        <p>Die dritte große Gruppe hat wechselnde Nominativformen — den Wortstamm erkennst du am <b>Genitiv</b>:</p>
        <table class="gr-table">
          <tr><th>Fall</th><th>Singular</th><th>Plural</th></tr>
          <tr><td>Nominativ</td><td><b>rex</b> (König)</td><td>reg<b>es</b></td></tr>
          <tr><td>Genitiv</td><td>reg<b>is</b></td><td>reg<b>um</b></td></tr>
          <tr><td>Dativ</td><td>reg<b>i</b></td><td>reg<b>ibus</b></td></tr>
          <tr><td>Akkusativ</td><td>reg<b>em</b></td><td>reg<b>es</b></td></tr>
          <tr><td>Ablativ</td><td>reg<b>e</b></td><td>reg<b>ibus</b></td></tr>
        </table>
        <p>Ebenso: <i>miles, militis</i> (Soldat), <i>corpus, corporis</i> (Körper), <i>tempus, temporis</i> (Zeit). Deshalb lernt man lateinische Substantive immer <b>mit Genitiv</b>.</p>` },
    ],
  },
  {
    id: 'verbs', title: 'Konjugation: das Subjekt steckt im Verb', icon: 'fa-bolt', beforeLesson: 7,
    pages: [
      { heading: 'Die Personalendungen', html: `
        <p>Lateinische Verben tragen ihr Subjekt in der <b>Endung</b> — Personalpronomen sind unnötig:</p>
        <table class="gr-table">
          <tr><th>Endung</th><th>Person</th><th>amare (lieben)</th><th>Deutsch</th></tr>
          <tr><td><b>-o</b></td><td>ich</td><td>am<b>o</b></td><td>ich liebe</td></tr>
          <tr><td><b>-s</b></td><td>du</td><td>ama<b>s</b></td><td>du liebst</td></tr>
          <tr><td><b>-t</b></td><td>er/sie/es</td><td>ama<b>t</b></td><td>er/sie liebt</td></tr>
          <tr><td><b>-mus</b></td><td>wir</td><td>ama<b>mus</b></td><td>wir lieben</td></tr>
          <tr><td><b>-tis</b></td><td>ihr</td><td>ama<b>tis</b></td><td>ihr liebt</td></tr>
          <tr><td><b>-nt</b></td><td>sie</td><td>ama<b>nt</b></td><td>sie lieben</td></tr>
        </table>
        <div class="grammar-tip">💡 <b>-o, -s, -t, -mus, -tis, -nt</b> — diese sechs Endungen gelten in fast allen Zeiten. Wer sie kennt, erkennt in jedem Satz sofort das Subjekt.</div>` },
      { heading: 'Die vier Konjugationen & esse', html: `
        <p>Nach dem Stammvokal unterscheidet man vier Gruppen (jeweils 3. Person Singular):</p>
        <table class="gr-table">
          <tr><th>Gruppe</th><th>Infinitiv</th><th>er/sie …</th><th>Deutsch</th></tr>
          <tr><td>a-Konjugation</td><td>am<b>are</b></td><td>am<b>at</b></td><td>lieben</td></tr>
          <tr><td>e-Konjugation</td><td>vid<b>ere</b></td><td>vid<b>et</b></td><td>sehen</td></tr>
          <tr><td>konsonantische</td><td>leg<b>ere</b></td><td>leg<b>it</b></td><td>lesen</td></tr>
          <tr><td>i-Konjugation</td><td>aud<b>ire</b></td><td>aud<b>it</b></td><td>hören</td></tr>
        </table>
        <p>Unregelmäßig, aber unverzichtbar — <b>esse</b> (sein):</p>
        <table class="gr-table">
          <tr><th>Person</th><th>esse</th><th>Deutsch</th></tr>
          <tr><td>ich</td><td><b>sum</b></td><td>ich bin</td></tr>
          <tr><td>du</td><td><b>es</b></td><td>du bist</td></tr>
          <tr><td>er/sie/es</td><td><b>est</b></td><td>er/sie ist</td></tr>
          <tr><td>wir</td><td><b>sumus</b></td><td>wir sind</td></tr>
          <tr><td>ihr</td><td><b>estis</b></td><td>ihr seid</td></tr>
          <tr><td>sie</td><td><b>sunt</b></td><td>sie sind</td></tr>
        </table>` },
    ],
  },
  {
    id: 'syntax', title: 'Satzbau & Übersetzen', icon: 'fa-arrows-left-right', beforeLesson: 11,
    pages: [
      { heading: 'Das Verb ans Ende — und zurück', html: `
        <p>Der typische lateinische Satz ist <b>Subjekt – Objekt – Verb</b> (SOV):</p>
        <ul>
          <li><i>Marcus <b>puellam</b> videt.</i> — wörtlich „Marcus das-Mädchen sieht" → Marcus sieht das Mädchen.</li>
          <li><i>Agricola agrum <b>colit</b>.</i> — Der Bauer bestellt den Acker.</li>
        </ul>
        <p><b>Übersetzungs-Rezept</b> (so gehst du bei jedem Satz vor):</p>
        <ul>
          <li>1. Verb am Ende suchen → Person/Zahl ablesen (Endung!).</li>
          <li>2. Nominativ suchen → das Subjekt.</li>
          <li>3. Akkusativ suchen → das Objekt.</li>
          <li>4. Rest (Genitiv, Dativ, Ablativ) zuordnen.</li>
        </ul>
        <p><b>Fragen</b>: Fragewörter wie <i>quis?</i> (wer?), <i>quid?</i> (was?), <i>ubi?</i> (wo?), <i>cur?</i> (warum?) — oder das Anhängsel <b>-ne</b>: <i>Vides<b>ne</b>?</i> — Siehst du? <b>Verneinung</b>: <b>non</b> vor dem Verb.</p>` },
    ],
  },
  {
    id: 'perfect', title: 'Perfekt & Imperfekt', icon: 'fa-clock-rotate-left', beforeLesson: 16,
    pages: [
      { heading: 'Das Perfekt: veni, vidi, vici', html: `
        <p>Das Perfekt erzählt <b>abgeschlossene</b> Ereignisse — es hat eigene Endungen am Perfektstamm:</p>
        <table class="gr-table">
          <tr><th>Person</th><th>Endung</th><th>amare → amav-</th><th>Deutsch</th></tr>
          <tr><td>ich</td><td><b>-i</b></td><td>amav<b>i</b></td><td>ich habe geliebt</td></tr>
          <tr><td>du</td><td><b>-isti</b></td><td>amav<b>isti</b></td><td>du hast geliebt</td></tr>
          <tr><td>er/sie</td><td><b>-it</b></td><td>amav<b>it</b></td><td>er/sie hat geliebt</td></tr>
          <tr><td>wir</td><td><b>-imus</b></td><td>amav<b>imus</b></td><td>wir haben geliebt</td></tr>
          <tr><td>ihr</td><td><b>-istis</b></td><td>amav<b>istis</b></td><td>ihr habt geliebt</td></tr>
          <tr><td>sie</td><td><b>-erunt</b></td><td>amav<b>erunt</b></td><td>sie haben geliebt</td></tr>
        </table>
        <p>Caesars berühmtes <i><b>veni, vidi, vici</b></i> ist genau das: „ich kam, ich sah, ich siegte" — dreimal Perfekt, 1. Person.</p>` },
      { heading: 'Das Imperfekt: -bam', html: `
        <p>Für <b>andauernde oder wiederholte</b> Vergangenheit steht das Imperfekt mit dem Kennzeichen <b>-ba-</b>:</p>
        <ul>
          <li><i>ama<b>bam</b></i> — ich liebte (die ganze Zeit)</li>
          <li><i>vide<b>bat</b></i> — er sah (immer wieder)</li>
          <li><i>era<b>t</b></i> — er/sie war (von esse: <i>eram, eras, erat …</i>)</li>
        </ul>
        <div class="grammar-tip">💡 Faustregel fürs Übersetzen: Perfekt = „hat …" (einmalig), Imperfekt = „… immer/gerade" (Hintergrund). Lateinische Verben lernt man deshalb mit Stammformen: <i>amare, amo, amavi</i>.</div>` },
    ],
  },
  {
    id: 'pronouns', title: 'Pronomen: is, hic, ille', icon: 'fa-hand-point-right', beforeLesson: 21,
    pages: [
      { heading: 'Die Personalpronomen', html: `
        <p>Weil die Endung das Subjekt schon nennt, stehen <i>ego</i> und <i>tu</i> nur zur <b>Betonung</b>: <i>ego venio</i> = „<b>ich</b> komme (nicht du)".</p>
        <table class="grammar-table">
          <tr><th>Fall</th><th>ich</th><th>du</th><th>wir</th><th>ihr</th></tr>
          <tr><td>Nom.</td><td>ego</td><td>tu</td><td>nos</td><td>vos</td></tr>
          <tr><td>Gen.</td><td>mei</td><td>tui</td><td>nostri</td><td>vestri</td></tr>
          <tr><td>Dat.</td><td>mihi</td><td>tibi</td><td>nobis</td><td>vobis</td></tr>
          <tr><td>Akk.</td><td>me</td><td>te</td><td>nos</td><td>vos</td></tr>
        </table>
        <p>Für die 3. Person gibt es kein eigenes Personalpronomen — dafür springt <b>is, ea, id</b> ein (er, sie, es).</p>` },
      { heading: 'Hinweisende Pronomen: der Unterschied zählt', html: `
        <table class="grammar-table">
          <tr><th>Pronomen</th><th>Bedeutung</th><th>zeigt auf</th></tr>
          <tr><td><b>hic, haec, hoc</b></td><td>dieser hier</td><td>was nah ist / gerade gesagt wurde</td></tr>
          <tr><td><b>ille, illa, illud</b></td><td>jener dort</td><td>was fern ist / bekannt ist</td></tr>
          <tr><td><b>is, ea, id</b></td><td>er, sie, es</td><td>neutral, ohne Zeigegeste</td></tr>
          <tr><td><b>ipse, ipsa, ipsum</b></td><td>selbst</td><td>Betonung: <i>Caesar ipse</i> — Caesar persönlich</td></tr>
          <tr><td><b>idem, eadem, idem</b></td><td>derselbe</td><td>Gleichheit</td></tr>
        </table>
        <div class="grammar-tip">💡 In Klausuren gern gefragt: <b>se</b> bezieht sich auf das Subjekt des eigenen Satzes zurück (<i>se lavat</i> — er wäscht <b>sich</b>), <b>eum</b> auf jemand anderen.</div>` },
    ],
  },
  {
    id: 'adjectives', title: 'Adjektive & KNG-Kongruenz', icon: 'fa-palette', beforeLesson: 27,
    pages: [
      { heading: 'Kasus, Numerus, Genus — alle drei müssen stimmen', html: `
        <p>Ein Adjektiv übernimmt <b>Fall, Zahl und Geschlecht</b> seines Substantivs. Die Endungen müssen dabei nicht gleich <i>aussehen</i>:</p>
        <p class="grammar-example">rex bon<b>us</b> <span>der gute König</span><br>
           reg<b>is</b> bon<b>i</b> <span>des guten Königs</span><br>
           naut<b>a</b> bon<b>us</b> <span>der gute Seemann — Endungen verschieden, KNG stimmt</span></p>
        <p>Adjektive der a/o-Deklination gehen wie <i>bonus, bona, bonum</i>. Die zweite große Gruppe folgt der 3. Deklination: <i>fortis, forte</i> (tapfer), <i>omnis, omne</i> (jeder).</p>
        <div class="grammar-tip">💡 Beim Übersetzen: Suche zuerst das Substantiv, dessen KNG zum Adjektiv passt — so lösen sich die meisten langen Sätze von selbst.</div>` },
    ],
  },
  {
    id: 'futures', title: 'Futur & Plusquamperfekt', icon: 'fa-forward', beforeLesson: 34,
    pages: [
      { heading: 'Zwei Wege ins Futur', html: `
        <p>Welches Zeichen das Futur trägt, hängt von der Konjugation ab:</p>
        <table class="grammar-table">
          <tr><th>Konjugation</th><th>Zeichen</th><th>Beispiel</th></tr>
          <tr><td>a- und e-Konj.</td><td><b>-b-</b></td><td>ama<b>b</b>o (ich werde lieben)</td></tr>
          <tr><td>konsonantisch, i-Konj.</td><td><b>-a-/-e-</b></td><td>reg<b>a</b>m, reg<b>e</b>s (ich/du werde/wirst herrschen)</td></tr>
          <tr><td>esse</td><td>eigen</td><td>ero, eris, erit</td></tr>
        </table>
        <div class="grammar-tip">💡 Achtung, klassische Verwechslung: <i>regam</i> kann Futur („ich werde herrschen") oder Konjunktiv sein. Der Zusammenhang entscheidet.</div>` },
      { heading: 'Plusquamperfekt: die Vorvergangenheit', html: `
        <p>Perfektstamm + <b>-eram</b>: das, was <i>vor</i> etwas anderem Vergangenem geschah.</p>
        <p class="grammar-example">ven<b>eram</b> <span>ich war gekommen</span><br>
           vid<b>erat</b> <span>er hatte gesehen</span></p>
        <p>Dazu das <b>Futur II</b> mit <b>-ero</b>: <i>venero</i> — ich werde gekommen sein. In Bedingungssätzen ist es häufiger, als man denkt.</p>` },
    ],
  },
  {
    id: 'pronouns-rel', title: 'Der Relativsatz', icon: 'fa-code-branch', beforeLesson: 43,
    pages: [
      { heading: 'qui, quae, quod', html: `
        <table class="grammar-table">
          <tr><th>Fall</th><th>m.</th><th>f.</th><th>n.</th></tr>
          <tr><td>Nom.</td><td>qui</td><td>quae</td><td>quod</td></tr>
          <tr><td>Gen.</td><td>cuius</td><td>cuius</td><td>cuius</td></tr>
          <tr><td>Dat.</td><td>cui</td><td>cui</td><td>cui</td></tr>
          <tr><td>Akk.</td><td>quem</td><td>quam</td><td>quod</td></tr>
          <tr><td>Abl.</td><td>quo</td><td>qua</td><td>quo</td></tr>
        </table>
        <p>Die Regel, die alles entscheidet: Das Relativpronomen holt sich <b>Zahl und Geschlecht</b> vom Bezugswort — seinen <b>Fall</b> aber aus dem eigenen Nebensatz.</p>
        <p class="grammar-example">Vir, <b>quem</b> video, venit.<br><span>Der Mann, den ich sehe, kommt. — quem: männlich/Singular vom vir, Akkusativ, weil er Objekt von video ist.</span></p>
        <div class="grammar-tip">💡 Steht <i>qui</i> am Satzanfang nach einem Punkt, ist es meist ein <b>relativer Satzanschluss</b> — dann übersetzt man „und dieser …" statt „welcher".</div>` },
    ],
  },
  {
    id: 'aci', title: 'Der AcI — die wichtigste Konstruktion', icon: 'fa-quote-left', beforeLesson: 50,
    pages: [
      { heading: 'Akkusativ mit Infinitiv', html: `
        <p>Nach Verben des Sagens, Meinens und Wahrnehmens baut Latein keinen dass-Satz, sondern hängt <b>Akkusativ + Infinitiv</b> an:</p>
        <p class="grammar-example">Scio <b>te venire</b>.<br><span>Wörtlich: Ich weiß dich kommen. — Gemeint: Ich weiß, <b>dass du kommst</b>.</span></p>
        <p class="grammar-example">Caesar dicit <b>milites fortes esse</b>.<br><span>Caesar sagt, dass die Soldaten tapfer sind.</span></p>
        <p>Der Akkusativ wird im Deutschen zum <b>Subjekt</b> des dass-Satzes, der Infinitiv zum gebeugten Verb.</p>` },
      { heading: 'Die Zeitenfolge im AcI', html: `
        <p>Der Infinitiv sagt nicht, <i>wann</i> etwas geschah, sondern wie es zum Hauptsatz steht:</p>
        <table class="grammar-table">
          <tr><th>Infinitiv</th><th>Verhältnis</th><th>Übersetzung</th></tr>
          <tr><td>Präsens (venire)</td><td>gleichzeitig</td><td>… dass er kommt / kam</td></tr>
          <tr><td>Perfekt (venisse)</td><td>vorzeitig</td><td>… dass er gekommen ist / war</td></tr>
          <tr><td>Futur (venturum esse)</td><td>nachzeitig</td><td>… dass er kommen wird / würde</td></tr>
        </table>
        <div class="grammar-tip">💡 Auslöser erkennen: <i>dicere, putare, sperare, audire, videre, scire, negare</i> — steht danach ein Akkusativ mit Infinitiv, ist es ein AcI.</div>` },
    ],
  },
  {
    id: 'ablatives', title: 'Ablativ absolutus & Partizipien', icon: 'fa-layer-group', beforeLesson: 57,
    pages: [
      { heading: 'Zwei Wörter, ein ganzer Nebensatz', html: `
        <p>Ein Substantiv und ein Partizip, beide im <b>Ablativ</b>, ohne Bezug zum Rest des Satzes — das ist der Ablativus absolutus:</p>
        <p class="grammar-example"><b>Urbe capta</b>, milites redierunt.<br><span>Nachdem die Stadt erobert worden war, kehrten die Soldaten zurück.</span></p>
        <p class="grammar-example"><b>Caesare duce</b>, vicimus.<br><span>Unter Caesars Führung siegten wir.</span></p>
        <p>Die Übersetzung wählst du nach Sinn: <i>nachdem</i>, <i>weil</i>, <i>obwohl</i>, <i>während</i>.</p>` },
      { heading: 'Die drei Partizipien', html: `
        <table class="grammar-table">
          <tr><th>Partizip</th><th>Form</th><th>Zeit</th></tr>
          <tr><td>PPA</td><td>vocans, vocantis</td><td>gleichzeitig, aktiv — rufend</td></tr>
          <tr><td>PPP</td><td>vocatus, -a, -um</td><td>vorzeitig, passiv — gerufen</td></tr>
          <tr><td>PFA</td><td>vocaturus, -a, -um</td><td>nachzeitig, aktiv — rufen werdend</td></tr>
        </table>
        <p>Bezieht sich das Partizip auf ein Wort des Hauptsatzes, ist es ein <b>Participium coniunctum</b> — dann übersetzt man ebenfalls mit einem Nebensatz: <i>Milites urbem capientes …</i> — „Während die Soldaten die Stadt eroberten …".</p>` },
    ],
  },
  {
    id: 'subjunctive', title: 'Der Konjunktiv', icon: 'fa-wand-sparkles', beforeLesson: 66,
    pages: [
      { heading: 'Woran du ihn erkennst', html: `
        <table class="grammar-table">
          <tr><th>Zeit</th><th>Zeichen</th><th>Beispiel</th></tr>
          <tr><td>Präsens</td><td>-e- / -a-</td><td>voc<b>e</b>t, reg<b>a</b>t</td></tr>
          <tr><td>Imperfekt</td><td>Infinitiv + Endung</td><td>voca<b>ret</b>, esse<b>t</b></td></tr>
          <tr><td>Perfekt</td><td>-eri-</td><td>vocav<b>eri</b>t</td></tr>
          <tr><td>Plusquamperfekt</td><td>-isse-</td><td>vocav<b>isse</b>t</td></tr>
        </table>
        <div class="grammar-tip">💡 Der Imperfekt-Konjunktiv ist der leichteste: Infinitiv nehmen, Endung anhängen — <i>vocare</i> + <i>t</i> = <i>vocaret</i>.</div>` },
      { heading: 'Im Hauptsatz und im Nebensatz', html: `
        <p><b>Im Hauptsatz</b> drückt er Wunsch, Aufforderung oder Möglichkeit aus:</p>
        <p class="grammar-example">Gaudeamus! <span>Lasst uns fröhlich sein!</span><br>
           Utinam veniat! <span>Wenn er doch käme!</span></p>
        <p><b>Im Nebensatz</b> steht er nach bestimmten Bindewörtern — <i>ut</i> (dass, damit), <i>ne</i> (dass nicht), <i>cum</i> (als, weil), <i>si</i> (wenn). Übersetzt wird dann meist ganz normal im Indikativ:</p>
        <p class="grammar-example">Venio, <b>ut</b> te vide<b>am</b>. <span>Ich komme, damit ich dich sehe.</span><br>
           <b>Cum</b> Roma<b>e</b> essem … <span>Als ich in Rom war …</span></p>` },
    ],
  },
  {
    id: 'comparison', title: 'Steigern & vergleichen', icon: 'fa-ranking-star', beforeLesson: 75,
    pages: [
      { heading: '-ior und -issimus', html: `
        <p class="grammar-example">altus → alt<b>ior</b> → alt<b>issimus</b><br><span>hoch – höher – am höchsten</span></p>
        <p>Der Komparativ endet auf <b>-ior</b> (Neutrum <b>-ius</b>) und geht nach der 3. Deklination. Der Superlativ auf <b>-issimus, -a, -um</b> folgt der a/o-Deklination.</p>
        <p>Unregelmäßig, aber sehr häufig:</p>
        <table class="grammar-table">
          <tr><th>Positiv</th><th>Komparativ</th><th>Superlativ</th></tr>
          <tr><td>bonus (gut)</td><td>melior</td><td>optimus</td></tr>
          <tr><td>malus (schlecht)</td><td>peior</td><td>pessimus</td></tr>
          <tr><td>magnus (groß)</td><td>maior</td><td>maximus</td></tr>
          <tr><td>parvus (klein)</td><td>minor</td><td>minimus</td></tr>
          <tr><td>multi (viele)</td><td>plures</td><td>plurimi</td></tr>
        </table>` },
      { heading: 'Der Vergleich: quam oder Ablativ', html: `
        <p>Zwei gleichwertige Wege — der Ablativ ist der elegantere:</p>
        <p class="grammar-example">Marcus est altior <b>quam</b> Titus.<br>
           Marcus est altior <b>Tito</b>. <span>beides: Marcus ist größer als Titus.</span></p>
        <p>Vor einem Komparativ heißt <b>quam</b> dagegen „möglichst": <i>quam celerrime</i> — so schnell wie möglich.</p>` },
    ],
  },
  {
    id: 'passive', title: 'Passiv & Deponentien', icon: 'fa-arrows-turn-right', beforeLesson: 86,
    pages: [
      { heading: 'Die Passiv-Endungen', html: `
        <table class="grammar-table">
          <tr><th>Person</th><th>Aktiv</th><th>Passiv</th></tr>
          <tr><td>ich</td><td>voco</td><td>voc<b>or</b></td></tr>
          <tr><td>du</td><td>vocas</td><td>voca<b>ris</b></td></tr>
          <tr><td>er/sie/es</td><td>vocat</td><td>voca<b>tur</b></td></tr>
          <tr><td>wir</td><td>vocamus</td><td>voca<b>mur</b></td></tr>
          <tr><td>ihr</td><td>vocatis</td><td>voca<b>mini</b></td></tr>
          <tr><td>sie</td><td>vocant</td><td>voca<b>ntur</b></td></tr>
        </table>
        <p>Im Perfekt wird das Passiv zusammengesetzt: <b>PPP + esse</b> — <i>vocatus est</i> (er ist gerufen worden). Das Partizip richtet sich dabei nach dem Subjekt.</p>` },
      { heading: 'Deponentien: passiv gebaut, aktiv gemeint', html: `
        <p>Manche Verben tragen Passiv-Endungen, bedeuten aber etwas Aktives — die berüchtigten Deponentien:</p>
        <p class="grammar-example">loqu<b>or</b> <span>ich spreche (nicht: ich werde gesprochen)</span><br>
           sequ<b>itur</b> <span>er folgt</span><br>
           hort<b>atur</b> <span>er ermahnt</span></p>
        <p>Die häufigsten: <i>loqui</i> (sprechen), <i>sequi</i> (folgen), <i>hortari</i> (ermahnen), <i>conari</i> (versuchen), <i>vereri</i> (fürchten), <i>proficisci</i> (aufbrechen), <i>uti</i> (gebrauchen).</p>
        <div class="grammar-tip">💡 In der Klausur zuerst prüfen: Ist es wirklich Passiv — oder ein Deponens? Ein „ich werde gesprochen" im Übersetzungstext ist fast immer ein Fehlgriff.</div>` },
    ],
  },
  {
    id: 'numerals', title: 'Zahlen, Zeit & Maße', icon: 'fa-clock', beforeLesson: 97,
    pages: [
      { heading: 'Zählen auf Latein', html: `
        <table class="grammar-table">
          <tr><th>Zahl</th><th>Grundzahl</th><th>Ordnungszahl</th></tr>
          <tr><td>1</td><td>unus, una, unum</td><td>primus</td></tr>
          <tr><td>2</td><td>duo, duae, duo</td><td>secundus</td></tr>
          <tr><td>3</td><td>tres, tria</td><td>tertius</td></tr>
          <tr><td>10</td><td>decem</td><td>decimus</td></tr>
          <tr><td>100</td><td>centum</td><td>centesimus</td></tr>
          <tr><td>1000</td><td>mille</td><td>millesimus</td></tr>
        </table>
        <p>Nur <i>unus</i>, <i>duo</i> und <i>tres</i> werden gebeugt — von <i>quattuor</i> an bleiben die Grundzahlen unverändert. Ordnungszahlen dagegen gehen alle wie <i>bonus, -a, -um</i>.</p>` },
      { heading: 'Zeitangaben im richtigen Fall', html: `
        <p>Hier entscheidet der Fall über die Bedeutung — ein klassischer Prüfungsstoff:</p>
        <ul>
          <li><b>Ablativ</b> = Zeitpunkt: <i>tertia hora</i> — zur dritten Stunde</li>
          <li><b>Akkusativ</b> = Zeitdauer: <i>tres horas</i> — drei Stunden lang</li>
          <li><b>Ablativ</b> auch bei Jahresangaben: <i>eo anno</i> — in jenem Jahr</li>
        </ul>
        <p>Ebenso beim Ort: <i>Romae</i> (in Rom, Lokativ), <i>Romam</i> (nach Rom), <i>Roma</i> (von Rom weg).</p>
        <div class="grammar-tip">💡 Die Römer zählten die Stunden ab Sonnenaufgang — <i>hora prima</i> ist also nicht ein Uhr nachts, sondern die erste Stunde nach Tagesanbruch.</div>` },
    ],
  },
  {
    id: 'reading', title: 'Lange Sätze knacken', icon: 'fa-magnifying-glass', beforeLesson: 105,
    pages: [
      { heading: 'Eine Reihenfolge, die immer funktioniert', html: `
        <p>Ein lateinischer Satz wird nicht von links nach rechts gelesen, sondern <b>zerlegt</b>:</p>
        <ol>
          <li><b>Prädikat suchen</b> — meist am Ende. Seine Endung nennt schon das Subjekt.</li>
          <li><b>Subjekt bestimmen</b> — der Nominativ, der zur Endung passt.</li>
          <li><b>Satzzeichen und Bindewörter markieren</b> — sie trennen Haupt- von Nebensätzen.</li>
          <li><b>Konstruktionen erkennen</b> — Akkusativ + Infinitiv? Zwei Ablative ohne Anschluss? Partizip mit Bezugswort?</li>
          <li><b>Reste zuordnen</b> — jedes übrige Wort gehört zu genau einem Baustein.</li>
        </ol>
        <div class="grammar-tip">💡 Wer beim ersten Wort anfängt zu übersetzen, verliert sich. Wer beim Prädikat anfängt, hat nach zwei Schritten das Satzgerüst.</div>` },
    ],
  },
];
