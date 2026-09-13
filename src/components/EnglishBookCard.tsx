import React, { useState, useEffect } from 'react';
import { BookOpen, Heart, ExternalLink } from 'lucide-react';
import { EnglishBook } from '../types';

interface EnglishBookCardProps {
  book: EnglishBook;
  isFavorite?: boolean;
  onToggleFavorite?: (book: EnglishBook) => void;
}

export const EnglishBookCard: React.FC<EnglishBookCardProps> = ({
  book,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const targetUrl = book.html || book.url;
  const [imgSrc, setImgSrc] = useState<string>(book.image || book.fallbackImage || '');
  const displayId = book.id ? book.id.replace(/^en-/, '#') : '';

  useEffect(() => {
    setImgSrc(book.image || book.fallbackImage || '');
  }, [book.image, book.fallbackImage]);

  const handleImageError = () => {
    if (imgSrc.includes('cover.medium.jpg')) {
      setImgSrc(imgSrc.replace('cover.medium.jpg', 'cover.small.jpg'));
    } else if (book.fallbackImage && imgSrc !== book.fallbackImage) {
      setImgSrc(book.fallbackImage);
    } else {
      setImgSrc('https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop');
    }
  };

  return (
    <div className="book-card flex flex-col group relative select-none">
      {/* Cover Image with Aspect 2/3 and Hover Effects */}
      <div className="relative block overflow-hidden rounded-2xl shadow-sm border border-slate-200 bg-slate-100 aspect-[2/3]">
        {/* Book Gutenberg ID Badge */}
        {displayId && (
          <span className="absolute top-2 left-2 z-10 px-1.5 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-[10px] font-mono font-bold text-white/90 shadow-xs pointer-events-none">
            {displayId}
          </span>
        )}

        <a
          href={targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-full block cursor-pointer"
          aria-label={`อ่านต้นฉบับ ${book.title}`}
        >
          <img
            src={imgSrc || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop'}
            alt={book.title || 'ไม่มีชื่อ'}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={handleImageError}
          />

          {/* Hover overlay with icon - directly opens book without translation */}
          <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity gap-1">
            <BookOpen className="w-8 h-8 text-white drop-shadow-md" />
            <span className="text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded-full">
              อ่านต้นฉบับ
            </span>
          </div>
        </a>

        {/* Favorite Button */}
        {onToggleFavorite && (
          <button
            id={`fav-btn-${book.id}`}
            onClick={(e) => {
              e.preventDefault();
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
      </div>

      {/* Book Title & Author */}
      <a
        href={targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 block"
      >
        <h3 className="text-xs font-bold line-clamp-2 leading-snug font-body text-slate-800 hover:text-blue-600 transition-colors">
          {book.title || 'ไม่มีชื่อ'}
        </h3>
        <p className="text-[9px] text-slate-400 mt-1 truncate uppercase tracking-widest font-body">
          {book.author || 'ไม่ระบุ'}
        </p>
      </a>

      {/* Direct Click-Out Link Button */}
      <a
        href={targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2.5 inline-flex items-center justify-center gap-1.5 w-full py-1.5 px-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 text-[11px] font-semibold transition-all border border-slate-200/80 hover:border-blue-200 active:scale-95"
        title="เปิดอ่านต้นฉบับภายนอก"
      >
        <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-blue-600" />
        <span>อ่านต้นฉบับ</span>
      </a>
    </div>
  );
};
