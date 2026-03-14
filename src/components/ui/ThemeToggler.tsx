'use client';

import React from 'react';

import Icon from '@/components/ui/Icon';
import useTheme from '@/hooks/useTheme';
import cn from '@/lib/utils/cn';

type ThemeTogglerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const ThemeToggler = ({ className, onClick, ...props }: ThemeTogglerProps) => {
    const { theme, nextTheme, animateToggleTheme } = useTheme();

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        onClick?.(event);

        if (event.defaultPrevented) {
            return;
        }

        animateToggleTheme(event.clientX, event.clientY);
    };

    const icon = theme === 'light' ? 'sun' : theme === 'dark' ? 'moon' : 'desktop';
    const text = theme === 'system' ? 'System' : theme[0].toUpperCase() + theme.slice(1);

    return (
        <button
            type="button"
            onClick={handleClick}
            aria-label={`Theme: ${text}. Switch to ${nextTheme} mode.`}
            title={`Theme: ${text}. Click to switch to ${nextTheme} mode.`}
            className={cn(
                'bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring/60 inline-flex h-10 items-center gap-2 rounded-full border px-3.5 text-xs font-semibold tracking-[0.08em] uppercase shadow-sm transition-colors focus-visible:ring-2 focus-visible:outline-none',
                className
            )}
            {...props}>
            <Icon icon={icon} className="size-4" />
            <span>{text}</span>
        </button>
    );
};

export default ThemeToggler;
