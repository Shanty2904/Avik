import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import { useFadeIn } from '../hooks/useFadeIn.js'
import { useSnapScroll } from '../context/ScrollContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

// ─────────────────────────────────────────────────────────
// Reusable "More Work" button — theme + hover aware
// ─────────────────────────────────────────────────────────
function MoreWorkButton({ to }) {
  const { isDark } = useTheme()
  const [hovered, setHovered] = useState(false)

  function getSrc() {
    if (isDark) return hovered ? '/Assets/More_work_dark_hover.png' : '/Assets/More_work.png'
    return hovered ? '/Assets/More_work_hover.png' : '/Assets/More_work.png'
  }

  return (
    <div className="flex justify-center mt-8">
      <Link
        to={to}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="block transition-transform duration-200 hover:scale-105"
      >
        <img src={getSrc()} alt="More Work" className="h-auto w-auto max-h-20" />
      </Link>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// EmailJS credentials — replace these
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
// Separator line at bottom of each section
// ─────────────────────────────────────────────────────────
function SectionDivider() {
  return (
    <div className="section-divider-bar" aria-hidden="true" />
  )
}

// ─────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────
function Hero() {
  const { isDark } = useTheme()
  return (
    <section className="snap-section hero-mural hero-mural-bg relative flex justify-center items-center">
      <img
        src={isDark ? '/Assets/Main_logo_dark.png' : '/Assets/Main_logo.png'}
        alt="Avik"
        className="h-auto w-auto max-h-64"
      />
      <a href="#illustrations" className="absolute bottom-16 text-2xl text-white no-underline scroll-bounce z-10">↓</a>
    </section>
  )
}

// ─────────────────────────────────────────────────────────
// ILLUSTRATIONS FILM STRIP
// ─────────────────────────────────────────────────────────
function IllustrationsFilm() {
  const ref = useFadeIn()
  const items = [...illustrationItems, ...illustrationItems]
  return (
    <section
      ref={ref}
      id="illustrations"
      className="snap-section section-hidden bg-white dark:bg-black relative flex flex-col justify-center overflow-hidden"
    >
      <div className="flex justify-center mb-12">
        <img src="/Assets/illustrations_title.png" alt="Illustrations" className="h-auto w-auto max-h-16 dark:invert" />
      </div>
      <div className="film-wrapper w-full overflow-hidden">
        <div className="film-track flex w-max">
          {items.map((item, i) => (
            <Link key={i} to={item.href} className="relative mr-8 flex-shrink-0 group">
              <img src={item.src} alt={item.alt} className="h-[350px] w-auto object-contain block" />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex flex-col justify-center items-center text-white text-center">
                <h3 className="tracking-[0.1em] mb-2">{item.title}</h3>
                <span className="border border-white px-5 py-1.5 text-sm tracking-[0.1em]">LEARN MORE</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <MoreWorkButton to="/illustrations" />
      <SectionDivider />
    </section>
  )
}

// ─────────────────────────────────────────────────────────
// ABOUT ME
// ─────────────────────────────────────────────────────────
function AboutMe() {
  const ref = useFadeIn()
  return (
    <section ref={ref} className="snap-section section-hidden bg-white dark:bg-black relative flex items-center overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-8 w-full grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 items-center">
        <div className="flex items-center justify-center">
          <img
            src="/Assets/Final Self Portrait.jpg"
            alt="About Me"
            className="w-full h-auto block max-h-[70vh] object-contain"
          />
        </div>
        <div className="text-center md:text-left">
          <div className="flex justify-center md:justify-start mb-6">
            <img src="/Assets/Hello.png" alt="About Me" className="h-auto w-auto max-h-16 dark:invert" />
          </div>
          <p className="leading-[1.8] max-w-[500px] mx-auto md:mx-0 text-black dark:text-[#ccc]">
            I'm a visual designer and illustrator focused on building rich, story-driven worlds through color, form, and detail.
            My work blends illustration, design, and narrative to create spaces that feel lived-in and expressive. I enjoy exploring
            stylized environments, characters, and concepts across digital and traditional mediums.
          </p>
        </div>
      </div>
      <SectionDivider />
    </section>
  )
}

// ─────────────────────────────────────────────────────────
// PROJECTS
// ─────────────────────────────────────────────────────────
function Projects() {
  const ref = useFadeIn()
  return (
    <section ref={ref} className="snap-section section-hidden bg-[#f9f9f9] dark:bg-black relative flex flex-col justify-center overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-8 w-full">
        <div className="flex justify-center mb-10">
          <img src="/Assets/Project_title.png" alt="Projects" className="h-auto w-auto max-h-16 dark:invert" />
        </div>
        <div className="grid grid-cols-2 gap-5">
          {projects.map((p) => (
            <Link key={p.href} to={p.href} className="relative block overflow-hidden group no-underline text-inherit">
              <img
                src={p.src}
                alt={p.alt}
                className="w-full object-cover"
                style={{ height: 'clamp(120px, 18vh, 220px)' }}
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white text-center px-6">
                <h3 className="tracking-[0.1em] mb-2 text-sm">{p.title}</h3>
                <p className="text-xs mb-3 max-w-[220px]">{p.desc}</p>
                <span className="border border-white px-4 py-1 text-xs tracking-[0.1em]">VIEW PROJECT</span>
              </div>
            </Link>
          ))}
        </div>
        <MoreWorkButton to="/work" />
      </div>
      <SectionDivider />
    </section>
  )
}

// ─────────────────────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────────────────────
function ServicesSection() {
  const ref = useFadeIn()
  return (
    <section ref={ref} className="snap-section section-hidden bg-white dark:bg-black relative flex flex-col justify-center overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-8 w-full text-center">
        <div className="flex justify-center mb-10">
          <img src="/Assets/Services_title.png" alt="Services" className="h-auto w-auto max-h-16 dark:invert" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 relative">
          {services.map((s, i) =>
            s === null ? (
              <div key={i} className="col-span-1 md:col-span-2 h-10 service-divider-light" />
            ) : (
              <div key={i}>
                <h3 className="tracking-[0.1em] mb-3 text-black dark:text-[#f5f5f5]">{s.title}</h3>
                <p className="leading-[1.8] max-w-[420px] mx-auto text-black dark:text-white text-sm">{s.desc}</p>
              </div>
            )
          )}
        </div>
      </div>
      <SectionDivider />
    </section>
  )
}

// ─────────────────────────────────────────────────────────
// CONTACT (with EmailJS wired up)
// ─────────────────────────────────────────────────────────
function ContactSection() {
  const ref = useFadeIn()
  const formRef = useRef()
  const [status, setStatus] = useState('idle')

  function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, {
        publicKey: EMAILJS_PUBLIC_KEY,
      })
      .then(() => {
        setStatus('success')
        formRef.current.reset()
      })
      .catch(() => setStatus('error'))
  }

  return (
    <section ref={ref} id="contact" className="snap-section section-hidden bg-white dark:bg-black relative flex flex-col justify-between overflow-hidden">
      {/* Contact form — centered in the upper portion */}
      <div className="flex-1 flex flex-col justify-center items-center px-8">
        <div className="max-w-[600px] w-full">
          <div className="flex justify-center mb-10">
            <img src="/Assets/Contact_title.png" alt="Contact" className="h-auto w-auto max-h-16 dark:invert" />
          </div>
          <form ref={formRef} onSubmit={handleSubmit} className="text-left">
            <div className="mb-5">
              <label htmlFor="c-name" className="block mb-2 text-sm tracking-[0.05em] dark:text-[#ccc]">Name</label>
              <input type="text" id="c-name" name="name" required
                className="w-full px-3 py-2.5 border border-gray-300 dark:border-[#444] font-serif text-base bg-white dark:bg-black text-black dark:text-[#f5f5f5] focus:outline-none focus:border-black dark:focus:border-white transition-colors" />
            </div>
            <div className="mb-5">
              <label htmlFor="c-email" className="block mb-2 text-sm tracking-[0.05em] dark:text-[#ccc]">Email</label>
              <input type="email" id="c-email" name="email" required
                className="w-full px-3 py-2.5 border border-gray-300 dark:border-[#444] font-serif text-base bg-white dark:bg-black text-black dark:text-[#f5f5f5] focus:outline-none focus:border-black dark:focus:border-white transition-colors" />
            </div>
            <div className="mb-5">
              <label htmlFor="c-message" className="block mb-2 text-sm tracking-[0.05em] dark:text-[#ccc]">Message</label>
              <textarea id="c-message" name="message" rows={4} required
                className="w-full px-3 py-2.5 border border-gray-300 dark:border-[#444] font-serif text-base bg-white dark:bg-black text-black dark:text-[#f5f5f5] focus:outline-none focus:border-black dark:focus:border-white transition-colors resize-none" />
            </div>
            <button type="submit" disabled={status === 'sending'}
              className="inline-block mt-1 px-6 py-2 bg-[rgb(4,122,59)] hover:bg-[rgb(3,100,48)] disabled:opacity-60 text-white font-serif tracking-wider transition-colors duration-200">
              {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}
            </button>
            {status === 'success' && (
              <p className="mt-4 text-green-600 dark:text-green-400 text-sm tracking-wide">✓ Message sent! I'll get back to you soon.</p>
            )}
            {status === 'error' && (
              <p className="mt-4 text-red-500 text-sm tracking-wide">✗ Something went wrong. Please try again.</p>
            )}
          </form>
        </div>
      </div>

      {/* Footer pinned to bottom of this section */}
      <footer className="py-6 text-center text-[#666] dark:text-[#888] text-sm transition-colors duration-300">
        <div className="flex justify-center gap-6 mb-3">
          <a href="https://www.instagram.com/YOURUSERNAME" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-instagram">
            <img src="/Assets/instagram.png" alt="Instagram" className="w-7 h-auto transition-transform duration-200 hover:scale-110" />
          </a>
          <a href="https://www.linkedin.com/in/YOURUSERNAME" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-linkedin">
            <img src="/Assets/linkedin.png" alt="LinkedIn" className="w-7 h-auto transition-transform duration-200 hover:scale-110" />
          </a>
        </div>
        <p>© 2026 Avik. All rights reserved.</p>
      </footer>
    </section>
  )
}

// ─────────────────────────────────────────────────────────
// HOME ROOT — scroll-snap container wraps all sections
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
