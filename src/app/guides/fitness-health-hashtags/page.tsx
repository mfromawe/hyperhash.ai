import type { Metadata } from 'next';
import Link from 'next/link';

const title = 'Fitness & Health Hashtag Guide: Build Your Wellness Community Online';
const description = 'Master fitness and health hashtag strategies to grow your wellness brand, attract fitness enthusiasts, and build an engaged community of health-conscious followers.';

export const metadata: Metadata = {
  title,
  description,
  keywords: 'fitness hashtags, health hashtags, workout hashtags, wellness hashtags, gym hashtags, fitness influencer, health coach hashtags, nutrition hashtags, fitness motivation',
  alternates: {
    canonical: 'https://hyperhash.ai/guides/fitness-health-hashtags',
  },
  openGraph: {
    title: `${title} | HyperHash.ai`,
    description,
    url: 'https://hyperhash.ai/guides/fitness-health-hashtags',
    type: 'article',
    publishedTime: '2024-01-15T00:00:00.000Z',
    modifiedTime: new Date().toISOString(),
    section: 'Fitness Marketing',
    tags: ['Fitness Marketing', 'Health & Wellness', 'Fitness Influencer'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | HyperHash.ai`,
    description,
    creator: '@hyperhash_ai',
  },
};

export default function FitnessHealthHashtagsGuide() {
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
      '@id': 'https://hyperhash.ai/guides/fitness-health-hashtags',
    },
    articleSection: 'Fitness Marketing',
    keywords: 'fitness hashtags, health hashtags, workout hashtags',
    about: {
      '@type': 'Thing',
      name: 'Fitness & Health Hashtag Strategy',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/guides" className="hover:text-blue-600 dark:hover:text-blue-400">Guides</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 dark:text-gray-100">Fitness & Health Hashtags</span>
          </nav>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Fitness & Health Hashtag Guide
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              Build a thriving fitness community with strategic hashtag use. Attract health-conscious followers, 
              showcase transformation journeys, and establish your authority in the wellness space.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {['Fitness Marketing', 'Health & Wellness', 'Workout Motivation', 'Fitness Influencer'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Quick Start Guide */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Quick Start: Top Fitness Hashtags</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">High Volume</h3>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  #fitness #health #workout #motivation #gym #fitfam #healthy #training #exercise #wellness
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">Medium Volume</h3>
                <p className="text-sm text-green-600 dark:text-green-400">
                  #fitnessjourney #healthylifestyle #workoutmotivation #fitnessgirl #musclebuilding #cardio
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">Niche Specific</h3>
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  #homeworkout #strengthtraining #yoga #nutrition #transformation #personaltrainer
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Fitness Hashtag Categories</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">💪 Workout Types</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Strength Training</h4>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        #strengthtraining #weightlifting #powerlifting #bodybuilding #musclebuilding #deadlift #squat #benchpress
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Cardio & Endurance</h4>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        #cardio #running #cycling #swimming #marathon #hiit #interval #endurance
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Flexibility & Recovery</h4>
                      <p className="text-sm text-purple-600 dark:text-purple-400">
                        #yoga #pilates #stretching #mobility #recovery #meditation #mindfulness #flexibility
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">🥗 Nutrition & Wellness</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Healthy Eating</h4>
                      <p className="text-sm text-orange-600 dark:text-orange-400">
                        #nutrition #healthyeating #mealprep #cleaneating #wholefoods #protein #superfoods
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Diet Specific</h4>
                      <p className="text-sm text-red-600 dark:text-red-400">
                        #keto #paleo #vegan #vegetarian #intermittentfasting #lowcarb #plantbased
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Wellness Lifestyle</h4>
                      <p className="text-sm text-indigo-600 dark:text-indigo-400">
                        #wellness #selfcare #mindfulness #mentalhealth #balance #holistic #lifestyle
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Platform-Specific Strategies</h2>
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">📸 Instagram Fitness</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Content Types</h4>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                        <li>• Workout videos and form checks</li>
                        <li>• Transformation photos</li>
                        <li>• Healthy meal inspiration</li>
                        <li>• Motivational quotes</li>
                        <li>• Behind-the-scenes gym content</li>
                        <li>• Exercise tutorials</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Top Instagram Hashtags</h4>
                      <div className="space-y-2 text-sm">
                        <div className="bg-pink-50 dark:bg-pink-900/20 rounded p-2">
                          <span className="text-pink-600 dark:text-pink-400">#fitspo #fitnessmotivation #gymlife #workoutvideos #fitnessmodel</span>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
                          <span className="text-blue-600 dark:text-blue-400">#transformation #beforeandafter #progresspic #fitnessjunkie</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">🎵 TikTok Fitness</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Viral Content Ideas</h4>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                        <li>• Quick workout routines</li>
                        <li>• Exercise form corrections</li>
                        <li>• Fitness challenges</li>
                        <li>• What I eat in a day</li>
                        <li>• Workout outfit transitions</li>
                        <li>• Debunking fitness myths</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">TikTok Hashtags</h4>
                      <div className="space-y-2 text-sm">
                        <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
                          <span className="text-green-600 dark:text-green-400">#FitnessCheck #WorkoutTok #HealthyTok #FitTok #GymTok</span>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-2">
                          <span className="text-purple-600 dark:text-purple-400">#QuickWorkout #FitnessChallenge #HealthyLifestyle</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Motivation & Community Building</h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">🔥 Motivational Hashtags</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Mindset</h4>
                    <div className="bg-red-50 dark:bg-red-900/20 rounded p-3">
                      <span className="text-red-600 dark:text-red-400 text-sm">
                        #nevergiveup #mindset #determination #pushyourlimits #mentalstrength #willpower
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Progress</h4>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded p-3">
                      <span className="text-green-600 dark:text-green-400 text-sm">
                        #progress #smallsteps #consistency #dailyhabits #fitnessjourney #keepgoing
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Community</h4>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-3">
                      <span className="text-blue-600 dark:text-blue-400 text-sm">
                        #fitfam #community #support #togetherwearestronger #accountability #teamwork
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Fitness Business & Professional</h2>
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">👨‍💼 Fitness Professionals</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Credentials & Services</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-blue-600 dark:text-blue-400">#personaltrainer</span> - Certified trainers</p>
                        <p><span className="text-green-600 dark:text-green-400">#nutritionist</span> - Diet professionals</p>
                        <p><span className="text-purple-600 dark:text-purple-400">#yogainstructor</span> - Yoga teachers</p>
                        <p><span className="text-orange-600 dark:text-orange-400">#fitnesscoach</span> - Fitness coaching</p>
                        <p><span className="text-red-600 dark:text-red-400">#onlinecoaching</span> - Virtual training</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Specializations</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-indigo-600 dark:text-indigo-400">#weightloss</span> - Fat loss focus</p>
                        <p><span className="text-pink-600 dark:text-pink-400">#musclegain</span> - Muscle building</p>
                        <p><span className="text-yellow-600 dark:text-yellow-400">#seniorfitness</span> - Older adults</p>
                        <p><span className="text-teal-600 dark:text-teal-400">#prenatalfitness</span> - Pregnancy fitness</p>
                        <p><span className="text-gray-600 dark:text-gray-400">#rehabilitation</span> - Injury recovery</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">🏢 Fitness Businesses</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Gym & Studios</h4>
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-3">
                        <span className="text-blue-600 dark:text-blue-400 text-sm">
                          #gym #fitnessstudio #crossfit #yogastudio #boutiquefitness #membershipdeals
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Equipment & Gear</h4>
                      <div className="bg-green-50 dark:bg-green-900/20 rounded p-3">
                        <span className="text-green-600 dark:text-green-400 text-sm">
                          #fitnessapparel #activewear #homegym #fitnesstech #supplements #proteinpowder
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Apps & Programs</h4>
                      <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-3">
                        <span className="text-purple-600 dark:text-purple-400 text-sm">
                          #fitnessapp #workoutprogram #onlinefitness #virtualtraining #fitnessplans
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </article>

          {/* CTA Section */}
          <section className="mt-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Transform Your Fitness Content</h2>
            <p className="text-green-100 mb-6 text-lg">
              Generate powerful fitness hashtags that inspire, motivate, and grow your health & wellness community.
            </p>
            <Link
              href="/"
              className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Generate Fitness Hashtags
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
                    Master Instagram strategies for fitness and health content.
                  </p>
                </div>
              </Link>
              <Link href="/guides/tiktok-trends" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2">
                    TikTok Trends
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Discover viral TikTok strategies for fitness content.
                  </p>
                </div>
              </Link>
              <Link href="/guides/branded-hashtags" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2">
                    Branded Hashtags
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Build your fitness brand with custom hashtag strategies.
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
