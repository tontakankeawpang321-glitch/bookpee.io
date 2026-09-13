import React, { useState, useMemo } from 'react';
import { Youtube, Search, LayoutGrid, Rows } from 'lucide-react';
import { VideoClip } from '../types';
import { VideoCard } from '../components/VideoCard';

interface VideosViewProps {
  videos: VideoClip[];
  searchQuery: string;
  onPlayVideo: (video: VideoClip) => void;
  favorites?: string[];
  onToggleFavorite?: (video: VideoClip) => void;
}

export const VideosView: React.FC<VideosViewProps> = ({
  videos,
  searchQuery,
  onPlayVideo,
  favorites,
  onToggleFavorite,
}) => {
  const [viewMode, setViewMode] = useState<'rows' | 'grid'>('rows');

  // Filter videos
  const filteredVideos = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return videos.filter((v) => {
      if (!q) return true;
      return (
        v.title.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q) ||
        (v.channelName && v.channelName.toLowerCase().includes(q))
      );
    });
  }, [videos, searchQuery]);

  // Group by category for row layout
  const groupedByCategory = useMemo(() => {
    const groups: { [key: string]: VideoClip[] } = {};
    filteredVideos.forEach((v) => {
      const cat = v.category || 'ทั่วไป';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(v);
    });
    return groups;
  }, [filteredVideos]);

  const categories = Object.keys(groupedByCategory);

  return (
    <section id="videos-view" className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-rose-950 to-slate-950 text-white rounded-3xl p-4 sm:p-5 border border-slate-800 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600/20 text-red-300 text-[11px] font-semibold mb-2 border border-red-500/30">
              <Youtube className="w-3 h-3 text-red-500" />
              <span>นิยายเล่าเรื่องแบบ พอตแคสต์</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white uppercase">
              นิยายเล่าเรื่อง & เสียงบรรยาย
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-md leading-relaxed">
              ฟังวรรณกรรมคลาสสิกและเรื่องเล่าสืบสวนสอบสวนแบบพอตแคสต์ พร้อมตัวเล่นวิดีโอบนมือถือ
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md p-1 rounded-xl border border-white/10 self-start sm:self-auto">
            <button
              onClick={() => setViewMode('rows')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'rows' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Rows className="w-3.5 h-3.5" />
              <span>แถวเลื่อน</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>ตาราง</span>
            </button>
          </div>
        </div>
      </div>

      {filteredVideos.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl border border-slate-200/80 p-6">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-slate-700">ไม่พบวิดีโอที่ค้นหา</p>
          <p className="text-xs text-slate-400 mt-1">ลองค้นหาด้วยคำอื่น หรือล้างกล่องค้นหา</p>
        </div>
      ) : viewMode === 'rows' ? (
        /* Horizontal Scroll Rows Layout (Like original InterLib) */
        <div className="space-y-6">
          {categories.map((cat) => {
            const clips = groupedByCategory[cat];
            return (
              <div key={cat} className="space-y-2.5">
                <div className="flex items-center justify-between px-1">
                  <h3 className="font-bold text-sm text-slate-900 border-l-4 border-rose-600 pl-2.5">
                    {cat}
                  </h3>
                  <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full">
                    {clips.length} ตอน
                  </span>
                </div>

                <div className="flex gap-3.5 overflow-x-auto no-scrollbar py-1 px-0.5 scroll-smooth">
                  {clips.map((video) => (
                    <VideoCard
                      key={video.id}
                      video={video}
                      onPlay={onPlayVideo}
                      isFavorite={favorites?.includes(video.id) ?? false}
                      onToggleFavorite={onToggleFavorite}
                      isCompact={true}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Grid Layout */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onPlay={onPlayVideo}
              isFavorite={favorites?.includes(video.id) ?? false}
              onToggleFavorite={onToggleFavorite}
              isCompact={false}
            />
          ))}
        </div>
      )}
    </section>
  );
};
