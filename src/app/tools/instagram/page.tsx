import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Instagram Hashtag Generator - AI-Powered Tool for Viral Content',
  description: 'Generate viral Instagram hashtags with AI. Optimize for Reels, Stories, and feed posts. Boost engagement with trending hashtags tailored to your content.',
  keywords: [
    'Instagram hashtag generator',
    'Instagram hashtag tool',
    'viral Instagram hashtags',
    'Instagram Reels hashtags',
    'Instagram Stories hashtags',
    'Instagram hashtag finder',
    'best Instagram hashtags',
    'trending Instagram hashtags',
    'Instagram SEO',
    'Instagram marketing tool'
  ],
  openGraph: {
    title: 'Instagram Hashtag Generator - Boost Your Reach with AI',
    description: 'Generate viral Instagram hashtags with our AI tool. Perfect for Reels, Stories, and posts. Increase engagement and reach millions.',
    images: [
      {
        url: '/images/instagram-tool-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Instagram Hashtag Generator Tool',
      },
    ],
  },
};

const instagramTips = [
  {
    title: 'Optimal Hashtag Count',
    description: 'Use 5-15 hashtags for best engagement. Instagram allows up to 30, but quality beats quantity.',
    icon: '🎯'
  },
  {
    title: 'Mix Popular & Niche',
    description: 'Combine trending hashtags with specific niche tags for better discoverability.',
    icon: '🎭'
  },
  {
    title: 'Stories vs Feed',
    description: 'Use 3-5 hashtags in Stories, 9-11 in feed posts for optimal performance.',
    icon: '📱'
  },
  {
    title: 'Reels Strategy',
    description: 'Focus on trending audio hashtags and viral challenge tags for Reels.',
    icon: '🎬'
  }
];

const popularCategories = [
  {
    category: 'Fashion & Style',
    hashtags: ['#fashion', '#style', '#ootd', '#fashionista', '#stylish', '#trendy'],
    posts: '500M+ posts'
  },
  {
    category: 'Food & Cooking',
    hashtags: ['#foodie', '#foodporn', '#instafood', '#cooking', '#recipe', '#delicious'],
    posts: '300M+ posts'
  },
  {
    category: 'Travel & Adventure',
    hashtags: ['#travel', '#wanderlust', '#adventure', '#explore', '#vacation', '#traveling'],
    posts: '800M+ posts'
  },
  {
    category: 'Fitness & Health',
    hashtags: ['#fitness', '#workout', '#health', '#gym', '#motivation', '#fitfam'],
    posts: '200M+ posts'
  },
  {
    category: 'Business & Marketing',
    hashtags: ['#business', '#entrepreneur', '#marketing', '#success', '#motivation', '#startup'],
    posts: '150M+ posts'
  },
  {
    category: 'Photography',
    hashtags: ['#photography', '#photooftheday', '#instagood', '#beautiful', '#art', '#nature'],
    posts: '1B+ posts'
  }
];

const features = [
  {
    title: 'AI-Powered Analysis',
    description: 'Our AI analyzes millions of Instagram posts to suggest the most effective hashtags for your content.',
    icon: '🤖'
  },
  {
    title: 'Trending Detection',
    description: 'Real-time analysis of trending hashtags to boost your content visibility.',
    icon: '📈'
  },
  {
    title: 'Niche Targeting',
    description: 'Discover highly specific hashtags that connect you with your target audience.',
    icon: '🎯'
  },
  {
    title: 'Engagement Prediction',
    description: 'Predict potential engagement levels for different hashtag combinations.',
    icon: '🔮'
  },
  {
    title: 'Content Type Optimization',
    description: 'Specialized hashtag suggestions for Reels, Stories, IGTV, and feed posts.',
    icon: '📱'
  },
  {
    title: 'Competitor Analysis',
    description: 'See what hashtags successful accounts in your niche are using.',
    icon: '🕵️'
  }
];

