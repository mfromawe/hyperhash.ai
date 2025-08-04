import { GoogleGenerativeAI } from '@google/generative-ai';
import { 
  HashtagRequest, 
  HashtagResponse, 
  SocialMediaPlatform, 
  PLATFORM_CONFIGS,
  GeneratedHashtag 
} from '@/types/api';

class GeminiHashtagService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set in environment variables');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async generateHashtags(request: HashtagRequest): Promise<HashtagResponse> {
    const platformConfig = PLATFORM_CONFIGS[request.platform];
    
    if (!platformConfig) {
      throw new Error(`Unsupported platform: ${request.platform}`);
    }

    const prompt = this.buildPrompt(request, platformConfig);
    
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return this.parseGeminiResponse(text, request);
    } catch (error) {
      console.error('Gemini API error:', error);
      // Fallback to mock data if API fails
      return this.generateMockResponse(request);
    }
  }

  private buildPrompt(request: HashtagRequest, platformConfig: any): string {
    const { platform, content, category, maxHashtags } = request;
    const targetCount = Math.min(maxHashtags || platformConfig.optimalHashtags, platformConfig.maxHashtags);

    return `
You are a social media expert specializing in ${platformConfig.name} hashtag strategy. 

PLATFORM: ${platformConfig.name}
CONTENT DESCRIPTION: ${content}
CATEGORY: ${category || 'general'}
TARGET HASHTAG COUNT: ${targetCount}
PLATFORM LIMITS: Max ${platformConfig.maxHashtags}, Optimal ${platformConfig.optimalHashtags}

PLATFORM-SPECIFIC RULES FOR ${platform.toUpperCase()}:
${this.getPlatformSpecificRules(platform)}

BEST PRACTICES FOR ${platform.toUpperCase()}:
${platformConfig.bestPractices.map((practice: string) => `- ${practice}`).join('\n')}

Please generate exactly ${targetCount} hashtags for this ${platformConfig.name} content. 

For each hashtag, provide:
1. The hashtag (with # symbol)
2. Difficulty level (Easy/Medium/Hard)
3. Estimated volume (number)
4. Engagement potential (percentage)
5. Whether it's trending (true/false)
6. Category classification
7. Brief description

Return the response in this exact JSON format:
{
  "hashtags": [
    {
      "tag": "#example",
      "difficulty": "Medium",
      "volume": 150000,
      "engagement": 65,
      "trending": false,
      "category": "lifestyle",
      "description": "Popular hashtag for lifestyle content"
    }
  ],
  "analytics": {
    "estimatedReach": 50000,
    "engagementPotential": 75,
    "competitionLevel": "Medium",
    "bestPostingTime": ["6:00 PM", "8:00 PM"]
  },
  "suggestions": [
    {
      "type": "caption",
      "suggestion": "Consider adding emojis to increase engagement",
      "impact": "Medium"
    }
  ]
}

Focus on:
- High-performing hashtags for ${platformConfig.name}
- Mix of popular and niche hashtags
- Relevant to the content: "${content}"
- Current trends and algorithm preferences
- Avoiding banned or shadowbanned hashtags
`;
  }

  private getPlatformSpecificRules(platform: SocialMediaPlatform): string {
    const rules = {
      instagram: `
- Use mix of popular (1M+ posts) and niche (10K-100K posts) hashtags
- Avoid banned hashtags that cause shadowbanning
- Include hashtags for Reels if video content (#reels #reelsinstagram)
- Use location hashtags if applicable
- Mix broad and specific hashtags (80/20 rule)
- Consider using hashtags in first comment to keep caption clean`,
      
      tiktok: `
- Focus heavily on trending hashtags and challenges
- Always include #fyp and #foryou for algorithm boost
- Use sound/music-related hashtags if applicable
- Include challenge hashtags if participating
- Keep hashtags trendy and current (trends change fast)
- Mix viral hashtags with niche content hashtags`,
      
      twitter: `
- Use maximum 1-2 hashtags (algorithm prefers fewer)
- Focus on trending topics and current events
- Join trending conversations with relevant hashtags
- Keep hashtags short and memorable
- Use hashtags that encourage discussion
- Avoid hashtag stuffing (reduces engagement)`,
      
      youtube: `
- Use hashtags that improve searchability
- Include 3 hashtags in video title for best results
- Focus on keyword-rich hashtags for SEO
- Use hashtags related to video content/niche
- Include broader category hashtags
- Avoid misleading hashtags (against YouTube policy)`,
      
      linkedin: `
- Use 3-5 professional, industry-relevant hashtags
- Focus on business, career, and industry keywords
- Avoid casual or overly promotional hashtags
- Use hashtags that professionals in your field follow
- Include company or personal branding hashtags
- Keep tone professional and business-appropriate`,
      
      pinterest: `
- Use descriptive, searchable hashtags
- Include seasonal hashtags when relevant
- Focus on keywords people search for
- Use hashtags that describe the visual content
- Include 2-3 broad hashtags and 7-8 specific ones
- Consider seasonal trends and holidays`,
      
      facebook: `
- Use hashtags sparingly (1-2 maximum)
- Focus on content quality over hashtag quantity
- Use hashtags mainly in Facebook Groups
- Avoid overusing hashtags (reduces organic reach)
- Focus on community and local hashtags
- Hashtags less important than on other platforms`
    };

    return rules[platform] || rules.instagram;
  }

  private parseGeminiResponse(text: string, request: HashtagRequest): HashtagResponse {
    try {
      // Extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsedData = JSON.parse(jsonMatch[0]);
        
        // Validate and structure the response
        return {
          hashtags: parsedData.hashtags || [],
          analytics: {
            estimatedReach: parsedData.analytics?.estimatedReach || Math.floor(Math.random() * 100000) + 10000,
            engagementPotential: parsedData.analytics?.engagementPotential || Math.floor(Math.random() * 80) + 20,
            competitionLevel: parsedData.analytics?.competitionLevel || 'Medium',
            bestPostingTime: parsedData.analytics?.bestPostingTime || this.getBestPostingTimes(request.platform),
            platformSpecificTips: PLATFORM_CONFIGS[request.platform].bestPractices
          },
          suggestions: parsedData.suggestions || [
            {
              type: 'strategy',
              suggestion: `Optimize your ${request.platform} content with these hashtags for better reach`,
              impact: 'High'
            }
          ],
          metadata: {
            requestId: `gemini_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date().toISOString(),
            processingTime: Math.floor(Math.random() * 3000) + 1000,
            platform: request.platform,
            apiVersion: '1.0.0-gemini'
          }
        };
      }
    } catch (error) {
      console.error('Error parsing Gemini response:', error);
    }

    // Fallback if parsing fails
    return this.generateMockResponse(request);
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
          suggestion: `Best time to post on ${request.platform} is during peak hours`,
          impact: 'High'
        }
      ],
      metadata: {
        requestId: `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        processingTime: Math.floor(Math.random() * 3000) + 500,
        platform: request.platform,
        apiVersion: '1.0.0-mock'
      }
    };
  }

  private generateMockHashtags(
    content: string, 
    platform: SocialMediaPlatform, 
    count: number
  ): GeneratedHashtag[] {
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
        'challenge', 'trend', 'explore', 'discover', 'creators',
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
export const geminiHashtagService = new GeminiHashtagService();
