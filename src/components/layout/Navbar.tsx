"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

const links = [
  { href: "/erste-schritte", label: "Checkliste" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/ratgeber", label: "Ratgeber" },
  { href: "/news", label: "News aus der Pflege" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-[#E0EDE7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-[1.6rem] text-brand leading-none">
          liva.
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-gray-600 hover:text-brand transition-colors font-medium">
              {l.label}
            </Link>
          ))}
        </nav>

        <a href="#funnel" className="hidden md:inline-flex btn-primary text-sm px-5 py-2.5">
          Kostenlos starten <ArrowRight size={15} />
        </a>

        <button className="md:hidden p-2 text-gray-600 rounded-lg hover:bg-gray-100" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[#E0EDE7] bg-white px-4 pb-5 pt-3 flex flex-col gap-2">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-gray-700 font-medium py-2 border-b border-gray-50" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <a href="#funnel" className="btn-primary mt-3 text-center justify-center" onClick={() => setOpen(false)}>
            Kostenlos starten <ArrowRight size={15} />
          </a>
        </div>
      )}
    </header>
  );
}
