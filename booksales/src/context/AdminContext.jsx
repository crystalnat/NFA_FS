import { createContext, useContext, useState } from 'react'
import initialGenres  from '../Utils/genres'
import initialAuthors from '../Utils/authors'

const AdminContext = createContext(null)

export function AdminProvider({ children }) {
  const [genres,  setGenres]  = useState(initialGenres)
  const [authors, setAuthors] = useState(initialAuthors)

  function addGenre(genre) {
    setGenres(prev => [...prev, { ...genre, id: Date.now() }])
  }

  function updateGenre(id, updated) {
    setGenres(prev => prev.map(g => g.id === id ? { ...g, ...updated } : g))
  }

  function deleteGenre(id) {
    setGenres(prev => prev.filter(g => g.id !== id))
  }

  function addAuthor(author) {
    setAuthors(prev => [...prev, { ...author, id: Date.now() }])
  }

  function updateAuthor(id, updated) {
    setAuthors(prev => prev.map(a => a.id === id ? { ...a, ...updated } : a))
  }

  function deleteAuthor(id) {
    setAuthors(prev => prev.filter(a => a.id !== id))
  }

  return (
    <AdminContext.Provider value={{
      genres, addGenre, updateGenre, deleteGenre,
      authors, addAuthor, updateAuthor, deleteAuthor,
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  return useContext(AdminContext)
}
