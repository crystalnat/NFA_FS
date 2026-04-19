import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar'
import Home  from './pages/Home'
import Books from './pages/Books'

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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true,   element: <Home />  },
      { path: 'books', element: <Books /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
