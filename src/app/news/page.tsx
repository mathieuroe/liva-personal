import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import Footer from "@/components/layout/Footer";
import { NEWS } from "@/lib/content-data";

export const metadata: Metadata = {
  title: "News aus der Pflege | liva",
  description: "Aktuelle Nachrichten zu Pflegepolitik, Pflegeversicherung und Leistungsänderungen.",
};

export default function NewsPage() {
  return (
    <main>
      <section className="bg-white py-16 px-4 sm:px-6 border-b border-[#E0EDE7]">
        <div className="max-w-6xl mx-auto">
          <p className="section-label">News</p>
          <h1 className="font-serif text-5xl text-gray-900 mb-4">News aus der Pflege</h1>
          <p className="text-gray-500 text-lg max-w-xl">Aktuelle Entwicklungen in der Pflegepolitik und was sie für dich bedeuten.</p>
        </div>
      </section>

      <section className="py-14 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-5">
          {NEWS.map((a) => (
            <Link key={a.slug} href={`/news/${a.slug}`} className="card bg-white p-6 flex flex-col group hover:shadow-card-hover transition-shadow">
              <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-3 py-1 rounded-full self-start mb-4">{a.kategorie}</span>
              <h2 className="font-semibold text-gray-900 leading-snug mb-2 group-hover:text-brand transition-colors">{a.titel}</h2>
              <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">{a.beschreibung}</p>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="flex items-center gap-1.5"><Clock size={12} />{a.lesezeit}</span>
                <span>{a.datum}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-14 px-4 sm:px-6 bg-brand-darker">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl text-white mb-4">Was steht dir konkret zu?</h2>
          <p className="text-white/70 mb-8">Starte den Check – in 2 Minuten weißt du was du beantragen kannst.</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-white text-brand font-semibold px-8 py-4 rounded-full hover:bg-gray-50 transition-colors">
            Jetzt starten <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
