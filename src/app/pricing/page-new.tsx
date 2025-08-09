'use client';

import { useState } from 'react';
import { useUserStore } from '@/store/userStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

// Simplified generic plans (can map to PayPal plan IDs elsewhere)
const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    currency: 'USD',
    features: [
      '50 hashtag generations / month',
      'Core platforms',
      'Community support'
    ]
  },
  pro: {
    name: 'Pro',
    price: 9.99,
    currency: 'USD',
    features: [
      '1000 hashtag generations / month',
      'All platforms',
      'Advanced analytics',
      'Priority support'
    ]
  },
  premium: {
    name: 'Premium',
    price: 19.99,
    currency: 'USD',
    features: [
      'Unlimited hashtag generations',
      'All platforms + early access',
      'API access',
      'Dedicated support',
      'Bulk hashtag export'
    ]
  }
} as const;

export default function PricingPage() {
  const { user } = useUserStore();
  const [loading, setLoading] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
 
  const handlePlanSelect = (planType: string) => {
    if (!user) {
      window.location.href = '/auth?tab=login';
      return;
    }

    if (planType === 'free') {
      window.location.href = '/dashboard';
      return;
    }

    setLoading(planType);
    setSelectedPlan(planType);
    setTimeout(() => setLoading(null), 400); // minimal UX feedback
  };

  if (selectedPlan && selectedPlan !== 'free') {
    const plan = PLANS[selectedPlan as keyof typeof PLANS];
    return (
      <div className="min-h-screen bg-app py-12">
        <div className="container-app">
          <div className="text-center mb-8 text-app">
            <Button
              variant="ghost"
              onClick={() => setSelectedPlan(null)}
              className="mb-4"
            >
              ← Back to Plans
            </Button>
            <h1 className="text-3xl font-bold">
              <span className="text-gradient">Checkout</span>
            </h1>
          </div>
          
          <Card className="p-6">
            {/* PayPal integration component will render on plan-specific pages */}
            <p className="text-muted text-center">Checkout coming soon. PayPal subscription flow will appear here.</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app py-12">
      <div className="container-app">
        <div className="text-center text-app">
          <h1 className="text-4xl font-bold sm:text-5xl">
            <span className="text-gradient">Pricing</span>
          </h1>
          <p className="mt-4 text-xl text-muted">
            Choose the plan that fits your needs
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {Object.entries(PLANS).map(([key, plan]) => {
              const isCurrentPlan = false; // TODO: map to user's subscription
              const isPopular = key === 'pro';

              return (
                <Card
                  key={key}
                  className={`${isPopular ? 'ring-2 ring-purple-500/40' : ''}`}
                >
                  {isPopular && (
                    <div className="gradient-primary text-white text-center py-2 text-sm font-medium rounded-t-[var(--radius-lg)]">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="p-6 text-app">
                    <h3 className="text-2xl font-bold text-center">
                      {plan.name}
                    </h3>
                    <div className="mt-4 text-center">
                      <span className="text-4xl font-bold">
                        {plan.currency === 'USD' ? '$' : plan.currency}{plan.price}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-muted">/mo</span>
                      )}
                    </div>

                    <ul className="mt-6 space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg
                            className="flex-shrink-0 w-5 h-5 text-green-500 mt-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="ml-3 text-muted">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8">
                      <Button
                        onClick={() => handlePlanSelect(key)}
                        disabled={loading === key || isCurrentPlan}
                        loading={loading === key}
                        className="w-full"
                        variant={isPopular ? 'primary' : 'outline'}
                      >
                        {loading === key 
                          ? 'Processing...'
                          : isCurrentPlan 
                          ? 'Current Plan' 
                          : key === 'free'
                          ? 'Get Started'
                          : `Choose ${plan.name}`}
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-app mb-8">
            FAQ
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-app mb-2">
                Are payments secure?
              </h3>
              <p className="text-muted">
                Yes, all payments are processed securely via our payment provider (PayPal). Your card and billing data are encrypted.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="font-semibold text-app mb-2">
                Can I upgrade or downgrade anytime?
              </h3>
              <p className="text-muted">
                Yes, you can change plans at any time. Adjustments apply to the next billing cycle unless otherwise stated.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="font-semibold text-app mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-muted">
                If you are not satisfied within the first 7 days after upgrading, contact support for a full refund.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
