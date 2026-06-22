import { ArrowRight, Clock, FileCheck, CheckCircle, AlertCircle, Info, XCircle, Check, X } from "lucide-react";

// ─── Token-Definitionen ────────────────────────────────────────────────────

const brandColors = [
  { name: "brand", hex: "#0F6E56", usage: "Buttons, Links, aktive Elemente", dark: true },
  { name: "brand-hover", hex: "#085041", usage: "Hover-State auf brand", dark: true },
  { name: "brand-subtle", hex: "#1D9E75", usage: "Icons, Akzente, sekundär", dark: true },
  { name: "brand-mid", hex: "#9FE1CB", usage: "Borders auf hellem Hintergrund", dark: false },
  { name: "brand-light", hex: "#E1F5EE", usage: "Badge-Hintergründe, Highlights", dark: false },
  { name: "brand-50", hex: "#f0fdf8", usage: "Sektionshintergründe", dark: false },
];

const neutralColors = [
  { name: "neutral-900", hex: "#0F1F1A", usage: "Überschriften, Primärtext", dark: true },
  { name: "neutral-700", hex: "#2D4A3E", usage: "Sekundärer Text", dark: true },
  { name: "neutral-500", hex: "#5C7A6F", usage: "Hilfstexte, Placeholder", dark: true },
  { name: "neutral-300", hex: "#B8CEC8", usage: "Borders, Divider", dark: false },
  { name: "neutral-100", hex: "#EDF3F1", usage: "Karten-Hintergründe", dark: false },
  { name: "neutral-50", hex: "#F6FAF8", usage: "Seiten-Hintergrund", dark: false },
];

const statusColors = [
  { name: "success", hex: "#16A34A", light: "#DCFCE7", usage: "Erfolg, Bestätigung" },
  { name: "warning", hex: "#D97706", light: "#FEF3C7", usage: "Hinweis, Warnung" },
  { name: "danger", hex: "#DC2626", light: "#FEE2E2", usage: "Fehler, Ablehnung" },
  { name: "info (= brand)", hex: "#0F6E56", light: "#E1F5EE", usage: "Info nutzt Primärfarbe" },
];

// ─── Sub-Komponenten ──────────────────────────────────────────────────────

function SectionHeader({ label, title, description }: { label: string; title: string; description?: string }) {
  return (
    <div className="mb-8">
      <p className="text-[11px] font-bold uppercase tracking-widest text-brand mb-1">{label}</p>
      <h2 className="font-serif text-h2 text-gray-900 mb-2">{title}</h2>
      {description && <p className="text-body-sm text-gray-500 max-w-2xl">{description}</p>}
    </div>
  );
}

function Divider() {
  return <hr className="border-[#E0EDE7] my-16" />;
}

function Swatch({ name, hex, usage, dark }: { name: string; hex: string; usage: string; dark: boolean }) {
  return (
    <div>
      <div
        className="h-16 rounded-xl mb-2 border border-black/5 flex items-end p-2.5"
        style={{ backgroundColor: hex }}
      >
        <span className={`text-[10px] font-mono font-semibold ${dark ? "text-white/70" : "text-black/40"}`}>{hex}</span>
      </div>
      <p className="text-xs font-semibold text-gray-800">{name}</p>
      <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">{usage}</p>
    </div>
  );
}

function DoCard({ type, children }: { type: "do" | "dont"; children: React.ReactNode }) {
  const isDo = type === "do";
  return (
    <div className={`rounded-xl border-2 p-5 ${isDo ? "border-green-300 bg-green-50" : "border-red-200 bg-red-50"}`}>
      <div className={`flex items-center gap-1.5 mb-3 text-[10px] font-bold uppercase tracking-widest ${isDo ? "text-green-700" : "text-red-600"}`}>
        {isDo ? <Check size={12} /> : <X size={12} />}
        {isDo ? "Do" : "Don't"}
      </div>
      {children}
    </div>
  );
}

// ─── Seite ────────────────────────────────────────────────────────────────

