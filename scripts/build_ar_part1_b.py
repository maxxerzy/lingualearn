# -*- coding: utf-8 -*-
import json

part1_cards_b = [
  {
    "front": "die Lederschuhe",
    "back": "أَحْذِيَةٌ جِلْدِيَّة",
    "roman": "aḥdhiya jildiyya",
    "example": "فِي الْمُنَاسَبَاتِ الِاحْتِفَالِيَّةِ يَنْتَعِلُ أَحْذِيَةً جِلْدِيَّةً مَصْقُولَةً.",
    "exampleDE": "Zu festlichen Anlässen trägt er polierte Lederschuhe."
  },
  {
    "front": "die Turnschuhe",
    "back": "أَحْذِيَةٌ رِيَاضِيَّة",
    "roman": "aḥdhiya riyāḍiyya",
    "example": "لِلرَّكْضِ فِي الْحَدِيقَةِ أَحْتَاجُ إِلَى أَحْذِيَةٍ رِيَاضِيَّةٍ مُرِيحَةٍ.",
    "exampleDE": "Zum Laufen im Park brauche ich bequeme Turnschuhe."
  },
  {
    "front": "die Handtasche",
    "back": "حَقِيبَةُ يَد",
    "roman": "ḥaqībat yad",
    "example": "تَبْحَثُ عَنْ مِفْتَاحِهَا فِي حَقِيبَةِ الْيَدِ الْكَبِيرَةِ.",
    "exampleDE": "Sie sucht ihren Schlüssel in der großen Handtasche."
  },
  {
    "front": "der Ledergürtel",
    "back": "حِزَامٌ جِلْدِيّ",
    "roman": "ḥizām jildiyy",
    "example": "حِزَامٌ جِلْدِيٌّ أَسْوَدُ يُثَبِّتُ الْبِنْطَالَ بِإِحْكَامٍ.",
    "exampleDE": "Ein schwarzer Ledergürtel hält die Hose fest."
  },
  {
    "front": "der Regenschirm",
    "back": "مِظَلَّة",
    "roman": "miẓalla",
    "example": "خُذْ مِظَلَّةً مَعَكَ، فَالسَّمَاءُ تَتَلَبَّدُ بِالْغُيُومِ.",
    "exampleDE": "Nimm einen Regenschirm mit, der Himmel zieht sich zu."
  },
  {
    "front": "die Sonnenbrille",
    "back": "نَظَّارَةٌ شَمْسِيَّة",
    "roman": "naẓẓāra shamsiyya",
    "example": "فِي الصَّيْفِ تَحْمِي النَّظَّارَةُ الشَّمْسِيَّةُ الْجَيِّدَةُ الْعَيْنَيْنِ.",
    "exampleDE": "Im Sommer schützt eine gute Sonnenbrille die Augen."
  },
  {
    "front": "das Girokonto",
    "back": "حِسَابٌ جَارٍ",
    "roman": "ḥisāb jārin",
    "example": "يُحَوَّلُ رَاتِبِي شَهْرِيًّا إِلَى حِسَابِي الْجَارِي.",
    "exampleDE": "Mein Gehalt wird monatlich auf mein Girokonto überwiesen."
  },
  {
    "front": "die Überweisung",
    "back": "تَحْوِيلٌ مَصْرِفِيّ",
    "roman": "taḥwīl maṣrifiyy",
    "example": "أَقُومُ بِالتَّحْوِيلِ الْمَصْرِفِيِّ بِسُهُولَةٍ عَبْرَ الْخِدْمَةِ الْمَصْرِفِيَّةِ عَبْرَ الْإِنْتَرْنِت.",
    "exampleDE": "Ich mache die Überweisung bequem per Online-Banking."
  },
  {
    "front": "der Dauerauftrag",
    "back": "أَمْرُ دَفْعٍ دَائِم",
    "roman": "amr dafʿ dāʾim",
    "example": "أَدْفَعُ الْإِيجَارَ كُلَّ شَهْرٍ عَبْرَ أَمْرِ دَفْعٍ دَائِمٍ.",
    "exampleDE": "Die Miete bezahle ich jeden Monat per Dauerauftrag."
  },
  {
    "front": "der Geldautomat",
    "back": "صَرَّافٌ آلِيّ",
    "roman": "ṣarrāf āliyy",
    "example": "فِي هَذَا الصَّرَّافِ الْآلِيِّ يُمْكِنُكَ السَّحْبُ بِدُونِ رُسُومٍ.",
    "exampleDE": "An diesem Geldautomaten kann man gebührenfrei abheben."
  },
  {
    "front": "die Geheimzahl",
    "back": "رَقْمٌ سِرِّيّ",
    "roman": "raqm sirriyy",
    "example": "لَا تُعْطِ رَقْمَكَ السِّرِّيَّ الْمُكَوَّنَ مِنْ أَرْبَعَةِ أَرْقَامٍ لِلْغُرَبَاءِ أَبَدًا.",
    "exampleDE": "Gib deine vierstellige Geheimzahl niemals an Fremde weiter."
  },
  {
    "front": "der Kontoauszug",
    "back": "كَشْفُ حِسَاب",
    "roman": "kashf ḥisāb",
    "example": "فِي كَشْفِ الْحِسَابِ تُوجَدُ جَمِيعُ الْإِيرَادَاتِ وَالْمَصْرُوفَاتِ.",
    "exampleDE": "Auf dem Kontoauszug stehen alle Einnahmen und Ausgaben."
  },
  {
    "front": "das Sparguthaben",
    "back": "رَصِيدُ تَوْفِير",
    "roman": "raṣīd tawfīr",
    "example": "تَدَّخِرُ كُلَّ شَهْرٍ مَبْلَغًا ثَابِتًا كَرَصِيدِ تَوْفِيرٍ.",
    "exampleDE": "Sie legt jeden Monat einen festen Betrag als Sparguthaben an."
  },
  {
    "front": "die Zinsen",
    "back": "فَوَائِد",
    "roman": "fawāʾid",
    "example": "يَدْفَعُ الْبَنْكُ حَالِيًّا فَوَائِدَ مُعْتَدِلَةً عَلَى الْوَدِيعَةِ الثَّابِتَةِ.",
    "exampleDE": "Die Bank zahlt derzeit moderate Zinsen auf das Festgeld."
  },
  {
    "front": "das Bargeld",
    "back": "نُقُودٌ نَقْدِيَّة",
    "roman": "nuqūd naqdiyya",
    "example": "هَلْ مَعَكَ بَعْضُ النُّقُودِ النَّقْدِيَّةِ أَمْ سَتَدْفَعُ بِالْبِطَاقَةِ؟",
    "exampleDE": "Haben Sie etwas Bargeld dabei oder zahlen Sie mit Karte?"
  },
  {
    "front": "die Kreditkarte",
    "back": "بِطَاقَةُ اِئْتِمَان",
    "roman": "biṭāqat iʾtimān",
    "example": "أَثْنَاءَ السَّفَرِ أَدْفَعُ ثَمَنَ الْمُشْتَرَيَاتِ غَالِبًا بِبِطَاقَةِ الِائْتِمَانِ.",
    "exampleDE": "Auf Reisen bezahle ich Einkäufe meist mit Kreditkarte."
  },
  {
    "front": "kontaktlos",
    "back": "بِلَا تَلَامُس",
    "roman": "bi-lā talāmus",
    "example": "الْمَبَالِغُ الَّتِي تَقِلُّ عَنْ خَمْسِينَ يُورُو يُمْكِنُ دَفْعُهَا بِلَا تَلَامُسٍ.",
    "exampleDE": "Beträge unter fünfzig Euro kann man kontaktlos bezahlen."
  },
  {
    "front": "die Münze",
    "back": "عُمْلَةٌ مَعْدِنِيَّة",
    "roman": "ʿumla maʿdiniyya",
    "example": "يُلْقِي عُمْلَةً مَعْدِنِيَّةً مِنْ فِئَةِ يُورُويَيْنِ فِي جِهَازِ تَذَاكِرِ الْمَوَاقِفِ.",
    "exampleDE": "Er wirft eine Zwei-Euro-Münze in den Parkscheinautomaten."
  },
  {
    "front": "der Geldschein",
    "back": "وَرَقَةٌ نَقْدِيَّة",
    "roman": "waraqa naqdiyya",
    "example": "تَطْوِي الْوَرَقَةَ النَّقْدِيَّةَ مِنْ فِئَةِ عَشَرَةِ يُورُو بِعِنَايَةٍ.",
    "exampleDE": "Sie faltet den Zehn-Euro-Geldschein sorgfältig zusammen."
  },
  {
    "front": "das Wechselgeld",
    "back": "بَاقِي النُّقُود",
    "roman": "bāqī n-nuqūd",
    "example": "لَا تَنْسَ بَاقِيَ نُقُودِكَ عِنْدَ صُنْدُوقِ الدَّفْعِ مِنْ فَضْلِكَ.",
    "exampleDE": "Vergessen Sie bitte nicht Ihr Wechselgeld an der Kasse."
  },
  {
    "front": "der Wechselkurs",
    "back": "سِعْرُ الصَّرْف",
    "roman": "siʿr aṣ-ṣarf",
    "example": "قَبْلَ السَّفَرِ إِلَى الْخَارِجِ نَتَحَقَّقُ مِنْ سِعْرِ الصَّرْفِ الْحَالِيِّ.",
    "exampleDE": "Vor der Auslandsreise prüfen wir den aktuellen Wechselkurs."
  },
  {
    "front": "das Paket",
    "back": "طَرْد",
    "roman": "ṭard",
    "example": "يُسَلِّمُ السَّاعِي الطَّرْدَ الثَّقِيلَ إِلَى بَابِ الْمَنْزِلِ.",
    "exampleDE": "Der Bote liefert das schwere Paket an die Haustür."
  },
  {
    "front": "der Briefumschlag",
    "back": "ظَرْفُ رِسَالَة",
    "roman": "ẓarf risāla",
    "example": "تَضَعُ الرِّسَالَةَ فِي ظَرْفِ رِسَالَةٍ أَبْيَضَ.",
    "exampleDE": "Sie steckt den Brief in einen weißen Briefumschlag."
  },
  {
    "front": "die Briefmarke",
    "back": "طَابَعُ بَرِيد",
    "roman": "ṭābaʿ barīd",
    "example": "أَلْصِقْ طَابَعَ بَرِيدٍ فِي أَعْلَى يَمِينِ الرِّسَالَةِ مِنْ فَضْلِكَ.",
    "exampleDE": "Kleb bitte eine Briefmarke oben rechts auf den Brief."
  },
  {
    "front": "der Absender",
    "back": "مُرْسِل",
    "roman": "mursil",
    "example": "فِي أَعْلَى يَسَارِ الظَّرْفِ يُوجَدُ عُنْوَانُ الْمُرْسِلِ.",
    "exampleDE": "Oben links auf dem Kuvert steht die Adresse des Absenders."
  },
  {
    "front": "der Empfänger",
    "back": "مُرْسَلٌ إِلَيْه",
    "roman": "mursal ilayh",
    "example": "الطَّرْدُ الصَّغِيرُ مُخَصَّصٌ لِلْمُرْسَلِ إِلَيْهِ الْمَذْكُورِ.",
    "exampleDE": "Das Päckchen ist für den angegebenen Empfänger bestimmt."
  },
  {
    "front": "die Packstation",
    "back": "مَحَطَّةُ طُرُود",
    "roman": "maḥaṭṭat ṭurūd",
    "example": "أَسْتَلِمُ شِحْنَتِي بَعْدَ انْتِهَاءِ الْعَمَلِ مِنْ مَحَطَّةِ الطُّرُودِ.",
    "exampleDE": "Ich hole meine Sendung nach Feierabend an der Packstation ab."
  },
  {
    "front": "das Einschreiben",
    "back": "بَرِيدٌ مُسَجَّل",
    "roman": "barīd musajjal",
    "example": "الْوَثَائِقُ الْمُهِمَّةُ تُوجَّهُ بِأَمَانٍ أَكْبَرَ عَبْرَ الْبَرِيدِ الْمُسَجَّلِ.",
    "exampleDE": "Wichtige Dokumente versendet man am sichersten per Einschreiben."
  },
  {
    "front": "die Postleitzahl",
    "back": "رَمْزٌ بَرِيدِيّ",
    "roman": "ramz barīdiyy",
    "example": "يُرْجَى إِدْخَالُ الرَّمْزِ الْبَرِيدِيِّ الْمُكَوَّنِ مِنْ خَمْسَةِ أَرْقَامٍ.",
    "exampleDE": "Geben Sie bitte Ihre fünfstellige Postleitzahl an."
  },
  {
    "front": "die Zahnpasta",
    "back": "مَعْجُونُ أَسْنَان",
    "roman": "maʿjūn asnān",
    "example": "هَذَا الْمَعْجُونُ يَحْمِي الْأَسْنَانَ بِفَعَالِيَّةٍ مِنْ تَسَوُّسِ الْأَسْنَانِ.",
    "exampleDE": "Diese Zahnpasta schützt wirksam vor Karies."
  },
  {
    "front": "das Duschgel",
    "back": "جِلُّ اسْتِحْمَام",
    "roman": "jill istiḥmām",
    "example": "جِلُّ الِاسْتِحْمَامِ تَنْبَعِثُ مِنْهُ رَائِحَةٌ لَطِيفَةٌ كَاللَّيْمُونِ الطَّازَجِ.",
    "exampleDE": "Das Duschgel duftet angenehm nach frischen Zitronen."
  },
  {
    "front": "das Shampoo",
    "back": "شَامْبُو",
    "roman": "shāmbū",
    "example": "الشَّامْبُو اللَّطِيفُ يَعْتَنِي بِفَرْوَةِ الرَّأْسِ وَالشَّعْرِ.",
    "exampleDE": "Ein mildes Shampoo pflegt die Kopfhaut und das Haar."
  },
  {
    "front": "die Seife",
    "back": "صَابُون",
    "roman": "ṣābūn",
    "example": "اِغْسِلْ يَدَيْكَ جَيِّدًا بِالْمَاءِ الدَّافِئِ وَالصَّابُونِ.",
    "exampleDE": "Wasch dir die Hände gründlich mit warmem Wasser und Seife."
  },
  {
    "front": "die Feuchtigkeitscreme",
    "back": "كَرِيمٌ مُرَطِّب",
    "roman": "karīm muraṭṭib",
    "example": "بَعْدَ الِاسْتِحْمَامِ تَضَعُ كَرِيمًا مُرَطِّبًا لِلْبَشَرَةِ.",
    "exampleDE": "Nach dem Duschen trägt sie eine feuchtigkeitsspendende Creme auf."
  },
  {
    "front": "das Deodorant",
    "back": "مُزِيلُ عَرَق",
    "roman": "muzīl ʿaraq",
    "example": "مُزِيلُ الْعَرَقِ الْجَيِّدُ يَمْنَحُ انْتِعَاشًا طَوَالَ الْيَوْمِ.",
    "exampleDE": "Ein gutes Deodorant sorgt den ganzen Tag für Frische."
  },
  {
    "front": "das Taschentuch",
    "back": "مِنْدِيل",
    "roman": "mindīl",
    "example": "هَلْ لَدَيْكَ مِنْدِيلٌ وَرَقِيٌّ مِنْ أَجْلِي؟",
    "exampleDE": "Hast du ein Papiertaschentuch für mich?"
  },
  {
    "front": "der Rasierer",
    "back": "آلَةُ حِلَاقَة",
    "roman": "ālat ḥilāqa",
    "example": "يُغَيِّرُ الشَّفَرَاتِ فِي آلَةِ حِلَاقَتِهِ بِانْتِظَامٍ.",
    "exampleDE": "Er wechselt regelmäßig die Klingen an seinem Rasierer."
  },
  {
    "front": "der Rasierschaum",
    "back": "رَغْوَةُ حِلَاقَة",
    "roman": "raghwat ḥilāqa",
    "example": "وَزِّعْ رَغْوَةَ الْحِلَاقَةِ بِلُطْفٍ عَلَى الْخَدَّيْنِ.",
    "exampleDE": "Verteile den Rasierschaum sanft auf den Wangen."
  },
  {
    "front": "die Nagelschere",
    "back": "مِقَصُّ أَظَافِر",
    "roman": "miqaṣṣ aẓāfir",
    "example": "بِمِقَصِّ الْأَظَافِرِ الصَّغِيرِ يَقُصُّ الْمَرْءُ الْأَظَافِرَ بِدِقَّةٍ.",
    "exampleDE": "Mit einer kleinen Nagelschere schneidet man Fingernägel präzise."
  },
  {
    "front": "die Nagelfeile",
    "back": "مِبْرَدُ أَظَافِر",
    "roman": "mibrad aẓāfir",
    "example": "تُسَوِّي أَظَافِرَهَا بِحَذَرٍ بِمِبْرَدِ الْأَظَافِرِ.",
    "exampleDE": "Sie glättet ihre Nägel vorsichtig mit einer Nagelfeile."
  },
  {
    "front": "die Sonnencreme",
    "back": "كَرِيمُ شَمْس",
    "roman": "karīm shams",
    "example": "فِي الْعُطْلَةِ نَدْهَنُ أَنْفُسَنَا بِانْتِظَامٍ بِكَرِيمِ الشَّمْسِ.",
    "exampleDE": "Im Urlaub cremen wir uns regelmäßig mit Sonnencreme ein."
  },
  {
    "front": "der Lippenbalsam",
    "back": "مُرَطِّبُ شِفَاه",
    "roman": "muraṭṭib shifāh",
    "example": "فِي الشِّتَاءِ يَحْمِي مُرَطِّبُ الشِّفَاهِ مِنَ التَّشَقُّقِ.",
    "exampleDE": "Im Winter schützt Lippenbalsam vor spröden Lippen."
  },
  {
    "front": "das Wattepad",
    "back": "قُرْصٌ قُطْنِيّ",
    "roman": "qurṣ quṭniyy",
    "example": "لِإِزَالَةِ الْمَكْيَاجِ تَسْتَخْدِمُ قُرْصًا قُطْنِيًّا نَاعِمًا.",
    "exampleDE": "Zum Abschminken verwendet sie ein weiches Wattepad."
  },
  {
    "front": "das Wattestäbchen",
    "back": "عِيدَانُ قُطْن",
    "roman": "ʿīdān quṭn",
    "example": "عِيدَانُ الْقُطْنِ مَكَانُهَا فِي خِزَانَةِ الْحَمَّامِ.",
    "exampleDE": "Wattestäbchen gehören in den Badezimmerschrank."
  },
  {
    "front": "der Umtausch",
    "back": "اِسْتِبْدَال",
    "roman": "istibdāl",
    "example": "الِاسْتِبْدَالُ مُمْكِنٌ خِلَالَ أَرْبَعَةَ عَشَرَ يَوْمًا.",
    "exampleDE": "Ein Umtausch ist innerhalb von vierzehn Tagen möglich."
  },
  {
    "front": "die Reklamation",
    "back": "شَكْوَى",
    "roman": "shakwā",
    "example": "بِسَبَبِ عَيْبٍ قَدَّمَ الزَّبُونُ شَكْوَى.",
    "exampleDE": "Wegen eines Mangels reichte der Kunde eine Reklamation ein."
  },
  {
    "front": "die Garantie",
    "back": "ضَمَان",
    "roman": "ḍamān",
    "example": "عَلَى هَذَا الْجِهَازِ الْكَهْرَبَائِيِّ ضَمَانٌ مِنَ الشَّرِكَةِ الْمُصَنِّعَةِ لِمُدَّةِ عَامَيْنِ.",
    "exampleDE": "Auf dieses Elektrogerät gibt es zwei Jahre Herstellergarantie."
  },
  {
    "front": "die Rückerstattung",
    "back": "اِسْتِرْدَادُ الْمَال",
    "roman": "istirdād al-māl",
    "example": "سَيُقَيَّدُ الْمَبْلَغُ لِحِسَابِكَ كَاسْتِرْدَادٍ لِلْمَالِ.",
    "exampleDE": "Der Betrag wird Ihnen als Rückerstattung gutgeschrieben."
  },
  {
    "front": "der Rabatt",
    "back": "خَصْم",
    "roman": "khaṣm",
    "example": "بِبِطَاقَةِ الزَّبُونِ هَذِهِ تَحْصُلُ عَلَى خَصْمِ عَشَرَةٍ فِي الْمِائَةِ.",
    "exampleDE": "Mit dieser Kundenkarte erhalten Sie zehn Prozent Rabatt."
  },
  {
    "front": "das Schnäppchen",
    "back": "صَفْقَةٌ رَابِحَة",
    "roman": "ṣafqa rābiḥa",
    "example": "كَانَ هَذَا الْمِعْطَفُ عَالِي الْجَوْدَةِ صَفْقَةً رَابِحَةً حَقِيقِيَّةً.",
    "exampleDE": "Dieser hochwertige Mantel war ein echtes Schnäppchen."
  },
  {
    "front": "die Beschwerde",
    "back": "شَكْوَى رَسْمِيَّة",
    "roman": "shakwā rasmiyya",
    "example": "تَمَّ فَحْصُ الشَّكْوَى الرَّسْمِيَّةِ مِنْ قِبَلِ إِدَارَةِ الشَّرِكَةِ.",
    "exampleDE": "Die Beschwerde wurde von der Geschäftsleitung geprüft."
  },
  {
    "front": "die Kopfschmerzen",
    "back": "صُدَاع",
    "roman": "ṣudāʿ",
    "example": "بَعْدَ يَوْمِ الْعَمَلِ الطَّوِيلِ أُصِبْتُ بِصُدَاعٍ خَفِيفٍ.",
    "exampleDE": "Nach dem langen Arbeitstag habe ich leichte Kopfschmerzen."
  },
  {
    "front": "die Halsschmerzen",
    "back": "أَلَمُ الْحَلْق",
    "roman": "alam al-ḥalq",
    "example": "شَايُ الْبَابُونِجِ الدَّافِئُ مَعَ الْعَسَلِ يُخَفِّفُ أَلَمَ الْحَلْقِ.",
    "exampleDE": "Warmer Kamillentee mit Honig lindert die Halsschmerzen."
  },
  {
    "front": "die Magenschmerzen",
    "back": "أَلَمُ الْمَعِدَة",
    "roman": "alam al-maʿida",
    "example": "الطَّعَامُ الدَّسِمُ يُسَبِّبُ لَهُ غَالِبًا أَلَمًا فِي الْمَعِدَةِ.",
    "exampleDE": "Fettes Essen verursacht bei ihm oft Magenschmerzen."
  },
  {
    "front": "der Schwindel",
    "back": "دُوخَة",
    "roman": "dūkha",
    "example": "عِنْدَ الْوُقُوفِ السَّرِيعِ انْتَابَتْهَا دُوخَةٌ قَصِيرَةٌ.",
    "exampleDE": "Beim schnellen Aufstehen überkam sie ein kurzer Schwindel."
  },
  {
    "front": "die Übelkeit",
    "back": "غَثَيَان",
    "roman": "ghathayān",
    "example": "الْهَوَاءُ النَّقِيُّ يُسَاعِدُ غَالِبًا ضِدَّ الْغَثَيَانِ الْمُفَاجِئِ.",
    "exampleDE": "Frische Luft hilft meist gut gegen plötzliche Übelkeit."
  },
  {
    "front": "der Husten",
    "back": "سُعَال",
    "roman": "suʿāl",
    "example": "لَدَيْهِ سُعَالٌ جَافٌّ وَعَنِيدٌ مُنْذُ ثَلَاثَةِ أَيَّامٍ.",
    "exampleDE": "Er hat seit drei Tagen einen trockenen, hartnäckigen Husten."
  },
  {
    "front": "der Schnupfen",
    "back": "زُكَام",
    "roman": "zukām",
    "example": "عِنْدَ الزُّكَامِ الشَّدِيدِ يَصْعُبُ التَّنَفُّسُ عَبْرَ الْأَنْفِ.",
    "exampleDE": "Bei starkem Schnupfen fällt das Atmen durch die Nase schwer."
  },
  {
    "front": "die Heiserkeit",
    "back": "بَحَّةُ صَوْت",
    "roman": "baḥḥat ṣawt",
    "example": "بَعْدَ الْحَفْلِ الْمُوسِيقِيِّ الصَّاخِبِ عَانَى الْمُغَنِّي مِنْ بَحَّةٍ فِي الصَّوْتِ.",
    "exampleDE": "Nach dem lauten Konzert litt der Sänger unter Heiserkeit."
  },
  {
    "front": "das Fieberthermometer",
    "back": "مِقْيَاسُ حَرَارَة",
    "roman": "miqyās ḥarāra",
    "example": "يَقِيسُ مِقْيَاسُ الْحَرَارَةِ الرَّقْمِيُّ دَرَجَةَ الْحَرَارَةِ فِي ثَوَانٍ.",
    "exampleDE": "Das digitale Fieberthermometer misst die Temperatur sekundenschnell."
  },
  {
    "front": "die erhöhte Temperatur",
    "back": "ارْتِفَاعٌ خَفِيفٌ فِي الْحَرَارَة",
    "roman": "irtifāʿ khafīf fī l-ḥarāra",
    "example": "الطِّفْلُ لَدَيْهِ ارْتِفَاعٌ خَفِيفٌ فِي الْحَرَارَةِ مَسَاءَ الْيَوْمِ.",
    "exampleDE": "Das Kind hat heute Abend leicht erhöhte Temperatur."
  },
  {
    "front": "der Schüttelfrost",
    "back": "قُشَعْرِيرَة",
    "roman": "qushaʿrīra",
    "example": "الْقُشَعْرِيرَةُ الْمُفَاجِئَةُ عَادَةً مَا تَكُونُ أَوَّلَ عَلَامَةٍ لِلْإِنْفْلُوَنْزَا.",
    "exampleDE": "Plötzlicher Schüttelfrost ist oft ein erstes Anzeichen einer Grippe."
  },
  {
    "front": "die Entzündung",
    "back": "الْتِهَاب",
    "roman": "iltihāb",
    "example": "يُعَالِجُ الطَّبِيبُ الِالْتِهَابَ بِمَرْهَمٍ عِلَاجِيٍّ.",
    "exampleDE": "Der Arzt behandelt die Entzündung mit einer Heilsalbe."
  },
  {
    "front": "die Infektion",
    "back": "عَدْوَى",
    "roman": "ʿadwā",
    "example": "غَسْلُ الْيَدَيْنِ بِانْتِظَامٍ يَحْمِي بِمَوْثُوقِيَّةٍ مِنَ الْعَدْوَى.",
    "exampleDE": "Regelmäßiges Händewaschen schützt zuverlässig vor einer Infektion."
  },
  {
    "front": "ansteckend",
    "back": "مُعْدٍ",
    "roman": "muʿdin",
    "example": "مَا دَامَتْ لَدَيْكَ حُمَّى، فَأَنْتَ مُعْدٍ لِلْآخَرِينَ.",
    "exampleDE": "Solange Sie Fieber haben, sind Sie für andere ansteckend."
  },
  {
    "front": "sich schonen",
    "back": "أَرَاحَ نَفْسَهُ",
    "roman": "arāḥa nafsahu",
    "example": "عِنْدَ النَّزْلَةِ يُفَضَّلُ الْبَقَاءُ فِي السَّرِيرِ وَإِرَاحَةُ النَّفْسِ.",
    "exampleDE": "Bei einer Erkältung sollte man im Bett bleiben und sich schonen."
  },
  {
    "front": "die Arztpraxis",
    "back": "عِيَادَةُ طَبِيب",
    "roman": "ʿiyādat ṭabīb",
    "example": "تَفْتَحُ عِيَادَةُ الطَّبِيبِ أَيَّامَ الِاثْنَيْنِ فِي السَّابِعَةِ صَبَاحًا.",
    "exampleDE": "Die Arztpraxis öffnet montags bereits um sieben Uhr morgens."
  },
  {
    "front": "das Wartezimmer",
    "back": "غُرْفَةُ انْتِظَار",
    "roman": "ghurfat intiẓār",
    "example": "يَجْلِسُ الْمَرْضَى بِصَبْرٍ فِي غُرْفَةِ الِانْتِظَارِ الْمُضِيئَةِ.",
    "exampleDE": "Die Patienten sitzen geduldig im hellen Wartezimmer."
  },
  {
    "front": "die Versichertenkarte",
    "back": "بِطَاقَةُ تَأْمِين",
    "roman": "biṭāqat taʾmīn",
    "example": "يُرْجَى إِبْرَازُ بِطَاقَةِ التَّأْمِينِ الْإِلِكْتُرُونِيَّةِ الْخَاصَّةِ بِكَ.",
    "exampleDE": "Legen Sie bitte Ihre elektronische Versichertenkarte vor."
  },
  {
    "front": "der Termin",
    "back": "مَوْعِد",
    "roman": "mawʿid",
    "example": "حَدَّدْتُ مَوْعِدًا مُؤَكَّدًا لِيَوْمِ الثُّلَاثَاءِ الْقَادِمِ.",
    "exampleDE": "Ich habe für kommenden Dienstag einen festen Termin vereinbart."
  },
  {
    "front": "die Untersuchung",
    "back": "فَحْص",
    "roman": "faḥṣ",
    "example": "لَمْ يُسْفِرِ الْفَحْصُ الدَّقِيقُ عَنْ أَيِّ شَيْءٍ غَيْرِ طَبِيعِيٍّ.",
    "exampleDE": "Die gründliche Untersuchung ergab keine Auffälligkeiten."
  },
  {
    "front": "der Blutdruck",
    "back": "ضَغْطُ الدَّم",
    "roman": "ḍaghṭ ad-dam",
    "example": "تَقِيسُ الْمُمَرِّضَةُ ضَغْطَ الدَّمِ فِي الذِّرَاعِ الْيُسْرَى.",
    "exampleDE": "Die Schwester misst den Blutdruck am linken Oberarm."
  },
  {
    "front": "der Puls",
    "back": "نَبْض",
    "roman": "nabḍ",
    "example": "بَعْدَ فَتْرَةِ الرَّاحَةِ الْقَصِيرَةِ يَنْبِضُ النَّبْضُ بِشَكْلٍ طَبِيعِيٍّ ثَانِيَةً.",
    "exampleDE": "Nach der kurzen Ruhepause schlägt der Puls wieder normal."
  },
  {
    "front": "das Stethoskop",
    "back": "سَمَّاعَةُ طَبِيب",
    "roman": "sammāʿat ṭabīb",
    "example": "تَسْمَعُ الطَّبِيبَةُ الرِّئَتَيْنِ بِسَمَّاعَةِ الطَّبِيبِ.",
    "exampleDE": "Die Ärztin hört die Lunge mit dem Stethoskop ab."
  },
  {
    "front": "das Rezept",
    "back": "وَصْفَةٌ طِبِّيَّة",
    "roman": "waṣfa ṭibbiyya",
    "example": "يُصْدِرُ لَكَ الطَّبِيبُ وَصْفَةً طِبِّيَّةً لِلْأَقْرَاصِ.",
    "exampleDE": "Der Arzt stellt Ihnen ein Rezept für die Tabletten aus."
  },
  {
    "front": "die Apotheke",
    "back": "صَيْدَلِيَّة",
    "roman": "ṣaydaliyya",
    "example": "الصَّيْدَلِيَّةُ الَّتِي عِنْدَ السُّوقِ لَدَيْهَا خِدْمَةُ طَوَارِئَ الْيَوْمَ.",
    "exampleDE": "Die Apotheke am Markt hat heute Notdienst."
  },
  {
    "front": "die Packungsbeilage",
    "back": "نَشْرَةُ دَوَاء",
    "roman": "nashrat dawāʾ",
    "example": "اِقْرَأْ نَشْرَةَ الدَّوَاءِ بِعِنَايَةٍ قَبْلَ تَنَاوُلِهِ.",
    "exampleDE": "Lesen Sie vor der Einnahme sorgfältig die Packungsbeilage."
  },
  {
    "front": "die Nebenwirkung",
    "back": "أَثَرٌ جَانِبِيّ",
    "roman": "athar jānibiyy",
    "example": "هَذَا الدَّوَاءُ سَهْلُ التَّحَمُّلِ لَيْسَ لَهُ آثَارٌ جَانِبِيَّةٌ مَعْرُوفَةٌ تَقْرِيبًا.",
    "exampleDE": "Dieses gut verträgliche Medikament hat kaum bekannte Nebenwirkungen."
  },
  {
    "front": "die Dosierung",
    "back": "جُرْعَة",
    "roman": "jurʿa",
    "example": "اِلْتَزِمْ بِدِقَّةٍ بِالْجُرْعَةِ الَّتِي حَدَّدَهَا الطَّبِيبُ.",
    "exampleDE": "Beachten Sie genau die vom Arzt verordnete Dosierung."
  },
  {
    "front": "das Schmerzmittel",
    "back": "مُسَكِّنُ أَلَم",
    "roman": "musakkin alam",
    "example": "مُسَكِّنُ الْأَلَمِ يَعْمَلُ عَادَةً فِي غُضُونِ نِصْفِ سَاعَةٍ.",
    "exampleDE": "Das Schmerzmittel wirkt meistens innerhalb einer halben Stunde."
  },
  {
    "front": "der Hustensaft",
    "back": "شَرَابُ سُعَال",
    "roman": "sharāb suʿāl",
    "example": "تَنَاوَلْ مِلْعَقَةً مِنْ شَرَابِ السُّعَالِ فِي الْمَسَاءِ قَبْلَ النَّوْمِ.",
    "exampleDE": "Nehmen Sie abends vor dem Schlafen einen Löffel Hustensaft."
  },
  {
    "front": "das Heftpflaster",
    "back": "لَاصِقَةُ جُرُوح",
    "roman": "lāṣiqat jurūḥ",
    "example": "أَلْصِقْ لَاصِقَةَ جُرُوحٍ عَلَى الْجُرْحِ الْقَطْعِيِّ الصَّغِيرِ مِنْ فَضْلِكَ.",
    "exampleDE": "Kleb bitte ein Heftpflaster auf die kleine Schnittwunde."
  },
  {
    "front": "der Verband",
    "back": "ضِمَادَة",
    "roman": "ḍimāda",
    "example": "تَضَعُ الْمُمَرِّضَةُ ضِمَادَةً نَظِيفَةً حَوْلَ الْكاحِلِ.",
    "exampleDE": "Die Krankenschwester legt einen sauberen Verband um den Knöchel."
  },
  {
    "front": "die Wundsalbe",
    "back": "مَرْهَمُ جُرُوح",
    "roman": "marham jurūḥ",
    "example": "يُسَرِّعُ مَرْهَمُ الْجُرُوحِ الْتِئَامَ جُرْحِ الْجِلْدِ.",
    "exampleDE": "Die Heilsalbe beschleunigt das Schließen der Hautwunde."
  },
  {
    "front": "die Desinfektion",
    "back": "تَطْهِير",
    "roman": "taṭhīr",
    "example": "قَبْلَ وَضْعِ الضِّمَادَةِ، يَكُونُ التَّطْهِيرُ الدَّقِيقُ مُهِمًّا.",
    "exampleDE": "Vor dem Verbinden ist eine gründliche Desinfektion wichtig."
  },
  {
    "front": "der Verbandskasten",
    "back": "صُنْدُوقُ إِسْعَافَاتٍ أَوَّلِيَّة",
    "roman": "ṣundūq isʿāfāt awwaliyya",
    "example": "يَجِبُ أَنْ يَكُونَ صُنْدُوقُ إِسْعَافَاتٍ أَوَّلِيَّةٍ كَامِلٌ مَوْجُودًا دَائِمًا فِي السَّيَّارَةِ.",
    "exampleDE": "Im Auto muss stets ein vollständiger Verbandskasten liegen."
  },
  {
    "front": "der Notruf",
    "back": "رَقْمُ طَوَارِئ",
    "roman": "raqm ṭawāriʾ",
    "example": "فِي حَالَاتِ الطَّوَارِئِ الْمُلِحَّةِ يُتَّصَلُ بِرَقْمِ الطَّوَارِئِ 112 فِي أُورُوبَّا.",
    "exampleDE": "In dringenden Notfällen wählt man europaweit den Notruf 112."
  },
  {
    "front": "die Erste Hilfe",
    "back": "إِسْعَافَاتٌ أَوَّلِيَّة",
    "roman": "isʿāfāt awwaliyya",
    "example": "يَنْبَغِي لِكُلِّ حَامِلِ رُخْصَةِ قِيَادَةٍ أَنْ يُجِيدَ تَقْدِيمَ الْإِسْعَافَاتِ الْأَوَّلِيَّةِ.",
    "exampleDE": "Jeder Führerscheininhaber sollte Erste Hilfe leisten können."
  },
  {
    "front": "bluten",
    "back": "نَزَفَ",
    "roman": "nazafa",
    "example": "لِحُسْنِ الْحَظِّ تَوَقَّفَ خَدْشُ الرُّكْبَةِ عَنِ النَّزْفِ.",
    "exampleDE": "Die Schürfwunde am Knie hat zum Glück aufgehört zu bluten."
  },
  {
    "front": "die Zahnarztpraxis",
    "back": "عِيَادَةُ طَبِيبِ أَسْنَان",
    "roman": "ʿiyādat ṭabīb asnān",
    "example": "مَرَّتَيْنِ فِي السَّنَةِ أَذْهَبُ إِلَى عِيَادَةِ طَبِيبِ الْأَسْنَانِ لِلْفَحْصِ.",
    "exampleDE": "Zweimal im Jahr gehe ich zur Kontrolle in die Zahnarztpraxis."
  },
  {
    "front": "die Zahnseide",
    "back": "خَيْطُ أَسْنَان",
    "roman": "khayṭ asnān",
    "example": "يُنَظِّفُ خَيْطُ الْأَسْنَانِ الْفَرَاغَاتِ الضَّيِّقَةَ بَيْنَ الْأَسْنَانِ.",
    "exampleDE": "Zahnseide reinigt die engen Zwischenräume zwischen den Zähnen."
  },
  {
    "front": "das Zahnfleisch",
    "back": "لِثَّة",
    "roman": "liththa",
    "example": "الْعِنَايَةُ الْمُنْتَظَمَةُ تُقَوِّي اللِّثَّةَ دَائِمًا.",
    "exampleDE": "Regelmäßige Pflege stärkt das Zahnfleisch dauerhaft."
  },
  {
    "front": "die Zahnfüllung",
    "back": "حَشْوَةُ سِنّ",
    "roman": "ḥashwat sinn",
    "example": "وَضَعَ طَبِيبُ الْأَسْنَانِ حَشْوَةَ سِنٍّ بَيْضَاءَ صَغِيرَةً.",
    "exampleDE": "Der Zahnarzt setzte eine kleine weiße Zahnfüllung ein."
  },
  {
    "front": "der Backenzahn",
    "back": "ضِرْس",
    "roman": "ḍirs",
    "example": "ضِرْسٌ فِي الْفَكِّ الْعُلْوِيِّ يَتَأَثَّرُ بِحَسَاسِيَّةٍ بِالْبُرُودَةِ.",
    "exampleDE": "Ein Backenzahn im Oberkiefer reagiert empfindlich auf Kälte."
  },
  {
    "front": "die Mundspülung",
    "back": "غَسُولُ فَم",
    "roman": "ghasūl fam",
    "example": "غَسُولُ الْفَمِ الْمُضَادُّ لِلْبَكْتِيرْيَا يَمْنَحُ نَفَسًا مُنْعِشًا.",
    "exampleDE": "Eine antibakterielle Mundspülung sorgt für frischen Atem."
  },
  {
    "front": "die Zahnschmerzen",
    "back": "أَلَمُ أَسْنَان",
    "roman": "alam asnān",
    "example": "عِنْدَ أَلَمِ الْأَسْنَانِ الْمُفَاجِئِ يَجِبُ الذَّهَابُ بِسُرْعَةٍ إِلَى طَبِيبِ الْأَسْنَانِ.",
    "exampleDE": "Gegen plötzliche Zahnschmerzen sollte man rasch zum Zahnarzt."
  },
  {
    "front": "das Handgelenk",
    "back": "مِعْصَم",
    "roman": "miʿṣam",
    "example": "تَرْتَدِي سَاعَةَ يَدٍ أَنِيقَةً فِي مِعْصَمِهَا الْأَيْسَرِ.",
    "exampleDE": "Sie trägt eine elegante Armbanduhr am linken Handgelenk."
  },
  {
    "front": "der Ellbogen",
    "back": "مِرْفَق",
    "roman": "mirfaq",
    "example": "صَدَمَ مِرْفَقَهُ بِأَلَمٍ بِحَافَّةِ الطَّاوِلَةِ.",
    "exampleDE": "Er hat sich den Ellbogen schmerzhaft an der Tischkante gestoßen."
  },
  {
    "front": "das Kniegelenk",
    "back": "مَفْصِلُ الرُّكْبَة",
    "roman": "mafṣil ar-rukba",
    "example": "عِنْدَ الرَّكْضِ يَتَعَرَّضُ مَفْصِلُ الرُّكْبَةِ لِإِجْهَادٍ شَدِيدٍ.",
    "exampleDE": "Beim Joggen wird das Kniegelenk stark beansprucht."
  },
  {
    "front": "der Knöchel",
    "back": "كَاحِل",
    "roman": "kāḥil",
    "example": "أَثْنَاءَ التَّجْوَالِ فِي طَرِيقٍ غَيْرِ مُسْتَوٍ الْتَوَى كَاحِلُهُ.",
    "exampleDE": "Beim Wandern auf unebenem Pfad ist er mit dem Knöchel umgeknickt."
  }
]

if __name__ == '__main__':
    from build_ar_part1 import part1_cards
    all_cards = part1_cards + part1_cards_b
    print(f"Total part 1 cards: {len(all_cards)}")
    with open('scripts/data_ar_part1.json', 'w', encoding='utf-8') as f:
        json.dump(all_cards, f, ensure_ascii=False, indent=2)
    print("Saved scripts/data_ar_part1.json successfully.")
