import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Complete Instagram Hashtag Strategy Guide 2024 | HyperHash.ai',
  description: 'Master Instagram hashtags with our comprehensive guide. Learn the 30-hashtag strategy, trending research, niche targeting, and engagement optimization techniques.',
  keywords: 'instagram hashtag strategy, instagram hashtags 2024, instagram hashtag tips, instagram engagement, instagram marketing guide, viral instagram hashtags',
  openGraph: {
    title: 'Complete Instagram Hashtag Strategy Guide - HyperHash.ai',
    description: 'Master Instagram hashtags with proven strategies that increase engagement by 300%+',
    type: 'article',
    url: 'https://hyperhash.ai/guides/instagram-hashtags',
  },
  alternates: {
    canonical: 'https://hyperhash.ai/guides/instagram-hashtags',
  },
};

export default function InstagramHashtagGuide() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Complete Instagram Hashtag Strategy Guide',
    description: 'Step-by-step guide to mastering Instagram hashtags for maximum engagement and growth',
    url: 'https://hyperhash.ai/guides/instagram-hashtags',
    datePublished: '2024-08-03',
    dateModified: '2024-08-03',
    author: {
      '@type': 'Organization',
      name: 'HyperHash.ai'
    },
    step: [
      {
        '@type': 'HowToStep',
        name: 'Research Your Niche Hashtags',
        text: 'Find hashtags specific to your content niche with 10K-100K posts for optimal reach'
      },
      {
        '@type': 'HowToStep',
        name: 'Mix Popular and Niche Hashtags',
        text: 'Combine high-competition hashtags (1M+ posts) with low-competition ones (under 100K)'
      },
      {
        '@type': 'HowToStep',
        name: 'Use All 30 Hashtag Slots',
        text: 'Maximize reach by using Instagram\'s full 30-hashtag limit in posts or first comment'
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6">
              📸
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Complete Instagram Hashtag Strategy Guide
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Master Instagram hashtags with proven strategies that have helped creators achieve 300%+ engagement growth. 
              Learn the 30-hashtag system that works in 2024.
            </p>
            <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-500 dark:text-gray-400">
              <span>📊 12 min read</span>
              <span>🎯 Beginner-Friendly</span>
              <span>✅ Updated Aug 2024</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-pink-600 mb-2">300%+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Average Engagement Boost</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">30</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Max Hashtags per Post</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">5-15</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Optimal Range for Reach</div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12">
            
            {/* Table of Contents */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📋 Table of Contents</h2>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li><a href="#basics" className="hover:text-pink-600">1. Instagram Hashtag Basics</a></li>
                <li><a href="#research" className="hover:text-pink-600">2. Hashtag Research Strategy</a></li>
                <li><a href="#30-hashtag-system" className="hover:text-pink-600">3. The 30-Hashtag System</a></li>
                <li><a href="#placement" className="hover:text-pink-600">4. Hashtag Placement Best Practices</a></li>
                <li><a href="#analytics" className="hover:text-pink-600">5. Tracking & Analytics</a></li>
                <li><a href="#mistakes" className="hover:text-pink-600">6. Common Mistakes to Avoid</a></li>
                <li><a href="#tools" className="hover:text-pink-600">7. Essential Tools & Resources</a></li>
              </ul>
            </div>

            {/* Section 1 */}
            <section id="basics" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">1. Instagram Hashtag Basics</h2>
              
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">What Are Instagram Hashtags?</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Instagram hashtags are clickable tags (starting with #) that categorize and discover content. 
                  They act as keywords that help users find posts related to specific topics, interests, or communities.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-blue-800 dark:text-blue-200">
                    <strong>💡 Pro Tip:</strong> Think of hashtags as the bridge between your content and your ideal audience. 
                    The right hashtags put your posts in front of people actively searching for your type of content.
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Why Hashtags Matter in 2024</h3>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                  <li><strong>Discoverability:</strong> 70% of hashtags on Instagram are branded, making generic hashtags less competitive</li>
                  <li><strong>Algorithm Boost:</strong> Instagram's algorithm uses hashtags to understand and categorize your content</li>
                  <li><strong>Community Building:</strong> Hashtags connect you with niche communities and like-minded users</li>
                  <li><strong>Reach Expansion:</strong> Posts with hashtags get 12.6% more engagement than those without</li>
                </ul>
              </div>
            </section>

            {/* Section 2 */}
            <section id="research" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">2. Hashtag Research Strategy</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-pink-50 dark:bg-pink-900/20 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">🔍 Manual Research Method</h3>
                  <ol className="list-decimal pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                    <li>Search your main keyword in Instagram</li>
                    <li>Check the "Tags" tab for related hashtags</li>
                    <li>Note post counts for each hashtag</li>
                    <li>Analyze top posts for engagement patterns</li>
                    <li>Save promising hashtags to a list</li>
                  </ol>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">🤖 AI-Powered Research</h3>
                  <ol className="list-decimal pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                    <li>Use HyperHash.ai's Instagram tool</li>
                    <li>Input your content description</li>
                    <li>Get AI-curated hashtag suggestions</li>
                    <li>Receive engagement predictions</li>
                    <li>Export optimized hashtag sets</li>
                  </ol>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">📊 Hashtag Size Categories</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-600 dark:text-green-400">Small (1K-10K posts)</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">High engagement potential, niche audience</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-600 dark:text-yellow-400">Medium (10K-100K posts)</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Balanced reach and competition</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 dark:text-red-400">Large (100K+ posts)</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Maximum reach, high competition</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="30-hashtag-system" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">3. The 30-Hashtag System</h2>
              
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-6 rounded-xl text-white mb-6">
                <h3 className="text-xl font-semibold mb-4">🎯 The Golden Formula</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-2xl font-bold">5-8</div>
                    <div className="text-sm opacity-90">High Competition (1M+ posts)</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">15-20</div>
                    <div className="text-sm opacity-90">Medium Competition (100K-1M posts)</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">5-7</div>
                    <div className="text-sm opacity-90">Low Competition (under 100K posts)</div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Example 30-Hashtag Set for Fashion Content</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
                      <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded">#fashion</span>
                      <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded">#style</span>
                      <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded">#ootd</span>
                      <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded">#outfit</span>
                      <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded">#fashionista</span>
                      
                      <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded">#streetstyle</span>
                      <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded">#fashionblogger</span>
                      <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded">#styleinspiration</span>
                      <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded">#fashiontrends</span>
                      <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded">#outfitinspo</span>
                      
                      <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">#sustainablefashion</span>
                      <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">#vintagestyle</span>
                      <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">#ethicalfashion</span>
                      <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">#slowfashion</span>
                      <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">#fashionrevolution</span>
                    </div>
                    <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                      <span className="text-red-600">■ High Competition</span> • 
                      <span className="text-yellow-600">■ Medium Competition</span> • 
                      <span className="text-green-600">■ Low Competition</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="placement" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">4. Hashtag Placement Best Practices</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-4">✅ Best Practices</h3>
                  <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Use all 30 hashtags for maximum reach</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Place hashtags in the first comment for cleaner captions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Mix hashtag sizes for balanced reach</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Research and update hashtag sets monthly</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Use location-based hashtags for local reach</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-4">❌ Avoid These Mistakes</h3>
                  <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>Using banned or flagged hashtags</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>Repeating the same hashtags on every post</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>Using irrelevant hashtags for reach</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>Copying hashtags from competitors blindly</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>Ignoring hashtag performance analytics</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section id="analytics" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">5. Tracking & Analytics</h2>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">📊 Key Metrics to Track</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li><strong>Reach from hashtags:</strong> How many people discovered your post through hashtags</li>
                    <li><strong>Impressions per hashtag:</strong> Which hashtags drive the most views</li>
                    <li><strong>Engagement rate:</strong> Likes, comments, saves per hashtag set</li>
                  </ul>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li><strong>Follower growth:</strong> New followers from hashtag discovery</li>
                    <li><strong>Profile visits:</strong> Hashtag-driven traffic to your profile</li>
                    <li><strong>Save rate:</strong> How often posts with specific hashtags get saved</li>
                  </ul>
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">🔧 Analytics Tools</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold text-purple-600 dark:text-purple-400">Instagram Insights</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Built-in analytics for business accounts</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-600 dark:text-purple-400">HyperHash.ai Analytics</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">AI-powered hashtag performance tracking</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-600 dark:text-purple-400">Third-party Tools</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Hootsuite, Later, Sprout Social</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Action Items */}
            <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-8 rounded-2xl text-white">
              <h2 className="text-2xl font-bold mb-6 text-center">🚀 Your Action Plan</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Week 1: Research</h3>
                  <ul className="text-sm opacity-90 space-y-1">
                    <li>• Identify your niche keywords</li>
                    <li>• Research 100+ relevant hashtags</li>
                    <li>• Categorize by competition level</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Week 2: Test</h3>
                  <ul className="text-sm opacity-90 space-y-1">
                    <li>• Create 5 different hashtag sets</li>
                    <li>• Test on similar content types</li>
                    <li>• Track engagement metrics</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Week 3: Optimize</h3>
                  <ul className="text-sm opacity-90 space-y-1">
                    <li>• Analyze best-performing sets</li>
                    <li>• Refine hashtag strategy</li>
                    <li>• Scale successful patterns</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to 10x Your Instagram Engagement?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Get AI-powered Instagram hashtag suggestions optimized for your content and audience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/tools/instagram"
                className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
              >
                Generate Instagram Hashtags
              </a>
              <a
                href="/guides"
                className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:border-pink-500 transition-all duration-200"
              >
                More Strategy Guides
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
