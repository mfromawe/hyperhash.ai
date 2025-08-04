import { NextRequest, NextResponse } from 'next/server';
import { stripe, STRIPE_PLANS, PlanType } from '@/lib/stripe';
import { AuthService } from '@/lib/auth/service';

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe is not configured' },
      { status: 500 }
    );
  }

  try {
    const { planType } = await request.json();
    
    // Validate plan type
    if (!planType || !(planType in STRIPE_PLANS)) {
      return NextResponse.json(
        { error: 'Invalid plan type' },
        { status: 400 }
      );
    }
    
    // Free plan doesn't need payment
    if (planType === 'free') {
      return NextResponse.json(
        { error: 'Free plan does not require payment' },
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
    
    const plan = STRIPE_PLANS[planType as PlanType];
    
    // Check if plan has priceId (only paid plans should)
    if (!('priceId' in plan) || !plan.priceId) {
      return NextResponse.json(
        { error: 'Plan does not support subscription' },
        { status: 400 }
      );
    }
    
    // Create or retrieve Stripe customer
    let stripeCustomerId = user.subscription?.stripeCustomerId;
    
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.firstName && user.lastName 
          ? `${user.firstName} ${user.lastName}` 
          : user.email,
        metadata: {
          userId: user.id,
        },
      });
      stripeCustomerId = customer.id;
    }
    
    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: plan.priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
      metadata: {
        userId: user.id,
        planType: planType,
      },
      subscription_data: {
        metadata: {
          userId: user.id,
          planType: planType,
        },
      },
    });
    
    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
    
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
