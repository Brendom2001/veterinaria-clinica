import { useScroll, useTransform, motion } from 'framer-motion'

const PawSVG = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="14" cy="20" rx="7" ry="8" />
    <circle cx="6" cy="11" r="3.5" />
    <circle cx="11" cy="7" r="3.5" />
    <circle cx="17" cy="7" r="3.5" />
    <circle cx="22" cy="11" r="3.5" />
  </svg>
)

const PAW_CONFIG = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: i % 2 === 0 ? 14 : 44,
  top: 8 + i * (84 / 11),
  rotate: i % 2 === 0 ? -15 : 15,
  threshold: (i + 0.5) / 12,
}))

function PawPrint({ paw, scrollYProgress }) {
  const lo = Math.max(0, paw.threshold - 0.04)
  const hi = paw.threshold
  const opacity = useTransform(scrollYProgress, [lo, hi], [0, 0.3])
  const scale = useTransform(scrollYProgress, [lo, hi], [0.5, 1])

  return (
    <motion.div
      className="fixed pointer-events-none hidden md:block"
      style={{
        left: paw.left,
        top: `${paw.top}vh`,
        color: '#4CAF7D',
        opacity,
        scale,
        rotate: paw.rotate,
        zIndex: 5,
      }}
    >
      <PawSVG />
    </motion.div>
  )
}

export default function PawTrail() {
  const { scrollYProgress } = useScroll()

  return (
    <>
      {PAW_CONFIG.map((paw) => (
        <PawPrint key={paw.id} paw={paw} scrollYProgress={scrollYProgress} />
      ))}
    </>
  )
}