export default function InstagramToolPage() {
  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Instagram Hashtag Generator",
            "description": "AI-powered Instagram hashtag generator for viral content, Reels, and Stories",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": features.map(feature => feature.title),
            "targetProduct": {
              "@type": "SocialMediaPosting",
              "name": "Instagram Post"
            }
          })
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <Link href="/tools" className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-8 transition-colors">
              ← Back to Tools
            </Link>
            
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              📸 Instagram <span className="text-pink-600">Hashtag Generator</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Generate viral Instagram hashtags with AI. Perfect for Reels, Stories, and feed posts. 
              Boost your engagement and reach millions of users on Instagram.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm mb-8">
              <span className="bg-pink-100 dark:bg-pink-900 px-4 py-2 rounded-full text-pink-800 dark:text-pink-200">
                📱 Instagram Optimized
              </span>
              <span className="bg-purple-100 dark:bg-purple-900 px-4 py-2 rounded-full text-purple-800 dark:text-purple-200">
                🎬 Reels Ready
              </span>
              <span className="bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-full text-blue-800 dark:text-blue-200">
                📊 Trending Analysis
              </span>
            </div>

            {/* CTA Button */}
            <Link 
              href="/?platform=instagram"
              className="inline-block bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              🚀 Generate Instagram Hashtags Now
            </Link>
          </div>

          {/* Instagram Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {instagramTips.map((tip, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="text-3xl mb-4">{tip.icon}</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  {tip.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              🛠️ Powerful Features for Instagram Success
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Categories */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              🔥 Popular Instagram Hashtag Categories
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularCategories.map((category, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {category.category}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {category.posts}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {category.hashtags.map((hashtag, hashtagIndex) => (
                      <span 
                        key={hashtagIndex}
                        className="text-sm bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 px-3 py-1 rounded-full"
                      >
                        {hashtag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How to Use Section */}
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl p-8 text-white mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              📝 How to Use Instagram Hashtag Generator
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="font-bold mb-2">Describe Your Content</h3>
                <p className="text-sm opacity-90">Enter details about your Instagram post, Reel, or Story content</p>
              </div>
              
              <div className="text-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="font-bold mb-2">Select Instagram</h3>
                <p className="text-sm opacity-90">Choose Instagram as your platform for optimized hashtag suggestions</p>
              </div>
              
              <div className="text-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="font-bold mb-2">Generate & Optimize</h3>
                <p className="text-sm opacity-90">Get AI-powered hashtag suggestions optimized for Instagram's algorithm</p>
              </div>
              
              <div className="text-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">4</span>
                </div>
                <h3 className="font-bold mb-2">Copy & Post</h3>
                <p className="text-sm opacity-90">Copy hashtags and paste them into your Instagram post for maximum reach</p>
              </div>
            </div>
          </div>

          {/* Instagram Best Practices */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              🎯 Instagram Hashtag Best Practices
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">✅ Do's</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-0.5">✓</span>
                    <span className="text-gray-600 dark:text-gray-300">Use 5-15 hashtags for optimal engagement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-0.5">✓</span>
                    <span className="text-gray-600 dark:text-gray-300">Mix trending and niche-specific hashtags</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-0.5">✓</span>
                    <span className="text-gray-600 dark:text-gray-300">Research hashtags before using them</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-0.5">✓</span>
                    <span className="text-gray-600 dark:text-gray-300">Create branded hashtags for campaigns</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-0.5">✓</span>
                    <span className="text-gray-600 dark:text-gray-300">Use location-based hashtags when relevant</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">❌ Don'ts</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 mt-0.5">✗</span>
                    <span className="text-gray-600 dark:text-gray-300">Don't use banned or shadowbanned hashtags</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 mt-0.5">✗</span>
                    <span className="text-gray-600 dark:text-gray-300">Avoid using the same hashtags repeatedly</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 mt-0.5">✗</span>
                    <span className="text-gray-600 dark:text-gray-300">Don't use irrelevant popular hashtags</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 mt-0.5">✗</span>
                    <span className="text-gray-600 dark:text-gray-300">Avoid hashtags with negative connotations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 mt-0.5">✗</span>
                    <span className="text-gray-600 dark:text-gray-300">Don't neglect hashtag performance analysis</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              📸 Ready to Go Viral on Instagram?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join millions of creators using HyperHash to boost their Instagram reach and engagement
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/?platform=instagram"
                className="bg-white text-pink-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-100 transition-colors inline-block"
              >
                🚀 Generate Instagram Hashtags
              </Link>
              <Link 
                href="/tools/tiktok"
                className="border-2 border-white text-white font-semibold py-4 px-8 rounded-xl hover:bg-white hover:text-pink-600 transition-colors inline-block"
              >
                🎵 Try TikTok Tool
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
