import { AbsoluteFill, Img, staticFile } from "remotion";
import { Background, BrowserFrame, Chip, Highlight } from "./components";
import { Logo } from "./Logo";
import { colors, links } from "./theme";

const img = (name: string) => staticFile(`jobpilot/screenshots/images/${name}`);

/** Thumbnail shown before the demo video plays. */
export function JobPilotPoster() {
  return (
    <Background>
      <AbsoluteFill style={{ flexDirection: "row", alignItems: "center", padding: "0 0 0 120px" }}>
        <div style={{ width: 760, display: "flex", flexDirection: "column", gap: 34, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
            <Logo size={110} />
            <div style={{ fontSize: 112, fontWeight: 800, letterSpacing: -4 }}>
              Job<Highlight>Pilot</Highlight>
            </div>
          </div>
          <div style={{ fontSize: 50, fontWeight: 700, lineHeight: 1.15, letterSpacing: -1 }}>
            AI mock interviews &amp; <Highlight>live technical hiring</Highlight>, in one platform
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            <Chip>VAPI voice AI</Chip>
            <Chip>Gemini feedback</Chip>
            <Chip accent="#60a5fa">Stream video</Chip>
            <Chip accent="#34d399">Live coding</Chip>
          </div>
          <div style={{ fontSize: 26, color: colors.muted }}>{links.live}</div>
        </div>

        <div style={{ position: "relative", flex: 1, height: "100%" }}>
          <div
            style={{
              position: "absolute",
              left: 90,
              top: 150,
              transform: "perspective(2200px) rotateY(-14deg) rotateX(4deg)",
              transformOrigin: "left center",
            }}
          >
            <BrowserFrame url={links.live} width={1180} height={680}>
              <Img
                src={staticFile("jobpilot/screenshots/clean/candidate-dashboard.png")}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
              />
            </BrowserFrame>
          </div>
          <div
            style={{
              position: "absolute",
              left: 20,
              top: 640,
              width: 560,
              height: 300,
              borderRadius: 20,
              overflow: "hidden",
              border: `1.5px solid ${colors.border}`,
              boxShadow: "0 30px 90px rgba(0,0,0,0.6), 0 0 0 1px rgba(168,85,247,0.25)",
            }}
          >
            <Img
              src={img("8.5 AI Feedback Report.png")}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 6%" }}
            />
          </div>
        </div>
      </AbsoluteFill>
    </Background>
  );
}
