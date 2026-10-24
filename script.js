const FINAL_DOC = 'https://docs.google.com/document/d/1upc9vZWQnebAmPONFpKgK_Voh4JEf8vPatQ-4S4cu_0/edit?usp=sharing';
const STORAGE_KEY = 'the-door-was-left-open:v6';
const MAZE_SIZE = 21;
const START = { row: 1, col: 1 };
const MOVE_INTERVAL_MS = 2000;

const APOLOGIES = {
  1: [
    'I’m sorry for the times I was a total dick.',
    'I know I wasn’t always easy to be around. Sometimes I was rude for no reason, said things I didn’t mean, or let my anger get in the way of the people I cared about. I probably made things harder than they needed to be more times than I’d like to admit.',
    'I wish I could say I always knew when I was doing it, but I didn’t. Sometimes I only realized afterward, when the moment had already passed and there was nothing I could do except think about what I should’ve said instead.',
    'But despite all of that, I’m glad I got to know you.',
    'I’m glad for the stupid conversations, the arguments, the jokes that probably weren’t even funny, and all the little moments that I didn’t realize would mean so much later.',
    'I’m sorry I wasn’t always the person I should’ve been.',
    'And if I ever made you feel like you didn’t matter to me, I hope you know that you did.',
    'You always did.',
    'Thank you for staying, even when I made it difficult.',
    'I’ll remember the good things.',
    'I hope you do too.'
  ],
  2: [
    'I’m sorry I wasn’t good enough for you people.',
    'I tried. Maybe not always in the right ways, and maybe not as much as I should have, but I really did try.',
    'I know there were times when I disappointed you, when I wasn’t there when you needed me, or when I made things worse instead of better. I know I could’ve been kinder. More patient. More understanding.',
    'Maybe I just wasn’t the person you needed me to be.',
    'And I’m sorry for that.',
    'I don’t blame you for getting tired of me. I don’t blame you for wanting something better, or for slowly becoming distant.',
    'I just wish I could’ve been enough.',
    'Still, thank you for giving me the chance to be part of your lives, even if it was only for a little while.',
    'I’ll always be grateful for that.',
    'I’m sorry I couldn’t be better.'
  ],
  3: [
    'Thank you for being with me.',
    'It’s been one hell of a ride, hasn’t it?',
    'Through all the good times, the bad times, the stupid arguments, the laughs, and everything in between, I’m genuinely grateful I got to experience all of it with you.',
    'I’m sorry for leaving. I know it might be sudden, and I know I probably could’ve handled things better.',
    'But despite everything, I wouldn’t trade the memories we made for anything.',
    'Thank you for staying with me for as long as you did.',
    'Take care of yourselves, and please don’t forget all the good times we had.',
    'It was one hell of a ride.',
    'I’m glad I got to share it with you.'
  ]
};

const ROOM_DATA = {
  argument: {
    kicker: 'THE ARGUMENT ROOM',
    title: 'The aftermath of something said too sharply.',
    icon: '1',
    copy: [
      'This room still carries the echo of things that were said too sharply.',
      'Two chairs are slightly out of place. Nothing looks broken. Somehow that makes it feel worse.',
      'There is a small brass key on the floor beneath one of them.'
    ],
    key: 1,
    found: 'You found Key 1. It feels heavier than it should be.'
  },
  distance: {
    kicker: 'THE DISTANCE ROOM',
    title: 'The space between people after something goes quiet.',
    icon: '2',
    copy: [
      'The silence here is different. It feels like something slowly drifted away.',
      'The room seems longer than it should be. At the far end, there is a key resting beneath a thin square of light.'
    ],
    key: 2,
    found: 'You found Key 2. It almost feels like an apology already.'
  },
  leaving: {
    kicker: 'THE LEAVING ROOM',
    title: 'An ending that hasn’t fully happened yet.',
    icon: '3',
    copy: [
      'This place feels like an ending that hasn’t fully happened yet.',
      'There is almost nothing here. Just a coat hook, an empty doorway, and a key sitting where someone might have paused before walking away.'
    ],
    key: 3,
    found: 'You found Key 3. This one only works when the others have already been used.'
  },
  regret: {
    kicker: 'THE REGRET ROOM',
    title: 'What you replay when you cannot change it anymore.',
    icon: '4',
    copy: [
      'This room is full of almosts.',
      'Almost another answer. Almost a better choice. Almost one more chance to say the right thing before the moment passed.',
      'Nothing here asks you to fix the past. It only asks you to admit that you wish it had gone differently.',
      'A pale key rests beside a page covered in crossed-out sentences.'
    ],
    key: 'regret',
    found: 'Key 4 is yours. Regret can be carried without letting it decide what comes next.'
  },
  sorrow: {
    kicker: 'THE SORROW ROOM',
    title: 'The quiet weight of what was lost.',
    icon: '5',
    copy: [
      'There is no argument here. No explanation. Just absence.',
      'The room feels larger because something that used to fill it is gone.',
      'You do not have to pretend it did not hurt.',
      'Another key waits beneath a weak, warm lamp.'
    ],
    key: 'sorrow',
    found: 'Key 5 is yours. Sorrow is proof that something mattered.'
  },
  acceptance: {
    kicker: 'THE ACCEPTANCE ROOM',
    title: 'A place where the past is finally allowed to stay in the past.',
    icon: '6',
    copy: [
      'Nothing in this room tries to rewrite what happened.',
      'The walls are marked, the floor is worn, and the old mistakes are still there.',
      'But they are no longer asking to be undone.',
      'A clear key rests in the center of the room.'
    ],
    key: 'acceptance',
    found: 'Key 6 is yours. Acceptance is not saying it was okay. It is saying it happened, and you can keep going.'
  },
  forgiveness: {
    kicker: 'THE FORGIVENESS ROOM',
    title: 'Not forgetting. Letting the weight down.',
    icon: '7',
    copy: [
      'The last room is warmer than the others.',
      'There is no demand to erase the hurt, excuse every mistake, or pretend nobody was wrong.',
      'Forgiveness here is smaller and more honest: you do not have to keep punishing yourself forever.',
      'A final brass key waits on a table in the light.'
    ],
    key: 'forgiveness',
    found: 'Key 7 is yours. Some things can be forgiven without ever becoming meaningless.'
  },
  finalkey: {
    kicker: 'THE LAST ROOM',
    title: 'The final key was never hidden very far.',
    icon: '—',
    copy: [
      'The room is almost completely empty.',
      'There is one final key in the center of it.',
      'It does not feel like another lock. It feels like permission to stop looking.',
      'When you take it, the last part will finally have somewhere to go.'
    ],
    key: 'final',
    found: 'You found the final key. There is nothing left to solve here.'
  }
};

