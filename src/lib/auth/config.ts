// Authentication Service Configuration
export const AUTH_CONFIG = {
  // JWT Configuration
  JWT_SECRET: process.env.JWT_SECRET || 'hyperhash-ai-secret-key',
  JWT_EXPIRES_IN: '7d',
  REFRESH_TOKEN_EXPIRES_IN: '30d',
  
  // Session Configuration
  SESSION_COOKIE_NAME: 'hyperhash-session',
  SESSION_MAX_AGE: 7 * 24 * 60 * 60 * 1000, // 7 days
  
  // Rate Limiting
  RATE_LIMITS: {
    free: {
      hashtagsPerMonth: 50,
      requestsPerMinute: 10,
      requestsPerHour: 100,
    },
    pro: {
      hashtagsPerMonth: 1000,
      requestsPerMinute: 60,
      requestsPerHour: 1000,
    },
    enterprise: {
      hashtagsPerMonth: -1, // unlimited
      requestsPerMinute: 200,
      requestsPerHour: 5000,
    }
  },
  
  // Social Login Providers
  SOCIAL_PROVIDERS: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      scope: ['email', 'profile'],
    },
    facebook: {
      appId: process.env.FACEBOOK_APP_ID,
      appSecret: process.env.FACEBOOK_APP_SECRET,
      scope: ['email', 'public_profile'],
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: ['user:email'],
    }
  },
  
  // Email Configuration
  EMAIL: {
    from: 'noreply@hyperhash.ai',
    templates: {
      welcome: 'welcome',
      emailVerification: 'email-verification',
      passwordReset: 'password-reset',
      planUpgrade: 'plan-upgrade',
      usageLimitWarning: 'usage-limit-warning',
    }
  },
  
  // Payment Configuration
  PAYMENT: {
    stripe: {
      publicKey: process.env.STRIPE_PUBLIC_KEY,
      secretKey: process.env.STRIPE_SECRET_KEY,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    },
    currency: 'USD',
  },
  
  // Database
  DATABASE: {
    url: process.env.DATABASE_URL || 'postgresql://localhost:5432/hyperhash',
    maxConnections: 20,
  },
  
  // Redis for sessions and caching
  REDIS: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    sessionPrefix: 'hyperhash:session:',
    cachePrefix: 'hyperhash:cache:',
  },
  
  // Password Requirements
  PASSWORD: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: false,
  },
  
  // Account Verification
  VERIFICATION: {
    emailTokenExpiry: 24 * 60 * 60 * 1000, // 24 hours
    passwordResetExpiry: 1 * 60 * 60 * 1000, // 1 hour
    maxLoginAttempts: 5,
    lockoutDuration: 15 * 60 * 1000, // 15 minutes
  }
};

// Subscription Plans Configuration
export const SUBSCRIPTION_PLANS = {
  free: {
    id: 'free',
    name: 'free',
    displayName: 'Free Plan',
    price: 0,
    interval: 'monthly' as const,
    features: [
      { id: 'hashtags', name: 'Hashtag Generation', description: '50 hashtags per month', included: true, limit: 50 },
      { id: 'platforms', name: 'Social Platforms', description: 'All major platforms', included: true },
      { id: 'basic-analytics', name: 'Basic Analytics', description: 'Simple hashtag metrics', included: true },
      { id: 'support', name: 'Community Support', description: 'Community forum access', included: true },
      { id: 'bulk', name: 'Bulk Generation', description: 'Generate multiple hashtag sets', included: false },
      { id: 'api', name: 'API Access', description: 'REST API for developers', included: false },
      { id: 'priority', name: 'Priority Support', description: '24/7 priority support', included: false },
    ],
    limits: {
      hashtagsPerMonth: 50,
      platforms: ['instagram', 'tiktok', 'twitter', 'youtube', 'linkedin', 'pinterest', 'facebook'],
      analyticsAccess: true,
      bulkGeneration: false,
      apiAccess: false,
      prioritySupport: false,
      customTemplates: false,
    }
  },
  
  pro: {
    id: 'pro',
    name: 'pro',
    displayName: 'Pro Plan',
    price: 9.99,
    interval: 'monthly' as const,
    features: [
      { id: 'hashtags', name: 'Hashtag Generation', description: '1,000 hashtags per month', included: true, limit: 1000 },
      { id: 'platforms', name: 'All Platforms', description: 'All major platforms', included: true },
      { id: 'advanced-analytics', name: 'Advanced Analytics', description: 'Detailed performance metrics', included: true },
      { id: 'bulk', name: 'Bulk Generation', description: 'Generate multiple hashtag sets', included: true },
      { id: 'templates', name: 'Custom Templates', description: 'Save and reuse templates', included: true },
      { id: 'priority', name: 'Priority Support', description: 'Email support within 24h', included: true },
      { id: 'api', name: 'API Access', description: 'REST API for developers', included: false },
    ],
    limits: {
      hashtagsPerMonth: 1000,
      platforms: ['instagram', 'tiktok', 'twitter', 'youtube', 'linkedin', 'pinterest', 'facebook'],
      analyticsAccess: true,
      bulkGeneration: true,
      apiAccess: false,
      prioritySupport: true,
      customTemplates: true,
    }
  },
  
  enterprise: {
    id: 'enterprise',
    name: 'enterprise',
    displayName: 'Enterprise Plan',
    price: 49.99,
    interval: 'monthly' as const,
    features: [
      { id: 'hashtags', name: 'Unlimited Hashtags', description: 'Unlimited hashtag generation', included: true },
      { id: 'platforms', name: 'All Platforms', description: 'All major platforms + custom', included: true },
      { id: 'advanced-analytics', name: 'Enterprise Analytics', description: 'Advanced metrics + reporting', included: true },
      { id: 'bulk', name: 'Bulk Generation', description: 'Unlimited bulk generation', included: true },
      { id: 'api', name: 'Full API Access', description: 'Complete REST API access', included: true },
      { id: 'templates', name: 'Custom Templates', description: 'Unlimited custom templates', included: true },
      { id: 'priority', name: '24/7 Priority Support', description: 'Phone + email support', included: true },
      { id: 'whitelabel', name: 'White Label', description: 'Custom branding options', included: true },
    ],
    limits: {
      hashtagsPerMonth: -1, // unlimited
      platforms: ['instagram', 'tiktok', 'twitter', 'youtube', 'linkedin', 'pinterest', 'facebook'],
      analyticsAccess: true,
      bulkGeneration: true,
      apiAccess: true,
      prioritySupport: true,
      customTemplates: true,
    }
  }
};

// Authentication Errors
export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_ALREADY_EXISTS: 'An account with this email already exists',
  EMAIL_NOT_VERIFIED: 'Please verify your email address before signing in',
  ACCOUNT_LOCKED: 'Account temporarily locked due to too many failed login attempts',
  INVALID_TOKEN: 'Invalid or expired token',
  PASSWORD_TOO_WEAK: 'Password does not meet security requirements',
  RATE_LIMIT_EXCEEDED: 'Too many requests. Please try again later',
  SUBSCRIPTION_REQUIRED: 'This feature requires a paid subscription',
  USAGE_LIMIT_EXCEEDED: 'Monthly usage limit exceeded. Please upgrade your plan',
  INVALID_PAYMENT_METHOD: 'Invalid payment method',
  PAYMENT_FAILED: 'Payment processing failed',
  SUBSCRIPTION_CANCELLED: 'Subscription has been cancelled',
};

export default AUTH_CONFIG;
