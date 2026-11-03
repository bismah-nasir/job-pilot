import { Composition, Still } from "remotion";
import { DEMO_DURATION, JobPilotDemo } from "./jobpilot/Demo";
import { FPS } from "./jobpilot/timeline";
import { JobPilotPoster } from "./jobpilot/Poster";
import { CleanScreen, cleanScreens, type CleanScreenId } from "./jobpilot/cleanup";

export function Root() {
  return (
    <>
      <Composition
        id="JobPilotDemo"
        component={JobPilotDemo}
        durationInFrames={DEMO_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Still id="JobPilotPoster" component={JobPilotPoster} width={1920} height={1080} />
      {(Object.keys(cleanScreens) as CleanScreenId[]).map((id) => (
        <Still
          key={id}
          id={`clean-${id}`}
          component={CleanScreen}
          defaultProps={{ id }}
          width={cleanScreens[id].width}
          height={cleanScreens[id].height}
        />
      ))}
    </>
  );
}
