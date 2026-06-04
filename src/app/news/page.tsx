"use client";

import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import Footer from "@/components/layout/Footer";
import { NEWS } from "@/lib/content-data";
import { useState } from "react";

const KATEGORIEN = ["Alle", ...Array.from(new Set(NEWS.map((n) => n.kategorie)))];

export default function NewsPage() {
  const [aktiv, setAktiv] = useState("Alle");

  const gefiltert = aktiv === "Alle" ? NEWS : NEWS.filter((n) => n.kategorie === aktiv);
  const featured = gefiltert[0];
  const timeline = gefiltert.slice(1);

  return (
    <main className="bg-white">
      {/* Header */}
      <section className="py-10 px-4 sm:px-6 border-b border-neutral-200">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-widest text-brand mb-2">News</p>
          <h1 className="font-serif text-4xl sm:text-5xl text-gray-900 mb-3">News aus der Pflege</h1>
          <p className="text-gray-500 text-base max-w-lg">Aktuelle Entwicklungen in der Pflegepolitik und was sie für dich bedeuten.</p>
        </div>
      </section>

      {/* Filter */}
      <section className="px-4 sm:px-6 py-5 border-b border-neutral-200 bg-white sticky top-[60px] z-10">
        <div className="max-w-3xl mx-auto flex gap-2 flex-wrap">
          {KATEGORIEN.map((k) => (
            <button
              key={k}
              onClick={() => setAktiv(k)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                aktiv === k
                  ? "bg-brand text-white border-brand"
                  : "bg-white text-gray-600 border-neutral-200 hover:border-brand hover:text-brand"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {gefiltert.length === 0 && (
          <p className="text-gray-400 text-sm">Keine Artikel in dieser Kategorie.</p>
        )}

        {/* Timeline – alle Artikel inkl. Featured */}
        {gefiltert.length > 0 && (
          <div className="space-y-6">
            {gefiltert.map((artikel, i) => {
              const isFeatured = i === 0;
              return (
                <div key={artikel.slug} className="flex gap-3 sm:gap-4 items-start">
                  {/* Datum links – nur Desktop */}
                  <div className="hidden sm:block w-20 shrink-0 text-right pt-2">
                    <span className="text-xs text-gray-400 leading-tight">{artikel.datum}</span>
                  </div>

                  {/* Linie + Dot */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className={`mt-2 rounded-full border-2 border-brand shrink-0 ${isFeatured ? "w-4 h-4 bg-brand" : "w-3 h-3 bg-brand-light"}`} />
                    <div className="flex-1 w-px bg-[#E0EDE7] mt-1" />
                  </div>

                  {/* Karte */}
                  <Link
                    href={`/news/${artikel.slug}`}
                    className={`group flex-1 rounded-xl border transition-shadow mb-6 ${
                      isFeatured
                        ? "border-[#E0EDE7] bg-[#F6FAF8] p-5 sm:p-7 hover:shadow-md"
                        : "border-[#E0EDE7] bg-white p-4 sm:p-5 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${isFeatured ? "bg-brand-light text-brand" : "bg-gray-100 text-gray-600"}`}>
                        {artikel.kategorie}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock size={11} /> {artikel.lesezeit}
                      </span>
                      {/* Datum auf Mobile in der Karte */}
                      <span className="sm:hidden ml-auto text-xs text-gray-400">{artikel.datum}</span>
                    </div>
                    {isFeatured ? (
                      <>
                        <h2 className="font-serif text-xl sm:text-2xl text-gray-900 mb-2 group-hover:text-brand transition-colors leading-snug">
                          {artikel.titel}
                        </h2>
                        <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-4">{artikel.beschreibung}</p>
                        <span className="flex items-center gap-1.5 text-sm font-semibold text-brand group-hover:gap-2.5 transition-all">
                          Lesen <ArrowRight size={14} />
                        </span>
                      </>
                    ) : (
                      <>
                        <h3 className="font-semibold text-gray-900 leading-snug mb-1 group-hover:text-brand transition-colors text-sm sm:text-base">
                          {artikel.titel}
                        </h3>
                        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{artikel.beschreibung}</p>
                      </>
                    )}
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* CTA */}
      <section className="py-14 px-4 sm:px-6 bg-brand-hover mt-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-2xl sm:text-3xl text-white mb-3">Was steht dir konkret zu?</h2>
          <p className="text-white/70 mb-6 text-sm sm:text-base">Starte den Check – in 2 Minuten weißt du was du beantragen kannst.</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-white text-brand font-semibold px-8 py-4 rounded-full hover:bg-gray-50 transition-colors">
            Jetzt starten <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
