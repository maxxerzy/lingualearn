// Grammatik-Kapitel Japanisch — werden im Lernkurs vor der jeweiligen
// Lektion (beforeLesson) eingeschoben und sind in der Übersicht nachlesbar.
export const grammar = [
  {
    id: 'intro', title: 'So funktioniert Japanisch', icon: 'fa-compass', beforeLesson: 1,
    drills: [
      {"q": "Welche Schrift wird für Fremdwörter benutzt?", "options": ["Katakana", "Hiragana", "Kanji", "Romaji"], "answer": 0, "why": "コーヒー (kōhī) für Kaffee."},
      {"q": "Wie viele Vokale hat das Japanische?", "options": ["fünf", "sieben", "drei", "acht"], "answer": 0, "why": "a, i, u, e, o — jeder gleich lang und gleich betont."},
      {"q": "Wie klingt „desu“ meistens?", "options": ["dess", "de-su", "des-u", "dez"], "answer": 0, "why": "Das u ist oft fast stumm."},
      {"q": "Wofür stehen Kanji?", "options": ["Wortstämme", "Grammatik", "Fremdwörter", "Zahlen"], "answer": 0, "why": "水 = Wasser; Hiragana übernimmt die Grammatik."},
    ],
    pages: [
      { heading: 'Drei Schriften, eine einfache Aussprache', html: `
        <p>Japanisch mischt drei Schriftsysteme:</p>
        <ul>
          <li><b>Hiragana</b> (ひらがな) — runde Silbenzeichen für japanische Wörter und Grammatik,</li>
          <li><b>Katakana</b> (カタカナ) — eckige Silbenzeichen für Fremdwörter (<i>コーヒー</i> = Kaffee),</li>
          <li><b>Kanji</b> (漢字) — chinesische Zeichen für Wortstämme (<i>水</i> = Wasser).</li>
        </ul>
        <p>In der App steht immer die <b>Umschrift (Romaji)</b> dabei — du kannst also sofort loslegen und die Schrift später vertiefen. Beim Tippen zählt die Umschrift.</p>
        <p>Die <b>Aussprache ist leicht</b>: nur fünf Vokale (a, i, u, e, o) wie im Deutschen, jede Silbe gleich lang und gleich betont. <i>arigatou</i> = a-ri-ga-to-o.</p>
        <div class="grammar-tip">💡 Nur zwei Stolpersteine: <b>r</b> klingt zwischen „r" und „l", und <b>u</b> ist oft fast stumm (<i>desu</i> → „dess").</div>` },
      { heading: 'Was alles NICHT existiert', html: `
        <p>Vieles, was im Deutschen Mühe macht, gibt es im Japanischen schlicht nicht:</p>
        <ul>
          <li><b>keine Artikel</b> (kein der/die/das),</li>
          <li><b>kein grammatisches Geschlecht</b>,</li>
          <li><b>kein Plural</b> (<i>hon</i> = Buch oder Bücher),</li>
          <li><b>keine Personalendungen</b> — <i>tabemasu</i> heißt „ich/du/er/wir/ihr/sie esse(n)",</li>
          <li>Subjekt und Pronomen werden weggelassen, wenn klar: <i>Tabemasu.</i> = „(Ich) esse."</li>
        </ul>
        <p>Die Herausforderung liegt woanders: in der <b>Wortstellung</b> und den <b>Partikeln</b> — dazu gleich mehr.</p>` },
    ],
  },
  {
    id: 'syntax', title: 'Satzbau & Partikeln', icon: 'fa-arrows-left-right', beforeLesson: 2,
    drills: [
      {"q": "Wo steht das Verb im japanischen Satz?", "options": ["am Ende", "am Anfang", "an zweiter Stelle", "in der Mitte"], "answer": 0, "why": "Immer ganz hinten."},
      {"q": "Welche Partikel markiert das Thema?", "options": ["は", "を", "が", "に"], "answer": 0, "why": "は (gesprochen wa) hebt das Thema hervor."},
      {"q": "Welche Partikel markiert das direkte Objekt?", "options": ["を", "は", "に", "で"], "answer": 0, "why": "を (gesprochen o)."},
      {"q": "Wie wird „は“ als Partikel ausgesprochen?", "options": ["wa", "ha", "pa", "ba"], "answer": 0, "why": "Als Partikel wa, sonst ha."},
    ],
    pages: [
      { heading: 'Das Verb steht IMMER am Ende', html: `
        <p>Japanisch ist eine <b>SOV-Sprache</b>: Subjekt – Objekt – <b>Verb</b>. Das Verb bildet immer den Schluss:</p>
        <ul>
          <li><i>Watashi wa mizu o nomimasu.</i> — wörtlich „Ich [Thema] Wasser [Objekt] trinke." = Ich trinke Wasser.</li>
          <li><i>Pan o tabemasu.</i> — „(Ich) esse Brot."</li>
        </ul>
        <p>Die Rollen im Satz markieren kleine Wörter — die <b>Partikeln</b>. Sie stehen <b>nach</b> dem Wort, auf das sie sich beziehen:</p>
        <table class="gr-table">
          <tr><th>Partikel</th><th>markiert</th><th>Beispiel</th></tr>
          <tr><td><b>wa</b> (は)</td><td>das Thema</td><td><i>Watashi <b>wa</b> …</i> — was mich betrifft …</td></tr>
          <tr><td><b>o</b> (を)</td><td>das Objekt</td><td><i>mizu <b>o</b> nomimasu</i> — Wasser trinken</td></tr>
          <tr><td><b>ga</b> (が)</td><td>das Subjekt</td><td><i>neko <b>ga</b> imasu</i> — da ist eine Katze</td></tr>
          <tr><td><b>ni</b> (に)</td><td>Ziel/Zeit/Ort</td><td><i>Tokyo <b>ni</b> ikimasu</i> — nach Tokio fahren</td></tr>
          <tr><td><b>de</b> (で)</td><td>Ort der Handlung/Mittel</td><td><i>densha <b>de</b></i> — mit dem Zug</td></tr>
          <tr><td><b>no</b> (の)</td><td>Besitz („von")</td><td><i>watashi <b>no</b> hon</i> — mein Buch</td></tr>
        </table>
        <div class="grammar-tip">💡 Denke an Partikeln als <b>nachgestellte Wegweiser</b>: Erst kommt das Wort, dann das Schild, das seine Rolle erklärt.</div>` },
    ],
  },
  {
    id: 'verbs', title: 'Verben: die masu-Form', icon: 'fa-bolt', beforeLesson: 4,
    drills: [
      {"q": "たべ____ (ich esse — höflich)", "options": ["ます", "ません", "ました", "る"], "answer": 0, "why": "Die masu-Form ist die höfliche Gegenwart."},
      {"q": "Wie verneint man die masu-Form?", "options": ["ません", "ました", "ないです only", "ます"], "answer": 0, "why": "tabemasen — ich esse nicht."},
      {"q": "Ändert sich das Verb nach der Person?", "options": ["nein", "ja", "nur im Plural", "nur höflich"], "answer": 0, "why": "tabemasu heißt ich, du, er, wir esse(n)."},
      {"q": "Wozu dient „desu“?", "options": ["höflicher Abschluss", "Verneinung", "Frage", "Vergangenheit"], "answer": 0, "why": "Es beendet den Satz höflich."},
    ],
    pages: [
      { heading: 'Vier Endungen für alles', html: `
        <p>Die höfliche <b>masu-Form</b> ist deine Standardform. Sie ändert sich nie nach der Person — nur nach Zeit und Verneinung:</p>
        <table class="gr-table">
          <tr><th>Form</th><th>Endung</th><th>taberu (essen)</th><th>Deutsch</th></tr>
          <tr><td>Gegenwart</td><td><b>-masu</b></td><td>tabe<b>masu</b></td><td>esse/isst/essen</td></tr>
          <tr><td>Verneinung</td><td><b>-masen</b></td><td>tabe<b>masen</b></td><td>esse nicht</td></tr>
          <tr><td>Vergangenheit</td><td><b>-mashita</b></td><td>tabe<b>mashita</b></td><td>aß / habe gegessen</td></tr>
          <tr><td>vern. Vergangenheit</td><td><b>-masen deshita</b></td><td>tabe<b>masen deshita</b></td><td>aß nicht</td></tr>
        </table>
        <p>Diese vier Endungen funktionieren bei <b>jedem</b> Verb: <i>nomimasu</i> (trinken), <i>ikimasu</i> (gehen), <i>mimasu</i> (sehen), <i>kaimasu</i> (kaufen) …</p>` },
      { heading: 'desu — der höfliche Punkt am Satzende', html: `
        <p><b>desu</b> (です) entspricht „ist/bin/sind" und schließt Nominalsätze höflich ab:</p>
        <ul>
          <li><i>Watashi wa gakusei <b>desu</b>.</i> — Ich bin Student.</li>
          <li><i>Kore wa hon <b>desu</b>.</i> — Das ist ein Buch.</li>
          <li>Verneinung: <i>… <b>ja arimasen</b></i> — <i>Gakusei ja arimasen.</i> — (Ich) bin kein Student.</li>
          <li>Vergangenheit: <i>… <b>deshita</b></i> — <i>Gakusei deshita.</i> — (Ich) war Student.</li>
        </ul>
        <p>„Es gibt / da ist": <b>arimasu</b> für Dinge, <b>imasu</b> für Lebewesen: <i>Neko ga imasu.</i> — Da ist eine Katze.</p>` },
    ],
  },
  {
    id: 'adjectives', title: 'Adjektive: i und na', icon: 'fa-palette', beforeLesson: 7,
    drills: [
      {"q": "Welche Adjektivfamilie endet auf -i?", "options": ["i-Adjektive", "na-Adjektive", "beide", "keine"], "answer": 0, "why": "たかい (teuer), おいしい (lecker)."},
      {"q": "Wie verbindet man ein na-Adjektiv mit dem Substantiv?", "options": ["mit な", "mit の", "mit を", "direkt"], "answer": 0, "why": "きれいな はな — eine schöne Blume."},
      {"q": "Wie verneint man „takai“?", "options": ["takakunai", "takai ja nai", "takanai", "takamasen"], "answer": 0, "why": "i-Adjektive tauschen -i gegen -kunai."},
      {"q": "„しずかな“ ist ____", "options": ["ein na-Adjektiv", "ein i-Adjektiv", "ein Verb", "ein Substantiv"], "answer": 0, "why": "Es braucht な vor dem Substantiv."},
    ],
    pages: [
      { heading: 'Zwei Familien', html: `
        <p>Japanische Adjektive gibt es in zwei Sorten:</p>
        <table class="gr-table">
          <tr><th>Typ</th><th>Beispiel</th><th>vor Substantiv</th><th>Verneinung</th></tr>
          <tr><td><b>i-Adjektive</b></td><td><i>taka<b>i</b></i> (teuer/hoch)</td><td><i>takai hon</i></td><td><i>taka<b>kunai</b></i> (nicht teuer)</td></tr>
          <tr><td><b>na-Adjektive</b></td><td><i>shizuka</i> (ruhig)</td><td><i>shizuka <b>na</b> machi</i></td><td><i>shizuka <b>ja arimasen</b></i></td></tr>
        </table>
        <p>Besonderheit: i-Adjektive tragen sogar die Zeit selbst — <i>takakatta</i> = „war teuer" (Vergangenheit im Adjektiv!).</p>
        <div class="grammar-tip">💡 <i>ii</i> (gut) ist unregelmäßig: Verneinung <i>yokunai</i>, Vergangenheit <i>yokatta</i> — <i>Yokatta!</i> heißt als Ausruf „Zum Glück!/Wie schön!"</div>` },
    ],
  },
  {
    id: 'questions', title: 'Fragen & Antworten', icon: 'fa-circle-question', beforeLesson: 11,
    drills: [
      {"q": "Wie macht man aus einer Aussage eine Frage?", "options": ["か anhängen", "は anhängen", "を anhängen", "umstellen"], "answer": 0, "why": "たべますか — isst du?"},
      {"q": "____ ですか。(Was ist das?)", "options": ["なん", "だれ", "どこ", "いつ"], "answer": 0, "why": "なん/なに = was."},
      {"q": "____ ですか。(Wo ist es?)", "options": ["どこ", "なん", "だれ", "いつ"], "answer": 0, "why": "どこ = wo."},
      {"q": "Braucht eine Frage mit „ka“ ein Fragezeichen?", "options": ["nein", "ja", "nur schriftlich", "nur höflich"], "answer": 0, "why": "Das か macht die Frage — traditionell steht danach 。"},
    ],
    pages: [
      { heading: 'Das kleine Wort ka', html: `
        <p>Jede Frage entsteht durch das Anhängen von <b>ka</b> (か) am Satzende — keine Umstellung, kein Fragezeichen nötig:</p>
        <ul>
          <li><i>Gakusei desu.</i> — (Ich) bin Student. → <i>Gakusei desu <b>ka</b>.</i> — Bist du Student?</li>
          <li><i>Sushi o tabemasu <b>ka</b>.</i> — Isst du Sushi?</li>
        </ul>
        <table class="gr-table">
          <tr><th>Fragewort</th><th>Deutsch</th><th>Beispiel</th></tr>
          <tr><td>nani / nan</td><td>was</td><td><i>Kore wa nan desu ka.</i> — Was ist das?</td></tr>
          <tr><td>doko</td><td>wo</td><td><i>Toire wa doko desu ka.</i> — Wo ist die Toilette?</td></tr>
          <tr><td>dare</td><td>wer</td><td><i>Dare desu ka.</i> — Wer ist das?</td></tr>
          <tr><td>itsu</td><td>wann</td><td><i>Itsu ikimasu ka.</i> — Wann fährst du?</td></tr>
          <tr><td>naze / doushite</td><td>warum</td><td><i>Doushite desu ka.</i> — Warum?</td></tr>
          <tr><td>ikura</td><td>wie viel (Preis)</td><td><i>Ikura desu ka.</i> — Wie viel kostet das?</td></tr>
        </table>
        <p>„Ja" = <b>hai</b>, „nein" = <b>iie</b>.</p>` },
    ],
  },
  {
    id: 'polite', title: 'Höflichkeit & gute Sitten', icon: 'fa-hands', beforeLesson: 16,
    drills: [
      {"q": "Was ist höflicher?", "options": ["おはようございます", "おはよう", "beides gleich", "keins"], "answer": 0, "why": "Die lange Form ist die höfliche."},
      {"q": "Wie bittet man höflich?", "options": ["おねがいします", "ください nur", "です", "ます"], "answer": 0, "why": "onegai shimasu macht jede Bitte höflich."},
      {"q": "Wozu dient „さん“?", "options": ["höfliche Anrede", "Verneinung", "Frage", "Mehrzahl"], "answer": 0, "why": "田中さん — Herr/Frau Tanaka; nie für sich selbst."},
      {"q": "Sagt man „わたしさん“?", "options": ["nein, nie", "ja", "nur förmlich", "nur schriftlich"], "answer": 0, "why": "さん gilt nur für andere."},
    ],
    pages: [
      { heading: 'Sprache mit eingebautem Respekt', html: `
        <p>Japanisch kennt <b>Höflichkeitsstufen</b>. Mit der masu/desu-Form, die du hier lernst, bist du überall richtig — sie ist die neutrale Höflichkeitsform für Fremde, Kollegen und Geschäfte.</p>
        <ul>
          <li>An Namen hängt man <b>-san</b> (Herr/Frau): <i>Tanaka-san</i>. Nie an den eigenen Namen!</li>
          <li><i>watashi</i> (ich) und besonders <i>anata</i> (du) lässt man weg, wann immer es geht — man spricht Menschen mit Namen + san an.</li>
          <li>Nützliche Höflichkeitsfloskeln: <i>sumimasen</i> (Entschuldigung/danke), <i>onegaishimasu</i> (bitte, formell), <i>itadakimasu</i> (vor dem Essen).</li>
        </ul>
        <div class="grammar-tip">💡 Unter Freunden fällt später das <i>masu/desu</i> weg (<i>taberu</i> statt <i>tabemasu</i>) — verstehe die Kurzformen passiv, benutze aktiv die höfliche Form. Damit machst du nie etwas falsch.</div>` },
    ],
  },
  {
    id: 'past', title: 'Vergangenheit & Verneinung', icon: 'fa-clock-rotate-left', beforeLesson: 20,
    drills: [
      {"q": "たべ____ (ich habe gegessen)", "options": ["ました", "ます", "ません", "ませんでした"], "answer": 0, "why": "Die höfliche Vergangenheit."},
      {"q": "たべ____ (ich habe nicht gegessen)", "options": ["ませんでした", "ました", "ません", "ます"], "answer": 0, "why": "Verneinte Vergangenheit."},
      {"q": "Wie lautet die Vergangenheit von „desu“?", "options": ["でした", "です", "じゃない", "ます"], "answer": 0, "why": "でした — war."},
      {"q": "Verrät die Verbform, wer gehandelt hat?", "options": ["nein", "ja", "nur höflich", "nur im Plural"], "answer": 0, "why": "Der Zusammenhang nennt die Person."},
    ],
    pages: [
      { heading: 'Vier Endungen decken alles ab', html: `
        <p>Aus der höflichen <b>masu</b>-Form entstehen alle vier Grundaussagen — ohne jede Ausnahme:</p>
        <table class="grammar-table">
          <tr><th></th><th>bejaht</th><th>verneint</th></tr>
          <tr><td>Gegenwart</td><td>たべ<b>ます</b> (tabemasu)</td><td>たべ<b>ません</b> (tabemasen)</td></tr>
          <tr><td>Vergangenheit</td><td>たべ<b>ました</b> (tabemashita)</td><td>たべ<b>ませんでした</b> (tabemasen deshita)</td></tr>
        </table>
        <p>Dasselbe gilt für <b>desu</b>: <i>です → でした</i> (war), <i>じゃありません</i> (ist nicht), <i>じゃありませんでした</i> (war nicht).</p>
        <div class="grammar-tip">💡 Keine Personalformen: <i>tabemashita</i> heißt „ich aß", „du aßt", „sie aßen" — wer gemeint ist, sagt der Zusammenhang.</div>` },
    ],
  },
  {
    id: 'particles2', title: 'Die weiteren Partikeln', icon: 'fa-tags', beforeLesson: 25,
    drills: [
      {"q": "七時____ おきます。(Ich stehe um sieben auf.)", "options": ["に", "で", "を", "から"], "answer": 0, "why": "に markiert den Zeitpunkt."},
      {"q": "うち____ たべます。(Ich esse zu Hause.)", "options": ["で", "に", "へ", "を"], "answer": 0, "why": "で markiert den Ort der Handlung."},
      {"q": "いえ____ います。(Ich bin zu Hause.)", "options": ["に", "で", "を", "も"], "answer": 0, "why": "に markiert den Ort des Seins."},
      {"q": "九時____ 五時____ (von neun bis fünf)", "options": ["から / まで", "まで / から", "に / で", "と / も"], "answer": 0, "why": "から = ab, まで = bis."},
    ],
    pages: [
      { heading: 'Jede Partikel hat genau eine Aufgabe', html: `
        <p>Sie stehen <b>hinter</b> dem Wort, auf das sie sich beziehen — wie kleine Wegweiser:</p>
        <table class="grammar-table">
          <tr><th>Partikel</th><th>Bedeutung</th><th>Beispiel</th></tr>
          <tr><td><b>に</b> (ni)</td><td>Zeitpunkt, Ziel, Ort des Seins</td><td>七時<b>に</b> — um sieben Uhr</td></tr>
          <tr><td><b>で</b> (de)</td><td>Ort der Handlung, Mittel</td><td>うち<b>で</b> — zu Hause (tun)</td></tr>
          <tr><td><b>へ</b> (e)</td><td>Richtung</td><td>東京<b>へ</b> — Richtung Tokio</td></tr>
          <tr><td><b>と</b> (to)</td><td>und, zusammen mit</td><td>友だち<b>と</b> — mit einem Freund</td></tr>
          <tr><td><b>から</b> (kara)</td><td>von, ab, weil</td><td>九時<b>から</b> — ab neun</td></tr>
          <tr><td><b>まで</b> (made)</td><td>bis</td><td>五時<b>まで</b> — bis fünf</td></tr>
          <tr><td><b>も</b> (mo)</td><td>auch</td><td>私<b>も</b> — ich auch</td></tr>
        </table>
        <div class="grammar-tip">💡 <b>に</b> oder <b>で</b>? <i>に</i> steht, wo etwas <b>ist</b> (いえに いる — zu Hause sein), <i>で</i>, wo etwas <b>geschieht</b> (いえで たべる — zu Hause essen).</div>` },
    ],
  },
  {
    id: 'counters', title: 'Zählwörter', icon: 'fa-list-ol', beforeLesson: 29,
    drills: [
      {"q": "Welches Zählwort passt für Menschen?", "options": ["人", "本", "枚", "つ"], "answer": 0, "why": "ひとり, ふたり, さんにん."},
      {"q": "Welches Zählwort passt für Flaschen?", "options": ["本", "枚", "人", "匹"], "answer": 0, "why": "本 gilt für alles Lange."},
      {"q": "りんごを ____ ください。(Drei Äpfel bitte.)", "options": ["みっつ", "さんにん", "さんぼん", "みつ"], "answer": 0, "why": "つ ist das Allzweck-Zählwort bis neun."},
      {"q": "Welche Menschenzähler sind unregelmäßig?", "options": ["ひとり und ふたり", "さんにん", "よにん", "keine"], "answer": 0, "why": "Eins und zwei fallen aus der Reihe."},
    ],
    pages: [
      { heading: 'Was man zählt, entscheidet wie man zählt', html: `
        <p>Zwischen Zahl und Ding gehört ein Zählwort — welches, hängt von der Form des Dings ab:</p>
        <table class="grammar-table">
          <tr><th>Zählwort</th><th>für</th><th>Beispiel</th></tr>
          <tr><td><b>つ</b> (tsu)</td><td>alles Allgemeine (bis 9)</td><td>ひとつ, ふたつ, みっつ</td></tr>
          <tr><td><b>人</b> (nin)</td><td>Menschen</td><td>ひとり, ふたり, さんにん</td></tr>
          <tr><td><b>本</b> (hon)</td><td>Langes: Flaschen, Stifte</td><td>いっぽん, にほん, さんぼん</td></tr>
          <tr><td><b>枚</b> (mai)</td><td>Flaches: Blätter, Karten</td><td>いちまい, にまい</td></tr>
          <tr><td><b>匹</b> (hiki)</td><td>kleine Tiere</td><td>いっぴき, にひき</td></tr>
          <tr><td><b>歳</b> (sai)</td><td>Lebensjahre</td><td>にじゅっさい — 20 Jahre alt</td></tr>
        </table>
        <p>Das Zählwort steht meist <b>hinter</b> dem Ding: <i>りんごを<b>みっつ</b>ください。</i> — Drei Äpfel bitte.</p>
        <div class="grammar-tip">💡 Im Zweifel <b>つ</b> nehmen — bis neun deckt es fast alles ab, und man wird verstanden. Die ersten beiden Menschenzähler <i>ひとり</i> und <i>ふたり</i> sind allerdings unregelmäßig und lohnen sich sofort.</div>` },
    ],
  },
];
