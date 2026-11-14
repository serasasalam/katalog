import {
  BlankoSeries,
  CatalogItem,
  HeroShowcaseSlide,
  PreviewThemeStyle,
} from '../types/catalog';

export const ADMIN_WHATSAPP_NUMBER = '6285156065215';

export const PUBLIC_SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/1_mWbs0QHCOS_Q7F2J2Q2eeBDRQeRRwd5vZym-FxghK8/export?format=csv&gid=401798683';

export function assetUrl(path: string): string {
  if (/^https?:\/\//i.test(path) || path.startsWith('data:')) return path;
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  if (path.startsWith(normalizedBase)) return path;
  return `${normalizedBase}${path.replace(/^\/+/, '')}`;
}

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
    image: assetUrl('/assets/catalog/image_c6a0cd46.webp'),
    imageAlt: 'Koleksi undangan blangko seri CANTIK dan AVIS siap cetak',
  },
  {
    id: 'slide-hepi',
    title: 'Seri HEPI & HC',
    countLabel: '22 Model · Mulai Rp 1.000/pcs',
    series: 'HEPI',
    image: assetUrl('/assets/catalog/image_c15f888b.webp'),
    imageAlt: 'Koleksi undangan blangko seri HEPI dan HC modern lipat',
  },
  {
    id: 'slide-gs',
    title: 'Seri GS Eksklusif',
    countLabel: '11 Model · Mulai Rp 1.000/pcs',
    series: 'GS',
    image: assetUrl('/assets/catalog/image_faec82b2.webp'),
    imageAlt: 'Koleksi undangan blangko eksklusif seri GS',
  },
  {
    id: 'slide-rayya',
    title: 'Seri RAYYA & BU/U',
    countLabel: '16 Model · Mulai Rp 1.000/pcs',
    series: 'RAYYA',
    image: assetUrl('/assets/catalog/image_b2dd84ba.webp'),
    imageAlt: 'Koleksi undangan blangko seri RAYYA dan BU / U',
  },
];

export const CATEGORY_BENTO_DATA = {
  populer: {
    countLabel: '36 Model Tersedia',
    title: 'Seri Ekonomis & Populer',
    description:
      'Pilihan undangan blangko favorit dengan harga ramah mulai Rp 1.000 per lembar—ideal untuk kebutuhan resepsi dan syukuran.',
    image: assetUrl('/assets/catalog/image_a56f71cb.webp'),
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
    image: assetUrl('/assets/catalog/image_10603b96.webp'),
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
    image: assetUrl('/assets/catalog/image_3f121f45.webp'),
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
    image: '/assets/catalog/image_a56f71cb.webp',
    previewStyle: 'kraft-rustic',
    description:
      'Undangan blangko seri AVIS dengan desain klasik-modern yang ringkas, sudah termasuk cetak teks lengkap siap sebar.',
  },
  CANTIK: {
    seriesLabel: 'Blangko CANTIK',
    image: '/assets/catalog/image_c6a0cd46.webp',
    previewStyle: 'wax-ivory',
    description:
      'Undangan blangko seri CANTIK bernuansa floral lembut dan tata letak rapi, populer untuk acara akad maupun resepsi.',
  },
  HC: {
    seriesLabel: 'Blangko HC',
    image: '/assets/catalog/image_209e5ab0.webp',
    previewStyle: 'forest-ribbon',
    description:
      'Undangan blangko seri HC berpenampilan formal dan elegan dengan pilihan lipatan rapi dan komposisi warna seimbang.',
  },
  HEPI: {
    seriesLabel: 'Blangko HEPI',
    image: '/assets/catalog/image_c15f888b.webp',
    previewStyle: 'monochrome-fold',
    description:
      'Undangan blangko seri HEPI edisi 23 & 24 berdesain kontemporer minimalis, nyaman dibaca dan mudah dibagikan.',
  },
  GS: {
    seriesLabel: 'Blangko GS',
    image: '/assets/catalog/image_faec82b2.webp',
    previewStyle: 'botanical-hardcover',
    description:
      'Undangan blangko seri GS dengan variasi kertas tebal hingga model eksklusif berdetail ornamen elegan.',
  },
  RAYYA: {
    seriesLabel: 'Blangko RAYYA',
    image: '/assets/catalog/image_b2dd84ba.webp',
    previewStyle: 'forest-ribbon',
    description:
      'Undangan blangko seri RAYYA berkonsep anggun dengan sentuhan motif modern dan proporsi kartu yang serasi.',
  },
  'BU & U': {
    seriesLabel: 'Seri BU & U Hemat',
    image: '/assets/catalog/image_1f6fdad3.webp',
    previewStyle: 'kraft-rustic',
    description:
      'Pilihan seri blangko hemat model BU 01–06 dan U 01–06 dengan desain sederhana yang rapi dan ekonomis.',
  },
};

