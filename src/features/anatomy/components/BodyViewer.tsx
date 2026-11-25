'use client';

import { useEffect, useRef } from 'react';

import { MUSCLES, MUSCLE_ID_SET, type MuscleId } from '../constants/muscles';
import { useAnatomyStore } from '../store';
import { getTargetMuscleIds, resolveTarget } from '../utils';
import { AnteriorSvg } from './AnteriorSvg';
import { PosteriorSvg } from './PosteriorSvg';

/* --------------------------------- Helpers -------------------------------- */

function formatGroupLabel(groupId: string): string {
    return groupId
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/* -------------------------------- Component ------------------------------- */

export function BodyViewer() {
    const mode = useAnatomyStore((state) => state.mode);
    const selectedTarget = useAnatomyStore((state) => state.selectedTarget);
    const setMode = useAnatomyStore((state) => state.setMode);
    const selectTarget = useAnatomyStore((state) => state.selectTarget);
    const clearSelection = useAnatomyStore((state) => state.clearSelection);

    const anteriorRef = useRef<SVGSVGElement | null>(null);
    const posteriorRef = useRef<SVGSVGElement | null>(null);

    // Fast shared path lookup: Map<muscleId, SVGElement[]>
    const pathLookupRef = useRef<Map<string, SVGElement[]>>(new Map());

    // Transient interaction refs to avoid React re-renders on pointer movement
    const hoveredMuscleRef = useRef<MuscleId | null>(null);
    const previewIdsRef = useRef<Set<MuscleId>>(new Set());
    const selectedIdsRef = useRef<Set<MuscleId>>(new Set());
    const pointerSourceRef = useRef<SVGElement | null>(null);

    // High-performance direct DOM class diffing helper
    const applyClassDiff = (prevIds: Set<MuscleId>, nextIds: Set<MuscleId>, className: string) => {
        const lookup = pathLookupRef.current;

        prevIds.forEach((id) => {
            if (!nextIds.has(id)) {
                lookup.get(id)?.forEach((el) => el.classList.remove(className));
            }
        });

        nextIds.forEach((id) => {
            if (!prevIds.has(id)) {
                lookup.get(id)?.forEach((el) => el.classList.add(className));
            }
        });
    };

    // Index SVG muscle elements once on mount
    useEffect(() => {
        const lookup = new Map<string, SVGElement[]>();

        const registerSvgPaths = (svg: SVGSVGElement | null) => {
            if (!svg) return;
            const elements = svg.querySelectorAll<SVGElement>('[data-muscle-id]');
            elements.forEach((el) => {
                const id = el.getAttribute('data-muscle-id');
                if (!id) return;
                const existing = lookup.get(id);
                if (existing) {
                    existing.push(el);
                } else {
                    lookup.set(id, [el]);
                }
            });
        };

        registerSvgPaths(anteriorRef.current);
        registerSvgPaths(posteriorRef.current);
        pathLookupRef.current = lookup;

        // Apply initial selection classes if store already has a selection
        const currentTarget = useAnatomyStore.getState().selectedTarget;
        const initialSelectedIds = new Set(getTargetMuscleIds(currentTarget));
        selectedIdsRef.current = initialSelectedIds;
        initialSelectedIds.forEach((id) => {
            lookup.get(id)?.forEach((el) => el.classList.add('is-selected'));
        });

        return () => {
            lookup.forEach((elements) => {
                elements.forEach((el) => {
                    el.classList.remove('is-selected', 'is-preview', 'is-pointer-source');
                });
            });
            pathLookupRef.current.clear();
        };
    }, []);

    // Sync selectedTarget changes from Zustand store
    useEffect(() => {
        const newSelectedIds = new Set(getTargetMuscleIds(selectedTarget));
        applyClassDiff(selectedIdsRef.current, newSelectedIds, 'is-selected');
        selectedIdsRef.current = newSelectedIds;
    }, [selectedTarget]);

    // Mode switching immediately re-resolves the hover preview without requiring pointer move
    useEffect(() => {
        if (hoveredMuscleRef.current) {
            const target = resolveTarget(hoveredMuscleRef.current, mode);
            const newPreviewIds = new Set(getTargetMuscleIds(target));
            applyClassDiff(previewIdsRef.current, newPreviewIds, 'is-preview');
            previewIdsRef.current = newPreviewIds;
        }
    }, [mode]);

    // Transient hover preview update (zero React state updates)
    const updateHoverPreview = (muscleId: MuscleId | null, sourceEl: SVGElement | null) => {
        // Outline the specific path under the pointer
        if (pointerSourceRef.current !== sourceEl) {
            if (pointerSourceRef.current) {
                pointerSourceRef.current.classList.remove('is-pointer-source');
            }
            if (sourceEl) {
                sourceEl.classList.add('is-pointer-source');
            }
            pointerSourceRef.current = sourceEl;
        }

        if (hoveredMuscleRef.current === muscleId) {
            return;
        }

        hoveredMuscleRef.current = muscleId;

        const currentMode = useAnatomyStore.getState().mode;
        const newPreviewIds = muscleId ? new Set(getTargetMuscleIds(resolveTarget(muscleId, currentMode))) : new Set<MuscleId>();

        applyClassDiff(previewIdsRef.current, newPreviewIds, 'is-preview');
        previewIdsRef.current = newPreviewIds;
    };

    /* ---------------------------- Event Handlers ---------------------------- */

    const handlePointerOver = (e: React.PointerEvent<HTMLDivElement>) => {
        // Ignore hover interactions on touch devices
        if (e.pointerType === 'touch') return;

        const targetEl = (e.target as Element).closest<SVGElement>('[data-muscle-id]');
        if (!targetEl) {
            updateHoverPreview(null, null);
            return;
        }

        const id = targetEl.getAttribute('data-muscle-id') as MuscleId | null;
        if (id && MUSCLE_ID_SET.has(id)) {
            updateHoverPreview(id, targetEl);
        } else {
            updateHoverPreview(null, null);
        }
    };

    const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType === 'touch') return;
        updateHoverPreview(null, null);
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const targetEl = (e.target as Element).closest<SVGElement>('[data-muscle-id]');
        if (!targetEl) return;

        const id = targetEl.getAttribute('data-muscle-id') as MuscleId | null;
        if (id && MUSCLE_ID_SET.has(id)) {
            const currentMode = useAnatomyStore.getState().mode;
            const target = resolveTarget(id, currentMode);
            selectTarget(target);
        }
    };

    /* -------------------------------- Render -------------------------------- */

    const selectedLabel = selectedTarget
        ? selectedTarget.type === 'muscle'
            ? MUSCLES[selectedTarget.id]?.name
            : `${formatGroupLabel(selectedTarget.id)} (Group)`
        : null;

    return (
        <div className="flex flex-col items-center gap-6">
            {/* Top Toolbar: Mode Switcher & Selection Status */}
            <div className="flex w-full flex-wrap items-center justify-between gap-4 border-b pb-4">
                {/* Granularity Mode Segmented Control */}
                <div className="bg-muted inline-flex items-center rounded-lg p-1 text-xs font-medium">
                    <button
                        type="button"
                        onClick={() => setMode('basic')}
                        className={`rounded-md px-3 py-1.5 transition-all ${
                            mode === 'basic' ? 'bg-background text-foreground font-semibold shadow-xs' : 'text-muted-foreground hover:text-foreground'
                        }`}>
                        Basic (Groups)
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode('advanced')}
                        className={`rounded-md px-3 py-1.5 transition-all ${
                            mode === 'advanced'
                                ? 'bg-background text-foreground font-semibold shadow-xs'
                                : 'text-muted-foreground hover:text-foreground'
                        }`}>
                        Advanced (Muscles)
                    </button>
                </div>

                {/* Selection indicator & Clear button */}
                {selectedTarget && (
                    <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-xs">Selected:</span>
                        <span className="bg-primary/10 text-primary rounded-md px-2.5 py-1 text-xs font-semibold">{selectedLabel}</span>
                        <button
                            type="button"
                            onClick={clearSelection}
                            className="text-muted-foreground hover:text-foreground text-xs underline underline-offset-2 transition-colors">
                            Clear
                        </button>
                    </div>
                )}
            </div>

            {/* Delegated Pointer Container for Anterior & Posterior SVGs */}
            <div
                onPointerOver={handlePointerOver}
                onPointerLeave={handlePointerLeave}
                onClick={handleClick}
                className="flex flex-col items-center gap-10 sm:flex-row sm:items-start sm:justify-center sm:gap-14">
                <div className="flex flex-col items-center gap-3">
                    <span className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">Front</span>
                    <AnteriorSvg ref={anteriorRef} className="h-auto w-52 sm:w-56 md:w-82" />
                </div>
                <div className="flex flex-col items-center gap-3">
                    <span className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">Back</span>
                    <PosteriorSvg ref={posteriorRef} className="h-auto w-52 sm:w-56 md:w-82" />
                </div>
            </div>
        </div>
    );
}

export default BodyViewer;
