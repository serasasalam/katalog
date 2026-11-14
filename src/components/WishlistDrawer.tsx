import { useEffect } from 'react';
import { Heart, Plus, Trash2, X } from 'lucide-react';
import { formatRupiah } from '../data/catalog';
import { CatalogItem } from '../types/catalog';

interface WishlistDrawerProps {
  isOpen: boolean;
  items: CatalogItem[];
  onClose: () => void;
  onRemoveWishlist: (id: string) => void;
  onSelectProduct: (item: CatalogItem) => void;
  onQuickAdd: (item: CatalogItem) => void;
}

export default function WishlistDrawer({
  isOpen,
  items,
  onClose,
  onRemoveWishlist,
  onSelectProduct,
  onQuickAdd,
}: WishlistDrawerProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Daftar Favorit"
      className="fixed inset-0 z-50 flex justify-end"
    >
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#1E1A14]/45 backdrop-blur-xs touch-none"
      />

      <aside className="relative z-10 flex h-[100dvh] w-full max-w-md flex-col bg-white border-l border-[#E6E0D4] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#E6E0D4] px-4 sm:px-5 py-3.5 sm:py-4">
          <div className="flex items-center gap-2.5">
            <Heart className="h-5 w-5 text-[#7D622E]" />
            <h2 className="text-base font-semibold text-[#1E1A14]">
              Model Favorit ({items.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup daftar favorit"
            className="flex h-10 w-10 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-[#E6E0D4] text-[#1E1A14] hover:bg-[#FAF8F4] cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-5 py-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          {items.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F5F2EB] text-[#635B4E]">
                <Heart className="h-5 w-5" />
              </div>
              <p className="mt-4 text-sm font-semibold text-[#1E1A14]">
                Belum ada model blangko favorit
              </p>
              <p className="mt-1 text-xs text-[#635B4E]">
                Klik ikon hati pada kartu katalog untuk menyimpan model pilihan
                Anda.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 rounded-xl border border-[#E6E0D4] bg-[#FAF8F4] p-3"
                >
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSelectProduct(item);
                    }}
                    className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-[#E6E0D4] cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  </button>

                  <div className="min-w-0 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onSelectProduct(item);
                          }}
                          className="text-left text-sm font-semibold text-[#1E1A14] hover:text-[#7D622E] truncate cursor-pointer"
                        >
                          {item.model}
                        </button>
                        <button
                          type="button"
                          onClick={() => onRemoveWishlist(item.id)}
                          aria-label={`Hapus ${item.model} dari favorit`}
                          className="flex h-8 w-8 -mr-1 -mt-1 items-center justify-center text-[#635B4E] hover:text-red-600 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-xs text-[#635B4E]">
                        {item.seriesLabel} · Min. {item.minQty} pcs
                      </p>
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-[#7D622E] tabular-nums">
                        {formatRupiah(item.sellingPrice)} /pcs
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          onQuickAdd(item);
                          onClose();
                        }}
                        className="inline-flex min-h-[38px] items-center gap-1 rounded-lg bg-[#7D622E] px-3.5 text-xs font-medium text-white hover:bg-[#634C22] cursor-pointer"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>Pesan</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
