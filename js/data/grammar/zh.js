// Grammatik-Kapitel Chinesisch (Mandarin) — werden im Lernkurs vor der
// jeweiligen Lektion (beforeLesson) eingeschoben und sind in der
// Übersicht nachlesbar.
export const grammar = [
  {
    id: 'intro', title: 'So funktioniert Chinesisch', icon: 'fa-compass', beforeLesson: 1,
    drills: [
      {"q": "Wie viele Töne hat das Hochchinesische?", "options": ["vier plus den neutralen", "drei", "fünf betonte", "zwei"], "answer": 0, "why": "mā, má, mǎ, mà — dazu der neutrale Ton ohne Zeichen."},
      {"q": "Was bedeutet „mā“ (1. Ton)?", "options": ["Mutter", "Pferd", "Hanf", "schimpfen"], "answer": 0, "why": "妈 = Mutter; 马 (mǎ) wäre das Pferd."},
      {"q": "Was gibt es im Chinesischen NICHT?", "options": ["Verbformen", "Töne", "Schriftzeichen", "Wortarten"], "answer": 0, "why": "吃 heißt ich esse, du isst, er aß — eine Form für alles."},
      {"q": "电 (Strom) + 话 (Sprache) ergibt ____", "options": ["Telefon", "Radio", "Zeitung", "Computer"], "answer": 0, "why": "电话 — so wachsen chinesische Wörter."},
    ],
    pages: [
      { heading: 'Die gute Nachricht zuerst', html: `
        <p>Chinesisch hat den Ruf, schwer zu sein — die <b>Grammatik</b> ist aber die einfachste, die dir je begegnet ist. Es gibt schlicht nicht:</p>
        <ul>
          <li><b>keine Artikel</b> (kein der/die/das),</li>
          <li><b>keine Fälle</b> (kein Dativ, kein Genitiv),</li>
          <li><b>keine Verbformen</b> — <i>吃</i> heißt ich esse, du isst, er aß, wir werden essen,</li>
          <li><b>keine Mehrzahl-Endungen</b>, <b>kein Geschlecht</b>.</li>
        </ul>
        <p>Ein Wort bleibt immer genau, wie es ist. Was die Bedeutung festlegt, ist die <b>Reihenfolge</b> im Satz und ein paar kleine Signalwörter.</p>
        <div class="grammar-tip">💡 Die Arbeit steckt woanders: in den <b>Tönen</b> und den <b>Schriftzeichen</b>. Beides lernst du hier von Anfang an mit Pinyin-Umschrift daneben.</div>` },
      { heading: 'Vier Töne — und warum sie zählen', html: `
        <p>Jede Silbe wird in einer von vier Tonhöhen gesprochen. Der Ton gehört zum Wort wie ein Buchstabe:</p>
        <table class="grammar-table">
          <tr><th>Ton</th><th>Zeichen</th><th>Klang</th><th>Beispiel</th></tr>
          <tr><td>1. hoch</td><td>mā</td><td>gleichbleibend hoch, wie ein gehaltener Ton</td><td>妈 Mutter</td></tr>
          <tr><td>2. steigend</td><td>má</td><td>hebt an — wie eine deutsche Rückfrage</td><td>麻 Hanf</td></tr>
          <tr><td>3. tief</td><td>mǎ</td><td>sinkt ab und hebt leicht wieder</td><td>马 Pferd</td></tr>
          <tr><td>4. fallend</td><td>mà</td><td>kurz und bestimmt nach unten</td><td>骂 schimpfen</td></tr>
        </table>
        <p>Dazu kommt der <b>neutrale Ton</b> (ohne Zeichen), leicht und kurz: <i>māma</i> (Mutter), <i>xièxie</i> (danke).</p>
        <div class="grammar-tip">💡 Keine Panik: Im Satz versteht man dich auch mit unsauberen Tönen. Nutze in der App den Hör-Knopf — Nachahmen wirkt besser als Auswendiglernen.</div>` },
      { heading: 'Zeichen lesen, Pinyin sprechen', html: `
        <p>Ein <b>Schriftzeichen</b> (汉字, hànzì) steht für eine Silbe mit Bedeutung. Viele Wörter bestehen aus zwei Zeichen, die zusammen einen neuen Sinn ergeben:</p>
        <ul>
          <li>电 (Strom) + 话 (Sprache) = <b>电话</b> Telefon</li>
          <li>飞 (fliegen) + 机 (Maschine) = <b>飞机</b> Flugzeug</li>
          <li>火 (Feuer) + 车 (Wagen) = <b>火车</b> Zug</li>
        </ul>
        <p>Genau deshalb wächst dein Wortschatz schnell: Kennst du 100 Zeichen, verstehst du hunderte Wörter mit.</p>
        <p>Die Umschrift heißt <b>Pinyin</b> und steht in dieser App immer dabei.</p>` },
    ],
  },
  {
    id: 'syntax', title: 'Satzbau: Wer – tut – was', icon: 'fa-arrows-left-right', beforeLesson: 2,
    drills: [
      {"q": "Wie lautet die Grundordnung?", "options": ["Subjekt – Verb – Objekt", "Subjekt – Objekt – Verb", "Verb – Subjekt – Objekt", "frei"], "answer": 0, "why": "我喝茶 — ich trinke Tee."},
      {"q": "Wo stehen Zeit- und Ortsangaben?", "options": ["vor dem Verb", "nach dem Verb", "am Satzende", "beliebig"], "answer": 0, "why": "Wer – wann – wo – was tut."},
      {"q": "我 ____ 喝咖啡。(Ich trinke keinen Kaffee.)", "options": ["不", "没", "别", "无"], "answer": 0, "why": "不 für Gegenwart und Gewohnheit."},
      {"q": "我 ____ 有钱。(Ich habe kein Geld.)", "options": ["没", "不", "别", "未"], "answer": 0, "why": "没 steht bei 有 und in der Vergangenheit."},
    ],
    pages: [
      { heading: 'Die Grundordnung', html: `
        <p>Chinesische Sätze folgen fast immer <b>Subjekt – Verb – Objekt</b>, genau wie im deutschen Hauptsatz:</p>
        <p class="grammar-example">我 喝 茶。<br><span>wǒ hē chá — ich trinke Tee</span></p>
        <p class="grammar-example">他 是 老师。<br><span>tā shì lǎoshī — er ist Lehrer</span></p>
        <p>Kein Artikel, keine Endung, keine Konjugation. Was du siehst, ist der ganze Satz.</p>` },
      { heading: 'Zeit und Ort stehen VORNE', html: `
        <p>Anders als im Deutschen kommen Zeit- und Ortsangaben <b>vor</b> das Verb — und zwar in der Reihenfolge <b>Zeit → Ort → Verb</b>:</p>
        <p class="grammar-example">我 明天 去 北京。<br><span>wǒ míngtiān qù Běijīng — ich fahre morgen nach Peking</span></p>
        <p class="grammar-example">我们 在 公园 散步。<br><span>wǒmen zài gōngyuán sànbù — wir spazieren im Park</span></p>
        <div class="grammar-tip">💡 Merksatz: <b>Wer – wann – wo – was tut.</b> Vom Großen zum Kleinen — das gilt auch bei Adressen und Daten.</div>` },
      { heading: 'Verneinen mit 不 und 没', html: `
        <p>Zwei kleine Wörter, klar getrennt:</p>
        <ul>
          <li><b>不 (bù)</b> — Gegenwart, Zukunft, Gewohnheiten: 我<b>不</b>喝咖啡。 <i>Ich trinke keinen Kaffee.</i></li>
          <li><b>没 (méi)</b> — Vergangenes und das Verb 有 (haben): 我<b>没</b>有钱。 <i>Ich habe kein Geld.</i></li>
        </ul>
        <p>Die Verneinung steht immer direkt vor dem Verb.</p>` },
    ],
  },
  {
    id: 'measure', title: 'Zählwörter: 一个人', icon: 'fa-list-ol', beforeLesson: 3,
    drills: [
      {"q": "三 ____ 人 (drei Menschen)", "options": ["个", "本", "杯", "只"], "answer": 0, "why": "个 ist das Allzweck-Zählwort."},
      {"q": "两 ____ 茶 (zwei Tassen Tee)", "options": ["杯", "个", "本", "条"], "answer": 0, "why": "杯 für Tassen und Gläser."},
      {"q": "Wie sagt man „zwei Menschen“?", "options": ["两个人", "二个人", "两人个", "二人"], "answer": 0, "why": "Vor Zählwörtern heißt zwei 两, nicht 二."},
      {"q": "Welches Zählwort passt zu Büchern?", "options": ["本", "个", "只", "杯"], "answer": 0, "why": "两本书 — zwei Bücher."},
    ],
    pages: [
      { heading: 'Zwischen Zahl und Nomen gehört ein Wort', html: `
        <p>Man sagt nie „zwei Bücher", sondern immer <b>Zahl + Zählwort + Nomen</b> — wie im Deutschen „zwei <i>Tassen</i> Kaffee":</p>
        <p class="grammar-example">三 <b>个</b> 人<br><span>sān gè rén — drei Menschen</span></p>
        <p class="grammar-example">两 <b>杯</b> 茶<br><span>liǎng bēi chá — zwei Tassen Tee</span></p>
        <p>Das Allzweck-Zählwort ist <b>个 (gè)</b>. Wenn du unsicher bist, nimm 个 — man versteht dich immer.</p>` },
      { heading: 'Die wichtigsten Zählwörter', html: `
        <table class="grammar-table">
          <tr><th>Zählwort</th><th>für</th><th>Beispiel</th></tr>
          <tr><td>个 gè</td><td>alles Allgemeine, Menschen</td><td>一个问题 eine Frage</td></tr>
          <tr><td>本 běn</td><td>Bücher, Hefte</td><td>两本书 zwei Bücher</td></tr>
          <tr><td>杯 bēi</td><td>Tassen, Gläser</td><td>一杯水 ein Glas Wasser</td></tr>
          <tr><td>只 zhī</td><td>Tiere</td><td>三只猫 drei Katzen</td></tr>
          <tr><td>件 jiàn</td><td>Kleidung, Angelegenheiten</td><td>一件衣服 ein Kleidungsstück</td></tr>
          <tr><td>条 tiáo</td><td>Langes (Straße, Fisch, Hose)</td><td>一条路 eine Straße</td></tr>
        </table>
        <div class="grammar-tip">💡 Achtung bei der Zwei: vor Zählwörtern heißt sie <b>两 (liǎng)</b>, nicht 二. Also 两个人 — nicht 二个人.</div>` },
    ],
  },
  {
    id: 'questions', title: 'Fragen stellen', icon: 'fa-circle-question', beforeLesson: 5,
    drills: [
      {"q": "你是学生 ____？(Bist du Student?)", "options": ["吗", "呢", "吧", "了"], "answer": 0, "why": "吗 macht aus jeder Aussage eine Frage."},
      {"q": "你叫 ____ 名字？", "options": ["什么", "谁", "哪里", "怎么"], "answer": 0, "why": "Das Fragewort steht dort, wo die Antwort stehen wird."},
      {"q": "他在 ____？(Wo ist er?)", "options": ["哪里", "什么", "谁", "为什么"], "answer": 0, "why": "哪里 = wo."},
      {"q": "Braucht ein Satz mit Fragewort noch 吗?", "options": ["nein", "ja", "nur höflich", "nur schriftlich"], "answer": 0, "why": "Beides zusammen wäre doppelt gemoppelt."},
    ],
    pages: [
      { heading: 'Das Zauberwort 吗', html: `
        <p>Eine Ja/Nein-Frage baust du, indem du an den <b>fertigen Aussagesatz</b> einfach <b>吗 (ma)</b> hängst. Nichts wird umgestellt:</p>
        <p class="grammar-example">你 是 学生。 → 你 是 学生 <b>吗</b>？<br><span>Du bist Student. → Bist du Student?</span></p>
        <p class="grammar-example">你 喝 茶 <b>吗</b>？<br><span>nǐ hē chá ma — Trinkst du Tee?</span></p>` },
      { heading: 'Fragewörter bleiben an ihrem Platz', html: `
        <p>Der zweite Trick: Ein Fragewort steht <b>genau dort, wo die Antwort stehen wird</b>. Es wird nichts nach vorne gezogen:</p>
        <p class="grammar-example">你 叫 <b>什么</b> 名字？ → 我 叫 小明。<br><span>Du heißt welchen Namen? → Ich heiße Xiaoming.</span></p>
        <p class="grammar-example">他 在 <b>哪里</b>？ → 他 在 家。<br><span>Er ist wo? → Er ist zu Hause.</span></p>
        <ul>
          <li>什么 shénme — was</li>
          <li>谁 shéi — wer</li>
          <li>哪里 nǎlǐ — wo</li>
          <li>什么时候 shénme shíhou — wann</li>
          <li>为什么 wèishénme — warum</li>
          <li>怎么 zěnme — wie</li>
          <li>几 jǐ / 多少 duōshao — wie viele</li>
        </ul>
        <div class="grammar-tip">💡 Ein Satz mit Fragewort braucht <b>kein</b> 吗. Beides zusammen wäre doppelt gemoppelt.</div>` },
    ],
  },
  {
    id: 'tense', title: 'Zeit ausdrücken ohne Zeitform', icon: 'fa-clock', beforeLesson: 12,
    drills: [
      {"q": "我 ____ 天去北京。(Ich fuhr gestern nach Peking.)", "options": ["昨", "明", "今", "后"], "answer": 0, "why": "Das Zeitwort sagt die Zeit — das Verb bleibt gleich."},
      {"q": "我吃 ____。(Ich habe gegessen.)", "options": ["了", "过", "在", "要"], "answer": 0, "why": "了 markiert eine abgeschlossene Handlung."},
      {"q": "我去 ____ 中国。(Ich war schon mal in China.)", "options": ["过", "了", "在", "要"], "answer": 0, "why": "过 heißt „schon einmal erlebt“."},
      {"q": "我 ____ 吃饭。(Ich esse gerade.)", "options": ["在", "了", "过", "要"], "answer": 0, "why": "在 vor dem Verb heißt „gerade dabei“."},
    ],
    pages: [
      { heading: 'Das Verb bleibt gleich — die Zeit sagt der Satz', html: `
        <p>Chinesische Verben verändern sich nie. Wann etwas passiert, verrät ein <b>Zeitwort</b> am Satzanfang:</p>
        <p class="grammar-example">我 <b>昨天</b> 去 北京。 <i>Ich fuhr gestern nach Peking.</i><br>
           我 <b>明天</b> 去 北京。 <i>Ich fahre morgen nach Peking.</i></p>
        <p>Dasselbe 去 — nur das Zeitwort wechselt. Genau deshalb gibt es keine Verbtabellen zu pauken.</p>` },
      { heading: 'Die kleinen Helfer 了 und 过', html: `
        <ul>
          <li><b>了 (le)</b> markiert eine <b>abgeschlossene</b> Handlung: 我吃<b>了</b>。 <i>Ich habe gegessen.</i></li>
          <li><b>过 (guo)</b> heißt „schon einmal erlebt": 我去<b>过</b>中国。 <i>Ich war schon mal in China.</i></li>
          <li><b>在 (zài)</b> vor dem Verb heißt „gerade dabei": 我<b>在</b>吃饭。 <i>Ich esse gerade.</i></li>
          <li><b>要 (yào)</b> kündigt Zukünftiges an: 我<b>要</b>去。 <i>Ich werde gehen.</i></li>
        </ul>
        <div class="grammar-tip">💡 Verneint man mit 没, fällt 了 weg: 我<b>没</b>吃。 <i>Ich habe nicht gegessen.</i></div>` },
    ],
  },
  {
    id: 'possess', title: 'Besitz & Beschreibung mit 的', icon: 'fa-link', beforeLesson: 18,
    drills: [
      {"q": "我 ____ 书 (mein Buch)", "options": ["的", "了", "吗", "在"], "answer": 0, "why": "的 verbindet Besitzer und Sache."},
      {"q": "红色 ____ 裙子 (der rote Rock)", "options": ["的", "了", "很", "是"], "answer": 0, "why": "的 schließt auch Beschreibungen an."},
      {"q": "这个菜 ____ 好吃。(Dieses Gericht ist lecker.)", "options": ["很", "是", "的", "在"], "answer": 0, "why": "Vor Adjektiven steht 很, nicht 是."},
      {"q": "Wann lässt man 的 weg?", "options": ["bei enger Verbundenheit", "nie", "immer im Plural", "bei Farben"], "answer": 0, "why": "我妈妈, 我家 — ohne 的."},
    ],
    pages: [
      { heading: 'Ein Wort für alles Zugehörige', html: `
        <p><b>的 (de)</b> verbindet zwei Dinge — links der Besitzer oder die Beschreibung, rechts die Sache:</p>
        <p class="grammar-example">我 <b>的</b> 书<br><span>wǒ de shū — mein Buch (wörtlich: ich-s Buch)</span></p>
        <p class="grammar-example">红色 <b>的</b> 裙子<br><span>hóngsè de qúnzi — der rote Rock</span></p>
        <p class="grammar-example">我 妈妈 做 <b>的</b> 菜<br><span>wǒ māma zuò de cài — das Essen, das meine Mutter kocht</span></p>
        <p>Mit 的 baust du also Genitiv, Adjektiv-Anschluss und Relativsatz — alles mit einem einzigen Wort.</p>
        <div class="grammar-tip">💡 Bei enger Verbundenheit lässt man 的 weg: 我妈妈 (meine Mutter), 我家 (mein Zuhause).</div>` },
      { heading: 'Adjektive brauchen kein „ist"', html: `
        <p>Vor einem Adjektiv steht <b>kein</b> 是, sondern meist ein <b>很 (hěn)</b>. Es füllt die Stelle, die im Deutschen „ist" einnimmt:</p>
        <p class="grammar-example">这个 菜 <b>很</b> 好吃。<br><span>zhège cài hěn hǎochī — dieses Gericht ist lecker</span></p>
        <p>Wörtlich stünde da „sehr lecker" — gemeint ist aber schlicht „ist lecker". Erst betontes 很 heißt wirklich „sehr".</p>` },
    ],
  },
];