const DEAD_ENDS = {
  deadend1: { kicker:'DEAD END', title:'The light doesn’t reach this far.', icon:'—', copy:['Whatever was here was taken a long time ago.','You can keep looking, but there is nothing required of you in this room.'] },
  deadend2: { kicker:'DEAD END', title:'You already know this way.', icon:'↶', copy:['Someone stood here for a long time. Then they left.','The path folds quietly back toward the hall.'], loop:true },
  deadend3: { kicker:'DEAD END', title:'Nothing left to find.', icon:'—', copy:['A small room with no furniture and no explanation.','The door was probably left open by accident.'] },
  deadend4: { kicker:'DEAD END', title:'Someone was here.', icon:'·', copy:['There is a faint warmth on the back of the chair.','It is already fading.'] }
};

const DOOR_JOKES = {
  rickroll: { kicker:'AN IMPORTANT DOOR', title:'A familiar sound comes from the other side.', icon:'♪', copy:['The door opens.','For a few seconds, there is absolutely no mistaking what you have found.','You have been here before. Probably.'], action:'rickroll' },
  softlock: { kicker:'THE SOFTLOCK ROOM', title:'The door closes behind you.', icon:'×', copy:['The handle turns. The door shuts.','It does not seem interested in opening again.','Congratulations. You have discovered a completely unnecessary softlock.'], action:'softlock' },
  fakekey: { kicker:'A KEY', title:'You found something that looks important.', icon:'?', copy:['There is a tiny key on the table.','You pick it up.','It is, unfortunately, a key to absolutely nothing.'], action:'fakekey' },
  loop: { kicker:'THE WRONG DOOR', title:'You walk through. You keep walking.', icon:'↶', copy:['The corridor bends.','Then it bends again.','Then, somehow, you are back where you started.'], action:'loop' },
  note: { kicker:'A NOTE', title:'This was meant for someone else.', icon:'—', copy:['There is a folded piece of paper on the floor.','It only says:','“not this one.”'], action:'note' },
  mirror: { kicker:'A MIRROR', title:'You expected a room. You found yourself.', icon:'◌', copy:['The mirror is old and slightly cloudy.','For a moment, it feels like someone is standing behind you.','There is nobody there.'], action:'mirror' }
};

const RICKROLL_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

function freshState() {
  return {
    entered: false,
    keys: {
      1:false, 2:false, 3:false,
      regret:false, sorrow:false,
      acceptance:false, forgiveness:false,
      final:false
    },
    locks: { 1:false, 2:false, 3:false },
    keywords: { sharp:false, enough:false },
    finalGateOpened: false,
    finalVisited: false,
    mazeStage: 1,
    roomVisits: {},
    maze: { row:1, col:1, nextMoveAt:0 }
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (!saved) return freshState();
    const base = freshState();
    return {
      ...base,
      ...saved,
      keys: { ...base.keys, ...(saved.keys || {}) },
      locks: { ...base.locks, ...(saved.locks || {}) },
      keywords: { ...base.keywords, ...(saved.keywords || {}) },
      roomVisits: saved.roomVisits || {},
      maze: { ...base.maze, ...(saved.maze || {}) }
    };
  } catch {
    return freshState();
  }
}

