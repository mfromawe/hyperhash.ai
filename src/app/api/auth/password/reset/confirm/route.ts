import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth/service';

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();
    if (!token || !password) return NextResponse.json({ error: 'Token and password required' }, { status: 400 });
    const result = await AuthService.resetPassword(token, password);
    if (!result.success) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({ success: true, message: result.message });
  } catch (e) {
    console.error('password reset confirm error', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
