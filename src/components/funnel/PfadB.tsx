"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckSquare, Square } from "lucide-react";
import LeadForm from "./LeadForm";

const fade = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } };

type PGLeistung = { name: string; betrag: string };
const PG_LEISTUNGEN: Record<number, PGLeistung[]> = {
  1: [
    { name: "Entlastungsbetrag", betrag: "131 € / Monat" },
    { name: "Wohnraumanpassung", betrag: "bis 4.180 €" },
  ],
  2: [
    { name: "Pflegegeld", betrag: "332 € / Monat" },
    { name: "Pflegesachleistungen", betrag: "724 € / Monat" },
    { name: "Entlastungsbetrag", betrag: "131 € / Monat" },
    { name: "Verhinderungspflege", betrag: "bis 1.612 € / Jahr" },
  ],
  3: [
    { name: "Pflegegeld", betrag: "572 € / Monat" },
    { name: "Pflegesachleistungen", betrag: "1.363 € / Monat" },
    { name: "Entlastungsbetrag", betrag: "131 € / Monat" },
    { name: "Kurzzeitpflege", betrag: "1.774 € / Jahr" },
    { name: "Verhinderungspflege", betrag: "bis 1.612 € / Jahr" },
  ],
  4: [
    { name: "Pflegegeld", betrag: "764 € / Monat" },
    { name: "Pflegesachleistungen", betrag: "1.693 € / Monat" },
    { name: "Entlastungsbetrag", betrag: "131 € / Monat" },
    { name: "Verhinderungspflege", betrag: "bis 1.612 € / Jahr" },
    { name: "Kurzzeitpflege", betrag: "1.774 € / Jahr" },
  ],
  5: [
    { name: "Pflegegeld", betrag: "946 € / Monat" },
    { name: "Pflegesachleistungen", betrag: "2.095 € / Monat" },
    { name: "Entlastungsbetrag", betrag: "131 € / Monat" },
    { name: "Verhinderungspflege", betrag: "bis 1.612 € / Jahr" },
    { name: "Kurzzeitpflege", betrag: "1.774 € / Jahr" },
  ],
};

const WOHNSITUATIONEN = [
  { id: "selbst", label: "Zuhause – ich pflege selbst", icon: "🏠" },
  { id: "dienst", label: "Zuhause – ein Pflegedienst kommt", icon: "🤝" },
  { id: "beides", label: "Zuhause – ich pflege und ein Dienst kommt", icon: "👐" },
  { id: "heim", label: "Im Pflegeheim", icon: "🏥" },
];

const HERAUSFORDERUNGEN = [
  { id: "erschoepft", label: "Ich bin oft erschöpft und komme kaum zur Ruhe", icon: "😔" },
  { id: "unsicher", label: "Ich weiß nicht ob wir alles richtig machen", icon: "🤔" },
  { id: "familie", label: "Die Familie ist sich nicht immer einig", icon: "👨‍👩‍👧" },
  { id: "sicherheit", label: "Ich mache mir Sorgen ob zuhause alles sicher ist", icon: "🔒" },
  { id: "unterstuetzung", label: "Ich bräuchte einfach mehr Unterstützung im Alltag", icon: "🙋" },
];

interface CheckItem {
  id: string;
  text: string;
  info?: string;
  priorität: "sofort" | "bald" | "optional";
}

