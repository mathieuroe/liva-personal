const EXTRA_LANGS = ["Türkisch", "Russisch", "Polnisch", "Arabisch", "Kroatisch", "Vietnamesisch"];

export function getSprachen(id: string): string[] {
  const seed = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const langs = ["Deutsch"];
  if (seed % 3 === 0) langs.push(EXTRA_LANGS[seed % EXTRA_LANGS.length]);
  if (seed % 7 === 0) langs.push(EXTRA_LANGS[(seed + 2) % EXTRA_LANGS.length]);
  return langs;
}

export type Versicherung = "GKV" | "Privat" | "GKV & Privat";
const VERSICHERUNG_OPTS: Versicherung[] = ["GKV", "GKV", "GKV", "GKV & Privat", "GKV & Privat", "Privat"];

export function getVersicherung(id: string): Versicherung {
  const seed = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return VERSICHERUNG_OPTS[seed % VERSICHERUNG_OPTS.length];
}

export const ZUSATZ_LEISTUNGEN = ["Betreuung", "Arztbegleitung", "Hauswirtschaft", "Verhinderungspflege"] as const;

export function getZusatzLeistungen(id: string): string[] {
  const seed = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return ZUSATZ_LEISTUNGEN.filter((_, i) => ((seed >> i) & 1) === 1).slice(0, 2);
}

export function getAlleLeistungen(id: string, leistungen: string[]): string[] {
  return [...leistungen, ...getZusatzLeistungen(id)];
}
