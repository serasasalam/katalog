import { ArrowRight } from 'lucide-react';
import { CATEGORY_BENTO_DATA } from '../data/catalog';
import { BlankoSeries } from '../types/catalog';

interface CategoryBentoProps {
  onSelectSeries: (series: BlankoSeries) => void;
}

export default function CategoryBento({ onSelectSeries }: CategoryBentoProps) {
  const { populer, modern, eksklusif } = CATEGORY_BENTO_DATA;

  return (
    <section id="kategori" className="bg-white py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <h2 className="text-base sm:text-lg font-semibold text-[#1E1A14]">
            Pilih Kategori Seri
          </h2>
          <span className="text-[11px] font-medium text-[#635B4E]">
            Geser untuk lihat semua →
          </span>
        </div>

        {/* Mobile/Tablet: Horizontal swipe cards; Desktop: Asymmetric Bento Grid */}
        <div className="flex lg:grid lg:grid-cols-12 gap-4 lg:gap-6 items-stretch overflow-x-auto lg:overflow-visible no-scrollbar snap-x snap-mandatory -mx-4 px-4 lg:mx-0 lg:px-0 pb-1 lg:pb-0">
          {/* Left Tall Card: Seri Ekonomis & Populer */}
          <div className="min-w-[84%] sm:min-w-[62%] lg:min-w-0 snap-start lg:col-span-6 rounded-2xl bg-[#FAF8F4] border border-[#E6E0D4] p-5 sm:p-7 lg:p-8 flex flex-col justify-between shrink-0 lg:shrink">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 items-center h-full">
              <div className="sm:col-span-6 flex flex-col justify-between h-full space-y-3.5 sm:space-y-5">
                <div>
                  <p className="text-xs font-semibold text-[#7D622E] tabular-nums">
                    {populer.countLabel}
                  </p>
                  <h2 className="mt-1 text-lg sm:text-2xl lg:text-3xl font-semibold tracking-tight text-[#1E1A14]">
                    {populer.title}
                  </h2>
                  <p className="mt-1.5 sm:mt-2.5 text-xs sm:text-sm text-[#635B4E] leading-relaxed line-clamp-2 sm:line-clamp-none">
                    {populer.description}
                  </p>
                </div>

                <ul className="space-y-1 sm:space-y-1.5">
                  {populer.subItems.map((sub) => (
                    <li key={sub.label}>
                      <button
                        type="button"
                        onClick={() => onSelectSeries(sub.series)}
                        className="group inline-flex min-h-[34px] sm:min-h-[32px] items-center gap-1.5 text-xs sm:text-sm font-medium text-[#3F392F] hover:text-[#7D622E] transition-colors cursor-pointer"
                      >
                        <span>{sub.label}</span>
                        <ArrowRight className="h-3.5 w-3.5 opacity-60 lg:opacity-0 lg:-translate-x-1 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 transition-all" />
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="hidden sm:block">
                  <button
                    type="button"
                    onClick={() => onSelectSeries('CANTIK')}
                    className="inline-flex min-h-[40px] items-center gap-2 text-xs sm:text-sm font-semibold text-[#7D622E] hover:underline underline-offset-4 cursor-pointer"
                  >
                    <span>Lihat Seri Populer</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="sm:col-span-6 hidden sm:block">
                <div className="aspect-[4/3] sm:aspect-[3/4] w-full overflow-hidden rounded-xl bg-white border border-[#E6E0D4]">
                  <img
                    src={populer.image}
                    alt={populer.imageAlt}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 2 Stacked Cards on Desktop, Individual Snap Cards on Mobile */}
          <div className="contents lg:flex lg:col-span-6 lg:flex-col lg:gap-6">
            {/* Top Right: Seri HEPI & GS */}
            <div className="min-w-[84%] sm:min-w-[62%] lg:min-w-0 snap-start lg:flex-1 rounded-2xl bg-[#FAF8F4] border border-[#E6E0D4] p-5 sm:p-7 shrink-0 lg:shrink">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-5 items-center h-full">
                <div className="sm:col-span-6 space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-[#7D622E] tabular-nums">
                      {modern.countLabel}
                    </p>
                    <h2 className="mt-1 text-lg sm:text-2xl font-semibold tracking-tight text-[#1E1A14]">
                      {modern.title}
                    </h2>
                    <p className="mt-1.5 text-xs text-[#635B4E] leading-relaxed line-clamp-2 sm:line-clamp-none">
                      {modern.description}
                    </p>
                  </div>

                  <ul className="space-y-1">
                    {modern.subItems.map((sub) => (
                      <li key={sub.label}>
                        <button
                          type="button"
                          onClick={() => onSelectSeries(sub.series)}
                          className="group inline-flex min-h-[34px] sm:min-h-[30px] items-center gap-1.5 text-xs sm:text-sm font-medium text-[#3F392F] hover:text-[#7D622E] transition-colors cursor-pointer"
                        >
                          <span>{sub.label}</span>
                          <ArrowRight className="h-3.5 w-3.5 opacity-60 lg:opacity-0 lg:-translate-x-1 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 transition-all" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="sm:col-span-6 hidden sm:block">
                  <button
                    type="button"
                    onClick={() => onSelectSeries('HEPI')}
                    aria-label="Lihat seri HEPI dan GS"
                    className="block aspect-[4/3] w-full overflow-hidden rounded-xl bg-white border border-[#E6E0D4] cursor-pointer group"
                  >
                    <img
                      src={modern.image}
                      alt={modern.imageAlt}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Right: Seri GS & RAYYA */}
            <div className="min-w-[84%] sm:min-w-[62%] lg:min-w-0 snap-start lg:flex-1 rounded-2xl bg-[#FAF8F4] border border-[#E6E0D4] p-5 sm:p-7 shrink-0 lg:shrink">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-5 items-center h-full">
                <div className="sm:col-span-6 space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-[#7D622E] tabular-nums">
                      {eksklusif.countLabel}
                    </p>
                    <h2 className="mt-1 text-lg sm:text-2xl font-semibold tracking-tight text-[#1E1A14]">
                      {eksklusif.title}
                    </h2>
                    <p className="mt-1.5 text-xs text-[#635B4E] leading-relaxed line-clamp-2 sm:line-clamp-none">
                      {eksklusif.description}
                    </p>
                  </div>

                  <ul className="space-y-1">
                    {eksklusif.subItems.map((sub) => (
                      <li key={sub.label}>
                        <button
                          type="button"
                          onClick={() => onSelectSeries(sub.series)}
                          className="group inline-flex min-h-[34px] sm:min-h-[30px] items-center gap-1.5 text-xs sm:text-sm font-medium text-[#3F392F] hover:text-[#7D622E] transition-colors cursor-pointer"
                        >
                          <span>{sub.label}</span>
                          <ArrowRight className="h-3.5 w-3.5 opacity-60 lg:opacity-0 lg:-translate-x-1 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 transition-all" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="sm:col-span-6 hidden sm:block">
                  <button
                    type="button"
                    onClick={() => onSelectSeries('GS')}
                    aria-label="Lihat seri GS dan RAYYA"
                    className="block aspect-[4/3] w-full overflow-hidden rounded-xl bg-white border border-[#E6E0D4] cursor-pointer group"
                  >
                    <img
                      src={eksklusif.image}
                      alt={eksklusif.imageAlt}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
