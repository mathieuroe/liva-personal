export interface ContentItem {
  slug: string;
  titel: string;
  beschreibung: string;
  kategorie: string;
  lesezeit: string;
  datum: string;
  typ: "ratgeber" | "news";
  inhalt: string;
}

export const RATGEBER: ContentItem[] = [
  {
    slug: "erste-30-tage-mit-pflegegrad",
    titel: "Was tust du in den ersten 30 Tagen mit Pflegegrad?",
    beschreibung: "Du hast gerade den Bescheid bekommen und weißt nicht wo anfangen? Diese Checkliste zeigt dir die wichtigsten Schritte der ersten vier Wochen.",
    kategorie: "Erste Schritte",
    lesezeit: "5 Min.",
    datum: "Mai 2026",
    typ: "ratgeber",
    inhalt: `## Die ersten 30 Tage – deine Checkliste

Der Pflegegrad-Bescheid ist da. Herzlichen Glückwunsch – auch wenn das seltsam klingt. Denn jetzt hast du offiziell Anspruch auf Leistungen die echte Entlastung bringen.

### Woche 1: Die schnellen Gewinne

**Pflegebox beantragen** – geht in 5 Minuten, kostet nichts, kommt jeden Monat. 42 € für Handschuhe, Desinfektion, Bettschutz.

**Hausnotruf prüfen** – ab PG 1, Pflegekasse zahlt 27,00 € / Monat. Bei vielen Anbietern: 0 € Eigenanteil.

### Woche 2: Geld nicht verfallen lassen

**Entlastungsbetrag nutzen** – 131 € / Monat für Alltagshilfe. Nicht ausgegebene Beträge können ins nächste Quartal mitgenommen werden.

**Pflegegeld prüfen (ab PG 2)** – wenn Angehörige pflegen: 332–946 € / Monat direkt aufs Konto.

### Woche 3–4: Den Alltag strukturieren

- Pflegedienst-Angebote einholen falls nötig
- Wohnraumanpassungen planen (Haltegriffe, Duschumbau)
- Kostenlose Pflegeberatung bei der Pflegekasse buchen (§7a SGB XI)

### Das Wichtigste

Viele Leistungen verfallen wenn sie nicht rechtzeitig beantragt werden. Starte einfach – auch wenn noch nicht alles klar ist.`,
  },
  {
    slug: "pflegebox-beantragen",
    titel: "Pflegebox beantragen – so geht es in 5 Minuten",
    beschreibung: "Die Pflegebox ist die einfachste Leistung im Pflegesystem – und wird am häufigsten vergessen. Hier ist wie du sie in 5 Minuten beantragst.",
    kategorie: "Pflegebox",
    lesezeit: "3 Min.",
    datum: "Mai 2026",
    typ: "ratgeber",
    inhalt: `## Pflegebox in 5 Minuten beantragen

Die Pflegebox (§40 SGB XI) ist ein monatliches Paket mit Verbrauchsmaterialien für die häusliche Pflege. Die Pflegekasse erstattet bis zu **42 € pro Monat** – für alle Pflegegrade ab PG 1.

### Was ist drin?

- Einmalhandschuhe (Latex oder Vinyl)
- Bettschutzeinlagen / Matratzenschoner
- Händedesinfektionsmittel
- Flächendesinfektionsmittel
- Mundschutz / OP-Masken
- Einmalschürzen

### So geht's

1. Pflegehilfsmittel-Anbieter kontaktieren (liva hilft dabei)
2. Kurzes Formular: Name, Adresse, Krankenkasse, Pflegegrad
3. Anbieter stellt Antrag bei der Pflegekasse
4. Genehmigung kommt automatisch – erste Lieferung in 1–2 Wochen

### Was kostet das?

Nichts. Die Pflegekasse zahlt direkt an den Anbieter.`,
  },
  {
    slug: "entlastungsbetrag",
    titel: "Entlastungsbetrag: Was ist das und wer bekommt ihn?",
    beschreibung: "131 € pro Monat die viele nie nutzen. Was der Entlastungsbetrag ist, wofür du ihn einsetzen kannst und wie du ihn bekommst.",
    kategorie: "Finanzen",
    lesezeit: "4 Min.",
    datum: "April 2026",
    typ: "ratgeber",
    inhalt: `## Entlastungsbetrag – 131 € monatlich für alle ab PG 1

131 € pro Monat für qualifizierte Unterstützung im Alltag. Über 12 Monate sind das **1.572 €**.

Das Besondere: **Nicht genutzte Beträge können ins nächste Quartal mitgenommen werden.**

### Wofür kann ich ihn nutzen?

- Alltagsbegleitung und Betreuung
- Haushaltshilfe – Einkaufen, Putzen, Kochen
- Fahrdienste zu Ärzten
- Betreuungsgruppen und Tagespflege

Wichtig: Der Anbieter muss anerkannt sein (nach Landesrecht).

### Wie komme ich ans Geld?

1. Anerkannten Anbieter finden (liva hilft)
2. Leistungen in Anspruch nehmen
3. Rechnungen einsammeln
4. Bei der Pflegekasse einreichen
5. Erstattung in 2–4 Wochen`,
  },
  {
    slug: "hausnotruf",
    titel: "Hausnotruf – wann macht er Sinn und was kostet er wirklich?",
    beschreibung: "Die Pflegekasse zahlt 27,00 € pro Monat. Bei vielen Anbietern zahlst du damit gar nichts. Was du wissen musst.",
    kategorie: "Sicherheit",
    lesezeit: "4 Min.",
    datum: "April 2026",
    typ: "ratgeber",
    inhalt: `## Hausnotruf – Sicherheit zu Hause, oft zum Nulltarif

Ein Hausnotruf ist ein kleines Gerät – oft ein Knopf am Handgelenk oder um den Hals. Ein Druck, sofort antwortet jemand.

### Wann macht er Sinn?

- Die pflegebedürftige Person ist zeitweise alleine
- Es besteht Sturzgefahr
- Pflegende Angehörige müssen zur Arbeit

### Was kostet es?

Monatliche Gebühr: meist 20–40 €. Die Pflegekasse zahlt **27,00 € / Monat** Zuschuss sowie einmalig bis zu **10,49 €** für die Einrichtung. Bei günstigen Anbietern: **0 € Eigenanteil**.

### Wie beantrage ich den Zuschuss?

1. Anbieter wählen
2. Antrag bei der Pflegekasse (§40 SGB XI)
3. Genehmigung in ca. 3–5 Werktagen
4. Direkte Abrechnung zwischen Anbieter und Pflegekasse`,
  },
  {
    slug: "mdk-besuch-vorbereitung",
    titel: "MDK-Besuch: So bereitest du dich richtig vor",
    beschreibung: "Der MDK-Besuch entscheidet über den Pflegegrad. Mit der richtigen Vorbereitung bekommst du den Pflegegrad der wirklich zutrifft.",
    kategorie: "MDK",
    lesezeit: "5 Min.",
    datum: "März 2026",
    typ: "ratgeber",
    inhalt: `## MDK-Besuch – keine Angst, aber gut vorbereiten

Nach dem Pflegegrad-Antrag kommt jemand vom Medizinischen Dienst (MDK) vorbei. Das Gespräch dauert ca. 45–60 Minuten und entscheidet über den Pflegegrad.

### Die 4 wichtigsten Tipps

**1. Alles dokumentieren**
Schreibe vorher auf was die Person NICHT mehr alleine kann. Beim Waschen, Anziehen, Kochen, Orientieren. Je konkreter desto besser. Ein Tagebuch der letzten Wochen hilft.

**2. Schlechten Tag zeigen**
Der MDK bewertet was er sieht. Zeig wie es wirklich ist – nicht den guten Tag. Wenn jemand manchmal Hilfe braucht, immer davon ausgehen dass er sie braucht.

**3. Jemanden dabeihaben**
Nimm eine Vertrauensperson mit. Vier Augen sehen mehr. Und wenn jemand still dabei sitzt und mitschreibt, ist das komplett in Ordnung.

**4. Widerspruch einlegen wenn nötig**
Du hast 1 Monat Zeit. Kein Grund nötig – einfach schriftlich: „Ich lege Widerspruch ein." In ~35% aller Fälle wird heraufgestuft.`,
  },
  {
    slug: "verhinderungspflege",
    titel: "Verhinderungspflege: Urlaub für pflegende Angehörige",
    beschreibung: "Bis zu 1.612 € pro Jahr für Ersatzpflege wenn du als Angehöriger mal Pause brauchst. So funktioniert Verhinderungspflege.",
    kategorie: "Entlastung",
    lesezeit: "4 Min.",
    datum: "März 2026",
    typ: "ratgeber",
    inhalt: `## Verhinderungspflege – dein Recht auf Auszeit

Pflegende Angehörige leisten Enormes. Aber auch die stärksten Menschen brauchen eine Pause.

### Was ist Verhinderungspflege?

Wenn die Hauptpflegeperson verhindert ist – durch Urlaub, Krankheit oder andere Gründe – übernimmt jemand anderes die Pflege. Die Pflegekasse zahlt.

**Budget:** bis zu **1.612 € pro Jahr** (ab PG 2), bis zu **6 Wochen**.

### Wer kann die Pflege übernehmen?

- Professioneller Pflegedienst
- Verwandte (außerhalb des Haushalts, mit Einschränkungen)
- Freunde oder Nachbarn

### Wie beantrage ich es?

1. Vertretung organisieren
2. Zeitraum und Kosten dokumentieren
3. Antrag mit Belegen bei der Pflegekasse
4. Erstattung in 2–4 Wochen

**Tipp:** Seit 01.07.2025 gibt es ein gemeinsames Budget mit Kurzzeitpflege: bis zu **3.539 € / Jahr**.`,
  },
];

