'use client';

import React from 'react';

import Icon from '@/components/ui/Icon';
import useTheme from '@/hooks/useTheme';
import cn from '@/lib/cn';

type ThemeTogglerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const ThemeToggler = ({ className, ...props }: ThemeTogglerProps) => {
    const { mode, nextMode, cycleModeAnimated } = useTheme();

    const handleToggleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        cycleModeAnimated(event.clientX, event.clientY);
    };

    const themeIcon = mode === 'light' ? 'sun' : mode === 'dark' ? 'moon' : 'desktop';
    const themeText = mode === 'system' ? 'System' : mode[0].toUpperCase() + mode.slice(1);

    return (
        <button
            type="button"
            onClick={handleToggleClick}
            aria-label={`Theme: ${themeText}. Switch to ${nextMode} mode.`}
            title={`Theme: ${themeText}. Click to switch to ${nextMode} mode.`}
            className={cn(
                'bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring/60 inline-flex h-10 items-center gap-2 rounded-full border px-3.5 text-xs font-semibold tracking-[0.08em] uppercase shadow-sm transition-colors focus-visible:ring-2 focus-visible:outline-none',
                className
            )}
            {...props}>
            <Icon icon={themeIcon} className="size-4" />
            <span>{themeText}</span>
        </button>
    );
};

export default ThemeToggler;
