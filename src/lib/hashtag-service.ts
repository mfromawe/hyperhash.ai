import { API_CONFIG, type SupportedLanguage, type SupportedLocation, type Platform, type HashtagStyle } from './constants';

export interface HashtagRequest {
  title: string;
  description: string;
  keywords: string[];
  style: HashtagStyle;
  platform: Platform;
  language: SupportedLanguage;
  location: SupportedLocation;
  limit?: number;
}

export interface HashtagResponse {
  hashtags: string[];
  metadata: {
    total_generated: number;
    style: string;
    platform: string;
    language: string;
    processing_time_ms: number;
    model_used: string;
    request_id: string;
  };
  usage: {
    hashtags_generated_this_request: number;
    total_hashtags_this_month: number;
    plan: string;
    included_hashtags: number;
    hashtags_remaining: number;
    overage_hashtags: number;
    billing_cycle_start: string;
    billing_cycle_end: string;
    estimated_cost: {
      monthly_fee: number;
      overage_charges: number;
      total_estimated: number;
    };
    rate_info: {
      current_rate: string;
      next_billing: string;
    };
    warnings?: string[];
  };
  analytics: {
    trending_score: number;
    relevance_score: number;
    engagement_potential: string;
    popularity_metrics: {
      average_posts: number;
      growth_rate: number;
    };
  };
  categories: {
    trending?: string[];
    niche?: string[];
  };
}

export class HashtagService {
  private baseUrl: string;

  constructor(baseUrl: string = API_CONFIG.BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Generate hashtags using the API
   */
  async generateHashtags(request: HashtagRequest): Promise<HashtagResponse> {
    const url = `${this.baseUrl}${API_CONFIG.ENDPOINTS.GENERATE_HASHTAGS}`;
    
    const body = {
      title: request.title,
      description: request.description,
      keywords: request.keywords,
      style: request.style,
      platform: request.platform,
      language: request.language,
      location: request.location,
      limit: request.limit || API_CONFIG.DEFAULT_LIMIT,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Check API health
   */
  async checkHealth(): Promise<{ status: string; timestamp: string }> {
    const url = `${this.baseUrl}${API_CONFIG.ENDPOINTS.HEALTH}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Health check failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Process text to extract keywords
   */
  static extractKeywords(text: string, minLength: number = 3, maxKeywords: number = 10): string[] {
    return text
      .split(/\s+/)
      .filter(word => word.length > minLength)
      .filter(word => /^[a-zA-ZÀ-ÿ\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF]+$/.test(word))
      .slice(0, maxKeywords);
  }

  /**
   * Generate title from text
   */
  static generateTitle(text: string, maxWords: number = 5): string {
    return text.split(' ').slice(0, maxWords).join(' ');
  }
}

export default HashtagService;
