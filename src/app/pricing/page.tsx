'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import PayTRPayment from '@/components/payment/PayTRPayment';

// PayTR plans (Türk Lirası cinsinden)
const PAYTR_PLANS = {
  free: {
    name: 'Ücretsiz',
    price: 0,
    currency: 'TL',
    features: [
      'Ayda 50 hashtag üretimi',
      'Temel platform desteği',
      'Topluluk desteği'
    ]
  },
  pro: {
    name: 'Pro',
    price: 299,
    currency: 'TL',
    features: [
      'Ayda 1000 hashtag üretimi',
      'Tüm platformlar',
      'Gelişmiş analitik',
      'Öncelikli destek'
    ]
  },
  premium: {
    name: 'Premium',
    price: 599,
    currency: 'TL',
    features: [
      'Sınırsız hashtag üretimi',
      'Tüm platformlar + erken erişim',
      'API erişimi',
      'Özel destek',
      'Toplu hashtag indirme'
    ]
  }
} as const;

export default function PricingPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handlePlanSelect = (planType: string) => {
    if (!user) {
      window.location.href = '/auth?tab=login';
      return;
    }

    if (planType === 'free') {
      window.location.href = '/dashboard';
      return;
    }

    setSelectedPlan(planType);
  };

  if (selectedPlan && selectedPlan !== 'free') {
    const plan = PAYTR_PLANS[selectedPlan as keyof typeof PAYTR_PLANS];
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <button
              onClick={() => setSelectedPlan(null)}
              className="text-blue-600 hover:text-blue-800 mb-4 inline-flex items-center"
            >
              ← Planlara Geri Dön
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Ödeme</h1>
          </div>
          
          <PayTRPayment
            planType={selectedPlan as 'pro' | 'premium'}
            amount={plan.price}
            planName={plan.name}
            features={plan.features}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Fiyatlandırma
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            İhtiyacınıza uygun planı seçin
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {Object.entries(PAYTR_PLANS).map(([key, plan]) => {
              const isCurrentPlan = false; // TODO: Get from user's subscription
              const isPopular = key === 'pro';

              return (
                <div
                  key={key}
                  className={`rounded-lg shadow-lg overflow-hidden ${
                    isPopular
                      ? 'ring-2 ring-blue-500 ring-opacity-50'
                      : 'border border-gray-200'
                  } bg-white`}
                >
                  {isPopular && (
                    <div className="bg-blue-500 text-white text-center py-2 text-sm font-medium">
                      En Popüler
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 text-center">
                      {plan.name}
                    </h3>
                    <div className="mt-4 text-center">
                      <span className="text-4xl font-bold text-gray-900">
                        ₺{plan.price}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-gray-500">/ay</span>
                      )}
                    </div>

                    <ul className="mt-6 space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg
                            className="flex-shrink-0 w-5 h-5 text-green-500 mt-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="ml-3 text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8">
                      <button
                        onClick={() => handlePlanSelect(key)}
                        disabled={loading === key || isCurrentPlan}
                        className={`w-full py-3 px-4 rounded-lg font-medium transition duration-200 ${
                          isCurrentPlan
                            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                            : isPopular
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-gray-900 hover:bg-gray-800 text-white'
                        }`}
                      >
                        {loading === key 
                          ? 'İşleniyor...' 
                          : isCurrentPlan 
                          ? 'Mevcut Plan' 
                          : key === 'free'
                          ? 'Ücretsiz Başla'
                          : `${plan.name} Planını Seç`
                        }
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Sık Sorulan Sorular
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">
                Ödeme güvenli mi?
              </h3>
              <p className="text-gray-600">
                Evet, tüm ödemeler PayTR aracılığıyla güvenli bir şekilde işlenir. 
                Kredi kartı bilgileriniz şifrelenir ve güvenli sunucularda saklanır.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">
                Planımı istediğim zaman değiştirebilir miyim?
              </h3>
              <p className="text-gray-600">
                Evet, planınızı istediğiniz zaman yükseltebilir veya düşürebilirsiniz. 
                Değişiklikler bir sonraki fatura döneminde geçerli olur.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">
                Para iadesi var mı?
              </h3>
              <p className="text-gray-600">
                7 günlük ücretsiz deneme süresi sonunda memnun kalmazsanız, 
                tam para iadesi alabilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
