// Grammatik-Kapitel Dänisch — werden im Lernkurs vor der jeweiligen
// Lektion (beforeLesson) eingeschoben und sind in der Übersicht nachlesbar.
export const grammar = [
  {
    id: 'intro', title: 'So funktioniert Dänisch', icon: 'fa-compass', beforeLesson: 1,
    drills: [
      {"q": "Wie schreibt man den Laut „ö“ im Dänischen?", "options": ["ø", "æ", "å", "ö"], "answer": 0, "why": "ø entspricht dem deutschen ö — æ ist ä, å ist ein langes o."},
      {"q": "Welcher Buchstabe steht für ein langes „o“?", "options": ["å", "ø", "æ", "aa"], "answer": 0, "why": "å wurde früher aa geschrieben, daher „Aarhus“ neben „Århus“."},
      {"q": "„hus“ ist mit dem deutschen Wort ____ verwandt.", "options": ["Haus", "Hut", "Husten", "Hase"], "answer": 0, "why": "Dänisch und Deutsch sind germanische Schwestersprachen — viele Wörter erkennst du sofort."},
      {"q": "Das dänische æ klingt wie deutsches ____", "options": ["ä", "ö", "ü", "o"], "answer": 0, "why": "æ = ä, ø = ö, å = langes o."},
    ],
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
    drills: [
      {"q": "____ hus (ein Haus)", "options": ["et", "en", "de", "det"], "answer": 0, "why": "hus ist ein et-Wort. Rund 25 % aller Substantive sind et-Wörter."},
      {"q": "____ bil (ein Auto)", "options": ["en", "et", "de", "den"], "answer": 0, "why": "bil ist ein en-Wort — die häufigere Gruppe."},
      {"q": "Wie heißt „das Haus“ (bestimmt)?", "options": ["huset", "det hus", "en hus", "husen"], "answer": 0, "why": "Der bestimmte Artikel hängt hinten an: hus → huset."},
      {"q": "Wie heißt „das Auto“ (bestimmt)?", "options": ["bilen", "bilet", "den bil", "bilene"], "answer": 0, "why": "en-Wörter bekommen -en: bil → bilen."},
    ],
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
    drills: [
      {"q": "jeg ____ (ich bin)", "options": ["er", "være", "var", "es"], "answer": 0, "why": "være ist der Infinitiv; die Präsensform lautet für alle Personen er."},
      {"q": "vi ____ (wir haben)", "options": ["har", "have", "havde", "haver"], "answer": 0, "why": "Eine Form für alle Personen — jeg har, du har, vi har."},
      {"q": "Wie viele Präsensformen hat ein dänisches Verb?", "options": ["eine", "zwei", "drei", "sechs"], "answer": 0, "why": "Das ist die beste Nachricht des Dänischen: eine Form für alle Personen."},
      {"q": "du ____ dansk (du sprichst Dänisch)", "options": ["taler", "tale", "talte", "talar"], "answer": 0, "why": "Präsens auf -r: tale → taler."},
    ],
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
    drills: [
      {"q": "I dag ____ jeg hjem. (Heute gehe ich nach Hause.)", "options": ["går", "jeg går", "gå", "går jeg"], "answer": 0, "why": "Das Verb steht an zweiter Stelle — steht die Zeitangabe vorn, folgt sofort das Verb."},
      {"q": "Welche Stelle nimmt das Verb im Hauptsatz ein?", "options": ["die zweite", "die erste", "die letzte", "eine beliebige"], "answer": 0, "why": "Verbzweitstellung — genau wie im Deutschen."},
      {"q": "Jeg drikker ____ om morgenen.", "options": ["kaffe", "kaffen drikker", "drikker kaffe", "om kaffe"], "answer": 0, "why": "Subjekt – Verb – Objekt, dann die Zeitangabe."},
      {"q": "I morgen ____ vi til København.", "options": ["rejser", "vi rejser", "rejse", "rejser vi til"], "answer": 0, "why": "Nach der vorangestellten Zeitangabe kommt das Verb, dann das Subjekt."},
    ],
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
    drills: [
      {"q": "____ hedder du? (Wie heißt du?)", "options": ["Hvad", "Hvem", "Hvor", "Hvornår"], "answer": 0, "why": "Hvad = was, hvem = wer, hvor = wo, hvornår = wann."},
      {"q": "____ bor du? (Wo wohnst du?)", "options": ["Hvor", "Hvad", "Hvem", "Hvorfor"], "answer": 0, "why": "hvor fragt nach dem Ort."},
      {"q": "Jeg taler ____ dansk. (Ich spreche kein Dänisch.)", "options": ["ikke", "ingen", "nej", "ej"], "answer": 0, "why": "ikke verneint das Verb und steht im Hauptsatz dahinter."},
      {"q": "____ du kaffe? (Trinkst du Kaffee?)", "options": ["Drikker", "Du drikker", "At drikke", "Drikke"], "answer": 0, "why": "In der Frage tauschen Verb und Subjekt die Plätze."},
    ],
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
    drills: [
      {"q": "I går ____ jeg en bog. (Gestern las ich ein Buch.)", "options": ["læste", "læser", "har læst", "læse"], "answer": 0, "why": "Präteritum für abgeschlossene Handlungen mit Zeitangabe."},
      {"q": "Jeg ____ boet i Danmark i tre år. (Ich habe drei Jahre in Dänemark gewohnt.)", "options": ["har", "er", "havde", "var"], "answer": 0, "why": "Perfekt mit har + Partizip."},
      {"q": "Welche Endung ist im Präteritum die häufigste?", "options": ["-ede", "-te", "-de", "-er"], "answer": 0, "why": "Die meisten Verben bilden das Präteritum auf -ede: talte man von tale, so heißt es talte — kürzere Verben nehmen -te."},
      {"q": "Han ____ til Aarhus i går. (Er fuhr gestern nach Aarhus.)", "options": ["rejste", "rejser", "har rejst", "rejse"], "answer": 0, "why": "Konkreter Zeitpunkt in der Vergangenheit → Präteritum."},
    ],
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
  {
    id: 'plural', title: 'Mehrzahl der Substantive', icon: 'fa-clone', beforeLesson: 20,
    drills: [
      {"q": "en bil → to ____", "options": ["biler", "bile", "bil", "bilene"], "answer": 0, "why": "Die häufigste Pluralendung ist -er."},
      {"q": "et hus → to ____", "options": ["huse", "huser", "hus", "husene"], "answer": 0, "why": "Viele einsilbige et-Wörter nehmen -e."},
      {"q": "Wie heißt „die Autos“ (bestimmter Plural)?", "options": ["bilerne", "bilene", "bilerne­s", "biler"], "answer": 0, "why": "Plural + -ne: biler → bilerne."},
      {"q": "en pige → to ____", "options": ["piger", "pigee", "pige", "pigene"], "answer": 0, "why": "Endet das Wort schon auf -e, kommt nur ein -r dazu."},
    ],
    pages: [
      { heading: 'Drei Endungen — und ein Muster dahinter', html: `
        <p>Der Plural hängt an drei Endungen, und welche greift, verrät meist die Wortform:</p>
        <table class="grammar-table">
          <tr><th>Endung</th><th>gilt für</th><th>Beispiel</th></tr>
          <tr><td><b>-er</b></td><td>die große Mehrheit</td><td>en bil → to bil<b>er</b> (Autos)</td></tr>
          <tr><td><b>-e</b></td><td>viele einsilbige Wörter</td><td>et bord → to bord<b>e</b> (Tische)</td></tr>
          <tr><td><b>keine</b></td><td>oft et-Wörter mit einer Silbe</td><td>et hus → to hus (Häuser)</td></tr>
        </table>
        <p>Endet das Wort schon auf <i>-e</i>, kommt nur ein <b>-r</b> dazu: <i>en pige → to piger</i>.</p>
        <div class="grammar-tip">💡 Kurzer Vokal vor einem Endkonsonanten? Dann wird er verdoppelt: <i>et rum → to rum<b>m</b>e</i>.</div>` },
      { heading: 'Bestimmter Plural: die Endung wandert wieder nach hinten', html: `
        <p>Wie im Singular hängt auch hier der Artikel hinten an — <b>-ne</b> bzw. <b>-ene</b>:</p>
        <p class="grammar-example">biler → bil<b>erne</b> <span>die Autos</span><br>
           borde → bord<b>ene</b> <span>die Tische</span><br>
           huse → hus<b>ene</b> <span>die Häuser</span></p>
        <p>Steht ein Adjektiv davor, springt der Artikel wieder nach vorn: <i><b>de</b> store huse</i> — die großen Häuser.</p>` },
    ],
  },
  {
    id: 'adjectives', title: 'Adjektive: die drei Formen', icon: 'fa-palette', beforeLesson: 29,
    drills: [
      {"q": "et ____ hus (ein großes Haus)", "options": ["stort", "stor", "store", "storet"], "answer": 0, "why": "et-Wörter verlangen die t-Form."},
      {"q": "en ____ bil (ein großes Auto)", "options": ["stor", "stort", "store", "storen"], "answer": 0, "why": "Bei en-Wörtern steht die Grundform."},
      {"q": "to ____ huse (zwei große Häuser)", "options": ["store", "stort", "stor", "storer"], "answer": 0, "why": "Im Plural endet das Adjektiv immer auf -e."},
      {"q": "____ store hus (das große Haus)", "options": ["det", "den", "de", "et"], "answer": 0, "why": "Doppelte Bestimmtheit: Artikelwort davor, Adjektiv auf -e, Substantiv ohne Endung."},
    ],
    pages: [
      { heading: 'Grundform, t-Form, e-Form', html: `
        <p>Ein dänisches Adjektiv hat nur drei Gestalten. Welche du brauchst, entscheidet das Wort daneben:</p>
        <table class="grammar-table">
          <tr><th>Form</th><th>wann</th><th>Beispiel</th></tr>
          <tr><td>Grundform</td><td>bei en-Wörtern</td><td>en <b>stor</b> bil</td></tr>
          <tr><td>+ t</td><td>bei et-Wörtern</td><td>et <b>stort</b> hus</td></tr>
          <tr><td>+ e</td><td>Plural UND alles Bestimmte</td><td>to <b>store</b> huse · det <b>store</b> hus</td></tr>
        </table>
        <div class="grammar-tip">💡 Faustregel: Sobald etwas <b>bestimmt</b> oder <b>mehrzahlig</b> ist, endet das Adjektiv auf <b>-e</b>. Das deckt die meisten Fälle ab.</div>` },
      { heading: 'Die doppelte Bestimmtheit', html: `
        <p>Steht ein Adjektiv vor einem bestimmten Substantiv, verschwindet die angehängte Endung und ein eigenes Artikelwort tritt davor:</p>
        <p class="grammar-example">hus<b>et</b> <span>das Haus</span><br>
           <b>det</b> store hus <span>das große Haus</span> — nicht „det store huset"</p>
        <p>Die Artikelwörter: <b>den</b> (en-Wörter), <b>det</b> (et-Wörter), <b>de</b> (Plural).</p>` },
    ],
  },
  {
    id: 'possessive', title: 'Besitz — und die Falle sin', icon: 'fa-hand-holding', beforeLesson: 33,
    drills: [
      {"q": "Peter tager ____ bog. (Peter nimmt sein eigenes Buch.)", "options": ["sin", "hans", "hendes", "deres"], "answer": 0, "why": "sin zeigt auf das Subjekt desselben Satzes zurück."},
      {"q": "Peter tager ____ bog. (Peter nimmt das Buch eines anderen.)", "options": ["hans", "sin", "sit", "sine"], "answer": 0, "why": "hans zeigt auf eine andere Person."},
      {"q": "____ hus (mein Haus)", "options": ["mit", "min", "mine", "mig"], "answer": 0, "why": "hus ist ein et-Wort, also mit."},
      {"q": "____ bil (meine Autos … nein: mein Auto)", "options": ["min", "mit", "mine", "mig"], "answer": 0, "why": "bil ist ein en-Wort, also min."},
    ],
    pages: [
      { heading: 'min, din, hans …', html: `
        <p>Possessive richten sich nach dem <b>besessenen</b> Wort, nicht nach dem Besitzer:</p>
        <table class="grammar-table">
          <tr><th></th><th>en-Wort</th><th>et-Wort</th><th>Plural</th></tr>
          <tr><td>mein</td><td>min</td><td>mit</td><td>mine</td></tr>
          <tr><td>dein</td><td>din</td><td>dit</td><td>dine</td></tr>
          <tr><td>unser</td><td>vores</td><td>vores</td><td>vores</td></tr>
        </table>
        <p><b>hans</b> (sein), <b>hendes</b> (ihr) und <b>deres</b> (ihr/euer) bleiben immer gleich.</p>` },
      { heading: 'sin oder hans? Der Unterschied ist entscheidend', html: `
        <p>Dänisch trennt sauber, was im Deutschen verschwimmt:</p>
        <p class="grammar-example">Peter tager <b>sin</b> bog. <span>Peter nimmt sein eigenes Buch.</span><br>
           Peter tager <b>hans</b> bog. <span>Peter nimmt das Buch eines anderen.</span></p>
        <p><b>sin / sit / sine</b> zeigt immer auf das Subjekt desselben Satzes zurück. Zeigt es auf jemand anderen, steht <i>hans</i>, <i>hendes</i> oder <i>deres</i>.</p>
        <div class="grammar-tip">💡 Merkhilfe: <i>sin</i> heißt „sein eigener". Steht es im Satz, gehört die Sache dem, der handelt.</div>` },
    ],
  },
  {
    id: 'compounds', title: 'Zusammengesetzte Wörter', icon: 'fa-link', beforeLesson: 40,
    drills: [
      {"q": "vinter + jakke = ____", "options": ["vinterjakke", "vinter jakke", "jakkevinter", "vinters jakke"], "answer": 0, "why": "Zusammensetzungen werden zusammengeschrieben, wie im Deutschen."},
      {"q": "Welches Glied bestimmt Geschlecht und Plural?", "options": ["das letzte", "das erste", "beide", "keines"], "answer": 0, "why": "en jakke → en vinterjakke."},
      {"q": "køkken + bord = ____", "options": ["køkkenbord", "bordkøkken", "køkken bord", "køkkens bord"], "answer": 0, "why": "Das Bestimmungswort steht vorn, das Grundwort hinten."},
      {"q": "Was heißt „regnvejr“?", "options": ["Regenwetter", "Regenweg", "Wetterregen", "Regenschirm"], "answer": 0, "why": "regn (Regen) + vejr (Wetter)."},
    ],
    pages: [
      { heading: 'Ein Wort, keine Leerzeichen', html: `
        <p>Wie im Deutschen wächst der dänische Wortschatz durch Zusammensetzen — und wie im Deutschen wird zusammengeschrieben:</p>
        <p class="grammar-example">vinter + jakke = <b>vinterjakke</b> <span>Winterjacke</span><br>
           køkken + bord = <b>køkkenbord</b> <span>Küchentisch</span><br>
           regn + vejr = <b>regnvejr</b> <span>Regenwetter</span></p>
        <p>Das <b>letzte</b> Glied bestimmt Geschlecht und Plural: <i>en jakke</i> → <i>en vinterjakke</i>.</p>
        <div class="grammar-tip">💡 Genau deshalb verstehst du oft mehr, als du gelernt hast: Zerleg ein langes Wort in seine Teile, und meist steckt die Bedeutung schon darin.</div>` },
    ],
  },
  {
    id: 'numbers', title: 'Zahlen & Uhrzeit', icon: 'fa-clock', beforeLesson: 46,
    drills: [
      {"q": "Was heißt 50 auf Dänisch?", "options": ["halvtreds", "tres", "firs", "halvfjerds"], "answer": 0, "why": "halvtreds = halb-drittes mal 20."},
      {"q": "Was heißt 60?", "options": ["tres", "halvtreds", "firs", "seksti"], "answer": 0, "why": "tres = 3 × 20."},
      {"q": "„halv fire“ bedeutet ____", "options": ["3:30", "4:30", "3:15", "4:15"], "answer": 0, "why": "Wie im Deutschen: halb vier ist 3:30."},
      {"q": "21 heißt auf Dänisch ____", "options": ["enogtyve", "tyveogen", "tyve en", "enogtredive"], "answer": 0, "why": "Einer zuerst, dann og, dann Zehner — wie „einundzwanzig“."},
    ],
    pages: [
      { heading: 'Das dänische Zwanzigersystem', html: `
        <p>Ab fünfzig zählt Dänisch in Zwanzigerschritten — das ist der berüchtigtste Teil der Sprache, aber es steckt ein System dahinter (<i>tres</i> = 3 × 20):</p>
        <table class="grammar-table">
          <tr><th>Zahl</th><th>dänisch</th><th>gedacht als</th></tr>
          <tr><td>50</td><td>halvtreds</td><td>halb-drittes × 20</td></tr>
          <tr><td>60</td><td>tres</td><td>3 × 20</td></tr>
          <tr><td>70</td><td>halvfjerds</td><td>halb-viertes × 20</td></tr>
          <tr><td>80</td><td>firs</td><td>4 × 20</td></tr>
          <tr><td>90</td><td>halvfems</td><td>halb-fünftes × 20</td></tr>
        </table>
        <p>Die Einer stehen davor, verbunden mit <b>og</b>: <i>enogtyve</i> (21), <i>femoghalvtreds</i> (55) — genau wie im Deutschen „einundzwanzig".</p>` },
      { heading: 'Wie spät ist es?', html: `
        <p>Die Uhrzeit funktioniert fast wie im Deutschen:</p>
        <p class="grammar-example">Klokken er tre. <span>Es ist drei Uhr.</span><br>
           kvart over tre <span>Viertel nach drei</span><br>
           halv fire <span>halb vier — also 3:30</span><br>
           kvart i fire <span>Viertel vor vier</span></p>
        <div class="grammar-tip">💡 <b>halv fire</b> heißt 3:30, nicht 4:30 — dieselbe Logik wie im Deutschen, anders als im Englischen.</div>` },
    ],
  },
  {
    id: 'future', title: 'Über Zukünftiges sprechen', icon: 'fa-forward', beforeLesson: 52,
    drills: [
      {"q": "Jeg ____ til København i morgen. (fest geplant)", "options": ["skal", "vil", "er", "har"], "answer": 0, "why": "skal für Verabredetes und Geplantes."},
      {"q": "Det ____ regne i morgen. (Vorhersage)", "options": ["vil", "skal", "er", "har"], "answer": 0, "why": "vil für Wille und Vorhersage."},
      {"q": "Nach skal und vil steht der Infinitiv ____", "options": ["ohne at", "mit at", "mit -r", "im Präteritum"], "answer": 0, "why": "Jeg skal køre — nicht „at køre“."},
      {"q": "Jeg rejser i morgen. Diese Form ist ____", "options": ["Präsens mit Zukunftsbedeutung", "Präteritum", "Perfekt", "Imperativ"], "answer": 0, "why": "Mit Zeitangabe reicht das Präsens für die Zukunft."},
    ],
    pages: [
      { heading: 'Meistens reicht die Gegenwart', html: `
        <p>Steht eine Zeitangabe im Satz, genügt das Präsens — genau wie im Deutschen:</p>
        <p class="grammar-example">Jeg <b>rejser</b> i morgen. <span>Ich reise morgen.</span></p>
        <p>Willst du es deutlicher machen, nimmst du <b>skal</b> oder <b>vil</b>:</p>
        <ul>
          <li><b>skal</b> — fest geplant, verabredet: <i>Jeg skal til København.</i> (Ich fahre nach Kopenhagen.)</li>
          <li><b>vil</b> — Wille oder Vorhersage: <i>Det vil regne.</i> (Es wird regnen.)</li>
        </ul>
        <p>Nach beiden steht der <b>Infinitiv ohne at</b>: <i>Jeg skal <b>køre</b></i> — nicht „at køre".</p>` },
    ],
  },
  {
    id: 'subclause', title: 'Nebensätze & die Stellung von ikke', icon: 'fa-code-branch', beforeLesson: 59,
    drills: [
      {"q": "Jeg kommer ____ i dag. (Hauptsatz: Ich komme heute nicht.)", "options": ["ikke", "ej", "ingen", "nej"], "answer": 0, "why": "Im Hauptsatz steht ikke nach dem Verb."},
      {"q": "… at jeg ____ kommer i dag. (Nebensatz)", "options": ["ikke", "ej", "ingen", "slet"], "answer": 0, "why": "Im Nebensatz wandert ikke VOR das Verb — der wichtigste Unterschied."},
      {"q": "____ du kommer, laver jeg mad. (Wenn du kommst …)", "options": ["Hvis", "Når", "At", "Fordi"], "answer": 0, "why": "hvis für eine Bedingung, når für einen wiederkehrenden Zeitpunkt."},
      {"q": "Jeg bliver hjemme, ____ jeg er syg.", "options": ["fordi", "hvis", "at", "når"], "answer": 0, "why": "fordi = weil."},
    ],
    pages: [
      { heading: 'Im Nebensatz wandert ikke nach vorn', html: `
        <p>Das ist der klarste Unterschied zwischen Haupt- und Nebensatz im Dänischen:</p>
        <p class="grammar-example">Hovedsætning: Jeg kommer <b>ikke</b> i dag.<br>
           Bisætning: … at jeg <b>ikke</b> kommer i dag.</p>
        <p>Im Hauptsatz steht <i>ikke</i> nach dem Verb, im Nebensatz davor. Dasselbe gilt für <i>altid</i>, <i>ofte</i>, <i>aldrig</i>.</p>
        <div class="grammar-tip">💡 Eselsbrücke der Dänen selbst: „<b>at</b> holt das <b>ikke</b> nach vorn."</div>` },
      { heading: 'Die wichtigsten Bindewörter', html: `
        <ul>
          <li><b>at</b> — dass: <i>Jeg tror, at det regner.</i></li>
          <li><b>fordi</b> — weil: <i>… fordi jeg ikke har tid.</i></li>
          <li><b>hvis</b> — wenn (Bedingung): <i>Hvis du kommer, laver jeg mad.</i></li>
          <li><b>når</b> — wenn (Zeitpunkt, wiederholt): <i>Når jeg står op, drikker jeg kaffe.</i></li>
          <li><b>da</b> — als (einmalig in der Vergangenheit)</li>
        </ul>
        <p>Steht der Nebensatz vorn, rückt das Verb des Hauptsatzes direkt dahinter — die Zweitstellung bleibt: <i>Hvis du kommer, <b>laver</b> jeg mad.</i></p>` },
    ],
  },
  {
    id: 'modals', title: 'Modalverben', icon: 'fa-key', beforeLesson: 66,
    drills: [
      {"q": "Jeg ____ tale dansk. (Ich kann Dänisch sprechen.)", "options": ["kan", "skal", "må", "vil"], "answer": 0, "why": "kunne → kan."},
      {"q": "Du ____ gerne spørge. (Du darfst gern fragen.)", "options": ["må", "kan", "skal", "bør"], "answer": 0, "why": "må drückt hier die Erlaubnis aus."},
      {"q": "Nach einem Modalverb folgt ____", "options": ["der reine Infinitiv", "at + Infinitiv", "das Präteritum", "ein Partizip"], "answer": 0, "why": "Jeg kan tale — ohne at."},
      {"q": "Du ____ spise mere grønt. (Du solltest mehr Gemüse essen — Rat.)", "options": ["bør", "må", "kan", "tør"], "answer": 0, "why": "burde → bør für Empfehlungen."},
    ],
    pages: [
      { heading: 'Sechs Verben, die fast alles ausdrücken', html: `
        <table class="grammar-table">
          <tr><th>Verb</th><th>Präteritum</th><th>Bedeutung</th></tr>
          <tr><td>kunne</td><td>kunne</td><td>können</td></tr>
          <tr><td>skulle</td><td>skulle</td><td>sollen, fest vorhaben</td></tr>
          <tr><td>ville</td><td>ville</td><td>wollen, werden</td></tr>
          <tr><td>måtte</td><td>måtte</td><td>dürfen — und müssen</td></tr>
          <tr><td>burde</td><td>burde</td><td>sollte (Rat)</td></tr>
          <tr><td>turde</td><td>turde</td><td>sich trauen</td></tr>
        </table>
        <p>Im Präsens enden sie alle auf <b>-r</b>: <i>kan, skal, vil, må, bør, tør</i>. Danach folgt der reine Infinitiv:</p>
        <p class="grammar-example">Jeg <b>kan</b> tale dansk. <span>Ich kann Dänisch sprechen.</span><br>
           Du <b>må</b> gerne spørge. <span>Du darfst gern fragen.</span></p>
        <div class="grammar-tip">💡 <b>må</b> ist zweideutig: <i>Du må ikke ryge</i> heißt „du darfst nicht rauchen", <i>Jeg må gå nu</i> heißt „ich muss jetzt gehen". Der Zusammenhang entscheidet.</div>` },
    ],
  },
  {
    id: 'adverbs', title: 'Die kleinen Wörter, die den Ton machen', icon: 'fa-comment', beforeLesson: 78,
    drills: [
      {"q": "Det er ____ dyrt. (Das ist doch teuer — das wissen wir beide.)", "options": ["jo", "da", "nok", "vist"], "answer": 0, "why": "jo beruft sich auf gemeinsames Wissen."},
      {"q": "Han kommer ____. (Er kommt wohl / wahrscheinlich.)", "options": ["nok", "jo", "da", "vel"], "answer": 0, "why": "nok drückt Wahrscheinlichkeit aus."},
      {"q": "Hun er ____ syg. (Sie ist wohl krank — habe ich gehört.)", "options": ["vist", "jo", "da", "nok"], "answer": 0, "why": "vist gibt Gehörtes wieder."},
      {"q": "Du kommer ____? (Du kommst doch, oder?)", "options": ["vel", "jo", "nok", "da"], "answer": 0, "why": "vel sucht Zustimmung."},
    ],
    pages: [
      { heading: 'jo, da, nok, vist, vel', html: `
        <p>Diese Partikeln übersetzt kein Wörterbuch sauber — aber sie entscheiden, ob du wie ein Lehrbuch klingst oder wie ein Mensch:</p>
        <table class="grammar-table">
          <tr><th>Wort</th><th>Wirkung</th><th>Beispiel</th></tr>
          <tr><td><b>jo</b></td><td>„das wissen wir doch beide"</td><td>Det er jo dyrt. <i>Das ist doch teuer.</i></td></tr>
          <tr><td><b>da</b></td><td>leichter Widerspruch</td><td>Det er da fint. <i>Das ist doch gut.</i></td></tr>
          <tr><td><b>nok</b></td><td>„wahrscheinlich schon"</td><td>Han kommer nok. <i>Er kommt wohl.</i></td></tr>
          <tr><td><b>vist</b></td><td>„habe ich gehört"</td><td>Hun er vist syg. <i>Sie ist wohl krank.</i></td></tr>
          <tr><td><b>vel</b></td><td>sucht Zustimmung</td><td>Du kommer vel? <i>Du kommst doch, oder?</i></td></tr>
        </table>
        <p>Sie stehen an derselben Stelle wie <i>ikke</i> — nach dem Verb im Hauptsatz.</p>
        <div class="grammar-tip">💡 Auch <b>hyggeligt</b> gehört in diese Familie: kein echtes Gegenstück im Deutschen, aber unverzichtbar im dänischen Alltag.</div>` },
    ],
  },
  {
    id: 'comparison', title: 'Steigern & vergleichen', icon: 'fa-ranking-star', beforeLesson: 90,
    drills: [
      {"q": "stor → ____ (größer)", "options": ["større", "storere", "mere stor", "storst"], "answer": 0, "why": "Unregelmäßig: stor – større – størst."},
      {"q": "god → ____ (besser)", "options": ["bedre", "godere", "mere god", "bedst"], "answer": 0, "why": "god – bedre – bedst."},
      {"q": "Han er højere ____ mig.", "options": ["end", "som", "af", "fra"], "answer": 0, "why": "Verglichen wird mit end."},
      {"q": "Hun er lige så hurtig ____ dig.", "options": ["som", "end", "af", "ved"], "answer": 0, "why": "Gleichheit: lige så … som."},
    ],
    pages: [
      { heading: '-ere und -est', html: `
        <p>Kurze Adjektive steigern mit Endungen, lange mit <i>mere</i> und <i>mest</i> — dieselbe Logik wie im Englischen:</p>
        <p class="grammar-example">stor → stør<b>re</b> → stør<b>st</b> <span>groß – größer – am größten</span><br>
           billig → billig<b>ere</b> → billig<b>st</b><br>
           interessant → <b>mere</b> interessant → <b>mest</b> interessant</p>
        <p>Unregelmäßig, aber häufig: <i>god → bedre → bedst</i>, <i>lille → mindre → mindst</i>, <i>mange → flere → flest</i>, <i>gammel → ældre → ældst</i>.</p>` },
      { heading: 'Vergleichen: end und lige så … som', html: `
        <p class="grammar-example">Han er højere <b>end</b> mig. <span>Er ist größer als ich.</span><br>
           Hun er <b>lige så</b> hurtig <b>som</b> dig. <span>Sie ist genauso schnell wie du.</span><br>
           Det er <b>den</b> bedste bog. <span>Das ist das beste Buch.</span></p>
        <p>Im Superlativ steht der bestimmte Artikel davor und das Adjektiv endet auf <b>-e</b>: <i>den største bil</i>.</p>` },
    ],
  },
  {
    id: 'passive', title: 'Passiv: zwei Wege', icon: 'fa-arrows-turn-right', beforeLesson: 100,
    drills: [
      {"q": "Døren ____ klokken seks. (s-Passiv: Die Tür wird um sechs geschlossen.)", "options": ["lukkes", "lukker", "lukket", "er lukke"], "answer": 0, "why": "Das -s hängt direkt am Verb."},
      {"q": "Døren ____ lukket klokken seks. (gesprochener)", "options": ["bliver", "er", "har", "var"], "answer": 0, "why": "blive + Partizip ist der übliche Weg im Gespräch."},
      {"q": "„vi ses!“ heißt ____", "options": ["wir sehen uns!", "wir werden gesehen!", "sieh uns!", "wir sahen"], "answer": 0, "why": "ses trägt das -s ohne Passivbedeutung."},
      {"q": "Welches Verb trägt das -s immer?", "options": ["synes", "lukke", "spise", "købe"], "answer": 0, "why": "synes (finden, meinen) gibt es nur mit -s."},
    ],
    pages: [
      { heading: 's-Passiv und blive-Passiv', html: `
        <p>Dänisch bildet das Passiv auf zwei Arten, und beide sind gebräuchlich:</p>
        <p class="grammar-example">Døren <b>lukkes</b> klokken seks. <span>Die Tür wird um sechs geschlossen.</span><br>
           Døren <b>bliver</b> lukket klokken seks. <span>dasselbe, gesprochener</span></p>
        <ul>
          <li><b>-s</b> ans Verb: knapper, wirkt schriftlich und amtlich. Häufig auf Schildern und in Anleitungen.</li>
          <li><b>blive</b> + Partizip: der übliche Weg im Gespräch, besonders für einmalige Vorgänge.</li>
        </ul>
        <div class="grammar-tip">💡 Ein paar Verben tragen das <b>-s</b> immer, ohne Passiv-Bedeutung: <i>synes</i> (finden, meinen), <i>mødes</i> (sich treffen), <i>ses</i> (sich sehen) — daher auch der Abschiedsgruß <i>vi ses!</i></div>` },
    ],
  },
  {
    id: 'reported', title: 'Meinung äußern & indirekte Rede', icon: 'fa-comments', beforeLesson: 107,
    drills: [
      {"q": "Jeg ____, at han kommer. (Ich glaube — ohne Beleg.)", "options": ["tror", "synes", "mener", "ved"], "answer": 0, "why": "tro für Vermutungen."},
      {"q": "Jeg ____, filmen er god. (Ich finde — ich habe ihn gesehen.)", "options": ["synes", "tror", "mener", "kender"], "answer": 0, "why": "synes für den persönlichen Eindruck aus Erfahrung."},
      {"q": "Han sagde, at han ____ dagen efter. (Er sagte, dass er am nächsten Tag komme.)", "options": ["kom", "kommer", "er kommet", "vil komme"], "answer": 0, "why": "Steht das einleitende Verb in der Vergangenheit, rückt auch der Nebensatz zurück."},
      {"q": "Braucht Dänisch für die indirekte Rede einen Konjunktiv?", "options": ["nein", "ja, immer", "nur schriftlich", "nur bei at"], "answer": 0, "why": "Es genügen at und die angepasste Zeit."},
    ],
    pages: [
      { heading: 'tro, synes, mene — drei Arten von „finden"', html: `
        <p>Dänisch trennt sauber, was das Deutsche in ein Wort presst:</p>
        <table class="grammar-table">
          <tr><th>Verb</th><th>bedeutet</th><th>Beispiel</th></tr>
          <tr><td><b>tro</b></td><td>vermuten, glauben (ohne Beleg)</td><td>Jeg tror, at han kommer.</td></tr>
          <tr><td><b>synes</b></td><td>finden — persönlicher Eindruck</td><td>Jeg synes, filmen er god.</td></tr>
          <tr><td><b>mene</b></td><td>der Meinung sein (mit Begründung)</td><td>Jeg mener, at det er forkert.</td></tr>
        </table>
        <div class="grammar-tip">💡 Über Erlebtes sprichst du mit <i>synes</i>, über Unbekanntes mit <i>tro</i>. „Ich finde den Film gut" (gesehen) = <i>synes</i>; „ich glaube, er ist gut" (noch nicht gesehen) = <i>tror</i>.</div>` },
      { heading: 'Indirekte Rede: ohne Konjunktiv', html: `
        <p>Dänisch kennt keinen Konjunktiv der indirekten Rede. Wiedergegeben wird mit <b>at</b> und angepasster Zeit — mehr braucht es nicht:</p>
        <p class="grammar-example">„Jeg kommer i morgen."<br>
           → Han sagde, <b>at</b> han <b>kom</b> dagen efter.<br>
           <span>Er sagte, dass er am nächsten Tag komme.</span></p>
        <p>Steht das einleitende Verb in der Vergangenheit, rückt auch die Zeit im Nebensatz eine Stufe zurück: <i>kommer → kom</i>, <i>har → havde</i>. Und weil es ein Nebensatz ist, steht <b>ikke</b> wieder vor dem Verb.</p>` },
    ],
  },
];
