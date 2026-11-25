import { create } from 'zustand';

import type { MuscleGroupId, MuscleId } from './constants/muscles';

/* --------------------------------- Types ---------------------------------- */

export type AnatomyMode = 'basic' | 'advanced';

export type AnatomySelection = { type: 'group'; id: MuscleGroupId } | { type: 'muscle'; id: MuscleId } | null;

type AnatomyState = {
    mode: AnatomyMode;
    selectedTarget: AnatomySelection;
    setMode: (mode: AnatomyMode) => void;
    selectTarget: (target: AnatomySelection) => void;
    clearSelection: () => void;
};

/* --------------------------------- Store ---------------------------------- */

export const useAnatomyStore = create<AnatomyState>((set) => ({
    mode: 'basic',
    selectedTarget: null,

    setMode: (mode) => set({ mode }),

    selectTarget: (target) => set({ selectedTarget: target }),

    clearSelection: () => set({ selectedTarget: null }),
}));
