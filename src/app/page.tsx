"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, FileCheck } from "lucide-react";
import Footer from "@/components/layout/Footer";
import PfadA from "@/components/funnel/PfadA";
import PfadB from "@/components/funnel/PfadB";

type Pfad = "A" | "B" | null;

const KARTEN = [
  {
    pfad: "A" as Pfad,
    icon: <Clock size={28} className="text-brand" />,
    title: "Pflege kündigt sich an",
    sub: "Ich möchte vorbereitet sein bevor es ernst wird",
  },
  {
    pfad: "B" as Pfad,
    icon: <FileCheck size={28} className="text-brand" />,
    title: "Pflegegrad bereits vorhanden",
    sub: "Der Bescheid ist da – ich weiß nicht wo ich anfangen soll",
  },
];

export default function HomePage() {
  const [aktiverPfad, setAktiverPfad] = useState<Pfad>(null);
  const funnelRef = useRef<HTMLDivElement>(null);

  function waehlePfad(pfad: Pfad) {
    setAktiverPfad(pfad);
    setTimeout(() => {
      funnelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }

  return (
    <main>
      {/* HERO – 3 Karten */}
      <section className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4 sm:px-6 py-20 bg-gradient-to-b from-[#C8E6D0] via-[#EBF5EF] to-white">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-brand-light text-brand text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            Für Menschen die neu in der Pflege sind
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl text-gray-900 mb-5">
            Dein erster Tag mit Pflegegrad –<br className="hidden sm:block" /> wir begleiten dich.
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto mb-8">
            Du weißt nicht wo anfangen? Wir zeigen dir Schritt für Schritt was du beantragen musst, was dir zusteht und wie alles funktioniert.
          </p>
          <p className="text-gray-400 text-sm">Wo stehst du gerade?</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5 max-w-2xl w-full">
          {KARTEN.map((k, i) => (
            <motion.button
              key={k.pfad}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
              onClick={() => waehlePfad(k.pfad)}
              className={`group relative text-left p-6 rounded-[16px] border-2 bg-white transition-all duration-200 shadow-card hover:shadow-card-hover ${
                aktiverPfad === k.pfad
                  ? "border-brand shadow-card-active"
                  : "border-[#E0EDE7] hover:border-brand/50"
              }`}
            >
              {aktiverPfad === k.pfad && (
                <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-brand" />
              )}
              <div className="w-12 h-12 rounded-xl bg-brand-light flex items-center justify-center mb-4">
                {k.icon}
              </div>
              <h2 className="font-serif text-xl text-gray-900 mb-2">{k.title}</h2>
              <p className="text-gray-500 text-sm leading-relaxed">{k.sub}</p>
            </motion.button>
          ))}
        </div>
      </section>

      {/* FUNNEL */}
      <AnimatePresence>
        {aktiverPfad && (
          <motion.section
            id="funnel"
            ref={funnelRef}
            key={aktiverPfad}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="bg-gray-50 border-t border-[#E0EDE7] py-16 px-4 sm:px-6"
          >
            <div className="max-w-2xl mx-auto">
              {/* Pfad-Label */}
              <div className="flex items-center gap-3 mb-10">
                <div className="flex gap-2">
                  {(["A", "B"] as Pfad[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => waehlePfad(p)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                        aktiverPfad === p ? "bg-brand text-white border-brand" : "bg-white text-gray-500 border-[#E0EDE7] hover:border-brand"
                      }`}
                    >
                      {p === "A" ? "Pflege kündigt sich an" : "Pflegegrad bereits vorhanden"}
                    </button>
                  ))}
                </div>
              </div>

              {aktiverPfad === "A" && <PfadA />}
              {aktiverPfad === "B" && <PfadB />}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
