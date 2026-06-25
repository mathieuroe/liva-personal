"use client";

import { motion } from "framer-motion";
import { Clock, FileCheck, ArrowRight, Compass, ListChecks, Users, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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

const TRUST_STATS = [
  { zahl: "6 Mio.", text: "Menschen haben aktuell einen Pflegegrad in Deutschland" },
  { zahl: "86 %", text: "der Pflegebedürftigen werden zu Hause gepflegt" },
  { zahl: "≈ 80 %", text: "der Entlastungsleistungen bleiben ungenutzt" },
];

const VALUE_PROPS = [
  {
    icon: <Compass size={20} className="text-brand" />,
    title: "Orientierung",
    text: "Wir erklären das Pflegesystem – verständlich, ohne Bürokratie-Deutsch.",
  },
  {
    icon: <ListChecks size={20} className="text-brand" />,
    title: "Leistungen kennen",
    text: "Finde heraus was dir zusteht – und was du vielleicht noch nie beantragt hast.",
  },
  {
    icon: <Users size={20} className="text-brand" />,
    title: "Partner finden",
    text: "Geprüfte Anbieter für Pflegebox, Hausnotruf und mehr – kostenlos vermittelt.",
  },
];

const TEASER_LINKS = [
  { href: "/leistungen", title: "Pflegeleistungen 2026", sub: "Was dir zusteht" },
  { href: "/ratgeber", title: "Ratgeber", sub: "Schritt für Schritt erklärt" },
  { href: "/pflegebox", title: "Kostenlose Pflegebox", sub: "Ab Pflegegrad 1" },
];

const TESTIMONIALS = [
  {
    text: "Wir haben in wenigen Minuten den Pflegegrad meiner Frau neu berechnet und eine kostenlose Auflistung aller passenden Leistungen erhalten.",
    autor: "Thomas R., pflegender Ehemann",
  },
  {
    text: "Dank liva habe ich innerhalb von 2 Minuten den Hausnotruf bestellt. Danke!",
    autor: "Maria K., Tochter eines Pflegebedürftigen",
  },
];

export default function HomePage() {
  return (
    <main>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="flex items-center overflow-hidden bg-gradient-to-br from-[#E8F5EC] via-[#F4FAF6] to-white sm:bg-none relative">
        <div className="absolute inset-0 sm:hidden" style={{ backgroundImage: "url('/hero.jpg')", backgroundSize: "cover", backgroundPosition: "center 85%" }}>
          <div className="absolute inset-0 bg-white/75" />
        </div>
        <div className="w-full grid sm:grid-cols-2 gap-0 items-stretch sm:min-h-[600px] sm:h-[75vh]">

          {/* Linke Seite */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center px-8 sm:px-16 py-12 sm:py-0 relative z-10"
          >
            <h1 className="font-serif text-4xl sm:text-5xl text-gray-900 mb-3 leading-tight">
              Pflege beginnt –<br />
              <span className="text-brand">liva begleitet dich ab Tag 1</span>
              <br />
              Schritt für Schritt
            </h1>
            <p className="text-gray-500 text-base max-w-md mb-2">
              Ob für dich oder einen geliebten Menschen – wir geben dir Orientierung, wenn du sie am meisten brauchst.
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
            <Image
              src="/hero.jpg"
              alt="Pflegende Person mit älterer Frau"
              fill
              className="object-cover object-[center_30%] scale-x-[-1]"
            />
          </motion.div>

        </div>
      </section>

      {/* ── Trust-Bar ────────────────────────────────────────────── */}
      <section className="bg-brand-light/50 border-y border-[#E0EDE7] py-5 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-4 justify-center sm:justify-between">
          {TRUST_STATS.map((s) => (
            <div key={s.zahl} className="bg-white/70 rounded-xl px-4 py-3 flex flex-col min-w-[150px] flex-1">
              <span className="font-bold text-brand text-xl leading-none mb-0.5">{s.zahl}</span>
              <span className="text-xs text-gray-700 leading-snug">{s.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Value Proposition ────────────────────────────────────── */}
      <section className="py-12 px-4 sm:px-6 bg-white border-b border-[#E0EDE7]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold text-brand uppercase tracking-widest mb-1">Was liva dir bietet</p>
          <p className="text-sm text-gray-500 mb-6">Kostenlos · Unabhängig · DSGVO-konform</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {VALUE_PROPS.map((v) => (
              <div key={v.title} className="card p-5">
                <div className="w-9 h-9 rounded-xl bg-brand-light flex items-center justify-center mb-3">
                  {v.icon}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{v.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pflegegrad-Rechner CTA ───────────────────────────────── */}
      <section className="py-10 px-4 sm:px-6 bg-brand-light/40 border-b border-[#E0EDE7]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-brand mb-1">Pflegegrad noch unklar?</p>
            <h2 className="font-serif text-2xl text-gray-900 mb-1">In 5 Minuten weißt du deinen voraussichtlichen Pflegegrad.</h2>
            <p className="text-xs text-gray-400">Anonym · Kein Login · Basiert auf dem MDK-Verfahren</p>
          </div>
          <Link href="/pflegegrad-rechner" className="btn-primary inline-flex text-sm px-6 py-3 whitespace-nowrap flex-shrink-0">
            Kostenlos ermitteln <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* ── Ratgeber / Leistungen Teaser ─────────────────────────── */}
      <section className="py-10 px-4 sm:px-6 bg-white border-b border-[#E0EDE7]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold text-brand uppercase tracking-widest mb-4">Weiterführend</p>
          <div className="grid sm:grid-cols-3 gap-3">
            {TEASER_LINKS.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="card p-4 flex items-center justify-between hover:shadow-card-hover transition-shadow group"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-brand transition-colors">{t.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{t.sub}</p>
                </div>
                <ArrowRight size={14} className="text-gray-300 group-hover:text-brand transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials & Nutzerzahlen ──────────────────────────── */}
      <section className="py-12 px-4 sm:px-6 bg-brand-light/30 border-b border-[#E0EDE7]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="font-serif text-3xl text-gray-900 mb-1">6.000+ Familien</p>
            <p className="text-sm text-gray-500">haben wir bereits begleitet</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {TESTIMONIALS.map((t) => (
              <div key={t.autor} className="card p-5">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-3 italic">"{t.text}"</p>
                <p className="text-xs text-gray-400">— {t.autor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
