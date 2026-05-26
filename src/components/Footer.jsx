import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-[#0D1B2A] border-t border-white/10 px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2B7FE0] flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8 2 4 5.5 4 10c0 3 1.5 5.5 4 7l4 3 4-3c2.5-1.5 4-4 4-7 0-4.5-4-8-8-8z" fill="white"/>
                <circle cx="9" cy="9" r="1.5" fill="white"/>
                <circle cx="15" cy="9" r="1.5" fill="white"/>
                <path d="M9 14s1 2 3 2 3-2 3-2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <span className="font-sora font-extrabold text-xl text-white block">Atlas <span className="text-[#2B7FE0]">Pet</span></span>
              <span className="font-dm text-xs text-white/50">Premium Petshop · Sapiranga</span>
            </div>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {[
              { label: 'Serviços', href: '#serviços' },
              { label: 'Diferenciais', href: '#diferenciais' },
              { label: 'Depoimentos', href: '#depoimentos' },
              { label: 'Agendar', href: '#cta' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-dm text-sm text-white/70 hover:text-[#2B7FE0] transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#FF9F43] hover:border-[#FF9F43]/40 transition-all duration-200"
              aria-label="Instagram"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a
              href="https://wa.me/5551999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#25D366] hover:border-[#25D366]/40 transition-all duration-200"
              aria-label="WhatsApp"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.138.564 4.14 1.542 5.877L0 24l6.305-1.517A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.368l-.359-.214-3.741.9.937-3.634-.235-.374A9.818 9.818 0 1112 21.818z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-inter text-xs text-white/40">
            © 2024 Atlas Pet. Todos os direitos reservados.
          </p>
          <p className="font-dm text-xs text-white/40">
            Feito com ❤️ para os pets de Sapiranga
          </p>
        </div>
      </div>
    </footer>
  )
}
