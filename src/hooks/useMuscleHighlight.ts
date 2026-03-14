import { useEffect, useRef } from 'react';

const BASE_CLASS = 'fill-yellow-500';
const ACTIVE_CLASS = 'fill-[#ff2a2a]';

/**
 * Efficiently highlights muscle paths inside an SVG by diffing against the
 * previous highlighted set — only changed elements receive DOM updates.
 */
export const useMuscleHighlight = (svgRef: { current: SVGSVGElement | null }, activeMuscles: string[], hoverMuscle: string | null): void => {
    const prevRef = useRef<Set<string>>(new Set());

    useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;

        const next = new Set(activeMuscles);
        if (hoverMuscle) next.add(hoverMuscle);

        const prev = prevRef.current;

        // Un-highlight elements no longer in the active set
        for (const id of prev) {
            if (!next.has(id)) {
                const el = svg.querySelector<SVGElement>(`#${id}`);
                if (el) {
                    el.classList.remove(ACTIVE_CLASS);
                    el.classList.add(BASE_CLASS);
                }
            }
        }

        // Highlight newly active elements
        for (const id of next) {
            if (!prev.has(id)) {
                const el = svg.querySelector<SVGElement>(`#${id}`);
                if (el) {
                    el.classList.remove(BASE_CLASS);
                    el.classList.add(ACTIVE_CLASS);
                }
            }
        }

        prevRef.current = next;
    }, [svgRef, activeMuscles, hoverMuscle]);
};
