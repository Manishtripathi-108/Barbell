/**
 * Canonical muscle catalog — the single source of truth for every muscle
 * the anatomy viewer knows about.
 *
 * Rules:
 * - Every unique muscle appears exactly once.
 * - `MuscleId` and `MuscleGroupId` are derived from this object.
 * - Group membership is derived, never maintained separately.
 * - SVG membership (anterior / posterior) is tracked separately.
 */

export const MUSCLES = {
    /* --------------------------------- Neck --------------------------------- */
    sternocleidomastoid: { name: 'Sternocleidomastoid', group: 'neck' },
    'anterior-scalene': { name: 'Anterior Scalene', group: 'neck' },
    'middle-scalene': { name: 'Middle Scalene', group: 'neck' },
    sternohyoid: { name: 'Sternohyoid', group: 'neck' },
    omohyoid: { name: 'Omohyoid', group: 'neck' },
    'splenius-capitis': { name: 'Splenius Capitis', group: 'neck' },

    /* -------------------------------- Traps -------------------------------- */
    'upper-traps': { name: 'Upper Traps', group: 'traps' },
    'middle-traps': { name: 'Middle Traps', group: 'traps' },
    'lower-traps': { name: 'Lower Traps', group: 'traps' },

    /* ------------------------------ Shoulders ------------------------------ */
    'front-deltoid': { name: 'Front Deltoid', group: 'shoulders' },
    'middle-deltoid': { name: 'Middle Deltoid', group: 'shoulders' },
    'back-deltoid': { name: 'Back Deltoid', group: 'shoulders' },

    /* -------------------------------- Chest -------------------------------- */
    'upper-chest': { name: 'Upper Chest', group: 'chest' },
    'middle-chest': { name: 'Middle Chest', group: 'chest' },
    'lower-chest': { name: 'Lower Chest', group: 'chest' },

    /* ------------------------------- Biceps -------------------------------- */
    'biceps-brachii': { name: 'Biceps Brachii', group: 'biceps' },
    brachialis: { name: 'Brachialis', group: 'biceps' },

    /* ------------------------------ Triceps -------------------------------- */
    'triceps-brachii': { name: 'Triceps Brachii', group: 'triceps' },

    /* ------------------------------ Forearms ------------------------------- */
    brachioradialis: { name: 'Brachioradialis', group: 'forearms' },
    'palmaris-longus': { name: 'Palmaris Longus', group: 'forearms' },
    'pronator-teres': { name: 'Pronator Teres', group: 'forearms' },
    'flexor-carpi-radialis': { name: 'Flexor Carpi Radialis', group: 'forearms' },
    'flexor-carpi-ulnaris': { name: 'Flexor Carpi Ulnaris', group: 'forearms' },
    'flexor-digitorum-superficialis': { name: 'Flexor Digitorum Superficialis', group: 'forearms' },
    'extensor-carpi-radialis-longus': { name: 'Extensor Carpi Radialis Longus', group: 'forearms' },
    'abductor-longus-pollicis': { name: 'Abductor Longus Pollicis', group: 'forearms' },
    'extensor-digitorum': { name: 'Extensor Digitorum', group: 'forearms' },
    'extensor-digiti-minimi': { name: 'Extensor Digiti Minimi', group: 'forearms' },
    'extensor-ulnaris-carpi': { name: 'Extensor Ulnaris Carpi', group: 'forearms' },

    /* -------------------------------- Hands -------------------------------- */
    hands: { name: 'Hands', group: 'hands' },

    /* --------------------------------- Lats -------------------------------- */
    'latissimus-dorsi': { name: 'Latissimus Dorsi', group: 'lats' },

    /* ----------------------------- Upper Back ------------------------------ */
    'rhomboid-major': { name: 'Rhomboid Major', group: 'upper-back' },
    infraspinatus: { name: 'Infraspinatus', group: 'upper-back' },
    'teres-major': { name: 'Teres Major', group: 'upper-back' },

    /* -------------------------------- Core --------------------------------- */
    'external-oblique': { name: 'External Oblique', group: 'core' },
    'upper-rectus-abdominis': { name: 'Upper Rectus Abdominis', group: 'core' },
    'middle-rectus-abdominis': { name: 'Middle Rectus Abdominis', group: 'core' },
    'lower-rectus-abdominis': { name: 'Lower Rectus Abdominis', group: 'core' },

    /* ----------------------------- Lower Back ------------------------------ */
    'erector-spinae': { name: 'Erector Spinae', group: 'lower-back' },

    /* -------------------------------- Hips --------------------------------- */
    iliacus: { name: 'Iliacus', group: 'hips' },
    'psoas-major': { name: 'Psoas Major', group: 'hips' },
    pectineus: { name: 'Pectineus', group: 'hips' },
    sartorius: { name: 'Sartorius', group: 'hips' },
    'iliotibial-tract': { name: 'Iliotibial Tract', group: 'hips' },

    /* ------------------------------- Glutes -------------------------------- */
    'gluteus-medius': { name: 'Gluteus Medius', group: 'glutes' },
    'gluteus-maximus': { name: 'Gluteus Maximus', group: 'glutes' },

    /* -------------------------------- Quads -------------------------------- */
    'rectus-femoris': { name: 'Rectus Femoris', group: 'quads' },
    'vastus-lateralis': { name: 'Vastus Lateralis', group: 'quads' },
    'vastus-medialis': { name: 'Vastus Medialis', group: 'quads' },

    /* ----------------------------- Hamstrings ------------------------------ */
    'biceps-femoris': { name: 'Biceps Femoris', group: 'hamstrings' },
    semitendinosus: { name: 'Semitendinosus', group: 'hamstrings' },
    semimembranosus: { name: 'Semimembranosus', group: 'hamstrings' },

    /* ------------------------------ Adductors ------------------------------ */
    'adductor-longus': { name: 'Adductor Longus', group: 'adductors' },
    'adductor-magnus': { name: 'Adductor Magnus', group: 'adductors' },
    gracilis: { name: 'Gracilis', group: 'adductors' },

    /* -------------------------------- Shins -------------------------------- */
    'tibialis-anterior': { name: 'Tibialis Anterior', group: 'shins' },
    'fibularis-longus': { name: 'Fibularis Longus', group: 'shins' },
    'fibularis-brevis': { name: 'Fibularis Brevis', group: 'shins' },
    'extensor-digitorum-longus': { name: 'Extensor Digitorum Longus', group: 'shins' },
    'flexor-digitorum-longus': { name: 'Flexor Digitorum Longus', group: 'shins' },

    /* ------------------------------- Calves -------------------------------- */
    gastrocnemius: { name: 'Gastrocnemius', group: 'calves' },
    soleus: { name: 'Soleus', group: 'calves' },

    /* -------------------------------- Feet --------------------------------- */
    feet: { name: 'Feet', group: 'feet' },
} as const;

