'use client';

import { useState, useEffect } from 'react';
import { 
  HashtagRequest, 
  HashtagResponse, 
  SocialMediaPlatform, 
  PLATFORM_CONFIGS,
  GeneratedHashtag 
} from '@/types/api';
import { hashtagAPI } from '@/lib/api/hashtag-api';

interface DynamicHashtagGeneratorProps {
  initialPlatform?: SocialMediaPlatform;
  showPlatformSelector?: boolean;
  className?: string;
}

export default function DynamicHashtagGenerator({ 
  initialPlatform = 'instagram', 
  showPlatformSelector = true,
  className = ''
}: DynamicHashtagGeneratorProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<SocialMediaPlatform>(initialPlatform);
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<HashtagResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const platformConfig = PLATFORM_CONFIGS[selectedPlatform];

  const handleGenerate = async () => {
    if (!content.trim()) {
      setError('Content description is required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const request: HashtagRequest = {
        content: content.trim(),
        platform: selectedPlatform,
        category: category || undefined,
        maxHashtags: platformConfig.optimalHashtags,
        includeEmojis: selectedPlatform === 'instagram' || selectedPlatform === 'tiktok'
      };

      // Use Gemini API for real hashtag generation
      const result = await hashtagAPI.generateHashtags(request);
      setResponse(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const copyHashtags = () => {
    if (response?.hashtags) {
      const hashtagText = response.hashtags.map(h => h.tag).join(' ');
      navigator.clipboard.writeText(hashtagText);
    }
  };

  const getPlatformIcon = (platform: SocialMediaPlatform) => {
    const icons = {
      instagram: '📸',
      tiktok: '🎵',
      twitter: '🐦',
      youtube: '📺',
      linkedin: '💼',
      pinterest: '📌',
      facebook: '👥'
    };
    return icons[platform] || '📱';
  };

  const getPlatformColor = (platform: SocialMediaPlatform) => {
    const colors = {
      instagram: 'from-pink-500 to-purple-600',
      tiktok: 'from-black to-red-600',
      twitter: 'from-blue-400 to-blue-600',
      youtube: 'from-red-500 to-red-700',
      linkedin: 'from-blue-600 to-blue-800',
      pinterest: 'from-red-600 to-pink-600',
      facebook: 'from-blue-600 to-indigo-600'
    };
    return colors[platform] || 'from-gray-500 to-gray-700';
  };

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* Platform Selector */}
      {showPlatformSelector && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Platform</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {Object.keys(PLATFORM_CONFIGS).map((platform) => {
              const p = platform as SocialMediaPlatform;
              const isSelected = selectedPlatform === p;
              return (
                <button
                  key={platform}
                  onClick={() => setSelectedPlatform(p)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="text-2xl mb-2">{getPlatformIcon(p)}</div>
                  <div className="text-sm font-medium text-gray-900">
                    {PLATFORM_CONFIGS[p].name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Platform Info */}
      <div className={`bg-gradient-to-r ${getPlatformColor(selectedPlatform)} rounded-xl p-6 text-white mb-8`}>
        <div className="flex items-center mb-4">
          <div className="text-3xl mr-4">{getPlatformIcon(selectedPlatform)}</div>
          <div>
            <h2 className="text-2xl font-bold">{platformConfig.name} Hashtag Generator</h2>
            <p className="opacity-90">
              Optimal: {platformConfig.optimalHashtags} hashtags • 
              Maximum: {platformConfig.maxHashtags} hashtags
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Features:</h4>
            <ul className="text-sm opacity-90 space-y-1">
              {platformConfig.features.map((feature, index) => (
                <li key={index}>• {feature}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Best Practices:</h4>
            <ul className="text-sm opacity-90 space-y-1">
              {platformConfig.bestPractices.slice(0, 3).map((practice, index) => (
                <li key={index}>• {practice}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content Description *
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`What type of content are you creating for ${platformConfig.name}? E.g: Coffee morning photo, fitness motivation, travel vlog...`}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500 bg-white shadow-inner"
              rows={4}
              style={{ color: '#1f2937', backgroundColor: '#ffffff' }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category (Optional)
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white shadow-inner"
              style={{ color: '#1f2937', backgroundColor: '#ffffff' }}
            >
              <option value="" className="text-gray-500" style={{ color: '#6b7280', backgroundColor: '#ffffff' }}>Select category...</option>
              <option value="lifestyle" className="text-gray-900" style={{ color: '#1f2937', backgroundColor: '#ffffff' }}>Lifestyle</option>
              <option value="business" className="text-gray-900" style={{ color: '#1f2937', backgroundColor: '#ffffff' }}>Business & Career</option>
              <option value="fashion" className="text-gray-900" style={{ color: '#1f2937', backgroundColor: '#ffffff' }}>Fashion & Style</option>
              <option value="food" className="text-gray-900" style={{ color: '#1f2937', backgroundColor: '#ffffff' }}>Food & Drink</option>
              <option value="travel" className="text-gray-900" style={{ color: '#1f2937', backgroundColor: '#ffffff' }}>Travel</option>
              <option value="fitness" className="text-gray-900" style={{ color: '#1f2937', backgroundColor: '#ffffff' }}>Fitness & Health</option>
              <option value="technology" className="text-gray-900" style={{ color: '#1f2937', backgroundColor: '#ffffff' }}>Technology</option>
              <option value="art" className="text-gray-900" style={{ color: '#1f2937', backgroundColor: '#ffffff' }}>Art & Design</option>
              <option value="entertainment" className="text-gray-900" style={{ color: '#1f2937', backgroundColor: '#ffffff' }}>Entertainment</option>
              <option value="education" className="text-gray-900" style={{ color: '#1f2937', backgroundColor: '#ffffff' }}>Education</option>
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading || !content.trim()}
            className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
              isLoading || !content.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : `bg-gradient-to-r ${getPlatformColor(selectedPlatform)} hover:shadow-lg transform hover:scale-105`
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                Generating Hashtags...
              </div>
            ) : (
              `Generate ${platformConfig.name} Hashtags`
            )}
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <div className="flex">
            <div className="text-red-600 text-xl mr-3">⚠️</div>
            <div>
              <h4 className="text-red-800 font-semibold">Error</h4>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {response && (
        <div className="space-y-8">
          {/* Generated Hashtags */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                Generated Hashtags ({response.hashtags.length})
              </h3>
              <button
                onClick={copyHashtags}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                📋 Copy
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {response.hashtags.map((hashtag, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-blue-600 font-semibold">
                      {hashtag.tag}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      hashtag.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      hashtag.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {hashtag.difficulty}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div>Volume: {hashtag.volume.toLocaleString()}</div>
                    <div>Engagement: {hashtag.engagement}%</div>
                    {hashtag.trending && (
                      <div className="text-green-600 font-semibold">🔥 Trending</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="font-mono text-sm text-gray-700 break-all">
                {response.hashtags.map(h => h.tag).join(' ')}
              </div>
            </div>
          </div>

          {/* Analytics */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Analytics & Recommendations</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {response.analytics.estimatedReach.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Estimated Reach</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {response.analytics.engagementPotential}%
                </div>
                <div className="text-sm text-gray-600">Engagement Potential</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {response.analytics.competitionLevel}
                </div>
                <div className="text-sm text-gray-600">Competition Level</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {response.analytics.bestPostingTime[0]}
                </div>
                <div className="text-sm text-gray-600">Best Posting Time</div>
              </div>
            </div>

            {/* Platform Tips */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                {platformConfig.name} Tips:
              </h4>
              <ul className="space-y-2">
                {response.analytics.platformSpecificTips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Suggestions */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Recommendations:</h4>
              <div className="space-y-3">
                {response.suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-l-4 ${
                      suggestion.impact === 'High' ? 'bg-red-50 border-red-400' :
                      suggestion.impact === 'Medium' ? 'bg-yellow-50 border-yellow-400' :
                      'bg-blue-50 border-blue-400'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-gray-700">{suggestion.suggestion}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        suggestion.impact === 'High' ? 'bg-red-100 text-red-800' :
                        suggestion.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {suggestion.impact}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
