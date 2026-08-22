// Grammatik-Kapitel Portugiesisch (europäisches Portugiesisch) — werden
// im Lernkurs vor der jeweiligen Lektion (beforeLesson) eingeschoben und
// sind in der Übersicht nachlesbar.
export const grammar = [
  {
    id: 'intro', title: 'So funktioniert Portugiesisch', icon: 'fa-compass', beforeLesson: 1,
    drills: [
      {"q": "Wie klingt „lh“ in „mulher“ (Frau)?", "options": ["wie lj (span. ll)", "wie l", "wie lch", "wie sch"], "answer": 0, "why": "lh ist ein palataler Laut, ähnlich dem spanischen ll."},
      {"q": "Wie klingt „nh“ in „amanhã“ (morgen)?", "options": ["wie nj", "wie n", "wie ng", "wie gn"], "answer": 0, "why": "nh klingt wie das nj in „Panjab“."},
      {"q": "Was passiert mit unbetonten e/o im europäischen Portugiesisch?", "options": ["sie werden fast verschluckt", "sie werden gedehnt", "sie werden betont", "nichts"], "answer": 0, "why": "Anders als im brasilianischen Portugiesisch reduziert Portugal unbetonte Vokale stark — „pequeno“ klingt fast wie „p'queno“."},
      {"q": "Wie klingt „ão“ in „não“ (nein)?", "options": ["nasal, wie näung", "wie o", "wie an", "wie on"], "answer": 0, "why": "Die Tilde macht den Vokal nasal — durch die Nase gesprochen."},
    ],
    pages: [
      { heading: 'Eine romanische Weltsprache', html: `
        <p>Portugiesisch gehört zu den <b>romanischen Sprachen</b> und ist Amtssprache in Portugal, Brasilien, Angola, Mosambik und weiteren Ländern — insgesamt über 250 Millionen Sprecher. Dieser Kurs lehrt das <b>europäische Portugiesisch</b> (wie in Portugal gesprochen), das sich von der brasilianischen Variante besonders in Aussprache und einigen Wörtern unterscheidet.</p>
        <p>Zwei Gewöhnungssachen für Deutsche:</p>
        <ul>
          <li>Verben werden <b>stark konjugiert</b> — das Personalpronomen lässt man meist weg (<i>falo</i> heißt schon „ich spreche“).</li>
          <li>Adjektive stehen meist <b>nach</b> dem Substantiv: <i>a casa branca</i> — das weiße Haus.</li>
        </ul>` },
      { heading: 'Aussprache: Nasale und verschluckte Vokale', html: `
        <table class="gr-table">
          <tr><th>Schreibung</th><th>Aussprache</th><th>Beispiel</th></tr>
          <tr><td>ão, ãe, õe</td><td>nasal (durch die Nase)</td><td><i>não</i>, <i>mãe</i>, <i>põe</i></td></tr>
          <tr><td>lh</td><td>„lj“ (span. ll)</td><td><i>mulher</i> → muljér</td></tr>
          <tr><td>nh</td><td>„nj“</td><td><i>vinho</i> → vinjo</td></tr>
          <tr><td>ç</td><td>immer „ss“</td><td><i>começar</i> → komessár</td></tr>
          <tr><td>s zwischen Vokalen</td><td>„s“ wie in „Rose“</td><td><i>casa</i> → kaasa</td></tr>
          <tr><td>s / z am Wortende</td><td>„sch“ (in Portugal)</td><td><i>livros</i> → líwrusch</td></tr>
        </table>
        <div class="grammar-tip">💡 In Portugal werden unbetonte Vokale stark reduziert — schriftliches „e“ klingt oft nur wie ein kurzes „ə“ oder verschwindet fast. Das macht gesprochenes Portugiesisch anfangs schwerer zu verstehen als geschriebenes.</div>` },
    ],
  },
  {
    id: 'nouns', title: 'Substantive, Artikel & Adjektive', icon: 'fa-cube', beforeLesson: 2,
    drills: [
      {"q": "____ livro (ein Buch)", "options": ["um", "uma", "uns", "o"], "answer": 0, "why": "Wörter auf -o sind meist männlich: um livro."},
      {"q": "____ casa (ein Haus)", "options": ["uma", "um", "umas", "a"], "answer": 0, "why": "Wörter auf -a sind meist weiblich: uma casa."},
      {"q": "Plural von „pão“ (Brot)?", "options": ["pães", "pãos", "pões", "pãs"], "answer": 0, "why": "Bei -ão-Wörtern lernt man den Plural einzeln — hier auf -ães."},
      {"q": "Plural von „coração“ (Herz)?", "options": ["corações", "coraçãos", "coraçães", "coraçãs"], "answer": 0, "why": "Die häufigste -ão-Pluralform ist -ões."},
    ],
    pages: [
      { heading: 'Männlich oder weiblich', html: `
        <p>Jedes Substantiv ist <b>männlich oder weiblich</b> — ein „das“ gibt es nicht. Die Endung verrät meist das Geschlecht:</p>
        <table class="gr-table">
          <tr><th></th><th>männlich</th><th>weiblich</th></tr>
          <tr><td>typische Endung</td><td><b>-o</b>: <i>o livro</i></td><td><b>-a</b>: <i>a casa</i></td></tr>
          <tr><td>bestimmter Artikel</td><td><b>o</b> / Plural <b>os</b></td><td><b>a</b> / Plural <b>as</b></td></tr>
          <tr><td>unbestimmter Artikel</td><td><b>um</b> livro</td><td><b>uma</b> casa</td></tr>
        </table>
        <p><b>Plural:</b> meist <b>-s</b> anhängen (<i>livro → livros</i>). Wörter auf <b>-ão</b> sind unregelmäßig: meist <b>-ões</b> (<i>coração → corações</i>), seltener <b>-ães</b> (<i>pão → pães</i>) oder <b>-ãos</b> (<i>mão → mãos</i>) — das lernt man Wort für Wort.</p>` },
      { heading: 'Adjektive passen sich an', html: `
        <p>Adjektive richten sich in <b>Geschlecht und Zahl</b> nach ihrem Substantiv und stehen meist dahinter:</p>
        <ul>
          <li><i>o gato <b>preto</b></i> — die schwarze Katze (m.)</li>
          <li><i>a casa <b>preta</b></i> — das schwarze Haus (w.)</li>
          <li><i>os gatos <b>pretos</b></i>, <i>as casas <b>pretas</b></i> — Plural</li>
        </ul>
        <div class="grammar-tip">💡 Adjektive auf <b>-e</b> (wie <i>grande</i>, <i>verde</i>) haben nur eine Form für männlich und weiblich.</div>` },
    ],
  },
  {
    id: 'verbs', title: 'Verben: -ar, -er, -ir', icon: 'fa-bolt', beforeLesson: 4,
    drills: [
      {"q": "eu fal____ (ich spreche)", "options": ["o", "as", "a", "amos"], "answer": 0, "why": "1. Person Singular auf -o."},
      {"q": "nós com____ (wir essen)", "options": ["emos", "eis", "em", "es"], "answer": 0, "why": "-er-Verben: comemos."},
      {"q": "Braucht Portugiesisch das Personalpronomen?", "options": ["nein, die Endung genügt", "ja, immer", "nur in Fragen", "nur im Plural"], "answer": 0, "why": "eu und tu betonen nur, die Verbendung sagt schon, wer gemeint ist."},
      {"q": "Wie viele Konjugationen gibt es?", "options": ["drei", "zwei", "vier", "eine"], "answer": 0, "why": "-ar, -er und -ir."},
    ],
    pages: [
      { heading: 'Die drei Konjugationen im Präsens', html: `
        <p>Alle portugiesischen Verben enden auf <b>-ar, -er oder -ir</b>. Man streicht die Endung und hängt die Personalendung an — dadurch kann das Pronomen fast immer wegfallen:</p>
        <table class="gr-table">
          <tr><th>Person</th><th>fal<b>ar</b> (sprechen)</th><th>com<b>er</b> (essen)</th><th>part<b>ir</b> (abreisen)</th></tr>
          <tr><td>eu (ich)</td><td>fal<b>o</b></td><td>com<b>o</b></td><td>part<b>o</b></td></tr>
          <tr><td>tu (du)</td><td>fal<b>as</b></td><td>com<b>es</b></td><td>part<b>es</b></td></tr>
          <tr><td>ele/ela (er/sie)</td><td>fal<b>a</b></td><td>com<b>e</b></td><td>part<b>e</b></td></tr>
          <tr><td>nós (wir)</td><td>fal<b>amos</b></td><td>com<b>emos</b></td><td>part<b>imos</b></td></tr>
          <tr><td>vós (ihr)</td><td>fal<b>ais</b></td><td>com<b>eis</b></td><td>part<b>is</b></td></tr>
          <tr><td>eles/elas (sie)</td><td>fal<b>am</b></td><td>com<b>em</b></td><td>part<b>em</b></td></tr>
        </table>
        <div class="grammar-tip">💡 In Portugal spricht man mit Fremden meist in der 3. Person: <i>o senhor fala</i> statt <i>tu falas</i>. „vós“ ist heute selten — die meisten sagen für „ihr“ einfach <i>vocês</i> + 3. Person Plural.</div>` },
      { heading: 'Die drei unentbehrlichen Verben', html: `
        <table class="gr-table">
          <tr><th>Person</th><th>ser (sein)</th><th>estar (sein)</th><th>ter (haben)</th></tr>
          <tr><td>eu</td><td>sou</td><td>estou</td><td>tenho</td></tr>
          <tr><td>tu</td><td>és</td><td>estás</td><td>tens</td></tr>
          <tr><td>ele/ela</td><td>é</td><td>está</td><td>tem</td></tr>
          <tr><td>nós</td><td>somos</td><td>estamos</td><td>temos</td></tr>
          <tr><td>eles/elas</td><td>são</td><td>estão</td><td>têm</td></tr>
        </table>
        <p>Diese drei sind hochunregelmäßig, aber so häufig, dass sie sich schnell einprägen.</p>` },
    ],
  },
  {
    id: 'serestar', title: 'ser oder estar?', icon: 'fa-scale-balanced', beforeLesson: 7,
    drills: [
      {"q": "Ana ____ médica. (Beruf, dauerhaft)", "options": ["é", "está", "tem", "faz"], "answer": 0, "why": "Berufe und feste Eigenschaften stehen mit ser."},
      {"q": "A sopa ____ quente. (im Moment)", "options": ["está", "é", "tem", "faz"], "answer": 0, "why": "Vorübergehende Zustände stehen mit estar."},
      {"q": "Wie sagt man „ich spreche gerade“ in Portugal?", "options": ["estou a falar", "estou falando", "vou falar", "ando a falar"], "answer": 0, "why": "estar a + Infinitiv ist die Verlaufsform in Portugal — im brasilianischen Portugiesisch heißt es „estou falando“."},
      {"q": "____ dez horas. (Uhrzeit)", "options": ["São", "Estão", "Têm", "Fazem"], "answer": 0, "why": "Uhrzeit steht immer mit ser."},
    ],
    pages: [
      { heading: 'Zwei Verben für „sein“', html: `
        <p>Portugiesisch unterscheidet wie Spanisch zwei Arten von „sein“:</p>
        <table class="gr-table">
          <tr><th>ser — bleibende Merkmale</th><th>estar — vorübergehende Zustände</th></tr>
          <tr><td>Beruf, Herkunft, Charakter: <i>é professor</i></td><td>Befinden, Ort, Wetter: <i>está cansado</i></td></tr>
          <tr><td>Uhrzeit, Datum: <i>são três horas</i></td><td>Zustand: <i>a porta está aberta</i></td></tr>
        </table>
        <div class="grammar-tip">💡 Eselsbrücke: <i>ser</i> = Wesen (was etwas <b>ist</b>), <i>estar</i> = Stand (wo/wie etwas gerade <b>steht</b>).</div>` },
      { heading: 'Die Verlaufsform: estar a + Infinitiv', html: `
        <p>Um zu sagen, dass etwas gerade passiert, verwendet das europäische Portugiesisch <b>estar a</b> + Infinitiv — nicht das Gerundium wie im Spanischen oder brasilianischen Portugiesisch:</p>
        <ul>
          <li><i>Estou a falar</i> — ich spreche gerade</li>
          <li><i>Ela está a comer</i> — sie isst gerade</li>
          <li>brasilianisch: <i>Estou falando</i> — dieselbe Bedeutung, andere Bauweise</li>
        </ul>` },
    ],
  },
  {
    id: 'questions', title: 'Fragen & Verneinung', icon: 'fa-circle-question', beforeLesson: 11,
    drills: [
      {"q": "Wie erkennt man eine Frage beim Schreiben?", "options": ["nur am Fragezeichen am Ende", "an einem ¿ am Anfang", "an der Wortstellung", "am Ausrufezeichen"], "answer": 0, "why": "Anders als im Spanischen gibt es kein Fragezeichen am Satzanfang — nur am Ende."},
      {"q": "Wie verneint man einen Satz?", "options": ["não vor das Verb", "não hinter das Verb", "nicht möglich", "no vor das Verb"], "answer": 0, "why": "Não falo inglês — não steht direkt vor dem Verb."},
      {"q": "Não como ____. (nichts)", "options": ["nada", "algo", "tudo", "ninguém"], "answer": 0, "why": "Doppelte Verneinung ist im Portugiesischen normal: não … nada."},
      {"q": "____ falas português? (Warum)", "options": ["Porque", "Onde", "Quando", "Como"], "answer": 0, "why": "porque = warum; als Antwort auch „porque“ (weil), getrennt geschrieben als Frage „por que“."},
    ],
    pages: [
      { heading: 'Fragen ohne umgedrehte Satzzeichen', html: `
        <p>Anders als im Spanischen beginnt eine portugiesische Frage <b>nicht</b> mit einem umgedrehten Fragezeichen — nur am Satzende steht eines: <i>Falas português?</i> Oft ändert sich sonst nichts an der Wortstellung, nur die Sprechmelodie steigt am Ende an.</p>
        <table class="gr-table">
          <tr><th>Fragewort</th><th>Bedeutung</th></tr>
          <tr><td>o quê / que</td><td>was</td></tr>
          <tr><td>quem</td><td>wer</td></tr>
          <tr><td>onde</td><td>wo</td></tr>
          <tr><td>quando</td><td>wann</td></tr>
          <tr><td>como</td><td>wie</td></tr>
          <tr><td>porquê / porque</td><td>warum / weil</td></tr>
        </table>` },
      { heading: 'Verneinung: não vor dem Verb', html: `
        <p>Man verneint, indem man <b>não</b> direkt vor das Verb stellt: <i>Não falo francês</i> — Ich spreche kein Französisch.</p>
        <p>Bei weiteren Verneinungswörtern (<i>nada</i> „nichts“, <i>ninguém</i> „niemand“, <i>nunca</i> „nie“) bleibt <b>não</b> stehen — anders als im Deutschen ist doppelte Verneinung hier korrekt und sogar Pflicht:</p>
        <ul>
          <li><i>Não vejo <b>nada</b></i> — Ich sehe nichts (wörtlich: „nicht sehe ich nichts“)</li>
          <li><i>Não vem <b>ninguém</b></i> — Niemand kommt</li>
        </ul>` },
    ],
  },
  {
    id: 'past', title: 'Vergangenheit & nahe Zukunft', icon: 'fa-clock-rotate-left', beforeLesson: 16,
    drills: [
      {"q": "eu fal____ (ich sprach — pretérito perfeito)", "options": ["ei", "ou", "aste", "amos"], "answer": 0, "why": "1. Person Singular des pretérito perfeito auf -ei bei -ar-Verben."},
      {"q": "ela com____ (sie aß)", "options": ["eu", "i", "este", "eram"], "answer": 0, "why": "3. Person Singular -er-Verben: comeu."},
      {"q": "Wie bildet man die nahe Zukunft?", "options": ["ir + Infinitiv", "estar + Infinitiv", "ter + Partizip", "ser + Infinitiv"], "answer": 0, "why": "Vou falar — ich werde gleich sprechen, wörtlich „ich gehe sprechen“."},
      {"q": "Vou ____ português amanhã. (lernen)", "options": ["estudar", "estudo", "estudei", "estudando"], "answer": 0, "why": "Nach ir folgt immer der Infinitiv."},
    ],
    pages: [
      { heading: 'Pretérito perfeito: die abgeschlossene Vergangenheit', html: `
        <p>Für eine abgeschlossene Handlung in der Vergangenheit dient das <b>pretérito perfeito simples</b>:</p>
        <table class="gr-table">
          <tr><th>Person</th><th>fal<b>ar</b></th><th>com<b>er</b></th><th>part<b>ir</b></th></tr>
          <tr><td>eu</td><td>fal<b>ei</b></td><td>com<b>i</b></td><td>part<b>i</b></td></tr>
          <tr><td>tu</td><td>fal<b>aste</b></td><td>com<b>este</b></td><td>part<b>iste</b></td></tr>
          <tr><td>ele/ela</td><td>fal<b>ou</b></td><td>com<b>eu</b></td><td>part<b>iu</b></td></tr>
          <tr><td>nós</td><td>fal<b>ámos</b></td><td>com<b>emos</b></td><td>part<b>imos</b></td></tr>
          <tr><td>eles/elas</td><td>fal<b>aram</b></td><td>com<b>eram</b></td><td>part<b>iram</b></td></tr>
        </table>` },
      { heading: 'Nahe Zukunft: ir + Infinitiv', html: `
        <p>Wie im Deutschen „ich werde gleich …“ bildet man die nahe Zukunft mit dem konjugierten <b>ir</b> + Infinitiv:</p>
        <ul>
          <li><i>Vou comer</i> — ich werde gleich essen</li>
          <li><i>Vais estudar</i> — du wirst gleich lernen</li>
          <li><i>Vamos viajar</i> — wir werden gleich reisen</li>
        </ul>
        <div class="grammar-tip">💡 Diese Form ist im Alltag viel häufiger als das eigentliche Futur (siehe späteres Kapitel).</div>` },
    ],
  },
  {
    id: 'adjectives', title: 'Adjektive: Angleichung & Stellung', icon: 'fa-palette', beforeLesson: 22,
    drills: [
      {"q": "um carro ____ (schnell, m.)", "options": ["rápido", "rápida", "rápidos", "rápidas"], "answer": 0, "why": "Männliches Substantiv, Singular → -o."},
      {"q": "umas casas ____ (groß, w. Plural)", "options": ["grandes", "grande", "grandas", "grandos"], "answer": 0, "why": "Adjektive auf -e haben nur eine Form, bekommen aber im Plural -s."},
      {"q": "Wo steht das Adjektiv meist?", "options": ["nach dem Substantiv", "immer davor", "am Satzende", "egal"], "answer": 0, "why": "a casa branca — anders als im Deutschen."},
      {"q": "um dia ____ (schön)", "options": ["bonito", "bonita", "bonitos", "bonitas"], "answer": 0, "why": "dia ist männlich, obwohl es auf -a endet — eine Ausnahme."},
    ],
    pages: [
      { heading: 'Angleichung an das Substantiv', html: `
        <p>Adjektive passen sich in <b>Geschlecht und Zahl</b> an:</p>
        <ul>
          <li><i>o gato preto</i> / <i>a gata preta</i> / <i>os gatos pretos</i> / <i>as gatas pretas</i></li>
          <li>Adjektive auf <b>-e</b> (<i>grande, forte, alegre</i>) bleiben bei Geschlecht gleich: <i>o carro grande</i>, <i>a casa grande</i>.</li>
        </ul>` },
      { heading: 'Stellung: meist dahinter', html: `
        <p>Die meisten Adjektive stehen <b>nach</b> dem Substantiv: <i>uma casa bonita</i>. Einige kurze, häufige Adjektive stehen aber traditionell davor und ändern manchmal leicht die Bedeutung:</p>
        <ul>
          <li><i>um grande homem</i> — ein großartiger Mann</li>
          <li><i>um homem grande</i> — ein großer (körperlich) Mann</li>
        </ul>
        <div class="grammar-tip">💡 Im Zweifel: hinter das Substantiv stellen — das ist fast immer richtig.</div>` },
    ],
  },
  {
    id: 'gostar', title: 'gostar de — Vorlieben ausdrücken', icon: 'fa-heart', beforeLesson: 29,
    drills: [
      {"q": "Eu ____ de café. (ich mag)", "options": ["gosto", "gosta", "gostas", "gostam"], "answer": 0, "why": "1. Person Singular: gosto."},
      {"q": "Was folgt immer auf „gostar“?", "options": ["de", "a", "para", "nichts"], "answer": 0, "why": "gostar de café, gostar de nadar — nie ohne „de“."},
      {"q": "Wie ist die Satzstellung bei „gostar“?", "options": ["ganz normal: Person + gostar de + Sache", "umgekehrt wie spanisch gustar", "Sache zuerst", "immer mit Objektpronomen"], "answer": 0, "why": "Anders als das spanische „gustar“ verhält sich „gostar de“ wie ein normales Verb: Ich (Subjekt) mag (Verb) etwas."},
      {"q": "Gostas ____ nadar? (schwimmen)", "options": ["de", "a", "para", "em"], "answer": 0, "why": "gostar de + Infinitiv drückt eine Vorliebe für eine Tätigkeit aus."},
    ],
    pages: [
      { heading: 'gostar de: ganz normaler Satzbau', html: `
        <p>Vorlieben drückt man mit <b>gostar de</b> aus — anders als im Spanischen (<i>gustar</i>) verhält sich das portugiesische Verb wie ein gewöhnliches Verb: die Person, die mag, ist ganz normal das Subjekt:</p>
        <ul>
          <li><i>Eu gosto de café</i> — Ich mag Kaffee (wörtlich: „ich mag von Kaffee“)</li>
          <li><i>Tu gostas de música</i> — Du magst Musik</li>
          <li><i>Nós gostamos de viajar</i> — Wir reisen gern</li>
        </ul>
        <div class="grammar-tip">💡 Das „de“ verschmilzt oft mit dem folgenden Artikel: de + o → do, de + a → da. „Gosto do livro“ — Ich mag das Buch.</div>` },
      { heading: 'Verneinung und Nachfragen', html: `
        <p><i>Não gosto de peixe</i> — Ich mag keinen Fisch. <i>De que gostas?</i> — Was magst du? Auch <b>adorar</b> (lieben, sehr mögen) und <b>detestar</b> (hassen) funktionieren mit „de“:</p>
        <ul>
          <li><i>Adoro este filme</i> — Ich liebe diesen Film (adorar braucht kein „de“)</li>
          <li><i>Detesto acordar cedo</i> — Ich hasse es, früh aufzuwachen</li>
        </ul>` },
    ],
  },
  {
    id: 'possessive', title: 'Besitz & Demonstrativa', icon: 'fa-hand-holding', beforeLesson: 36,
    drills: [
      {"q": "____ livro (mein Buch)", "options": ["o meu", "a minha", "o seu", "a sua"], "answer": 0, "why": "meu passt sich dem Substantiv an: o meu livro, a minha casa."},
      {"q": "____ casa (deine Wohnung, w.)", "options": ["a tua", "o teu", "a sua", "o seu"], "answer": 0, "why": "tua für weiblich, teu für männlich."},
      {"q": "____ (dieses hier, nah beim Sprecher)", "options": ["este", "esse", "aquele", "aquilo"], "answer": 0, "why": "este = nah bei mir; esse = nah bei dir; aquele = weit weg von beiden."},
      {"q": "Was bedeutet „aquele carro“?", "options": ["jenes Auto (weit weg)", "dieses Auto (bei mir)", "das Auto (bei dir)", "kein Auto"], "answer": 0, "why": "aquele markiert die größte Entfernung."},
    ],
    pages: [
      { heading: 'Possessivpronomen richten sich nach dem Besitz', html: `
        <p>Anders als im Deutschen richtet sich das Possessivpronomen nicht nach dem Besitzer, sondern nach dem <b>besessenen Gegenstand</b>, und steht meist mit Artikel:</p>
        <table class="gr-table">
          <tr><th></th><th>männlich</th><th>weiblich</th></tr>
          <tr><td>mein</td><td>o meu</td><td>a minha</td></tr>
          <tr><td>dein</td><td>o teu</td><td>a tua</td></tr>
          <tr><td>sein/ihr/Ihr</td><td>o seu</td><td>a sua</td></tr>
          <tr><td>unser</td><td>o nosso</td><td>a nossa</td></tr>
        </table>
        <p><i>O meu carro</i> — mein Auto. <i>A minha casa</i> — mein Haus.</p>` },
      { heading: 'Drei Entfernungsstufen: este, esse, aquele', html: `
        <p>Portugiesisch unterscheidet — wie das Spanische — drei Entfernungsgrade bei „dieser/jener“:</p>
        <table class="gr-table">
          <tr><th>este</th><th>esse</th><th>aquele</th></tr>
          <tr><td>nah bei mir</td><td>nah bei dir</td><td>weit von uns beiden</td></tr>
        </table>
        <div class="grammar-tip">💡 Die neutralen Formen <i>isto, isso, aquilo</i> benutzt man, wenn man auf etwas Unbestimmtes zeigt, ohne sein Geschlecht zu kennen: „O que é isto?“ — Was ist das?</div>` },
    ],
  },
  {
    id: 'future', title: 'Futuro simples & Bedingungen', icon: 'fa-forward', beforeLesson: 42,
    drills: [
      {"q": "eu falar____ (ich werde sprechen)", "options": ["ei", "ás", "á", "emos"], "answer": 0, "why": "Futuro simples: Infinitiv + ei/ás/á/emos/ão."},
      {"q": "Woraus wird das Futuro simples gebildet?", "options": ["dem vollständigen Infinitiv", "dem Verbstamm", "dem Partizip", "dem Gerundium"], "answer": 0, "why": "Anders als im Deutschen hängt man die Endung direkt an den Infinitiv: falar + ei."},
      {"q": "eles falar____ (sie werden sprechen)", "options": ["ão", "ei", "á", "emos"], "answer": 0, "why": "3. Person Plural: -ão."},
      {"q": "Welche Form ist im Alltag häufiger?", "options": ["vou falar (nahe Zukunft)", "falarei (futuro simples)", "beide gleich häufig", "keine von beiden"], "answer": 0, "why": "Im gesprochenen Portugiesisch dominiert „ir + Infinitiv“; das futuro simples wirkt formeller."},
    ],
    pages: [
      { heading: 'Futuro simples: an den Infinitiv angehängt', html: `
        <p>Das Futuro simples ist eine der wenigen Formen, bei der die Endung direkt an den <b>vollständigen Infinitiv</b> gehängt wird — bei allen drei Konjugationen gleich:</p>
        <table class="gr-table">
          <tr><th>Person</th><th>falar</th><th>comer</th><th>partir</th></tr>
          <tr><td>eu</td><td>falar<b>ei</b></td><td>comer<b>ei</b></td><td>partir<b>ei</b></td></tr>
          <tr><td>tu</td><td>falar<b>ás</b></td><td>comer<b>ás</b></td><td>partir<b>ás</b></td></tr>
          <tr><td>ele/ela</td><td>falar<b>á</b></td><td>comer<b>á</b></td><td>partir<b>á</b></td></tr>
          <tr><td>nós</td><td>falar<b>emos</b></td><td>comer<b>emos</b></td><td>partir<b>emos</b></td></tr>
          <tr><td>eles/elas</td><td>falar<b>ão</b></td><td>comer<b>ão</b></td><td>partir<b>ão</b></td></tr>
        </table>` },
      { heading: 'Eine Besonderheit: die Mesoklise', html: `
        <p>Nur im Portugiesischen kann ein Objektpronomen mitten in die Futurform <b>hineinrutschen</b> — das nennt man Mesoklise: <i>ajudar-te-ei</i> — „ich werde dir helfen“ (statt <i>te ajudarei</i>). Im gesprochenen Alltag ist das selten und wirkt gehoben; die einfache Form mit vorangestelltem Pronomen genügt völlig.</p>` },
    ],
  },
  {
    id: 'numbers', title: 'Zahlen, Uhrzeit & Datum', icon: 'fa-clock', beforeLesson: 48,
    drills: [
      {"q": "Wie fragt man nach der Uhrzeit?", "options": ["Que horas são?", "Que hora é?", "Quando é?", "Onde são?"], "answer": 0, "why": "Uhrzeit steht im Plural: „Que horas são?“ — „São três horas.“"},
      {"q": "É uma ____ (ein Uhr, Singular!)", "options": ["hora", "horas", "horo", "horas'"], "answer": 0, "why": "Nur bei „ein Uhr“ steht der Singular: É uma hora."},
      {"q": "vinte e ____ (einundzwanzig)", "options": ["um", "uma", "unos", "primeiro"], "answer": 0, "why": "Zusammengesetzte Zahlen mit „e“: vinte e um."},
      {"q": "o ____ de janeiro (der erste Januar)", "options": ["primeiro", "um", "uno", "prima"], "answer": 0, "why": "Nur beim Ersten des Monats nutzt man die Ordnungszahl, sonst die Kardinalzahl: o dois de fevereiro."},
    ],
    pages: [
      { heading: 'Zahlen und Uhrzeit', html: `
        <p>Zahlen von 16 bis 19 und ab 21 werden mit <b>e</b> verbunden: <i>dezasseis</i> (16), <i>vinte e um</i> (21). Die Uhrzeit steht fast immer im Plural mit <b>ser</b>: <i>São três horas</i> — es ist drei Uhr. Nur „ein Uhr“ ist Singular: <i>É uma hora</i>.</p>
        <table class="gr-table">
          <tr><th>Ausdruck</th><th>Bedeutung</th></tr>
          <tr><td>São três e meia</td><td>es ist halb vier (3:30)</td></tr>
          <tr><td>São três e um quarto</td><td>es ist Viertel nach drei</td></tr>
          <tr><td>São quinze para as quatro</td><td>es ist Viertel vor vier</td></tr>
        </table>` },
      { heading: 'Das Datum', html: `
        <p>Beim Datum steht — anders als im Deutschen — nur beim <b>Ersten</b> des Monats die Ordnungszahl, sonst die Kardinalzahl: <i>o primeiro de maio</i>, aber <i>o dois de maio</i>, <i>o dez de maio</i>.</p>` },
    ],
  },
  {
    id: 'pronouns', title: 'Objektpronomen & ihre Stellung', icon: 'fa-hand-point-right', beforeLesson: 54,
    drills: [
      {"q": "Wo steht das Pronomen normalerweise im Hauptsatz?", "options": ["hinter dem Verb, mit Bindestrich", "vor dem Verb", "egal", "nie direkt am Verb"], "answer": 0, "why": "Ajudo-te — im bejahten Hauptsatz steht das Pronomen hinter dem Verb (Enklise)."},
      {"q": "Não ____ vejo. (dich, vor dem Verb wegen „não“)", "options": ["te", "-te", "ti", "tu"], "answer": 0, "why": "Verneinung, Fragewörter und bestimmte Konjunktionen ziehen das Pronomen VOR das Verb (Proklise)."},
      {"q": "Wie heißt „ich helfe dir“ mit Enklise?", "options": ["Ajudo-te", "Te ajudo", "Ajudo te", "-Te ajudo"], "answer": 0, "why": "Im bejahten Hauptsatz: Verb + Bindestrich + Pronomen."},
      {"q": "Was ist die Mesoklise?", "options": ["Pronomen mitten im Futur/Konditional", "Pronomen vor dem Verb", "gar kein Pronomen", "doppeltes Pronomen"], "answer": 0, "why": "ajudar-te-ei — nur im Futur und Konditional möglich, eine Besonderheit des Portugiesischen."},
    ],
    pages: [
      { heading: 'Drei mögliche Positionen', html: `
        <p>Portugiesisch ist unter den romanischen Sprachen einzigartig: Das Objektpronomen kann vor, nach oder sogar <b>in</b> dem Verb stehen.</p>
        <table class="gr-table">
          <tr><th>Regel</th><th>Beispiel</th></tr>
          <tr><td><b>Enklise</b> (Standard im Hauptsatz)</td><td><i>Ajudo-te</i> — ich helfe dir</td></tr>
          <tr><td><b>Proklise</b> (nach não, Fragewörtern, dass-Sätzen …)</td><td><i>Não te ajudo</i> — ich helfe dir nicht</td></tr>
          <tr><td><b>Mesoklise</b> (nur im Futur/Konditional, gehoben)</td><td><i>Ajudar-te-ei</i> — ich werde dir helfen</td></tr>
        </table>
        <div class="grammar-tip">💡 Im gesprochenen Alltag reicht es, sich Proklise nach „não“ zu merken — der Rest kommt mit der Zeit von selbst.</div>` },
      { heading: 'Die Pronomen selbst', html: `
        <table class="gr-table">
          <tr><th>Person</th><th>Pronomen</th></tr>
          <tr><td>mich</td><td>me</td></tr>
          <tr><td>dich</td><td>te</td></tr>
          <tr><td>ihn/es/Sie (m.)</td><td>o</td></tr>
          <tr><td>sie/es/Sie (w.)</td><td>a</td></tr>
          <tr><td>uns</td><td>nos</td></tr>
        </table>` },
    ],
  },
  {
    id: 'perfimperf', title: 'Pretérito Perfeito oder Imperfeito?', icon: 'fa-clock-rotate-left', beforeLesson: 60,
    drills: [
      {"q": "Ontem eu ____ ao cinema. (ging, einmalig)", "options": ["fui", "ia", "era", "estava"], "answer": 0, "why": "Eine einmalige, abgeschlossene Handlung steht im pretérito perfeito."},
      {"q": "Quando era criança, eu ____ muito. (spielte gewohnheitsmäßig)", "options": ["brincava", "brinquei", "brinco", "brincar"], "answer": 0, "why": "Gewohnheiten in der Vergangenheit stehen im imperfeito."},
      {"q": "eu falava, tu falavas, ele ____ (imperfeito)", "options": ["falava", "falou", "falei", "falará"], "answer": 0, "why": "Das imperfeito hat für eu/ele/ela dieselbe Form."},
      {"q": "Welche Zeit beschreibt eine Kulisse (\"es war Nacht...\")?", "options": ["imperfeito", "pretérito perfeito", "futuro", "condicional"], "answer": 0, "why": "Beschreibungen und Hintergründe stehen typischerweise im imperfeito."},
    ],
    pages: [
      { heading: 'Zwei Blickwinkel auf die Vergangenheit', html: `
        <p>Portugiesisch unterscheidet wie Spanisch und Französisch zwei Vergangenheitsformen:</p>
        <table class="gr-table">
          <tr><th>pretérito perfeito — abgeschlossen</th><th>imperfeito — Gewohnheit, Hintergrund</th></tr>
          <tr><td>Fui ao cinema ontem.</td><td>Ia ao cinema todos os domingos.</td></tr>
          <tr><td>(Ich ging gestern ins Kino — einmal, fertig)</td><td>(Ich ging jeden Sonntag ins Kino — Gewohnheit)</td></tr>
        </table>` },
      { heading: 'Die Formen des imperfeito', html: `
        <table class="gr-table">
          <tr><th>Person</th><th>fal<b>ar</b></th><th>com<b>er</b></th><th>part<b>ir</b></th></tr>
          <tr><td>eu / ele / ela</td><td>fal<b>ava</b></td><td>com<b>ia</b></td><td>part<b>ia</b></td></tr>
          <tr><td>tu</td><td>fal<b>avas</b></td><td>com<b>ias</b></td><td>part<b>ias</b></td></tr>
          <tr><td>nós</td><td>fal<b>ávamos</b></td><td>com<b>íamos</b></td><td>part<b>íamos</b></td></tr>
          <tr><td>eles/elas</td><td>fal<b>avam</b></td><td>com<b>iam</b></td><td>part<b>iam</b></td></tr>
        </table>
        <div class="grammar-tip">💡 Eselsbrücke: das imperfeito malt das Bild („es war …, es gab …“), das pretérito perfeito erzählt, was darin geschah.</div>` },
    ],
  },
  {
    id: 'reflexive', title: 'Reflexive Verben', icon: 'fa-rotate', beforeLesson: 68,
    drills: [
      {"q": "Eu ____ às sete. (ich wache auf)", "options": ["acordo-me", "me acordo", "acordo", "acordar-me"], "answer": 0, "why": "Im bejahten Hauptsatz hängt sich das Reflexivpronomen ans Verb: acordo-me."},
      {"q": "Como te ____? (wie heißt du)", "options": ["chamas", "chama", "chamo", "chamam"], "answer": 0, "why": "2. Person: chamas, mit vorgestelltem „te“ wegen des Fragewortes."},
      {"q": "Nós ____ cedo. (wir waschen uns)", "options": ["lavamo-nos", "nos lavamos", "lavamos-nos", "lavamos"], "answer": 0, "why": "1. Person Plural + nos, mit Bindestrich und einem entfallenden -s: lavamo-nos."},
      {"q": "Welches Pronomen gehört zu „eles“?", "options": ["se", "te", "nos", "me"], "answer": 0, "why": "se ist reflexiv für er/sie/es/Sie und sie (Plural)."},
    ],
    pages: [
      { heading: 'Sich selbst betreffende Handlungen', html: `
        <p>Reflexive Verben beziehen die Handlung auf das Subjekt zurück und funktionieren wie normale Verben, nur mit einem zusätzlichen Pronomen:</p>
        <table class="gr-table">
          <tr><th>Person</th><th>chamar-se (sich nennen)</th></tr>
          <tr><td>eu</td><td>chamo-me</td></tr>
          <tr><td>tu</td><td>chamas-te</td></tr>
          <tr><td>ele/ela</td><td>chama-se</td></tr>
          <tr><td>nós</td><td>chamamo-nos</td></tr>
          <tr><td>eles/elas</td><td>chamam-se</td></tr>
        </table>` },
      { heading: 'Häufige reflexive Verben', html: `
        <ul>
          <li><i>levantar-se</i> — aufstehen</li>
          <li><i>vestir-se</i> — sich anziehen</li>
          <li><i>sentar-se</i> — sich hinsetzen</li>
          <li><i>deitar-se</i> — sich hinlegen</li>
        </ul>
        <div class="grammar-tip">💡 Bei „nós“ fällt das -s vor -nos weg: lavamos → lavamo-nos.</div>` },
    ],
  },
  {
    id: 'comparison', title: 'Steigern & vergleichen', icon: 'fa-ranking-star', beforeLesson: 74,
    drills: [
      {"q": "mais alto ____ eu (größer als ich)", "options": ["do que", "que", "como", "de"], "answer": 0, "why": "mais … do que — der Standardvergleich."},
      {"q": "tão alto ____ eu (so groß wie ich)", "options": ["como", "que", "do que", "de"], "answer": 0, "why": "tão … como drückt Gleichheit aus."},
      {"q": "o ____ alto da turma (der größte)", "options": ["mais", "menos", "tão", "muito"], "answer": 0, "why": "Superlativ: Artikel + mais + Adjektiv."},
      {"q": "Was ist der Komparativ von „bom“ (gut)?", "options": ["melhor", "mais bom", "boíssimo", "bomior"], "answer": 0, "why": "bom → melhor ist unregelmäßig, wie im Deutschen gut → besser."},
    ],
    pages: [
      { heading: 'Vergleiche', html: `
        <table class="gr-table">
          <tr><th>Mehr als</th><th>Weniger als</th><th>Gleich wie</th></tr>
          <tr><td>mais … do que</td><td>menos … do que</td><td>tão … como</td></tr>
          <tr><td><i>mais rápido do que</i></td><td><i>menos caro do que</i></td><td><i>tão bom como</i></td></tr>
        </table>` },
      { heading: 'Superlativ und Ausnahmen', html: `
        <p>Der Superlativ setzt einfach den Artikel davor: <i>o mais alto</i> — der Größte. Einige Adjektive haben unregelmäßige Steigerungsformen:</p>
        <table class="gr-table">
          <tr><th>Grundform</th><th>Komparativ</th></tr>
          <tr><td>bom (gut)</td><td>melhor</td></tr>
          <tr><td>mau (schlecht)</td><td>pior</td></tr>
          <tr><td>grande (groß)</td><td>maior</td></tr>
          <tr><td>pequeno (klein)</td><td>menor</td></tr>
        </table>` },
    ],
  },
  {
    id: 'subjunctive', title: 'Der Conjuntivo', icon: 'fa-wand-sparkles', beforeLesson: 82,
    drills: [
      {"q": "Espero que ela ____ bem. (kommt an)", "options": ["chegue", "chega", "chegou", "chegará"], "answer": 0, "why": "Nach „esperar que“ (hoffen, dass) folgt der Conjuntivo."},
      {"q": "Talvez ele ____ razão. (hat)", "options": ["tenha", "tem", "teve", "terá"], "answer": 0, "why": "Nach „talvez“ (vielleicht) steht meist der Conjuntivo."},
      {"q": "Was drückt der Conjuntivo aus?", "options": ["Wunsch, Zweifel, Möglichkeit", "reine Tatsachen", "die Vergangenheit", "Befehle"], "answer": 0, "why": "Wie der spanische subjuntivo — für Unsicheres, Erwünschtes, Angezweifeltes."},
      {"q": "Se eu ____ tempo, viajava. (hätte)", "options": ["tivesse", "tenho", "tinha", "terei"], "answer": 0, "why": "Irreale Bedingungssätze nutzen den conjuntivo imperfeito: tivesse."},
    ],
    pages: [
      { heading: 'Wann man den Conjuntivo braucht', html: `
        <p>Der Conjuntivo (Konjunktiv) drückt aus, dass etwas <b>nicht sicher, gewünscht oder ungewiss</b> ist — anders als der Indikativ, der Tatsachen beschreibt:</p>
        <ul>
          <li>nach <i>esperar que</i> (hoffen, dass), <i>querer que</i> (wollen, dass)</li>
          <li>nach <i>talvez</i> (vielleicht), <i>é possível que</i> (es ist möglich, dass)</li>
          <li>in irrealen Bedingungssätzen: <i>Se eu tivesse tempo …</i></li>
        </ul>` },
      { heading: 'Eine Besonderheit: der Infinitivo Pessoal', html: `
        <p>Nur Portugiesisch (und das eng verwandte Galicisch) besitzt den <b>persönlichen Infinitiv</b> — ein Infinitiv, der trotzdem nach Person konjugiert wird:</p>
        <ul>
          <li><i>É importante estudar<b>es</b></i> — es ist wichtig, dass DU lernst</li>
          <li><i>É importante estudar<b>mos</b></i> — es ist wichtig, dass WIR lernen</li>
        </ul>
        <div class="grammar-tip">💡 Das macht manche Sätze einfacher als im Spanischen, weil man dafür keinen vollen Konjunktivsatz braucht.</div>` },
    ],
  },
  {
    id: 'conditional', title: 'Condicional & Bedingungssätze', icon: 'fa-code-branch', beforeLesson: 91,
    drills: [
      {"q": "eu falar____ (ich würde sprechen)", "options": ["ia", "ei", "a", "asse"], "answer": 0, "why": "Condicional: Infinitiv + ia/ias/ia/íamos/iam."},
      {"q": "Gostaria de ____ água. (trinken)", "options": ["beber", "bebo", "bebi", "bebendo"], "answer": 0, "why": "Gostaria de + Infinitiv — eine sehr höfliche Bitte."},
      {"q": "Se tivesse tempo, ____ viajar. (würde ich)", "options": ["iria", "vou", "fui", "irei"], "answer": 0, "why": "Irrealer Bedingungssatz: conjuntivo imperfeito + condicional."},
      {"q": "Was ist die höflichste Art, um etwas zu bitten?", "options": ["Gostaria de …", "Quero …", "Dá-me …", "Vou …"], "answer": 0, "why": "Der Condicional macht Bitten deutlich höflicher, wie im Deutschen „ich hätte gern“."},
    ],
    pages: [
      { heading: 'Das Condicional: höflich und hypothetisch', html: `
        <p>Wie das Futuro simples wird das Condicional an den vollen Infinitiv angehängt:</p>
        <table class="gr-table">
          <tr><th>Person</th><th>falar</th></tr>
          <tr><td>eu</td><td>falar<b>ia</b></td></tr>
          <tr><td>tu</td><td>falar<b>ias</b></td></tr>
          <tr><td>nós</td><td>falar<b>íamos</b></td></tr>
          <tr><td>eles/elas</td><td>falar<b>iam</b></td></tr>
        </table>
        <p><i>Gostaria de um café</i> — Ich hätte gern einen Kaffee. Deutlich höflicher als <i>Quero um café</i>.</p>` },
      { heading: 'Irreale Bedingungssätze', html: `
        <p>Für unwirkliche „Wenn …, dann …“-Sätze kombiniert man <b>se + conjuntivo imperfeito</b> mit dem <b>condicional</b>:</p>
        <p><i>Se tivesse mais tempo, viajaria mais</i> — Wenn ich mehr Zeit hätte, würde ich mehr reisen.</p>` },
    ],
  },
  {
    id: 'relative', title: 'Relativsätze und por / para', icon: 'fa-link', beforeLesson: 101,
    drills: [
      {"q": "o livro ____ eu li (das ich las)", "options": ["que", "quem", "onde", "cujo"], "answer": 0, "why": "que ist das allgemeine Relativpronomen für Personen und Sachen."},
      {"q": "a pessoa ____ falei (mit der ich sprach)", "options": ["com quem", "que", "cujo", "onde"], "answer": 0, "why": "Nach Präpositionen bei Personen steht meist „quem“."},
      {"q": "Comprei um presente ____ ti. (für dich, Zweck)", "options": ["para", "por", "de", "com"], "answer": 0, "why": "para markiert Zweck/Empfänger."},
      {"q": "Obrigado ____ tudo. (für alles, Grund)", "options": ["por", "para", "de", "em"], "answer": 0, "why": "por markiert Grund/Ursache — hier den Dank auslösenden Grund."},
    ],
    pages: [
      { heading: 'Relativsätze', html: `
        <table class="gr-table">
          <tr><th>que</th><td>der/die/das (Personen & Sachen, allgemein)</td></tr>
          <tr><th>quem</th><td>wer (meist nach Präposition, für Personen)</td></tr>
          <tr><th>onde</th><td>wo</td></tr>
          <tr><th>cujo/cuja</th><td>dessen/deren (gehoben, passt sich dem Besitz an)</td></tr>
        </table>
        <p><i>A cidade onde nasci</i> — die Stadt, wo ich geboren wurde.</p>` },
      { heading: 'por oder para?', html: `
        <p>Beide heißen „für“, markieren aber Unterschiedliches:</p>
        <table class="gr-table">
          <tr><th>por — Grund, Ursache, Austausch, Weg</th><th>para — Zweck, Ziel, Empfänger, Zeitpunkt</th></tr>
          <tr><td>Obrigado por tudo.</td><td>Isto é para ti.</td></tr>
          <tr><td>Passei pela praça.</td><td>Vou para Lisboa.</td></tr>
        </table>` },
    ],
  },
  {
    id: 'commands', title: 'Imperativo', icon: 'fa-bullhorn', beforeLesson: 110,
    drills: [
      {"q": "____! (sprich! — tu-Form)", "options": ["Fala", "Falas", "Falar", "Falai"], "answer": 0, "why": "Bejahter Imperativ für tu: Präsensform ohne -s."},
      {"q": "Não ____! (sprich nicht!)", "options": ["fales", "fala", "falas", "falar"], "answer": 0, "why": "Der verneinte Imperativ nutzt die Conjuntivo-Form."},
      {"q": "____! (essen Sie! — höflich)", "options": ["Coma", "Come", "Comer", "Comam"], "answer": 0, "why": "Höflicher Imperativ (você) = 3. Person Conjuntivo."},
      {"q": "Ajudem-____! (mir — Plural-Imperativ)", "options": ["me", "-me", "eu", "mim"], "answer": 0, "why": "Beim bejahten Imperativ hängt sich das Pronomen mit Bindestrich an: Ajudem-me!"},
    ],
    pages: [
      { heading: 'Befehle geben', html: `
        <p>Der bejahte Imperativ für <b>tu</b> entspricht meist der Präsensform ohne das -s der 2. Person:</p>
        <table class="gr-table">
          <tr><th>Präsens</th><th>Imperativ (tu)</th></tr>
          <tr><td>falas</td><td>fala!</td></tr>
          <tr><td>comes</td><td>come!</td></tr>
          <tr><td>abres</td><td>abre!</td></tr>
        </table>
        <p>Für die höfliche Anrede <b>você</b> nimmt man die 3. Person des Conjuntivo: <i>Fale!</i>, <i>Coma!</i>, <i>Abra!</i></p>` },
      { heading: 'Verneinter Imperativ', html: `
        <p>Ein Verbot bildet man immer mit <b>não</b> + Conjuntivo (nie mit der bejahten Imperativform):</p>
        <ul>
          <li><i>Fala!</i> — Sprich! → <i>Não fales!</i> — Sprich nicht!</li>
          <li><i>Come!</i> — Iss! → <i>Não comas!</i> — Iss nicht!</li>
        </ul>
        <div class="grammar-tip">💡 Pronomen hängen sich beim bejahten Imperativ hinten an (<i>Ajuda-me!</i>), stehen beim verneinten aber davor (<i>Não me ajudes!</i>).</div>` },
    ],
  },
];
