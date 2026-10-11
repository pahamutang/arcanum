import { motion } from 'framer-motion';

/* ── REVEAL (framer-motion) ──
   Drop-in replacement for the .reveal / .reveal-left / .reveal-delay-N
   className system above. Same thresholds, same durations, same
   direction options — just driven by whileInView instead of an
   IntersectionObserver + CSS class toggle.
   direction: 'up' (default, matches .reveal) | 'left' (matches .reveal-left)
   delay: seconds — pass 0.1 / 0.2 / 0.3 / 0.4 to match reveal-delay-1..4 */
const revealVariants = {
  up:   { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
};
function Reveal({ children, direction = 'up', delay = 0, className, style, as = 'div', ...rest }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      style={style}
      variants={revealVariants[direction] || revealVariants.up}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.8, ease: 'easeOut', delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}


export default Reveal;
