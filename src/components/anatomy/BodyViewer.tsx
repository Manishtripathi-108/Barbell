'use client';

import { useState } from 'react';

import { EXCLUDED_IDS } from '@/constants/anatomy/excluded';
import { GROUP_TO_MUSCLES, MUSCLE_BY_ID } from '@/constants/anatomy/muscle.lookup';

import { AnteriorSvg } from './AnteriorSvg';
import { PosteriorSvg } from './PosteriorSvg';

type Mode = 'basic' | 'advanced';

export function BodyViewer() {
    const [hover, setHover] = useState<string | null>(null);
    const [mode] = useState<Mode>('basic');

    let activeMuscles: string[] = [];

    if (hover) {
        if (mode === 'advanced') {
            activeMuscles = [hover];
        } else {
            const muscle = MUSCLE_BY_ID[hover];
            activeMuscles = GROUP_TO_MUSCLES[muscle.group];
        }
    }

    const handleMove = (e: React.MouseEvent<SVGSVGElement>) => {
        const el = e.target as HTMLElement;
        const id = el.id;

        if (!id) {
            setHover(null);
            return;
        }

        if (EXCLUDED_IDS.includes(id)) {
            return;
        }

        setHover(id);
    };

    return (
        <div className="grid grid-cols-2 gap-8">
            <AnteriorSvg className="h-120" hoverMuscle={hover} activeMuscles={activeMuscles} onMove={handleMove} />

            <PosteriorSvg className="h-120" hoverMuscle={hover} activeMuscles={activeMuscles} onMove={handleMove} />
        </div>
    );
}
