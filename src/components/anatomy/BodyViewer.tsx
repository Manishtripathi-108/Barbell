'use client';

import { useCallback, useMemo, useState } from 'react';

import { EXCLUDED_IDS } from '@/constants/anatomy/excluded';
import { GROUP_TO_MUSCLES, MUSCLE_BY_ID } from '@/constants/anatomy/muscle.lookup';

import { AnteriorSvg } from './AnteriorSvg';
import { PosteriorSvg } from './PosteriorSvg';

export function BodyViewer() {
    const [hover, setHover] = useState<string | null>(null);

    const activeMuscles = useMemo(() => {
        if (!hover) return [];
        const muscle = MUSCLE_BY_ID[hover];
        if (!muscle) return [];
        return GROUP_TO_MUSCLES[muscle.group] ?? [];
    }, [hover]);

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
