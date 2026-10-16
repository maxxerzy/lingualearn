import fs from 'fs';
import path from 'path';

const lang = process.argv[2];
if (!lang) {
  console.error('Usage: node scripts/merge_deck.mjs <lang>');
  process.exit(1);
}

async function merge() {
  const deckFile = path.resolve(`./js/data/decks/${lang}.js`);
  if (!fs.existsSync(deckFile)) {
    throw new Error(`Deck file not found: ${deckFile}`);
  }

  const existingDeck = await import(`file://${deckFile}?t=${Date.now()}`);
  const existingCards = existingDeck.cards || existingDeck.default?.cards || [];
  const existingSizes = existingDeck.lessonSizes || existingDeck.default?.lessonSizes || [];
  const existingTitles = existingDeck.lessonTitles || existingDeck.default?.lessonTitles || [];

  const needed = 1500 - existingCards.length;
  console.log(`[${lang}] Current cards: ${existingCards.length}, needed to reach 1500: ${needed}`);

  if (needed <= 0) {
    console.log(`[${lang}] Deck already has 1500+ cards (${existingCards.length}). Nothing to merge.`);
    return;
  }

  // Load parts
  const partFiles = [
    `scripts/data_${lang}_part1.json`,
    `scripts/data_${lang}_part2.json`,
    `scripts/data_${lang}_part3.json`,
    `scripts/data_${lang}_part4.json`,
  ];

  let collectedCards = [];
  for (const pf of partFiles) {
    const fullPath = path.resolve(pf);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Missing part file: ${fullPath}`);
    }
    const partData = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    const cards = Array.isArray(partData) ? partData : partData.cards || partData.items;
    if (!Array.isArray(cards)) {
      throw new Error(`Invalid format in ${fullPath}, expected array`);
    }
    collectedCards = collectedCards.concat(cards);
  }

  console.log(`[${lang}] Loaded ${collectedCards.length} generated cards from 4 parts.`);
  if (collectedCards.length < needed) {
    throw new Error(`[${lang}] Not enough cards generated! Needed ${needed}, but only found ${collectedCards.length}`);
  }

  const newCards = collectedCards.slice(0, needed);

  // Validate cards
  const existingFronts = new Set(existingCards.map(c => c.front.trim().toLowerCase()));
  for (let i = 0; i < newCards.length; i++) {
    const c = newCards[i];
    if (!c.front || !c.back || !c.example || !c.exampleDE) {
      throw new Error(`Card #${i} in new cards missing mandatory fields: ${JSON.stringify(c)}`);
    }
    if (existingFronts.has(c.front.trim().toLowerCase())) {
      console.warn(`⚠️ Warning: Duplicate front detected between existing and new: "${c.front}"`);
    }
  }

  // Calculate new lessons based on master curriculum
  const master = JSON.parse(fs.readFileSync(path.resolve('./scripts/master_750.json'), 'utf8'));
  const { LESSONS } = await import(path.resolve('./scripts/build_master_vocab.mjs'));

  const newSizes = [];
  const newTitles = [];
  let remaining = needed;

  for (let i = 0; i < LESSONS.length && remaining > 0; i++) {
    const l = LESSONS[i];
    const take = Math.min(remaining, l.items.length);
    newSizes.push(take);
    newTitles.push(l.title);
    remaining -= take;
  }

  // If last lesson is very small (< 4), merge into previous
  if (newSizes.length > 1 && newSizes[newSizes.length - 1] < 4) {
    const last = newSizes.pop();
    newTitles.pop();
    newSizes[newSizes.length - 1] += last;
  }

  const finalCards = existingCards.concat(newCards);
  const finalSizes = existingSizes.concat(newSizes);
  const finalTitles = existingTitles.concat(newTitles);

  console.log(`[${lang}] Final cards count: ${finalCards.length}`);
  console.log(`[${lang}] Final lessons count: ${finalTitles.length}, sumSizes: ${finalSizes.reduce((a, b) => a + b, 0)}`);

  if (finalCards.length !== 1500) {
    throw new Error(`Final cards count is ${finalCards.length}, expected 1500!`);
  }
  if (finalSizes.reduce((a, b) => a + b, 0) !== 1500) {
    throw new Error(`Sum of lesson sizes is ${finalSizes.reduce((a, b) => a + b, 0)}, expected 1500!`);
  }
  if (finalSizes.length !== finalTitles.length) {
    throw new Error(`Mismatch between lessonSizes (${finalSizes.length}) and lessonTitles (${finalTitles.length})`);
  }

  // Format and write deck file
  const fileContent = `// LinguaLearn Flashcard Deck - ${lang.toUpperCase()}
// Total: 1500 cards

export const cards = ${JSON.stringify(finalCards, null, 2)};

export const lessonSizes = ${JSON.stringify(finalSizes)};

export const lessonTitles = ${JSON.stringify(finalTitles, null, 2)};
`;

  fs.writeFileSync(deckFile, fileContent, 'utf8');
  const actualBytes = fs.statSync(deckFile).size;
  console.log(`✅ [${lang}] Successfully updated ${deckFile} (${actualBytes} bytes).`);

  // Update meta.js
  const metaFile = path.resolve('./js/data/decks/meta.js');
  let metaContent = fs.readFileSync(metaFile, 'utf8');
  // Match entry for this language: { id: 'basic-<lang>', name: ..., count: ..., bytes: ... }
  const regex = new RegExp(`({[^{}]*language:\\s*['"]${lang}['"][^{}]*count:\\s*)\\d+([^{}]*bytes:\\s*)\\d+`, 'g');
  if (regex.test(metaContent)) {
    metaContent = metaContent.replace(regex, `$11500$2${actualBytes}`);
  } else {
    // Alternative regex format
    const altRegex = new RegExp(`(id:\\s*['"]basic-${lang}['"][^}]*count:\\s*)\\d+([^}]*bytes:\\s*)\\d+`, 'g');
    metaContent = metaContent.replace(altRegex, `$11500$2${actualBytes}`);
  }
  fs.writeFileSync(metaFile, metaContent, 'utf8');
  console.log(`✅ [${lang}] Updated js/data/decks/meta.js with count=1500 and bytes=${actualBytes}.`);
}

merge().catch(err => {
  console.error(`❌ Merge failed for ${lang}:`, err);
  process.exit(1);
});
