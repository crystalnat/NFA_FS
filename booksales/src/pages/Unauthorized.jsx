import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Unauthorized() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ background: '#f8f9fa' }}>
      <div className="text-center px-3" style={{ maxWidth: 480 }}>
        <div style={{ fontSize: '5rem' }}>🚫</div>
        <h2 className="fw-bold mt-3 mb-2">Akses Ditolak</h2>
        <p className="text-muted mb-4">
          Anda tidak memiliki izin untuk mengakses halaman ini.
          {currentUser && (
            <> Akun <strong>@{currentUser.username}</strong> memiliki peran <strong>{currentUser.role}</strong>.</>
          )}
        </p>
        <div className="d-flex gap-2 justify-content-center flex-wrap">
          <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
            ← Kembali
          </button>
          <Link to={currentUser?.role === 'admin' ? '/admin' : '/dashboard'} className="btn btn-primary">
            Ke Dashboard Saya
          </Link>
        </div>
      </div>
    </div>
  )
}
