import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { 
  HashtagRequest, 
  HashtagResponse, 
  PLATFORM_CONFIGS 
} from '@/types/api';
import { AuthService } from '@/lib/auth/service';
import { hashtagRateLimiter } from '@/lib/rate-limiter';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Input validation schema
const validateInput = (body: any): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!body.content?.trim() || body.content.length > 2000) {
    errors.push('Content must be 1-2000 characters');
  }
  
  if (!body.platform || !(body.platform in PLATFORM_CONFIGS)) {
    errors.push('Valid platform required');
  }
  
  return { valid: errors.length === 0, errors };
};

export async function POST(request: NextRequest) {
  let body: HashtagRequest;
  
  try {
    // Get client IP for rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown';
    
    // Check rate limit
    if (!hashtagRateLimiter.isAllowed(clientIP)) {
      const resetTime = hashtagRateLimiter.getResetTime(clientIP);
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded. Please try again later.',
          resetTime: new Date(resetTime).toISOString()
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': resetTime.toString()
          }
        }
      );
    }
    
    body = await request.json();
    
    // Validate input
    const validation = validateInput(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 }
      );
    }
    
    const platformConfig = PLATFORM_CONFIGS[body.platform];
    if (!platformConfig) {
      return NextResponse.json(
        { error: `Unsupported platform: ${body.platform}` },
        { status: 400 }
      );
    }

    // Check authentication and usage limits
    const token = request.cookies.get('auth-token')?.value;
    let userId: string | null = null;
    
    if (token) {
      const authResult = await AuthService.getUserFromToken(token);
      if (authResult.success && authResult.user) {
        userId = authResult.user.id;
        
        // Check usage limits
        const usage = await AuthService.getUserUsage(authResult.user.id);
        if (usage && usage.isLimitReached) {
          return NextResponse.json(
            { 
              error: 'Monthly usage limit exceeded. Please upgrade your plan to continue generating hashtags.',
              upgradeRequired: true,
              usage 
            },
            { status: 403 }
          );
        }
      }
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const targetCount = Math.min(
      body.maxHashtags || platformConfig.optimalHashtags,
      platformConfig.maxHashtags
    );

    const prompt = buildPrompt(body, platformConfig, targetCount);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const parsedResponse = parseGeminiResponse(text, body);
    
    // Track usage if user is authenticated
    if (userId) {
      await AuthService.trackHashtagGeneration(userId, parsedResponse.hashtags.length);
    }
    
    return NextResponse.json(parsedResponse);
    
  } catch (error) {
    console.error('Gemini API error:', error);
    
    // Return fallback response using the already parsed body
    const fallbackResponse = generateFallbackResponse(body!);
    
    return NextResponse.json(fallbackResponse);
  }
}

function buildPrompt(request: HashtagRequest, platformConfig: any, targetCount: number): string {
  const { platform, content, category } = request;

  return `
You are a social media expert specializing in ${platformConfig.name} hashtag strategy. 

PLATFORM: ${platformConfig.name}
CONTENT DESCRIPTION: ${content}
CATEGORY: ${category || 'general'}
TARGET HASHTAG COUNT: ${targetCount}
PLATFORM LIMITS: Max ${platformConfig.maxHashtags}, Optimal ${platformConfig.optimalHashtags}

PLATFORM-SPECIFIC RULES FOR ${platform.toUpperCase()}:
${getPlatformSpecificRules(platform)}

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

function getPlatformSpecificRules(platform: string): string {
  const rules: { [key: string]: string } = {
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

function parseGeminiResponse(text: string, request: HashtagRequest): HashtagResponse {
  try {
    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsedData = JSON.parse(jsonMatch[0]);
      
      return {
        hashtags: parsedData.hashtags || [],
        analytics: {
          estimatedReach: parsedData.analytics?.estimatedReach || Math.floor(Math.random() * 100000) + 10000,
          engagementPotential: parsedData.analytics?.engagementPotential || Math.floor(Math.random() * 80) + 20,
          competitionLevel: parsedData.analytics?.competitionLevel || 'Medium',
          bestPostingTime: parsedData.analytics?.bestPostingTime || getBestPostingTimes(request.platform),
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
  return generateFallbackResponse(request);
}

function generateFallbackResponse(request: HashtagRequest): HashtagResponse {
  const platformConfig = PLATFORM_CONFIGS[request.platform];
  const hashtagCount = Math.min(
    request.maxHashtags || platformConfig.optimalHashtags,
    platformConfig.maxHashtags
  );

  // Generate some basic hashtags based on content and platform
  const contentWords = request.content.toLowerCase().split(' ');
  const baseHashtags = generateBaseHashtagsForPlatform(request.platform);
  
  const selectedHashtags = baseHashtags.slice(0, hashtagCount).map((tag, index) => ({
    tag: `#${tag}`,
    difficulty: ['Easy', 'Medium', 'Hard'][Math.floor(Math.random() * 3)] as 'Easy' | 'Medium' | 'Hard',
    volume: Math.floor(Math.random() * 1000000) + 1000,
    engagement: Math.floor(Math.random() * 80) + 20,
    trending: Math.random() > 0.7,
    category: getCategoryForHashtag(tag),
    description: `Popular ${request.platform} hashtag for ${tag}-related content`
  }));

  return {
    hashtags: selectedHashtags,
    analytics: {
      estimatedReach: Math.floor(Math.random() * 100000) + 10000,
      engagementPotential: Math.floor(Math.random() * 80) + 20,
      competitionLevel: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
      bestPostingTime: getBestPostingTimes(request.platform),
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
      requestId: `fallback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      processingTime: 500,
      platform: request.platform,
      apiVersion: '1.0.0-fallback'
    }
  };
}

function generateBaseHashtagsForPlatform(platform: string): string[] {
  const baseHashtags: { [key: string]: string[] } = {
    instagram: [
      'instadaily', 'photooftheday', 'instagood', 'instalove', 'instamood',
      'photography', 'picoftheday', 'lifestyle', 'beautiful', 'love'
    ],
    tiktok: [
      'fyp', 'foryou', 'viral', 'trending', 'tiktokmade',
      'dance', 'comedy', 'funny', 'entertainment', 'music'
    ],
    twitter: [
      'breaking', 'news', 'trending', 'discussion', 'thoughts',
      'twitter', 'social', 'media', 'tech', 'business'
    ],
    youtube: [
      'youtube', 'youtuber', 'video', 'subscribe', 'content',
      'tutorial', 'review', 'vlog', 'gaming', 'entertainment'
    ],
    linkedin: [
      'linkedin', 'professional', 'business', 'career', 'networking',
      'leadership', 'industry', 'corporate', 'b2b', 'sales'
    ],
    pinterest: [
      'pinterest', 'inspiration', 'ideas', 'diy', 'home',
      'decor', 'fashion', 'beauty', 'food', 'recipes'
    ],
    facebook: [
      'facebook', 'community', 'family', 'friends', 'local',
      'business', 'group', 'discussion', 'social', 'network'
    ]
  };

  return baseHashtags[platform] || baseHashtags.instagram;
}

function getBestPostingTimes(platform: string): string[] {
  const times: { [key: string]: string[] } = {
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

function getCategoryForHashtag(tag: string): string {
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
