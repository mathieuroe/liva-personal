"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Shield, Clock, Lock } from "lucide-react";
import PflegegradRechner from "@/components/funnel/PflegegradRechner";

const PFLEGEGRAD_LABELS: Record<number, { titel: string; farbe: string; beschreibung: string }> = {
  0: { titel: "Kein Pflegegrad", farbe: "#6B7280", beschreibung: "Die Punktzahl reicht noch nicht für eine Einstufung." },
  1: { titel: "Pflegegrad 1", farbe: "#10B981", beschreibung: "Geringe Beeinträchtigung der Selbstständigkeit." },
  2: { titel: "Pflegegrad 2", farbe: "#F59E0B", beschreibung: "Erhebliche Beeinträchtigung der Selbstständigkeit." },
  3: { titel: "Pflegegrad 3", farbe: "#F97316", beschreibung: "Schwere Beeinträchtigung der Selbstständigkeit." },
  4: { titel: "Pflegegrad 4", farbe: "#EF4444", beschreibung: "Schwerste Beeinträchtigung der Selbstständigkeit." },
  5: { titel: "Pflegegrad 5", farbe: "#7C3AED", beschreibung: "Schwerste Beeinträchtigung mit besonderen Anforderungen an die Pflege." },
};

const LEISTUNGEN: Record<number, string[]> = {
  0: ["Noch kein Anspruch auf Pflegeleistungen", "Ggf. Widerspruch oder Neuantrag sinnvoll"],
  1: ["Entlastungsbetrag: 125 € / Monat", "Pflegehilfsmittelbox: bis 42 € / Monat", "Hausnotruf-Zuschuss: 27,00 € / Monat"],
  2: ["Pflegegeld: 332 € / Monat", "Pflegehilfsmittelbox: bis 42 € / Monat", "Entlastungsbetrag: 131 € / Monat", "Hausnotruf-Zuschuss: 27,00 € / Monat"],
  3: ["Pflegegeld: 572 € / Monat", "Pflegesachleistung: bis 1.363 € / Monat", "Entlastungsbetrag: 131 € / Monat", "Kurzzeitpflege & Verhinderungspflege"],
  4: ["Pflegegeld: 764 € / Monat", "Pflegesachleistung: bis 1.693 € / Monat", "Vollstationäre Pflege möglich", "Kurzzeitpflege & Verhinderungspflege"],
  5: ["Pflegegeld: 946 € / Monat", "Pflegesachleistung: bis 2.095 € / Monat", "Besonderer Härtefall-Zuschuss möglich", "Vollstationäre Pflege mit Zuschlag"],
};

