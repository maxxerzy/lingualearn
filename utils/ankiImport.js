// utils/ankiImport.js
// Universeller Importer für externe Sprach-Decks:
// 1. Anki .apkg (ZIP-Container mit SQLite-Notizenfeld-Separator \x1f)
// 2. CSV / TSV / TXT (Anki-Text-Export, Quizlet, Excel, Google Sheets)
// 3. LinguaLearn JSON-Decks

// Entfernt HTML-Tags und bereinigt Sonderzeichen
export function stripHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/p>/gi, ' ')
    .replace(/<\/div>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// Erkennt anhand von Zeichen die Zielsprache eines Decks
export function detectLanguageFromCards(cards) {
  if (!cards || !cards.length) return 'da';
  const sample = cards.slice(0, 30).map(c => `${c.back || ''} ${c.front || ''}`).join(' ');

  // Nicht-lateinische Schriften (eindeutig):
  // Arabisch
  if (/[\u0600-\u06FF]/.test(sample)) return 'ar';
  // Chinesisch
  if (/[\u4E00-\u9FFF]/.test(sample) && !/[\u3040-\u309F\u30A0-\u30FF]/.test(sample)) return 'zh';
  // Japanisch
  if (/[\u3040-\u309F\u30A0-\u30FF]/.test(sample)) return 'ja';
  // Kyrillisch / Russisch
  if (/[\u0400-\u04FF]/.test(sample)) return 'ru';
  // Griechisch
  if (/[\u0370-\u03FF]/.test(sample)) return 'el';

  // Eindeutige Sonderzeichen:
  // Portugiesisch: ã, õ
  if (/[ãõ]/i.test(sample)) return 'pt';
  // Spanisch: ñ, ¿, ¡
  if (/[¿¡ñ]/i.test(sample)) return 'es';
  // Dänisch: æ, ø, å
  if (/[æøå]/i.test(sample)) return 'da';
  // Polnisch: ą, ć, ę, ł, ń, ś, ź, ż
  if (/[ąćęłńśźż]/i.test(sample)) return 'pl';
  // Französisch: œ
  if (/[œ]/i.test(sample)) return 'fr';

  // Akzente & typische Funktionswörter:
  // Polnisch
  if (/\b(i|w|z|na|do|nie|się|jest|to|jak|ale|tak|dla|od|po|co|ze|za|bardzo|dzień|proszę|dziękuję)\b/i.test(sample)) return 'pl';
  // Spanisch
  if (/[áéíóú]/.test(sample) || /\b(el|la|los|las|un|una|del|al|es|con|por|para|en|hola|adiós|gracias|cielo|sol|mar)\b/i.test(sample)) return 'es';
  // Französisch
  if (/[èéêëàâùûîïç]/.test(sample) || /\b(le|la|les|un|une|du|des|est|avec|dans|pour|merci|bonjour)\b/i.test(sample)) return 'fr';
  // Portugiesisch
  if (/[çáéíóúâêô]/.test(sample) || /\b(o|os|as|um|uma|do|da|dos|das|no|na|com|para|obrigado)\b/i.test(sample)) return 'pt';
  // Dänisch
  if (/\b(og|en|et|den|det|de|er|i|på|til|med|ikke|tak|hej)\b/i.test(sample)) return 'da';

  return 'da';
}

// Parst CSV-, TSV- oder TXT-Dateien (z. B. aus Anki exportiert)
export function parseDelimitedText(text, defaultName = 'Importiertes Deck') {
  if (!text || typeof text !== 'string') return null;

  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l && !l.startsWith('#'));
  if (!lines.length) return null;

  // Trennzeichen ermitteln: Tab, Semikolon oder Komma
  let sep = '\t';
  const sampleLines = lines.slice(0, 10);
  const tabCount = sampleLines.reduce((acc, l) => acc + (l.split('\t').length - 1), 0);
  const semiCount = sampleLines.reduce((acc, l) => acc + (l.split(';').length - 1), 0);
  const commaCount = sampleLines.reduce((acc, l) => acc + (l.split(',').length - 1), 0);

  if (tabCount >= semiCount && tabCount >= commaCount && tabCount > 0) {
    sep = '\t';
  } else if (semiCount >= commaCount && semiCount > 0) {
    sep = ';';
  } else if (commaCount > 0) {
    sep = ',';
  }

  const cards = [];
  for (const line of lines) {
    const parts = line.split(sep).map(p => stripHtml(p));
    if (parts.length >= 2) {
      const front = parts[0];
      const back = parts[1];
      if (front && back) {
        const card = { front, back };
        if (parts[2]) {
          // Optionales drittes Feld: Beispiel oder Umschrift
          if (parts[2].length > 25 || parts[2].includes(' ')) card.example = parts[2];
          else card.roman = parts[2];
        }
        cards.push(card);
      }
    }
  }

  if (!cards.length) return null;

  const language = detectLanguageFromCards(cards);
  return {
    name: defaultName,
    language,
    count: cards.length,
    cards,
  };
}