let state = loadState();
let mazeGrid = [];
let mazeSpecials = new Map();
let builtMazeStage = 0;
let toastTimer = null;
let movementHudTimer = null;
let musicFadeTimer = null;
let musicWanted = true;
let musicTrackStage = 0;

const app = document.getElementById('app');
const toast = document.getElementById('toast');

/* ----- Local instrumental soundtrack ----- */
const MUSIC_TRACKS = {
  1: { src:'assets/music/maze1-near-light.mp3', title:'Near Light — Ólafur Arnalds' },
  2: { src:'assets/music/maze2-on-the-nature-of-daylight.mp3', title:'On the Nature of Daylight — Max Richter' },
  3: { src:'assets/music/maze3-arrival-of-the-birds-and-transformation.mp3', title:'Arrival of the Birds & Transformation — The Cinematic Orchestra' }
};

const audioTracks = new Map();
Object.entries(MUSIC_TRACKS).forEach(([key, track]) => {
  const audio = new Audio(track.src);
  audio.preload = 'auto';
  audio.loop = true;
  audio.volume = 0;
  audioTracks.set(Number(key), audio);
});

function currentMusicVolume() {
  if (!musicWanted || state.finalGateOpened || state.finalVisited) return 0;
  const n = currentMazeLightLevel();
  if (state.mazeStage === 1) return [0.14,0.20,0.28,0.36][n] ?? 0.14;
  if (state.mazeStage === 2) return [0.16,0.25,0.34][n] ?? 0.16;
  if (state.mazeStage === 3) return [0.18,0.29,0.40][n] ?? 0.18;
  return 0;
}

function updateMusicHud() {
  const title = document.getElementById('music-title');
  const toggle = document.getElementById('music-toggle');
  if (!title || !toggle) return;
  const track = MUSIC_TRACKS[state.mazeStage];
  title.textContent = musicWanted && !state.finalGateOpened && !state.finalVisited ? (track?.title || 'Silence') : 'Silence';
  toggle.textContent = musicWanted ? 'Music: on' : 'Music: off';
  toggle.setAttribute('aria-pressed', String(musicWanted));
}

function fadeAudioTo(audio, target, duration=900) {
  if (!audio) return;
  clearInterval(musicFadeTimer);
  const start = Number.isFinite(audio.volume) ? audio.volume : 0;
  const end = Math.max(0, Math.min(1, target));
  if (Math.abs(start-end) < 0.01) {
    audio.volume = end;
    if (end === 0) audio.pause();
    return;
  }
  const began = performance.now();
  musicFadeTimer = setInterval(() => {
    const t = Math.min(1, (performance.now()-began)/duration);
    const eased = 1 - Math.pow(1-t, 3);
    audio.volume = start + (end-start)*eased;
    if (t >= 1) {
      clearInterval(musicFadeTimer);
      if (end === 0) audio.pause();
    }
  }, 40);
}

function stopMusic(instant=false) {
  musicTrackStage = 0;
  clearInterval(musicFadeTimer);
  for (const audio of audioTracks.values()) {
    if (instant) {
      audio.pause();
      audio.volume = 0;
    } else {
      fadeAudioTo(audio, 0, 700);
    }
  }
  updateMusicHud();
}

function playMusicForMaze(force=false) {
  updateMusicHud();
  if (!musicWanted || state.finalGateOpened || state.finalVisited) {
    stopMusic(true);
    return;
  }
  const audio = audioTracks.get(state.mazeStage);
  if (!audio) return;

  if (!force && musicTrackStage === state.mazeStage) {
    audio.play().catch(() => {});
    fadeAudioTo(audio, currentMusicVolume(), 700);
    return;
  }

  clearInterval(musicFadeTimer);
  for (const [stageKey, other] of audioTracks.entries()) {
    if (stageKey !== state.mazeStage) {
      other.pause();
      other.volume = 0;
    }
  }

  musicTrackStage = state.mazeStage;
  audio.currentTime = 0;
  audio.volume = 0;
  audio.play().then(() => fadeAudioTo(audio, currentMusicVolume(), 1600)).catch(() => {});
}

function setMusicWanted(on) {
  musicWanted = Boolean(on);
  updateMusicHud();
  if (musicWanted) playMusicForMaze(true); else stopMusic(true);
}

function syncMusicAfterKey() {
  updateMusicHud();
  if (!musicWanted || state.finalGateOpened || state.finalVisited) return;
  const audio = audioTracks.get(state.mazeStage);
  if (!audio) return;
  audio.play().catch(() => {});
  fadeAudioTo(audio, currentMusicVolume(), 1400);
}

