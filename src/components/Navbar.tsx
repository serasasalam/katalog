import { useState } from 'react';
import { ArrowUpRight, Heart, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { assetUrl, DIGITAL_INVITATION_URL } from '../data/catalog';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onFocusSearch: () => void;
}

const NAV_LINKS = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Kategori', href: '#kategori' },
  { label: 'Katalog', href: '#katalog' },
  { label: 'Cara Pesan', href: '#cara-pesan' },
  { label: 'Kontak', href: '#kontak' },
];

export default function Navbar({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onFocusSearch,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E6E0D4]">
      <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Logo */}
        <a
          href="#beranda"
          aria-label="Serasa Salam Undangan Lembang"
          className="flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7D622E] rounded-md py-1"
        >
          <img
            src={assetUrl('assets/aistudio/LOGO_COMEBACK_af017ec3.png')}
            alt="Serasa Salam Undangan Lembang"
            className="h-7 sm:h-9 w-auto object-contain"
          />
        </a>

        {/* Zone 2: Clean single-line nav links (desktop lg+) */}
        <nav
          aria-label="Navigasi utama"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#635B4E]"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap shrink-0 py-1 hover:text-[#7D622E] transition-colors duration-150 relative after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#7D622E] hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7D622E] rounded-sm"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Action cluster */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={onFocusSearch}
            aria-label="Cari model undangan"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#1E1A14] hover:bg-[#F5F2EB] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7D622E]"
          >
            <Search className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </button>

          <button
            type="button"
            onClick={onOpenWishlist}
            aria-label={`Favorit (${wishlistCount})`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#1E1A14] hover:bg-[#F5F2EB] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7D622E]"
          >
            <Heart className="h-[18px] w-[18px]" strokeWidth={1.8} />
            {wishlistCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#7D622E] px-1 text-[10px] font-semibold text-white tabular-nums">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Direct Undangan Digital Shortcut (Always visible on Tablet & Desktop) */}
          <a
            href={DIGITAL_INVITATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex h-10 items-center gap-1.5 rounded-full border border-[#7D622E]/45 bg-[#FAF8F4] px-3.5 text-xs sm:text-sm font-semibold text-[#7D622E] hover:bg-[#F4EFE4] hover:border-[#7D622E] active:scale-[0.98] transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7D622E] focus-visible:ring-offset-2"
          >
            <span>Undangan Digital</span>
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
          </a>

          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Keranjang Pesanan (${cartCount})`}
            className="relative flex h-10 items-center gap-1.5 sm:gap-2 rounded-full bg-[#7D622E] px-3 sm:px-4 text-xs sm:text-sm font-medium text-white hover:bg-[#634C22] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7D622E] focus-visible:ring-offset-2"
          >
            <ShoppingBag className="h-4 w-4 shrink-0" strokeWidth={1.8} />
            <span className="hidden sm:inline">Pesanan</span>
            <span className="tabular-nums font-semibold">({cartCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu navigasi'}
            aria-expanded={mobileMenuOpen}
            className="flex lg:hidden h-10 w-10 items-center justify-center rounded-full text-[#1E1A14] hover:bg-[#F5F2EB] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7D622E]"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" strokeWidth={1.8} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.8} />
            )}
          </button>
        </div>
      </div>

      {/* Always-accessible Sticky Mobile Quick-Shortcut Strip (< sm) */}
      <div className="sm:hidden border-t border-[#E6E0D4] bg-[#FAF8F4]/95 px-4 py-1.5">
        <a
          href={DIGITAL_INVITATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[36px] items-center justify-between gap-2 text-xs text-[#3F392F] active:opacity-80"
        >
          <span className="truncate font-medium">
            Butuh <strong className="font-semibold text-[#1E1A14]">Undangan Digital</strong> (Website)?
          </span>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#7D622E] px-3 py-1 text-[11px] font-semibold text-white whitespace-nowrap">
            <span>Buka Katalog</span>
            <ArrowUpRight className="h-3 w-3 shrink-0" />
          </span>
        </a>
      </div>

      {/* Mobile & Tablet navigation drawer (< lg) */}
      {mobileMenuOpen && (
        <nav
          aria-label="Navigasi seluler dan tablet"
          className="lg:hidden border-t border-[#E6E0D4] bg-white px-4 py-3"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium text-[#1E1A14] hover:bg-[#F5F2EB] hover:text-[#7D622E] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href={DIGITAL_INVITATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-1 flex min-h-[44px] items-center justify-between rounded-xl border border-[#7D622E]/35 bg-[#FAF8F4] px-3 text-sm font-semibold text-[#7D622E] hover:bg-[#F4EFE4] transition-colors"
            >
              <span>Katalog Undangan Digital</span>
              <ArrowUpRight className="h-4 w-4 shrink-0" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
