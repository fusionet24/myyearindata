import { Composition } from "remotion";
import { AIOpsJourneyVideo } from "./AIOpsJourneyVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="AIOpsJourney"
      component={AIOpsJourneyVideo}
      durationInFrames={450} // 15 seconds at 30fps
      fps={30}
      width={1080}
      height={1920} // 9:16 vertical for social media
    />
  );
};