/* ----- Save ----- */
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/* ----- Maze generation ----- */
function seededRng(seed=19012026) {
  let t = seed >>> 0;
  return () => {
    t += 0x6D2B79F5;
    let x=t;
    x=Math.imul(x^(x>>>15),x|1);
    x^=x+Math.imul(x^(x>>>7),x|61);
    return ((x^(x>>>14))>>>0)/4294967296;
  };
}

function shuffle(array, rng) {
  for(let i=array.length-1;i>0;i--) {
    const j=Math.floor(rng()* (i+1));
    [array[i],array[j]]=[array[j],array[i]];
  }
  return array;
}

function makeMaze(stage) {
  const grid=Array.from({length:MAZE_SIZE},()=>Array(MAZE_SIZE).fill('#'));
  const rng=seededRng(19012026 + stage*9176);
  const stack=[[1,1]];
  grid[1][1]='.';
  const dirs=[[2,0],[-2,0],[0,2],[0,-2]];
  while(stack.length) {
    const [r,c]=stack[stack.length-1];
    const candidates=shuffle(dirs.slice(),rng).filter(([dr,dc])=>{
      const nr=r+dr,nc=c+dc;
      return nr>0&&nr<MAZE_SIZE-1&&nc>0&&nc<MAZE_SIZE-1&&grid[nr][nc]==='#';
    });
    if(!candidates.length){ stack.pop(); continue; }
    const [dr,dc]=candidates[0];
    grid[r+dr/2][c+dc/2]='.';
    grid[r+dr][c+dc]='.';
    stack.push([r+dr,c+dc]);
  }
  return grid;
}

function isWalkable(row,col) {
  return row>=0&&row<MAZE_SIZE&&col>=0&&col<MAZE_SIZE&&mazeGrid[row]?.[col]==='.';
}

function floorCells() {
  const out=[];
  for(let r=1;r<MAZE_SIZE-1;r++) for(let c=1;c<MAZE_SIZE-1;c++) if(mazeGrid[r][c]==='.') out.push({row:r,col:c});
  return out;
}

function neighborCells(cell) {
  return [[1,0],[-1,0],[0,1],[0,-1]].map(([dr,dc])=>({row:cell.row+dr,col:cell.col+dc}))
    .filter(p=>isWalkable(p.row,p.col));
}

function mazeDistances() {
  const key=(r,c)=>`${r},${c}`;
  const dist=new Map([[key(1,1),0]]);
  const queue=[{row:1,col:1}];
  while(queue.length) {
    const here=queue.shift();
    const d=dist.get(key(here.row,here.col));
    for(const next of neighborCells(here)) {
      const k=key(next.row,next.col);
      if(!dist.has(k)){ dist.set(k,d+1); queue.push(next); }
    }
  }
  return dist;
}

function chooseSpecials(stage) {
  const dist=mazeDistances();
  const deadEnds=floorCells().filter(c=>neighborCells(c).length===1 && !(c.row===1&&c.col===1))
    .sort((a,b)=>dist.get(`${b.row},${b.col}`)-dist.get(`${a.row},${a.col}`));
  const all=floorCells().filter(c=>!(c.row===1&&c.col===1));
  const used=new Set(['1,1']);
  mazeSpecials.clear();

  function pick(ratio, source=deadEnds) {
    const available=source.filter(c=>!used.has(`${c.row},${c.col}`));
    const pool=available.length?available:all.filter(c=>!used.has(`${c.row},${c.col}`));
    if(!pool.length) return null;
    const maxD=Math.max(...pool.map(c=>dist.get(`${c.row},${c.col}`)));
    let best=pool[0], bestDiff=Infinity;
    for(const c of pool){
      const d=dist.get(`${c.row},${c.col}`);
      const diff=Math.abs(d-maxD*ratio);
      if(diff<bestDiff){best=c;bestDiff=diff;}
    }
    used.add(`${best.row},${best.col}`);
    return best;
  }

  function add(cell,special){ if(cell) mazeSpecials.set(`${cell.row},${cell.col}`,special); }

  if(stage===1){
    add(pick(.28),{type:'room',roomId:'argument'});
    add(pick(.54),{type:'room',roomId:'distance'});
    add(pick(.80),{type:'room',roomId:'leaving'});
    add(pick(.63,all),{type:'lock'});
    add(pick(.95),{type:'gate',gateId:'gate3',target:2});
  } else if(stage===2){
    add(pick(.38),{type:'room',roomId:'regret'});
    add(pick(.72),{type:'room',roomId:'sorrow'});
    add(pick(.96),{type:'gate',gateId:'gate2',target:3});
  } else {
    add(pick(.44),{type:'room',roomId:'acceptance'});
    add(pick(.73),{type:'room',roomId:'forgiveness'});
    add(pick(.96),{type:'finalGate'});
  }

  const jokes=['rickroll','softlock','fakekey','loop','note','mirror'];
  let index=0;
  for(const cell of deadEnds){
    const k=`${cell.row},${cell.col}`;
    if(used.has(k)||index>=jokes.length) continue;
    used.add(k);
    add(cell,{type:'joke',jokeId:jokes[index++]});
  }
}

