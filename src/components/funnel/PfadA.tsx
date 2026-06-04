"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Copy, Check, ClipboardList, HeartHandshake } from "lucide-react";
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

// Einfache Fragen für den Pflegegrad-Rechner
const FRAGEN = [
  {
    id: "bewegung",
    frage: "Wie selbstständig ist die Person bei der Fortbewegung?",
    optionen: [
      { label: "Vollständig selbstständig", punkte: 0 },
      { label: "Braucht manchmal Hilfe", punkte: 1 },
      { label: "Braucht regelmäßig Hilfe", punkte: 2 },
      { label: "Kann sich kaum alleine bewegen", punkte: 3 },
    ],
  },
  {
    id: "koerperpflege",
    frage: "Wie viel Hilfe wird bei der Körperpflege benötigt?",
    optionen: [
      { label: "Keine Hilfe nötig", punkte: 0 },
      { label: "Gelegentlich Hilfe", punkte: 1 },
      { label: "Täglich Hilfe", punkte: 2 },
      { label: "Vollständige Übernahme nötig", punkte: 3 },
    ],
  },
  {
    id: "orientierung",
    frage: "Wie ist die Orientierung und das Gedächtnis?",
    optionen: [
      { label: "Keine Einschränkungen", punkte: 0 },
      { label: "Leichte Vergesslichkeit", punkte: 1 },
      { label: "Häufige Verwirrtheit", punkte: 2 },
      { label: "Starke Einschränkungen / Demenz", punkte: 3 },
    ],
  },
  {
    id: "alltag",
    frage: "Kann die Person den Alltag selbst organisieren?",
    optionen: [
      { label: "Ja, vollständig", punkte: 0 },
      { label: "Mit kleiner Unterstützung", punkte: 1 },
      { label: "Braucht viel Hilfe", punkte: 2 },
      { label: "Vollständig auf Hilfe angewiesen", punkte: 3 },
    ],
  },
];

function berechnePflegegrad(punkte: number): { pg: string; beschreibung: string } {
  if (punkte <= 2) return { pg: "PG 1", beschreibung: "Geringe Beeinträchtigung der Selbstständigkeit" };
  if (punkte <= 5) return { pg: "PG 2", beschreibung: "Erhebliche Beeinträchtigung der Selbstständigkeit" };
  if (punkte <= 8) return { pg: "PG 3", beschreibung: "Schwere Beeinträchtigung der Selbstständigkeit" };
  if (punkte <= 10) return { pg: "PG 4", beschreibung: "Schwerste Beeinträchtigung der Selbstständigkeit" };
  return { pg: "PG 5", beschreibung: "Schwerste Beeinträchtigung mit besonderen Anforderungen" };
}

const fade = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } };

