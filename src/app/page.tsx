'use client';

import { useState, useEffect, useCallback } from 'react';
// import Link from 'next/link';
import { geminiAPI } from '@/lib/api/hashtag-api';
import { trackHashtagGeneration, trackCopyAction } from '@/components/Analytics';
import { useUserStore } from '@/store/userStore';
// import AuthButtons from '@/components/auth/AuthButtons';
import { useToast } from '@/components/ui/Toast';
import { Textarea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { add } = useToast();
  
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
      const data = await geminiAPI.generateHashtags(requestData);
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
    add({ title: 'Kopyalandı ✅', description: text, variant: 'success' });
    trackCopyAction('single', text);
  };

  const copyAllHashtags = () => {
    const allHashtags = hashtags.join(' ');
    navigator.clipboard.writeText(allHashtags);
    add({ title: 'Tümü kopyalandı ✅', variant: 'success' });
    trackCopyAction('all');
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

      <div className="min-h-screen">
        <div className="container-app py-10">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-5xl font-bold text-app mb-4">
              Hyper<span className="text-gradient">Hash</span>
              <span className="text-2xl font-normal ml-2 text-muted">AI</span>
            </h1>
            <p className="text-lg text-muted max-w-3xl mx-auto mb-6">
              🚀 #1 AI-powered hashtag generator for Instagram, TikTok, Twitter & YouTube. 
              Generate viral hashtags in 12+ languages with location targeting.
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-sm text-muted">
              <span className="surface-2 px-3 py-1 rounded-full">✨ AI-Powered</span>
              <span className="surface-2 px-3 py-1 rounded-full">🌍 Multi-Language</span>
              <span className="surface-2 px-3 py-1 rounded-full">📱 All Platforms</span>
              <span className="surface-2 px-3 py-1 rounded-full">🔥 Trending</span>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-4xl mx-auto">
            <div className="card card-hover p-8 mb-8">
              {/* Input Section */}
              <section className="mb-8">
                <Textarea
                  label="Enter your content to generate viral hashtags:"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Example: Just opened our new coffee shop! Come try our special blend coffees and artisanal pastries in downtown..."
                  maxLength={1000}
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-muted">
                    💡 Tip: Be specific and descriptive for better hashtag suggestions
                  </p>
                  <span className="text-sm text-muted">
                    {inputText.length}/1000
                  </span>
                </div>
              </section>

              {/* Options Section */}
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Platform Selection */}
                <Select label="📱 Platform:" value={platform} onChange={(e) => setPlatform(e.target.value)}>
                  <option value="instagram">📸 Instagram</option>
                  <option value="twitter">🐦 Twitter/X</option>
                  <option value="youtube">📺 YouTube</option>
                  <option value="general">🌐 General</option>
                </Select>

                {/* Style Selection */}
                <Select label="🎨 Style:" value={style} onChange={(e) => setStyle(e.target.value)}>
                  <option value="organic">🌱 Organic</option>
                  <option value="trending">🔥 Trending</option>
                  <option value="branded">🏷️ Branded</option>
                </Select>

                {/* Language Selection */}
                <Select label="🌍 Language:" value={language} onChange={(e) => setLanguage(e.target.value)}>
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
                </Select>

                {/* Location Selection */}
                <Select label="📍 Location:" value={location} onChange={(e) => setLocation(e.target.value)}>
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
                </Select>
              </section>

              {/* Generate Button */}
              <div className="text-center mb-8">
                <Button onClick={generateHashtags} disabled={isLoading || !inputText.trim()} loading={isLoading}>
                  ✨ Generate Viral Hashtags
                </Button>
                <p className="text-sm text-muted mt-2">
                  💡 Pro tip: Press Ctrl+Enter to generate quickly
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="surface-2 border border-[color:var(--color-danger)]/40 text-[color:var(--color-danger)] px-6 py-4 rounded-xl mb-6 flex items-center">
                  <span className="text-xl mr-2">⚠️</span>
                  {error}
                </div>
              )}

              {/* Results Section */}
              {hashtags.length > 0 && (
                <section className="border-t border-token pt-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-app flex items-center">
                      <span className="text-3xl mr-2">🎯</span>
                      Generated Hashtags ({hashtags.length})
                    </h2>
                    <Button variant="outline" onClick={copyAllHashtags}>📋 Copy All</Button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 hashtag-grid">
                    {hashtags.map((hashtag, index) => (
                      <div
                        key={index}
                        onClick={() => copyToClipboard(hashtag)}
                        className="surface-2 hover:bg-[color:var(--color-surface-3)] p-4 rounded-lg cursor-pointer transition-all duration-200 transform hover:scale-105 group shadow-sm border border-token hashtag-item"
                        style={{ 
                          animationDelay: `${index * 0.05}s`,
                          animation: `fadeInUp 0.3s ease-out forwards`,
                        }}
                      >
                        <span className="text-gradient font-medium text-lg">
                          {hashtag}
                        </span>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity text-muted">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span className="ml-1 text-sm">Copy</span>
                          </div>
                          <span className="text-xs text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                            #{index + 1}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 p-6 surface-2 rounded-xl border border-token">
                    <h3 className="text-lg font-semibold text-app mb-2">📊 Pro Tips for Maximum Engagement:</h3>
                    <ul className="text-sm text-muted space-y-1">
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
            <section className="card card-hover p-8 mb-8">
              <h2 className="text-3xl font-bold text-app mb-8 text-center">
                🤔 Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {faqData.map((faq, index) => (
                  <div key={index} className="border-b border-token pb-6 last:border-b-0">
                    <h3 className="text-lg font-semibold text-app mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-muted leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Features Section */}
            <section className="p-8 mb-8 rounded-2xl border border-token gradient-accent">
              <div className="bg-app-translucent rounded-xl p-6">
                <h2 className="text-3xl font-bold text-app mb-8 text-center">
                  🚀 Why Choose HyperHash AI?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🤖</div>
                    <h3 className="font-semibold text-app mb-2">AI-Powered Engine</h3>
                    <p className="text-muted text-sm">Advanced Google Gemini AI analyzes trends and generates optimal hashtags for maximum engagement.</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-4">🌍</div>
                    <h3 className="font-semibold text-app mb-2">Global Reach</h3>
                    <p className="text-muted text-sm">Support for 12+ languages and 17+ regions to target your specific audience worldwide.</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-4">📱</div>
                    <h3 className="font-semibold text-app mb-2">Multi-Platform</h3>
                    <p className="text-muted text-sm">Optimized for Instagram, TikTok, Twitter, YouTube with platform-specific strategies.</p>
                  </div>
                </div>
              </div>
            </section>
          </main>
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
