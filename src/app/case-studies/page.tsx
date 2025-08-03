import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Success Stories & Case Studies - HyperHash.ai Real Results',
  description: 'Discover how creators and businesses achieved viral success with HyperHash.ai. Real case studies showing dramatic growth in engagement and followers.',
  keywords: 'hyperhash case studies, social media success stories, hashtag results, viral marketing examples, influencer growth, business social media success',
  openGraph: {
    title: 'Real Success Stories - HyperHash.ai Case Studies',
    description: 'See how our users achieved viral success and massive growth with AI-powered hashtags.',
    type: 'website',
    url: 'https://hyperhash.ai/case-studies',
  },
  alternates: {
    canonical: 'https://hyperhash.ai/case-studies',
  },
};

export default function CaseStudiesPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'HyperHash.ai Success Stories',
    description: 'Real case studies and success stories from HyperHash.ai users',
    url: 'https://hyperhash.ai/case-studies'
  };

  const featuredCases = [
    {
      title: "Fashion Brand Achieves 500% Engagement Growth",
      client: "StyleVibe Co.",
      industry: "Fashion & Lifestyle",
      challenge: "Low engagement rates despite quality content",
      solution: "Strategic hashtag optimization with trending fashion tags",
      results: {
        engagement: "+500%",
        followers: "+180%",
        reach: "+300%",
        sales: "+85%"
      },
      timeframe: "3 months",
      image: "👗",
      color: "pink",
      quote: "HyperHash.ai transformed our Instagram strategy. We went from 2% to 12% engagement rate in just 3 months.",
      author: "Sarah Johnson, Marketing Director"
    },
    {
      title: "Tech Startup Goes Viral with AI-Generated Hashtags",
      client: "InnovateTech",
      industry: "Technology",
      challenge: "Breaking through noise in competitive tech space",
      solution: "Niche tech hashtags combined with trending topics",
      results: {
        engagement: "+750%",
        followers: "+250%",
        reach: "+400%",
        leads: "+150%"
      },
      timeframe: "2 months",
      image: "💻",
      color: "blue",
      quote: "Our product launch video got 2.3M views thanks to HyperHash.ai's trending hashtag suggestions. Game changer!",
      author: "Mike Chen, Founder & CEO"
    },
    {
      title: "Food Influencer Builds Million-Follower Community",
      client: "Chef Maria",
      industry: "Food & Cooking",
      challenge: "Standing out in oversaturated food niche",
      solution: "Location-based and cuisine-specific hashtag strategy",
      results: {
        engagement: "+425%",
        followers: "+300%",
        reach: "+550%",
        collaborations: "+200%"
      },
      timeframe: "6 months",
      image: "🍕",
      color: "orange",
      quote: "I went from 50K to 1M followers using HyperHash.ai. The ROI on my Pro subscription paid for itself in the first week.",
      author: "Maria Rodriguez, Food Content Creator"
    }
  ];

  const quickWins = [
    {
      metric: "Average Engagement Increase",
      value: "340%",
      description: "Users see dramatic engagement improvements within 30 days"
    },
    {
      metric: "Follower Growth Rate",
      value: "2.5x",
      description: "Accelerated follower acquisition compared to manual hashtag selection"
    },
    {
      metric: "Viral Content Rate",
      value: "45%",
      description: "Higher probability of content reaching viral status"
    },
    {
      metric: "Time Saved",
      value: "5 hours/week",
      description: "Automated hashtag research and optimization"
    }
  ];

  const industries = [
    {
      name: "E-commerce & Retail",
      icon: "🛒",
      growth: "280% avg sales boost",
      cases: 47
    },
    {
      name: "Food & Restaurants",
      icon: "🍕",
      growth: "420% avg engagement",
      cases: 32
    },
    {
      name: "Fashion & Beauty",
      icon: "💄",
      growth: "350% avg reach increase",
      cases: 68
    },
    {
      name: "Technology",
      icon: "💻",
      growth: "510% avg lead generation",
      cases: 23
    },
    {
      name: "Health & Fitness",
      icon: "💪",
      growth: "390% avg community growth",
      cases: 41
    },
    {
      name: "Travel & Tourism",
      icon: "✈️",
      growth: "450% avg engagement rate",
      cases: 35
    }
  ];

  const testimonials = [
    {
      quote: "HyperHash.ai helped us achieve our best quarter ever. Our social media ROI increased by 400%.",
      author: "Jennifer Kim",
      title: "CMO, TechFlow Solutions",
      avatar: "👩‍💼"
    },
    {
      quote: "From struggling creator to 500K followers in 8 months. The AI hashtag suggestions are incredibly accurate.",
      author: "Alex Rivera",
      title: "Content Creator & Influencer",
      avatar: "👨‍🎨"
    },
    {
      quote: "Our restaurant chain saw a 300% increase in online orders after implementing HyperHash.ai strategies.",
      author: "David Park",
      title: "Digital Marketing Manager",
      avatar: "👨‍🍳"
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
              Success Stories
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover how creators, businesses, and influencers achieved viral success and massive growth 
              with HyperHash.ai's AI-powered hashtag strategies.
            </p>
          </div>

          {/* Quick Wins Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {quickWins.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="font-semibold text-gray-900 dark:text-white mb-2">{stat.metric}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{stat.description}</div>
              </div>
            ))}
          </div>

          {/* Featured Case Studies */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Featured Success Stories
            </h2>
            <div className="space-y-12">
              {featuredCases.map((caseStudy, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-2/3 p-8">
                      <div className="flex items-center mb-6">
                        <div className={`w-16 h-16 bg-${caseStudy.color}-100 dark:bg-${caseStudy.color}-900 rounded-full flex items-center justify-center text-3xl mr-4`}>
                          {caseStudy.image}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {caseStudy.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            {caseStudy.client} • {caseStudy.industry}
                          </p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Challenge</h4>
                          <p className="text-gray-600 dark:text-gray-300">{caseStudy.challenge}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Solution</h4>
                          <p className="text-gray-600 dark:text-gray-300">{caseStudy.solution}</p>
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl mb-6">
                        <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 mb-4">
                          "{caseStudy.quote}"
                        </blockquote>
                        <cite className="text-sm text-gray-600 dark:text-gray-400">
                          — {caseStudy.author}
                        </cite>
                      </div>
                    </div>

                    <div className="md:w-1/3 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-4">Results in {caseStudy.timeframe}</h4>
                      <div className="space-y-4">
                        {Object.entries(caseStudy.results).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-300 capitalize">{key}:</span>
                            <span className="font-bold text-green-600 text-lg">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Industry Results */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Results by Industry
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {industries.map((industry, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">{industry.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {industry.name}
                  </h3>
                  <div className="text-blue-600 font-semibold text-lg mb-2">
                    {industry.growth}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Based on {industry.cases} case studies
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              What Our Users Say
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                  <div className="text-4xl mb-4 text-center">{testimonial.avatar}</div>
                  <blockquote className="text-gray-700 dark:text-gray-300 mb-4 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Methodology */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Success Methodology</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">Deep Analysis</h3>
                <p className="opacity-90">
                  We analyze 50M+ posts daily to identify patterns and opportunities in your niche.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-2">Strategic Targeting</h3>
                <p className="opacity-90">
                  AI-powered hashtag selection based on your content, audience, and growth goals.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-xl font-semibold mb-2">Continuous Optimization</h3>
                <p className="opacity-90">
                  Real-time performance tracking and strategy refinement for sustained growth.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of creators and businesses who've transformed their social media presence with HyperHash.ai.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
              >
                Start Your Success Story
              </a>
              <a
                href="/pricing"
                className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:border-blue-500 transition-all duration-200"
              >
                View Pricing Plans
              </a>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              More Resources
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/guides"
                className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-600"
              >
                Strategy Guides
              </a>
              <a
                href="/blog"
                className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-600"
              >
                Success Tips Blog
              </a>
              <a
                href="/contact"
                className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-600"
              >
                Get Expert Help
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
