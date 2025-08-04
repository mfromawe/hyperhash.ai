# HyperHash.ai - Vercel Deployment Guide

## 🚀 Pre-Deployment Checklist

### 1. Environment Variables
Set these in Vercel dashboard (vercel.com > your-project > Settings > Environment Variables):

```bash
# Required for production
GEMINI_API_KEY="your_actual_gemini_api_key"
JWT_SECRET="generate_new_32_char_secret"
NEXTAUTH_SECRET="generate_new_32_char_secret" 
NEXTAUTH_URL="https://yourdomain.com"

# Database (PostgreSQL recommended for production)
DATABASE_URL="postgresql://user:password@host:port/database"

# Stripe (Production Keys)
STRIPE_SECRET_KEY="sk_live_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Optional (for future features)
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@yourdomain.com"
```

### 2. Database Setup

#### Option A: Vercel Postgres (Recommended)
1. Go to Vercel dashboard > Storage tab
2. Create new Postgres database
3. Copy connection string to DATABASE_URL

#### Option B: External PostgreSQL
1. Use services like Supabase, PlanetScale, or Railway
2. Create database and get connection string
3. Add to Vercel environment variables

### 3. Stripe Configuration

1. **Create Stripe Account**: https://stripe.com
2. **Get API Keys**: Dashboard > Developers > API keys
3. **Setup Webhook**: 
   - URL: `https://yourdomain.com/api/stripe/webhooks`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Copy webhook secret

### 4. Domain Configuration

1. **Custom Domain**: Add in Vercel > Domains
2. **SSL**: Automatically handled by Vercel
3. **Update NEXTAUTH_URL**: Set to your actual domain

## 🔧 Deployment Steps

### 1. Connect Repository
```bash
# If not already connected
vercel --prod
```

### 2. Set Environment Variables
Either via Vercel dashboard or CLI:
```bash
vercel env add GEMINI_API_KEY production
vercel env add JWT_SECRET production
# ... repeat for all variables
```

### 3. Deploy
```bash
vercel --prod
```

### 4. Database Migration
After first deployment, run:
```bash
# Option 1: Via Vercel CLI
vercel env pull .env.production.local
npx prisma db push

# Option 2: Use production database URL directly
DATABASE_URL="your_production_db_url" npx prisma db push
```

## 🔐 Security Checklist

- [ ] Generate new JWT_SECRET (32+ characters)
- [ ] Generate new NEXTAUTH_SECRET (32+ characters)
- [ ] Use production Stripe keys
- [ ] Setup proper CORS if needed
- [ ] Enable Vercel Pro for enhanced security features
- [ ] Setup monitoring and alerts

## 📊 Post-Deployment

### 1. Test Critical Flows
- [ ] User registration/login
- [ ] Hashtag generation
- [ ] Stripe payment flow
- [ ] API rate limiting

### 2. Monitor Performance
- [ ] Vercel Analytics
- [ ] Error tracking
- [ ] Database performance

### 3. SEO & Marketing
- [ ] Submit sitemap to Google
- [ ] Setup Google Analytics
- [ ] Configure social media previews

## 🚨 Troubleshooting

### Common Issues:

1. **Prisma Client Error**
   - Ensure `prisma generate` runs during build
   - Check DATABASE_URL format

2. **Authentication Issues**
   - Verify JWT_SECRET is set
   - Check NEXTAUTH_URL matches domain

3. **Stripe Webhooks**
   - Verify webhook URL is accessible
   - Check webhook secret matches

4. **Database Connection**
   - Test connection string locally first
   - Ensure IP whitelisting if required

## 📞 Support

- Vercel Docs: https://vercel.com/docs
- Prisma Docs: https://www.prisma.io/docs
- Stripe Docs: https://stripe.com/docs
- Next.js Docs: https://nextjs.org/docs

---

**Last Updated**: January 2025
**Version**: 1.0.0
