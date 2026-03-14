export const POSTERIOR_MUSCLES = [
    { id: 'sternocleidomastoid', name: 'Sternocleidomastoid', group: 'neck' },
    { id: 'splenius-capitis', name: 'Splenius Capitis', group: 'neck' },

    { id: 'upper-traps', name: 'Upper Traps', group: 'traps' },
    { id: 'middle-traps', name: 'Middle Traps', group: 'traps' },
    { id: 'lower-traps', name: 'Lower Traps', group: 'traps' },

    { id: 'middle-deltoid', name: 'Middle Deltoid', group: 'shoulders' },
    { id: 'back-deltoid', name: 'Back Deltoid', group: 'shoulders' },

    { id: 'triceps-brachii', name: 'Triceps Brachii', group: 'triceps' },
    { id: 'biceps-brachii', name: 'Biceps Brachii', group: 'biceps' },

    { id: 'extensor-carpi-radialis-longus', name: 'Extensor Carpi Radialis Longus', group: 'forearms' },
    { id: 'abductor-longus-pollicis', name: 'Abductor Longus Pollicis', group: 'forearms' },
    { id: 'extensor-digitorum', name: 'Extensor Digitorum', group: 'forearms' },
    { id: 'extensor-digiti-minimi', name: 'Extensor Digiti Minimi', group: 'forearms' },
    { id: 'extensor-ulnaris-carpi', name: 'Extensor Ulnaris Carpi', group: 'forearms' },
    { id: 'flexor-carpi-ulnaris', name: 'Flexor Carpi Ulnaris', group: 'forearms' },

    { id: 'hands', name: 'Hands', group: 'hands' },

    { id: 'rhomboid-major', name: 'Rhomboid Major', group: 'upper-back' },
    { id: 'infraspinatus', name: 'Infraspinatus', group: 'upper-back' },
    { id: 'teres-major', name: 'Teres Major', group: 'upper-back' },
    { id: 'latissimus-dorsi', name: 'Latissimus Dorsi', group: 'lats' },
    { id: 'external-oblique', name: 'External Oblique', group: 'core' },
    { id: 'erector-spinae', name: 'Erector Spinae', group: 'lower-back' },

    { id: 'gluteus-medius', name: 'Gluteus Medius', group: 'glutes' },
    { id: 'gluteus-maximus', name: 'Gluteus Maximus', group: 'glutes' },
    { id: 'iliotibial-tract', name: 'Iliotibial Tract', group: 'hips' },

    { id: 'vastus-lateralis', name: 'Vastus Lateralis', group: 'quads' },
    { id: 'biceps-femoris', name: 'Biceps Femoris', group: 'hamstrings' },
    { id: 'semitendinosus', name: 'Semitendinosus', group: 'hamstrings' },
    { id: 'semimembranosus', name: 'Semimembranosus', group: 'hamstrings' },
    { id: 'adductor-magnus', name: 'Adductor Magnus', group: 'adductors' },
    { id: 'gracilis', name: 'Gracilis', group: 'adductors' },

    { id: 'gastrocnemius', name: 'Gastrocnemius', group: 'calves' },
    { id: 'fibularis-longus', name: 'Fibularis Longus', group: 'shins' },
    { id: 'soleus', name: 'Soleus', group: 'calves' },

    { id: 'feet', name: 'Feet', group: 'feet' },
] as const;
