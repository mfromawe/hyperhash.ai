'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { productionAPI } from '@/lib/api/hashtag-api';
import { trackHashtagGeneration, trackCopyAction } from '@/components/Analytics';
import { useUserStore } from '@/store/userStore';
import AuthButtons from '@/components/auth/AuthButtons';

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
      const requestData = { 
        content: inputText,
        platform: platform as any,
        category: style,
        language: language,
        maxHashtags: 20
      };
      const data = await productionAPI.generateHashtags(requestData);
      const generatedHashtags = data.hashtags.map(h => h.tag) || [];
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
        {/* Navigation Header */}
        <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              {/* Logo */}
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
                  Hyper<span className="text-blue-600">Hash</span>
                  <span className="text-sm font-normal ml-1 text-gray-600 dark:text-gray-400">AI</span>
                </Link>
              </div>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/tools" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                  🛠️ Tools
                </Link>
                <Link href="/trends" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                  � Trends
                </Link>
                <Link href="/guides" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                  � Guides
                </Link>
                <Link href="/blog" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                  ✍️ Blog
                </Link>
                <Link href="/pricing" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                  💎 Pricing
                </Link>
              </div>

              {/* Auth Buttons */}
              <div className="flex items-center space-x-4">
                <AuthButtons />
                
                {/* Mobile Menu Button */}
                <button className="md:hidden text-gray-600 dark:text-gray-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>

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
          <footer className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mt-16 border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {/* Brand */}
              <div className="md:col-span-1">
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Hyper<span className="text-blue-600">Hash</span>
                  <span className="text-sm font-normal ml-1 text-gray-600 dark:text-gray-400">AI</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  #1 AI-powered hashtag generator for all social media platforms. 
                  Boost your reach and engagement with viral hashtags.
                </p>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.887 2.749.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Tools */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">🛠️ Tools</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/tools" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">AI Hashtag Generator</Link></li>
                  <li><Link href="/tools" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">Multi-Platform Generator</Link></li>
                  <li><Link href="/tools" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">Hashtag Analytics</Link></li>
                  <li><Link href="/guides" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">Strategy Guides</Link></li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">📚 Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/blog" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">Blog</Link></li>
                  <li><Link href="/guides" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">Guides</Link></li>
                  <li><Link href="/guides/dos-donts" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">Best Practices</Link></li>
                  <li><Link href="/guides/automation" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">Automation Tips</Link></li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">🏢 Company</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">About Us</Link></li>
                  <li><Link href="/pricing" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">Pricing</Link></li>
                  <li><Link href="/tools" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">Contact</Link></li>
                  <li><Link href="/tools" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0">
                © 2025 HyperHash - #1 AI Hashtag Generator Tool. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <span>🚀 Generate viral hashtags</span>
                <span>•</span>
                <span>🌍 Global reach</span>
                <span>•</span>
                <span>📈 Boost engagement</span>
              </div>
            </div>
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
