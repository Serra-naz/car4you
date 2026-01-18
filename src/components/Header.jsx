import { useState } from 'react'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header>
        <h1>Car4You</h1>
        <div className="header-buttons">
          <button className="btn-secondary">Login</button>
          <button className="btn-secondary">Hilfe</button>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>
      {menuOpen && (
        <div className="mobile-menu">
          <button onClick={() => setMenuOpen(false)}>Login</button>
          <button onClick={() => setMenuOpen(false)}>Hilfe</button>
        </div>
      )}
    </>
  )
}

export default Header