export default function PflegegradRechnerPage() {
  const [ergebnis, setErgebnis] = useState<{ pflegegrad: number; punkte: number } | null>(null);
  const [form, setForm] = useState({ email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleErgebnis(pflegegrad: number, gesamtpunkte: number) {
    setErgebnis({ pflegegrad, punkte: gesamtpunkte });
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          path: "/pflegegrad-rechner",
          pflegegrad: ergebnis?.pflegegrad?.toString(),
          punkte: ergebnis?.punkte,
          timestamp: new Date().toISOString(),
        }),
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  const pg = ergebnis ? PFLEGEGRAD_LABELS[ergebnis.pflegegrad] : null;
  const leistungen = ergebnis ? LEISTUNGEN[ergebnis.pflegegrad] : [];

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-[#E0EDE7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-10">
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 bg-brand-light text-brand text-xs font-semibold px-3 py-1.5 rounded-full">
              <Shield size={12} /> Anonym & kostenlos
            </span>
            <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-full">
              <Clock size={12} /> ca. 5–10 Minuten
            </span>
            <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-full">
              <Lock size={12} /> Kein Login nötig
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl text-gray-900 leading-tight mb-4">
            Pflegegrad Rechner 2026 –<br className="hidden sm:block" /> Kostenlos &amp; anonym
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
            Ermittle in wenigen Minuten welcher Pflegegrad für dich oder deine Angehörigen in Frage kommt. Basiert auf dem offiziellen NBA-Begutachtungsinstrument des MDK – dem gleichen Verfahren, das Pflegekassen verwenden.
          </p>

          {/* Trust-Zeile */}
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400">
            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand" /> Basiert auf offiziellem MDK-Verfahren</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand" /> Keine persönlichen Daten nötig</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand" /> Ergebnis sofort angezeigt</span>
          </div>
        </div>
      </section>

      {/* ── Rechner oder Ergebnis ────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

        {!ergebnis ? (
          <PflegegradRechner onErgebnis={handleErgebnis} />
        ) : (
          <div className="space-y-6">

            {/* Ergebnis-Card */}
            <div
              className="rounded-2xl p-7 text-white shadow-lg"
              style={{ background: `linear-gradient(135deg, ${pg!.farbe}ee, ${pg!.farbe}bb)` }}
            >
              <p className="text-sm font-semibold uppercase tracking-widest opacity-80 mb-2">Dein geschätztes Ergebnis</p>
              <h2 className="font-serif text-4xl font-bold mb-1">{pg!.titel}</h2>
              <p className="opacity-90 mb-3">{pg!.beschreibung}</p>
              <p className="text-sm opacity-70">{ergebnis.punkte} von 100 Punkten</p>
            </div>

            {/* Leistungsübersicht */}
            {ergebnis.pflegegrad > 0 && (
              <div className="bg-white rounded-2xl border border-[#E0EDE7] p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Deine wichtigsten Leistungsansprüche</h3>
                <ul className="space-y-2.5">
                  {leistungen.map((l) => (
                    <li key={l} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <CheckCircle2 size={16} className="text-brand flex-shrink-0 mt-0.5" />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ── Inline Opt-in ─────────────────────────────────── */}
            <div className="bg-brand-light rounded-2xl border border-brand/20 p-7">
              {!submitted ? (
                <>
                  <p className="text-xs font-bold text-brand uppercase tracking-widest mb-2">Nächster Schritt</p>
                  <h3 className="font-serif text-2xl text-gray-900 mb-1.5">
                    Wir schicken dir deine persönliche Leistungsübersicht als PDF
                  </h3>
                  <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                    Dein Ergebnis als PDF – inklusive aller Leistungen, Beträge und konkreten nächsten Schritte für {pg!.titel}.
                    Kostenlos, kein Spam.
                  </p>
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      required
                      placeholder="E-Mail-Adresse"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="input flex-1 min-w-0"
                    />
                    <input
                      type="tel"
                      placeholder="Telefonnummer (optional)"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="input flex-1 min-w-0"
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary whitespace-nowrap px-6 py-3"
                    >
                      {submitting ? "Wird gesendet…" : <>Kostenlos erhalten <ArrowRight size={16} /></>}
                    </button>
                  </form>
                  <p className="text-xs text-gray-400 mt-3 flex items-center gap-1.5">
                    <Lock size={11} /> DSGVO-konform · Kein Spam · Jederzeit abmeldbar
                  </p>
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="w-14 h-14 rounded-full bg-brand flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={28} className="text-white" />
                  </div>
                  <h3 className="font-serif text-2xl text-gray-900 mb-2">Super – schau in dein Postfach!</h3>
                  <p className="text-sm text-gray-500">Deine Leistungsübersicht für {pg!.titel} ist unterwegs. Wir melden uns innerhalb von 24 Stunden.</p>
                </div>
              )}
            </div>

            {/* Neu berechnen */}
            <div className="text-center">
              <button
                onClick={() => { setErgebnis(null); setSubmitted(false); setForm({ email: "", phone: "" }); }}
                className="text-sm text-gray-400 hover:text-brand underline underline-offset-2 transition-colors"
              >
                Rechner neu starten
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ── Erklärung Pflegegrade ───────────────────────────────── */}
      {!ergebnis && (
        <section className="bg-white border-t border-[#E0EDE7] py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="font-serif text-2xl text-gray-900 mb-8">Die 5 Pflegegrade im Überblick</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { pg: 1, punkte: "12,5–27", label: "Geringe Beeinträchtigung", farbe: "#10B981" },
                { pg: 2, punkte: "27–47,5", label: "Erhebliche Beeinträchtigung", farbe: "#F59E0B" },
                { pg: 3, punkte: "47,5–70", label: "Schwere Beeinträchtigung", farbe: "#F97316" },
                { pg: 4, punkte: "70–90", label: "Schwerste Beeinträchtigung", farbe: "#EF4444" },
                { pg: 5, punkte: "90–100", label: "Schwerste + besondere Anforderungen", farbe: "#7C3AED" },
              ].map((item) => (
                <div key={item.pg} className="rounded-xl border border-[#E0EDE7] p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: item.farbe }}>
                      {item.pg}
                    </span>
                    <span className="font-semibold text-gray-900 text-sm">Pflegegrad {item.pg}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                  <p className="text-xs text-gray-400">{item.punkte} Punkte</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ────────────────────────────────────────────────────── */}
      {!ergebnis && (
        <section className="py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="font-serif text-2xl text-gray-900 mb-8">Häufige Fragen zum Pflegegrad Rechner</h2>
            <div className="space-y-5">
              {[
                {
                  q: "Wie genau ist der Pflegegrad Rechner?",
                  a: "Unser Rechner basiert auf dem offiziellen NBA-Begutachtungsinstrument des Medizinischen Dienstes (MDK). Er gibt eine fundierte Einschätzung – ist aber kein Ersatz für die offizielle Begutachtung. In der Praxis weicht das Ergebnis oft um einen halben bis einen Pflegegrad ab.",
                },
                {
                  q: "Ist der Rechner anonym und kostenlos?",
                  a: "Ja – vollständig kostenlos und anonym. Keine Angaben zur Person, keine Anmeldung, keine Kreditkarte. Deine Antworten werden nicht gespeichert.",
                },
                {
                  q: "Wie lange dauert die Berechnung?",
                  a: "In der Regel 5–10 Minuten. Du bekommst das Ergebnis sofort nach Abschluss angezeigt.",
                },
                {
                  q: "Was sind die 5 Pflegegrade?",
                  a: "PG 1 (geringe Beeinträchtigung), PG 2 (erhebliche), PG 3 (schwere), PG 4 (schwerste) und PG 5 (schwerste mit besonderem Pflegebedarf). Die Einstufung bestimmt welche Leistungen du von der Pflegekasse bekommst.",
                },
                {
                  q: "Was bekomme ich mit Pflegegrad 1?",
                  a: "Mit Pflegegrad 1 hast du Anspruch auf: Entlastungsbetrag (125 € / Monat), Pflegehilfsmittelbox (bis 42 € / Monat) und Hausnotruf-Zuschuss (27,00 € / Monat + einmalig bis zu 10,49 €). Pflegegeld gibt es erst ab Pflegegrad 2.",
                },
                {
                  q: "Was tun nach dem Rechner-Ergebnis?",
                  a: "Wenn das Ergebnis auf einen Pflegegrad hinweist: Stelle einen Antrag bei deiner Pflegekasse – schriftlich, telefonisch oder online. Der MDK kommt dann zur Begutachtung. Fordere jetzt dein kostenloses Ergebnis-PDF an – dort sind alle nächsten Schritte aufgeführt.",
                },
              ].map(({ q, a }) => (
                <details key={q} className="group bg-white rounded-xl border border-[#E0EDE7] p-5 cursor-pointer">
                  <summary className="font-semibold text-gray-900 text-sm list-none flex items-center justify-between gap-3">
                    {q}
                    <span className="text-brand text-lg leading-none group-open:rotate-45 transition-transform duration-200 flex-shrink-0">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA ─────────────────────────────────────────────── */}
      {!ergebnis && (
        <section className="bg-brand py-14">
          <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-serif text-3xl text-white mb-3">Pflegegrad jetzt ermitteln</h2>
            <p className="text-white/70 mb-6 text-sm leading-relaxed">
              Kostenlos, anonym, in 5 Minuten. Basiert auf dem offiziellen MDK-Begutachtungsverfahren.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-2 bg-white text-brand font-semibold px-8 py-3.5 text-base rounded-2xl hover:bg-brand-light transition-colors"
            >
              Jetzt starten <ArrowRight size={18} />
            </button>
          </div>
        </section>
      )}

    </main>
  );
}
