import 'dotenv/config';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const DEFAULT_SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/1_mWbs0QHCOS_Q7F2J2Q2eeBDRQeRRwd5vZym-FxghK8/export?format=csv&gid=401798683';
const SHEET_CSV_URL =
  process.env.CATALOG_SHEET_CSV_URL || DEFAULT_SHEET_CSV_URL;

interface SheetBlankoRow {
  model: string;
  series:
    | 'AVIS'
    | 'CANTIK'
    | 'HC'
    | 'HEPI'
    | 'GS'
    | 'RAYYA'
    | 'BU & U';
  sellingPrice: number;
  minQty: number;
}

interface CacheState {
  items: SheetBlankoRow[];
  updatedAt: number;
}

const CACHE_TTL_MS = 15_000;
let sheetCache: CacheState | null = null;

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

function resolveSeries(model: string): SheetBlankoRow['series'] {
  const upper = model.toUpperCase();
  if (upper.startsWith('AVIS')) return 'AVIS';
  if (upper.startsWith('CANTIK')) return 'CANTIK';
  if (upper.startsWith('HC')) return 'HC';
  if (upper.startsWith('HEPI')) return 'HEPI';
  if (upper.startsWith('GS')) return 'GS';
  if (upper.startsWith('RAYYA')) return 'RAYYA';
  return 'BU & U';
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

function isExcludedModel(model: string): boolean {
  const compact = model.trim().replace(/\s+/g, ' ');
  return EXCLUDED_MODEL_PATTERNS.some((pattern) => pattern.test(compact));
}

function expandModelRange(model: string): string[] {
  const match = model.trim().match(/^(BU|U)\s*0?1\s*-\s*0?6$/i);
  if (!match) return [model];
  const prefix = match[1].toUpperCase();
  return ['01', '02', '03', '04', '05', '06'].map((num) => `${prefix} ${num}`);
}

function parseRupiahNumber(raw: string | undefined): number {
  if (!raw) return 0;
  const digits = raw.replace(/[^\d]/g, '');
  if (!digits) return 0;
  return parseInt(digits, 10);
}

async function fetchSheetCatalog(forceRefresh: boolean): Promise<SheetBlankoRow[]> {
  const now = Date.now();
  if (!forceRefresh && sheetCache && now - sheetCache.updatedAt < CACHE_TTL_MS) {
    return sheetCache.items;
  }

  const response = await fetch(SHEET_CSV_URL, {
    headers: {
      'Cache-Control': 'no-cache',
    },
  });

  if (!response.ok) {
    throw new Error(`Google Sheet fetch failed with status ${response.status}`);
  }

  const csvText = await response.text();
  const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) {
    throw new Error('Google Sheet CSV returned no data rows');
  }

  const headers = parseCsvLine(lines[0]).map((h) => h.toUpperCase());
  const modelIdx = headers.findIndex((h) => h === 'MODEL');
  const jualIdx = headers.findIndex((h) => h === 'JUAL');

  const mIdx = modelIdx >= 0 ? modelIdx : 0;
  const jIdx = jualIdx >= 0 ? jualIdx : 8;

  const seenModels = new Set<string>();
  const parsed: SheetBlankoRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = parseCsvLine(lines[i]);
    const model = (cols[mIdx] || '').trim();
    if (!model || isExcludedModel(model)) continue;

    const rawPrice = parseRupiahNumber(cols[jIdx]);
    if (rawPrice <= 0) continue;

    const minQty = 100;

    // Enforce minimum customer selling price of Rp 1.000
    const sellingPrice = Math.max(1000, rawPrice);

    for (const expandedModel of expandModelRange(model)) {
      const normalizedKey = expandedModel.toUpperCase();
      if (seenModels.has(normalizedKey)) continue;

      seenModels.add(normalizedKey);
      parsed.push({
        model: expandedModel,
        series: resolveSeries(expandedModel),
        sellingPrice,
        minQty,
      });
    }
  }

  if (parsed.length === 0) {
    throw new Error('No valid catalog items found in Google Sheet');
  }

  sheetCache = {
    items: parsed,
    updatedAt: now,
  };

  return parsed;
}

async function startServer() {
  const app = express();

  app.get('/api/catalog', async (req, res) => {
    const forceRefresh = req.query.refresh === '1';
    res.setHeader('Cache-Control', 'no-store');

    try {
      const items = await fetchSheetCatalog(forceRefresh);
      res.json({
        source: 'google-sheets',
        syncedAt: new Date().toISOString(),
        items,
      });
    } catch (error) {
      if (sheetCache) {
        res.json({
          source: 'cache-fallback',
          syncedAt: new Date(sheetCache.updatedAt).toISOString(),
          items: sheetCache.items,
        });
        return;
      }
      res.status(502).json({
        error: 'Gagal menyinkronkan Google Sheets',
        detail: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  });

  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      const indexFile = path.join(distDir, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(404).send('Build output not found');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Serasa Salam server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
