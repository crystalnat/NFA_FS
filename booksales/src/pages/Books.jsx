import { useState } from 'react'
import defaultBooks from '../Utils/books'
import BookCard from '../components/BookCard'

export default function Books() {
  const [bookList, setBookList] = useState(defaultBooks)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', author: '', year: '', price: '', category: '', description: '' })

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const addBook = e => {
    e.preventDefault()
    const newBook = {
      ...form,
      id: bookList.length + 1,
      year: Number(form.year),
      price: Number(form.price),
      image: 'https://via.placeholder.com/300x200?text=New+Book',
    }
    setBookList([...bookList, newBook])
    setForm({ title: '', author: '', year: '', price: '', category: '', description: '' })
    setShowForm(false)
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Semua Buku <span className="badge bg-primary">{bookList.length}</span></h2>
        <button className="btn btn-success" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Batal' : '+ Tambah Buku'}
        </button>
      </div>

      {/* Form tambah buku */}
      {showForm && (
        <div className="card border-0 shadow-sm p-4 mb-4">
          <h5 className="fw-bold mb-3">Tambah Buku Baru</h5>
          <form onSubmit={addBook}>
            <div className="row g-3">
              <div className="col-md-6"><input name="title" className="form-control" placeholder="Judul Buku" value={form.title} onChange={handle} required /></div>
              <div className="col-md-6"><input name="author" className="form-control" placeholder="Penulis" value={form.author} onChange={handle} required /></div>
              <div className="col-md-4"><input name="year" type="number" className="form-control" placeholder="Tahun" value={form.year} onChange={handle} required /></div>
              <div className="col-md-4"><input name="price" type="number" className="form-control" placeholder="Harga (Rp)" value={form.price} onChange={handle} required /></div>
              <div className="col-md-4"><input name="category" className="form-control" placeholder="Kategori" value={form.category} onChange={handle} required /></div>
              <div className="col-12"><textarea name="description" className="form-control" placeholder="Deskripsi" rows={2} value={form.description} onChange={handle} required /></div>
              <div className="col-12"><button type="submit" className="btn btn-primary w-100">Simpan Buku</button></div>
            </div>
          </form>
        </div>
      )}

      {/* Grid buku */}
      <div className="row g-4">
        {bookList.map(book => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={book.id}>
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </div>
  )
}
