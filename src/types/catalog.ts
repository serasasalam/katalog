export type BlankoSeries =
  | 'Semua'
  | 'AVIS'
  | 'CANTIK'
  | 'HC'
  | 'HEPI'
  | 'GS'
  | 'RAYYA'
  | 'BU & U';

export type PriceTierFilter =
  | 'Semua Model'
  | 'Ekonomis (Rp 1.000)'
  | 'Menengah (Rp 1.001 – Rp 1.500)'
  | 'Eksklusif (> Rp 1.500)';

export type SortOption =
  | 'series-default'
  | 'price-asc'
  | 'price-desc'
  | 'name-asc';

export type PreviewThemeStyle =
  | 'botanical-hardcover'
  | 'monochrome-fold'
  | 'wax-ivory'
  | 'forest-ribbon'
  | 'kraft-rustic'
  | 'javanese-emerald';

export interface CatalogItem {
  id: string;
  model: string;
  series: Exclude<BlankoSeries, 'Semua'>;
  seriesLabel: string;
  sellingPrice: number; // Harga Jual per pcs (hanya harga jual untuk customer)
  minQty: number; // Minimal order dalam pcs (100 atau 500)
  image: string;
  imageAlt: string;
  shortDescription: string;
  specs: string[];
  turnaround: string;
  previewStyle: PreviewThemeStyle;
}

export interface HeroShowcaseSlide {
  id: string;
  title: string;
  countLabel: string;
  series: Exclude<BlankoSeries, 'Semua'>;
  image: string;
  imageAlt: string;
}

export interface CartEntry {
  productId: string;
  quantity: number; // Jumlah dalam pcs (kelipatan 50, minimal minQty)
}
