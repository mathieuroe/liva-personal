import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand text-white mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div>
            <span className="font-serif text-2xl text-white">liva.</span>
            <p className="mt-2 text-white/70 text-sm max-w-xs leading-relaxed">
              Orientierung im Pflegesystem – kostenlos, verständlich, bundesweit.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm text-white/70">
            <div className="flex flex-col gap-2.5">
              <p className="text-white/40 text-xs uppercase tracking-wider font-semibold mb-1">Navigation</p>
              <Link href="/erste-schritte" className="hover:text-white transition-colors">Erste Schritte</Link>
              <Link href="/leistungen" className="hover:text-white transition-colors">Leistungen</Link>
              <Link href="/ratgeber" className="hover:text-white transition-colors">Ratgeber</Link>
              <Link href="/news" className="hover:text-white transition-colors">News</Link>
            </div>
            <div className="flex flex-col gap-2.5">
              <p className="text-white/40 text-xs uppercase tracking-wider font-semibold mb-1">Leistungen</p>
              <Link href="/leistungen#pflegebox" className="hover:text-white transition-colors">Pflegebox</Link>
              <Link href="/leistungen#hausnotruf" className="hover:text-white transition-colors">Hausnotruf</Link>
              <Link href="/leistungen#entlastung" className="hover:text-white transition-colors">Entlastungsbetrag</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 mt-10 pt-6 text-xs text-white/50">
          © 2026 liva. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
}
