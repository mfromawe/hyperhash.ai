# Authentication System Implementation Plan

## Overview
We'll implement a comprehensive authentication system similar to Splice, Waves Music, and other modern SaaS platforms with:
- User registration/login with email verification
- Social login (Google, Facebook, GitHub)
- Subscription management (Free, Pro, Enterprise)
- Usage tracking and limits
- Payment processing with Stripe
- User dashboard and profile management

## Technology Stack
- **Authentication**: NextAuth.js v5 or custom JWT implementation
- **Database**: PostgreSQL with Prisma ORM
- **Payment**: Stripe for subscription management
- **Email**: Resend or SendGrid for transactional emails
- **Session Storage**: Redis (optional) or JWT cookies
- **Social Login**: OAuth providers

## Phase 1: Core Authentication (Day 1)
### 1.1 Database Setup
- [ ] Install and configure Prisma
- [ ] Create User, Subscription, Usage tables
- [ ] Set up PostgreSQL database

### 1.2 Basic Auth Flow
- [ ] Email/password registration
- [ ] Email verification system
- [ ] Login/logout functionality
- [ ] Password reset flow
- [ ] JWT token management

### 1.3 Basic UI Components
- [ ] Login form component
- [ ] Registration form component
- [ ] Password reset form
- [ ] Email verification page

## Phase 2: Social Login & Advanced Auth (Day 2)
### 2.1 Social Login Integration
- [ ] Google OAuth setup
- [ ] Facebook OAuth setup
- [ ] GitHub OAuth integration
- [ ] Social account linking

### 2.2 User Profile Management
- [ ] User dashboard page
- [ ] Profile editing form
- [ ] Avatar upload
- [ ] Account settings

## Phase 3: Subscription System (Day 3)
### 3.1 Subscription Plans
- [ ] Plan configuration and pricing
- [ ] Subscription status tracking
- [ ] Usage limitations implementation
- [ ] Plan comparison page

### 3.2 Stripe Integration
- [ ] Stripe checkout integration
- [ ] Webhook handling for payments
- [ ] Subscription management
- [ ] Invoice generation

## Phase 4: Usage Tracking & Limits (Day 4)
### 4.1 API Rate Limiting
- [ ] Usage tracking middleware
- [ ] Plan-based rate limiting
- [ ] Usage analytics dashboard
- [ ] Limit warning notifications

### 4.2 Premium Features
- [ ] API access for paid users
- [ ] Bulk hashtag generation
- [ ] Advanced analytics
- [ ] Custom templates

## Phase 5: Polish & Testing (Day 5)
### 5.1 UI/UX Polish
- [ ] Responsive design
- [ ] Loading states
- [ ] Error handling
- [ ] Success notifications

### 5.2 Testing & Security
- [ ] Security audit
- [ ] Rate limiting tests
- [ ] Payment flow testing
- [ ] Email delivery testing

## File Structure
```
src/
├── lib/
│   ├── auth/
│   │   ├── config.ts ✓
│   │   ├── jwt.ts
│   │   ├── providers.ts
│   │   ├── middleware.ts
│   │   └── utils.ts
│   ├── database/
│   │   ├── schema.prisma
│   │   └── queries.ts
│   ├── payments/
│   │   ├── stripe.ts
│   │   └── webhooks.ts
│   └── email/
│       ├── templates/
│       └── sender.ts
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── SocialLogin.tsx
│   │   └── ProtectedRoute.tsx
│   ├── dashboard/
│   │   ├── UserDashboard.tsx
│   │   ├── UsageStats.tsx
│   │   └── SubscriptionCard.tsx
│   └── ui/
├── app/
│   ├── auth/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── verify/page.tsx
│   │   └── reset/page.tsx
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── profile/page.tsx
│   │   └── billing/page.tsx
│   └── api/
│       ├── auth/
│       ├── users/
│       ├── subscriptions/
│       └── webhooks/
└── types/
    └── auth.ts ✓
```

## Environment Variables Needed
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/hyperhash"

# Authentication
JWT_SECRET="your-jwt-secret"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# Social Login
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
FACEBOOK_APP_ID="your-facebook-app-id"
FACEBOOK_APP_SECRET="your-facebook-app-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Payments
STRIPE_PUBLIC_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@hyperhash.ai"

# Redis (optional)
REDIS_URL="redis://localhost:6379"
```

## Database Schema Preview
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE,
  password_hash VARCHAR(255),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  avatar_url TEXT,
  email_verified BOOLEAN DEFAULT FALSE,
  email_verified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login_at TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  plan_id VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'active',
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Usage tracking table
CREATE TABLE usage_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  month_year VARCHAR(7), -- Format: "2025-01"
  hashtags_generated INTEGER DEFAULT 0,
  api_calls INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, month_year)
);
```

## Next Steps for Tomorrow
1. **Database Setup**: Install Prisma, PostgreSQL, create schema
2. **Basic Auth**: Implement email/password registration and login
3. **UI Components**: Create beautiful auth forms matching the current design
4. **Protected Routes**: Implement middleware to protect premium features
5. **Usage Tracking**: Start tracking hashtag generation per user

This will give us a solid foundation similar to Splice and other modern platforms!
