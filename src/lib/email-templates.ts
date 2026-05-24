export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

/** Email sent to the business (admin notification) */
export function adminEmailTemplate(data: ContactFormData): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `New Enquiry from ${data.name} — ${data.service || "General"}`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
  <style>
    body { margin: 0; padding: 0; background: #f5f0e8; font-family: 'Segoe UI', Arial, sans-serif; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header { background: #2d6a4f; padding: 32px 40px; }
    .header h1 { margin: 0; color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: -0.3px; }
    .header p { margin: 6px 0 0; color: rgba(255,255,255,0.75); font-size: 14px; }
    .body { padding: 36px 40px; }
    .badge { display: inline-block; background: #d8f3dc; color: #2d6a4f; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 20px; margin-bottom: 24px; letter-spacing: 0.4px; text-transform: uppercase; }
    .field { margin-bottom: 20px; }
    .field label { display: block; font-size: 11px; font-weight: 600; color: #9aab9e; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 6px; }
    .field p { margin: 0; font-size: 15px; color: #1a2e23; font-weight: 500; line-height: 1.5; }
    .divider { height: 1px; background: #f0ece4; margin: 24px 0; }
    .message-box { background: #f9f6f0; border-left: 3px solid #2d6a4f; border-radius: 0 8px 8px 0; padding: 16px 20px; }
    .message-box p { margin: 0; font-size: 15px; color: #3a4a3e; line-height: 1.65; }
    .footer { background: #f9f6f0; padding: 20px 40px; text-align: center; }
    .footer p { margin: 0; font-size: 12px; color: #9aab9e; }
    .footer a { color: #2d6a4f; text-decoration: none; font-weight: 600; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>New Contact Enquiry</h1>
      <p>Received via krioskcreatta.com contact form</p>
    </div>
    <div class="body">
      <span class="badge">${data.service || "General Enquiry"}</span>

      <div class="field">
        <label>Full Name</label>
        <p>${escapeHtml(data.name)}</p>
      </div>

      <div class="field">
        <label>Phone</label>
        <p>${escapeHtml(data.phone)}</p>
      </div>

      ${data.email ? `
      <div class="field">
        <label>Email</label>
        <p><a href="mailto:${escapeHtml(data.email)}" style="color:#2d6a4f;">${escapeHtml(data.email)}</a></p>
      </div>` : ""}

      ${data.message ? `
      <div class="divider"></div>
      <div class="field">
        <label>Message</label>
        <div class="message-box">
          <p>${escapeHtml(data.message).replace(/\n/g, "<br/>")}</p>
        </div>
      </div>` : ""}
    </div>
    <div class="footer">
      <p>Reply directly to <a href="mailto:${escapeHtml(data.email || "")}">${escapeHtml(data.email || data.phone)}</a> or call <a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></p>
    </div>
  </div>
</body>
</html>`;

  const text = `
New Contact Enquiry — Kriosk Creatta
=====================================
Name:    ${data.name}
Phone:   ${data.phone}
Email:   ${data.email || "—"}
Service: ${data.service || "—"}

Message:
${data.message || "—"}
`;

  return { subject, html, text };
}

/** Auto-reply sent to the user */
export function userAutoReplyTemplate(data: ContactFormData): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `We received your message — Kriosk Creatta`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
  <style>
    body { margin: 0; padding: 0; background: #f5f0e8; font-family: 'Segoe UI', Arial, sans-serif; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header { background: #2d6a4f; padding: 40px; text-align: center; }
    .header h1 { margin: 0 0 8px; color: #ffffff; font-size: 26px; font-weight: 800; }
    .header p { margin: 0; color: rgba(255,255,255,0.8); font-size: 15px; }
    .body { padding: 40px; }
    .body h2 { font-size: 20px; color: #1a2e23; margin: 0 0 12px; }
    .body p { font-size: 15px; color: #4a5e50; line-height: 1.7; margin: 0 0 16px; }
    .summary { background: #f9f6f0; border-radius: 12px; padding: 20px 24px; margin: 24px 0; }
    .summary p { margin: 0 0 8px; font-size: 14px; color: #6b7c70; }
    .summary p:last-child { margin: 0; }
    .summary strong { color: #1a2e23; }
    .cta { text-align: center; margin: 32px 0 8px; }
    .cta a { display: inline-block; background: #2d6a4f; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 15px; padding: 14px 32px; border-radius: 50px; }
    .footer { background: #f9f6f0; padding: 24px 40px; text-align: center; border-top: 1px solid #eee; }
    .footer p { margin: 0; font-size: 12px; color: #9aab9e; line-height: 1.6; }
    .footer a { color: #2d6a4f; text-decoration: none; font-weight: 600; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>Kriosk Creatta</h1>
      <p>Creative Agency · Ahmedabad</p>
    </div>
    <div class="body">
      <h2>Hey ${escapeHtml(data.name)}, thanks for reaching out! 👋</h2>
      <p>We've received your message and our team will get back to you within <strong>24 hours</strong>. In the meantime, feel free to connect with us on WhatsApp for a faster response.</p>

      <div class="summary">
        <p><strong>Service Interested In:</strong> ${escapeHtml(data.service || "General Enquiry")}</p>
        ${data.message ? `<p><strong>Your Message:</strong> ${escapeHtml(data.message).replace(/\n/g, "<br/>")}</p>` : ""}
      </div>

      <p>While you wait, check out our latest work on <a href="https://www.behance.net/info20b06e6f" style="color:#2d6a4f;font-weight:600;">Behance</a> or follow us on <a href="https://www.instagram.com/krioskcreata/" style="color:#2d6a4f;font-weight:600;">Instagram</a>.</p>

      <div class="cta">
        <a href="https://wa.me/916359303111">Chat on WhatsApp</a>
      </div>
    </div>
    <div class="footer">
      <p>
        Kriosk Creatta · 304, Jeet Complex, Ahmedabad, Gujarat<br/>
        <a href="tel:+916359303111">+91 63593 03111</a> · <a href="mailto:info@krioskcreatta.com">info@krioskcreatta.com</a>
      </p>
    </div>
  </div>
</body>
</html>`;

  const text = `
Hi ${data.name},

Thanks for contacting Kriosk Creatta! We've received your message and will get back to you within 24 hours.

Service: ${data.service || "—"}
Message: ${data.message || "—"}

For faster response, WhatsApp us: https://wa.me/916359303111

— Kriosk Creatta Team
`;

  return { subject, html, text };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}