import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import { useSnapScroll } from '../context/ScrollContext.jsx'
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
// Separator line
// ─────────────────────────────────────────────────────────
function SectionDivider() {
  return <div className="section-divider-bar" aria-hidden="true" />
}

// ─────────────────────────────────────────────────────────
// More Work button — fixed: dark idle now correctly uses More_work_dark.png
// ─────────────────────────────────────────────────────────
function MoreWorkButton({ to }) {
  const { isDark } = useTheme()
  const [hovered, setHovered] = useState(false)

  function getSrc() {
    if (isDark) return hovered ? '/Assets/More_work_dark_hover.png' : '/Assets/More_work_dark.png'
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
        <img src={getSrc()} alt="More Work" className="h-auto w-auto max-h-14 md:max-h-20" />
      </Link>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// SectionFrame
// Renders TWO snap stops per section:
//   Stop 1 — full viewport, title PNG centered and large
//   Stop 2 — title animates to top-left, scales down,
//             content fades and slides up beneath it
//
// Props:
//   titleSrc  — path to title PNG
//   titleAlt  — alt text
//   bg        — tailwind bg classes (same for both frames)
//   invert    — true if title uses dark:invert (no separate dark PNG)
//   id        — optional anchor id on content frame
//   noDivider — skip separator on content frame (last section)
// ─────────────────────────────────────────────────────────
function SectionFrame({ titleSrc, titleAlt, bg, invert = false, children, id, noDivider = false }) {
  const contentRef = useRef(null)
  const [inView, setInView] = useState(false)
  const snapRef = useSnapScroll()

  useEffect(() => {
    const container = snapRef?.current
    const el = contentRef.current
    if (!container || !el) return

    function check() {
      const diff = Math.abs(container.scrollTop - el.offsetTop)
      setInView(diff < container.clientHeight * 0.5)
    }

    container.addEventListener('scroll', check, { passive: true })
    check()
    return () => container.removeEventListener('scroll', check)
  }, [snapRef])

  const invertClass = invert ? 'dark:invert' : ''

  return (
    <>
      {/* ── STOP 1: Title-only frame ── */}
      <section className={`snap-section ${bg} relative flex justify-center items-center overflow-hidden`}>
        <img
          src={titleSrc}
          alt={titleAlt}
          className={`h-auto w-auto max-h-[14vh] md:max-h-[22vh] select-none ${invertClass}`}
        />
      </section>

      {/* ── STOP 2: Content frame ── */}
      <section
        ref={contentRef}
        id={id}
        className={`snap-section ${bg} relative flex flex-col overflow-hidden`}
      >
        {/* Title — transitions from center to top-left, scales down */}
        <div
          className={`
            transition-all duration-700 ease-in-out
            ${inView
              ? 'self-start pt-3 pl-3 md:pt-6 md:pl-8'
              : 'self-center mt-auto mb-auto'
            }
          `}
        >
          <img
            src={titleSrc}
            alt={titleAlt}
            className={`
              h-auto w-auto select-none
              transition-all duration-700 ease-in-out
              ${invertClass}
              ${inView
                ? 'max-h-[22px] md:max-h-[32px] opacity-50'
                : 'max-h-[14vh] md:max-h-[22vh] opacity-100'
              }
            `}
          />
        </div>

        {/* Content — fades and slides up after title starts moving */}
        <div
          className={`
            flex-1 flex flex-col justify-center
            transition-all duration-700 ease-in-out delay-150
            ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
          `}
        >
          {children}
        </div>

        {!noDivider && <SectionDivider />}
      </section>
    </>
  )
}

// ─────────────────────────────────────────────────────────
// HERO — standalone, no title frame needed
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
      <a href="#illustrations" className="absolute bottom-16 text-2xl text-white no-underline scroll-bounce z-10">↓</a>
    </section>
  )
}

