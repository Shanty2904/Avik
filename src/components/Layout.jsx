import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar.jsx'
import FloatingButtons from './FloatingButtons.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import { ScrollProvider, useSnapScroll } from '../context/ScrollContext.jsx'

// Inner layout reads the snap ref to reset scroll on route change
function LayoutInner() {
  const { pathname } = useLocation()
  const snapRef = useSnapScroll()

  useEffect(() => {
    if (snapRef?.current) {
      snapRef.current.scrollTo({ top: 0, behavior: 'instant' })
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, snapRef])

  return (
    <div className="font-serif min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <Navbar />
      <main className="pt-20">
        <Outlet />
      </main>
      <FloatingButtons />
      <ThemeToggle />
    </div>
  )
}

export default function Layout() {
  return (
    <ScrollProvider>
      <LayoutInner />
    </ScrollProvider>
  )
}
