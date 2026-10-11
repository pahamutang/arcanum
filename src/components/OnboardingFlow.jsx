import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AvailabilityCalendar, { formatDisplayDate, getMockUnavailableDates } from './AvailabilityCalendar';

/* ── ONBOARDING FLOW ──
   A short, focused intake shown before the contact form — one question
   per screen, tap-to-select tiles, a thin progress bar. The last step
   collects name + email, then hands a ready-made project brief off to
   the Contact form instead of dropping the visitor into a blank one. */

/* Each project type has its own set of scope options (e.g. how many
   storeys). 'Other' is appended to every list so a visitor can always
   type something that isn't on the tile. */
const PROJECT_TYPES = [
  { value: 'Residential', icon: '🏠', subtypes: ['1-STOREY', '2 OR MORE', 'APARTMENT/CONDO', 'MULTI-UNIT/TOWNHOUSE', 'OTHER'] },
  { value: 'Commercial', icon: '🏢', subtypes: ['Office', 'Retail', 'Mixed-Use/Sports', 'OTHER'] },
  { value: 'Renovation', icon: '🛠', subtypes: ['Whole House', 'Extension / Addition', 'OTHER'] },
  { value: 'Landscaping', icon: '🌿', subtypes: ['Garden Design', 'Hardscaping', 'Pool & Outdoor', 'Full Property', 'OTHER'] },
  { value: 'Interior Design', icon: '🎨', subtypes: ['Residential Interior', 'Commercial Interior', 'Renovation / Fit-Out', 'OTHER'] },
  { value: 'Other', icon: '✦', subtypes: [] },
];

const BUDGET_OPTIONS = [
  { value: 'SEND AREA FOR QUOTATION', icon: '📐' },
];

const STEPS = [
  {
    key: 'project',
    label: 'What are you building?',
    sub: 'Pick a type, then tell us the scope and your estimated budget.',
    type: 'project',
  },
  {
    key: 'timeline',
    label: 'WHEN ARE YOU HOPING TO START YOUR PROJECT?',
    sub: "Pick a date on the calendar — we'll confirm the COMPANY is free.",
    type: 'calendar',
  },
  {
    key: 'contact',
    label: 'How should we reach you?',
    sub: "We'll use this to send your project brief.",
    type: 'form',
  },
];

const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
};

