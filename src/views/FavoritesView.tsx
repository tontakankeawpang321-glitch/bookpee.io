import React, { useState } from 'react';
import { Heart, FileText, BookMarked, PlaySquare, Trash2, ArrowRight } from 'lucide-react';
import { ThaiDocBook, EnglishBook, VideoClip, ActiveTab } from '../types';
import { DocBookCard } from '../components/DocBookCard';
import { EnglishBookCard } from '../components/EnglishBookCard';
import { VideoCard } from '../components/VideoCard';

interface FavoritesViewProps {
  favDocBooks: ThaiDocBook[];
  favEnBooks: EnglishBook[];
  favVideos: VideoClip[];
  onReadDocBook: (book: ThaiDocBook) => void;
  onPlayVideo: (video: VideoClip) => void;
  onToggleDocFavorite: (book: ThaiDocBook) => void;
  onToggleEnFavorite: (book: EnglishBook) => void;
  onToggleVideoFavorite: (video: VideoClip) => void;
  onClearAll: () => void;
  onNavigateTab: (tab: ActiveTab) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favDocBooks,
  favEnBooks,
  favVideos,
  onReadDocBook,
  onPlayVideo,
  onToggleDocFavorite,
  onToggleEnFavorite,
  onToggleVideoFavorite,
  onClearAll,
  onNavigateTab,
}) => {
  const [filter, setFilter] = useState<'all' | 'docs' | 'en' | 'videos'>('all');

  const totalCount = favDocBooks.length + favEnBooks.length + favVideos.length;

  return (
    <section id="favorites-view" className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-rose-950 via-slate-900 to-slate-950 text-white rounded-3xl p-4 sm:p-5 border border-rose-900/30 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 text-[11px] font-semibold mb-2 border border-rose-500/30">
              <Heart className="w-3 h-3 text-rose-400 fill-current" />
              <span>คลังส่วนตัวของคุณ</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              รายการโปรดที่บันทึกไว้
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              รวมหนังสือและคลิปเสียงที่คุณกดชื่นชอบไว้ เพื่อเปิดอ่านและฟังได้สะดวกรวดเร็ว
            </p>
          </div>

          {totalCount > 0 && (
            <button
              onClick={onClearAll}
              className="flex items-center gap-1 text-[11px] font-medium text-rose-300 hover:text-white bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 px-3 py-1.5 rounded-xl transition-colors shrink-0"
              title="ล้างรายการโปรดทั้งหมด"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">ล้างทั้งหมด</span>
            </button>
          )}
        </div>
      </div>

      {totalCount === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl border border-slate-200/80 p-8 space-y-4">
          <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">ยังไม่มีรายการโปรด</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              แตะที่ไอคอนหัวใจบนหนังสือแปลไทย, หนังสือภาษาอังกฤษ หรือวิดีโอเพื่อเก็บไว้อ่านภายหลัง
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              onClick={() => onNavigateTab('home')}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-xs transition-transform active:scale-95"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>ไปที่คลังหนังสือแปลไทย</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onNavigateTab('videos')}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-transform active:scale-95"
            >
              <PlaySquare className="w-3.5 h-3.5" />
              <span>ดูวิดีโอพอตแคสต์</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Sub-filter pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setFilter('all')}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              ทั้งหมด ({totalCount})
            </button>

            {favDocBooks.length > 0 && (
              <button
                onClick={() => setFilter('docs')}
                className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  filter === 'docs'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <FileText className="w-3 h-3" />
                <span>หนังสือแปลไทย ({favDocBooks.length})</span>
              </button>
            )}

            {favEnBooks.length > 0 && (
              <button
                onClick={() => setFilter('en')}
                className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  filter === 'en'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <BookMarked className="w-3 h-3" />
                <span>หนังสืออังกฤษ ({favEnBooks.length})</span>
              </button>
            )}

            {favVideos.length > 0 && (
              <button
                onClick={() => setFilter('videos')}
                className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  filter === 'videos'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <PlaySquare className="w-3 h-3" />
                <span>วิดีโอ ({favVideos.length})</span>
              </button>
            )}
          </div>

          {/* Section 1: Thai Doc Books */}
          {(filter === 'all' || filter === 'docs') && favDocBooks.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-l-4 border-blue-600 pl-2">
                <span>หนังสือแปลไทย (Google Docs)</span>
                <span className="text-[11px] font-medium text-slate-400">({favDocBooks.length})</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4.5">
                {favDocBooks.map((book) => (
                  <DocBookCard
                    key={book.id}
                    book={book}
                    onRead={onReadDocBook}
                    isFavorite={true}
                    onToggleFavorite={onToggleDocFavorite}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Section 2: English Books */}
          {(filter === 'all' || filter === 'en') && favEnBooks.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-l-4 border-indigo-600 pl-2">
                <span>หนังสือภาษาอังกฤษ (English Classics)</span>
                <span className="text-[11px] font-medium text-slate-400">({favEnBooks.length})</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4.5">
                {favEnBooks.map((book) => (
                  <EnglishBookCard
                    key={book.id}
                    book={book}
                    isFavorite={true}
                    onToggleFavorite={onToggleEnFavorite}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Section 3: Videos */}
          {(filter === 'all' || filter === 'videos') && favVideos.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-l-4 border-rose-600 pl-2">
                <span>วิดีโอ & พอตแคสต์</span>
                <span className="text-[11px] font-medium text-slate-400">({favVideos.length})</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {favVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onPlay={onPlayVideo}
                    isFavorite={true}
                    onToggleFavorite={onToggleVideoFavorite}
                    isCompact={false}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};
