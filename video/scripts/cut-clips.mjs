// Cuts the highlight clips listed in a clips.json out of a long screen recording,
// so the composition (and git) only deal with a few small files.
//   node scripts/cut-clips.mjs jobpilot
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync } from "node:fs";

const project = process.argv[2];
if (!project) throw new Error("Usage: node scripts/cut-clips.mjs <project>");

const { source, clips } = JSON.parse(readFileSync(`src/${project}/clips.json`, "utf8"));
const outDir = `public/${project}/clips`;
mkdirSync(outDir, { recursive: true });

for (const { name, from, to } of clips) {
  const out = `${outDir}/${name}.mp4`;
  console.log(`${out}  (${from}s → ${to}s)`);
  // Remotion ships its own ffmpeg, so no separate install is needed.
  execFileSync(
    "npx",
    [
      "remotion", "ffmpeg", "-loglevel", "error", "-y",
      "-ss", String(from), "-to", String(to), "-i", source,
      "-c:v", "libx264", "-crf", "22", "-preset", "medium", "-pix_fmt", "yuv420p",
      "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart",
      out,
    ],
    { stdio: "inherit", shell: process.platform === "win32" },
  );
}
