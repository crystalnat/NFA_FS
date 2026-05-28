import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function UserDashboard() {
  const { currentUser } = useAuth()

  const menu = [
    { icon: '🏠', label: 'Beranda',       to: '/',      desc: 'Lihat halaman utama toko' },
    { icon: '📚', label: 'Katalog Buku',  to: '/books', desc: 'Jelajahi semua koleksi buku' },
  ]

  return (
    <div className="container py-5">
      {/* Greeting */}
      <div className="card border-0 shadow-sm mb-4"
        style={{ background: 'linear-gradient(135deg,#1a1a2e,#16213e)', color: '#fff' }}>
        <div className="card-body p-4 d-flex align-items-center gap-4">
          <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0"
            style={{ width: 64, height: 64, background: '#0d6efd', fontSize: '1.5rem' }}>
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="fw-bold mb-1">Selamat datang, {currentUser.name}! 👋</h4>
            <p className="mb-0 text-white-50 small">
              Anda masuk sebagai <span className="badge bg-primary">{currentUser.role}</span>
              &nbsp;·&nbsp; @{currentUser.username}
            </p>
          </div>
        </div>
      </div>

      <h5 className="fw-bold mb-3">Menu Tersedia</h5>
      <div className="row g-3">
        {menu.map(m => (
          <div className="col-sm-6 col-md-4" key={m.to}>
            <Link to={m.to} className="text-decoration-none">
              <div className="card border-0 shadow-sm h-100 card-hover">
                <div className="card-body d-flex align-items-center gap-3 p-3">
                  <span style={{ fontSize: '1.8rem' }}>{m.icon}</span>
                  <div>
                    <div className="fw-semibold">{m.label}</div>
                    <div className="text-muted small">{m.desc}</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="alert alert-info mt-4 d-flex gap-2 align-items-start">
        <span>ℹ️</span>
        <div>
          Sebagai <strong>user</strong>, Anda dapat mengakses beranda dan katalog buku.
          Halaman Admin tidak dapat diakses dengan akun ini.
        </div>
      </div>
    </div>
  )
}
