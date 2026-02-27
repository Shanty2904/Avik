import { useRef, useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import { useSnapScroll, useSlideToRef } from '../context/ScrollContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

// ─────────────────────────────────────────────────────────
// EmailJS credentials
// ─────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

// ─────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────
const illustrationItems = [
  { href: '/illustrations/isometric-illustration', src: '/Assets/Final in Color.png', alt: 'Isometric Illustration', title: 'ISOMETRIC ILLUSTRATION' },
  { href: '/illustrations/marketplace', src: '/Assets/Final Marketplace Illustration.png', alt: 'Marketplace', title: 'MARKETPLACE' },
  { href: '/illustrations/space-cafe', src: '/Assets/Final Space Cafe.png', alt: 'Space Cafe', title: 'SPACE CAFE' },
  { href: '/illustrations/tide-mural', src: '/Assets/Final Tide Mural .png', alt: 'Tide Mural', title: 'TIDE MURAL' },
  { href: '/illustrations/gouache-portrait', src: '/Assets/Gouache Portrait 2.png', alt: 'Gouache Portrait', title: 'GOUACHE PORTRAIT' },
  { href: '/illustrations/the-deep-don', src: '/Assets/Full Back and Front.png', alt: 'The Deep Don', title: 'THE DEEP DON' },
]

const projects = [
  { href: '/projects/project-1', src: '/Assets/project1.jpg', alt: 'Project One', title: 'PROJECT ONE', desc: 'Brand identity and visual system design.' },
  { href: '/projects/project-2', src: '/Assets/project2.jpg', alt: 'Project Two', title: 'PROJECT TWO', desc: 'Illustration series exploring urban life.' },
  { href: '/projects/project-3', src: '/Assets/project3.jpg', alt: 'Project Three', title: 'PROJECT THREE', desc: 'Concept art and environment design.' },
  { href: '/projects/project-4', src: '/Assets/project4.jpg', alt: 'Project Four', title: 'PROJECT FOUR', desc: 'UI/UX exploration for creative tools.' },
]

const services = [
  { title: 'ILLUSTRATION', desc: 'Custom illustrations crafted for editorial, branding, and storytelling purposes, with a strong focus on mood, narrative, and detail.' },
  { title: 'CONCEPT ART', desc: 'Environment and concept design for games, films, and visual projects, helping define worlds, tone, and visual direction.' },
  null,
  { title: 'VISUAL DESIGN', desc: 'Visual systems, layouts, and graphic design solutions tailored for brands, campaigns, and digital platforms.' },
  { title: 'COMMISSIONS', desc: 'Personalized artwork created in collaboration with clients, ranging from portraits to custom narrative-driven illustrations.' },
]

// ─────────────────────────────────────────────────────────
// Easing
// ─────────────────────────────────────────────────────────
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

// ─────────────────────────────────────────────────────────
// useSlideScroll
//
// Strategy: one slide per gesture, enforced by a cooldown.
// - currentIndexRef: tracks position without re-renders
// - lastSlideTime: timestamp of last triggered slide
// - During cooldown (750ms) all wheel events are ignored
// - After cooldown, next event triggers next slide
// - This naturally handles trackpad bursts — the burst
//   fires the first slide then gets ignored for 750ms
// - Listeners attach once on mount, never re-attach
// ─────────────────────────────────────────────────────────
function useSlideScroll(containerRef, totalSections) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentIndexRef = useRef(0)
  const isAnimating = useRef(false)
  const rafId = useRef(null)
  const lastSlideTime = useRef(0)
  const touchStartY = useRef(null)

  const slideTo = useCallback((index) => {
    const container = containerRef.current
    if (!container || isAnimating.current) return

    const clamped = Math.max(0, Math.min(index, totalSections - 1))
    if (clamped === currentIndexRef.current) return

    const startTop = container.scrollTop
    const targetTop = clamped * container.clientHeight
    if (Math.abs(startTop - targetTop) < 1) return

    currentIndexRef.current = clamped
    isAnimating.current = true
    lastSlideTime.current = Date.now()

    const duration = 700
    const startTime = performance.now()

    function step(now) {
      const t = Math.min((now - startTime) / duration, 1)
      container.scrollTop = startTop + (targetTop - startTop) * easeInOutCubic(t)
      if (t < 1) {
        rafId.current = requestAnimationFrame(step)
      } else {
        container.scrollTop = targetTop
        isAnimating.current = false
        setCurrentIndex(clamped)
      }
    }

    cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(step)
  }, [containerRef, totalSections])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const COOLDOWN = 750 // ms — must be >= animation duration

    function onWheel(e) {
      e.preventDefault()
      const now = Date.now()
      if (now - lastSlideTime.current < COOLDOWN) return
      if (isAnimating.current) return
      slideTo(currentIndexRef.current + (e.deltaY > 0 ? 1 : -1))
    }

    function onTouchStart(e) {
      touchStartY.current = e.touches[0].clientY
    }

    function onTouchEnd(e) {
      if (touchStartY.current === null) return
      const diff = touchStartY.current - e.changedTouches[0].clientY
      if (Math.abs(diff) > 40 && !isAnimating.current) {
        slideTo(currentIndexRef.current + (diff > 0 ? 1 : -1))
      }
      touchStartY.current = null
    }

    function onKeyDown(e) {
      if (isAnimating.current) return
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        slideTo(currentIndexRef.current + 1)
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        slideTo(currentIndexRef.current - 1)
      }
    }

    container.addEventListener('wheel', onWheel, { passive: false })
    container.addEventListener('touchstart', onTouchStart, { passive: true })
    container.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('keydown', onKeyDown)

    return () => {
      container.removeEventListener('wheel', onWheel)
      container.removeEventListener('touchstart', onTouchStart)
      container.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKeyDown)
      cancelAnimationFrame(rafId.current)
    }
  }, [containerRef, slideTo])

  return { currentIndex, slideTo }
}

