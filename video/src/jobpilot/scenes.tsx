import type { ReactNode } from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Background, BrowserFrame, Caption, Chip, Highlight, useEntrance } from "./components";
import { Logo } from "./Logo";
import { colors, links, techStack } from "./theme";
import { FPS } from "./timeline";

const FRAME_W = 1440;
const FRAME_H = 780;
const VIEWPORT_H = FRAME_H - 52; // minus browser chrome

// The screen recording is 1920x1032 and includes the browser's own tab/address
// bar (top 108px), which is cropped off so only the app shows.
const REC_W = 1920;
const REC_H = 1032;
const REC_CHROME_H = 108;
const recScale = VIEWPORT_H / (REC_H - REC_CHROME_H);

const diagram = (name: string) => staticFile(`jobpilot/screenshots/diagrams/${name}`);

/** Caption on top, browser window below, rising into place. */
function ScreenLayout({ caption, url, children }: { caption: ReactNode; url: string; children: ReactNode }) {
  const enter = useEntrance(8);
  return (
    <Background>
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 56, gap: 44 }}>
        {caption}
        <div
          style={{
            opacity: enter,
            transform: `translateY(${interpolate(enter, [0, 1], [80, 0])}px) scale(${interpolate(enter, [0, 1], [0.96, 1])})`,
          }}
        >
          <BrowserFrame url={url} width={FRAME_W} height={FRAME_H}>
            {children}
          </BrowserFrame>
        </div>
      </AbsoluteFill>
    </Background>
  );
}

/**
 * A screenshot inside the browser frame. Tall screenshots scroll down
 * (`aspect` = height / width, `scrollTo` = fraction of the page to reveal);
 * short ones get a slow zoom instead.
 */
export function ScreenScene({
  kicker,
  title,
  src,
  url,
  aspect,
  scrollTo = 1,
}: {
  kicker: string;
  title: ReactNode;
  src: string;
  url: string;
  aspect: number;
  scrollTo?: number;
}) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const imgH = FRAME_W * aspect;
  const maxScroll = Math.max(0, (imgH - VIEWPORT_H) * scrollTo);
  const progress = interpolate(frame, [25, durationInFrames - 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  return (
    <ScreenLayout caption={<Caption kicker={kicker} title={title} />} url={url}>
      {maxScroll > 0 ? (
        <Img src={src} style={{ width: FRAME_W, transform: `translateY(${-maxScroll * progress}px)` }} />
      ) : (
        <Img
          src={src}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top",
            transform: `scale(${interpolate(progress, [0, 1], [1, 1.05])})`,
            transformOrigin: "50% 30%",
          }}
        />
      )}
    </ScreenLayout>
  );
}

