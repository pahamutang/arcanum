import { useState, useEffect } from 'react';
import { DIALOGUE_LINES } from '../data/splashData';

function HudDialogue() {
  const [lineIdx, setLineIdx]   = useState(0);
  const [charIdx, setCharIdx]   = useState(0);
  const [blinking, setBlinking] = useState(false);
  const [visible, setVisible]   = useState(false);

  // Slight delay before starting so splash loads first
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  // Typewriter — advance one char every 42ms
  useEffect(() => {
    if (!visible) return;
    const line = DIALOGUE_LINES[lineIdx] || '';
    if (charIdx < line.length) {
      const t = setTimeout(() => setCharIdx(c => c + 1), 42);
      return () => clearTimeout(t);
    } else {
      // Line done — blink cursor, then advance after pause
      const pause = lineIdx < DIALOGUE_LINES.length - 1 ? 1400 : 0;
      const startBlink = setTimeout(() => setBlinking(true), 0);
      if (pause) {
        const t = setTimeout(() => {
          setBlinking(false);
          setLineIdx(i => i + 1);
          setCharIdx(0);
        }, pause);
        return () => { clearTimeout(startBlink); clearTimeout(t); };
      }
      return () => clearTimeout(startBlink);
    }
  }, [visible, charIdx, lineIdx]);

  const line = DIALOGUE_LINES[lineIdx] || DIALOGUE_LINES[DIALOGUE_LINES.length - 1];
  const displayed = charIdx <= line.length ? line.slice(0, charIdx) : line;
  const done = lineIdx >= DIALOGUE_LINES.length - 1 && charIdx >= line.length;

  return (
    <div className="sp-dlg" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.4s' }}>
      {/* portrait avatar */}
      <div className="sp-dlg-avatar">
        <img src="/arcanum_ultra_hd.png" alt="Arcanum" />
      </div>
      {/* text area */}
      <div className="sp-dlg-body">
        <div className="sp-dlg-name">ARCANUM</div>
        <div className="sp-dlg-text">
          {displayed}
          <span className={`sp-dlg-cursor${blinking || !done ? '' : ' sp-dlg-cursor-on'}`}>▮</span>
        </div>
      </div>
      {/* advance arrow — shows when a line is done */}
      {blinking && (
        <div className="sp-dlg-arrow">▼</div>
      )}
    </div>
  );
}

export default HudDialogue;
