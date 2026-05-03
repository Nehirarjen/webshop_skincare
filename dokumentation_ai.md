# KI-Einsatz Dokumentation – SUNA Korean Skincare Webshop (PA03)

## Übersicht

In diesem Projektauftrag habe ich zwei verschiedene KI-Tools eingesetzt:

1. **Manus AI** – Hauptwerkzeug für die vollständige Generierung des Webshops (HTML, CSS, JS, Struktur, Inhalte)
2. **OpenCode** – Nachbearbeitung in zwei Phasen: TypeScript entfernen und reines HTML/CSS umsetzen, danach echte Produkte implementieren, CSS finalisieren und alle Projektanforderungen erfüllen

---

## Eingesetzte KI-Tools

### 1. Manus AI

**Einsatzgebiet:** Vollständige Erstellung des SUNA Korean Skincare Webshops – Konzept, Seitenstruktur, HTML/CSS/JS-Generierung, Produktinhalte, responsives Design

**Initialer Auftrag an Manus AI:**

> Erstelle einen vollständigen Webshop für koreanische Skincare-Produkte. Der Shop soll folgende Seiten haben: Startseite mit neuen Produkten, Kategorieübersicht und Newsletter-Anmeldung; eine Produktseite mit Kategoriefilter; eine Produktdetailseite mit Bild, Beschreibung, Preis und Bestellformular; sowie eine Kontaktseite mit Team-Vorstellung und Kontaktformular (Dropdown für Betreffzeilen). Anforderungen: 100% eigener HTML- und CSS-Code ohne Frameworks, Seitenstruktur mit Header, Main und Footer, Grid-Layout, responsives Design für Mobile/Tablet/Desktop, mindestens 10 Produkte mit Bild, Text und Preis.

**Konkrete Nutzung:**

| Aufgabe | Prompt-Ansatz | Ergebnis |
|---|---|---|
| Gesamtstruktur Webshop | Vollständiger Auftrag inkl. Sitemap und Anforderungen | 5 Seiten: index.html, products.html, brands.html, contact.html, order-confirmation.html |
| Startseite (index.html) | Hero, neue Produkte, Kategorieübersicht, Marken, Newsletter | Hero mit Bild, Marquee-Strip, 6 neue Produktkarten, Kategorie-Grid, Brands-Grid, Newsletter-Formular |
| Produktübersicht (products.html) | Produktseite mit Kategoriefilter und Grid | Filterleiste mit 6 Kategorien, sektionsbasierter Aufbau pro Kategorie |
| Marken-Seite (brands.html) | Übersichtsseite für alle Brands des Shops | Eigenständige Markenseite mit Brand-Profilen |
| Kontaktseite (contact.html) | Team-Vorstellung, Werte, Kontaktformular mit Betreff-Dropdown | Über-uns-Text, Values-Strip (4 Werte), Formular mit 7 Betreff-Optionen |
| Bestellbestätigung | Bestätigungsseite nach Kauf | Eigene order-confirmation.html mit Erfolgs-Feedback |
| Design-System | Konsistentes K-Beauty-Branding | CSS Custom Properties, Fonts: Cormorant Garamond + DM Sans, zweisprachige Labels (DE/KO) |
| Navigation | Konsistenter Header über alle Seiten | Logo «SUNA», Nav-Links mit aktivem Zustand pro Seite |

**Stärken von Manus AI:**
- Generiert einen vollständigen, deployablen Webshop in einem Durchgang
- Versteht komplexe, mehrteilige Aufträge mit vielen Anforderungen
- Setzt visuelles Design eigenständig um – inkl. thematisch passenden Details wie koreanischen Schriftzeichen (한국어) als Dekorationselement
- Erstellt konsistente Seitenstruktur mit Header, Main, Footer auf allen Seiten

**Schwächen von Manus AI:**
- Generiert manchmal TypeScript oder moderne Build-Tool-Abhängigkeiten, die nicht gewünscht sind
- Produktinhalte waren initial Platzhalter – echte Marken und Produkte mussten manuell nachgetragen werden
- Weniger geeignet für kleinteilige Anpassungen und Iterationen nach der Generierung

---

### 2. OpenCode

**Einsatzgebiet:** Nachbearbeitung des von Manus AI generierten Codes in zwei Phasen

**Phase 1 – Technische Bereinigung:** Umwandlung in reines HTML/CSS ohne TypeScript

**Phase 2 – Inhaltliche Fertigstellung:** Echte Produkte implementieren, CSS verfeinern, alle Projektanforderungen erfüllen

**Konkrete Nutzung:**

| Aufgabe | Wie eingesetzt | Ergebnis |
|---|---|---|
| TypeScript entfernen | TypeScript-Abhängigkeiten eliminiert, Code zu reinem JS/HTML konvertiert | Direkt im Browser lauffähig, kein Build-Step nötig |
| Echte Marken & Produkte einbauen | Reale K-Beauty-Marken (Torriden, ANUA, Beauty of Joseon, Skin1004, Medicube, COSRX, ROUND LAB, heimish u. a.) mit echten Produktnamen, Bildern und Preisen implementiert | Authentischer Shop statt Platzhalterdaten |
| Produktkategorien befüllen | 6 Kategorien aufgebaut: Cleanser, Toner, Serum & Essenz, Masken, Feuchtigkeitscreme, Sonnenschutz | Alle Kategorien mit je mehreren echten Produkten befüllt |
| Produktdetailseiten erstellen | Für jedes Produkt eine eigene Detailseite im Ordner product-detail/ | Detailseiten mit Bild, Beschreibung, Preis und Bestellformular |
| CSS verfeinern | Abstände, Hover-Effekte, Badge-Styles, Formular-Styling angepasst | Visuell poliertes Endprodukt passend zur K-Beauty-Ästhetik |
| Brands-Seite ausbauen | Markenprofile mit echten Brand-Informationen und Produktbildern ergänzt | Vollständige brands.html mit realen Markenprofilen |
| Anforderungen sicherstellen | Fehlende Pflichtfunktionen geprüft und ergänzt: Kategoriefilter, Bestellformular, Newsletter, Kontaktformular mit Dropdown | Alle Projektanforderungen vollständig umgesetzt |

