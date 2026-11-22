export type AnatomySvgColors = {
    skin: string;
    outline: string;
    nonMuscle: string;
    muscleActive: string;
    muscleInactive: string;
};

export type AnatomySvgColorOverrides = Partial<AnatomySvgColors>;

export const ANATOMY_SVG_COLORS: AnatomySvgColors = {
    skin: '#F2C6A8',
    outline: '#3A2F2A',
    nonMuscle: '#E9D6C8',
    muscleActive: '#C62828',
    muscleInactive: '#F19999',
};
