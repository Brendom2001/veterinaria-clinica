import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M8 10 Q16 6 24 10 L22 22 Q16 26 10 22 Z" fill="#4CAF7D" opacity="0.2"/>
        <path d="M12 14 Q16 12 20 14" stroke="#4CAF7D" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <circle cx="13" cy="12" r="1.5" fill="#4CAF7D" opacity="0.6"/>
        <circle cx="19" cy="12" r="1.5" fill="#4CAF7D" opacity="0.6"/>
        <path d="M10 8 Q10 4 14 5" stroke="#6FCFA0" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M22 8 Q22 4 18 5" stroke="#6FCFA0" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M7 20 Q5 18 6 15" stroke="#F5C842" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <circle cx="6" cy="21" r="2" fill="#F5C842" opacity="0.5"/>
      </svg>
    ),
    title: 'Banho & Tosa Premium',
    desc: 'Técnicas premium com produtos naturais, finalizações personalizadas e cuidado total com a pelagem do seu pet.',
    color: '#4CAF7D',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="6" y="6" width="20" height="20" rx="4" fill="#F5C842" opacity="0.12"/>
        <path d="M16 10 v4 M14 12 h4" stroke="#F5C842" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="16" cy="20" r="3" stroke="#F5C842" strokeWidth="1.5" fill="none"/>
        <path d="M10 16 Q10 24 16 26 Q22 24 22 16" stroke="#F5C842" strokeWidth="1.5" fill="none" opacity="0.5"/>
      </svg>
    ),
    title: 'Consulta Veterinária',
    desc: 'Atendimento médico-veterinário com agendamento online, vacinação, exames e cuidados preventivos.',
    color: '#F5C842',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="7" y="12" width="18" height="14" rx="3" fill="#6FCFA0" opacity="0.12"/>
        <path d="M11 12 L11 9 Q11 7 13 7 L19 7 Q21 7 21 9 L21 12" stroke="#6FCFA0" strokeWidth="1.5" fill="none"/>
        <circle cx="14" cy="19" r="2" fill="#6FCFA0" opacity="0.4"/>
        <circle cx="18" cy="19" r="2" fill="#6FCFA0" opacity="0.4"/>
        <path d="M10 22 h12" stroke="#6FCFA0" strokeWidth="1" strokeDasharray="2 2" opacity="0.4"/>
      </svg>
    ),
    title: 'Pet Hotel',
    desc: 'Hospedagem segura e aconchegante com monitoramento 24h, alimentação controlada e muito carinho.',
    color: '#6FCFA0',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M8 24 Q8 16 16 14 Q24 16 24 24" stroke="#4CAF7D" strokeWidth="1.5" fill="none"/>
        <circle cx="16" cy="11" r="4" fill="#4CAF7D" opacity="0.15"/>
        <circle cx="16" cy="11" r="2.5" fill="#4CAF7D" opacity="0.4"/>
        <path d="M10 20 L14 18" stroke="#F5C842" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M22 20 L18 18" stroke="#F5C842" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="10" cy="21" r="2" fill="#F5C842" opacity="0.35"/>
        <circle cx="22" cy="21" r="2" fill="#F5C842" opacity="0.35"/>
      </svg>
    ),
    title: 'Adestramento',
    desc: 'Treinamento com métodos positivos, adaptados ao temperamento do pet para convivência harmoniosa.',
    color: '#4CAF7D',
  },
]

function ServiceCard({ service, index, inView }) {
  return (
    <motion.div
      className="group relative p-6 rounded-2xl bg-[#1A2B1F] border border-[#2A3D2F] cursor-pointer overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.2 + index * 0.08,
        ease: [0.76, 0, 0.24, 1],
      }}
      whileHover={{
        scale: 1.03,
        boxShadow: `0 20px 60px rgba(76,175,125,0.15)`,
        borderColor: `${service.color}66`,
      }}
    >
      {/* Background glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${service.color}0d 0%, transparent 70%)`,
        }}
      />

      <motion.div
        className="relative mb-4"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center"
          style={{ background: `${service.color}18`, border: `1px solid ${service.color}30` }}
        >
          {service.icon}
        </div>
      </motion.div>

      <h3 className="font-sora font-bold text-lg text-[#F0F5F1] mb-2 relative">{service.title}</h3>
      <p className="font-inter text-sm text-[#8A9E8F] leading-relaxed relative mb-4">{service.desc}</p>

      <motion.div
        className="relative flex items-center gap-1 font-dm text-sm font-medium"
        style={{ color: service.color }}
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
      >
        Ver mais
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.1, once: true })

  return (
    <section id="serviços" ref={ref} className="py-24 px-6 bg-[#0F1A14]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className="font-dm text-xs text-[#4CAF7D] uppercase tracking-widest mb-3 block">Nossos Serviços</span>
          <h2 className="font-sora font-extrabold text-3xl md:text-5xl text-[#F0F5F1]">
            Cuidado completo,<br />
            <span className="text-[#4CAF7D]">do pelo ao coração.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
