"use client";

import { useState } from "react";
import {
  ChevronDown, ChevronUp, CheckSquare, Square,
  Package, Bell, FileCheck, Home, Stethoscope,
  Scale, FolderOpen, Heart, Calendar, Phone, Users
} from "lucide-react";

interface ChecklistItem {
  id: string;
  titel: string;
  erklaerung: string;
  punkte: string[];
  empfehlung?: {
    produkt: "pflegebox" | "hausnotruf";
    text: string;
    info: string;
  };
  prioritaet: "sofort" | "bald" | "optional";
}

interface ChecklistKategorie {
  id: string;
  titel: string;
  icon: React.ReactNode;
  items: ChecklistItem[];
}

const KATEGORIEN: ChecklistKategorie[] = [
  {
    id: "bescheid",
    titel: "Direkt nach dem Pflegegrad-Bescheid",
    icon: <FileCheck size={18} className="text-brand" />,
    items: [
      {
        id: "bescheid_pruefen",
        titel: "Bescheid genau prüfen",
        erklaerung: "Welcher Pflegegrad wurde bewilligt, ab welchem Datum, welche Leistungen sind genannt? Wenn der Pflegegrad zu niedrig wirkt, kann man Widerspruch einlegen. Das lohnt sich in ca. 35% der Fälle.",
        punkte: [
          "Bescheid abheften oder scannen",
          "Frist für Widerspruch prüfen (1 Monat ab Bescheid)",
          "Pflegegutachten anfordern, falls nicht dabei",
          "Prüfen ob der Pflegebedarf realistisch abgebildet wurde",
          "Bei Verschlechterung später Höherstufung beantragen",
        ],
        prioritaet: "sofort",
      },
    ],
  },
  {
    id: "pflege_entscheidung",
    titel: "Entscheiden: Pflege zu Hause, Pflegedienst oder Heim?",
    icon: <Home size={18} className="text-brand" />,
    items: [
      {
        id: "wohnform",
        titel: "Wohnsituation und Pflegeform klären",
        erklaerung: "Klärt ehrlich was realistisch ist. Pflegegeld und Pflegesachleistungen können auch kombiniert werden – nicht vorschnell nur eine Variante wählen.",
        punkte: [
          "Kann die Person noch alleine wohnen?",
          "Gibt es Angehörige die regelmäßig helfen können?",
          "Braucht ihr morgens/abends Hilfe?",
          "Ist Körperpflege, Anziehen, Essen, Medikamente, Haushalt betroffen?",
          "Gibt es Demenz, Sturzgefahr oder Weglauftendenzen?",
          "Ist nachts Hilfe nötig?",
        ],
        prioritaet: "sofort",
      },
    ],
  },
  {
    id: "leistungen",
    titel: "Leistungen bei der Pflegekasse beantragen",
    icon: <Package size={18} className="text-brand" />,
    items: [
      {
        id: "pflegebox_item",
        titel: "Pflegehilfsmittel (Pflegebox) beantragen",
        erklaerung: "Handschuhe, Desinfektion, Bettschutzeinlagen – jeden Monat nach Hause, vollständig von der Pflegekasse bezahlt. Geht in 5 Minuten. Ab Pflegegrad 1.",
        punkte: [
          "Pflegehilfsmittel-Anbieter kontaktieren",
          "Formular ausfüllen: Name, Adresse, Pflegekasse, Pflegegrad",
          "Automatische monatliche Lieferung",
        ],
        empfehlung: { produkt: "pflegebox", text: "Pflegebox – 42 € / Monat kostenlos", info: "Vollständig von der Pflegekasse bezahlt" },
        prioritaet: "sofort",
      },
      {
        id: "hausnotruf_item",
        titel: "Hausnotruf beantragen",
        erklaerung: "Pflegekasse zahlt 25,50 € / Monat Zuschuss. Bei günstigen Anbietern entstehen keine Kosten. Gibt beiden Seiten Sicherheit. Ab Pflegegrad 1.",
        punkte: [
          "Anbieter anfragen",
          "Antrag bei der Pflegekasse stellen (§40 SGB XI)",
          "Genehmigung dauert ca. 3–5 Werktage",
        ],
        empfehlung: { produkt: "hausnotruf", text: "Hausnotruf – ab 0 € / Monat", info: "Pflegekasse zahlt 25,50 € / Monat Zuschuss" },
        prioritaet: "sofort",
      },
      {
        id: "entlastungsbetrag_item",
        titel: "Entlastungsbetrag nutzen (131 € / Monat)",
        erklaerung: "Für Alltagsbegleitung, Haushaltshilfe, Fahrten. Das Geld kommt nicht automatisch – es muss aktiv genutzt werden. Nicht genutzte Beträge verfallen am Jahresende. Ab Pflegegrad 1.",
        punkte: [
          "Anerkannten Anbieter für Alltagsbegleitung finden",
          "Rechnungen einsammeln und bei Pflegekasse einreichen",
          "Tipp: Beträge können angespart werden (bis zum nächsten Quartal)",
        ],
        prioritaet: "sofort",
      },
      {
        id: "weitere_leistungen",
        titel: "Weitere Leistungen prüfen und beantragen",
        erklaerung: "Nicht alles kommt automatisch. Bei der Pflegekasse aktiv nachfragen.",
        punkte: [
          "Pflegegeld (ab PG 2 – wenn Angehörige pflegen)",
          "Pflegesachleistungen für ambulanten Pflegedienst",
          "Kombinationsleistung (Pflegegeld + Sachleistung)",
          "Tagespflege / Nachtpflege",
          "Kurzzeitpflege",
          "Verhinderungspflege (bis 1.612 € / Jahr)",
          "Pflegekurse für Angehörige (kostenlos)",
          "Beratungseinsatz §37.3 (bei Pflegegeld verpflichtend)",
        ],
        prioritaet: "bald",
      },
    ],
  },
  {
    id: "wohnung",
    titel: "Wohnung und Sicherheit prüfen",
    icon: <Home size={18} className="text-brand" />,
    items: [
      {
        id: "sturzsicherheit",
        titel: "Sturzsicherheit zuhause herstellen",
        erklaerung: "Viele Pflegefälle werden durch Stürze schlimmer. Das ist einer der wichtigsten Punkte. Für wohnumfeldverbessernde Maßnahmen gibt es bis zu 4.180 € Zuschuss – aber: VOR dem Umbau beantragen!",
        punkte: [
          "Stolperfallen und Teppiche entfernen oder sichern",
          "Haltegriffe im Bad installieren",
          "Duschhocker und Toilettensitzerhöhung",
          "Rutschfeste Matten überall",
          "Nachtlicht",
          "Türschwellen reduzieren",
          "Badumbau prüfen",
          "Treppenlift, falls Treppen ein Problem sind",
          "Pflegebett prüfen",
        ],
        empfehlung: { produkt: "hausnotruf", text: "Hausnotruf – Sicherheitsnetz für zuhause", info: "Pflegekasse zahlt 25,50 € / Monat Zuschuss" },
        prioritaet: "sofort",
      },
    ],
  },
  {
    id: "medizin",
    titel: "Medizinische Versorgung organisieren",
    icon: <Stethoscope size={18} className="text-brand" />,
    items: [
      {
        id: "medizin_uebersicht",
        titel: "Medizinische Übersicht erstellen",
        erklaerung: "Eine einfache Übersicht aller medizinischen Informationen hilft im Alltag und ist im Notfall Gold wert.",
        punkte: [
          "Hausarzt und Fachärzte notieren",
          "Diagnosen dokumentieren",
          "Medikamentenplan mit Dosierung erstellen",
          "Allergien festhalten",
          "Krankenkassen- / Pflegekassendaten",
          "Notfallkontakte",
          "Letzte Arztbriefe sammeln",
          "Hilfsmittel wie Rollator, Rollstuhl, Inkontinenzmaterial klären",
        ],
        prioritaet: "sofort",
      },
      {
        id: "medizin_check",
        titel: "Medikamente und Therapien prüfen",
        erklaerung: "Regelmäßige Kontrolle verhindert Fehler und spart Aufwand.",
        punkte: [
          "Medikamentenplan aktuell?",
          "Werden Medikamente richtig eingenommen?",
          "Braucht ihr Pflegedienst für Medikamentengabe?",
          "Gibt es Physio, Ergo, Logopädie?",
          "Hilfsmittel auf Rezept vorhanden?",
        ],
        prioritaet: "bald",
      },
    ],
  },
  {
    id: "vollmachten",
    titel: "Vollmachten und rechtliche Themen",
    icon: <Scale size={18} className="text-brand" />,
    items: [
      {
        id: "vollmachten_item",
        titel: "Vollmachten und Verfügungen regeln",
        erklaerung: "Das wird oft zu spät gemacht. Solange die Person noch geschäftsfähig ist, unbedingt klären. Ihr solltet wissen, wer mit Ärzten, Pflegekasse, Bank und Behörden sprechen darf.",
        punkte: [
          "Vorsorgevollmacht erstellen",
          "Patientenverfügung erstellen",
          "Betreuungsverfügung",
          "Bankvollmacht",
          "Schweigepflichtentbindung für Ärzte",
          "Zugriff auf Krankenkasse / Pflegekasse klären",
          "Zugriff auf wichtige Unterlagen sicherstellen",
          "Testament, falls relevant",
        ],
        prioritaet: "sofort",
      },
    ],
  },
  {
    id: "unterlagen",
    titel: "Finanzen und Unterlagen sammeln",
    icon: <FolderOpen size={18} className="text-brand" />,
    items: [
      {
        id: "ordner",
        titel: "Pflege-Ordner anlegen",
        erklaerung: "Lege einen Pflege-Ordner an – digital oder physisch. Alles an einem Ort spart im Ernstfall viel Zeit und Stress.",
        punkte: [
          "Pflegegrad-Bescheid und Pflegegutachten",
          "Pflegekassen-/Krankenkassenbriefe",
          "Arztbriefe und Medikamentenplan",
          "Rechnungen und Rezepte",
          "Pflegedienstverträge",
          "Vollmachten",
          "Rentenbescheid",
          "Schwerbehindertenausweis (falls vorhanden)",
          "Mietvertrag / Wohnsituation",
          "Kontaktdaten aller Beteiligten",
        ],
        prioritaet: "bald",
      },
      {
        id: "schwerbehinderung",
        titel: "Schwerbehindertenausweis prüfen",
        erklaerung: "Oft unbekannt: Ein Schwerbehindertenausweis kann zusätzliche Vergünstigungen bringen (z.B. Steuervorteile, kostenloser ÖPNV). Das Verfahren läuft über das Versorgungsamt.",
        punkte: [
          "Beim Versorgungsamt beantragen",
          "Ärztliche Atteste einreichen",
          "GdB (Grad der Behinderung) prüfen lassen",
        ],
        prioritaet: "optional",
      },
    ],
  },
  {
    id: "entlastung",
    titel: "Entlastung für Angehörige einplanen",
    icon: <Heart size={18} className="text-brand" />,
    items: [
      {
        id: "auszeit",
        titel: "Auszeiten und Entlastung einplanen",
        erklaerung: "Viele unterschätzen wie belastend Pflege wird. Plant direkt Entlastung ein – nicht erst wenn alle fertig sind. Pflege ist ein Marathon, kein Sprint.",
        punkte: [
          "Ambulanten Pflegedienst für Teile der Pflege anfragen",
          "Tagespflege als Tagesstruktur einplanen",
          "Anerkannte Alltagsbegleiter und Nachbarschaftshilfe suchen",
          "Verhinderungspflege für Urlaub/Krankheit der Pflegeperson planen",
          "Kurzzeitpflege nach Krankenhaus oder in Krisen",
          "Pflegekurse für Angehörige nutzen (kostenlos)",
          "Angehörigengruppen suchen – z.B. für Demenz",
          "Klare Aufgabenverteilung in der Familie festlegen",
        ],
        prioritaet: "sofort",
      },
    ],
  },
  {
    id: "alltag",
    titel: "Alltag strukturieren",
    icon: <Calendar size={18} className="text-brand" />,
    items: [
      {
        id: "aufgaben",
        titel: "Aufgaben klären und aufteilen",
        erklaerung: "Eine einfache Tabelle reicht völlig: Wer macht was, wie oft? Das verhindert Missverständnisse und ungleiche Verteilung.",
        punkte: [
          "Wer kauft ein?",
          "Wer kocht?",
          "Wer macht Wäsche und putzt?",
          "Wer begleitet zu Ärzten?",
          "Wer kümmert sich um Rechnungen?",
          "Wer ruft regelmäßig an?",
          "Wer ist Notfallkontakt und hat Schlüssel?",
          "Gibt es Essen auf Rädern oder einen Fahrdienst?",
          "Gibt es einen Wochenplan?",
        ],
        prioritaet: "sofort",
      },
      {
        id: "organisation",
        titel: "Wie organisiert ihr euch als Familie?",
        erklaerung: "Kommunikation und Koordination sind entscheidend – gerade wenn mehrere Personen beteiligt sind.",
        punkte: [
          "WhatsApp-Gruppe oder Signal für schnelle Absprachen",
          "Pflegeapp nutzen (z.B. Caregiver, Pflege.de App)",
          "Geteilter Kalender (Google Calendar, iCal)",
          "Angehörigengruppen vor Ort – z.B. für Demenz (Alzheimer Gesellschaft)",
          "Online-Foren und Selbsthilfegruppen für pflegende Angehörige",
          "Regelmäßiges Familien-Update (kurz, monatlich)",
        ],
        prioritaet: "bald",
      },
    ],
  },
  {
    id: "beratung",
    titel: "Pflegeberatung nutzen",
    icon: <Phone size={18} className="text-brand" />,
    items: [
      {
        id: "beratung_item",
        titel: "Kostenlose Pflegeberatung anfragen",
        erklaerung: "Die Pflegekasse muss kostenlose Beratung anbieten – auch zuhause. Das ist kein Verkaufsgespräch, sondern euer Recht. Frag aktiv nach.",
        punkte: [
          "Pflegeberatung §7a bei der Pflegekasse anfragen",
          "Pflegestützpunkt in der Region suchen",
          "Liste zugelassener Pflegedienste anfordern",
          "Liste anerkannter Entlastungsangebote anfordern",
          "Leistungsübersicht passend zum Pflegegrad anfragen",
        ],
        prioritaet: "bald",
      },
    ],
  },
  {
    id: "begutachtung",
    titel: "Falls der Pflegegrad noch nicht final ist",
    icon: <Users size={18} className="text-brand" />,
    items: [
      {
        id: "mdk_vorbereitung",
        titel: "Vorbereitung auf den MDK-Besuch",
        erklaerung: "Der MDK-Besuch entscheidet über den Pflegegrad. Mit der richtigen Vorbereitung bekommt ihr den Pflegegrad der wirklich zutrifft. Nicht den guten Tag zeigen – den realen.",
        punkte: [
          "Pflegetagebuch führen (mind. 1–2 Wochen vorher)",
          "Alle Einschränkungen ehrlich dokumentieren",
          "Arztbriefe und Medikamente bereitlegen",
          "Angehöriger sollte beim MDK-Termin dabei sein",
          "Konkrete Beispiele nennen: Was klappt nicht mehr alleine?",
          "Nicht nur gute Tage zeigen – den Alltag zeigen",
        ],
        prioritaet: "sofort",
      },
    ],
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

export default function Checkliste() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<string | null>(null);
  const [openKat, setOpenKat] = useState<string | null>("bescheid");

  const allItems = KATEGORIEN.flatMap((k) => k.items);
  const total = allItems.length;
  const erledigtCount = checked.size;

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

  return (
    <div className="space-y-3">
      {/* Fortschritt */}
      <div className="flex items-center gap-3 p-4 bg-brand-light rounded-xl">
        <div className="flex-1">
          <div className="h-1.5 bg-brand/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand rounded-full transition-all duration-500"
              style={{ width: `${total > 0 ? (erledigtCount / total) * 100 : 0}%` }}
            />
          </div>
        </div>
        <span className="text-xs font-semibold text-brand whitespace-nowrap">
          {erledigtCount}/{total} erledigt
        </span>
      </div>

      {/* Kategorien */}
      {KATEGORIEN.map((kat) => {
        const katChecked = kat.items.filter((i) => checked.has(i.id)).length;
        const isOpen = openKat === kat.id;

        return (
          <div key={kat.id} className="border border-[#E0EDE7] rounded-[12px] overflow-hidden bg-white">
            {/* Kategorie Header */}
            <button
              onClick={() => setOpenKat(isOpen ? null : kat.id)}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-brand-light flex items-center justify-center flex-shrink-0">
                {kat.icon}
              </div>
              <span className="flex-1 font-semibold text-sm text-gray-900">{kat.titel}</span>
              {katChecked > 0 && (
                <span className="text-xs text-brand font-semibold">{katChecked}/{kat.items.length}</span>
              )}
              {isOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
            </button>

            {/* Items */}
            {isOpen && (
              <div className="border-t border-[#E0EDE7] divide-y divide-[#E0EDE7]">
                {kat.items.map((item) => {
                  const isChecked = checked.has(item.id);
                  const isExpanded = expanded === item.id;

                  return (
                    <div key={item.id} className={isChecked ? "bg-brand-light/20" : "bg-white"}>
                      {/* Item Header */}
                      <div className="flex items-start gap-3 px-4 py-3.5">
                        <button onClick={() => toggleCheck(item.id)} className="flex-shrink-0 mt-0.5">
                          {isChecked
                            ? <CheckSquare size={18} className="text-brand" />
                            : <Square size={18} className="text-gray-300" />
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
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      </div>

                      {/* Aufgeklappt */}
                      {isExpanded && (
                        <div className="px-4 pb-4 bg-gray-50/50">
                          <p className="text-sm text-gray-600 leading-relaxed mb-3">{item.erklaerung}</p>

                          <ul className="space-y-1.5 mb-3">
                            {item.punkte.map((p, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0 mt-2" />
                                {p}
                              </li>
                            ))}
                          </ul>

                          {item.empfehlung && (
                            <div className="flex items-center gap-3 bg-brand-light rounded-xl p-3">
                              <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white flex-shrink-0">
                                {item.empfehlung.produkt === "pflegebox"
                                  ? <Package size={16} />
                                  : <Bell size={16} />
                                }
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-brand">{item.empfehlung.text}</p>
                                <p className="text-xs text-brand/70 mt-0.5">{item.empfehlung.info}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
