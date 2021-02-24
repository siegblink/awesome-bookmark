import { createContext } from 'react'

export const BookmarkContext = createContext()

export function BookmarkProvider({ children, value }) {
  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  )
}
