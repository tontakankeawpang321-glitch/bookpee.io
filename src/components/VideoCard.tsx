import React from 'react';
import { Play, Youtube, Heart } from 'lucide-react';
import { VideoClip } from '../types';

interface VideoCardProps {
  video: VideoClip;
  onPlay: (video: VideoClip) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (video: VideoClip) => void;
  isCompact?: boolean;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  onPlay,
  isFavorite = false,
  onToggleFavorite,
  isCompact = false,
}) => {
  const thumbnail = `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`;

  return (
    <div
      id={`video-card-${video.id}`}
      className={`group relative bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden ${
        isCompact ? 'min-w-[240px] sm:min-w-[280px] max-w-[280px]' : 'w-full'
      }`}
    >
      {/* Thumbnail */}
      <div
        onClick={() => onPlay(video)}
        className="relative aspect-video bg-slate-900 cursor-pointer overflow-hidden"
      >
        <img
          src={thumbnail}
          alt={video.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
        />

        {/* Favorite Button */}
        {onToggleFavorite && (
          <button
            id={`fav-vid-btn-${video.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(video);
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

        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/25 flex items-center justify-center group-hover:bg-black/40 transition-colors">
          <div className="w-11 h-11 rounded-full bg-red-600/90 group-hover:bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>

        {/* Duration Badge */}
        {video.duration && (
          <span className="absolute bottom-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/80 text-white">
            {video.duration}
          </span>
        )}

        {/* YouTube logo pill */}
        <span className="absolute bottom-2 left-2 flex items-center gap-1 text-[9px] font-semibold px-1.5 py-0.5 rounded bg-black/70 text-white/90">
          <Youtube className="w-2.5 h-2.5 text-red-500" />
          <span>พอตแคสต์</span>
        </span>
      </div>

      {/* Title & Info */}
      <div className="p-3 flex flex-col flex-1 justify-between gap-1.5">
        <div>
          <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider block">
            {video.category}
          </span>
          <h4
            onClick={() => onPlay(video)}
            className="text-xs sm:text-sm font-semibold text-slate-800 line-clamp-2 leading-snug hover:text-blue-600 cursor-pointer mt-0.5"
          >
            {video.title}
          </h4>
        </div>
        {video.channelName && (
          <p className="text-[10px] text-slate-400 truncate">
            {video.channelName}
          </p>
        )}
      </div>
    </div>
  );
};
