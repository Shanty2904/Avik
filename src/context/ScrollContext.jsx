import { createContext, useContext, useRef } from 'react'

const ScrollContext = createContext(null)

export function ScrollProvider({ children }) {
  const snapRef = useRef(null)
  const slideToRef = useRef(null)
  return (
    <ScrollContext.Provider value={{ snapRef, slideToRef }}>
      {children}
    </ScrollContext.Provider>
  )
}

export function useSnapScroll() {
  return useContext(ScrollContext)?.snapRef
}

export function useSlideToRef() {
  return useContext(ScrollContext)?.slideToRef
}