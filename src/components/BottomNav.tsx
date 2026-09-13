import React from 'react';
import { FileText, BookMarked, PlaySquare, Heart } from 'lucide-react';
import { ActiveTab } from '../types';

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  favoritesCount?: number;
  showEnglishTab?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  favoritesCount = 0,
  showEnglishTab = false,
}) => {
  const allTabs = [
    {
      id: 'home' as ActiveTab,
      label: 'หน้าแรก',
      sublabel: 'Docs แปลไทย',
      icon: FileText,
    },
    {
      id: 'english' as ActiveTab,
      label: 'หนังสืออังกฤษ',
      sublabel: 'Originals',
      icon: BookMarked,
    },
    {
      id: 'videos' as ActiveTab,
      label: 'วิดีโอ',
      sublabel: 'พอตแคสต์',
      icon: PlaySquare,
    },
    {
      id: 'favorites' as ActiveTab,
      label: 'รายการโปรด',
      sublabel: 'ที่บันทึกไว้',
      icon: Heart,
      badge: favoritesCount > 0 ? favoritesCount : null,
    },
  ];

  // If no data in sheet for English books, hide the English tab per user request
  const tabs = showEnglishTab ? allTabs : allTabs.filter((t) => t.id !== 'english');

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] pb-[env(safe-area-inset-bottom,0px)]">
      <div className={`max-w-md mx-auto grid ${tabs.length === 3 ? 'grid-cols-3' : 'grid-cols-4'} h-16 px-1`}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              id={`nav-${tab.id}`}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center justify-center gap-1 transition-all py-1 ${
                isActive ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {/* Active indicator bar on top */}
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-b-full shadow-xs" />
              )}

              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.4]' : 'scale-100 stroke-[1.8]'
                  } ${tab.id === 'favorites' && isActive ? 'text-rose-500 fill-rose-500' : ''}`}
                />

                {tab.badge !== null && tab.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                    {tab.badge > 99 ? '99+' : tab.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[11px] font-semibold tracking-tight transition-all ${
                  isActive ? (tab.id === 'favorites' ? 'font-bold text-rose-600' : 'font-bold text-blue-600') : 'text-slate-500'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
