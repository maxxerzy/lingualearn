# -*- coding: utf-8 -*-
"""
Build and validate scripts/data_pl_batch5.json
"""
import json
import os
import sys

from polish_ipa import polish_ipa
from batch5_part_a import PART_A
from batch5_part_b import PART_B
from batch5_part_c import PART_C
from batch5_part_d import PART_D
from batch5_part_e import PART_E

def main():
    ref_file = "scripts/ref_pl_batch5.json"
    out_file = "scripts/data_pl_batch5.json"

    with open(ref_file, "r", encoding="utf-8") as f:
        ref_items = json.load(f)

    if len(ref_items) != 250:
        raise ValueError(f"Expected 250 items in {ref_file}, got {len(ref_items)}")

    all_parts = PART_A + PART_B + PART_C + PART_D + PART_E
    if len(all_parts) != 250:
        raise ValueError(f"Expected 250 translated items, got {len(all_parts)}")

    parts_by_index = {item["index"]: item for item in all_parts}

    cards = []
    for i, ref in enumerate(ref_items):
        idx = ref.get("index", 1000 + i)
        if idx not in parts_by_index:
            raise ValueError(f"Missing translation for index {idx}")

        trans = parts_by_index[idx]
        front = ref["front"].strip()
        exampleDE = ref["exampleDE"].strip()
        back = trans["back"].strip()
        example = trans["example"].strip()

        # Compute IPA
        ipa = polish_ipa(back).strip()
        if ipa.startswith("/") and ipa.endswith("/"):
            ipa = ipa[1:-1].strip()

        if not front:
            raise ValueError(f"Empty front at index {idx}")
        if not back:
            raise ValueError(f"Empty back at index {idx}")
        if not ipa:
            raise ValueError(f"Empty ipa at index {idx}")
        if not example:
            raise ValueError(f"Empty example at index {idx}")
        if not exampleDE:
            raise ValueError(f"Empty exampleDE at index {idx}")

        card = {
            "front": front,
            "back": back,
            "ipa": ipa,
            "example": example,
            "exampleDE": exampleDE
        }
        cards.append(card)

    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(cards, f, ensure_ascii=False, indent=2)
        f.write("\n")

    print(f"Successfully generated {out_file} with {len(cards)} cards.")

    # Validation
    with open(out_file, "r", encoding="utf-8") as f:
        loaded = json.load(f)

    assert isinstance(loaded, list), "Output is not a JSON list"
    assert len(loaded) == 250, f"Expected 250 cards, got {len(loaded)}"

    for idx, card in enumerate(loaded):
        for field in ["front", "back", "ipa", "example", "exampleDE"]:
            assert field in card, f"Card #{idx} missing field {field}"
            val = card[field]
            assert isinstance(val, str), f"Card #{idx} {field} is not a string"
            assert val.strip(), f"Card #{idx} {field} is empty"
        assert not card["ipa"].startswith("/"), f"Card #{idx} IPA starts with /"
        assert not card["ipa"].endswith("/"), f"Card #{idx} IPA ends with /"

    print("All 250 cards passed strict validation!")

if __name__ == "__main__":
    main()
