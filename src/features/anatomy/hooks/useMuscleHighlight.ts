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
    options: MuscleHighlightOptions
): void => {
    const prevRef = useRef<Set<string>>(new Set());

    useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;

        const activeSet = new Set(activeMuscles);
        const next = new Set(activeMuscles);
        if (hoverMuscle) {
            next.add(hoverMuscle);
        }

        const prev = prevRef.current;
        const ids = new Set([...prev, ...next]);

        // Hover color takes priority over active color, and any previous targets
        // are repainted when color options change.
        for (const id of ids) {
            const el = svg.querySelector<SVGElement>(`#${id}`);
            if (el) {
                const isHovered = hoverMuscle === id;
                const isActive = activeSet.has(id);

                el.style.fill = isHovered || isActive ? options.activeFill : options.inactiveFill;
            }
        }

        prevRef.current = next;
    }, [svgRef, activeMuscles, hoverMuscle, options.activeFill, options.inactiveFill]);
};
