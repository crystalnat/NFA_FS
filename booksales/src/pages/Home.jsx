import { useState } from 'react'
import { Link } from 'react-router-dom'
import books from '../Utils/books'
import BookCard from '../components/BookCard'

export default function Home() {
  const featured = books.slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="py-5 text-white text-center" style={{ background: 'linear-gradient(135deg,#1a1a2e,#0f3460)' }}>
        <div className="container py-4">
          <h1 className="display-4 fw-bold mb-3">📚 Toko Buku Online</h1>
          <p className="lead mb-4">Temukan buku pemrograman terbaik untuk tingkatkan skill coding kamu.</p>
          <Link to="/books" className="btn btn-light btn-lg fw-semibold">Lihat Semua Buku</Link>
        </div>
      </section>

      {/* Featured */}
      <section className="py-5">
        <div className="container">
          <h2 className="fw-bold mb-4 text-center">Buku Pilihan</h2>
          <div className="row g-4">
            {featured.map(book => (
              <div className="col-md-4" key={book.id}>
                <BookCard book={book} />
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/books" className="btn btn-primary btn-lg">Lihat Semua →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
