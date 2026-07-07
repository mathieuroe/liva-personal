"use client";

import { useEffect, useState } from "react";
import { X, Phone, Mail, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";

interface Props {
  pflegedienstName: string;
  pflegedienstOrt: string;
  plz: string;
  pflegegrad: string;
  onClose: () => void;
}

export default function AnfrageModal({ pflegedienstName, pflegedienstOrt, plz, pflegegrad, onClose }: Props) {
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [hasStoredData, setHasStoredData] = useState(false);

  useEffect(() => {
    const storedTel = sessionStorage.getItem("liva_tel") ?? "";
    const storedEmail = sessionStorage.getItem("liva_email") ?? "";
    if (storedTel && storedEmail) {
      setHasStoredData(true);
      autoSubmit(storedTel, storedEmail);
    }
  }, []);

  async function autoSubmit(storedTel: string, storedEmail: string) {
    setSubmitting(true);
    try {
      await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: storedEmail,
          phone: storedTel,
          plz,
          pflegegrad,
          path: "pflegedienst-anfrage",
          tags: pflegedienstName,
          timestamp: new Date().toISOString(),
        }),
      });
      setDone(true);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          phone: tel,
          plz,
          pflegegrad,
          path: "pflegedienst-anfrage",
          tags: pflegedienstName,
          timestamp: new Date().toISOString(),
        }),
      });
      sessionStorage.setItem("liva_tel", tel);
      sessionStorage.setItem("liva_email", email);
      setDone(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-sm shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-[#E0EDE7]">
          <div>
            <p className="font-semibold text-gray-900 text-sm">{pflegedienstName}</p>
            <p className="text-xs text-gray-400">{pflegedienstOrt}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <div className="p-5">
          {submitting && !done ? (
            <div className="text-center py-8">
              <Loader2 size={32} className="text-brand animate-spin mx-auto mb-3" />
              <p className="text-sm text-gray-500">Anfrage wird gesendet…</p>
            </div>
          ) : done ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-brand-light flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 size={28} className="text-brand" />
              </div>
              <h3 className="font-serif text-xl text-gray-900 mb-2">Anfrage gesendet!</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                Wir leiten deine Anfrage an <strong>{pflegedienstName}</strong> weiter und melden uns bei dir.
              </p>
              <button onClick={onClose} className="btn-primary w-full justify-center py-3 text-sm">
                Weitere Pflegedienste ansehen
              </button>
            </div>
          ) : (
            <>
              <h3 className="font-serif text-lg text-gray-900 mb-1">Kostenlos anfragen</h3>
              <p className="text-sm text-gray-500 mb-4">
                Wir leiten deine Anfrage direkt weiter. Kein Spam, kein Risiko.
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand" />
                  <input
                    type="tel"
                    required
                    placeholder="Deine Telefonnummer"
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                    className="input pl-9 text-sm"
                    autoFocus
                  />
                </div>
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand" />
                  <input
                    type="email"
                    required
                    placeholder="Deine E-Mail-Adresse"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input pl-9 text-sm"
                  />
                </div>
                <button type="submit" disabled={submitting} className="btn-primary w-full justify-center py-3 text-sm">
                  {submitting ? "Wird gesendet…" : <><span>Anfrage senden</span> <ArrowRight size={15} /></>}
                </button>
              </form>
              <p className="text-[11px] text-gray-400 text-center mt-3">Kostenlos · Unverbindlich · DSGVO-konform</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
