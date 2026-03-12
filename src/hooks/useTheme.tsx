'use client';

import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { flushSync } from 'react-dom';

import { isBrowser } from '@/lib/utils/core.utils';

type ThemeType = 'light' | 'dark' | 'system';

const THEME_KEY = 'theme';
const THEME_CHANGE_EVENT = 'barbell-theme-change';

/* Read theme from localStorage. Falls back to system. */
const getStoredTheme = (): ThemeType => {
    if (isBrowser) {
        const stored = localStorage.getItem(THEME_KEY) as ThemeType | null;

        if (stored === 'light' || stored === 'dark' || stored === 'system') {
            return stored;
        }
    }

    return 'system';
};

const getSystemTheme = (): 'light' | 'dark' => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

/* Convert system theme to concrete light or dark. */
const resolveTheme = (theme: ThemeType): 'light' | 'dark' => (theme === 'system' ? getSystemTheme() : theme);

/* Apply theme to DOM root and update meta theme color. */
const applyThemeToDOM = (theme: 'light' | 'dark') => {
    const root = document.documentElement;

    if (root.dataset.theme === theme) return;

    root.dataset.theme = theme;
    root.classList.toggle('dark', theme === 'dark');

    const meta = document.querySelector('meta[name="theme-color"]');

    if (meta) {
        const color = getComputedStyle(root).getPropertyValue('--color-primary');
        meta.setAttribute('content', color);
    }
};

const getNextTheme = (theme: ThemeType): ThemeType => {
    if (theme === 'light') return 'dark';
    if (theme === 'dark') return 'system';
    return 'light';
};

/* Sync theme across tabs and within the same tab via custom event. */
const subscribeToTheme = (onStoreChange: () => void) => {
    if (!isBrowser) {
        return () => undefined;
    }

    const handleStorage = (event: StorageEvent) => {
        if (event.key === null || event.key === THEME_KEY) {
            onStoreChange();
        }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);

    return () => {
        window.removeEventListener('storage', handleStorage);
        window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
    };
};

const useTheme = ({ duration = 400 }: { duration?: number } = {}) => {
    const theme = useSyncExternalStore<ThemeType>(subscribeToTheme, getStoredTheme, () => 'system');

    const nextTheme = getNextTheme(theme);

    const applyTheme = useCallback((themeValue: ThemeType) => {
        const resolved = resolveTheme(themeValue);

        applyThemeToDOM(resolved);

        if (isBrowser) {
            localStorage.setItem(THEME_KEY, themeValue);

            /* Notify same tab listeners. */
            window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
        }
    }, []);

    const setTheme = useCallback(
        (value: ThemeType | ((theme: ThemeType) => ThemeType)) => {
            const nextThemeValue = typeof value === 'function' ? value(getStoredTheme()) : value;

            applyTheme(nextThemeValue);
        },
        [applyTheme]
    );

    useEffect(() => {
        if (!isBrowser) return;

        applyTheme(theme);

        /* When theme is system listen to OS preference changes. */
        if (theme !== 'system') return;

        const media = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = () => applyTheme('system');

        media.addEventListener('change', handleChange);

        return () => media.removeEventListener('change', handleChange);
    }, [theme, applyTheme]);

    const cycleTheme = useCallback(() => {
        setTheme((currentTheme) => getNextTheme(currentTheme));
    }, [setTheme]);

    const animateToggleTheme = useCallback(
        (x?: number, y?: number) => {
            /* Fallback when View Transition API is not supported. */
            if (typeof document === 'undefined' || !('startViewTransition' in document)) {
                cycleTheme();
                return;
            }

            const transition = document.startViewTransition(() => {
                flushSync(cycleTheme);
            });

            transition?.ready?.then(() => {
                const cx = x ?? window.innerWidth / 2;
                const cy = y ?? window.innerHeight / 2;

                const radius = Math.hypot(Math.max(cx, window.innerWidth - cx), Math.max(cy, window.innerHeight - cy));

                document.documentElement.animate(
                    {
                        clipPath: [`circle(0px at ${cx}px ${cy}px)`, `circle(${radius}px at ${cx}px ${cy}px)`],
                    },
                    {
                        duration,
                        easing: 'ease-in-out',
                        pseudoElement: '::view-transition-new(root)',
                    }
                );
            });
        },
        [cycleTheme, duration]
    );

    return {
        theme,
        nextTheme,
        setTheme,
        cycleTheme,
        animateToggleTheme,
    };
};

/* Runs before React hydration to prevent theme flash. */
export const ThemeScript = () => {
    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `
                    (function () {
                        try {
                            const theme = localStorage.getItem('theme') || 'system';
                            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                            const appliedTheme = theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme;

                            document.documentElement.setAttribute('data-theme', appliedTheme);
                            document.documentElement.classList.toggle('dark', appliedTheme === 'dark');
                        } catch (e) {
                            console.error("Error applying theme:", e);
                        }
                    })();
                `,
            }}
        />
    );
};

export default useTheme;
