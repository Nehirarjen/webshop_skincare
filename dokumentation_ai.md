# KI-Einsatz Dokumentation – Korean Skincare Webshop (PA03)

## Übersicht

In diesem Projektauftrag habe ich zwei verschiedene KI-Tools eingesetzt:

1. **Manus AI** – Hauptwerkzeug für die vollständige Generierung des Webshops (HTML, CSS, JS, Struktur, Inhalte)
2. **OpenCode** – Nachbearbeitung und Konvertierung: TypeScript-Abhängigkeiten entfernen, reines HTML/CSS umsetzen

---

## Eingesetzte KI-Tools

### 1. Manus AI

**Einsatzgebiet:** Vollständige Erstellung des Korean Skincare Webshops – Konzept, Seitenstruktur, HTML/CSS/JS-Generierung, Produktinhalte, responsives Design

**Initialer Auftrag an Manus AI:**

> Erstelle einen vollständigen Webshop für koreanische Skincare-Produkte. Der Shop soll folgende Seiten haben: Startseite mit neuen Produkten, Kategorieübersicht und Newsletter-Anmeldung; eine Produktseite mit Kategoriefilter; eine Produktdetailseite mit Bild, Beschreibung, Preis und Bestellformular; sowie eine Kontaktseite mit Team-Vorstellung und Kontaktformular (Dropdown für Betreffzeilen). Anforderungen: 100% eigener HTML- und CSS-Code ohne Frameworks, Seitenstruktur mit Header, Main und Footer, Grid-Layout, responsives Design für Mobile/Tablet/Desktop, mindestens 10 Produkte mit Bild, Text und Preis.

**Konkrete Nutzung:**

| Aufgabe | Prompt-Ansatz | Ergebnis |
|---|---|---|
| Gesamtstruktur Webshop | Vollständiger Auftrag inkl. Sitemap und Anforderungen | Komplette Webshop-Struktur mit allen 4 Hauptseiten |
| Startseite | Beschreibung: neue Produkte, Kategorieübersicht, Newsletter-Sektion | Hero-Bereich, Produktgrid, Kategorie-Cards, Newsletter-Formular |
| Produktübersicht | Produktseite mit Kategoriefilter (alle / Toner / Serum / Moisturizer etc.) | Filterleiste mit JavaScript-Logik, Grid-Layout |
| Produktdetailseite | Detailseite mit Bild, Beschreibung, Preis, Bestellformular | Zweispaltiges Layout, vollständiges Bestellformular |
| Kontaktseite | Team-Vorstellung und Kontaktformular mit Betreff-Dropdown | Über-uns-Sektion, Formular mit mehreren Betreffoptionen |
| 10+ Produkte | Koreanische Skincare-Produkte mit Namen, Beschreibung, Preis, Kategorie | 12 Produkte mit realistischen K-Beauty-Inhalten |
| Responsives Design | Mobile 1-spaltig, Tablet 2-spaltig, Desktop 3–4-spaltig | Media Queries für alle Breakpoints |
| Dark/Light Design | Konsistentes Farbsystem passend zu K-Beauty-Ästhetik | CSS Custom Properties mit zartem Rosa/Nude-Farbschema |
| Navigation | Mehrsprachige Navigation zwischen allen Seiten | Konsistenter Header mit aktivem Link-Highlighting |

**Stärken von Manus AI:**
- Generiert einen vollständigen, funktionsfähigen Webshop in einem Durchgang
- Versteht komplexe, mehrteilige Aufträge mit vielen Anforderungen
- Erstellt konsistente Inhalte (Produkttexte, Preise, Kategorien) passend zum Thema
- Setzt visuelles Design eigenständig um (Farben, Typografie, Abstände)
- Produziert direkt deploybare Dateien ohne manuelle Nacharbeit

**Schwächen von Manus AI:**
- Generiert manchmal TypeScript oder moderne Build-Tool-Abhängigkeiten, die nicht gewünscht sind
- Weniger geeignet für kleinteilige Anpassungen und Iterationen
- Kein direkter Editor-Kontext – Änderungen erfordern neue Aufträge

---

### 2. OpenCode

**Einsatzgebiet:** Nachbearbeitung des von Manus AI generierten Codes – Entfernung von TypeScript, Konvertierung zu reinem HTML/CSS ohne externe Abhängigkeiten

**Einsatz in zwei Phasen:**

**Phase 1 – Konvertierung:** Umwandlung des Manus-AI-Outputs in reines HTML/CSS ohne TypeScript

**Phase 2 – Weiterentwicklung:** Implementierung echter Produkte, CSS-Feinabstimmung und Erfüllung aller Projektanforderungen

**Konkrete Nutzung:**

| Aufgabe | Wie eingesetzt | Ergebnis |
|---|---|---|
| TypeScript entfernen | TypeScript-Dateien (.ts) in reines JavaScript (.js) umgewandelt | Keine Build-Steps mehr nötig, direkt im Browser lauffähig |
| Abhängigkeiten bereinigen | Import-Statements und Modul-Syntax entfernt | Standalone HTML-Dateien ohne npm/Bundler |
| Echte Produkte implementieren | Reale koreanische Skincare-Produkte mit echten Namen, Beschreibungen, Bildern und Preisen eingebaut | Authentische Produktdaten statt Platzhalter |
| CSS anpassen | Design iterativ verfeinert – Abstände, Farben, Typografie, Hover-Effekte | Visuell konsistentes und ansprechendes Endprodukt |
| Anforderungen erfüllen | Fehlende Pflichtfunktionen ergänzt (z. B. Kategoriefilter, Bestellformular, Newsletter, Kontaktformular mit Dropdown) | Alle Projektanforderungen vollständig umgesetzt |
| Responsiveness sicherstellen | Media Queries geprüft und angepasst für Mobile, Tablet und Desktop | Funktioniert auf allen Geräten korrekt |

