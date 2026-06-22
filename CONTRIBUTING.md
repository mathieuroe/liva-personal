# Zusammenarbeit – pflegeeins

## Grundregel
Niemand pusht direkt auf `main`. Alle Änderungen kommen über einen Pull Request.

## Workflow

### 1. Repo klonen (einmalig)
```bash
git clone https://github.com/mathieuroe/pflegeeins.git
cd pflegeeins
npm install
npm run dev
```

### 2. Neuen Branch erstellen
Für jede Aufgabe einen eigenen Branch – direkt von `main`:
```bash
git checkout main
git pull
git checkout -b dein-name/was-du-machst
# z.B. git checkout -b max/hausnotruf-seite
```

### 3. Arbeiten, committen, pushen
```bash
git add .
git commit -m "kurze Beschreibung was du gemacht hast"
git push origin dein-name/was-du-machst
```

### 4. Pull Request öffnen
Auf GitHub → **"Compare & pull request"** → kurze Beschreibung → den anderen als Reviewer hinzufügen.

### 5. Review & Merge
Der andere schaut drüber, gibt grünes Licht → Merge in `main` → Vercel deployed automatisch.

---

## Branch-Namen
| Typ | Beispiel |
|-----|---------|
| Neue Funktion | `max/pflegebox-funnel` |
| Bugfix | `max/fix-mobile-navbar` |
| Inhalt | `max/ratgeber-artikel-mdk` |

## Zuständigkeiten (Stand Juni 2026)
- **Mathieu** – Funnel-Logik, Lead-Integration, Struktur
- **Kollege** – nach Absprache

## Fragen?
Einfach im PR kommentieren oder direkt melden.
