'use client';

import { useContext } from 'react';

import { ThemeContext } from '@/components/providers/ThemeProvider';
import type { UseThemeReturn } from '@/lib/theme/types';

export const useTheme = (): UseThemeReturn => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }

    return context;
};

export default useTheme;
