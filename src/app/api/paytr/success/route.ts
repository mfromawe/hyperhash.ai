import { NextRequest, NextResponse } from 'next/server';

// Deprecated: PayTR success route

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get('status');
  const merchant_oid = searchParams.get('merchant_oid');

  return NextResponse.json({
    success: true,
    status,
    merchant_oid,
    message: 'Ödeme başarıyla tamamlandı!'
  });
}

export async function POST(request: NextRequest) {
  // PayTR'den gelen success callback'i işle
  const data = await request.json();
  
  // Burada kullanıcının planını aktif hale getir
  // Database'de subscription güncelle
  
  return NextResponse.json({
    success: true,
    message: 'Ödeme onaylandı'
  });
}
