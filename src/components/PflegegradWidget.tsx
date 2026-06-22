"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const options = [
  { label: "Kein PG", value: 0, count: 0 },
  { label: "PG 1", value: 1, count: 8 },
  { label: "PG 2", value: 2, count: 13 },
  { label: "PG 3", value: 3, count: 15 },
  { label: "PG 4", value: 4, count: 17 },
  { label: "PG 5", value: 5, count: 20 },
];

export default function PflegegradWidget() {
  const [selected, setSelected] = useState<number | null>(null);
  const current = options.find((o) => o.value === selected);

  return (
    <div className="bg-white rounded-[16px] border border-[#E0EDE7] shadow-card p-6 w-full max-w-sm mx-auto">
      <p className="text-xs font-semibold text-brand uppercase tracking-wider mb-1">Schnellcheck</p>
      <h3 className="font-serif text-xl text-gray-900 mb-4">Was steht mir zu?</h3>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {options.map((o) => (
          <button
            key={o.value}
            onClick={() => setSelected(o.value)}
            className={`rounded-full py-2 text-sm font-semibold border transition-all ${
              selected === o.value
                ? "bg-brand text-white border-brand"
                : "bg-white text-gray-700 border-[#E0EDE7] hover:border-brand hover:text-brand"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>

      {selected !== null && current && (
        <div className={`rounded-xl p-4 mb-4 ${current.count > 0 ? "bg-brand-light" : "bg-gray-50"}`}>
          {current.count > 0 ? (
            <>
              <p className="text-brand font-bold text-2xl">{current.count} Leistungen</p>
              <p className="text-brand/80 text-sm mt-0.5">stehen dir zu mit {current.label}</p>
            </>
          ) : (
            <>
              <p className="text-gray-700 font-semibold">Noch kein Pflegegrad?</p>
              <p className="text-gray-500 text-sm mt-0.5">Wir helfen dir, einen zu beantragen.</p>
            </>
          )}
        </div>
      )}

      <Link
        href={selected !== null ? `/leistungen-check?pg=${selected}` : "/leistungen-check"}
        className="btn-primary w-full justify-center"
      >
        Jetzt alle anzeigen <ArrowRight size={16} />
      </Link>

      <div className="mt-4 flex gap-2 flex-wrap">
        <span className="text-xs bg-brand-light text-brand font-medium px-3 py-1.5 rounded-full">Pflegebox kostenlos</span>
        <span className="text-xs bg-brand-light text-brand font-medium px-3 py-1.5 rounded-full">Hausnotruf ab 0€</span>
      </div>
    </div>
  );
}
