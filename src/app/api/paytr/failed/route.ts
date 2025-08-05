import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const reason = searchParams.get('reason');
  const merchant_oid = searchParams.get('merchant_oid');

  return NextResponse.json({
    success: false,
    reason,
    merchant_oid,
    message: 'Ödeme tamamlanamadı'
  });
}

export async function POST(request: NextRequest) {
  // PayTR'den gelen failed callback'i işle
  const data = await request.json();
  
  return NextResponse.json({
    success: false,
    message: 'Ödeme başarısız'
  });
}
