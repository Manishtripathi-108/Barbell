export type AnatomySvgColors = {
    skin: string;
    outline: string;
    nonMuscle: string;
    muscleActive: string;
    muscleInactive: string;
};

export type AnatomySvgColorOverrides = Partial<AnatomySvgColors>;

export const DEFAULT_ANATOMY_SVG_COLORS: AnatomySvgColors = {
    skin: '#fde8cd',
    outline: '#000000',
    nonMuscle: '#ff8080',
    muscleActive: '#ff2a2a',
    muscleInactive: 'transparent',
};

export const resolveAnatomySvgColors = (overrides?: AnatomySvgColorOverrides): AnatomySvgColors => ({
    ...DEFAULT_ANATOMY_SVG_COLORS,
    ...overrides,
});
