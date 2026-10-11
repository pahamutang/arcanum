import { useState } from 'react';
import { motion } from 'framer-motion';
import { submitEnquiry } from '../utils/api';

/* ── PORTFOLIO MODAL ── */
function PortfolioModal({ item, onClose }) {
  const [view, setView] = useState('detail'); // 'detail' | 'enquire' | 'sent'
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [hp, setHp] = useState(''); // honeypot — real visitors never touch this
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  const inputStyle = (field) => ({
    width: '100%', boxSizing: 'border-box',
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${errors[field] ? 'rgba(220,80,80,0.7)' : 'rgba(181,128,74,0.18)'}`,
    color: 'var(--white)', fontSize: '0.78rem',
    padding: '10px 14px', outline: 'none',
    fontFamily: 'inherit', letterSpacing: '0.03em',
    transition: 'border-color 0.2s',
  });

  const errMsg = (field) => errors[field] ? (
    <div style={{ fontSize: '0.6rem', color: 'rgba(220,100,100,0.9)', letterSpacing: '0.08em', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
      <span>⚠</span> {errors[field]}
    </div>
  ) : null;

  const handleChange = (field, val) => {
    setForm(f => ({ ...f, [field]: val }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = async () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required.';
    if (!form.email.trim()) e.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address.';
    if (!form.message.trim()) e.message = 'Please tell us about your project.';
    if (Object.keys(e).length) { setErrors(e); return; }
    setSending(true);
    const result = await submitEnquiry({ name: form.name, email: form.email, message: form.message, project: item.name }, hp);
    if (result.success) {
      setView('sent');
    } else {
      setErrors({ message: result.error });
    }
    setSending(false);
  };

  return (
    <motion.div
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: 'rgba(13,8,5,0.78)', backdropFilter: 'blur(18px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
    >
      <motion.div
        onClick={e => e.stopPropagation()}
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '100%', maxWidth: '700px',
          maxHeight: 'calc(100vh - 48px)',
          display: 'flex', flexDirection: 'column',
          border: '1px solid rgba(181,128,74,0.18)',
          background: 'rgba(28,20,13,0.98)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.85)',
          position: 'relative', overflowY: 'auto',
        }}
      >
        {/* ✕ close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '12px', right: '12px', zIndex: 3,
            background: 'rgba(13,8,5,0.72)', border: '1px solid rgba(181,128,74,0.3)',
            color: 'var(--steel-light)', width: '34px', height: '34px',
            fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s, border-color 0.2s', flexShrink: 0,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(181,128,74,0.15)'; e.currentTarget.style.borderColor = 'rgba(181,128,74,0.6)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(13,8,5,0.72)'; e.currentTarget.style.borderColor = 'rgba(181,128,74,0.3)'; }}
        >✕</button>

        {/* Hero image */}
        <div style={{ width: '100%', height: '260px', flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
          <img src={item.img} alt={item.name} loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.82) saturate(0.78)', display: 'block' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(transparent, rgba(28,20,13,0.98))' }} />
          {/* Category badge over image */}
          <span style={{
            position: 'absolute', bottom: '16px', left: '28px',
            fontSize: '0.52rem', letterSpacing: '0.38em', color: 'var(--steel-light)',
            border: '1px solid rgba(181,128,74,0.35)', padding: '4px 12px',
            background: 'rgba(28,20,13,0.6)', backdropFilter: 'blur(6px)',
          }}>{item.meta}</span>
        </div>

        {/* Body */}
        <div style={{ padding: '28px 32px 32px' }}>

          {/* Project title */}
          <h3 style={{ fontSize: 'clamp(1.1rem,2.5vw,1.55rem)', fontWeight: 300, color: 'var(--white)', letterSpacing: '0.07em', marginBottom: '16px' }}>{item.name}</h3>

          {/* Project details grid */}
          <div className="pf-detail-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '20px' }}>
            {[
              { label: 'LOCATION', value: item.location },
              { label: 'FLOOR AREA', value: item.area },
              { label: 'YEAR', value: item.year },
              { label: 'EST. BUDGET', value: item.budget, span: true },
            ].map(d => (
              <div key={d.label} style={{
                gridColumn: d.span ? 'span 2' : undefined,
                padding: '12px 16px',
                background: 'rgba(181,128,74,0.04)',
                border: '1px solid rgba(181,128,74,0.1)',
              }}>
                <div style={{ fontSize: '0.48rem', letterSpacing: '0.35em', color: 'var(--steel-light)', marginBottom: '5px' }}>{d.label}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--white)', fontWeight: 300 }}>{d.value}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <p style={{ fontSize: '0.78rem', color: 'var(--white-dim)', lineHeight: 1.9, marginBottom: '20px' }}>{item.description}</p>

          {/* Services */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '0.5rem', letterSpacing: '0.35em', color: 'var(--steel-light)', marginBottom: '10px' }}>SERVICES DELIVERED</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {item.services.map(s => (
                <span key={s} style={{
                  fontSize: '0.58rem', letterSpacing: '0.2em', color: 'var(--crystal)',
                  border: '1px solid rgba(181,128,74,0.25)', padding: '5px 14px',
                  background: 'rgba(181,128,74,0.06)',
                }}>✦ {s}</span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ borderTop: '1px solid rgba(181,128,74,0.1)', marginBottom: '24px' }} />

          {/* ── DETAIL VIEW ── */}
          {view === 'detail' && (
            <button
              onClick={() => setView('enquire')}
              style={{
                fontSize: '0.6rem', letterSpacing: '0.28em',
                color: 'var(--ink-deep)', background: 'var(--steel-light)',
                border: 'none', padding: '12px 28px', transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--crystal)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--steel-light)'}
            >✦ ENQUIRE ABOUT THIS PROJECT</button>
          )}

          {/* ── ENQUIRE FORM ── */}
          {view === 'enquire' && (
            <div>
              <div style={{ fontSize: '0.52rem', letterSpacing: '0.32em', color: 'var(--steel-light)', marginBottom: '18px' }}>SEND AN ENQUIRY</div>
              {/* Honeypot — hidden from real visitors via CSS + off-screen position, but bots that blindly fill every field will trip it */}
              <input
                type="text" name="company" value={hp} onChange={e => setHp(e.target.value)}
                tabIndex={-1} autoComplete="off" aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <input
                    placeholder="Full Name"
                    value={form.name}
                    onChange={e => handleChange('name', e.target.value)}
                    style={inputStyle('name')}
                    onFocus={e => { if (!errors.name) e.target.style.borderColor = 'rgba(181,128,74,0.55)'; }}
                    onBlur={e => { if (!errors.name) e.target.style.borderColor = 'rgba(181,128,74,0.18)'; }}
                  />
                  {errMsg('name')}
                </div>
                <div>
                  <input
                    placeholder="Email Address"
                    type="email"
                    value={form.email}
                    onChange={e => handleChange('email', e.target.value)}
                    style={inputStyle('email')}
                    onFocus={e => { if (!errors.email) e.target.style.borderColor = 'rgba(181,128,74,0.55)'; }}
                    onBlur={e => { if (!errors.email) e.target.style.borderColor = 'rgba(181,128,74,0.18)'; }}
                  />
                  {errMsg('email')}
                </div>
                <div>
                  <textarea
                    placeholder={`Tell us about your project — scope, timeline, or any questions about ${item.name}.`}
                    value={form.message}
                    onChange={e => handleChange('message', e.target.value)}
                    rows={4}
                    style={{ ...inputStyle('message'), resize: 'none' }}
                    onFocus={e => { if (!errors.message) e.target.style.borderColor = 'rgba(181,128,74,0.55)'; }}
                    onBlur={e => { if (!errors.message) e.target.style.borderColor = 'rgba(181,128,74,0.18)'; }}
                  />
                  {errMsg('message')}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button
                  onClick={handleSubmit}
                  disabled={sending}
                  style={{
                    fontSize: '0.6rem', letterSpacing: '0.28em',
                    color: 'var(--ink-deep)', background: sending ? 'rgba(181,128,74,0.5)' : 'var(--steel-light)',
                    border: 'none', padding: '12px 28px', transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => { if (!sending) e.currentTarget.style.background = 'var(--crystal)'; }}
                  onMouseLeave={e => { if (!sending) e.currentTarget.style.background = 'var(--steel-light)'; }}
                >{sending ? 'SENDING...' : '✦ SEND ENQUIRY'}</button>
                <button
                  onClick={() => setView('detail')}
                  style={{
                    fontSize: '0.58rem', letterSpacing: '0.22em',
                    color: 'var(--silver)', background: 'transparent',
                    border: '1px solid rgba(181,128,74,0.2)', padding: '11px 20px',
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(181,128,74,0.5)'; e.currentTarget.style.color = 'var(--white)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(181,128,74,0.2)'; e.currentTarget.style.color = 'var(--silver)'; }}
                >← Back</button>
              </div>
            </div>
          )}

          {/* ── SENT CONFIRMATION ── */}
          {view === 'sent' && (
            <div style={{ textAlign: 'center', padding: '8px 0 4px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '14px', color: 'var(--steel-light)' }}>✦</div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 300, color: 'var(--white)', letterSpacing: '0.12em', marginBottom: '10px' }}>ENQUIRY RECEIVED</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--white-dim)', lineHeight: 1.85, maxWidth: '380px', margin: '0 auto 22px' }}>
                Thank you for your interest in <strong style={{ color: 'var(--steel-light)', fontWeight: 400 }}>{item.name}</strong>. Our team will review your enquiry and be in touch within 1–2 business days.
              </p>
              <button
                onClick={onClose}
                style={{
                  fontSize: '0.58rem', letterSpacing: '0.25em',
                  color: 'var(--ink-deep)', background: 'var(--steel-light)',
                  border: 'none', padding: '11px 26px', transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--crystal)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--steel-light)'}
              >CLOSE</button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default PortfolioModal;
