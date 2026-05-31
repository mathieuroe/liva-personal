"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/erste-schritte", label: "Erste Schritte" },
  { href: "/leistungen-check", label: "Leistungen" },
  { href: "/pflegebox", label: "Pflegebox" },
  { href: "/hausnotruf", label: "Hausnotruf" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E0EDE7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl text-brand">
          liva.
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-gray-600 hover:text-brand transition-colors font-medium">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/leistungen-check" className="btn-primary text-sm px-5 py-2.5">
            Kostenlos starten
          </Link>
        </div>

        <button className="md:hidden p-2 text-gray-600" onClick={() => setOpen(!open)} aria-label="Menü">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[#E0EDE7] bg-white px-4 pb-4 pt-2 flex flex-col gap-3">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-gray-700 font-medium py-1" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/leistungen-check" className="btn-primary mt-2 text-center" onClick={() => setOpen(false)}>
            Kostenlos starten
          </Link>
        </div>
      )}
    </header>
  );
}