/* ----------------------------- Derived Types ------------------------------ */

export type MuscleId = keyof typeof MUSCLES;
export type MuscleGroupId = (typeof MUSCLES)[MuscleId]['group'];
export type MuscleMetadata = (typeof MUSCLES)[MuscleId];

/* ----------------------------- Derived Lookups ---------------------------- */

/** Group → ordered list of muscle IDs belonging to that group. Built once. */
export const GROUP_TO_MUSCLES: Readonly<Record<MuscleGroupId, MuscleId[]>> = (() => {
    const map = {} as Record<string, MuscleId[]>;
    for (const [id, meta] of Object.entries(MUSCLES)) {
        const muscleId = id as MuscleId;
        (map[meta.group] ??= []).push(muscleId);
    }
    return map as Record<MuscleGroupId, MuscleId[]>;
})();

/** Set of all valid muscle IDs for O(1) membership checks. */
export const MUSCLE_ID_SET: ReadonlySet<MuscleId> = new Set(Object.keys(MUSCLES) as MuscleId[]);

/** All unique group IDs, derived from the catalog. */
export const MUSCLE_GROUP_IDS: readonly MuscleGroupId[] = [...new Set(Object.values(MUSCLES).map((m) => m.group))] as MuscleGroupId[];

/* ----------------------------- SVG Membership ----------------------------- */

/**
 * Which muscles are represented in each SVG.
 * A muscle ID may appear in both lists — this is expected for muscles
 * visible from both the front and back (e.g. middle-deltoid).
 */
export const ANTERIOR_MUSCLE_IDS: readonly MuscleId[] = [
    'sternocleidomastoid',
    'anterior-scalene',
    'middle-scalene',
    'sternohyoid',
    'omohyoid',
    'brachioradialis',
    'palmaris-longus',
    'pronator-teres',
    'flexor-carpi-radialis',
    'flexor-carpi-ulnaris',
    'flexor-digitorum-superficialis',
    'extensor-carpi-radialis-longus',
    'hands',
    'front-deltoid',
    'middle-deltoid',
    'upper-traps',
    'upper-chest',
    'middle-chest',
    'lower-chest',
    'latissimus-dorsi',
    'external-oblique',
    'upper-rectus-abdominis',
    'middle-rectus-abdominis',
    'lower-rectus-abdominis',
    'iliacus',
    'psoas-major',
    'pectineus',
    'sartorius',
    'biceps-brachii',
    'brachialis',
    'triceps-brachii',
    'rectus-femoris',
    'vastus-lateralis',
    'vastus-medialis',
    'adductor-longus',
    'gracilis',
    'tibialis-anterior',
    'fibularis-longus',
    'fibularis-brevis',
    'extensor-digitorum-longus',
    'flexor-digitorum-longus',
    'gastrocnemius',
    'soleus',
    'feet',
];

export const POSTERIOR_MUSCLE_IDS: readonly MuscleId[] = [
    'sternocleidomastoid',
    'splenius-capitis',
    'upper-traps',
    'middle-traps',
    'lower-traps',
    'middle-deltoid',
    'back-deltoid',
    'triceps-brachii',
    'biceps-brachii',
    'extensor-carpi-radialis-longus',
    'abductor-longus-pollicis',
    'extensor-digitorum',
    'extensor-digiti-minimi',
    'extensor-ulnaris-carpi',
    'flexor-carpi-ulnaris',
    'hands',
    'rhomboid-major',
    'infraspinatus',
    'teres-major',
    'latissimus-dorsi',
    'external-oblique',
    'erector-spinae',
    'gluteus-medius',
    'gluteus-maximus',
    'iliotibial-tract',
    'vastus-lateralis',
    'biceps-femoris',
    'semitendinosus',
    'semimembranosus',
    'adductor-magnus',
    'gracilis',
    'gastrocnemius',
    'fibularis-longus',
    'soleus',
    'feet',
];
