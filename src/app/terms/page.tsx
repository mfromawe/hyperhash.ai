import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - HyperHash.ai Legal Terms & Conditions',
  description: 'Read the terms of service for HyperHash.ai AI hashtag generator. Legal terms, user rights, and service conditions for our platform.',
  keywords: 'hyperhash terms of service, legal terms, user agreement, ai hashtag terms, service conditions',
  openGraph: {
    title: 'Terms of Service - HyperHash.ai',
    description: 'Legal terms and conditions for using HyperHash.ai services.',
    type: 'website',
    url: 'https://hyperhash.ai/terms',
  },
  alternates: {
    canonical: 'https://hyperhash.ai/terms',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms of Service - HyperHash.ai',
    description: 'Terms of service and legal conditions for HyperHash.ai',
    url: 'https://hyperhash.ai/terms',
    dateModified: '2024-01-15',
    publisher: {
      '@type': 'Organization',
      name: 'HyperHash.ai'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Last updated: January 15, 2024
            </p>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Agreement to Terms</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  These Terms of Service ("Terms") constitute a legally binding agreement between you and 
                  HyperHash.ai ("Company," "we," "us," or "our") regarding your use of our AI-powered 
                  hashtag generation platform and related services.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  By accessing or using HyperHash.ai, you agree to be bound by these Terms. If you do not 
                  agree to these Terms, you may not access or use our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Description of Services</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  HyperHash.ai provides AI-powered hashtag generation and social media optimization tools including:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                  <li>Intelligent hashtag suggestions based on content analysis</li>
                  <li>Platform-specific hashtag optimization (Instagram, TikTok, Twitter, YouTube, LinkedIn)</li>
                  <li>Trending hashtag discovery and analytics</li>
                  <li>Multi-language hashtag generation</li>
                  <li>Content performance insights and recommendations</li>
                  <li>API access for developers and businesses</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">User Accounts and Registration</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Account Creation</h3>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                  <li>You must be at least 13 years old to create an account</li>
                  <li>Provide accurate, current, and complete information during registration</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Keep your login credentials secure and confidential</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Account Responsibility</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  You are responsible for all activities that occur under your account. You must immediately 
                  notify us of any unauthorized access or security breaches.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Acceptable Use Policy</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Permitted Uses</h3>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                  <li>Generate hashtags for legitimate social media content</li>
                  <li>Use our API within documented rate limits</li>
                  <li>Access services for personal or business purposes</li>
                  <li>Share generated hashtags in accordance with platform policies</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Prohibited Activities</h3>
                <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
                  <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                    <li>Generate hashtags for illegal, harmful, or offensive content</li>
                    <li>Attempt to reverse engineer, decompile, or hack our services</li>
                    <li>Use automated tools to scrape or overload our systems</li>
                    <li>Circumvent rate limits or access controls</li>
                    <li>Resell or redistribute our services without authorization</li>
                    <li>Generate spam or misleading hashtags</li>
                    <li>Violate any applicable laws or third-party rights</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Subscription Plans and Billing</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Plan Types</h3>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                  <li><strong>Free Plan:</strong> Limited hashtag generations with basic features</li>
                  <li><strong>Pro Plan:</strong> Enhanced features with higher usage limits</li>
                  <li><strong>Enterprise Plan:</strong> Custom solutions with dedicated support</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Billing Terms</h3>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                  <li>Subscription fees are billed in advance on a monthly or annual basis</li>
                  <li>All fees are non-refundable except as required by law</li>
                  <li>Price changes will be communicated 30 days in advance</li>
                  <li>Failed payments may result in service suspension</li>
                  <li>You may cancel your subscription at any time</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Intellectual Property Rights</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Our Rights</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  HyperHash.ai and all related technology, algorithms, software, and content are owned by us 
                  and protected by intellectual property laws. You may not use our trademarks or copyrighted 
                  materials without express written permission.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Your Content</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  You retain ownership of content you input into our services. By using our services, you grant 
                  us a limited license to process your content solely to provide hashtag generation services.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Generated Hashtags</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  You may freely use hashtags generated by our service. However, you are responsible for ensuring 
                  that your use of these hashtags complies with applicable platform policies and laws.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Privacy and Data Protection</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Your privacy is important to us. Our collection, use, and disclosure of your information is 
                  governed by our <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>, 
                  which is incorporated into these Terms by reference.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Service Availability and Support</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Service Level</h3>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                  <li>We strive for 99.9% uptime but do not guarantee uninterrupted service</li>
                  <li>Scheduled maintenance will be announced in advance when possible</li>
                  <li>Emergency maintenance may occur without prior notice</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Customer Support</h3>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                  <li>Free users: Community support and documentation</li>
                  <li>Pro users: Email support with 24-48 hour response time</li>
                  <li>Enterprise users: Priority support with dedicated account management</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Disclaimers and Limitations</h2>
                
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Service Disclaimer</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our services are provided "as is" and "as available." We make no warranties, expressed or 
                    implied, regarding the accuracy, reliability, or effectiveness of generated hashtags.
                  </p>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Limitation of Liability</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  To the maximum extent permitted by law, HyperHash.ai shall not be liable for any indirect, 
                  incidental, special, consequential, or punitive damages arising from your use of our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Termination</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Termination by You</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  You may terminate your account at any time by contacting us or using account deletion tools 
                  in your dashboard. Termination does not entitle you to a refund of prepaid fees.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Termination by Us</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We may suspend or terminate your account immediately if you violate these Terms, engage in 
                  fraudulent activity, or for any other reason at our sole discretion.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Governing Law and Disputes</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  These Terms are governed by the laws of [Your Jurisdiction]. Any disputes will be resolved 
                  through binding arbitration in accordance with the rules of the American Arbitration Association.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Before initiating arbitration, you agree to first contact us to attempt to resolve the dispute informally.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Changes to Terms</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  We may modify these Terms at any time. We will provide notice of material changes through 
                  email or prominent notices on our website. Your continued use of our services after changes 
                  constitutes acceptance of the updated Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Information</h2>
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    For questions about these Terms, please contact us:
                  </p>
                  <ul className="text-gray-600 dark:text-gray-300">
                    <li><strong>Email:</strong> legal@hyperhash.ai</li>
                    <li><strong>Support:</strong> support@hyperhash.ai</li>
                    <li><strong>Address:</strong> Legal Department, HyperHash.ai</li>
                  </ul>
                </div>
              </section>

            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Questions about our terms? Our legal team is here to help.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
            >
              Contact Legal Team
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
