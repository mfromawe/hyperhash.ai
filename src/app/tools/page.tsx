import type { Metadata } from 'next';
import Link from 'next/link';
import DynamicHashtagGenerator from '@/components/DynamicHashtagGenerator';
import { PLATFORM_CONFIGS } from '@/types/api';

export const metadata: Metadata = {
  title: 'AI Social Media Tools - Instagram, TikTok, Twitter & YouTube Hashtag Generators',
  description: 'Complete suite of AI-powered social media tools. Generate viral hashtags for Instagram, TikTok, Twitter, and YouTube. Free hashtag generators with trending analysis.',
  keywords: [
    'social media tools',
    'hashtag generator tools',
    'Instagram hashtag generator',
    'TikTok hashtag finder',
    'Twitter hashtag tool',
    'YouTube hashtag generator',
    'AI social media tools',
    'viral hashtag tools',
    'social media marketing tools'
  ],
  openGraph: {
    title: 'AI Social Media Tools Suite - HyperHash',
    description: 'Professional AI-powered tools for social media growth. Generate hashtags, analyze trends, and boost engagement across all platforms.',
    images: [
      {
        url: '/images/tools-og.jpg',
        width: 1200,
        height: 630,
        alt: 'HyperHash Social Media Tools',
      },
    ],
  },
};

export default function ToolsPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'HyperHash.ai Social Media Tools',
    description: 'AI-powered hashtag generation tools for all social media platforms',
    url: 'https://hyperhash.ai/tools',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  const platformStats = Object.entries(PLATFORM_CONFIGS).map(([key, config]) => ({
    platform: key,
    name: config.name,
    maxHashtags: config.maxHashtags,
    optimal: config.optimalHashtags,
    features: config.features.length
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 py-16">
          {/* Navigation */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors">
              ← Back to Home
            </Link>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              AI-Powered Social Media Tools
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Platform-specific hashtag generators that adapt to each social media algorithm. 
              Generate viral hashtags with AI for Instagram, TikTok, Twitter, YouTube and more.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                7 Platform Generators
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                AI-Powered Analysis
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Real-time Trends
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                Free to Use
              </div>
            </div>
          </div>

          {/* Platform Statistics */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Platform Coverage
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {platformStats.map((stat) => (
                <div
                  key={stat.platform}
                  className="bg-white rounded-xl p-4 shadow-lg text-center hover:shadow-xl transition-shadow"
                >
                  <div className="text-2xl mb-2">
                    {stat.platform === 'instagram' && '📸'}
                    {stat.platform === 'tiktok' && '🎵'}
                    {stat.platform === 'twitter' && '🐦'}
                    {stat.platform === 'youtube' && '📺'}
                    {stat.platform === 'linkedin' && '💼'}
                    {stat.platform === 'pinterest' && '📌'}
                    {stat.platform === 'facebook' && '👥'}
                  </div>
                  <div className="text-sm font-semibold text-gray-900 mb-1">
                    {stat.name}
                  </div>
                  <div className="text-xs text-gray-600">
                    Max: {stat.maxHashtags} • Optimal: {stat.optimal}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Hashtag Generator */}
          <div id="generator" className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Universal Hashtag Generator
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Select your platform and get optimized hashtags tailored to each social media algorithm. 
                Our AI analyzes millions of posts to recommend the best hashtags for your content.
              </p>
            </div>
            
            <DynamicHashtagGenerator showPlatformSelector={true} />
          </div>

          {/* Platform-Specific Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Platform-Specific Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(PLATFORM_CONFIGS).map(([key, config]) => (
                <div
                  key={key}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-4">
                      {key === 'instagram' && '📸'}
                      {key === 'tiktok' && '🎵'}
                      {key === 'twitter' && '🐦'}
                      {key === 'youtube' && '📺'}
                      {key === 'linkedin' && '💼'}
                      {key === 'pinterest' && '📌'}
                      {key === 'facebook' && '👥'}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {config.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {config.optimalHashtags} optimal hashtags
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Features:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {config.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Best Practices:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {config.bestPractices.slice(0, 2).map((practice, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-500 mr-2">✓</span>
                          {practice}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Max Hashtags</span>
                      <span className="font-semibold">{config.maxHashtags}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>Optimal Count</span>
                      <span className="font-semibold text-green-600">{config.optimalHashtags}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* API Integration Info */}
          <div className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                🚀 API Integration Ready
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our hashtag generation system is designed to integrate with real APIs. 
                Each platform has specialized endpoints and response formats.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-2xl mb-3">🔗</div>
                <h3 className="font-semibold text-gray-900 mb-2">RESTful APIs</h3>
                <p className="text-sm text-gray-600">
                  Platform-specific endpoints for optimized hashtag generation
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-2xl mb-3">⚡</div>
                <h3 className="font-semibold text-gray-900 mb-2">Real-time Data</h3>
                <p className="text-sm text-gray-600">
                  Live trending analysis and hashtag performance metrics
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-2xl mb-3">🎯</div>
                <h3 className="font-semibold text-gray-900 mb-2">Smart Targeting</h3>
                <p className="text-sm text-gray-600">
                  AI-powered audience and content matching algorithms
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-2xl mb-3">📊</div>
                <h3 className="font-semibold text-gray-900 mb-2">Analytics</h3>
                <p className="text-sm text-gray-600">
                  Detailed performance insights and optimization suggestions
                </p>
              </div>
            </div>
          </div>

          {/* Technical Implementation */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Technical Implementation
            </h2>
            <div className="bg-gray-900 rounded-xl p-8 text-white">
              <h3 className="text-xl font-semibold mb-4">🔧 API Endpoints</h3>
              <div className="space-y-4 font-mono text-sm">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="text-green-400 mb-2">POST /api/hashtags/instagram</div>
                  <div className="text-gray-300">Instagram-specific hashtag generation with Reels optimization</div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="text-green-400 mb-2">POST /api/hashtags/tiktok</div>
                  <div className="text-gray-300">TikTok trending hashtags with FYP algorithm targeting</div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="text-green-400 mb-2">POST /api/hashtags/twitter</div>
                  <div className="text-gray-300">Twitter hashtag optimization with trending topics integration</div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="text-green-400 mb-2">GET /api/hashtags/{`{platform}`}/trending</div>
                  <div className="text-gray-300">Real-time trending hashtags for any platform</div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-gray-400 mb-4">
                  Each endpoint returns platform-optimized results with analytics and suggestions
                </p>
                <div className="inline-flex items-center bg-blue-600 px-6 py-3 rounded-lg">
                  <span className="mr-2">💡</span>
                  Ready for production API integration
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              🚀 Ready to Boost Your Social Media Presence?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Try our AI-powered hashtag generator and see the difference platform-specific optimization makes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#generator"
                className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-100 transition-colors"
              >
                🎯 Try Generator Above
              </Link>
              <Link 
                href="/guides"
                className="border-2 border-white text-white font-semibold py-4 px-8 rounded-xl hover:bg-white hover:text-blue-600 transition-colors inline-block"
              >
                📚 Learn Best Practices
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
