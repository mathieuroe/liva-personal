"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import PfadB from "@/components/funnel/PfadB";

export default function PflegegradVorhandenPage() {
  const [step, setStep] = useState(0);

  return (
    <main className="bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-6 pb-12">

        {step === 0 && (
          <div className="mb-5">
            <span className="inline-block bg-brand-light text-brand text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
              Pflegegrad vorhanden
            </span>
            <h1 className="font-serif text-4xl text-gray-900 mb-3 leading-tight">
              Welche Leistungen stehen dir mit Pflegegrad zu?
            </h1>
            <p className="text-gray-500 leading-relaxed mb-3">
              Beantworte 3 kurze Fragen. Wir zeigen dir passende Hilfen und Zuschüsse.
            </p>
            <p className="text-sm text-gray-400">Kostenlos · Unverbindlich · 2 Minuten</p>
          </div>
        )}

        {step === 1 && (
          <div className="mb-5">
            <span className="inline-flex items-center gap-1.5 bg-brand-light text-brand text-xs font-semibold px-4 py-1.5 rounded-full">
              <Check size={11} strokeWidth={3} /> Pflegegrad vorhanden
            </span>
          </div>
        )}

        <PfadB onStepChange={setStep} />
      </div>
    </main>
  );
}
