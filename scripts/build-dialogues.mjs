import fs from 'fs';
import { DIALOGUES } from '../js/data/dialogues.js';

// Kategorie für bestehende Szenarien
const CATEGORY_MAP = {
  'da-cafe': 'food',
  'da-directions': 'travel',
  'da-hotel': 'travel',
  'es-cafe': 'food',
  'es-directions': 'travel',
  'fr-cafe': 'food',
  'fr-hotel': 'travel',
  'ar-cafe': 'food',
  'ar-directions': 'travel',
  'zh-cafe': 'food',
  'zh-directions': 'travel',
  'ja-cafe': 'food',
  'ja-directions': 'travel',
  'ru-cafe': 'food',
  'ru-directions': 'travel',
  'pt-cafe': 'food',
  'pt-directions': 'travel',
  'el-cafe': 'food',
  'el-directions': 'travel',
  'la-taberna': 'food',
  'la-via': 'travel',
};

// Bestehende aktualisieren
for (const [lang, scens] of Object.entries(DIALOGUES)) {
  for (const sc of scens) {
    sc.category = CATEGORY_MAP[sc.id] || 'travel';
  }
}

// ── Neue Szenarien definieren ────────────────────────────────────

// 🇩🇰 DÄNISCH
DIALOGUES.da.push(
  {
    id: 'da-pharmacy',
    language: 'da',
    category: 'health',
    title: 'På apoteket',
    situation: 'Du har hovedpine og feber og beder apotekeren om smertestillende piller og doseringsråd.',
    icon: 'fa-kit-medical',
    npcName: 'Sofia',
    npcRole: 'Apoteker',
    level: 'A2',
    turns: [
      {
        npc: 'Hej! Hvad kan jeg hjælpe dig med i dag?',
        npcDe: 'Hallo! Womit kann ich dir heute helfen?',
        hint: '„Hvad kan jeg hjælpe dig med" ist die typische Frage im dänischen Kundenservice.',
        prompt: 'Schildere, dass du starke Kopfschmerzen und Halsschmerzen hast.',
        expected: 'Hej, jeg har slem hovedpine og ondt i halsen.',
        expectedDe: 'Hallo, ich habe schlimme Kopfschmerzen und Halsschmerzen.',
        options: [
          { text: 'Hej, jeg har slem hovedpine og ondt i halsen.', de: 'Hallo, ich habe schlimme Kopfschmerzen und Halsschmerzen.', correct: true },
          { text: 'Hvor er den nærmeste biograf?', de: 'Wo ist das nächste Kino?', correct: false },
          { text: 'Jeg vil gerne leje en bil.', de: 'Ich möchte ein Auto mieten.', correct: false },
        ],
      },
      {
        npc: 'Det lyder som en slem forkølelse. Vil du have smertestillende piller eller en næsespray?',
        npcDe: 'Das klingt nach einer bösen Erkältung. Möchtest du Schmerztabletten oder ein Nasenspray?',
        hint: '„Smertestillende piller" = Schmerztabletten.',
        prompt: 'Bitte um Schmerztabletten und frage nach der Dosierung.',
        expected: 'Smertestillende piller, tak. Hvor mange må jeg tage om dagen?',
        expectedDe: 'Schmerztabletten, bitte. Wie viele darf ich pro Tag nehmen?',
        options: [
          { text: 'Smertestillende piller, tak. Hvor mange må jeg tage om dagen?', de: 'Schmerztabletten, bitte. Wie viele darf ich am Tag nehmen?', correct: true },
          { text: 'Jeg foretrækker kaffe fremfor te.', de: 'Ich bevorzuge Kaffee gegenüber Tee.', correct: false },
          { text: 'Må jeg betale i morgen?', de: 'Darf ich morgen bezahlen?', correct: false },
        ],
      },
      {
        npc: 'Tag højst en pille tre gange om dagen med et stort glas vand. Rigtig god bedring!',
        npcDe: 'Nimm höchstens eine Tablette dreimal am Tag mit einem großen Glas Wasser. Gute Besserung!',
        hint: '„God bedring" ist der Standardwunsch bei Krankheit (Gute Besserung).',
        prompt: 'Bedanke dich für den Rat und frage nach dem Preis.',
        expected: 'Mange tak for rådet! Hvor meget bliver det?',
        expectedDe: 'Vielen Dank für den Rat! Wie viel macht das?',
        options: [
          { text: 'Mange tak for rådet! Hvor meget bliver det?', de: 'Vielen Dank für den Rat! Wie viel macht das?', correct: true },
          { text: 'Hvor bor dine forældre?', de: 'Wo wohnen deine Eltern?', correct: false },
          { text: 'Jeg har ingen taske med.', de: 'Ich habe keine Tasche dabei.', correct: false },
        ],
      },
    ],
  },
  {
    id: 'da-station',
    language: 'da',
    category: 'travel',
    title: 'På Københavns Hovedbanegård',
    situation: 'Du skal købe en togbillet til Aarhus og spørger om afgangstid og perron.',
    icon: 'fa-train',
    npcName: 'Henrik',
    npcRole: 'Billetkontor',
    level: 'A2',
    turns: [
      {
        npc: 'Goddag! Velkommen til DSB. Hvor går turen hen i dag?',
        npcDe: 'Guten Tag! Willkommen bei der DSB. Wohin geht die Reise heute?',
        hint: 'DSB (Danske Statsbaner) ist die dänische Staatsbahn.',
        prompt: 'Sage, dass du eine Fahrkarte nach Aarhus möchtest.',
        expected: 'Goddag, jeg vil gerne have en togbillet til Aarhus.',
        expectedDe: 'Guten Tag, ich hätte gerne eine Zugfahrkarte nach Aarhus.',
        options: [
          { text: 'Goddag, jeg vil gerne have en togbillet til Aarhus.', de: 'Guten Tag, ich hätte gerne eine Zugfahrkarte nach Aarhus.', correct: true },
          { text: 'Jeg har spist morgenmad.', de: 'Ich habe gefrühstückt.', correct: false },
          { text: 'Hvor gammelt er rådhuset?', de: 'Wie alt ist das Rathaus?', correct: false },
        ],
      },
      {
        npc: 'Skal det være en enkeltbillet eller tur-retur? Det næste lyntog kører klokken ti.',
        npcDe: 'Soll es eine einfache Fahrt oder Hin- und Rückfahrt sein? Der nächste Expresszug fährt um zehn.',
        hint: '„Tur-retur" = Hin- und Rückfahrt; „Lyntog" = dänischer Schnellzug.',
        prompt: 'Wähle eine einfache Fahrt mit Sitzplatzreservierung.',
        expected: 'En enkeltbillet med pladsbillet, tak.',
        expectedDe: 'Eine einfache Fahrt mit Sitzplatzkarte, bitte.',
        options: [
          { text: 'En enkeltbillet med pladsbillet, tak.', de: 'Eine einfache Fahrt mit Sitzplatzkarte, bitte.', correct: true },
          { text: 'Min kuffert er for tung.', de: 'Mein Koffer ist zu schwer.', correct: false },
          { text: 'Jeg vil hellere flyve.', de: 'Ich möchte lieber fliegen.', correct: false },
        ],
      },
      {
        npc: 'Det er i orden. Toget kører fra spor fire om tyve minutter. Rigtig god rejse!',
        npcDe: 'Geht in Ordnung. Der Zug fährt in 20 Minuten von Gleis vier ab. Gute Reise!',
        hint: '„Spor" ist das dänische Wort für Gleis/Bahnsteig.',
        prompt: 'Bedanke dich herzlich und wünsche einen schönen Tag.',
        expected: 'Tusind tak for hjælpen, og hav en god dag!',
        expectedDe: 'Tausend Dank für die Hilfe und einen schönen Tag!',
        options: [
          { text: 'Tusind tak for hjælpen, og hav en god dag!', de: 'Tausend Dank für die Hilfe und einen schönen Tag!', correct: true },
          { text: 'Nej, jeg har glemt min jakke.', de: 'Nein, ich habe meine Jacke vergessen.', correct: false },
          { text: 'Hvad er klokken?', de: 'Wie viel Uhr ist es?', correct: false },
        ],
      },
    ],
  }
);

// 🇪🇸 SPANISCH
DIALOGUES.es.push(
  {
    id: 'es-hotel',
    language: 'es',
    category: 'travel',
    title: 'Check-in en el hotel',
    situation: 'Llegas a un hotel en Barcelona para hacer el check-in y preguntar por los servicios.',
    icon: 'fa-hotel',
    npcName: 'Javier',
    npcRole: 'Recepcionista',
    level: 'A2',
    turns: [
      {
        npc: '¡Buenas tardes! Bienvenido al Hotel Sol. ¿Tiene una reserva con nosotros?',
        npcDe: 'Guten Tag! Willkommen im Hotel Sol. Haben Sie eine Reservierung bei uns?',
        hint: '„Buenas tardes" wird nach 14 Uhr bis zum Einbruch der Dunkelheit genutzt.',
        prompt: 'Bestätige die Reservierung und nenne deinen Nachnamen.',
        expected: 'Buenas tardes, sí, tengo una reserva a nombre de Schmidt.',
        expectedDe: 'Guten Tag, ja, ich habe eine Reservierung auf den Namen Schmidt.',
        options: [
          { text: 'Buenas tardes, sí, tengo una reserva a nombre de Schmidt.', de: 'Guten Tag, ja, ich habe eine Reservierung auf den Namen Schmidt.', correct: true },
          { text: 'Me gustaría comprar una bicicleta de montaña.', de: 'Ich möchte ein Mountainbike kaufen.', correct: false },
          { text: 'El museo está cerrado los lunes.', de: 'Das Museum ist montags geschlossen.', correct: false },
        ],
      },
      {
        npc: 'Efectivamente, una habitación doble por tres noches. ¿Me permite su pasaporte, por favor?',
        npcDe: 'In der Tat, ein Doppelzimmer für drei Nächte. Darf ich bitte Ihren Pass haben?',
        hint: 'In spanischen Hotels ist die Vorlage des Ausweisdokuments Pflicht.',
        prompt: 'Reiche deinen Pass und frage nach dem Frühstück.',
        expected: 'Aquí tiene mi pasaporte. ¿A qué hora se sirve el desayuno?',
        expectedDe: 'Hier ist mein Pass. Zu welcher Uhrzeit wird das Frühstück serviert?',
        options: [
          { text: 'Aquí tiene mi pasaporte. ¿A qué hora se sirve el desayuno?', de: 'Hier ist mein Pass. Um wie viel Uhr gibt es Frühstück?', correct: true },
          { text: 'No me gusta caminar bajo el sol.', de: 'Ich gehe nicht gern in der Sonne spazieren.', correct: false },
          { text: '¿Dónde puedo lavar mi coche?', de: 'Wo kann ich mein Auto waschen?', correct: false },
        ],
      },
      {
        npc: 'El desayuno es de siete y media a diez y media en el comedor. Aquí tiene su llave, habitación 304.',
        npcDe: 'Das Frühstück ist von 7:30 bis 10:30 Uhr im Speisesaal. Hier ist Ihr Schlüssel, Zimmer 304.',
        hint: '„Comedor" = Speisesaal; „llave" = Schlüssel (oft Schlüsselkarte).',
        prompt: 'Bedanke dich und frage nach dem WLAN-Passwort.',
        expected: 'Muchas gracias. ¿Cuál es la contraseña del wifi?',
        expectedDe: 'Vielen Dank. Was ist das WLAN-Passwort?',
        options: [
          { text: 'Muchas gracias. ¿Cuál es la contraseña del wifi?', de: 'Vielen Dank. Was ist das WLAN-Passwort?', correct: true },
          { text: 'Quiero cancelar mi vuelo.', de: 'Ich möchte meinen Flug stornieren.', correct: false },
          { text: 'Mañana hará mucho viento.', de: 'Morgen wird es sehr windig sein.', correct: false },
        ],
      },
    ],
  },
  {
    id: 'es-pharmacy',
    language: 'es',
    category: 'health',
    title: 'En la farmacia',
    situation: 'Tienes dolor de cabeza y fiebre y pides medicamentos en una farmacia madrileña.',
    icon: 'fa-kit-medical',
    npcName: 'Elena',
    npcRole: 'Farmacéutica',
    level: 'A2',
    turns: [
      {
        npc: '¡Hola! ¿En qué puedo ayudarte hoy?',
        npcDe: 'Hallo! Wie kann ich dir heute helfen?',
        hint: 'In Spanien duzen Apotheker Kunden jüngeren oder mittleren Alters oft freundlich.',
        prompt: 'Erkläre, dass du starke Kopfschmerzen und etwas Fieber hast.',
        expected: 'Hola, me duele mucho la cabeza y tengo un poco de fiebre.',
        expectedDe: 'Hallo, mein Kopf tut sehr weh und ich habe etwas Fieber.',
        options: [
          { text: 'Hola, me duele mucho la cabeza y tengo un poco de fiebre.', de: 'Hallo, mein Kopf tut sehr weh und ich habe etwas Fieber.', correct: true },
          { text: 'Quiero cambiar dinero a dólares.', de: 'Ich möchte Geld in Dollar tauschen.', correct: false },
          { text: 'Mi equipo favorito ganó el partido.', de: 'Meine Lieblingsmannschaft hat das Spiel gewonnen.', correct: false },
        ],
      },
      {
        npc: 'Te recomiendo este paracetamol de un gramo. ¿Eres alérgico a algún medicamento?',
        npcDe: 'Ich empfehle dir dieses 1-Gramm-Paracetamol. Bist du gegen irgendwelche Medikamente allergisch?',
        hint: '„Alérgico a" = allergisch gegen.',
        prompt: 'Antworte, dass du keine Allergien hast und frage nach der Einnahme.',
        expected: 'No tengo alergias. ¿Cuántas pastillas debo tomar al día?',
        expectedDe: 'Ich habe keine Allergien. Wie viele Tabletten soll ich am Tag nehmen?',
        options: [
          { text: 'No tengo alergias. ¿Cuántas pastillas debo tomar al día?', de: 'Ich habe keine Allergien. Wie viele Tabletten soll ich am Tag nehmen?', correct: true },
          { text: 'Prefiero cenar pescado esta noche.', de: 'Ich esse heute Abend lieber Fisch.', correct: false },
          { text: '¿Cuándo sale el próximo autobús?', de: 'Wann fährt der nächste Bus ab?', correct: false },
        ],
      },
      {
        npc: 'Toma un comprimido cada ocho horas con agua, siempre después de comer.',
        npcDe: 'Nimm alle acht Stunden eine Tablette mit Wasser, immer nach dem Essen.',
        hint: '„Cada ocho horas" = alle 8 Stunden (3-mal täglich).',
        prompt: 'Bedanke dich und frage nach dem Preis.',
        expected: 'Muchas gracias por el consejo. ¿Cuánto cuesta la caja?',
        expectedDe: 'Vielen Dank für den Rat. Wie viel kostet die Packung?',
        options: [
          { text: 'Muchas gracias por el consejo. ¿Cuánto cuesta la caja?', de: 'Vielen Dank für den Rat. Wie viel kostet die Packung?', correct: true },
          { text: 'No me acuerdo de mi dirección.', de: 'Ich erinnere mich nicht an meine Adresse.', correct: false },
          { text: 'Voy a dar un paseo por el parque.', de: 'Ich mache einen Spaziergang im Park.', correct: false },
        ],
      },
    ],
  },
  {
    id: 'es-station',
    language: 'es',
    category: 'travel',
    title: 'En la estación de tren de Atocha',
    situation: 'Compras un billete de tren de alta velocidad (AVE) para ir a Sevilla.',
    icon: 'fa-train',
    npcName: 'Mateo',
    npcRole: 'Taquillero',
    level: 'A2',
    turns: [
      {
        npc: '¡Buenos días! ¿Adónde desea viajar hoy?',
        npcDe: 'Guten Tag! Wohin möchten Sie heute reisen?',
        hint: 'AVE (Alta Velocidad Española) ist der spanische Hochgeschwindigkeitszug.',
        prompt: 'Sage, dass du eine Fahrkarte nach Sevilla möchtest.',
        expected: 'Buenos días, quisiera un billete de tren para Sevilla, por favor.',
        expectedDe: 'Guten Tag, ich hätte gerne eine Zugfahrkarte nach Sevilla, bitte.',
        options: [
          { text: 'Buenos días, quisiera un billete de tren para Sevilla, por favor.', de: 'Guten Tag, ich hätte gerne eine Zugfahrkarte nach Sevilla, bitte.', correct: true },
          { text: '¿A qué hora abre la catedral?', de: 'Um wie viel Uhr öffnet die Kathedrale?', correct: false },
          { text: 'He perdido mi teléfono móvil.', de: 'Ich habe mein Mobiltelefon verloren.', correct: false },
        ],
      },
      {
        npc: '¿Desea solo ida o ida y vuelta? El próximo tren sale a las diez y cuarto.',
        npcDe: 'Möchten Sie nur Hinfahrt oder Hin- und Rückfahrt? Der nächste Zug fährt um Viertel nach zehn.',
        hint: '„Solo ida" = einfache Fahrt; „ida y vuelta" = Hin- und Rückfahrt.',
        prompt: 'Wähle nur Hinfahrt mit einem Fensterplatz.',
        expected: 'Solo ida con asiento de ventana, por favor.',
        expectedDe: 'Nur Hinfahrt mit Fensterplatz, bitte.',
        options: [
          { text: 'Solo ida con asiento de ventana, por favor.', de: 'Nur Hinfahrt mit Fensterplatz, bitte.', correct: true },
          { text: 'Quiero devolver estos zapatos.', de: 'Ich möchte diese Schuhe zurückgeben.', correct: false },
          { text: 'El examen fue muy difícil.', de: 'Die Prüfung war sehr schwer.', correct: false },
        ],
      },
      {
        npc: 'Son cuarenta y cinco euros. Su tren sale de la vía número seis. ¡Buen viaje!',
        npcDe: 'Das macht 45 Euro. Ihr Zug fährt von Gleis Nummer sechs ab. Gute Reise!',
        hint: '„Vía" ist das Gleis im spanischen Bahnhof.',
        prompt: 'Bedanke dich und frage, ob der Zug pünktlich ist.',
        expected: 'Muchas gracias. ¿El tren sale puntual?',
        expectedDe: 'Vielen Dank. Fährt der Zug pünktlich ab?',
        options: [
          { text: 'Muchas gracias. ¿El tren sale puntual?', de: 'Vielen Dank. Fährt der Zug pünktlich ab?', correct: true },
          { text: 'Tengo que estudiar gramática.', de: 'Ich muss Grammatik lernen.', correct: false },
          { text: 'Me duele el brazo derecho.', de: 'Mein rechter Arm tut weh.', correct: false },
        ],
      },
    ],
  }
);

