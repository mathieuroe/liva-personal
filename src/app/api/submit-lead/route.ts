import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, phone, plz, path, pflegegrad, timestamp } = body;

  // TODO: Airtable integration
  // const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY });
  // await airtable.base(process.env.AIRTABLE_BASE_ID!).table("Leads").create({ ... });

  // TODO: Resend welcome email
  // await resend.emails.send({ from: "liva <noreply@liva-pflege.de>", to: email, ... });

  console.log("[submit-lead]", {
    email,
    phone,
    plz,
    path,
    pflegegrad,
    timestamp: timestamp || new Date().toISOString(),
  });

  return NextResponse.json({ success: true });
}
