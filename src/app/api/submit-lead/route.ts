import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { insertLead } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, phone, plz, path, pflegegrad, funnel, timestamp } = body;

  const ts = timestamp || new Date().toISOString();
  const source = path || funnel || "unbekannt";

  // In Datenbank speichern
  try {
    await insertLead({ email, phone, plz, source, pflegegrad });
  } catch (err) {
    console.error("[submit-lead] DB-Speicherung fehlgeschlagen:", err);
  }

  // Per Mail benachrichtigen
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ionos.de",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"liva Leads" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `Neuer Lead – ${pflegegrad ?? "kein PG"} – ${source}`,
      text: [
        "Neuer Lead eingegangen:",
        "",
        `E-Mail:      ${email}`,
        `Telefon:     ${phone || "–"}`,
        `PLZ:         ${plz || "–"}`,
        `Pflegegrad:  ${pflegegrad || "–"}`,
        `Herkunft:    ${source}`,
        `Zeitstempel: ${ts}`,
      ].join("\n"),
    });
  } catch (err) {
    console.error("[submit-lead] E-Mail-Versand fehlgeschlagen:", err);
  }

  return NextResponse.json({ success: true });
}