function buildMaze(force=false) {
  if(!force && builtMazeStage===state.mazeStage && mazeGrid.length) { renderMaze(); return; }
  mazeGrid=makeMaze(state.mazeStage);
  chooseSpecials(state.mazeStage);
  builtMazeStage=state.mazeStage;
  if(!isWalkable(state.maze.row,state.maze.col)) {
    state.maze={...START,nextMoveAt:0};
    saveState();
  }
  renderMaze();
}

function currentMazeLightLevel() {
  if(state.finalGateOpened||state.finalVisited) return 0;
  if(state.mazeStage===1) return Number(state.keys[1])+Number(state.keys[2])+Number(state.keys[3]);
  if(state.mazeStage===2) return Number(state.keys.regret)+Number(state.keys.sorrow);
  if(state.mazeStage===3) return Number(state.keys.acceptance)+Number(state.keys.forgiveness);
  return 0;
}

function overallStage() {
  if(state.finalVisited||state.finalGateOpened) return 4;
  const n=currentMazeLightLevel();
  if(state.mazeStage===3) return n>=2 ? 3 : n;
  return Math.min(3,n);
}

function applyStage() {
  app.className=`app stage-${overallStage()}`;
}

function renderMaze() {
  const el=document.getElementById('maze');
  if(!el) return;
  const light=currentMazeLightLevel();
  el.className=`maze light-${Math.min(3,light)}${light>0?' key-pulse':''}`;
  el.innerHTML='';
  const fragment=document.createDocumentFragment();
  for(let r=0;r<MAZE_SIZE;r++) for(let c=0;c<MAZE_SIZE;c++) {
    const cell=document.createElement('div');
    const walkable=mazeGrid[r][c]==='.';
    cell.className=`maze-cell ${walkable?'floor':'wall'}`;
    const special=mazeSpecials.get(`${r},${c}`);
    if(special){
      cell.classList.add('special','door');
      const visitId=special.roomId || special.gateId || (special.type==='lock'?'lock-room':special.type==='finalGate'?'final-gate':`${state.mazeStage}:joke-${special.jokeId}`);
      if(state.roomVisits[visitId]) cell.classList.add('visited');
      if(special.type==='gate'||special.type==='finalGate'){
        cell.classList.add('gate-door');
        const locked=special.type==='gate'
          ? (special.gateId==='gate3' ? !state.locks[3] : !state.keys.regret||!state.keys.sorrow)
          : (!state.keys.acceptance||!state.keys.forgiveness);
        cell.classList.add(locked?'gate-locked':'gate-unlocked');
        const icon=document.createElement('span');
        icon.className='gate-icon';
        icon.textContent=locked?'🔒':'✦';
        icon.setAttribute('aria-hidden','true');
        cell.appendChild(icon);
      }
    }
    if(r===state.maze.row&&c===state.maze.col) cell.classList.add('player');
    fragment.appendChild(cell);
  }
  el.appendChild(fragment);
  updateMazeAction();
  updateMovementHud();
}

function currentSpecial(){ return mazeSpecials.get(`${state.maze.row},${state.maze.col}`)||null; }

function stageCopy() {
  if(state.mazeStage===1){
    return currentMazeLightLevel()===0
      ? 'The maze is dim. The air feels heavy. Somewhere inside it, several identical doors are waiting.'
      : currentMazeLightLevel()===1
        ? 'A little light has found its way between the walls. The doors are still here.'
        : currentMazeLightLevel()===2
          ? 'The corridors are easier to read now. The maze feels less hostile.'
          : 'The maze is warm with late light. You can almost see the way through.';
  }
  if(state.mazeStage===2){
    return currentMazeLightLevel()===0
      ? 'The second maze is dark again. The rooms are about what you wish you could undo.'
      : currentMazeLightLevel()===1
        ? 'The first room left a little light behind. The maze is still full of things that cannot be taken back.'
        : 'Sorrow has not disappeared, but the walls no longer feel quite as cold.';
  }
  return currentMazeLightLevel()===0
    ? 'The darkness is softer here. The next rooms are not asking for another apology.'
    : currentMazeLightLevel()===1
      ? 'The past is still here. It simply is not fighting you anymore.'
      : 'The last rooms are warm now. Nothing here asks you to become someone else.';
}

function updateHall() {
  const label=document.getElementById('maze-label');
  const title=document.getElementById('hall-title');
  const copy=document.getElementById('hall-copy');
  if(state.mazeStage===1){ label.textContent='THE FIRST MAZE'; title.textContent='A corridor with no straight way through.'; }
  if(state.mazeStage===2){ label.textContent='THE SECOND MAZE'; title.textContent='The things you could not change.'; }
  if(state.mazeStage===3){ label.textContent='THE THIRD MAZE'; title.textContent='What comes after the apology.'; }
  copy.textContent=state.finalGateOpened ? 'The last gate opened, and the light went with it.' : stageCopy();
}