// 🇫🇷 FRANZÖSISCH
DIALOGUES.fr.push(
  {
    id: 'fr-directions',
    language: 'fr',
    category: 'travel',
    title: 'Demander son chemin à Paris',
    situation: 'Tu cherches la station de métro la plus proche près du musée du Louvre.',
    icon: 'fa-map-location-dot',
    npcName: 'Camille',
    npcRole: 'Passante',
    level: 'A1',
    turns: [
      {
        npc: 'Bonjour ! Vous cherchez quelque chose ? Vous avez l\'air un peu perdu.',
        npcDe: 'Guten Tag! Suchen Sie etwas? Sie wirken etwas verloren.',
        hint: '„Avoir l\'air" bedeutet „wirken / aussehen wie".',
        prompt: 'Entschuldige dich höflich und frage nach der nächsten Metrostation.',
        expected: 'Pardon madame, où se trouve la station de métro la plus proche ?',
        expectedDe: 'Entschuldigung die Dame, wo befindet sich die nächste Metro-Station?',
        options: [
          { text: 'Pardon madame, où se trouve la station de métro la plus proche ?', de: 'Entschuldigung die Dame, wo befindet sich die nächste Metro-Station?', correct: true },
          { text: 'J\'aime beaucoup écouter de la musique classique.', de: 'Ich höre sehr gern klassische Musik.', correct: false },
          { text: 'Combien coûte cette écharpe rouge ?', de: 'Wie viel kostet dieser rote Schal?', correct: false },
        ],
      },
      {
        npc: 'C\'est tout droit ! Continuez jusqu\'au carrefour, puis tournez à gauche devant la boulangerie.',
        npcDe: 'Es ist geradeaus! Gehen Sie bis zur Kreuzung, dann biegen Sie vor der Bäckerei links ab.',
        hint: '„Tout droit" = geradeaus; „à gauche" = links; „à droite" = rechts.',
        prompt: 'Frage, ob es weit zu Fuß ist.',
        expected: 'Est-ce que c\'est loin à pied d\'ici ?',
        expectedDe: 'Ist es weit zu Fuß von hier?',
        options: [
          { text: 'Est-ce que c\'est loin à pied d\'ici ?', de: 'Ist es weit zu Fuß von hier?', correct: true },
          { text: 'Quel est votre plat préféré ?', de: 'Was ist Ihr Lieblingsgericht?', correct: false },
          { text: 'Je n\'ai pas faim ce matin.', de: 'Ich habe heute Morgen keinen Hunger.', correct: false },
        ],
      },
      {
        npc: 'Non, pas du tout ! C\'est à seulement trois minutes de marche. Bonne visite !',
        npcDe: 'Nein, überhaupt nicht! Es sind nur drei Minuten zu Fuß. Viel Vergnügen beim Besuch!',
        hint: '„Pas du tout" = überhaupt nicht / gar nicht.',
        prompt: 'Bedanke dich herzlich und wünsche einen schönen Tag.',
        expected: 'Merci infiniment pour votre aide ! Bonne journée !',
        expectedDe: 'Unendlichen Dank für Ihre Hilfe! Einen schönen Tag!',
        options: [
          { text: 'Merci infiniment pour votre aide ! Bonne journée !', de: 'Unendlichen Dank für Ihre Hilfe! Einen schönen Tag!', correct: true },
          { text: 'Je dois aller dormir maintenant.', de: 'Ich muss jetzt schlafen gehen.', correct: false },
          { text: 'Le ciel est tout gris aujourd\'hui.', de: 'Der Himmel ist heute ganz grau.', correct: false },
        ],
      },
    ],
  },
  {
    id: 'fr-pharmacy',
    language: 'fr',
    category: 'health',
    title: 'À la pharmacie à Paris',
    situation: 'Tu as mal à la gorge et de la fièvre et demandes conseil au pharmacien.',
    icon: 'fa-kit-medical',
    npcName: 'Julien',
    npcRole: 'Pharmacien',
    level: 'A2',
    turns: [
      {
        npc: 'Bonjour ! Que puis-je faire pour vous aider ?',
        npcDe: 'Guten Tag! Was kann ich tun, um Ihnen zu helfen?',
        hint: 'In Frankreich tragen Apotheker einen weißen Kittel und beraten sehr ausführlich.',
        prompt: 'Erkläre deine Halsschmerzen und den Husten.',
        expected: 'Bonjour, j\'ai mal à la gorge et une forte toux depuis hier.',
        expectedDe: 'Guten Tag, ich habe Halsschmerzen und starken Husten seit gestern.',
        options: [
          { text: 'Bonjour, j\'ai mal à la gorge et une forte toux depuis hier.', de: 'Guten Tag, ich habe Halsschmerzen und starken Husten seit gestern.', correct: true },
          { text: 'Je cherche la gare Montparnasse.', de: 'Ich suche den Bahnhof Montparnasse.', correct: false },
          { text: 'Ce livre est très intéressant.', de: 'Dieses Buch ist sehr interessant.', correct: false },
        ],
      },
      {
        npc: 'Je vous conseille ce sirop contre la toux et des pastilles au miel. Avez-vous de la fièvre ?',
        npcDe: 'Ich rate Ihnen zu diesem Hustensaft und Honigpastillen. Haben Sie Fieber?',
        hint: '„Pastilles au miel" = Honig-Halspastillen.',
        prompt: 'Antworte, dass du etwas Fieber hast und Paracetamol möchtest.',
        expected: 'Oui, un peu. Avez-vous aussi du paracétamol, s\'il vous plaît ?',
        expectedDe: 'Ja, ein wenig. Haben Sie bitte auch Paracetamol?',
        options: [
          { text: 'Oui, un peu. Avez-vous aussi du paracétamol, s\'il vous plaît ?', de: 'Ja, ein wenig. Haben Sie bitte auch Paracetamol?', correct: true },
          { text: 'Je préfère boire un café noir.', de: 'Ich trinke lieber einen schwarzen Kaffee.', correct: false },
          { text: 'Mon train part à quinze heures.', de: 'Mein Zug fährt um 15 Uhr ab.', correct: false },
        ],
      },
      {
        npc: 'Prenez une cuillère de sirop matin et soir, et un comprimé toutes les six heures.',
        npcDe: 'Nehmen Sie einen Löffel Saft morgens und abends und eine Tablette alle sechs Stunden.',
        hint: '„Toutes les six heures" = alle sechs Stunden.',
        prompt: 'Bedanke dich und frage nach dem Gesamtbetrag.',
        expected: 'C\'est bien noté. Combien est-ce que je vous dois ?',
        expectedDe: 'Ist notiert. Wie viel schulde ich Ihnen?',
        options: [
          { text: 'C\'est bien noté. Combien est-ce que je vous dois ?', de: 'Ist notiert. Wie viel schulde ich Ihnen?', correct: true },
          { text: 'Où peut-on louer des vélos ?', de: 'Wo kann man Fahrräder mieten?', correct: false },
          { text: 'Le musée est magnifique.', de: 'Das Museum ist wunderschön.', correct: false },
        ],
      },
    ],
  },
  {
    id: 'fr-station',
    language: 'fr',
    category: 'travel',
    title: 'À la gare de Lyon',
    situation: 'Tu achètes un billet de TGV pour Nice au guichet de la gare.',
    icon: 'fa-train',
    npcName: 'Sophie',
    npcRole: 'Agente SNCF',
    level: 'A2',
    turns: [
      {
        npc: 'Bonjour ! Quelle est votre destination aujourd\'hui ?',
        npcDe: 'Guten Tag! Was ist heute Ihr Reiseziel?',
        hint: 'SNCF ist die französische Staatsbahn. TGV ist der französische Hochgeschwindigkeitszug.',
        prompt: 'Sage, dass du ein TGV-Ticket nach Nizza kaufen möchtest.',
        expected: 'Bonjour, je voudrais acheter un billet de TGV pour Nice, s\'il vous plaît.',
        expectedDe: 'Guten Tag, ich möchte bitte ein TGV-Ticket nach Nizza kaufen.',
        options: [
          { text: 'Bonjour, je voudrais acheter un billet de TGV pour Nice, s\'il vous plaît.', de: 'Guten Tag, ich möchte bitte ein TGV-Ticket nach Nizza kaufen.', correct: true },
          { text: 'Je cherche la clé de ma chambre.', de: 'Ich suche den Schlüssel für mein Zimmer.', correct: false },
          { text: 'Il va pleuvoir ce week-end.', de: 'Es wird am Wochenende regnen.', correct: false },
        ],
      },
      {
        npc: 'Souhaitez-vous un aller simple ou un aller-retour ? Préférez-vous une place côté fenêtre ?',
        npcDe: 'Wünschen Sie eine einfache Fahrt oder Hin- und Rückfahrt? Bevorzugen Sie einen Fensterplatz?',
        hint: '„Côté fenêtre" = am Fenster; „côté couloir" = am Gang.',
        prompt: 'Wähle eine einfache Fahrt mit Fensterplatz in der 2. Klasse.',
        expected: 'Un aller simple en seconde classe, côté fenêtre, s\'il vous plaît.',
        expectedDe: 'Eine einfache Fahrt in der 2. Klasse, am Fenster, bitte.',
        options: [
          { text: 'Un aller simple en seconde classe, côté fenêtre, s\'il vous plaît.', de: 'Eine einfache Fahrt in der 2. Klasse, am Fenster, bitte.', correct: true },
          { text: 'J\'ai oublié mon mot de passe.', de: 'Ich habe mein Passwort vergessen.', correct: false },
          { text: 'Le dîner était excellent.', de: 'Das Abendessen war ausgezeichnet.', correct: false },
        ],
      },
      {
        npc: 'Voilà votre billet ! Départ voie E à quatorze heures vingt. Bon voyage !',
        npcDe: 'Hier ist Ihre Fahrkarte! Abfahrt Gleis E um 14:20 Uhr. Gute Reise!',
        hint: 'In französischen Bahnhöfen heißen Gleise „voie", oft mit Buchstaben oder Zahlen.',
        prompt: 'Bedanke dich herzlich.',
        expected: 'Merci beaucoup pour votre aide ! Bonne journée !',
        expectedDe: 'Vielen Dank für Ihre Hilfe! Einen schönen Tag!',
        options: [
          { text: 'Merci beaucoup pour votre aide ! Bonne journée !', de: 'Vielen Dank für Ihre Hilfe! Einen schönen Tag!', correct: true },
          { text: 'Je ne comprends pas l\'exercice.', de: 'Ich verstehe die Übung nicht.', correct: false },
          { text: 'Il est déjà minuit.', de: 'Es ist schon Mitternacht.', correct: false },
        ],
      },
    ],
  }
);

