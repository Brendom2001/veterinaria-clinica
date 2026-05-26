import { useRef, Fragment } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Escolha o serviço',
    desc: 'Banho, tosa, consulta, hotel ou adestramento — selecione o que seu pet precisa.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="4" width="20" height="20" rx="4" stroke="#4CAF7D" strokeWidth="1.5" fill="none"/>
        <path d="M9 14l3 3 7-7" stroke="#4CAF7D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: '#4CAF7D',
  },
  {
    number: '02',
    title: 'Agende pelo WhatsApp',
    desc: 'Mande uma mensagem, escolha o dia e horário que funcionam pra você em segundos.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="5" width="20" height="18" rx="3" stroke="#F5C842" strokeWidth="1.5" fill="none"/>
        <path d="M4 10h20" stroke="#F5C842" strokeWidth="1.5"/>
        <circle cx="9" cy="16" r="1.5" fill="#F5C842"/>
        <circle cx="14" cy="16" r="1.5" fill="#F5C842"/>
        <circle cx="19" cy="16" r="1.5" fill="#F5C842"/>
        <path d="M8 7V4M20 7V4" stroke="#F5C842" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    color: '#F5C842',
  },
  {
    number: '03',
    title: 'Leve seu pet',
    desc: 'Apareça no horário marcado. Nós cuidamos de tudo — você só precisa buscar um pet feliz.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4C9.58 4 6 7.58 6 12c0 3.31 1.92 6.18 4.72 7.6L14 24l3.28-4.4C20.08 18.18 22 15.31 22 12c0-4.42-3.58-8-8-8z" stroke="#6FCFA0" strokeWidth="1.5" fill="none"/>
        <circle cx="14" cy="12" r="3" fill="#6FCFA0" opacity="0.4"/>
        <circle cx="14" cy="12" r="1.5" fill="#6FCFA0"/>
      </svg>
    ),
    color: '#6FCFA0',
  },
]

function ConnectorLine({ inView, delay }) {
  return (
    <div className="hidden md:flex flex-1 items-center px-2 mt-[-2px]">
      <div className="relative w-full h-px bg-[#2A3D2F] overflow-hidden rounded-full">
        <motion.div
          className="absolute inset-0 h-px rounded-full"
          style={{ background: 'linear-gradient(90deg, #4CAF7D, #F5C842)' }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay, ease: [0.76, 0, 0.24, 1] }}
        />
      </div>
    </div>
  )
}

export default function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.15, once: true })

  return (
    <section ref={ref} className="py-24 px-6 bg-[#132018]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className="font-dm text-xs text-[#4CAF7D] uppercase tracking-widest mb-3 block">Simples assim</span>
          <h2 className="font-sora font-extrabold text-3xl md:text-5xl text-[#F0F5F1]">
            Como <span className="text-[#4CAF7D]">funciona</span>
          </h2>
        </motion.div>

        {/* Steps row */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0">
          {steps.map((step, i) => (
            <Fragment key={step.number}>
              <motion.div
                className="flex-1 flex flex-col items-center text-center gap-4 px-4"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + i * 0.18,
                  type: 'spring',
                  stiffness: 280,
                  damping: 28,
                }}
              >
                {/* Number badge */}
                <div className="relative">
                  <motion.div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `${step.color}18`,
                      border: `1.5px solid ${step.color}40`,
                    }}
                    whileHover={{ scale: 1.08, boxShadow: `0 0 28px ${step.color}40` }}
                    transition={{ duration: 0.2 }}
                  >
                    {step.icon}
                  </motion.div>
                  <div
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center font-sora font-bold text-[10px] text-[#0F1A14]"
                    style={{ background: step.color }}
                  >
                    {i + 1}
                  </div>
                </div>

                <div>
                  <h3 className="font-sora font-bold text-lg text-[#F0F5F1] mb-2">{step.title}</h3>
                  <p className="font-inter text-sm text-[#8A9E8F] leading-relaxed max-w-[200px] mx-auto">
                    {step.desc}
                  </p>
                </div>
              </motion.div>

              {i < steps.length - 1 && (
                <ConnectorLine inView={inView} delay={0.4 + i * 0.18} />
              )}
            </Fragment>
          ))}
        </div>

        {/* Bottom CTA hint */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <p className="font-dm text-sm text-[#8A9E8F]">
            Tempo médio de agendamento:{' '}
            <span className="text-[#4CAF7D] font-medium">menos de 2 minutos</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
