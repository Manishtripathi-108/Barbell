'use client';

import { type ReactNode, useEffect, useRef } from 'react';

import { MUSCLE_ID_SET, type MuscleId } from '../constants/muscles';
import { type AnatomyMode, type AnatomySelection, useAnatomyStore } from '../store';
import { getTargetMuscleIds, resolveTarget } from '../utils';

interface AnatomyStageProps {
    children: ReactNode;
}

function applyClassDiff(lookup: Map<string, SVGElement[]>, prevIds: Set<MuscleId>, nextIds: Set<MuscleId>, className: string): void {
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
}

function getClosestMuscleId(target: EventTarget | null): MuscleId | null {
    if (!(target instanceof Element)) return null;
    const el = target.closest<SVGElement>('[data-muscle-id]');
    if (!el) return null;

    const id = el.getAttribute('data-muscle-id') as MuscleId | null;
    if (!id || !MUSCLE_ID_SET.has(id)) return null;

    return id;
}

/**
 * Shared interaction controller for both Anterior and Posterior SVGs.
 *
 * Uses event delegation, a mount-time path lookup, and direct Zustand store
 * subscriptions so pointer hover, selection changes, and mode switches trigger
 * zero React re-renders on the SVG subtrees.
 */
export function AnatomyStage({ children }: AnatomyStageProps) {
    const stageRef = useRef<HTMLDivElement | null>(null);
    const pathLookupRef = useRef<Map<string, SVGElement[]>>(new Map());

    const hoveredMuscleRef = useRef<MuscleId | null>(null);
    const previewIdsRef = useRef<Set<MuscleId>>(new Set());
    const selectedIdsRef = useRef<Set<MuscleId>>(new Set());

    useEffect(() => {
        const container = stageRef.current;
        if (!container) return;

        const lookup = new Map<string, SVGElement[]>();
        container.querySelectorAll<SVGElement>('[data-muscle-id]').forEach((el) => {
            const id = el.getAttribute('data-muscle-id');
            if (!id) return;
            const existing = lookup.get(id);
            if (existing) {
                existing.push(el);
            } else {
                lookup.set(id, [el]);
            }
        });
        pathLookupRef.current = lookup;

        const syncSelection = (target: AnatomySelection) => {
            const nextSelected = new Set(getTargetMuscleIds(target));
            applyClassDiff(lookup, selectedIdsRef.current, nextSelected, 'is-selected');
            selectedIdsRef.current = nextSelected;
        };

        const syncModePreview = (mode: AnatomyMode) => {
            if (!hoveredMuscleRef.current) return;
            const nextPreview = new Set(getTargetMuscleIds(resolveTarget(hoveredMuscleRef.current, mode)));
            applyClassDiff(lookup, previewIdsRef.current, nextPreview, 'is-preview');
            previewIdsRef.current = nextPreview;
        };

        let prevTarget = useAnatomyStore.getState().selectedTarget;
        let prevMode = useAnatomyStore.getState().mode;
        syncSelection(prevTarget);

        const unsubscribe = useAnatomyStore.subscribe((state) => {
            if (state.selectedTarget !== prevTarget) {
                prevTarget = state.selectedTarget;
                syncSelection(prevTarget);
            }
            if (state.mode !== prevMode) {
                prevMode = state.mode;
                syncModePreview(prevMode);
            }
        });

        return () => {
            unsubscribe();
            lookup.forEach((elements) => {
                elements.forEach((el) => {
                    el.classList.remove('is-selected', 'is-preview');
                });
            });
            lookup.clear();
            selectedIdsRef.current.clear();
            previewIdsRef.current.clear();
            hoveredMuscleRef.current = null;
        };
    }, []);

    const updateHoverPreview = (muscleId: MuscleId | null) => {
        if (hoveredMuscleRef.current === muscleId) return;
        hoveredMuscleRef.current = muscleId;

        const currentMode = useAnatomyStore.getState().mode;
        const nextPreview = muscleId ? new Set(getTargetMuscleIds(resolveTarget(muscleId, currentMode))) : new Set<MuscleId>();

        applyClassDiff(pathLookupRef.current, previewIdsRef.current, nextPreview, 'is-preview');
        previewIdsRef.current = nextPreview;
    };

    const handlePointerOver = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType === 'touch') return;
        updateHoverPreview(getClosestMuscleId(e.target));
    };

    const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType === 'touch') return;
        updateHoverPreview(null);
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const muscleId = getClosestMuscleId(e.target);
        if (!muscleId) return;

        const { mode, selectTarget } = useAnatomyStore.getState();
        selectTarget(resolveTarget(muscleId, mode));
    };

    return (
        <div
            ref={stageRef}
            onPointerOver={handlePointerOver}
            onPointerLeave={handlePointerLeave}
            onClick={handleClick}
            className="flex flex-col items-center gap-10 sm:flex-row sm:items-start sm:justify-center sm:gap-14">
            {children}
        </div>
    );
}
