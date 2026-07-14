// Thematische Gruppierung des deutschen Grundwortschatzes.
// Wird genutzt, um Kurs-Decks in sinnvolle Lektionen zu sortieren und
// jeder Lektion eine Überschrift (Oberbegriff) zu geben.
//
// THEME_ORDER = pädagogische Reihenfolge der Themen.
// THEME_WORDS = Thema → Liste deutscher Wörter (Karten-Vorderseiten,
//   inkl. gängiger Pluralformen). Vergleich in Kleinschreibung, wobei
//   Klammer-Zusätze wie „Fisch (Tier)" vor dem Abgleich entfernt werden.

export const THEME_WORDS = {
  'Begrüßung & Höflichkeit': ['hallo','tschüss','danke','bitte','entschuldigung','willkommen','ja','nein','gruß','wiedersehen','verzeihung','gern','okay','servus','moin','sich bedanken','begrüßen','sich verabschieden','einverstanden'],
  'Redewendungen': ['guten morgen','guten tag','guten abend','gute nacht','auf wiedersehen','bis bald','bis morgen','wie geht es dir?','es tut mir leid','kein problem','viel glück','gute reise','gute besserung','herzlichen glückwunsch','guten appetit','wie bitte?','hilfe!','einen moment bitte','ich heiße…','ich liebe dich','ich verstehe nicht','ich bin hungrig','ich bin müde','ich habe durst','wo ist…?','wie viel kostet das?'],
  'Zahlen': ['null','eins','ein','eine','zwei','drei','vier','fünf','sechs','sieben','acht','neun','zehn','elf','zwölf','dreizehn','vierzehn','fünfzehn','sechzehn','siebzehn','achtzehn','neunzehn','zwanzig','dreißig','vierzig','fünfzig','sechzig','siebzig','achtzig','neunzig','hundert','tausend','million','milliarde','erste','zweite','dritte','zahl','nummer','ziffer','dutzend','hälfte','viertel','drittel','doppelt','menge','teil','maß','gewicht'],
  'Farben': ['farbe','farben','rot','blau','grün','gelb','schwarz','weiß','braun','orange','rosa','grau','lila','violett','bunt','golden','silbern','beige','türkis'],
  'Familie & Menschen': ['familie','mutter','vater','mama','papa','eltern','kind','kinder','baby','sohn','tochter','bruder','schwester','geschwister','oma','opa','großmutter','großvater','großeltern','enkel','tante','onkel','cousin','cousine','neffe','nichte','mann','frau','junge','mädchen','person','leute','mensch','menschen','herr','erwachsene','freund','freundin','freunde','freundschaft','nachbar','nachbarin','gast','ehemann','ehefrau','ehepaar','paar','verwandte','name','vorname','beziehung','gesellschaft','volk','bürger'],
  'Körper & Gesundheit': ['körper','kopf','haar','haare','gesicht','stirn','auge','augen','ohr','ohren','nase','mund','lippe','lippen','zahn','zähne','zunge','wange','kinn','hals','nacken','schulter','arm','arme','hand','hände','handgelenk','finger','daumen','knöchel','ellbogen','bauch','rücken','brust','herz','lunge','leber','niere','magen','muskel','bein','beine','knie','fuß','füße','zeh','haut','knochen','blut','gehirn','atem','atmen','puls','krank','gesund','gesundheit','krankheit','schmerz','fieber','husten','erkältung','schnupfen','grippe','allergie','impfung','operation','behandlung','genesung','heilmittel','medikament','medizin','pille','tablette','spritze','verband','wunde','verletzung','sich verletzen','heilen','diagnose','symptom','patient','arzt','ärztin','zahnarzt','krankenschwester','krankenwagen','krankenhaus','apotheke','apotheker','notfall','übelkeit','schwindel','rollstuhl','diät','schwäche'],
  'Kleidung': ['kleidung','kleider','hemd','bluse','hose','jeans','rock','kleid','pullover','pulli','jacke','mantel','anzug','krawatte','schuh','schuhe','stiefel','sandale','sandalen','socke','socken','strumpf','unterwäsche','mütze','hut','kappe','schal','handschuh','handschuhe','gürtel','kragen','ärmel','tasche','handtasche','brille','sonnenbrille','ring','kette','schmuck','knopf','reißverschluss','größe','mode','t-shirt'],
  'Essen': ['essen','nahrung','mahlzeit','frühstück','mittagessen','abendessen','hunger','hungrig','brot','brötchen','butter','käse','wurst','schinken','fleisch','huhn','hühnchen','hähnchen','rind','schwein','fisch','ei','eier','suppe','brühe','salat','gemüse','obst','frucht','früchte','apfel','birne','banane','orange','zitrone','erdbeere','traube','kirsche','pfirsich','melone','ananas','feige','olive','tomate','gurke','kartoffel','karotte','möhre','zwiebel','knoblauch','pilz','paprika','reis','nudeln','pasta','pizza','getreide','weizen','gerste','kuchen','torte','keks','schokolade','bonbon','eis','joghurt','honig','marmelade','zucker','salz','pfeffer','gewürz','essig','öl','mehl','teig','soße','sauce','senf','geschmack','lecker','süß','sauer','salzig','bitter','snack','dessert','nachtisch','vorspeise','hauptgericht','portion','rezept','zutat','speisekarte','gericht','trinkgeld'],
  'Trinken': ['trinken','getränk','durst','wasser','milch','kaffee','tee','saft','limonade','cola','bier','wein','sekt','wodka','whisky','cocktail','schnaps','kakao','smoothie','most'],
  'Küche & Geschirr': ['küche','herd','ofen','backofen','kühlschrank','spüle','geschirr','teller','schüssel','tasse','becher','glas','gläser','flasche','kanne','topf','pfanne','messer','gabel','löffel','besteck','serviette','tablett','brett','mixer','wasserkocher','kaffeemaschine','toaster','braten','grillen','kochen','backen','rühren','kneten','würzen','mischen','gießen','schälen','servieren','probieren'],
  'Haus & Wohnen': ['haus','häuser','wohnung','zuhause','heim','zimmer','raum','wohnzimmer','schlafzimmer','badezimmer','bad','flur','keller','dachboden','garage','balkon','terrasse','garten','tür','türen','fenster','wand','wände','decke','boden','dach','treppe','stufe','aufzug','fahrstuhl','schlüssel','klingel','briefkasten','miete','vermieter','mauer'],
  'Möbel & Haushalt': ['möbel','tisch','stuhl','sessel','sofa','couch','bett','schrank','regal','kommode','spiegel','lampe','licht','kerze','teppich','vorhang','kissen','bild','rahmen','vase','wecker','staubsauger','waschmaschine','bügeleisen','besen','eimer','seife','handtuch','zahnbürste','kamm','bürste','müll','abfall'],
  'Tiere': ['tier','tiere','hund','katze','pferd','pony','kuh','rind','stier','kalb','schwein','ferkel','schaf','lamm','ziege','esel','huhn','hahn','ente','gans','taube','vogel','vögel','fisch','maus','ratte','hase','kaninchen','löwe','tiger','bär','wolf','fuchs','hirsch','elefant','affe','giraffe','zebra','krokodil','schlange','frosch','schildkröte','biene','fliege','mücke','ameise','spinne','schmetterling','wurm','käfer','delfin','wal','hai','pinguin','eule','adler','herde'],
  'Natur & Pflanzen': ['natur','schatten','welt','landschaft','schlamm','pflanze','pflanzen','baum','bäume','blume','blumen','blatt','blätter','wurzel','ast','zweig','rinde','knospe','same','samen','gras','busch','strauch','wald','dschungel','wiese','feld','berg','berge','gebirge','gipfel','hügel','tal','ebene','fluss','bach','see','meer','ozean','strand','insel','küste','wüste','sumpf','höhle','stein','fels','felsen','sand','erde','boden','höhe','tiefe','himmel','sonne','mond','stern','sterne','gestirn','wolke','wolken','rose','tulpe','pilz','wald'],
  'Wetter & Jahreszeiten': ['wetter','klima','regen','schnee','sturm','wind','nebel','gewitter','blitz','donner','hagel','eis','frost','hitze','kälte','temperatur','grad','regenbogen','regenschirm','tau','jahreszeit','frühling','sommer','herbst','winter','sonnenschein'],
  'Umwelt & Naturereignisse': ['umwelt','feuer','umweltverschmutzung','verschmutzung','recycling','klimawandel','naturkatastrophe','erdbeben','vulkan','überschwemmung','flut','ebbe','dürre','welle','woge','wasserfall','quelle','brunnen','rauch','luft','asche','staub','energie','rohstoff'],
  'Landwirtschaft': ['landwirtschaft','hirte','bauernhof','acker','feld','ernte','saat','pflug','sichel','schnitter','scheune','stall','weide','heu','stroh','furche','landgut','weinberg','winzer','kelter','gärtner','farmer','bauer'],
  'Zeit & Kalender': ['zeit','jetzt','bald','später','früher','sofort','uhr','uhrzeit','stunde','minute','sekunde','moment','augenblick','zeitpunkt','tag','tage','nacht','mitternacht','morgen','vormittag','mittag','nachmittag','abend','dämmerung','morgengrauen','sonnenaufgang','sonnenuntergang','woche','wochenende','montag','dienstag','mittwoch','donnerstag','freitag','samstag','sonntag','monat','januar','februar','märz','april','mai','juni','juli','august','september','oktober','november','dezember','jahr','jahre','jahrzehnt','jahrhundert','zeitalter','epoche','dauer','frist','heute','gestern','vorgestern','übermorgen','vergangenheit','gegenwart','zukunft','ewigkeit','datum','termin','kalender','feiertag','geburtstag','täglich','wöchentlich','monatlich','jährlich','früh','spät'],
  'Reisen & Verkehr': ['reise','reisen','reisender','reisende','tourist','urlaub','ferien','auto','wagen','bus','zug','bahn','u-bahn','straßenbahn','flugzeug','flotte','schiff','boot','fähre','segel','ruder','fahrrad','rad','bike','motorrad','roller','taxi','taxifahrer','lkw','traktor','straße','weg','autobahn','kreuzung','ampel','brücke','tunnel','bahnhof','flughafen','hafen','haltestelle','gleis','abfahrt','ankunft','verspätung','verspätet','ticket','fahrkarte','koffer','gepäck','rucksack','landkarte','pass','reisepass','grenze','hotel','zelt','spaziergang'],
  'Stadt & Gebäude': ['stadt','stadtzentrum','zentrum','dorf','land','ausland','ort','platz','markt','geschäft','laden','supermarkt','bäckerei','metzgerei','bank','post','adresse','kirche','tempel','turm','schloss','palast','burg','museum','ausstellung','theater','kino','restaurant','café','bar','krankenhaus','schule','universität','bibliothek','park','zoo','stadion','fabrik','büro','gebäude','rathaus','amt','bürgersteig','ecke'],
  'Schule & Bildung': ['schule','bildung','klasse','klassenzimmer','unterricht','lektion','pause','lehrer','lehrerin','schüler','schülerin','student','studentin','professor','tafel','kreide','heft','buch','bücher','stift','bleistift','kugelschreiber','füller','radiergummi','lineal','schere','papier','mappe','ordner','ranzen','schultasche','hausaufgabe','prüfung','prüfungsangst','test','übung','note','frage','antwort','wort','wörter','wörterbuch','satz','buchstabe','silbe','text','beispiel','regel','fehler','irrtum','thema','fach','sprache','grammatik','kurs','kapitel','vorlesung','studium'],
  'Wissenschaft & Studium': ['wissenschaft','weltall','wissenschaftler','forschung','theorie','beweis','beweisen','experiment','labor','physik','chemie','biologie','mathematik','geografie','geographie','erdkunde','erdkreis','formel','element','atom','zelle','schwerkraft','entdeckung','erfindung','idee','lösung','ergebnis','wirklichkeit','wahrnehmung'],
  'Kunst & Kultur': ['kunst','künstler','gemälde','skulptur','bild','pinsel','zeichnung','zeichnen','malen','maler','roman','gedicht','dichter','dichtung','dichten','schriftsteller','geschichte','kapitel','vers','sprichwort','melodie','rhythmus','klang','chor','orchester','instrument','bühne','vorstellung','auftritt','publikum','schauspieler','sänger','singen','tänzer','muster','form','gestalt','schönheit'],
  'Arbeit & Beruf': ['arbeit','bäcker','meister','beruf','job','büro','chef','chefin','kollege','kollegin','firma','unternehmen','betrieb','besprechung','projekt','aufgabe','pflicht','dokument','vertrag','gehalt','lohn','sold','arbeiter','angestellte','beamter','koch','köchin','kellner','kellnerin','verkäufer','verkäuferin','kassiererin','sekretärin','anwalt','richter','polizist','polizistin','polizei','feuerwehrmann','soldat','pilot','fahrer','friseur','maler','tischler','mechaniker','elektriker','ingenieur','architekt','fotograf','fotografieren','journalist','musiker','bauarbeiter','lagerarbeiter','bibliothekar','händler','bote','botschafter','sekretär','maschine','gerät','werkzeug','hammer','säge','nagel','schraube','arbeitslosigkeit'],
  'Einkaufen, Geld & Wirtschaft': ['einkaufen','kaufen','verkaufen','geld','euro','cent','dollar','preis','kosten','rechnung','rechnungen','quittung','kasse','geldbeutel','portemonnaie','kreditkarte','konto','bankkonto','bargeld','münze','schein','währung','rabatt','angebot','kunde','kundin','ware','produkt','tüte','korb','wechselgeld','wechsel','teuer','billig','kostenlos','wirtschaft','wirtschaftskrise','umsatz','investition','aktie','börse','kredit','zins','budget','nachfrage','handel','vermögen','reichtum','reich','armut','schuld','schulden','steuer','zoll','gewinn','verlust','wert','nutzen','vorteil','nachteil','werbung'],
  'Freizeit, Sport & Musik': ['freizeit','geschenk','hobby','sport','training','fitnessstudio','spiel','spiele','ball','fußball','fußballspiel','tennis','basketball','volleyball','schach','schwimmen','schwimmbad','laufen','joggen','radfahren','wandern','klettern','tanzen','tanz','yoga','turnen','ski','mannschaft','tor','sieg','musik','lied','song','gesang','gitarre','klavier','geige','flöte','trommel','schlagzeug','konzert','film','malen','foto','kamera','party','fest','spielzeug','puppe','würfel','bogen'],
  'Technik & Medien': ['technik','computer','laptop','tablet','handy','smartphone','telefon','bildschirm','monitor','tastatur','drucker','fernseher','radio','internet','netz','webseite','email','e-mail','passwort','nachricht','app','programm','datei','herunterladen','akku','ladegerät','kabel','stecker','strom','batterie','schalter','roboter','kopfhörer','zeitung','brief','briefträger'],
  'Material & Stoffe': ['material','stoff','holz','eisen','metall','gold','silber','bronze','marmor','plastik','leder','wolle','baumwolle','seide','lehm','wachs','gift','waffe'],
  'Krieg & Militär': ['krieg','kriegsdienst','bürgerkrieg','kampf','kämpfen','schlacht','schlachtfeld','angriff','sturmangriff','verteidigung','sieg','siegen','sieger','niederlage','besiegter','feind','gegner','heer','heereszug','legion','kohorte','fußvolk','reiterei','reiter','rekrut','veteran','hauptmann','feldherr','soldat','wache','wächter','waffe','schwert','schwertscheide','speer','pfeil','bogenschütze','schleuder','dolch','schild','helm','rüstung','panzer','wall','graben','feldlager','lager','feldzug','feldzeichen','belagerung','hinterhalt','rammbock','wurfgeschoss','flucht','rückzug','frieden','waffenstillstand','bündnis','verbündeter','beute','gefangener','geisel','opfer','gemetzel','triumph','flotte','kriegsschiff','seemann','strahl','funke'],
  'Staat, Politik & Antike': ['staat','diktator','ädil','verbannung','schatzkammer','republik','reich','königreich','kolonie','provinz','munizipium','kaiser','könig','königin','konsul','senat','senator','prätor','quästor','tribun','zensor','adel','adlige','herr','herrschaft','herrschen','macht','regierung','verwaltung','gesetz','gesetzentwurf','recht','urteil','gericht','richter','anklage','klagen','zeuge','strafe','verrat','verschwörung','aufstand','pöbel','sklave','sklaverei','freiheit','freilassung','wahl','wahlstimme','stimme','versammlung','volksversammlung','forum','rede','redner','gesandtschaft','tribut','pflicht','befehlen','gehorchen','verbieten','erlauben','erlaubnis','verkünden','vorschrift','ordnung','sitte','frömmigkeit','priester','gott','götter','göttin','göttin','geist','seele','tempel'],
  'Gefühle & Charakter': ['gefühl','lieben','traum','erschöpfung','mäßigung','gefühle','empfindung','liebe','zuneigung','zärtlichkeit','freude','glück','glücklich','spaß','genuss','begeisterung','lust','leidenschaft','begierde','verlangen','wunsch','sehnsucht','angst','furcht','fürchten','wut','wütend','zorn','ärger','hass','haß','ekel','neid','eifersucht','trauer','traurig','traurigkeit','verzweiflung','enttäuschung','erleichterung','hoffnung','zuversicht','mut','tapfer','stolz','hochmut','scham','bescheidenheit','reue','schuld','gewissen','mitleid','gnade','dankbarkeit','überraschung','langeweile','stress','sorge','ruhe','gelassenheit','stille','geduld','neugier','aufregung','aufmerksamkeit','einsamkeit','zufrieden','zufriedenheit','nervös','charakter','gemüt','freundlich','nett','böse','lieb','ehrlich','faul','faulheit','fleißig','fleiß','eifer','ehrgeiz','mutig','schüchtern','klug','klugheit','dumm','dummheit','weise','weisheit','ruhig','lustig','ernst','grausamkeit','güte','tugend','treue','vertrauen','ehre','ruhm','würde','ansehen','respekt','gunst'],
  'Abstrakte Begriffe': ['idee','problem','kraft','schaden','gedanke','meinung','vernunft','verstand','sinn','wille','absicht','zweck','ziel','grund','ursache','ursprung','folge','wirkung','bedeutung','möglichkeit','fähigkeit','verantwortung','wahrheit','wirklichkeit','wahnsinn','gerechtigkeit','unterschied','verhältnis','zustand','art','kenntnis','erfahrung','erinnerung','gewohnheit','geheimnis','zweifel','zweifeln','aberglaube','schicksal','zufall','gefahr','gefährlich','sicher','sicherheit','erfolg','misserfolg','glück','abschluss','beginn','wahl'],
  'Eigenschaften': ['groß','stark','schwach','müde','munter','klein','lang','kurz','breit','schmal','dick','dünn','hoch','tief','niedrig','weit','eng','schwer','leicht','hart','weich','glatt','rau','scharf','stumpf','neu','alt','jung','künftig','modern','schön','hässlich','sauber','schmutzig','dreckig','nass','trocken','warm','heiß','kalt','kühl','voll','leer','offen','besetzt','geschlossen','richtig','falsch','wahr','gut','schlecht','besser','schnell','langsam','laut','leise','hell','dunkel','dunkelheit','teuer','billig','einfach','schwierig','langweilig','interessant','wichtig','möglich','frei','fertig','ganz','halb','gleich','verschieden','anders','heilig','selten','plötzlich','geschwindigkeit'],
  'Verben – Alltag': ['sein','arbeiten','da sein','es gibt','haben','werden','machen','tun','geben','nehmen','bekommen','zahlen','bezahlen','waschen','putzen','räumen','öffnen','schließen','lernen','lehren','lesen','schreiben','rechnen','spielen','schlafen','aufwachen','aufstehen','anziehen','ausziehen','duschen','baden','helfen','hilfe','brauchen','benutzen','suchen','finden','verlieren','tragen','halten','greifen','legen','stellen','setzen','bauen','reparieren','schneiden','wohnen','leben','sterben','tod','heiraten','feiern','besuchen','einladen','angeln','wachsen','versuchen','gewinnen','verbieten','erlauben','ablehnen','zustimmen','zugeben','gestehen','melden','warnen','drohen','loben','tadeln','leugnen','wählen','ernte'],
  'Verben – Bewegung & Handlung': ['gehen','kommen','laufen','rennen','springen','fallen','steigen','klettern','fliegen','fahren','schwimmen','tauchen','drehen','ziehen','drücken','werfen','fangen','treten','stoßen','bewegen','bringen','holen','schicken','senden','folgen','begegnen','treffen','bleiben','stehen','sitzen','liegen','warten','beginnen','anfangen','aufhören','enden','wechseln','ändern','führen','fühlen'],
  'Denken & Kommunikation': ['denken','können','wollen','müssen','mögen','dürfen','sollen','beredsamkeit','wissen','glauben','meinen','verstehen','kennen','erkennen','vergessen','sich erinnern','fragen','antworten','sagen','sprechen','reden','erzählen','erklären','beschreiben','besprechen','diskutieren','bestellen','empfehlen','vorschlagen','bitten','befehlen','rufen','schreien','flüstern','schweigen','lachen','weinen','lächeln','hören','zuhören','sehen','schauen','zeigen','bedeuten','entscheiden','entscheidung','planen','hoffen','wünschen','danken','grüßen','versprechen','lügen','raten','behaupten','betonen','erwähnen','überzeugen','überreden','widersprechen','streiten','sich beschweren','verkünden','übersetzen','übersetzer','wiederholen','eindruck','klang','stimme','melodie','note','zeichen','rat','botschaft'],
  'Ort & Richtung': ['ort','platz','stelle','seite','mitte','rand','ecke','oben','unten','vorne','hinten','links','rechts','hier','dort','da','überall','nirgends','innen','außen','drinnen','draußen','geradeaus','norden','süden','osten','westen','nähe','ferne','nah','richtung','weg','ziel','anfang','ende','grenze','abstand','wohin','woher'],
  'Kleine Wörter & Grammatik': ['aber','vielleicht','ich','du','er','sie','es','wir','ihr','oder','und','weil','wenn','dass','obwohl','deshalb','trotzdem','natürlich','immer','nie','oft','manchmal','selten','schon','noch','nur','auch','dann','damals','plötzlich','mehr','weniger','viel','wenig','genug','alle','alles','nichts','etwas','einige','allein','zusammen','wer','wo','wann','warum','was','wie','welcher','wie viel','wer?','wo?','wann?','warum?','was?','woher?'],
};

