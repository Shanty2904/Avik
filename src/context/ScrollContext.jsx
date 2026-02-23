import { createContext, useContext, useRef } from 'react'

const ScrollContext = createContext(null)

export function ScrollProvider({ children }) {
  const snapRef = useRef(null)
  return (
    <ScrollContext.Provider value={snapRef}>
      {children}
    </ScrollContext.Provider>
  )
}

export function useSnapScroll() {
  return useContext(ScrollContext)
}
