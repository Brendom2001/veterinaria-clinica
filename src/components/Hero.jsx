import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import MagneticButton from './MagneticButton'

// ── Title lines (line-by-line reveal) ────────────────────────────────────────
const titleLines = [
  [{ text: 'Tudo que seu pet' }],
  [{ text: 'merece,', color: '#4CAF7D' }, { text: ' em um só' }],
  [{ text: 'lugar.', color: '#F5C842' }],
]

// ── Floating pet illustrations ────────────────────────────────────────────────
const DogSVG = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <ellipse cx="32" cy="38" rx="18" ry="14" fill="#1A2B1F"/>
    <ellipse cx="32" cy="38" rx="16" ry="12" fill="#4CAF7D" opacity="0.15"/>
    <circle cx="32" cy="24" r="10" fill="#1A2B1F"/>
    <circle cx="32" cy="24" r="8" fill="#4CAF7D" opacity="0.2"/>
    <ellipse cx="24" cy="17" rx="4" ry="6" fill="#4CAF7D" opacity="0.3"/>
    <ellipse cx="40" cy="17" rx="4" ry="6" fill="#4CAF7D" opacity="0.3"/>
    <circle cx="29" cy="23" r="1.5" fill="#6FCFA0"/>
    <circle cx="35" cy="23" r="1.5" fill="#6FCFA0"/>
    <ellipse cx="32" cy="27" rx="2" ry="1.5" fill="#F5C842" opacity="0.6"/>
    <ellipse cx="20" cy="46" rx="4" ry="6" fill="#4CAF7D" opacity="0.2"/>
    <ellipse cx="44" cy="46" rx="4" ry="6" fill="#4CAF7D" opacity="0.2"/>
    <ellipse cx="24" cy="52" rx="4" ry="6" fill="#4CAF7D" opacity="0.2"/>
    <ellipse cx="40" cy="52" rx="4" ry="6" fill="#4CAF7D" opacity="0.2"/>
    <ellipse cx="42" cy="36" rx="5" ry="3" fill="#F5C842" opacity="0.2"/>
  </svg>
)

const CatSVG = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
    <ellipse cx="28" cy="34" rx="15" ry="12" fill="#1A2B1F"/>
    <ellipse cx="28" cy="34" rx="13" ry="10" fill="#6FCFA0" opacity="0.12"/>
    <circle cx="28" cy="22" r="9" fill="#1A2B1F"/>
    <circle cx="28" cy="22" r="7" fill="#6FCFA0" opacity="0.18"/>
    <polygon points="20,16 23,9 26,16" fill="#6FCFA0" opacity="0.35"/>
    <polygon points="36,16 33,9 30,16" fill="#6FCFA0" opacity="0.35"/>
    <ellipse cx="25" cy="21" rx="2" ry="2.5" fill="#F5C842" opacity="0.8"/>
    <ellipse cx="31" cy="21" rx="2" ry="2.5" fill="#F5C842" opacity="0.8"/>
    <circle cx="25" cy="21.5" r="1" fill="#0F1A14"/>
    <circle cx="31" cy="21.5" r="1" fill="#0F1A14"/>
    <path d="M24 26 Q28 29 32 26" stroke="#6FCFA0" strokeWidth="1" fill="none"/>
    <line x1="18" y1="24" x2="12" y2="22" stroke="#6FCFA0" strokeWidth="0.8" opacity="0.5"/>
    <line x1="18" y1="26" x2="11" y2="26" stroke="#6FCFA0" strokeWidth="0.8" opacity="0.5"/>
    <line x1="38" y1="24" x2="44" y2="22" stroke="#6FCFA0" strokeWidth="0.8" opacity="0.5"/>
    <line x1="38" y1="26" x2="45" y2="26" stroke="#6FCFA0" strokeWidth="0.8" opacity="0.5"/>
  </svg>
)

const BirdSVG = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <ellipse cx="28" cy="28" rx="10" ry="8" fill="#F5C842" opacity="0.2"/>
    <circle cx="22" cy="20" r="8" fill="#F5C842" opacity="0.18"/>
    <path d="M22 14 Q16 10 10 16 Q14 16 16 20" fill="#F5C842" opacity="0.3"/>
    <path d="M28 24 Q36 20 38 28 Q32 26 28 30" fill="#F5C842" opacity="0.25"/>
    <circle cx="19" cy="18" r="2" fill="#F5C842" opacity="0.7"/>
    <circle cx="19.5" cy="18" r="0.8" fill="#0F1A14"/>
    <path d="M17 22 L14 24 L17 23" fill="#F5C842" opacity="0.6"/>
    <path d="M24 30 Q24 38 22 40" stroke="#F5C842" strokeWidth="1.5" fill="none" opacity="0.3"/>
  </svg>
)

