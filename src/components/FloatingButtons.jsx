import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSnapScroll, useSlideToRef } from '../context/ScrollContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

export default function FloatingButtons() {
  const { isDark } = useTheme()
  const snapRef = useSnapScroll()
  const slideToRef = useSlideToRef()
  const [show, setShow] = useState(false)

  // Listen to container scroll, not window.scrollY
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
    // Calls Home's slideTo(0) — updates currentIndexRef correctly
    if (slideToRef?.current) slideToRef.current(0)
  }

  return (
    <div
      className={`fixed right-6 bottom-6 flex flex-col gap-3.5 z-[2000] transition-all duration-400 ${
        show
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-5 pointer-events-none'
      }`}
    >
      <Link
        to="/contact"
        aria-label="Contact"
        className="contact-btn w-11 h-11 p-0 bg-transparent border-none block"
      >
        <img
          src={isDark ? '/Assets/contact_dark.png' : '/Assets/contact.png'}
          alt="Contact"
          className="w-full h-auto block transition-transform duration-200 hover:scale-[1.15]"
        />
      </Link>

      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className="to-top-btn w-11 h-11 p-0 bg-transparent border-none cursor-pointer"
      >
        <img
          src={isDark ? '/Assets/to_top_dark.png' : '/Assets/To_top_light.png'}
          alt="Back to top"
          className="w-full h-auto block transition-transform duration-200 hover:scale-[1.15]"
        />
      </button>
    </div>
  )
}
