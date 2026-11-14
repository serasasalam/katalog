import imgCetakWaxseal from '../assets/images/serasa_cetak_waxseal_1794633084515.jpg';
import imgAdatJawagold from '../assets/images/serasa_adat_jawagold_1794633085851.jpg';
import imgHardcoverBotanical from '../assets/images/serasa_cetak_hardcover_botanical_1794633460927.jpg';
import imgKraftRustic from '../assets/images/serasa_cetak_kraft_rustic_1794633462248.jpg';
import imgMonokromLipat from '../assets/images/serasa_cetak_monokrom_lipat_1794633462638.jpg';
import imgAmplopSage from '../assets/images/serasa_cetak_amplop_sage_1794633462242.jpg';
import {
  BlankoSeries,
  CatalogItem,
  HeroShowcaseSlide,
  PreviewThemeStyle,
} from '../types/catalog';

export const ADMIN_WHATSAPP_NUMBER = '6285156065215';

export const SERIES_ORDER: Exclude<BlankoSeries, 'Semua'>[] = [
  'BU & U',
  'AVIS',
  'CANTIK',
  'HC',
  'HEPI',
  'RAYYA',
  'GS',
];

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export const HERO_SHOWCASE_SLIDES: HeroShowcaseSlide[] = [
  {
    id: 'slide-cantik',
    title: 'Seri CANTIK & AVIS',
    countLabel: '19 Model · Mulai Rp 1.000/pcs',
    series: 'CANTIK',
    image: imgCetakWaxseal,
    imageAlt: 'Koleksi undangan blangko seri CANTIK dan AVIS siap cetak',
  },
  {
    id: 'slide-hepi',
    title: 'Seri HEPI & HC',
    countLabel: '22 Model · Mulai Rp 1.000/pcs',
    series: 'HEPI',
    image: imgMonokromLipat,
    imageAlt: 'Koleksi undangan blangko seri HEPI dan HC modern lipat',
  },
  {
    id: 'slide-gs',
    title: 'Seri GS Eksklusif',
    countLabel: '11 Model · Mulai Rp 1.000/pcs',
    series: 'GS',
    image: imgHardcoverBotanical,
    imageAlt: 'Koleksi undangan blangko eksklusif seri GS',
  },
  {
    id: 'slide-rayya',
    title: 'Seri RAYYA & BU/U',
    countLabel: '16 Model · Mulai Rp 1.000/pcs',
    series: 'RAYYA',
    image: imgAdatJawagold,
    imageAlt: 'Koleksi undangan blangko seri RAYYA dan BU / U',
  },
];

export const CATEGORY_BENTO_DATA = {
  populer: {
    countLabel: '36 Model Tersedia',
    title: 'Seri Ekonomis & Populer',
    description:
      'Pilihan undangan blangko favorit dengan harga ramah mulai Rp 1.000 per lembar—ideal untuk kebutuhan resepsi dan syukuran.',
    image: imgCetakWaxseal,
    imageAlt: 'Undangan blangko seri ekonomis dan populer',
    subItems: [
      { label: 'Seri AVIS (5 Model)', series: 'AVIS' as BlankoSeries },
      { label: 'Seri CANTIK (14 Model)', series: 'CANTIK' as BlankoSeries },
      { label: 'Seri HC (5 Model)', series: 'HC' as BlankoSeries },
      {
        label: 'Seri BU 01–06 & U 01–06 (12 Model)',
        series: 'BU & U' as BlankoSeries,
      },
    ],
  },
  modern: {
    countLabel: '17 Model Tersedia',
    title: 'Seri HEPI Modern',
    description:
      'Desain blangko modern dengan tata letak bersih, motif bunga lembut, hingga format lipat elegan.',
    image: imgMonokromLipat,
    imageAlt: 'Undangan blangko seri HEPI modern',
    subItems: [
      { label: 'Seri HEPI 24 (5 Model)', series: 'HEPI' as BlankoSeries },
      { label: 'Seri HEPI 23 (12 Model)', series: 'HEPI' as BlankoSeries },
    ],
  },
  eksklusif: {
    countLabel: '15 Model Tersedia',
    title: 'Seri GS & RAYYA',
    description:
      'Koleksi blangko elegan dengan variasi kertas berkarakter, motif modern, dan proporsi kartu serasi.',
    image: imgHardcoverBotanical,
    imageAlt: 'Undangan blangko eksklusif seri GS dan RAYYA',
    subItems: [
      { label: 'Seri GS 022 – 032 (11 Model)', series: 'GS' as BlankoSeries },
      {
        label: 'Seri RAYYA 366 – 369 (4 Model)',
        series: 'RAYYA' as BlankoSeries,
      },
    ],
  },
};

