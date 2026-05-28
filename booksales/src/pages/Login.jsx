import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login, currentUser } = useAuth()
  const navigate  = useNavigate()
  const location  = useLocation()
  const from      = location.state?.from?.pathname || '/'

  const [form,  setForm]  = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Jika sudah login, langsung redirect
  if (currentUser) {
    navigate(currentUser.role === 'admin' ? '/admin' : '/dashboard', { replace: true })
  }

  function handleChange(e) {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
    setError('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const result = login(form.username, form.password)
    setLoading(false)
    if (!result.ok) { setError(result.message); return }
    navigate(result.user.role === 'admin' ? '/admin' : from, { replace: true })
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ background: 'linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)' }}>
      <div style={{ width: '100%', maxWidth: '420px' }} className="px-3">

        {/* Logo */}
        <div className="text-center mb-4">
          <div style={{ fontSize: '3rem' }}>📚</div>
          <h3 className="text-white fw-bold mb-0">BookSales</h3>
          <p className="text-white-50 small">Masuk ke akun Anda</p>
        </div>

        {/* Card */}
        <div className="card border-0 shadow-lg">
          <div className="card-body p-4">
            <h5 className="fw-bold mb-4 text-center">Login</h5>

            {error && (
              <div className="alert alert-danger py-2 d-flex align-items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Username</label>
                <div className="input-group">
                  <span className="input-group-text">👤</span>
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Masukkan username"
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Password</label>
                <div className="input-group">
                  <span className="input-group-text">🔒</span>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Masukkan password"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100 fw-semibold py-2" disabled={loading}>
                {loading ? 'Memproses...' : 'Masuk'}
              </button>
            </form>

            <div className="mt-4 pt-3 border-top">
              <p className="text-muted small fw-semibold mb-2">Akun demo:</p>
              <div className="d-flex gap-2 flex-wrap">
                <span className="badge bg-danger-subtle text-danger px-3 py-2">
                  👑 admin / admin123
                </span>
                <span className="badge bg-primary-subtle text-primary px-3 py-2">
                  👤 budi / user123
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center mt-3">
          <Link to="/" className="text-white-50 small">← Kembali ke Beranda</Link>
        </p>
      </div>
    </div>
  )
}
