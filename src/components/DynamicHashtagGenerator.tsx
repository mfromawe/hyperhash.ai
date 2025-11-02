'use client';

import { useState, useEffect } from 'react';
import { 
  HashtagRequest, 
  HashtagResponse, 
  SocialMediaPlatform, 
  PLATFORM_CONFIGS,
  GeneratedHashtag 
} from '@/types/api';
import { geminiAPI } from '@/lib/api/hashtag-api';

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
      const result = await geminiAPI.generateHashtags(request);
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
    <div className={`max-w-5xl mx-auto ${className}`}>
      {/* Platform Selector */}
      {showPlatformSelector && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-4">Select Platform</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {Object.keys(PLATFORM_CONFIGS).map((platform) => {
              const p = platform as SocialMediaPlatform;
              const isSelected = selectedPlatform === p;
              return (
                <button
                  key={platform}
                  onClick={() => setSelectedPlatform(p)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 active:scale-95 ${
                    isSelected
                      ? 'border-purple-500 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur shadow-lg shadow-purple-500/50 scale-105'
                      : 'border-gray-700/50 bg-slate-800/30 backdrop-blur hover:border-gray-600 hover:shadow-md'
                  }`}
                >
                  <div className="text-2xl mb-2">{getPlatformIcon(p)}</div>
                  <div className={`text-sm font-medium ${isSelected ? 'text-purple-300' : 'text-gray-300'}`}>
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
      <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-2xl shadow-purple-900/30 p-8 mb-8 border-2 border-slate-700/50">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Content Description *
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`What type of content are you creating for ${platformConfig.name}? E.g: Coffee morning photo, fitness motivation, travel vlog...`}
              className="w-full px-4 py-3 bg-slate-900/50 backdrop-blur border-2 border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 resize-none text-slate-200 placeholder-slate-500 hover:border-slate-600"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Category (Optional)
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/50 backdrop-blur border-2 border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-slate-200 hover:border-slate-600 cursor-pointer"
            >
              <option value="" className="text-slate-400">Select category...</option>
              <option value="lifestyle" className="text-slate-200">Lifestyle</option>
              <option value="business" className="text-slate-200">Business & Career</option>
              <option value="fashion" className="text-slate-200">Fashion & Style</option>
              <option value="food" className="text-slate-200">Food & Drink</option>
              <option value="travel" className="text-slate-200">Travel</option>
              <option value="fitness" className="text-slate-200">Fitness & Health</option>
              <option value="technology" className="text-slate-200">Technology</option>
              <option value="art" className="text-slate-200">Art & Design</option>
              <option value="entertainment" className="text-slate-200">Entertainment</option>
              <option value="education" className="text-slate-200">Education</option>
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading || !content.trim()}
            className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 relative overflow-hidden group ${
              isLoading || !content.trim()
                ? 'bg-gray-600 cursor-not-allowed opacity-50'
                : `bg-gradient-to-r ${getPlatformColor(selectedPlatform)} hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-[1.02] active:scale-[0.98]`
            }`}
          >
            <span className="relative z-10 flex items-center justify-center">
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Generating Magic...
                </>
              ) : (
                <>
                  ✨ Generate {platformConfig.name} Hashtags
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"/>
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-rose-900/60 backdrop-blur border-2 border-rose-700/50 rounded-xl p-5 mb-8 shadow-lg animate-fade-in">
          <div className="flex">
            <div className="text-rose-400 text-xl mr-3">⚠️</div>
            <div>
              <h4 className="text-rose-200 font-semibold">Error</h4>
              <p className="text-rose-300">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {response && (
        <div className="space-y-8">
          {/* Generated Hashtags */}
          <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-2xl shadow-purple-900/30 p-8 border-2 border-slate-700/50">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                ✨ Generated Hashtags ({response.hashtags.length})
              </h3>
              <button
                onClick={copyHashtags}
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 font-semibold"
              >
                📋 Copy All
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {response.hashtags.map((hashtag, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 backdrop-blur border-2 border-slate-700/50 rounded-xl p-4 hover:shadow-xl hover:shadow-purple-900/30 hover:-translate-y-1 transition-all duration-300 hover:border-purple-500/50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-bold text-lg">
                      {hashtag.tag}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-lg font-semibold ${
                      hashtag.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' :
                      hashtag.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' :
                      'bg-rose-500/20 text-rose-400 border border-rose-500/50'
                    }`}>
                      {hashtag.difficulty}
                    </span>
                  </div>
                  <div className="text-sm text-slate-400 space-y-1">
                    <div>Volume: <span className="text-slate-300 font-semibold">{hashtag.volume.toLocaleString()}</span></div>
                    <div>Engagement: <span className="text-slate-300 font-semibold">{hashtag.engagement}%</span></div>
                    {hashtag.trending && (
                      <div className="text-emerald-400 font-semibold mt-2 flex items-center">
                        <span className="animate-pulse mr-1">🔥</span> Trending
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-900/50 backdrop-blur rounded-xl p-4 border border-slate-700/50">
              <div className="font-mono text-sm text-slate-300 break-all">
                {response.hashtags.map(h => h.tag).join(' ')}
              </div>
            </div>
          </div>

          {/* Analytics */}
          <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-2xl shadow-purple-900/30 p-8 border-2 border-slate-700/50">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-6">
              📊 Analytics & Recommendations
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-4 bg-slate-900/50 backdrop-blur rounded-xl border border-slate-700/50">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  {response.analytics.estimatedReach.toLocaleString()}
                </div>
                <div className="text-sm text-slate-400 mt-2">Estimated Reach</div>
              </div>
              <div className="text-center p-4 bg-slate-900/50 backdrop-blur rounded-xl border border-slate-700/50">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">
                  {response.analytics.engagementPotential}%
                </div>
                <div className="text-sm text-slate-400 mt-2">Engagement Potential</div>
              </div>
              <div className="text-center p-4 bg-slate-900/50 backdrop-blur rounded-xl border border-slate-700/50">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                  {response.analytics.competitionLevel}
                </div>
                <div className="text-sm text-slate-400 mt-2">Competition Level</div>
              </div>
              <div className="text-center p-4 bg-slate-900/50 backdrop-blur rounded-xl border border-slate-700/50">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  {response.analytics.bestPostingTime[0]}
                </div>
                <div className="text-sm text-slate-400 mt-2">Best Posting Time</div>
              </div>
            </div>

            {/* Platform Tips */}
            <div className="mb-6 bg-slate-900/30 backdrop-blur rounded-xl p-5 border border-slate-700/50">
              <h4 className="font-semibold text-slate-200 mb-3 flex items-center">
                <span className="text-xl mr-2">💡</span>
                {platformConfig.name} Tips:
              </h4>
              <ul className="space-y-2">
                {response.analytics.platformSpecificTips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-emerald-400 mr-2">✓</span>
                    <span className="text-slate-300">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Suggestions */}
            <div>
              <h4 className="font-semibold text-slate-200 mb-3 flex items-center">
                <span className="text-xl mr-2">🎯</span>
                Recommendations:
              </h4>
              <div className="space-y-3">
                {response.suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border-l-4 backdrop-blur ${
                      suggestion.impact === 'High' ? 'bg-rose-900/30 border-rose-400' :
                      suggestion.impact === 'Medium' ? 'bg-yellow-900/30 border-yellow-400' :
                      'bg-blue-900/30 border-blue-400'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-slate-200">{suggestion.suggestion}</span>
                      <span className={`text-xs px-2 py-1 rounded-lg font-semibold ml-3 whitespace-nowrap ${
                        suggestion.impact === 'High' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50' :
                        suggestion.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/50' :
                        'bg-blue-500/20 text-blue-300 border border-blue-500/50'
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