function updateMazeAction() {
  const host=document.getElementById('maze-action');
  const progress=document.getElementById('maze-progress');
  if(!host||!progress) return;
  let found=0,total=0;
  if(state.mazeStage===1){found=Number(state.keys[1])+Number(state.keys[2])+Number(state.keys[3]);total=3;}
  if(state.mazeStage===2){found=Number(state.keys.regret)+Number(state.keys.sorrow);total=2;}
  if(state.mazeStage===3){found=Number(state.keys.acceptance)+Number(state.keys.forgiveness);total=2;}
  progress.textContent=`${found} / ${total} keys found`;

  const special=currentSpecial();
  host.innerHTML='';
  if(!special) return;
  const card=document.createElement('div');
  card.className='maze-action-card';
  const copy=document.createElement('div');
  copy.className='action-copy';
  let title='There is a door here.';
  let sub='You cannot tell what is on the other side.';
  if(special.type==='gate'||special.type==='finalGate'){ title='A different kind of door is here.'; sub='It is glowing faintly. The way beyond it is not ready yet.'; }
  else if(special.type==='lock'){ title='There is a heavy door here.'; sub='Three locks are waiting beyond it.'; }
  copy.innerHTML=`<strong>${title}</strong><span>${sub}</span>`;
  const button=document.createElement('button');
  button.className='primary-btn';
  button.textContent=special.type==='gate'||special.type==='finalGate'?'Open the gate':special.type==='lock'?'Enter the lock room':'Open the door';
  button.addEventListener('click',openCurrentSpecial);
  card.append(copy,button);
  host.appendChild(card);
}

function movementRemainingMs(){ return Math.max(0,Number(state.maze.nextMoveAt||0)-Date.now()); }

function updateMovementHud(){
  const el=document.getElementById('movement-status');
  if(!el) return;
  const remaining=movementRemainingMs();
  if(remaining<=0){ el.textContent='Next step available now.'; el.classList.remove('waiting'); }
  else { const sec=Math.ceil(remaining/1000); el.textContent=`Next step in ${sec}s.`; el.classList.add('waiting'); }
}

function startMovementHudTimer(){
  clearInterval(movementHudTimer);
  updateMovementHud();
  movementHudTimer=setInterval(()=>{
    if(document.getElementById('hall').classList.contains('active')) updateMovementHud();
  },250);
}

function movePlayer(dr,dc){
  if(!document.getElementById('hall').classList.contains('active')) return;
  const remaining=movementRemainingMs();
  if(remaining>0){
    const sec=Math.ceil(remaining/1000);
    showToast(`Slow down. The next step is in ${sec} second${sec===1?'':'s'}.`);
    return;
  }
  const nr=state.maze.row+dr,nc=state.maze.col+dc;
  if(!isWalkable(nr,nc)){ showToast('The wall does not move.'); return; }
  state.maze={row:nr,col:nc,nextMoveAt:Date.now()+MOVE_INTERVAL_MS};
  saveState();
  renderMaze();
  focusMaze();
}

function focusMaze(){ const maze=document.getElementById('maze'); if(maze&&document.activeElement!==maze) maze.focus({preventScroll:true}); }

function showToast(message){
  toast.textContent=message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>toast.classList.remove('show'),3000);
}

function show(screenId){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  const screen=document.getElementById(screenId);
  if(screen) screen.classList.add('active');
  window.scrollTo({top:0,behavior:'instant'});
  applyStage();
  if(screenId==='hall'){
    updateHall();
    buildMaze();
    playMusicForMaze();
    startMovementHudTimer();
    setTimeout(focusMaze,80);
  }
}

function renderRoom(roomId){
  const data=ROOM_DATA[roomId]||DEAD_ENDS[roomId];
  if(!data) return;
  const area=document.getElementById('room-action-area');
  document.getElementById('room-kicker').textContent=data.kicker;
  document.getElementById('room-title').textContent=data.title;
  document.getElementById('room-icon').textContent=data.icon;
  const copy=document.getElementById('room-description');
  copy.innerHTML=data.copy.map(p=>`<p>${escapeHtml(p)}</p>`).join('');
  area.innerHTML='';
  const visitId=roomId;
  state.roomVisits[visitId]=true;

  if(data.key){
    const block=document.createElement('div');
    block.className='finding';
    if(state.keys[data.key]){
      block.innerHTML=`<strong>You already took what mattered from here.</strong><span>${escapeHtml(data.found)}</span>`;
      if(data.key==='final') appendFinalLink(block);
    } else {
      block.innerHTML='<strong>There is something waiting here.</strong><span>Take what was left for you.</span>';
      const button=document.createElement('button');
      button.className='primary-btn';
      const label=data.key==='final'?'Take the final key':`Take key ${keyDisplay(data.key)}`;
      button.textContent=label;
      button.addEventListener('click',()=>{
        state.keys[data.key]=true;
        saveState();
        applyStage();
        renderMaze();
        triggerKeyPulse();
        syncMusicAfterKey();
        block.innerHTML=`<strong>You found something that mattered.</strong><span>${escapeHtml(data.found)}</span>`;
        if(data.key==='final') appendFinalLink(block); else appendReturnButton(block);
      });
      block.appendChild(button);
    }
    area.appendChild(block);
  } else appendReturnButton(area);

  saveState();
  show('room');
}

