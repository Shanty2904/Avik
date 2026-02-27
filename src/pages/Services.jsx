import { Link } from 'react-router-dom'

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
// Data
// ─────────────────────────────────────────────────────────
const services = [
  {
    title: 'Illustration',
    short: 'Editorial, branding, and narrative illustration.',
    desc: "Custom illustrations built around your story — whether for editorial use, brand identity, product packaging, or personal projects. Each piece is crafted with attention to mood, palette, and detail, ensuring the work feels intentional and alive. I work across digital and traditional mediums depending on the project's needs.",
  },
  {
    title: 'Concept Art',
    short: 'World-building for games, film, and creative projects.',
    desc: 'Environment design, character concepts, and visual development for games, films, and other creative ventures. This is where ideas become worlds — defining tone, atmosphere, and visual language before production begins. I collaborate closely with directors, writers, and developers to ensure the concept art serves the larger vision.',
  },
  {
    title: 'Visual Design',
    short: 'Graphic systems, layouts, and brand visuals.',
    desc: 'Visual systems and design solutions for brands, campaigns, and digital platforms. From typography and color systems to full layout design, this service bridges the gap between illustration and communication design. The goal is always clarity, consistency, and aesthetic coherence across all touchpoints.',
  },
  {
    title: 'Commissions',
    short: 'Personal artwork made just for you.',
    desc: "One-of-a-kind artwork created in close collaboration with you — portraits, gifts, narrative pieces, or anything in between. Commissions are personal by nature, so the process is conversational and iterative. You're involved every step of the way, from initial concept to final delivery.",
  },
]

const steps = [
  {
    num: '01',
    title: 'Research',
    desc: 'Understand your goals, audience, and vision. Mood boards and references are gathered to align on direction before any work begins.',
  },
  {
    num: '02',
    title: 'Concept',
    desc: 'Develop 2–3 rough concepts based on the research. These are reviewed together to finalize a creative direction.',
  },
  {
    num: '03',
    title: 'Design',
    desc: 'The main production phase — all assets are developed, refined, and prototyped based on the approved concept.',
  },
  {
    num: '04',
    title: 'Review',
    desc: 'Feedback rounds with up to 2–3 versions of proofs, addressing any design or copy changes before finalization.',
  },
  {
    num: '05',
    title: 'Finalize',
    desc: 'Once approved, all assets are packaged and delivered. Continuing support is always an option.',
  },
]