function OnboardingFlow({ onComplete, onSkip, onClose }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState({
    project: '', projectOther: '',
    projectDetail: '', projectDetailOther: '',
    budget: '', budgetOther: '',
    timeline: '',
    name: '', email: '',
  });
  const [unavailableDates] = useState(getMockUnavailableDates);

  const step = STEPS[stepIndex];
  const isLast = stepIndex === STEPS.length - 1;

  const selectedType = PROJECT_TYPES.find(t => t.value === answers.project);
  const hasSubtypes = Boolean(selectedType?.subtypes.length);

  const projectOk = answers.project === 'Other'
    ? answers.projectOther.trim().length > 0
    : answers.project
      ? (!hasSubtypes || (answers.projectDetail && (answers.projectDetail !== 'OTHER' || answers.projectDetailOther.trim().length > 0)))
      : false;

  const showAreaPanel = answers.project && answers.project !== 'Renovation' && answers.project !== 'Other';

  const budgetNeedsText = answers.budget === 'OTHER' || answers.budget === 'SEND AREA FOR QUOTATION';
  const budgetOk = !showAreaPanel
    ? true
    : answers.budget
      ? (!budgetNeedsText || answers.budgetOther.trim().length > 0)
      : false;

  const canContinue = step.type === 'form'
    ? answers.name.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email)
    : step.type === 'calendar'
      ? Boolean(answers.timeline)
      : projectOk && budgetOk;

  const setField = (key, value) => setAnswers(a => ({ ...a, [key]: value }));
  const selectProjectType = (value) => setAnswers(a => ({
    ...a, project: value, projectDetail: '', projectDetailOther: '',
  }));
  const selectProjectDetail = (value) => setAnswers(a => ({
    ...a, projectDetail: value, projectDetailOther: value === 'OTHER' ? a.projectDetailOther : '',
  }));
  const selectBudget = (value) => setAnswers(a => ({ ...a, budget: value }));
  const selectTimeline = (value) => setAnswers(a => ({ ...a, timeline: value }));

  const resolvedProject = answers.project === 'Other'
    ? answers.projectOther.trim()
    : [answers.project, answers.projectDetail === 'OTHER' ? answers.projectDetailOther.trim() : answers.projectDetail]
        .filter(Boolean).join(' — ');
  const resolvedBudget = !showAreaPanel
    ? ''
    : (answers.budget === 'OTHER' || answers.budget === 'SEND AREA FOR QUOTATION') && answers.budgetOther.trim()
      ? (answers.budget === 'SEND AREA FOR QUOTATION' ? `${answers.budgetOther.trim()} (area submitted for quotation)` : answers.budgetOther.trim())
      : answers.budget;

  const goNext = () => {
    if (!canContinue) return;
    if (isLast) {
      const brief = [
        resolvedProject && `Project type: ${resolvedProject}`,
        resolvedBudget && `Desired area for your ${answers.project}: ${resolvedBudget}`,
        answers.timeline && `Target start date: ${formatDisplayDate(answers.timeline)}`,
      ].filter(Boolean).join('\n');
      onComplete({
        name: answers.name,
        email: answers.email,
        project: resolvedProject || 'General Enquiry',
        message: `${brief}\n\n(Tell us more about your vision here...)`,
      });
      return;
    }
    setDir(1);
    setStepIndex(i => i + 1);
  };

  const goBack = () => {
    if (stepIndex === 0) { onClose(); return; }
    setDir(-1);
    setStepIndex(i => i - 1);
  };

  return (
    <motion.div
      className="onboard-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="onboard-grid" />

      {/* Header: back, progress, skip/close */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '20px', padding: '28px 32px 0' }}>
        <button
          onClick={goBack}
          aria-label="Back"
          style={{ background: 'transparent', border: 'none', color: 'var(--silver)', fontSize: '0.9rem', cursor: 'pointer', flexShrink: 0 }}
        >←</button>

        <div className="onboard-progress" style={{ flex: 1 }}>
          {STEPS.map((s, i) => (
            <div className="onboard-progress-seg" key={s.key}>
              <div
                className="onboard-progress-fill"
                style={{ transform: `scaleX(${i < stepIndex ? 1 : i === stepIndex ? 1 : 0})`, transformOrigin: 'left' }}
              />
            </div>
          ))}
        </div>

        <button
          onClick={onSkip}
          style={{ background: 'transparent', border: 'none', color: 'var(--silver)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', whiteSpace: 'nowrap' }}
        >Skip</button>
        <button
          onClick={onClose}
          aria-label="Close"
          style={{ background: 'transparent', border: 'none', color: 'var(--silver)', fontSize: '1rem', cursor: 'pointer', flexShrink: 0 }}
        >✕</button>
      </div>

      {/* Body */}
      <div className="onboard-body" style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '560px' }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step.key}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <div style={{ fontSize: '0.6rem', letterSpacing: '0.35em', color: 'var(--steel-light)', textTransform: 'uppercase', marginBottom: '12px' }}>
                Step {stepIndex + 1} of {STEPS.length}
              </div>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 300, color: 'var(--white)', marginBottom: '10px', lineHeight: 1.2 }}>
                {step.label}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--white-dim)', marginBottom: '36px' }}>{step.sub}</p>

              {step.type === 'project' && (
                <>
                  <div className="onboard-tile-grid">
                    {PROJECT_TYPES.map(pt => {
                      const selected = answers.project === pt.value;
                      return (
                        <div
                          key={pt.value}
                          className={`onboard-tile${selected ? ' selected' : ''}`}
                          onClick={() => selectProjectType(pt.value)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') selectProjectType(pt.value); }}
                        >
                          <span className="onboard-tile-icon">{pt.icon}</span>
                          <span style={{ fontSize: '0.85rem', color: 'var(--white)' }}>{pt.value}</span>
                          <span className="onboard-tile-check">{selected ? '✓' : ''}</span>
                        </div>
                      );
                    })}
                  </div>

                  <AnimatePresence>
                    {answers.project && (
                      <motion.div
                        className="onboard-detail-panel"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                      >
                        <div className="onboard-detail-grid" style={!showAreaPanel ? { gridTemplateColumns: '1fr' } : undefined}>
                          {/* Left: scope for this project type, or a free-text field for "Other" */}
                          <div>
                            {answers.project === 'Other' && (
                              <div className="onboard-detail-label">Tell us more</div>
                            )}
                            {answers.project === 'Other' ? (
                              <input
                                className="onboard-input"
                                placeholder="e.g. Renovation, landscape design, mixed-use..."
                                value={answers.projectOther}
                                onChange={e => setField('projectOther', e.target.value)}
                                autoFocus
                              />
                            ) : (
                              <>
                                <div className="onboard-chip-grid">
                                  {selectedType.subtypes.map(sub => {
                                    const selected = answers.projectDetail === sub;
                                    return (
                                      <button
                                        type="button"
                                        key={sub}
                                        className={`onboard-chip${selected ? ' selected' : ''}`}
                                        onClick={() => selectProjectDetail(sub)}
                                      >{sub}</button>
                                    );
                                  })}
                                </div>
                                {answers.projectDetail === 'OTHER' && (
                                  <input
                                    className="onboard-input onboard-other-input"
                                    placeholder="Describe the scope..."
                                    value={answers.projectDetailOther}
                                    onChange={e => setField('projectDetailOther', e.target.value)}
                                    autoFocus
                                  />
                                )}
                              </>
                            )}
                          </div>

                          {/* Right: desired area, shown for every project type except Renovation */}
                          {showAreaPanel && (
                            <div>
                              <div className="onboard-detail-label">Desired area for your {answers.project}</div>
                              <div className="onboard-chip-grid">
                                {BUDGET_OPTIONS.map(b => {
                                  const selected = answers.budget === b.value;
                                  return (
                                    <button
                                      type="button"
                                      key={b.value}
                                      className={`onboard-chip${selected ? ' selected' : ''}`}
                                      onClick={() => selectBudget(b.value)}
                                    >{b.icon} {b.value}</button>
                                  );
                                })}
                              </div>
                              {budgetNeedsText && (
                                <input
                                  className="onboard-input onboard-other-input"
                                  placeholder={
                                    answers.budget === 'SEND AREA FOR QUOTATION'
                                      ? 'e.g. 250 sqm lot, 3-storey floor plan...'
                                      : ''
                                  }
                                  value={answers.budgetOther}
                                  onChange={e => setField('budgetOther', e.target.value)}
                                  autoFocus
                                />
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}

              {step.type === 'calendar' && (
                <AvailabilityCalendar
                  value={answers.timeline}
                  onChange={selectTimeline}
                  unavailableDates={unavailableDates}
                />
              )}

              {step.type === 'form' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <input
                    className="onboard-input"
                    placeholder="Full Name"
                    value={answers.name}
                    onChange={e => setAnswers(a => ({ ...a, name: e.target.value }))}
                  />
                  <input
                    className="onboard-input"
                    type="email"
                    placeholder="Email Address"
                    value={answers.email}
                    onChange={e => setAnswers(a => ({ ...a, email: e.target.value }))}
                  />
                </div>
              )}

              <button
                onClick={goNext}
                disabled={!canContinue}
                style={{
                  marginTop: '36px',
                  background: canContinue ? 'var(--steel-light)' : 'rgba(181,128,74,0.25)',
                  color: 'var(--ink-deep)', border: 'none',
                  padding: '16px 40px', fontFamily: 'Inter, sans-serif',
                  fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase',
                  fontWeight: 600, cursor: canContinue ? 'pointer' : 'not-allowed',
                  transition: 'background 0.3s',
                }}
                onMouseEnter={e => { if (canContinue) e.currentTarget.style.background = 'var(--crystal)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = canContinue ? 'var(--steel-light)' : 'rgba(181,128,74,0.25)'; }}
              >
                {isLast ? '✦ See My Project Brief' : 'Continue →'}
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default OnboardingFlow;
