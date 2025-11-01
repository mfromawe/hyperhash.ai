
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
