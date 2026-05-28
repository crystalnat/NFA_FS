import { useAdmin } from '../../context/AdminContext'
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  const { genres, authors } = useAdmin()

  const stats = [
    { label: 'Total Genre', value: genres.length,  icon: '🏷️', to: '/admin/genres',  color: '#0d6efd' },
    { label: 'Total Author', value: authors.length, icon: '✍️', to: '/admin/authors', color: '#198754' },
  ]

  return (
    <div>
      <h4 className="fw-bold mb-1">Dashboard</h4>
      <p className="text-muted mb-4">Selamat datang di panel administrasi BookSales.</p>

      <div className="row g-3">
        {stats.map(s => (
          <div className="col-sm-6 col-lg-4" key={s.label}>
            <Link to={s.to} className="text-decoration-none">
              <div className="card border-0 shadow-sm h-100" style={{ borderLeft: `4px solid ${s.color}` }}>
                <div className="card-body d-flex align-items-center gap-3">
                  <span style={{ fontSize: '2rem' }}>{s.icon}</span>
                  <div>
                    <div className="fs-2 fw-bold" style={{ color: s.color }}>{s.value}</div>
                    <div className="text-muted small">{s.label}</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