**Stärken von OpenCode:**
- Sehr effizient bei klar definierten Code-Umstrukturierungen
- Gut geeignet für iterative Verbesserungen direkt im Code
- Behält bestehende Struktur bei und ergänzt gezielt fehlende Teile
- Praktisch für die Feinabstimmung von CSS ohne die Grundstruktur zu brechen

**Schwächen von OpenCode:**
- Weniger geeignet für konzeptionelle Aufgaben oder Neuentwicklungen von Grund auf
- Benötigt klaren, spezifischen Auftrag – vage Anweisungen führen zu unvollständigen Ergebnissen
- Kein kontextuelles Verständnis des gesamten Projekts wie ein Chat-basiertes Tool

---

## Vergleich der zwei KI-Tools

| Kriterium | Manus AI | OpenCode |
|---|---|---|
| **Kontext verstehen** | ★★★★★ | ★★★☆☆ |
| **Code-Qualität** | ★★★★☆ | ★★★★☆ |
| **Geschwindigkeit** | ★★★★★ | ★★★★☆ |
| **Erklärungen** | ★★★☆☆ | ★★☆☆☆ |
| **Debugging** | ★★★☆☆ | ★★★★☆ |
| **Ganzheitliche Projekte** | ★★★★★ | ★★☆☆☆ |
| **Technische Bereinigung** | ★★☆☆☆ | ★★★★★ |
| **Neues lernen** | ★★★☆☆ | ★★☆☆☆ |

**Fazit:** Manus AI war das Hauptwerkzeug für die initiale Erstellung des Webshops – es hat den komplexen Auftrag ganzheitlich verstanden und eine vollständige Grundstruktur geliefert. OpenCode hat in zwei Phasen weitergearbeitet: zuerst die technische Bereinigung (kein TypeScript, reines HTML/CSS), dann die inhaltliche und visuelle Fertigstellung mit echten Produkten, CSS-Anpassungen und der Umsetzung aller Projektanforderungen. Die Kombination funktioniert als sinnvolle Staffelung: Manus AI für den schnellen, vollständigen Einstieg – OpenCode für die iterative Verfeinerung bis zum fertigen Produkt.

---

## Selbstdefinierte Vergleichskriterien

Ich habe die Tools nach folgenden selbst definierten Kriterien bewertet:

1. **Kontextverständnis** – Versteht das Tool den vollständigen Projektauftrag mit allen Anforderungen?
2. **Code-Qualität** – Wie sauber, lesbar und wartbar ist der generierte Code?
3. **Geschwindigkeit** – Wie schnell liegt ein nutzbares Ergebnis vor?
4. **Erklärungen** – Erklärt das Tool seine Entscheidungen und den generierten Code?
5. **Debugging-Unterstützung** – Kann das Tool Fehler im Code erkennen und beheben?
6. **Eignung für Gesamtprojekte** – Kann das Tool ein komplettes Projekt eigenständig generieren?
7. **Technische Bereinigung** – Wie gut ist das Tool bei gezielten Code-Umstrukturierungen?

---

## Learnings

- Manus AI eignet sich hervorragend für Aufträge, bei denen ein vollständiges Ergebnis in einem Schritt gewünscht ist – der Prompt muss aber präzise und vollständig sein
- Vage Aufträge wie «mach einen Webshop» führen zu schlechteren Ergebnissen als detaillierte Beschreibungen mit Sitemap, Anforderungen und Designvorgaben
- KI-generierter Code erfüllt nicht immer alle technischen Anforderungen (z. B. kein TypeScript) – eine Nachbearbeitung mit einem spezialisierten Tool wie OpenCode ist oft sinnvoll
- Wer den generierten Code nicht versteht, kann ihn nicht anpassen oder debuggen – das eigene Grundverständnis von HTML/CSS bleibt unverzichtbar
- Die Kombination zweier Tools mit klarer Aufgabenteilung (Generierung + Bereinigung) ist effizienter als alles mit einem Tool zu lösen

---

## Verwendete Prompting-Techniken

| Technik | Beispiel |
|---|---|
| **Vollständiger Briefing-Prompt** | Alle Anforderungen, Seiten und Funktionen in einem strukturierten Auftrag übergeben |
| **Constraint-Prompting** | «100% eigener HTML- und CSS-Code, keine Frameworks» |
| **Sitemap als Struktur** | Sitemap direkt im Prompt mitgegeben, damit die Navigation korrekt aufgebaut wird |
| **Thematische Vorgabe** | «Korean Skincare / K-Beauty» als Kontext für Produktinhalte und Design-Ästhetik |
| **Negativ-Constraint** | «ohne TypeScript» als klare Einschränkung für die Nachbearbeitung mit OpenCode |
| **Aufgabentrennung** | Generierung (Manus AI) und technische Bereinigung (OpenCode) bewusst getrennt |
