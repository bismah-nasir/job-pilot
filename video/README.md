# JobPilot demo video

Remotion project for the JobPilot demo video and poster. It is separate from
the app (own `package.json`), so run every command from this `video/` folder.

```bash
npm install
npm run studio    # preview and tweak in the browser
npm run music     # regenerate the background track (public/music/ambient.mp3)
npm run clean     # repaint test data in screenshots → screenshots/clean/
npm run clips     # re-cut interview highlights from the raw recording
npm run render    # → out/demo.mp4
npm run poster    # → out/poster.jpg
```

The video uses screenshots (`public/jobpilot/screenshots/app/`) and silent screen
recordings (`public/jobpilot/captures/`) of the app, plus the VAPI interview clips.
Recording segments (`from`/`to` seconds and playback `rate`) are set at the top of
`src/jobpilot/Demo.tsx`.

- Screens and diagrams: `public/jobpilot/screenshots/`
- Raw recording (git-ignored, too large): `public/jobpilot/recordings/`
- Interview highlights: edit the `from`/`to` seconds in `src/jobpilot/clips.json`,
  then run `npm run clips`.
- Scene order, durations, captions and music volume: `src/jobpilot/Demo.tsx`.
- Replacement text for test data in screenshots: `src/jobpilot/cleanup.tsx`
  (run `npm run clean` after editing). Once you have new real screenshots,
  drop them in `screenshots/images/` and point the scenes back at them.
- Music is original (synthesised by `scripts/make-music.mjs`), so there are no licence
  issues. To use a track of your own, replace `public/music/ambient.mp3`.

The portfolio uses `out/demo.mp4` and `out/poster.jpg`; copy them to the
portfolio's `public/projects/jobpilot/` after rendering.
