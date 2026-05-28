import { NavLink, Outlet } from 'react-router-dom'

const sidebarStyle = {
  width: '240px',
  minHeight: 'calc(100vh - 56px)',
  background: 'linear-gradient(180deg,#1a1a2e 0%,#16213e 100%)',
}

const linkBase = 'd-flex align-items-center gap-2 px-3 py-2 rounded text-decoration-none mb-1'
const activeClass   = `${linkBase} bg-primary text-white fw-semibold`
const inactiveClass = `${linkBase} text-white-50`

export default function AdminLayout() {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <aside style={sidebarStyle} className="p-3 flex-shrink-0">
        <p className="text-uppercase text-secondary small fw-bold px-3 mb-3" style={{ letterSpacing: '0.08em' }}>
          Admin Panel
        </p>

        <nav className="d-flex flex-column">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) => isActive ? activeClass : inactiveClass}
          >
            <span>🏠</span> Dashboard
          </NavLink>

          <p className="text-secondary small px-3 mt-3 mb-1" style={{ fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Katalog
          </p>

          <NavLink
            to="/admin/genres"
            className={({ isActive }) => isActive ? activeClass : inactiveClass}
          >
            <span>🏷️</span> Genre
          </NavLink>

          <NavLink
            to="/admin/authors"
            className={({ isActive }) => isActive ? activeClass : inactiveClass}
          >
            <span>✍️</span> Author
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-grow-1 p-4" style={{ background: '#f8f9fa', minHeight: 'calc(100vh - 56px)' }}>
        <Outlet />
      </main>
    </div>
  )
}
