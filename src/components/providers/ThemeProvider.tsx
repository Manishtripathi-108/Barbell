'use client';

import {
    type PropsWithChildren,
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useSyncExternalStore,
} from 'react';
import { flushSync } from 'react-dom';

import { isBrowser } from '@/lib/storage';
import {
    applyModeToDOM,
    getNextMode,
    getSavedMode,
    getSavedShape,
    getSystemMode,
    persistMode,
    persistShape,
    subscribeToMode,
    subscribeToShape,
    subscribeToSystemMode,
} from '@/lib/theme/color-mode';
import {
    applyColorSchemeToDOM,
    getNextColorScheme,
    getSavedColorScheme,
    persistColorScheme,
    subscribeToColorScheme,
} from '@/lib/theme/color-scheme';
import {
    COLOR_SCHEMES,
    DEFAULT_COLOR_SCHEME,
    DEFAULT_EASING,
    DEFAULT_MODE,
    DEFAULT_SHAPE,
    MODES,
    TRANSITION_SHAPES,
} from '@/lib/theme/constants';
import { updateMetaColor } from '@/lib/theme/meta-color';
import { getClipPaths } from '@/lib/theme/transitions';
import type { ActiveMode, UseThemeOptions, UseThemeReturn } from '@/lib/theme/types';

export const useThemeStore = ({
    duration = 450,
    shape: shapeOption,
    easing = DEFAULT_EASING,
}: UseThemeOptions = {}): UseThemeReturn => {
    const mode = useSyncExternalStore(subscribeToMode, getSavedMode, () => DEFAULT_MODE);
    const shape = useSyncExternalStore(subscribeToShape, getSavedShape, () => DEFAULT_SHAPE);
    const colorScheme = useSyncExternalStore(subscribeToColorScheme, getSavedColorScheme, () => DEFAULT_COLOR_SCHEME);
    const systemMode = useSyncExternalStore(subscribeToSystemMode, getSystemMode, (): ActiveMode => 'light');

    const activeMode = mode === 'system' ? systemMode : mode;

    const setMode = useCallback<UseThemeReturn['setMode']>((value) => {
        const newMode = typeof value === 'function' ? value(getSavedMode()) : value;
        persistMode(newMode);
    }, []);

    const setShape = useCallback((newShape: typeof shape) => {
        persistShape(newShape);
    }, []);

    const setColorScheme = useCallback((scheme: typeof colorScheme) => {
        persistColorScheme(scheme);
    }, []);

    const cycleColorScheme = useCallback(() => {
        setColorScheme(getNextColorScheme(getSavedColorScheme()));
    }, [setColorScheme]);

    const cycleMode = useCallback(() => {
        setMode((current) => getNextMode(current));
    }, [setMode]);

    const setModeAnimated = useCallback(
        (newMode: typeof mode, x?: number, y?: number) => {
            const prefersReducedMotion = isBrowser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            if (typeof document === 'undefined' || typeof document.startViewTransition !== 'function' || prefersReducedMotion) {
                setMode(newMode);
                return;
            }

            const chosenShape = shapeOption ?? shape;

            const transition = document.startViewTransition(() => {
                flushSync(() => setMode(newMode));
            });

            void transition.ready
                .then(() => {
                    const width = window.innerWidth;
                    const height = window.innerHeight;

                    const originX = Math.min(Math.max(x ?? width / 2, 0), width);
                    const originY = Math.min(Math.max(y ?? height / 2, 0), height);

                    const [startClip, endClip] = getClipPaths(chosenShape, originX, originY, width, height);

                    document.documentElement.animate(
                        { clipPath: [startClip, endClip] },
                        {
                            duration,
                            easing,
                            pseudoElement: '::view-transition-new(root)',
                        }
                    );
                })
                .catch(() => {});
        },
        [setMode, duration, easing, shapeOption, shape]
    );

    const cycleModeAnimated = useCallback(
        (x?: number, y?: number) => {
            setModeAnimated(getNextMode(getSavedMode()), x, y);
        },
        [setModeAnimated]
    );

    useEffect(() => {
        applyModeToDOM(activeMode);
        updateMetaColor();
    }, [activeMode]);

    useEffect(() => {
        applyColorSchemeToDOM(colorScheme);
    }, [colorScheme]);

    return useMemo<UseThemeReturn>(
        () => ({
            mode,
            activeMode,
            nextMode: getNextMode(mode),
            shape,
            shapes: TRANSITION_SHAPES,
            setMode,
            setShape,
            cycleMode,
            setModeAnimated,
            cycleModeAnimated,
            colorScheme,
            setColorScheme,
            cycleColorScheme,
            colorSchemes: COLOR_SCHEMES,
            modes: MODES,
        }),
        [mode, activeMode, shape, setMode, setShape, cycleMode, setModeAnimated, cycleModeAnimated, colorScheme, setColorScheme, cycleColorScheme]
    );
};

export const ThemeContext = createContext<UseThemeReturn | null>(null);

export type ThemeProviderProps = PropsWithChildren<UseThemeOptions>;

export const ThemeProvider = ({ children, ...options }: ThemeProviderProps) => {
    const theme = useThemeStore(options);

    return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
