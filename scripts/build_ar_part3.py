# -*- coding: utf-8 -*-
import json

part3_cards = [
  {
    "front": "die Amsel",
    "back": "شُحْرُور",
    "roman": "shuḥrūr",
    "example": "فِي الصَّبَاحِ الْبَاكِرِ يُغَنِّي الشُّحْرُورُ أُغْنِيَتَهُ الرَّخِيمَةَ مِنْ فَوْقِ سَطْحِ الْمَنْزِلِ.",
    "exampleDE": "Früh am Morgen singt die Amsel ihr melodisches Lied vom Hausdach."
  },
  {
    "front": "die Schwalbe",
    "back": "سُنُونُو",
    "roman": "sunūnū",
    "example": "تَبْنِي طُيُورُ السُّنُونُو أَعْشَاشَهَا الْبَدِيعَةَ مِنَ الطِّينِ تَحْتَ إِفْرِيزِ السَّطْحِ.",
    "exampleDE": "Schwalben bauen ihre kunstvollen Nester aus Lehm unter den Dachvorsprung."
  },
  {
    "front": "der Storch",
    "back": "لَقْلَق",
    "roman": "laqlaq",
    "example": "عَلَى مَدْخَنَةِ الْحَظِيرَةِ الْقَدِيمَةِ يُعَشِّشُ زَوْجٌ مِنَ اللَّقَالِقِ.",
    "exampleDE": "Auf dem Schornstein der alten Scheune nistet ein Storchenpaar."
  },
  {
    "front": "die Elster",
    "back": "عَقْعَق",
    "roman": "ʿaqʿaq",
    "example": "يُعْتَبَرُ الْعَقْعَقُ الْأَسْوَدُ وَالْأَبْيَضُ فِي التُّرَاثِ الشَّعْبِيِّ طَائِرًا سَارِقًا.",
    "exampleDE": "Die schwarz-weiße Elster gilt im Volksmund als diebischer Vogel."
  },
  {
    "front": "der Specht",
    "back": "نَقَّارُ الْخَشَب",
    "roman": "naqqār al-khashab",
    "example": "مِنَ الْغَابَةِ يُسْمَعُ النَّقْرُ الرَّتِيبُ لِنَقَّارِ الْخَشَبِ.",
    "exampleDE": "Aus dem Wald hört man das rhythmische Hämmern eines Spechts."
  },
  {
    "front": "der Zugvogel",
    "back": "طَائِرٌ مُهَاجِر",
    "roman": "ṭāʾir muhājir",
    "example": "فِي الْخَرِيفِ تَطِيرُ الطُّيُورُ الْمُهَاجِرَةُ عَلَى شَكْلِ حَرْفِ V نَحْوَ الْجَنُوبِ.",
    "exampleDE": "Im Herbst fliegen Zugvögel in V-Formation Richtung Süden."
  },
  {
    "front": "die Forelle",
    "back": "سَمَكُ السَّلْمُونِ الْمُرَقَّط",
    "roman": "samak as-salmūn al-muraqqaṭ",
    "example": "فِي الْجَدْوَلِ الْجَبَلِيِّ الْبَارِدِ تَسْبَحُ سَمَكَةُ سَلْمُونٍ مُرَقَّطَةٌ فِضِّيَّةٌ.",
    "exampleDE": "Im kühlen Gebirgsbach schwimmt eine silbrige Bachforelle."
  },
  {
    "front": "der Lachs",
    "back": "سَمَكُ السَّلْمُون",
    "roman": "samak as-salmūn",
    "example": "فِي مَوْسِمِ وَضْعِ الْبَيْضِ يُهَاجِرُ السَّلْمُونُ كِيلُومِتْرَاتٍ عَدِيدَةً عَكْسَ مَجْرَى النَّهْرِ.",
    "exampleDE": "Zur Laichzeit wandert der Lachs viele Kilometer flussaufwärts."
  },
  {
    "front": "der Karpfen",
    "back": "شَبُّوط",
    "roman": "shabbūṭ",
    "example": "فِي قَاعِ بِرْكَةِ الْقَرْيَةِ الْهَادِئَةِ يَبْحَثُ شَبُّوطٌ كَبِيرٌ عَنِ الطَّعَامِ.",
    "exampleDE": "Am Grund des ruhigen Dorfteichs gründelt ein großer Karpfen."
  },
  {
    "front": "die Kröte",
    "back": "عُلْجُوم",
    "roman": "ʿuljūm",
    "example": "فِي الرَّبِيعِ تُهَاجِرُ الْكَثِيرُ مِنَ الْعَلَاجِيمِ إِلَى مِيَاهِ وَضْعِ الْبَيْضِ.",
    "exampleDE": "Im Frühjahr wandern viele Kröten zu ihren Laichgewässern."
  },
  {
    "front": "der Salamander",
    "back": "سَمَنْدَل",
    "roman": "samandal",
    "example": "سَمَنْدَلُ النَّارِ الْأَسْوَدُ وَالْأَصْفَرُ يُحِبُّ الْغَابَاتِ النَّفْضِيَّةَ الرَّطْبَةَ.",
    "exampleDE": "Der schwarz-gelbe Feuersalamander liebt feuchte Laubwälder."
  },
  {
    "front": "die Kaulquappe",
    "back": "شُرْغُوف",
    "roman": "shurghūf",
    "example": "مِنَ الشَّرَاغِيفِ الصَّغِيرَةِ تَتَطَوَّرُ تَدْرِيجِيًّا ضَفَادِعُ صَغِيرَةٌ.",
    "exampleDE": "Aus den winzigen Kaulquappen entwickeln sich nach und nach junge Frösche."
  },
  {
    "front": "der Krebs",
    "back": "سَرَطَانُ النَّهْر",
    "roman": "saraṭān an-nahr",
    "example": "تَحْتَ حَجَرٍ مُسَطَّحٍ فِي الْجَدْوَلِ يَخْتَبِئُ سَرَطَانُ النَّهْرِ.",
    "exampleDE": "Unter einem flachen Stein im Bach verbirgt sich ein Flusskrebs."
  },
  {
    "front": "die Muschel",
    "back": "صَدَفَة",
    "roman": "ṣadafa",
    "example": "عَلَى الشَّاطِئِ الرَّمْلِيِّ جَمَعَ الْأَطْفَالُ أَصْدَافًا فَارِغَةً.",
    "exampleDE": "Am Sandstrand sammelten die Kinder leere Muschelschalen."
  },
  {
    "front": "der Marienkäfer",
    "back": "دُعْسُوقَة",
    "roman": "duʿsūqa",
    "example": "دُعْسُوقَةٌ حَمْرَاءُ بِسَبْعِ نِقَاطٍ سَوْدَاءَ تَزْحَفُ عَلَى السَّاقِ.",
    "exampleDE": "Ein roter Marienkäfer mit sieben schwarzen Punkten krabbelt am Halm."
  },
  {
    "front": "die Libelle",
    "back": "يَعْسُوب",
    "roman": "yaʿsūb",
    "example": "يَعْسُوبٌ بَرَّاقٌ يَطِيرُ بِسُرْعَةِ الْبَرْقِ فَوْقَ سَطْحِ الْمَاءِ.",
    "exampleDE": "Eine schillernde Libelle schwirrt blitzschnell über die Wasseroberfläche."
  },
  {
    "front": "die Hummel",
    "back": "طَنَّان",
    "roman": "ṭannān",
    "example": "طَنَّانٌ بَدِينٌ مُكْتَسٍ بِالْفَرْوِ يَطِنُّ بِنَشَاطٍ مِنْ زَهْرَةٍ إِلَى زَهْرَةٍ.",
    "exampleDE": "Eine dicke, pelzige Hummel summt emsig von Blüte zu Blüte."
  },
  {
    "front": "die Wespe",
    "back": "دَبُّور",
    "roman": "dabbūr",
    "example": "الْأَطْعِمَةُ الْحُلْوَةُ فِي الْهَوَاءِ الطَّلْقِ تَجْذِبُ الدَّبَابِيرَ الْمُزْعِجَةَ فِي أَوَاخِرِ الصَّيْفِ.",
    "exampleDE": "Süße Speisen im Freien locken im Spätsommer lästige Wespen an."
  },
  {
    "front": "die Heuschrecke",
    "back": "جَرَادَة",
    "roman": "jarāda",
    "example": "بِأَرْجُلِهَا الْخَلْفِيَّةِ الطَّوِيلَةِ تَقْفِزُ الْجَرَادَةُ الْخَضْرَاءُ بَعِيدًا.",
    "exampleDE": "Mit ihren langen Hinterbeinen springt die grüne Heuschrecke weit."
  },
  {
    "front": "die Eidechse",
    "back": "سِحْلِيَّة",
    "roman": "siḥliyya",
    "example": "عَلَى الْجِدَارِ الْحَجَرِيِّ الدَّافِئِ بِالشَّمْسِ تَتَدَفَّأُ سِحْلِيَّةٌ صَغِيرَةٌ.",
    "exampleDE": "Auf der sonnenwarmen Steinmauer wärmt sich eine kleine Eidechse."
  },
  {
    "front": "die Schnecke",
    "back": "حَلَزُون",
    "roman": "ḥalazūn",
    "example": "بَعْدَ الْمَطَرِ الدَّافِئِ يَزْحَفُ حَلَزُونٌ عَبْرَ الطَّرِيقِ.",
    "exampleDE": "Nach dem warmen Regen kriecht eine Weinbergschnecke über den Weg."
  },
  {
    "front": "die Wettervorhersage",
    "back": "نَشْرَةٌ جَوِّيَّة",
    "roman": "nashra jawwiyya",
    "example": "حَسَبَ النَّشْرَةِ الْجَوِّيَّةِ سَيَكُونُ الطَّقْسُ مُشْمِسًا وَمُعْتَدِلًا فِي عُطْلَةِ نِهَايَةِ الْأُسْبُوعِ.",
    "exampleDE": "Laut Wettervorhersage soll es am Wochenende sonnig und mild werden."
  },
  {
    "front": "der Regenschauer",
    "back": "زَخَّةُ مَطَر",
    "roman": "zakhkhat maṭar",
    "example": "زَخَّةُ مَطَرٍ قَصِيرَةٌ فَاجَأَتِ الْمُتَنَزِّهِينَ فِي حَدِيقَةِ الْمَدِينَةِ.",
    "exampleDE": "Ein kurzer Regenschauer überraschte die Spaziergänger im Stadtpark."
  },
  {
    "front": "der Nieselregen",
    "back": "رَذَاذ",
    "roman": "radhādh",
    "example": "رَذَاذٌ كَثِيفٌ وَدَقِيقٌ يَحْجُبُ الرُّؤْيَةَ فِي الصَّبَاحِ.",
    "exampleDE": "Dichter, feiner Nieselregen trübt die Sicht am Vormittag."
  },
  {
    "front": "das Gewitter",
    "back": "عَاصِفَةٌ رَعْدِيَّة",
    "roman": "ʿāṣifa raʿdiyya",
    "example": "فِي الْأُفُقِ تَتَصَاعَدُ سُحُبٌ دَاكِنَةٌ تُنْذِرُ بِعَاصِفَةٍ رَعْدِيَّةٍ.",
    "exampleDE": "Am Horizont ziehen dunkle Wolken auf, die ein Gewitter ankündigen."
  },
  {
    "front": "der Donnerschlag",
    "back": "قَصْفُ رَعْد",
    "roman": "qaṣf raʿd",
    "example": "قَصْفُ رَعْدٍ مُدَوٍّ جَعَلَ زُجَاجَ نَوَافِذِ الْمَنْزِلِ يَهْتَزُّ.",
    "exampleDE": "Ein lauter Donnerschlag ließ die Fensterscheiben im Haus erzittern."
  },
  {
    "front": "der Blitzschlag",
    "back": "صَاعِقَة",
    "roman": "ṣāʿiqa",
    "example": "أَصَابَتْ صَاعِقَةٌ الشَّجَرَةَ الْقَدِيمَةَ عَلَى حَافَّةِ الْحَقْلِ.",
    "exampleDE": "Ein Blitzschlag traf den alten Baum am Feldrand."
  },
  {
    "front": "die Windböe",
    "back": "هَبَّةُ رِيح",
    "roman": "habbat rīḥ",
    "example": "هَبَّةُ رِيحٍ عَنِيفَةٌ طَيَّرَتْ أَوْرَاقَ الْخَرِيفِ الْجَافَّةَ فِي الْهَوَاءِ.",
    "exampleDE": "Eine heftige Windböe wirbelte trockenes Herbstlaub durch die Luft."
  },
  {
    "front": "der Nebel",
    "back": "ضَبَاب",
    "roman": "ḍabāb",
    "example": "ضَبَابُ الصَّبَاحِ الْكَثِيفُ يَرْبِضُ كَغِطَاءٍ فَوْقَ وَادِي النَّهْرِ.",
    "exampleDE": "Dichter Frühnebel liegt wie eine Decke über dem Flusstal."
  },
  {
    "front": "der Frost",
    "back": "صَقِيع",
    "roman": "ṣaqīʿ",
    "example": "فِي اللَّيْلِ كَانَ هُنَاكَ صَقِيعٌ أَرْضِيٌّ لَوَّنَ الْمَرْجَ بِالْفِضِّيِّ.",
    "exampleDE": "In der Nacht gab es Bodenfrost, der die Wiese silbern färbte."
  },
  {
    "front": "das Glatteis",
    "back": "جَلِيد",
    "roman": "jalīd",
    "example": "حَذَارِ فِي الطُّرُقَاتِ، فَمَعَ الْجَلِيدِ تَطُولُ مَسَافَةُ الْفَرْمَلَةِ.",
    "exampleDE": "Vorsicht auf den Straßen, bei Glatteis verlängert sich der Bremsweg."
  },
  {
    "front": "die Schneeflocke",
    "back": "نَدَفَةُ ثَلْج",
    "roman": "nadafat thalj",
    "example": "بِصَمْتٍ تَتَهَادَى نَدَفَاتُ ثَلْجٍ بَيْضَاءُ سَمِيكَةٌ مِنَ السَّمَاءِ.",
    "exampleDE": "Lautlos schweben dicke weiße Schneeflocken vom Himmel herab."
  },
  {
    "front": "die Hitzewelle",
    "back": "مَوْجَةُ حَرّ",
    "roman": "mawjat ḥarr",
    "example": "خِلَالَ مَوْجَةِ الْحَرِّ الصَّيْفِيَّةِ لَا يَبْرُدُ الْجَوُّ تَقْرِيبًا حَتَّى فِي اللَّيْلِ.",
    "exampleDE": "Während der sommerlichen Hitzewelle kühlt es auch nachts kaum ab."
  },
  {
    "front": "der Sonnenschein",
    "back": "ضَوْءُ الشَّمْس",
    "roman": "ḍawʾ ash-shams",
    "example": "ضَوْءُ الشَّمْسِ الدَّافِئُ يَجْذِبُ الْكَثِيرَ مِنَ النَّاسِ إِلَى الْمَسْبَحِ الْمَكْشُوفِ.",
    "exampleDE": "Warmer Sonnenschein lockt viele Menschen ins Freibad."
  },
  {
    "front": "das Abendrot",
    "back": "شَفَقٌ مَسَائِيّ",
    "roman": "shafaq masāʾiyy",
    "example": "شَفَقٌ مَسَائِيٌّ وَهَّاجٌ يُبَشِّرُ بِطَقْسٍ جَمِيلٍ لِلْيَوْمِ التَّالِي.",
    "exampleDE": "Ein feuriges Abendrot kündigt schönes Wetter für den nächsten Tag an."
  },
  {
    "front": "die Dämmerung",
    "back": "غَسَق",
    "roman": "ghasaq",
    "example": "عِنْدَ الْغَسَقِ تَبْدَأُ أَعْمِدَةُ إِنَارَةِ الشَّوَارِعِ بِالْإِضَاءَةِ.",
    "exampleDE": "In der Abenddämmerung beginnen die Straßenlaternen zu leuchten."
  },
  {
    "front": "die Mülltrennung",
    "back": "فَرْزُ الْقُمَامَة",
    "roman": "farz al-qumāma",
    "example": "فَرْزُ الْقُمَامَةِ بِعِنَايَةٍ يُسَهِّلُ إِعَادَةَ تَدْوِيرِ الْمَوَادِّ الْخَامِ الْقَيِّمَةِ.",
    "exampleDE": "Sorgfältige Mülltrennung erleichtert die Wiederverwertung wertvoller Rohstoffe."
  },
  {
    "front": "der Plastikmüll",
    "back": "نِفَايَاتٌ بِلَاسْتِيكِيَّة",
    "roman": "nifāyāt bilāstīkiyya",
    "example": "مِنْ خِلَالِ الْعُبُوَّاتِ مُتَعَدِّدَةِ الِاسْتِخْدَامِ يُمْكِنُ تَجَنُّبُ النِّفَايَاتِ الْبِلَاسْتِيكِيَّةِ غَيْرِ الضَّرُورِيَّةِ.",
    "exampleDE": "Durch Mehrwegverpackungen lässt sich unnötiger Plastikmüll vermeiden."
  },
  {
    "front": "das Recycling",
    "back": "إِعَادَةُ تَدْوِير",
    "roman": "iʿādat tadwīr",
    "example": "الْمُنْشَآتُ الْحَدِيثَةُ تُوَجِّهُ الزُّجَاجَ الْمُسْتَعْمَلَ وَالْوَرَقَ إِلَى إِعَادَةِ التَّدْوِيرِ.",
    "exampleDE": "Moderne Anlagen führen Altglas und Papier dem Recycling zu."
  },
  {
    "front": "der Umweltschutz",
    "back": "حِمَايَةُ الْبِيئَة",
    "roman": "ḥimāyat al-bīʾa",
    "example": "حِمَايَةُ الْمَوَاطِنِ الطَّبِيعِيَّةِ الْمُهَدَّدَةِ هِيَ وَاجِبٌ عَلَى كُلِّ النَّاسِ.",
    "exampleDE": "Der Schutz bedrohter Lebensräume ist eine Aufgabe für alle Menschen."
  },
  {
    "front": "die Nachhaltigkeit",
    "back": "اسْتِدَامَة",
    "roman": "istidāma",
    "example": "الِاسْتِدَامَةُ تَعْنِي الْحِفَاظَ عَلَى الْمَوَارِدِ لِلْأَجْيَالِ الْقَادِمَةِ.",
    "exampleDE": "Nachhaltigkeit bedeutet, Ressourcen für künftige Generationen zu bewahren."
  },
  {
    "front": "die Mehrwegflasche",
    "back": "قِنِّينَةٌ مُتَعَدِّدَةُ الِاسْتِعْمَال",
    "roman": "qinnīna mutaʿaddidat al-istiʿmāl",
    "example": "لِلْمَاءِ الْمَعْدِنِيِّ نُفَضِّلُ اسْتِخْدَامَ قَنَانٍ مُتَعَدِّدَةِ الِاسْتِعْمَالِ قَابِلَةٍ لِإِعَادَةِ التَّعْبِئَةِ.",
    "exampleDE": "Für Mineralwasser nutzen wir bevorzugt wiederbefüllbare Mehrwegflaschen."
  },
  {
    "front": "der Energiesparer",
    "back": "مُوَفِّرُ طَاقَة",
    "roman": "muwaffir ṭāqa",
    "example": "مَصَابِيحُ اللِّيد الْحَدِيثَةُ هِيَ مُوَفِّرَاتُ طَاقَةٍ حَقِيقِيَّةٌ فِي الْمَنْزِلِ.",
    "exampleDE": "Moderne LED-Lampen sind wahre Energiesparer im Haushalt."
  },
  {
    "front": "schonen",
    "back": "حَافَظَ عَلَى",
    "roman": "ḥāfaẓa ʿalā",
    "example": "يَجِبُ عَلَيْنَا أَنْ نُحَافِظَ عَلَى مَوَارِدِنَا الطَّبِيعِيَّةِ وَمُسَطَّحَاتِنَا الْمَائِيَّةِ.",
    "exampleDE": "Wir sollten unsere natürlichen Ressourcen und Gewässer schonen."
  },
  {
    "front": "die Solarenergie",
    "back": "طَاقَةٌ شَمْسِيَّة",
    "roman": "ṭāqa shamsiyya",
    "example": "الْمَنْظُومَةُ الشَّمْسِيَّةُ عَلَى السَّطْحِ تُوَلِّدُ كَهْرَبَاءَ صَدِيقَةً لِلْبِيئَةِ.",
    "exampleDE": "Die Solaranlage auf dem Dach erzeugt umweltfreundlichen Strom."
  },
  {
    "front": "die Windkraft",
    "back": "طَاقَةُ الرِّيَاح",
    "roman": "ṭāqat ar-riyāḥ",
    "example": "عَنَفَاتُ الرِّيَاحِ تَسْتَخْدِمُ قُوَّةَ الرِّيَاحِ لِتَوْلِيدِ الْكَهْرَبَاءِ.",
    "exampleDE": "Windkrafträder nutzen die Kraft des Windes zur Stromerzeugung."
  },
  {
    "front": "das Wasserkraftwerk",
    "back": "مَحَطَّةٌ كَهْرُومَائِيَّة",
    "roman": "maḥaṭṭa kahromāʾiyya",
    "example": "الْمَحَطَّةُ الْكَهْرُومَائِيَّةُ عَلَى النَّهْرِ تُنْتِجُ طَاقَةً نَظِيفَةً بِمَوْثُوقِيَّةٍ.",
    "exampleDE": "Das Wasserkraftwerk am Fluss produziert zuverlässig saubere Energie."
  },
  {
    "front": "der Stromverbrauch",
    "back": "اسْتِهْلَاكُ الْكَهْرَبَاء",
    "roman": "istihlāk al-kahrabāʾ",
    "example": "الْأَجْهِزَةُ فِي وَضْعِ الِاسْتِعْدَادِ تَرْفَعُ اسْتِهْلَاكَ الْكَهْرَبَاءِ بِلَا دَاعٍ.",
    "exampleDE": "Geräte im Standby-Modus erhöhen unnötig den Stromverbrauch."
  },
  {
    "front": "die Wärmepumpe",
    "back": "مِضَخَّةٌ حَرَارِيَّة",
    "roman": "miḍakhkha ḥarāriyya",
    "example": "الْمِضَخَّةُ الْحَرَارِيَّةُ الْحَدِيثَةُ تُدَفِّئُ الْمَنْزِلَ بِكِفَاءَةٍ عَالِيَةٍ.",
    "exampleDE": "Eine moderne Wärmepumpe heizt das Wohnhaus sehr effizient."
  },
  {
    "front": "der CO2-Ausstoß",
    "back": "انْبِعَاثَاتُ ثَانِي أُكْسِيدِ الْكَرْبُون",
    "roman": "inbiʿāthāt thānī uksīd al-karbūn",
    "example": "السَّيَّارَاتُ الْكَهْرَبَائِيَّةُ تُسَاهِمُ فِي خَفْضِ انْبِعَاثَاتِ ثَانِي أُكْسِيدِ الْكَرْبُونِ الْمَحَلِّيَّةِ.",
    "exampleDE": "Elektrofahrzeuge tragen zur Senkung des lokalen CO2-Ausstoßes bei."
  },
  {
    "front": "die Ressource",
    "back": "مَوْرِد",
    "roman": "mawrid",
    "example": "مِيَاهُ الشُّرْبِ النَّظِيفَةُ هِيَ أَثْمَنُ مَوْرِدٍ طَبِيعِيٍّ.",
    "exampleDE": "Sauberes Trinkwasser ist die kostbarste natürliche Ressource."
  },
  {
    "front": "der Stundenplan",
    "back": "جَدْوَلُ حِصَص",
    "roman": "jadwal ḥiṣaṣ",
    "example": "حَسَبَ جَدْوَلِ الْحِصَصِ، لَدَيْنَا حِصَّتَانِ مِنَ الرِّيَاضِيَّاتِ أَيَّامَ الِاثْنَيْنِ.",
    "exampleDE": "Laut Stundenplan haben wir montags zwei Stunden Mathematik."
  },
  {
    "front": "das Klassenzimmer",
    "back": "حُجْرَةُ دِرَاسَة",
    "roman": "ḥujrat dirāsa",
    "example": "زَيَّنَ التَّلَامِيذُ حُجْرَةَ دِرَاسَتِهِمْ بِصُوَرٍ مُلَوَّنَةٍ.",
    "exampleDE": "Die Schüler schmückten ihr Klassenzimmer mit bunten Bildern."
  },
  {
    "front": "die Schultasche",
    "back": "حَقِيبَةٌ مَدْرَسِيَّة",
    "roman": "ḥaqība madrasiyya",
    "example": "يَضَعُ دَفَاتِرَهُ وَكُتُبَهُ بِعِنَايَةٍ فِي الْحَقِيبَةِ الْمَدْرَسِيَّةِ.",
    "exampleDE": "Er packt seine Hefte und Bücher sorgfältig in die Schultasche."
  },
  {
    "front": "das Federmäppchen",
    "back": "مِقْلَمَة",
    "roman": "miqlama",
    "example": "فِي الْمِقْلَمَةِ تُوجَدُ أَقْلَامُ تَلْوِينٍ وَقَلَمُ حِبْرٍ وَمِمْحَاةٌ.",
    "exampleDE": "Im Federmäppchen liegen Buntstifte, Füller und ein Radiergummi."
  },
  {
    "front": "die Klassenarbeit",
    "back": "اخْتِبَارٌ مَدْرَسِيّ",
    "roman": "ikhtibār madrasiyy",
    "example": "لِلِاخْتِبَارِ الْمَدْرَسِيِّ الصَّعْبِ فِي مَادَّةِ الْأَحْيَاءِ ذَاكَرَتْ كَثِيرًا.",
    "exampleDE": "Für die schwere Klassenarbeit in Biologie hat sie viel gelernt."
  },
  {
    "front": "das Zeugnis",
    "back": "شَهَادَةٌ مَدْرَسِيَّة",
    "roman": "shahāda madrasiyya",
    "example": "فِي آخِرِ يَوْمٍ دِرَاسِيٍّ قَبْلَ الْعُطْلَةِ يَسْتَلِمُ الْجَمِيعُ شَهَادَاتِهِمُ الْمَدْرَسِيَّةَ.",
    "exampleDE": "Am letzten Schultag vor den Ferien erhalten alle ihr Zeugnis."
  },
  {
    "front": "die Schulferien",
    "back": "عُطْلَةٌ مَدْرَسِيَّة",
    "roman": "ʿuṭla madrasiyya",
    "example": "يَفْرَحُ الْأَطْفَالُ كَثِيرًا بِالْعُطْلَةِ الصَّيْفِيَّةِ الْمُمْتَدَّةِ لِسِتَّةِ أَسَابِيعَ.",
    "exampleDE": "Die Kinder freuen sich riesig auf die sechswöchigen Sommerferien."
  },
  {
    "front": "der Pausenhof",
    "back": "بَاحَةُ اسْتِرَاحَة",
    "roman": "bāḥat istirāḥa",
    "example": "فِي الِاسْتِرَاحَةِ الْكَبِيرَةِ يَلْعَبُ التَّلَامِيذُ فِي الْخَارِجِ فِي بَاحَةِ الِاسْتِرَاحَةِ.",
    "exampleDE": "In der großen Pause spielen die Schüler draußen auf dem Pausenhof."
  },
  {
    "front": "die Geometrie",
    "back": "هَنْدَسَة",
    "roman": "handasa",
    "example": "فِي دَرْسِ الْهَنْدَسَةِ نَرْسُمُ مُثَلَّثَاتٍ بِمُثَلَّثِ الرَّسْمِ.",
    "exampleDE": "Im Geometrieunterricht zeichnen wir Dreiecke mit dem Geodreieck."
  },
  {
    "front": "die Grammatik",
    "back": "قَوَاعِدُ لُغَة",
    "roman": "qawāʿid lugha",
    "example": "التَّدْرِيبُ الْمُنْتَظَمُ يُسَاعِدُ عَلَى اسْتِيعَابِ قَوَاعِدِ اللُّغَةِ.",
    "exampleDE": "Regelmäßiges Üben hilft, die Regeln der Grammatik zu verinnerlichen."
  },
  {
    "front": "der Fremdsprachenunterricht",
    "back": "دَرْسُ لُغَةٍ أَجْنَبِيَّة",
    "roman": "dars lugha ajnabiyya",
    "example": "فِي دَرْسِ اللُّغَةِ الْأَجْنَبِيَّةِ نَتَدَرَّبُ عَلَى التَّحَدُّثِ الطَّلِيقِ فِي حِوَارَاتٍ.",
    "exampleDE": "Im Fremdsprachenunterricht üben wir das freie Sprechen in Dialogen."
  },
  {
    "front": "das Experiment",
    "back": "تَجْرِبَة",
    "roman": "tajriba",
    "example": "فِي مُخْتَبَرِ الْكِيمْيَاءِ يُجْرِي الصَّفُّ تَجْرِبَةً مُثِيرَةً.",
    "exampleDE": "Im Chemielabor führt die Klasse ein spannendes Experiment durch."
  },
  {
    "front": "das Referat",
    "back": "عَرْضٌ تَقْدِيمِيّ",
    "roman": "ʿarḍ taqdīmiyy",
    "example": "يُلْقِي عَرْضًا تَقْدِيمِيًّا طَلِيقًا عَنْ حِمَايَةِ الْحِيتَانِ الْمُهَدَّدَةِ.",
    "exampleDE": "Er hält ein freies Referat über den Schutz bedrohter Wale."
  },
  {
    "front": "die Hausaufgabe",
    "back": "وَاجِبٌ مَنْزِلِيّ",
    "roman": "wājib manziliyy",
    "example": "بَعْدَ الْغَدَاءِ تَقُومُ بِإِنْجَازِ وَاجِبَاتِهَا الْمَنْزِلِيَّةِ بِتَرْكِيزٍ.",
    "exampleDE": "Nach dem Mittagessen erledigt sie konzentriert ihre Hausaufgaben."
  },
  {
    "front": "die Nachhilfe",
    "back": "دُرُوسُ تَقْوِيَة",
    "roman": "durūs taqwiya",
    "example": "يَأْخُذُ دُرُوسَ تَقْوِيَةٍ مَرَّتَيْنِ أُسْبُوعِيًّا لِتَحْسِينِ دَرَجَاتِهِ.",
    "exampleDE": "Zweimal wöchentlich nimmt er Nachhilfe, um seine Noten zu verbessern."
  },
  {
    "front": "der Hörsaal",
    "back": "قَاعَةُ مُحَاضَرَات",
    "roman": "qāʿat muḥāḍarāt",
    "example": "قَاعَةُ الْمُحَاضَرَاتِ الْكَبِيرَةُ مُمْتَلِئَةٌ عَنْ آخِرِهَا.",
    "exampleDE": "Der große Hörsaal ist bis auf den letzten Platz besetzt."
  },
  {
    "front": "die Vorlesung",
    "back": "مُحَاضَرَة",
    "roman": "muḥāḍara",
    "example": "تُلْقِي الْأُسْتَاذَةُ مُحَاضَرَةً شَيِّقَةً عَنِ الْفِيزْيَاءِ الْحَدِيثَةِ.",
    "exampleDE": "Die Professorin hält eine fesselnde Vorlesung über moderne Physik."
  },
  {
    "front": "das Seminar",
    "back": "حَلْقَةٌ دِرَاسِيَّة",
    "roman": "ḥalqa dirāsiyya",
    "example": "فِي الْحَلْقَةِ الدِّرَاسِيَّةِ يُنَاقِشُ الطُّلَّابُ نُصُوصًا عِلْمِيَّةً حَدِيثَةً.",
    "exampleDE": "Im Seminar diskutieren die Studierenden aktuelle wissenschaftliche Texte."
  },
  {
    "front": "die Universitätsbibliothek",
    "back": "مَكْتَبَةٌ جَامِعِيَّة",
    "roman": "maktaba jāmiʿiyya",
    "example": "فِي الْمَكْتَبَةِ الْجَامِعِيَّةِ يَسُودُ هُدُوءٌ مُرَكَّزٌ لِلدِّرَاسَةِ.",
    "exampleDE": "In der Universitätsbibliothek herrscht konzentrierte Stille zum Lernen."
  },
  {
    "front": "das Semester",
    "back": "فَصْلٌ دِرَاسِيّ",
    "roman": "faṣl dirāsiyy",
    "example": "يَبْدَأُ الْفَصْلُ الدِّرَاسِيُّ الشَّتَوِيُّ فِي مُعْظَمِ الْجَامِعَاتِ فِي شَهْرِ أُكْتُوبَرَ.",
    "exampleDE": "Das Wintersemester beginnt an den meisten Hochschulen im Oktober."
  },
  {
    "front": "die Bachelorarbeit",
    "back": "أُطْرُوحَةُ بَكَالُورْيُوس",
    "roman": "uṭrūḥat bakalūryūs",
    "example": "تَعْكِفُ حَالِيًّا بِكَثَافَةٍ عَلَى كِتَابَةِ أُطْرُوحَةِ الْبَكَالُورْيُوسِ الْخَاصَّةِ بِهَا.",
    "exampleDE": "Sie schreibt zurzeit intensiv an ihrer Abschlussarbeit im Bachelor."
  },
  {
    "front": "das Stipendium",
    "back": "مِنْحَةٌ دِرَاسِيَّة",
    "roman": "minḥa dirāsiyya",
    "example": "بِفَضْلِ مِنْحَةٍ دِرَاسِيَّةٍ لِلْمَوْهُوبِينَ يُمْكِنُهُ التَّرْكِيزُ كُلِّيًّا عَلَى الدِّرَاسَةِ.",
    "exampleDE": "Dank eines Begabtenstipendiums kann er sich voll auf das Studium konzentrieren."
  },
  {
    "front": "der Campus",
    "back": "حَرَمٌ جَامِعِيّ",
    "roman": "ḥaram jāmiʿiyy",
    "example": "فِي الْحَرَمِ الْجَامِعِيِّ الْأَخْضَرِ يَلْتَقِي الطُّلَّابُ بَيْنَ الْمُحَاضَرَاتِ.",
    "exampleDE": "Auf dem grünen Campus treffen sich Studierende zwischen den Kursen."
  },
  {
    "front": "die Stellenausschreibung",
    "back": "إِعْلَانُ وَظِيفَة",
    "roman": "iʿlān waẓīfa",
    "example": "فِي الْجَرِيدَةِ وَجَدَ إِعْلَانَ وَظِيفَةٍ مُثِيرًا لِلِاهْتِمَامِ.",
    "exampleDE": "In der Zeitung fand er eine interessante Stellenausschreibung."
  },
  {
    "front": "das Anschreiben",
    "back": "خِطَابُ تَقْدِيم",
    "roman": "khiṭāb taqdīm",
    "example": "خِطَابُ التَّقْدِيمِ الْمُعَبِّرُ يُثِيرُ اهْتِمَامَ صَاحِبِ الْعَمَلِ.",
    "exampleDE": "Ein aussagekräftiges Anschreiben weckt das Interesse des Arbeitgebers."
  },
  {
    "front": "der Lebenslauf",
    "back": "سِيرَةٌ ذَاتِيَّة",
    "roman": "sīra dhātiyya",
    "example": "السِّيرَةُ الذَّاتِيَّةُ فِي شَكْلِ جَدْوَلٍ تَسْرُدُ جَمِيعَ الْمَحَطَّاتِ الْمِهْنِيَّةِ السَّابِقَةِ.",
    "exampleDE": "Der tabellarische Lebenslauf listet alle bisherigen Berufsstationen auf."
  },
  {
    "front": "das Vorstellungsgespräch",
    "back": "مُقَابَلَةُ عَمَل",
    "roman": "muqābalat ʿamal",
    "example": "لِمُقَابَلَةِ الْعَمَلِ يَرْتَدِي مَلَابِسَ مِهْنِيَّةً وَمُرَتَّبَةً.",
    "exampleDE": "Zum Vorstellungsgespräch kleidet er sich professionell und ordentlich."
  },
  {
    "front": "die Berufserfahrung",
    "back": "خِبْرَةٌ مِهْنِيَّة",
    "roman": "khibra mihniyya",
    "example": "لِهَذَا الْمَنْصِبِ الْمَسْؤُولِ تُعَدُّ الْخِبْرَةُ الْمِهْنِيَّةُ لِعِدَّةِ سَنَوَاتٍ ضَرُورِيَّةً.",
    "exampleDE": "Für diese verantwortungsvolle Position ist mehrjährige Berufserfahrung erforderlich."
  },
  {
    "front": "die Qualifikation",
    "back": "مُؤَهِّل",
    "roman": "muʾahhil",
    "example": "مُؤَهِّلَاتُهَا الْمِهْنِيَّةُ تُنَاسِبُ تَمَامًا الْمَلَفَّ الْمَطْلُوبَ.",
    "exampleDE": "Ihre fachliche Qualifikation passt genau zum geforderten Profil."
  },
  {
    "front": "das Zeugnis",
    "back": "شَهَادَةُ خِبْرَة",
    "roman": "shahādat khibra",
    "example": "شَهَادَةُ الْخِبْرَةِ الْإِيجَابِيَّةُ تُسَهِّلُ الِانْتِقَالَ الْمِهْنِيَّ.",
    "exampleDE": "Ein positives Arbeitszeugnis erleichtert den beruflichen Wechsel."
  },
  {
    "front": "der Arbeitsvertrag",
    "back": "عَقْدُ عَمَل",
    "roman": "ʿaqd ʿamal",
    "example": "بَعْدَ مُفَاوَضَاتٍ نَاجِحَةٍ وَقَّعَتْ عَلَى عَقْدِ الْعَمَلِ.",
    "exampleDE": "Nach erfolgreichen Verhandlungen unterschrieb sie den Arbeitsvertrag."
  },
  {
    "front": "die Probezeit",
    "back": "فَتْرَةُ تَجْرِبَة",
    "roman": "fatrat tajriba",
    "example": "خِلَالَ فَتْرَةِ التَّجْرِبَةِ الْمُمْتَدَّةِ لِسِتَّةِ أَشْهُرٍ يَتَعَرَّفُ الطَّرَفَانِ عَلَى بَعْضِهِمَا.",
    "exampleDE": "Während der sechsmonatigen Probezeit lernen sich beide Seiten kennen."
  },
  {
    "front": "das Gehalt",
    "back": "رَاتِب",
    "roman": "rātib",
    "example": "يُحَوَّلُ الرَّاتِبُ الْعَادِلُ فِي نِهَايَةِ كُلِّ شَهْرٍ فِي الْمَوْعِدِ الْمُحَدَّدِ.",
    "exampleDE": "Ein faires Gehalt wird jeweils zum Monatsende pünktlich überwiesen."
  },
  {
    "front": "die Gleitzeit",
    "back": "دَوَامٌ مَرِن",
    "roman": "dawām marin",
    "example": "بِفَضْلِ الدَّوَامِ الْمَرِنِ يُمْكِنُهُ تَنْظِيمُ أَوْقَاتِ عَمَلِهِ بِشَكْلٍ جَيِّدٍ.",
    "exampleDE": "Dank flexibler Gleitzeit kann er seine Arbeitszeiten gut einteilen."
  },
  {
    "front": "der Feierabend",
    "back": "نِهَايَةُ يَوْمِ الْعَمَل",
    "roman": "nihāyat yawm al-ʿamal",
    "example": "بَعْدَ ثَمَانِي سَاعَاتٍ مِنَ الْعَمَلِ الْمُرَكَّزِ يَسْتَمْتِعُ بِنِهَايَةِ يَوْمِ الْعَمَلِ.",
    "exampleDE": "Nach acht Stunden konzentrierter Arbeit genießt er den Feierabend."
  },
  {
    "front": "der Urlaubstag",
    "back": "يَوْمُ إِجَازَة",
    "roman": "yawm ijāza",
    "example": "الْمُوَظَّفُونَ بِدَوَامٍ كَامِلٍ لَهُمُ الْحَقُّ فِي ثَلَاثِينَ يَوْمَ إِجَازَةٍ مَدْفُوعَةِ الْأَجْرِ.",
    "exampleDE": "Vollzeitbeschäftigte haben Anspruch auf dreißig bezahlte Urlaubstage."
  },
  {
    "front": "die Überstunden",
    "back": "سَاعَاتٌ إِضَافِيَّة",
    "roman": "sāʿāt iḍāfiyya",
    "example": "السَّاعَاتُ الْإِضَافِيَّةُ الْمُنْجَزَةُ يُمْكِنُ تَعْوِيضُهَا بِأَوْقَاتِ فَرَاغٍ.",
    "exampleDE": "Geleistete Überstunden können durch Freizeit ausgeglichen werden."
  },
  {
    "front": "die Kaffeepause",
    "back": "اسْتِرَاحَةُ قَهْوَة",
    "roman": "istirāḥat qahwa",
    "example": "فِي اسْتِرَاحَةِ الْقَهْوَةِ يَتَبَادَلُ الزُّمَلَاءُ الْحَدِيثَ عَنْ عُطْلَةِ نِهَايَةِ الْأُسْبُوعِ.",
    "exampleDE": "In der Kaffeepause tauschen sich die Kollegen über das Wochenende aus."
  },
  {
    "front": "die Besprechung",
    "back": "اجْتِمَاع",
    "roman": "ijtimāʿ",
    "example": "فِي السَّاعَةِ الْعَاشِرَةِ يُعْقَدُ الِاجْتِمَاعُ الْأُسْبُوعِيُّ فِي قَاعَةِ الْمُؤْتَمَرَاتِ.",
    "exampleDE": "Um zehn Uhr findet die wöchentliche Besprechung im Konferenzraum statt."
  },
  {
    "front": "die Tagesordnung",
    "back": "جَدْوَلُ أَعْمَال",
    "roman": "jadwal aʿmāl",
    "example": "بُعِثَتْ بُنُودُ جَدْوَلِ الْأَعْمَالِ مُسْبَقًا عَبْرَ الْبَرِيدِ الْإِلِكْتُرُونِيِّ.",
    "exampleDE": "Die Punkte der Tagesordnung wurden vorab per E-Mail verschickt."
  },
  {
    "front": "das Protokoll",
    "back": "مَحْضَرُ اجْتِمَاع",
    "roman": "maḥḍar ijtimāʿ",
    "example": "يَكْتُبُ مَحْضَرَ الِاجْتِمَاعِ وَيُدَوِّنُ جَمِيعَ الْقَرَارَاتِ الْمُتَّخَذَةِ.",
    "exampleDE": "Er schreibt das Protokoll und hält alle getroffenen Beschlüsse fest."
  },
  {
    "front": "die Präsentation",
    "back": "عَرْضٌ تَوْضِيحِيّ",
    "roman": "ʿarḍ tawḍīḥiyy",
    "example": "يُوَضِّحُ الْعَرْضُ التَّوْضِيحِيُّ النَّتَائِجَ بِرُسُومٍ بَيَانِيَّةٍ مُنَظَّمَةٍ.",
    "exampleDE": "Die Präsentation veranschaulicht die Ergebnisse mit übersichtlichen Grafiken."
  },
  {
    "front": "die Frist",
    "back": "مُهْلَة",
    "roman": "muhla",
    "example": "يَجِبُ عَلَيْنَا حَتْمًا الِالْتِزَامُ بِالْمُهْلَةِ الْمُتَّفَقِ عَلَيْهَا حَتَّى نِهَايَةِ الشَّهْرِ.",
    "exampleDE": "Wir müssen die vereinbarte Frist bis Ende des Monats unbedingt einhalten."
  },
  {
    "front": "die Teamarbeit",
    "back": "عَمَلٌ جَمَاعِيّ",
    "roman": "ʿamal jamāʿiyy",
    "example": "الْعَمَلُ الْجَمَاعِيُّ النَّاجِحُ يَتَطَلَّبُ تَبَادُلًا صَرِيحًا وَدَعْمًا مُتَبَادَلًا.",
    "exampleDE": "Erfolgreiche Teamarbeit erfordert offenen Austausch und gegenseitige Unterstützung."
  },
  {
    "front": "die Zusammenarbeit",
    "back": "تَعَاوُن",
    "roman": "taʿāwun",
    "example": "التَّعَاوُنُ بَيْنَ الْأَقْسَامِ يَسِيرُ بِسَلَاسَةٍ.",
    "exampleDE": "Die Zusammenarbeit zwischen den Abteilungen klappt reibungslos."
  },
  {
    "front": "der Aktenordner",
    "back": "مِلَفُّ حِفْظِ أَوْرَاق",
    "roman": "milaff ḥifẓ awrāq",
    "example": "تُحْفَظُ الْعُقُودُ الْمُهِمَّةُ زَمَنِيًّا فِي مِلَفِّ حِفْظِ الْأَوْرَاقِ.",
    "exampleDE": "Wichtige Verträge werden chronologisch im Aktenordner abgeheftet."
  },
  {
    "front": "der Locher",
    "back": "خَرَّامَةُ وَرَق",
    "roman": "kharrāmat waraq",
    "example": "بِخَرَّامَةِ الْوَرَقِ يَثْقُبُ ثَقْبَيْنِ نَظِيفَيْنِ فِي الْوَثِيقَةِ.",
    "exampleDE": "Mit dem Locher stanzt er zwei saubere Löcher in das Dokument."
  },
  {
    "front": "das Heftgerät",
    "back": "دَبَّاسَة",
    "roman": "dabbāsa",
    "example": "بِالدَّبَّاسَةِ تُدَبِّسُ الصَّفَحَاتِ الْمُتَرَابِطَةَ مَعًا.",
    "exampleDE": "Mit dem Heftgerät heftet sie die zusammengehörigen Seiten fest."
  },
  {
    "front": "die Büroklammer",
    "back": "مِشْبَكُ وَرَق",
    "roman": "mishbak waraq",
    "example": "مِشْبَكُ وَرَقٍ مُلَوَّنٌ يَمْسِكُ الْإِيصَالَاتِ مَعًا بِشَكْلٍ غَيْرِ مُحْكَمٍ.",
    "exampleDE": "Eine bunte Büroklammer hält die Quittungen lose zusammen."
  }
]
