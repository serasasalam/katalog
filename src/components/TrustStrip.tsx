import { MessageCircleHeart, PackageCheck, Sparkles } from 'lucide-react';

const TRUST_ITEMS = [
  {
    icon: Sparkles,
    title: 'Revisi Tata Letak Fleksibel',
    description:
      'Penyesuaian teks, silsilah keluarga, dan denah lokasi sebelum naik cetak.',
  },
  {
    icon: PackageCheck,
    title: 'Kualitas Kertas & Kemas Rapi',
    description:
      'Cetakan tajam pada kertas pilihan, lengkap dengan plastik & label nama.',
  },
  {
    icon: MessageCircleHeart,
    title: 'Konsultasi Sampel & Desain',
    description:
      'Tim admin responsif membantu pemilihan blangko dan desain via WhatsApp.',
  },
];

export default function TrustStrip() {
  return (
    <section
      aria-label="Keunggulan Serasa Salam Undangan"
      className="bg-white border-b border-[#E6E0D4]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-10">
          {TRUST_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-start gap-3">
                <div className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-[#FAF8F4] border border-[#E6E0D4] text-[#7D622E]">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.8} />
                </div>
                <div>
                  <h2 className="text-xs sm:text-sm font-semibold text-[#1E1A14]">
                    {item.title}
                  </h2>
                  <p className="mt-0.5 text-xs text-[#635B4E] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
