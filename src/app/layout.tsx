import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/layout/SiteShell";
import CookieBanner from "@/components/layout/CookieBanner";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://liva-pflege.de"),
  title: "liva – Orientierung im Pflegesystem",
  description: "In 2 Minuten weißt du genau was dir zusteht – und was du jetzt tun musst. Kostenlos, bundesweit.",
  keywords: "Pflegegrad, Pflegebox, Hausnotruf, Entlastungsbetrag, Pflegeberatung, kostenlos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "liva",
              legalName: "RegioCare UG (haftungsbeschränkt)",
              url: "https://liva-pflege.de",
              logo: "https://liva-pflege.de/hero.jpg",
              email: "info@liva-pflege.de",
              telephone: "+4976188785990",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Zita-Kaiser-Straße 3",
                addressLocality: "Freiburg im Breisgau",
                postalCode: "79106",
                addressCountry: "DE",
              },
              sameAs: ["https://github.com/mathieuroe/pflegeeins"],
            }),
          }}
        />
        <SiteShell>{children}</SiteShell>
        <CookieBanner />
      </body>
    </html>
  );
}
