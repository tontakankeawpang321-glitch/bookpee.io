import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  X,
  ArrowLeft,
  Heart,
  RefreshCw,
  BookOpen,
  Sun,
  Moon,
} from 'lucide-react';
import { ThaiDocBook } from '../types';
import { getGoogleDocsId } from '../data/sheetsData';

interface DocReaderModalProps {
  book: ThaiDocBook | null;
  onClose: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: (book: ThaiDocBook) => void;
}

type ReaderTheme = 'light' | 'sepia' | 'dark';
type ViewMode = 'web' | 'mobilebasic' | 'preview';

// In-memory cache for fetched HTML documents to make opening instantaneous
const docHtmlCache = new Map<string, string>();

/**
 * Transforms raw exported Google Docs HTML into a modern, 100% responsive
 * web reading article that wraps text naturally, removes desktop paper constraints,
 * scales smoothly, and scrolls natively like any website.
 */
function processGoogleDocHtml(
  rawHtml: string,
  theme: ReaderTheme,
  fontSize: number
): string {
  const themeStyles = {
    light: {
      bg: '#ffffff',
      bodyBg: '#fcfbf9',
      text: '#1e293b',
      textMuted: '#64748b',
      heading: '#0f172a',
      divider: '#e2e8f0',
      codeBg: '#f1f5f9',
    },
    sepia: {
      bg: '#fbf4e6',
      bodyBg: '#f6eedc',
      text: '#3b2f21',
      textMuted: '#78624a',
      heading: '#291d10',
      divider: '#ebd9bf',
      codeBg: '#efe4cf',
    },
    dark: {
      bg: '#0f172a',
      bodyBg: '#090d16',
      text: '#e2e8f0',
      textMuted: '#94a3b8',
      heading: '#f8fafc',
      divider: '#1e293b',
      codeBg: '#1e293b',
    },
  }[theme];

  const customStyle = `
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
    <style id="web-responsive-reader-style">
      *, *::before, *::after {
        box-sizing: border-box !important;
      }
      html {
        margin: 0 !important;
        padding: 0 !important;
        background-color: ${themeStyles.bodyBg} !important;
        color: ${themeStyles.text} !important;
        scroll-behavior: smooth !important;
        -webkit-text-size-adjust: 100% !important;
      }
      body, .c7 {
        margin: 0 auto !important;
        max-width: 760px !important;
        width: 100% !important;
        min-height: 100vh !important;
        padding: 24px 20px 100px 20px !important;
        background-color: ${themeStyles.bg} !important;
        color: ${themeStyles.text} !important;
        font-family: 'Sarabun', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans Thai', sans-serif !important;
        font-size: ${fontSize}px !important;
        line-height: 1.85 !important;
        word-wrap: break-word !important;
        overflow-wrap: break-word !important;
        overflow-x: hidden !important;
        box-shadow: 0 0 40px rgba(0,0,0,0.04) !important;
      }

      @media (max-width: 640px) {
        body, .c7 {
          padding: 18px 16px 80px 16px !important;
        }
      }

      /* Clean typography resets */
      p, li, blockquote {
        max-width: 100% !important;
        line-height: 1.85 !important;
        word-break: break-word !important;
        font-size: ${fontSize}px !important;
      }

      p {
        margin-top: 0 !important;
        margin-bottom: 1.25em !important;
      }

      p span, li span, blockquote span {
        font-size: ${fontSize}px !important;
      }

      h1 span, h2 span, h3 span, h4 span, .title span {
        font-size: inherit !important;
      }

      /* Force appropriate colors in sepia and dark mode */
      ${theme === 'dark' ? `
        body, p, span, li, a, h1, h2, h3, h4, h5, h6, table, td, th {
          color: ${themeStyles.text} !important;
        }
        h1, h2, h3, h4, strong, b {
          color: ${themeStyles.heading} !important;
        }
        span[style*="color"] {
          color: ${themeStyles.text} !important;
        }
        a {
          color: #60a5fa !important;
        }
      ` : theme === 'sepia' ? `
        body, p, span, li, a, h1, h2, h3, h4, h5, h6, table, td, th {
          color: ${themeStyles.text} !important;
        }
        h1, h2, h3, h4, strong, b {
          color: ${themeStyles.heading} !important;
        }
        span[style*="color"] {
          color: ${themeStyles.text} !important;
        }
        a {
          color: #854d0e !important;
        }
      ` : ''}

      /* Heading scale */
      h1, .title {
        font-size: ${Math.round(fontSize * 1.55)}px !important;
        font-weight: 700 !important;
        line-height: 1.35 !important;
        margin-top: 1.8em !important;
        margin-bottom: 0.8em !important;
        color: ${themeStyles.heading} !important;
        border-bottom: 1px solid ${themeStyles.divider} !important;
        padding-bottom: 8px !important;
      }

      h2 {
        font-size: ${Math.round(fontSize * 1.35)}px !important;
        font-weight: 700 !important;
        line-height: 1.4 !important;
        margin-top: 1.5em !important;
        margin-bottom: 0.6em !important;
        color: ${themeStyles.heading} !important;
      }

      h3 {
        font-size: ${Math.round(fontSize * 1.2)}px !important;
        font-weight: 600 !important;
        line-height: 1.45 !important;
        margin-top: 1.3em !important;
        margin-bottom: 0.5em !important;
        color: ${themeStyles.heading} !important;
      }

      /* Responsive Google Docs images & wrappers */
      .doc-img-wrapper,
      p:has(img),
      span:has(img),
      div:has(img) {
        max-width: 100% !important;
        width: 100% !important;
        height: auto !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        margin: 20px auto !important;
        padding: 0 !important;
        overflow: visible !important;
        text-align: center !important;
        clear: both !important;
      }

      img,
      .doc-img-responsive {
        max-width: 100% !important;
        width: auto !important;
        height: auto !important;
        max-height: 82vh !important;
        display: block !important;
        margin: 0 auto !important;
        object-fit: contain !important;
        border-radius: 12px !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12) !important;
      }

      p:has(img) {
        margin: 16px 0 !important;
        text-align: center !important;
      }

      /* Responsive tables */
      table {
        max-width: 100% !important;
        width: 100% !important;
        margin: 20px 0 !important;
        border-collapse: collapse !important;
        overflow-x: auto !important;
        display: block !important;
        border: 1px solid ${themeStyles.divider} !important;
        border-radius: 8px !important;
      }
      td, th {
        padding: 8px 12px !important;
        border: 1px solid ${themeStyles.divider} !important;
      }

      /* Selection highlight */
      ::selection {
        background-color: ${theme === 'dark' ? '#3b82f6' : '#bfdbfe'} !important;
        color: ${theme === 'dark' ? '#ffffff' : '#1e3a8a'} !important;
      }

      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 6px;
      }
      ::-webkit-scrollbar-track {
        background: transparent;
      }
      ::-webkit-scrollbar-thumb {
        background: ${theme === 'dark' ? '#334155' : '#cbd5e1'};
        border-radius: 999px;
      }
    </style>
    <script>
      // Report reading progress to parent
      (function() {
        let lastReport = 0;
        function sendProgress() {
          const now = Date.now();
          if (now - lastReport < 60) return;
          lastReport = now;
          const total = document.documentElement.scrollHeight - window.innerHeight;
          const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
          window.parent.postMessage({ type: 'READER_SCROLL_PROGRESS', progress: Math.min(100, Math.max(0, progress)) }, '*');
        }
        window.addEventListener('scroll', sendProgress, { passive: true });
        window.addEventListener('resize', sendProgress, { passive: true });
        setTimeout(sendProgress, 500);
      })();
    </script>
  `;

  // Normalize Google Docs image wrappers and images to fit mobile screen nicely
  const normalizedHtml = rawHtml
    .replace(/<span\s+style="([^"]*)"([^>]*)>(\s*<img)/gi, (match, style, rest, img) => {
      if (style.includes('width') || style.includes('overflow') || style.includes('transform')) {
        return `<span class="doc-img-wrapper"${rest}>${img}`;
      }
      return match;
    })
    .replace(/(<img\s+[^>]*?style=")([^"]*)(")/gi, (match, prefix, style, suffix) => {
      return `${prefix}max-width: 100% !important; width: auto !important; height: auto !important; max-height: 82vh !important; display: block !important; margin: 0 auto !important; object-fit: contain !important;${suffix}`;
    });

  // Inject our custom responsive style before </head>
  if (normalizedHtml.includes('</head>')) {
    return normalizedHtml.replace('</head>', `${customStyle}</head>`);
  }
  return `${customStyle}${normalizedHtml}`;
}

