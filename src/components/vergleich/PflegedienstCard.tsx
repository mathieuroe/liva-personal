"use client";

import { useState } from "react";
import { Star, MapPin, Clock, ArrowRight, ExternalLink, Globe, ShieldCheck } from "lucide-react";
import type { Pflegedienst } from "@/lib/pflegedienste-data";
import { getSprachen, getVersicherung, getAlleLeistungen } from "@/lib/pflegedienste-utils";
import AnfrageModal from "./AnfrageModal";

interface Props {
  pd: Pflegedienst & { distanzKm: number };
  plz: string;
  pflegegrad: string;
  featured?: boolean;
}

function Sterne({ wert }: { wert: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={12}
          className={i <= Math.round(wert) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}
        />
      ))}
    </span>
  );
}

export default function PflegedienstCard({ pd, plz, pflegegrad, featured }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {showModal && (
        <AnfrageModal
          pflegedienstName={pd.name}
          pflegedienstOrt={pd.ort}
          plz={plz}
          pflegegrad={pflegegrad}
          onClose={() => setShowModal(false)}
        />
      )}

      <div className={`bg-white rounded-2xl border transition-shadow hover:shadow-md ${
        featured ? "border-brand shadow-sm" : "border-[#E0EDE7]"
      }`}>
        {featured && (
          <div className="bg-brand px-4 py-1.5 rounded-t-2xl">
            <p className="text-xs font-bold text-white">⭐ Bestbewertet in deiner Region</p>
          </div>
        )}

        <div className="p-5">
          <div className="flex items-start gap-3 mb-3">
            {/* Logo-Placeholder */}
            <div className="w-12 h-12 rounded-xl bg-brand-light flex items-center justify-center flex-shrink-0">
              <span className="text-brand font-bold text-lg">{pd.name[0]}</span>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-base leading-tight mb-0.5">{pd.name}</h3>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin size={11} /> {pd.ort} · ca. {pd.distanzKm} km
                </span>
                <span className="flex items-center gap-1.5">
                  <Sterne wert={pd.bewertung} />
                  <span className="text-xs font-semibold text-gray-700">{pd.bewertung.toFixed(1)}</span>
                  <span className="text-xs text-gray-400">({pd.anzahlBewertungen})</span>
                </span>
              </div>
            </div>

            {pd.verfuegbar && (
              <span className="flex-shrink-0 text-[10px] font-bold text-brand bg-brand-light px-2 py-1 rounded-full">
                Verfügbar
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            {expanded ? pd.beschreibung : pd.beschreibung.slice(0, 100) + (pd.beschreibung.length > 100 ? "…" : "")}
            {pd.beschreibung.length > 100 && (
              <button onClick={() => setExpanded(!expanded)} className="text-brand text-xs ml-1 font-medium">
                {expanded ? "weniger" : "mehr"}
              </button>
            )}
          </p>

          {/* Leistungen */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {getAlleLeistungen(pd.id, pd.leistungen).slice(0, 5).map((l) => (
              <span key={l} className="text-[11px] bg-gray-50 border border-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                {l}
              </span>
            ))}
          </div>

          {/* Sprachen & Versicherung & Adresse */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-3">
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <Globe size={12} className="text-brand flex-shrink-0" />
              {getSprachen(pd.id).join(" · ")}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <ShieldCheck size={12} className="text-brand flex-shrink-0" />
              {getVersicherung(pd.id)}
            </span>
            {pd.adresse && (
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <MapPin size={12} className="text-brand flex-shrink-0" />
                {pd.adresse}{pd.plz ? `, ${pd.plz}` : ""}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
            <Clock size={11} />
            Antwortet meist innerhalb von {pd.reaktionszeit}
          </div>

          {/* CTAs */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="flex-1 btn-primary justify-center py-3 text-sm"
            >
              Kostenlos anfragen <ArrowRight size={15} />
            </button>
            {pd.website && (
              <a
                href={pd.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-3 rounded-xl border border-[#E0EDE7] text-sm text-gray-600 hover:border-brand hover:text-brand transition-colors"
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
