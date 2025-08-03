import type { Metadata } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: 'Social Media Marketing Blog - Hashtag Strategies & Tips | HyperHash',
  description: 'Learn the latest social media marketing strategies, hashtag tips, and growth tactics. Expert guides for Instagram, TikTok, Twitter, and YouTube success.',
  keywords: [
    'social media blog',
    'hashtag marketing blog',
    'Instagram marketing tips',
    'TikTok growth strategies',
    'Twitter marketing guide',
    'YouTube optimization',
    'social media strategy',
    'content marketing blog',
    'viral marketing tips',
    'hashtag strategy guide'
  ],
  openGraph: {
    title: 'Social Media Marketing Blog - HyperHash',
    description: 'Expert insights on social media marketing, hashtag strategies, and growth tactics for all platforms.',
    images: [
      {
        url: '/images/blog-og.jpg',
        width: 1200,
        height: 630,
        alt: 'HyperHash Social Media Blog',
      },
    ],
  },
};

// This would be replaced with actual blog post fetching logic
const featuredPosts = [
  {
    title: 'Best Instagram Hashtags for Fashion Brands in 2025',
    excerpt: 'Discover the most effective Instagram hashtags for fashion brands, influencers, and businesses to boost engagement and reach in 2025.',
    slug: 'best-instagram-hashtags-fashion-brands-2025',
    category: 'Instagram Marketing',
    readTime: '8 min read',
    publishedAt: '2025-08-03',
    featured: true,
    image: '/images/blog/instagram-fashion-hashtags.jpg'
  },
  {
    title: 'TikTok Hashtag Trends That Will Dominate 2025',
    excerpt: 'Stay ahead of the curve with the latest TikTok hashtag trends. Learn how to leverage viral hashtags for maximum reach and engagement.',
    slug: 'tiktok-hashtag-trends-2025',
    category: 'TikTok Marketing',
    readTime: '6 min read',
    publishedAt: '2025-08-02',
    featured: true,
    image: '/images/blog/tiktok-trends-2025.jpg'
  },
  {
    title: 'YouTube Hashtag Strategy: Complete Guide for Creators',
    excerpt: 'Master YouTube hashtags to boost your video discoverability. Learn the best practices, optimization techniques, and tools for YouTube success.',
    slug: 'youtube-hashtag-strategy-guide',
    category: 'YouTube Marketing',
    readTime: '10 min read',
    publishedAt: '2025-08-01',
    featured: true,
    image: '/images/blog/youtube-hashtag-guide.jpg'
  }
];

const categories = [
  {
    name: 'Instagram Marketing',
    count: 15,
    description: 'Tips and strategies for Instagram growth',
    color: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
  },
  {
    name: 'TikTok Marketing',
    count: 12,
    description: 'Viral content strategies for TikTok',
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
  },
  {
    name: 'Twitter Marketing',
    count: 8,
    description: 'Twitter engagement and growth tactics',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
  },
  {
    name: 'YouTube Marketing',
    count: 10,
    description: 'YouTube optimization and growth',
    color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  },
  {
    name: 'Social Media Strategy',
    count: 18,
    description: 'Cross-platform marketing strategies',
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  },
  {
    name: 'Hashtag Strategy',
    count: 22,
    description: 'Advanced hashtag techniques',
    color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
  }
];

const recentPosts = [
  {
    title: 'How to Find Trending Hashtags in 2025',
    slug: 'find-trending-hashtags-2025',
    category: 'Hashtag Strategy',
    publishedAt: '2025-08-03',
    readTime: '5 min read'
  },
  {
    title: 'Social Media Analytics: Track Your Hashtag Performance',
    slug: 'social-media-analytics-hashtag-performance',
    category: 'Social Media Strategy',
    publishedAt: '2025-08-02',
    readTime: '7 min read'
  },
  {
    title: 'Instagram vs TikTok: Which Platform Should You Choose?',
    slug: 'instagram-vs-tiktok-platform-choice',
    category: 'Social Media Strategy',
    publishedAt: '2025-08-01',
    readTime: '6 min read'
  },
  {
    title: 'Creating Viral Content: The Psychology Behind Shareability',
    slug: 'creating-viral-content-psychology',
    category: 'Content Marketing',
    publishedAt: '2025-07-31',
    readTime: '9 min read'
  }
];

