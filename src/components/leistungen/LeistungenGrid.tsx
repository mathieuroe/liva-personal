"use client";

import { useState } from "react";
import { ArrowUpRight, ArrowRight, Users } from "lucide-react";
import dynamic from "next/dynamic";

const LeistungsLeadModal = dynamic(() => import("./LeistungsLeadModal"), { ssr: false });

const DEEPLINKS: Record<string, { href: string; label: string }> = {
  "pflegebox-karte": {
    href: "https://t.adcell.com/p/click?promoId=273407&slotId=149760&subId=leistungen_box&param0=https%3A%2F%2Fpflegehase.de%2Fpflegehilfsmittel-bestellung%2F",
    label: "Pflegebox kostenlos bestellen",
  },
  "hausnotruf-karte": {
    href: "https://t.adcell.com/p/click?promoId=307657&slotId=149760&subId=leistungen_hausnotruf&param0=https%3A%2F%2Fpflegehase.de%2Fhausnotruf-bestellung%2F",
    label: "Hausnotruf kostenlos bestellen",
  },
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
    id: "tagespflege",
    name: "Tagespflege",
    betrag: "bis 1.995 € / Monat",
    pg: "Ab PG 2",
    text: "Tagesbetreuung in einer Pflegeeinrichtung – tagsüber betreut, abends wieder zuhause. Wird zusätzlich zu ambulanten Leistungen und Pflegegeld gewährt und kürzt diese nicht. PG 2: bis 689 €, PG 3: bis 1.298 €, PG 4: bis 1.612 €, PG 5: bis 1.995 € monatlich.",
    beantragen: "Tagespflegeeinrichtung in der Nähe finden, Platz anfragen – die Einrichtung rechnet direkt mit der Pflegekasse ab.",
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
    id: "pflegegeld",
    name: "Pflegegeld",
    betrag: "332 – 946 € / Monat",
    pg: "Ab PG 2",
    highlight: true,
    text: "Direktzahlung an dich, wenn Angehörige oder nahestehende Personen die Pflege übernehmen. Kein Nachweis einzelner Leistungen nötig – einfach bei der Pflegekasse beantragen. PG 2: 332 €, PG 3: 572 €, PG 4: 764 €, PG 5: 946 € pro Monat.",
    beantragen: "Formloser Antrag bei der Pflegekasse – schriftlich, telefonisch oder online über das Kassenportal.",
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
    beantragen: "Unser Partner Pflegehase stellt für dich den Antrag bei der Pflegekasse und liefert kostenfrei monatlich zu dir nachhause.",
  },
  {
    id: "hausnotruf-karte",
    name: "Hausnotruf",
    betrag: "27 € / Monat",
    pg: "Ab PG 1",
    text: "Kleine Basisstation mit Notrufknopf als Armband oder Halskette – ein Druck genügt, sofort antwortet jemand. Die Pflegekasse zahlt 27 € monatlich und einmalig bis zu 10,49 € für die Einrichtung. Bei günstigen Anbietern entstehen keine Kosten.",
    beantragen: "Unser Partner Pflegehase stellt für dich den Antrag bei der Pflegekasse und liefert dir deinen Hausnotruf – Genehmigung in ca. 3–5 Werktagen.",
  },
];

export default function LeistungenGrid() {
  const [activeLeistung, setActiveLeistung] = useState<string | null>(null);

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {LEISTUNGEN.map((l) => (
          <div
            key={l.id}
            id={l.id}
            className={`card p-5 hover:shadow-card-hover transition-shadow flex flex-col ${l.highlight ? "border-brand/30 border-2" : ""}`}
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
            <div className="flex items-start gap-1.5 bg-brand-light/60 rounded-lg px-3 py-2 mb-4">
              <ArrowUpRight size={12} className="text-brand flex-shrink-0 mt-0.5" />
              <p className="text-xs text-brand leading-relaxed">{l.beantragen}</p>
            </div>

            {/* Lead CTA */}
            <div className="mt-auto space-y-2">
              {!DEEPLINKS[l.id] && (
                <button
                  onClick={() => setActiveLeistung(l.name)}
                  className="w-full flex items-center justify-center gap-2 bg-brand text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-brand-hover transition-colors"
                >
                  <Users size={13} />
                  Passenden Anbieter finden
                </button>
              )}
              {DEEPLINKS[l.id] && (
                <a
                  href={DEEPLINKS[l.id].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-brand text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-brand-hover transition-colors"
                >
                  {DEEPLINKS[l.id].label} <ArrowRight size={13} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {activeLeistung && (
        <LeistungsLeadModal
          leistung={activeLeistung}
          onClose={() => setActiveLeistung(null)}
        />
      )}
    </>
  );
}
