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
    sub: "Ich möchte vorbereitet sein bevor es ernst wird",
  },
  {
    href: "/funnel/pflegegrad-vorhanden",
    icon: <FileCheck size={28} className="text-brand" />,
    title: "Pflegegrad bereits vorhanden",
    sub: "Der Bescheid ist da – ich weiß nicht wo ich anfangen soll",
  },
];

export default function HomePage() {
  return (
    <main>
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
            <motion.div
              key={k.href}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
            >
              <Link
                href={k.href}
                className="group flex flex-col text-left p-6 rounded-[16px] border-2 border-[#E0EDE7] bg-white transition-all duration-200 shadow-card hover:shadow-card-hover hover:border-brand/50 h-full"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-light flex items-center justify-center mb-4">
                  {k.icon}
                </div>
                <h2 className="font-serif text-xl text-gray-900 mb-2">{k.title}</h2>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{k.sub}</p>
                <div className="mt-5 flex items-center gap-1.5 text-brand text-sm font-semibold">
                  Jetzt starten <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
