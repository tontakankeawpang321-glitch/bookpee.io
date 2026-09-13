import React, { useState, useMemo, useEffect } from 'react';
import {
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  RefreshCw
} from 'lucide-react';
import { ThaiDocBook } from '../types';
import { DocBookCard } from '../components/DocBookCard';

const ITEMS_PER_PAGE = 10; // แสดงทีละ 10 เล่มต่อหน้าตามที่กำหนดไว้

interface HomeDocViewProps {
  books: ThaiDocBook[];
  searchQuery: string;
  onReadBook: (book: ThaiDocBook) => void;
  favorites?: string[];
  onToggleFavorite?: (book: ThaiDocBook) => void;
  isRefreshing?: boolean;
  onRefresh?: () => void;
  syncStatusText?: string | null;
}

export const HomeDocView: React.FC<HomeDocViewProps> = ({
  books,
  searchQuery,
  onReadBook,
  favorites,
  onToggleFavorite,
  isRefreshing = false,
  onRefresh,
  syncStatusText
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [jumpPageInput, setJumpPageInput] = useState('');

  // Extract real categories dynamically strictly from sheet books
  const categories = useMemo(() => {
    const set = new Set<string>();
    books.forEach((b) => {
      if (b.category && b.category.trim()) {
        set.add(b.category.trim());
      }
    });
    return Array.from(set);
  }, [books]);

  // Filter books based on category and search query across all combined books
  const filteredBooks = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return books.filter((book) => {
      const matchCat = selectedCategory === 'all' || book.category === selectedCategory;
      const matchQuery =
        !q ||
        book.title.toLowerCase().includes(q) ||
        book.rawTitle.toLowerCase().includes(q) ||
        book.category.toLowerCase().includes(q);

      return matchCat && matchQuery;
    });
  }, [books, searchQuery, selectedCategory]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  // Pagination calculations (supports seamlessly up to 8,000+ books)
  const totalBooks = filteredBooks.length;
  const totalPages = Math.max(1, Math.ceil(totalBooks / ITEMS_PER_PAGE));
  const validPage = Math.min(Math.max(1, currentPage), totalPages);

  // Slice 10 items for current page
  const displayedBooks = useMemo(() => {
    const start = (validPage - 1) * ITEMS_PER_PAGE;
    return filteredBooks.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredBooks, validPage]);

  const handlePageChange = (newPage: number) => {
    const target = Math.min(Math.max(1, newPage), totalPages);
    if (target !== currentPage) {
      setCurrentPage(target);

      // Smooth scroll to top of section
      const section = document.getElementById('home-doc-view');
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

  // Generate smart pagination page numbers with ellipsis (supports up to hundreds/thousands of pages)
  const paginationRange = useMemo(() => {
    const delta = 2;
    const range: (number | string)[] = [];
    const left = Math.max(2, validPage - delta);
    const right = Math.min(totalPages - 1, validPage + delta);

    range.push(1);

    if (left > 2) {
      range.push('...');
    }

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    if (right < totalPages - 1) {
      range.push('...');
    }

    if (totalPages > 1) {
      range.push(totalPages);
    }

    return range;
  }, [validPage, totalPages]);

  const startIndex = totalBooks > 0 ? (validPage - 1) * ITEMS_PER_PAGE + 1 : 0;
  const endIndex = Math.min(validPage * ITEMS_PER_PAGE, totalBooks);

  return (
    <section id="home-doc-view" className="space-y-3.5 animate-in fade-in duration-200 pb-12">
      {/* Sync Status Banner */}
      {syncStatusText && (
        <div className="p-2.5 bg-blue-50/90 border border-blue-200 rounded-xl text-xs text-blue-800 flex items-center gap-2">
          <RefreshCw className="w-3.5 h-3.5 text-blue-600 animate-spin shrink-0" />
          <span className="font-medium text-[11px]">{syncStatusText}</span>
        </div>
      )}

      {/* Category Pills */}
      {categories.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
          <span className="text-slate-400 text-[11px] font-medium pl-1 flex items-center gap-1 shrink-0">
            <Filter className="w-3 h-3" />
            หมวดหมู่:
          </span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`shrink-0 px-3 py-1 rounded-xl text-[11px] font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            ทุกหมวด
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 px-3 py-1 rounded-xl text-[11px] font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Results Header: Range Status badge matching original view */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span>
            พบ <strong className="text-slate-900 font-bold">{totalBooks.toLocaleString('th-TH')}</strong> เรื่อง
            {searchQuery && ` สำหรับ "${searchQuery}"`}
          </span>
          {totalBooks > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-100 border border-slate-200/80 text-[11px] text-slate-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span>
                กำลังแสดงเล่มที่ {startIndex.toLocaleString('th-TH')} - {endIndex.toLocaleString('th-TH')} จากทั้งหมด {totalBooks.toLocaleString('th-TH')} เล่ม (หน้า {validPage.toLocaleString('th-TH')}/{totalPages.toLocaleString('th-TH')})
              </span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isRefreshing ? (
            <span className="inline-flex items-center gap-1 text-[11px] text-blue-700 bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded-full font-medium shadow-2xs">
              <RefreshCw className="w-3 h-3 text-blue-600 animate-spin" />
              <span>กำลังอัปเดตข้อมูลจากชีท...</span>
            </span>
          ) : (
            onRefresh && (
              <button
                type="button"
                id="refresh-sheet-btn"
                onClick={onRefresh}
                title="รีเฟรชอัปเดตข้อมูลจากชีท"
                className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-blue-600 hover:bg-slate-100 border border-slate-200/70 bg-white px-2 py-0.5 rounded-lg transition-colors shadow-2xs"
              >
                <RefreshCw className="w-3 h-3 text-slate-400" />
                <span>รีเฟรชชีท</span>
              </button>
            )
          )}
          <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
            แสดงทีละ 10 เล่ม
          </span>
        </div>
      </div>

      {/* Book Grid: 10 books per page with smooth rendering */}
      {displayedBooks.length > 0 ? (
        <div
          id="grid-originals"
          className="grid grid-cols-2 md:grid-cols-5 gap-5 min-h-[380px] transition-opacity duration-200"
        >
          {displayedBooks.map((book) => (
            <DocBookCard
              key={book.id}
              book={book}
              onRead={onReadBook}
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
          <p className="text-sm font-bold text-slate-700">ไม่พบหนังสือที่ค้นหา</p>
          <p className="text-xs text-slate-400 mt-1">ลองเปลี่ยนคำค้นหา หรือเลือกหมวดหมู่อื่น</p>
        </div>
      )}

      {/* Pagination Controls - identical to original books view */}
      {totalPages > 1 && (
        <div id="pagination-originals" className="flex flex-col items-center gap-3.5 mt-10">
          <div className="flex items-center justify-center gap-1.5 flex-wrap">
            {/* ไปหน้าแรกสุด */}
            <button
              onClick={() => handlePageChange(1)}
              disabled={validPage <= 1}
              id="firstPageBtn"
              title="หน้าแรกสุด"
              className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center justify-center shadow-xs disabled:opacity-20 transition-all active:scale-95 hover:bg-slate-50"
            >
              <ChevronsLeft className="w-3.5 h-3.5" />
            </button>

            {/* ย้อนกลับ (Prev) */}
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

            {/* Direct Page Number Buttons with smart ellipsis */}
            <div className="flex items-center gap-1">
              {paginationRange.map((p, idx) => {
                if (p === '...') {
                  return (
                    <span key={`dots-${idx}`} className="px-1.5 text-xs text-slate-400 font-bold select-none">
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

            {/* ถัดไป (Next) */}
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

            {/* ไปหน้าสุดท้าย */}
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

          {/* Quick Page Info & Jump to Page Input (supports up to 8,000+ books smoothly) */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-500 font-medium">
            <span>
              หน้า <span className="font-bold text-blue-600">{validPage.toLocaleString('th-TH')}</span> จากทั้งหมด{' '}
              <span className="font-bold">{totalPages.toLocaleString('th-TH')}</span> หน้า
            </span>

            {/* Jump to Page box */}
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
          </div>
        </div>
      )}
    </section>
  );
};