export interface RawBlankoRow {
  model: string;
  series: Exclude<BlankoSeries, 'Semua'>;
  sellingPrice: number;
  minQty: number;
}

// Data fallback sesuai Google Sheets katalog undangan blangko (harga jual minimum Rp 1.000/pcs)
const RAW_BLANKO_ROWS: RawBlankoRow[] = [
  { model: 'AVIS 128', series: 'AVIS', sellingPrice: 1000, minQty: 100 },
  { model: 'AVIS 129', series: 'AVIS', sellingPrice: 1000, minQty: 100 },
  { model: 'AVIS 130', series: 'AVIS', sellingPrice: 1000, minQty: 100 },
  { model: 'AVIS 131', series: 'AVIS', sellingPrice: 1000, minQty: 100 },
  { model: 'AVIS 132', series: 'AVIS', sellingPrice: 1000, minQty: 100 },

  { model: 'CANTIK 94', series: 'CANTIK', sellingPrice: 1000, minQty: 100 },
  { model: 'CANTIK 95', series: 'CANTIK', sellingPrice: 1000, minQty: 100 },
  { model: 'CANTIK 96', series: 'CANTIK', sellingPrice: 1000, minQty: 100 },
  { model: 'CANTIK 97', series: 'CANTIK', sellingPrice: 1000, minQty: 100 },
  { model: 'CANTIK 98', series: 'CANTIK', sellingPrice: 1020, minQty: 100 },
  { model: 'CANTIK 99', series: 'CANTIK', sellingPrice: 1020, minQty: 100 },
  { model: 'CANTIK 100', series: 'CANTIK', sellingPrice: 1000, minQty: 100 },
  { model: 'CANTIK 101', series: 'CANTIK', sellingPrice: 1000, minQty: 100 },
  { model: 'CANTIK 102', series: 'CANTIK', sellingPrice: 1000, minQty: 100 },
  { model: 'CANTIK 103', series: 'CANTIK', sellingPrice: 1000, minQty: 100 },
  { model: 'CANTIK 104', series: 'CANTIK', sellingPrice: 1000, minQty: 100 },
  { model: 'CANTIK 105', series: 'CANTIK', sellingPrice: 1144, minQty: 100 },
  { model: 'CANTIK 106', series: 'CANTIK', sellingPrice: 1198, minQty: 100 },
  { model: 'CANTIK 107', series: 'CANTIK', sellingPrice: 1198, minQty: 100 },

  { model: 'HC 201', series: 'HC', sellingPrice: 1000, minQty: 100 },
  { model: 'HC 202', series: 'HC', sellingPrice: 1000, minQty: 100 },
  { model: 'HC 203', series: 'HC', sellingPrice: 1166, minQty: 100 },
  { model: 'HC 204', series: 'HC', sellingPrice: 1166, minQty: 100 },
  { model: 'HC 205', series: 'HC', sellingPrice: 1031, minQty: 100 },

  { model: 'HEPI 24.031', series: 'HEPI', sellingPrice: 1000, minQty: 100 },
  { model: 'HEPI 24.032', series: 'HEPI', sellingPrice: 1000, minQty: 100 },
  { model: 'HEPI 24.033', series: 'HEPI', sellingPrice: 1000, minQty: 100 },
  { model: 'HEPI 24.034', series: 'HEPI', sellingPrice: 1198, minQty: 100 },
  { model: 'HEPI 24.035', series: 'HEPI', sellingPrice: 1198, minQty: 100 },
  { model: 'HEPI 23.011', series: 'HEPI', sellingPrice: 1000, minQty: 100 },
  { model: 'HEPI 23.012', series: 'HEPI', sellingPrice: 1000, minQty: 100 },
  { model: 'HEPI 23.013', series: 'HEPI', sellingPrice: 1000, minQty: 100 },
  { model: 'HEPI 23.014', series: 'HEPI', sellingPrice: 1054, minQty: 100 },
  { model: 'HEPI 23.015', series: 'HEPI', sellingPrice: 1054, minQty: 100 },
  { model: 'HEPI 23.016', series: 'HEPI', sellingPrice: 1198, minQty: 100 },
  { model: 'HEPI 23.023', series: 'HEPI', sellingPrice: 1054, minQty: 100 },
  { model: 'HEPI 23.024', series: 'HEPI', sellingPrice: 1054, minQty: 100 },
  { model: 'HEPI 23.025', series: 'HEPI', sellingPrice: 1054, minQty: 100 },
  { model: 'HEPI 23.026', series: 'HEPI', sellingPrice: 1000, minQty: 100 },
  { model: 'HEPI 23.027', series: 'HEPI', sellingPrice: 1000, minQty: 100 },
  { model: 'HEPI 23.028', series: 'HEPI', sellingPrice: 1000, minQty: 100 },

  { model: 'BU 01', series: 'BU & U', sellingPrice: 1000, minQty: 100 },
  { model: 'BU 02', series: 'BU & U', sellingPrice: 1000, minQty: 100 },
  { model: 'BU 03', series: 'BU & U', sellingPrice: 1000, minQty: 100 },
  { model: 'BU 04', series: 'BU & U', sellingPrice: 1000, minQty: 100 },
  { model: 'BU 05', series: 'BU & U', sellingPrice: 1000, minQty: 100 },
  { model: 'BU 06', series: 'BU & U', sellingPrice: 1000, minQty: 100 },
  { model: 'U 01', series: 'BU & U', sellingPrice: 1000, minQty: 100 },
  { model: 'U 02', series: 'BU & U', sellingPrice: 1000, minQty: 100 },
  { model: 'U 03', series: 'BU & U', sellingPrice: 1000, minQty: 100 },
  { model: 'U 04', series: 'BU & U', sellingPrice: 1000, minQty: 100 },
  { model: 'U 05', series: 'BU & U', sellingPrice: 1000, minQty: 100 },
  { model: 'U 06', series: 'BU & U', sellingPrice: 1000, minQty: 100 },

  { model: 'GS 022', series: 'GS', sellingPrice: 1000, minQty: 100 },
  { model: 'GS 023', series: 'GS', sellingPrice: 1000, minQty: 100 },
  { model: 'GS 024', series: 'GS', sellingPrice: 1000, minQty: 100 },
  { model: 'GS 025', series: 'GS', sellingPrice: 1020, minQty: 100 },
  { model: 'GS 026', series: 'GS', sellingPrice: 1358, minQty: 100 },
  { model: 'GS 027', series: 'GS', sellingPrice: 1470, minQty: 100 },
  { model: 'GS 028', series: 'GS', sellingPrice: 1470, minQty: 100 },
  { model: 'GS 029', series: 'GS', sellingPrice: 1470, minQty: 100 },
  { model: 'GS 030', series: 'GS', sellingPrice: 1538, minQty: 100 },
  { model: 'GS 031', series: 'GS', sellingPrice: 1605, minQty: 100 },
  { model: 'GS 032', series: 'GS', sellingPrice: 3203, minQty: 100 },

  { model: 'RAYYA 366', series: 'RAYYA', sellingPrice: 1313, minQty: 100 },
  { model: 'RAYYA 367', series: 'RAYYA', sellingPrice: 1313, minQty: 100 },
  { model: 'RAYYA 368', series: 'RAYYA', sellingPrice: 1313, minQty: 100 },
  { model: 'RAYYA 369', series: 'RAYYA', sellingPrice: 1313, minQty: 100 },
];

