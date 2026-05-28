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
  const { authors, addAuthor, updateAuthor, deleteAuthor } = useAdmin()

  const [form,       setForm]       = useState(EMPTY_FORM)
  const [showForm,   setShowForm]   = useState(false)
  const [editTarget, setEditTarget] = useState(null)  // author object being edited
  const [editForm,   setEditForm]   = useState(EMPTY_FORM)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [toast,      setToast]      = useState(null)
  const [search,     setSearch]     = useState('')

  const filtered = authors.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase())
  )

  function showToast(msg, type = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  /* ── CREATE ── */
  function handleAdd(e) {
    e.preventDefault()
    if (!form.name.trim()) return
    addAuthor(form)
    setForm(EMPTY_FORM)
    setShowForm(false)
    showToast('Author berhasil ditambahkan.')
  }

  /* ── UPDATE ── */
  function startEdit(author) {
    setEditTarget(author)
    setEditForm({ name: author.name, email: author.email, bio: author.bio })
  }

  function handleUpdate(e) {
    e.preventDefault()
    if (!editForm.name.trim()) return
    updateAuthor(editTarget.id, editForm)
    setEditTarget(null)
    showToast('Author berhasil diperbarui.', 'info')
  }

  /* ── DELETE ── */
  function handleDelete() {
    deleteAuthor(deleteTarget.id)
    setDeleteTarget(null)
    showToast('Author berhasil dihapus.', 'danger')
  }

  const toastColors = { success: '#198754', info: '#0d6efd', danger: '#dc3545' }

  return (
    <div>
      {/* ── Toast ── */}
      {toast && (
        <div className="position-fixed top-0 end-0 m-3 px-4 py-2 rounded shadow text-white fw-semibold"
          style={{ background: toastColors[toast.type], zIndex: 9999, fontSize: '0.9rem' }}>
          {toast.type === 'success' && '✅ '}
          {toast.type === 'info'    && '✏️ '}
          {toast.type === 'danger'  && '🗑️ '}
          {toast.msg}
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteTarget && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ background: 'rgba(0,0,0,0.45)', zIndex: 9998 }}>
          <div className="card border-0 shadow-lg p-4" style={{ maxWidth: '380px', width: '90%' }}>
            <h5 className="fw-bold mb-2">🗑️ Hapus Author?</h5>
            <p className="text-muted mb-4">
              Author <strong>"{deleteTarget.name}"</strong> akan dihapus permanen.
            </p>
            <div className="d-flex gap-2 justify-content-end">
              <button className="btn btn-outline-secondary" onClick={() => setDeleteTarget(null)}>Batal</button>
              <button className="btn btn-danger" onClick={handleDelete}>Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit Modal ── */}
      {editTarget && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ background: 'rgba(0,0,0,0.45)', zIndex: 9998 }}>
          <div className="card border-0 shadow-lg" style={{ maxWidth: '480px', width: '95%' }}>
            <div className="card-header fw-semibold text-white d-flex justify-content-between align-items-center"
              style={{ background: '#0d6efd' }}>
              <span>✏️ Edit Author</span>
              <button className="btn btn-sm text-white" onClick={() => setEditTarget(null)}
                style={{ fontSize: '1.1rem', lineHeight: 1 }}>✕</button>
            </div>
            <div className="card-body">
              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Nama Lengkap <span className="text-danger">*</span></label>
                  <input type="text" value={editForm.name} required
                    onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))}
                    className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <input type="email" value={editForm.email}
                    onChange={e => setEditForm(p => ({ ...p, email: e.target.value }))}
                    className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Bio</label>
                  <textarea value={editForm.bio} rows={3}
                    onChange={e => setEditForm(p => ({ ...p, bio: e.target.value }))}
                    className="form-control" />
                </div>
                <div className="d-flex gap-2 justify-content-end">
                  <button type="button" className="btn btn-outline-secondary"
                    onClick={() => setEditTarget(null)}>Batal</button>
                  <button type="submit" className="btn btn-primary px-4">Simpan Perubahan</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-0">✍️ Manajemen Author</h4>
          <p className="text-muted small mb-0">{authors.length} penulis terdaftar</p>
        </div>
        <button
          className={`btn ${showForm ? 'btn-outline-secondary' : 'btn-success'}`}
          onClick={() => { setShowForm(p => !p); setEditTarget(null) }}
        >
          {showForm ? '✕ Tutup' : '＋ Tambah Author'}
        </button>
      </div>

      {/* ── Create Form ── */}
      {showForm && (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header fw-semibold text-white" style={{ background: '#198754' }}>
            Tambah Author Baru
          </div>
          <div className="card-body">
            <form onSubmit={handleAdd}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Nama Lengkap <span className="text-danger">*</span></label>
                  <input type="text" name="name" value={form.name} required
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    className="form-control" placeholder="Contoh: Ahmad Fauzi" />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Email</label>
                  <input type="email" name="email" value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    className="form-control" placeholder="email@booksales.id" />
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">Bio</label>
                  <textarea name="bio" value={form.bio} rows={2}
                    onChange={e => setForm(p => ({ ...p, bio: e.target.value }))}
                    className="form-control" placeholder="Ceritakan sedikit tentang author ini..." />
                </div>
              </div>
              <div className="d-flex gap-2 mt-3">
                <button type="submit" className="btn btn-success px-4">Simpan</button>
                <button type="button" className="btn btn-outline-secondary"
                  onClick={() => { setForm(EMPTY_FORM); setShowForm(false) }}>Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Search ── */}
      <div className="mb-3">
        <input type="search" className="form-control" placeholder="🔍  Cari author..."
          value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* ── Cards Grid ── */}
      {filtered.length === 0 ? (
        <div className="text-center text-muted py-5">Tidak ada author yang ditemukan.</div>
      ) : (
        <div className="row g-3">
          {filtered.map(author => (
            <div className="col-sm-6 col-xl-4" key={author.id}>
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex gap-3 align-items-start">
                  {/* Avatar */}
                  <div className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 text-white fw-bold"
                    style={{ width: 48, height: 48, background: avatarColor(author.id), fontSize: '1rem' }}>
                    {getInitials(author.name)}
                  </div>

                  {/* Info */}
                  <div className="overflow-hidden flex-grow-1">
                    <h6 className="fw-bold mb-0 text-truncate">{author.name}</h6>
                    {author.email && (
                      <p className="text-muted small mb-1 text-truncate">📧 {author.email}</p>
                    )}
                    {author.bio && (
                      <p className="text-muted small mb-0" style={{
                        display: '-webkit-box', WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical', overflow: 'hidden',
                      }}>{author.bio}</p>
                    )}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="card-footer bg-transparent border-top-0 pt-0 pb-2 px-3 d-flex gap-2 justify-content-end">
                  <button className="btn btn-sm btn-outline-primary" onClick={() => startEdit(author)}
                    title="Edit">✏️ Edit</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => setDeleteTarget(author)}
                    title="Hapus">🗑️ Hapus</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
