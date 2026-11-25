'use client';

import { useAnatomyStore } from '../store';
import { getSelectionLabel } from '../utils';

export function AnatomyToolbar() {
    const mode = useAnatomyStore((state) => state.mode);
    const selectedTarget = useAnatomyStore((state) => state.selectedTarget);
    const setMode = useAnatomyStore((state) => state.setMode);
    const clearSelection = useAnatomyStore((state) => state.clearSelection);

    const selectedLabel = getSelectionLabel(selectedTarget);

    return (
        <div className="flex w-full flex-wrap items-center justify-between gap-4 border-b pb-4">
            <div
                role="group"
                aria-label="Anatomy interaction granularity"
                className="bg-muted squircle inline-flex items-center rounded-xl p-1 text-xs font-medium">
                <button
                    type="button"
                    aria-pressed={mode === 'basic'}
                    onClick={() => setMode('basic')}
                    className={`squircle rounded-lg px-3 py-1.5 transition-colors ${
                        mode === 'basic' ? 'bg-background text-foreground font-semibold shadow-xs' : 'text-muted-foreground hover:text-foreground'
                    }`}>
                    Basic (Groups)
                </button>
                <button
                    type="button"
                    aria-pressed={mode === 'advanced'}
                    onClick={() => setMode('advanced')}
                    className={`squircle rounded-lg px-3 py-1.5 transition-colors ${
                        mode === 'advanced' ? 'bg-background text-foreground font-semibold shadow-xs' : 'text-muted-foreground hover:text-foreground'
                    }`}>
                    Advanced (Muscles)
                </button>
            </div>

            {selectedTarget && (
                <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-xs">Selected:</span>
                    <span className="bg-primary/10 text-primary squircle rounded-lg px-2.5 py-1 text-xs font-semibold">{selectedLabel}</span>
                    <button
                        type="button"
                        onClick={clearSelection}
                        className="text-muted-foreground hover:text-foreground text-xs underline underline-offset-2 transition-colors">
                        Clear
                    </button>
                </div>
            )}
        </div>
    );
}
