import nodemailer from 'nodemailer';
import { appendToCsv } from '../../utils/csv-backup';
import fetch from 'node-fetch';

export const config = {
  api: { bodyParser: true },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  try {
    const { company, contact, email, message, recaptchaToken } = req.body || {};

    if (!company || !contact || !email) {
      return res.status(400).json({ error: 'company, contact and email are required' });
    }

    // optional: verify recaptcha
    if (process.env.RECAPTCHA_SECRET && recaptchaToken) {
      const recaptchaRes = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
        method: 'POST',
        headers: { 'Content-Type':'application/x-www-form-urlencoded' },
        body: `secret=${encodeURIComponent(process.env.RECAPTCHA_SECRET)}&response=${encodeURIComponent(recaptchaToken)}`
      });
      const recaptchaJson = await recaptchaRes.json();
      if (!recaptchaJson.success || recaptchaJson.score < 0.3) {
        return res.status(400).json({ error: 'recaptcha failed' });
      }
    }

    // 1) Post to HubSpot (if configured)
    if (process.env.HUBSPOT_PORTAL_ID && process.env.HUBSPOT_FORM_ID) {
      const hubspotUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.HUBSPOT_PORTAL_ID}/${process.env.HUBSPOT_FORM_ID}`;
      const hubspotPayload = {
        fields: [
          { name: 'company', value: company },
          { name: 'email', value: email },
          { name: 'message', value: message || '' },
          { name: 'firstname', value: contact }
        ],
        context: { pageUri: process.env.SITE_DOMAIN || 'https://en.raytron.group', pageName: 'Homepage Inquiry' }
      };
      await fetch(hubspotUrl, {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(hubspotPayload)
      });
    }

    // 2) Email Alert via SMTP
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.TO_EMAIL) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      });

      const mailHtml = `
        <h3>New inquiry from website</h3>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Contact:</strong> ${contact}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message || '-'}</p>
        <p><small>Source: ${process.env.SITE_DOMAIN || 'website'}</small></p>
      `;

      await transporter.sendMail({
        from: `"Website Lead" <${process.env.SMTP_USER}>`,
        to: process.env.TO_EMAIL,
        subject: `New inquiry — ${company}`,
        html: mailHtml
      });
    }

    // 3) Append CSV backup (local or cloud)
    try {
      await appendToCsv({ company, contact, email, message, source: process.env.SITE_DOMAIN || 'website' });
    } catch (e) {
      console.error('CSV backup error', e);
    }

    // 4) Optional: POST to ERP webhook
    if (process.env.ERP_WEBHOOK_URL) {
      await fetch(process.env.ERP_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ company, contact, email, message, source: process.env.SITE_DOMAIN || 'website' })
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal_error' });
  }
}