// ─────────────────────────────────────────────────────────
// ILLUSTRATIONS
// ─────────────────────────────────────────────────────────
function IllustrationsFilm() {
  const items = [...illustrationItems, ...illustrationItems]
  return (
    <SectionFrame
      titleSrc="/Assets/illustrations_title.png"
      titleAlt="Illustrations"
      bg="bg-white dark:bg-black"
      invert
      id="illustrations"
    >
      <div className="w-full overflow-hidden film-wrapper">
        <div className="film-track flex w-max">
          {items.map((item, i) => (
            <Link key={i} to={item.href} className="relative mr-4 md:mr-8 flex-shrink-0 group">
              {/* h-[180px] on mobile, h-[350px] on desktop */}
              <img src={item.src} alt={item.alt} className="h-[180px] md:h-[350px] w-auto object-contain block" />
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
function AboutMe() {
  return (
    <SectionFrame
      titleSrc="/Assets/Hello.png"
      titleAlt="About Me"
      bg="bg-white dark:bg-black"
      invert
    >
      <div className="max-w-[1100px] mx-auto px-6 md:px-8 w-full grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-6 md:gap-12 items-center">
        <div className="flex items-center justify-center">
          <img
            src="/Assets/Final Self Portrait.png"
            alt="About Me"
            className="w-auto h-auto block max-h-[28vh] md:max-h-[60vh] object-contain"
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
function Projects() {
  return (
    <SectionFrame
      titleSrc="/Assets/Project_title.png"
      titleAlt="Projects"
      bg="bg-[#f9f9f9] dark:bg-black"
      invert
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
// SERVICES
// ─────────────────────────────────────────────────────────
function ServicesSection() {
  return (
    <SectionFrame
      titleSrc="/Assets/Services_title.png"
      titleAlt="Services"
      bg="bg-white dark:bg-black"
      invert
    >
      <div className="max-w-[1100px] mx-auto px-6 md:px-8 w-full text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-5 md:gap-y-10">
          {services.map((s, i) =>
            s === null ? (
              <div key={i} className="col-span-1 md:col-span-2 h-8 md:h-10 service-divider-light" />
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
function ContactSection() {
  const formRef = useRef()
  const [status, setStatus] = useState('idle')

  function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, {
        publicKey: EMAILJS_PUBLIC_KEY,
      })
      .then(() => { setStatus('success'); formRef.current.reset() })
      .catch(() => setStatus('error'))
  }

  return (
    <SectionFrame
      titleSrc="/Assets/Contact_title.png"
      titleAlt="Contact"
      bg="bg-white dark:bg-black"
      invert
      id="contact"
      noDivider
    >
      {/* flex-col so form takes space and footer pins to bottom */}
      <div className="flex flex-col justify-between h-full px-6 md:px-8">
        {/* Form */}
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
              {status === 'success' && (
                <p className="mt-3 text-green-600 dark:text-green-400 text-xs tracking-wide">✓ Message sent! I'll get back to you soon.</p>
              )}
              {status === 'error' && (
                <p className="mt-3 text-red-500 text-xs tracking-wide">✗ Something went wrong. Please try again.</p>
              )}
            </form>
          </div>
        </div>

        {/* Footer pinned to bottom */}
        <footer className="py-4 md:py-6 text-center text-[#666] dark:text-[#888] text-xs md:text-sm transition-colors duration-300">
          <div className="flex justify-center gap-6 mb-2 md:mb-3">
            <a href="https://www.instagram.com/YOURUSERNAME" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-instagram">
              <img src="/Assets/instagram.png" alt="Instagram" className="w-6 md:w-7 h-auto transition-transform duration-200 hover:scale-110" />
            </a>
            <a href="https://www.linkedin.com/in/YOURUSERNAME" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-linkedin">
              <img src="/Assets/linkedin.png" alt="LinkedIn" className="w-6 md:w-7 h-auto transition-transform duration-200 hover:scale-110" />
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
// ─────────────────────────────────────────────────────────
export default function Home() {
  const snapRef = useSnapScroll()
  return (
    <div className="snap-container" ref={snapRef}>
      <Hero />
      <IllustrationsFilm />
      <AboutMe />
      <Projects />
      <ServicesSection />
      <ContactSection />
    </div>
  )
}
