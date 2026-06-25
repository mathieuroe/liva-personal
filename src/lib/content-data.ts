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

**Hausnotruf prüfen** – ab PG 1, Pflegekasse zahlt 27 € / Monat. Bei vielen Anbietern: 0 € Eigenanteil.

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
    beschreibung: "Die Pflegekasse zahlt 27 € pro Monat. Bei vielen Anbietern zahlst du damit gar nichts. Was du wissen musst.",
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

Monatliche Gebühr: meist 20–40 €. Die Pflegekasse zahlt **27 € / Monat** Zuschuss sowie einmalig bis zu **10,49 €** für die Einrichtung. Bei günstigen Anbietern: **0 € Eigenanteil**.

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
  {
    slug: "widerspruch-pflegegrad",
    titel: "Pflegegrad zu niedrig? So legst du erfolgreich Widerspruch ein",
    beschreibung: "Rund 35 Prozent aller Widersprüche gegen einen Pflegegrad-Bescheid führen zu einer Höherstufung. So gehst du vor – Schritt für Schritt.",
    kategorie: "MDK",
    lesezeit: "4 Min.",
    datum: "Mai 2026",
    typ: "news",
    inhalt: `## Widerspruch gegen den Pflegegrad – wann und wie es sich lohnt

Du hast den Bescheid bekommen und das Ergebnis fühlt sich falsch an? Das passiert häufiger als man denkt. Laut Statistiken der Pflegekassen führt rund **ein Drittel aller Widersprüche** zu einer Höherstufung. Es lohnt sich also, diesen Weg zu gehen.

### Wann ist Widerspruch sinnvoll?

- Der zuerkannte Pflegegrad entspricht nicht dem tatsächlichen Hilfebedarf
- Der Gutachter des Medizinischen Dienstes hat wesentliche Einschränkungen nicht oder falsch erfasst
- Die Pflegesituation hat sich seit dem Besuch verschlechtert
- Du hattest keinen Beistand beim MDK-Besuch und fühlst dich übergangen

### Die Frist: 1 Monat

Widerspruch muss innerhalb von **einem Monat** nach Zustellung des Bescheids eingelegt werden. Die genaue Frist steht im Bescheid selbst unter "Rechtsbehelfsbelehrung".

### So formulierst du den Widerspruch

Ein Widerspruch muss nicht begründet werden – er muss nur rechtzeitig da sein. Diese kurze Formulierung reicht vollständig aus:

**"Ich lege hiermit Widerspruch gegen den Bescheid vom [Datum], Aktenzeichen [AZ], ein."**

Schicke das Schreiben **per Einschreiben mit Rückschein** an deine Pflegekasse – so hast du einen Nachweis.

### Was danach passiert

1. Die Pflegekasse prüft den Bescheid intern
2. In vielen Fällen wird ein erneuter MDK-Besuch angesetzt
3. Du kannst jetzt eine detaillierte Begründung nachreichen – dazu solltest du den "schlechten Tag" schriftlich dokumentieren
4. Entscheidung in der Regel innerhalb von 3 Monaten

### Tipp: Pflegegutachten anfordern

Du hast das Recht, das MDK-Gutachten einzusehen (§ 18 Abs. 4 SGB XI). Forder es schriftlich bei deiner Pflegekasse an. Darin steht genau was bewertet wurde – und was nicht.

### Wenn der Widerspruch abgelehnt wird

Dann bleibt noch der Weg vor das Sozialgericht. Das klingt nach viel – ist aber kostenlos und du brauchst keinen Anwalt. Sozialverbände wie der VdK oder der Sozialverband Deutschland (SoVD) helfen oft kostengünstig dabei.`,
  },
  {
    slug: "pflegebeitraege-2025",
    titel: "Pflegebeiträge 2025: Was Arbeitnehmer, Eltern und Rentner zahlen",
    beschreibung: "Der Pflegebeitragssatz liegt bei 3,4 Prozent – Kinderlose zahlen 4,0 Prozent. Alle aktuellen Sätze und was sich je nach Lebenssituation ändert.",
    kategorie: "Finanzen",
    lesezeit: "3 Min.",
    datum: "März 2026",
    typ: "news",
    inhalt: `## Pflegebeiträge 2025 – wer wie viel zahlt

Seit dem 1. Juli 2023 gilt der aktuelle Pflegebeitragssatz von **3,4 Prozent**. Für Kinderlose über 23 Jahre kommt ein Zuschlag von 0,6 Prozentpunkten dazu – sie zahlen insgesamt **4,0 Prozent**.

### Beitragssätze nach Kinderzahl (2025)

Die Beiträge werden je zur Hälfte von Arbeitnehmer und Arbeitgeber getragen (je 1,7 %). Der Kinderabschlag reduziert ausschließlich den Arbeitnehmeranteil:

- **Kinderlose (über 23 J.):** 4,0 % gesamt – AN 2,3 %, AG 1,7 %
- **1 Kind:** 3,4 % – AN 1,7 %, AG 1,7 %
- **2 Kinder:** 3,15 % – AN 1,45 %, AG 1,7 %
- **3 Kinder:** 2,90 % – AN 1,20 %, AG 1,7 %
- **4 Kinder:** 2,65 % – AN 0,95 %, AG 1,7 %
- **5 oder mehr Kinder:** 2,40 % – AN 0,70 %, AG 1,7 %

Kinder werden berücksichtigt bis zum vollendeten 25. Lebensjahr.

### Besonderheit Sachsen

In Sachsen zahlen Arbeitnehmer historisch bedingt einen höheren Anteil, weil der Buß- und Bettag als Feiertag erhalten blieb: AN 2,2 %, AG 1,2 % (für Kinderlose: AN 2,8 %, AG 1,2 %).

### Was zahlen Rentner?

Rentnerinnen und Rentner zahlen den vollen Pflegebeitrag selbst – die gesetzliche Rentenversicherung übernimmt die Hälfte wie ein Arbeitgeber. Kinderlose Rentner über 23 zahlen also ebenfalls 4,0 % vom Rentenbetrag.

### Warum steigen die Beiträge?

Die Pflegeversicherung ist eine Umlageversicherung: Was heute eingezahlt wird, finanziert die heutigen Leistungen. Da die Zahl der Pflegebedürftigen steigt und die Leistungsbeträge erhöht wurden, steigen die Beitragssätze. Experten erwarten bis 2030 einen weiteren Anstieg auf bis zu 4,5 Prozent.`,
  },
  {
    slug: "entlastungsbetrag-richtig-nutzen",
    titel: "Entlastungsbetrag: 131 € pro Monat – und die meisten nutzen ihn falsch",
    beschreibung: "1.572 € pro Jahr stehen dir zu – doch viele Familien schöpfen das Budget nicht aus oder beantragen es falsch. Was du wissen musst.",
    kategorie: "Leistungen",
    lesezeit: "4 Min.",
    datum: "Februar 2026",
    typ: "news",
    inhalt: `## Entlastungsbetrag 2025 – 131 € pro Monat richtig einsetzen

Der Entlastungsbetrag (§ 45b SGB XI) ist eine der am häufigsten ungenutzten Leistungen im Pflegesystem. **Jeder mit Pflegegrad 1 bis 5 hat Anspruch** – unabhängig davon ob Pflegegeld oder Pflegesachleistungen bezogen werden.

Aktuell: **131 € pro Monat**, also bis zu **1.572 € pro Jahr**.

### Wofür kannst du ihn nutzen?

Der Betrag ist zweckgebunden – aber der Spielraum ist groß:

- Alltagsbegleitung und Betreuung (z.B. Vorlesen, Spazierengehen, Gesellschaft leisten)
- Hauswirtschaftliche Unterstützung durch anerkannte Anbieter (Einkaufen, Kochen, Putzen)
- Tages- und Nachtpflege
- Kurzzeitpflege (ergänzend zum kombinierten Budget)
- Fahrdienste zu Arzt- oder Therapieterminen

**Wichtig:** Der Anbieter muss nach Landesrecht anerkannt sein. Informelle Nachbarschaftshilfe oder Familienmitglieder aus dem eigenen Haushalt zählen nicht.

### Was passiert mit ungenutzten Beträgen?

Nicht genutzte Beträge verfallen nicht sofort. Sie können **bis zum Ende des darauffolgenden Kalenderhalbjahres** übertragen werden. Wer also im ersten Halbjahr 2025 nichts nutzt, kann das Geld noch bis Ende 2025 einsetzen.

Das bedeutet in der Praxis: Maximal können bis zu **1.965 € auf einmal** abrufbar sein (1,5 × 131 € × 10 Monate).

### So bekommst du das Geld

1. Anerkannten Anbieter beauftragen (deine Pflegekasse hat eine Liste)
2. Leistung in Anspruch nehmen
3. Rechnung sammeln
4. Bei der Pflegekasse einreichen
5. Erstattung in 2–4 Wochen

**Alternativ:** Einige Anbieter rechnen direkt mit der Pflegekasse ab – dann musst du nichts vorstrecken.

### Der häufigste Fehler

Viele Familien denken: "Wir schaffen das selbst, wir brauchen keine Hilfe." Der Entlastungsbetrag ist aber kein Zeichen von Schwäche – er ist ein finanzielles Recht. Und die Dienstleister die ihn abrechnen, können echte Erleichterung in den Alltag bringen.`,
  },
];

export function getBySlug(slug: string): ContentItem | undefined {
  return [...RATGEBER, ...NEWS].find((a) => a.slug === slug);
}
