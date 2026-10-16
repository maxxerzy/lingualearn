// Lautschrift-Gerüst (Transliteration / Romanisierung) für Sprachen mit
// nicht-lateinischer Schrift (Arabisch, Russisch, Griechisch, Japanisch,
// Chinesisch). Ermöglicht Lernenden, die die fremde Schrift noch nicht
// flüssig lesen können, jedes Wort, jede Kachel und jeden Satzbaustein
// sofort lautlich zu erfassen und dabei Buchstabe für Buchstabe die
// Schrift mitzuerlernen.

import { arabicBase, splitGraphemes } from './sentence.js';

const FOREIGN_SCRIPT_LANGS = new Set(['ar', 'ru', 'el', 'ja', 'zh']);

export function hasForeignScript(lang) {
  return FOREIGN_SCRIPT_LANGS.has(lang);
}

// ── Arabisch (Fuṣḥā, voll vokalisiert) ───────────────────────────
const AR_CONS = {
  'ء': 'ʾ', 'آ': 'ā', 'أ': 'ʾ', 'ؤ': 'ʾ', 'إ': 'ʾ', 'ئ': 'ʾ',
  'ا': 'ā', 'ٱ': 'a', 'ب': 'b', 'ة': 'a', 'ت': 't', 'ث': 'th',
  'ج': 'j', 'ح': 'ḥ', 'خ': 'kh', 'د': 'd', 'ذ': 'dh', 'ر': 'r',
  'ز': 'z', 'س': 's', 'ش': 'sh', 'ص': 'ṣ', 'ض': 'ḍ', 'ط': 'ṭ',
  'ظ': 'ẓ', 'ع': 'ʿ', 'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ك': 'k',
  'ل': 'l', 'م': 'm', 'ن': 'n', 'ه': 'h', 'و': 'w', 'ى': 'ā', 'ي': 'y',
};

export function romanizeArabicGrapheme(g, prevG = '', idx = 0, nextG = '') {
  if (!g) return '';
  const base = g[0];
  if (/[.,!?;:؟،؛]/.test(base)) return base === '؟' ? '?' : base === '،' ? ',' : base;
  const cons = AR_CONS[base];
  if (cons === undefined) return '';

  const hasShadda = g.includes('\u0651');
  const hasSukun  = g.includes('\u0652');
  const hasFatha  = g.includes('\u064E');
  const hasKasra  = g.includes('\u0650');
  const hasDamma  = g.includes('\u064F');
  const hasFathatan = g.includes('\u064B');
  const hasKasratan = g.includes('\u064D');
  const hasDammatan = g.includes('\u064C');
  const hasDaggerAlif = g.includes('\u0670');

  let vowel = '';
  if (hasDaggerAlif) vowel = 'ā';
  else if (hasFathatan) vowel = 'an';
  else if (hasKasratan) vowel = 'in';
  else if (hasDammatan) vowel = 'un';
  else if (hasFatha) vowel = 'a';
  else if (hasKasra) vowel = 'i';
  else if (hasDamma) vowel = 'u';

  // Alif ohne eigenes Vokalzeichen:
  if (base === 'ا' && !vowel) {
    if (prevG && prevG.includes('\u064B')) return '–'; // stummer Träger nach -an
    if (idx === 0 && nextG && nextG[0] === 'ل') return 'a'; // Artikel al- am Wortanfang
    if (idx === 1 && nextG && nextG[0] === 'ل' && prevG && /^[بوكفل]/.test(prevG[0])) return '–'; // Präfix + al-
    return 'ā';
  }
  // Lange Vokale ū / ī (و nach Ḍamma, ي nach Kasra ohne eigenes Vokalzeichen)
  if (base === 'و' && !vowel && !hasSukun && prevG && prevG.includes('\u064F')) {
    return 'ū';
  }
  if (base === 'ي' && !vowel && !hasSukun && prevG && prevG.includes('\u0650')) {
    return 'ī';
  }
  // Stummes Lām im bestimmten Artikel vor Sonnenbuchstaben (الشّ... / بِالشّ...)
  if (base === 'ل' && !vowel && !hasSukun && (idx === 1 || idx === 2) && prevG && (prevG[0] === 'ا' || prevG[0] === 'ٱ') && nextG && nextG.includes('\u0651')) {
    return '–';
  }
  // Wortanfang mit Hamza-Träger (أَ / إِ / أُ): im Anlaut nur der Vokal
  if ((base === 'أ' || base === 'إ') && idx === 0 && vowel) {
    return vowel;
  }
  if (base === 'آ') {
    return idx === 0 ? 'ā' : 'ʾā';
  }
  if (base === 'ة') {
    return vowel ? `t${vowel}` : 'a';
  }

  const c = hasShadda && idx > 0 ? cons + cons : cons;
  return c + vowel;
}

