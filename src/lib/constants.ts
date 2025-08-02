// Application constants

export const SUPPORTED_LANGUAGES = {
  auto: 'Auto-detect',
  en: 'English',
  tr: 'Turkish',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  it: 'Italian',
  pt: 'Portuguese',
  ar: 'Arabic',
  ja: 'Japanese',
  ko: 'Korean',
  zh: 'Chinese',
} as const;

export const SUPPORTED_LOCATIONS = {
  global: 'Global',
  us: 'United States',
  uk: 'United Kingdom',
  tr: 'Turkey',
  de: 'Germany',
  fr: 'France',
  es: 'Spain',
  it: 'Italy',
  br: 'Brazil',
  mx: 'Mexico',
  ca: 'Canada',
  au: 'Australia',
  jp: 'Japan',
  kr: 'South Korea',
  in: 'India',
  sa: 'Saudi Arabia',
  ae: 'UAE',
} as const;

export const PLATFORMS = {
  instagram: 'Instagram',
  twitter: 'Twitter',
  youtube: 'YouTube',
  general: 'General',
} as const;

export const HASHTAG_STYLES = {
  organic: 'Organic',
  trending: 'Trending',
  branded: 'Branded',
} as const;

export const API_CONFIG = {
  BASE_URL: 'https://hyperhash-production-2512.up.railway.app',
  ENDPOINTS: {
    GENERATE_HASHTAGS: '/api/generate-hashtags',
    HEALTH: '/api/health',
  },
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 50,
  MIN_LIMIT: 5,
} as const;

export const UI_CONFIG = {
  TOAST_DURATION: 2000,
  ANIMATION_DELAY_STEP: 100, // milliseconds
  MAX_INPUT_LENGTH: 1000,
} as const;

// Language to region mapping for better hashtag generation
export const LANGUAGE_REGION_MAP = {
  en: ['us', 'uk', 'ca', 'au'],
  tr: ['tr'],
  es: ['es', 'mx'],
  fr: ['fr', 'ca'],
  de: ['de'],
  it: ['it'],
  pt: ['br'],
  ar: ['sa', 'ae'],
  ja: ['jp'],
  ko: ['kr'],
  zh: ['global'],
} as const;

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;
export type SupportedLocation = keyof typeof SUPPORTED_LOCATIONS;
export type Platform = keyof typeof PLATFORMS;
export type HashtagStyle = keyof typeof HASHTAG_STYLES;
