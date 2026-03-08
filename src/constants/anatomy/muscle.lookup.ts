import { ANTERIOR_MUSCLES } from "./muscles.anterior";

export const MUSCLE_BY_ID = Object.fromEntries(ANTERIOR_MUSCLES.map((m) => [m.id, m]));

export const GROUP_TO_MUSCLES = ANTERIOR_MUSCLES.reduce(
	(acc, m) => {
		if (!acc[m.group]) acc[m.group] = [];
		acc[m.group].push(m.id);
		return acc;
	},
	{} as Record<string, string[]>,
);
