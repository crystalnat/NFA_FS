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
  // Akun yang bisa bertambah saat runtime (registrasi baru)
  const [accounts, setAccounts] = useState(ACCOUNTS)

  // Cek sessionStorage agar login tetap aktif selama tab terbuka
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem('booksales_user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  function register({ name, email, username, password }) {
    if (accounts.find(a => a.username === username)) {
      return { ok: false, message: 'Username sudah digunakan.' }
    }
    if (accounts.find(a => a.email === email)) {
      return { ok: false, message: 'Email sudah terdaftar.' }
    }

    const newAccount = {
      id: Date.now(),
      name,
      email,
      username,
      password,
      role: 'user',
    }
    setAccounts(prev => [...prev, newAccount])
    return { ok: true }
  }

  function login(username, password) {
    const account = accounts.find(
      a => a.username === username && a.password === password
    )
    if (!account) return { ok: false, message: 'Username atau password salah.' }

    const user = { id: account.id, name: account.name, email: account.email, username: account.username, role: account.role }
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
    <AuthContext.Provider value={{ currentUser, register, login, logout, isAdmin, isUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
