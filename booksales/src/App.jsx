import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar'
import Home  from './pages/Home'
import Books from './pages/Books'
import AdminLayout    from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import GenreManager   from './pages/admin/GenreManager'
import AuthorManager  from './pages/admin/AuthorManager'
import { AdminProvider } from './context/AdminContext'

function Layout() {
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

function AdminRoot() {
  return (
    <AdminProvider>
      <Navbar />
      <AdminLayout />
    </AdminProvider>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true,   element: <Home />  },
      { path: 'books', element: <Books /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminRoot />,
    children: [
      { index: true,          element: <AdminDashboard /> },
      { path: 'genres',       element: <GenreManager />  },
      { path: 'authors',      element: <AuthorManager /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
