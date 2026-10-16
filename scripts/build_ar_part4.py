# -*- coding: utf-8 -*-
import json

part4_cards = [
  {
    "front": "der Wanderweg",
    "back": "مَسَارُ مَشْي",
    "roman": "masār mashy",
    "example": "مَسَارُ الْمَشْيِ الْمُمَيَّزُ بِعَلَامَاتٍ يَقُودُ عَبْرَ غَابَاتٍ ظَلِيلَةٍ إِلَى الْجَبَلِ.",
    "exampleDE": "Der markierte Wanderweg führt durch schattige Wälder auf den Berg."
  },
  {
    "front": "das Bürgeramt",
    "back": "مَكْتَبُ خِدْمَةِ الْمُوَاطِنِين",
    "roman": "maktab khidmat al-muwāṭinīn",
    "example": "يَتَقَدَّمُ الْمَرْءُ بِطَلَبِ هُوِيَّةٍ جَدِيدَةٍ شَخْصِيًّا فِي مَكْتَبِ خِدْمَةِ الْمُوَاطِنِينَ.",
    "exampleDE": "Einen neuen Ausweis beantragt man persönlich im Bürgeramt."
  },
  {
    "front": "der Personalausweis",
    "back": "بِطَاقَةُ هُوِيَّة",
    "roman": "biṭāqat huwiyya",
    "example": "بِطَاقَةُ الْهُوِيَّةِ صَالِحَةٌ لِمُدَّةِ عَشْرِ سَنَوَاتٍ فِي الدَّاخِلِ.",
    "exampleDE": "Der Personalausweis ist zehn Jahre lang im Inland gültig."
  },
  {
    "front": "die Geburtsurkunde",
    "back": "شَهَادَةُ مِيلَاد",
    "roman": "shahādat mīlād",
    "example": "لِلْعَدِيدِ مِنَ الطَّلَبَاتِ الرَّسْمِيَّةِ يَحْتَاجُ الْمَرْءُ إِلَى شَهَادَةِ مِيلَادٍ رَسْمِيَّةٍ.",
    "exampleDE": "Für viele behördliche Anträge benötigt man eine offizielle Geburtsurkunde."
  },
  {
    "front": "die Meldebestätigung",
    "back": "تَأْكِيدُ تَسْجِيلِ السَّكَن",
    "roman": "taʾkīd tasjīl as-sakan",
    "example": "بَعْدَ الِانْتِقَالِ يَحْصُلُ الْمَرْءُ عَلَى تَأْكِيدِ تَسْجِيلِ السَّكَنِ مِنْ مَكْتَبِ سِجِلِّ السُّكَّانِ.",
    "exampleDE": "Nach dem Umzug erhält man beim Einwohnermeldeamt die Meldebestätigung."
  },
  {
    "front": "das Formular",
    "back": "اسْتِمَارَة",
    "roman": "istimāra",
    "example": "اِمْلَأِ الِاسْتِمَارَةَ الرَّسْمِيَّةَ بِحُرُوفٍ كَبِيرَةٍ وَاضِحَةٍ مِنْ فَضْلِكَ.",
    "exampleDE": "Füllen Sie das behördliche Formular bitte in Druckbuchstaben aus."
  },
  {
    "front": "die Unterschrift",
    "back": "تَوْقِيع",
    "roman": "tawqīʿ",
    "example": "ضَعْ تَوْقِيعَكَ الشَّخْصِيَّ فِي الْأَسْفَلِ عَلَى السَّطْرِ.",
    "exampleDE": "Setzen Sie Ihre eigenhändige Unterschrift unten auf die Linie."
  },
  {
    "front": "der Stempel",
    "back": "خَتْم",
    "roman": "khatm",
    "example": "خَتْمٌ رَسْمِيٌّ يُؤَكِّدُ صِحَّةَ الْخِطَابِ.",
    "exampleDE": "Ein offizieller Stempel bestätigt die Echtheit des Schreibens."
  },
  {
    "front": "die Beglaubigung",
    "back": "تَصْدِيقٌ رَسْمِيّ",
    "roman": "taṣdīq rasmiyy",
    "example": "الشَّهَادَاتُ الْمُقَدَّمَةُ لِلْجَامِعَةِ تَتَطَلَّبُ غَالِبًا تَصْدِيقًا رَسْمِيًّا.",
    "exampleDE": "Zeugnisse für die Universität erfordern oft eine amtliche Beglaubigung."
  },
  {
    "front": "die Vorschrift",
    "back": "لَائِحَة",
    "roman": "lāʾiḥa",
    "example": "يَجِبُ عَلَى جَمِيعِ الْمُوَظَّفِينَ اتِّبَاعُ لَوَائِحِ السَّلَامَةِ السَّارِيَةِ بِصَرَامَةٍ.",
    "exampleDE": "Alle Mitarbeiter müssen die geltenden Sicherheitsvorschriften strikt befolgen."
  },
  {
    "front": "die Erlaubnis",
    "back": "إِذْن",
    "roman": "idhn",
    "example": "بِدُونِ إِذْنٍ كِتَابِيٍّ مِنَ السُّلْطَاتِ لَا يُسْمَحُ بِالْبِنَاءِ هُنَا.",
    "exampleDE": "Ohne schriftliche Erlaubnis der Behörde darf hier nicht gebaut werden."
  },
  {
    "front": "das Verbot",
    "back": "حَظْر",
    "roman": "ḥaẓr",
    "example": "فِي الْمَبْنَى بِأَكْمَلِهِ يُطَبَّقُ حَظْرُ تَدْخِينٍ دُونَ اسْتِثْنَاءٍ.",
    "exampleDE": "Im gesamten Gebäude gilt ein ausnahmsloses Rauchverbot."
  },
  {
    "front": "die Strafe",
    "back": "غَرَامَة",
    "roman": "gharāma",
    "example": "مَنْ يُوقِفُ سَيَّارَتَهُ فِي مَكَانٍ مَمْنُوعٍ عَلَيْهِ أَنْ يَتَوَقَّعَ غَرَامَةً مَالِيَّةً كَبِيرَةً.",
    "exampleDE": "Falschparker müssen mit einer empfindlichen Geldstrafe rechnen."
  },
  {
    "front": "das Fundbüro",
    "back": "مَكْتَبُ الْمَفْقُودَات",
    "roman": "maktab al-mafqūdāt",
    "example": "الْمَفَاتِيحُ الْمَفْقُودَةُ يُسَلِّمُهَا الْمُلْتَقِطُونَ الْأُمَنَاءُ غَالِبًا فِي مَكْتَبِ الْمَفْقُودَاتِ.",
    "exampleDE": "Verlorene Schlüssel werden oft von ehrlichen Findern im Fundbüro abgegeben."
  },
  {
    "front": "die Polizeiwache",
    "back": "قِسْمُ شُرْطَة",
    "roman": "qism shurṭa",
    "example": "قَدَّمَ بَلَاغًا ضِدَّ مَجْهُولٍ فِي قِسْمِ الشُّرْطَةِ الْمَحَلِّيِّ.",
    "exampleDE": "Er erstattete auf der örtlichen Polizeiwache Anzeige gegen Unbekannt."
  },
  {
    "front": "der Zeuge",
    "back": "شَاهِد",
    "roman": "shāhid",
    "example": "اسْتَجْوَبَتِ الشُّرْطَةُ عِدَّةَ شُهُودٍ حَوْلَ مُجْرَيَاتِ الْحَادِثِ.",
    "exampleDE": "Die Polizei befragte mehrere Zeugen zum Hergang des Unfalls."
  },
  {
    "front": "die Wahl",
    "back": "انْتِخَابَات",
    "roman": "intikhābāt",
    "example": "كُلَّ أَرْبَعِ سَنَوَاتٍ تُجْرَى الِانْتِخَابَاتُ الدِّيمُقْرَاطِيَّةُ لِلْبَرْلَمَانِ.",
    "exampleDE": "Alle vier Jahre findet die demokratische Wahl zum Parlament statt."
  },
  {
    "front": "der Stimmzettel",
    "back": "وَرَقَةُ اقْتِرَاع",
    "roman": "waraqat iqtirāʿ",
    "example": "ضَعْ إِشَارَةَ الصَّلِيبِ سِرًّا عَلَى وَرَقَةِ الِاقْتِرَاعِ مِنْ فَضْلِكَ.",
    "exampleDE": "Setzen Sie Ihr Kreuz bitte verdeckt auf dem Stimmzettel."
  },
  {
    "front": "die Wahlurne",
    "back": "صُنْدُوقُ اقْتِرَاع",
    "roman": "ṣundūq iqtirāʿ",
    "example": "تُوضَعُ وَرَقَةُ الِاقْتِرَاعِ الْمَطْوِيَّةُ فِي صُنْدُوقِ الِاقْتِرَاعِ الْمَخْتُومِ.",
    "exampleDE": "Der gefaltete Stimmzettel wird in die versiegelte Wahlurne geworfen."
  },
  {
    "front": "das Grundgesetz",
    "back": "دُسْتُور",
    "roman": "dustūr",
    "example": "يَضْمَنُ الدُّسْتُورُ حُقُوقَ الْإِنْسَانِ الَّتِي لَا تَقْبَلُ الْمَسَاسَ لِجَمِيعِ الْمُوَاطِنِينَ.",
    "exampleDE": "Das Grundgesetz garantiert die unverletzlichen Menschenrechte aller Bürger."
  },
  {
    "front": "die Meinungsfreiheit",
    "back": "حُرِّيَّةُ الرَّأْي",
    "roman": "ḥurriyyat ar-raʾy",
    "example": "حُرِّيَّةُ التَّعْبِيرِ عَنِ الرَّأْيِ هِيَ رَكِيزَةٌ أَسَاسِيَّةٌ لِلدِّيمُقْرَاطِيَّةِ.",
    "exampleDE": "Die freie Meinungsäußerung ist ein tragender Pfeiler der Demokratie."
  },
  {
    "front": "die Bürgerbeteiligung",
    "back": "مُشَارَكَةٌ مَدَنِيَّة",
    "roman": "mushāraka madaniyya",
    "example": "مِنْ خِلَالِ الْمُشَارَكَةِ الْمَدَنِيَّةِ يُمْكِنُ لِلسُّكَّانِ الْمُسَاهَمَةُ بِنَشَاطٍ فِي تَطْوِيرِ مَدِينَتِهِمْ.",
    "exampleDE": "Durch Bürgerbeteiligung können Einwohner ihre Stadt aktiv mitgestalten."
  },
  {
    "front": "die Gleichberechtigung",
    "back": "مُسَاوَاة",
    "roman": "musāwāh",
    "example": "الْمُسَاوَاةُ بَيْنَ جَمِيعِ الْأَجْنَاسِ رَاسِخَةٌ بِحُكْمِ الْقَانُونِ.",
    "exampleDE": "Gleichberechtigung aller Geschlechter ist gesetzlich fest verankert."
  },
  {
    "front": "das Ehrenamt",
    "back": "عَمَلٌ تَطَوُّعِيّ",
    "roman": "ʿamal taṭawwuʿiyy",
    "example": "الْكَثِيرُ مِنَ النَّاسِ يَنْشَطُونَ فِي أَوْقَاتِ فَرَاغِهِمْ فِي عَمَلٍ تَطَوُّعِيٍّ.",
    "exampleDE": "Viele Menschen engagieren sich in ihrer Freizeit in einem Ehrenamt."
  },
  {
    "front": "das Silvester",
    "back": "لَيْلَةُ رَأْسِ السَّنَة",
    "roman": "laylat raʾs as-sana",
    "example": "فِي لَيْلَةِ رَأْسِ السَّنَةِ نَتَبَادَلُ التَّهَانِيَ عِنْدَ مُنْتَصَفِ اللَّيْلِ بِمُنَاسَبَةِ الْعَامِ الْجَدِيدِ.",
    "exampleDE": "An Silvester stoßen wir um Mitternacht auf das neue Jahr an."
  },
  {
    "front": "das Feuerwerk",
    "back": "أَلْعَابٌ نَارِيَّة",
    "roman": "alʿāb nāriyya",
    "example": "أَلْعَابٌ نَارِيَّةٌ زَاهِيَةُ الْأَلْوَانِ تُضِيءُ السَّمَاءَ اللَّيْلِيَّةَ.",
    "exampleDE": "Ein farbenfrohes Feuerwerk erhellt den nächtlichen Himmel."
  },
  {
    "front": "das Neujahr",
    "back": "رَأْسُ السَّنَةِ الْجَدِيدَة",
    "roman": "raʾs as-sana al-jadīda",
    "example": "فِي يَوْمِ رَأْسِ السَّنَةِ الْجَدِيدَةِ يَتَمَنَّى الْجِيرَانُ وَالْأَصْدِقَاءُ لِبَعْضِهِمْ حَظًّا سَعِيدًا.",
    "exampleDE": "Am Neujahrstag wünschen sich Nachbarn und Freunde viel Glück."
  },
  {
    "front": "die Weihnachtstage",
    "back": "أَيَّامُ عِيدِ الْمِيلَاد",
    "roman": "ayyām ʿīd al-mīlād",
    "example": "تَقْضِي الْعَائِلَةُ أَيَّامَ عِيدِ الْمِيلَادِ مَعًا فِي الْمَنْزِلِ كَالْعَادَةِ.",
    "exampleDE": "Die Weihnachtstage verbringt die Familie traditionell gemeinsam zu Hause."
  },
  {
    "front": "der Heiligabend",
    "back": "لَيْلَةُ عِيدِ الْمِيلَاد",
    "roman": "laylat ʿīd al-mīlād",
    "example": "فِي لَيْلَةِ عِيدِ الْمِيلَادِ تُفْتَحُ الْهَدَايَا تَحْتَ الشَّجَرَةِ الْمُزَيَّنَةِ.",
    "exampleDE": "An Heiligabend werden unter dem geschmückten Baum Geschenke ausgepackt."
  },
  {
    "front": "das Geschenkpapier",
    "back": "وَرَقُ تَغْلِيفِ الْهَدَايَا",
    "roman": "waraq taghlīf al-hadāyā",
    "example": "وَرَقُ تَغْلِيفِ الْهَدَايَا الْمُلَوَّنُ وَالشَّرَائِطُ يُزَيِّنَانِ الطُّرُودَ الصَّغِيرَةَ.",
    "exampleDE": "Buntes Geschenkpapier und Schleifen zieren die Päckchen."
  },
  {
    "front": "die Glückwunschkarte",
    "back": "بِطَاقَةُ تَهْنِئَة",
    "roman": "biṭāqat tahniʾa",
    "example": "كَتَبَتْ بَعْضَ السُّطُورِ الشَّخْصِيَّةِ عَلَى بِطَاقَةِ التَّهْنِئَةِ.",
    "exampleDE": "Auf die Glückwunschkarte schrieb sie ein paar persönliche Zeilen."
  },
  {
    "front": "die Geburtstagstorte",
    "back": "كَعْكَةُ عِيدِ مِيلَاد",
    "roman": "kaʿkat ʿīd mīlād",
    "example": "عَلَى كَعْكَةِ عِيدِ الْمِيلَادِ تَشْتَعِلُ شُمُوعٌ مُلَوَّنَةٌ لِإِطْفَائِهَا بِالنَّفْخِ.",
    "exampleDE": "Auf der Geburtstagstorte brennen bunte Kerzen zum Auspusten."
  },
  {
    "front": "die Überraschungsparty",
    "back": "حَفْلَةُ مُفَاجَأَة",
    "roman": "ḥaflat mufājaʾa",
    "example": "نَظَّمَ الْأَصْدِقَاءُ لَهُ سِرًّا حَفْلَةَ مُفَاجَأَةٍ رَائِعَةً.",
    "exampleDE": "Freunde organisierten heimlich eine tolle Überraschungsparty für ihn."
  },
  {
    "front": "der Luftballon",
    "back": "بَالُون",
    "roman": "bālūn",
    "example": "بَالُونَاتٌ مُلَوَّنَةٌ تُزَيِّنُ قَاعَةَ الِاحْتِفَالَاتِ لِحَفْلَةِ الْأَطْفَالِ.",
    "exampleDE": "Bunte Luftballons schmücken den Festsaal für die Kinderparty."
  },
  {
    "front": "die Einladungskarte",
    "back": "بِطَاقَةُ دَعْوَة",
    "roman": "biṭāqat daʿwa",
    "example": "قَبْلَ أُسْبُوعَيْنِ مِنَ الِاحْتِفَالِ أَرْسَلَ بِطَاقَاتِ الدَّعْوَةِ.",
    "exampleDE": "Zwei Wochen vor dem Fest verschickte er die Einladungskarten."
  },
  {
    "front": "anstoßen",
    "back": "تَنَاخَبَ",
    "roman": "tanākhaba",
    "example": "نَتَنَاخَبُ بِمَشْرُوبٍ بَارِدٍ نَخْبَ صَاحِبِ عِيدِ الْمِيلَادِ.",
    "exampleDE": "Wir stoßen mit einem kühlen Getränk auf das Wohl des Geburtstagskindes an."
  },
  {
    "front": "der Ehrengast",
    "back": "ضَيْفُ شَرَف",
    "roman": "ḍayf sharaf",
    "example": "رُحِّبَ بِرَئِيسِ الْبَلَدِيَّةِ بِحَرَارَةٍ كَضَيْفِ شَرَفٍ.",
    "exampleDE": "Der Bürgermeister wurde als Ehrengast herzlich begrüßt."
  },
  {
    "front": "die Festrede",
    "back": "خِطَابٌ احْتِفَالِيّ",
    "roman": "khiṭāb iḥtifāliyy",
    "example": "فِي خِطَابِهِ الِاحْتِفَالِيِّ اسْتَعْرَضَ رَئِيسُ الْجَمْعِيَّةِ النَّجَاحَاتِ.",
    "exampleDE": "In seiner Festrede blickte der Vereinsvorsitzende auf Erfolge zurück."
  },
  {
    "front": "gratulieren",
    "back": "هَنَّأَ",
    "roman": "hannaʾa",
    "example": "جَمِيعُ الزُّمَلَاءِ يُهَنِّئُونَهُ بِحَرَارَةٍ بِمُنَاسَبَةِ الْيُوبِيلِ.",
    "exampleDE": "Alle Kollegen gratulieren ihm herzlich zum runden Jubiläum."
  },
  {
    "front": "die Gegenwart",
    "back": "حَاضِر",
    "roman": "ḥāḍir",
    "example": "رَكِّزْ عَلَى الْمَهَامِّ فِي الْحَاضِرِ.",
    "exampleDE": "Konzentriere dich auf die Aufgaben in der Gegenwart."
  },
  {
    "front": "die Vergangenheit",
    "back": "مَاضٍ",
    "roman": "māḍin",
    "example": "مِنْ أَخْطَاءِ الْمَاضِي يُمْكِنُ لِلْمَرْءِ أَنْ يَتَعَلَّمَ الْكَثِيرَ لِلْمُسْتَقْبَلِ.",
    "exampleDE": "Aus den Fehlern der Vergangenheit kann man viel für die Zukunft lernen."
  },
  {
    "front": "die Zukunft",
    "back": "مُسْتَقْبَل",
    "roman": "mustaqbal",
    "example": "بِثِقَةٍ وَاجْتِهَادٍ تَنْظُرُ الْعَائِلَةُ الشَّابَّةُ إِلَى الْمُسْتَقْبَلِ.",
    "exampleDE": "Mit Zuversicht und Fleiß blickt die junge Familie in die Zukunft."
  },
  {
    "front": "die Zeitspanne",
    "back": "مُدَّةٌ زَمَنِيَّة",
    "roman": "mudda zamaniyya",
    "example": "فِي الْمُدَّةِ الزَّمَنِيَّةِ الْقَصِيرَةِ الْمُكَوَّنَةِ مِنْ بِضْعَةِ أَيَّامٍ تَغَيَّرَ كُلُّ شَيْءٍ.",
    "exampleDE": "In der kurzen Zeitspanne von wenigen Tagen änderte sich alles."
  },
  {
    "front": "der Zeitraum",
    "back": "فَتْرَةٌ زَمَنِيَّة",
    "roman": "fatra zamaniyya",
    "example": "عَلَى مَدَى فَتْرَةٍ زَمَنِيَّةٍ أَطْوَلَ، ظَهَرَ تَحَسُّنٌ وَاضِحٌ.",
    "exampleDE": "Über einen längeren Zeitraum hinweg zeigte sich eine deutliche Besserung."
  },
  {
    "front": "der Augenblick",
    "back": "لَحْظَة",
    "roman": "laḥẓa",
    "example": "لِلَحْظَةٍ قَصِيرَةٍ حَبَسَ الْجَمِيعُ فِي الْغُرْفَةِ أَنْفَاسَهُمْ.",
    "exampleDE": "Für einen kurzen Augenblick hielten alle im Raum den Atem an."
  },
  {
    "front": "die Ewigkeit",
    "back": "أَبَدِيَّة",
    "roman": "abadiyya",
    "example": "بَدَا لَهُ الِانْتِظَارُ عَلَى رَصِيفِ الْقِطَارِ الْمُتَأَخِّرِ كَأَنَّهُ أَبَدِيَّةٌ.",
    "exampleDE": "Das Warten am verspäteten Bahnsteig kam ihm wie eine Ewigkeit vor."
  },
  {
    "front": "gelegentlich",
    "back": "أَحْيَانًا",
    "roman": "aḥyānan",
    "example": "أَحْيَانًا يُدَلِّلُ نَفْسَهُ بِقِطْعَةِ شُوكُولَاتَةٍ دَاكِنَةٍ بَعْدَ الطَّعَامِ.",
    "exampleDE": "Gelegentlich gönnt er sich nach dem Essen ein Stück dunkle Schokolade."
  },
  {
    "front": "regelmäßig",
    "back": "بَانْتِظَام",
    "roman": "bi-ntiẓām",
    "example": "مَنْ يُرَاجِعُ الْمُفْرَدَاتِ بِانْتِظَامٍ يُحَقِّقُ نَجَاحَاتٍ سَرِيعَةً فِي التَّعَلُّمِ.",
    "exampleDE": "Wer regelmäßig Vokabeln wiederholt, erzielt schnelle Lernerfolge."
  },
  {
    "front": "stetig",
    "back": "بِاسْتِمْرَار",
    "roman": "bi-stmrār",
    "example": "تَحَسَّنَ فَهْمُهَا لِلُّغَةِ بِاسْتِمْرَارٍ فِي الْأَشْهُرِ الْأَخِيرَةِ.",
    "exampleDE": "Ihr Sprachverständnis verbesserte sich in den letzten Monaten stetig."
  },
  {
    "front": "ununterbrochen",
    "back": "دُونَ انْقِطَاع",
    "roman": "dūna nqiṭāʿ",
    "example": "مُنْذُ الصَّبَاحِ الْبَاكِرِ يَهْطِلُ الْمَطَرُ فِي الْخَارِجِ دُونَ انْقِطَاعٍ.",
    "exampleDE": "Seit dem frühen Morgen regnet es draußen ununterbrochen."
  },
  {
    "front": "inzwischen",
    "back": "فِي غُضُونِ ذَلِك",
    "roman": "fī ghuḍūni dhālik",
    "example": "فِي غُضُونِ ذَلِكَ صَارَتْ تَتَحَدَّثُ بِطَلَاقَةٍ وَدُونَ تَفْكِيرٍ طَوِيلٍ.",
    "exampleDE": "Inzwischen spricht sie fließend und ohne langes Nachdenken."
  },
  {
    "front": "demnächst",
    "back": "قَرِيبًا",
    "roman": "qarīban",
    "example": "سَتَصْدُرُ النُّسْخَةُ الْجَدِيدَةُ مِنْ تَطْبِيقِ التَّعَلُّمِ قَرِيبًا فِي الْمَتْجَرِ.",
    "exampleDE": "Die neue Version der Lern-App erscheint demnächst im Store."
  },
  {
    "front": "seinerzeit",
    "back": "فِي ذَلِكَ الْوَقْت",
    "roman": "fī dhālika l-waqt",
    "example": "فِي ذَلِكَ الْوَقْتِ بَنَى الْحِرَفِيُّونَ مَبْنَى الْبَلَدِيَّةِ بِدُونِ آلَاتٍ حَدِيثَةٍ.",
    "exampleDE": "Seinerzeit bauten die Handwerker das Rathaus ohne moderne Maschinen."
  },
  {
    "front": "bisher",
    "back": "حَتَّى الْآن",
    "roman": "ḥattā l-ān",
    "example": "حَتَّى الْآنِ سَارَتْ جَمِيعُ الِاخْتِبَارَاتِ وَالِامْتِحَانَاتِ دُونَ أَيِّ خَطَأٍ تَمَامًا.",
    "exampleDE": "Bisher sind alle Tests und Prüfungen absolut fehlerfrei verlaufen."
  },
  {
    "front": "die Umgebung",
    "back": "مُحِيط",
    "roman": "muḥīṭ",
    "example": "فِي الْمُحِيطِ الْقَرِيبِ مِنَ الْفُنْدُقِ تُوجَدُ مَسَارَاتُ مَشْيٍ رَائِعَةٌ.",
    "exampleDE": "In der näheren Umgebung des Hotels gibt es herrliche Wanderwege."
  },
  {
    "front": "die Entfernung",
    "back": "مَسَافَة",
    "roman": "masāfa",
    "example": "تَبْلُغُ الْمَسَافَةُ بَيْنَ الْمَدِينَتَيْنِ حَوَالَيْ خَمْسِينَ كِيلُومِتْرًا.",
    "exampleDE": "Die Entfernung zwischen den beiden Städten beträgt rund fünfzig Kilometer."
  },
  {
    "front": "die Zwischenzeit",
    "back": "الْوَقْتُ الْفَاصِل",
    "roman": "al-waqt al-fāṣil",
    "example": "فِي الْوَقْتِ الْفَاصِلِ يُمْكِنُنَا أَنْ نُجَهِّزَ الطَّاوِلَةَ لِلطَّعَامِ.",
    "exampleDE": "In der Zwischenzeit können wir schon den Tisch für das Essen decken."
  },
  {
    "front": "gegenüber",
    "back": "مُقَابِل",
    "roman": "muqābil",
    "example": "تَقَعُ الصَّيْدَلِيَّةُ مُبَاشَرَةً مُقَابِلَ الْمَدْخَلِ الرَّئِيسِيِّ لِلْمَحَطَّةِ.",
    "exampleDE": "Die Apotheke liegt direkt gegenüber dem Haupteingang des Bahnhofs."
  },
  {
    "front": "nebenan",
    "back": "مُجَاوِر",
    "roman": "mujāwir",
    "example": "فِي الشَّقَّةِ الْمُجَاوِرَةِ تَسْكُنُ عَائِلَةٌ لَطِيفَةٌ جِدًّا.",
    "exampleDE": "In der Wohnung nebenan wohnt eine sehr freundliche Familie."
  },
  {
    "front": "mittendrin",
    "back": "فِي الْوَسَط",
    "roman": "fī l-wasaṭ",
    "example": "فِي وَسَطِ الْمَدِينَةِ الْقَدِيمَةِ تَقِفُ أَقْدَمُ نَافُورَةٍ فِي الْبَلْدَةِ.",
    "exampleDE": "Mitten in der Altstadt steht der älteste Brunnen des Ortes."
  },
  {
    "front": "außerhalb",
    "back": "خَارِج",
    "roman": "khārij",
    "example": "تَقَعُ الْمِنْطَقَةُ التِّجَارِيَّةُ خَارِجَ النِّطَاقِ الْعُمْرَانِيِّ قَلِيلًا.",
    "exampleDE": "Das Gewerbegebiet liegt etwas außerhalb der geschlossenen Ortschaft."
  },
  {
    "front": "einerseits",
    "back": "مِنْ نَاحِيَة",
    "roman": "min nāḥiya",
    "example": "مِنْ نَاحِيَةٍ يُرِيدُ السَّفَرَ، وَمِنْ نَاحِيَةٍ أُخْرَى يَدَّخِرُ لِشِرَاءِ سَيَّارَةٍ.",
    "exampleDE": "Einerseits möchte er verreisen, andererseits spart er auf ein Auto."
  },
  {
    "front": "andererseits",
    "back": "مِنْ نَاحِيَةٍ أُخْرَى",
    "roman": "min nāḥiyatin ukhrā",
    "example": "مِنْ نَاحِيَةٍ أُخْرَى يُوَفِّرُ الْمَنْصِبُ الْجَدِيدُ فُرَصَ تَرَقٍّ أَفْضَلَ بِكَثِيرٍ.",
    "exampleDE": "Andererseits bietet die neue Stelle wesentlich bessere Aufstiegschancen."
  },
  {
    "front": "infolgedessen",
    "back": "نَتِيجَةً لِذَلِك",
    "roman": "natījatan li-dhālik",
    "example": "كَانَتِ الشَّوَارِعُ مُتَجَمِّدَةً، وَنَتِيجَةً لِذَلِكَ حَدَثَتِ اخْتِنَاقَاتٌ مُرُورِيَّةٌ.",
    "exampleDE": "Die Straßen waren vereist, infolgedessen kam es zu Staus."
  },
  {
    "front": "dennoch",
    "back": "رَغْمَ ذَلِك",
    "roman": "raghma dhālik",
    "example": "كَانَ الْمَطَرُ يَهْطِلُ بِغَزَارَةٍ، وَرَغْمَ ذَلِكَ قُمْنَا بِنُزْهَةٍ طَوِيلَةٍ فِي الْغَابَةِ.",
    "exampleDE": "Es regnete in Strömen, dennoch machten wir einen langen Waldspaziergang."
  },
  {
    "front": "nichtsdestotrotz",
    "back": "مَعَ ذَلِك",
    "roman": "maʿa dhālik",
    "example": "كَانَ مُتْعَبًا جِدًّا، وَمَعَ ذَلِكَ أَنْهَى الْفَصْلَ بِعِنَايَةٍ.",
    "exampleDE": "Er war sehr müde, nichtsdestotrotz beendete er das Kapitel sorgfältig."
  },
  {
    "front": "außerdem",
    "back": "بِالْإِضَافَةِ إِلَى ذَلِك",
    "roman": "bi-l-iḍāfati ilā dhālik",
    "example": "كَانَ الطَّعَامُ لَذِيذًا لِلْغَايَةِ وَكَانَتِ الْخِدْمَةُ بِالْإِضَافَةِ إِلَى ذَلِكَ لَطِيفَةً جِدًّا.",
    "exampleDE": "Das Essen schmeckte hervorragend und die Bedienung war außerdem sehr nett."
  },
  {
    "front": "aus diesem Grund",
    "back": "لِهَذَا السَّبَب",
    "roman": "li-hādhā s-sabab",
    "example": "ذَاكَرَتْ بِاجْتِهَادٍ، وَلِهَذَا السَّبَبِ اجْتَازَتِ الِامْتِحَانَ بِسُهُولَةٍ.",
    "exampleDE": "Sie hatte fleißig gelernt und bestand aus diesem Grund die Prüfung spielend."
  },
  {
    "front": "nämlich",
    "back": "إِذْ",
    "roman": "idh",
    "example": "سَأَبْقَى الْيَوْمَ فِي الْمَنْزِلِ، إِذْ لَدَيَّ صُدَاعٌ شَدِيدٌ.",
    "exampleDE": "Ich bleibe heute daheim, ich habe nämlich starke Kopfschmerzen."
  },
  {
    "front": "stattdessen",
    "back": "عِوَضًا عَنْ ذَلِك",
    "roman": "ʿiwaḍan ʿan dhālik",
    "example": "لَمْ نَسْتَقِلَّ السَّيَّارَةَ، بَلْ ذَهَبْنَا عِوَضًا عَنْ ذَلِكَ سَيْرًا عَلَى الْأَقْدَامِ.",
    "exampleDE": "Wir fuhren nicht mit dem Auto, sondern gingen stattdessen zu Fuß."
  },
  {
    "front": "vorausgesetzt",
    "back": "شَرِيطَةَ أَن",
    "roman": "sharīṭata an",
    "example": "سَنَقُومُ بِرِحْلَةِ سَيْرٍ غَدًا، شَرِيطَةَ أَنْ يَبْقَى الطَّقْسُ جَافًّا.",
    "exampleDE": "Wir wandern morgen, vorausgesetzt das Wetter bleibt trocken."
  },
  {
    "front": "währenddessen",
    "back": "فِي هَذِهِ الْأَثْنَاء",
    "roman": "fī hādhihi l-athnāʾ",
    "example": "قَلَى الْخُضْرَاوَاتِ، وَفِي هَذِهِ الْأَثْنَاءِ رَتَّبَتْ هِيَ الطَّاوِلَةَ بِمَحَبَّةٍ.",
    "exampleDE": "Er briet das Gemüse, währenddessen deckte sie liebevoll den Tisch."
  },
  {
    "front": "sowohl ... als auch",
    "back": "كِلَا ... وَ",
    "roman": "kilā ... wa",
    "example": "هِيَ تَتَحَدَّثُ كِلَا الْإِسْبَانِيَّةَ بِطَلَاقَةٍ وَالْإِنْجِلِيزِيَّةَ بِمُسْتَوًى مُمْتَازٍ.",
    "exampleDE": "Sie spricht sowohl fließend Spanisch als auch verhandlungssicheres Englisch."
  },
  {
    "front": "weder ... noch",
    "back": "لَا ... وَلَا",
    "roman": "lā ... wa-lā",
    "example": "هُوَ لَا يَشْرَبُ الْقَهْوَةَ وَلَا الشَّايَ الْأَسْوَدَ فِي الصَّبَاحِ.",
    "exampleDE": "Er trinkt weder Kaffee noch schwarzen Tee am Morgen."
  },
  {
    "front": "je ... desto",
    "back": "كُلَّمَا ... كُلَّمَا",
    "roman": "kullamā ... kullamā",
    "example": "كُلَّمَا تَدَرَّبَ الْمَرْءُ أَكْثَرَ، كَانَ التَّحَدُّثُ الطَّلِيقُ أَسْهَلَ.",
    "exampleDE": "Je mehr man übt, desto leichter fällt das freie Sprechen."
  }
]