const SERIES_VISUALS: Record<
  Exclude<BlankoSeries, 'Semua'>,
  {
    seriesLabel: string;
    image: string;
    previewStyle: PreviewThemeStyle;
    description: string;
  }
> = {
  AVIS: {
    seriesLabel: 'Blangko AVIS',
    image: '/assets/aistudio/image_a56f71cb.png',
    previewStyle: 'kraft-rustic',
    description:
      'Undangan blangko seri AVIS dengan desain klasik-modern yang ringkas, sudah termasuk cetak teks lengkap siap sebar.',
  },
  CANTIK: {
    seriesLabel: 'Blangko CANTIK',
    image: '/assets/aistudio/image_c6a0cd46.png',
    previewStyle: 'wax-ivory',
    description:
      'Undangan blangko seri CANTIK bernuansa floral lembut dan tata letak rapi, populer untuk acara akad maupun resepsi.',
  },
  HC: {
    seriesLabel: 'Blangko HC',
    image: '/assets/aistudio/image_209e5ab0.png',
    previewStyle: 'forest-ribbon',
    description:
      'Undangan blangko seri HC berpenampilan formal dan elegan dengan pilihan lipatan rapi dan komposisi warna seimbang.',
  },
  HEPI: {
    seriesLabel: 'Blangko HEPI',
    image: '/assets/aistudio/image_c15f888b.png',
    previewStyle: 'monochrome-fold',
    description:
      'Undangan blangko seri HEPI edisi 23 & 24 berdesain kontemporer minimalis, nyaman dibaca dan mudah dibagikan.',
  },
  GS: {
    seriesLabel: 'Blangko GS',
    image: '/assets/aistudio/image_faec82b2.png',
    previewStyle: 'botanical-hardcover',
    description:
      'Undangan blangko seri GS dengan variasi kertas tebal hingga model eksklusif berdetail ornamen elegan.',
  },
  RAYYA: {
    seriesLabel: 'Blangko RAYYA',
    image: '/assets/aistudio/image_b2dd84ba.png',
    previewStyle: 'forest-ribbon',
    description:
      'Undangan blangko seri RAYYA berkonsep anggun dengan sentuhan motif modern dan proporsi kartu yang serasi.',
  },
  'BU & U': {
    seriesLabel: 'Seri BU & U Hemat',
    image: '/assets/aistudio/image_1f6fdad3.png',
    previewStyle: 'kraft-rustic',
    description:
      'Pilihan seri blangko hemat model BU 01–06 dan U 01–06 dengan desain sederhana yang rapi dan ekonomis.',
  },
};

