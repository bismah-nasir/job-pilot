import { loadFont } from "@remotion/google-fonts/Inter";

export const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

// Matches the JobPilot app's dark theme.
export const colors = {
  bg: "#0d1220",
  card: "#1b2232",
  border: "rgba(255,255,255,0.09)",
  text: "#f5f3ff",
  muted: "#a1a8b8",
  purple: "#9333ea",
  violet: "#a855f7",
  lilac: "#c084fc",
  magenta: "#c026d3",
};

export const links = {
  live: "job-pilot-lyart.vercel.app",
  github: "github.com/bismah-nasir/job-pilot",
};

export const techStack = [
  "Next.js",
  "TypeScript",
  "Convex",
  "Clerk",
  "Stream",
  "VAPI",
  "Gemini AI",
  "Monaco Editor",
  "Tailwind CSS",
];
