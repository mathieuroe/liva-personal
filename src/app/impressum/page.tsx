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
              RegioCare UG (haftungsbeschränkt)<br />
              Zita-Kaiser-Straße 3<br />
              79106 Freiburg im Breisgau
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-900 mb-1">Vertreten durch</h2>
            <p>Fabian Schröteler &amp; Joshua Denz</p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-900 mb-1">Kontakt</h2>
            <p>
              Telefon: 0761 88785990<br />
              E-Mail: info@liva-pflege.de
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-900 mb-1">Registereintrag</h2>
            <p>
              Registernummer: HRB 733155<br />
              Registergericht: Amtsgericht Freiburg im Breisgau
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-900 mb-1">Umsatzsteuer-ID</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:<br />
              DE454205056
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-900 mb-1">Inhaltlich Verantwortlicher</h2>
            <p>Fabian Schröteler &amp; Joshua Denz (Anschrift wie oben)</p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-900 mb-1">Haftungsausschluss</h2>
            <p>
              Die Inhalte von liva-pflege.de dienen ausschließlich der allgemeinen Information und Orientierung. Sie stellen keine Rechts-, Steuer- oder Sozialberatung dar und ersetzen nicht die individuelle Beratung durch einen qualifizierten Fachmann. Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Informationen.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-900 mb-1">Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-900 mb-1">Hinweis zu Affiliate-Links und Werbung</h2>
            <p className="mb-2">
              Einige Links auf liva-pflege.de sind sogenannte Affiliate-Links oder Partnerlinks. Sie sind auf der jeweiligen Seite mit dem Hinweis &ldquo;Werbung&rdquo; oder &ldquo;Partnerlink&rdquo; gekennzeichnet. Wenn du über einen dieser Links einen Vertrag abschließt oder ein Produkt bestellst, erhalten wir vom jeweiligen Anbieter eine Vermittlungsprovision.
            </p>
            <p className="mb-2">
              Für dich entstehen dabei keine zusätzlichen Kosten – du zahlst denselben Preis wie bei einer direkten Buchung.
            </p>
            <p className="mb-2">
              Diese Provisionen ermöglichen es uns, unseren kostenlosen Orientierungsservice für Pflegebedürftige und ihre Angehörigen anzubieten und weiterzuentwickeln. Unsere redaktionelle Unabhängigkeit bleibt davon unberührt: Wir empfehlen ausschließlich Anbieter, die wir inhaltlich für geeignet halten.
            </p>
            <p>
              Das Affiliate-Tracking erfolgt über das Netzwerk Adcell (Firstlead GmbH, Berlin). Weitere Informationen zur Datenverarbeitung findest du in unserer{" "}
              <a href="/datenschutz" className="text-brand hover:underline">Datenschutzerklärung</a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