// ─────────────────────────────────────────────────────────
// Service card
// ─────────────────────────────────────────────────────────
function ServiceCard({ service }) {
  return (
    <div className="border border-black/10 dark:border-white/10 p-8 md:p-10 flex flex-col gap-4 hover:border-black/30 dark:hover:border-white/30 transition-colors duration-300">
      <h3
        className="text-black dark:text-white"
        style={{ ...FONT, fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}
      >
        {service.title}
      </h3>
      <p
        className="text-black/40 dark:text-white/40 uppercase tracking-widest"
        style={{ fontFamily: 'serif', fontSize: '0.65rem' }}
      >
        {service.short}
      </p>
      <div className="w-6 h-px bg-black/20 dark:bg-white/20" />
      <p className="text-black/70 dark:text-white/60 leading-[1.9] text-sm font-serif">
        {service.desc}
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// Process step (diamond + connecting line)
// ─────────────────────────────────────────────────────────
function ProcessStep({ step, isLast }) {
  return (
    <div className="flex flex-col items-center flex-1 relative">
      {/* Connecting line — hidden on last step */}
      {!isLast && (
        <div
          className="absolute top-[22px] left-1/2 w-full h-px bg-black/15 dark:bg-white/15"
          style={{ transform: 'translateX(50%)' }}
        />
      )}

      {/* Diamond */}
      <div
        className="relative z-10 w-11 h-11 flex items-center justify-center bg-white dark:bg-black border border-black/25 dark:border-white/25"
        style={{ transform: 'rotate(45deg)', flexShrink: 0 }}
      >
        <span
          className="text-black dark:text-white"
          style={{
            ...FONT,
            fontSize: '0.6rem',
            letterSpacing: '0.05em',
            transform: 'rotate(-45deg)',
            display: 'block',
          }}
        >
          {step.num}
        </span>
      </div>

      {/* Text below diamond */}
      <div className="mt-6 text-center px-2">
        <h4
          className="text-black dark:text-white mb-3"
          style={{ ...FONT, fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)' }}
        >
          {step.title}
        </h4>
        <p className="text-black/55 dark:text-white/50 leading-relaxed font-serif"
          style={{ fontSize: '0.78rem' }}
        >
          {step.desc}
        </p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// Services page
// ─────────────────────────────────────────────────────────
export default function Services() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">

      {/* ── Page header ── */}
      <div className="pt-28 pb-12 md:pt-36 md:pb-16 text-center px-6">
        <p
          className="text-black/40 dark:text-white/40 mb-3 tracking-[0.25em] uppercase"
          style={{ fontFamily: 'serif', fontSize: '0.7rem' }}
        >
          What I Offer
        </p>
        <h1
          className="text-black dark:text-white"
          style={{ ...FONT, fontSize: 'clamp(3.5rem, 10vw, 9rem)', lineHeight: 0.95 }}
        >
          Services
        </h1>
        <div className="w-10 h-px bg-black/20 dark:bg-white/20 mx-auto mt-8" />
      </div>

      {/* ── Services grid ── */}
      <div className="px-6 md:px-16 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-[1100px] mx-auto">
          {services.map((s, i) => (
            <ServiceCard key={i} service={s} />
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="px-6 md:px-16">
        <div className="max-w-[1100px] mx-auto h-px bg-black/10 dark:bg-white/10" />
      </div>

      {/* ── Process section ── */}
      <div className="px-6 md:px-16 py-24 md:py-32">
        <div className="max-w-[1100px] mx-auto">

          {/* Process header */}
          <div className="text-center mb-16 md:mb-20">
            <h2
              className="text-black dark:text-white mb-5"
              style={{ ...FONT, fontSize: 'clamp(2.5rem, 7vw, 6rem)', lineHeight: 0.95 }}
            >
              Process
            </h2>
            <p className="text-black/55 dark:text-white/50 font-serif leading-relaxed max-w-[480px] mx-auto text-sm md:text-base">
              Every project is different, but this is the usual structure I follow as best practice.
            </p>
          </div>

          {/* Steps — horizontal on desktop, vertical on mobile */}
          <div className="hidden md:flex gap-0 items-start">
            {steps.map((step, i) => (
              <ProcessStep key={i} step={step} isLast={i === steps.length - 1} />
            ))}
          </div>

          {/* Mobile steps — vertical stack */}
          <div className="flex md:hidden flex-col gap-10">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6 items-start">
                {/* Diamond */}
                <div
                  className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-white dark:bg-black border border-black/25 dark:border-white/25"
                  style={{ transform: 'rotate(45deg)' }}
                >
                  <span
                    className="text-black dark:text-white"
                    style={{ ...FONT, fontSize: '0.55rem', transform: 'rotate(-45deg)', display: 'block' }}
                  >
                    {step.num}
                  </span>
                </div>
                <div className="pt-1">
                  <h4
                    className="text-black dark:text-white mb-2"
                    style={{ ...FONT, fontSize: '1.1rem' }}
                  >
                    {step.title}
                  </h4>
                  <p className="text-black/55 dark:text-white/50 font-serif text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="px-6 md:px-16">
        <div className="max-w-[1100px] mx-auto h-px bg-black/10 dark:bg-white/10" />
      </div>

      {/* ── CTA ── */}
      <div className="py-24 md:py-32 text-center px-6">
        <p className="text-black/60 dark:text-white/50 font-serif leading-relaxed max-w-[480px] mx-auto mb-10 text-sm md:text-base">
          Interested in working together, or have a unique project in mind? I'd love to hear about it.
        </p>
        <Link
          to="/contact"
          className="inline-block border border-black dark:border-white px-10 py-3 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300 no-underline"
          style={{ ...FONT, fontSize: '0.8rem', letterSpacing: '0.2em' }}
        >
          LET'S WORK TOGETHER
        </Link>
      </div>

    </div>
  )
}
