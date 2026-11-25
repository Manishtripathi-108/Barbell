'use client';

import { GROUP_TO_MUSCLES, MUSCLES } from '../constants/muscles';
import { useAnatomyStore } from '../store';
import { formatGroupLabel } from '../utils';

export function AnatomyDetailsPanel() {
    const selectedTarget = useAnatomyStore((state) => state.selectedTarget);
    const clearSelection = useAnatomyStore((state) => state.clearSelection);

    if (!selectedTarget) {
        return (
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                Click any muscle group or individual muscle on the body viewer to inspect targeted anatomy, constituent muscles, and focus regions.
            </p>
        );
    }

    if (selectedTarget.type === 'muscle') {
        const muscle = MUSCLES[selectedTarget.id];
        return (
            <div className="mt-3 space-y-3">
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <span className="text-primary text-xs font-semibold tracking-wider uppercase">Individual Muscle</span>
                        <h4 className="text-foreground text-lg font-bold">{muscle.name}</h4>
                        <p className="text-muted-foreground text-xs">
                            Group: <span className="text-foreground font-medium">{formatGroupLabel(muscle.group)}</span>
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={clearSelection}
                        className="text-muted-foreground hover:text-foreground text-xs underline underline-offset-2">
                        Clear
                    </button>
                </div>
            </div>
        );
    }

    const constituentMuscles = GROUP_TO_MUSCLES[selectedTarget.id] ?? [];

    return (
        <div className="mt-3 space-y-3">
            <div className="flex items-start justify-between gap-2">
                <div>
                    <span className="text-primary text-xs font-semibold tracking-wider uppercase">Muscle Group</span>
                    <h4 className="text-foreground text-lg font-bold">{formatGroupLabel(selectedTarget.id)}</h4>
                    <p className="text-muted-foreground text-xs">
                        {constituentMuscles.length} constituent {constituentMuscles.length === 1 ? 'muscle' : 'muscles'}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={clearSelection}
                    className="text-muted-foreground hover:text-foreground text-xs underline underline-offset-2">
                    Clear
                </button>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
                {constituentMuscles.map((id) => (
                    <span key={id} className="bg-muted text-muted-foreground squircle rounded-lg px-2.5 py-1 text-xs">
                        {MUSCLES[id]?.name ?? id}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default AnatomyDetailsPanel;
