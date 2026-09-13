import { ThaiDocBook, EnglishBook, VideoClip } from '../types';
import { RAW_SHEETS_CSV, parseCSVToBooks, ALL_DOC_BOOKS } from '../data/sheetsData';
import { RAW_VIDEOS_CSV, parseVideosCSV } from '../data/videosData';
import { GUTENBERG_SHEET_URL, parseEnglishBooksCSV, ENGLISH_BOOKS } from '../data/englishBooksData';

export interface SheetUrlsConfig {
  masterUrl?: string;
  sheet1Url?: string;
  sheet2Url?: string;
  sheet3Url?: string;
  englishUrl?: string;
}

export function getSheetUrls(): SheetUrlsConfig {
  try {
    if (typeof window !== 'undefined' && window.location) {
      const params = new URLSearchParams(window.location.search);
      const paramMaster = params.get('master') || params.get('sheet') || params.get('sheetUrl');
      const paramSheet1 = params.get('sheet1');
      const paramSheet2 = params.get('sheet2');
      const paramSheet3 = params.get('sheet3');
      const paramEnglish = params.get('english') || params.get('gutenberg');
      if (paramMaster) localStorage.setItem('interlib_master_url', paramMaster);
      if (paramSheet1) localStorage.setItem('interlib_sheet1_url', paramSheet1);
      if (paramSheet2) localStorage.setItem('interlib_sheet2_url', paramSheet2);
      if (paramSheet3) localStorage.setItem('interlib_sheet3_url', paramSheet3);
      if (paramEnglish) localStorage.setItem('interlib_english_url', paramEnglish);
    }
    return {
      masterUrl: localStorage.getItem('interlib_master_url') || '',
      sheet1Url: localStorage.getItem('interlib_sheet1_url') || '',
      sheet2Url: localStorage.getItem('interlib_sheet2_url') || '',
      sheet3Url: localStorage.getItem('interlib_sheet3_url') || '',
      englishUrl: localStorage.getItem('interlib_english_url') || GUTENBERG_SHEET_URL
    };
  } catch (e) {
    return { englishUrl: GUTENBERG_SHEET_URL };
  }
}

export function saveSheetUrls(config: SheetUrlsConfig): void {
  try {
    if (config.masterUrl !== undefined) localStorage.setItem('interlib_master_url', config.masterUrl);
    if (config.sheet1Url !== undefined) localStorage.setItem('interlib_sheet1_url', config.sheet1Url);
    if (config.sheet2Url !== undefined) localStorage.setItem('interlib_sheet2_url', config.sheet2Url);
    if (config.sheet3Url !== undefined) localStorage.setItem('interlib_sheet3_url', config.sheet3Url);
    if (config.englishUrl !== undefined) localStorage.setItem('interlib_english_url', config.englishUrl);
  } catch (e) {
    console.warn('Failed to save sheet URLs', e);
  }
}

export function resetSheetUrls(): void {
  try {
    localStorage.removeItem('interlib_master_url');
    localStorage.removeItem('interlib_sheet1_url');
    localStorage.removeItem('interlib_sheet2_url');
    localStorage.removeItem('interlib_sheet3_url');
    localStorage.removeItem('interlib_english_url');
    localStorage.removeItem('interlib_cached_sheet1_csv');
    localStorage.removeItem('interlib_cached_sheet2_csv');
    localStorage.removeItem('interlib_cached_sheet3_csv');
    localStorage.removeItem('interlib_cached_english_csv');
  } catch (e) {
    console.warn('Failed to reset sheet URLs', e);
  }
}

export function saveCachedSheetCsv(sheet: 'sheet1' | 'sheet2' | 'sheet3' | 'english', csv: string): void {
  try {
    localStorage.setItem(`interlib_cached_${sheet}_csv`, csv);
  } catch (e) {
    console.warn('Failed to cache sheet CSV', e);
  }
}

export function getCachedSheetCsv(sheet: 'sheet1' | 'sheet2' | 'sheet3' | 'english'): string | null {
  try {
    return localStorage.getItem(`interlib_cached_${sheet}_csv`);
  } catch (e) {
    return null;
  }
}

/**
 * Generate candidate CSV URLs for a Google Sheet URL
 */
