import { NavLink } from 'react-router-dom'
import './Navbar.css'

const navItems = [
  { to: '/',        label: 'Home'    },
  { to: '/team',    label: 'Team'    },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg sticky-top devstudio-nav">
      <div className="container">
        <NavLink className="navbar-brand devstudio-brand" to="/">
          ⚡ DevStudio
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto gap-1">
            {navItems.map(({ to, label }) => (
              <li className="nav-item" key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `nav-link devstudio-navlink${isActive ? ' active' : ''}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
