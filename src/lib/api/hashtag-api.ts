import { 
  HashtagRequest, 
  HashtagResponse, 
  SocialMediaPlatform, 
  PLATFORM_CONFIGS,
  APIError 
} from '@/types/api';

class HashtagAPI {
  private baseUrl: string;
  private apiKey?: string;

  constructor(baseUrl: string = '/api', apiKey?: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  private async makeRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.apiKey) {
      defaultHeaders['Authorization'] = `Bearer ${this.apiKey}`;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData: APIError = await response.json();
        throw new Error(`API Error: ${errorData.message}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  async generateHashtags(request: HashtagRequest): Promise<HashtagResponse> {
    const platformConfig = PLATFORM_CONFIGS[request.platform];
    
    if (!platformConfig) {
      throw new Error(`Unsupported platform: ${request.platform}`);
    }

    // Platform-specific request validation
    if (request.maxHashtags && request.maxHashtags > platformConfig.maxHashtags) {
      request.maxHashtags = platformConfig.maxHashtags;
    }

    try {
      // Use API route for real Gemini integration
      const response = await fetch('/api/hashtags/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed, falling back to mock:', error);
      // Fallback to mock if API fails
      return this.generateHashtagsMock(request);
    }
  }

  async getTrendingHashtags(platform: SocialMediaPlatform): Promise<string[]> {
    return this.makeRequest<string[]>(`/hashtags/${platform}/trending`);
  }

  async analyzeHashtag(hashtag: string, platform: SocialMediaPlatform): Promise<any> {
    return this.makeRequest(`/hashtags/${platform}/analyze/${encodeURIComponent(hashtag)}`);
  }

  async getHashtagSuggestions(
    keyword: string, 
    platform: SocialMediaPlatform
  ): Promise<string[]> {
    return this.makeRequest<string[]>(
      `/hashtags/${platform}/suggestions?keyword=${encodeURIComponent(keyword)}`
    );
  }

  // Mock API for development/demo purposes
  async generateHashtagsMock(request: HashtagRequest): Promise<HashtagResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const platformConfig = PLATFORM_CONFIGS[request.platform];
    const hashtagCount = Math.min(
      request.maxHashtags || platformConfig.optimalHashtags,
      platformConfig.maxHashtags
    );

    // Mock hashtag generation based on platform
    const mockHashtags = this.generateMockHashtags(
      request.content, 
      request.platform, 
      hashtagCount
    );

    return {
      hashtags: mockHashtags,
      analytics: {
        estimatedReach: Math.floor(Math.random() * 100000) + 10000,
        engagementPotential: Math.floor(Math.random() * 80) + 20,
        competitionLevel: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
        bestPostingTime: this.getBestPostingTimes(request.platform),
        platformSpecificTips: platformConfig.bestPractices
      },
      suggestions: [
        {
          type: 'caption',
          suggestion: `Consider adding emojis to make your ${request.platform} post more engaging`,
          impact: 'Medium'
        },
        {
          type: 'timing',
          suggestion: `Best time to post on ${request.platform} is between 6-9 PM`,
          impact: 'High'
        }
      ],
      metadata: {
        requestId: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        processingTime: Math.floor(Math.random() * 3000) + 500,
        platform: request.platform,
        apiVersion: '1.0.0'
      }
    };
  }

  private generateMockHashtags(
    content: string, 
    platform: SocialMediaPlatform, 
    count: number
  ) {
    const baseHashtags = {
      instagram: [
        'instadaily', 'photooftheday', 'instagood', 'instalove', 'instamood',
        'photography', 'picoftheday', 'instapic', 'lifestyle', 'beautiful',
        'happy', 'love', 'nature', 'art', 'fashion', 'food', 'travel',
        'fitness', 'motivation', 'inspiration', 'business', 'entrepreneur',
        'success', 'marketing', 'branding', 'creative', 'design', 'style'
      ],
      tiktok: [
        'fyp', 'foryou', 'viral', 'trending', 'tiktokmade', 'tiktokers',
        'dance', 'comedy', 'funny', 'entertainment', 'music', 'duet',
        'challenge', 'trend', 'viral', 'explore', 'discover', 'creators',
        'talent', 'performance', 'skills', 'tutorial', 'howto', 'tips'
      ],
      twitter: [
        'breaking', 'news', 'trending', 'discussion', 'opinion', 'thoughts',
        'thread', 'twitter', 'social', 'media', 'tech', 'business',
        'politics', 'sports', 'entertainment', 'culture', 'society'
      ],
      youtube: [
        'youtube', 'youtuber', 'video', 'subscribe', 'content', 'creator',
        'tutorial', 'howto', 'review', 'vlog', 'gaming', 'entertainment',
        'education', 'music', 'comedy', 'tech', 'lifestyle', 'travel'
      ],
      linkedin: [
        'linkedin', 'professional', 'business', 'career', 'networking',
        'leadership', 'management', 'industry', 'corporate', 'b2b',
        'sales', 'marketing', 'strategy', 'innovation', 'growth'
      ],
      pinterest: [
        'pinterest', 'inspiration', 'ideas', 'diy', 'crafts', 'home',
        'decor', 'fashion', 'style', 'beauty', 'food', 'recipes',
        'wedding', 'design', 'art', 'photography', 'lifestyle'
      ],
      facebook: [
        'facebook', 'community', 'family', 'friends', 'local', 'event',
        'business', 'page', 'group', 'discussion', 'social', 'network'
      ]
    };

    const platformHashtags = baseHashtags[platform] || baseHashtags.instagram;
    const selectedHashtags = this.shuffleArray(platformHashtags).slice(0, count);

    return selectedHashtags.map((tag, index) => ({
      tag: `#${tag}`,
      difficulty: ['Easy', 'Medium', 'Hard'][Math.floor(Math.random() * 3)] as 'Easy' | 'Medium' | 'Hard',
      volume: Math.floor(Math.random() * 1000000) + 1000,
      engagement: Math.floor(Math.random() * 80) + 20,
      trending: Math.random() > 0.7,
      category: this.getCategoryForHashtag(tag),
      description: `Popular ${platform} hashtag for ${tag}-related content`
    }));
  }

  private getCategoryForHashtag(tag: string): string {
    const categories = {
      'lifestyle': ['lifestyle', 'daily', 'mood', 'inspiration', 'motivation'],
      'photography': ['photo', 'pic', 'photography', 'beautiful', 'art'],
      'business': ['business', 'entrepreneur', 'success', 'marketing', 'professional'],
      'entertainment': ['funny', 'comedy', 'entertainment', 'viral', 'trending'],
      'fashion': ['fashion', 'style', 'beauty', 'outfit'],
      'travel': ['travel', 'adventure', 'explore', 'vacation'],
      'food': ['food', 'recipe', 'cooking', 'delicious'],
      'fitness': ['fitness', 'workout', 'health', 'gym'],
      'technology': ['tech', 'digital', 'innovation', 'ai']
    };

    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => tag.toLowerCase().includes(keyword))) {
        return category;
      }
    }
    return 'general';
  }

  private getBestPostingTimes(platform: SocialMediaPlatform): string[] {
    const times = {
      instagram: ['6:00 AM', '12:00 PM', '6:00 PM', '9:00 PM'],
      tiktok: ['6:00 AM', '10:00 AM', '7:00 PM', '9:00 PM'],
      twitter: ['9:00 AM', '12:00 PM', '3:00 PM', '6:00 PM'],
      youtube: ['2:00 PM', '4:00 PM', '6:00 PM', '8:00 PM'],
      linkedin: ['8:00 AM', '12:00 PM', '2:00 PM', '5:00 PM'],
      pinterest: ['8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM'],
      facebook: ['9:00 AM', '1:00 PM', '6:00 PM', '8:00 PM']
    };

    return times[platform] || times.instagram;
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}

// Export singleton instance
export const hashtagAPI = new HashtagAPI();

// Export utility functions
export const getPlatformConfig = (platform: SocialMediaPlatform) => {
  return PLATFORM_CONFIGS[platform];
};

export const getAllPlatforms = (): SocialMediaPlatform[] => {
  return Object.keys(PLATFORM_CONFIGS) as SocialMediaPlatform[];
};

export const validateHashtagRequest = (request: HashtagRequest): boolean => {
  if (!request.content || !request.platform) {
    return false;
  }

  const config = PLATFORM_CONFIGS[request.platform];
  if (!config) {
    return false;
  }

  return true;
};
