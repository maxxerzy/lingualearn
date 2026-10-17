# -*- coding: utf-8 -*-
"""
Builder for Polish flashcards batch 4 (cards 750 to 999).
"""
import json
import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from polish_ipa import polish_ipa

# Map from front -> (back, polish_example)
CARDS = {
    # 750-799
    "der Vorhang": (
        "zasłona",
        "Ona zaciąga zasłonę, gdy robi się ciemno."
    ),
    "der Staubsauger": (
        "odkurzacz",
        "On odkurza dywan nowym odkurzaczem."
    ),
    "das Bügelbrett": (
        "deska do prasowania",
        "Deska do prasowania stoi złożona w szafie."
    ),
    "das Bügeleisen": (
        "żelazko",
        "Żelazko robi się bardzo gorące."
    ),
    "der Wischmop": (
        "mop",
        "Ona myje podłogę w kuchni mopem."
    ),
    "das Spülmittel": (
        "płyn do mycia naczyń",
        "Kilka kropel płynu do mycia naczyń wystarczy na naczynia."
    ),
    "die Mülltonne": (
        "kosz na śmieci",
        "Wystaw proszę kosz na śmieci na ulicę."
    ),
    "der Wäscheständer": (
        "suszarka na pranie",
        "Mokre pranie schnie na suszarce na pranie."
    ),
    "die Glühbirne": (
        "żarówka",
        "Musimy wymienić zepsutą żarówkę w korytarzu."
    ),
    "der Schraubenzieher": (
        "śrubokręt",
        "Śrubokrętem dokręca luźną śrubę."
    ),
    "die Zange": (
        "szczypce",
        "On mocno trzyma drut szczypcami."
    ),
    "die Bohrmaschine": (
        "wiertarka",
        "Wiertarka wierci dziurę w ścianie."
    ),
    "der Handwerker": (
        "fachowiec",
        "Fachowiec przyjdzie jutro rano o ósmej."
    ),
    "der Pinsel": (
        "pędzel",
        "Ona maluje drewnianą ławkę szerokim pędzlem."
    ),
    "reparieren": (
        "naprawić",
        "Czy możesz proszę naprawić ten zepsuty rower?"
    ),
    "der Werkzeugkasten": (
        "skrzynka z narzędziami",
        "Wszystkie narzędzia leżą pod ręką w skrzynce z narzędziami."
    ),
    "das Schneidebrett": (
        "deska do krojenia",
        "Pokrój proszę cebulę na desce do krojenia."
    ),
    "der Kochtopf": (
        "garnek",
        "Zupa gotuje się w dużym garnku na kuchence."
    ),
    "die Bratpfanne": (
        "patelnia",
        "Na gorącej patelni smażą się warzywa."
    ),
    "der Wasserkocher": (
        "czajnik elektryczny",
        "Czajnik elektryczny gotuje wodę na herbatę w dwie minuty."
    ),
    "der Backofen": (
        "piekarnik",
        "Ciasto piecze się pół godziny w piekarniku."
    ),
    "das Rezept (Küche)": (
        "przepis",
        "Ten przepis wymyśliła moja babcia."
    ),
    "die Zutat": (
        "składnik",
        "Świeże zioła są najważniejszym składnikiem sosu."
    ),
    "fein hacken": (
        "drobno siekać",
        "Ona drobno sieka cebulę i pietruszkę ostrym nożem."
    ),
    "das Meersalz": (
        "sól morska",
        "Szczypta soli morskiej podkreśla smak zupy."
    ),
    "der schwarze Pfeffer": (
        "czarny pieprz",
        "Świeżo mielony czarny pieprz pachnie wspaniale."
    ),
    "das Olivenöl": (
        "oliwa z oliwek",
        "Tłoczona na zimno oliwa z oliwek doskonale pasuje do sałatki."
    ),
    "der Knoblauch": (
        "czosnek",
        "Dwa ząbki czosnku nadają potrawie aromatu."
    ),
    "die Petersilie": (
        "pietruszka",
        "Świeżo posiekana pietruszka trafia na wierzch przed podaniem."
    ),
    "das Basilikum": (
        "bazylia",
        "Świeża bazylia pasuje idealnie do pomidorów."
    ),
    "der Zimt": (
        "cynamon",
        "Zimą chętnie pijemy herbatę ze szczyptą cynamonu."
    ),
    "das Vollkornbrot": (
        "chleb pełnoziarnisty",
        "Świeży chleb pełnoziarnisty ma wyrazisty smak i syci na długo."
    ),
    "das Brötchen": (
        "bułka",
        "W niedziele kupujemy ciepłe bułki w piekarni."
    ),
    "die Butter": (
        "masło",
        "Posmaruj proszę kromkę chleba masłem."
    ),
    "die Marmelade": (
        "dżem",
        "Dżem truskawkowy to moje ulubione smarowidło do chleba."
    ),
    "das Müsli": (
        "musli",
        "Rano chętnie jem musli ze świeżymi owocami."
    ),
    "der Joghurt": (
        "jogurt",
        "Jogurt naturalny smakuje szczególnie dobrze z odrobiną miodu."
    ),
    "das gekochte Ei": (
        "gotowane jajko",
        "Gotowane jajko na miękko to część niedzielnego śniadania."
    ),
    "der Orangensaft": (
        "sok pomarańczowy",
        "Świeżo wyciskany sok pomarańczowy zawiera dużo witamin."
    ),
    "die Reservierung": (
        "rezerwacja",
        "Mam rezerwację na nazwisko Müller."
    ),
    "die Speisekarte": (
        "karta dań",
        "Czy możemy prosić o kartę dań?"
    ),
    "die Vorspeise": (
        "przystawka",
        "Jako przystawkę zamawiamy małą sałatkę."
    ),
    "das Hauptgericht": (
        "danie główne",
        "Danie główne jest podawane gorące na dużym talerzu."
    ),
    "die Nachspeise": (
        "deser",
        "Czy chcieliby Państwo po jedzeniu jeszcze deser?"
    ),
    "die Rechnung": (
        "rachunek",
        "Chcielibyśmy zapłacić, prosimy o rachunek."
    ),
    "das Trinkgeld": (
        "napiwek",
        "Uprzejmy kelner zasłużył na dobry napiwek."
    ),
    "die Spezialität des Hauses": (
        "specjalność lokalu",
        "Kelner poleca domowy makaron jako specjalność lokalu."
    ),
    "der Kaffee": (
        "kawa",
        "Filiżanka gorącej kawy przegania zmęczenie."
    ),
    "der Cappuccino": (
        "cappuccino",
        "Cappuccino ma cudownie kremową piankę."
    ),
    "der Kräutertee": (
        "herbata ziołowa",
        "Wieczorem chętnie piję filiżankę ciepłej herbaty ziołowej."
    ),

    # 800-849
    "das Mineralwasser": (
        "woda mineralna",
        "Szklanka chłodnej wody mineralnej gazowanej orzeźwia."
    ),
    "das Stück Kuchen": (
        "kawałek ciasta",
        "Po południu pozwalamy sobie na kawałek ciasta."
    ),
    "die Barista": (
        "baristka",
        "Baristka po mistrzowsku przygotowuje espresso."
    ),
    "die Stammkundin": (
        "stała klientka",
        "Ona jest stałą klientką w tej przytulnej kawiarni na rogu."
    ),
    "der Einkaufswagen": (
        "wózek na zakupy",
        "Weź proszę monetę do wózka na zakupy."
    ),
    "der Einkaufszettel": (
        "lista zakupów",
        "Zapisałem wszystkie ważne rzeczy na liście zakupów."
    ),
    "das Sonderangebot": (
        "oferta specjalna",
        "Świeże truskawki są dzisiaj w ofercie specjalnej."
    ),
    "die Kasse": (
        "kasa",
        "Przy kasie stoi długa kolejka klientów."
    ),
    "der Kassenbon": (
        "paragon",
        "Proszę dobrze zachować paragon jako dowód zakupu."
    ),
    "die Stofftasche": (
        "torba materiałowa",
        "Nasze zakupy nosimy w torbie materiałowej."
    ),
    "das Haltbarkeitsdatum": (
        "termin ważności",
        "Zawsze sprawdzaj termin ważności na opakowaniu."
    ),
    "die Frischetheke": (
        "stoisko ze świeżymi produktami",
        "Na stoisku ze świeżymi produktami dostępny jest ser regionalny."
    ),
    "anprobieren": (
        "przymierzyć",
        "Chciałbym przymierzyć tę granatową kurtkę."
    ),
    "die Umkleidekabine": (
        "przymierzalnia",
        "Tam po lewej stronie jest wolna przymierzalnia."
    ),
    "die Konfektionsgröße": (
        "rozmiar ubrania",
        "Jaki rozmiar ubrania nosi Pan zazwyczaj?"
    ),
    "passen": (
        "pasować",
        "Spodnie pasują na mnie jak ulał."
    ),
    "zu eng": (
        "za ciasny",
        "Ten sweter jest na mnie niestety za ciasny w ramionach."
    ),
    "zu weit": (
        "za szeroki",
        "Spódnica jest trochę za szeroka i zsuwa się podczas chodzenia."
    ),
    "der Schnitt": (
        "krój",
        "Nowoczesny krój podoba mi się szczególnie."
    ),
    "die Baumwolle": (
        "bawełna",
        "Ta koszulka jest uszyta z czystej, miękkiej bawełny."
    ),
    "die Schurwolle": (
        "żywa wełna",
        "Gruby sweter z żywej wełny grzeje w zimie."
    ),
    "die Seide": (
        "jedwab",
        "Apaszka z jedwabiu jest cudownie miękka w dotyku."
    ),
    "das Leder": (
        "skóra",
        "Ta wytrzymała kurtka jest wykonana z prawdziwej skóry."
    ),
    "gestreift": (
        "w paski",
        "On ma dziś na sobie koszulę w niebiesko-białe paski."
    ),
    "kariert": (
        "w kratkę",
        "Wzór w kratkę idealnie pasuje do koszuli drwala."
    ),
    "einfarbig": (
        "jednokolorowy",
        "Prosta, jednokolorowa sukienka zawsze wygląda elegancko."
    ),
    "der Reißverschluss": (
        "zamek błyskawiczny",
        "Zamek błyskawiczny w mojej kurtce czasem się zacina."
    ),
    "die Schnürsenkel": (
        "sznurowadła",
        "Zawiąż sznurowadła, żeby się nie potknąć."
    ),
    "die Lederschuhe": (
        "skórzane buty",
        "Na uroczyste okazje nosi wypolerowane skórzane buty."
    ),
    "die Turnschuhe": (
        "buty sportowe",
        "Do biegania po parku potrzebuję wygodnych butów sportowych."
    ),
    "die Handtasche": (
        "torebka",
        "Ona szuka klucza w dużej torebce."
    ),
    "der Ledergürtel": (
        "skórzany pasek",
        "Czarny skórzany pasek podtrzymuje spodnie."
    ),
    "der Regenschirm": (
        "parasol",
        "Weź parasol, niebo się zachmurza."
    ),
    "die Sonnenbrille": (
        "okulary przeciwsłoneczne",
        "Latem dobre okulary przeciwsłoneczne chronią oczy."
    ),
    "das Girokonto": (
        "konto osobiste",
        "Moja pensja wpływa co miesiąc na moje konto osobiste."
    ),
    "die Überweisung": (
        "przelew",
        "Robię przelew wygodnie przez bankowość internetową."
    ),
    "der Dauerauftrag": (
        "zlecenie stałe",
        "Czynsz płacę co miesiąc zleceniem stałym."
    ),
    "der Geldautomat": (
        "bankomat",
        "W tym bankomacie można wypłacać pieniądze bez prowizji."
    ),
    "die Geheimzahl": (
        "kod PIN",
        "Nigdy nie przekazuj swojego czterocyfrowego kodu PIN obcym."
    ),
    "der Kontoauszug": (
        "wyciąg z konta",
        "Na wyciągu z konta widnieją wszystkie przychody i wydatki."
    ),
    "das Sparguthaben": (
        "oszczędności na koncie",
        "Ona odkłada co miesiąc stałą kwotę jako oszczędności na koncie."
    ),
    "die Zinsen": (
        "odsetki",
        "Bank płaci obecnie umiarkowane odsetki od lokat."
    ),
    "das Bargeld": (
        "gotówka",
        "Ma Pan przy sobie gotówkę czy płaci Pan kartą?"
    ),
    "die Kreditkarte": (
        "karta kredytowa",
        "W podróży za zakupy płacę zazwyczaj kartą kredytową."
    ),
    "kontaktlos": (
        "zbliżeniowo",
        "Kwoty poniżej pięćdziesięciu euro można płacić zbliżeniowo."
    ),
    "die Münze": (
        "moneta",
        "On wrzuca monetę dwueurową do parkomatu."
    ),
    "der Geldschein": (
        "banknot",
        "Ona starannie składa banknot o nominale dziesięciu euro."
    ),
    "das Wechselgeld": (
        "reszta",
        "Proszę nie zapomnieć o swojej reszcie przy kasie."
    ),
    "der Wechselkurs": (
        "kurs walutowy",
        "Przed podróżą za granicę sprawdzamy aktualny kurs walutowy."
    ),
    "das Paket": (
        "paczka",
        "Kurier dostarcza ciężką paczkę pod drzwi domu."
    ),

    # 850-899
    "der Briefumschlag": (
        "koperta",
        "Ona wkłada list do białej koperty."
    ),
    "die Briefmarke": (
        "znaczek pocztowy",
        "Przyklej proszę znaczek pocztowy w prawym górnym rogu listu."
    ),
    "der Absender": (
        "nadawca",
        "W lewym górnym rogu koperty znajduje się adres nadawcy."
    ),
    "der Empfänger": (
        "odbiorca",
        "Paczka jest przeznaczona dla wskazanego odbiorcy."
    ),
    "die Packstation": (
        "paczkomat",
        "Odbieram swoją przesyłkę po pracy z paczkomatu."
    ),
    "das Einschreiben": (
        "list polecony",
        "Ważne dokumenty najbezpieczniej wysyła się listem poleconym."
    ),
    "die Postleitzahl": (
        "kod pocztowy",
        "Proszę podać swój pięciocyfrowy kod pocztowy."
    ),
    "die Zahnpasta": (
        "pasta do zębów",
        "Ta pasta do zębów skutecznie chroni przed próchnicą."
    ),
    "das Duschgel": (
        "żel pod prysznic",
        "Żel pod prysznic pachnie przyjemnie świeżymi cytrynami."
    ),
    "das Shampoo": (
        "szampon",
        "Łagodny szampon pielęgnuje skórę głowy i włosy."
    ),
    "die Seife": (
        "mydło",
        "Umyj dokładnie ręce ciepłą wodą i mydłem."
    ),
    "die Feuchtigkeitscreme": (
        "krem nawilżający",
        "Po prysznicu nakłada krem nawilżający."
    ),
    "das Deodorant": (
        "dezodorant",
        "Dobry dezodorant zapewnia świeżość przez cały dzień."
    ),
    "das Taschentuch": (
        "chusteczka higieniczna",
        "Masz dla mnie chusteczkę higieniczną?"
    ),
    "der Rasierer": (
        "maszynka do golenia",
        "On regularnie wymienia ostrza w swojej maszynce do golenia."
    ),
    "der Rasierschaum": (
        "pianka do golenia",
        "Rozprowadź łagodnie piankę do golenia na policzkach."
    ),
    "die Nagelschere": (
        "nożyczki do paznokci",
        "Małymi nożyczkami do paznokci obcina się paznokcie precyzyjnie."
    ),
    "die Nagelfeile": (
        "pilniczek do paznokci",
        "Ona ostrożnie wygładza paznokcie pilniczkiem do paznokci."
    ),
    "die Sonnencreme": (
        "krem do opalania",
        "Na urlopie regularnie smarujemy się kremem do opalania."
    ),
    "der Lippenbalsam": (
        "balsam do ust",
        "Zimą balsam do ust chroni przed spierzchniętymi wargami."
    ),
    "das Wattepad": (
        "płatek kosmetyczny",
        "Do demakijażu używa miękkiego płatka kosmetycznego."
    ),
    "das Wattestäbchen": (
        "patyczek higieniczny",
        "Patyczki higieniczne powinny znaleźć się w szafce łazienkowej."
    ),
    "der Umtausch": (
        "wymiana towaru",
        "Wymiana towaru jest możliwa w ciągu czternastu dni."
    ),
    "die Reklamation": (
        "reklamacja",
        "Z powodu wady klient złożył reklamację."
    ),
    "die Garantie": (
        "gwarancja",
        "Na to urządzenie elektryczne obowiązują dwa lata gwarancji producenta."
    ),
    "die Rückerstattung": (
        "zwrot pieniędzy",
        "Kwota zostanie zaksięgowana na Twoją korzyść jako zwrot pieniędzy."
    ),
    "der Rabatt": (
        "rabat",
        "Z tą kartą klienta otrzymujesz dziesięć procent rabatu."
    ),
    "das Schnäppchen": (
        "okazja cenowa",
        "Ten wysokiej jakości płaszcz był prawdziwą okazją cenową."
    ),
    "die Beschwerde": (
        "skarga",
        "Skarga została rozpatrzona przez dyrekcję."
    ),
    "die Kopfschmerzen": (
        "ból głowy",
        "Po długim dniu pracy mam lekki ból głowy."
    ),
    "die Halsschmerzen": (
        "ból gardła",
        "Ciepła herbata rumiankowa z miodem łagodzi ból gardła."
    ),
    "die Magenschmerzen": (
        "ból żołądka",
        "Tłuste jedzenie często powoduje u niego ból żołądka."
    ),
    "der Schwindel": (
        "zawroty głowy",
        "Przy szybkim wstawaniu dopadły ją krótkie zawroty głowy."
    ),
    "die Übelkeit": (
        "nudności",
        "Świeże powietrze zazwyczaj dobrze pomaga na nagłe nudności."
    ),
    "der Husten": (
        "kaszel",
        "On od trzech dni ma suchy, uporczywy kaszel."
    ),
    "der Schnupfen": (
        "katar",
        "Przy silnym katarze oddychanie przez nos przychodzi z trudem."
    ),
    "die Heiserkeit": (
        "chrypka",
        "Po głośnym koncercie wokalista cierpiał na chrypkę."
    ),
    "das Fieberthermometer": (
        "termometr lekarski",
        "Cyfrowy termometr lekarski mierzy temperaturę w ułamku sekundy."
    ),
    "die erhöhte Temperatur": (
        "podwyższona temperatura",
        "Dziecko ma dziś wieczorem nieznacznie podwyższoną temperaturę."
    ),
    "der Schüttelfrost": (
        "dreszcze",
        "Nagłe dreszcze są często pierwszą oznaką grypy."
    ),
    "die Entzündung": (
        "stan zapalny",
        "Lekarz leczy stan zapalny maścią leczniczą."
    ),
    "die Infektion": (
        "infekcja",
        "Regularne mycie rąk niezawodnie chroni przed infekcją."
    ),
    "ansteckend": (
        "zakaźny",
        "Dopóki ma Pan gorączkę, jest Pan zakaźny dla otoczenia."
    ),
    "sich schonen": (
        "oszczędzać się",
        "Podczas przeziębienia należy leżeć w łóżku i oszczędzać się."
    ),
    "die Arztpraxis": (
        "gabinet lekarski",
        "Gabinet lekarski jest otwierany w poniedziałki już o siódmej rano."
    ),
    "das Wartezimmer": (
        "poczekalnia",
        "Pacjenci siedzą cierpliwie w jasnej poczekalni."
    ),
    "die Versichertenkarte": (
        "karta ubezpieczenia",
        "Proszę przedłożyć elektroniczną kartę ubezpieczenia."
    ),
    "der Termin": (
        "termin wizyty",
        "Uzgodniłem stały termin wizyty na najbliższy wtorek."
    ),
    "die Untersuchung": (
        "badanie",
        "Szczegółowe badanie nie wykazało niczego niepokojącego."
    ),
    "der Blutdruck": (
        "ciśnienie krwi",
        "Pielęgniarka mierzy ciśnienie krwi na lewym ramieniu."
    ),

    # 900-949
    "der Puls": (
        "puls",
        "Po krótkiej chwili odpoczynku puls bije znowu normalnie."
    ),
    "das Stethoskop": (
        "stetoskop",
        "Lekarka bada płuca stetoskopem."
    ),
    "das Rezept (Medizin)": (
        "recepta",
        "Lekarz wystawia Panu receptę na tabletki."
    ),
    "die Apotheke": (
        "apteka",
        "Apteka przy rynku pełni dziś ostry dyżur."
    ),
    "die Packungsbeilage": (
        "ulotka dołączona do opakowania",
        "Przed zażyciem leku przeczytaj uważnie ulotkę dołączoną do opakowania."
    ),
    "die Nebenwirkung": (
        "skutek uboczny",
        "Ten dobrze tolerowany lek prawie nie ma znanych skutków ubocznych."
    ),
    "die Dosierung": (
        "dawkowanie",
        "Stosuj się ściśle do dawkowania przepisanego przez lekarza."
    ),
    "das Schmerzmittel": (
        "środek przeciwbólowy",
        "Środek przeciwbólowy zaczyna działać zazwyczaj w ciągu pół godziny."
    ),
    "der Hustensaft": (
        "syrop na kaszel",
        "Weź wieczorem przed snem łyżkę syropu na kaszel."
    ),
    "das Heftpflaster": (
        "plaster opatrunkowy",
        "Przyklej proszę plaster opatrunkowy na małe skaleczenie."
    ),
    "der Verband": (
        "opatrunek",
        "Pielęgniarka zakłada czysty opatrunek na kostkę."
    ),
    "die Wundsalbe": (
        "maść na rany",
        "Maść na rany przyspiesza gojenie się rany na skórze."
    ),
    "die Desinfektion": (
        "dezynfekcja",
        "Przed założeniem opatrunku ważna jest staranna dezynfekcja."
    ),
    "der Verbandskasten": (
        "apteczka pierwszej pomocy",
        "W aucie musi zawsze leżeć kompletna apteczka pierwszej pomocy."
    ),
    "der Notruf": (
        "numer alarmowy",
        "W nagłych wypadkach w całej Europie wybiera się numer alarmowy 112."
    ),
    "die Erste Hilfe": (
        "pierwsza pomoc",
        "Każdy kierowca powinien potrafić udzielić pierwszej pomocy."
    ),
    "bluten": (
        "krwawić",
        "Otarcie na kolanie na szczęście przestało krwawić."
    ),
    "die Zahnarztpraxis": (
        "gabinet stomatologiczny",
        "Dwa razy do roku chodzę na kontrolę do gabinetu stomatologicznego."
    ),
    "die Zahnseide": (
        "nić dentystyczna",
        "Nić dentystyczna oczyszcza wąskie przestrzenie między zębami."
    ),
    "das Zahnfleisch": (
        "dziąsła",
        "Regularna pielęgnacja trwale wzmacnia dziąsła."
    ),
    "die Zahnfüllung": (
        "plomba",
        "Stomatolog założył małą białą plombę."
    ),
    "der Backenzahn": (
        "ząb trzonowy",
        "Ząb trzonowy w górnej szczęce jest bardzo wrażliwy na zimno."
    ),
    "die Mundspülung": (
        "płyn do płukania ust",
        "Płyn do płukania ust o działaniu przeciwbakteryjnym zapewnia świeży oddech."
    ),
    "die Zahnschmerzen": (
        "ból zęba",
        "Przy nagłym bólu zęba należy szybko udać się do stomatologa."
    ),
    "das Handgelenk": (
        "nadgarstek",
        "Ona nosi elegancki zegarek na lewym nadgarstku."
    ),
    "der Ellbogen": (
        "łokieć",
        "Uderzył się boleśnie w łokieć o kant stołu."
    ),
    "das Kniegelenk": (
        "staw kolanowy",
        "Podczas joggingu staw kolanowy jest mocno obciążony."
    ),
    "der Knöchel": (
        "kostka",
        "Wędrując po nierównej ścieżce, skręcił kostkę."
    ),
    "die Ferse": (
        "pięta",
        "Nowe buty obcierają z tyłu na pięcie."
    ),
    "die Wirbelsäule": (
        "kręgosłup",
        "Ukierunkowana gimnastyka wzmacnia mięśnie wzdłuż kręgosłupa."
    ),
    "das Schulterblatt": (
        "łopatka",
        "On odczuwa lekkie napięcie pod prawą łopatką."
    ),
    "die Hüfte": (
        "biodro",
        "Stojąc, opiera swobodnie ręce na biodrach."
    ),
    "das Herz": (
        "serce",
        "Ludzkie serce bije około siedemdziesięciu razy na minutę."
    ),
    "die Lunge": (
        "płuca",
        "Głęboki wdech świeżego leśnego powietrza dobrze robi na płuca."
    ),
    "der Magen": (
        "żołądek",
        "Po obfitej uczcie przepełniony żołądek się buntuje."
    ),
    "die Leber": (
        "wątroba",
        "Wątroba jest najważniejszym organem odtruwającym organizm."
    ),
    "die Nieren": (
        "nerki",
        "Picie dostatecznej ilości wody wspomaga nerki."
    ),
    "das Gehirn": (
        "mózg",
        "Mózg potrzebuje dużo tlenu do intensywnej pracy."
    ),
    "die Blutgefäße": (
        "naczynia krwionośne",
        "Regularna aktywność ruchowa utrzymuje naczynia krwionośne w elastyczności."
    ),
    "die Ausdauer": (
        "wytrzymałość",
        "Regularna jazda na rowerze zauważalnie zwiększa wytrzymałość."
    ),
    "der Muskelkater": (
        "zakwasy",
        "Po pierwszym treningu miał zakwasy przez dwa dni."
    ),
    "das Dehnen": (
        "rozciąganie",
        "Łagodne rozciąganie po biegu zapobiega przykurczom mięśni."
    ),
    "das Aufwärmen": (
        "rozgrzewka",
        "Przed każdym sportem niezbędna jest pięciominutowa rozgrzewka."
    ),
    "die Entspannung": (
        "odprężenie",
        "Ciepła kąpiel pod wieczór sprzyja głębokiemu odprężeniu."
    ),
    "der Tiefschlaf": (
        "głęboki sen",
        "Nieprzerwany głęboki sen jest konieczny do pełnej regeneracji."
    ),
    "das Wohlbefinden": (
        "dobre samopoczucie",
        "Zdrowe żywienie w kluczowy sposób wpływa na dobre samopoczucie."
    ),
    "die frische Luft": (
        "świeże powietrze",
        "Żwawy spacer na świeżym powietrzu orzeźwia umysł."
    ),
    "die Ballaststoffe": (
        "błonnik",
        "Produkty z pełnego ziarna i rośliny strączkowe zawierają cenny błonnik."
    ),
    "die Vitamine": (
        "witaminy",
        "Świeże owoce dostarczają organizmowi życiodajnych witamin."
    ),
    "das Eiweiß": (
        "białko",
        "Twaróg, ryby i jajka dostarczają pełnowartościowego białka zwierzęcego."
    ),

    # 950-999
    "die Kalorien": (
        "kalorie",
        "Pływając, spala się zaskakująco wiele kalorii."
    ),
    "der Blutzucker": (
        "cukier we krwi",
        "Chleb razowy powoduje jedynie powolny wzrost cukru we krwi."
    ),
    "das Übergewicht": (
        "nadwaga",
        "Częsty ruch to skuteczny sposób na nadwagę."
    ),
    "die Flüssigkeitszufuhr": (
        "nawodnienie",
        "W gorące letnie dni odpowiednie nawodnienie jest kluczowe."
    ),
    "die Schwiegereltern": (
        "teściowie",
        "W niedzielę jesteśmy zaproszeni do moich teściów na kawę."
    ),
    "der Schwiegersohn": (
        "zięć",
        "Jej zięć ma świetny kontakt z całą rodziną."
    ),
    "die Schwiegertochter": (
        "synowa",
        "Synowa przyniosła ze sobą własnoręcznie upieczoną szarlotkę."
    ),
    "die Urgroßmutter": (
        "prababcia",
        "Moja prababcia obchodziła w tym roku swoje dziewięćdziesiąte urodziny."
    ),
    "der Urgroßvater": (
        "pradziadek",
        "Pradziadek chętnie opowiada dzieciom dawne opowieści."
    ),
    "die Patentante": (
        "matka chrzestna",
        "Moja matka chrzestna podarowała mi wartościową książkę na ukończenie szkoły."
    ),
    "der Patenonkel": (
        "ojciec chrzestny",
        "Jego ojciec chrzestny wspiera go przez całe studia."
    ),
    "die Großfamilie": (
        "rodzina wielopokoleniowa",
        "Na Boże Narodzenie cała rodzina wielopokoleniowa zbiera się w pokoju dziennym."
    ),
    "die Kindheit": (
        "dzieciństwo",
        "Z sentymentem wspominam beztroskie dzieciństwo na wsi."
    ),
    "die Jugend": (
        "młodość",
        "W młodości testuje się wiele nowych zainteresowań i pasji."
    ),
    "das Erwachsenenalter": (
        "wiek dorosły",
        "W wieku dorosłym bierze się odpowiedzialność za własne życie."
    ),
    "der Ruhestand": (
        "emerytura",
        "Na zasłużonej emeryturze ta para dużo podróżuje po Europie."
    ),
    "der Geburtstag": (
        "urodziny",
        "Świętujemy jego trzydzieste urodziny wielką prywatką."
    ),
    "die Generation": (
        "pokolenie",
        "Każde pokolenie ma odrębne wartości i zapatrywania."
    ),
    "die Lebenserfahrung": (
        "doświadczenie życiowe",
        "Wraz z wiekiem człowiek zdobywa cenne doświadczenie życiowe."
    ),
    "die Freundschaft": (
        "przyjaźń",
        "Prawdziwa przyjaźń przetrwa nawet na największe odległości."
    ),
    "das Vertrauen": (
        "zaufanie",
        "Wzajemne zaufanie to fundament każdej udanej relacji."
    ),
    "sich verlassen auf": (
        "polegać na",
        "Na mojej najlepszej przyjaciółce mogę bezgranicznie polegać."
    ),
    "die Ehrlichkeit": (
        "uczciwość",
        "Uczciwość popłaca najbardziej, zwłaszcza między przyjaciółmi."
    ),
    "die Hilfsbereitschaft": (
        "uczynność",
        "Wszyscy sąsiedzi niezwykle cenią jej bezinteresowną uczynność."
    ),
    "das Geheimnis": (
        "tajemnica",
        "On nigdy nie zdradziłby powierzonej mu tajemnicy."
    ),
    "zusammenhalten": (
        "trzymać się razem",
        "W trudnych chwilach przyjaciele powinni mocno trzymać się razem."
    ),
    "kennenlernen": (
        "poznać",
        "Poznaliśmy się pięć lat temu podczas studiów na uniwersytecie."
    ),
    "die Verliebtheit": (
        "zakochanie",
        "Na starcie nowego związku stan zakochania bywa wyjątkowo intensywny."
    ),
    "die Zuneigung": (
        "sympatia",
        "Okazywał swoją sympatię poprzez drobne, życzliwe gesty."
    ),
    "die Verlobung": (
        "zaręczyny",
        "Podczas romantycznej kolacji we dwoje ogłosili swoje zaręczyny."
    ),
    "die Hochzeit": (
        "ślub",
        "Ślub odbył się w zabytkowym ratuszu na starym mieście."
    ),
    "der Ehepartner": (
        "małżonek",
        "Ona w każdej sprawie szanuje zdanie swojego małżonka."
    ),
    "der Hochzeitstag": (
        "rocznica ślubu",
        "Z okazji dziesiątej rocznicy ślubu wybrali się na wspólny krótki wyjazd."
    ),
    "die Trennung": (
        "rozstanie",
        "Po długim namyśle oboje postanowili pójść na uczciwe rozstanie."
    ),
    "die Dankbarkeit": (
        "wdzięczność",
        "Czuję bezgraniczną wdzięczność za twoją nieocenioną pomoc."
    ),
    "die Erleichterung": (
        "ulga",
        "Po zdanym egzaminie poczuła nieopisaną ulgę."
    ),
    "die Vorfreude": (
        "radość oczekiwania",
        "Radość oczekiwania na letnie wakacje sprawia, że tydzień w pracy mija szybciej."
    ),
    "die Begeisterung": (
        "zachwyt",
        "Publiczność nie kryła zachwytu i klaskała przez długie minuty po spektaklu."
    ),
    "die Zufriedenheit": (
        "zadowolenie",
        "Spokojny wieczór z wciągającą książką przynosi prawdziwe zadowolenie."
    ),
    "die Hoffnung": (
        "nadzieja",
        "Nigdy nie tracimy nadziei na szczęśliwy finał."
    ),
    "der Optimismus": (
        "optymizm",
        "Ze zdrowym optymizmem bez trudu pokonuje się wiele trudnych sytuacji."
    ),
    "das Selbstvertrauen": (
        "pewność siebie",
        "Kolejne sukcesy systematycznie budują pewność siebie."
    ),
    "die Enttäuschung": (
        "rozczarowanie",
        "Przegrana w meczu finałowym była bolesnym rozczarowaniem dla całej drużyny."
    ),
    "die Eifersucht": (
        "zazdrość",
        "Bezpodstawna zazdrość potrafi zniszczyć nawet najlepszy związek."
    ),
    "der Neid": (
        "zawiść",
        "Zawiść o cudze osiągnięcia do niczego w życiu nie prowadzi."
    ),
    "die Scham": (
        "wstyd",
        "Ze wstydu z powodu tej gafy oblał się rumieńcem."
    ),
    "die Reue": (
        "skrucha",
        "Okazał szczerą skruchę i od razu za wszystko przeprosił."
    ),
    "die Verzweiflung": (
        "rozpacz",
        "W głębokiej rozpaczy zwróciła się o pomoc do ośrodka poradnictwa."
    ),
    "die Ungeduld": (
        "niecierpliwość",
        "Z niecierpliwości krążył nerwowo po pokoju z kąta w kąt."
    ),
    "zuverlässig": (
        "niezawodny",
        "Ona jest niezwykle niezawodną współpracowniczką w biurze."
    )
}

