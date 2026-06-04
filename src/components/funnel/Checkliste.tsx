"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, CheckSquare, Square, Package, Bell } from "lucide-react";

interface ChecklistItem {
  id: string;
  titel: string;
  erklaerung: string;
  naechsterSchritt: string;
  empfehlung?: {
    produkt: "pflegebox" | "hausnotruf";
    text: string;
  };
  prioritaet: "sofort" | "bald" | "optional";
}

const ALLE_ITEMS: ChecklistItem[] = [
  {
    id: "familienmitglieder",
    titel: "Sind alle Familienmitglieder informiert und eingeteilt?",
    erklaerung: "Aus unserer Erfahrung: Unklare Zuständigkeiten sind eine der häufigsten Ursachen für Konflikte in der Familie. Wer übernimmt welche Aufgabe? Wer ist die Hauptansprechperson? Das muss nicht perfekt sein – aber es muss besprochen sein.",
    naechsterSchritt: "Plant ein kurzes Familiengespräch. Schreibt auf wer was übernimmt – auch wenn es sich komisch anfühlt. Es hilft.",
    prioritaet: "sofort",
  },
  {
    id: "einkaufe",
    titel: "Habt ihr eine Regelung für Einkäufe, Kochen und Haushalt?",
    erklaerung: "Alltägliche Aufgaben wie Einkaufen und Kochen werden schnell zur dauerhaften Last – besonders wenn sie immer bei derselben Person landen. Eine klare Regelung, auch mit externen Diensten, entlastet alle.",
    naechsterSchritt: "Prüfe ob der Entlastungsbetrag (131 € / Monat) genutzt wird – damit kann Haushaltshilfe finanziert werden.",
    prioritaet: "sofort",
  },
  {
    id: "alleine",
    titel: "Wie fühlt ihr euch wenn die Person alleine zuhause ist?",
    erklaerung: "Viele pflegende Angehörige berichten: das schlechte Gewissen wenn man weg ist, ist fast schlimmer als die Pflege selbst. Ein Hausnotruf gibt beiden Seiten Sicherheit – und dir die Freiheit, auch mal kurz weg zu gehen.",
    naechsterSchritt: "Einen Hausnotruf-Anbieter anfragen – die Pflegekasse zahlt 25,50 € / Monat, bei günstigen Anbietern entstehen keine Kosten.",
    empfehlung: {
      produkt: "hausnotruf",
      text: "Hausnotruf ab 0 € / Monat – Pflegekasse zahlt",
    },
    prioritaet: "sofort",
  },
  {
    id: "pflegehilfsmittel",
    titel: "Habt ihr Pflegehilfsmittel zuhause?",
    erklaerung: "Handschuhe, Desinfektionsmittel, Bettschutzeinlagen – Dinge die man regelmäßig braucht und die überraschend schnell leer sind. Die Pflegebox kommt automatisch jeden Monat und wird vollständig von der Pflegekasse bezahlt.",
    naechsterSchritt: "Pflegebox beantragen – geht in 5 Minuten, kostet nichts.",
    empfehlung: {
      produkt: "pflegebox",
      text: "Pflegebox 42 € / Monat – komplett kostenlos",
    },
    prioritaet: "sofort",
  },
  {
    id: "dokumente",
    titel: "Weiß jemand wo die wichtigen Dokumente sind?",
    erklaerung: "Im Notfall zählt jede Minute: Wo ist der Personalausweis? Die Krankenversicherungskarte? Die Patientenverfügung? Das Vorsorgedokument? Wer hat Vollmacht? Diese Fragen sollte man nicht zum ersten Mal im Notfall stellen.",
    naechsterSchritt: "Eine Dokumentenmappe anlegen mit: Ausweis, Krankenversicherungskarte, Pflegegrad-Bescheid, Patientenverfügung, Vollmacht, Notfallkontakte.",
    prioritaet: "sofort",
  },
  {
    id: "pflegekasse",
    titel: "Habt ihr die Pflegekasse schon kontaktiert?",
    erklaerung: "Jede Pflegekasse ist verpflichtet, kostenlose Pflegeberatung anzubieten (§7a SGB XI). Das ist kein Verkaufsgespräch – das ist euer Recht. Ein Berater kann zuhause vorbeikommen und euch helfen einen Überblick zu bekommen.",
    naechsterSchritt: "Pflegekasse anrufen und einen Beratungstermin nach §7a SGB XI anfragen – kostenlos, auch zuhause möglich.",
    prioritaet: "bald",
  },
  {
    id: "entlastungsbetrag",
    titel: "Nutzt ihr den Entlastungsbetrag?",
    erklaerung: "131 € pro Monat für Alltagshilfe – und viele wissen es nicht oder beantragen es nicht. Das Geld kann für Haushaltshilfe, Betreuung, Fahrten zum Arzt oder Begleitung genutzt werden. Nicht genutzte Beträge verfallen am Jahresende.",
    naechsterSchritt: "Einen anerkannten Anbieter für Alltagsbegleitung finden und Rechnungen bei der Pflegekasse einreichen.",
    prioritaet: "bald",
  },
  {
    id: "notfallkontakte",
    titel: "Gibt es eine Notfallkontaktliste?",
    erklaerung: "Im Notfall – sei es ein Sturz, eine akute Verwirrtheit oder ein medizinischer Zwischenfall – sollte jeder sofort wissen wen er anruft. Das gilt für die pflegebedürftige Person selbst genauso wie für Nachbarn oder Besuchsdienste.",
    naechsterSchritt: "Eine kurze Liste erstellen: Hausarzt, Pflegedienst, Familie, Nachbar, Pflegekasse – gut sichtbar aufhängen.",
    prioritaet: "bald",
  },
  {
    id: "auszeit",
    titel: "Habt ihr Regelungen für Auszeiten der pflegenden Person?",
    erklaerung: "Pflege ist ein Marathon, kein Sprint. Wer dauerhaft pflegt ohne Pausen brennt aus. Verhinderungspflege (bis 1.612 € / Jahr) ist genau dafür da – damit du Urlaub machen kannst, krank sein darfst, oder einfach mal Luft holst.",
    naechsterSchritt: "Verhinderungspflege bei der Pflegekasse anfragen – du brauchst nur einen Nachweis dass jemand anderes übernimmt.",
    prioritaet: "optional",
  },
];

