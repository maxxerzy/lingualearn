# -*- coding: utf-8 -*-
"""
Generator for scripts/data_el_part2.json (Items 200..399)
"""
import json

part2_cards = [
  # 200..249
  {
    "front": "die Ferse",
    "back": "φτέρνα",
    "ipa": "ˈfterna",
    "roman": "ftérna",
    "example": "Τα νέα παπούτσια πιέζουν πίσω στη φτέρνα.",
    "exampleDE": "Die neuen Schuhe drücken hinten an der Ferse."
  },
  {
    "front": "die Wirbelsäule",
    "back": "σπονδυλική στήλη",
    "ipa": "spondiliˈci ˈstili",
    "roman": "spondylikí stíli",
    "example": "Η στοχευμένη γυμναστική ενδυναμώνει τους μυς κατά μήκος της σπονδυλικής στήλης.",
    "exampleDE": "Gezielte Gymnastik stärkt die Muskeln entlang der Wirbelsäule."
  },
  {
    "front": "das Schulterblatt",
    "back": "ωμοπλάτη",
    "ipa": "omoˈplati",
    "roman": "omopláti",
    "example": "Νιώθει μια ελαφριά ένταση κάτω από τη δεξιά ωμοπλάτη.",
    "exampleDE": "Er spürt eine leichte Verspannung unter dem rechten Schulterblatt."
  },
  {
    "front": "die Hüfte",
    "back": "γοφός",
    "ipa": "ɣoˈfos",
    "roman": "gofós",
    "example": "Στηρίζει χαλαρά τα χέρια στον γοφό καθώς στέκεται.",
    "exampleDE": "Sie stützt die Hände beim Stehen locker in die Hüfte."
  },
  {
    "front": "das Herz",
    "back": "καρδιά",
    "ipa": "karˈðja",
    "roman": "kardiá",
    "example": "Η ανθρώπινη καρδιά χτυπάει περίπου εβδομήντα φορές το λεπτό.",
    "exampleDE": "Das menschliche Herz schlägt rund siebzig Mal pro Minute."
  },
  {
    "front": "die Lunge",
    "back": "πνεύμονας",
    "ipa": "ˈpnevmonas",
    "roman": "pnévmonas",
    "example": "Η βαθιά εισπνοή καθαρού αέρα του δάσους κάνει καλό στους πνεύμονες.",
    "exampleDE": "Tiefes Einatmen frischer Waldluft tut der Lunge gut."
  },
  {
    "front": "der Magen",
    "back": "στομάχι",
    "ipa": "stoˈmaxi",
    "roman": "stomáchi",
    "example": "Μετά το πλούσιο γιορτινό τραπέζι το γεμάτο στομάχι διαμαρτύρεται.",
    "exampleDE": "Nach dem üppigen Festessen rebelliert der volle Magen."
  },
  {
    "front": "die Leber",
    "back": "συκώτι",
    "ipa": "siˈkoti",
    "roman": "sykóti",
    "example": "Το συκώτι είναι το σημαντικότερο όργανο αποτοξίνωσης του σώματος.",
    "exampleDE": "Die Leber ist das wichtigste Entgiftungsorgan des Körpers."
  },
  {
    "front": "die Nieren",
    "back": "νεφρά",
    "ipa": "neˈfra",
    "roman": "nefrá",
    "example": "Το να πίνει κανείς αρκετό νερό υποστηρίζει τα νεφρά.",
    "exampleDE": "Ausreichend Wasser zu trinken unterstützt die Nieren."
  },
  {
    "front": "das Gehirn",
    "back": "εγκέφαλος",
    "ipa": "eɲˈɟefalos",
    "roman": "engéfalos",
    "example": "Ο εγκέφαλος χρειάζεται πολύ οξυγόνο για συγκεντρωμένη εργασία.",
    "exampleDE": "Das Gehirn benötigt viel Sauerstoff für konzentriertes Arbeiten."
  },
  {
    "front": "die Blutgefäße",
    "back": "αιμοφόρα αγγεία",
    "ipa": "emoˈfora aɲˈɟia",
    "roman": "aimofóra angeía",
    "example": "Η τακτική άσκηση διατηρεί τα αιμοφόρα αγγεία ελαστικά.",
    "exampleDE": "Regelmäßige Bewegung hält die Blutgefäße elastisch."
  },
  {
    "front": "die Ausdauer",
    "back": "αντοχή",
    "ipa": "andoˈçi",
    "roman": "antochí",
    "example": "Η τακτική ποδηλασία αυξάνει αισθητά την προσωπική αντοχή.",
    "exampleDE": "Regelmäßiges Radfahren steigert die persönliche Ausdauer spürbar."
  },
  {
    "front": "der Muskelkater",
    "back": "μυϊκό πιάσιμο",
    "ipa": "mi-iˈko ˈpjasimo",
    "roman": "myïkó piásimo",
    "example": "Μετά την πρώτη προπόνηση είχε για δύο μέρες μυϊκό πιάσιμο.",
    "exampleDE": "Nach dem ersten Training hatte er zwei Tage Muskelkater."
  },
  {
    "front": "das Dehnen",
    "back": "διατάσεις",
    "ipa": "ðjaˈtasis",
    "roman": "diatáseis",
    "example": "Οι ήπιες διατάσεις μετά το τρέξιμο προλαμβάνουν το πιάσιμο των μυών.",
    "exampleDE": "Sanftes Dehnen nach dem Laufen beugt Muskelverkürzungen vor."
  },
  {
    "front": "das Aufwärmen",
    "back": "προθέρμανση",
    "ipa": "proˈθermansi",
    "roman": "prothérmansi",
    "example": "Πριν από κάθε άθλημα ανήκει μια πεντάλεπτη προθέρμανση.",
    "exampleDE": "Vor jedem Sport gehört ein fünfminütiges Aufwärmen dazu."
  },
  {
    "front": "die Entspannung",
    "back": "χαλάρωση",
    "ipa": "xaˈlarosi",
    "roman": "chalárosi",
    "example": "Ένα ζεστό μπάνιο το βράδυ προάγει τη βαθιά χαλάρωση.",
    "exampleDE": "Ein warmes Bad am Abend fördert die tiefe Entspannung."
  },
  {
    "front": "der Tiefschlaf",
    "back": "βαθύς ύπνος",
    "ipa": "vaˈθis ˈipnos",
    "roman": "vathýs ýpnos",
    "example": "Ο ανενόχλητος βαθύς ύπνος είναι απαραίτητος για την ανάπλαση.",
    "exampleDE": "Ungestörter Tiefschlaf ist unverzichtbar für die Regeneration."
  },
  {
    "front": "das Wohlbefinden",
    "back": "ευεξία",
    "ipa": "eveˈksia",
    "roman": "evexía",
    "example": "Η υγιεινή διατροφή συμβάλλει καθοριστικά στην ευεξία.",
    "exampleDE": "Gesunde Ernährung trägt entscheidend zum Wohlbefinden bei."
  },
  {
    "front": "die frische Luft",
    "back": "καθαρός αέρας",
    "ipa": "kaθaˈros aˈeras",
    "roman": "katharós aéras",
    "example": "Ένας γρήγορος περίπατος στον καθαρό αέρα αναζωογονεί το πνεύμα.",
    "exampleDE": "Ein zügiger Spaziergang an der frischen Luft belebt den Geist."
  },
  {
    "front": "die Ballaststoffe",
    "back": "φυτικές ίνες",
    "ipa": "fitiˈces ˈines",
    "roman": "fytikés ínes",
    "example": "Τα προϊόντα ολικής άλεσης και τα όσπρια περιέχουν πολύτιμες φυτικές ίνες.",
    "exampleDE": "Vollkornprodukte und Hülsenfrüchte enthalten wertvolle Ballaststoffe."
  },
  {
    "front": "die Vitamine",
    "back": "βιταμίνες",
    "ipa": "vitaˈmines",
    "roman": "vitamínes",
    "example": "Τα φρέσκα φρούτα εφοδιάζουν τον οργανισμό με απαραίτητες βιταμίνες.",
    "exampleDE": "Frisches Obst versorgt den Körper mit lebenswichtigen Vitaminen."
  },
  {
    "front": "das Eiweiß",
    "back": "πρωτεΐνη",
    "ipa": "proteˈini",
    "roman": "proteḯni",
    "example": "Το ανθότυρο, το ψάρι και τα αυγά παρέχουν ζωική πρωτεΐνη υψηλής ποιότητας.",
    "exampleDE": "Quark, Fisch und Eier liefern hochwertiges tierisches Eiweiß."
  },
  {
    "front": "die Kalorien",
    "back": "θερμίδες",
    "ipa": "θerˈmiðes",
    "roman": "thermídes",
    "example": "Στην κολύμβηση καίει κανείς απροσδόκητα πολλές θερμίδες.",
    "exampleDE": "Beim Schwimmen verbrennt man überraschend viele Kalorien."
  },
  {
    "front": "der Blutzucker",
    "back": "σάκχαρο αίματος",
    "ipa": "ˈsakxaro ˈematos",
    "roman": "sákcharo aímatos",
    "example": "Το ψωμί ολικής άλεσης ανεβάζει το σάκχαρο του αίματος μόνο αργά.",
    "exampleDE": "Vollkornbrot lässt den Blutzucker nur langsam ansteigen."
  },
  {
    "front": "das Übergewicht",
    "back": "περιττό βάρος",
    "ipa": "periˈto ˈvaros",
    "roman": "perittó város",
    "example": "Η τακτική κίνηση βοηθά αποτελεσματικά ενάντια στο περιττό βάρος.",
    "exampleDE": "Regelmäßige Bewegung hilft wirksam gegen Übergewicht."
  },
  {
    "front": "die Flüssigkeitszufuhr",
    "back": "πρόσληψη υγρών",
    "ipa": "ˈproslipsi iˈɣron",
    "roman": "próslipsi ygrón",
    "example": "Τις ζεστές καλοκαιρινές ημέρες η επαρκής πρόσληψη υγρών είναι σημαντική.",
    "exampleDE": "An heißen Sommertagen ist ausreichende Flüssigkeitszufuhr wichtig."
  },
  {
    "front": "die Schwiegereltern",
    "back": "πεθερικά",
    "ipa": "peθeriˈka",
    "roman": "petheriká",
    "example": "Την Κυριακή είμαστε καλεσμένοι στα πεθερικά μου για καφέ.",
    "exampleDE": "Am Sonntag sind wir bei meinen Schwiegereltern zum Kaffee eingeladen."
  },
  {
    "front": "der Schwiegersohn",
    "back": "γαμπρός",
    "ipa": "ɣamˈbros",
    "roman": "gamprós",
    "example": "Ο γαμπρός της τα πηγαίνει θαυμάσια με όλη την οικογένεια.",
    "exampleDE": "Ihr Schwiegersohn versteht sich prächtig mit der ganzen Familie."
  },
  {
    "front": "die Schwiegertochter",
    "back": "νύφη",
    "ipa": "ˈnifi",
    "roman": "nýfi",
    "example": "Η νύφη έφερε μια σπιτική μηλόπιτα.",
    "exampleDE": "Die Schwiegertochter brachte einen selbstgebackenen Apfelkuchen mit."
  },
  {
    "front": "die Urgroßmutter",
    "back": "προγιαγιά",
    "ipa": "proʝaˈʝa",
    "roman": "progiagiá",
    "example": "Η προγιαγιά μου γιόρτασε φέτος τα ενενηκοστά της γενέθλια.",
    "exampleDE": "Meine Urgroßmutter feierte dieses Jahr ihren neunzigsten Geburtstag."
  },
  {
    "front": "der Urgroßvater",
    "back": "προπάππους",
    "ipa": "proˈpapus",
    "roman": "propáppous",
    "example": "Ο προπάππους διηγείται ευχαρίστως παλιές ιστορίες στα παιδιά.",
    "exampleDE": "Der Urgroßvater erzählt den Kindern gerne alte Geschichten."
  },
  {
    "front": "die Patentante",
    "back": "νονά",
    "ipa": "noˈna",
    "roman": "noná",
    "example": "Η νονά μου μού χάρισε ένα καλό βιβλίο για την αποφοίτηση.",
    "exampleDE": "Meine Patentante schenkte mir zum Schulabschluss ein gutes Buch."
  },
  {
    "front": "der Patenonkel",
    "back": "νονός",
    "ipa": "noˈnos",
    "roman": "nonós",
    "example": "Ο νονός του τον στηρίζει καθ' όλη τη διάρκεια των σπουδών.",
    "exampleDE": "Sein Patenonkel unterstützt ihn während des gesamten Studiums."
  },
  {
    "front": "die Großfamilie",
    "back": "μεγάλη οικογένεια",
    "ipa": "meˈɣali ikoˈʝenia",
    "roman": "megáli oikogéneia",
    "example": "Τα Χριστούγεννα μαζεύεται ολόκληρη η μεγάλη οικογένεια στο σαλόνι.",
    "exampleDE": "Zu Weihnachten versammelt sich die ganze Großfamilie im Wohnzimmer."
  },
  {
    "front": "die Kindheit",
    "back": "παιδική ηλικία",
    "ipa": "peðiˈci iliˈcia",
    "roman": "paidikí ilikía",
    "example": "Αναπολώ ευχάριστα την ανέμελη παιδική ηλικία στην επαρχία.",
    "exampleDE": "Ich denke gerne an die unbeschwerte Kindheit auf dem Land zurück."
  },
  {
    "front": "die Jugend",
    "back": "νιάτα",
    "ipa": "ˈnjata",
    "roman": "niáta",
    "example": "Στα νιάτα δοκιμάζει κανείς πολλά νέα χόμπι και ενδιαφέροντα.",
    "exampleDE": "In der Jugend probiert man viele neue Hobbys und Interessen aus."
  },
  {
    "front": "das Erwachsenenalter",
    "back": "ενήλικη ζωή",
    "ipa": "eˈnilici zoˈi",
    "roman": "eníliki zoí",
    "example": "Στην ενήλικη ζωή αναλαμβάνει κανείς την ευθύνη για τη δική του ζωή.",
    "exampleDE": "Im Erwachsenenalter übernimmt man Verantwortung für sein eigenes Leben."
  },
  {
    "front": "der Ruhestand",
    "back": "συνταξιοδότηση",
    "ipa": "sidaksioˈðotisi",
    "roman": "syntaxiodótisi",
    "example": "Στην επάξια συνταξιοδότηση το ζευγάρι ταξιδεύει πολύ στην Ευρώπη.",
    "exampleDE": "Im wohlverdienten Ruhestand reist das Ehepaar viel durch Europa."
  },
  {
    "front": "der Geburtstag",
    "back": "γενέθλια",
    "ipa": "ʝeˈneθlia",
    "roman": "genéthlia",
    "example": "Γιορτάζουμε τα τριακοστά του γενέθλια με ένα μεγάλο πάρτι.",
    "exampleDE": "Wir feiern seinen dreißigsten Geburtstag mit einer großen Party."
  },
  {
    "front": "die Generation",
    "back": "γενιά",
    "ipa": "ʝeˈnja",
    "roman": "geniá",
    "example": "Κάθε γενιά έχει τις δικές της αξίες και ιδέες.",
    "exampleDE": "Jede Generation hat ihre eigenen Werte und Vorstellungen."
  },
  {
    "front": "die Lebenserfahrung",
    "back": "εμπειρία ζωής",
    "ipa": "embiˈria zoˈis",
    "roman": "empeiría zoís",
    "example": "Με τα χρόνια συγκεντρώνει κανείς πολύτιμη εμπειρία ζωής.",
    "exampleDE": "Mit den Jahren sammelt man wertvolle Lebenserfahrung."
  },
  {
    "front": "die Freundschaft",
    "back": "φιλία",
    "ipa": "fiˈlia",
    "roman": "filía",
    "example": "Μια αληθινή φιλία αντέχει ακόμα και σε μεγάλες αποστάσεις.",
    "exampleDE": "Eine echte Freundschaft hält auch über weite Entfernungen."
  },
  {
    "front": "das Vertrauen",
    "back": "εμπιστοσύνη",
    "ipa": "embistoˈsini",
    "roman": "empistosýni",
    "example": "Η αμοιβαία εμπιστοσύνη είναι το θεμέλιο κάθε καλής σχέσης.",
    "exampleDE": "Gegenseitiges Vertrauen ist das Fundament jeder guten Beziehung."
  },
  {
    "front": "sich verlassen auf",
    "back": "βασίζομαι σε",
    "ipa": "vaˈsizome se",
    "roman": "vasízomai se",
    "example": "Μπορώ πάντα να βασίζομαι απόλυτα στην καλύτερή μου φίλη.",
    "exampleDE": "Auf meine beste Freundin kann ich mich immer voll verlassen."
  },
  {
    "front": "die Ehrlichkeit",
    "back": "ειλικρίνεια",
    "ipa": "iliˈkrinia",
    "roman": "eilikríneia",
    "example": "Η ειλικρίνεια διαρκεί περισσότερο, ειδικά ανάμεσα σε φίλους.",
    "exampleDE": "Ehrlichkeit währt am längsten, besonders unter Freunden."
  },
  {
    "front": "die Hilfsbereitschaft",
    "back": "προθυμία για βοήθεια",
    "ipa": "proθiˈmia ja voˈiθia",
    "roman": "prothymía gia voítheia",
    "example": "Όλοι οι γείτονες εκτιμούν πολύ τη θερμή της προθυμία για βοήθεια.",
    "exampleDE": "Ihre herzliche Hilfsbereitschaft schätzen alle Nachbarn sehr."
  },
  {
    "front": "das Geheimnis",
    "back": "μυστικό",
    "ipa": "mistiˈko",
    "roman": "mystikó",
    "example": "Δεν θα πρόδιδε ποτέ ένα μυστικό που του εμπιστεύτηκαν.",
    "exampleDE": "Er würde ein ihm anvertrautes Geheimnis niemals verraten."
  },
  {
    "front": "zusammenhalten",
    "back": "μένω ενωμένος",
    "ipa": "ˈmeno enoˈmenos",
    "roman": "méno enoménos",
    "example": "Σε δύσκολες στιγμές οι φίλοι πρέπει να μένουν σταθερά ενωμένοι.",
    "exampleDE": "In schwierigen Momenten müssen Freunde fest zusammenhalten."
  },
  {
    "front": "kennenlernen",
    "back": "γνωρίζω",
    "ipa": "ɣnoˈrizo",
    "roman": "gnorízo",
    "example": "Γνωριστήκαμε πριν από πέντε χρόνια στο πανεπιστήμιο.",
    "exampleDE": "Wir haben uns vor fünf Jahren an der Universität kennengelernt."
  },
  {
    "front": "die Verliebtheit",
    "back": "έρωτας",
    "ipa": "ˈerotas",
    "roman": "érotas",
    "example": "Στην αρχή μιας σχέσης ο έρωτας είναι ιδιαίτερα έντονος.",
    "exampleDE": "Am Anfang einer Beziehung ist die Verliebtheit besonders intensiv."
  },
  # 250..299
  {
    "front": "die Zuneigung",
    "back": "στοργή",
    "ipa": "storˈʝi",
    "roman": "storgí",
    "example": "Έδειχνε τη στοργή του μέσα από μικρές, προσεγμένες χειρονομίες.",
    "exampleDE": "Er zeigte seine Zuneigung durch kleine, aufmerksame Gesten."
  },
  {
    "front": "die Verlobung",
    "back": "αρραβώνας",
    "ipa": "araˈvonas",
    "roman": "arravónas",
    "example": "Σε ένα ρομαντικό δείπνο ανακοίνωσαν τον αρραβώνα τους.",
    "exampleDE": "Bei einem romantischen Abendessen gaben sie ihre Verlobung bekannt."
  },
  {
    "front": "die Hochzeit",
    "back": "γάμος",
    "ipa": "ˈɣamos",
    "roman": "gámos",
    "example": "Ο γάμος πραγματοποιήθηκε στο ιστορικό δημαρχείο της παλιάς πόλης.",
    "exampleDE": "Die Hochzeit fand im historischen Rathaus der Altstadt statt."
  },
  {
    "front": "der Ehepartner",
    "back": "σύζυγος",
    "ipa": "ˈsiziɣos",
    "roman": "sýzygos",
    "example": "Σέβεται τη γνώμη του συζύγου της σε όλα τα ζητήματα.",
    "exampleDE": "Sie respektiert die Meinung ihres Ehepartners in allen Belangen."
  },
  {
    "front": "der Hochzeitstag",
    "back": "επέτειος γάμου",
    "ipa": "eˈpetios ˈɣamu",
    "roman": "epéteios gámou",
    "example": "Για τη δέκατη επέτειο γάμου έκαναν ένα κοινό σύντομο ταξίδι.",
    "exampleDE": "Zum zehnten Hochzeitstag machten sie eine gemeinsame Kurzreise."
  },
  {
    "front": "die Trennung",
    "back": "χωρισμός",
    "ipa": "xoriˈzmos",
    "roman": "chorizmós",
    "example": "Μετά από πολλή σκέψη και οι δύο αποφάσισαν έναν δίκαιο χωρισμό.",
    "exampleDE": "Nach langer Überlegung entschieden sich beide für eine faire Trennung."
  },
  {
    "front": "die Dankbarkeit",
    "back": "ευγνωμοσύνη",
    "ipa": "evɣnomoˈsini",
    "roman": "evgnomosýni",
    "example": "Νιώθω βαθιά ευγνωμοσύνη για τη σπουδαία βοήθειά σου.",
    "exampleDE": "Ich empfinde tiefe Dankbarkeit für deine großartige Hilfe."
  },
  {
    "front": "die Erleichterung",
    "back": "ανακούφιση",
    "ipa": "anaˈkufisi",
    "roman": "anakoúfisi",
    "example": "Μετά τις επιτυχημένες εξετάσεις ένιωσε τεράστια ανακούφιση.",
    "exampleDE": "Nach der bestandenen Prüfung spürte sie riesige Erleichterung."
  },
  {
    "front": "die Vorfreude",
    "back": "προσμονή",
    "ipa": "prozmoˈni",
    "roman": "prosmoní",
    "example": "Η προσμονή των καλοκαιρινών διακοπών συντομεύει την εβδομάδα εργασίας.",
    "exampleDE": "Die Vorfreude auf den Sommerurlaub verkürzt die Arbeitswoche."
  },
  {
    "front": "die Begeisterung",
    "back": "ενθουσιασμός",
    "ipa": "enθusjaˈzmos",
    "roman": "enthousiazmós",
    "example": "Το ενθουσιασμένο κοινό χειροκροτούσε για λεπτά μετά την παράσταση.",
    "exampleDE": "Das begeisterte Publikum klatschte nach der Vorstellung minutenlang."
  },
  {
    "front": "die Zufriedenheit",
    "back": "ικανοποίηση",
    "ipa": "ikanoˈpiisi",
    "roman": "ikanopoíisi",
    "example": "Ένα ήσυχο βράδυ με ένα καλό βιβλίο χαρίζει ικανοποίηση.",
    "exampleDE": "Ein ruhiger Abend mit einem guten Buch schenkt Zufriedenheit."
  },
  {
    "front": "die Hoffnung",
    "back": "ελπίδα",
    "ipa": "elˈpiða",
    "roman": "elpída",
    "example": "Δεν εγκαταλείπουμε ποτέ την ελπίδα για ένα καλό τέλος.",
    "exampleDE": "Wir geben die Hoffnung auf ein gutes Ende niemals auf."
  },
  {
    "front": "der Optimismus",
    "back": "αισιοδοξία",
    "ipa": "esjoðoˈksia",
    "roman": "aisiodoxía",
    "example": "Με υγιή αισιοδοξία ξεπερνά κανείς πολλές δύσκολες καταστάσεις.",
    "exampleDE": "Mit gesundem Optimismus meistert man viele schwierige Situationen."
  },
  {
    "front": "das Selbstvertrauen",
    "back": "αυτοπεποίθηση",
    "ipa": "aftopeˈpiθisi",
    "roman": "aftopepoíthisi",
    "example": "Οι επιτυχίες ενισχύουν διαρκώς την προσωπική αυτοπεποίθηση.",
    "exampleDE": "Erfolge stärken das persönliche Selbstvertrauen nachhaltig."
  },
  {
    "front": "die Enttäuschung",
    "back": "απογοήτευση",
    "ipa": "apoɣoˈitefsi",
    "roman": "apogoítefsi",
    "example": "Η ήττα στον τελικό ήταν μια πικρή απογοήτευση για την ομάδα.",
    "exampleDE": "Die Niederlage im Finale war eine herbe Enttäuschung für das Team."
  },
  {
    "front": "die Eifersucht",
    "back": "ζήλια",
    "ipa": "ˈziʎa",
    "roman": "zília",
    "example": "Η αβάσιμη ζήλια μπορεί να επιβαρύνει σοβαρά μια σχέση.",
    "exampleDE": "Unbegründete Eifersucht kann eine Partnerschaft schwer belasten."
  },
  {
    "front": "der Neid",
    "back": "φθόνος",
    "ipa": "ˈfθonos",
    "roman": "fthónos",
    "example": "Ο φθόνος για την επιτυχία των άλλων δεν σε πάει μπροστά.",
    "exampleDE": "Neid auf den Erfolg anderer bringt einen selbst nicht weiter."
  },
  {
    "front": "die Scham",
    "back": "ντροπή",
    "ipa": "droˈpi",
    "roman": "ntropí",
    "example": "Από ντροπή για το ατύχημα κοκκίνισε στο πρόσωπο.",
    "exampleDE": "Vor Scham über das Missgeschick wurde er im Gesicht rot."
  },
  {
    "front": "die Reue",
    "back": "μεταμέλεια",
    "ipa": "metaˈmelia",
    "roman": "metaméleia",
    "example": "Έδειξε ειλικρινή μεταμέλεια και ζήτησε αμέσως συγγνώμη.",
    "exampleDE": "Er zeigte aufrichtige Reue und entschuldigte sich sofort."
  },
  {
    "front": "die Verzweiflung",
    "back": "απόγνωση",
    "ipa": "aˈpoɣnosi",
    "roman": "apógnosi",
    "example": "Στην απόγνωσή της ζήτησε βοήθεια από ένα συμβουλευτικό κέντρο.",
    "exampleDE": "In ihrer Verzweiflung bat sie eine Beratungsstelle um Hilfe."
  },
  {
    "front": "die Ungeduld",
    "back": "ανυπομονησία",
    "ipa": "anipomoniˈsia",
    "roman": "anypomonisía",
    "example": "Από καθαρή ανυπομονησία περπατούσε ανήσυχος πάνω-κάτω στο δωμάτιο.",
    "exampleDE": "Vor lauter Ungeduld lief er im Zimmer unruhig auf und ab."
  },
  {
    "front": "zuverlässig",
    "back": "αξιόπιστος",
    "ipa": "aksiˈopistos",
    "roman": "axiópistos",
    "example": "Είναι μια εξαιρετικά αξιόπιστη συνάδελφος στο γραφείο.",
    "exampleDE": "Sie ist eine äußerst zuverlässige Kollegin im Büro."
  },
  {
    "front": "pünktlich",
    "back": "συνεπής στην ώρα του",
    "ipa": "sineˈpis stin ˈora tu",
    "roman": "synepís stin óra tou",
    "example": "Εμφανίζεται σε κάθε συνάντηση ακριβώς στην ώρα του.",
    "exampleDE": "Er erscheint zu jeder Besprechung auf die Minute pünktlich."
  },
  {
    "front": "ehrgeizig",
    "back": "φιλόδοξος",
    "ipa": "fiˈloðoksos",
    "roman": "filódoxos",
    "example": "Ως φιλόδοξη αθλήτρια προπονείται πειθαρχημένα κάθε μέρα.",
    "exampleDE": "Als ehrgeizige Sportlerin trainiert sie diszipliniert jeden Tag."
  },
  {
    "front": "großzügig",
    "back": "γενναιόδωρος",
    "ipa": "jeneˈoðoros",
    "roman": "gennaiódoros",
    "example": "Ο μεγάλος θείος μου ήταν ανέκαθεν ένας πολύ γενναιόδωρος άνθρωπος.",
    "exampleDE": "Mein Großonkel war schon immer ein sehr großzügiger Mensch."
  },
  {
    "front": "bescheiden",
    "back": "σεμνός",
    "ipa": "seˈmnos",
    "roman": "semnós",
    "example": "Παρά τις μεγάλες του επιτυχίες έχει παραμείνει πάντα σεμνός.",
    "exampleDE": "Trotz seiner großen Erfolge ist er stets bescheiden geblieben."
  },
  {
    "front": "nachdenklich",
    "back": "σκεπτικός",
    "ipa": "skeptiˈkos",
    "roman": "skeptikós",
    "example": "Κοίταζε σκεπτική έξω από το παράθυρο στη βροχή.",
    "exampleDE": "Sie blickte nachdenklich aus dem Fenster in den Regen."
  },
  {
    "front": "geduldig",
    "back": "υπομονετικός",
    "ipa": "ipomonetiˈkos",
    "roman": "ypomoneTikós",
    "example": "Ο δάσκαλος εξηγεί τη δύσκολη άσκηση με υπομονετική φωνή.",
    "exampleDE": "Der Lehrer erklärt die schwierige Aufgabe mit geduldiger Stimme."
  },
  {
    "front": "humorvoll",
    "back": "με χιούμορ",
    "ipa": "me ˈxjumor",
    "roman": "me chioúmor",
    "example": "Με τον τρόπο του που έχει χιούμορ κάνει όλη την παρέα να γελάει.",
    "exampleDE": "Mit seiner humorvollen Art bringt er die ganze Runde zum Lachen."
  },
  {
    "front": "das Missverständnis",
    "back": "παρεξήγηση",
    "ipa": "pareˈksiʝisi",
    "roman": "parexígisi",
    "example": "Με ένα σύντομο τηλεφώνημα η παρεξήγηση λύθηκε.",
    "exampleDE": "Durch ein kurzes Telefongespräch klärte sich das Missverständnis auf."
  },
  {
    "front": "der Streit",
    "back": "καβγάς",
    "ipa": "kavˈɣas",
    "roman": "kavgás",
    "example": "Μετά τον έντονο καβγά μίλησαν και οι δύο ήρεμα μεταξύ τους.",
    "exampleDE": "Nach dem hitzigen Streit sprachen beide in Ruhe miteinander."
  },
  {
    "front": "die Versöhnung",
    "back": "συμφιλίωση",
    "ipa": "simfiˈliosi",
    "roman": "symfilíosi",
    "example": "Μια ειλικρινής συγγνώμη άνοιξε τον δρόμο για τη συμφιλίωση.",
    "exampleDE": "Eine ehrliche Entschuldigung ebnete den Weg zur Versöhnung."
  },
  {
    "front": "der Kompromiss",
    "back": "συμβιβασμός",
    "ipa": "simvivaˈzmos",
    "roman": "symvivazmós",
    "example": "Και οι δύο διαπραγματευόμενες πλευρές συμφώνησαν σε έναν δίκαιο συμβιβασμό.",
    "exampleDE": "Beide Verhandlungsparteien einigten sich auf einen fairen Kompromiss."
  },
  {
    "front": "zuhören",
    "back": "ακούω προσεκτικά",
    "ipa": "aˈkuo prosektiˈka",
    "roman": "akoúo prosektiká",
    "example": "Το να ακούει κανείς προσεκτικά είναι συχνά πιο σημαντικό από το να μιλάει πολύ.",
    "exampleDE": "Gutes Zuhören ist oft wichtiger als selbst viel zu reden."
  },
  {
    "front": "unterbrechen",
    "back": "διακόπτω",
    "ipa": "ðjaˈkopto",
    "roman": "diakópto",
    "example": "Άσε με σε παρακαλώ να τελειώσω την πρότασή μου και μη με διακόπτεις.",
    "exampleDE": "Bitte lass mich meinen Satz beenden und unterbrich mich nicht."
  },
  {
    "front": "kritisieren",
    "back": "ασκώ κριτική",
    "ipa": "aˈsko kritiˈci",
    "roman": "askó kritikí",
    "example": "Πρέπει να διατυπώνει κανείς την κριτική πάντα αντικειμενικά και εποικοδομητικά.",
    "exampleDE": "Man sollte Kritik stets sachlich und konstruktiv formulieren."
  },
  {
    "front": "die Meinung",
    "back": "γνώμη",
    "ipa": "ˈɣnomi",
    "roman": "gnómi",
    "example": "Κατά τη γνώμη μου θα έπρεπε να ξανασκεφτούμε τα σχέδια.",
    "exampleDE": "Meiner Meinung nach sollten wir die Pläne noch einmal überdenken."
  },
  {
    "front": "der Standpunkt",
    "back": "άποψη",
    "ipa": "ˈapopsi",
    "roman": "ápopsi",
    "example": "Υποστήριξε την άποψή της με ξεκάθαρα και πειστικά επιχειρήματα.",
    "exampleDE": "Sie vertrat ihren Standpunkt mit klaren und überzeugenden Argumenten."
  },
  {
    "front": "das Argument",
    "back": "επιχείρημα",
    "ipa": "epiˈçirima",
    "roman": "epicheírima",
    "example": "Ένα ισχυρό επιχείρημα έπεισε ακόμα και τους δύσπιστους ακροατές.",
    "exampleDE": "Ein starkes Argument überzeugte auch die skeptischen Zuhörer."
  },
  {
    "front": "beipflichten",
    "back": "συμφωνώ",
    "ipa": "simfoˈno",
    "roman": "symfonó",
    "example": "Σε αυτή την εκτίμηση οφείλω να συμφωνήσω απόλυτα μαζί σας.",
    "exampleDE": "In dieser Einschätzung muss ich Ihnen vollkommen beipflichten."
  },
  {
    "front": "Einwand erheben",
    "back": "προβάλλω αντίρρηση",
    "ipa": "proˈvalo anˈdirisi",
    "roman": "provállo antírrisi",
    "example": "Πρόβαλε μια ουσιαστική αντίρρηση ενάντια στη νέα πρόταση.",
    "exampleDE": "Er erhob einen sachlichen Einwand gegen den neuen Vorschlag."
  },
  {
    "front": "die Überzeugungskraft",
    "back": "πειθώ",
    "ipa": "piˈθo",
    "roman": "peithó",
    "example": "Με μεγάλη πειθώ κέρδισε τους ακροατές.",
    "exampleDE": "Mit großer Überzeugungskraft gewann sie die Zuhörer für sich."
  },
  {
    "front": "die Diskussion",
    "back": "συζήτηση",
    "ipa": "siˈzitisi",
    "roman": "syzítisi",
    "example": "Η ζωηρή συζήτηση διήρκεσε μέχρι αργά το βράδυ.",
    "exampleDE": "Die lebhafte Diskussion dauerte bis spät in den Abend."
  },
  {
    "front": "das Fazit",
    "back": "συμπέρασμα",
    "ipa": "simˈberazma",
    "roman": "sympérasma",
    "example": "Ως συμπέρασμα μπορεί να καταγραφεί ότι το έργο πέτυχε.",
    "exampleDE": "Als Fazit lässt sich festhalten, dass das Projekt gelungen ist."
  },
  {
    "front": "die Höflichkeit",
    "back": "ευγένεια",
    "ipa": "evˈjenia",
    "roman": "evgéneia",
    "example": "Η ευγένεια ανοίγει πολλές πόρτες στην προσωπική και επαγγελματική ζωή.",
    "exampleDE": "Höflichkeit öffnet viele Türen im privaten und beruflichen Leben."
  },
  {
    "front": "der Respekt",
    "back": "σεβασμός",
    "ipa": "sevaˈzmos",
    "roman": "sevazmós",
    "example": "Ο αμοιβαίος σεβασμός είναι η βάση για μια ειρηνική συνύπαρξη.",
    "exampleDE": "Gegenseitiger Respekt ist die Grundlage für ein friedliches Miteinander."
  },
  {
    "front": "die Entschuldigung",
    "back": "συγγνώμη",
    "ipa": "siˈɣnomi",
    "roman": "syggnómi",
    "example": "Δέχτηκε την ειλικρινή συγγνώμη χωρίς δισταγμό.",
    "exampleDE": "Er nahm die aufrichtige Entschuldigung ohne Zögern an."
  },
  {
    "front": "die Einladung",
    "back": "πρόσκληση",
    "ipa": "ˈprosklisi",
    "roman": "prósklisi",
    "example": "Σας ευχαριστώ θερμά για την ευγενική πρόσκληση στο δείπνο.",
    "exampleDE": "Vielen herzlichen Dank für die freundliche Einladung zum Abendessen."
  },
  {
    "front": "der Dank",
    "back": "ευχαριστίες",
    "ipa": "efxariˈsties",
    "roman": "efcharistíes",
    "example": "Θα ήθελα να σας εκφράσω τις θερμές μου ευχαριστίες για την υποστήριξη.",
    "exampleDE": "Ich möchte Ihnen meinen herzlichen Dank für die Unterstützung aussprechen."
  },
  {
    "front": "die Gastfreundschaft",
    "back": "φιλοξενία",
    "ipa": "filokseˈnia",
    "roman": "filoxenía",
    "example": "Η θερμή φιλοξενία της οικογένειας μας εντυπωσίασε βαθιά.",
    "exampleDE": "Die herzliche Gastfreundschaft der Familie hat uns tief beeindruckt."
  },
  # 300..349
  {
    "front": "das Kompliment",
    "back": "κομπλιμέντο",
    "ipa": "kombliˈmendo",
    "roman": "kompliménto",
    "example": "Χάρηκε πολύ με το ευγενικό κομπλιμέντο για την ομιλία της.",
    "exampleDE": "Sie freute sich sehr über das nette Kompliment zu ihrem Vortrag."
  },
  {
    "front": "die Fußgängerzone",
    "back": "πεζόδρομος",
    "ipa": "peˈzoðromos",
    "roman": "pezódromos",
    "example": "Στον πολυσύχναστο πεζόδρομο τα καταστήματα βρίσκονται το ένα δίπλα στο άλλο.",
    "exampleDE": "In der belebten Fußgängerzone reiht sich ein Geschäft an das andere."
  },
  {
    "front": "der Zebrastreifen",
    "back": "διάβαση πεζών",
    "ipa": "ˈðjavasi peˈzon",
    "roman": "diávasi pezón",
    "example": "Στη διάβαση πεζών τα αυτοκίνητα σταματούν για να περάσουν οι πεζοί.",
    "exampleDE": "Am Zebrastreifen halten die Autos an, um Fußgänger queren zu lassen."
  },
  {
    "front": "der Bürgersteig",
    "back": "πεζοδρόμιο",
    "ipa": "pezoˈðromio",
    "roman": "pezodrómio",
    "example": "Τα παιδιά οδηγούν τα πατίνια τους με ασφάλεια στο φαρδύ πεζοδρόμιο.",
    "exampleDE": "Die Kinder fahren mit ihren Rollern sicher auf dem breiten Bürgersteig."
  },
  {
    "front": "die Ampel",
    "back": "φανάρι",
    "ipa": "faˈnari",
    "roman": "fanári",
    "example": "Όταν το φανάρι ανάβει κόκκινο, όλα τα οχήματα πρέπει να σταματήσουν.",
    "exampleDE": "Wenn die Ampel auf Rot schaltet, müssen alle Fahrzeuge anhalten."
  },
  {
    "front": "die Kreuzung",
    "back": "διασταύρωση",
    "ipa": "ðjaˈstavrosi",
    "roman": "diastávrosi",
    "example": "Στην επόμενη μεγάλη διασταύρωση στρίψτε δεξιά.",
    "exampleDE": "An der nächsten großen Kreuzung biegen Sie bitte rechts ab."
  },
  {
    "front": "die Einbahnstraße",
    "back": "μονόδρομος",
    "ipa": "moˈnoðromos",
    "roman": "monódromos",
    "example": "Προσέξτε την πινακίδα, αυτό το στενό σοκάκι είναι μονόδρομος.",
    "exampleDE": "Achten Sie auf das Schild, diese schmale Gasse ist eine Einbahnstraße."
  },
  {
    "front": "der Marktplatz",
    "back": "πλατεία αγοράς",
    "ipa": "plaˈtia aɣoˈras",
    "roman": "plateía agorás",
    "example": "Τις Τετάρτες και τα Σάββατα διεξάγεται η λαϊκή αγορά στην πλατεία.",
    "exampleDE": "Mittwochs und samstags findet auf dem Marktplatz der Wochenmarkt statt."
  },
  {
    "front": "das Rathaus",
    "back": "δημαρχείο",
    "ipa": "ðimarˈçio",
    "roman": "dimarcheío",
    "example": "Το ιστορικό δημαρχείο με τον χαρακτηριστικό πύργο του δεσπόζει στο κέντρο.",
    "exampleDE": "Das historische Rathaus mit seinem markanten Turm steht im Zentrum."
  },
  {
    "front": "der Fahrplan",
    "back": "δρομολόγιο",
    "ipa": "ðromoˈloʝio",
    "roman": "dromológio",
    "example": "Στο πρόγραμμα δρομολογίων στη στάση αναγράφονται όλες οι ώρες αναχώρησης.",
    "exampleDE": "Auf dem Fahrplan an der Haltestelle stehen alle Abfahrtszeiten."
  },
  {
    "front": "die Haltestelle",
    "back": "στάση",
    "ipa": "ˈstasi",
    "roman": "stási",
    "example": "Το τραμ σταματά ακριβώς στη στάση μπροστά από το μουσείο.",
    "exampleDE": "Die Straßenbahn hält direkt an der Haltestelle vor dem Museum."
  },
  {
    "front": "die Fahrkarte",
    "back": "εισιτήριο",
    "ipa": "isiˈtirio",
    "roman": "eisitírio",
    "example": "Αγοράστε παρακαλώ το εισιτήριο από το αυτόματο μηχάνημα πριν από την επιβίβαση.",
    "exampleDE": "Kaufen Sie die Fahrkarte bitte vor dem Einsteigen am Automaten."
  },
  {
    "front": "der Entwerter",
    "back": "ακυρωτικό μηχάνημα",
    "ipa": "akirotiˈko miˈxanima",
    "roman": "akyrotikó michánima",
    "example": "Βάλτε το εισιτήριο στο ακυρωτικό μηχάνημα για να το επικυρώσετε.",
    "exampleDE": "Stecken Sie das Ticket in den Entwerter, um es gültig zu machen."
  },
  {
    "front": "umsteigen",
    "back": "αλλάζω γραμμή",
    "ipa": "aˈlazo ɣraˈmi",
    "roman": "allázo grammí",
    "example": "Στον κεντρικό σταθμό πρέπει να αλλάξουμε γραμμή για τη γραμμή 2 του μετρό.",
    "exampleDE": "Am Hauptbahnhof müssen wir in die U-Bahn-Linie 2 umsteigen."
  },
  {
    "front": "die Verspätung",
    "back": "καθυστέρηση",
    "ipa": "kaθiˈsterisi",
    "roman": "kathystérisi",
    "example": "Λόγω βλάβης στις ράγες το λεωφορείο έχει δέκα λεπτά καθυστέρηση.",
    "exampleDE": "Wegen einer Weichenstörung hat der Bus zehn Minuten Verspätung."
  },
  {
    "front": "die Monatskarte",
    "back": "μηνιαία κάρτα",
    "ipa": "minjeˈa ˈkarta",
    "roman": "miniaía kárta",
    "example": "Για τους καθημερινούς επιβάτες αξίζει μια προσωπική μηνιαία κάρτα.",
    "exampleDE": "Für Berufspendler lohnt sich eine persönliche Monatskarte."
  },
  {
    "front": "der Führerschein",
    "back": "δίπλωμα οδήγησης",
    "ipa": "ˈðiploma oˈðiʝisis",
    "roman": "díploma odígisis",
    "example": "Στα δεκαοκτώ της πέρασε τις εξετάσεις για το δίπλωμα οδήγησης.",
    "exampleDE": "Mit achtzehn Jahren bestand sie die Prüfung für den Führerschein."
  },
  {
    "front": "der Sicherheitsgurt",
    "back": "ζώνη ασφαλείας",
    "ipa": "ˈzoni asfaˈlias",
    "roman": "zóni asfaleías",
    "example": "Δεθείτε παρακαλώ και φορέστε τη ζώνη ασφαλείας.",
    "exampleDE": "Bitte schnallen Sie sich an und legen Sie den Sicherheitsgurt an."
  },
  {
    "front": "die Tankstelle",
    "back": "βενζινάδικο",
    "ipa": "venziˈnaðiko",
    "roman": "venzinádiko",
    "example": "Στο επόμενο βενζινάδικο πρέπει να βάλουμε βενζίνη και νερό για τους υαλοκαθαριστήρες.",
    "exampleDE": "An der nächsten Tankstelle müssen wir Benzin und Wischwasser nachfüllen."
  },
  {
    "front": "der Kofferraum",
    "back": "πορτμπαγκάζ",
    "ipa": "portbaˈŋɡaz",
    "roman": "portmankáz",
    "example": "Στο ευρύχωρο πορτμπαγκάζ υπάρχει αρκετός χώρος για τρεις μεγάλες βαλίτσες.",
    "exampleDE": "Im geräumigen Kofferraum ist genug Platz für drei große Koffer."
  },
  {
    "front": "der Rückspiegel",
    "back": "καθρέφτης οπισθοπορείας",
    "ipa": "kaˈθreftis opisθopoˈrias",
    "roman": "kathréftis opisthoporeías",
    "example": "Πριν αλλάξει λωρίδα ο οδηγός κοιτάζει προσεκτικά στον καθρέφτη οπισθοπορείας.",
    "exampleDE": "Vor dem Spurwechsel schaut der Fahrer aufmerksam in den Rückspiegel."
  },
  {
    "front": "der Blinker",
    "back": "φλας",
    "ipa": "flas",
    "roman": "flas",
    "example": "Μην ξεχνάτε όταν στρίβετε να ανάβετε εγκαίρως το φλας.",
    "exampleDE": "Vergessen Sie beim Abbiegen nicht, rechtzeitig den Blinker zu setzen."
  },
  {
    "front": "der Scheibenwischer",
    "back": "υαλοκαθαριστήρας",
    "ipa": "jalokaθariˈstiras",
    "roman": "yalokatharistíras",
    "example": "Στη δυνατή βροχή οι υαλοκαθαριστήρες δουλεύουν στην πιο γρήγορη ταχύτητα.",
    "exampleDE": "Bei starkem Regen laufen die Scheibenwischer auf höchster Stufe."
  },
  {
    "front": "der Stau",
    "back": "μποτιλιάρισμα",
    "ipa": "botiliˈarizma",
    "roman": "botiliárisma",
    "example": "Λόγω έργων τα αυτοκίνητα στον αυτοκινητόδρομο έχουν κολλήσει σε μποτιλιάρισμα.",
    "exampleDE": "Wegen einer Baustelle stehen die Autos auf der Autobahn im Stau."
  },
  {
    "front": "der Fahrradhelm",
    "back": "κράνος ποδηλάτου",
    "ipa": "ˈkranos poðiˈlatu",
    "roman": "krános podilátou",
    "example": "Ένα σωστά τοποθετημένο κράνος ποδηλάτου προστατεύει το κεφάλι σε πτώση.",
    "exampleDE": "Ein gut sitzender Fahrradhelm schützt den Kopf bei einem Sturz."
  },
  {
    "front": "der Fahrradweg",
    "back": "ποδηλατόδρομος",
    "ipa": "poðilaˈtoðromos",
    "roman": "podilatódromos",
    "example": "Κατά μήκος του ποταμού εκτείνεται ένας φαρδύς και ασφαλτοστρωμένος ποδηλατόδρομος.",
    "exampleDE": "Entlang des Flusses verläuft ein breiter und asphaltierter Fahrradweg."
  },
  {
    "front": "das Fahrradschloss",
    "back": "κλειδαριά ποδηλάτου",
    "ipa": "kliðaˈrja poðiˈlatu",
    "roman": "kleidariá podilátou",
    "example": "Κλειδώνετε πάντα το ποδήλατό σας με μια γερή κλειδαριά.",
    "exampleDE": "Schließen Sie Ihr Rad immer mit einem stabilen Fahrradschloss an."
  },
  {
    "front": "die Klingel",
    "back": "κουδούνι",
    "ipa": "kuˈðuni",
    "roman": "koudoúni",
    "example": "Με ένα σύντομο χτύπημα στο κουδούνι προειδοποιεί τους πεζούς.",
    "exampleDE": "Mit einer kurzen Betätigung der Klingel warnt sie Fußgänger vor."
  },
  {
    "front": "die Luftpumpe",
    "back": "τρόμπα",
    "ipa": "ˈtromba",
    "roman": "trómpa",
    "example": "Με την τρόμπα χειρός φέρνει την πίεση των ελαστικών στο ιδανικό σημείο.",
    "exampleDE": "Mit der Handluftpumpe bringt er den Reifendruck auf das Optimum."
  },
  {
    "front": "der E-Scooter",
    "back": "ηλεκτρικό πατίνι",
    "ipa": "ilektriˈko paˈtini",
    "roman": "ilektrikó patíni",
    "example": "Στο κέντρο της πόλης πολλοί εργαζόμενοι νοικιάζουν ένα ηλεκτρικό πατίνι.",
    "exampleDE": "In der Innenstadt leihen sich viele Pendler einen E-Scooter."
  },
  {
    "front": "die Pedale",
    "back": "πετάλια",
    "ipa": "peˈtalja",
    "roman": "petália",
    "example": "Πατάει δυνατά τα πετάλια για να ανέβει τον απότομο λόφο.",
    "exampleDE": "Er tritt kräftig in die Pedale, um den steilen Hügel hinaufzufahren."
  },
  {
    "front": "der Hauptbahnhof",
    "back": "κεντρικός σταθμός",
    "ipa": "kendriˈkos staθˈmos",
    "roman": "kentrikós stathmós",
    "example": "Από τον κεντρικό σταθμό αναχωρούν τρένα για όλες τις ευρωπαϊκές μητροπόλεις.",
    "exampleDE": "Vom Hauptbahnhof aus fahren Züge in alle europäischen Metropolen."
  },
  {
    "front": "der Bahnsteig",
    "back": "αποβάθρα",
    "ipa": "apoˈvaθra",
    "roman": "apováthra",
    "example": "Οι επιβάτες περιμένουν στην αποβάθρα τέσσερα το τρένο που καταφθάνει.",
    "exampleDE": "Die Fahrgäste warten auf Bahnsteig vier auf den einfahrenden Zug."
  },
  {
    "front": "das Gleis",
    "back": "γραμμή",
    "ipa": "ɣraˈmi",
    "roman": "grammí",
    "example": "Το γρήγορο τρένο για το Βερολίνο αναχωρεί σήμερα εκτάκτως από τη γραμμή εννέα.",
    "exampleDE": "Der Schnellzug nach Berlin fährt heute abweichend von Gleis neun."
  },
  {
    "front": "die Sitzplatzreservierung",
    "back": "κράτηση θέσης",
    "ipa": "ˈkratisi ˈθesis",
    "roman": "krátisi thésis",
    "example": "Μια κράτηση θέσης σάς γλιτώνει από το πολύ ψάξιμο στο γεμάτο τρένο.",
    "exampleDE": "Eine Sitzplatzreservierung erspart langes Suchen im vollen Zug."
  },
  {
    "front": "der Schaffner",
    "back": "ελεγκτής",
    "ipa": "eleɲkˈtis",
    "roman": "elenktís",
    "example": "Ο ευγενικός ελεγκτής ελέγχει τα εισιτήρια των επιβατών.",
    "exampleDE": "Der freundliche Schaffner kontrolliert die Tickets der Fahrgäste."
  },
  {
    "front": "der Speisewagen",
    "back": "βαγόνι-εστιατόριο",
    "ipa": "vaˈɣoni estjaˈtorio",
    "roman": "vagóni-estiatório",
    "example": "Στο βαγόνι-εστιατόριο μπορεί κανείς να απολαύσει καφέ και σνακ κατά τη διαδρομή.",
    "exampleDE": "Im Speisewagen kann man während der Fahrt Kaffee und Snacks genießen."
  },
  {
    "front": "der Anschlusszug",
    "back": "ανταπόκριση",
    "ipa": "andaˈpokrisi",
    "roman": "antapókrisi",
    "example": "Παρά τη μικρή καθυστέρηση όλοι οι ταξιδιώτες πρόλαβαν την ανταπόκρισή τους.",
    "exampleDE": "Trotz kurzer Verspätung erreichten alle Reisenden ihren Anschlusszug."
  },
  {
    "front": "das Gepäckfach",
    "back": "χώρος αποσκευών",
    "ipa": "ˈxoros aposceˈvon",
    "roman": "chóros aposkevón",
    "example": "Οι βαριές ταξιδιωτικές τσάντες τοποθετούνται με ασφάλεια στον επάνω χώρο αποσκευών.",
    "exampleDE": "Schwere Reisetaschen verstaut man sicher im oberen Gepäckfach."
  },
  {
    "front": "der Flughafen",
    "back": "αεροδρόμιο",
    "ipa": "aeroˈðromio",
    "roman": "aerodrómio",
    "example": "Πηγαίνουμε δύο ώρες πριν από την πτήση με το τρένο στο αεροδρόμιο.",
    "exampleDE": "Wir fahren zwei Stunden vor dem Abflug mit dem Zug zum Flughafen."
  },
  {
    "front": "die Bordkarte",
    "back": "κάρτα επιβίβασης",
    "ipa": "ˈkarta epiˈvivasis",
    "roman": "kárta epivívassis",
    "example": "Δείξτε παρακαλώ κατά την επιβίβαση την κάρτα επιβίβασης και την ταυτότητά σας.",
    "exampleDE": "Zeigen Sie beim Einsteigen bitte Ihre Bordkarte und den Ausweis vor."
  },
  {
    "front": "die Sicherheitskontrolle",
    "back": "έλεγχος ασφαλείας",
    "ipa": "ˈeleɲxos asfaˈlias",
    "roman": "élenchos asfaleías",
    "example": "Στον έλεγχο ασφαλείας τα λάπτοπ πρέπει να επιδεικνύονται χωριστά.",
    "exampleDE": "An der Sicherheitskontrolle müssen Laptops separat vorgezeigt werden."
  },
  {
    "front": "das Abfluggos",
    "back": "πύλη αναχώρησης",
    "ipa": "ˈpili anaˈxorisis",
    "roman": "pýli anachórisis",
    "example": "Το αεροπλάνο για τη Ρώμη αναχωρεί στην ώρα του από την πύλη B12.",
    "exampleDE": "Das Flugzeug nach Rom startet pünktlich an Abfluggate B zwölf."
  },
  {
    "front": "das Handgepäck",
    "back": "χειραποσκευή",
    "ipa": "çiraposceˈvi",
    "roman": "cheiraposkeví",
    "example": "Τα υγρά στη χειραποσκευή επιτρέπεται να έχουν χωρητικότητα το πολύ εκατό χιλιοστόλιτρα.",
    "exampleDE": "Flüssigkeiten im Handgepäck dürfen maximal hundert Milliliter fassen."
  },
  {
    "front": "die Gepäckausgabe",
    "back": "παραλαβή αποσκευών",
    "ipa": "paralaˈvi aposceˈvon",
    "roman": "paralaví aposkevón",
    "example": "Μετά την προσγείωση παραλαμβάνει κανείς τις βαλίτσες από την παραλαβή αποσκευών.",
    "exampleDE": "Nach der Landung holt man die Koffer an der Gepäckausgabe ab."
  },
  {
    "front": "der Reisepass",
    "back": "διαβατήριο",
    "ipa": "ðjavaˈtirio",
    "roman": "diavatírio",
    "example": "Για ταξίδια εκτός της Ευρωπαϊκής Ένωσης χρειάζεται διαβατήριο.",
    "exampleDE": "Für Reisen außerhalb der Europäischen Union benötigt man einen Reisepass."
  },
  {
    "front": "die Rezeption",
    "back": "ρεσεψιόν",
    "ipa": "resepsiˈon",
    "roman": "resepsión",
    "example": "Η ρεσεψιόν του ξενοδοχείου στελεχώνεται με προσωπικό όλο το εικοσιτετράωρο.",
    "exampleDE": "Die Rezeption des Hotels ist rund um die Uhr mit Personal besetzt."
  },
  {
    "front": "die Schlüsselkarte",
    "back": "μαγνητική κάρτα",
    "ipa": "maɣnitiˈci ˈkarta",
    "roman": "magnitikí kárta",
    "example": "Με την ηλεκτρονική κάρτα-κλειδί ανοίγει η πόρτα του δωματίου.",
    "exampleDE": "Mit der elektronischen Schlüsselkarte öffnet sich die Zimmertür."
  },
  {
    "front": "das Einzelzimmer",
    "back": "μονόκλινο δωμάτιο",
    "ipa": "moˈnoklino ðoˈmatio",
    "roman": "monóklino domátio",
    "example": "Για το επαγγελματικό ταξίδι κλείνει ένα ήσυχο μονόκλινο δωμάτιο.",
    "exampleDE": "Für die Geschäftsreise bucht er ein ruhiges Einzelzimmer."
  },
  {
    "front": "das Doppelzimmer",
    "back": "δίκλινο δωμάτιο",
    "ipa": "ˈðiklino ðoˈmatio",
    "roman": "díklino domátio",
    "example": "Το δίκλινο δωμάτιο προσφέρει μια υπέροχη θέα στη θάλασσα.",
    "exampleDE": "Das Doppelzimmer bietet einen herrlichen Ausblick auf das Meer."
  },
  # 350..399
  {
    "front": "das Frühstücksbuffet",
    "back": "μπουφές πρωινού",
    "ipa": "buˈfes proiˈnu",
    "roman": "boufés proïnoú",
    "example": "Ο πλούσιος μπουφές πρωινού ικανοποιεί κάθε γαστρονομική επιθυμία.",
    "exampleDE": "Das reichhaltige Frühstücksbuffet lässt keine kulinarischen Wünsche offen."
  },
  {
    "front": "der Zimmerservice",
    "back": "υπηρεσία δωματίου",
    "ipa": "ipireˈsia ðomaˈtiu",
    "roman": "ypiresía domatíou",
    "example": "Μπορεί κανείς να παραγγείλει το δείπνο άνετα μέσω της υπηρεσίας δωματίου.",
    "exampleDE": "Man kann sich das Abendessen bequem über den Zimmerservice bestellen."
  },
  {
    "front": "auschecken",
    "back": "κάνω αναχώρηση",
    "ipa": "ˈkano anaˈxorisi",
    "roman": "káno anachórisi",
    "example": "Οι ένοικοι του ξενοδοχείου πρέπει να κάνουν αναχώρηση το αργότερο έως τις έντεκα το πρωί.",
    "exampleDE": "Die Hotelgäste müssen bis spätestens elf Uhr vormittags auschecken."
  },
  {
    "front": "die Jugendherberge",
    "back": "ξενώνας νέων",
    "ipa": "kseˈnonas ˈneon",
    "roman": "xenónas néon",
    "example": "Για τους ταξιδιώτες με σακίδιο ο ξενώνας νέων είναι μια οικονομική επιλογή διανυκτέρευσης.",
    "exampleDE": "Für Rucksackreisende ist die Jugendherberge eine günstige Übernachtungsmöglichkeit."
  },
  {
    "front": "die Ferienwohnung",
    "back": "εξοχική κατοικία",
    "ipa": "eksoxiˈci katiˈcia",
    "roman": "exochikí katoikía",
    "example": "Για τις οικογενειακές διακοπές νοικιάζουμε μια ζεστή εξοχική κατοικία.",
    "exampleDE": "Für den Familienurlaub mieten wir eine gemütliche Ferienwohnung."
  },
  {
    "front": "das Reiseziel",
    "back": "ταξιδιωτικός προορισμός",
    "ipa": "taksiðjotiˈkos prooriˈzmos",
    "roman": "taxidiotikós proorizmós",
    "example": "Η Ιταλία είναι εδώ και πολλά χρόνια ο αγαπημένος της καλοκαιρινός προορισμός.",
    "exampleDE": "Italien ist seit vielen Jahren ihr liebstes Reiseziel im Sommer."
  },
  {
    "front": "die Sehenswürdigkeit",
    "back": "αξιοθέατο",
    "ipa": "aksioˈθeato",
    "roman": "axiothéato",
    "example": "Ο ιστορικός καθεδρικός ναός είναι το πιο γνωστό αξιοθέατο της πόλης.",
    "exampleDE": "Die historische Kathedrale ist die bekannteste Sehenswürdigkeit der Stadt."
  },
  {
    "front": "der Reiseleiter",
    "back": "ξεναγός",
    "ipa": "ksenaˈɣos",
    "roman": "xenagós",
    "example": "Ο έμπειρος ξεναγός εξηγεί τη συναρπαστική ιστορία του οικοδομήματος.",
    "exampleDE": "Der kundige Reiseleiter erklärt die spannende Geschichte des Bauwerks."
  },
  {
    "front": "das Souvenir",
    "back": "αναμνηστικό",
    "ipa": "anamniˈstiko",
    "roman": "anamnistikó",
    "example": "Ως όμορφο αναμνηστικό αγόρασε ένα ζωγραφισμένο στο χέρι κεραμικό μπολ.",
    "exampleDE": "Als schönes Souvenir kaufte sie eine handbemalte Keramikschale."
  },
  {
    "front": "die Ansichtskarte",
    "back": "καρτ ποστάλ",
    "ipa": "kart poˈstal",
    "roman": "kart postál",
    "example": "Γράφει μια καρτ ποστάλ με χαιρετισμούς στους παππούδες του.",
    "exampleDE": "Er schreibt eine Ansichtskarte mit Grüßen an seine Großeltern."
  },
  {
    "front": "der Sonnenbrand",
    "back": "ηλιακό έγκαυμα",
    "ipa": "iljaˈko ˈeŋgavma",
    "roman": "iliakó égkavma",
    "example": "Χωρίς προστατευτικό αντηλιακό ρισκάρει κανείς στην παραλία ένα ηλιακό έγκαυμα.",
    "exampleDE": "Ohne schützende Sonnencreme riskiert man am Strand einen Sonnenbrand."
  },
  {
    "front": "der Campingplatz",
    "back": "χώρος κάμπινγκ",
    "ipa": "ˈxoros ˈkambiɲɡ",
    "roman": "chóros kámpingk",
    "example": "Ο χώρος κάμπινγκ βρίσκεται ειδυλλιακά ακριβώς δίπλα σε μια καθαρή λίμνη.",
    "exampleDE": "Der Campingplatz liegt idyllisch direkt an einem klaren Badesee."
  },
  {
    "front": "das Zelt",
    "back": "σκηνή",
    "ipa": "sciˈni",
    "roman": "skiní",
    "example": "Μαζί έστησαν τη σκηνή σε ένα ίσιο λιβάδι.",
    "exampleDE": "Gemeinsam bauten sie das Zelt auf einer ebenen Wiese auf."
  },
  {
    "front": "der Schlafsack",
    "back": "υπνόσακος",
    "ipa": "iˈpnosakos",
    "roman": "ypnósakos",
    "example": "Ένας ζεστός υπνόσακος προστατεύει αξιόπιστα από το νυχτερινό κρύο.",
    "exampleDE": "Ein warmer Schlafsack schützt zuverlässig vor der nächtlichen Kälte."
  },
  {
    "front": "die Isomatte",
    "back": "υπόστρωμα",
    "ipa": "iˈpostroma",
    "roman": "ypóstroma",
    "example": "Το μαλακό υπόστρωμα μονώνει από την υγρασία του εδάφους.",
    "exampleDE": "Die weiche Isomatte isoliert gegen die Feuchtigkeit des Bodens."
  },
  {
    "front": "die Taschenlampe",
    "back": "φακός",
    "ipa": "faˈkos",
    "roman": "fakós",
    "example": "Στο σκοτάδι φωτίζει το μονοπάτι του με τον φακό.",
    "exampleDE": "Im Dunkeln leuchtet er sich den Weg mit der Taschenlampe."
  },
  {
    "front": "der Gaskocher",
    "back": "γκαζάκι",
    "ipa": "ɡaˈzaci",
    "roman": "gkazáki",
    "example": "Στο μικρό γκαζάκι φτιάχνουν το πρωί φρέσκο καφέ.",
    "exampleDE": "Auf dem kleinen Gaskocher kochen sie morgens frischen Kaffee."
  },
  {
    "front": "das Lagerfeuer",
    "back": "φωτιά κατασκήνωσης",
    "ipa": "foˈtja kataˈscinosis",
    "roman": "fotiá kataskínosis",
    "example": "Το βράδυ κάθονταν όλοι άνετα γύρω από τη φωτιά.",
    "exampleDE": "Am Abend saßen alle gemütlich um das knisternde Lagerfeuer."
  },
  {
    "front": "das Mückenspray",
    "back": "αντικουνουπικό σπρέι",
    "ipa": "andikunupiˈko sprej",
    "roman": "antikounoupikó spréi",
    "example": "Κοντά σε νερά συνιστάται ένα αποτελεσματικό αντικουνουπικό σπρέι.",
    "exampleDE": "In Gewässernähe empfiehlt sich ein wirksames Mückenspray."
  },
  {
    "front": "der Berggipfel",
    "back": "βουνοκορφή",
    "ipa": "vunokorˈfi",
    "roman": "vounokorfí",
    "example": "Από τη χιονισμένη βουνοκορφή έχει κανείς μια φανταστική θέα.",
    "exampleDE": "Vom schneebedeckten Berggipfel hat man eine fantastische Fernsicht."
  },
  {
    "front": "der Gebirgsbach",
    "back": "ορεινό ρυάκι",
    "ipa": "oriˈno riˈaci",
    "roman": "oreinó ryáki",
    "example": "Καθαρό, παγωμένο νερό κυλάει μέσα στο ορεινό ρυάκι.",
    "exampleDE": "Klares, eiskaltes Wasser plätschert durch den Gebirgsbach."
  },
  {
    "front": "die Klippe",
    "back": "απόκρημνος βράχος",
    "ipa": "aˈpokrimnos ˈvraxos",
    "roman": "apókrimnos vráchos",
    "example": "Τα κύματα σπάνε με δυνατό θόρυβο στον απόκρημνο βράχο.",
    "exampleDE": "Wellen brechen mit lautem Tosen an der steilen Felsklippe."
  },
  {
    "front": "die Sanddüne",
    "back": "αμμόλοφος",
    "ipa": "aˈmolofos",
    "roman": "ammólofos",
    "example": "Ο σταθερός άνεμος διαμορφώνει τους αμμόλοφους στην ακτή.",
    "exampleDE": "Der stetige Wind formt die feinen Sanddünen an der Küste."
  },
  {
    "front": "der Wasserfall",
    "back": "καταρράκτης",
    "ipa": "kataˈraktis",
    "roman": "katarráktis",
    "example": "Το νερό πέφτει ορμητικά στον καταρράκτη ύψους είκοσι μέτρων.",
    "exampleDE": "Das Wasser stürzt tosend über den zwanzig Meter hohen Wasserfall."
  },
  {
    "front": "die Halbinsel",
    "back": "χερσόνησος",
    "ipa": "xerˈsonisos",
    "roman": "chersónisos",
    "example": "Η γραφική χερσόνησος προβάλλει βαθιά μέσα στην καταγάλανη θάλασσα.",
    "exampleDE": "Die malerische Halbinsel ragt weit in das azurblaue Meer hinein."
  },
  {
    "front": "das Flussufer",
    "back": "όχθη ποταμού",
    "ipa": "ˈoxθi potaˈmu",
    "roman": "óchthi potamoú",
    "example": "Στο πράσινο λιβάδι στην όχθη του ποταμού μπορεί κανείς να κάνει υπέροχο πικνίκ.",
    "exampleDE": "Auf der grünen Wiese am Flussufer kann man wunderbar picknicken."
  },
  {
    "front": "der Laubwald",
    "back": "δάσος φυλλοβόλων",
    "ipa": "ˈðasos filoˈvolon",
    "roman": "dásos fyllovólon",
    "example": "Το φθινόπωρο λάμπει το πολύχρωμο φύλλωμα στο δάσος φυλλοβόλων.",
    "exampleDE": "Im Herbst leuchtet das bunte Blätterkleid im Laubwald."
  },
  {
    "front": "der Nadelwald",
    "back": "κωνοφόρο δάσος",
    "ipa": "konoˈforo ˈðasos",
    "roman": "konofóro dásos",
    "example": "Στο κωνοφόρο δάσος ο καθαρός αέρας μυρίζει ρετσίνι και βρύα.",
    "exampleDE": "Im Nadelwald duftet die frische Luft nach Harz und Moos."
  },
  {
    "front": "die Eiche",
    "back": "βελανιδιά",
    "ipa": "velaniˈðja",
    "roman": "velanidiá",
    "example": "Η πανάρχαια βελανιδιά προσφέρει δροσερή σκιά τις ζεστές καλοκαιρινές μέρες.",
    "exampleDE": "Die uralte Eiche spendet an heißen Sommertagen kühlen Schatten."
  },
  {
    "front": "die Tanne",
    "back": "έλατο",
    "ipa": "ˈelato",
    "roman": "élato",
    "example": "Τον χειμώνα στολίζει κανείς το πράσινο έλατο ως χριστουγεννιάτικο δέντρο.",
    "exampleDE": "Im Winter schmückt man die grüne Tanne als Weihnachtsbaum."
  },
  {
    "front": "die Baumkrone",
    "back": "κορυφή δέντρου",
    "ipa": "koriˈfi ˈðendru",
    "roman": "koryfí déntrou",
    "example": "Τα πουλιά τιτιβίζουν κρυμμένα στην πυκνή κορυφή του δέντρου.",
    "exampleDE": "Vögel zwitschern versteckt in der dichten Baumkrone."
  },
  {
    "front": "der Baumstamm",
    "back": "κορμός δέντρου",
    "ipa": "korˈmos ˈðendru",
    "roman": "kormós déntrou",
    "example": "Ο επιβλητικός κορμός του δέντρου έχει περίμετρο πάνω από δύο μέτρα.",
    "exampleDE": "Der mächtige Baumstamm hat einen Umfang von über zwei Metern."
  },
  {
    "front": "der Zapfen",
    "back": "κουκουνάρι",
    "ipa": "kukuˈnari",
    "roman": "koukounári",
    "example": "Τα παιδιά μαζεύουν καφέ κουκουνάρια για χειροτεχνίες.",
    "exampleDE": "Die Kinder sammeln braune Kiefernzapfen zum Basteln."
  },
  {
    "front": "das Moos",
    "back": "βρύα",
    "ipa": "ˈvria",
    "roman": "vrýa",
    "example": "Στις σκιερές πέτρες φυτρώνει ένα πυκνό στρώμα από πράσινα βρύα.",
    "exampleDE": "Auf den schattigen Steinen wächst ein dicker Teppich aus grünem Moos."
  },
  {
    "front": "die Sonnenblume",
    "back": "ηλιοτρόπιο",
    "ipa": "iljoˈtropio",
    "roman": "iliotrópio",
    "example": "Το λαμπερό κίτρινο ηλιοτρόπιο στρέφεται πάντα προς το φως.",
    "exampleDE": "Die leuchtend gelbe Sonnenblume wendet sich stets dem Licht zu."
  },
  {
    "front": "der Löwenzahn",
    "back": "πικραλίδα",
    "ipa": "pikraˈliða",
    "roman": "pikralída",
    "example": "Την άνοιξη η πικραλίδα μεταμορφώνει το λιβάδι σε μια κίτρινη θάλασσα.",
    "exampleDE": "Im Frühling verwandelt der Löwenzahn die Wiese in ein gelbes Meer."
  },
  {
    "front": "das Gänseblümchen",
    "back": "μαργαρίτα",
    "ipa": "marɣaˈrita",
    "roman": "margaríta",
    "example": "Μικρές λευκές μαργαρίτες φυτρώνουν παντού στο κοντοκουρεμένο γρασίδι.",
    "exampleDE": "Kleine weiße Gänseblümchen wachsen überall im kurz gemähten Rasen."
  },
  {
    "front": "die Lilie",
    "back": "κρίνος",
    "ipa": "ˈkrinos",
    "roman": "krínos",
    "example": "Οι λευκοί κρίνοι αναδίδουν ένα έντονο, εκλεπτυσμένο άρωμα.",
    "exampleDE": "Weiße Lilien verströmen einen intensiven, edlen Duft."
  },
  {
    "front": "die Orchidee",
    "back": "ορχιδέα",
    "ipa": "orçiˈðea",
    "roman": "orchidéa",
    "example": "Στο ηλιόλουστο περβάζι ανθίζει μια υπέροχη ορχιδέα.",
    "exampleDE": "Auf der sonnigen Fensterbank blüht eine prächtige Orchidee."
  },
  {
    "front": "das Blütenblatt",
    "back": "πέταλο λουλουδιού",
    "ipa": "ˈpetalo luluˈðju",
    "roman": "pétalo louloudioú",
    "example": "Μια απαλή ριπή ανέμου σκορπίζει τρυφερά πέταλα στον κήπο.",
    "exampleDE": "Ein sanfter Windstoß weht zarte Blütenblätter durch den Garten."
  },
  {
    "front": "verblühen",
    "back": "μαραίνομαι",
    "ipa": "maˈrenome",
    "roman": "maraínomai",
    "example": "Μετά από μερικές ηλιόλουστες εβδομάδες τα ανοιξιάτικα λουλούδια αρχίζουν να μαραίνονται.",
    "exampleDE": "Nach einigen sonnigen Wochen beginnen die Frühlingsblumen zu verblühen."
  },
  {
    "front": "das Wildschwein",
    "back": "αγριογούρουνο",
    "ipa": "aɣrjoˈɣuruno",
    "roman": "agriogoúrouno",
    "example": "Μια αγέλη από αγριογούρουνα διασχίζει τη νύχτα το πυκνό δάσος.",
    "exampleDE": "Eine Rotte Wildschweine durchstreift nachts den dichten Wald."
  },
  {
    "front": "das Reh",
    "back": "ζαρκάδι",
    "ipa": "zarˈkaði",
    "roman": "zarkádi",
    "example": "Στο ξημέρωμα ένα ντροπαλό ζαρκάδι βόσκει στην άκρη του δάσους.",
    "exampleDE": "In der Morgendämmerung äst ein scheues Reh am Waldrand."
  },
  {
    "front": "das Eichhörnchen",
    "back": "σκίουρος",
    "ipa": "ˈsciuros",
    "roman": "skíouros",
    "example": "Ο ευκίνητος σκίουρος κρύβει καρύδια για τους χειμερινούς μήνες.",
    "exampleDE": "Das flinke Eichhörnchen versteckt Nüsse für die Wintermonate."
  },
  {
    "front": "der Igel",
    "back": "σκαντζόχοιρος",
    "ipa": "skandzoˈxiros",
    "roman": "skantzóchoiros",
    "example": "Σε κίνδυνο ο σκαντζόχοιρος τυλίγεται σε μια αγκαθωτή μπάλα.",
    "exampleDE": "Bei Gefahr rollt sich der Igel zu einer stacheligen Kugel zusammen."
  },
  {
    "front": "der Dachs",
    "back": "ασβός",
    "ipa": "aˈzvos",
    "roman": "asvós",
    "example": "Ο επιφυλακτικός ασβός ζει σε μια διακλαδισμένη φωλιά κάτω από παλιά δέντρα.",
    "exampleDE": "Der scheue Dachs bewohnt einen verzweigten Erdbau unter alten Bäumen."
  },
  {
    "front": "der Biber",
    "back": "κάστορας",
    "ipa": "ˈkastoras",
    "roman": "kástoras",
    "example": "Με κοφτερά δόντια ο κάστορας κόβει νεαρές ιτιές στην κοίτη του ρυακιού.",
    "exampleDE": "Mit scharfen Zähnen fällt der Biber junge Weiden am Bachlauf."
  },
  {
    "front": "die Fledermaus",
    "back": "νυχτερίδα",
    "ipa": "nixteˈriða",
    "roman": "nychterída",
    "example": "Στο σούρουπο η αθόρυβη νυχτερίδα κυνηγά νυχτοπεταλούδες.",
    "exampleDE": "In der Abenddämmerung jagt die lautlose Fledermaus nach Nachtfaltern."
  },
  {
    "front": "der Feldhase",
    "back": "λαγός",
    "ipa": "laˈɣos",
    "roman": "lagós",
    "example": "Με μεγάλα άλματα ο άγρυπνος λαγός τρέχει στο χωράφι.",
    "exampleDE": "Mit weiten Sprüngen flieht der wachsame Feldhase über den Acker."
  },
  {
    "front": "der Spatz",
    "back": "σπουργίτι",
    "ipa": "spurˈʝiti",
    "roman": "spourgíti",
    "example": "Ένα μικρό σπουργίτι πλησιάζει με περιέργεια αναζητώντας ψίχουλα.",
    "exampleDE": "Ein kleiner Spatz hüpft neugierig auf der Suche nach Krümeln heran."
  }
]

with open('scripts/data_el_part2.json', 'w', encoding='utf-8') as f:
    json.dump(part2_cards, f, ensure_ascii=False, indent=2)
print(f"Successfully wrote {len(part2_cards)} cards to scripts/data_el_part2.json")

