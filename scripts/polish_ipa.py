# -*- coding: utf-8 -*-
"""
Standard Polish IPA Transcriber for LinguaLearn
Produces high-quality IPA transcriptions without enclosing slashes.
"""
import re

VOWELS = set("aeiouyąęó")

VOICELESS = {"p", "t", "k", "f", "s", "ʂ", "ɕ", "t͡s", "t͡ʂ", "t͡ɕ", "x"}
VOICED_TO_VOICELESS = {
    "b": "p", "d": "t", "ɡ": "k", "v": "f", "z": "s",
    "ʐ": "ʂ", "ʑ": "ɕ", "d͡z": "t͡s", "d͡ʐ": "t͡ʂ", "d͡ʑ": "t͡ɕ"
}

def to_ipa_word(raw):
    w = raw.strip().lower()
    w = re.sub(r"[^\wąćęłńóśźż]", "", w)
    if not w:
        return ""

    # Palatal combinations with i + vowel
    # e.g. ci, dzi, si, zi, ni before vowel
    # also bi, pi, wi, fi, mi, ki, gi before vowel
    tokens = []
    i = 0
    n = len(w)

    while i < n:
        # Check 3-letter combinations
        c3 = w[i:i+3]
        c2 = w[i:i+2]
        c1 = w[i]
        next1 = w[i+1] if i+1 < n else ""
        next2 = w[i+2] if i+2 < n else ""
        next3 = w[i+3] if i+3 < n else ""

        # dzi + vowel
        if c3 == "dzi":
            if next3 in VOWELS:
                tokens.append("d͡ʑ")
                i += 3
                continue
            else:
                tokens.append("d͡ʑ")
                tokens.append("i")
                i += 3
                continue
        # dż
        if c2 == "dż":
            tokens.append("d͡ʐ")
            i += 2
            continue
        # dź
        if c2 == "dź":
            tokens.append("d͡ʑ")
            i += 2
            continue
        # dz
        if c2 == "dz":
            tokens.append("d͡z")
            i += 2
            continue
        # cz
        if c2 == "cz":
            tokens.append("t͡ʂ")
            i += 2
            continue
        # sz
        if c2 == "sz":
            tokens.append("ʂ")
            i += 2
            continue
        # rz
        if c2 == "rz":
            # Devoicing after voiceless consonant
            prev = tokens[-1] if tokens else ""
            if prev in VOICELESS:
                tokens.append("ʂ")
            else:
                tokens.append("ʐ")
            i += 2
            continue
        # ch
        if c2 == "ch":
            tokens.append("x")
            i += 2
            continue
        # ci + vowel
        if c2 == "ci":
            if next2 in VOWELS:
                tokens.append("t͡ɕ")
                i += 2
                continue
            else:
                tokens.append("t͡ɕ")
                tokens.append("i")
                i += 2
                continue
        # si + vowel
        if c2 == "si":
            if next2 in VOWELS:
                tokens.append("ɕ")
                i += 2
                continue
            else:
                tokens.append("ɕ")
                tokens.append("i")
                i += 2
                continue
        # zi + vowel
        if c2 == "zi":
            if next2 in VOWELS:
                tokens.append("ʑ")
                i += 2
                continue
            else:
                tokens.append("ʑ")
                tokens.append("i")
                i += 2
                continue
        # ni + vowel
        if c2 == "ni":
            if next2 in VOWELS:
                tokens.append("ɲ")
                i += 2
                continue
            else:
                tokens.append("ɲ")
                tokens.append("i")
                i += 2
                continue
        # bi, pi, wi, fi, mi, ki, gi + vowel
        if c1 in "bpwfmkg" and next1 == "i":
            ipa_map = {"b": "bʲ", "p": "pʲ", "w": "vʲ", "f": "fʲ", "m": "mʲ", "k": "kʲ", "g": "ɡʲ"}
            if next2 in VOWELS:
                tokens.append(ipa_map[c1])
                i += 2
                continue
            else:
                tokens.append(ipa_map[c1])
                tokens.append("i")
                i += 2
                continue

        # Single characters
        if c1 == "ą":
            # Before stops/affricates
            if next1 and next1 in "pb":
                tokens.append("ɔm")
            elif next1 and (next1 in "tdc" or c2 in ["dz", "cz", "dż"]):
                tokens.append("ɔn")
            elif next1 and (next1 in "ć" or c2 in ["dź", "ci", "dzi"]):
                tokens.append("ɔɲ")
            elif next1 and next1 in "kg":
                tokens.append("ɔŋ")
            else:
                tokens.append("ɔw̃")
            i += 1
            continue

        if c1 == "ę":
            if i == n - 1 or not next1: # word final
                tokens.append("ɛ")
            elif next1 in "pb":
                tokens.append("ɛm")
            elif next1 in "tdc" or c2 in ["dz", "cz", "dż"]:
                tokens.append("ɛn")
            elif next1 in "ć" or c2 in ["dź", "ci", "dzi"]:
                tokens.append("ɛɲ")
            elif next1 in "kg":
                tokens.append("ɛŋ")
            else:
                tokens.append("ɛw̃")
            i += 1
            continue

        singles = {
            "a": "a", "e": "ɛ", "i": "i", "o": "ɔ", "u": "u", "ó": "u", "y": "ɨ",
            "b": "b", "c": "t͡s", "ć": "t͡ɕ", "d": "d", "f": "f", "g": "ɡ", "h": "x",
            "j": "j", "k": "k", "l": "l", "ł": "w", "m": "m", "n": "n", "ń": "ɲ",
            "p": "p", "r": "r", "s": "s", "ś": "ɕ", "t": "t", "w": "v", "z": "z",
            "ź": "ʑ", "ż": "ʐ"
        }
        tokens.append(singles.get(c1, c1))
        i += 1

    # Final devoicing: last token if voiced consonant
    if tokens:
        last = tokens[-1]
        if last in VOICED_TO_VOICELESS:
            tokens[-1] = VOICED_TO_VOICELESS[last]

    # Regressive assimilation before voiceless consonants
    for j in range(len(tokens) - 2, -1, -1):
        curr = tokens[j]
        nxt = tokens[j+1]
        if nxt in VOICELESS and curr in VOICED_TO_VOICELESS:
            tokens[j] = VOICED_TO_VOICELESS[curr]

    # Penultimate stress
    # Identify syllable peaks (vowels: a, ɛ, i, ɔ, u, ɨ, or sequences containing them)
    # Count vowels in tokens
    vowel_token_indices = []
    vowel_ipa = {"a", "ɛ", "i", "ɔ", "u", "ɨ", "ɔw̃", "ɛw̃", "ɔm", "ɔn", "ɔɲ", "ɔŋ", "ɛm", "ɛn", "ɛɲ", "ɛŋ"}
    for idx, t in enumerate(tokens):
        if any(v in t for v in ["a", "ɛ", "i", "ɔ", "u", "ɨ"]):
            vowel_token_indices.append(idx)

    if len(vowel_token_indices) >= 2:
        penult_vowel_idx = vowel_token_indices[-2]
        # Insert stress before the onset of this syllable
        # The onset starts after the previous vowel
        onset_idx = vowel_token_indices[-3] + 1 if len(vowel_token_indices) >= 3 else 0
        tokens.insert(onset_idx, "ˈ")
    elif len(vowel_token_indices) == 1:
        # Monosyllable: often unstressed or stress at start
        pass

    return "".join(tokens)

def polish_ipa(text):
    words = text.strip().split()
    return " ".join(to_ipa_word(w) for w in words if w)

if __name__ == "__main__":
    test_words = [
        ("dzień", "d͡ʑɛɲ"),
        ("dobry", "ˈdɔbrɨ"),
        ("witaj", "ˈvitaj"),
        ("przepraszam", "pʂɛˈpraʂam"),
        ("jabłko", "ˈjapwkɔ"),
        ("chleb", "xlɛp"),
        ("woda", "ˈvɔda"),
        ("książka", "ˈkɕɔw̃ʂka"),
        ("dziękuję", "d͡ʑɛŋˈkujɛ"),
        ("pociąg", "ˈpɔt͡ɕɔŋk"),
        ("cześć", "t͡ʂɛɕt͡ɕ"),
        ("samochód", "saˈmɔxut"),
        ("herbata", "xɛrˈbata")
    ]
    for w, expected in test_words:
        out = polish_ipa(w)
        print(f"{w:12} -> {out:18} (approx: {expected})")
