import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion'
import MagneticButton from './MagneticButton'

// ── useCounter ────────────────────────────────────────────────────────────────
function useCounter(target, duration = 1800, started = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!started) return
    let start = null
    const step = (timestamp) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])
  return value
}

// ── Metrics data ──────────────────────────────────────────────────────────────
const METRICS = [
  { value: 1200, suffix: '+', label: 'pets atendidos' },
  { value: 8, suffix: '', label: 'anos de experiência' },
  { value: 4.9, suffix: '★', label: 'avaliação média', isDecimal: true },
  { value: 3, suffix: '', label: 'especialistas' },
]

function MetricItem({ metric, started }) {
  const count = useCounter(metric.isDecimal ? 49 : metric.value, 1800, started)
  const display = metric.isDecimal ? (count / 10).toFixed(1) : count.toLocaleString('pt-BR')
  return (
    <div className="flex flex-col items-center gap-1 px-4 py-5 text-center">
      <span className="font-sora font-extrabold text-2xl md:text-3xl text-[#F0F5F1]">
        {display}{metric.suffix}
      </span>
      <span className="font-dm text-xs text-[#8A9E8F] leading-snug">{metric.label}</span>
    </div>
  )
}

// ── PawSVG ────────────────────────────────────────────────────────────────────
const PawSVG = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="currentColor">
    <ellipse cx="14" cy="20" rx="7" ry="8" />
    <circle cx="6" cy="11" r="3.5" />
    <circle cx="11" cy="7" r="3.5" />
    <circle cx="17" cy="7" r="3.5" />
    <circle cx="22" cy="11" r="3.5" />
  </svg>
)

const FLOATING_PAWS = [
  { top: '18%', left: '7%', duration: 3.5, delay: 0, rotate: -20 },
  { top: '22%', right: '8%', duration: 4.0, delay: 1.3, rotate: 15 },
  { top: '65%', left: '4%', duration: 4.5, delay: 2.6, rotate: -10 },
]

// ── DogCtaIcon ────────────────────────────────────────────────────────────────
function DogCtaIcon({ isHovered }) {
  return (
    <span className="relative inline-flex shrink-0" style={{ width: 28, height: 22 }}>
      <svg width="22" height="20" viewBox="0 0 28 24" fill="currentColor">
        <ellipse cx="7" cy="5" rx="4" ry="5.5" transform="rotate(-25 7 5)" />
        <ellipse cx="21" cy="5" rx="4" ry="5.5" transform="rotate(25 21 5)" />
        <circle cx="14" cy="14" r="9" />
        <circle cx="11" cy="13" r="1.4" fill="#0F1A14" />
        <circle cx="17" cy="13" r="1.4" fill="#0F1A14" />
        <ellipse cx="14" cy="17" rx="2" ry="1.3" fill="#0F1A14" />
      </svg>
      <motion.span
        className="absolute inline-block"
        style={{ top: 0, right: 0, width: 10, height: 14, transformOrigin: '50% 100%' }}
        animate={isHovered ? { rotate: [0, 25, -25, 25, -25, 0] } : { rotate: 0 }}
        transition={isHovered ? { duration: 0.3, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.15 }}
      >
        <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
          <path d="M5 14 Q2 8 6.5 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </motion.span>
    </span>
  )
}

