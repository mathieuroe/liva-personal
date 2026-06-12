"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { LogOut, RefreshCw } from "lucide-react";

type Status = "neu" | "kontaktiert" | "abgeschlossen";

type Lead = {
  id: number;
  email: string;
  phone: string | null;
  plz: string | null;
  source: string | null;
  pflegegrad: string | null;
  created_at: string;
  status: Status;
};

const STATUS: Record<Status, { label: string; className: string }> = {
  neu:            { label: "Neu",           className: "bg-brand text-white" },
  kontaktiert:    { label: "Kontaktiert",   className: "bg-yellow-100 text-yellow-700" },
  abgeschlossen:  { label: "Erledigt",      className: "bg-gray-100 text-gray-500" },
};

const NEXT_STATUS: Record<Status, Status> = {
  neu:           "kontaktiert",
  kontaktiert:   "abgeschlossen",
  abgeschlossen: "neu",
};

type Filter = "alle" | Status;

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("alle");
  const router = useRouter();

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/leads");
      const data = await res.json();
      setLeads(data.leads ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  async function cycleStatus(lead: Lead) {
    const next = NEXT_STATUS[lead.status];
    // Optimistisch updaten
    setLeads((prev) =>
      prev.map((l) => l.id === lead.id ? { ...l, status: next } : l)
    );
    await fetch(`/api/admin/leads/${lead.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const filtered = filter === "alle"
    ? leads
    : leads.filter((l) => l.status === filter);

  const counts = {
    alle:          leads.length,
    neu:           leads.filter((l) => l.status === "neu").length,
    kontaktiert:   leads.filter((l) => l.status === "kontaktiert").length,
    abgeschlossen: leads.filter((l) => l.status === "abgeschlossen").length,
  };

  function formatDate(ts: string) {
    return new Date(ts).toLocaleDateString("de-DE", {
      day: "2-digit", month: "2-digit", year: "2-digit",
      hour: "2-digit", minute: "2-digit",
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-[#E0EDE7] px-6 py-4 flex items-center justify-between">
        <p className="font-serif text-xl text-gray-900">liva Admin</p>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchLeads}
            className="btn-ghost p-2"
            title="Aktualisieren"
          >
            <RefreshCw size={15} />
          </button>
          <button
            onClick={handleLogout}
            className="btn-ghost flex items-center gap-2 text-sm"
          >
            <LogOut size={15} /> Ausloggen
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">

        {/* Stats / Filter */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(["alle", "neu", "kontaktiert", "abgeschlossen"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`card p-4 text-left transition-all hover:shadow-md ${
                filter === s ? "border-2 border-brand" : ""
              }`}
            >
              <p className="text-2xl font-bold text-gray-900">{counts[s]}</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {s === "alle" ? "Gesamt" : STATUS[s].label}
              </p>
            </button>
          ))}
        </div>

        {/* Tabelle */}
        <div className="card overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-400 text-sm">Lädt...</div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-gray-400 text-sm">
              Noch keine Leads vorhanden.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E0EDE7] bg-gray-50">
                    {["Datum", "E-Mail", "Telefon", "PLZ", "PG", "Herkunft", "Status"].map((h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((lead, i) => (
                    <tr
                      key={lead.id}
                      className={`border-b border-[#E0EDE7] last:border-0 ${
                        i % 2 === 0 ? "bg-white" : "bg-gray-50/40"
                      }`}
                    >
                      <td className="px-4 py-3 text-gray-400 whitespace-nowrap text-xs">
                        {formatDate(lead.created_at)}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        <a
                          href={`mailto:${lead.email}`}
                          className="hover:text-brand transition-colors"
                        >
                          {lead.email}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{lead.phone || "–"}</td>
                      <td className="px-4 py-3 text-gray-500">{lead.plz || "–"}</td>
                      <td className="px-4 py-3 text-gray-500">{lead.pflegegrad || "–"}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs">{lead.source || "–"}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => cycleStatus(lead)}
                          title="Klicken zum Wechseln"
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full transition-all hover:opacity-80 ${
                            STATUS[lead.status].className
                          }`}
                        >
                          {STATUS[lead.status].label}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
