import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const photos = [
  {
    label: 'Thor após tosa',
    breed: 'Golden Retriever',
    gradient: 'linear-gradient(135deg, #EBF3FF 0%, #C8DFFE 50%, #2B7FE011 100%)',
    span: 'row-span-2',
    tag: 'Tosa',
    tagColor: '#2B7FE0',
  },
  {
    label: 'Luna dormindo',
    breed: 'Gata Siamesa',
    gradient: 'linear-gradient(135deg, #FFF5EB 0%, #FFE0B2 50%, #FF9F4311 100%)',
    span: '',
    tag: 'Hotel',
    tagColor: '#FF9F43',
  },
  {
    label: 'Max no banho',
    breed: 'Labrador Preto',
    gradient: 'linear-gradient(135deg, #EBF3FF 0%, #C8DFFE 50%, #2B7FE011 100%)',
    span: '',
    tag: 'Banho',
    tagColor: '#2B7FE0',
  },
  {
    label: 'Mel após consulta',
    breed: 'Shih-Tzu',
    gradient: 'linear-gradient(135deg, #FFF5EB 0%, #FFE0B2 50%, #FF9F4311 100%)',
    span: '',
    tag: 'Veterinário',
    tagColor: '#FF9F43',
  },
  {
    label: 'Bob em treino',
    breed: 'Border Collie',
    gradient: 'linear-gradient(135deg, #EBF3FF 0%, #CDDFF9 50%, #2B7FE022 100%)',
    span: 'row-span-2',
    tag: 'Adestramento',
    tagColor: '#2B7FE0',
  },
  {
    label: 'Bilu pós-banho',
    breed: 'Poodle Toy',
    gradient: 'linear-gradient(135deg, #FFF5EB 0%, #FFE0B2 50%, #FF9F4322 100%)',
    span: '',
    tag: 'Banho',
    tagColor: '#FF9F43',
  },
]

function PhotoCard({ photo, index, inView }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden cursor-pointer ${photo.span}`}
      style={{ background: photo.gradient, minHeight: photo.span ? '320px' : '160px' }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 0.5,
        delay: 0.15 + index * 0.07,
        type: 'spring',
        stiffness: 280,
        damping: 28,
      }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 30%, ${photo.tagColor}22 0%, transparent 60%)`,
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={hovered ? { scale: 1.1, opacity: 0.4 } : { scale: 1, opacity: 0.18 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="26" r="12" stroke={photo.tagColor} strokeWidth="1.5" fill="none"/>
            <ellipse cx="32" cy="46" rx="18" ry="10" stroke={photo.tagColor} strokeWidth="1.5" fill="none"/>
            <circle cx="27" cy="24" r="2" fill={photo.tagColor} opacity="0.6"/>
            <circle cx="37" cy="24" r="2" fill={photo.tagColor} opacity="0.6"/>
            <path d="M28 30 Q32 33 36 30" stroke={photo.tagColor} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          </svg>
        </motion.div>
      </div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 flex flex-col justify-end p-4"
            style={{ background: 'rgba(43,127,224,0.85)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.p
              className="font-sora font-bold text-sm text-white"
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.05 }}
            >
              {photo.label}
            </motion.p>
            <motion.p
              className="font-dm text-xs text-white/70"
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.08 }}
            >
              {photo.breed}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-dm font-medium uppercase tracking-wide"
        style={{
          background: `${photo.tagColor}22`,
          border: `1px solid ${photo.tagColor}44`,
          color: photo.tagColor,
          backdropFilter: 'blur(4px)',
        }}
      >
        {photo.tag}
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.1, once: true })

  return (
    <section ref={ref} className="py-24 px-6 bg-[#FAFCFF]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className="font-dm text-xs text-[#2B7FE0] uppercase tracking-widest mb-3 block">Nossos Pets</span>
          <h2 className="font-sora font-extrabold text-3xl md:text-5xl text-[#0D1B2A]">
            Cada pet tem<br />
            <span className="text-[#FF9F43]">sua própria história.</span>
          </h2>
          <p className="font-inter text-sm text-[#5A7A9A] mt-4 max-w-md mx-auto">
            Momentos reais de cuidado, carinho e transformação. Veja alguns dos nossos clientes favoritos.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[160px]">
          {photos.map((photo, i) => (
            <PhotoCard key={i} photo={photo} index={i} inView={inView} />
          ))}
        </div>

        <motion.p
          className="text-center font-dm text-xs text-[#5A7A9A]/50 mt-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Fotos ilustrativas — seus pets merecem ainda mais atenção ❤️
        </motion.p>
      </div>
    </section>
  )
}
