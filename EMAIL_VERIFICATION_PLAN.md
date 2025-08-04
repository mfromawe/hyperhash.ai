# Email Verification Implementation

## Required Dependencies

```bash
npm install nodemailer @types/nodemailer
npm install react-email @react-email/render
```

## Environment Variables

```bash
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
FROM_EMAIL=noreply@hyperhash.ai
```

## Implementation Files

### 1. Email Service (`/src/lib/email/`)
- `email-service.ts` - SMTP configuration
- `templates/` - Email templates
- `verification-email.tsx` - React Email template

### 2. API Routes (`/src/app/api/auth/`)
- `verify-email/route.ts` - Email verification
- `resend-verification/route.ts` - Resend verification

### 3. Database Schema Update

```prisma
model User {
  // ...existing fields
  emailVerified    DateTime?
  emailVerificationToken String?   @unique
  emailVerificationExpiry DateTime?
}
```

### 4. UI Components
- `EmailVerificationBanner.tsx` - Unverified email notice
- `ResendEmailButton.tsx` - Resend verification email

## Flow

1. **Registration**: Send verification email
2. **Email Click**: Verify token and activate account
3. **Login Check**: Show verification banner if not verified
4. **Feature Gating**: Limit features for unverified users

## Security Features

- Token expiration (24 hours)
- Rate limiting on resend requests
- Secure token generation
- Email validation
