import nodemailer from "nodemailer";

const BRAND = "#0F6E56";
const BRAND_LIGHT = "#E1F5EE";

function getTransporter() {
  return nodemailer.createTransport({
    host: "smtp.ionos.de",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function wrapEmail(content: string) {
  return `
<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#F6FAF8;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F6FAF8;padding:24px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="background:${BRAND};padding:24px 32px;">
              <span style="font-family:Georgia,serif;font-size:22px;font-weight:700;color:#ffffff;">liva</span>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;color:#0F1F1A;font-size:15px;line-height:1.6;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px;background:${BRAND_LIGHT};font-size:12px;color:#5C7A6F;">
              liva · <a href="https://www.liva-pflege.de" style="color:${BRAND};text-decoration:none;">www.liva-pflege.de</a><br>
              <a href="https://www.liva-pflege.de/datenschutz" style="color:#5C7A6F;">Datenschutz</a> ·
              <a href="https://www.liva-pflege.de/impressum" style="color:#5C7A6F;">Impressum</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function sendInternalLeadNotification(data: {
  email: string;
  phone?: string;
  plz?: string;
  pflegegrad?: string;
  source: string;
  timestamp: string;
}) {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:6px 0;color:#5C7A6F;width:120px;">${label}</td>
      <td style="padding:6px 0;color:#0F1F1A;font-weight:600;">${value}</td>
    </tr>`;

  const html = wrapEmail(`
    <h2 style="margin:0 0 16px;font-size:18px;color:#0F1F1A;">Neuer Lead eingegangen</h2>
    <table cellpadding="0" cellspacing="0" style="width:100%;font-size:14px;">
      ${row("E-Mail", data.email)}
      ${row("Telefon", data.phone || "–")}
      ${row("PLZ", data.plz || "–")}
      ${row("Pflegegrad", data.pflegegrad || "–")}
      ${row("Herkunft", data.source)}
      ${row("Zeitstempel", data.timestamp)}
    </table>
    <div style="margin-top:24px;">
      <a href="https://www.liva-pflege.de/admin" style="display:inline-block;background:${BRAND};color:#ffffff;text-decoration:none;padding:10px 24px;border-radius:100px;font-size:14px;font-weight:600;">Im Admin öffnen →</a>
    </div>
  `);

  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"liva Leads" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
    subject: `Neuer Lead – ${data.pflegegrad ?? "kein PG"} – ${data.source}`,
    html,
    text: [
      "Neuer Lead eingegangen:",
      "",
      `E-Mail:      ${data.email}`,
      `Telefon:     ${data.phone || "–"}`,
      `PLZ:         ${data.plz || "–"}`,
      `Pflegegrad:  ${data.pflegegrad || "–"}`,
      `Herkunft:    ${data.source}`,
      `Zeitstempel: ${data.timestamp}`,
    ].join("\n"),
  });
}

export async function sendLeadConfirmation(data: {
  email: string;
  pflegegrad?: string;
}) {
  const html = wrapEmail(`
    <h2 style="margin:0 0 16px;font-size:20px;color:#0F1F1A;font-family:Georgia,serif;">Danke für deine Anfrage!</h2>
    <p style="margin:0 0 16px;">
      Wir haben deine Angaben erhalten und melden uns in Kürze bei dir, um deine Ansprüche${data.pflegegrad ? ` (Pflegegrad ${data.pflegegrad})` : ""} gemeinsam zu klären.
    </p>
    <p style="margin:0 0 16px;">
      In der Zwischenzeit kannst du dir schon einen Überblick verschaffen, welche Leistungen dir zustehen:
    </p>
    <div style="margin:24px 0;">
      <a href="https://www.liva-pflege.de/leistungen" style="display:inline-block;background:${BRAND};color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:100px;font-size:15px;font-weight:600;">Leistungen ansehen →</a>
    </div>
    <p style="margin:0;color:#5C7A6F;font-size:13px;">
      Falls du Fragen hast, antworte einfach auf diese E-Mail.
    </p>
  `);

  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"liva" <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: "Deine Anfrage bei liva – das sind die nächsten Schritte",
    html,
    text: `Danke für deine Anfrage! Wir melden uns in Kürze bei dir. In der Zwischenzeit: https://www.liva-pflege.de/leistungen`,
  });
}