// ── Russisch (Kyrillisch) ────────────────────────────────────────
const RU_MAP = {
  'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
  'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
  'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
  'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh',
  'щ': 'shch', 'ъ': 'ʺ', 'ы': 'y', 'ь': 'ʼ', 'э': 'e', 'ю': 'yu', 'я': 'ya',
};

// ── Griechisch ───────────────────────────────────────────────────
const EL_MAP = {
  'α': 'a', 'β': 'v', 'γ': 'g', 'δ': 'd', 'ε': 'e', 'ζ': 'z', 'η': 'i',
  'θ': 'th', 'ι': 'i', 'κ': 'k', 'λ': 'l', 'μ': 'm', 'ν': 'n', 'ξ': 'x',
  'ο': 'o', 'π': 'p', 'ρ': 'r', 'σ': 's', 'ς': 's', 'τ': 't', 'υ': 'y',
  'φ': 'f', 'χ': 'ch', 'ψ': 'ps', 'ω': 'o',
};

// ── Japanisch (Hiragana & Katakana) ──────────────────────────────
const JA_KANA = {
  'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
  'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
  'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
  'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
  'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
  'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
  'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
  'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
  'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
  'わ': 'wa', 'を': 'o', 'ん': 'n',
  'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
  'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
  'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
  'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
  'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
  'ゃ': 'ya', 'ゅ': 'yu', 'ょ': 'yo', 'っ': '·',
  'ア': 'a', 'イ': 'i', 'ウ': 'u', 'エ': 'e', 'オ': 'o',
  'カ': 'ka', 'キ': 'ki', 'ク': 'ku', 'ケ': 'ke', 'コ': 'ko',
  'サ': 'sa', 'シ': 'shi', 'ス': 'su', 'セ': 'se', 'ソ': 'so',
  'タ': 'ta', 'チ': 'chi', 'ツ': 'tsu', 'テ': 'te', 'ト': 'to',
  'ナ': 'na', 'ニ': 'ni', 'ヌ': 'nu', 'ネ': 'ne', 'ノ': 'no',
  'ハ': 'ha', 'ヒ': 'hi', 'フ': 'fu', 'ヘ': 'he', 'ホ': 'ho',
  'マ': 'ma', 'ミ': 'mi', 'ム': 'mu', 'メ': 'me', 'モ': 'mo',
  'ヤ': 'ya', 'ユ': 'yu', 'ヨ': 'yo',
  'ラ': 'ra', 'リ': 'ri', 'ル': 'ru', 'レ': 're', 'ロ': 'ro',
  'ワ': 'wa', 'ヲ': 'o', 'ン': 'n',
  'ガ': 'ga', 'ギ': 'gi', 'グ': 'gu', 'ゲ': 'ge', 'ゴ': 'go',
  'ザ': 'za', 'ジ': 'ji', 'ズ': 'zu', 'ゼ': 'ze', 'ゾ': 'zo',
  'ダ': 'da', 'ヂ': 'ji', 'ヅ': 'zu', 'デ': 'de', 'ド': 'do',
  'バ': 'ba', 'ビ': 'bi', 'ブ': 'bu', 'ベ': 'be', 'ボ': 'bo',
  'パ': 'pa', 'ピ': 'pi', 'プ': 'pu', 'ペ': 'pe', 'ポ': 'po',
  'ャ': 'ya', 'ュ': 'yu', 'ョ': 'yo', 'ッ': '·', 'ー': '–',
  'ァ': 'a', 'ィ': 'i', 'ゥ': 'u', 'ェ': 'e', 'ォ': 'o',
};

