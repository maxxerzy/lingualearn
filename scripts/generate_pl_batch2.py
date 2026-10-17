# -*- coding: utf-8 -*-
"""
Generate scripts/data_pl_batch2.json (cards 250 to 499)
"""
import json
import os
import sys

sys.path.append(os.path.dirname(__file__))
from polish_ipa import polish_ipa

# Raw card entries: (back, example, ipa_override)
# Exactly 250 entries corresponding to ref_pl_batch2.json items 0..249
BATCH2_ITEMS = [
    # 0 (250) Stern
    ("gwiazda", "Nocą na niebie widać wiele gwiazd.", None),
    # 1 (251) Himmel
    ("niebo", "Niebo jest dziś błękitne bez ani jednej chmury.", None),
    # 2 (252) Wolke
    ("chmura", "Białe chmury płyną po błękitnym niebie.", None),
    # 3 (253) Erde
    ("ziemia", "Ziemia jest mokra po ulewnym deszczu.", None),
    # 4 (254) Stein
    ("kamień", "Dzieci rzucają kamienie do spokojnego jeziora.", None),
    # 5 (255) Natur
    ("natura", "Chętnie spaceruję na łonie natury.", None),
    # 6 (256) Ozean
    ("ocean", "Ocean kryje w sobie wiele tajemnic.", None),
    # 7 (257) Wüste
    ("pustynia", "Na pustyni jest bardzo mało wody.", None),
    # 8 (258) Dschungel
    ("dżungla", "W dżungli żyje wiele zwierząt.", None),
    # 9 (259) Küste
    ("wybrzeże", "Odpoczywaliśmy na wybrzeżu morza.", None),
    # 10 (260) Gebirge
    ("góry", "Latem wyjeżdżamy w góry.", None),
    # 11 (261) Tal
    ("dolina", "W dolinie płynęła rzeka.", None),
    # 12 (262) Höhle
    ("jaskinia", "W jaskini było ciemno i zimno.", None),
    # 13 (263) See (Gewässer)
    ("jezioro", "Dzieci kąpały się w jeziorze.", None),
    # 14 (264) Landschaft
    ("krajobraz", "Z okna rozciągał się piękny krajobraz.", None),
    # 15 (265) Sand
    ("piasek", "Dzieci bawiły się w piasku.", None),
    # 16 (266) Fels
    ("skała", "Statek rozbił się o skałę.", None),
    # 17 (267) Ast
    ("gałąź", "Ptak usiadł na gałęzi.", None),
    # 18 (268) Wurzel
    ("korzeń", "Korzeń drzewa sięga głęboko w ziemię.", None),
    # 19 (269) Blatt
    ("liść", "Jesienią liść spada z drzewa.", None),
    # 20 (270) Regen
    ("deszcz", "Deszcz pada przez cały poranek bez przerwy.", None),
    # 21 (271) Schnee
    ("śnieg", "Pierwszy śnieg spadł na początku listopada.", None),
    # 22 (272) Wind
    ("wiatr", "Silny wiatr zrywał liście z drzew.", None),
    # 23 (273) Gewitter
    ("burza", "W nocy nad miastem przeszła gwałtowna burza.", None),
    # 24 (274) Nebel
    ("mgła", "Rano nad rzeką unosiła się gęsta mgła.", None),
    # 25 (275) Frost
    ("mróz", "Na noc zapowiadany jest silny mróz.", None),
    # 26 (276) Hitze
    ("upał", "W lipcu w mieście panował straszny upał.", None),
    # 27 (277) Regenbogen
    ("tęcza", "Po deszczu nad polem pojawiła się tęcza.", None),
    # 28 (278) Temperatur
    ("temperatura", "Dzisiaj temperatura spada poniżej zera.", None),
    # 29 (279) Klima
    ("klimat", "Klimat na południu jest ciepły.", None),
    # 30 (280) Feuer
    ("ogień", "Ogień z ogniska ogrzewa nas w chłodną noc.", None),
    # 31 (281) Umwelt
    ("środowisko", "Musimy chronić środowisko.", None),
    # 32 (282) Energie
    ("energia", "Słońce daje nam energię.", None),
    # 33 (283) Erdbeben
    ("trzęsienie ziemi", "Trzęsienie ziemi zniszczyło miasto.", None),
    # 34 (284) Vulkan
    ("wulkan", "Wulkan zaczął wybuchać.", None),
    # 35 (285) Wasserfall
    ("wodospad", "Wodospad szumiał w oddali.", None),
    # 36 (286) Verschmutzung
    ("zanieczyszczenie", "Zanieczyszczenie powietrza jest ogromnym problemem.", None),
    # 37 (287) Überschwemmung
    ("powódź", "Powódź zalała domy.", None),
    # 38 (288) Ernte
    ("zbiory", "W tym roku zbiory były bardzo obfite.", None),
    # 39 (289) Montag
    ("poniedziałek", "W poniedziałek mamy pierwszą lekcję.", None),
    # 40 (290) Dienstag
    ("wtorek", "We wtorek idę na zakupy.", None),
    # 41 (291) Mittwoch
    ("środa", "W środę odbędzie się spotkanie w pracy.", None),
    # 42 (292) Donnerstag
    ("czwartek", "W czwartek mamy egzamin z matematyki.", None),
    # 43 (293) Freitag
    ("piątek", "W piątek idziemy do kina.", None),
    # 44 (294) Samstag
    ("sobota", "W sobotę sprzątam mieszkanie.", None),
    # 45 (295) Sonntag
    ("niedziela", "W niedzielę cała rodzina jest w domu.", None),
    # 46 (296) Januar
    ("styczeń", "W styczniu jest bardzo zimno i leży dużo śniegu.", None),
    # 47 (297) Februar
    ("luty", "Luty to najkrótszy miesiąc w roku.", None),
    # 48 (298) März
    ("marzec", "W marcu śnieg zaczyna topnieć.", None),
    # 49 (299) April
    ("kwiecień", "W kwietniu kwitną pierwsze kwiaty.", None),

    # 50 (300) Mai
    ("maj", "W maju świętujemy Dzień Zwycięstwa.", None),
    # 51 (301) Juni
    ("czerwiec", "W czerwcu dzieci idą na wakacje.", None),
    # 52 (302) Juli
    ("lipiec", "Lipiec jest najgorętszym miesiącem lata.", None),
    # 53 (303) August
    ("sierpień", "W sierpniu jedziemy nad morze.", None),
    # 54 (304) September
    ("wrzesień", "We wrześniu dzieci wracają do szkoły.", None),
    # 55 (305) Oktober
    ("październik", "W październiku liście stają się żółte.", None),
    # 56 (306) November
    ("listopad", "W listopadzie często pada deszcz.", None),
    # 57 (307) Dezember
    ("grudzień", "W grudniu przygotowujemy się do Nowego Roku.", None),
    # 58 (308) früh
    ("wczesny", "Wczesne wstawanie pomaga zrobić wiele w ciągu jednego dnia.", None),
    # 59 (309) spät
    ("późny", "Późny przyjazd gości zaskoczył całą rodzinę.", None),
    # 60 (310) heute
    ("dzisiaj", "Dzisiaj pogoda jest bardzo dobra na spacer.", None),
    # 61 (311) morgen
    ("jutro", "Jutro mamy ważne spotkanie z klientami.", None),
    # 62 (312) gestern
    ("wczoraj", "Wczoraj poszliśmy z całą rodziną do teatru.", None),
    # 63 (313) jetzt
    ("teraz", "Teraz nie jest najlepszy czas na poważną rozmowę.", None),
    # 64 (314) später
    ("później", "Zadzwoń do mnie później, jestem teraz bardzo zajęty.", None),
    # 65 (315) früher
    ("wcześniej", "Wcześniej w tym miejscu znajdował się piękny park.", None),
    # 66 (316) bald
    ("wkrótce", "Wkrótce przyjdzie lato i pojedziemy na urlop.", None),
    # 67 (317) Zeit
    ("czas", "Nie mamy czasu czekać dłużej niż godzinę.", None),
    # 68 (318) Stunde
    ("godzina", "Spotkanie trwało ponad dwie godziny.", None),
    # 69 (319) Minute
    ("minuta", "Poczekaj minutę, zaraz będę gotowy.", None),
    # 70 (320) Sekunde
    ("sekunda", "Jedna sekunda może zmienić całe twoje życie.", None),
    # 71 (321) Tag
    ("dzień", "Każdy nowy dzień przynosi nowe możliwości.", None),
    # 72 (322) Woche
    ("tydzień", "W przyszłym tygodniu mamy wakacje.", None),
    # 73 (323) Monat
    ("miesiąc", "W tym miesiącu bardzo dużo pracowałem.", None),
    # 74 (324) Jahr
    ("rok", "W tym roku przeprowadziliśmy się do nowego mieszkania.", None),
    # 75 (325) Jahrhundert
    ("wiek", "W ubiegłym wieku wydarzyło się wiele ważnych rzeczy.", None),
    # 76 (326) Termin
    ("termin", "O trzeciej mam wyznaczony termin u lekarza.", None),
    # 77 (327) Zukunft
    ("przyszłość", "Nikt nie zna swojej przyszłości.", None),
    # 78 (328) Vergangenheit
    ("przeszłość", "Nie powinno się żyć przeszłością.", None),
    # 79 (329) Gegenwart
    ("teraźniejszość", "Żyj teraźniejszością, a nie marzeniami.", None),
    # 80 (330) Jahrzehnt
    ("dekada", "W ostatniej dekadzie bardzo wiele się zmieniło.", None),
    # 81 (331) Augenblick
    ("chwila", "Poczekaj jedną chwilę.", None),
    # 82 (332) Zeitpunkt
    ("moment", "Dokładnie w tym momencie zadzwonił telefon.", None),
    # 83 (333) Datum
    ("data", "Jaka jest dzisiejsza data?", None),
    # 84 (334) Feiertag
    ("święto", "Jutro przypada święto państwowe.", None),
    # 85 (335) Wochenende
    ("weekend", "W ten weekend jedziemy na wieś.", "ˈvikɛnt"),
    # 86 (336) Zeitalter
    ("epoka", "Wtedy rozpoczęła się nowa epoka.", None),
    # 87 (337) Frist
    ("termin", "Ostateczny termin oddania pracy upływa jutro.", None),
    # 88 (338) Auto
    ("samochód", "Jego samochód stoi przed domem.", None),
    # 89 (339) Bus
    ("autobus", "Autobus przyjeżdża co dziesięć minut.", None),
    # 90 (340) Zug
    ("pociąg", "Pociąg odjeżdża z pierwszego toru.", None),
    # 91 (341) Flugzeug
    ("samolot", "Samolot leci wysoko ponad chmurami.", None),
    # 92 (342) Schiff
    ("statek", "Wielki statek płynie po morzu.", None),
    # 93 (343) Fahrrad
    ("rower", "Latem on dojeżdża rowerem do pracy.", None),
    # 94 (344) Motorrad
    ("motocykl", "Wiosną kupił sobie nowy motocykl.", None),
    # 95 (345) Taxi
    ("taksówka", "Zamów taksówkę, bo inaczej spóźnimy się na samolot.", None),
    # 96 (346) U-Bahn
    ("metro", "W Moskwie działa bardzo wygodne i piękne metro.", None),
    # 97 (347) Straße
    ("ulica", "Przy tej ulicy znajduje się wiele pięknych sklepów.", None),
    # 98 (348) Bahnhof
    ("dworzec", "Spotkamy się na dworcu głównym.", None),
    # 99 (349) Flughafen
    ("lotnisko", "Lotnisko leży daleko od centrum miasta.", None),

    # 100 (350) Urlaub
    ("urlop", "W lipcu wyjeżdżam na urlop nad morze.", None),
    # 101 (351) Ampel
    ("sygnalizacja świetlna", "Przy sygnalizacji świetlnej trzeba przejść na drugą stronę.", None),
    # 102 (352) Kreuzung
    ("skrzyżowanie", "Na tym skrzyżowaniu zawsze stoi dużo samochodów.", None),
    # 103 (353) Brücke
    ("most", "Ten stary most łączy dwie części miasta.", None),
    # 104 (354) Gepäck
    ("bagaż", "Nasz bagaż jest już w samochodzie.", None),
    # 105 (355) Pass
    ("paszport", "Nie zapomnij zabrać paszportu na lotnisko.", None),
    # 106 (356) Grenze
    ("granica", "Przekroczyliśmy granicę wcześnie rano.", None),
    # 107 (357) Ticket
    ("bilet", "Kupiłem bilet na wieczorny pociąg.", None),
    # 108 (358) Verspätung
    ("opóźnienie", "Pociąg dotarł z godzinnym opóźnieniem.", None),
    # 109 (359) Koffer
    ("walizka", "Moja walizka jest zbyt ciężka na tę półkę.", None),
    # 110 (360) Reise
    ("podróż", "To była niezapomniana podróż przez Rosję.", None),
    # 111 (361) Tourist
    ("turysta", "W okresie letnim w mieście pojawia się wielu turystów.", None),
    # 112 (362) Abfahrt
    ("odjazd", "Odjazd pociągu opóźni się o dziesięć minut.", None),
    # 113 (363) Schule
    ("szkoła", "Szkoła rozpoczyna się o ósmej rano.", None),
    # 114 (364) Büro
    ("biuro", "On pracuje w wielkim biurze w samym centrum miasta.", None),
    # 115 (365) Ecke
    ("róg", "Kawiarnia mieści się tuż za rogiem tego budynku.", None),
    # 116 (366) Platz
    ("plac", "Na głównym placu miasta wznosi się stary kościół.", None),
    # 117 (367) Kirche
    ("kościół", "Ten kościół wybudowano dwieście lat temu.", None),
    # 118 (368) Markt
    ("targ", "W każdą sobotę kupujemy świeże warzywa na targu.", None),
    # 119 (369) Universität
    ("uniwersytet", "Ona pilnie studiuje na uniwersytecie.", None),
    # 120 (370) Geschäft
    ("sklep", "Otworzył swój własny sklep.", None),
    # 121 (371) Bank
    ("bank", "Idę prosto do banku, żeby wybrać pieniądze.", None),
    # 122 (372) Ausstellung
    ("wystawa", "W miejskiej galerii otwarto nową wystawę.", None),
    # 123 (373) Lehrer
    ("nauczyciel", "Nasz nauczyciel tłumaczy materiał w bardzo prosty sposób.", None),
    # 124 (374) Schüler
    ("uczeń", "Każdy uczeń zdał ten trudny egzamin z najlepszą oceną.", None),
    # 125 (375) Buch
    ("książka", "Ta książka jest niezwykle ciekawa i pouczająca.", None),
    # 126 (376) Heft
    ("zeszyt", "Wyjmij zeszyt i zapisz zadanie domowe.", None),
    # 127 (377) Stift
    ("długopis", "Podaj mi długopis, bo muszę zapisać ten adres.", None),
    # 128 (378) Tafel
    ("tablica", "Nauczyciel zapisuje zadanie kredą na tablicy.", None),
    # 129 (379) Klasse
    ("klasa", "Do naszej klasy chodzi trzydziestu uczniów.", None),
    # 130 (380) Hausaufgabe
    ("zadanie domowe", "Odrobiłem wszystkie zadania domowe na czas.", None),
    # 131 (381) Prüfung
    ("egzamin", "Jutro czeka nas ważny egzamin z fizyki.", None),
    # 132 (382) Papier
    ("papier", "Potrzebuję papieru do nowej drukarki.", None),
    # 133 (383) Vorlesung
    ("wykład", "Profesor prowadzi ciekawy wykład z historii.", None),
    # 134 (384) Note (Schule)
    ("ocena", "Otrzymał bardzo dobrą ocenę za swoje wypracowanie.", None),
    # 135 (385) Bildung
    ("wykształcenie", "Dobre wykształcenie otwiera wiele drzwi w życiu.", None),
    # 136 (386) Student
    ("student", "Student pilnie przygotowuje się do egzaminu.", None),
    # 137 (387) Professor
    ("profesor", "Profesor przystępnie wyjaśnił nam nowy temat.", None),
    # 138 (388) Kapitel
    ("rozdział", "Przeczytałem już cały pierwszy rozdział tej książki.", None),
    # 139 (389) Note (Musik)
    ("nuta", "On nie potrafi rozpoznać ani jednej nuty.", None),
    # 140 (390) Wirklichkeit
    ("rzeczywistość", "Jego najskrytsze marzenia stały się rzeczywistością.", None),
    # 141 (391) Wissenschaft
    ("nauka", "Współczesna nauka nieustannie popycha świat do przodu.", None),
    # 142 (392) Forschung
    ("badania", "To epokowe odkrycie jest wynikiem wieloletnich badań.", None),
    # 143 (393) Experiment
    ("eksperyment", "Naukowcy przeprowadzili skomplikowany eksperyment.", None),
    # 144 (394) Theorie
    ("teoria", "Ta naukowa teoria wyjaśnia wiele zjawisk.", None),
    # 145 (395) Beweis
    ("dowód", "Nie posiadamy żadnego dowodu na jego winę.", None),
    # 146 (396) Formel
    ("wzór", "Zapisał ten skomplikowany wzór na tablicy.", None),
    # 147 (397) Physik
    ("fizyka", "Fizyka to zdecydowanie mój ulubiony przedmiot.", None),
    # 148 (398) Chemie
    ("chemia", "Na lekcji chemii wykonywaliśmy ciekawe doświadczenia.", None),
    # 149 (399) Biologie
    ("biologia", "Biologia zajmuje się badaniem organizmów żywych.", None),

    # 150 (400) Mathematik
    ("matematyka", "Matematyka wymaga przede wszystkim logicznego myślenia.", None),
    # 151 (401) Geographie
    ("geografia", "Na lekcji geografii uczyliśmy się posługiwania mapami.", None),
    # 152 (402) Wissenschaftler
    ("naukowiec", "Ten wybitny naukowiec dokonał przełomowego odkrycia.", None),
    # 153 (403) Entdeckung
    ("odkrycie", "To niezwykłe odkrycie odmieniło całą medycynę.", None),
    # 154 (404) Erfindung
    ("wynalazek", "Koło to prawdopodobnie najstarszy wynalazek ludzkości.", None),
    # 155 (405) Zelle
    ("komórka", "Każdy żywy organizm składa się z komórek.", None),
    # 156 (406) Atom
    ("atom", "Pojedynczy atom składa się z drobnych cząstek.", None),
    # 157 (407) Schwerkraft
    ("grawitacja", "Grawitacja bezustannie przyciąga wszystkie przedmioty ku ziemi.", None),
    # 158 (408) malen
    ("malować", "Moja mała córka bardzo chętnie maluje różne zwierzęta.", None),
    # 159 (409) Vorstellung
    ("pojęcie", "Nie mam o tym nawet najmniejszego pojęcia.", None),
    # 160 (410) Gemälde
    ("obraz", "W zabytkowym muzeum wisi stary obraz.", None),
    # 161 (411) Melodie
    ("melodia", "Ta wpadająca w ucho melodia brzmi dla mnie znajomo.", None),
    # 162 (412) Rhythmus
    ("rytm", "Miarowo wybijał rytm własną stopą.", None),
    # 163 (413) Bühne
    ("scena", "Znany aktor powoli wszedł na scenę.", None),
    # 164 (414) Publikum
    ("publiczność", "Zgromadzona publiczność głośno biła brawo.", None),
    # 165 (415) Künstler
    ("artysta", "Utalentowany artysta maluje piękny portret.", None),
    # 166 (416) Zeichnung
    ("rysunek", "Jej kolorowy rysunek wisi dumnie na ścianie.", None),
    # 167 (417) Skulptur
    ("rzeźba", "W miejskim parku stoi wielka rzeźba z białego marmuru.", None),
    # 168 (418) Orchester
    ("orkiestra", "Cała orkiestra zaczęła grać kolejny utwór.", None),
    # 169 (419) Sänger
    ("piosenkarz", "Popularny piosenkarz energicznie wszedł na scenę.", None),
    # 170 (420) Tänzer
    ("tancerz", "Młody tancerz poruszał się z niezwykłym wdziękiem.", None),
    # 171 (421) Schauspieler
    ("aktor", "Ten znany aktor znakomicie zagrał główną rolę.", None),
    # 172 (422) Roman
    ("powieść", "Ona właśnie pisze swoją pierwszą powieść.", None),
    # 173 (423) Pinsel
    ("pędzel", "Po skończonej pracy artysta dokładnie umył pędzel.", None),
    # 174 (424) Instrument
    ("instrument", "Na jakim instrumencie muzycznym grasz?", None),
    # 175 (425) Arbeit
    ("praca", "Jego codzienna praca wymaga mnóstwa czasu i energii.", None),
    # 176 (426) Chef
    ("szef", "Nasz szef jest bardzo zadowolony z osiągniętych wyników.", None),
    # 177 (427) Kollege
    ("kolega", "Mój zaufany kolega chętnie pomaga mi przy trudnych zadaniach.", None),
    # 178 (428) Gehalt
    ("pensja", "W tym miesiącu otrzymał zasłużoną podwyżkę pensji.", None),
    # 179 (429) Besprechung
    ("spotkanie", "Ważne spotkanie służbowe rozpocznie się o dziesiątej rano.", None),
    # 180 (430) Ingenieur
    ("inżynier", "Główny inżynier uważnie sprawdził projekt nowego mostu.", None),
    # 181 (431) Verkäufer
    ("sprzedawca", "Uprzejmy sprzedawca pomógł mi wybrać wspaniały prezent.", None),
    # 182 (432) Koch
    ("kucharz", "Kucharz tej restauracji przygotowuje wyborną zupę.", None),
    # 183 (433) Fahrer
    ("kierowca", "Kierowca autobusu wyraźnie zapowiedział kolejny przystanek.", None),
    # 184 (434) Polizist
    ("policjant", "Miejscowy policjant uprzejmie wskazał nam drogę na dworzec.", None),
    # 185 (435) Feuerwehrmann
    ("strażak", "Dzielny strażak błyskawicznie ugasił ogień w płonącym budynku.", None),
    # 186 (436) Anwalt
    ("prawnik", "Nasz prawnik przygotował wszelkie dokumenty na rozprawę sądową.", None),
    # 187 (437) Friseur
    ("fryzjer", "Doświadczony fryzjer wykonał dla niej zachwycającą fryzurę.", None),
    # 188 (438) Kellner
    ("kelner", "Uprzejmy kelner szybko podał nam gorącą zupę.", None),
    # 189 (439) fotografieren
    ("fotografować", "W wolnym czasie on bardzo lubi fotografować zabytkowe budynki.", None),
    # 190 (440) Aufgabe
    ("zadanie", "To konkretne zadanie okazuje się zbyt trudne.", None),
    # 191 (441) Firma
    ("firma", "Ona z powodzeniem pracuje w międzynarodowej firmie.", None),
    # 192 (442) Lohn
    ("wynagrodzenie", "Za swoją rzetelną pracę otrzymuje bardzo dobre wynagrodzenie.", None),
    # 193 (443) Arbeitslosigkeit
    ("bezrobocie", "Niestety bezrobocie w całym mieście wciąż rośnie.", None),
    # 194 (444) Unternehmen
    ("przedsiębiorstwo", "To nowoczesne przedsiębiorstwo zatrudnia setki pracowników.", None),
    # 195 (445) kaufen
    ("kupować", "Jutro rano idziemy wspólnie kupować nowe meble do salonu.", None),
    # 196 (446) verkaufen
    ("sprzedawać", "Postanowili sprzedawać swój stary dom i wyjechać za granicę.", None),
    # 197 (447) teuer
    ("drogi", "Ta elegancka restauracja jest zdecydowanie zbyt droga dla nas.", None),
    # 198 (448) reich
    ("bogaty", "Pewien niezwykle bogaty człowiek przekazał sporą sumę na szpital.", None),
    # 199 (449) billig
    ("tani", "Udało nam się znaleźć zaskakująco tani bilet na ten pociąg.", None),

    # 200 (450) Rechnung
    ("rachunek", "Czy mógłby pan przynieść rachunek, bo bardzo się spieszymy?", None),
    # 201 (451) Zoll
    ("cło", "Na cle funkcjonariusze szczegółowo skontrolowali nasze walizki.", None),
    # 202 (452) Vorteil
    ("zaleta", "Płynna znajomość języków obcych to niezaprzeczalna zaleta.", None),
    # 203 (453) Nachteil
    ("wada", "Niestety ten przygotowany plan ma jedną istotną wadę.", None),
    # 204 (454) kosten (probieren)
    ("próbować", "Spróbuj koniecznie tego pysznego sosu.", None),
    # 205 (455) Wirtschaft
    ("gospodarka", "Gospodarka całego kraju dynamicznie rośnie z roku na rok.", None),
    # 206 (456) Gewinn
    ("zysk", "W minionym kwartale firma wypracowała pokaźny zysk.", None),
    # 207 (457) Verlust
    ("strata", "Wskutek kryzysu firma poniosła bolesną stratę finansową.", None),
    # 208 (458) Steuer
    ("podatek", "Każdy obywatel musi regularnie płacić należny podatek.", None),
    # 209 (459) Kunde
    ("klient", "Zgodnie ze starą zasadą klient ma zawsze rację.", None),
    # 210 (460) Ware
    ("towar", "Ten luksusowy towar cieszy się niesłabnącą popularnością.", None),
    # 211 (461) Kredit
    ("kredyt", "Młode małżeństwo wzięło spory kredyt na zakup domu.", None),
    # 212 (462) Schulden
    ("dług", "Wreszcie po miesiącach oddał mi wszystkie zaciągnięte długi.", None),
    # 213 (463) Zins
    ("odsetki", "Bank pobiera dość wysokie odsetki od udzielonych pożyczek.", None),
    # 214 (464) Investition
    ("inwestycja", "Zakup nieruchomości okazał się niezwykle opłacalną inwestycją.", None),
    # 215 (465) Aktie
    ("akcja", "Cena pojedynczej akcji tej spółki gwałtownie wzrosła.", None),
    # 216 (466) Währung
    ("waluta", "Euro to oficjalna waluta obowiązująca w wielu krajach Europy.", None),
    # 217 (467) Rabatt
    ("rabat", "Podczas sezonowej wyprzedaży w sklepie zaoferowano duży rabat.", None),
    # 218 (468) Angebot
    ("oferta", "To bez wątpienia bardzo korzystna oferta cenowa.", None),
    # 219 (469) Nachfrage
    ("popyt", "Na ten innowacyjny produkt panuje obecnie ogromny popyt.", None),
    # 220 (470) laufen
    ("biegać", "Każdego ranka on z zamiłowaniem biega po pobliskim parku.", None),
    # 221 (471) schwimmen
    ("pływać", "W upalne dni latem z wielką chęcią pływamy w czystym jeziorze.", None),
    # 222 (472) Fußball
    ("piłka nożna", "Chłopcy z osiedla grają w piłkę nożną każdego ciepłego popołudnia.", None),
    # 223 (473) Schach
    ("szachy", "Mój cierpliwy dziadek nauczył mnie grać w szachy.", None),
    # 224 (474) Mannschaft
    ("drużyna", "Nasza zgrana drużyna wygrała ten arcyważny mecz.", None),
    # 225 (475) Ball
    ("piłka", "Roześmiane dzieci z radością rzucają do siebie małą piłkę.", None),
    # 226 (476) Training
    ("trening", "Dzisiejszy trening siłowy rozpoczyna się punktualnie o szóstej.", None),
    # 227 (477) Schwimmbad
    ("basen", "W każdy wtorek po południu chodzę popływać na kryty basen.", None),
    # 228 (478) Konzert
    ("koncert", "Wczorajszy wieczór spędziliśmy na znakomitym koncercie rockowym.", None),
    # 229 (479) E-Mail
    ("e-mail", "Proszę, prześlij mi potrzebne dokumenty pocztą e-mail.", "ˈimɛjl"),
    # 230 (480) Passwort
    ("hasło", "Całkowicie zapomniałem nowego hasła do mojego konta internetowego.", None),
    # 231 (481) Bildschirm
    ("ekran", "Główny ekran mojego starego laptopa jest zdecydowanie za ciemny.", None),
    # 232 (482) Tastatur
    ("klawiatura", "Ta ergonomiczna klawiatura komputerowa pracuje wyjątkowo cicho.", None),
    # 233 (483) Drucker
    ("drukarka", "Sieciowa drukarka w naszym biurze znowu odmówiła posłuszeństwa.", None),
    # 234 (484) Akku
    ("bateria", "Bateria w moim smartfonie rozładowuje się zaskakująco szybko.", None),
    # 235 (485) Handy
    ("telefon", "W pośpiechu zostawiłem swój telefon w domu.", None),
    # 236 (486) Computer
    ("komputer", "W swojej codziennej pracy spędza całe dnie przy komputerze.", None),
    # 237 (487) Internet
    ("internet", "W całym hotelu goście mają zapewniony darmowy bezprzewodowy internet.", None),
    # 238 (488) Datei
    ("plik", "Dla wygody zapisz ten ważny plik tekstowy na pulpicie.", None),
    # 239 (489) Holz
    ("drewno", "Wszystkie te eleganckie meble wykonano z solidnego litego drewna.", None),
    # 240 (490) Metall
    ("metal", "Wysoka brama wjazdowa została wykonana z trwałego metalu.", None),
    # 241 (491) Plastik
    ("plastik", "Te kolorowe kubki piknikowe zostały wykonane z plastiku.", None),
    # 242 (492) Leder
    ("skóra", "Ta stylowa torebka została uszyta z prawdziwej naturalnej skóry.", None),
    # 243 (493) Wolle
    ("wełna", "Troskliwa babcia zrobiła na drutach sweter z miękkiej, ciepłej wełny.", None),
    # 244 (494) Gold
    ("złoto", "Ten piękny pierścionek zaręczynowy zrobiony jest z czystego złota.", None),
    # 245 (495) Ordnung
    ("porządek", "W jej przytulnym pokoju panuje nienaganny porządek.", None),
    # 246 (496) befehlen
    ("rozkazywać", "Doświadczony generał zaczął stanowczo rozkazywać swoim żołnierzom.", None),
    # 247 (497) erlauben
    ("pozwalać", "Opiekuńczy rodzice nie pozwalają mu wracać zbyt późno do domu.", None),
    # 248 (498) verbieten
    ("zabraniać", "W całym tym budynku surowo zabrania się palić papierosy.", None),
    # 249 (499) lieben
    ("kochać", "Ona kocha go z całego serca i bezwarunkowo.", None),
]