export const DocReaderModal: React.FC<DocReaderModalProps> = ({
  book,
  onClose,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const [rawHtml, setRawHtml] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<ViewMode>('web');
  const [fontSize, setFontSize] = useState<number>(17); // Default comfortable reading size
  const [theme, setTheme] = useState<ReaderTheme>('light');
  const [readingProgress, setReadingProgress] = useState<number>(0);

  const docId = useMemo(() => {
    if (!book) return '';
    return getGoogleDocsId(book.url || book.previewUrl);
  }, [book]);

  // URLs
  const exportHtmlUrl = useMemo(() => {
    return docId ? `https://docs.google.com/document/d/${docId}/export?format=html` : '';
  }, [docId]);

  const mobileBasicUrl = useMemo(() => {
    return docId ? `https://docs.google.com/document/d/${docId}/mobilebasic` : (book?.previewUrl || '');
  }, [docId, book]);

  const originalDocUrl = useMemo(() => {
    return book?.url || (docId ? `https://docs.google.com/document/d/${docId}/edit` : '');
  }, [book, docId]);

  // Fetch document HTML for native web reading
  const fetchDocHtml = useCallback(async (id: string, force = false) => {
    if (!id) {
      setHasError(true);
      setIsLoading(false);
      return;
    }

    if (!force && docHtmlCache.has(id)) {
      setRawHtml(docHtmlCache.get(id)!);
      setIsLoading(false);
      setHasError(false);
      return;
    }

    setIsLoading(true);
    setHasError(false);

    try {
      const url = `https://docs.google.com/document/d/${id}/export?format=html`;
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const text = await res.text();
      if (!text || text.length < 50) {
        throw new Error('Empty document content');
      }

      docHtmlCache.set(id, text);
      setRawHtml(text);
      setIsLoading(false);
      setHasError(false);
    } catch (err) {
      console.warn('Direct web fetch failed, falling back to mobile web view:', err);
      // Fallback: If direct HTML export is blocked by CORS, switch to Google mobilebasic web view
      setHasError(true);
      setViewMode('mobilebasic');
      setIsLoading(false);
    }
  }, []);

  // Fetch on book open
  useEffect(() => {
    if (docId) {
      fetchDocHtml(docId);
    } else {
      setIsLoading(false);
    }
  }, [docId, fetchDocHtml]);

  // Listen to reading scroll progress from iframe
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.type === 'READER_SCROLL_PROGRESS') {
        const p = typeof e.data.progress === 'number' ? e.data.progress : 0;
        setReadingProgress(Math.round(p));
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Process HTML with current responsive theme & font size
  const processedHtml = useMemo(() => {
    if (!rawHtml) return null;
    return processGoogleDocHtml(rawHtml, theme, fontSize);
  }, [rawHtml, theme, fontSize]);

  if (!book) return null;

  return (
    <div
      id="doc-reader-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm transition-all"
    >
      <div
        className={`relative flex flex-col w-full h-full md:h-[95vh] md:max-w-4xl md:rounded-2xl overflow-hidden shadow-2xl transition-colors duration-200 ${
          theme === 'dark'
            ? 'bg-slate-900 text-slate-100'
            : theme === 'sepia'
            ? 'bg-[#f8f2e4] text-[#3d2f21]'
            : 'bg-white text-slate-800'
        }`}
      >
        {/* Top Reading Progress Bar */}
        <div className="w-full h-1 bg-slate-200/40 dark:bg-slate-800/60 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-150 ease-out"
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        {/* Header Row 1: Book Info, Favorite & Close Button */}
        <div
          className={`flex items-center justify-between px-3 sm:px-5 py-2.5 border-b z-20 transition-colors ${
            theme === 'dark'
              ? 'border-slate-800 bg-slate-900/95'
              : theme === 'sepia'
              ? 'border-[#eddcc5] bg-[#f8f2e4]/95'
              : 'border-slate-200/80 bg-white/95'
          }`}
        >
          {/* Left: Back / Close & Book Title */}
          <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-2">
            <button
              onClick={onClose}
              id="reader-back-btn"
              className={`p-2 rounded-xl transition-colors shrink-0 ${
                theme === 'dark'
                  ? 'hover:bg-slate-800 text-slate-300'
                  : theme === 'sepia'
                  ? 'hover:bg-[#eddcc5] text-[#5e4b37]'
                  : 'hover:bg-slate-100 text-slate-600'
              }`}
              title="ย้อนกลับ"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="min-w-0 flex-1">
              <h2 className="text-sm sm:text-base font-bold truncate leading-snug">
                {book.title}
              </h2>
              <div className="flex items-center gap-2 text-[11px] sm:text-xs opacity-70 mt-0.5">
                <span className="truncate">{book.category || 'นิยายแปลไทย'}</span>
                <span>•</span>
                <span className="font-semibold text-blue-500 dark:text-blue-400">
                  อ่านแล้ว {readingProgress}%
                </span>
              </div>
            </div>
          </div>

          {/* Right: Favorite & Close Buttons */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {onToggleFavorite && (
              <button
                onClick={() => onToggleFavorite(book)}
                id="reader-toggle-favorite-btn"
                className={`p-2 rounded-xl transition-colors ${
                  isFavorite
                    ? 'text-rose-500 bg-rose-500/10'
                    : theme === 'dark'
                    ? 'hover:bg-slate-800 text-slate-400'
                    : theme === 'sepia'
                    ? 'hover:bg-[#eddcc5] text-[#78624a]'
                    : 'hover:bg-slate-100 text-slate-500'
                }`}
                title={isFavorite ? 'นำออกจากรายการโปรด' : 'เพิ่มในรายการโปรด'}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500' : ''}`} />
              </button>
            )}

            <button
              onClick={onClose}
              id="reader-close-btn"
              className={`p-2 rounded-xl transition-colors ${
                theme === 'dark'
                  ? 'hover:bg-slate-800 text-slate-400'
                  : theme === 'sepia'
                  ? 'hover:bg-[#eddcc5] text-[#78624a]'
                  : 'hover:bg-slate-100 text-slate-500'
              }`}
              title="ปิด"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Header Row 2: Reading Controls Bar (Font Size, Themes, Refresh) */}
        <div
          className={`flex items-center justify-between px-3 sm:px-5 py-2 border-b text-xs z-10 transition-colors ${
            theme === 'dark'
              ? 'bg-slate-900/90 border-slate-800/80 text-slate-300'
              : theme === 'sepia'
              ? 'bg-[#f4ebd9] border-[#eddcc5] text-[#5c4731]'
              : 'bg-slate-50/95 border-slate-200/80 text-slate-600'
          }`}
        >
          {/* Font Size Adjusters */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-medium opacity-70 hidden xs:inline">ตัวอักษร:</span>
            <div
              className={`flex items-center rounded-xl p-0.5 border ${
                theme === 'dark'
                  ? 'border-slate-800 bg-slate-800/80'
                  : theme === 'sepia'
                  ? 'border-[#ecdcc8] bg-[#efe3ce]'
                  : 'border-slate-200 bg-white shadow-2xs'
              }`}
            >
              <button
                onClick={() => setFontSize((prev) => Math.max(9, prev - 1))}
                disabled={fontSize <= 9}
                className="w-7 h-7 flex items-center justify-center font-bold text-xs rounded-lg active:scale-95 disabled:opacity-30 hover:bg-black/5 dark:hover:bg-white/10 transition-all"
                title="ลดขนาดตัวอักษร (ต่ำสุด 9px)"
              >
                A-
              </button>
              <span className="text-xs font-bold px-1.5 min-w-[28px] text-center">
                {fontSize}
              </span>
              <button
                onClick={() => setFontSize((prev) => Math.min(24, prev + 1))}
                disabled={fontSize >= 24}
                className="w-7 h-7 flex items-center justify-center font-bold text-xs rounded-lg active:scale-95 disabled:opacity-30 hover:bg-black/5 dark:hover:bg-white/10 transition-all"
                title="เพิ่มขนาดตัวอักษร (สูงสุด 24px)"
              >
                A+
              </button>
            </div>
          </div>

          {/* Theme Selector (Light, Sepia, Dark) */}
          <div
            className={`flex items-center rounded-xl p-0.5 border ${
              theme === 'dark'
                ? 'border-slate-800 bg-slate-800/80'
                : theme === 'sepia'
                ? 'border-[#ecdcc8] bg-[#efe3ce]'
                : 'border-slate-200 bg-white shadow-2xs'
            }`}
          >
            <button
              onClick={() => setTheme('light')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all text-xs ${
                theme === 'light'
                  ? 'bg-white text-amber-600 shadow-xs font-bold'
                  : 'opacity-65 hover:opacity-100'
              }`}
              title="โหมดสว่าง"
            >
              <Sun className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">สว่าง</span>
            </button>
            <button
              onClick={() => setTheme('sepia')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all text-xs ${
                theme === 'sepia'
                  ? 'bg-[#f4e8d2] text-[#6d4c28] shadow-xs font-bold'
                  : 'opacity-65 hover:opacity-100'
              }`}
              title="โหมดถนอมสายตา"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">ถนอมสายตา</span>
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all text-xs ${
                theme === 'dark'
                  ? 'bg-slate-700 text-blue-400 shadow-xs font-bold'
                  : 'opacity-65 hover:opacity-100'
              }`}
              title="โหมดมืด"
            >
              <Moon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">มืด</span>
            </button>
          </div>

          {/* Refresh Button */}
          <button
            onClick={() => {
              if (docId) fetchDocHtml(docId, true);
            }}
            className={`p-1.5 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                : theme === 'sepia'
                ? 'hover:bg-[#eddcc5] text-[#78624a] hover:text-[#3d2f21]'
                : 'hover:bg-slate-200 text-slate-500 hover:text-slate-700'
            }`}
            title="รีเฟรชเอกสาร"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="relative flex-1 w-full h-full overflow-hidden">
          {/* Loading Spinner */}
          {isLoading && (
            <div
              className={`absolute inset-0 z-30 flex flex-col items-center justify-center transition-opacity ${
                theme === 'dark'
                  ? 'bg-slate-900/90 text-slate-200'
                  : theme === 'sepia'
                  ? 'bg-[#f8f2e4]/95 text-[#3d2f21]'
                  : 'bg-white/95 text-slate-700'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4 animate-pulse">
                <BookOpen className="w-6 h-6 text-blue-500 animate-bounce" />
              </div>
              <p className="text-sm font-semibold">กำลังจัดหน้าเอกสารในรูปแบบเว็บ...</p>
              <p className="text-xs opacity-60 mt-1">ปรับขนาดพอดีหน้าจอ เลื่อนอ่านเสถียร</p>
            </div>
          )}

          {/* Mode 1: Responsive Web View (Default & Recommended) */}
          {viewMode === 'web' && processedHtml && (
            <iframe
              id="web-reader-iframe"
              key={`web-${book.id}-${theme}-${fontSize}`}
              srcDoc={processedHtml}
              title={book.title}
              onLoad={() => setIsLoading(false)}
              className="w-full h-full border-0 transition-opacity duration-300"
              style={{
                backgroundColor: theme === 'dark' ? '#0f172a' : theme === 'sepia' ? '#fbf4e6' : '#ffffff',
              }}
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          )}

          {/* Mode 2: Google Docs Mobile Web View Fallback if needed */}
          {(viewMode === 'mobilebasic' || (viewMode === 'web' && hasError && !processedHtml)) && (
            <iframe
              id="google-mobile-iframe"
              key={`mobile-${book.id}`}
              src={mobileBasicUrl}
              title={book.title}
              onLoad={() => setIsLoading(false)}
              className="w-full h-full border-0 bg-white"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
          )}

          {/* Mode 3: Desktop Google Preview Fallback */}
          {viewMode === 'preview' && (
            <iframe
              id="google-preview-iframe"
              key={`preview-${book.id}`}
              src={book.previewUrl}
              title={book.title}
              onLoad={() => setIsLoading(false)}
              className="w-full h-full border-0 bg-white"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
          )}
        </div>
      </div>
    </div>
  );
};
