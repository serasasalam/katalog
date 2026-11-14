import { useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Star } from 'lucide-react';
import { HERO_SHOWCASE_SLIDES } from '../data/catalog';
import { BlankoSeries } from '../types/catalog';

interface HeroSectionProps {
  onSelectSeries: (series: BlankoSeries) => void;
  onScrollToCatalog: () => void;
}

const CLIENT_MONOGRAMS = [
  { initials: 'N&R', bg: 'bg-[#7D622E] text-white' },
  { initials: 'A&D', bg: 'bg-[#EDE6D6] text-[#634C22]' },
  { initials: 'S&B', bg: 'bg-[#E5DEC9] text-[#1E1A14]' },
  { initials: 'K&M', bg: 'bg-[#9A7B3E] text-white' },
];

export default function HeroSection({
  onSelectSeries,
  onScrollToCatalog,
}: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef({
    active: false,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
  });

  const totalSlides = HERO_SHOWCASE_SLIDES.length;

  const scrollToSlide = (targetIndex: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clampedIndex = ((targetIndex % totalSlides) + totalSlides) % totalSlides;
    const card = track.children[clampedIndex] as HTMLElement | undefined;
    if (card) {
      track.scrollTo({
        left: card.offsetLeft,
        behavior: 'smooth',
      });
    }
    setActiveIndex(clampedIndex);
  };

  const handlePrev = () => {
    scrollToSlide(activeIndex - 1);
  };

  const handleNext = () => {
    scrollToSlide(activeIndex + 1);
  };

  const handleTrackScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    let nearestIdx = 0;
    let minDiff = Infinity;
    cards.forEach((card, idx) => {
      const diff = Math.abs(card.offsetLeft - track.scrollLeft);
      if (diff < minDiff) {
        minDiff = diff;
        nearestIdx = idx;
      }
    });
    setActiveIndex(nearestIdx);
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;
    dragStateRef.current = {
      active: true,
      startX: e.clientX,
      startScrollLeft: track.scrollLeft,
      moved: false,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const drag = dragStateRef.current;
    const track = trackRef.current;
    if (!drag.active || !track) return;
    const delta = e.clientX - drag.startX;
    if (Math.abs(delta) > 6) {
      drag.moved = true;
    }
    track.scrollLeft = drag.startScrollLeft - delta;
  };

  const handlePointerEnd = () => {
    if (!dragStateRef.current.active) return;
    dragStateRef.current.active = false;
    setIsDragging(false);
    setTimeout(() => {
      dragStateRef.current.moved = false;
    }, 50);
  };

  return (
    <section
      id="beranda"
      className="bg-[#FAF8F4] border-b border-[#E6E0D4]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-7 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & CTA */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <p className="text-xs sm:text-sm font-medium text-[#635B4E] tracking-wide">
              Katalog Resmi Undangan Blangko · Serasa Salam Lembang
            </p>

            <h1 className="text-[1.75rem] sm:text-4xl lg:text-[2.85rem] font-semibold tracking-tight text-[#1E1A14] leading-[1.16] text-balance max-w-xl">
              Temukan Koleksi{' '}
              <span className="text-[#7D622E]">Undangan Blangko</span>{' '}
              Minimalis &amp; Terjangkau
            </h1>

            <p className="text-sm sm:text-base text-[#635B4E] leading-relaxed max-w-lg">
              Pilihan 68 model undangan blangko siap cetak dari seri BU &amp; U,
              AVIS, CANTIK, HC, HEPI, RAYYA, hingga GS. Harga transparan mulai
              Rp 1.000 per lembar sudah termasuk cetak teks.
            </p>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              <button
                type="button"
                onClick={onScrollToCatalog}
                className="flex-1 sm:flex-none inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-[#7D622E] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#634C22] active:scale-[0.99] transition-all cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7D622E] focus-visible:ring-offset-2"
              >
                <span>Jelajahi Katalog</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href="#kategori"
                className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[#E6E0D4] sm:border-transparent bg-white sm:bg-transparent px-4 sm:px-2 text-sm font-medium text-[#1E1A14] sm:underline sm:underline-offset-4 sm:decoration-[#1E1A14]/30 hover:border-[#7D622E]/40 hover:text-[#7D622E] transition-colors whitespace-nowrap shrink-0"
              >
                Lihat Seri
              </a>
            </div>

            {/* Social Proof Row */}
            <div className="flex items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
              <div className="flex -space-x-2.5 shrink-0">
                {CLIENT_MONOGRAMS.map((client) => (
                  <div
                    key={client.initials}
                    aria-hidden="true"
                    className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border-2 border-[#FAF8F4] text-[10px] font-semibold tracking-tight ${client.bg}`}
                  >
                    {client.initials}
                  </div>
                ))}
              </div>
              <div className="text-xs sm:text-sm min-w-0">
                <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 font-semibold text-[#1E1A14] tabular-nums">
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-[#C89D42] text-[#C89D42]" />
                    <span>4.9 Rating</span>
                  </span>
                  <span aria-hidden="true" className="text-[#9E9587]">
                    ·
                  </span>
                  <span className="font-medium text-[#635B4E]">
                    1.200+ Pasangan Terbantu
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-[#635B4E] mt-0.5">
                  Minimal 100 pcs · Gratis revisi desain
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Swipeable & Slideable Showcase Carousel */}
          <div className="lg:col-span-6 min-w-0">
            <div
              ref={trackRef}
              onScroll={handleTrackScroll}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerEnd}
              onPointerCancel={handlePointerEnd}
              onPointerLeave={handlePointerEnd}
              className={`flex gap-3.5 sm:gap-4 overflow-x-auto no-scrollbar pb-1 select-none ${
                isDragging
                  ? 'cursor-grabbing'
                  : 'cursor-grab snap-x snap-mandatory scroll-smooth'
              }`}
            >
              {HERO_SHOWCASE_SLIDES.map((slide, idx) => (
                <article
                  key={slide.id}
                  onClick={() => {
                    if (dragStateRef.current.moved) return;
                    onSelectSeries(slide.series);
                  }}
                  className="group w-[86%] sm:w-[calc(50%-0.5rem)] shrink-0 snap-start rounded-2xl bg-white p-2.5 sm:p-3 border border-[#E6E0D4] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#F5F2EB]">
                    <img
                      src={slide.image}
                      alt={slide.imageAlt}
                      loading={idx < 2 ? 'eager' : 'lazy'}
                      decoding="async"
                      fetchPriority={idx === 0 ? 'high' : 'auto'}
                      draggable={false}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-2.5 sm:mt-3 flex items-center justify-between gap-2 px-1 pb-0.5 sm:pb-1">
                    <div className="min-w-0">
                      <h2 className="text-sm sm:text-base font-semibold text-[#1E1A14] truncate">
                        {slide.title}
                      </h2>
                      <p className="text-xs text-[#635B4E] tabular-nums">
                        {slide.countLabel}
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#7D622E] text-white transition-transform duration-200 group-hover:scale-105"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </article>
              ))}
            </div>

            {/* Carousel Controls */}
            <div className="mt-3.5 sm:mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Seri sebelumnya"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7D622E] text-white hover:bg-[#634C22] active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7D622E] focus-visible:ring-offset-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Seri berikutnya"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C89D42] text-[#1E1A14] hover:bg-[#B88D35] active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7D622E] focus-visible:ring-offset-2"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                {HERO_SHOWCASE_SLIDES.map((s, idx) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => scrollToSlide(idx)}
                    aria-label={`Lihat ${s.title}`}
                    aria-current={idx === activeIndex ? 'true' : 'false'}
                    className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                      idx === activeIndex
                        ? 'w-6 bg-[#7D622E]'
                        : 'w-2 bg-[#D6CFC1] hover:bg-[#B8AE9B]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
