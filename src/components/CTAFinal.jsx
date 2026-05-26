import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import MagneticButton from './MagneticButton'

export default function CTAFinal() {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.2, once: true })

  return (
    <section id="cta" ref={ref} className="relative py-32 px-6 overflow-hidden bg-[#FAFCFF]">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(43,127,224,0.08) 0%, rgba(250,252,255,0) 70%)',
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(43,127,224,0.06) 0%, transparent 60%)',
        }}
      />

      {/* Decorative rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full border border-[#2B7FE0]/5 absolute" />
        <div className="w-[400px] h-[400px] rounded-full border border-[#2B7FE0]/8 absolute" />
        <div className="w-[200px] h-[200px] rounded-full border border-[#2B7FE0]/12 absolute" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className="font-dm text-xs text-[#2B7FE0] uppercase tracking-widest mb-4 block">Pronto para começar?</span>
        </motion.div>

        <motion.h2
          className="font-sora font-extrabold text-4xl md:text-6xl text-[#0D1B2A] mb-6 leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
        >
          Seu pet merece<br />
          <span className="text-[#2B7FE0]">o melhor.</span>
        </motion.h2>

        <motion.p
          className="font-inter text-base text-[#5A7A9A] mb-10 max-w-md mx-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
        >
          Agende agora pelo WhatsApp e garanta o horário do seu pet com a nossa equipe especializada.
        </motion.p>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
        >
          <MagneticButton
            href="https://wa.me/5551999999999?text=Olá!%20Gostaria%20de%20agendar%20um%20serviço%20para%20meu%20pet."
            className="group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#25D366] text-white font-sora font-bold text-lg hover:bg-[#20bd5a] transition-colors duration-300 shadow-[0_0_48px_rgba(37,211,102,0.20)] hover:shadow-[0_0_64px_rgba(37,211,102,0.35)]"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.138.564 4.14 1.542 5.877L0 24l6.305-1.517A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.368l-.359-.214-3.741.9.937-3.634-.235-.374A9.818 9.818 0 1112 21.818z"/>
            </svg>
            Agendar agora no WhatsApp
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}
