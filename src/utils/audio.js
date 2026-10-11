/* ── AUDIO MANAGER ──
   Handles intro → menu music crossfade. Lazily initialized on
   first user interaction (browsers block autoplay with sound
   until then).
═══════════════════════════════════════════ */
const audioMgr = (() => {
  let introAudio = null;
  let menuAudio  = null;
  let started    = false;

  const create = (src, loop = true, volume = 0.0) => {
    const a = new Audio(src);
    a.loop   = loop;
    a.volume = volume;
    a.preload = 'auto';
    return a;
  };

  const fadeTo = (audio, targetVol, duration = 1500) => {
    if (!audio) return;
    const steps   = 40;
    const interval = duration / steps;
    const delta   = (targetVol - audio.volume) / steps;
    let step = 0;
    const ticker = setInterval(() => {
      step++;
      audio.volume = Math.max(0, Math.min(1, audio.volume + delta));
      if (step >= steps) {
        clearInterval(ticker);
        audio.volume = targetVol;
        if (targetVol === 0) { audio.pause(); audio.currentTime = 0; }
      }
    }, interval);
  };

  return {
    init() {
      if (started) return;
      started = true;
      introAudio = create('/intro-music.mp3', false, 0);
      menuAudio  = create('/Time_Flows_Ever_Onward.mp3', true, 0);
      introAudio.load();
      menuAudio.load();
    },

    playIntro() {
      if (!introAudio) return;
      introAudio.currentTime = 0;
      introAudio.play().catch(() => {});
      fadeTo(introAudio, 0.55, 1800);
    },

    transitionToMenu() {
      // Fade out intro, fade in menu
      fadeTo(introAudio, 0, 1400);
      if (menuAudio) {
        menuAudio.currentTime = 0;
        menuAudio.play().catch(() => {});
        fadeTo(menuAudio, 0.45, 2000);
      }
    },

    stopMenu() {
      fadeTo(menuAudio, 0, 1200);
    },

    resumeMenu() {
      if (!menuAudio) return;
      menuAudio.play().catch(() => {});
      fadeTo(menuAudio, 0.45, 1200);
    },
  };
})();


export default audioMgr;
