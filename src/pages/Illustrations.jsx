import { useState, useEffect, useCallback } from 'react'

// ─────────────────────────────────────────────────────────
// Illustrations data
// To add more: copy any item block and fill in the fields.
// src       — filename inside /Assets/
// title     — displayed in lightbox
// desc      — caption shown in lightbox
// span      — controls masonry size: 'tall', 'wide', or ''
//             tall = takes more vertical space
//             wide = takes more horizontal space (2 cols)
//             ''   = normal square-ish cell
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
  // ── Add more illustrations below ──
  // {
  //   src: '/Assets/YOUR_FILE.png',
  //   title: 'Your Title',
  //   desc: 'Your description.',
  //   span: '',   // 'tall', 'wide', or ''
  // },
]

// ─────────────────────────────────────────────────────────
// Lightbox
// ─────────────────────────────────────────────────────────
function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const item = items[index]

  // Close on Escape, navigate on arrow keys
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
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      {/* Modal — stop click propagation so clicking inside doesn't close */}
      <div
        className="relative flex flex-col items-center max-w-[90vw] max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/70 hover:text-white text-3xl leading-none bg-transparent border-none cursor-pointer transition-colors"
          aria-label="Close"
        >
          ×
        </button>

        {/* Image */}
        <img
          src={item.src}
          alt={item.title}
          className="max-w-[80vw] max-h-[70vh] object-contain block"
          style={{ userSelect: 'none' }}
        />

        {/* Title + description */}
        <div className="mt-4 text-center px-4">
          <h3
            className="text-white mb-1"
            style={{
              fontFamily: '"shackleton-condensed", serif',
              fontWeight: 400,
              fontStyle: 'normal',
              letterSpacing: '0.08em',
              fontSize: 'clamp(1rem, 3vw, 1.8rem)',
            }}
          >
            {item.title}
          </h3>
          <p className="text-white/60 text-sm max-w-[500px] leading-relaxed">
            {item.desc}
          </p>
        </div>

        {/* Prev / Next */}
        <div className="flex gap-8 mt-5">
          <button
            onClick={onPrev}
            disabled={index === 0}
            className="text-white/50 hover:text-white disabled:opacity-20 text-xl bg-transparent border-none cursor-pointer transition-colors tracking-widest"
            aria-label="Previous"
          >
            ← PREV
          </button>
          <span className="text-white/30 text-sm self-center">
            {index + 1} / {items.length}
          </span>
          <button
            onClick={onNext}
            disabled={index === items.length - 1}
            className="text-white/50 hover:text-white disabled:opacity-20 text-xl bg-transparent border-none cursor-pointer transition-colors tracking-widest"
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
// Masonry grid item
// ─────────────────────────────────────────────────────────
function GridItem({ item, index, onClick }) {
  const spanClass =
    item.span === 'tall' ? 'row-span-2' :
    item.span === 'wide' ? 'col-span-2' :
    ''

  return (
    <div
      className={`relative overflow-hidden group cursor-pointer ${spanClass}`}
      onClick={() => onClick(index)}
      style={{ userSelect: 'none' }}
    >
      <img
        src={item.src}
        alt={item.title}
        className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 flex flex-col justify-end p-4 md:p-6">
        <h3
          className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-1"
          style={{
            fontFamily: '"shackleton-condensed", serif',
            fontWeight: 400,
            fontStyle: 'normal',
            letterSpacing: '0.08em',
            fontSize: 'clamp(0.9rem, 2vw, 1.4rem)',
          }}
        >
          {item.title}
        </h3>
        <span className="text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs tracking-widest">
          VIEW
        </span>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// Illustrations page
// ─────────────────────────────────────────────────────────
export default function Illustrations() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  function openLightbox(index) {
    setLightboxIndex(index)
  }

  function closeLightbox() {
    setLightboxIndex(null)
  }

  function prevItem() {
    setLightboxIndex(i => Math.max(i - 1, 0))
  }

  function nextItem() {
    setLightboxIndex(i => Math.min(i + 1, illustrations.length - 1))
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-24 pb-16 px-4 md:px-8">
      {/* Page title */}
      <div className="mb-10 md:mb-14 text-center">
        <h1
          className="text-black dark:text-white"
          style={{
            fontFamily: '"shackleton-condensed", serif',
            fontWeight: 400,
            fontStyle: 'normal',
            letterSpacing: '0.08em',
            fontSize: 'clamp(2.5rem, 8vw, 7rem)',
          }}
        >
          Illustrations
        </h1>
      </div>

      {/* Masonry grid */}
      <div
        className="grid gap-3 md:gap-4"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gridAutoRows: '280px',
        }}
      >
        {illustrations.map((item, i) => (
          <GridItem key={i} item={item} index={i} onClick={openLightbox} />
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          items={illustrations}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevItem}
          onNext={nextItem}
        />
      )}
    </div>
  )
}
