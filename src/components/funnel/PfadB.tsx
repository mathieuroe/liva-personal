"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// lucide-react imports kept minimal
import LeadForm from "./LeadForm";

const fade = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } };

type PGLeistung = { name: string; betrag: string };
const PG_LEISTUNGEN: Record<number, PGLeistung[]> = {
  1: [
    { name: "Entlastungsbetrag", betrag: "131 € / Monat" },
    { name: "Wohnraumanpassung", betrag: "bis 4.180 €" },
  ],
  2: [
    { name: "Pflegegeld", betrag: "332 € / Monat" },
    { name: "Pflegesachleistungen", betrag: "724 € / Monat" },
    { name: "Entlastungsbetrag", betrag: "131 € / Monat" },
    { name: "Verhinderungspflege", betrag: "bis 1.612 € / Jahr" },
  ],
  3: [
    { name: "Pflegegeld", betrag: "572 € / Monat" },
    { name: "Pflegesachleistungen", betrag: "1.363 € / Monat" },
    { name: "Entlastungsbetrag", betrag: "131 € / Monat" },
    { name: "Kurzzeitpflege", betrag: "1.774 € / Jahr" },
    { name: "Verhinderungspflege", betrag: "bis 1.612 € / Jahr" },
  ],
  4: [
    { name: "Pflegegeld", betrag: "764 € / Monat" },
    { name: "Pflegesachleistungen", betrag: "1.693 € / Monat" },
    { name: "Entlastungsbetrag", betrag: "131 € / Monat" },
    { name: "Verhinderungspflege", betrag: "bis 1.612 € / Jahr" },
    { name: "Kurzzeitpflege", betrag: "1.774 € / Jahr" },
  ],
  5: [
    { name: "Pflegegeld", betrag: "946 € / Monat" },
    { name: "Pflegesachleistungen", betrag: "2.095 € / Monat" },
    { name: "Entlastungsbetrag", betrag: "131 € / Monat" },
    { name: "Verhinderungspflege", betrag: "bis 1.612 € / Jahr" },
    { name: "Kurzzeitpflege", betrag: "1.774 € / Jahr" },
  ],
};

const WOHNSITUATIONEN = [
  { id: "selbst", label: "Zuhause – ich pflege selbst", icon: "🏠" },
  { id: "dienst", label: "Zuhause – ein Pflegedienst kommt", icon: "🤝" },
  { id: "beides", label: "Zuhause – ich pflege und ein Dienst kommt", icon: "👐" },
  { id: "heim", label: "Im Pflegeheim", icon: "🏥" },
];

const HERAUSFORDERUNGEN = [
  {
    id: "erschoepft",
    label: "Ich bin oft erschöpft und komme kaum zur Ruhe",
    icon: "😔",
  },
  {
    id: "unsicher",
    label: "Ich weiß nicht ob wir alles richtig machen",
    icon: "🤔",
  },
  {
    id: "familie",
    label: "Die Familie ist sich nicht immer einig",
    icon: "👨‍👩‍👧",
  },
  {
    id: "sicherheit",
    label: "Ich mache mir Sorgen ob zuhause alles sicher ist",
    icon: "🔒",
  },
  {
    id: "unterstuetzung",
    label: "Ich bräuchte einfach mehr Unterstützung im Alltag",
    icon: "🙋",
  },
];

