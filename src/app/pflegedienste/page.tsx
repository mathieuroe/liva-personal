import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import ErgebnisseClient from "./ErgebnisseClient";

export const metadata: Metadata = {
  title: "Pflegedienste in deiner Nähe – Kostenlos vergleichen | liva",
  description: "Vergleiche ambulante Pflegedienste in deiner Region. Kostenlose Anfragen, echte Bewertungen, sofortige Verfügbarkeit.",
  robots: "noindex",
};

export interface PflegedienstResult {
  id: string;
  name: string;
  ort: string;
  adresse: string;
  plz?: string;
  distanzKm: number;
  bewertung: number | null;
  anzahlBewertungen: number;
  beschreibung: string;
  leistungen: string[];
  telefon?: string;
  website?: string;
  verfuegbar: boolean;
  reaktionszeit: string;
}

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 10) / 10;
}

async function plzToCoords(plz: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?postalcode=${plz}&country=DE&format=json&limit=1`,
      { headers: { "User-Agent": "liva-pflege.de/1.0" }, next: { revalidate: 86400 } }
    );
    const data = await res.json();
    if (!data?.[0]) return null;
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  } catch {
    return null;
  }
}

function guessLeistungen(types: string[], name: string): string[] {
  const n = name.toLowerCase();
  const result: string[] = [];

  if (n.includes("residenz") || n.includes("stift") || n.includes("seniorenwohn")) {
    result.push("Senioren Residenz");
  }
  if (n.includes("24h") || n.includes("24 h") || n.includes("rund um die uhr")) {
    result.push("24h-Pflege");
  }
  if (
    types.includes("nursing_home") ||
    n.includes("pflegeheim") ||
    n.includes("altenheim") ||
    n.includes("altenpflege") ||
    n.includes("pflegeeinrichtung")
  ) {
    result.push("Stationäre Pflege");
    result.push("Demenzbetreuung");
  }
  if (
    n.includes("ambulant") ||
    n.includes("pflegedienst") ||
    n.includes("sozialstation") ||
    n.includes("hauspflege") ||
    n.includes("pflegeteam")
  ) {
    result.push("Grundpflege");
    result.push("Betreuung");
  }

  if (result.length === 0) {
    result.push(types.includes("nursing_home") ? "Stationäre Pflege" : "Grundpflege");
  }

  return result.filter((v, i, a) => a.indexOf(v) === i);
}

async function googleTextSearch(query: string, lat: number, lng: number, apiKey: string) {
  try {
    const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.location,places.types,places.internationalPhoneNumber,places.websiteUri",
      },
      body: JSON.stringify({
        textQuery: query,
        locationBias: {
          circle: { center: { latitude: lat, longitude: lng }, radius: 30000 },
        },
        maxResultCount: 20,
        languageCode: "de",
        regionCode: "DE",
      }),
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    return (data.places as any[]) || [];
  } catch {
    return [];
  }
}

async function fetchGooglePflegedienste(plz: string): Promise<PflegedienstResult[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return [];

  const coords = await plzToCoords(plz);
  if (!coords) return [];
  const { lat, lng } = coords;

  const [heime, dienste, residenzen] = await Promise.all([
    googleTextSearch("Pflegeheim Altenheim", lat, lng, apiKey),
    googleTextSearch("ambulanter Pflegedienst Sozialstation", lat, lng, apiKey),
    googleTextSearch("Seniorenresidenz Seniorenstift Seniorenwohnanlage", lat, lng, apiKey),
  ]);

  const seen = new Set<string>();
  const results: PflegedienstResult[] = [];

  for (const p of [...heime, ...dienste, ...residenzen]) {
    if (!p?.id || seen.has(p.id)) continue;
    seen.add(p.id);

    const name: string = p.displayName?.text || "";
    if (!name) continue;

    const adresse: string = (p.formattedAddress || "").replace(", Deutschland", "");
    const plzMatch = adresse.match(/\b(\d{5})\b/);
    const placePlz = plzMatch?.[1];

    // Ort aus der Adresse extrahieren (letztes nicht-PLZ-Segment vor Deutschland)
    const parts = adresse.split(",").map((s: string) => s.trim());
    const ort = parts.find((s: string) => /[A-Za-zÄÖÜäöüß]{3,}/.test(s) && !/^\d{5}/.test(s)) || "";

    const placeLat = p.location?.latitude;
    const placeLng = p.location?.longitude;
    const distanzKm =
      placeLat != null && placeLng != null ? haversineKm(lat, lng, placeLat, placeLng) : 99;

    const leistungen = guessLeistungen(p.types || [], name);
    const isStationaer = leistungen.includes("Stationäre Pflege") || leistungen.includes("Senioren Residenz");

    results.push({
      id: p.id,
      name,
      ort,
      adresse,
      plz: placePlz,
      distanzKm,
      bewertung: typeof p.rating === "number" ? Math.round(p.rating * 10) / 10 : null,
      anzahlBewertungen: p.userRatingCount ?? 0,
      beschreibung: isStationaer
        ? `Stationäre Pflegeeinrichtung${ort ? ` in ${ort}` : ""}. Vollumfängliche Betreuung, alle Pflegegrade.`
        : `Ambulanter Pflegedienst${ort ? ` in ${ort}` : ""}. Individuelle Betreuung, alle Pflegekassen akzeptiert.`,
      leistungen,
      telefon: p.internationalPhoneNumber || undefined,
      website: p.websiteUri || undefined,
      verfuegbar: true,
      reaktionszeit: isStationaer ? "1–2 Werktagen" : "wenigen Stunden",
    });
  }

  return results.sort((a, b) => a.distanzKm - b.distanzKm).slice(0, 60);
}

export default async function PflegedienstePage({
  searchParams,
}: {
  searchParams: { plz?: string; pg?: string; fuer?: string; leistung?: string };
}) {
  const plz = searchParams.plz ?? "";
  const pflegegrad = searchParams.pg ?? "";
  const fuerWen = searchParams.fuer ?? "";
  const leistung = searchParams.leistung ?? "";

  const results = await fetchGooglePflegedienste(plz);

  return (
    <main className="bg-[#F9FAFB] min-h-screen">
      <ErgebnisseClient
        plz={plz}
        pflegegrad={pflegegrad}
        fuerWen={fuerWen}
        leistung={leistung}
        results={results}
      />
      <Footer />
    </main>
  );
}
