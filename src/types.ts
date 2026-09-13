export interface ThaiDocBook {
  id: string;
  category: string;
  title: string;
  rawTitle: string;
  url: string;
  previewUrl: string;
  sheetSource: 1 | 2 | 3;
  fileType: 'docx' | 'txt' | 'doc';
  author?: string;
  docId?: string;
  image?: string;
  fallbackImage?: string;
  coverGradient?: string;
  description?: string;
}

export interface EnglishBook {
  id: string;
  title: string;
  author: string;
  category: string;
  url: string;
  html?: string;
  image: string;
  fallbackImage?: string;
  description: string;
  year?: string;
  source: string;
}

export interface VideoClip {
  id: string;
  title: string;
  category: string;
  url: string;
  youtubeId: string;
  duration?: string;
  channelName?: string;
  description?: string;
}

export interface FavoriteItem {
  id: string;
  type: 'doc' | 'en' | 'video';
  title: string;
  subtitle?: string;
  url: string;
  category: string;
  image?: string;
  addedAt: number;
}

export type ActiveTab = 'home' | 'english' | 'videos' | 'favorites';
