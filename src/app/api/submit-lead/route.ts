import { NextRequest, NextResponse } from "next/server";
import { insertLead } from "@/lib/db";
import { sendInternalLeadNotification, sendLeadConfirmation } from "@/lib/email";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, phone, plz, path, pflegegrad, funnel, timestamp, einrichtung, tags, interessen } = body;

  const ts = timestamp || new Date().toISOString();
  const source = path || funnel || "unbekannt";
  const resolvedTags = tags || (Array.isArray(interessen) ? interessen.join(", ") : interessen) || null;

  // In Datenbank speichern
  try {
    await insertLead({ email, phone, plz, source, pflegegrad, tags: resolvedTags });
  } catch (err) {
    console.error("[submit-lead] DB-Speicherung fehlgeschlagen:", err);
  }

  // Interne Benachrichtigung
  try {
    await sendInternalLeadNotification({ email, phone, plz, pflegegrad, source, timestamp: ts });
  } catch (err) {
    console.error("[submit-lead] interne E-Mail fehlgeschlagen:", err);
  }

  // Ergebnis-Email an den Lead
  if (email) {
    try {
      await sendLeadConfirmation({ email, pflegegrad, einrichtung });
    } catch (err) {
      console.error("[submit-lead] Bestätigungs-E-Mail fehlgeschlagen:", err);
    }
  }

  return NextResponse.json({ success: true });
}
