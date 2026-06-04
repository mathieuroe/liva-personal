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
      {/* HERO */}
      <section className="min-h-[calc(100vh-64px)] sm:min-h-0 flex items-center overflow-hidden bg-gradient-to-br from-[#E8F5EC] via-[#F4FAF6] to-white sm:bg-none relative">
        {/* Mobile background image */}
        <div className="absolute inset-0 sm:hidden" style={{backgroundImage: "url('/hero.jpg')", backgroundSize: "cover", backgroundPosition: "center 85%"}}><div className="absolute inset-0 bg-white/75" /></div>
        <div className="w-full grid sm:grid-cols-2 gap-0 items-stretch min-h-[calc(100vh-64px)] sm:min-h-[600px] sm:h-[75vh]">

          {/* Linke Seite – Text & Karten */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center px-8 sm:px-16 relative z-10"
          >
            <span className="inline-block bg-brand-light text-brand text-xs font-semibold px-4 py-1.5 rounded-full mb-3">
              Für Menschen die neu in der Pflege sind
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-gray-900 mb-3">
              Dein erster Tag mit Pflegegrad –<br className="hidden sm:block" /> <span className="text-brand">wir begleiten dich.</span>
            </h1>
            <p className="text-gray-500 text-base max-w-md mb-2">
              Du weißt nicht wo anfangen? Wir zeigen dir Schritt für Schritt was du beantragen musst.
            </p>
            <p className="text-gray-400 text-sm mb-4">Wo stehst du gerade?</p>

            <div className="grid gap-3">
              {KARTEN.map((k, i) => (
                <motion.button
                  key={k.pfad}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                  onClick={() => waehlePfad(k.pfad)}
                  className={`group relative text-left p-5 rounded-[14px] border-2 transition-all duration-200 flex items-center gap-4 ${
                    aktiverPfad === k.pfad
                      ? "border-brand bg-brand text-white shadow-lg"
                      : "border-brand bg-white hover:bg-brand hover:text-white hover:border-brand shadow-md"
                  }`}
                >
                  {aktiverPfad === k.pfad && (
                    <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-white" />
                  )}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${aktiverPfad === k.pfad ? "bg-white/20" : "bg-brand-light group-hover:bg-white/20"}`}>
                    {k.icon}
                  </div>
                  <div>
                    <h2 className="font-serif text-lg">{k.title}</h2>
                    <p className="text-sm opacity-80">{k.sub}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Rechte Seite – Bild */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden sm:block h-full overflow-hidden relative"
          >
            <img
              src="/hero.jpg"
              alt="Pflegende Person mit älterer Frau"
              className="w-full h-full object-cover object-[center_30%] scale-x-[-1]"
            />
          </motion.div>

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
