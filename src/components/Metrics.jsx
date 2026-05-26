import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function useCounter(end, duration = 1800, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    const startTime = performance.now()
    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [start, end, duration])

  return count
}

const metrics = [
  { value: 1200, suffix: '+', label: 'Pets atendidos', prefix: '' },
  { value: 8, suffix: '', label: 'Anos de experiência', prefix: '' },
  { value: 4.9, suffix: '★', label: 'Avaliação média', prefix: '', isFloat: true },
  { value: 3, suffix: '', label: 'Especialistas', prefix: '' },
]

function MetricCard({ metric, index, started }) {
  const intCount = useCounter(metric.isFloat ? 49 : metric.value, 1800, started)

  return (
    <motion.div
      className="flex flex-col items-center gap-2 p-8 rounded-2xl bg-[#1A2B1F] border border-[#2A3D2F] hover:border-[#4CAF7D]/40 transition-all duration-300"
      initial={{ opacity: 0, y: 40 }}
      animate={started ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.2 + index * 0.1,
        ease: [0.76, 0, 0.24, 1],
      }}
    >
      <span className="font-sora font-extrabold text-4xl md:text-5xl text-[#F0F5F1]">
        {metric.prefix}
        {metric.isFloat ? (intCount / 10).toFixed(1) : intCount.toLocaleString('pt-BR')}
        <span className="text-[#4CAF7D]">{metric.suffix}</span>
      </span>
      <span className="font-dm text-sm text-[#8A9E8F] text-center">{metric.label}</span>
    </motion.div>
  )
}

export default function Metrics() {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.15, once: true })

  return (
    <section ref={ref} className="py-20 px-6 bg-[#132018]">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric, i) => (
          <MetricCard key={i} metric={metric} index={i} started={inView} />
        ))}
      </div>
    </section>
  )
}
