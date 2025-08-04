import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-07-30.basil',
  typescript: true,
});

export const STRIPE_PLANS = {
  free: {
    name: 'Free',
    price: 0,
    features: [
      '10 hashtag generations per month',
      'Basic platform support',
      'Community support'
    ],
    limits: {
      hashtagsPerMonth: 10
    }
  },
  pro: {
    name: 'Pro',
    price: 999, // $9.99 in cents
    priceId: 'price_pro_monthly', // Replace with actual Stripe price ID
    features: [
      '500 hashtag generations per month',
      'All platforms (Instagram, TikTok, YouTube, Twitter)',
      'Advanced analytics',
      'Priority support',
      'Export functionality'
    ],
    limits: {
      hashtagsPerMonth: 500
    }
  },
  enterprise: {
    name: 'Enterprise',
    price: 2999, // $29.99 in cents
    priceId: 'price_enterprise_monthly', // Replace with actual Stripe price ID
    features: [
      'Unlimited hashtag generations',
      'All platforms + early access to new ones',
      'Advanced analytics + custom reports',
      'API access',
      'Dedicated support',
      'White-label options'
    ],
    limits: {
      hashtagsPerMonth: -1 // Unlimited
    }
  }
} as const;

export type PlanType = keyof typeof STRIPE_PLANS;