export default function StyleguidePage() {
  return (
    <div className="bg-[#F6FAF8] min-h-screen">
      <main className="max-w-5xl mx-auto px-6 sm:px-10 py-16">

        {/* ── HEADER ── */}
        <div className="mb-16 pb-10 border-b border-[#E0EDE7]">
          <span className="inline-block bg-brand-light text-brand text-xs font-semibold px-4 py-1.5 rounded-full mb-5">liva. Design System</span>
          <h1 className="font-serif text-display text-gray-900 mb-4">Styleguide</h1>
          <p className="text-body-lg text-gray-500 max-w-xl">Alle Design-Entscheidungen an einem Ort. Verbindlich für alle, die an liva. arbeiten.</p>
        </div>

        {/* ── FARBEN ── */}
        <SectionHeader
          label="01 — Farben"
          title="Farbpalette"
          description="brand (= brand-dark #0F6E56) ist die Hauptfarbe. brand-subtle nur für Icons & Akzente. Statusfarben ausschließlich für echtes Nutzerfeedback."
        />

        <div className="bg-white rounded-card-lg p-6 sm:p-8 mb-4 shadow-soft">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">Primär</p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-10">
            {brandColors.map(c => <Swatch key={c.name} {...c} />)}
          </div>

          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">Neutrals</p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-10">
            {neutralColors.map(c => <Swatch key={c.name} {...c} />)}
          </div>

          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">Statusfarben</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {statusColors.map(c => (
              <div key={c.name}>
                <div className="h-16 rounded-xl mb-2 border border-black/5 flex items-end p-2.5" style={{ backgroundColor: c.hex }}>
                  <span className="text-[10px] font-mono font-semibold text-white/70">{c.hex}</span>
                </div>
                <div className="h-8 rounded-lg mb-2 border border-black/5" style={{ backgroundColor: c.light }} />
                <p className="text-xs font-semibold text-gray-800">{c.name}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">{c.usage}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <DoCard type="do">
            <p className="text-body-sm text-gray-700 mb-3">Verwende <strong>brand</strong> für Buttons und <strong>brand-light</strong> für Hintergründe.</p>
            <div className="flex gap-2 flex-wrap">
              <button className="btn-primary text-xs px-4 py-2">Jetzt starten</button>
              <span className="inline-block bg-brand-light text-brand text-xs font-semibold px-3 py-1.5 rounded-full">Grundwissen</span>
            </div>
          </DoCard>
          <DoCard type="dont">
            <p className="text-body-sm text-gray-700 mb-3">Nie Rot oder Orange dekorativ – das wirkt alarmierend für unsere Zielgruppe.</p>
            <div className="flex gap-2 flex-wrap">
              <button className="text-xs px-4 py-2 rounded-full text-white font-semibold" style={{backgroundColor: "#DC2626"}}>Starten</button>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{backgroundColor: "#FEF3C7", color: "#B45309"}}>Badge</span>
            </div>
          </DoCard>
        </div>

        <Divider />

        {/* ── TYPOGRAFIE ── */}
        <SectionHeader
          label="02 — Typografie"
          title="Schrift & Hierarchie"
          description="DM Serif Display für emotionale Headlines. DM Sans für alle UI-Texte, Fließtext und Labels."
        />

        <div className="bg-white rounded-card-lg p-6 sm:p-8 mb-4 shadow-soft">
          <div className="space-y-6">
            {[
              { label: "Display · Serif", el: <p className="font-serif text-display text-gray-900 leading-none">Orientierung.</p> },
              { label: "H1 · Serif", el: <p className="font-serif text-h1 text-gray-900">Dein erster Tag mit Pflegegrad</p> },
              { label: "H2 · Serif", el: <p className="font-serif text-h2 text-gray-900">Was ist ein Pflegegrad?</p> },
              { label: "H3 · Sans 600", el: <p className="font-sans text-h3 font-semibold text-gray-900">Grundwissen & Anspruch</p> },
              { label: "H4 · Sans 600", el: <p className="font-sans text-h4 font-semibold text-gray-900">Pflegebox beantragen</p> },
              { label: "Body LG", el: <p className="text-body-lg text-gray-600 max-w-lg">Das Pflegesystem ist komplex – aber einfacher als du denkst.</p> },
              { label: "Body", el: <p className="text-body text-gray-600 max-w-lg">Ein Pflegegrad bestimmt wie viel Unterstützung jemand braucht.</p> },
              { label: "Body SM", el: <p className="text-body-sm text-gray-500 max-w-lg">Es gibt 5 Pflegegrade, von PG 1 bis PG 5.</p> },
              { label: "Caption · Caps", el: <p className="text-caption text-gray-400 uppercase tracking-widest font-semibold">Grundwissen · Kategorie</p> },
            ].map(({ label, el }) => (
              <div key={label} className="flex items-baseline gap-6 pb-5 border-b border-gray-50 last:border-0 last:pb-0">
                <span className="text-[11px] text-gray-400 font-mono w-28 shrink-0">{label}</span>
                {el}
              </div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <DoCard type="do">
            <p className="text-body-sm text-gray-700 mb-2">Empathisch, klar, persönlich.</p>
            <p className="font-serif text-h3 text-gray-900">Wir begleiten dich.</p>
            <p className="text-body-sm text-gray-500">Kostenlos, verständlich, bundesweit.</p>
          </DoCard>
          <DoCard type="dont">
            <p className="text-body-sm text-gray-700 mb-2">Kein Bürokratendeutsch, kein Fachjargon.</p>
            <p className="font-sans text-h4 text-gray-400 line-through">Der Antragsprozess wird initiiert.</p>
            <p className="text-body-sm text-gray-400 line-through">Pflegebedürftigkeitseinstufung §15 SGB XI</p>
          </DoCard>
        </div>

        <Divider />

        {/* ── KOMPONENTEN ── */}
        <SectionHeader
          label="03 — Komponenten"
          title="Buttons, Karten & Formulare"
        />

        {/* Buttons */}
        <div className="bg-white rounded-card-lg p-6 sm:p-8 mb-4 shadow-soft">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">Buttons</p>
          <div className="flex flex-wrap gap-4 mb-6">
            <button className="btn-primary">Kostenlos starten <ArrowRight size={15} /></button>
            <button className="btn-secondary">Mehr erfahren</button>
            <button className="btn-ghost">Zurück</button>
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">Karten</p>
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            <div className="card p-5">
              <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center mb-3">
                <Clock size={18} style={{color: "#1D9E75"}} />
              </div>
              <h3 className="font-serif text-h4 text-gray-900 mb-1">Standard</h3>
              <p className="text-body-sm text-gray-500">Reine Info, keine Aktion.</p>
            </div>
            <div className="card p-5 hover:shadow-card-hover hover:border-brand/30 transition-all cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center mb-3">
                <FileCheck size={18} style={{color: "#1D9E75"}} />
              </div>
              <h3 className="font-serif text-h4 text-gray-900 mb-1">Hover</h3>
              <p className="text-body-sm text-gray-500 mb-3">Klickbare Karte.</p>
              <span className="text-brand text-body-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">Mehr <ArrowRight size={12} /></span>
            </div>
            <div className="card p-5 border-brand shadow-card-active">
              <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center mb-3">
                <CheckCircle size={18} className="text-white" />
              </div>
              <h3 className="font-serif text-h4 text-gray-900 mb-1">Aktiv</h3>
              <p className="text-body-sm text-gray-500">Ausgewählt.</p>
            </div>
          </div>

          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5 mt-8">Formulare</p>
          <div className="max-w-sm space-y-4">
            <div>
              <label className="text-body-sm font-semibold text-gray-800 mb-1.5 block">Name</label>
              <input className="input" placeholder="z.B. Maria Müller" />
            </div>
            <div>
              <label className="text-body-sm font-semibold text-gray-800 mb-1.5 block">Pflegegrad</label>
              <select className="input"><option>Bitte wählen</option><option>Pflegegrad 1</option></select>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <DoCard type="do">
            <p className="text-body-sm text-gray-700">Nur <strong>ein</strong> btn-primary pro Sichtbereich.</p>
            <div className="mt-3 flex gap-2">
              <button className="btn-primary text-xs px-4 py-2">Jetzt starten</button>
              <button className="btn-ghost text-xs">Mehr lesen</button>
            </div>
          </DoCard>
          <DoCard type="dont">
            <p className="text-body-sm text-gray-700">Nie zwei primäre Buttons nebeneinander.</p>
            <div className="mt-3 flex gap-2">
              <button className="btn-primary text-xs px-4 py-2">Starten</button>
              <button className="btn-primary text-xs px-4 py-2">Weiter</button>
            </div>
          </DoCard>
        </div>

        <Divider />

        {/* ── STATUS ── */}
        <SectionHeader
          label="04 — Feedback"
          title="Hinweise & Status"
          description="Statusfarben nur für echtes Nutzerfeedback. Nie dekorativ einsetzen."
        />

        <div className="bg-white rounded-card-lg p-6 sm:p-8 mb-4 shadow-soft space-y-3">
          <div className="alert-info"><Info size={18} className="shrink-0 mt-0.5" /><p>Tipp: Du kannst Leistungen rückwirkend für bis zu 3 Monate beantragen.</p></div>
          <div className="alert-success"><CheckCircle size={18} className="shrink-0 mt-0.5" /><p>Dein Antrag wurde erfolgreich eingereicht.</p></div>
          <div className="alert-warning"><AlertCircle size={18} className="shrink-0 mt-0.5" /><p>Bitte fülle alle Pflichtfelder aus.</p></div>
          <div className="alert-danger"><XCircle size={18} className="shrink-0 mt-0.5" /><p>Etwas ist schiefgelaufen. Bitte versuche es erneut.</p></div>
        </div>

        <Divider />

        {/* ── BARRIEREFREIHEIT ── */}
        <SectionHeader
          label="05 — Barrierefreiheit"
          title="Kontrast & WCAG"
          description="Unsere Zielgruppe sind oft ältere Menschen. Alle Kombinationen müssen WCAG AA erfüllen (≥ 4.5:1)."
        />

        <div className="bg-white rounded-card-lg p-6 sm:p-8 mb-4 shadow-soft">
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { bg: "#0F6E56", text: "#FFFFFF", label: "Weiß auf brand", ratio: "7.2:1", pass: true },
              { bg: "#E1F5EE", text: "#0F6E56", label: "brand auf brand-light", ratio: "4.8:1", pass: true },
              { bg: "#FFFFFF", text: "#0F1F1A", label: "neutral-900 auf Weiß", ratio: "18:1", pass: true },
              { bg: "#FFFFFF", text: "#5C7A6F", label: "neutral-500 auf Weiß", ratio: "5.1:1", pass: true },
              { bg: "#E1F5EE", text: "#5C7A6F", label: "neutral-500 auf brand-light", ratio: "3.2:1 ⚠️", pass: false },
              { bg: "#9FE1CB", text: "#FFFFFF", label: "Weiß auf brand-mid", ratio: "2.1:1 ❌", pass: false },
            ].map((item) => (
              <div key={item.label} className="rounded-xl p-4 border" style={{ backgroundColor: item.bg, borderColor: item.pass ? "#86efac" : "#fca5a5" }}>
                <p className="text-body-sm font-semibold mb-1" style={{ color: item.text }}>{item.label}</p>
                <p className="text-caption font-mono" style={{ color: item.pass ? "#15803D" : "#B91C1C" }}>{item.ratio}</p>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── ANWENDUNGSBEISPIELE ── */}
        <SectionHeader
          label="06 — Anwendung"
          title="Beispiele in der Praxis"
          description="So sehen die Tokens in echten Komponenten aus."
        />

        {/* Hero */}
        <div className="rounded-card-lg overflow-hidden bg-gradient-to-br from-brand-light via-brand-50 to-white p-8 sm:p-12 mb-4 shadow-soft">
          <span className="inline-block bg-brand-light text-brand text-xs font-semibold px-4 py-1.5 rounded-full mb-5">Für Menschen neu in der Pflege</span>
          <h1 className="font-serif text-h1 text-gray-900 mb-4">Dein erster Tag mit Pflegegrad – <span className="text-brand">wir begleiten dich.</span></h1>
          <p className="text-body-lg text-gray-500 mb-6 max-w-lg">Du weißt nicht wo anfangen? Wir zeigen dir Schritt für Schritt was du beantragen musst.</p>
          <button className="btn-primary">Kostenlos starten <ArrowRight size={15} /></button>
        </div>

        {/* Ratgeber */}
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          {[
            { label: "Grundwissen", title: "Was ist ein Pflegegrad?", text: "Ein Pflegegrad bestimmt wie viel Unterstützung jemand im Alltag braucht." },
            { label: "Anspruch", title: "Wer hat Anspruch?", text: "Wer mindestens 6 Monate täglich Hilfe braucht hat Anspruch." },
          ].map((item) => (
            <div key={item.title} className="card p-6 hover:shadow-card-hover transition-all group cursor-pointer">
              <span className="section-label">{item.label}</span>
              <h3 className="font-serif text-h3 text-gray-900 mb-2">{item.title}</h3>
              <p className="text-body-sm text-gray-500 mb-4">{item.text}</p>
              <span className="text-brand text-body-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">Weiterlesen <ArrowRight size={13} /></span>
            </div>
          ))}
        </div>

        {/* Checkliste */}
        <div className="card p-6 mb-4">
          <h3 className="font-serif text-h3 text-gray-900 mb-4">Deine Checkliste</h3>
          <div className="space-y-2">
            {[
              { label: "Pflegegrad beantragen", done: true },
              { label: "Pflegebox bestellen", done: true },
              { label: "Hausnotruf einrichten", done: false },
              { label: "Entlastungsbetrag nutzen", done: false },
            ].map((item) => (
              <div key={item.label} className={`flex items-center gap-3 p-3 rounded-xl ${item.done ? "bg-brand-light" : "bg-gray-50"}`}>
                <CheckCircle size={18} className={item.done ? "text-brand" : "text-gray-300"} />
                <span className={`text-body-sm font-medium ${item.done ? "text-brand line-through" : "text-gray-700"}`}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 text-center text-caption text-gray-400">
          liva. Design System · Letzte Aktualisierung: Juni 2026
        </div>

      </main>
    </div>
  );
}
