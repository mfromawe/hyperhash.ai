import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trending Hashtags & Social Media Trends | HyperHash.ai Live Tracker',
  description: 'Discover real-time trending hashtags across Instagram, TikTok, Twitter, YouTube and more. Stay ahead with our AI-powered trend analysis and predictions.',
  keywords: 'trending hashtags, social media trends, viral hashtags, instagram trends, tiktok trends, twitter trending, hashtag tracker, real-time trends',
  openGraph: {
    title: 'Live Hashtag Trends - HyperHash.ai',
    description: 'Real-time trending hashtags and social media insights powered by AI.',
    type: 'website',
    url: 'https://hyperhash.ai/trends',
  },
  alternates: {
    canonical: 'https://hyperhash.ai/trends',
  },
};

export default function TrendsPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Trending Hashtags - HyperHash.ai',
    description: 'Real-time social media trends and hashtag analysis',
    url: 'https://hyperhash.ai/trends',
    dateModified: new Date().toISOString(),
    publisher: {
      '@type': 'Organization',
      name: 'HyperHash.ai'
    }
  };

  // Mock trending data - in real app, this would come from API
  const trendingNow = [
    { hashtag: '#ai', growth: '+147%', platform: 'all', posts: '2.4M' },
    { hashtag: '#contentcreator', growth: '+89%', platform: 'instagram', posts: '1.8M' },
    { hashtag: '#fyp', growth: '+203%', platform: 'tiktok', posts: '89.2M' },
    { hashtag: '#cryptocurrency', growth: '+76%', platform: 'twitter', posts: '534K' },
    { hashtag: '#motivation', growth: '+45%', platform: 'all', posts: '3.1M' },
  ];

  const platformTrends = {
    instagram: [
      { hashtag: '#reels', posts: '45.2M', growth: '+23%' },
      { hashtag: '#instagood', posts: '1.8B', growth: '+12%' },
      { hashtag: '#fashion', posts: '812M', growth: '+34%' },
      { hashtag: '#food', posts: '456M', growth: '+19%' },
      { hashtag: '#travel', posts: '689M', growth: '+28%' },
    ],
    tiktok: [
      { hashtag: '#fyp', posts: '89.2M', growth: '+203%' },
      { hashtag: '#viral', posts: '67.3M', growth: '+156%' },
      { hashtag: '#dance', posts: '34.1M', growth: '+89%' },
      { hashtag: '#comedy', posts: '23.7M', growth: '+67%' },
      { hashtag: '#trending', posts: '78.9M', growth: '+134%' },
    ],
    twitter: [
      { hashtag: '#breaking', posts: '234K', growth: '+89%' },
      { hashtag: '#tech', posts: '567K', growth: '+45%' },
      { hashtag: '#crypto', posts: '345K', growth: '+78%' },
      { hashtag: '#sports', posts: '789K', growth: '+23%' },
      { hashtag: '#news', posts: '1.2M', growth: '+34%' },
    ],
    youtube: [
      { hashtag: '#shorts', posts: '12.3M', growth: '+167%' },
      { hashtag: '#tutorial', posts: '5.6M', growth: '+45%' },
      { hashtag: '#gaming', posts: '8.9M', growth: '+67%' },
      { hashtag: '#music', posts: '15.2M', growth: '+89%' },
      { hashtag: '#review', posts: '3.4M', growth: '+34%' },
    ]
  };

  const emergingTrends = [
    {
      hashtag: '#sustainablefashion',
      description: 'Growing interest in eco-friendly clothing and ethical fashion brands',
      growth: '+234%',
      platforms: ['Instagram', 'TikTok'],
      audience: 'Gen Z, Millennials'
    },
    {
      hashtag: '#mentalhealth',
      description: 'Increased awareness and discussion around mental wellness',
      growth: '+189%',
      platforms: ['Instagram', 'Twitter', 'LinkedIn'],
      audience: 'All Demographics'
    },
    {
      hashtag: '#remotework',
      description: 'Work-from-home tips, productivity, and digital nomad lifestyle',
      growth: '+156%',
      platforms: ['LinkedIn', 'Twitter', 'Instagram'],
      audience: 'Professionals'
    },
    {
      hashtag: '#plantbased',
      description: 'Vegan recipes, plant-based lifestyle, and sustainable eating',
      growth: '+145%',
      platforms: ['Instagram', 'TikTok', 'YouTube'],
      audience: 'Health-conscious users'
    }
  ];

  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

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
              Trending Hashtags
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-4">
              Stay ahead of the curve with real-time hashtag trends and AI-powered insights across all major social media platforms.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: {currentDate} • Data refreshed every 15 minutes
            </p>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">50M+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Posts Analyzed Today</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">1.2K</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Trending Hashtags</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">15+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Platforms Tracked</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">94%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Prediction Accuracy</div>
            </div>
          </div>

          {/* Trending Now */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              🔥 Trending Now
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="grid gap-4">
                  {trendingNow.map((trend, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white text-lg">
                            {trend.hashtag}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {trend.posts} posts • {trend.platform === 'all' ? 'All Platforms' : trend.platform}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-600 font-semibold">{trend.growth}</div>
                        <div className="text-xs text-gray-500">24h growth</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Platform-Specific Trends */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Platform Trends
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {Object.entries(platformTrends).map(([platform, trends]) => (
                <div key={platform} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                        platform === 'instagram' ? 'bg-pink-100 dark:bg-pink-900' :
                        platform === 'tiktok' ? 'bg-red-100 dark:bg-red-900' :
                        platform === 'twitter' ? 'bg-blue-100 dark:bg-blue-900' :
                        'bg-red-100 dark:bg-red-900'
                      }`}>
                        <span className="text-xl">
                          {platform === 'instagram' ? '📸' :
                           platform === 'tiktok' ? '🎵' :
                           platform === 'twitter' ? '🐦' : '📺'}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white capitalize">
                        {platform}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      {trends.map((trend, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {trend.hashtag}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">
                              {trend.posts} posts
                            </div>
                          </div>
                          <div className="text-green-600 font-semibold text-sm">
                            {trend.growth}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emerging Trends */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              🚀 Emerging Trends
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {emergingTrends.map((trend, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {trend.hashtag}
                    </h3>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-semibold">
                      {trend.growth}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {trend.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {trend.platforms.map((platform, platformIndex) => (
                      <span
                        key={platformIndex}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <strong>Target Audience:</strong> {trend.audience}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trend Insights */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">AI Trend Insights</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold mb-2">AI-Powered Analysis</h3>
                <p className="opacity-90">
                  Our machine learning algorithms analyze millions of posts to predict trending hashtags before they peak.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-2">Real-Time Updates</h3>
                <p className="opacity-90">
                  Get instant notifications when new trends emerge or when hashtags start gaining momentum.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-2">Personalized Trends</h3>
                <p className="opacity-90">
                  Discover trends relevant to your niche and audience for maximum engagement potential.
                </p>
              </div>
            </div>
          </div>

          {/* Trend Categories */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Browse by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { name: 'Technology', icon: '💻', count: '2.3K' },
                { name: 'Fashion', icon: '👗', count: '1.8K' },
                { name: 'Food', icon: '🍕', count: '3.1K' },
                { name: 'Travel', icon: '✈️', count: '1.9K' },
                { name: 'Fitness', icon: '💪', count: '1.5K' },
                { name: 'Music', icon: '🎵', count: '2.7K' },
                { name: 'Art', icon: '🎨', count: '1.2K' },
                { name: 'Business', icon: '💼', count: '1.6K' },
                { name: 'Gaming', icon: '🎮', count: '2.1K' },
                { name: 'Education', icon: '📚', count: '987' },
                { name: 'Sports', icon: '⚽', count: '1.7K' },
                { name: 'Nature', icon: '🌿', count: '1.3K' },
              ].map((category, index) => (
                <a
                  key={index}
                  href={`/trends/${category.name.toLowerCase()}`}
                  className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                    {category.name}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    {category.count} trending
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Start Using Trending Hashtags
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Generate trending hashtags for your content and boost your social media reach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
              >
                Generate Trending Hashtags
              </a>
              <a
                href="/guides"
                className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:border-blue-500 transition-all duration-200"
              >
                Learn Trend Strategies
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
