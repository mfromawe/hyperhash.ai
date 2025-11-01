
import React, { useState, useCallback } from 'react';
import { Hashtag, GenerationParams } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import InputForm from './components/InputForm';
import ResultsDisplay from './components/ResultsDisplay';
import Loader from './components/Loader';
import { generateHashtags } from './services/geminiService';

const App: React.FC = () => {
  const [hashtags, setHashtags] = useState<Hashtag[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (params: GenerationParams) => {
    setIsLoading(true);
    setError(null);
    setHashtags([]);
    try {
      const result = await generateHashtags(params);
      setHashtags(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col font-sans p-4">
      <style>
      {`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}
      </style>
      <Header />
      <main className="container mx-auto max-w-4xl w-full flex-grow flex flex-col items-center py-8">
        {/* SEO content blocks under header */}
        <section className="w-full mb-6 space-y-6 animate-fade-in">
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
            <h2 className="text-xl md:text-2xl font-bold text-slate-100">Instagram, TikTok, YouTube ve X için Hashtag Üret</h2>
            <p className="text-slate-400 mt-2">HyperHash; içeriğinize, dile ve stile göre trend potansiyeli yüksek hashtagler üretir. Paylaşımlarınızın keşfedilmesini ve etkileşimini artırmayı hedefler.</p>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
            <h2 className="text-xl md:text-2xl font-bold text-slate-100">Nasıl Çalışır?</h2>
            <p className="text-slate-400 mt-2">Metninizi girin, platform ve dili seçin, stili belirleyin. HyperHash, Gemini modelini kullanarak tam 15 öneri üretir ve her biri için kısa bir açıklama ile trend skoru verir.</p>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
            <h2 className="text-xl md:text-2xl font-bold text-slate-100">Öne Çıkan Özellikler</h2>
            <ul className="list-disc list-inside text-slate-400 mt-2">
              <li>Çok dilli öneriler ve platforma özel optimizasyon</li>
              <li>Trend skoru ile hızlı karşılaştırma</li>
              <li>Tek tıkla kopyalama ve CSV olarak dışa aktarma</li>
            </ul>
          </div>
        </section>
        <div className="w-full bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-700 shadow-2xl shadow-indigo-900/20 space-y-8">
            <InputForm onSubmit={handleGenerate} isLoading={isLoading} />
          
            {isLoading && <Loader />}

            {error && (
                <div className="text-center p-4 bg-rose-900/50 border border-rose-700 text-rose-300 rounded-lg animate-fade-in">
                <p className="font-bold">Oops! Something went wrong.</p>
                <p className="text-sm">{error}</p>
                </div>
            )}

            {!isLoading && hashtags.length > 0 && <ResultsDisplay hashtags={hashtags} />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
