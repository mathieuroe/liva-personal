import { sql } from "@vercel/postgres";

async function initLeadsTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS leads (
      id         SERIAL PRIMARY KEY,
      email      TEXT NOT NULL,
      phone      TEXT,
      plz        TEXT,
      source     TEXT,
      pflegegrad TEXT,
      tags       TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      status     TEXT DEFAULT 'neu'
    )
  `;
  // tags-Spalte nachrüsten falls Tabelle schon existiert
  await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS tags TEXT`;
}

async function initNotesTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS lead_notes (
      id         SERIAL PRIMARY KEY,
      lead_id    INTEGER NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
      text       TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

// ── Leads ────────────────────────────────────────────────

export async function insertLead(data: {
  email: string;
  phone?: string | null;
  plz?: string | null;
  source?: string | null;
  pflegegrad?: string | null;
  tags?: string | null;
}) {
  if (!process.env.POSTGRES_URL) return;
  await initLeadsTable();
  await sql`
    INSERT INTO leads (email, phone, plz, source, pflegegrad, tags)
    VALUES (${data.email}, ${data.phone ?? null}, ${data.plz ?? null}, ${data.source ?? null}, ${data.pflegegrad ?? null}, ${data.tags ?? null})
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

export async function updateLeadFull(id: number, data: {
  email: string;
  phone: string | null;
  plz: string | null;
  pflegegrad: string | null;
  status: string;
  tags: string | null;
}) {
  if (!process.env.POSTGRES_URL) return;
  await sql`
    UPDATE leads
    SET email      = ${data.email},
        phone      = ${data.phone},
        plz        = ${data.plz},
        pflegegrad = ${data.pflegegrad},
        status     = ${data.status},
        tags       = ${data.tags}
    WHERE id = ${id}
  `;
}

// ── Notizen ──────────────────────────────────────────────

export async function getLeadNotes(leadId: number) {
  if (!process.env.POSTGRES_URL) return [];
  await initNotesTable();
  const { rows } = await sql`
    SELECT * FROM lead_notes WHERE lead_id = ${leadId} ORDER BY created_at DESC
  `;
  return rows;
}

export async function addLeadNote(leadId: number, text: string) {
  if (!process.env.POSTGRES_URL) return null;
  await initNotesTable();
  const { rows } = await sql`
    INSERT INTO lead_notes (lead_id, text) VALUES (${leadId}, ${text}) RETURNING *
  `;
  return rows[0];
}