// 🇸🇦 ARABISCH (100% Harakat & Romanization)
DIALOGUES.ar.push(
  {
    id: 'ar-hotel',
    language: 'ar',
    category: 'travel',
    title: 'فِي الْفُنْدُقِ (Im Hotel)',
    situation: 'Du kommst in einem Hotel in Kairo an und checkst an der Rezeption ein.',
    icon: 'fa-hotel',
    npcName: 'كَرِيم (Karim)',
    npcRole: 'مُوَظَّفُ الِاسْتِقْبَالِ (Rezeptionist)',
    level: 'A2',
    turns: [
      {
        npc: 'مَسَاءُ الْخَيْرِ! أَهْلًا بِكَ فِي فُنْدُقِ النِّيلِ. هَلْ لَدَيْكَ حَجْزٌ؟',
        npcDe: 'Guten Abend! Willkommen im Hotel Nil. Haben Sie eine Reservierung?',
        npcRoman: 'Masāʾu l-ḫayri! ʾAhlan bika fī funduqi n-Nīli. Hal ladayka ḥaǧzun?',
        hint: '„Masāʾu l-ḫayr" erwidert man mit „Masāʾu n-nūr" (Lichtvoller Abend).',
        prompt: 'Bestätige die Reservierung auf deinen Namen.',
        expected: 'مَسَاءَ النُّورِ، نَعَمْ لَدَيَّ حَجْزٌ بِاسْمِ سَمِير.',
        expectedDe: 'Guten Abend, ja, ich habe eine Reservierung auf den Namen Samir.',
        expectedRoman: 'Masāʾa n-nūri, naʿam ladayya ḥaǧzun bi-smi Samīr.',
        options: [
          { text: 'مَسَاءَ النُّورِ، نَعَمْ لَدَيَّ حَجْزٌ بِاسْمِ سَمِير.', de: 'Guten Abend, ja, ich habe eine Reservierung auf den Namen Samir.', correct: true },
          { text: 'أَنَا أَشْرَبُ قَهْوَةً سَاخِنَةً.', de: 'Ich trinke heißen Kaffee.', correct: false },
          { text: 'السَّفِينَةُ كَبِيرَةٌ جِدًّا.', de: 'Das Schiff ist sehr groß.', correct: false },
        ],
      },
      {
        npc: 'أَهْلًا وَسَهْلًا! هَلْ تُرِيدُ غُرْفَةً مَعَ إِطْلَالَةٍ عَلَى النَّهْرِ؟',
        npcDe: 'Herzlich willkommen! Möchten Sie ein Zimmer mit Blick auf den Fluss?',
        npcRoman: 'ʾAhlan wa-sahlan! Hal turīdu ġurfatan maʿa ʾiṭlālatin ʿalā n-nahri?',
        hint: '„ʾIṭlālah" bedeutet Aussicht / Blick.',
        prompt: 'Sage: „Ja, ein Zimmer mit Nilblick, bitte."',
        expected: 'نَعَمْ، أُرِيدُ غُرْفَةً مَعَ إِطْلَالَةٍ عَلَى النِّيلِ، مِنْ فَضْلِكَ.',
        expectedDe: 'Ja, ich möchte ein Zimmer mit Nilblick, bitte.',
        expectedRoman: 'Naʿam, ʾurīdu ġurfatan maʿa ʾiṭlālatin ʿalā n-Nīli, min faḍlika.',
        options: [
          { text: 'نَعَمْ، أُرِيدُ غُرْفَةً مَعَ إِطْلَالَةٍ عَلَى النِّيلِ، مِنْ فَضْلِكَ.', de: 'Ja, ich möchte ein Zimmer mit Nilblick, bitte.', correct: true },
          { text: 'الْقَمَرُ مُنِيرٌ فِي السَّمَاءِ.', de: 'Der Mond leuchtet am Himmel.', correct: false },
          { text: 'أَيْنَ قَمِيصِي الْأَزْرَقُ؟', de: 'Wo ist mein blaues Hemd?', correct: false },
        ],
      },
      {
        npc: 'تَفَضَّلْ مِفْتَاحَ الْغُرْفَةِ رَقْمِ ثَلَاثِمِئَةٍ، وَالْفُطُورُ فِي الطَّابِقِ الْأَوَّلِ.',
        npcDe: 'Bitte sehr der Schlüssel zu Zimmer 300, und das Frühstück ist im ersten Stock.',
        npcRoman: 'Tafaḍḍal miftāḥa l-ġurfati raqmi ṯalāṯimiʾatin, wa-l-fuṭūru fī ṭ-ṭābiqi l-ʾawwali.',
        hint: '„Al-fuṭūr" = Frühstück.',
        prompt: 'Bedanke dich und frage nach dem Internet-Passwort.',
        expected: 'شُكْرًا جَزِيلًا، مَا هِيَ كَلِمَةُ السِّرِّ لِلْإِنْتَرْنِت؟',
        expectedDe: 'Vielen Dank, was ist das Passwort für das Internet?',
        expectedRoman: 'Šukran ǧazīlan, mā hiya kalimatu s-sirri lil-ʾintarnit?',
        options: [
          { text: 'شُكْرًا جَزِيلًا، مَا هِيَ كَلِمَةُ السِّرِّ لِلْإِنْتَرْنِت؟', de: 'Vielen Dank, was ist das Passwort für das Internet?', correct: true },
          { text: 'لَا أَعْرِفُ كَيْفَ أَسْبَحُ.', de: 'Ich weiß nicht, wie man schwimmt.', correct: false },
          { text: 'الْيَوْمُ يَوْمُ الْجُمُعَةِ.', de: 'Heute ist Freitag.', correct: false },
        ],
      },
    ],
  },
  {
    id: 'ar-pharmacy',
    language: 'ar',
    category: 'health',
    title: 'فِي الصَّيْدَلِيَّةِ (In der Apotheke)',
    situation: 'Du hast Kopf- und Halsschmerzen und bittest die Apothekerin um Medizin.',
    icon: 'fa-kit-medical',
    npcName: 'نُور (Nur)',
    npcRole: 'صَيْدَلَانِيَّة (Apothekerin)',
    level: 'A2',
    turns: [
      {
        npc: 'مَرْحَبًا! كَيْفَ أَسْتَطِيعُ أَنْ أُسَاعِدَكَ الْيَوْمَ؟',
        npcDe: 'Hallo! Wie kann ich Ihnen heute helfen?',
        npcRoman: 'Marḥaban! Kayfa ʾastaṭīʿu ʾan ʾusāʿidaka l-yawma?',
        hint: '„Ṣaydaliyya" ist die Apotheke im Arabischen.',
        prompt: 'Erkläre, dass du starke Kopf- und Halsschmerzen hast.',
        expected: 'مَرْحَبًا، عِنْدِي صُدَاعٌ شَدِيدٌ وَأَلَمٌ فِي الْحَلْقِ.',
        expectedDe: 'Hallo, ich habe starke Kopfschmerzen und Schmerzen im Hals.',
        expectedRoman: 'Marḥaban, ʿindī ṣudāʿun šadīdun wa-ʾalamun fī l-ḥalqi.',
        options: [
          { text: 'مَرْحَبًا، عِنْدِي صُدَاعٌ شَدِيدٌ وَأَلَمٌ فِي الْحَلْقِ.', de: 'Hallo, ich habe starke Kopfschmerzen und Schmerzen im Hals.', correct: true },
          { text: 'أَيْنَ تَقَعُ مَدِينَةُ الْقَاهِرَةِ؟', de: 'Wo liegt die Stadt Kairo?', correct: false },
          { text: 'هَذَا الْكِتَابُ مُمْتِعٌ جِدًّا.', de: 'Dieses Buch ist sehr spannend.', correct: false },
        ],
      },
      {
        npc: 'سَلَامَتُكَ! هَلْ لَدَيْكَ حَرَارَةٌ مُرْتَفِعَةٌ أَوْ أَيُّ حَسَاسِيَّةٍ؟',
        npcDe: 'Gute Besserung! Haben Sie hohes Fieber oder eine Allergie?',
        npcRoman: 'Salāmatuka! Hal ladayka ḥarāratun murtafiʿatun ʾaw ʾayyu ḥasāsiyyatin?',
        hint: '„Salāmatuk" wünscht man Kranken (Heil und Genesung).',
        prompt: 'Antworte, dass du keine Allergie hast und nach der Medizin fragst.',
        expected: 'لَا، لَيْسَتْ لَدَيَّ حَسَاسِيَّةٌ. مَا هُوَ الْعِلَاجُ الْمُنَاسِبُ؟',
        expectedDe: 'Nein, ich habe keine Allergie. Was ist die passende Behandlung?',
        expectedRoman: 'Lā, laysat ladayya ḥasāsiyyatun. Mā huwa l-ʿilāǧu l-munāsibu?',
        options: [
          { text: 'لَا، لَيْسَتْ لَدَيَّ حَسَاسِيَّةٌ. مَا هُوَ الْعِلَاجُ الْمُنَاسِبُ؟', de: 'Nein, ich habe keine Allergie. Was ist die passende Behandlung?', correct: true },
          { text: 'أَنَا أُسَافِرُ بِالطَّائِرَةِ.', de: 'Ich reise mit dem Flugzeug.', correct: false },
          { text: 'الْبَحْرُ هَادِئٌ الْيَوْمَ.', de: 'Das Meer ist heute ruhig.', correct: false },
        ],
      },
      {
        npc: 'خُذْ هَذَا الْمُسَكِّنَ حَبَّةً وَاحِدَةً بَعْدَ الطَّعَامِ مَرَّتَيْنِ فِي الْيَوْمِ.',
        npcDe: 'Nehmen Sie dieses Schmerzmittel, eine Tablette nach dem Essen zweimal am Tag.',
        npcRoman: 'Ḫuḏ hāḏā l-musakkina ḥabbatan wāḥidatan baʿda ṭ-ṭaʿāmi marratayni fī l-yawmi.',
        hint: '„Marratayni fī l-yawm" = zweimal am Tag.',
        prompt: 'Bedanke dich und frage nach dem Preis.',
        expected: 'شُكْرًا لَكِ عَلَى النَّصِيحَةِ، كَمِ الثَّمَنُ؟',
        expectedDe: 'Danke dir für den Rat, wie viel ist der Preis?',
        expectedRoman: 'Šukran laki ʿalā n-naṣīḥati, kami ṯ-ṯamanu?',
        options: [
          { text: 'شُكْرًا لَكِ عَلَى النَّصِيحَةِ، كَمِ الثَّمَنُ؟', de: 'Danke dir für den Rat, wie viel ist der Preis?', correct: true },
          { text: 'أَنَا لَا أُحِبُّ الشِّتَاءَ.', de: 'Ich mag den Winter nicht.', correct: false },
          { text: 'هَلْ هَذَا مَطْعَمٌ إِيطَالِيٌّ؟', de: 'Ist das ein italienisches Restaurant?', correct: false },
        ],
      },
    ],
  },
  {
    id: 'ar-station',
    language: 'ar',
    category: 'travel',
    title: 'فِي مَحَطَّةِ الْقِطَارِ (Am Bahnhof)',
    situation: 'Du kaufst am Schalter eine Fahrkarte nach Alexandria.',
    icon: 'fa-train',
    npcName: 'أَحْمَد (Ahmad)',
    npcRole: 'مُوَظَّفُ التَّذَاكِرِ (Ticketverkäufer)',
    level: 'A2',
    turns: [
      {
        npc: 'صَبَاحُ الْخَيْرِ! إِلَى أَيِّ مَدِينَةٍ تُرِيدُ السَّفَرَ؟',
        npcDe: 'Guten Morgen! In welche Stadt möchten Sie reisen?',
        npcRoman: 'Ṣabāḥu l-ḫayri! ʾIlā ʾayyi madīnatin turīdu s-safara?',
        hint: '„Al-qiṭār" = der Zug; „Maḥaṭṭah" = der Bahnhof.',
        prompt: 'Sage, dass du eine Fahrkarte nach Alexandria möchtest.',
        expected: 'صَبَاحَ الْخَيْرِ، أُرِيدُ تَذْكِرَةً إِلَى مَدِينَةِ الْإِسْكَنْدَرِيَّةِ.',
        expectedDe: 'Guten Morgen, ich möchte eine Fahrkarte nach Alexandria.',
        expectedRoman: 'Ṣabāḥa l-ḫayri, ʾurīdu taḏkiratan ʾilā madīnati l-ʾIskandariyyati.',
        options: [
          { text: 'صَبَاحَ الْخَيْرِ، أُرِيدُ تَذْكِرَةً إِلَى مَدِينَةِ الْإِسْكَنْدَرِيَّةِ.', de: 'Guten Morgen, ich möchte eine Fahrkarte nach Alexandria.', correct: true },
          { text: 'أَيْنَ مَحَلُّ الْمَلَابِسِ؟', de: 'Wo ist das Kleidergeschäft?', correct: false },
          { text: 'هَذِهِ شَجَرَةٌ عَالِيَةٌ.', de: 'Dies ist ein hoher Baum.', correct: false },
        ],
      },
      {
        npc: 'هَلْ تُرِيدُ تَذْكِرَةَ ذَهَابٍ فَقَطْ أَمْ ذَهَابٍ وَإِيَابٍ؟',
        npcDe: 'Möchten Sie nur Hinfahrt oder Hin- und Rückfahrt?',
        npcRoman: 'Hal turīdu taḏkirata ḏahābin faqaṭ ʾam ḏahābin wa-ʾīyābin?',
        hint: '„Ḏahāb" = Hinfahrt; „ʾĪyāb" = Rückfahrt.',
        prompt: 'Wähle eine Hinfahrt in der ersten Klasse.',
        expected: 'تَذْكِرَةَ ذَهَابٍ فِي الدَّرَجَةِ الْأُولَى، مِنْ فَضْلِكَ.',
        expectedDe: 'Eine Hinfahrt in der ersten Klasse, bitte.',
        expectedRoman: 'Taḏkirata ḏahābin fī d-daraǧati l-ʾūlā, min faḍlika.',
        options: [
          { text: 'تَذْكِرَةَ ذَهَابٍ فِي الدَّرَجَةِ الْأُولَى، مِنْ فَضْلِكَ.', de: 'Eine Hinfahrt in der ersten Klasse, bitte.', correct: true },
          { text: 'سَأَشْتَرِي هَاتِفًا جَدِيدًا.', de: 'Ich werde ein neues Telefon kaufen.', correct: false },
          { text: 'الْغَدَاءُ كَانَ لَذِيذًا.', de: 'Das Mittagessen war köstlich.', correct: false },
        ],
      },
      {
        npc: 'حَسَنًا، الْقِطَارُ السَّرِيعُ يَنْطَلِقُ مِنَ الرَّصِيفِ رَقْمِ أَرْبَعَةٍ.',
        npcDe: 'Sehr gut, der Expresszug fährt von Bahnsteig Nummer vier ab.',
        npcRoman: 'Ḥasanan, al-qiṭāru s-sarīʿu yanṭaliqu mina r-raṣīfi raqmi ʾarbaʿatin.',
        hint: '„Ar-raṣīf" = Bahnsteig / Gleis.',
        prompt: 'Bedanke dich und frage nach der Fahrtdauer.',
        expected: 'شُكْرًا لَكَ! كَمْ سَاعَةً تَسْتَغْرِقُ الرِّحْلَةُ؟',
        expectedDe: 'Danke dir! Wie viele Stunden dauert die Reise?',
        expectedRoman: 'Šukran laka! Kam sāʿatan tastaġriqu r-riḥlatu?',
        options: [
          { text: 'شُكْرًا لَكَ! كَمْ سَاعَةً تَسْتَغْرِقُ الرِّحْلَةُ؟', de: 'Danke dir! Wie viele Stunden dauert die Reise?', correct: true },
          { text: 'أَيْنَ نَامَ الْقِطُّ؟', de: 'Wo hat die Katze geschlafen?', correct: false },
          { text: 'لَا أَعْرِفُ تَارِيخَ الْيَوْمِ.', de: 'Ich kenne das heutige Datum nicht.', correct: false },
        ],
      },
    ],
  }
);

