# -*- coding: utf-8 -*-
import json

part2_cards_b = [
  {
    "front": "das Kompliment",
    "back": "إِطْرَاء",
    "roman": "iṭrāʾ",
    "example": "فَرِحَتْ كَثِيرًا بِالْإِطْرَاءِ اللَّطِيفِ عَلَى عَرْضِهَا التَّقْدِيمِيِّ.",
    "exampleDE": "Sie freute sich sehr über das nette Kompliment zu ihrem Vortrag."
  },
  {
    "front": "die Fußgängerzone",
    "back": "مِنْطَقَةُ مُشَاة",
    "roman": "minṭaqat mushāh",
    "example": "فِي مِنْطَقَةِ الْمُشَاةِ الْمُزْدَحِمَةِ تَتَتَابَعُ الْمَحَلَّاتُ الْوَاحِدُ تِلْوَ الْآخَرِ.",
    "exampleDE": "In der belebten Fußgängerzone reiht sich ein Geschäft an das andere."
  },
  {
    "front": "der Zebrastreifen",
    "back": "مَمَرُّ مُشَاة",
    "roman": "mamarr mushāh",
    "example": "تَتَوَقَّفُ السَّيَّارَاتُ عِنْدَ مَمَرِّ الْمُشَاةِ لِلسَّمَاحِ لَهُمْ بِالْعُبُورِ.",
    "exampleDE": "Am Zebrastreifen halten die Autos an, um Fußgänger queren zu lassen."
  },
  {
    "front": "der Bürgersteig",
    "back": "رَصِيف",
    "roman": "raṣīf",
    "example": "يَرْكَبُ الْأَطْفَالُ سُكُوتَرَاتِهِمْ بِأَمَانٍ عَلَى الرَّصِيفِ الْعَرِيضِ.",
    "exampleDE": "Die Kinder fahren mit ihren Rollern sicher auf dem breiten Bürgersteig."
  },
  {
    "front": "die Ampel",
    "back": "إِشَارَةُ مُرُور",
    "roman": "ishārat murūr",
    "example": "عِنْدَمَا تَتَحَوَّلُ إِشَارَةُ الْمُرُورِ إِلَى اللَّوْنِ الْأَحْمَرِ، يَجِبُ عَلَى جَمِيعِ الْمَرْكَبَاتِ التَّوَقُّفُ.",
    "exampleDE": "Wenn die Ampel auf Rot schaltet, müssen alle Fahrzeuge anhalten."
  },
  {
    "front": "die Kreuzung",
    "back": "تَقَاطُع",
    "roman": "taqāṭuʿ",
    "example": "عِنْدَ التَّقَاطُعِ الْكَبِيرِ التَّالِي، انْعَطِفْ يَمِينًا مِنْ فَضْلِكَ.",
    "exampleDE": "An der nächsten großen Kreuzung biegen Sie bitte rechts ab."
  },
  {
    "front": "die Einbahnstraße",
    "back": "شَارِعٌ ذُو اتِّجَاهٍ وَاحِد",
    "roman": "shāriʿ dhū ttijāh wāḥid",
    "example": "انْتَبِهْ إِلَى اللَّافِتَةِ، فَهَذَا الزُّقَاقُ الضَّيِّقُ هُوَ شَارِعٌ ذُو اتِّجَاهٍ وَاحِدٍ.",
    "exampleDE": "Achten Sie auf das Schild, diese schmale Gasse ist eine Einbahnstraße."
  },
  {
    "front": "der Marktplatz",
    "back": "سَاحَةُ السُّوق",
    "roman": "sāḥat as-sūq",
    "example": "أَيَّامَ الْأَرْبِعَاءِ وَالسَّبْتِ يُقَامُ السُّوقُ الْأُسْبُوعِيُّ فِي سَاحَةِ السُّوقِ.",
    "exampleDE": "Mittwochs und samstags findet auf dem Marktplatz der Wochenmarkt statt."
  },
  {
    "front": "das Rathaus",
    "back": "مَبْنَى الْبَلَدِيَّة",
    "roman": "mabnā l-baladiyya",
    "example": "يَقَعُ مَبْنَى الْبَلَدِيَّةِ التَّارِيخِيُّ مَعَ بُرْجِهِ الْمُمَيَّزِ فِي الْمَرْكَزِ.",
    "exampleDE": "Das historische Rathaus mit seinem markanten Turm steht im Zentrum."
  },
  {
    "front": "der Fahrplan",
    "back": "جَدْوَلُ مَوَاعِيد",
    "roman": "jadwal mawāʿīd",
    "example": "فِي جَدْوَلِ الْمَوَاعِيدِ عِنْدَ الْمَوْقِفِ تُوجَدُ جَمِيعُ أَوْقَاتِ الْمُغَادَرَةِ.",
    "exampleDE": "Auf dem Fahrplan an der Haltestelle stehen alle Abfahrtszeiten."
  },
  {
    "front": "die Haltestelle",
    "back": "مَوْقِف",
    "roman": "mawqif",
    "example": "يَتَوَقَّفُ التِّرَامُ مُبَاشَرَةً فِي الْمَوْقِفِ أَمَامَ الْمَتْحَفِ.",
    "exampleDE": "Die Straßenbahn hält direkt an der Haltestelle vor dem Museum."
  },
  {
    "front": "die Fahrkarte",
    "back": "تَذْكِرَة",
    "roman": "tadhkira",
    "example": "اشْتَرِ التَّذْكِرَةَ مِنْ آلَةِ التَّذَاكِرِ قَبْلَ الصُّعُودِ مِنْ فَضْلِكَ.",
    "exampleDE": "Kaufen Sie die Fahrkarte bitte vor dem Einsteigen am Automaten."
  },
  {
    "front": "der Entwerter",
    "back": "جِهَازُ خَتْمِ التَّذَاكِر",
    "roman": "jihāz khatm at-tadhākir",
    "example": "أَدْخِلِ التَّذْكِرَةَ فِي جِهَازِ خَتْمِ التَّذَاكِرِ لِتَصِيرَ صَالِحَةً.",
    "exampleDE": "Stecken Sie das Ticket in den Entwerter, um es gültig zu machen."
  },
  {
    "front": "umsteigen",
    "back": "بَدَّلَ وَسِيلَةَ الْمُوَاصَلَات",
    "roman": "baddala wasīlat al-muwāṣalāt",
    "example": "فِي الْمَحَطَّةِ الرَّئِيسِيَّةِ يَجِبُ أَنْ نُبَدِّلَ إِلَى خَطِّ مِتْرُو الْأَنْفَاقِ رَقْمِ 2.",
    "exampleDE": "Am Hauptbahnhof müssen wir in die U-Bahn-Linie 2 umsteigen."
  },
  {
    "front": "die Verspätung",
    "back": "تَأْخِير",
    "roman": "taʾkhīr",
    "example": "بِسَبَبِ عُطْلٍ فِي التَّحْوِيلَةِ تَأَخَّرَتِ الْحَافِلَةُ عَشْرَ دَقَائِقَ.",
    "exampleDE": "Wegen einer Weichenstörung hat der Bus zehn Minuten Verspätung."
  },
  {
    "front": "die Monatskarte",
    "back": "تَذْكِرَةٌ شَهْرِيَّة",
    "roman": "tadhkira shahriyya",
    "example": "لِلْمُتَنَقِّلِينَ يَوْمِيًّا إِلَى الْعَمَلِ تَكُونُ التَّذْكِرَةُ الشَّهْرِيَّةُ الشَّخْصِيَّةُ مُجْدِيَةً.",
    "exampleDE": "Für Berufspendler lohnt sich eine persönliche Monatskarte."
  },
  {
    "front": "der Führerschein",
    "back": "رُخْصَةُ قِيَادَة",
    "roman": "rukhṣat qiyāda",
    "example": "فِي سِنِّ الثَّامِنَةَ عَشْرَةَ اجْتَازَتِ امْتِحَانَ رُخْصَةِ الْقِيَادَةِ.",
    "exampleDE": "Mit achtzehn Jahren bestand sie die Prüfung für den Führerschein."
  },
  {
    "front": "der Sicherheitsgurt",
    "back": "حِزَامُ أَمَان",
    "roman": "ḥizām amān",
    "example": "يُرْجَى رَبْطُ حِزَامِ الْأَمَانِ وَوَضْعُهُ بِإِحْكَامٍ.",
    "exampleDE": "Bitte schnallen Sie sich an und legen Sie den Sicherheitsgurt an."
  },
  {
    "front": "die Tankstelle",
    "back": "مَحَطَّةُ وَقُود",
    "roman": "maḥaṭṭat waqūd",
    "example": "فِي مَحَطَّةِ الْوَقُودِ التَّالِيَةِ يَجِبُ أَنْ نَمْلَأَ الْبَنْزِينَ وَمَاءَ الْمَسَّاحَاتِ.",
    "exampleDE": "An der nächsten Tankstelle müssen wir Benzin und Wischwasser nachfüllen."
  },
  {
    "front": "der Kofferraum",
    "back": "صُنْدُوقُ السَّيَّارَة",
    "roman": "ṣundūq as-sayyāra",
    "example": "فِي صُنْدُوقِ السَّيَّارَةِ الْوَاسِعِ مَكَانٌ كَافٍ لِثَلَاثِ حَقَائِبَ كَبِيرَةٍ.",
    "exampleDE": "Im geräumigen Kofferraum ist genug Platz für drei große Koffer."
  },
  {
    "front": "der Rückspiegel",
    "back": "مِرْآةُ الرُّؤْيَةِ الْخَلْفِيَّة",
    "roman": "mirʾāt ar-ruʾya al-khalfiyya",
    "example": "قَبْلَ تَغْيِيرِ الْمَسَارِ يَنْظُرُ السَّائِقُ بِانْتِبَاهٍ فِي مِرْآةِ الرُّؤْيَةِ الْخَلْفِيَّةِ.",
    "exampleDE": "Vor dem Spurwechsel schaut der Fahrer aufmerksam in den Rückspiegel."
  },
  {
    "front": "der Blinker",
    "back": "غَمَّاز",
    "roman": "ghammāz",
    "example": "لَا تَنْسَ تَشْغِيلَ الْغَمَّازِ فِي الْوَقْتِ الْمُنَاسِبِ عِنْدَ الِانْعِطَافِ.",
    "exampleDE": "Vergessen Sie beim Abbiegen nicht, rechtzeitig den Blinker zu setzen."
  },
  {
    "front": "der Scheibenwischer",
    "back": "مَسَّاحَةُ زُجَاج",
    "roman": "massāḥat zujāj",
    "example": "عِنْدَ هُطُولِ الْمَطَرِ الْغَزِيرِ تَعْمَلُ مَسَّاحَاتُ الزُّجَاجِ عَلَى أَعْلَى سُرْعَةٍ.",
    "exampleDE": "Bei starkem Regen laufen die Scheibenwischer auf höchster Stufe."
  },
  {
    "front": "der Stau",
    "back": "زَحْمَةُ سَيْر",
    "roman": "zaḥmat sayr",
    "example": "بِسَبَبِ وُرْشَةِ بِنَاءٍ تَقِفُ السَّيَّارَاتُ فِي زَحْمَةِ سَيْرٍ عَلَى الطَّرِيقِ السَّرِيعِ.",
    "exampleDE": "Wegen einer Baustelle stehen die Autos auf der Autobahn im Stau."
  },
  {
    "front": "der Fahrradhelm",
    "back": "خُوذَةُ دَرَّاجَة",
    "roman": "khūdhat darrāja",
    "example": "خُوذَةُ الدَّرَّاجَةِ الْمُحْكَمَةُ تَحْمِي الرَّأْسَ عِنْدَ السُّقُوطِ.",
    "exampleDE": "Ein gut sitzender Fahrradhelm schützt den Kopf bei einem Sturz."
  },
  {
    "front": "der Fahrradweg",
    "back": "مَسَارُ دَرَّاجَات",
    "roman": "masār darrājāt",
    "example": "يَمْتَدُّ عَلَى طُولِ النَّهْرِ مَسَارُ دَرَّاجَاتٍ عَرِيضٌ وَمُعَبَّدٌ.",
    "exampleDE": "Entlang des Flusses verläuft ein breiter und asphaltierter Fahrradweg."
  },
  {
    "front": "das Fahrradschloss",
    "back": "قُفْلُ دَرَّاجَة",
    "roman": "qufl darrāja",
    "example": "اقْفِلْ دَرَّاجَتَكَ دَائِمًا بِقُفْلِ دَرَّاجَةٍ مَتِينٍ.",
    "exampleDE": "Schließen Sie Ihr Rad immer mit einem stabilen Fahrradschloss an."
  },
  {
    "front": "die Klingel",
    "back": "جَرَس",
    "roman": "jaras",
    "example": "بِرَنَّةٍ قَصِيرَةٍ لِلْجَرَسِ تُحَذِّرُ الْمُشَاةَ.",
    "exampleDE": "Mit einer kurzen Betätigung der Klingel warnt sie Fußgänger vor."
  },
  {
    "front": "die Luftpumpe",
    "back": "مِنْفَاخُ هَوَاء",
    "roman": "minfākh hawāʾ",
    "example": "بِمِنْفَاخِ الْهَوَاءِ الْيَدَوِيِّ يَضْبِطُ ضَغْطَ الْإِطَارِ عَلَى الْوَضْعِ الْأَمْثَلِ.",
    "exampleDE": "Mit der Handluftpumpe bringt er den Reifendruck auf das Optimum."
  },
  {
    "front": "der E-Scooter",
    "back": "سُكُوتَر كَهْرَبَائِيّ",
    "roman": "skūtar kahrabāʾiyy",
    "example": "فِي وَسَطِ الْمَدِينَةِ يَسْتَأْجِرُ الْكَثِيرُ مِنَ الْمُتَنَقِّلِينَ سُكُوتَرًا كَهْرَبَائِيًّا.",
    "exampleDE": "In der Innenstadt leihen sich viele Pendler einen E-Scooter."
  },
  {
    "front": "die Pedale",
    "back": "دَوَّاسَة",
    "roman": "dawwāsa",
    "example": "يَضْغَطُ بِقُوَّةٍ عَلَى الدَّوَّاسَاتِ لِيَصْعَدَ التَّلَّ شَدِيدَ الِانْحِدَارِ.",
    "exampleDE": "Er tritt kräftig in die Pedale, um den steilen Hügel hinaufzufahren."
  },
  {
    "front": "der Hauptbahnhof",
    "back": "مَحَطَّةُ قِطَارَاتٍ رَئِيسِيَّة",
    "roman": "maḥaṭṭat qiṭārāt raʾīsiyya",
    "example": "مِنَ الْمَحَطَّةِ الرَّئِيسِيَّةِ تَنْطَلِقُ الْقِطَارَاتُ إِلَى جَمِيعِ الْعَوَاصِمِ الْأُورُوبِّيَّةِ.",
    "exampleDE": "Vom Hauptbahnhof aus fahren Züge in alle europäischen Metropolen."
  },
  {
    "front": "der Bahnsteig",
    "back": "رَصِيفُ قِطَار",
    "roman": "raṣīf qiṭār",
    "example": "يَنْتَظِرُ الرُّكَّابُ عَلَى الرَّصِيفِ رَقْمِ أَرْبَعَةٍ الْقِطَارَ الْقَادِمَ.",
    "exampleDE": "Die Fahrgäste warten auf Bahnsteig vier auf den einfahrenden Zug."
  },
  {
    "front": "das Gleis",
    "back": "سِكَّة",
    "roman": "sikka",
    "example": "يَنْطَلِقُ الْقِطَارُ السَّرِيعُ إِلَى بَرْلِينَ الْيَوْمَ اسْتِثْنَائِيًّا مِنَ السِّكَّةِ رَقْمِ تِسْعَةٍ.",
    "exampleDE": "Der Schnellzug nach Berlin fährt heute abweichend von Gleis neun."
  },
  {
    "front": "die Sitzplatzreservierung",
    "back": "حَجْزُ مَقْعَد",
    "roman": "ḥajz maqʿad",
    "example": "حَجْزُ الْمَقْعَدِ يُوَفِّرُ عَنَاءَ الْبَحْثِ الطَّوِيلِ فِي الْقِطَارِ الْمُمْتَلِئِ.",
    "exampleDE": "Eine Sitzplatzreservierung erspart langes Suchen im vollen Zug."
  },
  {
    "front": "der Schaffner",
    "back": "كَمْسَارِيّ",
    "roman": "kamsāriyy",
    "example": "يُفَتِّشُ الْكَمْسَارِيُّ اللَّطِيفُ تَذَاكِرَ الرُّكَّابِ.",
    "exampleDE": "Der freundliche Schaffner kontrolliert die Tickets der Fahrgäste."
  },
  {
    "front": "der Speisewagen",
    "back": "عَرَبَةُ طَعَام",
    "roman": "ʿarabat ṭaʿām",
    "example": "فِي عَرَبَةِ الطَّعَامِ يُمْكِنُ الِاسْتِمْتَاعُ بِالْقَهْوَةِ وَالْوَجَبَاتِ الْخَفِيفَةِ أَثْنَاءَ الرِّحْلَةِ.",
    "exampleDE": "Im Speisewagen kann man während der Fahrt Kaffee und Snacks genießen."
  },
  {
    "front": "der Anschlusszug",
    "back": "قِطَارُ رَبْط",
    "roman": "qiṭār rabṭ",
    "example": "رَغْمَ التَّأْخِيرِ الْقَصِيرِ، لَحِقَ جَمِيعُ الْمُسَافِرِينَ بِقِطَارِ الرَّبْطِ الخَاصِّ بِهِمْ.",
    "exampleDE": "Trotz kurzer Verspätung erreichten alle Reisenden ihren Anschlusszug."
  },
  {
    "front": "das Gepäckfach",
    "back": "رَفُّ أَمْتِعَة",
    "roman": "raff amtiʿa",
    "example": "تُوضَعُ حَقَائِبُ السَّفَرِ الثَّقِيلَةُ بِأَمَانٍ فِي رَفِّ الْأَمْتِعَةِ الْعُلْوِيِّ.",
    "exampleDE": "Schwere Reisetaschen verstaut man sicher im oberen Gepäckfach."
  },
  {
    "front": "der Flughafen",
    "back": "مَطَار",
    "roman": "maṭār",
    "example": "نَذْهَبُ بِالْقِطَارِ إِلَى الْمَطَارِ قَبْلَ سَاعَتَيْنِ مِنْ مَوْعِدِ الْإِقْلَاعِ.",
    "exampleDE": "Wir fahren zwei Stunden vor dem Abflug mit dem Zug zum Flughafen."
  },
  {
    "front": "die Bordkarte",
    "back": "بِطَاقَةُ صُعُودِ الطَّائِرَة",
    "roman": "biṭāqat ṣuʿūd aṭ-ṭāʾira",
    "example": "يُرْجَى إِبْرَازُ بِطَاقَةِ صُعُودِ الطَّائِرَةِ وَالْهُوِيَّةِ عِنْدَ الصُّعُودِ.",
    "exampleDE": "Zeigen Sie beim Einsteigen bitte Ihre Bordkarte und den Ausweis vor."
  },
  {
    "front": "die Sicherheitskontrolle",
    "back": "نُقْطَةُ تَفْتِيشٍ أَمْنِيّ",
    "roman": "nuqṭat taftīsh amniyy",
    "example": "عِنْدَ نُقْطَةِ التَّفْتِيشِ الْأَمْنِيِّ يَجِبُ إِبْرَازُ الْحَوَاسِيبِ الْمَحْمُولَةِ بِشَكْلٍ مُنْفَصِلٍ.",
    "exampleDE": "An der Sicherheitskontrolle müssen Laptops separat vorgezeigt werden."
  },
  {
    "front": "das Abfluggos",
    "back": "بَوَّابَةُ مُغَادَرَة",
    "roman": "bawwābat mughādara",
    "example": "تُقْلِعُ الطَّائِرَةُ الْمُتَّجِهَةُ إِلَى رُومَا فِي الْمَوْعِدِ مِنْ بَوَّابَةِ الْمُغَادَرَةِ B12.",
    "exampleDE": "Das Flugzeug nach Rom startet pünktlich an Abfluggate B zwölf."
  },
  {
    "front": "das Handgepäck",
    "back": "حَقِيبَةُ يَدٍ لِلسَّفَر",
    "roman": "ḥaqībat yad li-s-safar",
    "example": "السَّوَائِلُ فِي حَقِيبَةِ الْيَدِ لِلسَّفَرِ يَجِبُ أَلَّا تَتَجَاوَزَ مِائَةَ مِلِّيلِتْرٍ كَحَدٍّ أَقْصَى.",
    "exampleDE": "Flüssigkeiten im Handgepäck dürfen maximal hundert Milliliter fassen."
  },
  {
    "front": "die Gepäckausgabe",
    "back": "مَنْطِقَةُ اسْتِلَامِ الْأَمْتِعَة",
    "roman": "minṭaqat istilām al-amtiʿa",
    "example": "بَعْدَ الْهُبُوطِ يَسْتَلِمُ الْمَرْءُ الْحَقَائِبَ مِنْ مِنْطَقَةِ اسْتِلَامِ الْأَمْتِعَةِ.",
    "exampleDE": "Nach der Landung holt man die Koffer an der Gepäckausgabe ab."
  },
  {
    "front": "der Reisepass",
    "back": "جَوَازُ سَفَر",
    "roman": "jawāz safar",
    "example": "لِلسَّفَرِ خَارِجَ الِاتِّحَادِ الْأُورُوبِّيِّ يَحْتَاجُ الْمَرْءُ إِلَى جَوَازِ سَفَرٍ.",
    "exampleDE": "Für Reisen außerhalb der Europäischen Union benötigt man einen Reisepass."
  },
  {
    "front": "die Rezeption",
    "back": "مَكْتَبُ اسْتِقْبَال",
    "roman": "maktab istiqbāl",
    "example": "مَكْتَبُ اسْتِقْبَالِ الْفُنْدُقِ مَأْهُولٌ بِالْمُوَظَّفِينَ عَلَى مَدَارِ السَّاعَةِ.",
    "exampleDE": "Die Rezeption des Hotels ist rund um die Uhr mit Personal besetzt."
  },
  {
    "front": "die Schlüsselkarte",
    "back": "بِطَاقَةُ مِفْتَاح",
    "roman": "biṭāqat miftāḥ",
    "example": "بِبِطَاقَةِ الْمِفْتَاحِ الْإِلِكْتُرُونِيَّةِ يُفْتَحُ بَابُ الْغُرْفَةِ.",
    "exampleDE": "Mit der elektronischen Schlüsselkarte öffnet sich die Zimmertür."
  },
  {
    "front": "das Einzelzimmer",
    "back": "غُرْفَةٌ مُفْرَدَة",
    "roman": "ghurfa mufrada",
    "example": "لِرِحْلَةِ الْعَمَلِ يَحْجِزُ غُرْفَةً مُفْرَدَةً هَادِئَةً.",
    "exampleDE": "Für die Geschäftsreise bucht er ein ruhiges Einzelzimmer."
  },
  {
    "front": "das Doppelzimmer",
    "back": "غُرْفَةٌ مُزْدَوِجَة",
    "roman": "ghurfa muzdawija",
    "example": "تُوَفِّرُ الْغُرْفَةُ الْمُزْدَوِجَةُ إِطْلَالَةً رَائِعَةً عَلَى الْبَحْرِ.",
    "exampleDE": "Das Doppelzimmer bietet einen herrlichen Ausblick auf das Meer."
  },
  {
    "front": "das Frühstücksbuffet",
    "back": "بُوفِيهُ إِفْطَار",
    "roman": "būfēh ifṭār",
    "example": "بُوفِيهُ الْإِفْطَارِ الْغَنِيُّ يُلَبِّي جَمِيعَ الرَّغَبَاتِ.",
    "exampleDE": "Das reichhaltige Frühstücksbuffet lässt keine kulinarischen Wünsche offen."
  },
  {
    "front": "der Zimmerservice",
    "back": "خِدْمَةُ الْغُرَف",
    "roman": "khidmat al-ghuraf",
    "example": "يُمْكِنُ طَلَبُ الْعَشَاءِ بِسُهُولَةٍ عَبْرَ خِدْمَةِ الْغُرَفِ.",
    "exampleDE": "Man kann sich das Abendessen bequem über den Zimmerservice bestellen."
  },
  {
    "front": "auschecken",
    "back": "سَجَّلَ الْمُغَادَرَة",
    "roman": "sajjala l-mughādara",
    "example": "يَجِبُ عَلَى نُزَلَاءِ الْفُنْدُقِ تَسْجِيلُ الْمُغَادَرَةِ فِي الْحَادِيَةَ عَشْرَةَ صَبَاحًا كَحَدٍّ أَقْصَى.",
    "exampleDE": "Die Hotelgäste müssen bis spätestens elf Uhr vormittags auschecken."
  },
  {
    "front": "die Jugendherberge",
    "back": "نُزُلُ شَبَاب",
    "roman": "nuzul shabāb",
    "example": "لِمُسَافِرِي حَقَائِبِ الظَّهْرِ، يُعَدُّ نُزُلُ الشَّبَابِ خِيَارَ إِقَامَةٍ رَخِيصًا.",
    "exampleDE": "Für Rucksackreisende ist die Jugendherberge eine günstige Übernachtungsmöglichkeit."
  },
  {
    "front": "die Ferienwohnung",
    "back": "شَقَّةُ عُطْلَات",
    "roman": "shaqqat ʿuṭlāt",
    "example": "لِعُطْلَةِ الْعَائِلَةِ نَسْتَأْجِرُ شَقَّةَ عُطْلَاتٍ مُرِيحَةً.",
    "exampleDE": "Für den Familienurlaub mieten wir eine gemütliche Ferienwohnung."
  },
  {
    "front": "das Reiseziel",
    "back": "وُجْهَةُ سَفَر",
    "roman": "wijhat safar",
    "example": "إِيطَالْيَا هِيَ وُجْهَةُ سَفَرِهَا الْمُفَضَّلَةُ فِي الصَّيْفِ مُنْذُ سَنَوَاتٍ عَدِيدَةٍ.",
    "exampleDE": "Italien ist seit vielen Jahren ihr liebstes Reiseziel im Sommer."
  },
  {
    "front": "die Sehenswürdigkeit",
    "back": "مَعْلَمٌ سِيَاحِيّ",
    "roman": "maʿlam siyāḥiyy",
    "example": "الْكَاتِدْرَائِيَّةُ التَّارِيخِيَّةُ هِيَ أَشْهَرُ مَعْلَمٍ سِيَاحِيٍّ فِي الْمَدِينَةِ.",
    "exampleDE": "Die historische Kathedrale ist die bekannteste Sehenswürdigkeit der Stadt."
  },
  {
    "front": "der Reiseleiter",
    "back": "مُرْشِدٌ سِيَاحِيّ",
    "roman": "murshid siyāḥiyy",
    "example": "يَشْرَحُ الْمُرْشِدُ السِّيَاحِيُّ الْخَبِيرُ التَّارِيخَ الْمُثِيرَ لِلْمَبْنَى.",
    "exampleDE": "Der kundige Reiseleiter erklärt die spannende Geschichte des Bauwerks."
  },
  {
    "front": "das Souvenir",
    "back": "تِذْكَار",
    "roman": "tidhkār",
    "example": "كَتِذْكَارٍ جَمِيلٍ اشْتَرَتْ وِعَاءً خَزَفِيًّا مَرْسُومًا يَدَوِيًّا.",
    "exampleDE": "Als schönes Souvenir kaufte sie eine handbemalte Keramikschale."
  },
  {
    "front": "die Ansichtskarte",
    "back": "بِطَاقَةٌ بَرِيدِيَّةٌ مُصَوَّرَة",
    "roman": "biṭāqa barīdiyya muṣawwara",
    "example": "يَكْتُبُ بِطَاقَةً بَرِيدِيَّةً مُصَوَّرَةً مَعَ تَحِيَّاتٍ لِجَدَّيْهِ.",
    "exampleDE": "Er schreibt eine Ansichtskarte mit Grüßen an seine Großeltern."
  },
  {
    "front": "der Sonnenbrand",
    "back": "حَرْقُ شَمْس",
    "roman": "ḥarq shams",
    "example": "بِدُونِ كَرِيمِ الشَّمْسِ الْوَاقِي يُخَاطِرُ الْمَرْءُ بِحَرْقِ شَمْسٍ عَلَى الشَّاطِئِ.",
    "exampleDE": "Ohne schützende Sonnencreme riskiert man am Strand einen Sonnenbrand."
  },
  {
    "front": "der Campingplatz",
    "back": "مَوْقِعُ تَخْيِيم",
    "roman": "mawqiʿ takhyīm",
    "example": "يَقَعُ مَوْقِعُ التَّخْيِيمِ فِي مَكَانٍ بَدِيعٍ مُبَاشَرَةً عِنْدَ بُحَيْرَةِ اسْتِحْمَامٍ صَافِيَةٍ.",
    "exampleDE": "Der Campingplatz liegt idyllisch direkt an einem klaren Badesee."
  },
  {
    "front": "das Zelt",
    "back": "خَيْمَة",
    "roman": "khayma",
    "example": "نَصَبُوا مَعًا الْخَيْمَةَ عَلَى مَرْجٍ مُسْتَوٍ.",
    "exampleDE": "Gemeinsam bauten sie das Zelt auf einer ebenen Wiese auf."
  },
  {
    "front": "der Schlafsack",
    "back": "كِيسُ نَوْم",
    "roman": "kīs nawm",
    "example": "كِيسُ النَّوْمِ الدَّافِئُ يَحْمِي بِمَوْثُوقِيَّةٍ مِنَ الْبَرْدِ اللَّيْلِيِّ.",
    "exampleDE": "Ein warmer Schlafsack schützt zuverlässig vor der nächtlichen Kälte."
  },
  {
    "front": "die Isomatte",
    "back": "فِرَاشُ عَزْل",
    "roman": "firāsh ʿazl",
    "example": "فِرَاشُ الْعَزْلِ النَّاعِمُ يَعْزِلُ ضِدَّ رُطُوبَةِ الْأَرْضِ.",
    "exampleDE": "Die weiche Isomatte isoliert gegen die Feuchtigkeit des Bodens."
  },
  {
    "front": "die Taschenlampe",
    "back": "مِصْبَاحٌ يَدَوِيّ",
    "roman": "miṣbāḥ yadawiyy",
    "example": "فِي الظَّلَامِ يُضِيءُ لِنَفْسِهِ الطَّرِيقَ بِالْمِصْبَاحِ الْيَدَوِيِّ.",
    "exampleDE": "Im Dunkeln leuchtet er sich den Weg mit der Taschenlampe."
  },
  {
    "front": "der Gaskocher",
    "back": "مَوْقِدُ غَاز",
    "roman": "mawqid ghāz",
    "example": "عَلَى مَوْقِدِ الْغَازِ الصَّغِيرِ يَطْبُخُونَ قَهْوَةً طَازَجَةً فِي الصَّبَاحِ.",
    "exampleDE": "Auf dem kleinen Gaskocher kochen sie morgens frischen Kaffee."
  },
  {
    "front": "das Lagerfeuer",
    "back": "نَارُ مُخَيَّم",
    "roman": "nār mukhayyam",
    "example": "فِي الْمَسَاءِ جَلَسَ الْجَمِيعُ بِاسْتِرْخَاءٍ حَوْلَ نَارِ الْمُخَيَّمِ الْمُطَقْطِقَةِ.",
    "exampleDE": "Am Abend saßen alle gemütlich um das knisternde Lagerfeuer."
  },
  {
    "front": "das Mückenspray",
    "back": "بَخَّاخُ بَعُوض",
    "roman": "bakhkhākh baʿūḍ",
    "example": "بِالْقُرْبِ مِنَ الْمَسَاحَاتِ الْمَائِيَّةِ يُنْصَحُ بِاسْتِخْدَامِ بَخَّاخِ بَعُوضٍ فَعَّالٍ.",
    "exampleDE": "In Gewässernähe empfiehlt sich ein wirksames Mückenspray."
  },
  {
    "front": "der Berggipfel",
    "back": "قِمَّةُ جَبَل",
    "roman": "qimmat jabal",
    "example": "مِنْ قِمَّةِ الْجَبَلِ الْمُغَطَّاةِ بِالثُّلُوجِ يَتَمَتَّعُ الْمَرْءُ بِمَنْظَرٍ بَعِيدٍ رَائِعٍ.",
    "exampleDE": "Vom schneebedeckten Berggipfel hat man eine fantastische Fernsicht."
  },
  {
    "front": "der Gebirgsbach",
    "back": "جَدْوَلٌ جَبَلِيّ",
    "roman": "jadwal jabaliyy",
    "example": "مَاءٌ صَافٍ وَشَدِيدُ الْبُرُودَةِ يَتَرَقْرَقُ عَبْرَ الْجَدْوَلِ الْجَبَلِيِّ.",
    "exampleDE": "Klares, eiskaltes Wasser plätschert durch den Gebirgsbach."
  },
  {
    "front": "die Klippe",
    "back": "جُرْفٌ صَخْرِيّ",
    "roman": "jurf ṣakhriyy",
    "example": "تَتَكَسَّرُ الْأَمْوَاجُ بِهَدِيرٍ عَالٍ عَلَى الْجُرْفِ الصَّخْرِيِّ الشَّاهِقِ.",
    "exampleDE": "Wellen brechen mit lautem Tosen an der steilen Felsklippe."
  },
  {
    "front": "die Sanddüne",
    "back": "كَثِيبٌ رَمْلِيّ",
    "roman": "kathīb ramliyy",
    "example": "الرِّيَاحُ الْمُسْتَمِرَّةُ تُشَكِّلُ الْكُثْبَانَ الرَّمْلِيَّةَ النَّاعِمَةَ عَلَى السَّاحِلِ.",
    "exampleDE": "Der stetige Wind formt die feinen Sanddünen an der Küste."
  },
  {
    "front": "der Wasserfall",
    "back": "شَلَّال",
    "roman": "shallāl",
    "example": "يَنْحَدِرُ الْمَاءُ بِهَدِيرٍ فَوْقَ الشَّلَّالِ الَّذِي يَبْلُغُ ارْتِفَاعُهُ عِشْرِينَ مِتْرًا.",
    "exampleDE": "Das Wasser stürzt tosend über den zwanzig Meter hohen Wasserfall."
  },
  {
    "front": "die Halbinsel",
    "back": "شِبْهُ جَزِيرَة",
    "roman": "shibh jazīra",
    "example": "شِبْهُ الْجَزِيرَةِ الْخَلَّابَةُ تَمْتَدُّ بَعِيدًا فِي الْبَحْرِ السَّمَاوِيِّ الزُّرْقَةِ.",
    "exampleDE": "Die malerische Halbinsel ragt weit in das azurblaue Meer hinein."
  },
  {
    "front": "das Flussufer",
    "back": "ضَفَّةُ نَهْر",
    "roman": "ḍaffat nahr",
    "example": "عَلَى الْمَرْجِ الْأَخْضَرِ عِنْدَ ضَفَّةِ النَّهْرِ يُمْكِنُ الْقِيَامُ بِنُزْهَةٍ رَائِعَةٍ.",
    "exampleDE": "Auf der grünen Wiese am Flussufer kann man wunderbar picknicken."
  },
  {
    "front": "der Laubwald",
    "back": "غَابَةٌ نَفْضِيَّة",
    "roman": "ghāba nafḍiyya",
    "example": "فِي الْخَرِيفِ تَتَأَلَّقُ أَوْرَاقُ الْأَشْجَارِ الْمُلَوَّنَةُ فِي الْغَابَةِ النَّفْضِيَّةِ.",
    "exampleDE": "Im Herbst leuchtet das bunte Blätterkleid im Laubwald."
  },
  {
    "front": "der Nadelwald",
    "back": "غَابَةٌ صَنَوْبَرِيَّة",
    "roman": "ghāba ṣanawbariyya",
    "example": "فِي الْغَابَةِ الصَّنَوْبَرِيَّةِ تَعْبَقُ الرَّائِحَةُ النَّقِيَّةُ بِالصَّمْغِ وَالطُّحْلُبِ.",
    "exampleDE": "Im Nadelwald duftet die frische Luft nach Harz und Moos."
  },
  {
    "front": "die Eiche",
    "back": "شَجَرَةُ بَلُّوط",
    "roman": "shajarat ballūṭ",
    "example": "شَجَرَةُ الْبَلُّوطِ الْمُعَمِّرَةُ تَمْنَحُ ظِلًّا بَارِدًا فِي أَيَّامِ الصَّيْفِ الْحَارَّةِ.",
    "exampleDE": "Die uralte Eiche spendet an heißen Sommertagen kühlen Schatten."
  },
  {
    "front": "die Tanne",
    "back": "شَجَرَةُ شُوح",
    "roman": "shajarat shūḥ",
    "example": "فِي الشِّتَاءِ تُزَيَّنُ شَجَرَةُ الشُّوحِ الْخَضْرَاءُ كَشَجَرَةِ عِيدِ الْمِيلَادِ.",
    "exampleDE": "Im Winter schmückt man die grüne Tanne als Weihnachtsbaum."
  },
  {
    "front": "die Baumkrone",
    "back": "قِمَّةُ الشَّجَرَة",
    "roman": "qimmat ash-shajara",
    "example": "تُغَرِّدُ الطُّيُورُ مُخْتَبِئَةً فِي قِمَّةِ الشَّجَرَةِ الْكَثِيفَةِ.",
    "exampleDE": "Vögel zwitschern versteckt in der dichten Baumkrone."
  },
  {
    "front": "der Baumstamm",
    "back": "جِذْعُ شَجَرَة",
    "roman": "jidhʿ shajara",
    "example": "جِذْعُ الشَّجَرَةِ الضَّخْمُ يَزِيدُ مُحِيطُهُ عَنْ مِتْرَيْنِ.",
    "exampleDE": "Der mächtige Baumstamm hat einen Umfang von über zwei Metern."
  },
  {
    "front": "der Zapfen",
    "back": "كُوزُ صَنَوْبَر",
    "roman": "kūz ṣanawbar",
    "example": "يَجْمَعُ الْأَطْفَالُ أَكْوَازَ الصَّنَوْبَرِ الْبُنِّيَّةَ لِلْأَعْمَالِ الْيَدَوِيَّةِ.",
    "exampleDE": "Die Kinder sammeln braune Kiefernzapfen zum Basteln."
  },
  {
    "front": "das Moos",
    "back": "طُحْلُب",
    "roman": "ṭuḥlub",
    "example": "عَلَى الْحِجَارَةِ الظَّلِيلَةِ يَنْمُو بِسَاطٌ سَمِيكٌ مِنْ طُحْلُبٍ أَخْضَرَ.",
    "exampleDE": "Auf den schattigen Steinen wächst ein dicker Teppich aus grünem Moos."
  },
  {
    "front": "die Sonnenblume",
    "back": "دَوَّارُ الشَّمْس",
    "roman": "dawwār ash-shams",
    "example": "دَوَّارُ الشَّمْسِ الْأَصْفَرُ اللَّامِعُ يَتَّجِهُ دَائِمًا نَحْوَ النُّورِ.",
    "exampleDE": "Die leuchtend gelbe Sonnenblume wendet sich stets dem Licht zu."
  },
  {
    "front": "der Löwenzahn",
    "back": "هِنْدِبَاء",
    "roman": "hindibāʾ",
    "example": "فِي الرَّبِيعِ تُحَوِّلُ الْهِنْدِبَاءُ الْمَرْجَ إِلَى بَحْرٍ أَصْفَرَ.",
    "exampleDE": "Im Frühling verwandelt der Löwenzahn die Wiese in ein gelbes Meer."
  },
  {
    "front": "das Gänseblümchen",
    "back": "أُقْحُوَانٌ صَغِير",
    "roman": "uqḥuwān ṣaghīr",
    "example": "يَزْهَرُ الْأُقْحُوَانُ الصَّغِيرُ الْأَبْيَضُ فِي كُلِّ مَكَانٍ عَلَى الْعُشْبِ الْمَقْصُوصِ.",
    "exampleDE": "Kleine weiße Gänseblümchen wachsen überall im kurz gemähten Rasen."
  },
  {
    "front": "die Lilie",
    "back": "زَنْبَق",
    "roman": "zanbaq",
    "example": "الزَّنَابِقُ الْبَيْضَاءُ تَنْشُرُ عِطْرًا قَوِيًّا وَنَبِيلًا.",
    "exampleDE": "Weiße Lilien verströmen einen intensiven, edlen Duft."
  },
  {
    "front": "die Orchidee",
    "back": "سَحْلَبِيَّة",
    "roman": "saḥlabiyya",
    "example": "عَلَى حَافَّةِ النَّافِذَةِ الْمُشْمِسَةِ تُزْهِرُ سَحْلَبِيَّةٌ رَائِعَةٌ.",
    "exampleDE": "Auf der sonnigen Fensterbank blüht eine prächtige Orchidee."
  },
  {
    "front": "das Blütenblatt",
    "back": "بَتَلَة",
    "roman": "batala",
    "example": "هَبَّةُ رِيحٍ لَطِيفَةٍ تَنْفُخُ بَتَلَاتِ أَزْهَارٍ رَقِيقَةً عَبْرَ الْحَدِيقَةِ.",
    "exampleDE": "Ein sanfter Windstoß weht zarte Blütenblätter durch den Garten."
  },
  {
    "front": "verblühen",
    "back": "ذَبُلَ",
    "roman": "dhabula",
    "example": "بَعْدَ بِضْعَةِ أَسَابِيعَ مُشْمِسَةٍ تَبْدَأُ زُهُورُ الرَّبِيعِ بِالذُّبُولِ.",
    "exampleDE": "Nach einigen sonnigen Wochen beginnen die Frühlingsblumen zu verblühen."
  },
  {
    "front": "das Wildschwein",
    "back": "خِنْزِيرٌ بَرِّيّ",
    "roman": "khinzīr barriyy",
    "example": "قَطِيعٌ مِنْ خَنَازِيرَ بَرِّيَّةٍ يَجُوبُ الْغَابَةَ الْكَثِيفَةَ لَيْلًا.",
    "exampleDE": "Eine Rotte Wildschweine durchstreift nachts den dichten Wald."
  },
  {
    "front": "das Reh",
    "back": "ظَبْي",
    "roman": "ẓaby",
    "example": "عِنْدَ الْفَجْرِ يَرْعَى ظَبْيٌ خَجُولٌ عِنْدَ حَافَّةِ الْغَابَةِ.",
    "exampleDE": "In der Morgendämmerung äst ein scheues Reh am Waldrand."
  },
  {
    "front": "das Eichhörnchen",
    "back": "سِنْجَاب",
    "roman": "sinjāb",
    "example": "يُخَبِّئُ السِّنْجَابُ الرَّشِيقُ الْمُكَسَّرَاتِ لِأَشْهُرِ الشِّتَاءِ.",
    "exampleDE": "Das flinke Eichhörnchen versteckt Nüsse für die Wintermonate."
  },
  {
    "front": "der Igel",
    "back": "قُنْفُذ",
    "roman": "qunfudh",
    "example": "عِنْدَ الْخَطَرِ يَتَكَوَّرُ الْقُنْفُذُ عَلَى شَكْلِ كُرَةٍ شَوْكِيَّةٍ.",
    "exampleDE": "Bei Gefahr rollt sich der Igel zu einer stacheligen Kugel zusammen."
  },
  {
    "front": "der Dachs",
    "back": "غُرَيْر",
    "roman": "ghurayr",
    "example": "يَسْكُنُ الْغُرَيْرُ الْخَجُولُ جُحْرًا مُتَشَعِّبًا تَحْتَ الْأَشْجَارِ الْقَدِيمَةِ.",
    "exampleDE": "Der scheue Dachs bewohnt einen verzweigten Erdbau unter alten Bäumen."
  },
  {
    "front": "der Biber",
    "back": "قُنْدُس",
    "roman": "qundus",
    "example": "بِأَسْنَانٍ حَادَّةٍ يَقْطَعُ الْقُنْدُسُ أَشْجَارَ الصَّفْصَافِ الصَّغِيرَةَ عِنْدَ مَجْرَى الْجَدْوَلِ.",
    "exampleDE": "Mit scharfen Zähnen fällt der Biber junge Weiden am Bachlauf."
  },
  {
    "front": "die Fledermaus",
    "back": "خُفَّاش",
    "roman": "khuffāsh",
    "example": "فِي الْغَسَقِ يَصِيدُ الْخُفَّاشُ الصَّامِتُ عُثَّ اللَّيْلِ.",
    "exampleDE": "In der Abenddämmerung jagt die lautlose Fledermaus nach Nachtfaltern."
  },
  {
    "front": "der Feldhase",
    "back": "أَرْنَبٌ بَرِّيّ",
    "roman": "arnab barriyy",
    "example": "بِقَفَزَاتٍ وَاسِعَةٍ يَهْرُبُ الْأَرْنَبُ الْبَرِّيُّ الْيَقِظُ عَبْرَ الْحَقْلِ.",
    "exampleDE": "Mit weiten Sprüngen flieht der wachsame Feldhase über den Acker."
  },
  {
    "front": "der Spatz",
    "back": "عُصْفُورُ دُورِيّ",
    "roman": "ʿuṣfūr dūriyy",
    "example": "يَقْفِزُ عُصْفُورُ دُورِيٍّ صَغِيرٌ بِفُضُولٍ بَحْثًا عَنِ الْفُتَاتِ.",
    "exampleDE": "Ein kleiner Spatz hüpft neugierig auf der Suche nach Krümeln heran."
  }
]

if __name__ == '__main__':
    from build_ar_part2 import part2_cards
    all_cards = part2_cards + part2_cards_b
    print(f"Total part 2 cards: {len(all_cards)}")
    with open('scripts/data_ar_part2.json', 'w', encoding='utf-8') as f:
        json.dump(all_cards, f, ensure_ascii=False, indent=2)
    print("Saved scripts/data_ar_part2.json successfully.")
