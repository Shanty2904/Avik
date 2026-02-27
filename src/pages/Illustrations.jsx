import { useState, useEffect, useCallback } from 'react'

// ─────────────────────────────────────────────────────────
// Illustrations data
// src   — filename inside /Assets/
// title — displayed on hover and in lightbox
// desc  — caption in lightbox
// span  — 'tall' (2 rows), 'wide' (2 cols), '' (normal)
// ─────────────────────────────────────────────────────────
const illustrations = [
  {
    src: '/Assets/Final in Color.png',
    title: 'Isometric Illustration',
    desc: 'Description coming soon.',
    span: 'tall',
  },
  {
    src: '/Assets/Final Marketplace Illustration.png',
    title: 'Marketplace',
    desc: 'Description coming soon.',
    span: '',
  },
  {
    src: '/Assets/Final Space Cafe.png',
    title: 'Space Cafe',
    desc: 'Description coming soon.',
    span: '',
  },
  {
    src: '/Assets/Final Tide Mural .png',
    title: 'Tide Mural',
    desc: 'Description coming soon.',
    span: 'wide',
  },
  {
    src: '/Assets/Gouache Portrait 2.png',
    title: 'Gouache Portrait',
    desc: 'Description coming soon.',
    span: 'tall',
  },
  {
    src: '/Assets/Full Back and Front.png',
    title: 'The Deep Don',
    desc: 'Description coming soon.',
    span: '',
  },
  // ── Add more below ──
  // { src: '/Assets/YOUR_FILE.png', title: 'Title', desc: 'Desc.', span: '' },
]

// ─────────────────────────────────────────────────────────
// Shared font style
// ─────────────────────────────────────────────────────────
const FONT = {
  fontFamily: '"shackleton-condensed", serif',
  fontWeight: 400,
  fontStyle: 'normal',
  letterSpacing: '0.07em',
}

// ─────────────────────────────────────────────────────────
// Lightbox
// ─────────────────────────────────────────────────────────
function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const item = items[index]

  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowRight') onNext()
    if (e.key === 'ArrowLeft') onPrev()
  }, [onClose, onNext, onPrev])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="relative flex flex-col items-center px-6"
        style={{ maxWidth: '90vw', maxHeight: '90vh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-2 right-0 text-black/40 hover:text-black text-2xl leading-none bg-transparent border-none cursor-pointer transition-colors"
          style={{ ...FONT, fontSize: '1.5rem', letterSpacing: '0.1em' }}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Image */}
        <img
          src={item.src}
          alt={item.title}
          className="object-contain block"
          style={{ maxWidth: '78vw', maxHeight: '68vh', userSelect: 'none' }}
        />

        {/* Divider */}
        <div className="w-12 h-px bg-black/20 my-5" />

        {/* Title + desc */}
        <div className="text-center">
          <h3
            className="text-black mb-2"
            style={{ ...FONT, fontSize: 'clamp(1rem, 2.5vw, 1.6rem)' }}
          >
            {item.title}
          </h3>
          <p className="text-black/50 text-sm max-w-[440px] leading-relaxed font-serif">
            {item.desc}
          </p>
        </div>

        {/* Prev / Next */}
        <div className="flex items-center gap-10 mt-6">
          <button
            onClick={onPrev}
            disabled={index === 0}
            className="bg-transparent border-none cursor-pointer transition-opacity disabled:opacity-20"
            style={{ ...FONT, fontSize: '0.7rem', letterSpacing: '0.2em', color: '#000' }}
            aria-label="Previous"
          >
            ← PREV
          </button>
          <span
            className="text-black/30"
            style={{ fontFamily: 'serif', fontSize: '0.75rem', letterSpacing: '0.1em' }}
          >
            {index + 1} / {items.length}
          </span>
          <button
            onClick={onNext}
            disabled={index === items.length - 1}
            className="bg-transparent border-none cursor-pointer transition-opacity disabled:opacity-20"
            style={{ ...FONT, fontSize: '0.7rem', letterSpacing: '0.2em', color: '#000' }}
            aria-label="Next"
          >
            NEXT →
          </button>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// Grid item — clean hover: subtle overlay, title slides up
// ─────────────────────────────────────────────────────────
function GridItem({ item, index, onClick }) {
  const [hovered, setHovered] = useState(false)

  const spanClass =
    item.span === 'tall' ? 'row-span-2' :
    item.span === 'wide' ? 'col-span-2' : ''

  return (
    <div
      className={`relative overflow-hidden cursor-pointer bg-[#f5f5f5] dark:bg-[#111] ${spanClass}`}
      onClick={() => onClick(index)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ userSelect: 'none' }}
    >
      {/* Image */}
      <img
        src={item.src}
        alt={item.title}
        className="w-full h-full object-cover block"
        loading="lazy"
        style={{
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      />

      {/* Hover overlay — very light, just enough to read text */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 50%)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Title — slides up from bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 px-4 md:px-5 pb-4 md:pb-5"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      >
        <p
          className="text-white"
          style={{ ...FONT, fontSize: 'clamp(0.75rem, 1.5vw, 1.1rem)', lineHeight: 1 }}
        >
          {item.title}
        </p>
        <p
          className="text-white/60 mt-1"
          style={{ fontFamily: 'serif', fontSize: '0.65rem', letterSpacing: '0.15em' }}
        >
          VIEW ↗
        </p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// Illustrations page
// ─────────────────────────────────────────────────────────
export default function Illustrations() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  return (
    <div className="min-h-screen bg-white dark:bg-black">

      {/* ── Page header ── */}
      <div className="pt-28 pb-12 md:pt-36 md:pb-16 text-center px-6">
        <h1
          className="text-black dark:text-white"
          style={{ ...FONT, fontSize: 'clamp(3.5rem, 10vw, 9rem)', lineHeight: 0.95 }}
        >
          Illustrations
        </h1>
        <div className="w-10 h-px bg-black/20 dark:bg-white/20 mx-auto mt-8" />
      </div>

      {/* ── Masonry grid ── */}
      <div
        className="px-6 md:px-16 pb-24"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gridAutoRows: '300px',
          gap: '24px',
        }}
      >
        {illustrations.map((item, i) => (
          <GridItem
            key={i}
            item={item}
            index={i}
            onClick={setLightboxIndex}
          />
        ))}
      </div>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <Lightbox
          items={illustrations}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex(i => Math.max(i - 1, 0))}
          onNext={() => setLightboxIndex(i => Math.min(i + 1, illustrations.length - 1))}
        />
      )}
    </div>
  )
}
