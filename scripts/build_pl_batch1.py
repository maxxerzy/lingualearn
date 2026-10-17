# -*- coding: utf-8 -*-
"""
Generator for scripts/data_pl_batch1.json (Items 0..249)
"""
import json
import re
import sys
from polish_ipa import polish_ipa

# Table of 250 items: index -> (back, example)
BATCH1_DATA = [
    # 0..9 Greetings and common expressions
    ("witamy", "Witamy w naszym nowym domu!"),
    ("zgoda", "Zgoda, spotkajmy się o godzinie siódmej."),
    ("słucham?", "Słucham? Nie zrozumiałem pana."),
    ("nie ma problemu", "Nie ma problemu, pomogę ci jutro."),
    ("powodzenia", "Powodzenia na jutrzejszym egzaminie!"),
    ("szczęśliwej podróży", "Szczęśliwej podróży i dzwoń do nas częściej!"),
    ("przykro mi", "Przykro mi, że spóźniłem się na spotkanie."),
    ("wszystkiego najlepszego", "Wszystkiego najlepszego z okazji urodzin!"),
    ("do zobaczenia wkrótce", "Do zobaczenia wkrótce, widzimy się w przyszłym tygodniu!"),
    ("smacznego", "Smacznego, zupa jest jeszcze gorąca!"),

    # 10..29 Numbers
    ("jeden", "Mam jednego brata."),
    ("dwa", "Widzę dwa domy na ulicy."),
    ("trzy", "Na stole stoją trzy filiżanki."),
    ("cztery", "W klasie są cztery okna."),
    ("pięć", "Potrzebujemy pięciu minut."),
    ("sześć", "Kotka ma sześć kociąt."),
    ("siedem", "Tydzień ma siedem dni."),
    ("osiem", "Śpię osiem godzin na dobę."),
    ("dziewięć", "Pociąg przyjeżdża o dziewiątej rano."),
    ("dziesięć", "U rąk jest dziesięć palców."),
    ("jedenaście", "Lekcja zaczyna się o godzinie jedenastej."),
    ("dwanaście", "Rok ma dwanaście miesięcy."),
    ("trzynaście", "Skończył trzynaście lat."),
    ("czternaście", "W domu jest czternaście pokoi."),
    ("piętnaście", "Musimy poczekać jeszcze piętnaście minut."),
    ("szesnaście", "Ona ma szesnaście lat."),
    ("siedemnaście", "Na imprezie było siedemnastu gości."),
    ("osiemnaście", "Mając osiemnaście lat, ukończył szkołę."),
    ("dziewiętnaście", "Samolot odleci o godzinie dziewiętnastej."),
    ("dwadzieścia", "W sklepie jest dwadzieścia rodzajów sera."),

    # 30..44 Colors and descriptors
    ("waga", "Jaka jest waga tej walizki?"),
    ("czerwony", "Kupiła czerwoną sukienkę na imprezę."),
    ("niebieski", "Niebo jest dzisiaj niebieskie i czyste."),
    ("zielony", "Trawa w parku jest zielona i miękka."),
    ("żółty", "To żółte jabłko jest bardzo słodkie."),
    ("czarny", "On zawsze nosi czarną kurtkę."),
    ("biały", "Biały śnieg pokrył wszystkie ulice."),
    ("szary", "Szare niebo zapowiada deszcz."),
    ("brązowy", "Ma brązowe oczy i ciemne włosy."),
    ("pomarańczowy", "Pomarańczowy zachód słońca był bardzo piękny."),
    ("liliowy", "Liliowe kwiaty rosną przy płocie."),
    ("różowy", "Dziecko jest ubrane w różową koszulę."),
    ("fioletowy", "Fioletowe winogrona są bardzo smaczne."),
    ("pomarańcza", "Pomarańcza jest bogata w witaminę C."),
    ("farba", "On potrzebuje czerwonej farby."),

    # 45..63 Family and relationships
    ("ojciec", "Mój ojciec pracuje jako lekarz w szpitalu."),
    ("matka", "Matka gotuje pyszny obiad dla całej rodziny."),
    ("brat", "Mój brat studiuje na uniwersytecie."),
    ("siostra", "Moja siostra mieszka w innym mieście."),
    ("syn", "Jej syn został przyjęty na uniwersytet medyczny."),
    ("córka", "Ich córka bardzo chętnie maluje ładne obrazy."),
    ("dziadek", "Dziadek opowiada nam ciekawe historie."),
    ("babcia", "Babcia piecze w niedziele pyszne ciasta."),
    ("wujek", "Mój wujek mieszka w Petersburgu."),
    ("ciocia", "Ciocia Masza zawsze przywozi nam prezenty."),
    ("kuzyn", "Mój kuzyn to bardzo wesoły chłopak."),
    ("kuzynka", "Kuzynka przyszła do nas w odwiedziny."),
    ("mąż", "Jej mąż pracuje jako inżynier w fabryce."),
    ("żona", "Jego żona jest bardzo dobrą i mądrą kobietą."),
    ("dziecko", "Dziecko bawi się z przyjaciółmi na podwórku."),
    ("niemowlę", "Niemowlę śpi w wózku podczas spaceru."),
    ("rodzina", "Nasza rodzina spędza weekend razem."),
    ("związek", "Oni mają dobry związek."),
    ("przyjaźń", "Ich przyjaźń trwa już wiele lat."),

    # 64..80 Body parts
    ("głowa", "Po pracy boli mnie głowa."),
    ("oko", "Ona ma piękne zielone oczy."),
    ("ucho", "On słabo słyszy na prawe ucho."),
    ("nos", "Dziecko ma katar, a nos jest zatkany."),
    ("usta", "Otwórz usta i powiedz „a”."),
    ("ząb", "Boli mnie ząb, muszę iść do lekarza."),
    ("gardło", "Po długiej pracy boli ją gardło."),
    ("ramię", "Położył jej dłoń na ramieniu."),
    ("ręka", "Złamał rękę na treningu piłki nożnej."),
    ("dłoń", "Mocno trzymała go za dłoń."),
    ("palec", "W kuchni skaleczył się nożem w palec."),
    ("brzuch", "Po obiedzie boli mnie brzuch."),
    ("noga", "Złamał nogę podczas wędrówki po górach."),
    ("kolano", "Dziecko upadło i mocno stłukło kolano."),
    ("stopa", "Po długim chodzeniu boli ją stopa."),
    ("plecy", "Po długiej pracy przy biurku bolą plecy."),
    ("serce", "Jego serce bije bardzo szybko po bieganiu."),

    # 81..106 Health and medicine
    ("chory", "Chore dziecko zostało w domu z mamą."),
    ("zdrowy", "Zdrowy tryb życia wydłuża życie."),
    ("lekarz", "Lekarz poradził mi, abym więcej odpoczywał."),
    ("pielęgniarka", "Pielęgniarka zrobiła pacjentowi zastrzyk."),
    ("szpital", "Szpital znajduje się niedaleko dworca."),
    ("apteka", "Apteka jest otwarta do dziewiątej wieczorem."),
    ("gorączka", "Dziecko ma gorączkę, proszę wezwać lekarza."),
    ("kaszel", "Silny kaszel przeszkadza mu spać w nocy."),
    ("katar", "Mam katar już trzeci dzień."),
    ("tabletka", "Weź tabletkę na ból głowy."),
    ("ból", "Ból pleców minął po masażu."),
    ("lek", "Ten lek należy zażywać po jedzeniu."),
    ("przeziębienie", "Z powodu przeziębienia został w domu."),
    ("grypa", "Zimą wiele osób choruje na grypę."),
    ("karetka", "Karetka pogotowia przyjechała po pięciu minutach."),
    ("mózg", "Mózg kontroluje całe ciało."),
    ("kontuzja", "Piłkarz doznał poważnej kontuzji."),
    ("operacja", "Operacja przebiegła pomyślnie."),
    ("szczepienie", "Lekarz wykonał szczepienie u dziecka."),
    ("alergia", "Mam alergię na koty."),
    ("powrót do zdrowia", "Życzymy panu szybkiego powrotu do zdrowia."),
    ("opatrunek", "Pielęgniarka założyła opatrunek."),
    ("leczenie", "Leczenie potrwa dwa tygodnie."),
    ("diagnoza", "Lekarz postawił dokładną diagnozę."),
    ("objaw", "Kaszel to częsty objaw przeziębienia."),
    ("zdrowie", "Zdrowie jest ważniejsze od pieniędzy."),

    # 107..116 Internal organs and body
    ("kość", "Złamał kość w ręce."),
    ("mięsień", "Po treningu boli każdy mięsień."),
    ("skóra", "Ona ma delikatną skórę."),
    ("płuca", "Palenie szkodzi płucom."),
    ("wątroba", "Alkohol jest szkodliwy dla wątroby."),
    ("nerka", "Boli go prawa nerka."),
    ("żołądek", "Po jedzeniu boli żołądek."),
    ("łokieć", "Uderzył się łokciem o stół."),
    ("oddech", "Po bieganiu stracił oddech."),
    ("puls", "Lekarz zmierzył puls pacjenta."),

    # 117..136 Clothing
    ("koszula", "Założył białą koszulę na rozmowę rekrutacyjną."),
    ("spodnie", "Te niebieskie spodnie bardzo dobrze na mnie leżą."),
    ("spódnica", "Kupiła długą czerwoną spódnicę."),
    ("sukienka", "Na przyjęciu miała na sobie piękną sukienkę."),
    ("kurtka", "Weź kurtkę, na dworze jest chłodno."),
    ("płaszcz", "Zimą nosi ciepły, długi płaszcz."),
    ("buty", "Nowe buty trochę uciskają stopę."),
    ("skarpetki", "Szukam pary czystych skarpetek w szafie."),
    ("kapelusz", "Dziadek zawsze nosi stary kapelusz."),
    ("czapka", "Załóż czapkę, na zewnątrz jest bardzo zimno."),
    ("rękawiczki", "Zimą nie wychodzę bez ciepłych rękawiczek."),
    ("pasek", "Ten skórzany pasek jest bardzo elegancki."),
    ("szalik", "Zawiązała szalik wokół szyi."),
    ("but", "Jeden but przemókł."),
    ("skarpetka", "Nie mogę znaleźć drugiej skarpetki."),
    ("rękawiczka", "Zgubiła jedną rękawiczkę."),
    ("guzik", "Przy koszuli urwał się guzik."),
    ("rękaw", "Podwinął rękawy."),
    ("garnitur", "Założył elegancki garnitur."),
    ("kozaki", "Skórzane kozaki są drogie."),

    # 137..154 Food and staples
    ("chleb", "Na śniadanie jem chleb z masłem."),
    ("masło", "Posmaruj świeży chleb masłem."),
    ("ser", "Ten ser jest bardzo smaczny i miękki."),
    ("jajko", "Codziennie gotuję jajko na śniadanie."),
    ("mięso", "Mięso musi być dobrze wysmażone przed jedzeniem."),
    ("ryba", "Na obiad zjedliśmy rybę z ryżem."),
    ("warzywa", "Warzywa są dobre dla zdrowia dzieci."),
    ("owoce", "Latem jemy dużo świeżych owoców."),
    ("jabłko", "Czerwone jabłko leży na stole."),
    ("banan", "Dzieci chętnie jedzą banany jako przekąskę."),
    ("pomidor", "Czy pomidor to warzywo czy owoc?"),
    ("ziemniak", "Ziemniak to podstawowy produkt żywnościowy w Rosji."),
    ("ryż", "Ryż dobrze pasuje do ryb i warzyw."),
    ("zupa", "Mama ugotowała na obiad pyszną zupę."),
    ("ciasto", "Na urodziny upiekła duże ciasto."),
    ("cukier", "Wsyp łyżkę cukru do herbaty."),
    ("sól", "Nie zapomnij wsypać soli do zupy."),
    ("świnia", "W gospodarstwie mieszka duża różowa świnia."),

    # 155..180 Dining and cooking
    ("jeść", "Chętnie jemy razem przy dużym stole."),
    ("głodny", "Jestem bardzo głodny, zjedzmy coś."),
    ("lód", "Na ulicach jest lód, uważaj."),
    ("menu", "Proszę przynieść menu i szklankę wody."),
    ("napiwek", "Zostawiliśmy kelnerowi dobry napiwek."),
    ("śniadanie", "Na śniadanie jemy kaszę i pijemy kawę."),
    ("obiad", "Obiad będzie gotowy za pół godziny."),
    ("kolacja", "Cała rodzina zebrała się na kolację."),
    ("przepis", "Daj mi przepis na to ciasto."),
    ("składnik", "Brakuje jednego składnika."),
    ("smak", "To danie ma przyjemny smak."),
    ("mąka", "Do ciasta potrzeba mąki."),
    ("ciasto", "Ciasto musi odpocząć przez godzinę."),
    ("przyprawa", "W szafce jest wiele różnych przypraw."),
    ("pieprz", "Dodaj trochę pieprzu."),
    ("sos", "Sos wyszedł bardzo smaczny."),
    ("rosół", "Mama gotuje rosół z kury."),
    ("deser", "Na deser były lody."),
    ("mleko", "Dziecko pije mleko każdego wieczoru."),
    ("woda", "W upale pij więcej wody."),
    ("herbata", "Wypij gorącą herbatę, a poczujesz się lepiej."),
    ("kawa", "Rano zawsze piję filiżankę kawy."),
    ("sok", "Sok pomarańczowy jest bardzo zdrowy dla organizmu."),
    ("piwo", "Wypił ze znajomymi szklankę piwa."),
    ("wino", "Do kolacji podano czerwone wino do mięsa."),
    ("pić", "Każdego dnia trzeba pić dużo wody."),

    # 181..199 Kitchen and cooking actions
    ("kuchnia", "Mama gotuje obiad w kuchni."),
    ("gotować", "W weekend tata chętnie gotuje kolację."),
    ("widelec", "Podaj mi proszę czysty widelec."),
    ("nóż", "Ten nóż jest bardzo ostry, bądź ostrożny."),
    ("łyżka", "Potrzebuję łyżki do zupy."),
    ("talerz", "Na stole stał talerz z gorącą kaszą."),
    ("filiżanka", "Wypiła filiżankę herbaty z cytryną."),
    ("szkło", "Ostrożnie, na podłodze leży potłuczone szkło."),
    ("smażyć", "Mama usmaży rybę na kolację."),
    ("piec", "Babcia lubi piec ciasta."),
    ("mieszać", "Mieszaj zupę, żeby się nie przypaliła."),
    ("przyprawić", "Nie zapomnij przyprawić mięsa."),
    ("piekarnik", "Wstaw ciasto do piekarnika."),
    ("patelnia", "Na patelni smażą się jajka."),
    ("garnek", "Woda w garnku już wrze."),
    ("wymieszać", "Wymieszaj mąkę z cukrem."),
    ("wlać", "Wlej wodę do szklanki."),
    ("dom", "Mój dom znajduje się obok parku."),
    ("drzwi", "Proszę zamknąć za sobą drzwi."),

    # 200..220 House and furniture
    ("okno", "Otwórz okno, w pokoju jest gorąco."),
    ("pokój", "W tym pokoju są dwa duże okna."),
    ("łazienka", "Łazienka w naszym mieszkaniu jest mała."),
    ("podłoga", "Podłoga w pokoju jest drewniana."),
    ("ściana", "Na ścianie wisi ładny obraz."),
    ("sufit", "Sufit na sali jest bardzo wysoki."),
    ("klucz", "Nie mogę znaleźć klucza do domu."),
    ("piwnica", "W piwnicy przechowujemy stare rzeczy."),
    ("korytarz", "Na korytarzu wisi lustro i stoi szafa."),
    ("schody", "Schody prowadzą na drugie piętro."),
    ("dach", "Po burzy trzeba naprawić dach."),
    ("stół", "Na stole leżą książki i zeszyty."),
    ("krzesło", "Weź krzesło i usiądź obok mnie."),
    ("łóżko", "Rzucił się na łóżko i zasnął."),
    ("lampa", "Lampa na stole świeci jasno."),
    ("regał", "Odłóż książki z powrotem na regał."),
    ("lustro", "Przyglądała się sobie w lustrze."),
    ("dywan", "Na podłodze w salonie leży miękki dywan."),
    ("zasłona", "Mama powiesiła nową zasłonę w kuchni."),
    ("szafa", "Wszystkie ubrania wiszą w dużej szafie."),
    ("sofa", "Wieczorami siedzimy na sofie i oglądamy filmy."),

    # 221..238 Animals
    ("pies", "Pies merda ogonem, gdy widzi swojego pana."),
    ("kot", "Kot śpi cały dzień na kanapie."),
    ("ptak", "Ptak pięknie śpiewa na gałęzi drzewa."),
    ("koń", "Koń bardzo szybko biegnie przez pole."),
    ("krowa", "Krowa daje nam mleko każdego dnia."),
    ("owca", "Owca daje nam wełnę na ubrania."),
    ("kogut", "Kogut pieje każdego ranka wcześnie rano."),
    ("mysz", "Mysz ukradła ze stołu kawałek sera."),
    ("szczur", "W piwnicy domu mieszka duży szczur."),
    ("niedźwiedź", "Latem niedźwiedź szuka miodu w lesie."),
    ("wilk", "Wilk żyje w głębokim, ciemnym lesie."),
    ("lis", "Rudy lis patrzy na nas chytrym wzrokiem."),
    ("zając", "Biały zając chowa się w śniegu w czasie zimy."),
    ("lew", "Lew jest królem zwierząt na afrykańskiej sawannie."),
    ("tygrys", "Tygrys poluje nocą w gęstej dżungli."),
    ("słoń", "Słoń to największe zwierzę na lądzie."),
    ("małpa", "Małpa skacze z gałęzi na gałąź."),
    ("wąż", "Wąż czołga się po ciepłych kamieniach."),

    # 239..249 Nature and universe
    ("drzewo", "Przed naszym domem rośnie duże drzewo."),
    ("kwiat", "Postawiła kwiatek w wazonie na parapecie."),
    ("trawa", "Dzieci bawią się w parku na zielonej trawie."),
    ("góra", "Weszliśmy na wysoką górę o wschodzie słońca."),
    ("rzeka", "Rzeka płynie przez całe miasto."),
    ("jezioro", "Spędziliśmy całe lato nad brzegiem jeziora."),
    ("morze", "Morze jest dzisiaj spokojne i piękne."),
    ("las", "W lesie rosną grzyby i jagody."),
    ("pole", "Na polu rosną pszenica i kukurydza."),
    ("słońce", "Dzisiaj słońce świeci bardzo jasno."),
    ("księżyc", "Księżyc w pełni rozświetla nocne niebo.")
]

def main():
    with open("scripts/ref_pl_batch1.json", "r", encoding="utf-8") as f:
        ref_items = json.load(f)

    if len(ref_items) != 250:
        raise ValueError(f"Expected 250 ref items, got {len(ref_items)}")

    if len(BATCH1_DATA) != 250:
        raise ValueError(f"Expected 250 batch items, got {len(BATCH1_DATA)}")

    result = []
    for i, (ref, data) in enumerate(zip(ref_items, BATCH1_DATA)):
        back, example = data
        front = ref["front"]
        exampleDE = ref["exampleDE"]
        ipa = polish_ipa(back)

        card = {
            "front": front,
            "back": back,
            "ipa": ipa,
            "example": example,
            "exampleDE": exampleDE
        }
        result.append(card)

    out_file = "scripts/data_pl_batch1.json"
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    print(f"Successfully wrote {len(result)} cards to {out_file}")

if __name__ == "__main__":
    main()
