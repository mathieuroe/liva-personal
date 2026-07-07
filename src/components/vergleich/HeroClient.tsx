"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Bell, Package, Heart, Clock, Building2, Star, Search, CheckCircle2, ArrowRight, Phone, Mail } from "lucide-react";

const LEISTUNGEN = [
  { id: "hausnotruf", label: "Hausnotruf", filterLabel: null, icon: Bell, affiliate: "/vergleich#hausnotruf", affiliateExternal: "https://t.adcell.com/p/click?promoId=307657&slotId=149760&subId=hauptfunnel_hausnotruf&param0=https%3A%2F%2Fpflegehase.de%2Fhausnotruf-bestellung%2F" },
  { id: "pflegebox", label: "Pflegebox", filterLabel: null, icon: Package, affiliate: "/vergleich#pflegebox", affiliateExternal: "https://t.adcell.com/p/click?promoId=273407&slotId=149760&subId=hauptfunnel_box&param0=https%3A%2F%2Fpflegehase.de%2Fpflegehilfsmittel-bestellung%2F" },
  { id: "grundpflege", label: "Ambulante Pflege", filterLabel: "Grundpflege", icon: Heart, affiliate: null, affiliateExternal: null },
  { id: "24h", label: "24/7 Pflege", filterLabel: "24h-Pflege", icon: Clock, affiliate: null, affiliateExternal: null },
  { id: "stationaer", label: "Stationäre Pflege", filterLabel: "Stationäre Pflege", icon: Building2, affiliate: null, affiliateExternal: null },
  { id: "residenz", label: "Senioren Residenz", filterLabel: "Senioren Residenz", icon: Star, affiliate: null, affiliateExternal: null },
];

type Leistung = typeof LEISTUNGEN[0];

export default function HeroClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<Leistung>(() => {
    const tab = searchParams.get("tab");
    return LEISTUNGEN.find(l => l.id === tab) ?? LEISTUNGEN[0];
  });
  const [plz, setPlz] = useState("");
  const [plzError, setPlzError] = useState("");
const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleSelect(l: Leistung) {
    setSelected(l);
    setPlzError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (selected.affiliate) {
      router.push(selected.affiliate);
      return;
    }
    if (!/^\d{5}$/.test(plz)) {
      setPlzError("Bitte eine gültige 5-stellige PLZ eingeben.");
      return;
    }
    setSubmitting(true);
    try {
      await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email, phone: tel, plz,
          path: "pflegedienst-vergleich",
          tags: selected.label,
          timestamp: new Date().toISOString(),
        }),
      });
      sessionStorage.setItem("liva_tel", tel);
      sessionStorage.setItem("liva_email", email);
      router.push(`/pflegedienste?plz=${plz}&leistung=${encodeURIComponent(selected.filterLabel ?? "")}`);
    } finally {
      setSubmitting(false);
    }
  }


  return (
    <section className="bg-white border-b border-[#E0EDE7] py-10 sm:py-14 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Headline */}
        <div className="text-center mb-6">
          <h1 className="font-serif text-4xl sm:text-5xl text-gray-900 leading-tight mb-3">
            Pflege organisieren
          </h1>
          <p className="text-gray-500 text-base">
            Einfach. Schnell. Ohne Papierkram.
          </p>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border-2 border-brand shadow-lg overflow-hidden"
        >
          {/* Tabs */}
          <div className="relative">
          <div className="flex border-b border-[#E0EDE7] overflow-x-auto scrollbar-hide">
            {LEISTUNGEN.map((l) => {
              const Icon = l.icon;
              const isActive = selected.id === l.id;
              const isAffiliate = !!l.affiliate;
              return (
                <button
                  type="button"
                  key={l.id}
                  onClick={() => handleSelect(l)}
                  className={`flex items-center gap-1.5 px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium whitespace-nowrap border-b-2 transition-colors flex-shrink-0 ${
                    isActive
                      ? "border-brand text-brand bg-brand-light/40"
                      : "border-transparent text-gray-500 hover:text-brand hover:bg-gray-50"
                  }`}
                >
                  <Icon size={14} className={isActive ? "text-brand" : isAffiliate ? "text-brand/60" : "text-gray-400"} />
                  <span className="hidden sm:inline">{l.label}</span>
                  <span className="sm:hidden">{l.label.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
          {/* Scroll-Fade rechts */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white to-transparent sm:hidden" />
          </div>

          {/* Input Row */}
          <div className="bg-white">
            {selected.affiliate ? (
              /* Affiliate: primärer CTA oben, sekundär unten */
              <div className="flex flex-col sm:flex-row">
                <a
                  href={selected.affiliateExternal!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-brand hover:bg-brand/90 text-white font-bold text-sm px-4 sm:px-6 py-4 flex items-center justify-center gap-1.5 transition-colors"
                >
                  Jetzt kostenlos beantragen <ArrowRight size={16} />
                </a>
                <button
                  type="submit"
                  className="flex-1 text-brand font-bold text-sm px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-center gap-1.5 hover:bg-brand-light/40 transition-colors border-t sm:border-t-0 sm:border-l border-[#E0EDE7]"
                >
                  Zum Vergleich <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              /* PLZ-Suche: vertikal auf Mobile, horizontal auf Desktop */
              <>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-[#E0EDE7] sm:border-b-0 sm:border-r sm:flex-1">
                    <Search size={14} className="text-gray-400 flex-shrink-0" />
                    <input
                      type="text" inputMode="numeric" maxLength={5}
                      placeholder="Deine PLZ"
                      value={plz}
                      onChange={(e) => { setPlz(e.target.value.replace(/\D/g, "")); setPlzError(""); }}
                      className="w-full outline-none text-sm text-gray-800 placeholder-gray-400 bg-transparent"
                    />
                  </div>
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-[#E0EDE7] sm:border-b-0 sm:border-r sm:flex-1">
                    <Phone size={14} className="text-brand flex-shrink-0" />
                    <input
                      type="tel" required placeholder="Telefon"
                      value={tel} onChange={(e) => setTel(e.target.value)}
                      className="w-full outline-none text-sm text-gray-800 placeholder-gray-400 bg-transparent"
                    />
                  </div>
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-[#E0EDE7] sm:border-b-0 sm:border-r sm:flex-1">
                    <Mail size={14} className="text-brand flex-shrink-0" />
                    <input
                      type="email" required placeholder="E-Mail"
                      value={email} onChange={(e) => setEmail(e.target.value)}
                      className="w-full outline-none text-sm text-gray-800 placeholder-gray-400 bg-transparent"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto bg-brand hover:bg-brand/90 disabled:opacity-60 text-white font-bold text-sm px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-center gap-1.5 transition-colors flex-shrink-0"
                  >
                    <span>Jetzt vergleichen</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </>
            )}
          </div>

          {plzError && (
            <p className="text-red-500 text-xs px-5 pb-3">{plzError}</p>
          )}
        </form>

        {/* Trust */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-5">
          {[
            "26.000+ Pflegeeinrichtungen im Vergleich",
            "Kostenlos & unverbindlich",
            "Sofort Ergebnisse",
          ].map((t) => (
            <span key={t} className="flex items-center gap-1.5 text-sm text-gray-500">
              <CheckCircle2 size={14} className="text-brand flex-shrink-0" /> {t}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