const PRIORITAET_STYLE: Record<string, string> = {
  sofort: "bg-brand text-white",
  bald: "bg-amber-50 text-amber-700 border border-amber-200",
  optional: "bg-gray-100 text-gray-500",
};

const PRIORITAET_LABEL: Record<string, string> = {
  sofort: "Sofort",
  bald: "Diese Woche",
  optional: "Wenn Zeit ist",
};

const PRODUKT_ICONS = {
  pflegebox: <Package size={16} />,
  hausnotruf: <Bell size={16} />,
};

export default function Checkliste() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<string | null>(null);

  function toggleCheck(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  }

  function toggleExpand(id: string) {
    setExpanded((prev) => prev === id ? null : id);
  }

  const erledigtCount = checked.size;
  const total = ALLE_ITEMS.length;

  return (
    <div className="space-y-3">
      {/* Fortschritt */}
      {erledigtCount > 0 && (
        <div className="flex items-center gap-3 p-4 bg-brand-light rounded-xl mb-2">
          <div className="flex-1">
            <div className="h-1.5 bg-brand/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand rounded-full transition-all duration-500"
                style={{ width: `${(erledigtCount / total) * 100}%` }}
              />
            </div>
          </div>
          <span className="text-xs font-semibold text-brand">{erledigtCount}/{total}</span>
        </div>
      )}

      {ALLE_ITEMS.map((item) => {
        const isChecked = checked.has(item.id);
        const isExpanded = expanded === item.id;

        return (
          <div
            key={item.id}
            className={`rounded-[12px] border transition-all ${
              isChecked ? "border-brand/20 bg-brand-light/30" : "border-[#E0EDE7] bg-white"
            }`}
          >
            {/* Header */}
            <div className="flex items-start gap-3 p-4">
              <button
                onClick={() => toggleCheck(item.id)}
                className="flex-shrink-0 mt-0.5"
              >
                {isChecked
                  ? <CheckSquare size={20} className="text-brand" />
                  : <Square size={20} className="text-gray-300" />
                }
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-sm font-medium leading-snug ${isChecked ? "line-through text-gray-400" : "text-gray-900"}`}>
                    {item.titel}
                  </p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${PRIORITAET_STYLE[item.prioritaet]}`}>
                    {PRIORITAET_LABEL[item.prioritaet]}
                  </span>
                </div>
              </div>

              <button
                onClick={() => toggleExpand(item.id)}
                className="flex-shrink-0 text-gray-400 hover:text-brand transition-colors mt-0.5"
              >
                {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
            </div>

            {/* Aufgeklappt */}
            {isExpanded && (
              <div className="px-4 pb-4 border-t border-[#E0EDE7]">
                <p className="text-sm text-gray-600 leading-relaxed mt-3 mb-3">
                  {item.erklaerung}
                </p>

                <div className="bg-gray-50 rounded-xl p-3 mb-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Nächster Schritt
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">{item.naechsterSchritt}</p>
                </div>

                {item.empfehlung && (
                  <div className="flex items-center gap-3 bg-brand-light rounded-xl p-3">
                    <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white flex-shrink-0">
                      {PRODUKT_ICONS[item.empfehlung.produkt]}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-brand">{item.empfehlung.text}</p>
                      <p className="text-xs text-brand/70 mt-0.5">
                        {item.empfehlung.produkt === "hausnotruf"
                          ? "Pflegekasse übernimmt 25,50 € / Monat"
                          : "Vollständig von der Pflegekasse bezahlt"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
