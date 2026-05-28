import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import { AuthProvider }  from './context/AuthContext'
import { AdminProvider } from './context/AdminContext'

import Navbar        from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

import Home           from './pages/Home'
import Books          from './pages/Books'
import Login          from './pages/Login'
import UserDashboard  from './pages/UserDashboard'
import Unauthorized   from './pages/Unauthorized'

import AdminLayout    from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import GenreManager   from './pages/admin/GenreManager'
import AuthorManager  from './pages/admin/AuthorManager'

/* ── Layout publik (semua orang bisa akses) ── */
function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <footer className="text-center py-3 bg-dark text-secondary small mt-5">
        © 2025 BookSales — Built with React & Bootstrap
      </footer>
    </>
  )
}

/* ── Layout admin (hanya admin) ── */
function AdminRoot() {
  return (
    <AdminProvider>
      <Navbar />
      <ProtectedRoute allowedRoles="admin">
        <AdminLayout />
      </ProtectedRoute>
    </AdminProvider>
  )
}

const router = createBrowserRouter([
  /* ── Halaman publik ── */
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true,   element: <Home />  },
      { path: 'books', element: <Books /> },
    ],
  },

  /* ── Login (tidak pakai layout navbar) ── */
  { path: '/login', element: <Login /> },

  /* ── Halaman khusus USER yang sudah login ── */
  {
    path: '/dashboard',
    element: (
      <PublicLayout />
    ),
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute allowedRoles={['user', 'admin']}>
            <UserDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },

  /* ── Halaman ADMIN ── */
  {
    path: '/admin',
    element: <AdminRoot />,
    children: [
      { index: true,     element: <AdminDashboard /> },
      { path: 'genres',  element: <GenreManager />   },
      { path: 'authors', element: <AuthorManager />  },
    ],
  },

  /* ── Unauthorized ── */
  { path: '/unauthorized', element: <Unauthorized /> },
])

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}