// 🇨🇳 CHINESISCH
DIALOGUES.zh.push(
  {
    id: 'zh-hotel',
    language: 'zh',
    category: 'travel',
    title: '在酒店办理入住 (Hotel-Check-in)',
    situation: 'Du kommst in einem Hotel in Peking an und möchtest einchecken.',
    icon: 'fa-hotel',
    npcName: '张经理 (Herr Zhang)',
    npcRole: '大堂前台 (Rezeptionist)',
    level: 'A2',
    turns: [
      {
        npc: '您好，欢迎光临北京饭店！请问您有预订吗？',
        npcDe: 'Guten Tag, willkommen im Peking-Hotel! Haben Sie eine Reservierung?',
        npcRoman: 'Nǐ hǎo, huānyíng guānglín Běijīng Fàndiàn! Qǐngwèn nǐn yǒu yùdìng ma?',
        hint: '„Yùdìng" = Reservierung / Buchung.',
        prompt: 'Bestätige die Reservierung auf den Namen Schmidt.',
        expected: '您好，我有预订，名字叫施密特。',
        expectedDe: 'Guten Tag, ich habe eine Reservierung auf den Namen Schmidt.',
        expectedRoman: 'Nǐ hǎo, wǒ yǒu yùdìng, míngzi jiào Shīmìtè.',
        options: [
          { text: '您好，我有预订，名字叫施密特。', de: 'Guten Tag, ich habe eine Reservierung auf den Namen Schmidt.', correct: true },
          { text: '这辆自行车很漂亮。', de: 'Dieses Fahrrad ist sehr schön.', correct: false },
          { text: '今天天气很冷。', de: 'Heute ist das Wetter sehr kalt.', correct: false },
        ],
      },
      {
        npc: '找到了，是大床房住三晚。请出示您的护照办理登记。',
        npcDe: 'Gefunden, ein Doppelbettzimmer für drei Nächte. Bitte zeigen Sie Ihren Pass zur Registrierung.',
        npcRoman: 'Zhǎodào le, shì dàchuángfáng zhù sān wǎn. Qǐng chūshì nín de hùzhào bànlǐ dēngjì.',
        hint: '„Hùzhào" = Reisepass.',
        prompt: 'Reiche den Pass und frage nach den Frühstückszeiten.',
        expected: '这是我的护照。请问早餐是几点开始？',
        expectedDe: 'Hier ist mein Pass. Um wie viel Uhr beginnt das Frühstück?',
        expectedRoman: 'Zhè shì wǒ de hùzhào. Qǐngwèn zǎocān shì jǐ diǎn kāishǐ?',
        options: [
          { text: '这是我的护照。请问早餐是几点开始？', de: 'Hier ist mein Pass. Um wie viel Uhr beginnt das Frühstück?', correct: true },
          { text: '我想买两张电影票。', de: 'Ich möchte zwei Kinokarten kaufen.', correct: false },
          { text: '我不喜欢吃辣的菜。', de: 'Ich esse nicht gern scharfe Gerichte.', correct: false },
        ],
      },
      {
        npc: '早餐在二楼，早上七点到九点半。这是您的房卡，在八楼808。',
        npcDe: 'Frühstück ist im 2. Stock, 7:00 bis 9:30 Uhr. Hier ist Ihre Zimmerkarte, Zimmer 808 im 8. Stock.',
        npcRoman: 'Zǎocān zài èrlóu, zǎoshang qī diǎn dào jiǔ diǎn bàn. Zhè shì nín de fángkǎ, zài bālóu bābā líng.',
        hint: 'Die Zahl 8 gilt in China als absolute Glückszahl.',
        prompt: 'Bedanke dich und frage nach dem WLAN-Passwort.',
        expected: '太好了，非常感谢！请问无线网络密码是什么？',
        expectedDe: 'Sehr gut, vielen Dank! Was ist das WLAN-Passwort?',
        expectedRoman: 'Tài hǎo le, fēicháng gǎnxiè! Qǐngwèn wúxiàn wǎngluò mìmǎ shì shénme?',
        options: [
          { text: '太好了，非常感谢！请问无线网络密码是什么？', de: 'Sehr gut, vielen Dank! Was ist das WLAN-Passwort?', correct: true },
          { text: '明天我要去爬长城。', de: 'Morgen gehe ich auf die Große Mauer klettern.', correct: false },
          { text: '我的手表坏了。', de: 'Meine Uhr ist kaputt gegangen.', correct: false },
        ],
      },
    ],
  },
  {
    id: 'zh-pharmacy',
    language: 'zh',
    category: 'health',
    title: '在药店买药 (In der Apotheke)',
    situation: 'Du hast Kopfschmerzen und Erkältung und kaufst Medizin in der Apotheke.',
    icon: 'fa-kit-medical',
    npcName: '刘药师 (Apothekerin Liu)',
    npcRole: '执业药师 (Apothekerin)',
    level: 'A2',
    turns: [
      {
        npc: '您好！您身体哪里不舒服？我来帮您选药。',
        npcDe: 'Guten Tag! Wo fühlen Sie sich unwohl? Ich helfe Ihnen bei der Medikamentenauswahl.',
        npcRoman: 'Nǐ hǎo! Nín shēntǐ nǎlǐ bù shūfu? Wǒ lái bāng nín xuǎn yào.',
        hint: '„Bù shūfu" = unwohl / krank.',
        prompt: 'Erkläre, dass du Kopfschmerzen hast und deine Nase läuft.',
        expected: '您好，我头疼，而且流鼻涕，有点发烧。',
        expectedDe: 'Guten Tag, mein Kopf tut weh, meine Nase läuft und ich habe leichtes Fieber.',
        expectedRoman: 'Nǐ hǎo, wǒ tóuténg, érqiě liú bítì, yǒudiǎn fāshāo.',
        options: [
          { text: '您好，我头疼，而且流鼻涕，有点发烧。', de: 'Guten Tag, mein Kopf tut weh, meine Nase läuft und ich habe leichtes Fieber.', correct: true },
          { text: '我喜欢喝中国绿茶。', de: 'Ich trinke gern chinesischen Grüntee.', correct: false },
          { text: '地铁站离这里很远。', de: 'Die U-Bahn-Station ist weit weg von hier.', correct: false },
        ],
      },
      {
        npc: '这是感冒灵冲剂和退烧药。请问您对药物过敏吗？',
        npcDe: 'Hier ist Erkältungsgranulat und Fiebermittel. Sind Sie gegen Medikamente allergisch?',
        npcRoman: 'Zhè shì gǎnmàolíng chōngjì hé tuìshāoyào. Qǐngwèn nín duì yàowù guòmǐn ma?',
        hint: '„Guòmǐn" = allergisch.',
        prompt: 'Antworte, dass du nicht allergisch bist und frage nach der Einnahme.',
        expected: '我不过敏。请问这个药一天吃几次？',
        expectedDe: 'Ich bin nicht allergisch. Wie oft am Tag nimmt man dieses Medikament?',
        expectedRoman: 'Wǒ bù guòmǐn. Qǐngwèn zhège yào yì tiān chī jǐ cì?',
        options: [
          { text: '我不过敏。请问这个药一天吃几次？', de: 'Ich bin nicht allergisch. Wie oft am Tag nimmt man dieses Medikament?', correct: true },
          { text: '我想买一件新衣服。', de: 'Ich möchte ein neues Kleidungsstück kaufen.', correct: false },
          { text: '今天星期天不用上班。', de: 'Heute ist Sonntag, keine Arbeit nötig.', correct: false },
        ],
      },
      {
        npc: '温水冲服，一日三次，一次一袋，饭后喝。多喝水多休息！',
        npcDe: 'Mit warmem Wasser auflösen, dreimal täglich ein Beutel nach dem Essen. Viel trinken und ausruhen!',
        npcRoman: 'Wēnshuǐ chōngfú, yí rì sān cì, yí cì yí dài, fànhòu hē. Duō hē shuǐ duō xiūxi!',
        hint: '„Duō hē rèshuǐ" (Trink viel heißes Wasser) ist der universelle Rat in China.',
        prompt: 'Bedanke dich und bezahle.',
        expected: '好的，明白了，非常感谢您的帮助！',
        expectedDe: 'In Ordnung, verstanden, vielen Dank für Ihre Hilfe!',
        expectedRoman: 'Hǎo de, míngbai le, fēicháng gǎnxiè nín de bāngzhù!',
        options: [
          { text: '好的，明白了，非常感谢您的帮助！', de: 'In Ordnung, verstanden, vielen Dank für Ihre Hilfe!', correct: true },
          { text: '我要去超市买水果。', de: 'Ich gehe zum Supermarkt Obst kaufen.', correct: false },
          { text: '我昨天睡得很好。', de: 'Ich habe gestern sehr gut geschlafen.', correct: false },
        ],
      },
    ],
  },
  {
    id: 'zh-station',
    language: 'zh',
    category: 'travel',
    title: '在高铁站买票 (Am Bahnhof)',
    situation: 'Du kaufst am Schalter ein Ticket für den Schnellzug (Gaotie) nach Shanghai.',
    icon: 'fa-train',
    npcName: '陈售票员 (Ticketverkäufer Chen)',
    npcRole: '铁路售票员 (Schalterbeamter)',
    level: 'A2',
    turns: [
      {
        npc: '您好！请问您要买去哪里的车票？',
        npcDe: 'Guten Tag! Wohin möchten Sie eine Fahrkarte kaufen?',
        npcRoman: 'Nǐ hǎo! Qǐngwèn nín yào mǎi qù nǎlǐ de chēpiào?',
        hint: 'Gaotie-Züge erreichen in China Geschwindigkeiten bis 350 km/h.',
        prompt: 'Sage, dass du ein Gaotie-Ticket nach Shanghai kaufen möchtest.',
        expected: '您好，我想买一张今天去上海的高铁票。',
        expectedDe: 'Guten Tag, ich möchte ein Gaotie-Ticket für heute nach Shanghai kaufen.',
        expectedRoman: 'Nǐ hǎo, wǒ xiǎng mǎi yì zhāng jīntiān qù Shànghǎi de gāotiě piào.',
        options: [
          { text: '您好，我想买一张今天去上海的高铁票。', de: 'Guten Tag, ich möchte ein Gaotie-Ticket für heute nach Shanghai kaufen.', correct: true },
          { text: '我想去图书馆借书。', de: 'Ich möchte in die Bibliothek gehen um Bücher auszuleihen.', correct: false },
          { text: '我的护照过期了。', de: 'Mein Pass ist abgelaufen.', correct: false },
        ],
      },
      {
        npc: '下午两点有G13次列车，请问要二等座还是一等座？',
        npcDe: 'Um 14 Uhr fährt der Zug G13. Möchten Sie zweite oder erste Klasse?',
        npcRoman: 'Xiàwǔ liǎng diǎn yǒu G13 cì lièchē, qǐngwèn yào èrděngzuò háishì yìděngzuò?',
        hint: '„Èrděngzuò" = 2. Klasse; „Yìděngzuò" = 1. Klasse.',
        prompt: 'Wähle 2. Klasse am Fenster.',
        expected: '二等座，靠窗的位置，谢谢。',
        expectedDe: 'Zweite Klasse, Platz am Fenster, danke.',
        expectedRoman: 'Èrděngzuò, kàochuāng de wèizhì, xièxie.',
        options: [
          { text: '二等座，靠窗的位置，谢谢。', de: 'Zweite Klasse, Platz am Fenster, danke.', correct: true },
          { text: '我不吃鱼肉。', de: 'Ich esse kein Fischfleisch.', correct: false },
          { text: '现在几点几分？', de: 'Wie viel Uhr und Minute ist es jetzt?', correct: false },
        ],
      },
      {
        npc: '好的，票价五百五十三元。在二号站台上车，祝您旅途愉快！',
        npcDe: 'In Ordnung, 553 Yuan. Einsteigen an Bahnsteig 2. Schöne Reise!',
        npcRoman: 'Hǎo de, piàojià wǔbǎi wǔshísān yuán. Zài èr hào zhàntái shàngchē, zhù nín lǚtú yúkuài!',
        hint: '„Zhàntái" = Bahnsteig.',
        prompt: 'Bedanke dich und bezahle per QR-Code.',
        expected: '好的，谢谢！我用手机扫码支付。',
        expectedDe: 'In Ordnung, danke! Ich bezahle per Handy-Scan.',
        expectedRoman: 'Hǎo de, xièxie! Wǒ yòng shǒujī sǎomǎ zhīfù.',
        options: [
          { text: '好的，谢谢！我用手机扫码支付。', de: 'In Ordnung, danke! Ich bezahle per Handy-Scan.', correct: true },
          { text: '我的伞落在车上了。', de: 'Mein Regenschirm ist im Wagen liegen geblieben.', correct: false },
          { text: '明天是我的生日。', de: 'Morgen ist mein Geburtstag.', correct: false },
        ],
      },
    ],
  }
);

