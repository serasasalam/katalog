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
        <div className="mb-4 flex items-center justify-between sm:hidden">
          <h2 className="text-base font-semibold text-[#1E1A14]">
            Pilih Kategori Seri
          </h2>
          <span className="text-[11px] font-medium text-[#635B4E]">
            Geser →
          </span>
        </div>

        {/* Mobile: Horizontal swipe cards; Tablet: 2-col grid; Desktop: Asymmetric Bento Grid */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-12 gap-3.5 sm:gap-5 lg:gap-6 items-stretch overflow-x-auto sm:overflow-visible no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 sm:pb-0">
          {/* Card 1: Seri Ekonomis & Populer */}
          <div className="w-[84vw] max-w-[340px] sm:w-auto sm:max-w-none sm:col-span-2 lg:col-span-6 shrink-0 snap-start rounded-2xl bg-[#FAF8F4] border border-[#E6E0D4] p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 items-center">
              <div className="sm:col-span-5 order-first sm:order-last">
                <button
                  type="button"
                  onClick={() => onSelectSeries('AVIS')}
                  aria-label="Lihat seri ekonomis dan populer"
                  className="block aspect-square w-full max-w-[220px] sm:max-w-none mx-auto overflow-hidden rounded-xl bg-white border border-[#E6E0D4] cursor-pointer group"
                >
                  <img
                    src={populer.image}
                    alt={populer.imageAlt}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </button>
              </div>

              <div className="sm:col-span-7 flex flex-col space-y-3 sm:space-y-4 min-w-0">
                <div>
                  <p className="text-xs font-semibold text-[#7D622E] tabular-nums">
                    {populer.countLabel}
                  </p>
                  <h2 className="mt-1 text-lg sm:text-2xl lg:text-3xl font-semibold tracking-tight text-[#1E1A14]">
                    {populer.title}
                  </h2>
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-[#635B4E] leading-relaxed">
                    {populer.description}
                  </p>
                </div>

                <ul className="space-y-1">
                  {populer.subItems.map((sub) => (
                    <li key={sub.label}>
                      <button
                        type="button"
                        onClick={() => onSelectSeries(sub.series)}
                        className="group inline-flex min-h-[36px] sm:min-h-[32px] items-center gap-1.5 text-xs sm:text-sm font-medium text-[#3F392F] hover:text-[#7D622E] transition-colors cursor-pointer text-left"
                      >
                        <span>{sub.label}</span>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-60 lg:opacity-0 lg:-translate-x-1 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 transition-all" />
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="pt-0.5">
                  <button
                    type="button"
                    onClick={() => onSelectSeries('CANTIK')}
                    className="inline-flex min-h-[38px] items-center gap-2 text-xs sm:text-sm font-semibold text-[#7D622E] hover:underline underline-offset-4 cursor-pointer"
                  >
                    <span>Lihat Seri Populer</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 2 Cards (Swipeable on mobile, 2 side-by-side on tablet, stacked on desktop) */}
          <div className="contents lg:flex lg:col-span-6 lg:flex-col lg:gap-6">
            {/* Card 2: Seri HEPI Modern */}
            <div className="w-[84vw] max-w-[340px] sm:w-auto sm:max-w-none shrink-0 snap-start lg:flex-1 rounded-2xl bg-[#FAF8F4] border border-[#E6E0D4] p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-center h-full">
                <div className="lg:col-span-5 order-first lg:order-last">
                  <button
                    type="button"
                    onClick={() => onSelectSeries('HEPI')}
                    aria-label="Lihat seri HEPI modern"
                    className="block aspect-square w-full max-w-[220px] sm:max-w-[200px] lg:max-w-none mx-auto overflow-hidden rounded-xl bg-white border border-[#E6E0D4] cursor-pointer group"
                  >
                    <img
                      src={modern.image}
                      alt={modern.imageAlt}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </button>
                </div>

                <div className="lg:col-span-7 space-y-2.5 sm:space-y-3 min-w-0">
                  <div>
                    <p className="text-xs font-semibold text-[#7D622E] tabular-nums">
                      {modern.countLabel}
                    </p>
                    <h2 className="mt-1 text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight text-[#1E1A14]">
                      {modern.title}
                    </h2>
                    <p className="mt-1.5 text-xs text-[#635B4E] leading-relaxed">
                      {modern.description}
                    </p>
                  </div>

                  <ul className="space-y-1">
                    {modern.subItems.map((sub) => (
                      <li key={sub.label}>
                        <button
                          type="button"
                          onClick={() => onSelectSeries(sub.series)}
                          className="group inline-flex min-h-[36px] sm:min-h-[30px] items-center gap-1.5 text-xs sm:text-sm font-medium text-[#3F392F] hover:text-[#7D622E] transition-colors cursor-pointer text-left"
                        >
                          <span>{sub.label}</span>
                          <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-60 lg:opacity-0 lg:-translate-x-1 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 transition-all" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 3: Seri GS & RAYYA */}
            <div className="w-[84vw] max-w-[340px] sm:w-auto sm:max-w-none shrink-0 snap-start lg:flex-1 rounded-2xl bg-[#FAF8F4] border border-[#E6E0D4] p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-center h-full">
                <div className="lg:col-span-5 order-first lg:order-last">
                  <button
                    type="button"
                    onClick={() => onSelectSeries('GS')}
                    aria-label="Lihat seri GS dan RAYYA"
                    className="block aspect-square w-full max-w-[220px] sm:max-w-[200px] lg:max-w-none mx-auto overflow-hidden rounded-xl bg-white border border-[#E6E0D4] cursor-pointer group"
                  >
                    <img
                      src={eksklusif.image}
                      alt={eksklusif.imageAlt}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </button>
                </div>

                <div className="lg:col-span-7 space-y-2.5 sm:space-y-3 min-w-0">
                  <div>
                    <p className="text-xs font-semibold text-[#7D622E] tabular-nums">
                      {eksklusif.countLabel}
                    </p>
                    <h2 className="mt-1 text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight text-[#1E1A14]">
                      {eksklusif.title}
                    </h2>
                    <p className="mt-1.5 text-xs text-[#635B4E] leading-relaxed">
                      {eksklusif.description}
                    </p>
                  </div>

                  <ul className="space-y-1">
                    {eksklusif.subItems.map((sub) => (
                      <li key={sub.label}>
                        <button
                          type="button"
                          onClick={() => onSelectSeries(sub.series)}
                          className="group inline-flex min-h-[36px] sm:min-h-[30px] items-center gap-1.5 text-xs sm:text-sm font-medium text-[#3F392F] hover:text-[#7D622E] transition-colors cursor-pointer text-left"
                        >
                          <span>{sub.label}</span>
                          <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-60 lg:opacity-0 lg:-translate-x-1 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 transition-all" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
