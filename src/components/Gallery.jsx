import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const photos = [
  {
    label: 'Thor após tosa',
    breed: 'Golden Retriever',
    gradient: 'linear-gradient(135deg, #1e3a2a 0%, #2d5c3a 50%, #4CAF7D22 100%)',
    span: 'row-span-2',
    tag: 'Tosa',
    tagColor: '#4CAF7D',
  },
  {
    label: 'Luna dormindo',
    breed: 'Gata Siamesa',
    gradient: 'linear-gradient(135deg, #2a2010 0%, #4a3820 50%, #F5C84222 100%)',
    span: '',
    tag: 'Hotel',
    tagColor: '#F5C842',
  },
  {
    label: 'Max no banho',
    breed: 'Labrador Preto',
    gradient: 'linear-gradient(135deg, #1a1f2a 0%, #2a3045 50%, #6FCFA022 100%)',
    span: '',
    tag: 'Banho',
    tagColor: '#6FCFA0',
  },
  {
    label: 'Mel após consulta',
    breed: 'Shih-Tzu',
    gradient: 'linear-gradient(135deg, #2a1a28 0%, #3d2040 50%, #c084fc22 100%)',
    span: '',
    tag: 'Veterinário',
    tagColor: '#c084fc',
  },
  {
    label: 'Bob em treino',
    breed: 'Border Collie',
    gradient: 'linear-gradient(135deg, #0f2a1e 0%, #1a4530 50%, #4CAF7D33 100%)',
    span: 'row-span-2',
    tag: 'Adestramento',
    tagColor: '#4CAF7D',
  },
  {
    label: 'Bilu pós-banho',
    breed: 'Poodle Toy',
    gradient: 'linear-gradient(135deg, #2a1510 0%, #4a2820 50%, #fb923c22 100%)',
    span: '',
    tag: 'Banho',
    tagColor: '#fb923c',
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
      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 30%, ${photo.tagColor}22 0%, transparent 60%)`,
        }}
      />

      {/* Pet icon placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={hovered ? { scale: 1.1, opacity: 0.5 } : { scale: 1, opacity: 0.2 }}
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

      {/* Bottom info overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 flex flex-col justify-end p-4"
            style={{
              background: `linear-gradient(to top, ${photo.tagColor}33 0%, transparent 60%)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.p
              className="font-sora font-bold text-sm text-[#F0F5F1]"
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.05 }}
            >
              {photo.label}
            </motion.p>
            <motion.p
              className="font-dm text-xs text-[#F0F5F1]/70"
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.08 }}
            >
              {photo.breed}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tag badge */}
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
    <section ref={ref} className="py-24 px-6 bg-[#0F1A14]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className="font-dm text-xs text-[#4CAF7D] uppercase tracking-widest mb-3 block">Nossos Pets</span>
          <h2 className="font-sora font-extrabold text-3xl md:text-5xl text-[#F0F5F1]">
            Cada pet tem<br />
            <span className="text-[#F5C842]">sua própria história.</span>
          </h2>
          <p className="font-inter text-sm text-[#8A9E8F] mt-4 max-w-md mx-auto">
            Momentos reais de cuidado, carinho e transformação. Veja alguns dos nossos clientes favoritos.
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[160px]">
          {photos.map((photo, i) => (
            <PhotoCard key={i} photo={photo} index={i} inView={inView} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          className="text-center font-dm text-xs text-[#8A9E8F]/50 mt-6"
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
