import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import RootLayout from './layouts/RootLayout'
import Home       from './pages/Home'
import Team       from './pages/Team'
import Contact    from './pages/Contact'
import NotFound   from './pages/NotFound'

/**
 * Declarative route tree — sesuai pola React Router v6 terbaru.
 *
 * RootLayout (Navbar + Outlet + Footer)
 * ├── /          → Home
 * ├── /team      → Team
 * └── /contact   → Contact
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true,       element: <Home />    },
      { path: 'team',      element: <Team />    },
      { path: 'contact',   element: <Contact /> },
      { path: '*',         element: <NotFound /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
