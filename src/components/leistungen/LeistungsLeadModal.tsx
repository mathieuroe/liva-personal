"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle2, ArrowRight, Lock } from "lucide-react";

const PFLEGEGRADE = ["Noch kein Pflegegrad", "Pflegegrad 1", "Pflegegrad 2", "Pflegegrad 3", "Pflegegrad 4", "Pflegegrad 5", "Weiß ich nicht"];

const WEITERE_LEISTUNGEN = [
  "Entlastungsbetrag",
  "Pflegegeld",
  "Pflegesachleistungen",
  "Verhinderungs- & Kurzzeitpflege",
  "Tagespflege",
  "Wohnraumanpassung",
  "Pflegehilfsmittelbox",
  "Hausnotruf",
];

interface Props {
  leistung: string;
  onClose: () => void;
}

export default function LeistungsLeadModal({ leistung, onClose }: Props) {
  const [form, setForm] = useState({
    name: "",
    pflegegrad: "Noch kein Pflegegrad",
    email: "",
    phone: "",
    plz: "",
    interessen: [leistung],
    einverstaendnis: true,
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  function toggleInteresse(item: string) {
    setForm((f) => ({
      ...f,
      interessen: f.interessen.includes(item)
        ? f.interessen.filter((i) => i !== item)
        : [...f.interessen, item],
    }));
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
          interessen: form.interessen.join(", "),
          path: "/leistungen",
          timestamp: new Date().toISOString(),
        }),
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {!submitted ? (
          <>
            {/* Header */}
            <div className="flex items-start justify-between p-6 pb-4 border-b border-gray-100">
              <div>
                <p className="text-xs font-bold text-brand uppercase tracking-widest mb-1">Kostenlose Vermittlung</p>
                <h2 className="font-serif text-xl text-gray-900 leading-snug">
                  Den passenden Anbieter<br />für {leistung} finden
                </h2>
              </div>
              <button onClick={onClose} className="text-gray-300 hover:text-gray-500 flex-shrink-0 ml-3 mt-1">
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Dein Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Vor- und Nachname"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">E-Mail</label>
                  <input
                    type="email"
                    required
                    placeholder="name@email.de"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="input"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Telefon</label>
                  <input
                    type="tel"
                    required
                    placeholder="0176 …"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="input"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Postleitzahl</label>
                  <input
                    type="text"
                    required
                    placeholder="79xxx"
                    maxLength={5}
                    value={form.plz}
                    onChange={(e) => setForm({ ...form, plz: e.target.value.replace(/\D/g, "") })}
                    className="input"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Pflegegrad</label>
                  <select
                    value={form.pflegegrad}
                    onChange={(e) => setForm({ ...form, pflegegrad: e.target.value })}
                    className="input"
                  >
                    {PFLEGEGRADE.map((pg) => (
                      <option key={pg} value={pg}>{pg}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Interessen */}
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-2 block">
                  Interesse an weiteren Leistungen
                  <span className="font-normal text-gray-400 ml-1">(optional)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {WEITERE_LEISTUNGEN.filter((l) => l !== leistung).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleInteresse(item)}
                      className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
                        form.interessen.includes(item)
                          ? "bg-brand text-white border-brand"
                          : "bg-white text-gray-600 border-gray-200 hover:border-brand/40"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Einverständnis */}
              <label className="flex items-start gap-2.5 cursor-pointer group">
                <div
                  onClick={() => setForm({ ...form, einverstaendnis: !form.einverstaendnis })}
                  className={`w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center mt-0.5 transition-colors ${
                    form.einverstaendnis ? "bg-brand border-brand" : "border-gray-300"
                  }`}
                >
                  {form.einverstaendnis && <CheckCircle2 size={12} className="text-white" />}
                </div>
                <span className="text-xs text-gray-500 leading-relaxed">
                  Ich bin einverstanden, dass ein geprüfter Partner von liva mich zu den ausgewählten Leistungen kontaktiert. Keine Kosten, kein Spam. <span className="text-brand">Datenschutz</span>
                </span>
              </label>

              <button
                type="submit"
                disabled={submitting || !form.einverstaendnis}
                className="btn-primary w-full justify-center py-3.5 text-sm mt-1 disabled:opacity-50"
              >
                {submitting ? "Wird gesendet…" : <>Passenden Anbieter finden <ArrowRight size={16} /></>}
              </button>

              <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1.5">
                <Lock size={11} /> Kostenlos · Kein Spam · DSGVO-konform
              </p>
            </form>
          </>
        ) : (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-brand-light flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-brand" />
            </div>
            <h3 className="font-serif text-2xl text-gray-900 mb-2">Anfrage eingegangen!</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Wir vermitteln dir einen geprüften Partner für <strong>{leistung}</strong>. Du hörst von uns innerhalb von 24 Stunden.
            </p>
            <button onClick={onClose} className="btn-secondary text-sm px-6 py-2.5">
              Schließen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