const MODEL_IMAGE_OVERRIDES: Record<string, string> = {
  'AVIS 128': '/assets/catalog/image_a56f71cb.webp',
  'AVIS 129': '/assets/catalog/image_a0f1f77a.webp',
  'AVIS 130': '/assets/catalog/image_668eefe8.webp',
  'AVIS 131': '/assets/catalog/image_3e927c57.webp',
  'AVIS 132': '/assets/catalog/image_83ae548d.webp',
  'CANTIK 94': '/assets/catalog/image_c6a0cd46.webp',
  'CANTIK 95': '/assets/catalog/image_3d35984c.webp',
  'CANTIK 96': '/assets/catalog/image_39d99027.webp',
  'CANTIK 97': '/assets/catalog/image_784af3b0.webp',
  'CANTIK 98': '/assets/catalog/image_9d256128.webp',
  'CANTIK 99': '/assets/catalog/image_24638164.webp',
  'CANTIK 100': '/assets/catalog/image_5930a3d5.webp',
  'CANTIK 101': '/assets/catalog/image_9cd0fc64.webp',
  'CANTIK 102': '/assets/catalog/image_979e13ad.webp',
  'CANTIK 103': '/assets/catalog/image_0fc8828f.webp',
  'CANTIK 104': '/assets/catalog/image_9fd8d478.webp',
  'CANTIK 105': '/assets/catalog/image_4c984ffd.webp',
  'CANTIK 106': '/assets/catalog/image_864c02d6.webp',
  'CANTIK 107': '/assets/catalog/image_b44865aa.webp',
  'HC 201': '/assets/catalog/image_209e5ab0.webp',
  'HC 202': '/assets/catalog/image_865c21a2.webp',
  'HC 203': '/assets/catalog/image_81356de2.webp',
  'HC 204': '/assets/catalog/image_1a6d668e.webp',
  'HC 205': '/assets/catalog/image_d4e3e460.webp',
  'HEPI 24.031': '/assets/catalog/image_c15f888b.webp',
  'HEPI 24.032': '/assets/catalog/image_10603b96.webp',
  'HEPI 24.033': '/assets/catalog/image_cb775fdd.webp',
  'HEPI 24.034': '/assets/catalog/image_5d2b472c.webp',
  'HEPI 24.035': '/assets/catalog/image_496664a9.webp',
  'HEPI 23.011': '/assets/catalog/image_74a93d58.webp',
  'HEPI 23.012': '/assets/catalog/image_2b39d0ad.webp',
  'HEPI 23.013': '/assets/catalog/image_61156a2e.webp',
  'HEPI 23.014': '/assets/catalog/image_7a85bde7.webp',
  'HEPI 23.015': '/assets/catalog/image_31affdc4.webp',
  'HEPI 23.016': '/assets/catalog/image_3c51f913.webp',
  'HEPI 23.023': '/assets/catalog/image_3c786e52.webp',
  'HEPI 23.024': '/assets/catalog/image_b7d9c353.webp',
  'HEPI 23.025': '/assets/catalog/image_aa0f3dc5.webp',
  'HEPI 23.026': '/assets/catalog/image_3d2a2a50.webp',
  'HEPI 23.027': '/assets/catalog/image_f70672c8.webp',
  'HEPI 23.028': '/assets/catalog/image_a1f0a096.webp',
  'GS 022': '/assets/catalog/image_faec82b2.webp',
  'GS 023': '/assets/catalog/image_3f121f45.webp',
  'GS 024': '/assets/catalog/image_8e6685bd.webp',
  'GS 025': '/assets/catalog/image_d5b0ef98.webp',
  'GS 026': '/assets/catalog/image_76809d77.webp',
  'GS 027': '/assets/catalog/image_564318b7.webp',
  'GS 028': '/assets/catalog/image_1dc36a0b.webp',
  'GS 029': '/assets/catalog/image_a9d4570d.webp',
  'GS 030': '/assets/catalog/image_7cc8e9dd.webp',
  'GS 031': '/assets/catalog/image_9de563a6.webp',
  'GS 032': '/assets/catalog/image_74e5ca01.webp',
  'RAYYA 366': '/assets/catalog/image_b2dd84ba.webp',
  'RAYYA 367': '/assets/catalog/image_113560b4.webp',
  'RAYYA 368': '/assets/catalog/image_7dc3d2be.webp',
  'RAYYA 369': '/assets/catalog/image_17ad973f.webp',
  'BU 01': '/assets/catalog/image_1f6fdad3.webp',
  'BU 02': '/assets/catalog/image_d5e6ea30.webp',
  'BU 03': '/assets/catalog/image_3060f695.webp',
  'BU 04': '/assets/catalog/image_9bb805a7.webp',
  'BU 05': '/assets/catalog/image_f977c30b.webp',
  'BU 06': '/assets/catalog/image_ef7dc095.webp',
  'U 01': '/assets/catalog/image_d7e0121b.webp',
  'U 02': '/assets/catalog/image_30423166.webp',
  'U 03': '/assets/catalog/image_d68c8a9e.webp',
  'U 04': '/assets/catalog/image_d8a14aae.webp',
  'U 05': '/assets/catalog/image_634219f4.webp',
  'U 06': '/assets/catalog/image_cafa3b6a.webp',
};

