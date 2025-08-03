import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact HyperHash.ai - Get Expert Hashtag Support',
  description: 'Contact HyperHash.ai for support, partnerships, or questions about our AI hashtag generator. Get expert help for your social media marketing needs.',
  keywords: 'contact hyperhash, hashtag support, social media help, ai hashtag customer service, enterprise partnerships',
  openGraph: {
    title: 'Contact HyperHash.ai - Expert Support',
    description: 'Get in touch with our team for support, partnerships, or any questions about AI hashtag generation.',
    type: 'website',
    url: 'https://hyperhash.ai/contact',
  },
  alternates: {
    canonical: 'https://hyperhash.ai/contact',
  },
};

export default function ContactPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact HyperHash.ai',
    description: 'Contact information and support for HyperHash.ai',
    url: 'https://hyperhash.ai/contact',
    mainEntity: {
      '@type': 'Organization',
      name: 'HyperHash.ai',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'Customer Support',
          email: 'support@hyperhash.ai',
          availableLanguage: ['English', 'Spanish', 'French', 'German', 'Turkish']
        },
        {
          '@type': 'ContactPoint',
          contactType: 'Business Partnerships',
          email: 'partnerships@hyperhash.ai',
          availableLanguage: ['English']
        }
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
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Get in touch with our team for support, partnerships, or any questions about AI hashtag generation.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a message</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select a subject</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="feature">Feature Request</option>
                    <option value="bug">Bug Report</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 mr-3"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    I agree to the <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a> and 
                    <a href="/terms" className="text-blue-600 hover:underline"> Terms of Service</a>
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Quick Contact */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-blue-600 text-xl">📧</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">Email Support</div>
                      <div className="text-gray-600 dark:text-gray-300">support@hyperhash.ai</div>
                      <div className="text-sm text-gray-500">Response within 24 hours</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-purple-600 text-xl">🤝</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">Partnerships</div>
                      <div className="text-gray-600 dark:text-gray-300">partnerships@hyperhash.ai</div>
                      <div className="text-sm text-gray-500">Business collaborations</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-green-600 text-xl">💬</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">Live Chat</div>
                      <div className="text-gray-600 dark:text-gray-300">Available 9AM-6PM EST</div>
                      <div className="text-sm text-gray-500">Monday to Friday</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Link */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
                <h3 className="text-xl font-bold mb-4">Need Quick Answers?</h3>
                <p className="mb-6 opacity-90">
                  Check our comprehensive FAQ section for instant answers to common questions.
                </p>
                <a
                  href="/faq"
                  className="inline-block px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                >
                  Visit FAQ
                </a>
              </div>

              {/* Social Media */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://twitter.com/hyperhash_ai"
                    className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 hover:scale-110 transition-transform"
                    aria-label="Twitter"
                  >
                    <span className="text-xl">🐦</span>
                  </a>
                  <a
                    href="https://linkedin.com/company/hyperhash-ai"
                    className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 hover:scale-110 transition-transform"
                    aria-label="LinkedIn"
                  >
                    <span className="text-xl">💼</span>
                  </a>
                  <a
                    href="https://instagram.com/hyperhash.ai"
                    className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center text-purple-600 hover:scale-110 transition-transform"
                    aria-label="Instagram"
                  >
                    <span className="text-xl">📸</span>
                  </a>
                </div>
              </div>

              {/* Enterprise */}
              <div className="bg-gray-100 dark:bg-gray-700 p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Enterprise Solutions</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Looking for custom AI hashtag solutions for your organization? Our enterprise team is here to help.
                </p>
                <a
                  href="/enterprise"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Learn about Enterprise →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
