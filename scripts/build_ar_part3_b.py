# -*- coding: utf-8 -*-
import json

part3_cards_b = [
  {
    "front": "der Textmarker",
    "back": "قَلَمُ تَمْيِيز",
    "roman": "qalam tamyīz",
    "example": "يُبْرِزُ النُّصُوصَ الْمُهِمَّةَ بِقَلَمِ تَمْيِيزٍ أَصْفَرَ.",
    "exampleDE": "Wichtige Textstellen hebt er mit einem gelben Textmarker hervor."
  },
  {
    "front": "der Notizblock",
    "back": "دَفْتَرُ مُلَاحَظَات",
    "roman": "daftar mulāḥaẓāt",
    "example": "بِجَانِبِ الْهَاتِفِ يُوجَدُ دَائِمًا دَفْتَرُ مُلَاحَظَاتٍ صَغِيرٌ لِتَدْوِينِ الْمُلَاحَظَاتِ.",
    "exampleDE": "Neben dem Telefon liegt immer ein kleiner Notizblock für Notizen."
  },
  {
    "front": "der Reißwolf",
    "back": "فَرَّامَةُ وَرَق",
    "roman": "farrāmat waraq",
    "example": "تُفْرَمُ الْأَوْرَاقُ السِّرِّيَّةُ فِي فَرَّامَةِ الْوَرَقِ قَبْلَ التَّخَلُّصِ مِنْهَا.",
    "exampleDE": "Vertrauliche Papiere werden vor dem Entsorgen im Reißwolf zerkleinert."
  },
  {
    "front": "der Drehstuhl",
    "back": "كُرْسِيٌّ دَوَّار",
    "roman": "kursiyy dawwār",
    "example": "كُرْسِيٌّ دَوَّارٌ مُرِيحٌ يُسَاعِدُ عَلَى جُلُوسٍ صِحِّيٍّ فِي مَكَانِ الْعَمَلِ.",
    "exampleDE": "Ein ergonomischer Drehstuhl unterstützt gesundes Sitzen am Arbeitsplatz."
  },
  {
    "front": "der Bildschirm",
    "back": "شَاشَة",
    "roman": "shāsha",
    "example": "تُعْرَضُ النُّصُوصُ بِوُضُوحٍ تَامٍّ عَلَى الشَّاشَةِ عَالِيَةِ الدِّقَّةِ.",
    "exampleDE": "Der hochauflösende Bildschirm zeigt Schriften gestochen scharf an."
  },
  {
    "front": "die Tastatur",
    "back": "لَوْحَةُ مَفَاتِيح",
    "roman": "lawḥat mafātīḥ",
    "example": "يَكْتُبُ بِسَلَاسَةٍ وَدُونَ أَخْطَاءٍ بِعَشَرَةِ أَصَابِعَ عَلَى لَوْحَةِ الْمَفَاتِيحِ.",
    "exampleDE": "Er tippt flüssig und fehlerfrei mit zehn Fingern auf der Tastatur."
  },
  {
    "front": "die Computermaus",
    "back": "فَأْرَةُ حَاسُوب",
    "roman": "faʾrat ḥāsūb",
    "example": "بِنَقْرَةٍ عَلَى فَأْرَةِ الْحَاسُوبِ يَخْتَارُ عُنْصُرَ الْقَائِمَةِ.",
    "exampleDE": "Mit einem Klick auf die Computermaus wählt er den Menüpunkt aus."
  },
  {
    "front": "der Drucker",
    "back": "طَابِعَة",
    "roman": "ṭābiʿa",
    "example": "تَطْبَعُ طَابِعَةُ الشَّبَكَةِ عَلَى الْوَجْهَيْنِ بِسُرْعَةٍ عَالِيَةٍ.",
    "exampleDE": "Der Netzwerkdrucker druckt doppelseitig in hoher Geschwindigkeit."
  },
  {
    "front": "das Ladekabel",
    "back": "كَابِلُ شَحْن",
    "roman": "kābil shaḥn",
    "example": "لَا تَنْسَ حَزْمَ كَابِلِ الشَّحْنِ لِلْحَاسُوبِ الْمَحْمُولِ.",
    "exampleDE": "Vergiss nicht, das Ladekabel für das Notebook einzupacken."
  },
  {
    "front": "der USB-Stick",
    "back": "ذَاكِرَةُ فِلَاش",
    "roman": "dhākirat filāsh",
    "example": "تَحْفَظُ النُّسْخَةَ الِاحْتِيَاطِيَّةَ فِي ذَاكِرَةِ فِلَاشٍ عَمَلِيَّةٍ.",
    "exampleDE": "Sie speichert die Sicherungskopie auf einem handlichen USB-Stick."
  },
  {
    "front": "die Festplatte",
    "back": "قُرْصٌ صُلْب",
    "roman": "qurṣ ṣulb",
    "example": "يُوَفِّرُ الْقُرْصُ الصُّلْبُ الْخَارِجِيُّ مِسَاحَةَ تَخْزِينٍ وَاسِعَةً لِلصُّوَرِ.",
    "exampleDE": "Die externe Festplatte bietet reichlich Speicherplatz für Fotos."
  },
  {
    "front": "der Webbrowser",
    "back": "مُتَصَفِّحُ وِيب",
    "roman": "mutaṣaffiḥ wēb",
    "example": "يُرْجَى فَتْحُ مَوْقِعِ الْوِيبِ فِي مُتَصَفِّحِ وِيبٍ حَدِيثٍ.",
    "exampleDE": "Öffnen Sie die Webseite bitte in einem aktuellen Webbrowser."
  },
  {
    "front": "das Benutzerkonto",
    "back": "حِسَابُ مُسْتَخْدِم",
    "roman": "ḥisāb mustakhdim",
    "example": "سَجِّلِ الدُّخُولَ بِحِسَابِ الْمُسْتَخْدِمِ الشَّخْصِيِّ الْخَاصِّ بِكَ.",
    "exampleDE": "Melden Sie sich mit Ihrem persönlichen Benutzerkonto an."
  },
  {
    "front": "das sichere Passwort",
    "back": "كَلِمَةُ مُرُورٍ آمِنَة",
    "roman": "kalimat murūr āmina",
    "example": "كَلِمَةُ الْمُرُورِ الْآمِنَةُ تَحْتَوِي عَلَى حُرُوفٍ وَأَرْقَامٍ وَرُمُوزٍ خَاصَّةٍ.",
    "exampleDE": "Ein sicheres Passwort enthält Buchstaben, Ziffern und Sonderzeichen."
  },
  {
    "front": "die Suchmaschine",
    "back": "مُحَرِّكُ بَحْث",
    "roman": "muḥarrik baḥth",
    "example": "أَدْخِلْ كَلِمَاتِ الْبَحْثِ فِي مُحَرِّكِ الْبَحْثِ.",
    "exampleDE": "Geben Sie die Suchbegriffe in die Suchmaschine ein."
  },
  {
    "front": "die E-Mail-Adresse",
    "back": "عُنْوَانُ بَرِيدٍ إِلِكْتُرُونِيّ",
    "roman": "ʿunwān barīd iliktrūniyy",
    "example": "يُرْجَى إِدْخَالُ عُنْوَانِ بَرِيدِكَ الْإِلِكْتُرُونِيِّ الصَّالِحِ فِي الِاسْتِمَارَةِ.",
    "exampleDE": "Bitte tragen Sie Ihre gültige E-Mail-Adresse in das Formular ein."
  },
  {
    "front": "der Anhang",
    "back": "مُرْفَق",
    "roman": "murfaq",
    "example": "فِي مُرْفَقِ الرِّسَالَةِ تَجِدُونَ الْوَثِيقَةَ بِصِيغَةِ PDF.",
    "exampleDE": "Im Anhang der Nachricht finden Sie das Dokument im PDF-Format."
  },
  {
    "front": "die Datensicherung",
    "back": "نَسْخٌ احْتِيَاطِيٌّ لِلْبَيَانَات",
    "roman": "naskh iḥtiyāṭiyy li-l-bayānāt",
    "example": "النَّسْخُ الِاحْتِيَاطِيُّ التِّلْقَائِيُّ لِلْبَيَانَاتِ يَحْمِي مِنْ فِقْدَانِ الْبَيَانَاتِ الْمُفَاجِئِ.",
    "exampleDE": "Eine automatische Datensicherung schützt vor überraschendem Datenverlust."
  },
  {
    "front": "das Update",
    "back": "تَحْدِيث",
    "roman": "taḥdīth",
    "example": "قُمْ بِتَثْبِيتِ تَحْدِيثَاتِ الْبَرَامِجِ الْمُنْتَظَمَةِ لِسَدِّ الثَّغَرَاتِ الْأَمْنِيَّةِ.",
    "exampleDE": "Installieren Sie regelmäßige Software-Updates zur Schließung von Sicherheitslücken."
  },
  {
    "front": "der Touchscreen",
    "back": "شَاشَةُ لَمْس",
    "roman": "shāshat lams",
    "example": "شَاشَةُ اللَّمْسِ الْحَسَّاسَةُ تَسْتَجِيبُ فَوْرًا لِلَمْسَاتِ الْأَصَابِعِ.",
    "exampleDE": "Der berührungsempfindliche Touchscreen reagiert sofort auf Fingertippen."
  },
  {
    "front": "die Sprachnachricht",
    "back": "رِسَالَةٌ صَوْتِيَّة",
    "roman": "risāla ṣawtiyya",
    "example": "بَدَلًا مِنَ الْكِتَابَةِ الطَّوِيلَةِ، أَرْسَلَ لَهَا رِسَالَةً صَوْتِيَّةً قَصِيرَةً.",
    "exampleDE": "Statt lange zu tippen, schickte er ihr eine kurze Sprachnachricht."
  },
  {
    "front": "die Benachrichtigung",
    "back": "إِشْعَار",
    "roman": "ishʿār",
    "example": "عَلَى شَاشَةِ الْقَفْلِ ظَهَرَ إِشْعَارٌ جَدِيدٌ.",
    "exampleDE": "Auf dem Sperrbildschirm erschien eine neue Benachrichtigung."
  },
  {
    "front": "der Flugmodus",
    "back": "وَضْعُ الطَّيَرَان",
    "roman": "waḍʿ aṭ-ṭayarān",
    "example": "أَثْنَاءَ الرِّحْلَةِ الْجَوِّيَّةِ يَجِبُ تَبْدِيلُ جَمِيعِ الْهَوَاتِفِ إِلَى وَضْعِ الطَّيَرَانِ.",
    "exampleDE": "Während des Fluges müssen alle Telefone in den Flugmodus geschaltet werden."
  },
  {
    "front": "die Akkukapazität",
    "back": "سَعَةُ الْبَطَّارِيَّة",
    "roman": "saʿat al-baṭṭāriyya",
    "example": "بَعْدَ الِاسْتِعْمَالِ الْمُكَثَّفِ انْخَفَضَتْ سَعَةُ الْبَطَّارِيَّةِ إِلَى عِشْرِينَ فِي الْمِائَةِ.",
    "exampleDE": "Nach intensivem Gebrauch sank die Akkukapazität auf zwanzig Prozent."
  },
  {
    "front": "das WLAN-Netzwerk",
    "back": "شَبَكَةُ وَايْ فَاي",
    "roman": "shabakat wāy fāy",
    "example": "فِي الْفُنْدُقِ نَتَّصِلُ بِشَبَكَةِ الْوَايْ فَاي الْمَجَّانِيَّةِ.",
    "exampleDE": "Im Hotel verbinden wir uns mit dem kostenlosen WLAN-Netzwerk."
  },
  {
    "front": "die Internetverbindung",
    "back": "اتِّصَالٌ بِالْإِنْتَرْنِت",
    "roman": "ittiṣāl bi-l-intarnit",
    "example": "الِاتِّصَالُ الْمُسْتَقِرُّ بِالْإِنْتَرْنِت مُهِمٌّ لِمُكَالَمَاتِ الْفِيدْيُو السَّلِسَةِ.",
    "exampleDE": "Eine stabile Internetverbindung ist wichtig für flüssige Videoanrufe."
  },
  {
    "front": "das Wochenende",
    "back": "عُطْلَةُ نِهَايَةِ الْأُسْبُوع",
    "roman": "ʿuṭlat nihāyat al-usbūʿ",
    "example": "فِي عُطْلَةِ نِهَايَةِ الْأُسْبُوعِ أُحِبُّ النَّوْمَ كَثِيرًا وَتَنَاوُلَ الْإِفْطَارِ بِهُدُوءٍ.",
    "exampleDE": "Am Wochenende schlafe ich gerne lange aus und frühstücke in Ruhe."
  },
  {
    "front": "der Feiertag",
    "back": "عُطْلَةٌ رَسْمِيَّة",
    "roman": "ʿuṭla rasmiyya",
    "example": "فِي الْعُطْلَاتِ الرَّسْمِيَّةِ تَبْقَى مُعْظَمُ الْمَحَلَّاتِ مُغْلَقَةً.",
    "exampleDE": "An gesetzlichen Feiertagen bleiben die meisten Geschäfte geschlossen."
  },
  {
    "front": "der Ausflug",
    "back": "نُزْهَة",
    "roman": "nuzha",
    "example": "يَوْمَ السَّبْتِ قَامَتِ الْعَائِلَةُ بِنُزْهَةٍ إِلَى حَدِيقَةِ الْحَيَوَانِ.",
    "exampleDE": "Am Samstag unternahm die Familie einen Ausflug in den Tierpark."
  },
  {
    "front": "das Picknick",
    "back": "رِحْلَةُ اسْتِجْمَام",
    "roman": "riḥlat istijmām",
    "example": "فَرَشْنَا بِسَاطًا وَأَقَمْنَا نُزْهَةً فِي الظِّلِّ.",
    "exampleDE": "Wir breiteten eine Decke aus und machten ein Picknick im Schatten."
  },
  {
    "front": "die Hängematte",
    "back": "أُرْجُوحَةٌ شَبَكِيَّة",
    "roman": "urjūḥa shabakiyya",
    "example": "بَيْنَ شَجَرَتَيْنِ ظَلِيلَتَيْنِ شَدَّ أُرْجُوحَةً شَبَكِيَّةً مُرِيحَةً.",
    "exampleDE": "Zwischen zwei schattigen Bäumen spannte er eine bequeme Hängematte auf."
  },
  {
    "front": "das Gesellschaftsspiel",
    "back": "لُعْبَةٌ جَمَاعِيَّة",
    "roman": "luʿba jamāʿiyya",
    "example": "مَسَاءً نُحِبُّ لَعِبَ لُعْبَةٍ جَمَاعِيَّةٍ مُثِيرَةٍ عَلَى الطَّاوِلَةِ.",
    "exampleDE": "Abends spielen wir gerne ein spannendes Gesellschaftsspiel am Tisch."
  },
  {
    "front": "das Kartenspiel",
    "back": "لُعْبَةُ وَرَق",
    "roman": "luʿbat waraq",
    "example": "أَرْبَعَتُهُمْ لَعِبُوا جَوْلَةً مُسَلِّيَةً مِنْ لُعْبَةِ الْوَرَقِ.",
    "exampleDE": "Zu viert spielten sie eine unterhaltsame Runde Skat."
  },
  {
    "front": "das Kreuzworträtsel",
    "back": "كَلِمَاتٌ مُتَقَاطِعَة",
    "roman": "kalimāt mutaqāṭiʿa",
    "example": "أَثْنَاءَ قَهْوَةِ يَوْمِ الْأَحَدِ يَحُلُّ جَدِّي الْكَلِمَاتِ الْمُتَقَاطِعَةَ.",
    "exampleDE": "Beim sonntäglichen Kaffee löst mein Großvater das Kreuzworträtsel."
  },
  {
    "front": "die Fotografie",
    "back": "تَصْوِيرٌ فُوتُوغْرَافِيّ",
    "roman": "taṣwīr fūtūghrāfiyy",
    "example": "التَّصْوِيرُ الْفُوتُوغْرَافِيُّ لِلطَّبِيعَةِ هُوَ هِوَايَتُهُ الشَّغُوفَةُ مُنْذُ سَنَوَاتٍ عَدِيدَةٍ.",
    "exampleDE": "Die Naturfotografie ist seit vielen Jahren sein leidenschaftliches Hobby."
  },
  {
    "front": "das Gärtnern",
    "back": "عِنَايَةٌ بِالْحَدِيقَة",
    "roman": "ʿināya bi-l-ḥadīqa",
    "example": "الْعِنَايَةُ بِحَدِيقَةِ الْخُضْرَاوَاتِ الْخَاصَّةِ تَبْعَثُ عَلَى الِاسْتِرْخَاءِ بَعْدَ أُسْبُوعٍ شَاقٍّ.",
    "exampleDE": "Das Gärtnern im eigenen Gemüsegarten entspannt nach einer anstrengenden Woche."
  },
  {
    "front": "das Stricken",
    "back": "حِيَاكَة",
    "roman": "ḥiyāka",
    "example": "تَحِيكُ مِنْ صُوفٍ دَافِئٍ جَوَارِبَ مُلَوَّنَةً لِأَحْفَادِهَا.",
    "exampleDE": "Sie strickt aus warmer Wolle bunte Socken für ihre Enkelkinder."
  },
  {
    "front": "das Häkeln",
    "back": "حِيَاكَةُ كْرُوشِيه",
    "roman": "ḥiyākat krūshēh",
    "example": "بِإِبْرَةِ كْرُوشِيه دَقِيقَةٍ تَحِيكُ مَفَارِشَ نَاعِمَةً.",
    "exampleDE": "Mit einer feinen Häkelnadel häkelt sie zarte Deckchen."
  },
  {
    "front": "die Nähmaschine",
    "back": "آلَةُ خِيَاطَة",
    "roman": "ālat khiyāṭa",
    "example": "بِآلَةِ الْخِيَاطَةِ الْكَهْرَبَائِيَّةِ تَخِيطُ أَغْطِيَةَ وِسَادَاتٍ جَدِيدَةً.",
    "exampleDE": "Mit der elektrischen Nähmaschine näht sie neue Kissenbezüge."
  },
  {
    "front": "das Heimwerken",
    "back": "أَعْمَالُ صِيَانَةٍ مَنْزِلِيَّة",
    "roman": "aʿmāl ṣiyāna manziliyya",
    "example": "يَوْمَ السَّبْتِ يُكَرِّسُ نَفْسَهُ كُلِّيًّا لِأَعْمَالِ الصِّيَانَةِ الْمَنْزِلِيَّةِ فِي الْقَبْوِ.",
    "exampleDE": "Am Samstag widmet er sich voll und ganz dem Heimwerken im Keller."
  },
  {
    "front": "das Basteln",
    "back": "أَعْمَالٌ يَدَوِيَّة",
    "roman": "aʿmāl yadawiyya",
    "example": "قَبْلَ عِيدِ الْمِيلَادِ يَصْنَعُ الْأَطْفَالُ زِينَةً احْتِفَالِيَّةً مِنَ الْوَرَقِ.",
    "exampleDE": "Vor Weihnachten basteln die Kinder festlichen Schmuck aus Papier."
  },
  {
    "front": "der Bestseller",
    "back": "كِتَابٌ أَعْلَى مَبِيعًا",
    "roman": "kitāb aʿlā mabīʿan",
    "example": "الرِّوَايَةُ الْبُولِيسِيَّةُ الْمُثِيرَةُ وَصَلَتْ فَوْرًا إِلَى قَائِمَةِ الْكُتُبِ الْأَعْلَى مَبِيعًا.",
    "exampleDE": "Der spannende Kriminalroman schaffte es sofort auf die Bestsellerliste."
  },
  {
    "front": "das Taschenbuch",
    "back": "كِتَابُ جَيْب",
    "roman": "kitāb jayb",
    "example": "لِلْعُطْلَةِ تَضَعُ كِتَابَيْ جَيْبٍ خَفِيفَيْنِ فِي الْحَقِيبَةِ.",
    "exampleDE": "Für den Urlaub packt sie zwei leichte Taschenbücher in den Koffer."
  },
  {
    "front": "das Lesezeichen",
    "back": "فَاصِلُ كِتَاب",
    "roman": "fāṣil kitāb",
    "example": "فَاصِلُ كِتَابٍ جَمِيلٌ يُحَدِّدُ آخِرَ صَفْحَةٍ مَقْرُوءَةٍ.",
    "exampleDE": "Ein schönes Lesezeichen markiert die zuletzt gelesene Seite."
  },
  {
    "front": "die Buchhandlung",
    "back": "مَكْتَبَةُ بَيْعِ كُتُب",
    "roman": "maktabat bayʿ kutub",
    "example": "فِي مَكْتَبَةِ بَيْعِ الْكُتُبِ الصَّغِيرَةِ عَلَى الزَّاوِيَةِ يَتَصَفَّحُ لِسَاعَاتٍ.",
    "exampleDE": "In der kleinen Buchhandlung an der Ecke stöbert er stundenlang."
  },
  {
    "front": "die Handlung",
    "back": "حَبْكَة",
    "roman": "ḥabka",
    "example": "حَبْكَةُ الرِّوَايَةِ الْمُثِيرَةُ تَدُورُ أَحْدَاثُهَا فِي لَنْدَنَ الْفِكْتُورِيَّةِ.",
    "exampleDE": "Die fesselnde Handlung des Romans spielt im viktorianischen London."
  },
  {
    "front": "die Hauptfigur",
    "back": "شَخْصِيَّةٌ رَئِيسِيَّة",
    "roman": "shakhṣiyya raʾīsiyya",
    "example": "الشَّخْصِيَّةُ الرَّئِيسِيَّةُ الشُّجَاعَةُ تَتَغَلَّبُ عَلَى الْكَثِيرِ مِنَ الْمُغَامَرَاتِ عَلَى مَدَارِ الْكِتَابِ.",
    "exampleDE": "Die mutige Hauptfigur meistert im Laufe des Buches viele Abenteuer."
  },
  {
    "front": "das Kapitel",
    "back": "فَصْل",
    "roman": "faṣl",
    "example": "قَبْلَ النَّوْمِ أَقْرَأُ فَصْلًا مُثِيرًا حَتَّى نِهَايَتِهِ.",
    "exampleDE": "Vor dem Einschlafen lese ich noch ein spannendes Kapitel zu Ende."
  },
  {
    "front": "der Autor",
    "back": "مُؤَلِّف",
    "roman": "muʾallif",
    "example": "وَقَّعَ الْمُؤَلِّفُ الْمَرْمُوقُ الْعَدِيدَ مِنَ النُّسَخِ بَعْدَ الْأُمْسِيَةِ الْأَدَبِيَّةِ.",
    "exampleDE": "Der renommierte Autor signierte nach der Lesung viele Exemplare."
  },
  {
    "front": "die Leinwand",
    "back": "شَاشَةُ سِينَمَا",
    "roman": "shāshat sīnamā",
    "example": "عَلَى شَاشَةِ السِّينَمَا الضَّخْمَةِ تَبْدُو مَشَاهِدُ الطَّبِيعَةِ مُبْهِرَةً.",
    "exampleDE": "Auf der riesigen Leinwand des Kinos wirken Landschaftsaufnahmen überwältigend."
  },
  {
    "front": "der Dokumentarfilm",
    "back": "فِيلْمٌ وَثَائِقِيّ",
    "roman": "fīlm wathāʾiqiyy",
    "example": "يُلْقِي الْفِيلْمُ الْوَثَائِقِيُّ الضَّوْءَ عَلَى الْحَيَاةِ الرَّائِعَةِ لِلْحَيَوَانَاتِ الْبَرِّيَّةِ.",
    "exampleDE": "Der Dokumentarfilm beleuchtet das faszinierende Leben wilder Tiere."
  },
  {
    "front": "die Komödie",
    "back": "كُومِيدْيَا",
    "roman": "kūmīdyā",
    "example": "كُومِيدْيَا مَرِحَةٌ جَلَبَتِ الْكَثِيرَ مِنَ الضَّحَكَاتِ الصَّادِقَةِ فِي الْقَاعَةِ.",
    "exampleDE": "Eine heitere Komödie sorgte für viele herzliche Lacher im Saal."
  },
  {
    "front": "der Untertitel",
    "back": "تَرْجَمَةٌ مَرْئِيَّة",
    "roman": "tarjama marʾiyya",
    "example": "أُفَضِّلُ مُشَاهَدَةَ الْأَفْلَامِ الْأَجْنَبِيَّةِ مَعَ تَرْجَمَةٍ مَرْئِيَّةٍ أَلْمَانِيَّةٍ.",
    "exampleDE": "Fremdsprachige Filme schaue ich am liebsten mit deutschen Untertiteln."
  },
  {
    "front": "die Fernbedienung",
    "back": "جِهَازُ تَحَكُّمٍ عَنْ بُعْد",
    "roman": "jihāz taḥakkum ʿan buʿd",
    "example": "بِجِهَازِ التَّحَكُّمِ عَنْ بُعْدٍ يَخْفِضُ صَوْتَ التِّلْفَازِ.",
    "exampleDE": "Mit der Fernbedienung schaltet er die Lautstärke des Fernsehers leiser."
  },
  {
    "front": "die Fernsehserie",
    "back": "مُسَلْسَلٌ تِلْفِزْيُونِيّ",
    "roman": "musalsal tilfizyūniyy",
    "example": "الْمَوْسِمُ الْجَدِيدُ مِنَ الْمُسَلْسَلِ التِّلْفِزْيُونِيِّ الشَّهِيرِ سَيَصْدُرُ الْأُسْبُوعَ الْمُقْبِلَ.",
    "exampleDE": "Die neue Staffel der beliebten Fernsehserie erscheint nächste Woche."
  },
  {
    "front": "der Schauspieler",
    "back": "مُمَثِّل",
    "roman": "mumaththil",
    "example": "يُجَسِّدُ الْمُمَثِّلُ الْمَوْهُوبُ دَوْرَهُ بِمِصْدَاقِيَّةٍ عَالِيَةٍ.",
    "exampleDE": "Der talentierte Schauspieler verkörpert seine Rolle sehr glaubwürdig."
  },
  {
    "front": "das Theaterstück",
    "back": "مَسْرَحِيَّة",
    "roman": "masraḥiyya",
    "example": "قُدِّمَتِ الْمَسْرَحِيَّةُ الْكَلَاسِيكِيَّةُ لِشِيلَر بِإِخْرَاجٍ حَدِيثٍ.",
    "exampleDE": "Das klassische Theaterstück von Schiller wurde modern inszeniert."
  },
  {
    "front": "der Theatervorhang",
    "back": "سِتَارُ الْمَسْرَح",
    "roman": "sitār al-masraḥ",
    "example": "وَسَطَ تَصْفِيقٍ كَبِيرٍ أُسْدِلَ سِتَارُ الْمَسْرَحِ الْأَحْمَرُ الثَّقِيلُ.",
    "exampleDE": "Unter großem Applaus senkte sich der schwere rote Theatervorhang."
  },
  {
    "front": "der Beifall",
    "back": "تَصْفِيق",
    "roman": "taṣfīq",
    "example": "وَجَّهَ الْجُمْهُورُ الْمُتَحَمِّسُ تَصْفِيقًا حَارًّا لِلْمُمَثِّلِينَ.",
    "exampleDE": "Das begeisterte Publikum spendete den Darstellern tosenden Beifall."
  },
  {
    "front": "das Bühnenbild",
    "back": "دِيكُورُ الْمَسْرَح",
    "roman": "dīkūr al-masraḥ",
    "example": "مَثَّلَ دِيكُورُ الْمَسْرَحِ الْمُتْقَنُ سَاحَةَ سُوقٍ تَارِيخِيَّةً.",
    "exampleDE": "Das aufwendige Bühnenbild stellte einen historischen Marktplatz dar."
  },
  {
    "front": "die Garderobe",
    "back": "مَكْتَبُ أَمَانَاتِ الْمَلَابِس",
    "roman": "maktab amānāt al-malābis",
    "example": "قَبْلَ بَدْءِ الْعَرْضِ يَتِمُّ تَسْلِيمُ السُّتُرِ إِلَى مَكْتَبِ أَمَانَاتِ الْمَلَابِسِ.",
    "exampleDE": "Vor Beginn der Vorstellung gibt man Jacken an der Garderobe ab."
  },
  {
    "front": "die Pause",
    "back": "اسْتِرَاحَة",
    "roman": "istirāḥa",
    "example": "فِي الِاسْتِرَاحَةِ الَّتِي تَمْتَدُّ لِعِشْرِينَ دَقِيقَةً يَشْرَبُ الزُّوَّارُ كَأْسًا.",
    "exampleDE": "In der zwanzigminütigen Pause trinken die Besucher ein Glas Sekt."
  },
  {
    "front": "der Rang",
    "back": "شُرْفَةُ الْمَسْرَح",
    "roman": "shurfat al-masraḥ",
    "example": "مِنَ الْمَقَاعِدِ فِي شُرْفَةِ الْمَسْرَحِ الْأُولَى يَتَمَتَّعُ الْمَرْءُ بِإِطْلَالَةٍ مُمْتَازَةٍ.",
    "exampleDE": "Von den Plätzen im ersten Rang hat man einen ausgezeichneten Überblick."
  },
  {
    "front": "die Generalprobe",
    "back": "بْرُوفَةٌ نِهَائِيَّة",
    "roman": "brūfa nihāʾiyya",
    "example": "مَرَّتِ الْبْرُوفَةُ النِّهَائِيَّةُ الْأَخِيرَةُ قَبْلَ الْعَرْضِ الْأَوَّلِ الْكَبِيرِ بِلَا أَخْطَاءٍ.",
    "exampleDE": "Die letzte Probe vor der großen Premiere verlief fehlerfrei."
  },
  {
    "front": "die Kunstgalerie",
    "back": "مَعْرِضٌ فَنِّيّ",
    "roman": "maʿriḍ fanniyy",
    "example": "فِي الْمَعْرِضِ الْفَنِّيِّ لِلْمَدِينَةِ يَعْرِضُ الرَّسَّامُونَ الشَّبَابُ أَعْمَالَهُمْ.",
    "exampleDE": "In der städtischen Kunstgalerie stellen junge Maler ihre Werke aus."
  },
  {
    "front": "das Ölgemälde",
    "back": "لَوْحَةٌ زَيْتِيَّة",
    "roman": "lawḥa zaytiyya",
    "example": "اللَّوْحَةُ الزَّيْتِيَّةُ الْقَيِّمَةُ تَعُودُ إِلَى الْقَرْنِ السَّابِعَ عَشَرَ.",
    "exampleDE": "Das wertvolle Ölgemälde stammt aus dem siebzehnten Jahrhundert."
  },
  {
    "front": "die Skulptur",
    "back": "تِمْثَال",
    "roman": "timthāl",
    "example": "فِي حَدِيقَةِ الْمَتْحَفِ يَقِفُ تِمْثَالٌ بِمَقَاسٍ طَبِيعِيٍّ مَصْنُوعٌ مِنَ الْبُرُونْزِ.",
    "exampleDE": "Im Museumsgarten steht eine lebensgroße Skulptur aus Bronze."
  },
  {
    "front": "der Museumsführer",
    "back": "دَلِيلُ الْمَتْحَف",
    "roman": "dalīl al-matḥaf",
    "example": "الدَّلِيلُ الصَّوْتِيُّ الْإِلِكْتُرُونِيُّ يَقُودُ الزُّوَّارَ بِمَعْلُومَاتٍ وَافِيَةٍ عَبْرَ الْقَاعَاتِ.",
    "exampleDE": "Der elektronische Audioguide führt Besucher informativ durch die Räume."
  },
  {
    "front": "der Eintritt",
    "back": "رَسْمُ الدُّخُول",
    "roman": "rasm ad-dukhūl",
    "example": "لِلتَّلَامِيذِ وَالطُّلَّابِ يَكُونُ رَسْمُ الدُّخُولِ مُخَفَّضًا أَيَّامَ الْأَحَدِ.",
    "exampleDE": "Für Schüler und Studierende ist der Eintritt sonntags ermäßigt."
  },
  {
    "front": "die Sonderausstellung",
    "back": "مَعْرِضٌ خَاصّ",
    "roman": "maʿriḍ khāṣṣ",
    "example": "الْمَعْرِضُ الْخَاصُّ عَنِ الْعُصُورِ الْقَدِيمَةِ يَجْذِبُ الْكَثِيرَ مِنَ الزُّوَّارِ.",
    "exampleDE": "Die Sonderausstellung über die Antike lockt viele Besucher an."
  },
  {
    "front": "das Meisterwerk",
    "back": "تُحْفَةٌ فَنِّيَّة",
    "roman": "tuḥfa fanniyya",
    "example": "تُعْتَبَرُ هَذِهِ اللَّوْحَةُ الشَّخْصِيَّةُ الشَّهِيرَةُ عَالَمِيًّا تُحْفَةَ الرَّسَّامِ الْفَنِّيَّةَ.",
    "exampleDE": "Dieses weltberühmte Porträt gilt als das Meisterwerk des Malers."
  },
  {
    "front": "die Akustikgitarre",
    "back": "قِيثَارَةٌ صَوْتِيَّة",
    "roman": "qīthāra ṣawtiyya",
    "example": "حَوْلَ نَارِ الْمُخَيَّمِ يُرَافِقُ الْأَغَانِيَ بِالْقِيثَارَةِ الصَّوْتِيَّةِ.",
    "exampleDE": "Am Lagerfeuer begleitet er die Lieder auf der Akustikgitarre."
  },
  {
    "front": "das Klavier",
    "back": "بِيَانُو",
    "roman": "biyānū",
    "example": "تَتَدَرَّبُ كُلَّ بَعْدِ ظُهْرٍ بِاجْتِهَادٍ عَلَى السَّلَالِمِ الْمُوسِيقِيَّةِ عَلَى الْبِيَانُو.",
    "exampleDE": "Sie übt jeden Nachmittag fleißig Tonleitern auf dem Klavier."
  },
  {
    "front": "die Geige",
    "back": "كَمَان",
    "roman": "kamān",
    "example": "حَمَلَ الصَّوْتُ الصَّافِي لِلْكَمَانِ لَحْنَ الرُّبَاعِيِّ الْوَتَرِيِّ.",
    "exampleDE": "Der klare Klang der Geige trug die Melodie des Streichquartetts."
  },
  {
    "front": "das Schlagzeug",
    "back": "طُقُومُ طُبُول",
    "roman": "ṭuqūm ṭubūl",
    "example": "عَازِفُ الطُّبُولِ يُعْطِي الْفِرْقَةَ الْإِيقَاعَ الْحَمَاسِيَّ.",
    "exampleDE": "Der Schlagzeuger gibt der Band den treibenden Rhythmus vor."
  },
  {
    "front": "der Notenständer",
    "back": "حَامِلُ نُوَتٍ مُوسِيقِيَّة",
    "roman": "ḥāmil nuwat mūsīqiyya",
    "example": "كُتَيِّبُ النُّوَتِ مَفْتُوحٌ عَلَى حَامِلِ النُّوَتِ الْمُوسِيقِيَّةِ الثَّابِتِ.",
    "exampleDE": "Das Notenheft steht aufgeschlagen auf dem stabilen Notenständer."
  },
  {
    "front": "der Kopfhörer",
    "back": "سَمَّاعَاتُ رَأْس",
    "roman": "sammāʿāt raʾs",
    "example": "فِي الْقِطَارِ تَسْتَمِعُ إِلَى مُوسِيقَاهَا الْمُفَضَّلَةِ عَبْرَ سَمَّاعَاتِ رَأْسٍ لَاسِلْكِيَّةٍ.",
    "exampleDE": "In der Bahn hört sie ihre Lieblingsmusik über kabellose Kopfhörer."
  },
  {
    "front": "der Songtext",
    "back": "كَلِمَاتُ أُغْنِيَة",
    "roman": "kalimāt ughniya",
    "example": "يَحْفَظُ كَلِمَاتِ الْأُغْنِيَةِ الْإِنْجِلِيزِيَّةِ عَنْ ظَهْرِ قَلْبٍ كَامِلَةً.",
    "exampleDE": "Er kennt den Songtext des englischen Liedes komplett auswendig."
  },
  {
    "front": "der Chor",
    "back": "جَوْقَة",
    "roman": "jawqa",
    "example": "تَتَدَرَّبُ جَوْقَةُ الْكَنِيسَةِ أُسْبُوعِيًّا لِلْحَفْلِ الْمُوسِيقِيِّ لِعِيدِ الْمِيلَادِ.",
    "exampleDE": "Der Kirchenchor probt wöchentlich für das festliche Weihnachtskonzert."
  },
  {
    "front": "die Laufschuhe",
    "back": "أَحْذِيَةُ رَكْض",
    "roman": "aḥdhiyat rakḍ",
    "example": "أَحْذِيَةُ الرَّكْضِ الْجَيِّدَةُ تَمْتَصُّ كُلَّ خُطْوَةٍ عِنْدَ الْجَرْيِ عَلَى الْإِسْفَلْتِ.",
    "exampleDE": "Gute Laufschuhe dämpfen jeden Schritt beim Joggen auf Asphalt."
  },
  {
    "front": "die Trinkflasche",
    "back": "زُجَاجَةُ مَاء",
    "roman": "zujājat māʾ",
    "example": "أَثْنَاءَ الرِّيَاضَةِ تَكُونُ مَعِي دَائِمًا زُجَاجَةُ مَاءٍ مَمْلُوءَةٌ فِي مُتَنَاوَلِ الْيَدِ.",
    "exampleDE": "Beim Sport habe ich immer eine gefüllte Trinkflasche griffbereit."
  },
  {
    "front": "das Fitnessstudio",
    "back": "صَالَةُ لِيَاقَةٍ بَدَنِيَّة",
    "roman": "ṣālat liyāqa badaniyya",
    "example": "يَتَدَرَّبُ ثَلَاثَ مَرَّاتٍ فِي الْأُسْبُوعِ عَلَى الْأَجْهِزَةِ فِي صَالَةِ اللِّيَاقَةِ الْبَدَنِيَّةِ.",
    "exampleDE": "Dreimal pro Woche trainiert er an den Geräten im Fitnessstudio."
  },
  {
    "front": "die Gymnastikmatte",
    "back": "بِسَاطُ تَمَارِين",
    "roman": "bisāṭ tamārīn",
    "example": "تَفْرُشُ بِسَاطَ التَّمَارِينِ الْمَانِعَ لِلِانْزِلَاقِ لِمُمَارَسَةِ الْيُوغَا.",
    "exampleDE": "Sie rollt ihre rutschfeste Gymnastikmatte für das Yoga aus."
  },
  {
    "front": "die Liegestütze",
    "back": "تَمْرِينُ ضَغْط",
    "roman": "tamrīn ḍaghṭ",
    "example": "عَشَرَةُ تَمَارِينِ ضَغْطٍ مُتْقَنَةٍ هِيَ جُزْءٌ مِنْ تَدْرِيبِهِ الدَّائِرِيِّ الصَّبَاحِيِّ.",
    "exampleDE": "Zehn saubere Liegestütze gehören zu seinem morgendlichen Zirkeltraining."
  },
  {
    "front": "das Seilspringen",
    "back": "قَفْزُ الْحَبْل",
    "roman": "qafz al-ḥabl",
    "example": "قَفْزُ الْحَبْلِ هُوَ تَمْرِينٌ مُمْتَازٌ لِلتَّنَاسُقِ وَاللِّيَاقَةِ الْبَدَنِيَّةِ.",
    "exampleDE": "Seilspringen ist eine hervorragende Übung für Koordination und Kondition."
  },
  {
    "front": "der Marathon",
    "back": "مَارَاثُون",
    "roman": "mārāthūn",
    "example": "اسْتَعَدَّ بِضَمِيرٍ حَيٍّ لِأَشْهُرٍ لِمَارَاثُونِهِ الْأَوَّلِ.",
    "exampleDE": "Monatelang bereitete er sich gewissenhaft auf seinen ersten Marathon vor."
  },
  {
    "front": "der Fußballplatz",
    "back": "مَلْعَبُ كُرَةِ قَدَم",
    "roman": "malʿab kurat qadam",
    "example": "يَلْتَقِي الشَّبَابُ بَعْدَ الْمَدْرَسَةِ فِي مَلْعَبِ كُرَةِ الْقَدَمِ.",
    "exampleDE": "Die Jugendlichen treffen sich nach der Schule auf dem Fußballplatz."
  },
  {
    "front": "das Tor",
    "back": "هَدَف",
    "roman": "hadaf",
    "example": "فِي الدَّقِيقَةِ الْأَخِيرَةِ مِنَ الْمُبَارَاةِ سَجَّلَتِ الْمُهَاجِمَةُ الْهَدَفَ الْحَاسِمَ.",
    "exampleDE": "In der letzten Spielminute schoss die Stürmerin das entscheidende Tor."
  },
  {
    "front": "der Schiedsrichter",
    "back": "حَكَم",
    "roman": "ḥakam",
    "example": "صَفَّرَ الْحَكَمُ النَّزِيهُ مُعْلِنًا بَدْءَ الْمُبَارَاةِ الْعَادِلَةِ فِي الْمَوْعِدِ.",
    "exampleDE": "Der unparteiische Schiedsrichter pfiff das faire Spiel pünktlich an."
  },
  {
    "front": "die Halbzeitpause",
    "back": "اسْتِرَاحَةُ الشَّوْطَيْن",
    "roman": "istirāḥat ash-shawṭayn",
    "example": "فِي اسْتِرَاحَةِ الشَّوْطَيْنِ لِمُدَّةِ خَمْسَ عَشْرَةَ دَقِيقَةً يُنَاقِشُ اللَّاعِبُونَ الْخُطَّةَ.",
    "exampleDE": "In der fünfzehnminütigen Halbzeitpause besprechen die Spieler die Taktik."
  },
  {
    "front": "der Basketballkorb",
    "back": "سَلَّةُ كُرَةِ السَّلَّة",
    "roman": "sallat kurat as-salla",
    "example": "بِرَمْيَةٍ مُحْكَمَةٍ أَدْخَلَ الْكُرَةَ مُبَاشَرَةً فِي سَلَّةِ كُرَةِ السَّلَّةِ.",
    "exampleDE": "Mit einem gezielten Wurf traf er den Ball direkt in den Basketballkorb."
  },
  {
    "front": "der Tennisschläger",
    "back": "مِضْرَبُ تِنِس",
    "roman": "miḍrab tinis",
    "example": "تُعِيدُ شَدَّ أَوْتَارِ مِضْرَبِ التِّنِسِ قَبْلَ الْبُطُولَةِ الْكَبِيرَةِ.",
    "exampleDE": "Sie bespannt ihren Tennisschläger vor dem großen Turnier neu."
  },
  {
    "front": "die Tischtennisplatte",
    "back": "طَاوِلَةُ كُرَةِ طَاوِلَة",
    "roman": "ṭāwilat kurat ṭāwila",
    "example": "فِي الْحَدِيقَةِ تُوجَدُ طَاوِلَةُ كُرَةِ طَاوِلَةٍ خَرَسَانِيَّةٌ مُقَاوِمَةٌ لِلْعَوَامِلِ الْجَوِّيَّةِ.",
    "exampleDE": "Im Garten steht eine wetterfeste Tischtennisplatte aus Beton."
  },
  {
    "front": "das Turnier",
    "back": "بُطُولَة",
    "roman": "buṭūla",
    "example": "يُشَارِكُ فِي الْبُطُولَةِ الرِّيَاضِيَّةِ الْإِقْلِيمِيَّةِ أَكْثَرُ مِنْ عِشْرِينَ فَرِيقًا.",
    "exampleDE": "An dem regionalen Sportturnier nehmen über zwanzig Teams teil."
  },
  {
    "front": "das Schwimmbad",
    "back": "مَسْبَح",
    "roman": "masbaḥ",
    "example": "فِي الْمَسْبَحِ الْمُغَطَّى يَسْبَحُ عِشْرِينَ جَوْلَةً صَبَاحَ كُلِّ ثُلَاثَاءٍ.",
    "exampleDE": "Im Hallenbad schwimmt er jeden Dienstagmorgen zwanzig Bahnen."
  },
  {
    "front": "die Schwimmbrille",
    "back": "نَظَّارَةُ سِبَاحَة",
    "roman": "naẓẓārat sibāḥa",
    "example": "نَظَّارَةُ السِّبَاحَةِ الْمُحْكَمَةُ تَحْمِي الْعَيْنَيْنِ مِنْ مَاءِ الْكُلُورِ.",
    "exampleDE": "Eine dicht sitzende Schwimmbrille schützt die Augen vor Chlorwasser."
  },
  {
    "front": "der Sprungturm",
    "back": "مِنْصَّةُ قَفْز",
    "roman": "minaṣṣat qafz",
    "example": "بِشَجَاعَةٍ قَفَزَتِ الْفَتَاةُ مِنْ مِنْصَّةِ قَفْزٍ عَلَى ارْتِفَاعِ ثَلَاثَةِ أَمْتَارٍ فِي الْحَوْضِ.",
    "exampleDE": "Mutig sprang das Mädchen vom Dreimeter-Sprungturm ins Becken."
  },
  {
    "front": "das Segelboot",
    "back": "قَارِبٌ شِرَاعِيّ",
    "roman": "qārib shirāʿiyy",
    "example": "بِأَشْرِعَةٍ مَرْفُوعَةٍ يَنْزَلِقُ الْقَارِبُ الشِّرَاعِيُّ الصَّغِيرُ فَوْقَ الْبُحَيْرَةِ.",
    "exampleDE": "Mit gesetzten Segeln gleitet das kleine Segelboot über den See."
  },
  {
    "front": "die Schwimmweste",
    "back": "سُتْرَةُ نَجَاة",
    "roman": "sutrat najāh",
    "example": "فِي الْمِيَاهِ الْمَفْتُوحَةِ يَكُونُ ارْتِدَاءُ سُتْرَةِ النَّجَاةِ إِجْبَارِيًّا.",
    "exampleDE": "Auf dem offenen Wasser ist das Tragen einer Schwimmweste Pflicht."
  },
  {
    "front": "das Paddel",
    "back": "مِجْدَاف",
    "roman": "mijdāf",
    "example": "بِحَرَكَاتٍ مُنْتَظَمَةٍ يَغْمِسُ الْمِجْدَافَ فِي الْمَاءِ الْهَادِئِ.",
    "exampleDE": "Mit gleichmäßigen Zügen taucht er das Paddel ins ruhige Wasser."
  }
]

if __name__ == '__main__':
    from build_ar_part3 import part3_cards
    all_cards = part3_cards + part3_cards_b
    print(f"Total part 3 cards: {len(all_cards)}")
    with open('scripts/data_ar_part3.json', 'w', encoding='utf-8') as f:
        json.dump(all_cards, f, ensure_ascii=False, indent=2)
    print("Saved scripts/data_ar_part3.json successfully.")
