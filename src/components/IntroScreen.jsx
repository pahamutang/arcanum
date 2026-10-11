import { useState, useEffect, useRef } from 'react';
import './IntroScreen.css';
import audioMgr from '../utils/audio';

/* Cinematic Fantasy Citadel at Sunrise — Pixabay (royalty-free, no attribution required)
   https://pixabay.com/videos/ai-generated-citadel-fortress-356200/ */
const INTRO_VIDEO_SRC = 'https://cdn.pixabay.com/video/2026/06/02/356200_large.mp4';
const FADE_DURATION = 0.5; // seconds, both in and out

/* ═══════════════════════════════════════════
   INTRO SCREEN — Cinematic Logo Opener
   Plays once on first visit before the RPG
   splash menu. Looping fade video background
   behind the Arcanum logo + ENTER prompt.
═══════════════════════════════════════════ */
function IntroScreen({ onDone }) {
  const [exiting, setExiting] = useState(false);
  const [idleFloat, setIdleFloat] = useState(false);
  const doneRef = useRef(false);
  const videoRef = useRef(null);
  const rafRef = useRef(null);

  /* Start idle float after logo finishes rising */
  useEffect(() => {
    const t = setTimeout(() => setIdleFloat(true), 2350);
    return () => clearTimeout(t);
  }, []);

  /* Manual seamless loop with fade-in / fade-out at the seams */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tick = () => {
      const { currentTime, duration } = video;
      if (duration && !Number.isNaN(duration)) {
        let opacity = 1;
        if (currentTime < FADE_DURATION) {
          opacity = currentTime / FADE_DURATION;
        } else if (currentTime > duration - FADE_DURATION) {
          opacity = Math.max(0, (duration - currentTime) / FADE_DURATION);
        }
        video.style.opacity = opacity;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const handleEnded = () => {
      video.style.opacity = 0;
      setTimeout(() => {
        video.currentTime = 0;
        video.play();
      }, 100);
    };
    video.addEventListener('ended', handleEnded);

    return () => {
      cancelAnimationFrame(rafRef.current);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handleEnter = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    // First interaction — init audio and play intro music
    audioMgr.init();
    audioMgr.playIntro();
    setExiting(true);
    // Transition to menu music just before intro screen disappears
    setTimeout(() => audioMgr.transitionToMenu(), 400);
    setTimeout(onDone, 1150);
  };

  /* Also allow spacebar / enter key */
  useEffect(() => {
    const fn = (e) => {
      if (e.key === 'Enter' || e.key === ' ') handleEnter();
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={`intro-root${exiting ? ' intro-exit' : ''}`} onClick={handleEnter}>

        {/* Looping fade video background */}
        <video
          ref={videoRef}
          className="intro-video"
          src={INTRO_VIDEO_SRC}
          autoPlay
          muted
          playsInline
          style={{ opacity: 0 }}
        />

        {/* Gradient overlay for logo/text legibility */}
        <div className="intro-gradient-overlay" />

        {/* Vignette */}
        <div className="intro-vignette" />

        {/* Logo */}
        <div className="intro-logo-wrap">
          <img
            src="/arcanum_ultra_hd.png"
            alt="Arcanum Design & Construct"
            className={`intro-logo-img${idleFloat ? ' intro-logo-idle' : ''}`}
          />

          {/* Enter button */}
          <button className="intro-enter-btn" onClick={handleEnter}>
            <span>Enter</span>
          </button>
        </div>

      </div>
    </>
  );
}

/* ═══════════════════════════════════════════
   SPLASH SCREEN — Anime Elf RPG Menu
   Shows first; clicking a menu item fades it
   out and scrolls to that section.
═══════════════════════════════════════════ */

export default IntroScreen;
