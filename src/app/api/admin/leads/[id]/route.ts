import { NextRequest, NextResponse } from "next/server";
import { updateLeadStatus } from "@/lib/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { status } = await req.json();
  const valid = ["neu", "kontaktiert", "abgeschlossen"];

  if (!valid.includes(status)) {
    return NextResponse.json({ error: "Ungültiger Status" }, { status: 400 });
  }

  try {
    await updateLeadStatus(Number(params.id), status);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[admin/leads/id] Fehler:", err);
    return NextResponse.json({ error: "Fehler beim Speichern" }, { status: 500 });
  }
}
