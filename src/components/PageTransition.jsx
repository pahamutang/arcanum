import { motion } from 'framer-motion';

/* ── PAGE TRANSITION COMPONENT ── */
const ptPanelVariants = {
  idle: (i) => ({ scaleX: 0, transformOrigin: i === 1 ? 'right center' : 'left center' }),
  entering: (i) => ({
    scaleX: 1,
    transformOrigin: i === 1 ? 'right center' : 'left center',
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
  leaving: (i) => ({
    scaleX: 0,
    transformOrigin: 'right center',
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 },
  }),
};

const ptWordVariants = {
  idle: { opacity: 0, y: 8 },
  entering: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.18 } },
  leaving: { opacity: 0, y: -6, transition: { duration: 0.2, ease: 'easeOut' } },
};

function PageTransition({ phase, label }) {
  if (!phase) return null;
  const isMenu = label === 'ARCANUM';
  return (
    <div className="page-transition">
      <motion.div className="pt-panel" custom={0} variants={ptPanelVariants} initial="idle" animate={phase} />
      <motion.div className="pt-panel pt-panel-mid" custom={1} variants={ptPanelVariants} initial="idle" animate={phase}>
        <div className="pt-rule top" />
        <div className="pt-rule bot" />
        {isMenu ? (
          <motion.img className="pt-logo-img" src="/arcanum_ultra_hd.png" alt="Arcanum"
            variants={ptWordVariants} initial="idle" animate={phase} />
        ) : (
          <motion.span className="pt-wordmark" variants={ptWordVariants} initial="idle" animate={phase}>{label}</motion.span>
        )}
      </motion.div>
      <motion.div className="pt-panel" custom={2} variants={ptPanelVariants} initial="idle" animate={phase} />
    </div>
  );
}

export default PageTransition;
