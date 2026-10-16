import fs from 'fs';
import path from 'path';

const LANGS = ['da', 'el', 'la', 'fr', 'es', 'ru', 'ja', 'zh', 'pt', 'ar'];

async function fixHomographs() {
  for (const lang of LANGS) {
    const deckFile = path.resolve(`./js/data/decks/${lang}.js`);
    const deck = await import(`file://${deckFile}?t=${Date.now()}`);
    const cards = deck.cards || deck.default?.cards;
    const lessonSizes = deck.lessonSizes || deck.default?.lessonSizes;
    const lessonTitles = deck.lessonTitles || deck.default?.lessonTitles;

    let modified = 0;

    for (const c of cards) {
      // 1. Rezept
      if (c.front === 'das Rezept') {
        if (c.exampleDE.includes('Großmutter') || c.exampleDE.includes('kochen') || c.exampleDE.includes('Küche')) {
          c.front = 'das Rezept (Küche)';
          modified++;
        } else if (c.exampleDE.includes('Arzt') || c.exampleDE.includes('Tabletten') || c.exampleDE.includes('Apotheke')) {
          c.front = 'das Rezept (Medizin)';
          modified++;
        }
      }

      // 2. Zeugnis
      if (c.front === 'das Zeugnis') {
        if (c.exampleDE.includes('Schule') || c.exampleDE.includes('Schultag') || c.exampleDE.includes('Ferien')) {
          c.front = 'das Schulzeugnis';
          modified++;
        } else if (c.exampleDE.includes('Arbeitszeugnis') || c.exampleDE.includes('beruflichen') || c.exampleDE.includes('Bewerbung')) {
          c.front = 'das Arbeitszeugnis';
          modified++;
        }
      }

      // 3. Wissen vs wissen
      if (c.front === 'Wissen') {
        c.front = 'das Wissen';
        modified++;
      }

      // 4. Essen vs essen
      if (c.front === 'Essen') {
        c.front = 'das Essen';
        modified++;
      }

      // 5. Singen vs singen
      if (c.front === 'Singen') {
        c.front = 'das Singen';
        modified++;
      }

      // 6. Tanzen vs tanzen
      if (c.front === 'Tanzen') {
        c.front = 'das Tanzen';
        modified++;
      }

      // 7. Schwimmen vs schwimmen
      if (c.front === 'Schwimmen') {
        c.front = 'das Schwimmen';
        modified++;
      }

      // 8. Laufen vs laufen
      if (c.front === 'Laufen') {
        c.front = 'das Laufen';
        modified++;
      }

      // 9. Leben vs leben
      if (c.front === 'Leben') {
        c.front = 'das Leben';
        modified++;
      }

      // 10. Stolz vs stolz
      if (c.front === 'Stolz') {
        c.front = 'der Stolz';
        modified++;
      }

      // 11. Orange vs orange
      if (c.front === 'Orange') {
        c.front = 'die Orange';
        modified++;
      }

      // 12. Reich vs reich
      if (c.front === 'Reich') {
        c.front = 'das Reich';
        modified++;
      }

      // 13. arm (Nomen der Arm vs Adj arm)
      if (c.front === 'Arm' && (c.back === 'bracchium' || c.exampleDE.includes('Arm des Athleten'))) {
        c.front = 'der Arm';
        modified++;
      }
      if (c.front === 'arm' && (c.exampleDE.includes('Körper') || c.exampleDE.includes('Knochen') || c.exampleDE.includes('Gips') || c.exampleDE.includes('gebrochen'))) {
        c.front = 'der Arm';
        modified++;
      }

      // 14. Latin lesen / schreiben duplicates
      if (lang === 'la') {
        if (c.front === 'Lesen') {
          c.front = 'das Lesen';
          modified++;
        } else if (c.front === 'lesen' && c.exampleDE.includes('Lateinische Gedichte')) {
          c.front = 'Gedichte lesen';
          modified++;
        }
        if (c.front === 'Schreiben') {
          c.front = 'das Schreiben';
          modified++;
        } else if (c.front === 'schreiben' && c.exampleDE.includes('Geschichte zu schreiben')) {
          c.front = 'Geschichte schreiben';
          modified++;
        }
      }

      // 15. Chinese colors Grün, Gelb, Grau
      if (lang === 'zh') {
        if (c.front === 'Grün' && c.back === '绿色') {
          c.front = 'die Farbe Grün';
          modified++;
        }
        if (c.front === 'Gelb' && c.back === '黄色') {
          c.front = 'die Farbe Gelb';
          modified++;
        }
        if (c.front === 'Grau' && c.back === '灰色') {
          c.front = 'die Farbe Grau';
          modified++;
        }
      }
    }

    const fileContent = `// LinguaLearn Flashcard Deck - ${lang.toUpperCase()}
// Total: 1500 cards

export const cards = ${JSON.stringify(cards, null, 2)};

export const lessonSizes = ${JSON.stringify(lessonSizes)};

export const lessonTitles = ${JSON.stringify(lessonTitles, null, 2)};
`;

    fs.writeFileSync(deckFile, fileContent, 'utf8');
    const bytes = fs.statSync(deckFile).size;
    console.log(`[${lang}] Disambiguated ${modified} cards. New size: ${bytes} bytes.`);

    // Update meta.js
    const metaFile = path.resolve('./js/data/decks/meta.js');
    let metaContent = fs.readFileSync(metaFile, 'utf8');
    const regex = new RegExp(`({[^{}]*language:\\s*['"]${lang}['"][^{}]*count:\\s*)\\d+([^{}]*bytes:\\s*)\\d+`, 'g');
    metaContent = metaContent.replace(regex, `$11500$2${bytes}`);
    fs.writeFileSync(metaFile, metaContent, 'utf8');
  }
}

fixHomographs().catch(err => {
  console.error(err);
  process.exit(1);
});
