"use client";

import Icon from "@/components/ui/Icon";
import useTheme from "@/hooks/useTheme";
import cn from "@/lib/utils/cn";
import React from "react";

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

	const icon = theme === "light" ? "sun" : theme === "dark" ? "moon" : "desktop";
	const text = theme === "system" ? "System" : theme[0].toUpperCase() + theme.slice(1);

	return (
		<button
			type='button'
			onClick={handleClick}
			aria-label={`Theme: ${text}. Switch to ${nextTheme} mode.`}
			title={`Theme: ${text}. Click to switch to ${nextTheme} mode.`}
			className={cn(
				"inline-flex items-center gap-2 rounded-full border border-tertiary bg-secondary px-3 py-2 text-xs font-semibold tracking-wide text-text-primary shadow-sm backdrop-blur-sm transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2",
				className,
			)}
			{...props}>
			<Icon icon={icon} className='size-4' />
			<span>{text}</span>
		</button>
	);
};

export default ThemeToggler;
