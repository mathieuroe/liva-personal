import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Erste Schritte mit Pflegegrad | liva",
  description: "Pflegegrad bekommen und nicht wissen was jetzt? Diese Seite führt dich durch die ersten und wichtigsten Schritte.",
};

const schritte = [
  { nr: "01", title: "Pflegebox bestellen", text: "Ab PG 1: 42 € pro Monat für Pflegehilfsmittel – vollständig kostenlos. Einfachste Leistung, größter sofortiger Nutzen. In 5 Minuten beantragt.", tag: "PG 1–5 · Kostenlos", link: "/pflegebox", linkText: "Pflegebox beantragen" },
  { nr: "02", title: "Hausnotruf prüfen", text: "Falls die pflegebedürftige Person zeitweise alleine ist: Hausnotruf prüfen. Pflegekasse zahlt 25,50 €/Monat – bei günstigen Anbietern kostenfrei.", tag: "PG 1–5", link: "/hausnotruf", linkText: "Hausnotruf anfragen" },
  { nr: "03", title: "Entlastungsbetrag einsetzen", text: "131 € pro Monat für Alltagsbegleitung, Haushaltshilfe oder Betreuung. Nicht genutzte Beträge können angespart werden.", tag: "PG 1–5 · 131 €/Monat", link: "/leistungen-check", linkText: "Alle Leistungen prüfen" },
  { nr: "04", title: "Pflegegeld beantragen (ab PG 2)", text: "Wenn Angehörige pflegen: Pflegegeld von 332 € (PG 2) bis 947 € (PG 5) pro Monat. Formloser Antrag bei der Pflegekasse genügt.", tag: "PG 2–5", link: "/leistungen-check?pg=2", linkText: "Pflegegeld prüfen" },
  { nr: "05", title: "Wohnraumanpassung planen", text: "Bis zu 4.180 € Zuschuss für barrierefreie Umbauten. Wichtig: Antrag MUSS vor Durchführung gestellt werden.", tag: "PG 1–5 · bis 4.180 €", link: "/leistungen-check", linkText: "Mehr erfahren" },
  { nr: "06", title: "Verhinderungspflege kennen", text: "Bis zu 1.612 € pro Jahr wenn die Hauptpflegeperson eine Auszeit braucht – Pflegekasse übernimmt die Vertretungspflege.", tag: "PG 2–5", link: "/ratgeber/verhinderungspflege", linkText: "Ratgeber lesen" },
];

export default function ErsteSchrittePage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-white py-16 px-4 sm:px-6 border-b border-[#E0EDE7]">
          <div className="max-w-6xl mx-auto">
            <span className="inline-block bg-brand-light text-brand text-xs font-semibold px-4 py-1.5 rounded-full mb-6">Schritt für Schritt</span>
            <h1 className="font-serif text-5xl text-gray-900 mb-4">Was du jetzt tun solltest.</h1>
            <p className="text-gray-500 text-lg max-w-xl">Die wichtigsten nächsten Schritte nach dem Pflegegrad-Bescheid – geordnet nach Priorität.</p>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto space-y-6">
            {schritte.map((s) => (
              <div key={s.nr} className="card bg-white p-6 flex gap-6">
                <div className="hidden sm:block">
                  <span className="text-4xl font-serif font-bold text-[#E0EDE7] leading-none">{s.nr}</span>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <h2 className="font-semibold text-gray-900 text-lg">{s.title}</h2>
                    <span className="text-xs bg-brand-light text-brand font-medium px-3 py-1 rounded-full flex-shrink-0">{s.tag}</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.text}</p>
                  <Link href={s.link} className="inline-flex items-center gap-1.5 text-brand text-sm font-semibold hover:underline">
                    {s.linkText} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl text-gray-900 mb-8">Wichtige Tipps</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {["Leistungen nicht verfallen lassen – viele haben ein Jahresbudget das neu startet", "Widerspruch lohnt sich – in ~35% der Widersprüche wird der Pflegegrad heraufgestuft", "Kostenlose Pflegeberatung nutzen – jede Pflegekasse muss das anbieten (§7a SGB XI)", "Angehörige miteinbeziehen – viele Leistungen gelten auch für die pflegende Person"].map((tip) => (
                <div key={tip} className="flex gap-3 p-4 rounded-xl bg-brand-light/40">
                  <CheckCircle2 size={18} className="text-brand flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 bg-[#167A5A]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-4xl text-white mb-4">Alle Leistungen auf einen Blick</h2>
            <p className="text-white/70 mb-8">Gib deinen Pflegegrad ein und sieh sofort alle Leistungen die dir zustehen.</p>
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
