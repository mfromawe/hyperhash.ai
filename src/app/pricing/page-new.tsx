'use client';

import { useState } from 'react';
import { useUserStore } from '@/store/userStore';
import PayTRPayment from '@/components/payment/PayTRPayment';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

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
  const { user } = useUserStore();
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

    setLoading(planType);
    setSelectedPlan(planType);
    setTimeout(() => setLoading(null), 400); // minimal UX feedback
  };

  if (selectedPlan && selectedPlan !== 'free') {
    const plan = PAYTR_PLANS[selectedPlan as keyof typeof PAYTR_PLANS];
    return (
      <div className="min-h-screen bg-app py-12">
        <div className="container-app">
          <div className="text-center mb-8 text-app">
            <Button
              variant="ghost"
              onClick={() => setSelectedPlan(null)}
              className="mb-4"
            >
              ← Planlara Geri Dön
            </Button>
            <h1 className="text-3xl font-bold">
              <span className="text-gradient">Ödeme</span>
            </h1>
          </div>
          
          <Card className="p-6">
            <PayTRPayment
              planType={selectedPlan as 'pro' | 'premium'}
              amount={plan.price}
              planName={plan.name}
              features={plan.features}
            />
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app py-12">
      <div className="container-app">
        <div className="text-center text-app">
          <h1 className="text-4xl font-bold sm:text-5xl">
            <span className="text-gradient">Fiyatlandırma</span>
          </h1>
          <p className="mt-4 text-xl text-muted">
            İhtiyacınıza uygun planı seçin
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {Object.entries(PAYTR_PLANS).map(([key, plan]) => {
              const isCurrentPlan = false; // TODO: user's subscription
              const isPopular = key === 'pro';

              return (
                <Card
                  key={key}
                  className={`${isPopular ? 'ring-2 ring-purple-500/40' : ''}`}
                >
                  {isPopular && (
                    <div className="gradient-primary text-white text-center py-2 text-sm font-medium rounded-t-[var(--radius-lg)]">
                      En Popüler
                    </div>
                  )}
                  
                  <div className="p-6 text-app">
                    <h3 className="text-2xl font-bold text-center">
                      {plan.name}
                    </h3>
                    <div className="mt-4 text-center">
                      <span className="text-4xl font-bold">
                        ₺{plan.price}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-muted">/ay</span>
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
                          <span className="ml-3 text-muted">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8">
                      <Button
                        onClick={() => handlePlanSelect(key)}
                        disabled={loading === key || isCurrentPlan}
                        loading={loading === key}
                        className="w-full"
                        variant={isPopular ? 'primary' : 'outline'}
                      >
                        {loading === key 
                          ? 'İşleniyor...'
                          : isCurrentPlan 
                          ? 'Mevcut Plan' 
                          : key === 'free'
                          ? 'Ücretsiz Başla'
                          : `${plan.name} Planını Seç`}
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-app mb-8">
            Sık Sorulan Sorular
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-app mb-2">
                Ödeme güvenli mi?
              </h3>
              <p className="text-muted">
                Evet, tüm ödemeler PayTR aracılığıyla güvenli bir şekilde işlenir. 
                Kredi kartı bilgileriniz şifrelenir ve güvenli sunucularda saklanır.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="font-semibold text-app mb-2">
                Planımı istediğim zaman değiştirebilir miyim?
              </h3>
              <p className="text-muted">
                Evet, planınızı istediğiniz zaman yükseltebilir veya düşürebilirsiniz. 
                Değişiklikler bir sonraki fatura döneminde geçerli olur.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="font-semibold text-app mb-2">
                Para iadesi var mı?
              </h3>
              <p className="text-muted">
                7 günlük ücretsiz deneme süresi sonunda memnun kalmazsanız, 
                tam para iadesi alabilirsiniz.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
