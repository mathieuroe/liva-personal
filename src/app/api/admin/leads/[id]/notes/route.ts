import { NextRequest, NextResponse } from "next/server";
import { getLeadNotes, addLeadNote } from "@/lib/db";

// In-memory Mock für lokale Vorschau (ohne Datenbank)
type Note = { id: number; lead_id: number; text: string; created_at: string };

const mockStore = new Map<number, Note[]>([
  [1, [
    { id: 1, lead_id: 1, text: "Hat sich über die Pflegebox informiert – Interesse sehr groß.", created_at: new Date(Date.now() - 20 * 60 * 1000).toISOString() },
  ]],
  [2, [
    { id: 2, lead_id: 2, text: "Telefonisch nicht erreichbar, E-Mail gesendet.", created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
    { id: 3, lead_id: 2, text: "Erstgespräch geführt, Rückruf für nächste Woche vereinbart.", created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() },
  ]],
]);
let mockIdCounter = 20;

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const leadId = Number(params.id);

  if (!process.env.POSTGRES_URL) {
    return NextResponse.json({ notes: mockStore.get(leadId) ?? [] });
  }

  try {
    const notes = await getLeadNotes(leadId);
    return NextResponse.json({ notes });
  } catch (err) {
    console.error("[notes] GET Fehler:", err);
    return NextResponse.json({ notes: [] });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const leadId = Number(params.id);
  const { text } = await req.json();

  if (!text?.trim()) {
    return NextResponse.json({ error: "Kein Text" }, { status: 400 });
  }

  if (!process.env.POSTGRES_URL) {
    const note: Note = { id: ++mockIdCounter, lead_id: leadId, text: text.trim(), created_at: new Date().toISOString() };
    const existing = mockStore.get(leadId) ?? [];
    mockStore.set(leadId, [note, ...existing]);
    return NextResponse.json({ note });
  }

  try {
    const note = await addLeadNote(leadId, text.trim());
    return NextResponse.json({ note });
  } catch (err) {
    console.error("[notes] POST Fehler:", err);
    return NextResponse.json({ error: "Fehler" }, { status: 500 });
  }
}
