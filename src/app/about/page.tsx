import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About HyperHash.ai - The AI Revolution in Hashtag Generation',
  description: 'Discover how HyperHash.ai revolutionizes social media marketing with AI-powered hashtag generation. Learn about our mission, technology, and team behind the world\'s most advanced hashtag generator.',
  keywords: 'about hyperhash, ai hashtag technology, social media automation, hashtag generator team, ai marketing tools',
  openGraph: {
    title: 'About HyperHash.ai - AI Hashtag Revolution',
    description: 'Learn about the technology and team behind the world\'s most advanced AI hashtag generator.',
    type: 'website',
    url: 'https://hyperhash.ai/about',
  },
  alternates: {
    canonical: 'https://hyperhash.ai/about',
  },
};

export default function AboutPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About HyperHash.ai',
    description: 'Learn about HyperHash.ai, the revolutionary AI-powered hashtag generator',
    url: 'https://hyperhash.ai/about',
    mainEntity: {
      '@type': 'Organization',
      name: 'HyperHash.ai',
      description: 'AI-powered hashtag generation platform',
      url: 'https://hyperhash.ai',
      foundingDate: '2024',
      sameAs: [
        'https://twitter.com/hyperhash_ai',
        'https://linkedin.com/company/hyperhash-ai'
      ]
    }
  };

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
              About HyperHash.ai
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">                We&apos;re revolutionizing social media marketing with AI-powered hashtag generation that drives real engagement and growth.
            </p>
          </div>

          {/* Mission Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                At HyperHash.ai, we believe that every creator, brand, and business deserves to reach their full potential on social media. 
                Our mission is to democratize social media success through intelligent hashtag generation.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                We combine cutting-edge AI technology with deep social media insights to help millions of users 
                amplify their reach, engagement, and impact across all major platforms.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Why HyperHash?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span className="text-gray-600 dark:text-gray-300">AI-powered analysis of 50M+ hashtags</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span className="text-gray-600 dark:text-gray-300">Real-time trend detection</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span className="text-gray-600 dark:text-gray-300">Platform-specific optimization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span className="text-gray-600 dark:text-gray-300">15+ languages supported</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Technology Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Our Technology</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🧠</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">AI Engine</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Advanced machine learning algorithms analyze engagement patterns and predict hashtag performance.
                </p>
              </div>
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Big Data</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Real-time processing of millions of posts across platforms to identify trending hashtags.
                </p>
              </div>
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Performance</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Lightning-fast generation with 99.9% uptime ensuring you never miss trending opportunities.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-16 text-white">
            <h2 className="text-3xl font-bold text-center mb-8">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">50M+</div>
                <div className="text-sm opacity-90">Hashtags Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">1M+</div>
                <div className="text-sm opacity-90">Users Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">15+</div>
                <div className="text-sm opacity-90">Languages</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">99.9%</div>
                <div className="text-sm opacity-90">Uptime</div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Our Commitment</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                We&apos;re committed to continuous innovation, user privacy, and helping creators worldwide achieve their social media goals. 
                Our team of AI researchers, social media experts, and engineers work tirelessly to keep HyperHash.ai at the forefront 
                of hashtag technology.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                  Privacy First
                </span>
                <span className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                  Always Learning
                </span>
                <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full">
                  User Focused
                </span>
                <span className="px-4 py-2 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full">
                  Globally Minded
                </span>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Transform Your Social Media?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Join millions of creators who trust HyperHash.ai to amplify their reach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
              >
                Try HyperHash Free
              </Link>
              <a
                href="/contact"
                className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:border-blue-500 transition-all duration-200"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
