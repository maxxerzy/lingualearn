# -*- coding: utf-8 -*-
import json

part2_cards = [
  {
    "front": "die Ferse",
    "back": "عَقِب",
    "roman": "ʿaqib",
    "example": "الْحِذَاءُ الْجَدِيدُ يَضْغَطُ مِنْ خَلْفٍ عَلَى الْعَقِبِ.",
    "exampleDE": "Die neuen Schuhe drücken hinten an der Ferse."
  },
  {
    "front": "die Wirbelsäule",
    "back": "عَمُودٌ فِقْرِيّ",
    "roman": "ʿamūd fiqriyy",
    "example": "التَّمَارِينُ الرِّيَاضِيَّةُ الْمُوَجَّهَةُ تُقَوِّي الْعَضَلَاتِ عَلَى طُولِ الْعَمُودِ الْفِقْرِيِّ.",
    "exampleDE": "Gezielte Gymnastik stärkt die Muskeln entlang der Wirbelsäule."
  },
  {
    "front": "das Schulterblatt",
    "back": "لَوْحُ الْكَتِف",
    "roman": "lawḥ al-katif",
    "example": "يَشْعُرُ بِتَوَتُّرٍ خَفِيفٍ تَحْتَ لَوْحِ الْكَتِفِ الْأَيْمَنِ.",
    "exampleDE": "Er spürt eine leichte Verspannung unter dem rechten Schulterblatt."
  },
  {
    "front": "die Hüfte",
    "back": "وَرِك",
    "roman": "warik",
    "example": "تَضَعُ يَدَيْهَا عَلَى الْوَرِكِ بِاسْتِرْخَاءٍ عِنْدَ الْوُقُوفِ.",
    "exampleDE": "Sie stützt die Hände beim Stehen locker in die Hüfte."
  },
  {
    "front": "das Herz",
    "back": "قَلْب",
    "roman": "qalb",
    "example": "يَنْبِضُ قَلْبُ الْإِنْسَانِ حَوَالَيْ سَبْعِينَ مَرَّةً فِي الدَّقِيقَةِ.",
    "exampleDE": "Das menschliche Herz schlägt rund siebzig Mal pro Minute."
  },
  {
    "front": "die Lunge",
    "back": "رِئَة",
    "roman": "riʾa",
    "example": "الِاسْتِنْشَاقُ الْعَمِيقُ لِهَوَاءِ الْغَابَةِ النَّقِيِّ مُفِيدٌ لِلرِّئَةِ.",
    "exampleDE": "Tiefes Einatmen frischer Waldluft tut der Lunge gut."
  },
  {
    "front": "der Magen",
    "back": "مَعِدَة",
    "roman": "maʿida",
    "example": "بَعْدَ الْوَلِيمَةِ الدَّسِمَةِ تَمْتَعِضُ الْمَعِدَةُ الْمُمْتَلِئَةُ.",
    "exampleDE": "Nach dem üppigen Festessen rebelliert der volle Magen."
  },
  {
    "front": "die Leber",
    "back": "كَبِد",
    "roman": "kabid",
    "example": "الْكَبِدُ هُوَ أَهَمُّ عُضْوٍ لِإِزَالَةِ السُّمُومِ مِنَ الْجِسْمِ.",
    "exampleDE": "Die Leber ist das wichtigste Entgiftungsorgan des Körpers."
  },
  {
    "front": "die Nieren",
    "back": "كِلْيَتَان",
    "roman": "kilyatān",
    "example": "شُرْبُ الْمَاءِ بِكَمِّيَّةٍ كَافِيَةٍ يَدْعَمُ عَمَلَ الْكِلْيَتَيْنِ.",
    "exampleDE": "Ausreichend Wasser zu trinken unterstützt die Nieren."
  },
  {
    "front": "das Gehirn",
    "back": "دِمَاغ",
    "roman": "dimāgh",
    "example": "يَحْتَاجُ الدِّمَاغُ إِلَى الْكَثِيرِ مِنَ الْأُكْسِجِينِ لِلْعَمَلِ الْمُرَكَّزِ.",
    "exampleDE": "Das Gehirn benötigt viel Sauerstoff für konzentriertes Arbeiten."
  },
  {
    "front": "die Blutgefäße",
    "back": "أَوْعِيَةٌ دَمَوِيَّة",
    "roman": "awʿiya damawiyya",
    "example": "الْحَرَكَةُ الْمُنْتَظَمَةُ تُحَافِظُ عَلَى مُرُونَةِ الْأَوْعِيَةِ الدَّمَوِيَّةِ.",
    "exampleDE": "Regelmäßige Bewegung hält die Blutgefäße elastisch."
  },
  {
    "front": "die Ausdauer",
    "back": "قُدْرَةُ التَّحَمُّل",
    "roman": "qudrat at-taḥammul",
    "example": "رُكُوبُ الدَّرَّاجَةِ بِانْتِظَامٍ يَزِيدُ قُدْرَةَ التَّحَمُّلِ الشَّخْصِيَّةَ بِشَكْلٍ مَلْحُوظٍ.",
    "exampleDE": "Regelmäßiges Radfahren steigert die persönliche Ausdauer spürbar."
  },
  {
    "front": "der Muskelkater",
    "back": "أَلَمُ الْعَضَلَات",
    "roman": "alam al-ʿaḍalāt",
    "example": "بَعْدَ التَّدْرِيبِ الْأَوَّلِ أُصِيبَ بِأَلَمِ الْعَضَلَاتِ لِمُدَّةِ يَوْمَيْنِ.",
    "exampleDE": "Nach dem ersten Training hatte er zwei Tage Muskelkater."
  },
  {
    "front": "das Dehnen",
    "back": "تَمْدِيدُ الْعَضَلَات",
    "roman": "tamdīd al-ʿaḍalāt",
    "example": "التَّمْدِيدُ اللَّطِيفُ بَعْدَ الرَّكْضِ يَقِي مِنْ قِصَرِ الْعَضَلَاتِ.",
    "exampleDE": "Sanftes Dehnen nach dem Laufen beugt Muskelverkürzungen vor."
  },
  {
    "front": "das Aufwärmen",
    "back": "إِحْمَاء",
    "roman": "iḥmāʾ",
    "example": "قَبْلَ كُلِّ رِيَاضَةٍ يَجِبُ الْقِيَامُ بِإِحْمَاءٍ لِمُدَّةِ خَمْسِ دَقَائِقَ.",
    "exampleDE": "Vor jedem Sport gehört ein fünfminütiges Aufwärmen dazu."
  },
  {
    "front": "die Entspannung",
    "back": "اِسْتِرْخَاء",
    "roman": "istirkhāʾ",
    "example": "الْحَمَّامُ الدَّافِئُ فِي الْمَسَاءِ يُعَزِّزُ الِاسْتِرْخَاءَ الْعَمِيقَ.",
    "exampleDE": "Ein warmes Bad am Abend fördert die tiefe Entspannung."
  },
  {
    "front": "der Tiefschlaf",
    "back": "نَوْمٌ عَمِيق",
    "roman": "nawm ʿamīq",
    "example": "النَّوْمُ الْعَمِيقُ غَيْرُ الْمُضْطَرِبِ ضَرُورِيٌّ لِاسْتِعَادَةِ النَّشَاطِ.",
    "exampleDE": "Ungestörter Tiefschlaf ist unverzichtbar für die Regeneration."
  },
  {
    "front": "das Wohlbefinden",
    "back": "عَافِيَة",
    "roman": "ʿāfiya",
    "example": "التَّغْذِيَةُ الصِّحِّيَّةُ تُسَاهِمُ بِشَكْلٍ حَاسِمٍ فِي الْعَافِيَةِ.",
    "exampleDE": "Gesunde Ernährung trägt entscheidend zum Wohlbefinden bei."
  },
  {
    "front": "die frische Luft",
    "back": "هَوَاءٌ نَقِيّ",
    "roman": "hawāʾ naqiyy",
    "example": "النُّزْهَةُ السَّرِيعَةُ فِي الْهَوَاءِ النَّقِيِّ تُنْعِشُ الرُّوحَ.",
    "exampleDE": "Ein zügiger Spaziergang an der frischen Luft belebt den Geist."
  },
  {
    "front": "die Ballaststoffe",
    "back": "أَلْيَافٌ غِذَائِيَّة",
    "roman": "alyāf ghidhāʾiyya",
    "example": "مُنْتَجَاتُ الْحُبُوبِ الْكَامِلَةِ وَالْبُقُولِيَّاتُ تَحْتَوِي عَلَى أَلْيَافٍ غِذَائِيَّةٍ قَيِّمَةٍ.",
    "exampleDE": "Vollkornprodukte und Hülsenfrüchte enthalten wertvolle Ballaststoffe."
  },
  {
    "front": "die Vitamine",
    "back": "فِيتَامِينَات",
    "roman": "fītāmīnāt",
    "example": "الْفَوَاكِهُ الطَّازَجَةُ تُزَوِّدُ الْجِسْمَ بِالْفِيتَامِينَاتِ الْحَيَوِيَّةِ.",
    "exampleDE": "Frisches Obst versorgt den Körper mit lebenswichtigen Vitaminen."
  },
  {
    "front": "das Eiweiß",
    "back": "بْرُوتِين",
    "roman": "brūtīn",
    "example": "الْجُبْنُ الْقَرِيشُ وَالسَّمَكُ وَالْبَيْضُ تُوَفِّرُ بْرُوتِينًا حَيَوَانِيًّا عَالِيَ الْجَوْدَةِ.",
    "exampleDE": "Quark, Fisch und Eier liefern hochwertiges tierisches Eiweiß."
  },
  {
    "front": "die Kalorien",
    "back": "سُعْرَاتٌ حَرَارِيَّة",
    "roman": "suʿrāt ḥarāriyya",
    "example": "عِنْدَ السِّبَاحَةِ يَحْرِقُ الْمَرْءُ سُعْرَاتٍ حَرَارِيَّةً كَثِيرَةً بِشَكْلٍ مُفَاجِئٍ.",
    "exampleDE": "Beim Schwimmen verbrennt man überraschend viele Kalorien."
  },
  {
    "front": "der Blutzucker",
    "back": "سُكَّرُ الدَّم",
    "roman": "sukkar ad-dam",
    "example": "خُبْزُ الْحُبُوبِ الْكَامِلَةِ يَجْعَلُ سُكَّرَ الدَّمِ يَرْتَفِعُ بِبُطْءٍ فَقَطْ.",
    "exampleDE": "Vollkornbrot lässt den Blutzucker nur langsam ansteigen."
  },
  {
    "front": "das Übergewicht",
    "back": "وَزْنٌ زَائِد",
    "roman": "wazn zāʾid",
    "example": "الْحَرَكَةُ الْمُنْتَظَمَةُ تُسَاعِدُ بِفَعَالِيَّةٍ ضِدَّ الْوَزْنِ الزَّائِدِ.",
    "exampleDE": "Regelmäßige Bewegung hilft wirksam gegen Übergewicht."
  },
  {
    "front": "die Flüssigkeitszufuhr",
    "back": "تَنَاوُلُ السَّوَائِل",
    "roman": "tanāwul as-sawāʾil",
    "example": "فِي أَيَّامِ الصَّيْفِ الْحَارَّةِ يَكُونُ تَنَاوُلُ السَّوَائِلِ الْكَافِيَةِ مُهِمًّا.",
    "exampleDE": "An heißen Sommertagen ist ausreichende Flüssigkeitszufuhr wichtig."
  },
  {
    "front": "die Schwiegereltern",
    "back": "وَالِدَا الزَّوْجِ أَوْ الزَّوْجَة",
    "roman": "wālidā z-zawj",
    "example": "يَوْمَ الْأَحَدِ نَحْنُ مَدْعُوُّونَ لِشُرْبِ الْقَهْوَةِ عِنْدَ وَالِدَيْ زَوْجَتِي.",
    "exampleDE": "Am Sonntag sind wir bei meinen Schwiegereltern zum Kaffee eingeladen."
  },
  {
    "front": "der Schwiegersohn",
    "back": "صِهْر",
    "roman": "ṣihr",
    "example": "يَتَفَاهَمُ صِهْرُهَا مُمْتَازًا مَعَ كُلِّ أَفْرَادِ الْعَائِلَةِ.",
    "exampleDE": "Ihr Schwiegersohn versteht sich prächtig mit der ganzen Familie."
  },
  {
    "front": "die Schwiegertochter",
    "back": "كَنَّة",
    "roman": "kanna",
    "example": "أَحْضَرَتِ الْكَنَّةُ مَعَهَا كَعْكَةَ تُفَّاحٍ مَخْبُوزَةً مَنْزِلِيًّا.",
    "exampleDE": "Die Schwiegertochter brachte einen selbstgebackenen Apfelkuchen mit."
  },
  {
    "front": "die Urgroßmutter",
    "back": "جَدَّةٌ كُبْرَى",
    "roman": "jadda kubrā",
    "example": "احْتَفَلَتْ جَدَّتِي الْكُبْرَى هَذَا الْعَامَ بِعِيدِ مِيلَادِهَا التِّسْعِينَ.",
    "exampleDE": "Meine Urgroßmutter feierte dieses Jahr ihren neunzigsten Geburtstag."
  },
  {
    "front": "der Urgroßvater",
    "back": "جَدٌّ أَكْبَر",
    "roman": "jadd akbar",
    "example": "يُحِبُّ الْجَدُّ الْأَكْبَرُ أَنْ يَرْوِيَ لِلْأَطْفَالِ قِصَصًا قَدِيمَةً.",
    "exampleDE": "Der Urgroßvater erzählt den Kindern gerne alte Geschichten."
  },
  {
    "front": "die Patentante",
    "back": "عَرَّابَة",
    "roman": "ʿarrāba",
    "example": "أَهْدَتْنِي عَرَّابَتِي كِتَابًا جَيِّدًا بِمُنَاسَبَةِ التَّخَرُّجِ مِنَ الْمَدْرَسَةِ.",
    "exampleDE": "Meine Patentante schenkte mir zum Schulabschluss ein gutes Buch."
  },
  {
    "front": "der Patenonkel",
    "back": "عَرَّاب",
    "roman": "ʿarrāb",
    "example": "يُسَانِدُهُ عَرَّابُهُ طَوَالَ فَتْرَةِ الدِّرَاسَةِ كُلِّهَا.",
    "exampleDE": "Sein Patenonkel unterstützt ihn während des gesamten Studiums."
  },
  {
    "front": "die Großfamilie",
    "back": "عَائِلَةٌ كَبِيرَة",
    "roman": "ʿāʾila kabīra",
    "example": "فِي عِيدِ الْمِيلَادِ تَجْتَمِعُ الْعَائِلَةُ الْكَبِيرَةُ كُلُّهَا فِي غُرْفَةِ الْمَعِيشَةِ.",
    "exampleDE": "Zu Weihnachten versammelt sich die ganze Großfamilie im Wohnzimmer."
  },
  {
    "front": "die Kindheit",
    "back": "طُفُولَة",
    "roman": "ṭufūla",
    "example": "أَتَذَكَّرُ بِسُرُورٍ طُفُولَتِي الْهَانِئَةَ فِي الرِّيفِ.",
    "exampleDE": "Ich denke gerne an die unbeschwerte Kindheit auf dem Land zurück."
  },
  {
    "front": "die Jugend",
    "back": "شَبَاب",
    "roman": "shabāb",
    "example": "فِي الشَّبَابِ يُجَرِّبُ الْمَرْءُ الْكَثِيرَ مِنَ الْهِوَايَاتِ وَالِاهْتِمَامَاتِ الْجَدِيدَةِ.",
    "exampleDE": "In der Jugend probiert man viele neue Hobbys und Interessen aus."
  },
  {
    "front": "das Erwachsenenalter",
    "back": "سِنُّ الرُّشْد",
    "roman": "sinn ar-rushd",
    "example": "فِي سِنِّ الرُّشْدِ يَتَحَمَّلُ الْمَرْءُ الْمَسْؤُولِيَّةَ عَنْ حَيَاتِهِ الْخَاصَّةِ.",
    "exampleDE": "Im Erwachsenenalter übernimmt man Verantwortung für sein eigenes Leben."
  },
  {
    "front": "der Ruhestand",
    "back": "تَقَاعُد",
    "roman": "taqāʿud",
    "example": "فِي التَّقَاعُدِ الْمُسْتَحَقِّ يُسَافِرُ الزَّوْجَانِ كَثِيرًا عَبْرَ أُورُوبَّا.",
    "exampleDE": "Im wohlverdienten Ruhestand reist das Ehepaar viel durch Europa."
  },
  {
    "front": "der Geburtstag",
    "back": "عِيدُ مِيلَاد",
    "roman": "ʿīd mīlād",
    "example": "نَحْتَفِلُ بِعِيدِ مِيلَادِهِ الثَّلَاثِينَ بِحَفْلَةٍ كَبِيرَةٍ.",
    "exampleDE": "Wir feiern seinen dreißigsten Geburtstag mit einer großen Party."
  },
  {
    "front": "die Generation",
    "back": "جِيل",
    "roman": "jīl",
    "example": "كُلُّ جِيلٍ لَدَيْهِ قِيَمُهُ وَتَصَوُّرَاتُهُ الْخَاصَّةُ.",
    "exampleDE": "Jede Generation hat ihre eigenen Werte und Vorstellungen."
  },
  {
    "front": "die Lebenserfahrung",
    "back": "خِبْرَةُ حَيَاة",
    "roman": "khibrat ḥayāh",
    "example": "مَعَ مُرُورِ السِّنِينَ يَكْتَسِبُ الْمَرْءُ خِبْرَةَ حَيَاةٍ قَيِّمَةً.",
    "exampleDE": "Mit den Jahren sammelt man wertvolle Lebenserfahrung."
  },
  {
    "front": "die Freundschaft",
    "back": "صَدَاقَة",
    "roman": "ṣadāqa",
    "example": "الصَّدَاقَةُ الْحَقِيقِيَّةُ تَصْمُدُ أَيْضًا عَبْرَ الْمَسَافَاتِ الْبَعِيدَةِ.",
    "exampleDE": "Eine echte Freundschaft hält auch über weite Entfernungen."
  },
  {
    "front": "das Vertrauen",
    "back": "ثِقَة",
    "roman": "thiqa",
    "example": "الثِّقَةُ الْمُتَبَادَلَةُ هِيَ أَسَاسُ كُلِّ عَلَاقَةٍ جَيِّدَةٍ.",
    "exampleDE": "Gegenseitiges Vertrauen ist das Fundament jeder guten Beziehung."
  },
  {
    "front": "sich verlassen auf",
    "back": "اِعْتَمَدَ عَلَى",
    "roman": "iʿtamada ʿalā",
    "example": "يُمْكِنُنِي دَائِمًا الِاعْتِمَادُ كُلِّيًّا عَلَى أَعَزِّ صَدِيقَةٍ لِي.",
    "exampleDE": "Auf meine beste Freundin kann ich mich immer voll verlassen."
  },
  {
    "front": "die Ehrlichkeit",
    "back": "صِدْق",
    "roman": "ṣidq",
    "example": "الصِّدْقُ يَدُومُ أَطْوَلَ، خَاصَّةً بَيْنَ الْأَصْدِقَاءِ.",
    "exampleDE": "Ehrlichkeit währt am längsten, besonders unter Freunden."
  },
  {
    "front": "die Hilfsbereitschaft",
    "back": "جُهُوزِيَّةٌ لِلْمُسَاعَدَة",
    "roman": "juhūziyya li-l-musāʿada",
    "example": "يُقَدِّرُ جَمِيعُ الْجِيرَانِ كَثِيرًا جُهُوزِيَّتَهَا الْقَلْبِيَّةَ لِلْمُسَاعَدَةِ.",
    "exampleDE": "Ihre herzliche Hilfsbereitschaft schätzen alle Nachbarn sehr."
  },
  {
    "front": "das Geheimnis",
    "back": "سِرّ",
    "roman": "sirr",
    "example": "لَنْ يُفْشِيَ أَبَدًا سِرًّا ائْتُمِنَ عَلَيْهِ.",
    "exampleDE": "Er würde ein ihm anvertrautes Geheimnis niemals verraten."
  },
  {
    "front": "zusammenhalten",
    "back": "تَمَاسَكَ",
    "roman": "tamāsaka",
    "example": "فِي اللَّحَظَاتِ الصَّعْبَةِ يَجِبُ أَنْ يَتَمَاسَكَ الْأَصْدِقَاءُ بِقُوَّةٍ.",
    "exampleDE": "In schwierigen Momenten müssen Freunde fest zusammenhalten."
  },
  {
    "front": "kennenlernen",
    "back": "تَعَرَّفَ عَلَى",
    "roman": "taʿarrafa ʿalā",
    "example": "تَعَرَّفْنَا عَلَى بَعْضِنَا قَبْلَ خَمْسِ سَنَوَاتٍ فِي الْجَامِعَةِ.",
    "exampleDE": "Wir haben uns vor fünf Jahren an der Universität kennengelernt."
  },
  {
    "front": "die Verliebtheit",
    "back": "هُيَام",
    "roman": "huyām",
    "example": "فِي بِدَايَةِ الْعَلَاقَةِ يَكُونُ الْهُيَامُ شَدِيدًا بِشَكْلٍ خَاصٍّ.",
    "exampleDE": "Am Anfang einer Beziehung ist die Verliebtheit besonders intensiv."
  },
  {
    "front": "die Zuneigung",
    "back": "مَوَدَّة",
    "roman": "mawadda",
    "example": "أَظْهَرَ مَوَدَّتَهُ مِنْ خِلَالَ حَرَكَاتٍ صَغِيرَةٍ وَمُرَاعِيَةٍ.",
    "exampleDE": "Er zeigte seine Zuneigung durch kleine, aufmerksame Gesten."
  },
  {
    "front": "die Verlobung",
    "back": "خِطْبَة",
    "roman": "khiṭba",
    "example": "أَعْلَنَا عَنْ خِطْبَتِهِمَا خِلَالَ عَشَاءٍ رُومَانْسِيٍّ.",
    "exampleDE": "Bei einem romantischen Abendessen gaben sie ihre Verlobung bekannt."
  },
  {
    "front": "die Hochzeit",
    "back": "حَفْلُ زِفَاف",
    "roman": "ḥafl zifāf",
    "example": "أُقِيمَ حَفْلُ الزِّفَافِ فِي مَبْنَى الْبَلَدِيَّةِ التَّارِيخِيِّ فِي الْمَدِينَةِ الْقَدِيمَةِ.",
    "exampleDE": "Die Hochzeit fand im historischen Rathaus der Altstadt statt."
  },
  {
    "front": "der Ehepartner",
    "back": "زَوْج",
    "roman": "zawj",
    "example": "تَحْتَرِمُ رَأْيَ زَوْجِهَا فِي كُلِّ الْأُمُورِ.",
    "exampleDE": "Sie respektiert die Meinung ihres Ehepartners in allen Belangen."
  },
  {
    "front": "der Hochzeitstag",
    "back": "عِيدُ زَوَاج",
    "roman": "ʿīd zawāj",
    "example": "فِي عِيدِ زَوَاجِهِمَا الْعَاشِرِ قَامَا بِرِحْلَةٍ قَصِيرَةٍ مُشْتَرَكَةٍ.",
    "exampleDE": "Zum zehnten Hochzeitstag machten sie eine gemeinsame Kurzreise."
  },
  {
    "front": "die Trennung",
    "back": "اِنْفِصَال",
    "roman": "infiṣāl",
    "example": "بَعْدَ تَفْكِيرٍ طَوِيلٍ قَرَّرَ الِاثْنَانِ انْفِصَالًا مُنْصِفًا.",
    "exampleDE": "Nach langer Überlegung entschieden sich beide für eine faire Trennung."
  },
  {
    "front": "die Dankbarkeit",
    "back": "اِمْتِنَان",
    "roman": "imtinān",
    "example": "أَشْعُرُ بِامْتِنَانٍ عَمِيقٍ لِمُسَاعَدَتِكَ الرَّائِعَةِ.",
    "exampleDE": "Ich empfinde tiefe Dankbarkeit für deine großartige Hilfe."
  },
  {
    "front": "die Erleichterung",
    "back": "ارْتِيَاح",
    "roman": "irtiyāḥ",
    "example": "بَعْدَ اجْتِيَازِ الِامْتِحَانِ شَعَرَتْ بِارْتِيَاحٍ هَائِلٍ.",
    "exampleDE": "Nach der bestandenen Prüfung spürte sie riesige Erleichterung."
  },
  {
    "front": "die Vorfreude",
    "back": "بَهْجَةُ الِانْتِظَار",
    "roman": "bahjat al-intiẓār",
    "example": "بَهْجَةُ انْتِظَارِ عُطْلَةِ الصَّيْفِ تُقَصِّرُ أُسْبُوعَ الْعَمَلِ.",
    "exampleDE": "Die Vorfreude auf den Sommerurlaub verkürzt die Arbeitswoche."
  },
  {
    "front": "die Begeisterung",
    "back": "حَمَاس",
    "roman": "ḥamās",
    "example": "صَفَّقَ الْجُمْهُورُ الْمُتَحَمِّسُ بَعْدَ الْعَرْضِ لِدَقَائِقَ طَوِيلَةٍ.",
    "exampleDE": "Das begeisterte Publikum klatschte nach der Vorstellung minutenlang."
  },
  {
    "front": "die Zufriedenheit",
    "back": "رِضَا",
    "roman": "riḍan",
    "example": "أُمْسِيَةٌ هَادِئَةٌ مَعَ كِتَابٍ جَيِّدٍ تَمْنَحُ الرِّضَا.",
    "exampleDE": "Ein ruhiger Abend mit einem guten Buch schenkt Zufriedenheit."
  },
  {
    "front": "die Hoffnung",
    "back": "أَمَل",
    "roman": "amal",
    "example": "لَا نَتَخَلَّى أَبَدًا عَنِ الْأَمَلِ فِي نِهَايَةٍ جَيِّدَةٍ.",
    "exampleDE": "Wir geben die Hoffnung auf ein gutes Ende niemals auf."
  },
  {
    "front": "der Optimismus",
    "back": "تَفَاؤُل",
    "roman": "tafāʾul",
    "example": "بِالتَّفَاؤُلِ السَّلِيمِ يَتَغَلَّبُ الْمَرْءُ عَلَى الْكَثِيرِ مِنَ الْمَوَاقِفِ الصَّعْبَةِ.",
    "exampleDE": "Mit gesundem Optimismus meistert man viele schwierige Situationen."
  },
  {
    "front": "das Selbstvertrauen",
    "back": "ثِقَةٌ بِالنَّفْس",
    "roman": "thiqa bi-n-nafs",
    "example": "النَّجَاحَاتُ تُعَزِّزُ الثِّقَةَ بِالنَّفْسِ بِشَكْلٍ دَائِمٍ.",
    "exampleDE": "Erfolge stärken das persönliche Selbstvertrauen nachhaltig."
  },
  {
    "front": "die Enttäuschung",
    "back": "خَيْبَةُ أَمَل",
    "roman": "khaybat amal",
    "example": "كَانَتِ الْهَزِيمَةُ فِي النِّهَائِيِّ خَيْبَةَ أَمَلٍ مُرَّةً لِلْفَرِيقِ.",
    "exampleDE": "Die Niederlage im Finale war eine herbe Enttäuschung für das Team."
  },
  {
    "front": "die Eifersucht",
    "back": "غَيْرَة",
    "roman": "ghayra",
    "example": "الْغَيْرَةُ غَيْرُ الْمُبَرَّرَةِ يُمْكِنُ أَنْ تُثْقِلَ كَاهِلَ الْعَلَاقَةِ بِشِدَّةٍ.",
    "exampleDE": "Unbegründete Eifersucht kann eine Partnerschaft schwer belasten."
  },
  {
    "front": "der Neid",
    "back": "حَسَد",
    "roman": "ḥasad",
    "example": "الْحَسَدُ عَلَى نَجَاحِ الْآخَرِينَ لَا يُقَدِّمُ الْمَرْءَ خُطْوَةً.",
    "exampleDE": "Neid auf den Erfolg anderer bringt einen selbst nicht weiter."
  },
  {
    "front": "die Scham",
    "back": "خَجَل",
    "roman": "khajal",
    "example": "احْمَرَّ وَجْهُهُ مِنَ الْخَجَلِ بِسَبَبِ هَذِهِ الْعَثْرَةِ.",
    "exampleDE": "Vor Scham über das Missgeschick wurde er im Gesicht rot."
  },
  {
    "front": "die Reue",
    "back": "نَدَم",
    "roman": "nadam",
    "example": "أَظْهَرَ نَدَمًا صَادِقًا وَاعْتَذَرَ فَوْرًا.",
    "exampleDE": "Er zeigte aufrichtige Reue und entschuldigte sich sofort."
  },
  {
    "front": "die Verzweiflung",
    "back": "يَأْس",
    "roman": "yaʾs",
    "example": "فِي حَالَةِ يَأْسِهَا طَلَبَتِ الْمُسَاعَدَةَ مِنْ مَرْكَزِ اسْتِشَارَةٍ.",
    "exampleDE": "In ihrer Verzweiflung bat sie eine Beratungsstelle um Hilfe."
  },
  {
    "front": "die Ungeduld",
    "back": "نَفَادُ صَبْر",
    "roman": "nafād ṣabr",
    "example": "مِنْ فَرْطِ نَفَادِ الصَّبْرِ كَانَ يَتَمَشَّى فِي الْغُرْفَةِ جَيْئَةً وَذَهَابًا بِقَلَقٍ.",
    "exampleDE": "Vor lauter Ungeduld lief er im Zimmer unruhig auf und ab."
  },
  {
    "front": "zuverlässig",
    "back": "مَوْثُوق",
    "roman": "mawthūq",
    "example": "هِيَ زَمِيلَةٌ مَوْثُوقٌ بِهَا لِلْغَايَةِ فِي الْمَكْتَبِ.",
    "exampleDE": "Sie ist eine äußerst zuverlässige Kollegin im Büro."
  },
  {
    "front": "pünktlich",
    "back": "مُنْضَبِطٌ فِي الْوَقْت",
    "roman": "munḍabiṭ fī l-waqt",
    "example": "يَحْضُرُ إِلَى كُلِّ اجْتِمَاعٍ فِي الْمَوْعِدِ بِالدَّقِيقَةِ.",
    "exampleDE": "Er erscheint zu jeder Besprechung auf die Minute pünktlich."
  },
  {
    "front": "ehrgeizig",
    "back": "طَمُوح",
    "roman": "ṭamūḥ",
    "example": "كَرِيَاضِيَّةٍ طَمُوحَةٍ تَتَدَرَّبُ بِانْضِبَاطٍ كُلَّ يَوْمٍ.",
    "exampleDE": "Als ehrgeizige Sportlerin trainiert sie diszipliniert jeden Tag."
  },
  {
    "front": "großzügig",
    "back": "كَرِيم",
    "roman": "karīm",
    "example": "كَانَ عَمُّ أَبِي دَائِمًا إِنْسَانًا كَرِيمًا جِدًّا.",
    "exampleDE": "Mein Großonkel war schon immer ein sehr großzügiger Mensch."
  },
  {
    "front": "bescheiden",
    "back": "مُتَوَاضِع",
    "roman": "mutawāḍiʿ",
    "example": "عَلَى الرَّغْمِ مِنْ نَجَاحَاتِهِ الْكَبِيرَةِ، ظَلَّ دَائِمًا مُتَوَاضِعًا.",
    "exampleDE": "Trotz seiner großen Erfolge ist er stets bescheiden geblieben."
  },
  {
    "front": "nachdenklich",
    "back": "مُتَأَمِّل",
    "roman": "mutaʾammil",
    "example": "نَظَرَتْ بِتَأَمُّلٍ مِنَ النَّافِذَةِ إِلَى الْمَطَرِ.",
    "exampleDE": "Sie blickte nachdenklich aus dem Fenster in den Regen."
  },
  {
    "front": "geduldig",
    "back": "صَبُور",
    "roman": "ṣabūr",
    "example": "يَشْرَحُ الْمُعَلِّمُ الْمَسْأَلَةَ الصَّعْبَةَ بِصَوْتٍ صَبُورٍ.",
    "exampleDE": "Der Lehrer erklärt die schwierige Aufgabe mit geduldiger Stimme."
  },
  {
    "front": "humorvoll",
    "back": "مَرِح",
    "roman": "mariḥ",
    "example": "بِأُسْلُوبِهِ الْمَرِحِ يَجْعَلُ كُلَّ الْجَالِسِينَ يَضْحَكُونَ.",
    "exampleDE": "Mit seiner humorvollen Art bringt er die ganze Runde zum Lachen."
  },
  {
    "front": "das Missverständnis",
    "back": "سُوءُ تَفَاهُم",
    "roman": "sūʾ tafāhum",
    "example": "مِنْ خِلَالِ مُحَادَثَةٍ هَاتِفِيَّةٍ قَصِيرَةٍ تَوَضَّحَ سُوءُ التَّفَاهُمِ.",
    "exampleDE": "Durch ein kurzes Telefongespräch klärte sich das Missverständnis auf."
  },
  {
    "front": "der Streit",
    "back": "شِجَار",
    "roman": "shijār",
    "example": "بَعْدَ الشِّجَارِ الْحَامِي تَحَدَّثَ الِاثْنَانِ مَعًا بِهُدُوءٍ.",
    "exampleDE": "Nach dem hitzigen Streit sprachen beide in Ruhe miteinander."
  },
  {
    "front": "die Versöhnung",
    "back": "مُصَالَحَة",
    "roman": "muṣālaḥa",
    "example": "اعْتِذَارٌ صَادِقٌ مَهَّدَ الطَّرِيقَ لِلْمُصَالَحَةِ.",
    "exampleDE": "Eine ehrliche Entschuldigung ebnete den Weg zur Versöhnung."
  },
  {
    "front": "der Kompromiss",
    "back": "حَلٌّ وَسَط",
    "roman": "ḥall wasaṭ",
    "example": "اتَّفَقَ طَرَفَا التَّفَاوُضِ عَلَى حَلٍّ وَسَطٍ مُنْصِفٍ.",
    "exampleDE": "Beide Verhandlungsparteien einigten sich auf einen fairen Kompromiss."
  },
  {
    "front": "zuhören",
    "back": "أَصْغَى",
    "roman": "aṣghā",
    "example": "الْإِصْغَاءُ الْجَيِّدُ غَالِبًا مَا يَكُونُ أَهَمَّ مِنَ التَّحَدُّثِ كَثِيرًا.",
    "exampleDE": "Gutes Zuhören ist oft wichtiger als selbst viel zu reden."
  },
  {
    "front": "unterbrechen",
    "back": "قَاطَعَ",
    "roman": "qāṭaʿa",
    "example": "دَعْنِي أُنْهِي جُمْلَتِي مِنْ فَضْلِكَ وَلَا تُقَاطِعْنِي.",
    "exampleDE": "Bitte lass mich meinen Satz beenden und unterbrich mich nicht."
  },
  {
    "front": "kritisieren",
    "back": "انْتَقَدَ",
    "roman": "intaqada",
    "example": "يَنْبَغِي لِلْمَرْءِ أَنْ يُوَجِّهَ النَّقْدَ دَائِمًا بِمَوْضُوعِيَّةٍ وَبِنَاءٍ.",
    "exampleDE": "Man sollte Kritik stets sachlich und konstruktiv formulieren."
  },
  {
    "front": "die Meinung",
    "back": "رَأْي",
    "roman": "raʾy",
    "example": "فِي رَأْيِي يَجِبُ أَنْ نُعِيدَ التَّفْكِيرَ فِي الْخُطَطِ مَرَّةً أُخْرَى.",
    "exampleDE": "Meiner Meinung nach sollten wir die Pläne noch einmal überdenken."
  },
  {
    "front": "der Standpunkt",
    "back": "وُجْهَةُ نَظَر",
    "roman": "wijhat naẓar",
    "example": "دَافَعَتْ عَنْ وُجْهَةِ نَظَرِهَا بِحُجَجٍ وَاضِحَةٍ وَمُقْنِعَةٍ.",
    "exampleDE": "Sie vertrat ihren Standpunkt mit klaren und überzeugenden Argumenten."
  },
  {
    "front": "das Argument",
    "back": "حُجَّة",
    "roman": "ḥujja",
    "example": "حُجَّةٌ قَوِيَّةٌ أَقْنَعَتْ حَتَّى الْمُسْتَمِعِينَ الْمُتَشَكِّكِينَ.",
    "exampleDE": "Ein starkes Argument überzeugte auch die skeptischen Zuhörer."
  },
  {
    "front": "beipflichten",
    "back": "وَافَقَ الرَّأْي",
    "roman": "wāfaqa r-raʾy",
    "example": "فِي هَذَا التَّقْدِيرِ يَجِبُ أَنْ أُوَافِقَكَ الرَّأْيَ تَمَامًا.",
    "exampleDE": "In dieser Einschätzung muss ich Ihnen vollkommen beipflichten."
  },
  {
    "front": "Einwand erheben",
    "back": "اعْتَرَضَ",
    "roman": "iʿtaraḍa",
    "example": "قَدَّمَ اعْتِرَاضًا مَوْضُوعِيًّا ضِدَّ الِاقْتِرَاحِ الْجَدِيدِ.",
    "exampleDE": "Er erhob einen sachlichen Einwand gegen den neuen Vorschlag."
  },
  {
    "front": "die Überzeugungskraft",
    "back": "قُوَّةُ إِقْنَاع",
    "roman": "quwwat iqnāʿ",
    "example": "بِقُوَّةِ إِقْنَاعٍ كَبِيرَةٍ كَسَبَتِ الْمُسْتَمِعِينَ إِلَى جَانِبِهَا.",
    "exampleDE": "Mit großer Überzeugungskraft gewann sie die Zuhörer für sich."
  },
  {
    "front": "die Diskussion",
    "back": "نِقَاش",
    "roman": "niqāsh",
    "example": "اسْتَمَرَّ النِّقَاشُ الْحَيَوِيُّ حَتَّى وَقْتٍ مُتَأَخِّرٍ مِنَ الْمَسَاءِ.",
    "exampleDE": "Die lebhafte Diskussion dauerte bis spät in den Abend."
  },
  {
    "front": "das Fazit",
    "back": "خُلَاصَة",
    "roman": "khulāṣa",
    "example": "كَخُلَاصَةٍ، يُمْكِنُ الْقَوْلُ إِنَّ الْمَشْرُوعَ كَانَ نَاجِحًا.",
    "exampleDE": "Als Fazit lässt sich festhalten, dass das Projekt gelungen ist."
  },
  {
    "front": "die Höflichkeit",
    "back": "تَهْذِيب",
    "roman": "tahdhīb",
    "example": "التَّهْذِيبُ يَفْتَحُ أَبْوَابًا كَثِيرَةً فِي الْحَيَاةِ الْخَاصَّةِ وَالْمِهْنِيَّةِ.",
    "exampleDE": "Höflichkeit öffnet viele Türen im privaten und beruflichen Leben."
  },
  {
    "front": "der Respekt",
    "back": "احْتِرَام",
    "roman": "iḥtirām",
    "example": "الِاحْتِرَامُ الْمُتَبَادَلُ هُوَ أَسَاسُ التَّعَايُشِ السِّلْمِيِّ.",
    "exampleDE": "Gegenseitiger Respekt ist die Grundlage für ein friedliches Miteinander."
  },
  {
    "front": "die Entschuldigung",
    "back": "اعْتِذَار",
    "roman": "iʿtidhār",
    "example": "قَبِلَ الِاعْتِذَارَ الصَّادِقَ دُونَ تَرَدُّدٍ.",
    "exampleDE": "Er nahm die aufrichtige Entschuldigung ohne Zögern an."
  },
  {
    "front": "die Einladung",
    "back": "دَعْوَة",
    "roman": "daʿwa",
    "example": "شُكْرًا جَزِيلًا مِنْ كُلِّ قَلْبِي عَلَى الدَّعْوَةِ اللَّطِيفَةِ لِتَنَاوُلِ الْعَشَاءِ.",
    "exampleDE": "Vielen herzlichen Dank für die freundliche Einladung zum Abendessen."
  },
  {
    "front": "der Dank",
    "back": "شُكْر",
    "roman": "shukr",
    "example": "أَوَدُّ أَنْ أُعْرِبَ لَكُمْ عَنْ خَالِصِ شُكْرِي لِدَعْمِكُمْ.",
    "exampleDE": "Ich möchte Ihnen meinen herzlichen Dank für die Unterstützung aussprechen."
  },
  {
    "front": "die Gastfreundschaft",
    "back": "ضِيَافَة",
    "roman": "ḍiyāfa",
    "example": "حُسْنُ الضِّيَافَةِ الْقَلْبِيُّ لِلْعَائِلَةِ تَرَكَ لَدَيْنَا انْطِبَاعًا عَمِيقًا.",
    "exampleDE": "Die herzliche Gastfreundschaft der Familie hat uns tief beeindruckt."
  }
]
