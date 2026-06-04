"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { NBA_MODULE, berechneNBA } from "@/lib/nba";

interface Props {
  onErgebnis: (pflegegrad: number, gesamtpunkte: number) => void;
}

const fade = { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 } };

const PG_FARBEN: Record<number, string> = {
  0: "bg-gray-100 text-gray-600",
  1: "bg-blue-50 text-blue-700",
  2: "bg-brand-light text-brand",
  3: "bg-amber-50 text-amber-700",
  4: "bg-orange-50 text-orange-700",
  5: "bg-red-50 text-red-700",
};

export default function PflegegradRechner({ onErgebnis }: Props) {
  const [modulIndex, setModulIndex] = useState(0);
  const [antworten, setAntworten] = useState<Record<string, number>>({});
  const [fertig, setFertig] = useState(false);

  const modul = NBA_MODULE[modulIndex];
  const frageIds = modul.fragen.map((f) => f.id);
  const alleBeantwortet = frageIds.every((id) => antworten[id] !== undefined);
  const fortschritt = Math.round(((modulIndex) / NBA_MODULE.length) * 100);

  const ergebnis = fertig ? berechneNBA(antworten) : null;

  function weiter() {
    if (modulIndex < NBA_MODULE.length - 1) {
      setModulIndex((i) => i + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const result = berechneNBA(antworten);
      setFertig(true);
      onErgebnis(result.pflegegrad, result.gesamtpunkte);
    }
  }

  function zurueck() {
    if (modulIndex > 0) setModulIndex((i) => i - 1);
  }

  if (fertig && ergebnis) {
    return (
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className={`rounded-2xl p-7 text-center ${PG_FARBEN[ergebnis.pflegegrad]}`}>
          {ergebnis.pflegegrad === 0 ? (
            <>
              <p className="text-4xl font-serif mb-2">Kein Pflegegrad</p>
              <p className="text-sm opacity-80">
                Mit {ergebnis.gesamtpunkte.toFixed(1)} Punkten liegt die Einschätzung unter der Schwelle für PG 1 (12,5 Punkte).
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-semibold uppercase tracking-wider opacity-70 mb-1">Eingeschätzter Pflegegrad</p>
              <p className="font-serif text-6xl mb-2">PG {ergebnis.pflegegrad}</p>
              <p className="text-sm opacity-80">{ergebnis.gesamtpunkte.toFixed(1)} von 100 Punkten</p>
            </>
          )}
        </div>

        <div className="card p-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Ergebnis pro Modul</p>
          <div className="space-y-3">
            {NBA_MODULE.map((m) => {
              const pct = ergebnis.modulProzent[m.id] ?? 0;
              return (
                <div key={m.id}>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>{m.titel}</span>
                    <span>{pct.toFixed(0)}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800 leading-relaxed">
          <strong className="block mb-1">Wichtiger Hinweis</strong>
          Dies ist eine unverbindliche Selbsteinschätzung auf Basis des NBA-Instruments. Der offizielle Pflegegrad wird durch den Medizinischen Dienst (MDK) im persönlichen Gespräch festgestellt und kann abweichen.
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Fortschrittsbalken */}
      <div>
        <div className="flex justify-between text-xs text-gray-500 mb-1.5">
          <span>Modul {modulIndex + 1} von {NBA_MODULE.length}</span>
          <span>{fortschritt}%</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-brand rounded-full"
            animate={{ width: `${fortschritt}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={modulIndex} {...fade} transition={{ duration: 0.25 }}>
          {/* Modul-Header */}
          <div className="mb-6">
            <span className="text-xs font-semibold bg-brand-light text-brand px-3 py-1 rounded-full">
              Modul {modulIndex + 1} · {modul.gewichtung}% Gewichtung
            </span>
            <h3 className="font-serif text-2xl text-gray-900 mt-3 mb-1">{modul.titel}</h3>
            <p className="text-gray-500 text-sm">{modul.beschreibung}</p>
          </div>

          {/* Fragen */}
          <div className="space-y-5">
            {modul.fragen.map((frage) => (
              <div key={frage.id} className="card p-5">
                <p className="font-medium text-gray-900 text-sm mb-3 leading-relaxed">{frage.text}</p>
                <div className="space-y-2">
                  {frage.optionen.map((option) => (
                    <button
                      key={option.label}
                      onClick={() => setAntworten((prev) => ({ ...prev, [frage.id]: option.punkte }))}
                      className={`w-full text-left text-sm px-4 py-2.5 rounded-xl border transition-all ${
                        antworten[frage.id] === option.punkte
                          ? "bg-brand text-white border-brand"
                          : "bg-white text-gray-700 border-[#E0EDE7] hover:border-brand/40 hover:bg-gray-50"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={zurueck}
          disabled={modulIndex === 0}
          className="btn-ghost disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={16} /> Zurück
        </button>

        <button
          onClick={weiter}
          disabled={!alleBeantwortet}
          className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {modulIndex === NBA_MODULE.length - 1 ? (
            <>Ergebnis anzeigen <ArrowRight size={16} /></>
          ) : (
            <>Weiter <ChevronRight size={16} /></>
          )}
        </button>
      </div>
    </div>
  );
}