// Extrahiert Anki-Notizen aus binären SQLite/Anki-Daten (\x1f separierte Felder)
export function extractAnkiFieldsFromBinary(buffer) {
  const bytes = new Uint8Array(buffer);
  const text = new TextDecoder('utf-8', { fatal: false }).decode(bytes);
  const cards = [];

  // Anki-Tabellen trennen die Notizenfelder durch ASCII Unit Separator (\x1f, 0x1F)
  // Ein Datensatz hat typischerweise: Feld0\x1fFeld1\x1f...
  const records = text.split(/\u001f/);
  for (let i = 0; i < records.length - 1; i += 2) {
    const rawFront = records[i];
    const rawBack = records[i + 1];

    const front = stripHtml(rawFront);
    const back = stripHtml(rawBack);

    // Plausibilitätsprüfungen für gültige Kartentexte
    if (front && back &&
        front.length >= 1 && front.length <= 150 &&
        back.length >= 1 && back.length <= 150 &&
        !front.includes('sqlite_') && !back.includes('sqlite_') &&
        !front.startsWith('CREATE TABLE') && !back.startsWith('CREATE TABLE')) {
      cards.push({ front, back });
    }
  }

  // Deduplizieren nach front
  const seen = new Set();
  const deduped = [];
  for (const c of cards) {
    if (!seen.has(c.front)) {
      seen.add(c.front);
      deduped.push(c);
    }
  }

  return deduped;
}

// Parst Anki .apkg (ZIP-Datei)
export async function parseApkgBuffer(buffer, deckName = 'Anki Deck') {
  const view = new DataView(buffer);
  const uint8 = new Uint8Array(buffer);
  let pos = 0;
  let ankiDbBuffer = null;

  // Durchsuche ZIP-Local-File-Headers (Signatur 0x04034b50)
  while (pos + 30 <= buffer.byteLength) {
    if (view.getUint32(pos, true) === 0x04034b50) {
      const compMethod = view.getUint16(pos + 8, true);
      const compSize = view.getUint32(pos + 18, true);
      const uncompSize = view.getUint32(pos + 22, true);
      const nameLen = view.getUint16(pos + 26, true);
      const extraLen = view.getUint16(pos + 28, true);

      const nameBytes = uint8.subarray(pos + 30, pos + 30 + nameLen);
      const fileName = new TextDecoder().decode(nameBytes);
      const dataOffset = pos + 30 + nameLen + extraLen;

      if (fileName === 'collection.anki2' || fileName === 'collection.anki21') {
        const compressedData = uint8.subarray(dataOffset, dataOffset + compSize);

        if (compMethod === 0) {
          // Unkomprimiert
          ankiDbBuffer = compressedData.buffer.slice(compressedData.byteOffset, compressedData.byteOffset + compSize);
          break;
        } else if (compMethod === 8) {
          // Deflate-Komprimierung: Native DecompressionStream API nutzen
          if (typeof DecompressionStream !== 'undefined') {
            try {
              const stream = new Response(compressedData).body.pipeThrough(new DecompressionStream('deflate-raw'));
              const decompressed = await new Response(stream).arrayBuffer();
              ankiDbBuffer = decompressed;
              break;
            } catch {
              /* Fallback auf direkte Rohbytes */
            }
          }
        }
      }

      pos = dataOffset + compSize;
    } else {
      pos++;
    }
  }

  // Falls keine SQLite-Datei extrahiert werden konnte, den gesamten Buffer scannen
  const dataToScan = ankiDbBuffer || buffer;
  const cards = extractAnkiFieldsFromBinary(dataToScan);

  if (!cards.length) {
    throw new Error('Keine gültigen Karteikarten im .apkg-Archiv gefunden.');
  }

  const cleanName = deckName.replace(/\.apkg$/i, '').trim();
  const language = detectLanguageFromCards(cards);

  return {
    name: cleanName || 'Importiertes Anki-Deck',
    language,
    count: cards.length,
    cards,
  };
}

// Universeller Einstiegspunkt: Liest beliebige Dateien (apkg, csv, tsv, txt, json)
export async function parseDeckFile(file) {
  if (!file) throw new Error('Keine Datei übergeben.');
  const name = file.name || 'Importiertes Deck';
  const ext = name.split('.').pop()?.toLowerCase();

  if (ext === 'apkg') {
    const buffer = await file.arrayBuffer();
    return await parseApkgBuffer(buffer, name);
  }

  const text = await file.text();

  if (ext === 'json') {
    const json = JSON.parse(text);
    if (!json.cards || !Array.isArray(json.cards) || json.cards.length === 0) {
      throw new Error('Ungültiges Deck-Format: JSON muss ein Array „cards" enthalten.');
    }
    return {
      name: json.name || name.replace(/\.json$/i, ''),
      language: json.language || detectLanguageFromCards(json.cards),
      count: json.cards.length,
      cards: json.cards,
    };
  }

  // CSV, TSV oder TXT
  const parsed = parseDelimitedText(text, name.replace(/\.[^.]+$/, ''));
  if (!parsed || !parsed.cards.length) {
    throw new Error('Konnte keine Vokabelpaare in der Datei erkennen (Trennzeichen: Tab, Semikolon oder Komma).');
  }
  return parsed;
}