export default function PfadA() {
  const [step, setStep] = useState(0);
  const [antworten, setAntworten] = useState<Record<string, number>>({});
  const [weg, setWeg] = useState<"selbst" | "unterstuetzung" | null>(null);
  const [kasse, setKasse] = useState<typeof PFLEGEKASSEN[0] | null>(null);
  const [copied, setCopied] = useState(false);

  const scriptText = "Ich moechte einen Pflegegrad beantragen. Koennen Sie mir bitte einen Antrag zusenden oder mir erklaeren wie ich das online beantragen kann?";

  const gesamtPunkte = Object.values(antworten).reduce((a, b) => a + b, 0);
  const ergebnis = berechnePflegegrad(gesamtPunkte);
  const alleBeantwortet = FRAGEN.every((f) => antworten[f.id] !== undefined);

  function copyScript() {
    navigator.clipboard.writeText(scriptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-8">
      <AnimatePresence mode="wait">

        {/* SCHRITT 1 – Pflegegrad-Rechner */}
        {step === 0 && (
          <motion.div key="step0" {...fade} transition={{ duration: 0.3 }}>
            <p className="section-label">Schritt 1 von 2</p>
            <h2 className="font-serif text-3xl text-gray-900 mb-2">Welcher Pflegegrad könnte in Frage kommen?</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Beantworte 4 kurze Fragen – wir geben dir eine erste Einschätzung. Das ersetzt keine offizielle Begutachtung, hilft dir aber bei der Orientierung.
            </p>

            <div className="space-y-6">
              {FRAGEN.map((f) => (
                <div key={f.id} className="card p-5">
                  <p className="font-semibold text-gray-900 text-sm mb-3">{f.frage}</p>
                  <div className="space-y-2">
                    {f.optionen.map((o) => (
                      <button
                        key={o.label}
                        onClick={() => setAntworten((prev) => ({ ...prev, [f.id]: o.punkte }))}
                        className={`w-full text-left text-sm px-4 py-2.5 rounded-xl border transition-all ${
                          antworten[f.id] === o.punkte
                            ? "bg-brand text-white border-brand"
                            : "bg-white text-gray-700 border-[#E0EDE7] hover:border-brand/40"
                        }`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <AnimatePresence>
              {alleBeantwortet && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 bg-brand-light rounded-xl p-5"
                >
                  <p className="text-xs font-semibold text-brand uppercase tracking-wider mb-1">Erste Einschätzung</p>
                  <p className="font-serif text-2xl text-brand mb-1">{ergebnis.pg} könnte passen</p>
                  <p className="text-sm text-brand/70">{ergebnis.beschreibung}</p>
                  <p className="text-xs text-gray-500 mt-3">
                    Dies ist nur eine grobe Einschätzung. Der offizielle Pflegegrad wird vom MDK festgestellt.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {alleBeantwortet && (
              <button onClick={() => setStep(1)} className="btn-primary mt-6">
                Weiter – wie beantrage ich das? <ArrowRight size={16} />
              </button>
            )}
          </motion.div>
        )}

        {/* SCHRITT 2 – Wie möchtest du vorgehen? */}
        {step === 1 && (
          <motion.div key="step1" {...fade} transition={{ duration: 0.3 }}>
            <p className="section-label">Schritt 2 von 2</p>
            <h2 className="font-serif text-3xl text-gray-900 mb-2">Wie möchtest du vorgehen?</h2>
            <p className="text-gray-500 mb-8">Wähle was besser zu dir passt.</p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => setWeg("selbst")}
                className={`flex flex-col text-left p-5 rounded-[12px] border-2 transition-all ${
                  weg === "selbst" ? "border-brand bg-brand-light" : "border-[#E0EDE7] bg-white hover:border-brand/40"
                }`}
              >
                <ClipboardList size={24} className="text-brand mb-3" />
                <p className="font-semibold text-gray-900 mb-1">Ich beantrage es selbst</p>
                <p className="text-xs text-gray-500 leading-relaxed">Schritt-für-Schritt Anleitung – wir zeigen dir genau wie es geht.</p>
              </button>

              <button
                onClick={() => setWeg("unterstuetzung")}
                className={`flex flex-col text-left p-5 rounded-[12px] border-2 transition-all ${
                  weg === "unterstuetzung" ? "border-brand bg-brand-light" : "border-[#E0EDE7] bg-white hover:border-brand/40"
                }`}
              >
                <HeartHandshake size={24} className="text-brand mb-3" />
                <p className="font-semibold text-gray-900 mb-1">Ich möchte Unterstützung dabei</p>
                <p className="text-xs text-gray-500 leading-relaxed">Wir begleiten dich persönlich durch den Prozess – kostenlos.</p>
              </button>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="btn-ghost">← Zurück</button>
              {weg && (
                <button onClick={() => setStep(weg === "selbst" ? 2 : 4)} className="btn-primary">
                  Weiter <ArrowRight size={16} />
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* SELBST BEANTRAGEN – Pflegekasse */}
        {step === 2 && (
          <motion.div key="step2" {...fade} transition={{ duration: 0.3 }}>
            <p className="section-label">Selbst beantragen – Schritt 1</p>
            <h2 className="font-serif text-3xl text-gray-900 mb-2">Welche Pflegekasse ist zuständig?</h2>

            <div className="bg-brand-light border border-brand/20 rounded-xl p-4 mb-6 text-sm text-brand-darker leading-relaxed">
              <strong className="block mb-1">Kurzer Hinweis:</strong>
              Die Pflegekasse ist automatisch dieselbe wie die Krankenkasse. Du musst nichts extra beantragen.
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
                    <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Was du am Telefon sagen kannst:</p>
                    <p className="text-sm text-gray-700 leading-relaxed italic mb-3">&bdquo;{scriptText}&ldquo;</p>
                    <button onClick={copyScript} className="flex items-center gap-2 text-xs font-semibold text-brand hover:text-brand-dark transition-colors">
                      {copied ? <><Check size={14} /> Kopiert!</> : <><Copy size={14} /> Text kopieren</>}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="btn-ghost">← Zurück</button>
              {kasse && <button onClick={() => setStep(3)} className="btn-primary">Weiter <ArrowRight size={16} /></button>}
            </div>
          </motion.div>
        )}

        {/* SELBST BEANTRAGEN – MDK Tipps */}
        {step === 3 && (
          <motion.div key="step3" {...fade} transition={{ duration: 0.3 }}>
            <p className="section-label">Selbst beantragen – Schritt 2</p>
            <h2 className="font-serif text-3xl text-gray-900 mb-3">Der MDK-Besuch – keine Angst davor</h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              Nach dem Antrag kommt jemand vom Medizinischen Dienst vorbei. Mit der richtigen Vorbereitung bekommt ihr den Pflegegrad der wirklich zutrifft.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                { nr: "1", title: "Alles dokumentieren", text: "Schreibe auf was die Person NICHT mehr alleine kann. Je konkreter desto besser." },
                { nr: "2", title: "Schlechten Tag zeigen", text: "Zeig wie es wirklich ist – nicht den guten Tag. Der MDK bewertet was er sieht." },
                { nr: "3", title: "Jemanden dabeihaben", text: "Nimm eine Vertrauensperson mit. Vier Augen sehen mehr." },
                { nr: "4", title: "Widerspruch kennen", text: "Pflegegrad zu niedrig? Du hast 1 Monat Zeit Widerspruch einzulegen – lohnt sich fast immer." },
              ].map((tip) => (
                <div key={tip.nr} className="card p-5">
                  <div className="w-7 h-7 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center mb-3">{tip.nr}</div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{tip.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{tip.text}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="btn-ghost">← Zurück</button>
              <button onClick={() => setStep(4)} className="btn-primary">Zum Abschluss <ArrowRight size={16} /></button>
            </div>
          </motion.div>
        )}

        {/* LEAD FORM */}
        {step === 4 && (
          <motion.div key="step4" {...fade} transition={{ duration: 0.3 }}>
            <button onClick={() => setStep(weg === "selbst" ? 3 : 1)} className="btn-ghost mb-6">← Zurück</button>
            <LeadForm
              title={weg === "unterstuetzung" ? "Wir begleiten euch durch den Antrag" : "Noch Fragen? Wir sind da."}
              subtitle={weg === "unterstuetzung" ? "Kostenlos, persönlich, ohne Druck." : "Meld dich wenn du Unterstützung brauchst."}
              cta="Jetzt kostenlos melden"
              path="pfad-a"
              pflegegrad={ergebnis.pg}
            />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
