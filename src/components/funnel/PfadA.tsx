"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Copy, Check } from "lucide-react";
import LeadForm from "./LeadForm";

const PFLEGEKASSEN = [
  { name: "TK – Techniker Krankenkasse", tel: "0800 285 8585", email: "pflege@tk.de" },
  { name: "AOK (je nach Region)", tel: "0800 0 326 326", email: "service@aok.de" },
  { name: "Barmer", tel: "0800 333 1010", email: "pflege@barmer.de" },
  { name: "DAK-Gesundheit", tel: "040 325 325 325", email: "service@dak.de" },
  { name: "KKH", tel: "0800 111 3300", email: "service@kkh.de" },
  { name: "hkk", tel: "0421 3655 0", email: "service@hkk.de" },
  { name: "IKK classic", tel: "01802 455 5444", email: "info@ikk-classic.de" },
  { name: "Sonstige / Weiß ich nicht", tel: "—", email: "—" },
];

const PG_LEISTUNGEN: Record<number, string[]> = {
  0: [],
  1: ["Pflegebox: 42 € / Monat", "Hausnotruf ab 0 € / Monat", "Entlastungsbetrag: 131 € / Monat", "Wohnraumanpassung: bis 4.180 €"],
  2: ["Pflegegeld: 332 € / Monat", "Pflegesachleistungen: 724 € / Monat", "Entlastungsbetrag: 131 € / Monat", "Pflegebox: 42 € / Monat", "Hausnotruf ab 0 € / Monat"],
  3: ["Pflegegeld: 572 € / Monat", "Sachleistungen: 1.363 € / Monat", "Kurzzeitpflege: 1.774 € / Jahr", "Tagespflege: 1.612 € / Monat"],
  4: ["Pflegegeld: 764 € / Monat", "Sachleistungen: 1.693 € / Monat", "Kurzzeitpflege: 1.774 € / Jahr", "Verhinderungspflege: 1.612 € / Jahr"],
  5: ["Pflegegeld: 946 € / Monat", "Sachleistungen: 2.095 € / Monat", "Maximale Förderung aller Leistungen"],
};

const fade = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } };
const PG_LABELS = ["Kein PG", "PG 1", "PG 2", "PG 3", "PG 4", "PG 5"];

