// Synthesises an original, royalty-free background track: a soft pad over an
// F–C–G–Am loop with a gentle arpeggio and a light kick, at 100 BPM.
//   node scripts/make-music.mjs [seconds=60] [out=public/music/ambient.mp3]
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const seconds = Number(process.argv[2] ?? 60);
const out = process.argv[3] ?? "public/music/ambient.mp3";
const RATE = 44100;
const BPM = 100;
const BEAT = 60 / BPM;
const BAR = BEAT * 4;
const CHORD_LEN = BAR * 2;

const midiHz = (m) => 440 * 2 ** ((m - 69) / 12);
// [bass root, pad voicing, arpeggio notes] as MIDI numbers
const chords = [
  [41, [57, 60, 64, 65], [65, 69, 72, 76]], // Fmaj7
  [36, [55, 60, 64, 67], [67, 72, 76, 79]], // C
  [43, [55, 59, 62, 67], [67, 71, 74, 79]], // G
  [45, [57, 60, 64, 69], [69, 72, 76, 81]], // Am
];

const n = Math.ceil(seconds * RATE);
const L = new Float32Array(n);
const R = new Float32Array(n);

// Pad: soft additive tone, two detuned copies spread left/right, crossfaded per chord.
const padTone = (hz, t) => {
  let v = 0;
  for (let h = 1; h <= 5; h++) v += Math.sin(2 * Math.PI * hz * h * t) / (h * h);
  return v;
};
for (let i = 0; i < n; i++) {
  const t = i / RATE;
  const idx = Math.floor(t / CHORD_LEN);
  const local = t - idx * CHORD_LEN;
  const fadeIn = Math.min(1, local / 0.8);
  let l = 0;
  let r = 0;
  // Current chord, plus the previous one's tail for a smooth change.
  for (const [k, gain] of [
    [idx, fadeIn],
    [idx - 1, 1 - fadeIn],
  ]) {
    if (k < 0 || gain <= 0) continue;
    const [bass, pad] = chords[k % chords.length];
    for (const m of pad) {
      const hz = midiHz(m);
      l += gain * padTone(hz * 0.9977, t);
      r += gain * padTone(hz * 1.0023, t);
    }
    const b = gain * 1.6 * Math.sin(2 * Math.PI * midiHz(bass) * t);
    l += b;
    r += b;
  }
  const swell = 0.85 + 0.15 * Math.sin((2 * Math.PI * t) / (CHORD_LEN * 2));
  L[i] += l * 0.05 * swell;
  R[i] += r * 0.05 * swell;
}

// Arpeggio: plucked sine eighth notes with a ping-pong echo.
const EIGHTH = BEAT / 2;
const pattern = [0, 1, 2, 3, 2, 1, 2, 3];
const pluckLen = Math.floor(0.9 * RATE);
for (let s = 0; s * EIGHTH < seconds; s++) {
  const start = s * EIGHTH;
  if (start < BAR) continue; // let the pad breathe for the first bar
  const [, , arp] = chords[Math.floor(start / CHORD_LEN) % chords.length];
  const hz = midiHz(arp[pattern[s % pattern.length]]);
  const accent = s % 2 === 0 ? 1 : 0.7;
  for (const [delay, gl, gr] of [
    [0, 1, 1],
    [EIGHTH * 3, 0.45, 0.1],
    [EIGHTH * 6, 0.1, 0.3],
  ]) {
    const i0 = Math.floor((start + delay) * RATE);
    for (let j = 0; j < pluckLen && i0 + j < n; j++) {
      const t = j / RATE;
      const env = Math.min(1, t / 0.005) * Math.exp(-t * 5);
      const v = accent * env * (Math.sin(2 * Math.PI * hz * t) + 0.25 * Math.sin(4 * Math.PI * hz * t)) * 0.07;
      L[i0 + j] += v * gl;
      R[i0 + j] += v * gr;
    }
  }
}

// Kick: soft pitch-dropping sine on every beat after the intro bars.
const kickLen = Math.floor(0.35 * RATE);
for (let b = 0; b * BEAT < seconds; b++) {
  const start = b * BEAT;
  if (start < BAR * 2) continue;
  const i0 = Math.floor(start * RATE);
  let phase = 0;
  for (let j = 0; j < kickLen && i0 + j < n; j++) {
    const t = j / RATE;
    phase += (2 * Math.PI * (45 + 70 * Math.exp(-t * 30))) / RATE;
    const v = Math.sin(phase) * Math.exp(-t * 9) * (b % 4 === 0 ? 0.32 : 0.22);
    L[i0 + j] += v;
    R[i0 + j] += v;
  }
}

// Normalise, fade the ends, write 16-bit WAV, then encode to MP3.
let peak = 0;
for (let i = 0; i < n; i++) peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
const gain = 0.85 / peak;
const pcm = Buffer.alloc(n * 4);
for (let i = 0; i < n; i++) {
  const t = i / RATE;
  const edge = Math.min(1, t / 1.5, (seconds - t) / 3);
  pcm.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i] * gain * edge)) * 32767), i * 4);
  pcm.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[i] * gain * edge)) * 32767), i * 4 + 2);
}
const header = Buffer.alloc(44);
header.write("RIFF", 0);
header.writeUInt32LE(36 + pcm.length, 4);
header.write("WAVEfmt ", 8);
header.writeUInt32LE(16, 16);
header.writeUInt16LE(1, 20);
header.writeUInt16LE(2, 22);
header.writeUInt32LE(RATE, 24);
header.writeUInt32LE(RATE * 4, 28);
header.writeUInt16LE(4, 32);
header.writeUInt16LE(16, 34);
header.write("data", 36);
header.writeUInt32LE(pcm.length, 40);

mkdirSync(dirname(out), { recursive: true });
const wav = out.replace(/\.mp3$/, ".wav");
writeFileSync(wav, Buffer.concat([header, pcm]));
execFileSync("npx", ["remotion", "ffmpeg", "-loglevel", "error", "-y", "-i", wav, "-c:a", "libmp3lame", "-b:a", "192k", out], {
  stdio: "inherit",
  shell: process.platform === "win32",
});
rmSync(wav);
console.log(`${out} (${seconds}s)`);
