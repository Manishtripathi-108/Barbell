import { GROUP_TO_MUSCLES, MUSCLES, type MuscleId } from './constants/muscles';
import type { AnatomyMode, AnatomySelection } from './store';

/**
 * Resolves a hovered/clicked muscle into the appropriate target
 * based on the current anatomy mode.
 */
export function resolveTarget(muscleId: MuscleId, mode: AnatomyMode): AnatomySelection {
    const muscle = MUSCLES[muscleId];

    if (mode === 'basic') {
        return { type: 'group', id: muscle.group };
    }

    return { type: 'muscle', id: muscleId };
}

/**
 * Expands a target into the set of individual muscle IDs it represents.
 * Returns an empty array for null targets.
 */
export function getTargetMuscleIds(target: AnatomySelection): MuscleId[] {
    if (!target) return [];

    if (target.type === 'muscle') {
        return [target.id];
    }

    return GROUP_TO_MUSCLES[target.id] ?? [];
}
