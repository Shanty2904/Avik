import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSnapScroll } from '../context/ScrollContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

function ContactFAB() {
  const { isDark } = useTheme()
  const [hovered, setHovered] = useState(false)

  function getSrc() {
    if (isDark) return hovered ? '/Assets/contact_float_hover.png' : '/Assets/contact_float.png'
    return hovered ? '/Assets/contact_float_hover.png' : '/Assets/contact_float.png'
  }

  return (
    <Link
      to="/contact"
      aria-label="Contact"
      className="contact-btn w-11 h-11 p-0 bg-transparent border-none block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={getSrc()} alt="Contact" className="w-full h-auto block transition-transform duration-200 hover:scale-[1.15]" />
    </Link>
  )
}

function ToTopFAB({ onClick }) {
  const { isDark } = useTheme()
  const [hovered, setHovered] = useState(false)

  function getSrc() {
    if (isDark) return hovered ? '/Assets/to_top_dark_hover.png' : '/Assets/to_top_dark.png'
    return hovered ? '/Assets/To_top_light_hover.png' : '/Assets/To_top_light.png'
  }

  return (
    <button
      onClick={onClick}
      aria-label="Back to top"
      className="to-top-btn w-11 h-11 p-0 bg-transparent border-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={getSrc()} alt="Back to top" className="w-full h-auto block transition-transform duration-200 hover:scale-[1.15]" />
    </button>
  )
}

export default function FloatingButtons() {
  const [show, setShow] = useState(false)
  const snapRef = useSnapScroll()

  useEffect(() => {
    const container = snapRef?.current
    if (!container) return

    function handleScroll() {
      setShow(container.scrollTop > container.clientHeight * 0.5)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [snapRef])

  function scrollToTop() {
    const container = snapRef?.current
    if (container) container.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div
      className={`fixed right-6 bottom-6 flex flex-col gap-3.5 z-[2000] transition-all duration-500 ${
        show ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-5 pointer-events-none'
      }`}
    >
      <ContactFAB />
      <ToTopFAB onClick={scrollToTop} />
    </div>
  )
}
