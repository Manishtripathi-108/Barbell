import { ANTERIOR_MUSCLES } from './muscles.anterior';
import { POSTERIOR_MUSCLES } from './muscles.posterior';

export const ALL_MUSCLES = [...ANTERIOR_MUSCLES, ...POSTERIOR_MUSCLES] as const;

export const MUSCLE_BY_ID = Object.fromEntries(ALL_MUSCLES.map((m) => [m.id, m]));

export const GROUP_TO_MUSCLES = ALL_MUSCLES.reduce(
    (acc, m) => {
        if (!acc[m.group]) acc[m.group] = [];
        if (!acc[m.group].includes(m.id)) acc[m.group].push(m.id);
        return acc;
    },
    {} as Record<string, string[]>
);
