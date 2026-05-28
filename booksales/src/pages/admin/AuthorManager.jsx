import { useState } from 'react'
import { useAdmin } from '../../context/AdminContext'

const EMPTY_FORM = { name: '', email: '', bio: '' }

const AVATAR_COLORS = [
  '#0d6efd','#198754','#dc3545','#ffc107','#0dcaf0',
  '#6f42c1','#fd7e14','#20c997','#e83e8c',
]

function getInitials(name) {
  return name.trim().split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
}

function avatarColor(id) {
  return AVATAR_COLORS[id % AVATAR_COLORS.length]
}

export default function AuthorManager() {
  const { authors, addAuthor } = useAdmin()
  const [form,      setForm]      = useState(EMPTY_FORM)
  const [showForm,  setShowForm]  = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [search,    setSearch]    = useState('')

  const filtered = authors.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase())
  )

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) return
    addAuthor(form)
    setForm(EMPTY_FORM)
    setSubmitted(true)
    setShowForm(false)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div>
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-0">✍️ Manajemen Author</h4>
          <p className="text-muted small mb-0">{authors.length} penulis terdaftar</p>
        </div>
        <button
          className={`btn ${showForm ? 'btn-outline-secondary' : 'btn-success'} d-flex align-items-center gap-2`}
          onClick={() => setShowForm(prev => !prev)}
        >
          {showForm ? '✕ Tutup' : '＋ Tambah Author'}
        </button>
      </div>

      {/* Success alert */}
      {submitted && (
        <div className="alert alert-success d-flex align-items-center gap-2 py-2" role="alert">
          <span>✅</span>
          <span>Author berhasil ditambahkan.</span>
        </div>
      )}

      {/* Create form */}
      {showForm && (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header fw-semibold text-white" style={{ background: '#198754' }}>
            Tambah Author Baru
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Nama Lengkap <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Contoh: Ahmad Fauzi"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="email@booksales.id"
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">Bio</label>
                  <textarea
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    className="form-control"
                    rows={2}
                    placeholder="Ceritakan sedikit tentang author ini..."
                  />
                </div>
              </div>
              <div className="d-flex gap-2 mt-3">
                <button type="submit" className="btn btn-success px-4">Simpan</button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => { setForm(EMPTY_FORM); setShowForm(false) }}>
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="mb-3">
        <input
          type="search"
          className="form-control"
          placeholder="🔍  Cari author..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Cards grid */}
      {filtered.length === 0 ? (
        <div className="text-center text-muted py-5">Tidak ada author yang ditemukan.</div>
      ) : (
        <div className="row g-3">
          {filtered.map(author => (
            <div className="col-sm-6 col-xl-4" key={author.id}>
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex gap-3 align-items-start">
                  {/* Avatar */}
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 text-white fw-bold"
                    style={{
                      width: '48px', height: '48px',
                      background: avatarColor(author.id),
                      fontSize: '1rem',
                    }}
                  >
                    {getInitials(author.name)}
                  </div>

                  {/* Info */}
                  <div className="overflow-hidden">
                    <h6 className="fw-bold mb-0 text-truncate">{author.name}</h6>
                    {author.email && (
                      <p className="text-muted small mb-1 text-truncate">
                        📧 {author.email}
                      </p>
                    )}
                    {author.bio && (
                      <p className="text-muted small mb-0" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}>
                        {author.bio}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
