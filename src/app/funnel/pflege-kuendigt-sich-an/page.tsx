import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PfadA from "@/components/funnel/PfadA";

export const metadata: Metadata = {
  title: "Noch kein Pflegegrad – liva",
  description: "Wir begleiten euch durch die ersten Schritte im Pflegesystem. Kostenlos, persönlich, ohne Druck.",
};

export default function PflegekuendigtPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-brand hover:underline mb-8">
          <ArrowLeft size={14} /> Zurück
        </Link>

        <div className="mb-10">
          <span className="inline-block bg-brand-light text-brand text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            Noch kein Pflegegrad
          </span>
          <h1 className="font-serif text-4xl text-gray-900 mb-3">
            Gut, dass ihr euch jetzt kümmert.
          </h1>
          <p className="text-gray-500 leading-relaxed">
            Vorbereitung macht den Unterschied. Wir zeigen euch Schritt für Schritt was ihr jetzt tun solltet.
          </p>
        </div>

        <PfadA />
      </div>
    </main>
  );
}
