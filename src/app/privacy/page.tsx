import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - HyperHash.ai Data Protection & GDPR Compliance',
  description: 'Learn how HyperHash.ai protects your data and ensures GDPR compliance. Transparent privacy practices for our AI hashtag generation platform.',
  keywords: 'hyperhash privacy policy, data protection, gdpr compliance, user privacy, ai hashtag data security',
  openGraph: {
    title: 'Privacy Policy - HyperHash.ai',
    description: 'Our commitment to protecting your privacy and data security.',
    type: 'website',
    url: 'https://hyperhash.ai/privacy',
  },
  alternates: {
    canonical: 'https://hyperhash.ai/privacy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy - HyperHash.ai',
    description: 'Privacy policy and data protection practices for HyperHash.ai',
    url: 'https://hyperhash.ai/privacy',
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
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Last updated: January 15, 2024
            </p>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  At HyperHash.ai ("we," "our," or "us"), we are committed to protecting your privacy and ensuring 
                  the security of your personal information. This Privacy Policy explains how we collect, use, 
                  disclose, and safeguard your information when you use our AI-powered hashtag generation service.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  By using HyperHash.ai, you consent to the data practices described in this policy. 
                  We comply with GDPR, CCPA, and other applicable privacy regulations.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Information We Collect</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Information You Provide</h3>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                  <li>Account information (email, username, profile details)</li>
                  <li>Content you input for hashtag generation</li>
                  <li>Payment information (processed securely by third-party providers)</li>
                  <li>Communication preferences and settings</li>
                  <li>Support requests and correspondence</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Automatically Collected Information</h3>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                  <li>Usage data and analytics (pages visited, features used, time spent)</li>
                  <li>Device information (browser type, operating system, IP address)</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Performance and error logs</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Third-Party Information</h3>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                  <li>Social media authentication data (if you choose to connect accounts)</li>
                  <li>Public hashtag and trend data from social platforms</li>
                  <li>Analytics from integrated services</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How We Use Your Information</h2>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                  <li><strong>Service Provision:</strong> Generate personalized hashtags and recommendations</li>
                  <li><strong>Account Management:</strong> Create and maintain your user account</li>
                  <li><strong>Communication:</strong> Send service updates, support responses, and newsletters</li>
                  <li><strong>Improvement:</strong> Analyze usage patterns to enhance our AI algorithms</li>
                  <li><strong>Security:</strong> Detect and prevent fraud, abuse, and security incidents</li>
                  <li><strong>Compliance:</strong> Meet legal obligations and enforce our terms</li>
                  <li><strong>Marketing:</strong> Provide relevant content and promotional materials (with consent)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Legal Basis for Processing (GDPR)</h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                  <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                    <li><strong>Contractual Necessity:</strong> To provide our hashtag generation services</li>
                    <li><strong>Legitimate Interest:</strong> To improve our services and prevent fraud</li>
                    <li><strong>Consent:</strong> For marketing communications and optional features</li>
                    <li><strong>Legal Obligation:</strong> To comply with applicable laws and regulations</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Information Sharing and Disclosure</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We do not sell your personal information. We may share your information in the following circumstances:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                  <li><strong>Service Providers:</strong> Trusted third parties who assist in operating our service</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale</li>
                  <li><strong>Consent:</strong> When you explicitly authorize sharing</li>
                  <li><strong>Aggregated Data:</strong> Non-personal, anonymized usage statistics</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data Security</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We implement industry-standard security measures to protect your information:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                  <li>Encryption in transit and at rest</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Access controls and authentication systems</li>
                  <li>Secure data centers with 24/7 monitoring</li>
                  <li>Employee training on data protection practices</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Rights and Choices</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">GDPR Rights</h3>
                    <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                      <li>Access your personal data</li>
                      <li>Rectify inaccurate information</li>
                      <li>Erase your data ("right to be forgotten")</li>
                      <li>Restrict processing</li>
                      <li>Data portability</li>
                      <li>Object to processing</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Account Controls</h3>
                    <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                      <li>Update profile information</li>
                      <li>Manage communication preferences</li>
                      <li>Delete your account</li>
                      <li>Opt out of marketing emails</li>
                      <li>Control cookie settings</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Cookies and Tracking</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We use cookies and similar technologies to enhance your experience:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                  <li><strong>Essential Cookies:</strong> Required for basic functionality</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand usage patterns</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                  <li><strong>Marketing Cookies:</strong> Deliver relevant advertisements (with consent)</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-300 mt-4">
                  You can manage cookie preferences through your browser settings or our cookie consent tool.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data Retention</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  We retain your information only as long as necessary to provide our services and comply with legal obligations:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                  <li><strong>Account Data:</strong> Until account deletion or 3 years of inactivity</li>
                  <li><strong>Usage Analytics:</strong> Aggregated and anonymized after 2 years</li>
                  <li><strong>Support Communications:</strong> 3 years for quality assurance</li>
                  <li><strong>Legal Records:</strong> As required by applicable law</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">International Transfers</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Your information may be transferred to and processed in countries other than your residence. 
                  We ensure appropriate safeguards through standard contractual clauses and adequacy decisions 
                  for all international data transfers.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Children's Privacy</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  HyperHash.ai is not intended for children under 13 years of age. We do not knowingly collect 
                  personal information from children under 13. If you become aware that a child has provided 
                  personal information, please contact us immediately.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Changes to This Policy</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  We may update this Privacy Policy periodically. We will notify you of significant changes 
                  through email or prominent notices on our website. Your continued use of HyperHash.ai after 
                  changes constitutes acceptance of the updated policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Information</h2>
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    For privacy-related questions or to exercise your rights, contact our Data Protection Officer:
                  </p>
                  <ul className="text-gray-600 dark:text-gray-300">
                    <li><strong>Email:</strong> privacy@hyperhash.ai</li>
                    <li><strong>Address:</strong> Data Protection Officer, HyperHash.ai</li>
                    <li><strong>Response Time:</strong> Within 30 days for most requests</li>
                  </ul>
                </div>
              </section>

            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Questions about our privacy practices? We're here to help.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
            >
              Contact Privacy Team
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
