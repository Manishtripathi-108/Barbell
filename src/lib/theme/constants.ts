import type { ColorMode, ColorScheme, ColorSchemeOption, ShapeOption, TransitionShape } from './types';

/* ----------------------------- Storage Keys ------------------------------- */

/** @constant {string} */
const PREFIX = 'barbell-wiki';

/** localStorage key for the selected color mode. */
export const MODE_STORAGE_KEY = `${PREFIX}:mode`;

/** localStorage key for the selected transition shape. */
export const SHAPE_STORAGE_KEY = `${PREFIX}:shape`;

/** localStorage key for the selected color scheme. */
export const COLOR_SCHEME_STORAGE_KEY = `${PREFIX}:scheme`;

/* ------------------------------ Event Names ------------------------------- */

/** Window event emitted when the color mode changes. */
export const MODE_CHANGE_EVENT = `${PREFIX}:mode-change`;

/** Window event emitted when the transition shape changes. */
export const SHAPE_CHANGE_EVENT = `${PREFIX}:shape-change`;

/** Window event emitted when the color scheme changes. */
export const COLOR_SCHEME_CHANGE_EVENT = `${PREFIX}:scheme-change`;

/* -------------------------------- Defaults -------------------------------- */

/** All available color modes supported by the application. */
export const MODES: readonly ColorMode[] = ['light', 'dark', 'system'] as const;

/** Mode used when nothing is saved yet. */
export const DEFAULT_MODE: ColorMode = 'system';

/** Shape used when nothing is saved yet. */
export const DEFAULT_SHAPE: TransitionShape = 'circle';

/** Color scheme used when nothing is saved yet. */
export const DEFAULT_COLOR_SCHEME: ColorScheme = 'default';

export const DEFAULT_META_VAR = '--background';

/* ----------------------------- Color Schemes ------------------------------ */

/** All available color scheme descriptors with preview metadata. */
export const COLOR_SCHEMES: readonly ColorSchemeOption[] = [
    {
        id: 'default',
        label: 'Default',
        description: 'Neutral zinc & slate baseline',
        swatch: '#27272a',
        accent: 'oklch(90.8% 0.012 260)',
    },
    {
        id: 'cloud',
        label: 'Cloud',
        description: 'Cool neutral sky',
        swatch: '#7094b8',
        accent: 'oklch(90.5% 0.022 255)',
    },
    {
        id: 'slate',
        label: 'Slate',
        description: 'Deep nautical slate',
        swatch: '#476585',
        accent: 'oklch(88.5% 0.04 250)',
    },
    {
        id: 'stone',
        label: 'Stone',
        description: 'Warm organic travertine',
        swatch: '#94836b',
        accent: 'oklch(90% 0.04 80)',
    },
    {
        id: 'indigo',
        label: 'Indigo',
        description: 'Vibrant modern violet',
        swatch: '#6366f1',
        accent: 'oklch(90% 0.055 285)',
    },
] as const;

/** Array of all available color scheme identifiers in display order. */
export const COLOR_SCHEME_IDS: readonly ColorScheme[] = COLOR_SCHEMES.map((scheme) => scheme.id);

/* --------------------------- Transition Easings --------------------------- */

export const TRANSITION_EASING = {
    /** Material 3 "emphasized": fast start, long soft landing. Best default for reveals. */
    emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
    /** Material 3 "emphasized decelerate": snappier, for shorter durations (≤ 350ms). */
    emphasizedDecelerate: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
    /** Easing-function classic (easeOutQuart): smooth and slightly softer than emphasized. */
    easeOutQuart: 'cubic-bezier(0.25, 1, 0.5, 1)',
    /** Symmetric option if you prefer a gentle start (easeInOutCubic). */
    easeInOutCubic: 'cubic-bezier(0.65, 0, 0.35, 1)',
} as const;

export const DEFAULT_EASING = TRANSITION_EASING.emphasized;

/* --------------------------------- Helpers -------------------------------- */

/**
 * Returns the next element in a circular list, wrapping around to the first element
 * after reaching the end. If the current element is not found, returns the first element.
 *
 * @param items - The readonly array of items.
 * @param current - The current active item.
 * @returns The next item in circular order.
 */
export function getNextItem<T>(items: readonly T[], current: T): T {
    if (items.length === 0) return current;
    const currentIndex = items.indexOf(current);
    if (currentIndex === -1) {
        return items[0] as T;
    }
    return items[(currentIndex + 1) % items.length] as T;
}

/* ------------------------------- Media Query ------------------------------ */

/** Media query that matches when the OS prefers dark. */
export const DARK_QUERY = '(prefers-color-scheme: dark)';

/* --------------------------- Transition Shapes ---------------------------- */

/** Every transition shape with its label and description. */
export const TRANSITION_SHAPES: ShapeOption[] = [
    { id: 'circle', label: 'Circle', description: 'Expanding circular ripple (Default)' },
    { id: 'diamond', label: 'Diamond', description: 'Geometric 45° rhombus expansion' },
    { id: 'square', label: 'Square', description: 'Expanding box from click origin' },
    { id: 'star', label: 'Star', description: 'Dynamic 4-point sparkle bloom' },
    { id: 'hexagon', label: 'Hexagon', description: 'Futuristic 6-sided polygon reveal' },
    { id: 'wipe-down', label: 'Curtain Down', description: 'Top-to-bottom waterfall sweep' },
    { id: 'wipe-up', label: 'Curtain Up', description: 'Bottom-to-top waterfall sweep' },
    { id: 'wipe-right', label: 'Cinematic Right', description: 'Left-to-right cinematic wipe' },
    { id: 'wipe-left', label: 'Cinematic Left', description: 'Right-to-left cinematic wipe' },
];
