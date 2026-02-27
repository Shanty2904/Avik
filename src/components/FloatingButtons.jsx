import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSnapScroll, useSlideToRef } from '../context/ScrollContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

function ContactFAB() {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      to="/contact"
      aria-label="Contact"
      className="w-11 h-11 p-0 bg-transparent border-none block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={hovered ? '/Assets/contact_float_hover.png' : '/Assets/contact_float.png'}
        alt="Contact"
        className="w-full h-auto block"
      />
    </Link>
  )
}

function ToTopFAB({ onClick }) {
  const { isDark } = useTheme()
  const [hovered, setHovered] = useState(false)

  function getSrc() {
    if (isDark) return hovered ? '/Assets/to_top_dark_hover.png' : '/Assets/to_top_dark.png'
    return hovered ? '/Assets/to_top_light_hover.png' : '/Assets/To_top_light.png'
  }

  return (
    <button
      onClick={onClick}
      aria-label="Back to top"
      className="w-11 h-11 p-0 bg-transparent border-none cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={getSrc()} alt="Back to top" className="w-full h-auto block" />
    </button>
  )
}

export default function FloatingButtons() {
  const snapRef = useSnapScroll()
  const slideToRef = useSlideToRef()
  const [show, setShow] = useState(false)
  const observerAttached = useRef(false)

  // Retry attaching scroll listener — snapRef may not be ready on first render
  useEffect(() => {
    let rafId
    let attempts = 0

    function tryAttach() {
      const container = snapRef?.current
      if (container && !observerAttached.current) {
        observerAttached.current = true

        function handleScroll() {
          setShow(container.scrollTop > container.clientHeight * 0.5)
        }

        container.addEventListener('scroll', handleScroll, { passive: true })
        // Check initial position in case page loaded mid-scroll
        handleScroll()

        return () => container.removeEventListener('scroll', handleScroll)
      }

      // Retry up to 20 times (~400ms total) if container not ready yet
      if (attempts < 20) {
        attempts++
        rafId = requestAnimationFrame(tryAttach)
      }
    }

    const cleanup = tryAttach()
    return () => {
      cancelAnimationFrame(rafId)
      observerAttached.current = false
      cleanup?.()
    }
  }, [snapRef])

  function scrollToTop() {
    if (slideToRef?.current) slideToRef.current(0)
  }

  return (
    <div
      className={`fixed right-6 bottom-6 flex flex-col gap-3.5 z-[2000] transition-all duration-300 ${
        show
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-5 pointer-events-none'
      }`}
    >
      <ContactFAB />
      <ToTopFAB onClick={scrollToTop} />
    </div>
  )
}
