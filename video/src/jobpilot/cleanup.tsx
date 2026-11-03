import { AbsoluteFill, Img, staticFile } from "remotion";
import { fontFamily } from "./theme";

/*
 * Screenshots with test data ("Testing 2", "I am checking overall platform", typos)
 * get realistic text painted over them. Each patch covers one line with the
 * surrounding background colour and writes new text in the app's font (Inter).
 * Coordinates are in the screenshot's own pixels; `y` is the line's vertical centre.
 *
 * Rendered to public/jobpilot/screenshots/clean/ by `npm run clean:jobpilot`.
 */

type Patch = {
  x: number;
  y: number;
  w: number;
  text: string;
  kind: "title" | "body" | "lead";
  bg: string;
  color?: string;
};

const CARD = "#101828";
const PANEL = "#1e2939";

const styles = {
  title: { fontSize: 25, fontWeight: 600, color: "#ffffff", h: 40 },
  body: { fontSize: 17.5, fontWeight: 400, color: "#99a1af", h: 30 },
  lead: { fontSize: 20, fontWeight: 400, color: "#99a1af", h: 34 },
};

export const cleanScreens = {
  "candidate-dashboard": {
    src: "8.2 Candidate Dashboard.png",
    width: 1920,
    height: 1742,
    patches: [
      { x: 228, y: 227, w: 760, kind: "lead", bg: PANEL, text: "Access your upcoming interviews and preparations." },
      { x: 750, y: 978, w: 430, kind: "body", bg: CARD, text: "Node.js, Express, REST APIs & databases" },
      { x: 1246, y: 931, w: 430, kind: "title", bg: CARD, text: "System Design Round" },
      { x: 1246, y: 978, w: 430, kind: "body", bg: CARD, text: "Scalability, caching & API design" },
      { x: 254, y: 1194, w: 430, kind: "title", bg: CARD, text: "Full Stack Developer" },
      { x: 254, y: 1240, w: 430, kind: "body", bg: CARD, text: "React.js, Node.js & MongoDB" },
      { x: 750, y: 1194, w: 430, kind: "title", bg: CARD, text: "Behavioral Interview" },
      { x: 750, y: 1240, w: 430, kind: "body", bg: CARD, text: "Teamwork, ownership & communication" },
      { x: 254, y: 1527, w: 430, kind: "body", bg: CARD, text: "Performance, architecture & testing" },
    ],
  },
  "interview-config": {
    src: "8.3 Interview Configuration (Form-Based Generation).png",
    width: 1920,
    height: 922,
    patches: [
      {
        x: 654,
        y: 237,
        w: 600,
        kind: "lead",
        bg: PANEL,
        color: "#d1d5dc",
        text: "Customize your mock interview to suit your needs.",
      },
    ],
  },
  "interviewer-dashboard": {
    src: "A.2 High-Fidelity Design Interviewer Dashboard.png",
    width: 1920,
    height: 922,
    patches: [
      { x: 228, y: 227, w: 760, kind: "lead", bg: PANEL, text: "Manage your interviews and review candidates effectively." },
    ],
  },
} satisfies Record<string, { src: string; width: number; height: number; patches: Patch[] }>;

export type CleanScreenId = keyof typeof cleanScreens;

export function CleanScreen({ id }: { id: CleanScreenId }) {
  const screen = cleanScreens[id];
  return (
    <AbsoluteFill style={{ fontFamily }}>
      <Img src={staticFile(`jobpilot/screenshots/images/${screen.src}`)} />
      {screen.patches.map((p: Patch) => {
        const s = styles[p.kind];
        return (
          <div
            key={`${p.x},${p.y}`}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y - s.h / 2,
              width: p.w,
              height: s.h,
              paddingLeft: 3,
              background: p.bg,
              display: "flex",
              alignItems: "center",
              fontSize: s.fontSize,
              fontWeight: s.fontWeight,
              color: p.color ?? s.color,
              whiteSpace: "nowrap",
            }}
          >
            {p.text}
          </div>
        );
      })}
    </AbsoluteFill>
  );
}
