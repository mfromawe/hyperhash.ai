import { createSubscription } from '@/lib/paypal';
import { NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth/service';

export async function POST(req: Request) {
  try {
    const { planId } = await req.json();

    // Get token from headers
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: No token provided.' }, { status: 401 });
    }

    const userResult = await AuthService.getUserFromToken(token);

    if (!userResult.success || !userResult.user) {
      return NextResponse.json({ error: 'Unauthorized: Invalid token.' }, { status: 401 });
    }

    // Create PayPal subscription
    const subscription = await createSubscription(planId);

    return NextResponse.json(subscription);
  } catch (error) {
    console.error('Failed to create subscription:', error);
    return NextResponse.json({ error: 'Failed to create subscription.' }, { status: 500 });
  }
}
