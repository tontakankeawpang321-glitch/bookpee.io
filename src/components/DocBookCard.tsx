import React, { useState } from 'react';
import { ExternalLink, BookOpen, Heart } from 'lucide-react';
import { ThaiDocBook } from '../types';

interface DocBookCardProps {
  book: ThaiDocBook;
  onRead: (book: ThaiDocBook) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (book: ThaiDocBook) => void;
}

export const DocBookCard: React.FC<DocBookCardProps> = ({
  book,
  onRead,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const [imgSrc, setImgSrc] = useState<string>(book.image || book.fallbackImage || '');
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    // If the drive thumbnail fails, try the fallback cover image
    if (book.fallbackImage && imgSrc !== book.fallbackImage) {
      setImgSrc(book.fallbackImage);
    } else {
      setHasError(true);
    }
  };

  return (
    <div
      id={`book-card-${book.id}`}
      className="book-card flex flex-col group relative bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-300"
    >
      {/* Book Cover Image Area (Aspect 2/3) */}
      <div
        onClick={() => onRead(book)}
        className="relative overflow-hidden rounded-t-2xl sm:rounded-2xl border-b sm:border-b-0 border-slate-100 bg-slate-100 aspect-[2/3] cursor-pointer select-none"
      >
        {!hasError && imgSrc ? (
          <img
            src={imgSrc}
            alt={book.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={handleImageError}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-900 to-blue-950 p-4 flex flex-col justify-between text-white">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/20 self-start">
              {book.category}
            </span>
            <p className="text-xs font-bold line-clamp-3">{book.title}</p>
            <span className="text-[9px] text-slate-300">Google Docs View</span>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-2 left-2 z-10 flex items-center gap-1 flex-wrap max-w-[85%]">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white shadow-xs">
            {book.category}
          </span>
          <span className={`text-[9px] font-bold text-white px-1.5 py-0.5 rounded shadow-xs ${
            book.sheetSource === 2
              ? 'bg-emerald-600/90'
              : book.sheetSource === 3
              ? 'bg-purple-600/90'
              : 'bg-blue-600/90'
          }`}>
            ชีท {book.sheetSource || 1}
          </span>
        </div>

        {/* Favorite Button */}
        {onToggleFavorite && (
          <button
            id={`fav-btn-${book.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(book);
            }}
            className={`absolute top-2 right-2 z-20 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all active:scale-90 shadow-sm ${
              isFavorite
                ? 'bg-rose-500 text-white shadow-rose-500/30'
                : 'bg-black/50 hover:bg-black/70 text-white hover:text-rose-300'
            }`}
            title={isFavorite ? 'ลบออกจากรายการโปรด' : 'เพิ่มในรายการโปรด'}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        )}

        {/* Hover overlay with Read Icon */}
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity gap-1.5 text-white">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold bg-black/50 px-2 py-0.5 rounded-full">
            แตะเปิดอ่าน
          </span>
        </div>
      </div>

      {/* Card Info & Actions Footer */}
      <div className="p-3 flex flex-col flex-1 justify-between gap-2 bg-white rounded-b-2xl">
        <div>
          <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
            <span className="truncate max-w-[110px]">{book.category}</span>
            <span className="text-[9px] font-medium text-slate-400">
              {book.fileType.toUpperCase()}
            </span>
          </div>
          <h3
            onClick={() => onRead(book)}
            className="text-xs font-bold line-clamp-2 leading-snug font-body text-slate-800 hover:text-blue-600 cursor-pointer"
          >
            {book.title}
          </h3>
          <p className="text-[9px] text-slate-400 mt-1 truncate uppercase tracking-widest font-body">
            ฉบับแปลภาษาไทย
          </p>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-5 gap-1.5 pt-1">
          <button
            onClick={() => onRead(book)}
            className="col-span-4 text-center py-1.5 px-2 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-xl text-[11px] font-semibold transition-colors flex items-center justify-center gap-1 active:scale-95 shadow-2xs"
          >
            <BookOpen className="w-3 h-3 shrink-0" />
            <span className="truncate">อ่านในมือถือ</span>
          </button>

          <a
            href={book.url}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-1 flex items-center justify-center py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors active:scale-95"
            title="เปิดลิงก์ Google Doc ต้นฉบับตรง"
          >
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
