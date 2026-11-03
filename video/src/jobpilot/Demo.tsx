import { staticFile } from "remotion";
import { Highlight } from "./components";
import {
  DiagramScene,
  InterviewScene,
  IntroScene,
  OutroScene,
  RecordingScene,
  ScreenScene,
  segmentsFrames,
  type Segment,
} from "./scenes";
import { links } from "./theme";
import { Timeline, clipFrames, timelineDuration, type Scene } from "./timeline";

/*
 * Captured from the app (dark mode, 1920x1080): screenshots in
 * public/jobpilot/screenshots/app/, silent screen recordings in public/jobpilot/captures/.
 * The VAPI voice interview comes from the one real recording (public/jobpilot/clips/).
 */

const screen = (name: string) => staticFile(`jobpilot/screenshots/app/${name}.png`);
const capture = (name: string) => staticFile(`jobpilot/captures/${name}.mp4`);
// No live-meeting recording yet, so this scene uses the older screenshot.
const meetingRoom = staticFile("jobpilot/screenshots/images/8.6 The Live Meeting Room.png");

const formSegments: Segment[] = [{ from: 1, to: 13.8, rate: 1.8 }];
// Typing the first answer, then skip ahead to the last answer and "Get Feedback".
const chatSegments: Segment[] = [
  { from: 5.5, to: 14.8, rate: 1.6 },
  { from: 63, to: 72.4, rate: 1.6 },
];
const scheduleSegments: Segment[] = [{ from: 0.8, to: 18.8, rate: 2.2 }];
const reviewSegments: Segment[] = [{ from: 0.3, to: 8.6, rate: 1.2 }];

const scenes: Scene[] = [
  { frames: 105, node: <IntroScene /> },
  {
    frames: 150,
    node: (
      <ScreenScene
        kicker="Landing page"
        title={<>One platform for <Highlight>candidates &amp; recruiters</Highlight></>}
        src={screen("landing")}
        url={links.live}
        aspect={6217 / 1920}
        scrollTo={0.3}
      />
    ),
  },
  {
    frames: 120,
    node: (
      <ScreenScene
        kicker="For candidates"
        title={<>Every interview in <Highlight>one dashboard</Highlight></>}
        src={screen("candidate-dashboard")}
        url={`${links.live}/interview-platform`}
        aspect={1397 / 1920}
      />
    ),
  },
  {
    frames: segmentsFrames(formSegments),
    node: (
      <RecordingScene
        kicker="AI mock interview"
        title={<>Pick a role, stack &amp; level, <Highlight>AI writes the questions</Highlight></>}
        src={capture("form")}
        url={`${links.live}/interview-platform/ai-prep/interview`}
        segments={formSegments}
      />
    ),
  },
  {
    frames: 105,
    node: (
      <ScreenScene
        kicker="Gemini AI"
        title={<>A tailored question set, <Highlight>ready in seconds</Highlight></>}
        src={screen("ai-prep")}
        url={`${links.live}/interview-platform/ai-prep`}
        aspect={1878 / 1920}
        scrollTo={0.35}
      />
    ),
  },
  {
    frames: clipFrames("greeting"),
    voice: true,
    node: (
      <InterviewScene
        clip="greeting"
        kicker="Voice AI · VAPI"
        title={<>Talk to an <Highlight>AI interviewer</Highlight> in real time</>}
      />
    ),
  },
  {
    frames: clipFrames("answer"),
    voice: true,
    node: (
      <InterviewScene
        clip="answer"
        kicker="Live transcript"
        title={<>Answer out loud, <Highlight>it listens &amp; follows up</Highlight></>}
      />
    ),
  },
  {
    frames: segmentsFrames(chatSegments),
    node: (
      <RecordingScene
        kicker="Written interview"
        title={<>Prefer typing? <Highlight>Answer question by question</Highlight></>}
        src={capture("chat")}
        url={`${links.live}/interview-platform/ai-prep/interview`}
        segments={chatSegments}
        cropTop={64}
      />
    ),
  },
  {
    frames: 165,
    node: (
      <ScreenScene
        kicker="Gemini AI feedback"
        title={<>Scores, strengths &amp; <Highlight>what to improve</Highlight></>}
        src={screen("feedback-full")}
        url={`${links.live}/interview-platform/ai-prep/feedback`}
        aspect={1508 / 1920}
      />
    ),
  },
  {
    frames: 105,
    node: (
      <ScreenScene
        kicker="For recruiters"
        title={<>Start, join, schedule &amp; <Highlight>replay interviews</Highlight></>}
        src={screen("interviewer-home")}
        url={`${links.live}/interview-platform`}
        aspect={1080 / 1920}
      />
    ),
  },
  {
    frames: segmentsFrames(scheduleSegments),
    node: (
      <RecordingScene
        kicker="Scheduling"
        title={<>Book a candidate &amp; panel <Highlight>in a few clicks</Highlight></>}
        src={capture("schedule")}
        url={`${links.live}/interview-platform/schedule`}
        segments={scheduleSegments}
        cropTop={50}
      />
    ),
  },
  {
    frames: segmentsFrames(reviewSegments),
    node: (
      <RecordingScene
        kicker="Candidate review"
        title={<>Rate, comment &amp; <Highlight>pass or fail</Highlight></>}
        src={capture("dashboard")}
        url={`${links.live}/interview-platform/dashboard`}
        segments={reviewSegments}
      />
    ),
  },
  {
    frames: 135,
    node: (
      <ScreenScene
        kicker="Stream video + Monaco editor"
        title={<>Live interviews with <Highlight>collaborative coding</Highlight></>}
        src={meetingRoom}
        url={`${links.live}/interview-platform/meeting`}
        aspect={593 / 1211}
      />
    ),
  },
  {
    frames: 105,
    node: (
      <ScreenScene
        kicker="Role-based access"
        title={<>Interviewer accounts are <Highlight>verified first</Highlight></>}
        src={screen("become-interviewer")}
        url={`${links.live}/interview-platform/become-interviewer`}
        aspect={1080 / 1920}
      />
    ),
  },
  { frames: 135, node: <DiagramScene /> },
  { frames: 150, node: <OutroScene /> },
];

export const DEMO_DURATION = timelineDuration(scenes);

export function JobPilotDemo() {
  return <Timeline scenes={scenes} music="music/ambient.mp3" />;
}
