import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import FloatingChatButton from "@/components/layout/FloatingChatButton";

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
  title: "liva – Orientierung im Pflegesystem",
  description: "In 2 Minuten weißt du genau was dir zusteht – und was du jetzt tun musst. Kostenlos, bundesweit.",
  keywords: "Pflegegrad, Pflegebox, Hausnotruf, Entlastungsbetrag, Pflegeberatung, kostenlos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
        <FloatingChatButton />
      </body>
    </html>
  );
}
