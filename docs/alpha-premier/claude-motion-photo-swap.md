# Claude Motion: photo swap in "Lights On at 3104"

Send this whole folder to the Claude Motion project that made the reel:

- `071_photo_src0481.jpg`: new photo for slot 2 (2048×1536, no EXIF or GPS)
- `077_photo_src0475.jpg`: new photo for slot 10 (2048×1536, no EXIF or GPS)
- `current-montage.jpg`: the montage as it is now, each slot labelled with its start time
- `PROMPT.md`: this file. Paste the block below.

```
Change the photo montage in this reel (S6, 0:44–0:48) and nothing else.
current-montage.jpg shows the 13 slots as they are now. Each slot lasts 15 frames
(0.25 s at 60 fps). Slot k starts at frame 2640 + 15 × (k − 1), and slot 13 is the
1 s hold.

FOUR SLOT CHANGES
- Slot 2 (0:44.25, frames 2655–2669): replace photo 065 (someone at a laptop by the
  wall TV, a "Waiting for others to join" screen) with the attached 071_photo_src0481.jpg
  (Deign filming in the lobby under the Alpha Premier sign).
- Slot 5 (0:45.00, frames 2700–2714): move photo 073 here from slot 9 (Deign behind the
  tripod in the doorway, a colleague adjusting it).
- Slot 9 (0:46.00, frames 2760–2774): move photo 047 here from slot 5 (Deign standing
  with the red camera in the office).
- Slot 10 (0:46.25, frames 2775–2789): replace photo 119 (a woman making a peace sign
  at the front desk, beside a gold dragon figure) with the attached 077_photo_src0475.jpg
  (Deign laughing behind the tripod in the doorway, a colleague adjusting one of its legs).

Treat every photo exactly like the photos around it: the same 6:5 crop, size, position,
entrance and cut. For the two new photos, centre the 6:5 crop on Deign's face and the
camera, with his face in the upper third. In 077, keep the colleague's hand on the tripod
in frame. Remove photos 065 and 119 from the project completely so neither can appear
anywhere.

The other slots stay exactly as they are: 1, 3, 4, 6, 7, 8, 11, 12 and the slot-13 hold.

KEEP EVERYTHING ELSE IDENTICAL
A sound layer is already synced, frame by frame, to the current cut. So:
- Same length (58.0 s), same resolution (1920×1080), same frame rate (60 fps).
- Don't move, add, remove or retime any cut, shot, text, transition or ease, anywhere.
  The montage keeps 13 slots of 15 frames, plus the hold, on the same frames.
- Don't change the music, its timing or its level.
- Don't change the stings.

Before you export, compare the new render with the current version frame by frame.
Only frames 2655–2669, 2700–2714 and 2760–2789 may differ. Every other frame must be
identical.

EXPORT
Render the full reel as MP4 with the same settings as last time.
```

## When the new MP4 comes back

The cue sheet's times stay valid: only the pictures inside four slots change, and each
slot keeps its frames. Put the new MP4 in `C:\Users\APG\Downloads\lights-on-sound\` and
lay the existing mix over it:

1. Keep the new export as the picture: `reel.mp4`. Never use its own audio track. If its music
   differs from the last export, rebuild the bed first: `ffmpeg -i reel.mp4 -vn -ac 2 -ar 48000 audio/music.wav`,
   then `python tools/widen.py audio/music.wav audio/music-wide.wav -6`, then
   `uv run sound-layer/scripts/mix.py audio/cues.json`.
2. Mux the existing mix: `ffmpeg -i reel.mp4 -i audio/mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 256k -shortest out/final.mp4`
3. Run `uv run sound-layer/scripts/qa.py out/final.mp4`. The offset check must read 0 samples,
   and the picture checks should match the last run: 1 FAIL (lights-on) and 2 WARN.
4. For the site, copy the new picture stream and the same mix into `public/alpha-premier/reel/reel.mp4`.
