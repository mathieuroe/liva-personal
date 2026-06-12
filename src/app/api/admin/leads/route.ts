import { NextResponse } from "next/server";
import { getAllLeads } from "@/lib/db";

export async function GET() {
  try {
    const leads = await getAllLeads();
    return NextResponse.json({ leads });
  } catch (err) {
    console.error("[admin/leads] Fehler:", err);
    return NextResponse.json({ leads: [] });
  }
}