// ─────────────────────────────────────────────────────────
// Shared title style — Shackleton Condensed
// ─────────────────────────────────────────────────────────
const TITLE_STYLE = {
  fontFamily: '"shackleton-condensed", serif',
  fontWeight: 400,
  fontStyle: 'normal',
  letterSpacing: '0.06em',
  lineHeight: 1,
}

// ─────────────────────────────────────────────────────────
// Separator line
// ─────────────────────────────────────────────────────────
function SectionDivider() {
  return <div className="section-divider-bar" aria-hidden="true" />
}

// ─────────────────────────────────────────────────────────
// More Work button
// idle: same More_work.png for both modes
// hover: More_work_hover.png (light) / More_work_dark_hover.png (dark)
// ─────────────────────────────────────────────────────────
function MoreWorkButton({ to }) {
  const { isDark } = useTheme()
  const [hovered, setHovered] = useState(false)

  function getSrc() {
    if (isDark) return hovered ? '/Assets/More_work_dark_hover.png' : '/Assets/More_work.png'
    return hovered ? '/Assets/More_work_hover.png' : '/Assets/More_work.png'
  }

  return (
    <div className="flex justify-center mt-6 md:mt-8">
      <Link
        to={to}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="block transition-transform duration-200 hover:scale-105"
      >
        <img src={getSrc()} alt="More Work" className="h-auto w-auto max-h-14 md:max-h-20" loading="lazy" />
      </Link>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// SectionFrame — two snap stops per section
//   Stop 1: title only, centered, full size
//   Stop 2: title top-centered at 80% opacity, content below
// ─────────────────────────────────────────────────────────
function SectionFrame({ title, bg, children, id, noDivider = false, contentFrameIndex, currentIndex }) {
  const isContentActive = currentIndex === contentFrameIndex

  return (
    <>
      {/* ── STOP 1: Title frame ── */}
      <section className={`snap-section ${bg} relative flex justify-center items-center overflow-hidden`}>
        <h2
          className="text-black dark:text-white text-center px-6 select-none"
          style={{ ...TITLE_STYLE, fontSize: 'clamp(3rem, 10vw, 10rem)' }}
        >
          {title}
        </h2>
      </section>

      {/* ── STOP 2: Content frame ── */}
      <section
        id={id}
        className={`snap-section ${bg} relative flex flex-col overflow-hidden`}
      >
        {/* Title — top-centered, fades to 80% when active */}
        <div className="pt-4 md:pt-5 text-center">
          <h2
            className="text-black dark:text-white select-none"
            style={{
              ...TITLE_STYLE,
              fontSize: 'clamp(1.5rem, 4vw, 3rem)',
              opacity: isContentActive ? 0.8 : 0,
              transition: 'opacity 0.6s ease',
            }}
          >
            {title}
          </h2>
        </div>

        {/* Content */}
        <div
          className="flex-1 flex flex-col justify-center relative z-10"
          style={{
            opacity: isContentActive ? 1 : 0,
            transform: isContentActive ? 'translateY(0)' : 'translateY(2rem)',
            transition: 'opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s',
          }}
        >
          {children}
        </div>

        {!noDivider && <SectionDivider />}
      </section>
    </>
  )
}

// ─────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────
function Hero() {
  const { isDark } = useTheme()
  return (
    <section className="snap-section hero-mural hero-mural-bg relative flex justify-center items-center">
      <div className="bg-white/80 dark:bg-black/80 p-4 md:p-6">
        <img
          src={isDark ? '/Assets/Main_logo_dark.png' : '/Assets/Main_logo.png'}
          alt="Avik"
          className="h-auto w-auto max-h-40 md:max-h-64"
        />
      </div>
      <a className="absolute bottom-16 text-2xl text-white no-underline scroll-bounce z-10">↓</a>
    </section>
  )
}

// ─────────────────────────────────────────────────────────
// ILLUSTRATIONS
// ─────────────────────────────────────────────────────────
function IllustrationsFilm({ currentIndex }) {
  const items = [...illustrationItems, ...illustrationItems]
  return (
    <SectionFrame
      title="Illustrations"
      bg="bg-white dark:bg-black"
      id="illustrations"
      contentFrameIndex={2}
      currentIndex={currentIndex}
    >
      <div className="w-full overflow-hidden film-wrapper">
        <div className="film-track flex w-max">
          {items.map((item, i) => (
            <Link key={i} to={item.href} className="relative mr-4 md:mr-8 flex-shrink-0 group">
              <img
                src={item.src}
                alt={item.alt}
                className="h-[180px] md:h-[350px] w-auto object-contain block"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex flex-col justify-center items-center text-white text-center">
                <h3 className="tracking-[0.1em] mb-2 text-xs md:text-base">{item.title}</h3>
                <span className="border border-white px-3 md:px-5 py-1 md:py-1.5 text-xs md:text-sm tracking-[0.1em]">LEARN MORE</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <MoreWorkButton to="/illustrations" />
    </SectionFrame>
  )
}

// ─────────────────────────────────────────────────────────
// ABOUT ME
// ─────────────────────────────────────────────────────────
function AboutMe({ currentIndex }) {
  return (
    <SectionFrame
      title="Hello."
      bg="bg-white dark:bg-black"
      contentFrameIndex={4}
      currentIndex={currentIndex}
    >
      <div className="max-w-[1100px] mx-auto px-6 md:px-8 w-full grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-6 md:gap-12 items-center">
        <div className="flex items-center justify-center">
          <img
            src="/Assets/Final Self Portrait.png"
            alt="About Me"
            className="w-auto h-auto block max-h-[28vh] md:max-h-[60vh] object-contain"
            loading="lazy"
          />
        </div>
        <div className="text-center md:text-left">
          <p className="leading-[1.8] max-w-[500px] mx-auto md:mx-0 text-black dark:text-[#ccc] text-sm md:text-base">
            I'm a visual designer and illustrator focused on building rich, story-driven worlds through color, form, and detail.
            My work blends illustration, design, and narrative to create spaces that feel lived-in and expressive. I enjoy exploring
            stylized environments, characters, and concepts across digital and traditional mediums.
          </p>
        </div>
      </div>
    </SectionFrame>
  )
}

// ─────────────────────────────────────────────────────────
// PROJECTS
// ─────────────────────────────────────────────────────────
function Projects({ currentIndex }) {
  return (
    <SectionFrame
      title="Projects"
      bg="bg-[#f9f9f9] dark:bg-black"
      contentFrameIndex={6}
      currentIndex={currentIndex}
    >
      <div className="max-w-[1100px] mx-auto px-4 md:px-8 w-full">
        <div className="grid grid-cols-2 gap-3 md:gap-5">
          {projects.map((p) => (
            <Link key={p.href} to={p.href} className="relative block overflow-hidden group no-underline text-inherit">
              <img
                src={p.src}
                alt={p.alt}
                className="w-full object-cover"
                style={{ height: 'clamp(80px, 14vh, 220px)' }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white text-center px-3 md:px-6">
                <h3 className="tracking-[0.1em] mb-1 text-xs md:text-sm">{p.title}</h3>
                <p className="text-xs mb-2 max-w-[180px] hidden md:block">{p.desc}</p>
                <span className="border border-white px-3 py-1 text-xs tracking-[0.1em]">VIEW</span>
              </div>
            </Link>
          ))}
        </div>
        <MoreWorkButton to="/work" />
      </div>
    </SectionFrame>
  )
}

// ─────────────────────────────────────────────────────────
// SERVICES — no divider in services grid
// ─────────────────────────────────────────────────────────
function ServicesSection({ currentIndex }) {
  return (
    <SectionFrame
      title="Services"
      bg="bg-white dark:bg-black"
      contentFrameIndex={8}
      currentIndex={currentIndex}
    >
      <div className="max-w-[1100px] mx-auto px-6 md:px-8 w-full text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-5 md:gap-y-10">
          {services.map((s, i) =>
            s === null ? (
              <div key={i} className="col-span-1 md:col-span-2 h-8 md:h-10" />
            ) : (
              <div key={i}>
                <h3 className="tracking-[0.1em] mb-2 text-sm md:text-base text-black dark:text-[#f5f5f5]">{s.title}</h3>
                <p className="leading-[1.7] max-w-[420px] mx-auto text-black dark:text-white text-xs md:text-sm">{s.desc}</p>
              </div>
            )
          )}
        </div>
      </div>
    </SectionFrame>
  )
}

// ─────────────────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────────────────
function ContactSection({ currentIndex }) {
  const formRef = useRef()
  const [status, setStatus] = useState('idle')

  function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, { publicKey: EMAILJS_PUBLIC_KEY })
      .then(() => { setStatus('success'); formRef.current.reset() })
      .catch(() => setStatus('error'))
  }

  return (
    <SectionFrame
      title="Contact"
      bg="bg-white dark:bg-black"
      id="contact"
      contentFrameIndex={10}
      currentIndex={currentIndex}
      noDivider
    >
      <div className="flex flex-col justify-between h-full px-6 md:px-8">
        <div className="flex justify-center">
          <div className="max-w-[600px] w-full">
            <form ref={formRef} onSubmit={handleSubmit} className="text-left">
              <div className="mb-3 md:mb-5">
                <label htmlFor="c-name" className="block mb-1 text-xs md:text-sm tracking-[0.05em] dark:text-[#ccc]">Name</label>
                <input type="text" id="c-name" name="name" required
                  className="w-full px-3 py-2 md:py-2.5 border border-gray-300 dark:border-[#444] font-serif text-sm md:text-base bg-white dark:bg-black text-black dark:text-[#f5f5f5] focus:outline-none focus:border-black dark:focus:border-white transition-colors" />
              </div>
              <div className="mb-3 md:mb-5">
                <label htmlFor="c-email" className="block mb-1 text-xs md:text-sm tracking-[0.05em] dark:text-[#ccc]">Email</label>
                <input type="email" id="c-email" name="email" required
                  className="w-full px-3 py-2 md:py-2.5 border border-gray-300 dark:border-[#444] font-serif text-sm md:text-base bg-white dark:bg-black text-black dark:text-[#f5f5f5] focus:outline-none focus:border-black dark:focus:border-white transition-colors" />
              </div>
              <div className="mb-3 md:mb-5">
                <label htmlFor="c-message" className="block mb-1 text-xs md:text-sm tracking-[0.05em] dark:text-[#ccc]">Message</label>
                <textarea id="c-message" name="message" rows={3} required
                  className="w-full px-3 py-2 md:py-2.5 border border-gray-300 dark:border-[#444] font-serif text-sm md:text-base bg-white dark:bg-black text-black dark:text-[#f5f5f5] focus:outline-none focus:border-black dark:focus:border-white transition-colors resize-none" />
              </div>
              <button type="submit" disabled={status === 'sending'}
                className="inline-block mt-1 px-5 md:px-6 py-2 bg-[rgb(4,122,59)] hover:bg-[rgb(3,100,48)] disabled:opacity-60 text-white font-serif text-sm tracking-wider transition-colors duration-200">
                {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}
              </button>
              {status === 'success' && <p className="mt-3 text-green-600 dark:text-green-400 text-xs tracking-wide">✓ Message sent! I'll get back to you soon.</p>}
              {status === 'error' && <p className="mt-3 text-red-500 text-xs tracking-wide">✗ Something went wrong. Please try again.</p>}
            </form>
          </div>
        </div>
        <footer className="py-4 md:py-6 text-center text-[#666] dark:text-[#888] text-xs md:text-sm transition-colors duration-300">
          <div className="flex justify-center gap-6 mb-2 md:mb-3">
            <a href="https://www.instagram.com/YOURUSERNAME" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-instagram">
              <img src="/Assets/instagram.png" alt="Instagram" className="w-6 md:w-7 h-auto transition-transform duration-200 hover:scale-110" loading="lazy" />
            </a>
            <a href="https://www.linkedin.com/in/YOURUSERNAME" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-linkedin">
              <img src="/Assets/linkedin.png" alt="LinkedIn" className="w-6 md:w-7 h-auto transition-transform duration-200 hover:scale-110" loading="lazy" />
            </a>
          </div>
          <p>© 2026 Avik. All rights reserved.</p>
        </footer>
      </div>
    </SectionFrame>
  )
}

// ─────────────────────────────────────────────────────────
// HOME ROOT
// Indices: 0=Hero, 1=Ill.Title, 2=Ill.Content,
//          3=About.Title, 4=About.Content,
//          5=Proj.Title, 6=Proj.Content,
//          7=Serv.Title, 8=Serv.Content,
//          9=Cont.Title, 10=Cont.Content
// ─────────────────────────────────────────────────────────
const TOTAL_SECTIONS = 11

export default function Home() {
  const snapRef = useSnapScroll()
  const slideToRef = useSlideToRef()
  const { currentIndex, slideTo } = useSlideScroll(snapRef, TOTAL_SECTIONS)

  // Register slideTo so FloatingButtons can call slideTo(0)
  useEffect(() => {
    if (slideToRef) slideToRef.current = slideTo
  }, [slideTo, slideToRef])

  return (
    <div className="snap-container" ref={snapRef}>
      <Hero />
      <IllustrationsFilm currentIndex={currentIndex} />
      <AboutMe currentIndex={currentIndex} />
      <Projects currentIndex={currentIndex} />
      <ServicesSection currentIndex={currentIndex} />
      <ContactSection currentIndex={currentIndex} />
    </div>
  )
}
