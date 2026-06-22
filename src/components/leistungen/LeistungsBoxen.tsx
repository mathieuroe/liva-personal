"use client";

import { useState } from "react";
import { Package, Bell, Check, ArrowRight, Info, X } from "lucide-react";

const INFO_CONTENT = {
  box: {
    titel: "Was ist die Pflegehilfsmittelbox?",
    intro: "Ein monatliches Paket mit Verbrauchsmitteln für die Pflege zuhause – vollständig von der Pflegekasse bezahlt.",
    fakten: [
      { label: "Inhalt", wert: "Handschuhe, Desinfektion, Bettschutzeinlagen u.v.m." },
      { label: "Kosten", wert: "0 € – Pflegekasse übernimmt bis zu 42 € / Monat" },
      { label: "Ab", wert: "Pflegegrad 1" },
      { label: "Aufwand", wert: "Einmal bestellen, automatisch jeden Monat" },
      { label: "Abwicklung", wert: "Unser geprüfter Partner Pflegehase" },
    ],
  },
  hausnotruf: {
    titel: "Was ist ein Hausnotruf?",
    intro: "Eine kleine Basisstation + Notrufknopf als Armband oder Halskette – Hilfe per Knopfdruck.",
    fakten: [
      { label: "Funktion", wert: "Notruf per Knopfdruck, auch wenn man alleine ist" },
      { label: "Zuschuss", wert: "Pflegekasse zahlt 27,00 € / Monat + einmalig bis zu 10,49 €" },
      { label: "Eigenanteil", wert: "Bei günstigen Anbietern oft 0 €" },
      { label: "Ab", wert: "Pflegegrad 1" },
      { label: "Abwicklung", wert: "Unser geprüfter Partner Pflegehase" },
    ],
  },
};

export default function LeistungsBoxen() {
  const [infoPopup, setInfoPopup] = useState<"box" | "hausnotruf" | null>(null);

  return (
    <>
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

      <div className="grid md:grid-cols-2 gap-6">

        {/* Pflegehilfsmittelbox */}
        <div className="card p-5 border-2 border-brand relative transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
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
              <h3 className="font-serif text-lg text-gray-900 leading-tight">Kostenlose Pflegebox</h3>
            </div>
            <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full flex-shrink-0 mr-5">
              Ab Pflegegrad 1
            </span>
          </div>
          <ul className="space-y-2 mb-3">
            {[
              "Pflegekasse übernimmt alle Kosten",
              "Monatlich kostenlos nach Hause geliefert",
              "Antrag in unter 2 Minuten – ohne Papierkram",
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
            className="btn-primary w-full justify-center py-3 text-sm text-center"
          >
            Pflegebox jetzt kostenlos beantragen <ArrowRight size={16} />
          </a>
          <p className="text-center text-[11px] text-gray-400 mt-2">Über unseren geprüften Partner Pflegehase</p>
        </div>

        {/* Hausnotruf */}
        <div className="card p-5 relative transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
          <button
            onClick={() => setInfoPopup("hausnotruf")}
            className="absolute top-4 right-4 text-gray-300 hover:text-brand transition-colors"
            aria-label="Mehr Infos zum Hausnotruf"
          >
            <Info size={17} />
          </button>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center flex-shrink-0">
                <Bell size={20} className="text-brand" />
              </div>
              <h3 className="font-serif text-lg text-gray-900 leading-tight">Kostenloser Hausnotruf</h3>
            </div>
            <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full flex-shrink-0 mr-5">
              Ab Pflegegrad 1
            </span>
          </div>
          <ul className="space-y-2 mb-3">
            {[
              "Sicherheit zuhause – rund um die Uhr",
              "Pflegekasse zahlt – kein Eigenanteil",
              "In wenigen Tagen eingerichtet",
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
            className="btn-primary w-full justify-center py-3 text-sm text-center"
          >
            Hausnotruf kostenlos bestellen <ArrowRight size={16} />
          </a>
          <p className="text-center text-[11px] text-gray-400 mt-2">Über unseren geprüften Partner Pflegehase</p>
        </div>

      </div>
    </>
  );
}
