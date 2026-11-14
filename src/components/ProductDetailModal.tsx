import { useEffect, useState } from 'react';
import {
  Check,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  X,
} from 'lucide-react';
import { formatRupiah } from '../data/catalog';
import { CatalogItem } from '../types/catalog';

interface ProductDetailModalProps {
  item: CatalogItem | null;
  isWishlisted: boolean;
  onClose: () => void;
  onToggleWishlist: (id: string) => void;
  onAddToCart: (productId: string, quantity: number) => void;
}

export default function ProductDetailModal({
  item,
  isWishlisted,
  onClose,
  onToggleWishlist,
  onAddToCart,
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(100);
  const [qtyInput, setQtyInput] = useState('100');

  useEffect(() => {
    if (item) {
      setQuantity(item.minQty);
      setQtyInput(String(item.minQty));
    }
  }, [item]);

  useEffect(() => {
    if (!item) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  const qtyPresets = [100, 200, 300, 500, 1000];

  const updateExactQty = (nextQty: number) => {
    const clamped = Math.max(item.minQty, nextQty);
    setQuantity(clamped);
    setQtyInput(String(clamped));
  };

  const handleQtyInputChange = (raw: string) => {
    const digitsOnly = raw.replace(/\D/g, '');
    setQtyInput(digitsOnly);
    const parsed = parseInt(digitsOnly, 10);
    if (!Number.isNaN(parsed) && parsed >= item.minQty) {
      setQuantity(parsed);
    }
  };

  const commitQtyInput = () => {
    const parsed = parseInt(qtyInput, 10);
    const valid = Number.isNaN(parsed) ? item.minQty : Math.max(item.minQty, parsed);
    setQuantity(valid);
    setQtyInput(String(valid));
    return valid;
  };

  const parsedInput = parseInt(qtyInput, 10);
  const isBelowMin =
    qtyInput === '' || Number.isNaN(parsedInput) || parsedInput < item.minQty;

  const totalPrice = item.sellingPrice * quantity;

  const handleConfirmAdd = () => {
    const finalQty = commitQtyInput();
    onAddToCart(item.id, finalQty);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#1E1A14]/55 backdrop-blur-xs"
      />

      {/* Modal Container (Bottom Sheet on mobile, Centered Modal on desktop) */}
      <div className="relative z-10 flex w-full max-w-4xl max-h-[92dvh] flex-col rounded-t-3xl sm:rounded-2xl bg-white border border-[#E6E0D4] shadow-xl overflow-hidden">
        {/* Top Close Bar */}
        <div className="shrink-0 bg-white/95 backdrop-blur-sm border-b border-[#E6E0D4] px-4 sm:px-5 pt-2.5 pb-3 sm:py-3.5">
          <div
            aria-hidden="true"
            className="mx-auto mb-2 h-1 w-10 rounded-full bg-[#D6CFC1] sm:hidden"
          />
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-medium text-[#635B4E] truncate">
              {item.seriesLabel} · Estimasi {item.turnaround}
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup detail produk"
              className="flex h-10 w-10 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full border border-[#E6E0D4] text-[#1E1A14] hover:bg-[#FAF8F4] transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 sm:p-7">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8">
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-3.5 sm:space-y-4">
              <div className="mx-auto max-w-[320px] lg:max-w-none aspect-square w-full overflow-hidden rounded-xl bg-[#F5F2EB] border border-[#E6E0D4]">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 rounded-xl bg-[#FAF8F4] border border-[#E6E0D4] p-3 sm:p-3.5 text-xs">
                <div>
                  <p className="text-[#635B4E]">Estimasi Produksi</p>
                  <p className="mt-0.5 font-semibold text-[#1E1A14]">
                    {item.turnaround}
                  </p>
                </div>
                <div>
                  <p className="text-[#635B4E]">Minimal Pemesanan</p>
                  <p className="mt-0.5 font-semibold text-[#1E1A14] tabular-nums">
                    {item.minQty} pcs
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-6 flex flex-col space-y-4 sm:space-y-5">
              <div className="space-y-3.5 sm:space-y-4">
                <div>
                  <p className="text-xs font-medium text-[#635B4E]">
                    {item.seriesLabel}
                  </p>

                  <h3
                    id="modal-product-title"
                    className="mt-0.5 sm:mt-1 text-xl sm:text-2xl font-semibold tracking-tight text-[#1E1A14]"
                  >
                    {item.model}
                  </h3>

                  <div className="mt-1.5 sm:mt-2 flex items-baseline gap-2 tabular-nums">
                    <span className="text-xl sm:text-2xl font-semibold text-[#7D622E]">
                      {formatRupiah(item.sellingPrice)}
                    </span>
                    <span className="text-xs sm:text-sm text-[#635B4E]">/ pcs</span>
                  </div>

                  <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-[#635B4E] leading-relaxed">
                    {item.shortDescription}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#1E1A14] mb-2">
                    Pilih Cepat atau Isi Jumlah (Min. {item.minQty} pcs, bebas)
                  </p>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {qtyPresets.map((preset) => {
                      const active = quantity === preset;
                      return (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => updateExactQty(preset)}
                          className={`min-h-[42px] sm:min-h-[40px] rounded-xl border px-2 py-2 text-xs font-semibold tabular-nums transition-colors cursor-pointer ${
                            active
                              ? 'border-[#7D622E] bg-[#7D622E] text-white'
                              : 'border-[#E6E0D4] bg-white text-[#1E1A14] hover:border-[#7D622E]/50'
                          }`}
                        >
                          {preset} pcs
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-[#F4EFE4] border border-[#7D622E]/20 px-4 py-3 tabular-nums">
                  <div>
                    <p className="text-xs text-[#635B4E]">
                      Total untuk {quantity} pcs
                    </p>
                    <p className="text-[11px] text-[#635B4E]">
                      {quantity} × {formatRupiah(item.sellingPrice)}
                    </p>
                  </div>
                  <span className="text-base sm:text-lg font-semibold text-[#7D622E]">
                    {formatRupiah(totalPrice)}
                  </span>
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#1E1A14] mb-2">
                    Spesifikasi &amp; Kelengkapan
                  </p>
                  <ul className="space-y-1.5">
                    {item.specs.map((spec) => (
                      <li
                        key={spec}
                        className="flex items-start gap-2 text-xs sm:text-sm text-[#3F392F]"
                      >
                        <Check className="h-4 w-4 text-[#7D622E] shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Order Bar (Always reachable by thumb) */}
        <div className="shrink-0 border-t border-[#E6E0D4] bg-white/95 backdrop-blur-md px-4 sm:px-7 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] space-y-1.5">
          {isBelowMin && (
            <p className="text-[11px] font-medium text-[#9A5B13]">
              Minimal pemesanan model ini {item.minQty} pcs (akan disesuaikan otomatis).
            </p>
          )}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center rounded-xl border border-[#E6E0D4] bg-[#FAF8F4] h-11 px-1 focus-within:border-[#7D622E] focus-within:bg-white transition-colors shrink-0">
              <button
                type="button"
                onClick={() => updateExactQty(quantity - 1)}
                aria-label="Kurangi 1 pcs"
                className="flex h-full w-9 items-center justify-center text-[#1E1A14] hover:text-[#7D622E] cursor-pointer"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <div className="flex items-center justify-center">
                <input
                  type="text"
                  inputMode="numeric"
                  value={qtyInput}
                  onChange={(e) => handleQtyInputChange(e.target.value)}
                  onBlur={commitQtyInput}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.currentTarget.blur();
                    }
                  }}
                  aria-label={`Jumlah cetak minimal ${item.minQty} pcs`}
                  className="w-12 bg-transparent text-right text-base sm:text-sm font-semibold text-[#1E1A14] tabular-nums focus:outline-none"
                />
                <span className="pl-1 pr-1.5 text-xs sm:text-sm font-semibold text-[#635B4E] select-none">
                  pcs
                </span>
              </div>
              <button
                type="button"
                onClick={() => updateExactQty(quantity + 1)}
                aria-label="Tambah 1 pcs"
                className="flex h-full w-9 items-center justify-center text-[#1E1A14] hover:text-[#7D622E] cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => onToggleWishlist(item.id)}
              aria-label={
                isWishlisted ? 'Hapus dari favorit' : 'Simpan ke favorit'
              }
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors cursor-pointer ${
                isWishlisted
                  ? 'border-[#7D622E] bg-[#F4EFE4] text-[#7D622E]'
                  : 'border-[#E6E0D4] bg-white text-[#1E1A14] hover:border-[#7D622E]'
              }`}
            >
              <Heart
                className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`}
              />
            </button>

            <button
              type="button"
              onClick={handleConfirmAdd}
              className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-2 rounded-xl bg-[#7D622E] px-3 sm:px-5 py-2.5 text-xs sm:text-sm font-medium text-white hover:bg-[#634C22] active:scale-[0.99] transition-all cursor-pointer whitespace-nowrap"
            >
              <ShoppingBag className="h-4 w-4 shrink-0" />
              <span>Tambah</span>
              <span className="hidden sm:inline">ke Pesanan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
