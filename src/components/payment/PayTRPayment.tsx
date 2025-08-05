'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface PayTRPaymentProps {
  planType: 'pro' | 'premium';
  amount: number;
  planName: string;
  features: readonly string[];
}

export default function PayTRPayment({ planType, amount, planName, features }: PayTRPaymentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  const handlePayment = async () => {
    if (!user) {
      router.push('/auth');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/paytr/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planType,
          amount,
          userId: user.id,
          email: user.email,
        }),
      });

      const data = await response.json();

      if (data.success && data.token) {
        // PayTR iframe'ini aç
        const paytrIframe = document.createElement('iframe');
        paytrIframe.src = `https://www.paytr.com/odeme/guvenli/${data.token}`;
        paytrIframe.style.width = '100%';
        paytrIframe.style.height = '600px';
        paytrIframe.style.border = 'none';
        
        // Modal oluştur
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
        modal.style.zIndex = '9999';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';

        const iframeContainer = document.createElement('div');
        iframeContainer.style.width = '90%';
        iframeContainer.style.maxWidth = '800px';
        iframeContainer.style.height = '80%';
        iframeContainer.style.backgroundColor = 'white';
        iframeContainer.style.borderRadius = '10px';
        iframeContainer.style.overflow = 'hidden';
        iframeContainer.style.position = 'relative';

        const closeButton = document.createElement('button');
        closeButton.innerHTML = '✕';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '10px';
        closeButton.style.zIndex = '10000';
        closeButton.style.background = '#ff4444';
        closeButton.style.color = 'white';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '50%';
        closeButton.style.width = '30px';
        closeButton.style.height = '30px';
        closeButton.style.cursor = 'pointer';

        closeButton.onclick = () => {
          document.body.removeChild(modal);
        };

        iframeContainer.appendChild(closeButton);
        iframeContainer.appendChild(paytrIframe);
        modal.appendChild(iframeContainer);
        document.body.appendChild(modal);

        // PayTR callback'i dinle
        const handlePaytrCallback = (event: MessageEvent) => {
          if (event.origin === 'https://www.paytr.com') {
            if (event.data === 'payment_success') {
              document.body.removeChild(modal);
              router.push('/payment/success');
            } else if (event.data === 'payment_failed') {
              document.body.removeChild(modal);
              router.push('/payment/failed');
            }
          }
        };

        window.addEventListener('message', handlePaytrCallback);

        // Cleanup
        modal.addEventListener('DOMNodeRemoved', () => {
          window.removeEventListener('message', handlePaytrCallback);
        });

      } else {
        setError(data.message || 'Ödeme işlemi başlatılamadı');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{planName}</h3>
        <div className="text-3xl font-bold text-blue-600 mb-4">
          ₺{amount}<span className="text-sm text-gray-500">/ay</span>
        </div>
      </div>

      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-700">
            <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <button
        onClick={handlePayment}
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Yükleniyor...
          </div>
        ) : (
          `₺${amount} - Hemen Satın Al`
        )}
      </button>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Güvenli ödeme PayTR ile gerçekleştirilir.
        </p>
        <div className="flex items-center justify-center mt-2 space-x-2">
          <img src="/visa.svg" alt="Visa" className="h-6" />
          <img src="/mastercard.svg" alt="Mastercard" className="h-6" />
          <span className="text-xs text-gray-400">Güvenli SSL</span>
        </div>
      </div>
    </div>
  );
}