// Reihenfolge, in der die Themen als Lektionen erscheinen (leicht → aufbauend).
export const THEME_ORDER = [
  'Begrüßung & Höflichkeit',
  'Redewendungen',
  'Zahlen',
  'Farben',
  'Familie & Menschen',
  'Körper & Gesundheit',
  'Kleidung',
  'Essen',
  'Trinken',
  'Küche & Geschirr',
  'Haus & Wohnen',
  'Möbel & Haushalt',
  'Tiere',
  'Natur & Pflanzen',
  'Wetter & Jahreszeiten',
  'Umwelt & Naturereignisse',
  'Landwirtschaft',
  'Zeit & Kalender',
  'Reisen & Verkehr',
  'Stadt & Gebäude',
  'Schule & Bildung',
  'Wissenschaft & Studium',
  'Kunst & Kultur',
  'Arbeit & Beruf',
  'Einkaufen, Geld & Wirtschaft',
  'Freizeit, Sport & Musik',
  'Technik & Medien',
  'Material & Stoffe',
  'Krieg & Militär',
  'Staat, Politik & Antike',
  'Gefühle & Charakter',
  'Abstrakte Begriffe',
  'Eigenschaften',
  'Verben – Alltag',
  'Verben – Bewegung & Handlung',
  'Denken & Kommunikation',
  'Ort & Richtung',
  'Kleine Wörter & Grammatik',
];

// Wort → Thema (erstes passendes Thema in THEME_ORDER gewinnt).
export const WORD_THEME = (() => {
  const map = {};
  for (const theme of THEME_ORDER) {
    for (const w of (THEME_WORDS[theme] || [])) {
      const key = normalizeFront(w);
      if (key && !(key in map)) map[key] = theme;
    }
  }
  return map;
})();

// Vorderseite normalisieren: klein, ohne Klammer-Zusatz („Fisch (Tier)" → „fisch").
export function normalizeFront(front) {
  return String(front).toLowerCase().replace(/\s*\([^)]*\)\s*/g, ' ').trim();
}

export function themeOf(front) {
  return WORD_THEME[normalizeFront(front)] || null;
}
