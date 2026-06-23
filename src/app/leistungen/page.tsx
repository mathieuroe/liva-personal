import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Footer from "@/components/layout/Footer";
import LeistungsBoxen from "@/components/leistungen/LeistungsBoxen";

export const metadata: Metadata = {
  title: "Pflegeleistungen 2026 – Was dir mit deinem Pflegegrad zusteht | liva",
  description:
    "Alle Leistungen der Pflegeversicherung 2026 im Überblick: Pflegebox, Hausnotruf, Pflegegeld, Entlastungsbetrag, Verhinderungspflege & mehr – verständlich erklärt. Kostenlos prüfen.",
  alternates: {
    canonical: "https://liva-pflege.de/leistungen",
  },
};

const schemaItemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Pflegeleistungen 2026 – Übersicht",
  description: "Alle Leistungen der gesetzlichen Pflegeversicherung in Deutschland (Stand Juni 2026)",
  numberOfItems: 7,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Entlastungsbetrag", description: "131 € pro Monat für Alltagsbegleitung und Haushaltshilfe – ab Pflegegrad 1." },
    { "@type": "ListItem", position: 2, name: "Pflegegeld", description: "332–946 € pro Monat wenn Angehörige die Pflege übernehmen – ab Pflegegrad 2." },
    { "@type": "ListItem", position: 3, name: "Pflegesachleistungen", description: "Bis 2.095 € pro Monat für ambulante Pflegedienste – ab Pflegegrad 2." },
    { "@type": "ListItem", position: 4, name: "Kombiniertes Budget Kurzzeit- und Verhinderungspflege", description: "Bis 3.539 € pro Jahr für Ersatzpflege und Kurzzeitaufenthalte – ab Pflegegrad 2 (seit 01.07.2025)." },
    { "@type": "ListItem", position: 5, name: "Tagespflege", description: "Bis 1.995 € pro Monat für Betreuung in einer Tageseinrichtung – ab Pflegegrad 2." },
    { "@type": "ListItem", position: 6, name: "Wohnraumanpassung", description: "Bis 4.180 € je Umbaumaßnahme für barrierefreie Umbauten – ab Pflegegrad 1." },
    { "@type": "ListItem", position: 7, name: "Pflegehilfsmittelbox", description: "Bis 42 € pro Monat für Verbrauchsmittel wie Handschuhe und Desinfektion – ab Pflegegrad 1." },
  ],
};

