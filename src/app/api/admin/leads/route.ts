import { NextResponse } from "next/server";
import { getAllLeads } from "@/lib/db";

const MOCK_LEADS = [
  { id: 1, email: "maria.schmidt@gmail.com", phone: "0176 23456789", plz: "80331", source: "pfad-b", pflegegrad: "PG 2", created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), status: "neu" },
  { id: 2, email: "k.mueller@web.de", phone: "–", plz: "10115", source: "pfad-b-checkliste", pflegegrad: "PG 3", created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), status: "kontaktiert" },
  { id: 3, email: "info@familie-bauer.de", phone: "0151 98765432", plz: "20095", source: "hausnotruf", pflegegrad: "PG 1", created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), status: "neu" },
  { id: 4, email: "petra.wagner@t-online.de", phone: "0162 11223344", plz: "50667", source: "pfad-a", pflegegrad: "–", created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), status: "abgeschlossen" },
  { id: 5, email: "h.hoffmann@gmx.de", phone: "0170 55667788", plz: "70173", source: "pflegebox", pflegegrad: "PG 4", created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), status: "kontaktiert" },
];

export async function GET() {
  // Keine Datenbank verbunden → Mock-Daten für lokale Vorschau
  if (!process.env.POSTGRES_URL) {
    return NextResponse.json({ leads: MOCK_LEADS });
  }

  try {
    const leads = await getAllLeads();
    return NextResponse.json({ leads });
  } catch (err) {
    console.error("[admin/leads] Fehler:", err);
    return NextResponse.json({ leads: [] });
  }
}
