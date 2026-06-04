// Offizielles NBA-Begutachtungsinstrument zur Pflegegradberechnung
// Grundlage: §15 SGB XI + Begutachtungsrichtlinien des MDS

export interface NBAFrage {
  id: string;
  text: string;
  optionen: { label: string; punkte: number }[];
}

export interface NBAModul {
  id: string;
  titel: string;
  gewichtung: number; // in Prozent
  beschreibung: string;
  fragen: NBAFrage[];
}

export const NBA_MODULE: NBAModul[] = [
  {
    id: "m1",
    titel: "Mobilität",
    gewichtung: 10,
    beschreibung: "Körperliche Bewegungsfähigkeit",
    fragen: [
      {
        id: "m1_1",
        text: "Positionswechsel im Bett (z.B. Drehen, Aufrichten)",
        optionen: [
          { label: "Selbstständig", punkte: 0 },
          { label: "Überwiegend selbstständig", punkte: 1 },
          { label: "Überwiegend unselbstständig", punkte: 2 },
          { label: "Unselbstständig", punkte: 3 },
        ],
      },
      {
        id: "m1_2",
        text: "Halten einer stabilen Sitzposition",
        optionen: [
          { label: "Selbstständig", punkte: 0 },
          { label: "Überwiegend selbstständig", punkte: 1 },
          { label: "Überwiegend unselbstständig", punkte: 2 },
          { label: "Unselbstständig", punkte: 3 },
        ],
      },
      {
        id: "m1_3",
        text: "Umsetzen (z.B. vom Bett in den Rollstuhl)",
        optionen: [
          { label: "Selbstständig", punkte: 0 },
          { label: "Überwiegend selbstständig", punkte: 1 },
          { label: "Überwiegend unselbstständig", punkte: 2 },
          { label: "Unselbstständig", punkte: 3 },
        ],
      },
      {
        id: "m1_4",
        text: "Fortbewegen innerhalb des Wohnbereichs",
        optionen: [
          { label: "Selbstständig", punkte: 0 },
          { label: "Überwiegend selbstständig", punkte: 1 },
          { label: "Überwiegend unselbstständig", punkte: 2 },
          { label: "Unselbstständig", punkte: 3 },
        ],
      },
      {
        id: "m1_5",
        text: "Treppensteigen",
        optionen: [
          { label: "Selbstständig", punkte: 0 },
          { label: "Überwiegend selbstständig", punkte: 1 },
          { label: "Überwiegend unselbstständig", punkte: 2 },
          { label: "Unselbstständig", punkte: 3 },
        ],
      },
    ],
  },
  {
    id: "m2",
    titel: "Kognitive & kommunikative Fähigkeiten",
    gewichtung: 15,
    beschreibung: "Geistige Fähigkeiten und Kommunikation",
    fragen: [
      {
        id: "m2_1",
        text: "Erkennen von Personen aus dem näheren Umfeld",
        optionen: [
          { label: "Vorhanden", punkte: 0 },
          { label: "Größtenteils vorhanden", punkte: 1 },
          { label: "In geringem Maße vorhanden", punkte: 2 },
          { label: "Nicht vorhanden", punkte: 3 },
        ],
      },
      {
        id: "m2_2",
        text: "Örtliche Orientierung (weiß wo er/sie sich befindet)",
        optionen: [
          { label: "Vorhanden", punkte: 0 },
          { label: "Größtenteils vorhanden", punkte: 1 },
          { label: "In geringem Maße vorhanden", punkte: 2 },
          { label: "Nicht vorhanden", punkte: 3 },
        ],
      },
      {
        id: "m2_3",
        text: "Zeitliche Orientierung (Tageszeit, Wochentag, Jahreszeit)",
        optionen: [
          { label: "Vorhanden", punkte: 0 },
          { label: "Größtenteils vorhanden", punkte: 1 },
          { label: "In geringem Maße vorhanden", punkte: 2 },
          { label: "Nicht vorhanden", punkte: 3 },
        ],
      },
      {
        id: "m2_4",
        text: "Erinnern an wesentliche Ereignisse / Beobachtungen",
        optionen: [
          { label: "Vorhanden", punkte: 0 },
          { label: "Größtenteils vorhanden", punkte: 1 },
          { label: "In geringem Maße vorhanden", punkte: 2 },
          { label: "Nicht vorhanden", punkte: 3 },
        ],
      },
      {
        id: "m2_5",
        text: "Steuern von mehrschrittigen Alltagshandlungen",
        optionen: [
          { label: "Vorhanden", punkte: 0 },
          { label: "Größtenteils vorhanden", punkte: 1 },
          { label: "In geringem Maße vorhanden", punkte: 2 },
          { label: "Nicht vorhanden", punkte: 3 },
        ],
      },
      {
        id: "m2_6",
        text: "Treffen von Entscheidungen im Alltag",
        optionen: [
          { label: "Vorhanden", punkte: 0 },
          { label: "Größtenteils vorhanden", punkte: 1 },
          { label: "In geringem Maße vorhanden", punkte: 2 },
          { label: "Nicht vorhanden", punkte: 3 },
        ],
      },
      {
        id: "m2_7",
        text: "Verstehen von Aufforderungen",
        optionen: [
          { label: "Vorhanden", punkte: 0 },
          { label: "Größtenteils vorhanden", punkte: 1 },
          { label: "In geringem Maße vorhanden", punkte: 2 },
          { label: "Nicht vorhanden", punkte: 3 },
        ],
      },
      {
        id: "m2_8",
        text: "Beteiligen an einem Gespräch",
        optionen: [
          { label: "Vorhanden", punkte: 0 },
          { label: "Größtenteils vorhanden", punkte: 1 },
          { label: "In geringem Maße vorhanden", punkte: 2 },
          { label: "Nicht vorhanden", punkte: 3 },
        ],
      },
    ],
  },
  {
    id: "m3",
    titel: "Verhaltensweisen & psychische Problemlagen",
    gewichtung: 15,
    beschreibung: "Herausfordernde Verhaltensweisen und psychische Belastungen",
    fragen: [
      {
        id: "m3_1",
        text: "Motorisch geprägte Verhaltensauffälligkeiten (z.B. rastloses Umherlaufen)",
        optionen: [
          { label: "Nie oder sehr selten", punkte: 0 },
          { label: "Selten (1–3x pro Woche)", punkte: 1 },
          { label: "Häufig (mehrmals pro Woche)", punkte: 2 },
          { label: "Täglich", punkte: 3 },
        ],
      },
      {
        id: "m3_2",
        text: "Nächtliche Unruhe",
        optionen: [
          { label: "Nie oder sehr selten", punkte: 0 },
          { label: "Selten (1–3x pro Woche)", punkte: 1 },
          { label: "Häufig (mehrmals pro Woche)", punkte: 2 },
          { label: "Täglich", punkte: 3 },
        ],
      },
      {
        id: "m3_3",
        text: "Selbstschädigendes oder autoaggressives Verhalten",
        optionen: [
          { label: "Nie oder sehr selten", punkte: 0 },
          { label: "Selten (1–3x pro Woche)", punkte: 1 },
          { label: "Häufig (mehrmals pro Woche)", punkte: 2 },
          { label: "Täglich", punkte: 3 },
        ],
      },
      {
        id: "m3_4",
        text: "Beschädigen von Gegenständen",
        optionen: [
          { label: "Nie oder sehr selten", punkte: 0 },
          { label: "Selten (1–3x pro Woche)", punkte: 1 },
          { label: "Häufig (mehrmals pro Woche)", punkte: 2 },
          { label: "Täglich", punkte: 3 },
        ],
      },
      {
        id: "m3_5",
        text: "Physisch aggressives Verhalten gegenüber anderen",
        optionen: [
          { label: "Nie oder sehr selten", punkte: 0 },
          { label: "Selten (1–3x pro Woche)", punkte: 1 },
          { label: "Häufig (mehrmals pro Woche)", punkte: 2 },
          { label: "Täglich", punkte: 3 },
        ],
      },
      {
        id: "m3_6",
        text: "Depressive Stimmungslage",
        optionen: [
          { label: "Nie oder sehr selten", punkte: 0 },
          { label: "Selten (1–3x pro Woche)", punkte: 1 },
          { label: "Häufig (mehrmals pro Woche)", punkte: 2 },
          { label: "Täglich", punkte: 3 },
        ],
      },
      {
        id: "m3_7",
        text: "Ängste",
        optionen: [
          { label: "Nie oder sehr selten", punkte: 0 },
          { label: "Selten (1–3x pro Woche)", punkte: 1 },
          { label: "Häufig (mehrmals pro Woche)", punkte: 2 },
          { label: "Täglich", punkte: 3 },
        ],
      },
    ],
  },
  {
    id: "m4",
    titel: "Selbstversorgung",
    gewichtung: 40,
    beschreibung: "Körperpflege, Ernährung und Ausscheidung",
    fragen: [
      {
        id: "m4_1",
        text: "Waschen des vorderen Oberkörpers",
        optionen: [
          { label: "Selbstständig", punkte: 0 },
          { label: "Überwiegend selbstständig", punkte: 1 },
          { label: "Überwiegend unselbstständig", punkte: 2 },
          { label: "Unselbstständig", punkte: 3 },
        ],
      },
      {
        id: "m4_2",
        text: "Körperpflege im Bereich des Kopfes (Kämmen, Rasieren, Zahnpflege)",
        optionen: [
          { label: "Selbstständig", punkte: 0 },
          { label: "Überwiegend selbstständig", punkte: 1 },
          { label: "Überwiegend unselbstständig", punkte: 2 },
          { label: "Unselbstständig", punkte: 3 },
        ],
      },
      {
        id: "m4_3",
        text: "Waschen des Intimbereichs",
        optionen: [
          { label: "Selbstständig", punkte: 0 },
          { label: "Überwiegend selbstständig", punkte: 1 },
          { label: "Überwiegend unselbstständig", punkte: 2 },
          { label: "Unselbstständig", punkte: 3 },
        ],
      },
      {
        id: "m4_4",
        text: "Duschen und Baden",
        optionen: [
          { label: "Selbstständig", punkte: 0 },
          { label: "Überwiegend selbstständig", punkte: 1 },
          { label: "Überwiegend unselbstständig", punkte: 2 },
          { label: "Unselbstständig", punkte: 3 },
        ],
      },
      {
        id: "m4_5",
        text: "An- und Auskleiden des Oberkörpers",
        optionen: [
          { label: "Selbstständig", punkte: 0 },
          { label: "Überwiegend selbstständig", punkte: 1 },
          { label: "Überwiegend unselbstständig", punkte: 2 },
          { label: "Unselbstständig", punkte: 3 },
        ],
      },
      {
        id: "m4_6",
        text: "An- und Auskleiden des Unterkörpers",
        optionen: [
          { label: "Selbstständig", punkte: 0 },
          { label: "Überwiegend selbstständig", punkte: 1 },
          { label: "Überwiegend unselbstständig", punkte: 2 },
          { label: "Unselbstständig", punkte: 3 },
        ],
      },
      {
        id: "m4_7",
        text: "Mundgerechtes Zubereiten der Nahrung",
        optionen: [
          { label: "Selbstständig", punkte: 0 },
          { label: "Überwiegend selbstständig", punkte: 1 },
          { label: "Überwiegend unselbstständig", punkte: 2 },
          { label: "Unselbstständig", punkte: 3 },
        ],
      },
      {
        id: "m4_8",
        text: "Essen und Trinken",
        optionen: [
          { label: "Selbstständig", punkte: 0 },
          { label: "Überwiegend selbstständig", punkte: 1 },
          { label: "Überwiegend unselbstständig", punkte: 2 },
          { label: "Unselbstständig", punkte: 3 },
        ],
      },
      {
        id: "m4_9",
        text: "Benutzen einer Toilette oder eines Toilettenstuhls",
        optionen: [
          { label: "Selbstständig", punkte: 0 },
          { label: "Überwiegend selbstständig", punkte: 1 },
          { label: "Überwiegend unselbstständig", punkte: 2 },
          { label: "Unselbstständig", punkte: 3 },
        ],
      },
      {
        id: "m4_10",
        text: "Bewältigung von Harninkontinenz / Umgang mit Dauerkatheter",
        optionen: [
          { label: "Selbstständig / Nicht relevant", punkte: 0 },
          { label: "Überwiegend selbstständig", punkte: 1 },
          { label: "Überwiegend unselbstständig", punkte: 2 },
          { label: "Unselbstständig", punkte: 3 },
        ],
      },
      {
        id: "m4_11",
        text: "Bewältigung von Stuhlinkontinenz",
        optionen: [
          { label: "Selbstständig / Nicht relevant", punkte: 0 },
          { label: "Überwiegend selbstständig", punkte: 1 },
          { label: "Überwiegend unselbstständig", punkte: 2 },
          { label: "Unselbstständig", punkte: 3 },
        ],
      },
    ],
  },
  {
    id: "m5",
    titel: "Umgang mit krankheitsbedingten Anforderungen",
    gewichtung: 20,
    beschreibung: "Medizinische Behandlungen und Therapien",
    fragen: [
      {
        id: "m5_1",
        text: "Einhalten einer Diät oder anderer krankheitsbedingter Verhaltensvorschriften",
        optionen: [
          { label: "Selbstständig / Nicht relevant", punkte: 0 },
          { label: "Überwiegend selbstständig", punkte: 1 },
          { label: "Überwiegend unselbstständig", punkte: 2 },
          { label: "Unselbstständig", punkte: 3 },
        ],
      },
      {
        id: "m5_2",
        text: "Körperbezogene Pflege und Wundversorgung",
        optionen: [
          { label: "Selbstständig / Nicht relevant", punkte: 0 },
          { label: "Überwiegend selbstständig", punkte: 1 },
          { label: "Überwiegend unselbstständig", punkte: 2 },
          { label: "Unselbstständig", punkte: 3 },
        ],
      },
      {
        id: "m5_3",
        text: "Selbstständige Medikamentengabe",
        optionen: [
          { label: "Selbstständig / Nicht relevant", punkte: 0 },
          { label: "Überwiegend selbstständig", punkte: 1 },
          { label: "Überwiegend unselbstständig", punkte: 2 },
          { label: "Unselbstständig", punkte: 3 },
        ],
      },
      {
        id: "m5_4",
        text: "Arzt- und Therapiebesuche wahrnehmen",
        optionen: [
          { label: "Selbstständig", punkte: 0 },
          { label: "Überwiegend selbstständig", punkte: 1 },
          { label: "Überwiegend unselbstständig", punkte: 2 },
          { label: "Unselbstständig", punkte: 3 },
        ],
      },
      {
        id: "m5_5",
        text: "Umgang mit Hilfsmitteln (z.B. Rollstuhl, Prothese, Hörgerät)",
        optionen: [
          { label: "Selbstständig / Nicht relevant", punkte: 0 },
          { label: "Überwiegend selbstständig", punkte: 1 },
          { label: "Überwiegend unselbstständig", punkte: 2 },
          { label: "Unselbstständig", punkte: 3 },
        ],
      },
    ],
  },
  {
    id: "m6",
    titel: "Gestaltung des Alltagslebens & soziale Kontakte",
    gewichtung: 15,
    beschreibung: "Tagesstruktur und Teilhabe am sozialen Leben",
    fragen: [
      {
        id: "m6_1",
        text: "Gestaltung des Tagesablaufs und Anpassen an Veränderungen",
        optionen: [
          { label: "Selbstständig", punkte: 0 },
          { label: "Überwiegend selbstständig", punkte: 1 },
          { label: "Überwiegend unselbstständig", punkte: 2 },
          { label: "Unselbstständig", punkte: 3 },
        ],
      },
      {
        id: "m6_2",
        text: "Ruhen und Schlafen",
        optionen: [
          { label: "Selbstständig", punkte: 0 },
          { label: "Überwiegend selbstständig", punkte: 1 },
          { label: "Überwiegend unselbstständig", punkte: 2 },
          { label: "Unselbstständig", punkte: 3 },
        ],
      },
      {
        id: "m6_3",
        text: "Sich beschäftigen (Hobbys, Interessen)",
        optionen: [
          { label: "Selbstständig", punkte: 0 },
          { label: "Überwiegend selbstständig", punkte: 1 },
          { label: "Überwiegend unselbstständig", punkte: 2 },
          { label: "Unselbstständig", punkte: 3 },
        ],
      },
      {
        id: "m6_4",
        text: "Vornehmen von in die Zukunft gerichteten Planungen",
        optionen: [
          { label: "Selbstständig", punkte: 0 },
          { label: "Überwiegend selbstständig", punkte: 1 },
          { label: "Überwiegend unselbstständig", punkte: 2 },
          { label: "Unselbstständig", punkte: 3 },
        ],
      },
      {
        id: "m6_5",
        text: "Interaktion mit Personen im direkten Kontakt",
        optionen: [
          { label: "Selbstständig", punkte: 0 },
          { label: "Überwiegend selbstständig", punkte: 1 },
          { label: "Überwiegend unselbstständig", punkte: 2 },
          { label: "Unselbstständig", punkte: 3 },
        ],
      },
      {
        id: "m6_6",
        text: "Kontaktpflege zu Personen außerhalb des direkten Umfelds",
        optionen: [
          { label: "Selbstständig", punkte: 0 },
          { label: "Überwiegend selbstständig", punkte: 1 },
          { label: "Überwiegend unselbstständig", punkte: 2 },
          { label: "Unselbstständig", punkte: 3 },
        ],
      },
    ],
  },
];

