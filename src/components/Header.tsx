import React from 'react';
import { BookOpen, Search, X, Shield } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onTabChange: (tab: ActiveTab) => void;
  totalBooksCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onTabChange,
  totalBooksCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-shadow duration-200">
      <div className="max-w-4xl mx-auto px-3.5 py-2.5 sm:px-4 sm:py-3">
        {/* Top brand row */}
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <button
            id="brand-logo-btn"
            onClick={() => onTabChange('home')}
            className="flex items-center gap-2.5 text-left group transition-transform active:scale-95"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-900 via-blue-900 to-indigo-800 flex items-center justify-center text-white shadow-md shadow-blue-950/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-slate-900 uppercase">
                  Inter<span className="text-blue-600">Lib</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 tracking-wider">
                  V2
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium line-clamp-1">
                คลังนิยาย Google Docs & พอตแคสต์เล่าเรื่อง
              </p>
            </div>
          </button>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
              {totalBooksCount.toLocaleString('th-TH')} เรื่อง
            </span>

            <a
              id="privacy-policy-link"
              href="https://sites.google.com/view/bookpeefreer/%E0%B8%AB%E0%B8%99%E0%B8%B2%E0%B9%81%E0%B8%A3%E0%B8%81"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-blue-600 border border-slate-200 hover:border-blue-200 bg-white px-2.5 py-1 rounded-lg transition-colors shadow-xs"
              title="นโยบายความเป็นส่วนตัว"
            >
              <Shield className="w-3 h-3 text-slate-400" />
              <span>Privacy</span>
            </a>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            id="main-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="ค้นหาชื่อเรื่อง, หมวดหมู่, ผู้แต่ง..."
            className="w-full pl-10 pr-10 py-2.5 bg-slate-100/90 hover:bg-slate-100 focus:bg-white border border-transparent focus:border-blue-500/30 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:ring-3 focus:ring-blue-500/15 outline-none transition-all"
          />
          {searchQuery && (
            <button
              id="clear-search-btn"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60"
              aria-label="ล้างการค้นหา"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