const floatingPets = [
  { Component: DogSVG, top: '15%', left: '8%', duration: 3.6, delay: 0 },
  { Component: CatSVG, top: '20%', right: '10%', duration: 4.2, delay: 1.1 },
  { Component: BirdSVG, top: '60%', left: '5%', duration: 3.0, delay: 0.6 },
]

const bullets = [
  'Veterinário com hora marcada',
  'Produtos naturais e premium',
  'Equipe que ama animais',
]

// ── Dog icon com cauda que abana ──────────────────────────────────────────────
function DogCtaIcon({ isHovered }) {
  return (
    <span className="relative inline-flex shrink-0" style={{ width: 28, height: 22 }}>
      {/* Cabeça + orelhas + face */}
      <svg width="22" height="20" viewBox="0 0 28 24" fill="currentColor">
        {/* Orelha esquerda */}
        <ellipse cx="7" cy="5" rx="4" ry="5.5" transform="rotate(-25 7 5)" />
        {/* Orelha direita */}
        <ellipse cx="21" cy="5" rx="4" ry="5.5" transform="rotate(25 21 5)" />
        {/* Cabeça */}
        <circle cx="14" cy="14" r="9" />
        {/* Olhos */}
        <circle cx="11" cy="13" r="1.4" fill="#0F1A14" />
        <circle cx="17" cy="13" r="1.4" fill="#0F1A14" />
        {/* Nariz */}
        <ellipse cx="14" cy="17" rx="2" ry="1.3" fill="#0F1A14" />
      </svg>

      {/* Cauda — elemento separado para poder rotacionar do base */}
      <motion.span
        className="absolute inline-block"
        style={{
          top: 0,
          right: 0,
          width: 10,
          height: 14,
          transformOrigin: '50% 100%',
        }}
        animate={
          isHovered
            ? { rotate: [0, 25, -25, 25, -25, 0] }
            : { rotate: 0 }
        }
        transition={
          isHovered
            ? { duration: 0.3, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.15 }
        }
      >
        <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
          <path
            d="M5 14 Q2 8 6.5 1"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </motion.span>
    </span>
  )
}

// ── Componente principal ───────────────────────────────────────────────────────
export default function Hero() {
  const containerRef = useRef(null)
  const [ctaHovered, setCtaHovered] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16"
    >
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

      {/* Floating pet icons */}
      {floatingPets.map(({ Component, duration, delay, ...pos }, i) => (
        <motion.div
          key={i}
          className="absolute hidden md:block"
          style={pos}
          animate={{ y: [0, -14, 0], rotate: [-3, 3, -3] }}
          transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Component />
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#2A3D2F] bg-[#1A2B1F]/60"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className="w-2 h-2 rounded-full bg-[#4CAF7D] animate-pulse" />
          <span className="font-dm text-xs text-[#8A9E8F] uppercase tracking-widest">
            Petshop Premium · Sapiranga
          </span>
        </motion.div>

        {/* Título — revelação linha por linha */}
        <h1 className="font-sora font-extrabold text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight text-[#F0F5F1] mb-6">
          {titleLines.map((line, i) => (
            <div key={i} className="overflow-hidden py-1 -my-1">
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.3 + i * 0.12,
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

        {/* Subtítulo — fade simples */}
        <motion.p
          className="font-inter text-base md:text-lg text-[#8A9E8F] max-w-xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Banho, tosa, veterinário e produtos premium para cães e gatos em Sapiranga.
        </motion.p>

        {/* Bullets */}
        <motion.ul className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-10">
          {bullets.map((bullet, i) => (
            <motion.li
              key={i}
              className="flex items-center gap-2 font-dm text-sm text-[#F0F5F1]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 1.3 + i * 0.12,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#4CAF7D]/20 text-[#4CAF7D] text-xs font-bold">
                ✓
              </span>
              {bullet}
            </motion.li>
          ))}
        </motion.ul>

        {/* CTA com cachorro + cauda abanando */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onHoverStart={() => setCtaHovered(true)}
            onHoverEnd={() => setCtaHovered(false)}
          >
            <MagneticButton
              href="#servicos"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#4CAF7D] text-[#0F1A14] font-sora font-bold text-base hover:bg-[#6FCFA0] transition-colors duration-300 shadow-[0_0_32px_rgba(76,175,125,0.3)] hover:shadow-[0_0_48px_rgba(76,175,125,0.5)]"
            >
              <DogCtaIcon isHovered={ctaHovered} />
              <span>Agendar Serviço</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="group-hover:translate-x-1 transition-transform duration-200"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <span className="font-dm text-xs text-[#8A9E8F]/50 uppercase tracking-widest">
            Scroll
          </span>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-[#4CAF7D]/40 to-transparent"
            animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </section>
  )
}
