function Bestaetigung({ autos, ausgewaehlteAutos, vonDatum, bisDatum, standort, kundendaten, preis, setSchritt, setAusgewaehlteAutos, setKundendaten }) {
  return (
    <div className="bestaetigung-container">
      <div className="bestaetigung-card">
        <div className="success-icon">✓</div>
        <h1>Buchung erfolgreich!</h1>
        <p className="buchungsnummer">Buchungsnummer: <strong>CH-{Date.now().toString().slice(-8)}</strong></p>
        
        <div className="bestaetigung-details">
          <h3>Ihre Buchungsdetails:</h3>
          
          <div className="detail-row">
            <span className="label">Fahrzeug(e):</span>
            <span className="value">
              {ausgewaehlteAutos.map(id => {
                const auto = autos.find(a => a.id === id)
                return auto.name + ' ' + auto.klasse
              }).join(', ')}
            </span>
          </div>
          
          <div className="detail-row">
            <span className="label">Zeitraum:</span>
            <span className="value">{vonDatum} bis {bisDatum} ({preis.tage} Tage)</span>
          </div>
          
          <div className="detail-row">
            <span className="label">Abholort:</span>
            <span className="value">{standort}</span>
          </div>
          
          <div className="detail-row">
            <span className="label">Name:</span>
            <span className="value">{kundendaten.vorname} {kundendaten.nachname}</span>
          </div>
          
          <div className="detail-row">
            <span className="label">E-Mail:</span>
            <span className="value">{kundendaten.email}</span>
          </div>
          
          <div className="detail-row total-row">
            <span className="label">Gesamtpreis:</span>
            <span className="value">CHF {preis.total}</span>
          </div>
        </div>

        <div className="bestaetigung-info">
          <p>📧 Eine Bestätigung wurde an <strong>{kundendaten.email}</strong> gesendet.</p>
          <p>📱 Sie erhalten in Kürze eine SMS an <strong>{kundendaten.telefon}</strong>.</p>
        </div>

        <button className="btn-home" onClick={() => {
          setSchritt(1)
          setAusgewaehlteAutos([])
          setKundendaten({vorname: '', nachname: '', email: '', telefon: ''})
        }}>
          Zurück zur Startseite
        </button>
      </div>
    </div>
  )
}

export default Bestaetigung
