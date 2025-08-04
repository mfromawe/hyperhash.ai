// Authentication and User Management Types
export interface User {
  id: string;
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  plan: SubscriptionPlan;
  createdAt: string;
  lastLoginAt?: string;
  isEmailVerified: boolean;
  preferences: UserPreferences;
  usage: UsageStats;
}

export interface UserPreferences {
  defaultPlatform: string;
  language: string;
  timezone: string;
  emailNotifications: boolean;
  marketingEmails: boolean;
  theme: 'light' | 'dark' | 'auto';
}

export interface UsageStats {
  hashtagsGenerated: number;
  apiCallsThisMonth: number;
  apiCallsTotal: number;
  lastGeneratedAt?: string;
  monthlyLimit: number;
  isLimitReached: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: 'free' | 'pro' | 'enterprise';
  displayName: string;
  price: number;
  interval: 'monthly' | 'yearly';
  features: PlanFeature[];
  limits: PlanLimits;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  autoRenew: boolean;
}

export interface PlanFeature {
  id: string;
  name: string;
  description: string;
  included: boolean;
  limit?: number;
}

export interface PlanLimits {
  hashtagsPerMonth: number;
  platforms: string[];
  analyticsAccess: boolean;
  bulkGeneration: boolean;
  apiAccess: boolean;
  prioritySupport: boolean;
  customTemplates: boolean;
}

export interface AuthSession {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  acceptTerms: boolean;
  marketingOptIn?: boolean;
}

export interface SocialLoginProvider {
  id: 'google' | 'facebook' | 'twitter' | 'github';
  name: string;
  icon: string;
  color: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  session?: AuthSession;
  error?: AuthError;
  message?: string;
}

export interface AuthError {
  code: string;
  message: string;
  field?: string;
}

// Payment and Billing Types
export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export interface Invoice {
  id: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'failed';
  date: string;
  downloadUrl?: string;
  plan: string;
}

export interface BillingInfo {
  currentPlan: SubscriptionPlan;
  paymentMethods: PaymentMethod[];
  invoices: Invoice[];
  nextBillingDate?: string;
  billingAddress?: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

// API Rate Limiting
export interface RateLimit {
  requests: number;
  windowMs: number;
  maxRequests: number;
  resetTime: string;
}

export interface APIKey {
  id: string;
  name: string;
  key: string;
  isActive: boolean;
  createdAt: string;
  lastUsedAt?: string;
  requestCount: number;
  rateLimit: RateLimit;
}
