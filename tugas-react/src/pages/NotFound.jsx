import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="text-center py-5">
      <h1 className="display-1 fw-bold text-primary">404</h1>
      <h3 className="mb-3">Halaman tidak ditemukan</h3>
      <Link to="/" className="btn btn-primary">Kembali ke Home</Link>
    </div>
  )
}
