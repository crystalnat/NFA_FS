import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * ProtectedRoute
 * @param {string|string[]} allowedRoles - role yang boleh akses, e.g. 'admin' atau ['admin','user']
 * @param {ReactNode}       children
 *
 * Alur:
 *  - Belum login          → redirect ke /login (simpan tujuan asal di state)
 *  - Sudah login tapi role tidak sesuai → redirect ke /unauthorized
 *  - OK                   → render children
 */
export default function ProtectedRoute({ allowedRoles, children }) {
  const { currentUser } = useAuth()
  const location = useLocation()

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles]
  if (!roles.includes(currentUser.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}
