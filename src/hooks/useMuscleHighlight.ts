import { useEffect, useRef } from 'react';

type MuscleHighlightOptions = {
    activeFill: string;
    inactiveFill: string;
};

/**
 * Efficiently highlights muscle paths inside an SVG by diffing against the
 * previous highlighted set - only changed elements receive DOM updates.
 */
export const useMuscleHighlight = (
    svgRef: { current: SVGSVGElement | null },
    activeMuscles: string[],
    hoverMuscle: string | null,
    options: MuscleHighlightOptions = {
        activeFill: '#ff2a2a',
        inactiveFill: 'transparent',
    }
): void => {
    const prevRef = useRef<Set<string>>(new Set());

    useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;

        const next = new Set(activeMuscles);
        if (hoverMuscle) next.add(hoverMuscle);

        const prev = prevRef.current;
        const ids = new Set([...prev, ...next]);

        // Apply active/inactive fills for every changed muscle id, and repaint
        // previous targets when colors change.
        for (const id of ids) {
            const el = svg.querySelector<SVGElement>(`#${id}`);
            if (el) {
                el.style.fill = next.has(id) ? options.activeFill : options.inactiveFill;
            }
        }

        prevRef.current = next;
    }, [svgRef, activeMuscles, hoverMuscle, options.activeFill, options.inactiveFill]);
};