const ERGEBNIS_INHALT: Record<string, { titel: string; text: string; leistungen: { name: string; betrag: string; beschreibung: string }[] }> = {
  erschoepft: {
    titel: "Du trägst gerade sehr viel.",
    text: "Pflegende Angehörige sind oft die unsichtbaren Helden – und die, die am seltensten gefragt werden wie es ihnen geht. Das ist keine Schwäche, das ist Realität. Es gibt Möglichkeiten die genau dafür gemacht sind: nicht für die pflegebedürftige Person, sondern für dich.",
    leistungen: [
      { name: "Verhinderungspflege", betrag: "bis 1.612 € / Jahr", beschreibung: "Jemand übernimmt die Pflege damit du Urlaub machen kannst – oder einfach mal durchatmest." },
      { name: "Kurzzeitpflege", betrag: "bis 1.774 € / Jahr", beschreibung: "Vorübergehende stationäre Pflege – z.B. wenn du krank bist oder eine Auszeit brauchst." },
      { name: "Pflegeberatung §7a", betrag: "kostenlos", beschreibung: "Jede Pflegekasse muss dir kostenlose, neutrale Beratung anbieten. Nicht nur über Geld – auch über die Situation insgesamt." },
    ],
  },
  unsicher: {
    titel: "Du machst das besser als du denkst.",
    text: "Niemand wird als Pflegeexperte geboren. Das Pflegesystem ist komplex, die Formulare sind verwirrend und niemand erklärt dir was wirklich wichtig ist. Das Gefühl 'mache ich das richtig?' kennen fast alle pflegenden Angehörigen. Wir helfen dir Klarheit zu bekommen – Schritt für Schritt.",
    leistungen: [
      { name: "Pflegeberatung §7a", betrag: "kostenlos", beschreibung: "Kostenlose, persönliche Beratung durch die Pflegekasse – auch zuhause. Dein Recht." },
      { name: "Entlastungsbetrag", betrag: "131 € / Monat", beschreibung: "Für Alltagsbegleitung und Unterstützung – viele wissen nicht dass dieses Geld oft ungenutzt verfällt." },
    ],
  },
  familie: {
    titel: "Pflege bringt Familien an ihre Grenzen – das ist normal.",
    text: "Wer entscheidet was das Beste ist? Wer übernimmt wie viel? Diese Fragen führen zu echten Konflikten. Es hilft manchmal eine neutrale Person einzubeziehen – nicht um Schuldige zu finden, sondern um gemeinsam eine Lösung zu finden die alle tragen können.",
    leistungen: [
      { name: "Pflegeberatung §7a", betrag: "kostenlos", beschreibung: "Ein Pflegeberater kann auch als neutrale Instanz in Familiengesprächen helfen." },
      { name: "Verhinderungspflege", betrag: "bis 1.612 € / Jahr", beschreibung: "Wenn die Last ungleich verteilt ist: diese Leistung kann helfen die Hauptpflegeperson zu entlasten." },
      { name: "Entlastungsbetrag", betrag: "131 € / Monat", beschreibung: "Für professionelle Alltagsbegleitung – damit nicht alles an der Familie hängt." },
    ],
  },
  sicherheit: {
    titel: "Sicherheit zuhause ist kein Luxus.",
    text: "Sturzgefahr, Orientierungsprobleme, alleine sein – das sind reale Risiken. Die gute Nachricht: es gibt konkrete Hilfsmittel und Umbauten die die Situation deutlich verbessern. Vieles davon zahlt die Pflegekasse.",
    leistungen: [
      { name: "Wohnraumanpassung", betrag: "bis 4.180 € / Maßnahme", beschreibung: "Haltegriffe, Duschumbau, Türverbreiterung – Zuschuss für jeden barrierefreien Umbau. Antrag VOR Durchführung stellen." },
      { name: "Technische Hilfsmittel", betrag: "vollständig", beschreibung: "Pflegebett, Rollstuhl, Badewannenlifter – leihweise oder dauerhaft von der Pflegekasse." },
    ],
  },
  unterstuetzung: {
    titel: "Mehr Unterstützung ist möglich – und oft einfacher als gedacht.",
    text: "Viele Familien organisieren die Pflege komplett alleine, weil sie nicht wissen dass es professionelle Unterstützung gibt – oder weil sie Hemmungen haben sie anzunehmen. Beides ist verständlich. Aber: Unterstützung anzunehmen ist kein Versagen. Es ist klug.",
    leistungen: [
      { name: "Entlastungsbetrag", betrag: "131 € / Monat", beschreibung: "Für Haushaltshilfe, Alltagsbegleitung, Einkaufen, Kochen – Geld das viele nie abrufen." },
      { name: "Pflegesachleistungen", betrag: "bis 2.095 € / Monat", beschreibung: "Professionelle Pflege durch einen ambulanten Pflegedienst – die Pflegekasse zahlt direkt." },
      { name: "Tagespflege", betrag: "zusätzlich nutzbar", beschreibung: "Betreuung tagsüber in einer Einrichtung – gibt beiden Seiten Struktur und Entlastung." },
    ],
  },
};

