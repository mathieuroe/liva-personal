"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem { q: string; a: string; }

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-[#E0EDE7]">
      {items.map((item, i) => (
        <div key={i} className="py-4">
          <button className="w-full flex items-center justify-between text-left gap-4" onClick={() => setOpen(open === i ? null : i)}>
            <span className="font-semibold text-gray-900">{item.q}</span>
            <ChevronDown size={18} className={`text-brand flex-shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
          </button>
          {open === i && <p className="mt-3 text-gray-500 leading-relaxed text-sm">{item.a}</p>}
        </div>
      ))}
    </div>
  );
}
