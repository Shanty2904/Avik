import { createContext, useContext, useRef } from 'react'

const ScrollContext = createContext(null)

export function ScrollProvider({ children }) {
  const snapRef = useRef(null)
  const slideToRef = useRef(null) // Home registers slideTo here on mount

  return (
    <ScrollContext.Provider value={{ snapRef, slideToRef }}>
      {children}
    </ScrollContext.Provider>
  )
}

// Returns the container ref — used by Home to attach the scroll container
export function useSnapScroll() {
  return useContext(ScrollContext)?.snapRef
}

// Returns the slideToRef — used by FloatingButtons to call slideTo(0)
export function useSlideToRef() {
  return useContext(ScrollContext)?.slideToRef
}
