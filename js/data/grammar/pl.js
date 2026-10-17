// Grammatik-Kapitel Polnisch — werden im Lernkurs vor der jeweiligen
// Lektion (beforeLesson) eingeschoben und sind in der Übersicht nachlesbar.
export const grammar = [
  {
    id: 'intro', title: 'Alphabet, Sonderzeichen & Aussprache', icon: 'fa-font', beforeLesson: 1,
    drills: [
      {"q": "Welche Silbe wird im Polnischen fast ausnahmslos betont?", "options": ["die vorletzte Silbe", "die letzte Silbe", "die erste Silbe", "die Betonung wandert beliebig"], "answer": 0, "why": "Im Polnischen liegt die Betonung fast immer auf der vorletzten Silbe (Paroxytonon)."},
      {"q": "Wie wird das polnische „ł“ gesprochen?", "options": ["wie ein englisches w in „water“", "wie ein deutsches l", "wie ein deutsches ch", "es ist immer stumm"], "answer": 0, "why": "„ł“ klingt wie das englische [w], z. B. in „ładny“ (gesprochen: wadny)."},
      {"q": "Was bedeuten die Häkchen bei „ą“ und „ę“?", "options": ["Nasale Vokale (wie om/on bzw. em/en)", "Lange Vokale wie im Lateinischen", "Flüstervokale", "Stumme Endungen"], "answer": 0, "why": "„ą“ und „ę“ sind historische Nasalvokale, die z. B. vor Konsonanten wie [ɔn]/[ɔm] bzw. [ɛn]/[ɛm] klingen."},
      {"q": "Wie spricht man „cz“ und „sz“ aus?", "options": ["tsch und sch (hart, retroflex)", "z und s", "k und ch", "immer wie t und p"], "answer": 0, "why": "cz = hartes „tsch“, sz = hartes „sch“, wie in „czas“ (Zeit) und „szybko“ (schnell)."},
    ],
    pages: [
      { heading: 'Das polnische Alphabet & seine Besonderheiten', html: `
        <p>Polnisch nutzt das lateinische Alphabet mit <b>9 Sonderbuchstaben</b> sowie <b>7 Buchstabenpaaren (Dwuznaki)</b>. Einmal gelernt, ist die Aussprache absolut regelmäßig:</p>
        <table class="gr-table">
          <tr><th>Buchstabe</th><th>Aussprache</th><th>Beispiel</th></tr>
          <tr><td>ą</td><td>Nasalvokal [ɔw̃] / [ɔn]</td><td><i>mąż</i> (Ehemann), <i>kąt</i> (Winkel)</td></tr>
          <tr><td>ę</td><td>Nasalvokal [ɛw̃] / [ɛn] (am Wortende meist wie kurzes „e")</td><td><i>proszę</i> (bitte), <i>ręka</i> (Hand)</td></tr>
          <tr><td>ć / ci</td><td>sehr weiches „tsch" (Zungenspitze unten)</td><td><i>być</i> (sein), <i>ciasto</i> (Kuchen)</td></tr>
          <tr><td>ł</td><td>wie englisches „w" in „water"</td><td><i>ładny</i> (schön), <i>jabłko</i> (Apfel)</td></tr>
          <tr><td>ń / ni</td><td>weiches „nj" wie in Cognac oder spanisch „ñ"</td><td><i>dzień</i> (Tag), <i>niebo</i> (Himmel)</td></tr>
          <tr><td>ó</td><td>exakt wie deutsches „u"</td><td><i>mój</i> (mein), <i>córka</i> (Tochter)</td></tr>
          <tr><td>ś / si</td><td>sehr weiches, gezischeltes „sch"</td><td><i>świat</i> (Welt), <i>siostra</i> (Schwester)</td></tr>
          <tr><td>ź / zi</td><td>stimmhaftes weiches „sch" (wie frz. Journal)</td><td><i>źle</i> (schlecht), <i>zima</i> (Winter)</td></tr>
          <tr><td>ż / rz</td><td>stimmhaftes hartes „sch" (wie in Garage)</td><td><i>żona</i> (Ehefrau), <i>rzeka</i> (Fluss)</td></tr>
        </table>
        <div class="grammar-tip">💡 <b>Dwuznaki (Doppelbuchstaben)</b>: <i>cz</i> = hartes „tsch", <i>sz</i> = hartes „sch", <i>ch</i> = „ch" wie in „Buch", <i>dz / dź / dż</i> = stimmhafte Entsprechungen zu c / ć / cz.</div>` },
      { heading: 'Die goldene Betonungsregel', html: `
        <p>Im Polnischen musst du dir keine Akzentzeichen merken: <b>Die Hauptbetonung liegt fast immer auf der vorletzten Silbe</b>:</p>
        <ul>
          <li><i><b>war</b>-sza-wa</i> (Warschau) — Be-to-nung auf der vor-letz-ten Sil-be.</li>
          <li><i><b>dzie</b>-ku-ję</i> (ich danke) — Be-to-nung auf <i>ku</i>: dzie-<b>ku</b>-ję.</li>
          <li><i>he-rba-<b>ta</b></i> (Tee) — Be-to-nung auf <i>ba</i>: her-<b>ba</b>-ta.</li>
        </ul>
        <p>Konsonanten am Wortende werden stimmlos gesprochen: <i>chleb</i> klingt wie „chlep", <i>samochód</i> wie „samochut".</p>` },
    ],
  },
  {
    id: 'nouns-gender', title: 'Substantive: drei Geschlechter', icon: 'fa-cube', beforeLesson: 2,
    drills: [
      {"q": "Welches Geschlecht haben Substantive auf „-a“ fast immer?", "options": ["weiblich (żeński)", "männlich (męski)", "sächlich (nijaki)", "Plural"], "answer": 0, "why": "Wörter auf -a wie „kobieta“ (Frau) oder „woda“ (Wasser) sind weiblich."},
      {"q": "„okno“ (Fenster) ist ____", "options": ["sächlich (nijaki)", "weiblich (żeński)", "männlich (męski)", "unbestimmt"], "answer": 0, "why": "Substantive auf -o, -e, -ę sind im Polnischen sächlich."},
      {"q": "Gibt es im Polnischen bestimmte oder unbestimmte Artikel?", "options": ["Nein, gar keine Artikel", "Ja, wie im Deutschen der/die/das", "Nur unbestimmte Artikel", "Nur im Plural"], "answer": 0, "why": "Wie die meisten slawischen Sprachen hat Polnisch weder Artikel noch Hilfswörter vor dem Substantiv."},
      {"q": "Substantive, die auf einen harten Konsonanten enden, sind meistens ____", "options": ["männlich", "weiblich", "sächlich", "Adjektive"], "answer": 0, "why": "Endung auf Konsonant (np. dom, stół, pies) zeigt typisch männliches Genus an."},
    ],
    pages: [
      { heading: 'Das grammatische Geschlecht am Wortende', html: `
        <p>Polnisch hat <b>drei Genera</b>: Männlich (rodzaj męski), Weiblich (rodzaj żeński) und Sächlich (rodzaj nijaki). Artikel gibt es keine — das Geschlecht erkennst du an der Endung:</p>
        <table class="gr-table">
          <tr><th>Geschlecht</th><th>Typische Endung</th><th>Beispiele</th></tr>
          <tr><td><b>Männlich</b> (męski)</td><td>Endet auf <b>Konsonant</b></td><td><i>dom</i> (Haus), <i>brat</i> (Bruder), <i>student</i> (Student)</td></tr>
          <tr><td><b>Weiblich</b> (żeński)</td><td>Endet auf <b>-a</b> (selten -i oder Weichheitszeichen)</td><td><i>kobieta</i> (Frau), <i>kawa</i> (Kaffee), <i>noc</i> (Nacht)</td></tr>
          <tr><td><b>Sächlich</b> (nijaki)</td><td>Endet auf <b>-o, -e, -ę, -um</b></td><td><i>okno</i> (Fenster), <i>morze</i> (Meer), <i>imię</i> (Vorname), <i>muzeum</i></td></tr>
        </table>
        <div class="grammar-tip">💡 Ausnahmen bei Personen: Männliche Berufs- oder Verwandtschaftsbezeichnungen auf -a (<i>mężczyzna</i> = Mann, <i>tata</i> = Papa) sind grammatisch <b>männlich</b> und verlangen männliche Adjektive (<i>dobry tata</i>).</div>` },
    ],
  },
  {
    id: 'cases-nom-acc', title: 'Nominativ & Akkusativ (Mianownik & Biernik)', icon: 'fa-arrow-right', beforeLesson: 5,
    drills: [
      {"q": "Welchen Fall verlangt das direkte Objekt bei Verben wie „mam“ (ich habe) oder „lubię“ (ich mag)?", "options": ["Akkusativ (Biernik)", "Nominativ (Mianownik)", "Lokativ (Miejscownik)", "Vokativ"], "answer": 0, "why": "Direkte Objekte bejahender Verben stehen im Akkusativ: „Mam dobrą kawę.“"},
      {"q": "Wie lautet der Akkusativ von „kawa“ (Kaffee, f.)?", "options": ["kawę", "kawy", "kawie", "kawom"], "answer": 0, "why": "Weibliche Substantive auf -a enden im Akkusativ Singular regelmäßig auf -ę: kawa → kawę."},
      {"q": "Was passiert mit unbelebten männlichen Dingen im Akkusativ (z. B. stół, telefon)?", "options": ["Sie bleiben unverändert wie im Nominativ", "Sie bekommen die Endung -a", "Sie enden auf -ę", "Sie verdoppeln den Konsonanten"], "answer": 0, "why": "Unbelebte männliche Substantive (rzeczy) haben Akkusativ = Nominativ: „Widzę stół.“"},
      {"q": "Was passiert mit belebten männlichen Lebewesen (Personen, Tiere) im Akkusativ?", "options": ["Sie bekommen die Endung -a (wie im Genitiv)", "Sie bleiben unverändert", "Sie enden auf -em", "Sie erhalten ein Präfix"], "answer": 0, "why": "Männlich-belebte Wesen erhalten im Akkusativ die Endung -a: pies → widzę psa, brat → mam brata."},
    ],
    pages: [
      { heading: 'Nominativ (Wer/Was?) und Akkusativ (Wen/Was?)', html: `
        <p>Der <b>Nominativ (Mianownik)</b> ist die Grundform im Wörterbuch (Subjekt des Satzes). Wenn etwas das <b>direkte Ziel einer Handlung</b> ist, steht es im <b>Akkusativ (Biernik)</b>:</p>
        <table class="gr-table">
          <tr><th>Kategorie</th><th>Nominativ</th><th>Akkusativ</th><th>Muster</th></tr>
          <tr><td>Weiblich (-a)</td><td><i>kawa</i> (Kaffee)</td><td><b>kawę</b></td><td>-a → <b>-ę</b></td></tr>
          <tr><td>Weiblich (-a)</td><td><i>książka</i> (Buch)</td><td><b>książkę</b></td><td>-a → <b>-ę</b></td></tr>
          <tr><td>Männlich unbelebt</td><td><i>telefon</i> (Telefon)</td><td><b>telefon</b></td><td>= Nominativ</td></tr>
          <tr><td>Männlich belebt (Tier/Mensch)</td><td><i>kot</i> (Kater)</td><td><b>kota</b></td><td>+ <b>-a</b></td></tr>
          <tr><td>Sächlich (-o/-e)</td><td><i>auto</i> (Auto)</td><td><b>auto</b></td><td>= Nominativ</td></tr>
        </table>
        <div class="grammar-tip">💡 Beim Bestellen sagst du fast immer Akkusativ: <i>Poproszę kawę i herbatę</i> (Ich hätte gerne einen Kaffee und einen Tee).</div>` },
    ],
  },
  {
    id: 'cases-gen', title: 'Der Genitiv: Verneinung, Menge & Besitz', icon: 'fa-ban', beforeLesson: 10,
    drills: [
      {"q": "Was geschieht mit dem Objekt, wenn ein Satz verneint wird („nie mam...“)?", "options": ["Es wechselt zwingend in den Genitiv (Dopełniacz)", "Es bleibt im Akkusativ", "Es wechselt in den Dativ", "Es steht immer im Plural"], "answer": 0, "why": "Die sog. Genitiv-der-Verneinung-Regel: Sobald ein Verb verneint wird, verlangt das direkte Objekt den Genitiv."},
      {"q": "„Mam czas“ (Ich habe Zeit). Wie lautet die Verneinung?", "options": ["Nie mam czasu.", "Nie mam czas.", "Nie mam czasem.", "Nie mam czasie."], "answer": 0, "why": "czas (Akk.) wird bei Verneinung zu czasu (Genitiv auf -u)."},
      {"q": "Welche Präposition verlangt immer den Genitiv?", "options": ["do (nach/zu)", "z (mit)", "w (in)", "o (über)"], "answer": 0, "why": "„do“ verlangt immer den Genitiv: idę do domu (ich gehe nach Hause)."},
      {"q": "Wie bildet man den Genitiv von weiblichen Wörtern auf -a (z. B. woda)?", "options": ["auf -y oder -i (wody)", "auf -u", "auf -em", "auf -ę"], "answer": 0, "why": "Weibliche Substantive erhalten im Genitiv Singular die Endung -y bzw. nach k/g die Endung -i: woda → wody, Polska → Polski."},
    ],
    pages: [
      { heading: 'Der Genitiv (Dopełniacz) ist der wichtigste Fall', html: `
        <p>Der Genitiv kommt im Polnischen ständig vor. Seine drei Haupteinsatzbereiche:</p>
        <ol>
          <li><b>Verneinter Akkusativ</b>: <i>Mam kawę</i> (Akk.) → <i>Nie mam <b>kawy</b></i> (Gen.).</li>
          <li><b>Mengen & Zahlen</b>: Nach Mengenangaben wie <i>dużo</i> (viel), <i>mało</i> (wenig) oder Zahlen ab 5: <i>dużo czasu</i> (viel Zeit).</li>
          <li><b>Präpositionen</b>: <i>do</i> (nach/zu), <i>od</i> (von), <i>dla</i> (für), <i>bez</i> (ohne): <i>kawa bez cukru</i> (Kaffee ohne Zucker).</li>
        </ol>
        <table class="gr-table">
          <tr><th>Genus</th><th>Nom. Sg.</th><th>Gen. Sg.</th><th>Beispiel</th></tr>
          <tr><td>Männlich</td><td><i>dom</i> / <i>student</i></td><td><b>domu</b> / <b>studenta</b></td><td><i>Nie ma studenta.</i></td></tr>
          <tr><td>Weiblich</td><td><i>woda</i> / <i>kawa</i></td><td><b>wody</b> / <b>kawy</b></td><td><i>Szklanka wody.</i></td></tr>
          <tr><td>Sächlich</td><td><i>mleko</i> / <i>piwo</i></td><td><b>mleka</b> / <b>piwa</b></td><td><i>Kawa bez mleka.</i></td></tr>
        </table>` },
    ],
  },
  {
    id: 'cases-loc', title: 'Der Lokativ: Wo? (Miejscownik)', icon: 'fa-location-dot', beforeLesson: 15,
    drills: [
      {"q": "Steht der Lokativ (Miejscownik) jemals ohne Präposition?", "options": ["Nein, er wird ausschließlich nach Präpositionen verwendet", "Ja, als Subjekt", "Ja, als direktes Objekt", "Nur in der Poesie"], "answer": 0, "why": "Der Miejscownik steht immer mit einer Präposition: w (in), na (auf/an), o (über), po (nach), przy (bei)."},
      {"q": "Wie sagt man „in Polen“?", "options": ["w Polsce", "w Polska", "na Polskę", "w Polsku"], "answer": 0, "why": "Polska → w Polsce (k wird vor der Lokativ-Endung -e zu c gewandelt)."},
      {"q": "Welche Präposition nutzt man typisch bei offenen Plätzen und Inseln?", "options": ["na (na ulicy, na rynku)", "w", "przy", "do"], "answer": 0, "why": "Für offene Plätze, Stationen und Veranstaltungen nutzt man „na“: na poczcie, na dworcu, na uniwersytecie."},
      {"q": "„w domu“ bedeutet ____", "options": ["zu Hause / im Haus", "nach Hause", "aus dem Haus", "ohne Haus"], "answer": 0, "why": "dom (Nom.) → w domu (Lokativ auf -u)."},
    ],
    pages: [
      { heading: 'Ortsangaben mit dem Lokativ (Miejscownik)', html: `
        <p>Der Lokativ antwortet auf die Frage <b>Gdzie? (Wo?)</b> und steht immer mit Präpositionen wie <b>w</b> (in), <b>na</b> (auf/an), <b>przy</b> (neben/an), <b>o</b> (über/um):</p>
        <table class="gr-table">
          <tr><th>Präposition</th><th>Bedeutung</th><th>Beispiel</th></tr>
          <tr><td><b>w</b> + Lok.</td><td>in (geschlossene Räume, Städte, Länder)</td><td><i>w Warszawie</i> (in Warschau), <i>w sklepie</i> (im Laden)</td></tr>
          <tr><td><b>na</b> + Lok.</td><td>auf (offene Plätze, Inseln, Events)</td><td><i>na rynku</i> (auf dem Markt), <i>na dworcu</i> (am Bahnhof)</td></tr>
          <tr><td><b>przy</b> + Lok.</td><td>bei / direkt neben</td><td><i>przy stole</i> (am Tisch), <i>przy ulicy</i> (an der Straße)</td></tr>
          <tr><td><b>o</b> + Lok.</td><td>über ein Thema / um (Uhrzeit)</td><td><i>rozmawiamy o filmie</i> (wir sprechen über den Film)</td></tr>
        </table>
        <div class="grammar-tip">💡 Typische Endungen im Lokativ Singular: <b>-e</b> mit Konsonantenwechsel (Polska → w Polsce, teatr → w teatrze) oder <b>-u</b> (dom → w domu, Kraków → w Krakowie).</div>` },
    ],
  },
  {
    id: 'cases-inst', title: 'Der Instrumental: Womit? Wer? (Narzędnik)', icon: 'fa-wrench', beforeLesson: 20,
    drills: [
      {"q": "Welche Endung haben weibliche Substantive im Instrumental Singular immer?", "options": ["-ą (z. B. kawą, mamą)", "-em", "-ie", "-ami"], "answer": 0, "why": "Alle weiblichen Substantive enden im Instrumental Singular auf -ą: z mamą, z dobrą koleżanką."},
      {"q": "Welche Endung haben männliche und sächliche Substantive im Instrumental Singular?", "options": ["-em (z. B. bratem, oknem)", "-ą", "-u", "-ami"], "answer": 0, "why": "Männliche und sächliche Nomen erhalten die Endung -em: z bratem, z mlekiem."},
      {"q": "Welchen Fall verlangt die Konstruktion „być + Beruf/Nationalität“ (Er ist Arzt)?", "options": ["Instrumental (Narzędnik: On jest lekarzem)", "Nominativ", "Akkusativ", "Genitiv"], "answer": 0, "why": "Prädikatsnomen bei „być“ stehen im Instrumental: Jestem Niemcem (Ich bin Deutscher), Ona jest nauczycielką."},
      {"q": "Was bedeutet „z cukrem“?", "options": ["mit Zucker", "ohne Zucker", "viel Zucker", "Zucker bitte"], "answer": 0, "why": "„z“ + Instrumental bedeutet Begleitung / Zutat: z cukrem (mit Zucker)."},
    ],
    pages: [
      { heading: 'Womit machst du es? Wer bist du? (Narzędnik)', html: `
        <p>Der Instrumental (Narzędnik) beantwortet die Frage <b>Z kim? Czym? (Mit wem? Womit?)</b> und hat zwei unersetzliche Hauptaufgaben:</p>
        <ol>
          <li><b>Begleitung & Mittel</b>: Mit Präposition <i>z</i> = „mit": <i>kawa z mlekiem</i> (Kaffee mit Milch), <i>idę z bratem</i> (ich gehe mit dem Bruder).</li>
          <li><b>Berufe, Rollen & Nationalitäten mit „być"</b>: <i>Jestem lekarzem</i> (Ich bin Arzt), <i>Ona jest studentką</i> (Sie ist Studentin).</li>
        </ol>
        <table class="gr-table">
          <tr><th>Genus</th><th>Nominativ</th><th>Instrumental</th><th>Beispielsatz</th></tr>
          <tr><td>Männlich</td><td><i>brat</i> / <i>lekarz</i></td><td><b>bratem</b> / <b>lekarzem</b></td><td><i>Jestem lekarzem.</i></td></tr>
          <tr><td>Weiblich</td><td><i>kawa</i> / <i>siostra</i></td><td><b>kawą</b> / <b>siostrą</b></td><td><i>Z moją siostrą.</i></td></tr>
          <tr><td>Sächlich</td><td><i>mleko</i> / <i>auto</i></td><td><b>mlekiem</b> / <b>autem</b></td><td><i>Kawa z mlekiem.</i></td></tr>
        </table>` },
    ],
  },
  {
    id: 'cases-dat-voc', title: 'Dativ & Vokativ: Wem? Anrede! (Celownik & Wołacz)', icon: 'fa-hand-holding-heart', beforeLesson: 25,
    drills: [
      {"q": "Wann verwendet man den Vokativ (Wołacz)?", "options": ["Zur direkten Anrede von Personen", "Für Mengenangaben", "Für verneinte Verben", "Für Vergangenheitsformen"], "answer": 0, "why": "Der Vokativ ist der traditionelle Anredefall: Panie doktorze! Mamo! Piotrze!"},
      {"q": "Welche Endung haben männliche Substantive im Dativ Singular typischerweise?", "options": ["-owi (z. B. bratu / synowi)", "-em", "-a", "-ach"], "answer": 0, "why": "Die produktivste Dativ-Endung maskuliner Nomen ist -owi: mężowi, lekarzowi (Ausnahmen: bratu, psu, ojcu)."},
      {"q": "Welche Präposition verlangt den Dativ?", "options": ["dzięki (dank)", "do (nach)", "z (mit)", "bez (ohne)"], "answer": 0, "why": "„dzięki“ (dank) und „przeciwko“ (gegen) verlangen den Dativ: dzięki tobie (dank dir)."},
      {"q": "Wie lautet die höfliche Anrede für eine Dame im Vokativ?", "options": ["Pani!", "Panu!", "Panią!", "Panie!"], "answer": 0, "why": "Die Anredeform für Damen lautet schlicht „Pani!“ (für Herren: „Panie!“)."},
    ],
    pages: [
      { heading: 'Dativ (Komu? Czemu?) und die Anrede im Vokativ', html: `
        <p>Der <b>Dativ (Celownik)</b> bezeichnet den Empfänger einer Handlung: <i>Daję to <b>bratu</b></i> (Ich gebe das dem Bruder), <i>Pomagam <b>mamie</b></i> (Ich helfe der Mutter).</p>
        <p>Der <b>Vokativ (Wołacz)</b> wird gebraucht, wenn man jemanden <b>direkt ruft oder anspricht</b>:</p>
        <table class="gr-table">
          <tr><th>Person</th><th>Nominativ</th><th>Vokativ (Anrede)</th></tr>
          <tr><td>Herr</td><td><i>Pan</i></td><td><b>Panie!</b> (z. B. <i>Panie Janie!</i>)</td></tr>
          <tr><td>Frau</td><td><i>Pani</i></td><td><b>Pani!</b> (z. B. <i>Pani Mario!</i>)</td></tr>
          <tr><td>Mama</td><td><i>mama</i></td><td><b>Mamo!</b></td></tr>
          <tr><td>Freund</td><td><i>przyjaciel</i></td><td><b>Przyjacielu!</b></td></tr>
        </table>` },
    ],
  },
  {
    id: 'verbs-present', title: 'Verben im Präsens: Die drei Konjugationen', icon: 'fa-rotate', beforeLesson: 30,
    drills: [
      {"q": "Welche Endungen kennzeichnen die 1. Konjugation (-m / -sz, z. B. czytać)?", "options": ["ja czytam, ty czytasz", "ja czytę, ty czytisz", "ja czytuję, ty czytujesz", "ja czytam, ty czytacie"], "answer": 0, "why": "Verben auf -ać haben im Präsens typisch: -am, -asz, -a, -amy, -acie, -ają."},
      {"q": "Muss man im Polnischen immer Personalpronomen (ja, ty, on...) mitsprechen?", "options": ["Nein, die Personalendung zeigt die Person eindeutig an", "Ja, immer zwingend wie im Englischen", "Nur bei der Höflichkeitsform", "Nur im Präteritum"], "answer": 0, "why": "Polnisch ist eine Pro-Drop-Sprache: „Mieszkam w Warszawie“ reicht völlig aus, „ja“ wird nur zur Betonung gesetzt."},
      {"q": "Wie heißt „wir haben“ auf Polnisch?", "options": ["mamy", "mam", "masz", "mają"], "answer": 0, "why": "ja mam, ty masz, on/ona ma, my mamy, wy macie, oni mają."},
      {"q": "Wie wird das Verb „być“ (sein) für „sie sind“ konjugiert?", "options": ["są", "jest", "jesteśmy", "będą"], "answer": 0, "why": "ja jestem, ty jesteś, on jest, my jesteśmy, wy jesteście, oni/one są."},
    ],
    pages: [
      { heading: 'Präsens: Regelmäßige Verbendungen', html: `
        <p>Weil die Verbendung Person und Zahl exakt angibt, lässt man Personalpronomen meist weg. Die drei großen Gruppen:</p>
        <table class="gr-table">
          <tr><th>Person</th><th>1. Gruppe (-m / -sz)<br><i>czytać</i> (lesen)</th><th>2. Gruppe (-ę / -isz)<br><i>mówić</i> (sprechen)</th><th>3. Gruppe (-ę / -esz)<br><i>pisać</i> (schreiben)</th></tr>
          <tr><td>ja (ich)</td><td>czyta-<b>m</b></td><td>mówi-<b>ę</b></td><td>pisz-<b>ę</b></td></tr>
          <tr><td>ty (du)</td><td>czyta-<b>sz</b></td><td>mówi-<b>sz</b></td><td>pisz-<b>esz</b></td></tr>
          <tr><td>on/ona/ono</td><td>czyta</td><td>mówi</td><td>pisz-<b>e</b></td></tr>
          <tr><td>my (wir)</td><td>czyta-<b>my</b></td><td>mówi-<b>my</b></td><td>pisz-<b>emy</b></td></tr>
          <tr><td>wy (ihr)</td><td>czyta-<b>cie</b></td><td>mówi-<b>cie</b></td><td>pisz-<b>ecie</b></td></tr>
          <tr><td>oni/one (sie)</td><td>czyta-<b>ją</b></td><td>mówi-<b>ą</b></td><td>pisz-<b>ą</b></td></tr>
        </table>
        <div class="grammar-tip">💡 <b>Das Verb „być“ (sein)</b>: jestem (ich bin), jesteś (du bist), jest (ist), jesteśmy (wir sind), jesteście (ihr seid), są (sie sind).</div>` },
    ],
  },
  {
    id: 'verbs-aspect', title: 'Der Verbaspekt: vollendet vs. unvollendet', icon: 'fa-arrows-split-up-and-left', beforeLesson: 35,
    drills: [
      {"q": "Wann verwendet man den unvollendeten Aspekt (niedokonany)?", "options": ["Für Prozesse, Dauer, Gewohnheiten und Wiederholungen", "Für einmalige, bereits beendete Resultate", "Ausschließlich in der Zukunft", "Nur bei Fragen"], "answer": 0, "why": "Niedokonany beschreibt den Ablauf, die Dauer oder gewohnheitsmäßige Handlungen (z. B. czytam codziennie)."},
      {"q": "Was drückt der vollendete Aspekt (dokonany, z. B. przeczytać) aus?", "options": ["Ein konkretes Resultat oder einen abgeschlossenen Vorgang", "Eine unendliche Handlung", "Einen Wunsch", "Eine Passivform"], "answer": 0, "why": "Dokonany fokussiert das fertige Resultat: „Przeczytałem książkę“ = Ich habe das Buch fertig durchgelesen."},
      {"q": "Haben vollendete Verben eine grammatische Gegenwartsform?", "options": ["Nein, ihre Präsensform drückt automatisch die Zukunft aus", "Ja, genau wie unvollendete", "Nur bei Modalverben", "Nur im Konjunktiv"], "answer": 0, "why": "Vollendete Verben haben kein Präsens: „zrobię“ heißt „ich werde (fertig) machen“."},
      {"q": "Wie bilden viele Verben das vollendete Gegenstück?", "options": ["Durch ein Präfix wie po-, prze-, z-, na-", "Durch Weglassen der Endung", "Durch Vertauschen von Silben", "Durch Verdoppeln des Vokals"], "answer": 0, "why": "Häufig wird ein Präfix angehängt: pisać → napisać, czytać → przeczytać, robić → zrobić."},
    ],
    pages: [
      { heading: 'Aspektpaare: Der Kern des slawischen Verbs', html: `
        <p>Fast jedes polnische Verb existiert in <b>zwei Varianten</b>:</p>
        <ul>
          <li><b>Unvollendet (aspekt niedokonany)</b>: Handlung als Prozess, Verlauf oder Gewohnheit (<i>Piję kawę</i> = Ich trinke gerade Kaffee / trinke generell Kaffee).</li>
          <li><b>Vollendet (aspekt dokonany)</b>: Handlung als vollendetes Ereignis mit Resultat (<i>Wypiję kawę</i> = Ich trinke den Kaffee aus / werde ihn austrinken).</li>
        </ul>
        <table class="gr-table">
          <tr><th>Bedeutung</th><th>Unvollendet (Prozess)</th><th>Vollendet (Resultat)</th></tr>
          <tr><td>schreiben</td><td><i>pisać</i></td><td><b>napisać</b></td></tr>
          <tr><td>lesen</td><td><i>czytać</i></td><td><b>przeczytać</b></td></tr>
          <tr><td>machen</td><td><i>robić</i></td><td><b>zrobić</b></td></tr>
          <tr><td>kaufen</td><td><i>kupować</i></td><td><b>kupić</b></td></tr>
        </table>` },
    ],
  },
  {
    id: 'verbs-past-future', title: 'Vergangenheit & Zukunft (Czas przeszły i przyszły)', icon: 'fa-clock-rotate-left', beforeLesson: 40,
    drills: [
      {"q": "Wie drückt die polnische Vergangenheitsform das Geschlecht des Sprechers aus?", "options": ["Männer sagen „-łem“, Frauen sagen „-łam“", "Das Geschlecht wird gar nicht ausgedrückt", "Nur das Objekt verändert sich", "Frauen hängen ein -in an"], "answer": 0, "why": "Vergangenheitsformen stimmen mit dem Genus des Subjekts überein: czytałem (männlich) vs. czytałam (weiblich)."},
      {"q": "Wie bildet man die Zukunft von unvollendeten Verben?", "options": ["Mit den Zukunftsformen von być (będę, będziesz...) + Infinitiv oder -ł-Form", "Nur durch Voranstellen von „jutro“", "Mit dem englischen will", "Durch Anhängen von -ing"], "answer": 0, "why": "Zukunft unvollendet: będę czytać (oder będę czytał/a) = ich werde lesen."},
      {"q": "Wie bildet man die Zukunft vollendeter Verben (z. B. napisać)?", "options": ["Direkt mit der Personalendung: napiszę, napiszesz...", "Mit będę napisać", "Mit werden + Infinitiv", "Mit einem Hilfsverb"], "answer": 0, "why": "Vollendete Verben brauchen kein „będę“: napiszę = ich werde schreiben (und fertigstellen)."},
      {"q": "„Byliśmy w kinie“ bedeutet ____", "options": ["Wir waren im Kino (männlich/gemischte Gruppe)", "Wir gehen ins Kino", "Sie waren im Kino", "Ich war im Kino"], "answer": 0, "why": "-śmy ist die Endung der 1. Person Plural Vergangenheit."},
    ],
    pages: [
      { heading: 'Vergangenheit (Czas przeszły)', html: `
        <p>In der Vergangenheit wird der Stamm um das historische Partizip <b>-ł-</b> erweitert, an das Geschlechts- und Personenendungen treten:</p>
        <table class="gr-table">
          <tr><th>Person</th><th>Männlich (ja robiłem)</th><th>Weiblich (ja robiłam)</th></tr>
          <tr><td>ja (ich)</td><td>robi-<b>łem</b></td><td>robi-<b>łam</b></td></tr>
          <tr><td>ty (du)</td><td>robi-<b>łeś</b></td><td>robi-<b>łaś</b></td></tr>
          <tr><td>on / ona / ono</td><td>robi-<b>ł</b></td><td>robi-<b>ła</b> (sächl. robi-<b>ło</b>)</td></tr>
          <tr><td>my (wir)</td><td>robi-<b>liśmy</b></td><td>robi-<b>łyśmy</b></td></tr>
          <tr><td>wy (ihr)</td><td>robi-<b>liście</b></td><td>robi-<b>łyście</b></td></tr>
          <tr><td>oni / one (sie)</td><td>robi-<b>li</b> (męskoosobowy)</td><td>robi-<b>ły</b> (niemęskoosobowy)</td></tr>
        </table>` },
      { heading: 'Zukunft (Czas przyszły)', html: `
        <p>Zwei Wege in die polnische Zukunft:</p>
        <ul>
          <li><b>Unvollendet</b>: <i>będę</i> + Infinitiv: <i>Będę czytać książkę</i> (Ich werde ein Buch lesen).</li>
          <li><b>Vollendet</b>: einfache Konjugation des vollendeten Verbs: <i>Przeczytam książkę</i> (Ich werde das Buch durchlesen).</li>
        </ul>` },
    ],
  },
  {
    id: 'adjectives', title: 'Adjektive & Angleichung', icon: 'fa-paint-roller', beforeLesson: 45,
    drills: [
      {"q": "Welche Endungen haben Adjektive im Nominativ Singular?", "options": ["-y/-i (m), -a (f), -e (n)", "-o (m), -a (f), -e (n)", "-er, -e, -es", "-en für alle"], "answer": 0, "why": "np. dobry dom (m), dobra kawa (f), dobre piwo (n)."},
      {"q": "„dobry“ wird vor weichem k/g zu ____", "options": ["-i (np. polski, drogi)", "-y", "-u", "-e"], "answer": 0, "why": "Nach k und g steht im Polnischen orthografisch immer i statt y: wielki, drogi, polski."},
      {"q": "Wie heißt „eine neue Wohnung“ (mieszkanie, n.)?", "options": ["nowe mieszkanie", "nowy mieszkanie", "nowa mieszkanie", "nowem mieszkanie"], "answer": 0, "why": "mieszkanie ist sächlich (-e), daher verlangt es die sächliche Adjektivendung -e: nowe mieszkanie."},
      {"q": "Wo steht das Adjektiv im Polnischen meistens?", "options": ["Vor dem Nomen (wie im Deutschen: dobra książka)", "Immer zwingend am Satzende", "Immer vor dem Prädikat", "Niemals vor dem Nomen"], "answer": 0, "why": "Beschreibende Adjektive stehen meist vor dem Nomen (dobra kawa), feste Klassifikationen oft dahinter (język polski)."},
    ],
    pages: [
      { heading: 'Adjektive passen sich Genus, Numerus und Kasus an', html: `
        <p>Im Nominativ Singular gelten die drei klaren Grundendungen:</p>
        <table class="gr-table">
          <tr><th>Genus</th><th>Endung</th><th>Beispiel</th></tr>
          <tr><td>Männlich</td><td><b>-y</b> (nach k/g: <b>-i</b>)</td><td><i>nowy dom</i> (neues Haus), <i>polski film</i> (polnischer Film)</td></tr>
          <tr><td>Weiblich</td><td><b>-a</b></td><td><i>nowa szkoła</i> (neue Schule), <i>polska muzyka</i> (polnische Musik)</td></tr>
          <tr><td>Sächlich</td><td><b>-e</b></td><td><i>nowe auto</i> (neues Auto), <i>polskie piwo</i> (polnisches Bier)</td></tr>
        </table>
        <div class="grammar-tip">💡 Im Akkusativ Singular passt sich das Adjektiv genau wie das Nomen an: <i>Mam now<b>ą</b> książk<b>ę</b></i> (f.), <i>Mam now<b>ego</b> psa</i> (m. belebt), <i>Mam now<b>y</b> telefon</i> (m. unbelebt).</div>` },
    ],
  },
  {
    id: 'pronouns-address', title: 'Höflichkeit: Pan, Pani & Państwo', icon: 'fa-user-tie', beforeLesson: 50,
    drills: [
      {"q": "Wie spricht man Fremde oder Kunden auf Polnisch höflich an?", "options": ["Mit Pan (Herr) bzw. Pani (Frau) in der 3. Person", "Mit „ty“ (du)", "Mit „wy“ wie im Russischen", "Nur mit dem Nachnamen"], "answer": 0, "why": "Polen siezen mit „Pan“ (Herr) und „Pani“ (Frau) in der 3. Person Singular: „Co Pan robi?“"},
      {"q": "Wie spricht man eine gemischte Gruppe Fremder höflich an?", "options": ["Państwo (mit Verb in der 3. Person Plural)", "Wy", "Pany", "Panowie"], "answer": 0, "why": "Państwo steht für Damen und Herren gemeinsam: „Czy Państwo chcą zamówić?“"},
      {"q": "„Czy może mi Pan pomóc?“ bedeutet wörtlich ____", "options": ["Kann mir der Herr helfen? (Sehr höfliches Siezen)", "Kannst du mir helfen?", "Helfen sie mir?", "Wer hilft mir?"], "answer": 0, "why": "Wörtlich mit „Herr“, im Deutschen die normale höfliche Sie-Form: „Können Sie mir helfen?“"},
      {"q": "Gilt es in Polen als unhöflich, fremde Erwachsene sofort mit „ty“ (du) anzusprechen?", "options": ["Ja, das gilt im Alltag als grob unhöflich", "Nein, jeder duzt jeden", "Nur in der Schule", "Nur gegenüber Älteren"], "answer": 0, "why": "Polen legen großen Wert auf die Höflichkeitsformen Pan und Pani im geschäftlichen und alltäglichen Kontakt."},
    ],
    pages: [
      { heading: 'Die Kunst des polnischen Siezens', html: `
        <p>Im Polnischen gibt es kein direktes Gegenstück zum deutschen „Sie". Stattdessen spricht man die Person mit <b>Pan</b> (Herr) oder <b>Pani</b> (Frau) an und verwendet das Verb in der <b>3. Person</b>:</p>
        <table class="gr-table">
          <tr><th>Formel</th><th>Bedeutung</th><th>Beispiel</th></tr>
          <tr><td><b>Pan</b> + 3. Sg.</td><td>Sie (ein Herr)</td><td><i>Czy mówi Pan po angielsku?</i> (Sprechen Sie Englisch?)</td></tr>
          <tr><td><b>Pani</b> + 3. Sg.</td><td>Sie (eine Dame)</td><td><i>Co Pani poleca?</i> (Was empfehlen Sie?)</td></tr>
          <tr><td><b>Państwo</b> + 3. Pl.</td><td>Sie (gemischte Gruppe)</td><td><i>Czy Państwo są gotowi?</i> (Sind Sie bereit?)</td></tr>
          <tr><td><b>Panowie</b> / <b>Panie</b></td><td>Herrenrunde / Damenrunde</td><td><i>Zapraszam panów / panie!</i></td></tr>
        </table>` },
    ],
  },
  {
    id: 'numbers', title: 'Zahlen & Mengenangaben: Die 1-4-5-Regel', icon: 'fa-calculator', beforeLesson: 55,
    drills: [
      {"q": "Welchen Fall verlangt die Zahl 1 (np. jeden złoty)?", "options": ["Nominativ Singular", "Genitiv Plural", "Nominativ Plural", "Instrumental"], "answer": 0, "why": "1 verlangt wie im Deutschen Nominativ Singular: jeden złoty, jedna minuta."},
      {"q": "Welchen Fall verlangen die Zahlen 2, 3 und 4 (dwa, trzy, cztery)?", "options": ["Nominativ Plural (dwa złote, trzy godziny)", "Genitiv Plural", "Dativ Singular", "Instrumental"], "answer": 0, "why": "2, 3, 4 enden auf Nominativ Plural: dwa złote, trzy bilety, cztery kawy."},
      {"q": "Welchen Fall verlangen alle Zahlen ab 5 (pięć, sześć, dziesięć...)?", "options": ["Genitiv Plural (pięć złotych, dziesięć minut)", "Nominativ Singular", "Akkusativ Singular", "Vokativ"], "answer": 0, "why": "Ab 5 regieren Zahlen zwingend den Genitiv Plural: pięć złotych, sto euro."},
      {"q": "Wie heißt „fünf Złoty“ auf Polnisch?", "options": ["pięć złotych", "pięć złoty", "pięć złote", "pięć złotem"], "answer": 0, "why": "złoty (Nom. Sg.) → dwa złote (2-4 Nom. Pl.) → pięć złotych (5+ Gen. Pl.)."},
    ],
    pages: [
      { heading: 'Die faszinierende Zählregel des Polnischen', html: `
        <p>Beim Zählen unterscheidet das Polnische drei Gruppen, die man sich beim Einkaufen sofort einprägen sollte:</p>
        <table class="gr-table">
          <tr><th>Zahlenbereich</th><th>Grammatischer Fall</th><th>Beispiel mit <i>złoty</i></th><th>Beispiel mit <i>kawa</i></th></tr>
          <tr><td><b>1</b> (jeden / jedna / jedno)</td><td>Nominativ Singular</td><td><i>1 złoty</i></td><td><i>1 kawa</i></td></tr>
          <tr><td><b>2, 3, 4</b> (auch 22, 23, 24...)</td><td>Nominativ Plural</td><td><i>3 złote</i></td><td><i>3 kawy</i></td></tr>
          <tr><td><b>5 bis 21</b> (und runde Zehner)</td><td><b>Genitiv Plural</b></td><td><i>5 złotych</i></td><td><i>5 kaw</i></td></tr>
        </table>
        <div class="grammar-tip">💡 Zahlen, die auf 2, 3 oder 4 enden (z. B. 32, 44), verlangen wieder Nominativ Plural (<i>32 złote</i>), außer 12, 13, 14 (weil sie zwischen 5 und 21 liegen: <i>14 złotych</i>).</div>` },
    ],
  },
  {
    id: 'prepositions', title: 'Wichtige Präpositionen und ihre Fälle', icon: 'fa-compass-drafting', beforeLesson: 60,
    drills: [
      {"q": "Welchen Fall verlangt die Präposition „bez“ (ohne)?", "options": ["Genitiv (bez cukru, bez mleka)", "Akkusativ", "Dativ", "Lokativ"], "answer": 0, "why": "„bez“ verlangt immer den Genitiv: bez problemu, bez wątpienia."},
      {"q": "Welche Präposition drückt ein Ziel aus (Wohin?) und verlangt den Genitiv?", "options": ["do (do kina, do domu)", "w", "o", "przy"], "answer": 0, "why": "„do“ + Genitiv ist das Standard-Wohin für Richtungen: idę do sklepu, jadę do Polski."},
      {"q": "Wann verlangt „na“ den Akkusativ?", "options": ["Bei Bewegung / Richtung (Wohin?)", "Bei Ruhe / Ort (Wo?)", "Niemals", "Nur bei Personen"], "answer": 0, "why": "Genau wie im Deutschen: Wo? → Lokativ (na stole = auf dem Tisch); Wohin? → Akkusativ (na stół = auf den Tisch)."},
      {"q": "Was bedeutet „dla ciebie“?", "options": ["für dich (dla + Genitiv)", "mit dir", "ohne dich", "nach dir"], "answer": 0, "why": "„dla“ bedeutet „für“ und verlangt immer den Genitiv: dla mnie (für mich), dla ciebie (für dich)."},
    ],
    pages: [
      { heading: 'Präpositionen nach Fällen geordnet', html: `
        <table class="gr-table">
          <tr><th>Fall</th><th>Präpositionen</th><th>Bedeutung & Beispiel</th></tr>
          <tr><td><b>Genitiv</b></td><td><i>do, od, z, dla, bez, blisko</i></td><td><i>do pracy</i> (zur Arbeit), <i>kawa bez cukru</i> (Kaffee ohne Zucker)</td></tr>
          <tr><td><b>Akkusativ</b></td><td><i>przez, na (Wohin?), w (Wohin?)</i></td><td><i>przez park</i> (durch den Park), <i>idę na pocztę</i> (zur Post)</td></tr>
          <tr><td><b>Instrumental</b></td><td><i>z (mit), pod, nad, przed, za</i></td><td><i>herbata z cytryną</i> (Tee mit Zitrone), <i>przed domem</i> (vor dem Haus)</td></tr>
          <tr><td><b>Lokativ</b></td><td><i>w (Wo?), na (Wo?), o, przy, po</i></td><td><i>w restauracji</i> (im Restaurant), <i>przy oknie</i> (am Fenster)</td></tr>
        </table>` },
    ],
  },
  {
    id: 'word-order-negation', title: 'Fragen, Verneinung & Satzbau', icon: 'fa-quote-left', beforeLesson: 65,
    drills: [
      {"q": "Welches kleine Partikel verwandelt eine Aussage in eine Ja/Nein-Frage?", "options": ["Czy (np. Czy masz czas?)", "Co", "Kto", "Gdzie"], "answer": 0, "why": "„Czy“ am Satzanfang signalisiert eine Entscheidungsfrage (wie „ob“ im Deutschen)."},
      {"q": "Wie funktioniert die Verneinung mit Wörtern wie „nigdy“ (nie) oder „nic“ (nichts)?", "options": ["Polnisch verlangt obligatorisch die doppelte Verneinung mit „nie“", "Man darf „nie“ dann nicht mehr verwenden", "Nur am Satzende", "Verneinung entfällt"], "answer": 0, "why": "Im Polnischen ist die doppelte Verneinung grammatisch Pflicht: „Nigdy tego nie robiłem“ (Ich habe das nie getan), „Nic nie wiem“."},
      {"q": "Wo steht das Verneinungswort „nie“ im Satz?", "options": ["Direkt vor dem Verb (nie wiem, nie mam)", "Ganz am Ende des Satzes", "Immer vor dem Subjekt", "Vor dem ersten Adjektiv"], "answer": 0, "why": "„nie“ steht unmittelbar vor dem Verb: Nie rozumiem, nie palę, nie chcę."},
      {"q": "Wo platziert man das Reflexivpronomen „się“ am besten?", "options": ["Vor oder nach dem Verb, aber nie am Satzende betont", "Immer als allerletztes Wort", "Immer vor dem Subjekt", "Nur im Infinitiv"], "answer": 0, "why": "„się“ ist unbetont und steht meist direkt vor oder nach dem Verb, jedoch niemals an betonter Stelle am Satzende."},
    ],
    pages: [
      { heading: 'Fragen mit „Czy“ & doppelte Verneinung', html: `
        <p>Zwei Grundlagen für flüssiges Alltags-Polnisch:</p>
        <ul>
          <li><b>Entscheidungsfragen mit <i>Czy</i></b>: Setze einfach <i>Czy</i> vor den Satz: <i>Mówisz po polsku</i> (Du sprichst Polnisch) → <i><b>Czy</b> mówisz po polsku?</i> (Sprichst du Polnisch?).</li>
          <li><b>Obligatorische doppelte Verneinung</b>: Im Polnischen schließen sich negative Pronomen und <i>nie</i> nicht aus — sie <b>müssen</b> zusammenstehen:</li>
        </ul>
        <table class="gr-table">
          <tr><th>Negationswort</th><th>Polnischer Satz</th><th>Deutsche Übersetzung</th></tr>
          <tr><td><i>nigdy</i> (nie)</td><td><i><b>Nigdy nie</b> jem mięsa.</i></td><td>Ich esse nie Fleisch.</td></tr>
          <tr><td><i>nic</i> (nichts)</td><td><i><b>Nic nie</b> widzę.</i></td><td>Ich sehe nichts.</td></tr>
          <tr><td><i>nikt</i> (niemand)</td><td><i><b>Nikt nie</b> wie.</i></td><td>Niemand weiß es.</td></tr>
          <tr><td><i>nigdzie</i> (nirgends)</td><td><i><b>Nigdzie nie</b> idę.</i></td><td>Ich gehe nirgendwohin.</td></tr>
        </table>` },
    ],
  }
];
