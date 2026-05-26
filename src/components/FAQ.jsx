import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'Como faço para agendar um serviço?',
    a: 'Pelo nosso WhatsApp! É o jeito mais rápido — mande uma mensagem a qualquer hora, escolha o serviço e o horário. Em geral respondemos em minutos durante o horário de funcionamento.',
  },
  {
    q: 'Quais raças e portes vocês atendem?',
    a: 'Atendemos todos os portes — de Yorkshire a São Bernardo. Para raças gigantes, recomendamos agendamento prévio de pelo menos 48h para garantir o espaço adequado.',
  },
  {
    q: 'Meu pet precisa estar vacinado para utilizar os serviços?',
    a: 'Sim. Para banho/tosa e Pet Hotel exigimos vacinas em dia (V8 ou V10 e antirrábica). Isso protege seu pet e todos os outros que frequentam o espaço.',
  },
  {
    q: 'O Pet Hotel tem monitoramento noturno?',
    a: 'Sim. Nosso hotel tem câmeras 24h e um responsável sempre disponível. Enviamos fotos e updates pelo WhatsApp para que você acompanhe de onde estiver.',
  },
  {
    q: 'Usam produtos naturais em todos os serviços?',
    a: 'Sim — shampoos, condicionadores e produtos de acabamento são formulações naturais sem parabenos nem sulfatos. Para pets com pele sensível ou alergias, peça e adaptamos.',
  },
  {
    q: 'Qual o horário de funcionamento?',
    a: 'Segunda a sexta das 8h às 19h, sábados das 8h às 17h. Consultas veterinárias têm horários específicos — pergunte pelo WhatsApp para verificar disponibilidade.',
  },
]

function FAQItem({ item, index, inView }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      className="border border-[#D8E6F7] rounded-2xl overflow-hidden bg-white"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: 0.15 + index * 0.07,
        type: 'spring',
        stiffness: 280,
        damping: 28,
      }}
      style={{
        borderColor: open ? 'rgba(43,127,224,0.35)' : undefined,
        transition: 'border-color 0.3s ease',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-dm font-medium text-[15px] text-[#0D1B2A]">{item.q}</span>
        <motion.div
          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
          style={{
            background: open ? '#2B7FE022' : '#D8E6F744',
            border: open ? '1px solid #2B7FE055' : '1px solid #D8E6F7',
          }}
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M2 7h10" stroke={open ? '#2B7FE0' : '#5A7A9A'} strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-6 pb-5">
              <div className="h-px bg-[#D8E6F7] mb-4" />
              <p className="font-inter text-sm text-[#5A7A9A] leading-relaxed">{item.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.1, once: true })

  return (
    <section ref={ref} className="py-24 px-6 bg-[#F0F5FC]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className="font-dm text-xs text-[#2B7FE0] uppercase tracking-widest mb-3 block">Dúvidas frequentes</span>
          <h2 className="font-sora font-extrabold text-3xl md:text-5xl text-[#0D1B2A]">
            Perguntas <span className="text-[#2B7FE0]">frequentes</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-3">
          {faqs.map((item, i) => (
            <FAQItem key={i} item={item} index={i} inView={inView} />
          ))}
        </div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="font-dm text-sm text-[#5A7A9A]">
            Ainda tem dúvidas?{' '}
            <a
              href="https://wa.me/5551999999999"
              className="text-[#FF9F43] hover:text-[#e8892e] underline underline-offset-2 transition-colors"
            >
              Fale com a gente pelo WhatsApp
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
