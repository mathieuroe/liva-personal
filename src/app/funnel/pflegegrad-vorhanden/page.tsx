import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PfadB from "@/components/funnel/PfadB";

export const metadata: Metadata = {
  title: "Pflegegrad vorhanden – liva",
  description: "Der Bescheid ist da – wir zeigen euch was euch zusteht und wie ihr es beantragen könnt.",
};

export default function PflegegradVorhandenPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-brand hover:underline mb-8">
          <ArrowLeft size={14} /> Zurück
        </Link>

        <div className="mb-10">
          <span className="inline-block bg-brand-light text-brand text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            Pflegegrad bereits vorhanden
          </span>
          <h1 className="font-serif text-4xl text-gray-900 mb-3">
            Der Bescheid ist da – jetzt das Beste rausholen.
          </h1>
          <p className="text-gray-500 leading-relaxed">
            Viele Leistungen werden nie beantragt. Wir zeigen euch was euch zusteht und wie ihr es bekommt.
          </p>
        </div>

        <PfadB />
      </div>
    </main>
  );
}
