import { prisma } from '@/lib/database/prisma';
import { DatabaseUtil } from '@/lib/database-util';
import { AuthUtils } from './utils';
import { SUBSCRIPTION_PLANS } from './config';

export interface RegisterData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  username?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  user?: any;
  token?: string;
  error?: string;
  message?: string;
}

export class AuthService {
  // User Registration
  static async register(data: RegisterData): Promise<AuthResult> {
    try {
      // Ensure database connection
      await DatabaseUtil.ensureConnection();
      
      // Validate email
      if (!AuthUtils.validateEmail(data.email)) {
        return { success: false, error: 'Invalid email format' };
      }

      // Validate password
      const passwordValidation = AuthUtils.validatePassword(data.password);
      if (!passwordValidation.valid) {
        return { 
          success: false, 
          error: passwordValidation.errors.join(', ')
        };
      }

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email.toLowerCase() }
      });

      if (existingUser) {
        return { success: false, error: 'An account with this email already exists' };
      }

      // Check username if provided
      if (data.username) {
        const existingUsername = await prisma.user.findUnique({
          where: { username: data.username }
        });

        if (existingUsername) {
          return { success: false, error: 'Username is already taken' };
        }
      }

      // Hash password
      const passwordHash = await AuthUtils.hashPassword(data.password);

      // Create user with transaction
      const result = await prisma.$transaction(async (tx: any) => {
        // Create user
        const user = await tx.user.create({
          data: {
            email: data.email.toLowerCase(),
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
            passwordHash,
            verificationToken: AuthUtils.generateRandomToken(),
          }
        });

        // Create free subscription
        const subscription = await tx.subscription.create({
          data: {
            userId: user.id,
            planId: 'free',
            status: 'active',
          }
        });

        return { user, subscription };
      });

      // Generate JWT token
      const token = AuthUtils.generateToken({
        userId: result.user.id,
        email: result.user.email,
        planId: result.subscription.planId
      });

      return {
        success: true,
        user: { ...result.user, subscription: result.subscription },
        token,
        message: 'Account created successfully'
      };

    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'An error occurred during registration' };
    }
  }

  // User Login
  static async login(data: LoginData): Promise<AuthResult> {
    try {
      // Ensure database connection
      await DatabaseUtil.ensureConnection();
      
      // Find user with subscription
      const user = await prisma.user.findUnique({
        where: { email: data.email.toLowerCase() },
        include: { subscription: true }
      });

      if (!user) {
        return { success: false, error: 'Invalid email or password' };
      }

      // Check if account is locked
      if (AuthUtils.isAccountLocked(user)) {
        return { 
          success: false, 
          error: 'Account temporarily locked due to too many failed login attempts' 
        };
      }

      // Verify password
      if (!user.passwordHash) {
        return { success: false, error: 'Please use social login or reset your password' };
      }

      const isValidPassword = await AuthUtils.verifyPassword(data.password, user.passwordHash);

      if (!isValidPassword) {
        // Increment login attempts
        const newAttempts = user.loginAttempts + 1;
        const shouldLock = AuthUtils.shouldLockAccount(newAttempts);

        await prisma.user.update({
          where: { id: user.id },
          data: {
            loginAttempts: newAttempts,
            lockedUntil: shouldLock ? AuthUtils.getLockUntilTime() : null
          }
        });

        return { success: false, error: 'Invalid email or password' };
      }

      // Check if account is active
      if (!user.isActive) {
        return { success: false, error: 'Account is deactivated. Please contact support' };
      }

      // Successful login - reset login attempts and update last login
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          loginAttempts: 0,
          lockedUntil: null,
          lastLoginAt: new Date()
        },
        include: { subscription: true }
      });

      // Generate JWT token
      const token = AuthUtils.generateToken({
        userId: updatedUser.id,
        email: updatedUser.email,
        planId: updatedUser.subscription?.planId || 'free'
      });

      return {
        success: true,
        user: updatedUser,
        token,
        message: 'Login successful'
      };

    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An error occurred during login' };
    }
  }

  // Get user by token
  static async getUserFromToken(token: string): Promise<AuthResult> {
    try {
      const payload = AuthUtils.verifyToken(token);
      if (!payload) {
        return { success: false, error: 'Invalid token' };
      }

      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
        include: { subscription: true }
      });

      if (!user || !user.isActive) {
        return { success: false, error: 'User not found or inactive' };
      }

      return { success: true, user };

    } catch (error) {
      console.error('Token verification error:', error);
      return { success: false, error: 'Token verification failed' };
    }
  }

  // Get user usage stats for current month
  static async getUserUsage(userId: string): Promise<any> {
    try {
      const currentMonth = new Date().toISOString().slice(0, 7); // "2025-01"
      
      let usage = await prisma.usageStats.findUnique({
        where: {
          userId_monthYear: {
            userId,
            monthYear: currentMonth
          }
        }
      });

      // Create usage record if doesn't exist
      if (!usage) {
        usage = await prisma.usageStats.create({
          data: {
            userId,
            monthYear: currentMonth,
            hashtagsGenerated: 0,
            apiCalls: 0
          }
        });
      }

      // Get user subscription to determine limits
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { subscription: true }
      });

      const plan = SUBSCRIPTION_PLANS[user?.subscription?.planId as keyof typeof SUBSCRIPTION_PLANS] || SUBSCRIPTION_PLANS.free;
      
      return {
        ...usage,
        monthlyLimit: plan.limits.hashtagsPerMonth,
        isLimitReached: plan.limits.hashtagsPerMonth !== -1 && usage.hashtagsGenerated >= plan.limits.hashtagsPerMonth
      };

    } catch (error) {
      console.error('Get usage error:', error);
      return null;
    }
  }

  // Track hashtag generation
  static async trackHashtagGeneration(userId: string, count: number = 1): Promise<boolean> {
    try {
      const currentMonth = new Date().toISOString().slice(0, 7);
      
      await prisma.usageStats.upsert({
        where: {
          userId_monthYear: {
            userId,
            monthYear: currentMonth
          }
        },
        update: {
          hashtagsGenerated: { increment: count },
          apiCalls: { increment: 1 }
        },
        create: {
          userId,
          monthYear: currentMonth,
          hashtagsGenerated: count,
          apiCalls: 1
        }
      });

      return true;
    } catch (error) {
      console.error('Track usage error:', error);
      return false;
    }
  }

  // NEW: Get user by email (used in PayPal webhooks)
  static async getUserByEmail(email: string): Promise<AuthResult> {
    try {
      await DatabaseUtil.ensureConnection();
      if (!email) return { success: false, error: 'Email required' };
      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
        include: { subscription: true }
      });
      if (!user) return { success: false, error: 'User not found' };
      if (!user.isActive) return { success: false, error: 'User inactive' };
      return { success: true, user };
    } catch (error) {
      console.error('getUserByEmail error:', error);
      return { success: false, error: 'Lookup failed' };
    }
  }

  // NEW: Update subscription plan for a user (used in PayPal webhooks)
  static async updateSubscription(userId: string, planId: string) {
    try {
      await DatabaseUtil.ensureConnection();
      if (!userId) return { success: false, error: 'User ID required' };
      if (!planId || !(planId in SUBSCRIPTION_PLANS)) {
        return { success: false, error: 'Invalid planId' };
      }

      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) return { success: false, error: 'User not found' };

      const periodStart = new Date();
      // Simple monthly period end (30 days); adjust if you have real billing cycles
      const periodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

      const subscription = await prisma.subscription.upsert({
        where: { userId },
        update: {
          planId,
          status: 'active',
          currentPeriodStart: periodStart,
            currentPeriodEnd: periodEnd,
        },
        create: {
          userId,
          planId,
          status: 'active',
          currentPeriodStart: periodStart,
          currentPeriodEnd: periodEnd,
        }
      });

      return { success: true, user: { ...user, subscription }, message: 'Subscription updated' };
    } catch (error) {
      console.error('updateSubscription error:', error);
      return { success: false, error: 'Subscription update failed' };
    }
  }
}
