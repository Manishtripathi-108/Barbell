export { BodyViewer } from './components/BodyViewer';
export { AnatomyDetailsPanel } from './components/AnatomyDetailsPanel';
export { AnteriorSvg } from './components/AnteriorSvg';
export { PosteriorSvg } from './components/PosteriorSvg';

export {
    MUSCLES,
    GROUP_TO_MUSCLES,
    MUSCLE_ID_SET,
    ANTERIOR_MUSCLE_IDS,
    POSTERIOR_MUSCLE_IDS,
    type MuscleId,
    type MuscleGroupId,
    type MuscleMetadata,
} from './constants/muscles';

export { useAnatomyStore, type AnatomyMode, type AnatomySelection } from './store';

export { resolveTarget, getTargetMuscleIds } from './utils';
