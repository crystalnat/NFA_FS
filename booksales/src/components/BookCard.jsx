export default function BookCard({ book }) {
  return (
    <div className="card h-100 shadow-sm border-0">
      <img
        src={book.image}
        alt={book.title}
        className="card-img-top"
        style={{ height: '200px', objectFit: 'cover' }}
        onError={e => { e.target.src = 'https://via.placeholder.com/300x200?text=No+Image' }}
      />
      <div className="card-body d-flex flex-column">
        <span className="badge bg-primary mb-2 align-self-start">{book.category}</span>
        <h6 className="card-title fw-bold">{book.title}</h6>
        <p className="text-muted small mb-1">✍️ {book.author} · {book.year}</p>
        <p className="card-text small text-muted flex-grow-1">{book.description}</p>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="fw-bold text-primary">Rp {book.price.toLocaleString('id-ID')}</span>
          <button className="btn btn-sm btn-primary">Beli</button>
        </div>
      </div>
    </div>
  )
}
