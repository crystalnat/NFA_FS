import { createContext, useContext, useState } from 'react'
import initialGenres  from '../Utils/genres'
import initialAuthors from '../Utils/authors'

const AdminContext = createContext(null)

export function AdminProvider({ children }) {
  const [genres,  setGenres]  = useState(initialGenres)
  const [authors, setAuthors] = useState(initialAuthors)

  function addGenre(genre) {
    const newGenre = { ...genre, id: Date.now() }
    setGenres(prev => [...prev, newGenre])
  }

  function addAuthor(author) {
    const newAuthor = { ...author, id: Date.now() }
    setAuthors(prev => [...prev, newAuthor])
  }

  return (
    <AdminContext.Provider value={{ genres, authors, addGenre, addAuthor }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  return useContext(AdminContext)
}
