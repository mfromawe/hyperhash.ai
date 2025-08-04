import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Social Media Hashtag Guides - Expert Tips & Strategies | HyperHash.ai',
  description: 'Master social media with our comprehensive hashtag guides. Learn proven strategies for Instagram, TikTok, Twitter, YouTube and more. Boost engagement with expert tips.',
  keywords: 'hashtag guides, social media strategy, instagram hashtag tips, tiktok hashtag guide, twitter hashtag best practices, youtube hashtag optimization',
  openGraph: {
    title: 'Complete Hashtag Strategy Guides - HyperHash.ai',
    description: 'Expert guides and strategies to master hashtags across all social media platforms.',
    type: 'website',
    url: 'https://hyperhash.ai/guides',
  },
  alternates: {
    canonical: 'https://hyperhash.ai/guides',
  },
};

export default function GuidesPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'HyperHash.ai Social Media Guides',
    description: 'Comprehensive guides for hashtag optimization across social media platforms',
    url: 'https://hyperhash.ai/guides',
    hasPart: [
      {
        '@type': 'Article',
        name: 'Instagram Hashtag Strategy Guide',
        description: 'Complete guide to Instagram hashtag optimization',
        url: 'https://hyperhash.ai/guides/instagram-hashtags'
      },
      {
        '@type': 'Article',
        name: 'TikTok Hashtag Trends',
        description: 'How to leverage TikTok hashtags for viral content',
        url: 'https://hyperhash.ai/guides/tiktok-trends'
      },
      {
        '@type': 'Article',
        name: 'Twitter Hashtag Best Practices',
        description: 'Master Twitter hashtag strategy for maximum engagement',
        url: 'https://hyperhash.ai/guides/twitter-hashtags'
      },
      {
        '@type': 'Article',
        name: 'YouTube Hashtag Optimization',
        description: 'Boost YouTube video discoverability with hashtags',
        url: 'https://hyperhash.ai/guides/youtube-hashtags'
      },
      {
        '@type': 'Article',
        name: 'LinkedIn Professional Hashtags',
        description: 'B2B hashtag strategies for LinkedIn success',
        url: 'https://hyperhash.ai/guides/linkedin-hashtags'
      },
      {
        '@type': 'Article',
        name: 'Pinterest Hashtag Strategy',
        description: 'Drive traffic with Pinterest hashtag optimization',
        url: 'https://hyperhash.ai/guides/pinterest-hashtags'
      },
      {
        '@type': 'Article',
        name: 'Hashtag Research Methodology',
        description: 'Professional hashtag research techniques and tools',
        url: 'https://hyperhash.ai/guides/hashtag-research'
      },
      {
        '@type': 'Article',
        name: 'Multi-Platform Hashtag Strategy',
        description: 'Coordinate hashtags across multiple social platforms',
        url: 'https://hyperhash.ai/guides/multi-platform-strategy'
      },
      {
        '@type': 'Article',
        name: 'Hashtag Analytics Guide',
        description: 'Measure and optimize hashtag performance',
        url: 'https://hyperhash.ai/guides/hashtag-analytics'
      },
      {
        '@type': 'Article',
        name: 'Branded Hashtag Campaigns',
        description: 'Create successful branded hashtag strategies',
        url: 'https://hyperhash.ai/guides/branded-hashtags'
      },
      {
        '@type': 'Article',
        name: 'E-commerce Hashtag Strategy',
        description: 'Drive sales with product and shopping hashtags',
        url: 'https://hyperhash.ai/guides/ecommerce-hashtags'
      },
      {
        '@type': 'Article',
        name: 'Food & Restaurant Hashtags',
        description: 'Attract food lovers with strategic hashtag use',
        url: 'https://hyperhash.ai/guides/food-restaurant-hashtags'
      },
      {
        '@type': 'Article',
        name: 'Fitness & Health Hashtags',
        description: 'Build fitness communities with targeted hashtags',
        url: 'https://hyperhash.ai/guides/fitness-health-hashtags'
      },
      {
        '@type': 'Article',
        name: 'Travel Hashtag Guide',
        description: 'Inspire wanderlust with travel hashtag strategies',
        url: 'https://hyperhash.ai/guides/travel-hashtags'
      },
      {
        '@type': 'Article',
        name: 'Hashtag Dos and Don\'ts',
        description: 'Essential hashtag rules and common mistakes',
        url: 'https://hyperhash.ai/guides/hashtag-dos-and-donts'
      },
      {
        '@type': 'Article',
        name: 'Seasonal Hashtag Calendar',
        description: 'Plan seasonal hashtag campaigns year-round',
        url: 'https://hyperhash.ai/guides/seasonal-hashtags'
      },
      {
        '@type': 'Article',
        name: 'Hashtag Automation Guide',
        description: 'Automate hashtag strategies with tools and AI',
        url: 'https://hyperhash.ai/guides/hashtag-automation'
      }
    ]
  };

  const guides = [
    {
      category: "Platform-Specific Guides",
      guides: [
        {
          title: "Instagram Hashtag Mastery",
          description: "Complete guide to Instagram hashtag strategy, from research to optimization. Learn how to use 30 hashtags effectively.",
          readTime: "12 min read",
          difficulty: "Beginner",
          icon: "📸",
          color: "pink",
          href: "/guides/instagram-hashtags",
          tags: ["Instagram", "Engagement", "Growth"]
        },
        {
          title: "TikTok Viral Hashtag Strategies",
          description: "Discover how to use TikTok hashtags to go viral. Trending hashtag research and timing strategies included.",
          readTime: "8 min read",
          difficulty: "Intermediate",
          icon: "🎵",
          color: "red",
          href: "/guides/tiktok-trends",
          tags: ["TikTok", "Viral", "Trends"]
        },
        {
          title: "Twitter/X Hashtag Best Practices",
          description: "Maximize reach on Twitter with strategic hashtag use. Learn the 1-2 hashtag rule and trending topic tactics.",
          readTime: "10 min read",
          difficulty: "Beginner",
          icon: "🐦",
          color: "blue",
          href: "/guides/twitter-hashtags",
          tags: ["Twitter", "News", "Engagement"]
        },
        {
          title: "YouTube Hashtag Optimization",
          description: "Use hashtags to boost YouTube video discoverability. SEO-focused hashtag strategies for creators.",
          readTime: "15 min read",
          difficulty: "Advanced",
          icon: "📺",
          color: "red",
          href: "/guides/youtube-hashtags",
          tags: ["YouTube", "SEO", "Discovery"]
        },
        {
          title: "LinkedIn Professional Hashtags",
          description: "Build professional authority with LinkedIn hashtags. B2B marketing and thought leadership strategies.",
          readTime: "11 min read",
          difficulty: "Intermediate",
          icon: "💼",
          color: "blue",
          href: "/guides/linkedin-hashtags",
          tags: ["LinkedIn", "B2B", "Professional"]
        },
        {
          title: "Pinterest Hashtag Strategy",
          description: "Drive traffic and sales with Pinterest hashtag optimization. Visual content marketing tactics.",
          readTime: "9 min read",
          difficulty: "Beginner",
          icon: "📌",
          color: "red",
          href: "/guides/pinterest-hashtags",
          tags: ["Pinterest", "Traffic", "Sales"]
        }
      ]
    },
    {
      category: "Advanced Strategies",
      guides: [
        {
          title: "Hashtag Research Methodology",
          description: "Professional techniques for finding high-performing hashtags. Tools, metrics, and competitor analysis.",
          readTime: "20 min read",
          difficulty: "Advanced",
          icon: "🔍",
          color: "purple",
          href: "/guides/hashtag-research",
          tags: ["Research", "Analytics", "Strategy"]
        },
        {
          title: "Multi-Platform Hashtag Campaigns",
          description: "Coordinate hashtag strategies across multiple platforms for maximum impact and brand consistency.",
          readTime: "18 min read",
          difficulty: "Advanced",
          icon: "🌐",
          color: "green",
          href: "/guides/multi-platform-strategy",
          tags: ["Campaign", "Branding", "Cross-platform"]
        },
        {
          title: "Hashtag Performance Analytics",
          description: "Measure and optimize hashtag performance with advanced analytics. KPIs, tracking, and ROI measurement.",
          readTime: "16 min read",
          difficulty: "Advanced",
          icon: "📊",
          color: "blue",
          href: "/guides/hashtag-analytics",
          tags: ["Analytics", "KPIs", "ROI"]
        },
        {
          title: "Branded Hashtag Campaigns",
          description: "Create and promote branded hashtags that drive user-generated content and brand awareness.",
          readTime: "14 min read",
          difficulty: "Intermediate",
          icon: "🏷️",
          color: "orange",
          href: "/guides/branded-hashtags",
          tags: ["Branding", "UGC", "Campaigns"]
        }
      ]
    },
    {
      category: "Industry-Specific Guides",
      guides: [
        {
          title: "E-commerce Hashtag Strategy",
          description: "Drive sales with product and shopping hashtags. Convert followers into customers with strategic tagging.",
          readTime: "13 min read",
          difficulty: "Intermediate",
          icon: "🛒",
          color: "green",
          href: "/guides/ecommerce-hashtags",
          tags: ["E-commerce", "Sales", "Products"]
        },
        {
          title: "Restaurant & Food Hashtags",
          description: "Attract food lovers and boost restaurant visibility with mouth-watering hashtag strategies.",
          readTime: "10 min read",
          difficulty: "Beginner",
          icon: "🍕",
          color: "orange",
          href: "/guides/food-restaurant-hashtags",
          tags: ["Food", "Restaurant", "Local"]
        },
        {
          title: "Fitness & Wellness Hashtags",
          description: "Build a health and fitness community with motivational and niche-specific hashtag strategies.",
          readTime: "11 min read",
          difficulty: "Beginner",
          icon: "💪",
          color: "green",
          href: "/guides/fitness-health-hashtags",
          tags: ["Fitness", "Health", "Motivation"]
        },
        {
          title: "Travel & Tourism Hashtags",
          description: "Inspire wanderlust and attract travelers with location-based and experiential hashtag tactics.",
          readTime: "12 min read",
          difficulty: "Intermediate",
          icon: "✈️",
          color: "blue",
          href: "/guides/travel-hashtags",
          tags: ["Travel", "Tourism", "Location"]
        }
      ]
    },
    {
      category: "Quick Tips & Hacks",
      guides: [
        {
          title: "Hashtag Dos and Don'ts",
          description: "Essential rules and common mistakes to avoid. Quick reference guide for hashtag best practices.",
          readTime: "5 min read",
          difficulty: "Beginner",
          icon: "✅",
          color: "green",
          href: "/guides/hashtag-dos-and-donts",
          tags: ["Best Practices", "Tips", "Mistakes"]
        },
        {
          title: "Seasonal Hashtag Calendar",
          description: "Plan ahead with holiday and seasonal hashtag strategies. Never miss trending seasonal opportunities.",
          readTime: "7 min read",
          difficulty: "Beginner",
          icon: "📅",
          color: "purple",
          href: "/guides/seasonal-hashtags",
          tags: ["Seasonal", "Holidays", "Planning"]
        },
        {
          title: "Hashtag Automation Tools",
          description: "Streamline your hashtag strategy with automation tools and AI-powered generation techniques.",
          readTime: "9 min read",
          difficulty: "Intermediate",
          icon: "🤖",
          color: "blue",
          href: "/guides/hashtag-automation",
          tags: ["Automation", "Tools", "AI"]
        }
      ]
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Hashtag Strategy Guides
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Master social media with our comprehensive guides. From beginner tips to advanced strategies, 
              learn how to maximize your reach and engagement across all platforms.
            </p>
          </div>

          {/* Featured Guides */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Most Popular Guides
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <a href="/guides/instagram-hashtags" className="group bg-gradient-to-br from-pink-500 to-purple-600 p-8 rounded-2xl text-white hover:shadow-2xl transition-all duration-300">
                <div className="text-4xl mb-4">📸</div>
                <h3 className="text-2xl font-bold mb-3 group-hover:scale-105 transition-transform">Instagram Mastery</h3>
                <p className="opacity-90 mb-4">Complete guide to Instagram hashtag strategy and optimization</p>
                <div className="flex items-center text-sm opacity-75">
                  <span>12 min read</span>
                  <span className="mx-2">•</span>
                  <span>Beginner</span>
                </div>
              </a>
              
              <a href="/guides/tiktok-trends" className="group bg-gradient-to-br from-red-500 to-pink-600 p-8 rounded-2xl text-white hover:shadow-2xl transition-all duration-300">
                <div className="text-4xl mb-4">🎵</div>
                <h3 className="text-2xl font-bold mb-3 group-hover:scale-105 transition-transform">TikTok Viral Strategy</h3>
                <p className="opacity-90 mb-4">Learn how to use hashtags to go viral on TikTok</p>
                <div className="flex items-center text-sm opacity-75">
                  <span>8 min read</span>
                  <span className="mx-2">•</span>
                  <span>Intermediate</span>
                </div>
              </a>
              
              <a href="/guides/hashtag-research" className="group bg-gradient-to-br from-blue-500 to-indigo-600 p-8 rounded-2xl text-white hover:shadow-2xl transition-all duration-300">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold mb-3 group-hover:scale-105 transition-transform">Research Methodology</h3>
                <p className="opacity-90 mb-4">Professional techniques for finding high-performing hashtags</p>
                <div className="flex items-center text-sm opacity-75">
                  <span>20 min read</span>
                  <span className="mx-2">•</span>
                  <span>Advanced</span>
                </div>
              </a>
            </div>
          </div>

          {/* All Guides by Category */}
          {guides.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                {category.category}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.guides.map((guide, index) => (
                  <a 
                    key={index}
                    href={guide.href}
                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 bg-${guide.color}-100 dark:bg-${guide.color}-900 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                        {guide.icon}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {guide.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
                      {guide.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                      {guide.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>{guide.readTime}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        guide.difficulty === 'Beginner' ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' :
                        guide.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300' :
                        'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'
                      }`}>
                        {guide.difficulty}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}

          {/* Newsletter Signup */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated with New Guides</h2>
            <p className="text-xl opacity-90 mb-8">
              Get weekly hashtag insights and new guide notifications delivered to your inbox.
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-lg transition-all duration-200">
                  Subscribe
                </button>
              </div>
              <p className="text-sm opacity-75 mt-3">
                No spam. Unsubscribe anytime. Read our <a href="/privacy" className="underline">privacy policy</a>.
              </p>
            </div>
          </div>

          {/* Resource Links */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              More Resources
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/tools"
                className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-600"
              >
                Free Tools
              </a>
              <a
                href="/blog"
                className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-600"
              >
                Latest Blog Posts
              </a>
              <a
                href="/faq"
                className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-600"
              >
                FAQ
              </a>
              <a
                href="/contact"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
              >
                Get Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
