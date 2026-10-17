# -*- coding: utf-8 -*-
"""
Builder script for Polish batch 6 (cards 1250 to 1499).
"""
import json
import sys
import os

sys.path.append(os.path.dirname(__file__))
from polish_ipa import polish_ipa

BATCH6_ENTRIES = [
    # 0 (1250)
    ("tryb samolotowy", "Podczas lotu wszystkie telefony muszą być przełączone w tryb samolotowy."),
    # 1 (1251)
    ("pojemność baterii", "Po intensywnym użytkowaniu pojemność baterii spadła do dwudziestu procent."),
    # 2 (1252)
    ("sieć Wi-Fi", "W hotelu łączymy się z bezpłatną siecią Wi-Fi."),
    # 3 (1253)
    ("połączenie internetowe", "Stabilne połączenie internetowe jest ważne dla płynnych wideorozmów."),
    # 4 (1254)
    ("weekend", "W weekend lubię długo spać i jeść śniadanie w spokoju."),
    # 5 (1255)
    ("święto", "W dni świąteczne większość sklepów pozostaje zamknięta."),
    # 6 (1256)
    ("wycieczka", "W sobotę rodzina wybrała się na wycieczkę do zoo."),
    # 7 (1257)
    ("piknik", "Rozłożyliśmy koc i zrobiliśmy piknik w cieniu."),
    # 8 (1258)
    ("hamak", "Między dwoma cienistymi drzewami rozpiął wygodny hamak."),
    # 9 (1259)
    ("gra planszowa", "Wieczorem chętnie gramy przy stole w emocjonującą grę planszową."),
    # 10 (1260)
    ("gra w karty", "W czwórkę rozegrali wciągającą grę w karty."),
    # 11 (1261)
    ("krzyżówka", "Przy niedzielnej kawie mój dziadek rozwiązuje krzyżówkę."),
    # 12 (1262)
    ("fotografia", "Fotografia przyrodnicza jest od wielu lat jego wielką pasją."),
    # 13 (1263)
    ("ogrodnictwo", "Ogrodnictwo we własnym warzywniku relaksuje po męczącym tygodniu."),
    # 14 (1264)
    ("robienie na drutach", "Jej pasją jest robienie na drutach ciepłych skarpet z wełny dla wnuków."),
    # 15 (1265)
    ("szydełkowanie", "Szydełkowanie delikatnych serwetek wymaga cienkiego szydełka."),
    # 16 (1266)
    ("maszyna do szycia", "Elektryczna maszyna do szycia pozwala jej szyć nowe poszewki na poduszki."),
    # 17 (1267)
    ("majsterkowanie", "W sobotę w piwnicy całkowicie pochłania go majsterkowanie."),
    # 18 (1268)
    ("robótki ręczne", "Przed świętami dzieci chętnie wykonują robótki ręczne z papieru."),
    # 19 (1269)
    ("bestseller", "Wciągający kryminał natychmiast trafił na listę bestsellerów."),
    # 20 (1270)
    ("książka w miękkiej oprawie", "Na urlop pakuje do walizki dwie lekkie książki w miękkiej oprawie."),
    # 21 (1271)
    ("zakładka do książki", "Ładna zakładka do książki zaznacza ostatnio czytaną stronę."),
    # 22 (1272)
    ("księgarnia", "W małej księgarni na rogu potrafi przeglądać książki godzinami."),
    # 23 (1273)
    ("fabuła", "Wciągająca fabuła powieści toczy się w wiktoriańskim Londynie."),
    # 24 (1274)
    ("główny bohater", "Odważny główny bohater pokonuje w trakcie książki wiele trudności."),
    # 25 (1275)
    ("rozdział", "Przed zaśnięciem doczytuję do końca wciągający rozdział."),
    # 26 (1276)
    ("autor", "Uznany autor podpisywał po spotkaniu autorskim wiele egzemplarzy."),
    # 27 (1277)
    ("ekran kinowy", "Na wielkim ekranie kinowym ujęcia krajobrazów robią ogromne wrażenie."),
    # 28 (1278)
    ("film dokumentalny", "Film dokumentalny ukazuje fascynujące życie dzikich zwierząt."),
    # 29 (1279)
    ("komedia", "Zabawna komedia wywołała na sali wiele serdecznego śmiechu."),
    # 30 (1280)
    ("napisy", "Filmy obcojęzyczne oglądam najchętniej z napisami."),
    # 31 (1281)
    ("pilot", "Za pomocą pilota ścisza głośność telewizora."),
    # 32 (1282)
    ("serial telewizyjny", "Nowy sezon popularnego serialu telewizyjnego ukaże się w przyszłym tygodniu."),
    # 33 (1283)
    ("aktor", "Utalentowany aktor bardzo wiarygodnie wciela się w swoją rolę."),
    # 34 (1284)
    ("sztuka teatralna", "Klasyczna sztuka teatralna Schillera doczekała się nowoczesnej inscenizacji."),
    # 35 (1285)
    ("kurtyna teatralna", "Przy gromkich brawach opadła ciężka czerwona kurtyna teatralna."),
    # 36 (1286)
    ("oklaski", "Zachwycona publiczność nagrodziła aktorów gromkimi oklaskami."),
    # 37 (1287)
    ("scenografia", "Bogata scenografia przedstawiała zabytkowy rynek miasta."),
    # 38 (1288)
    ("szatnia", "Przed rozpoczęciem spektaklu kurtki zostawia się w szatni."),
    # 39 (1289)
    ("przerwa", "W trakcie dwudziestominutowej przerwy goście piją kieliszek wina musującego."),
    # 40 (1290)
    ("balkon", "Z miejsc na pierwszym balkonie roztacza się znakomity widok."),
    # 41 (1291)
    ("próba generalna", "Ostatnia próba generalna przed wielką premierą przebiegła bezbłędnie."),
    # 42 (1292)
    ("galeria sztuki", "W miejskiej galerii sztuki młodzi malarze wystawiają swoje prace."),
    # 43 (1293)
    ("obraz olejny", "Cenny obraz olejny pochodzi z siedemnastego wieku."),
    # 44 (1294)
    ("rzeźba", "W ogrodzie muzealnym stoi rzeźba z brązu naturalnej wielkości."),
    # 45 (1295)
    ("przewodnik muzealny", "Elektroniczny przewodnik muzealny ciekawie oprowadza zwiedzających po salach."),
    # 46 (1296)
    ("wstęp", "Dla uczniów i studentów wstęp w niedziele jest ulgowy."),
    # 47 (1297)
    ("wystawa czasowa", "Wystawa czasowa o starożytności przyciąga wielu zwiedzających."),
    # 48 (1298)
    ("arcydzieło", "Ten słynny portret jest uznawany za arcydzieło malarza."),
    # 49 (1299)
    ("gitara akustyczna", "Przy ognisku akompaniuje do piosenek na gitarze akustycznej."),
    # 50 (1300)
    ("pianino", "Każdego popołudnia pilnie ćwiczy gamy na pianinie."),
    # 51 (1301)
    ("skrzypce", "Czysty dźwięk skrzypiec prowadził melodię kwartetu smyczkowego."),
    # 52 (1302)
    ("perkusja", "Perkusja nadaje zespołowi porywający rytm."),
    # 53 (1303)
    ("pulpit na nuty", "Zeszyt z nutami leży otwarty na stabilnym pulpicie na nuty."),
    # 54 (1304)
    ("słuchawki", "W pociągu słucha ulubionej muzyki przez bezprzewodowe słuchawki."),
    # 55 (1305)
    ("tekst piosenki", "Zna cały tekst piosenki po angielsku na pamięć."),
    # 56 (1306)
    ("chór", "Chór kościelny ćwiczy co tydzień przed uroczystym koncertem bożonarodzeniowym."),
    # 57 (1307)
    ("buty do biegania", "Dobre buty do biegania amortyzują każdy krok podczas joggingu po asfalcie."),
    # 58 (1308)
    ("bidon", "Podczas uprawiania sportu mam zawsze pod ręką napełniony bidon."),
    # 59 (1309)
    ("siłownia", "Trzy razy w tygodniu trenuje na urządzeniach na siłowni."),
    # 60 (1310)
    ("mata do ćwiczeń", "Rozwija antypoślizgową matę do ćwiczeń do jogi."),
    # 61 (1311)
    ("pompka", "Dziesięć dokładnych pompek należy do jego porannego treningu obwodowego."),
    # 62 (1312)
    ("skakanie na skakance", "Skakanie na skakance to doskonałe ćwiczenie na koordynację i kondycję."),
    # 63 (1313)
    ("maraton", "Miesiącami sumiennie przygotowywał się na swój pierwszy maraton."),
    # 64 (1314)
    ("boisko piłkarskie", "Młodzież spotyka się po szkole na boisku piłkarskim."),
    # 65 (1315)
    ("gol", "W ostatniej minucie gry napastniczka strzeliła decydującego gola."),
    # 66 (1316)
    ("sędzia", "Bezstronny sędzia punktualnie zagwizdał na rozpoczęcie czystego meczu."),
    # 67 (1317)
    ("przerwa meczowa", "W trakcie piętnastominutowej przerwy meczowej zawodnicy omawiają taktykę."),
    # 68 (1318)
    ("kosz do koszykówki", "Celnym rzutem trafił piłką prosto w kosz do koszykówki."),
    # 69 (1319)
    ("rakieta tenisowa", "Przed wielkim turniejem na nowo naciąga swoją rakietę tenisową."),
    # 70 (1320)
    ("stół do tenisa stołowego", "W ogrodzie stoi odporny na warunki atmosferyczne betonowy stół do tenisa stołowego."),
    # 71 (1321)
    ("turniej", "W regionalnym turnieju sportowym bierze udział ponad dwadzieścia drużyn."),
    # 72 (1322)
    ("basen", "Na krytym basenie pływa w każdy wtorkowy poranek dwadzieścia długości."),
    # 73 (1323)
    ("okulary pływackie", "Szczelnie dopasowane okulary pływackie chronią oczy przed chlorowaną wodą."),
    # 74 (1324)
    ("wieża do skoków", "Odważna dziewczynka skoczyła do basenu z trzymetrowej wieży do skoków."),
    # 75 (1325)
    ("żaglówka", "Z postawionymi żaglami mała żaglówka sunie po jeziorze."),
    # 76 (1326)
    ("kamizelka ratunkowa", "Na otwartej wodzie noszenie kamizelki ratunkowej jest obowiązkowe."),
    # 77 (1327)
    ("wiosło", "Równomiernymi ruchami zanurza wiosło w spokojnej wodzie."),
    # 78 (1328)
    ("szlak turystyczny", "Oznakowany szlak turystyczny prowadzi przez cieniste lasy na górę."),
    # 79 (1329)
    ("urząd miasta", "Wniosek o nowy dowód składa się osobiście w urzędzie miasta."),
    # 80 (1330)
    ("dowód osobisty", "Dowód osobisty jest ważny w kraju przez dziesięć lat."),
    # 81 (1331)
    ("akt urodzenia", "Do wielu wniosków urzędowych potrzebny jest oficjalny akt urodzenia."),
    # 82 (1332)
    ("zaświadczenie o zameldowaniu", "Po przeprowadzce otrzymuje się w urzędzie meldunkowym zaświadczenie o zameldowaniu."),
    # 83 (1333)
    ("formularz", "Proszę wypełnić ten urzędowy formularz drukowanymi literami."),
    # 84 (1334)
    ("podpis", "Proszę złożyć swój własnoręczny podpis na dole na linii."),
    # 85 (1335)
    ("pieczęć", "Oficjalna pieczęć potwierdza autentyczność pisma."),
    # 86 (1336)
    ("poświadczenie urzędowe", "Świadectwa na uniwersytet często wymagają poświadczenia urzędowego."),
    # 87 (1337)
    ("przepis", "Wszyscy pracownicy muszą ściśle przestrzegać obowiązujących przepisów bezpieczeństwa."),
    # 88 (1338)
    ("zezwolenie", "Bez pisemnego zezwolenia urzędu nie wolno tutaj budować."),
    # 89 (1339)
    ("zakaz", "W całym budynku obowiązuje bezwzględny zakaz palenia."),
    # 90 (1340)
    ("kara", "Kierowcy parkujący niezgodnie z przepisami muszą liczyć się z dotkliwą karą pieniężną."),
    # 91 (1341)
    ("biuro rzeczy znalezionych", "Zgubione klucze uczciwi znalazcy często oddają do biura rzeczy znalezionych."),
    # 92 (1342)
    ("komisariat policji", "Złożył na miejscowym komisariacie policji zawiadomienie o przestępstwie."),
    # 93 (1343)
    ("świadek", "Policja przesłuchała kilku świadków w sprawie przebiegu wypadku."),
    # 94 (1344)
    ("wybory", "Co cztery lata odbywają się demokratyczne wybory do parlamentu."),
    # 95 (1345)
    ("karta do głosowania", "Proszę postawić swój krzyżyk na karcie do głosowania w sposób niewidoczny dla innych."),
    # 96 (1346)
    ("urna wyborcza", "Złożoną kartę do głosowania wrzuca się do zapieczętowanej urny wyborczej."),
    # 97 (1347)
    ("ustawa zasadnicza", "Ustawa zasadnicza gwarantuje nienaruszalne prawa człowieka wszystkim obywatelom."),
    # 98 (1348)
    ("wolność słowa", "Wolność słowa jest głównym filarem demokracji."),
    # 99 (1349)
    ("partycypacja obywatelska", "Dzięki partycypacji obywatelskiej mieszkańcy mogą aktywnie współkształtować swoje miasto."),
    # 100 (1350)
    ("równouprawnienie", "Równouprawnienie wszystkich płci jest mocno zakorzenione w prawie."),
    # 101 (1351)
    ("wolontariat", "Wielu ludzi angażuje się w wolnym czasie w wolontariat."),
    # 102 (1352)
    ("sylwester", "W sylwestra wznosimy o północy toast za nowy rok."),
    # 103 (1353)
    ("fajerwerki", "Kolorowe fajerwerki rozświetlają nocne niebo."),
    # 104 (1354)
    ("Nowy Rok", "W Nowy Rok sąsiedzi i przyjaciele życzą sobie nawzajem dużo szczęścia."),
    # 105 (1355)
    ("święta Bożego Narodzenia", "Święta Bożego Narodzenia rodzina tradycyjnie spędza wspólnie w domu."),
    # 106 (1356)
    ("Wigilia", "W Wigilię pod ubraną choinką rozpakowuje się prezenty."),
    # 107 (1357)
    ("papier do pakowania prezentów", "Kolorowy papier do pakowania prezentów i kokardki zdobią paczuszki."),
    # 108 (1358)
    ("kartka z życzeniami", "Na kartce z życzeniami napisała kilka osobistych słów."),
    # 109 (1359)
    ("tort urodzinowy", "Na torcie urodzinowym płoną kolorowe świeczki do zdmuchnięcia."),
    # 110 (1360)
    ("impreza niespodzianka", "Przyjaciele zorganizowali dla niego potajemnie wspaniałą imprezę niespodziankę."),
    # 111 (1361)
    ("balon", "Kolorowe balony zdobią salę balową na przyjęcie dla dzieci."),
    # 112 (1362)
    ("zaproszenie", "Dwa tygodnie przed uroczystością rozesłał zaproszenia."),
    # 113 (1363)
    ("wznosić toast", "Wznosimy toast chłodnym napojem za pomyślność solenizanta."),
    # 114 (1364)
    ("gość honorowy", "Burmistrz został serdecznie powitany jako gość honorowy."),
    # 115 (1365)
    ("mowa okolicznościowa", "W swojej mowie okolicznościowej prezes stowarzyszenia spojrzał wstecz na odniesione sukcesy."),
    # 116 (1366)
    ("gratulować", "Wszyscy koledzy serdecznie gratulują mu okrągłego jubileuszu."),
    # 117 (1367)
    ("teraźniejszość", "Skoncentruj się na zadaniach stojących przed tobą w teraźniejszości."),
    # 118 (1368)
    ("przeszłość", "Z błędów przeszłości można się wiele nauczyć na przyszłość."),
    # 119 (1369)
    ("przyszłość", "Z nadzieją i pracowitością młoda rodzina patrzy w przyszłość."),
    # 120 (1370)
    ("przedział czasu", "W krótkim przedziale czasu zaledwie kilku dni wszystko się zmieniło."),
    # 121 (1371)
    ("okres czasu", "W dłuższym okresie czasu widoczna była wyraźna poprawa."),
    # 122 (1372)
    ("chwila", "Na krótką chwilę wszyscy w pomieszczeniu wstrzymali oddech."),
    # 123 (1373)
    ("wieczność", "Oczekiwanie na opóźnionym peronie wydawało mu się wiecznością."),
    # 124 (1374)
    ("od czasu do czasu", "Od czasu do czasu pozwala sobie po jedzeniu na kawałek ciemnej czekolady."),
    # 125 (1375)
    ("regularnie", "Kto regularnie powtarza słówka, osiąga szybkie sukcesy w nauce."),
    # 126 (1376)
    ("stale", "Jej rozumienie języka w ostatnich miesiącach stale się poprawiało."),
    # 127 (1377)
    ("bez przerwy", "Od wczesnego ranka na zewnątrz pada deszcz bez przerwy."),
    # 128 (1378)
    ("w międzyczasie", "W międzyczasie mówi już płynnie i bez długiego namysłu."),
    # 129 (1379)
    ("wkrótce", "Nowa wersja aplikacji do nauki ukaże się wkrótce w sklepie."),
    # 130 (1380)
    ("w swoim czasie", "W swoim czasie rzemieślnicy wznieśli ratusz bez nowoczesnych maszyn."),
    # 131 (1381)
    ("do tej pory", "Do tej pory wszystkie testy i sprawdziany przebiegły całkowicie bezbłędnie."),
    # 132 (1382)
    ("okolica", "W najbliższej okolicy hotelu znajdują się wspaniałe szlaki wędrowne."),
    # 133 (1383)
    ("odległość", "Odległość między dwoma miastami wynosi około pięćdziesięciu kilometrów."),
    # 134 (1384)
    ("międzyczas", "W międzyczasie możemy już nakryć do stołu na obiad."),
    # 135 (1385)
    ("naprzeciwko", "Apteka leży bezpośrednio naprzeciwko głównego wejścia na dworzec."),
    # 136 (1386)
    ("obok", "W mieszkaniu obok mieszka bardzo życzliwa rodzina."),
    # 137 (1387)
    ("w samym środku", "W samym środku starówki stoi najstarsza studnia w mieście."),
    # 138 (1388)
    ("poza", "Strefa przemysłowa leży nieco poza terenem zabudowanym."),
    # 139 (1389)
    ("z jednej strony", "Z jednej strony chciałby podróżować, a z drugiej strony oszczędza na samochód."),
    # 140 (1390)
    ("z drugiej strony", "Z drugiej strony nowa posada daje znacznie lepsze szanse awansu."),
    # 141 (1391)
    ("wskutek tego", "Ulice były oblodzone, wskutek tego doszło do zatorów drogowych."),
    # 142 (1392)
    ("mimo to", "Lało jak z cebra, mimo to poszliśmy na długi spacer do lasu."),
    # 143 (1393)
    ("niemniej jednak", "Był bardzo zmęczony, niemniej jednak starannie dokończył rozdział."),
    # 144 (1394)
    ("ponadto", "Jedzenie smakowało znakomicie, a obsługa była ponadto niezwykle miła."),
    # 145 (1395)
    ("z tego powodu", "Uczyła się pilnie i z tego powodu zdała egzamin z łatwością."),
    # 146 (1396)
    ("bowiem", "Zostaję dzisiaj w domu, mam bowiem silny ból głowy."),
    # 147 (1397)
    ("zamiast tego", "Nie pojechaliśmy samochodem, lecz zamiast tego poszliśmy piechotą."),
    # 148 (1398)
    ("pod warunkiem", "Wędrujemy jutro pod warunkiem, że pogoda pozostanie sucha."),
    # 149 (1399)
    ("w tym czasie", "On smażył warzywa, podczas gdy w tym czasie ona czule nakrywała do stołu."),
    # 150 (1400)
    ("zarówno ... jak i", "Ona mówi zarówno płynnie po hiszpańsku, jak i biegle po angielsku."),
    # 151 (1401)
    ("ani ... ani", "Rano on nie pije ani kawy, ani czarnej herbaty."),
    # 152 (1402)
    ("im ... tym", "Im więcej się ćwiczy, tym łatwiej przychodzi swobodna rozmowa."),
    # 153 (1403)
    ("chociaż", "Chociaż panował sztorm, rybacy wypłynęli swoimi łodziami w morze."),
    # 154 (1404)
    ("wziąć się do pracy", "Gdy wszyscy wezmą się do pracy, ciężka robota zostanie wykonana w mgnieniu oka."),
    # 155 (1405)
    ("załatwić", "Muszę dziś przed południem załatwić jeszcze ważne zakupy."),
    # 156 (1406)
    ("przygotować", "Ona gruntownie przygotowuje prezentację na jutrzejsze spotkanie."),
    # 157 (1407)
    ("sprzątać", "W soboty dzieci wspólnie sprzątają swoje pokoje."),
    # 158 (1408)
    ("wyrzucać", "Starych baterii nie wolno po prostu wyrzucać do domowych śmieci."),
    # 159 (1409)
    ("zatrzymać", "Tę piękną pamiątkę chciałbym zatrzymać na całe życie."),
    # 160 (1410)
    ("rozdawać", "Książki, które już przeczytała, chętnie rozdaje przyjaciołom."),
    # 161 (1411)
    ("organizować", "On organizuje coroczne letnie święto naszego klubu sportowego."),
    # 162 (1412)
    ("zauważyć", "Dopiero późno zauważył, że zapomniał klucza od domu."),
    # 163 (1413)
    ("pojąć", "Po obrazowym wyjaśnieniu potrafił pojąć ten związek przyczynowy."),
    # 164 (1414)
    ("zastanawiać się", "Nad tą ważną ofertą muszę się najpierw w spokoju zastanowić."),
    # 165 (1415)
    ("stwierdzić", "Kontrolerzy stwierdzili, że wszystkie kryteria bezpieczeństwa zostały spełnione."),
    # 166 (1416)
    ("przypuszczać", "Eksperci przypuszczają, że ceny wkrótce znowu spadną."),
    # 167 (1417)
    ("wątpić", "Mocno wątpię, czy ten stary plan dzisiaj jeszcze działa."),
    # 168 (1418)
    ("oceniać", "Z oddali tę trudną sytuację można oceniać tylko z wielkim trudem."),
    # 169 (1419)
    ("uzasadnić", "Czy może Pan uzasadnić swoje stanowisko konkretnymi przykładami?"),
    # 170 (1420)
    ("potwierdzić", "Linia lotnicza potwierdziła rezerwację w wiadomości automatycznej."),
    # 171 (1421)
    ("uzgadniać", "Uzgodniliśmy nowy termin na nadchodzący tydzień."),
    # 172 (1422)
    ("proponować", "Zaproponował, by przesunąć naradę o pół godziny."),
    # 173 (1423)
    ("poruszyć temat", "Ona odważnie poruszyła ten ważny temat podczas posiedzenia."),
    # 174 (1424)
    ("podsumować", "Rzecznik krótko podsumował najważniejsze kluczowe wnioski."),
    # 175 (1425)
    ("relacjonować", "Korespondentka relacjonuje na żywo bieżące wydarzenia."),
    # 176 (1426)
    ("powiadomić", "Proszę niezwłocznie powiadomić nas o swoim nowym adresie."),
    # 177 (1427)
    ("poprawić", "Dzięki codziennym treningom zdołał poprawić swój rekordowy czas biegu."),
    # 178 (1428)
    ("pogarszać się", "Przy nagłym deszczu warunki widoczności szybko się pogarszają."),
    # 179 (1429)
    ("rosnąć", "W ostatnich latach zainteresowanie zdrowym odżywianiem zaczęło rosnąć."),
    # 180 (1430)
    ("schudnąć", "Dzięki większej ilości ruchu i mniejszej ilości cukru zdołał zdrowo schudnąć."),
    # 181 (1431)
    ("opracowywać", "Zespół inżynierów opracowuje nowatorski, oszczędny napęd."),
    # 182 (1432)
    ("powstawać", "Na wolnej łące powstaje nowoczesne przedszkole."),
    # 183 (1433)
    ("znikać", "Gęste opary mgły znikają, jak tylko zaświeci słońce."),
    # 184 (1434)
    ("przechodzić przez", "Piesi powinni przechodzić przez ulicę tylko na wyznaczonych przejściach."),
    # 185 (1435)
    ("przybywać", "Punktualny pociąg ma przybyć zgodnie z planem o czternastej."),
    # 186 (1436)
    ("skręcać", "Na skrzyżowaniu ze światłami musi Pan skręcić w lewo w deptak."),
    # 187 (1437)
    ("przyspieszać", "Na wjeździe samochód sprawnie przyspiesza do prędkości autostradowej."),
    # 188 (1438)
    ("hamować", "Przed ostrym zakrętem kierowca w porę hamuje."),
    # 189 (1439)
    ("zatrzymywać się", "Przed znakiem stopu każdy pojazd musi zatrzymać się na trzy sekundy."),
    # 190 (1440)
    ("przejeżdżać obok", "Pociąg ekspresowy przejeżdża obok małej stacji bez zatrzymywania się."),
    # 191 (1441)
    ("zawrócić", "Z powodu nagłej burzy śnieżnej alpiniści musieli zawrócić."),
    # 192 (1442)
    ("uspokoić", "Matka potrafiła łagodnym głosem szybko uspokoić płaczące dziecko."),
    # 193 (1443)
    ("niepokoić", "Ciemne chmury burzowe na niebie niepokoiły wędrowców."),
    # 194 (1444)
    ("zaskoczyć", "Jego przyjaciele zaskoczyli go własnoręcznie upieczonym ciastem."),
    # 195 (1445)
    ("pocieszać", "Próbowała pocieszać swoją smutną przyjaciółkę czułymi słowami."),
    # 196 (1446)
    ("podziwiać", "Turyści z całego świata podziwiają kunsztowną architekturę."),
    # 197 (1447)
    ("szanować", "Powinniśmy zawsze szanować odmienne opinie innych ludzi."),
    # 198 (1448)
    ("cenić", "Bardzo cenię twoją szczerą i bezpośrednią postawę."),
    # 199 (1449)
    ("znakomity", "Aktorka zaprezentowała pod każdym względem znakomity występ."),
    # 200 (1450)
    ("godny uwagi", "Jej szybka zdolność pojmowania jest naprawdę godna uwagi."),
    # 201 (1451)
    ("odpowiedni", "Cena w stosunku do oferowanej jakości jest całkowicie odpowiednia."),
    # 202 (1452)
    ("zbędny", "Długie czekanie przy okienku staje się zbędne dzięki rezerwacjom online."),
    # 203 (1453)
    ("istotny", "Dobre przygotowanie ma istotny wpływ na sukces całego przedsięwzięcia."),
    # 204 (1454)
    ("wystarczający", "W lodówce są jeszcze wystarczające zapasy na weekend."),
    # 205 (1455)
    ("cenny", "Jej praktyczne wskazówki były dla nas wszystkich niezwykle cenne."),
    # 206 (1456)
    ("skuteczny", "Regularne wietrzenie to skuteczny sposób walki z pleśnią."),
    # 207 (1457)
    ("zadbany", "Stary ogródek przed domem sprawia niezwykle zadbane wrażenie."),
    # 208 (1458)
    ("zabałaganiony", "Po popołudniu spędzonym na wycinankach pokój dziecięcy wyglądał na dość zabałaganiony."),
    # 209 (1459)
    ("przytulny", "Spędziliśmy przytulny wieczór przy ciepłym ogniu z kominka."),
    # 210 (1460)
    ("męczący", "Długa wędrówka po stromych kamienistych ścieżkach była niezwykle męcząca."),
    # 211 (1461)
    ("znośny", "Dzięki lekkiej bryzie od jeziora wysokie temperatury były znośne."),
    # 212 (1462)
    ("nienaganny", "Świeżo wyremontowana łazienka działa w sposób nienaganny."),
    # 213 (1463)
    ("nieskazitelny", "Świeżo wypolerowana powierzchnia lśni nieskazitelnie w świetle słońca."),
    # 214 (1464)
    ("szczery", "Podziękowała szczerymi słowami za okazałą pomoc."),
    # 215 (1465)
    ("taktowny", "W pełnym autobusie zachowuje się taktownie wobec starszych osób."),
    # 216 (1466)
    ("uważny", "Uważny kelner natychmiast spostrzegł, że szklanka jest pusta."),
    # 217 (1467)
    ("zdeterminowany", "Ze zdeterminowaną postawą sportsmenka osiągnęła swój sportowy cel."),
    # 218 (1468)
    ("samodzielnie", "Uczennica rozwiązała trudne zadanie zupełnie samodzielnie."),
    # 219 (1469)
    ("odpowiedzialny", "Odpowiedzialny kierowca zawsze zwraca uwagę na ograniczenie prędkości."),
    # 220 (1470)
    ("pokojowy", "Zgromadzenie przebiegło od początku do końca w sposób całkowicie pokojowy."),
    # 221 (1471)
    ("pomocny", "Nowy sąsiad zaoferował pomocną dłoń przy przeprowadzce."),
    # 222 (1472)
    ("nie ma za co", "„Dziękuję bardzo za pomoc!” – „Nie ma za co, z przyjemnością!”"),
    # 223 (1473)
    ("nie martw się", "Nie martw się, wszystko ułoży się pomyślnie."),
    # 224 (1474)
    ("do następnego razu", "To był piękny wieczór, do widzenia i do następnego razu!"),
    # 225 (1475)
    ("ogólnie rzecz biorąc", "Ogólnie rzecz biorąc, jesteśmy bardzo zadowoleni z rezultatu."),
    # 226 (1476)
    ("krok po kroku", "Języka obcego uczy się najlepiej cierpliwie krok po kroku."),
    # 227 (1477)
    ("w każdym razie", "Powinniśmy w każdym razie zwiedzić to urokliwe stare miasto."),
    # 228 (1478)
    ("w cztery oczy", "Chciałbym omówić tę poufną sprawę w cztery oczy."),
    # 229 (1479)
    ("wiza", "Na dłuższy pobyt potrzebowała oficjalnej wizy."),
    # 230 (1480)
    ("kontrola celna", "Na granicy funkcjonariusze przeprowadzają wyrywkową kontrolę celną."),
    # 231 (1481)
    ("przepisy wjazdowe", "Przed wyjazdem warto sprawdzić aktualne przepisy wjazdowe."),
    # 232 (1482)
    ("konsulat", "W razie zgubienia paszportu za granicą pomaga właściwy konsulat."),
    # 233 (1483)
    ("funkcjonariusz straży granicznej", "Uprzejmy funkcjonariusz straży granicznej starannie podstemplował paszport."),
    # 234 (1484)
    ("kontrola graniczna", "Z powodu kontroli granicznej utworzył się krótki sznur samochodów."),
    # 235 (1485)
    ("zezwolenie na pobyt", "Zezwolenie na pobyt zostało przedłużone o kolejne dwa lata."),
    # 236 (1486)
    ("ubezpieczenie zdrowotne za granicą", "Ubezpieczenie zdrowotne za granicą chroni przed nieprzewidzianymi kosztami leczenia."),
    # 237 (1487)
    ("nagłówek", "Wielki nagłówek na pierwszej stronie wywołał wielkie poruszenie."),
    # 238 (1488)
    ("konferencja prasowa", "Na konferencji prasowej dziennikarze zadawali wiele krytycznych pytań."),
    # 239 (1489)
    ("artykuł wstępny", "Redaktor naczelny napisał skłaniający do refleksji artykuł wstępny."),
    # 240 (1490)
    ("relacja medialna", "Obiektywna relacja medialna przedstawiła rzetelne tło wydarzeń."),
    # 241 (1491)
    ("wydanie specjalne", "Ze względu na aktualne wydarzenia stacja przerwała program na wydanie specjalne."),
    # 242 (1492)
    ("program radiowy", "W programie radiowym po południu nadawane są koncerty klasyczne."),
    # 243 (1493)
    ("agencja prasowa", "Renomowana agencja prasowa rozpowszechniła pilną wiadomość na cały świat."),
    # 244 (1494)
    ("pomoc sąsiedzka", "Sprawnie działająca pomoc sąsiedzka ułatwia starszym mieszkańcom codzienność."),
    # 245 (1495)
    ("dzielnica mieszkaniowa", "Nasza spokojna dzielnica mieszkaniowa leży blisko parków i szkół."),
    # 246 (1496)
    ("plac zabaw", "Na placu zabaw po południu bawi się wiele wesołych dzieci."),
    # 247 (1497)
    ("klatka schodowa", "Klatka schodowa jest co tydzień sprzątana na zmianę przez lokatorów."),
    # 248 (1498)
    ("regulamin domowy", "Regulamin domowy ustala godziny ciszy w porze południowej i nocnej."),
    # 249 (1499)
    ("dozorca", "Pomocny dozorca troszczy się o drobne naprawy w budynku.")
]

def main():
    with open("scripts/ref_pl_batch6.json", "r", encoding="utf-8") as f:
        ref_items = json.load(f)

    if len(ref_items) != 250:
        raise ValueError(f"Expected 250 items in ref_pl_batch6.json, found {len(ref_items)}")
    if len(BATCH6_ENTRIES) != 250:
        raise ValueError(f"Expected 250 entries in BATCH6_ENTRIES, found {len(BATCH6_ENTRIES)}")

    output_cards = []
    for idx, (ref, (back, example)) in enumerate(zip(ref_items, BATCH6_ENTRIES)):
        front = ref["front"]
        exampleDE = ref["exampleDE"]
        
        # Calculate IPA
        ipa = polish_ipa(back)
        
        # Clean IPA slashes if any
        if ipa.startswith("/") and ipa.endswith("/"):
            ipa = ipa[1:-1].strip()

        card = {
            "front": front,
            "back": back,
            "ipa": ipa,
            "example": example,
            "exampleDE": exampleDE
        }
        output_cards.append(card)

    out_file = "scripts/data_pl_batch6.json"
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(output_cards, f, ensure_ascii=False, indent=2)

    print(f"Successfully wrote {len(output_cards)} cards to {out_file}")

if __name__ == "__main__":
    main()
