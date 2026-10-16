# -*- coding: utf-8 -*-
import json

part1_cards = [
  {
    "front": "die Bettdecke",
    "back": "بَطَّانِيَّة",
    "roman": "baṭṭāniyya",
    "example": "الْبَطَّانِيَّةُ النَّاعِمَةُ تُبْقِي الدِّفْءَ جَيِّدًا فِي الشِّتَاءِ.",
    "exampleDE": "Die weiche Bettdecke hält im Winter schön warm."
  },
  {
    "front": "der Wecker",
    "back": "مُنَبِّه",
    "roman": "munabbih",
    "example": "يَرِنُّ الْمُنَبِّهُ فِي تَمَامِ السَّاعَةِ السَّابِعَةِ بِدِقَّةٍ.",
    "exampleDE": "Der Wecker klingelt pünktlich um sieben Uhr."
  },
  {
    "front": "das Schlummern",
    "back": "غَفْوَة",
    "roman": "ghafwa",
    "example": "بَعْدَ الرَّنَّةِ الْأُولَى لِلْمُنَبِّهِ، يَضْغَطُ عَلَى زِرِّ الْغَفْوَةِ.",
    "exampleDE": "Nach dem ersten Weckerklingeln drückt er auf die Schlummertaste."
  },
  {
    "front": "das Zähneputzen",
    "back": "تَنْظِيفُ الْأَسْنَان",
    "roman": "tanẓīf al-asnān",
    "example": "تَنْظِيفُ الْأَسْنَانِ بِعِنَايَةٍ مُهِمٌّ لِصِحَّةِ الْأَسْنَانِ.",
    "exampleDE": "Gründliches Zähneputzen ist wichtig für gesunde Zähne."
  },
  {
    "front": "sich anziehen",
    "back": "اِرْتَدَى مَلَابِسَهُ",
    "roman": "irtadā malābisahu",
    "example": "اِرْتَدِ مَلَابِسَكَ بِسُرْعَةٍ، يَجِبُ أَنْ نَنْطَلِقَ.",
    "exampleDE": "Zieh dich schnell an, wir müssen los."
  },
  {
    "front": "die Haarbürste",
    "back": "فُرْشَاةُ شَعْر",
    "roman": "furshāt shaʿr",
    "example": "تُمَشِّطُ شَعْرَهَا الطَّوِيلَ بِفُرْشَاةِ الشَّعْرِ.",
    "exampleDE": "Sie kämmt ihre langen Haare mit einer Haarbürste."
  },
  {
    "front": "der Spiegel",
    "back": "مِرْآة",
    "roman": "mirʾāh",
    "example": "يَنْظُرُ لِحَظْظَةٍ فِي الْمِرْآةِ فِي الرَّدْهَةِ.",
    "exampleDE": "Er schaut kurz in den Spiegel im Flur."
  },
  {
    "front": "die Routine",
    "back": "رُوتِين",
    "roman": "rūtīn",
    "example": "الرُّوتِينُ الصَّبَاحِيُّ الثَّابِتُ يُوَفِّرُ الْكَثِيرَ مِنَ الْوَقْتِ.",
    "exampleDE": "Eine feste Morgenroutine spart viel Zeit."
  },
  {
    "front": "der Mietvertrag",
    "back": "عَقْدُ إِيجَار",
    "roman": "ʿaqd ījār",
    "example": "وَقَّعْنَا أَمْسِ عَلَى عَقْدِ الْإِيجَارِ الْجَدِيدِ.",
    "exampleDE": "Wir haben gestern den neuen Mietvertrag unterschrieben."
  },
  {
    "front": "die Kaution",
    "back": "تَأْمِين",
    "roman": "taʾmīn",
    "example": "يَبْلُغُ التَّأْمِينُ مِقْدَارَ إِيجَارِ ثَلَاثَةِ أَشْهُرٍ.",
    "exampleDE": "Die Kaution beträgt drei Monatsmieten."
  },
  {
    "front": "die Nebenkosten",
    "back": "تَكَالِيفُ إِضَافِيَّة",
    "roman": "takālīf iḍāfiyya",
    "example": "التَّدْفِئَةُ وَالْمَاءُ مَشْمُولَانِ فِي التَّكَالِيفِ الْإِضَافِيَّةِ.",
    "exampleDE": "Heizung und Wasser sind in den Nebenkosten enthalten."
  },
  {
    "front": "der Vermieter",
    "back": "مُؤَجِّر",
    "roman": "muʾajjir",
    "example": "يُصْلِحُ الْمُؤَجِّرُ التَّدْفِئَةَ الْمُعَطَّلَةَ.",
    "exampleDE": "Der Vermieter repariert die defekte Heizung."
  },
  {
    "front": "der Mieter",
    "back": "مُسْتَأْجِر",
    "roman": "mustaʾjir",
    "example": "يَدْفَعُ الْمُسْتَأْجِرُ الْإِيجَارَ فِي بِدَايَةِ الشَّهْرِ.",
    "exampleDE": "Der Mieter bezahlt die Miete am Anfang des Monats."
  },
  {
    "front": "die Kündigung",
    "back": "إِنْهَاءُ الْعَقْد",
    "roman": "inhāʾ al-ʿaqd",
    "example": "يَجِبُ أَنْ يَكُونَ إِنْهَاءُ عَقْدِ الشَّقَّةِ الْقَدِيمَةِ كِتَابِيًّا.",
    "exampleDE": "Die Kündigung der alten Wohnung muss schriftlich erfolgen."
  },
  {
    "front": "die Wohnfläche",
    "back": "مِسَاحَةُ السَّكَن",
    "roman": "misāḥat as-sakan",
    "example": "تَبْلُغُ مِسَاحَةُ السَّكَنِ فِي الشَّقَّةِ ثَمَانِينَ مِتْرًا مُرَبَّعًا.",
    "exampleDE": "Die Wohnung hat eine Wohnfläche von achtzig Quadratmetern."
  },
  {
    "front": "der Umzug",
    "back": "اِنْتِقَال",
    "roman": "intiqāl",
    "example": "سَارَ الِانْتِقَالُ إِلَى الْمَدِينَةِ الْجَدِيدَةِ بِسَلَاسَةٍ.",
    "exampleDE": "Der Umzug in die neue Stadt verlief reibungslos."
  },
  {
    "front": "das Bücherregal",
    "back": "رَفُّ كُتُب",
    "roman": "raff kutub",
    "example": "رَفُّ الْكُتُبِ مَوْجُودٌ عِنْدَ الْجِدَارِ فِي غُرْفَةِ الْعَمَلِ.",
    "exampleDE": "Das Bücherregal steht an der Wand im Arbeitszimmer."
  },
  {
    "front": "der Kleiderschrank",
    "back": "خِزَانَةُ مَلَابِس",
    "roman": "khizānat malābis",
    "example": "يُعَلِّقُ قُمْصَانَهُ بِتَرْتِيبٍ فِي خِزَانَةِ الْمَلَابِسِ.",
    "exampleDE": "Er hängt seine Hemden ordentlich in den Kleiderschrank."
  },
  {
    "front": "der Schreibtischstuhl",
    "back": "كُرْسِيُّ مَكْتَب",
    "roman": "kursiyy maktab",
    "example": "كُرْسِيُّ الْمَكْتَبِ الْمُرِيحُ يَحْمِي الظَّهْرَ.",
    "exampleDE": "Ein bequemer Schreibtischstuhl schont den Rücken."
  },
  {
    "front": "die Stehlampe",
    "back": "مِصْبَاحٌ أَرْضِيّ",
    "roman": "miṣbāḥ arḍiyy",
    "example": "يُعْطِي الْمِصْبَاحُ الْأَرْضِيُّ ضَوْءًا دَافِئًا فِي الْمَسَاءِ.",
    "exampleDE": "Die Stehlampe spendet warmes Licht am Abend."
  },
  {
    "front": "der Esstisch",
    "back": "طَاوِلَةُ طَعَام",
    "roman": "ṭāwilat ṭaʿām",
    "example": "تَجْلِسُ الْعَائِلَةُ كُلُّهَا مَسَاءً حَوْلَ طَاوِلَةِ الطَّعَامِ الْكَبِيرَةِ.",
    "exampleDE": "Die ganze Familie sitzt abends am großen Esstisch."
  },
  {
    "front": "das Sofa",
    "back": "أَرِيكَة",
    "roman": "arīka",
    "example": "عَلَى الْأَرِيكَةِ الْمُرِيحَةِ يُمْكِنُ لِلْمَرْءِ أَنْ يَسْتَرْخِيَ بِشَكْلٍ رَائِعٍ.",
    "exampleDE": "Auf dem bequemen Sofa kann man herrlich entspannen."
  },
  {
    "front": "der Vorhang",
    "back": "سِتَارَة",
    "roman": "sitāra",
    "example": "تُغْلِقُ السِّتَارَةَ عِنْدَمَا يُخَيِّمُ الظَّلَامُ.",
    "exampleDE": "Sie zieht den Vorhang zu, wenn es dunkel wird."
  },
  {
    "front": "der Staubsauger",
    "back": "مِكْنَسَةٌ كَهْرَبَائِيَّة",
    "roman": "miknasa kahrabāʾiyya",
    "example": "يُنَظِّفُ السَّجَّادَ بِالْمِكْنَسَةِ الْكَهْرَبَائِيَّةِ الْجَدِيدَةِ.",
    "exampleDE": "Er saugt den Teppich mit dem neuen Staubsauger."
  },
  {
    "front": "das Bügelbrett",
    "back": "لَوْحُ كَيّ",
    "roman": "lawḥ kayy",
    "example": "لَوْحُ الْكَيِّ مَوْجُودٌ مَطْوِيًّا فِي الْخِزَانَةِ.",
    "exampleDE": "Das Bügelbrett steht zusammengeklappt im Schrank."
  },
  {
    "front": "das Bügeleisen",
    "back": "مِكْوَاة",
    "roman": "mikwāh",
    "example": "تُصْبِحُ الْمِكْوَاةُ سَاخِنَةً جِدًّا.",
    "exampleDE": "Das Bügeleisen wird sehr heiß."
  },
  {
    "front": "der Wischmop",
    "back": "مِمْسَحَةُ أَرْضِيَّات",
    "roman": "mimsahat arḍiyyāt",
    "example": "تَمْسَحُ أَرْضِيَّةَ الْمَطْبَخِ بِمِمْسَحَةِ الْأَرْضِيَّاتِ.",
    "exampleDE": "Sie wischt den Küchenboden mit dem Wischmop."
  },
  {
    "front": "das Spülmittel",
    "back": "سَائِلُ غَسِيلِ الصُّحُون",
    "roman": "sāʾil ghasīl aṣ-ṣuḥūn",
    "example": "بَضْعُ قَطَرَاتٍ مِنْ سَائِلِ غَسِيلِ الصُّحُونِ تَكْفِي لِلْأَوَانِي.",
    "exampleDE": "Ein paar Tropfen Spülmittel genügen für das Geschirr."
  },
  {
    "front": "die Mülltonne",
    "back": "حَاوِيَةُ قُمَامَة",
    "roman": "ḥāwiyat qumāma",
    "example": "خُذْ حَاوِيَةَ الْقُمَامَةِ إِلَى الشَّارِعِ مِنْ فَضْلِكَ.",
    "exampleDE": "Bring bitte die Mülltonne an die Straße."
  },
  {
    "front": "der Wäscheständer",
    "back": "مَنْشَرُ غَسِيل",
    "roman": "manshar ghasīl",
    "example": "تَجِفُّ الْمَلَابِسُ الْمُبَلَّلَةُ عَلَى مَنْشَرِ الْغَسِيلِ.",
    "exampleDE": "Die nasse Wäsche trocknet auf dem Wäscheständer."
  },
  {
    "front": "die Glühbirne",
    "back": "مِصْبَاحٌ مُضِيء",
    "roman": "miṣbāḥ muḍīʾ",
    "example": "يَجِبُ أَنْ نُغَيِّرَ الْمِصْبَاحَ الْمَكْسُورَ فِي الرَّدْهَةِ.",
    "exampleDE": "Wir müssen die kaputte Glühbirne im Flur auswechseln."
  },
  {
    "front": "der Schraubenzieher",
    "back": "مِفَكُّ بَرَاغٍ",
    "roman": "mifakk barāghin",
    "example": "يَشُدُّ الْبُرْغِيَّ الْمُرْتَخِيَ بِمِفَكِّ الْبَرَاغِي.",
    "exampleDE": "Mit dem Schraubenzieher zieht er die lose Schraube fest."
  },
  {
    "front": "die Zange",
    "back": "كَمَّاشَة",
    "roman": "kammāsha",
    "example": "يُمْسِكُ السِّلْكَ بِكَمَّاشَةٍ بِإِحْكَامٍ.",
    "exampleDE": "Er hält den Draht mit einer Zange fest."
  },
  {
    "front": "die Bohrmaschine",
    "back": "مِثْقَاب",
    "roman": "mithqāb",
    "example": "يَحْفِرُ الْمِثْقَابُ ثَقْبًا فِي الْجِدَارِ.",
    "exampleDE": "Die Bohrmaschine bohrt ein Loch in die Wand."
  },
  {
    "front": "der Handwerker",
    "back": "حِرَفِيّ",
    "roman": "ḥirafiyy",
    "example": "يَأْتِي الْحِرَفِيُّ صَبَاحَ غَدٍ فِي السَّاعَةِ الثَّامِنَةِ.",
    "exampleDE": "Der Handwerker kommt morgen früh um acht."
  },
  {
    "front": "der Pinsel",
    "back": "فُرْشَاةُ طِلَاء",
    "roman": "furshāt ṭilāʾ",
    "example": "تَطْلِي الْمَقْعَدَ الْخَشَبِيَّ بِفُرْشَاةِ طِلَاءٍ عَرِيضَةٍ.",
    "exampleDE": "Sie streicht die Holzbank mit einem breiten Pinsel."
  },
  {
    "front": "reparieren",
    "back": "أَصْلَحَ",
    "roman": "aṣlaḥa",
    "example": "هَلْ يُمْكِنُكَ أَنْ تُصْلِحَ الدَّرَّاجَةَ الْمُعَطَّلَةَ مِنْ فَضْلِكَ؟",
    "exampleDE": "Kannst du das kaputte Fahrrad bitte reparieren?"
  },
  {
    "front": "der Werkzeugkasten",
    "back": "صُنْدُوقُ عُدَّة",
    "roman": "ṣundūq ʿudda",
    "example": "جَمِيعُ الْأَدَوَاتِ جَاهِزَةٌ لِلِاسْتِعْمَالِ فِي صُنْدُوقِ الْعُدَّةِ.",
    "exampleDE": "Alle Werkzeuge liegen griffbereit im Werkzeugkasten."
  },
  {
    "front": "das Schneidebrett",
    "back": "لَوْحُ تَقْطِيع",
    "roman": "lawḥ taqṭīʿ",
    "example": "اِقْطَعِ الْبَصَلَ عَلَى لَوْحِ التَّقْطِيعِ مِنْ فَضْلِكَ.",
    "exampleDE": "Schneide die Zwiebel bitte auf dem Schneidebrett."
  },
  {
    "front": "der Kochtopf",
    "back": "قِدْرُ طَهْي",
    "roman": "qidr ṭahy",
    "example": "يَغْلِي الْحَسَاءُ فِي قِدْرِ الطَّهْيِ الْكَبِيرِ عَلَى الْمَوْقِدِ.",
    "exampleDE": "Die Suppe kocht im großen Kochtopf auf dem Herd."
  },
  {
    "front": "die Bratpfanne",
    "back": "مِقْلَاة",
    "roman": "miqlāh",
    "example": "تَنْقَلِي الْخُضْرَوَاتُ فِي الْمِقْلَاةِ السَّاخِنَةِ.",
    "exampleDE": "In der heißen Bratpfanne brät das Gemüse."
  },
  {
    "front": "der Wasserkocher",
    "back": "غَلَّايَةُ مَاء",
    "roman": "ghallāyat māʾ",
    "example": "تَغْلِي غَلَّايَةُ الْمَاءِ مَاءَ الشَّايِ فِي دَقِيقَتَيْنِ.",
    "exampleDE": "Der Wasserkocher kocht das Teewasser in zwei Minuten."
  },
  {
    "front": "der Backofen",
    "back": "فُرْن",
    "roman": "furn",
    "example": "تُخْبَزُ الْكَعْكَةُ نِصْفَ سَاعَةٍ فِي الْفُرْنِ.",
    "exampleDE": "Der Kuchen backt eine halbe Stunde im Backofen."
  },
  {
    "front": "das Rezept",
    "back": "وَصْفَةُ طَعَام",
    "roman": "waṣfat ṭaʿām",
    "example": "اِبْتَكَرَتْ جَدَّتِي هَذِهِ الْوَصْفَةَ.",
    "exampleDE": "Dieses Rezept hat meine Großmutter erfunden."
  },
  {
    "front": "die Zutat",
    "back": "مُكَوِّن",
    "roman": "mukawwin",
    "example": "الْأَعْشَابُ الطَّازَجَةُ هِيَ أَهَمُّ مُكَوِّنٍ لِلصَّلْصَةِ.",
    "exampleDE": "Frische Kräuter sind die wichtigste Zutat für die Soße."
  },
  {
    "front": "fein hacken",
    "back": "فَرَمَ نَاعِمًا",
    "roman": "farama nāʿiman",
    "example": "تَفْرُمُ الْبَصَلَ وَالْبَقْدُونِسَ نَاعِمًا بِسِكِّينٍ حَادٍّ.",
    "exampleDE": "Sie hackt die Zwiebeln und Petersilie mit einem scharfen Messer fein."
  },
  {
    "front": "das Meersalz",
    "back": "مِلْحُ بَحْر",
    "roman": "milḥ baḥr",
    "example": "رَشَّةٌ مِنْ مِلْحِ الْبَحْرِ تُبْرِزُ طَعْمَ الْحَسَاءِ.",
    "exampleDE": "Eine Prise Meersalz hebt den Geschmack der Suppe."
  },
  {
    "front": "der schwarze Pfeffer",
    "back": "فِلْفِلٌ أَسْوَد",
    "roman": "filfil aswad",
    "example": "الْفِلْفِلُ الْأَسْوَدُ الْمَطْحُونُ طَازَجًا لَهُ رَائِحَةٌ زَكِيَّةٌ.",
    "exampleDE": "Frisch gemahlener schwarzer Pfeffer duftet herrlich."
  },
  {
    "front": "das Olivenöl",
    "back": "زَيْتُ زَيْتُون",
    "roman": "zayt zaytūn",
    "example": "زَيْتُ الزَّيْتُونِ الْمَعْصُورُ عَلَى الْبَارِدِ مُمْتَازٌ لِلسَّلَطَةِ.",
    "exampleDE": "Kaltgepresstes Olivenöl passt hervorragend zum Salat."
  },
  {
    "front": "der Knoblauch",
    "back": "ثَوْم",
    "roman": "thawm",
    "example": "فَصَّانِ مِنَ الثَّوْمِ يَمْنَحَانِ الطَّبَقَ نَكْهَةً مُمَيَّزَةً.",
    "exampleDE": "Zwei Zehen Knoblauch verleihen dem Gericht Aroma."
  },
  {
    "front": "die Petersilie",
    "back": "بَقْدُونِس",
    "roman": "baqdūnis",
    "example": "يُوضَعُ الْبَقْدُونِسُ الْمَفْرُومُ طَازَجًا فَوْقَهُ قَبْلَ التَّقْدِيمِ.",
    "exampleDE": "Frisch gehackte Petersilie kommt vor dem Servieren darauf."
  },
  {
    "front": "das Basilikum",
    "back": "رَيْحَان",
    "roman": "rayḥān",
    "example": "الرَّيْحَانُ الطَّازَجُ يُنَاسِبُ الطَّمَاطِمَ تَمَامًا.",
    "exampleDE": "Frisches Basilikum passt perfekt zu Tomaten."
  },
  {
    "front": "der Zimt",
    "back": "قِرْفَة",
    "roman": "qirfa",
    "example": "فِي الشِّتَاءِ نُحِبُّ شُرْبَ الشَّايِ مَعَ رَشَّةِ قِرْفَةٍ.",
    "exampleDE": "Im Winter trinken wir gerne Tee mit einer Prise Zimt."
  },
  {
    "front": "das Vollkornbrot",
    "back": "خُبْزُ حَبَّةٍ كَامِلَة",
    "roman": "khubz ḥabba kāmila",
    "example": "خُبْزُ الْحَبَّةِ الْكَامِلَةِ الطَّازَجُ لَذِيذٌ وَيُشْبِعُ لِفَتْرَةٍ طَوِيلَةٍ.",
    "exampleDE": "Frisches Vollkornbrot schmeckt kräftig und hält lange satt."
  },
  {
    "front": "das Brötchen",
    "back": "لُفَافَةُ خُبْز",
    "roman": "lufāfat khubz",
    "example": "أَيَّامَ الْآحَادِ نَجْلِبُ لُفَافَاتِ خُبْزٍ دَافِئَةً مِنَ الْمَخْبَزِ.",
    "exampleDE": "Sonntags holen wir warme Brötchen beim Bäcker."
  },
  {
    "front": "die Butter",
    "back": "زُبْدَة",
    "roman": "zubda",
    "example": "اِدْهَنْ قَلِيلًا مِنَ الزُّبْدَةِ عَلَى شَرِيحَةِ الْخُبْزِ مِنْ فَضْلِكَ.",
    "exampleDE": "Streich bitte etwas Butter auf die Scheibe Brot."
  },
  {
    "front": "die Marmelade",
    "back": "مُرَبَّى",
    "roman": "murabbā",
    "example": "مُرَبَّى الْفَرَاوِلَةِ هُوَ دِهَانُ الْخُبْزِ الْمُفَضَّلُ لَدَيَّ.",
    "exampleDE": "Erdbeermarmelade ist mein liebster Brotaufstrich."
  },
  {
    "front": "das Müsli",
    "back": "مُيُوسْلِي",
    "roman": "myūslī",
    "example": "صَبَاحًا أُحِبُّ تَنَاوُلَ الْمُيُوسْلِي مَعَ الْفَوَاكِهِ الطَّازَجَةِ.",
    "exampleDE": "Morgens esse ich gerne Müsli mit frischem Obst."
  },
  {
    "front": "der Joghurt",
    "back": "زَبَادِيّ",
    "roman": "zabādiyy",
    "example": "الزَّبَادِيُّ الطَّبِيعِيُّ لَذِيذٌ جِدًّا مَعَ قَلِيلٍ مِنَ الْعَسَلِ.",
    "exampleDE": "Naturjoghurt schmeckt besonders gut mit etwas Honig."
  },
  {
    "front": "das gekochte Ei",
    "back": "بَيْضَةٌ مَسْلُوقَة",
    "roman": "bayḍa maslūqa",
    "example": "الْبَيْضَةُ الْمَسْلُوقَةُ نِصْفَ سَلْقٍ جُزْءٌ مِنْ فُطُورِ يَوْمِ الْأَحَدِ.",
    "exampleDE": "Ein weich gekochtes Ei gehört zum Sonntagsfrühstück."
  },
  {
    "front": "der Orangensaft",
    "back": "عَصِيرُ بُرْتُقَال",
    "roman": "ʿaṣīr burtuqāl",
    "example": "عَصِيرُ الْبُرْتُقَالِ الطَّازَجُ الْمَعْصُورُ يَحْتَوِي عَلَى الْكَثِيرِ مِنَ الْفِيتَامِينَاتِ.",
    "exampleDE": "Frisch gepresster Orangensaft enthält viele Vitamine."
  },
  {
    "front": "die Reservierung",
    "back": "حَجْز",
    "roman": "ḥajz",
    "example": "لَدَيَّ حَجْزٌ بِاسْمِ مُولَر.",
    "exampleDE": "Ich habe eine Reservierung auf den Namen Müller."
  },
  {
    "front": "die Speisekarte",
    "back": "قَائِمَةُ طَعَام",
    "roman": "qāʾimat ṭaʿām",
    "example": "هَلْ يُمْكِنُنَا رُؤْيَةُ قَائِمَةِ الطَّعَامِ مِنْ فَضْلِكَ؟",
    "exampleDE": "Dürfen wir bitte die Speisekarte sehen?"
  },
  {
    "front": "die Vorspeise",
    "back": "مُقَبِّلَات",
    "roman": "muqabbilāt",
    "example": "كَمُقَبِّلَاتٍ، نَطْلُبُ سَلَطَةً صَغِيرَةً.",
    "exampleDE": "Als Vorspeise bestellen wir einen kleinen Salat."
  },
  {
    "front": "das Hauptgericht",
    "back": "طَبَقٌ رَئِيسِيّ",
    "roman": "ṭabaq raʾīsiyy",
    "example": "يُقَدَّمُ الطَّبَقُ الرَّئِيسِيُّ سَاخِنًا عَلَى صَحْنٍ كَبِيرٍ.",
    "exampleDE": "Das Hauptgericht wird heiß auf einem großen Teller serviert."
  },
  {
    "front": "die Nachspeise",
    "back": "حَلْوَى",
    "roman": "ḥalwā",
    "example": "هَلْ تَرْغَبُونَ فِي حَلْوَى بَعْدَ الطَّعَامِ؟",
    "exampleDE": "Möchten Sie nach dem Essen noch eine Nachspeise?"
  },
  {
    "front": "die Rechnung",
    "back": "فَاتُورَة",
    "roman": "fātūra",
    "example": "نُرِيدُ أَنْ نَدْفَعَ مِنْ فَضْلِكَ، أَحْضِرْ لَنَا الْفَاتُورَةَ.",
    "exampleDE": "Wir möchten bitte zahlen, bringen Sie uns die Rechnung."
  },
  {
    "front": "das Trinkgeld",
    "back": "بَقْشِيش",
    "roman": "baqshīsh",
    "example": "اِسْتَحَقَّ النَّادِلُ اللَّطِيفُ بَقْشِيشًا جَيِّدًا.",
    "exampleDE": "Der freundliche Kellner hat ein gutes Trinkgeld verdient."
  },
  {
    "front": "die Spezialität des Hauses",
    "back": "طَبَقُ الدَّارِ الْمُمَيَّز",
    "roman": "ṭabaq ad-dār al-mumayyaz",
    "example": "يُوصِي النَّادِلُ بِالْمَعْكَرُونَةِ الْمَنْزِلِيَّةِ كَطَبَقِ الدَّارِ الْمُمَيَّزِ.",
    "exampleDE": "Der Kellner empfiehlt die hausgemachte Pasta als Spezialität des Hauses."
  },
  {
    "front": "der Kaffee",
    "back": "قَهْوَة",
    "roman": "qahwa",
    "example": "فِنْجَانٌ مِنْ قَهْوَةٍ سَاخِنَةٍ يَطْرُدُ التَّعَبَ.",
    "exampleDE": "Eine Tasse heißer Kaffee vertreibt die Müdigkeit."
  },
  {
    "front": "der Cappuccino",
    "back": "كَابُوتْشِينُو",
    "roman": "kābūtshīnū",
    "example": "الْكَابُوتْشِينُو لَهُ رَغْوَةٌ كَرِيمِيَّةٌ رَائِعَةٌ.",
    "exampleDE": "Der Cappuccino hat einen wunderbar cremigen Schaum."
  },
  {
    "front": "der Kräutertee",
    "back": "شَايُ أَعْشَاب",
    "roman": "shāy aʿshāb",
    "example": "فِي الْمَسَاءِ أُحِبُّ شُرْبَ كُوبٍ مِنْ شَايِ الْأَعْشَابِ الدَّافِئِ.",
    "exampleDE": "Abends trinke ich gerne eine Tasse warmen Kräutertee."
  },
  {
    "front": "das Mineralwasser",
    "back": "مَاءٌ مَعْدِنِيّ",
    "roman": "māʾ maʿdiniyy",
    "example": "كَأْسٌ مِنْ مَاءٍ مَعْدِنِيٍّ بَارِدٍ فَوَّارٍ يُنْعِشُ.",
    "exampleDE": "Ein Glas kühles Mineralwasser mit Kohlensäure erfrischt."
  },
  {
    "front": "das Stück Kuchen",
    "back": "قِطْعَةُ كَعْك",
    "roman": "qiṭʿat kaʿk",
    "example": "فِي بَعْدِ الظُّهْرِ نُدَلِّلُ أَنْفُسَنَا بِقِطْعَةِ كَعْكٍ.",
    "exampleDE": "Am Nachmittag gönnen wir uns ein Stück Kuchen."
  },
  {
    "front": "die Barista",
    "back": "صَانِعَةُ قَهْوَة",
    "roman": "ṣāniʿat qahwa",
    "example": "تُعِدُّ صَانِعَةُ الْقَهْوَةِ الْإِسْبْرِيسُو بِفَنٍّ وَإِتْقَانٍ.",
    "exampleDE": "Die Barista bereitet den Espresso kunstvoll zu."
  },
  {
    "front": "die Stammkundin",
    "back": "زَبُونَةٌ دَائِمَة",
    "roman": "zabūna dāʾima",
    "example": "هِيَ زَبُونَةٌ دَائِمَةٌ فِي هَذَا الْمَقْهَى الْمُرِيحِ عَلَى الزَّاوِيَةِ.",
    "exampleDE": "Sie ist Stammkundin in diesem gemütlichen Café an der Ecke."
  },
  {
    "front": "der Einkaufswagen",
    "back": "عَرَبَةُ تَسَوُّق",
    "roman": "ʿarabat tasawwuq",
    "example": "خُذْ عُمْلَةً مَعْدِنِيَّةً لِعَرَبَةِ التَّسَوُّقِ مِنْ فَضْلِكَ.",
    "exampleDE": "Nimm bitte eine Münze für den Einkaufswagen mit."
  },
  {
    "front": "der Einkaufszettel",
    "back": "قَائِمَةُ مُشْتَرَيَات",
    "roman": "qāʾimat mushtarayāt",
    "example": "دَوَّنْتُ كُلَّ الْأَشْيَاءِ الْمُهِمَّةِ فِي قَائِمَةِ الْمُشْتَرَيَاتِ.",
    "exampleDE": "Ich habe alle wichtigen Dinge auf dem Einkaufszettel notiert."
  },
  {
    "front": "das Sonderangebot",
    "back": "عَرْضٌ خَاصّ",
    "roman": "ʿarḍ khāṣṣ",
    "example": "الْفَرَاوِلَةُ الطَّازَجَةُ فِي عَرْضٍ خَاصٍّ الْيَوْمَ.",
    "exampleDE": "Frische Erdbeeren sind heute im Sonderangebot."
  },
  {
    "front": "die Kasse",
    "back": "صُنْدُوقُ دَفْع",
    "roman": "ṣundūq dafʿ",
    "example": "يُوجَدُ طَابُورٌ طَوِيلٌ مِنَ الزَّبَائِنِ عِنْدَ صُنْدُوقِ الدَّفْعِ.",
    "exampleDE": "An der Kasse steht eine lange Schlange von Kunden."
  },
  {
    "front": "der Kassenbon",
    "back": "إِيصَالُ دَفْع",
    "roman": "īṣāl dafʿ",
    "example": "اِحْتَفِظْ بِإِيصَالِ الدَّفْعِ كَإِثْبَاتٍ جَيِّدًا.",
    "exampleDE": "Bewahren Sie den Kassenbon als Beleg gut auf."
  },
  {
    "front": "die Stofftasche",
    "back": "حَقِيبَةُ قُمَاش",
    "roman": "ḥaqībat qumāsh",
    "example": "نَنْقُلُ مُشْتَرَيَاتِنَا فِي حَقِيبَةِ قُمَاشٍ.",
    "exampleDE": "Wir transportieren unsere Einkäufe in einer Stofftasche."
  },
  {
    "front": "das Haltbarkeitsdatum",
    "back": "تَارِيخُ انْتِهَاءِ الصَّلَاحِيَّة",
    "roman": "tārīkh intihāʾ aṣ-ṣalāḥiyya",
    "example": "تَحَقَّقْ دَائِمًا مِنْ تَارِيخِ انْتِهَاءِ الصَّلَاحِيَّةِ عَلَى الْغِلَافِ.",
    "exampleDE": "Prüfen Sie immer das Haltbarkeitsdatum auf der Verpackung."
  },
  {
    "front": "die Frischetheke",
    "back": "قِسْمُ الْأَطْعِمَةِ الطَّازَجَة",
    "roman": "qism al-aṭʿima aṭ-ṭāzaja",
    "example": "يُوجَدُ جُبْنٌ مَحَلِّيٌّ فِي قِسْمِ الْأَطْعِمَةِ الطَّازَجَةِ.",
    "exampleDE": "An der Frischetheke gibt es regionalen Käse."
  },
  {
    "front": "anprobieren",
    "back": "قَاسَ الْمَلَابِس",
    "roman": "qāsa l-malābis",
    "example": "أَوَدُّ أَنْ أَقِيسَ هَذِهِ السُّتْرَةَ الزَّرْقَاءَ الدَّاكِنَةَ.",
    "exampleDE": "Ich möchte diese dunkelblaue Jacke gerne anprobieren."
  },
  {
    "front": "die Umkleidekabine",
    "back": "غُرْفَةُ قِيَاس",
    "roman": "ghurfat qiyās",
    "example": "هُنَاكَ عَلَى الْيَسَارِ غُرْفَةُ قِيَاسٍ شَاغِرَةٌ.",
    "exampleDE": "Dort drüben links ist eine freie Umkleidekabine."
  },
  {
    "front": "die Konfektionsgröße",
    "back": "مَقَاسُ مَلَابِس",
    "roman": "maqās malābis",
    "example": "مَا هُوَ مَقَاسُ الْمَلَابِسِ الَّذِي تَرْتَدِيهِ عَادَةً؟",
    "exampleDE": "Welche Konfektionsgröße tragen Sie normalerweise?"
  },
  {
    "front": "passen",
    "back": "نَاسَبَ",
    "roman": "nāsaba",
    "example": "الْبِنْطَالُ يُنَاسِبُنِي تَمَامًا.",
    "exampleDE": "Die Hose passt mir wie angegossen."
  },
  {
    "front": "zu eng",
    "back": "ضَيِّقٌ جِدًّا",
    "roman": "ḍayyiq jiddan",
    "example": "هَذِهِ الْكَنْزَةُ ضَيِّقَةٌ جِدًّا عَلَى كَتِفَيَّ لِلْأَسَفِ.",
    "exampleDE": "Dieser Pullover ist mir an den Schultern leider zu eng."
  },
  {
    "front": "zu weit",
    "back": "وَاسِعٌ جِدًّا",
    "roman": "wāsiʿ jiddan",
    "example": "التَّنُّورَةُ وَاسِعَةٌ قَلِيلًا وَتَنْزَلِقُ عِنْدَ الْمَشْيِ.",
    "exampleDE": "Der Rock ist etwas zu weit und rutscht beim Gehen."
  },
  {
    "front": "der Schnitt",
    "back": "قَصَّة",
    "roman": "qaṣṣa",
    "example": "تُعْجِبُنِي الْقَصَّةُ الْحَدِيثَةُ كَثِيرًا.",
    "exampleDE": "Der moderne Schnitt gefällt mir besonders gut."
  },
  {
    "front": "die Baumwolle",
    "back": "قُطْن",
    "roman": "quṭn",
    "example": "هَذَا الْقَمِيصُ مَصْنُوعٌ مِنْ قُطْنٍ نَاعِمٍ خَالِصٍ.",
    "exampleDE": "Dieses T-Shirt besteht aus reiner, weicher Baumwolle."
  },
  {
    "front": "die Schurwolle",
    "back": "صُوفٌ خَالِص",
    "roman": "ṣūf khāliṣ",
    "example": "الْكَنْزَةُ السَّمِيكَةُ مِنَ الصُّوفِ الْخَالِصِ تُبْقِي الدِّفْءَ فِي الشِّتَاءِ.",
    "exampleDE": "Der dicke Pullover aus Schurwolle hält im Winter warm."
  },
  {
    "front": "die Seide",
    "back": "حَرِير",
    "roman": "ḥarīr",
    "example": "وِشَاحُ الْعُنُقِ مِنَ الْحَرِيرِ مَلْمَسُهُ نَاعِمٌ جِدًّا.",
    "exampleDE": "Das Halstuch aus Seide fühlt sich herrlich weich an."
  },
  {
    "front": "das Leder",
    "back": "جِلْد",
    "roman": "jild",
    "example": "السُّتْرَةُ الْمَتِينَةُ مَصْنُوعَةٌ مِنْ جِلْدٍ طَبِيعِيٍّ.",
    "exampleDE": "Die robuste Jacke ist aus echtem Leder gefertigt."
  },
  {
    "front": "gestreift",
    "back": "مُخَطَّط",
    "roman": "mukhaṭṭaṭ",
    "example": "يَرْتَدِي الْيَوْمَ قَمِيصًا مُخَطَّطًا بِالْأَزْرَقِ وَالْأَبْيَضِ.",
    "exampleDE": "Er trägt heute ein blau-weiß gestreiftes Hemd."
  },
  {
    "front": "kariert",
    "back": "مُرَبَّعَات",
    "roman": "murabbaʿāt",
    "example": "نَمَطُ الْمُرَبَّعَاتِ يُنَاسِبُ قَمِيصَ الْحَطَّابِ مُمْتَازًا.",
    "exampleDE": "Das karierte Muster passt hervorragend zum Holzfällerhemd."
  },
  {
    "front": "einfarbig",
    "back": "أُحَادِيُّ اللَّوْن",
    "roman": "uḥādiyy al-lawn",
    "example": "الْفُسْتَانُ الْبَسِيطُ أُحَادِيُّ اللَّوْنِ يَبْدُو أَنِيقًا دَائِمًا.",
    "exampleDE": "Ein schlichtes, einfarbiges Kleid wirkt immer elegant."
  },
  {
    "front": "der Reißverschluss",
    "back": "سَحَّاب",
    "roman": "saḥḥāb",
    "example": "السَّحَّابُ فِي سُتْرَتِي يَعْلَقُ أَحْيَانًا.",
    "exampleDE": "Der Reißverschluss an meiner Jacke klemmt manchmal."
  },
  {
    "front": "die Schnürsenkel",
    "back": "أَرْبِطَةُ حِذَاء",
    "roman": "arbiṭat ḥidhāʾ",
    "example": "اِرْبِطْ أَرْبِطَةَ حِذَائِكَ لِكَيْ لَا تَتَعَثَّرَ.",
    "exampleDE": "Binde dir die Schnürsenkel zu, damit du nicht stolperst."
  }
]

