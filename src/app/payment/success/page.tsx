'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const merchant_oid = searchParams.get('merchant_oid');
  const status = searchParams.get('status') || 'success';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Ödeme Başarılı!
          </h1>
          <p className="text-gray-600">
            Aboneliğiniz başarıyla aktif edildi.
          </p>
        </div>

        {merchant_oid && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-800">
              <strong>İşlem ID:</strong> {merchant_oid}
            </p>
            <p className="text-sm text-green-800 mt-1">
              Durum: {status}
            </p>
          </div>
        )}

        <div className="space-y-3">
          <Link
            href="/dashboard"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 block"
          >
            Dashboard'a Git
          </Link>
          <Link
            href="/tools"
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition duration-200 block"
          >
            Hashtag Üretmeye Başla
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Herhangi bir sorun yaşarsanız{' '}
            <Link href="/contact" className="text-blue-600 hover:underline">
              destek ekibimizle iletişime geçin
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