const MODEL_IMAGE_OVERRIDES: Record<string, string> = {
  'AVIS 128': '/assets/aistudio/image_a56f71cb.png',
  'AVIS 129': '/assets/aistudio/image_a0f1f77a.png',
  'AVIS 130': '/assets/aistudio/image_668eefe8.png',
  'AVIS 131': '/assets/aistudio/image_3e927c57.png',
  'AVIS 132': '/assets/aistudio/image_83ae548d.png',
  'CANTIK 94': '/assets/aistudio/image_c6a0cd46.png',
  'CANTIK 95': '/assets/aistudio/image_3d35984c.png',
  'CANTIK 96': '/assets/aistudio/image_39d99027.png',
  'CANTIK 97': '/assets/aistudio/image_784af3b0.png',
  'CANTIK 98': '/assets/aistudio/image_9d256128.png',
  'CANTIK 99': '/assets/aistudio/image_24638164.png',
  'CANTIK 100': '/assets/aistudio/image_5930a3d5.png',
  'CANTIK 101': '/assets/aistudio/image_9cd0fc64.png',
  'CANTIK 102': '/assets/aistudio/image_979e13ad.png',
  'CANTIK 103': '/assets/aistudio/image_0fc8828f.png',
  'CANTIK 104': '/assets/aistudio/image_9fd8d478.png',
  'CANTIK 105': '/assets/aistudio/image_4c984ffd.png',
  'CANTIK 106': '/assets/aistudio/image_864c02d6.png',
  'CANTIK 107': '/assets/aistudio/image_b44865aa.png',
  'HC 201': '/assets/aistudio/image_209e5ab0.png',
  'HC 202': '/assets/aistudio/image_865c21a2.png',
  'HC 203': '/assets/aistudio/image_81356de2.png',
  'HC 204': '/assets/aistudio/image_1a6d668e.png',
  'HC 205': '/assets/aistudio/image_d4e3e460.png',
  'HEPI 24.031': '/assets/aistudio/image_c15f888b.png',
  'HEPI 24.032': '/assets/aistudio/image_10603b96.png',
  'HEPI 24.033': '/assets/aistudio/image_cb775fdd.png',
  'HEPI 24.034': '/assets/aistudio/image_5d2b472c.png',
  'HEPI 24.035': '/assets/aistudio/image_496664a9.png',
  'HEPI 23.011': '/assets/aistudio/image_74a93d58.png',
  'HEPI 23.012': '/assets/aistudio/image_2b39d0ad.png',
  'HEPI 23.013': '/assets/aistudio/image_61156a2e.png',
  'HEPI 23.014': '/assets/aistudio/image_7a85bde7.png',
  'HEPI 23.015': '/assets/aistudio/image_31affdc4.png',
  'HEPI 23.016': '/assets/aistudio/image_3c51f913.png',
  'HEPI 23.023': '/assets/aistudio/image_3c786e52.png',
  'HEPI 23.024': '/assets/aistudio/image_b7d9c353.png',
  'HEPI 23.025': '/assets/aistudio/image_aa0f3dc5.png',
  'HEPI 23.026': '/assets/aistudio/image_3d2a2a50.png',
  'HEPI 23.027': '/assets/aistudio/image_f70672c8.png',
  'HEPI 23.028': '/assets/aistudio/image_a1f0a096.png',
  'GS 022': '/assets/aistudio/image_faec82b2.png',
  'GS 023': '/assets/aistudio/image_3f121f45.png',
  'GS 024': '/assets/aistudio/image_8e6685bd.png',
  'GS 025': '/assets/aistudio/image_d5b0ef98.png',
  'GS 026': '/assets/aistudio/image_76809d77.png',
  'GS 027': '/assets/aistudio/image_564318b7.png',
  'GS 028': '/assets/aistudio/image_1dc36a0b.png',
  'GS 029': '/assets/aistudio/image_a9d4570d.png',
  'GS 030': '/assets/aistudio/image_7cc8e9dd.png',
  'GS 031': '/assets/aistudio/image_9de563a6.png',
  'GS 032': '/assets/aistudio/image_74e5ca01.png',
  'RAYYA 366': '/assets/aistudio/image_b2dd84ba.png',
  'RAYYA 367': '/assets/aistudio/image_113560b4.png',
  'RAYYA 368': '/assets/aistudio/image_7dc3d2be.png',
  'RAYYA 369': '/assets/aistudio/image_17ad973f.png',
  'BU 01': '/assets/aistudio/image_1f6fdad3.png',
  'BU 02': '/assets/aistudio/image_d5e6ea30.png',
  'BU 03': '/assets/aistudio/image_3060f695.png',
  'BU 04': '/assets/aistudio/image_9bb805a7.png',
  'BU 05': '/assets/aistudio/image_f977c30b.png',
  'BU 06': '/assets/aistudio/image_ef7dc095.png',
  'U 01': '/assets/aistudio/image_d7e0121b.png',
  'U 02': '/assets/aistudio/image_30423166.png',
  'U 03': '/assets/aistudio/image_d68c8a9e.png',
  'U 04': '/assets/aistudio/image_d8a14aae.png',
  'U 05': '/assets/aistudio/image_634219f4.png',
  'U 06': '/assets/aistudio/image_cafa3b6a.png',
};

