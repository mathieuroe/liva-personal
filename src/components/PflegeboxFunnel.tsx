"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const pgLabels = ["Kein PG", "PG 1", "PG 2", "PG 3", "PG 4", "PG 5"];

export default function PflegeboxFunnel() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [pflegegrad, setPflegegrad] = useState<number | null>(null);
  const [plz, setPlz] = useState("");
  const [form, setForm] = useState({ name: "", telefon: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, plz, pflegegrad: pflegegrad !== null ? `PG ${pflegegrad}` : "Kein PG", funnel: "pflegebox" }),
      });
      setSubmitted(true);
    } finally { setSubmitting(false); }
  }

  if (submitted) {
    return (
      <div className="card p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-brand-light flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={32} className="text-brand" />
        </div>
        <h3 className="font-semibold text-gray-900 text-xl mb-2">Anfrage erhalten!</h3>
        <p className="text-gray-500 text-sm">Wir melden uns innerhalb von 24 Stunden bei dir.</p>
      </div>
    );
  }

  return (
    <div className="card p-6 sm:p-8 space-y-6">
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3">Schritt 1 von 3: Pflegegrad wählen</p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {pgLabels.map((label, i) => (
            <button key={i} onClick={() => { setPflegegrad(i); if (step < 2) setStep(2); }}
              className={`rounded-full py-2 text-sm font-semibold border transition-all ${pflegegrad === i ? "bg-brand text-white border-brand" : "bg-white text-gray-700 border-[#E0EDE7] hover:border-brand hover:text-brand"}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {step >= 2 && (
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-3">Schritt 2 von 3: Deine PLZ</p>
          <div className="flex gap-3">
            <input type="text" placeholder="z.B. 79100" value={plz} onChange={(e) => setPlz(e.target.value)} maxLength={5} className="input flex-1" />
            <button onClick={() => { if (plz.length >= 4) setStep(3); }} disabled={plz.length < 4} className="btn-primary disabled:opacity-50">
              Weiter <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {step >= 3 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm font-semibold text-gray-700">Schritt 3 von 3: Deine Kontaktdaten</p>
          <input type="text" required placeholder="Dein Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
          <input type="tel" required placeholder="Telefonnummer" value={form.telefon} onChange={(e) => setForm({ ...form, telefon: e.target.value })} className="input" />
          <input type="email" placeholder="E-Mail (optional)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" />
          <button type="submit" disabled={submitting} className="btn-primary w-full justify-center py-3.5">
            {submitting ? "Wird gesendet..." : "Kostenlose Pflegebox anfragen →"}
          </button>
          <p className="text-xs text-gray-400 text-center">Kostenlos & unverbindlich.</p>
        </form>
      )}
    </div>
  );
}