// 🇯🇵 JAPANISCH
DIALOGUES.ja.push(
  {
    id: 'ja-hotel',
    language: 'ja',
    category: 'travel',
    title: 'ホテルのチェックイン (Hotel-Check-in)',
    situation: 'Du kommst in einem Hotel in Tokio an und checkst an der Rezeption ein.',
    icon: 'fa-hotel',
    npcName: '山本 (Yamamoto)',
    npcRole: 'フロント係 (Rezeptionist)',
    level: 'A2',
    turns: [
      {
        npc: 'いらっしゃいませ！ご宿泊のご予約はございますでしょうか？',
        npcDe: 'Herzlich willkommen! Haben Sie eine Zimmerreservierung?',
        npcRoman: 'Irasshaimase! Goshukuhaku no goyoyaku wa gozaimasu deshō ka?',
        hint: '„Goyoyaku" ist die ehrerbietende Form von „yoyaku" (Reservierung).',
        prompt: 'Bestätige deine Reservierung auf den Namen Schmidt.',
        expected: 'はい、予約したシュミットと申します。',
        expectedDe: 'Ja, ich habe reserviert, mein Name ist Schmidt.',
        expectedRoman: 'Hai, yoyaku shita Shumitto to mōshimasu.',
        options: [
          { text: 'はい、予約したシュミットと申します。', de: 'Ja, ich habe reserviert, mein Name ist Schmidt.', correct: true },
          { text: '昨日は寿司を食べました。', de: 'Gestern habe ich Sushi gegessen.', correct: false },
          { text: '桜の花がとても綺麗です。', de: 'Die Kirschblüten sind sehr schön.', correct: false },
        ],
      },
      {
        npc: '確認いたしました。恐れ入りますが、パスポートのご提示をお願いできますか？',
        npcDe: 'Ich habe es bestätigt. Verzeihen Sie, dürfte ich um Ihren Reisepass bitten?',
        npcRoman: 'Kakunin itashimashita. Osoreirimasu ga, pasupōto no goteiji o onegai dekimasu ka?',
        hint: '„Osoreirimasu ga" leitet höfliche Bitten im Geschäftsjapanisch ein.',
        prompt: 'Reiche den Pass und frage nach dem Frühstück.',
        expected: 'はい、どうぞ。朝食は何時からですか？',
        expectedDe: 'Ja, bitte sehr. Ab wie viel Uhr gibt es Frühstück?',
        expectedRoman: 'Hai, dōzo. Chōshoku wa nan-ji kara desu ka?',
        options: [
          { text: 'はい、どうぞ。朝食は何時からですか？', de: 'Ja, bitte sehr. Ab wie viel Uhr gibt es Frühstück?', correct: true },
          { text: '猫を飼っています。', de: 'Ich halte eine Katze.', correct: false },
          { text: 'タクシーを呼んでください。', de: 'Bitte rufen Sie ein Taxi.', correct: false },
        ],
      },
      {
        npc: '朝食は一階で朝七時からでございます。こちらが部屋のカードキーです。',
        npcDe: 'Das Frühstück ist im Erdgeschoss ab sieben Uhr. Hier ist Ihre Zimmer-Schlüsselkarte.',
        npcRoman: 'Chōshoku wa ikkai de asa shichi-ji kara de gozaimasu. Kochira ga heya no kādokī desu.',
        hint: '„De gozaimasu" ist feinstes Keigo für „desu".',
        prompt: 'Bedanke dich und frage nach dem WLAN-Passwort.',
        expected: 'ありがとうございます。Wi-Fiのパスワードを教えていただけますか？',
        expectedDe: 'Vielen Dank. Könnten Sie mir das Wi-Fi-Passwort verraten?',
        expectedRoman: 'Arigatō gozaimasu. Wi-Fi no pasuwādo o oshiete itadakemasu ka?',
        options: [
          { text: 'ありがとうございます。Wi-Fiのパスワードを教えていただけますか？', de: 'Vielen Dank. Könnten Sie mir das Wi-Fi-Passwort verraten?', correct: true },
          { text: '私はスキーが下手です。', de: 'Ich kann schlecht Ski fahren.', correct: false },
          { text: '明日は雨でしょう。', de: 'Morgen wird es wohl regnen.', correct: false },
        ],
      },
    ],
  },
  {
    id: 'ja-pharmacy',
    language: 'ja',
    category: 'health',
    title: '薬局で相談する (In der Apotheke)',
    situation: 'Du hast Kopfschmerzen und Erkältungssymptome und kaufst Medizin in einer Kusuriya.',
    icon: 'fa-kit-medical',
    npcName: '高橋 (Takahashi)',
    npcRole: '薬剤師 (Apothekerin)',
    level: 'A2',
    turns: [
      {
        npc: 'こんにちは、どうされましたか？どのような症状でしょうか？',
        npcDe: 'Guten Tag, was ist passiert? Welche Symptome haben Sie?',
        npcRoman: 'Konnichiwa, dōsaremashita ka? Dono yō na shōjō deshō ka?',
        hint: '„Shōjō" = Symptome.',
        prompt: 'Erkläre, dass dein Kopf wehtut und du Halsschmerzen hast.',
        expected: '頭が痛くて、喉も痛いです。熱も少しあります。',
        expectedDe: 'Mein Kopf tut weh und der Hals auch. Ich habe auch leichtes Fieber.',
        expectedRoman: 'Atama ga itakute, nodo mo itai desu. Netsu mo sukoshi arimasu.',
        options: [
          { text: '頭が痛くて、喉も痛いです。熱も少しあります。', de: 'Mein Kopf tut weh und der Hals auch. Ich habe auch leichtes Fieber.', correct: true },
          { text: '海で泳ぐのが好きです。', de: 'Ich schwimme gern im Meer.', correct: false },
          { text: '本屋はどこにありますか？', de: 'Wo befindet sich die Buchhandlung?', correct: false },
        ],
      },
      {
        npc: 'こちらの総合感冒薬が効きますよ。眠くなる成分が入っていますが大丈夫ですか？',
        npcDe: 'Dieses Kombinations-Erkältungsmittel wirkt gut. Es macht etwas müde, ist das in Ordnung?',
        npcRoman: 'Kochira no sōgō kanbōyaku ga kikimasu yo. Nemuku naru seibun ga haitte imasu ga daijōbu desu ka?',
        hint: 'Viele japanische Erkältungsmittel weisen ausdrücklich auf Müdigkeit hin.',
        prompt: 'Antworte, dass es kein Problem ist und frage nach der Dosis.',
        expected: '大丈夫です。一日に何回飲めばいいですか？',
        expectedDe: 'Das ist in Ordnung. Wie oft am Tag soll ich es einnehmen?',
        expectedRoman: 'Daijōbu desu. Ichi-nichi ni nan-kai nomeba ii desu ka?',
        options: [
          { text: '大丈夫です。一日に何回飲めばいいですか？', de: 'Das ist in Ordnung. Wie oft am Tag soll ich es einnehmen?', correct: true },
          { text: '切手を三枚ください。', de: 'Bitte drei Briefmarken.', correct: false },
          { text: '私の靴は黒いです。', de: 'Meine Schuhe sind schwarz.', correct: false },
        ],
      },
      {
        npc: '食後に一回三錠、ぬるま湯でお飲みください。暖かくしてお大事にどうぞ！',
        npcDe: 'Nehmen Sie nach dem Essen 3 Tabletten mit lauwarmem Wasser. Halten Sie sich warm und gute Besserung!',
        npcRoman: 'Shokugo ni ikkai san-jō, nurumayu de onomi kudasai. Atatakaku shite odaiji ni dōzo!',
        hint: '„Odaiji ni" wünscht man in Japan allen Kranken (Gute Besserung).',
        prompt: 'Bedanke dich höflich.',
        expected: '分かりました。親切に教えていただき、ありがとうございます！',
        expectedDe: 'Verstanden. Danke, dass Sie es mir so freundlich erklärt haben!',
        expectedRoman: 'Wakarimashita. Shinsetsu ni oshiete itadaki, arigatō gozaimasu!',
        options: [
          { text: '分かりました。親切に教えていただき、ありがとうございます！', de: 'Verstanden. Danke, dass Sie es mir so freundlich erklärt haben!', correct: true },
          { text: '明後日また来ます。', de: 'Übermorgen komme ich wieder.', correct: false },
          { text: '傘を忘れました。', de: 'Ich habe den Regenschirm vergessen.', correct: false },
        ],
      },
    ],
  },
  {
    id: 'ja-station',
    language: 'ja',
    category: 'travel',
    title: '新幹線の切符売り場で (Am Shinkansen-Schalter)',
    situation: 'Du kaufst am Schalter des Bahnhofs Tokio eine Shinkansen-Fahrkarte nach Kyoto.',
    icon: 'fa-train',
    npcName: '鈴木 (Suzuki)',
    npcRole: '駅員 (Bahnhofsbeamter)',
    level: 'A2',
    turns: [
      {
        npc: 'いらっしゃいませ。どちらまでの切符をお探しでしょうか？',
        npcDe: 'Herzlich willkommen! Wohin möchten Sie eine Fahrkarte kaufen?',
        npcRoman: 'Irasshaimase. Dochira made no kippu o osagashi deshō ka?',
        hint: 'Am Schalter „Midori no Madoguchi" kauft man Shinkansen-Tickets.',
        prompt: 'Sage, dass du ein Ticket nach Kyoto möchtest.',
        expected: '京都までの新幹線の切符を一枚お願いします。',
        expectedDe: 'Bitte eine Shinkansen-Fahrkarte nach Kyoto.',
        expectedRoman: 'Kyōto made no Shinkansen no kippu o ichi-mai onegai shimasu.',
        options: [
          { text: '京都までの新幹線の切符を一枚お願いします。', de: 'Bitte eine Shinkansen-Fahrkarte nach Kyoto.', correct: true },
          { text: '映画館に行きたいです。', de: 'Ich möchte ins Kino gehen.', correct: false },
          { text: '財布を落としました。', de: 'Ich habe mein Portemonnaie verloren.', correct: false },
        ],
      },
      {
        npc: 'のぞみ号の指定席と自由席のどちらがよろしいですか？',
        npcDe: 'Möchten Sie im Nozomi-Express einen reservierten oder unreservierten Sitzplatz?',
        npcRoman: 'Nozomi-gō no shiteiseki to jiyūseki no dochira ga yoroshii desu ka?',
        hint: '„Shiteiseki" = reservierter Sitzplatz; „Jiyūseki" = freie Platzwahl.',
        prompt: 'Wähle einen reservierten Platz am Fenster.',
        expected: '指定席で、窓側の席をお願いできますか？',
        expectedDe: 'Reservierter Platz, dürfte ich um einen Fensterplatz bitten?',
        expectedRoman: 'Shiteiseki de, madogawa no seki o onegai dekimasu ka?',
        options: [
          { text: '指定席で、窓側の席をお願いできますか？', de: 'Reservierter Platz, dürfte ich um einen Fensterplatz bitten?', correct: true },
          { text: '私は日本語が話せません。', de: 'Ich kann kein Japanisch sprechen.', correct: false },
          { text: 'お腹がいっぱいです。', de: 'Ich bin satt.', correct: false },
        ],
      },
      {
        npc: '十四番線から十時十五分発です。どうぞ良い旅を！',
        npcDe: 'Abfahrt ist von Gleis 14 um 10:15 Uhr. Eine gute Reise!',
        npcRoman: 'Jū-yon-bansen kara jū-ji jū-go-fun hatsu desu. Dōzo yoi tabi o!',
        hint: '„Bansen" = Gleisnummer am Bahnsteig.',
        prompt: 'Bedanke dich herzlich.',
        expected: '詳しく教えていただき、ありがとうございました！',
        expectedDe: 'Vielen Dank, dass Sie es mir so ausführlich erklärt haben!',
        expectedRoman: 'Kuwashiku oshiete itadaki, arigatō gozaimashita!',
        options: [
          { text: '詳しく教えていただき、ありがとうございました！', de: 'Vielen Dank, dass Sie es mir so ausführlich erklärt haben!', correct: true },
          { text: '早く帰りたいです。', de: 'Ich möchte schnell nach Hause gehen.', correct: false },
          { text: 'ペンを貸してください。', de: 'Bitte leihen Sie mir einen Stift.', correct: false },
        ],
      },
    ],
  }
);

