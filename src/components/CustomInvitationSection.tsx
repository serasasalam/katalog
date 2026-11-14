import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Check,
  Copy,
  Layers,
  MessageCircle,
  Palette,
  Package,
  Sparkles,
  Image as ImageIcon,
  X,
} from 'lucide-react';
import imgHardcover from '../assets/images/serasa_cetak_hardcover_botanical_1794633460927.jpg';
import imgAmplopSage from '../assets/images/serasa_cetak_amplop_sage_1794633462242.jpg';
import imgKraftRustic from '../assets/images/serasa_cetak_kraft_rustic_1794633462248.jpg';
import { ADMIN_WHATSAPP_NUMBER } from '../data/catalog';

interface CustomPackagePreset {
  id: string;
  name: string;
  startingPrice: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  presetKonsep: string;
  presetBahan: string;
  presetFinishing: string[];
}

interface CustomInvitationSectionProps {
  isModalOpen: boolean;
  onModalOpenChange: (open: boolean) => void;
}

const CUSTOM_PRESETS: CustomPackagePreset[] = [
  {
    id: 'custom-softcover',
    name: 'Custom Softcover Elegan',
    startingPrice: 'Mulai Rp 2.500 / pcs',
    subtitle: 'Bebas atur layout, tipografi, & warna cetak sesuai tema acara.',
    image: imgKraftRustic,
    imageAlt: 'Contoh undangan cetak custom softcover minimalis',
    presetKonsep: 'Minimalis Modern',
    presetBahan: 'Art Carton 260/310 gsm',
    presetFinishing: ['Laminasi Doff'],
  },
  {
    id: 'custom-amplop',
    name: 'Custom Amplop & Inner',
    startingPrice: 'Mulai Rp 3.500 / pcs',
    subtitle: 'Lengkap amplop potong khusus plus kartu isi & kartu ucapan.',
    image: imgAmplopSage,
    imageAlt: 'Contoh undangan cetak custom dengan amplop warna sage',
    presetKonsep: 'Floral / Botanical',
    presetBahan: 'Jasmine Glitter',
    presetFinishing: ['Amplop Custom'],
  },
  {
    id: 'custom-khusus',
    name: 'Konsep & Bentuk Khusus',
    startingPrice: 'Estimasi via Diskusi',
    subtitle: 'Model lipat unik, die-cut lengkung, pita satin, atau request pribadi.',
    image: imgHardcover,
    imageAlt: 'Contoh undangan cetak custom tema khusus',
    presetKonsep: 'Tema Bebas / Diskusikan',
    presetBahan: 'Belum yakin (minta saran admin)',
    presetFinishing: ['Bentuk Die-Cut / Lipat Khusus', 'Pita / Tali Rami'],
  },
];

const KONSEP_OPTIONS = [
  'Minimalis Modern',
  'Floral / Botanical',
  'Adat & Tradisional',
  'Rustic / Natural',
  'Elegan Monokrom',
  'Tema Bebas / Diskusikan',
];

const REFERENSI_OPTIONS = [
  'Belum ada (minta rekomendasi admin)',
  'Punya contoh foto / link Pinterest / IG',
  'Sudah punya file desain siap cetak',
];

const BAHAN_OPTIONS = [
  'Art Carton 260/310 gsm',
  'Jasmine Glitter',
  'Brief Card / Linen',
  'Concorde / Bertekstur',
  'Belum yakin (minta saran admin)',
];

const MIN_CUSTOM_QTY = 350;
const QTY_PRESETS = [350, 500, 750, 1000];

const FINISHING_OPTIONS = [
  'Standar Rapi (Tanpa Tambahan)',
  'Amplop Custom',
  'Foil Emas / Perak',
  'Emboss / Deboss',
  'Pita / Tali Rami',
  'Laminasi Doff',
  'Bentuk Die-Cut / Lipat Khusus',
];

