'use client';

import { useCallback, useMemo, useState } from 'react';

import { EXCLUDED_IDS } from '@/constants/anatomy/excluded';
import { GROUP_TO_MUSCLES, MUSCLE_BY_ID } from '@/constants/anatomy/muscle.lookup';
import useToggle from '@/hooks/useToggle';

import { AnteriorSvg } from './AnteriorSvg';
import { PosteriorSvg } from './PosteriorSvg';

export function BodyViewer() {
    const [hover, setHover] = useState<string | null>(null);
    const [isAdvanced, { toggle: toggleIsAdvanced }] = useToggle();

    const activeMuscles = useMemo(() => {
        if (!hover) return [];
        const muscle = MUSCLE_BY_ID[hover];
        if (!muscle) return [];
        if (isAdvanced) return [muscle.id];
        return GROUP_TO_MUSCLES[muscle.group] ?? [];
    }, [hover, isAdvanced]);

    const handleMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
        const id = (e.target as SVGElement).id;

        if (!id) {
            setHover(null);
            return;
        }

        if ((EXCLUDED_IDS as readonly string[]).includes(id)) {
            return;
        }

        setHover(id);
    }, []);

    const handleLeave = useCallback(() => setHover(null), []);

    return (
        <div className="flex flex-col items-center gap-10 sm:flex-row sm:items-start sm:justify-center sm:gap-14">
            <button className="text-theme-text-primary text-sm font-semibold tracking-widest" onClick={() => toggleIsAdvanced()}>
                {isAdvanced ? 'Basic' : 'Advanced'}
            </button>
            <div className="flex flex-col items-center gap-3">
                <span className="text-theme-text-secondary text-xs font-semibold tracking-widest uppercase">Front</span>
                <AnteriorSvg
                    className="h-auto w-52 sm:w-56 md:w-82"
                    hoverMuscle={hover}
                    activeMuscles={activeMuscles}
                    onMove={handleMove}
                    onLeave={handleLeave}
                />
            </div>
            <div className="flex flex-col items-center gap-3">
                <span className="text-theme-text-secondary text-xs font-semibold tracking-widest uppercase">Back</span>
                <PosteriorSvg
                    className="h-auto w-52 sm:w-56 md:w-82"
                    hoverMuscle={hover}
                    activeMuscles={activeMuscles}
                    onMove={handleMove}
                    onLeave={handleLeave}
                />
            </div>
        </div>
    );
}