// ── Mouse-trail paw ───────────────────────────────────────────────────────────
function TrailPaw({ id, x, y, rotate, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2000)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      className="pointer-events-none fixed z-50 text-[#4CAF7D]"
      style={{ left: x - 14, top: y - 14, rotate }}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.18 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <PawSVG />
    </motion.div>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function Hero() {
  const containerRef = useRef(null)
  const metricsRef = useRef(null)
  const [ctaHovered, setCtaHovered] = useState(false)
  const [trailPaws, setTrailPaws] = useState([])
  const nextId = useRef(0)
  const isTouch = useRef(false)

  const metricsInView = useInView(metricsRef, { amount: 0.3, once: true })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  useEffect(() => {
    isTouch.current = window.matchMedia('(hover: none)').matches
  }, [])

  const handleMouseMove = useCallback((e) => {
    if (isTouch.current) return
    if (Math.random() > 0.03) return
    const id = nextId.current++
    const rotate = Math.random() * 40 - 20
    setTrailPaws((prev) => [...prev, { id, x: e.clientX, y: e.clientY, rotate }])
  }, [])

  const removePaw = useCallback((id) => {
    setTrailPaws((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const titleLines = [
    [{ text: 'Tudo que seu pet' }],
    [{ text: 'merece,', color: '#4CAF7D' }, { text: ' em um só lugar.' }],
  ]

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-0"
    >
      {/* Mouse trail paws */}
      <AnimatePresence>
        {trailPaws.map((paw) => (
          <TrailPaw key={paw.id} {...paw} onDone={() => removePaw(paw.id)} />
        ))}
      </AnimatePresence>

      {/* Parallax background */}
      <motion.div className="absolute inset-0 -z-10" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F1A14] via-[#132018] to-[#0a1209]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(76,175,125,0.18) 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(76,175,125,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(76,175,125,0.8) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
      </motion.div>

      {/* Decorative radial circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 60%, rgba(76,175,125,0.07) 0%, transparent 70%)' }}
        />
      </div>

      {/* Floating paw prints */}
      {FLOATING_PAWS.map((pos, i) => {
        const { duration, delay, rotate, ...style } = pos
        return (
          <motion.div
            key={i}
            className="absolute hidden md:block text-[#4CAF7D]"
            style={{ ...style, opacity: 0.12, rotate }}
            animate={{ y: [0, -16, 0], rotate: [rotate - 10, rotate + 5, rotate - 10] }}
            transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
          >
            <PawSVG size={36} />
          </motion.div>
        )
      })}

      {/* Main content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5"
          style={{
            background: 'rgba(76,175,125,0.15)',
            border: '1px solid rgba(76,175,125,0.3)',
            borderRadius: 100,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.span
            className="w-2 h-2 rounded-full bg-[#4CAF7D] block"
            animate={{ scale: [1, 0.8, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="font-dm text-xs text-[#8A9E8F] uppercase tracking-widest">
            Aberto agora · Sapiranga/RS
          </span>
        </motion.div>

        {/* Title */}
        <h1 className="font-sora font-extrabold text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight text-[#F0F5F1] mb-6">
          {titleLines.map((line, i) => (
            <div key={i} className="overflow-hidden py-1 -my-1">
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.12,
                  ease: [0.76, 0, 0.24, 1],
                }}
              >
                {line.map((seg, j) => (
                  <span key={j} style={seg.color ? { color: seg.color } : {}}>
                    {seg.text}
                  </span>
                ))}
              </motion.div>
            </div>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          className="font-inter text-base md:text-lg text-[#8A9E8F] mb-10"
          style={{ maxWidth: 420 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Banho, tosa, veterinário e produtos premium para cães e gatos em Sapiranga.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Primary */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onHoverStart={() => setCtaHovered(true)}
            onHoverEnd={() => setCtaHovered(false)}
          >
            <MagneticButton
              href="#servicos"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#4CAF7D] text-[#0F1A14] font-sora font-bold text-base hover:bg-[#6FCFA0] transition-colors duration-300 shadow-[0_0_32px_rgba(76,175,125,0.3)] hover:shadow-[0_0_48px_rgba(76,175,125,0.5)]"
              style={{ borderRadius: 100 }}
            >
              <DogCtaIcon isHovered={ctaHovered} />
              <span>Agendar Serviço</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-1 transition-transform duration-200">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </MagneticButton>
          </motion.div>

          {/* Secondary */}
          <a
            href="#servicos"
            className="inline-flex items-center gap-2 px-8 py-4 font-sora font-semibold text-base text-[#8A9E8F] hover:text-[#F0F5F1] transition-colors duration-200"
            style={{
              borderRadius: 100,
              border: '1px solid rgba(138,158,143,0.3)',
            }}
          >
            Ver serviços
            <span className="text-[#4CAF7D]">↓</span>
          </a>
        </motion.div>

        {/* Metrics */}
        <motion.div
          ref={metricsRef}
          className="w-full max-w-2xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4">
            {METRICS.map((metric, i) => (
              <div
                key={i}
                style={i > 0 ? { borderLeft: '1px solid rgba(255,255,255,0.06)' } : {}}
              >
                <MetricItem metric={metric} started={metricsInView} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <span className="font-dm text-xs text-[#8A9E8F]/50 uppercase tracking-widest">scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M4 9l4 4 4-4" stroke="#4CAF7D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
