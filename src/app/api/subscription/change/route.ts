import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth/service';
import { SUBSCRIPTION_PLANS } from '@/lib/auth/config';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('auth-token')?.value;
    if (!token) return NextResponse.json({ error: 'Auth required' }, { status: 401 });

    const auth = await AuthService.getUserFromToken(token);
    if (!auth.success || !auth.user) return NextResponse.json({ error: 'Invalid auth' }, { status: 401 });

    const { planId } = await req.json();
    if (!planId) return NextResponse.json({ error: 'planId required' }, { status: 400 });
    if (!(planId in SUBSCRIPTION_PLANS)) return NextResponse.json({ error: 'Unknown planId' }, { status: 400 });

    const result = await AuthService.updateSubscription(auth.user.id, planId);
    if (!result.success) return NextResponse.json({ error: result.error }, { status: 400 });

    return NextResponse.json({ success: true, message: result.message, subscription: result.user?.subscription });
  } catch (e) {
    console.error('subscription change error', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
