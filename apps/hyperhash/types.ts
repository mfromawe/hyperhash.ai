
export interface Hashtag {
  hashtag: string;
  trend_score: number;
  reason: string;
}

export type Platform = 'Instagram' | 'TikTok' | 'YouTube' | 'Twitter/X';
export type Language = 'English' | 'Turkish' | 'Spanish' | 'French' | 'German' | 'Portuguese' | 'Arabic' | 'Japanese' | 'Korean' | 'Chinese';
export type Style = 'Organic' | 'Trending' | 'Branded' | 'Hybrid';

export interface GenerationParams {
  content: string;
  platform: Platform;
  language: Language;
  style: Style;
}
