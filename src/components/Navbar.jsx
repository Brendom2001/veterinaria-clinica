import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate } from 'framer-motion'

export default function Navbar() {
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1])
  const bg = useMotionTemplate`rgba(250,252,255,${bgOpacity})`
  const borderClr = useMotionTemplate`rgba(216,230,247,${bgOpacity})`
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = ['Serviços', 'Diferenciais', 'Depoimentos']

  return (
    <motion.header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4">
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
          <div className="w-8 h-8 rounded-lg bg-[#2B7FE0] flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8 2 4 5.5 4 10c0 3 1.5 5.5 4 7l4 3 4-3c2.5-1.5 4-4 4-7 0-4.5-4-8-8-8z" fill="white"/>
              <circle cx="9" cy="9" r="1.5" fill="white"/>
              <circle cx="15" cy="9" r="1.5" fill="white"/>
              <path d="M9 14s1 2 3 2 3-2 3-2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="font-sora font-extrabold text-lg text-[#0D1B2A] tracking-tight">
            Atlas <span className="text-[#2B7FE0]">Pet</span>
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
              className="font-dm text-sm text-[#0D1B2A] hover:text-[#2B7FE0] transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </motion.nav>

        <div className="flex items-center gap-3">
          <motion.a
            href="#cta"
            className="font-dm text-sm font-medium bg-[#2B7FE0] text-white px-5 py-2 rounded-full hover:bg-[#1A6BC9] transition-colors duration-200"
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
              className="block w-5 h-0.5 bg-[#0D1B2A] rounded-full"
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-5 h-0.5 bg-[#0D1B2A] rounded-full"
              animate={{ opacity: mobileOpen ? 0 : 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="block w-5 h-0.5 bg-[#0D1B2A] rounded-full"
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden absolute left-0 right-0 top-full border-b border-[#D8E6F7] bg-[#FAFCFF]/95 px-6 py-4"
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
                  className="font-dm text-sm text-[#0D1B2A] hover:text-[#2B7FE0] transition-colors duration-200 py-2"
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