function getItemImage(row: RawBlankoRow): string {
  const normalizedModel = row.model.trim().toUpperCase().replace(/\s+/g, ' ');
  if (MODEL_IMAGE_OVERRIDES[normalizedModel]) {
    return assetUrl(MODEL_IMAGE_OVERRIDES[normalizedModel]);
  }
  if (
    /^(BU|U)\s*0[1-6]$/i.test(normalizedModel) ||
    row.model === 'U 01 - 06' ||
    row.model === 'BU 01 - 06'
  )
    return assetUrl('/assets/catalog/image_1f6fdad3.webp');
  return assetUrl(SERIES_VISUALS[row.series].image);
}

const EXCLUDED_MODEL_PATTERNS = [
  /^HC\s*179\s*-\s*180$/i,
  /^HC\s*181\s*-\s*184$/i,
  /^HC\s*185\s*-\s*186$/i,
  /^JAVA\s*ETNIC$/i,
  /^INDIE\s*TP\s*FOIL$/i,
  /^INDIE\s*FOIL$/i,
  /^SC/i,
];

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

function resolveSeriesFromModel(model: string): RawBlankoRow['series'] {
  const upper = model.toUpperCase();
  if (upper.startsWith('AVIS')) return 'AVIS';
  if (upper.startsWith('CANTIK')) return 'CANTIK';
  if (upper.startsWith('HC')) return 'HC';
  if (upper.startsWith('HEPI')) return 'HEPI';
  if (upper.startsWith('GS')) return 'GS';
  if (upper.startsWith('RAYYA')) return 'RAYYA';
  return 'BU & U';
}

function expandModelRange(model: string): string[] {
  const match = model.trim().match(/^(BU|U)\s*0?1\s*-\s*0?6$/i);
  if (!match) return [model];
  const prefix = match[1].toUpperCase();
  return ['01', '02', '03', '04', '05', '06'].map((num) => `${prefix} ${num}`);
}

export async function fetchPublicSheetCatalog(): Promise<RawBlankoRow[]> {
  const response = await fetch(PUBLIC_SHEET_CSV_URL, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Sheet fetch failed: ${response.status}`);
  }
  const csvText = await response.text();
  const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) {
    throw new Error('Sheet CSV empty');
  }

  const headers = parseCsvLine(lines[0]).map((h) => h.toUpperCase());
  const modelIdx = headers.findIndex((h) => h === 'MODEL');
  const jualIdx = headers.findIndex((h) => h === 'JUAL');
  const mIdx = modelIdx >= 0 ? modelIdx : 0;
  const jIdx = jualIdx >= 0 ? jualIdx : 8;

  const seenModels = new Set<string>();
  const parsed: RawBlankoRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = parseCsvLine(lines[i]);
    const model = (cols[mIdx] || '').trim();
    const compact = model.replace(/\s+/g, ' ');
    if (!compact || EXCLUDED_MODEL_PATTERNS.some((p) => p.test(compact))) {
      continue;
    }

    const digits = (cols[jIdx] || '').replace(/[^\d]/g, '');
    const rawPrice = digits ? parseInt(digits, 10) : 0;
    if (rawPrice <= 0) continue;

    const sellingPrice = Math.max(1000, rawPrice);
    for (const expanded of expandModelRange(compact)) {
      const key = expanded.toUpperCase();
      if (seenModels.has(key)) continue;
      seenModels.add(key);
      parsed.push({
        model: expanded,
        series: resolveSeriesFromModel(expanded),
        sellingPrice,
        minQty: 100,
      });
    }
  }

  if (parsed.length === 0) {
    throw new Error('No catalog items parsed from CSV');
  }
  return parsed;
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