function keyDisplay(key){
  return String(key).replace('regret','4').replace('sorrow','5').replace('acceptance','6').replace('forgiveness','7');
}

function appendReturnButton(host){
  const button=document.createElement('button');
  button.className='text-btn large';
  button.textContent='Return to the maze';
  button.addEventListener('click',goHall);
  host.appendChild(button);
}

function appendFinalLink(host){
  const wrap=document.createElement('div');
  wrap.className='final-link-wrap';
  wrap.innerHTML='<p>You’ve reached the end of the maze.</p><p>The last part isn’t here.</p><p>It’s waiting for you here:</p>';
  const link=document.createElement('a');
  link.className='final-link';
  link.href=FINAL_DOC;
  link.target='_blank';
  link.rel='noopener';
  link.textContent='Open the final goodbye';
  link.dataset.finalLink='true';
  wrap.appendChild(link);
  host.appendChild(wrap);
}

function appendFinalTransitionNote(host){
  const note=document.createElement('div');
  note.className='transition-note';
  note.innerHTML='<p>The third lock opens.</p><p>Somewhere inside the maze, a gate that was once impossible to open is waiting for you.</p><p>The light will not stay with you forever.</p>';
  host.appendChild(note);
}

function renderLocks(){
  document.querySelectorAll('.lock-panel').forEach(panel=>{
    const id=Number(panel.dataset.lock);
    const label=panel.querySelector('.lock-state');
    const button=panel.querySelector('.lock-btn');
    const content=panel.querySelector('.lock-content');
    if(state.locks[id]){
      panel.classList.add('opened');
      label.textContent='OPEN';
      button.textContent='Opened';
      button.disabled=true;
      content.hidden=false;
      content.innerHTML=apologyHTML(id);
    } else {
      panel.classList.remove('opened');
      label.textContent='CLOSED';
      button.disabled=false;
      button.textContent=`Try Key ${id}`;
      content.hidden=true;
      content.innerHTML='';
    }
  });
  document.getElementById('lock-note').textContent='';
}

function apologyHTML(id){
  const body=APOLOGIES[id].map(p=>`<p>${escapeHtml(p)}</p>`).join('');
  if(id===1) return `<div class="apology">${body}</div><div class="keyword-note">Keyword gained: <span class="keyword">sharp</span></div>`;
  if(id===2) return `<div class="apology">${body}</div><div class="keyword-note">Keyword gained: <span class="keyword">enough</span></div>`;
  return `<div class="apology">${body}</div><div class="transition-note"><p>The third lock opens.</p><p>Somewhere inside the maze, a gate that was once impossible to open is waiting for you.</p><p>The light will not stay with you forever.</p></div>`;
}

function attemptLock(id){
  if(state.locks[id]) return;
  if(id===1&&!state.keys[1]) return showLockMessage('The first lock is still waiting for its key.');
  if(id===2&&!state.keys[2]) return showLockMessage('The second lock is still waiting for its key.');
  if(id===3){
    if(!state.keys[3]) return showLockMessage('The heaviest lock is still waiting for the key that came last.');
    if(!state.keywords.sharp||!state.keywords.enough) return showLockMessage('Still missing what came before. Two words have not been spoken yet.');
  }
  state.locks[id]=true;
  if(id===1) state.keywords.sharp=true;
  if(id===2) state.keywords.enough=true;
  state.roomVisits[`lock-${id}`]=true;
  saveState();
  renderLocks();
  renderMaze();
  applyStage();
  showToast(id===3?'The third lock opens.':'The lock gives way.');
}

function showLockMessage(message){ document.getElementById('lock-note').textContent=message; }

function enterMaze(stageNumber){
  state.mazeStage=stageNumber;
  state.maze={...START,nextMoveAt:0};
  saveState();
  buildMaze(true);
  show('hall');
  playMusicForMaze(true);
  showToast(stageNumber===2?'The gate opens. Another maze waits beyond it.':'You step through. This part feels different.');
}

