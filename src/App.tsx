import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import AboutAndFooter from './components/AboutAndFooter';
import CartDrawer from './components/CartDrawer';
import CatalogSection from './components/CatalogSection';
import CategoryBento from './components/CategoryBento';
import CustomInvitationSection from './components/CustomInvitationSection';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import ProductDetailModal from './components/ProductDetailModal';
import TrustStrip from './components/TrustStrip';
import WishlistDrawer from './components/WishlistDrawer';
import {
  buildCatalogItems,
  CATALOG_ITEMS as FALLBACK_CATALOG_ITEMS,
  fetchPublicSheetCatalog,
  formatRupiah,
  RawBlankoRow,
  SERIES_ORDER,
} from './data/catalog';
import {
  BlankoSeries,
  CartEntry,
  CatalogItem,
  PriceTierFilter,
  SortOption,
} from './types/catalog';

const STORAGE_CART_KEY = 'serasa_salam_cart_v3';
const STORAGE_WISHLIST_KEY = 'serasa_salam_wishlist_v3';

export default function App() {
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>(
    FALLBACK_CATALOG_ITEMS
  );
  const [isSyncing, setIsSyncing] = useState(false);

  const [activePriceTier, setActivePriceTier] =
    useState<PriceTierFilter>('Semua Model');
  const [activeSeries, setActiveSeries] = useState<BlankoSeries>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('series-default');

  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_WISHLIST_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cartEntries, setCartEntries] = useState<CartEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const syncCatalogFromSheet = useCallback(async (forceRefresh = false) => {
    setIsSyncing(true);
    try {
      let rows: RawBlankoRow[] | null = null;
      try {
        const endpoint = forceRefresh
          ? '/api/catalog?refresh=1'
          : '/api/catalog';
        const res = await fetch(endpoint, { cache: 'no-store' });
        const contentType = res.headers.get('content-type') || '';
        if (res.ok && contentType.includes('application/json')) {
          const data: { items?: RawBlankoRow[] } = await res.json();
          if (Array.isArray(data.items) && data.items.length > 0) {
            rows = data.items;
          }
        }
      } catch {
        // Fallback to direct public Google Sheets CSV on static hosts (e.g. GitHub Pages)
      }

      if (!rows) {
        rows = await fetchPublicSheetCatalog();
      }

      if (rows && rows.length > 0) {
        setCatalogItems(buildCatalogItems(rows));
        if (forceRefresh) {
          setToastMessage('Harga katalog diperbarui dari Google Sheets');
        }
      }
    } catch {
      if (forceRefresh) {
        setToastMessage('Menggunakan data katalog terakhir');
      }
    } finally {
      setIsSyncing(false);
    }
  }, []);

  // Auto-sync on initial load and whenever user returns to the browser tab
  useEffect(() => {
    syncCatalogFromSheet(false);

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        syncCatalogFromSheet(false);
      }
    };
    const handleFocus = () => {
      syncCatalogFromSheet(false);
    };

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('focus', handleFocus);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('focus', handleFocus);
    };
  }, [syncCatalogFromSheet]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_WISHLIST_KEY, JSON.stringify(wishlistIds));
    } catch {
      // Ignore storage errors
    }
  }, [wishlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(cartEntries));
    } catch {
      // Ignore storage errors
    }
  }, [cartEntries]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 2400);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('katalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectSeries = (series: BlankoSeries) => {
    setActivePriceTier('Semua Model');
    setActiveSeries(series);
    scrollToCatalog();
  };

  const handleFocusSearch = () => {
    scrollToCatalog();
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 300);
  };

  const handleToggleWishlist = (id: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      showToast(
        exists ? 'Dihapus dari model favorit' : 'Disimpan ke model favorit'
      );
      return next;
    });
  };

  const handleAddToCart = (productId: string, quantity: number) => {
    setCartEntries((prev) => {
      const idx = prev.findIndex((entry) => entry.productId === productId);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          quantity: updated[idx].quantity + quantity,
        };
        return updated;
      }
      return [...prev, { productId, quantity }];
    });
    showToast(`Ditambahkan (${quantity} pcs) ke pesanan`);
  };

  const handleQuickAdd = (item: CatalogItem) => {
    handleAddToCart(item.id, item.minQty);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    const product = catalogItems.find((p) => p.id === productId);
    const minQty = product?.minQty ?? 100;

    setCartEntries((prev) =>
      prev.map((entry) => {
        if (entry.productId === productId) {
          const nextQty = Math.max(minQty, entry.quantity + delta);
          return { ...entry, quantity: nextQty };
        }
        return entry;
      })
    );
  };

  const handleSetQuantity = (productId: string, nextQuantity: number) => {
    const product = catalogItems.find((p) => p.id === productId);
    const minQty = product?.minQty ?? 100;

    setCartEntries((prev) =>
      prev.map((entry) =>
        entry.productId === productId
          ? { ...entry, quantity: Math.max(minQty, Math.round(nextQuantity)) }
          : entry
      )
    );
  };

  const handleRemoveCartEntry = (productId: string) => {
    setCartEntries((prev) =>
      prev.filter((entry) => entry.productId !== productId)
    );
  };

  const handleResetFilters = () => {
    setActivePriceTier('Semua Model');
    setActiveSeries('Semua');
    setSearchQuery('');
    setSortBy('series-default');
  };

  const filteredCatalogItems = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const filtered = catalogItems.filter((item) => {
      if (
        activePriceTier === 'Ekonomis (Rp 1.000)' &&
        item.sellingPrice !== 1000
      ) {
        return false;
      }
      if (
        activePriceTier === 'Menengah (Rp 1.001 – Rp 1.500)' &&
        (item.sellingPrice <= 1000 || item.sellingPrice > 1500)
      ) {
        return false;
      }
      if (
        activePriceTier === 'Eksklusif (> Rp 1.500)' &&
        item.sellingPrice <= 1500
      ) {
        return false;
      }

      if (activeSeries !== 'Semua' && item.series !== activeSeries) {
        return false;
      }

      if (normalizedQuery) {
        const haystack = [
          item.model,
          item.series,
          item.seriesLabel,
          item.shortDescription,
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(normalizedQuery)) {
          return false;
        }
      }

      return true;
    });

    const sorted = [...filtered];
    if (sortBy === 'series-default') {
      sorted.sort(
        (a, b) =>
          SERIES_ORDER.indexOf(a.series) - SERIES_ORDER.indexOf(b.series)
      );
    } else if (sortBy === 'price-asc') {
      sorted.sort((a, b) => a.sellingPrice - b.sellingPrice);
    } else if (sortBy === 'price-desc') {
      sorted.sort((a, b) => b.sellingPrice - a.sellingPrice);
    } else if (sortBy === 'name-asc') {
      sorted.sort((a, b) => a.model.localeCompare(b.model));
    }

    return sorted;
  }, [catalogItems, activePriceTier, activeSeries, searchQuery, sortBy]);

  const selectedProduct = useMemo(
    () =>
      selectedProductId
        ? catalogItems.find((item) => item.id === selectedProductId) ?? null
        : null,
    [catalogItems, selectedProductId]
  );

  const wishlistItems = useMemo(
    () => catalogItems.filter((item) => wishlistIds.includes(item.id)),
    [catalogItems, wishlistIds]
  );

  const cartSummary = useMemo(() => {
    return cartEntries.reduce(
      (acc, entry) => {
        const product = catalogItems.find((p) => p.id === entry.productId);
        if (!product) return acc;
        acc.modelCount += 1;
        acc.totalPcs += entry.quantity;
        acc.subtotal += product.sellingPrice * entry.quantity;
        return acc;
      },
      { modelCount: 0, totalPcs: 0, subtotal: 0 }
    );
  }, [cartEntries, catalogItems]);

  const showMobileFloatingBar =
    cartSummary.modelCount > 0 &&
    !isCartOpen &&
    !isWishlistOpen &&
    !isCustomModalOpen &&
    !selectedProduct;

  const isAnyOverlayOpen =
    Boolean(selectedProduct) ||
    isCartOpen ||
    isWishlistOpen ||
    isCustomModalOpen;

  useEffect(() => {
    if (!isAnyOverlayOpen) return;

    const scrollY = window.scrollY;
    const html = document.documentElement;
    const body = document.body;
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    const prevHtmlOverflow = html.style.overflow;
    const prevHtmlOverscroll = html.style.overscrollBehavior;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPosition = body.style.position;
    const prevBodyTop = body.style.top;
    const prevBodyLeft = body.style.left;
    const prevBodyRight = body.style.right;
    const prevBodyWidth = body.style.width;
    const prevBodyPaddingRight = body.style.paddingRight;

    html.style.overflow = 'hidden';
    html.style.overscrollBehavior = 'none';
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      html.style.overflow = prevHtmlOverflow;
      html.style.overscrollBehavior = prevHtmlOverscroll;
      body.style.overflow = prevBodyOverflow;
      body.style.position = prevBodyPosition;
      body.style.top = prevBodyTop;
      body.style.left = prevBodyLeft;
      body.style.right = prevBodyRight;
      body.style.width = prevBodyWidth;
      body.style.paddingRight = prevBodyPaddingRight;

      const prevScrollBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = 'auto';
      window.scrollTo(0, scrollY);
      html.style.scrollBehavior = prevScrollBehavior;
    };
  }, [isAnyOverlayOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1E1A14]">
      <Navbar
        cartCount={cartEntries.length}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onFocusSearch={handleFocusSearch}
      />

      <main className="flex-1">
        <HeroSection
          onSelectSeries={handleSelectSeries}
          onScrollToCatalog={scrollToCatalog}
        />

        <TrustStrip />

        <CategoryBento onSelectSeries={handleSelectSeries} />

        <CatalogSection
          items={filteredCatalogItems}
          totalCatalogCount={catalogItems.length}
          activePriceTier={activePriceTier}
          onChangePriceTier={setActivePriceTier}
          activeSeries={activeSeries}
          onChangeSeries={setActiveSeries}
          searchQuery={searchQuery}
          onChangeSearch={setSearchQuery}
          sortBy={sortBy}
          onChangeSort={setSortBy}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onSelectProduct={(item) => setSelectedProductId(item.id)}
          onQuickAdd={handleQuickAdd}
          onResetFilters={handleResetFilters}
          onRefreshCatalog={() => syncCatalogFromSheet(true)}
          isSyncing={isSyncing}
          searchInputRef={searchInputRef}
        />

        <CustomInvitationSection
          isModalOpen={isCustomModalOpen}
          onModalOpenChange={setIsCustomModalOpen}
        />

        <AboutAndFooter onSelectSeries={handleSelectSeries} />
      </main>

      <ProductDetailModal
        item={selectedProduct}
        isWishlisted={
          selectedProduct ? wishlistIds.includes(selectedProduct.id) : false
        }
        onClose={() => setSelectedProductId(null)}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        entries={cartEntries}
        catalogItems={catalogItems}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onSetQuantity={handleSetQuantity}
        onRemoveEntry={handleRemoveCartEntry}
        onClearCart={() => setCartEntries([])}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        items={wishlistItems}
        onClose={() => setIsWishlistOpen(false)}
        onRemoveWishlist={handleToggleWishlist}
        onSelectProduct={(item) => setSelectedProductId(item.id)}
        onQuickAdd={handleQuickAdd}
      />

      {/* Mobile Sticky Floating Order Bar (Thumb-zone access) */}
      {showMobileFloatingBar && (
        <div className="fixed bottom-3 inset-x-3 z-30 md:hidden pb-[env(safe-area-inset-bottom)]">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="flex w-full items-center justify-between gap-3 rounded-2xl bg-[#1E1A14]/95 backdrop-blur-md px-4 py-2.5 text-white shadow-xl border border-[#7D622E]/30 active:scale-[0.99] transition-transform cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0 text-left">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#7D622E] text-white">
                <ShoppingBag className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] text-[#E6E0D4] truncate tabular-nums">
                  {cartSummary.modelCount} model · {cartSummary.totalPcs} pcs
                </p>
                <p className="text-sm font-semibold text-white tabular-nums">
                  {formatRupiah(cartSummary.subtotal)}
                </p>
              </div>
            </div>
            <span className="shrink-0 rounded-xl bg-[#7D622E] px-3.5 py-2 text-xs font-semibold text-white whitespace-nowrap">
              Lihat Pesanan
            </span>
          </button>
        </div>
      )}

      {/* Lightweight Feedback Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed z-50 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-5 rounded-full bg-[#1E1A14] px-4 py-2.5 text-xs sm:text-sm font-medium text-white shadow-lg whitespace-nowrap ${
            showMobileFloatingBar ? 'bottom-20 md:bottom-5' : 'bottom-5'
          }`}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
