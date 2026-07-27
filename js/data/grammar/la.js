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
];
