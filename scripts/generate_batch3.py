# -*- coding: utf-8 -*-
import json
import os
import sys

sys.path.append(os.path.dirname(__file__))
from polish_ipa import polish_ipa

# Translations for cards 500 to 749 (indices 0 to 249 of batch 3)
TRANSLATIONS = [
    # 0 (500)
    {
        "back": "szczęśliwy",
        "example": "Ona wygląda na szczęśliwą po dobrych wiadomościach."
    },
    # 1 (501)
    {
        "back": "smutny",
        "example": "Po rozstaniu wyglądał na bardzo smutnego."
    },
    # 2 (502)
    {
        "back": "strach",
        "example": "Pokonał swój strach przed lataniem."
    },
    # 3 (503)
    {
        "back": "radość",
        "example": "Dzieci przyjęły tę wiadomość z wielką radością."
    },
    # 4 (504)
    {
        "back": "złość",
        "example": "Z trudem powstrzymywał swoją złość."
    },
    # 5 (505)
    {
        "back": "zaskoczenie",
        "example": "Nie potrafiła ukryć swojego zaskoczenia."
    },
    # 6 (506)
    {
        "back": "dumny",
        "example": "Ojciec jest bardzo dumny z sukcesów swojego syna."
    },
    # 7 (507)
    {
        "back": "nerwowy",
        "example": "Przed egzaminem był bardzo nerwowy."
    },
    # 8 (508)
    {
        "back": "spokojny",
        "example": "Ona ma spokojny charakter, rzadko się denerwuje."
    },
    # 9 (509)
    {
        "back": "nadzieja",
        "example": "Mamy nadzieję na lepszą przyszłość."
    },
    # 10 (510)
    {
        "back": "cierpliwość",
        "example": "Do tej pracy potrzeba cierpliwości."
    },
    # 11 (511)
    {
        "back": "zaufanie",
        "example": "Na zaufanie trzeba sobie zasłużyć."
    },
    # 12 (512)
    {
        "back": "życzenie",
        "example": "Wypowiedz życzenie."
    },
    # 13 (513)
    {
        "back": "marzenie",
        "example": "Jego marzeniem jest zostać lekarzem."
    },
    # 14 (514)
    {
        "back": "uwaga",
        "example": "Dziękuję za uwagę."
    },
    # 15 (515)
    {
        "back": "sumienie",
        "example": "Dręczy go sumienie."
    },
    # 16 (516)
    {
        "back": "zazdrość",
        "example": "Zazdrość niszczy miłość."
    },
    # 17 (517)
    {
        "back": "współczucie",
        "example": "Czuła współczucie dla ubogich."
    },
    # 18 (518)
    {
        "back": "wdzięczność",
        "example": "Spojrzał na nią z wdzięcznością."
    },
    # 19 (519)
    {
        "back": "rozczarowanie",
        "example": "W jego głosie słychać było rozczarowanie."
    },
    # 20 (520)
    {
        "back": "ulga",
        "example": "Odetchnąłem z ulgą."
    },
    # 21 (521)
    {
        "back": "tęsknota",
        "example": "Ogarnęła go tęsknota za ojczyzną."
    },
    # 22 (522)
    {
        "back": "zawiść",
        "example": "Zawiść to złe uczucie."
    },
    # 23 (523)
    {
        "back": "wstyd",
        "example": "Zaczerwieniła się ze wstydu."
    },
    # 24 (524)
    {
        "back": "duma",
        "example": "Spojrzał na swojego syna z dumą."
    },
    # 25 (525)
    {
        "back": "rozpacz",
        "example": "W rozpaczy zaczęła płakać."
    },
    # 26 (526)
    {
        "back": "zachwyt",
        "example": "Dzieci krzyczały z zachwytu."
    },
    # 27 (527)
    {
        "back": "sympatia",
        "example": "Czuł do niej sympatię."
    },
    # 28 (528)
    {
        "back": "gniew",
        "example": "Jego twarz zaczerwieniła się z gniewu."
    },
    # 29 (529)
    {
        "back": "nuda",
        "example": "Z nudów zaczął rysować."
    },
    # 30 (530)
    {
        "back": "samotność",
        "example": "Samotność przygnębiała starszego człowieka."
    },
    # 31 (531)
    {
        "back": "czułość",
        "example": "Głaskała dziecko z czułością."
    },
    # 32 (532)
    {
        "back": "niebezpieczny",
        "example": "Przechodzenie przez ulicę na czerwonym świetle jest bardzo niebezpieczne."
    },
    # 33 (533)
    {
        "back": "bezpieczny",
        "example": "Ta dzielnica jest uważana za bezpieczną dla dzieci."
    },
    # 34 (534)
    {
        "back": "sprawiedliwość",
        "example": "Ludzie walczą o sprawiedliwość."
    },
    # 35 (535)
    {
        "back": "opinia",
        "example": "Każdy ma własną opinię na ten temat."
    },
    # 36 (536)
    {
        "back": "doświadczenie",
        "example": "Ona ma duże doświadczenie w tej pracy."
    },
    # 37 (537)
    {
        "back": "wspomnienie",
        "example": "To piękne wspomnienie z dzieciństwa."
    },
    # 38 (538)
    {
        "back": "nawyk",
        "example": "Czytanie przed snem to jego nawyk."
    },
    # 39 (539)
    {
        "back": "zamiar",
        "example": "Nie miałem zamiaru cię urazić."
    },
    # 40 (540)
    {
        "back": "powód",
        "example": "Podaj mi powód swojego spóźnienia."
    },
    # 41 (541)
    {
        "back": "skutek",
        "example": "To poważny skutek jego decyzji."
    },
    # 42 (542)
    {
        "back": "cel",
        "example": "Jaki jest cel twojej wizyty?"
    },
    # 43 (543)
    {
        "back": "znaczenie",
        "example": "To słowo ma kilka znaczeń."
    },
    # 44 (544)
    {
        "back": "możliwość",
        "example": "Mamy możliwość, aby wszystko zmienić."
    },
    # 45 (545)
    {
        "back": "odpowiedzialność",
        "example": "On bierze odpowiedzialność za zespół."
    },
    # 46 (546)
    {
        "back": "sukces",
        "example": "Ich koncert był wielkim sukcesem."
    },
    # 47 (547)
    {
        "back": "porażka",
        "example": "Porażka to jeszcze nie koniec."
    },
    # 48 (548)
    {
        "back": "zdolność",
        "example": "On ma zdolność do muzyki."
    },
    # 49 (549)
    {
        "back": "myśl",
        "example": "Ta myśl nie daje mi spokoju."
    },
    # 50 (550)
    {
        "back": "wola",
        "example": "Ona ma silną wolę."
    },
    # 51 (551)
    {
        "back": "wątpliwość",
        "example": "Mam wątpliwości co do jego słów."
    },
    # 52 (552)
    {
        "back": "niebezpieczeństwo",
        "example": "Tutaj nie ma żadnego niebezpieczeństwa."
    },
    # 53 (553)
    {
        "back": "bezpieczeństwo",
        "example": "Bezpieczeństwo dzieci jest najważniejsze."
    },
    # 54 (554)
    {
        "back": "różnica",
        "example": "Jaka jest różnica między tymi słowami?"
    },
    # 55 (555)
    {
        "back": "znajomość",
        "example": "Jego znajomość języka robi duże wrażenie."
    },
    # 56 (556)
    {
        "back": "duży",
        "example": "Oni mają duży dom z pięknym ogrodem."
    },
    # 57 (557)
    {
        "back": "mały",
        "example": "Małe dziecko śpi w łóżeczku."
    },
    # 58 (558)
    {
        "back": "długi",
        "example": "To był bardzo długi i ciężki dzień."
    },
    # 59 (559)
    {
        "back": "krótki",
        "example": "Napisz proszę krótką wiadomość."
    },
    # 60 (560)
    {
        "back": "stary",
        "example": "Stary dom musi zostać gruntownie odremontowany."
    },
    # 61 (561)
    {
        "back": "młody",
        "example": "Młody specjalista szybko wdrożył się do nowej pracy."
    },
    # 62 (562)
    {
        "back": "nowy",
        "example": "W zeszłym tygodniu przeprowadziliśmy się do nowego domu."
    },
    # 63 (563)
    {
        "back": "dobry",
        "example": "On ma dobry charakter i dobre serce."
    },
    # 64 (564)
    {
        "back": "zły",
        "example": "Zła pogoda popsuła nasz piknik w parku."
    },
    # 65 (565)
    {
        "back": "piękny",
        "example": "Jaki piękny zachód słońca nad morzem dzisiaj!"
    },
    # 66 (566)
    {
        "back": "szybki",
        "example": "Szybki pociąg przyjechał wcześniej niż według rozkładu."
    },
    # 67 (567)
    {
        "back": "silny",
        "example": "Silny wiatr połamał w nocy kilka drzew."
    },
    # 68 (568)
    {
        "back": "ciepły",
        "example": "Ciepły sweter ogrzeje cię w chłodny dzień."
    },
    # 69 (569)
    {
        "back": "zimny",
        "example": "Zimna woda orzeźwia w upalny letni dzień."
    },
    # 70 (570)
    {
        "back": "gorący",
        "example": "Ostrożnie, zupa jest jeszcze bardzo gorąca!"
    },
    # 71 (571)
    {
        "back": "ciężki",
        "example": "Ciężką walizkę trudno wnieść po schodach."
    },
    # 72 (572)
    {
        "back": "zmęczony",
        "example": "Po długim spacerze wszyscy byli zmęczeni."
    },
    # 73 (573)
    {
        "back": "głośny",
        "example": "Głośna muzyka przeszkadza sąsiadom spać w nocy."
    },
    # 74 (574)
    {
        "back": "cichy",
        "example": "Rozmawiajcie cicho, dziecko już śpi."
    },
    # 75 (575)
    {
        "back": "trudny",
        "example": "Ten egzamin jest bardzo trudny dla wszystkich studentów."
    },
    # 76 (576)
    {
        "back": "interesujący",
        "example": "To bardzo interesujący film o podróżach."
    },
    # 77 (577)
    {
        "back": "nudny",
        "example": "Ta lekcja była dla dzieci zbyt nudna."
    },
    # 78 (578)
    {
        "back": "rzadko",
        "example": "Ona wieczorami rzadko je słodycze."
    },
    # 79 (579)
    {
        "back": "ważny",
        "example": "To bardzo ważne pytanie dla całej rodziny."
    },
    # 80 (580)
    {
        "back": "możliwy",
        "example": "Omówiliśmy wszystkie możliwe warianty rozwiązania."
    },
    # 81 (581)
    {
        "back": "prosty",
        "example": "To prosty przepis, można go łatwo zapamiętać."
    },
    # 82 (582)
    {
        "back": "czysty",
        "example": "W kuchni naczynia muszą być zawsze czyste."
    },
    # 83 (583)
    {
        "back": "brudny",
        "example": "Po meczu piłki nożnej jego ubranie było zupełnie brudne."
    },
    # 84 (584)
    {
        "back": "mokry",
        "example": "Po deszczu cała trawa była mokra."
    },
    # 85 (585)
    {
        "back": "suchy",
        "example": "Latem powietrze jest tutaj bardzo suche i ciepłe."
    },
    # 86 (586)
    {
        "back": "jasny",
        "example": "Wybraliśmy jasny pokój z dużymi oknami."
    },
    # 87 (587)
    {
        "back": "ciemny",
        "example": "Zimą wieczory są tutaj długie i ciemne."
    },
    # 88 (588)
    {
        "back": "pusty",
        "example": "Rano ulice miasta są jeszcze puste."
    },
    # 89 (589)
    {
        "back": "pełny",
        "example": "Autobus był pełny, więc pojechaliśmy taksówką."
    },
    # 90 (590)
    {
        "back": "szeroki",
        "example": "Przez rzekę wybudowano nowy szeroki most."
    },
    # 91 (591)
    {
        "back": "wysoki",
        "example": "W centrum miasta stoi wysoki, nowoczesny dom."
    },
    # 92 (592)
    {
        "back": "miękki",
        "example": "Ta sofa jest bardzo miękka i wygodna."
    },
    # 93 (593)
    {
        "back": "prawidłowy",
        "example": "Udzieliłeś prawidłowej odpowiedzi na trudne pytanie."
    },
    # 94 (594)
    {
        "back": "błędny",
        "example": "Wybrał błędny numer telefonu."
    },
    # 95 (595)
    {
        "back": "połowa",
        "example": "Połowa ciasta została już zjedzona."
    },
    # 96 (596)
    {
        "back": "cały",
        "example": "Czekaliśmy na niego na przystanku całą godzinę."
    },
    # 97 (597)
    {
        "back": "prędkość",
        "example": "Samochód jechał z dużą prędkością."
    },
    # 98 (598)
    {
        "back": "być",
        "example": "On chciałby w przyszłości być lekarzem."
    },
    # 99 (599)
    {
        "back": "mieć",
        "example": "Chciałbym mieć duży dom z ogrodem."
    },
    # 100 (600)
    {
        "back": "robić",
        "example": "Co chciałbyś robić w weekend?"
    },
    # 101 (601)
    {
        "back": "czytać",
        "example": "Chętnie czytam książki przed snem."
    },
    # 102 (602)
    {
        "back": "pisać",
        "example": "Ona potrafi bardzo ładnie pisać."
    },
    # 103 (603)
    {
        "back": "spać",
        "example": "Dzieci powinny spać przynajmniej osiem godzin."
    },
    # 104 (604)
    {
        "back": "budzić się",
        "example": "Każdego dnia budzę się wcześnie rano."
    },
    # 105 (605)
    {
        "back": "pracować",
        "example": "On pracuje jako inżynier już od dziesięciu lat."
    },
    # 106 (606)
    {
        "back": "uczyć się",
        "example": "Ona chciałaby uczyć się na uniwersytecie w Moskwie."
    },
    # 107 (607)
    {
        "back": "grać",
        "example": "Dzieci chętnie grają w piłkę nożną na podwórku."
    },
    # 108 (608)
    {
        "back": "dawać",
        "example": "Mama jest zawsze gotowa dawać nam dobre rady."
    },
    # 109 (609)
    {
        "back": "wziąć",
        "example": "Czy mogę wziąć twoją książkę na jakiś czas?"
    },
    # 110 (610)
    {
        "back": "potrzebować",
        "example": "Potrzebuję twojej pomocy w tej sprawie."
    },
    # 111 (611)
    {
        "back": "otwierać",
        "example": "Proszę, otwieraj drzwi w nocy cicho."
    },
    # 112 (612)
    {
        "back": "zamykać",
        "example": "Nie zapomnij zamknąć okien przed wyjściem."
    },
    # 113 (613)
    {
        "back": "pomagać",
        "example": "Ona jest zawsze gotowa pomagać swoim bliskim."
    },
    # 114 (614)
    {
        "back": "szukać",
        "example": "Długo szukałem mojego zgubionego klucza."
    },
    # 115 (615)
    {
        "back": "znaleźć",
        "example": "Udało mi się szybko znaleźć potrzebną informację."
    },
    # 116 (616)
    {
        "back": "nosić",
        "example": "Ona lubi nosić latem kolorowe sukienki."
    },
    # 117 (617)
    {
        "back": "kłaść",
        "example": "Nie powinno się kłaść telefonu na krawędzi stołu."
    },
    # 118 (618)
    {
        "back": "stawiać",
        "example": "Torbę można postawić na półce przy wejściu."
    },
    # 119 (619)
    {
        "back": "rosnąć",
        "example": "W naszym ogrodzie rosną stare jabłonie."
    },
    # 120 (620)
    {
        "back": "umierać",
        "example": "Stare tradycje nie mogą umierać."
    },
    # 121 (621)
    {
        "back": "żyć",
        "example": "Żyjemy w tym mieście już od pięciu lat."
    },
    # 122 (622)
    {
        "back": "próbować",
        "example": "Spróbuje zdać ten egzamin jeszcze raz."
    },
    # 123 (623)
    {
        "back": "dostawać",
        "example": "Miło jest dostawać listy od dawnych przyjaciół."
    },
    # 124 (624)
    {
        "back": "tracić",
        "example": "Nie chcę tracić czasu na darmo."
    },
    # 125 (625)
    {
        "back": "wygrywać",
        "example": "Nasza drużyna jest przyzwyczajona do wygrywania ważnych meczów."
    },
    # 126 (626)
    {
        "back": "odwiedzać",
        "example": "Staramy się odwiedzać babcię w każdym tygodniu."
    },
    # 127 (627)
    {
        "back": "zapraszać",
        "example": "Oni chętnie zapraszają gości na kolację."
    },
    # 128 (628)
    {
        "back": "świętować",
        "example": "W sobotę będziemy świętować urodziny."
    },
    # 129 (629)
    {
        "back": "płacić",
        "example": "Wolę płacić kartą niż gotówką."
    },
    # 130 (630)
    {
        "back": "kroić",
        "example": "Krój chleb ostrożnie."
    },
    # 131 (631)
    {
        "back": "zgadzać się",
        "example": "On nie chce się zgodzić."
    },
    # 132 (632)
    {
        "back": "ostrzegać",
        "example": "Znaki ostrzegają przed niebezpieczeństwem."
    },
    # 133 (633)
    {
        "back": "iść",
        "example": "Jutro chcę iść do parku na spacer."
    },
    # 134 (634)
    {
        "back": "przyjść",
        "example": "Kiedy planujesz przyjść na spotkanie?"
    },
    # 135 (635)
    {
        "back": "przynosić",
        "example": "Obiecał przynosić kwiaty w każdy piątek."
    },
    # 136 (636)
    {
        "back": "jechać",
        "example": "Mamy zamiar jechać pociągiem do Moskwy."
    },
    # 137 (637)
    {
        "back": "lecieć",
        "example": "Jutro będziemy lecieć do Berlina."
    },
    # 138 (638)
    {
        "back": "siedzieć",
        "example": "Długie siedzenie przy komputerze jest złe dla pleców."
    },
    # 139 (639)
    {
        "back": "stać",
        "example": "Długie stanie w kolejce jest bardzo męczące."
    },
    # 140 (640)
    {
        "back": "zaczynać",
        "example": "Czas zacząć pracę nad nowym projektem."
    },
    # 141 (641)
    {
        "back": "kończyć się",
        "example": "Koncert ma się skończyć o dziesiątej wieczorem."
    },
    # 142 (642)
    {
        "back": "czekać",
        "example": "Musiałem długo czekać na przystanku na autobus."
    },
    # 143 (643)
    {
        "back": "ciągnąć",
        "example": "Te drzwi trzeba ciągnąć, a nie pchać."
    },
    # 144 (644)
    {
        "back": "naciskać",
        "example": "Aby włączyć światło, trzeba nacisnąć ten przycisk."
    },
    # 145 (645)
    {
        "back": "rzucać",
        "example": "Nie wolno rzucać śmieci na ulicę."
    },
    # 146 (646)
    {
        "back": "spadać",
        "example": "Jesienią liście zaczynają spadać z drzew."
    },
    # 147 (647)
    {
        "back": "wchodzić",
        "example": "Każdego ranka wchodzimy po schodach pieszo."
    },
    # 148 (648)
    {
        "back": "zostawać",
        "example": "Dzisiaj chciałbym zostać w domu przez cały dzień."
    },
    # 149 (649)
    {
        "back": "zmieniać",
        "example": "Czasami warto zmieniać swoje plany."
    },
    # 150 (650)
    {
        "back": "spotkać",
        "example": "Cieszę się, że mogę spotkać przyjaciół na lotnisku."
    },
    # 151 (651)
    {
        "back": "widzieć",
        "example": "Bez okularów nie widzę odległych przedmiotów."
    },
    # 152 (652)
    {
        "back": "słyszeć",
        "example": "Czy słyszysz tę piękną muzykę?"
    },
    # 153 (653)
    {
        "back": "mówić",
        "example": "On potrafi mówić w pięciu językach."
    },
    # 154 (654)
    {
        "back": "pytać",
        "example": "Nie wahaj się pytać, gdy czegoś nie rozumiesz."
    },
    # 155 (655)
    {
        "back": "odpowiadać",
        "example": "Uczeń potrafi odpowiadać na trudne pytania."
    },
    # 156 (656)
    {
        "back": "wiedzieć",
        "example": "Czy wiesz, gdzie jest najbliższa apteka?"
    },
    # 157 (657)
    {
        "back": "znać",
        "example": "Chciałbym lepiej poznać tego ciekawego człowieka."
    },
    # 158 (658)
    {
        "back": "lubić",
        "example": "Lubię tę spokojną, piękną muzykę."
    },
    # 159 (659)
    {
        "back": "chcieć",
        "example": "Chcę pojechać tego lata do Moskwy."
    },
    # 160 (660)
    {
        "back": "móc",
        "example": "Czy możesz mi pomóc w tym zadaniu?"
    },
    # 161 (661)
    {
        "back": "musieć",
        "example": "Muszę oddać ten projekt do piątku."
    },
    # 162 (662)
    {
        "back": "mieć pozwolenie",
        "example": "Zgodnie z zasadami lokalu nikt nie ma pozwolenia na palenie tutaj."
    },
    # 163 (663)
    {
        "back": "powinien",
        "example": "Powinieneś przeczytać tę ważną książkę."
    },
    # 164 (664)
    {
        "back": "rozumieć",
        "example": "Zaczynam lepiej rozumieć język rosyjski."
    },
    # 165 (665)
    {
        "back": "myśleć",
        "example": "Trzeba pomyśleć, zanim się coś powie."
    },
    # 166 (666)
    {
        "back": "wierzyć",
        "example": "Wierzyć w samego siebie jest w życiu bardzo ważne."
    },
    # 167 (667)
    {
        "back": "pokazywać",
        "example": "On chętnie pokazuje zdjęcia z urlopu."
    },
    # 168 (668)
    {
        "back": "wyjaśniać",
        "example": "Nauczyciel potrafi łatwo wyjaśniać trudne tematy."
    },
    # 169 (669)
    {
        "back": "opowiadać",
        "example": "Dziadek chętnie opowiada historie ze swojej młodości."
    },
    # 170 (670)
    {
        "back": "zapominać",
        "example": "Nie zapomnij wyłączyć światła przed wyjściem."
    },
    # 171 (671)
    {
        "back": "śmiać się",
        "example": "Dzieci głośno śmieją się na podwórku."
    },
    # 172 (672)
    {
        "back": "decyzja",
        "example": "To była trudna decyzja."
    },
    # 173 (673)
    {
        "back": "wrażenie",
        "example": "Film wywarł na mnie duże wrażenie."
    },
    # 174 (674)
    {
        "back": "twierdzić",
        "example": "On twierdzi, że mówi prawdę."
    },
    # 175 (675)
    {
        "back": "przekonywać",
        "example": "Ona potrafi przekonywać ludzi."
    },
    # 176 (676)
    {
        "back": "sprzeciwiać się",
        "example": "Nikt nie odważył się sprzeciwiać."
    },
    # 177 (677)
    {
        "back": "podkreślać",
        "example": "Nauczyciel podkreśla wagę praktyki."
    },
    # 178 (678)
    {
        "back": "szeptać",
        "example": "Zaczęła szeptać mi do ucha."
    },
    # 179 (679)
    {
        "back": "krzyczeć",
        "example": "Nie musisz tak krzyczeć."
    },
    # 180 (680)
    {
        "back": "wspominać",
        "example": "Zapomniał o tym wspomnieć."
    },
    # 181 (681)
    {
        "back": "powtarzać",
        "example": "Proszę, powtarzaj za mną."
    },
    # 182 (682)
    {
        "back": "obiecywać",
        "example": "Nie mogę tego obiecywać."
    },
    # 183 (683)
    {
        "back": "opisywać",
        "example": "Opisz dokładnie, co widziałeś."
    },
    # 184 (684)
    {
        "back": "proponować",
        "example": "On chętnie proponuje nowe pomysły."
    },
    # 185 (685)
    {
        "back": "narzekać",
        "example": "Ona chętnie narzeka na pogodę."
    },
    # 186 (686)
    {
        "back": "dziękować",
        "example": "Nie zapomnij podziękować gospodarzom."
    },
    # 187 (687)
    {
        "back": "prosić",
        "example": "Ona nie lubi prosić o pomoc."
    },
    # 188 (688)
    {
        "back": "kłamać",
        "example": "On nie potrafi kłamać."
    },
    # 189 (689)
    {
        "back": "dyskutować",
        "example": "Będziemy dyskutować o tej kwestii jutro."
    },
    # 190 (690)
    {
        "back": "pozdrawiać",
        "example": "On zawsze pozdrawia sąsiadów."
    },
    # 191 (691)
    {
        "back": "milczeć",
        "example": "Czasami lepiej jest milczeć."
    },
    # 192 (692)
    {
        "back": "blisko",
        "example": "Sklep znajduje się blisko naszego domu."
    },
    # 193 (693)
    {
        "back": "w lewo",
        "example": "Na skrzyżowaniu proszę skręcić w lewo."
    },
    # 194 (694)
    {
        "back": "w prawo",
        "example": "Za mostem proszę skręcić w prawo."
    },
    # 195 (695)
    {
        "back": "prosto",
        "example": "Proszę iść prosto aż do wielkiego placu."
    },
    # 196 (696)
    {
        "back": "dokąd",
        "example": "Dokąd jedziecie latem na wakacje?"
    },
    # 197 (697)
    {
        "back": "zawsze",
        "example": "On zawsze przychodzi punktualnie do pracy."
    },
    # 198 (698)
    {
        "back": "nigdy",
        "example": "Nigdy jeszcze nie byłem w dalekiej Japonii."
    },
    # 199 (699)
    {
        "back": "czasami",
        "example": "Czasami sam gotuję kolację dla całej rodziny."
    },
    # 200 (700)
    {
        "back": "często",
        "example": "Wieczorami często spacerujemy w parku."
    },
    # 201 (701)
    {
        "back": "już",
        "example": "On już wrócił z pracy do domu."
    },
    # 202 (702)
    {
        "back": "jeszcze",
        "example": "Czy nie skończyłeś jeszcze swojej pracy domowej?"
    },
    # 203 (703)
    {
        "back": "ale",
        "example": "Chcę pójść na spacer, ale pada deszcz."
    },
    # 204 (704)
    {
        "back": "albo",
        "example": "Chcesz herbatę albo kawę?"
    },
    # 205 (705)
    {
        "back": "ponieważ",
        "example": "Zostałem w domu, ponieważ byłem chory."
    },
    # 206 (706)
    {
        "back": "jeśli",
        "example": "Jeśli jutro będzie świecić słońce, pojedziemy nad jezioro."
    },
    # 207 (707)
    {
        "back": "że",
        "example": "Wiem, że mówisz prawdę."
    },
    # 208 (708)
    {
        "back": "chociaż",
        "example": "Poszedł do pracy, chociaż czuł się źle."
    },
    # 209 (709)
    {
        "back": "dlatego",
        "example": "Było późno, dlatego wezwaliśmy taksówkę."
    },
    # 210 (710)
    {
        "back": "mimo to",
        "example": "Padał deszcz, ale mimo to poszliśmy na spacer."
    },
    # 211 (711)
    {
        "back": "może",
        "example": "Może zobaczymy się już jutro."
    },
    # 212 (712)
    {
        "back": "oczywiście",
        "example": "Oczywiście pomogę ci w przeprowadzce."
    },
    # 213 (713)
    {
        "back": "dużo",
        "example": "On ma dużo przyjaciół w tym mieście."
    },
    # 214 (714)
    {
        "back": "mało",
        "example": "Mamy już mało czasu do wyjazdu."
    },
    # 215 (715)
    {
        "back": "więcej",
        "example": "Potrzebuję więcej informacji o tym projekcie."
    },
    # 216 (716)
    {
        "back": "mniej",
        "example": "Spróbuj jeść mniej słodyczy."
    },
    # 217 (717)
    {
        "back": "wszyscy",
        "example": "Wszyscy goście przyszli punktualnie na przyjęcie."
    },
    # 218 (718)
    {
        "back": "niektórzy",
        "example": "Niektórzy studenci już zdali ten egzamin."
    },
    # 219 (719)
    {
        "back": "nic",
        "example": "Nic nie słyszałem o tej wiadomości."
    },
    # 220 (720)
    {
        "back": "coś",
        "example": "Chcę ci coś opowiedzieć."
    },
    # 221 (721)
    {
        "back": "kto",
        "example": "Kto zostawił otwarte okno?"
    },
    # 222 (722)
    {
        "back": "co",
        "example": "Co robisz dziś wieczorem?"
    },
    # 223 (723)
    {
        "back": "gdzie",
        "example": "Gdzie jest najbliższy przystanek autobusowy?"
    },
    # 224 (724)
    {
        "back": "kiedy",
        "example": "Kiedy zaczyna się koncert w parku?"
    },
    # 225 (725)
    {
        "back": "dlaczego",
        "example": "Dlaczego nie przyszedłeś wczoraj na spotkanie?"
    },
    # 226 (726)
    {
        "back": "jak",
        "example": "Jak dotarłeś wczoraj do domu?"
    },
    # 227 (727)
    {
        "back": "ile",
        "example": "Ile kosztuje ten czerwony sweter?"
    },
    # 228 (728)
    {
        "back": "kołdra",
        "example": "Miękka kołdra dobrze ogrzewa w zimie."
    },
    # 229 (729)
    {
        "back": "budzik",
        "example": "Budzik dzwoni punktualnie o siódmej."
    },
    # 230 (730)
    {
        "back": "drzemka",
        "example": "Po pierwszym dzwonku budzika naciska przycisk drzemki."
    },
    # 231 (731)
    {
        "back": "mycie zębów",
        "example": "Dokładne mycie zębów jest ważne dla zdrowia zębów."
    },
    # 232 (732)
    {
        "back": "ubierać się",
        "example": "Ubieraj się szybko, musimy iść."
    },
    # 233 (733)
    {
        "back": "szczotka do włosów",
        "example": "Czesze swoje długie włosy szczotką do włosów."
    },
    # 234 (734)
    {
        "back": "lustro",
        "example": "Spogląda na chwilę w lustro w korytarzu."
    },
    # 235 (735)
    {
        "back": "rutyna",
        "example": "Stała poranna rutyna pozwala zaoszczędzić sporo czasu."
    },
    # 236 (736)
    {
        "back": "umowa najmu",
        "example": "Wczoraj podpisaliśmy nową umowę najmu."
    },
    # 237 (737)
    {
        "back": "kaucja",
        "example": "Kaucja wynosi trzykrotność miesięcznego czynszu."
    },
    # 238 (738)
    {
        "back": "koszty dodatkowe",
        "example": "Ogrzewanie i woda są zawarte w kosztach dodatkowych."
    },
    # 239 (739)
    {
        "back": "wynajmujący",
        "example": "Wynajmujący naprawia uszkodzone ogrzewanie."
    },
    # 240 (740)
    {
        "back": "najemca",
        "example": "Najemca opłaca czynsz na początku miesiąca."
    },
    # 241 (741)
    {
        "back": "wypowiedzenie",
        "example": "Wypowiedzenie starego mieszkania musi nastąpić w formie pisemnej."
    },
    # 242 (742)
    {
        "back": "powierzchnia mieszkalna",
        "example": "Mieszkanie ma powierzchnię mieszkalną osiemdziesięciu metrów kwadratowych."
    },
    # 243 (743)
    {
        "back": "przeprowadzka",
        "example": "Przeprowadzka do nowego miasta przebiegła bez przeszkód."
    },
    # 244 (744)
    {
        "back": "regał na książki",
        "example": "Regał na książki stoi przy ścianie w gabinecie."
    },
    # 245 (745)
    {
        "back": "szafa na ubrania",
        "example": "On starannie wiesza koszule w szafie na ubrania."
    },
    # 246 (746)
    {
        "back": "krzesło biurowe",
        "example": "Wygodne krzesło biurowe odciąża kręgosłup."
    },
    # 247 (747)
    {
        "back": "lampa stojąca",
        "example": "Lampa stojąca daje ciepłe światło wieczorem."
    },
    # 248 (748)
    {
        "back": "stół jadalniany",
        "example": "Cała rodzina siedzi wieczorem przy dużym stole jadalnianym."
    },
    # 249 (749)
    {
        "back": "sofa",
        "example": "Na wygodnej sofie można wspaniale wypocząć."
    }
]

