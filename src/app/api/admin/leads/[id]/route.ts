import { NextRequest, NextResponse } from "next/server";
import { updateLeadStatus, updateLeadFull } from "@/lib/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const body = await req.json();
  const validStatuses = ["neu", "kontaktiert", "abgeschlossen"];

  try {
    if (Object.keys(body).length === 1 && body.status !== undefined) {
      // Nur Status-Update (aus der Tabelle)
      if (!validStatuses.includes(body.status)) {
        return NextResponse.json({ error: "Ungültiger Status" }, { status: 400 });
      }
      await updateLeadStatus(id, body.status);
    } else {
      // Vollständiges Update (aus dem Popup)
      if (!validStatuses.includes(body.status)) {
        return NextResponse.json({ error: "Ungültiger Status" }, { status: 400 });
      }
      await updateLeadFull(id, {
        email: body.email,
        phone: body.phone || null,
        plz: body.plz || null,
        pflegegrad: body.pflegegrad || null,
        status: body.status,
        tags: body.tags || null,
      });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[admin/leads/id] Fehler:", err);
    return NextResponse.json({ error: "Fehler beim Speichern" }, { status: 500 });
  }
}
