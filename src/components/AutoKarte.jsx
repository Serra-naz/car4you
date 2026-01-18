function AutoKarte({ auto, ausgewaehlt, toggleAuto }) {
  return (
    <div className={`auto-karte ${ausgewaehlt ? 'ausgewaehlt' : ''}`}>
      <div className="auto-bild">
        <img src={auto.bild} alt={auto.name} className="car-image" />
      </div>
      <h3>{auto.name}</h3>
      <p className="klasse">{auto.klasse}</p>
      <div className="spezifikationen">
        <span>👤 {auto.personen}</span>
        <span>🧳 {auto.gepaeck}</span>
      </div>
      <p className="preis">CHF {auto.preis}/Tag</p>
      <label className="checkbox-select">
        <input 
          type="checkbox" 
          checked={ausgewaehlt}
          onChange={() => toggleAuto(auto.id)}
        />
        {ausgewaehlt ? '✓' : ''}
      </label>
    </div>
  )
}

export default AutoKarte
