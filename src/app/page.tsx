import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Play } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PflegegradWidget from "@/components/PflegegradWidget";
import FaqAccordion from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "liva – Dein erster Tag mit Pflegegrad",
  description: "Du weißt nicht wo anfangen? Wir zeigen dir Schritt für Schritt was du beantragen musst, was dir zusteht und wie alles funktioniert.",
};

const trustItems = [
  { value: "1.200+", label: "Familien begleitet" },
  { value: "100%", label: "kostenlos" },
  { value: "5 Min.", label: "bis zum Ergebnis" },
  { value: "Bundesweit", label: "verfügbar" },
];

const ersteSchritte = [
  { nr: "01", title: "Pflegegrad beantragen", text: "Wir erklären dir wie du den Pflegegrad-Antrag stellst, was du brauchst und wie lange es dauert.", tag: "Kostenlos" },
  { nr: "02", title: "Kostenlose Leistungen sichern", text: "Pflegebox, Hausnotruf, Entlastungsbetrag – viele Leistungen werden nie abgerufen. Wir zeigen dir was dir zusteht.", tag: "Bis 400€/Monat" },
  { nr: "03", title: "Alltag organisieren", text: "Von der Haushaltshilfe bis zur Verhinderungspflege – gemeinsam finden wir die richtige Unterstützung.", tag: "Persönlich" },
];

const leistungen = [
  { icon: "📦", name: "Pflegebox", betrag: "42 € / Monat", text: "Pflegehilfsmittel wie Handschuhe, Einlagen und Desinfektionsmittel – vollständig kostenlos." },
  { icon: "🔔", name: "Hausnotruf", betrag: "ab 0 € / Monat", text: "Monatlicher Zuschuss von 25,50 € von der Pflegekasse – du zahlst oft nichts." },
  { icon: "💶", name: "Entlastungsbetrag", betrag: "131 € / Monat", text: "Für Alltagsbegleitung, Betreuung und Haushaltshilfe – ab Pflegegrad 1." },
  { icon: "🏠", name: "Haushaltshilfe", betrag: "bis 131 € / Monat", text: "Einkaufen, Putzen, Kochen – aus dem Entlastungsbetrag finanzierbar." },
  { icon: "🌴", name: "Verhinderungspflege", betrag: "1.612 € / Jahr", text: "Auszeit für pflegende Angehörige – die Pflege wird übernommen." },
  { icon: "🔨", name: "Wohnraumanpassung", betrag: "bis 4.000 € Zuschuss", text: "Haltegriffe, Duschumbau, Türverbreiterung – Zuschuss bis 4.180 € je Maßnahme." },
];

