"use client";

import { motion } from "framer-motion";
import { Clock, FileCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/layout/Footer";

const KARTEN = [
  {
    href: "/funnel/pflege-kuendigt-sich-an",
    icon: <Clock size={28} className="text-brand" />,
    title: "Noch kein Pflegegrad",
    sub: "Ich stehe ganz am Anfang und weiß nicht genau was auf mich zukommt.",
  },
  {
    href: "/funnel/pflegegrad-vorhanden",
    icon: <FileCheck size={28} className="text-brand" />,
    title: "Pflegegrad bereits vorhanden",
    sub: "Ich möchte bessere Orientierung – und sichergehen, dass ich nichts vergessen habe.",
  },
];

export default function HomePage() {
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
            <div className="grid gap-3 mt-14 sm:mt-4">
              {KARTEN.map((k, i) => (
                <motion.div
                  key={k.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                >
                  <Link
                    href={k.href}
                    className="group relative text-left p-5 rounded-[14px] border-2 border-brand bg-white hover:bg-brand hover:text-white transition-all duration-200 flex items-center gap-4 shadow-md"
                  >
                    <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center shrink-0 group-hover:bg-white/20">
                      {k.icon}
                    </div>
                    <div className="flex-1">
                      <h2 className="font-serif text-lg text-gray-900 group-hover:text-white">{k.title}</h2>
                      <p className="text-sm text-gray-500 group-hover:text-white/80">{k.sub}</p>
                    </div>
                    <ArrowRight size={16} className="text-brand group-hover:text-white group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
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

      <Footer />
    </main>
  );
}
