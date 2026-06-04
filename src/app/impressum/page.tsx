import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Impressum | liva",
  description: "Impressum und Anbieterkennzeichnung von liva.",
};

export default function ImpressumPage() {
  return (
    <>
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="font-serif text-3xl text-brand-dark mb-8">Impressum</h1>

        <section className="space-y-6 text-sm text-gray-700 leading-relaxed">
          <div>
            <h2 className="font-semibold text-gray-900 mb-1">Angaben gemäß § 5 TMG</h2>
            <p>
              Max Mustermann<br />
              Musterstraße 1<br />
              10115 Berlin<br />
              Deutschland
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-900 mb-1">Kontakt</h2>
            <p>
              E-Mail: kontakt@liva-beispiel.de<br />
              Telefon: +49 (0) 30 000 000 00
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-900 mb-1">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p>
              Max Mustermann<br />
              Musterstraße 1<br />
              10115 Berlin
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-900 mb-1">Haftungsausschluss</h2>
            <p>
              Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit,
              Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten
              nach den allgemeinen Gesetzen verantwortlich.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-900 mb-1">Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
              dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
              der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
              Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
