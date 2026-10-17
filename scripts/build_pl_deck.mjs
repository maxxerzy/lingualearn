import fs from 'fs';
import path from 'path';

async function buildPolishDeck() {
  console.log('📦 Assembling Polish deck (1,500 cards)...');

  const batchFiles = [
    'scripts/data_pl_batch1.json',
    'scripts/data_pl_batch2.json',
    'scripts/data_pl_batch3.json',
    'scripts/data_pl_batch4.json',
    'scripts/data_pl_batch5.json',
    'scripts/data_pl_batch6.json'
  ];

  let cards = [];
  for (let i = 0; i < batchFiles.length; i++) {
    const bf = path.resolve(batchFiles[i]);
    if (!fs.existsSync(bf)) {
      throw new Error(`Missing batch file: ${bf}`);
    }
    const data = JSON.parse(fs.readFileSync(bf, 'utf8'));
    const batchCards = Array.isArray(data) ? data : data.cards || data.items;
    if (!Array.isArray(batchCards)) {
      throw new Error(`Invalid format in ${bf}, expected array`);
    }
    console.log(`Loaded batch ${i + 1}: ${batchCards.length} cards`);
    cards = cards.concat(batchCards);
  }

  if (cards.length !== 1500) {
    throw new Error(`Expected exactly 1500 cards, got ${cards.length}`);
  }

  // Load lesson curriculum
  const ref = JSON.parse(fs.readFileSync(path.resolve('scripts/reference_1500_de.json'), 'utf8'));
  const lessonSizes = ref.lessonSizes;
  const lessonTitles = ref.lessonTitles;

  const sumSizes = lessonSizes.reduce((a, b) => a + b, 0);
  if (sumSizes !== 1500) {
    throw new Error(`sum(lessonSizes) is ${sumSizes}, expected 1500`);
  }
  if (lessonSizes.length !== lessonTitles.length) {
    throw new Error(`lessonSizes length (${lessonSizes.length}) !== lessonTitles length (${lessonTitles.length})`);
  }

  // Validate cards
  const seenFronts = new Set();
  cards.forEach((c, idx) => {
    if (!c.front || typeof c.front !== 'string' || !c.front.trim()) {
      throw new Error(`Card #${idx} missing front`);
    }
    const fLower = c.front.trim().toLowerCase();
    if (seenFronts.has(fLower)) {
      throw new Error(`Duplicate front at #${idx}: "${c.front}"`);
    }
    seenFronts.add(fLower);

    if (!c.back || typeof c.back !== 'string' || !c.back.trim()) {
      throw new Error(`Card #${idx} missing back: "${c.front}"`);
    }
    if (!c.example || typeof c.example !== 'string' || !c.example.trim()) {
      throw new Error(`Card #${idx} missing example: "${c.front}"`);
    }
    if (!c.exampleDE || typeof c.exampleDE !== 'string' || !c.exampleDE.trim()) {
      throw new Error(`Card #${idx} missing exampleDE: "${c.front}"`);
    }
    if (!c.ipa || typeof c.ipa !== 'string' || !c.ipa.trim()) {
      throw new Error(`Card #${idx} missing ipa: "${c.front}"`);
    }
    // Clean IPA if it accidentally has slashes
    if (c.ipa.startsWith('/') && c.ipa.endsWith('/')) {
      c.ipa = c.ipa.slice(1, -1).trim();
    }
  });

  // Generate output file
  const fileContent = `// LinguaLearn Flashcard Deck - PL
// Total: 1500 cards

export const cards = ${JSON.stringify(cards, null, 2)};

export const lessonSizes = ${JSON.stringify(lessonSizes, null, 2)};

export const lessonTitles = ${JSON.stringify(lessonTitles, null, 2)};
`;

  const deckFile = path.resolve('js/data/decks/pl.js');
  fs.writeFileSync(deckFile, fileContent, 'utf8');

  const actualBytes = fs.statSync(deckFile).size;
  console.log(`✅ js/data/decks/pl.js written successfully (${actualBytes} bytes)`);

  // Update js/data/decks/meta.js
  const metaPath = path.resolve('js/data/decks/meta.js');
  let metaContent = fs.readFileSync(metaPath, 'utf8');

  const newEntry = `  { id: 'basic-pl', name: 'Polnisch', language: 'pl', count: 1500, bytes: ${actualBytes} }`;

  if (metaContent.includes("id: 'basic-pl'")) {
    metaContent = metaContent.replace(/\{\s*id:\s*'basic-pl'[^}]+\}/, newEntry.trim());
  } else {
    metaContent = metaContent.replace(/\];/, `,\n${newEntry}\n];`);
  }

  fs.writeFileSync(metaPath, metaContent, 'utf8');
  console.log(`✅ js/data/decks/meta.js updated with basic-pl (${actualBytes} bytes)`);

  // Update scripts/validate_decks.mjs
  const valPath = path.resolve('scripts/validate_decks.mjs');
  let valContent = fs.readFileSync(valPath, 'utf8');
  valContent = valContent.replace(
    "const LANGS = ['da', 'el', 'la', 'fr', 'es', 'ru', 'ja', 'zh', 'pt', 'ar'];",
    "const LANGS = ['da', 'el', 'la', 'fr', 'es', 'ru', 'ja', 'zh', 'pt', 'ar', 'pl'];"
  );
  valContent = valContent.replace(
    "const NEEDS_IPA = ['da', 'el', 'la', 'fr', 'es', 'ru', 'pt'];",
    "const NEEDS_IPA = ['da', 'el', 'la', 'fr', 'es', 'ru', 'pt', 'pl'];"
  );
  valContent = valContent.replace(
    "if (!Array.isArray(deckMeta) || deckMeta.length !== 10) {",
    "if (!Array.isArray(deckMeta) || deckMeta.length !== 11) {"
  );
  valContent = valContent.replace(
    "console.log('🔍 Validating all 10 decks...');",
    "console.log('🔍 Validating all 11 decks...');"
  );
  valContent = valContent.replace(
    "console.log('\\n🎉 ALL 10 DECKS VALIDATED PERFECTLY WITH 1,500 CARDS EACH!');",
    "console.log('\\n🎉 ALL 11 DECKS VALIDATED PERFECTLY WITH 1,500 CARDS EACH!');"
  );

  fs.writeFileSync(valPath, valContent, 'utf8');
  console.log('✅ scripts/validate_decks.mjs updated for 11 decks.');
}

buildPolishDeck().catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});