def main():
    ref_path = "scripts/ref_pl_batch4.json"
    out_path = "scripts/data_pl_batch4.json"

    with open(ref_path, "r", encoding="utf-8") as f:
        ref_items = json.load(f)

    if len(ref_items) != 250:
        raise ValueError(f"Expected 250 ref items, found {len(ref_items)}")

    result = []
    missing_keys = []

    for item in ref_items:
        front = item["front"]
        example_de = item["exampleDE"]
        if front not in CARDS:
            missing_keys.append(front)
            continue
        
        back, example = CARDS[front]
        ipa = polish_ipa(back)
        
        result.append({
            "front": front,
            "back": back,
            "ipa": ipa,
            "example": example,
            "exampleDE": example_de
        })

    if missing_keys:
        raise ValueError(f"Missing cards for: {missing_keys}")

    if len(result) != 250:
        raise ValueError(f"Expected 250 output cards, got {len(result)}")

    # Validation
    for idx, card in enumerate(result):
        for field in ["front", "back", "ipa", "example", "exampleDE"]:
            if not card.get(field):
                raise ValueError(f"Card {idx} missing field {field}: {card}")
            if not isinstance(card[field], str) or not card[field].strip():
                raise ValueError(f"Card {idx} field {field} is empty or not string: {card}")

    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    print(f"Successfully generated and validated {len(result)} cards in {out_path}.")

if __name__ == "__main__":
    main()
