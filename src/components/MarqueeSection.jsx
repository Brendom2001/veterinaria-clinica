const tags = [
  'Banho', 'Tosa', 'Veterinário', 'Pet Hotel', 'Adestramento',
  'Nutrição', 'Vacinas', 'Castração', 'Consultas', 'Produtos Naturais',
]

const allTags = [...tags, ...tags]

export default function MarqueeSection() {
  return (
    <div className="py-6 bg-[#F0F5FC] border-y border-[#D8E6F7] overflow-hidden marquee-wrapper">
      <div className="marquee-track">
        {allTags.map((tag, i) => (
          <span key={i} className="flex items-center gap-4 mx-4 shrink-0">
            <span className="font-dm font-medium text-sm text-[#5A7A9A] uppercase tracking-widest whitespace-nowrap hover:text-[#2B7FE0] transition-colors duration-200">
              {tag}
            </span>
            <span className="text-[#2B7FE0] text-lg">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
