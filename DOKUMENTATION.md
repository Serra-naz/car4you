# Dokumentation - Aufgabe 3: Technische Umsetzung des Formulars

## 1. Überlegungen zur UI-Komponentenwahl

### Formular-Komponente (Schritt 1)
- **Autocomplete-Eingabe** für Standortauswahl mit Dropdown-Vorschlägen
- **Datum- und Uhrzeitfelder** für präzise Auswahl von Abhol- und Rückgabezeitpunkt
- **Checkbox** für "Anderer Rückgabeort"
- **Select-Dropdown** für Altersgruppen-Auswahl
- **Filter-Buttons** für Fahrzeugtypen

### Buchungs-Komponente (Schritt 2)
- **Text-Eingabefelder** mit Echtzeit-Validierung für Kundendaten
- **Radio-Buttons** für Versicherungsauswahl (exklusive Auswahl)
- **Checkboxen** für optionale Extras (mehrfache Auswahl möglich)
- **Zusammenfassungs-Panel** zur Preisübersicht
- **Progress-Indicator** zur visuellen Darstellung des Buchungsfortschritts

### Bestätigungs-Komponente (Schritt 3)
- **Read-only Übersicht** aller Buchungsdetails
- **Erfolgsindikator** zur Bestätigung der abgeschlossenen Buchung

## 2. Logische Gruppierung der Eingaben

### Gruppierung nach Funktionalität
1. **Standort & Zeitraum** (Formular)
   - Abholort mit Autocomplete
   - Abholdatum und -zeit
   - Rückgabedatum und -zeit
   - Rückgabeort-Option

2. **Fahrerinfo & Filter** (Formular)
   - Alter des Fahrers
   - Fahrzeugtyp-Filter

3. **Persönliche Daten** (Buchung)
   - Vorname, Nachname
   - E-Mail, Telefon

4. **Versicherung & Extras** (Buchung)
   - Versicherungsoptionen
   - Zusatzleistungen (GPS, Kindersitz, Zusatzfahrer)

5. **Zusammenfassung** (Buchung)
   - Ausgewählte Fahrzeuge
   - Mietdauer
   - Preisaufschlüsselung

## 3. Feedback-System bei Fehlern

### Implementierte Validierungen

#### Vorname & Nachname
- **Regel**: Darf nicht leer sein
- **Feedback**: Rote Umrandung des Eingabefeldes + Fehlermeldung unterhalb
- **Echtzeit**: Fehler verschwindet sofort bei Eingabe

#### E-Mail
- **Regel**: Darf nicht leer sein + muss gültiges Format haben
- **Validierung**: RegEx-Pattern `^[^\s@]+@[^\s@]+\.[^\s@]+$`
- **Feedback**: Rote Umrandung + spezifische Fehlermeldung
- **Beispiel-Fehler**: "E-Mail ist erforderlich" oder "Ungültige E-Mail-Adresse"

#### Telefon
- **Regel**: Darf nicht leer sein + muss gültiges Format haben
- **Validierung**: RegEx-Pattern `^[0-9\s+()-]{6,}$`
- **Feedback**: Rote Umrandung + Fehlermeldung
- **Erlaubte Zeichen**: Zahlen, Leerzeichen, +, (), -
- **Mindestlänge**: 6 Zeichen

### Validierungslogik
```javascript
function validiereFormular() {
  const neueFehler = {}
  
  // Überprüfung aller Pflichtfelder
  // Fehler werden in Objekt gesammelt
  
  setFehler(neueFehler)
  return Object.keys(neueFehler).length === 0
}
```

### Benutzerfreundlichkeit
- **Fehler-Tag jedes Eingabefelds**: Nur relevante Felder werden markiert
- **Sofortiges Feedback**: Fehler verschwindet beim Tippen
- **Visuelle Kennzeichnung**: CSS-Klasse `.error` für rote Umrandung
- **Klare Fehlermeldungen**: Spezifische Texte unter jedem Feld
- **Blockierung bei Fehlern**: Button "Jetzt verbindlich buchen" validiert vor Weiterleitung

## 4. Bedienbarkeit auf kleinen Bildschirmen

### Responsive Design Massnahmen

#### Layout-Anpassungen
- **Flexbox und Grid**: Automatische Umordnung der Elemente
- **Media Queries**: Anpassungen für verschiedene Bildschirmgrössen
- **Container-Width**: Flexible Breiten mit `max-width` statt fixer Werte

#### Formular-Optimierungen
- **Touch-freundliche Eingabefelder**:
  - Ausreichende Höhe (min. 44px)
  - Grosszügige Abstände zwischen Elementen
  - Grössere Tap-Bereiche für Checkboxen/Radio-Buttons

- **Datum & Zeit Eingaben**:
  - Verwendung nativer HTML5-Inputs
  - Automatische mobile Picker auf Touch-Geräten
  - Spalten-Layout wird zu Zeilen auf kleinen Screens

