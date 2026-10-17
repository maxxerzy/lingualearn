// js/data/dialogues.js
// Authentische Alltagsdialoge für alle 10 Zielsprachen (v63).
// Jedes Szenario enthält lebensnahe Verzweigungen, Kulturhinweise, Kategorien (food, travel, health)
// und Optionen für Multiple-Choice & Spracheingabe.

export const DIALOGUES = {
  "da": [
    {
      "id": "da-cafe",
      "language": "da",
      "title": "Im Café in Kopenhagen",
      "situation": "Du betrittst ein gemütliches Kopenhagener Café und möchtest eine Erfrischung bestellen.",
      "icon": "fa-mug-hot",
      "npcName": "Frederik",
      "npcRole": "Barista",
      "level": "A1",
      "turns": [
        {
          "npc": "Hej! Velkommen til. Hvad må det være?",
          "npcDe": "Hallo! Willkommen. Was darf es sein?",
          "hint": "„Hvad må det være?\" ist die typische freundliche Begrüßung am Tresen.",
          "prompt": "Bestelle einen Kaffee und ein dänisches Gebäck (Wienerbrød).",
          "expected": "En kaffe og et wienerbrød, tak.",
          "expectedDe": "Einen Kaffee und ein Gebäck, bitte.",
          "options": [
            {
              "text": "En kaffe og et wienerbrød, tak.",
              "de": "Einen Kaffee und ein Gebäck, bitte.",
              "correct": true
            },
            {
              "text": "Hvor er banegården?",
              "de": "Wo ist der Bahnhof?",
              "correct": false
            },
            {
              "text": "Nej tak, jeg sover her.",
              "de": "Nein danke, ich schlafe hier.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Helt sikkert! Vil du have mælk eller sukker i kaffen?",
          "npcDe": "Sehr gerne! Möchtest du Milch oder Zucker in den Kaffee?",
          "hint": "„Helt sikkert\" bedeutet wörtlich „ganz sicher\", wird aber wie „gerne/sofort\" gebraucht.",
          "prompt": "Antworte, dass du nur etwas Milch möchtest.",
          "expected": "Bare lidt mælk, tak.",
          "expectedDe": "Nur etwas Milch, bitte.",
          "options": [
            {
              "text": "Bare lidt mælk, tak.",
              "de": "Nur etwas Milch, bitte.",
              "correct": true
            },
            {
              "text": "Jeg vil gerne købe en cykel.",
              "de": "Ich möchte gerne ein Fahrrad kaufen.",
              "correct": false
            },
            {
              "text": "Mange tak for regningen.",
              "de": "Vielen Dank für die Rechnung.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Værsgo, her er din kaffe og kage. Det bliver femogfyrre kroner.",
          "npcDe": "Bitte sehr, hier sind dein Kaffee und Kuchen. Das macht 45 Kronen.",
          "hint": "„Værsgo\" sagt man beim Überreichen von Gegenständen (wie „bitte schön\").",
          "prompt": "Frage, ob du mit Karte bezahlen kannst.",
          "expected": "Kan jeg betale med kort?",
          "expectedDe": "Kann ich mit Karte zahlen?",
          "options": [
            {
              "text": "Kan jeg betale med kort?",
              "de": "Kann ich mit Karte zahlen?",
              "correct": true
            },
            {
              "text": "Hvor gammel er du?",
              "de": "Wie alt bist du?",
              "correct": false
            },
            {
              "text": "Det regner meget i dag.",
              "de": "Es regnet heute viel.",
              "correct": false
            }
          ]
        }
      ],
      "category": "food"
    },
    {
      "id": "da-directions",
      "language": "da",
      "title": "Nach dem Weg fragen",
      "situation": "Du suchst den Kopenhagener Hauptbahnhof und fragst einen Passanten.",
      "icon": "fa-map-location-dot",
      "npcName": "Mette",
      "npcRole": "Passantin",
      "level": "A1",
      "turns": [
        {
          "npc": "Hej! Kan jeg hjælpe dig med noget?",
          "npcDe": "Hallo! Kann ich dir bei etwas helfen?",
          "hint": "Dänen duzen sich fast ausnahmslos – „du\" ist allgegenwärtig und höflich.",
          "prompt": "Entschuldige dich höflich und frage nach dem Hauptbahnhof.",
          "expected": "Undskyld, hvor er hovedbanegården?",
          "expectedDe": "Entschuldigung, wo ist der Hauptbahnhof?",
          "options": [
            {
              "text": "Undskyld, hvor er hovedbanegården?",
              "de": "Entschuldigung, wo ist der Hauptbahnhof?",
              "correct": true
            },
            {
              "text": "Jeg har et nyt pas.",
              "de": "Ich habe einen neuen Reisepass.",
              "correct": false
            },
            {
              "text": "Godnat, sov godt!",
              "de": "Gute Nacht, schlaf gut!",
              "correct": false
            }
          ]
        },
        {
          "npc": "Den er lige herovre! Gå ligeud og drej til højre ved lyskrydset.",
          "npcDe": "Er ist gleich hier drüben! Geh geradeaus und biege an der Ampel rechts ab.",
          "hint": "„Ligeud\" (geradeaus) und „til højre\" (nach rechts) sind die wichtigsten Wegbeschreibungs-Wörter.",
          "prompt": "Frage, ob es weit zu Fuß ist.",
          "expected": "Er det langt til fods?",
          "expectedDe": "Ist es weit zu Fuß?",
          "options": [
            {
              "text": "Er det langt til fods?",
              "de": "Ist es weit zu Fuß?",
              "correct": true
            },
            {
              "text": "Hvad koster en sandwich?",
              "de": "Was kostet ein Sandwich?",
              "correct": false
            },
            {
              "text": "Jeg elsker chokolade.",
              "de": "Ich liebe Schokolade.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Nej, slet ikke. Det tager kun fem minutter. Hav en god dag!",
          "npcDe": "Nein, gar nicht. Es dauert nur fünf Minuten. Hab einen schönen Tag!",
          "hint": "„Slet ikke\" = „überhaupt nicht\". Zum Abschied wünscht man „hav en god dag\".",
          "prompt": "Bedanke dich herzlich und verabschiede dich.",
          "expected": "Tusind tak for hjælpen! Vi ses!",
          "expectedDe": "Tausend Dank für die Hilfe! Bis bald!",
          "options": [
            {
              "text": "Tusind tak for hjælpen! Vi ses!",
              "de": "Tausend Dank für die Hilfe! Bis bald!",
              "correct": true
            },
            {
              "text": "Nej, jeg forstår ingenting.",
              "de": "Nein, ich verstehe gar nichts.",
              "correct": false
            },
            {
              "text": "Hvor er toilettet?",
              "de": "Wo ist die Toilette?",
              "correct": false
            }
          ]
        }
      ],
      "category": "travel"
    },
    {
      "id": "da-hotel",
      "language": "da",
      "title": "Im Hotel einchecken",
      "situation": "Du kommst im Hotel an und möchtest dein Zimmer beziehen.",
      "icon": "fa-hotel",
      "npcName": "Lars",
      "npcRole": "Rezeptionist",
      "level": "A2",
      "turns": [
        {
          "npc": "Godaften! Velkommen til Hotel Scandic. Hvad kan jeg gøre for dig?",
          "npcDe": "Guten Abend! Willkommen im Hotel Scandic. Was kann ich für dich tun?",
          "hint": "„Godaften\" nutzt man abends ab etwa 18 Uhr.",
          "prompt": "Sage, dass du ein Zimmer reserviert hast.",
          "expected": "Godaften, jeg har reserveret et værelse.",
          "expectedDe": "Guten Abend, ich habe ein Zimmer reserviert.",
          "options": [
            {
              "text": "Godaften, jeg har reserveret et værelse.",
              "de": "Guten Abend, ich habe ein Zimmer reserviert.",
              "correct": true
            },
            {
              "text": "Jeg arbejder på en restaurant.",
              "de": "Ich arbeite in einem Restaurant.",
              "correct": false
            },
            {
              "text": "Hvor kan man købe sko?",
              "de": "Wo kann man Schuhe kaufen?",
              "correct": false
            }
          ]
        },
        {
          "npc": "Perfekt, må jeg se dit pas og et betalingskort?",
          "npcDe": "Perfekt, darf ich deinen Pass und eine Zahlungskarte sehen?",
          "hint": "„Må jeg se\" ist die höflichste Art im Dänischen, um Dokumente zu bitten.",
          "prompt": "Reiche die Dokumente mit „Bitte sehr\".",
          "expected": "Ja, værsgo, her er mit pas.",
          "expectedDe": "Ja, bitte sehr, hier ist mein Pass.",
          "options": [
            {
              "text": "Ja, værsgo, her er mit pas.",
              "de": "Ja, bitte sehr, hier ist mein Pass.",
              "correct": true
            },
            {
              "text": "Jeg har ingen penge.",
              "de": "Ich habe kein Geld.",
              "correct": false
            },
            {
              "text": "Toget er forsinket.",
              "de": "Der Zug ist verspätet.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Tak skal du have. Værelse tohundrede og to. Morgenmaden er fra klokken syv.",
          "npcDe": "Vielen Dank. Zimmer 202. Das Frühstück ist ab sieben Uhr.",
          "hint": "„Morgenmad\" = wörtlich Morgen-Essen (Frühstück).",
          "prompt": "Frage nach dem WLAN-Passwort.",
          "expected": "Hvad er koden til wi-fi?",
          "expectedDe": "Was ist das Passwort für das WLAN?",
          "options": [
            {
              "text": "Hvad er koden til wi-fi?",
              "de": "Was ist das Passwort für das WLAN?",
              "correct": true
            },
            {
              "text": "Må jeg låne en cykel?",
              "de": "Darf ich ein Fahrrad leihen?",
              "correct": false
            },
            {
              "text": "Hvor bor du henne?",
              "de": "Wo wohnst du?",
              "correct": false
            }
          ]
        }
      ],
      "category": "travel"
    },
    {
      "id": "da-pharmacy",
      "language": "da",
      "category": "health",
      "title": "På apoteket",
      "situation": "Du har hovedpine og feber og beder apotekeren om smertestillende piller og doseringsråd.",
      "icon": "fa-kit-medical",
      "npcName": "Sofia",
      "npcRole": "Apoteker",
      "level": "A2",
      "turns": [
        {
          "npc": "Hej! Hvad kan jeg hjælpe dig med i dag?",
          "npcDe": "Hallo! Womit kann ich dir heute helfen?",
          "hint": "„Hvad kan jeg hjælpe dig med\" ist die typische Frage im dänischen Kundenservice.",
          "prompt": "Schildere, dass du starke Kopfschmerzen und Halsschmerzen hast.",
          "expected": "Hej, jeg har slem hovedpine og ondt i halsen.",
          "expectedDe": "Hallo, ich habe schlimme Kopfschmerzen und Halsschmerzen.",
          "options": [
            {
              "text": "Hej, jeg har slem hovedpine og ondt i halsen.",
              "de": "Hallo, ich habe schlimme Kopfschmerzen und Halsschmerzen.",
              "correct": true
            },
            {
              "text": "Hvor er den nærmeste biograf?",
              "de": "Wo ist das nächste Kino?",
              "correct": false
            },
            {
              "text": "Jeg vil gerne leje en bil.",
              "de": "Ich möchte ein Auto mieten.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Det lyder som en slem forkølelse. Vil du have smertestillende piller eller en næsespray?",
          "npcDe": "Das klingt nach einer bösen Erkältung. Möchtest du Schmerztabletten oder ein Nasenspray?",
          "hint": "„Smertestillende piller\" = Schmerztabletten.",
          "prompt": "Bitte um Schmerztabletten und frage nach der Dosierung.",
          "expected": "Smertestillende piller, tak. Hvor mange må jeg tage om dagen?",
          "expectedDe": "Schmerztabletten, bitte. Wie viele darf ich pro Tag nehmen?",
          "options": [
            {
              "text": "Smertestillende piller, tak. Hvor mange må jeg tage om dagen?",
              "de": "Schmerztabletten, bitte. Wie viele darf ich am Tag nehmen?",
              "correct": true
            },
            {
              "text": "Jeg foretrækker kaffe fremfor te.",
              "de": "Ich bevorzuge Kaffee gegenüber Tee.",
              "correct": false
            },
            {
              "text": "Må jeg betale i morgen?",
              "de": "Darf ich morgen bezahlen?",
              "correct": false
            }
          ]
        },
        {
          "npc": "Tag højst en pille tre gange om dagen med et stort glas vand. Rigtig god bedring!",
          "npcDe": "Nimm höchstens eine Tablette dreimal am Tag mit einem großen Glas Wasser. Gute Besserung!",
          "hint": "„God bedring\" ist der Standardwunsch bei Krankheit (Gute Besserung).",
          "prompt": "Bedanke dich für den Rat und frage nach dem Preis.",
          "expected": "Mange tak for rådet! Hvor meget bliver det?",
          "expectedDe": "Vielen Dank für den Rat! Wie viel macht das?",
          "options": [
            {
              "text": "Mange tak for rådet! Hvor meget bliver det?",
              "de": "Vielen Dank für den Rat! Wie viel macht das?",
              "correct": true
            },
            {
              "text": "Hvor bor dine forældre?",
              "de": "Wo wohnen deine Eltern?",
              "correct": false
            },
            {
              "text": "Jeg har ingen taske med.",
              "de": "Ich habe keine Tasche dabei.",
              "correct": false
            }
          ]
        }
      ]
    },
    {
      "id": "da-station",
      "language": "da",
      "category": "travel",
      "title": "På Københavns Hovedbanegård",
      "situation": "Du skal købe en togbillet til Aarhus og spørger om afgangstid og perron.",
      "icon": "fa-train",
      "npcName": "Henrik",
      "npcRole": "Billetkontor",
      "level": "A2",
      "turns": [
        {
          "npc": "Goddag! Velkommen til DSB. Hvor går turen hen i dag?",
          "npcDe": "Guten Tag! Willkommen bei der DSB. Wohin geht die Reise heute?",
          "hint": "DSB (Danske Statsbaner) ist die dänische Staatsbahn.",
          "prompt": "Sage, dass du eine Fahrkarte nach Aarhus möchtest.",
          "expected": "Goddag, jeg vil gerne have en togbillet til Aarhus.",
          "expectedDe": "Guten Tag, ich hätte gerne eine Zugfahrkarte nach Aarhus.",
          "options": [
            {
              "text": "Goddag, jeg vil gerne have en togbillet til Aarhus.",
              "de": "Guten Tag, ich hätte gerne eine Zugfahrkarte nach Aarhus.",
              "correct": true
            },
            {
              "text": "Jeg har spist morgenmad.",
              "de": "Ich habe gefrühstückt.",
              "correct": false
            },
            {
              "text": "Hvor gammelt er rådhuset?",
              "de": "Wie alt ist das Rathaus?",
              "correct": false
            }
          ]
        },
        {
          "npc": "Skal det være en enkeltbillet eller tur-retur? Det næste lyntog kører klokken ti.",
          "npcDe": "Soll es eine einfache Fahrt oder Hin- und Rückfahrt sein? Der nächste Expresszug fährt um zehn.",
          "hint": "„Tur-retur\" = Hin- und Rückfahrt; „Lyntog\" = dänischer Schnellzug.",
          "prompt": "Wähle eine einfache Fahrt mit Sitzplatzreservierung.",
          "expected": "En enkeltbillet med pladsbillet, tak.",
          "expectedDe": "Eine einfache Fahrt mit Sitzplatzkarte, bitte.",
          "options": [
            {
              "text": "En enkeltbillet med pladsbillet, tak.",
              "de": "Eine einfache Fahrt mit Sitzplatzkarte, bitte.",
              "correct": true
            },
            {
              "text": "Min kuffert er for tung.",
              "de": "Mein Koffer ist zu schwer.",
              "correct": false
            },
            {
              "text": "Jeg vil hellere flyve.",
              "de": "Ich möchte lieber fliegen.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Det er i orden. Toget kører fra spor fire om tyve minutter. Rigtig god rejse!",
          "npcDe": "Geht in Ordnung. Der Zug fährt in 20 Minuten von Gleis vier ab. Gute Reise!",
          "hint": "„Spor\" ist das dänische Wort für Gleis/Bahnsteig.",
          "prompt": "Bedanke dich herzlich und wünsche einen schönen Tag.",
          "expected": "Tusind tak for hjælpen, og hav en god dag!",
          "expectedDe": "Tausend Dank für die Hilfe und einen schönen Tag!",
          "options": [
            {
              "text": "Tusind tak for hjælpen, og hav en god dag!",
              "de": "Tausend Dank für die Hilfe und einen schönen Tag!",
              "correct": true
            },
            {
              "text": "Nej, jeg har glemt min jakke.",
              "de": "Nein, ich habe meine Jacke vergessen.",
              "correct": false
            },
            {
              "text": "Hvad er klokken?",
              "de": "Wie viel Uhr ist es?",
              "correct": false
            }
          ]
        }
      ]
    }
  ],
  "es": [
    {
      "id": "es-cafe",
      "language": "es",
      "title": "En la cafetería",
      "situation": "Pides un desayuno típico en una cafetería de Madrid.",
      "icon": "fa-mug-hot",
      "npcName": "Carlos",
      "npcRole": "Camarero",
      "level": "A1",
      "turns": [
        {
          "npc": "¡Buenos días! ¿Qué le pongo para empezar?",
          "npcDe": "Guten Tag! Was darf ich Ihnen bringen?",
          "hint": "„¿Qué le pongo?\" ist die geläufigste Frage spanischer Kellner.",
          "prompt": "Bestelle einen Milchkaffee und einen Toast.",
          "expected": "Un café con leche y una tostada, por favor.",
          "expectedDe": "Einen Milchkaffee und einen Toast, bitte.",
          "options": [
            {
              "text": "Un café con leche y una tostada, por favor.",
              "de": "Einen Milchkaffee und einen Toast, bitte.",
              "correct": true
            },
            {
              "text": "No me gusta la música.",
              "de": "Ich mag die Musik nicht.",
              "correct": false
            },
            {
              "text": "¿A qué hora sale el autobús?",
              "de": "Um wie viel Uhr fährt der Bus ab?",
              "correct": false
            }
          ]
        },
        {
          "npc": "¡Marchando! ¿La tostada la quiere con tomate y aceite?",
          "npcDe": "Kommt sofort! Möchten Sie den Toast mit Tomate und Olivenöl?",
          "hint": "„Tostada con tomate y aceite\" ist der spanische Frühstücksklassiker.",
          "prompt": "Bejahe und bedanke dich.",
          "expected": "Sí, con tomate y aceite, muchas gracias.",
          "expectedDe": "Ja, mit Tomate und Öl, vielen Dank.",
          "options": [
            {
              "text": "Sí, con tomate y aceite, muchas gracias.",
              "de": "Ja, mit Tomate und Öl, vielen Dank.",
              "correct": true
            },
            {
              "text": "Tengo mucho sueño todavía.",
              "de": "Ich bin immer noch sehr müde.",
              "correct": false
            },
            {
              "text": "¿Dónde está el museo de arte?",
              "de": "Wo ist das Kunstmuseum?",
              "correct": false
            }
          ]
        },
        {
          "npc": "Aquí tiene, ¡que aproveche! ¿Desea algo más?",
          "npcDe": "Hier bitte, guten Appetit! Wünschen Sie noch etwas?",
          "hint": "„¡Que aproveche!\" bedeutet „Guten Appetit!\".",
          "prompt": "Bitte um die Rechnung.",
          "expected": "No, nada más. La cuenta, por favor.",
          "expectedDe": "Nein, nichts weiter. Die Rechnung, bitte.",
          "options": [
            {
              "text": "No, nada más. La cuenta, por favor.",
              "de": "Nein, nichts weiter. Die Rechnung, bitte.",
              "correct": true
            },
            {
              "text": "Quiero cambiar de hotel.",
              "de": "Ich möchte das Hotel wechseln.",
              "correct": false
            },
            {
              "text": "Mañana va a llover.",
              "de": "Morgen wird es regnen.",
              "correct": false
            }
          ]
        }
      ],
      "category": "food"
    },
    {
      "id": "es-directions",
      "language": "es",
      "title": "Preguntar por la calle",
      "situation": "Buscas la estación de metro más cercana en Barcelona.",
      "icon": "fa-map-location-dot",
      "npcName": "Lucía",
      "npcRole": "Transeúnte",
      "level": "A1",
      "turns": [
        {
          "npc": "¡Hola! ¿Te has perdido o buscas algo?",
          "npcDe": "Hallo! Hast du dich verlaufen oder suchst du etwas?",
          "hint": "In Spanien ist der Umgangston offen, direkt und hilfsbereit.",
          "prompt": "Frage höflich nach der nächsten U-Bahn-Station.",
          "expected": "Disculpe, ¿dónde está la estación de metro más cercana?",
          "expectedDe": "Entschuldigung, wo ist die nächste U-Bahn-Station?",
          "options": [
            {
              "text": "Disculpe, ¿dónde está la estación de metro más cercana?",
              "de": "Entschuldigung, wo ist die nächste U-Bahn-Station?",
              "correct": true
            },
            {
              "text": "Me gusta mucho la paella.",
              "de": "Ich mag Paella sehr gern.",
              "correct": false
            },
            {
              "text": "El billete de tren es muy caro.",
              "de": "Die Zugfahrkarte ist sehr teuer.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Está muy cerca. Sigue todo recto y gira a la izquierda en la esquina.",
          "npcDe": "Sie ist ganz in der Nähe. Geh geradeaus und biege an der Ecke links ab.",
          "hint": "„Todo recto\" (geradeaus) und „a la izquierda\" (nach links).",
          "prompt": "Frage, wie viele Minuten man zu Fuß braucht.",
          "expected": "¿Cuántos minutos se tarda a pie?",
          "expectedDe": "Wie viele Minuten dauert es zu Fuß?",
          "options": [
            {
              "text": "¿Cuántos minutos se tarda a pie?",
              "de": "Wie viele Minuten dauert es zu Fuß?",
              "correct": true
            },
            {
              "text": "¿Cuánto cuesta un billete de avión?",
              "de": "Was kostet ein Flugticket?",
              "correct": false
            },
            {
              "text": "Mi color favorito es el azul.",
              "de": "Meine Lieblingsfarbe ist Blau.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Solo dos minutos, verás la señal roja del metro. ¡Buen viaje!",
          "npcDe": "Nur zwei Minuten, du wirst das rote U-Bahn-Schild sehen. Gute Fahrt!",
          "hint": "„¡Buen viaje!\" wünscht man bei Reisen oder Fahrten.",
          "prompt": "Bedanke dich freundlich.",
          "expected": "¡Muchas gracias por su ayuda! ¡Adiós!",
          "expectedDe": "Vielen Dank für Ihre Hilfe! Tschüss!",
          "options": [
            {
              "text": "¡Muchas gracias por su ayuda! ¡Adiós!",
              "de": "Vielen Dank für Ihre Hilfe! Tschüss!",
              "correct": true
            },
            {
              "text": "No entiendo el español.",
              "de": "Ich verstehe kein Spanisch.",
              "correct": false
            },
            {
              "text": "La comida estaba rica.",
              "de": "Das Essen war lecker.",
              "correct": false
            }
          ]
        }
      ],
      "category": "travel"
    },
    {
      "id": "es-hotel",
      "language": "es",
      "category": "travel",
      "title": "Check-in en el hotel",
      "situation": "Llegas a un hotel en Barcelona para hacer el check-in y preguntar por los servicios.",
      "icon": "fa-hotel",
      "npcName": "Javier",
      "npcRole": "Recepcionista",
      "level": "A2",
      "turns": [
        {
          "npc": "¡Buenas tardes! Bienvenido al Hotel Sol. ¿Tiene una reserva con nosotros?",
          "npcDe": "Guten Tag! Willkommen im Hotel Sol. Haben Sie eine Reservierung bei uns?",
          "hint": "„Buenas tardes\" wird nach 14 Uhr bis zum Einbruch der Dunkelheit genutzt.",
          "prompt": "Bestätige die Reservierung und nenne deinen Nachnamen.",
          "expected": "Buenas tardes, sí, tengo una reserva a nombre de Schmidt.",
          "expectedDe": "Guten Tag, ja, ich habe eine Reservierung auf den Namen Schmidt.",
          "options": [
            {
              "text": "Buenas tardes, sí, tengo una reserva a nombre de Schmidt.",
              "de": "Guten Tag, ja, ich habe eine Reservierung auf den Namen Schmidt.",
              "correct": true
            },
            {
              "text": "Me gustaría comprar una bicicleta de montaña.",
              "de": "Ich möchte ein Mountainbike kaufen.",
              "correct": false
            },
            {
              "text": "El museo está cerrado los lunes.",
              "de": "Das Museum ist montags geschlossen.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Efectivamente, una habitación doble por tres noches. ¿Me permite su pasaporte, por favor?",
          "npcDe": "In der Tat, ein Doppelzimmer für drei Nächte. Darf ich bitte Ihren Pass haben?",
          "hint": "In spanischen Hotels ist die Vorlage des Ausweisdokuments Pflicht.",
          "prompt": "Reiche deinen Pass und frage nach dem Frühstück.",
          "expected": "Aquí tiene mi pasaporte. ¿A qué hora se sirve el desayuno?",
          "expectedDe": "Hier ist mein Pass. Zu welcher Uhrzeit wird das Frühstück serviert?",
          "options": [
            {
              "text": "Aquí tiene mi pasaporte. ¿A qué hora se sirve el desayuno?",
              "de": "Hier ist mein Pass. Um wie viel Uhr gibt es Frühstück?",
              "correct": true
            },
            {
              "text": "No me gusta caminar bajo el sol.",
              "de": "Ich gehe nicht gern in der Sonne spazieren.",
              "correct": false
            },
            {
              "text": "¿Dónde puedo lavar mi coche?",
              "de": "Wo kann ich mein Auto waschen?",
              "correct": false
            }
          ]
        },
        {
          "npc": "El desayuno es de siete y media a diez y media en el comedor. Aquí tiene su llave, habitación 304.",
          "npcDe": "Das Frühstück ist von 7:30 bis 10:30 Uhr im Speisesaal. Hier ist Ihr Schlüssel, Zimmer 304.",
          "hint": "„Comedor\" = Speisesaal; „llave\" = Schlüssel (oft Schlüsselkarte).",
          "prompt": "Bedanke dich und frage nach dem WLAN-Passwort.",
          "expected": "Muchas gracias. ¿Cuál es la contraseña del wifi?",
          "expectedDe": "Vielen Dank. Was ist das WLAN-Passwort?",
          "options": [
            {
              "text": "Muchas gracias. ¿Cuál es la contraseña del wifi?",
              "de": "Vielen Dank. Was ist das WLAN-Passwort?",
              "correct": true
            },
            {
              "text": "Quiero cancelar mi vuelo.",
              "de": "Ich möchte meinen Flug stornieren.",
              "correct": false
            },
            {
              "text": "Mañana hará mucho viento.",
              "de": "Morgen wird es sehr windig sein.",
              "correct": false
            }
          ]
        }
      ]
    },
    {
      "id": "es-pharmacy",
      "language": "es",
      "category": "health",
      "title": "En la farmacia",
      "situation": "Tienes dolor de cabeza y fiebre y pides medicamentos en una farmacia madrileña.",
      "icon": "fa-kit-medical",
      "npcName": "Elena",
      "npcRole": "Farmacéutica",
      "level": "A2",
      "turns": [
        {
          "npc": "¡Hola! ¿En qué puedo ayudarte hoy?",
          "npcDe": "Hallo! Wie kann ich dir heute helfen?",
          "hint": "In Spanien duzen Apotheker Kunden jüngeren oder mittleren Alters oft freundlich.",
          "prompt": "Erkläre, dass du starke Kopfschmerzen und etwas Fieber hast.",
          "expected": "Hola, me duele mucho la cabeza y tengo un poco de fiebre.",
          "expectedDe": "Hallo, mein Kopf tut sehr weh und ich habe etwas Fieber.",
          "options": [
            {
              "text": "Hola, me duele mucho la cabeza y tengo un poco de fiebre.",
              "de": "Hallo, mein Kopf tut sehr weh und ich habe etwas Fieber.",
              "correct": true
            },
            {
              "text": "Quiero cambiar dinero a dólares.",
              "de": "Ich möchte Geld in Dollar tauschen.",
              "correct": false
            },
            {
              "text": "Mi equipo favorito ganó el partido.",
              "de": "Meine Lieblingsmannschaft hat das Spiel gewonnen.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Te recomiendo este paracetamol de un gramo. ¿Eres alérgico a algún medicamento?",
          "npcDe": "Ich empfehle dir dieses 1-Gramm-Paracetamol. Bist du gegen irgendwelche Medikamente allergisch?",
          "hint": "„Alérgico a\" = allergisch gegen.",
          "prompt": "Antworte, dass du keine Allergien hast und frage nach der Einnahme.",
          "expected": "No tengo alergias. ¿Cuántas pastillas debo tomar al día?",
          "expectedDe": "Ich habe keine Allergien. Wie viele Tabletten soll ich am Tag nehmen?",
          "options": [
            {
              "text": "No tengo alergias. ¿Cuántas pastillas debo tomar al día?",
              "de": "Ich habe keine Allergien. Wie viele Tabletten soll ich am Tag nehmen?",
              "correct": true
            },
            {
              "text": "Prefiero cenar pescado esta noche.",
              "de": "Ich esse heute Abend lieber Fisch.",
              "correct": false
            },
            {
              "text": "¿Cuándo sale el próximo autobús?",
              "de": "Wann fährt der nächste Bus ab?",
              "correct": false
            }
          ]
        },
        {
          "npc": "Toma un comprimido cada ocho horas con agua, siempre después de comer.",
          "npcDe": "Nimm alle acht Stunden eine Tablette mit Wasser, immer nach dem Essen.",
          "hint": "„Cada ocho horas\" = alle 8 Stunden (3-mal täglich).",
          "prompt": "Bedanke dich und frage nach dem Preis.",
          "expected": "Muchas gracias por el consejo. ¿Cuánto cuesta la caja?",
          "expectedDe": "Vielen Dank für den Rat. Wie viel kostet die Packung?",
          "options": [
            {
              "text": "Muchas gracias por el consejo. ¿Cuánto cuesta la caja?",
              "de": "Vielen Dank für den Rat. Wie viel kostet die Packung?",
              "correct": true
            },
            {
              "text": "No me acuerdo de mi dirección.",
              "de": "Ich erinnere mich nicht an meine Adresse.",
              "correct": false
            },
            {
              "text": "Voy a dar un paseo por el parque.",
              "de": "Ich mache einen Spaziergang im Park.",
              "correct": false
            }
          ]
        }
      ]
    },
    {
      "id": "es-station",
      "language": "es",
      "category": "travel",
      "title": "En la estación de tren de Atocha",
      "situation": "Compras un billete de tren de alta velocidad (AVE) para ir a Sevilla.",
      "icon": "fa-train",
      "npcName": "Mateo",
      "npcRole": "Taquillero",
      "level": "A2",
      "turns": [
        {
          "npc": "¡Buenos días! ¿Adónde desea viajar hoy?",
          "npcDe": "Guten Tag! Wohin möchten Sie heute reisen?",
          "hint": "AVE (Alta Velocidad Española) ist der spanische Hochgeschwindigkeitszug.",
          "prompt": "Sage, dass du eine Fahrkarte nach Sevilla möchtest.",
          "expected": "Buenos días, quisiera un billete de tren para Sevilla, por favor.",
          "expectedDe": "Guten Tag, ich hätte gerne eine Zugfahrkarte nach Sevilla, bitte.",
          "options": [
            {
              "text": "Buenos días, quisiera un billete de tren para Sevilla, por favor.",
              "de": "Guten Tag, ich hätte gerne eine Zugfahrkarte nach Sevilla, bitte.",
              "correct": true
            },
            {
              "text": "¿A qué hora abre la catedral?",
              "de": "Um wie viel Uhr öffnet die Kathedrale?",
              "correct": false
            },
            {
              "text": "He perdido mi teléfono móvil.",
              "de": "Ich habe mein Mobiltelefon verloren.",
              "correct": false
            }
          ]
        },
        {
          "npc": "¿Desea solo ida o ida y vuelta? El próximo tren sale a las diez y cuarto.",
          "npcDe": "Möchten Sie nur Hinfahrt oder Hin- und Rückfahrt? Der nächste Zug fährt um Viertel nach zehn.",
          "hint": "„Solo ida\" = einfache Fahrt; „ida y vuelta\" = Hin- und Rückfahrt.",
          "prompt": "Wähle nur Hinfahrt mit einem Fensterplatz.",
          "expected": "Solo ida con asiento de ventana, por favor.",
          "expectedDe": "Nur Hinfahrt mit Fensterplatz, bitte.",
          "options": [
            {
              "text": "Solo ida con asiento de ventana, por favor.",
              "de": "Nur Hinfahrt mit Fensterplatz, bitte.",
              "correct": true
            },
            {
              "text": "Quiero devolver estos zapatos.",
              "de": "Ich möchte diese Schuhe zurückgeben.",
              "correct": false
            },
            {
              "text": "El examen fue muy difícil.",
              "de": "Die Prüfung war sehr schwer.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Son cuarenta y cinco euros. Su tren sale de la vía número seis. ¡Buen viaje!",
          "npcDe": "Das macht 45 Euro. Ihr Zug fährt von Gleis Nummer sechs ab. Gute Reise!",
          "hint": "„Vía\" ist das Gleis im spanischen Bahnhof.",
          "prompt": "Bedanke dich und frage, ob der Zug pünktlich ist.",
          "expected": "Muchas gracias. ¿El tren sale puntual?",
          "expectedDe": "Vielen Dank. Fährt der Zug pünktlich ab?",
          "options": [
            {
              "text": "Muchas gracias. ¿El tren sale puntual?",
              "de": "Vielen Dank. Fährt der Zug pünktlich ab?",
              "correct": true
            },
            {
              "text": "Tengo que estudiar gramática.",
              "de": "Ich muss Grammatik lernen.",
              "correct": false
            },
            {
              "text": "Me duele el brazo derecho.",
              "de": "Mein rechter Arm tut weh.",
              "correct": false
            }
          ]
        }
      ]
    }
  ],
  "fr": [
    {
      "id": "fr-cafe",
      "language": "fr",
      "title": "Dans une boulangerie",
      "situation": "Tu commandes le petit-déjeuner dans une charmante boulangerie parisienne.",
      "icon": "fa-mug-hot",
      "npcName": "Camille",
      "npcRole": "Boulangère",
      "level": "A1",
      "turns": [
        {
          "npc": "Bonjour ! Qu’est-ce qui vous ferait plaisir aujourd’hui ?",
          "npcDe": "Guten Tag! Was darf ich Ihnen heute Schönes bringen?",
          "hint": "In Frankreich beginnt jedes Gespräch mit einem klaren „Bonjour !\".",
          "prompt": "Bestelle ein Croissant und einen Kaffee.",
          "expected": "Bonjour ! Un croissant et un café, s’il vous plaît.",
          "expectedDe": "Guten Tag! Ein Croissant und einen Kaffee, bitte.",
          "options": [
            {
              "text": "Bonjour ! Un croissant et un café, s’il vous plaît.",
              "de": "Guten Tag! Ein Croissant und ein Kaffee, bitte.",
              "correct": true
            },
            {
              "text": "Je veux acheter une voiture rouge.",
              "de": "Ich will ein rotes Auto kaufen.",
              "correct": false
            },
            {
              "text": "La tour Eiffel est très haute.",
              "de": "Der Eiffelturm ist sehr hoch.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Très bien ! Le café, vous le préférez noir ou avec du lait ?",
          "npcDe": "Sehr gut! Möchten Sie den Kaffee schwarz oder mit Milch?",
          "hint": "„Un café\" ist in Frankreich automatisch ein Espresso („noir\").",
          "prompt": "Sage, dass du einen Milchkaffee möchtest.",
          "expected": "Avec du lait, s’il vous plaît.",
          "expectedDe": "Mit Milch, bitte.",
          "options": [
            {
              "text": "Avec du lait, s’il vous plaît.",
              "de": "Mit Milch, bitte.",
              "correct": true
            },
            {
              "text": "Il fait très froid en hiver.",
              "de": "Im Winter ist es sehr kalt.",
              "correct": false
            },
            {
              "text": "Je n’ai pas de passeport.",
              "de": "Ich habe keinen Pass.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Voilà pour vous ! Cela fait quatre euros cinquante.",
          "npcDe": "Bitte sehr! Das macht vier Euro fünfzig.",
          "hint": "„Voilà\" signalisiert die Übergabe von Waren oder Wechselgeld.",
          "prompt": "Reiche das Geld oder frage nach Kartenzahlung.",
          "expected": "Est-ce que je peux payer par carte ?",
          "expectedDe": "Kann ich mit Karte zahlen?",
          "options": [
            {
              "text": "Est-ce que je peux payer par carte ?",
              "de": "Kann ich mit Karte zahlen?",
              "correct": true
            },
            {
              "text": "Quelle heure est-il à Paris ?",
              "de": "Wie spät ist es in Paris?",
              "correct": false
            },
            {
              "text": "Mon prénom est Alexandre.",
              "de": "Mein Vorname ist Alexandre.",
              "correct": false
            }
          ]
        }
      ],
      "category": "food"
    },
    {
      "id": "fr-hotel",
      "language": "fr",
      "title": "À la réception de l’hôtel",
      "situation": "Tu arrives à ton hôtel à Nice pour récupérer les clés de ta chambre.",
      "icon": "fa-hotel",
      "npcName": "Julien",
      "npcRole": "Réceptionniste",
      "level": "A2",
      "turns": [
        {
          "npc": "Bonsoir monsieur/madame. Vous avez une réservation ?",
          "npcDe": "Guten Abend. Haben Sie eine Reservierung?",
          "hint": "„Monsieur\" oder „Madame\" rundet Begrüßungen im Hotel höflich ab.",
          "prompt": "Bestätige und nenne deinen Namen.",
          "expected": "Bonsoir, oui, j’ai réservé une chambre pour deux nuits.",
          "expectedDe": "Guten Abend, ja, ich habe ein Zimmer für zwei Nächte reserviert.",
          "options": [
            {
              "text": "Bonsoir, oui, j’ai réservé une chambre pour deux nuits.",
              "de": "Guten Abend, ja, ich habe ein Zimmer reserviert.",
              "correct": true
            },
            {
              "text": "Je cherche un médecin urgentiste.",
              "de": "Ich suche einen Notarzt.",
              "correct": false
            },
            {
              "text": "Le train a dix minutes de retard.",
              "de": "Der Zug hat zehn Minuten Verspätung.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Parfait ! Voici votre clé, chambre trois-cent-quatre au troisième étage.",
          "npcDe": "Perfekt! Hier ist Ihr Schlüssel, Zimmer 304 im dritten Stock.",
          "hint": "Der Aufzug heißt auf Französisch „l’ascenseur\".",
          "prompt": "Frage nach den Frühstückszeiten.",
          "expected": "À quelle heure est servi le petit-déjeuner ?",
          "expectedDe": "Um wie viel Uhr gibt es Frühstück?",
          "options": [
            {
              "text": "À quelle heure est servi le petit-déjeuner ?",
              "de": "Um wie viel Uhr gibt es Frühstück?",
              "correct": true
            },
            {
              "text": "Où peut-on louer des skis ?",
              "de": "Wo kann man Skier mieten?",
              "correct": false
            },
            {
              "text": "J’ai perdu mes lunettes de soleil.",
              "de": "Ich habe meine Sonnenbrille verloren.",
              "correct": false
            }
          ]
        },
        {
          "npc": "De sept heures à dix heures au rez-de-chaussée. Bon séjour parmi nous !",
          "npcDe": "Von 7 bis 10 Uhr im Erdgeschoss. Einen angenehmen Aufenthalt bei uns!",
          "hint": "„Rez-de-chaussée\" ist das Erdgeschoss.",
          "prompt": "Bedanke dich und wünsche einen schönen Abend.",
          "expected": "Merci beaucoup ! Bonne soirée à vous.",
          "expectedDe": "Vielen Dank! Ihnen einen schönen Abend.",
          "options": [
            {
              "text": "Merci beaucoup ! Bonne soirée à vous.",
              "de": "Vielen Dank! Ihnen einen schönen Abend.",
              "correct": true
            },
            {
              "text": "Non, je refuse de payer.",
              "de": "Nein, ich weigere mich zu zahlen.",
              "correct": false
            },
            {
              "text": "La plage est trop loin.",
              "de": "Der Strand ist zu weit weg.",
              "correct": false
            }
          ]
        }
      ],
      "category": "travel"
    },
    {
      "id": "fr-directions",
      "language": "fr",
      "category": "travel",
      "title": "Demander son chemin à Paris",
      "situation": "Tu cherches la station de métro la plus proche près du musée du Louvre.",
      "icon": "fa-map-location-dot",
      "npcName": "Camille",
      "npcRole": "Passante",
      "level": "A1",
      "turns": [
        {
          "npc": "Bonjour ! Vous cherchez quelque chose ? Vous avez l'air un peu perdu.",
          "npcDe": "Guten Tag! Suchen Sie etwas? Sie wirken etwas verloren.",
          "hint": "„Avoir l'air\" bedeutet „wirken / aussehen wie\".",
          "prompt": "Entschuldige dich höflich und frage nach der nächsten Metrostation.",
          "expected": "Pardon madame, où se trouve la station de métro la plus proche ?",
          "expectedDe": "Entschuldigung die Dame, wo befindet sich die nächste Metro-Station?",
          "options": [
            {
              "text": "Pardon madame, où se trouve la station de métro la plus proche ?",
              "de": "Entschuldigung die Dame, wo befindet sich die nächste Metro-Station?",
              "correct": true
            },
            {
              "text": "J'aime beaucoup écouter de la musique classique.",
              "de": "Ich höre sehr gern klassische Musik.",
              "correct": false
            },
            {
              "text": "Combien coûte cette écharpe rouge ?",
              "de": "Wie viel kostet dieser rote Schal?",
              "correct": false
            }
          ]
        },
        {
          "npc": "C'est tout droit ! Continuez jusqu'au carrefour, puis tournez à gauche devant la boulangerie.",
          "npcDe": "Es ist geradeaus! Gehen Sie bis zur Kreuzung, dann biegen Sie vor der Bäckerei links ab.",
          "hint": "„Tout droit\" = geradeaus; „à gauche\" = links; „à droite\" = rechts.",
          "prompt": "Frage, ob es weit zu Fuß ist.",
          "expected": "Est-ce que c'est loin à pied d'ici ?",
          "expectedDe": "Ist es weit zu Fuß von hier?",
          "options": [
            {
              "text": "Est-ce que c'est loin à pied d'ici ?",
              "de": "Ist es weit zu Fuß von hier?",
              "correct": true
            },
            {
              "text": "Quel est votre plat préféré ?",
              "de": "Was ist Ihr Lieblingsgericht?",
              "correct": false
            },
            {
              "text": "Je n'ai pas faim ce matin.",
              "de": "Ich habe heute Morgen keinen Hunger.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Non, pas du tout ! C'est à seulement trois minutes de marche. Bonne visite !",
          "npcDe": "Nein, überhaupt nicht! Es sind nur drei Minuten zu Fuß. Viel Vergnügen beim Besuch!",
          "hint": "„Pas du tout\" = überhaupt nicht / gar nicht.",
          "prompt": "Bedanke dich herzlich und wünsche einen schönen Tag.",
          "expected": "Merci infiniment pour votre aide ! Bonne journée !",
          "expectedDe": "Unendlichen Dank für Ihre Hilfe! Einen schönen Tag!",
          "options": [
            {
              "text": "Merci infiniment pour votre aide ! Bonne journée !",
              "de": "Unendlichen Dank für Ihre Hilfe! Einen schönen Tag!",
              "correct": true
            },
            {
              "text": "Je dois aller dormir maintenant.",
              "de": "Ich muss jetzt schlafen gehen.",
              "correct": false
            },
            {
              "text": "Le ciel est tout gris aujourd'hui.",
              "de": "Der Himmel ist heute ganz grau.",
              "correct": false
            }
          ]
        }
      ]
    },
    {
      "id": "fr-pharmacy",
      "language": "fr",
      "category": "health",
      "title": "À la pharmacie à Paris",
      "situation": "Tu as mal à la gorge et de la fièvre et demandes conseil au pharmacien.",
      "icon": "fa-kit-medical",
      "npcName": "Julien",
      "npcRole": "Pharmacien",
      "level": "A2",
      "turns": [
        {
          "npc": "Bonjour ! Que puis-je faire pour vous aider ?",
          "npcDe": "Guten Tag! Was kann ich tun, um Ihnen zu helfen?",
          "hint": "In Frankreich tragen Apotheker einen weißen Kittel und beraten sehr ausführlich.",
          "prompt": "Erkläre deine Halsschmerzen und den Husten.",
          "expected": "Bonjour, j'ai mal à la gorge et une forte toux depuis hier.",
          "expectedDe": "Guten Tag, ich habe Halsschmerzen und starken Husten seit gestern.",
          "options": [
            {
              "text": "Bonjour, j'ai mal à la gorge et une forte toux depuis hier.",
              "de": "Guten Tag, ich habe Halsschmerzen und starken Husten seit gestern.",
              "correct": true
            },
            {
              "text": "Je cherche la gare Montparnasse.",
              "de": "Ich suche den Bahnhof Montparnasse.",
              "correct": false
            },
            {
              "text": "Ce livre est très intéressant.",
              "de": "Dieses Buch ist sehr interessant.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Je vous conseille ce sirop contre la toux et des pastilles au miel. Avez-vous de la fièvre ?",
          "npcDe": "Ich rate Ihnen zu diesem Hustensaft und Honigpastillen. Haben Sie Fieber?",
          "hint": "„Pastilles au miel\" = Honig-Halspastillen.",
          "prompt": "Antworte, dass du etwas Fieber hast und Paracetamol möchtest.",
          "expected": "Oui, un peu. Avez-vous aussi du paracétamol, s'il vous plaît ?",
          "expectedDe": "Ja, ein wenig. Haben Sie bitte auch Paracetamol?",
          "options": [
            {
              "text": "Oui, un peu. Avez-vous aussi du paracétamol, s'il vous plaît ?",
              "de": "Ja, ein wenig. Haben Sie bitte auch Paracetamol?",
              "correct": true
            },
            {
              "text": "Je préfère boire un café noir.",
              "de": "Ich trinke lieber einen schwarzen Kaffee.",
              "correct": false
            },
            {
              "text": "Mon train part à quinze heures.",
              "de": "Mein Zug fährt um 15 Uhr ab.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Prenez une cuillère de sirop matin et soir, et un comprimé toutes les six heures.",
          "npcDe": "Nehmen Sie einen Löffel Saft morgens und abends und eine Tablette alle sechs Stunden.",
          "hint": "„Toutes les six heures\" = alle sechs Stunden.",
          "prompt": "Bedanke dich und frage nach dem Gesamtbetrag.",
          "expected": "C'est bien noté. Combien est-ce que je vous dois ?",
          "expectedDe": "Ist notiert. Wie viel schulde ich Ihnen?",
          "options": [
            {
              "text": "C'est bien noté. Combien est-ce que je vous dois ?",
              "de": "Ist notiert. Wie viel schulde ich Ihnen?",
              "correct": true
            },
            {
              "text": "Où peut-on louer des vélos ?",
              "de": "Wo kann man Fahrräder mieten?",
              "correct": false
            },
            {
              "text": "Le musée est magnifique.",
              "de": "Das Museum ist wunderschön.",
              "correct": false
            }
          ]
        }
      ]
    },
    {
      "id": "fr-station",
      "language": "fr",
      "category": "travel",
      "title": "À la gare de Lyon",
      "situation": "Tu achètes un billet de TGV pour Nice au guichet de la gare.",
      "icon": "fa-train",
      "npcName": "Sophie",
      "npcRole": "Agente SNCF",
      "level": "A2",
      "turns": [
        {
          "npc": "Bonjour ! Quelle est votre destination aujourd'hui ?",
          "npcDe": "Guten Tag! Was ist heute Ihr Reiseziel?",
          "hint": "SNCF ist die französische Staatsbahn. TGV ist der französische Hochgeschwindigkeitszug.",
          "prompt": "Sage, dass du ein TGV-Ticket nach Nizza kaufen möchtest.",
          "expected": "Bonjour, je voudrais acheter un billet de TGV pour Nice, s'il vous plaît.",
          "expectedDe": "Guten Tag, ich möchte bitte ein TGV-Ticket nach Nizza kaufen.",
          "options": [
            {
              "text": "Bonjour, je voudrais acheter un billet de TGV pour Nice, s'il vous plaît.",
              "de": "Guten Tag, ich möchte bitte ein TGV-Ticket nach Nizza kaufen.",
              "correct": true
            },
            {
              "text": "Je cherche la clé de ma chambre.",
              "de": "Ich suche den Schlüssel für mein Zimmer.",
              "correct": false
            },
            {
              "text": "Il va pleuvoir ce week-end.",
              "de": "Es wird am Wochenende regnen.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Souhaitez-vous un aller simple ou un aller-retour ? Préférez-vous une place côté fenêtre ?",
          "npcDe": "Wünschen Sie eine einfache Fahrt oder Hin- und Rückfahrt? Bevorzugen Sie einen Fensterplatz?",
          "hint": "„Côté fenêtre\" = am Fenster; „côté couloir\" = am Gang.",
          "prompt": "Wähle eine einfache Fahrt mit Fensterplatz in der 2. Klasse.",
          "expected": "Un aller simple en seconde classe, côté fenêtre, s'il vous plaît.",
          "expectedDe": "Eine einfache Fahrt in der 2. Klasse, am Fenster, bitte.",
          "options": [
            {
              "text": "Un aller simple en seconde classe, côté fenêtre, s'il vous plaît.",
              "de": "Eine einfache Fahrt in der 2. Klasse, am Fenster, bitte.",
              "correct": true
            },
            {
              "text": "J'ai oublié mon mot de passe.",
              "de": "Ich habe mein Passwort vergessen.",
              "correct": false
            },
            {
              "text": "Le dîner était excellent.",
              "de": "Das Abendessen war ausgezeichnet.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Voilà votre billet ! Départ voie E à quatorze heures vingt. Bon voyage !",
          "npcDe": "Hier ist Ihre Fahrkarte! Abfahrt Gleis E um 14:20 Uhr. Gute Reise!",
          "hint": "In französischen Bahnhöfen heißen Gleise „voie\", oft mit Buchstaben oder Zahlen.",
          "prompt": "Bedanke dich herzlich.",
          "expected": "Merci beaucoup pour votre aide ! Bonne journée !",
          "expectedDe": "Vielen Dank für Ihre Hilfe! Einen schönen Tag!",
          "options": [
            {
              "text": "Merci beaucoup pour votre aide ! Bonne journée !",
              "de": "Vielen Dank für Ihre Hilfe! Einen schönen Tag!",
              "correct": true
            },
            {
              "text": "Je ne comprends pas l'exercice.",
              "de": "Ich verstehe die Übung nicht.",
              "correct": false
            },
            {
              "text": "Il est déjà minuit.",
              "de": "Es ist schon Mitternacht.",
              "correct": false
            }
          ]
        }
      ]
    }
  ],
  "ar": [
    {
      "id": "ar-cafe",
      "language": "ar",
      "title": "فِي الْمَقْهَى (Im Café)",
      "situation": "Du sitzt in einem traditionellen Café in Kairo und möchtest ein Heißgetränk bestellen.",
      "icon": "fa-mug-hot",
      "npcName": "طارِق (Tariq)",
      "npcRole": "Nādīl (Kellner)",
      "level": "A1",
      "turns": [
        {
          "npc": "أَهْلًا وَسَهْلًا! مَسَاءُ الْخَيْرِ، مَاذَا تُحِبُّ أَنْ تَشْرَبَ؟",
          "npcDe": "Willkommen! Guten Abend, was möchtest du trinken?",
          "npcRoman": "Ahlan wa-sahlan! Masāʾu l-ḫairi, māḏā tuḥibbu ʾan tašraba?",
          "hint": "„Ahlan wa-sahlan\" ist die herzlichste Willkommensformel im Orient.",
          "prompt": "Bestelle arabischen Kaffee oder Tee mit Minze.",
          "expected": "شَاي بِالنَّعْنَاعِ، مِنْ فَضْلِكَ.",
          "expectedDe": "Tee mit Minze, bitte.",
          "expectedRoman": "Šāy bi-n-naʿnāʿ, min faḍlika.",
          "options": [
            {
              "text": "شَاي بِالنَّعْنَاعِ، مِنْ فَضْلِكَ.",
              "de": "Tee mit Minze, bitte.",
              "correct": true
            },
            {
              "text": "أَيْنَ الْمَطَارُ الدَّوْلِيُّ؟",
              "de": "Wo ist der internationale Flughafen?",
              "correct": false
            },
            {
              "text": "أَنَا أَنَامُ الْآنَ.",
              "de": "Ich schlafe jetzt.",
              "correct": false
            }
          ]
        },
        {
          "npc": "حَاضِرٌ، شَاي لَذِيذٌ جِدًّا! هَلْ تُرِيدُ سُكَّرًا مَعَهُ؟",
          "npcDe": "Sehr gerne, ein köstlicher Tee! Möchtest du Zucker dazu?",
          "npcRoman": "Ḥāḍir, šāy laḏīḏun ǧiddan! Hal turīdu sukkarān maʿahu?",
          "hint": "„Ḥāḍir\" bedeutet wörtlich „zu Diensten / wird sofort erledigt\".",
          "prompt": "Sage: „Wenig Zucker, bitte.\"",
          "expected": "قَلِيلٌ مِنَ السُّكَّرِ، شُكْرًا.",
          "expectedDe": "Wenig Zucker, danke.",
          "expectedRoman": "Qalīlun mina s-sukkari, šukran.",
          "options": [
            {
              "text": "قَلِيلٌ مِنَ السُّكَّرِ، شُكْرًا.",
              "de": "Wenig Zucker, danke.",
              "correct": true
            },
            {
              "text": "الْجَوُّ حَارٌّ جِدًّا الْيَوْمَ.",
              "de": "Das Wetter ist heute sehr heiß.",
              "correct": false
            },
            {
              "text": "أَنَا لَا أَعْرِفُ اسْمَكَ.",
              "de": "Ich kenne deinen Namen nicht.",
              "correct": false
            }
          ]
        },
        {
          "npc": "تَفَضَّلْ، الشَّايُ سَاخِنٌ! هَلْ تُرِيدُ أَيَّ شَيْءٍ آخَرَ؟",
          "npcDe": "Bitte sehr, der Tee ist heiß! Möchtest du noch etwas anderes?",
          "npcRoman": "Tafaḍḍal, aš-šāyu sāḫin! Hal turīdu ʾayya šayʾin ʾāḫar?",
          "hint": "„Tafaḍḍal\" sagt man immer beim Anbieten oder Überreichen (maskulin).",
          "prompt": "Bitte um die Rechnung.",
          "expected": "الْحِسَابَ، لَوْ سَمَحْتَ.",
          "expectedDe": "Die Rechnung, wenn du gestattest (bitte).",
          "expectedRoman": "Al-ḥisāba, law samaḥta.",
          "options": [
            {
              "text": "الْحِسَابَ، لَوْ سَمَحْتَ.",
              "de": "Die Rechnung, bitte.",
              "correct": true
            },
            {
              "text": "كَمْ عُمْرُكَ يَا أَخِي؟",
              "de": "Wie alt bist du, mein Bruder?",
              "correct": false
            },
            {
              "text": "سَأُسَافِرُ غَدًا إِلَى لُنْدُن.",
              "de": "Ich reise morgen nach London.",
              "correct": false
            }
          ]
        }
      ],
      "category": "food"
    },
    {
      "id": "ar-directions",
      "language": "ar",
      "title": "السُّؤَالُ عَنِ الطَّرِيقِ (Wegbeschreibung)",
      "situation": "Du bist in der Altstadt und suchst den Weg zum traditionellen Markt (Souk).",
      "icon": "fa-map-location-dot",
      "npcName": "مَحْمُود (Mahmud)",
      "npcRole": "Passant",
      "level": "A1",
      "turns": [
        {
          "npc": "مَرْحَبًا يَا صَدِيقِي، كَيْفَ حَالُكَ؟ هَلْ تَحْتَاجُ مُسَاعَدَةً؟",
          "npcDe": "Hallo mein Freund, wie geht es dir? Brauchst du Hilfe?",
          "npcRoman": "Marḥaban yā ṣadīqī, kayfa ḥāluka? Hal taḥtāǧu musāʿadatah?",
          "hint": "„Marḥaban\" ist eine universelle, herzliche Begrüßung im Arabischen.",
          "prompt": "Frage nach dem Weg zum Markt (as-Sūq).",
          "expected": "مِنْ فَضْلِكَ، أَيْنَ السُّوقُ الْقَدِيمُ؟",
          "expectedDe": "Bitte, wo ist der alte Markt?",
          "expectedRoman": "Min faḍlika, ʾayna s-sūqu l-qadīmu?",
          "options": [
            {
              "text": "مِنْ فَضْلِكَ، أَيْنَ السُّوقُ الْقَدِيمُ؟",
              "de": "Bitte, wo ist der alte Markt?",
              "correct": true
            },
            {
              "text": "أَنَا أُحِبُّ قِرَاءَةَ الْكُتُبِ.",
              "de": "Ich liebe es, Bücher zu lesen.",
              "correct": false
            },
            {
              "text": "أَيْنَ سَيَّارَتِي؟",
              "de": "Wo ist mein Auto?",
              "correct": false
            }
          ]
        },
        {
          "npc": "امْشِ إِلَى الْأَمَامِ مُبَاشَرَةً، ثُمَّ اتَّجِهْ يَمِينًا عِنْدَ الْمَسْجِدِ.",
          "npcDe": "Geh direkt geradeaus, dann wende dich an der Moschee nach rechts.",
          "npcRoman": "Imši ʾilā l-ʾamāmi mubāšaratan, ṯumma ttaǧih yamīnan ʿinda l-masǧid.",
          "hint": "„Yamīnan\" = rechts, „Yasāran\" = links, „Ilā l-amām\" = geradeaus.",
          "prompt": "Frage: „Ist es weit von hier?\"",
          "expected": "هَلْ هُوَ بَعِيدٌ مِنْ هُنَا؟",
          "expectedDe": "Ist es weit von hier?",
          "expectedRoman": "Hal huwa baʿīdun min hunā?",
          "options": [
            {
              "text": "هَلْ هُوَ بَعِيدٌ مِنْ هُنَا؟",
              "de": "Ist es weit von hier?",
              "correct": true
            },
            {
              "text": "مَا اسْمُ هَذَا الشَّارِعِ؟",
              "de": "Wie heißt diese Straße?",
              "correct": false
            },
            {
              "text": "كَمِ السَّاعَةُ الْآنَ؟",
              "de": "Wie viel Uhr ist es jetzt?",
              "correct": false
            }
          ]
        },
        {
          "npc": "لَا، خَمْسُ دَقَائِقَ سَيْرًا عَلَى الْأَقْدَامِ فَقَطْ!",
          "npcDe": "Nein, nur fünf Minuten zu Fuß!",
          "npcRoman": "Lā, ḫamsu daqāʾiqa sayran ʿalā l-ʾaqdāmi faqaṭ!",
          "hint": "„Faqaṭ\" am Satzende bedeutet „nur / lediglich\".",
          "prompt": "Bedanke dich mit „Schukran jazilan\".",
          "expected": "شُكْرًا جَزِيلًا، بَارَكَ اللَّهُ فِيكَ!",
          "expectedDe": "Vielen Dank, Gott segne dich!",
          "expectedRoman": "Šukran ǧazīlan, bāraka Llāhu fīka!",
          "options": [
            {
              "text": "شُكْرًا جَزِيلًا، بَارَكَ اللَّهُ فِيكَ!",
              "de": "Vielen Dank, Gott segne dich!",
              "correct": true
            },
            {
              "text": "أَنَا لَا أُرِيدُ ذَلِكَ.",
              "de": "Ich will das nicht.",
              "correct": false
            },
            {
              "text": "إِلَى اللِّقَاءِ يَا أُمِّي.",
              "de": "Auf Wiedersehen, Mama.",
              "correct": false
            }
          ]
        }
      ],
      "category": "travel"
    },
    {
      "id": "ar-hotel",
      "language": "ar",
      "category": "travel",
      "title": "فِي الْفُنْدُقِ (Im Hotel)",
      "situation": "Du kommst in einem Hotel in Kairo an und checkst an der Rezeption ein.",
      "icon": "fa-hotel",
      "npcName": "كَرِيم (Karim)",
      "npcRole": "مُوَظَّفُ الِاسْتِقْبَالِ (Rezeptionist)",
      "level": "A2",
      "turns": [
        {
          "npc": "مَسَاءُ الْخَيْرِ! أَهْلًا بِكَ فِي فُنْدُقِ النِّيلِ. هَلْ لَدَيْكَ حَجْزٌ؟",
          "npcDe": "Guten Abend! Willkommen im Hotel Nil. Haben Sie eine Reservierung?",
          "npcRoman": "Masāʾu l-ḫayri! ʾAhlan bika fī funduqi n-Nīli. Hal ladayka ḥaǧzun?",
          "hint": "„Masāʾu l-ḫayr\" erwidert man mit „Masāʾu n-nūr\" (Lichtvoller Abend).",
          "prompt": "Bestätige die Reservierung auf deinen Namen.",
          "expected": "مَسَاءَ النُّورِ، نَعَمْ لَدَيَّ حَجْزٌ بِاسْمِ سَمِير.",
          "expectedDe": "Guten Abend, ja, ich habe eine Reservierung auf den Namen Samir.",
          "expectedRoman": "Masāʾa n-nūri, naʿam ladayya ḥaǧzun bi-smi Samīr.",
          "options": [
            {
              "text": "مَسَاءَ النُّورِ، نَعَمْ لَدَيَّ حَجْزٌ بِاسْمِ سَمِير.",
              "de": "Guten Abend, ja, ich habe eine Reservierung auf den Namen Samir.",
              "correct": true
            },
            {
              "text": "أَنَا أَشْرَبُ قَهْوَةً سَاخِنَةً.",
              "de": "Ich trinke heißen Kaffee.",
              "correct": false
            },
            {
              "text": "السَّفِينَةُ كَبِيرَةٌ جِدًّا.",
              "de": "Das Schiff ist sehr groß.",
              "correct": false
            }
          ]
        },
        {
          "npc": "أَهْلًا وَسَهْلًا! هَلْ تُرِيدُ غُرْفَةً مَعَ إِطْلَالَةٍ عَلَى النَّهْرِ؟",
          "npcDe": "Herzlich willkommen! Möchten Sie ein Zimmer mit Blick auf den Fluss?",
          "npcRoman": "ʾAhlan wa-sahlan! Hal turīdu ġurfatan maʿa ʾiṭlālatin ʿalā n-nahri?",
          "hint": "„ʾIṭlālah\" bedeutet Aussicht / Blick.",
          "prompt": "Sage: „Ja, ein Zimmer mit Nilblick, bitte.\"",
          "expected": "نَعَمْ، أُرِيدُ غُرْفَةً مَعَ إِطْلَالَةٍ عَلَى النِّيلِ، مِنْ فَضْلِكَ.",
          "expectedDe": "Ja, ich möchte ein Zimmer mit Nilblick, bitte.",
          "expectedRoman": "Naʿam, ʾurīdu ġurfatan maʿa ʾiṭlālatin ʿalā n-Nīli, min faḍlika.",
          "options": [
            {
              "text": "نَعَمْ، أُرِيدُ غُرْفَةً مَعَ إِطْلَالَةٍ عَلَى النِّيلِ، مِنْ فَضْلِكَ.",
              "de": "Ja, ich möchte ein Zimmer mit Nilblick, bitte.",
              "correct": true
            },
            {
              "text": "الْقَمَرُ مُنِيرٌ فِي السَّمَاءِ.",
              "de": "Der Mond leuchtet am Himmel.",
              "correct": false
            },
            {
              "text": "أَيْنَ قَمِيصِي الْأَزْرَقُ؟",
              "de": "Wo ist mein blaues Hemd?",
              "correct": false
            }
          ]
        },
        {
          "npc": "تَفَضَّلْ مِفْتَاحَ الْغُرْفَةِ رَقْمِ ثَلَاثِمِئَةٍ، وَالْفُطُورُ فِي الطَّابِقِ الْأَوَّلِ.",
          "npcDe": "Bitte sehr der Schlüssel zu Zimmer 300, und das Frühstück ist im ersten Stock.",
          "npcRoman": "Tafaḍḍal miftāḥa l-ġurfati raqmi ṯalāṯimiʾatin, wa-l-fuṭūru fī ṭ-ṭābiqi l-ʾawwali.",
          "hint": "„Al-fuṭūr\" = Frühstück.",
          "prompt": "Bedanke dich und frage nach dem Internet-Passwort.",
          "expected": "شُكْرًا جَزِيلًا، مَا هِيَ كَلِمَةُ السِّرِّ لِلْإِنْتَرْنِت؟",
          "expectedDe": "Vielen Dank, was ist das Passwort für das Internet?",
          "expectedRoman": "Šukran ǧazīlan, mā hiya kalimatu s-sirri lil-ʾintarnit?",
          "options": [
            {
              "text": "شُكْرًا جَزِيلًا، مَا هِيَ كَلِمَةُ السِّرِّ لِلْإِنْتَرْنِت؟",
              "de": "Vielen Dank, was ist das Passwort für das Internet?",
              "correct": true
            },
            {
              "text": "لَا أَعْرِفُ كَيْفَ أَسْبَحُ.",
              "de": "Ich weiß nicht, wie man schwimmt.",
              "correct": false
            },
            {
              "text": "الْيَوْمُ يَوْمُ الْجُمُعَةِ.",
              "de": "Heute ist Freitag.",
              "correct": false
            }
          ]
        }
      ]
    },
    {
      "id": "ar-pharmacy",
      "language": "ar",
      "category": "health",
      "title": "فِي الصَّيْدَلِيَّةِ (In der Apotheke)",
      "situation": "Du hast Kopf- und Halsschmerzen und bittest die Apothekerin um Medizin.",
      "icon": "fa-kit-medical",
      "npcName": "نُور (Nur)",
      "npcRole": "صَيْدَلَانِيَّة (Apothekerin)",
      "level": "A2",
      "turns": [
        {
          "npc": "مَرْحَبًا! كَيْفَ أَسْتَطِيعُ أَنْ أُسَاعِدَكَ الْيَوْمَ؟",
          "npcDe": "Hallo! Wie kann ich Ihnen heute helfen?",
          "npcRoman": "Marḥaban! Kayfa ʾastaṭīʿu ʾan ʾusāʿidaka l-yawma?",
          "hint": "„Ṣaydaliyya\" ist die Apotheke im Arabischen.",
          "prompt": "Erkläre, dass du starke Kopf- und Halsschmerzen hast.",
          "expected": "مَرْحَبًا، عِنْدِي صُدَاعٌ شَدِيدٌ وَأَلَمٌ فِي الْحَلْقِ.",
          "expectedDe": "Hallo, ich habe starke Kopfschmerzen und Schmerzen im Hals.",
          "expectedRoman": "Marḥaban, ʿindī ṣudāʿun šadīdun wa-ʾalamun fī l-ḥalqi.",
          "options": [
            {
              "text": "مَرْحَبًا، عِنْدِي صُدَاعٌ شَدِيدٌ وَأَلَمٌ فِي الْحَلْقِ.",
              "de": "Hallo, ich habe starke Kopfschmerzen und Schmerzen im Hals.",
              "correct": true
            },
            {
              "text": "أَيْنَ تَقَعُ مَدِينَةُ الْقَاهِرَةِ؟",
              "de": "Wo liegt die Stadt Kairo?",
              "correct": false
            },
            {
              "text": "هَذَا الْكِتَابُ مُمْتِعٌ جِدًّا.",
              "de": "Dieses Buch ist sehr spannend.",
              "correct": false
            }
          ]
        },
        {
          "npc": "سَلَامَتُكَ! هَلْ لَدَيْكَ حَرَارَةٌ مُرْتَفِعَةٌ أَوْ أَيُّ حَسَاسِيَّةٍ؟",
          "npcDe": "Gute Besserung! Haben Sie hohes Fieber oder eine Allergie?",
          "npcRoman": "Salāmatuka! Hal ladayka ḥarāratun murtafiʿatun ʾaw ʾayyu ḥasāsiyyatin?",
          "hint": "„Salāmatuk\" wünscht man Kranken (Heil und Genesung).",
          "prompt": "Antworte, dass du keine Allergie hast und nach der Medizin fragst.",
          "expected": "لَا، لَيْسَتْ لَدَيَّ حَسَاسِيَّةٌ. مَا هُوَ الْعِلَاجُ الْمُنَاسِبُ؟",
          "expectedDe": "Nein, ich habe keine Allergie. Was ist die passende Behandlung?",
          "expectedRoman": "Lā, laysat ladayya ḥasāsiyyatun. Mā huwa l-ʿilāǧu l-munāsibu?",
          "options": [
            {
              "text": "لَا، لَيْسَتْ لَدَيَّ حَسَاسِيَّةٌ. مَا هُوَ الْعِلَاجُ الْمُنَاسِبُ؟",
              "de": "Nein, ich habe keine Allergie. Was ist die passende Behandlung?",
              "correct": true
            },
            {
              "text": "أَنَا أُسَافِرُ بِالطَّائِرَةِ.",
              "de": "Ich reise mit dem Flugzeug.",
              "correct": false
            },
            {
              "text": "الْبَحْرُ هَادِئٌ الْيَوْمَ.",
              "de": "Das Meer ist heute ruhig.",
              "correct": false
            }
          ]
        },
        {
          "npc": "خُذْ هَذَا الْمُسَكِّنَ حَبَّةً وَاحِدَةً بَعْدَ الطَّعَامِ مَرَّتَيْنِ فِي الْيَوْمِ.",
          "npcDe": "Nehmen Sie dieses Schmerzmittel, eine Tablette nach dem Essen zweimal am Tag.",
          "npcRoman": "Ḫuḏ hāḏā l-musakkina ḥabbatan wāḥidatan baʿda ṭ-ṭaʿāmi marratayni fī l-yawmi.",
          "hint": "„Marratayni fī l-yawm\" = zweimal am Tag.",
          "prompt": "Bedanke dich und frage nach dem Preis.",
          "expected": "شُكْرًا لَكِ عَلَى النَّصِيحَةِ، كَمِ الثَّمَنُ؟",
          "expectedDe": "Danke dir für den Rat, wie viel ist der Preis?",
          "expectedRoman": "Šukran laki ʿalā n-naṣīḥati, kami ṯ-ṯamanu?",
          "options": [
            {
              "text": "شُكْرًا لَكِ عَلَى النَّصِيحَةِ، كَمِ الثَّمَنُ؟",
              "de": "Danke dir für den Rat, wie viel ist der Preis?",
              "correct": true
            },
            {
              "text": "أَنَا لَا أُحِبُّ الشِّتَاءَ.",
              "de": "Ich mag den Winter nicht.",
              "correct": false
            },
            {
              "text": "هَلْ هَذَا مَطْعَمٌ إِيطَالِيٌّ؟",
              "de": "Ist das ein italienisches Restaurant?",
              "correct": false
            }
          ]
        }
      ]
    },
    {
      "id": "ar-station",
      "language": "ar",
      "category": "travel",
      "title": "فِي مَحَطَّةِ الْقِطَارِ (Am Bahnhof)",
      "situation": "Du kaufst am Schalter eine Fahrkarte nach Alexandria.",
      "icon": "fa-train",
      "npcName": "أَحْمَد (Ahmad)",
      "npcRole": "مُوَظَّفُ التَّذَاكِرِ (Ticketverkäufer)",
      "level": "A2",
      "turns": [
        {
          "npc": "صَبَاحُ الْخَيْرِ! إِلَى أَيِّ مَدِينَةٍ تُرِيدُ السَّفَرَ؟",
          "npcDe": "Guten Morgen! In welche Stadt möchten Sie reisen?",
          "npcRoman": "Ṣabāḥu l-ḫayri! ʾIlā ʾayyi madīnatin turīdu s-safara?",
          "hint": "„Al-qiṭār\" = der Zug; „Maḥaṭṭah\" = der Bahnhof.",
          "prompt": "Sage, dass du eine Fahrkarte nach Alexandria möchtest.",
          "expected": "صَبَاحَ الْخَيْرِ، أُرِيدُ تَذْكِرَةً إِلَى مَدِينَةِ الْإِسْكَنْدَرِيَّةِ.",
          "expectedDe": "Guten Morgen, ich möchte eine Fahrkarte nach Alexandria.",
          "expectedRoman": "Ṣabāḥa l-ḫayri, ʾurīdu taḏkiratan ʾilā madīnati l-ʾIskandariyyati.",
          "options": [
            {
              "text": "صَبَاحَ الْخَيْرِ، أُرِيدُ تَذْكِرَةً إِلَى مَدِينَةِ الْإِسْكَنْدَرِيَّةِ.",
              "de": "Guten Morgen, ich möchte eine Fahrkarte nach Alexandria.",
              "correct": true
            },
            {
              "text": "أَيْنَ مَحَلُّ الْمَلَابِسِ؟",
              "de": "Wo ist das Kleidergeschäft?",
              "correct": false
            },
            {
              "text": "هَذِهِ شَجَرَةٌ عَالِيَةٌ.",
              "de": "Dies ist ein hoher Baum.",
              "correct": false
            }
          ]
        },
        {
          "npc": "هَلْ تُرِيدُ تَذْكِرَةَ ذَهَابٍ فَقَطْ أَمْ ذَهَابٍ وَإِيَابٍ؟",
          "npcDe": "Möchten Sie nur Hinfahrt oder Hin- und Rückfahrt?",
          "npcRoman": "Hal turīdu taḏkirata ḏahābin faqaṭ ʾam ḏahābin wa-ʾīyābin?",
          "hint": "„Ḏahāb\" = Hinfahrt; „ʾĪyāb\" = Rückfahrt.",
          "prompt": "Wähle eine Hinfahrt in der ersten Klasse.",
          "expected": "تَذْكِرَةَ ذَهَابٍ فِي الدَّرَجَةِ الْأُولَى، مِنْ فَضْلِكَ.",
          "expectedDe": "Eine Hinfahrt in der ersten Klasse, bitte.",
          "expectedRoman": "Taḏkirata ḏahābin fī d-daraǧati l-ʾūlā, min faḍlika.",
          "options": [
            {
              "text": "تَذْكِرَةَ ذَهَابٍ فِي الدَّرَجَةِ الْأُولَى، مِنْ فَضْلِكَ.",
              "de": "Eine Hinfahrt in der ersten Klasse, bitte.",
              "correct": true
            },
            {
              "text": "سَأَشْتَرِي هَاتِفًا جَدِيدًا.",
              "de": "Ich werde ein neues Telefon kaufen.",
              "correct": false
            },
            {
              "text": "الْغَدَاءُ كَانَ لَذِيذًا.",
              "de": "Das Mittagessen war köstlich.",
              "correct": false
            }
          ]
        },
        {
          "npc": "حَسَنًا، الْقِطَارُ السَّرِيعُ يَنْطَلِقُ مِنَ الرَّصِيفِ رَقْمِ أَرْبَعَةٍ.",
          "npcDe": "Sehr gut, der Expresszug fährt von Bahnsteig Nummer vier ab.",
          "npcRoman": "Ḥasanan, al-qiṭāru s-sarīʿu yanṭaliqu mina r-raṣīfi raqmi ʾarbaʿatin.",
          "hint": "„Ar-raṣīf\" = Bahnsteig / Gleis.",
          "prompt": "Bedanke dich und frage nach der Fahrtdauer.",
          "expected": "شُكْرًا لَكَ! كَمْ سَاعَةً تَسْتَغْرِقُ الرِّحْلَةُ؟",
          "expectedDe": "Danke dir! Wie viele Stunden dauert die Reise?",
          "expectedRoman": "Šukran laka! Kam sāʿatan tastaġriqu r-riḥlatu?",
          "options": [
            {
              "text": "شُكْرًا لَكَ! كَمْ سَاعَةً تَسْتَغْرِقُ الرِّحْلَةُ؟",
              "de": "Danke dir! Wie viele Stunden dauert die Reise?",
              "correct": true
            },
            {
              "text": "أَيْنَ نَامَ الْقِطُّ؟",
              "de": "Wo hat die Katze geschlafen?",
              "correct": false
            },
            {
              "text": "لَا أَعْرِفُ تَارِيخَ الْيَوْمِ.",
              "de": "Ich kenne das heutige Datum nicht.",
              "correct": false
            }
          ]
        }
      ]
    }
  ],
  "zh": [
    {
      "id": "zh-cafe",
      "language": "zh",
      "title": "在茶馆/咖啡馆 (Im Teehaus / Café)",
      "situation": "Du besuchst ein traditionelles Teehaus in Peking.",
      "icon": "fa-mug-hot",
      "npcName": "王敏 (Wang Min)",
      "npcRole": "服务员 (Bedienung)",
      "level": "A1",
      "turns": [
        {
          "npc": "您好！欢迎光临。请问几位？",
          "npcDe": "Guten Tag! Willkommen. Wie viele Personen sind Sie bitte?",
          "npcRoman": "Nǐ hǎo! Huānyíng guānglín. Qǐngwèn jǐ wèi?",
          "hint": "„Qǐngwèn\" (darf ich fragen) ist die typische Höflichkeitsfloskel in China.",
          "prompt": "Sage: „Eine Person, bitte.\"",
          "expected": "您好，一位，谢谢。",
          "expectedDe": "Hallo, eine Person, danke.",
          "expectedRoman": "Nǐ hǎo, yí wèi, xièxie.",
          "options": [
            {
              "text": "您好，一位，谢谢。",
              "de": "Hallo, eine Person, danke.",
              "correct": true
            },
            {
              "text": "我是德国人。",
              "de": "Ich bin Deutscher.",
              "correct": false
            },
            {
              "text": "火车票在哪里买？",
              "de": "Wo kauft man Zugfahrkarten?",
              "correct": false
            }
          ]
        },
        {
          "npc": "请坐！您想喝点什么茶？我们有龙井和茉莉花茶。",
          "npcDe": "Bitte setzen Sie sich! Welchen Tee möchten Sie trinken? Wir haben Longjing und Jasmintee.",
          "npcRoman": "Qǐng zuò! Nǐn xiǎng hē diǎn shénme chá? Wǒmen yǒu Lóngjǐng hé Mòlìhuā chá.",
          "hint": "„Mòlìhuā chá\" (Jasmintee) ist besonders aromatisch und beliebt.",
          "prompt": "Bestelle eine Kanne Jasmintee.",
          "expected": "我要一壶茉莉花茶，谢谢。",
          "expectedDe": "Ich möchte eine Kanne Jasmintee, danke.",
          "expectedRoman": "Wǒ yào yì hú mòlìhuā chá, xièxie.",
          "options": [
            {
              "text": "我要一壶茉莉花茶，谢谢。",
              "de": "Ich möchte eine Kanne Jasmintee, danke.",
              "correct": true
            },
            {
              "text": "今天天气真好。",
              "de": "Heute ist das Wetter wirklich gut.",
              "correct": false
            },
            {
              "text": "我不吃肉。",
              "de": "Ich esse kein Fleisch.",
              "correct": false
            }
          ]
        },
        {
          "npc": "好的，马上来！一共三十五块钱。",
          "npcDe": "In Ordnung, kommt sofort! Das macht zusammen 35 Yuan.",
          "npcRoman": "Hǎo de, mǎshàng lái! Yígòng sānshíwǔ kuài qián.",
          "hint": "„Kuài\" ist das umgangssprachliche Wort für die Währung Renminbi/Yuan.",
          "prompt": "Frage, ob du mit dem Handy (Alipay/WeChat) bezahlen kannst.",
          "expected": "可以扫码支付吗？",
          "expectedDe": "Kann ich per QR-Code zahlen?",
          "expectedRoman": "Kěyǐ sǎomǎ zhīfù ma?",
          "options": [
            {
              "text": "可以扫码支付吗？",
              "de": "Kann ich per QR-Code zahlen?",
              "correct": true
            },
            {
              "text": "请问洗手间在哪里？",
              "de": "Entschuldigung, wo ist die Toilette?",
              "correct": false
            },
            {
              "text": "明天见！",
              "de": "Bis morgen!",
              "correct": false
            }
          ]
        }
      ],
      "category": "food"
    },
    {
      "id": "zh-directions",
      "language": "zh",
      "title": "问路 (Nach dem Weg fragen)",
      "situation": "Du suchst die nächste U-Bahn-Station in Shanghai.",
      "icon": "fa-map-location-dot",
      "npcName": "李老师 (Herr Li)",
      "npcRole": "路人 (Passant)",
      "level": "A1",
      "turns": [
        {
          "npc": "你好，请问有什么可以帮你的吗？",
          "npcDe": "Hallo, kann ich dir irgendwie helfen?",
          "npcRoman": "Nǐ hǎo, qǐngwèn yǒu shénme kěyǐ bāng nǐ de ma?",
          "hint": "In China helfen Passanten Touristen und Sprachlernern gern weiter.",
          "prompt": "Frage: „Entschuldigung, wo ist die U-Bahn-Station?\"",
          "expected": "请问，地铁站在哪里？",
          "expectedDe": "Entschuldigung, wo ist die U-Bahn-Station?",
          "expectedRoman": "Qǐngwèn, dìtiězàn zài nǎlǐ?",
          "options": [
            {
              "text": "请问，地铁站在哪里？",
              "de": "Entschuldigung, wo ist die U-Bahn-Station?",
              "correct": true
            },
            {
              "text": "这个苹果很好吃。",
              "de": "Dieser Apfel ist sehr lecker.",
              "correct": false
            },
            {
              "text": "我喜欢看电影。",
              "de": "Ich schaue gern Filme.",
              "correct": false
            }
          ]
        },
        {
          "npc": "一直往前走，在第二个路口向右转就到了。",
          "npcDe": "Geh immer geradeaus, biege an der zweiten Kreuzung nach rechts ab, dann bist du da.",
          "npcRoman": "Yìzhí wǎng qián zǒu, zài dì èr gè lùkǒu xiàng yòu zhuǎn jiù dào le.",
          "hint": "„Yìzhí wǎng qián zǒu\" = immer geradeaus; „xiàng yòu zhuǎn\" = nach rechts biegen.",
          "prompt": "Frage, wie viele Minuten es dauert.",
          "expected": "走路需要几分钟？",
          "expectedDe": "Wie viele Minuten braucht man zu Fuß?",
          "expectedRoman": "Zǒulù xūyào jǐ fēnzhōng?",
          "options": [
            {
              "text": "走路需要几分钟？",
              "de": "Wie viele Minuten braucht man zu Fuß?",
              "correct": true
            },
            {
              "text": "今天几月几号？",
              "de": "Welches Datum haben wir heute?",
              "correct": false
            },
            {
              "text": "你叫什么名字？",
              "de": "Wie heißt du?",
              "correct": false
            }
          ]
        },
        {
          "npc": "大概五分钟，很近的。祝你旅途愉快！",
          "npcDe": "Etwa fünf Minuten, ganz nah. Schöne Reise noch!",
          "npcRoman": "Dàgài wǔ fēnzhōng, hěn jìn de. Zhù nǐ lǚtú yúkuài!",
          "hint": "„Hěn jìn\" = sehr nah.",
          "prompt": "Bedanke dich mit „Xièxie nǐ\".",
          "expected": "太感谢你了！再见！",
          "expectedDe": "Vielen Dank dir! Auf Wiedersehen!",
          "expectedRoman": "Tài gǎnxiè nǐ le! Zàijiàn!",
          "options": [
            {
              "text": "太感谢你了！再见！",
              "de": "Vielen Dank dir! Auf Wiedersehen!",
              "correct": true
            },
            {
              "text": "我没有时间。",
              "de": "Ich habe keine Zeit.",
              "correct": false
            },
            {
              "text": "对不起，我不会说中文。",
              "de": "Entschuldigung, ich spreche kein Chinesisch.",
              "correct": false
            }
          ]
        }
      ],
      "category": "travel"
    },
    {
      "id": "zh-hotel",
      "language": "zh",
      "category": "travel",
      "title": "在酒店办理入住 (Hotel-Check-in)",
      "situation": "Du kommst in einem Hotel in Peking an und möchtest einchecken.",
      "icon": "fa-hotel",
      "npcName": "张经理 (Herr Zhang)",
      "npcRole": "大堂前台 (Rezeptionist)",
      "level": "A2",
      "turns": [
        {
          "npc": "您好，欢迎光临北京饭店！请问您有预订吗？",
          "npcDe": "Guten Tag, willkommen im Peking-Hotel! Haben Sie eine Reservierung?",
          "npcRoman": "Nǐ hǎo, huānyíng guānglín Běijīng Fàndiàn! Qǐngwèn nǐn yǒu yùdìng ma?",
          "hint": "„Yùdìng\" = Reservierung / Buchung.",
          "prompt": "Bestätige die Reservierung auf den Namen Schmidt.",
          "expected": "您好，我有预订，名字叫施密特。",
          "expectedDe": "Guten Tag, ich habe eine Reservierung auf den Namen Schmidt.",
          "expectedRoman": "Nǐ hǎo, wǒ yǒu yùdìng, míngzi jiào Shīmìtè.",
          "options": [
            {
              "text": "您好，我有预订，名字叫施密特。",
              "de": "Guten Tag, ich habe eine Reservierung auf den Namen Schmidt.",
              "correct": true
            },
            {
              "text": "这辆自行车很漂亮。",
              "de": "Dieses Fahrrad ist sehr schön.",
              "correct": false
            },
            {
              "text": "今天天气很冷。",
              "de": "Heute ist das Wetter sehr kalt.",
              "correct": false
            }
          ]
        },
        {
          "npc": "找到了，是大床房住三晚。请出示您的护照办理登记。",
          "npcDe": "Gefunden, ein Doppelbettzimmer für drei Nächte. Bitte zeigen Sie Ihren Pass zur Registrierung.",
          "npcRoman": "Zhǎodào le, shì dàchuángfáng zhù sān wǎn. Qǐng chūshì nín de hùzhào bànlǐ dēngjì.",
          "hint": "„Hùzhào\" = Reisepass.",
          "prompt": "Reiche den Pass und frage nach den Frühstückszeiten.",
          "expected": "这是我的护照。请问早餐是几点开始？",
          "expectedDe": "Hier ist mein Pass. Um wie viel Uhr beginnt das Frühstück?",
          "expectedRoman": "Zhè shì wǒ de hùzhào. Qǐngwèn zǎocān shì jǐ diǎn kāishǐ?",
          "options": [
            {
              "text": "这是我的护照。请问早餐是几点开始？",
              "de": "Hier ist mein Pass. Um wie viel Uhr beginnt das Frühstück?",
              "correct": true
            },
            {
              "text": "我想买两张电影票。",
              "de": "Ich möchte zwei Kinokarten kaufen.",
              "correct": false
            },
            {
              "text": "我不喜欢吃辣的菜。",
              "de": "Ich esse nicht gern scharfe Gerichte.",
              "correct": false
            }
          ]
        },
        {
          "npc": "早餐在二楼，早上七点到九点半。这是您的房卡，在八楼808。",
          "npcDe": "Frühstück ist im 2. Stock, 7:00 bis 9:30 Uhr. Hier ist Ihre Zimmerkarte, Zimmer 808 im 8. Stock.",
          "npcRoman": "Zǎocān zài èrlóu, zǎoshang qī diǎn dào jiǔ diǎn bàn. Zhè shì nín de fángkǎ, zài bālóu bābā líng.",
          "hint": "Die Zahl 8 gilt in China als absolute Glückszahl.",
          "prompt": "Bedanke dich und frage nach dem WLAN-Passwort.",
          "expected": "太好了，非常感谢！请问无线网络密码是什么？",
          "expectedDe": "Sehr gut, vielen Dank! Was ist das WLAN-Passwort?",
          "expectedRoman": "Tài hǎo le, fēicháng gǎnxiè! Qǐngwèn wúxiàn wǎngluò mìmǎ shì shénme?",
          "options": [
            {
              "text": "太好了，非常感谢！请问无线网络密码是什么？",
              "de": "Sehr gut, vielen Dank! Was ist das WLAN-Passwort?",
              "correct": true
            },
            {
              "text": "明天我要去爬长城。",
              "de": "Morgen gehe ich auf die Große Mauer klettern.",
              "correct": false
            },
            {
              "text": "我的手表坏了。",
              "de": "Meine Uhr ist kaputt gegangen.",
              "correct": false
            }
          ]
        }
      ]
    },
    {
      "id": "zh-pharmacy",
      "language": "zh",
      "category": "health",
      "title": "在药店买药 (In der Apotheke)",
      "situation": "Du hast Kopfschmerzen und Erkältung und kaufst Medizin in der Apotheke.",
      "icon": "fa-kit-medical",
      "npcName": "刘药师 (Apothekerin Liu)",
      "npcRole": "执业药师 (Apothekerin)",
      "level": "A2",
      "turns": [
        {
          "npc": "您好！您身体哪里不舒服？我来帮您选药。",
          "npcDe": "Guten Tag! Wo fühlen Sie sich unwohl? Ich helfe Ihnen bei der Medikamentenauswahl.",
          "npcRoman": "Nǐ hǎo! Nín shēntǐ nǎlǐ bù shūfu? Wǒ lái bāng nín xuǎn yào.",
          "hint": "„Bù shūfu\" = unwohl / krank.",
          "prompt": "Erkläre, dass du Kopfschmerzen hast und deine Nase läuft.",
          "expected": "您好，我头疼，而且流鼻涕，有点发烧。",
          "expectedDe": "Guten Tag, mein Kopf tut weh, meine Nase läuft und ich habe leichtes Fieber.",
          "expectedRoman": "Nǐ hǎo, wǒ tóuténg, érqiě liú bítì, yǒudiǎn fāshāo.",
          "options": [
            {
              "text": "您好，我头疼，而且流鼻涕，有点发烧。",
              "de": "Guten Tag, mein Kopf tut weh, meine Nase läuft und ich habe leichtes Fieber.",
              "correct": true
            },
            {
              "text": "我喜欢喝中国绿茶。",
              "de": "Ich trinke gern chinesischen Grüntee.",
              "correct": false
            },
            {
              "text": "地铁站离这里很远。",
              "de": "Die U-Bahn-Station ist weit weg von hier.",
              "correct": false
            }
          ]
        },
        {
          "npc": "这是感冒灵冲剂和退烧药。请问您对药物过敏吗？",
          "npcDe": "Hier ist Erkältungsgranulat und Fiebermittel. Sind Sie gegen Medikamente allergisch?",
          "npcRoman": "Zhè shì gǎnmàolíng chōngjì hé tuìshāoyào. Qǐngwèn nín duì yàowù guòmǐn ma?",
          "hint": "„Guòmǐn\" = allergisch.",
          "prompt": "Antworte, dass du nicht allergisch bist und frage nach der Einnahme.",
          "expected": "我不过敏。请问这个药一天吃几次？",
          "expectedDe": "Ich bin nicht allergisch. Wie oft am Tag nimmt man dieses Medikament?",
          "expectedRoman": "Wǒ bù guòmǐn. Qǐngwèn zhège yào yì tiān chī jǐ cì?",
          "options": [
            {
              "text": "我不过敏。请问这个药一天吃几次？",
              "de": "Ich bin nicht allergisch. Wie oft am Tag nimmt man dieses Medikament?",
              "correct": true
            },
            {
              "text": "我想买一件新衣服。",
              "de": "Ich möchte ein neues Kleidungsstück kaufen.",
              "correct": false
            },
            {
              "text": "今天星期天不用上班。",
              "de": "Heute ist Sonntag, keine Arbeit nötig.",
              "correct": false
            }
          ]
        },
        {
          "npc": "温水冲服，一日三次，一次一袋，饭后喝。多喝水多休息！",
          "npcDe": "Mit warmem Wasser auflösen, dreimal täglich ein Beutel nach dem Essen. Viel trinken und ausruhen!",
          "npcRoman": "Wēnshuǐ chōngfú, yí rì sān cì, yí cì yí dài, fànhòu hē. Duō hē shuǐ duō xiūxi!",
          "hint": "„Duō hē rèshuǐ\" (Trink viel heißes Wasser) ist der universelle Rat in China.",
          "prompt": "Bedanke dich und bezahle.",
          "expected": "好的，明白了，非常感谢您的帮助！",
          "expectedDe": "In Ordnung, verstanden, vielen Dank für Ihre Hilfe!",
          "expectedRoman": "Hǎo de, míngbai le, fēicháng gǎnxiè nín de bāngzhù!",
          "options": [
            {
              "text": "好的，明白了，非常感谢您的帮助！",
              "de": "In Ordnung, verstanden, vielen Dank für Ihre Hilfe!",
              "correct": true
            },
            {
              "text": "我要去超市买水果。",
              "de": "Ich gehe zum Supermarkt Obst kaufen.",
              "correct": false
            },
            {
              "text": "我昨天睡得很好。",
              "de": "Ich habe gestern sehr gut geschlafen.",
              "correct": false
            }
          ]
        }
      ]
    },
    {
      "id": "zh-station",
      "language": "zh",
      "category": "travel",
      "title": "在高铁站买票 (Am Bahnhof)",
      "situation": "Du kaufst am Schalter ein Ticket für den Schnellzug (Gaotie) nach Shanghai.",
      "icon": "fa-train",
      "npcName": "陈售票员 (Ticketverkäufer Chen)",
      "npcRole": "铁路售票员 (Schalterbeamter)",
      "level": "A2",
      "turns": [
        {
          "npc": "您好！请问您要买去哪里的车票？",
          "npcDe": "Guten Tag! Wohin möchten Sie eine Fahrkarte kaufen?",
          "npcRoman": "Nǐ hǎo! Qǐngwèn nín yào mǎi qù nǎlǐ de chēpiào?",
          "hint": "Gaotie-Züge erreichen in China Geschwindigkeiten bis 350 km/h.",
          "prompt": "Sage, dass du ein Gaotie-Ticket nach Shanghai kaufen möchtest.",
          "expected": "您好，我想买一张今天去上海的高铁票。",
          "expectedDe": "Guten Tag, ich möchte ein Gaotie-Ticket für heute nach Shanghai kaufen.",
          "expectedRoman": "Nǐ hǎo, wǒ xiǎng mǎi yì zhāng jīntiān qù Shànghǎi de gāotiě piào.",
          "options": [
            {
              "text": "您好，我想买一张今天去上海的高铁票。",
              "de": "Guten Tag, ich möchte ein Gaotie-Ticket für heute nach Shanghai kaufen.",
              "correct": true
            },
            {
              "text": "我想去图书馆借书。",
              "de": "Ich möchte in die Bibliothek gehen um Bücher auszuleihen.",
              "correct": false
            },
            {
              "text": "我的护照过期了。",
              "de": "Mein Pass ist abgelaufen.",
              "correct": false
            }
          ]
        },
        {
          "npc": "下午两点有G13次列车，请问要二等座还是一等座？",
          "npcDe": "Um 14 Uhr fährt der Zug G13. Möchten Sie zweite oder erste Klasse?",
          "npcRoman": "Xiàwǔ liǎng diǎn yǒu G13 cì lièchē, qǐngwèn yào èrděngzuò háishì yìděngzuò?",
          "hint": "„Èrděngzuò\" = 2. Klasse; „Yìděngzuò\" = 1. Klasse.",
          "prompt": "Wähle 2. Klasse am Fenster.",
          "expected": "二等座，靠窗的位置，谢谢。",
          "expectedDe": "Zweite Klasse, Platz am Fenster, danke.",
          "expectedRoman": "Èrděngzuò, kàochuāng de wèizhì, xièxie.",
          "options": [
            {
              "text": "二等座，靠窗的位置，谢谢。",
              "de": "Zweite Klasse, Platz am Fenster, danke.",
              "correct": true
            },
            {
              "text": "我不吃鱼肉。",
              "de": "Ich esse kein Fischfleisch.",
              "correct": false
            },
            {
              "text": "现在几点几分？",
              "de": "Wie viel Uhr und Minute ist es jetzt?",
              "correct": false
            }
          ]
        },
        {
          "npc": "好的，票价五百五十三元。在二号站台上车，祝您旅途愉快！",
          "npcDe": "In Ordnung, 553 Yuan. Einsteigen an Bahnsteig 2. Schöne Reise!",
          "npcRoman": "Hǎo de, piàojià wǔbǎi wǔshísān yuán. Zài èr hào zhàntái shàngchē, zhù nín lǚtú yúkuài!",
          "hint": "„Zhàntái\" = Bahnsteig.",
          "prompt": "Bedanke dich und bezahle per QR-Code.",
          "expected": "好的，谢谢！我用手机扫码支付。",
          "expectedDe": "In Ordnung, danke! Ich bezahle per Handy-Scan.",
          "expectedRoman": "Hǎo de, xièxie! Wǒ yòng shǒujī sǎomǎ zhīfù.",
          "options": [
            {
              "text": "好的，谢谢！我用手机扫码支付。",
              "de": "In Ordnung, danke! Ich bezahle per Handy-Scan.",
              "correct": true
            },
            {
              "text": "我的伞落在车上了。",
              "de": "Mein Regenschirm ist im Wagen liegen geblieben.",
              "correct": false
            },
            {
              "text": "明天是我的生日。",
              "de": "Morgen ist mein Geburtstag.",
              "correct": false
            }
          ]
        }
      ]
    }
  ],
  "ja": [
    {
      "id": "ja-cafe",
      "language": "ja",
      "title": "喫茶店で (Im Café in Tokio)",
      "situation": "Du bestellst in einem traditionellen japanischen Café in Shinjuku.",
      "icon": "fa-mug-hot",
      "npcName": "さくら (Sakura)",
      "npcRole": "店員 (Angestellte)",
      "level": "A1",
      "turns": [
        {
          "npc": "いらっしゃいませ！何名様でしょうか？",
          "npcDe": "Herzlich willkommen! Wie viele Personen sind Sie?",
          "npcRoman": "Irasshaimase! Nan-mei-sama deshō ka?",
          "hint": "„Irasshaimase\" hört man in fast jedem Geschäft und Restaurant in Japan.",
          "prompt": "Sage: „Eine Person, bitte.\"",
          "expected": "一人です、お願いします。",
          "expectedDe": "Eine Person, bitte.",
          "expectedRoman": "Hitori desu, onegai shimasu.",
          "options": [
            {
              "text": "一人です、お願いします。",
              "de": "Eine Person, bitte.",
              "correct": true
            },
            {
              "text": "日本は島国です。",
              "de": "Japan ist ein Inselstaat.",
              "correct": false
            },
            {
              "text": "電車が遅れました。",
              "de": "Der Zug hat sich verspätet.",
              "correct": false
            }
          ]
        },
        {
          "npc": "こちらのお席へどうぞ。ご注文はお決まりですか？",
          "npcDe": "Hier entlang zum Platz, bitte. Haben Sie schon gewählt?",
          "npcRoman": "Kochira no oseki e dōzo. Gochūmon wa okimari desu ka?",
          "hint": "„Onegai shimasu\" ist die höflichste Art, Wünsche zu äußern.",
          "prompt": "Bestelle einen heißen Kaffee und Matcha-Kuchen.",
          "expected": "ホットコーヒーと抹茶ケーキをください。",
          "expectedDe": "Einen heißen Kaffee und Matcha-Kuchen bitte.",
          "expectedRoman": "Hotto kōhī to matcha kēki o kudasai.",
          "options": [
            {
              "text": "ホットコーヒーと抹茶ケーキをください。",
              "de": "Einen heißen Kaffee und Matcha-Kuchen bitte.",
              "correct": true
            },
            {
              "text": "富士山に行きたいです。",
              "de": "Ich möchte zum Berg Fuji gehen.",
              "correct": false
            },
            {
              "text": "雨が降っています。",
              "de": "Es regnet gerade.",
              "correct": false
            }
          ]
        },
        {
          "npc": "かしこまりました。少々お待ちくださいませ。",
          "npcDe": "Sehr gerne verstanden. Bitte warten Sie einen kleinen Moment.",
          "npcRoman": "Kashikomarimashita. Shōshō omachi kudasai mase.",
          "hint": "„Kashikomarimashita\" ist formelles Keigo für „Ich habe verstanden / sehr gerne\".",
          "prompt": "Bedanke dich nach dem Servieren und bitte um die Rechnung.",
          "expected": "ごちそうさまでした。お会計をお願いします。",
          "expectedDe": "Danke für die Bewirtung. Die Rechnung bitte.",
          "expectedRoman": "Gochisōsama deshita. Okaikei o onegai shimasu.",
          "options": [
            {
              "text": "ごちそうさまでした。お会計をお願いします。",
              "de": "Danke fürs Essen. Die Rechnung bitte.",
              "correct": true
            },
            {
              "text": "明日は月曜日です。",
              "de": "Morgen ist Montag.",
              "correct": false
            },
            {
              "text": "箸をなくしました。",
              "de": "Ich habe die Stäbchen verloren.",
              "correct": false
            }
          ]
        }
      ],
      "category": "food"
    },
    {
      "id": "ja-directions",
      "language": "ja",
      "title": "道を聞く (Nach dem Weg fragen)",
      "situation": "Du suchst die U-Bahn-Station Shibuya.",
      "icon": "fa-map-location-dot",
      "npcName": "田中 (Herr Tanaka)",
      "npcRole": "通行人 (Passant)",
      "level": "A1",
      "turns": [
        {
          "npc": "こんにちは、何かお困りですか？",
          "npcDe": "Guten Tag, gibt es ein Problem, bei dem ich helfen kann?",
          "npcRoman": "Konnichiwa, nanika okomari desu ka?",
          "hint": "In Japan wird man oft freundlich angesprochen, wenn man suchend wirkt.",
          "prompt": "Entschuldige dich höflich und frage nach dem Bahnhof.",
          "expected": "すみません、駅はどこですか？",
          "expectedDe": "Entschuldigung, wo ist der Bahnhof?",
          "expectedRoman": "Sumimasen, eki wa doko desu ka?",
          "options": [
            {
              "text": "すみません、駅はどこですか？",
              "de": "Entschuldigung, wo ist der Bahnhof?",
              "correct": true
            },
            {
              "text": "寿司が好きです。",
              "de": "Ich mag Sushi.",
              "correct": false
            },
            {
              "text": "ホテルは高いです。",
              "de": "Das Hotel ist teuer.",
              "correct": false
            }
          ]
        },
        {
          "npc": "この道をまっすぐ行って、交差点を左に曲がってください。",
          "npcDe": "Gehen Sie diesen Weg geradeaus und biegen Sie an der Kreuzung nach links ab.",
          "npcRoman": "Kono michi o massugu itte, kōsaten o hidari ni magatte kudasai.",
          "hint": "„Massugu\" = geradeaus; „hidari\" = links; „migi\" = rechts.",
          "prompt": "Frage: „Ist es weit zu Fuß?\"",
          "expected": "歩いて遠いですか？",
          "expectedDe": "Ist es weit zu Fuß?",
          "expectedRoman": "Aruite tōi desu ka?",
          "options": [
            {
              "text": "歩いて遠いですか？",
              "de": "Ist es weit zu Fuß?",
              "correct": true
            },
            {
              "text": "何歳ですか？",
              "de": "Wie alt bist du?",
              "correct": false
            },
            {
              "text": "猫がいます。",
              "de": "Da ist eine Katze.",
              "correct": false
            }
          ]
        },
        {
          "npc": "いいえ、歩いて三分くらいですよ。すぐ見えます。",
          "npcDe": "Nein, es sind etwa drei Minuten zu Fuß. Sie werden es gleich sehen.",
          "npcRoman": "Iie, aruite san-pun kurai desu yo. Sugu miemasu.",
          "hint": "„Kurai\" bedeutet „ungefähr / etwa\".",
          "prompt": "Bedanke dich herzlich.",
          "expected": "どうもありがとうございます！",
          "expectedDe": "Vielen Dank!",
          "expectedRoman": "Dōmo arigatō gozaimasu!",
          "options": [
            {
              "text": "どうもありがとうございます！",
              "de": "Vielen Dank!",
              "correct": true
            },
            {
              "text": "さようなら、先生。",
              "de": "Auf Wiedersehen, Lehrer.",
              "correct": false
            },
            {
              "text": "私は眠いです。",
              "de": "Ich bin schläfrig.",
              "correct": false
            }
          ]
        }
      ],
      "category": "travel"
    },
    {
      "id": "ja-hotel",
      "language": "ja",
      "category": "travel",
      "title": "ホテルのチェックイン (Hotel-Check-in)",
      "situation": "Du kommst in einem Hotel in Tokio an und checkst an der Rezeption ein.",
      "icon": "fa-hotel",
      "npcName": "山本 (Yamamoto)",
      "npcRole": "フロント係 (Rezeptionist)",
      "level": "A2",
      "turns": [
        {
          "npc": "いらっしゃいませ！ご宿泊のご予約はございますでしょうか？",
          "npcDe": "Herzlich willkommen! Haben Sie eine Zimmerreservierung?",
          "npcRoman": "Irasshaimase! Goshukuhaku no goyoyaku wa gozaimasu deshō ka?",
          "hint": "„Goyoyaku\" ist die ehrerbietende Form von „yoyaku\" (Reservierung).",
          "prompt": "Bestätige deine Reservierung auf den Namen Schmidt.",
          "expected": "はい、予約したシュミットと申します。",
          "expectedDe": "Ja, ich habe reserviert, mein Name ist Schmidt.",
          "expectedRoman": "Hai, yoyaku shita Shumitto to mōshimasu.",
          "options": [
            {
              "text": "はい、予約したシュミットと申します。",
              "de": "Ja, ich habe reserviert, mein Name ist Schmidt.",
              "correct": true
            },
            {
              "text": "昨日は寿司を食べました。",
              "de": "Gestern habe ich Sushi gegessen.",
              "correct": false
            },
            {
              "text": "桜の花がとても綺麗です。",
              "de": "Die Kirschblüten sind sehr schön.",
              "correct": false
            }
          ]
        },
        {
          "npc": "確認いたしました。恐れ入りますが、パスポートのご提示をお願いできますか？",
          "npcDe": "Ich habe es bestätigt. Verzeihen Sie, dürfte ich um Ihren Reisepass bitten?",
          "npcRoman": "Kakunin itashimashita. Osoreirimasu ga, pasupōto no goteiji o onegai dekimasu ka?",
          "hint": "„Osoreirimasu ga\" leitet höfliche Bitten im Geschäftsjapanisch ein.",
          "prompt": "Reiche den Pass und frage nach dem Frühstück.",
          "expected": "はい、どうぞ。朝食は何時からですか？",
          "expectedDe": "Ja, bitte sehr. Ab wie viel Uhr gibt es Frühstück?",
          "expectedRoman": "Hai, dōzo. Chōshoku wa nan-ji kara desu ka?",
          "options": [
            {
              "text": "はい、どうぞ。朝食は何時からですか？",
              "de": "Ja, bitte sehr. Ab wie viel Uhr gibt es Frühstück?",
              "correct": true
            },
            {
              "text": "猫を飼っています。",
              "de": "Ich halte eine Katze.",
              "correct": false
            },
            {
              "text": "タクシーを呼んでください。",
              "de": "Bitte rufen Sie ein Taxi.",
              "correct": false
            }
          ]
        },
        {
          "npc": "朝食は一階で朝七時からでございます。こちらが部屋のカードキーです。",
          "npcDe": "Das Frühstück ist im Erdgeschoss ab sieben Uhr. Hier ist Ihre Zimmer-Schlüsselkarte.",
          "npcRoman": "Chōshoku wa ikkai de asa shichi-ji kara de gozaimasu. Kochira ga heya no kādokī desu.",
          "hint": "„De gozaimasu\" ist feinstes Keigo für „desu\".",
          "prompt": "Bedanke dich und frage nach dem WLAN-Passwort.",
          "expected": "ありがとうございます。Wi-Fiのパスワードを教えていただけますか？",
          "expectedDe": "Vielen Dank. Könnten Sie mir das Wi-Fi-Passwort verraten?",
          "expectedRoman": "Arigatō gozaimasu. Wi-Fi no pasuwādo o oshiete itadakemasu ka?",
          "options": [
            {
              "text": "ありがとうございます。Wi-Fiのパスワードを教えていただけますか？",
              "de": "Vielen Dank. Könnten Sie mir das Wi-Fi-Passwort verraten?",
              "correct": true
            },
            {
              "text": "私はスキーが下手です。",
              "de": "Ich kann schlecht Ski fahren.",
              "correct": false
            },
            {
              "text": "明日は雨でしょう。",
              "de": "Morgen wird es wohl regnen.",
              "correct": false
            }
          ]
        }
      ]
    },
    {
      "id": "ja-pharmacy",
      "language": "ja",
      "category": "health",
      "title": "薬局で相談する (In der Apotheke)",
      "situation": "Du hast Kopfschmerzen und Erkältungssymptome und kaufst Medizin in einer Kusuriya.",
      "icon": "fa-kit-medical",
      "npcName": "高橋 (Takahashi)",
      "npcRole": "薬剤師 (Apothekerin)",
      "level": "A2",
      "turns": [
        {
          "npc": "こんにちは、どうされましたか？どのような症状でしょうか？",
          "npcDe": "Guten Tag, was ist passiert? Welche Symptome haben Sie?",
          "npcRoman": "Konnichiwa, dōsaremashita ka? Dono yō na shōjō deshō ka?",
          "hint": "„Shōjō\" = Symptome.",
          "prompt": "Erkläre, dass dein Kopf wehtut und du Halsschmerzen hast.",
          "expected": "頭が痛くて、喉も痛いです。熱も少しあります。",
          "expectedDe": "Mein Kopf tut weh und der Hals auch. Ich habe auch leichtes Fieber.",
          "expectedRoman": "Atama ga itakute, nodo mo itai desu. Netsu mo sukoshi arimasu.",
          "options": [
            {
              "text": "頭が痛くて、喉も痛いです。熱も少しあります。",
              "de": "Mein Kopf tut weh und der Hals auch. Ich habe auch leichtes Fieber.",
              "correct": true
            },
            {
              "text": "海で泳ぐのが好きです。",
              "de": "Ich schwimme gern im Meer.",
              "correct": false
            },
            {
              "text": "本屋はどこにありますか？",
              "de": "Wo befindet sich die Buchhandlung?",
              "correct": false
            }
          ]
        },
        {
          "npc": "こちらの総合感冒薬が効きますよ。眠くなる成分が入っていますが大丈夫ですか？",
          "npcDe": "Dieses Kombinations-Erkältungsmittel wirkt gut. Es macht etwas müde, ist das in Ordnung?",
          "npcRoman": "Kochira no sōgō kanbōyaku ga kikimasu yo. Nemuku naru seibun ga haitte imasu ga daijōbu desu ka?",
          "hint": "Viele japanische Erkältungsmittel weisen ausdrücklich auf Müdigkeit hin.",
          "prompt": "Antworte, dass es kein Problem ist und frage nach der Dosis.",
          "expected": "大丈夫です。一日に何回飲めばいいですか？",
          "expectedDe": "Das ist in Ordnung. Wie oft am Tag soll ich es einnehmen?",
          "expectedRoman": "Daijōbu desu. Ichi-nichi ni nan-kai nomeba ii desu ka?",
          "options": [
            {
              "text": "大丈夫です。一日に何回飲めばいいですか？",
              "de": "Das ist in Ordnung. Wie oft am Tag soll ich es einnehmen?",
              "correct": true
            },
            {
              "text": "切手を三枚ください。",
              "de": "Bitte drei Briefmarken.",
              "correct": false
            },
            {
              "text": "私の靴は黒いです。",
              "de": "Meine Schuhe sind schwarz.",
              "correct": false
            }
          ]
        },
        {
          "npc": "食後に一回三錠、ぬるま湯でお飲みください。暖かくしてお大事にどうぞ！",
          "npcDe": "Nehmen Sie nach dem Essen 3 Tabletten mit lauwarmem Wasser. Halten Sie sich warm und gute Besserung!",
          "npcRoman": "Shokugo ni ikkai san-jō, nurumayu de onomi kudasai. Atatakaku shite odaiji ni dōzo!",
          "hint": "„Odaiji ni\" wünscht man in Japan allen Kranken (Gute Besserung).",
          "prompt": "Bedanke dich höflich.",
          "expected": "分かりました。親切に教えていただき、ありがとうございます！",
          "expectedDe": "Verstanden. Danke, dass Sie es mir so freundlich erklärt haben!",
          "expectedRoman": "Wakarimashita. Shinsetsu ni oshiete itadaki, arigatō gozaimasu!",
          "options": [
            {
              "text": "分かりました。親切に教えていただき、ありがとうございます！",
              "de": "Verstanden. Danke, dass Sie es mir so freundlich erklärt haben!",
              "correct": true
            },
            {
              "text": "明後日また来ます。",
              "de": "Übermorgen komme ich wieder.",
              "correct": false
            },
            {
              "text": "傘を忘れました。",
              "de": "Ich habe den Regenschirm vergessen.",
              "correct": false
            }
          ]
        }
      ]
    },
    {
      "id": "ja-station",
      "language": "ja",
      "category": "travel",
      "title": "新幹線の切符売り場で (Am Shinkansen-Schalter)",
      "situation": "Du kaufst am Schalter des Bahnhofs Tokio eine Shinkansen-Fahrkarte nach Kyoto.",
      "icon": "fa-train",
      "npcName": "鈴木 (Suzuki)",
      "npcRole": "駅員 (Bahnhofsbeamter)",
      "level": "A2",
      "turns": [
        {
          "npc": "いらっしゃいませ。どちらまでの切符をお探しでしょうか？",
          "npcDe": "Herzlich willkommen! Wohin möchten Sie eine Fahrkarte kaufen?",
          "npcRoman": "Irasshaimase. Dochira made no kippu o osagashi deshō ka?",
          "hint": "Am Schalter „Midori no Madoguchi\" kauft man Shinkansen-Tickets.",
          "prompt": "Sage, dass du ein Ticket nach Kyoto möchtest.",
          "expected": "京都までの新幹線の切符を一枚お願いします。",
          "expectedDe": "Bitte eine Shinkansen-Fahrkarte nach Kyoto.",
          "expectedRoman": "Kyōto made no Shinkansen no kippu o ichi-mai onegai shimasu.",
          "options": [
            {
              "text": "京都までの新幹線の切符を一枚お願いします。",
              "de": "Bitte eine Shinkansen-Fahrkarte nach Kyoto.",
              "correct": true
            },
            {
              "text": "映画館に行きたいです。",
              "de": "Ich möchte ins Kino gehen.",
              "correct": false
            },
            {
              "text": "財布を落としました。",
              "de": "Ich habe mein Portemonnaie verloren.",
              "correct": false
            }
          ]
        },
        {
          "npc": "のぞみ号の指定席と自由席のどちらがよろしいですか？",
          "npcDe": "Möchten Sie im Nozomi-Express einen reservierten oder unreservierten Sitzplatz?",
          "npcRoman": "Nozomi-gō no shiteiseki to jiyūseki no dochira ga yoroshii desu ka?",
          "hint": "„Shiteiseki\" = reservierter Sitzplatz; „Jiyūseki\" = freie Platzwahl.",
          "prompt": "Wähle einen reservierten Platz am Fenster.",
          "expected": "指定席で、窓側の席をお願いできますか？",
          "expectedDe": "Reservierter Platz, dürfte ich um einen Fensterplatz bitten?",
          "expectedRoman": "Shiteiseki de, madogawa no seki o onegai dekimasu ka?",
          "options": [
            {
              "text": "指定席で、窓側の席をお願いできますか？",
              "de": "Reservierter Platz, dürfte ich um einen Fensterplatz bitten?",
              "correct": true
            },
            {
              "text": "私は日本語が話せません。",
              "de": "Ich kann kein Japanisch sprechen.",
              "correct": false
            },
            {
              "text": "お腹がいっぱいです。",
              "de": "Ich bin satt.",
              "correct": false
            }
          ]
        },
        {
          "npc": "十四番線から十時十五分発です。どうぞ良い旅を！",
          "npcDe": "Abfahrt ist von Gleis 14 um 10:15 Uhr. Eine gute Reise!",
          "npcRoman": "Jū-yon-bansen kara jū-ji jū-go-fun hatsu desu. Dōzo yoi tabi o!",
          "hint": "„Bansen\" = Gleisnummer am Bahnsteig.",
          "prompt": "Bedanke dich herzlich.",
          "expected": "詳しく教えていただき、ありがとうございました！",
          "expectedDe": "Vielen Dank, dass Sie es mir so ausführlich erklärt haben!",
          "expectedRoman": "Kuwashiku oshiete itadaki, arigatō gozaimashita!",
          "options": [
            {
              "text": "詳しく教えていただき、ありがとうございました！",
              "de": "Vielen Dank, dass Sie es mir so ausführlich erklärt haben!",
              "correct": true
            },
            {
              "text": "早く帰りたいです。",
              "de": "Ich möchte schnell nach Hause gehen.",
              "correct": false
            },
            {
              "text": "ペンを貸してください。",
              "de": "Bitte leihen Sie mir einen Stift.",
              "correct": false
            }
          ]
        }
      ]
    }
  ],
  "ru": [
    {
      "id": "ru-cafe",
      "language": "ru",
      "title": "В кафе (Im Café)",
      "situation": "Du bestellst ein Frühstück in einem Petersburger Café.",
      "icon": "fa-mug-hot",
      "npcName": "Анна (Anna)",
      "npcRole": "Официантка (Kellnerin)",
      "level": "A1",
      "turns": [
        {
          "npc": "Добрый день! Что будете заказывать?",
          "npcDe": "Guten Tag! Was möchten Sie bestellen?",
          "npcRoman": "Dobryj den! Chto budete zakazyvat?",
          "hint": "„Dobryj den\" ist die Standardbegrüßung am Tag.",
          "prompt": "Bestelle einen schwarzen Kaffee und Pfannkuchen (Blini).",
          "expected": "Чёрный кофе и блины, пожалуйста.",
          "expectedDe": "Schwarzen Kaffee und Blini, bitte.",
          "expectedRoman": "Tschornyj kofe i bliny, poschaluysta.",
          "options": [
            {
              "text": "Чёрный кофе и блины, пожалуйста.",
              "de": "Schwarzen Kaffee und Blini, bitte.",
              "correct": true
            },
            {
              "text": "Я еду в Москву на поезде.",
              "de": "Ich fahre mit dem Zug nach Moskau.",
              "correct": false
            },
            {
              "text": "У меня болит голова.",
              "de": "Ich habe Kopfschmerzen.",
              "correct": false
            }
          ]
        },
        {
          "npc": "С удовольствием! Блины со сгущёнкой или с вареньем?",
          "npcDe": "Mit Vergnügen! Die Blini mit gezuckerter Kondensmilch oder Marmelade?",
          "npcRoman": "S udovolstviyem! Bliny so sgushchyonkoy ili s varenyem?",
          "hint": "„Sgushchyonka\" (Kondensmilch) ist der beliebteste Blini-Klassiker in Russland.",
          "prompt": "Sage: „Mit Marmelade, bitte.\"",
          "expected": "С вареньем, пожалуйста.",
          "expectedDe": "Mit Marmelade, bitte.",
          "expectedRoman": "S varenyem, poschaluysta.",
          "options": [
            {
              "text": "С вареньем, пожалуйста.",
              "de": "Mit Marmelade, bitte.",
              "correct": true
            },
            {
              "text": "На улице идёт дождь.",
              "de": "Draußen regnet es.",
              "correct": false
            },
            {
              "text": "Я забыл свой ключ.",
              "de": "Ich habe meinen Schlüssel vergessen.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Вот ваш заказ, приятного аппетита!",
          "npcDe": "Hier ist Ihre Bestellung, guten Appetit!",
          "npcRoman": "Vot vash zakaz, priyatnogo appetita!",
          "hint": "„Priyatnogo appetita\" bedeutet „Guten Appetit\".",
          "prompt": "Bitte um die Rechnung.",
          "expected": "Спасибо! Можно счёт, пожалуйста?",
          "expectedDe": "Danke! Kann ich bitte die Rechnung haben?",
          "expectedRoman": "Spasibo! Mozhno schyot, poschaluysta?",
          "options": [
            {
              "text": "Спасибо! Можно счёт, пожалуйста?",
              "de": "Danke! Kann ich bitte die Rechnung haben?",
              "correct": true
            },
            {
              "text": "Где находится театр?",
              "de": "Wo befindet sich das Theater?",
              "correct": false
            },
            {
              "text": "Я не люблю зиму.",
              "de": "Ich mag den Winter nicht.",
              "correct": false
            }
          ]
        }
      ],
      "category": "food"
    },
    {
      "id": "ru-directions",
      "language": "ru",
      "title": "Как пройти к метро? (Weg zum Metro)",
      "situation": "Du suchst die nächste Metro-Station in Sankt Petersburg.",
      "icon": "fa-map-location-dot",
      "npcName": "Дмитрий (Dmitrij)",
      "npcRole": "Прохожий (Passant)",
      "level": "A1",
      "turns": [
        {
          "npc": "Здравствуйте! Вам помочь?",
          "npcDe": "Guten Tag! Kann ich Ihnen helfen?",
          "npcRoman": "Zdravstvuyte! Vam pomoch?",
          "hint": "„Zdravstvuyte\" ist die formelle und respektvolle Begrüßung.",
          "prompt": "Frage nach der nächsten Metrostation.",
          "expected": "Извините, где здесь станция метро?",
          "expectedDe": "Entschuldigung, wo ist hier die Metrostation?",
          "expectedRoman": "Izvinite, gde zdes stantsiya metro?",
          "options": [
            {
              "text": "Извините, где здесь станция метро?",
              "de": "Entschuldigung, wo ist hier die Metrostation?",
              "correct": true
            },
            {
              "text": "Я говорю только по-немецки.",
              "de": "Ich spreche nur Deutsch.",
              "correct": false
            },
            {
              "text": "Сколько стоит эта книга?",
              "de": "Wie viel kostet dieses Buch?",
              "correct": false
            }
          ]
        },
        {
          "npc": "Идите прямо до перекрёстка и поверните направо.",
          "npcDe": "Gehen Sie geradeaus bis zur Kreuzung und biegen Sie nach rechts ab.",
          "npcRoman": "Idite pryamo do perekryostka i povernite napravo.",
          "hint": "„Pryamo\" = geradeaus; „napravo\" = nach rechts; „nalevo\" = nach links.",
          "prompt": "Frage: „Ist das weit?\"",
          "expected": "Это далеко отсюда?",
          "expectedDe": "Ist das weit von hier?",
          "expectedRoman": "Eto daleko otsyuda?",
          "options": [
            {
              "text": "Это далеко отсюда?",
              "de": "Ist das weit von hier?",
              "correct": true
            },
            {
              "text": "Какая завтра погода?",
              "de": "Wie ist morgen das Wetter?",
              "correct": false
            },
            {
              "text": "У меня нет билета.",
              "de": "Ich habe keine Fahrkarte.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Нет, совсем рядом, буквально три минуты пешком.",
          "npcDe": "Nein, ganz in der Nähe, buchstäblich drei Minuten zu Fuß.",
          "npcRoman": "Net, sovsem ryadom, bukvalno tri minuty peshkom.",
          "hint": "„Peshkom\" bedeutet „zu Fuß\".",
          "prompt": "Bedanke dich und verabschiede dich.",
          "expected": "Большое спасибо! До свидания!",
          "expectedDe": "Vielen Dank! Auf Wiedersehen!",
          "expectedRoman": "Bolshoye spasibo! Do svidaniya!",
          "options": [
            {
              "text": "Большое спасибо! До свидания!",
              "de": "Vielen Dank! Auf Wiedersehen!",
              "correct": true
            },
            {
              "text": "Я не согласен с вами.",
              "de": "Ich stimme Ihnen nicht zu.",
              "correct": false
            },
            {
              "text": "Где продаются сувениры?",
              "de": "Wo werden Souvenirs verkauft?",
              "correct": false
            }
          ]
        }
      ],
      "category": "travel"
    },
    {
      "id": "ru-hotel",
      "language": "ru",
      "category": "travel",
      "title": "Заселение в гостиницу (Hotel-Check-in)",
      "situation": "Du kommst in einem Hotel in Sankt Petersburg an und checkst an der Rezeption ein.",
      "icon": "fa-hotel",
      "npcName": "Елена (Elena)",
      "npcRole": "Администратор (Rezeptionistin)",
      "level": "A2",
      "turns": [
        {
          "npc": "Добрый день! Добро пожаловать в отель «Невский». У вас забронирован номер?",
          "npcDe": "Guten Tag! Willkommen im Hotel „Newskij\". Haben Sie ein Zimmer reserviert?",
          "npcRoman": "Dobryy den! Dobro pozhalovat v otel Nevskiy. U vas zabronirovan nomer?",
          "hint": "„Nomer\" bedeutet im Hotel sowohl „Zimmer\" als auch „Nummer\".",
          "prompt": "Bestätige die Reservierung auf den Namen Schmidt.",
          "expected": "Добрый день! Да, у меня бронь на фамилию Шмидт.",
          "expectedDe": "Guten Tag! Ja, ich habe eine Reservierung auf den Namen Schmidt.",
          "expectedRoman": "Dobryy den! Da, u menya bron na familiyu Shmidt.",
          "options": [
            {
              "text": "Добрый день! Да, у меня бронь на фамилию Шмидт.",
              "de": "Guten Tag! Ja, ich habe eine Reservierung auf den Namen Schmidt.",
              "correct": true
            },
            {
              "text": "Я хочу купить тёплую шапку.",
              "de": "Ich möchte eine warme Mütze kaufen.",
              "correct": false
            },
            {
              "text": "Вчера был очень сильный мороз.",
              "de": "Gestern war sehr starker Frost.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Отлично, стандартный двухместный номер на три ночи. Предъявите, пожалуйста, ваш паспорт.",
          "npcDe": "Ausgezeichnet, Standard-Doppelzimmer für drei Nächte. Zeigen Sie bitte Ihren Pass vor.",
          "npcRoman": "Otlichno, standartnyy dvukhmestnyy nomer na tri nochi. Predyavite, pozhaluysta, vash pasport.",
          "hint": "In russischen Hotels werden Pässe für die Gästeregistrierung eingescannt.",
          "prompt": "Reiche den Pass und frage nach dem Frühstück.",
          "expected": "Вот мой паспорт. Скажите, пожалуйста, во сколько завтрак?",
          "expectedDe": "Hier ist mein Pass. Sagen Sie bitte, um wie viel Uhr gibt es Frühstück?",
          "expectedRoman": "Vot moy pasport. Skazhite, pozhaluysta, vo skolko zavtrak?",
          "options": [
            {
              "text": "Вот мой паспорт. Скажите, пожалуйста, во сколько завтрак?",
              "de": "Hier ist mein Pass. Sagen Sie bitte, um wie viel Uhr gibt es Frühstück?",
              "correct": true
            },
            {
              "text": "Я забыл номер своего телефона.",
              "de": "Ich habe meine Telefonnummer vergessen.",
              "correct": false
            },
            {
              "text": "Мне не нравится эта музыка.",
              "de": "Mir gefällt diese Musik nicht.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Завтрак с восьми до одиннадцати в ресторане. Вот ваша электронная карта от номера 315.",
          "npcDe": "Frühstück ist von acht bis elf im Restaurant. Hier ist Ihre Schlüsselkarte für Zimmer 315.",
          "npcRoman": "Zavtrak s vosmi do odinnadtsati v restorane. Vot vasha elektronnaya karta ot nomera 315.",
          "hint": "„Karta\" = Schlüsselkarte.",
          "prompt": "Bedanke dich und frage nach dem WLAN-Passwort.",
          "expected": "Большое спасибо! Какой пароль от беспроводного интернета?",
          "expectedDe": "Vielen Dank! Was ist das Passwort für das WLAN?",
          "expectedRoman": "Bolshoye spasibo! Kakoy parol ot besprovodnogo interneta?",
          "options": [
            {
              "text": "Большое спасибо! Какой пароль от беспроводного интернета?",
              "de": "Vielen Dank! Was ist das Passwort für das WLAN?",
              "correct": true
            },
            {
              "text": "Завтра я пойду в Эрмитаж.",
              "de": "Morgen gehe ich in die Eremitage.",
              "correct": false
            },
            {
              "text": "У меня сломался чемодан.",
              "de": "Mein Koffer ist kaputt gegangen.",
              "correct": false
            }
          ]
        }
      ]
    },
    {
      "id": "ru-pharmacy",
      "language": "ru",
      "category": "health",
      "title": "В аптеке (In der Apotheke)",
      "situation": "Du hast Erkältungsbeschwerden und suchst Medikamente in einer Apotheke.",
      "icon": "fa-kit-medical",
      "npcName": "Ольга (Olga)",
      "npcRole": "Фармацевт (Apothekerin)",
      "level": "A2",
      "turns": [
        {
          "npc": "Здравствуйте! На что вы жалуетесь? Чем могу помочь?",
          "npcDe": "Guten Tag! Worüber klagen Sie? Womit kann ich helfen?",
          "npcRoman": "Zdravstvuyte! Na chto vy zhaluyetes? Chem mogu pomoch?",
          "hint": "„Apteka\" erkennt man in Russland am grünen Kreuz.",
          "prompt": "Erkläre, dass du Halsschmerzen hast und dir kalt ist.",
          "expected": "Здравствуйте! У меня сильно болит горло и температура.",
          "expectedDe": "Guten Tag! Mein Hals tut stark weh und ich habe Temperatur.",
          "expectedRoman": "Zdravstvuyte! U menya silno bolit gorlo i temperatura.",
          "options": [
            {
              "text": "Здравствуйте! У меня сильно болит горло и температура.",
              "de": "Guten Tag! Mein Hals tut stark weh und ich habe Temperatur.",
              "correct": true
            },
            {
              "text": "Где находится ближайшая станция метро?",
              "de": "Wo befindet sich die nächste Metro-Station?",
              "correct": false
            },
            {
              "text": "Я потерял свои ключи от дома.",
              "de": "Ich habe meine Hausschlüssel verloren.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Вот эффективный спрей для горла и растворимый парацетамол. У вас есть аллергия?",
          "npcDe": "Hier ist ein wirksames Halsspray und lösliches Paracetamol. Haben Sie Allergien?",
          "npcRoman": "Vot effektivnyy sprey dlya gorla i rastvorimyy paratsetamol. U vas yest allergiya?",
          "hint": "„Allergiya\" = Allergie.",
          "prompt": "Antworte, dass du keine Allergie hast und frage nach der Dosis.",
          "expected": "Нет, аллергии нет. Как правильно принимать эти лекарства?",
          "expectedDe": "Nein, keine Allergie. Wie nimmt man diese Medikamente richtig ein?",
          "expectedRoman": "Net, allergii net. Kak pravilno prinimat eti lekarstva?",
          "options": [
            {
              "text": "Нет, аллергии нет. Как правильно принимать эти лекарства?",
              "de": "Nein, keine Allergie. Wie nimmt man diese Medikamente richtig ein?",
              "correct": true
            },
            {
              "text": "Я очень люблю кататься на коньках.",
              "de": "Ich fahre sehr gern Schlittschuh.",
              "correct": false
            },
            {
              "text": "Сколько стоит этот сувенир?",
              "de": "Wie viel kostet dieses Souvenir?",
              "correct": false
            }
          ]
        },
        {
          "npc": "Спрей трижды в день, а порошок разводить в тёплой воде. Выздоравливайте скорей!",
          "npcDe": "Das Spray dreimal täglich, und das Pulver in warmem Wasser auflösen. Werden Sie schnell gesund!",
          "npcRoman": "Sprey trizhdy v den, a poroshok razvodit v tyoploy vode. Vyzdoravlivayte skorey!",
          "hint": "„Vyzdoravlivayte\" = Gute Besserung!",
          "prompt": "Bedanke dich und bezahle mit Karte.",
          "expected": "Спасибо за помощь! Можно оплатить банковской картой?",
          "expectedDe": "Danke für die Hilfe! Kann ich mit Bankkarte bezahlen?",
          "expectedRoman": "Spasibo za pomoshch! Mozhno oplatit bankovskoy kartoy?",
          "options": [
            {
              "text": "Спасибо за помощь! Можно оплатить банковской картой?",
              "de": "Danke für die Hilfe! Kann ich mit Bankkarte bezahlen?",
              "correct": true
            },
            {
              "text": "Сегодня очень ветрено.",
              "de": "Heute ist es sehr windig.",
              "correct": false
            },
            {
              "text": "Я ищу русскую баню.",
              "de": "Ich suche eine russische Banja.",
              "correct": false
            }
          ]
        }
      ]
    },
    {
      "id": "ru-station",
      "language": "ru",
      "category": "travel",
      "title": "На Московском вокзале (Am Bahnhof)",
      "situation": "Du kaufst am Schalter ein Ticket für den Schnellzug Sapsan nach Moskau.",
      "icon": "fa-train",
      "npcName": "Виктор (Viktor)",
      "npcRole": "Кассир (Kassierer)",
      "level": "A2",
      "turns": [
        {
          "npc": "Добрый день! До какой станции вам оформить билет?",
          "npcDe": "Guten Tag! Bis zu welcher Station soll ich Ihnen eine Fahrkarte ausstellen?",
          "npcRoman": "Dobryy den! Do kakoy stantsii vam oformit bilet?",
          "hint": "Der Schnellzug „Sapsan\" verbindet St. Petersburg und Moskau in unter 4 Stunden.",
          "prompt": "Sage, dass du ein Ticket für den Sapsan nach Moskau möchtest.",
          "expected": "Добрый день, мне нужен один билет на «Сапсан» до Москвы.",
          "expectedDe": "Guten Tag, ich brauche eine Fahrkarte für den Sapsan nach Moskau.",
          "expectedRoman": "Dobryy den, mne nuzhen odin bilet na Sapsan do Moskvy.",
          "options": [
            {
              "text": "Добрый день, мне нужен один билет на «Сапсан» до Москвы.",
              "de": "Guten Tag, ich brauche eine Fahrkarte für den Sapsan nach Moskau.",
              "correct": true
            },
            {
              "text": "Я хочу заказать пиццу.",
              "de": "Ich möchte eine Pizza bestellen.",
              "correct": false
            },
            {
              "text": "У меня разрядился телефон.",
              "de": "Mein Telefon-Akku ist leer.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Есть поезд на четырнадцать часов. Эконом-класс или бизнес-класс?",
          "npcDe": "Es gibt einen Zug um 14 Uhr. Economy- oder Business-Klasse?",
          "npcRoman": "Yest poyezd na chetyrnadtsat chasov. Ekonom-klass ili biznes-klass?",
          "hint": "„Ekonom-klass\" = 2. Klasse; „Mesto u okna\" = Platz am Fenster.",
          "prompt": "Wähle Economy-Klasse am Fenster.",
          "expected": "Эконом-класс, место у окна, пожалуйста.",
          "expectedDe": "Economy-Klasse, Platz am Fenster, bitte.",
          "expectedRoman": "Ekonom-klass, mesto u okna, pozhaluysta.",
          "options": [
            {
              "text": "Эконом-класс, место у окна, пожалуйста.",
              "de": "Economy-Klasse, Platz am Fenster, bitte.",
              "correct": true
            },
            {
              "text": "Я не люблю пить чай.",
              "de": "Ich trinke nicht gern Tee.",
              "correct": false
            },
            {
              "text": "Какой сегодня день недели?",
              "de": "Welcher Wochentag ist heute?",
              "correct": false
            }
          ]
        },
        {
          "npc": "Билет готов. Поезд отправляется с третьей платформы. Счастливого пути!",
          "npcDe": "Die Fahrkarte ist fertig. Der Zug fährt von Bahnsteig drei ab. Gute Reise!",
          "npcRoman": "Bilet gotov. Poyezd otpravlyayetsya s tretyey platformy. Schastlivogo puti!",
          "hint": "„Schastlivogo puti\" = Gute Reise / Gute Fahrt.",
          "prompt": "Bedanke dich und wünsche einen schönen Tag.",
          "expected": "Большое спасибо за помощь! Всего доброго!",
          "expectedDe": "Vielen Dank für die Hilfe! Alles Gute!",
          "expectedRoman": "Bolshoye spasibo za pomoshch! Vsego dobrogo!",
          "options": [
            {
              "text": "Большое спасибо за помощь! Всего доброго!",
              "de": "Vielen Dank für die Hilfe! Alles Gute!",
              "correct": true
            },
            {
              "text": "Я забыл свой паспорт дома.",
              "de": "Ich habe meinen Pass zu Hause vergessen.",
              "correct": false
            },
            {
              "text": "На улице пошёл дождь.",
              "de": "Draußen hat es angefangen zu regnen.",
              "correct": false
            }
          ]
        }
      ]
    }
  ],
  "pt": [
    {
      "id": "pt-cafe",
      "language": "pt",
      "title": "No café em Lisboa",
      "situation": "Du bestellst einen Espresso und Pastel de Nata in Lissabon.",
      "icon": "fa-mug-hot",
      "npcName": "Rui",
      "npcRole": "Empregado de mesa",
      "level": "A1",
      "turns": [
        {
          "npc": "Bom dia! O que vai desejar hoje?",
          "npcDe": "Guten Morgen! Was wünschen Sie heute?",
          "hint": "In Lissabon bestellt man statt Espresso traditionell „uma bica\".",
          "prompt": "Bestelle einen Espresso und ein Pastel de Nata.",
          "expected": "Bom dia! Um café e um pastel de nata, por favor.",
          "expectedDe": "Guten Morgen! Einen Kaffee und ein Pastel de Nata, bitte.",
          "options": [
            {
              "text": "Bom dia! Um café e um pastel de nata, por favor.",
              "de": "Guten Tag! Einen Kaffee und ein Pastel de Nata, bitte.",
              "correct": true
            },
            {
              "text": "O oceano é muito frio hoje.",
              "de": "Der Ozean ist heute sehr kalt.",
              "correct": false
            },
            {
              "text": "Preciso de um bilhete de autocarro.",
              "de": "Ich brauche ein Busticket.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Com certeza! Quer com canela por cima?",
          "npcDe": "Sicherlich! Möchten Sie Zimt obendrauf?",
          "hint": "Zimt („canela\") gehört in Portugal standardmäßig zum warmen Pastel.",
          "prompt": "Antworte begeistert mit Ja.",
          "expected": "Sim, com bastante canela, obrigado!",
          "expectedDe": "Ja, mit reichlich Zimt, danke!",
          "options": [
            {
              "text": "Sim, com bastante canela, obrigado!",
              "de": "Ja, mit reichlich Zimt, danke!",
              "correct": true
            },
            {
              "text": "Não gosto de viajar.",
              "de": "Ich mag Reisen nicht.",
              "correct": false
            },
            {
              "text": "Perdi a minha mala.",
              "de": "Ich habe meinen Koffer verloren.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Aqui está, acabadinho de sair do forno. São dois euros.",
          "npcDe": "Hier bitte, frisch aus dem Ofen. Das macht zwei Euro.",
          "hint": "„Acabadinho de sair do forno\" = ofenfrisch.",
          "prompt": "Bitte um die Rechnung oder zahle bar.",
          "expected": "Pode trazer a conta, por favor?",
          "expectedDe": "Können Sie die Rechnung bringen, bitte?",
          "options": [
            {
              "text": "Pode trazer a conta, por favor?",
              "de": "Können Sie die Rechnung bringen, bitte?",
              "correct": true
            },
            {
              "text": "Onde mora o presidente?",
              "de": "Wo wohnt der Präsident?",
              "correct": false
            },
            {
              "text": "Está a chover lá fora.",
              "de": "Draußen regnet es.",
              "correct": false
            }
          ]
        }
      ],
      "category": "food"
    },
    {
      "id": "pt-directions",
      "language": "pt",
      "title": "Pedir informações na rua",
      "situation": "Du suchst den Bahnhof Santa Apolónia.",
      "icon": "fa-map-location-dot",
      "npcName": "Inês",
      "npcRole": "Passante",
      "level": "A1",
      "turns": [
        {
          "npc": "Olá! Posso ajudar com alguma coisa?",
          "npcDe": "Hallo! Kann ich bei etwas helfen?",
          "hint": "Portugiesen sind bekannt für ihre Hilfsbereitschaft gegenüber Besuchern.",
          "prompt": "Frage nach dem Bahnhof.",
          "expected": "Desculpe, onde fica a estação de comboios?",
          "expectedDe": "Entschuldigung, wo befindet sich der Bahnhof?",
          "options": [
            {
              "text": "Desculpe, onde fica a estação de comboios?",
              "de": "Entschuldigung, wo ist der Bahnhof?",
              "correct": true
            },
            {
              "text": "Gosto de tocar violão.",
              "de": "Ich spiele gern Gitarre.",
              "correct": false
            },
            {
              "text": "Comprei uma camisola nova.",
              "de": "Ich habe einen neuen Pullover gekauft.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Fica logo ali! Siga em frente e desça a rua à direita.",
          "npcDe": "Er ist gleich dort drüben! Gehen Sie geradeaus und die Straße rechts hinunter.",
          "hint": "„Em frente\" = geradeaus; „à direita\" = nach rechts; „à esquerda\" = nach links.",
          "prompt": "Frage, ob man zu Fuß gehen kann.",
          "expected": "Dá para ir a pé?",
          "expectedDe": "Kann man zu Fuß gehen?",
          "options": [
            {
              "text": "Dá para ir a pé?",
              "de": "Kann man zu Fuß gehen?",
              "correct": true
            },
            {
              "text": "Quantos anos tem a cidade?",
              "de": "Wie alt ist die Stadt?",
              "correct": false
            },
            {
              "text": "O almoço foi delicioso.",
              "de": "Das Mittagessen war köstlich.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Sim, são só cinco minutos a descer. Boa viagem!",
          "npcDe": "Ja, es sind nur fünf Minuten bergab. Gute Reise!",
          "hint": "Lissabon ist die Stadt der sieben Hügel, daher oft „a descer\" (bergab).",
          "prompt": "Bedanke dich und verabschiede dich.",
          "expected": "Muito obrigado pela ajuda! Adeus!",
          "expectedDe": "Vielen Dank für die Hilfe! Tschüss!",
          "options": [
            {
              "text": "Muito obrigado pela ajuda! Adeus!",
              "de": "Vielen Dank für die Hilfe! Tschüss!",
              "correct": true
            },
            {
              "text": "Não compreendo nada.",
              "de": "Ich verstehe gar nichts.",
              "correct": false
            },
            {
              "text": "O comboio partiu ontem.",
              "de": "Der Zug ist gestern abgefahren.",
              "correct": false
            }
          ]
        }
      ],
      "category": "travel"
    },
    {
      "id": "pt-hotel",
      "language": "pt",
      "category": "travel",
      "title": "No Hotel em Lisboa (Check-in)",
      "situation": "Du kommst in einem Hotel in Lissabon an und checkst an der Rezeption ein.",
      "icon": "fa-hotel",
      "npcName": "Manuel",
      "npcRole": "Rececionista",
      "level": "A2",
      "turns": [
        {
          "npc": "Boa tarde! Bem-vindo ao Hotel Tejo. Tem reserva connosco?",
          "npcDe": "Guten Tag! Willkommen im Hotel Tejo. Haben Sie eine Reservierung bei uns?",
          "hint": "„Boa tarde\" sagt man ab 12 Uhr bis zum Sonnenuntergang.",
          "prompt": "Bestätige die Reservierung auf den Namen Schmidt.",
          "expected": "Boa tarde, sim, tenho uma reserva em nome de Schmidt.",
          "expectedDe": "Guten Tag, ja, ich habe eine Reservierung auf den Namen Schmidt.",
          "options": [
            {
              "text": "Boa tarde, sim, tenho uma reserva em nome de Schmidt.",
              "de": "Guten Tag, ja, ich habe eine Reservierung auf den Namen Schmidt.",
              "correct": true
            },
            {
              "text": "O fado é uma música muito triste.",
              "de": "Fado ist eine sehr traurige Musik.",
              "correct": false
            },
            {
              "text": "A ponte 25 de Abril é muito comprida.",
              "de": "Die Brücke des 25. April ist sehr lang.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Com certeza! Quarto duplo com vista para o rio. Pode mostrar-me o seu passaporte?",
          "npcDe": "Sicherlich! Doppelzimmer mit Flussblick. Können Sie mir Ihren Pass zeigen?",
          "hint": "„Vista para o rio\" = Blick auf den Tejo.",
          "prompt": "Reiche den Pass und frage nach den Frühstückszeiten.",
          "expected": "Aqui está o passaporte. A que horas é servido o pequeno-almoço?",
          "expectedDe": "Hier ist der Pass. Zu welcher Zeit wird das Frühstück serviert?",
          "options": [
            {
              "text": "Aqui está o passaporte. A que horas é servido o pequeno-almoço?",
              "de": "Hier ist der Pass. Zu welcher Zeit wird das Frühstück serviert?",
              "correct": true
            },
            {
              "text": "Gosto de comer sardinhas assadas.",
              "de": "Ich esse gern gegrillte Sardinen.",
              "correct": false
            },
            {
              "text": "O elétrico 28 está muito cheio.",
              "de": "Die Straßenbahn 28 ist sehr voll.",
              "correct": false
            }
          ]
        },
        {
          "npc": "O pequeno-almoço é das sete e meia às dez e meia. O seu quarto é o 402. Tenha uma boa estadia!",
          "npcDe": "Das Frühstück ist von 7:30 bis 10:30 Uhr. Ihr Zimmer ist die 402. Einen schönen Aufenthalt!",
          "hint": "„Pequeno-almoço\" = Frühstück in Portugal (in Brasilien: café da manhã).",
          "prompt": "Bedanke dich und frage nach dem WLAN-Passwort.",
          "expected": "Muito obrigado! Qual é a palavra-passe da rede Wi-Fi?",
          "expectedDe": "Vielen Dank! Was ist das Passwort für das WLAN?",
          "options": [
            {
              "text": "Muito obrigado! Qual é a palavra-passe da rede Wi-Fi?",
              "de": "Vielen Dank! Was ist das Passwort für das WLAN?",
              "correct": true
            },
            {
              "text": "A praia fica longe daqui.",
              "de": "Der Strand liegt weit von hier.",
              "correct": false
            },
            {
              "text": "Não tenho moedas no bolso.",
              "de": "Ich habe keine Münzen in der Tasche.",
              "correct": false
            }
          ]
        }
      ]
    },
    {
      "id": "pt-pharmacy",
      "language": "pt",
      "category": "health",
      "title": "Na Farmácia em Lisboa",
      "situation": "Du hast Halsschmerzen und Fieber und bittest die Apothekerin um Rat.",
      "icon": "fa-kit-medical",
      "npcName": "Teresa",
      "npcRole": "Farmacêutica",
      "level": "A2",
      "turns": [
        {
          "npc": "Olá, boa tarde! Em que posso ajudar?",
          "npcDe": "Hallo, guten Tag! Wobei kann ich helfen?",
          "hint": "Apotheken sind in Portugal durch ein grünes Kreuz mit einer Schlange gekennzeichnet.",
          "prompt": "Erkläre deine Hals- und Kopfschmerzen.",
          "expected": "Boa tarde, tenho muitas dores de garganta e febre alta.",
          "expectedDe": "Guten Tag, ich habe starke Halsschmerzen und hohes Fieber.",
          "options": [
            {
              "text": "Boa tarde, tenho muitas dores de garganta e febre alta.",
              "de": "Guten Tag, ich habe starke Halsschmerzen und hohes Fieber.",
              "correct": true
            },
            {
              "text": "Onde se apanha o barco para Cacilhas?",
              "de": "Wo nimmt man die Fähre nach Cacilhas?",
              "correct": false
            },
            {
              "text": "Este museu tem pinturas antigas.",
              "de": "Dieses Museum hat alte Gemälde.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Recomendo este anti-inflamatório e pastilhas para chupar. Tem alguma alergia a medicamentos?",
          "npcDe": "Ich empfehle diesen Entzündungshemmer und Lutschpastillen. Haben Sie Arzneimittelallergien?",
          "hint": "„Pastilhas para chupar\" = Lutschpastillen.",
          "prompt": "Antworte, dass du keine Allergien hast und nach der Dosierung fragst.",
          "expected": "Não tenho nenhuma alergia. Como devo tomar os comprimidos?",
          "expectedDe": "Ich habe keine Allergie. Wie soll ich die Tabletten einnehmen?",
          "options": [
            {
              "text": "Não tenho nenhuma alergia. Como devo tomar os comprimidos?",
              "de": "Ich habe keine Allergie. Wie soll ich die Tabletten einnehmen?",
              "correct": true
            },
            {
              "text": "Quero alugar uma prancha de surf.",
              "de": "Ich möchte ein Surfbrett mieten.",
              "correct": false
            },
            {
              "text": "O almoço foi bastante caro.",
              "de": "Das Mittagessen war ziemlich teuer.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Tome um comprimido de oito em oito horas com água após as refeições. As melhoras!",
          "npcDe": "Nehmen Sie alle acht Stunden eine Tablette mit Wasser nach den Mahlzeiten. Gute Besserung!",
          "hint": "„As melhoras\" ist der portugiesische Genesungswunsch (Gute Besserung).",
          "prompt": "Bedanke dich und frage nach dem Gesamtpreis.",
          "expected": "Muito obrigado pela explicação! Quanto é tudo?",
          "expectedDe": "Vielen Dank für die Erklärung! Wie viel macht alles zusammen?",
          "options": [
            {
              "text": "Muito obrigado pela explicação! Quanto é tudo?",
              "de": "Vielen Dank für die Erklärung! Wie viel macht alles zusammen?",
              "correct": true
            },
            {
              "text": "Amanhã vou visitar o castelo.",
              "de": "Morgen besuche ich die Burg.",
              "correct": false
            },
            {
              "text": "Está um dia muito ensolarado.",
              "de": "Es ist ein sehr sonniger Tag.",
              "correct": false
            }
          ]
        }
      ]
    },
    {
      "id": "pt-station",
      "language": "pt",
      "category": "travel",
      "title": "Na Estação de Santa Apolónia",
      "situation": "Du kaufst eine Fahrkarte für den Schnellzug Alfa Pendular nach Porto.",
      "icon": "fa-train",
      "npcName": "Pedro",
      "npcRole": "Bilheteiro",
      "level": "A2",
      "turns": [
        {
          "npc": "Bom dia! Para onde gostaria de viajar hoje?",
          "npcDe": "Guten Morgen! Wohin möchten Sie heute reisen?",
          "hint": "Der „Alfa Pendular\" ist Portugals schnellster Neigezug.",
          "prompt": "Sage, dass du eine Fahrkarte nach Porto möchtest.",
          "expected": "Bom dia, queria comprar um bilhete para o Porto no Alfa Pendular.",
          "expectedDe": "Guten Tag, ich möchte eine Fahrkarte nach Porto für den Alfa Pendular kaufen.",
          "options": [
            {
              "text": "Bom dia, queria comprar um bilhete para o Porto no Alfa Pendular.",
              "de": "Guten Tag, ich möchte eine Fahrkarte nach Porto für den Alfa Pendular kaufen.",
              "correct": true
            },
            {
              "text": "Preciso de trocar esta nota.",
              "de": "Ich muss diesen Geldschein wechseln.",
              "correct": false
            },
            {
              "text": "O café está muito quente.",
              "de": "Der Kaffee ist sehr heiß.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Temos partida às dez horas e trinta. Prefere em classe turística ou conforto?",
          "npcDe": "Wir haben Abfahrt um 10:30 Uhr. Bevorzugen Sie Touristenklasse oder Conforto (1. Klasse)?",
          "hint": "„Classe conforto\" entspricht der ersten Klasse.",
          "prompt": "Wähle Touristenklasse mit Fensterplatz.",
          "expected": "Em classe turística com lugar à janela, por favor.",
          "expectedDe": "In der Touristenklasse mit Fensterplatz, bitte.",
          "options": [
            {
              "text": "Em classe turística com lugar à janela, por favor.",
              "de": "In der Touristenklasse mit Fensterplatz, bitte.",
              "correct": true
            },
            {
              "text": "Não gosto de viajar de avião.",
              "de": "Ich fliege nicht gern.",
              "correct": false
            },
            {
              "text": "O meu relógio parou.",
              "de": "Meine Uhr ist stehen geblieben.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Aqui tem o bilhete. O comboio parte da linha número dois. Boa viagem até ao Porto!",
          "npcDe": "Hier ist Ihre Fahrkarte. Der Zug fährt von Gleis zwei ab. Gute Reise nach Porto!",
          "hint": "„Comboio\" = Zug in Portugal (in Brasilien: trem).",
          "prompt": "Bedanke dich und wünsche einen schönen Tag.",
          "expected": "Muito obrigado pela sua ajuda! Tenha um bom dia!",
          "expectedDe": "Vielen Dank für Ihre Hilfe! Haben Sie einen schönen Tag!",
          "options": [
            {
              "text": "Muito obrigado pela sua ajuda! Tenha um bom dia!",
              "de": "Vielen Dank für Ihre Hilfe! Haben Sie einen schönen Tag!",
              "correct": true
            },
            {
              "text": "Perdi o meu bilhete de metro.",
              "de": "Ich habe mein Metroticket verloren.",
              "correct": false
            },
            {
              "text": "Vou comprar um jornal diário.",
              "de": "Ich kaufe eine Tageszeitung.",
              "correct": false
            }
          ]
        }
      ]
    }
  ],
  "el": [
    {
      "id": "el-cafe",
      "language": "el",
      "title": "Στην καφετέρια (Im Café in Athen)",
      "situation": "Du bestellst einen griechischen Kaffee und Spanakopita in der Plaka.",
      "icon": "fa-mug-hot",
      "npcName": "Νίκος (Nikos)",
      "npcRole": "Σερβιτόρος (Kellner)",
      "level": "A1",
      "turns": [
        {
          "npc": "Γεια σας! Καλώς ήρθατε. Τι θα πάρετε;",
          "npcDe": "Hallo! Herzlich willkommen. Was darf es sein?",
          "npcRoman": "Geia sas! Kalos irthate. Ti tha parete?",
          "hint": "„Geia sas\" ist die höfliche Begrüßung für Fremde und Mehrzahl.",
          "prompt": "Bestelle einen griechischen Kaffee und ein Gebäck.",
          "expected": "Έναν ελληνικό καφέ και μια σπανακόπιτα, παρακαλώ.",
          "expectedDe": "Einen griechischen Kaffee und eine Spanakopita, bitte.",
          "expectedRoman": "Enan elliniko kafe kai mia spanakopita, parakalo.",
          "options": [
            {
              "text": "Έναν ελληνικό καφέ και μια σπανακόπιτα, παρακαλώ.",
              "de": "Einen griechischen Kaffee und eine Spanakopita, bitte.",
              "correct": true
            },
            {
              "text": "Η Ακρόπολη είναι πολύ παλιά.",
              "de": "Die Akropolis ist sehr alt.",
              "correct": false
            },
            {
              "text": "Δεν έχω διαβατήριο.",
              "de": "Ich habe keinen Reisepass.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Πολύ ωραία! Τον καφέ πώς τον πίνετε: σκέτο, μέτριο ή γλυκό;",
          "npcDe": "Sehr schön! Wie trinken Sie den Kaffee: schwarz (ohne Zucker), mittelsüß oder süß?",
          "npcRoman": "Poly oraia! Ton kafe pos ton pinete: sketo, metrio i glyko?",
          "hint": "Griechischer Kaffee wird direkt mit Zucker gekocht: „metrio\" ist die beliebteste Balance.",
          "prompt": "Sage: „Mittelsüß, bitte.\"",
          "expected": "Μέτριο, παρακαλώ.",
          "expectedDe": "Mittelsüß, bitte.",
          "expectedRoman": "Metrio, parakalo.",
          "options": [
            {
              "text": "Μέτριο, παρακαλώ.",
              "de": "Mittelsüß, bitte.",
              "correct": true
            },
            {
              "text": "Κάνει πολύ κρύο σήμερα.",
              "de": "Es ist heute sehr kalt.",
              "correct": false
            },
            {
              "text": "Πού είναι το ξενοδοχείο;",
              "de": "Wo ist das Hotel?",
              "correct": false
            }
          ]
        },
        {
          "npc": "Ορίστε, ζεστός καφές και φρέσκια πίτα. Καλή όρεξη!",
          "npcDe": "Bitte sehr, heißer Kaffee und frische Pita. Guten Appetit!",
          "npcRoman": "Oriste, zestos kafes kai freskia pita. Kali orexi!",
          "hint": "„Oriste\" sagt man beim Servieren oder Herüberreichen.",
          "prompt": "Bitte um die Rechnung.",
          "expected": "Ευχαριστώ πολύ! Τον λογαριασμό, παρακαλώ.",
          "expectedDe": "Vielen Dank! Die Rechnung, bitte.",
          "expectedRoman": "Efcharisto poly! Ton logariasmo, parakalo.",
          "options": [
            {
              "text": "Ευχαριστώ πολύ! Τον λογαριασμό, παρακαλώ.",
              "de": "Vielen Dank! Die Rechnung, bitte.",
              "correct": true
            },
            {
              "text": "Θέλω να αγοράσω ένα αυτοκίνητο.",
              "de": "Ich will ein Auto kaufen.",
              "correct": false
            },
            {
              "text": "Το πλοίο φεύγει αύριο.",
              "de": "Das Schiff fährt morgen ab.",
              "correct": false
            }
          ]
        }
      ],
      "category": "food"
    },
    {
      "id": "el-directions",
      "language": "el",
      "title": "Ρωτώντας τον δρόμο (Wegbeschreibung)",
      "situation": "Du suchst die Metro-Station Monastiraki.",
      "icon": "fa-map-location-dot",
      "npcName": "Ελένη (Eleni)",
      "npcRole": "Περαστική (Passantin)",
      "level": "A1",
      "turns": [
        {
          "npc": "Καλημέρα! Ψάχνετε κάτι εδώ στη γειτονιά;",
          "npcDe": "Guten Morgen! Suchen Sie etwas hier in der Nachbarschaft?",
          "npcRoman": "Kalimera! Psachnete kati edo sti geitonia?",
          "hint": "„Kalimera\" sagt man bis zur Mittagszeit.",
          "prompt": "Frage nach der Metrostation.",
          "expected": "Συγγνώμη, πού είναι ο σταθμός του μετρό;",
          "expectedDe": "Entschuldigung, wo ist die Metro-Station?",
          "expectedRoman": "Sygnomi, pou einai o stathmos tou metro?",
          "options": [
            {
              "text": "Συγγνώμη, πού είναι ο σταθμός του μετρό;",
              "de": "Entschuldigung, wo ist die Metro-Station?",
              "correct": true
            },
            {
              "text": "Μου αρέσει η θάλασσα.",
              "de": "Ich mag das Meer.",
              "correct": false
            },
            {
              "text": "Έχασα το ρολόι μου.",
              "de": "Ich habe meine Uhr verloren.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Πηγαίνετε ευθεία και στρίψτε δεξιά στην πλατεία.",
          "npcDe": "Gehen Sie geradeaus und biegen Sie am Platz nach rechts ab.",
          "npcRoman": "Pigaínete ef̱theía kai stríps̱te dex̱iá stin plateía.",
          "hint": "„Eftheia\" = geradeaus; „dexia\" = rechts; „aristera\" = links.",
          "prompt": "Frage: „Ist es weit?\"",
          "expected": "Είναι μακριά από εδώ;",
          "expectedDe": "Ist es weit von hier?",
          "expectedRoman": "Einai makria apo edo?",
          "options": [
            {
              "text": "Είναι μακριά από εδώ;",
              "de": "Ist es weit von hier?",
              "correct": true
            },
            {
              "text": "Ποιο είναι το όνομά σας;",
              "de": "Wie ist Ihr Name?",
              "correct": false
            },
            {
              "text": "Πεινάω πάρα πολύ.",
              "de": "Ich habe großen Hunger.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Όχι, είναι μόλις δύο λεπτά με τα πόδια. Καλή συνέχεια!",
          "npcDe": "Nein, es sind nur zwei Minuten zu Fuß. Einen schönen Tag noch!",
          "npcRoman": "Ochi, einai molis dyo lepta me ta podia. Kali synecheia!",
          "hint": "„Kali synecheia\" wünscht man für den restlichen Tag.",
          "prompt": "Bedanke dich und verabschiede dich.",
          "expected": "Ευχαριστώ πάρα πολύ! Γεια σας!",
          "expectedDe": "Vielen herzlichen Dank! Auf Wiedersehen!",
          "expectedRoman": "Efcharisto para poly! Geia sas!",
          "options": [
            {
              "text": "Ευχαριστώ πάρα πολύ! Γεια σας!",
              "de": "Vielen herzlichen Dank! Auf Wiedersehen!",
              "correct": true
            },
            {
              "text": "Δεν πειράζει, αντίο.",
              "de": "Macht nichts, tschüss.",
              "correct": false
            },
            {
              "text": "Το εισιτήριο είναι άκυρο.",
              "de": "Die Fahrkarte ist ungültig.",
              "correct": false
            }
          ]
        }
      ],
      "category": "travel"
    },
    {
      "id": "el-hotel",
      "language": "el",
      "category": "travel",
      "title": "Στο ξενοδοχείο (Hotel-Check-in)",
      "situation": "Du kommst in einem Hotel in Athen an und checkst an der Rezeption ein.",
      "icon": "fa-hotel",
      "npcName": "Γιώργος (Giorgos)",
      "npcRole": "Υπάλληλος υποδοχής (Rezeptionist)",
      "level": "A2",
      "turns": [
        {
          "npc": "Καλησπέρα σας! Καλώς ήρθατε στο ξενοδοχείο μας. Έχετε κράτηση;",
          "npcDe": "Guten Abend! Willkommen in unserem Hotel. Haben Sie eine Reservierung?",
          "npcRoman": "Kalispera sas! Kalos irthate sto xenodocheio mas. Echete kratisi?",
          "hint": "„Kalispera\" sagt man ab dem Nachmittag.",
          "prompt": "Bestätige die Reservierung auf den Namen Schmidt.",
          "expected": "Καλησπέρα σας, ναι, έχω κάνει κράτηση στο όνομα Σμιτ.",
          "expectedDe": "Guten Abend, ja, ich habe eine Reservierung auf den Namen Schmidt gemacht.",
          "expectedRoman": "Kalispera sas, nai, echo kanei kratisi sto onoma Smit.",
          "options": [
            {
              "text": "Καλησπέρα σας, ναι, έχω κάνει κράτηση στο όνομα Σμιτ.",
              "de": "Guten Abend, ja, ich habe eine Reservierung auf den Namen Schmidt gemacht.",
              "correct": true
            },
            {
              "text": "Μου αρέσει η ελληνική σαλάτα.",
              "de": "Ich mag griechischen Salat.",
              "correct": false
            },
            {
              "text": "Η θάλασσα είναι πολύ ζεστή.",
              "de": "Das Meer ist sehr warm.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Βεβαίως! Ένα δίκλινο δωμάτιο για τρεις νύχτες. Μου δίνετε το διαβατήριό σας;",
          "npcDe": "Gewiss! Ein Doppelzimmer für drei Nächte. Geben Sie mir Ihren Reisepass?",
          "npcRoman": "Vevaios! Ena diklino domatio gia treis nychtes. Mou dinete to diavatirio sas?",
          "hint": "„Diklino domatio\" = Doppelzimmer.",
          "prompt": "Reiche den Pass und frage nach dem Frühstück.",
          "expected": "Ορίστε το διαβατήριό μου. Τι ώρα σερβίρεται το πρωινό;",
          "expectedDe": "Bitte sehr mein Pass. Zu welcher Uhrzeit wird das Frühstück serviert?",
          "expectedRoman": "Oriste to diavatirio mou. Ti ora serviratai to proino?",
          "options": [
            {
              "text": "Ορίστε το διαβατήριό μου. Τι ώρα σερβίρεται το πρωινό;",
              "de": "Bitte sehr mein Pass. Um wie viel Uhr gibt es Frühstück?",
              "correct": true
            },
            {
              "text": "Δεν ξέρω πού είναι το λιμάνι.",
              "de": "Ich weiß nicht, wo der Hafen ist.",
              "correct": false
            },
            {
              "text": "Θέλω να νοικιάσω ένα μηχανάκι.",
              "de": "Ich möchte einen Roller mieten.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Το πρωινό είναι στον τελευταίο όροφο από τις επτά έως τις δέκα, με θέα στην Ακρόπολη!",
          "npcDe": "Das Frühstück ist im obersten Stockwerk von sieben bis zehn Uhr, mit Blick auf die Akropolis!",
          "npcRoman": "To proino einai ston teleutaio orofo apo tis epta eos tis deka, me thea stin Akropoli!",
          "hint": "Viele Athener Hotels haben Dachterrassen mit Akropolisblick.",
          "prompt": "Bedanke dich und frage nach dem WLAN-Code.",
          "expected": "Υπέροχα, ευχαριστώ πολύ! Ποιος είναι ο κωδικός για το Wi-Fi;",
          "expectedDe": "Wunderbar, vielen Dank! Was ist das Passwort für das Wi-Fi?",
          "expectedRoman": "Yperocha, efcharisto poly! Poios einai o kodikos gia to Wi-Fi?",
          "options": [
            {
              "text": "Υπέροχα, ευχαριστώ πολύ! Ποιος είναι ο κωδικός για το Wi-Fi;",
              "de": "Wunderbar, vielen Dank! Was ist das Passwort für das Wi-Fi?",
              "correct": true
            },
            {
              "text": "Έχει πολύ αέρα σήμερα.",
              "de": "Es ist heute sehr windig.",
              "correct": false
            },
            {
              "text": "Το λεωφορείο άργησε.",
              "de": "Der Bus hat Verspätung.",
              "correct": false
            }
          ]
        }
      ]
    },
    {
      "id": "el-pharmacy",
      "language": "el",
      "category": "health",
      "title": "Στο φαρμακείο (In der Apotheke)",
      "situation": "Du hast Kopfschmerzen und bittest die Apothekerin in Athen um Schmerzmittel.",
      "icon": "fa-kit-medical",
      "npcName": "Μαρία (Maria)",
      "npcRole": "Φαρμακοποιός (Apothekerin)",
      "level": "A2",
      "turns": [
        {
          "npc": "Γεια σας! Πώς μπορώ να σας εξυπηρετήσω;",
          "npcDe": "Hallo! Wie kann ich Ihnen behilflich sein?",
          "npcRoman": "Geia sas! Pos boro na sas exypiretiso?",
          "hint": "Griechische Apotheken sind mit einem grünen Malteserkreuz gekennzeichnet.",
          "prompt": "Erkläre, dass du heftige Kopfschmerzen und etwas Fieber hast.",
          "expected": "Γεια σας, έχω έντονο πονοκέφαλο και λίγο πυρετό από το πρωί.",
          "expectedDe": "Hallo, ich habe heftige Kopfschmerzen und leichtes Fieber seit dem Morgen.",
          "expectedRoman": "Geia sas, echo entono ponokefalo kai ligo pyreto apo to proi.",
          "options": [
            {
              "text": "Γεια σας, έχω έντονο πονοκέφαλο και λίγο πυρετό από το πρωί.",
              "de": "Hallo, ich habe heftige Kopfschmerzen und leichtes Fieber seit dem Morgen.",
              "correct": true
            },
            {
              "text": "Πού μπορώ να αλλάξω χρήματα;",
              "de": "Wo kann ich Geld wechseln?",
              "correct": false
            },
            {
              "text": "Ο καιρός είναι πολύ ζεστός.",
              "de": "Das Wetter ist sehr heiß.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Σας προτείνω παρακεταμόλη. Έχετε κάποια αλλεργία σε φάρμακα;",
          "npcDe": "Ich empfehle Ihnen Paracetamol. Haben Sie eine Allergie gegen Medikamente?",
          "npcRoman": "Sas proteino paraketamoli. Echete kapoia allergia se farmaka?",
          "hint": "„Allergia se farmaka\" = Medikamentenallergie.",
          "prompt": "Antworte, dass du keine Allergien hast und frage nach der Dosierung.",
          "expected": "Όχι, δεν έχω καμία αλλεργία. Πόσα χάπια μπορώ να παίρνω;",
          "expectedDe": "Nein, ich habe keine Allergie. Wie viele Tabletten darf ich nehmen?",
          "expectedRoman": "Ochi, den echo kamia allergia. Posa chapia boro na pairno?",
          "options": [
            {
              "text": "Όχι, δεν έχω καμία αλλεργία. Πόσα χάπια μπορώ να παίρνω;",
              "de": "Nein, ich habe keine Allergie. Wie viele Tabletten darf ich nehmen?",
              "correct": true
            },
            {
              "text": "Θέλω να πάω στην παραλία.",
              "de": "Ich möchte an den Strand gehen.",
              "correct": false
            },
            {
              "text": "Το μουσείο είναι κλειστό.",
              "de": "Das Museum ist geschlossen.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Ένα χάπι κάθε οκτώ ώρες μετά το φαγητό με άφθονο νερό. Περαστικά σας!",
          "npcDe": "Eine Tablette alle acht Stunden nach dem Essen mit reichlich Wasser. Gute Besserung!",
          "npcRoman": "Ena chapi kathe okto ores meta to fagito me afthono nero. Perastika sas!",
          "hint": "„Perastika\" ist die herzliche griechische Genesungsformel.",
          "prompt": "Bedanke dich herzlich und frage nach dem Preis.",
          "expected": "Σας ευχαριστώ πολύ για τη βοήθεια! Πόσο κοστίζει;",
          "expectedDe": "Ich danke Ihnen sehr für die Hilfe! Wie viel kostet es?",
          "expectedRoman": "Sas efcharisto poly gia ti voitheia! Poso kostizei?",
          "options": [
            {
              "text": "Σας ευχαριστώ πολύ για τη βοήθεια! Πόσο κοστίζει;",
              "de": "Ich danke Ihnen sehr für die Hilfe! Wie viel kostet es?",
              "correct": true
            },
            {
              "text": "Δεν μου αρέσει το ψάρι.",
              "de": "Ich mag keinen Fisch.",
              "correct": false
            },
            {
              "text": "Αύριο θα πάρω το αεροπλάνο.",
              "de": "Morgen nehme ich das Flugzeug.",
              "correct": false
            }
          ]
        }
      ]
    },
    {
      "id": "el-station",
      "language": "el",
      "category": "travel",
      "title": "Στον σιδηροδρομικό σταθμό (Am Bahnhof)",
      "situation": "Du kaufst am Schalter des Bahnhofs Athen eine Fahrkarte nach Thessaloniki.",
      "icon": "fa-train",
      "npcName": "Κώστας (Kostas)",
      "npcRole": "Υπάλληλος εισιτηρίων (Schalterbeamter)",
      "level": "A2",
      "turns": [
        {
          "npc": "Καλημέρα σας! Για ποια πόλη θα θέλατε εισιτήριο;",
          "npcDe": "Guten Tag! Für welche Stadt hätten Sie gerne eine Fahrkarte?",
          "npcRoman": "Kalimera sas! Gia poia poli tha thelate eisitirio?",
          "hint": "„Eisitirio\" = Fahrkarte / Ticket.",
          "prompt": "Sage, dass du eine Fahrkarte nach Thessaloniki kaufen möchtest.",
          "expected": "Καλημέρα, θα ήθελα ένα εισιτήριο για τη Θεσσαλονίκη, παρακαλώ.",
          "expectedDe": "Guten Tag, ich hätte gerne eine Fahrkarte nach Thessaloniki, bitte.",
          "expectedRoman": "Kalimera, tha ithela ena eisitirio gia ti Thessaloniki, parakalo.",
          "options": [
            {
              "text": "Καλημέρα, θα ήθελα ένα εισιτήριο για τη Θεσσαλονίκη, παρακαλώ.",
              "de": "Guten Tag, ich hätte gerne eine Fahrkarte nach Thessaloniki, bitte.",
              "correct": true
            },
            {
              "text": "Πεινάω και θέλω να φάω.",
              "de": "Ich habe Hunger und will essen.",
              "correct": false
            },
            {
              "text": "Έχασα τα γυαλιά μου.",
              "de": "Ich habe meine Brille verloren.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Θέλετε απλή μετάβαση ή μετ' επιστροφής; Το γρήγορο τρένο αναχωρεί στις δέκα.",
          "npcDe": "Möchten Sie eine einfache Fahrt oder Hin- und Rückfahrt? Der Schnellzug fährt um zehn ab.",
          "npcRoman": "Thelete apli metavasi i met epistrofis? To grigoro treno anachorei stis deka.",
          "hint": "„Apli metavasi\" = einfache Fahrt; „Met' epistrofis\" = Hin- und Rückfahrt.",
          "prompt": "Wähle einfache Fahrt mit Fensterplatz.",
          "expected": "Απλή μετάβαση στη δεύτερη θέση, δίπλα στο παράθυρο.",
          "expectedDe": "Einfache Fahrt in der 2. Klasse, neben dem Fenster.",
          "expectedRoman": "Apli metavasi sti defteri thesi, dipla sto parathyro.",
          "options": [
            {
              "text": "Απλή μετάβαση στη δεύτερη θέση, δίπλα στο παράθυρο.",
              "de": "Einfache Fahrt in der 2. Klasse, neben dem Fenster.",
              "correct": true
            },
            {
              "text": "Δεν έχω αρκετά λεφτά.",
              "de": "Ich habe nicht genug Geld.",
              "correct": false
            },
            {
              "text": "Το ξενοδοχείο είναι πολύ μακριά.",
              "de": "Das Hotel ist sehr weit weg.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Ορίστε το εισιτήριό σας. Το τρένο φεύγει από την αποβάθρα δύο. Καλό ταξίδι!",
          "npcDe": "Hier ist Ihr Ticket. Der Zug fährt von Bahnsteig zwei ab. Gute Reise!",
          "npcRoman": "Oriste to eisitirio sas. To treno fevgei apo tin apovathra dyo. Kalo taxidi!",
          "hint": "„Apovathra\" = Bahnsteig / Gleis.",
          "prompt": "Bedanke dich herzlich.",
          "expected": "Σας ευχαριστώ πάρα πολύ! Καλή σας μέρα!",
          "expectedDe": "Vielen herzlichen Dank! Einen schönen Tag noch!",
          "expectedRoman": "Sas efcharisto para poly! Kali sas mera!",
          "options": [
            {
              "text": "Σας ευχαριστώ πάρα πολύ! Καλή σας μέρα!",
              "de": "Vielen herzlichen Dank! Einen schönen Tag noch!",
              "correct": true
            },
            {
              "text": "Πρέπει να αγοράσω παπούτσια.",
              "de": "Ich muss Schuhe kaufen.",
              "correct": false
            },
            {
              "text": "Το νερό είναι παγωμένο.",
              "de": "Das Wasser ist eiskalt.",
              "correct": false
            }
          ]
        }
      ]
    }
  ],
  "la": [
    {
      "id": "la-taberna",
      "language": "la",
      "title": "In taberna Romana (In der römischen Schänke)",
      "situation": "Du besuchst eine antike Taverne in Rom und bestellst Speise und Trank.",
      "icon": "fa-wine-glass",
      "npcName": "Marcus",
      "npcRole": "Caupo (Wirt)",
      "level": "A1",
      "turns": [
        {
          "npc": "Salve, viator! Quid in taberna mea petis?",
          "npcDe": "Sei gegrüßt, Wanderer! Was suchst du in meiner Schänke?",
          "hint": "„Salve\" ist der Gruß für eine Person (Mehrzahl: „salvete\").",
          "prompt": "Bestelle Wein und Brot.",
          "expected": "Salve! Vinum et panem peto.",
          "expectedDe": "Sei gegrüßt! Ich bitte um Wein und Brot.",
          "options": [
            {
              "text": "Salve! Vinum et panem peto.",
              "de": "Sei gegrüßt! Ich bitte um Wein und Brot.",
              "correct": true
            },
            {
              "text": "Gallia est omnis divisa in partes tres.",
              "de": "Ganz Gallien ist in drei Teile geteilt.",
              "correct": false
            },
            {
              "text": "Equus meus in campo currit.",
              "de": "Mein Pferd rennt auf dem Feld.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Optimum vinum Falernum habeo! Cupisne vinum cum aqua mixtum?",
          "npcDe": "Ich habe besten falernischen Wein! Möchtest du den Wein mit Wasser gemischt?",
          "hint": "Römer tranken edlen Wein fast immer mit Quellwasser gemischt.",
          "prompt": "Antworte, dass du den Wein mit Wasser gemischt möchtest.",
          "expected": "Ita vero, vinum cum aqua mixtum cupio.",
          "expectedDe": "Ja, ich wünsche Wein mit Wasser gemischt.",
          "options": [
            {
              "text": "Ita vero, vinum cum aqua mixtum cupio.",
              "de": "Ja, ich wünsche Wein mit Wasser gemischt.",
              "correct": true
            },
            {
              "text": "Gladiatores in amphitheatro pugnant.",
              "de": "Die Gladiatoren kämpfen im Amphitheater.",
              "correct": false
            },
            {
              "text": "Carthago delenda est.",
              "de": "Karthago muss zerstört werden.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Ecce, panis calidus et vinum dulce! Duo asses constat.",
          "npcDe": "Siehe da, warmes Brot und süßer Wein! Das kostet zwei Asse.",
          "hint": "Der As („as\") war die gebräuchliche Kupfermünze im Römischen Reich.",
          "prompt": "Gib dem Wirt die Münzen und bedanke dich.",
          "expected": "Ecce nummi! Gratias tibi ago, caupo!",
          "expectedDe": "Hier sind die Münzen! Ich danke dir, Wirt!",
          "options": [
            {
              "text": "Ecce nummi! Gratias tibi ago, caupo!",
              "de": "Hier sind die Münzen! Ich danke dir, Wirt!",
              "correct": true
            },
            {
              "text": "Caesar pontem transiit.",
              "de": "Cäsar überquerte die Brücke.",
              "correct": false
            },
            {
              "text": "Nox est et luna lucet.",
              "de": "Es ist Nacht und der Mond scheint.",
              "correct": false
            }
          ]
        }
      ],
      "category": "food"
    },
    {
      "id": "la-via",
      "language": "la",
      "title": "In via Appia (Auf der Via Appia)",
      "situation": "Du triffst einen Reisenden auf der Via Appia vor den Toren Roms.",
      "icon": "fa-road",
      "npcName": "Lucius",
      "npcRole": "Viator (Reisender)",
      "level": "A1",
      "turns": [
        {
          "npc": "Salve, amice! Quo vadis tam celeri gradu?",
          "npcDe": "Sei gegrüßt, Freund! Wohin gehst du so schnellen Schrittes?",
          "hint": "„Quo vadis?\" = Wohin gehst du?",
          "prompt": "Antworte, dass du nach Rom eilst.",
          "expected": "Romam ad forum propero.",
          "expectedDe": "Ich eile nach Rom zum Forum.",
          "options": [
            {
              "text": "Romam ad forum propero.",
              "de": "Ich eile nach Rom zum Forum.",
              "correct": true
            },
            {
              "text": "Piscis in aqua natat.",
              "de": "Der Fisch schwimmt im Wasser.",
              "correct": false
            },
            {
              "text": "Magister discipulos docet.",
              "de": "Der Lehrer unterrichtet die Schüler.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Via longa est sed plana. Num aquam in itinere habes?",
          "npcDe": "Der Weg ist lang, aber eben. Hast du etwa Wasser für die Reise?",
          "hint": "„In itinere\" = unterwegs / auf der Reise.",
          "prompt": "Antworte, dass du frisches Wasser hast.",
          "expected": "Habeo aquam puram mecum.",
          "expectedDe": "Ich habe sauberes Wasser bei mir.",
          "options": [
            {
              "text": "Habeo aquam puram mecum.",
              "de": "Ich habe sauberes Wasser bei mir.",
              "correct": true
            },
            {
              "text": "Tempestas magna appropinquat.",
              "de": "Ein großes Unwetter nähert sich.",
              "correct": false
            },
            {
              "text": "Non scio scribere.",
              "de": "Ich kann nicht schreiben.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Bene est! Iuppiter te servet in via. Vale!",
          "npcDe": "Sehr gut! Jupiter möge dich auf dem Weg behüten. Leb wohl!",
          "hint": "„Vale\" (Plural: „valete\") ist der klassische lateinische Abschiedsgruß.",
          "prompt": "Verabschiede dich mit „Vale!\".",
          "expected": "Et tu vale, amice optime!",
          "expectedDe": "Und lebe auch du wohl, bester Freund!",
          "options": [
            {
              "text": "Et tu vale, amice optime!",
              "de": "Und lebe auch du wohl, bester Freund!",
              "correct": true
            },
            {
              "text": "Alea iacta est.",
              "de": "Der Würfel ist gefallen.",
              "correct": false
            },
            {
              "text": "Nihil novi sub sole.",
              "de": "Nichts Neues unter der Sonne.",
              "correct": false
            }
          ]
        }
      ],
      "category": "travel"
    },
    {
      "id": "la-medicus",
      "language": "la",
      "category": "health",
      "title": "Apud medicum (Beim Arzt)",
      "situation": "Du besuchst einen römischen Heilkundigen wegen Fieber und bittest um Arznei.",
      "icon": "fa-kit-medical",
      "npcName": "Galenus",
      "npcRole": "Medicus (Heiler)",
      "level": "A2",
      "turns": [
        {
          "npc": "Salve, amice! Quid te affligit? Doletne caput an corpus?",
          "npcDe": "Sei gegrüßt, Freund! Was quält dich? Schmerzt der Kopf oder der Leib?",
          "hint": "Römische Ärzte („medici\") waren oft griechischer Herkunft und hoch angesehen.",
          "prompt": "Erkläre, dass dein Kopf heftig schmerzt und du Fieber hast.",
          "expected": "Salve, medice! Caput mihi vehementer dolet et febrim habeo.",
          "expectedDe": "Sei gegrüßt, Arzt! Mein Kopf schmerzt heftig und ich habe Fieber.",
          "options": [
            {
              "text": "Salve, medice! Caput mihi vehementer dolet et febrim habeo.",
              "de": "Sei gegrüßt, Arzt! Mein Kopf schmerzt heftig und ich habe Fieber.",
              "correct": true
            },
            {
              "text": "Navis in portu manet.",
              "de": "Das Schiff bleibt im Hafen.",
              "correct": false
            },
            {
              "text": "Milites urbem custodiunt.",
              "de": "Die Soldaten bewachen die Stadt.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Corpus tuum calidum est. Cupisne potionem ex herbis paratam ad dolorem levandum?",
          "npcDe": "Dein Körper ist heiß. Wünschst du einen aus Kräutern bereiteten Trank zur Schmerzlinderung?",
          "hint": "„Potio\" = Heiltrank / Arzneitrank.",
          "prompt": "Antworte, dass du den Kräutertrank wünschst.",
          "expected": "Ita vero, potionem salutarem peto.",
          "expectedDe": "Ja fürwahr, ich bitte um den heilsamen Trank.",
          "options": [
            {
              "text": "Ita vero, potionem salutarem peto.",
              "de": "Ja fürwahr, ich bitte um den heilsamen Trank.",
              "correct": true
            },
            {
              "text": "Gladius meus fractus est.",
              "de": "Mein Schwert ist zerbrochen.",
              "correct": false
            },
            {
              "text": "Canis in horto latrat.",
              "de": "Der Hund bellt im Garten.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Sume hunc succum bis in die cum aqua pura. Requiesce in lecto et vale!",
          "npcDe": "Nimm diesen Saft zweimal täglich mit reinem Wasser. Ruhe im Bett und leb wohl!",
          "hint": "„Vale\" bedeutet wörtlich „sei gesund / stark\".",
          "prompt": "Bedanke dich beim Heiler und verabschiede dich.",
          "expected": "Gratias tibi ago, medice bone! Vale!",
          "expectedDe": "Dank sage ich dir, guter Arzt! Leb wohl!",
          "options": [
            {
              "text": "Gratias tibi ago, medice bone! Vale!",
              "de": "Dank sage ich dir, guter Arzt! Leb wohl!",
              "correct": true
            },
            {
              "text": "Agricola terram arat.",
              "de": "Der Bauer pflügt das Land.",
              "correct": false
            },
            {
              "text": "Sole occidente domum eo.",
              "de": "Bei Sonnenuntergang gehe ich heim.",
              "correct": false
            }
          ]
        }
      ]
    },
    {
      "id": "la-mansio",
      "language": "la",
      "category": "travel",
      "title": "In mansione (In der römischen Herberge)",
      "situation": "Du suchst auf der Via Appia eine Unterkunft für die Nacht.",
      "icon": "fa-hotel",
      "npcName": "Tiberius",
      "npcRole": "Caupo (Herbergswirt)",
      "level": "A2",
      "turns": [
        {
          "npc": "Salvete, hospites! Num cubiculum ad noctem quaeritis in mansione mea?",
          "npcDe": "Seid gegrüßt, Gäste! Sucht ihr etwa eine Kammer für die Nacht in meiner Herberge?",
          "hint": "„Mansio\" war die offizielle Raststätte entlang der römischen Reichsstraßen.",
          "prompt": "Antworte, dass du ein Zimmer für die Nacht und Abendessen suchst.",
          "expected": "Salve! Cubiculum quietum et cenam quaerimus.",
          "expectedDe": "Sei gegrüßt! Wir suchen ein ruhiges Zimmer und Abendessen.",
          "options": [
            {
              "text": "Salve! Cubiculum quietum et cenam quaerimus.",
              "de": "Sei gegrüßt! Wir suchen ein ruhiges Zimmer und Abendessen.",
              "correct": true
            },
            {
              "text": "Arbor alta in silva stat.",
              "de": "Ein hoher Baum steht im Wald.",
              "correct": false
            },
            {
              "text": "Senatores in curia disputant.",
              "de": "Die Senatoren streiten in der Kurie.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Habeo cubiculum mundum et pulchrum. Cena calida cum pane et carne mox aderit.",
          "npcDe": "Ich habe eine saubere und schöne Kammer. Warmes Essen mit Brot und Fleisch wird bald bereitstehen.",
          "hint": "„Mundus\" = sauber / gepflegt.",
          "prompt": "Frage nach dem Preis für die Übernachtung.",
          "expected": "Optime! Quantum constat cubiculum pro nocte?",
          "expectedDe": "Bestens! Wie viel kostet das Zimmer für eine Nacht?",
          "options": [
            {
              "text": "Optime! Quantum constat cubiculum pro nocte?",
              "de": "Bestens! Wie viel kostet das Zimmer für eine Nacht?",
              "correct": true
            },
            {
              "text": "Sol lucet in caelo.",
              "de": "Die Sonne scheint am Himmel.",
              "correct": false
            },
            {
              "text": "Non timeo hostes.",
              "de": "Ich fürchte die Feinde nicht.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Quattuor sestertii tantum. Servus meus sarcinas vestras portabit. Bonam noctem!",
          "npcDe": "Nur vier Sesterzen. Mein Sklave wird euer Gepäck tragen. Eine gute Nacht!",
          "hint": "Der Sesterz („sestertius\") war die Hauptrechenwährung in Rom.",
          "prompt": "Übergib das Geld und wünsche eine gute Nacht.",
          "expected": "Accipe pecuniam! Sit tibi nox tranquilla!",
          "expectedDe": "Nimm das Geld! Möge dir eine ruhige Nacht beschieden sein!",
          "options": [
            {
              "text": "Accipe pecuniam! Sit tibi nox tranquilla!",
              "de": "Nimm das Geld! Möge dir eine ruhige Nacht beschieden sein!",
              "correct": true
            },
            {
              "text": "Lupus in monte ululat.",
              "de": "Der Wolf heult auf dem Berg.",
              "correct": false
            },
            {
              "text": "Nescio quid dixeris.",
              "de": "Ich weiß nicht, was du gesagt hast.",
              "correct": false
            }
          ]
        }
      ]
    }
  ],
  "pl": [
    {
      "id": "pl-cafe",
      "language": "pl",
      "category": "food",
      "title": "W kawiarni w Krakowie",
      "situation": "Du sitzt in einem gemütlichen Traditions-Café am Krakauer Marktplatz und möchtest Kaffee und Gebäck bestellen.",
      "icon": "fa-mug-hot",
      "npcName": "Michał",
      "npcRole": "Barista",
      "level": "A1",
      "turns": [
        {
          "npc": "Dzień dobry! Zapraszam do stolika. Co dla Pana / Pani przygotować?",
          "npcDe": "Guten Tag! Nehmen Sie gerne Platz. Was darf ich für Sie zubereiten?",
          "hint": "„Co dla Pana/Pani...\" ist die typische, zuvorkommende Höflichkeitsformel in der Gastronomie.",
          "prompt": "Bestelle bitte einen Kaffee mit Milch und ein Stück Apfelkuchen (Szarlotka).",
          "expected": "Dzień dobry! Poproszę kawę z mlekiem i kawałek szarlotki.",
          "expectedDe": "Guten Tag! Ich hätte gerne einen Kaffee mit Milch und ein Stück Apfelkuchen.",
          "options": [
            {
              "text": "Dzień dobry! Poproszę kawę z mlekiem i kawałek szarlotki.",
              "de": "Guten Tag! Ich hätte gerne einen Kaffee mit Milch und ein Stück Apfelkuchen.",
              "correct": true
            },
            {
              "text": "Gdzie jest najbliższa apteka?",
              "de": "Wo ist die nächste Apotheke?",
              "correct": false
            },
            {
              "text": "Nie lubię czytać gazet w pociągu.",
              "de": "Ich lese nicht gerne Zeitungen im Zug.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Znakomity wybór, nasza szarlotka jest jeszcze ciepła! Czy podać do tego cukier?",
          "npcDe": "Hervorragende Wahl, unsere Szarlotka ist noch warm! Soll ich Zucker dazu servieren?",
          "hint": "„Cukier\" (Zucker) steht nach Präpositionen im Akkusativ oder Genitiv (bez cukru).",
          "prompt": "Antworte, dass du den Kaffee ohne Zucker trinkst.",
          "expected": "Bez cukru, dziękuję. Piję gorzką kawę.",
          "expectedDe": "Ohne Zucker, danke. Ich trinke ungesüßten Kaffee.",
          "options": [
            {
              "text": "Bez cukru, dziękuję. Piję gorzką kawę.",
              "de": "Ohne Zucker, danke. Ich trinke ungesüßten Kaffee.",
              "correct": true
            },
            {
              "text": "Poproszę dwa bilety normalne do Warszawy.",
              "de": "Ich hätte gerne zwei normale Fahrkarten nach Warschau.",
              "correct": false
            },
            {
              "text": "Mam rezerwację na trzy noce.",
              "de": "Ich habe eine Reservierung für drei Nächte.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Już się robi! Będzie to dwadzieścia osiem złotych. Płatność kartą czy gotówką?",
          "npcDe": "Kommt sofort! Das macht achtundzwanzig Złoty. Kartenzahlung oder bar?",
          "hint": "In Polen kann man fast überall kontaktlos mit Karte („kartą\") bezahlen.",
          "prompt": "Sage, dass du mit Karte zahlen möchtest, und bedanke dich.",
          "expected": "Zapłacę kartą, dziękuję bardzo.",
          "expectedDe": "Ich zahle mit Karte, vielen Dank.",
          "options": [
            {
              "text": "Zapłacę kartą, dziękuję bardzo.",
              "de": "Ich zahle mit Karte, vielen Dank.",
              "correct": true
            },
            {
              "text": "Muszę natychmiast zadzwonić do lekarza.",
              "de": "Ich muss sofort den Arzt anrufen.",
              "correct": false
            },
            {
              "text": "Gdzie mogę wypożyczyć rower?",
              "de": "Wo kann ich ein Fahrrad leihen?",
              "correct": false
            }
          ]
        }
      ]
    },
    {
      "id": "pl-directions",
      "language": "pl",
      "category": "travel",
      "title": "Droga na dworzec w Warszawie",
      "situation": "Du bist in der Warschauer Innenstadt und musst zum Hauptbahnhof (Warszawa Centralna). Du fragst eine Passantin nach dem Weg.",
      "icon": "fa-map-location-dot",
      "npcName": "Ania",
      "npcRole": "Passantin",
      "level": "A1",
      "turns": [
        {
          "npc": "Dzień dobry! W czym mogę Panu / Pani pomóc?",
          "npcDe": "Guten Tag! Wie kann ich Ihnen helfen?",
          "hint": "„Przepraszam, jak dojść do...\" ist die klassische Höflichkeitsform für Wegbeschreibungen.",
          "prompt": "Entschuldige dich höflich und frage, wie du zum Hauptbahnhof kommst.",
          "expected": "Przepraszam, czy może mi Pani powiedzieć, jak dojść na dworzec centralny?",
          "expectedDe": "Entschuldigung, können Sie mir bitte sagen, wie ich zum Hauptbahnhof komme?",
          "options": [
            {
              "text": "Przepraszam, czy może mi Pani powiedzieć, jak dojść na dworzec centralny?",
              "de": "Entschuldigung, können Sie mir bitte sagen, wie ich zum Hauptbahnhof komme?",
              "correct": true
            },
            {
              "text": "Chciałbym kupić kilo jabłek i chleb.",
              "de": "Ich möchte ein Kilo Äpfel und Brot kaufen.",
              "correct": false
            },
            {
              "text": "Mój pokój nie ma ciepłej wody.",
              "de": "Mein Zimmer hat kein warmes Wasser.",
              "correct": false
            }
          ]
        },
        {
          "npc": "To całkiem blisko. Musi Pan / Pani iść prosto tą aleją, a przy Pałacu Kultury skręcić w prawo. To około dziesięć minut pieszo.",
          "npcDe": "Das ist ganz in der Nähe. Sie müssen diese Allee geradeaus gehen und beim Kulturpalast nach rechts abbiegen. Das sind ungefähr zehn Minuten zu Fuß.",
          "hint": "„Prosto\" heißt geradeaus, „w prawo\" nach rechts, „w lewo\" nach links.",
          "prompt": "Frage nach, ob man auch mit der Straßenbahn (tramwaj) fahren kann.",
          "expected": "Dziękuję! A czy jedzie tam stąd jakiś tramwaj?",
          "expectedDe": "Danke! Fährt von hier aus auch eine Straßenbahn dorthin?",
          "options": [
            {
              "text": "Dziękuję! A czy jedzie tam stąd jakiś tramwaj?",
              "de": "Danke! Fährt von hier aus auch eine Straßenbahn dorthin?",
              "correct": true
            },
            {
              "text": "Poproszę rachunek za obiad.",
              "de": "Die Rechnung für das Mittagessen, bitte.",
              "correct": false
            },
            {
              "text": "Czy ma Pani tabletki na ból głowy?",
              "de": "Haben Sie Tabletten gegen Kopfschmerzen?",
              "correct": false
            }
          ]
        },
        {
          "npc": "Tak, tramwaj numer 7 lub 9 zawiezie Pana / Panią w dwa przystanki. Przystanek jest tuż za rogiem!",
          "npcDe": "Ja, die Straßenbahnlinie 7 oder 9 bringt Sie in zwei Haltestellen dorthin. Die Haltestelle ist gleich um die Ecke!",
          "hint": "„Tuż za rogiem\" bedeutet „gleich um die Ecke\".",
          "prompt": "Bedanke dich herzlich für die Hilfe und wünsche einen schönen Tag.",
          "expected": "Bardzo Pani dziękuję za pomoc! Życzę miłego dnia.",
          "expectedDe": "Vielen Dank für Ihre Hilfe! Ich wünsche Ihnen einen schönen Tag.",
          "options": [
            {
              "text": "Bardzo Pani dziękuję za pomoc! Życzę miłego dnia.",
              "de": "Vielen Dank für Ihre Hilfe! Ich wünsche Ihnen einen schönen Tag.",
              "correct": true
            },
            {
              "text": "Niestety zgubiłem klucze od domu.",
              "de": "Leider habe ich meine Hausschlüssel verloren.",
              "correct": false
            },
            {
              "text": "O której zamykają muzeum?",
              "de": "Um wie viel Uhr schließt das Museum?",
              "correct": false
            }
          ]
        }
      ]
    },
    {
      "id": "pl-hotel",
      "language": "pl",
      "category": "travel",
      "title": "Zameldowanie w hotelu w Gdańsku",
      "situation": "Du erreichst dein Hotel an der Mottlau in Danzig und möchtest einchecken.",
      "icon": "fa-hotel",
      "npcName": "Piotr",
      "npcRole": "Recepcjonista",
      "level": "A2",
      "turns": [
        {
          "npc": "Dobry wieczór! Witamy w hotelu nad Motławą. Czy ma Pan / Pani rezerwację?",
          "npcDe": "Guten Abend! Willkommen im Hotel an der Mottlau. Haben Sie eine Reservierung?",
          "hint": "„Mam rezerwację na nazwisko...\" ist die Standardformel am Empfang.",
          "prompt": "Begrüße ihn und sage, dass du eine Reservierung auf den Namen Weber für ein Doppelzimmer hast.",
          "expected": "Dobry wieczór! Mam rezerwację na nazwisko Weber na pokój dwuosobowy.",
          "expectedDe": "Guten Abend! Ich habe eine Reservierung auf den Namen Weber für ein Doppelzimmer.",
          "options": [
            {
              "text": "Dobry wieczór! Mam rezerwację na nazwisko Weber na pokój dwuosobowy.",
              "de": "Guten Abend! Ich habe eine Reservierung auf den Namen Weber für ein Doppelzimmer.",
              "correct": true
            },
            {
              "text": "Gdzie mogę kupić bilet ulgowy na pociąg?",
              "de": "Wo kann ich eine ermäßigte Fahrkarte für den Zug kaufen?",
              "correct": false
            },
            {
              "text": "Boli mnie gardło i mam gorączkę.",
              "de": "Ich habe Halsschmerzen und Fieber.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Tak, wszystko się zgadza — trzy noce z widokiem na rzekę. Poproszę o dowód tożsamości lub paszport do zameldowania.",
          "npcDe": "Ja, alles stimmt — drei Nächte mit Blick auf den Fluss. Ich bitte um Ihren Personalausweis oder Reisepass zum Einchecken.",
          "hint": "„Oto...\" heißt „Hier ist... / Bitte schön...\".",
          "prompt": "Reiche deinen Pass und frage, von wann bis wann es Frühstück gibt.",
          "expected": "Oto mój paszport. W jakich godzinach serwowane jest śniadanie?",
          "expectedDe": "Hier ist mein Pass. Zu welchen Zeiten wird das Frühstück serviert?",
          "options": [
            {
              "text": "Oto mój paszport. W jakich godzinach serwowane jest śniadanie?",
              "de": "Hier ist mein Pass. Zu welchen Zeiten wird das Frühstück serviert?",
              "correct": true
            },
            {
              "text": "Chciałbym zamówić dużą pizzę z pieczarkami.",
              "de": "Ich möchte eine große Pizza mit Champignons bestellen.",
              "correct": false
            },
            {
              "text": "Który autobus jedzie na lotnisko?",
              "de": "Welcher Bus fährt zum Flughafen?",
              "correct": false
            }
          ]
        },
        {
          "npc": "Śniadanie podajemy od siódmej do dziesiątej w restauracji na parterze. Oto klucz do pokoju numer 304 na trzecim piętrze. Winda jest po lewej stronie.",
          "npcDe": "Frühstück servieren wir von sieben bis zehn im Restaurant im Erdgeschoss. Hier ist der Schlüssel für Zimmer 304 im dritten Stock. Der Aufzug ist links.",
          "hint": "„Winda\" ist der Aufzug, „parter\" das Erdgeschoss.",
          "prompt": "Bedanke dich für die Informationen und wünsche einen schönen Abend.",
          "expected": "Dziękuję bardzo za informacje. Życzę Panu miłego wieczoru!",
          "expectedDe": "Vielen Dank für die Auskünfte. Ich wünsche Ihnen einen schönen Abend!",
          "options": [
            {
              "text": "Dziękuję bardzo za informacje. Życzę Panu miłego wieczoru!",
              "de": "Vielen Dank für die Auskünfte. Ich wünsche Ihnen einen schönen Abend!",
              "correct": true
            },
            {
              "text": "Nie mam przy sobie gotówki.",
              "de": "Ich habe kein Bargeld dabei.",
              "correct": false
            },
            {
              "text": "Czy ten pociąg ma wagon restauracyjny?",
              "de": "Hat dieser Zug einen Speisewagen?",
              "correct": false
            }
          ]
        }
      ]
    },
    {
      "id": "pl-pharmacy",
      "language": "pl",
      "category": "health",
      "title": "W aptece — przeziębienie",
      "situation": "Du fühlst dich unwohl und gehst in eine polnische Apotheke (Apteka), um etwas gegen Husten und Halsschmerzen zu besorgen.",
      "icon": "fa-prescription-bottle-medical",
      "npcName": "Kasia",
      "npcRole": "Farmaceutka",
      "level": "A2",
      "turns": [
        {
          "npc": "Dzień dobry! W czym mogę pomóc? Źle Pan / Pani wygląda.",
          "npcDe": "Guten Tag! Wie kann ich helfen? Sie sehen nicht gut aus.",
          "hint": "„Boli mnie...\" (Mir tut ... weh) verlangt den Nominativ des Körperteils: boli mnie gardło.",
          "prompt": "Erkläre, dass dir der Hals wehtut und du seit gestern starken Husten hast.",
          "expected": "Dzień dobry. Boli mnie gardło i od wczoraj mam silny kaszel.",
          "expectedDe": "Guten Tag. Mein Hals tut weh und seit gestern habe ich starken Husten.",
          "options": [
            {
              "text": "Dzień dobry. Boli mnie gardło i od wczoraj mam silny kaszel.",
              "de": "Guten Tag. Mein Hals tut weh und seit gestern habe ich starken Husten.",
              "correct": true
            },
            {
              "text": "Poproszę dwa bilety do teatru na jutro.",
              "de": "Zwei Theaterkarten für morgen, bitte.",
              "correct": false
            },
            {
              "text": "Gdzie mogę nadać paczkę pocztową?",
              "de": "Wo kann ich ein Postpaket aufgeben?",
              "correct": false
            }
          ]
        },
        {
          "npc": "Rozumiem. Czy ma Pan / Pani również gorączkę albo katar?",
          "npcDe": "Ich verstehe. Haben Sie auch Fieber oder Schnupfen?",
          "hint": "„Gorączka\" = Fieber, „katar\" = Schnupfen, „lek bez recepty\" = rezeptfreies Medikament.",
          "prompt": "Antworte, dass du nur leichten Schnupfen, aber kein Fieber hast, und frage nach Lutschtabletten.",
          "expected": "Nie mam gorączki, tylko lekki katar. Czy ma Pani skuteczne tabletki do ssania na gardło?",
          "expectedDe": "Ich habe kein Fieber, nur leichten Schnupfen. Haben Sie wirksame Halstabletten zum Lutschen?",
          "options": [
            {
              "text": "Nie mam gorączki, tylko lekki katar. Czy ma Pani skuteczne tabletki do ssania na gardło?",
              "de": "Ich habe kein Fieber, nur leichten Schnupfen. Haben Sie wirksame Halstabletten zum Lutschen?",
              "correct": true
            },
            {
              "text": "Chciałbym zarezerwować stolik dla czterech osób.",
              "de": "Ich möchte einen Tisch für vier Personen reservieren.",
              "correct": false
            },
            {
              "text": "Czy w pobliżu jest stacja benzynowa?",
              "de": "Gibt es in der Nähe eine Tankstelle?",
              "correct": false
            }
          ]
        },
        {
          "npc": "Oczywiście, polecam te ziołowe pastylki z miodem i syrop na noc. Proszę ssać jedną tabletkę co cztery godziny. Razem trzydzieści pięć złotych.",
          "npcDe": "Natürlich, ich empfehle diese Kräuterpastillen mit Honig und einen Hustensaft für die Nacht. Bitte alle vier Stunden eine Tablette lutschen. Zusammen fünfunddreißig Złoty.",
          "hint": "„Życzę szybkiego powrotu do zdrowia!\" bedeutet „Gute Besserung!\".",
          "prompt": "Bedanke dich für die Empfehlung, bezahle und wünsche einen schönen Tag.",
          "expected": "Dziękuję za poradę, zapłacę gotówką. Miłego dnia!",
          "expectedDe": "Danke für die Beratung, ich zahle bar. Einen schönen Tag!",
          "options": [
            {
              "text": "Dziękuję za poradę, zapłacę gotówką. Miłego dnia!",
              "de": "Danke für die Beratung, ich zahle bar. Einen schönen Tag!",
              "correct": true
            },
            {
              "text": "O której odjeżdża ostatni pociąg do Poznania?",
              "de": "Wann fährt der letzte Zug nach Posen ab?",
              "correct": false
            },
            {
              "text": "Zgubiłem bilet parkingowy w garażu.",
              "de": "Ich habe mein Parkticket in der Garage verloren.",
              "correct": false
            }
          ]
        }
      ]
    },
    {
      "id": "pl-station",
      "language": "pl",
      "category": "travel",
      "title": "Na dworcu kolejowym",
      "situation": "Du stehst am Fahrkartenschalter des Bahnhofs und möchtest eine Zugfahrkarte nach Breslau (Wrocław) kaufen.",
      "icon": "fa-train",
      "npcName": "Tomasz",
      "npcRole": "Kasjer kolejowy",
      "level": "A1",
      "turns": [
        {
          "npc": "Dzień dobry! Słucham, dokąd chce Pan / Pani jechać?",
          "npcDe": "Guten Tag! Bitte sehr, wohin möchten Sie reisen?",
          "hint": "„Bilet do...\" verlangt den Genitiv des Zielorts: bilet do Wrocławia.",
          "prompt": "Begrüße den Verkäufer und verlange eine Fahrkarte zweiter Klasse nach Breslau für den nächsten Zug.",
          "expected": "Dzień dobry! Poproszę jeden bilet drugiej klasy do Wrocławia na najbliższy pociąg.",
          "expectedDe": "Guten Tag! Ich hätte gerne eine Fahrkarte zweiter Klasse nach Breslau für den nächsten Zug.",
          "options": [
            {
              "text": "Dzień dobry! Poproszę jeden bilet drugiej klasy do Wrocławia na najbliższy pociąg.",
              "de": "Guten Tag! Ich hätte gerne eine Fahrkarte zweiter Klasse nach Breslau für den nächsten Zug.",
              "correct": true
            },
            {
              "text": "Czy mają Państwo wolny pokój jednoosobowy?",
              "de": "Haben Sie ein freies Einzelzimmer?",
              "correct": false
            },
            {
              "text": "Poproszę dwa kilo truskawek i cytrynę.",
              "de": "Ich hätte gerne zwei Kilo Erdbeeren und eine Zitrone.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Najbliższy pociąg InterCity odjeżdża o godzinie czternastej dwadzieścia z peronu trzeciego. Czy życzy Pan / Pani sobie miejsce przy oknie czy przy korytarzu?",
          "npcDe": "Der nächste InterCity-Zug fährt um 14:20 Uhr von Gleis drei ab. Wünschen Sie einen Platz am Fenster oder am Gang?",
          "hint": "„Miejsce przy oknie\" = Fensterplatz, „przy korytarzu\" = Gangplatz, „peron\" = Bahnsteig.",
          "prompt": "Antworte, dass du einen Platz am Fenster bevorzugst.",
          "expected": "Poproszę miejsce przy oknie, jeśli to możliwe.",
          "expectedDe": "Ich hätte gerne einen Platz am Fenster, wenn möglich.",
          "options": [
            {
              "text": "Poproszę miejsce przy oknie, jeśli to możliwe.",
              "de": "Ich hätte gerne einen Platz am Fenster, wenn möglich.",
              "correct": true
            },
            {
              "text": "Ten zamek powstał w czternastym wieku.",
              "de": "Dieses Schloss entstand im vierzehnten Jahrhundert.",
              "correct": false
            },
            {
              "text": "Chciałbym zgłosić awarię klimatyzacji.",
              "de": "Ich möchte einen Ausfall der Klimaanlage melden.",
              "correct": false
            }
          ]
        },
        {
          "npc": "Świetnie, wagon numer sześć, miejsce 45 przy oknie. Bilet kosztuje sześćdziesiąt pięć złotych. Życzę przyjemnej podróży!",
          "npcDe": "Sehr schön, Wagen Nummer sześć, Platz 45 am Fenster. Die Fahrkarte kostet fünfundsechzig Złoty. Eine angenehme Reise!",
          "hint": "„Życzę przyjemnej podróży!\" = Angenehme Reise / Gute Fahrt!",
          "prompt": "Bedanke dich herzlich für das Ticket und wünsche einen schönen Arbeitstag.",
          "expected": "Dziękuję bardzo i życzę Panu miłego dnia w pracy!",
          "expectedDe": "Vielen Dank und ich wünsche Ihnen einen angenehmen Arbeitstag!",
          "options": [
            {
              "text": "Dziękuję bardzo i życzę Panu miłego dnia w pracy!",
              "de": "Vielen Dank und ich wünsche Ihnen einen angenehmen Arbeitstag!",
              "correct": true
            },
            {
              "text": "Proszę podać sól i pieprz.",
              "de": "Bitte reichen Sie Salz und Pfeffer.",
              "correct": false
            },
            {
              "text": "Mam alergię na orzechy laskowe.",
              "de": "Ich habe eine Allergie gegen Haselnüsse.",
              "correct": false
            }
          ]
        }
      ]
    }
  ]
};
