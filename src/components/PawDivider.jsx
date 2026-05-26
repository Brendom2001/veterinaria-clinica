import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const COLORS = ['#2B7FE0', '#FF9F43']

const PawSVG = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 28 28" fill={color}>
    <ellipse cx="14" cy="20" rx="7" ry="8" />
    <circle cx="6" cy="11" r="3.5" />
    <circle cx="11" cy="7" r="3.5" />
    <circle cx="17" cy="7" r="3.5" />
    <circle cx="22" cy="11" r="3.5" />
  </svg>
)

const COUNT = 8

export default function PawDivider() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <div
      ref={ref}
      className="w-full overflow-hidden flex items-center justify-around px-6"
      style={{ height: 48 }}
    >
      {Array.from({ length: COUNT }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.4, x: -20 }}
          animate={inView ? { opacity: 0.35, scale: 1, x: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: i * 0.08,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          <motion.div
            animate={inView ? { y: [0, -5, 0] } : {}}
            transition={{
              duration: 0.6,
              delay: (i % 2) * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <PawSVG color={COLORS[i % 2]} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
