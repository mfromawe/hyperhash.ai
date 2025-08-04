// API Types for Social Media Hashtag Generation
export interface HashtagRequest {
  content: string;
  platform: SocialMediaPlatform;
  category?: string;
  language?: string;
  targetAudience?: string;
  includeEmojis?: boolean;
  maxHashtags?: number;
}

export interface HashtagResponse {
  hashtags: GeneratedHashtag[];
  analytics: HashtagAnalytics;
  suggestions: ContentSuggestion[];
  metadata: ResponseMetadata;
}

export interface GeneratedHashtag {
  tag: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  volume: number;
  engagement: number;
  trending: boolean;
  category: string;
  description?: string;
}

export interface HashtagAnalytics {
  estimatedReach: number;
  engagementPotential: number;
  competitionLevel: string;
  bestPostingTime: string[];
  platformSpecificTips: string[];
}

export interface ContentSuggestion {
  type: 'caption' | 'timing' | 'format' | 'strategy';
  suggestion: string;
  impact: 'Low' | 'Medium' | 'High';
}

export interface ResponseMetadata {
  requestId: string;
  timestamp: string;
  processingTime: number;
  platform: SocialMediaPlatform;
  apiVersion: string;
}

export type SocialMediaPlatform = 
  | 'instagram'
  | 'tiktok' 
  | 'twitter'
  | 'youtube'
  | 'linkedin'
  | 'pinterest'
  | 'facebook';

export interface PlatformConfig {
  name: string;
  maxHashtags: number;
  optimalHashtags: number;
  features: string[];
  limitations: string[];
  bestPractices: string[];
  apiEndpoint: string;
}

export const PLATFORM_CONFIGS: Record<SocialMediaPlatform, PlatformConfig> = {
  instagram: {
    name: 'Instagram',
    maxHashtags: 30,
    optimalHashtags: 11,
    features: ['Stories', 'Reels', 'Feed Posts', 'IGTV'],
    limitations: ['Shadowban risk with banned hashtags', 'Algorithm changes'],
    bestPractices: [
      'Mix popular and niche hashtags',
      'Use 11 hashtags for optimal engagement',
      'Research hashtag difficulty',
      'Avoid banned hashtags'
    ],
    apiEndpoint: '/api/hashtags/instagram'
  },
  tiktok: {
    name: 'TikTok',
    maxHashtags: 100,
    optimalHashtags: 5,
    features: ['For You Page', 'Trending Sounds', 'Challenges'],
    limitations: ['Character limit', 'Trend dependency'],
    bestPractices: [
      'Use trending hashtags',
      'Include #fyp and #foryou',
      'Mix broad and specific hashtags',
      'Follow current trends'
    ],
    apiEndpoint: '/api/hashtags/tiktok'
  },
  twitter: {
    name: 'Twitter/X',
    maxHashtags: 2,
    optimalHashtags: 1,
    features: ['Trending Topics', 'Spaces', 'Communities'],
    limitations: ['Character limit', 'Real-time dependency'],
    bestPractices: [
      'Use 1-2 hashtags maximum',
      'Join trending conversations',
      'Keep hashtags relevant',
      'Monitor real-time trends'
    ],
    apiEndpoint: '/api/hashtags/twitter'
  },
  youtube: {
    name: 'YouTube',
    maxHashtags: 15,
    optimalHashtags: 8,
    features: ['Video Discovery', 'YouTube Shorts', 'Search Optimization'],
    limitations: ['Description placement', 'Search algorithm dependency'],
    bestPractices: [
      'Use in video description',
      'Focus on searchable terms',
      'Include 3 in title',
      'Optimize for YouTube search'
    ],
    apiEndpoint: '/api/hashtags/youtube'
  },
  linkedin: {
    name: 'LinkedIn',
    maxHashtags: 5,
    optimalHashtags: 3,
    features: ['Professional Network', 'Industry Focus', 'B2B Marketing'],
    limitations: ['Professional context only', 'Limited hashtag count'],
    bestPractices: [
      'Use professional hashtags',
      'Focus on industry keywords',
      'Maximum 3-5 hashtags',
      'Maintain professional tone'
    ],
    apiEndpoint: '/api/hashtags/linkedin'
  },
  pinterest: {
    name: 'Pinterest',
    maxHashtags: 20,
    optimalHashtags: 10,
    features: ['Visual Discovery', 'Shopping', 'Seasonal Content'],
    limitations: ['Image dependency', 'Seasonal variations'],
    bestPractices: [
      'Use descriptive hashtags',
      'Include seasonal tags',
      'Focus on searchable terms',
      'Mix broad and specific'
    ],
    apiEndpoint: '/api/hashtags/pinterest'
  },
  facebook: {
    name: 'Facebook',
    maxHashtags: 5,
    optimalHashtags: 2,
    features: ['Groups', 'Pages', 'Events', 'Marketplace'],
    limitations: ['Algorithm preference for content', 'Lower hashtag impact'],
    bestPractices: [
      'Use sparingly (1-2 hashtags)',
      'Focus on content quality',
      'Use in Facebook Groups',
      'Avoid overuse'
    ],
    apiEndpoint: '/api/hashtags/facebook'
  }
};

export interface APIError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}
