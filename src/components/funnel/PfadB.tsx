"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X as XIcon, Check } from "lucide-react";
import LeadForm from "./LeadForm";

type PGLeistung = { name: string; betrag: string };
const PG_LEISTUNGEN: Record<number, PGLeistung[]> = {
  1: [
    { name: "Pflegebox", betrag: "42 € / Monat" },
    { name: "Hausnotruf", betrag: "ab 0 € / Monat" },
    { name: "Entlastungsbetrag", betrag: "131 € / Monat" },
  ],
  2: [
    { name: "Pflegegeld", betrag: "332 € / Monat" },
    { name: "Pflegesachleistungen", betrag: "724 € / Monat" },
    { name: "Pflegebox", betrag: "42 € / Monat" },
    { name: "Hausnotruf", betrag: "ab 0 € / Monat" },
    { name: "Entlastungsbetrag", betrag: "131 € / Monat" },
  ],
  3: [
    { name: "Pflegegeld", betrag: "572 € / Monat" },
    { name: "Kurzzeitpflege", betrag: "1.774 € / Jahr" },
    { name: "Tagespflege", betrag: "1.612 € / Monat" },
    { name: "Pflegebox", betrag: "42 € / Monat" },
    { name: "Entlastungsbetrag", betrag: "131 € / Monat" },
  ],
  4: [
    { name: "Pflegegeld", betrag: "764 € / Monat" },
    { name: "Sachleistungen erhöht", betrag: "1.693 € / Monat" },
    { name: "Verhinderungspflege", betrag: "1.612 € / Jahr" },
    { name: "Pflegebox + Hausnotruf", betrag: "ab 0 € / Monat" },
  ],
  5: [
    { name: "Pflegegeld", betrag: "946 € / Monat" },
    { name: "Sachleistungen", betrag: "2.095 € / Monat" },
    { name: "Maximale Förderung", betrag: "aller Leistungen" },
  ],
};

const fade = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } };
const PG_LABELS = ["Weiß ich nicht", "PG 1", "PG 2", "PG 3", "PG 4", "PG 5"];

const MYTHEN = [
  { falsch: "Pflege bedeutet immer intensive Körperpflege", richtig: "Bei PG 1 bedeutet Pflege meist: Einkaufen, Begleiten, Kochen, Gesellschaft leisten" },
  { falsch: "Man muss alles alleine stemmen", richtig: "Es gibt Haushaltshilfen, Nachbarschaftsdienste, Betreuungsgruppen – vieles kostenlos" },
  { falsch: "Pflege = Verlust von Selbstständigkeit", richtig: "Die richtigen Hilfsmittel helfen Menschen länger selbstständig zuhause zu leben" },
];