export default function PfadA() {
  const [step, setStep] = useState(0);
  const [pflegegrad, setPflegegrad] = useState<number | null>(null);
  const [kasse, setKasse] = useState<typeof PFLEGEKASSEN[0] | null>(null);
  const [copied, setCopied] = useState(false);

  const scriptText = "Ich möchte einen Pflegegrad für [Name des Angehörigen] beantragen. Können Sie mir bitte einen Antrag zusenden oder mir erklären wie ich das online beantragen kann?";

  function copyScript() {
    navigator.clipboard.writeText(scriptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-8">
      <AnimatePresence mode="wait">
        {/* SCHRITT 1 – Pflegegrad */}
        {step === 0 && (
          <motion.div key="step0" {...fade} transition={{ duration: 0.3 }}>
            <p className="section-label">Schritt 1 von 3</p>
            <h2 className="font-serif text-3xl text-gray-900 mb-2">Habt ihr schon einen Pflegegrad?</h2>
            <p className="text-gray-500 mb-8">Falls noch nicht – das ist der erste Schritt. Wir erklären wie das funktioniert.</p>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6">
              {PG_LABELS.map((label, i) => (
                <button key={i} onClick={() => setPflegegrad(i)}
                  className={`rounded-full py-2.5 text-sm font-semibold border transition-all ${
                    pflegegrad === i ? "bg-brand text-white border-brand shadow-card-active" : "bg-white text-gray-700 border-[#E0EDE7] hover:border-brand hover:text-brand"
                  }`}>
                  {label}
                </button>
              ))}
            </div>

            <AnimatePresence>
              {pflegegrad === 0 && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                  className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6 text-sm text-amber-900 leading-relaxed">
                  <strong className="block mb-1">Du hast noch keinen Pflegegrad?</strong>
                  Das ist der erste Schritt – und du kannst ihn jetzt beantragen. Der Antrag läuft über die Pflegekasse, ein kurzer Anruf reicht. Wir erklären dir genau wie das geht.
                </motion.div>
              )}
              {pflegegrad !== null && pflegegrad > 0 && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                  className="bg-brand-light rounded-xl p-5 mb-6">
                  <p className="text-brand font-semibold text-sm mb-2">Mit {PG_LABELS[pflegegrad]} stehen euch zu:</p>
                  <ul className="space-y-1">
                    {PG_LEISTUNGEN[pflegegrad].map((l) => (
                      <li key={l} className="text-sm text-brand/80 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" /> {l}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            {pflegegrad !== null && (
              <button onClick={() => setStep(1)} className="btn-primary">
                Weiter <ArrowRight size={16} />
              </button>
            )}
          </motion.div>
        )}

        {/* SCHRITT 2 – Pflegekasse */}
        {step === 1 && (
          <motion.div key="step1" {...fade} transition={{ duration: 0.3 }}>
            <p className="section-label">Schritt 2 von 3</p>
            <h2 className="font-serif text-3xl text-gray-900 mb-2">Welche Pflegekasse ist zuständig?</h2>

            <div className="bg-brand-light border border-brand/20 rounded-xl p-4 mb-6 text-sm text-brand-darker leading-relaxed">
              <strong className="block mb-1">Das Wichtigste vorab:</strong>
              Deine Pflegekasse ist automatisch dieselbe wie deine Krankenkasse. Du musst nichts extra beantragen oder wechseln.
            </div>

            <label className="text-sm font-medium text-gray-700 block mb-2">Krankenkasse wählen</label>
            <select
              className="input mb-6"
              value={kasse?.name || ""}
              onChange={(e) => setKasse(PFLEGEKASSEN.find((k) => k.name === e.target.value) || null)}
            >
              <option value="">— Bitte wählen —</option>
              {PFLEGEKASSEN.map((k) => <option key={k.name} value={k.name}>{k.name}</option>)}
            </select>

            <AnimatePresence>
              {kasse && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  <div className="card p-4 mb-4">
                    <p className="font-semibold text-gray-900 mb-2">{kasse.name}</p>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>📞 {kasse.tel}</p>
                      {kasse.email !== "—" && <p>✉ {kasse.email}</p>}
                    </div>
                  </div>

                  <div className="bg-brand-light rounded-xl p-4 mb-6">
                    <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Was du am Telefon sagen solltest:</p>
                    <p className="text-sm text-gray-700 leading-relaxed italic mb-3">&bdquo;{scriptText}&ldquo;</p>
                    <button onClick={copyScript} className="flex items-center gap-2 text-xs font-semibold text-brand hover:text-brand-dark transition-colors">
                      {copied ? <><Check size={14} /> Kopiert!</> : <><Copy size={14} /> Text kopieren</>}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="btn-ghost">← Zurück</button>
              {kasse && (
                <button onClick={() => setStep(2)} className="btn-primary">
                  Weiter <ArrowRight size={16} />
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* SCHRITT 3 – MDK */}
        {step === 2 && (
          <motion.div key="step2" {...fade} transition={{ duration: 0.3 }}>
            <p className="section-label">Schritt 3 von 3</p>
            <h2 className="font-serif text-3xl text-gray-900 mb-3">Der MDK-Besuch – keine Angst davor</h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              Nach dem Antrag kommt jemand vom Medizinischen Dienst vorbei um den Pflegebedarf einzuschätzen. Das klingt einschüchternder als es ist. Mit der richtigen Vorbereitung bekommt ihr den Pflegegrad der wirklich zutrifft.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                { nr: "1", title: "Alles dokumentieren", text: "Schreibe vorher auf was die Person NICHT mehr alleine kann. Je konkreter desto besser." },
                { nr: "2", title: "Schlechten Tag zeigen", text: "Zeig wie es wirklich ist – nicht den guten Tag. Der MDK bewertet was er sieht." },
                { nr: "3", title: "Jemanden dabeihaben", text: "Nimm am besten eine Vertrauensperson mit. Vier Augen sehen mehr." },
                { nr: "4", title: "Widerspruch kennen", text: "Wenn der Pflegegrad zu niedrig ist: Du hast 1 Monat Zeit Widerspruch einzulegen. Das lohnt sich fast immer." },
              ].map((tip) => (
                <div key={tip.nr} className="card p-5">
                  <div className="w-7 h-7 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center mb-3">{tip.nr}</div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{tip.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{tip.text}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mb-10">
              <button onClick={() => setStep(1)} className="btn-ghost">← Zurück</button>
              <button onClick={() => setStep(3)} className="btn-primary">Zum Abschluss <ArrowRight size={16} /></button>
            </div>
          </motion.div>
        )}

        {/* LEAD FORM */}
        {step === 3 && (
          <motion.div key="step3" {...fade} transition={{ duration: 0.3 }}>
            <button onClick={() => setStep(2)} className="btn-ghost mb-6">← Zurück</button>
            <LeadForm
              title="Wir begleiten euch durch die ersten Schritte"
              subtitle="Kostenlos, persönlich, ohne Druck."
              cta="Jetzt kostenlos starten"
              path="pfad-a"
              pflegegrad={pflegegrad !== null ? `PG ${pflegegrad}` : "Kein PG"}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
