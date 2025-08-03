import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - HyperHash.ai Frequently Asked Questions & Support',
  description: 'Get answers to frequently asked questions about HyperHash.ai AI hashtag generator. Learn how to maximize your social media reach with our platform.',
  keywords: 'hyperhash faq, hashtag generator help, ai hashtag questions, social media marketing support, hashtag optimization guide',
  openGraph: {
    title: 'FAQ - HyperHash.ai Support Center',
    description: 'Find answers to common questions about our AI-powered hashtag generator.',
    type: 'website',
    url: 'https://hyperhash.ai/faq',
  },
  alternates: {
    canonical: 'https://hyperhash.ai/faq',
  },
};

export default function FAQPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: 'HyperHash.ai FAQ',
    description: 'Frequently asked questions about HyperHash.ai AI hashtag generator',
    url: 'https://hyperhash.ai/faq',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does HyperHash.ai generate hashtags?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'HyperHash.ai uses advanced AI algorithms to analyze your content, current trends, and platform-specific data to generate highly relevant and engaging hashtags tailored to your audience and goals.'
        }
      },
      {
        '@type': 'Question',
        name: 'Which social media platforms does HyperHash.ai support?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We support all major social media platforms including Instagram, TikTok, Twitter, YouTube, LinkedIn, Facebook, and Pinterest. Each platform has optimized hashtag strategies.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is there a free plan available?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Our free plan includes 50 hashtag generations per month with basic features. Upgrade to Pro or Enterprise for unlimited generations and advanced analytics.'
        }
      }
    ]
  };

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "How does HyperHash.ai generate hashtags?",
          a: "HyperHash.ai uses advanced AI algorithms to analyze your content, current trends, and platform-specific data to generate highly relevant and engaging hashtags. Our system considers factors like audience behavior, trending topics, and optimal hashtag density for maximum reach."
        },
        {
          q: "Which social media platforms does HyperHash.ai support?",
          a: "We support all major social media platforms including Instagram, TikTok, Twitter (X), YouTube, LinkedIn, Facebook, and Pinterest. Each platform has optimized hashtag strategies based on their unique algorithms and user behaviors."
        },
        {
          q: "Is there a free plan available?",
          a: "Yes! Our free plan includes 50 hashtag generations per month with basic features. You can upgrade to Pro (unlimited generations) or Enterprise (custom solutions) for advanced features and analytics."
        },
        {
          q: "How accurate are the generated hashtags?",
          a: "Our AI analyzes over 50 million hashtags daily and maintains a 94% relevance accuracy rate. We continuously update our algorithms based on real-time social media trends and user feedback."
        }
      ]
    },
    {
      category: "Features & Functionality",
      questions: [
        {
          q: "Can I generate hashtags in different languages?",
          a: "Yes! HyperHash.ai supports hashtag generation in 15+ languages including English, Spanish, French, German, Portuguese, Italian, Turkish, Japanese, Korean, and more. Our AI understands cultural nuances and local trends."
        },
        {
          q: "How many hashtags should I use per post?",
          a: "Our AI provides platform-optimized recommendations: Instagram (20-30 hashtags), TikTok (3-5 hashtags), Twitter (1-2 hashtags), LinkedIn (3-5 hashtags). We automatically suggest the optimal number for each platform."
        },
        {
          q: "Can HyperHash.ai help with trending hashtags?",
          a: "Absolutely! Our system tracks real-time trends across all platforms and incorporates trending hashtags into suggestions when relevant to your content. We also provide trend analysis and timing recommendations."
        },
        {
          q: "Does HyperHash.ai provide hashtag analytics?",
          a: "Pro and Enterprise users get detailed analytics including hashtag performance, reach estimates, competition levels, and engagement predictions. Track which hashtags drive the most results for your content."
        }
      ]
    },
    {
      category: "Pricing & Plans",
      questions: [
        {
          q: "What's included in the Pro plan?",
          a: "Pro plan ($9.99/month) includes unlimited hashtag generations, advanced AI suggestions, hashtag analytics, trend insights, bulk generation, API access, and priority support. Perfect for serious creators and small businesses."
        },
        {
          q: "Is there an Enterprise plan?",
          a: "Yes! Our Enterprise plan offers custom solutions for large businesses including dedicated account management, white-label options, advanced analytics dashboards, team collaboration tools, and custom integrations."
        },
        {
          q: "Can I cancel my subscription anytime?",
          a: "Yes, you can cancel your subscription at any time from your account dashboard. Your plan will remain active until the end of the current billing period, and you won't be charged again."
        },
        {
          q: "Do you offer refunds?",
          a: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied with HyperHash.ai within the first 30 days, contact our support team for a full refund."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          q: "Is there an API available?",
          a: "Yes! Pro and Enterprise users get access to our REST API with comprehensive documentation. Integrate hashtag generation directly into your apps, social media management tools, or workflows."
        },
        {
          q: "How do I integrate HyperHash.ai with my existing tools?",
          a: "We offer integrations with popular social media management platforms like Hootsuite, Buffer, and Sprout Social. Our API also enables custom integrations with your existing workflow tools."
        },
        {
          q: "What if I need help getting started?",
          a: "We provide comprehensive onboarding for all users including video tutorials, documentation, and live chat support. Pro users get priority email support, and Enterprise users have dedicated account managers."
        },
        {
          q: "Is my content data secure?",
          a: "Absolutely! We use enterprise-grade encryption, secure data centers, and strict privacy policies. Your content is processed only for hashtag generation and is never stored permanently or shared with third parties."
        }
      ]
    },
    {
      category: "Best Practices",
      questions: [
        {
          q: "How often should I change my hashtags?",
          a: "We recommend refreshing 20-30% of your hashtags for each post to avoid appearing spammy to platform algorithms. Our AI automatically suggests fresh variations while maintaining relevance to your content niche."
        },
        {
          q: "Should I use popular or niche hashtags?",
          a: "The best strategy combines both! Our AI suggests a mix of high-competition hashtags for maximum reach and niche hashtags for targeted engagement. This balanced approach maximizes both visibility and audience quality."
        },
        {
          q: "Can HyperHash.ai help improve my engagement rate?",
          a: "Yes! Users typically see 30-50% improvement in engagement within the first month. Our AI optimizes for engagement-focused hashtags rather than just reach, helping you build a more active and committed audience."
        },
        {
          q: "How do I track hashtag performance?",
          a: "Our analytics dashboard shows hashtag performance metrics including reach, impressions, engagement rate, and click-through rates. We also provide recommendations for optimizing your hashtag strategy based on performance data."
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
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Find answers to common questions about HyperHash.ai and learn how to maximize your social media reach.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search FAQ..."
                className="w-full px-6 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
              />
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">50M+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Hashtags Analyzed Daily</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <div className="text-2xl font-bold text-purple-600 mb-2">94%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Accuracy Rate</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">15+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Languages Supported</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <div className="text-2xl font-bold text-orange-600 mb-2">1M+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Happy Users</div>
            </div>
          </div>

          {/* FAQ Categories */}
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                {category.category}
              </h2>
              <div className="max-w-4xl mx-auto space-y-4">
                {category.questions.map((faq, index) => (
                  <details key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                        {faq.q}
                      </h3>
                      <svg 
                        className="w-6 h-6 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}

          {/* Contact Support */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
            <p className="text-xl opacity-90 mb-8">
              Our support team is here to help you succeed with HyperHash.ai
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
              >
                Contact Support
              </a>
              <a
                href="/guides"
                className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200"
              >
                View Guides
              </a>
            </div>
          </div>

          {/* Popular Resources */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Popular Resources
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <a href="/guides/instagram-hashtags" className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow group">
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-pink-600 text-xl">📸</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Instagram Hashtag Guide</h3>
                <p className="text-gray-600 dark:text-gray-300">Complete guide to Instagram hashtag strategy and best practices.</p>
              </a>
              
              <a href="/guides/tiktok-trends" className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow group">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-red-600 text-xl">🎵</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">TikTok Trends</h3>
                <p className="text-gray-600 dark:text-gray-300">Stay ahead of viral trends with our TikTok hashtag insights.</p>
              </a>
              
              <a href="/tools/hashtag-analyzer" className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow group">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-blue-600 text-xl">📊</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Hashtag Analyzer</h3>
                <p className="text-gray-600 dark:text-gray-300">Analyze hashtag performance and optimize your strategy.</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
