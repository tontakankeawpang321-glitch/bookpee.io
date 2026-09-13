import React, { useState, useMemo, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  ChevronsLeft,
  ChevronsRight,
  BookOpen
} from 'lucide-react';
import { EnglishBook } from '../types';
import { EnglishBookCard } from '../components/EnglishBookCard';
import {
  TOTAL_GUTENBERG_BOOKS,
  preloadAllBatchesInBackground,
  getEnglishBooksSlice,
  searchGutenbergCatalog
} from '../services/gutenbergCatalog';

interface EnglishBooksViewProps {
  books?: EnglishBook[];
  searchQuery: string;
  favorites?: string[];
  onToggleFavorite?: (book: EnglishBook) => void;
}

const BOOKS_PER_PAGE = 10;

export const EnglishBooksView: React.FC<EnglishBooksViewProps> = ({
  books = [],
  searchQuery,
  favorites,
  onToggleFavorite,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [jumpPageInput, setJumpPageInput] = useState<string>('');
  const [searchResults, setSearchResults] = useState<EnglishBook[] | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Background worker: Pre-fetches all 1,000-book batches progressively in background
  useEffect(() => {
    preloadAllBatchesInBackground(books);
  }, [books]);

  // Handle global search across all 78,071 books
  useEffect(() => {
    const q = searchQuery.trim();
    if (!q) {
      setSearchResults(null);
      setIsSearching(false);
      return;
    }

    let isMounted = true;
    setIsSearching(true);

    const timer = setTimeout(async () => {
      try {
        const res = await searchGutenbergCatalog(q, 1, 100);
        if (isMounted) {
          setSearchResults(res.books);
          setCurrentPage(1);
          setIsSearching(false);
        }
      } catch (err) {
        console.warn('Search error', err);
        if (isMounted) setIsSearching(false);
      }
    }, 200);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [searchQuery]);

  // Total books count and pages across entire catalog (combined)
  const totalBooksCount = searchResults !== null ? searchResults.length : TOTAL_GUTENBERG_BOOKS;
  const totalPages = Math.max(1, Math.ceil(totalBooksCount / BOOKS_PER_PAGE));
  const validPage = Math.min(Math.max(1, currentPage), totalPages);

  // Retrieve current slice of 10 books (loaded via background 1,000-book chunks)
  const displayedBooks = useMemo(() => {
    if (searchResults !== null) {
      const start = (validPage - 1) * BOOKS_PER_PAGE;
      return searchResults.slice(start, start + BOOKS_PER_PAGE);
    }
    const start = (validPage - 1) * BOOKS_PER_PAGE;
    return getEnglishBooksSlice(start, BOOKS_PER_PAGE, books);
  }, [searchResults, validPage, books]);

  const handlePageChange = (newPage: number) => {
    const target = Math.min(Math.max(1, newPage), totalPages);
    if (target !== currentPage) {
      setCurrentPage(target);
      const section = document.getElementById('page-originals');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(jumpPageInput, 10);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= totalPages) {
      handlePageChange(parsed);
      setJumpPageInput('');
    }
  };

  // Smart pagination range with ellipsis (up to 394 pages)
  const paginationRange = useMemo(() => {
    const delta = 2;
    const range: (number | string)[] = [];
    const left = Math.max(2, validPage - delta);
    const right = Math.min(totalPages - 1, validPage + delta);

    range.push(1);
    if (left > 2) range.push('...');
    for (let i = left; i <= right; i++) {
      range.push(i);
    }
    if (right < totalPages - 1) range.push('...');
    if (totalPages > 1) range.push(totalPages);

    return range;
  }, [validPage, totalPages]);

  const startIndex = (validPage - 1) * BOOKS_PER_PAGE + 1;
  const endIndex = Math.min(validPage * BOOKS_PER_PAGE, totalBooksCount);

  return (
    <section id="page-originals" className="tab-content animate-in fade-in duration-200 pb-12">
      {/* Header Info */}
      <div className="flex flex-col items-center mb-5 text-center">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <h2 className="font-bold text-xl text-slate-900 font-sans">คลังหนังสือภาษาอังกฤษ</h2>
        </div>
        <p className="text-xs text-slate-500 font-medium">
          หนังสือทั้งหมด {TOTAL_GUTENBERG_BOOKS.toLocaleString('th-TH')} เล่ม • ดึงข้อมูลเบื้องหลังอัตโนมัติทีละ 1,000 เล่ม
        </p>

        {/* Status Badge */}
        <div className="mt-2.5 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-[11px] text-slate-600 font-medium">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          {searchResults !== null ? (
            <span>
              ผลการค้นหา: พบ {totalBooksCount.toLocaleString('th-TH')} เล่ม (กำลังแสดงเล่มที่ {startIndex.toLocaleString('th-TH')} - {endIndex.toLocaleString('th-TH')})
            </span>
          ) : (
            <span>
              กำลังแสดงเล่มที่ {startIndex.toLocaleString('th-TH')} - {endIndex.toLocaleString('th-TH')} จากทั้งหมด {TOTAL_GUTENBERG_BOOKS.toLocaleString('th-TH')} เล่ม • หน้า {validPage.toLocaleString('th-TH')}/{totalPages.toLocaleString('th-TH')}
            </span>
          )}
        </div>
      </div>

      {/* Book Grid */}
      {isSearching ? (
        <div className="py-20 text-center flex flex-col items-center justify-center">
          <div className="w-7 h-7 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-xs text-slate-500">
            กำลังค้นหาใน {TOTAL_GUTENBERG_BOOKS.toLocaleString('th-TH')} เล่ม...
          </p>
        </div>
      ) : displayedBooks.length > 0 ? (
        <div
          id="grid-originals"
          className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-5 min-h-[380px] transition-opacity duration-200"
        >
          {displayedBooks.map((book) => (
            <EnglishBookCard
              key={book.id}
              book={book}
              isFavorite={favorites?.includes(book.id) ?? false}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-6 min-h-[300px] flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
            <Search className="w-5 h-5" />
          </div>
          <p className="text-sm font-bold text-slate-700">ไม่พบหนังสือที่ตรงกับการค้นหา</p>
          <p className="text-xs text-slate-400 mt-1">ลองพิมพ์ชื่อเรื่อง ผู้แต่ง หรือเลข ID ของหนังสือ</p>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div id="pagination-originals" className="flex flex-col items-center gap-3 mt-8">
          <div className="flex items-center justify-center gap-1.5 flex-wrap">
            {/* First Page */}
            <button
              onClick={() => handlePageChange(1)}
              disabled={validPage <= 1}
              id="firstPageBtn"
              title="หน้าแรกสุด"
              className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center justify-center shadow-xs disabled:opacity-20 transition-all active:scale-95 hover:bg-slate-50"
            >
              <ChevronsLeft className="w-3.5 h-3.5" />
            </button>

            {/* Prev Page */}
            <button
              onClick={() => handlePageChange(validPage - 1)}
              disabled={validPage <= 1}
              id="prevBtn"
              className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center gap-1 text-xs font-semibold shadow-xs disabled:opacity-25 transition-all active:scale-95 hover:bg-slate-50"
              aria-label="ย้อนกลับ"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>ย้อนกลับ</span>
            </button>

            {/* Direct Page Numbers */}
            <div className="flex items-center gap-1">
              {paginationRange.map((p, idx) => {
                if (p === '...') {
                  return (
                    <span key={`dots-${idx}`} className="px-1 text-xs text-slate-400 font-bold select-none">
                      ...
                    </span>
                  );
                }

                const pageNum = Number(p);
                const isActive = pageNum === validPage;
                return (
                  <button
                    key={`page-${pageNum}`}
                    id={`page-btn-${pageNum}`}
                    onClick={() => handlePageChange(pageNum)}
                    className={`min-w-[32px] h-[32px] px-1 rounded-full text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs scale-105'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 active:scale-95'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            {/* Next Page */}
            <button
              onClick={() => handlePageChange(validPage + 1)}
              disabled={validPage >= totalPages}
              id="nextBtn"
              className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center gap-1 text-xs font-semibold shadow-xs disabled:opacity-25 transition-all active:scale-95 hover:bg-slate-50"
              aria-label="ถัดไป"
            >
              <span>ถัดไป</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Last Page */}
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={validPage >= totalPages}
              id="lastPageBtn"
              title="หน้าสุดท้าย"
              className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center justify-center shadow-xs disabled:opacity-20 transition-all active:scale-95 hover:bg-slate-50"
            >
              <ChevronsRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Page Info & Jump to Page Input */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-500 font-medium">
            <span>
              หน้า <span className="font-bold text-blue-600">{validPage.toLocaleString('th-TH')}</span> จากทั้งหมด{' '}
              <span className="font-bold">{totalPages.toLocaleString('th-TH')}</span> หน้า
            </span>

            {totalPages > 1 && (
              <form onSubmit={handleJumpSubmit} className="flex items-center gap-1">
                <span className="text-slate-400">ข้ามไปหน้า:</span>
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  placeholder={String(validPage)}
                  value={jumpPageInput}
                  onChange={(e) => setJumpPageInput(e.target.value)}
                  className="w-16 px-2 py-0.5 text-center text-xs bg-white border border-slate-200 rounded-md text-slate-800 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-2 py-0.5 text-xs bg-slate-100 hover:bg-slate-200 active:scale-95 border border-slate-200 rounded-md text-slate-700 transition-all"
                >
                  ไป
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
