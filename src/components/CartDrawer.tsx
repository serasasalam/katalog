import { useEffect, useState } from 'react';
import {
  Check,
  Copy,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { ADMIN_WHATSAPP_NUMBER, formatRupiah } from '../data/catalog';
import { CartEntry, CatalogItem } from '../types/catalog';

interface CartDrawerProps {
  isOpen: boolean;
  entries: CartEntry[];
  catalogItems: CatalogItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onSetQuantity: (productId: string, quantity: number) => void;
  onRemoveEntry: (productId: string) => void;
  onClearCart: () => void;
}

function CartQtyStepper({
  quantity,
  minQty,
  onStep,
  onCommit,
}: {
  quantity: number;
  minQty: number;
  onStep: (delta: number) => void;
  onCommit: (nextQty: number) => void;
}) {
  const [inputVal, setInputVal] = useState(String(quantity));

  useEffect(() => {
    setInputVal(String(quantity));
  }, [quantity]);

  const handleChange = (raw: string) => {
    const digits = raw.replace(/\D/g, '');
    setInputVal(digits);
    const parsed = parseInt(digits, 10);
    if (!Number.isNaN(parsed) && parsed >= minQty) {
      onCommit(parsed);
    }
  };

  const handleBlur = () => {
    const parsed = parseInt(inputVal, 10);
    const clamped = Number.isNaN(parsed) ? minQty : Math.max(minQty, parsed);
    setInputVal(String(clamped));
    onCommit(clamped);
  };

  return (
    <div className="inline-flex items-center rounded-lg border border-[#E6E0D4] bg-white h-9 sm:h-8 focus-within:border-[#7D622E]">
      <button
        type="button"
        onClick={() => onStep(-1)}
        aria-label="Kurangi 1 pcs"
        className="flex h-full w-8 sm:w-7 items-center justify-center text-[#1E1A14] hover:text-[#7D622E] cursor-pointer"
      >
        <Minus className="h-3.5 w-3.5 sm:h-3 sm:w-3" />
      </button>
      <div className="flex items-center">
        <input
          type="text"
          inputMode="numeric"
          value={inputVal}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.currentTarget.blur();
          }}
          aria-label={`Jumlah cetak minimal ${minQty} pcs`}
          className="w-11 bg-transparent text-right text-base sm:text-xs font-semibold text-[#1E1A14] tabular-nums focus:outline-none"
        />
        <span className="pl-0.5 pr-1.5 text-[11px] font-medium text-[#635B4E] select-none">
          pcs
        </span>
      </div>
      <button
        type="button"
        onClick={() => onStep(1)}
        aria-label="Tambah 1 pcs"
        className="flex h-full w-8 sm:w-7 items-center justify-center text-[#1E1A14] hover:text-[#7D622E] cursor-pointer"
      >
        <Plus className="h-3.5 w-3.5 sm:h-3 sm:w-3" />
      </button>
    </div>
  );
}

