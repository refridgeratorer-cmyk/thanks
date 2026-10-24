# The Door Was Left Open — ARG

Self-contained maze ARG prototype.

## Current structure
- Maze 1: apology / three keys / three locks / Gate 3
- Maze 2: regret + sorrow / Gate 2
- Maze 3: acceptance + forgiveness / final glowing gate / final key
- Final key opens the Google Doc goodbye

## Movement
Successful movement is limited to **5 steps per minute** (one successful step every 12 seconds). The cooldown is saved in localStorage.

## Music
The site now uses the user-provided MP3s locally:
- `assets/music/maze1-near-light.mp3`
- `assets/music/maze2-on-the-nature-of-daylight.mp3`
- `assets/music/maze3-arrival-of-the-birds-and-transformation.mp3`

Music volume rises as keys are collected. The final gate cuts the music to silence.

## Save
Progress is stored in the browser using `localStorage`. Ctrl+Shift+R resets the current save.

## Run
Open `index.html` directly, or serve the folder with a small static server such as `python -m http.server 8000`.
