import { ArrowUpRight, Instagram, Mail, MapPin, MessageCircle } from 'lucide-react';
import { ADMIN_WHATSAPP_NUMBER, assetUrl } from '../data/catalog';
import { BlankoSeries } from '../types/catalog';

interface AboutAndFooterProps {
  onSelectSeries: (series: BlankoSeries) => void;
}

const ORDER_STEPS = [
  {
    number: '01.',
    title: 'Pilih Model Blangko & Jumlah',
    description:
      'Pilih kode model blangko (BU & U, AVIS, CANTIK, HC, HEPI, RAYYA, atau GS) lalu tentukan jumlah cetak sesuai kebutuhan acara.',
  },
  {
    number: '02.',
    title: 'Kirim Data & Susunan Acara',
    description:
      'Konsultasikan pesanan ke WhatsApp admin. Kami bantu susun kalimat undangan, silsilah keluarga, serta denah lokasi.',
  },
  {
    number: '03.',
    title: 'ACC Proof & Proses Cetak',
    description:
      'Setelah proof tata letak digital disetujui, undangan blangko langsung dicetak rapi lengkap dengan plastik dan label nama.',
  },
];

export default function AboutAndFooter({
  onSelectSeries,
}: AboutAndFooterProps) {
  const directWaLink = `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Halo Serasa Salam Undangan Lembang, saya ingin berkonsultasi mengenai pemesanan undangan blangko.'
  )}`;

  return (
    <>
      {/* How to Order Section */}
      <section id="cara-pesan" className="bg-white py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E6E0D4] pb-5 sm:pb-6">
            <div>
              <p className="text-xs sm:text-sm font-medium text-[#635B4E]">
                Alur Pemesanan Undangan Blangko
              </p>
              <h2 className="mt-1 sm:mt-1.5 text-2xl sm:text-3xl font-semibold tracking-tight text-[#1E1A14]">
                Tiga Langkah Menuju{' '}
                <span className="text-[#7D622E]">Hari Istimewa</span>
              </h2>
            </div>
            <a
              href={directWaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#7D622E] px-5 py-2.5 text-xs sm:text-sm font-medium text-white hover:bg-[#634C22] transition-colors self-start md:self-auto whitespace-nowrap"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Konsultasi Gratis</span>
            </a>
          </div>

          <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {ORDER_STEPS.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl bg-[#FAF8F4] border border-[#E6E0D4] p-4 sm:p-6 space-y-2 sm:space-y-3"
              >
                <p className="text-sm font-semibold text-[#7D622E] tabular-nums">
                  {step.number}
                </p>
                <h3 className="text-base sm:text-lg font-semibold text-[#1E1A14]">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#635B4E] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clean Warm-Alabaster Editorial Footer showcasing the original brand logo */}
      <footer
        id="kontak"
        className="bg-[#F5F2EB] text-[#1E1A14] border-t border-[#E6E0D4]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-24 sm:py-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-7 sm:gap-8 lg:gap-12">
            {/* Brand Summary */}
            <div className="md:col-span-5 space-y-3.5 sm:space-y-4">
              <a
                href="#beranda"
                aria-label="Serasa Salam Undangan Lembang"
                className="inline-block"
              >
                <img
                  src={assetUrl('assets/aistudio/LOGO_COMEBACK_af017ec3.png')}
                  alt="Serasa Salam Undangan Lembang"
                  className="h-9 sm:h-11 w-auto object-contain"
                />
              </a>
              <p className="text-xs sm:text-sm text-[#635B4E] leading-relaxed max-w-sm">
                Studio Undangan Cetak dan Digital Lembang. Mulai dari undangan
                cetak Blangko sampai Custom. Rapi, Ekonomis, dan siap kirim ke
                seluruh Indonesia.
              </p>
            </div>

            {/* Catalog Links */}
            <div className="md:col-span-3 space-y-2.5 sm:space-y-3">
              <h3 className="text-xs font-semibold tracking-wider text-[#7D622E]">
                Seri Blangko Populer
              </h3>
              <ul className="grid grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-1.5 text-xs sm:text-sm text-[#3F392F]">
                <li>
                  <button
                    type="button"
                    onClick={() => onSelectSeries('CANTIK')}
                    className="min-h-[36px] md:min-h-0 inline-flex items-center hover:text-[#7D622E] hover:underline underline-offset-4 cursor-pointer"
                  >
                    Seri CANTIK &amp; AVIS
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onSelectSeries('HEPI')}
                    className="min-h-[36px] md:min-h-0 inline-flex items-center hover:text-[#7D622E] hover:underline underline-offset-4 cursor-pointer"
                  >
                    Seri HEPI &amp; HC
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onSelectSeries('GS')}
                    className="min-h-[36px] md:min-h-0 inline-flex items-center hover:text-[#7D622E] hover:underline underline-offset-4 cursor-pointer"
                  >
                    Seri GS Eksklusif
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onSelectSeries('RAYYA')}
                    className="min-h-[36px] md:min-h-0 inline-flex items-center hover:text-[#7D622E] hover:underline underline-offset-4 cursor-pointer"
                  >
                    Seri RAYYA &amp; BU / U
                  </button>
                </li>
              </ul>
            </div>

            {/* Studio Contact */}
            <div className="md:col-span-4 space-y-3">
              <h3 className="text-xs font-semibold tracking-wider text-[#7D622E]">
                Studio &amp; Konsultasi
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#3F392F]">
                <li className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-[#7D622E]" />
                  <span>
                    Kp. Sukamaju RT. 01 RW. 11, Desa Kayuambon, Kec. Lembang
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 shrink-0 text-[#7D622E]" />
                  <a
                    href="mailto:serasasalam@gmail.com"
                    className="hover:text-[#7D622E] hover:underline underline-offset-4"
                  >
                    serasasalam@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <MessageCircle className="h-4 w-4 shrink-0 text-[#7D622E]" />
                  <a
                    href={directWaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tabular-nums hover:text-[#7D622E] hover:underline underline-offset-4"
                  >
                    0851-5606-5215
                  </a>
                </li>
                <li className="flex flex-wrap items-center gap-2.5 pt-1">
                  <a
                    href={directWaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full bg-[#7D622E] px-4 py-2 text-xs font-semibold text-white hover:bg-[#634C22] transition-colors"
                  >
                    <span>WhatsApp Studio</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href="https://www.instagram.com/serasasalam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full border border-[#D6CFC1] bg-white px-4 py-2 text-xs font-medium text-[#1E1A14] hover:border-[#7D622E] hover:text-[#7D622E] transition-colors"
                  >
                    <Instagram className="h-3.5 w-3.5" />
                    <span>@serasasalam</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 sm:mt-10 pt-6 border-t border-[#E6E0D4] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#635B4E] text-center sm:text-left">
            <p>© 2026 Serasa Salam Undangan Lembang. Seluruh hak cipta dilindungi.</p>
            <p>Senin – Minggu · 09.00 – 21.00 WIB</p>
          </div>
        </div>
      </footer>
    </>
  );
}
