function Sidebar({ ausgewaehlteAutos, autos, vonDatum, bisDatum, preis, setSchritt }) {
  return (
    <div className="buchung-sidebar">
      <h3>Ihre Buchung</h3>
      {ausgewaehlteAutos.length === 0 ? (
        <p className="keine-buchung">Kein Fahrzeug ausgewählt</p>
      ) : (
        <>
          {ausgewaehlteAutos.map(id => {
            const auto = autos.find(a => a.id === id)
            return (
              <div key={id} className="gebuchtes-auto">
                <p className="auto-name">{auto.name} {auto.klasse}</p>
              </div>
            )
          })}
          <p className="datum">{vonDatum} - {bisDatum}</p>
          <p className="tage">{preis.tage} Tage</p>
          <p className="zwischensumme">CHF {preis.fahrzeug}</p>
          <button className="btn-weiter" onClick={() => setSchritt(2)}>
            Weiter zur Buchung →
          </button>
        </>
      )}
    </div>
  )
}

export default Sidebar