#### Navigation
- **Sticky Header**: Bleibt sichtbar beim Scrollen
- **Grosse Buttons**: "Zurück" und "Buchen" mit ausreichender Grösse
- **Progress Indicator**: Kompakte Darstellung des Fortschritts

#### Autocomplete-Dropdown
- **Responsive Positionierung**: Dropdown passt sich an Viewport an
- **Scrollbare Liste**: Bei vielen Ergebnissen
- **Touch-optimierte Items**: Grosse klickbare Bereiche

#### Zusammenfassungs-Panel
- **Sticky Sidebar auf Desktop**: Bleibt beim Scrollen sichtbar
- **Unter Formular auf Mobile**: Wird nach unten verschoben
- **Kompakte Darstellung**: Reduzierte Abstände auf kleinen Screens

### CSS-Techniken
```css
/* Beispiel für responsive Anpassung */
@media (max-width: 768px) {
  .date-time-row {
    flex-direction: column;
  }
  
  .zusammenfassung {
    position: static;
    margin-top: 20px;
  }
  
  input, select, button {
    font-size: 16px; /* Verhindert Zoom bei iOS */
  }
}
```

## 5. State Management

### Zentrale State-Verwaltung in App.jsx
Alle wichtigen Daten werden im Haupt-Component verwaltet und über Props weitergegeben:

- **schritt**: Aktuelle Seite/Schritt (1, 2, oder 3)
- **standort, alter, datum, zeit**: Mietdetails
- **ausgewaehlteAutos**: Array der ausgewählten Fahrzeug-IDs
- **kundendaten**: Objekt mit Vorname, Nachname, E-Mail, Telefon
- **versicherung**: Ausgewählte Versicherungsoption
- **extras**: Objekt mit GPS, Kindersitz, Zusatzfahrer

### Lokaler State in Komponenten
- **Buchung.jsx**: `fehler` - Validierungsfehler-Objekt
- **Formular.jsx**: `standortInput`, `showSuggestions` - Autocomplete-Logic

### Props-Drilling
Daten und Setter-Funktionen werden durch die Komponenten-Hierarchie weitergegeben, um Zustandsänderungen zu ermöglichen.

## 6. Berechnung und Preisanzeige

### Dynamische Preisberechnung
```javascript
function berechnePreis() {
  // Tagesberechnung
  const tage = Math.ceil((new Date(bisDatum) - new Date(vonDatum)) / (1000 * 60 * 60 * 24))
  
  // Fahrzeugpreis: Summe aller ausgewählten Autos * Tage
  const fahrzeugPreis = ausgewaehlteAutos.reduce((sum, id) => {
    const auto = autos.find(a => a.id === id)
    return sum + (auto ? auto.preis : 0)
  }, 0) * tage
  
  // Versicherungskosten
  const versicherungPreis = versicherung === 'basis' ? 50 : 
                           versicherung === 'vollkasko' ? 150 : 500
  
  // Extras-Kosten
  const extrasPreis = (extras.gps ? 5 : 0) + 
                     (extras.kindersitz ? 3 : 0) + 
                     (extras.zusatzfahrer ? 15 : 0)
  
  return {
    tage,
    fahrzeug: fahrzeugPreis,
    versicherung: versicherungPreis * tage,
    extras: extrasPreis * tage,
    total: fahrzeugPreis + (versicherungPreis * tage) + (extrasPreis * tage)
  }
}
```

### Echtzeit-Updates
Der Preis wird automatisch bei jeder Änderung neu berechnet und in der Zusammenfassung angezeigt.

## 7. Technologie-Stack

- **React 18**: Komponenten-basierte UI-Architektur
- **Vite**: Schneller Build-Tool und Dev-Server
- **CSS3**: Flexbox, Grid, Media Queries für responsives Design
- **ES6+**: Moderne JavaScript-Features (Arrow Functions, Destructuring, etc.)

## 8. Verbesserungsmöglichkeiten

### Potenzielle Erweiterungen
1. **Backend-Integration**: API-Anbindung für Datenpersistenz
2. **Zahlungsintegration**: Stripe/PayPal für Online-Zahlung
3. **E-Mail-Bestätigung**: Automatischer Versand der Buchungsdetails
4. **Erweiterte Validierung**: Datumsprüfung (z.B. Rückgabe nach Abholung)
5. **Mehrsprachigkeit**: i18n für Deutsche/Englische Version
6. **Loading States**: Spinner während Verarbeitung
7. **Error Boundaries**: Besseres Error Handling
8. **Accessibility**: ARIA-Labels, Keyboard-Navigation
9. **Unit Tests**: Jest/React Testing Library
10. **State Management Library**: Redux/Zustand für komplexere State-Logic

---


