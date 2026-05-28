import { useState } from 'react'
import { useAdmin } from '../../context/AdminContext'

const EMPTY_FORM = { name: '', description: '' }

export default function GenreManager() {
  const { genres, addGenre } = useAdmin()
  const [form,       setForm]       = useState(EMPTY_FORM)
  const [showForm,   setShowForm]   = useState(false)
  const [submitted,  setSubmitted]  = useState(false)
  const [search,     setSearch]     = useState('')

  const filtered = genres.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    g.description.toLowerCase().includes(search.toLowerCase())
  )

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) return
    addGenre(form)
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
          <h4 className="fw-bold mb-0">🏷️ Manajemen Genre</h4>
          <p className="text-muted small mb-0">{genres.length} genre terdaftar</p>
        </div>
        <button
          className={`btn ${showForm ? 'btn-outline-secondary' : 'btn-primary'} d-flex align-items-center gap-2`}
          onClick={() => setShowForm(prev => !prev)}
        >
          {showForm ? '✕ Tutup' : '＋ Tambah Genre'}
        </button>
      </div>

      {/* Success alert */}
      {submitted && (
        <div className="alert alert-success alert-dismissible d-flex align-items-center gap-2 py-2" role="alert">
          <span>✅</span>
          <span>Genre berhasil ditambahkan.</span>
        </div>
      )}

      {/* Create form */}
      {showForm && (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-primary text-white fw-semibold">
            Tambah Genre Baru
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Nama Genre <span className="text-danger">*</span></label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Contoh: Kotlin"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Deskripsi</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="form-control"
                  rows={2}
                  placeholder="Deskripsi singkat tentang genre ini..."
                />
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary px-4">Simpan</button>
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
          placeholder="🔍  Cari genre..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <table className="table table-hover align-middle mb-0">
            <thead style={{ background: '#1a1a2e', color: '#fff' }}>
              <tr>
                <th className="ps-4" style={{ width: '50px' }}>#</th>
                <th style={{ width: '160px' }}>Nama Genre</th>
                <th>Deskripsi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center text-muted py-5">
                    Tidak ada genre yang ditemukan.
                  </td>
                </tr>
              ) : (
                filtered.map((genre, idx) => (
                  <tr key={genre.id}>
                    <td className="ps-4 text-muted small">{idx + 1}</td>
                    <td>
                      <span className="badge rounded-pill px-3 py-2 fw-semibold"
                        style={{ background: '#e8f0fe', color: '#1a73e8', fontSize: '0.85rem' }}>
                        {genre.name}
                      </span>
                    </td>
                    <td className="text-muted">{genre.description || <em className="text-secondary">—</em>}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
