/**
 * InterLib V2 - นิยายเล่าเรื่องแบบ พอตแคสต์ & คลังหนังสือ Google Docs
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ActiveTab, ThaiDocBook, EnglishBook, VideoClip, FavoriteItem } from './types';
import { ALL_DOC_BOOKS, getEnglishBooksFromSheets, parseCSVToBooks, RAW_SHEETS_CSV } from './data/sheetsData';
import { parseEnglishBooksCSV } from './data/englishBooksData';
import { VIDEO_CLIPS } from './data/videosData';
import { syncAllFiveSheetsSequentially, syncThaiBooksOnly } from './services/sheetSync';
import { TOTAL_GUTENBERG_BOOKS } from './services/gutenbergCatalog';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DocReaderModal } from './components/DocReaderModal';
import { VideoModal } from './components/VideoModal';
import { HomeDocView } from './views/HomeDocView';
import { EnglishBooksView } from './views/EnglishBooksView';
import { VideosView } from './views/VideosView';
import { FavoritesView } from './views/FavoritesView';
import { saveSheetUrls } from './services/sheetSync';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [syncStatusText, setSyncStatusText] = useState<string | null>(null);

  // Books and Videos state with instant cached local hydration
  const [docBooks, setDocBooks] = useState<ThaiDocBook[]>(() => {
    try {
      const c1 = localStorage.getItem('interlib_cached_sheet1_csv');
      const c2 = localStorage.getItem('interlib_cached_sheet2_csv');
      const c3 = localStorage.getItem('interlib_cached_sheet3_csv');
      // If cached sheet 1 doesn't have the newly added books, clear stale cache
      if (c1 && !c1.includes('Flatland')) {
        localStorage.removeItem('interlib_cached_sheet1_csv');
        return ALL_DOC_BOOKS;
      }
      if (c1 || c2 || c3) {
        const b1 = parseCSVToBooks(c1 || RAW_SHEETS_CSV.sheet1, 1);
        const b2 = parseCSVToBooks(c2 || RAW_SHEETS_CSV.sheet2, 2);
        const b3 = parseCSVToBooks(c3 || RAW_SHEETS_CSV.sheet3, 3);
        const combined = [...b1, ...b2, ...b3];
        const seen = new Set<string>();
        const unique: ThaiDocBook[] = [];
        for (const b of combined) {
          const key = b.docId || b.url || b.title;
          if (!seen.has(key)) {
            seen.add(key);
            unique.push(b);
          }
        }
        if (unique.length >= ALL_DOC_BOOKS.length) return unique;
      }
    } catch (e) {
      console.warn('Failed to load cached thai books', e);
    }
    return ALL_DOC_BOOKS;
  });

  const [englishBooks, setEnglishBooks] = useState<EnglishBook[]>(() => {
    try {
      const cEn = localStorage.getItem('interlib_cached_english_csv');
      if (cEn) {
        const parsed = parseEnglishBooksCSV(cEn);
        if (parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to load cached english books', e);
    }
    return getEnglishBooksFromSheets();
  });

  const [videos, setVideos] = useState<VideoClip[]>(VIDEO_CLIPS);

  // Favorites state with localStorage persistence
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    try {
      const saved = localStorage.getItem('interlib_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn('Failed to load favorites from localStorage', e);
      return [];
    }
  });

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('interlib_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.warn('Failed to persist favorites to localStorage', e);
    }
  }, [favorites]);

  // Modals state
  const [readingDocBook, setReadingDocBook] = useState<ThaiDocBook | null>(null);
  const [playingVideo, setPlayingVideo] = useState<VideoClip | null>(null);

  // Dedicated refresh handler for Home page: pulls and updates data from sheets every time user enters 'home'
  const refreshHomeFromSheets = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const result = await syncThaiBooksOnly((status) => {
        setSyncStatusText(status);
      });
      if (result.allBooks && result.allBooks.length > 0) {
        setDocBooks(result.allBooks);
        try {
          localStorage.setItem('interlib_cached_doc_books', JSON.stringify(result.allBooks));
        } catch (e) {}
      }
    } catch (err) {
      console.warn('Home page sheet refresh error:', err);
    } finally {
      setIsRefreshing(false);
      setTimeout(() => setSyncStatusText(null), 3500);
    }
  }, []);

  // Full silent background refresh handler for all sheets
  const triggerRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const result = await syncAllFiveSheetsSequentially();

      if (result.thaiBooks && result.thaiBooks.length > 0) {
        setDocBooks(result.thaiBooks);
        try {
          localStorage.setItem('interlib_cached_doc_books', JSON.stringify(result.thaiBooks));
        } catch (e) {}
      }
      if (result.englishBooks && result.englishBooks.length > 0) {
        setEnglishBooks(result.englishBooks);
      }
      if (result.videos && result.videos.length > 0) {
        setVideos(result.videos);
      }
    } catch (err) {
      console.warn('Sheets background sync error:', err);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Automatic refresh from sheets every time user enters or switches to the Home page
  useEffect(() => {
    if (activeTab === 'home') {
      refreshHomeFromSheets();
    }
  }, [activeTab, refreshHomeFromSheets]);

  // Automatic refresh from sheets when app/tab regains focus while on the Home page
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && activeTab === 'home') {
        refreshHomeFromSheets();
      }
    };
    const handleFocus = () => {
      if (activeTab === 'home') {
        refreshHomeFromSheets();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [activeTab, refreshHomeFromSheets]);

  // Periodic real-time background sync every 60 seconds while on Home page
  useEffect(() => {
    if (activeTab !== 'home') return;
    const interval = setInterval(() => {
      refreshHomeFromSheets();
    }, 60000);
    return () => clearInterval(interval);
  }, [activeTab, refreshHomeFromSheets]);

  // Auto-detect and save sheet URLs from query parameter if present (?sheet1=...&sheet2=...&sheet3=... or ?sheet=...)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const s1 =
        params.get('sheet1') ||
        params.get('s1') ||
        params.get('sheet') ||
        params.get('master') ||
        params.get('url');
      const s2 = params.get('sheet2') || params.get('s2');
      const s3 = params.get('sheet3') || params.get('s3');
      if (s1 || s2 || s3) {
        saveSheetUrls({
          ...(s1 ? { sheet1Url: s1 } : {}),
          ...(s2 ? { sheet2Url: s2 } : {}),
          ...(s3 ? { sheet3Url: s3 } : {})
        });
        refreshHomeFromSheets();
      }
    } catch (e) {
      console.warn('URL param check error', e);
    }
  }, [refreshHomeFromSheets]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (readingDocBook) setReadingDocBook(null);
        if (playingVideo) setPlayingVideo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [readingDocBook, playingVideo]);

  // Prevent background scroll when modal is active
  useEffect(() => {
    if (readingDocBook || playingVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [readingDocBook, playingVideo]);

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Refresh and update from sheet every time user enters or taps 'home' (หน้าแรก)
    if (tab === 'home') {
      refreshHomeFromSheets();
    }
  };

  const handleToggleDocFavorite = (book: ThaiDocBook) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === book.id && f.type === 'doc');
      if (exists) {
        return prev.filter((f) => !(f.id === book.id && f.type === 'doc'));
      }
      return [
        ...prev,
        {
          id: book.id,
          type: 'doc',
          title: book.title,
          subtitle: `หมวด ${book.category || 'ทั่วไป'}`,
          url: book.url,
          category: book.category,
          image: book.image || book.fallbackImage,
          addedAt: Date.now(),
        },
      ];
    });
  };

  const handleToggleEnFavorite = (book: EnglishBook) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === book.id && f.type === 'en');
      if (exists) {
        return prev.filter((f) => !(f.id === book.id && f.type === 'en'));
      }
      return [
        ...prev,
        {
          id: book.id,
          type: 'en',
          title: book.title,
          subtitle: book.author,
          url: book.url,
          category: book.category,
          image: book.image || book.fallbackImage,
          addedAt: Date.now(),
        },
      ];
    });
  };

  const handleToggleVideoFavorite = (video: VideoClip) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === video.id && f.type === 'video');
      if (exists) {
        return prev.filter((f) => !(f.id === video.id && f.type === 'video'));
      }
      return [
        ...prev,
        {
          id: video.id,
          type: 'video',
          title: video.title,
          subtitle: video.channelName || video.category,
          url: video.url,
          category: video.category,
          image: `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`,
          addedAt: Date.now(),
        },
      ];
    });
  };

  const handleClearAllFavorites = () => {
    setFavorites([]);
  };

  // Helper favorite id lists
  const favoriteDocIds = useMemo(
    () => favorites.filter((f) => f.type === 'doc').map((f) => f.id),
    [favorites]
  );
  const favoriteEnIds = useMemo(
    () => favorites.filter((f) => f.type === 'en').map((f) => f.id),
    [favorites]
  );
  const favoriteVideoIds = useMemo(
    () => favorites.filter((f) => f.type === 'video').map((f) => f.id),
    [favorites]
  );

  // Filtered favorite entities for the Favorites view
  const favDocBooks = useMemo(
    () => docBooks.filter((b) => favoriteDocIds.includes(b.id)),
    [docBooks, favoriteDocIds]
  );
  const favEnBooks = useMemo(
    () => englishBooks.filter((b) => favoriteEnIds.includes(b.id)),
    [englishBooks, favoriteEnIds]
  );
  const favVideos = useMemo(
    () => videos.filter((v) => favoriteVideoIds.includes(v.id)),
    [videos, favoriteVideoIds]
  );

  const totalAllBooks = TOTAL_GUTENBERG_BOOKS + docBooks.length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-blue-500 selection:text-white">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onTabChange={handleTabChange}
        totalBooksCount={totalAllBooks}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3.5 py-4 sm:px-6 sm:py-6 pb-28">
        {activeTab === 'home' && (
          <HomeDocView
            books={docBooks}
            searchQuery={searchQuery}
            onReadBook={(book) => setReadingDocBook(book)}
            favorites={favoriteDocIds}
            onToggleFavorite={handleToggleDocFavorite}
            isRefreshing={isRefreshing}
            onRefresh={refreshHomeFromSheets}
            syncStatusText={syncStatusText}
          />
        )}

        {activeTab === 'english' && (
          <EnglishBooksView
            books={englishBooks}
            searchQuery={searchQuery}
            favorites={favoriteEnIds}
            onToggleFavorite={handleToggleEnFavorite}
          />
        )}

        {activeTab === 'videos' && (
          <VideosView
            videos={videos}
            searchQuery={searchQuery}
            onPlayVideo={(video) => setPlayingVideo(video)}
            favorites={favoriteVideoIds}
            onToggleFavorite={handleToggleVideoFavorite}
          />
        )}

        {activeTab === 'favorites' && (
          <FavoritesView
            favDocBooks={favDocBooks}
            favEnBooks={favEnBooks}
            favVideos={favVideos}
            onReadDocBook={(book) => setReadingDocBook(book)}
            onPlayVideo={(video) => setPlayingVideo(video)}
            onToggleDocFavorite={handleToggleDocFavorite}
            onToggleEnFavorite={handleToggleEnFavorite}
            onToggleVideoFavorite={handleToggleVideoFavorite}
            onClearAll={handleClearAllFavorites}
            onNavigateTab={handleTabChange}
          />
        )}
      </main>

      {/* Bottom Navigation with Favorites count */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        favoritesCount={favorites.length}
        showEnglishTab={true}
      />

      {/* Mobile Google Docs Reader Modal */}
      <DocReaderModal
        book={readingDocBook}
        onClose={() => setReadingDocBook(null)}
        isFavorite={readingDocBook ? favoriteDocIds.includes(readingDocBook.id) : false}
        onToggleFavorite={handleToggleDocFavorite}
      />

      {/* YouTube Video Modal */}
      <VideoModal
        video={playingVideo}
        onClose={() => setPlayingVideo(null)}
        isFavorite={playingVideo ? favoriteVideoIds.includes(playingVideo.id) : false}
        onToggleFavorite={handleToggleVideoFavorite}
      />
    </div>
  );
}
