import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const EMPTY_FORM = { name: '', email: '', username: '', password: '', confirmPassword: '' }

/* Aturan validasi per field */
function validate(form) {
  const errors = {}

  if (!form.name.trim()) {
    errors.name = 'Nama lengkap tidak boleh kosong.'
  } else if (form.name.trim().length < 3) {
    errors.name = 'Nama minimal 3 karakter.'
  }

  if (!form.email.trim()) {
    errors.email = 'Email tidak boleh kosong.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Format email tidak valid.'
  }

  if (!form.username.trim()) {
    errors.username = 'Username tidak boleh kosong.'
  } else if (form.username.length < 4) {
    errors.username = 'Username minimal 4 karakter.'
  } else if (!/^[a-zA-Z0-9_]+$/.test(form.username)) {
    errors.username = 'Username hanya boleh huruf, angka, dan underscore.'
  }

  if (!form.password) {
    errors.password = 'Password tidak boleh kosong.'
  } else if (form.password.length < 6) {
    errors.password = 'Password minimal 6 karakter.'
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = 'Konfirmasi password tidak boleh kosong.'
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Password tidak cocok.'
  }

  return errors
}

/* Komponen field input reusable */
function Field({ label, icon, error, children }) {
  return (
    <div className="mb-3">
      <label className="form-label fw-semibold small">{label}</label>
      <div className={`input-group ${error ? 'is-invalid-group' : ''}`}>
        <span className="input-group-text bg-light">{icon}</span>
        {children}
      </div>
      {error && <div className="text-danger small mt-1">⚠ {error}</div>}
    </div>
  )
}

/* Indikator kekuatan password */
function PasswordStrength({ password }) {
  if (!password) return null

  let strength = 0
  if (password.length >= 6)                        strength++
  if (password.length >= 10)                       strength++
  if (/[A-Z]/.test(password))                      strength++
  if (/[0-9]/.test(password))                      strength++
  if (/[^A-Za-z0-9]/.test(password))              strength++

  const levels = [
    { label: 'Sangat Lemah', color: '#ef4444', width: '20%' },
    { label: 'Lemah',        color: '#f97316', width: '40%' },
    { label: 'Cukup',        color: '#eab308', width: '60%' },
    { label: 'Kuat',         color: '#22c55e', width: '80%' },
    { label: 'Sangat Kuat',  color: '#16a34a', width: '100%' },
  ]
  const lvl = levels[Math.min(strength, 4)]

  return (
    <div className="mt-1">
      <div style={{ height: 4, background: '#e5e7eb', borderRadius: 99 }}>
        <div style={{ height: 4, width: lvl.width, background: lvl.color, borderRadius: 99, transition: 'width .3s' }} />
      </div>
      <small style={{ color: lvl.color }}>{lvl.label}</small>
    </div>
  )
}

export default function Register() {
  const { register, currentUser } = useAuth()
  const navigate = useNavigate()

  const [form,        setForm]        = useState(EMPTY_FORM)
  const [errors,      setErrors]      = useState({})
  const [serverError, setServerError] = useState('')
  const [showPass,    setShowPass]    = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [success,     setSuccess]     = useState(false)

  if (currentUser) navigate('/dashboard', { replace: true })

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    // hapus error field yang sedang diketik
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    setServerError('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    const fieldErrors = validate(form)
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return
    }

    const result = register({
      name:     form.name.trim(),
      email:    form.email.trim(),
      username: form.username.trim(),
      password: form.password,
    })

    if (!result.ok) {
      setServerError(result.message)
      return
    }

    setSuccess(true)
    setTimeout(() => navigate('/login'), 2500)
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center py-4"
      style={{ background: 'linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)' }}>

      <div style={{ width: '100%', maxWidth: '460px' }} className="px-3">

        {/* Logo */}
        <div className="text-center mb-4">
          <div style={{ fontSize: '3rem' }}>📚</div>
          <h3 className="text-white fw-bold mb-0">BookSales</h3>
          <p className="text-white-50 small">Buat akun baru untuk memulai</p>
        </div>

        {/* Card */}
        <div className="card border-0 shadow-lg rounded-4">
          <div className="card-body p-4">

            {/* Judul */}
            <div className="d-flex align-items-center gap-2 mb-4">
              <div className="rounded-circle d-flex align-items-center justify-content-center text-white"
                style={{ width: 36, height: 36, background: '#0d6efd', fontSize: '1rem' }}>✨</div>
              <div>
                <h5 className="fw-bold mb-0">Daftar Akun</h5>
                <p className="text-muted mb-0" style={{ fontSize: '.78rem' }}>
                  Sudah punya akun? <Link to="/login" className="text-primary fw-semibold">Masuk</Link>
                </p>
              </div>
            </div>

            {/* Success State */}
            {success ? (
              <div className="text-center py-4">
                <div style={{ fontSize: '3.5rem' }}>🎉</div>
                <h5 className="fw-bold mt-2 mb-1">Registrasi Berhasil!</h5>
                <p className="text-muted small">Anda akan diarahkan ke halaman login...</p>
                <div className="spinner-border spinner-border-sm text-primary mt-2" role="status" />
              </div>
            ) : (
              <>
                {/* Server error */}
                {serverError && (
                  <div className="alert alert-danger py-2 d-flex align-items-center gap-2 small mb-3">
                    <span>🚫</span> {serverError}
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>

                  {/* Nama Lengkap */}
                  <Field label="Nama Lengkap *" icon="👤" error={errors.name}>
                    <input type="text" name="name" value={form.name} onChange={handleChange}
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      placeholder="Masukkan nama lengkap" />
                  </Field>

                  {/* Email */}
                  <Field label="Email *" icon="✉️" error={errors.email}>
                    <input type="email" name="email" value={form.email} onChange={handleChange}
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="contoh@email.com" />
                  </Field>

                  {/* Username */}
                  <Field label="Username *" icon="🆔" error={errors.username}>
                    <input type="text" name="username" value={form.username} onChange={handleChange}
                      className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                      placeholder="min. 4 karakter, tanpa spasi" />
                  </Field>

                  {/* Password */}
                  <Field label="Password *" icon="🔒" error={errors.password}>
                    <input
                      type={showPass ? 'text' : 'password'}
                      name="password" value={form.password} onChange={handleChange}
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      placeholder="min. 6 karakter" />
                    <button type="button" className="input-group-text bg-light border-start"
                      onClick={() => setShowPass(p => !p)} tabIndex={-1}>
                      {showPass ? '🙈' : '👁️'}
                    </button>
                  </Field>
                  {form.password && <PasswordStrength password={form.password} />}

                  {/* Konfirmasi Password */}
                  <div className="mt-2">
                    <Field label="Konfirmasi Password *" icon="🔐" error={errors.confirmPassword}>
                      <input
                        type={showConfirm ? 'text' : 'password'}
                        name="confirmPassword" value={form.confirmPassword} onChange={handleChange}
                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        placeholder="Ulangi password" />
                      <button type="button" className="input-group-text bg-light border-start"
                        onClick={() => setShowConfirm(p => !p)} tabIndex={-1}>
                        {showConfirm ? '🙈' : '👁️'}
                      </button>
                    </Field>
                  </div>

                  <button type="submit" className="btn btn-primary w-100 fw-semibold py-2 mt-3"
                    style={{ background: 'linear-gradient(90deg,#1a1a2e,#0d6efd)', border: 'none' }}>
                    Daftar Sekarang →
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        <p className="text-center mt-3">
          <Link to="/" className="text-white-50 small">← Kembali ke Beranda</Link>
        </p>
      </div>
    </div>
  )
}
