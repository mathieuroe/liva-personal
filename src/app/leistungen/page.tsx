import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/layout/Footer";
import LeistungsBoxen from "@/components/leistungen/LeistungsBoxen";

export const metadata: Metadata = {
  title: "Pflegeleistungen im Überblick | liva",
  description: "Pflegebox, Hausnotruf, Entlastungsbetrag, Pflegegeld – alle Leistungen erklärt. Was dir mit deinem Pflegegrad zusteht.",
};

const LEISTUNGEN = [
  { id: "pflegebox", icon: "📦", name: "Pflegebox", betrag: "42 € / Monat", pg: "Ab PG 1", featured: true, text: "Jeden Monat eine Kiste mit Pflegehilfsmitteln – Handschuhe, Desinfektionsmittel, Bettschutz. Vollständig von der Pflegekasse bezahlt. Kein Eigenanteil, kein Trick." },
  { id: "hausnotruf", icon: "🔔", name: "Hausnotruf", betrag: "ab 0 € / Monat", pg: "Ab PG 1", featured: true, text: "Ein Knopfdruck – sofort antwortet jemand. Gibt Sicherheit wenn man kurz weg muss. Pflegekasse zahlt 27,00 € / Monat Zuschuss – bei günstigen Anbietern entstehen keine Kosten." },
  { id: "entlastung", icon: "💶", name: "Entlastungsbetrag", betrag: "131 € / Monat", pg: "Ab PG 1", featured: false, text: "Für Alltagsbegleitung, Haushaltshilfe, Betreuung. Nicht ausgegebene Beträge können 1 Quartal mitgenommen werden – insgesamt bis zu 1.572 € / Jahr." },
  { id: "pflegegeld", icon: "👐", name: "Pflegegeld", betrag: "332–946 € / Monat", pg: "Ab PG 2", featured: false, text: "Wird direkt ausgezahlt wenn Angehörige oder Freunde die Pflege übernehmen. Kein Antrag auf einzelne Leistungen nötig – einfach Pflegegeld beantragen." },
  { id: "sachleistung", icon: "🏥", name: "Pflegesachleistungen", betrag: "bis 2.095 € / Monat", pg: "Ab PG 2", featured: false, text: "Für professionelle Pflege durch einen ambulanten Pflegedienst. Pflegekasse zahlt direkt an den Dienst." },
  { id: "kurzzeitpflege", icon: "🛏️", name: "Kurzzeitpflege", betrag: "bis 1.774 € / Jahr", pg: "Ab PG 2", featured: false, text: "Wenn die Hauptpflegeperson ausfällt oder für kurze Zeit ins Heim muss. Flexibel und oft kombinierbar mit Verhinderungspflege." },
  { id: "tagespflege", icon: "☀️", name: "Tagespflege", betrag: "bis 1.612 € / Monat", pg: "Ab PG 2", featured: false, text: "Betreuung in einer Tageseinrichtung – zusätzlich zu ambulanten Leistungen." },
  { id: "verhinderung", icon: "🌴", name: "Verhinderungspflege", betrag: "bis 1.612 € / Jahr", pg: "Ab PG 2", featured: false, text: "Wenn die pflegende Person Urlaub oder eine Auszeit braucht. Die Pflegekasse zahlt für eine Vertretung." },
  { id: "wohnraum", icon: "🔨", name: "Wohnraumanpassung", betrag: "bis 4.180 € / Maßnahme", pg: "Ab PG 1", featured: false, text: "Zuschuss für barrierefreie Umbauten – Haltegriffe, Duschumbau, Türverbreiterung. Antrag VOR Durchführung stellen." },
];

export default function LeistungenPage() {
  const rest = LEISTUNGEN.filter((l) => !l.featured);

  return (
    <main>
      <section className="bg-white py-16 px-4 sm:px-6 border-b border-[#E0EDE7]">
        <div className="max-w-6xl mx-auto">
          <p className="section-label">Leistungen</p>
          <h1 className="font-serif text-5xl text-gray-900 mb-4">Was dir zusteht</h1>
          <p className="text-gray-500 text-lg max-w-xl">
            Alle Leistungen der Pflegeversicherung – erklärt ohne Bürokratie-Deutsch. Die meisten werden nie voll ausgeschöpft.
          </p>
        </div>
      </section>

      {/* FEATURED – Pflegebox + Hausnotruf */}
      <section className="py-12 px-4 sm:px-6 bg-brand-light/30">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-semibold text-brand mb-6">Die zwei wichtigsten Sofort-Leistungen</p>
          <LeistungsBoxen />
        </div>
      </section>

      {/* ALLE WEITEREN LEISTUNGEN */}
      <section className="py-12 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-semibold text-gray-500 mb-6">Alle weiteren Leistungen</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((l) => (
              <div key={l.id} id={l.id} className="card p-5 hover:shadow-card-hover transition-shadow">
                <div className="text-2xl mb-3">{l.icon}</div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm">{l.name}</h3>
                  <span className="text-xs bg-brand-light text-brand px-2 py-0.5 rounded-full font-semibold flex-shrink-0">{l.pg}</span>
                </div>
                <p className="text-brand font-bold text-sm mb-2">{l.betrag}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{l.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-brand-hover">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl text-white mb-4">Welche Leistungen stehen dir konkret zu?</h2>
          <p className="text-white/70 mb-8">Wähle deinen Pflegegrad – wir zeigen dir genau was du beantragen kannst.</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-white text-brand font-semibold px-8 py-4 rounded-full hover:bg-gray-50 transition-colors">
            Jetzt prüfen <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
