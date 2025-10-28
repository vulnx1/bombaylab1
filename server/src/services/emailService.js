import nodemailer from 'nodemailer';
import path from 'path';

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = String(process.env.SMTP_SECURE || 'false').toLowerCase() === 'true';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    throw new Error('SMTP configuration missing');
  }
  return nodemailer.createTransport({ host, port, secure, auth: { user, pass } });
}

export async function sendOwnerEmail(sample, pdfPath) {
  const transporter = getTransporter();
  const owner = process.env.OWNER_EMAIL;
  if (!owner) throw new Error('OWNER_EMAIL not set');

  const subject = `New Sample Submission: ${sample.name}`;
  const html = `<p>You have a new sample submission.</p>
<p><strong>Name:</strong> ${sample.name}<br/>
<strong>Email:</strong> ${sample.email}<br/>
<strong>Phone:</strong> ${sample.phone || '-'}<br/>
<strong>Message:</strong> ${sample.message || '-'}<br/>
</p>`;

  await transporter.sendMail({
    from: `Website <${process.env.SMTP_USER}>`,
    to: owner,
    subject,
    html,
    attachments: pdfPath ? [{ filename: path.basename(pdfPath), path: pdfPath }] : [],
  });
}

export async function sendAckEmail(sample) {
  const transporter = getTransporter();
  const subject = 'We received your submission';
  const html = `<p>Hi ${sample.name},</p><p>We have received your submission and will get back to you soon.</p>`;
  await transporter.sendMail({
    from: `Website <${process.env.SMTP_USER}>`,
    to: sample.email,
    subject,
    html,
  });
}
