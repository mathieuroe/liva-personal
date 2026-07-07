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
  title: "Pflegedienste vergleichen & Pflegeleistungen beantragen | liva",
  description: "Pflegedienste in deiner Nähe vergleichen, Hausnotruf & Pflegebox kostenlos beantragen. Pflegegrad ermitteln – in 2 Minuten. Bundesweit, unverbindlich.",
  keywords: "Pflegedienst Vergleich, Pflegebox beantragen, Hausnotruf Vergleich, Pflegegrad ermitteln, ambulante Pflege",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NLT25JVG');`,
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NLT25JVG"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
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
