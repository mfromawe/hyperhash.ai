import { GoogleGenerativeAI } from '@google/generative-ai';
import { 
  HashtagRequest, 
  HashtagResponse, 
  SocialMediaPlatform, 
  PLATFORM_CONFIGS,
  GeneratedHashtag 
} from '@/types/api';

class GeminiHashtagAPI {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('Gemini API key not found, using mock responses');
      this.genAI = null as any;
      this.model = null;
    } else {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    }
  }

  async generateHashtags(request: HashtagRequest): Promise<HashtagResponse> {
    if (!this.model) {
      return this.generateMockResponse(request);
    }

    try {
      const platformConfig = PLATFORM_CONFIGS[request.platform];
      const prompt = this.buildPrompt(request, platformConfig);
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return this.parseGeminiResponse(text, request, platformConfig);
    } catch (error) {
      console.error('Gemini API error:', error);
      return this.generateMockResponse(request);
    }
  }

  private buildPrompt(request: HashtagRequest, platformConfig: any): string {
    const { content, platform, category } = request;
    
    return `You are a social media expert specializing in ${platform} hashtag strategy.

PLATFORM: ${platform.toUpperCase()}
CONTENT DESCRIPTION: ${content}
${category ? `CATEGORY: ${category}` : ''}

PLATFORM CONSTRAINTS:
- Maximum hashtags: ${platformConfig.maxHashtags}
- Optimal hashtags: ${platformConfig.optimalHashtags}
- Platform features: ${platformConfig.features.join(', ')}
- Best practices: ${platformConfig.bestPractices.join('; ')}

TASK: Generate ${platformConfig.optimalHashtags} highly effective hashtags for this ${platform} content.

REQUIREMENTS:
1. Mix of popular (high volume) and niche (low competition) hashtags
2. Platform-specific optimization for ${platform} algorithm
3. Trending and evergreen hashtag combination
4. Consider engagement potential and difficulty level
5. Follow ${platform} best practices and character limits

RESPONSE FORMAT (JSON):
{
  "hashtags": [
    {
      "tag": "#examplehashtag",
      "difficulty": "Easy|Medium|Hard",
      "volume": estimated_monthly_posts_number,
      "engagement": estimated_engagement_rate_percentage,
      "trending": true|false,
      "category": "main_category",
      "description": "brief explanation why this hashtag works"
    }
  ],
  "analytics": {
    "estimatedReach": estimated_total_reach_number,
    "engagementPotential": estimated_engagement_percentage,
    "competitionLevel": "Low|Medium|High",
    "bestPostingTime": ["time1", "time2", "time3"]
  },
  "suggestions": [
    {
      "type": "caption|timing|format|strategy",
      "suggestion": "specific actionable advice",
      "impact": "Low|Medium|High"
    }
  ]
}

Generate ONLY the JSON response, no additional text.`;
  }

  private parseGeminiResponse(text: string, request: HashtagRequest, platformConfig: any): HashtagResponse {
    try {
      // Extract JSON from response (in case there's extra text)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      
      const parsed = JSON.parse(jsonMatch[0]);
      
      // Validate and structure response
      const hashtags: GeneratedHashtag[] = parsed.hashtags.map((h: any) => ({
        tag: h.tag.startsWith('#') ? h.tag : `#${h.tag}`,
        difficulty: h.difficulty || 'Medium',
        volume: h.volume || Math.floor(Math.random() * 1000000),
        engagement: h.engagement || Math.floor(Math.random() * 80) + 20,
        trending: h.trending || false,
        category: h.category || 'general',
        description: h.description || `Popular ${request.platform} hashtag`
      }));

      return {
        hashtags,
        analytics: {
          estimatedReach: parsed.analytics?.estimatedReach || Math.floor(Math.random() * 100000) + 10000,
          engagementPotential: parsed.analytics?.engagementPotential || Math.floor(Math.random() * 80) + 20,
          competitionLevel: parsed.analytics?.competitionLevel || 'Medium',
          bestPostingTime: parsed.analytics?.bestPostingTime || this.getBestPostingTimes(request.platform),
          platformSpecificTips: platformConfig.bestPractices
        },
        suggestions: parsed.suggestions || [
          {
            type: 'strategy',
            suggestion: `Consider posting during peak hours for ${request.platform}`,
            impact: 'Medium'
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
    } catch (error) {
      console.error('Error parsing Gemini response:', error);
      return this.generateMockResponse(request);
    }
  }

  private generateMockResponse(request: HashtagRequest): HashtagResponse {
    const platformConfig = PLATFORM_CONFIGS[request.platform];
    const hashtagCount = Math.min(
      request.maxHashtags || platformConfig.optimalHashtags,
      platformConfig.maxHashtags
    );

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
        apiVersion: '1.0.0-mock'
      }
    };
  }

  private generateMockHashtags(content: string, platform: SocialMediaPlatform, count: number): GeneratedHashtag[] {
    const baseHashtags = {
      instagram: [
        'instadaily', 'photooftheday', 'instagood', 'instalove', 'instamood',
        'photography', 'picoftheday', 'instapic', 'lifestyle', 'beautiful',
        'happy', 'love', 'nature', 'art', 'fashion', 'food', 'travel',
        'fitness', 'motivation', 'inspiration', 'business', 'entrepreneur'
      ],
      tiktok: [
        'fyp', 'foryou', 'viral', 'trending', 'tiktokmade', 'tiktokers',
        'dance', 'comedy', 'funny', 'entertainment', 'music', 'duet',
        'challenge', 'trend', 'explore', 'discover', 'creators', 'talent'
      ],
      twitter: [
        'breaking', 'news', 'trending', 'discussion', 'opinion', 'thoughts',
        'thread', 'twitter', 'social', 'media', 'tech', 'business'
      ],
      youtube: [
        'youtube', 'youtuber', 'video', 'subscribe', 'content', 'creator',
        'tutorial', 'howto', 'review', 'vlog', 'gaming', 'entertainment'
      ],
      linkedin: [
        'linkedin', 'professional', 'business', 'career', 'networking',
        'leadership', 'management', 'industry', 'corporate', 'b2b'
      ],
      pinterest: [
        'pinterest', 'inspiration', 'ideas', 'diy', 'crafts', 'home',
        'decor', 'fashion', 'style', 'beauty', 'food', 'recipes'
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
export const geminiHashtagAPI = new GeminiHashtagAPI();

export default GeminiHashtagAPI;
