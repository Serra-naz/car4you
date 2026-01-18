import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Formular from './components/Formular'
import AutoKarte from './components/AutoKarte'
import Sidebar from './components/Sidebar'
import Buchung from './components/Buchung'
import Bestaetigung from './components/Bestaetigung'

function App() {
  const [schritt, setSchritt] = useState(1)
  const [standort, setStandort] = useState('Zürich Flughafen')
  const [alter, setAlter] = useState('25-65')
  const [vonDatum, setVonDatum] = useState('2026-01-28')
  const [bisDatum, setBisDatum] = useState('2026-02-03')
  const [vonZeit, setVonZeit] = useState('10:00')
  const [bisZeit, setBisZeit] = useState('11:00')
  const [gleicherOrt, setGleicherOrt] = useState(true)
  const [filterTyp, setFilterTyp] = useState('Alle')
  const [ausgewaehlteAutos, setAusgewaehlteAutos] = useState([])
  
  const [kundendaten, setKundendaten] = useState({
    vorname: '',
    nachname: '',
    email: '',
    telefon: ''
  })
  
  const [versicherung, setVersicherung] = useState('basis')
  const [extras, setExtras] = useState({
    gps: false,
    kindersitz: false,
    zusatzfahrer: false
  })

  const autos = [
    { id: 1, name: 'VW Touran', typ: 'City', klasse: 'Family', personen: 5, gepaeck: 4, preis: 70, bild: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=400&h=300&fit=crop' },
    { id: 2, name: 'VW Touran', typ: 'SUV', klasse: 'SUV', personen: 5, gepaeck: 5, preis: 50, bild: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=300&fit=crop' },
    { id: 3, name: 'BMW 3er', typ: 'Business', klasse: 'Business', personen: 5, gepaeck: 3, preis: 120, bild: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop' },
    { id: 4, name: 'Audi Q5', typ: 'SUV', klasse: 'SUV', personen: 5, gepaeck: 5, preis: 150, bild: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop' },
    { id: 5, name: 'Tesla Model 3', typ: 'E-Cars', klasse: 'Electric', personen: 5, gepaeck: 3, preis: 180, bild: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop' },
    { id: 6, name: 'Porsche 911', typ: 'Sport', klasse: 'Sport', personen: 2, gepaeck: 1, preis: 350, bild: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop' }
  ]

  function berechnePreis() {
    const tage = Math.ceil((new Date(bisDatum) - new Date(vonDatum)) / (1000 * 60 * 60 * 24))
    const fahrzeugPreis = ausgewaehlteAutos.reduce((sum, id) => {
      const auto = autos.find(a => a.id === id)
      return sum + (auto ? auto.preis : 0)
    }, 0) * tage

    const versicherungPreis = versicherung === 'basis' ? 50 : versicherung === 'vollkasko' ? 150 : 500
    const extrasPreis = (extras.gps ? 5 : 0) + (extras.kindersitz ? 3 : 0) + (extras.zusatzfahrer ? 15 : 0)
    
    return {
      tage,
      fahrzeug: fahrzeugPreis,
      versicherung: versicherungPreis * tage,
      extras: extrasPreis * tage,
      total: fahrzeugPreis + (versicherungPreis * tage) + (extrasPreis * tage)
    }
  }

  function toggleAuto(id) {
    if (ausgewaehlteAutos.includes(id)) {
      setAusgewaehlteAutos(ausgewaehlteAutos.filter(aid => aid !== id))
    } else {
      setAusgewaehlteAutos([...ausgewaehlteAutos, id])
    }
  }

  const gefilterte = filterTyp === 'Alle' ? autos : autos.filter(a => a.typ === filterTyp)
  const preis = berechnePreis()

  if (schritt === 3) {
    return (
      <div className="app">
        <Header />
        <Bestaetigung 
          autos={autos}
          ausgewaehlteAutos={ausgewaehlteAutos}
          vonDatum={vonDatum}
          bisDatum={bisDatum}
          standort={standort}
          kundendaten={kundendaten}
          preis={preis}
          setSchritt={setSchritt}
          setAusgewaehlteAutos={setAusgewaehlteAutos}
          setKundendaten={setKundendaten}
        />
      </div>
    )
  }

  if (schritt === 2) {
    return (
      <div className="app">
        <Header />
        <div className="progress-indicator">
          <span className="step completed">1</span>
          <span className="step-line completed"></span>
          <span className="step active">2</span>
        </div>
        <div className="buchung-abschluss">
          <Buchung 
            autos={autos}
            ausgewaehlteAutos={ausgewaehlteAutos}
            vonDatum={vonDatum}
            bisDatum={bisDatum}
            preis={preis}
            setSchritt={setSchritt}
            kundendaten={kundendaten}
            setKundendaten={setKundendaten}
            versicherung={versicherung}
            setVersicherung={setVersicherung}
            extras={extras}
            setExtras={setExtras}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <div className="formular-bereich">
          <Formular 
            standort={standort}
            setStandort={setStandort}
            vonDatum={vonDatum}
            setVonDatum={setVonDatum}
            bisDatum={bisDatum}
            setBisDatum={setBisDatum}
            vonZeit={vonZeit}
            setVonZeit={setVonZeit}
            bisZeit={bisZeit}
            setBisZeit={setBisZeit}
            gleicherOrt={gleicherOrt}
            setGleicherOrt={setGleicherOrt}
            alter={alter}
            setAlter={setAlter}
            filterTyp={filterTyp}
            setFilterTyp={setFilterTyp}
          />
          <div className="auto-grid">
            {gefilterte.map(auto => (
              <AutoKarte 
                key={auto.id}
                auto={auto}
                ausgewaehlt={ausgewaehlteAutos.includes(auto.id)}
                toggleAuto={toggleAuto}
              />
            ))}
          </div>
        </div>
        <Sidebar 
          ausgewaehlteAutos={ausgewaehlteAutos}
          autos={autos}
          vonDatum={vonDatum}
          bisDatum={bisDatum}
          preis={preis}
          setSchritt={setSchritt}
        />
      </div>
    </div>
  )
}

export default App
