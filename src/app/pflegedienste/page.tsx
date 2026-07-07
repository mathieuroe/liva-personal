import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import ErgebnisseClient from "./ErgebnisseClient";

export const metadata: Metadata = {
  title: "Pflegedienste in deiner Nähe – Kostenlos vergleichen | liva",
  description: "Vergleiche ambulante Pflegedienste in deiner Region. Kostenlose Anfragen, echte Bewertungen, sofortige Verfügbarkeit.",
  robots: "noindex",
};

export default function PflegedienstePage({
  searchParams,
}: {
  searchParams: { plz?: string; pg?: string; fuer?: string; leistung?: string };
}) {
  const plz = searchParams.plz ?? "";
  const pflegegrad = searchParams.pg ?? "";
  const fuerWen = searchParams.fuer ?? "";
  const leistung = searchParams.leistung ?? "";

  return (
    <main className="bg-[#F9FAFB] min-h-screen">
      <ErgebnisseClient plz={plz} pflegegrad={pflegegrad} fuerWen={fuerWen} leistung={leistung} />
      <Footer />
    </main>
  );
}