const PG_LABELS = ["", "PG 1", "PG 2", "PG 3", "PG 4", "PG 5"];

export default function PfadB() {
  const [step, setStep] = useState(0);
  const [pflegegrad, setPflegegrad] = useState<number | null>(null);
  const [wohnsituation, setWohnsituation] = useState<string | null>(null);
  const [herausforderung, setHerausforderung] = useState<string | null>(null);

  const ergebnisInhalt = herausforderung ? ERGEBNIS_INHALT[herausforderung] : null;

  return (
    <div className="space-y-8">
      <AnimatePresence mode="wait">

        {/* SCHRITT 1 – Pflegegrad */}
        {step === 0 && (
          <motion.div key="step0" {...fade} transition={{ duration: 0.3 }}>
            <p className="section-label">Schritt 1 von 3</p>
            <h2 className="font-serif text-3xl text-gray-900 mb-2">Welchen Pflegegrad habt ihr?</h2>
            <p className="text-gray-500 mb-8">Das hilft uns einzuschätzen was euch zusteht.</p>

            <div className="grid grid-cols-5 gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((pg) => (
                <button
                  key={pg}
                  onClick={() => { setPflegegrad(pg); setStep(1); }}
                  className={`rounded-full py-2.5 text-sm font-semibold border transition-all ${
                    pflegegrad === pg
                      ? "bg-brand text-white border-brand"
                      : "bg-white text-gray-700 border-[#E0EDE7] hover:border-brand hover:text-brand"
                  }`}
                >
                  PG {pg}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* SCHRITT 2 – Wohnsituation */}
        {step === 1 && (
          <motion.div key="step1" {...fade} transition={{ duration: 0.3 }}>
            <p className="section-label">Schritt 2 von 3</p>
            <h2 className="font-serif text-3xl text-gray-900 mb-2">Wie ist die Wohnsituation?</h2>
            <p className="text-gray-500 mb-8">Wo lebt die pflegebedürftige Person gerade?</p>

            <div className="space-y-3 mb-8">
              {WOHNSITUATIONEN.map((w) => (
                <button
                  key={w.id}
                  onClick={() => { setWohnsituation(w.id); setStep(2); }}
                  className={`w-full flex items-center gap-4 p-4 rounded-[12px] border-2 text-left transition-all ${
                    wohnsituation === w.id
                      ? "border-brand bg-brand-light"
                      : "border-[#E0EDE7] bg-white hover:border-brand/40"
                  }`}
                >
                  <span className="text-2xl">{w.icon}</span>
                  <span className="font-medium text-gray-900 text-sm">{w.label}</span>
                </button>
              ))}
            </div>

            <button onClick={() => setStep(0)} className="btn-ghost">← Zurück</button>
          </motion.div>
        )}

        {/* SCHRITT 3 – Herausforderung */}
        {step === 2 && (
          <motion.div key="step2" {...fade} transition={{ duration: 0.3 }}>
            <p className="section-label">Schritt 3 von 3</p>
            <h2 className="font-serif text-3xl text-gray-900 mb-2">Wie geht es dir gerade?</h2>
            <p className="text-gray-500 mb-8">Wähle was am ehesten zutrifft – sei ehrlich, hier ist kein Platz für Schönreden.</p>

            <div className="space-y-3 mb-8">
              {HERAUSFORDERUNGEN.map((h) => (
                <button
                  key={h.id}
                  onClick={() => { setHerausforderung(h.id); setStep(3); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className={`w-full flex items-center gap-4 p-4 rounded-[12px] border-2 text-left transition-all ${
                    herausforderung === h.id
                      ? "border-brand bg-brand-light"
                      : "border-[#E0EDE7] bg-white hover:border-brand/40"
                  }`}
                >
                  <span className="text-2xl">{h.icon}</span>
                  <span className="font-medium text-gray-900 text-sm">{h.label}</span>
                </button>
              ))}
            </div>

            <button onClick={() => setStep(1)} className="btn-ghost">← Zurück</button>
          </motion.div>
        )}

        {/* ERGEBNIS */}
        {step === 3 && ergebnisInhalt && pflegegrad && (
          <motion.div key="step3" {...fade} transition={{ duration: 0.3 }}>

            {/* SOFORT-LEISTUNGEN – immer sichtbar */}
            <div className="mb-8">
              <p className="section-label">Sofort holen – für jeden ab {PG_LABELS[pflegegrad]}</p>
              <h2 className="font-serif text-2xl text-gray-900 mb-5">Diese zwei Dinge solltet ihr jetzt beantragen</h2>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="card p-5 border-brand/30">
                  <div className="text-3xl mb-3">📦</div>
                  <h3 className="font-semibold text-gray-900 mb-1">Pflegebox</h3>
                  <p className="text-brand font-bold text-sm mb-2">42 € / Monat – kostenlos</p>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    Handschuhe, Desinfektion, Bettschutz – jeden Monat nach Hause. Die Pflegekasse zahlt vollständig. Geht in 5 Minuten.
                  </p>
                </div>
                <div className="card p-5 border-brand/30">
                  <div className="text-3xl mb-3">🔔</div>
                  <h3 className="font-semibold text-gray-900 mb-1">Hausnotruf</h3>
                  <p className="text-brand font-bold text-sm mb-2">ab 0 € / Monat</p>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    Pflegekasse zahlt 25,50 € / Monat. Bei günstigen Anbietern entstehen keine Kosten. Gibt euch beiden Sicherheit.
                  </p>
                </div>
              </div>
            </div>

            {/* PERSÖNLICHER BLOCK */}
            <div className="mb-8">
              <div className="bg-gray-50 rounded-2xl p-6 mb-5">
                <h3 className="font-serif text-2xl text-gray-900 mb-3">{ergebnisInhalt.titel}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{ergebnisInhalt.text}</p>
              </div>

              <div className="space-y-3">
                {ergebnisInhalt.leistungen.map((l) => (
                  <div key={l.name} className="card p-4 flex gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-gray-900 text-sm">{l.name}</p>
                        <span className="text-xs text-brand font-bold">{l.betrag}</span>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed">{l.beschreibung}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WEITERE LEISTUNGEN */}
            {PG_LEISTUNGEN[pflegegrad] && (
              <div className="mb-8">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Alle weiteren Leistungen mit {PG_LABELS[pflegegrad]}
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {PG_LEISTUNGEN[pflegegrad].map((l) => (
                    <div key={l.name} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-2.5">
                      <span className="text-sm text-gray-700">{l.name}</span>
                      <span className="text-xs text-brand font-semibold">{l.betrag}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* LEAD FORM */}
            <div className="border-t border-[#E0EDE7] pt-8">
              <LeadForm
                title="Wir schauen gemeinsam was bei euch noch geht"
                subtitle="Kostenlos, persönlich – auf dein Tempo."
                cta="Jetzt kostenlos melden"
                path="pfad-b"
                pflegegrad={`PG ${pflegegrad}`}
              />
            </div>

            <button onClick={() => setStep(2)} className="btn-ghost mt-4">← Zurück</button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