function getItemImage(row: RawBlankoRow): string {
  const normalizedModel = row.model.trim().toUpperCase().replace(/\s+/g, ' ');
  if (MODEL_IMAGE_OVERRIDES[normalizedModel]) {
    return MODEL_IMAGE_OVERRIDES[normalizedModel];
  }
  if (
    /^(BU|U)\s*0[1-6]$/i.test(normalizedModel) ||
    row.model === 'U 01 - 06' ||
    row.model === 'BU 01 - 06'
  )
    return imgKraftRustic;
  return SERIES_VISUALS[row.series].image;
}

export function buildCatalogItems(rows: RawBlankoRow[]): CatalogItem[] {
  return rows.map((row) => {
    const visual = SERIES_VISUALS[row.series];
    const slug = row.model
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    return {
      id: slug,
      model: row.model,
      series: row.series,
      seriesLabel: visual.seriesLabel,
      sellingPrice: Math.max(1000, row.sellingPrice),
      minQty: 100,
      image: getItemImage(row),
      imageAlt: `Undangan blangko cetak model ${row.model} seri ${row.series}`,
      shortDescription: visual.description,
      specs: [
        `Model resmi ${row.model} (${visual.seriesLabel})`,
        'Minimal pemesanan 100 pcs',
        'Sudah termasuk cetak teks nama mempelai, acara, & turut mengundang',
        'Gratis revisi layout proof digital sebelum naik cetak',
        'Termasuk plastik kemasan & label nama tamu polos/siap tempel',
      ],
      turnaround: '7–10 hari kerja setelah ACC desain',
      previewStyle: visual.previewStyle,
    };
  });
}

export const CATALOG_ITEMS: CatalogItem[] = buildCatalogItems(RAW_BLANKO_ROWS);