export default function CartDrawer({
  isOpen,
  entries,
  catalogItems,
  onClose,
  onUpdateQuantity,
  onSetQuantity,
  onRemoveEntry,
  onClearCart,
}: CartDrawerProps) {
  const [customerName, setCustomerName] = useState('');
  const [coupleNames, setCoupleNames] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const detailedItems = entries
    .map((entry) => {
      const product = catalogItems.find((p) => p.id === entry.productId);
      if (!product) return null;
      return {
        ...entry,
        product,
        lineTotal: product.sellingPrice * entry.quantity,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const subtotal = detailedItems.reduce((sum, item) => sum + item.lineTotal, 0);

  const buildOrderMessage = () => {
    const lines = [
      'Halo Admin Serasa Salam Undangan Lembang, saya ingin memesan undangan blangko:',
      '',
      ...detailedItems.map(
        (item, idx) =>
          `${idx + 1}. ${item.product.model} (${item.quantity} pcs × ${formatRupiah(
            item.product.sellingPrice
          )}) — ${formatRupiah(item.lineTotal)}`
      ),
      '',
      `Estimasi Total: ${formatRupiah(subtotal)}`,
      '',
      `Nama Pemesan: ${customerName.trim() || '-'}`,
      `Nama Mempelai: ${coupleNames.trim() || '-'}`,
      `Tanggal Acara: ${eventDate.trim() || '-'}`,
      notes.trim() ? `Catatan: ${notes.trim()}` : '',
    ].filter(Boolean);

    return lines.join('\n');
  };

  const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    buildOrderMessage()
  )}`;

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(buildOrderMessage());
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Keranjang Pesanan Serasa Salam"
      className="fixed inset-0 z-50 flex justify-end"
    >
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#1E1A14]/45 backdrop-blur-xs touch-none"
      />

      <aside className="relative z-10 flex h-[100dvh] w-full max-w-md flex-col bg-white border-l border-[#E6E0D4] shadow-2xl">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-[#E6E0D4] px-4 sm:px-5 py-3.5 sm:py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-[#7D622E]" />
            <h2 className="text-base font-semibold text-[#1E1A14]">
              Ringkasan Pesanan
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup keranjang pesanan"
            className="flex h-10 w-10 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-[#E6E0D4] text-[#1E1A14] hover:bg-[#FAF8F4] cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-5 py-4 space-y-5">
          {detailedItems.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F5F2EB] text-[#635B4E]">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <p className="mt-4 text-sm font-semibold text-[#1E1A14]">
                Daftar pesanan masih kosong
              </p>
              <p className="mt-1 text-xs text-[#635B4E]">
                Pilih model undangan blangko dari katalog untuk mulai menghitung
                estimasi cetak.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {detailedItems.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-3 rounded-xl border border-[#E6E0D4] bg-[#FAF8F4] p-3"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.imageAlt}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="h-16 w-16 shrink-0 rounded-lg object-cover border border-[#E6E0D4]"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-[#1E1A14] truncate">
                          {item.product.model}
                        </h3>
                        <button
                          type="button"
                          onClick={() => onRemoveEntry(item.productId)}
                          aria-label={`Hapus ${item.product.model}`}
                          className="flex h-8 w-8 -mr-1 -mt-1 items-center justify-center text-[#635B4E] hover:text-red-600 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-xs text-[#635B4E] tabular-nums">
                        {formatRupiah(item.product.sellingPrice)} /pcs · Min.{' '}
                        {item.product.minQty} pcs
                      </p>

                      <div className="mt-2.5 flex items-center justify-between gap-2">
                        <CartQtyStepper
                          quantity={item.quantity}
                          minQty={item.product.minQty}
                          onStep={(delta) =>
                            onUpdateQuantity(item.productId, delta)
                          }
                          onCommit={(nextQty) =>
                            onSetQuantity(item.productId, nextQty)
                          }
                        />

                        <span className="text-sm font-semibold text-[#7D622E] tabular-nums">
                          {formatRupiah(item.lineTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Brief Order Form */}
              <div className="space-y-3 border-t border-[#E6E0D4] pt-4">
                <p className="text-xs font-semibold text-[#1E1A14]">
                  Detail Singkat Acara (Opsional)
                </p>
                <div className="grid grid-cols-1 gap-2.5">
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Nama Pemesan (misal: Raka Pratama)"
                    aria-label="Nama Pemesan"
                    className="h-11 sm:h-10 rounded-xl sm:rounded-lg border border-[#E6E0D4] bg-[#FAF8F4] px-3 text-base sm:text-xs text-[#1E1A14] focus:border-[#7D622E] focus:bg-white focus:outline-none"
                  />
                  <input
                    type="text"
                    value={coupleNames}
                    onChange={(e) => setCoupleNames(e.target.value)}
                    placeholder="Nama Mempelai (misal: Nadia & Raka)"
                    aria-label="Nama Mempelai"
                    className="h-11 sm:h-10 rounded-xl sm:rounded-lg border border-[#E6E0D4] bg-[#FAF8F4] px-3 text-base sm:text-xs text-[#1E1A14] focus:border-[#7D622E] focus:bg-white focus:outline-none"
                  />
                  <input
                    type="text"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    placeholder="Tanggal Acara (misal: 20 Desember 2026)"
                    aria-label="Tanggal Acara"
                    className="h-11 sm:h-10 rounded-xl sm:rounded-lg border border-[#E6E0D4] bg-[#FAF8F4] px-3 text-base sm:text-xs text-[#1E1A14] focus:border-[#7D622E] focus:bg-white focus:outline-none"
                  />
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Catatan denah lokasi atau permintaan khusus..."
                    aria-label="Catatan tambahan"
                    className="rounded-xl sm:rounded-lg border border-[#E6E0D4] bg-[#FAF8F4] px-3 py-2.5 text-base sm:text-xs text-[#1E1A14] focus:border-[#7D622E] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer */}
        {detailedItems.length > 0 && (
          <div className="border-t border-[#E6E0D4] bg-white px-4 sm:px-5 py-3.5 pb-[max(1rem,env(safe-area-inset-bottom))] space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#635B4E]">Estimasi Total</span>
              <span className="text-lg font-semibold text-[#1E1A14] tabular-nums">
                {formatRupiah(subtotal)}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[46px] sm:min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[#7D622E] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#634C22] active:scale-[0.99] transition-all"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Konsultasi &amp; Pesan via WhatsApp</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="flex-1 min-h-[42px] sm:min-h-[40px] inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#E6E0D4] bg-[#FAF8F4] px-3 py-2 text-xs font-medium text-[#1E1A14] hover:bg-white transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#7D622E]" />
                      <span>Format Pesanan Disalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Salin Format Pesanan</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={onClearCart}
                  className="min-h-[42px] sm:min-h-[40px] rounded-xl border border-[#E6E0D4] px-3 py-2 text-xs font-medium text-[#635B4E] hover:text-red-600 transition-colors cursor-pointer"
                >
                  Kosongkan
                </button>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
