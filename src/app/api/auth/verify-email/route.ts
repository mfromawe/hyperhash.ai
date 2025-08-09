import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth/service';

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    if (!token) return NextResponse.json({ error: 'Token required' }, { status: 400 });
    const result = await AuthService.verifyEmail(token);
    if (!result.success) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({ success: true, message: result.message });
  } catch (e) {
    console.error('verify-email endpoint error', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