// 🇷🇺 RUSSISCH
DIALOGUES.ru.push(
  {
    id: 'ru-hotel',
    language: 'ru',
    category: 'travel',
    title: 'Заселение в гостиницу (Hotel-Check-in)',
    situation: 'Du kommst in einem Hotel in Sankt Petersburg an und checkst an der Rezeption ein.',
    icon: 'fa-hotel',
    npcName: 'Елена (Elena)',
    npcRole: 'Администратор (Rezeptionistin)',
    level: 'A2',
    turns: [
      {
        npc: 'Добрый день! Добро пожаловать в отель «Невский». У вас забронирован номер?',
        npcDe: 'Guten Tag! Willkommen im Hotel „Newskij". Haben Sie ein Zimmer reserviert?',
        npcRoman: 'Dobryy den! Dobro pozhalovat v otel Nevskiy. U vas zabronirovan nomer?',
        hint: '„Nomer" bedeutet im Hotel sowohl „Zimmer" als auch „Nummer".',
        prompt: 'Bestätige die Reservierung auf den Namen Schmidt.',
        expected: 'Добрый день! Да, у меня бронь на фамилию Шмидт.',
        expectedDe: 'Guten Tag! Ja, ich habe eine Reservierung auf den Namen Schmidt.',
        expectedRoman: 'Dobryy den! Da, u menya bron na familiyu Shmidt.',
        options: [
          { text: 'Добрый день! Да, у меня бронь на фамилию Шмидт.', de: 'Guten Tag! Ja, ich habe eine Reservierung auf den Namen Schmidt.', correct: true },
          { text: 'Я хочу купить тёплую шапку.', de: 'Ich möchte eine warme Mütze kaufen.', correct: false },
          { text: 'Вчера был очень сильный мороз.', de: 'Gestern war sehr starker Frost.', correct: false },
        ],
      },
      {
        npc: 'Отлично, стандартный двухместный номер на три ночи. Предъявите, пожалуйста, ваш паспорт.',
        npcDe: 'Ausgezeichnet, Standard-Doppelzimmer für drei Nächte. Zeigen Sie bitte Ihren Pass vor.',
        npcRoman: 'Otlichno, standartnyy dvukhmestnyy nomer na tri nochi. Predyavite, pozhaluysta, vash pasport.',
        hint: 'In russischen Hotels werden Pässe für die Gästeregistrierung eingescannt.',
        prompt: 'Reiche den Pass und frage nach dem Frühstück.',
        expected: 'Вот мой паспорт. Скажите, пожалуйста, во сколько завтрак?',
        expectedDe: 'Hier ist mein Pass. Sagen Sie bitte, um wie viel Uhr gibt es Frühstück?',
        expectedRoman: 'Vot moy pasport. Skazhite, pozhaluysta, vo skolko zavtrak?',
        options: [
          { text: 'Вот мой паспорт. Скажите, пожалуйста, во сколько завтрак?', de: 'Hier ist mein Pass. Sagen Sie bitte, um wie viel Uhr gibt es Frühstück?', correct: true },
          { text: 'Я забыл номер своего телефона.', de: 'Ich habe meine Telefonnummer vergessen.', correct: false },
          { text: 'Мне не нравится эта музыка.', de: 'Mir gefällt diese Musik nicht.', correct: false },
        ],
      },
      {
        npc: 'Завтрак с восьми до одиннадцати в ресторане. Вот ваша электронная карта от номера 315.',
        npcDe: 'Frühstück ist von acht bis elf im Restaurant. Hier ist Ihre Schlüsselkarte für Zimmer 315.',
        npcRoman: 'Zavtrak s vosmi do odinnadtsati v restorane. Vot vasha elektronnaya karta ot nomera 315.',
        hint: '„Karta" = Schlüsselkarte.',
        prompt: 'Bedanke dich und frage nach dem WLAN-Passwort.',
        expected: 'Большое спасибо! Какой пароль от беспроводного интернета?',
        expectedDe: 'Vielen Dank! Was ist das Passwort für das WLAN?',
        expectedRoman: 'Bolshoye spasibo! Kakoy parol ot besprovodnogo interneta?',
        options: [
          { text: 'Большое спасибо! Какой пароль от беспроводного интернета?', de: 'Vielen Dank! Was ist das Passwort für das WLAN?', correct: true },
          { text: 'Завтра я пойду в Эрмитаж.', de: 'Morgen gehe ich in die Eremitage.', correct: false },
          { text: 'У меня сломался чемодан.', de: 'Mein Koffer ist kaputt gegangen.', correct: false },
        ],
      },
    ],
  },
  {
    id: 'ru-pharmacy',
    language: 'ru',
    category: 'health',
    title: 'В аптеке (In der Apotheke)',
    situation: 'Du hast Erkältungsbeschwerden und suchst Medikamente in einer Apotheke.',
    icon: 'fa-kit-medical',
    npcName: 'Ольга (Olga)',
    npcRole: 'Фармацевт (Apothekerin)',
    level: 'A2',
    turns: [
      {
        npc: 'Здравствуйте! На что вы жалуетесь? Чем могу помочь?',
        npcDe: 'Guten Tag! Worüber klagen Sie? Womit kann ich helfen?',
        npcRoman: 'Zdravstvuyte! Na chto vy zhaluyetes? Chem mogu pomoch?',
        hint: '„Apteka" erkennt man in Russland am grünen Kreuz.',
        prompt: 'Erkläre, dass du Halsschmerzen hast und dir kalt ist.',
        expected: 'Здравствуйте! У меня сильно болит горло и температура.',
        expectedDe: 'Guten Tag! Mein Hals tut stark weh und ich habe Temperatur.',
        expectedRoman: 'Zdravstvuyte! U menya silno bolit gorlo i temperatura.',
        options: [
          { text: 'Здравствуйте! У меня сильно болит горло и температура.', de: 'Guten Tag! Mein Hals tut stark weh und ich habe Temperatur.', correct: true },
          { text: 'Где находится ближайшая станция метро?', de: 'Wo befindet sich die nächste Metro-Station?', correct: false },
          { text: 'Я потерял свои ключи от дома.', de: 'Ich habe meine Hausschlüssel verloren.', correct: false },
        ],
      },
      {
        npc: 'Вот эффективный спрей для горла и растворимый парацетамол. У вас есть аллергия?',
        npcDe: 'Hier ist ein wirksames Halsspray und lösliches Paracetamol. Haben Sie Allergien?',
        npcRoman: 'Vot effektivnyy sprey dlya gorla i rastvorimyy paratsetamol. U vas yest allergiya?',
        hint: '„Allergiya" = Allergie.',
        prompt: 'Antworte, dass du keine Allergie hast und frage nach der Dosis.',
        expected: 'Нет, аллергии нет. Как правильно принимать эти лекарства?',
        expectedDe: 'Nein, keine Allergie. Wie nimmt man diese Medikamente richtig ein?',
        expectedRoman: 'Net, allergii net. Kak pravilno prinimat eti lekarstva?',
        options: [
          { text: 'Нет, аллергии нет. Как правильно принимать эти лекарства?', de: 'Nein, keine Allergie. Wie nimmt man diese Medikamente richtig ein?', correct: true },
          { text: 'Я очень люблю кататься на коньках.', de: 'Ich fahre sehr gern Schlittschuh.', correct: false },
          { text: 'Сколько стоит этот сувенир?', de: 'Wie viel kostet dieses Souvenir?', correct: false },
        ],
      },
      {
        npc: 'Спрей трижды в день, а порошок разводить в тёплой воде. Выздоравливайте скорей!',
        npcDe: 'Das Spray dreimal täglich, und das Pulver in warmem Wasser auflösen. Werden Sie schnell gesund!',
        npcRoman: 'Sprey trizhdy v den, a poroshok razvodit v tyoploy vode. Vyzdoravlivayte skorey!',
        hint: '„Vyzdoravlivayte" = Gute Besserung!',
        prompt: 'Bedanke dich und bezahle mit Karte.',
        expected: 'Спасибо за помощь! Можно оплатить банковской картой?',
        expectedDe: 'Danke für die Hilfe! Kann ich mit Bankkarte bezahlen?',
        expectedRoman: 'Spasibo za pomoshch! Mozhno oplatit bankovskoy kartoy?',
        options: [
          { text: 'Спасибо за помощь! Можно оплатить банковской картой?', de: 'Danke für die Hilfe! Kann ich mit Bankkarte bezahlen?', correct: true },
          { text: 'Сегодня очень ветрено.', de: 'Heute ist es sehr windig.', correct: false },
          { text: 'Я ищу русскую баню.', de: 'Ich suche eine russische Banja.', correct: false },
        ],
      },
    ],
  },
  {
    id: 'ru-station',
    language: 'ru',
    category: 'travel',
    title: 'На Московском вокзале (Am Bahnhof)',
    situation: 'Du kaufst am Schalter ein Ticket für den Schnellzug Sapsan nach Moskau.',
    icon: 'fa-train',
    npcName: 'Виктор (Viktor)',
    npcRole: 'Кассир (Kassierer)',
    level: 'A2',
    turns: [
      {
        npc: 'Добрый день! До какой станции вам оформить билет?',
        npcDe: 'Guten Tag! Bis zu welcher Station soll ich Ihnen eine Fahrkarte ausstellen?',
        npcRoman: 'Dobryy den! Do kakoy stantsii vam oformit bilet?',
        hint: 'Der Schnellzug „Sapsan" verbindet St. Petersburg und Moskau in unter 4 Stunden.',
        prompt: 'Sage, dass du ein Ticket für den Sapsan nach Moskau möchtest.',
        expected: 'Добрый день, мне нужен один билет на «Сапсан» до Москвы.',
        expectedDe: 'Guten Tag, ich brauche eine Fahrkarte für den Sapsan nach Moskau.',
        expectedRoman: 'Dobryy den, mne nuzhen odin bilet na Sapsan do Moskvy.',
        options: [
          { text: 'Добрый день, мне нужен один билет на «Сапсан» до Москвы.', de: 'Guten Tag, ich brauche eine Fahrkarte für den Sapsan nach Moskau.', correct: true },
          { text: 'Я хочу заказать пиццу.', de: 'Ich möchte eine Pizza bestellen.', correct: false },
          { text: 'У меня разрядился телефон.', de: 'Mein Telefon-Akku ist leer.', correct: false },
        ],
      },
      {
        npc: 'Есть поезд на четырнадцать часов. Эконом-класс или бизнес-класс?',
        npcDe: 'Es gibt einen Zug um 14 Uhr. Economy- oder Business-Klasse?',
        npcRoman: 'Yest poyezd na chetyrnadtsat chasov. Ekonom-klass ili biznes-klass?',
        hint: '„Ekonom-klass" = 2. Klasse; „Mesto u okna" = Platz am Fenster.',
        prompt: 'Wähle Economy-Klasse am Fenster.',
        expected: 'Эконом-класс, место у окна, пожалуйста.',
        expectedDe: 'Economy-Klasse, Platz am Fenster, bitte.',
        expectedRoman: 'Ekonom-klass, mesto u okna, pozhaluysta.',
        options: [
          { text: 'Эконом-класс, место у окна, пожалуйста.', de: 'Economy-Klasse, Platz am Fenster, bitte.', correct: true },
          { text: 'Я не люблю пить чай.', de: 'Ich trinke nicht gern Tee.', correct: false },
          { text: 'Какой сегодня день недели?', de: 'Welcher Wochentag ist heute?', correct: false },
        ],
      },
      {
        npc: 'Билет готов. Поезд отправляется с третьей платформы. Счастливого пути!',
        npcDe: 'Die Fahrkarte ist fertig. Der Zug fährt von Bahnsteig drei ab. Gute Reise!',
        npcRoman: 'Bilet gotov. Poyezd otpravlyayetsya s tretyey platformy. Schastlivogo puti!',
        hint: '„Schastlivogo puti" = Gute Reise / Gute Fahrt.',
        prompt: 'Bedanke dich und wünsche einen schönen Tag.',
        expected: 'Большое спасибо за помощь! Всего доброго!',
        expectedDe: 'Vielen Dank für die Hilfe! Alles Gute!',
        expectedRoman: 'Bolshoye spasibo za pomoshch! Vsego dobrogo!',
        options: [
          { text: 'Большое спасибо за помощь! Всего доброго!', de: 'Vielen Dank für die Hilfe! Alles Gute!', correct: true },
          { text: 'Я забыл свой паспорт дома.', de: 'Ich habe meinen Pass zu Hause vergessen.', correct: false },
          { text: 'На улице пошёл дождь.', de: 'Draußen hat es angefangen zu regnen.', correct: false },
        ],
      },
    ],
  }
);

