import { NextRequest, NextResponse } from 'next/server';
import { paytrService } from '@/lib/paytr/client';
import { AuthService } from '@/lib/auth/service';

// PayTR plan pricing in Turkish Lira
const PAYTR_PLANS = {
  pro: {
    name: 'Pro Plan',
    price: 299, // 299 TL
    planId: 'pro_monthly'
  },
  enterprise: {
    name: 'Enterprise Plan', 
    price: 899, // 899 TL
    planId: 'enterprise_monthly'
  }
} as const;

// Deprecated PayTR route - no longer active
export async function POST(request: NextRequest) {
  try {
    const { planType } = await request.json();
    
    // Validate plan
    if (!planType || !(planType in PAYTR_PLANS)) {
      return NextResponse.json(
        { error: 'Invalid plan type' },
        { status: 400 }
      );
    }

    // Get authenticated user
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const authResult = await AuthService.getUserFromToken(token);
    if (!authResult.success || !authResult.user) {
      return NextResponse.json(
        { error: 'Invalid authentication' },
        { status: 401 }
      );
    }

    const user = authResult.user;
    const plan = PAYTR_PLANS[planType as keyof typeof PAYTR_PLANS];
    
    // Get user IP
    const userIp = request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   '127.0.0.1';

    // Create PayTR payment
    const paymentResult = await paytrService.createPayment({
      userId: user.id,
      email: user.email,
      amount: plan.price,
      planType: plan.planId,
      userIp: userIp.split(',')[0], // Get first IP if multiple
      phone: user.phone || undefined
    });

    if (paymentResult.status === 'success' && paymentResult.token) {
      // Return payment URL for redirect
      const paymentUrl = `https://www.paytr.com/odeme/guvenli/${paymentResult.token}`;
      
      return NextResponse.json({
        success: true,
        paymentUrl,
        token: paymentResult.token
      });
    } else {
      return NextResponse.json(
        { error: paymentResult.reason || 'Payment creation failed' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('PayTR checkout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
