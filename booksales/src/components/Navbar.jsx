import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { pathname }    = useLocation()
  const { currentUser, logout, isAdmin } = useAuth()
  const navigate = useNavigate()

  const isAdminArea = pathname.startsWith('/admin')

  const publicLinks = [['/', 'Home'], ['/books', 'Katalog Buku']]
  const adminLinks  = [['/admin', 'Dashboard'], ['/admin/genres', 'Genre'], ['/admin/authors', 'Author']]
  const links = isAdminArea ? adminLinks : publicLinks

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top"
      style={{ background: 'linear-gradient(90deg,#1a1a2e,#16213e)' }}>
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4" to="/">📚 BookSales</NavLink>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="nav">
          {/* ── Nav links ── */}
          <ul className="navbar-nav me-auto gap-1">
            {links.map(([to, label]) => (
              <li className="nav-item" key={to}>
                <NavLink to={to} end={to === '/' || to === '/admin'}
                  className={({ isActive }) =>
                    `nav-link px-3 py-2 rounded ${isActive ? 'bg-primary text-white fw-bold' : 'text-white-50'}`
                  }>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* ── Right side ── */}
          <ul className="navbar-nav ms-auto gap-2 align-items-center">
            {currentUser ? (
              <>
                {/* Toggle admin / toko */}
                {isAdmin && (
                  <li className="nav-item">
                    {isAdminArea ? (
                      <NavLink to="/" className="nav-link px-3 py-2 rounded border border-secondary text-white-50">
                        ← Ke Toko
                      </NavLink>
                    ) : (
                      <NavLink to="/admin" className="nav-link px-3 py-2 rounded border border-warning text-warning">
                        ⚙ Admin
                      </NavLink>
                    )}
                  </li>
                )}

                {/* User info dropdown */}
                <li className="nav-item dropdown">
                  <button
                    className="btn btn-sm d-flex align-items-center gap-2 px-3 py-2 rounded text-white"
                    style={{ background: 'rgba(255,255,255,0.1)', border: 'none' }}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white"
                      style={{
                        width: 28, height: 28, fontSize: '0.75rem',
                        background: currentUser.role === 'admin' ? '#dc3545' : '#0d6efd',
                      }}>
                      {currentUser.name.charAt(0).toUpperCase()}
                    </span>
                    <span className="d-none d-md-inline small fw-semibold">{currentUser.name}</span>
                    <span className="d-none d-md-inline">▾</span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-1">
                    <li>
                      <div className="px-3 py-2">
                        <div className="fw-semibold small">{currentUser.name}</div>
                        <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                          @{currentUser.username} ·{' '}
                          <span className={`badge ${currentUser.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                            {currentUser.role}
                          </span>
                        </div>
                      </div>
                    </li>
                    <li><hr className="dropdown-divider my-1" /></li>
                    <li>
                      <NavLink to="/dashboard" className="dropdown-item small">
                        🏠 Dashboard Saya
                      </NavLink>
                    </li>
                    <li><hr className="dropdown-divider my-1" /></li>
                    <li>
                      <button className="dropdown-item small text-danger" onClick={handleLogout}>
                        🚪 Keluar
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <NavLink to="/login"
                  className="btn btn-outline-light btn-sm px-3 fw-semibold">
                  Masuk
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
