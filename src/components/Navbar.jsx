import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate } from 'framer-motion'

export default function Navbar() {
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1])
  const bg = useMotionTemplate`rgba(15,26,20,${bgOpacity})`
  const borderClr = useMotionTemplate`rgba(42,61,47,${bgOpacity})`
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = ['Serviços', 'Diferenciais', 'Depoimentos']

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4"
    >
      <motion.div
        className="absolute inset-0 border-b"
        style={{
          backgroundColor: bg,
          borderColor: borderClr,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      />
      <div className="relative max-w-6xl mx-auto flex items-center justify-between">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="w-8 h-8 rounded-lg bg-[#4CAF7D] flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8 2 4 5.5 4 10c0 3 1.5 5.5 4 7l4 3 4-3c2.5-1.5 4-4 4-7 0-4.5-4-8-8-8z" fill="#0F1A14"/>
              <circle cx="9" cy="9" r="1.5" fill="#0F1A14"/>
              <circle cx="15" cy="9" r="1.5" fill="#0F1A14"/>
              <path d="M9 14s1 2 3 2 3-2 3-2" stroke="#0F1A14" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="font-sora font-extrabold text-lg text-[#F0F5F1] tracking-tight">
            Atlas <span className="text-[#4CAF7D]">Pet</span>
          </span>
        </motion.div>

        <motion.nav
          className="hidden md:flex items-center gap-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
        >
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-dm text-sm text-[#8A9E8F] hover:text-[#F0F5F1] transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </motion.nav>

        <div className="flex items-center gap-3">
          <motion.a
            href="#cta"
            className="font-dm text-sm font-medium bg-[#4CAF7D] text-[#0F1A14] px-5 py-2 rounded-full hover:bg-[#6FCFA0] transition-colors duration-200"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
          >
            Agendar
          </motion.a>

          <button
            className="md:hidden flex flex-col items-center justify-center gap-[5px] w-9 h-9 rounded-lg"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            <motion.span
              className="block w-5 h-0.5 bg-[#F0F5F1] rounded-full"
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-5 h-0.5 bg-[#F0F5F1] rounded-full"
              animate={{ opacity: mobileOpen ? 0 : 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="block w-5 h-0.5 bg-[#F0F5F1] rounded-full"
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden absolute left-0 right-0 top-full border-b border-[#2A3D2F] bg-[#0F1A14]/95 px-6 py-4"
            style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className="font-dm text-sm text-[#8A9E8F] hover:text-[#F0F5F1] transition-colors duration-200 py-2"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