/** A clip from the screen recording of a real AI mock interview, with its audio. */
export function InterviewScene({ kicker, title, clip }: { kicker: string; title: ReactNode; clip: string }) {
  const { durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();
  const pulse = 0.55 + 0.45 * Math.abs(Math.sin(frame / 12));
  return (
    <ScreenLayout caption={<Caption kicker={kicker} title={title} />} url={`${links.live}/interview-platform/ai-prep/interview`}>
      <OffthreadVideo
        src={staticFile(`jobpilot/clips/${clip}.mp4`)}
        // Short fades so cuts mid-sentence don't click.
        volume={(f) =>
          interpolate(f, [0, 12, durationInFrames - 12, durationInFrames], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
        style={{
          position: "absolute",
          width: REC_W * recScale,
          left: (FRAME_W - REC_W * recScale) / 2,
          top: -REC_CHROME_H * recScale,
        }}
      />
      {/* The account was renamed after recording: paint the new name over the old
          "Bismah University" label (recording pixels; plain white card behind it). */}
      <div
        style={{
          position: "absolute",
          left: (FRAME_W - REC_W * recScale) / 2 + 1195 * recScale,
          top: (622 - REC_CHROME_H) * recScale,
          width: 276 * recScale,
          height: 52 * recScale,
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 27 * recScale,
          fontWeight: 700,
          color: "#101828",
        }}
      >
        Bismah
      </div>
      <div
        style={{
          position: "absolute",
          top: 22,
          right: 22,
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 18px",
          borderRadius: 999,
          background: "rgba(13,18,32,0.85)",
          color: "#fff",
          fontSize: 20,
          fontWeight: 600,
        }}
      >
        <span style={{ width: 12, height: 12, borderRadius: 6, background: "#ef4444", opacity: pulse }} />
        Live AI voice interview
      </div>
    </ScreenLayout>
  );
}

/** Part of a 1920x1080 app capture: `from`/`to` in seconds, played `rate`x faster. */
export type Segment = { from: number; to: number; rate?: number };

export const segmentsFrames = (segments: Segment[]) =>
  segments.reduce((sum, s) => sum + Math.round(((s.to - s.from) * FPS) / (s.rate ?? 1)), 0);

const capScale = FRAME_W / 1920;

/**
 * A silent screen recording of the app (no browser chrome) inside the browser frame.
 * Segments play back to back, so one scene can skip the boring middle of a flow.
 * `cropTop` = capture pixels hidden above the viewport.
 */
export function RecordingScene({
  kicker,
  title,
  src,
  url,
  segments,
  cropTop = 0,
}: {
  kicker: string;
  title: ReactNode;
  src: string;
  url: string;
  segments: Segment[];
  cropTop?: number;
}) {
  let at = 0;
  return (
    <ScreenLayout caption={<Caption kicker={kicker} title={title} />} url={url}>
      {segments.map((s, i) => {
        const rate = s.rate ?? 1;
        const frames = Math.round(((s.to - s.from) * FPS) / rate);
        const from = at;
        at += frames;
        return (
          <Sequence key={i} from={from} durationInFrames={frames} layout="none">
            <OffthreadVideo
              src={src}
              muted
              playbackRate={rate}
              trimBefore={Math.round(s.from * FPS)}
              style={{ position: "absolute", width: FRAME_W, left: 0, top: -cropTop * capScale }}
            />
          </Sequence>
        );
      })}
    </ScreenLayout>
  );
}

export function DiagramScene() {
  const enter = useEntrance(10);
  return (
    <Background>
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 56, gap: 40 }}>
        <Caption
          kicker="Under the hood"
          title={
            <>
              Real-time <Highlight>system architecture</Highlight>
            </>
          }
        />
        <div
          style={{
            position: "relative",
            width: 1300,
            height: 720,
            borderRadius: 24,
            overflow: "hidden",
            background: "#fff",
            boxShadow: "0 40px 120px rgba(0,0,0,0.55)",
            opacity: enter,
            transform: `scale(${interpolate(enter, [0, 1], [0.92, 1])})`,
          }}
        >
          {/* Crop the diagram's wide white margins (content sits in x 150–1870, y 200–1180 of 2000x1414). */}
          <Img
            src={diagram("4.1 System Architecture.png")}
            style={{ position: "absolute", width: 2000 * 0.735, left: -92, top: -147 }}
          />
        </div>
      </AbsoluteFill>
    </Background>
  );
}

export function IntroScene() {
  const logo = useEntrance(0);
  const name = useEntrance(10);
  const tagline = useEntrance(22);
  const chips = useEntrance(36);
  return (
    <Background>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 36 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          <div style={{ transform: `scale(${logo}) rotate(${interpolate(logo, [0, 1], [-25, 0])}deg)` }}>
            <Logo size={150} />
          </div>
          <div
            style={{
              fontSize: 150,
              fontWeight: 800,
              letterSpacing: -5,
              opacity: name,
              transform: `translateX(${interpolate(name, [0, 1], [-40, 0])}px)`,
            }}
          >
            Job<Highlight>Pilot</Highlight>
          </div>
        </div>
        <div style={{ fontSize: 44, color: colors.muted, fontWeight: 500, opacity: tagline }}>
          AI-powered hiring &amp; mock interview platform
        </div>
        <div style={{ display: "flex", gap: 18, marginTop: 12, opacity: chips }}>
          <Chip>AI voice interviews</Chip>
          <Chip accent="#60a5fa">Live video interviews</Chip>
          <Chip accent="#34d399">Coding assessments</Chip>
        </div>
      </AbsoluteFill>
    </Background>
  );
}

export function OutroScene() {
  const top = useEntrance(0);
  const stack = useEntrance(14);
  const linksIn = useEntrance(30);
  return (
    <Background>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 46 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 26, opacity: top, transform: `scale(${interpolate(top, [0, 1], [0.9, 1])})` }}>
          <Logo size={104} />
          <div style={{ fontSize: 100, fontWeight: 800, letterSpacing: -3 }}>
            Job<Highlight>Pilot</Highlight>
          </div>
        </div>
        <div style={{ fontSize: 34, color: colors.muted, opacity: top }}>Designed &amp; built end-to-end by Bismah Nasir</div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16, maxWidth: 1300, opacity: stack }}>
          {techStack.map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>
        <div style={{ display: "flex", gap: 28, marginTop: 10, opacity: linksIn, transform: `translateY(${interpolate(linksIn, [0, 1], [20, 0])}px)` }}>
          {[
            { label: "Live demo", value: links.live, bg: `linear-gradient(90deg, ${colors.purple}, ${colors.magenta})` },
            { label: "Source", value: links.github, bg: colors.card },
          ].map((l) => (
            <div
              key={l.label}
              style={{
                padding: "20px 34px",
                borderRadius: 18,
                background: l.bg,
                border: `1.5px solid ${colors.border}`,
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <span style={{ fontSize: 20, fontWeight: 600, opacity: 0.75, textTransform: "uppercase", letterSpacing: 2 }}>{l.label}</span>
              <span style={{ fontSize: 32, fontWeight: 700 }}>{l.value}</span>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </Background>
  );
}
