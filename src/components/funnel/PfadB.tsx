"use client";

import { useState } from "react";

import { Home, Users, HeartHandshake, Building2, Package, Bell, Mail, ListChecks, ClipboardList } from "lucide-react";
import LeadForm from "./LeadForm";
import Checkliste from "./Checkliste";


type Modus = "leistungen" | "checkliste" | null;

type PGLeistung = { name: string; betrag: string };
const PG_LEISTUNGEN: Record<number, PGLeistung[]> = {
  1: [
    { name: "Pflegebox (Pflegehilfsmittel)", betrag: "42 € / Monat" },
    { name: "Hausnotruf-Zuschuss", betrag: "25,50 € / Monat" },
    { name: "Entlastungsbetrag", betrag: "131 € / Monat" },
    { name: "Wohnraumanpassung", betrag: "bis 4.180 €" },
  ],
  2: [
    { name: "Pflegebox (Pflegehilfsmittel)", betrag: "42 € / Monat" },
    { name: "Hausnotruf-Zuschuss", betrag: "25,50 € / Monat" },
    { name: "Pflegegeld", betrag: "332 € / Monat" },
    { name: "Pflegesachleistungen", betrag: "724 € / Monat" },
    { name: "Entlastungsbetrag", betrag: "131 € / Monat" },
    { name: "Verhinderungspflege", betrag: "bis 1.612 € / Jahr" },
  ],
  3: [
    { name: "Pflegebox (Pflegehilfsmittel)", betrag: "42 € / Monat" },
    { name: "Hausnotruf-Zuschuss", betrag: "25,50 € / Monat" },
    { name: "Pflegegeld", betrag: "572 € / Monat" },
    { name: "Pflegesachleistungen", betrag: "1.363 € / Monat" },
    { name: "Entlastungsbetrag", betrag: "131 € / Monat" },
    { name: "Kurzzeitpflege", betrag: "1.774 € / Jahr" },
    { name: "Verhinderungspflege", betrag: "bis 1.612 € / Jahr" },
  ],
  4: [
    { name: "Pflegebox (Pflegehilfsmittel)", betrag: "42 € / Monat" },
    { name: "Hausnotruf-Zuschuss", betrag: "25,50 € / Monat" },
    { name: "Pflegegeld", betrag: "764 € / Monat" },
    { name: "Pflegesachleistungen", betrag: "1.693 € / Monat" },
    { name: "Entlastungsbetrag", betrag: "131 € / Monat" },
    { name: "Verhinderungspflege", betrag: "bis 1.612 € / Jahr" },
    { name: "Kurzzeitpflege", betrag: "1.774 € / Jahr" },
  ],
  5: [
    { name: "Pflegebox (Pflegehilfsmittel)", betrag: "42 € / Monat" },
    { name: "Hausnotruf-Zuschuss", betrag: "25,50 € / Monat" },
    { name: "Pflegegeld", betrag: "946 € / Monat" },
    { name: "Pflegesachleistungen", betrag: "2.095 € / Monat" },
    { name: "Entlastungsbetrag", betrag: "131 € / Monat" },
    { name: "Verhinderungspflege", betrag: "bis 1.612 € / Jahr" },
    { name: "Kurzzeitpflege", betrag: "1.774 € / Jahr" },
  ],
};

const WOHNSITUATIONEN = [
  { id: "alleine", label: "Zuhause – ich lebe selbstständig", icon: <Home size={20} className="text-brand" /> },
  { id: "selbst", label: "Zuhause – Angehörige helfen regelmäßig", icon: <Users size={20} className="text-brand" /> },
  { id: "dienst", label: "Zuhause – ein Pflegedienst unterstützt", icon: <HeartHandshake size={20} className="text-brand" /> },
  { id: "beides", label: "Zuhause – Angehörige und Pflegedienst gemeinsam", icon: <Users size={20} className="text-brand" /> },
  { id: "heim", label: "Pflegeheim oder stationäre Einrichtung", icon: <Building2 size={20} className="text-brand" /> },
];



const PG_LABELS = ["", "PG 1", "PG 2", "PG 3", "PG 4", "PG 5"];

function buildMailtoLink(pflegegrad: number): string {
  const subject = encodeURIComponent("Antrag auf Pflegeleistungen – Bitte um Beratungstermin");
  const body = encodeURIComponent(
    `Sehr geehrte Damen und Herren,\n\n` +
    `ich bin Angehöriger einer pflegebedürftigen Person mit Pflegegrad ${pflegegrad} und möchte sicherstellen, dass alle zustehenden Leistungen beantragt sind.\n\n` +
    `Ich bitte um:\n` +
    `1. Einen kostenlosen Pflegeberatungstermin nach §7a SGB XI\n` +
    `2. Eine Übersicht aller Leistungen für Pflegegrad ${pflegegrad}\n` +
    `3. Informationen zur Beantragung von Pflegehilfsmitteln (§40 SGB XI)\n` +
    `4. Informationen zum Hausnotruf-Zuschuss (§40 SGB XI)\n\n` +
    `Bitte nehmen Sie Kontakt mit mir auf.\n\nMit freundlichen Grüßen`
  );
  return `mailto:?subject=${subject}&body=${body}`;
}