function openCurrentSpecial(){
  const special=currentSpecial();
  if(!special) return;

  if(special.type==='lock'){
    state.roomVisits['lock-room']=true;
    saveState();
    renderLocks();
    show('locks');
    return;
  }

  if(special.type==='room'){
    renderRoom(special.roomId);
    return;
  }

  if(special.type==='joke'){
    openJokeDoor(special.jokeId);
    return;
  }

  if(special.type==='gate'){
    if(special.gateId==='gate3'){
      if(!state.locks[3]) return showToast('The gate will not move. Something is still missing from the room behind you.');
      enterMaze(2);
      return;
    }
    if(special.gateId==='gate2'){
      if(!state.keys.regret||!state.keys.sorrow) return showToast('The gate stays shut. Regret and sorrow must be carried first.');
      enterMaze(3);
      return;
    }
  }

  if(special.type==='finalGate'){
    if(!state.keys.acceptance||!state.keys.forgiveness) return showToast('The final gate stays closed. Two things still need to be accepted.');
    state.finalGateOpened=true;
    state.roomVisits['final-gate']=true;
    saveState();
    stopMusic(true);
    applyStage();
    showToast('The final gate opens. The light goes with it.');
    renderMaze();
    setTimeout(()=>renderRoom('finalkey'),450);
  }
}

function openJokeDoor(jokeId){
  const data=DOOR_JOKES[jokeId];
  if(!data) return;
  state.roomVisits[`${state.mazeStage}:joke-${jokeId}`]=true;
  saveState();
  document.getElementById('room-kicker').textContent=data.kicker;
  document.getElementById('room-title').textContent=data.title;
  document.getElementById('room-icon').textContent=data.icon;
  document.getElementById('room-description').innerHTML=data.copy.map(p=>`<p>${escapeHtml(p)}</p>`).join('');
  const area=document.getElementById('room-action-area');
  area.innerHTML='';

  if(data.action==='rickroll'){
    const a=document.createElement('a');
    a.className='primary-btn inline-btn';
    a.href=RICKROLL_URL;
    a.target='_blank';
    a.rel='noopener';
    a.textContent='Open the suspiciously familiar link';
    area.appendChild(a);
  } else if(data.action==='softlock'){
    const button=document.createElement('button');
    button.className='primary-btn';
    button.textContent='Try the handle again';
    let attempts=0;
    button.addEventListener('click',()=>{
      attempts++;
      if(attempts<3){ button.textContent=attempts===1?'Nothing.':'Still nothing.'; showToast('The door refuses to cooperate.'); }
      else { button.textContent='Okay, it opens.'; button.disabled=true; setTimeout(goHall,700); }
    });
    area.appendChild(button);
  } else if(data.action==='loop'){
    const button=document.createElement('button');
    button.className='primary-btn';
    button.textContent='Go back';
    button.addEventListener('click',()=>{ state.maze={...START,nextMoveAt:0}; saveState(); showToast('You somehow ended up back at the entrance.'); goHall(); });
    area.appendChild(button);
  } else appendReturnButton(area);

  show('room');
}

function goHall(){ show('hall'); }

function escapeHtml(text){ return String(text).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[c])); }

/* ----- Interaction ----- */
document.addEventListener('click',event=>{
  const lockButton=event.target.closest('[data-lock-open]');
  if(lockButton){ attemptLock(Number(lockButton.dataset.lockOpen)); return; }

  if(event.target.closest('#music-toggle')){
    setMusicWanted(!musicWanted);
    return;
  }

  const finalLink=event.target.closest('[data-final-link]');
  if(finalLink){
    state.finalVisited=true;
    state.finalGateOpened=true;
    saveState();
    stopMusic(true);
    applyStage();
    setTimeout(()=>show('ending'),120);
    return;
  }

  const action=event.target.closest('[data-action]')?.dataset.action;
  if(!action) return;
  if(action==='enter'){
    state.entered=true;
    if(!state.maze || !Number.isFinite(state.maze.row)) state.maze={...START,nextMoveAt:0};
    saveState();
    buildMaze(true);
    show('hall');
    playMusicForMaze(true);
  }
  if(action==='hall') goHall();
});

document.addEventListener('keydown',event=>{
  if((event.ctrlKey||event.metaKey)&&event.shiftKey&&event.key.toLowerCase()==='r'){
    event.preventDefault();
    localStorage.removeItem(STORAGE_KEY);
    stopMusic(true);
    state=freshState();
    mazeGrid=[];
    mazeSpecials.clear();
    builtMazeStage=0;
    applyStage();
    show('entrance');
    showToast('Progress reset.');
    return;
  }

  if(!document.getElementById('hall').classList.contains('active')) return;
  if(['INPUT','TEXTAREA'].includes(document.activeElement?.tagName)) return;
  const dirs={arrowup:[-1,0],w:[-1,0],arrowdown:[1,0],s:[1,0],arrowleft:[0,-1],a:[0,-1],arrowright:[0,1],d:[0,1]};
  const k=event.key.toLowerCase();
  if(dirs[k]){ event.preventDefault(); movePlayer(...dirs[k]); }
  else if(event.key==='Enter'){ event.preventDefault(); openCurrentSpecial(); }
});

function triggerKeyPulse(){
  renderMaze();
}

applyStage();
updateMusicHud();
if(state.entered){
  buildMaze(true);
  show('hall');
} else {
  show('entrance');
}
