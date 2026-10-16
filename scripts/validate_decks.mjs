import fs from 'fs';
import path from 'path';

const LANGS = ['da', 'el', 'la', 'fr', 'es', 'ru', 'ja', 'zh', 'pt', 'ar'];
const NON_LATIN = ['el', 'ru', 'ja', 'zh', 'ar'];
const NEEDS_IPA = ['da', 'el', 'la', 'fr', 'es', 'ru', 'pt'];

let totalErrors = 0;

function logError(msg) {
  console.error(`❌ ${msg}`);
  totalErrors++;
}

async function validate() {
  console.log('🔍 Validating all 10 decks...');

  const metaPath = path.resolve('./js/data/decks/meta.js');
  const meta = await import(`file://${metaPath}?t=${Date.now()}`);
  const deckMeta = meta.deckMeta;

  if (!Array.isArray(deckMeta) || deckMeta.length !== 10) {
    logError(`deckMeta must have 10 entries, found ${deckMeta?.length}`);
  }

  for (const lang of LANGS) {
    const deckFile = path.resolve(`./js/data/decks/${lang}.js`);
    if (!fs.existsSync(deckFile)) {
      logError(`Missing deck file: ${deckFile}`);
      continue;
    }

    const fileSize = fs.statSync(deckFile).size;
    const metaEntry = deckMeta.find(m => m.language === lang);
    if (!metaEntry) {
      logError(`No metadata entry for language: ${lang}`);
    } else {
      if (metaEntry.count !== 1500) {
        logError(`[${lang}] metadata count is ${metaEntry.count}, expected 1500`);
      }
      if (Math.abs(metaEntry.bytes - fileSize) > 2000) {
        logError(`[${lang}] metadata bytes (${metaEntry.bytes}) deviates significantly from actual size (${fileSize})`);
      }
    }

    const deck = await import(`file://${deckFile}?t=${Date.now()}`);
    const cards = deck.cards || deck.default?.cards;
    const lessonSizes = deck.lessonSizes || deck.default?.lessonSizes;
    const lessonTitles = deck.lessonTitles || deck.default?.lessonTitles;

    if (!Array.isArray(cards)) {
      logError(`[${lang}] cards is not an array`);
      continue;
    }

    if (cards.length !== 1500) {
      logError(`[${lang}] card count is ${cards.length}, expected 1500`);
    }

    // Check duplicate fronts
    const fronts = new Map();
    cards.forEach((c, idx) => {
      const f = c.front?.trim().toLowerCase();
      if (!f) {
        logError(`[${lang}] Card #${idx} has empty front`);
        return;
      }
      if (fronts.has(f)) {
        logError(`[${lang}] Duplicate front at #${idx} and #${fronts.get(f)}: "${c.front}"`);
      } else {
        fronts.set(f, idx);
      }
    });

    // Check fields
    let missingBack = 0;
    let missingEx = 0;
    let missingExDE = 0;
    let missingIPA = 0;
    let slashIPA = 0;
    let missingRoman = 0;
    let unvocalizedArabic = 0;

    cards.forEach((c, idx) => {
      if (!c.back || typeof c.back !== 'string' || !c.back.trim()) missingBack++;
      if (!c.example || typeof c.example !== 'string' || !c.example.trim()) missingEx++;
      if (!c.exampleDE || typeof c.exampleDE !== 'string' || !c.exampleDE.trim()) missingExDE++;

      if (NEEDS_IPA.includes(lang)) {
        if (!c.ipa || typeof c.ipa !== 'string' || !c.ipa.trim()) missingIPA++;
        else if (c.ipa.startsWith('/') && c.ipa.endsWith('/')) slashIPA++;
      }

      if (NON_LATIN.includes(lang)) {
        if (!c.roman || typeof c.roman !== 'string' || !c.roman.trim()) missingRoman++;
      }

      if (lang === 'ar') {
        // Check for at least some diacritic marks (Fatha, Damma, Kasra, Sukun, Shaddah, etc.)
        const harakatRegex = /[\u064B-\u0652\u0670]/;
        if (!harakatRegex.test(c.back)) unvocalizedArabic++;
      }
    });

    if (missingBack > 0) logError(`[${lang}] ${missingBack} cards missing 'back'`);
    if (missingEx > 0) logError(`[${lang}] ${missingEx} cards missing 'example'`);
    if (missingExDE > 0) logError(`[${lang}] ${missingExDE} cards missing 'exampleDE'`);
    if (missingIPA > 0) logError(`[${lang}] ${missingIPA} cards missing 'ipa'`);
    if (slashIPA > 0) logError(`[${lang}] ${slashIPA} cards have enclosing slashes in 'ipa'`);
    if (missingRoman > 0) logError(`[${lang}] ${missingRoman} cards missing 'roman'`);
    if (unvocalizedArabic > 0) logError(`[${lang}] ${unvocalizedArabic} cards missing Arabic vocalization`);

    // Check lessons
    if (!Array.isArray(lessonSizes) || !Array.isArray(lessonTitles)) {
      logError(`[${lang}] lessonSizes or lessonTitles is not an array`);
    } else {
      const sumSizes = lessonSizes.reduce((a, b) => a + b, 0);
      if (sumSizes !== cards.length) {
        logError(`[${lang}] sum(lessonSizes) = ${sumSizes} != cards.length = ${cards.length}`);
      }
      if (lessonSizes.length !== lessonTitles.length) {
        logError(`[${lang}] lessonSizes.length (${lessonSizes.length}) != lessonTitles.length (${lessonTitles.length})`);
      }
      const badSizes = lessonSizes.filter(s => s < 1 || s > 25);
      if (badSizes.length > 0) {
        logError(`[${lang}] Unusual lesson sizes: ${badSizes.join(', ')}`);
      }
    }

    console.log(`✓ [${lang}] scanned ${cards.length} cards.`);
  }

  if (totalErrors === 0) {
    console.log('\n🎉 ALL 10 DECKS VALIDATED PERFECTLY WITH 1,500 CARDS EACH!');
    process.exit(0);
  } else {
    console.error(`\n❌ Total errors found: ${totalErrors}`);
    process.exit(1);
  }
}

validate().catch(err => {
  console.error('Validation crashed:', err);
  process.exit(1);
});
