import { useRef, useEffect } from 'react';

/* ── ELF CANVAS — removes white background via pixel masking ── */
function ElfCanvas({ src }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width  = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const px = data.data;
      for (let i = 0; i < px.length; i += 4) {
        const r = px[i], g = px[i+1], b = px[i+2];
        // Only remove pixels that are essentially pure white (all 3 channels very high and nearly equal)
        const minC = Math.min(r, g, b);
        const maxC = Math.max(r, g, b);
        const saturation = maxC - minC;
        if (minC > 248 && saturation < 8) {
          // Pure white background — fully transparent
          px[i+3] = 0;
        } else if (minC > 240 && saturation < 12) {
          // Very near-white fringe — soft edge
          const t = (minC - 240) / 15;
          px[i+3] = Math.round(px[i+3] * (1 - t * 0.75));
        }
      }
      ctx.putImageData(data, 0, 0);
    };
    img.src = src;
  }, [src]);
  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: 'auto', display: 'block' }}
    />
  );
}

export default ElfCanvas;
