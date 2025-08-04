import type { Metadata } from 'next';
import Link from 'next/link';

const title = 'Travel Hashtag Guide: Grow Your Travel Brand & Reach More Wanderers';
const description = 'Master travel hashtag strategies to showcase destinations, attract travel enthusiasts, and build a thriving travel community. Perfect for travel bloggers, agencies, and influencers.';

export const metadata: Metadata = {
  title,
  description,
  keywords: 'travel hashtags, travel blogger hashtags, destination hashtags, wanderlust hashtags, adventure hashtags, travel photography hashtags, tourism hashtags, travel influencer',
  alternates: {
    canonical: 'https://hyperhash.ai/guides/travel-hashtags',
  },
  openGraph: {
    title: `${title} | HyperHash.ai`,
    description,
    url: 'https://hyperhash.ai/guides/travel-hashtags',
    type: 'article',
    publishedTime: '2024-01-15T00:00:00.000Z',
    modifiedTime: new Date().toISOString(),
    section: 'Travel Marketing',
    tags: ['Travel Marketing', 'Tourism', 'Travel Photography'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | HyperHash.ai`,
    description,
    creator: '@hyperhash_ai',
  },
};

export default function TravelHashtagsGuide() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: {
      '@type': 'Organization',
      name: 'HyperHash.ai',
    },
    publisher: {
      '@type': 'Organization',
      name: 'HyperHash.ai',
      logo: {
        '@type': 'ImageObject',
        url: 'https://hyperhash.ai/logo.png',
      },
    },
    datePublished: '2024-01-15T00:00:00.000Z',
    dateModified: new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://hyperhash.ai/guides/travel-hashtags',
    },
    articleSection: 'Travel Marketing',
    keywords: 'travel hashtags, destination hashtags, travel photography',
    about: {
      '@type': 'Thing',
      name: 'Travel Hashtag Strategy',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/guides" className="hover:text-blue-600 dark:hover:text-blue-400">Guides</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 dark:text-gray-100">Travel Hashtags</span>
          </nav>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Travel Hashtag Guide
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              Explore the world through strategic hashtag use. Connect with fellow travelers, showcase stunning 
              destinations, and build an engaged community of wanderlust-filled followers.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {['Travel Marketing', 'Tourism', 'Travel Photography', 'Wanderlust'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Quick Start */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Essential Travel Hashtags</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Popular Travel</h3>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  #travel #wanderlust #adventure #explore #vacation #journey #instatravel #travelgram
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">Destinations</h3>
                <p className="text-sm text-green-600 dark:text-green-400">
                  #paris #tokyo #bali #newyork #london #thailand #italy #greece #california #australia
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">Travel Types</h3>
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  #solotravel #backpacking #luxurytravel #roadtrip #beachvacation #culturaltravel
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Travel Content Categories</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">🏖️ Destination Types</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Beach & Islands</h4>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        #beach #island #paradise #ocean #tropicalvibes #beachlife #islandhopping #sunset
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Mountains & Nature</h4>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        #mountains #hiking #nature #wilderness #nationalpark #outdoors #landscape #scenic
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Cities & Culture</h4>
                      <p className="text-sm text-purple-600 dark:text-purple-400">
                        #citybreak #architecture #museum #culture #streetart #nightlife #urban #skyline
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">✈️ Travel Styles</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Adventure Travel</h4>
                      <p className="text-sm text-orange-600 dark:text-orange-400">
                        #adventure #backpacking #hiking #trekking #extreme #adrenaline #offthebeatenpath
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Luxury Travel</h4>
                      <p className="text-sm text-red-600 dark:text-red-400">
                        #luxury #luxurytravel #resort #spa #finedining #firstclass #vip #exclusive
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Budget Travel</h4>
                      <p className="text-sm text-yellow-600 dark:text-yellow-400">
                        #budgettravel #backpacker #hostel #cheaptravel #travelonabudget #frugaltravel
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Geographic Hashtag Strategy</h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">🌍 Location-Based Hashtags</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Europe</h4>
                    <div className="space-y-1 text-sm">
                      <p className="text-blue-600 dark:text-blue-400">#europe #paris #london #rome #barcelona #amsterdam #berlin #prague</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Asia</h4>
                    <div className="space-y-1 text-sm">
                      <p className="text-green-600 dark:text-green-400">#asia #tokyo #bali #thailand #singapore #korea #china #vietnam</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Americas</h4>
                    <div className="space-y-1 text-sm">
                      <p className="text-purple-600 dark:text-purple-400">#usa #canada #mexico #brazil #argentina #chile #newyork #california</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Oceania</h4>
                    <div className="space-y-1 text-sm">
                      <p className="text-orange-600 dark:text-orange-400">#australia #newzealand #fiji #tahiti #sydney #melbourne #auckland</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Travel Photography Hashtags</h2>
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">📸 Photography Styles</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Landscape</h4>
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-3">
                        <span className="text-blue-600 dark:text-blue-400 text-sm">
                          #landscape #scenery #naturephotography #goldenhour #sunrise #sunset #mountains
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Street</h4>
                      <div className="bg-green-50 dark:bg-green-900/20 rounded p-3">
                        <span className="text-green-600 dark:text-green-400 text-sm">
                          #streetphotography #urban #architecture #candid #people #citylife #culture
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Travel Portraits</h4>
                      <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-3">
                        <span className="text-purple-600 dark:text-purple-400 text-sm">
                          #travelportrait #selfie #travelselfie #peopleoftheworld #locallife #authentic
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">⏰ Timing & Moments</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Time of Day</h4>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                        <li><span className="text-orange-600 dark:text-orange-400">#sunrise</span> - Early morning light</li>
                        <li><span className="text-yellow-600 dark:text-yellow-400">#goldenhour</span> - Perfect lighting</li>
                        <li><span className="text-blue-600 dark:text-blue-400">#bluehour</span> - Twilight magic</li>
                        <li><span className="text-purple-600 dark:text-purple-400">#nightphotography</span> - After dark</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Special Moments</h4>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                        <li><span className="text-red-600 dark:text-red-400">#magicmoment</span> - Spectacular views</li>
                        <li><span className="text-green-600 dark:text-green-400">#perfecttiming</span> - Right moment</li>
                        <li><span className="text-indigo-600 dark:text-indigo-400">#onceinlifetime</span> - Rare experiences</li>
                        <li><span className="text-pink-600 dark:text-pink-400">#breathtaking</span> - Stunning scenes</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Travel Business & Tourism</h2>
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">🏨 Travel Industry</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Accommodation</h4>
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-3">
                        <span className="text-blue-600 dark:text-blue-400 text-sm">
                          #hotel #resort #airbnb #hostel #boutiquehotel #staycation #accommodation
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Transportation</h4>
                      <div className="bg-green-50 dark:bg-green-900/20 rounded p-3">
                        <span className="text-green-600 dark:text-green-400 text-sm">
                          #flight #airline #roadtrip #cruise #train #buslife #ferry #transportation
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Services</h4>
                      <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-3">
                        <span className="text-purple-600 dark:text-purple-400 text-sm">
                          #travelagent #tour #guide #traveldeals #vacation #holiday #booking
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">📱 Platform Strategies</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Instagram Travel</h4>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                        <li>• Use 20-30 relevant hashtags</li>
                        <li>• Mix popular and niche tags</li>
                        <li>• Include location hashtags</li>
                        <li>• Create Instagram Stories highlights</li>
                        <li>• Use geotags for discovery</li>
                        <li>• Partner with travel accounts</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">TikTok Travel</h4>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                        <li>• Create destination guides</li>
                        <li>• Share travel hacks and tips</li>
                        <li>• Show packing tutorials</li>
                        <li>• Document journey experiences</li>
                        <li>• Use trending audio with travel content</li>
                        <li>• Participate in travel challenges</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </article>

          {/* CTA Section */}
          <section className="mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Start Your Travel Journey</h2>
            <p className="text-blue-100 mb-6 text-lg">
              Generate inspiring travel hashtags that capture wanderlust and connect you with fellow travelers worldwide.
            </p>
            <Link
              href="/"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Generate Travel Hashtags
            </Link>
          </section>

          {/* Related Guides */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Related Guides</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/guides/instagram-hashtags" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2">
                    Instagram Hashtags
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Master Instagram strategies for travel photography and content.
                  </p>
                </div>
              </Link>
              <Link href="/guides/hashtag-research" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2">
                    Hashtag Research
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Research destination-specific hashtags for maximum reach.
                  </p>
                </div>
              </Link>
              <Link href="/guides/branded-hashtags" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2">
                    Branded Hashtags
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Create branded hashtags for your travel brand or business.
                  </p>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
