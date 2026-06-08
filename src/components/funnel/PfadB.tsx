"use client";

import { useState } from "react";

import { Home, Users, HeartHandshake, Building2, Package, Bell, ListChecks, ClipboardList, Check, ArrowRight, Info, X } from "lucide-react";
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
  { id: "alleine", label: "Alleine zuhause", icon: <Home size={20} className="text-brand" /> },
  { id: "selbst", label: "Zuhause, Angehörige helfen", icon: <Users size={20} className="text-brand" /> },
  { id: "dienst", label: "Zuhause mit Pflegedienst", icon: <HeartHandshake size={20} className="text-brand" /> },
  { id: "heim", label: "Im Pflegeheim", icon: <Building2 size={20} className="text-brand" /> },
];



const PG_LABELS = ["", "PG 1", "PG 2", "PG 3", "PG 4", "PG 5"];


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
  const [infoPopup, setInfoPopup] = useState<"box" | "hausnotruf" | null>(null);


  const INFO_CONTENT = {
    box: {
      titel: "Was ist die Pflegehilfsmittelbox?",
      intro: "Ein monatliches Paket mit Verbrauchsmitteln für die Pflege zuhause – vollständig von der Pflegekasse bezahlt.",
      fakten: [
        { label: "Inhalt", wert: "Handschuhe, Desinfektion, Bettschutzeinlagen u.v.m." },
        { label: "Kosten", wert: "0 € – Pflegekasse übernimmt bis zu 42 € / Monat" },
        { label: "Ab", wert: "Pflegegrad 1" },
        { label: "Aufwand", wert: "Einmal bestellen, automatisch jeden Monat" },
      ],
    },
    hausnotruf: {
      titel: "Was ist ein Hausnotruf?",
      intro: "Ein kleines Gerät – meist als Armband oder Halskette – das per Knopfdruck sofort Hilfe ruft.",
      fakten: [
        { label: "Funktion", wert: "Notruf per Knopfdruck, auch wenn man alleine ist" },
        { label: "Zuschuss", wert: "Pflegekasse zahlt 25,50 € / Monat" },
        { label: "Eigenanteil", wert: "Bei günstigen Anbietern oft 0 €" },
        { label: "Ab", wert: "Pflegegrad 1" },
      ],
    },
  };

  return (
    <div className="space-y-6">

      {/* Info-Popup – immer im DOM, nur per CSS sichtbar */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity duration-200 ${
          infoPopup ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        onClick={() => setInfoPopup(null)}
      >
        <div
          className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-serif text-lg text-gray-900 leading-snug pr-4">
              {infoPopup ? INFO_CONTENT[infoPopup].titel : ""}
            </h3>
            <button onClick={() => setInfoPopup(null)} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
              <X size={20} />
            </button>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed mb-4">
            {infoPopup ? INFO_CONTENT[infoPopup].intro : ""}
          </p>
          <div className="space-y-2">
            {infoPopup && INFO_CONTENT[infoPopup].fakten.map((f) => (
              <div key={f.label} className="flex gap-3 bg-brand-light/60 rounded-xl px-3 py-2.5">
                <span className="text-xs font-bold text-brand w-20 flex-shrink-0 pt-0.5">{f.label}</span>
                <span className="text-xs text-gray-700 leading-relaxed">{f.wert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ProgressBar step={step} modus={modus} />
      <>

        {/* SCHRITT 1 – Pflegegrad */}
        {step === 0 && (
          <div>
            <h2 className="font-serif text-3xl text-gray-900 mb-2">Welchen Pflegegrad hast du?</h2>
            <p className="text-gray-500 mb-8">Das hilft uns einzuschätzen was dir zusteht.</p>
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
            <h2 className="font-serif text-3xl text-gray-900 mb-1.5">Womit möchtest du starten?</h2>
            <p className="text-gray-500 mb-5 text-sm">Wähle den Bereich, der dir gerade am meisten hilft.</p>

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
            <p className="text-gray-600 text-sm mb-1">Damit wir dir nur die Leistungen zeigen, die wirklich zu deiner Situation passen.</p>
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
          <div className="space-y-4">

            {/* Header – konsistent mit anderen Steps */}
            <div>
              <p className="section-label mb-1">Deine Leistungen mit {PG_LABELS[pflegegrad]}</p>
              <h2 className="font-serif text-3xl text-gray-900 leading-snug">
                Das steht dir zu – lass es nicht liegen.
              </h2>
            </div>

            {/* Subheadline zu den beiden Boxen */}
            <p className="section-label -mt-1">
              Diese beiden Leistungen werden besonders häufig genutzt
            </p>

            {/* Pflegehilfsmittelbox – Haupt-CTA */}
            <div className="card p-5 border-2 border-brand relative">
              <button
                onClick={() => setInfoPopup("box")}
                className="absolute top-4 right-4 text-gray-300 hover:text-brand transition-colors"
                aria-label="Mehr Infos zur Pflegehilfsmittelbox"
              >
                <Info size={17} />
              </button>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center flex-shrink-0">
                    <Package size={20} className="text-white" />
                  </div>
                  <h3 className="font-serif text-lg text-gray-900 leading-tight">Kostenlose Pflegehilfsmittel</h3>
                </div>
                <span className="text-[10px] font-bold bg-brand text-white px-2.5 py-1 rounded-full flex-shrink-0 mr-5">
                  Empfohlen
                </span>
              </div>
              <ul className="space-y-2 mb-4">
                {[
                  "Kostenübernahme durch Pflegekasse",
                  "Monatlich direkt nach Hause",
                  "Antrag in unter 2 Minuten",
                ].map((v) => (
                  <li key={v} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check size={15} className="text-brand flex-shrink-0" />
                    {v}
                  </li>
                ))}
              </ul>
              <a
                href="https://t.adcell.com/p/click?promoId=273407&slotId=149760&subId=hauptfunnel_box&param0=https%3A%2F%2Fpflegehase.de%2Fpflegehilfsmittel-bestellung%2F"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center py-3.5 text-base text-center"
              >
                Box kostenlos beantragen <ArrowRight size={16} />
              </a>
            </div>

            {/* Hausnotruf */}
            <div className="card p-5 relative">
              <button
                onClick={() => setInfoPopup("hausnotruf")}
                className="absolute top-4 right-4 text-gray-300 hover:text-brand transition-colors"
                aria-label="Mehr Infos zum Hausnotruf"
              >
                <Info size={17} />
              </button>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center flex-shrink-0">
                  <Bell size={20} className="text-brand" />
                </div>
                <h3 className="font-serif text-lg text-gray-900 leading-tight">Hausnotruf</h3>
              </div>
              <ul className="space-y-2 mb-4">
                {[
                  "Mehr Sicherheit zuhause",
                  "Pflegekasse zahlt monatlichen Zuschuss",
                  "Schnell eingerichtet",
                ].map((v) => (
                  <li key={v} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check size={15} className="text-brand flex-shrink-0" />
                    {v}
                  </li>
                ))}
              </ul>
              <a
                href="https://t.adcell.com/p/click?promoId=307657&slotId=149760&subId=hauptfunnel_hausnotruf&param0=https%3A%2F%2Fpflegehase.de%2Fhausnotruf-bestellung%2F"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full justify-center py-3 text-sm text-center"
              >
                Hausnotruf kostenfrei bestellen <ArrowRight size={16} />
              </a>
            </div>

            {/* Weitere Leistungen */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Weitere Leistungen mit {PG_LABELS[pflegegrad]}
              </p>
              <div className="space-y-1.5">
                {PG_LEISTUNGEN[pflegegrad]?.map((l) => (
                  <div key={l.name} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-2.5">
                    <span className="text-sm text-gray-700">{l.name}</span>
                    <span className="text-xs text-brand font-bold">{l.betrag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Kontaktformular */}
            <div className="border-t border-[#E0EDE7] pt-6">
              <LeadForm
                title="Persönliche Unterstützung gewünscht?"
                subtitle="Wenn du Hilfe bei Anträgen oder Fragen zu den Leistungen möchtest, begleiten wir dich kostenlos und unverbindlich."
                cta="Kostenlose Unterstützung anfragen"
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
              <h2 className="font-serif text-3xl text-gray-900 mb-2">Was du nicht vergessen darfst</h2>
              <p className="text-gray-500 text-sm">Klicke auf jeden Punkt für Details und konkrete nächste Schritte.</p>
            </div>

            {/* Pflegehilfsmittelbox + Hausnotruf – identisch zur Leistungsseite */}
            <p className="section-label -mt-2">Diese beiden Leistungen werden besonders häufig genutzt</p>

            <div className="card p-5 border-2 border-brand relative">
              <button
                onClick={() => setInfoPopup("box")}
                className="absolute top-4 right-4 text-gray-300 hover:text-brand transition-colors"
                aria-label="Mehr Infos zur Pflegehilfsmittelbox"
              >
                <Info size={17} />
              </button>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center flex-shrink-0">
                    <Package size={20} className="text-white" />
                  </div>
                  <h3 className="font-serif text-lg text-gray-900 leading-tight">Kostenlose Pflegehilfsmittel</h3>
                </div>
                <span className="text-[10px] font-bold bg-brand text-white px-2.5 py-1 rounded-full flex-shrink-0 mr-5">
                  Empfohlen
                </span>
              </div>
              <ul className="space-y-2 mb-4">
                {[
                  "Kostenübernahme durch Pflegekasse",
                  "Monatlich direkt nach Hause",
                  "Antrag in unter 2 Minuten",
                ].map((v) => (
                  <li key={v} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check size={15} className="text-brand flex-shrink-0" />
                    {v}
                  </li>
                ))}
              </ul>
              <a
                href="https://t.adcell.com/p/click?promoId=273407&slotId=149760&subId=hauptfunnel_box&param0=https%3A%2F%2Fpflegehase.de%2Fpflegehilfsmittel-bestellung%2F"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center py-3.5 text-base text-center"
              >
                Box kostenlos beantragen <ArrowRight size={16} />
              </a>
            </div>

            <div className="card p-5 relative">
              <button
                onClick={() => setInfoPopup("hausnotruf")}
                className="absolute top-4 right-4 text-gray-300 hover:text-brand transition-colors"
                aria-label="Mehr Infos zum Hausnotruf"
              >
                <Info size={17} />
              </button>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center flex-shrink-0">
                  <Bell size={20} className="text-brand" />
                </div>
                <h3 className="font-serif text-lg text-gray-900 leading-tight">Hausnotruf</h3>
              </div>
              <ul className="space-y-2 mb-4">
                {[
                  "Mehr Sicherheit zuhause",
                  "Pflegekasse zahlt monatlichen Zuschuss",
                  "Schnell eingerichtet",
                ].map((v) => (
                  <li key={v} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check size={15} className="text-brand flex-shrink-0" />
                    {v}
                  </li>
                ))}
              </ul>
              <a
                href="https://t.adcell.com/p/click?promoId=307657&slotId=149760&subId=hauptfunnel_hausnotruf&param0=https%3A%2F%2Fpflegehase.de%2Fhausnotruf-bestellung%2F"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full justify-center py-3 text-sm text-center"
              >
                Hausnotruf kostenfrei bestellen <ArrowRight size={16} />
              </a>
            </div>

            <Checkliste />

            <div className="border-t border-[#E0EDE7] pt-8">
              <LeadForm
                title="Wir helfen dir die Checkliste abzuhaken"
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