export function buildCsvUrls(rawUrl: string, defaultGid: string = '0'): string[] {
  if (!rawUrl || !rawUrl.trim()) return [];
  const url = rawUrl.trim();
  const urls: string[] = [];

  // If already a published CSV URL
  if (url.includes('/pub') && url.includes('output=csv')) {
    urls.push(url);
  }

  // Extract spreadsheet ID
  const idMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (idMatch && idMatch[1]) {
    const sheetId = idMatch[1];
    const gidMatch = url.match(/[?&#]gid=(\d+)/);
    const gid = gidMatch ? gidMatch[1] : defaultGid;

    // 1. gviz CSV endpoint (reliable, doesn't trigger exportSizeLimitExceeded)
    urls.push(`https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&gid=${gid}`);
    // 2. export?format=csv endpoint
    urls.push(`https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`);
    // 3. pub CSV endpoint
    urls.push(`https://docs.google.com/spreadsheets/d/${sheetId}/pub?output=csv&gid=${gid}`);
  }

  // Raw URL
  if (!urls.includes(url)) {
    urls.push(url);
  }

  return urls;
}

function isValidCsv(text: string): boolean {
  if (!text || text.length < 20) return false;
  const trimmed = text.trim();
  if (
    trimmed.startsWith('<!DOCTYPE') ||
    trimmed.startsWith('<html') ||
    trimmed.startsWith('{') ||
    trimmed.includes('<title>Error') ||
    trimmed.includes('exportSizeLimitExceeded') ||
    trimmed.includes('"error"')
  ) {
    return false;
  }
  const lines = trimmed.split('\n');
  return lines.length >= 2;
}

/**
 * Fetch live sheet CSV with direct request + CORS proxy fallbacks
 */
export async function fetchLiveSheetCsv(csvUrl: string): Promise<string | null> {
  const candidateUrls = buildCsvUrls(csvUrl);

  for (const directUrl of candidateUrls) {
    // 1. Direct fetch with cache buster
    try {
      const cacheBuster = `_cb=${Date.now()}`;
      const sep = directUrl.includes('?') ? '&' : '?';
      const fetchUrl = `${directUrl}${sep}${cacheBuster}`;

      const res = await fetch(fetchUrl, {
        method: 'GET',
        cache: 'no-store',
        headers: { Accept: 'text/csv,text/plain,*/*' }
      });

      if (res.ok) {
        const text = await res.text();
        if (isValidCsv(text)) {
          return text;
        }
      }
    } catch (e) {
      // direct fetch failed (e.g. CORS)
    }

    // 2. AllOrigins CORS proxy
    try {
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(directUrl)}&_t=${Date.now()}`;
      const res = await fetch(proxyUrl, { method: 'GET', cache: 'no-store' });
      if (res.ok) {
        const text = await res.text();
        if (isValidCsv(text)) {
          return text;
        }
      }
    } catch (e) {}

    // 3. CodeTabs CORS proxy
    try {
      const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(directUrl)}`;
      const res = await fetch(proxyUrl, { method: 'GET', cache: 'no-store' });
      if (res.ok) {
        const text = await res.text();
        if (isValidCsv(text)) {
          return text;
        }
      }
    } catch (e) {}
  }

  return null;
}

/**
 * Merge CSV chunks by retaining the header from the first chunk
 * and omitting headers from subsequent 1,000-row chunks
 */
function mergeCsvChunks(chunks: string[]): string {
  if (!chunks.length) return '';
  const mergedLines: string[] = [];
  chunks.forEach((chunk, index) => {
    const lines = chunk.trim().split(/\r?\n/).filter((l) => l.trim().length > 0);
    if (lines.length === 0) return;
    if (index === 0) {
      mergedLines.push(...lines);
    } else {
      // Check if line 0 is a header (e.g. doesn't have http or matches known headers)
      const firstLineHasUrl = lines[0].includes('http://') || lines[0].includes('https://');
      const startIdx = firstLineHasUrl ? 0 : 1;
      mergedLines.push(...lines.slice(startIdx));
    }
  });
  return mergedLines.join('\n');
}

/**
 * Fetches Google Sheet CSV in batches of 1,000 rows using GViz limit & offset.
 * "ดึงทีละ 1000 เล่ม หากไม่ถึงดึงทั้งหมดที่มี"
 * - If the sheet has fewer than 1,000 rows, it retrieves all rows in the first request.
 * - If the sheet has 1,000 or more rows, it automatically requests subsequent batches
 *   (offset 1000, offset 2000...) until all rows are retrieved.
 * - Falls back to direct/proxy export if GViz paging is unavailable.
 */
export async function fetchLiveSheetCsvInBatches(
  rawUrl: string,
  onBatchProgress?: (batchIndex: number, currentRows: number) => void
): Promise<string | null> {
  if (!rawUrl || !rawUrl.trim()) return null;
  const url = rawUrl.trim();

  // Extract spreadsheet ID and gid
  const idMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  const gidMatch = url.match(/[?&#]gid=(\d+)/);
  const sheetId = idMatch ? idMatch[1] : null;
  const gid = gidMatch ? gidMatch[1] : '0';

  // If not a standard Google Docs spreadsheet URL, use standard fetch
  if (!sheetId) {
    return fetchLiveSheetCsv(url);
  }

  const batchSize = 1000;
  let offset = 0;
  const chunks: string[] = [];
  let totalRows = 0;
  let batchIndex = 0;
  const maxBatches = 20; // safety ceiling: up to 20,000 books per sheet

  while (batchIndex < maxBatches) {
    batchIndex++;
    const gvizBatchUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&gid=${gid}&tq=${encodeURIComponent(
      `limit ${batchSize} offset ${offset}`
    )}`;

    let chunkText: string | null = null;

    // 1. Direct fetch
    try {
      const fetchUrl = `${gvizBatchUrl}&_cb=${Date.now()}`;
      const res = await fetch(fetchUrl, {
        method: 'GET',
        cache: 'no-store',
        headers: { Accept: 'text/csv,text/plain,*/*' }
      });
      if (res.ok) {
        const text = await res.text();
        if (isValidCsv(text)) {
          chunkText = text;
        }
      }
    } catch (e) {
      // Direct fetch failed
    }

    // 2. AllOrigins proxy fallback
    if (!chunkText) {
      try {
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(gvizBatchUrl)}&_t=${Date.now()}`;
        const res = await fetch(proxyUrl, { method: 'GET', cache: 'no-store' });
        if (res.ok) {
          const text = await res.text();
          if (isValidCsv(text)) {
            chunkText = text;
          }
        }
      } catch (e) {}
    }

    // 3. CodeTabs proxy fallback
    if (!chunkText) {
      try {
        const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(gvizBatchUrl)}`;
        const res = await fetch(proxyUrl, { method: 'GET', cache: 'no-store' });
        if (res.ok) {
          const text = await res.text();
          if (isValidCsv(text)) {
            chunkText = text;
          }
        }
      } catch (e) {}
    }

    // If chunk fetch failed on the first batch, fallback to fetching the complete sheet via export
    if (!chunkText) {
      if (chunks.length === 0) {
        return fetchLiveSheetCsv(url);
      }
      break; // End of chunks
    }

    const lines = chunkText.trim().split(/\r?\n/).filter((l) => l.trim().length > 0);
    // Exclude header row from count
    const dataRowsInChunk = Math.max(0, lines.length - 1);
    totalRows += dataRowsInChunk;
    chunks.push(chunkText);

    onBatchProgress?.(batchIndex, totalRows);

    // "หากไม่ถึงดึงทั้งหมดที่มี": If returned data rows are fewer than 1000,
    // we have retrieved all available rows in this sheet!
    if (dataRowsInChunk < batchSize) {
      break;
    }

    // Advance offset to the next 1,000 rows
    offset += batchSize;
  }

  if (chunks.length > 0) {
    return mergeCsvChunks(chunks);
  }

  return fetchLiveSheetCsv(url);
}

export interface SyncProgressInfo {
  step: number;
  total: number;
  sheetName: string;
  isComplete: boolean;
}

export interface SyncThaiResult {
  allBooks: ThaiDocBook[];
  sheet1Count: number;
  sheet2Count: number;
  sheet3Count: number;
}

/**
 * Fast direct sync specifically for Home page Thai Doc books (Sheets 1, 2, and 3)
 * Guaranteed to pull from all 3 sheet URLs in batches of 1,000,
 * or all available if under 1,000, and merge all 3 sheets for the front page.
 */
export async function syncThaiBooksOnly(
  onProgress?: (status: string) => void
): Promise<SyncThaiResult> {
  const urls = getSheetUrls();

  // Target URLs for the 3 sheets
  const sheet1Target = urls.sheet1Url || (urls.masterUrl ? `${urls.masterUrl}#gid=0` : '');
  const sheet2Target = urls.sheet2Url || (urls.masterUrl ? `${urls.masterUrl}#gid=1` : '');
  const sheet3Target = urls.sheet3Url || (urls.masterUrl ? `${urls.masterUrl}#gid=2` : '');

  // 1. Fetch Sheet 1 (ชุดที่ 1)
  onProgress?.('กำลังดึงข้อมูลชีท 1 (ทีละ 1,000 เล่ม)...');
  let csv1 = getCachedSheetCsv('sheet1');
  if (sheet1Target) {
    try {
      const live1 = await fetchLiveSheetCsvInBatches(sheet1Target, (batch, count) => {
        onProgress?.(`กำลังดึงชีท 1: ชุดที่ ${batch} (${count.toLocaleString()} เล่ม)...`);
      });
      if (live1 && isValidCsv(live1)) {
        csv1 = live1;
        saveCachedSheetCsv('sheet1', live1);
      }
    } catch (e) {
      console.warn('Sheet 1 batch fetch fallback to cache/defaults');
    }
  }
  if (!csv1 || !isValidCsv(csv1)) {
    csv1 = RAW_SHEETS_CSV.sheet1;
  }
  const books1 = parseCSVToBooks(csv1, 1);

  // 2. Fetch Sheet 2 (ชุดที่ 2)
  onProgress?.('กำลังดึงข้อมูลชีท 2 (ทีละ 1,000 เล่ม)...');
  let csv2 = getCachedSheetCsv('sheet2');
  if (sheet2Target) {
    try {
      const live2 = await fetchLiveSheetCsvInBatches(sheet2Target, (batch, count) => {
        onProgress?.(`กำลังดึงชีท 2: ชุดที่ ${batch} (${count.toLocaleString()} เล่ม)...`);
      });
      if (live2 && isValidCsv(live2)) {
        csv2 = live2;
        saveCachedSheetCsv('sheet2', live2);
      }
    } catch (e) {
      console.warn('Sheet 2 batch fetch fallback to cache/defaults');
    }
  }
  if (!csv2 || !isValidCsv(csv2)) {
    csv2 = RAW_SHEETS_CSV.sheet2;
  }
  const books2 = parseCSVToBooks(csv2, 2);

  // 3. Fetch Sheet 3 (ชุดที่ 3)
  onProgress?.('กำลังดึงข้อมูลชีท 3 (ทีละ 1,000 เล่ม)...');
  let csv3 = getCachedSheetCsv('sheet3');
  if (sheet3Target) {
    try {
      const live3 = await fetchLiveSheetCsvInBatches(sheet3Target, (batch, count) => {
        onProgress?.(`กำลังดึงชีท 3: ชุดที่ ${batch} (${count.toLocaleString()} เล่ม)...`);
      });
      if (live3 && isValidCsv(live3)) {
        csv3 = live3;
        saveCachedSheetCsv('sheet3', live3);
      }
    } catch (e) {
      console.warn('Sheet 3 batch fetch fallback to cache/defaults');
    }
  }
  if (!csv3 || !isValidCsv(csv3)) {
    csv3 = RAW_SHEETS_CSV.sheet3;
  }
  const books3 = parseCSVToBooks(csv3, 3);

  // Combine ALL 3 sheets seamlessly
  const allBooksRaw = [...books1, ...books2, ...books3];
  const seen = new Set<string>();
  const uniqueBooks: ThaiDocBook[] = [];

  for (const b of allBooksRaw) {
    const key = b.docId || b.url || b.title;
    if (!seen.has(key)) {
      seen.add(key);
      uniqueBooks.push(b);
    }
  }

  const finalBooks = uniqueBooks.length > 0 ? uniqueBooks : ALL_DOC_BOOKS;
  onProgress?.(`ดึงข้อมูลครบ 3 ชีท รวมทั้งหมด ${finalBooks.length.toLocaleString()} เล่ม`);

  return {
    allBooks: finalBooks,
    sheet1Count: books1.length,
    sheet2Count: books2.length,
    sheet3Count: books3.length
  };
}

/**
 * Sequentially refreshes each of the 5 sheets on entering the app or when requested by user
 */
export async function syncAllFiveSheetsSequentially(
  onProgress?: (info: SyncProgressInfo) => void
): Promise<{
  thaiBooks: ThaiDocBook[];
  englishBooks: EnglishBook[];
  videos: VideoClip[];
}> {
  const urls = getSheetUrls();

  // Step 1: Sheet 1 (นิยายชุดที่ 1)
  onProgress?.({ step: 1, total: 5, sheetName: 'นิยายชุดที่ 1', isComplete: false });
  let csv1 = getCachedSheetCsv('sheet1') || RAW_SHEETS_CSV.sheet1;
  const sheet1TargetUrl = urls.sheet1Url || (urls.masterUrl ? `${urls.masterUrl}#gid=0` : '');
  if (sheet1TargetUrl) {
    try {
      const live1 = await fetchLiveSheetCsvInBatches(sheet1TargetUrl);
      if (live1 && isValidCsv(live1)) {
        csv1 = live1;
        saveCachedSheetCsv('sheet1', live1);
      }
    } catch (e) {
      console.warn('Sheet 1 live fetch fallback to cache/defaults');
    }
  }
  const books1 = parseCSVToBooks(csv1, 1);
  await new Promise((r) => setTimeout(r, 120));

  // Step 2: Sheet 2 (นิยายชุดที่ 2)
  onProgress?.({ step: 2, total: 5, sheetName: 'นิยายชุดที่ 2', isComplete: false });
  let csv2 = getCachedSheetCsv('sheet2') || RAW_SHEETS_CSV.sheet2;
  const sheet2TargetUrl = urls.sheet2Url || (urls.masterUrl ? `${urls.masterUrl}#gid=1` : '');
  if (sheet2TargetUrl) {
    try {
      const live2 = await fetchLiveSheetCsvInBatches(sheet2TargetUrl);
      if (live2 && isValidCsv(live2)) {
        csv2 = live2;
        saveCachedSheetCsv('sheet2', live2);
      }
    } catch (e) {
      console.warn('Sheet 2 live fetch fallback to cache/defaults');
    }
  }
  const books2 = parseCSVToBooks(csv2, 2);
  await new Promise((r) => setTimeout(r, 120));

  // Step 3: Sheet 3 (นิยายชุดที่ 3)
  onProgress?.({ step: 3, total: 5, sheetName: 'นิยายชุดที่ 3', isComplete: false });
  let csv3 = getCachedSheetCsv('sheet3') || RAW_SHEETS_CSV.sheet3;
  const sheet3TargetUrl = urls.sheet3Url || (urls.masterUrl ? `${urls.masterUrl}#gid=2` : '');
  if (sheet3TargetUrl) {
    try {
      const live3 = await fetchLiveSheetCsvInBatches(sheet3TargetUrl);
      if (live3 && isValidCsv(live3)) {
        csv3 = live3;
        saveCachedSheetCsv('sheet3', live3);
      }
    } catch (e) {
      console.warn('Sheet 3 live fetch fallback to cache/defaults');
    }
  }
  const books3 = parseCSVToBooks(csv3, 3);
  await new Promise((r) => setTimeout(r, 120));

  const rawThaiBooks: ThaiDocBook[] = [...books1, ...books2, ...books3];
  const seenThai = new Set<string>();
  const allThaiBooks: ThaiDocBook[] = [];
  for (const b of rawThaiBooks) {
    const key = b.docId || b.url || b.title;
    if (!seenThai.has(key)) {
      seenThai.add(key);
      allThaiBooks.push(b);
    }
  }

  // Step 4: Sheet 4 (หนังสือภาษาอังกฤษจากชีตนี้)
  onProgress?.({ step: 4, total: 5, sheetName: 'หนังสืออังกฤษ', isComplete: false });
  let allEnglishBooks: EnglishBook[] = [];
  const cachedEn = getCachedSheetCsv('english');
  if (cachedEn) {
    const parsed = parseEnglishBooksCSV(cachedEn);
    if (parsed.length > 0) allEnglishBooks = parsed;
  }
  if (allEnglishBooks.length === 0) {
    allEnglishBooks = ENGLISH_BOOKS;
  }

  const englishTargetUrl = urls.englishUrl || GUTENBERG_SHEET_URL;
  if (englishTargetUrl) {
    try {
      const liveEn = await fetchLiveSheetCsv(englishTargetUrl);
      if (liveEn && isValidCsv(liveEn)) {
        const parsed = parseEnglishBooksCSV(liveEn);
        if (parsed.length > 0) {
          allEnglishBooks = parsed;
          saveCachedSheetCsv('english', liveEn);
        }
      }
    } catch (err) {
      console.warn('English books sheet live fetch fallback:', err);
    }
  }
  await new Promise((r) => setTimeout(r, 120));

  // Step 5: Sheet 5 (Videos)
  onProgress?.({ step: 5, total: 5, sheetName: 'วิดีโอพอตแคสต์', isComplete: false });
  await new Promise((r) => setTimeout(r, 120));
  const videos: VideoClip[] = parseVideosCSV(RAW_VIDEOS_CSV);

  // Final complete state
  onProgress?.({ step: 5, total: 5, sheetName: 'อัพเดทสำเร็จ', isComplete: true });

  return {
    thaiBooks: allThaiBooks,
    englishBooks: allEnglishBooks,
    videos
  };
}
