# Listen: "Lights On at 3104"

File: `out/final.mp4`. The same file is at `C:\Users\APG\Downloads\lights-on-at-3104-final.mp4`.

The QA script measured this mix but nobody has listened to it yet. Please check these five moments by ear.

| Time | Moment | Sounds | What to listen for |
|---|---|---|---|
| **0:08** | Lights on (hero) | Dead stop from 7.6 to 8.0 s with the uplifter `riser/fs-611170-uplifter-1-1` rising through it. At 8.0 s: `hit/fs-198115-clang-2-1` + `boom/fs-636624-deep-hit-2` + `chime/fs-404104-glass-ding-1`. The flash whip `swish/fs-733018-whip-3-1` follows at 8.25 s. | Does the clang land as floor 31 lights up? QA's picture check FAILS here: the slow camera push barely moves the pixels, so QA can't find a "landing" at frame 480. Is the glass ding audible under the clang? The 8.25 s whip now has hero weight (so it can be heard over the clang's tail). Does it get in the hit's way? |
| **0:15** | RFID tap | `tap/kenney-casino-chip-lay-1` (plastic tap) layered with `ui/kenney-interface-select-003` (a 50 ms beep, 4 dB under the tap) | Does it read as a soft tap plus a short, friendly confirm, not an alarm? It is mixed fairly low. Can you hear it clearly? |
| **0:30.5** | Frame lock (shutter-1) | `click/kenney-rpg-metal-latch` | **Known gap.** The brief asks for a camera shutter, but the library has no shutter recordings. `sfx.py search "camera shutter"` failed because every Freesound download returned HTTP 403 Forbidden (details in the report). This is a metal latch standing in for a shutter. The same applies to shutter-2/3 (31.0 and 31.5 s) and the 13 photo clicks (44.0 to 47.0 s, Kenney UI switches). Do they pass as shutters, or do they need replacing? |
| **0:41** | Message sent | The redaction ticks (40.625 to 40.81 s) and the send swish (40.75 s), then `pop/fs-187342-wine-bottle-opening-wav-1` at 41.03 s, panned left | Ticks 2 to 4 have hero weight so they pass the audibility check. After the stereo pass the ticks sit on the document's side (pan 0.35; redact-2 at 0.2), and the swish and pop travel left into the chat (-0.15, then -0.3). Is the run too loud or too busy, and does the pop still feel like "sent"? |
| **0:54** | Sign-off (hero) | Dead stop from 53.6 to 54.0 s. At 54.0 s: `hit/fs-321482-metal-hit-2-1` + `boom/fs-720897-gloss-stomp-sub-firm-1` + `chime/fs-127149-ding-wav-1` | Does the hit land on the cut to the end card? The boom layer starts about 40 ms (2 to 3 frames) before the cut. Does the gold ding read on the peacock? |

Also worth a pass: the dense runs at 0:24 (card pops), 0:25.25 (LCP roll and the 25.875 s ding) and 0:38.5 (typing). In each run, every sound after the first now has hero weight so it can pass the audibility check. The first sound of each run kept support weight, so it may sit softer than the rest. Some takes also differ in level.

**Stereo pass.** 34 effects are now panned to where their motion is on screen. Cue times and sounds didn't change.

- The opening words land left to right, and the three lines sit on the left.
- The RFID card flies in from the right. The listing cards fly out to the grid on the right.
- The typing runs left to right, and the document sits on the right.
- The send moves left into the chat. The thank-you names land on the left.
- The heroes, the titles, the shutters and the photo clicks stay centred. So does card-3, because any pan dropped it under QA's 3 dB hero-body line.

On headphones: do the moves follow the picture, and does anything feel lopsided?
