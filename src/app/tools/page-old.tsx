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

const tools = [
  {
    name: 'Instagram Hashtag Generator',
    description: 'Generate viral Instagram hashtags with AI. Optimize for Reels, Stories, and feed posts.',
    icon: '📸',
    href: '/tools/instagram',
    features: [
      'Instagram-specific hashtag optimization',
      'Reels and Stories hashtag suggestions',
      'Engagement prediction',
      'Niche hashtag discovery',
      'Trending Instagram hashtags'
    ],
    stats: {
      generations: '2.3M+',
      avgEngagement: '+127%',
      platforms: 'Instagram'
    }
  },
  {
    name: 'TikTok Hashtag Finder',
    description: 'Discover trending TikTok hashtags for viral content. Perfect for creators and brands.',
    icon: '🎵',
    href: '/tools/tiktok',
    features: [
      'TikTok trending hashtag analysis',
      'Viral content optimization',
      'Sound-based hashtag suggestions',
      'Challenge hashtag discovery',
      'FYP optimization tips'
    ],
    stats: {
      generations: '1.8M+',
      avgEngagement: '+89%',
      platforms: 'TikTok'
    }
  },
  {
    name: 'Twitter/X Hashtag Tool',
    description: 'Find relevant Twitter hashtags for maximum reach and engagement.',
    icon: '🐦',
    href: '/tools/twitter',
    features: [
      'Twitter-optimized hashtag count',
      'Trending topic integration',
      'Real-time hashtag analysis',
      'Community hashtag discovery',
      'Tweet engagement optimization'
    ],
    stats: {
      generations: '1.2M+',
      avgEngagement: '+156%',
      platforms: 'Twitter/X'
    }
  },
  {
    name: 'YouTube Hashtag Generator',
    description: 'Optimize YouTube videos with targeted hashtags for better discoverability.',
    icon: '📺',
    href: '/tools/youtube',
    features: [
      'YouTube SEO optimization',
      'Video description hashtags',
      'Thumbnail optimization tips',
      'Category-specific hashtags',
      'YouTube Shorts hashtags'
    ],
    stats: {
      generations: '950K+',
      avgEngagement: '+203%',
      platforms: 'YouTube'
    }
  },
  {
    name: 'Multi-Platform Generator',
    description: 'Generate hashtags for all platforms simultaneously with cross-platform optimization.',
    icon: '🌐',
    href: '/',
    features: [
      'Cross-platform hashtag strategy',
      'Platform-specific optimization',
      'Unified content planning',
      'Multi-language support',
      'Global reach optimization'
    ],
    stats: {
      generations: '5M+',
      avgEngagement: '+145%',
      platforms: 'All Platforms'
    }
  },
  {
    name: 'Hashtag Analytics',
    description: 'Track hashtag performance and analyze trending patterns across platforms.',
    icon: '📊',
    href: '/tools/analytics',
    features: [
      'Real-time hashtag tracking',
      'Performance analytics',
      'Trend prediction',
      'Competitor analysis',
      'ROI measurement'
    ],
    stats: {
      generations: 'Pro Feature',
      avgEngagement: 'Detailed Insights',
      platforms: 'All Platforms'
    },
    isPro: true
  }
];

const categories = [
  {
    name: 'Platform-Specific Tools',
    description: 'Specialized hashtag generators optimized for each social media platform',
    tools: tools.slice(0, 4)
  },
  {
    name: 'Advanced Tools',
    description: 'Professional tools for serious marketers and content creators',
    tools: tools.slice(4)
  }
];

export default function ToolsPage() {
  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "HyperHash Social Media Tools",
            "description": "AI-powered social media hashtag generation tools for Instagram, TikTok, Twitter, and YouTube",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": tools.map(tool => tool.name),
            "url": "https://hyperhash.ai/tools"
          })
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors">
              ← Back to Home
            </Link>
            
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              🛠️ AI Social Media <span className="text-blue-600">Tools Suite</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Professional AI-powered tools for social media growth. Generate viral hashtags, 
              analyze trends, and optimize content across all major platforms.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-full text-blue-800 dark:text-blue-200">
                🤖 AI-Powered
              </span>
              <span className="bg-green-100 dark:bg-green-900 px-4 py-2 rounded-full text-green-800 dark:text-green-200">
                📱 All Platforms
              </span>
              <span className="bg-purple-100 dark:bg-purple-900 px-4 py-2 rounded-full text-purple-800 dark:text-purple-200">
                🌍 Global Support
              </span>
              <span className="bg-orange-100 dark:bg-orange-900 px-4 py-2 rounded-full text-orange-800 dark:text-orange-200">
                📊 Analytics Ready
              </span>
            </div>
          </div>

          {/* Categories */}
          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {category.name}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.tools.map((tool, toolIndex) => (
                  <Link 
                    key={toolIndex}
                    href={tool.href}
                    className="group"
                  >
                    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-blue-500 ${tool.isPro ? 'ring-2 ring-purple-500' : ''}`}>
                      {tool.isPro && (
                        <div className="absolute -top-3 -right-3">
                          <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            PRO
                          </span>
                        </div>
                      )}

                      <div className="text-center mb-6">
                        <div className="text-4xl mb-4">{tool.icon}</div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                          {tool.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {tool.description}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">
                            {tool.stats.generations}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Generations
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">
                            {tool.stats.avgEngagement}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Avg Boost
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-600">
                            {tool.stats.platforms}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Platform
                          </div>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">
                          ✨ Key Features:
                        </h4>
                        <ul className="space-y-2">
                          {tool.features.slice(0, 3).map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start text-xs">
                              <span className="text-green-500 mr-2 mt-0.5">✓</span>
                              <span className="text-gray-600 dark:text-gray-300">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                        {tool.features.length > 3 && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            +{tool.features.length - 3} more features
                          </p>
                        )}
                      </div>

                      {/* CTA */}
                      <div className="text-center">
                        <div className={`${tool.isPro ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold py-3 px-6 rounded-lg transition-colors group-hover:shadow-lg`}>
                          {tool.isPro ? '🚀 Try Pro' : '🆓 Use Free'}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              🚀 Ready to Boost Your Social Media Presence?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Choose the perfect tool for your platform and start generating viral hashtags today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/"
                className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-100 transition-colors inline-block"
              >
                🎯 Start Free Generator
              </Link>
              <Link 
                href="/pricing"
                className="border-2 border-white text-white font-semibold py-4 px-8 rounded-xl hover:bg-white hover:text-blue-600 transition-colors inline-block"
              >
                💎 View Pro Plans
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