export default function CustomInvitationSection({
  isModalOpen,
  onModalOpenChange,
}: CustomInvitationSectionProps) {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('custom-softcover');
  const [konsep, setKonsep] = useState<string>('Minimalis Modern');
  const [referensiType, setReferensiType] = useState<string>(
    'Belum ada (minta rekomendasi admin)'
  );
  const [referensiLink, setReferensiLink] = useState<string>('');
  const [bahan, setBahan] = useState<string>('Art Carton 260/310 gsm');
  const [qtyCount, setQtyCount] = useState<number>(MIN_CUSTOM_QTY);
  const [qtyInput, setQtyInput] = useState<string>(String(MIN_CUSTOM_QTY));
  const [isUnderMinDiscussion, setIsUnderMinDiscussion] = useState<boolean>(false);
  const [finishings, setFinishings] = useState<string[]>(['Laminasi Doff']);
  const [customerName, setCustomerName] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (!isModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onModalOpenChange(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, onModalOpenChange]);

  const handleOpenWithPreset = (preset?: CustomPackagePreset) => {
    if (preset) {
      setSelectedPresetId(preset.id);
      setKonsep(preset.presetKonsep);
      setBahan(preset.presetBahan);
      setFinishings(preset.presetFinishing);
    }
    onModalOpenChange(true);
  };

  const handleToggleFinishing = (option: string) => {
    if (option === 'Standar Rapi (Tanpa Tambahan)') {
      setFinishings(['Standar Rapi (Tanpa Tambahan)']);
      return;
    }

    setFinishings((prev) => {
      const cleaned = prev.filter(
        (item) => item !== 'Standar Rapi (Tanpa Tambahan)'
      );
      if (cleaned.includes(option)) {
        const next = cleaned.filter((item) => item !== option);
        return next.length > 0 ? next : ['Standar Rapi (Tanpa Tambahan)'];
      }
      return [...cleaned, option];
    });
  };

  const handleSelectQtyPreset = (presetQty: number) => {
    setIsUnderMinDiscussion(false);
    setQtyCount(presetQty);
    setQtyInput(String(presetQty));
  };

  const handleSelectUnderMinDiscussion = () => {
    setIsUnderMinDiscussion(true);
    setQtyInput('');
  };

  const handleQtyInputChange = (raw: string) => {
    const digitsOnly = raw.replace(/\D/g, '');
    setQtyInput(digitsOnly);
    const parsed = parseInt(digitsOnly, 10);
    if (!Number.isNaN(parsed) && parsed > 0) {
      setQtyCount(parsed);
      setIsUnderMinDiscussion(parsed < MIN_CUSTOM_QTY);
    } else {
      setIsUnderMinDiscussion(false);
    }
  };

  const handleQtyBlur = () => {
    if (isUnderMinDiscussion && qtyInput === '') return;
    const parsed = parseInt(qtyInput, 10);
    if (Number.isNaN(parsed) || parsed <= 0) {
      setQtyCount(MIN_CUSTOM_QTY);
      setQtyInput(String(MIN_CUSTOM_QTY));
      setIsUnderMinDiscussion(false);
      return;
    }
    setQtyCount(parsed);
    setQtyInput(String(parsed));
    setIsUnderMinDiscussion(parsed < MIN_CUSTOM_QTY);
  };

  const parsedQtyInput = parseInt(qtyInput, 10);
  const showBelowMinNote =
    isUnderMinDiscussion ||
    (!Number.isNaN(parsedQtyInput) &&
      parsedQtyInput > 0 &&
      parsedQtyInput < MIN_CUSTOM_QTY);

  const buildCustomMessage = () => {
    const activePreset = CUSTOM_PRESETS.find((p) => p.id === selectedPresetId);
    const qtyLabel =
      isUnderMinDiscussion && (!qtyInput || parsedQtyInput <= 0)
        ? 'Di bawah 350 pcs (ingin diskusi dengan admin)'
        : !Number.isNaN(parsedQtyInput) &&
            parsedQtyInput > 0 &&
            parsedQtyInput < MIN_CUSTOM_QTY
          ? `${parsedQtyInput} pcs (di bawah min. 350 pcs — mohon diskusi estimasi dengan admin)`
          : `${Math.max(MIN_CUSTOM_QTY, qtyCount)} pcs`;

    const lines = [
      'Halo Admin Serasa Salam Undangan Lembang, saya ingin konsultasi *Undangan Cetak Custom* (mulai Rp 2.500/pcs, standar min. 350 pcs):',
      '',
      activePreset
        ? `• Kategori Acuan: ${activePreset.name} (${activePreset.startingPrice})`
        : '',
      `• Konsep / Tema: ${konsep}`,
      `• Referensi: ${referensiType}${referensiLink.trim() ? ` (${referensiLink.trim()})` : ''}`,
      `• Bahan Kertas: ${bahan}`,
      `• Perkiraan Qty: ${qtyLabel}`,
      `• Finishing: ${finishings.join(', ')}`,
      customerName.trim() ? `• Nama Pemesan: ${customerName.trim()}` : '',
      notes.trim() ? `• Catatan Tambahan: ${notes.trim()}` : '',
      '',
      'Mohon bantuannya untuk estimasi harga & rekomendasi desain ya, terima kasih!',
    ].filter(Boolean);

    return lines.join('\n');
  };

  const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    buildCustomMessage()
  )}`;

  const handleCopyBrief = async () => {
    try {
      await navigator.clipboard.writeText(buildCustomMessage());
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <section
        id="custom"
        className="bg-white border-b border-[#E6E0D4] py-10 sm:py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Compact Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E6E0D4] pb-5 sm:pb-6">
            <div className="max-w-2xl">
              <p className="text-xs sm:text-sm font-semibold text-[#7D622E]">
                Varian Eksklusif · Mulai Rp 2.500 / pcs · Min. 350 pcs
              </p>
              <h2 className="mt-1 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#1E1A14] text-balance">
                Undangan Cetak <span className="text-[#7D622E]">Custom</span>
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#635B4E] leading-relaxed">
                Desain dibuat khusus dari nol sesuai impian Anda—mulai dari{' '}
                <strong className="font-medium text-[#1E1A14]">
                  Konsep, Referensi, Bahan, Qty, dan Finishing
                </strong>{' '}
                bisa didiskusikan langsung bersama admin.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleOpenWithPreset()}
              className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-[#7D622E] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-[#634C22] active:scale-[0.99] transition-all cursor-pointer self-start md:self-auto whitespace-nowrap shrink-0"
            >
              <MessageCircle className="h-4 w-4 shrink-0" />
              <span>Konsultasi Custom Sekarang</span>
            </button>
          </div>

          {/* Compact 3-Card Showcase (Swipe on mobile, 3-col grid on tablet/desktop) */}
          <div className="mt-6 sm:mt-8 flex md:grid md:grid-cols-3 gap-3.5 sm:gap-5 overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 pb-2 md:pb-0">
            {CUSTOM_PRESETS.map((preset) => (
              <article
                key={preset.id}
                onClick={() => handleOpenWithPreset(preset)}
                className="group w-[80vw] max-w-[310px] md:w-auto md:max-w-none shrink-0 snap-start flex flex-col justify-between rounded-2xl bg-[#FAF8F4] border border-[#E6E0D4] p-3.5 sm:p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#7D622E]/50 hover:shadow-md cursor-pointer"
              >
                <div>
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#F5F2EB] border border-[#E6E0D4]">
                    <img
                      src={preset.image}
                      alt={preset.imageAlt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-3 text-xs font-semibold text-[#7D622E] tabular-nums">
                    {preset.startingPrice}
                  </p>
                  <h3 className="mt-0.5 text-base font-semibold text-[#1E1A14]">
                    {preset.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#635B4E] leading-relaxed line-clamp-2">
                    {preset.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E6E0D4] flex items-center justify-between text-xs font-semibold text-[#7D622E]">
                  <span>Diskusikan Konsep Ini</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </article>
            ))}
          </div>

          {/* Concise Footer Note inside Section */}
          <div className="mt-5 sm:mt-6 rounded-xl bg-[#FAF8F4] border border-[#E6E0D4] px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#635B4E]">
            <p>
              Standar minimal cetak custom{' '}
              <strong className="font-semibold text-[#1E1A14]">350 pcs</strong>.
              Jika perlu di bawah 350 pcs, silakan{' '}
              <strong className="font-semibold text-[#7D622E]">
                diskusikan dengan admin
              </strong>
              .
            </p>
            <button
              type="button"
              onClick={() => handleOpenWithPreset()}
              className="font-semibold text-[#7D622E] hover:underline underline-offset-4 cursor-pointer text-left sm:text-right whitespace-nowrap shrink-0"
            >
              Isi Brief Konsultasi →
            </button>
          </div>
        </div>
      </section>

      {/* Custom Consultation Modal / Mobile Bottom Sheet */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="custom-consult-title"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
        >
          {/* Backdrop */}
          <div
            onClick={() => onModalOpenChange(false)}
            className="fixed inset-0 bg-[#1E1A14]/55 backdrop-blur-xs touch-none"
          />

          {/* Modal Container */}
          <div className="relative z-10 flex w-full max-w-2xl max-h-[92dvh] flex-col rounded-t-3xl sm:rounded-2xl bg-[#FAF8F4] border border-[#E6E0D4] shadow-xl overflow-hidden">
            {/* Sticky Header */}
            <div className="shrink-0 bg-white border-b border-[#E6E0D4] px-4 sm:px-6 pt-2.5 pb-3 sm:py-4">
              <div
                aria-hidden="true"
                className="mx-auto mb-2 h-1 w-10 rounded-full bg-[#D6CFC1] sm:hidden"
              />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] sm:text-xs font-semibold text-[#7D622E] tabular-nums">
                    Undangan Cetak Custom · Mulai Rp 2.500/pcs · Min. 350 pcs
                  </p>
                  <h3
                    id="custom-consult-title"
                    className="mt-0.5 text-base sm:text-lg font-semibold text-[#1E1A14]"
                  >
                    Konsultasi Detail Undangan Custom
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => onModalOpenChange(false)}
                  aria-label="Tutup form konsultasi custom"
                  className="flex h-10 w-10 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full border border-[#E6E0D4] bg-white text-[#1E1A14] hover:bg-[#FAF8F4] transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6 py-4 sm:py-5 space-y-5">
              {/* Acuan Gaya */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-[#635B4E]">
                  Gaya Acuan Custom
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {CUSTOM_PRESETS.map((preset) => {
                    const active = selectedPresetId === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleOpenWithPreset(preset)}
                        className={`rounded-xl border px-3 py-2 text-left transition-colors cursor-pointer ${
                          active
                            ? 'border-[#7D622E] bg-white ring-1 ring-[#7D622E]/30'
                            : 'border-[#E6E0D4] bg-white/70 hover:border-[#7D622E]/45'
                        }`}
                      >
                        <p className="text-[11px] font-semibold text-[#7D622E] tabular-nums">
                          {preset.startingPrice}
                        </p>
                        <p className="text-xs font-semibold text-[#1E1A14] truncate">
                          {preset.name}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 1. Konsep */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1E1A14]">
                  <Palette className="h-4 w-4 text-[#7D622E]" />
                  <span>1. Konsep / Tema Acara</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {KONSEP_OPTIONS.map((opt) => {
                    const active = konsep === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setKonsep(opt)}
                        className={`min-h-[38px] rounded-xl border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                          active
                            ? 'border-[#7D622E] bg-[#7D622E] text-white'
                            : 'border-[#E6E0D4] bg-white text-[#1E1A14] hover:border-[#7D622E]/50'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Referensi */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1E1A14]">
                  <ImageIcon className="h-4 w-4 text-[#7D622E]" />
                  <span>2. Referensi Desain</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {REFERENSI_OPTIONS.map((opt) => {
                    const active = referensiType === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setReferensiType(opt)}
                        className={`min-h-[42px] rounded-xl border px-3 py-2 text-left text-xs font-medium transition-colors cursor-pointer ${
                          active
                            ? 'border-[#7D622E] bg-[#F4EFE4] text-[#7D622E] font-semibold'
                            : 'border-[#E6E0D4] bg-white text-[#3F392F] hover:border-[#7D622E]/45'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {referensiType !== 'Belum ada (minta rekomendasi admin)' && (
                  <input
                    type="text"
                    value={referensiLink}
                    onChange={(e) => setReferensiLink(e.target.value)}
                    placeholder="Tempel link Pinterest/IG atau keterangan (foto bisa dikirim di WA)"
                    className="h-11 sm:h-10 w-full rounded-xl border border-[#E6E0D4] bg-white px-3 text-base sm:text-xs text-[#1E1A14] placeholder:text-[#8A8172] focus:border-[#7D622E] focus:outline-none"
                  />
                )}
              </div>

              {/* 3. Bahan */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1E1A14]">
                  <Layers className="h-4 w-4 text-[#7D622E]" />
                  <span>3. Bahan Kertas</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {BAHAN_OPTIONS.map((opt) => {
                    const active = bahan === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setBahan(opt)}
                        className={`min-h-[38px] rounded-xl border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                          active
                            ? 'border-[#7D622E] bg-[#7D622E] text-white'
                            : 'border-[#E6E0D4] bg-white text-[#1E1A14] hover:border-[#7D622E]/50'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Qty */}
              <div className="space-y-2">
                <label className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm font-semibold text-[#1E1A14]">
                  <span className="flex items-center gap-1.5">
                    <Package className="h-4 w-4 text-[#7D622E]" />
                    <span>4. Perkiraan Jumlah (Qty)</span>
                  </span>
                  <span className="text-[11px] font-semibold text-[#7D622E]">
                    Min. {MIN_CUSTOM_QTY} pcs (di bawah 350 pcs diskusikan admin)
                  </span>
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  {QTY_PRESETS.map((preset) => {
                    const active = !isUnderMinDiscussion && qtyCount === preset;
                    return (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => handleSelectQtyPreset(preset)}
                        className={`min-h-[38px] rounded-xl border px-3 py-1.5 text-xs font-semibold tabular-nums transition-colors cursor-pointer ${
                          active
                            ? 'border-[#7D622E] bg-[#7D622E] text-white'
                            : 'border-[#E6E0D4] bg-white text-[#1E1A14] hover:border-[#7D622E]/50'
                        }`}
                      >
                        {preset === 1000 ? '1.000 pcs' : `${preset} pcs`}
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    onClick={handleSelectUnderMinDiscussion}
                    className={`min-h-[38px] rounded-xl border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                      isUnderMinDiscussion && qtyInput === ''
                        ? 'border-[#7D622E] bg-[#F4EFE4] text-[#7D622E] font-semibold'
                        : 'border-[#E6E0D4] bg-white text-[#3F392F] hover:border-[#7D622E]/50'
                    }`}
                  >
                    &lt; 350 pcs (Diskusikan)
                  </button>
                  <div className="flex items-center rounded-xl border border-[#E6E0D4] bg-white h-10 sm:h-[38px] px-3 focus-within:border-[#7D622E]">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={qtyInput}
                      onChange={(e) => handleQtyInputChange(e.target.value)}
                      onBlur={handleQtyBlur}
                      aria-label="Isi perkiraan jumlah undangan custom"
                      placeholder="Jumlah..."
                      className="w-16 bg-transparent text-right text-base sm:text-xs font-semibold text-[#1E1A14] tabular-nums focus:outline-none"
                    />
                    <span className="pl-1.5 text-xs font-medium text-[#635B4E] select-none">
                      pcs
                    </span>
                  </div>
                </div>
                {showBelowMinNote && (
                  <p className="text-[11px] font-medium text-[#7D622E]">
                    Ketentuan standar custom minimal {MIN_CUSTOM_QTY} pcs. Jika
                    perlu di bawah {MIN_CUSTOM_QTY} pcs, silakan langsung
                    diskusikan dengan admin via WhatsApp untuk penyesuaian harga.
                  </p>
                )}
              </div>

              {/* 5. Finishing */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1E1A14]">
                  <Sparkles className="h-4 w-4 text-[#7D622E]" />
                  <span>5. Finishing &amp; Pelengkap (Bisa pilih lebih dari 1)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {FINISHING_OPTIONS.map((opt) => {
                    const active = finishings.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleToggleFinishing(opt)}
                        className={`inline-flex min-h-[38px] items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                          active
                            ? 'border-[#7D622E] bg-[#F4EFE4] text-[#7D622E] font-semibold'
                            : 'border-[#E6E0D4] bg-white text-[#3F392F] hover:border-[#7D622E]/50'
                        }`}
                      >
                        {active && <Check className="h-3.5 w-3.5 shrink-0" />}
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional Name & Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Nama Anda / Calon Mempelai (opsional)"
                  className="h-11 sm:h-10 w-full rounded-xl border border-[#E6E0D4] bg-white px-3 text-base sm:text-xs text-[#1E1A14] placeholder:text-[#8A8172] focus:border-[#7D622E] focus:outline-none"
                />
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Target tanggal acara / catatan (opsional)"
                  className="h-11 sm:h-10 w-full rounded-xl border border-[#E6E0D4] bg-white px-3 text-base sm:text-xs text-[#1E1A14] placeholder:text-[#8A8172] focus:border-[#7D622E] focus:outline-none"
                />
              </div>
            </div>

            {/* Sticky Bottom Action Bar */}
            <div className="shrink-0 border-t border-[#E6E0D4] bg-white px-4 sm:px-6 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-[#7D622E] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-[#634C22] active:scale-[0.99] transition-all whitespace-nowrap"
              >
                <MessageCircle className="h-4 w-4 shrink-0" />
                <span>Konsultasikan Undangan Custom (WA)</span>
              </a>

              <button
                type="button"
                onClick={handleCopyBrief}
                className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-[#E6E0D4] bg-[#FAF8F4] px-4 py-2.5 text-xs sm:text-sm font-medium text-[#1E1A14] hover:border-[#7D622E] hover:text-[#7D622E] transition-colors cursor-pointer whitespace-nowrap"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-[#7D622E]" />
                    <span>Disalin</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Salin Detail</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