export const NEWS: ContentItem[] = [
  {
    slug: "pflegereform-2026",
    titel: "Pflegereform 2026: Was sich für Betroffene ändert",
    beschreibung: "Die Bundesregierung plant weitere Änderungen bei der Pflegeversicherung. Was Betroffene jetzt wissen müssen.",
    kategorie: "Politik",
    lesezeit: "3 Min.",
    datum: "Juni 2026",
    typ: "news",
    inhalt: `## Pflegereform 2026 – die wichtigsten Änderungen

Die Pflegeversicherung steht vor weiteren Reformen. Hier sind die aktuellen Entwicklungen die Betroffene kennen sollten.

### Was bereits gilt (ab 01.07.2025)

Das kombinierte Budget aus Verhinderungspflege und Kurzzeitpflege ist bereits in Kraft. Statt getrennter Töpfe gibt es jetzt ein gemeinsames Budget von **bis zu 3.539 € pro Jahr**.

### Was diskutiert wird

- Dynamisierung der Leistungsbeträge (jährliche Anpassung an die Inflation)
- Verbesserungen bei der Einstufung von Demenzerkrankten
- Entlastung pflegender Angehöriger durch mehr Beratungsangebote

### Was das für dich bedeutet

Wenn du aktuell Leistungen beziehst: Prüfe ob du alle Budgets voll ausschöpfst. Viele Familien lassen jedes Jahr Hunderte Euro auf dem Tisch liegen.`,
  },
  {
    slug: "pflegegeld-erhoehung-2025",
    titel: "Pflegegeld wurde erhöht – die neuen Beträge im Überblick",
    beschreibung: "Seit Januar 2025 wurden die Pflegegeldbeträge angehoben. Hier sind die aktuellen Zahlen für alle Pflegegrade.",
    kategorie: "Leistungen",
    lesezeit: "2 Min.",
    datum: "Januar 2025",
    typ: "news",
    inhalt: `## Pflegegeld 2025 – die aktuellen Beträge

Seit Januar 2025 wurden die Pflegegeldbeträge um 5% erhöht.

### Die aktuellen Beträge

- **PG 2:** 332 € / Monat
- **PG 3:** 572 € / Monat
- **PG 4:** 764 € / Monat
- **PG 5:** 946 € / Monat

### Wer bekommt Pflegegeld?

Pflegegeld gibt es ab PG 2 wenn die Pflege privat – also durch Angehörige oder Freunde – organisiert wird. Es gibt keine strengen Bedingungen. Ein formloser Antrag bei der Pflegekasse reicht.`,
  },
  {
    slug: "kombiniertes-budget-verhinderungspflege",
    titel: "Neues kombiniertes Budget: Verhinderungspflege + Kurzzeitpflege",
    beschreibung: "Seit 01. Juli 2025 gibt es ein gemeinsames Budget für Verhinderungspflege und Kurzzeitpflege. Was das konkret bedeutet.",
    kategorie: "Leistungen",
    lesezeit: "3 Min.",
    datum: "Juli 2025",
    typ: "news",
    inhalt: `## Kombiniertes Budget ab 01.07.2025

Die bisherigen Einzelbudgets für Verhinderungspflege (1.612 €) und Kurzzeitpflege (1.774 €) wurden zu einem gemeinsamen Budget zusammengefasst.

### Das neue Budget

**3.539 € pro Jahr** – frei verwendbar für:
- Verhinderungspflege (wenn die Hauptpflegeperson verhindert ist)
- Kurzzeitpflege (vorübergehende stationäre Pflege)
- Kombinationen aus beidem

### Was bedeutet das in der Praxis?

Früher musste man genau aufpassen wie viel von welchem Budget man nutzte. Jetzt gibt es einen großen flexiblen Topf. Das macht die Planung deutlich einfacher.`,
  },
  {
    slug: "mdk-wartezeiten-2026",
    titel: "MDK-Wartezeiten: So lange dauert es aktuell",
    beschreibung: "Die Wartezeiten auf den MDK-Besuch variieren stark je nach Region. Aktuelle Daten und Tipps was du tun kannst.",
    kategorie: "MDK",
    lesezeit: "2 Min.",
    datum: "April 2026",
    typ: "news",
    inhalt: `## MDK-Wartezeiten 2026 – was ist normal?

Der MDK hat gesetzlich 25 Arbeitstage Zeit um nach Antragstellung den Besuch durchzuführen. In der Praxis variiert das stark.

### Aktuelle Lage

In städtischen Gebieten: oft 3–5 Wochen. In ländlichen Regionen: vereinzelt bis zu 8 Wochen.

### Was du tun kannst

**Bei dringendem Bedarf:** Du kannst bei der Pflegekasse auf eine Beschleunigung hinweisen. Bei Krankenhausentlassung oder akutem Pflegebedarf gibt es Sonderregelungen – der MDK muss dann innerhalb weniger Tage kommen.

**In der Zwischenzeit:** Leistungen die nicht an den MDK-Besuch gebunden sind (z.B. Pflegebox, Hausnotruf) können bereits jetzt beantragt werden.`,
  },
];

export function getBySlug(slug: string): ContentItem | undefined {
  return [...RATGEBER, ...NEWS].find((a) => a.slug === slug);
}