def main():
    ref_file = os.path.join(os.path.dirname(__file__), "ref_pl_batch3.json")
    out_file = os.path.join(os.path.dirname(__file__), "data_pl_batch3.json")

    with open(ref_file, "r", encoding="utf-8") as f:
        ref_items = json.load(f)

    if len(ref_items) != 250:
        raise ValueError(f"Expected 250 items in ref file, got {len(ref_items)}")
    if len(TRANSLATIONS) != 250:
        raise ValueError(f"Expected 250 items in TRANSLATIONS, got {len(TRANSLATIONS)}")

    output_cards = []
    for i, ref in enumerate(ref_items):
        t = TRANSLATIONS[i]
        front = ref["front"]
        exampleDE = ref["exampleDE"]
        back = t["back"].strip()
        example = t["example"].strip()
        ipa = polish_ipa(back).strip()

        if not front:
            raise ValueError(f"Empty front at index {i}")
        if not back:
            raise ValueError(f"Empty back at index {i}")
        if not ipa:
            raise ValueError(f"Empty ipa at index {i} for '{back}'")
        if not example:
            raise ValueError(f"Empty example at index {i}")
        if not exampleDE:
            raise ValueError(f"Empty exampleDE at index {i}")

        card = {
            "front": front,
            "back": back,
            "ipa": ipa,
            "example": example,
            "exampleDE": exampleDE
        }
        output_cards.append(card)

    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(output_cards, f, ensure_ascii=False, indent=2)

    print(f"Successfully generated {len(output_cards)} cards to {out_file}")

if __name__ == "__main__":
    main()
