import { createContext, useContext, useState } from 'react'

/**
 * Simulasi database akun (di aplikasi nyata, diganti dengan API)
 * Role: 'admin' | 'user'
 */
const ACCOUNTS = [
  { id: 1, name: 'Admin BookSales', username: 'admin', password: 'admin123', role: 'admin' },
  { id: 2, name: 'Budi Santoso',    username: 'budi',  password: 'user123',  role: 'user'  },
  { id: 3, name: 'Dina Sari',       username: 'dina',  password: 'user123',  role: 'user'  },
]

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // Cek sessionStorage agar login tetap aktif selama tab terbuka
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem('booksales_user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  function login(username, password) {
    const account = ACCOUNTS.find(
      a => a.username === username && a.password === password
    )
    if (!account) return { ok: false, message: 'Username atau password salah.' }

    const user = { id: account.id, name: account.name, username: account.username, role: account.role }
    sessionStorage.setItem('booksales_user', JSON.stringify(user))
    setCurrentUser(user)
    return { ok: true, user }
  }

  function logout() {
    sessionStorage.removeItem('booksales_user')
    setCurrentUser(null)
  }

  const isAdmin = currentUser?.role === 'admin'
  const isUser  = currentUser?.role === 'user'

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isAdmin, isUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
