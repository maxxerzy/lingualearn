# -*- coding: utf-8 -*-
import json

part4_cards_b = [
  {
    "front": "obgleich",
    "back": "رَغْمَ أَنَّ",
    "roman": "raghma anna",
    "example": "رَغْمَ أَنَّ الْجَوَّ كَانَ عَاصِفًا، أَبْحَرَ الصَّيَّادُونَ بِقَوَارِبِهِمْ.",
    "exampleDE": "Obgleich es stürmisch war, liefen die Fischer mit ihren Booten aus."
  },
  {
    "front": "anpacken",
    "back": "تَعَاوَنَ عَلَى الْعَمَل",
    "roman": "taʿāwana ʿalā l-ʿamal",
    "example": "إِذَا تَعَاوَنَ الْجَمِيعُ عَلَى الْعَمَلِ، فَقَدْ يَنْتَهِي الْعَمَلُ الشَّاقُّ فِي لَمْحِ الْبَصَرِ.",
    "exampleDE": "Wenn alle mit anpacken, ist die schwere Arbeit im Nu erledigt."
  },
  {
    "front": "erledigen",
    "back": "أَنْجَزَ",
    "roman": "anjaza",
    "example": "يَجِبُ أَنْ أُنْجِزَ مُشْتَرَيَاتٍ مُهِمَّةً هَذَا الصَّبَاحَ.",
    "exampleDE": "Ich muss heute Vormittag noch wichtige Einkäufe erledigen."
  },
  {
    "front": "vorbereiten",
    "back": "أَعَدَّ",
    "roman": "aʿadda",
    "example": "تُعِدُّ الْعَرْضَ التَّقْدِيمِيَّ لِاجْتِمَاعِ الْغَدِ بِعِنَايَةٍ.",
    "exampleDE": "Sie bereitet die Präsentation für das morgige Meeting gründlich vor."
  },
  {
    "front": "aufräumen",
    "back": "رَتَّبَ",
    "roman": "rattaba",
    "example": "أَيَّامَ السَّبْتِ يُرَتِّبُ الْأَطْفَالُ غُرَفَهُمْ مَعًا.",
    "exampleDE": "Samstags räumen die Kinder gemeinsam ihre Zimmer auf."
  },
  {
    "front": "wegwerfen",
    "back": "رَمَى",
    "roman": "ramā",
    "example": "لَا يَجُوزُ رَمْيُ الْبَطَّارِيَّاتِ الْقَدِيمَةِ فِي الْقُمَامَةِ الْمَنْزِلِيَّةِ.",
    "exampleDE": "Alte Batterien darf man nicht einfach in den Hausmüll wegwerfen."
  },
  {
    "front": "behalten",
    "back": "احْتَفَظَ بِ",
    "roman": "iḥtafaẓa bi",
    "example": "أَرْغَبُ فِي الِاحْتِفَاظِ بِهَذِهِ التُّحْفَةِ التِّذْكَارِيَّةِ الْجَمِيلَةِ طَوَالَ حَيَاتِي.",
    "exampleDE": "Dieses schöne Erinnerungsstück möchte ich mein Leben lang behalten."
  },
  {
    "front": "verschenken",
    "back": "أَهْدَى",
    "roman": "ahdā",
    "example": "الْكُتُبُ الَّتِي قَرَأَتْهَا تُحِبُّ إِهْدَاءَهَا لِلْأَصْدِقَاءِ.",
    "exampleDE": "Bücher, die sie schon gelesen hat, verschenkt sie gerne an Freunde."
  },
  {
    "front": "organisieren",
    "back": "نَظَّمَ",
    "roman": "naẓẓama",
    "example": "يُنَظِّمُ الْمِهْرَجَانَ الصَّيْفِيَّ السَّنَوِيَّ لِنَادِينَا الرِّيَاضِيِّ.",
    "exampleDE": "Er organisiert das alljährliche Sommerfest unseres Sportvereins."
  },
  {
    "front": "bemerken",
    "back": "لَاحَظَ",
    "roman": "lāḥaẓa",
    "example": "لَمْ يُلَاحِظْ إِلَّا مُتَأَخِّرًا أَنَّهُ نَسِيَ مِفْتَاحَ بَيْتِهِ.",
    "exampleDE": "Erst spät bemerkte er, dass er seinen Hausschlüssel vergessen hatte."
  },
  {
    "front": "begreifen",
    "back": "فَهِمَ",
    "roman": "fahima",
    "example": "بَعْدَ الشَّرْحِ التَّوْضِيحِيِّ اسْتَطَاعَ أَنْ يَفْهَمَ السِّيَاقَ.",
    "exampleDE": "Nach der anschaulichen Erklärung konnte er den Zusammenhang begreifen."
  },
  {
    "front": "nachdenken",
    "back": "فَكَّرَ",
    "roman": "fakkara",
    "example": "يَجِبُ أَنْ أُفَكِّرَ فِي هَذَا الْعَرْضِ الْمُهِمِّ بِهُدُوءٍ أَوَّلًا.",
    "exampleDE": "Über dieses wichtige Angebot muss ich erst in Ruhe nachdenken."
  },
  {
    "front": "feststellen",
    "back": "تَحَقَّقَ",
    "roman": "taḥaqqaqa",
    "example": "تَحَقَّقَ الْمُفَتِّشُونَ مِنْ أَنَّ جَمِيعَ مَعَايِيرِ السَّلَامَةِ مُسْتَوْفَاةٌ.",
    "exampleDE": "Die Prüfer stellten fest, dass alle Sicherheitskriterien erfüllt sind."
  },
  {
    "front": "vermuten",
    "back": "خَمَّنَ",
    "roman": "khammana",
    "example": "يُخَمِّنُ الْخُبَرَاءُ أَنَّ الْأَسْعَارَ سَتَنْخَفِضُ قَرِيبًا ثَانِيَةً.",
    "exampleDE": "Die Experten vermuten, dass die Preise bald wieder sinken werden."
  },
  {
    "front": "bezweifeln",
    "back": "شَكَّ فِي",
    "roman": "shakka fī",
    "example": "أَشُكُّ كَثِيرًا فِي أَنَّ هَذِهِ الْخُطَّةَ الْقَدِيمَةَ لَا تَزَالُ تَعْمَلُ الْيَوْمَ.",
    "exampleDE": "Ich bezweifle stark, dass dieser alte Plan heute noch funktioniert."
  },
  {
    "front": "beurteilen",
    "back": "حَكَمَ عَلَى",
    "roman": "ḥakama ʿalā",
    "example": "مِنْ بَعِيدٍ يَصْعُبُ الْحُكْمُ عَلَى هَذَا الْمَوْقِفِ الصَّعْبِ.",
    "exampleDE": "Aus der Ferne lässt sich die schwierige Lage nur schwer beurteilen."
  },
  {
    "front": "begründen",
    "back": "عَلَّلَ",
    "roman": "ʿallala",
    "example": "هَلْ يُمْكِنُكَ أَنْ تُعَلِّلَ وُجْهَةَ نَظَرِكَ بِأَمْثِلَةٍ مَلْمُوسَةٍ مِنْ فَضْلِكَ؟",
    "exampleDE": "Können Sie Ihren Standpunkt bitte mit konkreten Beispielen begründen?"
  },
  {
    "front": "bestätigen",
    "back": "أَكَّدَ",
    "roman": "akkada",
    "example": "أَكَّدَتْ شَرِكَةُ الطَّيَرَانِ الْحَجْزَ عَبْرَ رِسَالَةٍ آلِيَّةٍ.",
    "exampleDE": "Die Fluggesellschaft bestätigte die Buchung per automatischer Nachricht."
  },
  {
    "front": "vereinbaren",
    "back": "اتَّفَقَ عَلَى",
    "roman": "ittafaqa ʿalā",
    "example": "اتَّفَقْنَا عَلَى مَوْعِدٍ جَدِيدٍ لِلْأُسْبُوعِ الْمُقْبِلِ.",
    "exampleDE": "Wir vereinbarten einen neuen Termin für die kommende Woche."
  },
  {
    "front": "anregen",
    "back": "اقْتَرَحَ",
    "roman": "iqtaraḥa",
    "example": "اقْتَرَحَ تَأْجِيلَ الِاجْتِمَاعِ نِصْفَ سَاعَةٍ.",
    "exampleDE": "Er regte an, die Besprechung um eine halbe Stunde zu verschieben."
  },
  {
    "front": "zur Sprache bringen",
    "back": "طَرَحَ لِلنِّقَاش",
    "roman": "ṭaraḥa li-n-niqāsh",
    "example": "طَرَحَتِ الْمَوْضُوعَ الْمُهِمَّ لِلنِّقَاشِ بِشَجَاعَةٍ فِي الْجَلْسَةِ.",
    "exampleDE": "Sie brachte das wichtige Thema in der Sitzung mutig zur Sprache."
  },
  {
    "front": "zusammenfassen",
    "back": "لَخَّصَ",
    "roman": "lakhkhaṣa",
    "example": "لَخَّصَ الْمُتَحَدِّثُ النِّقَاطَ الرَّئِيسِيَّةَ الْأَهَمَّ بِاخْتِصَارٍ.",
    "exampleDE": "Der Sprecher fasste die wichtigsten Kernaussagen kurz zusammen."
  },
  {
    "front": "berichten",
    "back": "أَعَدَّ تَقْرِيرًا",
    "roman": "aʿadda taqrīran",
    "example": "تُعِدُّ الْمُرَاسِلَةُ تَقْرِيرًا مُبَاشِرًا عَنِ الْأَحْدَاثِ الرَّاهِنَةِ.",
    "exampleDE": "Die Korrespondentin berichtet live von den aktuellen Ereignissen."
  },
  {
    "front": "mitteilen",
    "back": "أَبْلَغَ",
    "roman": "ablagha",
    "example": "يُرْجَى إِبْلَاغُنَا بِعُنْوَانِكَ الْجَدِيدِ فِي أَقْرَبِ وَقْتٍ.",
    "exampleDE": "Bitte teilen Sie uns Ihre neue Anschrift zeitnah mit."
  },
  {
    "front": "verbessern",
    "back": "حَسَّنَ",
    "roman": "ḥassana",
    "example": "بِالتَّدْرِيبِ الْيَوْمِيِّ اسْتَطَاعَ أَنْ يُحَسِّنَ زَمَنَ جَرْيِهِ الشَّخْصِيَّ.",
    "exampleDE": "Mit täglichem Training konnte er seine persönliche Laufzeit verbessern."
  },
  {
    "front": "verschlechtern",
    "back": "سَاءَ",
    "roman": "sāʾa",
    "example": "مَعَ الْمَطَرِ الْمُفَاجِئِ تَسُوءُ ظُرُوفُ الرُّؤْيَةِ بِسُرْعَةٍ.",
    "exampleDE": "Bei plötzlichem Regen verschlechtern sich die Sichtverhältnisse rasch."
  },
  {
    "front": "zunehmen",
    "back": "ازْدَادَ",
    "roman": "izdāda",
    "example": "فِي السَّنَوَاتِ الْأَخِيرَةِ ازْدَادَ الِاهْتِمَامُ بِالتَّغْذِيَةِ الصِّحِّيَّةِ.",
    "exampleDE": "In den letzten Jahren hat das Interesse an gesunder Ernährung zugenommen."
  },
  {
    "front": "abnehmen",
    "back": "أَنْقَصَ وَزْنَهُ",
    "roman": "anqaṣa waznahu",
    "example": "مِنْ خِلَالِ الْمَزِيدِ مِنَ الْحَرَكَةِ وَتَقْلِيلِ السُّكَّرِ اسْتَطَاعَ إِنْقَاصَ وَزْنِهِ بِصِحَّةٍ.",
    "exampleDE": "Durch mehr Bewegung und weniger Zucker konnte er gesund abnehmen."
  },
  {
    "front": "entwickeln",
    "back": "طَوَّرَ",
    "roman": "ṭawwara",
    "example": "يُطَوِّرُ فَرِيقُ الْمُهَنْدِسِينَ نِظَامَ دَفْعٍ جَدِيدًا وَمُوَفِّرًا لِلطَّاقَةِ.",
    "exampleDE": "Das Ingenieurteam entwickelt ein neuartiges, sparsames Antriebssystem."
  },
  {
    "front": "entstehen",
    "back": "نَشَأَ",
    "roman": "nashaʾa",
    "example": "عَلَى الْمَرْجِ الْفَارِغِ تَنْشَأُ رَوْضَةُ أَطْفَالٍ حَدِيثَةٌ.",
    "exampleDE": "Auf der freien Wiese entsteht ein moderner Kindergarten."
  },
  {
    "front": "verschwinden",
    "back": "اخْتَفَى",
    "roman": "ikhtafā",
    "example": "تَخْتَفِي كُتَلُ الضَّبَابِ الْكَثِيفَةِ بِمُجَرَّدِ شُرُوقِ الشَّمْسِ.",
    "exampleDE": "Die dichten Nebelschwaden verschwinden, sobald die Sonne scheint."
  },
  {
    "front": "überqueren",
    "back": "عَبَرَ",
    "roman": "ʿabara",
    "example": "يَنْبَغِي لِلْمُشَاةِ عُبُورُ الشَّارِعِ فَقَطْ عِنْدَ الْمَعَابِرِ الْآمِنَةِ.",
    "exampleDE": "Fußgänger sollten die Straße nur an gesicherten Überwegen überqueren."
  },
  {
    "front": "eintreffen",
    "back": "وَصَلَ",
    "roman": "waṣala",
    "example": "سَيَصِلُ الْقِطَارُ الدَّقِيقُ فِي الْمَوْعِدِ الْمُحَدَّدِ فِي السَّاعَةِ الرَّابِعَةَ عَشْرَةَ.",
    "exampleDE": "Der pünktliche Zug wird planmäßig um vierzehn Uhr eintreffen."
  },
  {
    "front": "abbiegen",
    "back": "انْعَطَفَ",
    "roman": "inʿaṭafa",
    "example": "عِنْدَ تَقَاطُعِ الْإِشَارَةِ الضَّوْئِيَّةِ يَجِبُ أَنْ تَنْعَطِفَ يَسَارًا إِلَى مِنْطَقَةِ الْمُشَاةِ.",
    "exampleDE": "An der Ampelkreuzung müssen Sie links in die Fußgängerzone abbiegen."
  },
  {
    "front": "beschleunigen",
    "back": "سَرَّعَ",
    "roman": "sarraʿa",
    "example": "عَلَى الْمَدْخَلِ تُسَرِّعُ السَّيَّارَةُ بِانْسِيَابٍ إِلَى سُرْعَةِ الطَّرِيقِ السَّرِيعِ.",
    "exampleDE": "Auf der Auffahrt beschleunigt der Wagen zügig auf Autobahntempo."
  },
  {
    "front": "bremsen",
    "back": "فَرْمَلَ",
    "roman": "farmala",
    "example": "قَبْلَ الْمُنْعَطَفِ الْحَادِّ يُفَرْمِلُ السَّائِقُ فِي الْوَقْتِ الْمُنَاسِبِ.",
    "exampleDE": "Vor der scharfen Kurve bremst der Fahrer rechtzeitig ab."
  },
  {
    "front": "anhalten",
    "back": "تَوَقَّفَ",
    "roman": "tawaqqafa",
    "example": "عِنْدَ لَافِتَةِ التَّوَقُّفِ يَجِبُ عَلَى كُلِّ مَرْكَبَةٍ التَّوَقُّفُ لِثَلَاثِ ثَوَانٍ.",
    "exampleDE": "Am Stoppschild muss jedes Fahrzeug für drei Sekunden anhalten."
  },
  {
    "front": "vorbeifahren",
    "back": "مَرَّ بِ",
    "roman": "marra bi",
    "example": "يَمُرُّ قِطَارُ الْإِكْسِبْرِيسِ دُونَ تَوَقُّفٍ بِمَحَطَّةِ الْإِقْلِيمِ الصَّغِيرَةِ.",
    "exampleDE": "Der Expresszug fährt ohne Halt am kleinen Provinzbahnhof vorbei."
  },
  {
    "front": "umkehren",
    "back": "عَادَ أَدْرَاجَهُ",
    "roman": "ʿāda adrājahu",
    "example": "بِسَبَبِ الْعَاصِفَةِ الثَّلْجِيَّةِ الْمُفَاجِئَةِ اضْطُرَّ مُتَسَلِّقُو الْجِبَالِ إِلَى الْعَوْدَةِ أَدْرَاجَهُمْ.",
    "exampleDE": "Wegen des plötzlichen Schneesturms mussten die Bergsteiger umkehren."
  },
  {
    "front": "beruhigen",
    "back": "هَدَّأَ",
    "roman": "haddaʾa",
    "example": "اسْتَطَاعَتِ الْأُمُّ تَهْدِئَةَ الطِّفْلِ الْبَاكِي بِسُرْعَةٍ بِصَوْتٍ رَقِيقٍ.",
    "exampleDE": "Die Mutter konnte das weinende Kind mit sanfter Stimme rasch beruhigen."
  },
  {
    "front": "beunruhigen",
    "back": "أَقْلَقَ",
    "roman": "aqlaqa",
    "example": "غُيُومُ الْعَاصِفَةِ الرَّعْدِيَّةِ الدَّاكِنَةُ فِي السَّمَاءِ أَقْلَقَتِ الْمُتَنَزِّهِينَ.",
    "exampleDE": "Die dunklen Gewitterwolken am Himmel beunruhigten die Wanderer."
  },
  {
    "front": "überraschen",
    "back": "فَاجَأَ",
    "roman": "fājaʾa",
    "example": "فَاجَأَهُ أَصْدِقَاؤُهُ بِكَعْكَةٍ مَخْبُوزَةٍ مَنْزِلِيًّا.",
    "exampleDE": "Seine Freunde überraschten ihn mit einem selbstgebackenen Kuchen."
  },
  {
    "front": "trösten",
    "back": "وَاسَى",
    "roman": "wāsā",
    "example": "حَاوَلَتْ أَنْ تُوَاسِيَ صَدِيقَتَهَا الْحَزِينَةَ بِكَلِمَاتٍ رَقِيقَةٍ.",
    "exampleDE": "Sie versuchte ihre traurige Freundin mit lieben Worten zu trösten."
  },
  {
    "front": "bewundern",
    "back": "أُعْجِبَ بِ",
    "roman": "uʿjiba bi",
    "example": "يُعْجَبُ السُّيَّاحُ مِنْ كُلِّ أَنْحَاءِ الْعَالَمِ بِالْعِمَارَةِ الْمُتْقَنَةِ.",
    "exampleDE": "Touristen aus aller Welt bewundern die meisterhafte Architektur."
  },
  {
    "front": "respektieren",
    "back": "احْتَرَمَ",
    "roman": "iḥtarama",
    "example": "يَنْبَغِي لَنَا دَائِمًا احْتِرَامُ الْآرَاءِ الْمُخْتَلِفَةِ لِلْآخَرِينَ.",
    "exampleDE": "Wir sollten die unterschiedlichen Meinungen anderer stets respektieren."
  },
  {
    "front": "schätzen",
    "back": "قَدَّرَ",
    "roman": "qaddara",
    "example": "أُقَدِّرُ كَثِيرًا أُسْلُوبَكَ الصَّادِقَ وَالْمُبَاشِرَ.",
    "exampleDE": "Ich schätze deine ehrliche und direkte Art sehr."
  },
  {
    "front": "hervorragend",
    "back": "مُمْتَاز",
    "roman": "mumtāz",
    "example": "قَدَّمَتِ الْمُمَثِّلَةُ أَدَاءً مُمْتَازًا مِنْ جَمِيعِ النَّوَاحِي.",
    "exampleDE": "Die Schauspielerin lieferte eine rundum hervorragende Leistung ab."
  },
  {
    "front": "bemerkenswert",
    "back": "جَدِيرٌ بِالْمُلَاحَظَة",
    "roman": "jadīr bi-l-mulāḥaẓa",
    "example": "سُرْعَةُ اسْتِيعَابِهَا جَدِيرَةٌ بِالْمُلَاحَظَةِ حَقًّا.",
    "exampleDE": "Ihre schnelle Auffassungsgabe ist wirklich bemerkenswert."
  },
  {
    "front": "angemessen",
    "back": "مُنَاسِب",
    "roman": "munāsib",
    "example": "السِّعْرُ مُنَاسِبٌ تَمَامًا لِلْجَوْدَةِ الْمُقَدَّمَةِ.",
    "exampleDE": "Der Preis für die gebotene Qualität ist absolut angemessen."
  },
  {
    "front": "überflüssig",
    "back": "غَيْرُ ضَرُورِيّ",
    "roman": "ghayr ḍarūriyy",
    "example": "الِانْتِظَارُ الطَّوِيلُ عِنْدَ الشُّبَّاكِ يُصْبِحُ غَيْرَ ضَرُورِيٍّ بِفَضْلِ الْحَجْزِ عَبْرَ الْإِنْتَرْنِت.",
    "exampleDE": "Langes Warten am Schalter wird durch Online-Buchungen überflüssig."
  },
  {
    "front": "wesentlich",
    "back": "جَوْهَرِيّ",
    "roman": "jawhariyy",
    "example": "التَّحْضِيرُ الْجَيِّدُ يُسَاهِمُ بِشَكْلٍ جَوْهَرِيٍّ فِي نَجَاحِ أَيِّ مَشْرُوعٍ.",
    "exampleDE": "Gute Vorbereitung trägt wesentlich zum Erfolg eines Vorhabens bei."
  },
  {
    "front": "ausreichend",
    "back": "كَافٍ",
    "roman": "kāfin",
    "example": "فِي الثَّلَّاجَةِ لَا تَزَالُ هُنَاكَ مَؤُونَةٌ كَافِيَةٌ لِعُطْلَةِ نِهَايَةِ الْأُسْبُوعِ.",
    "exampleDE": "Im Kühlschrank sind noch ausreichend Vorräte für das Wochenende."
  },
  {
    "front": "wertvoll",
    "back": "ثَمِين",
    "roman": "thamīn",
    "example": "نَصَائِحُهَا الْعَمَلِيَّةُ كَانَتْ ثَمِينَةً جِدًّا لَنَا جَمِيعًا.",
    "exampleDE": "Ihre praktischen Ratschläge waren für uns alle sehr wertvoll."
  },
  {
    "front": "wirkungsvoll",
    "back": "فَعَّال",
    "roman": "faʿʿāl",
    "example": "التَّهْوِيَةُ الْمُنْتَظَمَةُ إِجْرَاءٌ فَعَّالٌ ضِدَّ الْعَفَنِ.",
    "exampleDE": "Regelmäßiges Lüften ist eine wirkungsvolle Maßnahme gegen Schimmel."
  },
  {
    "front": "gepflegt",
    "back": "مُعْتَنًى بِه",
    "roman": "muʿtanan bih",
    "example": "الْحَدِيقَةُ الْأَمَامِيَّةُ الْقَدِيمَةُ تَبْدُو مُعْتَنًى بِهَا لِلْغَايَةِ.",
    "exampleDE": "Der alte Vorgarten macht einen überaus gepflegten Eindruck."
  },
  {
    "front": "unordentlich",
    "back": "فَوْضَوِيّ",
    "roman": "fawḍawiyy",
    "example": "بَعْدَ ظَهِيرَةِ الْأَعْمَالِ الْيَدَوِيَّةِ بَدَتْ غُرْفَةُ الْأَطْفَالِ فَوْضَوِيَّةً تَمَامًا.",
    "exampleDE": "Nach dem Bastelnachmittag sah das Kinderzimmer recht unordentlich aus."
  },
  {
    "front": "gemütlich",
    "back": "مُرِيح",
    "roman": "murīḥ",
    "example": "قَضَيْنَا أُمْسِيَةً مُرِيحَةً بِجَانِبِ نَارِ الْمَوْقِدِ الدَّافِئَةِ.",
    "exampleDE": "Wir verbrachten einen gemütlichen Abend am warmen Kaminfeuer."
  },
  {
    "front": "anstrengend",
    "back": "مُجْهِد",
    "roman": "mujhid",
    "example": "الرِّحْلَةُ الطَّوِيلَةُ عَلَى مَسَارَاتِ الْحَصَى الشَّدِيدَةِ الِانْحِدَارِ كَانَتْ مُجْهِدَةً جِدًّا.",
    "exampleDE": "Die lange Wanderung über steile Geröllpfade war sehr anstrengend."
  },
  {
    "front": "erträglich",
    "back": "مُحْتَمَل",
    "roman": "muḥtamal",
    "example": "بِفَضْلِ نَسِيمِ الْبَحْرِ الْخَفِيفِ كَانَتْ دَرَجَاتُ الْحَرَارَةِ الْمُرْتَفِعَةُ مُحْتَمَلَةً.",
    "exampleDE": "Dank des leichten Seewinds waren die hohen Temperaturen erträglich."
  },
  {
    "front": "tadellos",
    "back": "بِلَا عَيْب",
    "roman": "bi-lā ʿayb",
    "example": "الْحَمَّامُ الْمُجَدَّدُ حَدِيثًا يَعْمَلُ بِلَا عَيْبٍ.",
    "exampleDE": "Das frisch renovierte Badezimmer funktioniert tadellos."
  },
  {
    "front": "makellos",
    "back": "خَالٍ مِنَ الشَّوَائِب",
    "roman": "khālin min ash-shawāʾib",
    "example": "السَّطْحُ الْمَصْقُولُ حَدِيثًا يَلْمَعُ خَالِيًا مِنَ الشَّوَائِبِ فِي ضَوْءِ الشَّمْسِ.",
    "exampleDE": "Die frisch polierte Oberfläche glänzt makellos im Sonnenlicht."
  },
  {
    "front": "aufrichtig",
    "back": "صَادِق",
    "roman": "ṣādiq",
    "example": "شَكَرَتْ بِكَلِمَاتٍ صَادِقَةٍ عَلَى الْمُسَاعَدَةِ السَّخِيَّةِ.",
    "exampleDE": "Sie bedankte sich mit aufrichtigen Worten für die großzügige Hilfe."
  },
  {
    "front": "rücksichtsvoll",
    "back": "مُرَاعٍ لِلْآخَرِين",
    "roman": "murāʿin li-l-ākharīn",
    "example": "فِي الْحَافِلَةِ الْمُمْتَلِئَةِ يَتَصَرَّفُ بِمُرَاعَاةٍ لِكِبَارِ السِّنِّ.",
    "exampleDE": "Im vollen Bus verhält er sich rücksichtsvoll gegenüber älteren Menschen."
  },
  {
    "front": "aufmerksam",
    "back": "مُنْتَبِه",
    "roman": "muntabih",
    "example": "لَاحَظَ النَّادِلُ الْمُنْتَبِهُ فَوْرًا أَنَّ الْكَأْسَ كَانَتْ فَارِغَةً.",
    "exampleDE": "Der aufmerksame Kellner bemerkte sofort, dass das Glas leer war."
  },
  {
    "front": "willensstark",
    "back": "قَوِيُّ الْإِرَادَة",
    "roman": "qawiyy al-irāda",
    "example": "بِجُهْدٍ قَوِيِّ الْإِرَادَةِ حَقَّقَتِ الرِّيَاضِيَّةُ هَدَفَهَا الرِّيَاضِيَّ.",
    "exampleDE": "Mit willensstarkem Einsatz erreichte die Athletin ihr sportliches Ziel."
  },
  {
    "front": "selbstständig",
    "back": "مُسْتَقِلّ",
    "roman": "mustaqill",
    "example": "حَلَّتِ التِّلْمِيذَةُ الْمَسْأَلَةَ الصَّعْبَةَ بِمُفْرَدِهَا تَمَامًا.",
    "exampleDE": "Die Schülerin löste die anspruchsvolle Aufgabe völlig selbstständig."
  },
  {
    "front": "verantwortungsbewusst",
    "back": "مَسْؤُول",
    "roman": "masʾūl",
    "example": "السَّائِقُ الْمَسْؤُولُ يَنْتَبِهُ دَائِمًا إِلَى حَدِّ السُّرْعَةِ.",
    "exampleDE": "Ein verantwortungsbewusster Fahrer achtet stets auf das Tempolimit."
  },
  {
    "front": "friedlich",
    "back": "سِلْمِيّ",
    "roman": "silmiyy",
    "example": "سَارَتِ الْمُظَاهَرَةُ مِنْ بِدَايَتِهَا حَتَّى نِهَايَتِهَا بِشَكْلٍ سِلْمِيٍّ تَمَامًا.",
    "exampleDE": "Die Kundgebung verlief von Anfang bis Ende vollkommen friedlich."
  },
  {
    "front": "hilfsbereit",
    "back": "مُتَعَاوِن",
    "roman": "mutaʿāwin",
    "example": "عَرَضَ الْجَارُ الْجَدِيدُ مُسَاعَدَتَهُ بِتَعَاوُنٍ أَثْنَاءَ الِانْتِقَالِ.",
    "exampleDE": "Der neue Nachbar bot hilfsbereit seine Unterstützung beim Umzug an."
  },
  {
    "front": "keine Ursache",
    "back": "لَا شُكْرَ عَلَى وَاجِب",
    "roman": "lā shukra ʿalā wājib",
    "example": "«شُكْرًا جَزِيلًا لِمُسَاعَدَتِكَ!» — «لَا شُكْرَ عَلَى وَاجِبٍ، عَلَى الرَّحْبِ وَالسَّعَةِ!»",
    "exampleDE": "„Vielen Dank für deine Hilfe!“ – „Keine Ursache, gern geschehen!“"
  },
  {
    "front": "mach dir keine Sorgen",
    "back": "لَا تَقْلَق",
    "roman": "lā taqlaq",
    "example": "لَا تَقْلَقْ، سَيَتَحَوَّلُ كُلُّ شَيْءٍ إِلَى الْأَفْضَلِ.",
    "exampleDE": "Mach dir keine Sorgen, alles wird sich zum Guten wenden."
  },
  {
    "front": "bis zum nächsten Mal",
    "back": "إِلَى اللِّقَاءِ فِي الْمَرَّةِ الْقَادِمَة",
    "roman": "ilā l-liqāʾi fī l-marrat al-qādima",
    "example": "كَانَتْ أُمْسِيَةً جَمِيلَةً، مَعَ السَّلَامَةِ وَإِلَى اللِّقَاءِ فِي الْمَرَّةِ الْقَادِمَةِ!",
    "exampleDE": "Es war ein schöner Abend, auf Wiedersehen und bis zum nächsten Mal!"
  },
  {
    "front": "im Großen und Ganzen",
    "back": "بِشَكْلٍ عَامّ",
    "roman": "bi-shaklin ʿāmm",
    "example": "بِشَكْلٍ عَامٍّ نَحْنُ رَاضُونَ جِدًّا عَنِ النَّتِيجَةِ.",
    "exampleDE": "Im Großen und Ganzen sind wir mit dem Ergebnis sehr zufrieden."
  },
  {
    "front": "Schritt für Schritt",
    "back": "خُطْوَةً بِخُطْوَة",
    "roman": "khuṭwatan bi-khuṭwa",
    "example": "يَتَعَلَّمُ الْمَرْءُ اللُّغَةَ الْأَجْنَبِيَّةَ أَفْضَلَ مَا يَكُونُ بِصَبْرٍ خُطْوَةً بِخُطْوَةٍ.",
    "exampleDE": "Man lernt eine fremde Sprache am besten geduldig Schritt für Schritt."
  },
  {
    "front": "auf jeden Fall",
    "back": "عَلَى كُلِّ حَال",
    "roman": "ʿalā kulli ḥāl",
    "example": "يَجِبُ عَلَيْنَا عَلَى كُلِّ حَالٍ زِيَارَةُ الْمَدِينَةِ الْقَدِيمَةِ الْجَدِيرَةِ بِالْمُشَاهَدَةِ.",
    "exampleDE": "Wir sollten die sehenswerte Altstadt auf jeden Fall besichtigen."
  }
]

if __name__ == '__main__':
    from build_ar_part4 import part4_cards
    all_cards = part4_cards + part4_cards_b
    print(f"Total part 4 cards: {len(all_cards)}")
    with open('scripts/data_ar_part4.json', 'w', encoding='utf-8') as f:
        json.dump(all_cards, f, ensure_ascii=False, indent=2)
    print("Saved scripts/data_ar_part4.json successfully.")