// Häufige chinesische & japanische Funktionswörter/Zeichen für Satzbau-Kacheln
const CJK_PARTICLES = {
  zh: {
    '的': 'de', '了': 'le', '吗': 'ma', '呢': 'ne', '吧': 'ba', '不': 'bù',
    '没': 'méi', '很': 'hěn', '是': 'shì', '在': 'zài', '有': 'yǒu',
    '我': 'wǒ', '你': 'nǐ', '他': 'tā', '她': 'tā', '它': 'tā', '们': 'men',
    '这': 'zhè', '那': 'nà', '个': 'gè', '和': 'hé', '也': 'yě', '都': 'dōu',
    '会': 'huì', '能': 'néng', '要': 'yào', '想': 'xiǎng', '去': 'qù',
    '来': 'lái', '说': 'shuō', '看': 'kàn', '吃': 'chī', '喝': 'hē',
    '好': 'hǎo', '大': 'dà', '小': 'xiǎo', '多': 'duō', '少': 'shǎo',
    '人': 'rén', '家': 'jiā', '水': 'shuǐ', '天': 'tiān', '年': 'nián',
    '月': 'yuè', '日': 'rì', '上': 'shàng', '下': 'xià', '里': 'lǐ',
    '一': 'yī', '二': 'èr', '三': 'sān', '四': 'sì', '五': 'wǔ',
    '六': 'liù', '七': 'qī', '八': 'bā', '九': 'jiǔ', '十': 'shí',
    '百': 'bǎi', '千': 'qiān', '万': 'wàn', '两': 'liǎng', '几': 'jǐ',
    '谁': 'shéi', '什': 'shén', '么': 'me', '哪': 'nǎ', '儿': 'ér',
    '今': 'jīn', '明': 'míng', '昨': 'zuó', '现': 'xiàn', '气': 'qì',
    '高': 'gāo', '兴': 'xìng', '到': 'dào', '给': 'gěi', '对': 'duì',
    '从': 'cóng', '向': 'xiàng', '比': 'bǐ', '被': 'bèi', '把': 'bǎ',
    '着': 'zhe', '过': 'guò', '得': 'de', '地': 'de', '还': 'hái',
    '就': 'jiù', '才': 'cái', '又': 'yòu', '再': 'zài', '太': 'tài',
    '真': 'zhēn', '最': 'zuì', '更': 'gèng', '别': 'bié', '每': 'měi',
    '各': 'gè', '只': 'zhǐ', '请': 'qǐng', '谢': 'xiè', '问': 'wèn',
  },
  ja: {
    'は': 'wa', 'が': 'ga', 'を': 'o', 'に': 'ni', 'で': 'de', 'へ': 'e',
    'と': 'to', 'も': 'mo', 'の': 'no', 'か': 'ka', 'ね': 'ne', 'よ': 'yo',
    '私': 'watashi', '僕': 'boku', '彼': 'kare', '人': 'hito', '日': 'hi',
    '年': 'toshi', '月': 'tsuki', '水': 'mizu', '今': 'ima', '何': 'nani',
    '行': 'i', '来': 'ki', '見': 'mi', '食': 'ta', '飲': 'no', '話': 'hana',
    '読': 'yo', '書': 'ka', '買': 'ka', '聞': 'ki', '手': 'te', '伝': 'tsuda',
    '大': 'oo', '小': 'chii', '新': 'atara', '古': 'furu', '高': 'taka',
    '安': 'yasu', '良': 'ii', '好': 'su', '一': 'ichi', '二': 'ni', '三': 'san',
  },
};

export function romanizeGrapheme(g, lang, prevG = '', idx = 0, nextG = '') {
  if (!g) return '';
  if (lang === 'ar') return romanizeArabicGrapheme(g, prevG, idx, nextG);
  if (lang === 'ru') {
    const lo = g.toLowerCase();
    return RU_MAP[lo] ?? '';
  }
  if (lang === 'el') {
    const base = g.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return EL_MAP[base] ?? '';
  }
  if (lang === 'ja') {
    return JA_KANA[g] ?? CJK_PARTICLES.ja[g] ?? '';
  }
  if (lang === 'zh') {
    return CJK_PARTICLES.zh[g] ?? '';
  }
  return '';
}

