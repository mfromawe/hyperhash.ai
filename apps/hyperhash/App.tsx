
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 text-slate-100 flex flex-col font-sans relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-float-slower"></div>
      </div>
      
      <style>
      {`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.6); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(50px, 50px) scale(1.1); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-50px, -50px) scale(1.1); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float-slower 25s ease-in-out infinite;
        }
      `}
      </style>
      
      <div className="relative z-10 flex flex-col min-h-screen p-4">
        <Header />
        <main className="container mx-auto max-w-5xl w-full flex-grow flex flex-col items-center py-8">
          <div className="w-full bg-slate-900/70 backdrop-blur-2xl p-8 md:p-12 rounded-3xl border border-slate-700/60 shadow-2xl shadow-purple-900/40 space-y-8 animate-slide-up">
            <InputForm onSubmit={handleGenerate} isLoading={isLoading} />
          
            {isLoading && <Loader />}

            {error && (
                <div className="text-center p-5 bg-rose-900/60 backdrop-blur border border-rose-700/50 text-rose-200 rounded-xl animate-fade-in shadow-lg">
                <p className="font-bold text-lg">⚠️ Oops! Something went wrong.</p>
                <p className="text-sm mt-1">{error}</p>
                </div>
            )}

            {!isLoading && hashtags.length > 0 && <ResultsDisplay hashtags={hashtags} />}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
