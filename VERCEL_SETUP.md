# Vercel Setup – Einmalige Einrichtung

Bitte folgende Schritte einmalig in Vercel durchführen.

---

## 1. SMTP-Zugangsdaten (E-Mail-Benachrichtigung)

→ Vercel → Projekt `pflegeeins` → **Settings** → **Environment Variables**

| Name | Value |
|---|---|
| `SMTP_USER` | `info@fragliva.de` |
| `SMTP_PASS` | *(IONOS-Passwort von info@fragliva.de)* |

---

## 2. Admin-Passwort (für das interne Lead-Board)

Ebenfalls unter **Settings** → **Environment Variables**:

| Name | Value |
|---|---|
| `ADMIN_PASSWORD` | *(frei wählen, z.B. `Liva2026!`)* |

Das Passwort wird dann unter `fragliva.de/admin` zum Einloggen verwendet.

---

## 3. Datenbank einrichten (für das Lead-Board)

→ Vercel → Projekt `pflegeeins` → **Storage** → **Create** → **Postgres**

1. Datenbank erstellen (Name z.B. `liva-leads`)
2. **Connect to Project** → `pflegeeins` auswählen
3. Fertig – Vercel setzt automatisch alle nötigen Umgebungsvariablen

Die Tabelle wird beim ersten eingehenden Lead automatisch erstellt.

---

## 4. Redeploy auslösen

→ Vercel → **Deployments** → letztes Deployment → **drei Punkte** → **Redeploy**

Danach ist alles live:
- Jeder Lead kommt per Mail an `info@fragliva.de`
- Das Board ist erreichbar unter `fragliva.de/admin`
