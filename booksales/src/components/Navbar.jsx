import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top" style={{ background: 'linear-gradient(90deg,#1a1a2e,#16213e)' }}>
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4" to="/">📚 BookSales</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto gap-2">
            {[['/', 'Home'], ['/books', 'Books']].map(([to, label]) => (
              <li className="nav-item" key={to}>
                <NavLink to={to} end={to === '/'} className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded ${isActive ? 'bg-primary text-white fw-bold' : 'text-white-50'}`
                }>{label}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
