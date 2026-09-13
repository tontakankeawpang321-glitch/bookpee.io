import React from 'react';
import { X, ExternalLink, Youtube, Heart } from 'lucide-react';
import { VideoClip } from '../types';

interface VideoModalProps {
  video: VideoClip | null;
  onClose: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: (video: VideoClip) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  video,
  onClose,
  isFavorite = false,
  onToggleFavorite,
}) => {
  if (!video) return null;

  return (
    <div
      id="video-player-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-0 sm:p-4 transition-all"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl bg-slate-950 sm:rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-white">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="p-1.5 rounded-lg bg-red-600/20 text-red-500 shrink-0">
              <Youtube className="w-4 h-4" />
            </span>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] text-slate-400 block truncate">
                {video.category} • {video.channelName || 'YouTube Audio Story'}
              </span>
              <h3 className="text-xs sm:text-sm font-semibold truncate text-slate-200">
                {video.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 ml-2">
            {onToggleFavorite && (
              <button
                id="video-modal-fav-btn"
                onClick={() => onToggleFavorite(video)}
                className={`p-1.5 rounded-full transition-colors ${
                  isFavorite
                    ? 'text-rose-500 hover:text-rose-400 bg-rose-500/10'
                    : 'text-slate-400 hover:text-rose-400 hover:bg-slate-800'
                }`}
                title={isFavorite ? 'ลบออกจากรายการโปรด' : 'เพิ่มในรายการโปรด'}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            )}

            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-400 hover:text-white transition-colors"
              title="เปิดในแอป YouTube"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors ml-1"
              aria-label="ปิดเครื่องเล่น"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Modal footer info */}
        <div className="p-3 bg-slate-900/90 text-xs text-slate-400 flex items-center justify-between">
          <span className="truncate">🎧 ฟังนิยายเล่าเรื่อง & พอตแคสต์บนมือถือ</span>
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-400 hover:text-red-300 font-medium inline-flex items-center gap-1 shrink-0 ml-2"
          >
            <span>เปิดบน YouTube</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
