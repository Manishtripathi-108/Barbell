import { AnatomyStage } from './AnatomyStage';
import { AnatomyToolbar } from './AnatomyToolbar';
import { AnteriorSvg } from './AnteriorSvg';
import { PosteriorSvg } from './PosteriorSvg';

export function BodyViewer() {
    return (
        <div className="flex flex-col items-center gap-6">
            <AnatomyToolbar />

            <AnatomyStage>
                <div className="flex flex-col items-center gap-3">
                    <span className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">Front</span>
                    <AnteriorSvg className="h-auto w-52 sm:w-56 md:w-82" />
                </div>
                <div className="flex flex-col items-center gap-3">
                    <span className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">Back</span>
                    <PosteriorSvg className="h-auto w-52 sm:w-56 md:w-82" />
                </div>
            </AnatomyStage>
        </div>
    );
}

export default BodyViewer;
