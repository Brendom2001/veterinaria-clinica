const tags = [
  'Banho', 'Tosa', 'Veterinário', 'Pet Hotel', 'Adestramento',
  'Nutrição', 'Vacinas', 'Castração', 'Consultas', 'Produtos Naturais',
]

const allTags = [...tags, ...tags]

export default function MarqueeSection() {
  return (
    <div className="py-6 bg-[#132018] border-y border-[#2A3D2F] overflow-hidden marquee-wrapper">
      <div className="marquee-track">
        {allTags.map((tag, i) => (
          <span key={i} className="flex items-center gap-4 mx-4 shrink-0">
            <span className="font-dm font-medium text-sm text-[#8A9E8F] uppercase tracking-widest whitespace-nowrap">
              {tag}
            </span>
            <span className="text-[#4CAF7D] text-lg">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