function buildCheckliste(
  pflegegrad: number,
  wohnsituation: string,
  herausforderung: string
): CheckItem[] {
  const items: CheckItem[] = [
    {
      id: "pflegebox",
      text: "Pflegebox beantragen",
      info: "42 € / Monat kostenlos – geht in 5 Minuten",
      priorität: "sofort",
    },
    {
      id: "hausnotruf",
      text: "Hausnotruf anfragen",
      info: "Pflegekasse zahlt 25,50 € / Monat – oft 0 € Eigenanteil",
      priorität: "sofort",
    },
    {
      id: "beratung",
      text: "Kostenlose Pflegeberatung §7a bei der Pflegekasse anfragen",
      info: "Dein Recht – kostenlos, auch zuhause möglich",
      priorität: "bald",
    },
  ];

  if (pflegegrad >= 2) {
    items.push({
      id: "verhinderung",
      text: "Verhinderungspflege für die nächste Auszeit planen",
      info: "bis 1.612 € / Jahr – damit du auch mal Luft holst",
      priorität: herausforderung === "erschoepft" ? "sofort" : "bald",
    });
  }

  if (pflegegrad >= 1) {
    items.push({
      id: "entlastung",
      text: "Entlastungsbetrag nutzen – Anbieter suchen",
      info: "131 € / Monat verfallen wenn du sie nicht nutzt",
      priorität: herausforderung === "unterstuetzung" ? "sofort" : "bald",
    });
  }

  if (wohnsituation === "selbst" || wohnsituation === "beides") {
    items.push({
      id: "aufgaben",
      text: "Aufgabenverteilung in der Familie klären",
      info: "Wer macht was? Schriftlich festhalten hilft",
      priorität: herausforderung === "familie" ? "sofort" : "bald",
    });
  }

  if (herausforderung === "sicherheit" || wohnsituation === "selbst") {
    items.push({
      id: "wohnen",
      text: "Wohnraumanpassung prüfen",
      info: "bis 4.180 € Zuschuss – Antrag VOR Umbau stellen",
      priorität: herausforderung === "sicherheit" ? "sofort" : "optional",
    });
  }

  if (pflegegrad >= 2) {
    items.push({
      id: "pflegegeld",
      text: "Pflegegeld beantragen falls noch nicht geschehen",
      info: `${pflegegrad === 2 ? "332" : pflegegrad === 3 ? "572" : pflegegrad === 4 ? "764" : "946"} € / Monat direkt ausgezahlt`,
      priorität: "bald",
    });
  }

  if (herausforderung === "unsicher") {
    items.push({
      id: "mdk",
      text: "MDK-Bescheid nochmal prüfen – ggf. Widerspruch einlegen",
      info: "In ~35% der Fälle wird der PG nach Widerspruch heraufgestuft",
      priorität: "bald",
    });
  }

  if (herausforderung === "erschoepft" || herausforderung === "familie") {
    items.push({
      id: "austausch",
      text: "Austausch mit anderen pflegenden Angehörigen suchen",
      info: "VdK, Caritas oder lokale Selbsthilfegruppen – du bist nicht alleine",
      priorität: "optional",
    });
  }

  return items;
}

const PRIORITÄT_STYLE: Record<string, string> = {
  sofort: "bg-brand text-white",
  bald: "bg-amber-50 text-amber-700 border border-amber-200",
  optional: "bg-gray-100 text-gray-500",
};

const PRIORITÄT_LABEL: Record<string, string> = {
  sofort: "Sofort",
  bald: "Diese Woche",
  optional: "Wenn Zeit ist",
};

const ERGEBNIS_TEXT: Record<string, { titel: string; text: string }> = {
  erschoepft: {
    titel: "Du trägst gerade sehr viel.",
    text: "Pflegende Angehörige sind oft die unsichtbaren Helden – und die, die am seltensten gefragt werden wie es ihnen geht. Das ist keine Schwäche. Es gibt Möglichkeiten die genau für dich gemacht sind.",
  },
  unsicher: {
    titel: "Du machst das besser als du denkst.",
    text: "Niemand wird als Pflegeexperte geboren. Das Gefühl \"mache ich das richtig?\" kennen fast alle. Lass uns gemeinsam Klarheit schaffen.",
  },
  familie: {
    titel: "Pflege bringt Familien an ihre Grenzen – das ist normal.",
    text: "Wer entscheidet was das Beste ist? Wer übernimmt wie viel? Diese Fragen führen zu echten Konflikten. Eine strukturierte Aufgabenverteilung hilft mehr als man denkt.",
  },
  sicherheit: {
    titel: "Sicherheit zuhause ist kein Luxus.",
    text: "Sturzgefahr, Orientierungsprobleme, alleine sein – reale Risiken. Die gute Nachricht: es gibt konkrete Maßnahmen die die Situation deutlich verbessern – und viele davon zahlt die Pflegekasse.",
  },
  unterstuetzung: {
    titel: "Mehr Unterstützung annehmen ist keine Schwäche.",
    text: "Viele Familien organisieren die Pflege komplett alleine – weil sie nicht wissen dass Hilfe möglich ist, oder weil sie Hemmungen haben sie anzunehmen. Beides ist verständlich. Aber: Unterstützung annehmen ist klug.",
  },
};