// Zerlegt eine Pinyin-Zeichenkette (z. B. "zǎoshang hǎo") in genau `count` Silben.
const PINYIN_SYL_RE = /(?:zh|ch|sh|[bpmfdtnlgkhjqxrzcsyw])?[aāáǎàeēéěèiīíǐìoōóǒòuūúǔùüǖǘǚǜ]+(?:ng(?![aāáǎàeēéěèiīíǐìoōóǒòuūúǔùüǖǘǚǜ])|n(?![aāáǎàeēéěèiīíǐìoōóǒòuūúǔùüǖǘǚǜg])|r(?![aāáǎàeēéěèiīíǐìoōóǒòuūúǔùüǖǘǚǜ]))?/gi;

export function splitPinyin(roman, count) {
  if (!roman) return [];
  const clean = String(roman).trim();
  const bySpace = clean.split(/[\s'-]+/).filter(Boolean);
  if (bySpace.length === count) return bySpace;
  const syllables = clean.match(PINYIN_SYL_RE) || bySpace;
  if (syllables.length === count) return syllables.map(s => s.toLowerCase());
  return syllables;
}

const STRIP_PUNCT = /^[.,!?;:„“"»«()¿¡،؛؟。、！？「」]+|[.,!?;:„“"»«()¿¡،؛؟。、！？「」]+$/g;

// Erzeugt für `renderCourseWordTiles` zu jedem Baustein in `letters`
// die passende Lautschrift-Beschriftung.
export function romanizeTiles(letters, card, lang) {
  if (!hasForeignScript(lang) || !letters?.length) return letters ? letters.map(() => '') : [];
  const roman = String(card?.roman || '').trim();
  const multi = letters.length > 1 && letters.some(l => l.length > 2 && lang !== 'ar');

  if (multi || (/\s/.test(card?.back?.trim() || '') && letters.length === card.back.trim().split(/\s+/).length)) {
    const parts = roman.split(/\s+/).filter(Boolean);
    if (parts.length === letters.length) return parts;
    return letters.map(w => romanizeWord(w, lang));
  }

  if (lang === 'zh' && roman) {
    const syls = splitPinyin(roman, letters.length);
    if (syls.length === letters.length) return syls;
  }

  if (lang === 'ja') {
    const out = letters.map(g => JA_KANA[g] || '');
    // Falls Kanji im Wort stecken: bekannte Kana-Präfixe/-Suffixe von card.roman
    // abziehen, damit das Kanji seine exakte Lesung bekommt (z. B. 食べる -> ta | be | ru).
    if (roman && out.some(x => !x)) {
      let rem = roman.toLowerCase().replace(/\s+/g, '');
      let start = 0;
      while (start < letters.length && out[start]) {
        if (rem.startsWith(out[start])) rem = rem.slice(out[start].length);
        start++;
      }
      let end = letters.length - 1;
      while (end >= start && out[end]) {
        if (rem.endsWith(out[end])) rem = rem.slice(0, rem.length - out[end].length);
        end--;
      }
      const kanjiCount = end - start + 1;
      if (kanjiCount === 1 && rem) {
        out[start] = rem;
      } else if (kanjiCount > 1 && rem) {
        const syls = splitPinyin(rem, kanjiCount);
        for (let k = 0; k < kanjiCount; k++) {
          out[start + k] = syls[k] || CJK_PARTICLES.ja[letters[start + k]] || rem;
        }
      }
    }
    return out;
  }

  return letters.map((g, i) => romanizeGrapheme(g, lang, letters[i - 1] || '', i, letters[i + 1] || ''));
}

// Pro Kartenliste vorberechneter Nachschlage-Index (Wort + Einzelzeichen -> Lautschrift).
const deckLookupCache = new WeakMap();

function getDeckLookup(cards, lang) {
  if (!cards || typeof cards !== 'object') return null;
  let cached = deckLookupCache.get(cards);
  if (cached) return cached;
  const wordMap = new Map();
  const charMap = new Map();
  for (const c of cards) {
    if (!c?.back || !c?.roman) continue;
    const cb = c.back.replace(STRIP_PUNCT, '').trim();
    if (!cb) continue;
    wordMap.set(cb, c.roman);
    if (lang === 'ar') wordMap.set(arabicBase(cb), c.roman);
    if (lang === 'zh' || lang === 'ja') {
      const chars = splitGraphemes(cb);
      const rTiles = romanizeTiles(chars, c, lang);
      chars.forEach((ch, idx) => {
        if (rTiles[idx] && !charMap.has(ch)) charMap.set(ch, rTiles[idx]);
      });
    }
  }
  cached = { wordMap, charMap };
  deckLookupCache.set(cards, cached);
  return cached;
}

// Transliteriert ein ganzes Wort oder Satz-Token (für Satzbau & Dialoge).
export function romanizeWord(word, lang, knownCards = []) {
  if (!word || !hasForeignScript(lang)) return '';
  const clean = String(word).replace(STRIP_PUNCT, '').trim();
  if (!clean) return '';

  const lookup = getDeckLookup(knownCards, lang);
  if (lookup) {
    if (lookup.wordMap.has(clean)) return lookup.wordMap.get(clean);
    if (lang === 'ar' && lookup.wordMap.has(arabicBase(clean))) {
      return lookup.wordMap.get(arabicBase(clean));
    }
  }

  if (lang === 'zh') {
    return CJK_PARTICLES.zh[clean] || lookup?.charMap.get(clean) || '';
  }

  if (lang === 'ja') {
    if (JA_KANA[clean]) return JA_KANA[clean];
    if (lookup?.charMap.has(clean)) return lookup.charMap.get(clean);
    if (CJK_PARTICLES.ja[clean]) return CJK_PARTICLES.ja[clean];
    const gs = splitGraphemes(clean);
    const parts = gs.map(g => JA_KANA[g] || lookup?.charMap.get(g) || CJK_PARTICLES.ja[g] || '');
    return parts.filter(Boolean).join('');
  }

  // Alphabetische Schriften (Arabisch, Russisch, Griechisch): aus Graphemen zusammensetzen
  const gs = splitGraphemes(clean);
  const raw = gs.map((g, i) => romanizeGrapheme(g, lang, gs[i - 1] || '', i, gs[i + 1] || '')).join('');
  return raw
    .replace(/aā/g, 'ā')
    .replace(/uū/g, 'ū')
    .replace(/iī/g, 'ī')
    .replace(/–/g, '');
}

export function romanizeSentenceTokens(tokens, lang, knownCards = [], currentCard = null) {
  if (!hasForeignScript(lang) || !tokens?.length) return tokens ? tokens.map(() => '') : [];
  const lookup = getDeckLookup(knownCards, lang);
  if (lang === 'zh' || lang === 'ja') {
    const joined = tokens.join('');
    const overrides = new Array(tokens.length).fill('');
    const scanList = currentCard ? [currentCard, ...(knownCards || [])] : (knownCards || []);
    for (const c of scanList) {
      if (!c?.back || !c?.roman) continue;
      const cb = c.back.replace(STRIP_PUNCT, '').trim();
      if (!cb || cb.length < 2) continue;
      let from = 0;
      while (from <= joined.length - cb.length) {
        const at = joined.indexOf(cb, from);
        if (at < 0) break;
        const chars = splitGraphemes(cb);
        const rTiles = romanizeTiles(chars, c, lang);
        for (let k = 0; k < chars.length && at + k < overrides.length; k++) {
          if (rTiles[k] && !overrides[at + k]) overrides[at + k] = rTiles[k];
        }
        from = at + cb.length;
      }
    }
    return tokens.map((t, i) => overrides[i] || (currentCard?.back === t ? currentCard.roman : '') || romanizeWord(t, lang, knownCards));
  }
  return tokens.map(t => {
    const clean = String(t).replace(STRIP_PUNCT, '').trim();
    if (currentCard?.back && currentCard.back.replace(STRIP_PUNCT, '').trim() === clean && currentCard.roman) {
      return currentCard.roman;
    }
    if (lookup?.wordMap.has(clean)) return lookup.wordMap.get(clean);
    return romanizeWord(t, lang, knownCards);
  });
}
