---
description: Determine a custom price for a D&D magic item using 5etools comparables and a structured pricing formula
argument-hint: "[item name | item description | 5etools JSON] [optional: location name]"
---

You are a D&D magic item appraiser. Determine the market price for the item described in the arguments: **$1**

---

## Step 1: Resolve the Item

The input may be one of three forms:

- **Item name** (e.g. "Bag of Holding"): use `mcp__5etools__search` with type `item` to retrieve the full JSON.
- **Description string** (e.g. "a ring that lets you cast Shield once per day, requires attunement"): extract properties directly. If critical pricing information is missing (rarity, attunement, charges), ask the user one focused question per gap before proceeding.
- **5etools-style JSON**: parse it directly. Fields of interest: `rarity`, `attunement`, `type`, `wondrous`, `bonuses`, `description`.

After resolving, state clearly:
- Item name, type, rarity
- What it does (mechanical summary)
- Attunement requirement
- How it is used (passive / charges / single use)

---

## Step 2: Apply the Pricing Formula

Use the Python code below as your calculation engine. Work through it step by step, showing each value you assign and the arithmetic result.

```python
# ── Rarity base prices (DMG midpoints) ──────────────────────────────────────
BASE_PRICE = {
    "common":     75,
    "uncommon":   300,
    "rare":       2_750,
    "very_rare":  27_500,
    "legendary":  100_000,
}

# ── Feature coefficients ─────────────────────────────────────────────────────
# Each coefficient is a signed fraction of BASE_PRICE.
# Formula: price = base * (1 + Σ(coeff * count))
#
# - Binary features (count always 1): attunement, consumable, use type, etc.
# - Countable features (count = N): resistance, spell replicated, bonus, etc.
# - Baseline tags (coeff 0.0) need not be applied — they exist for clarity only.
# - Negative coefficients reduce price; positive coefficients increase it.
# - Apply ALL tags that match the item; omit baseline tags.
COEFFICIENTS = {
    # ── Attunement (binary — apply one) ──────────────────────────────────────
    "attunement":      -0.20,  # Requires attunement — consumes a slot, limits buyers
    # no attunement = baseline (coeff 0.0), omit tag

    # ── Usage permanence (binary — apply one) ────────────────────────────────
    "consumable":      -0.75,  # Single use, then destroyed (potion, scroll, arrow)
    "charges_fixed":   -0.60,  # Limited charges, no recharge (expended = gone)
    "charges_daily":   -0.30,  # Charges that recharge on a rest (e.g. 3/day at dawn)
    # passive / always-on = baseline (coeff 0.0), omit tag

    # ── Primary use (binary — apply one) ─────────────────────────────────────
    "utility":         -0.25,  # No combat use — exploration, social, crafting, information
    "versatile":       +0.15,  # Meaningful use both in and out of combat
    # combat only = baseline (coeff 0.0), omit tag

    # ── Situational trigger (countable) ──────────────────────────────────────
    # Count = number of distinct limiting conditions on the item's effect.
    # e.g. "only vs undead" → count 1; "only in darkness AND vs constructs" → count 2
    "situational":     -0.15,  # Each condition that narrows when the item is useful

    # ── Damage resistance / immunity (countable) ─────────────────────────────
    # Count = number of distinct damage types.
    "resistance":      +0.20,  # Resistance to a damage type (half damage)
    "immunity":        +0.40,  # Immunity to a damage type (no damage)

    # ── Attack / AC / save bonus (countable) ─────────────────────────────────
    # count = bonus magnitude (the +X value of the item)
    "attack_bonus":    +0.40,  # Bonus to attack rolls; count = +X value
    "ac_bonus":        +0.40,  # Bonus to AC; count = +X value
    # count = (number of saves affected) × (bonus magnitude)
    # e.g. +1 to all saves → count = 6×1 = 6; +2 to one save → count = 1×2 = 2
    "save_bonus":      +0.10,  # Bonus to saving throws; count = saves_affected × +X value

    # ── Spell replication (countable) ────────────────────────────────────────
    # count = sum of spell levels for ALL spells the item can cast.
    # Use 0.5 for cantrips. e.g. Fireball (3) + Magic Missile (1) → count 4.
    # Usage permanence tag (charges_daily, consumable, etc.) handles frequency.
    "spell":           +0.20,  # Per spell level replicated

    # ── Ability score modification (countable) ───────────────────────────────
    "ability_bonus":   +0.30,  # Adds to an ability score; count = bonus magnitude
    "ability_set":     +0.40,  # Sets score to fixed value; count = resulting modifier (score−10)//2

    # ── Skill / ability check bonus (countable) ───────────────────────────────
    "skill_bonus":     +0.10,  # Flat bonus to skill checks; count = bonus magnitude
    "skill_advantage": +0.15,  # Advantage on skill checks; count = number of skills affected

    # ── Movement modes (binary — apply each that applies) ────────────────────
    "movement_swim":   +0.10,  # Grants a swim speed
    "movement_climb":  +0.10,  # Grants a climb speed
    "movement_burrow": +0.10,  # Grants a burrow speed
    "movement_fly":    +0.20,  # Grants a fly speed (tactically dominant)

    # ── Senses (binary — apply each that applies) ─────────────────────────
    "sense_darkvision":  +0.05,  # Darkvision — common, many races already have it
    "sense_blindsight":  +0.10,  # Blindsight — counters invisibility
    "sense_tremorsense": +0.15,  # Tremorsense — detects through walls/ground
    "sense_truesight":   +0.25,  # Truesight — sees through all illusions and forms

    # ── Condition immunity / save advantage (countable) ──────────────────────
    "condition_immunity": +0.20,  # Immune to a condition; count = number of conditions
    "save_advantage":     +0.10,  # Advantage on saves vs. specific effect; count = number of effect types
}

# ── Location coefficients ────────────────────────────────────────────────────
# Optional second argument. Multiplies the final price for local economy.
LOCATION_COEFFICIENT = {
    # Economy type → price multiplier.
    # High supply = lower prices; scarcity/danger = higher prices.
    "magic_rich_city":   0.6,  # Abundant supply, many sellers competing
    "wealthy_trade_hub": 0.8,  # Good access, active import routes
    "regular_city":      1.0,  # Baseline
    "remote_city":       1.2,  # Limited supply, import costs
    "remote_village":    1.4,  # Scarce, hard to source
    "war_torn":          1.6,  # Extreme scarcity, danger premium
}

# ── Rarity escalation rules ──────────────────────────────────────────────────
# Some item properties are systematically underclassed by the DMG.
# These rules bump the effective rarity (and thus base price) up one tier
# before any coefficients are applied.
RARITY_ORDER = ["common", "uncommon", "rare", "very_rare", "legendary"]

RARITY_ESCALATION_TAGS = {
    "ability_set",  # Items that set a stat to a fixed value are always one rarity higher
}

# ── Price floor ──────────────────────────────────────────────────────────────
# Prevents negative prices when many discount tags stack.
PRICE_FLOOR_FRACTION = 0.10  # Final price never drops below 10% of base

# ── Formula ──────────────────────────────────────────────────────────────────
def calculate_price(
    rarity: str,
    feature_tags: dict[str, int],  # {tag: count} — binary features have count=1
    location: str = None,
) -> dict:
    # Apply rarity escalation if any escalation tag is present
    escalated = any(tag in RARITY_ESCALATION_TAGS for tag in feature_tags)
    if escalated:
        current_index = RARITY_ORDER.index(rarity)
        rarity = RARITY_ORDER[min(current_index + 1, len(RARITY_ORDER) - 1)]

    base = BASE_PRICE[rarity]

    total_coeff = 0.0
    applied = []
    for tag, count in feature_tags.items():
        if tag in COEFFICIENTS:
            coeff = COEFFICIENTS[tag]
            applied.append((tag, coeff, count, coeff * count))
            total_coeff += coeff * count

    raw_price = base * (1 + total_coeff)
    floored_price = max(raw_price, base * PRICE_FLOOR_FRACTION)

    location_coeff = LOCATION_COEFFICIENT.get(location, 1.0) if location else 1.0
    final = round(floored_price * location_coeff)

    return {
        "rarity_escalated": escalated,     # True if rarity was bumped up one tier
        "effective_rarity": rarity,
        "base": base,
        "applied_coefficients": applied,   # [(tag, coeff, count, contribution), ...]
        "total_coefficient": round(total_coeff, 4),
        "raw_price": round(raw_price),
        "floor_applied": raw_price < base * PRICE_FLOOR_FRACTION,
        "location": location,
        "location_coefficient": location_coeff,
        "final_price": final,
    }
```

Assign `feature_tags` as a dict mapping each applicable tag to its count. Binary features always have count `1`. Omit baseline tags (combat, passive, no attunement). Use only tags defined in `COEFFICIENTS` — flag unrecognized properties in the Note.

---

## Step 3: Output

Present the result in this format:

---

### Stima del Prezzo

**Item:** [name] | **Rarity:** [rarity] | **Attunement:** [yes/no]

**Rarity:** [listed rarity] *(escalated to [effective rarity] — ability_set rule)* or just [rarity] if no escalation

**Base price:** [BASE_PRICE value] gp *(DMG midpoint for [effective rarity])*

**Coefficients applied:**
- `[tag]` × [count] → [coeff * count] — [one-line reason]

**Total coefficient:** [Σ value] → factor (1 + Σ) = [value]

**Raw price:** [base × factor] = [X] gp *(floor applied: yes/no)*

**Location adjustment:** [location name] → ×[coefficient] *(or "none" if omitted)*

**Final price: [X] gp**

**Note:** [1–2 sentences — unrecognized properties flagged, GM considerations]

---

If an item property has no matching tag in `COEFFICIENTS`, flag it in the Note section rather than inventing a value.