// Berechnung nach offizieller NBA-Methode
// IDs von Items die "nicht relevant" sein können (Modul 5)
// Bei diesen zählt Antwort 0 nicht als "selbstständig" sondern als "nicht betroffen"
// → werden aus dem Nenner herausgerechnet wenn 0 beantwortet
const ENTFAELLT_ITEMS = new Set(["m5_1", "m5_2", "m5_3", "m5_5"]);

export function berechneNBA(antworten: Record<string, number>): {
  gesamtpunkte: number;
  pflegegrad: number;
  modulPunkte: Record<string, number>;
  modulProzent: Record<string, number>;
} {
  const modulPunkte: Record<string, number> = {};
  const modulProzent: Record<string, number> = {};

  for (const modul of NBA_MODULE) {
    const fragen = modul.fragen;
    let erreichtePunkte = 0;
    let maxPunkte = 0;

    for (const frage of fragen) {
      const antwort = antworten[frage.id] ?? 0;
      // "Nicht relevant" Items (Antwort 0) aus Modul 5 nicht in Nenner einrechnen
      if (ENTFAELLT_ITEMS.has(frage.id) && antwort === 0) {
        continue; // überspringen – zählt weder als gut noch als schlecht
      }
      erreichtePunkte += antwort;
      maxPunkte += 3;
    }

    const modulProzentWert = maxPunkte > 0 ? (erreichtePunkte / maxPunkte) * 100 : 0;
    modulPunkte[modul.id] = erreichtePunkte;
    modulProzent[modul.id] = modulProzentWert;
  }

  // Module 2 und 3 werden kombiniert: höherer Wert zählt
  const m2 = modulProzent["m2"] ?? 0;
  const m3 = modulProzent["m3"] ?? 0;
  const kombiniert = Math.max(m2, m3);

  const gesamtpunkte =
    (modulProzent["m1"] ?? 0) * 0.10 +
    kombiniert * 0.15 +
    (modulProzent["m4"] ?? 0) * 0.40 +
    (modulProzent["m5"] ?? 0) * 0.20 +
    (modulProzent["m6"] ?? 0) * 0.15;

  let pflegegrad = 0;
  if (gesamtpunkte >= 12.5 && gesamtpunkte < 27) pflegegrad = 1;
  else if (gesamtpunkte >= 27 && gesamtpunkte < 47.5) pflegegrad = 2;
  else if (gesamtpunkte >= 47.5 && gesamtpunkte < 70) pflegegrad = 3;
  else if (gesamtpunkte >= 70 && gesamtpunkte < 90) pflegegrad = 4;
  else if (gesamtpunkte >= 90) pflegegrad = 5;

  return { gesamtpunkte, pflegegrad, modulPunkte, modulProzent };
}