export default function PfadB() {
  const [step, setStep] = useState(0);
  const [pflegegrad, setPflegegrad] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      <AnimatePresence mode="wait">

        {/* SCHRITT 1 – Pflegegrad */}
        {step === 0 && (
          <motion.div key="step0" {...fade} transition={{ duration: 0.3 }}>
            <p className="section-label">Schritt 1 von 2</p>
            <h2 className="font-serif text-3xl text-gray-900 mb-2">Welchen Pflegegrad habt ihr erhalten?</h2>
            <p className="text-gray-500 mb-8">Wählt euren Pflegegrad – wir zeigen euch sofort was euch zusteht.</p>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6">
              {PG_LABELS.map((label, i) => (
                <button key={i} onClick={() => setPflegegrad(i === 0 ? 1 : i)}
                  className={`rounded-full py-2.5 text-sm font-semibold border transition-all ${
                    pflegegrad === (i === 0 ? 1 : i) ? "bg-brand text-white border-brand" : "bg-white text-gray-700 border-[#E0EDE7] hover:border-brand hover:text-brand"
                  }`}>
                  {label}
                </button>
              ))}
            </div>

            <AnimatePresence>
              {pflegegrad !== null && pflegegrad > 0 && PG_LEISTUNGEN[pflegegrad] && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                  className="bg-brand-light rounded-xl p-5 mb-6">
                  <p className="text-brand font-semibold mb-3">Mit PG {pflegegrad} stehen euch zu:</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {PG_LEISTUNGEN[pflegegrad].map((l) => (
                      <div key={l.name} className="bg-white rounded-lg px-3 py-2 flex items-center justify-between">
                        <span className="text-sm text-gray-900 font-medium">{l.name}</span>
                        <span className="text-xs text-brand font-semibold">{l.betrag}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {pflegegrad !== null && (
              <button onClick={() => setStep(1)} className="btn-primary">
                Was ich jetzt tun sollte <ArrowRight size={16} />
              </button>
            )}
          </motion.div>
        )}

        {/* SCHRITT 2 – Pflegebox + Hausnotruf + Mythen */}
        {step === 1 && (
          <motion.div key="step1" {...fade} transition={{ duration: 0.3 }}>
            <p className="section-label">Schritt 2 von 2</p>
            <h2 className="font-serif text-3xl text-gray-900 mb-8">Die zwei wichtigsten ersten Schritte</h2>

            {/* PFLEGEBOX */}
            <div className="card p-6 mb-4">
              <div className="flex items-start gap-4">
                <div className="text-4xl">📦</div>
                <div>
                  <h3 className="font-serif text-xl text-gray-900 mb-2">Die Pflegebox – 42 € pro Monat, komplett kostenlos</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    Jeden Monat kommt eine Kiste mit Pflegehilfsmitteln direkt nach Hause – Einmalhandschuhe, Desinfektionsmittel, Bettschutz. Alles was ihr sowieso braucht. Die Pflegekasse zahlt das vollständig. <strong className="text-gray-700">Kein Trick, keine Falle.</strong>
                  </p>
                  <div className="space-y-2">
                    {[
                      "Pflegekasse anrufen und §40 SGB XI Pflegehilfsmittel beantragen",
                      "Anbieter wählen – wir helfen euch dabei",
                      "Box kommt automatisch jeden Monat",
                    ].map((s, i) => (
                      <div key={i} className="flex gap-3 text-sm text-gray-600">
                        <span className="w-5 h-5 rounded-full bg-brand-light text-brand text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* HAUSNOTRUF */}
            <div className="card p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🔔</div>
                <div>
                  <h3 className="font-serif text-xl text-gray-900 mb-2">Hausnotruf – damit ihr auch mal kurz weg könnt</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    Ein kleines Gerät am Handgelenk oder um den Hals. Ein Druck – und sofort antwortet jemand. Das Wichtigste daran: <strong className="text-gray-700">Ihr könnt mal kurz weg.</strong> Einkaufen, Arzt, einfach Luft holen – ohne schlechtes Gewissen. Die Pflegekasse übernimmt bei PG 1 meist den kompletten Grundbetrag.
                  </p>
                  <div className="space-y-2">
                    {[
                      "Anbieter in eurer Nähe finden – wir machen das",
                      "Pflegekasse genehmigt direkt",
                      "Gerät kommt nach Hause, Einrichtung dauert 10 Minuten",
                    ].map((s, i) => (
                      <div key={i} className="flex gap-3 text-sm text-gray-600">
                        <span className="w-5 h-5 rounded-full bg-brand-light text-brand text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* MYTHEN */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">Was Pflege wirklich bedeutet</h3>
              <div className="space-y-4">
                {MYTHEN.map((m, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex items-start gap-2 text-sm text-gray-400">
                      <XIcon size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                      <span className="line-through">{m.falsch}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-700">
                      <Check size={16} className="text-brand flex-shrink-0 mt-0.5" />
                      <span className="font-medium">{m.richtig}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mb-10">
              <button onClick={() => setStep(0)} className="btn-ghost">← Zurück</button>
              <button onClick={() => setStep(2)} className="btn-primary">Jetzt beantragen lassen <ArrowRight size={16} /></button>
            </div>
          </motion.div>
        )}

        {/* LEAD FORM */}
        {step === 2 && (
          <motion.div key="step2" {...fade} transition={{ duration: 0.3 }}>
            <button onClick={() => setStep(1)} className="btn-ghost mb-6">← Zurück</button>
            <LeadForm
              title="Wir beantragen Pflegebox und Hausnotruf für euch"
              subtitle="Kostenlos, in 5 Minuten erledigt."
              cta="Jetzt kostenlos beantragen"
              path="pfad-b"
              pflegegrad={pflegegrad !== null ? `PG ${pflegegrad}` : undefined}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