def main():
    ref_path = os.path.join(os.path.dirname(__file__), "ref_pl_batch2.json")
    out_path = os.path.join(os.path.dirname(__file__), "data_pl_batch2.json")

    with open(ref_path, "r", encoding="utf-8") as f:
        ref_items = json.load(f)

    if len(ref_items) != 250:
        raise ValueError(f"Expected 250 ref items, got {len(ref_items)}")
    if len(BATCH2_ITEMS) != 250:
        raise ValueError(f"Expected 250 batch items, got {len(BATCH2_ITEMS)}")

    output_cards = []

    for idx, (ref, (back, example, ipa_override)) in enumerate(zip(ref_items, BATCH2_ITEMS)):
        front = ref["front"]
        example_de = ref["exampleDE"]

        # Calculate IPA
        if ipa_override:
            ipa = ipa_override
        else:
            ipa = polish_ipa(back)

        # Validate non-empty
        if not front or not front.strip():
            raise ValueError(f"Empty front at index {idx}")
        if not back or not back.strip():
            raise ValueError(f"Empty back at index {idx}")
        if not ipa or not ipa.strip():
            raise ValueError(f"Empty ipa at index {idx}")
        if not example or not example.strip():
            raise ValueError(f"Empty example at index {idx}")
        if not example_de or not example_de.strip():
            raise ValueError(f"Empty exampleDE at index {idx}")

        card = {
            "front": front,
            "back": back,
            "ipa": ipa,
            "example": example,
            "exampleDE": example_de
        }
        output_cards.append(card)

    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(output_cards, f, ensure_ascii=False, indent=2)

    print(f"Successfully generated {len(output_cards)} cards to {out_path}")

if __name__ == "__main__":
    main()