const LEISTUNGEN = [
  {
    id: "entlastung",
    name: "Entlastungsbetrag",
    betrag: "131 € / Monat",
    pg: "Ab PG 1",
    text: "Monatlich 131 € für qualifizierte Unterstützung im Alltag – Alltagsbegleitung, Haushaltshilfe, Fahrdienste oder Betreuungsgruppen. Nicht genutzte Beträge können quartalsweise mitgenommen werden, insgesamt bis zu 1.572 € im Jahr. Der Anbieter muss nach Landesrecht anerkannt sein.",
    beantragen: "Anerkannten Anbieter kontaktieren, Leistungen in Anspruch nehmen, Rechnung bei der Pflegekasse einreichen.",
  },
  {
    id: "pflegegeld",
    name: "Pflegegeld",
    betrag: "332 – 946 € / Monat",
    pg: "Ab PG 2",
    highlight: true,
    text: "Direktzahlung an dich, wenn Angehörige oder nahestehende Personen die Pflege übernehmen. Kein Nachweis einzelner Leistungen nötig – einfach bei der Pflegekasse beantragen. PG 2: 332 €, PG 3: 572 €, PG 4: 764 €, PG 5: 946 € pro Monat.",
    beantragen: "Formloser Antrag bei der Pflegekasse – schriftlich, telefonisch oder online über das Kassenportal.",
  },
  {
    id: "sachleistung",
    name: "Pflegesachleistungen",
    betrag: "bis 2.095 € / Monat",
    pg: "Ab PG 2",
    text: "Für professionelle Pflege durch einen ambulanten Pflegedienst. Die Pflegekasse zahlt direkt an den Dienst – du wählst den Anbieter. PG 2: bis 761 €, PG 3: bis 1.363 €, PG 4: bis 1.693 €, PG 5: bis 2.095 € monatlich.",
    beantragen: "Ambulanten Pflegedienst wählen, Pflegevertrag abschließen – der Dienst rechnet direkt mit der Pflegekasse ab.",
  },
  {
    id: "verhinderung",
    name: "Verhinderungs- & Kurzzeitpflege",
    betrag: "bis 3.539 € / Jahr",
    pg: "Ab PG 2",
    highlight: true,
    text: "Seit 01.07.2025 gibt es ein gemeinsames Budget aus Verhinderungs- und Kurzzeitpflege: bis zu 3.539 € pro Jahr. Verhinderungspflege greift wenn die Hauptpflegeperson Urlaub oder eine Auszeit braucht, Kurzzeitpflege für vorübergehende stationäre Aufenthalte. Beides flexibel kombinierbar.",
    beantragen: "Vertretung oder Einrichtung organisieren, Antrag mit Nachweis bei der Pflegekasse einreichen – Erstattung in 2–4 Wochen.",
  },
  {
    id: "tagespflege",
    name: "Tagespflege",
    betrag: "bis 1.995 € / Monat",
    pg: "Ab PG 2",
    text: "Tagesbetreuung in einer Pflegeeinrichtung – tagsüber betreut, abends wieder zuhause. Wird zusätzlich zu ambulanten Leistungen und Pflegegeld gewährt und kürzt diese nicht. PG 2: bis 689 €, PG 3: bis 1.298 €, PG 4: bis 1.612 €, PG 5: bis 1.995 € monatlich.",
    beantragen: "Tagespflegeeinrichtung in der Nähe finden, Platz anfragen – die Einrichtung rechnet direkt mit der Pflegekasse ab.",
  },
  {
    id: "wohnraum",
    name: "Wohnraumanpassung",
    betrag: "bis 4.180 € / Maßnahme",
    pg: "Ab PG 1",
    text: "Zuschuss für barrierefreie Umbauten: Haltegriffe, Duschumbau, Türverbreiterung, Treppenlifte. Bis zu 4.180 € je Maßnahme, mehrere Maßnahmen möglich. Wichtig: Antrag muss vor Beginn der Umbaumaßnahme gestellt werden.",
    beantragen: "Antrag bei der Pflegekasse stellen, Kostenvoranschlag beifügen – erst nach Genehmigung mit dem Umbau beginnen.",
  },
  {
    id: "pflegebox-karte",
    name: "Pflegehilfsmittelbox",
    betrag: "bis 42 € / Monat",
    pg: "Ab PG 1",
    text: "Monatlich bis zu 42 € für Pflegeverbrauchsmittel – Einmalhandschuhe, Desinfektionsmittel, Bettschutzeinlagen, Mundschutz. Die Pflegekasse erstattet direkt an den Anbieter, für dich entstehen keine Kosten. Beantragung dauert unter 5 Minuten.",
    beantragen: "Pflegehilfsmittel-Anbieter kontaktieren – dieser stellt den Antrag bei der Pflegekasse und liefert monatlich.",
  },
  {
    id: "hausnotruf-karte",
    name: "Hausnotruf",
    betrag: "27,00 € / Monat + einmalig bis 10,49 €",
    pg: "Ab PG 1",
    text: "Kleine Basisstation mit Notrufknopf als Armband oder Halskette – ein Druck genügt, sofort antwortet jemand. Die Pflegekasse zahlt 27,00 € monatlich und einmalig bis zu 10,49 € für die Einrichtung. Bei günstigen Anbietern entstehen keine Kosten.",
    beantragen: "Hausnotruf-Anbieter wählen, Antrag bei der Pflegekasse stellen – Genehmigung in ca. 3–5 Werktagen.",
  },
];