const PG_LABELS = ["", "PG 1", "PG 2", "PG 3", "PG 4", "PG 5"];

export default function PfadB() {
  const [step, setStep] = useState(0);
  const [pflegegrad, setPflegegrad] = useState<number | null>(null);
  const [wohnsituation, setWohnsituation] = useState<string | null>(null);
  const [herausforderung, setHerausforderung] = useState<string | null>(null);
  const [checked, setChecked] = useState<Set<string>>(new Set());

  function toggleCheck(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  }

  const checkliste =
    pflegegrad && wohnsituation && herausforderung
      ? buildCheckliste(pflegegrad, wohnsituation, herausforderung)
      : [];

  const ergebnisText = herausforderung ? ERGEBNIS_TEXT[herausforderung] : null;

  return (
    <div className="space-y-8">
      <AnimatePresence mode="wait">

        {/* SCHRITT 1 – Pflegegrad */}
        {step === 0 && (
          <motion.div key="step0" {...fade} transition={{ duration: 0.3 }}>
            <p className="section-label">Schritt 1 von 3</p>
            <h2 className="font-serif text-3xl text-gray-900 mb-2">Welchen Pflegegrad habt ihr?</h2>
            <p className="text-gray-500 mb-8">Das hilft uns einzuschätzen was euch zusteht.</p>

            <div className="grid grid-cols-5 gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((pg) => (
                <button
                  key={pg}
                  onClick={() => { setPflegegrad(pg); setStep(1); }}
                  className={`rounded-full py-2.5 text-sm font-semibold border transition-all ${
                    pflegegrad === pg
                      ? "bg-brand text-white border-brand"
                      : "bg-white text-gray-700 border-[#E0EDE7] hover:border-brand hover:text-brand"
                  }`}
                >
                  PG {pg}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* SCHRITT 2 – Wohnsituation */}
        {step === 1 && (
          <motion.div key="step1" {...fade} transition={{ duration: 0.3 }}>
            <p className="section-label">Schritt 2 von 3</p>
            <h2 className="font-serif text-3xl text-gray-900 mb-2">Wie ist die Wohnsituation?</h2>
            <p className="text-gray-500 mb-8">Wo lebt die pflegebedürftige Person gerade?</p>

            <div className="space-y-3 mb-8">
              {WOHNSITUATIONEN.map((w) => (
                <button
                  key={w.id}
                  onClick={() => { setWohnsituation(w.id); setStep(2); }}
                  className={`w-full flex items-center gap-4 p-4 rounded-[12px] border-2 text-left transition-all ${
                    wohnsituation === w.id
                      ? "border-brand bg-brand-light"
                      : "border-[#E0EDE7] bg-white hover:border-brand/40"
                  }`}
                >
                  <span className="text-2xl">{w.icon}</span>
                  <span className="font-medium text-gray-900 text-sm">{w.label}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(0)} className="btn-ghost">← Zurück</button>
          </motion.div>
        )}

        {/* SCHRITT 3 – Herausforderung */}
        {step === 2 && (
          <motion.div key="step2" {...fade} transition={{ duration: 0.3 }}>
            <p className="section-label">Schritt 3 von 3</p>
            <h2 className="font-serif text-3xl text-gray-900 mb-2">Wie geht es dir gerade?</h2>
            <p className="text-gray-500 mb-8">Wähle was am ehesten zutrifft – sei ehrlich, hier ist kein Platz für Schönreden.</p>

            <div className="space-y-3 mb-8">
              {HERAUSFORDERUNGEN.map((h) => (
                <button
                  key={h.id}
                  onClick={() => {
                    setHerausforderung(h.id);
                    setStep(3);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`w-full flex items-center gap-4 p-4 rounded-[12px] border-2 text-left transition-all ${
                    herausforderung === h.id
                      ? "border-brand bg-brand-light"
                      : "border-[#E0EDE7] bg-white hover:border-brand/40"
                  }`}
                >
                  <span className="text-2xl">{h.icon}</span>
                  <span className="font-medium text-gray-900 text-sm">{h.label}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(1)} className="btn-ghost">← Zurück</button>
          </motion.div>
        )}

        {/* ERGEBNIS */}
        {step === 3 && ergebnisText && pflegegrad && wohnsituation && herausforderung && (
          <motion.div key="step3" {...fade} transition={{ duration: 0.3 }} className="space-y-8">

            {/* PERSÖNLICHER EINSTIEG */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h2 className="font-serif text-2xl text-gray-900 mb-3">{ergebnisText.titel}</h2>
              <p className="text-gray-600 leading-relaxed text-sm">{ergebnisText.text}</p>
            </div>

            {/* SOFORT-LEISTUNGEN */}
            <div>
              <p className="section-label mb-3">Als erstes – immer</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="card p-5">
                  <div className="text-3xl mb-3">📦</div>
                  <h3 className="font-semibold text-gray-900 mb-1">Pflegebox</h3>
                  <p className="text-brand font-bold text-sm mb-2">42 € / Monat – kostenlos</p>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    Handschuhe, Desinfektion, Bettschutz – jeden Monat nach Hause. Pflegekasse zahlt vollständig. Geht in 5 Minuten.
                  </p>
                </div>
                <div className="card p-5">
                  <div className="text-3xl mb-3">🔔</div>
                  <h3 className="font-semibold text-gray-900 mb-1">Hausnotruf</h3>
                  <p className="text-brand font-bold text-sm mb-2">ab 0 € / Monat</p>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    Pflegekasse zahlt 25,50 € / Monat. Bei günstigen Anbietern entstehen keine Kosten. Sicherheit für euch beide.
                  </p>
                </div>
              </div>
            </div>

            {/* CHECKLISTE */}
            <div>
              <p className="section-label mb-1">Dein persönlicher Aktionsplan</p>
              <h3 className="font-serif text-2xl text-gray-900 mb-5">Was ihr als nächstes tun solltet</h3>

              <div className="space-y-3">
                {checkliste.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`w-full flex items-start gap-4 p-4 rounded-[12px] border text-left transition-all ${
                      checked.has(item.id)
                        ? "border-brand/30 bg-brand-light/50"
                        : "border-[#E0EDE7] bg-white hover:border-brand/30"
                    }`}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {checked.has(item.id)
                        ? <CheckSquare size={20} className="text-brand" />
                        : <Square size={20} className="text-gray-300" />
                      }
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <p className={`text-sm font-medium leading-snug ${checked.has(item.id) ? "text-gray-400 line-through" : "text-gray-900"}`}>
                          {item.text}
                        </p>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${PRIORITÄT_STYLE[item.priorität]}`}>
                          {PRIORITÄT_LABEL[item.priorität]}
                        </span>
                      </div>
                      {item.info && (
                        <p className="text-xs text-gray-400 mt-1">{item.info}</p>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {checked.size > 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-brand font-medium mt-3 text-center"
                >
                  {checked.size} von {checkliste.length} erledigt – gut gemacht!
                </motion.p>
              )}
            </div>

            {/* WEITERE LEISTUNGEN */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Alle Leistungen mit {PG_LABELS[pflegegrad]}
              </p>
              <div className="grid sm:grid-cols-2 gap-2">
                {PG_LEISTUNGEN[pflegegrad]?.map((l) => (
                  <div key={l.name} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-2.5">
                    <span className="text-sm text-gray-700">{l.name}</span>
                    <span className="text-xs text-brand font-semibold">{l.betrag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* LEAD FORM */}
            <div className="border-t border-[#E0EDE7] pt-8">
              <LeadForm
                title="Wir helfen euch die Checkliste abzuhaken"
                subtitle="Kostenlos, persönlich – auf dein Tempo."
                cta="Jetzt kostenlos melden"
                path="pfad-b"
                pflegegrad={`PG ${pflegegrad}`}
              />
            </div>

            <button onClick={() => setStep(2)} className="btn-ghost">← Zurück</button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