interface PfadBProps {
  onStepChange?: (step: number) => void;
}

function ProgressBar({ step, modus }: { step: number; modus: Modus }) {
  // Leistungen: steps 0→1→2→4 = 4 Schritte
  // Checkliste: steps 0→1→5 = 3 Schritte
  const isCheckliste = modus === "checkliste";
  const total = isCheckliste ? 3 : 4;

  const current = (() => {
    if (step === 0) return 1;
    if (step === 1) return 2;
    if (step === 5) return 3; // Checkliste-Ergebnis
    if (step === 2) return 3;
    if (step === 4) return 4;
    return 1;
  })();

  const percent = Math.round((current / total) * 100);

  return (
    <div className="mb-6">
      <div className="flex justify-between text-xs text-gray-400 mb-1.5">
        <span>Schritt {current} von {total}</span>
        <span>{percent}%</span>
      </div>
      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default function PfadB({ onStepChange }: PfadBProps = {}) {
  const [step, setStep] = useState(0);

  function gotoStep(s: number) {
    setStep(s);
    onStepChange?.(s);
  }
  const [pflegegrad, setPflegegrad] = useState<number | null>(null);
  const [modus, setModus] = useState<Modus>(null);
  const [wohnsituation, setWohnsituation] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <ProgressBar step={step} modus={modus} />
      <>

        {/* SCHRITT 1 – Pflegegrad */}
        {step === 0 && (
          <div>
            <h2 className="font-serif text-3xl text-gray-900 mb-2">Welchen Pflegegrad habt ihr?</h2>
            <p className="text-gray-500 mb-8">Das hilft uns einzuschätzen was euch zusteht.</p>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((pg) => (
                <button
                  key={pg}
                  onClick={() => { setPflegegrad(pg); gotoStep(1); }}
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
          </div>
        )}

        {/* SCHRITT 2 – Modus wählen */}
        {step === 1 && pflegegrad && (
          <div>
            <h2 className="font-serif text-3xl text-gray-900 mb-1.5">Womit möchtet ihr starten?</h2>
            <p className="text-gray-500 mb-5 text-sm">Wählt den Bereich, der euch gerade am meisten hilft.</p>

            <div className="flex flex-col gap-3 mb-6">
              {/* Box 1 – Leistungen (hervorgehoben) */}
              <button
                onClick={() => { setModus("leistungen"); gotoStep(2); }}
                className={`flex items-start gap-3 text-left px-4 py-3.5 rounded-[12px] border-2 transition-all w-full relative ${
                  modus === "leistungen"
                    ? "border-brand bg-brand-light"
                    : "border-brand/40 bg-brand-light/30 hover:border-brand hover:bg-brand-light/50"
                }`}
              >
                <ClipboardList size={20} className="text-brand flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-semibold text-gray-900 text-sm">Leistungen prüfen</p>
                    <span className="text-[10px] font-bold bg-brand text-white px-2 py-0.5 rounded-full">Empfohlen</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Zeigt dir Pflegegeld, Hilfsmittel und weitere Ansprüche für deinen Pflegegrad.
                  </p>
                </div>
              </button>

              {/* Box 2 – Checkliste (neutral) */}
              <button
                onClick={() => { setModus("checkliste"); gotoStep(5); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className={`flex items-start gap-3 text-left px-4 py-3.5 rounded-[12px] border-2 transition-all w-full ${
                  modus === "checkliste"
                    ? "border-brand bg-brand-light"
                    : "border-[#E0EDE7] bg-white hover:border-brand/40"
                }`}
              >
                <ListChecks size={20} className="text-brand flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm mb-0.5">Checkliste erhalten</p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Schritt-für-Schritt Übersicht: Was du jetzt organisieren, prüfen und nicht vergessen solltest.
                  </p>
                </div>
              </button>
            </div>

            <button onClick={() => gotoStep(0)} className="btn-ghost">← Zurück</button>
          </div>
        )}

        {/* LEISTUNGEN – Wohnsituation */}
        {step === 2 && (
          <div>
            <h2 className="font-serif text-2xl text-gray-900 mb-1.5">Wie ist die Wohnsituation?</h2>
            <p className="text-gray-600 text-sm mb-1">Damit wir dir nur die Leistungen zeigen, die wirklich zu eurer Situation passen.</p>
            <p className="text-gray-400 text-xs mb-6 leading-relaxed">Je nachdem wie die Pflege organisiert ist, können unterschiedliche Leistungen infrage kommen.</p>
            <div className="space-y-2.5 mb-8">
              {WOHNSITUATIONEN.map((w) => (
                <button
                  key={w.id}
                  onClick={() => { setWohnsituation(w.id); gotoStep(4); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-[12px] border-2 text-left transition-all ${
                    wohnsituation === w.id ? "border-brand bg-brand-light" : "border-[#E0EDE7] bg-white hover:border-brand/30"
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-light flex items-center justify-center flex-shrink-0">{w.icon}</div>
                  <span className="font-medium text-gray-900 text-sm leading-snug">{w.label}</span>
                </button>
              ))}
            </div>
            <button onClick={() => gotoStep(1)} className="btn-ghost">← Zurück</button>
          </div>
        )}

        {/* LEISTUNGEN – Ergebnis */}
        {step === 4 && pflegegrad && (
          <div className="space-y-8">

            <div className="bg-brand-light rounded-2xl px-5 py-4">
              <h2 className="font-serif text-2xl text-gray-900 mb-1">Gut, dass ihr euch kümmert.</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Hier sind alle Leistungen die euch mit {PG_LABELS[pflegegrad]} zustehen – viele davon können direkt beantragt werden.
              </p>
            </div>

            {/* Pflegebox + Hausnotruf */}
            <div>
              <p className="section-label mb-3">Als erstes – immer</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="card p-5">
                  <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center mb-3">
                    <Package size={22} className="text-brand" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Pflegebox</h3>
                  <p className="text-brand font-bold text-sm mb-2">42 € / Monat – kostenlos</p>
                  <p className="text-gray-500 text-xs leading-relaxed">Handschuhe, Desinfektion, Bettschutz – jeden Monat nach Hause. Pflegekasse zahlt vollständig.</p>
                </div>
                <div className="card p-5">
                  <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center mb-3">
                    <Bell size={22} className="text-brand" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Hausnotruf</h3>
                  <p className="text-brand font-bold text-sm mb-2">ab 0 € / Monat</p>
                  <p className="text-gray-500 text-xs leading-relaxed">Pflegekasse zahlt 25,50 € / Monat. Bei günstigen Anbietern entstehen keine Kosten.</p>
                </div>
              </div>
            </div>

            {/* Alle Leistungen */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Alle Leistungen mit {PG_LABELS[pflegegrad]}</p>
              <div className="space-y-2 mb-4">
                {PG_LEISTUNGEN[pflegegrad]?.map((l) => (
                  <div key={l.name} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                    <span className="text-sm text-gray-700">{l.name}</span>
                    <span className="text-xs text-brand font-bold">{l.betrag}</span>
                  </div>
                ))}
              </div>
              <a href={buildMailtoLink(pflegegrad)} className="btn-secondary text-sm inline-flex">
                <Mail size={15} /> Anschreiben an Pflegekasse öffnen
              </a>
            </div>

            <div className="border-t border-[#E0EDE7] pt-8">
              <LeadForm
                title="Wir helfen euch die Leistungen zu beantragen"
                subtitle="Kostenlos, persönlich – auf dein Tempo."
                cta="Jetzt kostenlos melden"
                path="pfad-b"
                pflegegrad={`PG ${pflegegrad}`}
              />
            </div>
            <button onClick={() => gotoStep(2)} className="btn-ghost">← Zurück</button>
          </div>
        )}

        {/* CHECKLISTE */}
        {step === 5 && pflegegrad && (
          <div className="space-y-6">
            <div>
              <p className="section-label mb-1">Dein persönlicher Aktionsplan</p>
              <h2 className="font-serif text-3xl text-gray-900 mb-2">Was ihr nicht vergessen dürft</h2>
              <p className="text-gray-500 text-sm">Klicke auf jeden Punkt für Details und konkrete nächste Schritte.</p>
            </div>

            {/* Pflegebox + Hausnotruf prominent */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="card p-5 border-brand/30">
                <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center mb-3">
                  <Package size={22} className="text-brand" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Pflegebox</h3>
                <p className="text-brand font-bold text-sm mb-2">42 € / Monat – kostenlos</p>
                <p className="text-gray-500 text-xs leading-relaxed">Handschuhe, Desinfektion, Bettschutz. Die Pflegekasse zahlt vollständig. Geht in 5 Minuten.</p>
              </div>
              <div className="card p-5 border-brand/30">
                <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center mb-3">
                  <Bell size={22} className="text-brand" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Hausnotruf</h3>
                <p className="text-brand font-bold text-sm mb-2">ab 0 € / Monat</p>
                <p className="text-gray-500 text-xs leading-relaxed">Pflegekasse zahlt 25,50 € / Monat. Sicherheit für euch beide – auch wenn du kurz weg bist.</p>
              </div>
            </div>

            <Checkliste />

            <div className="border-t border-[#E0EDE7] pt-8">
              <LeadForm
                title="Wir helfen euch die Checkliste abzuhaken"
                subtitle="Kostenlos, persönlich – auf dein Tempo."
                cta="Jetzt kostenlos melden"
                path="pfad-b-checkliste"
                pflegegrad={`PG ${pflegegrad}`}
              />
            </div>
            <button onClick={() => gotoStep(1)} className="btn-ghost">← Zurück</button>
          </div>
        )}

      </>
    </div>
  );
}
