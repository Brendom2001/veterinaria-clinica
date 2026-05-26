import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const items = [
  {
    emoji: '🌿',
    title: 'Produtos 100% naturais',
    desc: 'Utilizamos apenas produtos sem parabenos, sulfatos ou químicos agressivos — formulações naturais que respeitam a pele e o pelo do seu pet.',
    accent: '#4CAF7D',
  },
  {
    emoji: '❤️',
    title: 'Equipe especializada',
    desc: 'Nossa equipe passa por treinamentos contínuos em bem-estar animal. Cada profissional foi selecionado pela paixão que tem pelos animais.',
    accent: '#F5C842',
  },
  {
    emoji: '📅',
    title: 'Agendamento online',
    desc: 'Agende qualquer serviço em segundos pelo WhatsApp ou site, escolha o horário que quiser — sem filas, sem complicação.',
    accent: '#6FCFA0',
  },
]

export default function Diferenciais() {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.15, once: true })

  return (
    <section id="diferenciais" ref={ref} className="py-24 px-6 bg-[#0F1A14]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className="font-dm text-xs text-[#4CAF7D] uppercase tracking-widest mb-3 block">Por que o Atlas Pet?</span>
          <h2 className="font-sora font-extrabold text-3xl md:text-5xl text-[#F0F5F1]">
            O que nos faz<br />
            <span className="text-[#F5C842]">diferentes.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              className="relative p-8 rounded-2xl bg-[#132018] border border-[#2A3D2F] overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + i * 0.1,
                ease: [0.76, 0, 0.24, 1],
                type: 'spring',
                stiffness: 280,
                damping: 28,
              }}
              whileHover={{ borderColor: `${item.accent}55` }}
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10"
                style={{ background: item.accent }}
              />
              <div className="text-4xl mb-5">{item.emoji}</div>
              <h3 className="font-sora font-bold text-xl text-[#F0F5F1] mb-3">{item.title}</h3>
              <p className="font-inter text-sm text-[#8A9E8F] leading-relaxed">{item.desc}</p>
              <div
                className="mt-6 h-px w-12 rounded-full"
                style={{ background: item.accent }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
