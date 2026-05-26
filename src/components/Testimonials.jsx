import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const testimonials = [
  {
    name: 'Camila Torres',
    pet: 'Thor, Golden Retriever',
    text: 'O Thor sempre chega em casa perfumado, feliz e com aquele pelo incrível. A equipe trata ele com tanto carinho que ele late de alegria quando chegamos lá!',
    stars: 5,
    initials: 'CT',
    color: '#2B7FE0',
  },
  {
    name: 'Rafael Mendes',
    pet: 'Luna, Gata Siamesa',
    text: 'Nunca pensei que conseguiria levar minha gata num petshop sem ela entrar em pânico. O jeito calmo da equipe fez toda a diferença. Recomendo demais!',
    stars: 5,
    initials: 'RM',
    color: '#2B7FE0',
  },
  {
    name: 'Ana Paula Souza',
    pet: 'Bidu, Poodle',
    text: 'Agendamento fácil, pontualidade e resultado impecável. O Bidu saiu parecendo um pet de exposição! Já agendei o próximo antes de sair.',
    stars: 5,
    initials: 'AS',
    color: '#2B7FE0',
  },
]

function Stars({ count, inView, delay }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          className="text-[#FF9F43] text-base"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            duration: 0.3,
            delay: delay + i * 0.06,
            type: 'spring',
            stiffness: 400,
          }}
        >
          ★
        </motion.span>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.1, once: true })

  return (
    <section id="depoimentos" ref={ref} className="py-24 px-6 bg-[#F0F5FC]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className="font-dm text-xs text-[#2B7FE0] uppercase tracking-widest mb-3 block">Depoimentos</span>
          <h2 className="font-sora font-extrabold text-3xl md:text-5xl text-[#0D1B2A]">
            Quem ama,<br />
            <span className="text-[#2B7FE0]">recomenda.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="relative p-7 rounded-2xl bg-white border border-[#D8E6F7] flex flex-col gap-4 overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + i * 0.1,
                type: 'spring',
                stiffness: 280,
                damping: 28,
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: `0 16px 48px rgba(43,127,224,0.08)`,
              }}
            >
              <div
                className="absolute top-0 left-0 w-full h-1 rounded-t-2xl"
                style={{ background: 'linear-gradient(90deg, #2B7FE0, transparent)' }}
              />

              <Stars count={t.stars} inView={inView} delay={0.4 + i * 0.1} />

              <p className="font-inter text-sm text-[#5A7A9A] leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-2 border-t border-[#D8E6F7]">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-sora font-bold text-sm text-white shrink-0"
                  style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}88)` }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-dm font-medium text-sm text-[#0D1B2A]">{t.name}</p>
                  <p className="font-inter text-xs text-[#5A7A9A]">{t.pet}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
