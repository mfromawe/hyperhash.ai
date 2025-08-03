'use client';

import { useState, useEffect, useCallback } from 'react';
import { trackHashtagGeneration, trackCopyAction } from '@/components/Analytics';
import { useUserStore } from '@/store/userStore';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copyFeedback, setCopyFeedback] = useState('');
  
  // Use Zustand store for user preferences
  const {
    platform,
    style,
    language,
    location,
    setPlatform,
    setStyle,
    setLanguage,
    setLocation,
    addGeneration,
  } = useUserStore();

  // FAQ data for SEO
  const faqData = [
    {
      question: "How does the AI hashtag generator work?",
      answer: "HyperHash uses advanced AI (Google Gemini) to analyze your content and generate relevant, trending hashtags based on your platform, style preferences, language, and location. The AI considers current trends, engagement patterns, and platform-specific algorithms."
    },
    {
      question: "Which social media platforms are supported?",
      answer: "HyperHash supports Instagram, Twitter (X), YouTube, and TikTok. Each platform has unique hashtag strategies and character limits that our AI considers when generating recommendations."
    },
    {
      question: "Can I generate hashtags in different languages?",
      answer: "Yes! HyperHash supports 12+ languages including English, Spanish, French, German, Italian, Portuguese, Turkish, Arabic, Japanese, Korean, and Chinese. The AI can auto-detect your content language or you can specify it manually."
    },
    {
      question: "How many hashtags should I use per post?",
      answer: "The optimal number varies by platform: Instagram allows up to 30 (recommend 5-15), Twitter/X allows fewer due to character limits (3-5), YouTube description can handle more (10-15), and TikTok works well with 3-8 hashtags."
    },
    {
      question: "Are the generated hashtags trending and viral?",
      answer: "Our AI analyzes current trends, viral patterns, and engagement data to suggest hashtags with high viral potential. The 'Trending' style specifically focuses on currently popular hashtags in your niche and location."
    }
  ];

  const generateHashtags = useCallback(async () => {
    if (!inputText.trim()) {
      setError('Please enter some text');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://hyperhash-production-2512.up.railway.app/api/generate-hashtags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          title: inputText.split(' ').slice(0, 5).join(' '),
          description: inputText,
          keywords: inputText.split(' ').filter(word => word.length > 3).slice(0, 10),
          style: style,
          platform: platform,
          language: language,
          location: location,
          limit: 20
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const generatedHashtags = data.hashtags || [];
      setHashtags(generatedHashtags);
      
      // Track analytics
      trackHashtagGeneration(platform, language, style);
      
      // Save to user history
      addGeneration({
        content: inputText,
        hashtags: generatedHashtags,
        platform,
        style,
      });
      
    } catch (err) {
      setError('Error generating hashtags. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [inputText, style, platform, language, location, addGeneration]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback('Copied!');
    trackCopyAction('single', text);
    setTimeout(() => setCopyFeedback(''), 2000);
  };

  const copyAllHashtags = () => {
    const allHashtags = hashtags.join(' ');
    navigator.clipboard.writeText(allHashtags);
    setCopyFeedback('All hashtags copied!');
    trackCopyAction('all');
    setTimeout(() => setCopyFeedback(''), 2000);
  };

  // Handle Enter key press
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && e.ctrlKey) {
        generateHashtags();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [generateHashtags]);

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "HyperHash - AI Hashtag Generator",
            "description": "AI-powered hashtag generator for Instagram, TikTok, Twitter, and YouTube. Generate viral hashtags with multi-language support and location targeting.",
            "url": "https://hyperhash.ai",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "AI-powered hashtag generation",
              "Multi-platform support (Instagram, TikTok, Twitter, YouTube)",
              "12+ language support",
              "Location-based hashtags",
              "Real-time trending analysis",
              "Copy-to-clipboard functionality"
            ]
          })
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        {/* Copy Feedback Toast */}
        {copyFeedback && (
          <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 animate-pulse">
            ✅ {copyFeedback}
          </div>
        )}
        
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Hyper<span className="text-blue-600">Hash</span>
              <span className="text-2xl font-normal ml-2 text-gray-600 dark:text-gray-400">AI</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
              🚀 #1 AI-powered hashtag generator for Instagram, TikTok, Twitter & YouTube. 
              Generate viral hashtags in 12+ languages with location targeting.
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full">✨ AI-Powered</span>
              <span className="bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full">🌍 Multi-Language</span>
              <span className="bg-purple-100 dark:bg-purple-900 px-3 py-1 rounded-full">📱 All Platforms</span>
              <span className="bg-orange-100 dark:bg-orange-900 px-3 py-1 rounded-full">🔥 Trending</span>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 border border-gray-200 dark:border-gray-700">
              {/* Input Section */}
              <section className="mb-8">
                <label htmlFor="text-input" className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  Enter your content to generate viral hashtags:
                </label>
                <textarea
                  id="text-input"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Example: Just opened our new coffee shop! Come try our special blend coffees and artisanal pastries in downtown..."
                  className="w-full h-32 p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none resize-none text-gray-900 dark:text-white dark:bg-gray-700 transition-all duration-200"
                  maxLength={1000}
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    💡 Tip: Be specific and descriptive for better hashtag suggestions
                  </p>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {inputText.length}/1000
                  </span>
                </div>
              </section>

              {/* Options Section */}
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Platform Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    📱 Platform:
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none text-gray-900 dark:text-white dark:bg-gray-700 transition-all duration-200"
                  >
                    <option value="instagram">📸 Instagram</option>
                    <option value="twitter">🐦 Twitter/X</option>
                    <option value="youtube">📺 YouTube</option>
                    <option value="general">🌐 General</option>
                  </select>
                </div>

                {/* Style Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    🎨 Style:
                  </label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none text-gray-900 dark:text-white dark:bg-gray-700 transition-all duration-200"
                  >
                    <option value="organic">🌱 Organic</option>
                    <option value="trending">🔥 Trending</option>
                    <option value="branded">🏷️ Branded</option>
                  </select>
                </div>

                {/* Language Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    🌍 Language:
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none text-gray-900 dark:text-white dark:bg-gray-700 transition-all duration-200"
                  >
                    <option value="auto">🤖 Auto-detect</option>
                    <option value="en">🇺🇸 English</option>
                    <option value="tr">🇹🇷 Turkish</option>
                    <option value="es">🇪🇸 Spanish</option>
                    <option value="fr">🇫🇷 French</option>
                    <option value="de">🇩🇪 German</option>
                    <option value="it">🇮🇹 Italian</option>
                    <option value="pt">🇧🇷 Portuguese</option>
                    <option value="ar">🇸🇦 Arabic</option>
                    <option value="ja">🇯🇵 Japanese</option>
                    <option value="ko">🇰🇷 Korean</option>
                    <option value="zh">🇨🇳 Chinese</option>
                  </select>
                </div>

                {/* Location Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    📍 Location:
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none text-gray-900 dark:text-white dark:bg-gray-700 transition-all duration-200"
                  >
                    <option value="global">🌍 Global</option>
                    <option value="us">🇺🇸 United States</option>
                    <option value="uk">🇬🇧 United Kingdom</option>
                    <option value="tr">🇹🇷 Turkey</option>
                    <option value="de">🇩🇪 Germany</option>
                    <option value="fr">🇫🇷 France</option>
                    <option value="es">🇪🇸 Spain</option>
                    <option value="it">🇮🇹 Italy</option>
                    <option value="br">🇧🇷 Brazil</option>
                    <option value="mx">🇲🇽 Mexico</option>
                    <option value="ca">🇨🇦 Canada</option>
                    <option value="au">🇦🇺 Australia</option>
                    <option value="jp">🇯🇵 Japan</option>
                    <option value="kr">🇰🇷 South Korea</option>
                    <option value="in">🇮🇳 India</option>
                    <option value="sa">🇸🇦 Saudi Arabia</option>
                    <option value="ae">🇦🇪 UAE</option>
                  </select>
                </div>
              </section>

              {/* Generate Button */}
              <div className="text-center mb-8">
                <button
                  onClick={generateHashtags}
                  disabled={isLoading || !inputText.trim()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      🚀 Generating Viral Hashtags...
                    </span>
                  ) : (
                    '✨ Generate Viral Hashtags'
                  )}
                </button>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  💡 Pro tip: Press Ctrl+Enter to generate quickly
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-6 py-4 rounded-xl mb-6 flex items-center">
                  <span className="text-xl mr-2">⚠️</span>
                  {error}
                </div>
              )}

              {/* Results Section */}
              {hashtags.length > 0 && (
                <section className="border-t-2 border-gray-100 dark:border-gray-700 pt-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                      <span className="text-3xl mr-2">🎯</span>
                      Generated Hashtags ({hashtags.length})
                    </h2>
                    <button
                      onClick={copyAllHashtags}
                      className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                    >
                      📋 Copy All
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {hashtags.map((hashtag, index) => (
                      <div
                        key={index}
                        onClick={() => copyToClipboard(hashtag)}
                        className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/30 dark:hover:to-blue-800/30 p-4 rounded-lg cursor-pointer transition-all duration-200 transform hover:scale-105 group shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-600"
                        style={{ 
                          animationDelay: `${index * 0.05}s`,
                          animation: `fadeInUp 0.3s ease-out forwards`,
                        }}
                      >
                        <span className="text-blue-600 dark:text-blue-400 font-medium text-lg">
                          {hashtag}
                        </span>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span className="ml-1 text-gray-400 text-sm">Copy</span>
                          </div>
                          <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            #{index + 1}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">📊 Pro Tips for Maximum Engagement:</h3>
                    <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                      <li>• Mix popular and niche hashtags for better reach</li>
                      <li>• Post when your audience is most active</li>
                      <li>• Use 5-15 hashtags for Instagram, 3-5 for Twitter</li>
                      <li>• Monitor performance and adjust strategy</li>
                    </ul>
                  </div>
                </section>
              )}
            </div>

            {/* FAQ Section for SEO */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                🤔 Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {faqData.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Features Section */}
            <section className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8 mb-8 border border-purple-200 dark:border-purple-800">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                🚀 Why Choose HyperHash AI?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">🤖</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">AI-Powered Engine</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Advanced Google Gemini AI analyzes trends and generates optimal hashtags for maximum engagement.</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">🌍</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Global Reach</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Support for 12+ languages and 17+ regions to target your specific audience worldwide.</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">📱</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Multi-Platform</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Optimized for Instagram, TikTok, Twitter, YouTube with platform-specific strategies.</p>
                </div>
              </div>
            </section>
          </main>

          {/* Footer */}
          <footer className="text-center text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-8">
            <p className="mb-2">© 2025 HyperHash - #1 AI Hashtag Generator Tool</p>
            <p className="text-sm">🚀 Generate viral hashtags • 🌍 Global reach • 📈 Boost engagement</p>
          </footer>
        </div>
      </div>

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
