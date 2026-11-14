import { RefObject, useEffect, useState } from 'react';
import {
  ChevronDown,
  Eye,
  Heart,
  Plus,
  RefreshCw,
  RotateCcw,
  Search,
  X,
} from 'lucide-react';
import { formatRupiah, SERIES_ORDER } from '../data/catalog';
import {
  BlankoSeries,
  CatalogItem,
  PriceTierFilter,
  SortOption,
} from '../types/catalog';

interface CatalogSectionProps {
  items: CatalogItem[];
  totalCatalogCount: number;
  activePriceTier: PriceTierFilter;
  onChangePriceTier: (tier: PriceTierFilter) => void;
  activeSeries: BlankoSeries;
  onChangeSeries: (series: BlankoSeries) => void;
  searchQuery: string;
  onChangeSearch: (query: string) => void;
  sortBy: SortOption;
  onChangeSort: (sort: SortOption) => void;
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  onSelectProduct: (item: CatalogItem) => void;
  onQuickAdd: (item: CatalogItem) => void;
  onResetFilters: () => void;
  onRefreshCatalog: () => void;
  isSyncing: boolean;
  searchInputRef: RefObject<HTMLInputElement | null>;
}

const PRICE_TIER_TABS: PriceTierFilter[] = [
  'Semua Model',
  'Ekonomis (Rp 1.000)',
  'Menengah (Rp 1.001 – Rp 1.500)',
  'Eksklusif (> Rp 1.500)',
];

const SERIES_OPTIONS: BlankoSeries[] = ['Semua', ...SERIES_ORDER];

const PAGE_SIZE = 12;

