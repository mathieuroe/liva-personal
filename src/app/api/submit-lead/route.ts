import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, phone, plz, path, pflegegrad, timestamp } = body;

  const ts = timestamp || new Date().toISOString();

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ionos.de",
      port: 587,
      secure: false, // STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"liva Leads" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // Eingang an dieselbe Adresse
      subject: `Neuer Lead – ${pflegegrad ?? "kein PG"} – ${path}`,
      text: [
        "Neuer Lead eingegangen:",
        "",
        `E-Mail:     ${email}`,
        `Telefon:    ${phone || "–"}`,
        `PLZ:        ${plz || "–"}`,
        `Pflegegrad: ${pflegegrad || "–"}`,
        `Herkunft:   ${path}`,
        `Zeitstempel: ${ts}`,
      ].join("\n"),
    });
  } catch (err) {
    console.error("[submit-lead] E-Mail-Versand fehlgeschlagen:", err);
    // Trotzdem success zurückgeben – User soll keine Fehlermeldung sehen
  }

  return NextResponse.json({ success: true });
}