// 🇵🇹 PORTUGIESISCH
DIALOGUES.pt.push(
  {
    id: 'pt-hotel',
    language: 'pt',
    category: 'travel',
    title: 'No Hotel em Lisboa (Check-in)',
    situation: 'Du kommst in einem Hotel in Lissabon an und checkst an der Rezeption ein.',
    icon: 'fa-hotel',
    npcName: 'Manuel',
    npcRole: 'Rececionista',
    level: 'A2',
    turns: [
      {
        npc: 'Boa tarde! Bem-vindo ao Hotel Tejo. Tem reserva connosco?',
        npcDe: 'Guten Tag! Willkommen im Hotel Tejo. Haben Sie eine Reservierung bei uns?',
        hint: '„Boa tarde" sagt man ab 12 Uhr bis zum Sonnenuntergang.',
        prompt: 'Bestätige die Reservierung auf den Namen Schmidt.',
        expected: 'Boa tarde, sim, tenho uma reserva em nome de Schmidt.',
        expectedDe: 'Guten Tag, ja, ich habe eine Reservierung auf den Namen Schmidt.',
        options: [
          { text: 'Boa tarde, sim, tenho uma reserva em nome de Schmidt.', de: 'Guten Tag, ja, ich habe eine Reservierung auf den Namen Schmidt.', correct: true },
          { text: 'O fado é uma música muito triste.', de: 'Fado ist eine sehr traurige Musik.', correct: false },
          { text: 'A ponte 25 de Abril é muito comprida.', de: 'Die Brücke des 25. April ist sehr lang.', correct: false },
        ],
      },
      {
        npc: 'Com certeza! Quarto duplo com vista para o rio. Pode mostrar-me o seu passaporte?',
        npcDe: 'Sicherlich! Doppelzimmer mit Flussblick. Können Sie mir Ihren Pass zeigen?',
        hint: '„Vista para o rio" = Blick auf den Tejo.',
        prompt: 'Reiche den Pass und frage nach den Frühstückszeiten.',
        expected: 'Aqui está o passaporte. A que horas é servido o pequeno-almoço?',
        expectedDe: 'Hier ist der Pass. Zu welcher Zeit wird das Frühstück serviert?',
        options: [
          { text: 'Aqui está o passaporte. A que horas é servido o pequeno-almoço?', de: 'Hier ist der Pass. Zu welcher Zeit wird das Frühstück serviert?', correct: true },
          { text: 'Gosto de comer sardinhas assadas.', de: 'Ich esse gern gegrillte Sardinen.', correct: false },
          { text: 'O elétrico 28 está muito cheio.', de: 'Die Straßenbahn 28 ist sehr voll.', correct: false },
        ],
      },
      {
        npc: 'O pequeno-almoço é das sete e meia às dez e meia. O seu quarto é o 402. Tenha uma boa estadia!',
        npcDe: 'Das Frühstück ist von 7:30 bis 10:30 Uhr. Ihr Zimmer ist die 402. Einen schönen Aufenthalt!',
        hint: '„Pequeno-almoço" = Frühstück in Portugal (in Brasilien: café da manhã).',
        prompt: 'Bedanke dich und frage nach dem WLAN-Passwort.',
        expected: 'Muito obrigado! Qual é a palavra-passe da rede Wi-Fi?',
        expectedDe: 'Vielen Dank! Was ist das Passwort für das WLAN?',
        options: [
          { text: 'Muito obrigado! Qual é a palavra-passe da rede Wi-Fi?', de: 'Vielen Dank! Was ist das Passwort für das WLAN?', correct: true },
          { text: 'A praia fica longe daqui.', de: 'Der Strand liegt weit von hier.', correct: false },
          { text: 'Não tenho moedas no bolso.', de: 'Ich habe keine Münzen in der Tasche.', correct: false },
        ],
      },
    ],
  },
  {
    id: 'pt-pharmacy',
    language: 'pt',
    category: 'health',
    title: 'Na Farmácia em Lisboa',
    situation: 'Du hast Halsschmerzen und Fieber und bittest die Apothekerin um Rat.',
    icon: 'fa-kit-medical',
    npcName: 'Teresa',
    npcRole: 'Farmacêutica',
    level: 'A2',
    turns: [
      {
        npc: 'Olá, boa tarde! Em que posso ajudar?',
        npcDe: 'Hallo, guten Tag! Wobei kann ich helfen?',
        hint: 'Apotheken sind in Portugal durch ein grünes Kreuz mit einer Schlange gekennzeichnet.',
        prompt: 'Erkläre deine Hals- und Kopfschmerzen.',
        expected: 'Boa tarde, tenho muitas dores de garganta e febre alta.',
        expectedDe: 'Guten Tag, ich habe starke Halsschmerzen und hohes Fieber.',
        options: [
          { text: 'Boa tarde, tenho muitas dores de garganta e febre alta.', de: 'Guten Tag, ich habe starke Halsschmerzen und hohes Fieber.', correct: true },
          { text: 'Onde se apanha o barco para Cacilhas?', de: 'Wo nimmt man die Fähre nach Cacilhas?', correct: false },
          { text: 'Este museu tem pinturas antigas.', de: 'Dieses Museum hat alte Gemälde.', correct: false },
        ],
      },
      {
        npc: 'Recomendo este anti-inflamatório e pastilhas para chupar. Tem alguma alergia a medicamentos?',
        npcDe: 'Ich empfehle diesen Entzündungshemmer und Lutschpastillen. Haben Sie Arzneimittelallergien?',
        hint: '„Pastilhas para chupar" = Lutschpastillen.',
        prompt: 'Antworte, dass du keine Allergien hast und nach der Dosierung fragst.',
        expected: 'Não tenho nenhuma alergia. Como devo tomar os comprimidos?',
        expectedDe: 'Ich habe keine Allergie. Wie soll ich die Tabletten einnehmen?',
        options: [
          { text: 'Não tenho nenhuma alergia. Como devo tomar os comprimidos?', de: 'Ich habe keine Allergie. Wie soll ich die Tabletten einnehmen?', correct: true },
          { text: 'Quero alugar uma prancha de surf.', de: 'Ich möchte ein Surfbrett mieten.', correct: false },
          { text: 'O almoço foi bastante caro.', de: 'Das Mittagessen war ziemlich teuer.', correct: false },
        ],
      },
      {
        npc: 'Tome um comprimido de oito em oito horas com água após as refeições. As melhoras!',
        npcDe: 'Nehmen Sie alle acht Stunden eine Tablette mit Wasser nach den Mahlzeiten. Gute Besserung!',
        hint: '„As melhoras" ist der portugiesische Genesungswunsch (Gute Besserung).',
        prompt: 'Bedanke dich und frage nach dem Gesamtpreis.',
        expected: 'Muito obrigado pela explicação! Quanto é tudo?',
        expectedDe: 'Vielen Dank für die Erklärung! Wie viel macht alles zusammen?',
        options: [
          { text: 'Muito obrigado pela explicação! Quanto é tudo?', de: 'Vielen Dank für die Erklärung! Wie viel macht alles zusammen?', correct: true },
          { text: 'Amanhã vou visitar o castelo.', de: 'Morgen besuche ich die Burg.', correct: false },
          { text: 'Está um dia muito ensolarado.', de: 'Es ist ein sehr sonniger Tag.', correct: false },
        ],
      },
    ],
  },
  {
    id: 'pt-station',
    language: 'pt',
    category: 'travel',
    title: 'Na Estação de Santa Apolónia',
    situation: 'Du kaufst eine Fahrkarte für den Schnellzug Alfa Pendular nach Porto.',
    icon: 'fa-train',
    npcName: 'Pedro',
    npcRole: 'Bilheteiro',
    level: 'A2',
    turns: [
      {
        npc: 'Bom dia! Para onde gostaria de viajar hoje?',
        npcDe: 'Guten Morgen! Wohin möchten Sie heute reisen?',
        hint: 'Der „Alfa Pendular" ist Portugals schnellster Neigezug.',
        prompt: 'Sage, dass du eine Fahrkarte nach Porto möchtest.',
        expected: 'Bom dia, queria comprar um bilhete para o Porto no Alfa Pendular.',
        expectedDe: 'Guten Tag, ich möchte eine Fahrkarte nach Porto für den Alfa Pendular kaufen.',
        options: [
          { text: 'Bom dia, queria comprar um bilhete para o Porto no Alfa Pendular.', de: 'Guten Tag, ich möchte eine Fahrkarte nach Porto für den Alfa Pendular kaufen.', correct: true },
          { text: 'Preciso de trocar esta nota.', de: 'Ich muss diesen Geldschein wechseln.', correct: false },
          { text: 'O café está muito quente.', de: 'Der Kaffee ist sehr heiß.', correct: false },
        ],
      },
      {
        npc: 'Temos partida às dez horas e trinta. Prefere em classe turística ou conforto?',
        npcDe: 'Wir haben Abfahrt um 10:30 Uhr. Bevorzugen Sie Touristenklasse oder Conforto (1. Klasse)?',
        hint: '„Classe conforto" entspricht der ersten Klasse.',
        prompt: 'Wähle Touristenklasse mit Fensterplatz.',
        expected: 'Em classe turística com lugar à janela, por favor.',
        expectedDe: 'In der Touristenklasse mit Fensterplatz, bitte.',
        options: [
          { text: 'Em classe turística com lugar à janela, por favor.', de: 'In der Touristenklasse mit Fensterplatz, bitte.', correct: true },
          { text: 'Não gosto de viajar de avião.', de: 'Ich fliege nicht gern.', correct: false },
          { text: 'O meu relógio parou.', de: 'Meine Uhr ist stehen geblieben.', correct: false },
        ],
      },
      {
        npc: 'Aqui tem o bilhete. O comboio parte da linha número dois. Boa viagem até ao Porto!',
        npcDe: 'Hier ist Ihre Fahrkarte. Der Zug fährt von Gleis zwei ab. Gute Reise nach Porto!',
        hint: '„Comboio" = Zug in Portugal (in Brasilien: trem).',
        prompt: 'Bedanke dich und wünsche einen schönen Tag.',
        expected: 'Muito obrigado pela sua ajuda! Tenha um bom dia!',
        expectedDe: 'Vielen Dank für Ihre Hilfe! Haben Sie einen schönen Tag!',
        options: [
          { text: 'Muito obrigado pela sua ajuda! Tenha um bom dia!', de: 'Vielen Dank für Ihre Hilfe! Haben Sie einen schönen Tag!', correct: true },
          { text: 'Perdi o meu bilhete de metro.', de: 'Ich habe mein Metroticket verloren.', correct: false },
          { text: 'Vou comprar um jornal diário.', de: 'Ich kaufe eine Tageszeitung.', correct: false },
        ],
      },
    ],
  }
);

// 🇬🇷 GRIECHISCH
DIALOGUES.el.push(
  {
    id: 'el-hotel',
    language: 'el',
    category: 'travel',
    title: 'Στο ξενοδοχείο (Hotel-Check-in)',
    situation: 'Du kommst in einem Hotel in Athen an und checkst an der Rezeption ein.',
    icon: 'fa-hotel',
    npcName: 'Γιώργος (Giorgos)',
    npcRole: 'Υπάλληλος υποδοχής (Rezeptionist)',
    level: 'A2',
    turns: [
      {
        npc: 'Καλησπέρα σας! Καλώς ήρθατε στο ξενοδοχείο μας. Έχετε κράτηση;',
        npcDe: 'Guten Abend! Willkommen in unserem Hotel. Haben Sie eine Reservierung?',
        npcRoman: 'Kalispera sas! Kalos irthate sto xenodocheio mas. Echete kratisi?',
        hint: '„Kalispera" sagt man ab dem Nachmittag.',
        prompt: 'Bestätige die Reservierung auf den Namen Schmidt.',
        expected: 'Καλησπέρα σας, ναι, έχω κάνει κράτηση στο όνομα Σμιτ.',
        expectedDe: 'Guten Abend, ja, ich habe eine Reservierung auf den Namen Schmidt gemacht.',
        expectedRoman: 'Kalispera sas, nai, echo kanei kratisi sto onoma Smit.',
        options: [
          { text: 'Καλησπέρα σας, ναι, έχω κάνει κράτηση στο όνομα Σμιτ.', de: 'Guten Abend, ja, ich habe eine Reservierung auf den Namen Schmidt gemacht.', correct: true },
          { text: 'Μου αρέσει η ελληνική σαλάτα.', de: 'Ich mag griechischen Salat.', correct: false },
          { text: 'Η θάλασσα είναι πολύ ζεστή.', de: 'Das Meer ist sehr warm.', correct: false },
        ],
      },
      {
        npc: 'Βεβαίως! Ένα δίκλινο δωμάτιο για τρεις νύχτες. Μου δίνετε το διαβατήριό σας;',
        npcDe: 'Gewiss! Ein Doppelzimmer für drei Nächte. Geben Sie mir Ihren Reisepass?',
        npcRoman: 'Vevaios! Ena diklino domatio gia treis nychtes. Mou dinete to diavatirio sas?',
        hint: '„Diklino domatio" = Doppelzimmer.',
        prompt: 'Reiche den Pass und frage nach dem Frühstück.',
        expected: 'Ορίστε το διαβατήριό μου. Τι ώρα σερβίρεται το πρωινό;',
        expectedDe: 'Bitte sehr mein Pass. Zu welcher Uhrzeit wird das Frühstück serviert?',
        expectedRoman: 'Oriste to diavatirio mou. Ti ora serviratai to proino?',
        options: [
          { text: 'Ορίστε το διαβατήριό μου. Τι ώρα σερβίρεται το πρωινό;', de: 'Bitte sehr mein Pass. Um wie viel Uhr gibt es Frühstück?', correct: true },
          { text: 'Δεν ξέρω πού είναι το λιμάνι.', de: 'Ich weiß nicht, wo der Hafen ist.', correct: false },
          { text: 'Θέλω να νοικιάσω ένα μηχανάκι.', de: 'Ich möchte einen Roller mieten.', correct: false },
        ],
      },
      {
        npc: 'Το πρωινό είναι στον τελευταίο όροφο από τις επτά έως τις δέκα, με θέα στην Ακρόπολη!',
        npcDe: 'Das Frühstück ist im obersten Stockwerk von sieben bis zehn Uhr, mit Blick auf die Akropolis!',
        npcRoman: 'To proino einai ston teleutaio orofo apo tis epta eos tis deka, me thea stin Akropoli!',
        hint: 'Viele Athener Hotels haben Dachterrassen mit Akropolisblick.',
        prompt: 'Bedanke dich und frage nach dem WLAN-Code.',
        expected: 'Υπέροχα, ευχαριστώ πολύ! Ποιος είναι ο κωδικός για το Wi-Fi;',
        expectedDe: 'Wunderbar, vielen Dank! Was ist das Passwort für das Wi-Fi?',
        expectedRoman: 'Yperocha, efcharisto poly! Poios einai o kodikos gia to Wi-Fi?',
        options: [
          { text: 'Υπέροχα, ευχαριστώ πολύ! Ποιος είναι ο κωδικός για το Wi-Fi;', de: 'Wunderbar, vielen Dank! Was ist das Passwort für das Wi-Fi?', correct: true },
          { text: 'Έχει πολύ αέρα σήμερα.', de: 'Es ist heute sehr windig.', correct: false },
          { text: 'Το λεωφορείο άργησε.', de: 'Der Bus hat Verspätung.', correct: false },
        ],
      },
    ],
  },
  {
    id: 'el-pharmacy',
    language: 'el',
    category: 'health',
    title: 'Στο φαρμακείο (In der Apotheke)',
    situation: 'Du hast Kopfschmerzen und bittest die Apothekerin in Athen um Schmerzmittel.',
    icon: 'fa-kit-medical',
    npcName: 'Μαρία (Maria)',
    npcRole: 'Φαρμακοποιός (Apothekerin)',
    level: 'A2',
    turns: [
      {
        npc: 'Γεια σας! Πώς μπορώ να σας εξυπηρετήσω;',
        npcDe: 'Hallo! Wie kann ich Ihnen behilflich sein?',
        npcRoman: 'Geia sas! Pos boro na sas exypiretiso?',
        hint: 'Griechische Apotheken sind mit einem grünen Malteserkreuz gekennzeichnet.',
        prompt: 'Erkläre, dass du heftige Kopfschmerzen und etwas Fieber hast.',
        expected: 'Γεια σας, έχω έντονο πονοκέφαλο και λίγο πυρετό από το πρωί.',
        expectedDe: 'Hallo, ich habe heftige Kopfschmerzen und leichtes Fieber seit dem Morgen.',
        expectedRoman: 'Geia sas, echo entono ponokefalo kai ligo pyreto apo to proi.',
        options: [
          { text: 'Γεια σας, έχω έντονο πονοκέφαλο και λίγο πυρετό από το πρωί.', de: 'Hallo, ich habe heftige Kopfschmerzen und leichtes Fieber seit dem Morgen.', correct: true },
          { text: 'Πού μπορώ να αλλάξω χρήματα;', de: 'Wo kann ich Geld wechseln?', correct: false },
          { text: 'Ο καιρός είναι πολύ ζεστός.', de: 'Das Wetter ist sehr heiß.', correct: false },
        ],
      },
      {
        npc: 'Σας προτείνω παρακεταμόλη. Έχετε κάποια αλλεργία σε φάρμακα;',
        npcDe: 'Ich empfehle Ihnen Paracetamol. Haben Sie eine Allergie gegen Medikamente?',
        npcRoman: 'Sas proteino paraketamoli. Echete kapoia allergia se farmaka?',
        hint: '„Allergia se farmaka" = Medikamentenallergie.',
        prompt: 'Antworte, dass du keine Allergien hast und frage nach der Dosierung.',
        expected: 'Όχι, δεν έχω καμία αλλεργία. Πόσα χάπια μπορώ να παίρνω;',
        expectedDe: 'Nein, ich habe keine Allergie. Wie viele Tabletten darf ich nehmen?',
        expectedRoman: 'Ochi, den echo kamia allergia. Posa chapia boro na pairno?',
        options: [
          { text: 'Όχι, δεν έχω καμία αλλεργία. Πόσα χάπια μπορώ να παίρνω;', de: 'Nein, ich habe keine Allergie. Wie viele Tabletten darf ich nehmen?', correct: true },
          { text: 'Θέλω να πάω στην παραλία.', de: 'Ich möchte an den Strand gehen.', correct: false },
          { text: 'Το μουσείο είναι κλειστό.', de: 'Das Museum ist geschlossen.', correct: false },
        ],
      },
      {
        npc: 'Ένα χάπι κάθε οκτώ ώρες μετά το φαγητό με άφθονο νερό. Περαστικά σας!',
        npcDe: 'Eine Tablette alle acht Stunden nach dem Essen mit reichlich Wasser. Gute Besserung!',
        npcRoman: 'Ena chapi kathe okto ores meta to fagito me afthono nero. Perastika sas!',
        hint: '„Perastika" ist die herzliche griechische Genesungsformel.',
        prompt: 'Bedanke dich herzlich und frage nach dem Preis.',
        expected: 'Σας ευχαριστώ πολύ για τη βοήθεια! Πόσο κοστίζει;',
        expectedDe: 'Ich danke Ihnen sehr für die Hilfe! Wie viel kostet es?',
        expectedRoman: 'Sas efcharisto poly gia ti voitheia! Poso kostizei?',
        options: [
          { text: 'Σας ευχαριστώ πολύ για τη βοήθεια! Πόσο κοστίζει;', de: 'Ich danke Ihnen sehr für die Hilfe! Wie viel kostet es?', correct: true },
          { text: 'Δεν μου αρέσει το ψάρι.', de: 'Ich mag keinen Fisch.', correct: false },
          { text: 'Αύριο θα πάρω το αεροπλάνο.', de: 'Morgen nehme ich das Flugzeug.', correct: false },
        ],
      },
    ],
  },
  {
    id: 'el-station',
    language: 'el',
    category: 'travel',
    title: 'Στον σιδηροδρομικό σταθμό (Am Bahnhof)',
    situation: 'Du kaufst am Schalter des Bahnhofs Athen eine Fahrkarte nach Thessaloniki.',
    icon: 'fa-train',
    npcName: 'Κώστας (Kostas)',
    npcRole: 'Υπάλληλος εισιτηρίων (Schalterbeamter)',
    level: 'A2',
    turns: [
      {
        npc: 'Καλημέρα σας! Για ποια πόλη θα θέλατε εισιτήριο;',
        npcDe: 'Guten Tag! Für welche Stadt hätten Sie gerne eine Fahrkarte?',
        npcRoman: 'Kalimera sas! Gia poia poli tha thelate eisitirio?',
        hint: '„Eisitirio" = Fahrkarte / Ticket.',
        prompt: 'Sage, dass du eine Fahrkarte nach Thessaloniki kaufen möchtest.',
        expected: 'Καλημέρα, θα ήθελα ένα εισιτήριο για τη Θεσσαλονίκη, παρακαλώ.',
        expectedDe: 'Guten Tag, ich hätte gerne eine Fahrkarte nach Thessaloniki, bitte.',
        expectedRoman: 'Kalimera, tha ithela ena eisitirio gia ti Thessaloniki, parakalo.',
        options: [
          { text: 'Καλημέρα, θα ήθελα ένα εισιτήριο για τη Θεσσαλονίκη, παρακαλώ.', de: 'Guten Tag, ich hätte gerne eine Fahrkarte nach Thessaloniki, bitte.', correct: true },
          { text: 'Πεινάω και θέλω να φάω.', de: 'Ich habe Hunger und will essen.', correct: false },
          { text: 'Έχασα τα γυαλιά μου.', de: 'Ich habe meine Brille verloren.', correct: false },
        ],
      },
      {
        npc: 'Θέλετε απλή μετάβαση ή μετ\' επιστροφής; Το γρήγορο τρένο αναχωρεί στις δέκα.',
        npcDe: 'Möchten Sie eine einfache Fahrt oder Hin- und Rückfahrt? Der Schnellzug fährt um zehn ab.',
        npcRoman: 'Thelete apli metavasi i met epistrofis? To grigoro treno anachorei stis deka.',
        hint: '„Apli metavasi" = einfache Fahrt; „Met\' epistrofis" = Hin- und Rückfahrt.',
        prompt: 'Wähle einfache Fahrt mit Fensterplatz.',
        expected: 'Απλή μετάβαση στη δεύτερη θέση, δίπλα στο παράθυρο.',
        expectedDe: 'Einfache Fahrt in der 2. Klasse, neben dem Fenster.',
        expectedRoman: 'Apli metavasi sti defteri thesi, dipla sto parathyro.',
        options: [
          { text: 'Απλή μετάβαση στη δεύτερη θέση, δίπλα στο παράθυρο.', de: 'Einfache Fahrt in der 2. Klasse, neben dem Fenster.', correct: true },
          { text: 'Δεν έχω αρκετά λεφτά.', de: 'Ich habe nicht genug Geld.', correct: false },
          { text: 'Το ξενοδοχείο είναι πολύ μακριά.', de: 'Das Hotel ist sehr weit weg.', correct: false },
        ],
      },
      {
        npc: 'Ορίστε το εισιτήριό σας. Το τρένο φεύγει από την αποβάθρα δύο. Καλό ταξίδι!',
        npcDe: 'Hier ist Ihr Ticket. Der Zug fährt von Bahnsteig zwei ab. Gute Reise!',
        npcRoman: 'Oriste to eisitirio sas. To treno fevgei apo tin apovathra dyo. Kalo taxidi!',
        hint: '„Apovathra" = Bahnsteig / Gleis.',
        prompt: 'Bedanke dich herzlich.',
        expected: 'Σας ευχαριστώ πάρα πολύ! Καλή σας μέρα!',
        expectedDe: 'Vielen herzlichen Dank! Einen schönen Tag noch!',
        expectedRoman: 'Sas efcharisto para poly! Kali sas mera!',
        options: [
          { text: 'Σας ευχαριστώ πάρα πολύ! Καλή σας μέρα!', de: 'Vielen herzlichen Dank! Einen schönen Tag noch!', correct: true },
          { text: 'Πρέπει να αγοράσω παπούτσια.', de: 'Ich muss Schuhe kaufen.', correct: false },
          { text: 'Το νερό είναι παγωμένο.', de: 'Das Wasser ist eiskalt.', correct: false },
        ],
      },
    ],
  }
);