export default function CatalogSection({
  items,
  totalCatalogCount,
  activePriceTier,
  onChangePriceTier,
  activeSeries,
  onChangeSeries,
  searchQuery,
  onChangeSearch,
  sortBy,
  onChangeSort,
  wishlistIds,
  onToggleWishlist,
  onSelectProduct,
  onQuickAdd,
  onResetFilters,
  onRefreshCatalog,
  isSyncing,
  searchInputRef,
}: CatalogSectionProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activePriceTier, activeSeries, searchQuery, sortBy]);

  const hasActiveFilter =
    activePriceTier !== 'Semua Model' ||
    activeSeries !== 'Semua' ||
    searchQuery.trim().length > 0;

  const isFilteredBySpecificSeries =
    activeSeries !== 'Semua' || searchQuery.trim().length > 0;

  const displayedItems = isFilteredBySpecificSeries
    ? items
    : items.slice(0, visibleCount);

  const hasMore = !isFilteredBySpecificSeries && visibleCount < items.length;

  return (
    <section
      id="katalog"
      className="bg-[#FAF8F4] border-t border-b border-[#E6E0D4] py-10 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm font-medium text-[#635B4E]">
            Katalog Undangan Blangko ({totalCatalogCount} Model)
          </p>
          <h2 className="mt-1 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#1E1A14] text-balance">
            Koleksi Blangko{' '}
            <span className="text-[#7D622E]">Siap Cetak</span>
          </h2>
        </div>

        {/* Centered Price-Tier Tabs */}
        <div
          role="tablist"
          aria-label="Filter rentang harga blangko"
          className="mt-5 sm:mt-7 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-3.5 px-3.5 sm:mx-0 sm:px-0 pb-1"
        >
          {PRICE_TIER_TABS.map((tab) => {
            const isActive = activePriceTier === tab;
            return (
              <button
                key={tab}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => onChangePriceTier(tab)}
                className={`snap-start min-h-[42px] sm:min-h-[40px] rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7D622E] ${
                  isActive
                    ? 'bg-[#7D622E] text-white'
                    : 'bg-white text-[#1E1A14] border border-[#E6E0D4] hover:border-[#7D622E]/45'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Series Filter, Search & Sort Bar */}
        <div className="mt-4 sm:mt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 sm:gap-3 bg-white p-2.5 sm:p-4 rounded-2xl border border-[#E6E0D4]">
          {/* Series Segmented Buttons */}
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar snap-x">
            {SERIES_OPTIONS.map((series) => {
              const active = activeSeries === series;
              return (
                <button
                  key={series}
                  type="button"
                  onClick={() => onChangeSeries(series)}
                  className={`snap-start min-h-[40px] sm:min-h-[38px] rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#F4EFE4] text-[#7D622E] font-semibold'
                      : 'text-[#635B4E] hover:bg-[#FAF8F4] hover:text-[#1E1A14]'
                  }`}
                >
                  {series}
                </button>
              );
            })}
          </div>

          {/* Search + Sort + Sync */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 shrink-0">
            <div className="relative flex-1 sm:w-56">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#635B4E]"
              />
              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => onChangeSearch(e.target.value)}
                placeholder="Cari kode (BU 01, AVIS 128...)"
                aria-label="Cari kode model undangan blangko"
                className="h-11 sm:h-10 w-full rounded-xl sm:rounded-lg border border-[#E6E0D4] bg-[#FAF8F4] pl-9 pr-9 text-base sm:text-sm text-[#1E1A14] placeholder:text-[#8A8172] focus:border-[#7D622E] focus:bg-white focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onChangeSearch('')}
                  aria-label="Hapus pencarian"
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center text-[#635B4E] hover:text-[#1E1A14] cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => onChangeSort(e.target.value as SortOption)}
                aria-label="Urutkan katalog"
                className="h-11 sm:h-10 w-full sm:w-auto rounded-xl sm:rounded-lg border border-[#E6E0D4] bg-[#FAF8F4] px-2.5 sm:px-3 text-xs sm:text-sm text-[#1E1A14] focus:border-[#7D622E] focus:bg-white focus:outline-none cursor-pointer"
              >
                <option value="series-default">Urutkan: Seri</option>
                <option value="price-asc">Harga: Terendah</option>
                <option value="price-desc">Harga: Tertinggi</option>
                <option value="name-asc">Kode: A–Z</option>
              </select>

              <button
                type="button"
                onClick={onRefreshCatalog}
                disabled={isSyncing}
                title="Perbarui harga terbaru dari Google Sheets"
                aria-label="Perbarui harga terbaru dari Google Sheets"
                className="inline-flex h-11 sm:h-10 w-full sm:w-auto items-center justify-center gap-1.5 rounded-xl sm:rounded-lg border border-[#E6E0D4] bg-[#FAF8F4] px-3 text-xs font-medium text-[#1E1A14] hover:border-[#7D622E] hover:bg-white disabled:opacity-60 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <RefreshCw
                  className={`h-3.5 w-3.5 text-[#7D622E] ${
                    isSyncing ? 'animate-spin' : ''
                  }`}
                />
                <span className="sm:hidden">Perbarui</span>
                <span className="hidden sm:inline">Perbarui Harga</span>
              </button>
            </div>
          </div>
        </div>

        {/* Summary & Reset Row */}
        <div className="mt-3.5 sm:mt-4 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-[#635B4E]">
          <p className="tabular-nums">
            Menampilkan{' '}
            <span className="font-semibold text-[#1E1A14]">
              {displayedItems.length}
            </span>{' '}
            dari{' '}
            <span className="font-semibold text-[#1E1A14]">{items.length}</span>{' '}
            model blangko
          </p>
          {hasActiveFilter && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex min-h-[36px] items-center gap-1.5 font-medium text-[#7D622E] hover:underline cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Filter</span>
            </button>
          )}
        </div>

        {/* Product Grid */}
        {displayedItems.length > 0 ? (
          <>
            <div className="mt-4 sm:mt-5 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5">
              {displayedItems.map((item) => {
                const isWishlisted = wishlistIds.includes(item.id);
                const minPackTotal = item.sellingPrice * item.minQty;
                return (
                  <article
                    key={item.id}
                    className="group flex flex-col justify-between rounded-xl sm:rounded-2xl bg-white border border-[#E6E0D4] p-2.5 sm:p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div>
                      {/* Product Image Area */}
                      <div className="relative aspect-square w-full overflow-hidden rounded-lg sm:rounded-xl bg-[#F5F2EB]">
                        <button
                          type="button"
                          onClick={() => onSelectProduct(item)}
                          aria-label={`Lihat detail ${item.model}`}
                          className="block h-full w-full cursor-pointer focus-visible:outline-none"
                        >
                          <img
                            src={item.image}
                            alt={item.imageAlt}
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          />
                        </button>

                        {/* Top-right action icons */}
                        <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 flex flex-col gap-1.5">
                          <button
                            type="button"
                            onClick={() => onToggleWishlist(item.id)}
                            aria-label={
                              isWishlisted
                                ? `Hapus ${item.model} dari favorit`
                                : `Simpan ${item.model} ke favorit`
                            }
                            className={`flex h-9 w-9 items-center justify-center rounded-full border shadow-xs transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7D622E] ${
                              isWishlisted
                                ? 'bg-[#7D622E] border-[#7D622E] text-white'
                                : 'bg-white/95 border-[#E6E0D4] text-[#1E1A14] hover:border-[#7D622E]'
                            }`}
                          >
                            <Heart
                              className={`h-4 w-4 ${
                                isWishlisted ? 'fill-current' : ''
                              }`}
                            />
                          </button>

                          <button
                            type="button"
                            onClick={() => onSelectProduct(item)}
                            aria-label={`Detail model ${item.model}`}
                            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-white/95 border border-[#E6E0D4] text-[#1E1A14] hover:border-[#7D622E] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7D622E]"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Metadata Row (Unboxed text) */}
                      <div className="mt-2.5 sm:mt-3.5 flex items-center justify-between gap-1.5 text-[11px] sm:text-xs text-[#635B4E]">
                        <span className="truncate">{item.seriesLabel}</span>
                        <span className="shrink-0 tabular-nums">
                          Min. {item.minQty}
                          <span className="hidden sm:inline"> pcs</span>
                        </span>
                      </div>

                      {/* Model Title */}
                      <h3 className="mt-0.5 sm:mt-1 text-sm sm:text-base font-semibold text-[#1E1A14] leading-snug truncate">
                        <button
                          type="button"
                          onClick={() => onSelectProduct(item)}
                          className="text-left hover:text-[#7D622E] transition-colors cursor-pointer w-full truncate"
                        >
                          {item.model}
                        </button>
                      </h3>

                      {/* Customer Selling Price ONLY */}
                      <div className="mt-1 sm:mt-1.5 flex items-baseline justify-between gap-2 tabular-nums">
                        <div>
                          <span className="text-sm sm:text-[15px] font-semibold text-[#7D622E]">
                            {formatRupiah(item.sellingPrice)}
                          </span>
                          <span className="text-[11px] text-[#635B4E] ml-0.5 sm:ml-1">
                            /pcs
                          </span>
                        </div>
                        <span className="hidden sm:inline text-[11px] text-[#635B4E]">
                          {formatRupiah(minPackTotal)} / {item.minQty}
                        </span>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="mt-2.5 sm:mt-4 pt-2.5 sm:pt-3 border-t border-[#E6E0D4] flex items-center gap-1.5 sm:gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectProduct(item)}
                        className="flex-1 min-h-[40px] rounded-lg border border-[#E6E0D4] bg-[#FAF8F4] px-2 sm:px-3 py-2 text-xs font-medium text-[#1E1A14] hover:border-[#7D622E]/50 hover:bg-white transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Detail
                      </button>
                      <button
                        type="button"
                        onClick={() => onQuickAdd(item)}
                        className="inline-flex min-h-[40px] items-center justify-center gap-1 sm:gap-1.5 rounded-lg bg-[#7D622E] px-2.5 sm:px-3.5 py-2 text-xs font-medium text-white hover:bg-[#634C22] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>Pesan</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Load More / Show All Controls */}
            {hasMore && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white border border-[#E6E0D4] px-6 py-2.5 text-sm font-medium text-[#1E1A14] hover:border-[#7D622E] hover:text-[#7D622E] transition-colors cursor-pointer"
                >
                  <span>
                    Tampilkan {Math.min(PAGE_SIZE, items.length - visibleCount)}{' '}
                    Model Berikutnya
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setVisibleCount(items.length)}
                  className="inline-flex min-h-[44px] items-center rounded-full px-4 py-2.5 text-sm font-medium text-[#7D622E] hover:underline underline-offset-4 cursor-pointer"
                >
                  Lihat Semua ({items.length})
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="mt-8 rounded-2xl bg-white border border-[#E6E0D4] py-14 px-6 text-center">
            <p className="text-base font-semibold text-[#1E1A14]">
              Kode model blangko tidak ditemukan
            </p>
            <p className="mt-1.5 text-sm text-[#635B4E]">
              Coba ketik kode seri seperti BU, U, AVIS, CANTIK, HC, HEPI, RAYYA,
              atau GS.
            </p>
            <button
              type="button"
              onClick={onResetFilters}
              className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#7D622E] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#634C22] transition-colors cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Tampilkan Semua Model</span>
            </button>
          </div>
        )}
        {/* Callout to Undangan Cetak Custom */}
        <div className="mt-8 sm:mt-10 rounded-2xl bg-white border border-[#E6E0D4] p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-[#7D622E]">
              Varian Undangan Cetak Custom · Mulai Rp 2.500/pcs
            </p>
            <p className="text-sm sm:text-base font-semibold text-[#1E1A14]">
              Ingin desain bebas dari nol, ganti bahan, atau tambah finishing
              khusus?
            </p>
          </div>
          <a
            href="#custom"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[#7D622E]/45 bg-[#FAF8F4] px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#7D622E] hover:bg-[#F4EFE4] hover:border-[#7D622E] transition-colors whitespace-nowrap shrink-0"
          >
            Konsultasi Cetak Custom →
          </a>
        </div>
      </div>
    </section>
  );
}
