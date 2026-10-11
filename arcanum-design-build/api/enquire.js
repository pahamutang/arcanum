import nodemailer from 'nodemailer';

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed.' });
  }

  const { name, email, message, project, phone } = req.body || {};

  const missing = [];
  if (!name || !String(name).trim()) missing.push('name');
  if (!email || !String(email).trim()) missing.push('email');
  if (!message || !String(message).trim()) missing.push('message');
  if (missing.length) {
    return res.status(400).json({ success: false, error: `Missing required field(s): ${missing.join(', ')}.` });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim())) {
    return res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFY_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !NOTIFY_EMAIL) {
    console.error('SMTP environment variables are not set.');
    return res.status(500).json({ success: false, error: 'Something went wrong. Please try again.' });
  }

  const entry = {
    name: String(name).trim(),
    email: String(email).trim(),
    message: String(message).trim(),
    project: project ? String(project).trim() : 'General Enquiry',
    phone: phone ? String(phone).trim() : '',
  };

  const port = Number(SMTP_PORT || 587);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const row = (label, value) =>
    value
      ? `<tr><td style="padding:10px 0;border-bottom:1px solid rgba(181,128,74,0.15);">
          <div style="font-size:11px;letter-spacing:0.25em;color:#d9ab6f;text-transform:uppercase;margin-bottom:4px;">${label}</div>
          <div style="font-size:15px;color:#f2e8d8;">${esc(value)}</div></td></tr>`
      : '';

  const html = `
  <div style="background:#0d0805;padding:40px 20px;font-family:Georgia,'Times New Roman',serif;">
    <table role="presentation" width="100%" style="max-width:560px;margin:0 auto;">
      <tr><td style="text-align:center;padding-bottom:32px;">
        <div style="font-size:11px;letter-spacing:0.35em;color:#d9ab6f;text-transform:uppercase;">Arcanum Design &amp; Construct</div>
      </td></tr>
      <tr><td style="padding-bottom:24px;">
        <div style="font-size:11px;letter-spacing:0.25em;color:#8a7a68;text-transform:uppercase;margin-bottom:8px;">New Enquiry</div>
        <div style="font-size:24px;font-weight:300;color:#f2e8d8;">${esc(entry.project)}</div>
      </td></tr>
      <tr><td style="background:rgba(242,232,216,0.03);border:1px solid rgba(181,128,74,0.2);padding:24px 28px;">
        <table role="presentation" width="100%" style="border-collapse:collapse;">
          ${row('Name', entry.name)}${row('Email', entry.email)}${row('Phone', entry.phone)}
        </table>
        <div style="font-size:11px;letter-spacing:0.25em;color:#d9ab6f;text-transform:uppercase;margin:20px 0 8px;">Message</div>
        <div style="font-size:14px;line-height:1.8;color:rgba(242,232,216,0.85);white-space:pre-wrap;">${esc(entry.message)}</div>
      </td></tr>
    </table>
  </div>`;

  try {
    await transporter.sendMail({
      from: `"Arcanum Website" <${SMTP_USER}>`,
      to: NOTIFY_EMAIL,
      replyTo: entry.email,
      subject: `New enquiry — ${entry.project}`,
      text: [
        `Name: ${entry.name}`,
        `Email: ${entry.email}`,
        entry.phone ? `Phone: ${entry.phone}` : null,
        `Project: ${entry.project}`,
        '',
        entry.message,
      ].filter(Boolean).join('\n'),
      html,
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Email failed:', err.message);
    return res.status(500).json({ success: false, error: 'Something went wrong. Please try again.' });
  }
}
