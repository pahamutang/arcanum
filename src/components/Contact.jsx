import { useState } from 'react';
import Reveal from './Reveal';
import { submitEnquiry } from '../utils/api';

function Contact({ prefill }) {
  const [form, setForm] = useState(() => ({
    name: prefill?.name || '',
    email: prefill?.email || '',
    phone: '',
    project: prefill?.project || '',
    message: prefill?.message || '',
  }));
  const [hp, setHp] = useState(''); // honeypot — real visitors never touch this
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handle = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: undefined }));
  };

  const errMsg = (field) => errors[field] ? (
    <div style={{ fontSize: '0.6rem', color: 'rgba(220,100,100,0.9)', letterSpacing: '0.08em', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
      <span>⚠</span> {errors[field]}
    </div>
  ) : null;

  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = 'Full name is required.';
    if (!form.email.trim()) er.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = 'Please enter a valid email address.';
    if (!form.project.trim()) er.project = 'Please select a project type.';
    if (!form.message.trim()) er.message = 'Please tell us about your project.';
    if (Object.keys(er).length) { setErrors(er); return; }

    setSubmitting(true);
    const result = await submitEnquiry({
      name: form.name,
      email: form.email,
      message: form.message,
      project: form.project || 'General Enquiry',
      phone: form.phone,
    }, hp);
    if (result.success) {
      setSent(true);
    } else {
      setErrors({ message: result.error });
    }
    setSubmitting(false);
  };

  const inputStyle = (field) => ({
    width: '100%', background: 'rgba(13,8,5,0.55)', backdropFilter: 'blur(6px)',
    border: `1px solid ${errors[field] ? 'rgba(220,80,80,0.7)' : 'rgba(181,128,74,0.25)'}`, color: 'var(--white)',
    padding: '14px 18px', fontFamily: 'Inter, sans-serif',
    fontSize: '0.8rem', letterSpacing: '0.05em', outline: 'none',
    transition: 'border-color 0.3s', boxSizing: 'border-box',
  });

  return (
    <section id="contact" style={{ alignItems: 'start' }}>
      <div>
        <Reveal as="p" className="section-label">Get In Touch</Reveal>
        <Reveal as="h2" className="section-title" delay={0.1}>Start Your <em>Project</em></Reveal>
        <Reveal as="p" delay={0.2} style={{ color: 'var(--white-dim)', fontSize: '0.9rem', lineHeight: 1.8, marginTop: '24px', marginBottom: '48px' }}>
          Every great space begins with a conversation. Tell us about your vision, your site, your timeline — and we'll tell you what's possible.
        </Reveal>
        <Reveal as="div" delay={0.3} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {[
            { icon: '📍', label: 'Office', val: 'CEBU, BOHOL PHILIPPINES' },
            { icon: '📞', label: 'Phone', val: '+63-991-769-6449' },
            { icon: '✉', label: 'Email', val: 'arcanum.services21@gmail.com' },
            { icon: '🕐', label: 'Hours', val: 'Mon – Fri, 8am – 6pm' },
          ].map(({ icon, label, val }) => (
            <div key={label} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <span style={{ fontSize: '1.2rem' }}>{icon}</span>
              <div>
                <div style={{ fontSize: '0.55rem', letterSpacing: '0.25em', color: 'var(--steel-light)', marginBottom: '2px' }}>{label}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--white-dim)' }}>{val}</div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>

      <Reveal as="div" delay={0.2}>
        {sent ? (
          <div style={{ padding: '60px 40px', border: '1px solid rgba(181,128,74,0.2)', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>✦</div>
            <h3 style={{ color: 'var(--steel-light)', fontWeight: 300, marginBottom: '12px' }}>Message Received</h3>
            <p style={{ color: 'var(--white-dim)', fontSize: '0.85rem', lineHeight: 1.7 }}>Thank you for reaching out. Our team will review your enquiry and be in touch within 1–2 business days.</p>
          </div>
        ) : (
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {prefill && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                border: '1px solid rgba(181,128,74,0.25)', background: 'rgba(181,128,74,0.06)',
                padding: '12px 16px', fontSize: '0.72rem', color: 'var(--steel-light)', letterSpacing: '0.03em',
              }}>
                <span>✦</span>
                <span>We've pre-filled your project brief below — feel free to edit anything before sending.</span>
              </div>
            )}
            {/* Honeypot — hidden from real visitors via CSS + off-screen position, but bots that blindly fill every field will trip it */}
            <input
              type="text" name="company" value={hp} onChange={e => setHp(e.target.value)}
              tabIndex={-1} autoComplete="off" aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
            />
            <div className="contact-field-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <input name="name" placeholder="Full Name" value={form.name} onChange={handle} style={inputStyle('name')} onFocus={e => { if (!errors.name) e.target.style.borderColor='rgba(181,128,74,0.6)'; }} onBlur={e => { if (!errors.name) e.target.style.borderColor='rgba(181,128,74,0.2)'; }} />
                {errMsg('name')}
              </div>
              <div>
                <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handle} style={inputStyle('email')} onFocus={e => { if (!errors.email) e.target.style.borderColor='rgba(181,128,74,0.6)'; }} onBlur={e => { if (!errors.email) e.target.style.borderColor='rgba(181,128,74,0.2)'; }} />
                {errMsg('email')}
              </div>
            </div>
            <div className="contact-field-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handle} style={inputStyle('phone')} onFocus={e => e.target.style.borderColor='rgba(181,128,74,0.6)'} onBlur={e => e.target.style.borderColor='rgba(181,128,74,0.2)'} />
              </div>
              <div>
                <select name="project" value={form.project} onChange={handle} style={{ ...inputStyle('project') }}>
                  <option value="" disabled>Project Type</option>
                  {['Residential','Commercial','Hospitality','Civic / Institutional','Interior Design','Other'].map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                {errMsg('project')}
              </div>
            </div>
            <div>
              <textarea name="message" placeholder="Tell us about your project..." value={form.message} onChange={handle} rows={5} style={{ ...inputStyle('message'), resize: 'none' }} onFocus={e => { if (!errors.message) e.target.style.borderColor='rgba(181,128,74,0.6)'; }} onBlur={e => { if (!errors.message) e.target.style.borderColor='rgba(181,128,74,0.2)'; }} />
              {errMsg('message')}
            </div>
            <button type="submit" disabled={submitting} style={{
              background: submitting ? 'rgba(181,128,74,0.5)' : 'var(--steel-light)', color: 'var(--ink-deep)', border: 'none',
              padding: '16px 40px', fontFamily: 'Inter, sans-serif',
              fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase',
              fontWeight: 600, alignSelf: 'flex-start',
              transition: 'background 0.3s',
            }}
              onMouseEnter={e => { if (!submitting) e.currentTarget.style.background = 'var(--crystal)'; }}
              onMouseLeave={e => e.currentTarget.style.background = submitting ? 'rgba(181,128,74,0.5)' : 'var(--steel-light)'}
            >
              {submitting ? 'SENDING...' : '✦ Send Message'}
            </button>
          </form>
        )}
      </Reveal>
    </section>
  );
}

export default Contact;