**Stärken von OpenCode:**
- Effizient bei gezielten Code-Änderungen und Ergänzungen im bestehenden Projekt
- Gut geeignet für iterative Verbesserungen direkt am Code
- Behält die bestehende Struktur bei und ergänzt präzise die fehlenden Teile
- Praktisch für die Feinabstimmung von CSS ohne die Grundstruktur zu verändern

**Schwächen von OpenCode:**
- Weniger geeignet für konzeptionelle Aufgaben oder Neuentwicklungen von Grund auf
- Braucht präzise Aufträge – vage Anweisungen führen zu unvollständigen Ergebnissen
- Kein übergreifendes Kontextverständnis des gesamten Projekts

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
| **Iterative Verbesserungen** | ★★☆☆☆ | ★★★★★ |
| **Neues lernen** | ★★★☆☆ | ★★☆☆☆ |

**Fazit:** Manus AI lieferte den vollständigen Webshop-Rahmen in einem Durchgang – Seitenstruktur, Design-System, Navigation und alle Pflichtseiten (index.html, products.html, brands.html, contact.html, order-confirmation.html). OpenCode übernahm danach in zwei Phasen: zuerst die technische Bereinigung (kein TypeScript, reines HTML/CSS), dann die inhaltliche Fertigstellung mit echten K-Beauty-Marken wie Torriden, ANUA, Beauty of Joseon und Skin1004, CSS-Verfeinerungen und der vollständigen Umsetzung aller Projektanforderungen. Die Kombination funktioniert als klare Staffelung: Manus AI für den vollständigen Einstieg, OpenCode für die iterative Verfeinerung bis zum fertigen Produkt.

---

## Selbstdefinierte Vergleichskriterien

Ich habe die Tools nach folgenden selbst definierten Kriterien bewertet:

1. **Kontextverständnis** – Versteht das Tool den vollständigen Projektauftrag mit allen Anforderungen?
2. **Code-Qualität** – Wie sauber, lesbar und wartbar ist der generierte Code?
3. **Geschwindigkeit** – Wie schnell liegt ein nutzbares Ergebnis vor?
4. **Erklärungen** – Erklärt das Tool seine Entscheidungen und den generierten Code?
5. **Debugging-Unterstützung** – Kann das Tool Fehler im Code erkennen und beheben?
6. **Eignung für Gesamtprojekte** – Kann das Tool ein komplettes Projekt eigenständig generieren?
7. **Iterative Verbesserungen** – Wie gut ist das Tool bei schrittweisen Anpassungen an bestehendem Code?

---

## Learnings

- Manus AI eignet sich hervorragend, wenn ein vollständiges Projekt in einem Schritt generiert werden soll – der initiale Prompt muss aber präzise und vollständig sein, inkl. Sitemap, Anforderungen und Thema
- KI-generierter Code enthält nicht immer echte Inhalte – Platzhalterprodukte durch reale Marken wie Torriden, ANUA oder Beauty of Joseon zu ersetzen erforderte eine eigene Nachbearbeitungsphase mit OpenCode
- Technische Einschränkungen wie «kein TypeScript» müssen explizit formuliert werden – andernfalls generiert die KI modernere Stack-Lösungen, die nicht den Anforderungen entsprechen
- Die Kombination zweier Tools mit klarer Aufgabenteilung (Generierung + Nachbearbeitung) ist effizienter als alles mit einem Tool lösen zu wollen
- Wer den generierten Code nicht versteht, kann ihn nicht anpassen – ein Grundverständnis von HTML und CSS bleibt unverzichtbar

---

## Verwendete Prompting-Techniken

| Technik | Beispiel |
|---|---|
| **Vollständiger Briefing-Prompt** | Alle Anforderungen, Seiten und Funktionen in einem strukturierten Auftrag an Manus AI übergeben |
| **Constraint-Prompting** | «100% eigener HTML- und CSS-Code, keine Frameworks» |
| **Sitemap als Struktur** | Sitemap direkt im Prompt mitgegeben für korrekte Navigation und Seitenstruktur |
| **Thematische Vorgabe** | «Korean Skincare / K-Beauty» als Kontext für Design, Inhalte und Markenwahl |
| **Negativ-Constraint** | «ohne TypeScript» als klare Einschränkung für die Nachbearbeitung mit OpenCode |
| **Phasen-Prompting** | Generierung und Verfeinerung bewusst in separate Aufträge und Tools aufgeteilt |
| **Inhalts-Spezifikation** | Konkrete Marken und Produktnamen (z. B. «Torriden DIVE IN Serum», «Beauty of Joseon Relief Sun SPF50+») vorgegeben für authentische Produktdaten |
