import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth/service';
import { SUBSCRIPTION_PLANS } from '@/lib/auth/config';
import { hashtagRateLimiter } from '@/lib/rate-limiter';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('auth-token')?.value;
    if (!token) return NextResponse.json({ error: 'Auth required' }, { status: 401 });

    const auth = await AuthService.getUserFromToken(token);
    if (!auth.success || !auth.user) return NextResponse.json({ error: 'Invalid auth' }, { status: 401 });

    const user = auth.user;

    // Rate limit (per user)
    const identifier = `hashtags:${user.id}`;
    if (!hashtagRateLimiter.isAllowed(identifier)) {
      return NextResponse.json({ error: 'Rate limit exceeded. Please wait.' }, { status: 429 });
    }

    // Usage enforcement
    const usage = await AuthService.getUserUsage(user.id);
    if (!usage) return NextResponse.json({ error: 'Usage fetch failed' }, { status: 500 });
    if (usage.isLimitReached) {
      return NextResponse.json({ error: 'Monthly hashtag limit reached', upgrade: true }, { status: 402 });
    }

    // Parse request
    const { topic = 'default', count = 5 } = await req.json().catch(() => ({}));

    // Simple hashtag generation placeholder
    const hashtags: string[] = Array.from({ length: count }).map((_, i) => `#${topic.replace(/\s+/g,'').toLowerCase()}${i+1}`);

    await AuthService.trackHashtagGeneration(user.id, hashtags.length);

    return NextResponse.json({ success: true, hashtags, remaining: usage.monthlyLimit === -1 ? -1 : (usage.monthlyLimit - (usage.hashtagsGenerated + hashtags.length)) });
  } catch (e) {
    console.error('secure hashtags error', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
