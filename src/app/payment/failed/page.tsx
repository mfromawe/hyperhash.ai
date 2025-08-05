'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';

function PaymentFailedContent() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    const reason = searchParams.get('reason');
    const merchant_oid = searchParams.get('merchant_oid');
    
    // Ödeme durumunu kontrol et
    fetch(`/api/paytr/failed?reason=${reason}&merchant_oid=${merchant_oid}`)
      .then(res => res.json())
      .then(data => {
        setPaymentData(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Payment verification error:', error);
        setIsLoading(false);
      });
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Ödeme Başarısız
          </h1>
          <p className="text-gray-600">
            Ödeme işlemi tamamlanamadı.
          </p>
        </div>

        {paymentData && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            {paymentData.reason && (
              <p className="text-sm text-red-800 mb-2">
                <strong>Sebep:</strong> {paymentData.reason}
              </p>
            )}
            {paymentData.merchant_oid && (
              <p className="text-sm text-red-800">
                <strong>İşlem ID:</strong> {paymentData.merchant_oid}
              </p>
            )}
          </div>
        )}

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-medium text-yellow-800 mb-2">Olası Sebepler:</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Yetersiz bakiye</li>
            <li>• Kart limiti aşıldı</li>
            <li>• Güvenlik nedeniyle reddedildi</li>
            <li>• İşlem iptal edildi</li>
          </ul>
        </div>

        <div className="space-y-3">
          <Link
            href="/pricing"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 block"
          >
            Tekrar Dene
          </Link>
          <Link
            href="/contact"
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition duration-200 block"
          >
            Destek Ekibi
          </Link>
          <Link
            href="/"
            className="w-full text-gray-500 hover:text-gray-700 font-medium py-2 px-4 transition duration-200 block"
          >
            Ana Sayfaya Dön
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Sorun devam ederse lütfen{' '}
            <Link href="/contact" className="text-blue-600 hover:underline">
              bizimle iletişime geçin
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PaymentFailedPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
      </div>
    }>
      <PaymentFailedContent />
    </Suspense>
  );
}
