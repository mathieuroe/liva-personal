import { sql } from "@vercel/postgres";

/** Tabelle anlegen falls noch nicht vorhanden */
async function initLeadsTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS leads (
      id        SERIAL PRIMARY KEY,
      email     TEXT NOT NULL,
      phone     TEXT,
      plz       TEXT,
      source    TEXT,
      pflegegrad TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      status    TEXT DEFAULT 'neu'
    )
  `;
}

export async function insertLead(data: {
  email: string;
  phone?: string | null;
  plz?: string | null;
  source?: string | null;
  pflegegrad?: string | null;
}) {
  if (!process.env.POSTGRES_URL) return;
  await initLeadsTable();
  await sql`
    INSERT INTO leads (email, phone, plz, source, pflegegrad)
    VALUES (
      ${data.email},
      ${data.phone ?? null},
      ${data.plz ?? null},
      ${data.source ?? null},
      ${data.pflegegrad ?? null}
    )
  `;
}

export async function getAllLeads() {
  if (!process.env.POSTGRES_URL) return [];
  await initLeadsTable();
  const { rows } = await sql`SELECT * FROM leads ORDER BY created_at DESC`;
  return rows;
}

export async function updateLeadStatus(id: number, status: string) {
  if (!process.env.POSTGRES_URL) return;
  await sql`UPDATE leads SET status = ${status} WHERE id = ${id}`;
}
