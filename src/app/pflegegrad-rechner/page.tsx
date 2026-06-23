import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import PflegegradRechnerPage from "./PflegegradRechnerPage";

export const metadata: Metadata = {
  title: "Pflegegrad Rechner 2026 – Kostenlos & anonym | liva",
  description:
    "Pflegegrad berechnen in 5 Minuten – kostenlos, anonym, ohne Anmeldung. Basiert auf dem offiziellen MDK-Begutachtungsinstrument (NBA). Ergebnis sofort.",
  keywords: [
    "Pflegegrad Rechner",
    "Pflegegrad berechnen",
    "Pflegegrad Test",
    "Pflegegrad ermitteln",
    "Pflegegrad Selbsttest",
    "MDK Pflegegrad",
    "Pflegegrad 2026",
  ],
  openGraph: {
    title: "Pflegegrad Rechner 2026 – Kostenlos & anonym",
    description:
      "Ermittle in 5 Minuten welcher Pflegegrad für dich oder deine Angehörigen in Frage kommt. Kostenlos, anonym, auf Basis des offiziellen MDK-Verfahrens.",
    url: "https://liva-pflege.de/pflegegrad-rechner",
    siteName: "liva",
    locale: "de_DE",
    type: "website",
  },
  alternates: {
    canonical: "https://liva-pflege.de/pflegegrad-rechner",
  },
};

const schemaWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Pflegegrad Rechner 2026",
  url: "https://liva-pflege.de/pflegegrad-rechner",
  applicationCategory: "HealthApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
  description:
    "Kostenloser Pflegegrad-Rechner basierend auf dem offiziellen NBA-Begutachtungsinstrument des MDK. Anonym und ohne Anmeldung.",
  inLanguage: "de",
  provider: {
    "@type": "Organization",
    name: "liva (RegioCare UG)",
    url: "https://liva-pflege.de",
  },
};

const schemaFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wie genau ist der Pflegegrad Rechner?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Unser Rechner basiert auf dem offiziellen NBA-Begutachtungsinstrument des Medizinischen Dienstes (MDK). Er gibt eine fundierte Einschätzung, ist aber kein Ersatz für die offizielle Begutachtung. In der Praxis weicht das Ergebnis oft um einen halben bis einen Pflegegrad ab.",
      },
    },
    {
      "@type": "Question",
      name: "Ist der Rechner anonym und kostenlos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja – der Rechner ist vollständig kostenlos und anonym. Es sind keine Angaben zur Person erforderlich, keine Anmeldung, keine Kreditkarte.",
      },
    },
    {
      "@type": "Question",
      name: "Wie lange dauert die Berechnung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Beantwortung der Fragen dauert in der Regel 5–10 Minuten. Du bekommst das Ergebnis sofort nach Abschluss angezeigt.",
      },
    },
    {
      "@type": "Question",
      name: "Was sind die 5 Pflegegrade?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pflegegrad 1 (geringe Beeinträchtigung, 12,5–27 Punkte), Pflegegrad 2 (erhebliche Beeinträchtigung, 27–47,5 Punkte), Pflegegrad 3 (schwere Beeinträchtigung, 47,5–70 Punkte), Pflegegrad 4 (schwerste Beeinträchtigung, 70–90 Punkte), Pflegegrad 5 (schwerste Beeinträchtigung mit besonderen Anforderungen, 90–100 Punkte).",
      },
    },
    {
      "@type": "Question",
      name: "Was bekomme ich mit Pflegegrad 1?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mit Pflegegrad 1 hast du Anspruch auf: Entlastungsbetrag (125 € / Monat), Pflegehilfsmittelbox (bis 42 € / Monat), Hausnotruf-Zuschuss (27,00 € / Monat + einmalig bis zu 10,49 €) und Beratungsleistungen. Pflegegeld gibt es erst ab Pflegegrad 2.",
      },
    },
    {
      "@type": "Question",
      name: "Was tun nach dem Rechner-Ergebnis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wenn das Ergebnis auf einen Pflegegrad hinweist: Stelle einen Antrag bei deiner Pflegekasse. Das geht schriftlich, telefonisch oder online. Der MDK kommt dann zur Begutachtung. Mit unserem Ergebnis-PDF bist du optimal vorbereitet.",
      },
    },
  ],
};

export default function PflegegradRechnerPageWrapper() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }}
      />
      <PflegegradRechnerPage />
      <Footer />
    </>
  );
}
