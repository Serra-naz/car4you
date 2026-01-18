import { useState } from 'react'

function Buchung({ autos, ausgewaehlteAutos, vonDatum, bisDatum, preis, setSchritt, kundendaten, setKundendaten, versicherung, setVersicherung, extras, setExtras }) {
  const [fehler, setFehler] = useState({})

  function validiereFormular() {
    const neueFehler = {}
    
    if (!kundendaten.vorname.trim()) {
      neueFehler.vorname = 'Vorname ist erforderlich'
    }
    
    if (!kundendaten.nachname.trim()) {
      neueFehler.nachname = 'Nachname ist erforderlich'
    }
    
    if (!kundendaten.email.trim()) {
      neueFehler.email = 'E-Mail ist erforderlich'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(kundendaten.email)) {
      neueFehler.email = 'Ungültige E-Mail-Adresse'
    }
    
    if (!kundendaten.telefon.trim()) {
      neueFehler.telefon = 'Telefon ist erforderlich'
    } else if (!/^[0-9\s+()-]{6,}$/.test(kundendaten.telefon)) {
      neueFehler.telefon = 'Ungültige Telefonnummer'
    }
    
    setFehler(neueFehler)
    return Object.keys(neueFehler).length === 0
  }

  function handleBuchen() {
    if (validiereFormular()) {
      setSchritt(3)
    }
  }

  return (
    <>
      <button className="zurueck" onClick={() => setSchritt(1)}>← Zurück</button>
      
      <div className="abschluss-container">
        <div className="kundendaten-form">
          <h2>Buchung abschließen</h2>
          <h3>Ihre Daten:</h3>
          <div className="input-wrapper">
            <input 
              type="text" 
              placeholder="Vorname *" 
              value={kundendaten.vorname}
              onChange={e => {
                setKundendaten({...kundendaten, vorname: e.target.value})
                if (fehler.vorname) setFehler({...fehler, vorname: ''})
              }}
              className={fehler.vorname ? 'error' : ''}
            />
            {fehler.vorname && <span className="error-message">{fehler.vorname}</span>}
          </div>
          
          <div className="input-wrapper">
            <input 
              type="text" 
              placeholder="Nachname *" 
              value={kundendaten.nachname}
              onChange={e => {
                setKundendaten({...kundendaten, nachname: e.target.value})
                if (fehler.nachname) setFehler({...fehler, nachname: ''})
              }}
              className={fehler.nachname ? 'error' : ''}
            />
            {fehler.nachname && <span className="error-message">{fehler.nachname}</span>}
          </div>
          
          <div className="input-wrapper">
            <input 
              type="email" 
              placeholder="E-Mail *" 
              value={kundendaten.email}
              onChange={e => {
                setKundendaten({...kundendaten, email: e.target.value})
                if (fehler.email) setFehler({...fehler, email: ''})
              }}
              className={fehler.email ? 'error' : ''}
            />
            {fehler.email && <span className="error-message">{fehler.email}</span>}
          </div>
          
          <div className="input-wrapper">
            <input 
              type="tel" 
              placeholder="Telefon *" 
              value={kundendaten.telefon}
              onChange={e => {
                setKundendaten({...kundendaten, telefon: e.target.value})
                if (fehler.telefon) setFehler({...fehler, telefon: ''})
              }}
              className={fehler.telefon ? 'error' : ''}
            />
            {fehler.telefon && <span className="error-message">{fehler.telefon}</span>}
          </div>

          <h3>Versicherung: *</h3>
          <label className="radio-label">
            <input type="radio" checked={versicherung === 'basis'} onChange={() => setVersicherung('basis')} />
            Basis (Selbstbehalt CHF 1500) inkl.
          </label>
          <label className="radio-label">
            <input type="radio" checked={versicherung === 'vollkasko'} onChange={() => setVersicherung('vollkasko')} />
            Vollkasko (kein Selbstbehalt) + CHF 25/Tag
          </label>

          <h3>Extras:</h3>
          <label className="checkbox-label">
            <input type="checkbox" checked={extras.gps} onChange={e => setExtras({...extras, gps: e.target.checked})} />
            GPS-Gerät (+ CHF 5/Tag)
          </label>
          <label className="checkbox-label">
            <input type="checkbox" checked={extras.kindersitz} onChange={e => setExtras({...extras, kindersitz: e.target.checked})} />
            Kindersitz (+ CHF 3/Tag)
          </label>
          <label className="checkbox-label">
            <input type="checkbox" checked={extras.zusatzfahrer} onChange={e => setExtras({...extras, zusatzfahrer: e.target.checked})} />
            Zusatzfahrer (+ CHF 15/Tag)
          </label>
        </div>

        <div className="zusammenfassung">
          <h3>Zusammenfassung:</h3>
          {ausgewaehlteAutos.map(id => {
            const auto = autos.find(a => a.id === id)
            return <p key={id}>{auto.name} {auto.klasse}</p>
          })}
          <p>{vonDatum} - {bisDatum} ({preis.tage} Tage)</p>
          <hr />
          <p>Fahrzeug: <span>CHF {preis.fahrzeug}</span></p>
          <p>Versicherung: <span>CHF {preis.versicherung}</span></p>
          <p>Extras: <span>CHF {preis.extras}</span></p>
          <hr />
          <p className="total">Total: <span>CHF {preis.total}</span></p>
          <button className="btn-buchen" onClick={handleBuchen}>Jetzt verbindlich buchen</button>
        </div>
      </div>
    </>
  )
}

export default Buchung
