'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

// Stripe plans tanımı
const STRIPE_PLANS = {
  free: {
    name: 'Free',
    price: 0,
    features: [
      '10 hashtag generations per month',
      'Basic platform support',
      'Community support'
    ]
  },
  pro: {
    name: 'Pro',
    price: 999,
    features: [
      '500 hashtag generations per month',
      'All platforms',
      'Advanced analytics',
      'Priority support'
    ]
  },
  enterprise: {
    name: 'Enterprise',
    price: 2999,
    features: [
      'Unlimited hashtag generations',
      'All platforms + early access',
      'API access',
      'Dedicated support'
    ]
  }
} as const;

export default function PricingPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (planType: string) => {
    if (!user) {
      window.location.href = '/auth?tab=login';
      return;
    }

    if (planType === 'free') {
      window.location.href = '/dashboard';
      return;
    }

    setLoading(planType);

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planType }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setLoading(null);
    }
  };

  const getCurrentPlan = () => {
    if (!user?.subscription) return 'free';
    return user.subscription.planId || 'free';
  };

  const currentPlan = getCurrentPlan();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Unlock AI-powered hashtag generation for your social media success
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Object.entries(STRIPE_PLANS).map(([key, plan]) => {
            const isCurrentPlan = currentPlan === key;
            const isPopular = key === 'pro';

            return (
              <div
                key={key}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                  isPopular ? 'border-blue-500 scale-105' : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {plan.name}
                    </h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        ${(plan.price / 100).toFixed(2)}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">/month</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mt-0.5">
                          <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSubscribe(key)}
                    disabled={loading === key || isCurrentPlan}
                    className={`w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 ${
                      isCurrentPlan
                        ? 'bg-green-100 text-green-700 cursor-not-allowed'
                        : isPopular
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                        : 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800'
                    }`}
                  >
                    {loading === key ? 'Processing...' : isCurrentPlan ? 'Current Plan' : `Choose ${plan.name}`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