const faqs = [
  { q: "Was kostet eure Beratung?", a: "Absolut nichts. liva ist für alle Nutzer komplett kostenlos. Wir finanzieren uns durch Partnerschaften mit geprüften Pflegedienstleistern." },
  { q: "Was ist die Pflegebox genau?", a: "Die Pflegebox ist ein monatliches Paket mit Pflegehilfsmitteln wie Einmalhandschuhe, Bettschutzeinlagen oder Desinfektionsmittel. Die Pflegekasse erstattet bis zu 42 € pro Monat – für alle Pflegegrade ab PG 1." },
  { q: "Wir haben noch keinen Pflegegrad?", a: "Kein Problem. Wir erklären dir Schritt für Schritt wie du den Pflegegrad-Antrag stellst. Du brauchst nur wenige Unterlagen und etwa 15 Minuten Zeit." },
  { q: "Wie schnell bekomme ich Ergebnisse?", a: "Sofort. Nach 2–3 Klicks siehst du alle Leistungen die dir mit deinem Pflegegrad zustehen – inklusive Beträge und Antragsinfos." },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="bg-white pt-16 pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-brand-light text-brand text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
              Für Menschen die neu in der Pflege sind
            </span>
            <h1 className="font-serif text-5xl leading-[1.15] text-gray-900 mb-5">
              Dein erster Tag mit Pflegegrad – wir begleiten dich.
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-md">
              Du weißt nicht wo anfangen? Wir zeigen dir Schritt für Schritt was du beantragen
              musst, was dir zusteht und wie alles funktioniert.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/leistungen-check" className="btn-primary px-7 py-3.5 text-base">
                Jetzt kostenlos starten <ArrowRight size={18} />
              </Link>
              <Link href="#leistungen" className="btn-secondary px-7 py-3.5 text-base">
                Mehr erfahren
              </Link>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <PflegegradWidget />
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-[#E0EDE7] bg-[#E1F5EE]/40 py-6 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustItems.map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-2xl font-bold text-brand">{item.value}</p>
              <p className="text-sm text-gray-500 mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ERSTE SCHRITTE */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-brand text-sm font-semibold uppercase tracking-wider mb-2">Wie es funktioniert</p>
          <h2 className="font-serif text-4xl text-gray-900 mb-12">In 3 Schritten zur Klarheit</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {ersteSchritte.map((s) => (
              <div key={s.nr} className="card p-6">
                <span className="text-5xl font-serif text-[#E0EDE7] font-bold leading-none">{s.nr}</span>
                <h3 className="font-semibold text-lg text-gray-900 mt-3 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.text}</p>
                <span className="text-xs bg-brand-light text-brand font-medium px-3 py-1 rounded-full">{s.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-video bg-gray-200 rounded-[16px] overflow-hidden shadow-card cursor-pointer group">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-brand/90 flex items-center justify-center group-hover:bg-brand transition-colors shadow-lg">
                <Play size={24} className="text-white ml-1" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 bg-white/90 text-xs font-medium text-gray-700 px-3 py-1.5 rounded-full">
              Isabells Geschichte – 2:34
            </div>
          </div>
          <div>
            <p className="text-brand text-sm font-semibold uppercase tracking-wider mb-2">Echte Geschichte</p>
            <h2 className="font-serif text-4xl text-gray-900 mb-4">Wie Isabell in 10 Minuten Klarheit bekam</h2>
            <p className="text-gray-500 leading-relaxed">
              Isabells Vater hat gerade PG 1 bekommen. Sie war komplett überfordert – bis sie liva
              gefunden hat. Jetzt bekommt ihre Familie monatlich über 200 € an Leistungen, die sie
              vorher nicht kannte.
            </p>
            <Link href="/leistungen-check" className="btn-primary mt-6 inline-flex">
              Eigene Leistungen prüfen <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* LEISTUNGEN */}
      <section id="leistungen" className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-brand text-sm font-semibold uppercase tracking-wider mb-2">Was dir zusteht</p>
          <h2 className="font-serif text-4xl text-gray-900 mb-12">Die wichtigsten Leistungen</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {leistungen.map((l) => (
              <div key={l.name} className="card p-6 hover:shadow-card-hover transition-shadow">
                <div className="text-3xl mb-3">{l.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{l.name}</h3>
                <p className="text-brand font-bold text-lg mb-2">{l.betrag}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{l.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/leistungen-check" className="btn-primary px-8 py-3.5 text-base">
              Alle Leistungen für meinen Pflegegrad <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ÜBER UNS */}
      <section className="py-20 px-4 sm:px-6 bg-[#E1F5EE]/30">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-brand text-sm font-semibold uppercase tracking-wider mb-2">Wer wir sind</p>
            <h2 className="font-serif text-4xl text-gray-900 mb-4">Kein Konzern. Echte Menschen.</h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              Wir haben liva gegründet, weil wir selbst erlebt haben wie überwältigend das
              Pflegesystem sein kann. Unser Ziel: Jede Familie soll die Leistungen bekommen, die
              ihr zustehen – ohne Bürokratie-Frust.
            </p>
            {["Unabhängige, neutrale Beratung", "Keine versteckten Kosten, kein Upselling", "Immer auf dem aktuellen Stand der Gesetzgebung"].map((t) => (
              <div key={t} className="flex items-center gap-3 mt-2">
                <CheckCircle2 size={18} className="text-brand flex-shrink-0" />
                <span className="text-sm text-gray-600">{t}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[{ v: "1.200+", l: "Familien begleitet" }, { v: "100%", l: "kostenlos" }, { v: "4,9/5", l: "Kundenbewertung" }].map((s) => (
              <div key={s.l} className="card p-5 text-center">
                <p className="text-3xl font-bold text-brand">{s.v}</p>
                <p className="text-xs text-gray-500 mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand text-sm font-semibold uppercase tracking-wider mb-2">Häufige Fragen</p>
          <h2 className="font-serif text-4xl text-gray-900 mb-10">Das fragen uns die meisten</h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 bg-[#167A5A]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl text-white mb-4">Bereit loszulegen?</h2>
          <p className="text-white/70 mb-8 text-lg">
            Finde in 5 Minuten heraus, welche Leistungen dir zustehen – kostenlos und unverbindlich.
          </p>
          <Link href="/leistungen-check" className="inline-flex items-center gap-2 bg-white text-brand font-semibold px-8 py-4 rounded-full hover:bg-gray-50 transition-colors text-base">
            Jetzt kostenlos starten <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
