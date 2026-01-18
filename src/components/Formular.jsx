import { useState } from 'react'

function Formular({ standort, setStandort, vonDatum, setVonDatum, bisDatum, setBisDatum, vonZeit, setVonZeit, bisZeit, setBisZeit, gleicherOrt, setGleicherOrt, alter, setAlter, filterTyp, setFilterTyp }) {
  const [standortInput, setStandortInput] = useState(standort)
  const [showSuggestions, setShowSuggestions] = useState(false)
  
  const standorte = ['Zürich Flughafen', 'Basel SBB', 'Genf Flughafen', 'Bern Hauptbahnhof', 'Luzern', 'Lugano']
  
  const filteredStandorte = standorte.filter(ort => 
    ort.toLowerCase().includes(standortInput.toLowerCase())
  )

  function handleStandortChange(value) {
    setStandortInput(value)
    setShowSuggestions(true)
    if (standorte.includes(value)) {
      setStandort(value)
    }
  }

  function selectStandort(ort) {
    setStandort(ort)
    setStandortInput(ort)
    setShowSuggestions(false)
  }

  return (
    <div className="miet-formular">
      <div className="progress-indicator">
        <span className="step active">1</span>
        <span className="step-line"></span>
        <span className="step">2</span>
      </div>
      <h2>Mietformular</h2>
      
      <div className="form-row">
        <div className="autocomplete-wrapper">
          <label>Abholort</label>
          <input 
            type="text" 
            value={standortInput}
            onChange={e => handleStandortChange(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Standort suchen..."
            className="autocomplete-input"
          />
          {showSuggestions && filteredStandorte.length > 0 && (
            <div className="suggestions-dropdown">
              {filteredStandorte.map(ort => (
                <div 
                  key={ort} 
                  className="suggestion-item"
                  onClick={() => selectStandort(ort)}
                >
                  📍 {ort}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="form-row">
        <div className="input-group">
          <label>Anderer Rückgabeort?</label>
          <label className="checkbox-label">
            <input type="checkbox" checked={!gleicherOrt} onChange={e => setGleicherOrt(!e.target.checked)} />
            Anderer Rückgabeort
          </label>
        </div>
      </div>

      <div className="form-row date-time-row">
        <div className="datetime-group">
          <label>📅 Abholung</label>
          <div className="datum-gruppe">
            <input type="date" value={vonDatum} onChange={e => setVonDatum(e.target.value)} />
            <input type="time" value={vonZeit} onChange={e => setVonZeit(e.target.value)} />
          </div>
        </div>
        <span className="arrow">→</span>
        <div className="datetime-group">
          <label>📅 Rückgabe</label>
          <div className="datum-gruppe">
            <input type="date" value={bisDatum} onChange={e => setBisDatum(e.target.value)} />
            <input type="time" value={bisZeit} onChange={e => setBisZeit(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="input-group">
          <label>Alter des Fahrers</label>
          <select value={alter} onChange={e => setAlter(e.target.value)} className="age-select">
            <option value="18-24">18-24 Jahre</option>
            <option value="25-65">25-65 Jahre</option>
            <option value="65+">65+ Jahre</option>
          </select>
        </div>
      </div>

      <div className="filter-buttons">
        <span>Fahrzeugtyp:</span>
        {['Alle', 'City', 'Business', 'SUV', 'Sport', 'E-Cars'].map(typ => (
          <button 
            key={typ}
            className={filterTyp === typ ? 'active' : ''}
            onClick={() => setFilterTyp(typ)}
          >
            {typ}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Formular
