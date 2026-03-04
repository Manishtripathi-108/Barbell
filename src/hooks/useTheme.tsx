"use client";

import { useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { isBrowser } from "@/lib/utils/core.utils";

type ThemeType = "light" | "dark" | "system";

const THEME_KEY = "theme";

const getStoredTheme = (): ThemeType => {
	if (isBrowser) {
		const stored = localStorage.getItem(THEME_KEY) as ThemeType | null;
		if (stored === "light" || stored === "dark" || stored === "system") {
			return stored;
		}
	}
	return "system";
};

const getSystemTheme = (): "light" | "dark" =>
	window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const resolveTheme = (theme: ThemeType): "light" | "dark" => (theme === "system" ? getSystemTheme() : theme);

const applyThemeToDOM = (theme: "light" | "dark") => {
	const root = document.documentElement;

	if (root.dataset.theme === theme) return;

	root.dataset.theme = theme;
	root.classList.toggle("dark", theme === "dark");

	const meta = document.querySelector('meta[name="theme-color"]');
	if (meta) {
		const color = getComputedStyle(root).getPropertyValue("--color-primary");
		meta.setAttribute("content", color);
	}
};

const getNextTheme = (theme: ThemeType): ThemeType => {
	if (theme === "light") return "dark";
	if (theme === "dark") return "system";
	return "light";
};

const useTheme = ({ duration = 400 }: { duration?: number } = {}) => {
	const [theme, setTheme] = useState<ThemeType>(getStoredTheme);

	const nextTheme = getNextTheme(theme);

	const applyTheme = useCallback((themeValue: ThemeType) => {
		const resolved = resolveTheme(themeValue);
		applyThemeToDOM(resolved);

		if (isBrowser) {
			localStorage.setItem(THEME_KEY, themeValue);
		}
	}, []);

	useEffect(() => {
		if (!isBrowser) return;

		applyTheme(theme);

		if (theme !== "system") return;

		const media = window.matchMedia("(prefers-color-scheme: dark)");

		const handleChange = () => applyTheme("system");

		media.addEventListener("change", handleChange);
		return () => media.removeEventListener("change", handleChange);
	}, [theme, applyTheme]);

	const cycleTheme = useCallback(() => {
		setTheme((t) => getNextTheme(t));
	}, []);

	const animateToggleTheme = useCallback(
		(x?: number, y?: number) => {
			if (typeof document === "undefined" || !("startViewTransition" in document)) {
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
						easing: "ease-in-out",
						pseudoElement: "::view-transition-new(root)",
					},
				);
			});
		},
		[cycleTheme, duration],
	);

	return {
		theme,
		nextTheme,
		setTheme,
		cycleTheme,
		animateToggleTheme,
	};
};

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
