import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ARTICLES } from "@/lib/ratgeber-data";

export const metadata: Metadata = {
  title: "Ratgeber – Pflege einfach erklärt | liva",
  description: "Verständliche Guides rund um Pflegegrad, Pflegebox, Entlastungsbetrag und mehr – kostenlos von liva.",
};

export default function RatgeberPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-white py-16 px-4 sm:px-6 border-b border-[#E0EDE7]">
          <div className="max-w-6xl mx-auto">
            <p className="text-brand text-sm font-semibold uppercase tracking-wider mb-2">Ratgeber</p>
            <h1 className="font-serif text-5xl text-gray-900 mb-4">Pflege einfach erklärt.</h1>
            <p className="text-gray-500 text-lg max-w-xl">
              Alle wichtigen Themen rund um Pflegegrad, Leistungen und den Alltag mit Pflege – verständlich, aktuell und kostenlos.
            </p>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ARTICLES.map((article) => (
              <Link key={article.slug} href={`/ratgeber/${article.slug}`} className="card bg-white p-6 flex flex-col hover:shadow-card-hover transition-shadow group">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-semibold bg-brand-light text-brand px-3 py-1 rounded-full">{article.kategorie}</span>
                </div>
                <h2 className="font-semibold text-gray-900 text-lg leading-snug mb-2 group-hover:text-brand transition-colors">{article.titel}</h2>
                <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">{article.beschreibung}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-1.5"><Clock size={12} />{article.lesezeit}</div>
                  <span>{article.datum}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 bg-[#167A5A]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-4xl text-white mb-4">Noch Fragen?</h2>
            <p className="text-white/70 mb-8">Prüfe jetzt kostenlos, welche Leistungen dir zustehen.</p>
            <Link href="/leistungen-check" className="inline-flex items-center gap-2 bg-white text-brand font-semibold px-8 py-4 rounded-full hover:bg-gray-50 transition-colors">
              Leistungen prüfen <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