export default function LeistungenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaItemList) }}
      />
      <main>

        {/* ── Hero ────────────────────────────────────────────────── */}
        <section className="bg-white py-16 px-4 sm:px-6 border-b border-[#E0EDE7]">
          <div className="max-w-6xl mx-auto">
            <p className="section-label">Pflegeleistungen 2026</p>
            <h1 className="font-serif text-5xl text-gray-900 mb-4 leading-tight">
              Was dir mit deinem<br className="hidden sm:block" /> Pflegegrad zusteht
            </h1>
            <p className="text-gray-500 text-lg max-w-xl leading-relaxed mb-8">
              Die Pflegeversicherung zahlt mehr als die meisten wissen – viele Leistungen werden nie beantragt. Hier ist alles erklärt, ohne Bürokratie-Deutsch.
            </p>
            <Link href="/pflegegrad-rechner" className="btn-secondary inline-flex text-sm px-5 py-2.5">
              Pflegegrad noch unklar? Jetzt kostenlos ermitteln <ArrowRight size={15} />
            </Link>
          </div>
        </section>

        {/* ── Sofort-Leistungen (fix, unverändert) ───────────────── */}
        <section className="py-12 px-4 sm:px-6 bg-brand-light/30">
          <div className="max-w-6xl mx-auto">
            <p className="text-sm font-semibold text-brand mb-2">Sofort beantragen – noch heute</p>
            <p className="text-xs text-gray-500 mb-6">Beide Leistungen gelten ab Pflegegrad 1 und sind in wenigen Minuten beantragt.</p>
            <LeistungsBoxen />
          </div>
        </section>

        {/* ── Alle weiteren Leistungen ────────────────────────────── */}
        <section className="py-12 px-4 sm:px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <p className="text-sm font-semibold text-gray-900 mb-1">Weitere Leistungen der Pflegekasse</p>
            <p className="text-xs text-gray-500 mb-6">Je nach Pflegegrad – viele davon werden nie beantragt, obwohl Anspruch besteht.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {LEISTUNGEN.map((l) => (
                <div
                  key={l.id}
                  id={l.id}
                  className={`card p-5 hover:shadow-card-hover transition-shadow ${l.highlight ? "border-brand/30 border-2" : ""}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs bg-brand-light text-brand px-2 py-0.5 rounded-full font-semibold">{l.pg}</span>
                    {l.highlight && (
                      <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-semibold">Häufig vergessen</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{l.name}</h3>
                  <p className="text-brand font-bold text-base mb-2">{l.betrag}</p>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3">{l.text}</p>
                  <div className="flex items-start gap-1.5 bg-brand-light/60 rounded-lg px-3 py-2">
                    <ArrowUpRight size={12} className="text-brand flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-brand leading-relaxed">{l.beantragen}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Mid-Page CTA (Pflegegrad-Rechner) ──────────────────── */}
        <section className="py-10 px-4 sm:px-6 bg-brand-light/40 border-y border-[#E0EDE7]">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm font-semibold text-brand mb-2">Du kennst deinen Pflegegrad noch nicht?</p>
            <h2 className="font-serif text-2xl text-gray-900 mb-3">In 5 Minuten weißt du, welche Leistungen dir zustehen.</h2>
            <Link href="/pflegegrad-rechner" className="btn-primary inline-flex text-sm px-6 py-3">
              Kostenlos Pflegegrad ermitteln <ArrowRight size={15} />
            </Link>
            <p className="text-xs text-gray-400 mt-3">Anonym · Kein Login · Basiert auf dem MDK-Verfahren</p>
          </div>
        </section>

        {/* ── Bottom CTA ──────────────────────────────────────────── */}
        <section className="py-16 px-4 sm:px-6 bg-brand-hover">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-4xl text-white mb-4">Welche Leistungen stehen dir konkret zu?</h2>
            <p className="text-white/70 mb-8 leading-relaxed">
              Starte mit dem Pflegegrad-Rechner – du siehst sofort dein Ergebnis und welche Beträge du beantragen kannst.
            </p>
            <Link href="/pflegegrad-rechner" className="inline-flex items-center gap-2 bg-white text-brand font-semibold px-8 py-4 rounded-full hover:bg-gray-50 transition-colors">
              Pflegegrad & Leistungen prüfen <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
