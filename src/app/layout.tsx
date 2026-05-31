import type { Metadata } from "next";
import "./globals.css";
import FloatingChatButton from "@/components/layout/FloatingChatButton";

export const metadata: Metadata = {
  title: "liva – Dein erster Tag mit Pflegegrad",
  description:
    "Du weißt nicht wo anfangen? Wir zeigen dir Schritt für Schritt was du beantragen musst, was dir zusteht und wie alles funktioniert. Kostenlos, bundesweit.",
  keywords: "Pflegeleistungen, Pflegegrad, Pflegebox, Hausnotruf, Entlastungsbetrag, Pflegeberatung kostenlos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        {children}
        <FloatingChatButton />
      </body>
    </html>
  );
}
