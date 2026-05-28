import { useState } from 'react'
import { useAdmin } from '../../context/AdminContext'

const EMPTY_FORM = { name: '', description: '' }

export default function GenreManager() {
  const { genres, addGenre, updateGenre, deleteGenre } = useAdmin()

  const [form,      setForm]      = useState(EMPTY_FORM)
  const [showForm,  setShowForm]  = useState(false)
  const [editId,    setEditId]    = useState(null)   // id genre yang sedang diedit
  const [editForm,  setEditForm]  = useState(EMPTY_FORM)
  const [deleteId,  setDeleteId]  = useState(null)   // id genre yang minta konfirmasi hapus
  const [toast,     setToast]     = useState(null)   // { msg, type }
  const [search,    setSearch]    = useState('')

  const filtered = genres.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    g.description.toLowerCase().includes(search.toLowerCase())
  )

  function showToast(msg, type = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  /* ── CREATE ── */
  function handleAdd(e) {
    e.preventDefault()
    if (!form.name.trim()) return
    addGenre(form)
    setForm(EMPTY_FORM)
    setShowForm(false)
    showToast('Genre berhasil ditambahkan.')
  }

  /* ── UPDATE ── */
  function startEdit(genre) {
    setEditId(genre.id)
    setEditForm({ name: genre.name, description: genre.description })
  }

  function handleUpdate(e) {
    e.preventDefault()
    if (!editForm.name.trim()) return
    updateGenre(editId, editForm)
    setEditId(null)
    showToast('Genre berhasil diperbarui.', 'info')
  }

  function cancelEdit() {
    setEditId(null)
    setEditForm(EMPTY_FORM)
  }

  /* ── DELETE ── */
  function confirmDelete(id) { setDeleteId(id) }
  function cancelDelete()    { setDeleteId(null) }
  function handleDelete() {
    deleteGenre(deleteId)
    setDeleteId(null)
    showToast('Genre berhasil dihapus.', 'danger')
  }

  const toastColors = { success: '#198754', info: '#0d6efd', danger: '#dc3545' }

  return (
    <div>
      {/* ── Toast ── */}
      {toast && (
        <div
          className="position-fixed top-0 end-0 m-3 px-4 py-2 rounded shadow text-white fw-semibold"
          style={{ background: toastColors[toast.type], zIndex: 9999, fontSize: '0.9rem' }}
        >
          {toast.type === 'success' && '✅ '}
          {toast.type === 'info'    && '✏️ '}
          {toast.type === 'danger'  && '🗑️ '}
          {toast.msg}
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteId && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ background: 'rgba(0,0,0,0.45)', zIndex: 9998 }}>
          <div className="card border-0 shadow-lg p-4" style={{ maxWidth: '380px', width: '90%' }}>
            <h5 className="fw-bold mb-2">🗑️ Hapus Genre?</h5>
            <p className="text-muted mb-4">
              Genre <strong>"{genres.find(g => g.id === deleteId)?.name}"</strong> akan dihapus permanen.
            </p>
            <div className="d-flex gap-2 justify-content-end">
              <button className="btn btn-outline-secondary" onClick={cancelDelete}>Batal</button>
              <button className="btn btn-danger" onClick={handleDelete}>Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-0">🏷️ Manajemen Genre</h4>
          <p className="text-muted small mb-0">{genres.length} genre terdaftar</p>
        </div>
        <button
          className={`btn ${showForm ? 'btn-outline-secondary' : 'btn-primary'}`}
          onClick={() => { setShowForm(p => !p); setEditId(null) }}
        >
          {showForm ? '✕ Tutup' : '＋ Tambah Genre'}
        </button>
      </div>

      {/* ── Create Form ── */}
      {showForm && (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-primary text-white fw-semibold">Tambah Genre Baru</div>
          <div className="card-body">
            <form onSubmit={handleAdd}>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Nama Genre <span className="text-danger">*</span></label>
                  <input type="text" name="name" value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    className="form-control" placeholder="Contoh: Kotlin" required />
                </div>
                <div className="col-md-8">
                  <label className="form-label fw-semibold">Deskripsi</label>
                  <input type="text" name="description" value={form.description}
                    onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                    className="form-control" placeholder="Deskripsi singkat..." />
                </div>
              </div>
              <div className="d-flex gap-2 mt-3">
                <button type="submit" className="btn btn-primary px-4">Simpan</button>
                <button type="button" className="btn btn-outline-secondary"
                  onClick={() => { setForm(EMPTY_FORM); setShowForm(false) }}>Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Search ── */}
      <div className="mb-3">
        <input type="search" className="form-control" placeholder="🔍  Cari genre..."
          value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* ── Table ── */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <table className="table table-hover align-middle mb-0">
            <thead style={{ background: '#1a1a2e', color: '#fff' }}>
              <tr>
                <th className="ps-4" style={{ width: 44 }}>#</th>
                <th style={{ width: 160 }}>Nama Genre</th>
                <th>Deskripsi</th>
                <th style={{ width: 130 }} className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={4} className="text-center text-muted py-5">Tidak ada genre ditemukan.</td></tr>
              ) : filtered.map((genre, idx) => (
                <tr key={genre.id}>
                  {editId === genre.id ? (
                    /* ── Inline Edit Row ── */
                    <td colSpan={4} className="py-2 px-3">
                      <form onSubmit={handleUpdate} className="d-flex gap-2 align-items-center flex-wrap">
                        <input type="text" value={editForm.name} required
                          onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))}
                          className="form-control form-control-sm" style={{ width: 140 }} placeholder="Nama" />
                        <input type="text" value={editForm.description}
                          onChange={e => setEditForm(p => ({ ...p, description: e.target.value }))}
                          className="form-control form-control-sm flex-grow-1" placeholder="Deskripsi" />
                        <button type="submit" className="btn btn-sm btn-success px-3">Simpan</button>
                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={cancelEdit}>Batal</button>
                      </form>
                    </td>
                  ) : (
                    /* ── Normal Row ── */
                    <>
                      <td className="ps-4 text-muted small">{idx + 1}</td>
                      <td>
                        <span className="badge rounded-pill px-3 py-2 fw-semibold"
                          style={{ background: '#e8f0fe', color: '#1a73e8', fontSize: '0.85rem' }}>
                          {genre.name}
                        </span>
                      </td>
                      <td className="text-muted">{genre.description || <em className="text-secondary">—</em>}</td>
                      <td className="text-center">
                        <button className="btn btn-sm btn-outline-primary me-1" onClick={() => startEdit(genre)}
                          title="Edit">✏️</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => confirmDelete(genre.id)}
                          title="Hapus">🗑️</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
