import { 
  HashtagRequest, 
  HashtagResponse, 
  SocialMediaPlatform, 
  PLATFORM_CONFIGS,
  APIError 
} from '@/types/api';

// The core class for making API requests
class HashtagAPI {
  private baseUrl: string;
  private apiKey?: string;

  constructor(baseUrl: string, apiKey?: string) {
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

    if (request.maxHashtags && request.maxHashtags > platformConfig.maxHashtags) {
      request.maxHashtags = platformConfig.maxHashtags;
    }

    // Correctly use the baseUrl for the request
    const endpoint = this.baseUrl.startsWith('http') ? '/api/hashtags/generate' : '/hashtags/generate';

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
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
      console.error(`API request to ${this.baseUrl} failed:`, error);
      // Re-throw the error to be caught by the UI component
      throw error;
    }
  }

  // Mock API for development/demo purposes
  async generateHashtagsMock(request: HashtagRequest): Promise<HashtagResponse> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const platformConfig = PLATFORM_CONFIGS[request.platform];
    const hashtagCount = request.maxHashtags || platformConfig.optimalHashtags;

    const mockHashtags = Array.from({ length: hashtagCount }, (_, i) => ({
      tag: `#${request.platform}mock${i + 1}`,
      difficulty: 'Medium' as 'Easy' | 'Medium' | 'Hard',
      volume: 10000,
      engagement: 50,
      trending: false,
      category: 'mock',
      description: 'This is a mock hashtag.'
    }));

    return {
      hashtags: mockHashtags,
      analytics: {
        estimatedReach: 50000,
        engagementPotential: 75,
        competitionLevel: 'Medium',
        bestPostingTime: ['6:00 PM'],
        platformSpecificTips: platformConfig.bestPractices
      },
      suggestions: [
        {
          type: 'caption',
          suggestion: 'This is a mock suggestion.',
          impact: 'Medium'
        }
      ],
      metadata: {
        requestId: `req_mock_${Date.now()}`,
        timestamp: new Date().toISOString(),
        processingTime: 100,
        platform: request.platform,
        apiVersion: '1.0.0-mock'
      }
    };
  }
}

// API client specifically for the Vercel-hosted Gemini endpoint
export const geminiAPI = new HashtagAPI('/api');

// Export utility functions
export const getPlatformConfig = (platform: SocialMediaPlatform) => {
  return PLATFORM_CONFIGS[platform];
};

export const getAllPlatforms = (): SocialMediaPlatform[] => {
  return Object.keys(PLATFORM_CONFIGS) as SocialMediaPlatform[];
};