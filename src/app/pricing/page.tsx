import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pricing Plans - Choose Your HyperHash Plan',
  description: 'Choose the perfect HyperHash plan for your social media needs. Free plan available. Pro and Enterprise plans for serious marketers and agencies.',
  keywords: [
    'hashtag generator pricing',
    'social media tools pricing',
    'AI hashtag tool cost',
    'Instagram hashtag generator price',
    'TikTok hashtag tool pricing',
    'social media marketing tools',
    'hashtag analytics pricing'
  ],
  openGraph: {
    title: 'HyperHash Pricing - AI Hashtag Generator Plans',
    description: 'Get started free or upgrade to Pro for unlimited hashtag generation, analytics, and premium features.',
    images: [
      {
        url: '/images/pricing-og.jpg',
        width: 1200,
        height: 630,
        alt: 'HyperHash Pricing Plans',
      },
    ],
  },
};

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started with AI hashtag generation',
    features: [
      '50 hashtag generations per month',
      'Basic AI recommendations',
      '4 social media platforms',
      '12+ language support',
      'Basic analytics',
      'Community support'
    ],
    limitations: [
      'Limited to 20 hashtags per generation',
      'Basic trending analysis',
      'No export features'
    ],
    popular: false,
    cta: 'Start Free',
    ctaColor: 'bg-blue-600 hover:bg-blue-700'
  },
  {
    name: 'Pro',
    price: '$19',
    period: 'per month',
    description: 'Ideal for content creators and small businesses',
    features: [
      'Unlimited hashtag generations',
      'Advanced AI with trending analysis',
      'All platforms + future integrations',
      'Premium hashtag suggestions',
      'Advanced analytics & insights',
      'Hashtag performance tracking',
      'Export to CSV/Excel',
      'Custom branded hashtags',
      'Priority support',
      'API access (limited)'
    ],
    limitations: [],
    popular: true,
    cta: 'Start Pro Trial',
    ctaColor: 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: 'per month',
    description: 'For agencies, teams, and large businesses',
    features: [
      'Everything in Pro',
      'Team collaboration tools',
      'Multi-account management',
      'Custom AI model training',
      'White-label solutions',
      'Advanced API access',
      'Custom integrations',
      'Dedicated account manager',
      'SLA guarantee',
      'Custom reporting',
      'Bulk hashtag processing',
      'Advanced automation'
    ],
    limitations: [],
    popular: false,
    cta: 'Contact Sales',
    ctaColor: 'bg-gray-800 hover:bg-gray-900'
  }
];

const faqs = [
  {
    question: 'Can I change my plan anytime?',
    answer: 'Yes! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect at the next billing cycle.'
  },
  {
    question: 'What happens if I exceed my plan limits?',
    answer: 'Free users will be prompted to upgrade. Pro users have unlimited generations. We\'ll notify you before any overages.'
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a 30-day money-back guarantee for all paid plans. No questions asked!'
  },
  {
    question: 'Is there a long-term contract?',
    answer: 'No contracts! All plans are month-to-month. Cancel anytime with one click.'
  },
  {
    question: 'Do you offer discounts for annual plans?',
    answer: 'Yes! Save 20% when you pay annually. Perfect for committed users and businesses.'
  }
];

export default function PricingPage() {
  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "HyperHash AI Hashtag Generator",
            "description": "AI-powered hashtag generator for social media platforms",
            "brand": {
              "@type": "Brand",
              "name": "HyperHash"
            },
            "offers": plans.map(plan => ({
              "@type": "Offer",
              "name": `HyperHash ${plan.name} Plan`,
              "description": plan.description,
              "price": plan.price.replace('$', ''),
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "url": "https://hyperhash.ai/pricing"
            }))
          })
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors">
              ← Back to Generator
            </Link>
            
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Choose Your <span className="text-blue-600">HyperHash</span> Plan
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              From free hashtag generation to enterprise-level solutions. 
              Start free and scale as you grow your social media presence.
            </p>

            <div className="flex justify-center items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center">
                ✅ 30-day money-back guarantee
              </span>
              <span className="flex items-center">
                ✅ No setup fees
              </span>
              <span className="flex items-center">
                ✅ Cancel anytime
              </span>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 ${
                  plan.popular 
                    ? 'ring-4 ring-purple-500 transform scale-105' 
                    : 'border border-gray-200 dark:border-gray-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium">
                      🔥 Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {plan.price}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                    ✨ What's included:
                  </h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <span className="text-green-500 mr-3 mt-0.5">✓</span>
                        <span className="text-gray-600 dark:text-gray-300 text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {plan.limitations.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                        ⚠️ Limitations:
                      </h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <li key={limitIndex} className="flex items-start">
                            <span className="text-orange-500 mr-3 mt-0.5">!</span>
                            <span className="text-gray-500 dark:text-gray-400 text-sm">
                              {limitation}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <button
                  className={`w-full ${plan.ctaColor} text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl`}
                >
                  {plan.cta}
                </button>

                {plan.name === 'Pro' && (
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                    🎁 14-day free trial included
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Feature Comparison */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              📊 Feature Comparison
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
                      Features
                    </th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white">
                      Free
                    </th>
                    <th className="text-center py-4 px-4 font-semibold text-purple-600">
                      Pro
                    </th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-300">Monthly Generations</td>
                    <td className="text-center py-4 px-4">50</td>
                    <td className="text-center py-4 px-4 text-purple-600 font-semibold">Unlimited</td>
                    <td className="text-center py-4 px-4 text-green-600 font-semibold">Unlimited</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-300">AI Analysis</td>
                    <td className="text-center py-4 px-4">Basic</td>
                    <td className="text-center py-4 px-4 text-purple-600">Advanced</td>
                    <td className="text-center py-4 px-4 text-green-600">Custom</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-300">Analytics & Insights</td>
                    <td className="text-center py-4 px-4">Basic</td>
                    <td className="text-center py-4 px-4 text-purple-600">Advanced</td>
                    <td className="text-center py-4 px-4 text-green-600">Enterprise</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-300">API Access</td>
                    <td className="text-center py-4 px-4">❌</td>
                    <td className="text-center py-4 px-4 text-purple-600">Limited</td>
                    <td className="text-center py-4 px-4 text-green-600">Full</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-300">Team Features</td>
                    <td className="text-center py-4 px-4">❌</td>
                    <td className="text-center py-4 px-4">❌</td>
                    <td className="text-center py-4 px-4 text-green-600">✅</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-300">Support Level</td>
                    <td className="text-center py-4 px-4">Community</td>
                    <td className="text-center py-4 px-4 text-purple-600">Priority</td>
                    <td className="text-center py-4 px-4 text-green-600">Dedicated</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              🤔 Frequently Asked Questions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              🚀 Ready to Supercharge Your Social Media?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of creators and businesses using HyperHash to grow their reach
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/"
                className="bg-white text-purple-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-100 transition-colors inline-block"
              >
                🆓 Start Free Now
              </Link>
              <Link 
                href="/contact"
                className="border-2 border-white text-white font-semibold py-4 px-8 rounded-xl hover:bg-white hover:text-purple-600 transition-colors inline-block"
              >
                💬 Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
