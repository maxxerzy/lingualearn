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
  {
    id: 'adjectives', title: 'Adjektive: Angleichung & Stellung', icon: 'fa-palette', beforeLesson: 22,
    pages: [
      { heading: 'Hinter dem Substantiv, in Geschlecht und Zahl angeglichen', html: `
        <p class="grammar-example">un libro <b>interesante</b> · una historia <b>interesante</b><br>
           un coche <b>rojo</b> · una casa <b>roja</b> · unos coches <b>rojos</b></p>
        <p>Adjektive auf <b>-o</b> haben vier Formen (-o, -a, -os, -as). Alle anderen nur zwei: Singular und Plural.</p>
        <p>Ein paar verkürzen sich vor männlichem Substantiv: <i>bueno → <b>buen</b> día</i>, <i>grande → <b>gran</b> hombre</i> (dann: bedeutender Mann), <i>primero → <b>primer</b> piso</i>.</p>
        <div class="grammar-tip">💡 Die Stellung kann die Bedeutung kippen: <i>un <b>viejo</b> amigo</i> = ein langjähriger Freund, <i>un amigo <b>viejo</b></i> = ein alter (betagter) Freund.</div>` },
    ],
  },
  {
    id: 'gustar', title: 'gustar & der umgekehrte Satzbau', icon: 'fa-heart', beforeLesson: 29,
    pages: [
      { heading: 'Nicht ich mag es — es gefällt mir', html: `
        <p>Bei <b>gustar</b> ist das, was gefällt, das <b>Subjekt</b>. Die Person steht im Dativ davor:</p>
        <p class="grammar-example"><b>Me</b> gusta el café. <span>Mir gefällt der Kaffee = ich mag Kaffee.</span><br>
           <b>Me</b> gusta<b>n</b> los libros. <span>Plural! Weil „die Bücher" das Subjekt sind.</span><br>
           <b>Te</b> gusta bailar. <span>Du tanzt gern.</span></p>
        <p>Die Dativpronomen: <b>me, te, le, nos, os, les</b>. Zur Verdeutlichung stellt man <i>a mí</i>, <i>a ti</i>, <i>a Juan</i> voran: <i><b>A mí</b> me gusta.</i></p>
        <p>Genauso gebaut: <i>encantar</i> (lieben), <i>interesar</i>, <i>doler</i> (wehtun), <i>faltar</i> (fehlen), <i>parecer</i> (erscheinen).</p>
        <div class="grammar-tip">💡 <i>Me duele la cabeza</i> — wörtlich „mir schmerzt der Kopf". Genau so denkt das Spanische.</div>` },
    ],
  },
  {
    id: 'possessive', title: 'Besitz & Demonstrativa', icon: 'fa-hand-holding', beforeLesson: 36,
    pages: [
      { heading: 'mi, tu, su …', html: `
        <p class="grammar-example">mi casa · tus libros · su coche · nuestra familia · vuestros amigos</p>
        <p>Sie richten sich nach dem <b>besessenen</b> Ding, nicht nach dem Besitzer — nur <i>nuestro/vuestro</i> haben auch weibliche Formen.</p>
        <p><b>su</b> heißt sein, ihr, Ihr und deren zugleich. Wird es unklar, hilft <i>de él</i>, <i>de ella</i>, <i>de usted</i>.</p>` },
      { heading: 'Drei Entfernungen statt zwei', html: `
        <table class="grammar-table">
          <tr><th>Wort</th><th>Entfernung</th><th>Beispiel</th></tr>
          <tr><td>este, esta, estos</td><td>hier bei mir</td><td><b>este</b> libro — dieses Buch hier</td></tr>
          <tr><td>ese, esa, esos</td><td>bei dir</td><td><b>ese</b> libro — das Buch da</td></tr>
          <tr><td>aquel, aquella</td><td>weit weg</td><td><b>aquel</b> libro — jenes Buch dort</td></tr>
        </table>
        <p>Diese dritte Stufe kennt das Deutsche nicht — sie ist einer der schönsten Züge des Spanischen.</p>` },
    ],
  },
  {
    id: 'future', title: 'Zukunft: ir a & Futuro', icon: 'fa-forward', beforeLesson: 42,
    pages: [
      { heading: 'Der bequeme und der förmliche Weg', html: `
        <p><b>ir a</b> + Infinitiv — das alltägliche Futur:</p>
        <p class="grammar-example">Voy a comer. <span>Ich werde essen.</span><br>Vamos a ver. <span>Mal sehen.</span></p>
        <p><b>Futuro simple</b> — Infinitiv + Endung, für alle drei Konjugationen gleich:</p>
        <table class="grammar-table">
          <tr><td>hablar<b>é</b></td><td>hablar<b>emos</b></td></tr>
          <tr><td>hablar<b>ás</b></td><td>hablar<b>éis</b></td></tr>
          <tr><td>hablar<b>á</b></td><td>hablar<b>án</b></td></tr>
        </table>
        <p>Unregelmäßige Stämme: <i>tener → tendr-</i>, <i>poder → podr-</i>, <i>hacer → har-</i>, <i>decir → dir-</i>, <i>salir → saldr-</i>, <i>venir → vendr-</i>.</p>
        <div class="grammar-tip">💡 Das Futuro drückt oft eine Vermutung über die <b>Gegenwart</b> aus: <i>¿Qué hora será?</i> — Wie spät mag es wohl sein?</div>` },
    ],
  },
  {
    id: 'numbers', title: 'Zahlen, Uhrzeit & Datum', icon: 'fa-clock', beforeLesson: 48,
    pages: [
      { heading: 'Zählen auf Spanisch', html: `
        <p>Bis 30 wird zusammengeschrieben (<i>veintiuno</i>), ab 31 getrennt mit <b>y</b>: <i>treinta y uno</i>.</p>
        <p><i>uno</i> verkürzt sich vor männlichem Substantiv zu <b>un</b>: <i>un libro</i>, aber <i>veintiún libros</i>. <b>ciento</b> wird vor Substantiven zu <b>cien</b>: <i>cien euros</i>, aber <i>ciento veinte</i>.</p>` },
      { heading: 'Uhrzeit & Datum', html: `
        <p class="grammar-example">¿Qué hora es? — <b>Son</b> las tres. <span>Plural! Nur bei eins: <b>Es</b> la una.</span><br>
           las tres <b>y</b> cuarto <span>Viertel nach drei</span><br>
           las tres <b>y</b> media <span>halb vier</span><br>
           las cuatro <b>menos</b> cuarto <span>Viertel vor vier</span></p>
        <p>Datum mit Grundzahl und <i>de</i>: <i>el <b>quince de</b> mayo <b>de</b> 2026</i>.</p>` },
    ],
  },
  {
    id: 'pronouns', title: 'Objektpronomen & ihre Stellung', icon: 'fa-hand-point-right', beforeLesson: 54,
    pages: [
      { heading: 'Vor dem Verb — oder angehängt', html: `
        <p>Direkt: <b>me, te, lo/la, nos, os, los/las</b>. Indirekt: <b>me, te, le, nos, os, les</b>.</p>
        <p class="grammar-example"><b>Lo</b> veo. <span>Ich sehe ihn/es.</span><br>
           <b>Te lo</b> doy. <span>Ich gebe es dir. — indirekt vor direkt</span></p>
        <p>Bei Infinitiv, Gerundium und Imperativ dürfen sie ans Verb angehängt werden:</p>
        <p class="grammar-example">Quiero ver<b>lo</b>. = <b>Lo</b> quiero ver.<br>¡Dáme<b>lo</b>! <span>Gib es mir!</span></p>
        <div class="grammar-tip">💡 Treffen <i>le</i> und <i>lo</i> aufeinander, wird aus <i>le</i> ein <b>se</b>: nicht „le lo doy", sondern <i><b>se lo</b> doy</i>.</div>` },
    ],
  },
  {
    id: 'imperfecto', title: 'Indefinido oder Imperfecto?', icon: 'fa-clock-rotate-left', beforeLesson: 60,
    pages: [
      { heading: 'Ereignis gegen Kulisse', html: `
        <table class="grammar-table">
          <tr><th>Zeit</th><th>Blick</th><th>Beispiel</th></tr>
          <tr><td><b>Indefinido</b></td><td>einmalig, abgeschlossen</td><td><b>Comí</b> a las dos. — Ich aß um zwei.</td></tr>
          <tr><td><b>Imperfecto</b></td><td>Gewohnheit, Zustand, Hintergrund</td><td><b>Comía</b> a las dos. — Ich aß immer um zwei.</td></tr>
        </table>
        <p class="grammar-example">Cuando <b>era</b> niño, <b>jugaba</b> al fútbol. <span>Zustand + Gewohnheit</span><br>
           Ayer <b>jugué</b> al fútbol. <span>ein Ereignis</span><br>
           <b>Dormía</b> cuando <b>sonó</b> el teléfono. <span>Hintergrund + Einschnitt</span></p>` },
      { heading: 'Die Formen', html: `
        <p><b>Imperfecto</b> ist die regelmäßigste Zeit überhaupt — nur drei Ausnahmen: <i>ser (era)</i>, <i>ir (iba)</i>, <i>ver (veía)</i>.</p>
        <table class="grammar-table">
          <tr><th></th><th>-ar</th><th>-er / -ir</th></tr>
          <tr><td>yo</td><td>hablaba</td><td>comía</td></tr>
          <tr><td>tú</td><td>hablabas</td><td>comías</td></tr>
          <tr><td>él</td><td>hablaba</td><td>comía</td></tr>
        </table>
        <p><b>Indefinido</b> unregelmäßig, aber unverzichtbar: <i>ser/ir → fui</i>, <i>tener → tuve</i>, <i>hacer → hice</i>, <i>estar → estuve</i>, <i>poder → pude</i>, <i>decir → dije</i>.</p>` },
    ],
  },
  {
    id: 'reflexive', title: 'Reflexive Verben', icon: 'fa-rotate', beforeLesson: 68,
    pages: [
      { heading: 'Der Tagesablauf ist reflexiv', html: `
        <p class="grammar-example">me levanto · te duchas · se viste · nos acostamos</p>
        <p>Häufig: <i>levantarse</i> (aufstehen), <i>ducharse</i> (duschen), <i>vestirse</i> (sich anziehen), <i>acostarse</i> (ins Bett gehen), <i>despertarse</i> (aufwachen), <i>llamarse</i> (heißen).</p>
        <p>Oft ändert sich die Bedeutung: <i>ir</i> (gehen) → <i>irse</i> (weggehen), <i>dormir</i> (schlafen) → <i>dormirse</i> (einschlafen), <i>poner</i> (stellen) → <i>ponerse</i> (anziehen, werden).</p>
        <div class="grammar-tip">💡 <b>se</b> bildet auch das unpersönliche Passiv: <i>Aquí <b>se habla</b> español.</i> — Hier spricht man Spanisch. Genau das steht auf unzähligen Schildern.</div>` },
    ],
  },
  {
    id: 'comparison', title: 'Steigern & vergleichen', icon: 'fa-ranking-star', beforeLesson: 74,
    pages: [
      { heading: 'más, menos, tan … como', html: `
        <p class="grammar-example">Es <b>más</b> alto <b>que</b> yo. <span>größer als ich</span><br>
           Es <b>menos</b> caro <b>que</b> ese. <span>weniger teuer als jener</span><br>
           Es <b>tan</b> rápido <b>como</b> tú. <span>so schnell wie du</span></p>
        <p>Superlativ mit Artikel: <i><b>el</b> más grande</i>, <i><b>la</b> más bonita</i>.</p>
        <p>Unregelmäßig: <i>bueno → <b>mejor</b></i>, <i>malo → <b>peor</b></i>, <i>grande → <b>mayor</b></i>, <i>pequeño → <b>menor</b></i>.</p>
        <p>Und die schönste Steigerung des Spanischen — <b>-ísimo</b>: <i>guapo → guap<b>ísimo</b></i>, <i>bueno → buen<b>ísimo</b></i>.</p>` },
    ],
  },
  {
    id: 'subjunctive', title: 'Der Subjuntivo', icon: 'fa-wand-sparkles', beforeLesson: 82,
    pages: [
      { heading: 'Wunsch, Zweifel, Gefühl', html: `
        <p>Der Subjuntivo steht im Nebensatz, wenn der Hauptsatz keinen Tatsachenbericht liefert:</p>
        <ul>
          <li>Wunsch: <i>Quiero que <b>vengas</b>.</i></li>
          <li>Gefühl: <i>Me alegro de que <b>estés</b> aquí.</i></li>
          <li>Zweifel: <i>No creo que <b>sea</b> verdad.</i></li>
          <li>Absicht: <i>para que <b>puedas</b> entender</i></li>
          <li>Zukunft in Zeitsätzen: <i>cuando <b>llegues</b></i> — wenn du ankommst</li>
        </ul>
        <p>Gebildet aus der <i>yo</i>-Form mit getauschtem Vokal: <i>hablo → habl<b>e</b></i>, <i>como → com<b>a</b></i>. Unregelmäßig: <i>ser (sea)</i>, <i>ir (vaya)</i>, <i>haber (haya)</i>, <i>saber (sepa)</i>, <i>estar (esté)</i>.</p>
        <div class="grammar-tip">💡 Prüfstein: <i>Creo que viene</i> (ich glaube, er kommt — Indikativ) gegen <i>No creo que <b>venga</b></i> (ich glaube nicht, dass er kommt — Subjuntivo). Die Verneinung kippt den Modus.</div>` },
    ],
  },
  {
    id: 'conditional', title: 'Condicional & Bedingungssätze', icon: 'fa-code-branch', beforeLesson: 91,
    pages: [
      { heading: 'Höflich bitten, Mögliches ausdrücken', html: `
        <p>Futur-Stamm + <i>-ía, -ías, -ía, -íamos, -íais, -ían</i>:</p>
        <p class="grammar-example"><b>Querría</b> un café. <span>Ich hätte gern einen Kaffee.</span><br>
           ¿<b>Podrías</b> ayudarme? <span>Könntest du mir helfen?</span></p>` },
      { heading: 'Die si-Sätze', html: `
        <table class="grammar-table">
          <tr><th>Bedingung</th><th>Folge</th><th>Beispiel</th></tr>
          <tr><td>si + Presente</td><td>Futuro</td><td>Si tengo tiempo, ir<b>é</b>.</td></tr>
          <tr><td>si + Imperfecto de subjuntivo</td><td>Condicional</td><td>Si <b>tuviera</b> tiempo, ir<b>ía</b>.</td></tr>
        </table>
        <p>Die Form auf <b>-ra</b> (<i>tuviera, fuera, pudiera</i>) bildest du aus der 3. Person Plural des Indefinido: <i>tuvieron → tuviera</i>.</p>
        <div class="grammar-tip">💡 Nach <b>si</b> steht nie ein Futur und nie ein Condicional — dieselbe Regel wie im Französischen.</div>` },
    ],
  },
  {
    id: 'porpara', title: 'Relativsätze und por / para', icon: 'fa-link', beforeLesson: 101,
    pages: [
      { heading: 'que, quien, donde', html: `
        <p><b>que</b> deckt fast alles ab — für Personen wie für Dinge, als Subjekt wie als Objekt:</p>
        <p class="grammar-example">El hombre <b>que</b> habla … · El libro <b>que</b> leo …<br>
           La ciudad <b>donde</b> vivo … · La persona <b>con quien</b> hablo …</p>` },
      { heading: 'por oder para — die berühmte Frage', html: `
        <table class="grammar-table">
          <tr><th>por</th><th>para</th></tr>
          <tr><td>Grund, Ursache</td><td>Ziel, Zweck</td></tr>
          <tr><td>Zeitraum, Weg</td><td>Termin, Richtung</td></tr>
          <tr><td>Tausch, Preis</td><td>Empfänger</td></tr>
        </table>
        <p class="grammar-example">Gracias <b>por</b> la ayuda. <span>Grund</span><br>
           Este regalo es <b>para</b> ti. <span>Empfänger</span><br>
           Salgo <b>para</b> Madrid. <span>Ziel</span> — Paso <b>por</b> Madrid. <span>Weg</span></p>
        <div class="grammar-tip">💡 Eselsbrücke: <b>por</b> blickt zurück (warum?), <b>para</b> blickt nach vorn (wozu?).</div>` },
    ],
  },
  {
    id: 'commands', title: 'Imperativ', icon: 'fa-bullhorn', beforeLesson: 110,
    pages: [
      { heading: 'Bejaht und verneint — zwei verschiedene Formen', html: `
        <p class="grammar-example">¡Habl<b>a</b>! <span>Sprich!</span> — ¡No habl<b>es</b>! <span>Sprich nicht!</span><br>
           ¡Com<b>e</b>! <span>Iss!</span> — ¡No com<b>as</b>! <span>Iss nicht!</span></p>
        <p>Der verneinte Imperativ ist der <b>Subjuntivo</b> — deshalb wechselt die Endung. Für <i>usted</i> gilt der Subjuntivo immer: <i>¡Hable usted!</i></p>
        <p>Unregelmäßig bei <i>tú</i>: <i>ser → sé</i>, <i>ir → ve</i>, <i>tener → ten</i>, <i>hacer → haz</i>, <i>decir → di</i>, <i>venir → ven</i>, <i>poner → pon</i>, <i>salir → sal</i>.</p>
        <p>Pronomen hängen bejaht hinten an, verneint stehen sie davor: <i>¡Dí<b>melo</b>!</i> gegen <i>¡<b>No me lo</b> digas!</i></p>` },
    ],
  },
];