export default function BlogPage() {
  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "HyperHash Social Media Marketing Blog",
            "description": "Expert insights on social media marketing, hashtag strategies, and growth tactics",
            "url": "https://hyperhash.ai/blog",
            "publisher": {
              "@type": "Organization",
              "name": "HyperHash",
              "logo": "https://hyperhash.ai/images/logo.png"
            },
            "blogPost": featuredPosts.map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
              "url": `https://hyperhash.ai/blog/${post.slug}`,
              "datePublished": post.publishedAt,
              "author": {
                "@type": "Organization",
                "name": "HyperHash Team"
              },
              "publisher": {
                "@type": "Organization",
                "name": "HyperHash"
              }
            }))
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
              📚 Social Media <span className="text-blue-600">Marketing Blog</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Expert insights, strategies, and tips to grow your social media presence. 
              Learn from industry professionals and boost your hashtag game.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-full text-blue-800 dark:text-blue-200">
                📈 Growth Strategies
              </span>
              <span className="bg-green-100 dark:bg-green-900 px-4 py-2 rounded-full text-green-800 dark:text-green-200">
                🎯 Expert Tips
              </span>
              <span className="bg-purple-100 dark:bg-purple-900 px-4 py-2 rounded-full text-purple-800 dark:text-purple-200">
                📊 Latest Trends
              </span>
              <span className="bg-orange-100 dark:bg-orange-900 px-4 py-2 rounded-full text-orange-800 dark:text-orange-200">
                🚀 Proven Tactics
              </span>
            </div>
          </div>

          {/* Featured Posts */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              🔥 Featured Articles
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <Link 
                  key={index}
                  href={`/blog/${post.slug}`}
                  className="group"
                >
                  <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                    <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-500 relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
                          post.category.includes('Instagram') ? 'bg-pink-600 text-white' :
                          post.category.includes('TikTok') ? 'bg-purple-600 text-white' :
                          post.category.includes('YouTube') ? 'bg-red-600 text-white' :
                          'bg-blue-600 text-white'
                        }`}>
                          {post.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                        <span>{post.publishedAt}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Recent Posts */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                  📰 Latest Articles
                </h2>
                
                <div className="space-y-6">
                  {recentPosts.map((post, index) => (
                    <Link 
                      key={index}
                      href={`/blog/${post.slug}`}
                      className="group block"
                    >
                      <article className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0 last:pb-0">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs text-blue-600 font-semibold">
                            {post.category}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {post.readTime}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>
                        
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {post.publishedAt}
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">
                  📧 Get Weekly Social Media Tips
                </h2>
                <p className="mb-6 opacity-90">
                  Join 10,000+ marketers getting our weekly newsletter with the latest hashtag trends, 
                  growth strategies, and platform updates.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="email" 
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                    Subscribe Free
                  </button>
                </div>
                <p className="text-xs mt-3 opacity-75">
                  No spam. Unsubscribe anytime. Read our privacy policy.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Categories */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  🗂️ Categories
                </h3>
                
                <div className="space-y-3">
                  {categories.map((category, index) => (
                    <Link 
                      key={index}
                      href={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block group"
                    >
                      <div className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                            {category.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {category.description}
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${category.color}`}>
                          {category.count}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  🏷️ Popular Tags
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  {[
                    'hashtag strategy', 'Instagram tips', 'TikTok growth', 
                    'viral content', 'social media', 'content marketing',
                    'influencer marketing', 'brand awareness', 'engagement',
                    'algorithm', 'trending', 'analytics'
                  ].map((tag, index) => (
                    <Link 
                      key={index}
                      href={`/blog/tag/${tag.replace(/\s+/g, '-')}`}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs hover:bg-blue-100 hover:text-blue-800 dark:hover:bg-blue-900 dark:hover:text-blue-200 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA Box */}
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-3">
                  🚀 Try HyperHash Free
                </h3>
                <p className="text-sm mb-4 opacity-90">
                  Generate viral hashtags with our AI-powered tool. Perfect for all your social media needs.
                </p>
                <Link 
                  href="/"
                  className="block bg-white text-purple-600 font-semibold py-3 px-4 rounded-lg text-center hover:bg-gray-100 transition-colors"
                >
                  Start Generating
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
