import { useState } from 'react';
import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react';

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
            src="/assets/aistudio/LOGO_COMEBACK_af017ec3.png"
            alt="Serasa Salam Undangan Lembang"
            className="h-7 sm:h-9 w-auto object-contain"
          />
        </a>

        {/* Zone 2: Clean single-line nav links (desktop) */}
        <nav
          aria-label="Navigasi utama"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#635B4E]"
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
            className="flex h-11 w-11 sm:h-10 sm:w-10 items-center justify-center rounded-full text-[#1E1A14] hover:bg-[#F5F2EB] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7D622E]"
          >
            <Search className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </button>

          <button
            type="button"
            onClick={onOpenWishlist}
            aria-label={`Favorit (${wishlistCount})`}
            className="relative flex h-11 w-11 sm:h-10 sm:w-10 items-center justify-center rounded-full text-[#1E1A14] hover:bg-[#F5F2EB] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7D622E]"
          >
            <Heart className="h-[18px] w-[18px]" strokeWidth={1.8} />
            {wishlistCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#7D622E] px-1 text-[10px] font-semibold text-white tabular-nums">
                {wishlistCount}
              </span>
            )}
          </button>

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
            className="flex md:hidden h-11 w-11 items-center justify-center rounded-full text-[#1E1A14] hover:bg-[#F5F2EB] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7D622E]"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" strokeWidth={1.8} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.8} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {mobileMenuOpen && (
        <nav
          aria-label="Navigasi seluler"
          className="md:hidden border-t border-[#E6E0D4] bg-white px-4 py-3"
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
          </div>
        </nav>
      )}
    </header>
  );
}
