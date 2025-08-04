# Stripe Payment Integration Plan

## Setup Steps

### 1. Install Dependencies
```bash
npm install stripe @stripe/stripe-js
npm install --save-dev @types/stripe
```

### 2. Environment Variables
```bash
# Add to .env.local
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 3. Plan Pricing
- **Free Plan**: $0/month - 10 hashtags/month
- **Pro Plan**: $9.99/month - 500 hashtags/month  
- **Enterprise**: $29.99/month - Unlimited hashtags

### 4. Implementation Files Needed

#### `/src/lib/stripe.ts`
- Stripe client configuration
- Payment session creation
- Subscription management

#### `/src/app/api/stripe/`
- `/checkout` - Create payment session
- `/webhooks` - Handle payment events
- `/portal` - Customer portal access

#### `/src/components/billing/`
- `PricingCards.tsx` - Pricing display
- `CheckoutButton.tsx` - Payment button
- `BillingHistory.tsx` - Invoice history

### 5. Database Schema Updates

Add to Prisma schema:
```prisma
model Subscription {
  id                String   @id @default(cuid())
  userId           String   @unique
  stripeCustomerId String?  @unique
  stripeSubscriptionId String? @unique
  stripePriceId    String?
  status           String   // active, canceled, past_due
  currentPeriodStart DateTime?
  currentPeriodEnd   DateTime?
  cancelAtPeriodEnd  Boolean  @default(false)
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

## Implementation Priority

1. **Week 1**: Stripe setup + basic checkout
2. **Week 2**: Webhook handling + subscription updates  
3. **Week 3**: Customer portal + billing management
4. **Week 4**: Testing + production deployment
