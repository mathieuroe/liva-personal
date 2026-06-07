"use client";

import { useState } from "react";
import { Clock, Shield, Users, Euro } from "lucide-react";
import PfadB from "@/components/funnel/PfadB";

const TRUST = [
  { icon: <Euro size={13} className="text-brand" />, text: "100% kostenlos" },
  { icon: <Shield size={13} className="text-brand" />, text: "Unverbindlich" },
  { icon: <Clock size={13} className="text-brand" />, text: "In unter 2 Minuten" },
  { icon: <Users size={13} className="text-brand" />, text: "Persönliche Begleitung" },
];

export default function PflegegradVorhandenPage() {
  const [step, setStep] = useState(0);

  return (
    <main className="bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">

        {/* Intro – nur auf Schritt 0 sichtbar */}
        {step === 0 && (
          <div className="mb-10">
            <span className="inline-block bg-brand-light text-brand text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
              Pflegegrad bereits vorhanden
            </span>
            <h1 className="font-serif text-4xl text-gray-900 mb-3 leading-tight">
              Der Bescheid ist da – jetzt das Beste rausholen.
            </h1>
            <p className="text-gray-500 leading-relaxed mb-6">
              Viele Ansprüche werden nie beantragt. Wir helfen dir dabei, nichts zu vergessen.
            </p>
            <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2">
              {TRUST.map((t) => (
                <div key={t.text} className="flex items-center gap-1.5 bg-brand-light rounded-full px-3 py-1.5 sm:flex-1 justify-center">
                  {t.icon}
                  <span className="text-[11px] font-semibold text-brand">{t.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <PfadB onStepChange={setStep} />
      </div>
    </main>
  );
}