// 📜 LATEIN
DIALOGUES.la.push(
  {
    id: 'la-medicus',
    language: 'la',
    category: 'health',
    title: 'Apud medicum (Beim Arzt)',
    situation: 'Du besuchst einen römischen Heilkundigen wegen Fieber und bittest um Arznei.',
    icon: 'fa-kit-medical',
    npcName: 'Galenus',
    npcRole: 'Medicus (Heiler)',
    level: 'A2',
    turns: [
      {
        npc: 'Salve, amice! Quid te affligit? Doletne caput an corpus?',
        npcDe: 'Sei gegrüßt, Freund! Was quält dich? Schmerzt der Kopf oder der Leib?',
        hint: 'Römische Ärzte („medici") waren oft griechischer Herkunft und hoch angesehen.',
        prompt: 'Erkläre, dass dein Kopf heftig schmerzt und du Fieber hast.',
        expected: 'Salve, medice! Caput mihi vehementer dolet et febrim habeo.',
        expectedDe: 'Sei gegrüßt, Arzt! Mein Kopf schmerzt heftig und ich habe Fieber.',
        options: [
          { text: 'Salve, medice! Caput mihi vehementer dolet et febrim habeo.', de: 'Sei gegrüßt, Arzt! Mein Kopf schmerzt heftig und ich habe Fieber.', correct: true },
          { text: 'Navis in portu manet.', de: 'Das Schiff bleibt im Hafen.', correct: false },
          { text: 'Milites urbem custodiunt.', de: 'Die Soldaten bewachen die Stadt.', correct: false },
        ],
      },
      {
        npc: 'Corpus tuum calidum est. Cupisne potionem ex herbis paratam ad dolorem levandum?',
        npcDe: 'Dein Körper ist heiß. Wünschst du einen aus Kräutern bereiteten Trank zur Schmerzlinderung?',
        hint: '„Potio" = Heiltrank / Arzneitrank.',
        prompt: 'Antworte, dass du den Kräutertrank wünschst.',
        expected: 'Ita vero, potionem salutarem peto.',
        expectedDe: 'Ja fürwahr, ich bitte um den heilsamen Trank.',
        options: [
          { text: 'Ita vero, potionem salutarem peto.', de: 'Ja fürwahr, ich bitte um den heilsamen Trank.', correct: true },
          { text: 'Gladius meus fractus est.', de: 'Mein Schwert ist zerbrochen.', correct: false },
          { text: 'Canis in horto latrat.', de: 'Der Hund bellt im Garten.', correct: false },
        ],
      },
      {
        npc: 'Sume hunc succum bis in die cum aqua pura. Requiesce in lecto et vale!',
        npcDe: 'Nimm diesen Saft zweimal täglich mit reinem Wasser. Ruhe im Bett und leb wohl!',
        hint: '„Vale" bedeutet wörtlich „sei gesund / stark".',
        prompt: 'Bedanke dich beim Heiler und verabschiede dich.',
        expected: 'Gratias tibi ago, medice bone! Vale!',
        expectedDe: 'Dank sage ich dir, guter Arzt! Leb wohl!',
        options: [
          { text: 'Gratias tibi ago, medice bone! Vale!', de: 'Dank sage ich dir, guter Arzt! Leb wohl!', correct: true },
          { text: 'Agricola terram arat.', de: 'Der Bauer pflügt das Land.', correct: false },
          { text: 'Sole occidente domum eo.', de: 'Bei Sonnenuntergang gehe ich heim.', correct: false },
        ],
      },
    ],
  },
  {
    id: 'la-mansio',
    language: 'la',
    category: 'travel',
    title: 'In mansione (In der römischen Herberge)',
    situation: 'Du suchst auf der Via Appia eine Unterkunft für die Nacht.',
    icon: 'fa-hotel',
    npcName: 'Tiberius',
    npcRole: 'Caupo (Herbergswirt)',
    level: 'A2',
    turns: [
      {
        npc: 'Salvete, hospites! Num cubiculum ad noctem quaeritis in mansione mea?',
        npcDe: 'Seid gegrüßt, Gäste! Sucht ihr etwa eine Kammer für die Nacht in meiner Herberge?',
        hint: '„Mansio" war die offizielle Raststätte entlang der römischen Reichsstraßen.',
        prompt: 'Antworte, dass du ein Zimmer für die Nacht und Abendessen suchst.',
        expected: 'Salve! Cubiculum quietum et cenam quaerimus.',
        expectedDe: 'Sei gegrüßt! Wir suchen ein ruhiges Zimmer und Abendessen.',
        options: [
          { text: 'Salve! Cubiculum quietum et cenam quaerimus.', de: 'Sei gegrüßt! Wir suchen ein ruhiges Zimmer und Abendessen.', correct: true },
          { text: 'Arbor alta in silva stat.', de: 'Ein hoher Baum steht im Wald.', correct: false },
          { text: 'Senatores in curia disputant.', de: 'Die Senatoren streiten in der Kurie.', correct: false },
        ],
      },
      {
        npc: 'Habeo cubiculum mundum et pulchrum. Cena calida cum pane et carne mox aderit.',
        npcDe: 'Ich habe eine saubere und schöne Kammer. Warmes Essen mit Brot und Fleisch wird bald bereitstehen.',
        hint: '„Mundus" = sauber / gepflegt.',
        prompt: 'Frage nach dem Preis für die Übernachtung.',
        expected: 'Optime! Quantum constat cubiculum pro nocte?',
        expectedDe: 'Bestens! Wie viel kostet das Zimmer für eine Nacht?',
        options: [
          { text: 'Optime! Quantum constat cubiculum pro nocte?', de: 'Bestens! Wie viel kostet das Zimmer für eine Nacht?', correct: true },
          { text: 'Sol lucet in caelo.', de: 'Die Sonne scheint am Himmel.', correct: false },
          { text: 'Non timeo hostes.', de: 'Ich fürchte die Feinde nicht.', correct: false },
        ],
      },
      {
        npc: 'Quattuor sestertii tantum. Servus meus sarcinas vestras portabit. Bonam noctem!',
        npcDe: 'Nur vier Sesterzen. Mein Sklave wird euer Gepäck tragen. Eine gute Nacht!',
        hint: 'Der Sesterz („sestertius") war die Hauptrechenwährung in Rom.',
        prompt: 'Übergib das Geld und wünsche eine gute Nacht.',
        expected: 'Accipe pecuniam! Sit tibi nox tranquilla!',
        expectedDe: 'Nimm das Geld! Möge dir eine ruhige Nacht beschieden sein!',
        options: [
          { text: 'Accipe pecuniam! Sit tibi nox tranquilla!', de: 'Nimm das Geld! Möge dir eine ruhige Nacht beschieden sein!', correct: true },
          { text: 'Lupus in monte ululat.', de: 'Der Wolf heult auf dem Berg.', correct: false },
          { text: 'Nescio quid dixeris.', de: 'Ich weiß nicht, was du gesagt hast.', correct: false },
        ],
      },
    ],
  }
);

// ── Validierung aller Dialoge ────────────────────────────────────
let errors = 0;
let totalScenarios = 0;
let totalTurns = 0;

for (const [lang, scens] of Object.entries(DIALOGUES)) {
  totalScenarios += scens.length;
  for (const s of scens) {
    if (!s.id || !s.language || !s.category || !s.title || !s.situation || !Array.isArray(s.turns) || s.turns.length === 0) {
      console.error(`Invalid scenario: ${s.id}`);
      errors++;
    }
    for (const t of s.turns) {
      totalTurns++;
      if (!t.npc || !t.npcDe || !t.prompt || !t.expected || !t.expectedDe || !Array.isArray(t.options)) {
        console.error(`Invalid turn in ${s.id}:`, t);
        errors++;
      }
      const correct = t.options.filter(o => o.correct);
      if (correct.length !== 1) {
        console.error(`Options without exactly 1 correct in ${s.id}:`, t.options);
        errors++;
      }
    }
  }
}

if (errors > 0) {
  console.error(`Validation failed with ${errors} errors!`);
  process.exit(1);
}

console.log(`Validated ${totalScenarios} scenarios across 10 languages (${totalTurns} total turns). Zero errors!`);

// Datei schreiben
const fileHeader = `// js/data/dialogues.js
// Authentische Alltagsdialoge für alle 10 Zielsprachen (v63).
// Jedes Szenario enthält lebensnahe Verzweigungen, Kulturhinweise, Kategorien (food, travel, health)
// und Optionen für Multiple-Choice & Spracheingabe.

export const DIALOGUES = ${JSON.stringify(DIALOGUES, null, 2)};
`;

fs.writeFileSync('./js/data/dialogues.js', fileHeader, 'utf-8');
console.log('Successfully written ./js/data/dialogues.js');
