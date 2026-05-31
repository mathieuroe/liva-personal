import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          <div>
            <span className="font-serif text-2xl text-brand">liva.</span>
            <p className="mt-2 text-gray-400 text-sm max-w-xs leading-relaxed">
              Orientierung im Pflegesystem – kostenlos, verständlich, bundesweit.
            </p>
          </div>
          <div className="flex gap-8 text-sm text-gray-400">
            <div className="flex flex-col gap-2">
              <Link href="/leistungen-check" className="hover:text-white transition-colors">Leistungen prüfen</Link>
              <Link href="/pflegebox" className="hover:text-white transition-colors">Pflegebox</Link>
              <Link href="/hausnotruf" className="hover:text-white transition-colors">Hausnotruf</Link>
              <Link href="/ratgeber" className="hover:text-white transition-colors">Ratgeber</Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/erste-schritte" className="hover:text-white transition-colors">Erste Schritte</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-10 pt-6 text-xs text-gray-500">
          © 2026 liva. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
}
