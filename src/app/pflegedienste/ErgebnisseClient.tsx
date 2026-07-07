"use client";

import { useState } from "react";
import { MapPin, ArrowRight, Bell, Package, ChevronDown, X } from "lucide-react";
import Link from "next/link";
import PflegedienstCard from "@/components/vergleich/PflegedienstCard";
import type { PflegedienstResult } from "./page";

interface Props {
  plz: string;
  pflegegrad: string;
  fuerWen: string;
  leistung: string;
  results: PflegedienstResult[];
}

const LEISTUNG_OPTIONEN = [
  "Alle Leistungen",
  "Grundpflege",
  "Betreuung",
  "24h-Pflege",
  "Stationäre Pflege",
  "Demenzbetreuung",
  "Senioren Residenz",
];

function FilterSelect({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const isActive = value !== options[0];
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`appearance-none pl-3 pr-8 py-2 text-sm rounded-xl border cursor-pointer transition-colors outline-none ${
          isActive
            ? "border-brand bg-brand-light/60 text-brand font-semibold"
            : "border-[#E0EDE7] bg-white text-gray-600 hover:border-brand/40"
        }`}
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <ChevronDown
        size={13}
        className={`pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 ${isActive ? "text-brand" : "text-gray-400"}`}
      />
    </div>
  );
}

export default function ErgebnisseClient({ plz, pflegegrad, fuerWen, leistung, results }: Props) {
  const initialLeistung =
    leistung && leistung !== "Weiß ich noch nicht" ? leistung : "Alle Leistungen";

  const [filterLeistung, setFilterLeistung] = useState(initialLeistung);

  const gefiltert = results.filter((pd) => {
    if (filterLeistung !== "Alle Leistungen" && !pd.leistungen.includes(filterLeistung)) return false;
    return true;
  });

  const hatAktiveFilter = filterLeistung !== "Alle Leistungen";

  const noResults = results.length === 0;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 flex-wrap">
          <MapPin size={14} className="text-brand" />
          <span>PLZ {plz}</span>
          {pflegegrad && <><span>·</span><span>{pflegegrad}</span></>}
          {fuerWen && <><span>·</span><span>{fuerWen}</span></>}
        </div>
        <h1 className="font-serif text-3xl text-gray-900 mb-1">
          {noResults ? "Suche läuft…" : `${gefiltert.length} Pflegeeinrichtungen in deiner Nähe`}
        </h1>
        <p className="text-gray-500 text-sm flex items-center gap-1.5">
          {noResults ? (
            "Ergebnisse werden geladen"
          ) : (
            <>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400" />
              Echte Google-Bewertungen · Kostenlose Anfragen über liva
            </>
          )}
        </p>
      </div>

      {/* Filter */}
      {!noResults && (
        <div className="bg-white border border-[#E0EDE7] rounded-2xl p-3 sm:p-4 mb-6">
          <div className="flex flex-wrap gap-2 items-center">
            <FilterSelect
              value={filterLeistung}
              options={LEISTUNG_OPTIONEN}
              onChange={setFilterLeistung}
            />
            {hatAktiveFilter && (
              <button
                onClick={() => setFilterLeistung("Alle Leistungen")}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-brand transition-colors ml-auto"
              >
                <X size={13} /> Filter zurücksetzen
              </button>
            )}
          </div>
        </div>
      )}

      {/* Ergebnisse */}
      <div className="space-y-4 mb-8">
        {noResults && (
          <div className="text-center py-16 text-gray-400">
            <div className="w-10 h-10 border-2 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm">Pflegeeinrichtungen werden geladen…</p>
          </div>
        )}
        {!noResults && gefiltert.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-sm mb-2">Keine Einrichtungen für diesen Filter gefunden.</p>
            <button onClick={() => setFilterLeistung("Alle Leistungen")} className="text-brand text-sm underline">
              Filter zurücksetzen
            </button>
          </div>
        )}
        {gefiltert.map((pd, i) => (
          <PflegedienstCard
            key={pd.id}
            pd={pd}
            plz={plz}
            pflegegrad={pflegegrad}
            featured={i === 0}
          />
        ))}
      </div>

      {/* Affiliate Banner: Hausnotruf */}
      <div className="rounded-2xl border-2 border-brand bg-gradient-to-br from-[#F0F8F4] to-white p-5 mb-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center flex-shrink-0">
            <Bell size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold text-brand uppercase tracking-widest mb-0.5">Zusätzlich kostenlos</p>
            <h3 className="font-serif text-lg text-gray-900 mb-1">Hausnotruf – 27 € / Monat von der Pflegekasse</h3>
            <ul className="space-y-1 mb-3">
              {["27 € / Monat – komplett von der Pflegekasse übernommen", "24/7 Hilfe auf Knopfdruck", "In 3–5 Werktagen eingerichtet"].map((t) => (
                <li key={t} className="flex items-center gap-1.5 text-xs text-gray-600">
                  <span className="w-1 h-1 rounded-full bg-brand flex-shrink-0" />{t}
                </li>
              ))}
            </ul>
            <a
              href="https://t.adcell.com/p/click?promoId=307657&slotId=149760&subId=pflegedienste_hausnotruf&param0=https%3A%2F%2Fpflegehase.de%2Fhausnotruf-bestellung%2F"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-brand/90 transition-colors"
            >
              Jetzt kostenlos beantragen <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Affiliate Banner: Pflegebox */}
      <div className="rounded-2xl border border-[#E0EDE7] bg-white p-5 mb-8">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center flex-shrink-0">
            <Package size={20} className="text-brand" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold text-brand uppercase tracking-widest mb-0.5">Bis zu 42 € / Monat kostenlos</p>
            <h3 className="font-serif text-lg text-gray-900 mb-1">Pflegehilfsmittelbox – vollständig von der Pflegekasse</h3>
            <ul className="space-y-1 mb-3">
              {["Bis zu 42 € / Monat – vollständig von der Pflegekasse", "Monatliche Lieferung – ohne Papierkram", "Ab Pflegegrad 1 sofort beantragbar"].map((t) => (
                <li key={t} className="flex items-center gap-1.5 text-xs text-gray-600">
                  <span className="w-1 h-1 rounded-full bg-brand flex-shrink-0" />{t}
                </li>
              ))}
            </ul>
            <a
              href="https://t.adcell.com/p/click?promoId=273407&slotId=149760&subId=pflegedienste_box&param0=https%3A%2F%2Fpflegehase.de%2Fpflegehilfsmittel-bestellung%2F"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-brand text-brand text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-brand hover:text-white transition-colors"
            >
              Pflegebox jetzt beantragen <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Link href="/" className="text-sm text-gray-400 hover:text-brand transition-colors">
          ← Neue Suche starten
        </Link>
      </div>
    </div>
  );
}
